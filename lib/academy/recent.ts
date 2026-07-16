"use client";

// Recently-viewed Academy items (lessons / tracks). Real history from localStorage —
// the Home "נצפו לאחרונה" row shows only what the learner actually opened.
import { useEffect, useState } from "react";

const KEY = "neo:academy:recent";
export interface RecentItem { id: string; title: string; module: string; href: string; kind: "lesson" | "track" }

function read(): RecentItem[] {
  if (typeof window === "undefined") return [];
  try { const r = localStorage.getItem(KEY); return r ? (JSON.parse(r) as RecentItem[]) : []; } catch { return []; }
}

export function recordRecent(item: RecentItem) {
  if (typeof window === "undefined") return;
  try {
    const cur = read().filter((x) => x.id !== item.id);
    localStorage.setItem(KEY, JSON.stringify([item, ...cur].slice(0, 8)));
  } catch { /* quota */ }
}

export function useRecent(): RecentItem[] {
  const [items, setItems] = useState<RecentItem[]>([]);
  useEffect(() => { setItems(read()); }, []);
  return items;
}
