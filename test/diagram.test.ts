/** Flowchart parsing. A diagram that fails to parse must degrade to source. */
import { test } from "node:test";
import assert from "node:assert/strict";
import { parseDiagram, isDiagramFence } from "../lib/ai/diagram.ts";

test("parses a classic flowchart with shapes and labelled edges", () => {
  const d = parseDiagram(`flowchart TD
    A([אירוע]) --> B[הודעה]
    B --> C{זמין?}
    C -->|כן| D[ביצוע]
    C -->|לא| B
    D --> E([סיום])`)!;
  assert.ok(d, "should parse");
  assert.equal(d.direction, "TB");
  assert.equal(d.nodes.length, 5);
  const shapes = d.nodes.reduce<Record<string, number>>((a, n) => ((a[n.shape] = (a[n.shape] ?? 0) + 1), a), {});
  assert.equal(shapes.decision, 1, "the {} node is a decision");
  assert.equal(shapes.terminal, 2, "start and end are terminals");
  assert.deepEqual(d.edges.filter((e) => e.label).map((e) => e.label), ["כן", "לא"]);
});

test("keeps back-edges — a lifecycle is not a lifecycle without them", () => {
  const d = parseDiagram("flowchart TD\nA-->B\nB-->C\nC-->A")!;
  assert.equal(d.edges.length, 3);
  assert.ok(d.edges.some((e) => e.from === "C" && e.to === "A"));
});

test("expands a chained edge instead of collapsing it", () => {
  // `A --> B --> C` split at the first arrow only would give 2 nodes.
  const d = parseDiagram("flowchart LR\nA-->B-->C-->D-->E")!;
  assert.equal(d.nodes.length, 5);
  assert.equal(d.edges.length, 4);
  assert.equal(d.direction, "LR");
});

test("returns null rather than throwing on input it cannot draw", () => {
  for (const src of ["", "const x = 1;", "just prose", "flowchart TD"]) {
    assert.doesNotThrow(() => parseDiagram(src));
    assert.equal(parseDiagram(src), null, `expected null for ${JSON.stringify(src)}`);
  }
});

test("every edge endpoint resolves to a real node", () => {
  const d = parseDiagram("flowchart TD\nA[x]-->B[y]\nB-->C{z}\nC-->A")!;
  const ids = new Set(d.nodes.map((n) => n.id));
  for (const e of d.edges) {
    assert.ok(ids.has(e.from), `dangling from: ${e.from}`);
    assert.ok(ids.has(e.to), `dangling to: ${e.to}`);
  }
});

test("recognises a diagram fence by language or by header", () => {
  assert.ok(isDiagramFence("flowchart TD\nA-->B", "flowchart"));
  assert.ok(isDiagramFence("flowchart TD\nA-->B"));
  assert.ok(!isDiagramFence("const x = 1", "ts"));
});

test("node labels are clean for every bracket style", () => {
  // Regression: the alternation tried `(` before `([`, so a stadium node
  // A([start]) captured "[start" — a stray bracket in every terminal label,
  // on screen and in exports. Shape assertions passed; nobody read the text.
  const d = parseDiagram(`flowchart TD
    A([התחלה]) --> B[שלב]
    B --> C{החלטה}
    C --> D[(מאגר)]
    D --> E((סיום))`)!;
  const label = (id: string) => d.nodes.find((n) => n.id === id)!.label;
  assert.equal(label("A"), "התחלה");
  assert.equal(label("B"), "שלב");
  assert.equal(label("C"), "החלטה");
  assert.equal(label("D"), "מאגר");
  assert.equal(label("E"), "סיום");
  for (const n of d.nodes) {
    assert.ok(!/[[\](){}]/.test(n.label), `${n.id} label carries a bracket: ${n.label}`);
  }
});

test("shapes still resolve after the opener fix", () => {
  const d = parseDiagram(`flowchart TD
    A([s]) --> B[p]
    B --> C{d}
    C --> D[(db)]`)!;
  const shape = (id: string) => d.nodes.find((n) => n.id === id)!.shape;
  assert.equal(shape("A"), "terminal");
  assert.equal(shape("C"), "decision");
  assert.equal(shape("D"), "data");
});

test("per-node provenance is parsed and never leaks into the label", () => {
  const d = parseDiagram(`flowchart TD
    A([אירוע]) --> B[יצירת הודעה] %% src=book1#3#3.2
    B --> C{זמין?} %% src=book1#3#3.5
    C -->|כן| D[ביצוע]`)!;
  const n = (id: string) => d.nodes.find((x) => x.id === id)!;
  assert.equal(n("B").src, "book1#3#3.2");
  assert.equal(n("C").src, "book1#3#3.5");
  assert.equal(n("A").src, undefined, "an untagged node must not borrow a source");
  assert.equal(n("D").src, undefined);
  for (const x of d.nodes) assert.ok(!x.label.includes("%%"), `marker leaked into ${x.id}`);
});

test("a source tag does not disturb edges or labels", () => {
  const d = parseDiagram(`flowchart TD
    A[a] --> B[b] %% src=book1#1#1.1
    B -->|כן| C[c]`)!;
  assert.equal(d.nodes.length, 3);
  assert.equal(d.edges.length, 2);
  assert.equal(d.edges.find((e) => e.from === "B")?.label, "כן");
});
