import { useEffect, useState } from "react";
import { BREAKDOWN, EVIDENCE_LINKS, LINK_ANALYSIS_RESULT, SIMILAR_LINKS } from "../../../data/data";
import BreakdownSection from "./sections/BreakdownSection";
import ExternalLinkGridSection from "./sections/ExternalLinkGridSection";
import LinkResultSummarySection from "./sections/LinkResultSummarySection";
import RecommendedArticlesSection from "./sections/RecommendedArticlesSection";
import ResultGuideSection from "./sections/ResultGuideSection";

interface Props {
  analyzedUrl: string;
  onGoMain: () => void;
}

export default function LinkAnalysisPage({ analyzedUrl, onGoMain }: Props) {
  const finalScore = LINK_ANALYSIS_RESULT.score;
  const [displayedScore, setDisplayedScore] = useState(0);
  const [openItemId, setOpenItemId] = useState(BREAKDOWN[0]?.id ?? "");

  useEffect(() => {
    let frameId = 0;
    const duration = 1100;
    const startedAt = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startedAt;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      setDisplayedScore(Math.round(finalScore * eased));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frameId);
  }, [finalScore]);

  return (
    <div className="min-h-screen px-6 pb-16 pt-20 animate-[fade-up_.28s_ease] lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <LinkResultSummarySection analyzedUrl={analyzedUrl} displayedScore={displayedScore} />

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-5">
            <BreakdownSection
              onToggle={(id) => setOpenItemId((current) => (current === id ? "" : id))}
              openItemId={openItemId}
            />
            <ExternalLinkGridSection items={EVIDENCE_LINKS} title="근거 링크" />
            <ExternalLinkGridSection items={SIMILAR_LINKS} title="유사 정보 링크" />
            <RecommendedArticlesSection />
          </div>

          <ResultGuideSection onGoMain={onGoMain} />
        </div>
      </div>
    </div>
  );
}
