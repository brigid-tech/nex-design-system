import * as React from "react";
import { cn } from "../../lib/cn";

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Visible text label rendered next to the dot. */
  label?: React.ReactNode;
  /** Smaller helper text rendered under the label. */
  description?: React.ReactNode;
  /** Class for the outer <label> wrapper. */
  wrapperClassName?: string;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, wrapperClassName, label, description, disabled, id, children, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className={cn(
          "group inline-flex items-start gap-2.5 cursor-pointer select-none",
          "font-ui text-body text-nex-text-primary leading-snug",
          disabled && "cursor-not-allowed",
          wrapperClassName
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
            "relative mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center",
            "rounded-full border-[1.5px] border-nex-border-strong bg-nex-bg-secondary",
            "transition-all duration-ui ease-out",
            "group-hover:border-nex-brand-cyan",
            "group-has-[input:checked]:border-nex-brand-cyan",
            "group-has-[input:focus-visible]:shadow-focus-ring",
            "group-has-[input:disabled]:opacity-40",
            className
          )}
        >
          <span
            className={cn(
              "h-2 w-2 rounded-full bg-nex-brand-cyan",
              "scale-0 transition-transform duration-ui ease-out",
              "group-has-[input:checked]:scale-100"
            )}
          />
        </span>

        {(label || description || children) && (
          <span
            className={cn(
              "flex flex-col gap-0.5",
              disabled && "text-nex-text-tertiary"
            )}
          >
            {label && <span>{label}</span>}
            {children}
            {description && (
              <span className="text-caption text-nex-text-tertiary">{description}</span>
            )}
          </span>
        )}
      </label>
    );
  }
);

Radio.displayName = "Radio";

export { Radio };
