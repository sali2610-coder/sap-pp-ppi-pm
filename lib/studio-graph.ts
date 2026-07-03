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

  // ── LO-HU · Handling Unit Management — an INTEGRATED logistics layer, not a
  // PP-PI table. Rendered in the logistics swimlane and linked to the process-
  // order output area (HU packs finished goods at process-order GR). Verified.
  const extraTables: string[] = [];
  if (module === "PP-PI") {
    const HU: { name: string; he: string }[] = [
      { name: "VEKP", he: "LO-HU · כותרת יחידה מטפלת (Handling Unit)" },
      { name: "VEPO", he: "LO-HU · תכולת יחידה מטפלת (HU Item)" },
    ];
    for (const h of HU) { add({ id: h.name, kind: "table", label: h.name, he: h.he, href: `/object/${encodeURIComponent(h.name)}/` }); extraTables.push(h.name); }
    link("VEKP", "VEPO");
    // anchor the HU into the real PP-PI flow (first available verified anchor)
    for (const anchor of ["AFKO", "AFPO", "MSEG", "MKPF", "MCHA", "MARA"]) { if (tset.has(anchor)) { link("VEKP", anchor); break; } }
  }

  return { nodes, adj, tables: [...tables.map((t) => t.tableName), ...extraTables], master: new Set((MASTER[module] || []).filter((x) => tset.has(x))) };
}

// dagre layout for a VISIBLE subset → positioned nodes + edges.
export interface LNode extends SNode { x: number; y: number; w: number; h: number }
export interface LEdge { id: string; from: string; to: string; points: { x: number; y: number }[] }
const SIZE: Record<SKind, [number, number]> = { table: [150, 46], tcode: [96, 34], bapi: [150, 34], fm: [140, 34], idoc: [150, 34], cds: [150, 34], fiori: [150, 34] };

export function layoutSubset(visible: Set<string>, h: SHetero): { nodes: LNode[]; edges: LEdge[]; width: number; height: number } {
  // Only lay out ids that actually exist in THIS graph. On a module switch the
  // caller's `visible`/`revealed` set can still hold ids from the previous
  // module (before the reset effect fires); dereferencing a missing node would
  // crash the whole page. Filter first — never trust the incoming id set.
  const present = [...visible].filter((id) => h.nodes.has(id));
  if (present.length === 0) return { nodes: [], edges: [], width: 200, height: 200 };
  const pset = new Set(present);
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: "TB", nodesep: 22, ranksep: 56, marginx: 24, marginy: 24 });
  g.setDefaultEdgeLabel(() => ({}));
  for (const id of present) { const n = h.nodes.get(id)!; const [w, hh] = SIZE[n.kind]; g.setNode(id, { width: w, height: hh }); }
  const pairs = new Map<string, [string, string]>();
  for (const id of present) for (const b of h.adj.get(id) || []) if (pset.has(b)) { const k = id < b ? `${id}|${b}` : `${b}|${id}`; pairs.set(k, id < b ? [id, b] : [b, id]); }
  for (const [, [a, b]] of pairs) g.setEdge(a, b);
  dagre.layout(g);
  const nodes: LNode[] = present.map((id) => { const n = h.nodes.get(id)!; const p = g.node(id); const [w, hh] = SIZE[n.kind]; return { ...n, x: p.x, y: p.y, w, h: hh }; });
  const edges: LEdge[] = [...pairs].map(([k, [a, b]]) => { const e = g.edge(a, b); return { id: k, from: a, to: b, points: (e?.points || []) as { x: number; y: number }[] }; });
  const gg = g.graph();
  const fin = (v: number | undefined, d: number) => (Number.isFinite(v) && (v as number) > 0 ? (v as number) : d);
  return { nodes, edges, width: fin(gg.width, 800), height: fin(gg.height, 800) };
}

