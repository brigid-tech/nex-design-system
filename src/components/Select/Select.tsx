import * as React from "react"
import * as RadixSelect from "@radix-ui/react-select"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "../../lib/cn"

export interface SelectProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  error?: boolean
  className?: string
  children: React.ReactNode
}

export interface SelectItemProps {
  value: string
  children: React.ReactNode
  disabled?: boolean
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ value, defaultValue, onValueChange, placeholder, disabled, error, className, children }, ref) => {
    return (
      <RadixSelect.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <RadixSelect.Trigger
          ref={ref}
          className={cn(
            "flex h-10 w-full items-center justify-between px-3",
            "bg-nex-bg-secondary border border-nex-border-default rounded-sm",
            "text-body text-nex-text-primary font-ui",
            "outline-none transition-all duration-ui ease-out cursor-pointer",
            "focus:border-nex-brand-cyan focus:shadow-focus-cyan",
            "data-[placeholder]:text-nex-text-tertiary",
            "disabled:opacity-50 disabled:pointer-events-none",
            error && "border-nex-error focus:shadow-focus-error focus:border-nex-error",
            className,
          )}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon asChild>
            <ChevronDown size={16} className="text-nex-text-secondary flex-shrink-0" />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content
            position="popper"
            sideOffset={4}
            className={cn(
              "z-50 overflow-hidden w-[var(--radix-select-trigger-width)]",
              "bg-nex-bg-elevated border border-nex-border-default rounded-md shadow-elevation-3",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
              "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
              "duration-150",
            )}
          >
            <RadixSelect.Viewport className="p-1">
              {children}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    )
  }
)

Select.displayName = "Select"

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ value, children, disabled }, ref) => {
    return (
      <RadixSelect.Item
        ref={ref}
        value={value}
        disabled={disabled}
        className={cn(
          "flex items-center justify-between px-3 py-2 rounded-sm",
          "text-body text-nex-text-primary cursor-pointer outline-none",
          "data-[highlighted]:bg-nex-bg-hover data-[highlighted]:text-nex-text-primary",
          "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
          "transition-colors duration-micro",
        )}
      >
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
        <RadixSelect.ItemIndicator>
          <Check size={14} className="text-nex-brand-cyan" />
        </RadixSelect.ItemIndicator>
      </RadixSelect.Item>
    )
  }
)

SelectItem.displayName = "SelectItem"

export { Select, SelectItem }
