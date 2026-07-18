/**
 * SAP Academy — lesson navigation graph (derived, not authored).
 * Builds a slug → position index from the canonical learning paths
 * (PM_PATH / PP_PATH / QM_PATH). NO new knowledge: every value here already
 * exists in the paths. Powers chapter prev/next, return-to-course,
 * prerequisites and rich lesson cards in the reader.
 */
import { PM_PATH, PP_PATH, QM_PATH, type LearningPath } from "@/components/academy/learning-path";

const PATHS: LearningPath[] = [PM_PATH, PP_PATH, QM_PATH];

export interface LessonRef {
  slug: string;
  title: string;
  minutes?: number;
  level?: string;
}

export interface LessonNav {
  module: string;
  color: string;
  courseTitle: string;
  courseHref: string;
  chapterTitle: string;
  chapterIndex: number; // 1-based
  chapterCount: number;
  posInChapter: number; // 1-based
  chapterSize: number;
  /** first authored lesson of the previous / next chapter (chapter-level jump). */
  prevChapter?: { title: string; lesson?: LessonRef };
  nextChapter?: { title: string; lesson?: LessonRef };
}

const INDEX: Map<string, LessonNav> = (() => {
  const m = new Map<string, LessonNav>();
  for (const path of PATHS) {
    const firstAuthored = (ci: number): LessonRef | undefined => {
      const ch = path.chapters[ci];
      if (!ch) return undefined;
      const l = ch.lessons.find((x) => x.slug);
      return l?.slug ? { slug: l.slug, title: l.title, minutes: l.minutes, level: l.level } : undefined;
    };
    path.chapters.forEach((ch, ci) => {
      ch.lessons.forEach((l, li) => {
        if (!l.slug) return;
        m.set(l.slug, {
          module: path.module,
          color: path.color,
          courseTitle: path.title,
          courseHref: `/academy/path/${path.module.toLowerCase()}/`,
          chapterTitle: ch.title,
          chapterIndex: ci + 1,
          chapterCount: path.chapters.length,
          posInChapter: li + 1,
          chapterSize: ch.lessons.length,
          prevChapter: ci > 0 ? { title: path.chapters[ci - 1].title, lesson: firstAuthored(ci - 1) } : undefined,
          nextChapter: ci < path.chapters.length - 1 ? { title: path.chapters[ci + 1].title, lesson: firstAuthored(ci + 1) } : undefined,
        });
      });
    });
  }
  return m;
})();

/** Flat slug → {title, minutes, level} for rich prev/next cards. */
const META: Map<string, LessonRef> = (() => {
  const m = new Map<string, LessonRef>();
  for (const path of PATHS)
    for (const ch of path.chapters)
      for (const l of ch.lessons)
        if (l.slug) m.set(l.slug, { slug: l.slug, title: l.title, minutes: l.minutes, level: l.level });
  return m;
})();

export function lessonNav(slug: string): LessonNav | undefined {
  return INDEX.get(slug);
}

export function lessonRef(slug?: string): LessonRef | undefined {
  return slug ? META.get(slug) : undefined;
}
