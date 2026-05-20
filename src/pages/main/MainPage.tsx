import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeUrl } from "../../share/hooks/api";
import { isValidHttpUrl } from "../../share/utils/url";
import FeedShortcutSection from "./sections/FeedShortcutSection";
import MainHeroSection from "./sections/MainHeroSection";
import UrlAnalysisSection from "./sections/UrlAnalysisSection";

export default function MainPage() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
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

  async function analyze() {
    if (!validateUrl(url)) return;

    setLoading(true);
    setError("");

    try {
      const res = await analyzeUrl(url.trim());
      navigate(`/result?id=${res.data.data.analysisId}`);
    } catch {
      setError("분석에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
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
          url={url}
        />
      </div>

      <FeedShortcutSection />
    </div>
  );
}
