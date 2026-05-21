import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./Button"

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ["autodocs"],
  parameters: { backgrounds: { default: "dark" } },
}
export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: { children: "Entrar no beta" },
}

export const Loading: Story = {
  args: { children: "Salvando…", loading: true },
}

export const Disabled: Story = {
  args: { children: "Indisponível", disabled: true },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-4">
      <Button variant="gradient">Gradient</Button>
      <Button variant="magic">Magic</Button>
      <Button variant="cyan">Cyan</Button>
      <Button variant="violet">Violet</Button>
      <Button variant="gold">Gold</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline-cyan">Outline Cyan</Button>
      <Button variant="outline-violet">Outline Violet</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}
