<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import Button from "./Button.vue";

const activeTab = ref<"chart" | "r">("chart");

// ── Chart configuration ── edit these to change the demo ─────────────
const chartConfig = {
    archive: "opentsi/ch.kof.globalbaro",  // GitHub org/repo
    key: "leading",                          // CSV filename without .csv
    vintageDate: "2026-01-10",              // ISO date for comparison vintage
    title: "KOF Global Barometer · Leading",
    subtitle: "Monthly · Latest vs. Jan 2026 vintage",
    latestColor: "#818cf8",
    vintageColor: "#f59e0b",
};
// ─────────────────────────────────────────────────────────────────────

const rExample = {
    install: 'remotes::install_github("opentsi/opentimeseries")',
    import: "library(opentimeseries)",
    comment: `Read the latest version of ${chartConfig.key}`,
    code: `read_open_ts("${chartConfig.key}", remote_archive="${chartConfig.archive}")`,
};

// ── Data helpers ──────────────────────────────────────────────────────
type TsRow = { time: string; value: number };

async function fetchCsv(url: string): Promise<TsRow[]> {
    try {
        const res = await fetch(url);
        if (!res.ok) return [];
        const text = await res.text();
        return text
            .trim()
            .split("\n")
            .slice(1)
            .filter(Boolean)
            .map((line) => {
                const [t, v] = line.split(",");
                return {
                    time: t.replace(/"/g, "").trim(),
                    value: parseFloat(v ?? ""),
                };
            })
            .filter((r) => !isNaN(r.value));
    } catch {
        return [];
    }
}

async function fetchVintageSha(
    archive: string,
    key: string,
    date: string,
): Promise<string | null> {
    try {
        const res = await fetch(
            `https://api.github.com/repos/${archive}/commits?path=data-raw/csv/${key}.csv&until=${date}T23:59:59Z&per_page=1`,
        );
        if (!res.ok) return null;
        const commits = await res.json();
        return (commits[0]?.sha as string) ?? null;
    } catch {
        return null;
    }
}

function mergeData(latest: TsRow[], vintage: TsRow[]) {
    const allDates = [
        ...new Set([...latest.map((r) => r.time), ...vintage.map((r) => r.time)]),
    ].sort();
    const lm = new Map(latest.map((r) => [r.time, r.value]));
    const vm = new Map(vintage.map((r) => [r.time, r.value]));
    return {
        dates: allDates,
        latestVals: allDates.map((d) => lm.get(d) ?? null),
        vintageVals: allDates.map((d) => vm.get(d) ?? null),
    };
}

function fmtDate(iso: string) {
    return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
        timeZone: "UTC",
    });
}

// ── Chart lifecycle ───────────────────────────────────────────────────
let chartInstance: any = null;
const chartEl = ref<HTMLDivElement | null>(null);
const chartStatus = ref<"loading" | "ready" | "error">("loading");

async function initChart() {
    if (!chartEl.value) return;

    const { init } = await import("echarts/core");
    const { LineChart } = await import("echarts/charts");
    const { GridComponent, TooltipComponent, LegendComponent } = await import(
        "echarts/components"
    );
    const { CanvasRenderer } = await import("echarts/renderers");
    const echarts = await import("echarts/core");
    echarts.use([
        LineChart,
        GridComponent,
        TooltipComponent,
        LegendComponent,
        CanvasRenderer,
    ]);

    chartInstance = init(chartEl.value, null, { renderer: "canvas" });

    const { archive, key, vintageDate, latestColor, vintageColor } = chartConfig;

    const [sha, latestData] = await Promise.all([
        fetchVintageSha(archive, key, vintageDate),
        fetchCsv(
            `https://raw.githubusercontent.com/${archive}/master/data-raw/csv/${key}.csv`,
        ),
    ]);

    const vintageData = sha
        ? await fetchCsv(
              `https://raw.githubusercontent.com/${archive}/${sha}/data-raw/csv/${key}.csv`,
          )
        : [];

    if (latestData.length === 0) {
        chartStatus.value = "error";
        chartInstance.dispose();
        chartInstance = null;
        return;
    }

    const { dates, latestVals, vintageVals } = mergeData(latestData, vintageData);
    chartStatus.value = "ready";

    const displayDates = dates.map(fmtDate);
    const vintageLabel = vintageData.length > 0 ? `Vintage (${fmtDate(vintageDate)})` : null;
    const tickInterval = Math.max(1, Math.floor(dates.length / 7));

    chartInstance.setOption({
        animation: true,
        grid: { left: 44, right: 16, top: vintageLabel ? 28 : 12, bottom: 32 },
        legend: vintageLabel
            ? {
                  show: true,
                  top: 4,
                  right: 8,
                  itemWidth: 16,
                  itemHeight: 8,
                  textStyle: { color: "oklch(0.65 0.05 250)", fontSize: 10 },
                  data: [
                      { name: "Latest", icon: "rect" },
                      { name: vintageLabel, icon: "rect" },
                  ],
              }
            : { show: false },
        xAxis: {
            type: "category",
            data: displayDates,
            boundaryGap: false,
            axisLine: { lineStyle: { color: "oklch(0.25 0.05 250)" } },
            axisTick: { show: false },
            axisLabel: {
                color: "oklch(0.65 0.05 250)",
                fontSize: 10,
                interval: tickInterval,
            },
        },
        yAxis: {
            show: true,
            scale: true,
            splitLine: {
                lineStyle: {
                    color: "oklch(0.25 0.05 250 / 0.5)",
                    type: "dashed",
                },
            },
            axisLabel: { color: "oklch(0.65 0.05 250)", fontSize: 10 },
        },
        tooltip: {
            trigger: "axis",
            backgroundColor: "oklch(0.2 0.03 250)",
            borderColor: "oklch(0.3 0.05 250)",
            textStyle: { color: "oklch(0.98 0.01 250)", fontSize: 11 },
        },
        series: [
            {
                name: "Latest",
                type: "line",
                data: latestVals,
                smooth: 0.4,
                showSymbol: false,
                lineStyle: { color: latestColor, width: 1.5 },
                areaStyle: {
                    color: {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            { offset: 0, color: latestColor + "50" },
                            { offset: 1, color: latestColor + "00" },
                        ],
                    },
                },
            },
            ...(vintageLabel
                ? [
                      {
                          name: vintageLabel,
                          type: "line",
                          data: vintageVals,
                          smooth: 0.4,
                          showSymbol: false,
                          lineStyle: {
                              color: vintageColor,
                              width: 1.5,
                              type: "dashed",
                          },
                      },
                  ]
                : []),
        ],
    });
}

