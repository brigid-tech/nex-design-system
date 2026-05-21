import * as React from "react";
import { cn } from "../../lib/cn";

export interface RadioCardProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Visible text label inside the card. */
  label?: React.ReactNode;
  /** Optional leading icon (typically a lucide-react icon). */
  icon?: React.ReactNode;
  /** Class for the outer <label> wrapper. */
  wrapperClassName?: string;
}

/**
 * Segmented pill-style radio. Use a flex/grid container to lay out multiple
 * RadioCards sharing the same `name`.
 */
const RadioCard = React.forwardRef<HTMLInputElement, RadioCardProps>(
  ({ className, wrapperClassName, label, icon, disabled, id, children, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className={cn(
          "group relative inline-flex flex-1 min-w-[140px] items-center gap-2.5 cursor-pointer select-none",
          "px-4 py-3 rounded-lg border border-nex-border-default bg-nex-bg-secondary",
          "font-ui text-body font-medium text-nex-text-secondary",
          "transition-all duration-ui ease-out",
          "hover:border-nex-border-strong hover:text-nex-text-primary",
          "has-[input:checked]:border-nex-brand-cyan has-[input:checked]:bg-[rgba(0,212,255,0.06)] has-[input:checked]:text-nex-text-primary",
          "has-[input:checked]:shadow-[inset_0_0_0_1px_var(--nex-brand-cyan),_0_0_18px_rgba(0,212,255,0.12)]",
          "has-[input:focus-visible]:shadow-focus-ring",
          disabled && "cursor-not-allowed opacity-40",
          wrapperClassName,
          className
        )}
      >
        <input
          ref={ref}
          id={id}
          type="radio"
          disabled={disabled}
          className="absolute opacity-0 pointer-events-none"
          {...props}
        />
        <span
          aria-hidden="true"
          className={cn(
            "flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
            "border-[1.5px] border-nex-border-strong transition-colors duration-ui ease-out",
            "group-has-[input:checked]:border-nex-brand-cyan"
          )}
        >
          <span
            className={cn(
              "h-[7px] w-[7px] rounded-full bg-nex-brand-cyan",
              "scale-0 transition-transform duration-ui ease-out",
              "group-has-[input:checked]:scale-100"
            )}
          />
        </span>
        {icon && <span className="flex shrink-0 items-center">{icon}</span>}
        {label && <span>{label}</span>}
        {children}
      </label>
    );
  }
);

RadioCard.displayName = "RadioCard";

export { RadioCard };
