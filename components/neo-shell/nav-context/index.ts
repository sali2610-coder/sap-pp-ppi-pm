/* ============================================================================
   PROJECT NEO · SMART RETURN — the public seam.
   ----------------------------------------------------------------------------
   Contextual return is a SITE-WIDE behaviour, not a transactions feature. This
   module is the whole of it: no provider, no context, no route handler, no
   query parameter, no new dependency. Adopting it on a surface is two lines and
   changes nothing else about that surface.

   THE TWO LINES

   1. A DESTINATION renders the control and, optionally, names its own parent
      for the case where the session has no memory:

        <SmartReturn fallback={{ href: "/neo/tables/", label: "טבלאות" }} />

      `fallback` can be omitted — parentOf() then resolves the route's own
      parent out of fallbacks.ts, which covers the whole /neo namespace.

   2. A SENDER swaps <Link> for <OriginLink> and says where it is leaving from,
      in Hebrew, with whatever state makes the view reproducible:

        <OriginLink
          href={`/neo/tables/${name}/`}
          origin={() => ({
            href: "/neo/pm/",
            label: "PM",
            detail: "פקודות עבודה",
            surface: "neo:pm",
            state: { tab, q, y: scrollOffset() },
          })}
        >…</OriginLink>

      `origin` takes the record itself OR a function that builds it. Use the
      FUNCTION whenever any part of it is live — a query, a filter, a zoom, a
      scroll offset — because "where I was" is only true at the moment of
      leaving, and an object literal is built during render.

   THE OPTIONAL THIRD LINE — only for a surface that wants its view rebuilt and
   not merely re-entered. On the render after a return, ask for the state back:

        const back = useReturnState<MyState>("neo:pm");

   `back` is null on a normal visit and non-null exactly once, on the render
   after a return. Anything not driven by a link — a canvas node, a graph
   hit-test, a keyboard shortcut — calls `rememberOrigin({ to, href, label,
   detail, surface, state })` directly instead of rendering an <OriginLink/>.

   WHAT A SURFACE SHOULD PUT IN `state`
     the selected object or table, graph focus and zoom, every applied filter,
     the search query, the selected module or topic, and the viewport. The
     originating route is already `href`. For the viewport use `scrollOffset()`
     when leaving and `restoreScroll(y, selector)` when coming back: the NEO
     shell scrolls its canvas and not the window, so `window.scrollY` is always
     0 and restoring it restores nothing.

   WHAT IT MUST NOT PUT THERE
     anything that is not JSON — a DOM node, a Map, a function, a Date. The
     record is written to sessionStorage, and `OriginState` is typed to exactly
     what survives that trip.

   HEBREW. `returnLabel()` joins "חזרה ל" to a Hebrew word with no hyphen and to
   a Latin or numeric token with one, so the same code produces both
   "חזרה למודל הנתונים" and "חזרה ל-PM · פקודות עבודה". Write `label` WITHOUT a
   leading definite article: the ל absorbs the ה.

   STORAGE is one sessionStorage key for the whole namespace, so nothing here
   needs a server, a route handler or a query parameter, and `output: 'export'`
   stays intact.
   ========================================================================== */

export type { NeoOrigin, OriginInput, OriginState, ReturnPacket } from "./types";
export {
  armReturn,
  clearOrigins,
  consumeReturn,
  forgetOrigin,
  neoScroller,
  normalisePath,
  readOrigin,
  rememberOrigin,
  restoreScroll,
  returnLabel,
  scrollOffset,
  takeReturnState,
  useOrigin,
  useReturnPacket,
  useReturnState,
} from "./origin";
export { parentOf, type ParentRef } from "./fallbacks";
export {
  OriginLink, SmartReturn,
  type OriginArg, type OriginLinkProps, type SmartReturnProps,
} from "./smart-return";
