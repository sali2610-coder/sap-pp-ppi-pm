/* ============================================================================
   PROJECT NEO · MODULE SECTIONS — /neo/pm/<section>/ and /neo/pp-pi/<section>/
   ----------------------------------------------------------------------------
   SERVER ONLY, build time. The fifteen sections of the pre-NEO module portal
   (components/module-section.tsx over lib/module-portal.ts) rebuilt at their
   old address under /neo/. Every list below is derived by the SAME helpers the
   legacy renderer used, from the same datasets: the two blueprints
   (data/sapData), the capability-pipeline records (master-data facets, the
   PP-PI process flow and SPRO tree), the incident, exit and consultant-note
   catalogues. Nothing is authored here.

   LINKS. An href is a string only when the NEO page behind it is generated:
   the reference families are gated by ../reference/ref-links (the lists their
   routes build from), incidents, domains and exits by the datasets their
   routes read. A value with no page is still shown, as a value.
   ========================================================================== */

import { PM_DATA, PPPI_DATA } from "@/data/sapData";
import {
  NAV_SECTIONS, bestPractices, eccS4, enhancements, funcs, incidents, moduleTables,
  processSteps, sectionLevel, type S4Row, type SectionMeta,
} from "@/lib/module-portal";
import { classifyFunc, cleanFunc } from "@/lib/object-intel";
import { cdsForTable } from "@/data/cds-map";
import { CONSULTANT_NOTES } from "@/data/consultant-notes";
import { INCIDENTS } from "@/data/troubleshooting";
import { DOMAINS } from "@/data/domains";
import { EXITS, exitSlug } from "@/data/exits";
import { FIORI_APPS } from "@/data/fiori/apps";
import { PM_MASTER_DATA_FACETS, type MasterDataFacet } from "@/data/pm-master-data-facets";
import { PPPI_MASTER_DATA_FACETS } from "@/data/pppi-master-data-facets";
import { PPPI_CONFIG_TREE, type SAPConfigArea } from "@/data/pppi-config-tree";
import { PPPI_PROCESS_FLOW, type ProcessPhase } from "@/data/pppi-process-flow";
import type { S4Class } from "@/lib/s4-class";
import { s4Of, s4WordOf } from "../data/s4-verdict";
import { bapiHref, cdsHref, fioriHref, idocHref, objectHref, txHref } from "../reference/ref-links";
import type { SAPModuleData, SAPSheet } from "@/lib/types";
import { splitTcodes } from "@/lib/tcode-split";

/* ---------------------------------------------------------------- modules */

export interface MsModule {
  hub: string;
  code: "PM" | "PP-PI";
  he: string;
  /** The module page, and the label the shell's own fallback map gives it. */
  home: string;
  back: string;
  data: SAPModuleData;
}

const MODS: Record<string, MsModule> = {
  pm: { hub: "pm", code: "PM", he: "תחזוקת מפעל", home: "/neo/pm/", back: "PM · תחזוקת מפעל", data: PM_DATA },
  "pp-pi": { hub: "pp-pi", code: "PP-PI", he: "ייצור תהליכי", home: "/neo/pp-pi/", back: "PP-PI · ייצור תהליכי", data: PPPI_DATA },
};

export const msModule = (hub: string): MsModule | null => MODS[hub] ?? null;
export const msSections: SectionMeta[] = NAV_SECTIONS;
export const msSection = (slug: string) => NAV_SECTIONS.find((s) => s.slug === slug) ?? null;
/** Only the two module hubs carry sections; every other hub keeps its one page. */
export const msParams = () =>
  Object.keys(MODS).flatMap((hub) => NAV_SECTIONS.map((s) => ({ hub, section: s.slug })));
export { sectionLevel };

/* ------------------------------------------------------------------ links */

const memo = <T,>(fn: () => T): (() => T) => {
  let v: T | undefined;
  let done = false;
  return () => { if (!done) { v = fn(); done = true; } return v as T; };
};
const incSet = memo(() => new Set(INCIDENTS.map((i) => i.slug)));
const domSet = memo(() => new Set(DOMAINS.map((d) => d.slug)));
const exitSet = memo(() => new Set(EXITS.map((e) => exitSlug(e.name))));

export { bapiHref, cdsHref, idocHref, objectHref, txHref };
export const incidentHref = (slug: string): string | null =>
  incSet().has(slug) ? `/neo/incidents/${encodeURIComponent(slug)}/` : null;
export const domainHref = (slug?: string): string | null =>
  slug && domSet().has(slug) ? `/neo/domain/${slug}/` : null;
export const exitHref = (name: string): string | null =>
  exitSet().has(exitSlug(name)) ? `/neo/exits/${exitSlug(name)}/` : null;
/** A function object: an IDoc message type lives at /neo/idoc, the rest at /neo/bapi. */
export const funcHref = (name: string): string | null =>
  classifyFunc(name) === "IDoc" ? idocHref(name) : bapiHref(name);

