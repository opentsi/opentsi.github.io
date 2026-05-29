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
            { label: "Introduction", slug: "intro" },
            { label: "H4Sci blog (applications)", slug: "intro" },
          ],
        },
        {
          label: "Data",
          items: [{ label: "Introduction", slug: "intro" }],
        },
        {
          label: "Software",
          items: [
            { label: "R", slug: "intro" },
            { label: "Python", slug: "intro" },
          ],
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
