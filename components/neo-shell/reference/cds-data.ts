/* ============================================================================
   PROJECT NEO · /neo/cds — the S/4HANA CDS views.
   ----------------------------------------------------------------------------
   Runs on the SERVER at build time. Two curated project files, joined by view
   name and nothing else:

     data/cds-map.ts         view · Hebrew purpose · module · the CLASSIC ECC
                             tables it virtualises · consumption view · Fiori app
     data/cds-enrichment.ts  VDM view type, deep purpose, representative key,
                             associations, annotations, performance notes, the
                             ABAP SELECT and the ECC alternative

   THIS DIRECTORY IS THE S/4HANA WORLD, so §2 is not a badge bolted on: the whole
   record IS the S/4 answer. The plate at the top therefore always names the
   classic ECC objects the view stands in front of, and each of those tables is
   printed with ITS OWN S/4 standing, resolved by lib/s4 — so a view sitting on a
   table that materially changes (MSEG, MKPF, MARA …) says so, loudly, and a view
   sitting on a stable table does not pretend to be dramatic.
   ========================================================================== */

import { CDS_VIEWS, type CdsView } from "@/data/cds-map";
import { CDS_ENRICHMENT, type CdsEnrichment } from "@/data/cds-enrichment";
import { FIORI_APPS } from "@/data/fiori/apps";
import { registry } from "@/lib/bapi-registry";
import { zoneOf } from "@/lib/studio-graph";
import { ZONE_HE } from "../erd/model";
import { MOD_HE } from "../mod-var";
import {
  bapiHref, cdsHref, clean, completeness, fioriHref, nf, standings, uniq,
} from "./ref-links";
import type { RefCard, RefDetail, RefDir, RefFact, RefRow, RefSection, RefStatus } from "./types";

const VIEW_TYPE_HE: Record<string, string> = {
  "Interface (Basic)": "Interface · בסיסי",
  "Interface (Composite)": "Interface · מורכב",
  Consumption: "Consumption",
  Analytical: "Analytical",
};

export const cdsNames = (): string[] => CDS_VIEWS.map((v) => v.view);
export const cdsView = (name: string): CdsView | undefined =>
  CDS_VIEWS.find((v) => v.view.toLowerCase() === name.toLowerCase());

const enrichOf = (view: string): CdsEnrichment | undefined => CDS_ENRICHMENT[view];

/** The function objects whose record names this view. Read, never inferred. */
const funcsFor = (view: string) =>
  registry().filter((o) => (o.relatedCds || []).includes(view));

/** The Fiori apps whose curated `cds` field names this view. The field is a free
 *  string in the source ("I_Equipment / I_FunctionalLocation"), so it is split on
 *  the separators the data really uses rather than matched loosely. */
const appsFor = (view: string) =>
  FIORI_APPS.filter((a) =>
    (a.cds || "").split(/[\s/,]+/).map((x) => x.trim()).includes(view));

const kindOf = (v: CdsView): string =>
  VIEW_TYPE_HE[enrichOf(v.view)?.viewType || ""] || "לא צוין במאגר";

/* ----------------------------------------------------------- S/4 standing */

function s4Of(v: CdsView) {
  const tables = standings(v.tables);
  const critical = tables.filter((t) => t.critical);
  const impacted = tables.filter((t) => t.impacted);
  const tone: RefRow["s4"]["tone"] = critical.length ? "changed" : "replacement";
  const headline = critical.length
    ? `התצוגה יושבת מעל ${critical.map((t) => t.name).join(", ")}: טבלה שמשתנה מהותית ב-S/4HANA.`
    : `שכבת ה-VDM של S/4HANA מעל ${v.tables.join(", ")}.`;
  return { tables, critical, impacted, tone, headline };
}

/* --------------------------------------------------------------- the rows */

function rowOf(v: CdsView): RefRow {
  const e = enrichOf(v.view);
  const s4 = s4Of(v);
  const caps: string[] = [];
  if (e) caps.push("deep");
  if (v.consumption) caps.push("consumption");
  if (v.fiori || appsFor(v.view).length) caps.push("fiori");
  if (e?.abapConsumption) caps.push("abap");
  if (s4.impacted.length) caps.push("impact");

  return {
    id: v.view,
    href: `/neo/cds/${encodeURIComponent(v.view)}/`,
    name: v.view,
    he: v.he,
    en: "",
    mods: [v.module],
    kind: kindOf(v),
    group: ZONE_HE[zoneOf(v.tables[0] || "")] || "ללא מחלקה",
    nums: [
      { i: "table", sr: "טבלאות קלאסיות ", v: nf.format(v.tables.length) },
      { i: "gitBranch", sr: "אסוציאציות ", v: nf.format(e?.associations?.length || 0) },
      { i: "appWindow", sr: "אפליקציות Fiori ", v: nf.format(appsFor(v.view).length + (v.fiori ? 1 : 0)) },
    ],
    s4: {
      tone: s4.tone,
      status: s4.critical.length
        ? { he: "מעל טבלה שמשתנה", color: "var(--status-in-conversion)" }
        : { he: "שכבת S/4 מעל ECC", color: "var(--status-done)" },
      text: s4.headline,
    },
    caps,
    rank: v.tables.length,
    hay: [v.view, v.he, v.module, v.tables.join(" "), v.consumption, v.fiori, e?.purposeDeep, e?.keyField]
      .filter(Boolean).join(" ").toLowerCase(),
  };
}

