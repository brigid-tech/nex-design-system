# Fluxo Completo — Do Início ao Merge

## Fase 1 — Ao iniciar a tarefa

### Passo 1: Buscar o gitBranchName no Linear
```
Linear › get_issue
  id: NEX-XX
  → copiar o campo gitBranchName (ex: feature/nex-54-sidebar-editorial)
```

Se não houver issue Linear associada: **perguntar ao usuário antes de continuar.**

### Passo 2: Mover para In Progress
```
Linear › save_issue
  id:    NEX-XX
  state: "In Progress"
```

### Passo 3: Criar a branch a partir de dev
```bash
git fetch origin dev                          # sempre — branch local pode estar velha
git checkout -b <gitBranchName> origin/dev    # exatamente o nome do Linear
```

⚠️ Se já existe uma branch local com outro nome (ex: `claude/...`), **não reaproveitar**.
Criar a branch correta mesmo assim.

### Passo 4 (opcional): Comentar no Linear se houver dúvida
```
Linear › save_comment
  issueId: NEX-XX
  body: "Iniciando. [Dúvida ou decisão relevante antes de começar]"
```
Comentar **somente** se houver dúvida real ou decisão a documentar. Não comentar "iniciando a tarefa" sem mais.

---

## Fase 2 — Durante o desenvolvimento

### Commits atômicos
Um commit por mudança lógica. Nunca acumular tudo em um commit gigante no final.

```bash
# Após cada mudança lógica:
git add src/components/sidebar/SidebarEditorial.tsx
git commit -m "feat(NEX-54): criar estrutura base do SidebarEditorial"

git add src/components/sidebar/SidebarEditorial.tsx
git commit -m "feat(NEX-54): implementar árvore colapsável de entidades"

git add src/hooks/useSidebarMode.ts
git commit -m "feat(NEX-54): adicionar hook useSidebarMode com localStorage"
```

### Quando comentar no Linear durante execução
Comentar **somente** se:
- Uma decisão técnica importante foi tomada (e precisa ser documentada)
- O escopo real divergiu do descrito na issue
- Há bloqueio por dependência de outra issue

```
Linear › save_comment
  issueId: NEX-XX
  body: "Decisão: [o quê e por quê]. Afeta os arquivos X e Y."
```

---

## Fase 3 — Antes do push (obrigatório, nesta ordem)

```bash
npm run lint        # zero warnings — não "quase zero", zero
npm run typecheck   # tsc --noEmit — zero erros de tipo
npm run build       # tsup gera dist/ (ESM + CJS + tipos) sem erros
```

Se qualquer um falhar: **corrigir antes de fazer push**. Nunca push com erros.

> Componente novo? Antes do push confirme: exportado nos barrels
> (`src/components/index.ts` e `src/index.ts`), story cobrindo todos os estados,
> `displayName` definido. Ver checklist em `nexus-ds-component`.

---

## Fase 4 — Push e PR

### Push
```bash
git push -u origin <branch>
```

### Criar o PR
```bash
gh pr create \
  --title "feat(NEX-XX): título exato da issue" \
  --base dev \
  --head <branch> \
  --body "$(cat <<'EOF'
## O que foi feito
[Descrição clara do que foi implementado]

## Arquivos modificados
- `src/components/sidebar/SidebarEditorial.tsx` — componente principal
- `src/hooks/useSidebarMode.ts` — hook de persistência de modo

## Como testar
1. [Passo]
2. [Passo]
3. [O que verificar]

## Critérios de aceite
- [x] critério 1
- [x] critério 2
- [x] lint e build passando

Closes NEX-XX
EOF
)"
```

**Regras do PR:**
- Base sempre `--base dev` (nunca `main`)
- Título no formato `feat(NEX-XX): título`
- Body com todas as seções preenchidas
- `Closes NEX-XX` no final (fecha a issue automaticamente)

---

## Fase 5 — Mover Linear para In Review

```
Linear › save_issue
  id:    NEX-XX
  state: "In Review"

Linear › save_comment
  issueId: NEX-XX
  body: "✅ PR criado: https://github.com/Nexus-Creator-App/<repo>/pull/<número>

  Critérios verificados:
  - [x] lint e build passando
  - [x] critério específico 1
  - [x] critério específico 2"
```

---

## Fase 6 — Após aprovação e merge

O merge é feito pelo revisor humano. Após o merge em `dev`:

```
Linear › save_issue
  id:    NEX-XX
  state: "Done"
```

---

## Release para produção

Quando `dev` tem features aprovadas e prontas:

```bash
# PR de dev → main
gh pr create \
  --title "release: vX.Y.Z" \
  --base main \
  --head dev
```

Após merge: criar GitHub Release com tag `vX.Y.Z` em `main`.

---

## Diagrama do fluxo

```
Receber issue
     ↓
Linear: get_issue → pegar gitBranchName
     ↓
Linear: "In Progress"
     ↓
git fetch origin dev
git checkout -b <gitBranchName> origin/dev
     ↓
Implementar + commits atômicos
     ↓
npm run lint (zero warnings)
npm run build (sem erros)
     ↓
git push
gh pr create --base dev
     ↓
Linear: "In Review" + comentar link do PR
     ↓
PR aprovado e mergeado pelo revisor
     ↓
Linear: "Done"
```
