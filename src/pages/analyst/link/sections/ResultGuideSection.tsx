import ReanalyzeButton from "../ReanalyzeButton";

export default function ResultGuideSection() {
  return (
    <aside className="h-fit rounded-[28px] border border-border bg-panel p-6 xl:sticky xl:top-[88px]">
      <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
        결과 가이드
      </div>
      <div className="space-y-3 text-sm leading-7 text-muted">
        <p>현재 결과는 주장을 바로 신뢰하기보다 원문과 비교해 읽는 것이 안전한 수준입니다.</p>
        <p>특히 인용 검증 점수가 낮아서, 익명 발언과 재구성 서술은 한 번 더 확인하는 편이 좋습니다.</p>
        <p>아래 다시 분석하기 버튼을 누르면 메인 화면으로 돌아가 다른 링크를 바로 검사할 수 있습니다.</p>
      </div>

      <div className="mt-6">
        <ReanalyzeButton />
      </div>
    </aside>
  );
}
