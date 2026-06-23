// Global SAP Knowledge Graph — one index connecting every object type
// (tables, CDS, BAPIs, FMs, IDocs, T-Codes, Fiori apps, migration objects,
// BW objects, modules). Built from the canonical dataset tables + curated
// layers. The UI explores it Bloom-style (center + neighbors, expand) so it
// scales to 1000+ nodes without rendering them all at once.

import { CDS_VIEWS } from "@/data/cds-map";
import { MIG_OBJECTS } from "@/data/migration-cockpit";
import { catalogByName } from "@/lib/s4-catalog";

export type NodeKind = "table" | "cds" | "consumption" | "bapi" | "fm" | "idoc" | "tcode" | "fiori" | "migration" | "module";
export interface RawTable { name: string; mod: string; he?: string; en?: string; tcodes?: string; fiori?: string; cds?: string[]; funcs?: string[]; s4?: string; rel?: { role: string; table: string; card?: string; desc?: string }[]; landscape?: string }
export interface GNode { id: string; kind: NodeKind; label: string; module?: string; he?: string; t?: RawTable }
export interface GEdge { to: string; label: string }
export interface GraphIndex { nodes: Map<string, GNode>; adj: Map<string, GEdge[]> }

export const KIND_META: Record<NodeKind, { he: string; c: string }> = {
  table: { he: "טבלה", c: "#0f172a" }, cds: { he: "CDS View", c: "#0d9488" }, consumption: { he: "Consumption", c: "#0891b2" },
  bapi: { he: "BAPI", c: "#2563eb" }, fm: { he: "Function Module", c: "#64748b" }, idoc: { he: "IDoc", c: "#7c3aed" },
  tcode: { he: "T-Code", c: "#d97706" }, fiori: { he: "Fiori App", c: "#0ea5e9" }, migration: { he: "אובייקט הגירה", c: "#16a34a" },
  module: { he: "מודול", c: "#d62027" },
};

const splitTc = (s?: string) => (s || "").split(/[^A-Za-z0-9_/]+/).map((x) => x.trim()).filter((x) => x.length >= 2 && /^[A-Z]/i.test(x));
const classify = (n: string): NodeKind => (/IDOC|MATMAS|ORDERS|^[A-Z]+05$/i.test(n) ? "idoc" : /^BAPI_/i.test(n) ? "bapi" : "fm");

export function buildGraph(tables: RawTable[]): GraphIndex {
  const nodes = new Map<string, GNode>();
  const adj = new Map<string, GEdge[]>();
  const node = (id: string, kind: NodeKind, label: string, module?: string, extra: Partial<GNode> = {}) => { if (!nodes.has(id)) nodes.set(id, { id, kind, label, module, ...extra }); return id; };
  const edge = (a: string, b: string, label: string) => {
    if (a === b) return;
    for (const [x, y] of [[a, b], [b, a]] as const) { const arr = adj.get(x) || []; if (!arr.some((e) => e.to === y)) { arr.push({ to: y, label }); adj.set(x, arr); } }
  };

  for (const t of tables) {
    const tid = node(`T:${t.name}`, "table", t.name, t.mod, { he: t.he, t });
    node(`MOD:${t.mod}`, "module", t.mod, t.mod);
    edge(tid, `MOD:${t.mod}`, "מודול");
    for (const r of t.rel || []) edge(tid, node(`T:${r.table}`, "table", r.table), r.desc || r.card || "קשר");
    for (const c of splitTc(t.tcodes)) edge(tid, node(`TC:${c}`, "tcode", c), "T-Code");
    for (const f of t.funcs || []) { const nm = String(f).split(" ")[0]; if (nm) edge(tid, node(`FN:${nm}`, classify(nm), nm), "API"); }
    for (const v of t.cds || []) edge(tid, node(`CDS:${v}`, "cds", v), "CDS");
    if (t.fiori) edge(tid, node(`FI:${t.fiori}`, "fiori", t.fiori), "Fiori");
  }
  // CDS chain (view → consumption → fiori) + cds↔tables
  for (const v of CDS_VIEWS) {
    const vid = node(`CDS:${v.view}`, "cds", v.view, v.module, { he: v.he });
    for (const tn of v.tables) if (nodes.has(`T:${tn}`)) edge(vid, `T:${tn}`, "מבוסס על");
    if (v.consumption) { const cid = node(`CDS:${v.consumption}`, "consumption", v.consumption, v.module); edge(vid, cid, "Consumption"); if (v.fiori) edge(cid, node(`FI:${v.fiori}`, "fiori", v.fiori), "Fiori"); }
    else if (v.fiori) edge(vid, node(`FI:${v.fiori}`, "fiori", v.fiori), "Fiori");
  }
  // migration objects ↔ source ECC tables
  for (const m of MIG_OBJECTS) { const mid = node(`MIG:${m.id}`, "migration", m.he, m.module, { he: m.name }); for (const e of m.ecc) if (nodes.has(`T:${e}`)) edge(mid, `T:${e}`, "אובייקט הגירה"); }

  return { nodes, adj };
}

export const neighbors = (g: GraphIndex, id: string): { node: GNode; label: string }[] =>
  (g.adj.get(id) || []).map((e) => ({ node: g.nodes.get(e.to)!, label: e.label })).filter((x) => x.node);
export const degree = (g: GraphIndex, id: string) => (g.adj.get(id) || []).length;

export function graphStats(g: GraphIndex) {
  const byKind: Record<string, number> = {};
  g.nodes.forEach((n) => (byKind[n.kind] = (byKind[n.kind] || 0) + 1));
  const ids = [...g.nodes.keys()];
  const topConnected = ids.map((id) => ({ id, d: degree(g, id) })).sort((a, b) => b.d - a.d).slice(0, 8).map((x) => x.id);
  const mostUsed = ids.filter((id) => g.nodes.get(id)!.kind === "table").map((id) => ({ id, tc: neighbors(g, id).filter((n) => n.node.kind === "tcode").length })).sort((a, b) => b.tc - a.tc).slice(0, 6).map((x) => x.id);
  const critMig = ids.filter((id) => g.nodes.get(id)!.kind === "migration").sort((a, b) => degree(g, b) - degree(g, a)).slice(0, 6);
  const highRisk = ids.filter((id) => { const n = g.nodes.get(id)!; if (n.kind !== "table") return false; const c = catalogByName(n.label); return c && (c.status === "removed" || c.status === "replaced"); }).sort((a, b) => degree(g, b) - degree(g, a)).slice(0, 8);
  return { total: g.nodes.size, edges: [...g.adj.values()].reduce((a, e) => a + e.length, 0) / 2, byKind, topConnected, mostUsed, critMig, highRisk };
}
