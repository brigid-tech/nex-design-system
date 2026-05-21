# @nexus-creator-app/design-system

Design system oficial do Nexus Creator — dark-first, cyan↔violeta, arcane editorial.
Compatível com **Tailwind CSS v3** e **shadcn/ui**.

---

## Instalação

### Pré-requisito — autenticar com GitHub Packages

Crie um arquivo `.npmrc` na **raiz de cada projeto** que for consumir este pacote:

```ini
@nexus-creator-app:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=SEU_PERSONAL_ACCESS_TOKEN
```

> Gere o token em: **GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)**
> Permissão necessária: `read:packages`
>
> Em CI/CD (Vercel, GitHub Actions, etc.) injete o token via secret/env var `NODE_AUTH_TOKEN`.

### Instalar o pacote

```bash
npm install @nexus-creator-app/design-system
# ou
pnpm add @nexus-creator-app/design-system
```

> **Peer dependencies:** `react >= 18`, `react-dom >= 18`, `tailwindcss >= 3.4`

---

## Setup

### 1 — CSS global (uma vez no root da app)

```ts
// src/main.tsx ou src/app/layout.tsx
import '@nexus-creator-app/design-system/styles';
```

Isso injeta as **CSS custom properties** (`--nex-*`) e as fontes (Cinzel, Inter, JetBrains Mono).

### 2 — Tailwind preset

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import nexPreset from '@nexus-creator-app/design-system/preset';

const config: Config = {
  presets: [nexPreset],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@nexus-creator-app/design-system/dist/**/*.js',
  ],
};

export default config;
```

O preset adiciona ao Tailwind todas as cores, fontes, espaçamentos, sombras e animações da marca.

---

## Componentes disponíveis

```tsx
import {
  // Primitivos de formulário
  Button,
  Input,
  Textarea,
  Select, SelectItem,
  Checkbox,
  Radio,
  FormField,

  // Conteúdo rico
  MentionInput,
  Mention,
  Badge,

  // Layout e navegação
  Card, CardHeader, CardTitle, CardContent, CardFooter,
  EntityCard,
  Avatar,
  Sidebar,
  NavItem,

  // Feedback
  Toast,
  Modal,
} from '@nexus-creator-app/design-system';
```

---

## Referência dos componentes

### Button

```tsx
<Button variant="gradient">Entrar no beta</Button>
<Button variant="cyan" size="sm" loading>Salvando…</Button>
<Button variant="secondary">Cancelar</Button>
<Button variant="ghost">Ver mais</Button>
<Button variant="destructive">Excluir entidade</Button>
<Button variant="outline-cyan">Publicar wiki</Button>
<Button noRipple>Sem ripple</Button>
```

**Variantes:** `gradient` | `magic` | `cyan` | `violet` | `gold` | `success` | `warning` | `error` | `info` | `secondary` | `ghost` | `destructive` | `outline-cyan` | `outline-violet` | `outline-gold` | `outline-success` | `outline-warning` | `outline-error` | `outline-info`

**Tamanhos:** `sm` | `md` | `lg` | `icon` | `icon-sm`

**Efeito ripple:** O ripple adapta automaticamente ao contexto visual do botão:
- **Dark** (overlay preto) — botões com fundo colorido sólido (`gradient`, `cyan`, `success`, etc.)
- **Light** (wash branco sutil) — botões neutros/transparentes (`secondary`, `ghost`)
- **Color** (cor da borda com baixa opacidade) — botões outlined e `destructive`

Use `noRipple` para desabilitar.

---

### Input / Textarea

```tsx
<Input placeholder="Nome da entidade" />
<Input error placeholder="Email inválido" />
<Input mono placeholder="@kael.idade" />

<Textarea placeholder="Descrição do personagem…" />
```

---

### Select + SelectItem

O `Select` usa **Radix UI** internamente — estilos consistentes em todos os browsers, navegação por teclado completa e acessibilidade gerenciada.

```tsx
<Select placeholder="Tipo de entidade" onValueChange={setTipo}>
  <SelectItem value="character">Personagem</SelectItem>
  <SelectItem value="place">Local</SelectItem>
  <SelectItem value="faction">Facção</SelectItem>
  <SelectItem value="item" disabled>Item (indisponível)</SelectItem>
