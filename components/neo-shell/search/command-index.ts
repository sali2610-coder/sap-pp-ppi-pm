// Project NEO · the command surface — BUILD-TIME index supplement.
//
// Runs on the SERVER only. components/neo-shell/neo-shell.tsx is a server
// component whose whole job is to call this once and hand the result to the
// client shell as plain serialisable props, exactly the way app/neo/layout.tsx
// already hands over shellData(). Importing this file from a client component
// would drag the entire SAP knowledge base into the browser bundle.
//
// WHAT THIS FILE IS ALLOWED TO ADD
//   Only what `ShellData.search` cannot already answer. Tables, transactions,
//   function objects, CDS views, Fiori apps, books and incidents are already in
//   that index and are NOT duplicated here. What is missing from it, and is
//   real in the project data, is five more result families the command surface
//   is asked for — module, field, chapter, flow and guide — plus the ownership
//   and destination maps that turn a bare identifier into a row with a real
//   relationship and a real route.
//
// DESTINATIONS ARE RESOLVED HERE, AGAINST THE ROUTES THAT ARE REALLY GENERATED.
//   Every destination below is resolved by components/neo-shell/reference/
//   ref-links, which is the ONE gate the whole /neo namespace uses: it answers
//   with a route only when the name is in the very list that route's
//   generateStaticParams builds from, and with null otherwise. A record with no
//   page carries "" and the surface states that plainly.
//
//   This file used to resolve its own destinations, and it resolved them to the
//   LEGACY routes: `/tcode/<code>/`, `/bapi/<name>/`, `/fiori-apps/<slug>/`.
//   The command surface is the fastest way to move around NEO, and it was the
//   fastest way OUT of it — 1,817 transaction codes, 145 BAPIs, 39 CDS views
//   and 20 Fiori apps all pointed at the old site. Verified before the change:
//   the five ref-links gates and the five /neo routes agree on every single
//   name, 0 misses in 2,023 records, so nothing was downgraded to plain text.
//
// HONESTY RULE (the same one nav-data.ts is built on): nothing below is
// authored. Every title, every subtitle and every relationship is read straight
// out of the dataset, and a family with no dataset behind it is declared in
// `gaps` rather than filled with plausible rows.

import { PM_DATA, PPPI_DATA } from "@/data/sapData";
import { moduleTables, overviewStats } from "@/lib/module-portal";
import { ZONES } from "@/lib/studio-graph";
import { classifyFunc, cleanFunc } from "@/lib/object-intel";
import { CDS_VIEWS } from "@/data/cds-map";
import { FIORI_APPS } from "@/data/fiori/apps";
import { LIBRARY } from "@/data/library";
import { DOMAINS } from "@/data/domains";
import { CONCEPTS } from "@/data/concepts";
import { bapiHref, cdsHref, fioriHref, idocHref, txHref } from "../reference/ref-links";
import { MOD_HE } from "../mod-var";
import type { SAPModuleData } from "@/lib/types";
import type {
  CmdExtraRecord, CmdFieldTuple, CmdModuleRecord, CommandExtra,
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

/* ------------------------------------------------------------ destinations */

/** The NEO destination of a function object, or "" when neither /neo/bapi nor
 *  /neo/idoc generates a page for it. The IDoc / BAPI split is the identifier's
 *  own classification, not a guess — and each side is gated by the registry the
 *  corresponding route generates from. */
function funcDest(raw: string): string {
  const c = cleanFunc(raw);
  if (!c) return "";
  return (classifyFunc(c) === "IDoc" ? idocHref(c) : bapiHref(c)) || "";
}

/* ------------------------------------------------------------- ownership */

/** Which table (and module) a function object is documented on, which tables a
 *  transaction code appears on, and where each of them actually opens. All of
 *  it is read from the very same `moduleTables()` rows the dictionary pages
 *  render, so a relationship shown in a search result is a relationship the
 *  reader can go and verify. */
function ownership(): { fn: CommandExtra["fn"]; tx: CommandExtra["tx"] } {
  const fn: CommandExtra["fn"] = {};
  const txTables = new Map<string, Set<string>>();
  const txMods = new Map<string, Set<string>>();

  for (const m of [PM_DATA, PPPI_DATA] as SAPModuleData[]) {
    const mod = m.module;
    for (const t of moduleTables(m)) {
      for (const [raw] of t.funcs || []) {
        const nm = (raw || "").trim();
        if (!nm || fn[nm]) continue;
        fn[nm] = [t.tableName, mod, funcDest(nm)];
      }
      for (const code of splitTcodes(t.tcodes)) {
        if (!txTables.has(code)) { txTables.set(code, new Set()); txMods.set(code, new Set()); }
        txTables.get(code)!.add(t.tableName);
        txMods.get(code)!.add(mod);
      }
    }
  }

  const tx: CommandExtra["tx"] = {};
  for (const [code, tables] of txTables) {
    const list = [...tables].sort();
    // Three names, then an honest count of the rest — never a rounded "many".
    const head = list.slice(0, 3).join(" · ");
    tx[code] = [
      list.length > 3 ? `${head} +${list.length - 3}` : head,
      [...(txMods.get(code) || [])].join(" · "),
      txHref(code) || "",
    ];
  }
  return { fn, tx };
}

/* ---------------------------------------------------- the extra families */

/** The two modules the project documents. Their counts come from the same
 *  overviewStats() the module workspaces render, so the relationship line on a
 *  module result is the module's real size. */
function modules(): CmdModuleRecord[] {
  return ([
    ["PM", "אחזקה · PM", PM_DATA, "/neo/pm/"],
    ["PP-PI", "ייצור · PP-PI", PPPI_DATA, "/neo/pp-pi/"],
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

/** Every dictionary FIELD, with the table that owns it. The field family is the
 *  one the brief names that the rail's own index has no entry for at all, and
 *  it is fully backed: `t.fields` is extracted verbatim from the blueprints. */
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

function chapters(): CmdExtraRecord[] {
  const out: CmdExtraRecord[] = [];
  for (const b of LIBRARY) {
    const title = b.titleHe || b.title;
    for (const c of b.chapters) {
      out.push({
        k: "chapter",
        t: c.he || c.en,
        s: clip(c.bodyHe || c.en, 96),
        // Record-level destination: the reader itself, opened on this chapter —
        // the same `?c=` contract the book hub uses. A chapter hit that landed
        // on the shelf made the reader re-find what the palette already knew.
        href: `/neo/read/${b.id}/?c=${c.n}`,
        mod: b.module,
        rel: c.page ? `${title} · פרק ${c.n} · עמ׳ ${c.page}` : `${title} · פרק ${c.n}`,
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

/* ------------------------------------------------------------------ build */

let cached: CommandExtra | null = null;

export function commandIndex(): CommandExtra {
  if (cached) return cached;
  const { fn, tx } = ownership();
  const zone: Record<string, string> = {};
  for (const z of ZONES) zone[z.id] = z.he;

  // id -> RESOLVED destination. The client no longer builds an href from a
  // slug, because that is where the legacy path was being reconstructed.
  const fiori: Record<string, string> = {};
  for (const a of FIORI_APPS) fiori[a.id] = fioriHref(a.slug) || "";

  const cds: Record<string, string> = {};
  for (const v of CDS_VIEWS) cds[v.view] = cdsHref(v.view) || "";

  cached = {
    recs: [...chapters(), ...flows(), ...guides()],
    mods: modules(),
    fields: fields(),
    fn,
    tx,
    fiori,
    cds,
    zone,
    // The one family the brief names that has no separate record of its own in
    // this project. Printed in the surface footer so its absence is a stated
    // fact rather than something the reader has to notice.
    gaps: [
      {
        he: "אובייקט",
        why: "אין ישות «אובייקט» נפרדת בנתוני הפרויקט: אובייקט מילון הוא הטבלה עצמה, ולכן תוצאות «טבלה» נפתחות לעמוד האובייקט המלא ב-/neo/object.",
      },
    ],
  };
  return cached;
}
