// ===== SAP Learning Academy — central index engine =====
// Computes per-book reference indexes (T-Codes / Tables / Fiori / glossary),
// cross-book shared objects, and a unified search corpus across all books.

import type { LearningNode, TextbookChapter } from "./pp-textbook/types";
import { countNodes, nodeWordCount } from "./pp-textbook/types";
import { PP_TEXTBOOK } from "./pp-textbook";
import { PM_TEXTBOOK } from "./pm-textbook";
import { QM_TEXTBOOK } from "./qm-textbook";
import PM_TOC from "./pm-toc.json";
import QM_TOC from "./qm-toc.json";

const TOCS: Record<string, Record<string, { id: string; title: string }[]>> = {
  pm: PM_TOC as any, qm: QM_TOC as any,
};

export type ValidationKind = "reviewed" | "structural";

export interface BookDef {
  id: string;
  module: string;
  titleHe: string;
  titleEn: string;
  base: string;           // chapter route base, e.g. "/library/pp" or "/library/qm-academy"
  data: Record<string, TextbookChapter>;
  status: "live" | "in-progress" | "planned";
  validationKind: ValidationKind;
  score: number;
  lastUpdated: string;    // YYYY-MM-DD
  reportHref: string;
  referenceHref: string;
  tint: string;
}

export const BOOKS: BookDef[] = [
  { id: "pp", module: "PP", titleHe: "תכנון ייצור ובקרה", titleEn: "Production Planning & Control",
    base: "/library/pp", data: PP_TEXTBOOK, status: "live", validationKind: "reviewed", score: 91,
    lastUpdated: "2026-06-10", reportHref: "/library/pp-quality-report/", referenceHref: "/library/academy/reference/pp/", tint: "from-brand to-brand-dark" },
  { id: "pm", module: "PM", titleHe: "תחזוקת מפעל", titleEn: "Configuring Plant Maintenance",
    base: "/library/pm-academy", data: PM_TEXTBOOK, status: "live", validationKind: "structural", score: 90,
    lastUpdated: "2026-06-10", reportHref: "/library/pm-quality-report/", referenceHref: "/library/academy/reference/pm/", tint: "from-rose-500 to-rose-700" },
  { id: "qm", module: "QM", titleHe: "ניהול איכות", titleEn: "Quality Management",
    base: "/library/qm-academy", data: QM_TEXTBOOK, status: "live", validationKind: "structural", score: 90,
    lastUpdated: "2026-06-11", reportHref: "/library/qm-quality-report/", referenceHref: "/library/academy/reference/qm/", tint: "from-emerald-500 to-emerald-700" },
];

export const bookById = (id: string) => BOOKS.find((b) => b.id === id);

// ---- flatten ----
export interface FlatNode {
  bookId: string; module: string; base: string;
  ch: number; id: string; titleHe: string; titleEn: string;
  tcodes: string[]; tables: string[]; fiori: string[];
  snippet: string;
}
function walk(b: BookDef): FlatNode[] {
  const out: FlatNode[] = [];
  for (const ch of Object.values(b.data)) {
    const rec = (ns: LearningNode[]) => {
      for (const n of ns) {
        out.push({
          bookId: b.id, module: b.module, base: b.base, ch: ch.n, id: n.id,
          titleHe: n.titleHe, titleEn: n.titleEn,
          tcodes: n.tcodes ?? [], tables: n.tables ?? [], fiori: n.fiori ?? [],
          snippet: (n.execHe ?? "").slice(0, 160),
        });
        if (n.children) rec(n.children);
      }
    };
    rec(ch.subchapters);
  }
  return out;
}

export const FLAT: Record<string, FlatNode[]> = Object.fromEntries(BOOKS.map((b) => [b.id, walk(b)]));

// ---- per-book reference index ----
export interface IndexEntry { code: string; refs: { ch: number; id: string; titleHe: string }[] }
function buildIndex(nodes: FlatNode[], kind: "tcodes" | "tables" | "fiori"): IndexEntry[] {
  const map = new Map<string, IndexEntry>();
  for (const n of nodes) {
    for (const code of n[kind]) {
      if (!code || code === "—") continue;
      if (!map.has(code)) map.set(code, { code, refs: [] });
      const e = map.get(code)!;
      if (!e.refs.some((r) => r.id === n.id)) e.refs.push({ ch: n.ch, id: n.id, titleHe: n.titleHe });
    }
  }
  return [...map.values()].sort((a, b) => a.code.localeCompare(b.code));
}

export interface BookReference {
  tcodes: IndexEntry[];
  tables: IndexEntry[];
  fiori: IndexEntry[];
  glossary: { term: string; kind: string; he: string }[]; // SAP-object glossary
}
export function bookReference(id: string): BookReference | null {
  const b = bookById(id); if (!b) return null;
  const nodes = FLAT[id];
  const tcodes = buildIndex(nodes, "tcodes");
  const tables = buildIndex(nodes, "tables");
  const fiori = buildIndex(nodes, "fiori");
  const kindHe: Record<string, string> = { tcode: "T-Code", table: "טבלה", fiori: "אפליקציית Fiori" };
  const glossary = [
    ...tcodes.map((e) => ({ term: e.code, kind: "tcode", he: e.refs[0]?.titleHe ?? "" })),
    ...tables.map((e) => ({ term: e.code, kind: "table", he: e.refs[0]?.titleHe ?? "" })),
    ...fiori.map((e) => ({ term: e.code, kind: "fiori", he: e.refs[0]?.titleHe ?? "" })),
  ].sort((a, b) => a.term.localeCompare(b.term)).map((g) => ({ ...g, kind: kindHe[g.kind] }));
  return { tcodes, tables, fiori, glossary };
}

