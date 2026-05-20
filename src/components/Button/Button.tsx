import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
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
        gradient: [
          "bg-gradient-to-br from-nex-brand-cyan to-nex-brand-violet",
          "text-nex-text-inverted font-bold",
          "hover:shadow-glow-cyan hover:brightness-105",
        ],
        magic: [
          "bg-gradient-to-br from-violet-500 via-nex-brand-cyan to-yellow-400",
          "text-nex-text-inverted font-bold",
          "hover:shadow-glow-violet",
        ],
        cyan: [
          "bg-nex-brand-cyan text-nex-text-inverted",
          "hover:shadow-glow-cyan hover:brightness-105",
        ],
        violet: [
          "bg-nex-brand-violet text-nex-text-primary",
          "hover:shadow-glow-violet hover:brightness-105",
        ],
        success: [
          "bg-nex-success text-nex-text-inverted",
          "hover:brightness-105",
        ],
        warning: [
          "bg-nex-warning text-nex-text-inverted",
          "hover:brightness-105",
        ],
        error: [
          "bg-nex-error text-nex-text-inverted",
          "hover:brightness-105",
        ],
        info: [
          "bg-nex-info text-nex-text-inverted",
          "hover:brightness-105",
        ],
        secondary: [
          "bg-transparent text-nex-text-primary border-nex-border-default",
          "hover:bg-nex-bg-elevated hover:border-nex-border-strong",
        ],
        ghost: [
          "bg-transparent text-nex-text-primary",
          "hover:bg-nex-bg-hover",
        ],
        destructive: [
          "bg-transparent text-nex-error",
          "border border-[rgba(239,68,68,0.4)]",
          "hover:bg-[rgba(239,68,68,0.12)] hover:border-nex-error",
        ],
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
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