</Select>

// Com value controlado
<Select value={tipo} onValueChange={setTipo} error>
  <SelectItem value="creature">Criatura</SelectItem>
</Select>
```

> **Nota:** A API mudou de `<select>` nativo para `SelectItem` filhos. Atualize os consumidores ao fazer upgrade.

---

### FormField

`FormField` padroniza o layout de label + campo + mensagem de erro/hint. Use-o para envolver qualquer `Input`, `Select` ou campo customizado.

```tsx
// Básico
<FormField label="Nome do personagem" htmlFor="name">
  <Input id="name" placeholder="Kael" />
</FormField>

// Com hint
<FormField label="Handle" hint="Usado nas @menções. Sem espaços." htmlFor="handle">
  <Input id="handle" mono placeholder="@kael" />
</FormField>

// Com erro
<FormField label="Email" error="Email inválido" htmlFor="email">
  <Input id="email" error />
</FormField>

// Obrigatório
<FormField label="Título" required htmlFor="title">
  <Input id="title" />
</FormField>
```

**Props:**

| Prop | Tipo | Descrição |
|---|---|---|
| `label` | `string` | Texto do label acima do campo |
| `htmlFor` | `string` | `id` do input — torna o label clicável |
| `required` | `boolean` | Adiciona asterisco vermelho ao label |
| `hint` | `string` | Texto de ajuda exibido abaixo (quando não há erro) |
| `error` | `string` | Mensagem de erro com ícone (suprime o hint) |

> **Importante:** `FormField` controla apenas layout e mensagens. Passe `error` também ao `Input`/`Select` filho para aplicar o estilo vermelho no campo.

---

### MentionInput

Campo de texto com autocomplete de `@menções`. O componente gerencia a UI do autocomplete e os tokens visuais — a busca e a resolução de valores ficam no app consumidor.

```tsx
function ArticleEditor() {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState<MentionSuggestion[]>([])

  const handleQuery = (query: string) => {
    if (query.startsWith('create:')) {
      // abrir modal de criação com query.slice(7)
      return
    }
    // buscar entidades via TanStack Query, passar resultado para suggestions
    setSuggestions(searchEntities(query))
  }

  return (
    <MentionInput
      value={value}
      onChange={setValue}
      onMentionQuery={handleQuery}
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

**Formato do valor bruto** (para `value` e `onChange`):

```
Texto normal [[kael-id:idade]] mora em [[eldor-id]].
```

- `[[id]]` — menção sem campo
- `[[id:campo]]` — menção com campo (`@kael.idade`)

**Interação por teclado:**

| Tecla | Ação |
|---|---|
| `@` | Abre o dropdown de autocomplete |
| `↑` / `↓` | Navega entre sugestões |
| `Enter` / `Tab` | Seleciona sugestão em foco |
| `Escape` | Fecha o dropdown |

**Props principais:**

| Prop | Tipo | Descrição |
|---|---|---|
| `value` | `string` | Valor bruto com tokens `[[id:campo]]` |
| `onChange` | `(raw: string) => void` | Emite o valor bruto a cada mudança |
| `onMentionQuery` | `(query: string) => void` | Chamado ao digitar `@xxx`. Prefixo `create:` indica opção de criar |
| `suggestions` | `MentionSuggestion[]` | Lista de sugestões vindas do app |
| `suggestionsLoading` | `boolean` | Exibe estado de loading no dropdown |
| `resolvedValues` | `Record<string, Record<string, string>>` | Mapa de `id → { campo → valor }` para exibir `= valor` nos tokens |
| `error` / `disabled` | `boolean` | Estados visuais do campo |

> **O que o MentionInput NÃO faz:** não busca entidades, não resolve valores, não persiste estado. Toda lógica de dados fica no app (ex: TanStack Query).

---

### Badge

```tsx
<Badge entity="character" />          // Personagem
<Badge entity="place" size="sm" />    // Local (compacto)
<Badge entity="faction" label="Inimigo" />
```

**Tipos:** `character` | `place` | `faction` | `item` | `creature` | `event`

---

### Mention

Token inline de menção, usado dentro de textos e pelo `MentionInput`.

```tsx
<Mention entity="character">@Kael.idade</Mention>
<Mention entity="place" resolved="Eldor">@Kael.cidade</Mention>
<Mention entity="faction" flash>@OrdemDoVeu</Mention>
```

---

### Modal

O `Modal` usa **Radix UI Dialog** — focus trap automático, fechamento com Escape, renderização via Portal (sem problemas de z-index) e acessibilidade por screen reader gerenciadas pelo Radix.

```tsx
<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Excluir entidade"
  description="Essa ação não pode ser desfeita. Todos os backlinks serão quebrados."
  size="md"
  footer={
    <>
      <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancelar</Button>
      <Button variant="destructive">Excluir</Button>
    </>
  }
>
  {/* conteúdo opcional entre description e footer */}
</Modal>
```

**Tamanhos:** `sm` | `md` | `lg`

---

### NavItem

Navegação lateral semântica — renderiza `<button>` quando tem `onClick`, ou `<a>` quando tem `href`. Ambos são focáveis via Tab e ativam com Enter/Space.

```tsx
// Como botão (navegação via estado/roteador)
<NavItem
  icon={<UserRound size={16} />}
  label="Personagens"
  count={24}
  iconColor="#8B5CF6"
  active
  onClick={() => navigate('characters')}
/>

// Como link
<NavItem
  icon={<MapPin size={16} />}
  label="Locais"
  href="/locais"
/>
```

---

### Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Kael</CardTitle>
    <CardDescription>Guerreiro de Eldor</CardDescription>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter>…</CardFooter>
</Card>

<Card glassMagic>…</Card>
<Card elevated>…</Card>
```

---

### EntityCard

```tsx
<EntityCard
  name="Kael"
  handle="@kael"
  entity="character"
  fields={[
    { label: 'Idade', value: '32' },
    { label: 'Raça', value: 'Humano' },
    { label: 'Nascimento', value: 'Eldor', span: true },
  ]}
  articleCount={4}
  backlinkCount={12}
/>
```

---

### Toast

```tsx
<Toast
  variant="success"
  title="Entidade criada"
  description="@Kael foi adicionada a Aetheria."
  action={<Button variant="ghost" size="sm">Abrir</Button>}
  onClose={() => {}}
/>
```

**Variantes:** `default` | `success` | `warning` | `error` | `info` | `brand`

---

### Avatar

```tsx
<Avatar initials="JS" size={32} />
<Avatar initials="NC" size={40} glow />
```

---

### Sidebar

```tsx
<Sidebar
  activeSection="characters"
  onSectionChange={(s) => navigate(s)}
  universe={{ name: 'Aetheria', entityCount: 51 }}
  user={{ name: 'João Silva', initials: 'JS', plan: 'Pro' }}
  counts={{ characters: 24, places: 12, articles: 18 }}
  onAddEntity={() => openEntityModal()}
/>
```

---

## Acessibilidade

Componentes interativos complexos usam **Radix UI** para gerenciar acessibilidade:

| Componente | Primitiva | O que o Radix gerencia |
|---|---|---|
| `Modal` | `@radix-ui/react-dialog` | Focus trap, Escape, `aria-modal`, `aria-labelledby` |
| `Select` / `SelectItem` | `@radix-ui/react-select` | Navegação por teclado, `aria-expanded`, `aria-selected` |

Todos os componentes interativos seguem as regras:
- Focáveis via Tab (`<button>` ou `<a>`, nunca `<div>` com `onClick`)
- Anel de foco visível: `focus-visible:ring-2 focus-visible:ring-nex-brand-cyan`
- Estados comunicados via `aria-disabled`, `aria-expanded`, etc.

---

## Storybook

Para rodar o catálogo de componentes localmente:

```bash
npm run storybook        # abre em http://localhost:6006
npm run build-storybook  # gera build estático em storybook-static/
```

Cada componente tem uma story cobrindo todos os estados visuais relevantes. O Storybook roda com fundo dark (`#0A0B0F`) e o addon de acessibilidade (`@storybook/addon-a11y`) habilitado.

---

## Tokens

```ts
import {
  colors,
  fontFamily,
  fontSize,
  spacing,
  borderRadius,
  boxShadow,
  animation,
} from '@nexus-creator-app/design-system/tokens';

colors.brand.cyan              // '#00D4FF'
colors.entity.character.DEFAULT // '#8B5CF6'
colors.entity.place.bg         // 'rgba(16,185,129,0.15)'
```

---

## Utilitário `cn`

```ts
import { cn } from '@nexus-creator-app/design-system';

<div className={cn('base-class', isActive && 'active-class', className)} />
```

---

## Classes Tailwind da marca

Com o preset ativo você tem acesso a:

| Classe | Valor |
|---|---|
| `bg-nex-bg-primary` | `#0A0B0F` |
| `bg-nex-bg-secondary` | `#111318` |
| `bg-nex-bg-elevated` | `#1A1D26` |
| `text-nex-text-primary` | `#F0F2F8` |
| `text-nex-text-secondary` | `#8B90A0` |
| `text-nex-brand-cyan` | `#00D4FF` |
| `text-nex-brand-violet` | `#8B5CF6` |
| `text-nex-entity-character` | `#8B5CF6` |
| `text-nex-entity-place` | `#10B981` |
| `text-nex-entity-faction` | `#F59E0B` |
| `font-display` | `Cinzel, Georgia, serif` |
| `font-mono` | `JetBrains Mono, ...` |
| `rounded-md` | `8px` |
| `shadow-elevation-4` | sombra modal profunda |
| `shadow-glow-cyan` | glow ciano |
| `shadow-focus-cyan` | anel de foco ciano |
| `animate-glow-pulse` | breathing glow 3s |
| `animate-mention-flash` | flash 300ms de mention |
| `animate-in` / `animate-out` | entrada/saída suave (Radix) |

---

## O que pertence a este pacote

### ✅ Pertence ao DS
- Componentes React puros (sem efeitos colaterais)
- Tokens de design (cores, tipografia, espaçamento, motion, sombras)
- Estados visuais (error, loading, disabled, active)
- Animações e transições CSS
- Utilitários de composição (`cn`)
- Preset Tailwind + `tailwindcss-animate`
- Stories do Storybook

### ❌ Não pertence ao DS
- Validação de formulário → use **React Hook Form + Zod** nos apps
- Chamadas de API / fetch → use **TanStack Query** nos apps
- Estado global (Zustand, Context com lógica)
- Roteamento, i18n, autenticação
- Lógica de negócio específica do Nexus Creator

---

## Publicando novas versões

A publicação é **automática via GitHub Actions** ao criar uma tag de versão:

```bash
npm version patch   # ou minor / major
git push && git push --tags
```

O workflow `.github/workflows/publish.yml` dispara na tag, faz o build e publica no GitHub Packages usando o `GITHUB_TOKEN` do Actions.

> **Semver:** qualquer remoção ou renomeação de prop/componente/token exportado é breaking change → `major`. Adição retrocompatível → `minor`.

---

## CI

O workflow `.github/workflows/ci.yml` roda em todo PR e push para `main`:
- Type check (`tsc --noEmit`)
- Build (`tsup`)

---

## Estrutura do pacote

```
src/
  tokens/              Design tokens como objetos TypeScript
  styles/              globals.css (CSS vars + animações) + fonts.css
  components/          Um diretório por componente
    ComponentName/
      ComponentName.tsx
      ComponentName.stories.tsx
      index.ts
    index.ts           Barrel de todos os componentes
  lib/cn.ts            Utilitário clsx + tailwind-merge
  preset.ts            Tailwind preset exportável
  index.ts             Barrel principal do pacote
```
