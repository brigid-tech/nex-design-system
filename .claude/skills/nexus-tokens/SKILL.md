---
name: nexus-tokens
description: "Sistema de design tokens do Nexus Creator (repo nex-design-system): cores, tipografia, espaçamento, sombras/glows, motion e raios. Use sempre que a tarefa envolver escolher ou adicionar um token, usar a cor/tipo certo num componente, mexer no preset Tailwind, nas CSS custom properties (--nex-*) ou nos objetos TS em src/tokens. Acionar ao mencionar 'cor da marca', 'token', 'gradiente', 'sombra', 'glow', 'fonte', 'tipografia', 'espaçamento' ou 'animação'."
---

# Nexus — Design Tokens

Fonte única: `src/tokens/*.ts` (objetos TS `as const`). São consumidos pelo
`preset.ts` (vira classe Tailwind `nex-*`) e por `styles/globals.css` (vira
CSS custom property `--nex-*`). **Nunca hardcode um valor** — adicione/use o token.

Dois jeitos de consumir num componente:
```tsx
// classe do preset (preferido — respeita o tema)
className="text-nex-text-primary bg-nex-bg-secondary shadow-elevation-2"
// token TS (só quando inline style é inevitável)
import { colors } from "../../tokens/colors"
style={{ color: colors.entity.character.DEFAULT }}
```

---

## Cores (`tokens/colors.ts`)

```
bg:     primary #0A0B0F · secondary #111318 · elevated #1A1D26 · hover #1F2330
border: subtle .06 · default .10 · strong .18   (white com alpha)
text:   primary #F0F2F8 · secondary #8B90A0 · tertiary #52566A · inverted #0A0B0F
brand:  cyan #00D4FF · violet #8B5CF6 · gold hsl(45,80%,55%)
semantic: success #10B981 · warning #F59E0B · error #EF4444 · info #3B82F6
```

### Entidades (worldbuilding) — `colors.entity.<tipo>`
Cada tipo tem 5 variantes: `DEFAULT`, `bg`, `bgHover`, `border`, `borderHover`.

```
character → violet #8B5CF6      item     → blue  #3B82F6
place     → green  #10B981      creature → red   #EF4444
faction   → amber  #F59E0B      event    → pink  #EC4899
```
`EntityType = keyof typeof colors.entity`. Nunca invente cor de entidade nova
sem adicionar ao token (e bump de versão).

Classes Tailwind: `text-nex-entity-character`, `bg-nex-entity-place`, etc.

---

## Tipografia (`tokens/typography.ts`)

```
fontFamily: display=Cinzel · ui=Inter · mono="JetBrains Mono"
fontSize (classe text-*): display-xl 48 · display 36 · h1 28 · h2 22 · h3 18 ·
  h4 15 · body-lg 16 · body 14 · body-sm 13 · caption 12 · label 11 · code 13
```
Cada tamanho já traz weight/letter-spacing/line-height. Use `text-h2`,
`font-display`, `font-ui`, `font-mono` — não defina `font-size` solto.

---

## Espaçamento e raios (`tokens/spacing.ts`)

```
spacing: px 2 · 1=4 · 2=8 · 3=12 · 4=16 · 5=20 · 6=24 · 8=32 · 10=40 · 12=48 · 16=64 · 20=80 · 24=96 (px)
borderRadius: sm 4 · md 8 · lg 12 · xl 16 · full 9999
```

---

## Sombras e glows (`tokens/shadows.ts`)

```
elevation-0..4   (sombras de profundidade; 4 inclui ring sutil)
glow-cyan | violet | gold | success | warning | error | info
glow-brand  (cyan + violet difuso)   glow-magic (violet + cyan)
focus-cyan | focus-ring | focus-error  (anéis de foco — 3px)
```
Classes: `shadow-elevation-2`, `shadow-glow-violet`, `shadow-focus-cyan`.

---

## Motion (`tokens/motion.ts`)

```
duration: micro 100ms · ui 150ms · panel 250ms · page 400ms
easing:   ease-out cubic(.16,1,.3,1) · ease-in · ease-in-out
animation (classe animate-*): glow-pulse | glow-pulse-cyan | glow-pulse-violet |
  magic-breathe | mention-flash (300ms) | spin (700ms)
```
Keyframes `nex-*` vivem em `styles/globals.css`. Animação nova = keyframe no CSS
+ entrada no token + exposição no preset.

---

## Adicionar um token novo

1. Adicionar a chave no objeto correto em `src/tokens/<arquivo>.ts`
2. Garantir que `preset.ts` expõe (classe Tailwind) e/ou `globals.css` (`--nex-*`)
3. Se for keyframe/animação, definir o `@keyframes nex-*` em `globals.css`
4. `npm run build` — confirmar que sai no `dist/`
5. Token novo exportado = bump **minor**; renomear/remover = **major** (`nexus-release`)
