/* ============================================================================
   PROJECT NEO · /neo/oic — the Object Intelligence Center.
   ----------------------------------------------------------------------------
   One business object per page (lib/cross-links OIC_OBJECTS) and everything
   lib/cross-links objectGraph() gathers around its primary table: related
   tables, T-Codes, BAPIs, FMs, BAdIs/exits, CDS, incidents, SAP Note topics,
   debug entries and manufacturing scenarios, the organisation's example and
   the ECC→S/4HANA block. The graph's legacy hrefs are repointed through
   ./links neoOf(); a value with no NEO page is shown, not linked. The words a
   legacy chip kept in its tooltip (a table's description, a code's title) are
   shown. The legacy radial dependency drawing is kept, folded, with the same
   nodes (the first few of each list) and the same 16-character labels.
   ========================================================================== */

import { OIC_OBJECTS, objectGraph, oicBySlug, type LinkRef, type ObjectGraph, type OICObject } from "@/lib/cross-links";
import { trustDomain, trustTable } from "@/lib/trust";
import { ECC_S4_EMPTY, eccS4Rows, trustStatus } from "./common";
import { verdictOf } from "../data/s4-verdict";
import { neoOf, tableRef } from "./links";
import type { Block, Head, RecordData, Ref, RowGroup } from "./kit";

const BACK = { href: "/neo/oic/", label: "Object Intelligence" };
const EMPTY = "אין פריטים מקושרים.";
const MODULES = ["PM", "PP-PI", "QM"];

const toRefs = (refs: LinkRef[]): Ref[] => refs.map((r) => ({ label: r.label, href: neoOf(r.href), sub: r.sub || undefined }));

/** The legacy drawing's nodes (components/dep-graph.tsx): how many of each
 *  list it placed around the object, and the kind word under each. */
const nodesOf = (g: ObjectGraph) => ([
  [g.relatedTables, 4, "טבלה"], [g.tcodes, 4, "T-Code"], [g.bapis, 2, "BAPI"], [g.fms, 2, "FM"],
  [g.badis, 2, "BAdI"], [g.incidents, 3, "תקלה"], [g.notes, 1, "Note"], [g.cds, 1, "CDS"],
] as [LinkRef[], number, string][]).flatMap(([refs, k, kind]) => refs.slice(0, k).map((r) => ({ label: r.label, kind })));

export function oicRecord(slug: string): RecordData | null {
  const o: OICObject | undefined = oicBySlug(slug);
  const g = o ? objectGraph(o.table, { he: o.he, module: o.module }) : null;
  if (!o || !g) return null;
  const facet = (title: string, refs: LinkRef[], t: "ids" | "refs"): Block =>
    ({ t, title, count: refs.length, items: toRefs(refs), empty: EMPTY });
  return {
    title: `${o.he} · ${o.title}`,
    foot: "מקור: תיעוד הפרויקט; הקשרים נגזרים מהמאגר.",
    description: o.description,
    head: {
      back: BACK,
      eyebrow: "Object Intelligence Center",
      h1: o.he,
      en: o.title,
      lede: o.description,
      tags: [o.module, g.name],
      status: trustStatus(g.exists ? trustTable() : trustDomain()),
      facts: [{ k: "טבלה ראשית", ids: [tableRef(g.name, g.he)] }],
    },
    blocks: [
      { t: "graph", title: "גרף תלויות חזותי", fold: true, center: { label: g.name, sub: g.module }, nodes: nodesOf(g) },
      facet("טבלאות קשורות", g.relatedTables, "ids"),
      facet("טרנזקציות", g.tcodes, "ids"),
      facet("BAPIs", g.bapis, "ids"),
      facet("Function Modules", g.fms, "ids"),
      facet("BAdIs / User Exits", g.badis, "ids"),
      facet("CDS Views", g.cds, "ids"),
      facet("תקלות קשורות", g.incidents, "refs"),
      facet("SAP Notes", g.notes, "refs"),
      facet("נקודות Debug", g.debug, "refs"),
      facet("תרחישי ייצור", g.scenario, "refs"),
      { t: "text", title: "דוגמת הארגון", text: o.scenario },
      eccS4Of(o, g),
    ],
  };
}

/** The ECC6 → S/4HANA block. It opens with the verdict the table page shows
 *  (data/s4-verdict.ts); the legacy template line "מבנה X נשמר ב-S/4HANA" is
 *  kept only where that verdict keeps the table: printed on all 17 records, it
 *  stood above MARA's own "MATNR מורחב 18->40" (review, 2026-10-03). */
function eccS4Of(o: OICObject, g: ObjectGraph): Block {
  const v = verdictOf(g.name);
  const rows = eccS4Rows({
    unchanged: v?.exact && v.cls === 0 ? `מבנה ${g.name} נשמר ב-S/4HANA.` : "",
    changed: g.s4Note,
    migration: `QA: ודא ${g.name} + קשרים + CDS לאחר המרה.`,
  });
  return { t: "kv", title: `ECC6 → S/4HANA · ${o.he}`, rows: [{ k: "הכרעת S/4HANA", v: v ? v.label : ECC_S4_EMPTY }, ...rows] };
}

export const oicParams = (): string[] => OIC_OBJECTS.map((o) => o.slug);

export function oicIndex(): { head: Head; groups: RowGroup[] } {
  return {
    head: {
      back: { href: "/neo/knowledge/", label: "מרכז הידע" },
      eyebrow: "Object Intelligence Center",
      h1: "מרכז תבונת אובייקטים",
      lede: `${OIC_OBJECTS.length} אובייקטי ליבה — תצוגה מאוחדת המקשרת כל אובייקט לטבלאות, T-Codes, BAPIs/FMs, BAdIs/Exits, CDS, תקלות, SAP Notes, נקודות Debug ותרחישי ייצור.`,
    },
    groups: MODULES.map((m) => ({
      title: m,
      rows: OIC_OBJECTS.filter((o) => o.module === m).map((o) => ({
        href: `/neo/oic/${o.slug}/`,
        he: o.he,
        en: o.title,
        sub: o.description,
        tags: [o.module, o.table],
      })),
    })).filter((g) => g.rows.length),
  };
}
