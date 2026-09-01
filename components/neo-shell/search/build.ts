"use client";

// Project NEO · the command surface — index assembly and matching.
//
// Pure client code with NO dataset import. It merges two build-time payloads
// that are already props of the shell:
//   ShellData          — nav groups, the dictionary search index, the object
//                        meta map and the per-object context map.
//   CommandExtra       — the three families ShellData has no index for
//                        (chapter · flow · guide) plus the two ownership maps.
// Nothing is fabricated here. A field that neither payload can answer is left
// undefined, and the row simply renders without it.

import { MOD_HE } from "../mod-var";
import type { ShellData } from "../types";
import type { CmdKind, CmdRecord, CmdSection, CommandExtra } from "./types";

/* ------------------------------------------------------------------ kinds */

export const KINDS: { k: CmdKind; he: string; icon: string }[] = [
  { k: "nav", he: "ניווט", icon: "Compass" },
  { k: "module", he: "מודול", icon: "Layers" },
  { k: "table", he: "טבלה", icon: "Table" },
  { k: "field", he: "שדה", icon: "Database" },
  { k: "tcode", he: "טרנזקציה", icon: "Terminal" },
  { k: "bapi", he: "BAPI", icon: "Plug" },
  { k: "func", he: "מודול פונקציה", icon: "SquareFunction" },
  { k: "cds", he: "CDS View", icon: "Sigma" },
  { k: "fiori", he: "יישום Fiori", icon: "LayoutGrid" },
  { k: "flow", he: "תהליך", icon: "Workflow" },
  { k: "chapter", he: "פרק", icon: "BookMarked" },
  { k: "book", he: "ספר", icon: "BookOpen" },
  { k: "guide", he: "מושג", icon: "ScrollText" },
  { k: "incident", he: "תקלה", icon: "AlertTriangle" },
];

const KIND_ORDER = new Map(KINDS.map((x, i) => [x.k, i]));
export const kindMeta = (k: CmdKind) => KINDS[KIND_ORDER.get(k) ?? 0];

/** The SHAPE a family is drawn with. Three of them, not twelve: the eye reads
 *  "this answer is dictionary data / an executable identifier / something
 *  written" before it reads a single word. Twelve shapes would be twelve things
 *  to learn; three is a legend you absorb in one glance. */
export type CmdShape = "data" | "code" | "doc";

export const KIND_SHAPE: Record<CmdKind, CmdShape> = {
  table: "data",
  field: "data",
  cds: "data",
  tcode: "code",
  bapi: "code",
  func: "code",
  fiori: "code",
  nav: "doc",
  module: "doc",
  flow: "doc",
  chapter: "doc",
  book: "doc",
  guide: "doc",
  incident: "doc",
};

/** BAPI vs plain Function Module is decided by the identifier itself, which is
 *  a real SAP naming convention — not by a guess about what the object does. */
const isBapi = (name: string) => /^BAPI[_ ]/i.test(name.trim());

const low = (s: string) => (s || "").toLowerCase();

/* --------------------------------------------------------------- assembly */

/** The object page of a dictionary table. app/neo/object/[name] generates one
 *  for every name in the dictionary, and `ShellData.search` only ever carries
 *  `obj` for names that came out of that same dictionary — so this is always a
 *  real page, never a hopeful guess. */
const objectHref = (name: string) => `/neo/object/${encodeURIComponent(name)}/`;

