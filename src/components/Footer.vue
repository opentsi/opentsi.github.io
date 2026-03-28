<script setup lang="ts">
const currentYear = new Date().getFullYear();

const links = {
    product: [
        {
            label: "opentimeseries",
            href: "https://github.com/opentsi/opentimeseries",
        },
        { label: "deloRean", href: "https://github.com/opentsi/deloRean" },
    ],
    resources: [
        {
            label: "Contribute: Data Listing Request",
            href: "https://github.com/opentsi/opentsi/blob/main/CONTRIBUTING.md",
        },
    ],
};
</script>

<template>
    <footer class="border-t border-border bg-muted/30">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <!-- Brand -->
                <div class="md:col-span-2 space-y-4">
                    <div class="flex items-center gap-2">
                        <div
                            class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500"
                        ></div>
                        <span class="text-xl font-bold">OpenTSI</span>
                    </div>
                    <p class="text-muted-foreground max-w-md">
                        Version control for time series data. Open source,
                        git-powered, built for researchers.
                    </p>
                </div>

                <!-- Product Links -->
                <div>
                    <h3 class="font-semibold mb-4">Product</h3>
                    <ul class="space-y-2">
                        <li v-for="link in links.product" :key="link.href">
                            <a
                                :href="link.href"
                                class="text-muted-foreground hover:text-foreground transition-colors"
                                :target="
                                    link.href.startsWith('http')
                                        ? '_blank'
                                        : undefined
                                "
                                :rel="
                                    link.href.startsWith('http')
                                        ? 'noopener'
                                        : undefined
                                "
                            >
                                {{ link.label }}
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Resources Links -->
                <div>
                    <h3 class="font-semibold mb-4">Resources</h3>
                    <ul class="space-y-2">
                        <li v-for="link in links.resources" :key="link.href">
                            <a
                                :href="link.href"
                                class="text-muted-foreground hover:text-foreground transition-colors"
                                :target="
                                    link.href.startsWith('http')
                                        ? '_blank'
                                        : undefined
                                "
                                :rel="
                                    link.href.startsWith('http')
                                        ? 'noopener'
                                        : undefined
                                "
                            >
                                {{ link.label }}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Bottom bar -->
            <div
                class="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4"
            >
                <p class="text-sm text-muted-foreground">
                    © {{ currentYear }} Open Time Series Initiative. Open source
                    under MIT License.
                </p>
                <div class="flex items-center gap-6">
                    <a
                        href="https://github.com/opentsi"
                        target="_blank"
                        rel="noopener"
                        class="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="GitHub"
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
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>
