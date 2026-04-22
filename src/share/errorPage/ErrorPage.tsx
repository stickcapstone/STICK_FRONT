interface Page500Props {
  onGoMain?: () => void;
  onRetry?: () => void;
  message?: string;
}

export default function Page500({
  onGoMain,
  onRetry,
  message = "서버 연결이 일시적으로 불안정합니다. 잠시 후 다시 시도해 주세요.",
}: Page500Props) {
  function handleRetry() {
    if (onRetry) {
      onRetry();
      return;
    }

    window.location.reload();
  }

  function handleGoMain() {
    if (onGoMain) {
      onGoMain();
      return;
    }

    window.location.href = "/";
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-16 pt-20 animate-[fade-up_.28s_ease]">
      <div
        className="pointer-events-none absolute left-1/2 top-[38%] h-[300px] w-[520px] -translate-x-1/2 -translate-y-1/2 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(239, 68, 68, 0.18) 0%, transparent 68%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-0 top-24 h-px w-full bg-gradient-to-r from-transparent via-danger/25 to-transparent" />
        <div className="absolute bottom-28 left-0 h-px w-full bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      </div>

      <section className="relative z-10 w-full max-w-[720px] rounded-[32px] border border-border bg-panel/95 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-10">
        <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-danger">
          <span className="h-2 w-2 rounded-full bg-danger shadow-[0_0_16px_rgba(239,68,68,0.9)]" />
          Internal Server Error
        </div>

        <div className="mb-3 font-display text-[clamp(84px,16vw,160px)] leading-none tracking-[0.4rem] text-text">
          5<span className="text-danger">00</span>
        </div>

        <h1 className="mb-4 text-2xl font-semibold text-text sm:text-3xl">
          요청을 처리하는 중 문제가 발생했습니다.
        </h1>

        <p className="max-w-[540px] text-sm leading-8 text-muted sm:text-base">
          {message}
        </p>

        <div className="mt-8 grid gap-3 rounded-3xl border border-border bg-base/70 p-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-panel px-4 py-4">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Status
            </div>
            <div className="text-sm font-semibold text-danger">500 / Server Fault</div>
          </div>

          <div className="rounded-2xl border border-border bg-panel px-4 py-4">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Suggestion
            </div>
            <div className="text-sm text-text">잠시 후 새로고침 후 다시 시도</div>
          </div>

          <div className="rounded-2xl border border-border bg-panel px-4 py-4">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Recovery
            </div>
            <div className="text-sm text-text">문제가 계속되면 관리자에게 문의</div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-danger px-6 text-sm font-bold text-white transition hover:bg-red-500"
            onClick={handleRetry}
            type="button"
          >
            다시 시도
          </button>

          <button
            className="inline-flex h-12 items-center justify-center rounded-2xl border border-border bg-base px-6 text-sm font-semibold text-text transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            onClick={handleGoMain}
            type="button"
          >
            메인으로 이동
          </button>
        </div>
      </section>
    </div>
  );
}
