import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeUrl } from "../../share/hooks/api";
import { getErrorMessage } from "../../share/utils/errors";
import { getUrlValidationError } from "../../share/utils/url";
import FeedShortcutSection from "./sections/FeedShortcutSection";
import MainHeroSection from "./sections/MainHeroSection";
import UrlAnalysisSection from "./sections/UrlAnalysisSection";
import AnalysisHistorySection from "./sections/AnalysisHistorySection";

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
    const errorMsg = getUrlValidationError(nextUrl);
    setError(errorMsg ?? "");
    return errorMsg === null;
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
    } catch (err) {
      setError(getErrorMessage(err, "url"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-24 pt-20 animate-[fade-up_.28s_ease]">
      <div
        className="pointer-events-none absolute left-1/2 top-[38%] h-65 w-120 -translate-x-1/2 -translate-y-1/2 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.14) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-150 text-center">
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
        <AnalysisHistorySection />
      </div>

      <FeedShortcutSection />
    </div>
  );
}
