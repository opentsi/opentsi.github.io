import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://opentsi.github.io",
  integrations: [
    starlight({
      title: "opentsi docs",
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
            { label: "Web Previews", slug: "web_preview" },
          ],
        },
        {
          label: "Software",
          items: [{ label: "R Integration", slug: "r_integration" }],
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