/* --------------------------------------------------------------- the page */

export function cdsDir(): RefDir {
  const rows = CDS_VIEWS.map(rowOf);
  const count = (fn: (r: RefRow) => boolean) => rows.filter(fn).length;
  const byMod = new Map<string, number>();
  for (const r of rows) for (const m of r.mods) byMod.set(m, (byMod.get(m) || 0) + 1);
  const byKind = new Map<string, number>();
  for (const r of rows) byKind.set(r.kind, (byKind.get(r.kind) || 0) + 1);

  return {
    id: "cds",
    surface: "neo:cds",
    eyebrow: "עיון · Reference",
    title: "תצוגות CDS",
    icon: "sigma",
    lede:
      `${nf.format(CDS_VIEWS.length)} תצוגות CDS משוחררות שהפרויקט מיפה אל הטבלאות הקלאסיות שהן מחליפות. ` +
      `זהו הצד של S/4HANA במילון: כל שורה אומרת איזו טבלת ECC היא מכסה, איזו שכבת Consumption יושבת מעליה ` +
      `ואיזו אפליקציית Fiori צורכת אותה: ומה מעמד הטבלה הקלאסית עצמה במעבר.`,
    stats: [
      { v: CDS_VIEWS.length, l: "תצוגות CDS", i: "sigma" },
      { v: uniq(CDS_VIEWS.flatMap((v) => v.tables)).length, l: "טבלאות קלאסיות מכוסות", i: "table" },
      { v: count((r) => r.caps.includes("deep")), l: "עם רשומת העשרה", i: "bookOpen" },
      { v: count((r) => r.caps.includes("consumption")), l: "עם שכבת Consumption", i: "layoutGrid" },
      { v: count((r) => r.caps.includes("fiori")), l: "עם אפליקציית Fiori", i: "appWindow" },
      { v: count((r) => r.caps.includes("abap")), l: "עם דוגמת ABAP", i: "fileCode" },
      { v: CDS_VIEWS.filter((v) => (CDS_ENRICHMENT[v.view]?.associations?.length || 0) > 0).length, l: "עם אסוציאציות מתועדות", i: "gitBranch" },
      { v: count((r) => r.s4.tone === "changed"), l: "מעל טבלה שמשתנה ב-S/4", i: "arrowLeft" },
    ],
    rows,
    mods: [...byMod.entries()].sort((a, b) => b[1] - a[1])
      .map(([id, n]) => ({ id, he: MOD_HE[id] ? `${id} · ${MOD_HE[id]}` : id, n })),
    kinds: [...byKind.entries()].sort((a, b) => b[1] - a[1]).map(([id, n]) => ({ id, he: id, n })),
    kindsLabel: "סוג תצוגה (VDM)",
    caps: [
      { id: "deep", he: "רשומת העשרה מלאה", n: count((r) => r.caps.includes("deep")) },
      { id: "consumption", he: "יש Consumption", n: count((r) => r.caps.includes("consumption")) },
      { id: "fiori", he: "יש Fiori", n: count((r) => r.caps.includes("fiori")) },
      { id: "abap", he: "יש דוגמת ABAP", n: count((r) => r.caps.includes("abap")) },
      { id: "impact", he: "מעל טבלה מושפעת", n: count((r) => r.caps.includes("impact")) },
    ].filter((c) => c.n > 0),
    groupLabel: "לפי מחלקת אובייקט",
    rankLabel: "מספר טבלאות מכוסות",
    searchPlaceholder: "שם תצוגה · משמעות · טבלה קלאסית · Consumption · Fiori",
    foot:
      "המיפוי בין תצוגה לטבלאות קלאסיות הוא מיפוי מאומת ידנית בקובצי הפרויקט, לא תוצר של גזירה אוטומטית. " +
      "מחרוזות annotation שאינן ודאיות מתוארות ברמת המושג ולא נכתבות כטקסט מדויק.",
    emptyNote:
      "החיפוש עובר על שם התצוגה, המשמעות, הטבלאות הקלאסיות, שכבת ה-Consumption ואפליקציית ה-Fiori: כולם ערכים " +
      "אמיתיים מקובצי הפרויקט.",
  };
}

/* ------------------------------------------------------------- the record */

