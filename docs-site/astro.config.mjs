import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://marquis-docs.esolia.workers.dev",
  integrations: [
    starlight({
      title: "Marquis",
      description:
        "eSolia Inc UI component library for TypeScript projects, especially on Cloudflare Workers.",
      social: [
        { icon: "github", label: "GitHub", href: "https://github.com/eSolia/marquis" },
        { icon: "jsr", label: "JSR", href: "https://jsr.io/@esolia/marquis" },
      ],
      sidebar: [
        { label: "Tutorials", autogenerate: { directory: "tutorials" } },
        {
          label: "API Reference",
          link: "/api/",
          attrs: { target: "_blank", rel: "noopener" },
          badge: { text: "deno doc", variant: "tip" },
        },
      ],
      editLink: {
        baseUrl: "https://github.com/eSolia/marquis/edit/main/docs-site/",
      },
      lastUpdated: true,
    }),
  ],
});
