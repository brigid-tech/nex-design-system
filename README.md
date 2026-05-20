# @nexus-creator/design-system

Design system oficial do Nexus Creator — dark-first, cyan↔violeta, arcane editorial.
Compatível com **Tailwind CSS v3** e **shadcn/ui**.

---

## Instalação

```bash
npm install @nexus-creator/design-system
# ou
pnpm add @nexus-creator/design-system
```

> **Peer dependencies:** `react >= 18`, `react-dom >= 18`, `tailwindcss >= 3.4`

---

## Setup

### 1 — CSS global (uma vez no root da app)

```ts
// src/main.tsx ou src/app/layout.tsx
import '@nexus-creator/design-system/styles';
```

Isso injeta as **CSS custom properties** (`--nex-*`) e as fontes (Cinzel, Inter, JetBrains Mono).

### 2 — Tailwind preset

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import nexPreset from '@nexus-creator/design-system/preset';

const config: Config = {
  presets: [nexPreset],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@nexus-creator/design-system/dist/**/*.js',
  ],
};

export default config;
```

O preset adiciona ao Tailwind todas as cores, fontes, espaçamentos, sombras e animações da marca.

---

## Uso dos componentes

```tsx
import {
  Button,
  Input,
  Textarea,
  Select,
  Badge,
  Mention,
  Card, CardHeader, CardTitle, CardContent, CardFooter,
  EntityCard,
  Toast,
  Modal,
  Avatar,
  Sidebar,
  NavItem,
} from '@nexus-creator/design-system';
```

### Button

```tsx
<Button variant="gradient">Entrar no beta</Button>
<Button variant="cyan" size="sm" loading>Salvando…</Button>
<Button variant="secondary">Cancelar</Button>
<Button variant="ghost">Ver mais</Button>
<Button variant="destructive">Excluir entidade</Button>
<Button variant="outline-cyan">Publicar wiki</Button>
```

**Variantes:** `gradient` | `magic` | `cyan` | `violet` | `success` | `warning` | `error` | `info` | `secondary` | `ghost` | `destructive` | `outline-cyan` | `outline-violet`

**Tamanhos:** `sm` | `md` | `lg` | `icon` | `icon-sm`

### Input / Textarea / Select

```tsx
<Input placeholder="Nome da entidade" />
<Input error placeholder="Email inválido" />
<Input mono placeholder="@kael.idade" />

<Textarea placeholder="Descrição do personagem…" />

<Select>
  <option>Personagem</option>
  <option>Local</option>
</Select>
```

### Badge (tipo de entidade)

```tsx
<Badge entity="character" />          // Personagem
<Badge entity="place" size="sm" />    // Local (compacto)
<Badge entity="faction" label="Inimigo" /> // label customizado
```

**Tipos:** `character` | `place` | `faction` | `item` | `creature` | `event`

### Mention

```tsx
<Mention entity="character">@Kael.idade</Mention>
<Mention entity="place" resolved="Eldor">@Kael.cidade</Mention>
<Mention entity="faction" flash>@OrdemDoVeu</Mention>
```

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

### EntityCard

```tsx
<EntityCard
  name="Kael"
  handle="@kael"
  entity="character"
  fields={[
    { label: 'Idade', value: '32' },
    { label: 'Raça', value: 'Humano' },
    { label: 'Nascimento', value: '@Cidades.Eldor', span: true },
  ]}
  articleCount={4}
  backlinkCount={12}
/>
```

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

### Modal

```tsx
<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Excluir entidade"
  description="Essa ação não pode ser desfeita. Todos os backlinks serão quebrados."
  footer={
    <>
      <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancelar</Button>
      <Button variant="destructive">Excluir</Button>
    </>
  }
/>
```

### Avatar

```tsx
<Avatar initials="JS" size={32} />
<Avatar initials="NC" size={40} glow />
```

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

## Tokens

```ts
import { colors, fontFamily, fontSize, spacing, borderRadius, boxShadow } from '@nexus-creator/design-system/tokens';

colors.brand.cyan   // '#00D4FF'
colors.entity.character.DEFAULT // '#8B5CF6'
```

---

## Utilitário `cn`

```ts
import { cn } from '@nexus-creator/design-system';

<div className={cn('base-class', isActive && 'active-class', className)} />
```

---

## Classes Tailwind da marca

Com o preset ativo você tem acesso a:

| Classe                     | Valor                        |
| -------------------------- | ---------------------------- |
| `bg-nex-bg-primary`        | `#0A0B0F`                    |
| `bg-nex-bg-secondary`      | `#111318`                    |
| `bg-nex-bg-elevated`       | `#1A1D26`                    |
| `text-nex-text-primary`    | `#F0F2F8`                    |
| `text-nex-brand-cyan`      | `#00D4FF`                    |
| `text-nex-brand-violet`    | `#8B5CF6`                    |
| `text-nex-entity-character`| `#8B5CF6`                    |
| `font-display`             | `Cinzel, Georgia, serif`     |
| `font-mono`                | `JetBrains Mono, ...`        |
| `rounded-md`               | `8px`                        |
| `shadow-elevation-4`       | sombra modal profunda        |
| `shadow-glow-cyan`         | glow ciano                   |
| `animate-glow-pulse`       | breathing glow 3s            |
| `animate-mention-flash`    | flash 300ms de mention       |

---

## Publicando atualizações

```bash
# Bumpar a versão
npm version patch   # ou minor/major

# Buildar
npm run build

# Publicar no registry
npm publish --access public
```

---

## Estrutura do pacote

```
src/
  tokens/         Design tokens como objetos TypeScript
  styles/         globals.css (CSS vars) + fonts.css
  components/     Componentes React com Tailwind + CVA
  lib/cn.ts       Utilitário clsx + tailwind-merge
  preset.ts       Tailwind preset exportável
  index.ts        Barrel export principal
```
