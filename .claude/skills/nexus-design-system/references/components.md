# Componentes — API Completa

Baseado no código fonte real de `@nexus-creator-app/design-system`.

---

## Button

```tsx
<Button variant="gradient">CTA principal</Button>
<Button variant="cyan" size="sm" loading>Salvando…</Button>
<Button variant="ghost" noRipple>Sem ripple</Button>
<Button variant="icon" size="icon"><Sparkles size={16} /></Button>
```

### Variantes completas
```tsx
// Sólidos — gradiente/mágico
variant="gradient"    // cyan→violet, text-inverted, glow no hover
variant="magic"       // violet→cyan→gold, glow-magic

// Sólidos — marca
variant="cyan"
variant="violet"
variant="gold"

// Sólidos — semânticos
variant="success" | "warning" | "error" | "info"

// Neutros
variant="secondary"   // borda sutil, sem fundo — DEFAULT
variant="ghost"       // sem borda, hover bg-hover

// Outline — marca
variant="outline-cyan" | "outline-violet" | "outline-gold"

// Outline — semânticos
variant="outline-success" | "outline-warning" | "outline-error" | "outline-info"

// Alias (retrocompatibilidade)
variant="destructive"  // alias de outline-error
```

### Tamanhos
```tsx
size="sm"      // h-8  px-3  text-body-sm
size="md"      // h-10 px-4  text-body       ← DEFAULT
size="lg"      // h-12 px-6  text-body-lg
size="icon"    // h-10 w-10  p-0  (botão de ícone quadrado)
size="icon-sm" // h-8  w-8   p-0
```

### Props especiais
```tsx
loading={true}    // spinner + disabled automático
noRipple={true}   // desabilita o efeito ripple de clique
disabled={true}   // opacity-50, pointer-events-none
```

### Sistema de ripple
O ripple é gerado dinamicamente no `onPointerDown`. Três modos automáticos por variante:
- `--dark`: overlay preto semitransparente → botões sólidos coloridos (gradient, cyan, success…)
- `--light`: wash branco sutil → botões neutros (secondary, ghost)
- `--color`: cor da borda com baixa opacidade → botões outline e destructive

---

## Input

```tsx
<Input placeholder="Nome da entidade" />
<Input error placeholder="Campo inválido" />
<Input mono placeholder="@kael.idade" />
<Input disabled />
```

Props: `error?: boolean` · `mono?: boolean` · todos os `HTMLInputElement` attributes.
Altura: `h-11`. Foco: `border-nex-brand-cyan shadow-focus-cyan`. Erro: `border-nex-error shadow-focus-error`.

---

## InputShell + InputAffix

Para inputs com ícones ou afixos leading/trailing:

```tsx
// Com ícone de busca (não interativo)
<InputShell>
  <InputAffix><Search size={16} /></InputAffix>
  <input placeholder="Buscar entidades…" />
</InputShell>

// Com botão de limpar (interativo)
<InputShell>
  <InputAffix><Search size={16} /></InputAffix>
  <input placeholder="Buscar…" />
  <InputAffix as="button" onClick={clearSearch} aria-label="Limpar">
    <X size={16} />
  </InputAffix>
</InputShell>

// Com prefixo de texto (ex: handle)
<InputShell>
  <InputAffix text="prefix">@</InputAffix>
  <input placeholder="handle" />
</InputShell>

// Com sufixo de texto (ex: unidade)
<InputShell>
  <input placeholder="32" />
  <InputAffix text="suffix">anos</InputAffix>
</InputShell>
```

`InputAffix` props: `as="span"|"button"` · `text="prefix"|"suffix"` · `onClick` · `aria-label`

---

## Textarea

```tsx
<Textarea placeholder="Descrição do personagem…" />
<Textarea error rows={6} />
```

Props: `error?: boolean` · todos os `HTMLTextareaElement` attributes. `min-h-[96px]`, resize-vertical.

---

## Select + SelectItem

Baseado em **Radix UI** — navegação por teclado e acessibilidade completas.

```tsx
<Select placeholder="Tipo de entidade" onValueChange={setTipo}>
  <SelectItem value="character">Personagem</SelectItem>
  <SelectItem value="place">Local</SelectItem>
  <SelectItem value="faction">Facção</SelectItem>
  <SelectItem value="item" disabled>Item (indisponível)</SelectItem>
</Select>

// Controlado
<Select value={tipo} onValueChange={setTipo} error>
  <SelectItem value="creature">Criatura</SelectItem>
</Select>
```

Props do `Select`: `value` · `defaultValue` · `onValueChange` · `placeholder` · `disabled` · `error`
Props do `SelectItem`: `value` · `disabled`