export function buildIndex(data: ShellData, extra: CommandExtra): CmdRecord[] {
  const out: CmdRecord[] = [];
  const push = (r: Omit<CmdRecord, "lt" | "hay">) => {
    out.push({
      ...r,
      // A row with no page does not get a destination line invented for it.
      dest: r.dest ?? (r.href || undefined),
      lt: low(r.title),
      hay: low([r.sub, r.rel, r.mod, r.objHe].filter(Boolean).join(" ")),
    });
  };

  /* nav — the rail's own destinations, so ⌘K reaches the navigation too */
  for (const g of data.groups) {
    for (const it of g.items) {
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
  for (const r of data.search) {
    if (r.k === "table") {
      const o = r.obj ? data.objects[r.obj] : undefined;
      const c = r.obj ? data.contexts[r.obj] : undefined;
      const rel = c?.relations?.[0];
      push({
        id: `table:${r.t}`,
        k: "table",
        title: r.t,
        mono: true,
        sub: r.s,
        // THE RECORD'S OWN PAGE, not the family's list page. `/neo/tables/` is
        // where you browse tables; `/neo/object/EQUI/` is where EQUI lives.
        href: r.obj ? objectHref(r.obj) : r.href,
        mod: o?.mods.join(" · "),
        rel: rel ? `${rel.table}${rel.card ? ` · ${rel.card}` : ""}` : c?.tcodes[0],
        obj: o?.obj,
        objHe: o ? extra.zone[o.zone] : undefined,
        ctx: r.obj,
      });
      continue;
    }
    if (r.k === "tcode") {
      const own = extra.tx[r.t];
      const href = own?.[2] || null;
      push({
        id: `tcode:${r.t}`,
        k: "tcode",
        title: r.t,
        mono: true,
        sub: r.s,
        // The real transaction page when the build generates one for this code.
        href,
        mod: own?.[1] || undefined,
        rel: own?.[0] || undefined,
      });
      continue;
    }
    if (r.k === "func") {
      const own = extra.fn[r.t];
      push({
        id: `func:${r.t}`,
        k: isBapi(r.t) ? "bapi" : "func",
        title: r.t,
        mono: true,
        sub: r.s,
        href: own?.[2] || null,
        mod: own?.[1] || undefined,
        rel: own?.[0] || undefined,
        ctx: own?.[0],
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
        // THE DESTINATION IS RESOLVED ON THE SERVER, not assembled here.
        // This line used to read `/cds/${r.t}/` — a LEGACY route — so every one
        // of the 39 CDS views in the command surface walked the reader out of
        // NEO. The map arrives already gated by ref-links; "" means no page.
        href: extra.cds[r.t] || null,
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
        // Same fix as CDS above: this built `/fiori-apps/<slug>/` from a bare
        // slug and sent all 20 apps to the legacy site. `extra.fiori` now holds
        // the resolved /neo/ destination, or "" when no page exists.
        href: extra.fiori[r.t] || r.href,
      });
      continue;
    }
    push({
      id: `${r.k}:${r.t}`,
      k: r.k as CmdKind,
      title: r.t,
      mono: r.m,
      sub: r.s,
      href: r.href,
    });
  }

  /* field — the one family the rail's index has no entry for at all. Every row
     is a real blueprint field, and it opens the object page of the table that
     owns it, which is where that field is actually documented. */
  for (const [tech, he, table, type] of extra.fields) {
    push({
      id: `field:${table}.${tech}`,
      k: "field",
      title: tech,
      mono: true,
      sub: he,
      href: objectHref(table),
      mod: data.objects[table]?.mods.join(" · "),
      rel: type ? `${table} · ${type}` : table,
      obj: data.objects[table]?.obj,
      ctx: table,
    });
  }

  /* chapter · flow · guide — the build-time supplement */
  for (const r of extra.recs) {
    push({
      id: `${r.k}:${r.t}:${r.rel ?? ""}`,
      k: r.k,
      title: r.t,
      mono: false,
      sub: r.s,
      href: r.href,
      mod: r.mod,
      rel: r.rel,
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

/** Kinds that a bare navigation query should surface first. */
const KIND_BOOST: Partial<Record<CmdKind, number>> = {
  nav: 90, module: 95, table: 40, tcode: 30, flow: 20, field: 5,
};

export interface CmdResult {
  sections: CmdSection[];
  /** Flat, in render order — the keyboard walks this. */
  flat: CmdRecord[];
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
const BROWSE_CAP = 60;

/** The modules a record declares, already split. A record with none returns an
 *  empty list — it is never assigned a module to make a facet look fuller. */
const modsOf = (r: CmdRecord): string[] => (r.mod ? r.mod.split(" · ") : []);

/** The module a whole family is drawn in: the one most of its matches belong
 *  to. A family whose records declare no module stays neutral ink — the section
 *  is simply not tinted rather than borrowing a colour it has no claim to. */
function dominantMod(rows: CmdRecord[]): string | undefined {
  const n = new Map<string, number>();
  for (const r of rows) for (const m of modsOf(r)) n.set(m, (n.get(m) || 0) + 1);
  let best: string | undefined;
  let bestN = 0;
  for (const [m, c] of n) if (c > bestN) { best = m; bestN = c; }
  return best;
}

export function runQuery(
  index: CmdRecord[],
  raw: string,
  only: CmdKind | null,
  modOnly: string | null = null,
): CmdResult {
  const q = raw.trim().toLowerCase();
  const empty: CmdResult = {
    sections: [], flat: [], total: 0, mods: new Set(), modCounts: {}, browse: false,
  };
  const keepMod = (r: CmdRecord) => !modOnly || modsOf(r).includes(modOnly);

  /* BROWSE — a family chosen with no query. The idle board is not a poster of
     numbers you cannot open: picking a family lists that family, straight out
     of the same index the query walks. */
  if (!q) {
    if (!only) return empty;
    const list = index.filter((r) => r.k === only && keepMod(r));
    if (!list.length) return empty;
    list.sort((a, b) => a.lt.localeCompare(b.lt, "he"));
    const mods = new Set<string>();
    const modCounts: Record<string, number> = {};
    for (const r of list) for (const m of modsOf(r)) { mods.add(m); modCounts[m] = (modCounts[m] || 0) + 1; }
    const meta = kindMeta(only);
    const rows = list.slice(0, BROWSE_CAP);
    return {
      sections: [{ k: only, he: meta.he, icon: meta.icon, rows, total: list.length, mod: dominantMod(list) }],
      flat: rows,
      total: list.length,
      mods,
      modCounts,
      browse: true,
    };
  }

  const tokens = q.split(/\s+/).filter(Boolean);
  const buckets = new Map<CmdKind, { rec: CmdRecord; s: number }[]>();
  let total = 0;
  const mods = new Set<string>();
  const modCounts: Record<string, number> = {};

  for (const rec of index) {
    if (only && rec.k !== only) continue;
    if (!keepMod(rec)) continue;
    let s = score(rec, q);
    if (s < 0 && tokens.length > 1) {
      // Multi-word: every token has to land somewhere on the record.
      const all = tokens.every((t) => rec.lt.includes(t) || rec.hay.includes(t));
      s = all ? 150 : -1;
    }
    if (s < 0) continue;
    s += KIND_BOOST[rec.k] ?? 0;
    total += 1;
    for (const m of modsOf(rec)) { mods.add(m); modCounts[m] = (modCounts[m] || 0) + 1; }
    const list = buckets.get(rec.k);
    if (list) list.push({ rec, s });
    else buckets.set(rec.k, [{ rec, s }]);
  }

  const sections: CmdSection[] = [];
  for (const meta of KINDS) {
    const list = buckets.get(meta.k);
    if (!list || !list.length) continue;
    list.sort((a, b) => b.s - a.s || a.rec.lt.localeCompare(b.rec.lt));
    sections.push({
      k: meta.k,
      he: meta.he,
      icon: meta.icon,
      rows: list.slice(0, only ? BROWSE_CAP : PER_SECTION).map((x) => x.rec),
      total: list.length,
      mod: dominantMod(list.map((x) => x.rec)),
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
  const band = (s: CmdSection) =>
    Math.round((s.rows[0] ? score(s.rows[0], q) + (KIND_BOOST[s.k] ?? 0) : 0) / 120);
  sections.sort((a, b) => band(b) - band(a) || (KIND_ORDER.get(a.k) ?? 0) - (KIND_ORDER.get(b.k) ?? 0));

  return { sections, flat: sections.flatMap((s) => s.rows), total, mods, modCounts, browse: false };
}

/** Hebrew module label when the product has one, otherwise the key as written
 *  in the dataset. Never a translated guess. */
export const modLabel = (m: string) => MOD_HE[m] || m;
