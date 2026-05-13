import type { FeedItem } from "../../../data/data";

interface FeedGridSectionProps {
  items: FeedItem[];
}

function getReliability(score: number) {
  if (score <= 49) return {
    label: "위험",
    color: "#ef4444",
    pillClass: "bg-[rgba(239,68,68,0.12)] text-[#ef4444] border border-[rgba(239,68,68,0.3)]",
    barClass: "bg-[#ef4444]",
  };
  if (score <= 79) return {
    label: "주의",
    color: "#f59e0b",
    pillClass: "bg-[rgba(245,158,11,0.12)] text-[#f59e0b] border border-[rgba(245,158,11,0.3)]",
    barClass: "bg-[#f59e0b]",
  };
  return {
    label: "신뢰",
    color: "#10b981",
    pillClass: "bg-[rgba(16,185,129,0.12)] text-[#10b981] border border-[rgba(16,185,129,0.3)]",
    barClass: "bg-[#10b981]",
  };
}

export default function FeedGridSection({ items }: FeedGridSectionProps) {
  if (items.length === 0) {
    return (
      <div className="px-5 py-8 text-center text-[15px] text-[var(--muted)] border border-dashed border-[var(--brd)] rounded-xl bg-[rgba(15,20,28,0.35)]">
        표시할 기사가 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const rel = getReliability(item.score);
        return (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="overflow-hidden rounded-[14px] bg-(--surf) shadow-[0_8px_32px_rgba(140,155,185,0.28)] transition-all duration-200 hover:-translate-y-0.75"
          >
            <div className="flex items-center gap-2.5 px-3 py-2.5">
              <div className="flex flex-1 min-w-0 flex-col gap-px">
                <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold text-(--txt)">
                  {item.outlet}
                </span>
                <span className="[font-family:var(--fmono)] text-[10px] tracking-[1px] text-(--muted)">
                  {item.cat}
                </span>
              </div>
              <span className={`shrink-0 rounded-full px-2.5 py-0.75 [font-family:var(--fmono)] text-[10px] font-semibold tracking-[1px] ${rel.pillClass}`}>
                {rel.label}
              </span>
            </div>

            <div
              className="relative flex w-full aspect-video items-center justify-center overflow-hidden sm:aspect-square"
              style={item.thumbnailUrl ? undefined : { background: item.bg }}
            >
              {item.thumbnailUrl ? (
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <span className="relative z-1 text-5xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)] sm:text-[72px]">
                  {item.icon}
                </span>
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(8,12,20,0.88)]" />

              <div className="absolute bottom-3 left-3 right-3 z-2 sm:bottom-3.5 sm:left-3.5 sm:right-3.5">
                <div className="mb-0.5 [font-family:var(--fmono)] text-[9px] uppercase tracking-[2px] text-white/55">
                  신뢰도
                </div>
                <div
                  className="mb-1 [font-family:var(--fdisp)] text-2xl font-black leading-none sm:text-[30px]"
                  style={{ color: rel.color }}
                >
                  {item.score}
                </div>
                <div className="h-[3px] overflow-hidden rounded-full bg-white/12">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${rel.barClass}`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="px-3 pb-3.5 pt-2.5">
              <p className="mb-1.5 text-[13px] leading-relaxed text-(--txt) line-clamp-3 sm:text-[12px]">
                <span className="font-bold">{item.outlet}</span>{" "}
                {item.title}
              </p>
              <span className="[font-family:var(--fmono)] text-[9px] uppercase tracking-[1px] text-(--muted)">
                {item.time}
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
}
