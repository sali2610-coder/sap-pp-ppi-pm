/* ============================================================================
   PROJECT NEO · SMART RETURN — the public seam.
   ----------------------------------------------------------------------------
   Adopting contextual return on a surface is three lines and touches nothing
   else. The transactions surfaces do it today; every other NEO surface can do
   it without this module changing.

   1. SENDING — the surface that navigates away records where it is leaving
      from, with whatever state makes the view reproducible:

        import { OriginLink } from "@/components/neo-shell/nav-context";

        <OriginLink
          href={`/neo/transactions/${code}/`}
          origin={{
            href: "/neo/pm/",
            label: "PM",
            detail: "פקודות אחזקה",
            surface: "neo:pm",
            state: { tab: "orders", scroll: y },
          }}
        >…</OriginLink>

      Anything not driven by a link — a canvas node, a graph hit-test — calls
      `rememberOrigin({ to, href, label, detail, surface, state })` directly.

   2. RETURNING — the destination renders the control and names its own parent
      for the case where the session has no memory:

        <SmartReturn fallback={{ href: "/neo/transactions/", label: "טרנזקציות" }} />

   3. RESTORING — the origin surface asks for its state back on mount:

        const back = useReturnState<{ tab: string; scroll: number }>("neo:pm");

      `back` is null on a normal visit and non-null exactly once, on the render
      after a return. Same filter, same zoom, same viewport — as far as the
      surface chose to remember them.

   Storage is one sessionStorage key for the whole namespace, so nothing here
   needs a server, a route handler or a query parameter, and `output: 'export'`
   stays intact.
   ========================================================================== */

export type { NeoOrigin, OriginInput, OriginState, ReturnPacket } from "./types";
export {
  armReturn,
  clearOrigins,
  consumeReturn,
  forgetOrigin,
  normalisePath,
  readOrigin,
  rememberOrigin,
  returnLabel,
  takeReturnState,
  useOrigin,
  useReturnPacket,
  useReturnState,
} from "./origin";
export { parentOf, type ParentRef } from "./fallbacks";
export { OriginLink, SmartReturn, type OriginLinkProps, type SmartReturnProps } from "./smart-return";
