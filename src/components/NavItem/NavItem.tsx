import * as React from "react"
import { cn } from "../../lib/cn"

export interface NavItemProps extends React.HTMLAttributes<HTMLElement> {
  icon?: React.ReactNode
  label: string
  count?: number
  iconColor?: string
  active?: boolean
  href?: string
}

const sharedClasses = [
  "relative flex items-center gap-2.5 px-3 py-2 rounded-md",
  "text-body-sm select-none",
  "transition-all duration-micro ease-out",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nex-brand-cyan",
]

const NavItem = React.forwardRef<HTMLElement, NavItemProps>(
  ({ className, icon, label, count, iconColor, active, href, ...props }, ref) => {
    const classes = cn(
      ...sharedClasses,
      active
        ? "text-nex-text-primary bg-nex-bg-elevated"
        : "text-nex-text-secondary hover:text-nex-text-primary hover:bg-nex-bg-hover",
      className,
    )

    const inner = (
      <>
        {active && (
          <span className="absolute left-0 top-2 bottom-2 w-0.5 bg-nex-brand-cyan rounded-sm" />
        )}
        {icon && (
          <span className="flex-shrink-0" style={iconColor ? { color: iconColor } : undefined}>
            {icon}
          </span>
        )}
        <span className="flex-1">{label}</span>
        {count !== undefined && (
          <span className="font-mono text-[11px] text-nex-text-tertiary">{count}</span>
        )}
      </>
    )

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {inner}
        </a>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={cn(classes, "w-full text-left cursor-pointer")}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {inner}
      </button>
    )
  }
)

NavItem.displayName = "NavItem"

export { NavItem }
