interface NavbarProps {
  page: number;
  setPage: (page: 1 | 2 | 3 | 4) => void;
}

const tabs = ["분석", "결과", "피드", "AI 분석"] as const;

export default function Navbar({ page, setPage }: NavbarProps) {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-base/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-12">
        <button
          className="font-display text-2xl tracking-[0.3em] text-text transition hover:text-accent"
          onClick={() => setPage(1)}
          type="button"
        >
          VERI<span className="text-accent">WEB</span>
        </button>

        <div className="flex max-w-[70vw] items-center gap-1 overflow-x-auto">
          {tabs.map((label, index) => {
            const tabPage = (index + 1) as 1 | 2 | 3 | 4;

            return (
              <button
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-medium transition sm:px-4 ${
                  page === tabPage
                    ? "bg-accent-soft text-accent"
                    : "text-muted hover:bg-panel-2 hover:text-text"
                }`}
                key={label}
                onClick={() => setPage(tabPage)}
                type="button"
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
