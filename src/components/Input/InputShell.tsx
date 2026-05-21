import * as React from "react";
import { cn } from "../../lib/cn";

export interface InputShellProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  error?: boolean;
}

/**
 * Wrapper for inputs that need leading/trailing icons or text affixes.
 * Use with <InputAffix> children flanking a bare <input>.
 *
 *   <InputShell>
 *     <InputAffix><Search size={16} /></InputAffix>
 *     <input placeholder="Buscar..." />
 *     <InputAffix as="button"><X size={16} /></InputAffix>
 *   </InputShell>
 */
const InputShell = React.forwardRef<HTMLLabelElement, InputShellProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "flex h-11 w-full items-center gap-1 px-1.5",
          "bg-nex-bg-secondary border border-nex-border-default rounded-lg",
          "text-body text-nex-text-primary font-ui",
          "transition-all duration-ui ease-out",
          "focus-within:border-nex-brand-cyan focus-within:shadow-focus-cyan",
          "[&>input]:flex-1 [&>input]:min-w-0 [&>input]:h-full",
          "[&>input]:bg-transparent [&>input]:border-0 [&>input]:outline-none",
          "[&>input]:text-nex-text-primary [&>input]:px-2",
          "[&>input]:placeholder:text-nex-text-tertiary",
          error && "border-nex-error focus-within:border-nex-error focus-within:shadow-focus-error",
          className
        )}
        {...props}
      >
        {children}
      </label>
    );
  }
);

InputShell.displayName = "InputShell";

export interface InputAffixProps {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "button";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  "aria-label"?: string;
  /** Render as a non-interactive "prefix"/"suffix" text label (e.g. "@", "/u/", "anos"). */
  text?: "prefix" | "suffix";
}

const InputAffix = React.forwardRef<HTMLSpanElement | HTMLButtonElement, InputAffixProps>(
  ({ children, className, as = "span", onClick, text, ...props }, ref) => {
    if (text) {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          className={cn(
            "flex h-full items-center justify-center px-2.5 font-mono text-[13px] text-nex-text-tertiary",
            text === "prefix" && "border-r border-nex-border-subtle mr-0.5",
            text === "suffix" && "border-l border-nex-border-subtle ml-0.5",
            className
          )}
        >
          {children}
        </span>
      );
    }

    if (as === "button") {
      return (
        <button
          type="button"
          ref={ref as React.Ref<HTMLButtonElement>}
          onClick={onClick}
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
            "bg-transparent border-0 cursor-pointer",
            "text-nex-text-secondary transition-colors duration-ui ease-out",
            "hover:bg-nex-bg-hover hover:text-nex-text-primary",
            className
          )}
          {...props}
        >
          {children}
        </button>
      );
    }

    return (
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-nex-text-secondary",
          className
        )}
      >
        {children}
      </span>
    );
  }
);

InputAffix.displayName = "InputAffix";

export { InputShell, InputAffix };
