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

export interface SwimlaneStep {
  id: string;
  label: string;
  lane: string;
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
  if (!lines.length || !/^swimlane\b/i.test(lines[0])) return null;

  let title: string | undefined;
  const lanes: string[] = [];
  const steps = new Map<string, SwimlaneStep>();
  const edges: Swimlane["edges"] = [];
  let lane = "";

  const ensure = (id: string, label?: string) => {
    const cur = steps.get(id);
    if (cur) {
      if (label && cur.label === cur.id) cur.label = label;
      return cur;
    }
    const s: SwimlaneStep = { id, label: label ?? id, lane: lane || "—" };
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
      return ensure(m[1], label);
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
    if (solo && solo[1]) ensure(solo[1], clean(solo[2] ?? solo[3] ?? solo[4] ?? "") || solo[1]);
  }

  if (!lanes.length || steps.size < 2) return null;
  return { kind: "swimlane", title, lanes, steps: [...steps.values()], edges };
}

/** Fence languages that mean "not a graph". */
export const AXIS_LANGS = new Set(["timeline", "swimlane", "gantt", "roadmap"]);

export function isAxisFence(text: string, lang?: string): boolean {
  if (lang && AXIS_LANGS.has(lang.toLowerCase())) return true;
  return /^\s*(timeline|swimlane)\b/im.test(text);
}
