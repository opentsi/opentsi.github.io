<script setup lang="ts">
import { ref } from "vue";

const activeTab = ref<"read" | "vintage" | "history" | "provider">("read");
const activeLanguage = ref<"r" | "python">("r");

const examples = {
    r: {
        read: `# Read the latest version of a time series
library(opentimeseries)

ts_data <- read_open_ts(
  "leading", remote_archive = "opentsi/kofethz"
)`,
        vintage: `# Read a specific vintage by date
library(opentimeseries)

# Get data as it was published on a specific date
ts_historical <- read_open_ts(
  "ch.kof.globalbaro.leading",
  date = "2023-07-01",
  remote_archive = "opentsi/kofethz"
)`,
        history: `# View data revision history
library(opentimeseries)

# Get the last 5 vintages
history <- read_history(
  "ch.kof.globalbaro.leading",
  remote_archive = "opentsi/kofethz",
  lastn = 5
)`,
        provider: `# For data providers: Initialize and import
library(deloRean)

# Initialize a new archive
archive_init(
  archive_name = "ch.provider.dataset",
  parent_dir = "~/opentsi/"
)

# Import historical vintages
archive_import_history(
  vintages_dt,
  repository_path = "~/opentsi/ch.provider.dataset/"
)`,
    },
    python: {
        read: `# Read the latest version of a time series
from opentsi import read_open_ts

ts_data = read_open_ts(
    "ch.kof.globalbaro.leading",
    remote_archive="opentsi/kofethz"
)`,
        vintage: `# Read a specific vintage by date
from opentsi import read_open_ts

# Get data as it was published on a specific date
ts_historical = read_open_ts(
    "ch.kof.globalbaro.leading",
    date="2023-07-01",
    remote_archive="opentsi/kofethz"
)`,
        history: `# View data revision history
from opentsi import read_history

# Get the last 5 vintages
history = read_history(
    "ch.kof.globalbaro.leading",
    remote_archive="opentsi/kofethz",
    lastn=5
)`,
        provider: `# For data providers: Initialize and import
from opentsi import archive_init, archive_import_history

# Initialize a new archive
archive_init(
    archive_name="ch.provider.dataset",
    parent_dir="~/opentsi/"
)

# Import historical vintages
archive_import_history(
    vintages_df,
    repository_path="~/opentsi/ch.provider.dataset/"
)`,
    },
};

const tabs = [
    { key: "read", label: "Read Data" },
    { key: "vintage", label: "Read Vintage" },
    { key: "history", label: "View History" },
    { key: "provider", label: "Provider Setup" },
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
                        Open Time Series Initiative Roadmap
                    </span>
                </h2>
                <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Libraries to leverage git for scientific time series data
                    management.
                </p>
            </div>

            <!-- Code window -->
            <div class="max-w-5xl mx-auto">
                <div class="code-window">
                    <!-- Header with language switcher -->
                    <!--
                    <div
                        class="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30"
                    >
                        <div class="text-sm font-medium text-muted-foreground">
                            Code Examples
                        </div>


                        <div
                            class="inline-flex items-center rounded-lg border border-border bg-card/50 p-1"
                        >
                            <button
                                @click="activeLanguage = 'r'"
                                :class="[
                                    'px-4 py-1.5 text-sm font-medium rounded-md transition-all',
                                    activeLanguage === 'r'
                                        ? 'bg-primary text-primary-foreground shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground',
                                ]"
                            >
                                R
                            </button>

                            <button
                                @click="activeLanguage = 'python'"
                                :class="[
                                    'px-4 py-1.5 text-sm font-medium rounded-md transition-all',
                                    activeLanguage === 'python'
                                        ? 'bg-primary text-primary-foreground shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground',
                                ]"
                            >
                                Python
                            </button>
                        </div>
                    </div>
                    -->

                    <!-- Tabs -->
                    <div
                        class="flex items-center border-b border-border bg-muted/30"
                    >
                        <button
                            v-for="tab in tabs"
                            :key="tab.key"
                            @click="activeTab = tab.key"
                            :class="[
                                'px-6 py-3 text-sm font-medium transition-colors relative',
                                activeTab === tab.key
                                    ? 'text-primary'
                                    : 'text-muted-foreground hover:text-foreground',
                            ]"
                        >
                            {{ tab.label }}
                            <div
                                v-if="activeTab === tab.key"
                                class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                            ></div>
                        </button>
                    </div>

                    <!-- Code content -->
                    <div
                        class="p-8 font-mono text-sm bg-card/50 backdrop-blur-sm overflow-x-auto"
                    >
                        <pre
                            class="text-foreground leading-relaxed"
                        ><code>{{ examples[activeLanguage][activeTab] }}</code></pre>
                    </div>
                </div>

                <!-- Installation -->
                <!--
                <div
                    class="mt-8 p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm"
                >
                    <div class="flex items-start gap-4">
                        <div class="flex-shrink-0 p-2 rounded-lg bg-primary/10">
                            <svg
                                class="w-6 h-6 text-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>

                        <div class="flex-1">
                            <h3 class="text-lg font-semibold mb-2">
                                Installation
                            </h3>
                            <div
                                v-if="activeLanguage === 'r'"
                                class="font-mono text-sm bg-muted/50 px-4 py-3 rounded-lg space-y-1"
                            >
                                <div>
                                    remotes::install_github("opentsi/opentimeseries")
                                </div>
                                <div class="text-muted-foreground">
                                    # For data providers:
                                </div>
                                <div>
                                    remotes::install_github("opentsi/deloRean")
                                </div>
                            </div>
                            <div
                                v-else
                                class="font-mono text-sm bg-muted/50 px-4 py-3 rounded-lg space-y-1"
                            >
                                <div>pip install opentsi</div>
                                <div class="text-muted-foreground">
                                    # Python package coming soon
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                -->
            </div>
        </div>
    </section>
</template>
