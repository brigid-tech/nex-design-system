# nex-design-system — arquivado

> ⛔ **Este repositório está congelado.** O design system se mudou.

O `@brigid-tech/design-system` agora vive dentro do monorepo **`nex-core`**:

**→ https://github.com/brigid-tech/nex-core/tree/main/packages/design-system**

Todo o histórico deste repositório foi preservado na mudança (`git subtree`),
então `git blame` e `git log` continuam contando a história inteira lá.

---

## Por que a mudança

Componente novo e o uso dele no app exigiam cinco passos e dois repositórios:
commit aqui, tag, esperar publicar, bump da versão no consumidor, e só então o
PR do produto podia ficar verde. Com o design system mudando muito, esse pedágio
era cobrado o tempo todo.

Dentro do monorepo, a mesma mudança é **um commit, um PR, um review** — e o app
enxerga o componente novo sem publicar nada.

O raciocínio completo, incluindo a alternativa de submodule que foi descartada,
está em
[`docs/design-system-compartilhado.md`](https://github.com/brigid-tech/nex-core/blob/main/docs/design-system-compartilhado.md).

---

## Se você consome o pacote

**Nada muda.** O pacote continua sendo `@brigid-tech/design-system`, publicado no
mesmo GitHub Packages, instalado por versão:

```bash
npm install @brigid-tech/design-system
```

Só o endereço de onde o release sai mudou. A partir da `0.3.0`, as versões são
publicadas pelo `nex-core`, na tag `design-system-v*`.

Autenticação segue igual — token com `read:packages`, porque o pacote é privado:

```ini
@brigid-tech:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

---

## Se você ia contribuir

Abra o PR no `nex-core`, em `packages/design-system/`. O guia para agentes e
pessoas está em
[`packages/design-system/CLAUDE.md`](https://github.com/brigid-tech/nex-core/blob/main/packages/design-system/CLAUDE.md).

---

## Por que este repositório não foi apagado

Dois motivos, e o segundo não é óbvio:

1. As versões `0.1.x` e `0.2.0` publicadas a partir daqui seguem referenciadas
   por consumidores e por locks antigos.
2. **O pacote no GitHub Packages continua vinculado a este repositório.** Esse
   vínculo não migra sozinho quando o pacote passa a ser publicado de outro
   lugar — é ele que sustenta a permissão de Write concedida ao `nex-core`.
   Apagar este repo quebraria a publicação a partir do monorepo.
