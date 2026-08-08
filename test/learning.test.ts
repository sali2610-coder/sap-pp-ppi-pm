/**
 * Learning Mode. The load-bearing property: every quiz answer must be
 * verifiable against the diagram. A lesson that grades a learner wrongly is
 * worse than no lesson, and an explanation that asserts an SAP fact we do not
 * have is worse still.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { parseDiagram } from "../lib/ai/diagram.ts";
import { presentationOrder } from "../lib/ai/present-order.ts";
import { buildLesson, lessonId } from "../lib/ai/learning.ts";

const D = parseDiagram(`flowchart TD
  A([אירוע תחזוקה]) --> B[יצירת הודעה IW21]
  B --> C{זמינות חומר?}
  C -->|כן| D[ביצוע העבודה]
  C -->|לא| B
  D --> E([סיום])`)!;

const lesson = () => buildLesson(D, presentationOrder(D).map((s) => s.node));

test("every node becomes a step, in process order", () => {
  const l = lesson();
  assert.equal(l.steps.length, D.nodes.length);
  assert.equal(l.steps[0].node.id, "A", "starts where the process starts");
});

test("step kinds come from the diagram, not from guesses", () => {
  const l = lesson();
  const by = (id: string) => l.steps.find((s) => s.node.id === id)!;
  assert.equal(by("A").kind, "start");
  assert.equal(by("C").kind, "decision");
  assert.equal(by("E").kind, "end");
  assert.equal(by("D").kind, "step");
});

test("explanations restate structure and assert nothing about SAP semantics", () => {
  const l = lesson();
  for (const s of l.steps) {
    assert.ok(s.explain.length > 0, `${s.node.id} has no explanation`);
    // Words that would signal an invented claim about what a step means.
    for (const banned of ["משמעות", "נועד כדי", "האחראי על", "בפועל מבצע"]) {
      assert.ok(!s.explain.includes(banned), `${s.node.id} asserts semantics: ${s.explain}`);
    }
  }
});

test("a labelled branch is described with its own labels", () => {
  const c = lesson().steps.find((s) => s.node.id === "C")!;
  assert.ok(c.explain.includes("כן") && c.explain.includes("לא"), c.explain);
});

test("concepts pick up SAP identifiers and skip ordinary words", () => {
  const b = lesson().steps.find((s) => s.node.id === "B")!;
  assert.ok(b.concepts.includes("IW21"), JSON.stringify(b.concepts));
  const a = lesson().steps.find((s) => s.node.id === "A")!;
  assert.equal(a.concepts.length, 0, "Hebrew prose is not a concept");
});

test("EVERY quiz answer is correct against the diagram", () => {
  const l = lesson();
  assert.ok(l.quiz.length >= 3, `only ${l.quiz.length} questions`);
  const nameOf = (id: string) => D.nodes.find((n) => n.id === id)!.label;

  for (const q of l.quiz) {
    assert.ok(q.answer >= 0 && q.answer < q.choices.length, `${q.id}: answer out of range`);
    const chosen = q.choices[q.answer];

    if (q.id === "start") {
      const starts = D.nodes.filter((n) => !D.edges.some((e) => e.to === n.id));
      assert.deepEqual([chosen], starts.map((n) => n.label));
    }
    if (q.id === "next") {
      const from = D.nodes.find((n) => q.prompt.includes(n.label))!;
      const outs = D.edges.filter((e) => e.from === from.id).map((e) => nameOf(e.to));
      assert.ok(outs.includes(chosen), `${chosen} does not follow ${from.label}`);
    }
    if (q.id === "decision") {
      const dec = D.nodes.find((n) => n.shape === "decision")!;
      assert.equal(chosen, dec.label);
    }
    if (q.id === "branch") {
      const m = /התשובה היא "([^"]+)"/.exec(q.prompt)!;
      const edge = D.edges.find((e) => e.label === m[1])!;
      assert.equal(chosen, nameOf(edge.to));
    }
  }
});

test("choices are unique and the answer is not always first", () => {
  const l = lesson();
  for (const q of l.quiz) {
    assert.equal(new Set(q.choices).size, q.choices.length, `${q.id} has duplicate choices`);
  }
  assert.ok(l.quiz.some((q) => q.answer !== 0), "correct answer must move around");
});

test("distractors are real steps, never invented text", () => {
  const labels = new Set(D.nodes.map((n) => n.label));
  for (const q of lesson().quiz) {
    for (const c of q.choices) assert.ok(labels.has(c), `invented choice: ${c}`);
  }
});

test("the lesson is deterministic — same diagram, same quiz", () => {
  assert.deepEqual(lesson().quiz, lesson().quiz);
});

test("summary counts match the diagram", () => {
  const l = lesson();
  assert.ok(l.summary.includes(String(D.nodes.length)), l.summary);
  assert.ok(l.summary.includes("IW21"), l.summary);
});

test("lessonId is stable for the same diagram and differs for another", () => {
  const other = parseDiagram("flowchart TD\nX-->Y\nY-->Z")!;
  assert.equal(lessonId(D), lessonId(D));
  assert.notEqual(lessonId(D), lessonId(other));
});

test("a two-node diagram degrades without throwing", () => {
  const tiny = parseDiagram("flowchart TD\nA-->B")!;
  assert.doesNotThrow(() => buildLesson(tiny, presentationOrder(tiny).map((s) => s.node)));
});
