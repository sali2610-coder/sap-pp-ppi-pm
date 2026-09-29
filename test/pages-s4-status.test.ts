// The S/4HANA centre paints a status with its --s4-* family through
// S4_STATUS_DOT, never the dataset's own hex (gate 3, major 6): the object
// catalogue and the change topics carry the colour of their canonical key.
import "./app-modules.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import { S4_STATUS_DOT } from "../lib/evidence/types.ts";
import { fromChangeStatus } from "../lib/evidence/s4-status.ts";

const { s4Objects, s4Topics } = await import("../components/neo-shell/s4/s4-data.ts");

test("every catalogue object is painted with the family of its canonical key", () => {
  const objs = s4Objects();
  assert.ok(objs.length > 0);
  for (const o of objs) {
    assert.equal(o.statusColor, S4_STATUS_DOT[o.key], `${o.name}: ${o.statusColor}`);
    assert.ok(!o.statusColor.startsWith("#"), `${o.name}: a raw hex`);
  }
});

test("removed is brick, and no status is the brand red of selection", () => {
  for (const o of s4Objects()) {
    assert.doesNotMatch(o.statusColor, /--brand/, o.name);
    if (o.key === "not_available") assert.equal(o.statusColor, "var(--s4-removed)", o.name);
  }
});

test("every change topic takes the family of fromChangeStatus, and Deprecated is not strategic", () => {
  const topics = s4Topics();
  assert.ok(topics.length > 0);
  for (const t of topics) {
    assert.equal(t.statusColor, S4_STATUS_DOT[fromChangeStatus(t.status).status], t.slug);
    if (t.status === "Deprecated") assert.equal(t.statusColor, "var(--s4-not-strategic)", t.slug);
  }
});
