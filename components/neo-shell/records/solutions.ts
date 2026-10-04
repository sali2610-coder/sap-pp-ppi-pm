/* ============================================================================
   PROJECT NEO · /neo/solutions — the Solution Finder: a business need mapped
   to the standard SAP solution.
   ----------------------------------------------------------------------------
   data/solutions.ts, field by field: domain, process, ECC T-Codes, the S/4
   alternative, Fiori apps, tables, CDS, APIs, BAPIs, exits, incidents,
   implementation complexity, and the search keywords the finder matched on.
   A value the source writes as "—" is an absence, said in words.
   ========================================================================== */

import { SOLUTIONS, solutionBySlug } from "@/data/solutions";
import { incidentBySlug } from "@/data/troubleshooting";
import { cdsRef, exitRef, funcRef, incidentHref, neoOf, plain, tableRef, txRef } from "./links";
import type { Head, RecordData, Ref, RowGroup } from "./kit";

const BACK = { href: "/neo/solutions/", label: "מאתר הפתרונות" };
const real = (a: string[]) => a.map((x) => x.trim()).filter((x) => x && x !== "—");

const incidentRefs = (slugs: string[]): Ref[] =>
  slugs.map((slug) => {
    const i = incidentBySlug(slug);
    return i ? { label: i.he, id: slug, href: incidentHref(slug) } : { label: slug };
  });

export function solutionRecord(slug: string): RecordData | null {
  const s = solutionBySlug(slug);
  if (!s) return null;
  const none = (what: string) => `לא צוינו ${what} לפתרון זה במאגר.`;
  return {
    title: `${s.he} · ${s.title}`,
    description: s.process,
    head: {
      back: BACK,
      eyebrow: `פתרון · ${s.domain} · מורכבות ${s.complexity}`,
      h1: s.he,
      en: s.title,
      lede: s.process,
      tags: [s.domain, `מורכבות יישום: ${s.complexity}`],
    },
    blocks: [
      { t: "ids", title: "T-Code (ECC)", items: real(s.eccTcodes).map((c) => txRef(c)), empty: none("טרנזקציות") },
      { t: "text", title: "חלופת S/4HANA", text: s.s4Alt },
      { t: "ids", title: "אפליקציות Fiori", items: real(s.fiori).map((f) => plain(f)), empty: none("אפליקציות Fiori") },
      { t: "ids", title: "טבלאות", items: real(s.tables).map((t) => tableRef(t)), empty: none("טבלאות") },
      { t: "ids", title: "CDS Views", items: real(s.cds).map((v) => cdsRef(v)), empty: none("תצוגות CDS") },
      { t: "ids", title: "APIs (OData)", items: real(s.apis).map((a) => plain(a)), empty: none("APIs") },
      { t: "ids", title: "BAPIs / FMs", items: real(s.bapis).map((b) => funcRef(b)), empty: none("BAPIs או FMs") },
      { t: "ids", title: "User Exits / BAdIs", items: real(s.exits).map((e) => exitRef(e)), empty: none("הרחבות") },
      { t: "refs", title: "תקלות נפוצות", items: incidentRefs(real(s.incidents)), empty: none("תקלות") },
      { t: "text", title: "הערות מיגרציה (ECC → S/4HANA)", text: `${s.s4Alt} מורכבות יישום: ${s.complexity}. ראה lifecycle לכל T-Code + מרכז המיגרציה.` },
      {
        t: "refs", title: "המשך עבודה", items: [
          { label: "הרשאות (Authorization): אובייקטי הרשאה + אבחון SU53→PFCG", href: neoOf("/process-auth/") }, // legacy /authorizations/ = the process-auth centre
          { label: "מקרי בדיקה (QA): QA Center", href: neoOf("/qa-testing/"), sub: "תרחישי Positive/Negative/Integration · התקלות לעיל = תרחישי כשל (Negative)." },
          { label: "מרכז המיגרציה", href: neoOf("/migration/") },
        ],
      },
      { t: "ids", title: "מילות חיפוש", items: real(s.keywords).map((k) => plain(k)) },
    ],
  };
}

export const solutionParams = (): string[] => SOLUTIONS.map((s) => s.slug);

export function solutionsIndex(): { head: Head; groups: RowGroup[] } {
  return {
    head: {
      back: { href: "/neo/best-practices/", label: "שיטות עבודה מומלצות" },
      eyebrow: "SAP Solution Finder",
      h1: "מאתר הפתרונות",
      lede: `${SOLUTIONS.length} פתרונות SAP סטנדרטיים, לפי דרישה עסקית (לא רק T-Code). לכל פתרון: תהליך, T-Code ECC, חלופת S/4, Fiori, טבלאות, CDS, APIs, BAPIs, Exits, תקלות ומורכבות יישום.`,
    },
    groups: [{
      rows: SOLUTIONS.map((s) => ({
        href: `/neo/solutions/${s.slug}/`,
        he: s.he,
        en: s.title,
        sub: s.process,
        tags: [`מורכבות ${s.complexity}`, s.domain],
      })),
    }],
  };
}
