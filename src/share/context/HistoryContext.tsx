import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

const STORAGE_KEY = "veriweb_history";
const MAX_ITEMS = 10;

export interface HistoryItem {
  id: number;
  url: string;
  score: number;
  grade: string;
  analyzedAt: string;
}

interface HistoryContextValue {
  history: HistoryItem[];
  addHistory: (item: Omit<HistoryItem, "analyzedAt">) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextValue | null>(null);

function readStorage(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as HistoryItem[]) : [];
  } catch {
    return [];
  }
}

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<HistoryItem[]>(readStorage);

  const addHistory = useCallback((item: Omit<HistoryItem, "analyzedAt">) => {
    setHistory((prev) => {
      const deduped = prev.filter((h) => h.id !== item.id);
      const next = [
        { ...item, analyzedAt: new Date().toISOString() },
        ...deduped,
      ].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  }, []);

  return (
    <HistoryContext.Provider value={{ history, addHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useAnalysisHistory() {
  const ctx = useContext(HistoryContext);
  if (!ctx) throw new Error("useAnalysisHistory must be used within <HistoryProvider>");
  return ctx;
}