// ---- cross-book shared objects ----
export interface CrossObject { code: string; kind: string; books: string[] }
export function crossBookObjects(): CrossObject[] {
  const map = new Map<string, { kind: string; books: Set<string> }>();
  for (const b of BOOKS) {
    for (const n of FLAT[b.id]) {
      const add = (code: string, kind: string) => {
        if (!code || code === "—") return;
        const k = code + "|" + kind;
        if (!map.has(k)) map.set(k, { kind, books: new Set() });
        map.get(k)!.books.add(b.module);
      };
      n.tcodes.forEach((c) => add(c, "tcode"));
      n.tables.forEach((c) => add(c, "table"));
      n.fiori.forEach((c) => add(c, "fiori"));
    }
  }
  const out: CrossObject[] = [];
  for (const [k, v] of map) if (v.books.size >= 2) out.push({ code: k.split("|")[0], kind: v.kind, books: [...v.books].sort() });
  return out.sort((a, b) => b.books.length - a.books.length || a.code.localeCompare(b.code));
}

// ---- unified search corpus ----
export interface SearchDoc {
  bookId: string; module: string; base: string; ch: number; id: string;
  titleHe: string; titleEn: string; codes: string; snippet: string;
}
export const SEARCH_DOCS: SearchDoc[] = BOOKS.flatMap((b) =>
  FLAT[b.id].map((n) => ({
    bookId: b.id, module: b.module, base: b.base, ch: n.ch, id: n.id,
    titleHe: n.titleHe, titleEn: n.titleEn,
    codes: [...n.tcodes, ...n.tables, ...n.fiori].filter((c) => c && c !== "—").join(" "),
    snippet: n.snippet,
  })),
);

// ---- aggregate stats ----
export function bookStats(id: string) {
  const b = bookById(id)!;
  const chapters = Object.keys(b.data).length;
  const subs = Object.values(b.data).reduce((s, c) => s + c.subchapters.length, 0);
  const nodes = Object.values(b.data).reduce((s, c) => s + c.subchapters.reduce((a, n) => a + countNodes(n), 0), 0);
  const words = Object.values(b.data).reduce((s, c) => s + c.subchapters.reduce((a, n) => a + nodeWordCount(n) + (n.children?.reduce((x, y) => x + nodeWordCount(y), 0) ?? 0), 0), 0);
  return { chapters, subs, nodes, words, readMin: Math.round(words / 180) };
}

// ---- structural quality report (deterministic) ----
const REQ_STR = ["execHe", "beginnerHe", "consultantHe", "purposeHe", "processExampleHe", "cbcHe"] as const;
const REQ_ARR = ["navHe", "tcodes", "tables", "configHe", "mistakesHe", "troubleshootHe", "bestPracticeHe", "interviewHe", "takeawaysHe"] as const;

export interface StructuralReport {
  bookId: string; module: string;
  chapters: number; subs: number; nodes: number; words: number; readMin: number;
  sourceIdsTotal: number; sourceIdsMissing: number; missingByChapter: { ch: number; ids: string[] }[];
  emptyFacets: number; flowNodes: number;
}
export function structuralReport(bookId: string): StructuralReport | null {
  const b = bookById(bookId); if (!b) return null;
  const st = bookStats(bookId);
  const toc = TOCS[bookId];
  let emptyFacets = 0, flowNodes = 0, sourceIdsTotal = 0, sourceIdsMissing = 0;
  const missingByChapter: { ch: number; ids: string[] }[] = [];
  for (const ch of Object.values(b.data)) {
    const ids = new Set<string>();
    const rec = (ns: LearningNode[]) => {
      for (const n of ns) {
        ids.add(n.id);
        if (n.flow?.length) flowNodes++;
        for (const k of REQ_STR) { const v = (n as any)[k]; if (!v || !String(v).trim()) emptyFacets++; }
        for (const k of REQ_ARR) { const v = (n as any)[k]; if (!Array.isArray(v) || !v.length) emptyFacets++; }
        if (n.children) rec(n.children);
      }
    };
    rec(ch.subchapters);
    if (toc?.[String(ch.n)]) {
      const src = toc[String(ch.n)].map((e) => e.id);
      sourceIdsTotal += src.length;
      const miss = src.filter((id) => !ids.has(id));
      sourceIdsMissing += miss.length;
      if (miss.length) missingByChapter.push({ ch: ch.n, ids: miss });
    }
  }
  return { bookId, module: b.module, ...st, sourceIdsTotal, sourceIdsMissing, missingByChapter, emptyFacets, flowNodes };
}

export const ACADEMY_TOTALS = (() => {
  const completed = BOOKS.filter((b) => b.status === "live").length;
  const inProgress = BOOKS.filter((b) => b.status === "in-progress").length;
  let chapters = 0, nodes = 0, words = 0;
  for (const b of BOOKS) { const s = bookStats(b.id); chapters += s.chapters; nodes += s.nodes; words += s.words; }
  return {
    totalBooks: BOOKS.length + 3, // PP/PM/QM live + planned MM/WM/PP-DS (sources exist)
    completed, inProgress, chapters, nodes, words, readMin: Math.round(words / 180),
    plannedHe: ["MM (Sourcing & Procurement)", "WM/EWM", "PP-DS", "S&OP/IBP"],
  };
})();
