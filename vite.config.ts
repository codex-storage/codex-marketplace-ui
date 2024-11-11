import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import packageJson from "./package.json";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), react(), svgr({
    svgrOptions: {
      plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
      svgoConfig: {
        floatPrecision: 2,
      },
    },
    // ...
  })],
  define: {
    "import.meta.env.PACKAGE_VERSION": JSON.stringify(packageJson.version),
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "@sentry/react": ["@sentry/react"],
          "emoji-picker-react": ["emoji-picker-react"],
          "dotted-map": ["dotted-map"],
          "echarts": ["echarts"],
        }
      },
      onwarn(warning, defaultHandler) {
        if (warning.code === "SOURCEMAP_ERROR") {
          return;
        }

        defaultHandler(warning);
      },
    },

  },
  resolve: {
    alias: {
      "../sdk/codex": "../mock",
      "../../sdk/codex": "../../mock",
      "../utils/echo": "../mock",
      "./port-forwarding.util": "../mock",
    },
  },
});
