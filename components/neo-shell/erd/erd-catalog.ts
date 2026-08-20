// Project NEO · NEO ERD — the multi-module catalogue.
//
// SERVER ONLY. Runs at build time. Never import from a "use client" file.
//
// WHY THIS FILE EXISTS
//   components/neo-shell/erd/model.ts reads data/sapData.ts, which is the PM and
//   PP-PI migration blueprints and nothing else — 105 tables, two modules. That
//   is the whole reason the NEO data model looked smaller than the production
//   one: the production Architecture Explorer does not read sapData directly, it
//   reads public/sap-infrastructure/dataset.json (the canonical SAP model, 13
//   business modules) and picks its ERD membership out of ERD_MODULES in
//   app/sap-infrastructure/meta.ts.
//
//   This file reads THOSE TWO SOURCES and nothing else. app/sap-infrastructure/
//   is imported read-only and is not modified in any way.
//
// HONESTY RULE, inherited from model.ts and not relaxed
//   Every module, table, relation, cardinality, field, transaction and S/4
//   statement below is read verbatim out of the dataset. Nothing is inferred,
//   completed or paraphrased. Where the dataset is silent the shape carries an
//   explicit empty value so the UI can say "לא קיים מידע מאומת" instead of
//   guessing. The one derivation, stated plainly and identical to model.ts: a
//   relation row is stored on whichever side the dataset wrote it with a `role`
//   of parent or child, and turning that into a directed parent→child edge is a
//   re-reading of the same record, not new knowledge.
//
// THE ONE ENRICHMENT
//   Where an edge ALSO exists in the PM/PP-PI dictionary (model.ts), that
//   dictionary's verbatim JOIN wording is attached to it. Same edge, deeper
//   record — never a JOIN invented for an edge the dictionary does not hold.

import fs from "node:fs";
import path from "node:path";
import dagre from "dagre";
import {
  ERD_MODULES,
  MOD_FLOW,
  MOD_PURPOSE,
  MOD_REPORTS,
  OBJECTS,
} from "@/app/sap-infrastructure/meta";
import { s4For } from "@/lib/s4";
import { edges as dictEdges, tableNames } from "./model";
import {
  MODULE_ORDER,
  ZONE_HE,
  type ErdCatalog,
  type ErdEdgeOut,
  type ErdModuleOut,
  type ErdS4,
  type ErdTable,
  type ModCode,
  type RelKind,
} from "./erd-types";

export { MODULE_ORDER, ZONE_HE };
export type { ErdCatalog, ModCode, RelKind };

/* ------------------------------------------------- the HR and BW membership

   HR and BW were the ERD's two real gaps: the dataset carries HR and BW tables
   and the NEO graph offered neither, so the old surface showed 15 module chips
   and NEO showed 13.

   These two lists live HERE and not in app/sap-infrastructure/meta.ts on
   purpose. Production's page.tsx has HR and BW in its UNIVERSE and reaches them
   through erdMembers(), which falls back to "this module's tables by degree,
   top 16" whenever ERD_MODULES has no key. Adding the keys upstream would have
   silently replaced that fallback and changed what the frozen production ERD
   draws. Keeping them NEO-local leaves production on exactly the render it had.

   The membership is data-driven, not editorial. Each list is the module's own
   tables ranked by how many relations they hold WITHIN the module, then cut at
   the size the other lanes use. Every entry was checked to connect to at least
   one other entry, so neither lane opens as a field of isolated boxes: both are
   16 tables with 0 isolated nodes. BW resolves to a single connected component.
   HR resolves to TWO, and that is the dataset telling the truth rather than a
   gap in the list: the on-prem PA / HRP / T528B cluster and the SuccessFactors
   EC_/FO_/LMS_/PM_/RCM_ cluster hold no relation to each other in the record,
   so the lane is drawn as the two families it actually is. No table, relation
   or classification is invented — dataset.json's own `mod` and `rel` decide
   both lists.

   Both lists are 16, which is exactly what production's erdMembers() fallback
   yields for these two codes, so NEO and the frozen production ERD show the
   same HR and BW population rather than two different ones. */
