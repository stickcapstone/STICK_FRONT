import type { FEED_ITEMS } from "../../../data/data";

type FeedItem = (typeof FEED_ITEMS)[number];

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
    <div className="grid grid-cols-3 gap-4">
      {items.map((item, i) => {
        const rel = getReliability(item.score);
        return (
          <article
            key={i}
            className="bg-[var(--surf)] rounded-[14px] overflow-hidden transition-all duration-200 hover:-translate-y-[3px] shadow-[0_8px_32px_rgba(140,155,185,0.28)]"
          >
            {/* 포스트 헤더 */}
            <div className="flex items-center gap-[9px] px-3 py-2.5">
              <div className="flex flex-col gap-px flex-1 min-w-0">
                <span className="text-[13px] font-bold text-[var(--txt)] whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.outlet}
                </span>
                <span className="[font-family:var(--fmono)] text-[10px] text-[var(--muted)] tracking-[1px]">
                  {item.cat}
                </span>
              </div>
              <span className={`[font-family:var(--fmono)] text-[10px] font-semibold px-2.5 py-[3px] rounded-full tracking-[1px] shrink-0 ${rel.pillClass}`}>
                {rel.label}
              </span>
            </div>

            {/* 이미지 */}
            <div
              className="w-full aspect-square relative flex items-center justify-center overflow-hidden"
              style={{ background: item.bg }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(8,12,20,0.88)]" />
              <span className="text-[72px] relative z-[1] drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                {item.icon}
              </span>

              {/* 점수 오버레이 */}
              <div className="absolute bottom-[14px] left-[14px] right-[14px] z-[2]">
                <div className="[font-family:var(--fmono)] text-[9px] tracking-[2px] text-white/55 uppercase mb-0.5">
                  신뢰도
                </div>
                <div
                  className="[font-family:var(--fdisp)] text-[30px] font-black leading-none mb-[5px]"
                  style={{ color: rel.color }}
                >
                  {item.score}
                </div>
                <div className="h-[3px] bg-white/12 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${rel.barClass}`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            </div>

            {/* 캡션 */}
            <div className="px-3 pt-2.5 pb-3.5">
              <p className="text-[12px] leading-[1.65] text-[var(--txt)] mb-1.5 line-clamp-3">
                <span className="font-bold">{item.outlet}</span>{" "}
                {item.title}
              </p>
              <span className="[font-family:var(--fmono)] text-[9px] text-[var(--muted)] tracking-[1px] uppercase">
                {item.time}
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
