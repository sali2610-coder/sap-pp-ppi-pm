/* ============================================================================
   PROJECT NEO · /neo/enhancements — the enhancement techniques.
   ----------------------------------------------------------------------------
   Runs on the SERVER at build time over data/enhancements.ts (13 authored
   techniques) and data/exits.ts (the named PM / PP / PP-PI exits and BAdIs the
   project really catalogues).

   THE S/4 SHAPE OF THIS DIRECTORY IS DIFFERENT, AND DELIBERATELY SO.
   Every technique record stores an authored ECC statement AND an authored S/4
   statement, as a pair. That pair IS the answer, so the plate renders both
   verbatim, side by side, at the top of the record — always, for every
   technique. What it does NOT do is paint all thirteen records with the brand
   accent: an accent that fires on every row is not an accent. Brand red stays
   reserved across the whole namespace for a record the data marks as materially
   changed, and no technique record carries such a structured flag.
   ========================================================================== */

import { ENHANCEMENTS, type Enhancement } from "@/data/enhancements";
import { EXITS, type Exit, type ExitKind } from "@/data/exits";
import { completeness, enhHref, nf, txHref, uniq } from "./ref-links";
import type { RefCard, RefDetail, RefDir, RefFact, RefRow, RefSection, RefStatus } from "./types";

const KIND_HE: Record<string, string> = {
  Exit: "Exit קלאסי",
  BAdI: "BAdI",
  Framework: "מסגרת הרחבה",
};

/** A technique is joined to the named-exit catalogue only where the two files
 *  use the SAME word for the mechanism. Anything looser would be a guess about
 *  which concrete exit belongs to which technique, so the join is left empty and
 *  the record says so. */
const EXIT_KIND_OF: Record<string, ExitKind> = {
  "user-exit": "User Exit",
  "customer-exit": "Customer Exit",
  "classic-badi": "BAdI",
  "enhancement-spot": "Enhancement Spot",
  bte: "BTE",
};

const namedExits = (slug: string): Exit[] => {
  const k = EXIT_KIND_OF[slug];
  return k ? EXITS.filter((e) => e.kind === k) : [];
};

export const enhSlugs = (): string[] => ENHANCEMENTS.map((e) => e.slug);
export const enhancement = (slug: string): Enhancement | undefined =>
  ENHANCEMENTS.find((e) => e.slug === slug);

/* --------------------------------------------------------------- the rows */

function rowOf(e: Enhancement): RefRow {
  const exits = namedExits(e.slug);
  const caps: string[] = [];
  if (e.note) caps.push("caveat");
  if (exits.length) caps.push("named");
  if (e.pmExample && e.pmExample !== "—") caps.push("pm");
  if (e.ppExample && e.ppExample !== "—") caps.push("pp");

  return {
    id: e.slug,
    href: `/neo/enhancements/${encodeURIComponent(e.slug)}/`,
    name: e.title,
    he: e.def,
    en: "",
    mods: [],
    kind: KIND_HE[e.kind] || e.kind,
    group: e.he,
    nums: [
      { i: "terminal", sr: "טרנזקציות ", v: nf.format(e.tcodes.length) },
      { i: "puzzle", sr: "הרחבות בשם במאגר ", v: nf.format(exits.length) },
    ],
    s4: {
      tone: "compare",
      status: e.note
        ? { he: "יש הסתייגות ברשומה", color: "var(--status-in-analysis)" }
        : { he: "יש אמירת ECC ו-S/4", color: "var(--status-done)" },
      text: e.s4,
    },
    caps,
    rank: exits.length,
    hay: [e.title, e.he, e.kind, e.def, e.how, e.ecc, e.s4, e.scenario, e.tcodes.join(" ")]
      .filter(Boolean).join(" ").toLowerCase(),
  };
}

/* --------------------------------------------------------------- the page */

