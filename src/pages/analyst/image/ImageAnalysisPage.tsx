import type { DragEvent } from "react";
import Page500 from "../../../share/errorPage/ErrorPage";
import { useImageAnalysis } from "./useImageAnalysis";
import ImageAnalysisStatusSection from "./sections/ImageAnalysisStatusSection";
import ImageAnalyzeActionSection from "./sections/ImageAnalyzeActionSection";
import ImageHeroSection from "./sections/ImageHeroSection";
import ImageModeTabSection from "./sections/ImageModeTabSection";
import ImageResultSection from "./sections/ImageResultSection";
import ImageUploadSection from "./sections/ImageUploadSection";
import VideoUploadSection from "../video/sections/VideoUploadSection";

export default function ImageAnalysisPage() {
  const {
    mode, file, preview, dragging, loading, pct, status,
    serverError, result, inputRef,
    switchMode, onDrop, onChange, removeFile, analyze,
    retryAfterError, navigateHome,
  } = useImageAnalysis();

  if (serverError !== null) {
    return (
      <Page500
        message={serverError}
        onRetry={retryAfterError}
        onGoMain={navigateHome}
      />
    );
  }

  const uploadProps = {
    dragging,
    file,
    inputRef,
    onChange,
    onDragLeave: () => {},
    onDragOver: (event: DragEvent) => event.preventDefault(),
    onDrop,
    onRemoveFile: removeFile,
    preview,
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-16 pt-20 animate-[fade-up_.28s_ease]">
      <div
        className="pointer-events-none absolute left-1/2 top-[38%] h-70 w-125 -translate-x-1/2 -translate-y-1/2 blur-3xl"
        style={{ background: "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.14) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 flex w-full max-w-140 flex-col items-center gap-5">
        <ImageHeroSection mode={mode} />
        <ImageModeTabSection loading={loading} mode={mode} onSwitch={switchMode} />

        {mode === "image"
          ? <ImageUploadSection {...uploadProps} />
          : <VideoUploadSection {...uploadProps} />
        }

        <ImageAnalysisStatusSection loading={loading} pct={pct} status={status} />
        <ImageAnalyzeActionSection disabled={!file || loading} loading={loading} onAnalyze={analyze} />
        {result && <ImageResultSection result={result} />}
      </div>
    </div>
  );
}
