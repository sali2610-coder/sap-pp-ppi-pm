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
import { MODES } from "../lib/ai/modes.ts";
import { ANSWER_ACTIONS, QUICK_ACTIONS, SCOPE_ACTIONS } from "../lib/ai/prompts.ts";

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
  // Two kinds of action, two different contracts. A generative action must
  // carry a real prompt AND a routing task, because the task is what selects
  // the model and the quality floor. A navigating action must carry NEITHER —
  // "פתח מקור" opens the source, and giving it a task would imply the model is
  // involved. Asserting one rule for both is what let a stub through before.
  for (const a of ANSWER_ACTIONS) {
    assert.ok(a.id?.trim(), "action without an id");
    assert.ok(a.label?.trim(), `${a.id} has no label`);
    if (a.navigates) {
      assert.equal(a.prompt?.trim(), "", `${a.id} navigates but carries a prompt`);
      assert.equal(a.task?.trim(), "", `${a.id} navigates but carries a routing task`);
    } else {
      assert.ok(a.prompt?.trim().length > 10, `${a.id} has a stub prompt`);
      assert.ok(a.task?.trim(), `${a.id} has no routing task`);
    }
  }
});

test("the scope actions are the ones the brief requires, in order", () => {
  assert.deepEqual(
    SCOPE_ACTIONS.map((a) => a.id),
    ["summary", "simple", "diagram", "ecc", "review", "checklist", "source"],
  );
  // Exactly one navigating action, and it is the source opener.
  const nav = SCOPE_ACTIONS.filter((a) => a.navigates);
  assert.equal(nav.length, 1);
  assert.equal(nav[0].id, "source");
});

test("no two scope actions share a routing task", () => {
  // The whole point is that each button does something DIFFERENT. Two actions
  // on the same profile would produce near-identical output and the difference
  // would be cosmetic.
  const tasks = SCOPE_ACTIONS.filter((a) => !a.navigates).map((a) => a.task);
  assert.equal(new Set(tasks).size, tasks.length, `duplicate task profiles: ${tasks.join(", ")}`);
});

test("action ids are unique within each catalogue", () => {
  for (const [name, list] of [["ANSWER_ACTIONS", ANSWER_ACTIONS], ["QUICK_ACTIONS", QUICK_ACTIONS]] as const) {
    const ids = list.map((a) => a.id);
    assert.equal(new Set(ids).size, ids.length, `${name} has duplicate ids`);
  }
});

/* --------------------------------- starter chips vs quick actions --------- */

test("no starter prompt contradicts the scope the user selected", () => {
  // Production bug: a chip reading "סכם את עיקרי הפרק הזה" was pressed while
  // subsection 1.2.1 was selected. Retrieval correctly served only 1.2.1 while
  // the question asked for a chapter, so the two disagreed and the answer came
  // back "לא מצאתי במקורות שנבחרו מידע מספיק" on content the user could see.
  //
  // A starter is free text with no task profile, so it cannot narrow scope
  // itself — it must therefore not make claims about scope either.
  const SCOPE_CLAIMS = [/הפרק\s+הזה/, /הסעיף\s+הזה/, /הספר\s+הזה/, /תת-?הפרק\s+הזה/];
  for (const s of MODES.library.starters) {
    for (const claim of SCOPE_CLAIMS) {
      assert.ok(!claim.test(s.prompt),
        `starter "${s.label}" names a scope level it cannot guarantee: ${s.prompt}`);
    }
  }
});

test("starter chips and quick actions are distinguishable by label", () => {
  // Two controls both containing "סכם" existed — a starter chip with no task
  // profile and the quick action on CHAPTER_SUMMARY. They looked equivalent and
  // behaved differently, which is how the report arrived as "סכם is broken".
  // A starter must not be a prefix-or-equal of an action label.
  const actionLabels = new Set(SCOPE_ACTIONS.map((a) => a.label.trim()));
  for (const s of MODES.library.starters) {
    assert.ok(!actionLabels.has(s.label.trim()),
      `starter "${s.label}" is indistinguishable from a quick action of the same name`);
  }
});

test("every quick action carries a task profile; starters carry none", () => {
  // The task is what actually selects the model and the quality floor. A
  // control that looks like an action but sends no task silently falls back to
  // the default profile — which is exactly what made the two "סכם" buttons
  // behave differently.
  for (const a of SCOPE_ACTIONS) {
    if (a.navigates) continue;
    assert.ok(a.task?.trim(), `quick action "${a.label}" has no task profile`);
  }
  for (const s of MODES.library.starters) {
    assert.ok(!("task" in s), `starter "${s.label}" should not carry a task profile`);
  }
});
