"use client";

// Onboarding journey progress — which milestones the new consultant completed.
// SSR-safe (useSyncExternalStore). Separate from the first-run `neo:onboarded`
// flag and from learn progress.

import { useSyncExternalStore } from "react";

const KEY = "neo:onboard:journey";
let cache: string[] = [];
let loaded = false;
const subs = new Set<() => void>();
const emit = () => subs.forEach((f) => f());
const EMPTY: string[] = [];

function read(): string[] { try { const r = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(r) ? r : []; } catch { return []; } }
function ensure() {
  if (loaded || typeof window === "undefined") return;
  cache = read(); loaded = true;
  window.addEventListener("storage", (e) => { if (e.key === KEY) { cache = read(); emit(); } });
}

export function markStage(id: string, done = true) {
  ensure();
  const s = new Set(cache);
  done ? s.add(id) : s.delete(id);
  cache = [...s];
  try { localStorage.setItem(KEY, JSON.stringify(cache)); } catch { /* noop */ }
  emit();
}
export function resetJourney() { ensure(); cache = []; try { localStorage.setItem(KEY, "[]"); } catch { /* noop */ } emit(); }

export function useJourney(): string[] {
  return useSyncExternalStore(
    (cb) => { ensure(); subs.add(cb); return () => subs.delete(cb); },
    () => { ensure(); return cache; },
    () => EMPTY,
  );
}
