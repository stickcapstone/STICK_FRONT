interface ImageAnalysisStatusSectionProps {
  loading: boolean;
  pct: number;
  status: string;
}

export default function ImageAnalysisStatusSection({
  loading,
  pct,
  status,
}: ImageAnalysisStatusSectionProps) {
  if (!loading) return null;

  if (pct > 0) {
    return (
      <div className="w-full">
        <div className="mb-2 flex items-center justify-between font-mono text-[10px] text-muted">
          <span>{status}</span>
          <span>{pct}%</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-panel-2">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-300 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <p className="animate-pulse font-mono text-[11px] tracking-[0.12em] text-muted">
      서버 응답 대기 중..
    </p>
  );
}
