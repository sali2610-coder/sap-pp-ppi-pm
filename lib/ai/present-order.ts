/**
 * Step ordering for presentation mode. Pure, and in its own module so it can be
 * tested without a DOM — Node's type-stripping runner cannot parse JSX, and
 * logic this easy to get subtly wrong should not be reachable only through a
 * component.
 */
import type { Diagram, DiagramNode } from "./diagram";

export interface PresentStep {
  node: DiagramNode;
  /** Ids reached from this node, for the "next" hint. */
  next: string[];
  /** Ids that reach this node. */
  prev: string[];
}

/**
 * Orders nodes for presentation: start terminals first, then breadth-first
 * along the edges. Layout order is not reading order — dagre may place a late
 * branch high on the canvas — and presenting in layout order tells the story
 * out of sequence.
 */
export function presentationOrder(d: Diagram): PresentStep[] {
  const out = new Map<string, { next: string[]; prev: string[] }>();
  for (const n of d.nodes) out.set(n.id, { next: [], prev: [] });
  for (const e of d.edges) {
    out.get(e.from)?.next.push(e.to);
    out.get(e.to)?.prev.push(e.from);
  }

  const starts = d.nodes.filter((n) => (out.get(n.id)?.prev.length ?? 0) === 0);
  const seeds = starts.length ? starts : d.nodes.slice(0, 1);

  const seen = new Set<string>();
  const order: DiagramNode[] = [];
  const queue = [...seeds];
  while (queue.length) {
    const n = queue.shift()!;
    if (seen.has(n.id)) continue;
    seen.add(n.id);
    order.push(n);
    for (const id of out.get(n.id)?.next ?? []) {
      const nx = d.nodes.find((x) => x.id === id);
      if (nx && !seen.has(id)) queue.push(nx);
    }
  }
  // A node in no traversable path still belongs in the deck.
  for (const n of d.nodes) if (!seen.has(n.id)) order.push(n);

  return order.map((node) => ({
    node,
    next: out.get(node.id)?.next ?? [],
    prev: out.get(node.id)?.prev ?? [],
  }));
}
