// Project NEO · the Tables surface — BUILD-TIME data.
//
// Runs on the SERVER only. app/neo/tables/page.tsx calls this once and hands the
// result to the client surface as one plain serialisable object, the same way
// app/neo/layout.tsx hands over shellData().
//
// WHAT THIS REUSES, AND WHY IT IS NOT A SECOND DATASET
//   The live explorer at app/tables/page.tsx dedupes `ALL_TABLES` by name,
//   merges the module label for the ~20 tables documented in BOTH blueprints,
//   and decorates each row with `cdsForTable()`. That is the data layer, and it
//   is imported here verbatim — the same `ALL_TABLES`, the same `cdsForTable`,
//   the same merge rule. What this file adds is the rest of what the blueprint
//   already carries and the live table drops on the floor: field and key counts,
//   the real transaction list, the ER relations with their cardinality, the
//   BAPI/IDoc count, the Fiori app, the SUM note and the S/4 replacement
//   transaction. Nothing is computed that the dictionary does not state.
//
// HONESTY. A value the blueprint leaves blank arrives here as "" or as an empty
// list, and the surface says so on screen. No default, no placeholder, no
// "ללא שינוי מהותי" written over a silent cell.

import { ALL_TABLES } from "@/data/sapData";
import { cdsForTable } from "@/data/cds-map";
import { ZONES, zoneOf } from "@/lib/studio-graph";
import { objVarFor } from "../nav-data";
import type { NeoFacet, NeoRelRef, NeoTableRow, NeoTablesData } from "./types";

/** The transaction split rule the module portal uses. Restated because that one
 *  is a local closure; a code this rejects simply does not appear, which is the
 *  honest failure mode. */
const splitTcodes = (s: string): string[] =>
  (s || "")
    .split(/[,;\s/]+/)
    .map((x) => x.trim().toUpperCase())
    .filter((x) => /^[A-Z][A-Z0-9_]{1,}$/.test(x));

const uniq = (a: string[]) => [...new Set(a.filter(Boolean))];

const ZONE_HE: Record<string, string> = Object.fromEntries(ZONES.map((z) => [z.id, z.he]));

let cached: NeoTablesData | null = null;