---

## Checkbox

```tsx
<Checkbox label="Publicar na wiki" />
<Checkbox label="Aceito os termos" description="Necessário para continuar" required />
<Checkbox indeterminate label="Selecionar todos" />
<Checkbox error label="Campo obrigatório" />
```

Props: `label?: ReactNode` · `description?: ReactNode` · `indeterminate?: boolean` · `error?: boolean` · `wrapperClassName?: string` · todos os `HTMLInputElement` attributes.

---

## Radio + RadioCard

```tsx
// Radio simples
<Radio name="tipo" value="character" label="Personagem" id="r-character" />
<Radio name="tipo" value="place" label="Local" description="Cidades, regiões…" id="r-place" />

// RadioCard — pill estilo segmentado (layout flex/grid no container)
<div className="flex gap-2">
  <RadioCard name="visibilidade" value="public" label="Pública" id="rc-public"
    icon={<Globe size={16} />} />
  <RadioCard name="visibilidade" value="private" label="Privada" id="rc-private"
    icon={<Lock size={16} />} />
</div>
```

`Radio` props: `label` · `description` · `wrapperClassName` · todos `HTMLInputElement` attrs.
`RadioCard` props: `label` · `icon?: ReactNode` · `wrapperClassName` · todos `HTMLInputElement` attrs.

---

## FormField

Padroniza layout de label + campo + mensagem de erro/hint. Envolver qualquer input, select ou campo customizado.

```tsx
// Básico
<FormField label="Nome" htmlFor="name">
  <Input id="name" placeholder="Kael" />
</FormField>

// Com hint
<FormField label="Handle" hint="Usado nas @menções. Sem espaços." htmlFor="handle">
  <Input id="handle" mono placeholder="@kael" />
</FormField>

// Com erro — passar error ao FormField E ao Input filho
<FormField label="Email" error="Email inválido" htmlFor="email">
  <Input id="email" error />
</FormField>

// Obrigatório
<FormField label="Título" required htmlFor="title">
  <Input id="title" />
</FormField>
```

Props: `label` · `hint` · `error` · `required` · `htmlFor` · `children` · `className`

> ⚠️ `FormField` controla só layout e mensagens. Passar `error` também ao filho para aplicar estilo vermelho no campo.

---

## Badge

```tsx
<Badge entity="character" />                    // "Personagem" com ícone UserRound
<Badge entity="place" size="sm" />              // compacto
<Badge entity="faction" label="Aliado" />       // label customizado
<Badge entity="event" showIcon={false} />       // sem ícone
```

Props: `entity: EntityType` · `size?: "sm"|"md"` · `showIcon?: boolean` · `label?: string`

Tipos de entidade: `character` · `place` · `faction` · `item` · `creature` · `event`

---

## Mention

Token inline em textos e artigos:

```tsx
<Mention entity="character">@Kael.idade</Mention>
<Mention entity="character" resolved="32">@Kael.idade</Mention>  // exibe "= 32"
<Mention entity="place" flash>@Eldor</Mention>                   // animate-mention-flash ao atualizar
```

Props: `entity?: EntityType` · `resolved?: ReactNode` · `flash?: boolean`

---

## MentionInput

Editor com autocomplete de @menções. O componente gerencia UI — a busca e resolução ficam no app.

```tsx
function ArticleEditor() {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState<MentionSuggestion[]>([])

  return (
    <MentionInput
      value={value}
      onChange={setValue}
      onMentionQuery={(query) => {
        if (query.startsWith('create:')) {
          // abrir modal de criação
          return
        }
        setSuggestions(searchEntities(query))
      }}
      suggestions={suggestions}
      suggestionsLoading={isLoading}
      resolvedValues={{
        'kael-id': { idade: '32', cidade: 'Eldor' },
      }}
      placeholder="Digite @ para mencionar uma entidade…"
    />
  )
}
```

### Formato do valor bruto
```
Texto livre [[id]] e [[id:campo]] no texto.

// [[kael-id]]          → @kael (sem campo)
// [[kael-id:idade]]    → @kael.idade (com campo)
```

### Props
| Prop | Tipo | Descrição |
|---|---|---|
| `value` | `string` | Valor bruto com tokens `[[id:campo]]` |
| `onChange` | `(raw: string) => void` | Emite valor bruto a cada mudança |
| `onMentionQuery` | `(query: string) => void` | Chamado ao digitar `@xxx`. Prefixo `create:` = criar nova entidade |
| `suggestions` | `MentionSuggestion[]` | Sugestões vindas do app |
| `suggestionsLoading` | `boolean` | Estado de loading no dropdown |
| `resolvedValues` | `Record<string, Record<string, string>>` | Mapa `id → { campo → valor }` |
| `error` · `disabled` | `boolean` | Estados visuais |

