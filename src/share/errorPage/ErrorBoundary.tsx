import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, errorMessage: "" };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error.message ?? "알 수 없는 오류가 발생했습니다.",
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // 추후 Sentry 등 외부 모니터링 연동 시 여기서 전송
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoMain = () => {
    window.location.href = "/";
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-16 pt-20">
        <div
          className="pointer-events-none absolute left-1/2 top-[38%] h-75 w-130 -translate-x-1/2 -translate-y-1/2 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(239, 68, 68, 0.16) 0%, transparent 68%)",
          }}
        />

        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute left-0 top-24 h-px w-full bg-gradient-to-r from-transparent via-danger/25 to-transparent" />
          <div className="absolute bottom-28 left-0 h-px w-full bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        </div>

        <section className="relative z-10 w-full max-w-[720px] rounded-[32px] border border-border bg-panel/95 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-10">
          <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-danger">
            <span className="h-2 w-2 rounded-full bg-danger shadow-[0_0_16px_rgba(239,68,68,0.9)]" />
            Unexpected Error
          </div>

          <div className="mb-3 font-display text-[clamp(56px,12vw,120px)] leading-none tracking-[0.3rem] text-text">
            앗<span className="text-danger">!</span>
          </div>

          <h1 className="mb-4 text-2xl font-semibold text-text sm:text-3xl">
            예상치 못한 오류가 발생했습니다.
          </h1>

          <p className="max-w-[540px] text-sm leading-8 text-muted sm:text-base">
            페이지를 렌더링하는 중 문제가 생겼습니다.
            새로고침하거나 메인으로 돌아가면 정상적으로 이용하실 수 있습니다.
          </p>

          {/* 개발 환경에서만 에러 메시지 표시 */}
          {import.meta.env.DEV && (
            <div className="mt-5 rounded-2xl border border-danger/20 bg-danger/5 px-4 py-3">
              <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-danger">
                Error (dev only)
              </div>
              <p className="font-mono text-xs text-muted break-all">
                {this.state.errorMessage}
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              className="inline-flex h-12 items-center justify-center rounded-2xl bg-danger px-6 text-sm font-bold text-white transition hover:bg-red-500"
              onClick={this.handleReload}
              type="button"
            >
              새로고침
            </button>
            <button
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-border bg-base px-6 text-sm font-semibold text-text transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              onClick={this.handleGoMain}
              type="button"
            >
              메인으로 이동
            </button>
          </div>
        </section>
      </div>
    );
  }
}
