import type { Meta, StoryObj } from "@storybook/react"
import { Toast } from "./Toast"

const meta: Meta<typeof Toast> = {
  component: Toast,
  tags: ["autodocs"],
  parameters: { backgrounds: { default: "dark" } },
}
export default meta
type Story = StoryObj<typeof Toast>

export const Success: Story = {
  args: {
    variant: "success",
    title: "Salvo com sucesso",
    description: "As alterações foram salvas.",
  },
}

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Atenção",
    description: "Existem campos obrigatórios em branco.",
  },
}

export const Error: Story = {
  args: {
    variant: "error",
    title: "Erro ao salvar",
    description: "Verifique sua conexão e tente novamente.",
  },
}

export const Info: Story = {
  args: {
    variant: "info",
    title: "Dica",
    description: "Use @menções para conectar entidades.",
  },
}

export const Brand: Story = {
  args: {
    variant: "brand",
    title: "Nexus Creator",
    description: "Bem-vindo ao seu universo.",
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4 w-80">
      <Toast variant="success" title="Sucesso" description="Operação concluída." />
      <Toast variant="warning" title="Aviso" description="Verifique os dados." />
      <Toast variant="error" title="Erro" description="Algo deu errado." />
      <Toast variant="info" title="Info" description="Informação relevante." />
      <Toast variant="brand" title="Nexus" description="Mensagem da plataforma." />
    </div>
  ),
}
