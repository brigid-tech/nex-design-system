# Nexus Creator — Backend (Hono + Node.js)

## Princípio fundamental

A API Hono é a **única** porta de entrada ao Supabase e serviços externos. O cliente nunca chama o Supabase diretamente.

```
Client → [JWT no header] → Hono API → Supabase / OpenAI / Stripe
```

---

## Stack Backend

| Ferramenta | Uso |
|---|---|
| Node.js (>= 18) | runtime |
| Hono | framework HTTP, edge-ready |
| Zod | validação de input e schemas |
| Supabase JS SDK | comunicação com banco/auth |
| OpenAI SDK | embeddings para busca semântica |
| Anthropic SDK | respostas do Arquivista |
| Stripe SDK | pagamentos e webhooks |

---

## Estrutura de rotas

```
apps/api/src/
├── index.ts             ← instância Hono, registra routers, inicia server
├── routes/
│   ├── entities.ts      ← /api/entities
│   ├── articles.ts      ← /api/articles
│   ├── universes.ts     ← /api/universes
│   ├── ai.ts            ← /api/ai (Arquivista)
│   └── webhooks.ts      ← /api/webhooks/stripe
├── handlers/            ← lógica de cada endpoint (chamada de service + resposta)
├── services/            ← regras de negócio (puro TS, sem HTTP)
├── middleware/
│   ├── auth.ts          ← valida JWT do Supabase
│   ├── error.ts         ← error handler global
│   └── logger.ts
└── lib/
    ├── supabase.ts      ← cliente Supabase (server-side)
    ├── openai.ts        ← cliente OpenAI
    └── anthropic.ts     ← cliente Anthropic
```

---

## Padrões de rota Hono

```ts
// apps/api/src/routes/entities.ts
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { authMiddleware } from '../middleware/auth'
import * as entityService from '../services/entityService'

const entities = new Hono()

// Middleware de auth em todas as rotas deste router
entities.use('*', authMiddleware)

// GET /api/entities?universeId=xxx
entities.get('/', async (c) => {
  const universeId = c.req.query('universeId')
  const userId = c.get('userId') // injetado pelo authMiddleware
  const data = await entityService.list(universeId, userId)
  return c.json({ data })
})

// POST /api/entities
const createEntitySchema = z.object({
  name: z.string().min(1).max(100),
  type: z.enum(['character', 'place', 'faction', 'item', 'creature', 'event']),
  universeId: z.string().uuid(),
  fields: z.record(z.string()).optional(),
})

entities.post('/', zValidator('json', createEntitySchema), async (c) => {
  const body = c.req.valid('json')
  const userId = c.get('userId')
  const entity = await entityService.create(body, userId)
  return c.json({ data: entity }, 201)
})

export { entities }
```

---

## Middleware de autenticação

```ts
// apps/api/src/middleware/auth.ts
import { createMiddleware } from 'hono/factory'
import { supabase } from '../lib/supabase'

export const authMiddleware = createMiddleware(async (c, next) => {
  const token = c.req.header('Authorization')?.replace('Bearer ', '')
  if (!token) return c.json({ error: 'Unauthorized' }, 401)

  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) return c.json({ error: 'Invalid token' }, 401)

  c.set('userId', user.id)
  c.set('userEmail', user.email)
  await next()
})
```

---

## Padrões de resposta

```ts
// Sucesso
return c.json({ data: T })
return c.json({ data: T }, 201)  // criação

// Erro
return c.json({ error: 'Mensagem legível', details?: any }, 400)
return c.json({ error: 'Unauthorized' }, 401)
return c.json({ error: 'Not found' }, 404)
return c.json({ error: 'Internal server error' }, 500)

// Paginação
return c.json({
  data: T[],
  meta: { total: number, page: number, perPage: number }
})
```

---

## Validação com Zod

```ts
import { z } from 'zod'

// Schemas reutilizáveis em packages/shared/src/schemas/
export const EntityTypeSchema = z.enum([
  'character', 'place', 'faction', 'item', 'creature', 'event'
])

export const CreateEntitySchema = z.object({
  name: z.string().min(1, 'Nome obrigatório').max(100),
  type: EntityTypeSchema,
  universeId: z.string().uuid('ID inválido'),
  handle: z.string().regex(/^[a-zA-Z][a-zA-Z0-9_]*$/, 'Handle inválido').optional(),
  fields: z.record(z.string()).default({}),
})

// Tipo inferido (usar em toda a app)
export type CreateEntityInput = z.infer<typeof CreateEntitySchema>
```

---

## Camada de serviço (service)

Services são funções puras de negócio — sem `Request/Response`, sem Hono. Recebem dados tipados, retornam dados tipados.

```ts
// apps/api/src/services/entityService.ts
import { supabase } from '../lib/supabase'
import type { CreateEntityInput } from '@nexus/shared'

export async function create(input: CreateEntityInput, userId: string) {
  const { data, error } = await supabase
    .from('entities')
    .insert({ ...input, created_by: userId })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function list(universeId: string, userId: string) {
  const { data, error } = await supabase
    .from('entities')
    .select('*')
    .eq('universe_id', universeId)
    .eq('created_by', userId)

  if (error) throw new Error(error.message)
  return data
}
```

---

## Chamadas ao cliente (React) — convenção

```ts
// apps/web/src/lib/api.ts — wrapper tipado para fetch
async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const token = await getToken() // do Supabase Auth client
  const res = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error ?? 'API error')
  }
  return res.json()
}

// Módulos de API por domínio
export const api = {
  entities: {
    list: (universeId: string) =>
      apiFetch<{ data: Entity[] }>(`/api/entities?universeId=${universeId}`),
    create: (body: CreateEntityInput) =>
      apiFetch<{ data: Entity }>('/api/entities', { method: 'POST', body: JSON.stringify(body) }),
  },
}
```
