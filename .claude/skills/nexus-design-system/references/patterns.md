# Padrões de Uso — Design System

---

## Composição correta — DS vs App

```tsx
// ✅ No app — lógica de formulário fora do DS
const { register, formState: { errors } } = useForm<Schema>()

<FormField label="Nome" error={errors.name?.message} required htmlFor="name">
  <Input id="name" {...register('name')} error={!!errors.name} />
</FormField>

// ✅ No app — busca fora do DS
const { data: suggestions, isLoading } = useQuery({
  queryKey: ['mentions', query],
  queryFn: () => apiClient.entities.search(query),
  enabled: query.length >= 2,
})

<MentionInput
  value={value}
  onChange={setValue}
  onMentionQuery={setQuery}
  suggestions={suggestions ?? []}
  suggestionsLoading={isLoading}
  resolvedValues={resolvedValues}
/>

// ❌ Nunca dentro de um componente do DS
function MeuComponenteDS() {
  const [data, setData] = useState()
  useEffect(() => { fetch('/api/...').then(...) }, []) // PROIBIDO no DS
}
```

---

## Mobile-first — regras obrigatórias

**Regra base:** O estilo sem breakpoint é o estilo mobile. Breakpoints só para escalar.

```tsx
// ✅ Correto — mobile primeiro
<div className="flex flex-col gap-4 md:flex-row">
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
<Button size="md">Ação</Button>               // md em mobile — não sm
<div className="w-full max-w-sm mx-auto lg:max-w-none">

// ❌ Proibido
<div className="flex flex-row">               // sem fallback mobile
<div className="grid grid-cols-3">            // começa em 3 colunas
<Button size="sm">Mobile</Button>             // muito pequeno para toque (< 44px)
<div className="w-[420px]">                   // largura fixa sem responsive
```

### Áreas de toque
Mínimo **44px** em qualquer dimensão tocável:
```tsx
// Button size="md" → h-10 (40px) — pode precisar de py extra em mobile
// Button size="lg" → h-12 (48px) — ideal para CTAs mobile
// Button size="icon" → h-10 w-10 (40px) — borderline, preferir icon size "lg" custom se for CTA
// NavItem → py-2 com h implícita ~40px — aceitável com label
```

### Sidebar em mobile
```tsx
// SEMPRE off-canvas em mobile, fixo em desktop
<aside className={cn(
  'fixed inset-y-0 left-0 z-50 transition-transform duration-panel md:relative md:translate-x-0',
  mobileOpen ? 'translate-x-0' : '-translate-x-full',
  'w-[280px] md:w-[240px]'
)}>
  <Sidebar {...props} />
</aside>

// Overlay escuro em mobile
{mobileOpen && (
  <div
    className="fixed inset-0 z-40 bg-black/50 md:hidden"
    onClick={() => setMobileOpen(false)}
  />
)}
```

### Modal em mobile
```tsx
// Mobile: full-screen sheet estilo bottom/top
// Desktop: centralizado (comportamento padrão do Modal)
<Modal
  className={cn(
    // Mobile: bottom sheet
    'fixed bottom-0 left-0 right-0 top-auto translate-x-0 translate-y-0 rounded-b-none rounded-t-2xl',
    // Desktop: centralizado (sobrescreve mobile)
    'md:fixed md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-xl md:w-[480px]'
  )}
  ...
/>
```

### Validação visual obrigatória
Antes de qualquer push em task de UI, abrir DevTools e verificar em:
- 📱 **375px** — iPhone SE / 12 mini
- 📲 **768px** — iPad
- 💻 **1280px** — Desktop

---

## Design-first — quando implementando do HTML do design

1. Abrir o arquivo HTML **inteiro** — incluindo o wrapper/host raiz
2. Identificar qual componente do DS mapeia para cada elemento visual do HTML
3. Verificar classes e tokens exatos no HTML — não assumir
4. O que o wrapper injeta (backgrounds, animações) não deve ser recriado no filho
5. Quando a issue divergir do HTML, o HTML vence

