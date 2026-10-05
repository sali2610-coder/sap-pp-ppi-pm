import test from "node:test";
import assert from "node:assert/strict";
import { citationHref } from "../lib/ai/links.ts";
import { neoChapterHref, neoReadHref, neoSectionHref } from "../components/neo-shell/books/links.ts";
import { bringIntoView, readDeepLink, sectionElementId } from "../lib/library/deep-link.ts";

/** How the NEO reader parses an incoming link: the query, read on the client.
 *  The base is a stand-in host, to show the link never names one itself. */
const parse = (href: string) => {
  const u = new URL(href, "https://preview.example");
  const p = new URLSearchParams(u.search);
  return { host: u.host, path: u.pathname, section: p.get("s"), chapter: p.get("c"), quote: p.get("q"), hash: u.hash };
};

const KANBAN = "Kanban is a procedure for controlling production and material flow";

test("a citation opens the NEO reader, never the legacy /library/ reader", () => {
  // The defect: every source link opened /library/<id>/, the old site shell.
  for (const href of [
    citationHref("book2", 9, "9.1", KANBAN),
    citationHref("book2", 9, "9.1"),
    citationHref("book2", 9),
    citationHref("book2"),
    citationHref("book7", 1, "F1393", "Account Balance Audit Trail shows every posting"),
  ]) {
    assert.ok(href.startsWith("/neo/read/"), href);
    assert.ok(!href.includes("/library/"), href);
  }
});

test("a book-only citation opens the book in the NEO reader", () => {
  assert.equal(citationHref("book2"), "/neo/read/book2/");
});

test("a chapter citation opens that chapter with ?c=", () => {
  assert.equal(citationHref("book2", 9), "/neo/read/book2/?c=9");
});

test("a section citation lands on the subchapter with ?s=: book2, chapter 9, section 9.1", () => {
  assert.equal(citationHref("book2", 9, "9.1"), "/neo/read/book2/?s=9.1");
});

test("the verified quote follows the section as &q=, encoded, with no fragment after it", () => {
  const href = citationHref("book2", 9, "9.1", KANBAN);
  assert.equal(href, `/neo/read/book2/?s=9.1&q=${encodeURIComponent(KANBAN)}`);
  const got = parse(href);
  assert.deepEqual([got.path, got.section, got.quote, got.hash], ["/neo/read/book2/", "9.1", KANBAN, ""]);
});

test("a non-dotted section id lands too: book7's Fiori app F1393", () => {
  // The NEO reader resolves ?s= against the book's real section list, so an
  // app id is as good as a dotted number there.
  assert.equal(citationHref("book7", 1, "F1393"), "/neo/read/book7/?s=F1393");
  assert.equal(parse(citationHref("book7", 1, "F1393", "Account Balance Audit Trail shows every posting")).section, "F1393");
});

test("the link is relative, so a Preview stays on its own host", () => {
  const href = citationHref("book2", 9, "9.1", KANBAN);
  assert.ok(href.startsWith("/") && !href.startsWith("//"), href);
  assert.doesNotMatch(href, /https?:|vercel\.app|sapbysali\.app/);
  assert.equal(parse(href).host, "preview.example");
});

test("the forms are the NEO reader's own route contract, not a third convention", () => {
  assert.equal(citationHref("book2"), neoReadHref("book2"));
  assert.equal(citationHref("book2", 9), neoChapterHref("book2", 9));
  assert.equal(citationHref("book7", 1, "F1393"), neoSectionHref("book7", "F1393"));
  assert.ok(citationHref("book2", 9, "9.1", KANBAN).startsWith(`${neoSectionHref("book2", "9.1")}&q=`));
});

test("no quote means no q parameter rather than an empty one", () => {
  const got = parse(citationHref("book1", 2, "2.4"));
  assert.equal(got.quote, null);
  assert.equal(got.section, "2.4");
});

test("a quote without a section is not sent: it can only be checked inside a subchapter", () => {
  assert.equal(citationHref("book2", 9, null, KANBAN), "/neo/read/book2/?c=9");
});

test("a section id that needs encoding stays one parameter", () => {
  assert.equal(parse(citationHref("book2", 9, "A&B 1")).section, "A&B 1");
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
});

test("a long jump is instant; a short one keeps the reader's smooth motion", () => {
  // Regression: on book5 the cited line sat 30,909px below a 702,767px page and
  // scrollIntoView({behavior:"smooth"}) never moved the page at all — Chrome
  // drops an animated scroll over a distance that large. The section resolved
  // and the mark was created correctly; it was simply never brought on screen.
  const calls: Array<{ top: number; behavior: string }> = [];
  const win = {
    scrollY: 496101,
    innerHeight: 1000,
    scrollTo: (o: { top: number; behavior: string }) => calls.push(o),
  } as unknown as Window;

  const far = { getBoundingClientRect: () => ({ top: 30909, height: 40 }) } as unknown as HTMLElement;
  bringIntoView(far, win);
  assert.equal(calls[0].behavior, "auto", "a 30k px jump must not be animated");
  assert.ok(calls[0].top > 500000, `expected to scroll past the mark, got ${calls[0].top}`);

  const near = { getBoundingClientRect: () => ({ top: 1200, height: 40 }) } as unknown as HTMLElement;
  bringIntoView(near, win);
  assert.equal(calls[1].behavior, "smooth", "a short hop should stay smooth");
});

test("bringIntoView never scrolls above the top of the page", () => {
  const calls: Array<{ top: number }> = [];
  const win = { scrollY: 0, innerHeight: 1000, scrollTo: (o: { top: number }) => calls.push(o) } as unknown as Window;
  const el = { getBoundingClientRect: () => ({ top: 10, height: 20 }) } as unknown as HTMLElement;
  bringIntoView(el, win);
  assert.ok(calls[0].top >= 0, `negative scroll target: ${calls[0].top}`);
});
