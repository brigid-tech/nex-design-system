export const fontFamily = {
  display: ["Cinzel", "Iowan Old Style", "Georgia", "serif"],
  ui:      ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
  mono:    ["JetBrains Mono", "SF Mono", "Consolas", "monospace"],
} as const;

export const fontSize = {
  "display-xl": ["48px", { fontWeight: "700", letterSpacing: "-0.02em", lineHeight: "1.1" }],
  "display":    ["36px", { fontWeight: "700", letterSpacing: "-0.01em", lineHeight: "1.15" }],
  "h1":         ["28px", { fontWeight: "600", letterSpacing: "0.01em",  lineHeight: "1.2" }],
  "h2":         ["22px", { fontWeight: "600", letterSpacing: "0",       lineHeight: "1.3" }],
  "h3":         ["18px", { fontWeight: "600", letterSpacing: "0",       lineHeight: "1.35" }],
  "h4":         ["15px", { fontWeight: "600", letterSpacing: "0",       lineHeight: "1.4" }],
  "body-lg":    ["16px", { lineHeight: "1.6" }],
  "body":       ["14px", { lineHeight: "1.5" }],
  "body-sm":    ["13px", { lineHeight: "1.4" }],
  "caption":    ["12px", { lineHeight: "1.4" }],
  "label":      ["11px", { fontWeight: "500", letterSpacing: "0.08em", lineHeight: "1.4" }],
  "code":       ["13px", { lineHeight: "1.4" }],
} as const;
