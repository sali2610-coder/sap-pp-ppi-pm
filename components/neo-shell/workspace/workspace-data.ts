// Project NEO · Stage 2B — the module workspace data layer (PM · PP-PI).
//
// Runs on the SERVER at build time. It is imported only by
// app/neo/[hub]/page.tsx, a server component, so the SAP datasets it reads
// never cross into the browser bundle: the single plain, serialisable object it
// returns is what the client workspace receives as props.
//
// HONESTY RULE, inherited from nav-data.ts and home-data.ts and not relaxed
// here: every number, name, note and JOIN below is DERIVED from the project
// dataset by the same helpers the shipping module portal renders from. Nothing
// is a literal, nothing is an estimate, and where the dictionary holds nothing
// the shape carries an explicit marker so the workspace can say so out loud.
//
// Three pairs of counts that look like a contradiction and are not — the
// workspace states both sides rather than picking the flattering one:
//
//   ROWS vs TABLES      PM has 58 dictionary rows over 56 distinct tables; two
//                       tables are documented under two different topics. In
//                       PP-PI the two numbers are equal (68 / 68).
//   FIELDS              counted over the ROWS (280 / 326), which is what the
//                       blueprint actually documents. Over distinct tables PM
//                       drops to 270 — both are exposed, labelled.
//   INTERFACE ENTRIES   the dictionary holds 95 (PM) / 71 (PP-PI) distinct
//                       function ENTRIES. Normalising the names the way
//                       lib/object-intel does (dropping the " - הסבר" suffix
//                       and the "/" alternates) collapses PP-PI to 53 distinct
//                       objects. The header shows the entry count and the
//                       normalised count side by side, labelled.

import { PM_DATA, PPPI_DATA } from "@/data/sapData";
import {
  eccS4,
  moduleTables,
  processSteps,
  relationships,
  transactions,
} from "@/lib/module-portal";
import { cdsForTable } from "@/data/cds-map";
import { classifyFunc, cleanFunc } from "@/lib/object-intel";
import { FLOWS, ZONES, zoneOf, type Zone } from "@/lib/studio-graph";
import { LIBRARY } from "@/data/library";
import { BOOKS } from "@/data/library/academy-index";
import type { SAPModuleData, SAPTable } from "@/lib/types";
import type { ModuleKey } from "../types";

/* ------------------------------------------------------------------ types */

/** S/4HANA class, straight out of lib/module-portal's eccS4(). */
export type S4Class = 0 | 1 | 2; // kept · replaced · removed

export interface WsField {
  tech: string;
  he: string;
  dt: string;
  len: string;
  /** "PK" | "FK" | "" — verbatim from the blueprint. */
  key: string;
}

export interface WsRelation {
  table: string;
  /** "" when the blueprint states no cardinality. Never filled in with a guess. */
  card: string;
  join: string;
  desc: string;
  /** true when the related table is itself documented inside this module. */
  inside: boolean;
}

export interface WsFunc {
  /** Normalised object name (lib/object-intel cleanFunc). */
  n: string;
  /** "BAPI" | "FM" | "IDoc" — lib/object-intel classifyFunc. */
  k: string;
  he: string;
}

/** One dictionary row = one row in the working table. */
export interface WsRow {
  /** Table name — a real SAP identifier, always rendered LTR-isolated. */
  n: string;
  he: string;
  en: string;
  /** Topic index inside the module. */
  tp: number;
  /** Documented fields on this row. */
  f: number;
  /** Primary / foreign key fields among them. */
  pk: number;
  fk: number;
  /** Functional zone (lib/studio-graph) = the object class. */
  z: Zone;
  /** Object-class hue as a `var(--obj-*)` reference. */
  obj: string;
  /** Transactions the blueprint maps onto the table. */
  tc: string[];
  /** Interface entries on this row, and the normalised objects behind them. */
  fnEntries: number;
  funcs: WsFunc[];
  /** Modelled ER relations. */
  rel: number;
  rels: WsRelation[];
  /** CDS views mapped onto the table (data/cds-map). */
  cds: number;
  /** Fiori app as the blueprint names it, or "". */
  fiori: string;
  s4: S4Class;
  /** Verbatim S/4HANA note. Never paraphrased. */
  s4Note: string;
  /** Replacement table / transaction as stated, or "". */
  s4Alt: string;
  /** SUM conversion note, or "". */
  sum: string;
  /** true when the OTHER module documents the same table. */
  shared: boolean;
  /** Key fields, for the row's expanded state. */
  keys: WsField[];
}