const NEO_ONLY_MODULES: Record<string, string[]> = {
  HR: ["PA0001", "HRP1000", "EC_JobInformation", "PA0007", "PA0008", "PA2001", "HRP1007", "T528B", "EC_EmployeeProfile", "EC_Position", "FO_Department", "FO_Division", "LMS_LearningItem", "PM_Goal", "PM_PerformanceForm", "RCM_JobRequisition"],
  BW: ["ADSO", "RSTRAN", "ROOSOURCE", "RSDS", "RSDIOBJ", "CompositeProvider", "RSBKDTP", "RSPCCHAIN", "RSRREPDIR", "RSZCOMPDIR", "RSZELTDIR", "SAC_Story", "CDS_AnalyticalView", "ROOSFIELD", "ODP_Queue", "RSDIOBJT"],
};

/** ERD_MODULES as NEO reads it: production's record, plus the two lanes
 *  production reaches by fallback instead of by key. Production itself is
 *  untouched and keeps its own behaviour. */
const NEO_MODULES: Record<string, string[]> = { ...ERD_MODULES, ...NEO_ONLY_MODULES };

/* ------------------------------------------------------------- raw dataset */

interface RawRel {
  role: "parent" | "child";
  table: string;
  card?: string;
  desc?: string;
}

interface RawTable {
  name: string;
  mod: string;
  real?: boolean;
  en?: string;
  he?: string;
  tcodes?: string;
  fiori?: string;
  s4?: string;
  s4alt?: string;
  pk?: string[];
  fields?: [string, string, string, string][];
  funcs?: string[];
  cds?: string[];
  topic?: string;
  topicIdx?: number;
  rel?: RawRel[];
  degree?: number;
  zone?: string;
  guideHe?: string;
}

interface RawBlueprint {
  code: string;
  purpose?: string;
}

interface RawDataset {
  modules: { code: string; name: string; he: string; kind?: string }[];
  blueprints: RawBlueprint[];
  tables: RawTable[];
  shared: { name: string; he: string }[];
}

let _raw: RawDataset | null = null;

/** The canonical dataset, read once from public/. Read with fs rather than
 *  imported so TypeScript never has to infer a 220-table literal type, and so
 *  the file stays the single artefact both this route and the production
 *  Architecture Explorer consume. */
function raw(): RawDataset {
  if (_raw) return _raw;
  const p = path.join(process.cwd(), "public", "sap-infrastructure", "dataset.json");
  _raw = JSON.parse(fs.readFileSync(p, "utf8")) as RawDataset;
  return _raw;
}

/* ------------------------------------------------------------------- types */

/** Object class, from the dataset's OWN five-zone vocabulary. Not a second,
 *  divergent classification — the dataset's `zone` field, mapped onto the
 *  --obj-* tokens app/globals.css already defines for visualisation surfaces. */
const ZONE_OBJ: Record<string, string> = {
  Master: "var(--obj-master)",
  Transaction: "var(--obj-transaction)",
  Shared: "var(--obj-structure)",
  Finance: "var(--obj-movement)",
  Integration: "var(--obj-text)",
};

const clean = (s?: string) => (s || "").replace(/\s+/g, " ").trim();

/** The project's S/4HANA standing for one table, resolved by the SAME function
 *  the production Architecture Explorer calls (lib/s4.ts → data/s4-impact.ts +
 *  the dictionary's own S/4 column). Called here, at build time, so the browser
 *  receives a finished record and never imports the impact dataset.
 *
 *  Returns null where the project holds no decision at all. That null is the
 *  point: the workspace renders it as "לא קיים מידע מאומת בפרויקט" and never
 *  fills the gap with an inference. */
function s4Standing(name: string, s4?: string, s4alt?: string): ErdS4 | null {
  const st = s4For(name, s4, s4alt);
  if (!st.impact) return null;
  return {
    r: st.impact.risk,
    t: st.impact.trust,
    ch: clean(st.impact.changed),
    wy: clean(st.impact.why),
    nt: clean(st.impact.note),
    fl: (st.impact.fields || []).map((f) => clean(f.field)).filter(Boolean),
  };
}

const kindOf = (card?: string): RelKind => {
  const c = clean(card).toUpperCase().replace(/\s/g, "");
  if (c === "1:1") return "1-1";
  if (c === "N:N" || c === "M:N") return "n-n";
  if (c === "N:1" || c === "1:N") return "n-1";
  return "unstated";
};

