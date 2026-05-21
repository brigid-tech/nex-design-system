import type { Meta, StoryObj } from "@storybook/react"
import { EntityCard } from "./EntityCard"

const meta: Meta<typeof EntityCard> = {
  component: EntityCard,
  tags: ["autodocs"],
  parameters: { backgrounds: { default: "dark" } },
}
export default meta
type Story = StoryObj<typeof EntityCard>

export const WithFields: Story = {
  args: {
    name: "Kael",
    handle: "@kael",
    entity: "character",
    fields: [
      { label: "Idade", value: "32" },
      { label: "Cidade", value: "Eldor" },
      { label: "Raça", value: "Humano" },
      { label: "Classe", value: "Guerreiro" },
    ],
    articleCount: 5,
    backlinkCount: 12,
  },
}

export const WithoutFields: Story = {
  args: {
    name: "Kaelindra",
    handle: "@kaelindra",
    entity: "creature",
  },
}

export const WithCounters: Story = {
  args: {
    name: "Ordem dos Sete",
    handle: "@ordem",
    entity: "faction",
    articleCount: 3,
    backlinkCount: 8,
  },
}

export const AllEntityTypes: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-3 p-4">
      <EntityCard name="Kael" handle="@kael" entity="character" />
      <EntityCard name="Eldor" handle="@eldor" entity="place" />
      <EntityCard name="Ordem" handle="@ordem" entity="faction" />
      <EntityCard name="Espada" handle="@espada" entity="item" />
      <EntityCard name="Dragão" handle="@dragao" entity="creature" />
      <EntityCard name="Batalha" handle="@batalha" entity="event" />
    </div>
  ),
}
