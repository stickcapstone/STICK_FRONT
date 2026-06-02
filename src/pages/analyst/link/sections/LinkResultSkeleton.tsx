export default function LinkResultSkeleton() {
  return (
    <div className="min-h-screen px-6 pb-16 pt-20 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">

        {/* Summary 카드 */}
        <div className="rounded-[28px] border border-border bg-panel p-6 lg:p-7">
          <div className="skeleton mb-4 h-3 w-36 rounded-full" />
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="space-y-4">
              <div>
                <div className="skeleton mb-2 h-3 w-16 rounded-full" />
                <div className="skeleton h-14 w-full rounded-2xl" />
              </div>
              <div className="skeleton h-32 w-full rounded-2xl" />
            </div>
            <div className="skeleton h-64 w-full rounded-[24px]" />
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-5">
            {/* Breakdown 카드 */}
            <div className="rounded-[28px] border border-border bg-panel p-6">
              <div className="skeleton mb-5 h-3 w-28 rounded-full" />
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="skeleton h-14 w-full rounded-2xl" />
                ))}
              </div>
            </div>
            {/* 추천 기사 카드 */}
            <div className="rounded-[28px] border border-border bg-panel p-6">
              <div className="skeleton mb-5 h-3 w-24 rounded-full" />
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="skeleton h-16 w-full rounded-2xl" />
                ))}
              </div>
            </div>
          </div>

          {/* 사이드 */}
          <div className="space-y-5">
            <div className="skeleton h-48 w-full rounded-[28px]" />
            <div className="skeleton h-16 w-full rounded-[28px]" />
          </div>
        </div>

      </div>
    </div>
  );
}
