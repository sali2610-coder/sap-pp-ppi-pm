/**
 * Presentation ordering. Layout order is not reading order — dagre may place a
 * late branch high on the canvas — so presenting in layout order tells the
 * story out of sequence.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { parseDiagram } from "../lib/ai/diagram.ts";
import { presentationOrder } from "../lib/ai/present-order.ts";

const D = parseDiagram(`flowchart TD
  A([אירוע]) --> B[הודעה]
  B --> C{זמין?}
  C -->|כן| D[ביצוע]
  C -->|לא| B
  D --> E([סיום])
  Z[מבודד]`)!;

test("starts at a node with no incoming edge", () => {
  const s = presentationOrder(D);
  assert.equal(s[0].node.id, "A");
});

test("follows the process, not the node declaration order", () => {
  const ids = presentationOrder(D).map((s) => s.node.id);
  assert.ok(ids.indexOf("B") < ids.indexOf("C"), ids.join(","));
  assert.ok(ids.indexOf("C") < ids.indexOf("D"), ids.join(","));
  assert.ok(ids.indexOf("D") < ids.indexOf("E"), ids.join(","));
});

test("every node appears exactly once, including unreachable ones", () => {
  const ids = presentationOrder(D).map((s) => s.node.id);
  assert.equal(ids.length, D.nodes.length);
  assert.equal(new Set(ids).size, ids.length, "no duplicates");
  assert.ok(ids.includes("Z"), "an isolated node still belongs in the deck");
});

test("a cycle does not hang or repeat a step", () => {
  // C -> B is a back-edge; a naive walk would loop forever.
  const cyc = parseDiagram("flowchart TD\nA-->B\nB-->C\nC-->A")!;
  const t0 = Date.now();
  const s = presentationOrder(cyc);
  assert.ok(Date.now() - t0 < 300, "should not spin");
  assert.equal(s.length, 3);
});

test("each step carries its own incoming and outgoing ids", () => {
  const s = presentationOrder(D);
  const c = s.find((x) => x.node.id === "C")!;
  assert.deepEqual(c.next.sort(), ["D", "B"].sort());
  assert.deepEqual(c.prev, ["B"]);
  const a = s.find((x) => x.node.id === "A")!;
  assert.equal(a.prev.length, 0);
});

test("a single-node diagram degrades rather than throwing", () => {
  const one = parseDiagram("flowchart TD\nA-->B")!;
  assert.doesNotThrow(() => presentationOrder(one));
  assert.equal(presentationOrder(one).length, 2);
});
