/**
 * Node fact resolution. The property that matters: a link must go somewhere
 * real. A dead link on a "knowledge map" is worse than no link, so an
 * unresolvable token is reported as unresolved rather than guessed into a href.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { nodeFacts, groupRefs, type SapKind } from "../lib/ai/node-facts.ts";

/** Stands in for the live registry: a small, known set of real objects. */
const KNOWN: Record<string, SapKind> = {
  IW31: "tcode", IW32: "tcode", ME21N: "tcode",
  AUFK: "table", MARA: "table",
  BAPI_ALM_ORDER_MAINTAIN: "bapi",
};
const lookup = (t: string) =>
  KNOWN[t] ? { href: `/${KNOWN[t]}/${t}/`, kind: KNOWN[t] } : null;

test("resolves a T-Code named inside a Hebrew label", () => {
  const f = nodeFacts("יצירת הזמנת תחזוקה (IW31)", lookup);
  assert.ok(f.refs.some((r) => r.id.toUpperCase() === "IW31" && r.kind === "tcode"),
    JSON.stringify(f));
  assert.ok(f.refs.every((r) => r.href.startsWith("/")), "hrefs must be real paths");
});

test("does not invent a reference for prose", () => {
  const f = nodeFacts("אירוע תחזוקה מתרחש בשטח", lookup);
  assert.equal(f.refs.length, 0);
});

test("common non-objects are not reported as unresolved noise", () => {
  const f = nodeFacts("SAP ECC לעומת S/4HANA במודול PM", lookup);
  for (const bad of ["SAP", "ECC", "PM"]) {
    assert.ok(!f.unresolved.map((x) => x.toUpperCase()).includes(bad), `${bad} leaked`);
  }
});

test("an identifier-shaped token we cannot resolve is reported, not linked", () => {
  const f = nodeFacts("שלב עם ZZNOTAREALOBJECT", lookup);
  assert.equal(f.refs.length, 0);
  assert.ok(f.unresolved.some((x) => x.toUpperCase().includes("ZZNOTAREALOBJECT")));
});

test("a token appears at most once", () => {
  const f = nodeFacts("IW31 ואז שוב IW31", lookup);
  const ids = f.refs.map((r) => r.id.toUpperCase());
  assert.equal(new Set(ids).size, ids.length);
});

test("grouping is stable and only includes present kinds", () => {
  const f = nodeFacts("IW31 מול טבלת AUFK", lookup);
  const g = groupRefs(f.refs);
  const kinds = g.map(([k]) => k);
  assert.equal(new Set(kinds).size, kinds.length, "no duplicate groups");
  for (const [, list] of g) assert.ok(list.length > 0, "no empty group");
});

test("never throws on odd input", () => {
  for (const s of ["", "   ", "///", "A", "____", "טקסט בלבד"]) {
    assert.doesNotThrow(() => nodeFacts(s, lookup), `threw on ${JSON.stringify(s)}`);
  }
});
