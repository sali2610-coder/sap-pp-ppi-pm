/**
 * What a link into the NEO reader asks for.
 *
 * A citation adds one thing to the reader's existing contract: `q`, the verified
 * sentence to mark. The rule that matters is that it adds nothing else. `s` and
 * `c` must resolve exactly as they did before, because they decide where the
 * reader lands, and a quote that moved the landing would be a quote that can
 * send a reader to the wrong place.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { askedFor } from "../components/neo-shell/reader/opening.ts";

const KANBAN = "Kanban is a procedure for controlling production and material flow";
const withQuote = (url: string, q: string) => {
  const [search, hash] = url.split("#");
  return `${search ? `${search}&` : "?"}q=${encodeURIComponent(q)}${hash === undefined ? "" : `#${hash}`}`;
};

test("the reader reads the verified quote off the opening address", () => {
  const a = askedFor(`?s=9.1&q=${encodeURIComponent(KANBAN)}`);
  assert.equal(a.section, "9.1");
  assert.equal(a.quote, KANBAN);
});

test("a quote changes neither the section nor the chapter the reader resolves", () => {
  for (const url of ["?s=9.1", "?c=9", "?s=F1393", "?c=9&s=9.1", "#sec-9.1", "#ch-9", ""]) {
    const plain = askedFor(url);
    const cited = askedFor(withQuote(url, KANBAN));
    assert.equal(cited.section, plain.section, url);
    assert.ok(Object.is(cited.chapter, plain.chapter), url);
    assert.equal(cited.quote, KANBAN, url);
  }
});

test("the existing forms resolve as before", () => {
  assert.deepEqual([askedFor("?s=9.1").section, askedFor("?c=9").chapter], ["9.1", 9]);
  assert.deepEqual([askedFor("#sec-4.4.1").section, askedFor("#ch-4").chapter], ["4.4.1", 4]);
  assert.equal(askedFor("?s=F1393").section, "F1393");
});

test("an ordinary visit asks for no quote", () => {
  for (const url of ["", "?s=9.1", "?q=", "?q=%20%20", null]) assert.equal(askedFor(url).quote, null, String(url));
});

test("an address not read yet asks for nothing", () => {
  // Chapter 0 rather than NaN is the reader's existing behaviour (Number("")),
  // kept exactly: no book has a chapter 0, so it resolves to nothing.
  assert.deepEqual(askedFor(null), { section: "", chapter: 0, quote: null });
});
