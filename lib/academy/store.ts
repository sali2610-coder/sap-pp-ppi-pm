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
import { getLesson, getModule, firstIncomplete, allModuleIds, type AcademyLesson } from "./model";
import { clearRecent, clearRecentModule } from "./recent";

const DEFAULT_MODULE = "pm";

const KEY = "neo:academy:v2";
const V1_PROGRESS = "neo:academy:progress";
const V1_ACTIVITY = "neo:academy:activity";
export const WEEKLY_TARGET = 3;

export interface AcademyEvent { t: number; k: "block" | "quiz"; slug: string }

export interface AcademyStore {
  version: 2;
  lessons: Record<string, string[]>;      // slug -> completed block kinds
  activity: string[];                      // ISO day-stamps
  lastLesson: Record<string, string>;      // moduleId -> last-opened slug (per module)
  lastOpened?: string;                     // single most-recent lesson slug (any module)
  // ---- PR-A additive analytics (all optional; migration spreads over EMPTY) ----
  lastCourse?: string;                     // moduleId most recently opened (Continue priority)
  openedAt?: Record<string, number>;       // moduleId -> epoch ms of last open
  blockAt?: Record<string, string>;        // slug -> last viewed block kind (exact-resume)
  events?: AcademyEvent[];                 // capped activity log (block / quiz)
  msByDay?: Record<string, number>;        // ISO day -> active study ms
}

const EMPTY: AcademyStore = { version: 2, lessons: {}, activity: [], lastLesson: {}, lastOpened: "", lastCourse: "", openedAt: {}, blockAt: {}, events: [], msByDay: {} };

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
const now = () => Date.now();
const startOfToday = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d.getTime(); };
const MAX_GAP = 120_000; // cap inter-event delta counted as active study time (2 min)

/** A lesson is complete when its completed block count ≥ its required block count. */
function lessonDoneIn(store: AcademyStore, slug: string): boolean {
  const req = getLesson(slug)?.requiredBlocks ?? 0;
  const done = (store.lessons[slug] || []).length;
  return req > 0 && done >= req;
}
export function isLessonDone(slug: string): boolean { return lessonDoneIn(snap, slug); }
/** Reactive "is this lesson complete" predicate (for locking in the path view). */
export function useIsDone(): (slug: string) => boolean {
  const store = useStore();
  return (slug: string) => lessonDoneIn(store, slug);
}

/** Record that the learner was active today (call on any progress). */
export function recordActivity() {
  if (typeof window === "undefined") return;
  const cur = snap.activity || [];
  const t = today();
  if (!cur.includes(t)) write({ ...snap, activity: [...cur, t] });
}

export function setLastLesson(moduleId: string, slug: string) {
  if (!moduleId || !slug) return;
  // always refresh openedAt / lastCourse (drives Continue priority + "time ago")
  write({
    ...snap,
    lastLesson: { ...snap.lastLesson, [moduleId]: slug },
    lastOpened: slug,
    lastCourse: moduleId,
    openedAt: { ...(snap.openedAt || {}), [moduleId]: now() },
  });
}
/** Alias with intent-revealing name (§1/§5). */
export const recordOpen = setLastLesson;
export const getLastLesson = (moduleId: string): string | undefined => snap.lastLesson?.[moduleId];

/**
 * Record a viewed/completed block (§6/§8). Appends to the capped event log,
 * remembers the last block per lesson (exact-resume, §5), accrues active study
 * minutes (capped inter-event gap), and stamps today's activity.
 */
export function recordBlock(slug: string, kind: string) {
  if (typeof window === "undefined" || !slug || !kind) return;
  const t = today();
  const ev = snap.events || [];
  const last = ev[ev.length - 1];
  const delta = last ? now() - last.t : 0;
  const addMs = delta > 0 && delta < MAX_GAP ? delta : 0;
  const k: AcademyEvent["k"] = kind === "quiz" ? "quiz" : "block";
  const activity = snap.activity?.includes(t) ? snap.activity : [...(snap.activity || []), t];
  write({
    ...snap,
    events: [...ev, { t: now(), k, slug }].slice(-500),
    blockAt: { ...(snap.blockAt || {}), [slug]: kind },
    msByDay: { ...(snap.msByDay || {}), [t]: (snap.msByDay?.[t] || 0) + addMs },
    activity,
  });
}
export const getLastBlock = (slug: string): string | undefined => snap.blockAt?.[slug];
export function useLastBlock(slug: string): string | undefined {
  const store = useStore();
  return store.blockAt?.[slug];
}

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

