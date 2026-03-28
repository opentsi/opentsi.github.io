<script setup lang="ts">
import { ref } from "vue";
import Button from "./Button.vue";

const activeLanguage = ref<"r" | "python">("r");

const terminalExamples = {
    r: {
        install: 'remotes::install_github("opentsi/opentimeseries")',
        import: "library(opentimeseries)",
        comment: "Read the latest version of a time series",
        code: 'read_open_ts("leading", remote_archive="opentsi/ch.kof.globalbaro")',
    },
    python: {
        install: "coming soon...",
        import: "coming soon...",
        comment: "...",
        code: "coming soon",
    },
};
</script>

<template>
    <section
        class="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
        <!-- Background gradients -->
        <div class="absolute inset-0 -z-10">
            <div
                class="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
            ></div>
            <div
                class="absolute top-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
            ></div>
            <div
                class="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
            ></div>
        </div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div class="text-center space-y-8 animate-fade-in">
                <!-- Badge -->

                <!-- Main headline -->
                <div class="space-y-4">
                    <h1
                        class="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
                    >
                        <span
                            class="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent"
                        >
                            An Open Framework to
                        </span>
                        <br />
                        <span
                            class="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
                        >
                            Manage Time Series Data
                        </span>
                    </h1>

                    <p
                        class="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                    >
                        Track vintages, automate data ingestion and leverage
                        public sources for research. Data stored on GitHub,
                        accessed directly from R.
                    </p>
                </div>

                <!-- CTA Buttons -->
                <div
                    class="flex flex-wrap items-center justify-center gap-4 pt-4"
                >
                    <Button variant="default" size="lg" href="#get-started">
                        Learn more
                        <svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        href="https://github.com/opentsi"
                        target="_blank"
                        rel="noopener"
                    >
                        <svg
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                            />
                        </svg>
                        View on GitHub
                    </Button>
                </div>

                <!-- Terminal preview -->
                <div class="pt-12 max-w-4xl mx-auto">
                    <div class="code-window animate-slide-up">
                        <div class="code-window-header">
                            <div class="flex items-center gap-2">
                                <div class="code-window-dot bg-red-500"></div>
                                <div
                                    class="code-window-dot bg-yellow-500"
                                ></div>
                                <div class="code-window-dot bg-green-500"></div>
                            </div>

                            <!-- Language toggle -->
                            <div
                                class="inline-flex items-center rounded-lg border border-border/50 bg-card/30 p-0.5"
                            >
                                <button
                                    @click="activeLanguage = 'r'"
                                    :class="[
                                        'px-3 py-1 text-xs font-medium rounded-md transition-all',
                                        activeLanguage === 'r'
                                            ? 'bg-primary/80 text-primary-foreground shadow-sm'
                                            : 'text-muted-foreground hover:text-foreground',
                                    ]"
                                >
                                    R
                                </button>
                                <button
                                    @click="activeLanguage = 'python'"
                                    :class="[
                                        'px-3 py-1 text-xs font-medium rounded-md transition-all',
                                        activeLanguage === 'python'
                                            ? 'bg-primary/80 text-primary-foreground shadow-sm'
                                            : 'text-muted-foreground hover:text-foreground',
                                    ]"
                                >
                                    Python
                                </button>
                            </div>
                        </div>
                        <div
                            class="p-6 font-mono text-sm bg-card/50 backdrop-blur-sm"
                        >
                            <div class="space-y-2">
                                <div class="flex items-start gap-2">
                                    <span class="text-green-500 select-none"
                                        >></span
                                    >
                                    <span class="text-foreground">{{
                                        terminalExamples[activeLanguage].install
                                    }}</span>
                                </div>
                                <div class="flex items-start gap-2">
                                    <span
                                        class="text-green-500 select-none"
                                        v-if="activeLanguage === 'r'"
                                        >></span
                                    >
                                    <span
                                        class="text-green-500 select-none"
                                        v-else
                                        >$</span
                                    >
                                    <span class="text-foreground">{{
                                        terminalExamples[activeLanguage].import
                                    }}</span>
                                </div>
                                <div class="flex items-start gap-2 mt-4">
                                    <span class="text-blue-500 select-none"
                                        >#</span
                                    >
                                    <span class="text-muted-foreground">{{
                                        terminalExamples[activeLanguage].comment
                                    }}</span>
                                </div>
                                <div class="flex items-start gap-2">
                                    <span
                                        class="text-green-500 select-none"
                                        v-if="activeLanguage === 'r'"
                                        >&gt;</span
                                    >
                                    <span
                                        class="text-green-500 select-none"
                                        v-else
                                        >&gt;&gt;&gt;</span
                                    >
                                    <span class="text-foreground">{{
                                        terminalExamples[activeLanguage].code
                                    }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
