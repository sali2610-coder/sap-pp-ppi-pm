/* ============================================================================
   PROJECT NEO · /neo/bapi — BAPIs and Function Modules.
   ----------------------------------------------------------------------------
   Runs on the SERVER at build time. Reads lib/bapi-registry, which is already
   the project's ONE canonical registry for function objects (derived from the
   PM/PP-PI blueprints, then overlaid with the curated PM / PP-PI / sweep
   enrichment), plus data/function-intel for the deeply authored records.

   NOTHING IS INVENTED. Every sentence on the screen is a field of one of those
   two files. Where a field is missing the builder omits the fact, and where the
   silence is itself decision-relevant it emits `absent` so the screen can say
   `לא קיים מידע מאומת במאגר` in words.

   IDoc-classified objects (MATMAS, LOIPRO) live in the registry too, because the
   blueprint lists them next to the BAPIs on the same tables. They are excluded
   here and owned by /neo/idoc, so a message type has exactly one home.
   ========================================================================== */

import { FUNCTION_INTEL, type FunctionIntel } from "@/data/function-intel";
import { registry, type SapFuncObject } from "@/lib/bapi-registry";
import { commitInfo } from "@/lib/bapi-complexity";
import { MOD_HE } from "../mod-var";
import {
  bapiHref, cdsHref, clean, completeness, enhHref, idocHref, nf, standings,
  txHref, uniq,
} from "./ref-links";
import type {
  RefCard, RefDetail, RefDir, RefFact, RefRow, RefSection, RefStatus,
} from "./types";

/* ------------------------------------------------------------ vocabulary */

const CATEGORY_HE: Record<string, string> = {
  BusinessAPI: "ממשק עסקי (BAPI)",
  MasterData: "נתוני אב",
  Planning: "תכנון",
  Execution: "ביצוע והזמנות",
  Notification: "הודעות",
  Equipment: "ציוד ומיקומים פונקציונליים",
  Reservation: "שריונים (Reservation)",
  Confirmation: "אישורי ביצוע",
  GoodsMovement: "תנועות סחורה",
  Batch: "אצוות",
  BOM: "עצי מוצר",
  Status: "סטטוסים",
  TransactionControl: "בקרת טרנזקציה",
  Analytics: "אנליטיקה",
  General: "כללי",
};

const OP_HE: Record<string, string> = {
  Read: "קריאה", Create: "יצירה", Change: "שינוי", Delete: "מחיקה",
  Post: "רישום", Confirm: "אישור", Mixed: "מעורב", Unknown: "לא צוין",
};

const DIFF_HE: Record<string, string> = {
  Beginner: "מתחיל", Intermediate: "בינוני", Advanced: "מתקדם", Expert: "מומחה",
};

const STABILITY_HE: Record<string, string> = {
  Released: "ממשק משוחרר (Released)",
  "SAP-Recommended": "מומלץ על ידי SAP",
  Internal: "פנימי (Internal)",
  "Use-With-Caution": "לשימוש בזהירות (Use with caution)",
  Obsolete: "הוצא משימוש (Obsolete)",
};

const VERIF: Record<string, RefStatus> = {
  "verified-system": { he: "אומת במערכת SAP", color: "var(--status-done)" },
  "verified-docs": { he: "אומת מול תיעוד SAP", color: "var(--status-done)" },
  "requires-verification": { he: "נדרש אימות במערכת SAP", color: "var(--status-not-started)" },
  "version-dependent": { he: "תלוי גרסה", color: "var(--status-in-analysis)" },
  "internal-unsupported": { he: "מודול פונקציה פנימי: אינו ממשק נתמך", color: "var(--status-in-analysis)" },
  "invalid-name": { he: "השם אינו אובייקט SAP תקני", color: "var(--status-in-conversion)" },
  deprecated: { he: "הוצא משימוש", color: "var(--status-in-conversion)" },
};

const TRI_HE: Record<string, string> = { yes: "כן", no: "לא", unknown: "לא צוין במאגר" };

/* ------------------------------------------------------------- the objects */

let _rows: SapFuncObject[] | null = null;
/** The registry minus the IDoc message types, which /neo/idoc owns. */
function objects(): SapFuncObject[] {
  if (!_rows) _rows = registry().filter((o) => o.objectType !== "IDoc");
  return _rows;
}

