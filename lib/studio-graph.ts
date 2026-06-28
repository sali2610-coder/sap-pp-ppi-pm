// SAP Architecture Studio — heterogeneous knowledge graph + dagre layout.
// Nodes: tables + their transactions / BAPIs·FMs / IDocs / CDS views / Fiori
// apps. Edges are real (dataset relations + table→its-objects). Exploration
// modes filter node kinds; the component lays out only the VISIBLE subset so
// the canvas stays clean and supports progressive multi-level expand.
import dagre from "dagre";
import { ALL_TABLES } from "@/data/sapData";
import { cdsForTable } from "@/data/cds-map";
import { classifyFunc, cleanFunc } from "@/lib/object-intel";
import type { Module } from "@/lib/types";

export type SKind = "table" | "tcode" | "bapi" | "fm" | "idoc" | "cds" | "fiori";
export interface SNode { id: string; kind: SKind; label: string; he: string; s4?: "kept" | "replaced" | "removed"; href?: string }
export interface SHetero { nodes: Map<string, SNode>; adj: Map<string, Set<string>>; tables: string[]; master: Set<string> }

export const KIND_META: Record<SKind, { he: string; c: string }> = {
  table: { he: "טבלה", c: "#0891b2" }, tcode: { he: "טרנזקציה", c: "#475569" }, bapi: { he: "BAPI", c: "#2563eb" },
  fm: { he: "FM", c: "#0d9488" }, idoc: { he: "IDoc", c: "#7c3aed" }, cds: { he: "CDS", c: "#16a34a" }, fiori: { he: "Fiori", c: "#d97706" },
};

const MASTER: Record<string, string[]> = {
  PM: ["EQUI", "IFLOT", "ILOA", "EQKT", "EQUZ", "CRHD", "MPLA", "PLKO", "MARA"],
  "PP-PI": ["MARA", "MARC", "MAST", "PLKO", "PLPO", "MKAL", "MCH1", "CRHD", "MBEW"],
};

const splitTc = (s: string) => (s || "").split(/[,\s/]+/).map((x) => x.trim().toUpperCase()).filter((x) => /^[A-Z][A-Z0-9_]{1,}$/.test(x));

export function buildHetero(module: Module): SHetero {
  const nodes = new Map<string, SNode>();
  const adj = new Map<string, Set<string>>();
  const link = (a: string, b: string) => { if (!adj.has(a)) adj.set(a, new Set()); if (!adj.has(b)) adj.set(b, new Set()); adj.get(a)!.add(b); adj.get(b)!.add(a); };
  const add = (n: SNode) => { if (!nodes.has(n.id)) nodes.set(n.id, n); };

  const seen = new Set<string>();
  const tables = ALL_TABLES.filter((t) => t.module === module && !seen.has(t.tableName) && (seen.add(t.tableName), true));
  const tset = new Set(tables.map((t) => t.tableName));

  for (const t of tables) {
    const s4: SNode["s4"] = t.s4AltTable ? "replaced" : /הוסר|בוטל|removed|deprecat/i.test(t.s4Note || "") ? "removed" : "kept";
    add({ id: t.tableName, kind: "table", label: t.tableName, he: t.descriptionHe || t.descriptionEn || "", s4, href: `/object/${encodeURIComponent(t.tableName)}/` });
  }
  for (const t of tables) {
    // table ↔ table
    for (const r of t.relations) if (tset.has(r.table) && r.table !== t.tableName) link(t.tableName, r.table);
    // transactions
    for (const code of [...new Set(splitTc(t.tcodes))].slice(0, 6)) { const id = `T:${code}`; add({ id, kind: "tcode", label: code, he: "", href: `/tcode/${encodeURIComponent(code)}/` }); link(t.tableName, id); }
    // BAPIs / FMs / IDocs
    for (const [raw] of (t.funcs || []).slice(0, 8)) { const nm = cleanFunc(raw); if (!nm) continue; const fk = classifyFunc(nm); const kind: SKind = fk === "BAPI" ? "bapi" : fk === "IDoc" ? "idoc" : "fm"; const id = `F:${nm}`; add({ id, kind, label: nm, he: "" }); link(t.tableName, id); }
    // CDS
    for (const v of cdsForTable(t.tableName).slice(0, 4)) { const id = `C:${v.view}`; add({ id, kind: "cds", label: v.view, he: "", href: `/cds/${encodeURIComponent(v.view)}/` }); link(t.tableName, id); }
    // Fiori
    if (t.fioriApp) { const id = `A:${t.fioriApp}`; add({ id, kind: "fiori", label: t.fioriApp, he: "" }); link(t.tableName, id); }
  }

  return { nodes, adj, tables: tables.map((t) => t.tableName), master: new Set((MASTER[module] || []).filter((x) => tset.has(x))) };
}

