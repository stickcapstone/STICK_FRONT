import styles from "./Navbar.module.css";

export default function Navbar({ page, setPage }) {
  const tabs = ["분석", "결과", "신뢰도 피드", "이미지 분석"];

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        VERI<span>WEB</span>
      </div>
      <div className={styles.tabs}>
        {tabs.map((label, i) => (
          <button
            key={i}
            className={`${styles.tab} ${page === i + 1 ? styles.active : ""}`}
            onClick={() => setPage(i + 1)}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
