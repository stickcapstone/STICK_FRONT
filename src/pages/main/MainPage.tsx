import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ANALYSIS_STEPS } from "../../data/data";
import FeedShortcutSection from "./sections/FeedShortcutSection";
import MainHeroSection from "./sections/MainHeroSection";
import UrlAnalysisSection from "./sections/UrlAnalysisSection";

function isValidHttpUrl(value: string) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export default function MainPage() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pct, setPct] = useState(0);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function validateUrl(nextUrl: string) {
    if (!nextUrl.trim()) {
      setError("분석할 URL을 입력해주세요.");
      return false;
    }

    if (!isValidHttpUrl(nextUrl)) {
      setError("올바른 URL 형식이 아닙니다.");
      return false;
    }

    setError("");
    return true;
  }

  function onChangeURL(nextUrl: string) {
    setUrl(nextUrl);
    validateUrl(nextUrl);
  }

  function analyze() {
    if (!validateUrl(url)) {
      return;
    }

    setLoading(true);
    let index = 0;

    const intervalId = window.setInterval(() => {
      if (index >= ANALYSIS_STEPS.length) {
        window.clearInterval(intervalId);
        window.setTimeout(() => {
          setLoading(false);
          setPct(0);
          setStatus("");
          navigate(`/result?url=${encodeURIComponent(url.trim())}`);
        }, 500);
        return;
      }

      const [nextPct, nextStatus] = ANALYSIS_STEPS[index];
      setPct(nextPct);
      setStatus(nextStatus);
      index += 1;
    }, 550);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-24 pt-20 animate-[fade-up_.28s_ease]">
      <div
        className="pointer-events-none absolute left-1/2 top-[38%] h-[260px] w-[480px] -translate-x-1/2 -translate-y-1/2 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.14) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[600px] text-center">
        <MainHeroSection />
        <UrlAnalysisSection
          focused={focused}
          inputRef={inputRef}
          loading={loading}
          error={error}
          onAnalyze={analyze}
          onBlur={() => setFocused(false)}
          onChangeURL={onChangeURL}
          onFocus={() => setFocused(true)}
          pct={pct}
          status={status}
          url={url}
        />
      </div>

      <FeedShortcutSection />
    </div>
  );
}
