---
name: nexus-release
description: "Versionamento e publicação do pacote @nexus-creator-app/design-system no GitHub Packages (repo nex-design-system). Use sempre que a tarefa envolver lançar uma versão, criar/empurrar uma tag, decidir o bump semver (patch/minor/major), avaliar se uma mudança é breaking change, ou entender o workflow de publish. Acionar ao mencionar 'release', 'publicar', 'versão', 'tag', 'semver', 'breaking change', 'GitHub Packages' ou 'bump'."
---

# Nexus — Release & Publicação

O pacote é publicado no **GitHub Packages** (registry restrito). A publicação é
**automática e disparada por tag**: o workflow `.github/workflows/publish.yml`
roda em qualquer tag `v*`.

```
push tag v* → publish.yml → seta version a partir da tag → npm ci → build → npm publish
```

A **tag é a fonte de verdade da versão**: o workflow faz
`npm pkg set version="${TAG#v}"` antes de publicar. O número no `package.json`
do commit não precisa estar adiantado — a tag manda.

> CI (`ci.yml`) roda em push/PR para `main`: `typecheck` + `build`. Garanta os
> dois verdes (e `lint` localmente) antes de chegar nesse ponto.

---

## Quando bumpar o quê (semver)

| Mudança | Bump | Exemplo |
|---|---|---|
| Bug fix, ajuste visual sem mudar API | **patch** | `v1.4.2 → v1.4.3` |
| Componente novo, prop nova retrocompatível, token novo | **minor** | `v1.4.2 → v1.5.0` |
| Remover/renomear prop, componente, token ou export | **major** | `v1.4.2 → v2.0.0` |

**Toda remoção ou renomeação de algo exportado é breaking change → major.**
Adição é sempre minor. Na dúvida entre minor e major, trate como major —
quebrar os apps consumidores em silêncio é o pior resultado.

### O que conta como API pública (mexeu = avalie breaking)
- Props e nomes de componentes exportados nos barrels
- Entrypoints do `package.json`: `.`, `./styles`, `./fonts`, `./preset`, `./tokens`
- Nomes de tokens e classes `nex-*` do preset
- Nomes de CSS custom properties `--nex-*` e keyframes `nex-*`

---

## Fluxo de release

A release sai de `main` (após o merge do PR de `dev → main`):

```bash
git checkout main
git pull origin main

# Cria a tag semver — dispara a publicação
git tag v1.5.0
git push origin v1.5.0
```

Acompanhe a Action **Publish to GitHub Packages**; ela seta a versão a partir da
tag, builda e publica. Em seguida, crie um **GitHub Release** apontando para a tag
com as notas (o que mudou, breaking changes destacadas).

> Alternativa local: `npm version <patch|minor|major>` cria o commit + a tag de
> uma vez; depois `git push && git push --tags`. O efeito de publicação é o mesmo
> (o push da tag dispara o workflow).

---

## Antes de taggar — checklist

- [ ] `npm run lint` · `npm run typecheck` · `npm run build` verdes
- [ ] Mudanças já mergeadas em `main` (a tag é criada sobre `main`)
- [ ] Bump escolhido pela regra semver acima (breaking? → major)
- [ ] Componentes/tokens novos exportados nos barrels
- [ ] Tag no formato `vX.Y.Z`
- [ ] GitHub Release criado com notas após a Action concluir

> ⚠️ Nunca force-push em `main` nem mova uma tag já publicada. Para corrigir uma
> versão já no ar, publique uma nova (patch). Tag publicada é imutável.
