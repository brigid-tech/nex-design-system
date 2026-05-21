import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import { colors } from "./tokens/colors";
import { fontFamily, fontSize } from "./tokens/typography";
import { spacing, borderRadius } from "./tokens/spacing";
import { transitionDuration, transitionTimingFunction, animation } from "./tokens/motion";
import { boxShadow } from "./tokens/shadows";

const nexPreset: Config = {
  content: [],
  theme: {
    extend: {
      colors: {
        nex: {
          bg: {
            primary:   "var(--nex-bg-primary)",
            secondary: "var(--nex-bg-secondary)",
            elevated:  "var(--nex-bg-elevated)",
            hover:     "var(--nex-bg-hover)",
          },
          border: {
            subtle:  "var(--nex-border-subtle)",
            default: "var(--nex-border-default)",
            strong:  "var(--nex-border-strong)",
          },
          text: {
            primary:   "var(--nex-text-primary)",
            secondary: "var(--nex-text-secondary)",
            tertiary:  "var(--nex-text-tertiary)",
            inverted:  "var(--nex-text-inverted)",
          },
          brand: {
            cyan:   "var(--nex-brand-cyan)",
            violet: "var(--nex-brand-violet)",
            gold:   "var(--nex-brand-gold)",
          },
          success: "var(--nex-success)",
          warning: "var(--nex-warning)",
          error:   "var(--nex-error)",
          info:    "var(--nex-info)",
          entity: {
            character: colors.entity.character.DEFAULT,
            place:     colors.entity.place.DEFAULT,
            faction:   colors.entity.faction.DEFAULT,
            item:      colors.entity.item.DEFAULT,
            creature:  colors.entity.creature.DEFAULT,
            event:     colors.entity.event.DEFAULT,
          },
        },
      },
      fontFamily: {
        display: fontFamily.display as unknown as string[],
        ui:      fontFamily.ui as unknown as string[],
        mono:    fontFamily.mono as unknown as string[],
      },
      fontSize: fontSize as unknown as Config["theme"] extends undefined ? never : NonNullable<Config["theme"]>["fontSize"],
      spacing,
      borderRadius: {
        ...borderRadius,
        DEFAULT: borderRadius.md,
      },
      transitionDuration: transitionDuration as unknown as Record<string, string>,
      transitionTimingFunction: transitionTimingFunction as unknown as Record<string, string>,
      animation: {
        ...(animation as unknown as Record<string, string>),
        in: "fade-in 150ms ease-out",
        out: "fade-out 150ms ease-in",
      },
      keyframes: {
        "fade-in":  { from: { opacity: "0" } },
        "fade-out": { to:   { opacity: "0" } },
        "zoom-in":  { from: { opacity: "0", transform: "scale(0.96)" } },
        "zoom-out": { to:   { opacity: "0", transform: "scale(0.96)" } },
      },
      boxShadow: boxShadow as unknown as Record<string, string>,
    },
  },
  plugins: [tailwindcssAnimate],
};

export default nexPreset;
