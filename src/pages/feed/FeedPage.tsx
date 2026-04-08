import { useState } from "react";
import { FEED_ITEMS, FILTERS } from "../../data/data";
import FeedGridSection from "./sections/FeedGridSection";
import FeedHeaderSection from "./sections/FeedHeaderSection";

type Filter = (typeof FILTERS)[number];

export default function FeedPage() {
  const [filter, setFilter] = useState<Filter>(FILTERS[0]);

  const visible =
    filter === "전체" ? FEED_ITEMS : FEED_ITEMS.filter((item) => item.cat === filter);

  return (
    <div className="min-h-screen px-6 pb-16 pt-20 animate-[fade-up_.28s_ease] lg:px-12">
      <div className="flex flex-col gap-6">
        <FeedHeaderSection
          filter={filter}
          onSelectFilter={setFilter}
          visibleCount={visible.length}
        />
        <FeedGridSection items={visible} />
      </div>
    </div>
  );
}
