import { FILTERS } from "../../../data/data";

type Filter = (typeof FILTERS)[number];

interface FeedHeaderSectionProps {
  filter: Filter;
  onSelectFilter: (filter: Filter) => void;
}

export default function FeedHeaderSection({ filter, onSelectFilter }: FeedHeaderSectionProps) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--brd)] pb-4">
      <div className="[font-family:var(--fdisp)] text-[28px] tracking-[4px] text-[var(--txt)]">
        신뢰도 <span className="text-[var(--accent)]">피드</span>
      </div>
      <div className="flex gap-1.5">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={`text-[12px] font-medium px-4 py-1.5 rounded-full cursor-pointer transition-all duration-[180ms] shadow-[0_4px_16px_rgba(140,155,185,0.28)] ${
              filter === f
                ? "bg-[var(--aglow)] text-[var(--accent)]"
                : "bg-transparent text-[var(--muted)] hover:text-[var(--txt)]"
            }`}
            onClick={() => onSelectFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}
