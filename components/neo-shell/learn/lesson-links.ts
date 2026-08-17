/* ============================================================================
   PROJECT NEO · the address of a lesson inside NEO.
   ----------------------------------------------------------------------------
   Its own file, and a very small one, for one reason: ./lesson-data.ts imports
   ALL_LESSONS — 7.6 MB of authored lesson bodies — and is therefore a SERVER
   module. The client surfaces (the course screen, the academy directory) need
   the URL and nothing else, so the URL lives here where they can have it
   without dragging the corpus into the browser bundle. It is the same reason
   lib/academy/model.ts reads a generated block-count map instead of the bodies.

   Both routes below are real, generated routes:
     /neo/academy/<courseId>/<slug>/   app/neo/academy/[courseId]/[slug]/
     /academy/lesson/<slug>/           app/academy/lesson/[slug]/ — unchanged
   ========================================================================== */

/** Where a lesson is read inside Project NEO. */
export const neoLessonHref = (courseId: string, slug: string): string =>
  `/neo/academy/${courseId}/${slug}/`;

/** The pre-NEO academy route for the same lesson. Still generated, still linked
 *  from /academy/, and named as itself wherever NEO points at it. */
export const academyLessonHref = (slug: string): string => `/academy/lesson/${slug}/`;
