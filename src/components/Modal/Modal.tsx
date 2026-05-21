import * as React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "../../lib/cn"

export interface ModalProps {
  open?: boolean
  onClose?: () => void
  title?: string
  description?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg"
}

const sizeClasses: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
}

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
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose?.()}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/70 backdrop-blur-[4px]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
          )}
        />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
            "w-full p-5 flex flex-col gap-4",
            "bg-nex-bg-elevated border border-nex-border-default rounded-xl shadow-elevation-4",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
            "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
            "duration-150",
            sizeClasses[size],
            className,
          )}
        >
          {/* Visually-hidden title when no visible title — required for screen readers */}
          {!title && (
            <Dialog.Title className="sr-only">Dialog</Dialog.Title>
          )}

          {/* Header */}
          {(title || onClose) && (
            <div className="flex items-center justify-between gap-4">
              {title && (
                <Dialog.Title className="font-ui text-h3 text-nex-text-primary">
                  {title}
                </Dialog.Title>
              )}
              {onClose && (
                <Dialog.Close
                  onClick={onClose}
                  className="ml-auto w-6 h-6 flex items-center justify-center text-nex-text-secondary hover:text-nex-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nex-brand-cyan rounded-sm"
                >
                  <X size={16} />
                </Dialog.Close>
              )}
            </div>
          )}

          {/* Description */}
          {description && (
            <Dialog.Description className="text-body-sm text-nex-text-secondary leading-relaxed -mt-2">
              {description}
            </Dialog.Description>
          )}

          {/* Content */}
          {children && <div>{children}</div>}

          {/* Footer */}
          {footer && (
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-nex-border-subtle">
              {footer}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

Modal.displayName = "Modal"

export { Modal }