function disposeChart() {
    chartInstance?.dispose();
    chartInstance = null;
    chartStatus.value = "loading";
}

function handleResize() {
    chartInstance?.resize();
}

onMounted(() => {
    if (activeTab.value === "chart") nextTick(initChart);
    window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
    disposeChart();
    window.removeEventListener("resize", handleResize);
});

watch(activeTab, async (val) => {
    if (val === "chart") {
        await nextTick();
        if (!chartInstance) initChart();
        else chartInstance.resize();
    } else {
        disposeChart();
    }
});
</script>

<template>
    <section
        class="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
        <!-- GitHub top-right link -->
        <a
            href="https://github.com/opentsi"
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
            class="absolute top-8 right-12 z-10 text-muted-foreground hover:text-foreground transition-colors"
        >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
            </svg>
        </a>

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
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        href="https://opentsi.github.io/status"
                        target="_blank"
                        rel="noopener"
                    >
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
                        Browse Data Archives
                    </Button>
                </div>

                <!-- Preview window -->
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

                            <!-- Tab toggle -->
                            <div
                                class="inline-flex items-center rounded-lg border border-border/50 bg-card/30 p-0.5"
                            >
                                <button
                                    @click="activeTab = 'chart'"
                                    :class="[
                                        'px-3 py-1 text-xs font-medium rounded-md transition-all',
                                        activeTab === 'chart'
                                            ? 'bg-primary/80 text-primary-foreground shadow-sm'
                                            : 'text-muted-foreground hover:text-foreground',
                                    ]"
                                >
                                    Example Chart
                                </button>
                                <button
                                    @click="activeTab = 'r'"
                                    :class="[
                                        'px-3 py-1 text-xs font-medium rounded-md transition-all',
                                        activeTab === 'r'
                                            ? 'bg-primary/80 text-primary-foreground shadow-sm'
                                            : 'text-muted-foreground hover:text-foreground',
                                    ]"
                                >
                                    R Example
                                </button>
                            </div>
                        </div>

                        <!-- Chart panel -->
                        <div
                            v-show="activeTab === 'chart'"
                            class="bg-card/50 backdrop-blur-sm"
                        >
                            <!-- Title / subtitle row -->
                            <div class="px-4 pt-3 pb-0 text-left">
                                <p class="text-sm font-medium text-foreground">{{
                                    chartConfig.title
                                }}</p>
                                <p class="text-xs text-muted-foreground">{{
                                    chartConfig.subtitle
                                }}</p>
                            </div>

                            <!-- Loading skeleton -->
                            <div
                                v-if="chartStatus === 'loading'"
                                class="flex items-center justify-center"
                                style="height: 200px"
                            >
                                <div
                                    class="w-5 h-5 rounded-full border-2 border-primary/40 border-t-primary animate-spin"
                                ></div>
                            </div>

                            <!-- Error state -->
                            <div
                                v-else-if="chartStatus === 'error'"
                                class="flex items-center justify-center text-xs text-muted-foreground"
                                style="height: 200px"
                            >
                                Could not load data
                            </div>

                            <!-- ECharts canvas -->
                            <div
                                ref="chartEl"
                                style="width: 100%; height: 200px"
                                :style="{ visibility: chartStatus === 'ready' ? 'visible' : 'hidden' }"
                            ></div>
                        </div>

                        <!-- R example panel -->
                        <div
                            v-show="activeTab === 'r'"
                            class="p-6 font-mono text-sm bg-card/50 backdrop-blur-sm"
                        >
                            <div class="space-y-2">
                                <div class="flex items-start gap-2">
                                    <span class="text-green-500 select-none"
                                        >&gt;</span
                                    >
                                    <span class="text-foreground">{{
                                        rExample.install
                                    }}</span>
                                </div>
                                <div class="flex items-start gap-2">
                                    <span class="text-green-500 select-none"
                                        >&gt;</span
                                    >
                                    <span class="text-foreground">{{
                                        rExample.import
                                    }}</span>
                                </div>
                                <div class="flex items-start gap-2 mt-4">
                                    <span class="text-blue-500 select-none"
                                        >#</span
                                    >
                                    <span class="text-muted-foreground">{{
                                        rExample.comment
                                    }}</span>
                                </div>
                                <div class="flex items-start gap-2">
                                    <span class="text-green-500 select-none"
                                        >&gt;</span
                                    >
                                    <span class="text-foreground">{{
                                        rExample.code
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
