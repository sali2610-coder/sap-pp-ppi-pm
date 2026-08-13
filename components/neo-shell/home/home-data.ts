// Project NEO · Stage 2A — the Home data layer.
//
// Runs on the SERVER at build time (imported only by app/neo/page.tsx, a server
// component). The SAP datasets it reads never reach the browser: the single
// plain, serialisable object it returns is what crosses into the client scene.
//
// HONESTY RULE, inherited from nav-data.ts and not relaxed here: every number,
// name, note and join below is derived from the project dataset by the SAME
// helpers the corresponding page renders from. Nothing is a literal, nothing is
// an estimate, and where the dictionary holds nothing the shape carries an
// explicit "missing" marker so the page can say so out loud.
//
// Two counts that look like typos and are not:
//   · 126 dictionary ROWS over 105 UNIQUE tables — 19 tables are documented
//     twice because they genuinely live in both PM and PP-PI.
//   · PM 56 + PP-PI 68 = 124, minus the 19 shared counted once = 105.
// The page states both numbers rather than picking the flattering one.

import { ALL_TABLES, PM_DATA, PPPI_DATA } from "@/data/sapData";
import {
  eccS4,
  funcs,
  moduleTables,
  overviewStats,
  processSteps,
  transactions,
} from "@/lib/module-portal";
import { ZONES, zoneOf, type Zone } from "@/lib/studio-graph";
import { cdsForTable } from "@/data/cds-map";
import { LIBRARY, LIBRARY_STATS } from "@/data/library";
import type { SAPModuleData, SAPTable } from "@/lib/types";
import type { ModuleKey } from "../types";

/* ------------------------------------------------------------------ types */

/** Membership band. Drives the gravity formation: 0 = PM only, 1 = both
 *  (the real 19), 2 = PP-PI only. */
export type Band = 0 | 1 | 2;
/** S/4HANA class, straight out of lib/module-portal's eccS4(). */
export type S4Class = 0 | 1 | 2; // kept · replaced · removed

/** One real merged SAP table = one dot. Keys are short because 105 of these
 *  are serialised into the static HTML of every /neo build. */
export interface HomeDot {
  /** Table name — a real SAP identifier, always rendered LTR-isolated. */
  n: string;
  /** Hebrew description as the dictionary holds it. */
  he: string;
  /** Membership band. */
  b: Band;
  /** Documented fields (max across the modules that document it). */
  f: number;
  /** Functional zone id (lib/studio-graph zoneOf) — the object class. */
  z: Zone;
  /** Modelled ER relations. */
  r: number;
  /** Distinct transactions mapped onto it. */
  t: number;
  /** S/4HANA class. */
  s: S4Class;
  /** Documentation coverage, 0..6 — how many of the six axes it satisfies. */
  d: number;
}

export interface HomeModule {
  key: ModuleKey;
  /** SAP module code, LTR. */
  code: string;
  he: string;
  en: string;
  href: string;
  /** var(--mod-*) reference. */
  m: string;
  tables: number;
  fields: number;
  topics: number;
  tcodes: number;
  funcs: number;
  cds: number;
  fiori: number;
  books: number;
  /** Share of the 105 merged tables this module touches, 0..1. */
  share: number;
}

export interface SharedRow {
  n: string;
  he: string;
  f: number;
  z: Zone;
  /** Topic title inside PM. */
  pm: string;
  /** Topic title inside PP-PI. */
  pp: string;
}

export interface CoverageAxis {
  he: string;
  /** Tables (out of the 105) that carry this. */
  n: number;
  /** Short honest note when the number is low. */
  note: string;
}

export interface DensityTopic {
  key: ModuleKey;
  idx: number;
  title: string;
  tables: number;
  fields: number;
}

export interface FlowStep {
  code: string;
  label: string;
  /** false ⇒ the step is a real process step whose table is not in this
   *  module's dictionary. The page says so instead of drawing a fake node. */
  exists: boolean;
  f: number | null;
  z: Zone;
  /** Modelled ER relations this step's table carries in this module. */
  rels: number;
  /** Modelled link to the NEXT step. `via` is set when the dictionary reaches
   *  it in two hops through a real intermediate table. null ⇒ the crossing is
   *  a genuine process boundary the dictionary does not model, and the page
   *  draws it as one instead of inventing an arrow. */
  link: { card: string; join: string; via: string | null } | null;
}

