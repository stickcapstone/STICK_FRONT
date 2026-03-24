import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import styles from "./Page4.module.css";

interface Props {
  onAnalyzeDone: () => void;
}

export default function Page4({ onAnalyzeDone }: Props) {
  const [file, setFile]         = useState<File | null>(null);
  const [preview, setPreview]   = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [pct, setPct]           = useState(0);
  const [status, setStatus]     = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const STEPS = [
    [15,  "이미지 업로드 중..."],
    [35,  "이미지 품질 분석 중..."],
    [55,  "메타데이터 추출 중..."],
    [75,  "조작 여부 탐지 중..."],
    [90,  "팩트체크 DB 대조 중..."],
    [100, "분석 완료!"],
  ] as const;

  function handleFile(f: File) {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  }

  function removeFile() {
    setFile(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  function analyze() {
    if (!file) return;
    setLoading(true);
    let i = 0;
    const iv = setInterval(() => {
      if (i >= STEPS.length) {
        clearInterval(iv);
        setTimeout(() => {
          setLoading(false);
          setPct(0);
          onAnalyzeDone();
        }, 500);
        return;
      }
      setPct(Number(STEPS[i][0]));
      setStatus(String(STEPS[i][1]));
      i++;
    }, 550);
  }

  return (
    <div className={styles.page}>
      <div className={styles.glow} />

      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>
            이미지 <span>분석</span>
          </h1>
          <p className={styles.desc}>
            이미지를 업로드하면 AI가 조작 여부와 신뢰도를 분석합니다.<br />
            JPG, PNG 형식을 지원합니다.
          </p>
        </div>

        {/* Drop zone */}
        {!preview ? (
          <div
            className={`${styles.dropzone} ${dragging ? styles.dragging : ""}`}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png"
              className={styles.fileInput}
              onChange={onChange}
            />
            <div className={styles.dropIcon}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <p className={styles.dropTitle}>
              {dragging ? "여기에 놓으세요" : "클릭하거나 이미지를 드래그하세요"}
            </p>
            <p className={styles.dropSub}>JPG, PNG · 최대 20MB</p>
          </div>
        ) : (
          /* Preview */
          <div className={styles.previewWrap}>
            <div className={styles.previewImg}>
              <img src={preview} alt="preview" />
              <button className={styles.removeBtn} onClick={removeFile} title="제거">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className={styles.fileInfo}>
              <div className={styles.fileInfoRow}>
                <div className={styles.fileIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <div className={styles.fileMeta}>
                  <span className={styles.fileName}>{file?.name}</span>
                  <span className={styles.fileSize}>
                    {file ? (file.size / 1024 / 1024).toFixed(2) : 0} MB
                  </span>
                </div>
                <div className={styles.fileReady}>✓ 준비 완료</div>
              </div>
            </div>
          </div>
        )}

        {/* Progress */}
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

        {/* Analyze button */}
        <button
          className={`${styles.analyzeBtn} ${!file || loading ? styles.disabled : ""}`}
          onClick={analyze}
          disabled={!file || loading}
        >
          {loading ? "분석 중..." : "분석 시작"}
        </button>
      </div>
    </div>
  );
}
