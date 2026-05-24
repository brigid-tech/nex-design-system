import { ArrowLeft } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/playground/toasts", label: "Toasts" },
  { href: "/playground/validation", label: "Validação" },
];

export function PageLayout({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  const current = window.location.pathname;

  return (
    <div className="min-h-screen bg-nex-bg-primary px-6 py-8 md:px-10">
      <nav className="mb-8 flex items-center gap-4">
        <a
          href="/"
          className="flex items-center gap-1.5 text-body-sm text-nex-text-tertiary transition-colors hover:text-nex-text-primary"
        >
          <ArrowLeft size={14} />
          Playground
        </a>
        <span className="text-nex-border-default">·</span>
        <div className="flex items-center gap-3">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={
                l.href === current
                  ? "text-body-sm font-semibold text-nex-brand-cyan"
                  : "text-body-sm text-nex-text-tertiary transition-colors hover:text-nex-text-primary"
              }
            >
              {l.label}
            </a>
          ))}
        </div>
      </nav>

      <header className="mb-8 flex flex-col gap-1">
        <span className="text-label uppercase tracking-[0.2em] text-nex-text-tertiary">{eyebrow}</span>
        <h1 className="font-display text-display text-nex-text-primary">{title}</h1>
        <p className="text-body text-nex-text-secondary">{subtitle}</p>
      </header>

      {children}
    </div>
  );
}

export function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3 rounded-xl border border-nex-border-subtle bg-nex-bg-secondary/40 p-5">
      <h2 className="text-label uppercase tracking-widest text-nex-text-tertiary">{title}</h2>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}
