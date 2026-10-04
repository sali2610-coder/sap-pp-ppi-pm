/* ============================================================================
   PROJECT NEO · /neo/guides — the deep end-to-end process guides.
   ----------------------------------------------------------------------------
   data/process-guides.ts, field by field: the business flow, every execution
   step with its T-Code, tables and common mistake, the mistakes, the
   troubleshooting flow, the debug path, exits/BAdIs, Fiori apps, the
   organisation's example and the ECC→S/4HANA block. The guide's own table
   and T-Code lists, which the legacy page did not draw, are drawn too.
   ========================================================================== */

import { PROCESS_GUIDES, guideBySlug, type ProcessGuide } from "@/data/process-guides";
import { ECC_S4_EMPTY, eccS4Rows } from "./common";
import { exitRef, plain, tableRef, txRef } from "./links";
import type { Head, RecordData, RowGroup } from "./kit";

const BACK = { href: "/neo/guides/", label: "מדריכי תהליך" };
const MODULES: ProcessGuide["module"][] = ["PM", "PP", "PP-PI"];

export function guideRecord(slug: string): RecordData | null {
  const g = guideBySlug(slug);
  if (!g) return null;
  return {
    title: `${g.he} · ${g.title}`,
    description: g.summary,
    head: {
      back: BACK,
      eyebrow: `מדריך תהליך · ${g.module}`,
      h1: g.he,
      en: g.title,
      lede: g.summary,
      tags: [g.module],
    },
    blocks: [
      { t: "numbered", title: "זרימה עסקית מקצה-לקצה", items: g.flow },
      {
        t: "steps", title: "ביצוע שלב-אחר-שלב ב-SAP", count: g.steps.length,
        items: g.steps.map((s) => ({
          text: s.action,
          ids: [...(s.tcode ? [txRef(s.tcode)] : []), ...(s.tables || []).map((t) => tableRef(t))],
          notes: s.mistake ? [{ k: "טעות נפוצה:", v: s.mistake }] : undefined,
        })),
      },
      { t: "bullets", title: "טעויות נפוצות", items: g.mistakes },
      { t: "bullets", title: "זרימת אבחון (Troubleshooting)", items: g.troubleshootFlow },
      { t: "bullets", title: "נתיב Debug", items: g.debugPath },
      { t: "ids", title: "User Exits / BAdIs", items: g.exits.map((e) => exitRef(e)) },
      { t: "ids", title: "אפליקציות Fiori", items: g.fiori.map((f) => plain(f)) },
      { t: "ids", title: "טרנזקציות בתהליך", items: g.tcodes.map((c) => txRef(c)) },
      { t: "ids", title: "טבלאות בתהליך", items: g.tables.map((t) => tableRef(t)) },
      { t: "text", title: "דוגמת ייצור — הארגון", text: g.scenario },
      { t: "kv", title: `ECC6 → S/4HANA · ${g.he}`, rows: eccS4Rows(g.eccS4), empty: ECC_S4_EMPTY },
    ],
  };
}

export const guideParams = (): string[] => PROCESS_GUIDES.map((g) => g.slug);

export function guidesIndex(): { head: Head; groups: RowGroup[] } {
  return {
    head: {
      back: { href: "/neo/knowledge/", label: "מרכז הידע" },
      eyebrow: "Deep Process Guides",
      h1: "מדריכי תהליך מעמיקים",
      lede: `${PROCESS_GUIDES.length} תהליכי PM/PP/PP-PI מקצה-לקצה — זרימה עסקית, ביצוע שלב-אחר-שלב ב-SAP, טעויות נפוצות, זרימת אבחון, נתיב Debug, Exits/BAdIs, ECC↔S/4, Fiori ודוגמת הארגון.`,
    },
    groups: MODULES.map((m) => ({
      title: m,
      rows: PROCESS_GUIDES.filter((g) => g.module === m).map((g) => ({
        href: `/neo/guides/${g.slug}/`,
        he: g.he,
        en: g.title,
        sub: g.summary,
        tags: [g.module],
        meta: `${g.steps.length} שלבים`,
      })),
    })).filter((g) => g.rows.length),
  };
}
