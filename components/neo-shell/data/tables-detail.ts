// Project NEO · /neo/tables/<NAME>/ — BUILD-TIME data for one dictionary table.
//
// SERVER ONLY. app/neo/tables/[name]/page.tsx calls this once per generated page
// and hands the result to a server view, so the SAP datasets never cross the
// client boundary.
//
// WHY THIS EXISTS NEXT TO THE OBJECT PAGE
//   /neo/object/<NAME>/ is the deep technical face of a table: the orbit, the
//   dual dictionary records, the process chain, the incident catalogue. What the
//   directory at /neo/tables/ was missing is the table's OWN screen — the answer
//   to "what is this table, what is in it, what does it join to, who owns it,
//   and what happens to it in S/4HANA" — with a link onward to the object page
//   for the rest. The two are one dataset read twice, not two datasets: every
//   relation, field, cardinality and JOIN below comes from
//   components/neo-shell/erd/model.ts, the same module the object page and the
//   ERD workspace read.
//
// THE DATA RULE, restated because this file is where it would be easiest to
// break: nothing here is invented. No field, no PK, no FK, no JOIN, no
// cardinality, no module ownership, no S/4 change and no description is
// completed, paraphrased or inferred. A value the blueprint leaves blank arrives
// as "" or as an empty list and the view prints the absence in words.
//
// THE LINK RULE, which is a build-correctness rule and not a style one:
// scripts/crawl-dead-links.mjs exits 1 on the first internal href in out/ with
// no page behind it. So EVERY outbound href on this shape is `string | null`,
// resolved against the list that really generates that route —
//   · another table   → tableDetailNames(), the list this route generates from
//   · a transaction   → txDetailCodes(), the list /neo/transactions/[code] uses
//   · a book          → the spine ids app/neo/books/[bookId] generates from
// and the view renders `null` as a VALUE rather than as a link. 31 of the 168
// transaction codes the blueprints name have no page in the canonical registry;
// linking them blindly is exactly the bug that produced a four-figure dead-link
// count last round.

import { LIBRARY } from "@/data/library";
import { BOOK_IDENTITY } from "@/lib/book-identity";
import { RISK_HE, TRUST_HE, s4For } from "@/lib/s4";
import type { ModuleKey } from "../types";
import { txDetailCodes } from "./tx-detail";
import {
  MOD_HE, REL_HE, ZONE_HE, cdsFor, danglingFor, edges, mergedFields, moduleRows,
  nodes, occurrences, relVar, tableNames, zoneVar,
  type FieldRow, type ModuleRow, type RelEdge, type RelKind, type Zone,
} from "../erd/model";

export { MOD_HE, REL_HE, ZONE_HE, relVar, zoneVar };
export type { ModuleRow, RelKind };

/* ------------------------------------------------------------------ types */

/** A field row of the table, with the two facts the brief demands be
 *  unmissable resolved into booleans.
 *
 *  DERIVATION, stated: the blueprint's own `key` column holds exactly four
 *  values — "PK", "FK", "PK/FK" and "-". `pk` is true when it contains PK and
 *  `fk` when it contains FK, so the 83 fields marked "PK/FK" are BOTH, which is
 *  what the column says. Nothing is guessed from a field's name. */
export interface TdField extends FieldRow {
  pk: boolean;
  fk: boolean;
}

/** One statement of a relation, as one blueprint wrote it. */
export interface TdJoin {
  mod: ModuleKey;
  /** Verbatim JOIN ON snippet, "" when the blueprint states the edge without one. */
  join: string;
  desc: string;
  pk: string;
  fk: string;
  card: string;
}

/** A modelled neighbour, read from THIS table's point of view. */
export interface TdRel {
  name: string;
  he: string;
  /** "child" ⇒ the neighbour carries the FK into this table.
   *  "parent" ⇒ this table carries the FK into the neighbour. */
  dir: "child" | "parent";
  kind: RelKind;
  /** Cardinality verbatim, "" when the blueprint left it blank. */
  card: string;
  joins: TdJoin[];
  /** Modules whose blueprint records the edge. */
  edgeMods: ModuleKey[];
  /** var(--obj-*) of the NEIGHBOUR. */
  obj: string;
  fields: number;
  /** true when the dictionary also records the opposite direction. */
  contested: boolean;
  /** The neighbour's own detail page, or null when this route does not generate
   *  one. Never a link that outruns a page. */
  href: string | null;
}

/** A relation the blueprint records whose far end the dictionary does not
 *  document. Real record, listed as a record and never as a link. */
