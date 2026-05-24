# Nexus Creator — Stack & Project Context

Este arquivo fornece contexto técnico sobre o projeto Nexus Creator para uso na geração de cards e descrições de issues.

---

## Visão Geral do Produto

**Nexus Creator** é uma plataforma de criação de conteúdo digital — voltada para criadores que precisam de ferramentas para produzir, organizar e distribuir conteúdo.

*[Expandir conforme o projeto evoluir — atualizar este arquivo com detalhes de produto, módulos e decisões de arquitetura]*

---

## Stack Técnica

### Frontend
- **Framework**: React (com TypeScript)
- **Design System**: `@nexus-creator-app/design-system` — componentes, tokens de cor, tipografia
- **Styling**: Tailwind CSS (utilitários base apenas — sem compiler customizado)
- **Estado**: Inferir por complexidade — local (`useState`), global (Context/Zustand), server state (React Query ou SWR)
- **Roteamento**: React Router ou framework equivalente

### Backend
- **Runtime**: Node.js
- **Framework**: Hono — leve, rápido, edge-ready
- **Padrão de API**: REST (inferir do contexto, pode ser RPC-style)
- **Validação**: Zod (padrão comum com Hono)
- **Autenticação**: [a definir — JWT / sessions / OAuth]

### Banco de Dados
- **[A definir conforme o projeto]** — PostgreSQL, SQLite, ou outro
- Migrations gerenciadas via [Drizzle ORM / Prisma / outra]

### Infra & Tooling
- **Monorepo ou multi-repo**: [a confirmar]
- **Deploy**: [a confirmar — Vercel, Railway, Fly.io, etc.]
- **CI/CD**: [a confirmar]

---

## Convenções de Projeto

### Nomenclatura
- Componentes React: PascalCase (`UserCard`, `ContentEditor`)
- Arquivos de componente: `ComponentName.tsx`
- Hooks: `useNomeDoHook`
- Endpoints Hono: kebab-case (`/api/content-items`)
- Variáveis de ambiente: SCREAMING_SNAKE_CASE

### Estrutura de Diretórios (sugerida)
```
/apps
  /web          ← React frontend
  /api          ← Node.js + Hono backend
/packages
  /design-system ← @nexus-creator-app/design-system
  /shared        ← tipos e utilitários compartilhados
```

### Padrões de API
- Respostas de sucesso: `{ data: T }`
- Respostas de erro: `{ error: string, details?: any }`
- Paginação: `{ data: T[], meta: { total, page, perPage } }`

---

## Executores de Cards

Os cards podem ser executados por:

1. **Claude Code (agente IA)** — precisa de descrições completas e não ambíguas, com contexto técnico explícito, critérios testáveis, e referências a arquivos/módulos
2. **Desenvolvedor humano** — aprecia contexto de produto, motivação das decisões, e critérios de aceitação claros

**Escreva sempre para o Claude Code como leitor primário.** Um humano consegue inferir; um agente não.

---

## Notas Adicionais

*Atualizar este arquivo conforme decisões arquiteturais forem tomadas no projeto:*
- [ ] Definir ORM e banco de dados
- [ ] Definir estratégia de autenticação
- [ ] Definir estrutura de monorepo
- [ ] Definir plataforma de deploy
- [ ] Documentar módulos principais do produto
