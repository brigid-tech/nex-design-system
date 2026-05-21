import "../src/styles/globals.css"
import type { Preview } from "@storybook/react"

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark",     value: "#0A0B0F" },
        { name: "elevated", value: "#1A1D26" },
      ],
    },
    a11y: { config: {} },
  },
}

export default preview