export const bapiIds = (): string[] => objects().map((o) => o.id);
export const bapiObject = (id: string): SapFuncObject | undefined =>
  objects().find((o) => o.id === id);

const intelOf = (id: string): FunctionIntel | undefined => FUNCTION_INTEL[id];

const modsOf = (o: SapFuncObject): string[] =>
  uniq([o.primaryModule, ...(o.secondaryModules || [])]);

/* ----------------------------------------------------------- S/4 standing
   The rule, written once and applied to every record:

     changed  a STRUCTURED field says so — the registry marks the object
              Obsolete / deprecated, or explicitly not supported on S/4 on-prem
              or in the Cloud, or one of the classic tables it reads is a
              curated, verified HIGH-risk S/4 simplification (lib/s4).
     compare  the curated intel record stores an ECC statement and an S/4
              statement as a pair. Both are printed verbatim.
     stable   a structured field says the object is available on S/4.
     unknown  the project is silent. Said in words, never guessed. */

function s4Of(o: SapFuncObject) {
  const intel = intelOf(o.id);
  const tables = standings(o.tables);
  const critical = tables.filter((t) => t.critical);
  const structuralChange =
    o.stability === "Obsolete" ||
    o.verificationStatus === "deprecated" ||
    o.s4OnPremSupport === "no" ||
    o.cloudSupport === "no";

  const tone = structuralChange || critical.length
    ? "changed"
    : intel?.s4 && intel?.ecc
      ? "compare"
      : o.s4OnPremSupport === "yes"
        ? "stable"
        : "unknown";

  const headline =
    clean(intel?.s4) ||
    (structuralChange
      ? "לפי הרשומה, האובייקט אינו נתמך ב-S/4HANA או הוצא משימוש."
      : critical.length
        ? `האובייקט נשען על ${critical.map((t) => t.name).join(", ")}: טבלה שמשתנה מהותית ב-S/4HANA.`
        : o.s4OnPremSupport === "yes"
          ? "לפי הרשומה, האובייקט זמין ב-S/4HANA On-Premise."
          : "לא קיים תיעוד מאומת במאגר על מעמד האובייקט ב-S/4HANA.");

  return { tone, headline, tables, critical, intel };
}

/* --------------------------------------------------------------- the rows */

function rowOf(o: SapFuncObject): RefRow {
  const intel = intelOf(o.id);
  const s4 = s4Of(o);
  const mods = modsOf(o);
  const he = clean(o.shortDescriptionHe) || clean(intel?.what);
  const caps: string[] = [];
  if (intel) caps.push("deep");
  if (o.secondaryModules?.length) caps.push("cross");
  if (o.verificationStatus.startsWith("verified")) caps.push("verified");
  if (o.relatedCds?.length || intel?.related.cds?.length) caps.push("cds");
  if (commitInfo(o).value === "yes") caps.push("commit");

  const status: RefStatus =
    s4.tone === "changed"
      ? { he: "משתנה ב-S/4HANA", color: "var(--status-in-conversion)" }
      : s4.tone === "stable"
        ? { he: "זמין ב-S/4HANA", color: "var(--status-done)" }
        : s4.tone === "compare"
          ? { he: "קיימת הערת S/4HANA", color: "var(--status-in-analysis)" }
          : { he: "נדרש אימות נוסף", color: "var(--status-not-started)" };

  return {
    id: o.id,
    href: `/neo/bapi/${encodeURIComponent(o.id)}/`,
    name: o.technicalName,
    he,
    en: clean(o.shortDescriptionEn),
    mods,
    kind: o.objectType,
    group: CATEGORY_HE[o.category] || CATEGORY_HE.General,
    nums: [
      { i: "table", sr: "טבלאות מקושרות ", v: nf.format(o.tables.length) },
      { i: "terminal", sr: "טרנזקציות ", v: nf.format(o.transactions.length) },
      { i: "bookOpen", sr: "רמת מורכבות ", v: DIFF_HE[o.difficulty] || o.difficulty },
    ],
    s4: { tone: s4.tone as RefRow["s4"]["tone"], status, text: s4.headline },
    caps,
    rank: o.tables.length,
    hay: [
      o.technicalName, he, o.shortDescriptionEn, mods.join(" "), o.objectType,
      CATEGORY_HE[o.category], OP_HE[o.operationType], o.transactions.join(" "),
      o.tables.join(" "), (o.keywords || []).join(" "),
    ].join(" ").toLowerCase(),
  };
}

