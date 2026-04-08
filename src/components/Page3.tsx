import { useState } from "react";
import { FEED_ITEMS, FILTERS } from "../data/data";
import styles from "./Page3.module.css";

export default function Page3() {
  const [filter, setFilter] = useState("전체");

  const visible =
    filter === "전체" ? FEED_ITEMS : FEED_ITEMS.filter((f) => f.cat === filter);

  const getReliability = (score: number) => {
    if (score <= 49) {
      return {
        label: "위험",
        badgeClass: styles.badgeDanger,
        statusClass: styles.statusDanger,
      };
    }
    if (score <= 79) {
      return {
        label: "주의",
        badgeClass: styles.badgeWarn,
        statusClass: styles.statusWarn,
      };
    }
    return {
      label: "신뢰",
      badgeClass: styles.badgeGood,
      statusClass: styles.statusGood,
    };
  };

  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <div className={styles.heading}>
          신뢰도 <span>피드</span>
        </div>
        <div className={styles.filters}>
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`${styles.fil} ${filter === f ? styles.active : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {visible.length === 0 && (
          <div className={styles.empty}>표시할 기사가 없습니다.</div>
        )}
        {visible.map((item, i) => {
          const reliability = getReliability(item.score);
          return (
          <div
            className={styles.card}
            key={i}
            onClick={() => item.url && window.open(item.url, "_blank", "noopener,noreferrer")}
            style={item.url ? { cursor: "pointer" } : undefined}
          >
            <div className={styles.thumb} style={{ background: item.bg }}>
              <span className={styles.thumbIcon}>{item.icon}</span>
              <div className={styles.cat}>{item.cat}</div>
              <div className={`${styles.score} ${reliability.badgeClass}`}>
                {item.score}점
              </div>
            </div>
            <div className={styles.body}>
              <div className={styles.outlet}>
                <span className={styles.check}>✓</span>
                {item.outlet}
              </div>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.meta}>
                <span>{item.time}</span>
                <span className={reliability.statusClass}>
                  {reliability.label}
                </span>
              </div>
            </div>
          </div>
        );
        })}
      </div>
    </div>
  );
}
