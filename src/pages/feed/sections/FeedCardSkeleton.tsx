export default function FeedCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[14px] bg-(--surf) shadow-[0_4px_16px_rgba(140,155,185,0.10)]">
      <div className="flex items-center gap-2.5 px-3 py-2.5">
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="skeleton h-3.5 w-24 rounded-full" />
          <div className="skeleton h-2.5 w-12 rounded-full" />
        </div>
        <div className="skeleton h-5 w-10 rounded-full" />
      </div>

      <div className="skeleton aspect-video w-full sm:aspect-square" />

      <div className="px-3 pb-3.5 pt-2.5 space-y-2">
        <div className="skeleton h-3 w-full rounded-full" />
        <div className="skeleton h-3 w-4/5 rounded-full" />
        <div className="skeleton h-3 w-3/5 rounded-full" />
        <div className="mt-3 skeleton h-2.5 w-16 rounded-full" />
      </div>
    </div>
  );
}
