/**
 * Timelines and swimlanes — the two shapes a directed graph cannot honestly draw.
 *
 * A flowchart says "this step follows that one". A timeline says "this happened
 * in Q2" and a swimlane says "Planning owns this step, Production owns the next".
 * Both carry an axis the graph renderer has no way to express, so forcing them
 * through dagre would produce something that looks authoritative and is wrong.
 * They get their own parsers and their own layouts.
 *
 * Syntax follows Mermaid's, so a model that knows Mermaid emits the right thing
 * without extra instruction:
 *
 *   timeline
 *     title מחזור הטמעה
 *     Q1 : גילוי : ניתוח פערים
 *     Q2 : עיצוב
 *
 *   swimlane
 *     lane תכנון
 *       A[יצירת הזמנה] --> B[שחרור]
 *     lane ייצור
 *       B --> C[דיווח]
 */

export interface TimelineEvent {
  period: string;
  items: string[];
}

export interface Timeline {
  kind: "timeline";
  title?: string;
  events: TimelineEvent[];
}

export type StepShape = "task" | "event" | "gateway";

export interface SwimlaneStep {
  id: string;
  label: string;
  lane: string;
  /**
   * BPMN shape vocabulary. A swimlane written as `bpmn` distinguishes an event
   * (circle) from a gateway (diamond) from a task (rounded box); a plain
   * swimlane is all tasks. This is the practical subset of BPMN that appears in
   * SAP process documentation — pools, message flows and typed intermediate
   * events are deliberately NOT claimed.
   */
  shape: StepShape;
}

export interface Swimlane {
  kind: "swimlane";
  title?: string;
  lanes: string[];
  steps: SwimlaneStep[];
  edges: { from: string; to: string; label?: string }[];
}

const clean = (s: string) => s.trim().replace(/^["']|["']$/g, "").trim();

/**
 * @returns the timeline, or null when the source is not one. Never throws — a
 *          malformed diagram must degrade to source, not take the page down.
 */
export function parseTimeline(src: string): Timeline | null {
  const lines = src.split("\n").map((l) => l.trim()).filter(Boolean);
  if (!lines.length || !/^timeline\b/i.test(lines[0])) return null;

  let title: string | undefined;
  const events: TimelineEvent[] = [];

  for (const raw of lines.slice(1)) {
    const t = raw.match(/^title\s+(.+)$/i);
    if (t) { title = clean(t[1]); continue; }

    // `period : item : item`
    const parts = raw.split(":").map(clean).filter(Boolean);
    if (parts.length < 1) continue;
    if (parts.length === 1) {
      // A bare line is a period with no detail yet, or an item for the last one.
      if (events.length && /^[-*•]/.test(raw)) {
        events[events.length - 1].items.push(clean(raw.replace(/^[-*•]\s*/, "")));
      } else events.push({ period: parts[0], items: [] });
      continue;
    }
    events.push({ period: parts[0], items: parts.slice(1) });
  }

  return events.length >= 2 ? { kind: "timeline", title, events } : null;
}

const ARROW = /\s*(-{2,3}>|={2,}>)\s*(?:\|([^|]*)\|)?\s*/g;
const NODE = /^([A-Za-z0-9_֐-׿]+)\s*(?:\[([^\]]*)\]|\(([^)]*)\)|\{([^}]*)\})?/;

/**
 * @returns the swimlane, or null. Steps inherit the lane they are declared
 *          under; an edge may cross lanes, which is the entire point of the
 *          shape — a handoff between owners.
 */