/** The same tokenisation of the free-text transaction column model.ts uses —
 *  one splitter for the whole product, never a second divergent one. */
export const splitTcodes = (s?: string): string[] => [
  ...new Set(
    (s || "")
      .split(/[,;\s]+/)
      .map((x) => x.trim().toUpperCase().replace(/[.]+$/, ""))
      .filter((x) => /^[A-Z][A-Z0-9_/]{1,}$/.test(x)),
  ),
];

/* ------------------------------------------------------------- the reading */

interface Catalog {
  tables: Map<string, RawTable>;
  /** Module memberships per table: its own module plus every module whose
   *  ERD_MODULES list names it. */
  mods: Map<string, ModCode[]>;
  /** Every table in scope — the union of the 13 ERD_MODULES lists and every
   *  dataset table whose own module is one of the 13. */
  scope: Set<string>;
}

let _cat: Catalog | null = null;

function catalog(): Catalog {
  if (_cat) return _cat;
  const d = raw();
  const tables = new Map<string, RawTable>();
  for (const t of d.tables) tables.set(t.name, t);

  const inOrder = new Set<string>(MODULE_ORDER);
  const scope = new Set<string>();
  const mods = new Map<string, ModCode[]>();

  const add = (name: string, m: ModCode) => {
    const list = mods.get(name) || [];
    if (!list.includes(m)) list.push(m);
    mods.set(name, list);
  };

  // Every table the dataset assigns to one of the 13 modules.
  for (const t of d.tables) {
    if (!inOrder.has(t.mod)) continue;
    scope.add(t.name);
    add(t.name, t.mod as ModCode);
  }
  // Plus the curated ERD membership, which is deliberately cross-module: MARA
  // belongs to the PP, PP-PI, MM, SD, QM, BATCH, CLASS, IDOC and PIPO pictures.
  for (const m of MODULE_ORDER) {
    for (const name of NEO_MODULES[m] || []) {
      if (!tables.has(name)) continue;
      scope.add(name);
      add(name, m);
    }
  }
  // Keep membership in reading order rather than discovery order.
  for (const [k, v] of mods) mods.set(k, MODULE_ORDER.filter((m) => v.includes(m)));

  _cat = { tables, mods, scope };
  return _cat;
}

/* ------------------------------------------------------------------- edges */

export interface CatEdge {
  id: string;
  /** Table holding the primary key. */
  p: string;
  /** Table holding the foreign key. */
  c: string;
  kind: RelKind;
  /** Verbatim cardinality, "" when the dataset left it blank. */
  card: string;
  /** Verbatim Hebrew description of the relation. */
  desc: string;
  /** true when the two tables sit in different primary modules. */
  cross: boolean;
  /** Verbatim JOIN wording, present only for edges the PM/PP-PI dictionary
   *  also documents. */
  says: { m: string; join: string; desc: string; pk: string; fk: string }[];
}

let _edges: CatEdge[] | null = null;

function allEdges(): CatEdge[] {
  if (_edges) return _edges;
  const { tables, scope } = catalog();
  const byId = new Map<string, CatEdge>();

  for (const name of scope) {
    const t = tables.get(name);
    if (!t) continue;
    for (const r of t.rel || []) {
      if (!r.table || r.table === name) continue;
      if (!scope.has(r.table)) continue;
      const p = r.role === "parent" ? name : r.table;
      const c = r.role === "parent" ? r.table : name;
      const id = `${p}>${c}`;
      const prev = byId.get(id);
      if (prev) {
        // Same edge written from the other side. Never overwrite a stated
        // cardinality or description with a blank one.
        if (prev.kind === "unstated" && r.card) {
          prev.kind = kindOf(r.card);
          prev.card = clean(r.card);
        }
        if (!prev.desc && r.desc) prev.desc = clean(r.desc);
        continue;
      }
      byId.set(id, {
        id,
        p,
        c,
        kind: kindOf(r.card),
        card: clean(r.card),
        desc: clean(r.desc),
        cross: (tables.get(p)?.mod || "") !== (tables.get(c)?.mod || ""),
        says: [],
      });
    }
  }

  // Attach the dictionary's verbatim JOIN wording where it holds the same edge.
  for (const e of dictEdges()) {
    const hit = byId.get(e.id);
    if (!hit) continue;
    hit.says = e.says.map((s) => ({ m: s.mod, join: s.join, desc: s.desc, pk: s.pk, fk: s.fk }));
  }

  _edges = [...byId.values()].sort((a, b) => a.id.localeCompare(b.id));
  return _edges;
}

