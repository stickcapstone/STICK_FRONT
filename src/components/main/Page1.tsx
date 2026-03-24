import { useEffect, useRef, useState } from "react";
import { ANALYSIS_STEPS } from "../../data/data";
import styles from "./Page1.module.css";

export default function Page1({ onGoFeed, onAnalyzeDone }: { onGoFeed: () => void; onAnalyzeDone: () => void }) {
  const [url, setUrl]         = useState("");
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pct, setPct]         = useState(0);
  const [status, setStatus]   = useState("");
  const [error, setError]     = useState("")

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function onChangeURL(url : string) {
    setUrl(url)
    const regex = /^https?:\/\/[^\s]+$/;
    
    if (!url) {
      setError("URL을 입력해 주세요")
      return false;
    } else if(!regex.test(url)) {
      setError("올바른 URL형식이 아닙니다")
      return false;
    } else {
      setError(" ")
    }

  }


  function analyze() {
    const regex = /^https?:\/\/[^\s]+$/;

    if (!url) {
      setError("URL을 입력해 주세요")
      return false;
    } else if(!regex.test(url)) {
      return false;
    }

    if (!url.trim()) return;
    setLoading(true);
    let i = 0;
    const iv = setInterval(() => {
      if (i >= ANALYSIS_STEPS.length) {
        clearInterval(iv);
        setTimeout(() => {
          setLoading(false);
          setPct(0);
          onAnalyzeDone();
        }, 500);
        return;
      }
      setPct(Number(ANALYSIS_STEPS[i][0]));
      setStatus(String(ANALYSIS_STEPS[i][1]));
      i++;
    }, 550);
  }

  return (
    <div className={styles.page}>
      <div className={styles.glow} />

      <div className={styles.hero}>
        <div className={styles.title}>
          VERI<span>WEB</span>
        </div>

        <p className={styles.desc}>
          URL을 입력하면 AI가 기사의 신뢰도를 분석합니다.<br />
          출처, 근거, 표현 방식까지 다각도로 검증해 허위정보를 탐지합니다.
        </p>

        <div className={`${styles.searchWrap} ${focused ? styles.focused : ""}`}>
          <div className={styles.searchIco}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <input
            className={styles.input}
            placeholder="분석할 URL을 입력하세요"
            ref={inputRef}
            value={url}
            onChange={(e) => onChangeURL(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => e.key === "Enter" && analyze()}
          />
          <button className={styles.goBtn} onClick={analyze}>
            분석 시작
          </button>
        </div>

        {loading && (
          <div className={styles.progress}>
            <div className={styles.progressMeta}>
              <span>{status}</span>
              <span>{pct}%</span>
            </div>
            <div className={styles.progressTrack}>
              <div className={styles.progressBar} style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}
        <p className={styles.hint}>뉴스 기사, 블로그, SNS 링크 모두 지원</p>
        <p className={`${styles.error} ${error ? styles.show : " "}`}>
          {error}
        </p>
      </div>

      <button className={styles.feedPill} onClick={onGoFeed}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
        신뢰도 피드 보기
      </button>
    </div>
  );
}
