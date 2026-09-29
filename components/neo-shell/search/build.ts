"use client";

// Project NEO · the command surface — index assembly and matching.
//
// Pure client code with NO dataset import. It merges two build-time payloads
// that are already props of the shell:
//   ShellData          — nav groups, the dictionary search index (tables, CDS,
//                        Fiori, incidents), the object meta map and the
//                        per-object context map.
//   CommandExtra       — every other family (search/command-index.ts): modules,
//                        fields, transactions, function objects, objects,
//                        enhancements, books, chapters, domains, concepts,
//                        work centres and topics, best practices.
// Nothing is fabricated here. A field that neither payload can answer is left
// undefined, and the row simply renders without it.

import { within } from "@/lib/search-intel";
import { MOD_HE } from "../mod-var";
import type { ShellData } from "../types";
import { foldText, queryReadings } from "./hebrew";
import type { CmdItem, CmdKind, CmdRecord, CmdSection, CommandExtra, CommandTx } from "./types";

/* ------------------------------------------------------------------ kinds */

/** Render order, section order on a tie, and the Hebrew name of each kind.
 *  The names are the product's own names for the destination (gate 5, #16):
 *  "תצוגת CDS" as the rail's "תצוגות CDS", "תחום עסקי" as "תחומים עסקיים". */
export const KINDS: { k: CmdKind; he: string; icon: string }[] = [
  { k: "nav", he: "ניווט", icon: "Compass" },
  { k: "module", he: "מודול", icon: "Layers" },
  { k: "table", he: "טבלה", icon: "Table" },
  { k: "object", he: "אובייקט SAP", icon: "Database" },
  { k: "field", he: "שדה", icon: "Database" },
  { k: "tcode", he: "טרנזקציה", icon: "Terminal" },
  { k: "bapi", he: "BAPI", icon: "Plug" },
  { k: "func", he: "מודול פונקציה", icon: "SquareFunction" },
  { k: "idoc", he: "IDoc", icon: "Cable" },
  { k: "cds", he: "תצוגת CDS", icon: "Sigma" },
  { k: "fiori", he: "יישום Fiori", icon: "LayoutGrid" },
  { k: "enh", he: "טכניקת הרחבה", icon: "Puzzle" },
  { k: "flow", he: "תחום עסקי", icon: "Workflow" },
  { k: "chapter", he: "פרק", icon: "BookMarked" },
  { k: "book", he: "ספר", icon: "BookOpen" },
  { k: "guide", he: "מושג", icon: "ScrollText" },
  { k: "center", he: "מרכז עבודה", icon: "Library" },
  { k: "topic", he: "נושא עבודה", icon: "ClipboardCheck" },
  { k: "bp", he: "שיטת עבודה", icon: "ClipboardCheck" },
  { k: "incident", he: "תקלה", icon: "AlertTriangle" },
];

const KIND_ORDER = new Map(KINDS.map((x, i) => [x.k, i]));
export const kindMeta = (k: CmdKind) => KINDS[KIND_ORDER.get(k) ?? 0];

/** The SHAPE a family is drawn with. Three of them, not twelve: the eye reads
 *  "this answer is dictionary data / an executable identifier / something
 *  written" before it reads a single word. */
export type CmdShape = "data" | "code" | "doc";

export const KIND_SHAPE: Record<CmdKind, CmdShape> = {
  table: "data",
  object: "data",
  field: "data",
  cds: "data",
  tcode: "code",
  bapi: "code",
  func: "code",
  idoc: "code",
  fiori: "code",
  enh: "code",
  nav: "doc",
  module: "doc",
  flow: "doc",
  chapter: "doc",
  book: "doc",
  guide: "doc",
  center: "doc",
  topic: "doc",
  bp: "doc",
  incident: "doc",
};

/** BAPI vs plain Function Module is decided by the identifier itself, which is
 *  a real SAP naming convention — not by a guess about what the object does. */
const isBapi = (name: string) => /^BAPI[_ ]/i.test(name.trim());

