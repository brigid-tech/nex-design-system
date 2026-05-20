import * as React from "react";
import { cn } from "../../lib/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glassMagic?: boolean;
  elevated?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glassMagic, elevated, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative rounded-lg border border-nex-border-subtle bg-nex-bg-secondary",
        "shadow-elevation-1",
        "transition-colors duration-ui ease-out",
        "hover:border-nex-border-default",
        elevated && "bg-nex-bg-elevated shadow-elevation-2",
        glassMagic && "nex-glass-magic",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1 p-4", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("font-ui text-h3 text-nex-text-primary", className)} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-body-sm text-nex-text-secondary", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-4 pb-4", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-3 px-4 pb-4 pt-3",
        "border-t border-nex-border-subtle",
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