export function parseSwimlane(src: string): Swimlane | null {
  const lines = src.split("\n").map((l) => l.trim()).filter(Boolean);
  // `bpmn` is the same structure with the shape vocabulary switched on.
  if (!lines.length || !/^(swimlane|bpmn)\b/i.test(lines[0])) return null;

  let title: string | undefined;
  const lanes: string[] = [];
  const steps = new Map<string, SwimlaneStep>();
  const edges: Swimlane["edges"] = [];
  let lane = "";

  const ensure = (id: string, label?: string, shape: StepShape = "task") => {
    const cur = steps.get(id);
    if (cur) {
      if (label && cur.label === cur.id) { cur.label = label; cur.shape = shape; }
      return cur;
    }
    const s: SwimlaneStep = { id, label: label ?? id, lane: lane || "—", shape };
    steps.set(id, s);
    return s;
  };

  for (const raw of lines.slice(1)) {
    const t = raw.match(/^title\s+(.+)$/i);
    if (t) { title = clean(t[1]); continue; }

    const l = raw.match(/^lane\s+(.+)$/i);
    if (l) {
      lane = clean(l[1]);
      if (lane && !lanes.includes(lane)) lanes.push(lane);
      continue;
    }

    const side = (chunk: string) => {
      const m = chunk.trim().match(NODE);
      if (!m) return null;
      const label = clean(m[2] ?? m[3] ?? m[4] ?? "") || m[1];
      // m[2]=[] task, m[3]=() event, m[4]={} gateway
      const shape: StepShape = m[4] != null ? "gateway" : m[3] != null ? "event" : "task";
      return ensure(m[1], label, shape);
    };

    ARROW.lastIndex = 0;
    if (ARROW.test(raw)) {
      ARROW.lastIndex = 0;
      const segs: string[] = [];
      const arr: (string | undefined)[] = [];
      let cursor = 0;
      let m: RegExpExecArray | null;
      while ((m = ARROW.exec(raw)) !== null) {
        segs.push(raw.slice(cursor, m.index));
        arr.push(m[2]);
        cursor = m.index + m[0].length;
      }
      segs.push(raw.slice(cursor));

      let prev = side(segs[0]);
      for (let k = 1; k < segs.length; k++) {
        const next = side(segs[k]);
        if (prev && next) edges.push({ from: prev.id, to: next.id, label: arr[k - 1] ? clean(arr[k - 1]!) : undefined });
        if (next) prev = next;
      }
      continue;
    }

    const solo = raw.match(NODE);
    if (solo && solo[1]) {
      const shape: StepShape = solo[4] != null ? "gateway" : solo[3] != null ? "event" : "task";
      ensure(solo[1], clean(solo[2] ?? solo[3] ?? solo[4] ?? "") || solo[1], shape);
    }
  }

  if (!lanes.length || steps.size < 2) return null;
  return { kind: "swimlane", title, lanes, steps: [...steps.values()], edges };
}

/** Fence languages that mean "not a graph". */
export const AXIS_LANGS = new Set(["timeline", "swimlane", "bpmn", "gantt", "roadmap", "sequence", "sequencediagram"]);

export function isAxisFence(text: string, lang?: string): boolean {
  if (lang && AXIS_LANGS.has(lang.toLowerCase())) return true;
  return /^\s*(timeline|swimlane|bpmn|sequence(diagram)?|gantt)\b/im.test(text);
}

/* -------------------------------------------------------------- sequence */

export interface SequenceMessage {
  from: string;
  to: string;
  text: string;
  /** A reply, drawn dashed — Mermaid's `-->>` versus `->>`. */
  dashed?: boolean;
}

export interface Sequence {
  kind: "sequence";
  title?: string;
  /** Stable ids, in first-seen order. */
  actors: string[];
  /** id → display name, when `participant X as Name` gave one. */
  labels: Record<string, string>;
  messages: SequenceMessage[];
}

/**
 * A sequence diagram has a THIRD axis the other two lack: actors across the top
 * and time running down, with each message an ordered exchange between two
 * lifelines. A swimlane groups steps by owner but says nothing about ordering
 * between lanes; a flowchart orders steps but has no lifelines. Neither can
 * stand in for this, which is why it gets its own shape.
 *
 *   sequenceDiagram
 *     participant Zetes
 *     Zetes ->> SAP: IDoc
 *     SAP -->> Zetes: ACK
 *
 * @returns the sequence, or null. Never throws.
 */
export function parseSequence(src: string): Sequence | null {
  const lines = src.split("\n").map((l) => l.trim()).filter(Boolean);
  if (!lines.length || !/^sequence(diagram)?\b/i.test(lines[0])) return null;

  let title: string | undefined;
  const actors: string[] = [];
  const labels: Record<string, string> = {};
  const messages: SequenceMessage[] = [];
  const seeActor = (a: string) => { if (a && !actors.includes(a)) actors.push(a); return a; };

  for (const raw of lines.slice(1)) {
    const t = raw.match(/^title\s+(.+)$/i);
    if (t) { title = clean(t[1]); continue; }

    const p = raw.match(/^(?:participant|actor)\s+(.+)$/i);
    if (p) {
      // `participant PP as תכנון ייצור` declares ONE participant with a display
      // name. Registering the display name as the actor left the messages
      // referring to `PP`, which then registered again — one participant, two
      // lifelines. The id is the identity; the alias is only how it is drawn.
      const [id, ...rest] = clean(p[1]).split(/\s+as\s+/i);
      const key = clean(id);
      seeActor(key);
      if (rest.length) labels[key] = clean(rest.join(" as "));
      continue;
    }

    // `A ->> B: text`  /  `A -->> B: text`  /  `A -> B: text`
    const m = raw.match(/^(.+?)\s*(-{1,2}>>?)\s*(.+?)\s*:\s*(.*)$/);
    if (!m) continue;
    const from = seeActor(clean(m[1]));
    const to = seeActor(clean(m[3]));
    if (!from || !to) continue;
    messages.push({ from, to, text: clean(m[4]), dashed: m[2].startsWith("--") });
  }

  return actors.length >= 2 && messages.length ? { kind: "sequence", title, actors, labels, messages } : null;
}

