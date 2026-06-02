import { useState } from "react";

interface ShareSectionProps {
  score: number;
  analyzedUrl: string;
}

export default function ShareSection({ score, analyzedUrl }: ShareSectionProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = window.location.href;
  const shareText = `신뢰도 ${score}점 — ${analyzedUrl} | VERIWEB AI 팩트체크`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API 미지원 시 fallback
      const textarea = document.createElement("textarea");
      textarea.value = shareUrl;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function shareToX() {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  async function shareNative() {
    try {
      await navigator.share({ title: "VERIWEB 분석 결과", text: shareText, url: shareUrl });
    } catch {
      // 취소하거나 미지원이면 무시
    }
  }

  const hasNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* 링크 복사 */}
      <button
        type="button"
        onClick={copyLink}
        className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 font-mono text-[11px] font-medium transition-all duration-200 ${
          copied
            ? "border-success/40 bg-success/10 text-success"
            : "border-border bg-base text-muted hover:border-accent hover:text-accent"
        }`}
      >
        {copied ? (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            복사됨
          </>
        ) : (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            링크 복사
          </>
        )}
      </button>

      {/* X (Twitter) 공유 */}
      <button
        type="button"
        onClick={shareToX}
        className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-base px-3 py-1.5 font-mono text-[11px] font-medium text-muted transition hover:border-[#1d9bf0] hover:text-[#1d9bf0]"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.766l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        X 공유
      </button>

      {/* 네이티브 공유 (모바일) */}
      {hasNativeShare && (
        <button
          type="button"
          onClick={shareNative}
          className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-base px-3 py-1.5 font-mono text-[11px] font-medium text-muted transition hover:border-accent hover:text-accent"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          공유
        </button>
      )}
    </div>
  );
}
