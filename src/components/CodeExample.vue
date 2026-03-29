<script setup lang="ts">
import { ref } from "vue";

const activeTabOts = ref<"read" | "vintage" | "history">("read");
const activeTabDelo = ref<"init" | "import">("init");

const otsExamples = {
    read: `# Read the latest version of a time series
library(opentimeseries)

ts_data <- read_open_ts(
  "leading",
  remote_archive = "opentsi/ch.kof.globalbaro"
)`,
    vintage: `# Read a specific vintage by date
library(opentimeseries)

# Get data as it was published on a specific date
ts_historical <- read_open_ts(
  "leading",
  date = "2023-07-01",
  remote_archive = "opentsi/ch.kof.globalbaro"
)`,
    history: `# Browse revision history
library(opentimeseries)

# Get the last 5 vintages of a series
history <- read_history(
  "leading",
  remote_archive = "opentsi/ch.kof.globalbaro",
  lastn = 5
)`,
};

const deloExamples = {
    init: `# Initialize a new archive
library(deloRean)

archive_init(
  archive_name = "ch.provider.dataset",
  parent_dir = "~/opentsi/"
)`,
    import: `# Import historical vintages
library(deloRean)

archive_import_history(
  vintages_dt,
  repository_path = "~/opentsi/ch.provider.dataset/"
)`,
};

const otsTabs = [
    { key: "read", label: "Read Latest" },
    { key: "vintage", label: "Read Vintage" },
    { key: "history", label: "History" },
] as const;

const deloTabs = [
    { key: "init", label: "Initialize" },
    { key: "import", label: "Import" },
] as const;
</script>

<template>
    <section id="get-started" class="py-24 sm:py-32 bg-muted/30">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <!-- Section header -->
            <div class="text-center space-y-4 mb-16">
                <h2 class="text-4xl sm:text-5xl font-bold tracking-tight">
                    <span
                        class="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
                    >
                        Open Time Series Initiative Toolbox
                    </span>
                </h2>
                <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Two R packages. One for consuming data, one for managing it.
                </p>
            </div>

            <!-- Package cards -->
            <div
                class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto overflow-hidden"
            >
                <!-- opentimeseries card -->
                <div class="code-window flex flex-col min-w-0">
                    <!-- Card header -->
                    <div class="px-6 py-5 border-b border-border bg-muted/30">
                        <div class="flex items-center justify-between mb-1">
                            <span
                                class="font-mono text-lg font-semibold text-primary"
                            >
                                opentimeseries
                            </span>
                            <span
                                class="text-xs px-2.5 py-1 rounded-full border border-primary/30 text-primary bg-primary/10 font-medium"
                            >
                                for consumers
                            </span>
                        </div>
                        <p class="text-sm text-muted-foreground">
                            Read, query, and explore time series data from any
                            OpenTSI archive.
                        </p>
                    </div>

                    <!-- Tabs -->
                    <div
                        class="flex items-center border-b border-border bg-muted/20"
                    >
                        <button
                            v-for="tab in otsTabs"
                            :key="tab.key"
                            @click="activeTabOts = tab.key"
                            :class="[
                                'px-5 py-3 text-sm font-medium transition-colors relative',
                                activeTabOts === tab.key
                                    ? 'text-primary'
                                    : 'text-muted-foreground hover:text-foreground',
                            ]"
                        >
                            {{ tab.label }}
                            <div
                                v-if="activeTabOts === tab.key"
                                class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                            ></div>
                        </button>
                    </div>

                    <!-- Code -->
                    <div
                        class="p-6 font-mono text-sm bg-card/50 flex-1 overflow-x-auto"
                    >
                        <pre
                            class="text-foreground leading-relaxed"
                        ><code>{{ otsExamples[activeTabOts] }}</code></pre>
                    </div>

                    <!-- Install -->
                    <div class="px-6 py-4 border-t border-border bg-muted/20">
                        <span class="text-xs text-muted-foreground mr-2"
                            >install</span
                        >
                        <code class="text-xs font-mono text-foreground/70"
                            >remotes::install_github("opentsi/opentimeseries")</code
                        >
                    </div>
                </div>

                <!-- deloRean card -->
                <div class="code-window flex flex-col min-w-0">
                    <!-- Card header -->
                    <div class="px-6 py-5 border-b border-border bg-muted/30">
                        <div class="flex items-center justify-between mb-1">
                            <span
                                class="font-mono text-lg font-semibold"
                                style="color: oklch(0.65 0.22 310)"
                            >
                                deloRean
                            </span>
                            <span
                                class="text-xs px-2.5 py-1 rounded-full border font-medium"
                                style="
                                    color: oklch(0.65 0.22 310);
                                    background-color: oklch(
                                        0.65 0.22 310 / 0.1
                                    );
                                    border-color: oklch(0.65 0.22 310 / 0.3);
                                "
                            >
                                for providers
                            </span>
                        </div>
                        <p class="text-sm text-muted-foreground">
                            Set up and manage archives with full revision
                            history. Time travel included.
                        </p>
                    </div>

                    <!-- Tabs -->
                    <div
                        class="flex items-center border-b border-border bg-muted/20"
                    >
                        <button
                            v-for="tab in deloTabs"
                            :key="tab.key"
                            @click="activeTabDelo = tab.key"
                            :class="[
                                'px-5 py-3 text-sm font-medium transition-colors relative',
                                activeTabDelo === tab.key
                                    ? 'text-foreground'
                                    : 'text-muted-foreground hover:text-foreground',
                            ]"
                        >
                            {{ tab.label }}
                            <div
                                v-if="activeTabDelo === tab.key"
                                class="absolute bottom-0 left-0 right-0 h-0.5"
                                style="background-color: oklch(0.65 0.22 310)"
                            ></div>
                        </button>
                    </div>

                    <!-- Code -->
                    <div
                        class="p-6 font-mono text-sm bg-card/50 flex-1 overflow-x-auto"
                    >
                        <pre
                            class="text-foreground leading-relaxed"
                        ><code>{{ deloExamples[activeTabDelo] }}</code></pre>
                    </div>

                    <!-- Install -->
                    <div class="px-6 py-4 border-t border-border bg-muted/20">
                        <span class="text-xs text-muted-foreground mr-2"
                            >install</span
                        >
                        <code class="text-xs font-mono text-foreground/70"
                            >remotes::install_github("opentsi/deloRean")</code
                        >
                    </div>
                </div>
            </div>

            <!-- Community archive teaser -->
            <div class="max-w-6xl mx-auto mt-8">
                <div
                    class="rounded-xl border border-border bg-card/30 backdrop-blur-sm px-8 py-5 flex items-center justify-between gap-6"
                >
                    <div class="flex items-center gap-4">
                        <div class="p-2.5 rounded-lg bg-muted/50">
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
                        href="https://github.com/opentsi"
                        target="_blank"
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
        </div>
    </section>
</template>
