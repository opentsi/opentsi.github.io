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
        <div v-if="loading" class="space-y-6">
            <div
                v-for="n in 6"
                :key="n"
                class="h-16 rounded-lg border border-border bg-card/50 animate-pulse"
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

        <!-- List -->
        <div v-else>
            <a
                v-for="archive in archives"
                :key="archive.name"
                :href="archive.html_url"
                target="_blank"
                rel="noopener"
                class="group block pt-10 pb-1 no-underline hover:bg-muted/20 -mx-2 px-2 rounded transition-colors"
            >
                <p class="text-xs text-muted-foreground leading-none mb-1">
                    Updated {{ formatDate(archive.pushed_at) }}
                </p>
                <h3
                    class="not-content text-base font-semibold font-mono text-foreground leading-snug mb-1"
                    style="margin-top: 0"
                >
                    {{ archive.name }}
                </h3>
                <svg
                    width="14"
                    height="14"
                    class="text-muted-foreground group-hover:text-foreground transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                </svg>
                <br />
            </a>
        </div>
    </div>
</template>
