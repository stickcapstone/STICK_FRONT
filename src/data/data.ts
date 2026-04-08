export type ScoreTone = "trust" | "warning" | "risk";

export interface BreakdownItem {
  id: string;
  label: string;
  score: number;
  tone: ScoreTone;
  summary: string;
  details: string[];
}

export interface ExternalLinkItem {
  id: string;
  label: string;
  description: string;
  href: string;
  tag: string;
}

export interface RecommendedArticle {
  id: string;
  outlet: string;
  title: string;
  summary: string;
  href: string;
}

export const LINK_ANALYSIS_RESULT = {
  score: 62,
  analyzedUrl: "https://news.example.com/article/government-policy-2024",
  summary:
    "기사의 핵심 주장 자체는 실제 발표 내용과 일부 맞지만, 출처 범위가 제한적이고 인용 균형이 약해 추가 검증이 필요한 상태입니다.",
};

export const BREAKDOWN: BreakdownItem[] = [
  {
    id: "source-reliability",
    label: "출처 신뢰도",
    score: 84,
    tone: "trust",
    summary: "정부 보도자료와 공공기관 원문이 확인되어 기본 신뢰도는 높은 편입니다.",
    details: [
      "핵심 수치가 정부 부처 보도자료와 통계청 공개 자료에 직접 등장합니다.",
      "기사 본문에서 1차 출처를 명시하고 있어 원문 추적이 가능합니다.",
      "다만 보조 설명이 특정 인터뷰 발언에 의존해 해석 범위는 조금 넓습니다.",
    ],
  },
  {
    id: "fact-consistency",
    label: "사실 일치도",
    score: 58,
    tone: "warning",
    summary: "핵심 방향은 맞지만 일부 수치 표현과 시점 설명이 원문과 완전히 같지는 않습니다.",
    details: [
      "기사가 강조한 증가 폭은 원문 기준보다 넓은 기간을 섞어 계산한 것으로 보입니다.",
      "정책 발표 날짜와 실제 시행 날짜가 분리되어 있는데 기사에서는 하나로 읽히기 쉽습니다.",
      "큰 틀의 사실관계는 유지되지만 디테일은 재확인이 필요합니다.",
    ],
  },
  {
    id: "bias-balance",
    label: "표현 균형성",
    score: 54,
    tone: "warning",
    summary: "반대 시각이나 보완 설명이 적어 독자가 한쪽 해석으로 기울 수 있습니다.",
    details: [
      "기사 후반부에만 반론이 짧게 실려 균형감이 약합니다.",
      "제목과 리드 문단이 단정적인 표현을 반복해 경계가 필요합니다.",
      "전문가 코멘트가 한 방향으로만 배치되어 있습니다.",
    ],
  },
  {
    id: "citation-quality",
    label: "인용 검증",
    score: 43,
    tone: "risk",
    summary: "익명 관계자 발언 비중이 높아 직접 검증 가능한 인용은 부족합니다.",
    details: [
      "익명 취재원 발언이 세 차례 등장하지만 발언 맥락이 제한적으로 소개됩니다.",
      "직접 인용보다 재구성 서술이 많아 원문 발언의 강도를 판단하기 어렵습니다.",
      "독립적인 추가 인터뷰나 공식 코멘트 링크가 더 필요합니다.",
    ],
  },
  {
    id: "cross-check",
    label: "교차 검증",
    score: 71,
    tone: "warning",
    summary: "여러 매체에서 유사 보도가 확인되지만 세부 표현은 차이가 있습니다.",
    details: [
      "주요 방송사와 통신사 보도에서 비슷한 주장 흐름이 확인됩니다.",
      "다만 핵심 숫자와 전망 문구는 매체마다 표현 편차가 큽니다.",
      "교차 검증은 가능하지만 동일 문장을 그대로 신뢰하기엔 이른 단계입니다.",
    ],
  },
];

export const EVIDENCE_LINKS: ExternalLinkItem[] = [
  {
    id: "official-briefing",
    tag: "공식 출처",
    label: "정부 보도자료 원문",
    description: "정책 발표 시점과 핵심 수치를 직접 확인할 수 있는 1차 출처입니다.",
    href: "https://www.korea.kr/briefing/pressReleaseView.do",
  },
  {
    id: "stats-data",
    tag: "공공 데이터",
    label: "통계청 공개 통계",
    description: "기사에 인용된 수치가 실제 통계와 얼마나 맞는지 비교할 수 있습니다.",
    href: "https://kosis.kr/index/index.do",
  },
  {
    id: "fact-check-center",
    tag: "팩트체크",
    label: "팩트체크 검증 리포트",
    description: "논란이 된 표현과 원문 문장을 항목별로 대조한 요약 자료입니다.",
    href: "https://factcheck.snu.ac.kr/",
  },
];

