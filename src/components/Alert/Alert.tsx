import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  XCircle,
  TriangleAlert,
  CheckCircle2,
  Info,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "../../lib/cn";

const alertVariants = cva(
  [
    "relative flex items-start gap-3 overflow-hidden",
    "rounded-xl border py-3 pl-4 pr-3.5",
    "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px]",
  ],
  {
    variants: {
      kind: {
        error: [
          "bg-[rgba(239,68,68,0.06)] border-[rgba(239,68,68,0.25)]",
          "before:bg-nex-error",
        ],
        warning: [
          "bg-[rgba(245,158,11,0.06)] border-[rgba(245,158,11,0.25)]",
          "before:bg-nex-warning",
        ],
        success: [
          "bg-[rgba(16,185,129,0.06)] border-[rgba(16,185,129,0.25)]",
          "before:bg-nex-success",
        ],
        info: [
          "bg-[rgba(59,130,246,0.06)] border-[rgba(59,130,246,0.25)]",
          "before:bg-nex-info",
        ],
        brand: [
          "bg-[rgba(139,92,246,0.06)] border-[rgba(139,92,246,0.25)]",
          "before:bg-nex-brand-violet",
        ],
      },
    },
    defaultVariants: {
      kind: "info",
    },
  }
);

const iconDiscMap: Record<string, string> = {
  error:   "bg-[rgba(239,68,68,0.15)]  text-nex-error",
  warning: "bg-[rgba(245,158,11,0.15)] text-nex-warning",
  success: "bg-[rgba(16,185,129,0.15)] text-nex-success",
  info:    "bg-[rgba(59,130,246,0.15)] text-nex-info",
  brand:   "bg-[rgba(139,92,246,0.15)] text-nex-brand-violet",
};

const actionButtonMap: Record<string, string> = {
  error:   "bg-[rgba(239,68,68,0.12)]  border-[rgba(239,68,68,0.30)]  text-nex-error",
  warning: "bg-[rgba(245,158,11,0.12)] border-[rgba(245,158,11,0.30)] text-nex-warning",
  success: "bg-[rgba(16,185,129,0.12)] border-[rgba(16,185,129,0.30)] text-nex-success",
  info:    "bg-[rgba(59,130,246,0.12)] border-[rgba(59,130,246,0.30)] text-nex-info",
  brand:   "bg-[rgba(139,92,246,0.12)] border-[rgba(139,92,246,0.30)] text-nex-brand-violet",
};

const iconMap: Record<string, React.ElementType> = {
  error:   XCircle,
  warning: TriangleAlert,
  success: CheckCircle2,
  info:    Info,
  brand:   Sparkles,
};

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof alertVariants> {
  kind?: "error" | "warning" | "success" | "info" | "brand";
  title: string;
  action?: string;
  onAction?: () => void;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      kind = "info",
      title,
      action,
      onAction,
      dismissible = true,
      onDismiss,
      children,
      ...props
    },
    ref
  ) => {
    const kindKey = kind ?? "info";
    const IconComponent = iconMap[kindKey];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ kind }), className)}
        {...props}
      >
        {/* Icon disc */}
        <div
          className={cn(
            "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center",
            iconDiscMap[kindKey]
          )}
        >
          <IconComponent size={16} strokeWidth={2} />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-1 min-w-0">
          <span className="text-[13px] font-semibold text-nex-text-primary leading-snug">
            {title}
          </span>
          {children && (
            <div className="text-[12.5px] text-nex-text-secondary leading-[1.5] break-words">
              {children}
            </div>
          )}
        </div>

        {/* Action */}
        {action && (
          <button
            type="button"
            onClick={onAction}
            className={cn(
              "flex-shrink-0 h-7 px-2.5 rounded-[7px] border",
              "text-[12px] font-semibold whitespace-nowrap",
              "transition-colors duration-ui ease-out",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nex-brand-cyan",
              actionButtonMap[kindKey]
            )}
          >
            {action}
          </button>
        )}

        {/* Dismiss */}
        {dismissible && (
          <button
            type="button"
            aria-label="Fechar"
            onClick={onDismiss}
            className={cn(
              "flex-shrink-0 w-5 h-5 flex items-center justify-center rounded",
              "text-nex-text-tertiary hover:text-nex-text-secondary",
              "transition-colors duration-ui ease-out",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nex-brand-cyan"
            )}
          >
            <X size={14} />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = "Alert";

export { Alert, alertVariants };
