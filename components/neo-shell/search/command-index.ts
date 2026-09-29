// Project NEO · the command surface — BUILD-TIME index supplement.
//
// Runs on the SERVER only. components/neo-shell/neo-shell.tsx is a server
// component whose whole job is to call this once and hand the result to the
// client shell as plain serialisable props, exactly the way app/neo/layout.tsx
// already hands over shellData(). Importing this file from a client component
// would drag the entire SAP knowledge base into the browser bundle.
//
// WHAT THIS FILE ADDS
//   Everything the command surface can find that `ShellData.search` (tables,
//   CDS views, Fiori apps, incidents) does not already carry: the modules, the
//   fields, every transaction and every function object with a page, the
//   enhancement techniques, the objects outside the PM/PP-PI dictionary, the
//   books, their chapters, the business domains, the concepts, the work centres
//   and their topics, and the best practices. Gate 6 (major 9) and gate 5
//   (blocker 1) measured the index reaching 162 of 1,818 transaction pages; a
//   code with a page now always has a row.
//
// DESTINATIONS ARE RESOLVED HERE, AGAINST THE ROUTES THAT ARE REALLY GENERATED.
//   Every destination below comes from the same list the route's
//   generateStaticParams builds from — through components/neo-shell/reference/
//   ref-links (the one gate the /neo namespace uses) or the family's own slug
//   list — so a record with no page carries no destination and the surface
//   says so. test/search-index-routes.test.ts holds every href to that.
//
// HONESTY RULE (the same one nav-data.ts is built on): nothing below is
// authored. Every title, every subtitle and every relationship is read straight
// out of the dataset, and a family with pages that the index does not carry is
// declared in `gaps` rather than left for the reader to notice.
//
// SIZE. This object is inlined into every NEO page, so the two large families
// travel as tuples with their repeated values (module, status) as indexes.

import { PM_DATA, PPPI_DATA } from "@/data/sapData";
import { moduleTables, overviewStats } from "@/lib/module-portal";
import { ZONES } from "@/lib/studio-graph";
import { cleanFunc } from "@/lib/object-intel";
import { txRegistry } from "@/lib/tx-registry";
import { getBook } from "@/lib/library/registry";
import { chapterTitle } from "@/lib/library/book";
import { BOOK_IDENTITY } from "@/lib/book-identity";
import { CDS_VIEWS } from "@/data/cds-map";
import { FIORI_APPS } from "@/data/fiori/apps";
import { LIBRARY } from "@/data/library";
import { DOMAINS } from "@/data/domains";
import { CONCEPTS } from "@/data/concepts";
import { BEST_PRACTICES } from "@/data/best-practices";
import { cdsHref, fioriHref, objectHref, txHref } from "../reference/ref-links";
import { bapiDir } from "../reference/bapi-data";
import { idocDir } from "../reference/idoc-data";
import { enhDir } from "../reference/enh-data";
import { txStatusMap } from "../data/tx-detail";
import { tableDetailNames } from "../data/tables-detail";
import { objectNames } from "../object/object-names";
import { auxView } from "../object/object-aux";
import { CENTER_FAMILIES } from "../centers/centers-data";
import { readerBookIds } from "../reader/reader-data";
import { bookHubData, bookIds } from "../books/books-data";
import { MOD_HE } from "../mod-var";
import type { SAPModuleData } from "@/lib/types";
import type {
  CmdExtraRecord, CmdFieldTuple, CmdFnTuple, CmdModuleRecord, CmdTxTuple, CommandExtra,
} from "./types";

/** Same split rule the transaction list in lib/module-portal uses, re-stated
 *  here because that one is a local closure. Keeping the two in sync matters:
 *  a code this map does not recognise simply gets no relationship line, which
 *  is the honest failure mode. */
const splitTcodes = (s: string): string[] =>
  (s || "")
    .split(/[,\s/]+/)
    .map((x) => x.trim().toUpperCase())
    .filter((x) => /^[A-Z][A-Z0-9_]{1,}$/.test(x));

const clip = (s: string, n: number) => {
  const t = (s || "").replace(/\s+/g, " ").trim();
  return t.length > n ? `${t.slice(0, n - 1)}…` : t;
};

const enc = encodeURIComponent;

/* ------------------------------------------------------------- ownership */

