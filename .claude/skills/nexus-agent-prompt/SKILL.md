---
name: nexus-agent-prompt
description: "Gera prompts otimizados para agentes de IA (Code agents) executarem issues do Linear no projeto Nexus Creator. Use este skill sempre que o usuário quiser executar um card, preparar um prompt para o agente, configurar o CLAUDE.md, criar instruções para rodar uma feature, bug fix, refactor ou chore — mesmo que mencione apenas 'prompt pro agente', 'mandar pro agente', 'executar a issue' ou 'como eu rodo isso'."
---

# Nexus Agent Prompt — Nexus Creator

Traduz cards do Linear em prompts prontos para o Claude Code executar.

> **Arquivos de referência:**
> - `references/claude-md.md` — template do CLAUDE.md para o projeto
> - `references/prompt-templates.md` — templates por tipo de card (Feature, Bug, Chore, Refactor)
> - `references/permissions.md` — configuração de permissões e modo auto

---

## Lei fundamental: Design-first, não Issue-first

> **O design é a referência final. A issue é um guia. Quando houver conflito, o design vence.**

Este é o aprendizado mais importante do projeto. Em sessões passadas, o agente:
- Leu a issue, achou que tinha tudo, e nunca abriu o arquivo HTML do design
- Seguiu specs da issue que divergiam do design (textos diferentes, pesos de fonte errados)
- Implementou componentes em silos sem entender o contexto do wrapper que os envolve
- Usou `bg-nex-bg-primary` como fundo quando o cosmos vinha do componente pai

**O prompt deve tornar isso impossível de acontecer.**

---

## Princípios de um bom prompt de agente

Um agente não pergunta — ele age. Um prompt ruim gera execução errada ou paralisia.
Um bom prompt elimina toda ambiguidade antes de começar.

| ❌ Prompt vago | ✅ Prompt preciso |
|---|---|
| "Crie o componente de sidebar" | "Leia `design/sidebar.html` ANTES de qualquer coisa. Depois crie `SidebarEditorial.tsx` em `src/components/sidebar/`" |
| "Siga o design" | "O design source é `[arquivo]`. Quando a issue divergir do HTML, o HTML vence." |
| "Adicione validação" | "Adicione validação Zod usando `CreateEntitySchema` de `src/types/entities.ts`" |
| "Conecte ao backend" | "Consuma via `src/api/client.ts` — nunca fetch direto" |

---

## Anatomia de um prompt para Claude Code

```
[DESIGN]    Qual arquivo de design ler PRIMEIRO — antes de qualquer código
[CONTEXTO]  O que já existe, wrapper/host que envolve o componente
[OBJETIVO]  O que precisa ser feito (direto, sem floreio)
[ARQUIVOS]  Quais criar, editar, onde ficam
[RESTRIÇÕES] O que não tocar, o que não inventar
[VALIDAÇÃO] Rodar dev server e validar visualmente antes de commitar
[CRITÉRIOS] Como saber que terminou
```

---

## Fluxo de uso desta skill

### Opção A — Usuário traz o ID da issue
"Gera o prompt para o NEX-54"
→ Buscar o card no Linear → verificar se há design file referenciado → gerar prompt com design-first

### Opção B — Usuário descreve o que quer fazer
"Prompt para criar o hook useSidebarMode"
→ Classificar tipo (Feature/Bug/Chore) → usar template correspondente → gerar prompt

### Opção C — Usuário quer configurar o CLAUDE.md
"Monta o CLAUDE.md do projeto"
→ Ler `references/claude-md.md` → preencher com contexto do Nexus Creator

---

## Estrutura do prompt gerado

Todo prompt gerado por esta skill segue esta estrutura:

