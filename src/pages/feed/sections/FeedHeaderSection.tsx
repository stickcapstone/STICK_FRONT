import { FILTERS } from "../../../data/data";

type Filter = (typeof FILTERS)[number];

interface FeedHeaderSectionProps {
  filter: Filter;
  onSelectFilter: (filter: Filter) => void;
}

export default function FeedHeaderSection({ filter, onSelectFilter }: FeedHeaderSectionProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-[var(--brd)] pb-4">
      <div className="[font-family:var(--fdisp)] text-[22px] tracking-[3px] text-[var(--txt)] sm:text-[28px] sm:tracking-[4px]">
        신뢰도 <span className="text-[var(--accent)]">피드</span>
      </div>
      <div className="flex gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={`shrink-0 cursor-pointer rounded-full px-4 py-1.5 text-[12px] font-medium shadow-[0_1px_4px_rgba(140,155,185,0.06)] transition-all duration-180 ${
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
