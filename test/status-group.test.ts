import test from "node:test";
import assert from "node:assert/strict";
import {
  S4_STATUSES, S4_STATUS_DOT, S4_STATUS_GROUP, S4_STATUS_HE, S4_STATUS_READING, S4_STATUS_WORD,
} from "../lib/evidence/types.ts";

/* Design audit S5-3: a status is a shape, a colour and a word — never colour
   alone. Every canonical key has exactly one reading group, one short word and
   one full label, and no map has a key the vocabulary does not. */
test("every S4 status has one reading group, one short word and one full label", () => {
  const groups = new Set(["new", "keeps", "changes", "moves", "notStrategic", "gone", "past", "open"]);
  for (const s of S4_STATUSES) {
    assert.ok(groups.has(S4_STATUS_READING[s]), `unknown group ${S4_STATUS_READING[s]} for ${s}`);
    assert.ok(S4_STATUS_WORD[s], `no short word for ${s}`);
    assert.ok(S4_STATUS_HE[s], `no label for ${s}`);
  }
  for (const m of [S4_STATUS_READING, S4_STATUS_WORD, S4_STATUS_HE, S4_STATUS_GROUP]) {
    assert.deepEqual(Object.keys(m).sort(), [...S4_STATUSES].sort());
  }
});

/* Dictionary 1 of the content review (2026-09-29, row 91): the words, and the
   meanings it keeps apart. */
test("the status dictionary words", () => {
  assert.deepEqual(S4_STATUS_WORD, {
    s4_native: "חדש ב-S/4HANA",
    unchanged: "נשמר",
    released_api_available: "נשמר",
    fiori_alternative_available: "נשמר",
    changed: "משתנה",
    simplified: "משתנה",
    restricted: "מוגבל",
    replaced: "מוחלף",
    deprecated: "לא אסטרטגי",
    compatibility_scope: "לא אסטרטגי",
    not_available: "הוסר",
    legacy_ecc_only: "ECC בלבד",
    verification_required: "נדרש אימות",
    not_applicable: "לא רלוונטי",
  });
  assert.equal(S4_STATUS_HE.unchanged, "נשמר ב-S/4HANA");
  assert.equal(S4_STATUS_HE.simplified, "Simplification Item");
});

test("meanings the dictionary must not merge", () => {
  const R = S4_STATUS_READING, W = S4_STATUS_WORD;
  // not strategic is not removed, and it is not a change
  assert.equal(R.deprecated, "notStrategic");
  assert.equal(R.compatibility_scope, "notStrategic");
  assert.notEqual(W.deprecated, W.not_available);
  assert.notEqual(S4_STATUS_DOT.deprecated, S4_STATUS_DOT.not_available);
  // a Fiori alternative is not a replacement: the GUI screen keeps working
  assert.equal(R.fiori_alternative_available, "keeps");
  assert.notEqual(W.fiori_alternative_available, W.replaced);
  // restricted is not changed, not applicable is not "verification required",
  // ECC only is not removed
  assert.notEqual(W.restricted, W.changed);
  assert.notEqual(W.not_applicable, W.verification_required);
  assert.notEqual(W.legacy_ecc_only, W.not_available);
  // the reading follows the colour: green stays, red is gone, grey is open
  assert.equal(R.unchanged, "keeps");
  assert.equal(R.not_available, "gone");
  assert.equal(R.replaced, "moves");
  assert.equal(R.verification_required, "open");
  assert.equal(R.legacy_ecc_only, "past");
  assert.equal(R.s4_native, "new");
});

test("the seven-family projection folds not-strategic into changes, never into gone", () => {
  for (const s of S4_STATUSES) {
    const want = S4_STATUS_READING[s] === "notStrategic" ? "changes" : S4_STATUS_READING[s];
    assert.equal(S4_STATUS_GROUP[s], want, s);
  }
  assert.equal(S4_STATUS_GROUP.deprecated, "changes");
  assert.equal(Object.values(S4_STATUS_GROUP).filter((g) => g === "gone").length, 1);
});
