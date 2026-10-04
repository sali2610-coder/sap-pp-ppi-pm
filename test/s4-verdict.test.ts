// One S/4HANA verdict per table on every surface (spec P1 §10;
// docs/rollout-2026-10/S4-VERDICT.md). A review on 2026-10-03 found three
// places still reading the blueprint's column or the risk resolver after the
// module page had moved to the verdict: the module's section pages, the S/4
// chapter's list, and the object profile's summary. These checks hold every
// one of them to components/neo-shell/data/s4-verdict.ts.
import "./app-modules.mjs";
import test from "node:test";
import assert from "node:assert/strict";

const { PM_DATA, PPPI_DATA } = await import("../data/sapData.ts");
const { moduleTables } = await import("../lib/module-portal.ts");
const { s4Of, s4WordOf, verdictOf } = await import("../components/neo-shell/data/s4-verdict.ts");
const { workspaceData } = await import("../components/neo-shell/workspace/workspace-data.ts");
const { tableGroups, s4BucketsOf } = await import("../components/neo-shell/module-sections/section-data.ts");
const { objectProfile } = await import("../components/neo-shell/object/object-profile.ts");
const { oicRecord, oicParams } = await import("../components/neo-shell/records/oic.ts");
const { OIC_OBJECTS } = await import("../lib/cross-links.ts");

const MODULES = [["PM", PM_DATA], ["PP-PI", PPPI_DATA]] as const;

test("the module page and its section pages give every table the same verdict and word", () => {
  for (const [key, m] of MODULES) {
    const ws = new Map(workspaceData(key).rows.map((r) => [r.n, r]));
    for (const g of tableGroups(m)) for (const r of g.rows) {
      const w = ws.get(r.code);
      assert.ok(w, `${key} ${r.code}: no module-page row`);
      assert.equal(r.s4, w.s4, `${key} ${r.code}: section ${r.s4} vs module page ${w.s4}`);
      assert.equal(r.word, w.s4Word, `${key} ${r.code}: section "${r.word}" vs module page "${w.s4Word}"`);
    }
  }
});

test("the S/4 chapter lists exactly the tables the verdict moves, and its count is the filters' count", () => {
  for (const [key, m] of MODULES) {
    const d = workspaceData(key);
    const moving = new Set(moduleTables(m).filter((t) => { const k = s4Of(t); return k !== null && k !== 0; }).map((t) => t.tableName));
    const listed = new Set(d.s4x.changed.map((r) => r.n));
    assert.deepEqual([...listed].sort(), [...moving].sort(), `${key}: chapter list vs verdict`);
    assert.equal(d.s4x.changed.length, d.s4.changed + d.s4.replaced + d.s4.removed, `${key}: chapter count vs filter counts`);
    for (const r of d.s4x.changed) assert.ok(r.s4 === 1 || r.s4 === 2 || r.s4 === 3, `${key} ${r.n}: listed with class ${r.s4}`);
  }
});

test("the section pages bucket the module's tables by the verdict", () => {
  for (const [key, m] of MODULES) {
    const b = s4BucketsOf(m);
    const of = (k: number | null) => (k === null ? b.undecided : [b.kept, b.changed, b.replaced, b.removed][k]);
    for (const t of moduleTables(m)) assert.ok(of(s4Of(t)).some((r) => r.code === t.tableName), `${key} ${t.tableName}: not in its verdict's bucket`);
  }
});

test("an open verdict reads as the evidence layer's word, never as the blueprint's silence", () => {
  for (const [, m] of MODULES) for (const t of moduleTables(m)) {
    const v = verdictOf(t.tableName);
    if (v && v.cls === null) assert.equal(s4WordOf(t), v.word, `${t.tableName}: "${s4WordOf(t)}"`);
  }
});

test("the object profile's summary states the verdict its header states", () => {
  for (const [, m] of MODULES) for (const t of moduleTables(m)) {
    const v = verdictOf(t.tableName);
    const p = objectProfile(t.tableName);
    if (!v || !p) continue;
    assert.ok(p.summary.includes(`S/4HANA: ${v.label}`), `${t.tableName}: summary lacks "S/4HANA: ${v.label}"`);
  }
});

test("an OIC record says a table is kept only where the verdict keeps it", () => {
  for (const slug of oicParams()) {
    const r = oicRecord(slug);
    assert.ok(r, slug);
    const kv = r.blocks.find((b) => b.t === "kv" && "rows" in b && b.rows.some((x) => x.k === "הכרעת S/4HANA"));
    assert.ok(kv && "rows" in kv, `${slug}: no verdict row`);
    const table = OIC_OBJECTS.find((o) => o.slug === slug)?.table;
    const v = table ? verdictOf(table) : undefined;
    const kept = kv.rows.some((x) => x.k === "ללא שינוי (נשאר זהה)");
    assert.equal(kept, !!(v && v.exact && v.cls === 0), `${slug} (${table}): "kept" row ${kept} vs verdict ${v?.key}`);
  }
});