export function enhDir(): RefDir {
  const rows = ENHANCEMENTS.map(rowOf);
  const count = (fn: (r: RefRow) => boolean) => rows.filter(fn).length;
  const byKind = new Map<string, number>();
  for (const r of rows) byKind.set(r.kind, (byKind.get(r.kind) || 0) + 1);

  return {
    id: "enhancements",
    surface: "neo:enhancements",
    eyebrow: "עיון · Reference",
    title: "טכניקות הרחבה",
    icon: "puzzle",
    lede:
      `${nf.format(ENHANCEMENTS.length)} טכניקות הרחבה של SAP — מ-User Exit ועד הרחבת Key-User ב-S/4HANA. ` +
      `לכל טכניקה כתובים במאגר גם מה היא הייתה ב-ECC וגם מה מעמדה ב-S/4HANA, ולכן כל רשומה כאן נפתחת ` +
      `בהשוואה הזו ולא בהגדרה. ${nf.format(EXITS.length)} הרחבות בשם מקטלוג ה-PM/PP-PI משויכות לטכניקות ` +
      `שנושאות את אותו שם מנגנון.`,
    stats: [
      { v: ENHANCEMENTS.length, l: "טכניקות", i: "puzzle" },
      { v: byKind.get(KIND_HE.Exit) || 0, l: "Exits קלאסיים", i: "fileCode" },
      { v: byKind.get(KIND_HE.BAdI) || 0, l: "BAdIs", i: "boxes" },
      { v: byKind.get(KIND_HE.Framework) || 0, l: "מסגרות הרחבה", i: "workflow" },
      { v: count((r) => r.caps.includes("named")), l: "עם הרחבות בשם במאגר", i: "shieldCheck" },
      { v: count((r) => r.caps.includes("pm")), l: "עם דוגמת PM", i: "wrench" },
      { v: count((r) => r.caps.includes("caveat")), l: "עם הסתייגות מתועדת", i: "alertTriangle" },
      { v: uniq(ENHANCEMENTS.flatMap((e) => e.tcodes)).length, l: "טרנזקציות מימוש", i: "terminal" },
    ],
    rows,
    mods: [],
    kinds: [...byKind.entries()].sort((a, b) => b[1] - a[1]).map(([id, n]) => ({ id, he: id, n })),
    kindsLabel: "סוג מנגנון",
    caps: [
      { id: "named", he: "יש הרחבות בשם", n: count((r) => r.caps.includes("named")) },
      { id: "pm", he: "דוגמת PM", n: count((r) => r.caps.includes("pm")) },
      { id: "pp", he: "דוגמת PP / PP-PI", n: count((r) => r.caps.includes("pp")) },
      { id: "caveat", he: "יש הסתייגות", n: count((r) => r.caps.includes("caveat")) },
    ].filter((c) => c.n > 0),
    groupLabel: "",
    rankLabel: "מספר הרחבות בשם",
    searchPlaceholder: "שם טכניקה · הגדרה · טרנזקציה · תרחיש",
    foot:
      "טכניקות ההרחבה נכתבו ידנית בקובץ הפרויקט וכוללות לכל אחת אמירת ECC ואמירת S/4HANA. שמות Exit ספציפיים " +
      "תלויי-גרסה, ולכן רשומה שמסייגת זאת מציגה את ההסתייגות שלה במפורש ולא מוסתרת.",
    emptyNote:
      "החיפוש עובר על שם הטכניקה, ההגדרה, אופן המימוש, טרנזקציות המימוש והתרחיש — כולם טקסטים אמיתיים מהקובץ.",
  };
}

/* ------------------------------------------------------------- the record */

