/**
 * Diagram intent. False positives are expensive: routing an ordinary question
 * to a visual profile changes the answer for no reason, so the negatives here
 * matter as much as the positives.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { detectDiagramIntent, answerHasDiagram } from "../lib/ai/diagram-intent.ts";

const cases: [string, string | null][] = [
  ["מה מחזור החיים של הזמנת תחזוקה?", "process flow"],
  ["תרשים זרימה של תהליך הזמנת רכש", "process flow"],
  ["show me the lifecycle of a production order", "process flow"],
  ["מתי להשתמש ב-PM ומתי ב-CS?", "decision tree"],
  ["איך הטבלאות EQUI ו-EQKT קשורות?", "entity relationship"],
  ["draw the data model for maintenance orders", "entity relationship"],
  ["מה הארכיטקטורה של האינטגרציה מול Zetes?", "architecture"],
  ["מהם הסטטוסים של הודעת תחזוקה?", "state machine"],
  ["צייר לי ציר זמן של הפרויקט", "timeline"],
  ["תרשים גאנט של הפרויקט", "gantt"],
  ["צייר תוכנית עבודה עם משך המשימות", "gantt"],
  ["תרשים swimlane של האחריות", "swimlane"],
  ["צייר תרשים bpmn של התהליך", "swimlane"],
  ["צייר דיאגרמת רצף של הממשק", "sequence diagram"],
];

for (const [q, want] of cases) {
  test(`intent: ${q.slice(0, 44)}`, () => {
    assert.equal(detectDiagramIntent(q)?.kind ?? null, want);
  });
}

const negatives = [
  "מה זה T-Code IW31?",
  "מה ההבדל בין ECC ל-S/4HANA?",
  "רשימת שדות בטבלת MARA",
  "איך זה קשור למה שאמרת קודם?",   // "קשור" alone must not imply an ERD
  "מה קשור ל-IW32?",
  "הסבר על טבלת EQUI",
  "",
];
for (const q of negatives) {
  test(`no diagram: ${JSON.stringify(q).slice(0, 40)}`, () => {
    assert.equal(detectDiagramIntent(q), null);
  });
}

test("Hebrew definite article does not defeat matching", () => {
  // "מחזור חיים" is written "מחזור החיים" in practice.
  assert.equal(detectDiagramIntent("מה מחזור החיים של ההזמנה?")?.kind, "process flow");
});

test("gantt is matched before timeline", () => {
  // A plan with durations must not be captured as a plain timeline.
  assert.equal(detectDiagramIntent("צייר תוכנית עבודה")?.kind, "gantt");
});

test("answerHasDiagram sees every fence we render", () => {
  for (const f of ["flowchart", "mermaid", "timeline", "swimlane", "sequence", "gantt"]) {
    assert.ok(answerHasDiagram("טקסט\n```" + f + "\nx\n```"), `missed ${f}`);
  }
  assert.ok(!answerHasDiagram("- רק נקודות\n- בלי תרשים"));
});
