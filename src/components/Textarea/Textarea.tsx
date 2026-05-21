import * as React from "react";
import { cn } from "../../lib/cn";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex w-full min-h-[96px] px-3.5 py-3",
          "bg-nex-bg-secondary border border-nex-border-default rounded-lg",
          "text-body text-nex-text-primary font-ui",
          "placeholder:text-nex-text-tertiary",
          "outline-none transition-all duration-ui ease-out resize-vertical",
          "focus:border-nex-brand-cyan focus:shadow-focus-cyan",
          "disabled:opacity-50 disabled:pointer-events-none",
          error && "border-nex-error focus:shadow-focus-error focus:border-nex-error",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
