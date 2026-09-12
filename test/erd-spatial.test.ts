import test from "node:test";
import assert from "node:assert/strict";
import { spatialLayout, SPATIAL_COLORS } from "../components/neo-shell/erd/erd-spatial-model.ts";
import type { ErdCatalog, ModCode } from "../components/neo-shell/erd/erd-types.ts";

// Synthetic names deliberately avoid asserting any new SAP metadata.
const codes = Object.keys(SPATIAL_COLORS) as ModCode[];
const tables = codes.flatMap((m) => Array.from({ length: 18 }, (_, i) => ({ n: `${m}_TEST_${i}`, m, ms: [m] })));
const modules = codes.map((code) => ({ code, core: tables.filter((t) => t.m === code).map((t) => t.n) }));
modules[0].core.push(tables[18].n); // Shared table must follow curated membership.
const data = { tables, modules, edges: [
  { i: "test-1", p: tables[0].n, c: tables[18].n },
  { i: "test-2", p: tables[0].n, c: tables[20].n },
  { i: "test-3", p: tables[20].n, c: tables[21].n },
] } as unknown as ErdCatalog;

test("spatial overview places every canonical table once, with finite non-overlapping cards", () => {
  const before = JSON.stringify(data);
  const map = spatialLayout(data, { module: null, selected: null, focus: false });
  assert.equal(map.points.size, tables.length);
  assert.equal(map.plates.length, modules.length);
  assert.equal(new Set(map.plates.map((p) => SPATIAL_COLORS[p.code])).size, modules.length);
  const points = [...map.points.values()];
  for (let i = 0; i < points.length; i++) {
    assert.ok(points[i].every(Number.isFinite));
    for (let j = i + 1; j < points.length; j++) assert.ok(Math.abs(points[i][0] - points[j][0]) >= 5.6 || Math.abs(points[i][2] - points[j][2]) >= 3.5, `cards ${i} and ${j} overlap`);
  }
  assert.equal(JSON.stringify(data), before, "presentation must not mutate the source catalogue");
});

test("module view preserves shared table membership without reclassifying its owner", () => {
  const map = spatialLayout(data, { module: codes[0], selected: null, focus: false });
  assert.deepEqual([...map.points.keys()].sort(), [...modules[0].core].sort());
  assert.equal(tables[18].m, codes[1]);
});

test("focus includes only the selected table and recorded immediate neighbours", () => {
  const map = spatialLayout(data, { module: null, selected: tables[0].n, focus: true });
  assert.deepEqual([...map.points.keys()].sort(), [tables[0].n, tables[18].n, tables[20].n].sort());
  assert.ok(!map.points.has(tables[21].n), "a second-hop relationship must not become an immediate neighbour");
});
