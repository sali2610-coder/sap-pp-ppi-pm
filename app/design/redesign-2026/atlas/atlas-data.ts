/* Knowledge Atlas board: the data layer. SERVER ONLY (reads node:fs and the SAP datasets).
   Every number, name and relation below comes from the site's own accessors. Nothing is typed
   in by hand except presentation: the schematic slot of each module on the map, the order of
   the board, and the words of the UI. A value the data does not hold is returned as null or ""
   and the page prints "לא מתועד במאגר". */

import fs from "node:fs";
import path from "node:path";
import { homeData } from "@/components/neo-shell/home/home-data";
import { txDetail, txDetailCodes, txStatusMap, type TxDetail } from "@/components/neo-shell/data/tx-detail";
import { tableDetail } from "@/components/neo-shell/data/tables-detail";
import { bpDetail, bpList } from "@/components/neo-shell/best-practices/bp-data";
import { booksData } from "@/components/neo-shell/books/books-data";
import { neoLessonData } from "@/components/neo-shell/learn/lesson-data";
import { erdCatalog } from "@/components/neo-shell/erd/erd-catalog";
// Only for the S/4 status of the CDS and BAPI rows in the search section: tableDetail() names
// those objects but carries no status for them, and these are the directories the shell's own
// search index reads the same status from.
import { cdsDir } from "@/components/neo-shell/reference/cds-data";
import { bapiDir } from "@/components/neo-shell/reference/bapi-data";
import { BLOCK_META, orderedBlocks } from "@/lib/academy/lesson-types";
import { S4_STATUS_GROUP, S4_STATUS_HE, type S4Status, type VerificationLevel } from "@/lib/evidence/types";
import type { MapData, MapLink, MapModule, MapRoute } from "./atlas-map";

/* ------------------------------------------------------------ vocabulary */

/** The five S/4 states of the board, plus the two groups the data also holds. */
export type Five = "keep" | "change" | "replace" | "removed" | "verify" | "new" | "past";
export interface St { five: Five; label: string }
/** The four verification levels of the board. */
export type Lvl = "verified" | "partial" | "requires" | "conflict";
export interface Lv { lvl: Lvl; label: string }

const FIVE_OF_GROUP = {
  keeps: "keep", changes: "change", moves: "replace", gone: "removed", open: "verify", new: "new", past: "past",
} as const;

const isStatus = (k: string | undefined): k is S4Status => !!k && Object.hasOwn(S4_STATUS_GROUP, k);

/** Canonical key to the board's state. The label stays the canonical Hebrew label, verbatim. */
export function stOf(key: string | undefined, label?: string): St | null {
  if (!isStatus(key)) return null;
  return { five: FIVE_OF_GROUP[S4_STATUS_GROUP[key]], label: label || S4_STATUS_HE[key] };
}

const LVL_OF: Record<VerificationLevel, Lvl> = {
  sap_official_verified: "verified",
  repository_verified: "verified",
  supported_secondary_source: "partial",
  legacy_context_only: "partial",
  verification_required: "requires",
  conflicting_sources: "conflict",
};
const lvOf = (key: VerificationLevel, label: string): Lv => ({ lvl: LVL_OF[key], label });

/** Map legend: module code to its colour token. Presentation only. */
export const MOD_TOKEN: Record<string, string> = {
  PM: "pm", "PP-PI": "pppi", PP: "pp", MM: "mm", QM: "qm", SD: "sd", FI: "fi", CO: "co", CS: "cs",
  BATCH: "batch", CLASS: "class", IDOC: "idoc", PIPO: "pipo", HR: "hr", BW: "bw",
  "PP/DS": "ppds", EWM: "ewm", "S&OP": "sop", Fiori: "fiori", "S/4HANA": "s4",
};
export const modVar = (m: string) => (MOD_TOKEN[m] ? `var(--m-${MOD_TOKEN[m]})` : "var(--ink-2)");

const clean = (s: string | undefined | null) => (s || "").replace(/\s+/g, " ").trim();
/** Short title: the part of a record title before its first colon (the title stays whole elsewhere). */
const short = (s: string) => clean(s.split(":")[0]);

