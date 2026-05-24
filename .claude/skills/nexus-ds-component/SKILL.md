---
name: nexus-ds-component
description: "Passo a passo para criar ou modificar um componente do design system Nexus (repo nex-design-system). Use sempre que a tarefa for adicionar um componente novo, adicionar/alterar variantes ou props, ou refatorar um componente do DS. Cobre o template canônico (CVA + forwardRef + displayName + cn), barrels, arquivos a criar e o checklist de conclusão. Acionar ao mencionar 'novo componente', 'adicionar variante', 'criar Button/Modal/etc', 'CVA' ou 'barrel export'."
---

# Nexus — Autoria de componente do DS

O passo a passo para nascer um componente no `nex-design-system`.
Para a divisão DS-vs-app e a lista do que já existe, ver `nexus-design-system`.

---

## Antes de criar — checklist de decisão

1. **Já existe?** Confira a lista em `nexus-design-system`. Talvez uma prop nova resolva.
2. **É puro?** Se precisa de fetch/estado global/validação → é do app, não do DS.
3. **Precisa de acessibilidade complexa?** (focus trap, navegação por teclado, aria-modal)
   → use uma primitiva Radix. Ver `nexus-a11y`.

---

## Arquivos a criar (sempre os três)

```
src/components/<Nome>/
  <Nome>.tsx           Implementação
  <Nome>.stories.tsx   Story (ver nexus-storybook)
  index.ts             Barrel: export * from "./<Nome>"
```

E **exportar no barrel geral** `src/components/index.ts`:
```ts
export * from "./<Nome>"
```

Esquecer o barrel geral = o componente não sai no pacote. É o erro mais comum.

---

## Template canônico

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/cn"

const nomeVariants = cva(
  // classes base — sempre presentes
  "inline-flex items-center transition-colors",
  {
    variants: {
      variant: {
        gradient: "bg-gradient-to-r from-nex-brand-cyan to-nex-brand-violet text-nex-text-inverted",
        ghost:    "text-nex-text-secondary hover:bg-nex-bg-hover",
      },
      size: {
        sm: "h-8 px-3 text-body-sm",
        md: "h-10 px-4 text-body",
      },
    },
    defaultVariants: { variant: "gradient", size: "md" },
  }
)

export interface NomeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof nomeVariants> {
  // props adicionais aqui
}

const Nome = React.forwardRef<HTMLDivElement, NomeProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(nomeVariants({ variant, size }), className)}
      {...props}
    />
  )
)
Nome.displayName = "Nome"

export { Nome, nomeVariants }
```

**Por que cada regra existe:**
- `forwardRef` → apps anexam ref para foco e animação
- `displayName` → DevTools e Storybook mostram o nome real
- `cn()` → resolve conflito de classes Tailwind (não concatene strings)
- `...props` por último → não bloqueia atributos nativos (`id`, `onClick`, `data-*`)
- exportar `nomeVariants` → apps podem reusar as classes em casos avançados

---

## Cores e tipografia — só via sistema

```tsx
// ✅ classe do preset
className="text-nex-text-primary bg-nex-bg-secondary"
// ✅ token TS quando inline style é inevitável
import { colors } from "../../tokens/colors"
style={{ color: colors.entity.character.DEFAULT }}

// ❌ hardcode
className="text-[#8B5CF6]"
style={{ color: "#8B5CF6" }}
```
→ Catálogo de classes e tokens em `nexus-tokens`.

---

## Checklist de conclusão

- [ ] `<Nome>.tsx`, `<Nome>.stories.tsx`, `index.ts` criados
- [ ] Exportado em `src/components/index.ts` (barrel geral)
- [ ] `React.forwardRef` + `displayName`
- [ ] Variantes com CVA, `defaultVariants` definidos
- [ ] `cn()` + `className` externo no final + `...props` repassados
- [ ] Cores/tipografia via tokens — nenhum hardcode
- [ ] Acessível: focável por Tab, ativa com Enter/Space, `aria-*`, focus ring
- [ ] Story cobre todos os estados (ver `nexus-storybook`)
- [ ] `npm run lint && npm run typecheck && npm run build` passam
- [ ] Adição de prop/componente = bump **minor** (ver `nexus-release`)
