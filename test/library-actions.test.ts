// The action keys of "שאל את הספרייה" (components/neo-shell/chat/library-chat.tsx)
// are looked up by id in the engine's own ANSWER_ACTIONS. A key whose id stops
// existing would drop out of the side panel without a sound; this test is the
// sound.
import test from "node:test";
import assert from "node:assert/strict";
import { ANSWER_ACTIONS } from "../lib/ai/prompts.ts";
import { MORE_IDS, PRIMARY_IDS } from "../components/neo-shell/chat/library-actions.ts";

test("every action key on Ask the Library is one of the engine's own actions, with a prompt and a task", () => {
  const ids = [...PRIMARY_IDS, ...MORE_IDS];
  assert.equal(new Set(ids).size, 10, "ten distinct keys");
  for (const id of ids) {
    const a = ANSWER_ACTIONS.find((x) => x.id === id);
    assert.ok(a, `${id} is in lib/ai/prompts.ANSWER_ACTIONS`);
    assert.ok(a.label && a.prompt && a.task, `${id} carries a label, a prompt and a backend task`);
  }
});
