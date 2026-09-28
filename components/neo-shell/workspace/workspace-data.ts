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
import { RISK_HE, TRUST_HE, s4For } from "@/lib/s4";
import { BOOK_IDENTITY } from "@/lib/book-identity";
import { FLOWS, ZONES, zoneOf, type Zone } from "@/lib/studio-graph";
import { LIBRARY } from "@/data/library";
import { BOOKS } from "@/data/library/academy-index";
import type { SAPModuleData, SAPSheet, SAPTable } from "@/lib/types";
import type { ModuleKey } from "../types";

/* ------------------------------------------------------------------ types */

/** S/4HANA verdict. Decided once, in lib/s4-class.ts, from the blueprint's own
 *  S/4 column — so this workspace and the ECC↔S/4 page cannot disagree.
 *  `null` on a row means the source states no verdict; it is shown as a gap. */
export type { S4Class } from "@/lib/s4-class";
import type { S4Class, S4Split } from "@/lib/s4-class";
import { s4ClassOf } from "@/lib/s4-class";

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
  /** `/neo/object/<TABLE>/` when the dictionary documents the far end, else
   *  null. A null renders as plain text — never as a link with nothing behind
   *  it. */
  href: string | null;
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
  /** The object page for this table. Always a generated route: the row names
   *  come from the same datasets app/neo/object/[name] builds its params from. */
  href: string;
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
  s4: S4Class | null;
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
  /** Object page, or null for a step the dictionary does not document — a gap
   *  is stated, never linked. */
  href: string | null;
}

export interface WsBook {
  id: string;
  title: string;
  he: string;
  publisher: string;
  pages: number;
  chapters: number;
  /** `/neo/books/<bookId>/` when lib/book-identity maps this shelf entry onto a
   *  spine that data/books actually holds, else null. A null renders as a plain
   *  record — the shelf link below it still leads somewhere real. */
  href: string | null;
}

/** One aux sheet of the blueprint, kept VERBATIM. The extractor already stores
 *  these as header + rows (lib/types SAPSheet) and nothing is reshaped here:
 *  the workspace renders the columns the blueprint wrote, in its order. */
export interface WsSheet {
  /** Stable key so the surface can pick an icon and a sentence without reading
   *  the Hebrew title. */
  key: "simplification" | "config" | "customCode" | "tcodesDir" | "tools" | "ppvs";
  /** The blueprint's own sheet title. */
  title: string;
  headers: string[];
  rows: string[][];
  /** Column index that carries the row's identity (the one drawn as its
   *  heading). Derived from the header shape, never guessed per row. */
  keyCol: number;
}

/** A table the dictionary says materially changes in S/4HANA. Everything here
 *  is either verbatim from the blueprint or resolved by lib/s4.ts — which is
 *  itself either curated Simplification-List knowledge or a derivation from the
 *  blueprint's own S/4 column, and says which. */
export interface WsS4Row {
  n: string;
  he: string;
  href: string;
  obj: string;
  /** Verdict class, the same bucketing the working table shows. */
  s4: S4Class | null;
  risk: "high" | "medium" | "low" | "none";
  riskHe: string;
  trust: "verified" | "partial" | "needs";
  trustHe: string;
  /** lib/s4 `changed` — what changes. "" when the resolver holds nothing. */
  changed: string;
  /** lib/s4 `why` — why it matters. "" when the resolver holds nothing. */
  why: string;
  /** SAP Note / Simplification reference, only from the curated entry. Never
   *  synthesised: a note number the project does not hold is not printed. */
  note: string;
  /** Verbatim blueprint columns. */
  s4Note: string;
  s4Alt: string;
  sum: string;
  fiori: string;
  /** Transactions and CDS views the curated entry names, when it names any. */
  tcodes: string[];
  cds: string[];
}

/** One interface object of the module, and how far it reaches into it. */
export interface WsIface {
  n: string;
  k: string;
  he: string;
  /** Distinct module tables whose dictionary row names this object. */
  tables: number;
}

export interface WsCourse {
  id: string;
  he: string;
  en: string;
  module: string;
  chapters: number;
  /** The course's own chapter-route base, verbatim from the academy registry. */
  href: string;
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
  s4: S4Split;

