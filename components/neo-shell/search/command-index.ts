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
//   real in the project data, is three more result families the command surface
//   is asked for — chapter, flow and guide — plus two ownership maps that turn a
//   bare identifier into a row with a real relationship.
//
// HONESTY RULE (the same one nav-data.ts is built on): nothing below is
// authored. Every title, every subtitle and every relationship is read straight
// out of the dataset, and a family with no dataset behind it is declared in
// `gaps` rather than filled with plausible rows.

import { PM_DATA, PPPI_DATA } from "@/data/sapData";
import { moduleTables } from "@/lib/module-portal";
import { ZONES } from "@/lib/studio-graph";
import { LIBRARY } from "@/data/library";
import { DOMAINS } from "@/data/domains";
import { CONCEPTS } from "@/data/concepts";
import type { SAPModuleData } from "@/lib/types";
import type { CmdExtraRecord, CommandExtra } from "./types";

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

/* ------------------------------------------------------------- ownership */

/** Which table (and module) a function object is documented on, and which
 *  tables a transaction code appears on. Both are read from the very same
 *  `moduleTables()` rows the dictionary pages render, so a relationship shown
 *  in a search result is a relationship the reader can go and verify. */
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
        fn[nm] = [t.tableName, mod];
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
    tx[code] = [list.length > 3 ? `${head} +${list.length - 3}` : head, [...(txMods.get(code) || [])].join(" · ")];
  }
  return { fn, tx };
}

/* ------------------------------------------------ the three extra families */

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
    href: "/neo/domain-model/",
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

  cached = {
    recs: [...chapters(), ...flows(), ...guides()],
    fn,
    tx,
    zone,
    // The families the brief names that this project has no separate build-time
    // index for. Printed in the surface footer so an empty section is never
    // mistaken for an empty result.
    gaps: [
      {
        he: "אובייקט",
        why: "אין אינדקס נפרד — כל אובייקט מילון מופיע בקטגוריית «טבלה» עם מחלקת האובייקט שלו.",
      },
    ],
  };
  return cached;
}