/* --------------------------------------------------------------- the page */

export function bapiDir(): RefDir {
  const all = objects();
  const rows = all.map(rowOf);

  const count = (fn: (r: RefRow) => boolean) => rows.filter(fn).length;
  const byMod = new Map<string, number>();
  for (const r of rows) for (const m of r.mods) byMod.set(m, (byMod.get(m) || 0) + 1);
  const byKind = new Map<string, number>();
  for (const r of rows) byKind.set(r.kind, (byKind.get(r.kind) || 0) + 1);

  return {
    id: "bapi",
    surface: "neo:bapi",
    eyebrow: "קטלוג BAPI ו-FM · Function Catalog",
    title: "BAPIs ומודולי פונקציה",
    icon: "plug",
    lede:
      `${nf.format(all.length)} אובייקטי פונקציה (BAPI ו-FM) מקטלוג הפרויקט: כל אחד מהם מתועד על טבלת SAP ` +
      `בתחזוקת מפעל (PM) או בתעשיות תהליכיות (PP-PI), או נוסף כרשומה מאומתת. לכל אובייקט מוצגים המודול, ` +
      `המשמעות, הטבלאות והטרנזקציות המקושרות ומעמדו ב-S/4HANA לפי התיעוד.`,
    stats: [
      { v: all.length, l: "אובייקטי פונקציה", i: "plug" },
      { v: byKind.get("BAPI") || 0, l: "BAPIs", i: "shieldCheck" },
      { v: byKind.get("FM") || 0, l: "מודולי פונקציה (FM)", i: "fileCode" },
      { v: count((r) => r.caps.includes("deep")), l: "מתועדים לעומק", i: "bookOpen" },
      { v: count((r) => r.caps.includes("verified")), l: "רשומות מאומתות", i: "shieldCheck" },
      { v: count((r) => r.caps.includes("cross")), l: "חוצי מודולים", i: "gitBranch" },
      { v: count((r) => r.s4.tone === "changed"), l: "משתנים ב-S/4HANA", i: "arrowLeft" },
      { v: count((r) => r.caps.includes("cds")), l: "עם תצוגת CDS מקבילה", i: "sigma" },
    ],
    rows,
    mods: [...byMod.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([id, n]) => ({ id, he: MOD_HE[id] ? `${id} · ${MOD_HE[id]}` : id, n })),
    kinds: [...byKind.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([id, n]) => ({ id, he: id, n })),
    kindsLabel: "סוג אובייקט",
    caps: [
      { id: "deep", he: "מתועד לעומק", n: count((r) => r.caps.includes("deep")) },
      { id: "verified", he: "רשומה מאומתת", n: count((r) => r.caps.includes("verified")) },
      { id: "cross", he: "חוצה מודולים", n: count((r) => r.caps.includes("cross")) },
      { id: "commit", he: "דורש COMMIT", n: count((r) => r.caps.includes("commit")) },
      { id: "cds", he: "עם תצוגת CDS מקבילה", n: count((r) => r.caps.includes("cds")) },
    ].filter((c) => c.n > 0),
    groupLabel: "לפי תחום עסקי",
    rankLabel: "מספר טבלאות מקושרות",
    searchPlaceholder: "שם טכני · משמעות · טבלה · טרנזקציה · מודול",
    foot:
      "הקטלוג נגזר מטבלאות SAP המתועדות של PM ו-PP-PI ומשכבות ההעשרה המאומתות של הפרויקט. אובייקט שלא אומת מול " +
      "SE37 או BAPI Explorer מסומן ככזה במפורש.",
    emptyNote:
      "החיפוש מתבצע על השם הטכני, המשמעות, המודול, הטבלאות והטרנזקציות של הרשומות בקטלוג.",
  };
}

/* ------------------------------------------------------------- the record */

