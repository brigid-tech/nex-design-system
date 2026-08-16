# Templates de Prompt por Tipo de Card

Usar o template que corresponde ao tipo da issue Linear.
Preencher todos os campos — nunca deixar placeholder vago.

---

## FEATURE com design file — template principal

> Usar sempre que houver um arquivo de design (.html, .zip, link) associado ao card.

```
## ⚠️ LEIA O DESIGN ANTES DE QUALQUER CÓDIGO

Arquivo: `[path/para/arquivo.html]` (ou link: [url])

Instruções de leitura obrigatórias:
1. Leia o arquivo **inteiro** — não só o componente alvo
2. Identifique o **componente wrapper/host** (App, Layout, OnboardingFlow, etc.)
   e anote o que ele injeta: backgrounds, fontes, contexto de dados
3. Quando a issue divergir do HTML, o **HTML vence**
4. Preste atenção em: textos literais, font-weight, animações, z-index, posicionamento

## Contexto
Issue Linear: [NEX-XX] — [título]
Stack: React 19 + TypeScript + TanStack Router + Zustand
Branch base: dev

Skills a ler ANTES de implementar:
- [nexus-react] — padrões de componentes e hooks
- [nexus-design-system] — tokens de cor e componentes DS
- [nexus-stack] — convenções gerais

Contexto do wrapper/host:
[Descrever o componente pai que envolve o que será implementado.
 Ex: "O OnboardingFlow monta o cosmos background — as screens filhas
 não têm background próprio; herdam do pai."]

## Objetivo
[Uma frase. Ex: "Implementar WelcomeScreen dentro do OnboardingFlow existente."]

## Pré-requisitos (verificar antes de começar)
- [ ] [Componente pai já existe em src/components/X.tsx]
- [ ] [Tipos já definidos em src/types/Y.ts]

## O que fazer

### 1. Criar branch
```bash
git fetch origin dev
git checkout -b feature/nex-XX-[titulo-kebab] origin/dev
```

### 2. Ler o design (não pular esta etapa)
Abrir `[arquivo.html]` e mapear:
- Quais componentes existem e como se encaixam
- O que o wrapper injeta (background, estado global, contexto)
- Strings literais, valores exatos de fonte e animações
- Diferenças entre o que a issue descreve e o que o HTML mostra
  → Anotar as diferenças; seguir o HTML

### 3. [Passo concreto de implementação]
Arquivo: `src/components/[pasta]/[Nome].tsx`
- Interface `[Nome]Props`
- Importar do DS: `[componentes]` de `@brigid-tech/design-system`
- Tokens Tailwind: usar apenas classes `nex-*`
- [Detalhe visual do design — copiar do HTML, não da issue se divergirem]

### 4. [Próximo passo...]

## Arquivos a criar
- `src/components/[pasta]/[Nome].tsx`

## Arquivos a modificar
- `src/components/[pasta]/index.ts` — adicionar export

## Não tocar
- `src/components/design-system/` — sem alterações
- [outros arquivos fora do escopo]

## Validação visual (obrigatória antes do push)
```bash
npm run dev
```
1. Abrir no browser
2. Abrir DevTools → emular 375px (mobile) e 1280px (desktop)
3. Comparar lado a lado com o design:
   - Tipografia: font-family, weight, size
   - Espaçamentos e alinhamentos
   - Cores e gradientes
   - Animações e transições
4. **Só fazer push após confirmação visual**

## Verificação final
```bash
npm run lint    # zero warnings
npm run build   # sem erros
```

## Critérios de conclusão
- [ ] Design lido integralmente (incluindo wrapper/host)
- [ ] Diferenças issue vs HTML identificadas e resolvidas a favor do HTML
- [ ] Validação visual no dev server: 375px e 1280px aprovados
- [ ] [Critério visual específico do design]
- [ ] [Critério de comportamento]
- [ ] lint e build passando
```

---

## FEATURE sem design file

```
## Contexto
Issue Linear: [NEX-XX] — [título]
Stack: React 19 + TypeScript + Supabase via src/api/client.ts
Branch base: dev

Skills a ler ANTES de implementar:
- [nexus-react] — padrões de componentes e hooks
- [nexus-design-system] — tokens de cor e componentes DS
- [nexus-stack] — convenções gerais

## Objetivo
[Uma frase clara do que precisa ser feito]

## Pré-requisitos
- [ ] [O que já deve existir antes de começar]

## O que fazer

### 1. Criar branch
```bash
git fetch origin dev
git checkout -b feature/nex-XX-[titulo-kebab] origin/dev
```

### 2. [Passo concreto]
Arquivo: `src/[path]/[Nome].tsx`
- [Instrução específica]

## Arquivos a criar
- `src/[path]/[Nome].tsx`

## Arquivos a modificar
- `src/[path]/index.ts` — export

## Não tocar
- [o que não alterar]

## Validação visual (se UI)
```bash
npm run dev
```
Verificar em 375px e 1280px no DevTools antes do push.

## Verificação final
```bash
npm run lint && npm run build
```

## Critérios de conclusão
- [ ] [Critério visual ou funcional]
- [ ] lint e build passando
```

