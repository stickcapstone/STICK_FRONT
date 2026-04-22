import { useEffect, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeImage } from "../../../share/hooks/api";
import type { ImageAnalysisData } from "../../../share/hooks/api";
import { ServerError } from "../../../share/utils/errors";

type Mode = "image" | "video";


export function useImageAnalysis() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("image");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [result, setResult] = useState<ImageAnalysisData | null>(null);
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
    if (inputRef.current) inputRef.current.value = "";
    setMode(nextMode);
  }

  function handleFile(nextFile: File) {
    const valid = mode === "image"
      ? nextFile.type.startsWith("image/")
      : nextFile.type.startsWith("video/");
    if (!valid) return;
    setResult(null);
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
    setPreview((cur) => { if (cur) URL.revokeObjectURL(cur); return null; });
    if (inputRef.current) inputRef.current.value = "";
  }

  async function analyze() {
    if (!file) return;

    if (mode === "video") return;

setServerError(null);
    setLoading(true);
    try {
      const res = await analyzeImage(file);
      console.log(res.data);
      setResult(res.data.data);
    } catch (err) {
      if (err instanceof ServerError) {
        setServerError(err.message);
      }
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
    result,
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
