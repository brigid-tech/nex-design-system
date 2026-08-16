# Tokens — Valores Reais do Design System

Baseado em `src/tokens/` e `src/styles/globals.css`. Importar via:

```ts
import { colors, fontFamily, fontSize, boxShadow, animation } from '@brigid-tech/design-system/tokens'
```

---

## Cores — CSS custom properties e classes Tailwind

### Backgrounds
| Classe Tailwind | CSS Var | Valor |
|---|---|---|
| `bg-nex-bg-primary` | `--nex-bg-primary` | `#0A0B0F` |
| `bg-nex-bg-secondary` | `--nex-bg-secondary` | `#111318` |
| `bg-nex-bg-elevated` | `--nex-bg-elevated` | `#1A1D26` |
| `bg-nex-bg-hover` | `--nex-bg-hover` | `#1F2330` |

### Bordas
| Classe | CSS Var | Valor |
|---|---|---|
| `border-nex-border-subtle` | `--nex-border-subtle` | `rgba(255,255,255, 0.06)` |
| `border-nex-border-default` | `--nex-border-default` | `rgba(255,255,255, 0.10)` |
| `border-nex-border-strong` | `--nex-border-strong` | `rgba(255,255,255, 0.18)` |

### Texto
| Classe | CSS Var | Valor |
|---|---|---|
| `text-nex-text-primary` | `--nex-text-primary` | `#F0F2F8` |
| `text-nex-text-secondary` | `--nex-text-secondary` | `#8B90A0` |
| `text-nex-text-tertiary` | `--nex-text-tertiary` | `#52566A` |
| `text-nex-text-inverted` | `--nex-text-inverted` | `#0A0B0F` |

### Marca
| Classe | CSS Var | Valor |
|---|---|---|
| `text-nex-brand-cyan` / `bg-nex-brand-cyan` | `--nex-brand-cyan` | `#00D4FF` |
| `text-nex-brand-violet` / `bg-nex-brand-violet` | `--nex-brand-violet` | `#8B5CF6` |
| `text-nex-brand-gold` / `bg-nex-brand-gold` | `--nex-brand-gold` | `hsl(45, 80%, 55%)` |
| — | `--nex-brand-gradient` | `linear-gradient(135deg, #00D4FF, #8B5CF6)` |
| — | `--nex-brand-magic` | `linear-gradient(135deg, violet, cyan, gold)` |

### Semânticos
| Classe | CSS Var | Valor |
|---|---|---|
| `text-nex-success` / `bg-nex-success` | `--nex-success` | `#10B981` |
| `text-nex-warning` / `bg-nex-warning` | `--nex-warning` | `#F59E0B` |
| `text-nex-error` / `bg-nex-error` | `--nex-error` | `#EF4444` |
| `text-nex-info` / `bg-nex-info` | `--nex-info` | `#3B82F6` |

---

## Paleta de entidades

Cada EntityType tem 5 variantes. Usar as classes `nex-entity-*`:

| EntityType | DEFAULT | bg (15%) | bgHover (28%) | border (40%) | borderHover (65%) |
|---|---|---|---|---|---|
| `character` | `#8B5CF6` | `rgba(139,92,246,0.15)` | `rgba(139,92,246,0.28)` | `rgba(139,92,246,0.40)` | `rgba(139,92,246,0.65)` |
| `place` | `#10B981` | `rgba(16,185,129,0.15)` | `rgba(16,185,129,0.28)` | `rgba(16,185,129,0.40)` | `rgba(16,185,129,0.65)` |
| `faction` | `#F59E0B` | `rgba(245,158,11,0.15)` | `rgba(245,158,11,0.28)` | `rgba(245,158,11,0.40)` | `rgba(245,158,11,0.65)` |
| `item` | `#3B82F6` | `rgba(59,130,246,0.15)` | `rgba(59,130,246,0.28)` | `rgba(59,130,246,0.40)` | `rgba(59,130,246,0.65)` |
| `creature` | `#EF4444` | `rgba(239,68,68,0.15)` | `rgba(239,68,68,0.28)` | `rgba(239,68,68,0.40)` | `rgba(239,68,68,0.65)` |
| `event` | `#EC4899` | `rgba(236,72,153,0.15)` | `rgba(236,72,153,0.28)` | `rgba(236,72,153,0.40)` | `rgba(236,72,153,0.65)` |

```tsx
// Classes Tailwind
text-nex-entity-character  // #8B5CF6
text-nex-entity-place      // #10B981
// etc.

// Inline styles quando Tailwind não suporta (ex: em SVG ou spans de mention)
const colors = {
  character: { color: '#8B5CF6', bg: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.4)' },
  // ...
}
```