```
## ⚠️ Leia o design ANTES de qualquer código
[path/para/arquivo.html ou link] — o design é a fonte de verdade.
Quando a issue divergir do HTML, o HTML vence.
Leia o arquivo inteiro — não só o componente principal, mas também o
wrapper/host que o envolve (App, Layout, etc.) para entender de onde
vêm backgrounds, fontes e contexto visual.

## Contexto
[Stack relevante, o que já existe]
[Descrever o wrapper/host se o componente for filho de outro]

## Objetivo
[Uma frase clara do que precisa ser feito]

## O que fazer

### 1. Criar branch
```bash
git fetch origin dev
git checkout -b feature/nex-XX-titulo origin/dev
```

### 2. Ler o design (obrigatório antes de escrever qualquer linha)
[Instrução explícita de qual arquivo abrir e o que prestar atenção]

### 3. [Passos de implementação...]

## Arquivos a criar
[path/Arquivo.tsx — descrição]

## Arquivos a modificar
[path/arquivo.ts — o que muda e por quê]

## Não tocar
[Lista do que o agente não deve alterar]

## Validação visual (obrigatória antes do push)
```bash
npm run storybook   # http://localhost:6006 — fundo dark, addon a11y
```
Abrir a story do componente, verificar todos os estados (default, hover,
loading, error, disabled) em 375px e 1280px.
Comparar lado a lado com o design: tipografia, espaçamentos, cores, animações.
Só fazer push após validação visual aprovada.

## Verificação final
```bash
npm run lint        # zero warnings
npm run typecheck   # zero erros de tipo
npm run build       # tsup gera dist/ sem erros
```

## Critérios de conclusão
- [ ] Design lido integralmente antes de começar
- [ ] Componente exportado nos barrels (`components/index.ts` e `index.ts`)
- [ ] `React.forwardRef` + `displayName` + `cn()` + CVA (ver `nexus-ds-component`)
- [ ] Story cobrindo todos os estados visuais
- [ ] Sem lógica de negócio, fetch ou estado global no componente
- [ ] Validação visual feita no Storybook (375px e 1280px)
- [ ] [Critério visual específico]
- [ ] lint, typecheck e build passando
```

---

## Regras ao gerar prompts

1. **Design primeiro, sempre** — o prompt abre com instrução de ler o design file
2. **Citar o arquivo exato** — `design/onboarding.html`, não "o design"
3. **Alertar sobre o wrapper** — se o componente for filho, descrever o pai e o que ele injeta
4. **Conflicts explícitos** — se a issue tiver detalhes que podem divergir do design, escrever: "Se X divergir do HTML, seguir o HTML"
5. **Paths sempre absolutos** — nunca relativos
6. **Nomes de arquivo reais** — nunca "o componente de sidebar", sempre `SidebarEditorial.tsx`
7. **Validação visual obrigatória** — sempre incluir `npm run dev` + comparação com design antes do push
8. **Branch primeiro** — o prompt deve iniciar com o comando git de criar a branch
9. **Nunca inventar** — se não souber o path exato, usar `[confirmar path]`

---

## Sinais de prompt ruim — quando reescrever

Se o agente fizer qualquer uma dessas coisas, o prompt precisa melhorar:

| Comportamento do agente | Causa no prompt | Correção |
|---|---|---|
| Nunca abriu o HTML do design | Design não estava no prompt | Adicionar bloco "Leia o design ANTES" |
| Seguiu spec da issue que divergia do design | Não havia instrução de qual fonte vence | Adicionar "quando a issue divergir do HTML, o HTML vence" |
| Adicionou bg errado no componente | Não analisou o wrapper/host | Descrever o contexto do pai no prompt |
| Textos diferentes do design | Copiou da issue sem validar | Referenciar strings exatas do HTML |
| Layout quebrado em mobile | Sem validação visual | Adicionar passo de `npm run storybook` + viewports |
| Criou abstração não pedida | Sem restrições de escopo | Adicionar "sem abstrações extras" |

---

## Skills que o agente deve referenciar (mencionar no prompt)

| Se o card envolve | Mencionar skill |
|---|---|
| Criar/editar componente do DS | `nexus-ds-component`, `nexus-react` |
| API pública, tokens, o que pertence ao DS | `nexus-design-system` |
| Tokens de cor, tipografia, sombra, motion | `nexus-tokens` |
| Stories do Storybook | `nexus-storybook` |
| Acessibilidade, Radix | `nexus-a11y` |
| Versão, tag, publicação no GitHub Packages | `nexus-release` |
| Estrutura geral, convenções, paths | `nexus-stack` |
| Commits, branches, PRs | `nexus-git-workflow` |

> ⚠️ Este é o repo do **design system**, não um app consumidor. Não há rotas,
> TanStack Query, Zustand ou chamadas HTTP aqui. Componentes do DS são puros:
> só props + JSX + tokens. A validação é via **Storybook**, não dev server.
