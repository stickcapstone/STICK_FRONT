import type { ImageAnalysisData } from "../../../../share/hooks/api";

interface ImageResultSectionProps {
  result: ImageAnalysisData;
}

export default function ImageResultSection({ result }: ImageResultSectionProps) {
  const confidencePct = result.confidence <= 1
    ? Math.round(result.confidence * 100)
    : Math.round(result.confidence);

  const isAI = result.aiGenerated;

  return (
    <section className="w-full rounded-[28px] border border-border bg-panel p-6 animate-[fade-up_.28s_ease]">
      <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
        Image Analysis Result
      </div>

      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <div className="mb-1 text-sm text-muted">판정</div>
          <div className="text-lg font-bold text-text">{result.verdict}</div>
        </div>
        <span
          className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold ${
            isAI
              ? "border-danger/30 bg-danger/10 text-danger"
              : "border-success/30 bg-success/10 text-success"
          }`}
        >
          {isAI ? "AI 생성" : "실제 이미지"}
        </span>
      </div>

      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between font-mono text-[10px] text-muted">
          <span>신뢰도</span>
          <span>{confidencePct}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-base">
          <div
            className={`h-full rounded-full transition-[width] duration-700 ease-out ${
              isAI ? "bg-danger" : "bg-success"
            }`}
            style={{ width: `${confidencePct}%` }}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-base px-5 py-4">
        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
          분석 근거
        </div>
        <p className="text-sm leading-7 text-muted">{result.reason}</p>
      </div>

      {result.fileName && (
        <div className="mt-3 font-mono text-[10px] text-muted/60">
          {result.fileName}
        </div>
      )}
    </section>
  );
}
