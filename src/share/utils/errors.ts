import axios from "axios";

export class ServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ServerError";
  }
}

export function getErrorMessage(err: unknown, context: "url" | "file" = "file"): string {
  // 커스텀 서버 에러 (500+, interceptor가 throw)
  if (err instanceof ServerError) {
    return "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }

  if (axios.isAxiosError(err)) {
    // 네트워크 연결 실패 (서버 자체가 안 켜져 있거나 인터넷 없음)
    if (err.code === "ERR_NETWORK") {
      return "서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.";
    }

    // 요청 타임아웃
    if (err.code === "ECONNABORTED") {
      return "응답 시간이 초과됐습니다. 잠시 후 다시 시도해주세요.";
    }

    const status = err.response?.status;

    if (status === 413) return context === "url" ? "요청이 너무 큽니다." : "파일 크기가 너무 큽니다. 더 작은 파일을 사용해주세요.";
    if (status === 415 || status === 422) return context === "url" ? "분석할 수 없는 URL입니다." : "지원하지 않는 파일 형식입니다.";
    if (status === 400) return "잘못된 요청입니다. 입력값을 확인해주세요.";
    if (status === 404) return "요청한 리소스를 찾을 수 없습니다.";
    if (status && status >= 500) return "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }

  return "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
}
