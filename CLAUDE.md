# CLAUDE.md — `@nexus-creator-app/design-system`

Guia operacional para o Claude Code neste repositório.
Leia este arquivo inteiro antes de qualquer modificação.

---

## O que é este repositório

Pacote npm privado `@nexus-creator-app/design-system`, publicado no GitHub
Packages. É consumido por todos os serviços do Nexus Creator (editor web,
landing page, app mobile, painel admin). Qualquer quebra de API pública
ou regressão visual afeta todos ao mesmo tempo.

**Produto:** Plataforma SaaS de worldbuilding — escritores e mestres de RPG
organizam universos fictícios via entidades (@personagens, @locais, @facções)
que se conectam por @menções em tempo real.

---

## Comandos essenciais

```bash
npm run build        # tsup — gera dist/ (ESM + CJS + tipos)
npm run typecheck    # tsc --noEmit — validação de tipos sem build
npm run lint         # eslint src/
npm run dev          # playground local (npm run dev --prefix playground)
npm run storybook    # Storybook na porta 6006
```

**Antes de qualquer commit:** `npm run lint && npm run build` devem passar sem
erros ou warnings. Se falhar, corrija antes de continuar.

---

## Stack

| O quê | Como |
|---|---|
| Componentes | React 18 + TypeScript strict |
| Variantes | CVA (`class-variance-authority`) |
| Estilos | Tailwind CSS v3 via preset próprio |
| Build | tsup (ESM + CJS + `.d.ts`) |
| Documentação | Storybook |
| Publicação | GitHub Packages (automático via tag) |

---

## Estrutura do repositório

```
src/
  components/          Um diretório por componente
    Button/
      Button.tsx       Implementação
      Button.stories.tsx  Story do Storybook
      index.ts         Barrel export do componente
    ...
    index.ts           Barrel export de todos os componentes
  tokens/              Design tokens como objetos TypeScript
    colors.ts          Paleta + EntityType
    typography.ts
    spacing.ts
    motion.ts
    shadows.ts
    index.ts
  styles/
    globals.css        CSS custom properties (--nex-*) + animações
    fonts.css          @font-face (Cinzel, Inter) + Google Fonts (JetBrains Mono)
  lib/
    cn.ts              Utilitário clsx + tailwind-merge
  preset.ts            Tailwind preset exportável (consumido pelos apps)
  index.ts             Barrel principal do pacote
fonts/                 Arquivos .ttf (Cinzel, Inter variáveis)
```

---

## Como adicionar um componente novo

1. Criar `src/components/NomeComponente/NomeComponente.tsx`
2. Criar `src/components/NomeComponente/index.ts` com o barrel
3. Adicionar story em `src/components/NomeComponente/NomeComponente.stories.tsx`
4. Exportar no barrel geral `src/components/index.ts`
5. Confirmar que `npm run build` e `npm run typecheck` passam

### Template de componente

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/cn"

