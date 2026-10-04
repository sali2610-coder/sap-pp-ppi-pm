/* ============================================================================
   PROJECT NEO · /neo/transactions/<CODE>/ — what the legacy pages carried.
   ----------------------------------------------------------------------------
   SERVER ONLY, build time. Before NEO a T-Code had two legacy homes, fed by
   three renderers:
     /tcode/<CODE>/  components/transaction-page.tsx   tx-intel (539 codes)
                     components/transaction-light.tsx  the registry's breadth rows
                     components/related-view.tsx       codes only the blueprint lists
     /apps/<CODE>/   components/app-object.tsx         tx-intel + data/lifecycle +
                                                       the curated Fiori catalogue
   This module reads THEIR data modules and returns the blocks NEO did not yet
   show. Nothing is written here: every string is a dataset value, or one of
   the sentences the legacy pages generated from a single frame, reproduced
   verbatim so the reader keeps the same guidance. Where a dataset is silent,
   the block is empty and the screen omits it.

   Two legacy readings are deliberately NOT carried, because they were not data:
     · data/lifecycle.ts gives every code without an entry a default record
       ("uncertain items default to Active"). Its status, impact, migration line
       and the «פעיל / יציב» label computed from it are shown only for the
       codes the file really records.
     · /apps/ labelled the `obsolete` field «הוחלף ע"י». The field is not written
       in one direction (AW01N lists AW01, which it replaced; VD01 lists BP,
       which replaced it), so it is shown under the transaction page's own
       neutral label «מיושנות», with the check tx-detail.ts already applies.
   ========================================================================== */

import { TX_INTEL } from "@/data/tx-intel";
import { IMPACT_HE, LC_HE, LIFECYCLE } from "@/data/lifecycle";
import { appObject, criticality } from "@/lib/apps-intel";
import { buildProfile } from "@/lib/object-profile";
import { txLeadingInto } from "@/lib/tx-intel";
import { registryTx } from "@/lib/tx-registry";
import { hasTxPage } from "./codes";

const txPage = (code: string): string | null =>
  hasTxPage(code) ? `/neo/transactions/${encodeURIComponent(code.trim().toUpperCase())}/` : null;

/* ------------------------------------------------------------------ types */

/** A value from a relation list. Usually a T-Code; sometimes the dataset's own
 *  free text ("Manage Technical Objects (Fiori)"), which stays a value. */
export interface TxCodeRef {
  code: string;
  /** The registry's Hebrew line for the code, "" when it has none. */
  he: string;
  href: string | null;
}

export interface TxStep extends TxCodeRef {
  state: "done" | "current" | "todo";
}

export interface TxRelRow {
  label: string;
  items: TxCodeRef[];
}

/** The authored Transaction Intelligence blocks the /tcode/ page showed and the
 *  NEO screen did not. Each is "" or [] when the record is silent. */
export interface TxIntelBlocks {
  /** «מה אני רואה?» */
  beginner: string;
  /** «הסבר ליועץ (טכני)» */
  consultant: string;
  /** «נתיב Debug» */
  debug: string[];
  /** «ביצועים» */
  perf: string[];
  /** «טיפים לפרודקשן» */
  prodTips: string[];
  /** «דוגמה עסקית» */
  businessExample: string;
  /** «דוגמה טכנית» */
  techExample: string;
  /** «Best Practices» */
  bestPractices: string[];
  /** «טיפ הסמכה» */
  certTips: string;
  /** «OSS · SAP Notes — מילות חיפוש»: search words, never note numbers. */
  oss: string[];
  /** «ראיון · הסמכה · שאלות נפוצות» */
  interview: string[];
  /** «Classes / APIs» */
  classes: string[];
  /** «ציר התהליך העסקי»: the legacy selection, up to three steps before and
   *  four after. Empty when the record names neither side. */
  steps: TxStep[];
  /** «חוקר קשרים»: every relation list, verbatim, in the legacy order. */
  relations: TxRelRow[];
}

