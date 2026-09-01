/* ============================================================================
   PROJECT NEO · /neo/fiori-apps — the Fiori applications.
   ----------------------------------------------------------------------------
   Runs on the SERVER at build time over data/fiori/apps.ts, the project's
   curated app set: real App IDs, real Business Roles and Catalogs, the real
   OData service and CDS view, and the SAP GUI transactions each app replaces.
   Every record already carries its own trust level and its own source string,
   and both are printed — an app whose F-ID was confirmed against the Fiori Apps
   Library says so, and one that was not does not borrow the claim.

   S/4HANA IS THE POINT OF THIS DIRECTORY. A Fiori app IS the S/4 answer to a
   GUI transaction, so the plate at the top of every record names the ECC
   transactions it stands in front of, and prints the S/4 standing of each
   classic table behind it as resolved by lib/s4. Brand accent is reserved for
   the apps whose underlying table is a verified high-risk simplification.
   ========================================================================== */

import { FIORI_APPS } from "@/data/fiori/apps";
import type { FioriApp } from "@/lib/fiori/types";
import { MOD_HE } from "../mod-var";
import {
  bapiHref, cdsHref, clean, completeness, fioriHref, nf, standings, txHref, uniq,
} from "./ref-links";
import type { RefCard, RefDetail, RefDir, RefFact, RefRow, RefSection, RefStatus } from "./types";

const TYPE_HE: Record<string, string> = {
  Transactional: "טרנזקציוני",
  Analytical: "אנליטי",
  "Fact Sheet": "Fact Sheet",
};

const TRUST: Record<string, RefStatus> = {
  "verified-docs": { he: "אומת מול תיעוד SAP", color: "var(--status-done)" },
  curated: { he: "רשומה מתוחזקת ידנית", color: "var(--status-in-analysis)" },
  "needs-review": { he: "נדרשת סקירה", color: "var(--status-not-started)" },
};

const TRI_HE: Record<string, string> = { yes: "כן", no: "לא", unknown: "לא צוין במאגר" };

export const fioriSlugs = (): string[] => FIORI_APPS.map((a) => a.slug);
export const fioriApp = (slug: string): FioriApp | undefined =>
  FIORI_APPS.find((a) => a.slug === slug);

/** The CDS field is an authored free string ("I_Equipment / I_FunctionalLocation"),
 *  so it is split on the separators the data really uses. */
const cdsList = (a: FioriApp): string[] =>
  uniq((a.cds || "").split(/[\s/,]+/));

function s4Of(a: FioriApp) {
  const tables = standings(a.relatedTables || []);
  const critical = tables.filter((t) => t.critical);
  const tone: RefRow["s4"]["tone"] = critical.length ? "changed" : "replacement";
  const headline = critical.length
    ? `היישום נשען על ${critical.map((t) => t.name).join(", ")}: טבלה שמשתנה מהותית ב-S/4HANA.`
    : a.guiTx.length
      ? `יישום S/4HANA המחליף את ${a.guiTx.join(" · ")} ב-SAP GUI.`
      : "יישום S/4HANA. לא צוינה בתיעוד טרנזקציית SAP GUI מקבילה.";
  return { tables, critical, tone, headline };
}

/* --------------------------------------------------------------- the rows */

