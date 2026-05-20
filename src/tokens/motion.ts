export const transitionDuration = {
  micro:  "100ms",
  ui:     "150ms",
  panel:  "250ms",
  page:   "400ms",
} as const;

export const transitionTimingFunction = {
  "ease-out":    "cubic-bezier(0.16, 1, 0.3, 1)",
  "ease-in":     "cubic-bezier(0.4, 0, 1, 1)",
  "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

export const animation = {
  "glow-pulse":        "nex-glow-pulse 3s ease-in-out infinite",
  "glow-pulse-cyan":   "nex-glow-pulse-cyan 3s ease-in-out infinite",
  "glow-pulse-violet": "nex-glow-pulse-violet 3s ease-in-out infinite",
  "magic-breathe":     "nex-magic-breathe 4s ease-in-out infinite",
  "mention-flash":     "nex-mention-flash 300ms ease-in-out",
  "spin":              "nex-spin 700ms linear infinite",
} as const;
