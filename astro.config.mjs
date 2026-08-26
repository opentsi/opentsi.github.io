import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://opentsi.github.io",
  integrations: [
    starlight({
      title: "opentsi docs",
      head: [
        {
          tag: "script",
          attrs: {
            defer: true,
            src: "https://analytics.alpine-jellyfish.ch/script.js",
            "data-website-id": "b655e06f-99dd-458e-bbb6-31965a039910",
          },
        },
      ],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/opentsi",
        },
      ],
      sidebar: [
        {
          label: "Open Time Series Initiative",
          items: [
            { label: "How to Read This Documentation?", slug: "intro" },
            { label: "About", slug: "about" },
          ],
        },
        {
          label: "Data",
          items: [
            { label: "Listed Data Packages", slug: "listed_data" },
            { label: "Community Hosted Data", slug: "community_hosted" },
            { label: "Free Hosting", slug: "free_hosting" },
            { label: "Track Data Revisions", slug: "track_data" },
            { label: "Dataset Status Dashboard", slug: "status" },
          ],
        },
        {
          label: "Software",
          items: [
            { label: "opentimeseries R package", slug: "opentimeseries_r" },
          ],
        },
        {
          label: "Hosting Your Own",
          items: [{ label: "Run Your Own Archives", slug: "own_archives" }],
        },
      ],
    }),
    vue(),
  ],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ["vue"],
    },
  },
});