// dagre layout for a VISIBLE subset → positioned nodes + edges.
export interface LNode extends SNode { x: number; y: number; w: number; h: number }
export interface LEdge { id: string; from: string; to: string; points: { x: number; y: number }[] }
const SIZE: Record<SKind, [number, number]> = { table: [150, 46], tcode: [96, 34], bapi: [150, 34], fm: [140, 34], idoc: [150, 34], cds: [150, 34], fiori: [150, 34] };

export function layoutSubset(visible: Set<string>, h: SHetero): { nodes: LNode[]; edges: LEdge[]; width: number; height: number } {
  if (visible.size === 0) return { nodes: [], edges: [], width: 200, height: 200 };
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: "TB", nodesep: 22, ranksep: 56, marginx: 24, marginy: 24 });
  g.setDefaultEdgeLabel(() => ({}));
  for (const id of visible) { const n = h.nodes.get(id); if (!n) continue; const [w, hh] = SIZE[n.kind]; g.setNode(id, { width: w, height: hh }); }
  const pairs = new Map<string, [string, string]>();
  for (const id of visible) for (const b of h.adj.get(id) || []) if (visible.has(b)) { const k = id < b ? `${id}|${b}` : `${b}|${id}`; pairs.set(k, id < b ? [id, b] : [b, id]); }
  for (const [, [a, b]] of pairs) g.setEdge(a, b);
  dagre.layout(g);
  const nodes: LNode[] = [...visible].map((id) => { const n = h.nodes.get(id)!; const p = g.node(id); const [w, hh] = SIZE[n.kind]; return { ...n, x: p.x, y: p.y, w, h: hh }; });
  const edges: LEdge[] = [...pairs].map(([k, [a, b]]) => { const e = g.edge(a, b); return { id: k, from: a, to: b, points: (e?.points || []) as { x: number; y: number }[] }; });
  const gg = g.graph();
  const fin = (v: number | undefined, d: number) => (Number.isFinite(v) && (v as number) > 0 ? (v as number) : d);
  return { nodes, edges, width: fin(gg.width, 800), height: fin(gg.height, 800) };
}

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

// Exploration modes — which node kinds are in scope + render behavior.
export interface StudioMode { id: string; he: string; kinds: SKind[]; behavior: "full" | "expand"; master?: boolean; colorBy?: "kind" | "s4" }
export const MODES: StudioMode[] = [
  { id: "tables", he: "טבלאות", kinds: ["table"], behavior: "full", colorBy: "kind" },
  { id: "business", he: "תהליך עסקי", kinds: ["table"], behavior: "full", colorBy: "kind" },
  { id: "masterdata", he: "נתוני אב", kinds: ["table"], behavior: "full", master: true, colorBy: "kind" },
  { id: "eccs4", he: "ECC ↔ S/4", kinds: ["table"], behavior: "full", colorBy: "s4" },
  { id: "transactions", he: "טרנזקציות", kinds: ["table", "tcode"], behavior: "expand", colorBy: "kind" },
  { id: "integration", he: "אינטגרציה", kinds: ["table", "bapi", "idoc"], behavior: "expand", colorBy: "kind" },
  { id: "cds", he: "CDS Views", kinds: ["table", "cds"], behavior: "expand", colorBy: "kind" },
  { id: "bapi", he: "BAPIs / FMs", kinds: ["table", "bapi", "fm"], behavior: "expand", colorBy: "kind" },
  { id: "fiori", he: "Fiori Apps", kinds: ["table", "fiori"], behavior: "expand", colorBy: "kind" },
];

export const S4_COLOR: Record<NonNullable<SNode["s4"]>, string> = { kept: "#16a34a", replaced: "#d97706", removed: "#dc2626" };
