import { useEffect, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeImage, analyzeVideo } from "../../../share/hooks/api";
import type { ImageAnalysisData, VideoAnalysisData } from "../../../share/hooks/api";
import { getErrorMessage } from "../../../share/utils/errors";

type Mode = "image" | "video";

export function useImageAnalysis() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("image");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [result, setResult] = useState<ImageAnalysisData | null>(null);
  const [videoResult, setVideoResult] = useState<VideoAnalysisData | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function switchMode(nextMode: Mode) {
    if (nextMode === mode) return;
    setPreview((cur) => { if (cur) URL.revokeObjectURL(cur); return null; });
    setFile(null);
    setDragging(false);
    setVideoResult(null);
    setVideoError(null);
    if (inputRef.current) inputRef.current.value = "";
    setMode(nextMode);
  }

  const SIZE_LIMIT = mode === "image" ? 20 * 1024 * 1024 : 200 * 1024 * 1024; // 이미지 20MB, 영상 200MB
  const SIZE_LABEL = mode === "image" ? "20MB" : "200MB";

  function handleFile(nextFile: File) {
    const validType = mode === "image"
      ? nextFile.type.startsWith("image/")
      : nextFile.type.startsWith("video/");

    if (!validType) {
      setFileError(mode === "image" ? "이미지 파일만 업로드할 수 있습니다." : "영상 파일만 업로드할 수 있습니다.");
      return;
    }

    if (nextFile.size > SIZE_LIMIT) {
      setFileError(`파일 크기가 너무 큽니다. ${SIZE_LABEL} 이하의 파일을 사용해주세요. (현재: ${(nextFile.size / 1024 / 1024).toFixed(1)}MB)`);
      return;
    }

    setFileError(null);
    setResult(null);
    setVideoResult(null);
    setVideoError(null);
    setFile(nextFile);
    setPreview((cur) => { if (cur) URL.revokeObjectURL(cur); return URL.createObjectURL(nextFile); });
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
    setResult(null);
    setVideoResult(null);
    setVideoError(null);
    setFileError(null);
    setPreview((cur) => { if (cur) URL.revokeObjectURL(cur); return null; });
    if (inputRef.current) inputRef.current.value = "";
  }

  async function analyze() {
    if (!file) return;

    if (mode === "video") {
      setLoading(true);
      setVideoResult(null);
      setVideoError(null);
      try {
        const res = await analyzeVideo(file);
        if (res.data.success) {
          setVideoResult(res.data.data);
        } else {
          setVideoError(res.data.message ?? "분석에 실패했습니다.");
        }
      } catch (err) {
        setVideoError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
      return;
    }

    setServerError(null);
    setLoading(true);
    try {
      const res = await analyzeImage(file);
      setResult(res.data.data);
    } catch (err) {
      setServerError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  function retryAfterError() {
    setServerError(null);
    analyze();
  }

  return {
    mode,
    file,
    preview,
    dragging,
    loading,
    serverError,
    fileError,
    result,
    videoResult,
    videoError,
    inputRef,
    switchMode,
    onDrop,
    onChange,
    removeFile,
    analyze,
    retryAfterError,
    navigateHome: () => navigate("/"),
  };
}
