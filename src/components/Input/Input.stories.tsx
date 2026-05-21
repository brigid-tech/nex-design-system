import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "./Input"

const meta: Meta<typeof Input> = {
  component: Input,
  tags: ["autodocs"],
  parameters: { backgrounds: { default: "dark" } },
}
export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: { placeholder: "Digite algo…" },
}

export const WithValue: Story = {
  args: { value: "Kael", readOnly: true },
}

export const WithError: Story = {
  args: { placeholder: "email@exemplo.com", error: true },
}

export const Mono: Story = {
  args: { placeholder: "@kael", mono: true },
}

export const Disabled: Story = {
  args: { placeholder: "Desabilitado", disabled: true },
}
