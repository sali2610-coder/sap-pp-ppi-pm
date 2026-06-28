// SAP Architecture Studio — full-module relationship layout. Takes a module
// (PM / PP-PI), builds the real ER graph from the dataset's relations, and runs
// a dagre layout so the whole module reads like a living version of the classic
// SAP relationship poster. No invented edges — every link is a real relation.
import dagre from "dagre";
import { ALL_TABLES } from "@/data/sapData";
import type { Module } from "@/lib/types";

export interface StudioNode { id: string; label: string; he: string; module: string; x: number; y: number; w: number; h: number }
export interface StudioEdge { id: string; from: string; to: string; points: { x: number; y: number }[] }
export interface StudioGraph { nodes: StudioNode[]; edges: StudioEdge[]; adj: Map<string, Set<string>>; width: number; height: number }

const W = 150, H = 48;

export function buildModuleGraph(module: Module): StudioGraph {
  const seen = new Set<string>();
  const tables = ALL_TABLES.filter((t) => t.module === module && !seen.has(t.tableName) && (seen.add(t.tableName), true));
  const ids = new Set(tables.map((t) => t.tableName));
  // undirected unique edge set between in-module tables
  const pairKey = (a: string, b: string) => (a < b ? `${a}|${b}` : `${b}|${a}`);
  const pairs = new Map<string, [string, string]>();
  for (const t of tables) for (const r of t.relations) {
    if (ids.has(r.table) && r.table !== t.tableName) pairs.set(pairKey(t.tableName, r.table), [t.tableName, r.table]);
  }

  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: "TB", nodesep: 26, ranksep: 64, marginx: 24, marginy: 24 });
  g.setDefaultEdgeLabel(() => ({}));
  for (const t of tables) g.setNode(t.tableName, { width: W, height: H, he: t.descriptionHe || t.descriptionEn || "" });
  for (const [, [a, b]] of pairs) g.setEdge(a, b);
  dagre.layout(g);

  const nodes: StudioNode[] = tables.map((t) => { const n = g.node(t.tableName); return { id: t.tableName, label: t.tableName, he: t.descriptionHe || t.descriptionEn || "", module: t.module, x: n.x, y: n.y, w: W, h: H }; });
  const edges: StudioEdge[] = [...pairs].map(([k, [a, b]]) => { const e = g.edge(a, b); return { id: k, from: a, to: b, points: (e?.points || []) as { x: number; y: number }[] }; });
  const adj = new Map<string, Set<string>>();
  for (const [, [a, b]] of pairs) { if (!adj.has(a)) adj.set(a, new Set()); if (!adj.has(b)) adj.set(b, new Set()); adj.get(a)!.add(b); adj.get(b)!.add(a); }

  const gg = g.graph();
  return { nodes, edges, adj, width: gg.width || 1000, height: gg.height || 1000 };
}

// Real business lifecycle chains (table-level) per module — the timeline spine.
export const FLOWS: Record<string, { label: string; code: string }[]> = {
  PM: [
    { label: "מיקום פונקציונלי", code: "IFLOT" }, { label: "ציוד", code: "EQUI" }, { label: "רשימת משימות", code: "PLKO" },
    { label: "תוכנית אחזקה", code: "MPLA" }, { label: "הודעת תקלה", code: "QMEL" }, { label: "פקודת אחזקה", code: "AUFK" },
    { label: "פעולות", code: "AFVC" }, { label: "אישור", code: "AFRU" }, { label: "סטטוס/סילוק", code: "JEST" },
  ],
  "PP-PI": [
    { label: "אב חומר", code: "MARA" }, { label: "עץ מוצר (BOM)", code: "MAST" }, { label: "מתכון/Routing", code: "PLKO" },
    { label: "גרסת ייצור", code: "MKAL" }, { label: "פקודת תהליך", code: "AFKO" }, { label: "שמורות", code: "RESB" },
    { label: "אישור", code: "AFRU" }, { label: "תיקון Backflush", code: "COGI" },
  ],
};
