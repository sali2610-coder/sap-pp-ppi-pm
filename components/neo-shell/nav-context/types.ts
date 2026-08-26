/* ============================================================================
   PROJECT NEO · SMART RETURN — the contract.
   ----------------------------------------------------------------------------
   Deliberately free of any React and any `@/data/*` import, so it can be read
   from a server component, a client component or a plain module without pulling
   anything behind it. Everything here is JSON-serialisable, because the whole
   record is written to sessionStorage.

   WHY AN "ORIGIN" AND NOT A BACK BUTTON
     `router.back()` answers "what did the browser do", which is not the same
     question as "where was I". A user who arrived at IW31 from the PM workspace
     and then opened three sibling transactions wants to go back to PM, not to
     the previous sibling. So the surface that sends the user somewhere records
     WHERE it sent them (`to`), WHERE the return should land (`href`), WHAT to
     call that place in Hebrew (`label` / `detail`), and — optionally — enough
     state to rebuild the exact view they left (`surface` + `state`).
   ========================================================================== */

/** A JSON-safe state blob. A surface decides its own shape; the module only
 *  guarantees it survives a round-trip through sessionStorage. */
export type OriginStateValue = string | number | boolean | null | string[];
export type OriginState = Record<string, OriginStateValue>;

export interface NeoOrigin {
  /** The path this origin was recorded FOR — i.e. the page the user is about to
   *  land on. A trailing `*` makes it a prefix match, which is what a surface
   *  uses when it links into a whole family of pages at once. */
  to: string;
  /** Where "return" goes. Always a real, generated route. */
  href: string;
  /** Hebrew name of the place we came from. Never empty — the module refuses to
   *  render a return control with no words in it. */
  label: string;
  /** A more specific second half: the section, the filter, the query. Optional,
   *  because not every origin has one worth naming. */
  detail?: string;
  /** Logical id of the origin surface, e.g. "neo:transactions". Only needed when
   *  that surface wants its `state` handed back to it on return. */
  surface?: string;
  /** Everything the origin surface needs to rebuild the exact view. */
  state?: OriginState;
  /** When it was recorded. Used to pick the newest matching origin. */
  at: number;
}

/** What a caller supplies. `to` and `at` are filled in by rememberOrigin(). */
export type OriginInput = Omit<NeoOrigin, "at">;

/** The one-shot packet a returning navigation leaves for its destination. */
export interface ReturnPacket {
  surface: string;
  state: OriginState;
  at: number;
}
