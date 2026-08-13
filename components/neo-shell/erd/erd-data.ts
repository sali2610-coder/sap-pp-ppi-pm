// Project NEO · Stage 2B — the ERD workspace payload.
//
// SERVER ONLY, build time. The browser never sees data/sapData: it receives the
// small plain object below, with the layout ALREADY SOLVED. dagre runs here, at
// build time, exactly as it already does for the Architecture Studio — no
// layout engine ships to the client and the picture is byte-identical on every
// machine.
//
// Keys are one and two characters because 105 nodes and 106 edges, with every
// verbatim JOIN, are serialised into the static HTML of this route.

import { erdLayout, modelStats, moduleRows, nodes, ZONE_HE } from "./model";
import type { ModuleKey } from "../types";

/** Membership band — the same three-way split the Home field uses.
 *  0 = PM only · 1 = documented by BOTH blueprints · 2 = PP-PI only. */
export type Band = 0 | 1 | 2;

export interface ErdPayloadNode {
  n: string;
  he: string;
  /** Membership band. */
  b: Band;
  /** Modules, in dictionary order. */
  m: ModuleKey[];
  /** var(--obj-*) — object class. */
  o: string;
  /** Object-class label, Hebrew. */
  z: string;
  x: number;
  y: number;
  w: number;
  h: number;
  /** Documented fields. */
  f: number;
  pk: string[];
  fk: string[];
  /** Modelled degree. */
  d: number;
  /** Distinct transactions the dictionary maps onto the table. */
  tc: string[];
  /** Topic per dictionary row — a shared table has more than one. */
  tp: { m: ModuleKey; t: string }[];
}

export interface ErdPayloadEdge {
  i: string;
  /** Parent — holds the primary key. */
  p: string;
  /** Child — holds the foreign key. */
  c: string;
  /** "1-1" | "n-1" | "unstated". */
  k: string;
  /** Verbatim cardinality, "" when the blueprint left it blank. */
  cd: string;
  /** 1 when the opposite direction is ALSO recorded — the blueprints disagree
   *  about which side holds the primary key. Both halves are kept. */
  ct: 0 | 1;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  cx: number;
  cy: number;
  /** Every blueprint statement of this edge, verbatim. */
  j: { m: ModuleKey; j: string; d: string; pk: string; fk: string }[];
}

export interface ErdPayload {
  w: number;
  h: number;
  nodes: ErdPayloadNode[];
  edges: ErdPayloadEdge[];
  stats: {
    tables: number;
    rows: number;
    shared: number;
    edges: number;
    stated: number;
    unstated: number;
    isolated: number;
    /** Pairs of tables the two blueprints record in OPPOSITE directions. */
    contested: number;
    pm: number;
    pppi: number;
  };
}

let cached: ErdPayload | null = null;

export function erdPayload(): ErdPayload {
  if (cached) return cached;
  const l = erdLayout();
  const st = modelStats();
  const ns = nodes();

  const payloadNodes: ErdPayloadNode[] = l.nodes
    .map((n) => {
      const rows = moduleRows(n.n);
      const band: Band = n.mods.length > 1 ? 1 : n.mods[0] === "PM" ? 0 : 2;
      return {
        n: n.n,
        he: n.he,
        b: band,
        m: n.mods,
        o: n.obj,
        z: ZONE_HE[n.zone],
        x: n.x,
        y: n.y,
        w: n.w,
        h: n.h,
        f: n.fields,
        pk: n.pk,
        fk: n.fk,
        d: n.deg,
        tc: [...new Set(rows.flatMap((r) => r.tcodes))],
        tp: rows.map((r) => ({ m: r.mod, t: r.topic })),
      };
    })
    // Draw order: the busiest tables last, so a hub is never covered by a leaf.
    .sort((a, b) => a.d - b.d || a.n.localeCompare(b.n));

  const payloadEdges: ErdPayloadEdge[] = l.edges.map((e) => ({
    i: e.id,
    p: e.parent,
    c: e.child,
    k: e.kind,
    cd: e.says.find((s) => s.card)?.card || "",
    ct: e.contested ? 1 : 0,
    x1: e.x1,
    y1: e.y1,
    x2: e.x2,
    y2: e.y2,
    cx: e.cx,
    cy: e.cy,
    j: e.says.map((s) => ({ m: s.mod, j: s.join, d: s.desc, pk: s.pk, fk: s.fk })),
  }));

  cached = {
    w: l.w,
    h: l.h,
    nodes: payloadNodes,
    edges: payloadEdges,
    stats: {
      ...st,
      pm: [...ns.values()].filter((n) => n.mods.includes("PM")).length,
      pppi: [...ns.values()].filter((n) => n.mods.includes("PP-PI")).length,
    },
  };
  return cached;
}
