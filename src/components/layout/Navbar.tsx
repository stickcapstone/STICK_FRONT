import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const tabs = [
  { label: "분석", path: "/" },
  { label: "결과", path: "/result" },
  { label: "피드", path: "/feed" },
  { label: "이미지 분석", path: "/image" },
] as const;

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-base/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-12">
          <button
            className="font-display text-2xl tracking-[0.4em] text-text transition hover:text-accent"
            onClick={() => navigate("/")}
            type="button"
          >
            VERI<span className="text-accent">WEB</span>
          </button>

          {/* 데스크탑 탭 */}
          <div className="hidden items-center gap-1 md:flex">
            {tabs.map(({ label, path }) => (
              <NavLink
                className={({ isActive }) =>
                  `shrink-0 rounded-xl px-3 py-2 text-xs font-medium transition sm:px-4 ${
                    isActive
                      ? "bg-accent-soft text-accent"
                      : "text-muted hover:bg-panel-2 hover:text-text"
                  }`
                }
                end={path === "/"}
                key={label}
                to={path}
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* 모바일 햄버거 버튼 */}
          <button
            aria-label="메뉴 열기"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.25 rounded-xl border border-border bg-panel transition hover:border-accent md:hidden"
            onClick={() => setOpen(true)}
            type="button"
          >
            <span className="h-[1.5px] w-4 rounded-full bg-text" />
            <span className="h-[1.5px] w-4 rounded-full bg-text" />
            <span className="h-[1.5px] w-4 rounded-full bg-text" />
          </button>
        </div>
      </nav>

      {/* 오버레이 */}
      <div
        className={`fixed inset-0 z-60 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* 드로어 */}
      <div
        className={`fixed inset-y-0 right-0 z-70 w-64 border-l border-border bg-panel transition-transform duration-300 ease-in-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="font-display text-lg tracking-[0.3em] text-text">
            VERI<span className="text-accent">WEB</span>
          </span>
          <button
            aria-label="메뉴 닫기"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-base text-sm text-muted transition hover:text-text"
            onClick={() => setOpen(false)}
            type="button"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-3">
          {tabs.map(({ label, path }) => (
            <NavLink
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-accent-soft text-accent"
                    : "text-muted hover:bg-panel-2 hover:text-text"
                }`
              }
              end={path === "/"}
              key={label}
              onClick={() => setOpen(false)}
              to={path}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}
