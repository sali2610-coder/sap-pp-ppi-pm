/**
 * Regression tests for the answer block parser.
 *
 * This file exists because of a specific incident. The paragraph branch of
 * parse() consumed only lines that did NOT match its guard set, so a line
 * starting with "|" that no earlier branch claimed left the cursor unmoved and
 * spun the outer loop forever. There was no error and no recovery: the main
 * thread was locked, so no error boundary could fire and no timeout could run.
 *
 * It was reachable two ways in ordinary use — a markdown table's header is
 * revealed before its separator row, and a mermaid edge label is written
 * `-->|yes|` — which means it hit users during normal streaming.
 *
 * Every test here runs under a hard time budget. A hang must fail the suite
 * rather than hang CI, which is exactly what the bug did to the browser.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { parseAnswerBlocks } from "../lib/ai/answer-parse.ts";

/** Fails loudly if `fn` takes longer than a whole frame budget many times over. */
function withinBudget(fn: () => unknown, ms = 500): unknown {
  const t0 = Date.now();
  const out = fn();
  const took = Date.now() - t0;
  assert.ok(took < ms, `took ${took}ms, expected under ${ms}ms — possible non-termination`);
  return out;
}

test("terminates on a table header revealed before its separator", () => {
  // Mid-stream state: the header row exists, the separator has not arrived.
  withinBudget(() => parseAnswerBlocks("| שדה | תיאור |"));
});

test("terminates on a mermaid pipe label", () => {
  withinBudget(() => parseAnswerBlocks("flowchart TD\nA --> B\n|כן| C"));
});

test("terminates on a table row with no separator anywhere", () => {
  withinBudget(() => parseAnswerBlocks("| a | b |\n| c | d |"));
});

test("terminates on every progressive prefix of a streamed answer", () => {
  // The real failure mode: the user watches the answer appear, and the parser
  // runs on each intermediate prefix. One bad prefix locks the tab.
  const answer = [
    "## מחזור החיים",
    "",
    "הזמנת תחזוקה נוצרת מתוך הודעה.",
    "",
    "| שלב | תיאור |",
    "|---|---|",
    "| הודעה | פתיחה |",
    "| הזמנה | תכנון |",
    "",
    "```flowchart",
    "flowchart TD",
    "  A([אירוע]) --> B[הודעה]",
    "  B --> C{זמין?}",
    "  C -->|כן| D[ביצוע]",
    "  C -->|לא| B",
    "```",
    "",
    "- נקודה ראשונה",
    "- נקודה שנייה",
    "",
    "SOURCES: book1#3#3.2",
  ].join("\n");

  withinBudget(() => {
    for (let i = 1; i <= answer.length; i++) parseAnswerBlocks(answer.slice(0, i));
  }, 4000);
});

test("still parses the shapes it is supposed to", () => {
  const blocks = parseAnswerBlocks(
    "## כותרת\n\nפסקה ראשונה.\n\n- פריט\n- פריט שני\n\n| a | b |\n|---|---|\n| 1 | 2 |\n\n```flowchart\nflowchart TD\nA-->B\n```",
  ) as { t: string }[];
  const kinds = blocks.map((b) => b.t);
  assert.ok(kinds.includes("h"), `expected a heading, got ${kinds.join(",")}`);
  assert.ok(kinds.includes("p"), "expected a paragraph");
  assert.ok(kinds.includes("ul"), "expected a list");
  assert.ok(kinds.includes("table"), "expected a table");
  assert.ok(kinds.includes("code"), "expected a fenced block");
});

test("every block consumes input — the invariant the bug violated", () => {
  // Any input at all must terminate. Random-ish shapes built from the tokens
  // that trip block detection, so a future branch that forgets to advance the
  // cursor is caught here rather than in a user's browser.
  const tokens = ["|", "---", "- x", "1. x", "## h", "```", "> q", "", "טקסט", "**b**", "|כן|"];
  withinBudget(() => {
    for (let n = 0; n < 400; n++) {
      const lines: string[] = [];
      let seed = n;
      for (let k = 0; k < 6; k++) {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        lines.push(tokens[seed % tokens.length]);
      }
      parseAnswerBlocks(lines.join("\n"));
    }
  }, 4000);
});
