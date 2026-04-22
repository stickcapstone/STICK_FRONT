import { NavLink, useNavigate } from "react-router-dom";

const tabs = [
  { label: "분석", path: "/" },
  { label: "결과", path: "/result" },
  { label: "피드", path: "/feed" },
  { label: "이미지 분석", path: "/image" },
] as const;

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-base/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-12">
        <button
          className="font-display text-2xl tracking-[0.4em] text-text transition hover:text-accent"
          onClick={() => navigate("/")}
          type="button"
        >
          VERI<span className="text-accent">WEB</span>
        </button>

        <div className="flex max-w-[70vw] items-center gap-1 overflow-x-auto">
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
      </div>
    </nav>
  );
}