export function cdsDetail(name: string): RefDetail | null {
  const v = cdsView(name);
  if (!v) return null;
  const e = enrichOf(v.view);
  const s4 = s4Of(v);
  const funcs = funcsFor(v.view);
  const apps = appsFor(v.view);

  /* --- S/4 plate ------------------------------------------------------- */
  const s4Facts: RefFact[] = [
    {
      label: "הטבלאות הקלאסיות שהתצוגה מכסה",
      codes: s4.tables.map((t) => ({ t: t.name, href: t.href })),
    },
    { label: "החלופה הקלאסית ב-ECC", text: clean(e?.eccAlternative), absent: "המאגר אינו מציין את המסלול הקלאסי המקביל לתצוגה הזו." },
  ];
  if (v.consumption) {
    s4Facts.push({
      label: "שכבת Consumption",
      codes: [{ t: v.consumption, href: cdsHref(v.consumption) }],
    });
  }
  if (v.fiori) s4Facts.push({ label: "אפליקציית Fiori שהמיפוי מציין", text: v.fiori });

  /* --- sections -------------------------------------------------------- */
  const sections: RefSection[] = [];

  sections.push({
    id: "what",
    icon: "sigma",
    title: "מה התצוגה נותנת",
    facts: [
      { label: "מטרה", text: clean(e?.purposeDeep) || v.he },
      { label: "סוג תצוגה (VDM)", text: clean(e?.viewType), absent: "המאגר אינו מסווג את סוג התצוגה." },
      { label: "מפתח מייצג", codes: e?.keyField ? [{ t: e.keyField }] : undefined, absent: "לא צוין מפתח מייצג ברשומה." },
      { label: "מודול", text: `${v.module}${MOD_HE[v.module] ? ` · ${MOD_HE[v.module]}` : ""}` },
    ],
  });

  const model: RefFact[] = [];
  if (e?.associations?.length) {
    model.push({ label: "אסוציאציות חשופות", codes: e.associations.map((a) => ({ t: a })) });
  }
  if (e?.annotations?.length) model.push({ label: "אנוטציות", bullets: e.annotations });
  if (e?.perfNotes?.length) model.push({ label: "הערות ביצועים", bullets: e.perfNotes });
  if (e?.abapConsumption) model.push({ label: "צריכה ב-ABAP", pre: e.abapConsumption });
  if (model.length) {
    sections.push({ id: "model", icon: "fileCode", title: "המודל והצריכה", facts: model });
  }

  /* who consumes it */
  const cards: RefCard[] = [];
  for (const a of apps) {
    cards.push({
      href: fioriHref(a.slug),
      code: a.id,
      he: a.he || a.name,
      mod: a.module,
      reason: "אפליקציית Fiori שצורכת את התצוגה",
    });
  }
  for (const o of funcs) {
    cards.push({
      href: bapiHref(o.id),
      code: o.technicalName,
      he: o.shortDescriptionHe,
      mod: o.primaryModule,
      reason: "ממשק פונקציה שהרשומה שלו מפנה לתצוגה",
    });
  }
  sections.push({
    id: "consumers",
    icon: "appWindow",
    title: "מי צורך את התצוגה",
    note: cards.length ? `${nf.format(cards.length)} רשומות` : undefined,
    cards,
    empty: "אין במאגר רשומת Fiori או ממשק פונקציה שמפנה לתצוגה הזו.",
  });

  // The ECC alternative is deliberately NOT parsed into T-Code links. The field
  // is one authored sentence ("טבלאות AUFK+AFKO · טרנזקציות IW31/IW32/IW33"),
  // and splitting prose into destinations is exactly the kind of guess this
  // directory refuses to make. It is printed verbatim on the S/4 plate instead.

  const checks = [
    !!v.he, !!e?.purposeDeep, !!e?.viewType, !!e?.keyField, !!e?.associations?.length,
    !!e?.annotations?.length, !!e?.perfNotes?.length, !!e?.abapConsumption,
    !!e?.eccAlternative, !!v.consumption, !!(v.fiori || apps.length), v.tables.length > 0,
  ];

  const statuses: RefStatus[] = [
    e?.verified === "verified"
      ? { he: "רשומה מאומתת", color: "var(--status-done)" }
      : e
        ? { he: "דורש אימות", color: "var(--status-not-started)" }
        : { he: "מיפוי בלבד: ללא רשומת העשרה", color: "var(--status-in-analysis)" },
  ];

  return {
    kind: "cds",
    eyebrow: `CDS View · ${v.module}`,
    code: v.view,
    he: v.he,
    en: "",
    mod: v.module,
    modHe: MOD_HE[v.module] || "",
    chips: uniq([clean(e?.viewType), v.consumption ? `Consumption · ${v.consumption}` : ""]),
    statuses,
    completeness: completeness(checks.filter(Boolean).length, checks.length),
    s4: {
      tone: s4.tone,
      headline: s4.headline,
      statuses: [
        ...statuses,
        s4.critical.length
          ? { he: "מעל טבלה שמשתנה מהותית", color: "var(--status-in-conversion)" }
          : { he: "שכבת S/4HANA מעל ECC", color: "var(--status-done)" },
      ],
      facts: s4Facts,
      tables: s4.tables,
    },
    sections,
    sources: uniq(e?.sources || []),
    foot:
      "המיפוי תצוגה↔טבלאות והרשומה המורחבת נכתבו ואומתו ידנית בקובצי הפרויקט. מעמד ה-S/4 של כל טבלה קלאסית " +
      "נלקח משכבת ה-S/4 המשותפת של האתר, ולא נכתב מחדש כאן.",
  };
}
