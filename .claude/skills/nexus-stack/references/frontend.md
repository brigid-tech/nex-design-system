# Nexus Creator — Frontend (nex-core)

## Stack Frontend

| Ferramenta | Versão | Uso |
|---|---|---|
| React | **19** | UI declarativa — sem `React.FC` |
| TypeScript | — | strict mode, sem `any` |
| Vite | — | bundler e dev server |
| TanStack Router | latest | roteamento file-based, type-safe |
| TanStack Query | latest | server state, cache, sync |
| Zustand | latest | client state global |
| TipTap | latest | editor rich text + @menções |
| Tailwind CSS | v3 | utility-first styling |
| date-fns | latest | manipulação de datas |
| lucide-react | latest | ícones |
| `@nexus-creator-app/design-system` | — | componentes e tokens |

**Alias de import:** `@/` → `src/`

---

## Comandos

```bash
npm run dev      # dev server (Vite)
npm run build    # tsc -b + vite build
npm run lint     # ESLint — zero warnings antes de qualquer push
npm run preview  # preview do build
```

---

## TanStack Router — file-based routing

```
src/routes/
├── __root.tsx          ← root layout (QueryClient, toasts, estilos)
├── index.tsx           ← / (landing ou redirect)
├── login.tsx           ← /login
├── register.tsx        ← /register
├── forgot-password.tsx ← /forgot-password
├── app/
│   ├── __layout.tsx    ← layout autenticado (ProtectedRoute + AppLayout)
│   ├── index.tsx       ← /app (dashboard)
│   └── $worldSlug/
│       ├── index.tsx   ← /app/$worldSlug
│       └── ...
└── w/
    └── $worldSlug/
        └── index.tsx   ← /w/$worldSlug (wiki pública)
```

⚠️ `routeTree.gen.ts` é **gerado automaticamente** pelo TanStack Router. Nunca editar à mão.

```ts
// Navegação type-safe
import { useNavigate } from '@tanstack/react-router'
const navigate = useNavigate()
navigate({ to: '/app/$worldSlug', params: { worldSlug } })

// Params tipados
import { useParams } from '@tanstack/react-router'
const { worldSlug } = useParams({ from: '/app/$worldSlug/' })
```

---

## TanStack Query — padrões

```ts
// Query key factory — em src/lib/queryKeys.ts
export const entityKeys = {
  all:        ['entities'] as const,
  byWorld:    (worldSlug: string) => [...entityKeys.all, worldSlug] as const,
  detail:     (id: string)        => [...entityKeys.all, 'detail', id] as const,
  search:     (worldSlug: string, q: string) =>
                [...entityKeys.byWorld(worldSlug), 'search', q] as const,
}

// Query padrão
const { data, isLoading, isError } = useQuery({
  queryKey: entityKeys.byWorld(worldSlug),
  queryFn:  () => apiClient.entities.list(worldSlug),
  enabled:  !!worldSlug,
  staleTime: 30_000,
})

// Mutation com invalidação
const { mutate, isPending } = useMutation({
  mutationFn: apiClient.entities.create,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: entityKeys.byWorld(worldSlug) })
  },
})
```

**Regra:** Nunca `useEffect + fetch`. Sempre TanStack Query para dados do servidor.

---

## Zustand — padrões

```ts
// src/stores/worldStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Convenção: camelCase + sufixo Store (worldStore, editorStore — NÃO useWorldStore)
interface WorldStore {
  activeWorldSlug: string | null
  setActiveWorld: (slug: string) => void
}

export const worldStore = create<WorldStore>()(
  persist(
    (set) => ({
      activeWorldSlug: null,
      setActiveWorld: (slug) => set({ activeWorldSlug: slug }),
    }),
    { name: 'nex:world' }
  )
)

// Consumo no componente:
import { worldStore } from '@/stores/worldStore'
const activeWorldSlug = worldStore(s => s.activeWorldSlug)
```

**Regra de estado:**
- Dados do servidor → TanStack Query
- Estado de UI global / preferências → Zustand
- Estado local do componente → `useState`

---

## src/api/client.ts — cliente HTTP centralizado