/* ------------------------------------------------------------------ gantt */

export interface GanttTask {
  name: string;
  section: string;
  /** Days from the chart's start. */
  offset: number;
  /** Length in days. Always >= 1 so a milestone still has a hit area. */
  days: number;
  milestone?: boolean;
}

export interface Gantt {
  kind: "gantt";
  title?: string;
  sections: string[];
  tasks: GanttTask[];
  /** Total span in days. */
  span: number;
  /** ISO date the chart starts on, when the source used real dates. */
  startISO?: string;
}

/** Days between two ISO dates. Returns null when either is unparseable. */
function daysBetween(a: string, b: string): number | null {
  const t1 = Date.parse(a), t2 = Date.parse(b);
  if (Number.isNaN(t1) || Number.isNaN(t2)) return null;
  return Math.round((t2 - t1) / 86_400_000);
}

const DUR = /^(\d+(?:\.\d+)?)\s*(d|days?|w|weeks?|m|months?|y|years?|יום|ימים|שבוע|שבועות|חודש|חודשים)$/i;

/** Duration token to days. SAP plans are quoted in weeks and months as often as days. */
function toDays(tok: string): number | null {
  const m = tok.trim().match(DUR);
  if (!m) return null;
  const n = Number(m[1]);
  const u = m[2].toLowerCase();
  if (/^(w|weeks?|שבוע|שבועות)$/.test(u)) return n * 7;
  if (/^(m|months?|חודש|חודשים)$/.test(u)) return Math.round(n * 30.44);
  if (/^(y|years?)$/.test(u)) return Math.round(n * 365);
  return n;
}

/**
 * A Gantt is a timeline with DURATION. A timeline says "this happened in Q2";
 * a Gantt says "this ran for six weeks and overlapped that". Neither the
 * timeline renderer nor the graph renderer can express an overlap, which is the
 * whole reason a plan is drawn this way.
 *
 * Accepts the Mermaid shape people actually write:
 *
 *   gantt
 *     title מפת דרכים
 *     section גילוי
 *       ניתוח פערים : 2026-01-01, 30d
 *       סדנאות      : 4w
 *     section עיצוב
 *       עיצוב תהליכים : 2026-03-01, 2026-04-15
 *
 * A task with no start follows the previous one, which is how a plan is
 * normally dictated.
 *
 * @returns the chart, or null. Never throws.
 */
export function parseGantt(src: string): Gantt | null {
  const lines = src.split("\n").map((l) => l.trim()).filter(Boolean);
  if (!lines.length || !/^gantt\b/i.test(lines[0])) return null;

  let title: string | undefined;
  let startISO: string | undefined;
  const sections: string[] = [];
  const tasks: GanttTask[] = [];
  let section = "";
  let cursor = 0;                       // days consumed so far

  for (const raw of lines.slice(1)) {
    const t = raw.match(/^title\s+(.+)$/i);
    if (t) { title = clean(t[1]); continue; }
    if (/^(dateFormat|axisFormat|excludes|todayMarker)\b/i.test(raw)) continue;

    const sec = raw.match(/^section\s+(.+)$/i);
    if (sec) {
      section = clean(sec[1]);
      if (section && !sections.includes(section)) sections.push(section);
      continue;
    }

    const idx = raw.indexOf(":");
    if (idx === -1) continue;
    const name = clean(raw.slice(0, idx));
    if (!name) continue;
    const args = raw.slice(idx + 1).split(",").map(clean).filter(Boolean);
    if (!args.length) continue;

    // Mermaid allows a leading task id (`a1, 2026-01-01, 30d`). Drop a token
    // that is neither a date nor a duration and is not the only argument.
    const parts = args.filter((a, i) =>
      i === args.length - 1 || !Number.isNaN(Date.parse(a)) || toDays(a) !== null || args.length <= 1);

    let offset = cursor;
    let days: number | null = null;

    const first = parts[0];
    const firstIsDate = first && !Number.isNaN(Date.parse(first));
    if (firstIsDate) {
      if (!startISO) startISO = first;
      offset = daysBetween(startISO, first) ?? cursor;
      const second = parts[1];
      if (second) {
        days = toDays(second);
        if (days === null && !Number.isNaN(Date.parse(second))) days = daysBetween(first, second);
      }
    } else {
      days = toDays(first);
      const second = parts[1];
      if (days === null && second) days = toDays(second);
    }

    const milestone = days === 0;
    const length = Math.max(1, days ?? 1);
    tasks.push({ name, section: section || "—", offset: Math.max(0, offset), days: length, milestone });
    if (!sections.includes(section || "—")) sections.push(section || "—");
    cursor = Math.max(0, offset) + length;
  }

  if (tasks.length < 2) return null;
  const span = Math.max(...tasks.map((t) => t.offset + t.days), 1);
  return { kind: "gantt", title, sections, tasks, span, startISO };
}
