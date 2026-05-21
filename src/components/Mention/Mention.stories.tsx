import type { Meta, StoryObj } from "@storybook/react"
import { Mention } from "./Mention"

const meta: Meta<typeof Mention> = {
  component: Mention,
  tags: ["autodocs"],
  parameters: { backgrounds: { default: "dark" } },
}
export default meta
type Story = StoryObj<typeof Mention>

export const AllEntityTypes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 p-4">
      <Mention entity="character">@Kael</Mention>
      <Mention entity="place">@Eldor</Mention>
      <Mention entity="faction">@Ordem</Mention>
      <Mention entity="item">@Espada</Mention>
      <Mention entity="creature">@Dragão</Mention>
      <Mention entity="event">@Batalha</Mention>
    </div>
  ),
}

export const WithResolved: Story = {
  args: {
    entity: "character",
    children: "@Kael.idade",
    resolved: "32",
  },
}

export const WithFlash: Story = {
  args: {
    entity: "place",
    children: "@Eldor",
    flash: true,
  },
}
