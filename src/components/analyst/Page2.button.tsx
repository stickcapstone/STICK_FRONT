import styles from "./Page2.module.css";

interface Props {
  onGoMain: () => void;
}

export default function Page2Button({ onGoMain } : Props) {
    return (
        <div>    
          <button className={`${styles.reAnalyze}`} onClick={onGoMain}>
            다시 분석하기
          </button>
        </div>
    )
}