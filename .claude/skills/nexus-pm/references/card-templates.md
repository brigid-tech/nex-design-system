# Card Templates — Nexus Creator

Use the template that matches the card type. Fill every section — never leave a section empty. If information is unknown, write `[a confirmar]` and flag it to the user.

---

## FEATURE — Nova Funcionalidade

```markdown
## Objetivo
[O que essa feature entrega para o usuário/produto? 1–2 frases orientadas ao valor.]

## Contexto
[Por que essa feature é necessária agora? Qual problema resolve? Onde se encaixa no produto?]

## Escopo

### Inclui
- [O que está dentro dessa issue]

### Não inclui (fora do escopo)
- [O que explicitamente NÃO deve ser feito aqui — evita scope creep]

## Comportamento Esperado
[Descrição do fluxo do ponto de vista do usuário. Pode ser em formato de user story ou passo a passo.]

**Exemplo de fluxo:**
1. Usuário faz X
2. Sistema responde com Y
3. Usuário vê Z

## Critérios de Aceitação
- [ ] [Critério testável 1]
- [ ] [Critério testável 2]
- [ ] [Critério testável 3]
- [ ] Não quebra funcionalidades existentes relacionadas

## Especificação Técnica

### Frontend (React)
- Componentes afetados: `[ComponentName]`, `[ComponentName]`
- Novos componentes necessários: `[ComponentName]` em `[path sugerido]`
- Estado: [local (useState) / global (context/store) / server state (React Query/SWR)]
- Rotas afetadas: `[/path]`

### Backend (Node.js + Hono)
- Endpoints necessários:
  - `[METHOD] /api/[path]` — [descrição]
- Lógica de negócio: [onde deve ficar, qual service/handler]
- Validações: [regras de validação de input]

### Banco de Dados
- Tabelas/coleções afetadas: `[nome]`
- Migrações necessárias: [sim/não — descrever se sim]
- Índices: [se necessário]

### Integrações
- [Serviços externos, APIs de terceiros, webhooks, etc.]

## Notas para Implementação
[Decisões técnicas importantes, armadilhas conhecidas, dependências entre cards, ordem de implementação sugerida.]

## Referências
- [Links para design, PRD, issues relacionadas, documentação]
```

---

## BUG — Comportamento Incorreto Conhecido

```markdown
## Descrição do Problema
[O que está acontecendo de errado? Seja específico.]

## Comportamento Esperado
[O que deveria acontecer?]

## Comportamento Atual
[O que está acontecendo de fato?]

## Passos para Reproduzir
1. [Passo 1]
2. [Passo 2]
3. [Passo 3 — onde o bug aparece]

## Contexto do Ambiente
- Navegador/plataforma: [se relevante]
- Dados específicos que causam o bug: [se identificado]
- Frequência: [sempre / às vezes / em condições específicas]

## Impacto
- Severidade: [crítico / alto / médio / baixo]
- Usuários afetados: [todos / parcial / edge case]

## Causa Raiz Suspeita
[Se já foi investigado, descrever onde provavelmente está o problema — arquivo, função, lógica.]

## Critérios de Aceitação
- [ ] O comportamento descrito acima não ocorre mais
- [ ] O comportamento esperado foi verificado manualmente
- [ ] Nenhuma regressão introduzida nas funcionalidades relacionadas
- [ ] [Critério específico adicional]

## Arquivos Suspeitos
- `[path/to/file]` — [por quê]

## Notas
[Workarounds temporários existentes? Contexto adicional?]
```

---

## FIX — Correção Pontual (escopo menor que BUG)

```markdown
## O que corrigir
[Descrição direta do que precisa mudar — pode ser uma linha, uma lógica, um valor.]

## Por que está errado
[Contexto mínimo necessário para entender o problema.]

## Como corrigir
[Se já se sabe a solução, descrever aqui. Caso contrário, indicar onde investigar.]

## Arquivo(s) afetado(s)
- `[path/to/file]`

## Critérios de Aceitação
- [ ] [O comportamento específico foi corrigido]
- [ ] Sem regressões
```

---

## CHORE — Tarefa Técnica / Manutenção

```markdown
## Objetivo
[Por que essa tarefa existe? Qual dívida técnica, dependência ou necessidade operacional resolve?]

## Contexto
[O estado atual e por que precisa mudar. Sem isso, um agente não entende a urgência.]

## O que fazer

### Tarefas
- [ ] [Ação específica 1]
- [ ] [Ação específica 2]
- [ ] [Ação específica 3]

## Critérios de Aceitação
- [ ] [Resultado verificável 1]
- [ ] [A aplicação ainda funciona corretamente após a mudança]

## Impacto Esperado
[Performance, segurança, manutenibilidade, DX — qual melhoria concreta isso entrega?]

## Arquivos/Módulos Afetados
- `[path]`

## Notas
[Ordem de execução, dependências, riscos.]
```

---

## REFACTOR — Reestruturação de Código Existente

```markdown
## Objetivo do Refactor
[O que está sendo melhorado — legibilidade, performance, separação de responsabilidades, etc.]

## Estado Atual
[Como o código está hoje. Inclua trechos relevantes se ajudar.]

## Estado Desejado
[Como o código deve ficar após o refactor. Descreva a arquitetura/estrutura esperada.]

## Motivação
[Por que agora? O que está dificultando o desenvolvimento atual?]

## Escopo

### Inclui
- [Arquivos/módulos que serão refatorados]

### Não inclui
- [O que NÃO deve ser alterado — preservar comportamento externo]

## Critérios de Aceitação
- [ ] Todos os testes existentes passam (comportamento externo preservado)
- [ ] [Critério de qualidade específico]
- [ ] [Critério de estrutura específico]
- [ ] Code review aprovado

## Arquivos Afetados
- `[path]` — [o que muda]

## Notas para Implementação
[Estratégia de migração, ordem de refactor, riscos de regressão.]
```

---

## SUB-TASK — Parte de um Card Maior

```markdown
## Card Pai
[Título do card pai — para dar contexto]

## Responsabilidade desta Sub-task
[O que especificamente esta sub-task cobre. Seja cirúrgico — não repita o escopo do card pai.]

## O que fazer
[Instruções diretas e acionáveis para esta sub-task apenas.]

## Critérios de Aceitação
- [ ] [Critério específico desta sub-task]

## Interface com outras Sub-tasks
[O que esta sub-task entrega que outras sub-tasks dependem? O que ela recebe?]

## Notas
[Considerações técnicas específicas desta parte.]
```
