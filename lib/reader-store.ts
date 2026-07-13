"use client";

// Per-book reading state — localStorage, SSR-safe. Tracks read chapters,
// bookmarks, last-viewed (continue reading) → drives progress + knowledge score.

import { useCallback, useEffect, useState } from "react";

export interface ReaderState { read: number[]; bm: number[]; last: number }

export function useReader(bookId: string) {
  const KEY = `neo:reader:${bookId}`;
  const [s, setS] = useState<ReaderState>({ read: [], bm: [], last: 0 });

  useEffect(() => {
    try { const r = JSON.parse(localStorage.getItem(KEY) || "null"); if (r && Array.isArray(r.read)) setS({ read: r.read, bm: r.bm || [], last: r.last || 0 }); } catch { /* noop */ }
  }, [KEY]);

  const persist = useCallback((next: ReaderState) => { try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* noop */ } return next; }, [KEY]);

  const markRead = useCallback((n: number) => setS((p) => p.read.includes(n) && p.last === n ? p : persist({ ...p, read: p.read.includes(n) ? p.read : [...p.read, n], last: n })), [persist]);
  const toggleBm = useCallback((n: number) => setS((p) => persist({ ...p, bm: p.bm.includes(n) ? p.bm.filter((x) => x !== n) : [...p.bm, n] })), [persist]);

  // reset reading progress for THIS book only — clears read chapters + last
  // position. Bookmarks/notes preserved unless explicitly opted in.
  const reset = useCallback((opts?: { bookmarks?: boolean; notes?: boolean }) => setS((p) => {
    const next: ReaderState = { read: [], last: 0, bm: opts?.bookmarks ? [] : p.bm };
    if (opts?.notes) { try { localStorage.removeItem(`neo:reader:notes:${bookId}`); } catch { /* noop */ } }
    return persist(next);
  }), [persist, bookId]);

  return { ...s, markRead, toggleBm, reset };
}
