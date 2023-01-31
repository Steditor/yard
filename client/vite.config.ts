import vue from "@vitejs/plugin-vue";
import * as fs from "fs";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

import localConfig from "../local.config.json" assert { type: "json" };

const faviconCode = fs.readFileSync("../logo/favicon/html_code.html", "utf8");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      name: "include-favicon-code",
      enforce: "pre",
      transformIndexHtml(html: string) {
        return html.replace("<!-- faviconGenerator -->", faviconCode);
      },
    },
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: "../logo/favicon/*.{png,xml,ico,svg,webmanifest}",
          dest: ".",
        },
      ],
    }),
  ],
  server: {
    port: localConfig.VUE_DEV_SERVER_PORT,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("monaco-editor")) {
            return "monaco-editor";
          } else if (id.includes("prime")) {
            return "primefaces";
          } else if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