/* --------------------------------------------------------------- caches */

let _all: TxDetail[] | null = null;
/** Every registry transaction, read once (about 0.3s at build). */
const allTx = () => (_all ??= txDetailCodes().map((c) => txDetail(c)).filter((d): d is TxDetail => !!d));

/* ------------------------------------------------------------------ map */

/** Schematic slot of each module (RTL: maintenance on the start side). Found offline by a
 *  layout search over a 5x4 grid that keeps every backbone link and every drawn route clear of
 *  other nodes. Positions are presentation; links, widths and counts are data. */
const SLOT: Record<string, [number, number]> = {
  CO: [810, 75], FI: [630, 75], MM: [450, 75], IDOC: [270, 75],
  PM: [810, 212], PP: [630, 212], QM: [270, 212], BATCH: [90, 212],
  CS: [810, 349], "PP-PI": [450, 349], CLASS: [90, 349],
  HR: [810, 486], PIPO: [630, 486], SD: [270, 486], BW: [90, 486],
};
export const NODE_W = 150;
export const MARKS_PER_ROW = 16;
export const nodeH = (n: number) => 62 + Math.max(1, Math.ceil(n / MARKS_PER_ROW)) * 8;

/** The process routes the map offers, by best-practice slug. */
const ROUTE_SLUGS = [
  "order-settlement-process",
  "procure-to-pay-for-maintenance",
  "quality-in-procurement-process",
  "breakdown-maintenance-process",
];

type Pt = { x: number; y: number };
type Rect = Pt & { w: number; h: number };

/** Quadratic link between two node centres, bent to the first side that clears every other node. */
function bend(a: Pt, b: Pt, others: Rect[]): { d: string; lx: number; ly: number } {
  const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len, ny = dx / len, mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
  const at = (c: Pt, t: number) => ({
    x: (1 - t) * (1 - t) * a.x + 2 * (1 - t) * t * c.x + t * t * b.x,
    y: (1 - t) * (1 - t) * a.y + 2 * (1 - t) * t * c.y + t * t * b.y,
  });
  const clear = (c: Pt) => {
    for (let t = 0.04; t < 0.97; t += 0.03) {
      const p = at(c, t);
      if (others.some((r) => Math.abs(p.x - r.x) < r.w / 2 + 8 && Math.abs(p.y - r.y) < r.h / 2 + 8)) return false;
    }
    return true;
  };
  const ks = [0, 0.14, -0.14, 0.26, -0.26, 0.4, -0.4];
  const k = ks.find((q) => clear({ x: mx + nx * q * len, y: my + ny * q * len })) ?? 0.14;
  const c = { x: mx + nx * k * len, y: my + ny * k * len };
  const mid = at(c, 0.5);
  const r = (v: number) => Math.round(v * 10) / 10;
  return { d: `M${r(a.x)} ${r(a.y)} Q${r(c.x)} ${r(c.y)} ${r(b.x)} ${r(b.y)}`, lx: r(mid.x), ly: r(mid.y) };
}

