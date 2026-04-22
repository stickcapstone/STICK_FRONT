import axios from "axios";
import { ServerError } from "../utils/errors";

const api = axios.create({
  baseURL: "http://172.28.3.75:8081/api/v1/",
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status >= 500) {
      throw new ServerError(error.response?.data?.message ?? "서버 오류가 발생했습니다.");
    }
    return Promise.reject(error);
  }
);

export interface ImageAnalysisData {
  fileName: string;
  aiGenerated: boolean;
  confidence: number;
  verdict: string;
  reason: string;
}

export interface ImageAnalysisResponse {
  success: boolean;
  data: ImageAnalysisData;
  message: string;
  code: string;
}

export function analyzeImage(file: File, onUploadProgress?: (pct: number) => void) {
  const formData = new FormData();
  formData.append("image", file);

  return api.post<ImageAnalysisResponse>("image/analyze", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (event) => {
      if (onUploadProgress && event.total) {
        onUploadProgress(Math.round((event.loaded * 100) / event.total));
      }
    },
  });
}

export default api;