export interface TxLine {
  label: string;
  items: string[];
}

/** The /apps/ page's layer: the evolution path, the Fiori catalogue record,
 *  the lifecycle record, and the guidance it generated from them. */
export interface TxAppsLayer {
  /** ECC GUI → S/4HANA → Fiori. null when no Fiori app is named. */
  path: {
    /** What the S/4HANA step says: the lifecycle record's successor or the
     *  code itself, «הוסר» when that record says it is gone, else the page's
     *  own S/4 headline (no lifecycle record means no lifecycle claim). */
    s4: string;
    s4IsCode: boolean;
    fiori: string;
    fioriId: string;
  } | null;
  /** «אפליקציות נוספות»: further catalogue apps, "app (id)". */
  moreApps: string[];
  /** The catalogue record, with the legacy labels, values the catalogue holds. */
  catalog: TxLine[];
  /** data/lifecycle.ts, only for the codes it records. */
  lifecycle: TxLine[];
  /** criticality() of lib/apps-intel, only when a lifecycle record exists. */
  criticality: string;
  /** «טיפים של יועץ SAP» items that were not a field shown elsewhere. */
  tips: TxLine[];
  /** «בדיקות (QA)» items that were not a field shown elsewhere. */
  qa: TxLine[];
  /** «השוואה — ECC מול Fiori», only with a catalogue record. */
  compare: { app: string; rows: [string, string, string][] } | null;
  /** The CDS views lib/apps-intel joins to the record: its named views, then
   *  the views data/cds-map maps to its tables. */
  cds: string[];
}

export interface TxProfileDim {
  label: string;
  /** The legacy mark, verbatim: «אומת» or «ידע כללי». "" when the card had none. */
  mark: "" | "אומת" | "ידע כללי";
  text: string;
  items: string[];
  ordered: boolean;
  refs: { name: string; he: string; href: string | null }[];
}

/* ----------------------------------------------------------- small helpers */

const clean = (s?: string) => (s || "").trim();
const list = (a?: string[]) => (a || []).map(clean).filter(Boolean);
const uniq = <T,>(a: T[]) => [...new Set(a)];

const ref = (raw: string): TxCodeRef => {
  const code = clean(raw);
  return { code, he: clean(registryTx(code)?.he), href: txPage(code) };
};

/* ------------------------------------------------------- tx-intel blocks */

export function intelBlocks(code: string): TxIntelBlocks | null {
  const t = TX_INTEL[code];
  if (!t) return null;
  const before = list(t.before);
  const after = list(t.after);

  // The legacy timeline, reproduced: what leads in (that the record does not
  // already list), reversed, then the record's own `before`; the last three.
  const lead = txLeadingInto(code).filter((x) => !before.includes(x)).slice(0, 4).reverse();
  const done = uniq([...lead, ...before]).slice(-3);
  const todo = uniq(after).slice(0, 4);
  const steps: TxStep[] = done.length || todo.length
    ? [
        ...done.map((c) => ({ ...ref(c), state: "done" as const })),
        { code, he: clean(t.area) || clean(t.descHe).slice(0, 40), href: null, state: "current" as const },
        ...todo.map((c) => ({ ...ref(c), state: "todo" as const })),
      ]
    : [];

  const rows: [string, string[]][] = [
    ["שלב קודם", uniq([...before, ...lead])],
    ["שלב הבא", uniq(after)],
    ["נפוץ יחד", uniq(list(t.together))],
    ["דומות", uniq(list(t.similar))],
    ["חלופות", uniq(list(t.alternative))],
    ["מיושנות", uniq(list(t.obsolete))],
  ];

  return {
    beginner: clean(t.beginner),
    consultant: clean(t.consultant),
    debug: list(t.debugSteps),
    perf: list(t.perfNotes),
    prodTips: list(t.prodTips),
    businessExample: clean(t.businessExample),
    techExample: clean(t.techExample),
    bestPractices: list(t.bestPractices),
    certTips: clean(t.certTips),
    oss: list(t.ossKeywords),
    interview: list(t.interview),
    classes: list(t.classes),
    steps,
    relations: rows.filter(([, items]) => items.length).map(([label, items]) => ({ label, items: items.map(ref) })),
  };
}