export function enhDetail(slug: string): RefDetail | null {
  const e = enhancement(slug);
  if (!e) return null;
  const exits = namedExits(e.slug);

  /* --- the ECC ↔ S/4 pair, verbatim ------------------------------------ */
  const s4Facts: RefFact[] = [
    { label: "ב-ECC", text: e.ecc },
    { label: "ב-S/4HANA", text: e.s4 },
  ];
  if (e.note) s4Facts.push({ label: "הסתייגות שהרשומה מציינת", text: e.note });

  /* --- sections -------------------------------------------------------- */
  const sections: RefSection[] = [];

  sections.push({
    id: "what",
    icon: "puzzle",
    title: "מה הטכניקה",
    facts: [
      { label: "הגדרה", text: e.def },
      { label: "סוג מנגנון", text: KIND_HE[e.kind] || e.kind },
      { label: "שם בעברית", text: e.he },
    ],
  });

  sections.push({
    id: "how",
    icon: "workflow",
    title: "איך מממשים",
    facts: [
      { label: "שלבי המימוש", text: e.how },
      {
        label: "טרנזקציות",
        codes: e.tcodes.length ? e.tcodes.map((t) => ({ t, href: txHref(t) })) : undefined,
        absent: "הרשומה אינה מציינת טרנזקציית מימוש.",
      },
    ],
  });

  sections.push({
    id: "examples",
    icon: "boxes",
    title: "דוגמאות מהמודולים",
    facts: [
      { label: "אחזקה · PM", text: e.pmExample === "—" ? "" : e.pmExample, absent: "הרשומה אינה מציינת דוגמת PM לטכניקה הזו." },
      { label: "ייצור · PP / PP-PI", text: e.ppExample === "—" ? "" : e.ppExample, absent: "הרשומה אינה מציינת דוגמת PP לטכניקה הזו." },
      { label: "תרחיש עסקי", text: e.scenario },
    ],
  });

  /* named exits — values, not destinations: the project has no NEO page per
     named exit, so they are rendered as inert cards rather than as links that
     would open nothing. */
  const cards: RefCard[] = exits.map((x) => ({
    href: null,
    code: x.name,
    he: x.he,
    mod: x.module === "Cross" ? undefined : x.module,
    reason: x.trigger,
  }));
  sections.push({
    id: "named",
    icon: "shieldCheck",
    title: "הרחבות בשם מקטלוג הפרויקט",
    note: cards.length ? `${nf.format(cards.length)} רשומות` : undefined,
    cards,
    empty:
      EXIT_KIND_OF[e.slug]
        ? "אין במאגר הרחבה בשם מהסוג הזה."
        : "קטלוג ההרחבות של הפרויקט אינו משתמש בשם המנגנון הזה, ולכן לא בוצע כאן שיוך — שיוך רופף היה ניחוש.",
  });

  /* neighbouring techniques of the same mechanism */
  const near: RefCard[] = ENHANCEMENTS
    .filter((x) => x.slug !== e.slug && x.kind === e.kind)
    .map((x) => ({ href: enhHref(x.slug), code: x.title, he: x.he, reason: `אותו סוג מנגנון · ${KIND_HE[x.kind] || x.kind}` }));
  if (near.length) {
    sections.push({
      id: "near",
      icon: "gitBranch",
      title: "טכניקות מאותו סוג",
      note: `${nf.format(near.length)} רשומות`,
      cards: near,
    });
  }

  const checks = [
    !!e.def, !!e.how, !!e.ecc, !!e.s4,
    e.pmExample !== "—" && !!e.pmExample,
    e.ppExample !== "—" && !!e.ppExample,
    !!e.scenario, e.tcodes.length > 0, exits.length > 0,
  ];

  const statuses: RefStatus[] = [
    { he: "רשומה מתוחזקת ידנית", color: "var(--status-in-analysis)" },
  ];
  if (e.note) statuses.push({ he: "יש הסתייגות", color: "var(--status-not-started)" });

  return {
    kind: "enhancements",
    eyebrow: `טכניקת הרחבה · ${KIND_HE[e.kind] || e.kind}`,
    code: e.title,
    // The technical name of a technique IS its English name, and for several
    // records the authored Hebrew name is the same string. Printing it twice
    // under the title would be noise, so the second line carries the DEFINITION
    // and the Hebrew name only appears as a value when it really differs.
    he: e.def,
    en: "",
    mod: "",
    modHe: "",
    chips: uniq([
      KIND_HE[e.kind],
      e.he !== e.title ? e.he : "",
      exits.length ? `${nf.format(exits.length)} הרחבות בשם` : "",
    ]),
    statuses,
    completeness: completeness(checks.filter(Boolean).length, checks.length),
    s4: {
      tone: "compare",
      headline: e.s4,
      statuses: [
        { he: "ECC ו-S/4 שניהם כתובים ברשומה", color: "var(--status-done)" },
        ...(e.note ? [{ he: "יש הסתייגות", color: "var(--status-in-analysis)" }] : []),
      ],
      facts: s4Facts,
    },
    sections,
    sources: [],
    foot:
      "הרשומה נכתבה ידנית בקובץ טכניקות ההרחבה של הפרויקט. שמות Exit ו-BAdI ספציפיים תלויים בגרסה ובחבילת " +
      "התמיכה, ולכן יש לאמת אותם ב-SMOD / SE18 / SE19 במערכת עצמה לפני מימוש.",
  };
}
