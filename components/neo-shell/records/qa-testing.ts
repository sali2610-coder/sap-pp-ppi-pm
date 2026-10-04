/* ============================================================================
   PROJECT NEO · /neo/qa-testing — the QA scenario packs.
   ----------------------------------------------------------------------------
   data/qa-center.ts, field by field: module, area, intro, T-Codes, tables and
   every scenario, grouped by kind in the legacy order (validation, positive,
   negative, integration, regression), each kind with its count.
   ========================================================================== */

import { QA_PACKS, qaPackBySlug, type QaKind, type QaPack } from "@/data/qa-center";
import { tableRef, txRef } from "./links";
import type { Block, Head, RecordData, RowGroup } from "./kit";

const BACK = { href: "/neo/qa-testing/", label: "מרכז בדיקות QA" };
const ORDER: QaKind[] = ["Validation", "Positive", "Negative", "Integration", "Regression"];
const KIND_HE: Record<QaKind, string> = { Positive: "חיובי", Negative: "שלילי", Regression: "רגרסיה", Integration: "אינטגרציה", Validation: "ולידציה" };
const MODULES: QaPack["module"][] = ["PM", "PP", "PP-PI", "Cross"];

export function qaRecord(slug: string): RecordData | null {
  const p = qaPackBySlug(slug);
  if (!p) return null;
  return {
    title: `${p.he} · ${p.area}`,
    description: p.intro,
    head: {
      back: BACK,
      eyebrow: `חבילת בדיקות · ${p.module} · ${p.area}`,
      h1: p.he,
      en: p.area,
      lede: p.intro,
      tags: [p.module, `${p.scenarios.length} תרחישים`],
    },
    blocks: [
      { t: "ids", title: "T-Codes", items: p.tcodes.map((c) => txRef(c)) },
      { t: "ids", title: "טבלאות", items: p.tables.map((t) => tableRef(t)) },
      ...ORDER.map((kind): Block | null => {
        const items = p.scenarios.filter((s) => s.kind === kind).map((s) => s.he);
        return items.length ? { t: "bullets", title: `${KIND_HE[kind]} · ${kind}`, count: items.length, items } : null;
      }).filter((b): b is Block => !!b),
    ],
  };
}

export const qaParams = (): string[] => QA_PACKS.map((p) => p.slug);

export function qaIndex(): { head: Head; groups: RowGroup[] } {
  return {
    head: {
      back: { href: "/neo/knowledge/", label: "מרכז הידע" },
      eyebrow: "QA Testing Center",
      h1: "מרכז בדיקות QA",
      lede: `${QA_PACKS.length} חבילות בדיקה ל-PM/PP/PP-PI — תרחישי Positive/Negative/Regression/Integration + ולידציית נתוני אב, מחזור חיי פקודה, אצוות, MRP והתחשבנות. מותאם ליועצי QA.`,
    },
    groups: MODULES.map((m) => ({
      title: m,
      rows: QA_PACKS.filter((p) => p.module === m).map((p) => ({
        href: `/neo/qa-testing/${p.slug}/`,
        he: p.he,
        en: p.area,
        sub: p.intro,
        tags: [p.module],
        meta: `${p.scenarios.length} תרחישים`,
      })),
    })).filter((g) => g.rows.length),
  };
}
