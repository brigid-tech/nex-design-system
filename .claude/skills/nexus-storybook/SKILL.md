---
name: nexus-storybook
description: "Padrões de stories do Storybook no design system Nexus (repo nex-design-system). Use sempre que a tarefa envolver escrever, revisar ou rodar stories, documentar a API de um componente, cobrir estados visuais, ou usar o addon de acessibilidade. Acionar ao mencionar 'story', 'stories', 'storybook', 'autodocs', 'documentar componente' ou 'cobrir estados'."
---

# Nexus — Storybook

Storybook 10 + `@storybook/react-vite`. Addon `@storybook/addon-a11y` habilitado.
Fundo dark (`#0A0B0F`) por padrão. É a forma de validar e documentar componentes
do DS — não há app rodando aqui.

```bash
npm run storybook        # http://localhost:6006
npm run build-storybook  # build estático
```

Toda story é o ponto de **validação visual** antes do push: abrir o componente,
checar todos os estados em 375px / 768px / 1280px (toolbar de viewport).

---

## Template de story

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./Button"

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ["autodocs"],
  parameters: { backgrounds: { default: "dark" } },
}
export default meta
type Story = StoryObj<typeof Button>

// Estado padrão
export const Default: Story = {
  args: { children: "Entrar no beta" },
}

// Cada estado relevante como story separada
export const Loading: Story = {
  args: { children: "Salvando…", loading: true },
}
export const Disabled: Story = {
  args: { children: "Indisponível", disabled: true },
}

// Panorama de variantes num render
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="gradient">Gradient</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
}
```

---

## Cobertura obrigatória por componente

- [ ] Estado padrão (`Default`)
- [ ] Todos os estados visuais aplicáveis: `loading`, `error`, `disabled`, `active`/`selected`
- [ ] Todas as variantes e tamanhos (story `AllVariants`)
- [ ] Interação relevante (ex.: `Modal` aberto vs fechado; `Select` com opções)
- [ ] `tags: ["autodocs"]` para a doc automática da API
- [ ] `args` tipados — a story É a documentação da prop pública

---

## Boas práticas

- `parameters.backgrounds.default = "dark"` — o DS é dark-first
- Conferir o painel **Accessibility** (addon a11y) — zerar violações antes do push
- Usar viewports da toolbar para validar mobile-first
- Não colocar lógica de app na story (sem fetch/store) — mocks simples via `args`
