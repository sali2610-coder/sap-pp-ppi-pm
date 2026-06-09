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