function mapData(): MapData {
  const erd = erdCatalog();
  const order = erd.modules.map((m) => m.code as string);
  const primary = new Map(erd.tables.map((t) => [t.n, t.m as string]));

  const modules: MapModule[] = erd.modules.map((m) => {
    const tables = [...m.core, ...m.more];
    const [x, y] = SLOT[m.code] ?? [450, 280];
    return { code: m.code, he: clean(m.he), x, y, w: NODE_W, h: nodeH(tables.length), tables, color: modVar(m.code), deg: 0 };
  });
  const byCode = new Map(modules.map((m) => [m.code, m]));

  // Backbone: the two strongest links of every module (ties in the catalogue's module order).
  const links = erd.overview.links.map((l) => ({ a: l.a as string, b: l.b as string, n: l.n }));
  const backbone = new Set<string>();
  const key = (a: string, b: string) => [a, b].sort().join("|");
  for (const m of order) {
    const mine = links
      .filter((l) => l.a === m || l.b === m)
      .map((l) => ({ o: l.a === m ? l.b : l.a, n: l.n }))
      .sort((p, q) => q.n - p.n || order.indexOf(p.o) - order.indexOf(q.o));
    for (const x of mine.slice(0, 2)) backbone.add(key(m, x.o));
  }
  for (const m of modules) m.deg = links.filter((l) => l.a === m.code || l.b === m.code).length;

  const outLinks: MapLink[] = links.map((l) => {
    const A = byCode.get(l.a)!, B = byCode.get(l.b)!;
    const others = modules.filter((m) => m.code !== l.a && m.code !== l.b);
    return { ...l, bb: backbone.has(key(l.a, l.b)), ...bend(A, B, others) };
  });

  // Process routes: the modules a best practice's steps touch, read from each step's own
  // cross-references (a table by its catalogue module, a transaction by its registry module).
  const onMap = new Set(order);
  const routes: MapRoute[] = [];
  for (const slug of ROUTE_SLUGS) {
    const d = bpDetail(slug);
    if (!d) continue;
    const seq: string[] = [];
    const tablesBy = new Map<string, string[]>();
    const offMap: string[] = [];
    for (const s of d.steps) {
      for (const x of s.xrefs) {
        const kind = x.id.split(":")[0];
        let m: string | null = null;
        if (kind === "table") {
          m = primary.get(x.name) ?? null;
          if (m && onMap.has(m) && byCode.get(m)!.tables.includes(x.name)) {
            const list = tablesBy.get(m) ?? [];
            if (!list.includes(x.name)) list.push(x.name);
            tablesBy.set(m, list);
          } else if (!offMap.includes(x.name)) offMap.push(x.name);
        } else if (kind === "tx") m = txDetail(x.name)?.module ?? null;
        if (m && onMap.has(m) && seq[seq.length - 1] !== m) seq.push(m);
      }
    }
    const stops = [...new Set(seq)];
    const legs: { a: string; b: string }[] = [];
    for (let i = 0; i + 1 < seq.length; i++) {
      if (!legs.some((l) => key(l.a, l.b) === key(seq[i], seq[i + 1]))) legs.push({ a: seq[i], b: seq[i + 1] });
    }
    routes.push({
      slug,
      label: short(d.he),
      title: clean(d.he),
      stops: stops.map((code) => ({ code, tables: tablesBy.get(code) ?? [] })),
      legs,
      offMap,
      steps: d.steps.length,
    });
  }

  return { w: 900, h: 560, modules, links: outLinks, routes };
}

/* ----------------------------------------------------------- the board */

