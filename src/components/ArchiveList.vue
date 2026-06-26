<script setup lang="ts">
import { onMounted } from "vue";
import { useArchives } from "../composables/useArchives";

const { archives, loading, error, count, fetchArchives } = useArchives();

function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

onMounted(fetchArchives);
</script>

<template>
    <div>
        <!-- Count line — shown once data has loaded -->
        <p v-if="!loading && !error" class="text-sm text-muted-foreground mb-6">
            <span class="font-medium text-foreground">{{ count }}</span>
            archives available from
            <a
                href="https://github.com/opentsi"
                target="_blank"
                rel="noopener"
                class="underline hover:text-foreground transition-colors"
                >github.com/opentsi</a
            >
            , archive status on
            <a
                href="https://opentsi.github.io/status"
                target="_blank"
                rel="noopener"
                class="underline hover:text-foreground transition-colors"
                >opentsi.github.io/status</a
            >.
        </p>

        <!-- Loading -->
        <div v-if="loading" class="space-y-3">
            <div
                v-for="n in 6"
                :key="n"
                class="h-10 rounded-lg border border-border bg-card/50 animate-pulse"
            ></div>
        </div>

        <!-- Error -->
        <p v-else-if="error" class="text-sm text-muted-foreground py-4">
            {{ error }}
        </p>

        <!-- Empty -->
        <p
            v-else-if="archives.length === 0"
            class="text-sm text-muted-foreground py-4"
        >
            No archives found.
        </p>

        <!-- Table -->
        <div v-else class="overflow-x-auto">
            <table class="w-full text-sm border-collapse">
                <thead>
                    <tr class="border-b border-border text-left">
                        <th class="py-2 pr-6 font-semibold text-foreground">Archive</th>
                        <th class="py-2 pr-6 font-semibold text-foreground">First Vintage</th>
                        <th class="py-2 font-semibold text-foreground">Last Updated</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="archive in archives"
                        :key="archive.name"
                        class="border-b border-border/50 hover:bg-muted/20 transition-colors"
                    >
                        <td class="py-2 pr-6">
                            <a
                                :href="archive.html_url"
                                target="_blank"
                                rel="noopener"
                                class="font-mono font-semibold text-foreground no-underline hover:underline"
                            >{{ archive.name }}</a>
                        </td>
                        <td class="py-2 pr-6 text-muted-foreground">
                            {{ archive.first_commit_at ? formatDate(archive.first_commit_at) : '—' }}
                        </td>
                        <td class="py-2 text-muted-foreground">
                            {{ formatDate(archive.pushed_at) }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
