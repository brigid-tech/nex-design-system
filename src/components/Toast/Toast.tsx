import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, TriangleAlert, X, Info, Sparkles } from "lucide-react";
import { cn } from "../../lib/cn";

const toastVariants = cva(
  [
    "relative flex items-start gap-2.5 overflow-hidden",
    "rounded-lg border p-3",
    "shadow-elevation-2 text-body-sm",
  ],
  {
    variants: {
      variant: {
        default: "bg-nex-bg-elevated border-nex-border-default",
        success: [
          "bg-[rgba(16,185,129,0.08)] border-[rgba(16,185,129,0.30)]",
          "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-nex-success",
        ],
        warning: [
          "bg-[rgba(245,158,11,0.08)] border-[rgba(245,158,11,0.30)]",
          "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-nex-warning",
        ],
        error: [
          "bg-[rgba(239,68,68,0.08)] border-[rgba(239,68,68,0.30)]",
          "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-nex-error",
        ],
        info: [
          "bg-[rgba(59,130,246,0.08)] border-[rgba(59,130,246,0.30)]",
          "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-nex-info",
        ],
        brand: [
          "bg-[rgba(0,212,255,0.08)] border-[rgba(0,212,255,0.30)]",
          "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-nex-brand-cyan",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const iconBgMap: Record<string, string> = {
  success: "bg-[rgba(16,185,129,0.15)] text-nex-success",
  warning: "bg-[rgba(245,158,11,0.15)] text-nex-warning",
  error:   "bg-[rgba(239,68,68,0.15)]  text-nex-error",
  info:    "bg-[rgba(59,130,246,0.15)] text-nex-info",
  brand:   "bg-[rgba(0,212,255,0.15)]  text-nex-brand-cyan",
  default: "bg-nex-bg-secondary text-nex-text-secondary",
};

const defaultIcons: Record<string, React.ElementType> = {
  success: Check,
  warning: TriangleAlert,
  error:   X,
  info:    Info,
  brand:   Sparkles,
  default: Info,
};

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  title: string;
  description?: string;
  action?: React.ReactNode;
  onClose?: () => void;
  icon?: React.ReactNode;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      className,
      variant = "default",
      title,
      description,
      action,
      onClose,
      icon,
      ...props
    },
    ref
  ) => {
    const variantKey = variant ?? "default";
    const IconComponent = defaultIcons[variantKey];
    const iconBg = iconBgMap[variantKey];

    return (
      <div
        ref={ref}
        className={cn(toastVariants({ variant }), className)}
        {...props}
      >
        {/* Icon */}
        <div
          className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
            iconBg
          )}
        >
          {icon ?? <IconComponent size={14} strokeWidth={2} />}
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col gap-0.5 min-w-0">
          <span className="font-semibold text-nex-text-primary text-body-sm">{title}</span>
          {description && (
            <span className="text-nex-text-secondary text-caption leading-snug">{description}</span>
          )}
        </div>

        {/* Action */}
        {action && (
          <div className="flex-shrink-0 self-center">
            {action}
          </div>
        )}

        {/* Close */}
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 self-start w-5 h-5 flex items-center justify-center text-nex-text-tertiary hover:text-nex-text-secondary transition-colors"
          >
            <X size={12} />
          </button>
        )}
      </div>
    );
  }
);

Toast.displayName = "Toast";

export { Toast, toastVariants };
