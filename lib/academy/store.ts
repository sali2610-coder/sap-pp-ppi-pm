"use client";

/**
 * SAP Academy — single progress store (PR-2).
 *
 * ONE versioned, reactive source of truth for all Academy progress:
 * localStorage `neo:academy:v2`. Every screen (reader / home / path / gamification)
 * derives from here — no more parallel formulas or hardcoded percentages.
 *
 * Percentage rules (documented, used everywhere):
 *   - lesson %   = completed visible blocks / visible blocks
 *   - module %   = completed lessons / total lessons   (a lesson is complete when
 *                  its completed block count ≥ its required block count)
 *
 * Safe migration: reads legacy v1 keys (neo:academy:progress + neo:academy:activity)
 * once into v2 without deleting them (rollback-safe). Versioned for future migrations.
 */
import { useCallback, useSyncExternalStore } from "react";
import { getLesson, getModule, firstIncomplete, type AcademyLesson } from "./model";

const DEFAULT_MODULE = "pm";

const KEY = "neo:academy:v2";
const V1_PROGRESS = "neo:academy:progress";
const V1_ACTIVITY = "neo:academy:activity";
export const WEEKLY_TARGET = 3;

export interface AcademyStore {
  version: 2;
  lessons: Record<string, string[]>;      // slug -> completed block kinds
  activity: string[];                      // ISO day-stamps
  lastLesson: Record<string, string>;      // moduleId -> last-opened slug (per module)
  lastOpened?: string;                     // single most-recent lesson slug (any module)
}

const EMPTY: AcademyStore = { version: 2, lessons: {}, activity: [], lastLesson: {}, lastOpened: "" };

function migrate(): AcademyStore {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) { const s = JSON.parse(raw) as AcademyStore; return { ...EMPTY, ...s, version: 2 }; }
    // build v2 from legacy v1 (do NOT delete v1 — rollback-safe)
    const lessons = JSON.parse(window.localStorage.getItem(V1_PROGRESS) || "{}") as Record<string, string[]>;
    const activity = JSON.parse(window.localStorage.getItem(V1_ACTIVITY) || "[]") as string[];
    const s: AcademyStore = { version: 2, lessons: lessons && typeof lessons === "object" ? lessons : {}, activity: Array.isArray(activity) ? activity : [], lastLesson: {} };
    window.localStorage.setItem(KEY, JSON.stringify(s));
    return s;
  } catch { return { ...EMPTY }; }
}

// reactive external store
let snap: AcademyStore = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();
const emit = () => { for (const l of listeners) l(); };
function subscribe(cb: () => void) {
  if (!hydrated && typeof window !== "undefined") { snap = migrate(); hydrated = true; }
  listeners.add(cb);
  const on = (e: StorageEvent) => { if (e.key === KEY) { try { snap = e.newValue ? JSON.parse(e.newValue) : EMPTY; } catch { /* ignore */ } emit(); } };
  window.addEventListener("storage", on);
  return () => { listeners.delete(cb); window.removeEventListener("storage", on); };
}
const getSnap = () => snap;
const getServer = () => EMPTY;
function write(next: AcademyStore) { snap = next; try { window.localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* quota */ } emit(); }
function useStore() { return useSyncExternalStore(subscribe, getSnap, getServer); }

const today = () => new Date().toISOString().slice(0, 10);

/** A lesson is complete when its completed block count ≥ its required block count. */
function lessonDoneIn(store: AcademyStore, slug: string): boolean {
  const req = getLesson(slug)?.requiredBlocks ?? 0;
  const done = (store.lessons[slug] || []).length;
  return req > 0 && done >= req;
}
export function isLessonDone(slug: string): boolean { return lessonDoneIn(snap, slug); }

/** Record that the learner was active today (call on any progress). */
export function recordActivity() {
  if (typeof window === "undefined") return;
  const cur = snap.activity || [];
  const t = today();
  if (!cur.includes(t)) write({ ...snap, activity: [...cur, t] });
}

export function setLastLesson(moduleId: string, slug: string) {
  if (!moduleId || !slug) return;
  if (snap.lastOpened === slug && snap.lastLesson?.[moduleId] === slug) return;
  write({ ...snap, lastLesson: { ...snap.lastLesson, [moduleId]: slug }, lastOpened: slug });
}
export const getLastLesson = (moduleId: string): string | undefined => snap.lastLesson?.[moduleId];

/**
 * Continue-learning target (§7): the true next lesson to resume.
 *   1. last-opened lesson, if not yet complete
 *   2. else first incomplete lesson of the module you were last in
 *   3. else first incomplete lesson of the default module (PM)
 *   4. else (all complete) first lesson of the default module
 */
function continueTargetFrom(store: AcademyStore): AcademyLesson | undefined {
  const done = (s: string) => lessonDoneIn(store, s);
  const lo = store.lastOpened;
  if (lo) {
    const l = getLesson(lo);
    if (l && !done(lo)) return l;
    if (l) { const fi = firstIncomplete(l.moduleId, done); if (fi) return fi; }
  }
  return firstIncomplete(DEFAULT_MODULE, done);
}
export function useContinueTarget(): AcademyLesson | undefined {
  const store = useStore();
  return continueTargetFrom(store);
}

