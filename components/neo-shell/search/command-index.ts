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
//   `/tcode/[code]` builds its params from registryCodes() ∪ listTcodes();
//   `/bapi/[name]` from the function registry's ids; `/idoc/[name]` from
//   listFuncs("IDoc"); `/fiori-apps/[slug]` from FIORI_APPS[].slug. Each map
//   below is checked against the SAME expression the route uses, so a search
//   result can never offer a link to a page the build did not produce. A record
//   with no page carries "" and the surface states that plainly.
//
// HONESTY RULE (the same one nav-data.ts is built on): nothing below is
// authored. Every title, every subtitle and every relationship is read straight
// out of the dataset, and a family with no dataset behind it is declared in
// `gaps` rather than filled with plausible rows.

import { PM_DATA, PPPI_DATA } from "@/data/sapData";
import { moduleTables, overviewStats } from "@/lib/module-portal";
import { ZONES } from "@/lib/studio-graph";
import { classifyFunc, cleanFunc, funcHref, listFuncs, listTcodes } from "@/lib/object-intel";
import { registry as funcRegistry } from "@/lib/bapi-registry";
import { registryCodes } from "@/lib/tx-registry";
import { FIORI_APPS } from "@/data/fiori/apps";
import { LIBRARY } from "@/data/library";
import { DOMAINS } from "@/data/domains";
import { CONCEPTS } from "@/data/concepts";
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

/** Every transaction code that really has a generated page. Built from the very
 *  expression app/tcode/[code]/generateStaticParams uses. */
function tcodePages(): Set<string> {
  const s = new Set<string>();
  for (const c of registryCodes()) s.add(c.toUpperCase());
  for (const c of listTcodes()) s.add(c.toUpperCase());
  return s;
}

/** The destination of a function object, or "" when neither /bapi nor /idoc
 *  generates a page for it. */
function funcDest(raw: string, bapiIds: Set<string>, idocNames: Set<string>): string {
  const c = cleanFunc(raw);
  if (!c) return "";
  const isIdoc = classifyFunc(c) === "IDoc";
  if (isIdoc ? !idocNames.has(c) : !bapiIds.has(c)) return "";
  return `${funcHref(c)}/`;
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

  const bapiIds = new Set(funcRegistry().map((o) => o.id));
  const idocNames = new Set(listFuncs("IDoc"));
  const txPages = tcodePages();

  for (const m of [PM_DATA, PPPI_DATA] as SAPModuleData[]) {
    const mod = m.module;
    for (const t of moduleTables(m)) {
      for (const [raw] of t.funcs || []) {
        const nm = (raw || "").trim();
        if (!nm || fn[nm]) continue;
        fn[nm] = [t.tableName, mod, funcDest(nm, bapiIds, idocNames)];
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
      txPages.has(code) ? `/tcode/${encodeURIComponent(code)}/` : "",
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
        href: "/neo/library/",
        mod: b.module,
        rel: c.page ? `${title} · פרק ${c.n} · עמ׳ ${c.page}` : `${title} · פרק ${c.n}`,
      });
    }
  }
  return out;
}

function flows(): CmdExtraRecord[] {
  return DOMAINS.map((d) => ({
    k: "flow" as const,
    t: d.he,
    s: clip(d.summary, 96),
    href: "/neo/erd/",
    mod: d.module,
    rel: `${d.flow.length} שלבים · ${d.tables.length} טבלאות · ${d.tcodes.length} טרנזקציות`,
  }));
}

function guides(): CmdExtraRecord[] {
  return CONCEPTS.map((c) => ({
    k: "guide" as const,
    t: c.he,
    s: clip(c.biz, 96),
    href: "/neo/knowledge/",
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

  const fiori: Record<string, string> = {};
  for (const a of FIORI_APPS) fiori[a.id] = a.slug;

  cached = {
    recs: [...chapters(), ...flows(), ...guides()],
    mods: modules(),
    fields: fields(),
    fn,
    tx,
    fiori,
    zone,
    // The one family the brief names that has no separate record of its own in
    // this project. Printed in the surface footer so its absence is a stated
    // fact rather than something the reader has to notice.
    gaps: [
      {
        he: "אובייקט",
        why: "אין ישות «אובייקט» נפרדת בנתוני הפרויקט — אובייקט מילון הוא הטבלה עצמה, ולכן תוצאות «טבלה» נפתחות לעמוד האובייקט המלא ב-/neo/object.",
      },
    ],
  };
  return cached;
}