const low = (s: string) => (s || "").toLowerCase();

/** The route /neo/transactions/[code] generates for a registry code. The same
 *  expression as ref-links txHref(); command-index sets the page flag only
 *  where that gate answers, and test/search-index-routes.test.ts holds the two
 *  together. */
const txPath = (code: string) => `/neo/transactions/${encodeURIComponent(code)}/`;

/* --------------------------------------------------------------- assembly */

/** `tx` arrives after the page loads (/neo/search-tx.json); until then the
 *  index holds every other family. */
export function buildIndex(data: ShellData, extra: CommandExtra, tx?: CommandTx | null): CmdRecord[] {
  const out: CmdRecord[] = [];
  const push = (r: Omit<CmdRecord, "lt" | "hay" | "nt" | "nh">) => {
    const context = [r.sub, r.rel, r.mod, r.objHe].filter(Boolean).join(" ");
    out.push({
      ...r,
      // A row with no page does not get a destination line invented for it.
      dest: r.dest ?? (r.href || undefined),
      lt: low(r.title),
      hay: low(context),
      nt: foldText(r.title),
      nh: foldText(context),
    });
  };

  /* nav — the rail's own destinations, so ⌘K reaches the navigation too. A
     destination the module family already lists is not listed twice: PM and
     PP-PI were a "ניווט" row and a "מודול" row with one title and one href
     (gate 6, minor 23). */
  const moduleHref = new Set(extra.mods.map((m) => m.href));
  for (const g of data.groups) {
    for (const it of g.items) {
      if (moduleHref.has(it.href)) continue;
      push({
        id: `nav:${it.id}`,
        k: "nav",
        title: it.label,
        mono: false,
        sub: g.label,
        href: it.href,
        mod: it.mod,
        rel: it.count === null ? undefined : `${it.count.toLocaleString("he-IL")} ${it.countLabel}`,
      });
    }
  }

  /* module — a first-class result, not merely a facet. Its relationship line is
     the module's real size, counted by the same helper its workspace renders. */
  for (const m of extra.mods) {
    push({
      id: `module:${m.key}`,
      k: "module",
      title: m.label,
      mono: false,
      sub: m.he,
      href: m.href,
      mod: m.key,
      rel: m.rel,
    });
  }

  /* the dictionary index the rail already ships */
  const tablePage = new Map<string, string>();
  for (const r of data.search) {
    if (r.k === "table") {
      const o = r.obj ? data.objects[r.obj] : undefined;
      const c = r.obj ? data.contexts[r.obj] : undefined;
      const rel = c?.relations?.[0];
      if (r.href) tablePage.set(r.t, r.href);
      push({
        id: `table:${r.t}`,
        k: "table",
        title: r.t,
        mono: true,
        sub: r.s,
        // THE RECORD'S OWN PAGE, gated on the server: /neo/tables/<name>/, the
        // page every other way into a table opens (gate 6, minor 19).
        href: r.href,
        mod: o?.mods.join(" · "),
        rel: rel ? `${rel.table}${rel.card ? ` · ${rel.card}` : ""}` : c?.tcodes[0],
        obj: o?.obj,
        objHe: o ? extra.zone[o.zone] : undefined,
        ctx: r.obj,
        st: r.st,
      });
      continue;
    }
    if (r.k === "cds") {
      push({
        id: `cds:${r.t}`,
        k: "cds",
        title: r.t,
        mono: true,
        sub: r.s,
        // Resolved on the server against the route's own list; "" means no page.
        href: extra.cds[r.t] || null,
        st: r.st,
      });
      continue;
    }
    if (r.k === "fiori") {
      push({
        id: `fiori:${r.t}`,
        k: "fiori",
        title: r.t,
        mono: true,
        sub: r.s,
        href: extra.fiori[r.t] || null,
        st: r.st,
      });
      continue;
    }
    // Transactions, function objects and books travel in CommandExtra now.
    if (r.k === "tcode" || r.k === "func" || r.k === "book") continue;
    push({
      id: `${r.k}:${r.t}`,
      k: r.k as CmdKind,
      title: r.t,
      mono: r.m,
      sub: r.s,
      href: r.href,
    });
  }

  /* transactions — every code the registry holds, with its own Hebrew line */
  for (const [code, he, m, s, rel, page] of tx?.txs ?? []) {
    push({
      id: `tcode:${code}`,
      k: "tcode",
      title: code,
      mono: true,
      sub: he,
      href: page ? txPath(code) : null,
      mod: tx?.txMods[m] || undefined,
      rel: rel || undefined,
      st: s >= 0 ? tx?.txSts[s] : undefined,
    });
  }

  /* function objects — one row per page, the IDoc message types as IDoc
     (gate 6, major 12): their page is /neo/idoc/, and so is their kind. */
  for (const [id, he, mod, st, dest, table, kindHe] of extra.fns) {
    const k: CmdKind = dest.startsWith("/neo/idoc/") ? "idoc" : isBapi(id) ? "bapi" : "func";
    push({
      id: `${k}:${id}`,
      k,
      title: id,
      // "Control Recipe" is a concept's name, not an identifier
      mono: /^[A-Za-z0-9_/]+$/.test(id),
      kindHe,
      sub: he,
      href: dest || null,
      mod: mod || undefined,
      rel: table || undefined,
      ctx: table && data.objects[table] ? table : undefined,
      st: st || undefined,
    });
  }

  /* field — every blueprint field, opened on its own row of its table's page
     (gate 6, minor 27): `#field-<FIELD>` is the id the table page gives it. */
  for (const [tech, he, table, type] of extra.fields) {
    const page = tablePage.get(table);
    push({
      id: `field:${table}.${tech}`,
      k: "field",
      title: tech,
      mono: true,
      sub: he,
      href: page ? `${page}#field-${encodeURIComponent(tech)}` : null,
      mod: data.objects[table]?.mods.join(" · "),
      rel: type ? `${table} · ${type}` : table,
      obj: data.objects[table]?.obj,
      ctx: table,
    });
  }

  /* everything else the build-time supplement carries */
  for (const r of extra.recs) {
    push({
      id: `${r.k}:${r.t}:${r.href ?? ""}`,
      k: r.k,
      title: r.t,
      mono: r.m === 1,
      sub: r.s,
      href: r.href,
      mod: r.mod,
      rel: r.rel,
      st: r.st,
    });
  }

  return out;
}

