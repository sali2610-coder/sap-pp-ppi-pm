/**
 * The four non-graph shapes. The property that matters most is that they do NOT
 * parse each other: a Gantt read as a timeline silently loses every duration,
 * and the answer still renders, so nothing would flag it.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { parseTimeline, parseSwimlane, parseSequence, parseGantt, isAxisFence } from "../lib/ai/timeline.ts";

const TIMELINE = `timeline
  title מפת דרכים
  Q1 2026 : גילוי : ניתוח פערים
  Q2 2026 : עיצוב
  Q3 2026 : Go-Live`;

const SWIMLANE = `swimlane
  lane תכנון
    A[יצירת הודעה] --> B[יצירת הזמנה]
  lane ייצור
    B --> C{זמינות?}
    C -->|כן| D[ביצוע]`;

const SEQUENCE = `sequenceDiagram
  participant Zetes
  participant PP as תכנון ייצור
  Zetes ->> PP: IDoc
  PP -->> Zetes: ACK`;

const GANTT = `gantt
  section גילוי
    ניתוח פערים : 2026-01-01, 30d
    סדנאות : 2w
  section עיצוב
    עיצוב : 2026-03-01, 2026-04-15`;

const BPMN = `bpmn
  lane מבקש
    S(התחלה) --> A[בקשה]
  lane רכש
    A --> G{אישור?}
    G -->|כן| E(סיום)`;

test("timeline keeps periods and their items", () => {
  const t = parseTimeline(TIMELINE)!;
  assert.equal(t.title, "מפת דרכים");
  assert.equal(t.events.length, 3);
  assert.deepEqual(t.events[0].items, ["גילוי", "ניתוח פערים"]);
});

test("swimlane records the owner of each step and keeps cross-lane handoffs", () => {
  const s = parseSwimlane(SWIMLANE)!;
  assert.deepEqual(s.lanes, ["תכנון", "ייצור"]);
  const crossing = s.edges.filter((e) => {
    const a = s.steps.find((x) => x.id === e.from), b = s.steps.find((x) => x.id === e.to);
    return a && b && a.lane !== b.lane;
  });
  assert.ok(crossing.length >= 1, "a handoff between owners is the point of the shape");
});

test("sequence gives one lifeline per participant, not one per alias", () => {
  const q = parseSequence(SEQUENCE)!;
  assert.equal(q.actors.length, 2, `got ${q.actors.join(",")}`);
  assert.equal(q.labels.PP, "תכנון ייצור");
  assert.equal(q.messages.filter((m) => m.dashed).length, 1, "the reply is dashed");
});

test("gantt converts weeks and date ranges to days, and chains untimed tasks", () => {
  const g = parseGantt(GANTT)!;
  assert.equal(g.tasks[0].days, 30);
  assert.equal(g.tasks[1].days, 14, "2w");
  assert.equal(g.tasks[1].offset, 30, "a task with no start follows the previous one");
  assert.equal(g.tasks[2].days, 45, "date range becomes a duration");
});

test("bpmn distinguishes event, gateway and task", () => {
  const b = parseSwimlane(BPMN)!;
  assert.equal(b.steps.find((x) => x.id === "S")?.shape, "event");
  assert.equal(b.steps.find((x) => x.id === "G")?.shape, "gateway");
  assert.equal(b.steps.find((x) => x.id === "A")?.shape, "task");
});

test("shape syntax means the same thing in both swimlane and bpmn", () => {
  // I claimed in the BPMN commit that a plain swimlane stays all-tasks. That was
  // wrong, and this test caught it. `{...}` maps to a gateway in BOTH fences —
  // which is the RIGHT behaviour, because `{...}` already means "decision" in
  // the flowchart renderer. One vocabulary across all three is less surprising
  // than a shape whose meaning depends on the fence it sits in.
  const s = parseSwimlane(SWIMLANE)!;
  assert.equal(s.steps.find((x) => x.id === "C")?.shape, "gateway", "{} is a decision everywhere");
  assert.ok(s.steps.filter((x) => x.id !== "C").every((x) => x.shape === "task"),
    "[] stays a task");
});

test("no parser claims another parser's input", () => {
  const cases: [string, string][] = [
    ["timeline", TIMELINE], ["swimlane", SWIMLANE], ["sequence", SEQUENCE],
    ["gantt", GANTT], ["bpmn", BPMN],
    ["flowchart", "flowchart TD\nA-->B"], ["prose", "just some text"], ["code", "const x = 1;"],
  ];
  const parsers: Record<string, (s: string) => unknown> = {
    timeline: parseTimeline, swimlane: parseSwimlane, sequence: parseSequence, gantt: parseGantt,
  };
  const expected: Record<string, string | null> = {
    timeline: "timeline", swimlane: "swimlane", sequence: "sequence",
    gantt: "gantt", bpmn: "swimlane", flowchart: null, prose: null, code: null,
  };
  for (const [name, src] of cases) {
    for (const [pname, fn] of Object.entries(parsers)) {
      const got = fn(src) !== null;
      const want = expected[name] === pname;
      assert.equal(got, want, `${pname} on ${name}: got ${got}, want ${want}`);
    }
  }
});

test("axis fences are recognised, non-axis are not", () => {
  for (const src of [TIMELINE, SWIMLANE, SEQUENCE, GANTT, BPMN]) assert.ok(isAxisFence(src));
  assert.ok(!isAxisFence("flowchart TD\nA-->B"));
  assert.ok(!isAxisFence("const x = 1"));
});

test("never throws on malformed input", () => {
  for (const src of ["", "gantt", "timeline", "swimlane", "sequenceDiagram", "gantt\nsection", "bpmn\nlane"]) {
    for (const fn of [parseTimeline, parseSwimlane, parseSequence, parseGantt]) {
      assert.doesNotThrow(() => fn(src), `${fn.name} threw on ${JSON.stringify(src)}`);
    }
  }
});
