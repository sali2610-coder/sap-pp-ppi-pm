/* ============================================================================
   PROJECT NEO · /neo/academy/<courseId>/<slug>/ — BUILD-TIME data.
   ----------------------------------------------------------------------------
   Runs on the SERVER. It authors nothing and derives nothing twice.

   THE TWO DOORS, BOTH ALREADY OPEN
     data/academy/lessons      ALL_LESSONS — the authored lesson bodies. The same
                               registry app/academy/lesson/[slug]/page.tsx reads.
                               Blocks are handed on EXACTLY as the data holds
                               them; `orderedBlocks()` in lib/academy/lesson-types
                               is still the one thing that decides their order,
                               and it runs in the view.
     lib/academy/model.ts      the canonical module → chapter → lesson model,
                               with the path-derived position, prev, next and
                               chapter titles. Not re-derived here.

   WHY THIS FILE EXISTS AT ALL
     The lesson block engine is not a book: it is a typed union of 23 block kinds
     with its own completion rule (blocks viewed / blocks required) and its own
     store. It cannot be poured into NEO's book reader, whose unit is a chapter
     of prose fetched from a shard. So the engine keeps its own route — and this
     is that route's data, so the SAME lesson can be read inside the NEO shell,
     with NEO's return, NEO's controls and NEO's typography.

     Nothing is copied. The lesson body is read from the one registry, the
     structure from the one model, and the progress from the one store
     (lib/academy/store.ts, `neo:academy:v2`) — which is why a lesson read here
     shows up as read on /academy/ and vice versa.
   ========================================================================== */

import { ALL_LESSONS } from "@/data/academy/lessons";
import type { Lesson } from "@/lib/academy/lesson-types";
import { ACADEMY, getLesson } from "@/lib/academy/model";
import { neoLessonHref } from "./lesson-links";
import { withNeoLinks } from "./lesson-neo-links";

/** A neighbouring lesson, already resolved to a real generated NEO route. */
export interface NeoLessonLink {
  slug: string;
  title: string;
  href: string;
  /** The neighbour belongs to a different chapter — worth saying out loud. */
  newChapter: boolean;
  chapterTitle: string;
}

export interface NeoLessonData {
  course: { id: string; module: string; title: string; titleEn: string; href: string };
  /** Position, straight from the canonical model. Never the authored index. */
  place: {
    chapterIndex: number;
    chapterTitle: string;
    chapterCount: number;
    posInChapter: number;
    chapterSize: number;
    globalIndex: number;
    globalTotal: number;
  };
  lesson: Lesson;
  prev: NeoLessonLink | null;
  next: NeoLessonLink | null;
}

/**
 * Every (course, lesson) pair the export should generate.
 *
 * Gated on `hasLesson` AND on the body actually being in ALL_LESSONS, so the
 * course screen — which gates its own links on the same flag — can never link at
 * a page that was not built. A lesson the paths declare but nobody has written
 * stays an inert row on the course screen, exactly as it is today.
 */
export function neoLessonParams(): { courseId: string; slug: string }[] {
  const out: { courseId: string; slug: string }[] = [];
  for (const m of Object.values(ACADEMY)) {
    for (const l of m.lessons) {
      if (!l.hasLesson || !ALL_LESSONS[l.slug]) continue;
      out.push({ courseId: m.moduleId, slug: l.slug });
    }
  }
  return out;
}

function linkOf(slug: string | undefined, courseId: string, fromChapter: number): NeoLessonLink | null {
  if (!slug) return null;
  const m = getLesson(slug);
  if (!m || !m.hasLesson || !ALL_LESSONS[slug] || m.moduleId !== courseId) return null;
  return {
    slug,
    title: m.title,
    href: neoLessonHref(courseId, slug),
    newChapter: m.chapterIndex !== fromChapter,
    chapterTitle: m.chapterTitle,
  };
}

/**
 * The payload for /neo/academy/<courseId>/<slug>/.
 *
 * @returns null when the pair is not a real lesson of that course — the route
 *          then 404s rather than rendering an empty reading surface.
 */
export function neoLessonData(courseId: string, slug: string): NeoLessonData | null {
  const course = ACADEMY[courseId];
  const place = getLesson(slug);
  const lesson = ALL_LESSONS[slug];
  if (!course || !place || !lesson || place.moduleId !== courseId) return null;

  return {
    course: {
      id: course.moduleId,
      module: course.module,
      title: course.title,
      titleEn: course.titleEn ?? "",
      href: `/neo/academy/${course.moduleId}/`,
    },
    place: {
      chapterIndex: place.chapterIndex,
      chapterTitle: place.chapterTitle,
      chapterCount: course.chapters.length,
      posInChapter: place.posInChapter,
      chapterSize: place.chapterSize,
      globalIndex: place.globalIndex,
      globalTotal: place.globalTotal,
    },
    // The lesson BODY is handed on exactly as authored — except for its
    // cross-reference hrefs, which are written against the legacy routes and
    // are repointed into /neo/ here, gated. See lesson-neo-links.ts for why the
    // translation lives in NEO's data layer and not in the content files.
    lesson: withNeoLinks(lesson),
    prev: linkOf(place.prev, courseId, place.chapterIndex),
    next: linkOf(place.next, courseId, place.chapterIndex),
  };
}
