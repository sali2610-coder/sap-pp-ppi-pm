// The five S/4HANA blockers of the content review
// (docs/redesign-2026-09/reviews/content-review-copy-sap.md, findings 1-5).
// Every expectation is read from the source data, never typed in: the
// blueprint column, the dataset the readiness page reads, the transaction
// records and the S/4 object catalogue.
import "./app-modules.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { PM_DATA } from "../data/sapData.pm.ts";
import { PPPI_DATA } from "../data/sapData.pppi.ts";
import { TX_INTEL } from "../data/tx-intel.ts";
import { S4_OBJECTS } from "../data/s4-objects.ts";
import { s4ClassOf, s4Split } from "../lib/s4-class.ts";
import { fromS4Object } from "../lib/evidence/s4-status.ts";
import { S4_STATUS_WORD } from "../lib/evidence/types.ts";
import type { SAPModuleData, SAPTable } from "../lib/types.ts";

const uniqueTables = (m: SAPModuleData): SAPTable[] => {
  const seen = new Set<string>();
  return m.topics.flatMap((t) => t.tables).filter((t) => !seen.has(t.tableName) && (seen.add(t.tableName), true));
};

/* ------------------------------------------------ 1 · the Studio verdict */

test("blocker 1: the Studio reads the blueprint's S/4HANA verdict, not the alternative-table column", async () => {
  const { buildHetero } = await import("../lib/studio-graph.ts");
  for (const m of [PM_DATA, PPPI_DATA] as SAPModuleData[]) {
    const tables = uniqueTables(m);
    const split = s4Split(tables);
    const expected: Record<string, number> = {
      unchanged: split.kept, changed: split.changed, replaced: split.replaced,
      not_available: split.removed, verification_required: split.undecided,
    };
    for (const k of Object.keys(expected)) if (!expected[k]) delete expected[k];

    const names = new Set(tables.map((t) => t.tableName));
    const got: Record<string, number> = {};
    for (const n of buildHetero(m.module as never).nodes.values()) {
      if (n.kind !== "table" || !names.has(n.id)) continue;
      got[String(n.s4)] = (got[String(n.s4)] || 0) + 1;
    }
    assert.deepEqual(got, expected, `${m.module}: Studio status counts differ from the blueprint column`);
  }
  // The review's examples: IFLOT is "ללא שינוי" in the PM blueprint, BUT000 "הוחלף" in PP-PI.
  assert.equal(buildHetero("PM").nodes.get("IFLOT")?.s4, "unchanged");
  assert.equal(buildHetero("PP-PI").nodes.get("BUT000")?.s4, "replaced");
});

/* ------------------------------------------- 2 · the tables "replaced" chip */

test("blocker 2: the tables chip keeps exactly the rows whose status is replaced", async () => {
  const { tablesData } = await import("../components/neo-shell/data/tables-data.ts");
  const { CAPS, capMatch } = await import("../components/neo-shell/data/table-caps.ts");
  const d = tablesData();
  const kept = d.rows.filter((r) => capMatch(r, "s4")).map((r) => r.name);
  const replaced = d.rows.filter((r) => r.status.key === "replaced").map((r) => r.name);
  assert.deepEqual(kept, replaced, "the chip must agree with the pill each row shows");
  const noChange = d.rows.filter((r) => capMatch(r, "s4") && s4ClassOf({ s4Note: r.s4 }) === 0).map((r) => r.name);
  assert.deepEqual(noChange, [], "the chip keeps tables the blueprint marks ללא שינוי");
  assert.equal(CAPS.find((c) => c.id === "s4")?.he, S4_STATUS_WORD.replaced);
  assert.equal(d.totals.s4, kept.length);
});

/* ------------------------------------------------ 3 · transaction successors */

// A record whose own S/4HANA note OPENS with an "out" verdict says the code
// itself is replaced, blocked, unsupported or unavailable in S/4HANA.
const SAYS_OUT = /^(?:מסומנ\S*\s+כ-)?(?:הוחלפ|מוחלפ|מוחלף|חסומ|אינה נתמכת|אינו נתמך|לא זמינ|אינה זמינה|אינו זמין|obsolete)/i;