/** Which tables and modules the PM / PP-PI blueprints document a transaction
 *  and a function object on. Read from the very same `moduleTables()` rows the
 *  dictionary pages render, so a relationship shown in a search result is one
 *  the reader can go and verify. Function names are keyed by their CLEAN
 *  identifier (lib/object-intel cleanFunc), the key their pages use. */
function ownership() {
  const tx = new Map<string, { tables: Set<string>; mods: Set<string> }>();
  const fn = new Map<string, { table: string; mod: string }>();
  for (const m of [PM_DATA, PPPI_DATA] as SAPModuleData[]) {
    for (const t of moduleTables(m)) {
      for (const [raw] of t.funcs || []) {
        const id = cleanFunc(raw);
        if (id && !fn.has(id)) fn.set(id, { table: t.tableName, mod: m.module });
      }
      for (const code of splitTcodes(t.tcodes)) {
        const own = tx.get(code) ?? { tables: new Set<string>(), mods: new Set<string>() };
        own.tables.add(t.tableName);
        own.mods.add(m.module);
        tx.set(code, own);
      }
    }
  }
  return { tx, fn };
}

/** Three names, then an honest count of the rest — never a rounded "many". */
const tablesLine = (tables: Set<string>) => {
  const list = [...tables].sort();
  const head = list.slice(0, 3).join(" · ");
  return list.length > 3 ? `${head} +${list.length - 3}` : head;
};

/* ---------------------------------------------------------- transactions */

/** EVERY transaction the registry holds — the list /neo/transactions/[code]
 *  generates from — with the registry's own Hebrew line (gate 6, major 10:
 *  every row used to carry the same generic subtitle), then the blueprint
 *  codes the registry does not carry, which have no page and say so. */
function transactions(own: ReturnType<typeof ownership>["tx"]) {
  const status = txStatusMap();
  const txMods: string[] = [];
  const txSts: string[] = [];
  const at = (list: string[], v: string) => {
    let i = list.indexOf(v);
    if (i < 0) { i = list.length; list.push(v); }
    return i;
  };
  const txs: CmdTxTuple[] = [];
  const row = (code: string, he: string, registryMod: string) => {
    const bp = own.get(code);
    const st = status[code];
    txs.push([
      code,
      he,
      at(txMods, bp ? [...bp.mods].join(" · ") : registryMod),
      st ? at(txSts, st) : -1,
      bp ? tablesLine(bp.tables) : "",
      txHref(code) ? 1 : 0,
    ]);
  };
  for (const t of txRegistry().values()) row(t.code, t.he, t.module);
  const known = new Set(txs.map((t) => t[0]));
  for (const code of own.keys()) if (!known.has(code)) row(code, "", "");
  return { txs, txMods, txSts };
}

/* ------------------------------------------------------- function objects */

/** One row per page (gate 6, major 11): the /neo/bapi directory and the
 *  /neo/idoc directory, each row with the clean identifier, the Hebrew line and
 *  the S/4HANA status its page shows. The blueprint table a function is
 *  documented on is kept, because the row can load it into the context shelf. */
function functionObjects(own: ReturnType<typeof ownership>["fn"]): CmdFnTuple[] {
  return [...bapiDir().rows, ...idocDir().rows].map((r) => {
    const bp = own.get(r.name);
    const row: CmdFnTuple = [
      r.name,
      r.he,
      r.mods.join(" · ") || bp?.mod || "",
      r.s4.status.key || "",
      r.href,
      bp?.table || "",
    ];
    // A process concept keeps its /neo/bapi page and is labelled as the page
    // labels it, never as a function module.
    if (r.kind !== "FM" && r.kind !== "BAPI" && r.kind !== "IDoc") row.push(r.kind);
    return row;
  });
}

/* ---------------------------------------------------- the extra families */

/** The two modules the project documents. Their counts come from the same
 *  overviewStats() the module workspaces render, so the relationship line on a
 *  module result is the module's real size. */
function modules(): CmdModuleRecord[] {
  return ([
    ["PM", "PM · תחזוקת מפעל", PM_DATA, "/neo/pm/"],
    ["PP-PI", "PP-PI · ייצור תהליכי", PPPI_DATA, "/neo/pp-pi/"],
  ] as [string, string, SAPModuleData, string][]).map(([key, label, data, href]) => {
    const st = overviewStats(data);
    return {
      key,
      label,
      he: MOD_HE[key] || key,
      href,
      rel: `${st.tables} טבלאות · ${st.transactions} טרנזקציות · ${st.topics} נושאים`,
    };
  });
}

