/**
 * Every Ask-the-Library button sends a canonical task id.
 *
 * The id lists are read from the UI source itself (library-chat.tsx and
 * message.tsx), so a button added, renamed or re-pointed there is checked here
 * without anyone remembering to update this file. CANONICAL is the
 * `taskToClass` table of sap-books-api config/task-routing.json: the ids the
 * measured router knows.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { ANSWER_ACTIONS, FOLLOW_UPS, REFUSAL_FOLLOW_UPS, followUpTask } from "../lib/ai/prompts.ts";

const CANONICAL: Record<string, string> = {
  LIBRARY_QA_FAST: "factual_question", QA_SHORT: "factual_question", SAP_QA: "factual_question",
  CONCEPT: "term_lookup", HEBREW_EXPLAIN: "unknown", STUDENT_SUMMARY: "simple_explanation",
  SECTION_SUMMARY: "detailed_summary", BULLET_SUMMARY: "short_summary", ONEPAGE: "short_summary",
  EXEC_SUMMARY: "short_summary", CHAPTER_SUMMARY: "chapter_summary", LONGFORM: "detailed_explanation",
  BOOK_QA: "multi_book_question", COMPARE_ECC_S4: "ecc_vs_s4", QUIZ: "quiz", FLASHCARDS: "quiz",
  STUDY_GUIDE: "checklist", DIAGRAM: "diagram", MERMAID: "diagram", PROCESS_FLOW: "diagram",
  ARCHITECTURE: "diagram", DECISION_TREE: "diagram", INFOGRAPHIC: "infographic",
  PRESENTATION_OUTLINE: "presentation", PRESENTATION_2: "presentation", IMAGE_PROMPT: "image_request",
};

const src = (f: string) => readFileSync(new URL(`../components/neo-shell/chat/${f}`, import.meta.url), "utf8");
const ids = (file: string, name: string) => {
  const m = new RegExp(`${name}\\s*=\\s*\\[([^\\]]*)\\]`).exec(src(file));
  assert.ok(m, `${name} not found in ${file}`);
  return [...m[1].matchAll(/"([a-z]+)"/g)].map((x) => x[1]);
};

/** What each visible button must resolve to: the researched class for its intent. */
const EXPECTED_CLASS: Record<string, string> = {
  simple: "simple_explanation", summary: "chapter_summary", review: "quiz", checklist: "checklist",
  diagram: "diagram", ecc: "ecc_vs_s4", expand: "detailed_explanation", example: "factual_question",
  onepage: "short_summary", deck: "diagram",
};

const buttons = [
  ...ids("library-chat.tsx", "PRIMARY_IDS"),
  ...ids("library-chat.tsx", "MORE_IDS"),
  ...ids("message.tsx", "ACTION_IDS"),
];

test("the UI exposes the buttons this table describes", () => {
  assert.ok(buttons.length >= 16, `only ${buttons.length} buttons found`);
});

for (const id of new Set(buttons)) {
  test(`button "${id}" sends a canonical task for its intent`, () => {
    const a = ANSWER_ACTIONS.find((x) => x.id === id);
    assert.ok(a, `no ANSWER_ACTIONS entry for ${id}`);
    if (a.navigates) { assert.equal(a.task, "", "a navigating action sends no task"); return; }
    assert.ok(a.task in CANONICAL, `${a.task} is not a registered task id`);
    assert.equal(CANONICAL[a.task], EXPECTED_CLASS[id], `${a.label} routes to the wrong class`);
  });
}

test("a follow-up chip that repeats a button routes like the button", () => {
  assert.equal(followUpTask("השווה ל-S/4HANA"), "COMPARE_ECC_S4");
  assert.equal(followUpTask("תן דוגמה מעשית"), "SAP_QA");
  assert.equal(followUpTask("הסבר יותר לעומק"), "LONGFORM");
});

test("the other chips are plain questions", () => {
  for (const f of FOLLOW_UPS.filter((x) => !x.action)) assert.equal(followUpTask(f.label), undefined, f.label);
  for (const r of REFUSAL_FOLLOW_UPS) assert.equal(followUpTask(r), undefined, r);
});
