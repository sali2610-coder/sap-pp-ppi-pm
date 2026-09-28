// Project NEO · /neo/tables · the "מאפיין" filter chips, as data.
//
// Kept out of the client surface so the build-time totals (tables-data.ts) and
// a unit test read the SAME predicate the chip applies on screen.

import { S4_STATUS_WORD } from "@/lib/evidence/types";
import type { NeoTableRow } from "./types";

export type Cap = "s4" | "cds" | "fiori" | "hub" | "shared";

export const CAPS: { id: Cap; he: string }[] = [
  { id: "s4", he: S4_STATUS_WORD.replaced },
  { id: "cds", he: "עם תצוגת CDS" },
  { id: "fiori", he: "עם יישום Fiori" },
  { id: "hub", he: "צומת קשרים (6 ומעלה)" },
  { id: "shared", he: "משותפת לשני המודולים" },
];

/** Does this row pass this chip? The S/4 chip reads the canonical status the
 *  row's own pill shows. It used to read "an alternative table is named",
 *  which the PM blueprint fills on every table ("IFLOT (זהה)"): 56 rows, 43 of
 *  them marked ללא שינוי by the blueprint's verdict column. */
export function capMatch(r: NeoTableRow, c: Cap): boolean {
  if (c === "s4") return r.status.key === "replaced";
  if (c === "cds") return r.cds.length > 0;
  if (c === "fiori") return !!r.fiori;
  if (c === "hub") return r.rels.length >= 6;
  return r.mods.length >= 2;
}
