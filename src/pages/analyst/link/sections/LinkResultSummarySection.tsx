import { getScoreLabel, getScoreTone, getToneMeta } from "./linkAnalysisUtils";

interface LinkResultSummarySectionProps {
  analyzedUrl: string;
  displayedScore: number;
  finalScore: number;
  summary: string;
}

export default function LinkResultSummarySection({
  analyzedUrl,
  displayedScore,
  finalScore,
  summary,
}: LinkResultSummarySectionProps) {
  const scoreMeta = getToneMeta(getScoreTone(finalScore));

  return (
    <section className="rounded-[28px] border border-border bg-panel p-6 lg:p-7">
      <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
        Link Analysis Result
      </div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-4">
          <div>
            <div className="mb-2 text-sm text-muted">분석한 URL</div>
            <div className="rounded-2xl border border-border bg-base px-4 py-4 font-mono text-xs leading-6 break-all text-text">
              {analyzedUrl}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-base px-5 py-5">
            <div className="mb-2 text-sm font-semibold text-text">AI 요약</div>
            <p className="text-sm leading-7 text-muted">{summary}</p>
          </div>
        </div>

        <aside className="rounded-[24px] border border-border bg-base p-6 text-center">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            최종 신뢰도 점수
          </div>
          <div className={`font-display text-[92px] leading-none ${scoreMeta.textClassName}`}>
            {displayedScore}
          </div>
          <div className="mb-4 font-mono text-xs text-muted">/100</div>
          <div
            className={`mb-4 inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold ${scoreMeta.chipClassName}`}
          >
            {getScoreLabel(finalScore)}
          </div>
          <div className="mb-5 h-3 overflow-hidden rounded-full bg-panel">
            <div
              className={`h-full rounded-full transition-[width] duration-[1100ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${scoreMeta.barClassName}`}
              style={{ width: `${displayedScore}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-2 text-[11px] text-muted">
            <div className="rounded-xl border border-danger/20 bg-danger/10 px-2 py-2">
              위험
              <div className="mt-1 font-mono text-[10px]">0-49</div>
            </div>
            <div className="rounded-xl border border-warning/20 bg-warning/10 px-2 py-2">
              주의
              <div className="mt-1 font-mono text-[10px]">50-79</div>
            </div>
            <div className="rounded-xl border border-success/20 bg-success/10 px-2 py-2">
              신뢰
              <div className="mt-1 font-mono text-[10px]">80-100</div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
