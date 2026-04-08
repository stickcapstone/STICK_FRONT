import type { ScoreTone } from "../../../../data/data";

export interface ToneMeta {
  badge: string;
  chipClassName: string;
  textClassName: string;
  barClassName: string;
}

export function getToneMeta(tone: ScoreTone): ToneMeta {
  if (tone === "trust") {
    return {
      badge: "신뢰",
      chipClassName: "border-success/20 bg-success/10 text-success",
      textClassName: "text-success",
      barClassName: "bg-success",
    };
  }

  if (tone === "warning") {
    return {
      badge: "주의",
      chipClassName: "border-warning/20 bg-warning/10 text-warning",
      textClassName: "text-warning",
      barClassName: "bg-warning",
    };
  }

  return {
    badge: "위험",
    chipClassName: "border-danger/20 bg-danger/10 text-danger",
    textClassName: "text-danger",
    barClassName: "bg-danger",
  };
}

export function getScoreTone(score: number): ScoreTone {
  if (score >= 80) {
    return "trust";
  }

  if (score >= 50) {
    return "warning";
  }

  return "risk";
}

export function getScoreLabel(score: number) {
  if (score >= 80) {
    return "신뢰";
  }

  if (score >= 50) {
    return "주의";
  }

  return "위험";
}
