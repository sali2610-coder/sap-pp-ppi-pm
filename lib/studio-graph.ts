// SAP Architecture Studio — heterogeneous knowledge graph + dagre layout.
// Nodes: tables + their transactions / BAPIs·FMs / IDocs / CDS views / Fiori
// apps. Edges are real (dataset relations + table→its-objects). Exploration
// modes filter node kinds; the component lays out only the VISIBLE subset so
// the canvas stays clean and supports progressive multi-level expand.
import dagre from "dagre";
import { ALL_TABLES } from "@/data/sapData";
import { cdsForTable } from "@/data/cds-map";
import { classifyFunc, cleanFunc } from "@/lib/object-intel";
import { fromBlueprintClass } from "@/lib/evidence/s4-status";
import { s4ClassOf, s4He } from "@/lib/s4-class";
import type { Module } from "@/lib/types";

export type SKind = "table" | "tcode" | "bapi" | "fm" | "idoc" | "cds" | "fiori";
/** The five canonical statuses the blueprint's S/4HANA verdict can produce
 *  (lib/evidence fromBlueprintClass): 0 ללא שינוי, 1 מותאם, 2 הוחלף, 3 הוסר, and
 *  "לא הוכרע במקור". */
export type BlueprintS4 = "unchanged" | "changed" | "replaced" | "not_available" | "verification_required";
export interface SNode {
  id: string; kind: SKind; label: string; he: string;
  /** Canonical S/4HANA status of a blueprint table, from the verdict column. */
  s4?: BlueprintS4;
  /** The blueprint's own verdict word, kept for the explanation line. */
  s4Src?: string;
  href?: string;
}
export interface SHetero { nodes: Map<string, SNode>; adj: Map<string, Set<string>>; tables: string[]; master: Set<string> }

// 2026 system: no violet. IDoc was #7c3aed and is now olive #3f6212 (the most
// distant non-red, non-status hue from the other six kinds, 0.139 OKLab, 7.08:1
// under white type); the config zone takes NEO's --obj-config value #8a3f4a.
export const KIND_META: Record<SKind, { he: string; c: string }> = {
  table: { he: "טבלה", c: "#0891b2" }, tcode: { he: "טרנזקציה", c: "#475569" }, bapi: { he: "BAPI", c: "#2563eb" },
  fm: { he: "FM", c: "#0d9488" }, idoc: { he: "IDoc", c: "#3f6212" }, cds: { he: "CDS", c: "#16a34a" }, fiori: { he: "Fiori", c: "#d97706" },
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
    // The blueprint's verdict column (lib/s4-class), the one every other
    // surface reads. It used to be "s4AltTable filled => replaced": the PM
    // blueprint fills that column on all its tables ("IFLOT (זהה)"), so all 56
    // PM tables read "replaced" while the verdict column marks 43 unchanged;
    // PP-PI fills it on none, so BUT000 (הוחלף) read "kept".
    const k = s4ClassOf(t);
    const s4 = fromBlueprintClass(k).status as BlueprintS4;
    add({ id: t.tableName, kind: "table", label: t.tableName, he: t.descriptionHe || t.descriptionEn || "", s4, s4Src: s4He(k), href: `/object/${encodeURIComponent(t.tableName)}/` });
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

  // Handling Units (VEKP, VEPO) are not in either blueprint. They used to be
  // added here as PP-PI tables and tied to the first of AFKO, AFPO, MSEG… that
  // existed, a relation no dataset states (gate 7, blocker 3). They are drawn
  // no longer; the Studio says in words where their pages are.
  return { nodes, adj, tables: tables.map((t) => t.tableName), master: new Set((MASTER[module] || []).filter((x) => tset.has(x))) };
}

// dagre layout for a VISIBLE subset → positioned nodes + edges.
export interface LNode extends SNode { x: number; y: number; w: number; h: number }
export interface LEdge { id: string; from: string; to: string; points: { x: number; y: number }[] }
const SIZE: Record<SKind, [number, number]> = { table: [150, 46], tcode: [96, 34], bapi: [150, 34], fm: [140, 34], idoc: [150, 34], cds: [150, 34], fiori: [150, 34] };

