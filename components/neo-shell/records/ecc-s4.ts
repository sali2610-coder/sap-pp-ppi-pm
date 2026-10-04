/* ============================================================================
   PROJECT NEO · /neo/ecc-s4 — the ECC vs S/4HANA comparison topics.
   ----------------------------------------------------------------------------
   data/ecc-s4.ts, field by field: area, status, how it worked in ECC, how it
   works in S/4HANA, the Fiori/CDS replacement, the simplification item, the
   migration impact and the note. The status is drawn in the NEO evidence
   vocabulary (lib/evidence fromChangeStatus, the StatusPill), exactly as the
   S/4 readiness surface draws the same topics; the dataset's own word stays
   beside it. "Deprecated" holds two facts in this file (not strategic, and
   removed), so it keeps both words, as components/neo-shell/s4/s4-data does.
   ========================================================================== */

import { ECC_S4_TOPICS, STATUS_HE, eccS4BySlug, type ChangeStatus, type EccS4Topic } from "@/data/ecc-s4";
import { fromChangeStatus } from "@/lib/evidence/s4-status";
import { S4_STATUS_DOT, S4_STATUS_HE, S4_STATUS_WORD } from "@/lib/evidence/types";
import { centerHref } from "./links";
import type { Block, Head, RecordData, RowGroup, Status } from "./kit";

const BACK = { href: "/neo/ecc-s4/", label: "ECC מול S/4" };
const AREAS: EccS4Topic["area"][] = ["Data", "PP", "PM", "Platform"];
const AREA_HE: Record<EccS4Topic["area"], string> = { Data: "נתונים ומילון", PP: "ייצור (PP / PP-PI)", PM: "אחזקה (PM)", Platform: "פלטפורמה ו-UX" };
const STATUSES = Object.keys(STATUS_HE) as ChangeStatus[];

const keyOf = (s: ChangeStatus) => fromChangeStatus(s).status;
/** The short NEO word; "Deprecated" keeps its two facts side by side. */
const wordOf = (s: ChangeStatus) =>
  s === "Deprecated" ? `${S4_STATUS_WORD.not_available} או ${S4_STATUS_WORD.deprecated}` : S4_STATUS_WORD[keyOf(s)];
const statusOf = (s: ChangeStatus): Status => ({
  key: keyOf(s),
  label: s === "Deprecated" ? wordOf(s) : S4_STATUS_HE[keyOf(s)],
  dot: S4_STATUS_DOT[keyOf(s)],
});

export function eccS4Record(slug: string): RecordData | null {
  const t = eccS4BySlug(slug);
  if (!t) return null;
  const sim = (t.simplification || "").trim();
  const mig = centerHref("migration", t.slug);
  return {
    title: `${t.he} · ${t.title}`,
    description: t.s4,
    head: {
      back: BACK,
      eyebrow: "השוואת ECC ↔ S/4HANA",
      h1: t.he,
      en: t.title,
      tags: [AREA_HE[t.area]],
      status: [statusOf(t.status)],
      facts: [{ k: "סטטוס במאגר", v: `${STATUS_HE[t.status]} (${t.status})` }],
    },
    blocks: [
      { t: "compare", title: "ECC מול S/4HANA", a: { label: "ב-ECC", text: t.ecc }, b: { label: "ב-S/4HANA", text: t.s4 } },
      ...(t.fioriCds ? [{ t: "text", title: "חלופת Fiori / CDS", text: t.fioriCds } as Block] : []),
      ...(sim && sim !== "—" ? [{ t: "text", title: "פריט פישוט (Simplification Item)", text: sim } as Block] : []),
      { t: "text", title: "השפעת מיגרציה", text: t.impact },
      ...(t.note ? [{ t: "warn", title: "הערה", text: t.note } as Block] : []),
      ...(mig ? [{ t: "refs", title: "ראו גם", items: [{ label: `מעבר ל-S/4HANA · ${t.he}`, href: mig }] } as Block] : []),
    ],
  };
}

export const eccS4Params = (): string[] => ECC_S4_TOPICS.map((t) => t.slug);

export function eccS4Index(): { head: Head; intro: Block[]; groups: RowGroup[] } {
  return {
    head: {
      back: { href: "/neo/s4-readiness/", label: "כיסוי תיעוד למעבר" },
      eyebrow: "מנוע השוואה",
      h1: "ECC מול S/4HANA",
      lede: "מה באמת השתנה במעבר — לכל נושא: סטטוס (ללא שינוי / שונה / הוחלף / הוסר), איך עבד ב-ECC, איך עובד ב-S/4, חלופת Fiori/CDS, ופריט הפישוט הרלוונטי.",
    },
    intro: [{
      t: "kv", title: "מקרא סטטוס",
      lede: "מילת המאגר מימין, מילת NEO לצידה.",
      rows: STATUSES.map((s) => ({
        k: STATUS_HE[s],
        v: `${wordOf(s)} · ${ECC_S4_TOPICS.filter((t) => t.status === s).length} נושאים`,
      })),
    }],
    groups: AREAS.map((a) => ({
      title: AREA_HE[a],
      rows: ECC_S4_TOPICS.filter((t) => t.area === a).map((t) => ({
        href: `/neo/ecc-s4/${t.slug}/`,
        he: t.he,
        en: t.title,
        sub: t.s4,
        tags: [wordOf(t.status)],
      })),
    })).filter((g) => g.rows.length),
  };
}