export interface WsTopic {
  idx: number;
  title: string;
  tables: number;
  fields: number;
}

export interface WsFlowStep {
  code: string;
  label: string;
  /** false ⇒ a real process step whose table this module's dictionary does not
   *  document. Drawn as a gap, never as a node with invented numbers. */
  exists: boolean;
  f: number | null;
  z: Zone;
  obj: string;
  rel: number;
}

export interface WsBook {
  id: string;
  title: string;
  he: string;
  publisher: string;
  pages: number;
  chapters: number;
}

export interface WsCourse {
  id: string;
  he: string;
  en: string;
  module: string;
  chapters: number;
}

export interface WsData {
  key: ModuleKey;
  /** SAP module code, LTR. */
  code: string;
  he: string;
  en: string;
  lede: string;
  /** var(--mod-*) reference — module identity, never a data category. */
  m: string;

  counts: {
    topics: number;
    /** Dictionary rows (topic × table). */
    rows: number;
    /** Distinct tables behind those rows. */
    tables: number;
    /** Fields over the rows. */
    fields: number;
    /** Fields over the distinct tables — equal to `fields` unless a table is
     *  documented under two topics. */
    fieldsDistinct: number;
    pk: number;
    fk: number;
    /** Distinct interface ENTRIES in the dictionary. */
    funcEntries: number;
    /** Distinct interface OBJECTS after normalisation. */
    funcObjects: number;
    bapis: number;
    fms: number;
    idocs: number;
    tcodes: number;
    cds: number;
    fiori: number;
    /** Modelled relation edges (deduped from → to). */
    edges: number;
    /** Tables also documented by the other module. */
    shared: number;
  };

  topics: WsTopic[];
  /** Largest topic in the module — the density strip's scale reference. */
  maxTopicTables: number;

  zones: { id: Zone; he: string; n: number; obj: string }[];
  s4: { kept: number; replaced: number; removed: number };

  rel: {
    edges: number;
    /** Edges whose target is documented inside this module. */
    inside: number;
    /** Cardinality mix, exactly as the blueprint states it. `none` counts the
     *  edges that carry no cardinality at all — PP-PI states none for any. */
    cards: { label: string; n: number }[];
    none: number;
    /** Busiest tables by distinct neighbours. */
    hubs: { n: string; deg: number; obj: string }[];
  };

  flow: WsFlowStep[];
  /** Transactions ranked by how many tables in the module map onto them. */
  tcodes: { code: string; n: number }[];
  books: WsBook[];
  courses: WsCourse[];
  rows: WsRow[];
}

/* ------------------------------------------------------------ small utils */

const uniq = <T,>(a: T[]) => [...new Set(a)];

/** Same split the module portal and the rail use, so a code counted here is the
 *  same code the transaction registry page counts. */
const splitTcodes = (s: string) =>
  (s || "")
    .split(/[,\s/]+/)
    .map((x) => x.trim().toUpperCase())
    .filter((x) => /^[A-Z][A-Z0-9_]{1,}$/.test(x));

/** Topic titles arrive from the blueprint with their ordinal prefix, and the
 *  PP-PI ones are truncated by the source extractor mid-parenthesis:
 *  "3. מתכון ייצור ופעולות (Master ". lib/object-intel's process-title cleaner
 *  is applied first (ordinal prefix, dangling "("), then one further rule for
 *  the truncation: when the parentheses do not balance, the title is cut at the
 *  opening bracket. Nothing is rewritten and nothing is completed — only the
 *  mechanical debris of the extraction is dropped. */
