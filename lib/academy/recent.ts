"use client";

// Recently-viewed Academy items (lessons / tracks). Real history from localStorage —
// the Home "נצפו לאחרונה" row shows only what the learner actually opened. Reactive:
// emits a "neo:recent" event so any mounted list refreshes immediately after a reset
// (no page reload needed) — part of the true clean-state guarantee.
import { useEffect, useState } from "react";

const KEY = "neo:academy:recent";
const EVENT = "neo:recent";
export interface RecentItem { id: string; title: string; module: string; href: string; kind: "lesson" | "track" }

function read(): RecentItem[] {
  if (typeof window === "undefined") return [];
  try { const r = localStorage.getItem(KEY); return r ? (JSON.parse(r) as RecentItem[]) : []; } catch { return []; }
}
function emit() { if (typeof window !== "undefined") window.dispatchEvent(new Event(EVENT)); }

export function recordRecent(item: RecentItem) {
  if (typeof window === "undefined") return;
  try {
    const cur = read().filter((x) => x.id !== item.id);
    localStorage.setItem(KEY, JSON.stringify([item, ...cur].slice(0, 8)));
    emit();
  } catch { /* quota */ }
}

/** Clear ALL recently-viewed history (full reset). */
export function clearRecent() {
  if (typeof window === "undefined") return;
  try { localStorage.removeItem(KEY); emit(); } catch { /* ignore */ }
}

/** Drop recently-viewed items belonging to one module (course reset). */
export function clearRecentModule(moduleId: string) {
  if (typeof window === "undefined") return;
  try {
    const next = read().filter((x) => x.module.toLowerCase() !== moduleId.toLowerCase());
    localStorage.setItem(KEY, JSON.stringify(next));
    emit();
  } catch { /* ignore */ }
}

export function useRecent(): RecentItem[] {
  const [items, setItems] = useState<RecentItem[]>([]);
  useEffect(() => {
    const sync = () => setItems(read());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);   // cross-tab
    return () => { window.removeEventListener(EVENT, sync); window.removeEventListener("storage", sync); };
  }, []);
  return items;
}
