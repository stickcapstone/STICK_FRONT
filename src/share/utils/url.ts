/**
 * URL 유효성 검사 후 문제가 있으면 에러 메시지를 반환, 없으면 null 반환
 */
export function getUrlValidationError(value: string): string | null {
  const trimmed = value.trim();

  if (!trimmed) return "분석할 URL을 입력해주세요.";

  // http:// 또는 https:// 로 시작하는지 확인
  if (!/^https?:\/\//i.test(trimmed)) {
    return "URL은 http:// 또는 https:// 로 시작해야 합니다.";
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return "올바른 URL 형식이 아닙니다.";
  }

  const host = parsed.hostname;

  // 호스트명 없음
  if (!host) return "호스트명이 없는 URL입니다.";

  // localhost는 허용 (개발/테스트용)
  if (host === "localhost") return null;

  // 점(.)이 없으면 실제 도메인이 아님 (예: http://a, http://abc)
  if (!host.includes(".")) {
    return "유효하지 않은 도메인입니다. 올바른 URL을 입력해주세요.";
  }

  // 도메인의 각 부분이 비어있지 않아야 함 (예: http://.com 방지)
  const parts = host.split(".");
  if (parts.some((part) => part.length === 0)) {
    return "올바른 URL 형식이 아닙니다.";
  }

  return null;
}

/** 하위 호환용 — boolean만 필요한 경우 사용 */
export function isValidHttpUrl(value: string): boolean {
  return getUrlValidationError(value) === null;
}