export interface FlowChain {
  key: ModuleKey;
  he: string;
  m: string;
  steps: FlowStep[];
  /** Hops the dictionary models directly. */
  direct: number;
  /** Hops it reaches through one intermediate table. */
  via: number;
  hops: number;
}

export interface MigrationRow {
  n: string;
  he: string;
  /** Verbatim from the dictionary. Never paraphrased. */
  note: string;
  /** Replacement table / transaction as the dictionary states it, or "". */
  alt: string;
  s: S4Class;
  mods: ModuleKey[];
}

export interface HomeData {
  dictRows: number;
  tables: number;
  shared: number;
  fields: number;
  tcodes: number;
  funcs: number;
  relations: number;
  topics: number;
  books: number;
  bookChapters: number;
  bookPages: number;
  modules: HomeModule[];
  dots: HomeDot[];
  /** Largest field count in the dictionary — the scale reference for the field. */
  maxFields: number;
  sharedRows: SharedRow[];
  coverage: CoverageAxis[];
  density: DensityTopic[];
  /** Largest table count over all topics — the density scale reference. */
  maxTopicTables: number;
  flows: FlowChain[];
  migration: { kept: number; replaced: number; removed: number };
  migrationRows: MigrationRow[];
  zones: { id: Zone; he: string; n: number }[];
}

/* ------------------------------------------------------------ small utils */

const uniq = <T,>(a: T[]) => [...new Set(a)];

const splitTcodes = (s: string) =>
  (s || "")
    .split(/[,\s/]+/)
    .map((x) => x.trim().toUpperCase())
    .filter((x) => /^[A-Z][A-Z0-9_]{1,}$/.test(x));

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
/** Object-class hue for a zone. Exported so the client scene and the legend
 *  read the SAME mapping nav-data.ts already uses — one classification. */
export const zoneVar = (z: Zone) => ZONE_OBJ[z];
export const ZONE_HE: Record<Zone, string> = Object.fromEntries(
  ZONES.map((z) => [z.id, z.he]),
) as Record<Zone, string>;

const MOD_VAR: Record<ModuleKey, string> = { PM: "var(--mod-pm)", "PP-PI": "var(--mod-pppi)" };

/* --------------------------------------------------------------- the build */

type Occ = { table: SAPTable; key: ModuleKey };

function occurrences(): Map<string, Occ[]> {
  const map = new Map<string, Occ[]>();
  for (const m of [PM_DATA, PPPI_DATA] as SAPModuleData[]) {
    for (const t of moduleTables(m)) {
      const list = map.get(t.tableName) || [];
      list.push({ table: t, key: m.module as ModuleKey });
      map.set(t.tableName, list);
    }
  }
  return map;
}

/** S/4 class per module row, then merged worst-first: a table that is gone in
 *  one module's blueprint is gone, even if the other blueprint kept it. */
function s4ByTable(): Map<string, S4Class> {
  const out = new Map<string, S4Class>();
  for (const m of [PM_DATA, PPPI_DATA] as SAPModuleData[]) {
    const { replaced, removed } = eccS4(m);
    for (const r of replaced) out.set(r.code, Math.max(out.get(r.code) ?? 0, 1) as S4Class);
    for (const r of removed) out.set(r.code, 2);
  }
  return out;
}

function moduleOf(m: SAPModuleData, key: ModuleKey, mergedTotal: number): HomeModule {
  const st = overviewStats(m);
  return {
    key,
    code: key,
    he: key === "PM" ? "אחזקת מפעל" : "ייצור תהליכי",
    en: key === "PM" ? "Plant Maintenance" : "Production Planning · Process Industries",
    href: key === "PM" ? "/neo/pm/" : "/neo/pp-pi/",
    m: MOD_VAR[key],
    tables: st.tables,
    fields: st.fields,
    topics: st.topics,
    tcodes: st.transactions,
    funcs: funcs(m, ["BAPI", "FM", "IDoc"]).length,
    cds: st.cds,
    fiori: st.fiori,
    books: LIBRARY.filter((b) => (key === "PP-PI" ? b.module === "PP-PI" || b.module === "PP" : b.module === key)).length,
    share: st.tables / mergedTotal,
  };
}

