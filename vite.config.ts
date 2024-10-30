import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import packageJson from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), react()],
  define: {
    "import.meta.env.PACKAGE_VERSION": JSON.stringify(packageJson.version),
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      onwarn(warning, defaultHandler) {
        if (warning.code === "SOURCEMAP_ERROR") {
          return;
        }

        defaultHandler(warning);
      },
      output: {
        manualChunks: {
          "emoji-picker-react": ["emoji-picker-react"]
        }
      }
    },

  },
  resolve: {
    alias: {
      "../sdk/codex": "../mock",
      "../../sdk/codex": "../../mock",
      "../utils/echo": "../mock"
    },
  },
});