function rowOf(a: FioriApp): RefRow {
  const s4 = s4Of(a);
  const caps: string[] = [];
  if (a.cloud === "yes") caps.push("cloud");
  if (a.s4OnPrem === "yes") caps.push("onprem");
  if (a.odata) caps.push("odata");
  if (a.cds) caps.push("cds");
  if (a.commonErrors?.length) caps.push("errors");
  if (a.cbc) caps.push("cbc");
  if (s4.critical.length) caps.push("impact");

  return {
    id: a.slug,
    href: `/neo/fiori-apps/${encodeURIComponent(a.slug)}/`,
    name: a.id,
    he: a.he,
    en: a.name,
    mods: [a.module],
    kind: TYPE_HE[a.type] || a.type,
    group: a.role || "ללא תפקיד עסקי במאגר",
    nums: [
      { i: "terminal", sr: "טרנזקציות GUI ", v: nf.format(a.guiTx.length) },
      { i: "table", sr: "טבלאות ", v: nf.format((a.relatedTables || []).length) },
      { i: "keyRound", sr: "קטלוג עסקי ", v: a.catalog ? "יש" : "לא צוין" },
    ],
    s4: {
      tone: s4.tone,
      status: s4.critical.length
        ? { he: "נשען על טבלה שמשתנה", color: "var(--status-in-conversion)" }
        : { he: "מחליף מסך SAP GUI", color: "var(--status-done)" },
      text: s4.headline,
    },
    caps,
    rank: a.guiTx.length + (a.relatedTables || []).length,
    hay: [a.id, a.he, a.name, a.module, a.type, a.role, a.catalog, a.odata, a.cds,
      a.guiTx.join(" "), (a.relatedTables || []).join(" "), a.purpose]
      .filter(Boolean).join(" ").toLowerCase(),
  };
}

/* --------------------------------------------------------------- the page */

export function fioriDir(): RefDir {
  const rows = FIORI_APPS.map(rowOf);
  const count = (fn: (r: RefRow) => boolean) => rows.filter(fn).length;
  const byMod = new Map<string, number>();
  for (const r of rows) for (const m of r.mods) byMod.set(m, (byMod.get(m) || 0) + 1);
  const byKind = new Map<string, number>();
  for (const r of rows) byKind.set(r.kind, (byKind.get(r.kind) || 0) + 1);

  return {
    id: "fiori-apps",
    surface: "neo:fiori-apps",
    eyebrow: "קטלוג יישומי Fiori · Fiori Catalog",
    title: "יישומי SAP Fiori",
    icon: "layoutGrid",
    lede:
      `${nf.format(FIORI_APPS.length)} יישומי SAP Fiori המתועדים בפרויקט: מזהה יישום, תפקיד עסקי, קטלוג, ` +
      `שירות OData, תצוגת CDS והטרנזקציות ב-SAP GUI שכל יישום מחליף. זהו הצד של S/4HANA מול ` +
      `מסכי ה-ECC שבתיעוד הטכני.`,
    stats: [
      { v: FIORI_APPS.length, l: "יישומים", i: "layoutGrid" },
      { v: uniq(FIORI_APPS.flatMap((a) => a.guiTx)).length, l: "טרנזקציות GUI מוחלפות", i: "terminal" },
      { v: uniq(FIORI_APPS.map((a) => a.role)).length, l: "תפקידים עסקיים", i: "users" },
      { v: uniq(FIORI_APPS.map((a) => a.catalog)).length, l: "קטלוגים", i: "keyRound" },
      { v: count((r) => r.caps.includes("odata")), l: "עם שירות OData", i: "plug" },
      { v: count((r) => r.caps.includes("cds")), l: "עם תצוגת CDS", i: "sigma" },
      { v: count((r) => r.caps.includes("cloud")), l: "זמינים ב-S/4HANA Cloud", i: "appWindow" },
      { v: count((r) => r.s4.tone === "changed"), l: "נשענים על טבלה שמשתנה", i: "arrowLeft" },
    ],
    rows,
    mods: [...byMod.entries()].sort((a, b) => b[1] - a[1])
      .map(([id, n]) => ({ id, he: MOD_HE[id] ? `${id} · ${MOD_HE[id]}` : id, n })),
    kinds: [...byKind.entries()].sort((a, b) => b[1] - a[1]).map(([id, n]) => ({ id, he: id, n })),
    kindsLabel: "סוג יישום",
    caps: [
      { id: "onprem", he: "On-Premise", n: count((r) => r.caps.includes("onprem")) },
      { id: "cloud", he: "Public Cloud", n: count((r) => r.caps.includes("cloud")) },
      { id: "odata", he: "עם שירות OData", n: count((r) => r.caps.includes("odata")) },
      { id: "cds", he: "עם תצוגת CDS", n: count((r) => r.caps.includes("cds")) },
      { id: "errors", he: "תקלות מתועדות", n: count((r) => r.caps.includes("errors")) },
      { id: "cbc", he: "דוגמת יישום ב-CBC", n: count((r) => r.caps.includes("cbc")) },
    ].filter((c) => c.n > 0),
    groupLabel: "לפי תפקיד עסקי",
    rankLabel: "היקף הכיסוי",
    searchPlaceholder: "מזהה F · שם · תפקיד · קטלוג · OData · טרנזקציית GUI",
    foot:
      "מזהי היישומים, התפקידים והקטלוגים נלקחו מקובץ ה-Fiori של הפרויקט, המציין לכל רשומה את מקורה " +
      "ואת מועד הסקירה האחרון. מספרי SAP Note מופיעים רק כאשר הם קיימים ברשומה.",
    emptyNote:
      "החיפוש מתבצע על המזהה, השם בעברית ובאנגלית, התפקיד, הקטלוג, שירות ה-OData והטרנזקציות המוחלפות שבתיעוד.",
  };
}

