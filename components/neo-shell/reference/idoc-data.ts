/* ============================================================================
   PROJECT NEO · /neo/idoc — IDoc message types, and the IDoc reference itself.
   ----------------------------------------------------------------------------
   Runs on the SERVER at build time. lib/idoc-intel is already the project's
   honest accessor over the curated `idoc` integration record: the three physical
   records, the seven status codes it really documents, and the message types
   that actually appear in the PM / PP-PI blueprints.

   THE HONEST PART OF THIS DIRECTORY IS ITS SIZE.
   The project documents exactly TWO IDoc message types, because exactly two are
   named on a documented table. The directory says so out loud instead of padding
   the list with plausible SAP basic types — a short, true list beats a long,
   invented one. What the project DOES know deeply about IDocs — the anatomy and
   the status reference — is rendered under the list as its own reference block,
   which is why this is the one directory that passes `children` to the surface.
   ========================================================================== */

import { FUNCTION_INTEL, type FunctionIntel } from "@/data/function-intel";
import { IDOC, IDOC_RECORDS, IDOC_STATUSES, idocMessageTypes } from "@/lib/idoc-intel";
import { funcIntel } from "@/lib/object-intel";
import { MOD_HE } from "../mod-var";
import {
  bapiHref, cdsHref, clean, completeness, nf, objectHref, standings, txHref, uniq,
} from "./ref-links";
import type { RefCard, RefDetail, RefDir, RefFact, RefRow, RefSection, RefStatus } from "./types";

export const idocNames = (): string[] => idocMessageTypes();

const intelOf = (name: string): FunctionIntel | undefined => FUNCTION_INTEL[name];

interface IdocRecordData {
  name: string;
  he: string;
  module: string;
  intel?: FunctionIntel;
  tables: string[];
  tcodes: string[];
}

function recordOf(name: string): IdocRecordData | null {
  const fi = funcIntel(name);
  const intel = intelOf(name);
  if (!fi && !intel) return null;
  return {
    name,
    he: clean(fi?.he) || clean(intel?.what),
    module: intel?.module || fi?.modules[0] || "",
    intel,
    tables: uniq([...(fi?.tables || []).map((t) => t.name), ...(intel?.related.tables || [])]),
    tcodes: uniq(intel?.related.tcodes || []),
  };
}

/* --------------------------------------------------------------- the rows */

function rowOf(r: IdocRecordData): RefRow {
  const tables = standings(r.tables);
  const critical = tables.filter((t) => t.critical);
  const tone: RefRow["s4"]["tone"] = critical.length
    ? "changed"
    : r.intel?.s4 && r.intel?.ecc ? "compare" : "unknown";
  const text = critical.length
    ? `סוג ההודעה נשען על ${critical.map((t) => t.name).join(", ")}: טבלה שמשתנה מהותית ב-S/4HANA.`
    : clean(r.intel?.s4) || "לא קיים תיעוד מאומת במאגר על מעמד סוג ההודעה ב-S/4HANA.";

  const caps: string[] = [];
  if (r.intel) caps.push("deep");
  if (r.intel?.related.cds?.length) caps.push("cds");
  if (critical.length) caps.push("impact");

  return {
    id: r.name,
    href: `/neo/idoc/${encodeURIComponent(r.name)}/`,
    name: r.name,
    he: r.he,
    en: "",
    mods: r.module ? [r.module] : [],
    kind: "Message Type",
    group: clean(r.intel?.processArea) || "ללא תחום תהליכי במאגר",
    nums: [
      { i: "table", sr: "טבלאות מקושרות ", v: nf.format(r.tables.length) },
      { i: "terminal", sr: "טרנזקציות ", v: nf.format(r.tcodes.length) },
    ],
    s4: {
      tone,
      status: critical.length
        ? { he: "נשען על טבלה שמשתנה", color: "var(--status-in-conversion)" }
        : r.intel?.s4
          ? { he: "קיימת הערת S/4HANA", color: "var(--status-in-analysis)" }
          : { he: "נדרש אימות נוסף", color: "var(--status-not-started)" },
      text,
    },
    caps,
    rank: r.tables.length,
    hay: [r.name, r.he, r.module, r.tables.join(" "), r.tcodes.join(" "), r.intel?.what, r.intel?.why]
      .filter(Boolean).join(" ").toLowerCase(),
  };
}

