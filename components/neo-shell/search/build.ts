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
  { k: "table", he: "טבלה", icon: "Table" },
  { k: "tcode", he: "טרנזקציה", icon: "Terminal" },
  { k: "bapi", he: "BAPI", icon: "Plug" },
  { k: "func", he: "Function Module", icon: "SquareFunction" },
  { k: "cds", he: "CDS View", icon: "Sigma" },
  { k: "fiori", he: "Fiori App", icon: "LayoutGrid" },
  { k: "flow", he: "תהליך", icon: "Workflow" },
  { k: "chapter", he: "פרק", icon: "BookMarked" },
  { k: "book", he: "ספר", icon: "BookOpen" },
  { k: "guide", he: "מדריך", icon: "ScrollText" },
  { k: "incident", he: "תקלה", icon: "AlertTriangle" },
];

const KIND_ORDER = new Map(KINDS.map((x, i) => [x.k, i]));
export const kindMeta = (k: CmdKind) => KINDS[KIND_ORDER.get(k) ?? 0];

/** BAPI vs plain Function Module is decided by the identifier itself, which is
 *  a real SAP naming convention — not by a guess about what the object does. */
const isBapi = (name: string) => /^BAPI[_ ]/i.test(name.trim());

const low = (s: string) => (s || "").toLowerCase();

/* --------------------------------------------------------------- assembly */

export function buildIndex(data: ShellData, extra: CommandExtra): CmdRecord[] {
  const out: CmdRecord[] = [];
  const push = (r: Omit<CmdRecord, "lt" | "hay">) => {
    out.push({ ...r, lt: low(r.title), hay: low([r.sub, r.rel, r.mod, r.objHe].filter(Boolean).join(" ")) });
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
        href: r.href,
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
      push({
        id: `tcode:${r.t}`,
        k: "tcode",
        title: r.t,
        mono: true,
        sub: r.s,
        href: r.href,
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
        href: r.href,
        mod: own?.[1] || undefined,
        rel: own?.[0] || undefined,
        ctx: own?.[0],
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
const KIND_BOOST: Partial<Record<CmdKind, number>> = { nav: 90, table: 40, tcode: 30, flow: 20 };

export interface CmdResult {
  sections: CmdSection[];
  /** Flat, in render order — the keyboard walks this. */
  flat: CmdRecord[];
  /** Real number of matches across every kind, before the per-section cap. */
  total: number;
  /** Modules that really appear in the matches. Drives the rail's response. */
  mods: Set<string>;
}

const PER_SECTION = 6;

export function runQuery(index: CmdRecord[], raw: string, only: CmdKind | null): CmdResult {
  const q = raw.trim().toLowerCase();
  const empty: CmdResult = { sections: [], flat: [], total: 0, mods: new Set() };
  if (!q) return empty;

  const tokens = q.split(/\s+/).filter(Boolean);
  const buckets = new Map<CmdKind, { rec: CmdRecord; s: number }[]>();
  let total = 0;
  const mods = new Set<string>();

  for (const rec of index) {
    if (only && rec.k !== only) continue;
    let s = score(rec, q);
    if (s < 0 && tokens.length > 1) {
      // Multi-word: every token has to land somewhere on the record.
      const all = tokens.every((t) => rec.lt.includes(t) || rec.hay.includes(t));
      s = all ? 150 : -1;
    }
    if (s < 0) continue;
    s += KIND_BOOST[rec.k] ?? 0;
    total += 1;
    if (rec.mod) for (const m of rec.mod.split(" · ")) mods.add(m);
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
      rows: list.slice(0, only ? 40 : PER_SECTION).map((x) => x.rec),
      total: list.length,
    });
  }
  // Strongest section first, so the answer is at the top of the surface rather
  // than wherever the fixed kind order happens to put it.
  sections.sort((a, b) => {
    const sa = a.rows[0] ? score(a.rows[0], q) + (KIND_BOOST[a.k] ?? 0) : 0;
    const sb = b.rows[0] ? score(b.rows[0], q) + (KIND_BOOST[b.k] ?? 0) : 0;
    return sb - sa || (KIND_ORDER.get(a.k) ?? 0) - (KIND_ORDER.get(b.k) ?? 0);
  });

  return { sections, flat: sections.flatMap((s) => s.rows), total, mods };
}

/** Hebrew module label when the product has one, otherwise the key as written
 *  in the dataset. Never a translated guess. */
export const modLabel = (m: string) => MOD_HE[m] || m;
