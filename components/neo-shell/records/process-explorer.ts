/* ============================================================================
   PROJECT NEO · /neo/process-explorer — end-to-end process maps.
   ----------------------------------------------------------------------------
   data/processes.ts, field by field: domain, summary and every step with its
   T-Codes, tables, programs, Fiori apps, interfaces, incidents, SAP Note
   topics and QA note. An incident or note topic is named by its record, with
   the slug the legacy chip showed beside it. The legacy index let the reader
   open any map's steps in place; the index here keeps every map's steps,
   folded.
   ========================================================================== */

import { PROCESS_MAPS, processBySlug, type ProcStep } from "@/data/processes";
import { incidentBySlug } from "@/data/troubleshooting";
import { noteBySlug } from "@/data/sap-notes";
import { funcRef, incidentHref, noteHref, plain, tableRef, txRef } from "./links";
import type { Block, Head, RecordData, Ref, RowGroup, Step } from "./kit";

const BACK = { href: "/neo/process-explorer/", label: "Process Explorer" };
const real = (a?: string[]) => (a || []).map((x) => x.trim()).filter((x) => x && x !== "—");

const incRef = (slug: string): Ref => {
  const i = incidentBySlug(slug);
  return i ? { label: i.he, id: slug, href: incidentHref(slug) } : { label: slug };
};
const noteRef = (slug: string): Ref => {
  const n = noteBySlug(slug);
  return n ? { label: n.he, id: slug, href: noteHref(slug) } : { label: slug };
};

const stepOf = (s: ProcStep): Step => ({
  text: s.he,
  groups: [
    { label: "T-Codes", codes: true, items: real(s.tcodes).map((c) => txRef(c)) },
    { label: "טבלאות", codes: true, items: real(s.tables).map((t) => tableRef(t)) },
    { label: "תוכניות", codes: true, items: real(s.programs).map((p) => plain(p)) },
    { label: "Fiori", codes: true, items: real(s.fiori).map((f) => plain(f)) },
    { label: "ממשקים", codes: true, items: real(s.interfaces).map((x) => funcRef(x)) },
    { label: "תקלות", items: real(s.incidents).map(incRef) },
    { label: "מקרי SAP Notes", items: real(s.notes).map(noteRef) },
  ],
  notes: s.test ? [{ k: "QA:", v: s.test }] : undefined,
});

export function processMapRecord(slug: string): RecordData | null {
  const p = processBySlug(slug);
  if (!p) return null;
  return {
    title: `${p.he} · ${p.title}`,
    description: p.summary,
    head: {
      back: BACK,
      eyebrow: `תהליך E2E · ${p.domain}`,
      h1: p.he,
      en: p.title,
      lede: p.summary,
      tags: [p.domain, `${p.steps.length} שלבים`],
    },
    blocks: [{ t: "steps", title: "שלבי התהליך", count: p.steps.length, items: p.steps.map(stepOf) }],
  };
}

export const processMapParams = (): string[] => PROCESS_MAPS.map((p) => p.slug);

export function processMapsIndex(): { head: Head; groups: RowGroup[]; blocks: Block[] } {
  return {
    head: {
      back: { href: "/neo/domain-model/", label: "תחומים עסקיים" },
      eyebrow: "Process Explorer",
      h1: "מפות תהליך מקצה-לקצה",
      lede: `${PROCESS_MAPS.length} תהליכי E2E — P2P, O2C, Plan-to-Produce, QM, אחזקה. לכל שלב: T-Codes, טבלאות, Fiori, ממשקים, תקלות ובדיקת QA.`,
    },
    groups: [{
      rows: PROCESS_MAPS.map((p) => ({
        href: `/neo/process-explorer/${p.slug}/`,
        he: p.he,
        en: `${p.title} · ${p.steps.length} שלבים`,
        sub: p.summary,
        tags: [p.domain],
      })),
    }],
    blocks: [{
      t: "stack", title: "השלבים של כל המפות", fold: true, count: PROCESS_MAPS.length,
      parts: PROCESS_MAPS.flatMap((p): Block[] => [
        { t: "steps", title: `${p.he} · ${p.title}`, lede: p.summary, items: p.steps.map(stepOf) },
        { t: "refs", title: "", items: [{ label: "תצוגה מלאה", href: `/neo/process-explorer/${p.slug}/` }] },
      ]),
    }],
  };
}