export function bapiDetail(id: string): RefDetail | null {
  const o = bapiObject(id);
  if (!o) return null;

  const intel = intelOf(o.id);
  const s4 = s4Of(o);
  const ci = commitInfo(o);
  const mods = modsOf(o);

  /* --- S/4 plate ------------------------------------------------------- */
  const s4Facts: RefFact[] = [];
  if (intel?.s4) s4Facts.push({ label: "הערת S/4HANA ברשומה", text: intel.s4 });
  if (intel?.ecc) s4Facts.push({ label: "הערת ECC ברשומה", text: intel.ecc });
  s4Facts.push({
    label: "זמינות לפי הרשומה",
    bullets: [
      `ECC: ${TRI_HE[o.eccSupport]}`,
      `S/4HANA On-Premise: ${TRI_HE[o.s4OnPremSupport]}`,
      `S/4HANA Cloud: ${TRI_HE[o.cloudSupport]}`,
    ],
  });
  s4Facts.push({ label: "יציבות הממשק", text: STABILITY_HE[o.stability] || o.stability });
  const cdsNames = uniq([...(o.relatedCds || []), ...(intel?.related.cds || [])]);
  if (cdsNames.length) {
    s4Facts.push({
      label: "תצוגות CDS מקבילות",
      codes: cdsNames.map((c) => ({ t: c, href: cdsHref(c) })),
    });
  }
  const idocNames = uniq([...(o.relatedIdocs || []), ...(intel?.related.idocs || [])]);
  if (idocNames.length) {
    s4Facts.push({ label: "IDocs קשורים", codes: idocNames.map((c) => ({ t: c, href: idocHref(c) })) });
  }

  /* --- sections -------------------------------------------------------- */
  const sections: RefSection[] = [];

  const what: RefFact[] = [];
  if (intel?.what) what.push({ label: "תפקיד האובייקט", text: intel.what });
  else if (o.shortDescriptionHe) what.push({ label: "תפקיד האובייקט", text: o.shortDescriptionHe });
  if (intel?.why) what.push({ label: "מקרי שימוש", text: intel.why });
  if (o.businessScenario) what.push({ label: "תרחיש עסקי", text: o.businessScenario });
  if (intel?.flow || o.processChain?.length) {
    what.push({ label: "מיקום בתהליך", text: clean(intel?.flow), bullets: o.processChain });
  }
  what.push({ label: "סוג פעולה", text: OP_HE[o.operationType] });
  if (intel?.processArea || o.businessProcess) {
    what.push({ label: "תחום תהליכי", text: clean(intel?.processArea) || clean(o.businessProcess) });
  }
  if (o.usageContexts?.length) what.push({ label: "הקשרי שימוש", bullets: o.usageContexts });
  sections.push({ id: "what", icon: "plug", title: "תפקיד ושימוש", facts: what });

  /* parameters + call contract */
  const contract: RefFact[] = [];
  if (intel?.inputs.length) {
    contract.push({
      label: "פרמטרים נכנסים",
      bullets: intel.inputs.map((p) => `${p.name}${p.req ? " (חובה)" : ""}: ${p.he}`),
    });
  }
  if (intel?.outputs.length) {
    contract.push({
      label: "פרמטרים יוצאים",
      bullets: intel.outputs.map((p) => `${p.name}: ${p.he}`),
    });
  }
  if (o.parameterSummary) contract.push({ label: "תקציר פרמטרים", text: o.parameterSummary });
  contract.push({
    label: "COMMIT",
    text: ci.value === "unknown"
      ? "לא צוין במאגר"
      : `${TRI_HE[ci.value]}${ci.derived ? " (נגזר מסוג הפעולה, ללא רשומה מפורשת)" : ""}`,
  });
  if (o.requiresSave && o.requiresSave !== "unknown") {
    contract.push({ label: "נדרשת קריאת SAVE", text: TRI_HE[o.requiresSave] });
  }
  if (o.remoteEnabled && o.remoteEnabled !== "unknown") {
    contract.push({ label: "Remote-Enabled (RFC)", text: TRI_HE[o.remoteEnabled] });
  }
  if (o.sequence?.length) contract.push({ label: "רצף קריאה", steps: o.sequence });
  if (o.codeAbap) contract.push({ label: "שלד ABAP", pre: o.codeAbap });
  if (contract.length) {
    sections.push({ id: "contract", icon: "fileCode", title: "ממשק הקריאה והפרמטרים", facts: contract });
  }

  /* objects and tables */
  const objFacts: RefFact[] = [];
  if (o.businessObject) objFacts.push({ label: "אובייקט עסקי (BOR)", codes: [{ t: o.businessObject }] });
  objFacts.push({
    label: "טבלאות SAP מקושרות",
    codes: o.tables.length
      ? standings(o.tables).map((t) => ({ t: t.name, href: t.href }))
      : undefined,
    absent: "לא קיימת בתיעוד טבלת SAP המקושרת לאובייקט זה.",
  });
  objFacts.push({
    label: "טרנזקציות",
    codes: o.transactions.length
      ? o.transactions.map((c) => ({ t: c, href: txHref(c) }))
      : undefined,
    absent: "לא קיימת בתיעוד טרנזקציה המקושרת לאובייקט זה.",
  });
  if (o.authObjects?.length) {
    objFacts.push({ label: "אובייקטי הרשאה", codes: o.authObjects.map((a) => ({ t: a })) });
  }
  if (intel?.related.tcodes?.length) {
    objFacts.push({
      label: "טרנזקציות ברשומה המורחבת",
      codes: intel.related.tcodes.map((c) => ({ t: c, href: txHref(c) })),
    });
  }
  sections.push({ id: "objects", icon: "boxes", title: "אובייקטים, טבלאות וטרנזקציות", facts: objFacts });

  /* operating it */
  const ops: RefFact[] = [];
  if (o.checklist?.length) ops.push({ label: "בדיקות מקדימות", bullets: o.checklist });
  if (intel?.qa.deps.length) ops.push({ label: "תלויות", bullets: intel.qa.deps });
  if (intel?.qa.test.length) ops.push({ label: "נקודות לבדיקה", bullets: intel.qa.test });
  if (intel?.qa.scenario) ops.push({ label: "תרחיש בדיקה", text: intel.qa.scenario });
  if (ops.length) sections.push({ id: "ops", icon: "workflow", title: "הפעלה ובדיקה", facts: ops });

  /* trouble */
  const trouble: RefFact[] = [];
  const errs = uniq([...(o.commonErrors || []), ...(o.troubleshooting?.errors || []), ...(intel?.qa.failures || [])]);
  if (errs.length) trouble.push({ label: "שגיאות נפוצות", bullets: errs });
  if (o.commonMistakes?.length) trouble.push({ label: "טעויות מימוש", bullets: o.commonMistakes });
  if (o.troubleshooting?.causes?.length) trouble.push({ label: "סיבות שורש", bullets: o.troubleshooting.causes });
  if (o.troubleshooting?.debug) trouble.push({ label: "אבחון", text: o.troubleshooting.debug });
  if (o.troubleshooting?.tables?.length) {
    trouble.push({
      label: "טבלאות לאבחון",
      codes: o.troubleshooting.tables.map((t) => ({ t, href: null })),
    });
  }
  if (trouble.length) {
    sections.push({ id: "trouble", icon: "alertTriangle", title: "תקלות ואבחון", facts: trouble });
  }

  /* complexity */
  if (o.complexity) {
    sections.push({
      id: "complexity",
      icon: "bookOpen",
      title: "מורכבות מימוש",
      note: DIFF_HE[o.complexity.difficulty] || o.complexity.difficulty,
      facts: [
        { label: "רמה", text: DIFF_HE[o.complexity.difficulty] || o.complexity.difficulty },
        { label: "נימוקים", bullets: o.complexity.reasons },
        {
          label: "זמן לימוד מוערך",
          text: `${o.complexity.learnMinutes[0]}-${o.complexity.learnMinutes[1]} דקות (לפי מודל המורכבות של הפרויקט).`,
        },
      ],
    });
  }

  /* related records — only ones with a generated page */
  const cards: RefCard[] = [];
  for (const rel of uniq(o.relatedObjects)) {
    const href = bapiHref(rel);
    const other = bapiObject(rel);
    cards.push({
      href,
      code: rel,
      he: clean(other?.shortDescriptionHe) || clean(FUNCTION_INTEL[rel]?.what),
      mod: other?.primaryModule,
      reason: "אובייקט קשור לפי הרשומה",
    });
  }
  for (const e of uniq(o.relatedEnhancements)) {
    cards.push({ href: enhHref(e), code: e, he: "", reason: "הרחבה קשורה" });
  }
  sections.push({
    id: "related",
    icon: "gitBranch",
    title: "אובייקטים קשורים",
    note: cards.length ? `${nf.format(cards.length)} רשומות` : undefined,
    cards,
    empty: "לא קיים תיעוד מאומת במאגר על אובייקטים קשורים לרשומה זו.",
  });

  /* reading */
  if (o.recommendedReading?.length) {
    sections.push({
      id: "reading",
      icon: "bookOpen",
      title: "קריאה נוספת",
      facts: [{ label: "מקורות שהרשומה מפנה אליהם", bullets: o.recommendedReading }],
    });
  }

  /* --- completeness: counted, not targeted ----------------------------- */
  const checks = [
    !!clean(o.shortDescriptionHe) || !!intel,
    !!intel?.why,
    o.tables.length > 0,
    o.transactions.length > 0,
    !!intel?.inputs.length,
    !!intel?.outputs.length,
    o.eccSupport !== "unknown",
    o.s4OnPremSupport !== "unknown",
    o.cloudSupport !== "unknown",
    !!o.businessObject,
    !!o.authObjects?.length,
    !!errs.length,
  ];

  const statuses: RefStatus[] = [VERIF[o.verificationStatus] || VERIF["requires-verification"]];
  if (intel) statuses.push({ he: "מתועד לעומק", color: "var(--status-done)" });

  return {
    kind: "bapi",
    eyebrow: `${o.objectType} · ${mods.join(" · ")}`,
    code: o.technicalName,
    he: clean(o.shortDescriptionHe) || clean(intel?.what) || "",
    en: clean(o.shortDescriptionEn),
    enAbsent: "לא קיים תיאור באנגלית ברשומה",
    mod: o.primaryModule,
    modHe: MOD_HE[o.primaryModule] || "",
    chips: uniq([
      CATEGORY_HE[o.category],
      OP_HE[o.operationType],
      DIFF_HE[o.difficulty],
      o.aliases.length ? `${nf.format(o.aliases.length)} שמות חלופיים במקור` : "",
    ]),
    statuses,
    completeness: completeness(checks.filter(Boolean).length, checks.length),
    s4: {
      tone: s4.tone as RefDetail["s4"]["tone"],
      headline: s4.headline,
      statuses: [
        VERIF[o.verificationStatus] || VERIF["requires-verification"],
        {
          he: s4.tone === "changed" ? "משתנה ב-S/4HANA"
            : s4.tone === "stable" ? "זמין ב-S/4HANA"
              : s4.tone === "compare" ? "קיימת הערת S/4HANA ברשומה"
                : "לא קיימת הערת S/4HANA במאגר",
          color: s4.tone === "changed" ? "var(--status-in-conversion)"
            : s4.tone === "stable" ? "var(--status-done)"
              : s4.tone === "compare" ? "var(--status-in-analysis)"
                : "var(--status-not-started)",
        },
      ],
      facts: s4Facts,
      tables: s4.tables.length ? s4.tables : undefined,
      warn: s4.tone === "unknown"
        ? "לא קיים תיעוד מאומת במאגר על מעמד האובייקט ב-S/4HANA. נדרש אימות נוסף מול SE37, BAPI Explorer או תיעוד SAP לפני החלטת מעבר."
        : undefined,
    },
    sections,
    sources: uniq([o.verificationSource, o.lastVerified ? `נבדק לאחרונה ${o.lastVerified}` : ""]),
    foot:
      "כל שדה בעמוד זה נלקח מקטלוג הפרויקט ומשכבת ההעשרה המאומתת שלו. שדה ללא תיעוד אינו מוצג, או מסומן " +
      "«לא קיים תיעוד מאומת במאגר». מספרי SAP Note מופיעים רק כאשר הם קיימים ברשומה עצמה.",
  };
}
