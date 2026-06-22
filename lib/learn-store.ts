"use client";

// Learning progress — per-path completed steps. SSR-safe (useSyncExternalStore):
// server + first client render agree (empty), then hydrate from localStorage.
// Additive learning layer only — touches nothing in graph/architecture/S4.

import { useSyncExternalStore } from "react";

const KEY = "neo:learn:progress";
type Progress = Record<string, string[]>; // pathId -> done step ids

let cache: Progress = {};
let loaded = false;
const subs = new Set<() => void>();

function read(): Progress {
  try {
    const r = JSON.parse(localStorage.getItem(KEY) || "{}");
    return r && typeof r === "object" ? r : {};
  } catch {
    return {};
  }
}
function ensure() {
  if (loaded || typeof window === "undefined") return;
  cache = read();
  loaded = true;
  window.addEventListener("storage", (e) => { if (e.key === KEY) { cache = read(); emit(); } });
}
function emit() { subs.forEach((f) => f()); }
function persist() { try { localStorage.setItem(KEY, JSON.stringify(cache)); } catch { /* noop */ } }

export function markDone(pathId: string, stepId: string, done = true) {
  ensure();
  const cur = new Set(cache[pathId] || []);
  done ? cur.add(stepId) : cur.delete(stepId);
  cache = { ...cache, [pathId]: [...cur] };
  persist();
  emit();
}
export function resetPath(pathId: string) {
  ensure();
  cache = { ...cache, [pathId]: [] };
  persist();
  emit();
}

export function useDoneSet(pathId: string): Set<string> {
  const arr = useSyncExternalStore(
    (cb) => { ensure(); subs.add(cb); return () => subs.delete(cb); },
    () => { ensure(); return cache[pathId] || EMPTY; },
    () => EMPTY,
  );
  return new Set(arr);
}
const EMPTY: string[] = [];
const EMPTY_MAP: Progress = {};

/** all per-path done sets (reactive) — for the learning metrics dashboard */
export function useAllProgress(): Progress {
  return useSyncExternalStore(
    (cb) => { ensure(); subs.add(cb); return () => subs.delete(cb); },
    () => { ensure(); return cache; },
    () => EMPTY_MAP,
  );
}

/** daily learning streak — real usage signal. Bumps once per day; resets if a
 *  day is skipped. SSR-safe (no-op on server, returns 0). */
const STREAK_KEY = "neo:learn:streak";
export function bumpStreak(): number {
  if (typeof window === "undefined") return 0;
  try {
    const today = new Date().toISOString().slice(0, 10);
    const raw = JSON.parse(localStorage.getItem(STREAK_KEY) || "{}");
    let days: number = typeof raw.days === "number" ? raw.days : 0;
    const last: string | undefined = raw.last;
    if (last === today) return days || 1;
    const yest = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    days = last === yest ? days + 1 : 1;
    localStorage.setItem(STREAK_KEY, JSON.stringify({ last: today, days }));
    return days;
  } catch { return 0; }
}

/** completion %, current (you-are-here) index, next index */
export function pathState(doneSet: Set<string>, stepIds: string[]) {
  const doneCount = stepIds.filter((id) => doneSet.has(id)).length;
  const pct = stepIds.length ? Math.round((doneCount / stepIds.length) * 100) : 0;
  const current = stepIds.findIndex((id) => !doneSet.has(id)); // first not-done
  return { doneCount, total: stepIds.length, pct, current: current === -1 ? stepIds.length - 1 : current, complete: doneCount === stepIds.length };
}
