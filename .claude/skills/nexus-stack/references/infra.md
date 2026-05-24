# Nexus Creator — Infra, Auth, Banco e Serviços

## Supabase

### Serviços em uso
| Serviço | Uso |
|---|---|
| PostgreSQL | banco principal |
| pgvector | embeddings para busca semântica do Arquivista |
| Supabase Auth | autenticação JWT |
| Storage | [a confirmar — assets de universo?] |
| Realtime | [a confirmar — para backlinks em tempo real?] |

### Regra de acesso
- **Client (React):** usa Supabase Auth SDK apenas para autenticação (login, token refresh)
- **API (Hono):** usa Supabase JS SDK com service role key para todas as queries ao banco
- **Nunca:** client fazendo queries diretas ao banco

### Cliente Supabase na API
```ts
// apps/api/src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // nunca expor no client
)
```

### Cliente Supabase no frontend (só auth)
```ts
// apps/web/src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY, // anon key apenas
)

// Pegar token para enviar à API
export async function getToken(): Promise<string> {
  const { data: { session } } = await supabaseClient.auth.getSession()
  return session?.access_token ?? ''
}
```

---

## Schema do banco (estrutura principal)

```sql
-- Universos criados pelos usuários
CREATE TABLE universes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  created_by  UUID REFERENCES auth.users(id),
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Entidades do universo (personagens, locais, etc)
CREATE TABLE entities (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  universe_id  UUID REFERENCES universes(id) ON DELETE CASCADE,
  name         TEXT NOT NULL,
  handle       TEXT NOT NULL,  -- usado em @menções
  type         TEXT NOT NULL CHECK (type IN ('character','place','faction','item','creature','event')),
  fields       JSONB DEFAULT '{}',
  created_by   UUID REFERENCES auth.users(id),
  created_at   TIMESTAMPTZ DEFAULT now(),
  UNIQUE(universe_id, handle)
);

-- Artigos / wiki do universo
CREATE TABLE articles (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  universe_id  UUID REFERENCES universes(id) ON DELETE CASCADE,
  title        TEXT NOT NULL,
  content      TEXT,  -- markdown com @menções embutidas
  created_by   UUID REFERENCES auth.users(id),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

-- Embeddings para busca semântica (Arquivista)
CREATE TABLE entity_embeddings (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id   UUID REFERENCES entities(id) ON DELETE CASCADE,
  embedding   vector(1536),  -- OpenAI text-embedding-3-small
  content     TEXT,
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- Índice pgvector para busca aproximada
CREATE INDEX ON entity_embeddings USING ivfflat (embedding vector_cosine_ops);
```

---

## Autenticação — fluxo completo

```
1. Usuário faz login via Supabase Auth (email/password ou OAuth)
2. Supabase retorna JWT (access_token)
3. Client armazena token na sessão Supabase (automático)
4. Em cada request à API: Authorization: Bearer <token>
5. authMiddleware valida token com supabase.auth.getUser(token)
6. userId injetado no contexto Hono para uso nos handlers
```

### Variáveis de ambiente

```ini
# apps/api/.env
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxx   # nunca expor
OPENAI_API_KEY=sk-xxx
ANTHROPIC_API_KEY=sk-ant-xxx
STRIPE_SECRET_KEY=sk_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
PORT=3000

# apps/web/.env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxx      # OK expor — RLS controla
VITE_API_URL=http://localhost:3000
```

---

## IA — Arquivista

### OpenAI — geração de embeddings
```ts
// apps/api/src/lib/openai.ts
import OpenAI from 'openai'
export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// Gerar embedding de uma entidade
export async function embedEntity(text: string): Promise<number[]> {
  const res = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  })
  return res.data[0].embedding
}
```

### Anthropic — respostas do Arquivista
```ts
// apps/api/src/lib/anthropic.ts
import Anthropic from '@anthropic-ai/sdk'
export const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// Exemplo de RAG: buscar contexto + gerar resposta
export async function askArquivista(question: string, context: string) {
  const msg = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `Contexto do universo:\n${context}\n\nPergunta: ${question}`
    }],
    system: 'Você é o Arquivista, guardião do lore deste universo. Responda com base apenas nas entidades e artigos fornecidos no contexto. Cite as fontes (@handle.campo).'
  })
  return msg.content[0].type === 'text' ? msg.content[0].text : ''
}
```

### Fluxo RAG do Arquivista
```
1. Usuário faz pergunta no ChatLateral
2. API gera embedding da pergunta (OpenAI)
3. pgvector busca as N entidades mais similares (cosine similarity)
4. Contexto das entidades enviado ao Claude com a pergunta
5. Claude responde citando @handles como fonte
6. Resposta + sources enviados ao client
```

---

## Stripe — pagamentos

```ts
// Webhook handler em /api/webhooks/stripe
// Verificar assinatura antes de processar
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

app.post('/webhooks/stripe', async (c) => {
  const sig = c.req.header('stripe-signature')!
  const body = await c.req.text()
  const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  // processar event.type: 'checkout.session.completed', 'customer.subscription.*'
})
```

---

## Deploy (a confirmar)

| Item | Status |
|---|---|
| Plataforma frontend | ⏳ Vercel / Railway / Fly.io |
| Plataforma API | ⏳ Railway / Fly.io / Render |
| CI/CD | ⏳ GitHub Actions |
| Ambientes | ⏳ dev / staging / prod |

**Atualizar esta seção quando as decisões forem tomadas.**