/* ---------- course-level continue + multi-course (§1/§2) ---------- */

export interface CourseCard {
  moduleId: string; module: string;
  resumeSlug: string; resumeBlock?: string;
  chapterIndex: number; chapterTitle: string;
  lessonNum: number; chapterSize: number; lessonTitle: string;
  pct: number; completedLessons: number; totalLessons: number;
  openedAt?: number;
}

function moduleProgressIn(store: AcademyStore, moduleId: string) {
  const m = getModule(moduleId);
  if (!m) return null;
  const authored = m.lessons.filter((l) => l.hasLesson);
  const total = authored.length;
  const completed = authored.filter((l) => lessonDoneIn(store, l.slug)).length;
  const blocks = authored.reduce((s, l) => s + (store.lessons[l.slug]?.length || 0), 0);
  return { m, authored, total, completed, blocks, pct: total ? Math.round((completed / total) * 100) : 0 };
}

/** The lesson to resume within a module: last-opened if incomplete, else first incomplete, else last. */
function resumeLessonOf(store: AcademyStore, moduleId: string): AcademyLesson | undefined {
  const done = (s: string) => lessonDoneIn(store, s);
  const lo = store.lastLesson?.[moduleId];
  if (lo && getLesson(lo) && !done(lo)) return getLesson(lo);
  const fi = firstIncomplete(moduleId, done);
  if (fi) return fi;
  const m = getModule(moduleId);
  const last = m?.lessons.filter((l) => l.hasLesson).slice(-1)[0]?.slug;
  return last ? getLesson(last) : undefined;
}

function cardFor(store: AcademyStore, moduleId: string): CourseCard | null {
  const p = moduleProgressIn(store, moduleId);
  if (!p) return null;
  const lesson = resumeLessonOf(store, moduleId);
  if (!lesson) return null;
  return {
    moduleId, module: lesson.module,
    resumeSlug: lesson.slug, resumeBlock: store.blockAt?.[lesson.slug],
    chapterIndex: lesson.chapterIndex, chapterTitle: lesson.chapterTitle,
    lessonNum: lesson.posInChapter, chapterSize: lesson.chapterSize, lessonTitle: lesson.title,
    pct: p.pct, completedLessons: p.completed, totalLessons: p.total,
    openedAt: store.openedAt?.[moduleId],
  };
}

/** A course is "active" if it has any recorded progress or was opened. */
function activeCoursesFrom(store: AcademyStore): CourseCard[] {
  const cards = allModuleIds()
    .map((id) => cardFor(store, id))
    .filter((c): c is CourseCard => !!c)
    .filter((c) => c.completedLessons > 0 || (store.openedAt?.[c.moduleId] ?? 0) > 0 ||
      (getModule(c.moduleId)?.lessons.some((l) => (store.lessons[l.slug]?.length || 0) > 0)));
  // sort: most recently opened first, then highest progress
  return cards.sort((a, b) => (b.openedAt ?? 0) - (a.openedAt ?? 0) || b.pct - a.pct);
}
export function useActiveCourses(): CourseCard[] {
  const store = useStore();
  return activeCoursesFrom(store);
}

/**
 * Continue-course (§1) priority — NOT a hardcoded module:
 *   1. lastCourse (last opened) if it still has an incomplete lesson
 *   2. lastActiveCourse — highest openedAt with an incomplete lesson
 *   3. highestRecentActivity — module of the most recent block event
 *   4. NO active session → null (true clean/landing state — never assume PM)
 */
function continueCourseFrom(store: AcademyStore): CourseCard | null {
  const hasIncomplete = (id: string) => { const p = moduleProgressIn(store, id); return p ? p.completed < p.total : false; };
  const started = (id: string) => (store.openedAt?.[id] ?? 0) > 0 || getModule(id)?.lessons.some((l) => (store.lessons[l.slug]?.length || 0) > 0);
  // 1 — last-opened course, if actually started + still incomplete
  if (store.lastCourse && started(store.lastCourse) && hasIncomplete(store.lastCourse)) return cardFor(store, store.lastCourse);
  // 2 — most recently opened course with an incomplete lesson
  const byOpened = Object.entries(store.openedAt || {}).sort((a, b) => b[1] - a[1]).map(([id]) => id);
  for (const id of byOpened) if (hasIncomplete(id)) return cardFor(store, id);
  // 3 — module of the most recent block event
  const ev = store.events || [];
  for (let i = ev.length - 1; i >= 0; i--) { const id = getLesson(ev[i].slug)?.moduleId; if (id && started(id) && hasIncomplete(id)) return cardFor(store, id); }
  // 4 — no active learning session at all → landing state (never fall back to PM)
  return null;
}
export function useContinueCourse(): CourseCard | null {
  const store = useStore();
  return continueCourseFrom(store);
}

