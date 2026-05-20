import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  UserRound, MapPin, Shield, Package, Skull, Calendar,
} from "lucide-react";
import { cn } from "../../lib/cn";
import type { EntityType } from "../../tokens/colors";

const badgeVariants = cva(
  "inline-flex items-center gap-1 font-ui font-medium uppercase tracking-[0.06em] border",
  {
    variants: {
      size: {
        sm: "text-[10px] px-1.5 py-px rounded-md",
        md: "text-[11px] px-2 py-0.5 rounded-md",
      },
      entity: {
        character: "text-nex-entity-character bg-[rgba(139,92,246,0.15)] border-[rgba(139,92,246,0.3)]",
        place:     "text-nex-entity-place     bg-[rgba(16,185,129,0.15)]  border-[rgba(16,185,129,0.3)]",
        faction:   "text-nex-entity-faction   bg-[rgba(245,158,11,0.15)]  border-[rgba(245,158,11,0.3)]",
        item:      "text-nex-entity-item      bg-[rgba(59,130,246,0.15)]  border-[rgba(59,130,246,0.3)]",
        creature:  "text-nex-entity-creature  bg-[rgba(239,68,68,0.15)]   border-[rgba(239,68,68,0.3)]",
        event:     "text-nex-entity-event     bg-[rgba(236,72,153,0.15)]  border-[rgba(236,72,153,0.3)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const ENTITY_ICONS: Record<EntityType, React.ElementType> = {
  character: UserRound,
  place:     MapPin,
  faction:   Shield,
  item:      Package,
  creature:  Skull,
  event:     Calendar,
};

const ENTITY_LABELS: Record<EntityType, string> = {
  character: "Personagem",
  place:     "Local",
  faction:   "Facção",
  item:      "Item",
  creature:  "Criatura",
  event:     "Evento",
};

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  entity: EntityType;
  showIcon?: boolean;
  label?: string;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, entity, size, showIcon = true, label, ...props }, ref) => {
    const Icon = ENTITY_ICONS[entity];
    const iconSize = size === "sm" ? 10 : 11;

    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ entity, size }), className)}
        {...props}
      >
        {showIcon && <Icon size={iconSize} strokeWidth={2} />}
        {label ?? ENTITY_LABELS[entity]}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants, ENTITY_ICONS, ENTITY_LABELS };
