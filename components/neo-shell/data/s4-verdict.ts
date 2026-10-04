// Project NEO · the S/4HANA verdict per table, as one of the workspace's four
// classes. SERVER ONLY (it reads the whole tables catalogue at build time).
//
// The verdict is the evidence layer's status, resolved exactly as the tables
// catalogue, the table page and the ERD resolve it: the authored record when
// one exists (official SAP sources), otherwise the blueprint's own column. It
// is bucketed through the dictionary's own reading groups. Spec P1 §10; the
// decision and the nine PM tables it settled: docs/rollout-2026-10/S4-VERDICT.md.
// Every surface that shows a table's S/4HANA state reads it here: the module
// page (table, filters, counts, the S/4 chapter), its section pages, the home,
// the studio, the object profile and the OIC records.

import { S4_STATUS_GROUP, S4_STATUS_WORD, type S4Status, type S4StatusGroup } from "@/lib/evidence/types";
import { S4_HE, S4_UNDECIDED_HE, s4ClassOf, type S4Class } from "@/lib/s4-class";
import type { SAPTable } from "@/lib/types";
import { tablesData } from "./tables-data";

const CLASS_OF_GROUP: Record<S4StatusGroup, S4Class | null> = {
  new: 0, keeps: 0, changes: 1, moves: 2, gone: 3, past: 3, open: null,
};

/** The statuses the class word states exactly. Any other status in a class
 *  ("חדש ב-S/4HANA", "ECC בלבד", "לא אסטרטגי", "מוגבל", "לא רלוונטי") keeps
 *  its own word on the row: bucketing it for the filters never renames it
 *  (lib/evidence/types.ts: "ECC בלבד" is not "הוסר"). */
const CLASS_SAYS: ReadonlySet<S4Status> = new Set<S4Status>([
  "unchanged", "released_api_available", "fiori_alternative_available", "changed", "simplified", "replaced", "not_available",
]);

/** cls buckets it; exact says the class word states the status itself; word
 *  is the short status word; label is the full pill text the table and object
 *  pages show (S4_STATUS_HE). */
export interface Verdict { cls: S4Class | null; exact: boolean; key: S4Status; word: string; label: string }

let VERDICT: Map<string, Verdict> | null = null;

/** The verdict for a table, undefined when the catalogue does not know it. */
export function verdictOf(name: string): Verdict | undefined {
  VERDICT ??= new Map(tablesData().rows.map((r) => {
    const key = r.status.key as S4Status;
    const word = S4_STATUS_WORD[key] ?? S4_UNDECIDED_HE;
    const cls = CLASS_OF_GROUP[S4_STATUS_GROUP[key]] ?? null;
    return [r.name, { cls, exact: cls !== null && CLASS_SAYS.has(key), key, word, label: r.status.label || word }];
  }));
  return VERDICT.get(name);
}

/** The verdict class for a table, null when it is open, undefined when the
 *  catalogue does not know the table (the caller falls back to the blueprint). */
export const verdictClass = (name: string): S4Class | null | undefined => verdictOf(name)?.cls;

/** A dictionary table's class: the verdict, or the blueprint's own for a table
 *  the catalogue does not know. */
export const s4Of = (t: SAPTable): S4Class | null => {
  const v = verdictOf(t.tableName);
  return v ? v.cls : s4ClassOf(t);
};

/** The blueprint's class, only where it says something other than the verdict. */
export const s4BpOf = (t: SAPTable): S4Class | null | undefined => {
  const bp = s4ClassOf(t);
  return bp === s4Of(t) ? undefined : bp;
};

/** The word a row prints for its verdict: the class word where it states the
 *  status exactly, else the status's own word; for a table the catalogue does
 *  not know, the blueprint's class word ("לא הוכרע במקור" when it is silent). */
export function s4WordOf(t: SAPTable): string {
  const v = verdictOf(t.tableName);
  if (!v) {
    const c = s4ClassOf(t);
    return c === null ? S4_UNDECIDED_HE : S4_HE[c];
  }
  return v.exact && v.cls !== null ? S4_HE[v.cls] : v.word;
}