function chainOf(m: SAPModuleData, key: ModuleKey): FlowChain {
  const steps = processSteps(m);
  const tables = moduleTables(m);
  const byName = new Map(tables.map((t) => [t.tableName, t]));
  const clean = (s: string) => (s || "").replace(/\s+/g, " ").trim().slice(0, 160);
  /** Neighbours of a table as the DICTIONARY states them — both directions,
   *  because a relation is stored on whichever side the blueprint wrote it. */
  const near = (a: string) => {
    const out = new Map<string, { card: string; join: string }>();
    for (const r of byName.get(a)?.relations || []) out.set(r.table, { card: r.card || "", join: clean(r.join) });
    for (const t of tables) {
      for (const r of t.relations || []) {
        if (r.table === a && !out.has(t.tableName)) out.set(t.tableName, { card: r.card || "", join: clean(r.join) });
      }
    }
    return out;
  };
  // A→B counts as reached only through a real stored relation: directly, or via
  // ONE intermediate table that the dictionary links to both ends. Nothing is
  // inferred beyond that — an unreached crossing stays a process boundary and
  // the page draws it as one instead of inventing an arrow.
  const linkOf = (a: string, b: string): FlowStep["link"] => {
    const na = near(a);
    const direct = na.get(b);
    if (direct) return { ...direct, via: null };
    const nb = near(b);
    for (const [mid, ra] of na) {
      const rb = nb.get(mid);
      if (rb) return { card: ra.card || rb.card || "", join: ra.join || rb.join, via: mid };
    }
    return null;
  };
  const out: FlowStep[] = steps.map((s, i) => {
    const t = byName.get(s.code);
    const next = steps[i + 1];
    return {
      code: s.code,
      label: s.label,
      exists: s.exists,
      f: t ? t.fields.length : null,
      z: zoneOf(s.code),
      rels: near(s.code).size,
      link: next ? linkOf(s.code, next.code) : null,
    };
  });
  return {
    key,
    he: key === "PM" ? "אחזקת מפעל" : "ייצור תהליכי",
    m: MOD_VAR[key],
    steps: out,
    direct: out.filter((s) => s.link && !s.link.via).length,
    via: out.filter((s) => s.link?.via).length,
    hops: Math.max(0, out.length - 1),
  };
}

let cached: HomeData | null = null;

