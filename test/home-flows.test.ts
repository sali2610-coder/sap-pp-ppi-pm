// The home's process map (components/neo-shell/home/home-data.ts, flows) may
// only draw what the PM and PP-PI dictionaries state (content gate 1, finding 1).
// Every expectation is read from the dictionary rows, never typed in.
import "./app-modules.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import { PM_DATA } from "../data/sapData.pm.ts";
import { PPPI_DATA } from "../data/sapData.pppi.ts";
import type { SAPModuleData } from "../lib/types.ts";

const { homeData } = await import("../components/neo-shell/home/home-data.ts");
const { TX_INTEL } = await import("../data/tx-intel.ts");

/** "parent" | "child" of `b` as seen from `a`, from every row of module `m`
 *  that states the pair, on either side; null when no row does. */
function roleOf(m: SAPModuleData, a: string, b: string): Set<"parent" | "child"> {
  const out = new Set<"parent" | "child">();
  for (const tp of m.topics) for (const t of tp.tables) for (const r of t.relations || []) {
    // stored on a: role says what a is, so b is the opposite
    if (t.tableName === a && r.table === b) out.add(r.role === "parent" ? "child" : "parent");
    // stored on b: role says what b is
    if (t.tableName === b && r.table === a) out.add(r.role);
  }
  return out;
}

const MOD: Record<string, SAPModuleData> = { PM: PM_DATA, "PP-PI": PPPI_DATA };

test("a direct link is a relation the dictionary states", () => {
  for (const c of homeData().flows) {
    c.steps.forEach((s, i) => {
      const n = c.steps[i + 1];
      if (!n || !s.link || s.link.via) return;
      assert.ok(roleOf(MOD[c.key], s.code, n.code).size > 0, `${c.key} ${s.code}→${n.code} is not in the dictionary`);
    });
  }
});

test("a link through one table is a chain: its parent on one side, its child on the other", () => {
  let chains = 0;
  for (const c of homeData().flows) {
    c.steps.forEach((s, i) => {
      const n = c.steps[i + 1];
      if (!n || !s.link?.via) return;
      const mid = s.link.via;
      const fromA = roleOf(MOD[c.key], s.code, mid), fromB = roleOf(MOD[c.key], n.code, mid);
      assert.equal(fromA.size, 1, `${s.code}–${mid}: one role`);
      assert.equal(fromB.size, 1, `${n.code}–${mid}: one role`);
      assert.notDeepEqual([...fromA], [...fromB], `${s.code}→${mid}→${n.code}: ${mid} is on the same side of both ends, which connects nothing`);
      assert.equal(s.link.card, "", `${s.code}→${n.code}: no cardinality for a path of two relations`);
      chains++;
    });
  }
  // the one the gate named stays: AUFK → AFKO → AFVC
  assert.ok(chains > 0);
});

test("JSTO, the status object each table owns, never joins two steps", () => {
  for (const c of homeData().flows) for (const s of c.steps) assert.notEqual(s.link?.via, "JSTO");
});

test("a direct link's cardinality reads along the flow (the dictionary states it child:parent)", () => {
  for (const c of homeData().flows) {
    c.steps.forEach((s, i) => {
      const n = c.steps[i + 1];
      if (!n || !s.link || s.link.via || !s.link.card) return;
      // shown only where the next step is the parent of this one
      assert.deepEqual([...roleOf(MOD[c.key], s.code, n.code)], ["parent"], `${s.code}→${n.code} card ${s.link.card}`);
    });
  }
});

test("every step is a table, not a transaction", () => {
  for (const c of homeData().flows) for (const s of c.steps) {
    assert.ok(!(s.code in TX_INTEL) || s.exists, `${c.key}: ${s.code} is a T-Code drawn as a table`);
  }
});