test("blocker 3: a successor relation points in the direction its records state", async () => {
  const { txDetail, txDetailCodes } = await import("../components/neo-shell/data/tx-detail.ts");
  const d = (c: string) => txDetail(c)!;

  // The review's examples.
  assert.deepEqual(d("BP").s4.supersededBy, [], "VD01 and VD02 say they are replaced BY BP");
  assert.ok(!d("XD01").s4.supersededBy.includes("XK01"), "XK01 (vendor, blocked) is not what XD01 (customer) became");
  assert.deepEqual(d("MB01").s4.supersededBy, ["MIGO"], "MB1A/MB1B/MB1C/MB31 are themselves replaced by MIGO");
  assert.ok(!d("VF05N").s4.supersededBy.includes("VF05"), "VF05's own record recommends VF05N");
  // The same relation read from the other side.
  assert.ok(!d("VD01").s4.replaces.includes("BP"));
  assert.ok(!d("VD02").s4.replaces.includes("BP"));
  assert.ok(!d("XK01").s4.replaces.includes("XD01"));
  assert.ok(!d("MB1A").s4.replaces.includes("MB01"));
  assert.ok(!d("VF05").s4.replaces.includes("VF05N"));
  assert.ok(!d("XD01").s4.replaces.includes("XD01"), "a code never replaces itself");
  assert.ok(d("MIGO").s4.replaces.includes("MB01"), "MIGO's own record: available, replaces MB01");

  // Every code: each successor names this code in its own `obsolete` list, does
  // not say it is itself out, and the relation is not marked verified while the
  // field it is read from is known to be wrong in places.
  for (const code of txDetailCodes()) {
    const s4 = d(code).s4;
    for (const s of s4.supersededBy) {
      const rec = TX_INTEL[s];
      assert.ok(rec, `${code}: successor ${s} has no record`);
      assert.ok((rec.obsolete || []).map((x) => x.trim().toUpperCase()).includes(code), `${code}: ${s} does not list it`);
      assert.ok(!SAYS_OUT.test((rec.s4 || "").trim()), `${code}: successor ${s} says it is itself out: ${rec.s4}`);
    }
    for (const c of s4.replaces) assert.notEqual(c, code, `${code} lists itself as replaced`);
    if (s4.supersededBy.length) assert.notEqual(s4.trust, "verified", `${code}: reverse-read successor marked verified`);
  }

  // A successor is never shown as replaced because its note calls the OLD code
  // deprecated ("ME22 הישן deprecated" sits in ME22N's record).
  for (const c of ["ME22N", "ME23N", "ME31K", "ME52N", "ME53N"]) {
    assert.ok(/^(?:זמין|זמינה)/.test(TX_INTEL[c].s4.trim()), `${c}: premise, its record opens "available"`);
    assert.notEqual(d(c).evidence.status.key, "replaced", `${c} is shown as replaced`);
    assert.notEqual(d(c).s4.disposition, "superseded", `${c} is shown as superseded`);
  }
});

/* ------------------------------------------------ 4 · readiness without data */

test("blocker 4: a module with no table in the dataset has no readiness score", async () => {
  const { computeReadiness, unmeasuredModules, MOD_HE } = await import("../lib/s4-readiness.ts");
  const tables = (JSON.parse(readFileSync("public/sap-infrastructure/dataset.json", "utf8")) as {
    tables: { mod: string; name: string }[];
  }).tables;
  const count: Record<string, number> = {};
  for (const t of tables) count[t.mod] = (count[t.mod] || 0) + 1;

  const mods = computeReadiness(tables);
  for (const m of mods) assert.ok((count[m.mod] || 0) > 0, `${m.mod} shows a score of ${m.score} with no table behind it`);
  assert.equal(mods.find((m) => m.mod === "PIPO"), undefined);

  const expected = Object.keys(MOD_HE).filter((k) => !count[k]);
  assert.ok(expected.includes("PIPO"), "premise: PI/PO has no table in the dataset");
  assert.deepEqual(unmeasuredModules(tables).map((m) => m.mod), expected);

  // What remains is measured: each score is the documented weighting of the
  // module's own shares, with no floor added on top.
  for (const m of mods) {
    const w = Math.round(m.fioriPct * 0.3 + m.cdsPct * 0.3 + m.s4Pct * 0.25 + Math.max(0, 100 - m.deprecatedPct) * 0.15);
    assert.equal(m.score, Math.min(100, w), `${m.mod}: score ${m.score} is not the documented weighting (${w})`);
  }
});

/* ------------------------------------------------ 5 · new in S/4HANA */

test("blocker 5: an object whose own ECC line says it did not exist in ECC is new in S/4HANA", async () => {
  const notInEcc = S4_OBJECTS.filter((o) => /^לא קיים/.test(o.ecc.trim()));
  for (const n of ["MATDOC", "ACDOCA"]) assert.ok(notInEcc.some((o) => o.name === n), `premise: ${n}'s ECC line`);

  for (const o of S4_OBJECTS) {
    const k = fromS4Object(o.status, o.release, o.trust, o.ecc).status;
    if (notInEcc.includes(o)) assert.equal(k, "s4_native", `${o.name} (ECC: ${o.ecc}) is not shown as new`);
    else if (o.status === "stays") assert.equal(k, "unchanged", `${o.name}`);
  }

  const { s4Objects } = await import("../components/neo-shell/s4/s4-data.ts");
  const view = s4Objects();
  for (const o of notInEcc) assert.equal(view.find((v) => v.name === o.name)?.key, "s4_native", `${o.name} in the catalogue`);
  const kept = view.filter((v) => v.key === "unchanged").map((v) => v.name);
  const staysNotNew = S4_OBJECTS.filter((o) => o.status === "stays" && !notInEcc.includes(o)).map((o) => o.name);
  assert.deepEqual(kept, staysNotNew);
});
