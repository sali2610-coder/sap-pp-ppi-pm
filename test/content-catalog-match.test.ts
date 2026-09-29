// The catalogue search (components/neo-shell/data/catalog-match.ts) on the
// real registry and directories: the Hebrew terms SAP writes two ways and
// their inflections find the record (gate 6, major 10), the in-order
// subsequence stays in the technical name (gate 6, minor 22), and a one-letter
// typo of a code still finds it. Every expectation names a record the data holds.
import "./app-modules.mjs";
import test from "node:test";
import assert from "node:assert/strict";

const { catalogScore, hebrewForms, txHay } = await import("../components/neo-shell/data/catalog-match.ts");
const { txRegistry } = await import("../lib/tx-registry.ts");
const { tablesData } = await import("../components/neo-shell/data/tables-data.ts");
const { bapiDir } = await import("../components/neo-shell/reference/bapi-data.ts");

const txs = [...txRegistry().values()];
const rankTx = (q: string) => txs
  .map((t) => ({ code: t.code, sc: catalogScore(txHay(t), t.code.toLowerCase(), q) }))
  .filter((x) => x.sc > 0)
  .sort((a, b) => b.sc - a.sc);

test("the Hebrew forms of a word", () => {
  assert.ok(hebrewForms("הזמנת").includes("הזמנ"));
  assert.ok(hebrewForms("פקודות").includes("הזמנ"));
  assert.ok(hebrewForms("אחזקה").includes("תחזוק"));
  assert.ok(hebrewForms("לפקודה").includes("פקוד"));
  assert.deepEqual(hebrewForms("IW31"), []);
});

test("an order in either Hebrew word, in any form, reaches the maintenance orders", () => {
  // The registry's own Hebrew for IW31: "הזמנות תחזוקה (Maintenance Orders)".
  assert.match(txRegistry().get("IW31")!.he, /הזמנות תחזוקה/);
  for (const q of ["הזמנת תחזוקה", "פקודת תחזוקה", "פקודת אחזקה", "IW31 הזמנה", "הזמנות תחזוקה"]) {
    const r = rankTx(q);
    const at = r.findIndex((x) => x.code === "IW31");
    assert.ok(at >= 0, `${q}: IW31 not found`);
    // Only rows whose text also says "הזמנות תחזוקה" may stand before it.
    for (const x of r.slice(0, at)) assert.match(txRegistry().get(x.code)!.he, /הזמנות תחזוקה/, `${q}: ${x.code} before IW31`);
  }
  // A letter-by-letter match across unrelated words no longer brings these in.
  const pk = rankTx("פקודת תחזוקה").map((x) => x.code);
  for (const c of ["SE92", "CJ20", "SE20", "IP10"]) assert.ok(!pk.includes(c), `${c} matched "פקודת תחזוקה"`);
});

test("a table's header is found by the words a consultant types", () => {
  const rows = tablesData().rows;
  const afko = rows.find((r) => r.name === "AFKO")!;
  assert.match(afko.hay, /כותרת פקודת/);
  const hits = rows.filter((r) => catalogScore(r.hay, r.name.toLowerCase(), "כותרת פקודה") > 0).map((r) => r.name);
  assert.ok(hits.includes("AFKO"), hits.join(","));
});

test("a one-letter typo of a code still finds it", () => {
  assert.equal(rankTx("IW3I")[0]?.code, "IW31");
  const rows = tablesData().rows;
  assert.ok(rows.some((r) => r.name === "AFKO" && catalogScore(r.hay, "afko", "afk0") > 0));
});

test("the subsequence stays in the technical name", () => {
  const rows = bapiDir().rows;
  const hits = rows.filter((r) => catalogScore(r.hay, r.name.toLowerCase(), "matmas") > 0);
  // Only a record whose own text names MATMAS may match; the letters of MATMAS
  // scattered through a long Hebrew description no longer do.
  for (const r of hits) assert.ok(r.hay.includes("matmas"), `${r.name} matched MATMAS by scattered letters`);
  assert.ok(hits.length < 10, `${hits.length} BAPIs match MATMAS`);
});
