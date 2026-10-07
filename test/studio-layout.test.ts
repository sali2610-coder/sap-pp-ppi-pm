import test from "node:test";
import assert from "node:assert/strict";
import {
  clustersOf, layoutBoard, layoutGroups, layoutProcess, masonryPack, shelfPack, type PNode, type StudioLayout,
} from "../lib/studio-layout.ts";

/* A small graph with the shapes the studio meets: a hub with six spokes that
   link to nothing else (a block), a chain, a pair, a relation across groups,
   and objects with no relation at all. */
const adj = new Map<string, Set<string>>();
const link = (a: string, b: string) => {
  (adj.get(a) ?? adj.set(a, new Set()).get(a)!).add(b);
  (adj.get(b) ?? adj.set(b, new Set()).get(b)!).add(a);
};
for (const s of ["S1", "S2", "S3", "S4", "S5", "S6", "S7"]) link("HUB", s);
link("HUB", "A"); link("A", "B"); link("B", "C");
link("P", "Q");
link("C", "P"); // across the two groups below
const size = (id: string) => (id === "HUB" ? { w: 184, h: 56 } : { w: 144, h: 44 });
const overlaps = (a: PNode, b: PNode) =>
  Math.abs(a.x - b.x) * 2 < a.w + b.w && Math.abs(a.y - b.y) * 2 < a.h + b.h;
const noOverlap = (l: StudioLayout) => {
  for (let i = 0; i < l.nodes.length; i++) for (let j = i + 1; j < l.nodes.length; j++) {
    assert.ok(!overlaps(l.nodes[i], l.nodes[j]), `${l.nodes[i].id} overlaps ${l.nodes[j].id}`);
  }
};
const inFrames = (l: StudioLayout) => {
  for (const n of l.nodes) {
    const g = l.groups.find((x) => x.id === n.group);
    if (!g) continue;
    assert.ok(n.x - n.w / 2 >= g.x - 0.5 && n.x + n.w / 2 <= g.x + g.w + 0.5, `${n.id} outside its frame (x)`);
    assert.ok(n.y - n.h / 2 >= g.y - 0.5 && n.y + n.h / 2 <= g.y + g.h + 0.5, `${n.id} outside its frame (y)`);
  }
  for (const n of l.nodes) assert.ok(n.x - n.w / 2 >= -0.5 && n.x + n.w / 2 <= l.w + 0.5, `${n.id} outside the canvas`);
};

test("shelf packing keeps the order and never overlaps", () => {
  const boxes = [{ id: "a", w: 300, h: 100 }, { id: "b", w: 200, h: 80 }, { id: "c", w: 260, h: 120 }, { id: "d", w: 120, h: 60 }];
  const { pos, w } = shelfPack(boxes, 520, 10);
  assert.deepEqual(pos.get("a"), { x: 0, y: 0 });
  assert.equal(pos.get("b")!.y, 0, "b fits beside a");
  assert.equal(pos.get("c")!.x, 0, "c starts a new shelf");
  assert.ok(w <= 520);
});

test("masonry chooses the column count that fits the canvas largest, without overlaps", () => {
  const boxes = Array.from({ length: 8 }, (_, i) => ({ id: `b${i}`, w: 200, h: 120 + (i % 3) * 40 }));
  const wide = masonryPack(boxes, 2, 20), tall = masonryPack(boxes, 0.5, 20);
  assert.ok(wide.w > tall.w, "a wide canvas gets more columns");
  for (const { pos } of [wide, tall]) for (const x of boxes) for (const y of boxes) {
    if (x === y) continue;
    const p = pos.get(x.id)!, q = pos.get(y.id)!;
    const apart = p.x + x.w <= q.x || q.x + y.w <= p.x || p.y + x.h <= q.y || q.y + y.h <= p.y;
    assert.ok(apart, `${x.id} and ${y.id} overlap`);
  }
});

test("clusters are the connected parts, biggest first", () => {
  const c = clustersOf(["HUB", "S1", "S2", "S3", "S4", "S5", "S6", "S7", "A", "B", "C", "X"], adj);
  assert.deepEqual(c.map((x) => x.length), [11, 1]);
  assert.equal(c[0][0], "A");
});

test("groups: placed once, no overlap, frames hold their members, the block stands together", () => {
  const groups = [
    { id: "g1", title: "ראשונה", members: ["HUB", "S1", "S2", "S3", "S4", "S5", "S6", "S7", "A", "B", "C", "X"] },
    { id: "g2", title: "שנייה", members: ["P", "Q", "Y", "Z"] },
  ];
  const l = layoutGroups(groups, adj, size, { aspect: 1.6, mirror: true });
  const ids = l.nodes.map((n) => n.id);
  assert.equal(ids.length, 16);
  assert.equal(new Set(ids).size, 16, "no member placed twice");
  noOverlap(l);
  inFrames(l);
  // the hub's seven single-link tables are one block, and its lines are "leaf"
  assert.equal(l.blocks.length, 1);
  assert.deepEqual(l.blocks[0].members, ["S1", "S2", "S3", "S4", "S5", "S6", "S7"]);
  for (const m of l.blocks[0].members) {
    const n = l.nodes.find((x) => x.id === m)!, b = l.blocks[0];
    assert.ok(n.x - n.w / 2 >= b.x && n.x + n.w / 2 <= b.x + b.w && n.y - n.h / 2 >= b.y && n.y + n.h / 2 <= b.y + b.h, `${m} outside its block`);
  }
  assert.equal(l.edges.find((e) => e.id === "HUB|S1")?.kind, "leaf");
  // the unrelated objects of each group stand in one captioned block
  assert.deepEqual(l.loose.map((x) => [x.group, x.count]).sort(), [["g1", 1], ["g2", 2]]);
  for (const lb of l.loose) for (const n of l.nodes.filter((x) => x.group === lb.group && ["X", "Y", "Z"].includes(x.id))) {
    assert.ok(n.x - n.w / 2 >= lb.x && n.x + n.w / 2 <= lb.x + lb.w && n.y - n.h / 2 >= lb.y && n.y + n.h / 2 <= lb.y + lb.h, `${n.id} outside its caption block`);
  }
  assert.equal(l.edges.find((e) => e.id === "A|HUB")?.kind, "in");
  assert.equal(l.edges.find((e) => e.id === "C|P")?.kind, "cross", "a relation across groups is a cross edge");
  // right to left: the hub heads its cluster, to the right of A
  const hub = l.nodes.find((n) => n.id === "HUB")!, a = l.nodes.find((n) => n.id === "A")!;
  assert.ok(hub.x > a.x);
});