---

## Tipografia

### Font families
| Classe | Fonte | Uso |
|---|---|---|
| `font-display` | Cinzel, Georgia, serif | Títulos épicos, display, nomes de entidade |
| `font-ui` | Inter, system-ui, sans-serif | Corpo, labels, UI geral |
| `font-mono` | JetBrains Mono, SF Mono, monospace | Código, @menções, handles |

### Font sizes (tokens reais do `fontSize`)
| Classe | Tamanho | Weight | Line height |
|---|---|---|---|
| `text-display-xl` | 48px | 700 | 1.1 |
| `text-display` | 36px | 700 | 1.15 |
| `text-h1` | 28px | 600 | 1.2 |
| `text-h2` | 22px | 600 | 1.3 |
| `text-h3` | 18px | 600 | 1.35 |
| `text-h4` | 15px | 600 | 1.4 |
| `text-body-lg` | 16px | — | 1.6 |
| `text-body` | 14px | — | 1.5 |
| `text-body-sm` | 13px | — | 1.4 |
| `text-caption` | 12px | — | 1.4 |
| `text-label` | 11px | 500 | 1.4 |
| `text-code` | 13px | — | 1.4 |

---

## Sombras

```
shadow-elevation-0  // none
shadow-elevation-1  // 0 1px 3px rgba(0,0,0, 0.4)     ← cards padrão
shadow-elevation-2  // 0 4px 12px rgba(0,0,0, 0.5)    ← cards elevados, toast
shadow-elevation-3  // 0 8px 24px rgba(0,0,0, 0.6)    ← dropdowns
shadow-elevation-4  // 0 16px 48px rgba(0,0,0, 0.7) + anel branco ← modais

shadow-glow-cyan    // 0 0 20px rgba(0,212,255, 0.45)
shadow-glow-violet  // 0 0 20px rgba(139,92,246, 0.45)
shadow-glow-gold    // 0 0 20px rgba(230,178,67, 0.45)
shadow-glow-success // 0 0 20px rgba(16,185,129, 0.45)
shadow-glow-warning // 0 0 20px rgba(245,158,11, 0.45)
shadow-glow-error   // 0 0 20px rgba(239,68,68, 0.45)
shadow-glow-info    // 0 0 20px rgba(59,130,246, 0.45)
shadow-glow-brand   // cyan + violet combinados (suave)
shadow-glow-magic   // violet + cyan (mais intenso)

shadow-focus-cyan   // 0 0 0 3px rgba(0,212,255, 0.15)  ← anel de foco padrão
shadow-focus-ring   // 0 0 0 3px rgba(0,212,255, 0.25)  ← focus mais visível
shadow-focus-error  // 0 0 0 3px rgba(239,68,68, 0.15)  ← foco em campo com erro
```

---

## Animações

```
animate-glow-pulse         // breathing glow cyan+violet 3s
animate-glow-pulse-cyan    // breathing glow só cyan 3s
animate-glow-pulse-violet  // breathing glow só violet 3s
animate-magic-breathe      // breathing glow violet+cyan+gold 4s — ícone Arquivista
animate-mention-flash      // flash 300ms — ao @menção ser atualizada
animate-spin               // spinner 700ms linear — loading states
```

---

## Motion — durations e easings

```ts
// Classes de transition-duration
duration-micro   // 100ms — micro-interações (hover de ícones)
duration-ui      // 150ms — transições de UI padrão (buttons, inputs)
duration-panel   // 250ms — painéis, dropdowns
duration-page    // 400ms — transições de página

// Classes de transition-timing-function
ease-out      // cubic-bezier(0.16, 1, 0.3, 1)    — natural, decelera
ease-in       // cubic-bezier(0.4, 0, 1, 1)        — accelera
ease-in-out   // cubic-bezier(0.4, 0, 0.2, 1)      — suave
```

---

## Tokens especiais de layout

```css
--nex-layout-sidebar:   240px  /* largura padrão da sidebar */
--nex-layout-content:   900px  /* largura máxima do conteúdo */
--nex-layout-side-pane: 320px  /* painel lateral */
```

---

## Classe especial — nex-glass-magic

Efeito de brilho hover com gradiente cyan/violet. Aplicado via `glassMagic` prop no `Card` e `EntityCard`, ou diretamente:

```tsx
<div className="nex-glass-magic rounded-lg border border-nex-border-subtle">
  {/* conteúdo */}
</div>
```

O efeito usa pseudo-elementos `::before` e `::after` com `opacity: 0 → 1` no hover.
Variante sempre ativa: `nex-glass-magic--always` (sem precisar de hover).
