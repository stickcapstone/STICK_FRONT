interface MainHeroSectionProps {
  error: string;
}

export default function MainHeroSection({ error }: MainHeroSectionProps) {
  return (
    <>
      <div className="mb-4 font-display text-[clamp(68px,9vw,108px)] leading-none tracking-[0.5rem] text-text">
        VERI<span className="text-accent">WEB</span>
      </div>

      <p className="mb-11 text-sm leading-8 text-muted">
        URL을 입력하면 AI가 기사와 웹페이지의 신뢰도를 분석합니다.
        <br />
        출처, 교차 검증, 표현 편향까지 단계적으로 확인한 결과를 보여줍니다.
      </p>

      <p className="mt-5 font-mono text-[11px] text-muted/70">
        뉴스 기사, 블로그, SNS 링크까지 모두 분석할 수 있습니다.
      </p>
      <p className="mt-2 min-h-6 font-mono text-sm text-danger">{error}</p>
    </>
  );
}
