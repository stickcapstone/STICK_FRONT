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

export interface FeedItem {
  id: number;
  title: string;
  href: string;
  outlet: string;
  cat: string;
  score: number;
  thumbnailUrl: string | null;
  time: string;
  bg: string;
  icon: string;
}

export const ANALYSIS_STEPS = [
  [12, "URL 유효성 확인 중.."],
  [28, "출처 데이터베이스 조회 중.."],
  [48, "교차 검증 분석 중.."],
  [68, "표현 편향 분석 중.."],
  [86, "팩트체크 DB 대조 중.."],
  [100, "분석 완료!"],
] as const;

export const FILTERS = ["전체", "정치", "경제", "IT", "건강", "국제"] as const;
