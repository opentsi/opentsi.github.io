<script setup lang="ts">
import { onMounted } from "vue";
import { useArchives } from "../composables/useArchives";

const { count, fetchArchives } = useArchives();
onMounted(fetchArchives);
</script>

<template>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-6">
        <div
            class="rounded-xl border border-border bg-card/30 backdrop-blur-sm px-8 py-5 flex items-center justify-between gap-6"
        >
            <div class="flex items-center gap-4">
                <div class="p-2.5 rounded-lg bg-muted/50 flex items-center gap-3">
                    <svg
                        class="w-5 h-5 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                    <span v-if="count > 0" class="text-xl font-bold text-foreground leading-none">{{ count }}</span>
                </div>
                <div>
                    <span class="text-sm font-medium text-foreground"
                        >Community Data Archives</span
                    >
                    <p class="text-xs text-muted-foreground mt-0.5">
                        Scientific-grade public time series data,
                        revision-tracked and ready to use.
                    </p>
                </div>
            </div>
            <a
                href="/listed_data/"
                class="shrink-0 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            >
                Browse archives
                <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </a>
        </div>
    </div>
</template>
