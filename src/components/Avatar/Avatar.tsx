import * as React from "react";
import { cn } from "../../lib/cn";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  initials: string;
  size?: number;
  glow?: boolean;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, initials, size = 28, glow, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-full flex-shrink-0",
          "flex items-center justify-center",
          "font-ui font-bold text-nex-text-inverted",
          "bg-gradient-to-br from-nex-brand-cyan to-nex-brand-violet",
          glow && "shadow-glow-brand",
          className
        )}
        style={{ width: size, height: size, fontSize: size * 0.4, ...style }}
        {...props}
      >
        {initials}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar };
