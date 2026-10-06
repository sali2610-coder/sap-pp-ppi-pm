// The academy journey (components/neo-shell/learn/journey-state.ts): one
// derivation of a path's stages for the hub, the course and the lesson.
import test from "node:test";
import assert from "node:assert/strict";
import { journeyOf, type JourneyStageIn } from "../components/neo-shell/learn/journey-state.ts";

const L = (slug: string, hasLesson = true) => ({ slug, hasLesson });
const PATH: JourneyStageIn[] = [
  { index: 1, title: "יסודות", lessons: [L("a1"), L("a2")] },
  { index: 2, title: "נתוני אב", lessons: [L("b1"), L("b2"), L("b3")] },
  { index: 3, title: "טרם נכתב", lessons: [L("c1", false)] },
  { index: 4, title: "תהליכים", lessons: [L("d1"), L("d2")] },
];
const done = (...slugs: string[]) => (s: string) => slugs.includes(s);

test("a fresh path starts at its first stage, the next one waits, an unwritten stage says so", () => {
  const j = journeyOf(PATH, done());
  assert.equal(j.current, 1);
  assert.deepEqual(j.stages.map((s) => s.state), ["current", "next", "empty", "todo"]);
  assert.equal(j.doneLessons, 0);
  assert.equal(j.totalLessons, 7);
  assert.equal(j.complete, false);
});

test("a partly read first stage stays current and counts what is done", () => {
  const j = journeyOf(PATH, done("a1"));
  assert.equal(j.current, 1);
  assert.equal(j.stages[0].done, 1);
  assert.deepEqual(j.stages.map((s) => s.state), ["current", "next", "empty", "todo"]);
});

test("a finished stage is done and the walk moves on; work read out of order is partial", () => {
  const j = journeyOf(PATH, done("a1", "a2", "d1"));
  assert.equal(j.current, 2);
  assert.deepEqual(j.stages.map((s) => s.state), ["done", "current", "empty", "partial"]);
});

test("a finished path has no current stage", () => {
  const j = journeyOf(PATH, done("a1", "a2", "b1", "b2", "b3", "d1", "d2"));
  assert.equal(j.current, 0);
  assert.equal(j.complete, true);
  assert.deepEqual(j.stages.map((s) => s.state), ["done", "done", "empty", "done"]);
});