const cleanTopic = (t: string) => {
  let s = (t || "").replace(/^\s*\d+\.\s*/, "").replace(/\s+/g, " ").trim();
  const opens = (s.match(/\(/g) || []).length;
  const closes = (s.match(/\)/g) || []).length;
  if (opens > closes) s = s.slice(0, s.lastIndexOf("("));
  return s.trim();
};

const ZONE_OBJ: Record<Zone, string> = {
  master: "var(--obj-master)",
  planning: "var(--obj-structure)",
  execution: "var(--obj-transaction)",
  logistics: "var(--obj-movement)",
  status: "var(--obj-status)",
  config: "var(--obj-config)",
  quality: "var(--obj-config)",
  other: "var(--obj-text)",
};
/** Object-class hue. The SAME mapping nav-data.ts and home-data.ts use — one
 *  classification across the whole namespace, not a third one. */
export const objVar = (z: Zone) => ZONE_OBJ[z];

const MOD_VAR: Record<ModuleKey, string> = { PM: "var(--mod-pm)", "PP-PI": "var(--mod-pppi)" };

const clean = (s: string) => (s || "").replace(/\s+/g, " ").trim();

/* --------------------------------------------------------------- the build */

const dataOf = (k: ModuleKey): SAPModuleData => (k === "PM" ? PM_DATA : PPPI_DATA);

/** Every dictionary ROW, i.e. topic × table. moduleTables() collapses a table
 *  documented under two topics into one; the working table keeps both, because
 *  they are two different pieces of documentation. */
const rowsOf = (m: SAPModuleData): SAPTable[] => m.topics.flatMap((tp) => tp.tables);

function s4Of(t: SAPTable): S4Class {
  // Identical to lib/module-portal's eccS4() bucketing, applied per row so the
  // working table can show the same verdict the ECC ↔ S/4HANA page shows.
  const alt = (t.s4AltTable || "").trim();
  const base = alt.replace(/\s*\(.*?\)\s*/g, "").trim().toUpperCase();
  const identical = !!alt && (/(זהה|identical|unchanged|ללא שינוי|\(=\))/i.test(alt) || base === t.tableName.toUpperCase());
  if (/הוסר|בוטל|removed|deprecat/i.test(t.s4Note || "")) return 2;
  if (alt && !identical) return 1;
  return 0;
}

/** Books whose module is this module. PP-PI absorbs PP, exactly as the rail's
 *  booksFor() does — the two are one shelf in this product, not two. */
const bookMatch = (k: ModuleKey, mod: string) =>
  k === "PP-PI" ? mod === "PP-PI" || mod === "PP" : mod === k;

/** Academy courses. The course registry uses its own module vocabulary
 *  ("PM-User", "PP/DS"), so the match is stated explicitly rather than guessed
 *  by a substring that would also pull "MM" into "PM". */
const COURSE_MODULES: Record<ModuleKey, string[]> = {
  PM: ["PM", "PM-User"],
  "PP-PI": ["PP", "PP-PI", "PP/DS"],
};

const cache = new Map<ModuleKey, WsData>();

