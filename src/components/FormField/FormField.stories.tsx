import type { Meta, StoryObj } from "@storybook/react"
import { FormField } from "./FormField"
import { Input } from "../Input/Input"
import { Select, SelectItem } from "../Select/Select"

const meta: Meta<typeof FormField> = {
  component: FormField,
  tags: ["autodocs"],
  parameters: { backgrounds: { default: "dark" } },
}
export default meta
type Story = StoryObj<typeof FormField>

export const LabelOnly: Story = {
  render: () => (
    <div className="p-4 w-72">
      <FormField label="Nome do personagem" htmlFor="name">
        <Input id="name" placeholder="Kael" />
      </FormField>
    </div>
  ),
}

export const WithHint: Story = {
  render: () => (
    <div className="p-4 w-72">
      <FormField label="Handle" hint="Usado nas @menções. Sem espaços." htmlFor="handle">
        <Input id="handle" mono placeholder="@kael" />
      </FormField>
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div className="p-4 w-72">
      <FormField label="Email" error="Email inválido" htmlFor="email">
        <Input id="email" placeholder="email@exemplo.com" error />
      </FormField>
    </div>
  ),
}

export const Required: Story = {
  render: () => (
    <div className="p-4 w-72">
      <FormField label="Título" required htmlFor="title">
        <Input id="title" placeholder="Título da história" />
      </FormField>
    </div>
  ),
}

export const WithSelect: Story = {
  render: () => (
    <div className="p-4 w-72">
      <FormField label="Tipo de entidade" htmlFor="entity-type">
        <Select placeholder="Selecione um tipo">
          <SelectItem value="character">Personagem</SelectItem>
          <SelectItem value="place">Local</SelectItem>
          <SelectItem value="faction">Facção</SelectItem>
        </Select>
      </FormField>
    </div>
  ),
}

export const WithSuccess: Story = {
  render: () => (
    <div className="p-4 w-72">
      <FormField label="Nome" success='"Kael Vandros" livre em Aetheria.' htmlFor="name">
        <Input id="name" value="Kael Vandros" readOnly />
      </FormField>
    </div>
  ),
}

export const WithWarning: Story = {
  render: () => (
    <div className="p-4 w-72">
      <FormField label="Handle" warning="A menção aponta para entidade ainda inexistente." htmlFor="h">
        <Input id="h" value="Cidades.Bryn" mono readOnly />
      </FormField>
    </div>
  ),
}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4 w-72">
      <FormField label="Padrão" hint="Texto de ajuda." htmlFor="a">
        <Input id="a" placeholder="Digite algo" />
      </FormField>
      <FormField label="Com erro" error="Campo obrigatório." htmlFor="b">
        <Input id="b" error />
      </FormField>
      <FormField label="Com aviso" warning="Menção para stub inexistente." htmlFor="c">
        <Input id="c" defaultValue="Cidades.Bryn" mono />
      </FormField>
      <FormField label="Válido" success='"Kael Vandros" disponível.' htmlFor="d">
        <Input id="d" defaultValue="Kael Vandros" />
      </FormField>
    </div>
  ),
}