// ── Functional zones (swimlanes) — the blueprint regions. Every table always
// lands in the same zone so the map stays stable and recognizable at a glance.
export type Zone = "master" | "planning" | "execution" | "status" | "quality" | "config" | "logistics" | "other";
export const ZONES: { id: Zone; he: string; c: string }[] = [
  { id: "master", he: "נתוני אב", c: "#0891b2" },
  { id: "planning", he: "תכנון", c: "#2563eb" },
  { id: "execution", he: "ביצוע", c: "#f97316" },
  { id: "status", he: "סטטוס", c: "#64748b" },
  { id: "quality", he: "איכות", c: "#0d9488" },
  { id: "config", he: "תצורה", c: "#7c3aed" },
  { id: "logistics", he: "לוגיסטיקה / פיננסי", c: "#16a34a" },
  { id: "other", he: "אחר", c: "#94a3b8" },
];
const Z_PLANNING = new Set(["PLKO", "PLAS", "PLPO", "PLFH", "PLMZ", "PLMK", "PLZU", "MAPL", "MPLA", "MPOS", "MHIS", "MHIO", "T351", "MD04"]);
const Z_EXEC = new Set(["AUFK", "AFIH", "AFKO", "AFVC", "AFVV", "AFPO", "AFRU", "AFFH", "AFFL", "AFWI", "AUFM", "RESB", "AFAB", "AFFW", "COGI"]);
const Z_LOGI = new Set(["EBAN", "EBKN", "MSEG", "MKPF", "COSP", "COSS", "COBRA", "COBRB", "ADRC", "SER02", "VEKP", "VEPO"]);
const Z_MASTER = new Set(["EQUI", "EQKT", "EQUZ", "EQST", "IFLOT", "IFLOTX", "IFLOS", "ILOA", "OBJK", "HRP1000", "IHPA", "TPST", "TAPL", "EAPL", "MARA", "MARC", "MAST", "MAKT", "MARD", "MARM", "MBEW", "MVKE", "MLAN", "MEAN", "MDMA", "MCH1", "MCHA", "MCHB", "STKO", "STPO", "STAS", "STZU", "KDST", "FHMI", "CRHD", "CRTX", "CRCA", "CRCO", "CRFH", "CRVD_A", "CSLA", "KAKO", "KAZT", "KLAH", "KLAT", "KSML", "AUSP", "CABN", "CABNT", "CAWN", "CAWNT", "INOB", "MPGD", "MKAL"]);

export function zoneOf(name: string): Zone {
  const n = name.toUpperCase();
  if (/^J/.test(n) || /^TJ/.test(n)) return "status";
  if (/^Q/.test(n)) return "quality";
  if (Z_PLANNING.has(n) || /^MH/.test(n) || (/^MP/.test(n) && n !== "MPGD")) return "planning";
  if (Z_EXEC.has(n)) return "execution";
  if (Z_LOGI.has(n)) return "logistics";
  if (Z_MASTER.has(n)) return "master";
  if (/^T\d/.test(n) || /^TC/.test(n) || /^TQ/.test(n)) return "config";
  return "other";
}

export interface ZoneBand { id: Zone; he: string; c: string; x: number; w: number }
// Stable swimlane layout for the full table map — fixed zone columns, tables
// stacked within their zone. Deterministic ⇒ the blueprint never reshuffles.
export function layoutZoned(visible: Set<string>, hh: SHetero): { nodes: LNode[]; edges: LEdge[]; bands: ZoneBand[]; width: number; height: number } {
  const COLW = 196, HDR = 44, NH = 46, GAP = 16;
  // Guard against stale ids (module-switch race) — only place nodes present in
  // this graph so a leftover id from the previous module can't crash layout.
  const present = new Set([...visible].filter((id) => hh.nodes.has(id)));
  const used = ZONES.filter((z) => [...present].some((id) => zoneOf(id) === z.id));
  const colX = new Map<Zone, number>(); used.forEach((z, i) => colX.set(z.id, i * COLW));
  const byZone = new Map<Zone, string[]>();
  for (const id of present) { const z = zoneOf(id); if (!byZone.has(z)) byZone.set(z, []); byZone.get(z)!.push(id); }
  let maxRows = 0;
  const nodes: LNode[] = [];
  for (const z of used) {
    const list = (byZone.get(z.id) || []).sort();
    maxRows = Math.max(maxRows, list.length);
    list.forEach((id, i) => { const n = hh.nodes.get(id)!; nodes.push({ ...n, w: 150, h: 40, x: colX.get(z.id)! + COLW / 2, y: HDR + 14 + i * (NH + GAP) + 20 }); });
  }
  const pos = new Map(nodes.map((n) => [n.id, n]));
  const pairs = new Map<string, [string, string]>();
  for (const id of present) for (const b of hh.adj.get(id) || []) if (present.has(b)) { const k = id < b ? `${id}|${b}` : `${b}|${id}`; pairs.set(k, id < b ? [id, b] : [b, id]); }
  const edges: LEdge[] = [...pairs].map(([k, [a, b]]) => { const na = pos.get(a)!, nb = pos.get(b)!; return { id: k, from: a, to: b, points: [{ x: na.x, y: na.y }, { x: nb.x, y: nb.y }] }; });
  const bands: ZoneBand[] = used.map((z) => ({ id: z.id, he: z.he, c: z.c, x: colX.get(z.id)!, w: COLW }));
  return { nodes, edges, bands, width: used.length * COLW || 200, height: HDR + 14 + maxRows * (NH + GAP) + 60 };
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
