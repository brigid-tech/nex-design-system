---
name: nexus-stack
description: "Contexto técnico completo e vivo do projeto Nexus Creator. Use este skill sempre que a conversa envolver arquitetura, decisões técnicas, estrutura de pastas, convenções de código, integração entre camadas, ou qualquer dúvida sobre como o projeto está organizado. Acionar automaticamente ao escrever código, gerar cards no Linear, criar prompts para o Claude Code, ou discutir qualquer aspecto técnico do Nexus Creator — mesmo que o usuário não mencione explicitamente 'stack' ou 'arquitetura'."
---

# Nexus Creator — Stack de Referência

Plataforma SaaS de worldbuilding com @menções em tempo real. Dark-first.

> **Arquivos de referência:**
> - `references/frontend.md` — React, TanStack, Zustand, TipTap, DS, estrutura real
> - `references/backend.md` — Hono, Node.js, API patterns, Zod (repo separado)
> - `references/infra.md` — Supabase, pgvector, Stripe, Auth

---

## Repositórios

| Repo | Conteúdo |
|---|---|
| `nex-design-system` | Design system `@nexus-creator-app/design-system` (este repo — `src/`) |
| `nex-core` | Frontend React (consome o DS) |
| `nex-api` *(ou similar)* | API Hono — repo separado [confirmar nome] |

> Este skill vive no repo **nex-design-system**. Para padrões de autoria de
> componentes, tokens, stories e publicação use as skills `nexus-design-system`,
> `nexus-ds-component`, `nexus-tokens`, `nexus-storybook` e `nexus-release`.

---

## Stack completa

| Camada | Tecnologia | Status |
|---|---|---|
| Build | Vite | ✅ definido |
| UI | React **19** + TypeScript | ✅ definido |
| Design System | `@nexus-creator-app/design-system` (Tailwind v3 + shadcn/ui) | ✅ definido |
| Roteamento | TanStack Router (file-based, `routeTree.gen.ts` gerado) | ✅ definido |
| Server state | TanStack Query | ✅ definido |
| Client state | Zustand | ✅ definido |
| Editor rich text | TipTap (mention + starter-kit + tippy.js) | ✅ definido |
| Auth | Supabase Auth (JWT) | ✅ definido |
| API intermediária | Hono (repo separado) | ✅ definido |
| Banco | Supabase (PostgreSQL + pgvector) | ✅ definido |
| Validação | Zod | ✅ definido |
| Datas | date-fns | ✅ definido |
| Ícones | lucide-react | ✅ definido |
| IA | OpenAI embeddings + Anthropic Claude | ✅ definido |
| Pagamentos | Stripe | ✅ definido |
| Package manager | **npm** (nunca pnpm/yarn) | ✅ definido |
| Node | >= 18 | ✅ definido |
| ORM / Migrations | [a confirmar] | ⏳ pendente |
| Deploy / Infra | [a confirmar] | ⏳ pendente |
| Testes | [a confirmar] | ⏳ pendente |

---

## Estrutura de pastas — nex-core (frontend)

```
src/
├── api/              ← cliente HTTP para a API Hono
│   └── client.ts     ← ÚNICO ponto de chamadas HTTP — nunca fetch direto em components
├── assets/           ← imagens, SVGs, fontes locais
├── components/
│   ├── auth/         ← telas de autenticação
│   ├── editor/       ← TipTap (NexusEditor, MentionNode, MentionSuggestion)
│   ├── layout/       ← AppLayout, AuthLayout, WikiLayout
│   └── shared/       ← ProtectedRoute e componentes reutilizados entre features
├── hooks/            ← hooks customizados (useAuth, useWorld, useEntityMentions…)
├── lib/              ← setup de bibliotecas (queryClient, supabase)
├── routes/           ← file-based routing do TanStack Router
│   ├── __root.tsx    ← root layout
│   ├── app/          ← área autenticada (/app/...)
│   ├── w/            ← wiki pública (/w/$worldSlug/...)
│   └── *.tsx         ← rotas públicas (login, register, etc.)
├── stores/           ← stores Zustand (editorStore, worldStore)
├── types/            ← tipos TypeScript compartilhados
│   ├── api.ts        ← contratos de request/response
│   ├── entities.ts   ← tipos das entidades de universo
│   └── world.ts      ← tipos de universo
├── index.css         ← estilos globais mínimos
├── main.tsx          ← bootstrap: Router + QueryClient + DS styles
└── routeTree.gen.ts  ← GERADO automaticamente — NUNCA editar à mão
```

