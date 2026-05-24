# Integração com o Linear

## Projeto
```
https://linear.app/nexus-creator/project/nexus-design-system-9685c606f05b
```

## Ciclo de vida de uma issue

```
Backlog → Todo → In Progress → In Review → Done
```

| Momento | Ação no Linear |
|---|---|
| Ao iniciar | `save_issue state: "In Progress"` |
| Durante (somente se necessário) | `save_comment` com decisão ou bloqueio |
| Ao abrir PR | `save_issue state: "In Review"` + `save_comment` com link |
| Após merge | `save_issue state: "Done"` |

---

## Buscar o gitBranchName

Antes de criar qualquer branch, buscar o nome gerado pelo Linear:

```
Linear › get_issue
  id: NEX-XX

Resposta relevante:
  gitBranchName: "feature/nex-54-sidebar-editorial"
```

O `gitBranchName` é o nome exato a usar no `git checkout -b`. Nunca inventar o nome da branch manualmente.

**Se a issue não tiver `gitBranchName`:** pode significar que a issue não foi configurada corretamente. Perguntar ao usuário antes de continuar.

---

## Comentários no Linear — quando e como

### ✅ Comentar
- Decisão técnica importante tomada durante execução
- Escopo real divergiu do descrito (ex: precisou criar arquivo extra não previsto)
- Bloqueio por dependência de outra issue
- Dúvida antes de começar (se não ficou claro pelo enunciado)
- Link do PR ao mover para In Review

### ❌ Não comentar
- "Iniciando a tarefa" sem mais contexto
- Atualizações de progresso rotineiras ("implementei X, agora vou fazer Y")
- Redundâncias do que já está no PR

### Formato do comentário de PR
```
✅ PR criado: https://github.com/Nexus-Creator-App/<repo>/pull/<número>

Critérios verificados:
- [x] lint e build passando
- [x] layout mobile validado em 375px
- [x] [critério específico da issue]
```

### Formato do comentário de decisão técnica
```
Decisão: [o quê].
Motivo: [por quê — qual alternativa foi descartada e por quê].
Impacto: [quais arquivos ou outras issues isso afeta].
```

---

## Comandos Linear MCP — referência rápida

```
# Buscar issue com gitBranchName
Linear › get_issue
  id: "NEX-XX"

# Mover status
Linear › save_issue
  id:    "NEX-XX"
  state: "In Progress" | "In Review" | "Done"

# Comentar
Linear › save_comment
  issueId: "NEX-XX"
  body:    "texto do comentário"

# Listar issues do projeto
Linear › list_issues
  project: "nexus-core-344ac934bab1"
  state:   "Todo" | "In Progress" | "In Review"

# Criar sub-task
Linear › save_issue
  title:    "Sub-task: ..."
  parentId: "NEX-XX"
  project:  "nexus-core-344ac934bab1"
  team:     "12644966-1064-447b-a744-abeb565307b0"
```

---

## Estados válidos do Linear

| Estado | Quando |
|---|---|
| `Backlog` | Issue criada, não priorizada |
| `Todo` | Priorizada, aguardando execução |
| `In Progress` | Em execução — branch criada |
| `In Review` | PR aberto, aguardando revisão |
| `Done` | PR mergeado em `dev` |

---

## IDs de referência (Nexus Creator)

| Item | ID / URL |
|---|---|
| Team | `12644966-1064-447b-a744-abeb565307b0` |
| Projeto Linear | `nexus-core-344ac934bab1` |
| Projeto URL | https://linear.app/nexus-creator/project/nexus-core-344ac934bab1 |
| Branch base | `dev` |
| PR base | sempre `--base dev` |
| Package manager | `npm` (nunca pnpm/yarn) |
| Node | >= 18 |
