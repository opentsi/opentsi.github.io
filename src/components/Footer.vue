<script setup lang="ts">
const currentYear = new Date().getFullYear();

const links = {
    software: [
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
                        <span class="text-xl font-bold"
                            >Open Time Series Initiative</span
                        >
                    </div>
                    <p class="text-muted-foreground max-w-md">
                        Version control for time series data. Open source,
                        git-powered, built for researchers.
                    </p>
                </div>

                <!-- Product Links -->
                <div>
                    <h3 class="font-semibold mb-4">Software</h3>
                    <ul class="space-y-2">
                        <li v-for="link in links.software" :key="link.href">
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
            </div>
        </div>
    </footer>
</template>
