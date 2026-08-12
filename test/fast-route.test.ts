import test from "node:test";
import assert from "node:assert/strict";
import { fastTaskFor } from "../lib/ai/fast-route.ts";

const SEC = { bookId: "book1", chapter: 1, section: "1.2.1" };
const CH = { bookId: "book5", chapter: 9 };

test("a first focused SECTION question may go fast", () => {
  assert.equal(fastTaskFor({ scope: SEC, turns: 0 }), "LIBRARY_QA_FAST");
  assert.equal(fastTaskFor({ task: "HEBREW_EXPLAIN", scope: SEC, turns: 0 }), "LIBRARY_QA_FAST");
});

test("'הסבר בפשטות' may go fast at SECTION or CHAPTER", () => {
  assert.equal(fastTaskFor({ task: "STUDENT_SUMMARY", scope: SEC, turns: 0 }), "LIBRARY_QA_FAST");
  assert.equal(fastTaskFor({ task: "STUDENT_SUMMARY", scope: CH, turns: 0 }), "LIBRARY_QA_FAST");
});

test("a bare question at CHAPTER scope stays on quality", () => {
  // Only "explain simply" was measured as safe at chapter breadth.
  assert.equal(fastTaskFor({ scope: CH, turns: 0 }), null);
});

test("FOLLOW-UPS never go fast", () => {
  // The measured failure: the fast model refused a follow-up that the quality
  // model answered from the SAME single passage. Speed is worthless if the
  // answer disappears.
  assert.equal(fastTaskFor({ scope: SEC, turns: 1 }), null);
  assert.equal(fastTaskFor({ task: "STUDENT_SUMMARY", scope: SEC, turns: 3 }), null);
});

test("whole-library and book-wide questions stay on quality", () => {
  assert.equal(fastTaskFor({ scope: {}, turns: 0 }), null);
  assert.equal(fastTaskFor({ scope: { bookId: "book2" }, turns: 0 }), null);
});

test("heavy and visual tasks are never rerouted", () => {
  for (const task of ["QUIZ", "STUDY_GUIDE", "COMPARE_ECC_S4", "CHAPTER_SUMMARY",
                      "DIAGRAM", "PROCESS_FLOW", "ARCHITECTURE", "LONGFORM"]) {
    assert.equal(fastTaskFor({ task, scope: SEC, turns: 0 }), null, `${task} was rerouted`);
  }
});

test("an unknown task is never rerouted", () => {
  // Fail closed: anything not explicitly measured keeps its existing route.
  assert.equal(fastTaskFor({ task: "SOMETHING_NEW", scope: SEC, turns: 0 }), null);
});