/* -------------------------------------------------------- the /apps/ layer */

export function appsLayer(code: string, s4He: string): TxAppsLayer | null {
  const o = appObject(code);
  if (!o) return null;
  const t = o.intel;
  const lc = LIFECYCLE[code];
  const f = o.fiori[0];
  const auth = list(t.authObjects);
  const errors = list(t.commonErrors);
  const before = list(t.before);
  const fioriName = f?.app || clean(t.fiori);

  const path: TxAppsLayer["path"] = fioriName
    ? {
        s4: lc ? (lc.s4 ? lc.alt || code : "הוסר") : s4He,
        s4IsCode: !!lc && lc.s4,
        fiori: fioriName,
        fioriId: f?.appId || "",
      }
    : null;

  const catalog: TxLine[] = f
    ? ([
        ["App ID", f.appId],
        ["App Name", f.app],
        ["Business Role", f.role],
        ["Business Catalog", f.catalog],
        ["OData Service", f.odata],
        ["CDS Source", f.cds],
        ["Backend (GUI)", f.gui.join(" / ")],
      ] as [string, string][]).filter(([, v]) => clean(v)).map(([label, v]) => ({ label, items: [clean(v)] }))
    : [];

  const lifecycle: TxLine[] = lc
    ? ([
        ["מצב מחזור חיים", `${LC_HE[lc.status]} (${lc.status})`],
        ["זמינות", `SAP GUI${lc.ecc ? " · ECC" : ""}${lc.s4 ? " · S/4" : ""}`],
        ["השפעת מיגרציה", `${IMPACT_HE[lc.impact]} (${lc.impact})`],
        ["חלופה", clean(lc.alt)],
        ["פריט פישוט", clean(lc.simplification)],
        ["מיגרציה", clean(lc.migration)],
      ] as [string, string][]).filter(([, v]) => v).map(([label, v]) => ({ label, items: [v] }))
    : [];

  // The generated guidance. Items that only repeated a field the page already
  // shows (the first mistake, the first best practice, whenUse, whenNot, the
  // consultant note, the error list) are not repeated here.
  const tips: TxLine[] = [
    errors.length ? { label: "מה לבדוק קודם", items: [`ודא מראש: ${errors[0]}`] } : null,
    auth.length
      ? {
          label: "הרשאות",
          items: [
            `בכשל גישה — SU53 מיד, ואז ודא ${auth.join(", ")} בתפקיד (PFCG).`,
            // The legacy authorisation block's sentence; its generic frame
            // carries a fact only when a catalogue record names the catalog.
            ...(f ? [`כשל הרשאה אופייני: בדוק SU53 מיד אחרי השגיאה, ואז STAUTHTRACE לאיתור האובייקט החסר. ודא הקצאת תפקיד (PFCG) + Business Catalog ${f.catalog || ""} ל-Fiori.`] : []),
          ],
        }
      : null,
  ].filter((x): x is TxLine => !!x);

  const regression = [
    f ? `השווה תוצאת ${code} (GUI) מול ${f.app} (Fiori)` : "",
    before.length ? `ודא רצף תקין: ${before.join("→")}→${code}` : "",
  ].filter(Boolean);
  const qa: TxLine[] = [
    auth.length ? { label: "בדיקת הרשאות", items: [`ודא גישה דרך ${auth.join(", ")} + תפקיד PFCG`] } : null,
    regression.length ? { label: "רגרסיה / אינטגרציה", items: regression } : null,
  ].filter((x): x is TxLine => !!x);

  const tables6 = list(t.tables).slice(0, 6).join(", ") || "—";
  const compare: TxAppsLayer["compare"] = f
    ? {
        app: f.app,
        rows: [
          ["ממשק", "SAP GUI (Dynpro)", "SAPUI5 / Fiori"],
          ["טכנולוגיה", "ABAP Dynpro · screens", `OData (${f.odata || "—"}) · CDS (${f.cds || "—"})`],
          ["טבלאות", tables6, tables6],
          ["הרשאות", auth.join(", ") || "—", `Business Role: ${f.role || "—"} · Catalog: ${f.catalog || "—"}`],
          ["ניווט", "תפריט SAP / קוד טרנזקציה", "Launchpad · Tile · Semantic Object"],
          ["Backend", code, f.gui.join(" / ")],
          ["יתרון", "עומק פונקציונלי, מהיר למומחה", "UX מודרני, מובייל, role-based"],
          // The legacy cell printed the lifecycle file's line, which for a code
          // it does not record is its default. Only a recorded line is shown.
          ["מיגרציה", lc ? clean(lc.migration) : "אין תיעוד מאומת במאגר", `החלפה ל-${f.app}; ודא Catalog/Role ב-PFCG`],
        ],
      }
    : null;

  return {
    path,
    moreApps: o.fiori.slice(1).map((x) => (x.appId ? `${x.app} (${x.appId})` : x.app)),
    catalog,
    lifecycle,
    criticality: lc ? criticality(o).he : "",
    tips,
    qa,
    compare,
    cds: o.cdsViews.map((v) => v.view),
  };
}

