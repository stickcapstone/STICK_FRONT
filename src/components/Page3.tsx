import { useState } from "react";
import { FEED_ITEMS, FILTERS } from "../data/data";
import styles from "./Page3.module.css";

export default function Page3() {
  const [filter, setFilter] = useState("전체");

  const visible =
    filter === "전체" ? FEED_ITEMS : FEED_ITEMS.filter((f) => f.cat === filter);

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
        {visible.map((item, i) => (
          <div className={styles.card} key={i}>
            <div className={styles.thumb} style={{ background: item.bg }}>
              <span className={styles.thumbIcon}>{item.icon}</span>
              <div className={styles.cat}>{item.cat}</div>
              <div className={styles.score}>{item.score}점</div>
            </div>
            <div className={styles.body}>
              <div className={styles.outlet}>
                <span className={styles.check}>✓</span>
                {item.outlet}
              </div>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.meta}>
                <span>{item.time}</span>
                <span className={styles.statusG}>신뢰</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