---

## BUG — Correção de comportamento incorreto

```
## Contexto
Issue Linear: [NEX-XX] — [título]
Bug: [comportamento errado]
Esperado: [o que deveria acontecer]

## Como reproduzir
1. [passo]
2. [passo]
3. [onde o bug aparece]

## Design de referência (se visual)
[Se o bug é discrepância visual: "O design correto está em [arquivo]. O
 comportamento atual diverge em [detalhe específico]."]

## O que fazer

### 1. Criar branch
```bash
git fetch origin dev
git checkout -b fix/nex-XX-[descricao] origin/dev
```

### 2. Reproduzir e confirmar
[Como ver o bug]

### 3. Corrigir
Arquivo suspeito: `[path]`
[Descrição da correção se já conhecida, ou "investigar a partir de [função]"]

## Critérios de conclusão
- [ ] Comportamento errado não ocorre mais
- [ ] Comportamento esperado verificado (comparar com design se visual)
- [ ] Sem regressões
- [ ] lint e build passando
```

---

## CHORE — Tarefa técnica / manutenção

```
## Contexto
Issue Linear: [NEX-XX] — [título]
Objetivo: [o que resolve]

## O que fazer

### 1. Criar branch
```bash
git fetch origin dev
git checkout -b chore/nex-XX-[descricao] origin/dev
```

### 2. [Tarefa específica]
[Instrução direta]

## Arquivos afetados
- `[path]` — [o que muda]

## Critérios de conclusão
- [ ] [Resultado verificável]
- [ ] Aplicação funciona igual após a mudança
- [ ] lint e build passando
```

---

## REFACTOR — Reestruturação sem mudança de comportamento

```
## Contexto
Issue Linear: [NEX-XX] — [título]
Motivação: [o que está dificultando o desenvolvimento]

## Estado atual
Arquivo: `[path]`
Problema: [duplicação / responsabilidade demais / acoplamento]

## Estado desejado
[Como o código deve ficar — estrutura, separação, interface]

## O que fazer

### 1. Criar branch
```bash
git fetch origin dev
git checkout -b refactor/nex-XX-[descricao] origin/dev
```

### 2. [Passo do refactor]
[Instrução específica]

## Comportamento externo — PRESERVAR
[Props, API pública, endpoints — o que NÃO pode mudar]

## Critérios de conclusão
- [ ] Comportamento externo preservado
- [ ] [Critério estrutural]
- [ ] lint e build passando
```

---

## SUB-TASK — Parte de um card maior

```
## Contexto
Issue Linear: [NEX-XX] — [título da sub-task]
Card pai: [NEX-YY] — [título do pai]
Esta sub-task cobre APENAS: [responsabilidade restrita]

Contexto do card pai (para entender o todo):
[2 frases sobre o objetivo maior]

Design de referência (herdar do card pai):
[Se houver arquivo de design, referenciar o mesmo do pai]

## O que fazer
[Instrução específica e delimitada]

## Interface com outras sub-tasks
Recebe: [o que já existe]
Entrega: [o que esta sub-task produz]

## Arquivos a criar/modificar
- `[path]`

## Critérios de conclusão
- [ ] [Critério específico desta sub-task]
- [ ] Sem alterar arquivos fora do escopo
- [ ] lint e build passando
```

---

## Dicas de otimização de prompt

### Quando o agente tem acesso ao design link (Claude Code online)
```
"Acesse [link] e leia o HTML antes de qualquer implementação.
 O design é a referência final — quando divergir da issue, siga o HTML."
```

### Quando o agente é local (sem acesso ao link)
```
"O arquivo de design está em [path/local/arquivo.html].
 Leia ele inteiro antes de começar — incluindo o componente App/wrapper raiz.
 Não use a issue como única referência visual."
```

### Para componentes que são filhos de um wrapper
```
"Este componente é filho de [WrapperName] que já existe em [path].
 [WrapperName] injeta: [cosmos background / queryClient / estado global].
 Não recrie o que o pai já fornece."
```

### Para evitar over-engineering
```
"Implementar exatamente o descrito. Sem abstrações extras.
 Se surgir necessidade de refactor maior, parar e reportar."
```

### Para forçar validação visual
```
"Antes de qualquer git push:
 1. npm run dev
 2. Abrir DevTools em 375px e 1280px
 3. Comparar pixel a pixel com o design
 4. Só pushar após aprovação visual"
```
