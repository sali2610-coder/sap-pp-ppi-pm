import test from "node:test";
import assert from "node:assert/strict";
import { parseErd } from "../lib/ai/erd.ts";
import { LOOP_H, clip, entitySize, footGeometry, layoutErd } from "../lib/ai/erd-layout.ts";

const P = { x: 100, y: 50 };
/** Pointing away from the entity, along +x. */
const U = { ux: 1, uy: 0 };

test("each cardinality draws exactly the marks the notation prescribes", () => {
  // This is the test that matters. A fork where a bar belongs does not look
  // slightly off — it asserts a different data model.
  const g = (c: Parameters<typeof footGeometry>[0]) => footGeometry(c, P, U.ux, U.uy);

  const one = g("one");
  assert.equal(one.prongs.length, 0, "exactly-one must not have a fork");
  assert.ok(one.bar, "exactly-one must have a bar");
  assert.equal(one.circle, null, "exactly-one is not optional");

  const zeroOne = g("zero-or-one");
  assert.equal(zeroOne.prongs.length, 0);
  assert.ok(zeroOne.bar);
  assert.ok(zeroOne.circle, "zero-or-one must show optionality");

  const zeroMany = g("zero-or-many");
  assert.equal(zeroMany.prongs.length, 3, "many is a three-pronged fork");
  assert.equal(zeroMany.bar, null, "zero-or-many asserts no minimum");
  assert.ok(zeroMany.circle);

  const oneMany = g("one-or-many");
  assert.equal(oneMany.prongs.length, 3);
  assert.ok(oneMany.bar, "one-or-many asserts a minimum of one");
  assert.equal(oneMany.circle, null, "one-or-many is not optional");
});

test("the fork opens at the entity and converges away from it", () => {
  // Backwards prongs would read as the opposite relationship.
  const { prongs } = footGeometry("zero-or-many", P, 1, 0);
  // Wide end sits on the border point.
  const wide = prongs.map((l) => l.x2);
  assert.deepEqual(wide, [P.x, P.x, P.x]);
  // Apex is further along the outward vector, and shared by all three.
  const apex = prongs.map((l) => l.x1);
  assert.deepEqual(apex, [P.x + 13, P.x + 13, P.x + 13]);
  // The spread is perpendicular and symmetric.
  assert.deepEqual(prongs.map((l) => l.y2 - P.y), [-7, 0, 7]);
});

test("marks never overlap each other", () => {
  // Overlapping a bar onto a fork produces a mark that is neither.
  for (const c of ["zero-or-one", "zero-or-many", "one-or-many"] as const) {
    const { prongs, bar, circle } = footGeometry(c, P, 1, 0);
    const forkEnd = prongs.length ? P.x + 13 : P.x;
    if (bar) assert.ok(bar.x1 >= forkEnd, `${c}: bar sits inside the fork`);
    if (circle && bar) assert.ok(Math.abs(circle.cx - bar.x1) >= 6, `${c}: circle touches bar`);
  }
});

test("geometry rotates with the line instead of assuming horizontal", () => {
  // A diagram whose marks are only correct on horizontal edges is broken for
  // every other edge, which is most of them.
  const flat = footGeometry("one-or-many", P, 1, 0);
  const down = footGeometry("one-or-many", P, 0, 1);
  // Same shape...
  assert.equal(flat.prongs.length, down.prongs.length);
  // ...rotated: the horizontal fork spreads in y, the vertical one in x.
  assert.deepEqual(down.prongs.map((l) => Math.round(l.x2 - P.x)), [7, 0, -7]);
  assert.deepEqual(down.prongs.map((l) => Math.round(l.y2 - P.y)), [0, 0, 0]);
  // The apex follows the outward vector.
  assert.equal(Math.round(down.prongs[0].y1 - P.y), 13);
});

