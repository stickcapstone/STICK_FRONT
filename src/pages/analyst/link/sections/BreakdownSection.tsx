import { BREAKDOWN } from "../../../../data/data";
import { getToneMeta } from "./linkAnalysisUtils";

interface BreakdownSectionProps {
  openItemId: string;
  onToggle: (id: string) => void;
}

export default function BreakdownSection({
  openItemId,
  onToggle,
}: BreakdownSectionProps) {
  return (
    <section className="rounded-[28px] border border-border bg-panel p-6">
      <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
        Score Breakdown
      </div>
      <p className="mb-5 text-sm leading-7 text-muted">
        각 항목을 클릭하면 세부 근거가 펼쳐집니다.
      </p>

      <div className="space-y-3">
        {BREAKDOWN.map((item) => {
          const toneMeta = getToneMeta(item.tone);
          const isOpen = openItemId === item.id;

          return (
            <button
              className={`w-full rounded-2xl border p-4 text-left transition ${
                isOpen
                  ? "border-accent bg-base"
                  : "border-border bg-base/70 hover:border-accent/50"
              }`}
              key={item.id}
              onClick={() => onToggle(item.id)}
              type="button"
            >
              <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-sm font-semibold text-text">{item.label}</span>
                    <span
                      className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${toneMeta.chipClassName}`}
                    >
                      {toneMeta.badge}
                    </span>
                  </div>
                  <p className="text-sm leading-6 text-muted">{item.summary}</p>
                </div>
                <div className="shrink-0">
                  <div
                    className={`text-right font-display text-4xl leading-none ${toneMeta.textClassName}`}
                  >
                    {item.score}
                  </div>
                  <div className="text-right font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    points
                  </div>
                </div>
              </div>

              <div className="mb-3 h-2 overflow-hidden rounded-full bg-panel">
                <div
                  className={`h-full rounded-full transition-[width] duration-[1100ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${toneMeta.barClassName}`}
                  style={{ width: `${item.score}%` }}
                />
              </div>

              {isOpen && (
                <div className="rounded-2xl border border-border bg-panel px-4 py-4">
                  <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    상세 근거
                  </div>
                  <div className="space-y-2">
                    {item.details.map((detail) => (
                      <p className="text-sm leading-6 text-muted" key={detail}>
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
