import type { RefObject } from "react";

interface UrlAnalysisSectionProps {
  focused: boolean;
  loading: boolean;
  pct: number;
  status: string;
  url: string;
  inputRef: RefObject<HTMLInputElement | null>;
  error:string
  onAnalyze: () => void;
  onBlur: () => void;
  onChangeURL: (nextUrl: string) => void;
  onFocus: () => void;
}

export default function UrlAnalysisSection({
  focused,
  loading,
  pct,
  status,
  url,
  inputRef,
  error,
  onAnalyze,
  onBlur,
  onChangeURL,
  onFocus,
}: UrlAnalysisSectionProps) {
  return (
    <>
      <div
        className={`mx-auto mb-3 flex w-full max-w-[540px] flex-col overflow-hidden rounded-2xl border bg-panel transition sm:flex-row ${
          focused ? "border-accent ring-4 ring-accent/10" : "border-border"
        }`}
      >
        <div className="flex items-center gap-3 px-4 sm:flex-1">
          <div className="text-muted">
            <svg
              fill="none"
              height="15"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="15"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" x2="16.65" y1="21" y2="16.65" />
            </svg>
          </div>
          <input
            className="h-14 w-full bg-transparent font-mono text-xs text-text outline-none placeholder:text-muted"
            onBlur={onBlur}
            onChange={(event) => onChangeURL(event.target.value)}
            onFocus={onFocus}
            onKeyDown={(event) => event.key === "Enter" && onAnalyze()}
            placeholder="분석할 URL을 입력하세요"
            ref={inputRef}
            value={url}
          />
        </div>

        <button
          className="h-14 shrink-0 bg-accent px-6 text-sm font-bold text-white transition hover:bg-blue-600 sm:px-8"
          onClick={onAnalyze}
          type="button"
        >
          분석 시작
        </button>
      </div>

      <p className="mt-5 font-mono text-[11px] text-muted/70">
        뉴스 기사, 블로그, SNS 링크까지 모두 분석할 수 있습니다.
      </p>
      <p className="mt-2 min-h-6 font-mono text-sm text-danger">{error}</p>

      {loading && (
        <div className="mx-auto mb-1 w-full max-w-[540px]">
          <div className="mb-2 flex items-center justify-between font-mono text-[10px] text-muted">
            <span>{status}</span>
            <span>{pct}%</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-panel-2">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-300 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}
    </>
  );
}