test("clip lands on the box border, not the centre", () => {
  // 100x50 box at the origin, target to the right.
  const p = clip(0, 0, 100, 50, 500, 0);
  assert.deepEqual(p, { x: 50, y: 0 });
  // Diagonal target exits through the side that is actually reached first.
  const d = clip(0, 0, 100, 50, 100, 100);
  assert.equal(d.y, 25);
  assert.ok(d.x <= 50);
  // Degenerate: coincident centres must not produce NaN.
  const same = clip(10, 10, 100, 50, 10, 10);
  assert.deepEqual(same, { x: 10, y: 10 });
});

test("a box is sized to hold its widest attribute row", () => {
  const narrow = entitySize({ name: "A", attributes: [] });
  const wide = entitySize({
    name: "A",
    attributes: [{ name: "VERY_LONG_FIELD_NAME_HERE", type: "CHAR128", pk: true, fk: true }],
  });
  assert.ok(wide.width > narrow.width, "long row did not widen the box");
  assert.ok(wide.height > narrow.height, "attribute row added no height");
});

test("layout places every entity and reports a canvas that contains them", () => {
  const d = parseErd(`erDiagram
    MARA ||--o{ MARC : has
    MARC }o--|| T001W : at
    MARA ||--o{ MAKT : text`)!;
  const { placed, width, height } = layoutErd(d);

  assert.equal(placed.size, 4);
  for (const [name, p] of placed) {
    assert.ok(Number.isFinite(p.x) && Number.isFinite(p.y), `${name} has no position`);
    assert.ok(p.w > 0 && p.h > 0, `${name} has no size`);
    // Inside the reported canvas — otherwise the export is clipped.
    assert.ok(p.x - p.w / 2 >= -1 && p.x + p.w / 2 <= width + 1, `${name} overflows width`);
    assert.ok(p.y - p.h / 2 >= -1 && p.y + p.h / 2 <= height + 1, `${name} overflows height`);
  }
});

test("entities never overlap each other", () => {
  const d = parseErd(`erDiagram
    A ||--o{ B : x
    A ||--o{ C : y
    A ||--o{ D : z
    B ||--o{ E : w`)!;
  const boxes = [...layoutErd(d).placed.values()];
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i], b = boxes[j];
      const overlap =
        Math.abs(a.x - b.x) * 2 < a.w + b.w &&
        Math.abs(a.y - b.y) * 2 < a.h + b.h;
      assert.equal(overlap, false, `${a.e.name} overlaps ${b.e.name}`);
    }
  }
});

test("a self-relationship does not break layout", () => {
  // dagre cannot rank a self-edge; it must be excluded from the graph and drawn
  // as a loop, or layout returns NaN positions.
  const d = parseErd(`erDiagram
    EQUI ||--o{ EQUI : "ציוד אב"
    EQUI ||--o{ EQKT : text`)!;
  const { placed } = layoutErd(d);
  for (const [name, p] of placed) {
    assert.ok(Number.isFinite(p.x) && Number.isFinite(p.y), `${name} position is NaN`);
  }
});

test("a self-relationship gets drawing room above its entity", () => {
  // The loop is drawn above the box. dagre does not know it exists, so without
  // reserved space the entity sits on the top margin and the whole loop lands at
  // a negative y — clipped away, leaving two feet floating over nothing.
  const d = parseErd(`erDiagram
    EQUI ||--o{ EQUI : "ציוד אב"
    EQUI ||--o{ EQKT : text`)!;
  const { placed, height } = layoutErd(d);
  const equi = placed.get("EQUI")!;
  assert.ok(equi.y - equi.h / 2 >= LOOP_H,
    `loop would be clipped: top edge at ${equi.y - equi.h / 2}, needs >= ${LOOP_H}`);
  // And the canvas grew to match, or the reservation just pushes the bottom out.
  for (const [name, p] of placed) {
    assert.ok(p.y + p.h / 2 <= height + 1, `${name} overflows height`);
  }
});

test("layout reserves loop room only when a loop exists", () => {
  const plain = parseErd(`erDiagram\n  A ||--o{ B : x`)!;
  const looped = parseErd(`erDiagram\n  A ||--o{ B : x\n  A ||--o{ A : self`)!;
  assert.equal(layoutErd(looped).height - layoutErd(plain).height, LOOP_H);
});
