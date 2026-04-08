import { REC_ARTICLES } from "../../../../data/data";

export default function RecommendedArticlesSection() {
  return (
    <section className="rounded-[28px] border border-border bg-panel p-6">
      <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
        공식 기사 추천
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        {REC_ARTICLES.map((article) => (
          <a
            className="group rounded-2xl border border-border bg-base p-4 transition hover:-translate-y-0.5 hover:border-accent"
            href={article.href}
            key={article.id}
            rel="noreferrer"
            target="_blank"
          >
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
              {article.outlet}
            </div>
            <div className="mb-3 text-sm font-semibold leading-6 text-text">{article.title}</div>
            <div className="text-sm leading-6 text-muted">{article.summary}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
