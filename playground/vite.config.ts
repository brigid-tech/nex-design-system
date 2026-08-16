import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // Subpaths first — order matters
      {
        find: "@brigid-tech/design-system/styles",
        replacement: path.resolve(__dirname, "../src/styles/globals.css"),
      },
      {
        find: "@brigid-tech/design-system/fonts",
        replacement: path.resolve(__dirname, "../src/styles/fonts.css"),
      },
      {
        find: "@brigid-tech/design-system/preset",
        replacement: path.resolve(__dirname, "../src/preset.ts"),
      },
      {
        find: "@brigid-tech/design-system/tokens",
        replacement: path.resolve(__dirname, "../src/tokens/index.ts"),
      },
      // Root import last
      {
        find: "@brigid-tech/design-system",
        replacement: path.resolve(__dirname, "../src/index.ts"),
      },
      // Resolve deps used by design-system source from playground's node_modules
      {
        find: "clsx",
        replacement: path.resolve(__dirname, "node_modules/clsx"),
      },
      {
        find: "tailwind-merge",
        replacement: path.resolve(__dirname, "node_modules/tailwind-merge"),
      },
      {
        find: "class-variance-authority",
        replacement: path.resolve(__dirname, "node_modules/class-variance-authority"),
      },
    ],
  },
  server: {
    fs: {
      allow: [path.resolve(__dirname, "..")],
    },
  },
});
