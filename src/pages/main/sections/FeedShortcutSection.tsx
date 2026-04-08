interface FeedShortcutSectionProps {
  onGoFeed: () => void;
}

export default function FeedShortcutSection({ onGoFeed }: FeedShortcutSectionProps) {
  return (
    <button
      className="mt-12 inline-flex items-center gap-2 rounded-full border border-border bg-panel px-6 py-3 text-sm text-muted transition hover:-translate-y-0.5 hover:border-accent hover:text-text sm:absolute sm:bottom-9 sm:mt-0"
      onClick={onGoFeed}
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