```ts
// src/api/client.ts — ÚNICO ponto de chamadas à API Hono
// Nunca usar fetch direto em components ou hooks

import { supabase } from '@/lib/supabase'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const { data: { session } } = await supabase.auth.getSession()
  const token = session?.access_token ?? ''

  const res = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(err.error ?? `HTTP ${res.status}`)
  }

  return res.json()
}

export const apiClient = {
  entities: {
    list:   (worldSlug: string) =>
              request<{ data: Entity[] }>(`/entities?worldSlug=${worldSlug}`),
    create: (body: CreateEntityInput) =>
              request<{ data: Entity }>('/entities', { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: UpdateEntityInput) =>
              request<{ data: Entity }>(`/entities/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    delete: (id: string) =>
              request<void>(`/entities/${id}`, { method: 'DELETE' }),
  },
  ai: {
    ask: (body: { question: string; worldSlug: string }) =>
           request<{ data: { answer: string; sources: Source[] } }>('/ai/ask', {
             method: 'POST',
             body: JSON.stringify(body),
           }),
  },
}
```

---

## TipTap — editor de @menções

```tsx
// src/components/editor/NexusEditor.tsx
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Mention from '@tiptap/extension-mention'
import { suggestion } from './MentionSuggestion'

export function NexusEditor({ content, onChange, worldSlug }: NexusEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Mention.configure({
        HTMLAttributes: { class: 'nex-mention' },
        suggestion: suggestion(worldSlug), // passa worldSlug para buscar entidades
      }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
  })

  return <EditorContent editor={editor} className="nex-editor" />
}
```

```ts
// src/components/editor/MentionSuggestion.ts
// suggestion() retorna config do tippy.js para autocomplete de @menções
// Faz fetch das entidades via apiClient ao digitar @
```

---

## Mobile-first — regras obrigatórias

**Antes de escrever JSX/CSS: decidir layout mobile primeiro.**

```tsx
// ✅ Base mobile, escala com breakpoints
<div className="flex flex-col gap-4 md:flex-row">
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
<div className="w-full max-w-sm mx-auto lg:max-w-none">

// ❌ Proibido
<div className="flex flex-row">        // sem fallback mobile
<div className="grid grid-cols-3">     // começa em 3 colunas
<div className="w-[420px]">            // largura fixa sem responsive
```

**Regras práticas:**
- Áreas de toque ≥ 44px (usar `size="md"` em buttons, não `size="sm"` em mobile)
- Sidebars/navs precisam de versão mobile (off-canvas, drawer ou colapsado)
- Modais em mobile: `w-full` / `inset-0` — não centralizados como desktop
- `text-xs` apenas para metadados, nunca conteúdo principal
- Imagens: `max-w-full h-auto` — sem `width` fixo em pixels

**Validação obrigatória antes de concluir UI:** 📱 375px · 📲 768px · 💻 1280px

---

## Estrutura de componentes

```
src/components/
├── auth/                  ← login, register, forgot-password
├── editor/                ← NexusEditor, MentionNode, MentionSuggestion
├── layout/                ← AppLayout, AuthLayout, WikiLayout
│   └── AppLayout.tsx      ← shell com Sidebar + Content + ChatLateral
└── shared/                ← ProtectedRoute e componentes reutilizados
```

**Regra:** componente específico de feature fica em `src/components/<area>/`.
Se for genérico o suficiente para outros apps → propor mover para o DS (PR separado).

---

## React 19 — diferenças relevantes

```tsx
// ✅ Sem React.FC — tipagem direta nas props
interface ButtonProps { label: string; onClick: () => void }
function Button({ label, onClick }: ButtonProps) { ... }

// ❌ Não usar React.FC
const Button: React.FC<ButtonProps> = ({ label }) => { ... }

// ✅ use() para Promises e Context (React 19)
const data = use(promise)
const theme = use(ThemeContext)
```

---

## Imports — ordem obrigatória (ESLint)

```ts
// 1. Externos
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

// 2. Design system
import { Button, Card } from '@nexus-creator-app/design-system'

// 3. Internos (@/)
import { apiClient } from '@/api/client'
import { useAuth } from '@/hooks/useAuth'
import { worldStore } from '@/stores/worldStore'

// 4. Relativos
import { EntityCard } from './EntityCard'
```