  /* --- S/4HANA, as the forward context of the whole page ------------------ */
  s4x: {
    /** Risk mix over the DISTINCT tables, resolved by lib/s4.ts. */
    risk: { high: number; medium: number; low: number; none: number };
    /** How the resolver knows: curated · derived from the blueprint · unknown. */
    trust: { verified: number; partial: number; needs: number };
    /** Tables whose risk is high or medium — the ones that actually move. */
    changed: WsS4Row[];
    /** Distinct SAP Note / Simplification references the project holds for this
     *  module's tables. Empty when the project holds none. */
    notes: string[];
    /** Blueprint columns present at all, so the surface can say which of them
     *  this module's blueprint filled in and which it left empty. */
    has: { alt: number; sum: number; fiori: number; note: number };
  };

  /** Aux blueprint sheets this module actually carries. PM and PP-PI carry
   *  DIFFERENT ones, and the page renders what exists rather than a fixed set. */
  sheets: WsSheet[];

  /** Interface objects, ranked by reach, plus the kind split. */
  ifaces: WsIface[];
  /** CDS views mapped onto this module's tables. */
  cds: { view: string; he: string; tables: string[] }[];
  /** Fiori apps the blueprint names, and the tables that name them. */
  fiori: { app: string; tables: string[] }[];

  rel: {
    edges: number;
    /** Edges whose target is documented inside this module. */
    inside: number;
    /** Cardinality mix, exactly as the blueprint states it. `none` counts the
     *  edges that carry no cardinality at all — PP-PI states none for any. */
    cards: { label: string; n: number }[];
    none: number;
    /** Busiest tables by distinct neighbours. */
    hubs: { n: string; deg: number; obj: string; href: string }[];
  };

