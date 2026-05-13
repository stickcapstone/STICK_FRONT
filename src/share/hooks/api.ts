import axios from "axios";
import { ServerError } from "../utils/errors";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://172.28.3.75:8081/api/v1/",
  timeout: 30000,
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

export interface VideoAnalysisData {
  fileName: string;
  aiGenerated: boolean;
  confidence: number;
  verdict: string;
  reason: string;
  totalFrames: number;
  aiFrames: number;
}

export interface VideoAnalysisResponse {
  success: boolean;
  data: VideoAnalysisData;
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

export function analyzeVideo(file: File) {
  const formData = new FormData();
  formData.append("video", file);

  return api.post<VideoAnalysisResponse>("video/analyze", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 180000,
  });
}

// ── URL 분석 ─────────────────────────────────────────────────────────────────

export interface AnalysisBreakdownItem {
  category: string;
  score: number;
  maxScore: number;
  reason: string;
}

export interface AnalysisArticleItem {
  title: string;
  url: string;
  source: string;
  publishedAt: string;
}

export interface AnalysisData {
  analysisId: number;
  url: string;
  totalScore: number;
  grade: string;
  summary: string;
  breakdown: AnalysisBreakdownItem[];
  recommendedArticles: AnalysisArticleItem[];
  createdAt: string;
}

export interface AnalysisApiResponse {
  success: boolean;
  data: AnalysisData;
  message: string;
  code: string;
}

export function analyzeUrl(url: string) {
  return api.post<AnalysisApiResponse>("analyze", { url }, { timeout: 60000 });
}

export function getAnalysisById(id: number) {
  return api.get<AnalysisApiResponse>(`analyze/${id}`);
}

// ── 피드 ──────────────────────────────────────────────────────────────────────

export interface FeedArticleData {
  id: number;
  title: string;
  url: string;
  source: string;
  thumbnailUrl: string | null;
  category: string;
  trustScore: number;
  grade: string;
  publishedAt: string;
}

export interface FeedApiResponse {
  success: boolean;
  data: {
    articles: FeedArticleData[];
    totalCount: number;
    page: number;
    size: number;
    hasNext: boolean;
  };
  message: string;
}

export function getFeed(category?: string, page = 0, size = 100) {
  return api.get<FeedApiResponse>("feed", {
    params: { ...(category ? { category } : {}), page, size },
  });
}

export default api;
