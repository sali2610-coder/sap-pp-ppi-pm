/**
 * Every AI action must deliver what its label promises.
 *
 * Two did not. "צור אינפוגרפיקה" produced prose describing an infographic that
 * nothing could render, and "צור 2 שקופיות" produced prose describing slides
 * with no deck behind it. A button that names an artifact the app cannot
 * produce is a placeholder wearing a feature's clothes.
 *
 * This guards the rule rather than the two cases: an action may only promise an
 * artifact the product can actually render.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { ANSWER_ACTIONS, QUICK_ACTIONS } from "../lib/ai/prompts.ts";

/** Artifacts the app can actually draw, and the task that produces each. */
const RENDERABLE = new Set([
  "DIAGRAM", "PROCESS_FLOW", "DECISION_TREE", "ARCHITECTURE",
]);

/** Words that promise a rendered artifact rather than prose. */
const PROMISES_ARTIFACT = /אינפוגרפיקה|שקופ|infographic|slide/i;

test("no action promises an artifact the app cannot render", () => {
  for (const a of ANSWER_ACTIONS) {
    assert.ok(!PROMISES_ARTIFACT.test(a.label),
      `"${a.label}" promises an artifact with no renderer`);
  }
  for (const q of QUICK_ACTIONS) {
    assert.ok(!PROMISES_ARTIFACT.test(q.label),
      `"${q.label}" promises an artifact with no renderer`);
  }
});

test("the presentation action routes to a task that yields a diagram", () => {
  const deck = ANSWER_ACTIONS.find((a) => a.id === "deck");
  assert.ok(deck, "the presentation action should still exist");
  assert.ok(RENDERABLE.has(deck!.task),
    `presentation routes to ${deck!.task}, which renders nothing presentable`);
  // Its prompt must actually ask for a diagram, or the task alone will not help.
  assert.match(deck!.prompt, /תרשים|זרימה/, "prompt must ask for a diagram");
});

test("the infographic action is gone, not merely relabelled", () => {
  for (const list of [ANSWER_ACTIONS, QUICK_ACTIONS]) {
    assert.ok(!list.some((a) => a.id === "info" || a.id === "infographic"),
      "an unrenderable action was reintroduced");
  }
});

test("every action has a label, a prompt and a non-empty id", () => {
  for (const a of ANSWER_ACTIONS) {
    assert.ok(a.id?.trim(), "action without an id");
    assert.ok(a.label?.trim(), `${a.id} has no label`);
    assert.ok(a.prompt?.trim().length > 10, `${a.id} has a stub prompt`);
    assert.ok(a.task?.trim(), `${a.id} has no routing task`);
  }
});

test("action ids are unique within each catalogue", () => {
  for (const [name, list] of [["ANSWER_ACTIONS", ANSWER_ACTIONS], ["QUICK_ACTIONS", QUICK_ACTIONS]] as const) {
    const ids = list.map((a) => a.id);
    assert.equal(new Set(ids).size, ids.length, `${name} has duplicate ids`);
  }
});
