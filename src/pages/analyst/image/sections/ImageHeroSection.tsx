export default function ImageHeroSection() {
  return (
    <div className="text-center">
      <h1 className="mb-3 font-display text-[clamp(48px,7vw,80px)] leading-none tracking-[0.35rem] text-text">
        IMAGE <span className="text-accent">CHECK</span>
      </h1>
      <p className="text-sm leading-8 text-muted">
        이미지를 업로드하면 AI가 조작 여부와 신뢰도를 단계적으로 분석합니다.
        <br />
        JPG, PNG 형식의 파일을 지원합니다.
      </p>
    </div>
  );
}
