/**
 * SAP Academy — canonical model (Truth Layer, PR-1).
 *
 * ONE derivation of module → chapter → lesson with STABLE ids (the slug),
 * path-derived positions and prev/next/prereq. Everything (numbering, navigation,
 * locking, progress %) must read from here — never from the authored `lesson.index`,
 * array position, or hardcoded constants.
 *
 * Pure + React-free so scripts (academy-coverage) can import it. Derives order
 * from lib/academy/paths.ts (the intended order) and resolves lesson existence +
 * block counts from data/academy/lessons (ALL_LESSONS). This module is ADDITIVE —
 * it does not change any rendering yet.
 */
import { PM_PATH, PP_PATH, QM_PATH, type LearningPath } from "./paths";
import { PMU_PATH } from "@/data/academy/lessons/pmu-generated";
import { ALL_LESSONS } from "@/data/academy/lessons";
import { orderedBlocks } from "./lesson-types";

const PATHS: LearningPath[] = [PM_PATH, PP_PATH, QM_PATH, PMU_PATH];

/** Module id used in routes (/academy/path/[moduleId]): PM→"pm", PP-PI→"pp-pi", QM→"qm". */
export const moduleIdOf = (module: string): string => module.toLowerCase();

export interface AcademyLesson {
  slug: string;
  moduleId: string;
  module: string;
  title: string;
  chapterIndex: number;   // 1-based position of the chapter in the module
  chapterTitle: string;
  posInChapter: number;   // 1-based position of the lesson in its chapter (DISPLAY number)
  chapterSize: number;
  globalIndex: number;    // 1-based position across the whole module (authored slugged lessons only)
  globalTotal: number;
  prev?: string;          // slug — path order
  next?: string;          // slug — path order
  prereq?: string;        // slug that must be completed before this unlocks (previous in path); undefined = first
  minutes?: number;
  level?: string;
  hasLesson: boolean;     // true if the slug exists in ALL_LESSONS (a real Reader lesson)
  requiredBlocks: number; // visible block count (pct denominator) — 0 if not authored yet
}

export interface AcademyChapter { index: number; title: string; lessons: AcademyLesson[] }
export interface AcademyModule {
  moduleId: string; module: string; title: string; titleEn?: string; color: string;
  chapters: AcademyChapter[];
  lessons: AcademyLesson[];   // flat, path order (slugged only)
  totalLessons: number;
}

function buildModule(path: LearningPath): AcademyModule {
  const moduleId = moduleIdOf(path.module);
  // flat slugged lessons in path order
  const flat: { chapterIndex: number; chapterTitle: string; posInChapter: number; chapterSize: number; slug: string; title: string; minutes?: number; level?: string }[] = [];
  path.chapters.forEach((ch, ci) => {
    const slugged = ch.lessons.filter((l) => l.slug);
    ch.lessons.forEach((l) => {
      if (!l.slug) return;
      flat.push({
        chapterIndex: ci + 1, chapterTitle: ch.title,
        posInChapter: slugged.indexOf(l) + 1, chapterSize: slugged.length,
        slug: l.slug, title: l.title, minutes: l.minutes, level: l.level,
      });
    });
  });
  const total = flat.length;
  const lessons: AcademyLesson[] = flat.map((f, i) => {
    const has = !!ALL_LESSONS[f.slug];
    return {
      slug: f.slug, moduleId, module: path.module, title: f.title,
      chapterIndex: f.chapterIndex, chapterTitle: f.chapterTitle,
      posInChapter: f.posInChapter, chapterSize: f.chapterSize,
      globalIndex: i + 1, globalTotal: total,
      prev: i > 0 ? flat[i - 1].slug : undefined,
      next: i < total - 1 ? flat[i + 1].slug : undefined,
      prereq: i > 0 ? flat[i - 1].slug : undefined,
      minutes: f.minutes, level: f.level,
      hasLesson: has,
      requiredBlocks: has ? orderedBlocks(ALL_LESSONS[f.slug]).length : 0,
    };
  });
  const chapters: AcademyChapter[] = path.chapters.map((ch, ci) => ({
    index: ci + 1, title: ch.title,
    lessons: lessons.filter((l) => l.chapterIndex === ci + 1),
  }));
  return { moduleId, module: path.module, title: path.title, titleEn: path.titleEn, color: path.color, chapters, lessons, totalLessons: total };
}

/** moduleId → AcademyModule. */
export const ACADEMY: Record<string, AcademyModule> = Object.fromEntries(
  PATHS.map((p) => { const m = buildModule(p); return [m.moduleId, m]; }),
);

/** slug → AcademyLesson (flat index across all modules). */
const BY_SLUG: Record<string, AcademyLesson> = Object.fromEntries(
  Object.values(ACADEMY).flatMap((m) => m.lessons.map((l) => [l.slug, l])),
);

export const getModule = (moduleId: string): AcademyModule | undefined => ACADEMY[moduleId];
export const getLesson = (slug: string): AcademyLesson | undefined => BY_SLUG[slug];
export const allModuleIds = (): string[] => Object.keys(ACADEMY);
export const allLessons = (): AcademyLesson[] => Object.values(BY_SLUG);

/** Path-order prev/next (stable ids — never array index / lesson.index). */
export const prevOf = (slug: string): string | undefined => BY_SLUG[slug]?.prev;
export const nextOf = (slug: string): string | undefined => BY_SLUG[slug]?.next;
export const prereqOf = (slug: string): string | undefined => BY_SLUG[slug]?.prereq;

/**
 * First not-yet-completed lesson in a module's path order — the true "current"
 * lesson (§7). `isDone` reads the single progress store (wired in PR-2/PR-4).
 */
export function firstIncomplete(moduleId: string, isDone: (slug: string) => boolean): AcademyLesson | undefined {
  const m = ACADEMY[moduleId];
  if (!m) return undefined;
  return m.lessons.find((l) => l.hasLesson && !isDone(l.slug)) ?? m.lessons.find((l) => l.hasLesson);
}

/**
 * A lesson is unlocked when its prerequisite (previous lesson in path order) is
 * complete. First lesson is always unlocked. Returns the blocking prereq slug, or
 * null if unlocked. Sequential progression by REAL completion (§8, decision B).
 */
export function lockReason(slug: string, isDone: (slug: string) => boolean): { locked: boolean; prereq?: AcademyLesson } {
  const l = BY_SLUG[slug];
  if (!l || !l.prereq) return { locked: false };
  const done = isDone(l.prereq);
  return done ? { locked: false } : { locked: true, prereq: BY_SLUG[l.prereq] };
}
