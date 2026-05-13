import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { AnalysisData } from "../../../share/hooks/api";
import { getAnalysisById } from "../../../share/hooks/api";
import type { BreakdownItem, RecommendedArticle } from "../../../data/data";
import { getScoreTone } from "./sections/linkAnalysisUtils";
import BreakdownSection from "./sections/BreakdownSection";
import LinkResultSummarySection from "./sections/LinkResultSummarySection";
import RecommendedArticlesSection from "./sections/RecommendedArticlesSection";
import ResultGuideSection from "./sections/ResultGuideSection";
import ReanalyzeButton from "./ReanalyzeButton";

const CATEGORY_LABELS: Record<string, string> = {
  DOMAIN: "도메인 신뢰도",
  AUTHOR: "작성자/출처 명확성",
  REFERENCE: "근거/인용 충실도",
  CONSISTENCY: "정보 일관성",
  MANIPULATION: "조작/품질 이상",
  ACADEMIC: "학술 저널 인용",
  GOV: "정부/공공기관 인용",
};

function mapBreakdown(items: AnalysisData["breakdown"]): BreakdownItem[] {
  return items.map((item) => ({
    id: item.category,
    label: CATEGORY_LABELS[item.category] ?? item.category,
    score: item.score,
    tone: getScoreTone(item.score),
    summary: item.reason,
    details: [item.reason],
  }));
}

function mapArticles(items: AnalysisData["recommendedArticles"]): RecommendedArticle[] {
  return items.map((a, i) => ({
    id: String(i),
    outlet: a.source,
    title: a.title,
    summary: a.publishedAt
      ? new Date(a.publishedAt).toLocaleDateString("ko-KR")
      : "",
    href: a.url,
  }));
}

export default function LinkAnalysisPage() {
  const [searchParams] = useSearchParams();
  const rawId = searchParams.get("id");
  const analysisId = rawId ? Number(rawId) : null;

  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [displayedScore, setDisplayedScore] = useState(0);
  const [openItemId, setOpenItemId] = useState("");

  useEffect(() => {
    if (!analysisId || isNaN(analysisId)) {
      setLoading(false);
      return;
    }

    getAnalysisById(analysisId)
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data);
        } else {
          setFetchError(true);
        }
      })
      .catch(() => setFetchError(true))
      .finally(() => setLoading(false));
  }, [analysisId]);

  const finalScore = data?.totalScore ?? 0;

  useEffect(() => {
    if (!data) return;
    let frameId = 0;
    const duration = 1100;
    const startedAt = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startedAt;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      setDisplayedScore(Math.round(finalScore * eased));
      if (progress < 1) frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frameId);
  }, [finalScore, data]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        <p className="font-mono text-sm text-muted">분석 결과를 불러오는 중...</p>
      </div>
    );
  }

  if (!analysisId || isNaN(analysisId) || fetchError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 px-6 animate-[fade-up_.28s_ease]">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">No Result</div>
        <p className="text-center text-lg font-semibold text-text">분석 결과가 없습니다.</p>
        <p className="text-center text-sm text-muted">먼저 분석을 진행해 주세요.</p>
        <Link
          className="mt-2 rounded-2xl bg-accent px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-600"
          to="/"
        >
          분석하러 가기
        </Link>
      </div>
    );
  }

  const breakdown = mapBreakdown(data!.breakdown);
  const recArticles = mapArticles(data!.recommendedArticles);

  return (
    <div className="min-h-screen px-6 pb-16 pt-20 animate-[fade-up_.28s_ease] lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <LinkResultSummarySection
          analyzedUrl={data!.url}
          displayedScore={displayedScore}
          finalScore={finalScore}
          summary={data!.summary}
        />

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-5">
            <BreakdownSection
              items={breakdown}
              onToggle={(id) => setOpenItemId((current) => (current === id ? "" : id))}
              openItemId={openItemId}
            />
            <RecommendedArticlesSection articles={recArticles} />
          </div>

          <div className="flex flex-col gap-5">
            <ResultGuideSection />
            <ReanalyzeButton />
          </div>
        </div>
      </div>
    </div>
  );
}