/* --------------------------------------------------------------- matching */

/** Rank, highest first. Exact beats prefix beats word-start beats anywhere;
 *  the title always beats the context line. -1 means "no match at all". */
function score(rec: CmdRecord, q: string): number {
  const t = rec.lt;
  if (t === q) return 1000;
  if (t.startsWith(q)) return 800 - Math.min(t.length, 60);
  const i = t.indexOf(q);
  if (i > 0) {
    const before = t.charCodeAt(i - 1);
    // A match that starts a word reads as a real hit; one inside a word does not.
    const wordStart = !(
      (before >= 97 && before <= 122) || (before >= 48 && before <= 57) ||
      (before >= 0x0590 && before <= 0x05ff)
    );
    return (wordStart ? 600 : 380) - Math.min(t.length, 60);
  }
  return rec.hay.includes(q) ? 200 - Math.min(rec.sub.length, 60) : -1;
}

/** The second pass, word by word, on the folded forms (search/hebrew.ts): every
 *  query word has to land in the title or the context, in any of its readings.
 *  The literal reading may land anywhere, as the first pass does; a reading
 *  with a prefix removed only at the start of a word. A query word that IS the
 *  title (the code in "IW31 הזמנה") puts the record first. */
function foldedScore(rec: CmdRecord, readings: string[][], words: string[]): number {
  let inTitle = 0;
  for (const rs of readings) {
    let hit = 0;
    for (let i = 0; i < rs.length && !hit; i++) {
      const needle = i === 0 ? rs[i] : ` ${rs[i]}`;
      if (rec.nt.includes(needle)) hit = 2;
      else if (rec.nh.includes(needle)) hit = 1;
    }
    if (!hit) return -1;
    if (hit === 2) inTitle += 1;
  }
  const exact = words.some((w) => w === rec.lt) ? 400 : 0;
  return exact + 140 + (inTitle === readings.length ? 120 : inTitle * 30);
}

