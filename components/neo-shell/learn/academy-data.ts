/* ============================================================================
   PROJECT NEO · /neo/academy — BUILD-TIME data.
   ----------------------------------------------------------------------------
   Runs on the SERVER. The routes call this once and hand the result to the
   client surfaces as one plain serialisable object.

   THE SOURCE, AND ONLY THE SOURCE
     lib/academy/model.ts — the academy's canonical model. It derives module →
     chapter → lesson from the authored learning paths, resolves each lesson's
     existence and block count from the generated lesson-block map, and assigns
     stable ids, path order and prerequisites. It is the SAME model the live
     academy, its progress store and its navigation already read; nothing here
     is a second derivation.

   WHAT IS DELIBERATELY *NOT* HERE
     · No course is invented. The eight courses below are the eight authored
       learning paths, no more.
     · No progress figure is baked in. Progress is a property of the READER, not
       of the build, and it is read on the client from the product's own store
       (`neo:academy:v2`). A course a reader has never opened renders no bar at
       all rather than a decorative 0%.
     · No lesson body is copied. A lesson links to the page that already renders
       it; a lesson with no authored body is rendered as an inert value.
     · The authored per-path hex colours are ignored on purpose. Module identity
       in this namespace comes from --mod-* (see components/neo-shell/learn/
       mod.ts), so the academy cannot drift into a second palette.
   ========================================================================== */

import { ACADEMY, type AcademyModule } from "@/lib/academy/model";

export interface AcademyLessonRow {
  slug: string;
  title: string;
  /** 1-based position inside its chapter — the number the reader sees. */
  pos: number;
  chapter: number;
  minutes: number;
  level: string;
  /** Authored body present, i.e. a real generated lesson page exists. */
  hasLesson: boolean;
  /** Content blocks the lesson requires for completion, from the generated map. */
  blocks: number;
  /** The slug that must be completed first, or "" for the first lesson. */
  prereq: string;
  /** A real generated route, or "" when the lesson has no authored body. */
  href: string;
}

export interface AcademyChapterRow {
  index: number;
  title: string;
  lessons: AcademyLessonRow[];
  minutes: number;
}

export interface AcademyCourseRow {
  id: string;
  module: string;
  title: string;
  titleEn: string;
  chapters: AcademyChapterRow[];
  totals: { chapters: number; lessons: number; minutes: number; blocks: number };
  /** Levels the course's own lessons declare, in reading order, with counts. */
  levels: { he: string; n: number }[];
  href: string;
  hay: string;
}

export interface AcademyFacet { id: string; he: string; n: number }

export interface AcademyData {
  courses: AcademyCourseRow[];
  levels: AcademyFacet[];
  totals: { courses: number; chapters: number; lessons: number; minutes: number; blocks: number; levels: number };
}

/** Where the authored lesson body is already rendered. Gated on `hasLesson`, so
 *  this can only ever point at a page generateStaticParams actually built. */
const lessonHref = (slug: string) => `/academy/lesson/${slug}/`;

/** Level order as the paths themselves use it: easiest first. A level the data
 *  introduces that is not on this list still appears — it sorts last rather
 *  than being dropped. */
const LEVEL_ORDER = ["בסיסי", "בינוני", "מורכב"];
const levelRank = (l: string) => {
  const i = LEVEL_ORDER.indexOf(l);
  return i < 0 ? 99 : i;
};

function courseOf(m: AcademyModule): AcademyCourseRow {
  const chapters: AcademyChapterRow[] = m.chapters.map((ch) => {
    const lessons: AcademyLessonRow[] = ch.lessons.map((l) => ({
      slug: l.slug,
      title: l.title,
      pos: l.posInChapter,
      chapter: l.chapterIndex,
      minutes: l.minutes ?? 0,
      level: l.level ?? "",
      hasLesson: l.hasLesson,
      blocks: l.requiredBlocks ?? 0,
      prereq: l.prereq ?? "",
      href: l.hasLesson ? lessonHref(l.slug) : "",
    }));
    return {
      index: ch.index,
      title: ch.title,
      lessons,
      minutes: lessons.reduce((a, l) => a + l.minutes, 0),
    };
  });

  const all = chapters.flatMap((c) => c.lessons);
  const levelCount = new Map<string, number>();
  for (const l of all) if (l.level) levelCount.set(l.level, (levelCount.get(l.level) ?? 0) + 1);

  const row: AcademyCourseRow = {
    id: m.moduleId,
    module: m.module,
    title: m.title,
    titleEn: m.titleEn ?? "",
    chapters,
    totals: {
      chapters: chapters.length,
      lessons: all.length,
      minutes: all.reduce((a, l) => a + l.minutes, 0),
      blocks: all.reduce((a, l) => a + l.blocks, 0),
    },
    levels: [...levelCount.entries()]
      .sort((a, b) => levelRank(a[0]) - levelRank(b[0]))
      .map(([he, n]) => ({ he, n })),
    href: `/neo/academy/${m.moduleId}/`,
    hay: "",
  };
  row.hay = [m.title, m.titleEn ?? "", m.module, m.moduleId, ...chapters.map((c) => c.title), ...all.map((l) => l.title)]
    .join(" ")
    .toLowerCase();
  return row;
}

let cached: AcademyData | null = null;

export function academyData(): AcademyData {
  if (cached) return cached;

  const courses = Object.values(ACADEMY).map(courseOf);
  const all = courses.flatMap((c) => c.chapters.flatMap((ch) => ch.lessons));

  const levelCount = new Map<string, number>();
  for (const l of all) if (l.level) levelCount.set(l.level, (levelCount.get(l.level) ?? 0) + 1);
  const levels: AcademyFacet[] = [...levelCount.entries()]
    .sort((a, b) => levelRank(a[0]) - levelRank(b[0]))
    .map(([he, n]) => ({ id: he, he, n }));

  cached = {
    courses,
    levels,
    totals: {
      courses: courses.length,
      chapters: courses.reduce((a, c) => a + c.totals.chapters, 0),
      lessons: all.length,
      minutes: all.reduce((a, l) => a + l.minutes, 0),
      blocks: all.reduce((a, l) => a + l.blocks, 0),
      levels: levels.length,
    },
  };
  return cached;
}

/** The param list for /neo/academy/[courseId] — the same list the directory
 *  renders from, so a card can never open a page that was not built. */
export const academyCourseIds = (): string[] => Object.keys(ACADEMY);

export function academyCourse(id: string): AcademyCourseRow | null {
  return academyData().courses.find((c) => c.id === id) ?? null;
}
