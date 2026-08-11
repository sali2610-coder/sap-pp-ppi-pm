import test from "node:test";
import assert from "node:assert/strict";
import { citationHref } from "../lib/ai/links.ts";
import { readDeepLink, sectionElementId } from "../lib/library/deep-link.ts";

/** How the reader actually parses an incoming link. */
const parse = (href: string) => {
  const u = new URL(href, "https://sapbysali.app");
  const p = new URLSearchParams(u.search);
  return { section: p.get("s"), quote: p.get("q"), hash: u.hash };
};

test("a citation link carries a readable query, not a query buried in the hash", () => {
  // The regression that made every citation in the product inert: the query was
  // concatenated after `#s-…`, so it became part of the fragment and
  // `location.search` was empty. No chapter switch, no scroll, no highlight.
  const href = citationHref("book8", 3, "3.1", "משפט התומך בתשובה הזאת בדיוק");
  const got = parse(href);
  assert.equal(got.section, "3.1");
  assert.equal(got.quote, "משפט התומך בתשובה הזאת בדיוק");
  assert.ok(href.indexOf("?") < href.indexOf("#"), `query must precede fragment: ${href}`);
});

test("the section anchor survives, so the browser can jump before hydration", () => {
  assert.equal(parse(citationHref("book1", 2, "2.4", null)).hash, "#sec-2.4");
});

test("no quote means no q parameter rather than an empty one", () => {
  const got = parse(citationHref("book1", 2, "2.4"));
  assert.equal(got.quote, null);
  assert.equal(got.section, "2.4");
});

test("a chapter-only citation still lands on the chapter", () => {
  assert.equal(citationHref("book1", 5), "/library/book1/#ch-5");
});

test("hebrew and special characters survive the round trip", () => {
  for (const q of [
    'משפט עם "מרכאות" ו-40% ו+פלוס',
    "a & b ? c # d",
    "PLKO → PLPO",
  ]) {
    assert.equal(parse(citationHref("book8", 1, "1.1", q)).quote, q, `lost: ${q}`);
  }
});

test("a very long quote is truncated but stays parseable", () => {
  const long = "א".repeat(900);
  const got = parse(citationHref("book8", 1, "1.1", long));
  assert.equal(got.quote?.length, 300);
  assert.equal(got.section, "1.1");
});



/* ------------------------------------------------ bespoke reader deep link */

test("a citation request is read only when it is genuinely one", () => {
  assert.deepEqual(readDeepLink("?s=4.4.1&q=hello%20there%20friend"),
    { section: "4.4.1", quote: "hello there friend" });
  assert.deepEqual(readDeepLink("?s=3"), { section: "3", quote: null });
  // An ordinary visit must leave the reader completely alone.
  assert.equal(readDeepLink(""), null);
  assert.equal(readDeepLink("?foo=bar"), null);
});

test("a malformed section id is refused rather than used", () => {
  // The value becomes an element id, so anything that is not a dotted number
  // is rejected instead of being trusted.
  for (const bad of ["?s=../../etc", "?s=<script>", "?s=4.4.1'", "?s=%20", "?s=sec-1"]) {
    assert.equal(readDeepLink(bad), null, `accepted ${bad}`);
  }
});

test("the element id matches what the bespoke reader renders", () => {
  // The reader gives sections `sec-4.4.1`. Citations previously pointed at
  // `s-4.4.1`, so the browser jump matched nothing and the feature was dead.
  assert.equal(sectionElementId("4.4.1"), "sec-4.4.1");
  assert.match(citationHref("book2", 4, "4.4.1", null), /#sec-4\.4\.1$/);
});
