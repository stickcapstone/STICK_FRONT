import { useEffect, useState } from "react";

export default function ThemeToggleButton() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("theme-transitioning");
    html.setAttribute("data-theme", dark ? "dark" : "light");
    const timer = window.setTimeout(() => {
      html.classList.remove("theme-transitioning");
    }, 300);
    return () => window.clearTimeout(timer);
  }, [dark]);

  return (
    <button
      aria-label="테마 전환"
      className="fixed bottom-8 right-8 z-40 flex h-13 w-13 items-center justify-center rounded-full border border-border bg-panel text-lg text-text transition hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_8px_20px_rgba(0,0,0,0.18)]"
      onClick={() => setDark((prev) => !prev)}
      type="button"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
