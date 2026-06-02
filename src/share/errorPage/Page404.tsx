import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-16 pt-20 animate-[fade-up_.28s_ease]">
      <div
        className="pointer-events-none absolute left-1/2 top-[38%] h-75 w-130 -translate-x-1/2 -translate-y-1/2 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, transparent 68%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-0 top-24 h-px w-full bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
        <div className="absolute bottom-28 left-0 h-px w-full bg-gradient-to-r from-transparent via-accent/15 to-transparent" />
      </div>

      <section className="relative z-10 w-full max-w-[720px] rounded-[32px] border border-border bg-panel/95 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-10">
        <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
          <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_16px_rgba(59,130,246,0.8)]" />
          Not Found
        </div>

        <div className="mb-3 font-display text-[clamp(84px,16vw,160px)] leading-none tracking-[0.4rem] text-text">
          4<span className="text-accent">04</span>
        </div>

        <h1 className="mb-4 text-2xl font-semibold text-text sm:text-3xl">
          페이지를 찾을 수 없습니다.
        </h1>

        <p className="max-w-[540px] text-sm leading-8 text-muted sm:text-base">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
          URL을 다시 확인하거나 메인으로 돌아가 주세요.
        </p>

        <div className="mt-8 grid gap-3 rounded-3xl border border-border bg-base/70 p-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-panel px-4 py-4">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Status
            </div>
            <div className="text-sm font-semibold text-accent">404 / Not Found</div>
          </div>

          <div className="rounded-2xl border border-border bg-panel px-4 py-4">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Suggestion
            </div>
            <div className="text-sm text-text">URL 철자를 다시 확인해주세요</div>
          </div>

          <div className="rounded-2xl border border-border bg-panel px-4 py-4">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Recovery
            </div>
            <div className="text-sm text-text">메인에서 다시 시작하세요</div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-accent px-6 text-sm font-bold text-white transition hover:bg-blue-600"
            to="/"
          >
            메인으로 이동
          </Link>
          <Link
            className="inline-flex h-12 items-center justify-center rounded-2xl border border-border bg-base px-6 text-sm font-semibold text-text transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            to="/feed"
          >
            피드 보기
          </Link>
        </div>
      </section>
    </div>
  );
}
