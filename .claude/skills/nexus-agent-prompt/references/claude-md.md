# CLAUDE.md — Template para nex-core

O CLAUDE.md fica na raiz do repositório e é lido automaticamente pelo agente em toda sessão.
O arquivo real do projeto já existe em `nex-core/CLAUDE.md` — este template é referência para criar/atualizar.

---

## Template completo (baseado no CLAUDE.md real do projeto)

```markdown
# CLAUDE.md — nex-core

Guia de contexto para agentes de código trabalhando neste repositório.
Leia este arquivo **inteiro** antes de qualquer tarefa.

---

## 0. ⚠️ Regras inegociáveis (ler primeiro)

### 0.1. Fluxo de Git — OBRIGATÓRIO em TODA tarefa de código

**Antes de escrever qualquer linha de código:**

1. Buscar o `gitBranchName` no Linear da issue (`get_issue` → campo `gitBranchName`)
2. Mover a issue para `In Progress` via `save_issue`
3. Criar a branch a partir de `dev`:
   ```bash
   git fetch origin dev
   git checkout -b <gitBranchName-do-linear> origin/dev
   ```

**Nunca:**
- ❌ Commitar direto em `main` ou `dev`
- ❌ Reaproveitar branch atual que não casa com o `gitBranchName` do Linear
- ❌ Criar branch a partir de `main` ou de outra feature
- ❌ Pular o `git fetch origin dev`
- ❌ Fazer um único commit gigante no final
- ❌ Push sem antes rodar `npm run lint` e `npm run build`

**Antes de finalizar (obrigatório, nesta ordem):**
```bash
npm run lint    # zero warnings
npm run build   # sem erros
```

### 0.2. Anunciar no início da tarefa

> "Issue Linear: NEX-XX. Branch: `<gitBranchName>`. Base: `origin/dev`."

Se qualquer dos três não estiver claro, **pare e pergunte**.

### 0.3. Mobile-first é OBRIGATÓRIO

- Estilos base = mobile (< 640px). Breakpoints `sm:` / `md:` / `lg:` para escalar.
- Sidebars e navs precisam de versão mobile (drawer, off-canvas ou colapsado)
- Áreas de toque ≥ 44px
- Nunca `text-xs` para conteúdo principal
- Grids: começar em `grid-cols-1`, subir com breakpoints
- Modais em mobile: `w-full` / `inset-0`
- Validar em 375px / 768px / 1280px antes de concluir

### 0.4. Outras regras inegociáveis
- Package manager: **npm** (nunca pnpm/yarn)
- Cliente nunca chama Supabase para dados de negócio — sempre via `src/api/client.ts`
- Verificar `@brigid-tech/design-system` antes de criar qualquer componente visual

---

## 1. O projeto

**Nexus Creator** — plataforma SaaS de worldbuilding.
Coração: sistema de @menções em tempo real (`@Kael.idade` → resolve para o valor atual).

**Pilares:** entidades de universo · @menções · backlinks automáticos · wiki pública · IA com RAG

---

## 2. Stack

| Camada | Tecnologia |
|---|---|
| Build | Vite |
| UI | React 19 + TypeScript |
| Design system | `@brigid-tech/design-system` (Tailwind v3 + shadcn/ui) |
| Roteamento | TanStack Router (file-based, `routeTree.gen.ts` é gerado) |
| Server state | TanStack Query |
| Client state | Zustand |
| Editor | TipTap (mention + starter-kit + tippy.js) |
| Auth | Supabase Auth (JWT) |
| API intermediária | Hono (Supabase nunca é exposto ao client) |
| Banco | Supabase (PostgreSQL + pgvector) |
| Validação | Zod |
| Datas | date-fns |
| Ícones | lucide-react |
| IA | OpenAI embeddings + Anthropic Claude |
| Pagamentos | Stripe |
| Package manager | **npm** |
| Node | >= 18 |

---

## 3. Estrutura de pastas

```
src/
├── api/client.ts     ← ÚNICO ponto de chamadas HTTP à API Hono
├── assets/
├── components/
│   ├── auth/         ← telas de autenticação
│   ├── editor/       ← TipTap (NexusEditor, MentionNode, MentionSuggestion)
│   ├── layout/       ← AppLayout, AuthLayout, WikiLayout
│   └── shared/       ← ProtectedRoute e componentes reutilizados
├── hooks/            ← useAuth, useWorld, useEntityMentions…
├── lib/              ← queryClient, supabase (setup)
├── routes/           ← file-based TanStack Router
│   ├── __root.tsx
│   ├── app/
│   └── w/
├── stores/           ← worldStore.ts, editorStore.ts
├── types/            ← api.ts, entities.ts, world.ts
├── index.css
├── main.tsx
└── routeTree.gen.ts  ← GERADO — nunca editar à mão
```

**Alias:** `@/` → `src/`

---

## 4. Nomenclaturas

| Item | Padrão | Exemplo |
|---|---|---|
| Componentes React | PascalCase | `EntityCard.tsx` |
| Hooks | `useNome` | `useAuth.ts` |
| Stores Zustand | camelCase + sufixo `Store` | `worldStore.ts` |
| Rotas TanStack | kebab-case ou `$param` | `forgot-password.tsx` |
| Tipos / interfaces | PascalCase | `EntityField` |
| Variáveis e funções | camelCase | `getEntityById` |
| Constantes globais | SCREAMING_SNAKE_CASE | `MAX_ENTITY_NAME_LENGTH` |

---

## 5. Padrão de código

- TypeScript strict: sem `any`, sem `!` desnecessário
- React 19: sem `React.FC`, components funcionais
- Server state → TanStack Query (nunca `useEffect` para fetch)
- Client state global → Zustand. Local → `useState`
- ESLint: zero warnings antes de qualquer push
- Imports: externos → `@nexus-creator-app/*` → `@/*` → relativos

---

## 6. Design System

Antes de criar qualquer componente visual: verificar se já existe no DS.

```tsx
import { Button, Card, cn } from '@brigid-tech/design-system'
```

Componentes disponíveis: `Button`, `Input`, `Textarea`, `Select`, `Badge`, `Mention`,
`Card`, `EntityCard`, `Toast`, `Modal`, `Avatar`, `Sidebar`, `NavItem`, `cn`.

Dark-first. Classes: `bg-nex-bg-primary`, `text-nex-brand-cyan`, `font-display`, etc.

---

## 7. Git e Linear

- Branch base: sempre `dev`. Nunca `main`.
- `gitBranchName` do Linear é o nome exato da branch.
- Commits atômicos com Conventional Commits + ID da issue.
- PR: `--base dev`. Body: O que foi feito / Arquivos / Como testar / Critérios / `Closes NEX-XX`.
- Linear: In Progress ao iniciar · In Review ao abrir PR · Done após merge.

---

## 8. Comandos

```bash
npm run dev      # dev server
npm run build    # tsc -b + vite build
npm run lint     # ESLint — zero warnings antes de push
npm run preview  # preview do build
```

---

## 9. Checklist do agente

**Início:**
- [ ] Anunciei: Issue / Branch / Base
- [ ] Issue movida para In Progress
- [ ] Branch criada a partir de `origin/dev` com `gitBranchName` do Linear

**Durante:**
- [ ] Sem `React.FC`
- [ ] Sem componente recriado que já existe no DS
- [ ] Layout mobile-first — base sem breakpoint, escala com `sm:`/`md:`
- [ ] Sidebars com versão mobile
- [ ] Áreas de toque ≥ 44px
- [ ] Commits atômicos com Conventional Commits

**Antes do push:**
- [ ] `npm run lint` — zero warnings
- [ ] `npm run build` — sem erros
- [ ] Validado em 375px / 768px / 1280px

**Após push:**
- [ ] PR com `--base dev` e descrição completa
- [ ] Issue Linear → In Review + link do PR comentado
```

---

## Onde colocar o CLAUDE.md

```
nex-core/
└── CLAUDE.md    ← arquivo raiz (já existe — atualizar, não recriar)
```

O projeto tem um único CLAUDE.md na raiz. Sub-arquivos por pasta não são necessários.
