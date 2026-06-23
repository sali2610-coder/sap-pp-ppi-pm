"use client";

// NEO Certification — local progress store. SSR-safe via useSyncExternalStore.
// Tracks per-module mastery (seen/correct), best score, attempts, and the daily
// challenge streak. Additive; touches nothing else.

import { useSyncExternalStore } from "react";
import type { CertModule } from "@/lib/cert/generate";

const KEY = "neo:cert";
export interface ModuleStat { seen: number; correct: number; best: number; attempts: number; passed: boolean }
export interface ExamLog { m: string; score: number; pass: boolean; at: number; mode: "exam" | "daily" }
export interface CertState {
  mods: Record<string, ModuleStat>;
  daily: { date: string; streak: number; bestStreak: number; doneToday: boolean };
  log: ExamLog[];
}
const EMPTY: CertState = { mods: {}, daily: { date: "", streak: 0, bestStreak: 0, doneToday: false }, log: [] };

let cache: CertState = EMPTY;
let loaded = false;
const subs = new Set<() => void>();
const emit = () => subs.forEach((f) => f());

function read(): CertState {
  try { const r = JSON.parse(localStorage.getItem(KEY) || "null"); return r && typeof r === "object" ? { ...EMPTY, ...r, daily: { ...EMPTY.daily, ...(r.daily || {}) }, log: Array.isArray(r.log) ? r.log : [] } : EMPTY; } catch { return EMPTY; }
}
function ensure() {
  if (loaded || typeof window === "undefined") return;
  cache = read(); loaded = true;
  window.addEventListener("storage", (e) => { if (e.key === KEY) { cache = read(); emit(); } });
}
function persist() { try { localStorage.setItem(KEY, JSON.stringify(cache)); } catch { /* noop */ } }
const today = () => new Date().toISOString().slice(0, 10);

const stat = (m: string): ModuleStat => cache.mods[m] || { seen: 0, correct: 0, best: 0, attempts: 0, passed: false };

/** record a finished exam: update mastery (rolling), best score, pass flag */
export function recordExam(module: CertModule, score: number, seen: number, correct: number) {
  ensure();
  const s = stat(module);
  const next: ModuleStat = {
    seen: s.seen + seen,
    correct: s.correct + correct,
    best: Math.max(s.best, score),
    attempts: s.attempts + 1,
    passed: s.passed || score >= 80,
  };
  const log: ExamLog[] = [{ m: module, score, pass: score >= 80, at: Date.now(), mode: "exam" as const }, ...cache.log].slice(0, 12);
  cache = { ...cache, mods: { ...cache.mods, [module]: next }, log };
  persist(); emit();
}

/** mark today's daily challenge done; bump streak (reset if a day skipped) */
export function recordDaily(allCorrect: boolean) {
  ensure();
  const t = today();
  if (cache.daily.date === t && cache.daily.doneToday) return;
  const yest = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
  const streak = cache.daily.date === yest ? cache.daily.streak + 1 : 1;
  cache = { ...cache, daily: { date: t, streak, bestStreak: Math.max(cache.daily.bestStreak, streak), doneToday: true } };
  void allCorrect; persist(); emit();
}

export function useCertState(): CertState {
  return useSyncExternalStore(
    (cb) => { ensure(); subs.add(cb); return () => subs.delete(cb); },
    () => { ensure(); return cache; },
    () => EMPTY,
  );
}

/** mastery % for a module (rolling correct/seen) */
export function masteryPct(s: ModuleStat | undefined): number {
  if (!s || !s.seen) return 0;
  return Math.round((s.correct / s.seen) * 100);
}
export const dailyFresh = (d: CertState["daily"]) => d.date !== today() || !d.doneToday;
