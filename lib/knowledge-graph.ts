// SAP Knowledge Graph — relationship traversal over the generated dataset.
// Edge semantics from SAPRelation: role "child" → THIS table depends on r.table (upstream);
// role "parent" → r.table depends on THIS (downstream). Plus reverse refs.

import { ALL_TABLES } from "@/data/sapData";
import type { SAPTable } from "@/lib/types";

const byName = new Map(ALL_TABLES.map((t) => [t.tableName, t]));
export const tableByName = (n: string): SAPTable | undefined => byName.get(n);

export type GRole = "center" | "upstream" | "downstream";
export interface GNode { name: string; module: string; he: string; role: GRole; exists: boolean }
export interface GEdge { from: string; to: string; card?: string; desc?: string }
export interface KGraph {
  center: SAPTable;
  upstream: string[];   // tables THIS depends on
  downstream: string[]; // tables that depend on THIS
  nodes: GNode[];
  edges: GEdge[];
}

function node(name: string, role: GRole): GNode {
  const t = byName.get(name);
  return { name, role, exists: !!t, module: t?.module ?? "?", he: t?.descriptionHe ?? "" };
}

export function kgraph(name: string): KGraph | null {
  const c = byName.get(name);
  if (!c) return null;
  const upstream = [...new Set(c.relations.filter((r) => r.role === "child").map((r) => r.table))];
  const ownChildren = c.relations.filter((r) => r.role === "parent").map((r) => r.table);
  const refs = ALL_TABLES.filter((t) => t.relations.some((r) => r.table === c.tableName)).map((t) => t.tableName);
  const downstream = [...new Set([...ownChildren, ...refs])].filter((n) => n !== c.tableName && !upstream.includes(n));

  const nodes: GNode[] = [node(c.tableName, "center"), ...upstream.map((n) => node(n, "upstream")), ...downstream.map((n) => node(n, "downstream"))];
  const edges: GEdge[] = [];
  c.relations.forEach((r) => {
    if (r.role === "child" && upstream.includes(r.table)) edges.push({ from: r.table, to: c.tableName, card: r.card, desc: r.desc });
    if (r.role === "parent" && downstream.includes(r.table)) edges.push({ from: c.tableName, to: r.table, card: r.card, desc: r.desc });
  });
  refs.forEach((rn) => {
    if (!downstream.includes(rn)) return;
    const rt = byName.get(rn); const rel = rt?.relations.find((r) => r.table === c.tableName);
    if (!edges.find((e) => e.from === c.tableName && e.to === rn)) edges.push({ from: c.tableName, to: rn, card: rel?.card, desc: rel?.desc });
  });
  return { center: c, upstream, downstream, nodes, edges };
}

// Trace a dependency path (BFS chain) for a quick "object flow" line.
export function tracePath(name: string, dir: "up" | "down", max = 6): string[] {
  const out: string[] = [name]; let cur = name; const seen = new Set([name]);
  while (out.length < max) {
    const t = byName.get(cur); if (!t) break;
    const next = dir === "up"
      ? t.relations.find((r) => r.role === "child" && !seen.has(r.table))?.table
      : t.relations.find((r) => r.role === "parent" && !seen.has(r.table))?.table;
    if (!next) break;
    out.push(next); seen.add(next); cur = next;
  }
  return out;
}