export interface TdDangling {
  table: string;
  isParent: boolean;
  kind: RelKind;
  mod: ModuleKey;
  card: string;
  join: string;
  desc: string;
}

export interface TdTx {
  code: string;
  /** `/neo/transactions/<CODE>/` when the canonical registry documents it, else
   *  null — the code is then printed as the value it is. */
  href: string | null;
  /** Modules whose dictionary row names this code for this table. */
  mods: ModuleKey[];
}

export interface TdCds {
  view: string;
  he: string;
  /** The other classic tables the same view reads. */
  tables: string[];
}

export interface TdBook {
  id: string;
  title: string;
  titleHe: string;
  module: string;
  chapters: number;
  pages: number;
  href: string | null;
}

/** What one blueprint wrote about this table's move to S/4HANA, verbatim. */
export interface TdS4Row {
  mod: ModuleKey;
  topic: string;
  note: string;
  altTable: string;
  altTcode: string;
  sum: string;
}

/** The project's own S/4HANA standing for the table, from lib/s4.ts — curated
 *  Simplification-List knowledge first, a derivation from the blueprint's own
 *  S/4 column second, and nothing at all rather than a guess third. `trust`
 *  says which of the three happened. */
export interface TdS4 {
  impacted: boolean;
  risk: "high" | "medium" | "low" | "none";
  riskHe: string;
  trust: "verified" | "partial" | "needs";
  trustHe: string;
  changed: string;
  why: string;
  /** SAP Note / Simplification id, ONLY from a curated entry. Never invented. */
  note: string;
  tcodes: string[];
  cds: string[];
  /** What each blueprint wrote, word for word. */
  rows: TdS4Row[];
}

export interface TableDetail {
  name: string;
  he: string;
  en: string;
  zone: Zone;
  zoneHe: string;
  /** var(--obj-*) — object class of this table. */
  obj: string;
  mods: ModuleKey[];
  /** true when both blueprints document it — the real 19. */
  shared: boolean;
  /** Dictionary rows. More than one means the table is documented more than
   *  once, and both faces are kept apart rather than merged. */
  rows: ModuleRow[];
  fields: TdField[];
  pk: string[];
  fk: string[];
  rels: TdRel[];
  dangling: TdDangling[];
  tx: TdTx[];
  cds: TdCds[];
  funcs: { name: string; he: string; mods: ModuleKey[] }[];
  progs: { name: string; he: string; mods: ModuleKey[] }[];
  /** Fiori apps the blueprint names on this table, verbatim. */
  fiori: { app: string; mod: ModuleKey }[];
  books: TdBook[];
  s4: TdS4;
  /** Tables documented under the SAME blueprint topic. A derivation from the
   *  dictionary's own grouping, not a similarity judgement. */
  siblings: { name: string; he: string; topic: string; obj: string; href: string | null }[];
  /** Modelled degree, and this table's rank by it out of the whole dictionary —
   *  so the page can state how connected it is instead of asserting importance. */
  deg: number;
  rank: number;
  total: number;
  /** Onward destinations, each already proven to be a generated route. */
  objectHref: string;
  erdHref: string;
}

/* ---------------------------------------------------------------- helpers */

const uniq = <T,>(a: T[]) => [...new Set(a)];

export const tableHref = (name: string) => `/neo/tables/${encodeURIComponent(name)}/`;

/** Every table this route generates a page for — the dictionary's own list, and
 *  therefore the same list generateStaticParams() uses and the same list every
 *  gate above is resolved against. */
export function tableDetailNames(): string[] {
  return tableNames();
}

let _known: Set<string> | null = null;
const known = () => (_known ??= new Set(tableDetailNames()));

let _txCodes: Set<string> | null = null;
const txCodes = () => (_txCodes ??= new Set(txDetailCodes()));

/** Shelf id → spine id, inverted from lib/book-identity's own table. The books
 *  route generates from the spines on disk, so a shelf entry with no spine gets
 *  no link rather than a broken one. */
const SPINE_OF_SHELF: Record<string, string> = Object.fromEntries(
  Object.values(BOOK_IDENTITY)
    .filter((b) => b.shelfId)
    .map((b) => [b.shelfId as string, b.bookId]),
);

/** Books whose module matches. PP-PI also claims the PP shelf, exactly the way
 *  components/neo-shell/home/home-data.ts counts them. The link is at MODULE
 *  level and the view says so: the project's library index is keyed by chapter
 *  and holds no table-to-chapter map, so claiming a book covers this table
 *  would be an invention. */