/* --------------------------------------------------------------- the page */

export function idocDir(): RefDir {
  const records = idocNames().map(recordOf).filter(Boolean) as IdocRecordData[];
  const rows = records.map(rowOf);
  const count = (fn: (r: RefRow) => boolean) => rows.filter(fn).length;
  const byMod = new Map<string, number>();
  for (const r of rows) for (const m of r.mods) byMod.set(m, (byMod.get(m) || 0) + 1);

  return {
    id: "idoc",
    surface: "neo:idoc",
    eyebrow: "קטלוג IDoc · IDoc Catalog",
    title: "IDocs",
    icon: "cable",
    lede:
      `${nf.format(rows.length)} סוגי הודעת IDoc המתועדים על טבלאות SAP בתחזוקת מפעל (PM) ובתעשיות ` +
      `תהליכיות (PP-PI). מתחת לרשימה מוצג התיעוד המשותף לכל סוגי ההודעה: מבנה ה-IDoc, קודי הסטטוס ` +
      `וטרנזקציות הניטור.`,
    stats: [
      { v: rows.length, l: "סוגי הודעה במאגר", i: "cable" },
      { v: IDOC_RECORDS.length, l: "רשומות פיזיות", i: "database" },
      { v: IDOC_STATUSES.length, l: "קודי סטטוס מתועדים", i: "shieldCheck" },
      { v: IDOC.monitoring.length, l: "טרנזקציות ניטור", i: "terminal" },
      { v: uniq(rows.flatMap((r) => r.mods)).length, l: "מודולים", i: "boxes" },
    ],
    rows,
    mods: [...byMod.entries()].sort((a, b) => b[1] - a[1])
      .map(([id, n]) => ({ id, he: MOD_HE[id] ? `${id} · ${MOD_HE[id]}` : id, n })),
    kinds: [],
    kindsLabel: "סוג רשומה",
    caps: [
      { id: "deep", he: "מתועד לעומק", n: count((r) => r.caps.includes("deep")) },
      { id: "cds", he: "עם תצוגת CDS מקבילה", n: count((r) => r.caps.includes("cds")) },
      { id: "impact", he: "נשען על טבלה מושפעת", n: count((r) => r.caps.includes("impact")) },
    ].filter((c) => c.n > 0),
    groupLabel: "לפי תחום תהליכי",
    rankLabel: "מספר טבלאות מקושרות",
    searchPlaceholder: "סוג הודעה · משמעות · טבלה · טרנזקציה",
    foot:
      "הרשומות הפיזיות, קודי הסטטוס וטרנזקציות הניטור נלקחו כלשונם מרשומת האינטגרציה המאומתת של הפרויקט.",
    emptyNote:
      "המאגר מתעד מספר קטן של סוגי הודעה, ולכן ייתכן שחיפוש לא יחזיר תוצאות.",
  };
}

/* --------------------------------- the reference block under the list ----
   Rendered by app/neo/idoc/page.tsx as the surface's children. It is data, not
   navigation: no control, no link, nothing that pretends to be clickable. */

export interface IdocReference {
  records: { table: string; he: string; role: string; href: string | null }[];
  statuses: { code: string; dir: string; he: string; cause: string; fix: { t: string; href: string | null }[] }[];
  monitoring: { t: string; what: string; href: string | null }[];
  architecture: string;
  flow: string[];
}

