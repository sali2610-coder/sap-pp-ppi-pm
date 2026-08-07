/**
 * Decides whether a question wants a picture, and what kind of picture.
 *
 * The user should never have to name a diagram technology. They ask "what is the
 * lifecycle of a maintenance order" and get a flow; they ask "how do these
 * tables relate" and get a relationship graph. This module turns the question
 * into a routing task the backend already understands (config/routing.json has
 * eleven `capability: visual` profiles that nothing was selecting until now).
 *
 * Five renderers, chosen by shape rather than by request:
 *   graph     — process flows, decision trees, lifecycles, entity relationships,
 *               org charts, mind maps, architecture, state machines. All of these
 *               are directed graphs, so one renderer serves them all.
 *   timeline  — has a TIME axis a graph cannot express.
 *   gantt     — a timeline with DURATION, so overlap is expressible.
 *   swimlane  — has an OWNER axis a graph cannot express.
 *   sequence  — actors across the top, time down, each message an ordered
 *               exchange between two lifelines.
 *
 * Anything that fits none of the five is reported honestly rather than
 * approximated with a shape that would misstate it.
 */

/** Task profiles that exist in the backend routing config. */
export type DiagramTask =
  | "PROCESS_FLOW" | "DECISION_TREE" | "ARCHITECTURE" | "DIAGRAM";

export interface DiagramIntent {
  /** The user asked for a picture in so many words — not merely implied it. */
  explicit: boolean;
  /** Routing profile to request. */
  task: DiagramTask;
  /** What we think they want, for the prompt hint and for honest messaging. */
  kind: string;
  /** True when the shape is not a graph, so our renderer cannot draw it. */
  unsupported: boolean;
}

/** Words that mean "draw me something", in both languages the product uses. */
const EXPLICIT = [
  "תרשים", "דיאגרמה", "תרשים זרימה", "שרטט", "צייר", "ויזואלי", "ויזואלית",
  "המחש", "מפת", "מפה של", "גרף",
  "diagram", "flowchart", "flow chart", "chart", "graph", "visual",
  "visualise", "visualize", "draw", "sketch", "map of",
];

/**
 * Shapes we can draw. Order matters: the first match wins, so the more specific
 * intent is listed before the general one.
 */
const GRAPH_KINDS: {
  kind: string; task: DiagramTask; hit: string[];
  /** Both lists must hit. For signals that are only meaningful together. */
  pair?: [string[], string[]];
}[] = [
  {
    kind: "decision tree", task: "DECISION_TREE",
    hit: ["עץ החלטה", "החלטה", "מתי להשתמש", "באילו מקרים", "אם ואז",
          "decision tree", "decision", "when to use", "which one should"],
  },
  {
    kind: "entity relationship", task: "DIAGRAM",
    hit: ["מודל נתונים", "מבנה טבלאות", "erd", "entity relationship",
          "data model", "table relations", "schema"],
    // "קשור" on its own is ordinary Hebrew ("how is this related to that"), so
    // it only means a relationship diagram next to a table/entity word.
    pair: [
      ["טבלה", "טבלאות", "ישות", "ישויות", "table", "tables", "entity", "entities"],
      ["קשר", "קשרים", "קשור", "קשורות", "קשורים", "יחס", "יחסים", "מקושר",
       "relate", "related", "relationship", "join", "foreign key"],
    ],
  },
  {
    kind: "architecture", task: "ARCHITECTURE",
    hit: ["ארכיטקטורה", "מבנה מערכת", "אינטגרציה", "רכיבי המערכת", "נוף מערכות",
          "architecture", "system landscape", "integration", "components",
          "data flow", "זרימת נתונים"],
  },
  {
    kind: "state machine", task: "DIAGRAM",
    hit: ["סטטוסים", "מצבים", "מעברי סטטוס", "status flow", "state machine",
          "statuses", "state transitions"],
  },
  {
    kind: "hierarchy", task: "DIAGRAM",
    hit: ["היררכיה", "מבנה ארגוני", "מפת חשיבה", "עץ",
          "hierarchy", "org chart", "mind map", "breakdown", "tree of"],
  },
  {
    // The default and by far the most common: a sequence of steps.
    kind: "process flow", task: "PROCESS_FLOW",
    hit: ["תהליך", "זרימה", "מחזור חיים", "שלבים", "רצף", "איך עובד", "מסלול",
          "process", "flow", "lifecycle", "life cycle", "steps", "sequence of",
          "end to end", "how does it work", "workflow"],
  },
];

