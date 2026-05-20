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

export const FILTERS = ["전체", "정치", "경제", "IT", "건강", "국제"] as const;
