// First-class non-table SAP objects (T-Codes, BAPIs, FMs, IDocs, Processes) —
// every record DERIVED from the real dataset (ALL_TABLES + MODULES topics).
// No fabricated entries. classify() is heuristic and is labeled "auto-derived" in UI.

import { ALL_TABLES, MODULES } from "@/data/sapData";
import type { Module } from "@/lib/types";
import { CDS_VIEWS } from "@/data/cds-map";
import { DOMAINS } from "@/data/domains";

export type FuncKind = "BAPI" | "IDoc" | "FM";

// Canonical route key: drop trailing " - <hebrew>", " (<variant>)", and " / " compounds,
// keep only the leading clean identifier. Prevents splinter pages + %2F-in-path 404s.
export function cleanFunc(name: string): string {
  return (name || "").split(/\s*[/(]|\s+-\s/)[0].trim().replace(/[^A-Za-z0-9_]+$/, "");
}

// Explicit IDoc basic-type allowlist (no broad report-program catch-all).
const IDOC_RE = /^(MATMAS|LOIPRO|ORDERS\d*|DELVRY\d*|SHPMNT\d*|INVOIC\d*|DESADV\d*|WMMBXY|PROACT|DELINS)$/;
export function classifyFunc(name: string): FuncKind {
  const c = cleanFunc(name);
  if (IDOC_RE.test(c)) return "IDoc";
  if (/^BAPI_/.test(c)) return "BAPI";
  return "FM";
}
// canonical href for a function object (clean key, kind-correct route)
export function funcHref(name: string): string {
  const c = cleanFunc(name);
  return `/${classifyFunc(c) === "IDoc" ? "idoc" : "bapi"}/${encodeURIComponent(c)}`;
}

const splitTc = (s: string) => (s || "").split(/[^A-Za-z0-9_]+/).map((c) => c.trim()).filter((c) => c.length >= 2 && /^[A-Z][A-Z0-9_]*$/i.test(c));

export interface TableRef { name: string; module: Module; he: string }
const ref = (t: typeof ALL_TABLES[number]): TableRef => ({ name: t.tableName, module: t.module, he: t.descriptionHe || t.descriptionEn });

/* ---------- T-Codes ---------- */
export interface TcodeIntel { code: string; tables: TableRef[]; modules: Module[] }
export function tcodeIntel(code: string): TcodeIntel | null {
  const cu = code.toUpperCase();
  const tables = ALL_TABLES.filter((t) => splitTc(t.tcodes).some((c) => c.toUpperCase() === cu)).map(ref);
  if (!tables.length) return null;
  return { code: cu, tables, modules: [...new Set(tables.map((t) => t.module))] };
}
export function listTcodes(): string[] {
  const s = new Set<string>();
  ALL_TABLES.forEach((t) => splitTc(t.tcodes).forEach((c) => s.add(c.toUpperCase())));
  return [...s];
}

/* ---------- Functions: BAPI / IDoc / FM ---------- */
export interface FuncIntel { name: string; kind: FuncKind; he: string; tables: TableRef[]; modules: Module[] }
export function funcIntel(name: string): FuncIntel | null {
  const key = cleanFunc(name);
  const owners = ALL_TABLES.filter((t) => (t.funcs || []).some((f) => cleanFunc(f[0]) === key));
  if (!owners.length) return null;
  const he = owners.flatMap((t) => t.funcs).find((f) => cleanFunc(f[0]) === key)?.[1] || "";
  return { name: key, kind: classifyFunc(key), he, tables: owners.map(ref), modules: [...new Set(owners.map((t) => t.module))] };
}
// canonical clean func names (deduped), optionally by kind
export function listFuncs(kind?: FuncKind): string[] {
  const s = new Set<string>();
  ALL_TABLES.forEach((t) => (t.funcs || []).forEach((f) => { const c = cleanFunc(f[0]); if (c && (!kind || classifyFunc(c) === kind)) s.add(c); }));
  return [...s];
}

/* ---------- Processes (= module topics, real) ---------- */
export interface ProcessIntel { slug: string; module: Module; title: string; tables: TableRef[]; tcodes: string[]; bapis: string[] }
const clean = (t: string) => t.replace(/^\s*\d+\.\s*/, "").replace(/\s*\($/, "").trim();
export function listProcesses(): { slug: string; module: Module; title: string; count: number }[] {
  const out: { slug: string; module: Module; title: string; count: number }[] = [];
  for (const m of MODULES) (m.topics || []).forEach((tp) => { if ((tp.tables || []).length) out.push({ slug: `${m.module}-${tp.idx}`, module: m.module, title: clean(tp.title), count: tp.tables.length }); });
  return out;
}
export function processIntel(slug: string): ProcessIntel | null {
  // slug = `${module}-${idx}`; module may itself contain "-" (e.g. PP-PI) → split on LAST hyphen
  const i = slug.lastIndexOf("-"); const mod = slug.slice(0, i); const idx = Number(slug.slice(i + 1));
  const m = MODULES.find((x) => x.module === mod); const tp = m?.topics.find((x) => x.idx === idx);
  if (!m || !tp) return null;
  const tcodes = [...new Set(tp.tables.flatMap((t) => splitTc(t.tcodes).map((c) => c.toUpperCase())))].slice(0, 16);
  const bapis = [...new Set(tp.tables.flatMap((t) => (t.funcs || []).map((f) => f[0])))].slice(0, 12);
  return { slug, module: m.module, title: clean(tp.title), tables: tp.tables.map(ref), tcodes, bapis };
}

/* ---------- Typed search across all object kinds ---------- */
export type SearchKind = "table" | "tcode" | "bapi" | "idoc" | "fm" | "cds" | "domain" | "process";
export interface SearchHit { kind: SearchKind; label: string; sub: string; href: string; module?: Module }
export function searchObjects(query: string, perGroup = 6): Record<SearchKind, SearchHit[]> {
  const q = query.trim().toLowerCase();
  const empty = { table: [], tcode: [], bapi: [], idoc: [], fm: [], cds: [], domain: [], process: [] } as Record<SearchKind, SearchHit[]>;
  if (!q) return empty;
  const out = { table: [], tcode: [], bapi: [], idoc: [], fm: [], cds: [], domain: [], process: [] } as Record<SearchKind, SearchHit[]>;
  // tables
  for (const t of ALL_TABLES) {
    if (out.table.length >= perGroup) break;
    if (t.tableName.toLowerCase().includes(q) || t.descriptionHe.includes(query) || t.descriptionEn.toLowerCase().includes(q))
      out.table.push({ kind: "table", label: t.tableName, sub: t.descriptionHe || t.descriptionEn, href: `/object/${encodeURIComponent(t.tableName)}`, module: t.module });
  }
  // tcodes
  for (const c of listTcodes()) { if (out.tcode.length >= perGroup) break; if (c.toLowerCase().includes(q)) out.tcode.push({ kind: "tcode", label: c, sub: "T-Code", href: `/tcode/${encodeURIComponent(c)}` }); }
  // funcs split by kind (clean canonical names)
  for (const n of listFuncs()) {
    const k = classifyFunc(n); const bucket = k === "BAPI" ? out.bapi : k === "IDoc" ? out.idoc : out.fm;
    if (bucket.length >= perGroup) continue;
    if (n.toLowerCase().includes(q)) bucket.push({ kind: k.toLowerCase() as SearchKind, label: n, sub: k, href: funcHref(n) });
  }
  // cds views
  for (const v of CDS_VIEWS) { if (out.cds.length >= perGroup) break; if (v.view.toLowerCase().includes(q) || v.he.includes(query)) out.cds.push({ kind: "cds", label: v.view, sub: `${v.he} · ${v.tables.join(", ")}`, href: `/cds/${encodeURIComponent(v.view)}`, module: v.module }); }
  // domains
  for (const d of DOMAINS) { if (out.domain.length >= perGroup) break; if (d.title.toLowerCase().includes(q) || d.he.includes(query) || d.module.toLowerCase().includes(q)) out.domain.push({ kind: "domain", label: d.he, sub: `${d.module} · ${d.title}`, href: `/domain/${d.slug}`, module: d.module as Module }); }
  // processes
  for (const p of listProcesses()) { if (out.process.length >= perGroup) break; if (p.title.includes(query) || p.module.toLowerCase().includes(q)) out.process.push({ kind: "process", label: p.title, sub: `${p.module} · ${p.count} טבלאות`, href: `/process/${encodeURIComponent(p.slug)}`, module: p.module }); }
  return out;
}
