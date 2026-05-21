import * as React from "react";
import { cn } from "../../lib/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  mono?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, mono, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-11 w-full px-3.5",
          "bg-nex-bg-secondary border border-nex-border-default rounded-lg",
          "text-body text-nex-text-primary font-ui",
          "placeholder:text-nex-text-tertiary",
          "outline-none transition-all duration-ui ease-out",
          "focus:border-nex-brand-cyan focus:shadow-focus-cyan",
          "disabled:opacity-50 disabled:pointer-events-none",
          error && "border-nex-error focus:shadow-focus-error focus:border-nex-error",
          mono && "font-mono",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