/* ------------------------------------------ the blueprint-only profile */

/** The kind-level profile the legacy page showed for a code only the
 *  blueprint lists (lib/object-profile, kind "tcode"). Every sentence in it is
 *  the kind's template, at most with the code, its module or its table count
 *  filled in ("מריצים ב-SPRO בתהליך אחזקה"), so each carries «ידע כללי»: the
 *  legacy «אומת» on four of them, which this page defines as "derived from the
 *  dataset rows", certified a template (review, 2026-10-03). What the blueprint
 *  rows do say is listed as data, unmarked: the dependencies and the related
 *  tables, each table once (one row per module repeated JSTO on BS02). */
export function blueprintProfile(code: string, tableHref: (name: string) => string | null): TxProfileDim[] | null {
  const p = buildProfile(code, "tcode");
  if (!p) return null;
  const mark: TxProfileDim["mark"] = "ידע כללי";
  const dim = (label: string, d: Partial<TxProfileDim>): TxProfileDim =>
    ({ label, mark: "", text: "", items: [], ordered: false, refs: [], ...d });
  const deps = [...new Set(p.dependencies)];
  const related = p.related.filter((r, i, a) => a.findIndex((x) => x.name === r.name) === i);
  return [
    dim("מה זה", { mark, text: p.what.text }),
    dim("למה קיים", { mark, text: p.why.text }),
    dim("מי משתמש", { text: p.who }),
    dim("מתי משתמשים", { text: p.when }),
    dim("מחזור חיים", { text: p.lifecycle }),
    dim("תלויות", deps.length ? { items: deps } : { text: "אין תלויות מתועדות במאגר." }),
    dim("אובייקטים קשורים", related.length
      ? { refs: related.map((r) => ({ name: r.name, he: clean(r.he), href: tableHref(r.name) })) }
      : { text: "אין אובייקטים קשורים במאגר." }),
    dim("פתרון תקלות נפוץ", { items: p.troubleshooting }),
    dim("שאלות ראיון", { items: p.interview, ordered: true }),
    dim("ECC מול S/4HANA", { mark, text: p.eccS4.text }),
    dim("דוגמה — אחזקה (PM)", { mark, text: p.pmExample.text }),
    dim("דוגמה — ייצור (PP/PP-PI)", { mark, text: p.ppExample.text }),
  ];
}
