# Permissões e Configuração do Claude Code

## Modos de execução

| Modo | Quando usar |
|---|---|
| **Interativo** (padrão) | Features novas, componentes complexos — o agente pergunta antes de ações destrutivas |
| **Auto mode** | Tasks bem definidas e seguras — chores, refactors localizados, geração de tipos |
| **Scheduled / Routine** | Tarefas recorrentes — CI check, triagem de issues, sync de docs |

---

## Permissões recomendadas — Nexus Creator

### Permitir (allow)
```json
{
  "allow": [
    "Bash(npm run *)",
    "Bash(git checkout *)",
    "Bash(git add *)",
    "Bash(git commit *)",
    "Bash(git push *)",
    "Bash(git fetch *)",
    "Bash(supabase gen types *)",
    "Read(**)",
    "Write(apps/web/src/**)",
    "Write(apps/api/src/**)",
    "Write(packages/shared/src/**)"
  ]
}
```

### Negar (deny) — nunca sem confirmação
```json
{
  "deny": [
    "Bash(npm publish *)",
    "Bash(supabase db reset *)",
    "Bash(rm -rf *)",
    "Write(packages/design-system/**)",
    "Write(.env*)",
    "Write(*.secret*)"
  ]
}
```

### Por que negar o design-system
O DS é um pacote compartilhado com impacto em toda a plataforma. Mudanças nele devem ter PR dedicado e revisão humana obrigatória. Qualquer agente que precise de um componente novo no DS deve parar e reportar.

---

## Configuração via settings.json

```json
// .claude/settings.json (na raiz do repo)
{
  "permissions": {
    "allow": [
      "Bash(npm run lint)",
      "Bash(npm run build)",
      "Bash(npm run typecheck)",
      "Bash(npm run dev *)",
      "Bash(git *)",
      "Bash(supabase gen types *)",
      "Read(**)",
      "Write(apps/**)",
      "Write(packages/shared/**)"
    ],
    "deny": [
      "Bash(npm publish *)",
      "Bash(supabase db reset *)",
      "Bash(supabase db push *)",
      "Write(packages/design-system/**)",
      "Write(.env*)"
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
- Gerar tipos do Supabase (`supabase gen types`)
- Criar arquivos de schema Zod
- Criar hooks de query com padrão bem definido
- Atualizar barrel exports (`index.ts`)
- Rodar lint e corrigir warnings simples

**Requer modo interativo:**
- Criar componentes visuais novos (decisões de UI)
- Integrar com serviços externos (Stripe, Supabase)
- Qualquer migração de banco
- Qualquer mudança no design-system

---

## Routine — tarefas agendadas

```bash
# Criar uma routine local (laptop precisa estar ligado)
# Claude Code > Routines > New routine > Local

# Criar uma routine remota (roda na nuvem da Anthropic)
# Claude Code > Routines > New routine > Remote
```

### Routines úteis para Nexus Creator

**Daily — verificação de types**
```
Prompt: "Rodar npm run typecheck no monorepo e reportar erros novos desde ontem.
         Se encontrar erros, criar issue no Linear com o título 'fix: erros de tipo
         encontrados em [data]' e descrição com os erros."
Trigger: Todo dia às 9h
Tipo: Remote
```

**On PR merge — sync de documentação**
```
Prompt: "Ler os arquivos modificados no último merge em dev.
         Identificar se algum schema Zod em packages/shared foi alterado.
         Se sim, adicionar comentário na PR correspondente no Linear."
Trigger: Webhook (push em dev)
Tipo: Remote
```

**Weekly — auditoria de dependências**
```
Prompt: "Rodar npm outdated no monorepo e criar issue no Linear com tipo CHORE
         listando pacotes desatualizados por prioridade."
Trigger: Toda segunda-feira às 10h
Tipo: Remote
```

---

## Checklist antes de rodar o agente

Antes de iniciar uma sessão para executar um card:

- [ ] CLAUDE.md existe na raiz do repo com instruções atualizadas
- [ ] Skills instaladas: nexus-stack, nexus-react, nexus-hono-api, nexus-design-system
- [ ] Branch `dev` atualizado: `git fetch origin dev`
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
- Inventar endpoint que não existe → **contratos de API não estavam definidos**
- Fazer mudanças no design-system → **escopo não estava delimitado com "Não tocar"**
- Criar abstração não pedida → **restrições de over-engineering ausentes**
