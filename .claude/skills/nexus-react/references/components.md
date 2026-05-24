# Componentes React — Templates e Composição

## Anatomia de um componente — template base

Exemplo de um componente do DS (imports relativos dentro de `src/`, `forwardRef`,
`displayName`, elemento nativo acessível e classe de entidade **estática**):

```tsx
// src/components/EntityNavItem/EntityNavItem.tsx
import * as React from "react"
import { cn } from "../../lib/cn"
import { Badge } from "../Badge"
import type { EntityType } from "../../tokens/colors"

// Mapa estático — Tailwind só gera classes que existem literais no código.
// Nunca monte a classe por interpolação (`bg-nex-entity-${type}`): ela não é
// detectada no build e o CSS não é gerado.
const entityDot: Record<EntityType, string> = {
  character: "bg-nex-entity-character",
  place:     "bg-nex-entity-place",
  faction:   "bg-nex-entity-faction",
  item:      "bg-nex-entity-item",
  creature:  "bg-nex-entity-creature",
  event:     "bg-nex-entity-event",
}

export interface EntityNavItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  entity: EntityType
  label: string
  active?: boolean
}

// Interativo = <button>, nunca <div onClick> (foco e teclado nativos)
const EntityNavItem = React.forwardRef<HTMLButtonElement, EntityNavItemProps>(
  ({ entity, label, active = false, className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-pressed={active}
      className={cn(
        // Base mobile — 44px mínimo de toque
        "flex w-full items-center gap-3 px-3 py-3 rounded-lg min-h-[44px]",
        "transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nex-brand-cyan",
        active
          ? "bg-nex-bg-elevated text-nex-text-primary"
          : "text-nex-text-secondary hover:bg-nex-bg-hover hover:text-nex-text-primary",
        className
      )}
      {...props}
    >
      <span className={cn("w-2 h-2 rounded-full shrink-0", entityDot[entity])} />
      <span className="font-ui text-sm flex-1 truncate text-left">{label}</span>
      <Badge entity={entity} size="sm" />
    </button>
  )
)
EntityNavItem.displayName = "EntityNavItem"

export { EntityNavItem }
```

---

## Mobile-first — padrões obrigatórios

```tsx
// Sidebar com versão mobile (drawer)
export function AppLayout({ sidebar, children, chat }: AppLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen w-full overflow-hidden bg-nex-bg-primary">

      {/* Mobile: drawer overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar: off-canvas em mobile, fixa em desktop */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-[280px] transition-transform duration-300 md:relative md:translate-x-0',
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        // Desktop: largura normal
        'md:w-[420px] md:shrink-0'
      )}>
        {sidebar}
      </aside>

      {/* Content */}
      <main className="flex-1 min-w-0 overflow-auto">
        {/* Botão hamburguer — visível só em mobile */}
        <button
          className="md:hidden p-3 min-h-[44px] min-w-[44px]"
          onClick={() => setMobileSidebarOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu size={20} />
        </button>
        {children}
      </main>

    </div>
  )
}

// Grid responsivo — sempre começar em 1 coluna
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

// Modal responsivo
<div className={cn(
  // Mobile: tela quase inteira
  'fixed inset-x-0 bottom-0 rounded-t-2xl',
  // Desktop: centralizado
  'md:inset-auto md:rounded-xl md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[480px]'
)}>

// Tabela em mobile → cards empilhados
<div className="block md:hidden">
  {rows.map(row => <MobileCard key={row.id} data={row} />)}
</div>
<table className="hidden md:table w-full">...</table>
```

---

## Estados de loading e empty — obrigatórios

```tsx
// Loading: skeleton animado
if (isLoading) {
  return (
    <div className="flex flex-col gap-2 p-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-10 rounded-lg bg-nex-bg-elevated animate-pulse" />
      ))}
    </div>
  )
}

// Error state
if (isError) {
  return (
    <div className="flex flex-col items-center gap-3 py-8 px-4 text-center">
      <p className="font-ui text-sm text-nex-text-secondary">
        Erro ao carregar dados.
      </p>
      <Button variant="ghost" size="sm" onClick={() => refetch()}>
        Tentar novamente
      </Button>
    </div>
  )
}

// Empty state
if (data.length === 0) {
  return (
    <div className="flex flex-col items-center gap-2 py-8 px-4 text-center">
      <p className="font-ui text-sm text-nex-text-secondary">
        Nenhuma entidade encontrada.
      </p>
    </div>
  )
}
```

---

## Composição por slots (layouts)

```tsx
// ✅ Slots genéricos — sem lógica interna
interface PageLayoutProps {
  header?: React.ReactNode
  sidebar?: React.ReactNode
  children: React.ReactNode
}

export function PageLayout({ header, sidebar, children }: PageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      {sidebar && (
        <aside className="w-full md:w-64 shrink-0">{sidebar}</aside>
      )}
      <div className="flex-1 min-w-0 flex flex-col">
        {header && <header className="shrink-0">{header}</header>}
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
```

---

## TypeScript — padrões obrigatórios

```tsx
// ✅ Interface nomeada para props
interface MyProps { ... }

// ✅ Tipos derivados dos tokens (no DS, imports relativos dentro de src/)
import type { EntityType } from '../../tokens/colors'

// ✅ Eventos tipados
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { ... }

// ✅ Ref tipado
const inputRef = useRef<HTMLInputElement>(null)

// ✅ Children
interface ContainerProps { children: React.ReactNode }

// ❌ Evitar any → usar unknown + narrowing
// ❌ Evitar as sem validação
// ❌ Evitar ! (non-null assertion) → verificar explicitamente
```

---

## Utilitário cn — merge de classes

```ts
// Vem do DS — não recriar
import { cn } from '@nexus-creator-app/design-system'

className={cn(
  'base-classes',
  condition && 'conditional-class',
  className // sempre aceitar className externo no final
)}
```

---

## Acessibilidade — checklist mínimo

```tsx
// Elementos interativos: sempre button ou a
<button onClick={handler} aria-label="Excluir entidade">
  <Trash size={16} />
</button>

// Focus ring obrigatório
className="focus-visible:ring-2 focus-visible:ring-nex-brand-cyan focus-visible:outline-none"

// Estados ARIA
aria-disabled={isPending}
aria-expanded={isOpen}
aria-selected={isActive}

// Modais: Radix Dialog (focus trap automático)
// Selects: Radix Select (keyboard nav automática)
```