function booksFor(mods: ModuleKey[]): TdBook[] {
  const want = new Set<string>();
  for (const m of mods) {
    if (m === "PM") want.add("PM");
    else { want.add("PP-PI"); want.add("PP"); }
  }
  return LIBRARY.filter((b) => want.has(b.module)).map((b) => ({
    id: b.id,
    title: b.title,
    titleHe: b.titleHe,
    module: b.module,
    chapters: b.chapters.length,
    pages: b.pages,
    href: SPINE_OF_SHELF[b.id] ? `/neo/books/${SPINE_OF_SHELF[b.id]}/` : null,
  }));
}

/** The table's S/4HANA standing. The blueprint columns are read across every
 *  dictionary row and the FIRST non-empty one wins — a table documented twice
 *  is still one physical table, and the resolver takes one note. */
function standingOf(rows: ModuleRow[], name: string): TdS4 {
  const note = rows.map((r) => r.s4Note).find(Boolean) || "";
  const alt = rows.map((r) => r.s4AltTable).find(Boolean) || "";
  const st = s4For(name, note, alt);
  return {
    impacted: st.impacted,
    risk: st.risk,
    riskHe: RISK_HE[st.risk] || "",
    trust: st.trust,
    trustHe: TRUST_HE[st.trust] || "",
    changed: (st.impact?.changed || "").trim(),
    why: (st.impact?.why || "").trim(),
    note: (st.impact?.note || "").trim(),
    tcodes: uniq(st.impact?.tcodes || []),
    cds: uniq(st.impact?.cds || []),
    rows: rows
      .filter((r) => r.s4Note || r.s4AltTable || r.s4AltTcode || r.sumNote)
      .map((r) => ({
        mod: r.mod,
        topic: r.topic,
        note: r.s4Note,
        altTable: r.s4AltTable,
        altTcode: r.s4AltTcode,
        sum: r.sumNote,
      })),
  };
}

let _rank: Map<string, number> | null = null;
function degreeRank(): Map<string, number> {
  if (_rank) return _rank;
  const list = [...nodes().values()].sort((a, b) => b.deg - a.deg || a.n.localeCompare(b.n));
  _rank = new Map(list.map((n, i) => [n.n, i + 1]));
  return _rank;
}

/* ------------------------------------------------------------------ build */

const cache = new Map<string, TableDetail>();

