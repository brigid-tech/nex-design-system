import { useState } from "react";
import {
  Button,
  Input,
  InputShell, InputAffix,
  Textarea,
  Select,
  Checkbox,
  Radio, RadioCard,
  Badge,
  Mention,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  EntityCard,
  Toast,
  Modal,
  Avatar,
  Sidebar,
  type SidebarSection,
} from "@nexus-creator-app/design-system";
import {
  Sparkles, Zap, Crown, Check, TriangleAlert, Trash2,
  UserRound, MapPin, Shield, Package, Skull, Calendar,
  Info, Link, Search, X, Lock, EyeOff, Mail, Flag,
} from "lucide-react";

/* ─── helpers ─── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-display text-h2 text-nex-text-primary border-b border-nex-border-subtle pb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Row({ children, wrap = true }: { children: React.ReactNode; wrap?: boolean }) {
  return (
    <div className={`flex ${wrap ? "flex-wrap" : ""} items-center gap-3`}>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-label text-nex-text-tertiary uppercase tracking-widest">{children}</p>
  );
}

/* ─── App ─── */
export default function App() {
  const [activeSection, setActiveSection] = useState<SidebarSection>("characters");
  const [modalOpen, setModalOpen] = useState(false);
  const [inputError, setInputError] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        universe={{ name: "Aetheria", entityCount: 51 }}
        user={{ name: "João Silva", initials: "JS", plan: "Pro" }}
        counts={{ characters: 24, places: 12, factions: 6, items: 11, creatures: 5, events: 9, articles: 18 }}
        onAddEntity={() => setModalOpen(true)}
      />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto px-10 py-8 flex flex-col gap-12">

        {/* Header */}
        <div className="flex flex-col gap-1">
          <span className="text-label text-nex-text-tertiary tracking-[0.2em]">✦ NEXUS CREATOR ✦</span>
          <h1 className="font-display text-display text-nex-text-primary">
            Design System{" "}
            <span className="bg-gradient-to-r from-nex-brand-cyan to-nex-brand-violet bg-clip-text text-transparent">
              Playground
            </span>
          </h1>
          <p className="text-body text-nex-text-secondary">
            Visualize todos os componentes do design system em um único lugar.
          </p>
        </div>

        {/* ── Colors ── */}
        <Section title="Cores">
          <Label>Backgrounds</Label>
          <Row>
            {[
              { label: "bg-primary", bg: "var(--nex-bg-primary)", border: true },
              { label: "bg-secondary", bg: "var(--nex-bg-secondary)" },
              { label: "bg-elevated", bg: "var(--nex-bg-elevated)" },
              { label: "bg-hover", bg: "var(--nex-bg-hover)" },
            ].map((c) => (
              <div key={c.label} className="flex flex-col gap-1 items-center">
                <div
                  className="w-16 h-16 rounded-lg border border-nex-border-default"
                  style={{ background: c.bg }}
                />
                <span className="text-caption text-nex-text-tertiary">{c.label}</span>
              </div>
            ))}
          </Row>

          <Label>Brand</Label>
          <Row>
            <div className="flex flex-col gap-1 items-center">
              <div className="w-16 h-16 rounded-lg" style={{ background: "var(--nex-brand-cyan)" }} />
              <span className="text-caption text-nex-text-tertiary">cyan</span>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <div className="w-16 h-16 rounded-lg" style={{ background: "var(--nex-brand-violet)" }} />
              <span className="text-caption text-nex-text-tertiary">violet</span>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <div className="w-32 h-16 rounded-lg" style={{ background: "var(--nex-brand-gradient)" }} />
              <span className="text-caption text-nex-text-tertiary">gradient</span>
            </div>
          </Row>

          <Label>Semânticas</Label>
          <Row>
            {(["success", "warning", "error", "info"] as const).map((s) => (
              <div key={s} className="flex flex-col gap-1 items-center">
                <div className="w-16 h-16 rounded-lg" style={{ background: `var(--nex-${s})` }} />
                <span className="text-caption text-nex-text-tertiary">{s}</span>
              </div>
            ))}
          </Row>

          <Label>Entidades</Label>
          <Row>
            {(["character", "place", "faction", "item", "creature", "event"] as const).map((e) => (
              <div key={e} className="flex flex-col gap-1 items-center">
                <div className="w-14 h-14 rounded-lg border" style={{
                  background: `var(--nex-entity-${e}-bg)`,
                  borderColor: `var(--nex-entity-${e}-border)`,
                  color: `var(--nex-entity-${e})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {e === "character" && <UserRound size={20} />}
                  {e === "place"     && <MapPin    size={20} />}
                  {e === "faction"   && <Shield    size={20} />}
                  {e === "item"      && <Package   size={20} />}
                  {e === "creature"  && <Skull     size={20} />}
                  {e === "event"     && <Calendar  size={20} />}
                </div>
                <span className="text-caption text-nex-text-tertiary">{e}</span>
              </div>
            ))}
          </Row>
        </Section>

        {/* ── Typography ── */}
        <Section title="Tipografia">
          <p className="font-display text-[48px] font-bold leading-tight tracking-tight">Display XL · Cinzel</p>
          <p className="font-display text-[36px] font-bold leading-tight">Display · Cinzel</p>
          <p className="font-display text-h1">H1 · Cinzel 28px</p>
          <p className="text-h2">H2 · Inter 22px</p>
          <p className="text-h3">H3 · Inter 18px</p>
          <p className="text-h4">H4 · Inter 15px</p>
          <p className="text-body-lg text-nex-text-secondary">Body LG · 16px — Crie mundos mais rápido com uma wiki leve e referências em tempo real.</p>
          <p className="text-body text-nex-text-secondary">Body · 14px — Atualize a entidade fonte uma vez, e toda referência atualiza instantaneamente.</p>
          <p className="text-body-sm text-nex-text-tertiary">Body SM · 13px — Nexus Creator. Seu mundo, totalmente conectado.</p>
          <p className="text-caption text-nex-text-tertiary">Caption · 12px — Metadados e labels secundários</p>
          <p className="text-label text-nex-text-secondary uppercase tracking-widest">Label · 11px uppercase</p>
          <p className="font-mono text-body-sm text-nex-brand-cyan">@Kael.idade = 32 · JetBrains Mono</p>
        </Section>

        {/* ── Buttons ── */}
        <Section title="Botões">
          <Label>Sólidos · gradient & magic</Label>
          <Row>
            <Button variant="gradient"><Sparkles size={16} />Entrar no beta</Button>
            <Button variant="magic"><Sparkles size={16} />Invocar Arquivista</Button>
            <Button variant="secondary">Cancelar</Button>
            <Button variant="ghost">Ver mais</Button>
          </Row>

          <Label>Sólidos · brand</Label>
          <Row>
            <Button variant="cyan"><Zap size={16} />Publicar wiki</Button>
            <Button variant="violet"><UserRound size={16} />Criar personagem</Button>
            <Button variant="gold"><Crown size={16} />Upgrade Pro</Button>
          </Row>

          <Label>Outlined · brand</Label>
          <Row>
            <Button variant="outline-cyan"><Zap size={16} />Publicar wiki</Button>
            <Button variant="outline-violet"><UserRound size={16} />Criar personagem</Button>
            <Button variant="outline-gold"><Crown size={16} />Upgrade Pro</Button>
          </Row>

          <Label>Sólidos · semantic</Label>
          <Row>
            <Button variant="success"><Check size={16} />Salvar mundo</Button>
            <Button variant="warning"><TriangleAlert size={16} />Continuar mesmo assim</Button>
            <Button variant="info"><Info size={16} />Saber mais</Button>
            <Button variant="error"><Trash2 size={16} />Excluir entidade</Button>
          </Row>

          <Label>Outlined · semantic</Label>
          <Row>
            <Button variant="outline-success"><Check size={16} />Confirmar</Button>
            <Button variant="outline-warning"><TriangleAlert size={16} />Atenção</Button>
            <Button variant="outline-info"><Info size={16} />Detalhes</Button>
            <Button variant="outline-error"><Trash2 size={16} />Excluir</Button>
          </Row>

          <Label>Tamanhos & Estados</Label>
          <Row>
            <Button variant="gradient" size="sm">SM</Button>
            <Button variant="gradient" size="md">MD</Button>
            <Button variant="gradient" size="lg">LG</Button>
            <Button variant="cyan" loading>Salvando…</Button>
            <Button variant="gradient" disabled>Desabilitado</Button>
          </Row>
        </Section>

        {/* ── Inputs ── */}
        <Section title="Inputs">
          <div className="grid grid-cols-2 gap-4 max-w-2xl">
            <div className="flex flex-col gap-1.5">
              <label className="text-label text-nex-text-secondary uppercase tracking-widest">Nome da entidade</label>
              <Input placeholder="Ex: Kael" defaultValue="Kael" />
              <span className="text-caption text-nex-text-tertiary">Use letras, números e ponto.</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-label text-nex-text-secondary uppercase tracking-widest">Tipo</label>
              <Select>
                <option>Personagem</option>
                <option>Local</option>
                <option>Facção</option>
              </Select>
              <span className="text-caption text-nex-text-tertiary">Define o ícone e a cor do chip.</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-label text-nex-text-secondary uppercase tracking-widest">Buscar</label>
              <InputShell>
                <InputAffix><Search size={16} /></InputAffix>
                <input type="text" placeholder="Personagens, lugares, eventos…" />
              </InputShell>
              <span className="text-caption text-nex-text-tertiary">Cmd+K abre a busca global.</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-label text-nex-text-secondary uppercase tracking-widest">Filtro ativo</label>
              <InputShell>
                <input type="text" defaultValue="tag:facção dourada" />
                <InputAffix as="button" aria-label="Limpar"><X size={16} /></InputAffix>
              </InputShell>
              <span className="text-caption text-nex-text-tertiary">Clique no X para remover o filtro.</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-label text-nex-text-secondary uppercase tracking-widest">Senha</label>
              <InputShell>
                <InputAffix><Lock size={16} /></InputAffix>
                <input type="password" defaultValue="passwordpassword" className="font-mono" />
                <InputAffix as="button" aria-label="Mostrar senha"><EyeOff size={16} /></InputAffix>
              </InputShell>
              <span className="text-caption text-nex-text-tertiary">Mínimo de 12 caracteres.</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-label text-nex-text-secondary uppercase tracking-widest">Email</label>
              <InputShell>
                <InputAffix><Mail size={16} /></InputAffix>
                <input type="email" defaultValue="kael@arquivista.app" />
                <InputAffix className="text-nex-success"><Check size={16} /></InputAffix>
              </InputShell>
              <span className="text-caption text-nex-text-tertiary">Verificado.</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-label text-nex-text-secondary uppercase tracking-widest">Handle</label>
              <InputShell>
                <InputAffix text="prefix">@</InputAffix>
                <input type="text" defaultValue="kael" className="font-mono" />
              </InputShell>
              <span className="text-caption text-nex-text-tertiary">nexuscreator.app/u/kael</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-label text-nex-text-secondary uppercase tracking-widest">Idade do mundo</label>
              <InputShell>
                <input type="number" defaultValue="1247" />
                <InputAffix text="suffix">anos</InputAffix>
              </InputShell>
              <span className="text-caption text-nex-text-tertiary">Usado em @mundo.idade.</span>
            </div>

            <div className="flex flex-col gap-1.5 col-span-2">
              <label className="text-label text-nex-text-secondary uppercase tracking-widest">Descrição</label>
              <Textarea placeholder="O guerreiro Kael, agora @Kael.idade anos…" rows={3} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-label text-nex-text-secondary uppercase tracking-widest">Email (erro)</label>
              <InputShell error>
                <InputAffix className="text-nex-error"><Mail size={16} /></InputAffix>
                <input type="email" defaultValue="kael@" />
              </InputShell>
              <span className="text-caption text-nex-error flex items-center gap-1">
                <X size={12} /> Endereço de email inválido.
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-label text-nex-text-secondary uppercase tracking-widest">Facção</label>
              <InputShell>
                <InputAffix className="text-nex-entity-faction"><Flag size={16} /></InputAffix>
                <input type="text" defaultValue="Ordem Dourada" />
                <InputAffix as="button" aria-label="Abrir seletor"><Search size={16} /></InputAffix>
              </InputShell>
              <span className="text-caption text-nex-text-tertiary">Abre o seletor de facções.</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-label text-nex-text-secondary uppercase tracking-widest">Email (input simples)</label>
              <Input
                error={inputError}
                defaultValue="kael@"
                onFocus={() => setInputError(true)}
                onBlur={() => setInputError(false)}
              />
              <span className={`text-caption flex items-center gap-1 ${inputError ? "text-nex-error" : "text-nex-text-tertiary"}`}>
                {inputError ? "Endereço de email inválido." : "Clique para ver estado de erro."}
              </span>
            </div>
          </div>
        </Section>

        {/* ── Checkbox ── */}
        <Section title="Checkboxes">
          <Label>Termos & comunicações</Label>
          <div className="flex flex-col gap-3 max-w-md">
            <Checkbox
              defaultChecked
              label={
                <>
                  Aceito os <a href="#" className="text-nex-brand-cyan hover:underline">termos</a>{" "}
                  e a <a href="#" className="text-nex-brand-cyan hover:underline">política de privacidade</a>
                </>
              }
            />
            <Checkbox label="Quero receber novidades do beta no meu e-mail" />
          </div>

          <Label>Estados</Label>
          <Row>
            <Checkbox label="Padrão" />
            <Checkbox label="Marcado" defaultChecked />
            <Checkbox label="Indeterminado" indeterminate />
            <Checkbox label="Desabilitado" disabled />
            <Checkbox label="Marcado · off" defaultChecked disabled />
            <Checkbox label="Com erro" error />
          </Row>
        </Section>

        {/* ── Radio ── */}
        <Section title="Radio buttons">
          <Label>Você é, principalmente…</Label>
          <div className="flex flex-wrap gap-2.5">
            <RadioCard name="role" defaultChecked label="Mestre RPG" />
            <RadioCard name="role" label="Escritor" />
            <RadioCard name="role" label="Outro" />
          </div>

          <Label>Visibilidade do mundo</Label>
          <div className="flex flex-col gap-3 max-w-md p-4 rounded-lg bg-nex-bg-secondary border border-nex-border-subtle">
            <Radio
              name="visibility"
              defaultChecked
              label="Privado"
              description="Apenas você e colaboradores convidados podem ver."
            />
            <Radio
              name="visibility"
              label="Link secreto"
              description="Qualquer pessoa com o link pode visualizar (sem indexação)."
            />
            <Radio
              name="visibility"
              label="Público"
              description="Aparece em nexuscreator.app/explore."
            />
            <Radio
              name="visibility"
              disabled
              label={<>Comercial <span className="text-nex-brand-gold">(Pro)</span></>}
              description="Disponível em planos pagos."
            />
          </div>

          <Label>Estados</Label>
          <Row>
            <Radio name="s1" label="Padrão" />
            <Radio name="s2" defaultChecked label="Selecionado" />
            <Radio name="s3" disabled label="Desabilitado" />
            <Radio name="s4" defaultChecked disabled label="Selecionado · off" />
          </Row>
        </Section>

        {/* ── Badges ── */}
        <Section title="Badges de entidade">
          <Row>
            {(["character", "place", "faction", "item", "creature", "event"] as const).map((e) => (
              <Badge key={e} entity={e} />
            ))}
          </Row>
          <Row>
            {(["character", "place", "faction", "item", "creature", "event"] as const).map((e) => (
              <Badge key={e} entity={e} size="sm" />
            ))}
          </Row>
        </Section>

        {/* ── Mentions ── */}
        <Section title="Mentions">
          <p className="text-body text-nex-text-secondary leading-loose">
            O personagem{" "}
            <Mention entity="character">@Kael</Mention>{" "}
            nasceu em{" "}
            <Mention entity="place">@Cidades.Eldor</Mention>{" "}
            e lidera a{" "}
            <Mention entity="faction">@OrdemDoVeu</Mention>.
            Sua arma é{" "}
            <Mention entity="item">@Espada.Nexus</Mention>{" "}
            e enfrenta o{" "}
            <Mention entity="creature">@Dragao.Ember</Mention>{" "}
            na{" "}
            <Mention entity="event">@GuerrasEmber</Mention>.
          </p>
          <p className="text-body text-nex-text-secondary leading-loose">
            Com valor resolvido:{" "}
            <Mention entity="character" resolved="32">@Kael.idade</Mention>{" "}
            <Mention entity="place" resolved="Eldor">@Kael.cidade</Mention>
          </p>
        </Section>

        {/* ── Avatars ── */}
        <Section title="Avatars">
          <Row>
            <Avatar initials="JS" size={24} />
            <Avatar initials="JS" size={32} />
            <Avatar initials="NC" size={40} />
            <Avatar initials="AB" size={48} glow />
            <Avatar initials="XY" size={56} glow />
          </Row>
        </Section>

        {/* ── Cards ── */}
        <Section title="Cards">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Card padrão</CardTitle>
                <CardDescription>Sem efeito especial — superfície base do app.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body-sm text-nex-text-tertiary">Conteúdo do card.</p>
              </CardContent>
              <CardFooter>
                <span className="text-caption text-nex-text-tertiary flex items-center gap-1"><Link size={12} />12 backlinks</span>
              </CardFooter>
            </Card>

            <Card elevated>
              <CardHeader>
                <CardTitle>Card elevado</CardTitle>
                <CardDescription>bg-elevated — para modais e painéis flutuantes.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body-sm text-nex-text-tertiary">Conteúdo do card.</p>
              </CardContent>
            </Card>

            <Card glassMagic>
              <CardHeader>
                <CardTitle>Glass Magic</CardTitle>
                <CardDescription>Hover para ver o efeito arcano de gradiente.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body-sm text-nex-text-tertiary">Passe o mouse aqui.</p>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* ── Entity Cards ── */}
        <Section title="Entity Cards">
          <div className="grid grid-cols-2 gap-4 max-w-3xl">
            <EntityCard
              name="Kael"
              handle="@kael"
              entity="character"
              fields={[
                { label: "Idade", value: "32" },
                { label: "Raça", value: "Humano" },
                { label: "Nascimento", value: "@Cidades.Eldor", span: true },
              ]}
              articleCount={4}
              backlinkCount={12}
            />
            <EntityCard
              name="Eldor"
              handle="@eldor"
              entity="place"
              fields={[
                { label: "Estado", value: "Silverlands" },
                { label: "População", value: "12 000" },
                { label: "Bandeira", value: "@Cidades.Eldor.bandeira", span: true },
              ]}
              articleCount={2}
              backlinkCount={27}
            />
            <EntityCard
              name="Ordem do Véu"
              handle="@ordem-do-veu"
              entity="faction"
              fields={[
                { label: "Líder", value: "@Maelis" },
                { label: "Sede", value: "@Eldor" },
                { label: "Alinhamento", value: "Neutro · oculto", span: true },
              ]}
              articleCount={6}
              backlinkCount={18}
            />
            <EntityCard
              name="Guerras Ember"
              handle="@guerras-ember"
              entity="event"
              fields={[
                { label: "Início", value: "812 d.C." },
                { label: "Fim", value: "839 d.C." },
                { label: "Vencedor", value: "@OrdemDoVeu", span: true },
              ]}
              articleCount={9}
              backlinkCount={44}
            />
          </div>
        </Section>

        {/* ── Toasts ── */}
        <Section title="Toasts">
          <div className="flex flex-col gap-3 max-w-sm">
            <Toast variant="success" title="Entidade criada" description="@Kael foi adicionada a Aetheria." action={<Button variant="ghost" size="sm">Abrir</Button>} onClose={() => {}} />
            <Toast variant="warning" title="Referência quebrada" description="@Cidades.Bryn não existe mais. 3 artigos afetados." action={<Button variant="ghost" size="sm">Resolver</Button>} onClose={() => {}} />
            <Toast variant="error" title="Falha ao salvar" description="Verifique sua conexão e tente novamente." action={<Button variant="ghost" size="sm">Tentar de novo</Button>} onClose={() => {}} />
            <Toast variant="info" title="Wiki publicada" description="nexuscreator.app/u/aetheria · indexada em ~2 min." action={<Button variant="ghost" size="sm">Copiar link</Button>} onClose={() => {}} />
            <Toast variant="brand" title="Arquivista pronto" description="Indexou 51 entidades. Pergunte qualquer coisa." action={<Button variant="ghost" size="sm">Perguntar</Button>} onClose={() => {}} />
          </div>
        </Section>

        {/* ── Modal ── */}
        <Section title="Modal">
          <Row>
            <Button variant="secondary" onClick={() => setModalOpen(true)}>Abrir modal</Button>
          </Row>
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Excluir entidade"
            description="Essa ação não pode ser desfeita. Todos os artigos que referenciam @Kael vão perder o vínculo e as menções ficarão quebradas."
            footer={
              <>
                <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button>
                <Button variant="destructive" onClick={() => setModalOpen(false)}><Trash2 size={14} />Excluir</Button>
              </>
            }
          />
        </Section>

        {/* ── Glows & Animations ── */}
        <Section title="Glows & Animações">
          <Row>
            <div className="w-24 h-24 rounded-xl bg-nex-bg-elevated border border-nex-border-default animate-glow-pulse flex items-center justify-center">
              <span className="text-caption text-nex-text-tertiary text-center">glow-pulse</span>
            </div>
            <div className="w-24 h-24 rounded-xl bg-nex-bg-elevated border border-nex-border-default animate-glow-pulse-cyan flex items-center justify-center">
              <span className="text-caption text-nex-text-tertiary text-center">glow-cyan</span>
            </div>
            <div className="w-24 h-24 rounded-xl bg-nex-bg-elevated border border-nex-border-default animate-glow-pulse-violet flex items-center justify-center">
              <span className="text-caption text-nex-text-tertiary text-center">glow-violet</span>
            </div>
            <div className="w-24 h-24 rounded-xl bg-nex-bg-elevated border border-nex-border-default animate-magic-breathe flex items-center justify-center">
              <span className="text-caption text-nex-text-tertiary text-center">magic-breathe</span>
            </div>
          </Row>
        </Section>

        {/* ── Spacing & Radius ── */}
        <Section title="Espaçamento & Radius">
          <Label>Border radius scale</Label>
          <Row wrap={false}>
            {(["sm", "md", "lg", "xl", "full"] as const).map((r) => (
              <div key={r} className="flex flex-col gap-1 items-center">
                <div
                  className={`w-14 h-14 bg-nex-bg-elevated border border-nex-border-default rounded-${r}`}
                />
                <span className="text-caption text-nex-text-tertiary">{r}</span>
              </div>
            ))}
          </Row>

          <Label>Sombras / Elevação</Label>
          <Row>
            {(["elevation-1", "elevation-2", "elevation-3", "elevation-4"] as const).map((s) => (
              <div key={s} className="flex flex-col gap-1 items-center">
                <div className={`w-16 h-16 bg-nex-bg-elevated rounded-lg shadow-${s}`} />
                <span className="text-caption text-nex-text-tertiary">{s}</span>
              </div>
            ))}
          </Row>
        </Section>

        <div className="h-16" />
      </main>
    </div>
  );
}
