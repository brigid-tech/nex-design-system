import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";
import type { EntityType } from "../../tokens/colors";

const mentionVariants = cva(
  [
    "inline-flex items-center gap-1",
    "px-2 py-0.5 rounded-md",
    "font-mono text-body-sm",
    "cursor-pointer border",
    "transition-all duration-ui ease-out",
  ],
  {
    variants: {
      entity: {
        character: [
          "text-nex-entity-character",
          "bg-[rgba(139,92,246,0.15)] border-[rgba(139,92,246,0.4)]",
          "hover:bg-[rgba(139,92,246,0.28)] hover:border-[rgba(139,92,246,0.65)]",
        ],
        place: [
          "text-nex-entity-place",
          "bg-[rgba(16,185,129,0.15)] border-[rgba(16,185,129,0.4)]",
          "hover:bg-[rgba(16,185,129,0.28)] hover:border-[rgba(16,185,129,0.65)]",
        ],
        faction: [
          "text-nex-entity-faction",
          "bg-[rgba(245,158,11,0.15)] border-[rgba(245,158,11,0.4)]",
          "hover:bg-[rgba(245,158,11,0.28)] hover:border-[rgba(245,158,11,0.65)]",
        ],
        item: [
          "text-nex-entity-item",
          "bg-[rgba(59,130,246,0.15)] border-[rgba(59,130,246,0.4)]",
          "hover:bg-[rgba(59,130,246,0.28)] hover:border-[rgba(59,130,246,0.65)]",
        ],
        creature: [
          "text-nex-entity-creature",
          "bg-[rgba(239,68,68,0.15)] border-[rgba(239,68,68,0.4)]",
          "hover:bg-[rgba(239,68,68,0.28)] hover:border-[rgba(239,68,68,0.65)]",
        ],
        event: [
          "text-nex-entity-event",
          "bg-[rgba(236,72,153,0.15)] border-[rgba(236,72,153,0.4)]",
          "hover:bg-[rgba(236,72,153,0.28)] hover:border-[rgba(236,72,153,0.65)]",
        ],
      },
    },
    defaultVariants: {
      entity: "character",
    },
  }
);

export interface MentionProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof mentionVariants> {
  entity?: EntityType;
  resolved?: React.ReactNode;
  flash?: boolean;
}

const Mention = React.forwardRef<HTMLSpanElement, MentionProps>(
  ({ className, entity = "character", resolved, flash, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          mentionVariants({ entity }),
          flash && "animate-mention-flash",
          className
        )}
        {...props}
      >
        {children}
        {resolved !== undefined && (
          <span className="ml-1">
            <span className="text-nex-text-tertiary">= </span>
            <span className="text-nex-text-primary">{resolved}</span>
          </span>
        )}
      </span>
    );
  }
);

Mention.displayName = "Mention";

export { Mention, mentionVariants };
