import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Modal } from "./Modal"
import { Button } from "../Button/Button"

const meta: Meta<typeof Modal> = {
  component: Modal,
  tags: ["autodocs"],
  parameters: { backgrounds: { default: "dark" } },
}
export default meta
type Story = StoryObj<typeof Modal>

function ModalDemo({ size }: { size?: "sm" | "md" | "lg" }) {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir Modal ({size ?? "md"})</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Criar personagem"
        description="Preencha os dados do novo personagem."
        size={size}
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button variant="gradient" onClick={() => setOpen(false)}>Criar</Button>
          </>
        }
      >
        <p className="text-body text-nex-text-secondary">Conteúdo do modal aqui.</p>
      </Modal>
    </>
  )
}

export const Default: Story = {
  render: () => (
    <div className="p-8">
      <ModalDemo />
    </div>
  ),
}

export const SizeSm: Story = {
  render: () => (
    <div className="p-8">
      <ModalDemo size="sm" />
    </div>
  ),
}

export const SizeLg: Story = {
  render: () => (
    <div className="p-8">
      <ModalDemo size="lg" />
    </div>
  ),
}

export const WithoutFooter: Story = {
  render: () => {
    function Demo() {
      const [open, setOpen] = React.useState(false)
      return (
        <>
          <Button onClick={() => setOpen(true)}>Abrir sem footer</Button>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            title="Aviso"
            description="Este modal não tem footer."
          >
            <p className="text-body text-nex-text-secondary">Feche com o X ou pressione Escape.</p>
          </Modal>
        </>
      )
    }
    return <div className="p-8"><Demo /></div>
  },
}

export const OpenByDefault: Story = {
  render: () => {
    function Demo() {
      const [open, setOpen] = React.useState(true)
      return (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Modal aberto"
          description="Este modal começa aberto para visualização no Storybook."
        >
          <p className="text-body text-nex-text-secondary">Tab fica preso aqui. Escape fecha.</p>
        </Modal>
      )
    }
    return <Demo />
  },
}
