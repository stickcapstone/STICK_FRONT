export default function MainHeroSection() {
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
    </>
  );
}