/* --------------------------------------------------------------- geometry */

export const NODE_W = 200;
export const NODE_H = 88;
export const MOD_W = 228;
export const MOD_H = 116;

/** Deterministic dagre layout for one set of names. Solved here, at build time,
 *  exactly as the Architecture Explorer solves its own — the browser receives
 *  finished coordinates and never runs a layout engine. */
function layout(
  names: string[],
  es: { p: string; c: string }[],
  w: number,
  h: number,
): { pos: Map<string, { x: number; y: number }>; w: number; h: number } {
  const g = new dagre.graphlib.Graph();
  g.setGraph({
    rankdir: "LR",
    ranker: "network-simplex",
    ranksep: 170,
    nodesep: 34,
    edgesep: 16,
    marginx: 70,
    marginy: 70,
  });
  g.setDefaultEdgeLabel(() => ({}));
  const set = new Set(names);
  for (const n of [...names].sort()) g.setNode(n, { width: w, height: h });
  for (const e of es) if (set.has(e.p) && set.has(e.c)) g.setEdge(e.p, e.c);
  try {
    dagre.layout(g);
  } catch {
    /* best effort — a degenerate graph still gets the fallback grid below */
  }
  const pos = new Map<string, { x: number; y: number }>();
  [...names].sort().forEach((n, i) => {
    const p = g.node(n) as { x?: number; y?: number } | undefined;
    const ok = Number.isFinite(p?.x) && Number.isFinite(p?.y);
    pos.set(n, ok ? { x: Math.round(p!.x!), y: Math.round(p!.y!) } : { x: 90 + (i % 6) * (w + 60), y: 90 + Math.floor(i / 6) * (h + 60) });
  });
  const gr = g.graph() as { width?: number; height?: number };
  const gw = Number.isFinite(gr.width) && (gr.width as number) > 0 ? Math.round(gr.width as number) : 1200;
  const gh = Number.isFinite(gr.height) && (gr.height as number) > 0 ? Math.round(gr.height as number) : 720;
  return { pos, w: gw, h: gh };
}

/* ------------------------------------------------------------ the payload */
//
// The payload SHAPE lives in ./erd-types.ts so the browser can hold it without
// pulling this file — and therefore node:fs, dagre and the SAP datasets — into
// its bundle. Nothing is redeclared here.


let _out: ErdCatalog | null = null;

