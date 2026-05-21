import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "../../lib/cn";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Show in indeterminate (mixed) state — overrides `checked` visually. */
  indeterminate?: boolean;
  /** Display the checkbox in an error state (red border + label). */
  error?: boolean;
  /** Visible text label rendered next to the box. */
  label?: React.ReactNode;
  /** Smaller helper text rendered under the label. */
  description?: React.ReactNode;
  /** Class for the outer <label> wrapper. */
  wrapperClassName?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      wrapperClassName,
      indeterminate,
      error,
      label,
      description,
      disabled,
      id,
      children,
      ...props
    },
    forwardedRef
  ) => {
    const innerRef = React.useRef<HTMLInputElement | null>(null);

    React.useImperativeHandle(forwardedRef, () => innerRef.current as HTMLInputElement);

    React.useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = Boolean(indeterminate);
      }
    }, [indeterminate]);

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
          ref={innerRef}
          id={id}
          type="checkbox"
          disabled={disabled}
          aria-invalid={error || undefined}
          className="absolute opacity-0 pointer-events-none"
          {...props}
        />
        <span
          aria-hidden="true"
          className={cn(
            "relative mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center",
            "rounded-[5px] border-[1.5px] border-nex-border-strong bg-nex-bg-secondary",
            "text-nex-text-inverted transition-all duration-ui ease-out",
            "group-hover:border-nex-brand-cyan",
            "group-has-[input:checked]:bg-nex-brand-cyan group-has-[input:checked]:border-nex-brand-cyan",
            "group-has-[input:indeterminate]:bg-nex-brand-cyan group-has-[input:indeterminate]:border-nex-brand-cyan",
            "group-has-[input:focus-visible]:shadow-focus-ring",
            "group-has-[input:disabled]:opacity-40",
            error && "border-nex-error group-hover:border-nex-error",
            className
          )}
        >
          <Check
            size={12}
            strokeWidth={3}
            className={cn(
              "opacity-0 transition-opacity duration-100",
              "group-has-[input:checked]:opacity-100",
              "group-has-[input:indeterminate]:opacity-0"
            )}
          />
          <span
            className={cn(
              "absolute h-0.5 w-[9px] rounded-sm bg-nex-text-inverted opacity-0 transition-opacity duration-100",
              "group-has-[input:indeterminate]:opacity-100"
            )}
          />
        </span>

        {(label || description || children) && (
          <span
            className={cn(
              "flex flex-col gap-0.5",
              disabled && "text-nex-text-tertiary",
              error && "text-nex-error"
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

Checkbox.displayName = "Checkbox";

export { Checkbox };
