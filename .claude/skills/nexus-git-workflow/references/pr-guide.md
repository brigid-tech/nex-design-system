# Template de PR e Critérios de Qualidade

## Template de PR — body completo

```markdown
## O que foi feito
[Descrever o que foi implementado. Contexto suficiente para o revisor entender
sem precisar ler o código inteiro.]

## Arquivos modificados
- `src/components/sidebar/SidebarEditorial.tsx` — componente principal com árvore colapsável
- `src/components/sidebar/SidebarRail.tsx` — variante de trilho compacto
- `src/hooks/useSidebarMode.ts` — hook com persistência em localStorage
- `src/components/layout/AppLayout.tsx` — integração dos dois modos

## Como testar
1. Abrir o app em dev (`npm run dev`)
2. Verificar que a sidebar Editorial aparece expandida por padrão
3. Clicar no botão de toggle → sidebar deve colapsar para o modo Trilho (animação suave)
4. Recarregar a página → preferência deve persistir
5. Abrir DevTools em 375px → sidebar deve ter comportamento mobile (drawer ou colapsado)

## Critérios de aceite
- [x] SidebarEditorial renderiza árvore de entidades colapsável por grupo
- [x] SidebarRail renderiza ícones com badges e tooltips
- [x] Toggle persiste a preferência no localStorage
- [x] Transição entre modos é suave (300ms ease-in-out)
- [x] Layout responsivo — mobile validado em 375px
- [x] lint: zero warnings
- [x] build: sem erros

Closes NEX-54
```

---

## Checklist do revisor

Ao revisar um PR, verificar:

### Código
- [ ] Segue nomenclaturas do `CLAUDE.md` seção 4
- [ ] Sem componentes recriados que já existem no DS
- [ ] TypeScript strict — sem `any`, sem `!` desnecessário
- [ ] TanStack Query para server state (sem `useEffect + fetch`)
- [ ] Supabase não acessado diretamente no client

### Mobile-first (obrigatório)
- [ ] Layout pensado em mobile primeiro
- [ ] Sidebars/navs têm versão mobile (drawer/colapsado)
- [ ] Áreas de toque ≥ 44px
- [ ] Sem larguras fixas em `px` onde `max-w-*` + `w-full` resolve
- [ ] Validado em 375px / 768px / 1280px

### Git
- [ ] Commits atômicos (não um único commit gigante)
- [ ] Mensagens seguem Conventional Commits com ID da issue
- [ ] PR base é `dev`, não `main`
- [ ] `Closes NEX-XX` no body

### Qualidade
- [ ] `npm run lint` zero warnings
- [ ] `npm run build` sem erros
- [ ] Critérios de aceite da issue todos marcados

---

## Títulos de PR por tipo

```bash
# Feature
--title "feat(NEX-54): sidebar editorial com árvore de entidades"

# Bug fix
--title "fix(NEX-28): corrigir colapso da sidebar em mobile"

# Refactor
--title "refactor(NEX-41): extrair useSidebarMode para hook separado"

# Chore
--title "chore(NEX-15): atualizar dependências do design-system"

# Docs
--title "docs: atualizar CONTRIBUTING.md com fluxo de routines"

# Release
--title "release: v1.2.0"
```

---

## Situações especiais

### PR com múltiplos cards relacionados
```markdown
Closes NEX-54
Closes NEX-55
Related to NEX-56
```

### PR bloqueado por dependência
Não criar PR enquanto o PR da dependência não for mergeado.
Comentar na issue do Linear: "Aguardando merge de NEX-XX antes de abrir PR."

### Rebase necessário (dev avançou durante o desenvolvimento)
```bash
git fetch origin dev
git rebase origin/dev

# Se houver conflitos:
git add <arquivos-resolvidos>
git rebase --continue

# Após rebase:
npm run lint && npm run build  # verificar novamente
git push --force-with-lease    # nunca --force sem --with-lease
```

### Squash de commits (se solicitado pelo revisor)
```bash
git rebase -i origin/dev
# Marcar commits desnecessários como 'squash' ou 's'
# Manter commits lógicos separados
git push --force-with-lease
```

---

## Erros comuns e como evitar

| Erro | Como evitar |
|---|---|
| Push em `dev` diretamente | Nunca trabalhar em `dev` — sempre criar feature branch |
| Branch a partir de `main` | Sempre `git checkout -b ... origin/dev` |
| Branch com nome errado | Copiar `gitBranchName` exato do Linear via `get_issue` |
| Commit gigante no final | Commitar após cada mudança lógica durante o desenvolvimento |
| Push com warnings de lint | Rodar `npm run lint` antes de qualquer push |
| PR com base errada | Sempre `--base dev`, verificar antes de criar |
| Esquecer de mover o Linear | Parte do checklist — Linear: In Review ao abrir PR, Done após merge |