export function idocReference(): IdocReference {
  return {
    architecture: IDOC.architecture,
    flow: IDOC.flow,
    records: IDOC_RECORDS.map((r) => ({
      table: r.table, he: r.he, role: r.role, href: objectHref(r.table),
    })),
    statuses: IDOC_STATUSES.map((s) => ({
      code: s.code,
      dir: s.dir === "in" ? "נכנס" : "יוצא",
      he: s.he,
      cause: s.cause,
      fix: s.fix.map((t) => ({ t, href: txHref(t) })),
    })),
    monitoring: IDOC.monitoring.map((m) => ({ t: m.t, what: m.what, href: txHref(m.t) })),
  };
}

/* ------------------------------------------------------------- the record */

export function idocDetail(name: string): RefDetail | null {
  const r = recordOf(name);
  if (!r) return null;
  const intel = r.intel;
  const tables = standings(r.tables);
  const critical = tables.filter((t) => t.critical);

  const tone: RefDetail["s4"]["tone"] = critical.length
    ? "changed"
    : intel?.s4 && intel?.ecc ? "compare" : "unknown";

  const headline = critical.length
    ? `סוג ההודעה נשען על ${critical.map((t) => t.name).join(", ")}: טבלה שמשתנה מהותית ב-S/4HANA.`
    : clean(intel?.s4) || "לא קיים תיעוד מאומת במאגר על מעמד סוג ההודעה ב-S/4HANA.";

  const s4Facts: RefFact[] = [
    { label: "הערת S/4HANA ברשומה", text: clean(intel?.s4), absent: "לא קיימת הערת S/4HANA ברשומה לסוג הודעה זה." },
    { label: "הערת ECC ברשומה", text: clean(intel?.ecc), absent: "לא קיימת הערת ECC ברשומה לסוג הודעה זה." },
  ];
  if (intel?.related.cds?.length) {
    s4Facts.push({
      label: "תצוגות CDS מקבילות",
      codes: intel.related.cds.map((c) => ({ t: c, href: cdsHref(c) })),
    });
  }

  const sections: RefSection[] = [];

  sections.push({
    id: "what",
    icon: "cable",
    title: "תפקיד סוג ההודעה",
    facts: [
      { label: "תיאור", text: clean(intel?.what) || r.he },
      { label: "הקשר עסקי", text: clean(intel?.why), absent: "לא צוין הקשר עסקי ברשומה." },
      { label: "תחום תהליכי", text: clean(intel?.processArea), absent: "לא צוין תחום ברשומה." },
      { label: "זרימה", text: clean(intel?.flow), absent: "לא צוינה זרימה ברשומה." },
    ],
  });

  if (intel?.inputs.length || intel?.outputs.length) {
    sections.push({
      id: "payload",
      icon: "fileCode",
      title: "מבנה ההודעה",
      facts: [
        ...(intel.inputs.length ? [{
          label: "סגמנטים / קלט",
          bullets: intel.inputs.map((p) => `${p.name}: ${p.he}`),
        }] : []),
        ...(intel.outputs.length ? [{
          label: "פלט וסטטוס",
          bullets: intel.outputs.map((p) => `${p.name}: ${p.he}`),
        }] : []),
      ],
    });
  }

  sections.push({
    id: "objects",
    icon: "boxes",
    title: "טבלאות וטרנזקציות",
    facts: [
      {
        label: "טבלאות SAP מקושרות",
        codes: tables.length ? tables.map((t) => ({ t: t.name, href: t.href })) : undefined,
        absent: "לא קיימת בתיעוד טבלת SAP המקושרת לסוג הודעה זה.",
      },
      {
        label: "טרנזקציות",
        codes: r.tcodes.length ? r.tcodes.map((c) => ({ t: c, href: txHref(c) })) : undefined,
        absent: "לא קיימת בתיעוד טרנזקציה המקושרת לסוג הודעה זה.",
      },
    ],
  });

  if (intel?.qa) {
    sections.push({
      id: "ops",
      icon: "workflow",
      title: "הפעלה ובדיקה",
      facts: [
        { label: "נקודות לבדיקה", bullets: intel.qa.test },
        { label: "תלויות", bullets: intel.qa.deps },
        { label: "תרחיש בדיקה", text: intel.qa.scenario },
      ],
    });
    sections.push({
      id: "trouble",
      icon: "alertTriangle",
      title: "כשלים נפוצים",
      facts: [{ label: "כשלים מתועדים", bullets: intel.qa.failures }],
    });
  }

  // The status reference is the same verified table the directory renders, but
  // filtered to nothing here: it is not per-message-type data, so it is NOT
  // duplicated onto the record. The record links back to it instead.
  const cards: RefCard[] = tables
    .filter((t) => t.href)
    .map((t) => ({ href: t.href, code: t.name, he: t.he, reason: "טבלה שההודעה כותבת אליה או קוראת ממנה" }));
  const relatedFuncs = uniq(intel?.related.tcodes || []);
  if (cards.length) {
    sections.push({
      id: "related",
      icon: "gitBranch",
      title: "אובייקטים קשורים",
      note: `${nf.format(cards.length)} טבלאות`,
      cards,
    });
  }
  if (relatedFuncs.length) {
    // BAPI counterparts, only where the project really generates a page.
    const fnCards: RefCard[] = uniq(Object.keys(FUNCTION_INTEL))
      .filter((k) => (FUNCTION_INTEL[k].related.idocs || []).includes(r.name))
      .map((k) => ({ href: bapiHref(k), code: k, he: FUNCTION_INTEL[k].what, reason: "אובייקט פונקציה שרשומתו מפנה לסוג ההודעה" }));
    if (fnCards.length) {
      sections.push({ id: "funcs", icon: "plug", title: "אובייקטי פונקציה קשורים", cards: fnCards });
    }
  }

  const checks = [
    !!r.he, !!intel?.what, !!intel?.why, !!intel?.flow, !!intel?.inputs.length,
    !!intel?.outputs.length, !!intel?.ecc, !!intel?.s4, r.tables.length > 0,
    r.tcodes.length > 0, !!intel?.qa.test.length, !!intel?.qa.failures.length,
  ];

  const statuses: RefStatus[] = [
    intel
      ? { he: "מתועד לעומק", color: "var(--status-done)" }
      : { he: "רשומת קישור בלבד", color: "var(--status-not-started)" },
  ];
  if (intel?.inferred) statuses.push({ he: "תלוי גרסה: נדרש אימות נוסף", color: "var(--status-in-analysis)" });

  return {
    kind: "idoc",
    eyebrow: `IDoc Message Type${r.module ? ` · ${r.module}` : ""}`,
    code: r.name,
    he: clean(intel?.what) || r.he,
    en: "",
    mod: r.module,
    modHe: MOD_HE[r.module] || "",
    chips: uniq([clean(intel?.processArea)]),
    statuses,
    completeness: completeness(checks.filter(Boolean).length, checks.length),
    s4: {
      tone,
      headline,
      statuses: [
        ...statuses,
        critical.length
          ? { he: "נשען על טבלה שמשתנה", color: "var(--status-in-conversion)" }
          : intel?.s4
            ? { he: "קיימת הערת S/4HANA ברשומה", color: "var(--status-in-analysis)" }
            : { he: "לא קיימת הערת S/4HANA במאגר", color: "var(--status-not-started)" },
      ],
      facts: s4Facts,
      tables: tables.length ? tables : undefined,
      warn: tone === "unknown"
        ? "לא קיים תיעוד מאומת במאגר על מעמד סוג ההודעה ב-S/4HANA. נדרש אימות נוסף במערכת SAP (WE30, WE20 או תיעוד ALE) לפני החלטת מעבר."
        : undefined,
    },
    sections,
    sources: [],
    foot:
      "הרשומה נבנתה מהתיעוד המאומת של הפרויקט על אובייקטי פונקציה ו-IDoc. מבנה ה-IDoc וקודי הסטטוס " +
      "משותפים לכל סוגי ההודעה ומוצגים בעמוד קטלוג IDoc.",
  };
}
