import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    preset: "src/preset.ts",
    "tokens/index": "src/tokens/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "tailwindcss"],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
  async onSuccess() {
    const { cpSync, mkdirSync } = await import("fs");
    mkdirSync("dist/styles", { recursive: true });
    cpSync("src/styles", "dist/styles", { recursive: true });
  },
});
