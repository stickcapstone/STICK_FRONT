type Mode = "image" | "video";

interface ImageModeTabSectionProps {
  mode: Mode;
  loading: boolean;
  onSwitch: (mode: Mode) => void;
}

export default function ImageModeTabSection({ mode, loading, onSwitch }: ImageModeTabSectionProps) {
  return (
    <div className="flex w-full gap-1 rounded-2xl border border-border bg-panel p-1">
      <button
        className={`flex-1 rounded-xl py-2.5 text-xs font-semibold transition ${
          mode === "image" ? "bg-accent text-white" : "text-muted hover:text-text"
        }`}
        disabled={loading}
        onClick={() => onSwitch("image")}
        type="button"
      >
        이미지
      </button>
      <button
        className={`flex-1 rounded-xl py-2.5 text-xs font-semibold transition ${
          mode === "video" ? "bg-accent text-white" : "text-muted hover:text-text"
        }`}
        disabled={loading}
        onClick={() => onSwitch("video")}
        type="button"
      >
        영상
      </button>
    </div>
  );
}