/** Kinds that a bare navigation query should surface first. */
const KIND_BOOST: Partial<Record<CmdKind, number>> = {
  nav: 90, module: 95, table: 40, object: 30, tcode: 30, flow: 20, field: 5,
};

export interface CmdResult {
  sections: CmdSection[];
  /** Every keyboard stop in render order: the records and each section's
   *  "more" row. The cursor walks this. */
  items: CmdItem[];
  /** Real number of matches across every kind, before the per-section cap. */
  total: number;
  /** Modules that really appear in the matches. Drives the rail's response. */
  mods: Set<string>;
  /** How many matches each module really owns — the module facet counts. Only
   *  modules a record actually declares appear here. */
  modCounts: Record<string, number>;
  /** true when the surface is listing a whole family rather than answering a
   *  query. Nothing is invented in this mode either: it is the real index. */
  browse: boolean;
}

const PER_SECTION = 6;
/** Rows per page when one family is listed; "הצגת עוד" adds another page
 *  (gate 6, minor 24). */
export const BROWSE_CAP = 60;

/** The modules a record declares, already split. A record with none returns an
 *  empty list — it is never assigned a module to make a facet look fuller. */
const modsOf = (r: CmdRecord): string[] => (r.mod ? r.mod.split(" · ") : []);

/** The module a whole family is drawn in: the one most of its matches belong
 *  to. A family whose records declare no module stays neutral ink. */
function dominantMod(rows: CmdRecord[]): string | undefined {
  const n = new Map<string, number>();
  for (const r of rows) for (const m of modsOf(r)) n.set(m, (n.get(m) || 0) + 1);
  let best: string | undefined;
  let bestN = 0;
  for (const [m, c] of n) if (c > bestN) { best = m; bestN = c; }
  return best;
}

const itemsOf = (sections: CmdSection[]): CmdItem[] =>
  sections.flatMap((s) => [
    ...s.rows.map((rec) => ({ rec })),
    ...(s.more ? [{ more: s.k, next: s.more === "next", total: s.total, shown: s.rows.length }] : []),
  ]);

