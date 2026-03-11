import { BREAKDOWN, LINKS, REC_ARTICLES, RESULT_SCORE } from "../data/data";
import styles from "./Page2.module.css";

/* helpers */
function getDonutOffset(score) {
  return 377 - (score / 100) * 377;
}
function getScoreColor(score) {
  if (score >= 75) return "var(--grn)";
  if (score >= 50) return "var(--yel)";
  return "var(--red)";
}
function getVerdictCls(score) {
  if (score >= 75) return styles.verdictG;
  if (score >= 50) return styles.verdictY;
  return styles.verdictR;
}
function getVerdictLabel(score) {
  if (score >= 75) return "✅ 신뢰 가능";
  if (score >= 50) return "⚠️ 주의 필요";
  return "🔴 위험";
}

function DonutRing({ score }) {
  const color = getScoreColor(score);
  return (
    <div className={styles.donut}>
      <svg width="144" height="144" viewBox="0 0 144 144">
        <circle className={styles.donutBg} cx="72" cy="72" r="60" />
        <circle
          className={styles.donutFill}
          cx="72" cy="72" r="60"
          style={{ strokeDashoffset: getDonutOffset(score), stroke: color }}
        />
      </svg>
      <div className={styles.donutNum} style={{ color }}>
        {score}<span className={styles.donutUnit}>점</span>
      </div>
    </div>
  );
}

export default function Page2() {
  const score = RESULT_SCORE;

  return (
    <div className={styles.page}>
      <div className={styles.grid}>

        {/* ── Left: score panel ── */}
        <div className={styles.scorePanel}>
          <div className={styles.panelLabel}>신뢰도 종합 점수</div>
          <DonutRing score={score} />
          <div className={`${styles.verdict} ${getVerdictCls(score)}`}>
            {getVerdictLabel(score)}
          </div>
          <div className={styles.urlChip}>
            news.example.com/article/<br />government-policy-2024
          </div>
          
        </div>

        {/* ── Right: detail cards ── */}
        <div className={styles.rightCol}>

          {/* Breakdown */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>항목별 분석</div>
            {BREAKDOWN.map((b) => (
              <div className={styles.barRow} key={b.label}>
                <div className={styles.barHead}>
                  <span className={styles.barName}>{b.label}</span>
                  <span className={`${styles.barVal} ${styles[b.cls]}`}>{b.score}점</span>
                </div>
                <div className={styles.barTrack}>
                  <div
                    className={`${styles.barFill} ${styles[b.cls]}`}
                    style={{ width: `${b.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Reason */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>AI 분석 근거</div>
            <p className={styles.reason}>
              해당 기사는 등록된 언론사에서 발행되었으나 핵심 통계 수치의{" "}
              <span className={styles.hlY}>원본 출처가 불분명</span>합니다.
              "정부 관계자에 따르면"과 같은{" "}
              <span className={styles.hlY}>익명 인용이 3회</span> 사용되었으며,
              동일 사건을 다룬 타 언론사 5곳 중 2곳의 보도와{" "}
              <span className={styles.hlR}>수치가 상이</span>합니다.
              전반적인 논조는 특정 입장으로 치우쳐 있어{" "}
              <span className={styles.hlY}>여론 유도 목적</span>이 포함된 것으로 판단됩니다.
            </p>
          </div>

          {/* Links */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>근거 링크 및 유사 정보</div>
            <div className={styles.linkList}>
              {LINKS.map((l, i) => (
                <div className={styles.linkRow} key={i}>
                  <span className={`${styles.linkTag} ${styles[l.type]}`}>{l.tag}</span>
                  {l.text}
                </div>
              ))}
            </div>
          </div>

          {/* Recommended */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>관련 공식 기사 추천</div>
            <div className={styles.recGrid}>
              {REC_ARTICLES.map((r, i) => (
                <div className={styles.recCard} key={i}>
                  <div className={styles.recOutlet}>{r.outlet}</div>
                  <div className={styles.recTitle}>{r.title}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