export function workspaceData(key: ModuleKey): WsData {
  const hit = cache.get(key);
  if (hit) return hit;

  const m = dataOf(key);
  const other = dataOf(key === "PM" ? "PP-PI" : "PM");
  const otherNames = new Set(moduleTables(other).map((t) => t.tableName));

  const rows = rowsOf(m);
  const distinct = moduleTables(m);
  const distinctNames = new Set(distinct.map((t) => t.tableName));

  /* --- interfaces ---------------------------------------------------------
     Two different questions, two different numbers. `entries` is how many
     distinct function ENTRIES the blueprint wrote; `objects` is how many
     distinct SAP objects those entries resolve to once normalised. */
  const entrySet = new Set<string>();
  const objectKind = new Map<string, string>();
  for (const t of rows) {
    for (const [raw] of t.funcs || []) {
      const e = (raw || "").trim();
      if (!e) continue;
      entrySet.add(e);
      const c = cleanFunc(e);
      if (c && !objectKind.has(c)) objectKind.set(c, classifyFunc(c));
    }
  }
  const kindCount = (k: string) => [...objectKind.values()].filter((v) => v === k).length;

  /* --- relations ---------------------------------------------------------- */
  const edges = relationships(m);
  const deg = new Map<string, Set<string>>();
  const bump = (a: string, b: string) => {
    if (!deg.has(a)) deg.set(a, new Set());
    deg.get(a)!.add(b);
  };
  for (const e of edges) {
    bump(e.from, e.to);
    bump(e.to, e.from);
  }
  const cardCount = new Map<string, number>();
  for (const e of edges) {
    const c = (e.card || "").trim();
    if (!c) continue;
    cardCount.set(c, (cardCount.get(c) || 0) + 1);
  }

  /* --- transactions, ranked by how many tables reach them ----------------- */
  const tcFreq = new Map<string, number>();
  for (const t of distinct) {
    for (const c of uniq(splitTcodes(t.tcodes))) tcFreq.set(c, (tcFreq.get(c) || 0) + 1);
  }

  /* --- the working rows --------------------------------------------------- */
  const wsRows: WsRow[] = rows.map((t) => {
    const funcs: WsFunc[] = [];
    const seenFn = new Set<string>();
    let fnEntries = 0;
    for (const [raw, he] of t.funcs || []) {
      const e = (raw || "").trim();
      if (!e) continue;
      fnEntries++;
      const c = cleanFunc(e);
      if (!c || seenFn.has(c)) continue;
      seenFn.add(c);
      funcs.push({ n: c, k: classifyFunc(c), he: clean(he) });
    }
    const rels: WsRelation[] = (t.relations || []).map((r) => ({
      table: r.table,
      card: (r.card || "").trim(),
      join: clean(r.join).slice(0, 120),
      desc: clean(r.desc),
      inside: distinctNames.has(r.table),
    }));
    const z = zoneOf(t.tableName);
    return {
      n: t.tableName,
      he: t.descriptionHe || t.descriptionEn || "",
      en: t.descriptionEn || "",
      tp: t.topicIdx,
      f: t.fields.length,
      pk: t.fields.filter((f) => /PK/i.test(f.key)).length,
      fk: t.fields.filter((f) => /FK/i.test(f.key)).length,
      z,
      obj: objVar(z),
      tc: uniq(splitTcodes(t.tcodes)),
      fnEntries,
      funcs: funcs.slice(0, 8),
      rel: rels.length,
      rels: rels.slice(0, 8),
      cds: cdsForTable(t.tableName).length,
      fiori: clean(t.fioriApp || ""),
      s4: s4Of(t),
      s4Note: clean(t.s4Note || ""),
      s4Alt: clean([t.s4AltTable, t.s4AltTcode].filter(Boolean).join(" · ")),
      sum: clean(t.sumNote || ""),
      shared: otherNames.has(t.tableName),
      keys: t.fields
        .filter((f) => /PK|FK/i.test(f.key))
        .slice(0, 10)
        .map((f) => ({ tech: f.tech, he: f.he || f.en || "", dt: f.dt || "", len: f.len || "", key: f.key })),
    };
  });

  /* --- the process strip --------------------------------------------------
     The chain is lib/studio-graph's FLOWS for this module — the same chain the
     Architecture Studio and Home draw. A step whose table the module does not
     document is carried through with exists:false rather than dropped. */
  const byName = new Map(distinct.map((t) => [t.tableName, t]));
  const flowLabels = new Map((FLOWS[m.module] || []).map((s) => [s.code, s.label]));
  const flow: WsFlowStep[] = processSteps(m).map((s) => {
    const t = byName.get(s.code);
    const z = zoneOf(s.code);
    return {
      code: s.code,
      label: flowLabels.get(s.code) || s.label,
      exists: s.exists,
      f: t ? t.fields.length : null,
      z,
      obj: objVar(z),
      rel: deg.get(s.code)?.size ?? 0,
    };
  });

  const s4 = eccS4(m);
  const topics: WsTopic[] = m.topics.map((tp) => ({
    idx: tp.idx,
    title: cleanTopic(tp.title),
    tables: tp.tables.length,
    fields: tp.tables.reduce((a, t) => a + t.fields.length, 0),
  }));

  const zoneCount = new Map<Zone, number>();
  for (const t of distinct) {
    const z = zoneOf(t.tableName);
    zoneCount.set(z, (zoneCount.get(z) || 0) + 1);
  }

  const cdsSet = new Set<string>();
  const fioriSet = new Set<string>();
  for (const t of distinct) {
    for (const v of cdsForTable(t.tableName)) cdsSet.add(v.view);
    if ((t.fioriApp || "").trim()) fioriSet.add(t.fioriApp!.trim());
  }

  const out: WsData = {
    key,
    code: key,
    he: key === "PM" ? "אחזקת מפעל" : "ייצור תהליכי",
    en: key === "PM" ? "Plant Maintenance" : "Production Planning · Process Industries",
    lede:
      key === "PM"
        ? "ציוד, מיקומים פונקציונליים, הודעות ופקודות אחזקה — כפי שהם יושבים במילון הנתונים של הפרויקט. כל מספר בעמוד נגזר מאותן פונקציות שמהן נבנה פורטל המודול, ולא נכתב ביד."
        : "מתכונים, משאבים, פקודות תהליך ואישורים — כפי שהם יושבים במילון הנתונים של הפרויקט. כל מספר בעמוד נגזר מאותן פונקציות שמהן נבנה פורטל המודול, ולא נכתב ביד.",
    m: MOD_VAR[key],

    counts: {
      topics: m.topics.length,
      rows: rows.length,
      tables: distinct.length,
      fields: rows.reduce((a, t) => a + t.fields.length, 0),
      fieldsDistinct: distinct.reduce((a, t) => a + t.fields.length, 0),
      pk: distinct.reduce((a, t) => a + t.fields.filter((f) => /PK/i.test(f.key)).length, 0),
      fk: distinct.reduce((a, t) => a + t.fields.filter((f) => /FK/i.test(f.key)).length, 0),
      funcEntries: entrySet.size,
      funcObjects: objectKind.size,
      bapis: kindCount("BAPI"),
      fms: kindCount("FM"),
      idocs: kindCount("IDoc"),
      tcodes: transactions(m).length,
      cds: cdsSet.size,
      fiori: fioriSet.size,
      edges: edges.length,
      shared: distinct.filter((t) => otherNames.has(t.tableName)).length,
    },

    topics,
    maxTopicTables: Math.max(...topics.map((t) => t.tables)),

    zones: ZONES.filter((z) => (zoneCount.get(z.id) || 0) > 0).map((z) => ({
      id: z.id,
      he: z.he,
      n: zoneCount.get(z.id) || 0,
      obj: objVar(z.id),
    })),

    s4: { kept: s4.kept.length, replaced: s4.replaced.length, removed: s4.removed.length },

    rel: {
      edges: edges.length,
      inside: edges.filter((e) => e.toExists).length,
      cards: [...cardCount.entries()].sort((a, b) => b[1] - a[1]).map(([label, n]) => ({ label, n })),
      none: edges.filter((e) => !(e.card || "").trim()).length,
      hubs: [...deg.entries()]
        .map(([n, s]) => ({ n, deg: s.size, obj: objVar(zoneOf(n)) }))
        .sort((a, b) => b.deg - a.deg || a.n.localeCompare(b.n))
        .slice(0, 6),
    },

    flow,

    tcodes: [...tcFreq.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 10)
      .map(([code, n]) => ({ code, n })),

    books: LIBRARY.filter((b) => bookMatch(key, b.module)).map((b) => ({
      id: b.id,
      title: b.title,
      he: b.titleHe || b.title,
      publisher: b.publisher,
      pages: b.pages,
      chapters: b.chapters.length,
    })),

    courses: BOOKS.filter((b) => COURSE_MODULES[key].includes(b.module)).map((b) => ({
      id: b.id,
      he: b.titleHe,
      en: b.titleEn,
      module: b.module,
      chapters: Object.keys(b.data || {}).length,
    })),

    rows: wsRows,
  };

  cache.set(key, out);
  return out;
}
