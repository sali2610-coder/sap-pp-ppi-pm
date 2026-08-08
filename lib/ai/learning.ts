/**
 * Learning Mode: turns a diagram into a lesson.
 *
 * The hard constraint, and the reason this file is shaped the way it is: there
 * is NO per-step source of SAP knowledge. A node label is prose the model wrote,
 * not a record. Writing "this step creates a maintenance order because…" would
 * be inventing SAP facts, which is the one thing this product must never do.
 *
 * What a diagram DOES encode is true by construction: what kind of step this is,
 * what leads into it, what follows, which branch a decision takes, and which
 * identifiers the label names. Every sentence produced here is a restatement of
 * that structure. Every quiz answer is checkable against the same structure,
 * which is why the quiz can be graded at all — a question about SAP semantics
 * could not be.
 *
 * Pure and DOM-free so the correctness of the questions is testable directly.
 */

import type { Diagram, DiagramNode } from "./diagram";

export type StepKind = "start" | "end" | "decision" | "data" | "step";

export interface LessonStep {
  node: DiagramNode;
  kind: StepKind;
  /** Plain-language description, derived only from the diagram's structure. */
  explain: string;
  /** Identifier-shaped tokens in the label, for concept highlighting. */
  concepts: string[];
  incoming: string[];
  outgoing: { id: string; label?: string }[];
}

export interface Lesson {
  steps: LessonStep[];
  /** One short paragraph restating the shape of the process. */
  summary: string;
  quiz: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  choices: string[];
  /** Index into `choices`. Derived from the diagram, never authored. */
  answer: number;
  /** Why that answer is right, in terms of the diagram. */
  because: string;
}

/** Same shape vocabulary the renderer uses, in plain Hebrew. */
export const KIND_HE: Record<StepKind, string> = {
  start: "נקודת התחלה",
  end: "נקודת סיום",
  decision: "נקודת החלטה",
  data: "מאגר נתונים",
  step: "שלב בתהליך",
};

/**
 * Identifier-shaped tokens. Same narrow rule the node panel uses: a false
 * positive here highlights an ordinary Hebrew word as an "SAP concept", which
 * teaches something untrue.
 */
const CONCEPT = /\b(?:\/[A-Z0-9]{2,10}\/)?[A-Z][A-Z0-9_]{2,39}\b/g;
const NOT_A_CONCEPT = new Set([
  "SAP", "ECC", "ERP", "ABAP", "HANA", "FIORI", "IMG", "AND", "OR", "THE",
  "PM", "PP", "QM", "MM", "SD", "FI", "CO", "WM", "EWM", "S4", "S4HANA", "R3",
]);

function conceptsIn(label: string): string[] {
  const out: string[] = [];
  for (const m of String(label || "").matchAll(CONCEPT)) {
    const t = m[0];
    if (!NOT_A_CONCEPT.has(t.toUpperCase()) && !out.includes(t)) out.push(t);
  }
  return out;
}

function kindOf(node: DiagramNode, incoming: number, outgoing: number): StepKind {
  if (node.shape === "decision") return "decision";
  if (node.shape === "data") return "data";
  if (incoming === 0) return "start";
  if (outgoing === 0) return "end";
  return "step";
}

/** Joins names the way Hebrew reads: "א, ב ו-ג". */
function list(names: string[]): string {
  if (names.length <= 1) return names[0] ?? "";
  return `${names.slice(0, -1).join(", ")} ו-${names[names.length - 1]}`;
}

/**
 * Builds the lesson. Step order follows the process, not the layout — the same
 * reason presentation mode reorders.
 */
export function buildLesson(d: Diagram, order: DiagramNode[]): Lesson {
  const inMap = new Map<string, string[]>();
  const outMap = new Map<string, { id: string; label?: string }[]>();
  for (const n of d.nodes) { inMap.set(n.id, []); outMap.set(n.id, []); }
  for (const e of d.edges) {
    inMap.get(e.to)?.push(e.from);
    outMap.get(e.from)?.push({ id: e.to, label: e.label });
  }
  const nameOf = (id: string) => d.nodes.find((n) => n.id === id)?.label ?? id;

  const steps: LessonStep[] = order.map((node) => {
    const incoming = inMap.get(node.id) ?? [];
    const outgoing = outMap.get(node.id) ?? [];
    const kind = kindOf(node, incoming.length, outgoing.length);

    // Every clause below restates an edge or a shape. Nothing is asserted about
    // what the step MEANS in SAP.
    const parts: string[] = [];
    if (kind === "start") parts.push("כאן מתחיל התהליך.");
    else if (kind === "end") parts.push("כאן התהליך מסתיים.");
    else if (kind === "decision") parts.push("בנקודה הזו התהליך מתפצל לפי תנאי.");
    else if (kind === "data") parts.push("שלב שנוגע במאגר נתונים.");

    if (incoming.length === 1) parts.push(`מגיעים לכאן מ${nameOf(incoming[0])}.`);
    else if (incoming.length > 1) parts.push(`מגיעים לכאן מ${list(incoming.map(nameOf))}.`);

    if (outgoing.length === 1) {
      parts.push(`ממשיכים אל ${nameOf(outgoing[0].id)}.`);
    } else if (outgoing.length > 1) {
      const labelled = outgoing.filter((o) => o.label);
      if (labelled.length === outgoing.length) {
        parts.push(`ההמשך תלוי בתשובה: ${outgoing.map((o) => `${o.label} → ${nameOf(o.id)}`).join(" · ")}.`);
      } else {
        parts.push(`ממשיכים אל ${list(outgoing.map((o) => nameOf(o.id)))}.`);
      }
    }

    const concepts = conceptsIn(node.label);
    if (concepts.length) {
      parts.push(`מוזכרים כאן: ${list(concepts)}. אפשר לפתוח כל אחד מהם לפרטים.`);
    }

    return { node, kind, explain: parts.join(" "), concepts, incoming, outgoing };
  });

  const decisions = steps.filter((s) => s.kind === "decision").length;
  const ends = steps.filter((s) => s.kind === "end").length;
  const allConcepts = [...new Set(steps.flatMap((s) => s.concepts))];

  const summary = [
    `התהליך מורכב מ-${steps.length} שלבים.`,
    decisions ? `יש בו ${decisions === 1 ? "נקודת החלטה אחת" : `${decisions} נקודות החלטה`}.` : "אין בו נקודות החלטה.",
    ends > 1 ? `יש ${ends} נקודות סיום אפשריות.` : "",
    allConcepts.length ? `אובייקטים שהוזכרו: ${list(allConcepts)}.` : "",
  ].filter(Boolean).join(" ");

  return { steps, summary, quiz: buildQuiz(steps, nameOf) };
}