/** The blueprint names a Fiori app in free text ("Report Malfunction (F2215)",
 *  "Manage Work Centers (אמת ID)"). It is linked only when the text carries an
 *  app ID the curated set holds, or names that app exactly. Nothing is guessed. */
export function fioriAppHref(text: string): string | null {
  const ids: string[] = text.match(/\bF\d{3,5}[A-Z]?\b/g) ?? [];
  const name = text.replace(/\s*\(.*$/, "").trim().toLowerCase();
  const hit = FIORI_APPS.find((a) => ids.includes(a.id)) ?? FIORI_APPS.find((a) => a.name.toLowerCase() === name);
  return hit ? fioriHref(hit.slug) : null;
}

/* -------------------------------------------------------------- utilities */

const clean = (s?: string) => (s || "").replace(/\s+/g, " ").trim();
const uniq = <T,>(a: T[]) => [...new Set(a)];
/** Every dictionary ROW (topic × table): a table documented under two topics is two rows. */
const rowsOf = (m: SAPModuleData) => m.topics.flatMap((tp) => tp.tables);

/** A topic title as the blueprint wrote it, ordinal apart. The PP-PI extractor
 *  cut several titles mid-word ("(Production Ver"): the cut stays visible as
 *  "…)" rather than being completed, and a lone "(" at the end is dropped. */
export function topicHead(raw: string): { n: string; t: string } {
  const s = clean(raw);
  const m = s.match(/^(\d+)\.\s*(.*)$/);
  let t = (m ? m[2] : s).replace(/\s*\($/, "");
  if ((t.match(/\(/g) || []).length > (t.match(/\)/g) || []).length) t = `${t}…)`;
  return { n: m ? m[1] : "", t };
}

/* ------------------------------------------------------- the derivations */

/** s4 is the verdict (data/s4-verdict.ts), the same one the module page and the
 *  table page show; word is what the row prints for it. */
export interface MsRow { code: string; he: string; f: number; s4: S4Class | null; word: string }
export const tableGroups = (m: SAPModuleData) =>
  m.topics.map((tp) => ({
    ...topicHead(tp.title),
    rows: tp.tables.map((t): MsRow => ({
      code: t.tableName, he: t.descriptionHe || t.descriptionEn || "", f: t.fields.length, s4: s4Of(t), word: s4WordOf(t),
    })),
  }));

export interface MsEdge { from: string; to: string; card: string; join: string; desc: string }
/** The ER edges, deduped from → to exactly as lib/module-portal relationships()
 *  does, with the JOIN condition the blueprint writes on each one. */
export function edgesOf(m: SAPModuleData) {
  const seen = new Set<string>();
  const out: MsEdge[] = [];
  for (const t of moduleTables(m)) for (const r of t.relations || []) {
    const k = `${t.tableName}|${r.table}`;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push({ from: t.tableName, to: r.table, card: clean(r.card), join: clean(r.join), desc: clean(r.desc) });
  }
  const by = new Map<string, MsEdge[]>();
  for (const e of out) by.set(e.from, [...(by.get(e.from) || []), e]);
  const deg = new Map<string, number>();
  for (const e of out) for (const n of [e.from, e.to]) deg.set(n, (deg.get(n) || 0) + 1);
  return {
    edges: out,
    groups: [...by.entries()].sort((a, b) => b[1].length - a[1].length),
    hubs: [...deg.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10),
  };
}

/** T-Codes and the module tables the blueprint maps onto each. */
export function txOf(m: SAPModuleData) {
  const map = new Map<string, string[]>();
  for (const t of moduleTables(m)) for (const c of uniq(splitTcodes(t.tcodes))) map.set(c, [...(map.get(c) || []), t.tableName]);
  return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([code, tables]) => ({ code, tables }));
}

export interface MsFunc { name: string; kind: string; he: string; tables: string[] }
/** Interface objects of the module (lib/object-intel normalisation), with the
 *  blueprint's own Hebrew line and the tables that name each one. */
export function funcsOf(m: SAPModuleData, kinds: string[]): MsFunc[] {
  const map = new Map<string, MsFunc>();
  for (const t of moduleTables(m)) for (const [raw, he] of t.funcs || []) {
    const name = cleanFunc(raw);
    if (!name) continue;
    const kind = classifyFunc(name);
    if (!kinds.includes(kind)) continue;
    const cur = map.get(name) || { name, kind, he: "", tables: [] };
    if (!cur.he) cur.he = clean(he);
    if (!cur.tables.includes(t.tableName)) cur.tables.push(t.tableName);
    map.set(name, cur);
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export function cdsOf(m: SAPModuleData) {
  const map = new Map<string, { view: string; he: string; tables: string[] }>();
  for (const t of moduleTables(m)) for (const v of cdsForTable(t.tableName)) {
    const cur = map.get(v.view) || { view: v.view, he: clean(v.he), tables: [] };
    cur.tables.push(t.tableName);
    map.set(v.view, cur);
  }
  return [...map.values()].sort((a, b) => a.view.localeCompare(b.view));
}

export function fioriOf(m: SAPModuleData) {
  const map = new Map<string, string[]>();
  for (const t of moduleTables(m)) {
    const app = clean(t.fioriApp);
    if (app) map.set(app, [...(map.get(app) || []), t.tableName]);
  }
  return [...map.entries()].map(([app, tables]) => ({ app, tables, href: fioriAppHref(app) }));
}

/** Tables outside the module that its ER map reaches, and the table that reaches them. */
export function relatedOf(m: SAPModuleData) {
  const own = new Set(moduleTables(m).map((t) => t.tableName));
  const map = new Map<string, { code: string; desc: string; from: string[] }>();
  for (const t of moduleTables(m)) for (const r of t.relations || []) {
    if (own.has(r.table)) continue;
    const cur = map.get(r.table) || { code: r.table, desc: clean(r.desc), from: [] };
    if (!cur.from.includes(t.tableName)) cur.from.push(t.tableName);
    map.set(r.table, cur);
  }
  return [...map.values()];
}

export const facetsOf = (code: string): MasterDataFacet[] =>
  code === "PM" ? PM_MASTER_DATA_FACETS : PPPI_MASTER_DATA_FACETS;
export const flowOf = (code: string): ProcessPhase[] => (code === "PP-PI" ? PPPI_PROCESS_FLOW : []);
export const cfgTreeOf = (code: string): SAPConfigArea[] => (code === "PP-PI" ? PPPI_CONFIG_TREE : []);

/** Consultant notes per module table, with the note's own trust level. */
export const notesOf = (m: SAPModuleData) =>
  bestPractices(m).map((b) => ({ ...b, trust: CONSULTANT_NOTES[b.code]?.trust || "curated" }));

/** The module's tables in the VERDICT's buckets (data/s4-verdict.ts), each row
 *  as lib/module-portal eccS4 builds it (the blueprint's alternative table and
 *  S/4 note). eccS4 buckets by the blueprint's column, which on 43 PM and PP-PI
 *  tables said something other than the verdict the module page shows. */
export function s4BucketsOf(m: SAPModuleData) {
  const e = eccS4(m);
  const row = new Map([...e.kept, ...e.changed, ...e.replaced, ...e.removed, ...e.undecided].map((r) => [r.code, r]));
  const out = { kept: [] as S4Row[], changed: [] as S4Row[], replaced: [] as S4Row[], removed: [] as S4Row[], undecided: [] as S4Row[] };
  for (const t of moduleTables(m)) {
    const r = row.get(t.tableName);
    if (!r) continue;
    const k = s4Of(t);
    (k === null ? out.undecided : k === 0 ? out.kept : k === 1 ? out.changed : k === 2 ? out.replaced : out.removed).push(r);
  }
  return out;
}
export type { S4Row };

/* ------------------------------------------------------------ the sheets */

export type SheetKey = "simplification" | "config" | "customCode" | "tcodesDir" | "tools" | "ppvs";
const KEYCOL: Record<SheetKey, RegExp> = {
  simplification: /Simplification Item/i, config: /אובייקט קונפיגורציה/, customCode: /קוד \/ שם טכני/,
  tcodesDir: /T-Code/i, tools: /כלי/, ppvs: /היבט/,
};
export interface MsSheet { title: string; headers: string[]; rows: string[][]; keyCol: number }
/** An aux sheet of the blueprint, verbatim: its own headers, its own row order. */
export function sheetOf(m: SAPModuleData, key: SheetKey): MsSheet | null {
  const s: SAPSheet | undefined = m[key];
  if (!s || !s.rows.length) return null;
  let keyCol = s.headers.findIndex((h) => KEYCOL[key].test(h || ""));
  if (keyCol < 0) keyCol = Math.max(0, s.headers.findIndex((h) => !/^מס'/.test((h || "").trim())));
  return { title: clean(s.title), headers: s.headers.map(clean), rows: s.rows, keyCol };
}

/* ------------------------------------------------------ section counts */

/** The number of items each section page lists, from the same derivations its
 *  body renders, so the index and the page cannot disagree. */
export function sectionCount(mod: MsModule, slug: string): number {
  const m = mod.data;
  switch (slug) {
    case "business-process": return flowOf(mod.code).reduce((a, p) => a + p.steps.length, 0) || processSteps(m).length;
    case "master-data": return facetsOf(mod.code).length;
    case "transactions": return txOf(m).length;
    case "tables": return rowsOf(m).length;
    case "relationships": return edgesOf(m).edges.length;
    case "configuration": return sheetOf(m, "config")?.rows.length || cfgTreeOf(mod.code).reduce((a, x) => a + x.nodes.length, 0);
    case "integration": return funcs(m, ["IDoc", "BAPI"]).length;
    case "bapis": return funcsOf(m, ["BAPI", "FM"]).length;
    case "cds": return cdsOf(m).length;
    case "fiori": return fioriOf(m).length;
    case "enhancements": return enhancements(m).length;
    case "troubleshooting": return incidents(m).length;
    case "related": return relatedOf(m).length;
    case "best-practices": return bestPractices(m).length;
    case "ecc-s4": return moduleTables(m).length;
    default: return 0;
  }
}
