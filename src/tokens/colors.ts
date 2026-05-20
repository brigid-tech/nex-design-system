export const colors = {
  bg: {
    primary:   "#0A0B0F",
    secondary: "#111318",
    elevated:  "#1A1D26",
    hover:     "#1F2330",
  },
  border: {
    subtle:  "rgba(255, 255, 255, 0.06)",
    default: "rgba(255, 255, 255, 0.10)",
    strong:  "rgba(255, 255, 255, 0.18)",
  },
  text: {
    primary:   "#F0F2F8",
    secondary: "#8B90A0",
    tertiary:  "#52566A",
    inverted:  "#0A0B0F",
  },
  brand: {
    cyan:   "#00D4FF",
    violet: "#8B5CF6",
  },
  semantic: {
    success: "#10B981",
    warning: "#F59E0B",
    error:   "#EF4444",
    info:    "#3B82F6",
  },
  entity: {
    character: {
      DEFAULT: "#8B5CF6",
      bg:      "rgba(139, 92, 246, 0.15)",
      bgHover: "rgba(139, 92, 246, 0.28)",
      border:  "rgba(139, 92, 246, 0.40)",
      borderHover: "rgba(139, 92, 246, 0.65)",
    },
    place: {
      DEFAULT: "#10B981",
      bg:      "rgba(16, 185, 129, 0.15)",
      bgHover: "rgba(16, 185, 129, 0.28)",
      border:  "rgba(16, 185, 129, 0.40)",
      borderHover: "rgba(16, 185, 129, 0.65)",
    },
    faction: {
      DEFAULT: "#F59E0B",
      bg:      "rgba(245, 158, 11, 0.15)",
      bgHover: "rgba(245, 158, 11, 0.28)",
      border:  "rgba(245, 158, 11, 0.40)",
      borderHover: "rgba(245, 158, 11, 0.65)",
    },
    item: {
      DEFAULT: "#3B82F6",
      bg:      "rgba(59, 130, 246, 0.15)",
      bgHover: "rgba(59, 130, 246, 0.28)",
      border:  "rgba(59, 130, 246, 0.40)",
      borderHover: "rgba(59, 130, 246, 0.65)",
    },
    creature: {
      DEFAULT: "#EF4444",
      bg:      "rgba(239, 68, 68, 0.15)",
      bgHover: "rgba(239, 68, 68, 0.28)",
      border:  "rgba(239, 68, 68, 0.40)",
      borderHover: "rgba(239, 68, 68, 0.65)",
    },
    event: {
      DEFAULT: "#EC4899",
      bg:      "rgba(236, 72, 153, 0.15)",
      bgHover: "rgba(236, 72, 153, 0.28)",
      border:  "rgba(236, 72, 153, 0.40)",
      borderHover: "rgba(236, 72, 153, 0.65)",
    },
  },
} as const;

export type EntityType = keyof typeof colors.entity;
