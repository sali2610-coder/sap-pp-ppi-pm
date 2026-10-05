/**
 * When a question routes to a diagram profile.
 *
 * The defect: the bare word "process" was enough, and "Process Order" is an
 * SAP object, so "What is a Process Order?" was sent as PROCESS_FLOW to a
 * slower model with a diagram hint. A picture now needs an explicit request,
 * and a task sent by a button is never second-guessed.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { detectDiagramIntent, profileFor } from "../lib/ai/diagram-intent.ts";

const taskOf = (q: string) => profileFor(q).task;

test("an SAP object name is not a diagram request", () => {
  assert.equal(taskOf("What is a Process Order?"), "HEBREW_EXPLAIN");
  assert.equal(taskOf("Explain Process Order"), "HEBREW_EXPLAIN");
  assert.equal(taskOf("מה ההבדל בין Process Order ל-Production Order?"), "HEBREW_EXPLAIN");
  assert.equal(taskOf("מה זה Process Order?"), "HEBREW_EXPLAIN");
});

test("process language alone is a question, not a picture", () => {
  assert.equal(detectDiagramIntent("מה מחזור החיים של הזמנת תחזוקה?"), null);
  assert.equal(detectDiagramIntent("מה התהליך לאישור הזמנה?"), null);
  assert.equal(detectDiagramIntent("What are the steps of the workflow?"), null);
});

test("words that merely contain a drawing word stay questions", () => {
  assert.equal(detectDiagramIntent("How does goods withdrawal work for a Process Order?"), null, "withdrawal");
  assert.equal(detectDiagramIntent("מה מפתח הטבלה AUFK?"), null, "מפתח contains מפת");
  assert.equal(detectDiagramIntent("איך המחשב מחשב את העלות?"), null, "המחשב contains המחש");
  assert.equal(detectDiagramIntent("Where is the charter document stored?"), null, "charter");
});

test("an explicit request for a flow is PROCESS_FLOW", () => {
  assert.equal(taskOf("Create a process flow diagram for Process Order"), "PROCESS_FLOW");
  assert.equal(taskOf("צייר תרשים זרימה של תהליך Process Order"), "PROCESS_FLOW");
  assert.equal(taskOf("שרטט את התהליך"), "PROCESS_FLOW");
  assert.equal(taskOf("draw the steps"), "PROCESS_FLOW");
});

test("an explicit request still picks the right kind of picture", () => {
  assert.equal(taskOf("Draw a decision tree for when to use a Process Order"), "DECISION_TREE");
  assert.equal(detectDiagramIntent("draw a timeline of the project phases")?.kind, "timeline");
  assert.equal(detectDiagramIntent("בתרשים: היררכיה של מיקומים טכניים")?.kind, "hierarchy");
});

test("a task sent by a button is authoritative", () => {
  const drawingText = "Create a process flow diagram for Process Order";
  for (const t of ["QUIZ", "STUDY_GUIDE", "CHAPTER_SUMMARY", "COMPARE_ECC_S4", "DIAGRAM", "PROCESS_FLOW", "STUDENT_SUMMARY"]) {
    const p = profileFor(drawingText, t);
    assert.equal(p.task, t, `${t} was overridden`);
    assert.equal(p.intent, null, `${t} ran the heuristic`);
  }
});
