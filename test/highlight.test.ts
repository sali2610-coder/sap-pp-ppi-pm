/**
 * Locating a verified quote inside the text the reader renders.
 *
 * The backend already proved the sentence exists in the passage it served. This
 * has a harder job: find it in text that has been reflowed, hyphenated across
 * line breaks and split across fields — and map the match back to real offsets,
 * because the highlight lands on what the user is looking at.
 *
 * The rule that matters: return null rather than a near-miss. Highlighting the
 * wrong sentence says "this is where it came from" and points elsewhere.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { findQuote, splitOnQuote } from "../lib/library/highlight.ts";

const BODY = `1.1 A Possible Process for Your Plant Maintenance Project with SAP

In the basic discussion of a possible process, you must differentiate between
the implementation strategy and its accompa- nying methodological approach.

הפרק ממשיך ומתאר את שלבי הפרויקט, כולל הכנה, עיצוב, מימוש והעלאה לאוויר.`;

test("finds a sentence that is present verbatim", () => {
  const q = "the implementation strategy and its accompanying methodological approach";
  const m = findQuote(BODY, q)!;
  assert.ok(m, "should match across the line-wrap hyphen");
  assert.ok(BODY.slice(m.start, m.end).includes("implementation strategy"));
});

test("offsets point into the ORIGINAL text, not a normalised copy", () => {
  const q = "you must differentiate between the implementation strategy";
  const m = findQuote(BODY, q)!;
  const slice = BODY.slice(m.start, m.end);
  assert.ok(slice.startsWith("you must differentiate"), slice.slice(0, 40));
  assert.ok(m.end <= BODY.length);
});

test("matches across a newline that the extraction introduced", () => {
  const q = "you must differentiate between the implementation strategy and its";
  assert.ok(findQuote(BODY, q), "a wrapped sentence must still be found");
});

test("matches Hebrew text", () => {
  const q = "הפרק ממשיך ומתאר את שלבי הפרויקט";
  const m = findQuote(BODY, q)!;
  assert.ok(m);
  assert.ok(BODY.slice(m.start, m.end).includes("שלבי הפרויקט"));
});

test("returns null for a sentence that is not there", () => {
  assert.equal(findQuote(BODY, "זהו משפט שהומצא ואינו קיים בטקסט הזה כלל וכלל"), null);
});

test("refuses a fragment too short to be evidence", () => {
  // A three-word match lands somewhere meaningless.
  assert.equal(findQuote(BODY, "the"), null);
  assert.equal(findQuote(BODY, "process"), null);
});

test("falls back to a long prefix when the quote was trimmed", () => {
  const q = "In the basic discussion of a possible process, you must differentiate AND SOMETHING NEVER WRITTEN";
  const m = findQuote(BODY, q);
  assert.ok(m, "a trimmed tail should still locate the paragraph");
  assert.ok(BODY.slice(m!.start, m!.end).includes("basic discussion"));
});

test("splitOnQuote returns the three parts, losslessly", () => {
  const q = "you must differentiate between the implementation strategy";
  const s = splitOnQuote(BODY, q)!;
  assert.ok(s);
  assert.equal(s.before + s.hit + s.after, BODY, "splitting must not lose a character");
  assert.ok(s.hit.includes("differentiate"));
});

test("no quote, or an absent one, yields null rather than a false hit", () => {
  assert.equal(splitOnQuote(BODY, null), null);
  assert.equal(splitOnQuote(BODY, undefined), null);
  assert.equal(splitOnQuote(BODY, "לא קיים כאן בכלל משפט כזה ארוך דיו"), null);
});

test("markdown emphasis does not defeat a match", () => {
  // The reader renders **bold** as bold, so a quote taken from rendered text
  // has no asterisks while the source string does. Citations point at headings
  // more often than anywhere else, and headings are bold.
  const src = "**1.1 תהליך אפשרי לפרויקט אחזקת המפעל**\nכאשר ניגשים לתכנון הפרויקט יש להבחין בין האסטרטגיה למתודולוגיה.";
  const rendered = "1.1 תהליך אפשרי לפרויקט אחזקת המפעל";
  const m = findQuote(src, rendered);
  assert.ok(m, "a bolded heading must still be locatable");
  assert.ok(src.slice(m!.start, m!.end).includes("תהליך אפשרי"));
});

test("inline code and underscores are ignored too", () => {
  const src = "השתמש ב-`IW31` כדי ליצור הזמנה, ואחר כך _שחרר_ אותה במערכת בהתאם לנוהל.";
  assert.ok(findQuote(src, "השתמש ב-IW31 כדי ליצור הזמנה, ואחר כך שחרר אותה במערכת"));
});
