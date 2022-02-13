import vue from "@vitejs/plugin-vue";
import * as fs from "fs";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { viteStaticCopy } from "vite-plugin-static-copy";

import localConfig from "../local.config.json";

const faviconGenerator = fs.readFileSync(
  "../logo/favicon/html_code.html",
  "utf8",
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      entry: "src/main.ts",
      template: "index.html",
      inject: {
        data: {
          faviconGenerator,
        },
      },
    }),
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
});
