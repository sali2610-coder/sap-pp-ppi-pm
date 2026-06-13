// Data access + client-side search helpers over the generated knowledge base.

import { ALL_TABLES, MODULES, PM_DATA, PPPI_DATA } from "@/data/sapData";
import type { Module, SAPModuleData, SAPTable } from "@/lib/types";

export { ALL_TABLES, MODULES, PM_DATA, PPPI_DATA };

export function getModule(module: Module): SAPModuleData {
  return module === "PM" ? PM_DATA : PPPI_DATA;
}

export function tablesForModule(module: Module): SAPTable[] {
  return getModule(module).topics.flatMap((t) => t.tables);
}

// Pre-built lowercase haystack per table for instant client-side filtering.
const HAYSTACK = new Map<string, string>(
  ALL_TABLES.map((t) => [
    t.id,
    [
      t.tableName,
      t.descriptionHe,
      t.descriptionEn,
      t.tcodes,
      t.topicTitle,
      t.guideHe,
      ...t.fields.map((f) => `${f.tech} ${f.he} ${f.en}`),
      ...t.funcs.map((f) => f[0]),
    ]
      .join(" ")
      .toLowerCase(),
  ]),
);

export interface SearchResult {
  table: SAPTable;
  /** which facet matched, for a small hint badge */
  hit: "table" | "field" | "tcode" | "desc";
}

export function searchTables(query: string, scope?: Module): SearchResult[] {
  const q = query.trim().toLowerCase();
  const pool = scope ? tablesForModule(scope) : ALL_TABLES;
  if (!q) return pool.map((table) => ({ table, hit: "table" }));

  const terms = q.split(/\s+/).filter(Boolean);
  const out: SearchResult[] = [];
  for (const table of pool) {
    const hay = HAYSTACK.get(table.id) ?? "";
    if (!terms.every((term) => hay.includes(term))) continue;
    let hit: SearchResult["hit"] = "desc";
    if (table.tableName.toLowerCase().includes(q)) hit = "table";
    else if (table.fields.some((f) => f.tech.toLowerCase().includes(q))) hit = "field";
    else if (table.tcodes.toLowerCase().includes(q)) hit = "tcode";
    out.push({ table, hit });
  }
  return out;
}

// ===== Command-palette grouped search =====
export interface TCodeHit {
  code: string;
  desc: string;
  module: Module;
  href: string;
}
export interface BapiHit {
  name: string;
  he: string;
  tableName: string;
  module: Module;
  href: string;
}
export interface LibHit {
  ch: number;
  id: string;
  title: string;
  href: string;
}
export interface GroupedResults {
  tables: SAPTable[];
  tcodes: TCodeHit[];
  bapis: BapiHit[];
  library: LibHit[];
}

// Slim Book #1 section index (title + id + snippet) for Omni-Search.
import BOOK1_INDEX from "@/data/library/book1-index.json";
const BOOK1 = BOOK1_INDEX as { ch: number; id: string; title: string; snippet: string }[];

const hrefFor = (m: Module, q: string) =>
  `/${m === "PM" ? "pm" : "pp-pi"}/?q=${encodeURIComponent(q)}`;

// ===== Object Intelligence (search = navigation engine) =====
export interface FoundIn { label: string; href: string }
export interface ObjectIntel {
  table: SAPTable;
  type: string;
  related: string[];     // related table names (relations + reverse refs)
  tcodes: string[];
  bapis: string[];
  process: string;       // owning topic / process
  books: string[];       // book labels referencing it
  foundIn: FoundIn[];
  counts: { references: number; processes: number; books: number; related: number };
}

const splitTc = (s: string) => (s || "").split(/[^A-Za-z0-9_]+/).map((c) => c.trim()).filter((c) => c.length >= 2 && /^[A-Z][A-Z0-9_]*$/i.test(c));

export function objectIntel(name: string): ObjectIntel | null {
  const key = (name || "").trim().toLowerCase();
  if (!key) return null;
  const t = ALL_TABLES.find((x) => x.tableName.toLowerCase() === key)
    || ALL_TABLES.find((x) => x.tableName.toLowerCase().startsWith(key) && key.length >= 3);
  if (!t) return null;
  const fwd = t.relations.map((r) => r.table);
  const rev = ALL_TABLES.filter((x) => x.relations.some((r) => r.table === t.tableName)).map((x) => x.tableName);
  const related = [...new Set([...fwd, ...rev])].filter((x) => x && x !== t.tableName);
  const tcodes = [...new Set(splitTc(t.tcodes))].slice(0, 8);
  const bapis = [...new Set(t.funcs.map((f) => f[0]).filter(Boolean))].slice(0, 6);
  const nm = t.tableName.toLowerCase();
  const books: string[] = [];
  if (BOOK1.some((s) => `${s.id} ${s.title} ${s.snippet}`.toLowerCase().includes(nm))) books.push("Book 1");
  const hubLabel = t.module === "PM" ? "PM Hub" : "PP-PI Hub";
  const hubHref = `/${t.module === "PM" ? "pm" : "pp-pi"}/?q=${encodeURIComponent(t.tableName)}`;
  const foundIn: FoundIn[] = [
    { label: hubLabel, href: hubHref },
    { label: "SAP Architecture", href: "/sap-infrastructure/" },
  ];
  if (t.module === "PM") foundIn.push({ label: "Academy", href: "/library/pm-academy/" });
  books.forEach((b) => foundIn.push({ label: b, href: "/library/book1/" }));
  return {
    table: t, type: "Table", related, tcodes, bapis, process: t.topicTitle, books, foundIn,
    counts: { references: rev.length + 1, processes: 1, books: books.length, related: related.length },
  };
}

export function searchAll(query: string, limit = 6): GroupedResults {
  const q = query.trim().toLowerCase();
  if (!q) return { tables: [], tcodes: [], bapis: [], library: [] };

  const tables = searchTables(q)
    .slice(0, limit)
    .map((r) => r.table);

  const tcodes: TCodeHit[] = [];
  for (const m of MODULES) {
    for (const row of m.tcodesDir?.rows ?? []) {
      const code = row[1] ?? row[0] ?? "";
      const desc = row.slice(2).find((c) => c && c.length > 8) ?? "";
      if (`${code} ${desc}`.toLowerCase().includes(q)) {
        tcodes.push({ code, desc, module: m.module, href: hrefFor(m.module, code) });
      }
      if (tcodes.length >= limit) break;
    }
  }

  const bapis: BapiHit[] = [];
  for (const t of ALL_TABLES) {
    for (const [name, he] of t.funcs) {
      if (name.toLowerCase().includes(q)) {
        bapis.push({ name, he, tableName: t.tableName, module: t.module, href: hrefFor(t.module, t.tableName) });
      }
    }
    if (bapis.length >= limit) break;
  }

  const library: LibHit[] = [];
  for (const s of BOOK1) {
    if (`${s.id} ${s.title} ${s.snippet}`.toLowerCase().includes(q)) {
      library.push({ ch: s.ch, id: s.id, title: s.title, href: "/library/book1/" });
    }
    if (library.length >= limit) break;
  }

  return { tables, tcodes: tcodes.slice(0, limit), bapis: bapis.slice(0, limit), library };
}
