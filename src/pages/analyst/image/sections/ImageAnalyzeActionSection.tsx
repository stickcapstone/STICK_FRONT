interface ImageAnalyzeActionSectionProps {
  disabled: boolean;
  loading: boolean;
  onAnalyze: () => void;
}

export default function ImageAnalyzeActionSection({
  disabled,
  loading,
  onAnalyze,
}: ImageAnalyzeActionSectionProps) {
  return (
    <button
      className="w-full rounded-2xl bg-accent px-6 py-4 text-sm font-bold tracking-[0.02em] text-white transition enabled:hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-35"
      disabled={disabled}
      onClick={onAnalyze}
      type="button"
    >
      {loading ? "분석 중.." : "분석 시작"}
    </button>
  );
}