/* ---------- reset (3 levels + all) — UI wired in PR-5 ---------- */
export function resetLesson(slug: string) { const { [slug]: _, ...rest } = snap.lessons; void _; write({ ...snap, lessons: rest }); }
export function resetChapter(moduleId: string, chapterIndex: number) {
  const m = getModule(moduleId); if (!m) return;
  const slugs = new Set(m.chapters.find((c) => c.index === chapterIndex)?.lessons.map((l) => l.slug));
  const lessons = Object.fromEntries(Object.entries(snap.lessons).filter(([s]) => !slugs.has(s)));
  write({ ...snap, lessons });
}
export function resetPath(moduleId: string) {
  const m = getModule(moduleId); if (!m) return;
  const slugs = new Set(m.lessons.map((l) => l.slug));
  const lessons = Object.fromEntries(Object.entries(snap.lessons).filter(([s]) => !slugs.has(s)));
  write({ ...snap, lessons, lastLesson: { ...snap.lastLesson, [moduleId]: "" } });
}
export function resetAll() { write({ version: 2, lessons: {}, activity: [], lastLesson: {} }); }

/* ---------- hooks ---------- */

/** Drop-in replacement for the legacy per-lesson hook (same signature/return). */
export function useLessonProgress(slug: string, visibleKinds: string[]) {
  const store = useStore();
  const done = store.lessons[slug] || [];
  const doneSet = new Set(done.filter((k) => visibleKinds.includes(k)));
  const pct = visibleKinds.length ? Math.round((doneSet.size / visibleKinds.length) * 100) : 0;
  const markDone = useCallback((kind: string) => {
    const cur = snap.lessons[slug] || [];
    if (cur.includes(kind)) return;
    write({ ...snap, lessons: { ...snap.lessons, [slug]: [...cur, kind] } });
  }, [slug]);
  return { doneSet, pct, markDone };
}

/** Module progress from the single rule: completed lessons / total lessons. */
export interface ModuleProgress { completedLessons: number; totalLessons: number; pct: number; blocksDone: number }
export function useModuleProgress(moduleId: string): ModuleProgress {
  const store = useStore();
  const m = getModule(moduleId);
  if (!m) return { completedLessons: 0, totalLessons: 0, pct: 0, blocksDone: 0 };
  const authored = m.lessons.filter((l) => l.hasLesson);
  const total = authored.length;
  const completed = authored.filter((l) => lessonDoneIn(store, l.slug)).length;
  const blocksDone = authored.reduce((s, l) => s + (store.lessons[l.slug]?.length || 0), 0);
  return { completedLessons: completed, totalLessons: total, pct: total ? Math.round((completed / total) * 100) : 0, blocksDone };
}

/** Legacy 0..1 lesson fraction (kept for existing callers). */
export function useLessonPct(slug: string, total: number): number {
  const store = useStore();
  return total ? Math.min(1, (store.lessons[slug]?.length || 0) / total) : 0;
}

/* ---------- gamification (streak / weekly / badges) — from v2 ---------- */
function streakFrom(days: string[]): { current: number; longest: number } {
  if (!days.length) return { current: 0, longest: 0 };
  const set = new Set(days);
  let current = 0; const cur = new Date();
  if (!set.has(cur.toISOString().slice(0, 10))) cur.setDate(cur.getDate() - 1);
  while (set.has(cur.toISOString().slice(0, 10))) { current++; cur.setDate(cur.getDate() - 1); }
  const sorted = [...set].sort(); let longest = 1, run = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]); prev.setDate(prev.getDate() + 1);
    if (prev.toISOString().slice(0, 10) === sorted[i]) run++; else run = 1;
    longest = Math.max(longest, run);
  }
  return { current, longest: Math.max(longest, current) };
}

export interface Gamification {
  streak: number; longestStreak: number;
  weeklyDone: number; weeklyTarget: number;
  activeDays7: boolean[];
  lessonsInProgress: number; blocksDone: number;
  badges: { id: string; label: string; hint: string; emoji: string; earned: boolean }[];
}
export function computeGamification(store: AcademyStore = snap): Gamification {
  const progress = store.lessons || {};
  const activity = store.activity || [];
  const { current, longest } = streakFrom(activity);
  const slugs = Object.keys(progress);
  const blocksDone = Object.values(progress).reduce((s, a) => s + a.length, 0);
  const now = new Date(); const sow = new Date(now); sow.setDate(now.getDate() - now.getDay());
  const activeDays7 = Array.from({ length: 7 }, (_, i) => { const d = new Date(sow); d.setDate(sow.getDate() + i); return activity.includes(d.toISOString().slice(0, 10)); });
  const weeklyDone = activeDays7.filter(Boolean).length;
  const badges = [
    { id: "first", label: "צעד ראשון", hint: "התחלת שיעור", emoji: "🎯", earned: slugs.length >= 1 },
    { id: "blocks10", label: "10 בלוקים", hint: "10 בלוקים הושלמו", emoji: "📚", earned: blocksDone >= 10 },
    { id: "streak3", label: "רצף 3", hint: "3 ימים ברצף", emoji: "🔥", earned: current >= 3 || longest >= 3 },
    { id: "streak7", label: "רצף 7", hint: "שבוע ברצף", emoji: "⚡", earned: longest >= 7 },
    { id: "lesson", label: "שיעור שלם", hint: "השלמת שיעור", emoji: "🏭", earned: Object.values(progress).some((a) => a.length >= 12) },
  ];
  return { streak: current, longestStreak: longest, weeklyDone, weeklyTarget: WEEKLY_TARGET, activeDays7, lessonsInProgress: slugs.length, blocksDone, badges };
}
export function useGamification(): Gamification {
  const store = useStore();
  return computeGamification(store);
}
