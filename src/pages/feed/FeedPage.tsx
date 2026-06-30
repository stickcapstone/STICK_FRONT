import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { FILTERS } from "../../data/data";
import type { FeedItem } from "../../data/data";
import type { FeedArticleData } from "../../share/hooks/api";
import { getFeed } from "../../share/hooks/api";
import FeedHeaderSection from "./sections/FeedHeaderSection";
import FeedGridSection from "./sections/FeedGridSection";
import FeedCardSkeleton from "./sections/FeedCardSkeleton";

type Filter = (typeof FILTERS)[number];

const PAGE_SIZE = 6;
const SKELETON_ITEMS = Array.from({ length: PAGE_SIZE });

const CATEGORY_META: Record<string, { label: string; bg: string; icon: string }> = {
  POLITICS: { label: "정치", bg: "linear-gradient(135deg,#1e293b,#334155)", icon: "🏛️" },
  ECONOMY:  { label: "경제", bg: "linear-gradient(135deg,#1c2b1e,#14532d)", icon: "📈" },
  IT:       { label: "IT",   bg: "linear-gradient(135deg,#0f1f3c,#1e3a6e)", icon: "💻" },
  HEALTH:   { label: "건강", bg: "linear-gradient(135deg,#1e1b2e,#4c1d95)", icon: "🏥" },
};

function mapToFeedItem(a: FeedArticleData): FeedItem {
  const meta = CATEGORY_META[a.category] ?? { label: a.category, bg: "#1e293b", icon: "📰" };
  const date = a.publishedAt
    ? new Date(a.publishedAt).toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" })
    : "";

  return {
    id: a.id,
    title: a.title,
    href: a.url,
    outlet: a.source,
    cat: meta.label,
    score: a.trustScore,
    thumbnailUrl: a.thumbnailUrl,
    time: date,
    bg: meta.bg,
    icon: meta.icon,
  };
}

export default function FeedPage() {
  const [filter, setFilter] = useState<Filter>("전체");
  const [cursor, setCursor] = useState(PAGE_SIZE);
  const [items, setItems] = useState<FeedItem[]>([]);
  const [feedLoading, setFeedLoading] = useState(true);
  const [feedError, setFeedError] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const fetchFeed = useCallback(() => {
    setFeedLoading(true);
    setFeedError(false);
    getFeed()
      .then((res) => {
        if (res.data.success) {
          setItems(res.data.data.articles.map(mapToFeedItem));
        } else {
          setFeedError(true);
        }
      })
      .catch(() => setFeedError(true))
      .finally(() => setFeedLoading(false));
  }, []);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  const all = useMemo(
    () => (filter === "전체" ? items : items.filter((f) => f.cat === filter)),
    [filter, items],
  );
  const visible = useMemo(() => all.slice(0, cursor), [all, cursor]);
  const hasMore = cursor < all.length;

  const handleFilter = useCallback((f: Filter) => {
    setFilter(f);
    setCursor(PAGE_SIZE);
  }, []);

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

        <FeedHeaderSection filter={filter} onSelectFilter={handleFilter} />

        {feedLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SKELETON_ITEMS.map((_, i) => (
              <FeedCardSkeleton key={i} />
            ))}
          </div>
        ) : feedError ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-danger/30 bg-danger/5 py-16 text-center">
            <p className="text-sm text-muted">피드를 불러오지 못했습니다.</p>
            <button
              type="button"
              onClick={fetchFeed}
              className="rounded-2xl bg-accent px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-600"
            >
              다시 시도
            </button>
          </div>
        ) : (
          <FeedGridSection items={visible} />
        )}

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
