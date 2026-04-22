export interface VideoAnalysisResult {
  fileName: string;
  aiGenerated: boolean;
  confidence: number;
  verdict: string;
  reason: string;
  totalFrames: number;
  aiFrames: number;
}

interface Props {
  result: VideoAnalysisResult;
}

export default function VideoAnalysisResultSection({ result }: Props) {
  const confidencePct = result.confidence > 1 ? result.confidence : Math.round(result.confidence * 100);
  const isAI = result.aiGenerated;

  return (
    <div className="w-full animate-[fade-up_.28s_ease]">
      <div
        className={`rounded-3xl border ${
          isAI ? "border-red-500/30 bg-red-500/5" : "border-green-500/30 bg-green-500/5"
        } p-5`}
      >
        <div className="mb-4 flex items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
              isAI ? "bg-red-500/15 text-red-400" : "bg-green-500/15 text-green-400"
            }`}
          >
            {isAI ? (
              <svg fill="none" height="20" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="20">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="8" y2="12" />
                <line x1="12" x2="12.01" y1="16" y2="16" />
              </svg>
            ) : (
              <svg fill="none" height="20" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="20">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>

          <div>
            <div className={`text-sm font-bold ${isAI ? "text-red-400" : "text-green-400"}`}>
              {result.verdict}
            </div>
            <div className="font-mono text-[10px] text-muted">{result.fileName}</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] text-muted">
            <span>AI 감지 신뢰도</span>
            <span className={`font-semibold ${isAI ? "text-red-400" : "text-green-400"}`}>
              {confidencePct}%
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-panel-2">
            <div
              className={`h-full rounded-full transition-[width] duration-700 ease-out ${
                isAI ? "bg-red-400" : "bg-green-400"
              }`}
              style={{ width: `${confidencePct}%` }}
            />
          </div>
        </div>

        {result.reason && (
          <div className="mb-4 rounded-2xl border border-border bg-panel px-4 py-3">
            <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-muted">분석 근거</div>
            <p className="text-xs leading-relaxed text-text">{result.reason}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2">
          <StatCard label="전체 프레임" value={result.totalFrames.toLocaleString()} />
          <StatCard
            label="AI 프레임"
            value={result.aiFrames.toLocaleString()}
            highlight={isAI}
          />
          <StatCard
            label="AI 비율"
            value={`${result.totalFrames > 0 ? Math.round((result.aiFrames / result.totalFrames) * 100) : 0}%`}
            highlight={isAI}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-panel px-3 py-2.5 text-center">
      <div className="font-mono text-[9px] uppercase tracking-widest text-muted">{label}</div>
      <div className={`mt-0.5 text-sm font-bold ${highlight ? "text-red-400" : "text-text"}`}>
        {value}
      </div>
    </div>
  );
}
