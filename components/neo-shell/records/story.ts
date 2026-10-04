/* ============================================================================
   PROJECT NEO · /neo/story — the guided process walkthroughs.
   ----------------------------------------------------------------------------
   data/story: every step of every story, all at once: phase, title, what, why,
   when, what the system creates, the S/4HANA change, and for a step that
   names a real table, what the legacy view derived from the dataset at render
   time (lib/data objectIntel, lib/knowledge-graph tableByName): its parents
   and children, T-Codes and related objects, with the legacy caps (4, 4, 6, 6).
   The legacy view showed one step at a time; the content is the same.
   ========================================================================== */

import { STORIES } from "@/data/story/pppi-process-order";
import type { Story, StoryStep } from "@/data/story/types";
import { objectIntel } from "@/lib/data";
import { tableByName } from "@/lib/knowledge-graph";
import { academyCourseIds } from "../learn/academy-data";
import { tableRef, txRef } from "./links";
import type { Block, Head, Kv, RecordData, RowGroup } from "./kit";

const BACK = { href: "/neo/story/", label: "סיורים מודרכים" };
const MOD = (s: Story) => (s.module === "pm" ? "PM" : "PP-PI");

/** The story's learning path (/learn/pm/, /learn/pp-pi/) is a course of the
 *  NEO academy; linked only when /neo/academy/<id>/ is generated. */
const courseHref = (learnPath: string): string | null => {
  const id = learnPath.match(/^\/learn\/(pm|pp-pi)(?:[-/]|$)/)?.[1];
  return id && academyCourseIds().includes(id) ? `/neo/academy/${id}/` : null;
};

function stepBlock(s: StoryStep, total: number): Block {
  const qa: Kv[] = [
    { k: "מה זה?", v: s.whatHe },
    { k: "למה צריך?", v: s.whyHe },
    { k: "מתי משתמשים?", v: s.whenHe },
    { k: "מה נוצר במערכת?", v: s.createdHe },
    ...(s.s4He ? [{ k: "מה משתנה ב-S/4HANA?", v: s.s4He }] : []),
  ];
  const parts: Block[] = [{ t: "kv", title: "", rows: qa }];
  if (s.object) {
    const intel = objectIntel(s.object);
    const tbl = tableByName(s.object);
    const parents = tbl ? [...new Set(tbl.relations.filter((r) => r.role === "child").map((r) => r.table))].slice(0, 4) : [];
    const children = tbl ? [...new Set(tbl.relations.filter((r) => r.role === "parent").map((r) => r.table))].slice(0, 4) : [];
    const rows: Kv[] = [{ k: "אובייקט", ids: [tableRef(s.object)] }];
    if (parents.length) rows.push({ k: "קשרים · מעליו", ids: parents.map((p) => tableRef(p)) });
    if (children.length) rows.push({ k: "קשרים · מתחתיו", ids: children.map((c) => tableRef(c)) });
    const tcodes = intel?.tcodes?.slice(0, 6) || [];
    const related = intel?.related?.slice(0, 6) || [];
    if (tcodes.length) rows.push({ k: "T-Codes", ids: tcodes.map((c) => txRef(c)) });
    if (related.length) rows.push({ k: "אובייקטים קשורים", ids: related.map((r) => tableRef(r)) });
    parts.push({ t: "kv", title: "מהמאגר", rows });
  }
  return { t: "stack", title: `${s.n}. ${s.title}`, lede: `שלב ${s.n} מתוך ${total} · ${s.phaseHe}`, parts };
}

export function storyRecord(id: string): RecordData | null {
  const s = STORIES[id];
  if (!s) return null;
  return {
    title: `${s.he} · סיור מודרך`,
    foot: "מקור: תיעוד הפרויקט; הטבלאות, הטרנזקציות והקשרים נגזרים מהמאגר.",
    description: s.sub,
    head: {
      back: BACK,
      eyebrow: "NEO Story Mode",
      h1: s.he,
      lede: s.sub,
      tags: [MOD(s), `${s.steps.length} שלבים`],
    },
    blocks: [
      ...s.steps.map((st) => stepBlock(st, s.steps.length)),
      { t: "refs", title: "מסלול הלמידה", items: [{ label: "חזרה למסלול הלמידה", href: courseHref(s.learnPath) }] },
    ],
  };
}

export const storyParams = (): string[] => Object.keys(STORIES);

export function storiesIndex(): { head: Head; groups: RowGroup[] } {
  return {
    head: {
      back: { href: "/neo/domain-model/", label: "תחומים עסקיים" },
      eyebrow: "NEO Story Mode",
      h1: "סיור מודרך בתהליך",
      lede: "למד תהליך SAP אמיתי מקצה לקצה — שלב אחרי שלב, עם הסבר, טבלאות, T-Codes והשפעת S/4.",
    },
    groups: [{
      rows: Object.values(STORIES).map((s) => ({
        href: `/neo/story/${s.id}/`,
        he: s.he,
        sub: s.sub,
        tags: [MOD(s)],
        meta: `${s.steps.length} שלבים`,
      })),
    }],
  };
}
