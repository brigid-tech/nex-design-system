import type { Config } from "tailwindcss";
import nexPreset from "./src/preset";

const config: Config = {
  presets: [nexPreset],
  content: ["./src/**/*.{ts,tsx}"],
};

export default config;
