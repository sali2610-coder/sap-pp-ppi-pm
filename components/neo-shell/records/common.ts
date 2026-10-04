/* ============================================================================
   PROJECT NEO · RECORDS — the pieces several adapters share.
   ----------------------------------------------------------------------------
   The legacy trust label (lib/trust) and the eight-row ECC→S/4HANA block that
   exits, guides and the object centre all carried (components/ecc-s4-block).
   The row labels are the legacy block's own words; only the drawing changes.
   ========================================================================== */

import type { EccS4 } from "@/components/ecc-s4-block";
import { SOURCE_HE, TRUST_META, type Trust } from "@/lib/trust";
import type { Kv, Status } from "./kit";

/** The trust level stays a status (mark + word); its colour comes from the
 *  status tokens, the words from lib/trust. */
const TRUST_DOT: Record<Trust["level"], string> = {
  GREEN: "var(--status-done)",
  YELLOW: "var(--status-in-analysis)",
  RED: "var(--status-not-started)",
};

export const trustStatus = (t: Trust): Status[] => [
  { label: `${t.level} · ${TRUST_META[t.level].he}`, dot: TRUST_DOT[t.level] },
  { label: `מקור: ${SOURCE_HE[t.source]}`, dot: "var(--ink-3)" },
];

const ECC_S4_ROWS: { key: keyof EccS4; he: string }[] = [
  { key: "unchanged", he: "ללא שינוי (נשאר זהה)" },
  { key: "changed", he: "משתנה ב-S/4" },
  { key: "replaced", he: "מוחלף" },
  { key: "deprecated", he: "הוסר / לא אסטרטגי" },
  { key: "fiori", he: "אפליקציית Fiori חדשה" },
  { key: "cds", he: "CDS View חדש" },
  { key: "simplification", he: "Simplification Item" },
  { key: "migration", he: "השפעת מיגרציה + QA" },
];

/** Every ECC→S/4HANA dimension the record fills, in the legacy order. */
export const eccS4Rows = (d?: EccS4): Kv[] =>
  ECC_S4_ROWS.filter((r) => (d?.[r.key] || "").trim()).map((r) => ({ k: r.he, v: d![r.key] }));

/** What the legacy block said when a record filled none of the eight. */
export const ECC_S4_EMPTY = "דורש אימות מול מערכת SAP / מקור נוסף.";