// §17 visual hierarchy — size expresses importance, NOT colour. Master-data /
// highly-connected business tables render large; mid-degree medium; leaf/
// technical tables small; non-table objects keep their compact kind size.
export type Tier = "core" | "major" | "leaf";
export function nodeTier(n: SNode, h: SHetero): Tier {
  if (n.kind !== "table") return "leaf";
  const deg = h.adj.get(n.id)?.size || 0;
  if (h.master.has(n.id) || deg >= 9) return "core";
  if (deg >= 4) return "major";
  return "leaf";
}
export function nodeSize(n: SNode, h: SHetero): [number, number] {
  if (n.kind !== "table") return SIZE[n.kind];
  const tier = nodeTier(n, h);
  return tier === "core" ? [176, 54] : tier === "major" ? [152, 44] : [130, 38];
}

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
  for (const id of present) { const n = h.nodes.get(id)!; const [w, hh] = nodeSize(n, h); g.setNode(id, { width: w, height: hh }); }
  const pairs = new Map<string, [string, string]>();
  for (const id of present) for (const b of h.adj.get(id) || []) if (pset.has(b)) { const k = id < b ? `${id}|${b}` : `${b}|${id}`; pairs.set(k, id < b ? [id, b] : [b, id]); }
  for (const [, [a, b]] of pairs) g.setEdge(a, b);
  dagre.layout(g);
  const nodes: LNode[] = present.map((id) => { const n = h.nodes.get(id)!; const p = g.node(id); const [w, hh] = nodeSize(n, h); return { ...n, x: p.x, y: p.y, w, h: hh }; });
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
  { id: "config", he: "תצורה", c: "#8a3f4a" },
  { id: "logistics", he: "לוגיסטיקה / פיננסי", c: "#16a34a" },
  { id: "other", he: "אחר", c: "#94a3b8" },
];
const Z_PLANNING = new Set(["PLKO", "PLAS", "PLPO", "PLFH", "PLMZ", "PLMK", "PLZU", "MAPL", "MPLA", "MPOS", "MHIS", "MHIO", "T351", "MD04"]);
const Z_EXEC = new Set(["AUFK", "AFIH", "AFKO", "AFVC", "AFVV", "AFPO", "AFRU", "AFFH", "AFFL", "AFWI", "AUFM", "RESB", "AFAB", "AFFW", "COGI"]);
const Z_LOGI = new Set(["EBAN", "EBKN", "MSEG", "MKPF", "COSP", "COSS", "COBRA", "COBRB", "ADRC", "SER02", "VEKP", "VEPO"]);
const Z_MASTER = new Set(["EQUI", "EQKT", "EQUZ", "EQST", "IFLOT", "IFLOTX", "IFLOS", "ILOA", "OBJK", "HRP1000", "IHPA", "TPST", "TAPL", "EAPL", "IMPTT", "BUT000", "MARA", "MARC", "MAST", "MAKT", "MARD", "MARM", "MBEW", "MVKE", "MLAN", "MEAN", "MDMA", "MCH1", "MCHA", "MCHB", "STKO", "STPO", "STAS", "STZU", "KDST", "FHMI", "CRHD", "CRTX", "CRCA", "CRCO", "CRFH", "CRVD_A", "CSLA", "KAKO", "KAZT", "KLAH", "KLAT", "KSML", "AUSP", "CABN", "CABNT", "CAWN", "CAWNT", "INOB", "MPGD", "MKAL"]);

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
  // ONE LAYER ON STAGE (design audit S7-STU-1): when a single zone is visible
  // its tables are laid out as a grid rather than one tall column, so the fit
  // lands near 100% and the labels are legible at the first glance. With
  // several zones the zone-per-column picture is unchanged.
  const single = used.length === 1;
  const singleN = single ? (byZone.get(used[0].id) || []).length : 0;
  // Fewer, taller columns: the stage is wider than it is tall only by a
  // little once the side panels are open, and a 16-table layer measured
  // 89% at 4 columns (10.5px labels) against ~120% at 3.
  const cols = single ? Math.max(1, Math.ceil(Math.sqrt(singleN / 2.5))) : 1;
  const rowsPer = single ? Math.max(1, Math.ceil(singleN / cols)) : 0;
  let maxRows = 0;
  const nodes: LNode[] = [];
  for (const z of used) {
    const list = (byZone.get(z.id) || []).sort();
    maxRows = Math.max(maxRows, single ? rowsPer : list.length);
    list.forEach((id, i) => {
      const n = hh.nodes.get(id)!; const [w, nh] = nodeSize(n, hh);
      const col = single ? Math.floor(i / rowsPer) : 0;
      const row = single ? i % rowsPer : i;
      nodes.push({ ...n, w, h: nh, x: colX.get(z.id)! + col * COLW + COLW / 2, y: HDR + 14 + row * (NH + GAP) + 20 });
    });
  }
  const pos = new Map(nodes.map((n) => [n.id, n]));
  const pairs = new Map<string, [string, string]>();
  for (const id of present) for (const b of hh.adj.get(id) || []) if (present.has(b)) { const k = id < b ? `${id}|${b}` : `${b}|${id}`; pairs.set(k, id < b ? [id, b] : [b, id]); }
  const edges: LEdge[] = [...pairs].map(([k, [a, b]]) => { const na = pos.get(a)!, nb = pos.get(b)!; return { id: k, from: a, to: b, points: [{ x: na.x, y: na.y }, { x: nb.x, y: nb.y }] }; });
  const bands: ZoneBand[] = used.map((z) => ({ id: z.id, he: z.he, c: z.c, x: colX.get(z.id)!, w: COLW * (single ? cols : 1) }));
  return { nodes, edges, bands, width: (single ? cols : used.length) * COLW || 200, height: HDR + 14 + maxRows * (NH + GAP) + 60 };
}

export const FLOWS: Record<string, { label: string; code: string }[]> = {
  PM: [
    { label: "מיקום פונקציונלי", code: "IFLOT" }, { label: "ציוד", code: "EQUI" }, { label: "רשימת משימות", code: "PLKO" },
    { label: "תוכנית אחזקה", code: "MPLA" }, { label: "הודעת תקלה", code: "QMEL" }, { label: "פקודת אחזקה", code: "AUFK" },
    { label: "פעולות", code: "AFVC" }, { label: "אישור", code: "AFRU" }, { label: "סטטוס", code: "JEST" },
  ],
  "PP-PI": [
    { label: "אב חומר", code: "MARA" }, { label: "עץ מוצר (BOM)", code: "MAST" }, { label: "מתכון אב", code: "PLKO" },
    { label: "גרסת ייצור", code: "MKAL" }, { label: "פקודת תהליך", code: "AFKO" }, { label: "שמורות", code: "RESB" },
    { label: "אישור", code: "AFRU" }, { label: "תיקון Backflush ב-COGI", code: "AFFW" },
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

/** The pre-NEO studio's status colours, as hex because that studio appends an
 *  alpha to them. They are NOT the 2026 tokens: the NEO Studio draws status from
 *  S4_STATUS_DOT (lib/evidence/types; components/neo-shell/studio/studio-view.tsx). */
export const S4_COLOR: Record<BlueprintS4, string> = {
  unchanged: "#10b981", changed: "#f59e0b", replaced: "#3b82f6", not_available: "#dc2626", verification_required: "#94a3b8",
};
