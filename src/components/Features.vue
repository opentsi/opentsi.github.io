<script setup lang="ts">
interface Feature {
    icon: string;
    title: string;
    description: string;
}

const features: Feature[] = [
    {
        icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`,
        title: "Community Hosted Data",
        description:
            "Find datasets from different public sources turned into scientific-grade time series data. Realtime information in one homogeneous format across origins.",
    },
    {
        icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
        title: "Track Data Revisions",
        description:
            "Every revision of your time series data is preserved with full history. Travel back to any point in time to see exactly what your data looked like.",
    },
    {
        icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>`,
        title: "Free Hosting",
        description:
            "Leverage GitHub for free data hosting and version control. No infrastructure costs, no server maintenance, just reliable data access.",
    },
    {
        icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>`,
        title: "R Integration",
        description:
            "Stay at home while consuming data. Work with existing core data science workflows and tools without thinking about Advanced Version Control.",
    },
    {
        icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>`,
        title: "Run Your Own Archives",
        description:
            "Use our boilerplate package to set up your own archive including versions and meta information. Host it privately or contribute your archive to github/opentsi.",
    },
    {
        icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>`,
        title: "Web Previews for Visibility",
        description:
            "Benefit from built-in static web content generators to provide clean, informative dataset information sites without additional effort.",
    },
];
</script>

<template>
    <section id="features" class="py-24 sm:py-32 relative">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <!-- Section header -->
            <div class="text-center space-y-4 mb-16">
                <h2 class="text-4xl sm:text-5xl font-bold tracking-tight">
                    <span
                        class="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
                    >
                        Built for the Research Community
                    </span>
                </h2>
                <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Low maintenance footprint - homecourt advantage for
                    researchers.
                </p>
            </div>

            <!-- Features grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div
                    v-for="(feature, index) in features"
                    :key="index"
                    class="group relative p-8 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all hover:shadow-xl hover:-translate-y-1"
                >
                    <!-- Icon -->
                    <div
                        class="inline-flex p-3 rounded-lg bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform"
                        v-html="feature.icon"
                    ></div>

                    <!-- Content -->
                    <h3 class="text-xl font-semibold mb-2">
                        {{ feature.title }}
                    </h3>
                    <p class="text-muted-foreground leading-relaxed">
                        {{ feature.description }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>
