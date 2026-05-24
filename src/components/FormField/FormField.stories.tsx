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

export const InlineValidation: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4 w-80">
      <FormField label="Nome — disponível" success='"Kael Vandros" livre em Aetheria.' htmlFor="iv-name-ok">
        <Input id="iv-name-ok" defaultValue="Kael Vandros" />
      </FormField>
      <FormField label="Nome — em uso" error="Personagem já existe. Abra o card ou escolha outro nome." htmlFor="iv-name-err">
        <Input id="iv-name-err" defaultValue="Kael" error />
      </FormField>
      <FormField label="Handle — inválido" error="Use apenas letras minúsculas, números e hífen." htmlFor="iv-handle-err">
        <Input id="iv-handle-err" defaultValue="Kael Vandros" mono error />
      </FormField>
      <FormField label="Handle — stub" warning="A menção aponta para entidade ainda inexistente." htmlFor="iv-handle-warn">
        <Input id="iv-handle-warn" defaultValue="cidades.bryn" mono />
      </FormField>
      <FormField label="Idade — válida" htmlFor="iv-age">
        <Input id="iv-age" type="number" defaultValue="32" />
      </FormField>
    </div>
  ),
}

const errorMicrocopy: { pattern: string; message: string }[] = [
  { pattern: "REQUIRED", message: "Este campo é obrigatório para criar a entidade." },
  { pattern: "CONFLICT", message: '"Kael" já existe em Aetheria. Tente "Kael Vandros" ou abra o existente.' },
  { pattern: "FORMAT", message: "Use apenas letras minúsculas, números e hífen." },
  { pattern: "RANGE", message: 'Idade não pode ser negativa. Use "Eras desde" para tempos antigos.' },
  { pattern: "REFERENCE", message: "Entidade @Cidades.Bryn não existe. Salvar como stub?" },
  { pattern: "QUOTA", message: "Limite gratuito de 50 entidades atingido. Upgrade para Pro?" },
]

export const ErrorMicrocopy: Story = {
  render: () => (
    <div className="w-[560px] overflow-hidden rounded-lg border border-nex-border-subtle">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-nex-bg-secondary">
            <th className="px-3 py-2 text-label uppercase tracking-widest text-nex-text-tertiary">Padrão</th>
            <th className="px-3 py-2 text-label uppercase tracking-widest text-nex-text-tertiary">Mensagem</th>
          </tr>
        </thead>
        <tbody>
          {errorMicrocopy.map((row) => (
            <tr key={row.pattern} className="border-t border-nex-border-subtle">
              <td className="px-3 py-2 align-top">
                <span className="font-mono text-caption text-nex-brand-cyan">{row.pattern}</span>
              </td>
              <td className="px-3 py-2 text-body-sm text-nex-text-secondary">{row.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
}
