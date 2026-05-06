import { useNavigate } from "react-router-dom";

export default function FeedShortcutSection() {
  const navigate = useNavigate();

  return (
    <button
      className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 inline-flex items-center gap-2 rounded-full border border-border bg-panel/95 px-6 py-3 text-sm text-muted shadow-lg backdrop-blur-md transition hover:-translate-y-0.5 hover:border-accent hover:text-text md:absolute md:bottom-9 md:translate-x-0 md:left-auto md:shadow-none md:backdrop-blur-none"
      onClick={() => navigate("/feed")}
      type="button"
    >
      <svg
        fill="none"
        height="13"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="13"
      >
        <rect height="7" rx="1" width="7" x="3" y="3" />
        <rect height="7" rx="1" width="7" x="14" y="3" />
        <rect height="7" rx="1" width="7" x="14" y="14" />
        <rect height="7" rx="1" width="7" x="3" y="14" />
      </svg>
      피드 보기
    </button>
  );
}
