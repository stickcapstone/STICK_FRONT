interface ExternalLinkItem {
  id: string;
  label: string;
  description: string;
  href: string;
  tag: string;
}

interface ExternalLinkGridSectionProps {
  items: ExternalLinkItem[];
  title: string;
}

function ExternalLinkCard({
  tag,
  label,
  description,
  href,
}: Omit<ExternalLinkItem, "id">) {
  return (
    <a
      className="group rounded-2xl border border-border bg-base p-4 transition hover:-translate-y-0.5 hover:border-accent"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="rounded-full border border-accent/20 bg-accent-soft px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
          {tag}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition group-hover:text-accent">
          Open
        </span>
      </div>
      <div className="mb-2 text-sm font-semibold text-text">{label}</div>
      <div className="text-sm leading-6 text-muted">{description}</div>
    </a>
  );
}

export default function ExternalLinkGridSection({
  items,
  title,
}: ExternalLinkGridSectionProps) {
  return (
    <section className="rounded-[28px] border border-border bg-panel p-6">
      <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
        {title}
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <ExternalLinkCard
            description={item.description}
            href={item.href}
            key={item.id}
            label={item.label}
            tag={item.tag}
          />
        ))}
      </div>
    </section>
  );
}