### Mapeamento comum HTML → DS

| No HTML do design | Usar do DS |
|---|---|
| Botão com fundo `from-nex-brand-cyan to-nex-brand-violet` | `<Button variant="gradient">` |
| Botão outline com cor da entidade | `<Button variant="outline-cyan/violet">` |
| Campo com borda `border-nex-error` | `<Input error>` |
| Lable + campo + mensagem | `<FormField>` |
| Pill colorido de entidade | `<Badge entity="...">` |
| Token @menção inline em texto | `<Mention entity="...">` |
| Card com brilho hover | `<Card glassMagic>` ou `<EntityCard>` |
| Dialog com overlay | `<Modal>` |
| Item de nav com dot ativo | `<NavItem active>` |
| Avatar circular com initials | `<Avatar initials="JS">` |

---

## Acessibilidade — checklist rápido

Qualquer componente interativo deve:

```tsx
// ✅ Elementos semânticos corretos
<button onClick={handler}>      // não <div onClick>
<a href="/path">                 // não <span onClick> para links

// ✅ Anel de foco visível (já incluído nos componentes do DS)
focus-visible:ring-2 focus-visible:ring-nex-brand-cyan

// ✅ Estados ARIA
aria-disabled={isPending}
aria-expanded={isOpen}
aria-selected={isActive}
aria-label="Descrição para ícone-only buttons"

// ✅ Navegação por teclado
// Modal → Radix Dialog (focus trap + Escape automáticos)
// Select → Radix Select (↑↓ + Enter automáticos)
// NavItem → já renderiza <button> ou <a>
// MentionInput → ↑↓ Enter Tab Escape implementados
```

---

## Padrão de composição — criando componentes de feature

```tsx
// src/components/shared/EntityForm.tsx — componente do APP (não do DS)
// Usa primitivos do DS + lógica do app

import { Button, FormField, Input, Select, SelectItem } from '@nexus-creator-app/design-system'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateEntitySchema } from '@/types/entities'
import { useCreateEntity } from '@/hooks/useEntities'

export function EntityForm({ universeId, onSuccess }: EntityFormProps) {
  const { mutate, isPending } = useCreateEntity()
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(CreateEntitySchema),
  })

  return (
    <form onSubmit={handleSubmit((data) => mutate(data, { onSuccess }))}>
      <FormField label="Nome" error={errors.name?.message} required htmlFor="name">
        <Input id="name" {...register('name')} error={!!errors.name} />
      </FormField>

      <FormField label="Tipo" htmlFor="type">
        <Controller name="type" control={control} render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectItem value="character">Personagem</SelectItem>
            <SelectItem value="place">Local</SelectItem>
          </Select>
        )} />
      </FormField>

      <Button type="submit" variant="gradient" loading={isPending}>
        Criar entidade
      </Button>
    </form>
  )
}
```

---

## Quando propor mover algo para o DS

Criar em `src/components/` (app) se:
1. O componente é específico desta feature (ex: `ArticleEditor`, `EntityMentionPicker`)
2. É composição de primitivos do DS para este contexto

Propor mover para o DS (PR separado no `nex-design-system`) se:
- É um componente visual puro (sem lógica de negócio)
- Seria útil em múltiplos apps do Nexus (editor, landing, admin, mobile)
- Não tem dependências de `src/api/client.ts`, Zustand ou TanStack Query

---

## Publicação de novas versões do DS

Automática via GitHub Actions ao criar uma tag:

```bash
npm version patch   # ou minor / major
git push && git push --tags
```

**Semver:**
- `major` — remoção ou renomeação de prop/componente/token exportado (breaking)
- `minor` — adição retrocompatível (novo componente, nova prop opcional)
- `patch` — bugfix, ajuste visual, documentação
