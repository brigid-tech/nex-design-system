import type { Meta, StoryObj } from "@storybook/react"
import { Alert } from "./Alert"
import { Mention } from "../Mention"

const meta: Meta<typeof Alert> = {
  component: Alert,
  tags: ["autodocs"],
  parameters: { backgrounds: { default: "dark" } },
  argTypes: {
    kind: {
      control: "select",
      options: ["error", "warning", "success", "info", "brand"],
    },
  },
}
export default meta
type Story = StoryObj<typeof Alert>

export const Error: Story = {
  args: {
    kind: "error",
    title: "Não foi possível salvar a entidade",
    children: "Existem 3 campos obrigatórios em branco. Revise antes de continuar.",
    action: "Rolar até o erro",
  },
}

export const Warning: Story = {
  args: {
    kind: "warning",
    title: "Algumas menções não foram resolvidas",
    children: "Verifique se as entidades referenciadas ainda existem.",
  },
}

export const Success: Story = {
  args: {
    kind: "success",
    title: "Entidade salva com sucesso",
    children: "As alterações foram registradas no seu universo.",
  },
}

export const Info: Story = {
  args: {
    kind: "info",
    title: "Dica",
    children: "Use @menções para conectar entidades em tempo real.",
  },
}

export const Brand: Story = {
  args: {
    kind: "brand",
    title: "Sugestão da Nexus",
    children: "Detectamos personagens relacionados que você pode conectar.",
    action: "Ver sugestões",
  },
}

export const WithoutBody: Story = {
  args: {
    kind: "success",
    title: "Tudo certo por aqui",
  },
}

export const WithoutAction: Story = {
  args: {
    kind: "info",
    title: "Informação contextual",
    children: "Este alerta não possui botão de ação.",
  },
}

export const NotDismissible: Story = {
  args: {
    kind: "warning",
    title: "Este alerta não pode ser fechado",
    children: "dismissible está definido como false.",
    dismissible: false,
  },
}

export const WithMentionTokens: Story = {
  render: () => (
    <div className="w-[520px]">
      <Alert
        kind="error"
        title="Conflito de relação detectado"
        action="Resolver"
      >
        A entidade <Mention entity="character">@Kael</Mention> não pode pertencer
        à facção <Mention entity="faction">@Ordem do Véu</Mention> e à{" "}
        <Mention entity="faction">@Irmandade Negra</Mention> ao mesmo tempo.
      </Alert>
    </div>
  ),
}

export const LongBody: Story = {
  args: {
    kind: "warning",
    title: "Texto longo sem overflow",
    children:
      "Este é um corpo de texto propositalmente longo para verificar que o conteúdo quebra corretamente em múltiplas linhas sem causar overflow horizontal, mantendo a barra lateral, o ícone, o botão de ação e o X de dismiss alinhados corretamente dentro do container do alerta.",
    action: "Ação",
  },
}

export const PageBanners: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[560px]">
      <Alert kind="error" title="Não conseguimos forjar essa entidade ainda" action="Rolar até o erro">
        4 campos precisam de ajuste antes de criar{" "}
        <Mention entity="character">@kael</Mention>.
      </Alert>

      <Alert kind="warning" title="2 menções apontam para stubs" action="Resolver agora">
        <Mention entity="place">@Cidades.Bryn</Mention> e{" "}
        <Mention entity="character">@Veyla</Mention> ainda não existem. Serão criadas vazias.
      </Alert>

      <Alert kind="success" title="Rascunho salvo automaticamente" dismissible={false}>
        Você pode fechar e continuar de qualquer dispositivo em até 30 dias.
      </Alert>

      <Alert kind="info" title="Tipo Personagem adiciona 4 atributos">
        Idade, raça, local de nascimento e facção aparecem por padrão.
      </Alert>

      <Alert kind="brand" title="Quer ajuda? Pergunte ao Arquivista" action="Abrir">
        Posso sugerir nome, descrição e conexões com base no seu canon atual.
      </Alert>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[520px]">
      <Alert kind="error" title="Erro" children="Algo deu errado." />
      <Alert kind="warning" title="Aviso" children="Verifique os dados." />
      <Alert kind="success" title="Sucesso" children="Operação concluída." />
      <Alert kind="info" title="Info" children="Informação relevante." />
      <Alert kind="brand" title="Nexus" children="Mensagem da plataforma." />
    </div>
  ),
}
