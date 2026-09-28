import test from "node:test";
import assert from "node:assert/strict";
import { S4_STATUSES, S4_STATUS_GROUP, S4_STATUS_HE } from "../lib/evidence/types.ts";

/* Design audit S5-3: a status is a shape, a colour and a word — never colour
   alone. Every canonical key has exactly one reading group, and the group map
   has no key the vocabulary does not. */
test("every S4 status maps to one reading group", () => {
  const groups = new Set(["new", "keeps", "changes", "moves", "gone", "past", "open"]);
  for (const s of S4_STATUSES) {
    assert.ok(S4_STATUS_GROUP[s], `no group for ${s}`);
    assert.ok(groups.has(S4_STATUS_GROUP[s]), `unknown group ${S4_STATUS_GROUP[s]} for ${s}`);
    assert.ok(S4_STATUS_HE[s], `no label for ${s}`);
  }
  assert.deepEqual(Object.keys(S4_STATUS_GROUP).sort(), [...S4_STATUSES].sort());
});

test("the reading groups follow the colour reading", () => {
  // green stays, red is gone, grey is open — the same reading S4_STATUS_DOT uses
  assert.equal(S4_STATUS_GROUP.unchanged, "keeps");
  assert.equal(S4_STATUS_GROUP.not_available, "gone");
  assert.equal(S4_STATUS_GROUP.deprecated, "gone");
  assert.equal(S4_STATUS_GROUP.replaced, "moves");
  assert.equal(S4_STATUS_GROUP.verification_required, "open");
  assert.equal(S4_STATUS_GROUP.legacy_ecc_only, "past");
  assert.equal(S4_STATUS_GROUP.s4_native, "new");
});
