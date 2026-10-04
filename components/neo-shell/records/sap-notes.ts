/* ============================================================================
   PROJECT NEO · /neo/sap-notes — resolution topics keyed by SAP component.
   ----------------------------------------------------------------------------
   data/sap-notes.ts, field by field: component, English topic, symptom, cause,
   OSS search keywords, ECC/S/4 relevance, resolution, the related incidents
   (data/troubleshooting) and the business objects those incidents touch
   (lib/cross-links OIC_OBJECTS). The source holds no note numbers and none are
   shown; `noteRef` is drawn only if a record ever carries one.
   ========================================================================== */

import { SAP_NOTES, noteBySlug, type SapNote } from "@/data/sap-notes";
import { INCIDENTS, incidentBySlug } from "@/data/troubleshooting";
import { OIC_OBJECTS } from "@/lib/cross-links";
import { trustNote } from "@/lib/trust";
import { trustStatus } from "./common";
import { incidentHref, oicHref, plain } from "./links";
import type { Block, Head, RecordData, Ref, RowGroup } from "./kit";

const BACK = { href: "/neo/sap-notes/", label: "SAP Notes" };
const MODULES: SapNote["module"][] = ["PM", "PP", "PP-PI", "QM", "Cross"];
const MOD_HE: Record<SapNote["module"], string> = { PM: "אחזקה (PM)", PP: "ייצור (PP)", "PP-PI": "ייצור תהליכי (PP-PI)", QM: "איכות (QM)", Cross: "חוצה-מודול" };

/** Each slug the record names: the incident when the catalogue has it, the
 *  bare slug when it does not (the legacy index showed it that way). */
const incidentRefs = (n: SapNote): Ref[] =>
  (n.relatedIncidents || []).map((slug) => {
    const i = incidentBySlug(slug);
    return i ? { label: i.he, id: slug, href: incidentHref(slug) } : { label: slug };
  });

export function noteRecord(slug: string): RecordData | null {
  const n = noteBySlug(slug);
  if (!n) return null;
  const incs = INCIDENTS.filter((i) => (n.relatedIncidents || []).includes(i.slug));
  const objs = OIC_OBJECTS.filter((o) => incs.some((i) => i.tables.includes(o.table)));
  return {
    title: `${n.he} · ${n.component}`,
    description: n.symptom,
    head: {
      back: BACK,
      eyebrow: `SAP Note · ${n.component}`,
      h1: n.he,
      en: n.title,
      tags: [n.module, n.component],
      status: trustStatus(trustNote(!!n.noteRef)),
      facts: n.noteRef ? [{ k: "SAP Note", ids: [plain(n.noteRef)] }] : undefined,
    },
    blocks: [
      { t: "text", title: "מתי חל (Symptom)", text: n.symptom },
      { t: "text", title: "גורם שורש (Cause)", text: n.cause },
      { t: "bullets", title: "רזולוציה", items: n.resolution },
      { t: "text", title: "רלוונטיות ECC / S/4", text: n.relevance },
      { t: "ids", title: "מילות חיפוש OSS (לא מספרים)", items: n.keywords.map((k) => plain(k)) },
      {
        t: "groups", title: "קישורים צולבים", groups: [
          { label: "תקלות", items: incidentRefs(n), empty: "הרשומה אינה מקשרת תקלות." },
          { label: "אובייקטים", items: objs.map((o) => ({ label: o.he, id: o.table, href: oicHref(o.slug) })), empty: "אין אובייקט ליבה שהתקלות המקושרות נוגעות בטבלה שלו." },
        ],
      },
    ],
  };
}

export const noteParams = (): string[] => SAP_NOTES.map((n) => n.slug);

export function notesIndex(): { head: Head; intro: Block[]; groups: RowGroup[]; blocks: Block[] } {
  return {
    head: {
      back: { href: "/neo/incidents/", label: "תקלות" },
      eyebrow: "SAP Notes Center",
      h1: "מרכז SAP Notes — נתיבי פתרון",
      lede: `${SAP_NOTES.length} נושאי פתרון ל-PM/PP/PP-PI לפי רכיב SAP (Application Component) ומילות חיפוש מאומתות ל-OSS — תסמין, שורש, רלוונטיות ECC↔S/4 ושלבי פתרון. חיפוש לפי מילות מפתח + רכיב באתר ה-Launchpad.`,
    },
    intro: [{
      t: "text", title: "שיטה",
      text: "כל כרטיס ממפה תסמין → רכיב SAP מדויק (למשל PP-PI-PMA-CON) + מילות חיפוש ל-OSS. אנו לא ממציאים מספרי Note — מאתרים אותם לפי הרכיב והמילים ב-launchpad.support.sap.com. כרטיסים מקושרים לתקלות במרכז פתרון התקלות.",
    }],
    groups: MODULES.map((m) => ({
      title: MOD_HE[m],
      rows: SAP_NOTES.filter((n) => n.module === m).map((n) => ({
        href: `/neo/sap-notes/${n.slug}/`,
        he: n.he,
        en: `${n.component} · ${n.title}`,
        sub: `תסמין: ${n.symptom}`,
        tags: [n.module],
      })),
    })).filter((g) => g.rows.length),
    blocks: [{
      t: "stack", title: "כל נושאי הפתרון במלואם", fold: true, count: SAP_NOTES.length,
      parts: SAP_NOTES.map((n): Block => ({
        t: "kv", title: n.he,
        rows: [
          { k: "רכיב · נושא", v: `${n.component} · ${n.title}` },
          { k: "תסמין", v: n.symptom },
          { k: "שורש", v: n.cause },
          { k: "ECC ↔ S/4", v: n.relevance },
          { k: "שלבי פתרון", list: n.resolution },
          { k: "מילות חיפוש OSS", ids: n.keywords.map((k) => plain(k)) },
          ...((n.relatedIncidents || []).length
            ? [{ k: "תקלות מקושרות", list: incidentRefs(n).map((r) => r.label) }]
            : []),
        ],
      })),
    }],
  };
}