export interface Crumb { label: string; sub?: string; mod?: string; mono?: boolean; current?: boolean; fork?: Crumb[] }
export interface RelNode { code: string; he: string; rel: string; dashed: boolean; mod?: string }
export interface Board {
  counts: {
    dictTables: number; fields: number; relations: number; dictTx: number; funcs: number; topics: number;
    tx: number; bp: number; bpCross: number; processes: number; books: number; bookSections: number; bookFiles: number;
    erdModules: number; erdTables: number; erdEdges: number; erdStated: number;
    s4Marked: number; migration: { adapted: number; replaced: number; removed: number };
    modules: { code: string; he: string; tables: number; fields: number; tcodes: number }[];
  };
  map: MapData;
  catalog: {
    total: number; perModule: { code: string; n: number }[];
    rows: { code: string; he: string; en: string; module: string; st: St | null; lv: Lv; tables: number; neighbours: number; refs: number }[];
  };
  search: { groups: { kind: string; he: string; rows: { code: string; he: string; mods: string[]; st: St | null; note: string }[] }[] };
  ip: {
    code: string; he: string; en: string; module: string; moduleHe: string; area: string; purpose: string;
    process: string[]; flowCount: number; st: St | null; lv: Lv; release: string | null; lastVerified: string | null;
    sources: number; fiori: string; delta: string; known: number; total: number;
    upstream: RelNode[]; downstream: RelNode[]; neighbours: number;
    tables: { code: string; he: string; note: string; trust: string }[];
    issues: string[]; processes: string[]; crumbs: Crumb[];
  };
  afko: {
    code: string; he: string; en: string; mods: string[]; zoneHe: string; st: St | null; lv: Lv; trustHe: string; changed: string;
    deg: number; rank: number; total: number; tx: number; cds: number;
    fields: { tech: string; he: string; dt: string; len: string; pk: boolean; fk: boolean; mods: string[] }[]; fieldTotal: number;
    upstream: RelNode[]; downstream: RelNode[]; processes: number; crumbs: Crumb[];
  };
  bp: {
    he: string; en: string; moduleHe: string; purpose: string; total: number; route: string[];
    steps: { n: number; he: string; refs: { name: string; kindHe: string }[] }[];
    reference: { title: string; levelHe: string; official: boolean } | null;
  };
  erd: {
    center: string;
    nodes: { n: string; he: string; m: string; role: "parent" | "self" | "child"; fields: number }[];
    edges: { p: string; c: string; stated: boolean; card: string; desc: string }[];
  };
  shelf: {
    total: number; sections: number; chapters: number; twinNote: string | null;
    groups: { module: string; moduleHe: string; books: { id: string; title: string; latin: boolean; chapters: number; sections: number; pages: number | null; kind: string; thick: number; thickFrom: string }[] }[];
  };
  reader: {
    bookTitle: string; chapterN: number; chapterTitle: string; chapters: { n: number; sections: number }[];
    sectionId: string; sectionTitle: string; position: number; bookSections: number; paragraph: string | null;
  };
  lesson: {
    course: string; module: string; chapterIndex: number; chapterCount: number; chapterTitle: string;
    pos: number; size: number; global: number; globalTotal: number; title: string; level: string; minutes: number;
    trust: string; trustLvl: Lvl; objective: string; toc: string[]; tables: { code: string; he: string }[];
    prev: string | null; next: string | null;
  } | null;
  status: { five: Record<Five, number>; lvl: Record<Lvl, number>; txTotal: number };
}

let _board: Board | null = null;

