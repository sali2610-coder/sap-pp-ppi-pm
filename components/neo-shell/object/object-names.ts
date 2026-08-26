/* ============================================================================
   PROJECT NEO · THE OBJECT NAME REGISTRY — one list, three sources.
   ----------------------------------------------------------------------------
   WHY THIS FILE EXISTS

     `/neo/object/[name]` generated its params from `tableNames()` — the PM +
     PP-PI migration blueprint, 105 tables. The legacy route generated from the
     UNION of three registries, 186 objects. The 81-object gap the pre-production
     audit found was that one expression, not 81 missing pages: nothing had been
     deleted, and no page had to be written by hand. Six objects (LAGP LQUA LTAK
     LTAP VEKP VEPO) appeared on no NEO surface at all as a result.

     So the union is stated ONCE, here, and everything that needs it reads it:

       app/neo/object/[name]/generateStaticParams   — what gets built
       components/neo-shell/reference/ref-links     — what may be linked

     Those two can no longer drift, which is the actual bug class. Add a table to
     any of the three registries and its page and its inbound links both appear;
     there is no second list to remember.

   THE THREE SOURCES, AND WHY EACH IS A DIFFERENT KIND OF PAGE

     1. BLUEPRINT (105) — components/neo-shell/erd/model. Tables the two
        migration blueprints document. Full workspace: fields, modelled
        relations, JOINs, process chain, S/4 standing, incidents, books.

     2. HR / BW (65) — lib/hr-bw-adapter over data/hr-module + data/bw-module.
        Real SAP dictionary tables outside the PM/PP-PI blueprint, carried in the
        SAPTable shape: description, zone, PK, fields, relations, T-Codes, Fiori
        app and an S/4 note. They are NOT in the ER model and are deliberately
        not injected into it — the ER graph is the blueprint's graph, and adding
        65 nodes to it would change a validated picture.

     3. VERIFIED (16) — data/verified-objects. Cross-module staples (Handling
        Units, deliveries, WM, SD, FI) that a consultant will search for and that
        the blueprint has no reason to carry. They hold no field list at all, by
        design, and their page says so rather than inventing one.

   NOTHING IS MERGED. A name resolves to exactly one source, in the order above,
   and the page it gets is the page that source can honestly fill.
   ========================================================================== */

import { HR_BW_NAMES } from "@/lib/hr-bw-adapter";
import { verifiedNames } from "@/data/verified-objects";
import { tableNames } from "../erd/model";

export type ObjectSource = "blueprint" | "hrbw" | "verified";

const memo = <T>(fn: () => T): (() => T) => {
  let v: T | undefined;
  let done = false;
  return () => { if (!done) { v = fn(); done = true; } return v as T; };
};

/** Which registry owns a name. First match wins, so a table that is both in the
 *  blueprint and in a supplemental registry is rendered as the blueprint table
 *  it is — the deeper page, never the thinner one. */
const sourceMap = memo(() => {
  const m = new Map<string, ObjectSource>();
  for (const n of tableNames()) m.set(n, "blueprint");
  for (const n of HR_BW_NAMES) if (!m.has(n)) m.set(n, "hrbw");
  for (const n of verifiedNames()) if (!m.has(n)) m.set(n, "verified");
  return m;
});

/** Every object with a generated page, in a stable order: blueprint first,
 *  then the supplemental registries, each alphabetically. */
export const objectNames = (): string[] => [...sourceMap().keys()];

export const objectSource = (name: string): ObjectSource | null =>
  sourceMap().get((name || "").toUpperCase()) ?? null;

export const hasObjectPage = (name: string): boolean => sourceMap().has((name || "").toUpperCase());

/** Counts per registry, for the surfaces that state their own coverage rather
 *  than implying it. */
export const objectCounts = () => {
  const out = { blueprint: 0, hrbw: 0, verified: 0, total: 0 };
  for (const s of sourceMap().values()) { out[s] += 1; out.total += 1; }
  return out;
};
