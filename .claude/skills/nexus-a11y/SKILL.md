---
name: nexus-a11y
description: "Acessibilidade obrigatória dos componentes do design system Nexus (repo nex-design-system) e uso das primitivas Radix UI. Use sempre que a tarefa envolver tornar um componente acessível, decidir entre HTML nativo e Radix, foco por teclado, navegação, aria-*, focus ring ou revisar a11y de um componente. Acionar ao mencionar 'acessibilidade', 'a11y', 'aria', 'teclado', 'foco', 'screen reader', 'Radix', 'Dialog', 'Select' ou 'Tooltip'."
---

# Nexus — Acessibilidade & Radix

Acessibilidade não é opcional no DS: cada componente é consumido por todos os
apps, então um erro de a11y se propaga para todos. O addon a11y do Storybook
(`nexus-storybook`) deve ficar sem violações antes do push.

---

## Regras obrigatórias (todo componente interativo)

- **Focável por teclado** — use `<button>` ou `<a>`, **nunca** `<div onClick>`
- **Label acessível** — `aria-label` quando não há texto visível; `aria-labelledby`
  quando o rótulo é outro elemento
- **Comunica estado** — `aria-disabled`, `aria-expanded`, `aria-selected`,
  `aria-checked` conforme o componente
- **Anel de foco visível** — `focus-visible:ring-2 focus-visible:ring-nex-brand-cyan
  focus-visible:outline-none` (ou `shadow-focus-cyan`)
- **Enter e Space funcionam** — nativo em `<button>`; nunca reimplemente em `div`

```tsx
// ✅
<button onClick={onDelete} aria-label="Excluir entidade"
  className="focus-visible:ring-2 focus-visible:ring-nex-brand-cyan focus-visible:outline-none">
  <Trash size={16} />
</button>

// ❌ não focável, sem teclado, sem label
<div onClick={onDelete}><Trash size={16} /></div>
```

---

## Quando usar Radix UI

Componentes com comportamento complexo de a11y (focus trap, navegação por
setas, `aria-modal`, portal) **não devem ser reimplementados** — use a primitiva
Radix e foque só no estilo e na API pública.

| Componente DS | Primitiva Radix |
|---|---|
| `Modal` | `@radix-ui/react-dialog` |
| `Select` / `SelectItem` | `@radix-ui/react-select` |
| `Tooltip` | `@radix-ui/react-tooltip` |
| `DropdownMenu` | `@radix-ui/react-dropdown-menu` |

O Radix entrega focus trap, navegação por teclado e roles corretos. Sua
responsabilidade: aplicar tokens `nex-*` e expor props limpas.

Regra prática: precisa de overlay, foco preso, navegação por setas ou
posicionamento flutuante? Comece pelo Radix, não pelo zero.

---

## Contraste e dark-first

- Texto sobre fundo: usar pares de token (`text-nex-text-primary` sobre
  `bg-nex-bg-*`) — já calibrados para contraste em dark
- `text-nex-text-tertiary` é baixo contraste: só para texto decorativo, nunca
  para informação essencial
- Cores de entidade têm contraste suficiente sobre os `bg` escuros; não use a
  cor `DEFAULT` como fundo de texto pequeno

---

## Checklist de a11y (antes do push)

- [ ] Interativo é `button`/`a`, não `div`
- [ ] `aria-label`/`aria-labelledby` presente quando não há texto visível
- [ ] Estado comunicado via `aria-*`
- [ ] Foco visível com `focus-visible:ring` / `shadow-focus-*`
- [ ] Teclado: Tab navega, Enter/Space ativa
- [ ] Comportamento complexo delegado ao Radix
- [ ] Painel Accessibility do Storybook sem violações
