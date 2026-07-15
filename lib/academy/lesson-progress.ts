"use client";

// Per-lesson block-completion progress (localStorage, SSR-safe). Completion is
// computed only over VISIBLE blocks (the ones actually rendered for this lesson).
import { useCallback, useSyncExternalStore } from "react";

const KEY = "neo:academy:progress";
type Store = Record<string, string[]>; // slug -> completed block kinds

function read(): Store {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(window.localStorage.getItem(KEY) || "{}") as Store; } catch { return {}; }
}
const listeners = new Set<() => void>();
let snap: Store = {};
let hydrated = false;
const emit = () => { for (const l of listeners) l(); };
function subscribe(cb: () => void) {
  if (!hydrated && typeof window !== "undefined") { snap = read(); hydrated = true; }
  listeners.add(cb);
  const on = (e: StorageEvent) => { if (e.key === KEY) { snap = read(); emit(); } };
  window.addEventListener("storage", on);
  return () => { listeners.delete(cb); window.removeEventListener("storage", on); };
}
const getSnap = () => snap;
const EMPTY: Store = {};
const getServer = () => EMPTY;
function write(next: Store) { snap = next; try { window.localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* quota */ } emit(); }

export function useLessonProgress(slug: string, visibleKinds: string[]) {
  const store = useSyncExternalStore(subscribe, getSnap, getServer);
  const done = store[slug] || [];
  const doneSet = new Set(done.filter((k) => visibleKinds.includes(k)));
  const pct = visibleKinds.length ? Math.round((doneSet.size / visibleKinds.length) * 100) : 0;
  const markDone = useCallback((kind: string) => {
    const cur = snap[slug] || [];
    if (cur.includes(kind)) return;
    write({ ...snap, [slug]: [...cur, kind] });
  }, [slug]);
  return { doneSet, pct, markDone };
}
