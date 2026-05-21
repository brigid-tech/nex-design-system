import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "./Badge"

const meta: Meta<typeof Badge> = {
  component: Badge,
  tags: ["autodocs"],
  parameters: { backgrounds: { default: "dark" } },
}
export default meta
type Story = StoryObj<typeof Badge>

export const AllEntityTypesMd: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 p-4">
      <Badge entity="character" />
      <Badge entity="place" />
      <Badge entity="faction" />
      <Badge entity="item" />
      <Badge entity="creature" />
      <Badge entity="event" />
    </div>
  ),
}

export const AllEntityTypesSm: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 p-4">
      <Badge entity="character" size="sm" />
      <Badge entity="place" size="sm" />
      <Badge entity="faction" size="sm" />
      <Badge entity="item" size="sm" />
      <Badge entity="creature" size="sm" />
      <Badge entity="event" size="sm" />
    </div>
  ),
}

export const Character: Story = {
  args: { entity: "character" },
}

export const WithoutIcon: Story = {
  args: { entity: "place", showIcon: false },
}
