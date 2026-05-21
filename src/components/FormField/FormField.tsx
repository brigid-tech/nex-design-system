import * as React from "react"
import { AlertCircle } from "lucide-react"
import { cn } from "../../lib/cn"

export interface FormFieldProps {
  label?: string
  hint?: string
  error?: string
  required?: boolean
  htmlFor?: string
  children: React.ReactNode
  className?: string
}

/**
 * FormField controls layout and messaging only.
 * The consumer must also pass `error` to the child Input/Select to apply field-level styles.
 */
const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, hint, error, required, htmlFor, children, className }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col gap-1.5", className)}>
        {label && (
          <label
            htmlFor={htmlFor}
            className="text-body-sm font-medium text-nex-text-primary"
          >
            {label}
            {required && (
              <span className="text-nex-error ml-0.5">*</span>
            )}
          </label>
        )}

        {children}

        {error ? (
          <span className="text-caption text-nex-error flex items-center gap-1">
            <AlertCircle size={12} />
            {error}
          </span>
        ) : hint ? (
          <span className="text-caption text-nex-text-tertiary">{hint}</span>
        ) : null}
      </div>
    )
  }
)

FormField.displayName = "FormField"

export { FormField }
