import { ref, readonly, computed } from "vue";

export interface Archive {
    name: string;
    description: string | null;
    html_url: string;
    pushed_at: string;
    first_commit_at?: string;
}

const ISO_PREFIX = /^[a-z]{2}\./;

// module-level singletons — shared across all components on the same page
const archives = ref<Archive[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const fetched = ref(false);

async function fetchFirstCommitDate(repoName: string): Promise<string | null> {
    try {
        const res = await fetch(
            `https://api.github.com/repos/opentsi/${repoName}/commits?per_page=1`
        );
        if (!res.ok) return null;

        const linkHeader = res.headers.get("Link");
        const lastMatch = linkHeader?.match(/<([^>]+)>;\s*rel="last"/);

        if (lastMatch) {
            // Follow the last page to get the oldest commit
            const lastRes = await fetch(lastMatch[1]);
            if (!lastRes.ok) return null;
            const commits = await lastRes.json();
            return commits[commits.length - 1]?.commit?.author?.date ?? null;
        } else {
            // Single page — oldest commit is the last item
            const commits = await res.json();
            return commits[commits.length - 1]?.commit?.author?.date ?? null;
        }
    } catch {
        return null;
    }
}

async function fetchArchives() {
    if (fetched.value || loading.value) return;
    loading.value = true;
    try {
        const res = await fetch(
            "https://api.github.com/orgs/opentsi/repos?type=public&per_page=100"
        );
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        const repos = await res.json();
        archives.value = repos
            .filter((r: Archive) => ISO_PREFIX.test(r.name))
            .sort((a: Archive, b: Archive) => a.name.localeCompare(b.name));
        fetched.value = true;
    } catch (e) {
        error.value = e instanceof Error ? e.message : "Failed to load archives";
        return;
    } finally {
        loading.value = false;
    }

    // Fetch oldest commit dates for all archives in parallel, then update once
    const names = archives.value.map((a) => a.name);
    const dates = await Promise.all(names.map(fetchFirstCommitDate));
    archives.value = archives.value.map((a, i) => ({
        ...a,
        first_commit_at: dates[i] ?? undefined,
    }));
}

export function useArchives() {
    return {
        archives: readonly(archives),
        loading: readonly(loading),
        error: readonly(error),
        count: computed(() => archives.value.length),
        fetchArchives,
    };
}