/* ------------------------------------------------------------- the record */

export function fioriDetail(slug: string): RefDetail | null {
  const a = fioriApp(slug);
  if (!a) return null;
  const s4 = s4Of(a);

  /* --- S/4 plate ------------------------------------------------------- */
  const s4Facts: RefFact[] = [
    {
      label: "טרנזקציות SAP GUI שהיישום מחליף",
      codes: a.guiTx.length ? a.guiTx.map((c) => ({ t: c, href: txHref(c) })) : undefined,
      absent: "לא צוינה בתיעוד טרנזקציית SAP GUI מקבילה ליישום זה.",
    },
    { label: "המצב ב-ECC", text: clean(a.ecc), absent: "לא צוין בתיעוד מצב ECC ליישום זה." },
    {
      label: "זמינות",
      bullets: [
        `S/4HANA On-Premise: ${TRI_HE[a.s4OnPrem]}`,
        `S/4HANA Cloud: ${TRI_HE[a.cloud]}`,
        a.releaseInfo ? `גרסה: ${a.releaseInfo}` : "גרסה: לא צוין במאגר",
      ],
    },
  ];
  if (a.cds) {
    s4Facts.push({
      label: "תצוגת CDS",
      codes: cdsList(a).map((c) => ({ t: c, href: cdsHref(c) })),
    });
  }
  if (a.odata) s4Facts.push({ label: "שירות OData", codes: [{ t: a.odata }] });

  /* --- sections -------------------------------------------------------- */
  const sections: RefSection[] = [];

  sections.push({
    id: "what",
    icon: "layoutGrid",
    title: "תפקיד היישום",
    facts: [
      { label: "מטרה", text: a.purpose },
      { label: "הבעיה העסקית שהיישום פותר", text: a.problem },
      { label: "מיקום בתהליך", text: clean(a.process), absent: "לא צוין מיקום בתהליך ברשומה." },
      { label: "סוג יישום", text: TYPE_HE[a.type] || a.type },
    ],
  });

  sections.push({
    id: "explain",
    icon: "bookOpen",
    title: "הסבר בשלוש רמות",
    subs: [
      { title: "למשתמש העסקי", facts: [{ label: "הסבר בסיסי", text: a.explain.beginner }] },
      { title: "ליועץ", facts: [{ label: "נקודות מרכזיות", text: a.explain.consultant }] },
      { title: "למפתח", facts: [{ label: "מבנה טכני", text: a.explain.technical }] },
    ],
  });

  sections.push({
    id: "provision",
    icon: "keyRound",
    title: "הרשאות והקצאה",
    facts: [
      { label: "תפקיד עסקי (Business Role)", codes: a.role ? [{ t: a.role }] : undefined, absent: "לא צוין תפקיד ברשומה." },
      { label: "קטלוג עסקי (Business Catalog)", codes: a.catalog ? [{ t: a.catalog }] : undefined, absent: "לא צוין קטלוג ברשומה." },
      { label: "אובייקטי הרשאה", codes: a.authObjects?.length ? a.authObjects.map((x) => ({ t: x })) : undefined, absent: "לא צוינו אובייקטי הרשאה ברשומה." },
      { label: "נתיב Customizing", text: clean(a.spro), absent: "לא צוין נתיב SPRO ברשומה." },
    ],
  });

  const tech: RefFact[] = [
    {
      label: "טבלאות SAP שמאחורי היישום",
      codes: s4.tables.length ? s4.tables.map((t) => ({ t: t.name, href: t.href })) : undefined,
      absent: "לא צוינו טבלאות ברשומה.",
    },
  ];
  if (a.relatedObjects?.length) {
    tech.push({
      label: "אובייקטי פונקציה קשורים",
      codes: a.relatedObjects.map((o) => ({ t: o, href: bapiHref(o) })),
    });
  }
  sections.push({ id: "tech", icon: "plug", title: "טבלאות ואובייקטי פונקציה", facts: tech });

  const ops: RefFact[] = [];
  if (a.commonErrors?.length) ops.push({ label: "תקלות נפוצות", bullets: a.commonErrors });
  if (a.troubleshooting) ops.push({ label: "אבחון", text: a.troubleshooting });
  if (a.cbc) ops.push({ label: "יישום ב-CBC", text: a.cbc });
  if (ops.length) sections.push({ id: "ops", icon: "alertTriangle", title: "תפעול ותקלות", facts: ops });

  const cards: RefCard[] = (a.similar || []).map((s) => {
    const other = fioriApp(s);
    return {
      href: fioriHref(s),
      code: other?.id || s,
      he: other?.he || "",
      mod: other?.module,
      reason: "יישום קרוב לפי הרשומה",
    };
  });
  sections.push({
    id: "similar",
    icon: "gitBranch",
    title: "יישומים קרובים",
    note: cards.length ? `${nf.format(cards.length)} רשומות` : undefined,
    cards,
    empty: "לא צוינו יישומים קרובים ברשומה.",
  });

  const checks = [
    !!a.purpose, !!a.problem, !!a.process, !!a.role, !!a.catalog, !!a.odata, !!a.cds,
    a.guiTx.length > 0, !!(a.relatedTables || []).length, !!(a.relatedObjects || []).length,
    !!a.commonErrors?.length, !!a.releaseInfo, !!a.spro, !!a.cbc,
  ];

  const statuses: RefStatus[] = [TRUST[a.trust] || TRUST["needs-review"]];

  return {
    kind: "fiori-apps",
    eyebrow: `יישום Fiori · ${a.module}${MOD_HE[a.module] ? ` · ${MOD_HE[a.module]}` : ""}`,
    code: a.id,
    he: a.he,
    en: a.name,
    mod: a.module,
    modHe: MOD_HE[a.module] || "",
    chips: uniq([TYPE_HE[a.type] || a.type, a.lastReviewed ? `נסקר ${a.lastReviewed}` : ""]),
    statuses,
    completeness: completeness(checks.filter(Boolean).length, checks.length),
    s4: {
      tone: s4.tone,
      headline: s4.headline,
      statuses: [
        ...statuses,
        s4.critical.length
          ? { he: "נשען על טבלה שמשתנה מהותית", color: "var(--status-in-conversion)" }
          : { he: "חלופת S/4HANA למסך SAP GUI", color: "var(--status-done)" },
      ],
      facts: s4Facts,
      tables: s4.tables.length ? s4.tables : undefined,
    },
    sections,
    sources: uniq([a.source, ...(a.notes || []).map((n) => n.label)]),
    foot:
      "כל שדה בעמוד זה נלקח מרשומת היישום בקובץ ה-Fiori של הפרויקט, כולל רמת האמון והמקור שלה. " +
      "שדה ללא תיעוד מסומן במפורש.",
  };
}