export function tablesData(): NeoTablesData {
  if (cached) return cached;

  // Every documented table name — the far end of a relation is only linkable
  // when it is one of these, so the surface never offers a link to a table the
  // dictionary does not hold.
  const known = new Set(ALL_TABLES.map((t) => t.tableName));

  const byName = new Map<string, NeoTableRow>();
  // A shared table is documented in BOTH blueprints, and the two definitions do
  // not always list the same fields or the same relations. Counting the richer
  // of the two would silently drop the difference, so both are accumulated as a
  // union keyed by the thing that makes a row unique.
  const fieldSet = new Map<string, Set<string>>();
  const keySet = new Map<string, Set<string>>();
  const relSet = new Map<string, Set<string>>();

  for (const t of ALL_TABLES) {
    const prev = byName.get(t.tableName);
    const tcodes = splitTcodes(t.tcodes);
    const rels: NeoRelRef[] = (t.relations || []).map((r) => ({
      table: r.table,
      card: r.card || "",
      role: r.role,
      known: known.has(r.table),
    }));

    const fs = fieldSet.get(t.tableName) || new Set<string>();
    const ks = keySet.get(t.tableName) || new Set<string>();
    for (const f of t.fields) {
      const tech = (f.tech || "").trim();
      if (!tech) continue;
      fs.add(tech);
      if (f.key.includes("PK")) ks.add(tech);
    }
    fieldSet.set(t.tableName, fs);
    keySet.set(t.tableName, ks);

    const rs = relSet.get(t.tableName) || new Set<string>();
    for (const r of rels) rs.add(JSON.stringify([r.table, r.card, r.role, r.known]));
    relSet.set(t.tableName, rs);

    if (!prev) {
      byName.set(t.tableName, {
        name: t.tableName,
        he: t.descriptionHe || t.descriptionEn || "",
        mods: [t.module],
        topics: [t.topicTitle],
        obj: objVarFor(t.tableName),
        zone: zoneOf(t.tableName),
        zoneHe: ZONE_HE[zoneOf(t.tableName)] || "",
        fields: t.fields.length,
        keys: t.fields.filter((f) => f.key.includes("PK")).length,
        tcodes,
        rels,
        funcs: (t.funcs || []).length,
        cds: cdsForTable(t.tableName).map((v) => v.view),
        fiori: t.fioriApp || "",
        s4: t.s4Note || "",
        s4Alt: t.s4AltTable || "",
        s4Tcode: t.s4AltTcode || "",
        sum: t.sumNote || "",
        href: `/neo/object/${encodeURIComponent(t.tableName)}/`,
        hay: "",
      });
      continue;
    }

    // The SAME merge the live explorer performs — one row per table, the union
    // of its modules, and the richest of the two definitions kept.
    if (!prev.mods.includes(t.module)) prev.mods.push(t.module);
    if (!prev.topics.includes(t.topicTitle)) prev.topics.push(t.topicTitle);
    if (!prev.he) prev.he = t.descriptionHe || t.descriptionEn || "";
    prev.fields = Math.max(prev.fields, t.fields.length);
    prev.keys = Math.max(prev.keys, t.fields.filter((f) => f.key.includes("PK")).length);
    prev.funcs = Math.max(prev.funcs, (t.funcs || []).length);
    prev.tcodes = uniq([...prev.tcodes, ...tcodes]);
    if (rels.length > prev.rels.length) prev.rels = rels;
    if (!prev.fiori) prev.fiori = t.fioriApp || "";
    if (!prev.s4) prev.s4 = t.s4Note || "";
    if (!prev.s4Alt) prev.s4Alt = t.s4AltTable || "";
    if (!prev.s4Tcode) prev.s4Tcode = t.s4AltTcode || "";
    if (!prev.sum) prev.sum = t.sumNote || "";
  }

  const rows = [...byName.values()].sort((a, b) => a.name.localeCompare(b.name));

  // Built once, here, so a keystroke on the client is a substring test and never
  // a string build across 100+ rows.
  for (const r of rows) {
    r.hay = [r.name, r.he, r.mods.join(" "), r.zoneHe, r.topics.join(" "), r.tcodes.join(" "), r.cds.join(" "), r.s4, r.s4Alt]
      .join(" ")
      .toLowerCase();
  }

  const count = (pred: (r: NeoTableRow) => boolean) => rows.filter(pred).length;

  const mods: NeoFacet[] = [];
  for (const key of ["PM", "PP-PI"]) {
    const n = count((r) => r.mods.includes(key));
    if (n) mods.push({ id: key, he: key, n });
  }

  const zones: NeoFacet[] = ZONES
    .map((z) => ({ id: z.id, he: z.he, n: count((r) => r.zone === z.id) }))
    .filter((z) => z.n > 0);

  const topicOrder: string[] = [];
  for (const r of rows) for (const tp of r.topics) if (!topicOrder.includes(tp)) topicOrder.push(tp);
  const topics: NeoFacet[] = topicOrder
    .sort((a, b) => a.localeCompare(b, "he"))
    .map((tp) => ({ id: tp, he: tp, n: count((r) => r.topics.includes(tp)) }));

  cached = {
    rows,
    mods,
    zones,
    topics,
    totals: {
      tables: rows.length,
      fields: rows.reduce((a, r) => a + r.fields, 0),
      keys: rows.reduce((a, r) => a + r.keys, 0),
      rels: rows.reduce((a, r) => a + r.rels.length, 0),
      tcodes: uniq(rows.flatMap((r) => r.tcodes)).length,
      shared: count((r) => r.mods.length > 1),
      s4: count((r) => !!r.s4Alt),
      cds: count((r) => r.cds.length > 0),
      fiori: count((r) => !!r.fiori),
    },
  };
  return cached;
}
