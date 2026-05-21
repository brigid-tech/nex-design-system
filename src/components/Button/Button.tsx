import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 overflow-hidden isolate",
    "font-ui font-semibold whitespace-nowrap cursor-pointer",
    "border border-transparent rounded-md",
    "transition-all duration-ui ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nex-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-nex-bg-primary",
    "disabled:opacity-50 disabled:pointer-events-none",
    "active:scale-[0.98]",
  ],
  {
    variants: {
      variant: {
        // Solid · gradient / magic
        gradient: [
          "bg-gradient-to-br from-nex-brand-cyan to-nex-brand-violet",
          "text-nex-text-inverted font-bold",
          "hover:shadow-glow-cyan hover:brightness-105",
        ],
        magic: [
          "bg-gradient-to-br from-violet-500 via-nex-brand-cyan to-yellow-400",
          "text-nex-text-inverted font-bold",
          "hover:shadow-glow-magic",
        ],

        // Solid · brand
        cyan: [
          "bg-nex-brand-cyan text-nex-text-inverted",
          "hover:shadow-glow-cyan hover:brightness-105",
        ],
        violet: [
          "bg-nex-brand-violet text-nex-text-primary",
          "hover:shadow-glow-violet hover:brightness-105",
        ],
        gold: [
          "bg-nex-brand-gold text-nex-text-inverted",
          "hover:shadow-glow-gold hover:brightness-105",
        ],

        // Solid · semantic
        success: [
          "bg-nex-success text-nex-text-inverted",
          "hover:shadow-glow-success hover:brightness-105",
        ],
        warning: [
          "bg-nex-warning text-nex-text-inverted",
          "hover:shadow-glow-warning hover:brightness-105",
        ],
        error: [
          "bg-nex-error text-nex-text-inverted",
          "hover:shadow-glow-error hover:brightness-105",
        ],
        info: [
          "bg-nex-info text-nex-text-inverted",
          "hover:shadow-glow-info hover:brightness-105",
        ],

        // Neutral
        secondary: [
          "bg-transparent text-nex-text-primary border-nex-border-default",
          "hover:bg-nex-bg-elevated hover:border-nex-border-strong",
        ],
        ghost: [
          "bg-transparent text-nex-text-primary",
          "hover:bg-nex-bg-hover",
        ],

        // Outline · brand
        "outline-cyan": [
          "bg-transparent text-nex-brand-cyan",
          "border border-[rgba(0,212,255,0.4)]",
          "hover:bg-[rgba(0,212,255,0.10)] hover:border-nex-brand-cyan",
        ],
        "outline-violet": [
          "bg-transparent text-nex-brand-violet",
          "border border-[rgba(139,92,246,0.4)]",
          "hover:bg-[rgba(139,92,246,0.10)] hover:border-nex-brand-violet",
        ],
        "outline-gold": [
          "bg-transparent text-nex-brand-gold",
          "border border-[rgba(230,178,67,0.4)]",
          "hover:bg-[rgba(230,178,67,0.10)] hover:border-nex-brand-gold",
        ],

        // Outline · semantic
        "outline-success": [
          "bg-transparent text-nex-success",
          "border border-[rgba(16,185,129,0.4)]",
          "hover:bg-[rgba(16,185,129,0.10)] hover:border-nex-success",
        ],
        "outline-warning": [
          "bg-transparent text-nex-warning",
          "border border-[rgba(245,158,11,0.4)]",
          "hover:bg-[rgba(245,158,11,0.10)] hover:border-nex-warning",
        ],
        "outline-error": [
          "bg-transparent text-nex-error",
          "border border-[rgba(239,68,68,0.4)]",
          "hover:bg-[rgba(239,68,68,0.10)] hover:border-nex-error",
        ],
        "outline-info": [
          "bg-transparent text-nex-info",
          "border border-[rgba(59,130,246,0.4)]",
          "hover:bg-[rgba(59,130,246,0.10)] hover:border-nex-info",
        ],

        // Alias — destructive is the outline-error pattern, kept for backwards compatibility
        destructive: [
          "bg-transparent text-nex-error",
          "border border-[rgba(239,68,68,0.4)]",
          "hover:bg-[rgba(239,68,68,0.12)] hover:border-nex-error",
        ],
      },
      size: {
        sm: "h-8 px-3 text-body-sm",
        md: "h-10 px-4 text-body",
        lg: "h-12 px-6 text-body-lg",
        icon: "h-10 w-10 p-0",
        "icon-sm": "h-8 w-8 p-0",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  asChild?: boolean;
  /** Disable the click ripple effect. Defaults to false (ripple enabled). */
  noRipple?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, loading, disabled, noRipple, children, onPointerDown, ...props },
    ref
  ) => {
    const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
      onPointerDown?.(e);
      if (noRipple || disabled || loading) return;
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const dx = Math.max(x, rect.width - x);
      const dy = Math.max(y, rect.height - y);
      const d = Math.hypot(dx, dy) * 2;
      const ripple = document.createElement("span");
      ripple.className = "nex-btn-ripple";
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.width = `${d}px`;
      ripple.style.height = `${d}px`;
      btn.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        onPointerDown={handlePointerDown}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {loading && (
          <span className="w-3.5 h-3.5 rounded-full border-[1.5px] border-current border-r-transparent animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
