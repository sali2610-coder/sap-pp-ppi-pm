/**
 * Turns the diagram syntax an LLM naturally writes into a graph we can lay out.
 *
 * Deliberately NOT a Mermaid implementation. Mermaid is ~500KB and this site is
 * a 100%-offline static export, so shipping it to render the occasional
 * flowchart is the wrong trade. Instead we accept the small, predictable subset
 * models actually emit for `flowchart` / `graph` and hand it to dagre, which is
 * already a dependency and does the hard part (layered layout).
 *
 * Anything we cannot parse is reported, never silently dropped — the caller
 * falls back to showing the source rather than an empty box.
 */

export type NodeShape = "process" | "decision" | "terminal" | "data" | "note";

export interface DiagramNode {
  id: string;
  label: string;
  shape: NodeShape;
  /**
   * The passage this step came from, as the model tagged it: `%% src=book1#3#3.2`.
   *
   * Real provenance, not inference. It is NOT derived from the SAP object names
   * in the label — a node mentioning IW31 tells you nothing about which book
   * paragraph produced it. The caller must still validate the id against the
   * passages that were actually served; an unvalidated tag is a claim, not a
   * source.
   */
  src?: string;
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
}

export interface Diagram {
  direction: "TB" | "LR";
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

/** Fence languages we treat as a diagram rather than as code. */
export const DIAGRAM_LANGS = new Set([
  "mermaid", "flowchart", "graph", "diagram", "process", "sequence", "bpmn",
]);

/**
 * Shape is inferred from the bracket style the model used, matching Mermaid's
 * conventions so a model that knows Mermaid produces the right thing by default:
 *   [A]  process     (A)  terminal / rounded
 *   {A}  decision    [(A)] data / store    >A]  note
 */
// Alternation order is load-bearing: the LONGEST opener must be tried first.
// With `\(` ahead of `\(\[`, a stadium node `A([start])` matched the bare `(`
// and captured "[start" — every terminal node carried a stray bracket in its
// label, on screen and in exports, and no test looked at the label text.
const NODE_RE = /([A-Za-z0-9_֐-׿]+)\s*(\[\(|\(\[|\(\(|\[|\(|\{|>)([^\]\)\}]*?)(\)\]|\]\)|\)\)|\]|\)|\}|\])/;

function shapeFor(open: string): NodeShape {
  if (open === "{") return "decision";
  if (open === "((" || open === "([" || open === "(") return "terminal";
  if (open === "[(") return "data";
  if (open === ">") return "note";
  return "process";
}

const clean = (s: string) => s.trim().replace(/^["']|["']$/g, "").trim();

/**
 * @returns the parsed diagram, or null when the source is not a graph we
 *          understand. Never throws — a malformed diagram must not take a page
 *          down, which is exactly the failure mode this product already had.
 */
export function parseDiagram(src: string): Diagram | null {
  const lines = src.split("\n").map((l) => l.trim()).filter(Boolean);
  if (!lines.length) return null;

  let direction: Diagram["direction"] = "TB";
  const nodes = new Map<string, DiagramNode>();
  const edges: DiagramEdge[] = [];

  const ensure = (id: string, label?: string, shape: NodeShape = "process") => {
    const existing = nodes.get(id);
    if (existing) {
      if (label && existing.label === existing.id) { existing.label = label; existing.shape = shape; }
      return existing;
    }
    const n: DiagramNode = { id, label: label ?? id, shape };
    nodes.set(id, n);
    return n;
  };

  for (const raw of lines) {
    // A per-node source tag. Pulled off first so it cannot confuse the shape
    // and edge parsing below, which never expected a trailing comment.
    let srcTag: string | undefined;
    const tagged = raw.replace(/\s*%%\s*src\s*=\s*([^\s%]+)\s*$/i, (_m, id) => {
      srcTag = String(id).trim();
      return "";
    });
    const line = tagged;

    // header: `flowchart TD` / `graph LR`
    const head = line.match(/^(?:flowchart|graph)\s+(TB|TD|LR|RL|BT)\b/i);
    if (head) {
      const d = head[1].toUpperCase();
      direction = d === "LR" || d === "RL" ? "LR" : "TB";
      continue;
    }
    if (/^(subgraph|end|classDef|class|style|linkStyle|%%)/i.test(line) || !line.trim()) continue;

    // One or more edges on a line, optionally labelled:
    //   A --> B          A -->|yes| B          A --> B --> C
    // Chains matter: models routinely write a whole happy path on one line, and
    // splitting only at the first arrow silently collapsed it to two nodes.
    const ARROW = /\s*(-{2,3}>|-{3}|-\.->|={2,}>)\s*(?:\|([^|]*)\|)?\s*/g;
    const parseSide = (side: string) => {
      const m = side.match(NODE_RE);
      if (m) return ensure(m[1], clean(m[3]) || m[1], shapeFor(m[2]));
      const id = clean(side);
      return id ? ensure(id) : null;
    };

    ARROW.lastIndex = 0;
    if (ARROW.test(line)) {
      ARROW.lastIndex = 0;
      const segments: string[] = [];
      const arrows: { arrow: string; label?: string }[] = [];
      let cursor = 0;
      let m: RegExpExecArray | null;
      while ((m = ARROW.exec(line)) !== null) {
        segments.push(line.slice(cursor, m.index));
        arrows.push({ arrow: m[1], label: m[2] });
        cursor = m.index + m[0].length;
      }
      segments.push(line.slice(cursor));

      let prev = parseSide(segments[0]);
      for (let k = 1; k < segments.length; k++) {
        const next = parseSide(segments[k]);
        if (prev && next) {
          const a = arrows[k - 1];
          edges.push({ from: prev.id, to: next.id, label: a.label ? clean(a.label) : undefined, dashed: a.arrow.includes(".") });
        }
        if (next) prev = next;
      }
      // On an edge line the tag describes the step just introduced, which is
      // the node on the right-hand end.
      if (srcTag && prev) prev.src = srcTag;
      continue;
    }

    // A bare node declaration on its own line
    const solo = line.match(NODE_RE);
    if (solo) {
      const n = ensure(solo[1], clean(solo[3]) || solo[1], shapeFor(solo[2]));
      if (srcTag) n.src = srcTag;
    }
  }

  if (nodes.size < 2 || !edges.length) return null;

  // A node with no incoming edge is a start, none outgoing is an end. Promote
  // those to terminals unless the author already chose a shape.
  const hasIn = new Set(edges.map((e) => e.to));
  const hasOut = new Set(edges.map((e) => e.from));
  for (const n of nodes.values()) {
    if (n.shape === "process" && (!hasIn.has(n.id) || !hasOut.has(n.id))) n.shape = "terminal";
  }

  return { direction, nodes: [...nodes.values()], edges };
}

/** True when a fence should be rendered as a diagram rather than as code. */
export function isDiagramFence(text: string, lang?: string): boolean {
  if (lang && DIAGRAM_LANGS.has(lang.toLowerCase())) return true;
  return /^\s*(flowchart|graph)\s+(TB|TD|LR|RL|BT)\b/im.test(text);
}
