import { useNavigate } from "react-router-dom";

export default function ReanalyzeButton() {
  const navigate = useNavigate();

  return (
    <button
      className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-accent px-6 text-sm font-bold text-white transition hover:bg-blue-600"
      onClick={() => navigate("/")}
      type="button"
    >
      다시 분석하기
    </button>
  );
}
