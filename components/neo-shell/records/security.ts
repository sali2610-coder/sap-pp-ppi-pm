/* ============================================================================
   PROJECT NEO · /neo/security — authorization concepts and tooling.
   ----------------------------------------------------------------------------
   A record (data/authorizations.ts) carries purpose, detail, common failures,
   diagnosis steps, a PM and a PP example, and ECC vs S/4HANA. The legacy page
   also rendered the object-intelligence profile of the item
   (lib/object-profile buildProfile(slug, "auth")): twelve dimensions, each
   marked "אומת" or "ידע כללי". All twelve are carried, folded, with their
   marks.

   The index was the interactive security course (lib/security-course over
   data/security.ts). Every topic and every one of its tabs is carried, each
   topic folded; the topic's Fiori line, which the course never drew, is added
   from the same record.
   ========================================================================== */

import { AUTH_ITEMS, authBySlug } from "@/data/authorizations";
import { AREAS } from "@/data/security";
import { buildProfile, type ProfDim } from "@/lib/object-profile";
import { buildSecurityCourseData } from "@/lib/security-course";
import { incidentHref, neoOf, plain, tableRef, txRef } from "./links";
import type { Block, Head, Kv, RecordData, Ref, RowGroup } from "./kit";

const BACK = { href: "/neo/security/", label: "הרשאות ואבטחה" };
const KIND_HE = { Tcode: "טרנזקציה", Concept: "מושג הרשאות" } as const;
/** The course wrote one emoji into a sentence; the words stay, the glyph does not. */
const noEmoji = (s: string) => s.replace(/\s*\p{Extended_Pictographic}️?/gu, "").trim();
const mark = (d: ProfDim) => (d.verified ? "אומת" : "ידע כללי");

export function authRecord(slug: string): RecordData | null {
  const a = authBySlug(slug);
  if (!a) return null;
  const p = buildProfile(a.slug, "auth");
  const profile: Block[] = p ? [{
    t: "stack", title: "תבונת אובייקט · מדריך יועץ בכיר", fold: true,
    lede: `${p.kindHe} · ${p.name}`,
    parts: [
      {
        t: "kv", title: "שנים-עשר הממדים",
        rows: [
          { k: `מה זה · ${mark(p.what)}`, v: p.what.text },
          { k: `למה קיים · ${mark(p.why)}`, v: p.why.text },
          { k: "מי משתמש", v: p.who },
          { k: "מתי משתמשים", v: p.when },
          { k: "מחזור חיים", v: p.lifecycle },
          p.dependencies.length ? { k: "תלויות", list: p.dependencies } : { k: "תלויות", v: "אין תלויות מתועדות במאגר." },
          { k: `ECC מול S/4HANA · ${mark(p.eccS4)}`, v: p.eccS4.text },
          { k: `דוגמה — אחזקה (PM) · ${mark(p.pmExample)}`, v: p.pmExample.text },
          { k: `דוגמה — ייצור (PP/PP-PI) · ${mark(p.ppExample)}`, v: p.ppExample.text },
        ],
      },
      { t: "ids", title: "אובייקטים קשורים", items: p.related.map((r) => ({ label: r.name, href: neoOf(r.href), sub: r.he })), empty: "אין אובייקטים קשורים במאגר." },
      { t: "bullets", title: "פתרון תקלות נפוץ", items: p.troubleshooting },
      { t: "numbered", title: "שאלות ראיון", items: p.interview },
    ],
  }] : [];
  return {
    title: `${a.he} · ${a.title}`,
    description: a.purpose,
    head: {
      back: BACK,
      eyebrow: a.kind === "Tcode" ? `טרנזקציה · ${a.title}` : KIND_HE.Concept,
      h1: a.he,
      en: a.title,
      lede: a.purpose,
      tags: [KIND_HE[a.kind]],
    },
    blocks: [
      { t: "text", title: "פירוט", text: a.detail },
      { t: "bullets", title: "כשלים נפוצים", items: a.failures },
      { t: "bullets", title: "צעדי אבחון ופתרון", items: a.troubleshoot },
      { t: "compare", title: "דוגמאות", a: { label: "דוגמת אחזקה (PM)", text: a.pmExample }, b: { label: "דוגמת ייצור (PP/PP-PI)", text: a.ppExample } },
      { t: "compare", title: "ECC מול S/4HANA", a: { label: "ב-ECC", text: a.ecc }, b: { label: "ב-S/4HANA", text: a.s4 } },
      ...profile,
    ],
  };
}

export const authParams = (): string[] => AUTH_ITEMS.map((a) => a.slug);

/* ------------------------------------------------------------- the course */

