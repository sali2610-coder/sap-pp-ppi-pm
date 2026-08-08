import { test } from "node:test";
import assert from "node:assert/strict";
import { badgesFor, readingTime, metricsSummary } from "../lib/ai/node-badges.ts";

const M = (o: Partial<Record<string, number>> = {}) =>
  ({ w: 0, d: 0, tb: 0, tc: 0, o: 0, ab: 0, cf: 0, fi: 0, fg: 0, ...o }) as never;

test("a badge appears only when its count is non-zero", () => {
  assert.deepEqual(badgesFor(M()), []);
  const b = badgesFor(M({ d: 2 }));
  assert.equal(b.length, 1);
  assert.equal(b[0].key, "diagram");
  assert.equal(b[0].count, 2);
});

test("presence-only signals carry no number", () => {
  // "1 table" would claim exactly one; the flag means "at least one".
  const [t] = badgesFor(M({ tb: 1 }));
  assert.equal(t.key, "table");
  assert.equal(t.count, undefined);
  const [c] = badgesFor(M({ cf: 1 }));
  assert.equal(c.count, undefined);
});

test("plain text is a fallback, never an addition", () => {
  assert.equal(badgesFor(M({ w: 500 }))[0].key, "text");
  const rich = badgesFor(M({ w: 500, d: 1, tc: 3 }));
  assert.ok(!rich.some((b) => b.key === "text"), "text must not accompany specifics");
});

test("order is stable regardless of which metrics are set", () => {
  const a = badgesFor(M({ d: 1, tb: 1, tc: 1, o: 1, cf: 1, fi: 1, ab: 1, fg: 1 })).map((b) => b.key);
  const b = badgesFor(M({ fg: 1, ab: 1, fi: 1, cf: 1, o: 1, tc: 1, tb: 1, d: 1 })).map((x) => x.key);
  assert.deepEqual(a, b);
});

test("every badge has an accessible label, never an emoji alone", () => {
  for (const b of badgesFor(M({ d: 1, tb: 1, tc: 1, o: 1, cf: 1, fi: 1, ab: 1, fg: 1 }))) {
    assert.ok(b.label && b.label.trim().length > 1, `${b.key} has no label`);
    assert.ok(b.icon, `${b.key} has no icon`);
  }
});

test("reading time is human, and absent when there is nothing to read", () => {
  assert.equal(readingTime(M()), null);
  assert.equal(readingTime(M({ min: 12 })), "12 דק׳");
  assert.equal(readingTime(M({ min: 60 })), "1 ש׳");
  assert.equal(readingTime(M({ min: 95 })), "1 ש׳ 35 דק׳");
  assert.equal(readingTime(M({ w: 360 })), "2 דק׳", "derives from words when min is absent");
});

test("summary omits what is zero", () => {
  const s = metricsSummary(M({ w: 1000, d: 2, min: 6 }));
  assert.ok(s.includes("6 דק׳") && s.includes("2 תרשימים"));
  assert.ok(!s.includes("טרנזקציות"), s);
  assert.equal(metricsSummary(undefined), "");
});
