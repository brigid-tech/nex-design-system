# Permissões e Configuração do Claude Code — nex-design-system

> Este bloco é para o repo do **design system**. Aqui a base de código é `src/` e
> `playground/` — não há monorepo (`apps/`, `packages/`) nem Supabase. Para a
> configuração de um **app consumidor** (ex.: nex-core), os globs e denies são
> outros (lá faz sentido negar `Write` no design-system; aqui não, este repo *é* o DS).

## Modos de execução

| Modo | Quando usar |
|---|---|
| **Interativo** (padrão) | Features novas, componentes complexos — o agente pergunta antes de ações destrutivas |
| **Auto mode** | Tasks bem definidas e seguras — chores, refactors localizados, atualizar barrels |
| **Scheduled / Routine** | Tarefas recorrentes — CI check, triagem de issues, sync de docs |

---

## Permissões recomendadas — nex-design-system

### Permitir (allow)
```json
{
  "allow": [
    "Bash(npm run lint)",
    "Bash(npm run typecheck)",
    "Bash(npm run build)",
    "Bash(npm run storybook)",
    "Bash(npm run dev *)",
    "Bash(git checkout *)",
    "Bash(git add *)",
    "Bash(git commit *)",
    "Bash(git push *)",
    "Bash(git fetch *)",
    "Read(**)",
    "Write(src/**)",
    "Write(playground/**)"
  ]
}
```

### Negar (deny) — nunca sem confirmação
```json
{
  "deny": [
    "Bash(npm publish *)",
    "Bash(npm version *)",
    "Bash(git tag *)",
    "Bash(git push * --tags)",
    "Bash(rm -rf *)",
    "Write(.env*)",
    "Write(*.secret*)",
    "Write(.github/workflows/**)"
  ]
}
```

### Por que negar publish/version/tag
A publicação no GitHub Packages é disparada por **tag** (`v*`) via
`.github/workflows/publish.yml`. Criar tag ou rodar `npm publish`/`npm version`
significa **lançar uma versão para todos os apps consumidores** — isso é decisão
humana com revisão. O agente deve parar e reportar. Ver `nexus-release`.

---

## Configuração via settings.json

```jsonc
// .claude/settings.json (na raiz do repo)
{
  "permissions": {
    "allow": [
      "Bash(npm run lint)",
      "Bash(npm run typecheck)",
      "Bash(npm run build)",
      "Bash(npm run storybook)",
      "Bash(npm run dev *)",
      "Bash(git *)",
      "Read(**)",
      "Write(src/**)",
      "Write(playground/**)"
    ],
    "deny": [
      "Bash(npm publish *)",
      "Bash(npm version *)",
      "Bash(git tag *)",
      "Write(.env*)",
      "Write(.github/workflows/**)"
    ]
  }
}
```

---

## Modo auto — quando ativar

```bash
# Ativar modo auto na CLI
claude --auto

# Ou no início da sessão
/auto
```

**Seguro para auto:**
- Atualizar barrel exports (`src/components/index.ts`, `src/index.ts`)
- Adicionar stories para um componente existente
- Rodar lint/typecheck e corrigir warnings simples
- Ajustes visuais localizados que não mudam a API pública

**Requer modo interativo:**
- Criar componentes visuais novos (decisões de UI/API pública)
- Mexer em tokens, preset ou CSS custom properties (`--nex-*`)
- Qualquer mudança que possa ser breaking change
- Versionar/publicar (sempre humano — ver `nexus-release`)

---

## Routine — tarefas agendadas

```bash
# Criar uma routine local (laptop precisa estar ligado)
# Claude Code > Routines > New routine > Local

# Criar uma routine remota (roda na nuvem da Anthropic)
# Claude Code > Routines > New routine > Remote
```

### Routines úteis para o DS

**Daily — verificação de types e build**
```
Prompt: "Rodar npm run typecheck e npm run build e reportar erros novos desde ontem.
         Se encontrar erros, criar issue no Linear com o título 'fix: erros de
         tipo/build encontrados em [data]' e a descrição com os erros."
Trigger: Todo dia às 9h
Tipo: Remote
```

**On PR merge — auditoria de API pública**
```
Prompt: "Ler os arquivos modificados no último merge em main.
         Identificar se algum export dos barrels (src/components/index.ts, src/index.ts)
         ou token em src/tokens foi removido/renomeado (potencial breaking change).
         Se sim, comentar na issue do Linear correspondente sinalizando bump major."
Trigger: Webhook (push em main)
Tipo: Remote
```

**Weekly — auditoria de dependências**
```
Prompt: "Rodar npm outdated e criar issue no Linear com tipo CHORE listando
         pacotes desatualizados por prioridade."
Trigger: Toda segunda-feira às 10h
Tipo: Remote
```

---

## Checklist antes de rodar o agente

Antes de iniciar uma sessão para executar um card:

- [ ] CLAUDE.md existe na raiz do repo com instruções atualizadas
- [ ] Skills disponíveis: `nexus-stack`, `nexus-design-system`, `nexus-ds-component`, `nexus-react`, `nexus-tokens`, `nexus-storybook`, `nexus-a11y`, `nexus-release`, `nexus-git-workflow`
- [ ] Branch atualizado: `git fetch origin <base>`
- [ ] Issue Linear movida para "In Progress"
- [ ] Prompt preparado com o template correto (ver `prompt-templates.md`)
- [ ] Permissões configuradas em `.claude/settings.json`
- [ ] Modo correto selecionado (interativo vs auto)

---

## Sinais de prompt ruim — quando reescrever

Se o agente fizer qualquer uma dessas coisas, o prompt precisa melhorar:

- Perguntar "qual é o path do arquivo?" → **path não estava no prompt**
- Criar arquivo em lugar errado → **estrutura de pastas não estava clara**
- Usar `bg-white` em vez de tokens DS → **regras do DS não estavam no prompt**
- Esquecer de exportar no barrel geral → **checklist de autoria ausente** (ver `nexus-ds-component`)
- Criar tag / publicar sem pedir → **escopo de release não delimitado** (ver `nexus-release`)
- Criar abstração não pedida → **restrições de over-engineering ausentes**