### Teclado
`@` abre dropdown · `↑↓` navega · `Enter/Tab` seleciona · `Escape` fecha

### Tipo MentionSuggestion
```ts
interface MentionSuggestion {
  id: string
  handle: string
  name: string
  entityType: EntityType
  fields?: string[]   // campos disponíveis para @handle.campo
}
```

---

## EntityCard

```tsx
<EntityCard
  name="Kael"
  handle="@kael"
  entity="character"
  fields={[
    { label: 'Idade', value: '32' },
    { label: 'Raça', value: 'Humano' },
    { label: 'Cidade natal', value: 'Eldor', span: true }, // ocupa 2 colunas
  ]}
  articleCount={4}
  backlinkCount={12}
  glassMagic={false}  // efeito glass desabilitado; true por padrão
/>
```

Props: `name` · `handle` · `entity: EntityType` · `fields?: EntityField[]` · `articleCount?` · `backlinkCount?` · `glassMagic?: boolean`

```ts
interface EntityField {
  label: string
  value: React.ReactNode
  span?: boolean  // true = col-span-2
}
```

---

## Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Kael</CardTitle>
    <CardDescription>Guerreiro de Eldor</CardDescription>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter>…</CardFooter>
</Card>

<Card glassMagic>…</Card>   // brilho cyan/violet no hover (nex-glass-magic)
<Card elevated>…</Card>     // bg-nex-bg-elevated + shadow-elevation-2
```

Props do `Card`: `glassMagic?: boolean` · `elevated?: boolean`

---

## Modal

Baseado em **Radix UI Dialog** — focus trap automático, Escape fecha, Portal sem z-index problems.

```tsx
<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Criar entidade"
  description="Preencha os dados abaixo."
  size="md"
  footer={
    <>
      <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancelar</Button>
      <Button variant="gradient">Criar</Button>
    </>
  }
>
  {/* conteúdo entre description e footer */}
</Modal>
```

Props: `open` · `onClose` · `title?` · `description?` · `children?` · `footer?` · `size?: "sm"|"md"|"lg"` · `className`

Mobile: Sempre abrir em tamanho quase-tela em 375px — o Modal centraliza via `fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`. Sobrescrever `className` para comportamento mobile diferente se necessário.

---

## NavItem

Renderiza `<button>` quando tem `onClick`, ou `<a>` quando tem `href`. Ambos focáveis via Tab.

```tsx
<NavItem
  icon={<UserRound size={16} />}
  label="Personagens"
  count={24}
  iconColor="#8B5CF6"
  active
  onClick={() => navigate('characters')}
/>

<NavItem
  icon={<MapPin size={16} />}
  label="Locais"
  href="/locais"
/>
```

Props: `icon?` · `label` · `count?` · `iconColor?` · `active?` · `href?` · `onClick`

---

## Sidebar

```tsx
<Sidebar
  activeSection="characters"
  onSectionChange={(s) => navigate(s)}
  universe={{ name: 'Aetheria', entityCount: 51 }}
  user={{ name: 'João Silva', initials: 'JS', plan: 'Pro' }}
  counts={{ characters: 24, places: 12, articles: 18 }}
  onAddEntity={openEntityModal}
  onUniverseClick={openUniversePicker}
  onSettingsClick={openSettings}
/>
```

`SidebarSection` type: `"home" | "articles" | "search" | "ai" | "characters" | "places" | "factions" | "items" | "creatures" | "events"`

---

## Toast

```tsx
<Toast variant="success" title="Salvo" description="Alterações salvas." />
<Toast
  variant="error"
  title="Erro"
  description="Verifique sua conexão."
  action={<Button variant="ghost" size="sm">Tentar novamente</Button>}
  onClose={() => dismiss()}
/>
```

Props: `variant?: "default"|"success"|"warning"|"error"|"info"|"brand"` · `title` · `description?` · `action?` · `onClose?` · `icon?`

---

## Avatar

```tsx
<Avatar initials="JS" size={32} />
<Avatar initials="NC" size={40} glow />  // shadow-glow-brand
```

Props: `initials` · `size?: number` (default 28) · `glow?: boolean`

---

## cn — utilitário de merge de classes

```ts
import { cn } from '@nexus-creator-app/design-system'

<div className={cn('base-class', isActive && 'active-class', className)} />
```

Combina `clsx` + `tailwind-merge`. Usar sempre para merge de classes condicionais.