/** Every dictionary FIELD, with the table that owns it. `t.fields` is extracted
 *  verbatim from the blueprints. */
function fields(): CmdFieldTuple[] {
  const out: CmdFieldTuple[] = [];
  const seen = new Set<string>();
  for (const m of [PM_DATA, PPPI_DATA] as SAPModuleData[]) {
    for (const t of moduleTables(m)) {
      for (const f of t.fields) {
        const tech = (f.tech || "").trim();
        if (!tech) continue;
        // A field is identified by its table AND its name: MATNR on MARA and
        // MATNR on AFPO are two real, separately documented rows.
        const id = `${t.tableName}.${tech}`;
        if (seen.has(id)) continue;
        seen.add(id);
        const type = [f.dt, f.len].filter(Boolean).join(" ");
        out.push([tech, clip(f.he || f.en, 64), t.tableName, [f.key !== "-" ? f.key : "", type].filter(Boolean).join(" · ")]);
      }
    }
  }
  return out;
}

/** The objects outside the PM/PP-PI dictionary (HR, BW and the verified
 *  cross-module staples) that /neo/object generates a page for. The dictionary
 *  tables themselves are table rows, opened on their table page. */
function objects(): CmdExtraRecord[] {
  const tables = new Set(tableDetailNames());
  const out: CmdExtraRecord[] = [];
  for (const name of objectNames()) {
    if (tables.has(name)) continue;
    const v = auxView(name);
    out.push({
      k: "object",
      t: name,
      s: v?.he || "",
      href: objectHref(name),
      m: 1,
      rel: v?.familyHe || undefined,
    });
  }
  return out;
}

/** The thirteen enhancement techniques, from the /neo/enhancements directory:
 *  its identifier, its Hebrew line, its kind and the status its page shows. */
function enhancements(): CmdExtraRecord[] {
  return enhDir().rows.map((r) => ({
    k: "enh" as const,
    t: r.name,
    s: r.he,
    href: r.href,
    m: 1 as const,
    rel: r.kind,
    st: r.s4.status.key,
  }));
}

/** The shelf: every book /neo/books/[bookId] generates, named as the shelf
 *  names it. A book result opens the book, not the shelf (gate 6, major 13). */
function books(): CmdExtraRecord[] {
  const out: CmdExtraRecord[] = [];
  for (const id of bookIds()) {
    const card = bookHubData(id)?.book;
    if (!card) continue;
    out.push({
      k: "book",
      t: card.titleHe || card.titleEn,
      s: card.titleHe ? card.titleEn : "",
      href: card.hubHref,
      rel: `${card.chapters} פרקים`,
    });
  }
  return out;
}

/** Chapters, built from the registry the reader is generated from (gate 6,
 *  blocker 1). The hrefs used to be built from data/library.ts ids
 *  (config-pm, pm-business-user …) while /neo/read/ is generated from the
 *  registry's (book1 … book11), so all 105 chapter results were 404s. Now the
 *  book id is the reader's own, the chapter number is one the reader really
 *  has, and data/library.ts contributes only what it adds: the Hebrew chapter
 *  line and its summary, matched through lib/book-identity's shelf id. */
function chapters(): CmdExtraRecord[] {
  const shelf = new Map(LIBRARY.map((b) => [b.id, b]));
  const out: CmdExtraRecord[] = [];
  for (const id of readerBookIds()) {
    const book = getBook(id);
    const card = bookHubData(id)?.book;
    if (!book || !card) continue;
    const lib = shelf.get(BOOK_IDENTITY[id]?.shelfId ?? "");
    const title = lib?.titleHe || card.titleHe || card.titleEn;
    for (const c of book.chapters) {
      const lc = lib?.chapters.find((x) => x.n === c.n);
      const page = lc?.page ?? c.startPage;
      const own = chapterTitle(c);
      out.push({
        k: "chapter",
        t: lc?.he || own,
        // The chapter's own summary when the shelf index has one; otherwise
        // the reader's title for it when that differs from the row's title.
        s: lc ? clip(lc.bodyHe || lc.en, 96) : own !== c.title.en ? c.title.en : "",
        href: `/neo/read/${enc(id)}/?c=${c.n}`,
        mod: lib?.module,
        rel: page ? `${title} · פרק ${c.n} · עמ׳ ${page}` : `${title} · פרק ${c.n}`,
      });
    }
  }
  return out;
}