/**
 * Shapes that are not graphs. A timeline has a time axis and a swimlane has an
 * owner axis; neither survives being drawn as a flowchart, so both have their
 * own parser and layout (lib/ai/timeline.ts), as do a Gantt chart (durations,
 * so bars can overlap) and a sequence diagram (actors across, time down).
 */
const NOT_A_GRAPH: { kind: string; hit: string[]; supported?: boolean }[] = [
  // Gantt before timeline: a plan with durations is a Gantt, and "לוח זמנים"
  // alone would otherwise capture it as a plain timeline and lose the overlap.
  { kind: "gantt", supported: true,
    hit: ["גאנט", "gantt", "תוכנית עבודה", "משך המשימות", "לוח זמנים לפרויקט",
          "project plan", "work plan", "task durations", "how long will each"] },
  { kind: "timeline", supported: true,
    hit: ["ציר זמן", "לוח זמנים", "מפת דרכים", "timeline", "roadmap", "schedule", "phases over time"] },
  { kind: "swimlane", supported: true,
    hit: ["מסלולי אחריות", "מי אחראי", "חלוקת אחריות", "swimlane", "swim lane", "raci", "by role", "who does what"] },
  { kind: "sequence diagram", supported: true,
    hit: ["דיאגרמת רצף", "sequence diagram", "uml sequence", "message flow",
          "חילופי הודעות", "תקשורת בין מערכות", "interface flow"] },
];

/**
 * Hebrew glues the definite article onto the word, so a literal "מחזור חיים"
 * never matches the way people actually write it — "מחזור החיים". Matching each
 * phrase with an optional ה before every word after the first covers that
 * without needing a stemmer or a second copy of every phrase.
 */
const rx = new Map<string, RegExp>();
function phraseRe(w: string): RegExp {
  let r = rx.get(w);
  if (!r) {
    const esc = w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    r = new RegExp(esc.split(/\s+/).map((p, i) => (i ? "ה?" + p : p)).join("\\s+"), "i");
    rx.set(w, r);
  }
  return r;
}

const hasAny = (q: string, words: string[]) => words.some((w) => phraseRe(w).test(q));

/** Both halves must appear — used where one word alone is too weak a signal. */
const hasPair = (q: string, a: string[], b: string[]) => hasAny(q, a) && hasAny(q, b);

/**
 * @returns the intent, or null when the question does not want a picture.
 *
 * A false positive is expensive here — routing a plain question to a visual
 * profile would change the answer for no reason — so the bar is a real signal:
 * either an explicit "draw me" word, or clear process/relationship language.
 */
export function detectDiagramIntent(question: string): DiagramIntent | null {
  const q = question.toLowerCase().trim();
  if (!q) return null;

  const explicit = hasAny(q, EXPLICIT);

  // Asked for a picture we cannot draw. Only meaningful when they asked
  // explicitly — "roadmap" inside a normal sentence is not a chart request.
  if (explicit) {
    for (const s of NOT_A_GRAPH) {
      if (hasAny(q, s.hit)) {
        return { explicit, task: "DIAGRAM", kind: s.kind, unsupported: !s.supported };
      }
    }
  }

  for (const g of GRAPH_KINDS) {
    const hit = hasAny(q, g.hit) || (g.pair ? hasPair(q, g.pair[0], g.pair[1]) : false);
    if (hit) return { explicit, task: g.task, kind: g.kind, unsupported: false };
  }

  // "Draw me X" with no clue what X is shaped like: a flow is the safe default.
  if (explicit) return { explicit, task: "PROCESS_FLOW", kind: "process flow", unsupported: false };

  return null;
}

/** True when the model's answer actually contains something we can draw. */
export function answerHasDiagram(text: string): boolean {
  return /```\s*(mermaid|flowchart|graph|diagram|process|timeline|swimlane|sequence|gantt)\b/i.test(text)
    || /^\s*(flowchart|graph)\s+(TB|TD|LR|RL|BT)\b/im.test(text)
    || /^\s*(timeline|swimlane|sequence(diagram)?|gantt)\b/im.test(text);
}
