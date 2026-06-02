import { useState } from "react";

const STORAGE_KEY = "veriweb_history";
const MAX_ITEMS = 10;

export interface HistoryItem {
  id: number;
  url: string;
  score: number;
  grade: string;
  analyzedAt: string;
}

function readStorage(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as HistoryItem[]) : [];
  } catch {
    return [];
  }
}

export function useAnalysisHistory() {
  const [history, setHistory] = useState<HistoryItem[]>(readStorage);

  function addHistory(item: Omit<HistoryItem, "analyzedAt">) {
    setHistory((prev) => {
      const deduped = prev.filter((h) => h.id !== item.id);
      const next = [
        { ...item, analyzedAt: new Date().toISOString() },
        ...deduped,
      ].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  function clearHistory() {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  }

  return { history, addHistory, clearHistory };
}
