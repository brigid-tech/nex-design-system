import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { MentionInput } from "./MentionInput"
import type { MentionSuggestion } from "./MentionInput.types"

const meta: Meta<typeof MentionInput> = {
  component: MentionInput,
  tags: ["autodocs"],
  parameters: { backgrounds: { default: "dark" } },
}
export default meta
type Story = StoryObj<typeof MentionInput>

const mockSuggestions: MentionSuggestion[] = [
  { id: "kael-id", handle: "kael", name: "Kael", entityType: "character", fields: ["idade", "cidade"] },
  { id: "kaelindra-id", handle: "kaelindra", name: "Kaelindra", entityType: "creature" },
  { id: "eldor-id", handle: "eldor", name: "Eldor", entityType: "place", fields: ["populacao"] },
]

export const Empty: Story = {
  render: () => {
    function Demo() {
      const [value, setValue] = React.useState("")
      return (
        <div className="p-4 w-80">
          <MentionInput
            value={value}
            onChange={setValue}
            placeholder="Digite @ para mencionar uma entidade…"
          />
          <p className="mt-2 text-caption text-nex-text-tertiary font-mono">{value || "(vazio)"}</p>
        </div>
      )
    }
    return <Demo />
  },
}

export const WithMockedSuggestions: Story = {
  render: () => {
    function Demo() {
      const [value, setValue] = React.useState("")
      const [sug, setSug] = React.useState<MentionSuggestion[]>([])
      const handleQuery = (q: string) => {
        if (q.startsWith("create:")) return
        setSug(mockSuggestions.filter((s) => s.handle.startsWith(q) || s.name.toLowerCase().startsWith(q)))
      }
      return (
        <div className="p-4 w-80">
          <MentionInput
            value={value}
            onChange={setValue}
            onMentionQuery={handleQuery}
            suggestions={sug}
            placeholder="Digite @kael para ver sugestões…"
          />
          <p className="mt-2 text-caption text-nex-text-tertiary font-mono break-all">{value || "(vazio)"}</p>
        </div>
      )
    }
    return <Demo />
  },
}

export const WithResolvedValues: Story = {
  render: () => (
    <div className="p-4 w-80">
      <MentionInput
        value="Personagem [[kael-id:idade]] mora em [[eldor-id]]."
        resolvedValues={{
          "kael-id": { idade: "32", cidade: "Eldor" },
          "eldor-id": { name: "Eldor" },
        }}
        placeholder="Valor com menções resolvidas"
      />
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div className="p-4 w-80">
      <MentionInput
        placeholder="Campo com erro"
        error
      />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="p-4 w-80">
      <MentionInput
        value="Texto desabilitado com [[kael-id]] aqui."
        disabled
        placeholder="Desabilitado"
      />
    </div>
  ),
}
