import { Alert, FormField, Input, Mention } from "@brigid-tech/design-system";
import { PageLayout, Panel } from "./PageLayout";

const errorMicrocopy: { pattern: string; message: string }[] = [
  { pattern: "REQUIRED", message: "Este campo é obrigatório para criar a entidade." },
  { pattern: "CONFLICT", message: '"Kael" já existe em Aetheria. Tente "Kael Vandros" ou abra o existente.' },
  { pattern: "FORMAT", message: "Use apenas letras minúsculas, números e hífen." },
  { pattern: "RANGE", message: 'Idade não pode ser negativa. Use "Eras desde" para tempos antigos.' },
  { pattern: "REFERENCE", message: "Entidade @Cidades.Bryn não existe. Salvar como stub?" },
  { pattern: "QUOTA", message: "Limite gratuito de 50 entidades atingido. Upgrade para Pro?" },
];

export default function ValidationPlayground() {
  return (
    <PageLayout
      eyebrow="C2 · ValidationScene"
      title="Validação"
      subtitle="Banners no topo do formulário, validação por campo e microcopy de erro."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Coluna 1 — Banners */}
        <Panel title="Banners no topo do formulário">
          <Alert kind="error" title="Não conseguimos forjar essa entidade ainda" action="Rolar até o erro">
            4 campos precisam de ajuste antes de criar{" "}
            <Mention entity="character">@kael</Mention>.
          </Alert>
          <Alert kind="warning" title="2 menções apontam para stubs" action="Resolver agora">
            <Mention entity="place">@Cidades.Bryn</Mention> e{" "}
            <Mention entity="character">@Veyla</Mention> ainda não existem. Serão criadas vazias.
          </Alert>
          <Alert kind="success" title="Rascunho salvo automaticamente" dismissible={false}>
            Você pode fechar e continuar de qualquer dispositivo em até 30 dias.
          </Alert>
          <Alert kind="info" title="Tipo Personagem adiciona 4 atributos">
            Idade, raça, local de nascimento e facção aparecem por padrão.
          </Alert>
          <Alert kind="brand" title="Quer ajuda? Pergunte ao Arquivista" action="Abrir">
            Posso sugerir nome, descrição e conexões com base no seu canon atual.
          </Alert>
        </Panel>

        {/* Coluna 2 — Inline + microcopy */}
        <div className="flex flex-col gap-6">
          <Panel title="Estados inline / Validação por campo">
            <FormField label="Nome — disponível" success='"Kael Vandros" livre em Aetheria.' htmlFor="v-name-ok">
              <Input id="v-name-ok" defaultValue="Kael Vandros" />
            </FormField>
            <FormField label="Nome — em uso" error="Personagem já existe. Abra o card ou escolha outro nome." htmlFor="v-name-err">
              <Input id="v-name-err" defaultValue="Kael" error />
            </FormField>
            <FormField label="Handle — inválido" error="Use apenas letras minúsculas, números e hífen." htmlFor="v-handle-err">
              <Input id="v-handle-err" defaultValue="Kael Vandros" mono error />
            </FormField>
            <FormField label="Handle — stub" warning="A menção aponta para entidade ainda inexistente." htmlFor="v-handle-warn">
              <Input id="v-handle-warn" defaultValue="cidades.bryn" mono />
            </FormField>
            <FormField label="Idade — válida" htmlFor="v-age">
              <Input id="v-age" type="number" defaultValue="32" />
            </FormField>
          </Panel>

          <Panel title="Microcopy de erro">
            <div className="overflow-hidden rounded-lg border border-nex-border-subtle">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-nex-bg-secondary">
                    <th className="px-3 py-2 text-label uppercase tracking-widest text-nex-text-tertiary">Padrão</th>
                    <th className="px-3 py-2 text-label uppercase tracking-widest text-nex-text-tertiary">Mensagem</th>
                  </tr>
                </thead>
                <tbody>
                  {errorMicrocopy.map((row) => (
                    <tr key={row.pattern} className="border-t border-nex-border-subtle">
                      <td className="px-3 py-2 align-top">
                        <span className="font-mono text-caption text-nex-brand-cyan">{row.pattern}</span>
                      </td>
                      <td className="px-3 py-2 text-body-sm text-nex-text-secondary">{row.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
      </div>
    </PageLayout>
  );
}
