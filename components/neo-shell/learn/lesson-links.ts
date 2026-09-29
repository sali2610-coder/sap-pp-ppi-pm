/* ============================================================================
   PROJECT NEO · the address of a lesson inside NEO.
   ----------------------------------------------------------------------------
   Its own file, and a very small one, for one reason: ./lesson-data.ts imports
   ALL_LESSONS — 7.6 MB of authored lesson bodies — and is therefore a SERVER
   module. The client surfaces (the course screen, the academy directory) need
   the URL and nothing else, so the URL lives here where they can have it
   without dragging the corpus into the browser bundle. It is the same reason
   lib/academy/model.ts reads a generated block-count map instead of the bodies.

   The route: /neo/academy/<courseId>/<slug>/ (app/neo/academy/[courseId]/[slug]/).
   Project NEO is the only site: the pre-NEO /academy/lesson/<slug>/ address
   redirects here (vercel.json, scripts/gen-legacy-redirects.mjs), and nothing
   in NEO links to it.
   ========================================================================== */

/** Where a lesson is read inside Project NEO. */
export const neoLessonHref = (courseId: string, slug: string): string =>
  `/neo/academy/${courseId}/${slug}/`;

/** The NEO course each digital-library textbook (data/library/academy-index.ts)
 *  became: its lessons are a content-preserving migration of the textbook
 *  (data/academy/lessons/<id>-generated.ts). test/academy-course-links.test.ts
 *  holds this map to both registries. */
export const TEXTBOOK_COURSE: Record<string, string> = {
  pp: "pp-pi", pm: "pm", qm: "qm", mm: "mm", wm: "wm", ppds: "pp-ds", sop: "sop", pmu: "pm-user",
};

/** Where a textbook is studied inside Project NEO. */
export const textbookCourseHref = (textbookId: string): string =>
  TEXTBOOK_COURSE[textbookId] ? `/neo/academy/${TEXTBOOK_COURSE[textbookId]}/` : "/neo/academy/";
