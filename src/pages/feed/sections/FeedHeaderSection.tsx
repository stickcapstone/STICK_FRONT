import { FILTERS } from "../../../data/data";

type Filter = (typeof FILTERS)[number];

interface FeedHeaderSectionProps {
  filter: Filter;
  visibleCount: number;
  onSelectFilter: (filter: Filter) => void;
}

export default function FeedHeaderSection({
  filter,
  visibleCount,
  onSelectFilter,
}: FeedHeaderSectionProps) {
  return (
    <section className="mx-auto max-w-7xl rounded-[28px] border border-border bg-panel p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="font-display text-4xl tracking-[0.25em] text-text">
            FEED<span className="text-accent">BOARD</span>
          </div>
          <p className="mt-3 text-sm leading-7 text-muted">
            신뢰도 높은 기사들을 주제별로 모아볼 수 있는 큐레이션 피드입니다.
          </p>
        </div>

        <div className="text-left lg:text-right">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            Current Filter
          </div>
          <div className="mt-1 text-sm text-muted">
            {filter} 카테고리에서 {visibleCount}개의 기사를 표시 중입니다.
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              filter === item
                ? "border-accent bg-accent-soft text-accent"
                : "border-border bg-base text-muted hover:border-slate-700 hover:text-text"
            }`}
            key={item}
            onClick={() => onSelectFilter(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}
