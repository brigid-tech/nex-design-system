import * as React from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";

export interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  className,
  size = "md",
}) => {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    if (open) {
      document.addEventListener("keydown", onKey);
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-[4px]"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        className={cn(
          "relative w-full z-10",
          "bg-nex-bg-elevated border border-nex-border-default rounded-xl",
          "shadow-elevation-4",
          "p-5 flex flex-col gap-4",
          sizeClasses[size],
          className
        )}
      >
        {/* Header */}
        {(title || onClose) && (
          <div className="flex items-center justify-between gap-4">
            {title && (
              <h2 className="font-ui text-h3 text-nex-text-primary">{title}</h2>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="w-6 h-6 flex items-center justify-center text-nex-text-secondary hover:text-nex-text-primary transition-colors ml-auto"
              >
                <X size={16} />
              </button>
            )}
          </div>
        )}

        {/* Description */}
        {description && (
          <p className="text-body-sm text-nex-text-secondary leading-relaxed -mt-2">
            {description}
          </p>
        )}

        {/* Content */}
        {children && <div>{children}</div>}

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-nex-border-subtle">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

Modal.displayName = "Modal";

export { Modal };