/**
 * Questions answerable from the diagram alone, so every answer is verifiable.
 *
 * Distractors are drawn from OTHER real nodes rather than invented, so a wrong
 * answer is still a plausible step from the same process — which is what makes
 * the question worth asking.
 */
function buildQuiz(steps: LessonStep[], nameOf: (id: string) => string): QuizQuestion[] {
  const qs: QuizQuestion[] = [];
  const labels = steps.map((s) => s.node.label);

  const distractors = (correct: string, n = 3) =>
    labels.filter((l) => l !== correct).slice(0, n);

  // 1. Where does it start?
  const start = steps.find((s) => s.kind === "start");
  if (start && labels.length > 2) {
    const choices = [start.node.label, ...distractors(start.node.label, 2)];
    qs.push({
      id: "start",
      prompt: "באיזה שלב מתחיל התהליך?",
      choices,
      answer: 0,
      because: "זה השלב היחיד שאין אליו חץ נכנס.",
    });
  }

  // 2. What follows a specific step?
  const linear = steps.find((s) => s.outgoing.length === 1 && s.kind !== "start");
  if (linear && labels.length > 3) {
    const correct = nameOf(linear.outgoing[0].id);
    const choices = [correct, ...distractors(correct, 2)];
    qs.push({
      id: "next",
      prompt: `מה מגיע אחרי "${linear.node.label}"?`,
      choices,
      answer: 0,
      because: `בתרשים יש חץ מ"${linear.node.label}" אל "${correct}".`,
    });
  }

  // 3. Which step is the decision?
  const decision = steps.find((s) => s.kind === "decision");
  if (decision && labels.length > 2) {
    const choices = [decision.node.label, ...distractors(decision.node.label, 2)];
    qs.push({
      id: "decision",
      prompt: "באיזה שלב התהליך מתפצל לפי תנאי?",
      choices,
      answer: 0,
      because: "זה הצומת היחיד בצורת מעוין, ויוצאים ממנו כמה מסלולים.",
    });
  }

  // 4. Where does a labelled branch lead?
  const branch = steps.find((s) => s.outgoing.length > 1 && s.outgoing.every((o) => o.label));
  if (branch) {
    const pick = branch.outgoing[0];
    const correct = nameOf(pick.id);
    const others = branch.outgoing.slice(1).map((o) => nameOf(o.id));
    const choices = [correct, ...others, ...distractors(correct, 1)].slice(0, 4);
    qs.push({
      id: "branch",
      prompt: `ב"${branch.node.label}", לאן ממשיכים כאשר התשובה היא "${pick.label}"?`,
      choices,
      answer: 0,
      because: `החץ שמסומן "${pick.label}" מוביל אל "${correct}".`,
    });
  }

  // Rotate the correct answer off index 0 deterministically, so the position
  // itself never becomes the tell. Seeded by question index, not randomness —
  // a lesson must render the same way twice.
  return qs.map((q, i) => {
    const shift = i % q.choices.length;
    const choices = [...q.choices.slice(shift), ...q.choices.slice(0, shift)];
    return { ...q, choices, answer: choices.indexOf(q.choices[q.answer]) };
  });
}

/* ------------------------------------------------------- completed sessions */

const DONE_KEY = "neo:learned";
const MAX_DONE = 60;

/** A stable id for a diagram, so completion survives a re-render. */
export function lessonId(d: Diagram): string {
  const shape = d.nodes.map((n) => n.id).sort().join(",") + "|" + d.edges.length;
  let h = 0;
  for (let i = 0; i < shape.length; i++) h = (h * 31 + shape.charCodeAt(i)) | 0;
  return `l${(h >>> 0).toString(36)}`;
}

export function loadCompleted(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(DONE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : [];
  } catch { return []; }
}

export function markCompleted(id: string): string[] {
  if (typeof window === "undefined") return [];
  // Ids only — no question text, no answers, nothing about the content studied.
  const next = [id, ...loadCompleted().filter((x) => x !== id)].slice(0, MAX_DONE);
  try { window.localStorage.setItem(DONE_KEY, JSON.stringify(next)); } catch { /* full or blocked */ }
  return next;
}
