import { ref, readonly, computed } from "vue";

export interface Archive {
    name: string;
    description: string | null;
    html_url: string;
    pushed_at: string;
}

const ISO_PREFIX = /^[a-z]{2}\./;

// module-level singletons — shared across all components on the same page
const archives = ref<Archive[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const fetched = ref(false);

async function fetchArchives() {
    if (fetched.value || loading.value) return;
    loading.value = true;
    try {
        const res = await fetch(
            "https://api.github.com/orgs/opentsi/repos?type=public&per_page=100"
        );
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        const repos: Archive[] = await res.json();
        archives.value = repos
            .filter((r) => ISO_PREFIX.test(r.name))
            .sort((a, b) => a.name.localeCompare(b.name));
        fetched.value = true;
    } catch (e) {
        error.value = e instanceof Error ? e.message : "Failed to load archives";
    } finally {
        loading.value = false;
    }
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
