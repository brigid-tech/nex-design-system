import * as React from "react";
import { cn } from "../../lib/cn";

export interface NavItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  label: string;
  count?: number;
  iconColor?: string;
  active?: boolean;
}

const NavItem = React.forwardRef<HTMLDivElement, NavItemProps>(
  ({ className, icon, label, count, iconColor, active, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-center gap-2.5 px-3 py-2 rounded-md",
          "text-body-sm cursor-pointer select-none",
          "transition-all duration-micro ease-out",
          active
            ? "text-nex-text-primary bg-nex-bg-elevated"
            : "text-nex-text-secondary hover:text-nex-text-primary hover:bg-nex-bg-hover",
          className
        )}
        {...props}
      >
        {/* Active indicator */}
        {active && (
          <span className="absolute left-0 top-2 bottom-2 w-0.5 bg-nex-brand-cyan rounded-sm" />
        )}

        {/* Icon */}
        {icon && (
          <span
            className="flex-shrink-0"
            style={iconColor ? { color: iconColor } : undefined}
          >
            {icon}
          </span>
        )}

        <span className="flex-1">{label}</span>

        {count !== undefined && (
          <span className="font-mono text-[11px] text-nex-text-tertiary">{count}</span>
        )}
      </div>
    );
  }
);

NavItem.displayName = "NavItem";

export { NavItem };