function topicBlock(t: ReturnType<typeof buildSecurityCourseData>["topics"][number]): Block {
  const fiori = AREAS.find((x) => x.id === t.id)?.fiori;
  const intro: Kv[] = t.intro.map((f) => ({ k: f.label, v: noEmoji(f.text) }));
  const parts: Block[] = [
    { t: "kv", title: "סקירה", rows: fiori ? [...intro, { k: "Fiori", v: fiori }] : intro },
    { t: "bullets", title: "אחרי שתסיים את הנושא הזה תדע…", items: t.checklist },
    { t: "text", title: "מה המנהל מצפה שתדע", text: t.managerExpects },
    { t: "numbered", title: "שאלות ראיון טיפוסיות", items: t.interview },
  ];
  const v = t.visual;
  if (v?.layers?.length) {
    parts.push({
      t: "kv", title: "ויזואלי · שכבות",
      rows: v.layers.map((l) => ({ k: [l.he, l.en, l.hot ? "שכבת הנושא" : ""].filter(Boolean).join(" · "), list: l.items })),
    });
  }
  if (v?.flow?.length) parts.push({ t: "numbered", title: "ויזואלי · זרימה", items: v.flow });
  if (v?.note) parts.push({ t: "text", title: "ויזואלי · הערה", text: v.note });
  if (t.examples?.scenario) parts.push({ t: "text", title: "תרחיש טיפוסי", text: t.examples.scenario });
  if (t.examples?.bullets?.length) parts.push({ t: "bullets", title: "איך עושים נכון", items: t.examples.bullets });
  if (t.transactions?.tcodes?.length) parts.push({ t: "ids", title: "טרנזקציות", items: t.transactions.tcodes.map((c) => txRef(c)) });
  if (t.transactions?.tables?.length) parts.push({ t: "ids", title: "טבלאות", items: t.transactions.tables.map((n) => tableRef(n)) });
  if (t.transactions?.tools?.length) parts.push({ t: "ids", title: "כלים", items: t.transactions.tools.map((n) => plain(n)) });
  if (t.debug?.issues?.length) parts.push({ t: "bullets", title: "תקלות נפוצות", items: t.debug.issues });
  if (t.debug?.steps?.length) parts.push({ t: "bullets", title: "נתיב Debug", items: t.debug.steps });
  if (t.debug?.oss?.length) parts.push({ t: "ids", title: "OSS · SAP Notes", items: t.debug.oss.map((n) => plain(n)) });
  if (t.scenario?.text) parts.push({ t: "text", title: "דוגמת ייצור — הארגון", text: t.scenario.text });
  if (t.scenario?.incidents?.length) {
    parts.push({ t: "refs", title: "תקלות מתועדות", items: t.scenario.incidents.map((i): Ref => ({ label: i.label, id: i.slug, href: incidentHref(i.slug) })) });
  }
  if (t.related?.length) parts.push({ t: "refs", title: "קשור", items: t.related.map((l): Ref => ({ label: l.label, href: neoOf(l.href) })) });
  return { t: "stack", title: `${t.he} · ${t.en}`, fold: true, parts };
}

export function securityIndex(): { head: Head; groups: RowGroup[]; blocks: Block[]; foot: string } {
  const d = buildSecurityCourseData();
  return {
    head: {
      back: { href: "/neo/centers/process-auth/", label: "הרשאות לתהליכים" },
      eyebrow: d.meta.eyebrow,
      h1: d.meta.he,
      lede: d.meta.sub,
    },
    groups: [{
      title: "פריטי הרשאות ואבטחה",
      rows: AUTH_ITEMS.map((a) => ({
        href: `/neo/security/${a.slug}/`,
        he: a.he,
        en: a.title,
        sub: a.purpose,
        tags: [KIND_HE[a.kind]],
      })),
    }],
    blocks: [
      { t: "refs", title: "התחל כאן · Start Here", items: d.startMeta.map((s) => ({ label: s.he, sub: s.sub })) },
      {
        t: "groups", title: "מסלול למידה · Beginner → Expert",
        groups: d.ladder.map((l, i) => ({ label: `${i + 1}. ${l.label}`, items: l.topics.map((x) => ({ label: x.he })) })),
      },
      ...d.topics.map(topicBlock),
      {
        t: "refs", title: "מרכזים קשורים",
        items: [...d.crossLinks, { label: "כל המרכזים", href: "/knowledge/" }].map((l) => ({ label: l.label, href: neoOf(l.href) })),
      },
    ],
    // The course's closing line, without the progress note (progress is not carried).
    foot: "קורס אינטראקטיבי · ידע SAP סטנדרטי · trust: curated.",
  };
}
