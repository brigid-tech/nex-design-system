import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "flex h-11 w-full px-3.5 pr-10 appearance-none",
            "bg-nex-bg-secondary border border-nex-border-default rounded-lg",
            "text-body text-nex-text-primary font-ui",
            "outline-none transition-all duration-ui ease-out cursor-pointer",
            "focus:border-nex-brand-cyan focus:shadow-focus-cyan",
            "disabled:opacity-50 disabled:pointer-events-none",
            error && "border-nex-error focus:shadow-focus-error focus:border-nex-error",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-nex-text-secondary pointer-events-none"
          size={16}
        />
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