export function homeData(): HomeData {
  if (cached) return cached;

  const occ = occurrences();
  const s4 = s4ByTable();
  const merged = [...occ.keys()];

  const dots: HomeDot[] = merged.map((name) => {
    const list = occ.get(name)!;
    const lead = list[0].table;
    const keys = uniq(list.map((o) => o.key));
    const fields = Math.max(...list.map((o) => o.table.fields.length));
    const rels = uniq(list.flatMap((o) => (o.table.relations || []).map((r) => r.table))).length;
    const codes = uniq(list.flatMap((o) => splitTcodes(o.table.tcodes))).length;
    const hasCds = cdsForTable(name).length > 0;
    const hasFiori = list.some((o) => !!(o.table.fioriApp || "").trim());
    const hasNote = list.some((o) => !!(o.table.s4Note || "").trim());
    const d =
      (fields > 0 ? 1 : 0) + (codes > 0 ? 1 : 0) + (rels > 0 ? 1 : 0) +
      (hasCds ? 1 : 0) + (hasFiori ? 1 : 0) + (hasNote ? 1 : 0);
    return {
      n: name,
      he: lead.descriptionHe || lead.descriptionEn || "",
      b: (keys.length > 1 ? 1 : keys[0] === "PM" ? 0 : 2) as Band,
      f: fields,
      z: zoneOf(name),
      r: rels,
      t: codes,
      s: s4.get(name) ?? 0,
      d,
    };
  });

  // Order groups PM · shared · PP-PI so the gravity formation reads as two
  // bodies with the shared band physically between them, then by depth so the
  // richest tables land at the front of every formation.
  dots.sort((a, b) => a.b - b.b || b.f - a.f || a.n.localeCompare(b.n));

  const sharedRows: SharedRow[] = dots
    .filter((d) => d.b === 1)
    .map((d) => {
      const list = occ.get(d.n)!;
      const topic = (k: ModuleKey) => list.find((o) => o.key === k)?.table.topicTitle || "";
      return { n: d.n, he: d.he, f: d.f, z: d.z, pm: topic("PM"), pp: topic("PP-PI") };
    })
    .sort((a, b) => b.f - a.f || a.n.localeCompare(b.n));

  // Six documentation axes over the same 105 merged tables. Two of them come
  // out low, and that is the point: the section reports the gaps rather than
  // choosing the axes that flatter the dataset.
  const total = dots.length;
  const rowsOf = (name: string) => occ.get(name)!;
  const axis = (he: string, fn: (d: HomeDot) => boolean): CoverageAxis => {
    const n = dots.filter(fn).length;
    return { he, n, note: n === total ? "מלא" : `${total - n} ללא` };
  };
  const coverage: CoverageAxis[] = [
    axis("שדות מתועדים", (d) => d.f > 0),
    axis("הערת S/4HANA", (d) => rowsOf(d.n).some((o) => !!(o.table.s4Note || "").trim())),
    axis("טרנזקציה ממופה", (d) => d.t > 0),
    axis("קשר ER ממודל", (d) => d.r > 0),
    axis("תצוגת CDS", (d) => cdsForTable(d.n).length > 0),
    axis("אפליקציית Fiori", (d) => rowsOf(d.n).some((o) => !!(o.table.fioriApp || "").trim())),
  ];

  const density: DensityTopic[] = [PM_DATA, PPPI_DATA].flatMap((m) =>
    m.topics.map((tp) => ({
      key: m.module as ModuleKey,
      idx: tp.idx,
      title: tp.title,
      tables: tp.tables.length,
      fields: tp.tables.reduce((a, t) => a + t.fields.length, 0),
    })),
  );

  const migration = {
    kept: dots.filter((d) => d.s === 0).length,
    replaced: dots.filter((d) => d.s === 1).length,
    removed: dots.filter((d) => d.s === 2).length,
  };

  const migrationRows: MigrationRow[] = dots
    .filter((d) => d.s > 0)
    .map((d) => {
      const list = occ.get(d.n)!;
      const lead = list.find((o) => (o.table.s4Note || "").trim()) || list[0];
      const alt = uniq(
        list.flatMap((o) => [(o.table.s4AltTable || "").trim(), (o.table.s4AltTcode || "").trim()]),
      ).filter(Boolean).join(" · ");
      return {
        n: d.n,
        he: d.he,
        note: (lead.table.s4Note || "").replace(/\s+/g, " ").trim(),
        alt,
        s: d.s,
        mods: uniq(list.map((o) => o.key)),
      };
    })
    .sort((a, b) => b.s - a.s || a.n.localeCompare(b.n));

  const zoneCount = new Map<Zone, number>();
  for (const d of dots) zoneCount.set(d.z, (zoneCount.get(d.z) || 0) + 1);

  cached = {
    dictRows: ALL_TABLES.length,
    tables: total,
    shared: sharedRows.length,
    fields: ALL_TABLES.reduce((a, t) => a + t.fields.length, 0),
    tcodes: uniq([...transactions(PM_DATA), ...transactions(PPPI_DATA)].map((t) => t.code)).length,
    funcs: uniq([...funcs(PM_DATA, ["BAPI", "FM", "IDoc"]), ...funcs(PPPI_DATA, ["BAPI", "FM", "IDoc"])].map((f) => f.name)).length,
    relations: PM_DATA.relations.length + PPPI_DATA.relations.length,
    topics: PM_DATA.topics.length + PPPI_DATA.topics.length,
    books: LIBRARY_STATS.books,
    bookChapters: LIBRARY_STATS.chapters,
    bookPages: LIBRARY_STATS.pages,
    modules: [moduleOf(PM_DATA, "PM", total), moduleOf(PPPI_DATA, "PP-PI", total)],
    dots,
    maxFields: Math.max(...dots.map((d) => d.f)),
    sharedRows,
    coverage,
    density,
    maxTopicTables: Math.max(...density.map((d) => d.tables)),
    flows: [chainOf(PM_DATA, "PM"), chainOf(PPPI_DATA, "PP-PI")],
    migration,
    migrationRows,
    zones: ZONES.filter((z) => (zoneCount.get(z.id) || 0) > 0).map((z) => ({
      id: z.id,
      he: z.he,
      n: zoneCount.get(z.id) || 0,
    })),
  };
  return cached;
}
