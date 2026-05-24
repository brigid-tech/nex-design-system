import type { Meta, StoryObj } from "@storybook/react"
import { Undo2 } from "lucide-react"
import { Toast } from "./Toast"
import { Button } from "../Button/Button"
import { Avatar } from "../Avatar/Avatar"

const meta: Meta<typeof Toast> = {
  component: Toast,
  tags: ["autodocs"],
  parameters: { backgrounds: { default: "dark" } },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error", "info", "brand"],
    },
  },
}
export default meta
type Story = StoryObj<typeof Toast>

/* ── Single variants ── */

export const Success: Story = {
  args: {
    variant: "success",
    title: "Entidade criada",
    description: "@Kael foi adicionada a Aetheria.",
  },
}

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Referência quebrada",
    description: "@Cidades.Bryn não existe. 3 artigos afetados.",
  },
}

export const Error: Story = {
  args: {
    variant: "error",
    title: "Falha ao salvar",
    description: "Conexão interrompida. Mantivemos seu rascunho.",
  },
}

export const Info: Story = {
  args: {
    variant: "info",
    title: "Wiki publicada",
    description: "nexuscreator.app/u/aetheria indexada em ~2 min.",
  },
}

export const Brand: Story = {
  args: {
    variant: "brand",
    title: "Arquivista pronto",
    description: "Indexou 51 entidades · entendeu 187 menções.",
  },
}

/* ── 1. Todas as variantes de status ── */

export const AllStatusVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[380px]">
      <Toast variant="success" title="Sucesso" description="Operação concluída." onClose={() => {}} />
      <Toast variant="warning" title="Aviso" description="Verifique os dados." onClose={() => {}} />
      <Toast variant="error" title="Erro" description="Algo deu errado." onClose={() => {}} />
      <Toast variant="info" title="Info" description="Informação relevante." onClose={() => {}} />
      <Toast variant="brand" title="Nexus" description="Mensagem da plataforma." onClose={() => {}} />
      <Toast variant="default" title="Neutro" description="Sem variante semântica." onClose={() => {}} />
    </div>
  ),
}

/* ── 2. Toasts de atividade (neutros / custom) ── */

export const ActivityToasts: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[400px]">
      {/* Comentário de colaborador */}
      <Toast
        variant="default"
        icon={<Avatar initials="MV" size={24} />}
        title="Maelis comentou em @Kael"
        description="“Acho que a idade dele devia ser 34, não 32.”"
        action={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">Responder</Button>
            <Button variant="cyan" size="sm">Aplicar mudança</Button>
          </div>
        }
        onClose={() => {}}
      />

      {/* Ação desfeita */}
      <Toast
        variant="default"
        icon={<Undo2 size={14} strokeWidth={2} />}
        title="@veyla foi excluída."
        description="Desfazer em 5s…"
        action={
          <Button variant="ghost" size="sm" className="text-nex-brand-cyan">
            Desfazer
          </Button>
        }
        onClose={() => {}}
      />

      {/* Progresso de indexação */}
      <div className="relative flex flex-col gap-2 overflow-hidden rounded-lg border border-nex-border-default bg-nex-bg-elevated p-3 shadow-elevation-2">
        <div className="flex items-center justify-between">
          <span className="text-body-sm font-semibold text-nex-text-primary">
            Indexando entidade…
          </span>
          <span className="font-mono text-caption text-nex-text-tertiary">64%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-nex-bg-secondary">
          <div
            className="h-full rounded-full bg-gradient-to-r from-nex-brand-cyan to-nex-brand-violet"
            style={{ width: "64%" }}
          />
        </div>
      </div>
    </div>
  ),
}

/* ── 3. Vocabulário PT-BR do projeto ── */

export const ProjectVocabulary: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[420px]">
      <Toast
        variant="success"
        title="Entidade criada"
        description="@Kael foi adicionada a Aetheria."
        action={<Button variant="ghost" size="sm">Abrir</Button>}
        onClose={() => {}}
      />
      <Toast
        variant="info"
        title="3 entidades importadas"
        description="Migradas de Notion · 47 menções foram religadas."
        action={<Button variant="ghost" size="sm">Ver lista</Button>}
        onClose={() => {}}
      />
      <Toast
        variant="warning"
        title="Referência quebrada"
        description="@Cidades.Bryn não existe. 3 artigos afetados."
        action={<Button variant="ghost" size="sm">Resolver</Button>}
        onClose={() => {}}
      />
      <Toast
        variant="error"
        title="Falha ao salvar"
        description="Conexão interrompida. Mantivemos seu rascunho."
        action={<Button variant="ghost" size="sm">Tentar de novo</Button>}
        onClose={() => {}}
      />
      <Toast
        variant="info"
        title="Wiki publicada"
        description="nexuscreator.app/u/aetheria indexada em ~2 min."
        action={<Button variant="ghost" size="sm">Copiar link</Button>}
        onClose={() => {}}
      />
      <Toast
        variant="brand"
        title="Arquivista pronto"
        description="Indexou 51 entidades · entendeu 187 menções."
        action={<Button variant="ghost" size="sm">Perguntar</Button>}
        onClose={() => {}}
      />
    </div>
  ),
}

/* ── 4. Diagrama de posicionamento ── */

export const PositioningDiagram: Story = {
  render: () => (
    <div className="relative aspect-video w-[640px] overflow-hidden rounded-xl border border-nex-border-default bg-nex-bg-primary p-3">
      {/* top-right — sistema */}
      <div className="absolute right-3 top-3 w-64">
        <Toast variant="success" title="Entidade criada" description="@Kael adicionada a Aetheria." />
        <span className="mt-1 block text-right text-caption text-nex-text-tertiary">top-right · sistema</span>
      </div>

      {/* center — Arquivista */}
      <div className="absolute left-1/2 top-1/2 w-64 -translate-x-1/2 -translate-y-1/2">
        <Toast variant="brand" title="Arquivista pronto" description="Indexou 51 entidades." />
        <span className="mt-1 block text-center text-caption text-nex-text-tertiary">center · Arquivista</span>
      </div>

      {/* bottom-right — ações */}
      <div className="absolute bottom-3 right-3 w-64">
        <Toast
          variant="default"
          icon={<Undo2 size={14} strokeWidth={2} />}
          title="@veyla foi excluída."
          action={<Button variant="ghost" size="sm" className="text-nex-brand-cyan">Desfazer</Button>}
        />
        <span className="mt-1 block text-right text-caption text-nex-text-tertiary">bottom-right · ações</span>
      </div>
    </div>
  ),
}