test("a layout relation set clusters each table with its own objects only", () => {
  // T1 and T2 are related tables; each has its own objects
  const g = new Map<string, Set<string>>();
  const l2 = (a: string, b: string) => { (g.get(a) ?? g.set(a, new Set()).get(a)!).add(b); (g.get(b) ?? g.set(b, new Set()).get(b)!).add(a); };
  l2("T1", "T2"); l2("T1", "o1"); l2("T1", "o2"); l2("T2", "o3");
  const shape = new Map<string, Set<string>>();
  for (const [a, set] of g) for (const b of set) if (a.startsWith("T") !== b.startsWith("T")) (shape.get(a) ?? shape.set(a, new Set()).get(a)!).add(b);
  const l = layoutGroups([{ id: "all", title: "", members: ["T1", "T2", "o1", "o2", "o3"] }], g, size, { aspect: 1.6, mirror: true, layoutAdj: shape });
  assert.equal(l.edges.find((e) => e.id === "T1|T2")?.kind, "cross", "table to table is drawn only when lit");
  assert.equal(l.edges.find((e) => e.id === "T1|o1")?.kind, "in");
  noOverlap(l);
});

test("the same input gives the same picture", () => {
  const groups = [{ id: "g", title: "", members: ["HUB", "S1", "S2", "S3", "A", "B", "C", "P", "Q"] }];
  const a = layoutGroups(groups, adj, size, { aspect: 1.6, mirror: true });
  const b = layoutGroups(groups, adj, size, { aspect: 1.6, mirror: true });
  assert.deepEqual(a, b);
  assert.equal(a.groups.length, 0, "one untitled group draws no frame");
});

test("the board: one column per group, the first on the right, cards inside, relations lit only", () => {
  const cols = [
    { id: "k0", title: "ללא שינוי", members: ["A", "B", "C", "S1", "S2", "S3", "S4", "S5"] },
    { id: "k2", title: "הוחלף", members: ["P"] },
    { id: "kx", title: "ריקה", members: [] },
  ];
  const l = layoutBoard(cols, adj, size, { aspect: 1.6, mirror: true });
  assert.equal(l.groups.length, 2, "an empty column is not drawn");
  const k0 = l.groups.find((g) => g.id === "k0")!, k2 = l.groups.find((g) => g.id === "k2")!;
  assert.ok(k0.x > k2.x, "the first column stands on the right");
  assert.equal(k0.h, k2.h, "columns share one height");
  noOverlap(l);
  inFrames(l);
  assert.ok(l.edges.every((e) => e.kind === "cross"));
});

test("the process: steps right to left, a missing step keeps its place, no edge between steps", () => {
  const steps = [{ label: "ראשון", code: "HUB" }, { label: "שני", code: "MISSING" }, { label: "שלישי", code: "A" }];
  const isTable = (id: string) => adj.has(id);
  const { layout, columns } = layoutProcess(steps, isTable, adj, size);
  assert.equal(columns.length, 3);
  assert.equal(columns[1].inGraph, false);
  assert.deepEqual(columns[1].tables, []);
  const hub = layout.nodes.find((n) => n.id === "HUB")!, a = layout.nodes.find((n) => n.id === "A")!;
  assert.ok(hub.x > a.x, "step 1 stands to the right of step 3");
  const ids = layout.nodes.map((n) => n.id);
  assert.equal(new Set(ids).size, ids.length, "no table twice");
  assert.ok(!layout.edges.some((e) => (e.a === "A" && e.b === "HUB") && e.kind === "in"), "the order is not drawn as a relation");
  noOverlap(layout);
  inFrames(layout);
});

test("the process: a long list stands in sub-columns, and each frame is as tall as its own list", () => {
  const steps = [{ label: "ראשון", code: "HUB" }, { label: "שני", code: "C" }];
  const isTable = (id: string) => adj.has(id);
  const { layout, columns } = layoutProcess(steps, isTable, adj, size, 2.4);
  assert.equal(columns[0].tables.length, 8, "the hub's seven spokes and A");
  const first = layout.groups.find((g) => g.id === "step1")!, second = layout.groups.find((g) => g.id === "step2")!;
  assert.ok(first.h !== second.h, "frames are not stretched to one height");
  const xs = new Set(layout.nodes.filter((n) => n.group === "step1").map((n) => Math.round(n.x)));
  assert.ok(xs.size > 1, "a wide canvas folds the long list into sub-columns");
  noOverlap(layout);
  inFrames(layout);
});