export function erdCatalog(): ErdCatalog {
  if (_out) return _out;
  const d = raw();
  const { tables, mods, scope } = catalog();
  const es = allEdges();
  const pages = new Set(tableNames());

  const deg = new Map<string, number>();
  for (const e of es) {
    deg.set(e.p, (deg.get(e.p) || 0) + 1);
    deg.set(e.c, (deg.get(e.c) || 0) + 1);
  }

  const names = [...scope].sort((a, b) => a.localeCompare(b));
  const outTables: ErdTable[] = names.map((n) => {
    const t = tables.get(n)!;
    const fields = (t.fields || []).map(
      (f) => [clean(f[0]), clean(f[1]), clean(f[2]), clean(f[3]) || "-"] as [string, string, string, string],
    );
    const zone = t.zone && ZONE_OBJ[t.zone] ? t.zone : "Transaction";
    return {
      n,
      he: clean(t.he),
      en: clean(t.en),
      m: (t.mod as ModCode) || (mods.get(n) || ["PM"])[0],
      ms: mods.get(n) || [],
      z: zone,
      o: ZONE_OBJ[zone],
      f: fields.slice(0, 16),
      fn: fields.length,
      pk: fields.filter((f) => f[3] === "PK").map((f) => f[0]).length
        ? fields.filter((f) => f[3] === "PK").map((f) => f[0])
        : (t.pk || []).map(clean).filter(Boolean),
      fk: fields.filter((f) => f[3] === "FK").map((f) => f[0]),
      d: deg.get(n) || 0,
      tc: splitTcodes(t.tcodes),
      fi: clean(t.fiori),
      s4: clean(t.s4),
      s4a: clean(t.s4alt),
      fu: (t.funcs || []).map(clean).filter(Boolean).slice(0, 10),
      cds: (t.cds || []).map(clean).filter(Boolean).slice(0, 8),
      tp: clean(t.topic),
      g: clean(t.guideHe),
      pg: pages.has(n) ? 1 : 0,
      r: t.real ? 1 : 0,
      s4v: s4Standing(n, clean(t.s4), clean(t.s4alt)),
    };
  });

  const outEdges: ErdEdgeOut[] = es.map((e) => ({
    i: e.id,
    p: e.p,
    c: e.c,
    k: e.kind,
    cd: e.card,
    ds: e.desc,
    x: e.cross ? 1 : 0,
    j: e.says.map((y) => ({ m: y.m, j: y.join, d: y.desc, pk: y.pk, fk: y.fk })),
  }));

  const purposeOf = (code: string) =>
    clean(d.blueprints.find((b) => b.code === code)?.purpose) || clean(MOD_PURPOSE[code]) || "";

  const heOf = (code: string) => {
    const m = d.modules.find((x) => x.code === code);
    if (m?.he) return clean(m.he);
    // The four modules the dataset does not list carry their name inside
    // MOD_PURPOSE, before the em dash. Read, not invented.
    const p = clean(MOD_PURPOSE[code]);
    return p ? p.split("—")[0].trim() : code;
  };
  const enOf = (code: string) => clean(d.modules.find((x) => x.code === code)?.name) || code;

  const outModules: ErdModuleOut[] = MODULE_ORDER.map((code) => {
    const core = (NEO_MODULES[code] || []).filter((n) => scope.has(n));
    const coreSet = new Set(core);
    const more = names.filter((n) => tables.get(n)?.mod === code && !coreSet.has(n));
    const all = [...core, ...more];
    const allSet = new Set(all);
    const inScopeEdges = es.filter((e) => allSet.has(e.p) && allSet.has(e.c));
    const coreEdges = inScopeEdges.filter((e) => coreSet.has(e.p) && coreSet.has(e.c));
    // Two solved pictures. The curated ERD is what opens; the whole module is a
    // deliberate second act, and it gets its own layout so neither picture is
    // the other one with holes punched in it.
    const lCore = layout(core, coreEdges, NODE_W, NODE_H);
    const l = layout(all, inScopeEdges, NODE_W, NODE_H);

    const topicMap = new Map<string, string[]>();
    for (const n of all) {
      const tp = clean(tables.get(n)?.topic);
      if (!tp) continue;
      const list = topicMap.get(tp) || [];
      list.push(n);
      topicMap.set(tp, list);
    }

    return {
      code,
      he: heOf(code),
      en: enOf(code),
      purpose: purposeOf(code),
      core,
      more,
      reports: MOD_REPORTS[code] || [],
      flow: (MOD_FLOW[code] || []).map((s) => ({ he: s.he, en: s.en })),
      objects: (OBJECTS[code] || [])
        .map((o) => ({ he: o.he, en: o.en, t: o.tables.filter((x) => allSet.has(x)) }))
        .filter((o) => o.t.length > 0),
      topics: [...topicMap.entries()]
        .sort((a, b) => a[0].localeCompare(b[0], "he", { numeric: true }))
        .map(([t, ta]) => ({ t, ta })),
      pos: core.map((n) => ({ n, ...(lCore.pos.get(n) || { x: 0, y: 0 }) })),
      w: lCore.w,
      h: lCore.h,
      posAll: all.map((n) => ({ n, ...(l.pos.get(n) || { x: 0, y: 0 }) })),
      wAll: l.w,
      hAll: l.h,
      es: inScopeEdges.map((e) => e.id),
      ec: coreEdges.map((e) => e.id),
    };
  });

  /* --------------------------------------------------------- the overview */
  // A module-to-module link exists only where real table relations cross
  // between the two modules' pictures. The count IS the number of those
  // relations — the label on the link is a measurement, not a rating.
  const memberOf = new Map<ModCode, Set<string>>(
    outModules.map((m) => [m.code, new Set([...m.core, ...m.more])]),
  );
  const modsOf = (n: string) => MODULE_ORDER.filter((m) => memberOf.get(m)!.has(n));
  const linkCount = new Map<string, number>();
  for (const e of es) {
    const A = modsOf(e.p);
    const B = modsOf(e.c);
    const pairs = new Set<string>();
    for (const a of A) {
      for (const b of B) {
        if (a === b) continue;
        // One unordered pair per relation: an edge is one piece of evidence,
        // however many module pictures happen to contain both of its ends.
        pairs.add([a, b].sort().join(">"));
      }
    }
    for (const k of pairs) linkCount.set(k, (linkCount.get(k) || 0) + 1);
  }
  const links = [...linkCount.entries()]
    .map(([k, n]) => {
      const [a, b] = k.split(">") as [ModCode, ModCode];
      return { a, b, n };
    })
    // Only links carried by more than a single relation get a place on the
    // overview; a one-off would draw 13 modules as a solid mesh and say nothing.
    .filter((l) => l.n >= 4)
    .sort((a, b) => b.n - a.n);

  // The overview is NOT laid out by dagre. 13 modules carry 44 measured
  // cross-links, which is a mesh, and a hierarchical ranker answers a mesh by
  // spreading it over three screens — measured, 3230x1227, which fits at 25%
  // and turns thirteen readable cards into thirteen grey rectangles. A map of a
  // fixed, ordered set is a DIRECTORY: a deterministic grid in MODULE_ORDER,
  // laid out right-to-left because the interface is Hebrew, with the links
  // drawn as chords across it. Same information, and it fits at ~65%.
  const OV_COLS = 4;
  const OV_GX = 64;
  const OV_GY = 72;
  const OV_M = 70;
  const ovPos = new Map<string, { x: number; y: number }>();
  MODULE_ORDER.forEach((code, i) => {
    const col = i % OV_COLS;
    const row = Math.floor(i / OV_COLS);
    ovPos.set(code, {
      // (COLS-1-col) puts the first module on the RIGHT.
      x: OV_M + (OV_COLS - 1 - col) * (MOD_W + OV_GX) + MOD_W / 2,
      y: OV_M + row * (MOD_H + OV_GY) + MOD_H / 2,
    });
  });
  const ovRows = Math.ceil(MODULE_ORDER.length / OV_COLS);
  const ov = {
    pos: ovPos,
    w: OV_M * 2 + OV_COLS * MOD_W + (OV_COLS - 1) * OV_GX,
    h: OV_M * 2 + ovRows * MOD_H + (ovRows - 1) * OV_GY,
  };

  const memberships = MODULE_ORDER.reduce((s, m) => s + (NEO_MODULES[m] || []).length, 0);

  _out = {
    tables: outTables,
    edges: outEdges,
    modules: outModules,
    overview: {
      pos: MODULE_ORDER.map((code) => ({ code, ...(ov.pos.get(code) || { x: 0, y: 0 }) })),
      w: ov.w,
      h: ov.h,
      links,
    },
    shared: d.shared.map((s) => s.name).filter((n) => scope.has(n)),
    nw: NODE_W,
    nh: NODE_H,
    mw: MOD_W,
    mh: MOD_H,
    stats: {
      modules: MODULE_ORDER.length,
      memberships,
      tables: outTables.length,
      edges: outEdges.length,
      stated: outEdges.filter((e) => e.k !== "unstated").length,
      unstated: outEdges.filter((e) => e.k === "unstated").length,
      cross: outEdges.filter((e) => e.x === 1).length,
      shared: outTables.filter((t) => t.ms.length > 1).length,
      isolated: outTables.filter((t) => t.d === 0).length,
      withJoin: outEdges.filter((e) => e.j.some((s) => s.j)).length,
      pages: outTables.filter((t) => t.pg === 1).length,
      s4known: outTables.filter((t) => t.s4v).length,
      s4verified: outTables.filter((t) => t.s4v?.t === "verified").length,
    },
  };
  return _out;
}