export const SIMILAR_LINKS: ExternalLinkItem[] = [
  {
    id: "yonhap-related",
    tag: "유사 보도",
    label: "연합뉴스 관련 기사",
    description: "동일 이슈를 보다 중립적인 스트레이트 기사 형식으로 다룹니다.",
    href: "https://www.yna.co.kr/",
  },
  {
    id: "kbs-related",
    tag: "유사 보도",
    label: "KBS 심층 보도",
    description: "기사에서 빠진 반대 의견과 현장 반응을 함께 정리한 보도입니다.",
    href: "https://news.kbs.co.kr/",
  },
  {
    id: "newsis-related",
    tag: "유사 보도",
    label: "뉴시스 비교 기사",
    description: "발표 내용과 실제 시행 일정의 차이를 비교해 설명합니다.",
    href: "https://www.newsis.com/",
  },
];

export const REC_ARTICLES: RecommendedArticle[] = [
  {
    id: "official-ministry",
    outlet: "기획재정부",
    title: "2024년 하반기 정책 방향 공식 발표",
    summary: "정책 목표, 수치, 향후 일정이 가장 정확하게 정리된 공식 자료입니다.",
    href: "https://www.moef.go.kr/",
  },
  {
    id: "kbs-analysis",
    outlet: "KBS",
    title: "발표 자료와 실제 파급효과를 함께 본 분석 기사",
    summary: "단순 보도자료 요약이 아니라 이해관계자 반응까지 함께 읽을 수 있습니다.",
    href: "https://news.kbs.co.kr/",
  },
  {
    id: "sisain-context",
    outlet: "시사IN",
    title: "정책 배경과 쟁점을 정리한 해설 기사",
    summary: "정책의 맥락과 비판 포인트를 균형 있게 파악하기 좋습니다.",
    href: "https://www.sisain.co.kr/",
  },
];

export const FEED_ITEMS = [
  {
    cat: "정치",
    outlet: "연합뉴스",
    score: 94,
    bg: "linear-gradient(135deg,#0a1628,#081c10)",
    icon: "POL",
    title: "국회 예산결산위원회, 2025년도 추경 예산 심사 일정 확정",
    time: "2시간 전",
  },
  {
    cat: "경제",
    outlet: "서울경제",
    score: 88,
    bg: "linear-gradient(135deg,#18120a,#241800)",
    icon: "ECO",
    title: "대형 기업과 금융권, 금리 조정 가능성에 촉각",
    time: "4시간 전",
  },
  {
    cat: "IT",
    outlet: "전자신문",
    score: 91,
    bg: "linear-gradient(135deg,#0a1220,#00102e)",
    icon: "AI",
    title: "국내 AI 스타트업, 글로벌 투자 유치 1조 원 돌파 전망",
    time: "6시간 전",
  },
  {
    cat: "건강",
    outlet: "메디컬투데이",
    score: 96,
    bg: "linear-gradient(135deg,#180a0a,#200000)",
    icon: "MED",
    title: "질병관리청, 계절성 유행주의보 상향과 추가 접종 권고 발표",
    time: "8시간 전",
  },
  {
    cat: "국제",
    outlet: "KBS",
    score: 85,
    bg: "linear-gradient(135deg,#0a160a,#081a0e)",
    icon: "GLB",
    title: "G20 정상회의, 기후 대응 공동성명문 채택과 남은 과제 공개",
    time: "어제",
  },
  {
    cat: "경제",
    outlet: "조선비즈",
    score: 89,
    bg: "linear-gradient(135deg,#140a18,#1c0024)",
    icon: "BIZ",
    title: "반도체 업계 3분기 실적 회복과 공급망 회복 속도 분석",
    time: "어제",
  },
];

export const ANALYSIS_STEPS = [
  [12, "URL 유효성 확인 중.."],
  [28, "출처 데이터베이스 조회 중.."],
  [48, "교차 검증 분석 중.."],
  [68, "표현 편향 분석 중.."],
  [86, "팩트체크 DB 대조 중.."],
  [100, "분석 완료!"],
] as const;

export const FILTERS = ["전체", "정치", "경제", "IT", "건강", "국제"] as const;

export const RESULT_SCORE = LINK_ANALYSIS_RESULT.score;
