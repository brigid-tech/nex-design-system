---
name: nexus-react
description: "Padrões de React + TypeScript para componentes PUROS do design system Nexus (repo nex-design-system). Use este skill ao escrever ou revisar componentes do DS: anatomia, tipagem de props, forwardRef, composição por slots, mobile-first e estados visuais. Acionar mesmo que o usuário só mencione 'componente', 'props', 'tipagem', 'forwardRef' ou 'estado visual'. NÃO cobre TanStack Query, Zustand, rotas, fetch ou formulários com lógica — isso é do app consumidor, não do DS."
---

# Nexus — Padrões React (componentes puros do DS)

React 18 (peer `>=18`) + TypeScript strict. Repo: `nex-design-system`.
Aqui os componentes são **puros**: recebem props, renderizam JSX, aplicam tokens.
Sem efeitos colaterais, sem fetch, sem estado global.

> **Arquivo de referência:**
> - `references/components.md` — anatomia, composição por slots, mobile-first, estados visuais, TS

> Para variantes com CVA, barrels, `displayName` e o passo a passo de criar um
> componente, ver `nexus-ds-component`. Para tokens, ver `nexus-tokens`.

---

## Linha divisória — o que pode existir aqui

```
✅ props + JSX + tokens nex-*          → componente do DS
✅ useState local para estado de UI    → ok (ex: Toast aberto/fechado interno)
✅ useRef encaminhado via forwardRef    → ok
❌ useQuery / useMutation               → app
❌ store Zustand / Context com lógica   → app
❌ fetch / apiClient                    → app
❌ validação de formulário (RHF + Zod)  → app
```

Se precisa de dados do servidor ou estado global, o componente está no repo errado.

---

## React + TypeScript — regras

```tsx
// ✅ Interface nomeada para props, sem React.FC
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  entity: EntityType
  size?: "sm" | "md"
}

// ✅ forwardRef + displayName (obrigatório no DS)
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ entity, size = "md", className, ...props }, ref) => (
    <span ref={ref} className={cn(/* ... */, className)} {...props} />
  )
)
Badge.displayName = "Badge"

// ❌ Proibido: React.FC, any, ! desnecessário, concatenação de className
```

- Tipos derivados dos tokens quando possível (`EntityType` vem de `tokens/colors.ts`)
- Eventos tipados: `React.ChangeEvent<HTMLInputElement>`
- Sempre aceitar e mesclar `className` externo no final via `cn()`
- Sempre repassar `...props` para o elemento base

---

## Mobile-first — obrigatório

```tsx
// ✅ Base mobile → escala com breakpoints
<div className="flex flex-col md:flex-row gap-4">
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

// ❌ Nunca começar desktop
<div className="flex flex-row">
```

- Áreas de toque ≥ 44px (`min-h-[44px]`)
- Modais em mobile: tela quase inteira (`w-full inset-0`), não centralizados
- Validar no Storybook em 375px / 768px / 1280px antes de concluir

---

## Composição por slots

Layouts e contêineres do DS expõem slots genéricos (`React.ReactNode`), nunca
lógica interna. Ex: `Card` com `CardHeader`/`CardContent`/`CardFooter`.
→ Padrão completo em `references/components.md`.

---

## Estados visuais — sempre tratar

Todo componente que tem estado deve cobrir, quando aplicável: `default`,
`hover`, `active`/`selected`, `disabled`, `loading`, `error`. Cada estado vira
uma story (ver `nexus-storybook`).

---

## Checklist para componente do DS

- [ ] Interface `NomeProps` tipada — sem `any`, sem `!`, sem `React.FC`
- [ ] `React.forwardRef` + `displayName`
- [ ] CVA para variantes/tamanhos (ver `nexus-ds-component`)
- [ ] `cn()` para classes; `className` externo aceito no final
- [ ] `...props` repassados ao elemento base
- [ ] Cores só via `nex-*` / tokens — nunca hardcode
- [ ] Sem fetch, sem estado global, sem validação de negócio
- [ ] Acessibilidade: `button`/`a` (não `div onClick`), `aria-*`, focus ring
- [ ] Mobile-first validado em 375px
- [ ] Estados de loading/disabled/error tratados quando aplicável