/* ---------- completion detectors for celebrations (§10) ---------- */
export function isModuleComplete(moduleId: string): boolean {
  const p = moduleProgressIn(snap, moduleId);
  return !!p && p.total > 0 && p.completed >= p.total;
}
export function isChapterComplete(moduleId: string, chapterIndex: number): boolean {
  const m = getModule(moduleId); if (!m) return false;
  const ls = m.lessons.filter((l) => l.chapterIndex === chapterIndex && l.hasLesson);
  return ls.length > 0 && ls.every((l) => lessonDoneIn(snap, l.slug));
}

/* ---------- today / activity widget (§6) ---------- */
export interface TodayStats { lessons: number; blocks: number; quizzes: number; minutes: number }
function todayStatsFrom(store: AcademyStore): TodayStats {
  const from = startOfToday();
  const ev = (store.events || []).filter((e) => e.t >= from);
  const blocks = ev.filter((e) => e.k === "block").length;
  const quizzes = ev.filter((e) => e.k === "quiz").length;
  const lessons = new Set(ev.map((e) => e.slug).filter((s) => lessonDoneIn(store, s))).size;
  const minutes = Math.round((store.msByDay?.[today()] || 0) / 60000);
  return { lessons, blocks, quizzes, minutes };
}
export function useTodayStats(): TodayStats {
  const store = useStore();
  return todayStatsFrom(store);
}

/* ---------- reset (3 levels + all) — UI wired in PR-5 ---------- */
export function resetLesson(slug: string) { const { [slug]: _, ...rest } = snap.lessons; void _; write({ ...snap, lessons: rest }); }
const without = <T,>(obj: Record<string, T> | undefined, drop: (k: string) => boolean): Record<string, T> =>
  Object.fromEntries(Object.entries(obj || {}).filter(([k]) => !drop(k)));

/** Reset one chapter (§4) — clears its lessons, block positions, and events only. Course stays active. */
export function resetChapter(moduleId: string, chapterIndex: number) {
  const m = getModule(moduleId); if (!m) return;
  const slugs = new Set(m.chapters.find((c) => c.index === chapterIndex)?.lessons.map((l) => l.slug) || []);
  const has = (s: string) => slugs.has(s);
  const lastLesson = has(snap.lastLesson?.[moduleId] || "") ? { ...snap.lastLesson, [moduleId]: "" } : snap.lastLesson;
  write({
    ...snap,
    lessons: without(snap.lessons, has),
    blockAt: without(snap.blockAt, has),
    events: (snap.events || []).filter((e) => !has(e.slug)),
    lastLesson,
    lastOpened: has(snap.lastOpened || "") ? "" : snap.lastOpened,
  });
}

/** Reset one course (§3) — course-only: lessons, blocks, quiz status, positions, Continue anchor. */
export function resetPath(moduleId: string) {
  const m = getModule(moduleId); if (!m) return;
  const slugs = new Set(m.lessons.map((l) => l.slug));
  const has = (s: string) => slugs.has(s);
  write({
    ...snap,
    lessons: without(snap.lessons, has),
    blockAt: without(snap.blockAt, has),
    events: (snap.events || []).filter((e) => !has(e.slug)),
    openedAt: without(snap.openedAt, (k) => k === moduleId),
    lastLesson: { ...snap.lastLesson, [moduleId]: "" },
    lastOpened: has(snap.lastOpened || "") ? "" : snap.lastOpened,
    lastCourse: snap.lastCourse === moduleId ? "" : snap.lastCourse,
  });
  clearRecentModule(moduleId);   // drop this course from "recently viewed" too
}

/** Full reset — return the Academy to a brand-new-user state. Clears the v2 store,
 *  the separate "recently viewed" store, AND the v1 legacy keys so nothing survives. */
export function resetAll() {
  write({ ...EMPTY });
  clearRecent();
  if (typeof window !== "undefined") {
    try { window.localStorage.removeItem(V1_PROGRESS); window.localStorage.removeItem(V1_ACTIVITY); } catch { /* ignore */ }
  }
}

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
