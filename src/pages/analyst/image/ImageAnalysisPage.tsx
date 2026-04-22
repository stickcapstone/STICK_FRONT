import { useEffect, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import ImageAnalysisStatusSection from "./sections/ImageAnalysisStatusSection";
import ImageAnalyzeActionSection from "./sections/ImageAnalyzeActionSection";
import ImageHeroSection from "./sections/ImageHeroSection";
import ImageUploadSection from "./sections/ImageUploadSection";
import VideoUploadSection from "../video/sections/VideoUploadSection";

type Mode = "image" | "video";

interface Props {
  onAnalyzeDone: () => void;
}

const IMAGE_STEPS = [
  [15, "이미지 업로드 확인 중.."],
  [35, "이미지 구조 분석 중.."],
  [55, "메타데이터 추출 중.."],
  [75, "조작 여부 탐지 중.."],
  [90, "팩트체크 데이터베이스 대조 중.."],
  [100, "분석 완료!"],
] as const;

const VIDEO_STEPS = [
  [15, "영상 업로드 확인 중.."],
  [30, "프레임 추출 중.."],
  [50, "프레임 분석 중.."],
  [65, "음성 분석 중.."],
  [80, "조작 여부 탐지 중.."],
  [92, "팩트체크 데이터베이스 대조 중.."],
  [100, "분석 완료!"],
] as const;

export default function ImageAnalysisPage({ onAnalyzeDone }: Props) {
  const [mode, setMode] = useState<Mode>("image");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pct, setPct] = useState(0);
  const [status, setStatus] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  function switchMode(nextMode: Mode) {
    if (nextMode === mode) return;

    setPreview((currentPreview) => {
      if (currentPreview) URL.revokeObjectURL(currentPreview);
      return null;
    });
    setFile(null);
    setDragging(false);
    if (inputRef.current) inputRef.current.value = "";
    setMode(nextMode);
  }

  function handleFile(nextFile: File) {
    const valid =
      mode === "image"
        ? nextFile.type.startsWith("image/")
        : nextFile.type.startsWith("video/");

    if (!valid) return;

    setFile(nextFile);
    setPreview((currentPreview) => {
      if (currentPreview) URL.revokeObjectURL(currentPreview);
      return URL.createObjectURL(nextFile);
    });
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);

    const nextFile = event.dataTransfer.files[0];
    if (nextFile) handleFile(nextFile);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const nextFile = event.target.files?.[0];
    if (nextFile) handleFile(nextFile);
  }

  function removeFile() {
    setFile(null);
    setPreview((currentPreview) => {
      if (currentPreview) URL.revokeObjectURL(currentPreview);
      return null;
    });

    if (inputRef.current) inputRef.current.value = "";
  }

  function analyze() {
    if (!file) return;

    setLoading(true);
    let index = 0;
    const STEPS = mode === "image" ? IMAGE_STEPS : VIDEO_STEPS;

    const intervalId = window.setInterval(() => {
      if (index >= STEPS.length) {
        window.clearInterval(intervalId);
        window.setTimeout(() => {
          setLoading(false);
          setPct(0);
          setStatus("");
          onAnalyzeDone();
        }, 500);
        return;
      }

      const [nextPct, nextStatus] = STEPS[index];
      setPct(nextPct);
      setStatus(nextStatus);
      index += 1;
    }, 550);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-16 pt-20 animate-[fade-up_.28s_ease]">
      <div
        className="pointer-events-none absolute left-1/2 top-[38%] h-70 w-125 -translate-x-1/2 -translate-y-1/2 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.14) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex w-full max-w-140 flex-col items-center gap-5">
        <ImageHeroSection mode={mode} />

        <div className="flex w-full gap-1 rounded-2xl border border-border bg-panel p-1">
          <button
            className={`flex-1 rounded-xl py-2.5 text-xs font-semibold transition ${
              mode === "image" ? "bg-accent text-white" : "text-muted hover:text-text"
            }`}
            disabled={loading}
            onClick={() => switchMode("image")}
            type="button"
          >
            이미지
          </button>
          <button
            className={`flex-1 rounded-xl py-2.5 text-xs font-semibold transition ${
              mode === "video" ? "bg-accent text-white" : "text-muted hover:text-text"
            }`}
            disabled={loading}
            onClick={() => switchMode("video")}
            type="button"
          >
            영상
          </button>
        </div>

        {mode === "image" ? (
          <ImageUploadSection
            dragging={dragging}
            file={file}
            inputRef={inputRef}
            onChange={onChange}
            onDragLeave={() => setDragging(false)}
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDrop={onDrop}
            onRemoveFile={removeFile}
            preview={preview}
          />
        ) : (
          <VideoUploadSection
            dragging={dragging}
            file={file}
            inputRef={inputRef}
            onChange={onChange}
            onDragLeave={() => setDragging(false)}
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDrop={onDrop}
            onRemoveFile={removeFile}
            preview={preview}
          />
        )}

        <ImageAnalysisStatusSection loading={loading} pct={pct} status={status} />
        <ImageAnalyzeActionSection
          disabled={!file || loading}
          loading={loading}
          onAnalyze={analyze}
        />
      </div>
    </div>
  );
}
