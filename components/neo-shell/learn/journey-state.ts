/* ============================================================================
   PROJECT NEO · THE ACADEMY JOURNEY (2026-10) — one derivation, three screens.
   ----------------------------------------------------------------------------
   The academy reads as one walk: a PATH is a course, a STAGE is a chapter, a
   STEP is a lesson. The hub, the course and the lesson all draw the same
   stages from this function, so "you are in stage 3" can never mean two
   different things on two screens.

   Pure, React-free and store-free: the caller hands in the stages (from
   academy-data) and the store's own predicate (useIsDone). The rules are the
   product's, not new ones:
     a step is done   when the store says its lesson is complete;
     a stage is done  when every authored lesson in it is done (the store's
                      isChapterComplete rule);
     the current stage holds the first lesson not yet done, in path order
                      (lib/academy/model.firstIncomplete).
   A stage with no authored lesson cannot be completed and says so.
   ========================================================================== */

export type StageState = "done" | "current" | "partial" | "next" | "todo" | "empty";

export interface JourneyLessonIn { slug: string; hasLesson: boolean }
export interface JourneyStageIn { index: number; title: string; lessons: JourneyLessonIn[] }

export interface JourneyStage {
  index: number;
  title: string;
  /** authored lessons, the ones that can be completed */
  total: number;
  done: number;
  state: StageState;
}

export interface Journey {
  stages: JourneyStage[];
  /** the stage holding the first lesson not yet done; 0 when the path is complete */
  current: number;
  complete: boolean;
  doneLessons: number;
  totalLessons: number;
}

export function journeyOf(stages: JourneyStageIn[], isDone: (slug: string) => boolean): Journey {
  const counted = stages.map((s) => {
    const authored = s.lessons.filter((l) => l.hasLesson);
    return { s, total: authored.length, done: authored.filter((l) => isDone(l.slug)).length };
  });
  const cur = counted.find((c) => c.total > 0 && c.done < c.total);
  const current = cur ? cur.s.index : 0;
  // the first unfinished stage after the current one is "next"; the rest wait
  const next = cur ? counted.find((c) => c.s.index > current && c.total > 0 && c.done < c.total) : undefined;
  const out: JourneyStage[] = counted.map(({ s, total, done }) => {
    const state: StageState =
      total === 0 ? "empty"
        : done === total ? "done"
          : s.index === current ? "current"
            : done > 0 ? "partial"
              : next && s.index === next.s.index ? "next"
                : "todo";
    return { index: s.index, title: s.title, total, done, state };
  });
  const totalLessons = out.reduce((a, s) => a + s.total, 0);
  const doneLessons = out.reduce((a, s) => a + s.done, 0);
  return { stages: out, current, complete: totalLessons > 0 && doneLessons === totalLessons, doneLessons, totalLessons };
}
