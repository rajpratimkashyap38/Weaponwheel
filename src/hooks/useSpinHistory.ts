import { useCallback, useEffect, useState } from 'react';
import type { SpinResult } from '@/types';

const STORAGE_KEY = 'weapon-randomizer:history';
const MAX_HISTORY = 5;

function loadHistory(): SpinResult[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as SpinResult[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // fall through to empty
  }
  return [];
}

export function useSpinHistory() {
  const [history, setHistory] = useState<SpinResult[]>(loadHistory);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const addResult = useCallback((result: SpinResult) => {
    setHistory((prev) => [result, ...prev].slice(0, MAX_HISTORY));
  }, []);

  const clearHistory = useCallback(() => setHistory([]), []);

  return { history, addResult, clearHistory };
}
