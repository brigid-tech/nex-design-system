import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // Subpaths first — order matters
      {
        find: "@nexus-creator-app/design-system/styles",
        replacement: path.resolve(__dirname, "../src/styles/globals.css"),
      },
      {
        find: "@nexus-creator-app/design-system/fonts",
        replacement: path.resolve(__dirname, "../src/styles/fonts.css"),
      },
      {
        find: "@nexus-creator-app/design-system/preset",
        replacement: path.resolve(__dirname, "../src/preset.ts"),
      },
      {
        find: "@nexus-creator-app/design-system/tokens",
        replacement: path.resolve(__dirname, "../src/tokens/index.ts"),
      },
      // Root import last
      {
        find: "@nexus-creator-app/design-system",
        replacement: path.resolve(__dirname, "../src/index.ts"),
      },
    ],
  },
});