export function tableDetail(raw: string): TableDetail | null {
  const name = (raw || "").toUpperCase();
  const hit = cache.get(name);
  if (hit) return hit;

  const node = nodes().get(name);
  if (!node) return null;

  const rows = moduleRows(name);
  const ns = nodes();

  /* -- fields, with the two key facts resolved -------------------------- */
  const fields: TdField[] = mergedFields(name).map((f) => ({
    ...f,
    pk: f.key.includes("PK"),
    fk: f.key.includes("FK"),
  }));
  const pk = fields.filter((f) => f.pk).map((f) => f.tech);
  const fk = fields.filter((f) => f.fk).map((f) => f.tech);

  /* -- relations, re-read from this table's point of view ---------------- */
  const rels: TdRel[] = [];
  for (const e of edges() as RelEdge[]) {
    const isParent = e.parent === name;
    const isChild = e.child === name;
    if (!isParent && !isChild) continue;
    const other = isParent ? e.child : e.parent;
    const on = ns.get(other);
    if (!on) continue;
    rels.push({
      name: other,
      he: on.he,
      dir: isParent ? "child" : "parent",
      kind: e.kind,
      card: e.says.find((s) => s.card)?.card || "",
      joins: e.says.map((s) => ({ mod: s.mod, join: s.join, desc: s.desc, pk: s.pk, fk: s.fk, card: s.card })),
      edgeMods: e.mods,
      obj: on.obj,
      fields: on.fields,
      contested: e.contested,
      href: known().has(other) ? tableHref(other) : null,
    });
  }
  // Children first — they hang off this table's primary key — then by how
  // deeply the far end is documented, then alphabetically.
  rels.sort(
    (a, b) =>
      (a.dir === b.dir ? 0 : a.dir === "child" ? -1 : 1) ||
      b.fields - a.fields ||
      a.name.localeCompare(b.name),
  );

  /* -- transactions, gated against the canonical registry ---------------- */
  const txMods = new Map<string, ModuleKey[]>();
  for (const r of rows) {
    for (const c of r.tcodes) {
      const prev = txMods.get(c);
      if (prev) { if (!prev.includes(r.mod)) prev.push(r.mod); }
      else txMods.set(c, [r.mod]);
    }
  }
  const tx: TdTx[] = [...txMods.entries()]
    .map(([code, mods]) => ({
      code,
      mods,
      href: txCodes().has(code) ? `/neo/transactions/${encodeURIComponent(code)}/` : null,
    }))
    .sort((a, b) => a.code.localeCompare(b.code));

  /* -- interfaces and programmes, verbatim ------------------------------- */
  const funcMap = new Map<string, { name: string; he: string; mods: ModuleKey[] }>();
  const progMap = new Map<string, { name: string; he: string; mods: ModuleKey[] }>();
  for (const r of rows) {
    for (const [fn, he] of r.funcs) {
      const k = (fn || "").trim();
      if (!k) continue;
      const prev = funcMap.get(k);
      if (prev) { if (!prev.mods.includes(r.mod)) prev.mods.push(r.mod); }
      else funcMap.set(k, { name: k, he: (he || "").trim(), mods: [r.mod] });
    }
    for (const [pn, he] of r.progs) {
      const k = (pn || "").trim();
      if (!k) continue;
      const prev = progMap.get(k);
      if (prev) { if (!prev.mods.includes(r.mod)) prev.mods.push(r.mod); }
      else progMap.set(k, { name: k, he: (he || "").trim(), mods: [r.mod] });
    }
  }

  /* -- siblings: the dictionary's own topic grouping --------------------- */
  const topics = new Set(rows.map((r) => r.topic).filter(Boolean));
  const siblings: TableDetail["siblings"] = [];
  const seenSib = new Set<string>();
  for (const [other, occ] of occurrences()) {
    if (other === name || seenSib.has(other)) continue;
    const on = ns.get(other);
    if (!on) continue;
    const shared = occ.find((o) => topics.has(o.table.topicTitle || ""));
    if (!shared) continue;
    seenSib.add(other);
    siblings.push({
      name: other,
      he: on.he,
      topic: shared.table.topicTitle || "",
      obj: on.obj,
      href: known().has(other) ? tableHref(other) : null,
    });
  }
  siblings.sort((a, b) => a.topic.localeCompare(b.topic, "he") || a.name.localeCompare(b.name));

  const view: TableDetail = {
    name,
    he: node.he,
    en: rows.find((r) => r.descEn)?.descEn || "",
    zone: node.zone,
    zoneHe: ZONE_HE[node.zone],
    obj: node.obj,
    mods: node.mods,
    shared: node.mods.length > 1,
    rows,
    fields,
    pk,
    fk,
    rels,
    dangling: danglingFor(name).map((d) => ({
      table: d.table,
      isParent: d.isParent,
      kind: d.kind,
      mod: d.mod,
      card: d.card,
      join: d.join,
      desc: d.desc,
    })),
    tx,
    cds: cdsFor(name),
    funcs: [...funcMap.values()],
    progs: [...progMap.values()],
    fiori: rows.filter((r) => r.fiori).map((r) => ({ app: r.fiori, mod: r.mod })),
    books: booksFor(node.mods),
    s4: standingOf(rows, name),
    siblings,
    deg: node.deg,
    rank: degreeRank().get(name) || 0,
    total: ns.size,
    // Both are generated: the object route builds from the same tableNames()
    // list as this one, and /neo/erd/ is a hand-written page.
    objectHref: `/neo/object/${encodeURIComponent(name)}/`,
    erdHref: `/neo/erd/#${encodeURIComponent(name)}`,
  };
  cache.set(name, view);
  return view;
}

/** Counts the page states out loud instead of asserting them. Every number is
 *  the length of something the dictionary really holds. */
export const tableSummary = (t: TableDetail) => ({
  fields: t.fields.length,
  pk: t.pk.length,
  fk: t.fk.length,
  rels: t.rels.length,
  children: t.rels.filter((r) => r.dir === "child").length,
  parents: t.rels.filter((r) => r.dir === "parent").length,
  joins: t.rels.reduce((a, r) => a + r.joins.filter((j) => j.join).length, 0),
  contested: uniq(t.rels.filter((r) => r.contested).map((r) => r.name)).length,
  tx: t.tx.length,
  txLinked: t.tx.filter((x) => x.href).length,
  cds: t.cds.length,
  funcs: t.funcs.length,
  books: t.books.length,
  siblings: t.siblings.length,
});
