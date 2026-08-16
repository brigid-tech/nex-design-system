---
name: nexus-design-system
description: "Referência completa do pacote @nexus-creator-app/design-system na ótica de quem CONSTRÓI e mantém o DS (repo nex-design-system). Use este skill sempre que a conversa envolver: criar ou modificar componentes do DS, decidir a API pública de um componente, decidir se algo pertence ao DS ou ao app consumidor, revisar código de componentes existentes, mexer em tokens, preset ou barrels, ou discutir versionamento e quebra de API. Acionar mesmo que o usuário não mencione 'design system' explicitamente — qualquer menção a 'componente', 'token', 'API pública', 'botão', 'modal', 'cor da marca' ou 'identidade visual' neste repo já justifica a consulta."
---

# Nexus Creator — Design System (ótica do autor)

Repo `nex-design-system` → pacote `@nexus-creator-app/design-system`.
Dark-first, gradiente cyan → violet, arcane editorial.
Tailwind CSS v3 + React 18 (peer `>=18`) + TypeScript strict. Build: tsup. Publicado no GitHub Packages.

> Este é o **repo do próprio DS** — você está autorando o pacote, não consumindo.
> Toda mudança aqui afeta TODOS os apps consumidores (editor, landing, admin, mobile)
> ao mesmo tempo. Quebra de API pública ou regressão visual é incidente.

> **Arquivos de referência:**
> - `references/components.md` — API completa de cada componente (baseada no código real)
> - `references/tokens.md` — tokens de cor, tipografia, sombra, motion (valores reais)
> - `references/patterns.md` — composição, mobile-first, design-first, acessibilidade

> **Skills irmãs:** `nexus-ds-component` (passo a passo de criar componente),
> `nexus-tokens` (sistema de tokens), `nexus-storybook` (stories),
> `nexus-a11y` (acessibilidade + Radix), `nexus-release` (versão + publish).

---

## Comandos do repo

```bash
npm run build        # tsup — gera dist/ (ESM + CJS + .d.ts)
npm run typecheck    # tsc --noEmit
npm run lint         # eslint src/
npm run dev          # playground local
npm run storybook    # Storybook na porta 6006
```

**Antes de qualquer commit:** `npm run lint && npm run typecheck && npm run build` sem erros nem warnings.

---

## Estrutura do pacote

```
src/
  components/<Nome>/   Nome.tsx + Nome.stories.tsx + index.ts (barrel do componente)
  components/index.ts  Barrel de todos os componentes
  tokens/              colors.ts, typography.ts, spacing.ts, motion.ts, shadows.ts, index.ts
  styles/              globals.css (--nex-* + animações), fonts.css
  lib/cn.ts            clsx + tailwind-merge
  preset.ts            Tailwind preset exportável (consumido pelos apps)
  index.ts             Barrel principal do pacote
```

**Exports do package.json:** `.` · `./styles` · `./fonts` · `./preset` · `./tokens`.
Qualquer mudança nesses entrypoints é potencial breaking change.

---

## Componentes que EXISTEM (não recriar)

`Avatar` · `Badge` · `Button` · `Card` (+ Header/Title/Description/Content/Footer) ·
`Checkbox` · `EntityCard` · `FormField` · `Input` (+ `InputShell` / `InputAffix`) ·
`Mention` · `MentionInput` · `Modal` · `NavItem` · `Radio` (+ `RadioCard`) ·
`Select` (+ `SelectItem`) · `Sidebar` · `Textarea` · `Toast`.

Antes de criar qualquer coisa: confira se já existe e se uma prop nova resolve.
→ API detalhada de cada um em `references/components.md`.

---

## O que pertence ao DS vs ao app consumidor

| ✅ Pertence ao DS | ❌ Vai no app |
|---|---|
| Componentes React puros (sem efeitos colaterais) | Validação de formulário (RHF + Zod) |
| Tokens visuais (cor, tipo, espaço, sombra, motion) | Chamadas HTTP / fetch / `apiClient` |
| Estados visuais (error, loading, disabled, active) | Estado global (Zustand, Context com lógica) |
| Animações e transições CSS | Roteamento, i18n, auth |
| Utilitário `cn` e o preset Tailwind | Lógica de negócio do Nexus Creator |
| Stories do Storybook | Busca de entidades para @menções |

Se você se pegar escrevendo `useEffect` com fetch, importando uma store Zustand
ou um `useQuery` dentro de um componente do DS — **pare**. Isso é do app.

---

## Regras do componente (não negociáveis)

- `React.forwardRef` sempre — apps precisam de ref para foco/animação
- `displayName` sempre — aparece no DevTools e no Storybook
- `cn()` para mesclar classes — nunca concatenação de string
- CVA para variantes — nunca ternários longos de className
- Props HTML do elemento base em `...props` — não bloqueie atributos nativos
- Cores só via classes `nex-*` ou tokens TS — nunca hardcode (`#8B5CF6`, `bg-white`)
- Acessibilidade: foco por teclado, label acessível, `focus-visible:ring`
- Componente complexo usa primitiva Radix (Modal→dialog, Select→select, etc.)

→ Passo a passo completo de autoria em `nexus-ds-component`.

---

## MentionInput — atenção especial

Componente mais complexo e estratégico do produto.
- Detecta `@`, mostra dropdown, insere tokens coloridos por tipo de entidade
- Emite valor bruto `[[id]]` / `[[id:campo]]` via `onChange`
- **NÃO** busca entidades, **NÃO** resolve valores, **NÃO** valida — recebe
  `suggestions`, `onMentionQuery` e `resolvedValues` do app. O DS só renderiza e
  aplica o flash quando o valor muda.

---

## Versionamento — resumo

Semver via tag. Adição de prop/componente/token = **minor**. Remoção/renomeação
de qualquer coisa exportada = **major** (evitar ao máximo).
→ Fluxo completo em `nexus-release`.