export function runQuery(
  index: CmdRecord[],
  raw: string,
  only: CmdKind | null,
  modOnly: string | null = null,
  limit: number = BROWSE_CAP,
): CmdResult {
  const q = raw.trim().toLowerCase();
  const empty: CmdResult = {
    sections: [], items: [], total: 0, mods: new Set(), modCounts: {}, browse: false,
  };
  const keepMod = (r: CmdRecord) => !modOnly || modsOf(r).includes(modOnly);

  /* BROWSE — a family chosen with no query. The idle board is not a poster of
     numbers you cannot open: picking a family lists that family, straight out
     of the same index the query walks. */
  if (!q) {
    if (!only) return empty;
    const list = index.filter((r) => r.k === only && keepMod(r));
    if (!list.length) return { ...empty, browse: true };
    list.sort((a, b) => a.lt.localeCompare(b.lt, "he"));
    const mods = new Set<string>();
    const modCounts: Record<string, number> = {};
    for (const r of list) for (const m of modsOf(r)) { mods.add(m); modCounts[m] = (modCounts[m] || 0) + 1; }
    const meta = kindMeta(only);
    const rows = list.slice(0, limit);
    const sections: CmdSection[] = [{
      k: only, he: meta.he, icon: meta.icon, rows, total: list.length, mod: dominantMod(list),
      more: list.length > rows.length ? "next" : undefined,
    }];
    return { sections, items: itemsOf(sections), total: list.length, mods, modCounts, browse: true };
  }

  const words = q.split(/\s+/).filter(Boolean);
  const readings = queryReadings(q);
  const buckets = new Map<CmdKind, { rec: CmdRecord; s: number }[]>();
  let total = 0;
  const mods = new Set<string>();
  const modCounts: Record<string, number> = {};

  for (const rec of index) {
    if (only && rec.k !== only) continue;
    if (!keepMod(rec)) continue;
    let s = score(rec, q);
    if (s < 0 && readings.length) s = foldedScore(rec, readings, words);
    if (s < 0) continue;
    s += KIND_BOOST[rec.k] ?? 0;
    total += 1;
    for (const m of modsOf(rec)) { mods.add(m); modCounts[m] = (modCounts[m] || 0) + 1; }
    const list = buckets.get(rec.k);
    if (list) list.push({ rec, s });
    else buckets.set(rec.k, [{ rec, s }]);
  }

  const sections: CmdSection[] = [];
  const top = new Map<CmdKind, number>();
  for (const meta of KINDS) {
    const list = buckets.get(meta.k);
    if (!list || !list.length) continue;
    list.sort((a, b) => b.s - a.s || a.rec.lt.localeCompare(b.rec.lt));
    const rows = list.slice(0, only ? limit : PER_SECTION).map((x) => x.rec);
    top.set(meta.k, list[0].s);
    sections.push({
      k: meta.k,
      he: meta.he,
      icon: meta.icon,
      rows,
      total: list.length,
      mod: dominantMod(list.map((x) => x.rec)),
      more: list.length > rows.length ? (only ? "next" : "all") : undefined,
    });
  }
  // Strongest section first, so the answer is at the top of the surface rather
  // than wherever the fixed kind order happens to put it.
  //
  // The score is QUANTISED before it is compared. Comparing raw scores made the
  // sections trade places on almost every keystroke — "EQU" and "EQUI" differ by
  // the length penalty alone — and a list that reshuffles under the cursor is
  // the single worst thing a search surface can do. A 120-point band is wider
  // than any length penalty and narrower than the gap between a real family
  // match and an incidental one, so only a genuine change of answer reorders.
  const band = (s: CmdSection) => Math.round((top.get(s.k) ?? 0) / 120);
  sections.sort((a, b) => band(b) - band(a) || (KIND_ORDER.get(a.k) ?? 0) - (KIND_ORDER.get(b.k) ?? 0));

  return { sections, items: itemsOf(sections), total, mods, modCounts, browse: false };
}

/** The closest SAP identifier to a query that found nothing (gate 6, minor 21):
 *  one edit away, or two for an identifier of eight characters or more — the
 *  catalogues' own tolerance for "IW3I", "AFK0", "BAPI_ALM_ORDR_MAINTAIN".
 *  Kind order breaks a tie. null when nothing is that close. */
export function suggest(index: CmdRecord[], raw: string): CmdRecord | null {
  const q = raw.trim().toLowerCase();
  if (q.length < 3 || /\s/.test(q)) return null;
  const max = q.length >= 8 ? 2 : 1;
  for (let d = 1; d <= max; d++) {
    let best: CmdRecord | null = null;
    for (const r of index) {
      if (!r.mono || !r.href || Math.abs(r.lt.length - q.length) > d) continue;
      if (!within(r.lt, q, d)) continue;
      if (!best || (KIND_ORDER.get(r.k) ?? 0) < (KIND_ORDER.get(best.k) ?? 0)) best = r;
    }
    if (best) return best;
  }
  return null;
}

/** Hebrew module label when the product has one, otherwise the key as written
 *  in the dataset. Never a translated guess. */
export const modLabel = (m: string) => MOD_HE[m] || m;

/** "תוצאה אחת", "3 תוצאות": the singular is a word, not "1" (gate 6, minor 25). */
const nf = new Intl.NumberFormat("he-IL");
export const countHe = (n: number, one: string, many: string) => (n === 1 ? one : `${nf.format(n)} ${many}`);