**Alias de import:** `@/` aponta para `src/`

```ts
import { Button } from '@nexus-creator-app/design-system'
import { useAuth } from '@/hooks/useAuth'
import { apiClient } from '@/api/client'
```

---

## Regra de ouro da arquitetura

**O cliente nunca acessa o Supabase diretamente para dados de negócio.**
Toda comunicação de dados passa por `src/api/client.ts` → API Hono:

```
Client (React)
  └── src/api/client.ts → API Hono → Supabase / OpenAI / Anthropic / Stripe
```

O Supabase Auth SDK é usado **apenas** para autenticação (login, token refresh) — nunca para queries de negócio.

---

## Princípio mobile-first — OBRIGATÓRIO

Toda UI começa pelo layout mobile (< 640px). Breakpoints só para escalar:

```tsx
// ✅ Correto — começa mobile, escala para cima
<div className="flex flex-col md:flex-row gap-4">

// ❌ Errado — começa desktop, tenta "consertar" mobile depois
<div className="flex flex-row gap-4">
```

**Validação obrigatória antes de concluir qualquer tarefa de UI:** 375px / 768px / 1280px.
→ Detalhes completos em `references/frontend.md`.

---

## Convenções universais

### Nomenclatura

| Tipo | Convenção | Exemplo |
|---|---|---|
| Componentes React | PascalCase | `EntityCard.tsx`, `NexusEditor.tsx` |
| Hooks | `useNomeDoHook` | `useAuth.ts`, `useEntityMentions.ts` |
| Stores Zustand | camelCase + sufixo `Store` | `worldStore.ts`, `editorStore.ts` |
| Rotas TanStack | kebab-case ou `$param` | `forgot-password.tsx`, `$worldSlug/` |
| Tipos / interfaces | PascalCase | `EntityField`, `WorldSummary` |
| Variáveis e funções | camelCase | `getEntityById`, `resolvedFields` |
| Constantes globais | SCREAMING_SNAKE_CASE | `MAX_ENTITY_NAME_LENGTH` |
| Variáveis de ambiente | SCREAMING_SNAKE_CASE | `VITE_API_URL` |

### Commits (Conventional Commits com ID da issue)
```
feat(NEX-33): implementar autenticação com Supabase
fix(NEX-28): corrigir EditorMockup em mobile
refactor(NEX-41): extrair useSidebarMode para hook separado
chore: atualizar dependências
```

### Branches (sempre partir de `dev`)
```bash
git fetch origin dev
git checkout -b <gitBranchName-do-linear> origin/dev
```

---

## Identidade visual — resumo

Dark-first. Gradiente `#00D4FF` (cyan) → `#8B5CF6` (violet).

| Token | Valor |
|---|---|
| Bg primário | `#0A0B0F` |
| Bg secundário | `#111318` |
| Bg elevado | `#1A1D26` |
| Texto primário | `#F0F2F8` |
| Cyan (marca) | `#00D4FF` |
| Violet (marca) | `#8B5CF6` |
| Fonte display | Cinzel |
| Fonte UI | Inter |
| Fonte mono | JetBrains Mono |

→ Para detalhes completos do DS, usar a skill `nexus-design-system`.

---

## Decisões pendentes

- [ ] Nome exato do repo da API Hono
- [ ] ORM e strategy de migrations (Drizzle? Prisma? Supabase SDK direto?)
- [ ] Plataforma de deploy (Vercel? Railway? Fly.io?)
- [ ] Estratégia de testes (Vitest? Playwright para e2e?)
- [ ] CI/CD pipeline