function flows(): CmdExtraRecord[] {
  // Every DOMAINS slug is exactly what /neo/domain/[slug]/generateStaticParams
  // builds from (domainSlugs maps the same array), so each hit lands on its own
  // domain page instead of the generic ERD.
  return DOMAINS.map((d) => ({
    k: "flow" as const,
    t: d.he,
    s: clip(d.summary, 96),
    href: `/neo/domain/${d.slug}/`,
    mod: d.module,
    rel: `${d.flow.length} שלבים · ${d.tables.length} טבלאות · ${d.tcodes.length} טרנזקציות`,
  }));
}

function guides(): CmdExtraRecord[] {
  // Same contract as flows(): /neo/knowledge/[slug]/ generates from these very
  // slugs (conceptSlugs), so a concept hit opens the concept, not the index.
  return CONCEPTS.map((c) => ({
    k: "guide" as const,
    t: c.he,
    s: clip(c.biz, 96),
    href: `/neo/knowledge/${c.slug}/`,
    rel: `${c.title} · ${c.group}`,
  }));
}

/** The work centres and their topics: /neo/centers/[family] and
 *  /neo/centers/[family]/[slug] generate from these same arrays. */
function centres(): CmdExtraRecord[] {
  const out: CmdExtraRecord[] = [];
  for (const f of CENTER_FAMILIES) {
    out.push({
      k: "center",
      t: f.he,
      s: f.lede,
      href: `/neo/centers/${enc(f.id)}/`,
      rel: `${f.en} · ${f.items.length} נושאים`,
    });
    for (const i of f.items) {
      out.push({
        k: "topic",
        t: i.he,
        s: clip(i.sub, 96),
        href: `/neo/centers/${enc(f.id)}/${enc(i.slug)}/`,
        mod: i.module && i.module !== "Cross" ? i.module : undefined,
        rel: f.he,
      });
    }
  }
  return out;
}

function bestPractices(): CmdExtraRecord[] {
  // Same contract again: /neo/best-practices/[slug]/ generates from bpSlugs(),
  // which maps this very array, so a hit opens the practice itself.
  return BEST_PRACTICES.map((b) => ({
    k: "bp" as const,
    t: b.he,
    s: clip(b.summary, 96),
    href: `/neo/best-practices/${enc(b.slug)}/`,
    mod: b.module === "Cross" ? undefined : b.module,
    rel: `${b.steps.length} צעדים · ${b.evidence.length} מקורות`,
  }));
}

/* ------------------------------------------------------------------ build */

let cached: CommandExtra | null = null;

export function commandIndex(): CommandExtra {
  if (cached) return cached;
  const own = ownership();
  const zone: Record<string, string> = {};
  for (const z of ZONES) zone[z.id] = z.he;

  // id -> RESOLVED destination. The client no longer builds an href from a
  // slug, because that is where the legacy path was being reconstructed.
  const fiori: Record<string, string> = {};
  for (const a of FIORI_APPS) fiori[a.id] = fioriHref(a.slug) || "";

  const cds: Record<string, string> = {};
  for (const v of CDS_VIEWS) cds[v.view] = cdsHref(v.view) || "";

  cached = {
    recs: [
      ...objects(), ...enhancements(), ...books(), ...chapters(),
      ...flows(), ...guides(), ...centres(), ...bestPractices(),
    ],
    mods: modules(),
    fields: fields(),
    ...transactions(own.tx),
    fns: functionObjects(own.fn),
    fiori,
    cds,
    zone,
    // Families with pages that this index does not carry, stated in the
    // surface footer so their absence is a fact rather than a surprise.
    gaps: [
      { he: "שיעורי SAP Academy", why: "אינם באינדקס. הם נפתחים מעמודי הקורסים." },
      { he: "אובייקטי S/4HANA", why: "אין להם עמוד לכל אובייקט. הם מרוכזים במרכז S/4HANA." },
    ],
  };
  return cached;
}