const nomeVariants = cva(
  // classes base — sempre presentes
  "...",
  {
    variants: {
      variant: { ... },
      size:    { ... },
    },
    defaultVariants: { ... },
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

**Regras do template:**
- Sempre `React.forwardRef` — apps precisam de refs para animações e foco
- Sempre `displayName` — aparece no React DevTools e no Storybook
- Sempre `cn()` para mesclar classes — nunca concatenação de string
- Props HTML do elemento base sempre em `...props` — não bloqueie atributos nativos
- CVA para variantes — nunca ternários longos de className

---

## Tokens de design

### Cores — use sempre via CSS custom properties

```tsx
// ✅ correto — CSS var, respeita o tema
className="text-nex-text-primary bg-nex-bg-secondary"

// ✅ correto — valor do token para inline style quando inevitável
import { colors } from "../../tokens/colors"
style={{ color: colors.entity.character.DEFAULT }}

// ❌ errado — hardcode que não respeita o sistema
style={{ color: "#8B5CF6" }}
className="text-[#8B5CF6]"
```

### Paleta de cores de entidade

```
character → violet  #8B5CF6
place     → green   #10B981
faction   → amber   #F59E0B
item      → blue    #3B82F6
creature  → red     #EF4444
event     → pink    #EC4899
```

Cada entidade tem 5 variantes: `DEFAULT`, `bg`, `bgHover`, `border`,
`borderHover`. Use-as nos tokens, nunca invente valores novos.

### Classes Tailwind disponíveis (via preset)

```
Backgrounds: bg-nex-bg-primary | secondary | elevated | hover
Borders:     border-nex-border-subtle | default | strong
Texto:       text-nex-text-primary | secondary | tertiary | inverted
Marca:       text-nex-brand-cyan | violet
Entidades:   text-nex-entity-character | place | faction | item | creature | event
Sombras:     shadow-elevation-1 | 2 | 3 | 4
Glows:       shadow-glow-cyan | violet | brand
Focus:       shadow-focus-cyan | error
Animações:   animate-glow-pulse | mention-flash | magic-breathe | spin
```

---

## Acessibilidade — regras obrigatórias

Todo componente interativo deve:

- **Ser focável por teclado** — usar `<button>` ou `<a>`, nunca `<div>` com `onClick`
- **Ter label acessível** — `aria-label` quando não há texto visível,
  `aria-labelledby` quando o label é outro elemento
- **Comunicar estado** — `aria-disabled`, `aria-expanded`, `aria-selected`
  conforme o componente
- **Ter anel de foco visível** — usar `focus-visible:ring-2 focus-visible:ring-nex-brand-cyan`
- **Funcionar com Enter e Space** — nativamente em `<button>`, nunca reimplementar

### Componentes com Radix UI

Componentes complexos usam primitivas Radix para acessibilidade gerenciada:

| Componente DS | Primitiva Radix |
|---|---|
| `Modal` | `@radix-ui/react-dialog` |
| `Select` / `SelectItem` | `@radix-ui/react-select` |
| `Tooltip` | `@radix-ui/react-tooltip` |
| `DropdownMenu` | `@radix-ui/react-dropdown-menu` |

**Não reimplemente** focus trap, aria-modal, keyboard navigation — o Radix
já faz isso. Sua responsabilidade é o estilo e a API pública.

---

## O que pertence a este repositório

### ✅ Pertence ao DS

- Componentes React puros (sem efeitos colaterais)
- Tokens de design (cores, tipografia, espaçamento, motion, sombras)
- Estados visuais (error, loading, disabled, active, selected)
- Animações e transições CSS
- Utilitários de composição (`cn`)
- Preset Tailwind
- Stories do Storybook

### ❌ Não pertence ao DS

- Lógica de validação de formulário (use React Hook Form + Zod nos apps)
- Chamadas de API ou fetch
- Estado global (Zustand, Context com lógica)
- Roteamento
- Internacionalização (i18n)
- Lógica de negócio específica do Nexus Creator
- Autenticação

Se você se pegar escrevendo `useEffect` com fetch ou importando uma store
Zustand dentro de um componente do DS, **pare** — isso pertence ao app.

---

## Componente `MentionInput` — atenção especial

É o componente mais complexo do DS e o mais estratégico para o produto.

**O que ele faz:**
- Campo contenteditable que detecta `@` e exibe dropdown de autocomplete
- Insere tokens visuais coloridos por tipo de entidade
- Emite o valor em formato bruto `[[id:campo]]` via `onChange`

**O que ele NÃO faz:**
- Não busca entidades — recebe `suggestions` e chama `onMentionQuery`
- Não resolve valores — recebe `resolvedValues: Record<string, Record<string, string>>`
- Não valida menções

A resolução `@Kael.idade → 32` acontece no app via TanStack Query.
O DS só renderiza o token e aplica flash quando o valor muda.

**Formato do valor bruto:**
```
Texto normal [[kael-id]] mais [[lugar-id:nome]] texto.
```
- `[[id]]` — menção sem campo
- `[[id:campo]]` — menção com campo

---

## Padrão de story (Storybook)

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./Button"

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ["autodocs"],
  parameters: {
    backgrounds: { default: "dark" },
  },
}
export default meta
type Story = StoryObj<typeof Button>

// Estado padrão
export const Default: Story = {
  args: { children: "Entrar no beta" },
}

// Todos os estados relevantes como stories separadas
export const Loading: Story = {
  args: { children: "Salvando…", loading: true },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="gradient">Gradient</Button>
      <Button variant="cyan">Cyan</Button>
      {/* ... */}
    </div>
  ),
}
```

**Cada componente precisa cobrir:**
- Estado padrão
- Todos os estados visuais (error, loading, disabled, active)
- Variantes e tamanhos (se houver)
- Interação relevante (ex: Modal aberto vs fechado)

---

## Versionamento e publicação

O pacote segue semver. A publicação é automática via GitHub Actions ao criar
uma tag:

```bash
# Patch (bug fix, ajuste visual sem quebra de API)
npm version patch

# Minor (componente novo, prop nova retrocompatível)
npm version minor

# Major (quebra de API pública — evitar ao máximo)
npm version major

git push && git push --tags
```

**Regra:** qualquer remoção ou renomeação de prop, componente ou token
exportado é uma breaking change → `major`. Adição é sempre `minor`.

---

## Gitflow

Seguir o CONTRIBUTING.md do projeto. Resumo:

```bash
# Sempre partir de dev
git fetch origin dev
git checkout -b feature/nome-da-feature origin/dev

# Commits atômicos por mudança lógica
git commit -m "feat: adicionar componente FormField"
git commit -m "fix(a11y): NavItem usar button em vez de div"

# Antes do PR
npm run lint && npm run build   # zero erros
git push origin feature/nome-da-feature
```

PR sempre com `--base dev`, nunca direto para `main`.

---

## Checklist antes de abrir PR

- [ ] `npm run lint` — zero warnings
- [ ] `npm run build` — sem erros, `dist/` gerado
- [ ] `npm run typecheck` — zero erros de tipo
- [ ] Novo componente tem story cobrindo todos os estados
- [ ] API pública documentada na story (args tipados)
- [ ] Componente interativo: focável por Tab, ativa com Enter/Space
- [ ] Sem lógica de negócio ou fetch dentro do componente
- [ ] Exportado nos barrels (`components/index.ts` e `index.ts`)
- [ ] `displayName` definido
