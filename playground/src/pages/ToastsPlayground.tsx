import { Toast, Button, Avatar } from "@nexus-creator-app/design-system";
import { Undo2 } from "lucide-react";
import { PageLayout, Panel } from "./PageLayout";

export default function ToastsPlayground() {
  return (
    <PageLayout
      eyebrow="C1 · ToastsScene"
      title="Toasts"
      subtitle="Confirmações de cadastro, atividade da equipe e posicionamento."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Confirmações de cadastro */}
        <Panel title="Confirmações de cadastro">
          <Toast
            variant="success"
            title="Entidade criada"
            description="@Kael foi adicionada a Aetheria."
            action={<Button variant="ghost" size="sm">Abrir</Button>}
            onClose={() => {}}
          />
          <Toast
            variant="info"
            title="3 entidades importadas"
            description="Migradas de Notion · 47 menções foram religadas."
            action={<Button variant="ghost" size="sm">Ver lista</Button>}
            onClose={() => {}}
          />
          <Toast
            variant="warning"
            title="Referência quebrada"
            description="@Cidades.Bryn não existe. 3 artigos afetados."
            action={<Button variant="ghost" size="sm">Resolver</Button>}
            onClose={() => {}}
          />
          <Toast
            variant="error"
            title="Falha ao salvar"
            description="Conexão interrompida. Mantivemos seu rascunho."
            action={<Button variant="ghost" size="sm">Tentar de novo</Button>}
            onClose={() => {}}
          />
          <Toast
            variant="info"
            title="Wiki publicada"
            description="nexuscreator.app/u/aetheria indexada em ~2 min."
            action={<Button variant="ghost" size="sm">Copiar link</Button>}
            onClose={() => {}}
          />
          <Toast
            variant="brand"
            title="Arquivista pronto"
            description="Indexou 51 entidades · entendeu 187 menções."
            action={<Button variant="ghost" size="sm">Perguntar</Button>}
            onClose={() => {}}
          />
        </Panel>

        <div className="flex flex-col gap-6">
          {/* Atividade da equipe */}
          <Panel title="Atividade da equipe">
            <Toast
              variant="default"
              icon={<Avatar initials="MV" size={24} />}
              title="Maelis comentou em @Kael"
              description="“Acho que a idade dele devia ser 34, não 32.”"
              action={
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">Responder</Button>
                  <Button variant="cyan" size="sm">Aplicar mudança</Button>
                </div>
              }
              onClose={() => {}}
            />
            <Toast
              variant="default"
              icon={<Undo2 size={14} strokeWidth={2} />}
              title="@veyla foi excluída."
              description="Desfazer em 5s…"
              action={
                <Button variant="ghost" size="sm" className="text-nex-brand-cyan">
                  Desfazer
                </Button>
              }
              onClose={() => {}}
            />
            <div className="relative flex flex-col gap-2 overflow-hidden rounded-lg border border-nex-border-default bg-nex-bg-elevated p-3 shadow-elevation-2">
              <div className="flex items-center justify-between">
                <span className="text-body-sm font-semibold text-nex-text-primary">
                  Indexando entidade…
                </span>
                <span className="font-mono text-caption text-nex-text-tertiary">64%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-nex-bg-secondary">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-nex-brand-cyan to-nex-brand-violet"
                  style={{ width: "64%" }}
                />
              </div>
            </div>
          </Panel>

          {/* Posicionamento */}
          <Panel title="Posicionamento">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-nex-border-default bg-nex-bg-primary p-2">
              <div className="absolute right-2 top-2 w-52">
                <Toast variant="success" title="Entidade criada" description="@Kael adicionada." />
                <span className="mt-1 block text-right text-caption text-nex-text-tertiary">top-right · sistema</span>
              </div>
              <div className="absolute left-1/2 top-1/2 w-52 -translate-x-1/2 -translate-y-1/2">
                <Toast variant="brand" title="Arquivista pronto" description="Indexou 51 entidades." />
                <span className="mt-1 block text-center text-caption text-nex-text-tertiary">center · Arquivista</span>
              </div>
              <div className="absolute bottom-2 right-2 w-52">
                <Toast
                  variant="default"
                  icon={<Undo2 size={14} strokeWidth={2} />}
                  title="@veyla foi excluída."
                  action={<Button variant="ghost" size="sm" className="text-nex-brand-cyan">Desfazer</Button>}
                />
                <span className="mt-1 block text-right text-caption text-nex-text-tertiary">bottom-right · ações</span>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </PageLayout>
  );
}