  /** The single most connected table in the module — the workspace's "start
   *  here". Derived, never chosen by hand: it is hubs[0]. null only if the
   *  dictionary models no relation at all for this module. */
  entry: { n: string; he: string; obj: string; href: string; deg: number } | null;

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

/** The blueprint's own S/4HANA verdict for one row. Shared with the ECC↔S/4
 *  page and Home through lib/s4-class.ts, so the three cannot drift. */
const s4Of = s4ClassOf;

/** Books whose module is this module. PP-PI absorbs PP, exactly as the rail's
 *  booksFor() does — the two are one shelf in this product, not two. */
const bookMatch = (k: ModuleKey, mod: string) =>
  k === "PP-PI" ? mod === "PP-PI" || mod === "PP" : mod === k;

/** Shelf id -> spine id, inverted from lib/book-identity's own table. The book
 *  hub route (app/neo/books/[bookId]) generates from the spines on disk, so a
 *  shelf entry that has no spine gets no link rather than a broken one. */
const SPINE_OF_SHELF: Record<string, string> = Object.fromEntries(
  Object.values(BOOK_IDENTITY)
    .filter((b) => b.shelfId)
    .map((b) => [b.shelfId as string, b.bookId]),
);

/** The aux sheets, in reading order, with the column that carries each row's
 *  identity. Both indices are read off the blueprint's own header row — never a
 *  fixed position — so a re-extraction that adds a column cannot silently make
 *  the surface point at the wrong cell. */
const SHEET_ORDER: WsSheet["key"][] = ["simplification", "tcodesDir", "tools", "ppvs", "config", "customCode"];

/** The header the sheet's identity column is written under, per sheet. Matched
 *  case-insensitively against the blueprint's own header text; if none of them
 *  is found the first non-ordinal column wins. */
const SHEET_KEYCOL: Record<WsSheet["key"], RegExp> = {
  simplification: /Simplification Item/i,
  config: /אובייקט קונפיגורציה/,
  customCode: /קוד \/ שם טכני/,
  tcodesDir: /T-Code/i,
  tools: /כלי/,
  ppvs: /היבט/,
};

function sheetOf(m: SAPModuleData, key: WsSheet["key"]): WsSheet | null {
  const s: SAPSheet | undefined = m[key];
  if (!s || !s.rows.length) return null;
  const want = SHEET_KEYCOL[key];
  let keyCol = s.headers.findIndex((h) => want.test(h || ""));
  // Fallback: the first column that is not the blueprint's ordinal counter.
  if (keyCol < 0) keyCol = Math.max(0, s.headers.findIndex((h) => !/^מס'/.test((h || "").trim())));
  return { key, title: clean(s.title), headers: s.headers.map(clean), rows: s.rows, keyCol };
}

/** Academy courses. The course registry uses its own module vocabulary
 *  ("PM-User", "PP/DS"), so the match is stated explicitly rather than guessed
 *  by a substring that would also pull "MM" into "PM". */
const COURSE_MODULES: Record<ModuleKey, string[]> = {
  PM: ["PM", "PM-User"],
  "PP-PI": ["PP", "PP-PI", "PP/DS"],
};

/** Every table name the dictionary documents, across BOTH blueprints — exactly
 *  the set app/neo/object/[name] calls generateStaticParams with, derived from
 *  the same moduleTables() helper. A route is emitted only for a name in here,
 *  so a workspace link can never outrun a generated page. */
let _known: Set<string> | null = null;
const known = (): Set<string> =>
  (_known ??= new Set([...moduleTables(PM_DATA), ...moduleTables(PPPI_DATA)].map((t) => t.tableName)));

/** The object route, or null when the far end is not a documented table. */
const objHref = (n: string): string | null => (known().has(n) ? `/neo/object/${n}/` : null);

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
      href: objHref(r.table),
    }));
    const z = zoneOf(t.tableName);
    return {
      n: t.tableName,
      href: `/neo/object/${t.tableName}/`,
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
      href: s.exists ? objHref(s.code) : null,
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

  const hubs = [...deg.entries()]
    .map(([n, s]) => ({ n, deg: s.size, obj: objVar(zoneOf(n)), href: `/neo/object/${n}/` }))
    .sort((a, b) => b.deg - a.deg || a.n.localeCompare(b.n))
    .slice(0, 6);

  const cdsSet = new Set<string>();
  const fioriSet = new Set<string>();
  for (const t of distinct) {
    for (const v of cdsForTable(t.tableName)) cdsSet.add(v.view);
    if ((t.fioriApp || "").trim()) fioriSet.add(t.fioriApp!.trim());
  }

  /* --- S/4HANA as the forward context -------------------------------------
     lib/s4.ts is the project's own resolver: a curated Simplification-List
     entry wins, then a verified-stable flag, then a derivation from the
     blueprint's own S/4 column (marked "partial"), then nothing. Every table
     below therefore says HOW it is known, not only what it says. */
  const risk = { high: 0, medium: 0, low: 0, none: 0 };
  const trust = { verified: 0, partial: 0, needs: 0 };
  const has = { alt: 0, sum: 0, fiori: 0, note: 0 };
  const noteSet = new Set<string>();
  const changed: WsS4Row[] = [];
  const rowByName = new Map<string, WsRow>();
  for (const r of wsRows) if (!rowByName.has(r.n)) rowByName.set(r.n, r);

  for (const t of distinct) {
    const st = s4For(t.tableName, t.s4Note, t.s4AltTable);
    risk[st.risk]++;
    trust[st.trust]++;
    if (clean(t.s4Note || "")) has.note++;
    if (clean([t.s4AltTable, t.s4AltTcode].filter(Boolean).join(" "))) has.alt++;
    if (clean(t.sumNote || "")) has.sum++;
    if (clean(t.fioriApp || "")) has.fiori++;
    if (st.impact?.note) noteSet.add(st.impact.note);
    if (!st.impacted) continue;
    const row = rowByName.get(t.tableName);
    changed.push({
      n: t.tableName,
      he: t.descriptionHe || t.descriptionEn || "",
      href: `/neo/object/${t.tableName}/`,
      obj: objVar(zoneOf(t.tableName)),
      s4: s4Of(t),
      risk: st.risk,
      riskHe: RISK_HE[st.risk] || "",
      trust: st.trust,
      trustHe: TRUST_HE[st.trust] || "",
      changed: clean(st.impact?.changed || ""),
      why: clean(st.impact?.why || ""),
      note: clean(st.impact?.note || ""),
      s4Note: clean(t.s4Note || ""),
      s4Alt: row?.s4Alt || clean([t.s4AltTable, t.s4AltTcode].filter(Boolean).join(" · ")),
      sum: clean(t.sumNote || ""),
      fiori: clean(t.fioriApp || ""),
      tcodes: uniq(st.impact?.tcodes || []),
      cds: uniq(st.impact?.cds || []),
    });
  }
  // High risk first, then medium, then by name. Not an editorial ranking: it is
  // the resolver's own verdict, ordered.
  const RANK: Record<string, number> = { high: 0, medium: 1, low: 2, none: 3 };
  changed.sort((a, b) => RANK[a.risk] - RANK[b.risk] || a.n.localeCompare(b.n));

  /* --- interfaces, ranked by how far into the module they reach -----------
     Iterated over ROWS, not distinct tables, so this list holds exactly the
     same objects the header's normalised count reports. A table documented
     under two topics contributes its name once, because reach is a Set of
     table names — the count is deduped, the source rows are not. */
  const ifaceReach = new Map<string, { k: string; he: string; tables: Set<string> }>();
  for (const t of rows) {
    for (const [raw, he] of t.funcs || []) {
      const c = cleanFunc((raw || "").trim());
      if (!c) continue;
      const cur = ifaceReach.get(c) || { k: classifyFunc(c), he: "", tables: new Set<string>() };
      if (!cur.he) cur.he = clean(he);
      cur.tables.add(t.tableName);
      ifaceReach.set(c, cur);
    }
  }
  const ifaces: WsIface[] = [...ifaceReach.entries()]
    .map(([n, v]) => ({ n, k: v.k, he: v.he, tables: v.tables.size }))
    .sort((a, b) => b.tables - a.tables || a.n.localeCompare(b.n));

  /* --- CDS views over this module's tables, deduped ----------------------- */
  const cdsMap = new Map<string, { view: string; he: string; tables: string[] }>();
  for (const t of distinct) {
    for (const v of cdsForTable(t.tableName)) {
      if (!cdsMap.has(v.view)) cdsMap.set(v.view, { view: v.view, he: v.he, tables: [] });
      cdsMap.get(v.view)!.tables.push(t.tableName);
    }
  }
  const cdsList = [...cdsMap.values()]
    .map((v) => ({ ...v, tables: uniq(v.tables).sort() }))
    .sort((a, b) => b.tables.length - a.tables.length || a.view.localeCompare(b.view));

  /* --- Fiori apps, exactly as the blueprint names them -------------------- */
  const fioriMap = new Map<string, string[]>();
  for (const t of distinct) {
    const app = clean(t.fioriApp || "");
    if (!app) continue;
    fioriMap.set(app, [...(fioriMap.get(app) || []), t.tableName]);
  }
  const fioriList = [...fioriMap.entries()]
    .map(([app, tables]) => ({ app, tables: uniq(tables).sort() }))
    .sort((a, b) => b.tables.length - a.tables.length || a.app.localeCompare(b.app));

  const out: WsData = {
    key,
    code: key,
    he: key === "PM" ? "תחזוקת מפעל" : "תעשיות תהליכיות",
    en: key === "PM" ? "Plant Maintenance" : "Production Planning for Process Industries",
    lede:
      key === "PM"
        ? "ציוד, מיקומים פונקציונליים, הודעות תחזוקה והזמנות תחזוקה, כפי שהם מתועדים בתיעוד הטכני של הפרויקט. כל מספר בעמוד נגזר מהתיעוד."
        : "מתכוני אב, משאבים, הזמנות תהליך ואישורי ביצוע, כפי שהם מתועדים בתיעוד הטכני של הפרויקט. כל מספר בעמוד נגזר מהתיעוד.",
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

    s4: {
      kept: s4.kept.length,
      changed: s4.changed.length,
      replaced: s4.replaced.length,
      removed: s4.removed.length,
      undecided: s4.undecided.length,
    },

    s4x: { risk, trust, changed, notes: [...noteSet].sort(), has },

    sheets: SHEET_ORDER.map((k) => sheetOf(m, k)).filter((s): s is WsSheet => !!s),

    ifaces,
    cds: cdsList,
    fiori: fioriList,

    rel: {
      edges: edges.length,
      inside: edges.filter((e) => e.toExists).length,
      cards: [...cardCount.entries()].sort((a, b) => b[1] - a[1]).map(([label, n]) => ({ label, n })),
      none: edges.filter((e) => !(e.card || "").trim()).length,
      hubs,
    },

    // "Start here" is not an editorial pick: it is the table the dictionary
    // models the most neighbours for. If nothing is modelled, there is no
    // entry point and the workspace says nothing rather than nominating one.
    entry: hubs.length
      ? {
          n: hubs[0].n,
          he: wsRows.find((r) => r.n === hubs[0].n)?.he || "",
          obj: hubs[0].obj,
          href: hubs[0].href,
          deg: hubs[0].deg,
        }
      : null,

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
      href: SPINE_OF_SHELF[b.id] ? `/neo/books/${SPINE_OF_SHELF[b.id]}/` : null,
    })),

    courses: BOOKS.filter((b) => COURSE_MODULES[key].includes(b.module)).map((b) => ({
      id: b.id,
      he: b.titleHe,
      en: b.titleEn,
      module: b.module,
      chapters: Object.keys(b.data || {}).length,
      // The academy registry owns the route; it is not reconstructed here.
      href: b.base.endsWith("/") ? b.base : `${b.base}/`,
    })),

    rows: wsRows,
  };

  cache.set(key, out);
  return out;
}
