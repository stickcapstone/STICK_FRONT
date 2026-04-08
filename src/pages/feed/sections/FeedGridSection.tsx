import type { FEED_ITEMS } from "../../../data/data";

type FeedItem = (typeof FEED_ITEMS)[number];

interface FeedGridSectionProps {
  items: FeedItem[];
}

function getScoreLabel(score: number) {
  if (score >= 80) {
    return "신뢰";
  }

  if (score >= 50) {
    return "주의";
  }

  return "위험";
}

export default function FeedGridSection({ items }: FeedGridSectionProps) {
  return (
    <section className="mx-auto max-w-7xl">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article
            className="group overflow-hidden rounded-3xl border border-border bg-panel transition hover:-translate-y-1 hover:border-slate-700"
            key={`${item.outlet}-${item.title}`}
          >
            <div
              className="relative flex h-36 items-center justify-center overflow-hidden"
              style={{ background: item.bg }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-panel/90" />
              <span className="relative z-10 font-display text-4xl tracking-[0.2em] text-white/85">
                {item.icon}
              </span>
              <div className="absolute bottom-3 left-3 z-10 rounded-md border border-white/10 bg-black/45 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-slate-300 backdrop-blur-md">
                {item.cat}
              </div>
              <div className="absolute right-3 top-3 z-10 rounded-full border border-success/25 bg-success/10 px-3 py-1 font-mono text-[11px] font-semibold text-success">
                {item.score}%
              </div>
            </div>

            <div className="p-4">
              <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                <span className="text-success">Verified</span>
                {item.outlet}
              </div>
              <div className="mb-3 text-sm font-semibold leading-6 text-text transition group-hover:text-white">
                {item.title}
              </div>
              <div className="flex items-center justify-between font-mono text-[10px] text-muted">
                <span>{item.time}</span>
                <span className="text-success">{getScoreLabel(item.score)}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
