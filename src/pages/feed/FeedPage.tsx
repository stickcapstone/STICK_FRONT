import { useState, useEffect, useRef, useCallback } from "react";
import { FEED_ITEMS, FILTERS } from "../../data/data";
import FeedHeaderSection from "./sections/FeedHeaderSection";
import FeedGridSection from "./sections/FeedGridSection";

type Filter = (typeof FILTERS)[number];

const PAGE_SIZE = 6;

export default function FeedPage() {
  const [filter, setFilter] = useState<Filter>("전체");
  const [cursor, setCursor] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const all = filter === "전체" ? FEED_ITEMS : FEED_ITEMS.filter((f) => f.cat === filter);
  const visible = all.slice(0, cursor);
  const hasMore = cursor < all.length;

  const handleFilter = (f: Filter) => {
    setFilter(f);
    setCursor(PAGE_SIZE);
  };

  const loadMore = useCallback(() => {
    if (hasMore) setCursor((c) => c + PAGE_SIZE);
  }, [hasMore]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMore(); },
      { threshold: 0.1 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className="min-h-screen pt-[76px] pb-[60px] animate-[fadeUp_0.28s_ease]">
      <div className="w-full max-w-[1060px] mx-auto px-6 flex flex-col gap-6">

        <FeedHeaderSection
          filter={filter}
          onSelectFilter={handleFilter}
        />

        <FeedGridSection items={visible} />

        {/* 무한 스크롤 sentinel */}
        <div ref={sentinelRef} className="h-12 flex items-center justify-center">
          {hasMore && (
            <span className="[font-family:var(--fmono)] text-xl tracking-[6px] text-[var(--muted)] animate-[loading-pulse_1.2s_ease-in-out_infinite]">
              · · ·
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
