interface ImageAnalysisStatusSectionProps {
  loading: boolean;
}

export default function ImageAnalysisStatusSection({ loading }: ImageAnalysisStatusSectionProps) {
  if (!loading) return null;

  return (
    <p className="animate-pulse font-mono text-[11px] tracking-[0.12em] text-muted">
      서버 응답 대기 중..
    </p>
  );
}