export function atlasBoard(): Board {
  if (_board) return _board;
  const home = homeData();
  const erd = erdCatalog();
  const books = booksData();
  const bps = bpList();
  const all = allTx();
  const statusMap = txStatusMap();

  /* -- status counts over the whole transaction registry ------------------------------ */
  const five: Record<Five, number> = { keep: 0, change: 0, replace: 0, removed: 0, verify: 0, new: 0, past: 0 };
  for (const k of Object.values(statusMap)) {
    const s = stOf(k);
    if (s) five[s.five] += 1;
  }
  const lvl: Record<Lvl, number> = { verified: 0, partial: 0, requires: 0, conflict: 0 };
  for (const d of all) lvl[LVL_OF[d.evidence.level.key]] += 1;

  /* -- catalog: module PM or PP, sorted by how often the relation graph references it --- */
  const inFilter = all.filter((d) => d.module === "PM" || d.module === "PP");
  const catalogRows = [...inFilter]
    .sort((a, b) => b.popularity - a.popularity || a.code.localeCompare(b.code))
    .slice(0, 10)
    .map((d) => ({
      code: d.code, he: d.he, en: d.en, module: d.module,
      st: stOf(d.evidence.status.key, d.evidence.status.label),
      lv: lvOf(d.evidence.level.key, d.evidence.level.he),
      tables: d.tables.length, neighbours: d.neighbours.length, refs: d.popularity,
    }));

  /* -- search: what a query for AFKO reaches in the dictionary record ------------------- */
  const afko = tableDetail("AFKO")!;
  const cdsRows = new Map(cdsDir().rows.map((r) => [r.name, r]));
  const bapiRows = new Map(bapiDir().rows.map((r) => [r.name.toUpperCase(), r]));
  const funcName = (raw: string) => clean(raw.split(" - ")[0]);
  const funcHe = (raw: string, he: string) => clean(he) || clean(raw.split(" - ").slice(1).join(" - "));
  const parents = afko.rels.filter((r) => r.dir === "parent");
  const children = afko.rels.filter((r) => r.dir === "child");
  const search: Board["search"] = {
    groups: [
      {
        kind: "table", he: "טבלאות",
        rows: [{
          code: afko.name, he: afko.he, mods: afko.mods,
          st: stOf(afko.evidence.status.key, afko.evidence.status.label),
          note: `${afko.rels.length} קשרים: ${parents.length} אב, ${children.length} בנות`,
        }],
      },
      {
        kind: "tcode", he: "טרנזקציות",
        rows: afko.tx.map((t) => {
          const d = txDetail(t.code);
          return { code: t.code, he: d?.he || "", mods: d ? [d.module] : [], st: stOf(statusMap[t.code]), note: `רשומה על AFKO בשורת ${t.mods.join(" · ")}` };
        }),
      },
      {
        kind: "cds", he: "תצוגות CDS",
        rows: afko.cds.map((c) => {
          const r = cdsRows.get(c.view);
          return { code: c.view, he: c.he, mods: r?.mods ?? [], st: stOf(r?.s4.status.key, r?.s4.status.he), note: `קוראת את ${c.tables.join(" · ")}` };
        }),
      },
      {
        kind: "bapi", he: "BAPI ופונקציות",
        rows: afko.funcs.map((f) => {
          const name = funcName(f.name);
          const r = bapiRows.get(name.toUpperCase());
          return { code: name, he: funcHe(f.name, f.he), mods: f.mods, st: stOf(r?.s4.status.key, r?.s4.status.he), note: "" };
        }),
      },
    ].filter((g) => g.rows.length > 0),
  };

  /* -- which processes (best practices) reference an object ----------------------------- */
  const bpDetails = bps.map((r) => bpDetail(r.slug)).filter((d): d is NonNullable<typeof d> => !!d);
  const processesOf = (id: string) => bpDetails.filter((d) => d.xrefs.some((x) => x.id === id)).map((d) => short(d.he));

  /* -- record: IP30H ------------------------------------------------------------------ */
  const ip = txDetail("IP30H")!;
  const predecessors = all.filter((d) => d.evidence.status.successor?.id === "tx:IP30H");
  const ipBoard: Board["ip"] = {
    code: ip.code, he: ip.he, en: ip.en, module: ip.module, moduleHe: ip.moduleHe, area: ip.area, purpose: ip.purpose,
    process: ip.process.split("→").map(clean).filter(Boolean),
    flowCount: ip.flow.length,
    st: stOf(ip.evidence.status.key, ip.evidence.status.label),
    lv: lvOf(ip.evidence.level.key, ip.evidence.level.he),
    release: ip.evidence.status.release,
    lastVerified: ip.evidence.lastVerifiedAt,
    sources: ip.evidence.sources.filter((s) => !s.context).length,
    fiori: ip.s4.fiori, delta: ip.s4.delta, known: ip.known, total: ip.total,
    upstream: predecessors.map((d) => ({ code: d.code, he: d.he, rel: `רשומת ${d.code} מפנה אל IP30H כיורשת`, dashed: false, mod: d.module })),
    downstream: ip.tables.map((t) => ({ code: t.name, he: t.he, rel: t.from === "authored" ? "טבלה שהרשומה מונה" : "טבלה מה-blueprint", dashed: false, mod: ip.module })),
    neighbours: ip.neighbours.length,
    tables: ip.tables.map((t) => ({ code: t.name, he: t.he, note: t.note, trust: t.trust })),
    issues: ip.issues.map((i) => i.he),
    processes: processesOf("tx:IP30H"),
    crumbs: [
      { label: "מפת הידע" },
      { label: ip.module, sub: ip.moduleHe, mod: ip.module, mono: true },
      { label: ip.area, mod: ip.module },
      { label: ip.code, mono: true, current: true },
    ],
  };

  /* -- record: AFKO ------------------------------------------------------------------ */
  const primaryOf = (n: string) => erd.tables.find((t) => t.n === n)?.m as string | undefined;
  const relNode = (r: (typeof afko.rels)[number]): RelNode => ({
    code: r.name, he: r.he, rel: r.card || "קרדינליות לא צוינה", dashed: r.kind === "unstated", mod: primaryOf(r.name),
  });
  const afkoBoard: Board["afko"] = {
    code: afko.name, he: afko.he, en: afko.en, mods: afko.mods, zoneHe: afko.zoneHe,
    st: stOf(afko.evidence.status.key, afko.evidence.status.label),
    lv: lvOf(afko.evidence.level.key, afko.evidence.level.he),
    trustHe: afko.s4.trustHe, changed: afko.s4.changed,
    deg: afko.deg, rank: afko.rank, total: afko.total, tx: afko.tx.length, cds: afko.cds.length,
    fields: afko.fields.slice(0, 6).map((f) => ({ tech: f.tech, he: f.he, dt: f.dt, len: f.len, pk: f.pk, fk: f.fk, mods: f.mods })),
    fieldTotal: afko.fields.length,
    upstream: parents.map(relNode),
    downstream: children.map(relNode),
    processes: processesOf("table:AFKO").length,
    crumbs: [
      { label: "מפת הידע" },
      { label: "", fork: afko.mods.map((m) => ({ label: m, mod: m, mono: true })) },
      { label: afko.zoneHe },
      { label: afko.name, mono: true, current: true },
    ],
  };

  /* -- best practice ------------------------------------------------------------------ */
  const map = mapData();
  const bp = bpDetail("order-settlement-process")!;
  const bpRoute = map.routes.find((r) => r.slug === bp.slug);
  const bpBoard: Board["bp"] = {
    he: bp.he, en: bp.en, moduleHe: bp.moduleHe, purpose: bp.process?.purpose ?? "", total: bp.steps.length,
    route: bpRoute ? bpRoute.stops.map((s) => s.code) : [],
    steps: bp.steps.slice(0, 5).map((s) => ({ n: s.n, he: s.he, refs: s.xrefs.map((x) => ({ name: x.name, kindHe: x.kindHe })) })),
    reference: bp.process?.reference ? { title: bp.process.reference.title, levelHe: bp.process.reference.levelHe, official: bp.process.reference.official } : null,
  };

  /* -- ERD: AFKO and its direct relations in the ERD catalogue -------------------------- */
  const center = "AFKO";
  const es = erd.edges.filter((e) => e.p === center || e.c === center);
  const tOf = (n: string) => erd.tables.find((t) => t.n === n);
  const erdBoard: Board["erd"] = {
    center,
    nodes: [center, ...es.map((e) => (e.p === center ? e.c : e.p))].map((n) => {
      const t = tOf(n);
      const role: "parent" | "self" | "child" = n === center ? "self" : es.some((e) => e.p === n && e.c === center) ? "parent" : "child";
      return { n, he: t?.he ?? "", m: (t?.m as string) ?? "", role, fields: t?.fn ?? 0 };
    }),
    edges: es.map((e) => ({ p: e.p, c: e.c, stated: e.k !== "unstated", card: e.cd, desc: e.ds })),
  };

  /* -- library shelf and reader --------------------------------------------------------- */
  const shelf: Board["shelf"] = {
    total: books.totals.books, sections: books.totals.sections, chapters: books.totals.chapters, twinNote: books.twinNote,
    groups: books.groups.map((g) => ({
      module: g.module, moduleHe: g.moduleHe,
      books: g.ids.map((id) => books.books.find((b) => b.id === id)!).map((b) => ({
        id: b.id, title: b.titleHe || b.titleEn, latin: !b.titleHe, chapters: b.chapters, sections: b.sections,
        pages: b.pages, kind: b.kindLabel ?? "", thick: b.thick, thickFrom: b.thickFrom,
      })),
    })),
  };

  const rb = books.books.find((b) => b.id === "book2")!;
  const ch = rb.chapterRows[0];
  const [secId, secTitle] = ch.rows[0];
  let heading = secTitle;
  let paragraph: string | null = null;
  try {
    const shard = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public", "books", rb.id, `ch${ch.n}.json`), "utf8")) as Record<string, { he?: string }>;
    const lines = (shard[secId]?.he ?? "").split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines[0]?.startsWith("**")) heading = lines[0].replace(/\*\*/g, "").trim();
    // The first plain paragraph under the heading that fits the excerpt, verbatim.
    paragraph = lines.slice(1).find((l) => l.length <= 600 && !/^(\*\*|▪|•)/.test(l)) ?? null;
  } catch {
    paragraph = null;
  }
  const reader: Board["reader"] = {
    bookTitle: rb.titleHe || rb.titleEn, chapterN: ch.n, chapterTitle: ch.title,
    chapters: rb.chapterRows.map((c) => ({ n: c.n, sections: c.sections })),
    sectionId: secId, sectionTitle: heading, position: 1, bookSections: rb.sections, paragraph,
  };

  /* -- academy ------------------------------------------------------------------------ */
  const ld = neoLessonData("pm", "pm-bom");
  const TRUST_HE: Record<string, string> = {
    "verified-docs": "מאומת מול תיעוד", "verified-system": "מאומת במערכת", curated: "תוכן ערוך", "needs-review": "נדרש אימות נוסף",
  };
  let lesson: Board["lesson"] = null;
  if (ld) {
    const blocks = orderedBlocks(ld.lesson);
    const objective = blocks.find((b) => b.kind === "objective");
    const tablesBlock = blocks.find((b) => b.kind === "tables");
    lesson = {
      course: ld.course.title, module: ld.course.module,
      chapterIndex: ld.place.chapterIndex, chapterCount: ld.place.chapterCount, chapterTitle: ld.place.chapterTitle,
      pos: ld.place.posInChapter, size: ld.place.chapterSize, global: ld.place.globalIndex, globalTotal: ld.place.globalTotal,
      title: ld.lesson.title, level: ld.lesson.level, minutes: ld.lesson.minutes, trust: TRUST_HE[ld.lesson.trust] ?? ld.lesson.trust,
      trustLvl: ld.lesson.trust.startsWith("verified") ? "verified" : ld.lesson.trust === "curated" ? "partial" : "requires",
      objective: objective && "md" in objective ? objective.md : "",
      toc: blocks.map((b) => clean(b.title) || BLOCK_META[b.kind].he),
      tables: tablesBlock && "rows" in tablesBlock ? tablesBlock.rows.map((r) => ({ code: r.code, he: r.he })) : [],
      prev: ld.prev?.title ?? null, next: ld.next?.title ?? null,
    };
  }

  /* -- counts ------------------------------------------------------------------------- */
  _board = {
    counts: {
      dictTables: home.tables, fields: home.fields, relations: home.relations, dictTx: home.tcodes, funcs: home.funcs,
      topics: home.topics, tx: all.length, bp: bps.length, bpCross: bps.filter((r) => r.module === "Cross").length, processes: bps.filter((r) => r.profile).length,
      books: books.totals.books, bookSections: books.totals.sections, bookFiles: books.books.length,
      erdModules: erd.stats.modules, erdTables: erd.stats.tables, erdEdges: erd.stats.edges, erdStated: erd.stats.stated,
      s4Marked: home.migration.adapted + home.migration.replaced + home.migration.removed, migration: home.migration,
      modules: home.modules.map((m) => ({ code: m.code, he: m.he, tables: m.tables, fields: m.fields, tcodes: m.tcodes })),
    },
    map,
    catalog: {
      total: inFilter.length,
      perModule: ["PM", "PP"].map((code) => ({ code, n: inFilter.filter((d) => d.module === code).length })),
      rows: catalogRows,
    },
    search,
    ip: ipBoard,
    afko: afkoBoard,
    bp: bpBoard,
    erd: erdBoard,
    shelf,
    reader,
    lesson,
    status: { five, lvl, txTotal: all.length },
  };
  return _board;
}
