import { Link } from "react-router-dom";
import { useAnalysisHistory } from "../../../share/hooks/useAnalysisHistory";

function getScoreMeta(score: number) {
  if (score >= 80) return { label: "신뢰", scoreClass: "text-success", chipClass: "text-success border-success/30 bg-success/10" };
  if (score >= 50) return { label: "주의", scoreClass: "text-warning", chipClass: "text-warning border-warning/30 bg-warning/10" };
  return                  { label: "위험", scoreClass: "text-danger",  chipClass: "text-danger  border-danger/30  bg-danger/10"  };
}

export default function AnalysisHistorySection() {
  const { history, clearHistory } = useAnalysisHistory();

  if (history.length === 0) return null;

  return (
    <div className="mx-auto mt-8 w-full max-w-[540px] text-left">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          최근 분석
        </span>
        <button
          type="button"
          onClick={clearHistory}
          className="font-mono text-[10px] text-muted/60 transition hover:text-danger"
        >
          전체 삭제
        </button>
      </div>

      <ul className="flex flex-col gap-1.5">
        {history.map((item) => {
          const meta = getScoreMeta(item.score);
          const date = new Date(item.analyzedAt).toLocaleDateString("ko-KR", {
            month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit",
          });

          return (
            <li key={item.id}>
              <Link
                to={`/result?id=${item.id}`}
                className="flex items-center gap-6 rounded-2xl border border-border bg-panel px-4 py-3 transition hover:border-accent/50 hover:bg-panel-2"
              >
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap font-mono text-[11px] text-text">
                    {item.url}
                  </span>
                  <span className="font-mono text-[10px] text-muted/60">{date}</span>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span className={`font-display text-lg leading-none ${meta.scoreClass}`}>
                    {item.score}
                  </span>
                  <span className={`rounded-full border px-2 py-0.5 font-mono text-[9px] font-semibold ${meta.chipClass}`}>
                    {meta.label}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
