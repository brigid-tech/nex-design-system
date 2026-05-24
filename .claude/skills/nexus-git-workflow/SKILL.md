---
name: nexus-git-workflow
description: "Fluxo completo de Git, commits e integração com Linear para o projeto Nexus Creator. Use este skill sempre que a conversa envolver criar branches, fazer commits, abrir PRs, mover issues no Linear, configurar o gitflow, ou qualquer dúvida sobre o processo de desenvolvimento do Nexus Creator — mesmo que o usuário mencione apenas 'branch', 'PR', 'commit', 'push', 'issue', 'como começar a tarefa' ou 'como finalizar'."
---

# Nexus Creator — Git Workflow

Gitflow + Linear do **nex-design-system**. Fonte de verdade: `CLAUDE.md` e `README.md`.

> ⚠️ Diferença do app: aqui o pacote é **publicado no GitHub Packages**, e a
> publicação dispara ao criar uma **tag de versão** (semver). Para versionar e
> publicar, use a skill `nexus-release`.

> **Arquivos de referência:**
> - `references/fluxo-completo.md` — passo a passo do início ao merge
> - `references/pr-guide.md` — template de PR e critérios de qualidade
> - `references/linear-integration.md` — ciclo de vida da issue no Linear

---

## Regras absolutas (nunca violar)

```
❌ Nunca commitar direto em main ou dev
❌ Nunca criar branch a partir de main ou de outra feature
❌ Nunca reaproveitar branch antiga que não casa com o gitBranchName do Linear
❌ Nunca pular git fetch origin dev antes de criar a branch
❌ Nunca fazer push sem lint + typecheck + build passando com zero warnings
❌ Nunca um commit gigante no final — commits atômicos sempre
```

---

## Estrutura de branches

| Branch | Finalidade |
|---|---|
| `main` | Produção — nunca recebe push direto |
| `dev` | Integração — base de todo desenvolvimento |
| `feature/*` | Feature individual |
| `admin/*` | Tarefas administrativas, configs |

**Toda branch nova parte de `dev`. Sempre.**

---

## Fluxo em uma linha

```
dev → feature/nex-XX-titulo → PR (base: dev) → merge → dev → PR (release) → main
```

---

## Conventional Commits

```
feat(NEX-XX):     nova funcionalidade
fix(NEX-XX):      correção de bug
refactor(NEX-XX): refatoração sem mudança de comportamento
chore:            dependências, configs, tarefas internas
docs:             documentação
test:             testes
style:            formatação, sem lógica alterada
```

**Regra do commit atômico:** um commit por mudança lógica.
"Adicionar componente X" é um commit. "Adicionar componente X e ajustar estilo do Y e corrigir bug no Z" são três commits.

---

## Anúncio obrigatório (para agentes)

No início de toda tarefa de código, anunciar explicitamente:

> "Issue Linear: NEX-XX. Branch: `<gitBranchName>`. Base: `origin/dev`."

Se qualquer um dos três não estiver claro, **parar e perguntar** antes de editar qualquer arquivo.

---

## Comandos de referência rápida

```bash
# Iniciar tarefa
git fetch origin dev
git checkout -b <gitBranchName> origin/dev

# Commit atômico
git add <arquivo-específico>
git commit -m "feat(NEX-XX): descrição curta"

# Verificação antes do push
npm run lint        # zero warnings — não "quase zero"
npm run typecheck   # tsc --noEmit, zero erros
npm run build       # tsup gera dist/ sem erros

# Push e PR
git push -u origin <branch>
gh pr create \
  --title "feat(NEX-XX): título da issue" \
  --base dev \
  --head <branch> \
  --body "..."
```

→ Para detalhes completos e templates, ler `references/fluxo-completo.md` e `references/pr-guide.md`.
