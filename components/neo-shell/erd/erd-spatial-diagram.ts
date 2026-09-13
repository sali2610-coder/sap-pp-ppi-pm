import type { ErdCatalog, ErdTable, ModCode } from "./erd-types";
import type { SpatialView } from "./erd-spatial-model";

export const CARD = { w: 320, h: 112, openH: 342, gapX: 116, gapY: 32 };
export type DiagramView = SpatialView & { analysis?: "map" | "flow" | "impact" | "lineage" | "dep"; step?: number | null; group?: string | null; expanded?: boolean; crossModule?: boolean };
export const cardFields = (t: ErdTable) => [...t.f].sort((a,b) => Number(/PK/.test(b[3])) - Number(/PK/.test(a[3]))).slice(0,5);
export const s4Changed = (t: ErdTable) => t.s4v?.r === "high" || t.s4v?.r === "medium";
export const s4FieldChanged = (t: ErdTable, field: string) => s4Changed(t) && !!t.s4v?.fl.some((f) => f.toUpperCase().replace(`${t.n.toUpperCase()}.`, "") === field.toUpperCase());

// Object and topic membership is shared with 2D. A table can belong to more
// than one filter or business step.
export function groupsFor(data: ErdCatalog, code: ModCode | null) {
  const m = data.modules.find((m) => m.code === code);
  const known = new Set(data.tables.map((t) => t.n));
  const names = (items: string[]) => [...new Set(items.filter((n) => known.has(n) && m?.core.includes(n)))];
  return [
    ...(m?.objects || []).map((o,i) => ({id:`object:${i}`,he:o.he,names:names(o.t),kind:"object" as const})),
    ...(m?.topics || []).map((o,i) => ({id:`topic:${i}`,he:o.t,names:names(o.ta),kind:"topic" as const})),
  ].filter((g) => g.names.length);
}

// Same parent→child interpretation as graph.ts. Walk each direction separately:
// "both" must not silently turn into an undirected walk through sibling branches.
export function trace(data: ErdCatalog, selected: string, mode: "impact" | "lineage" | "dep") {
  const out = new Set([selected]);
  const walk = (reverse: boolean) => {
    const adj = new Map<string,string[]>();
    for (const e of data.edges) {
      const a = reverse ? e.c : e.p, b = reverse ? e.p : e.c;
      const row = adj.get(a) || []; row.push(b); adj.set(a,row);
    }
    const seen = new Set([selected]), queue = [selected];
    for (let i=0;i<queue.length;i++) for (const n of adj.get(queue[i]) || []) {
      if (seen.has(n)) continue;
      seen.add(n); out.add(n); queue.push(n);
    }
  };
  if (mode !== "lineage") walk(false);
  if (mode !== "impact") walk(true);
  return out;
}
export function stagesFor(data: ErdCatalog, code: ModCode | null) {
  const m = data.modules.find((m) => m.code === code);
  const known = new Set(data.tables.map((t) => t.n));
  return (m?.objects || []).map((o,index) => ({index,he:o.he,en:o.en,names:[...new Set(o.t.filter((n) => known.has(n) && m?.core.includes(n)))]})).filter((s) => s.names.length);
}
export function diagram(data: ErdCatalog, view: DiagramView) {
  const m = data.modules.find((m) => m.code === view.module);
  const stages = stagesFor(data,view.module);
  let names = new Set(m?.core || data.tables.map((t) => t.n));
  let visibleEdges = data.edges;
  const group = groupsFor(data,view.module).find((g) => g.id === view.group) ?? null;
  const stage = view.analysis === "flow" ? stages.find((s) => s.index === view.step) : undefined;
  const expanded = view.expanded ?? !!view.selected;
  const heightFor = (n: string) => n === view.selected && expanded ? CARD.openH : CARD.h;
  let seeds: Set<string> | null = null;
  const tracing = view.analysis && ["impact","lineage","dep"].includes(view.analysis);
  if (tracing && view.selected) {
    // Match 2D's reachability over the current module. Cross-module analysis
    // remains available as an explicit expansion instead of shrinking the map.
    if (group && !view.crossModule) {
      const scope = new Set(group.names);
      for (const e of data.edges) {
        if (group.names.includes(e.p) && names.has(e.c)) scope.add(e.c);
        if (group.names.includes(e.c) && names.has(e.p)) scope.add(e.p);
      }
      names = scope;
    }
    const edges = view.crossModule ? data.edges : data.edges.filter((e) => names.has(e.p) && names.has(e.c) && (!group || group.names.includes(e.p) || group.names.includes(e.c)));
    visibleEdges = edges;
    names = trace({...data,edges},view.selected,view.analysis as "impact"|"lineage"|"dep");
  }
  else if (view.focus && view.selected) {
    const known = new Set(data.tables.map((t) => t.n));
    const edges = data.edges.filter((e) => (e.p === view.selected || e.c === view.selected) && known.has(e.p) && known.has(e.c));
    const sources = [...new Set(edges.filter((e) => e.c === view.selected && e.p !== view.selected).map((e) => e.p))].sort();
    const dependents = [...new Set(edges.filter((e) => e.p === view.selected && e.c !== view.selected).map((e) => e.c))].sort();
    // A reciprocal relation gets one card, with both directed edges preserved.
    const mutual = sources.filter((n) => dependents.includes(n));
    const children = dependents.filter((n) => !sources.includes(n));
    const lanes = [
      ...(sources.length ? [{ label: "מקורות", names: sources }] : []),
      { label: "הטבלה שנבחרה", names: [view.selected] },
      ...(children.length ? [{ label: "טבלאות תלויות", names: children }] : []),
    ];
    const sizes = new Map(lanes.flatMap((lane) => lane.names.map((n) => [n,heightFor(n)] as const)));
    const heights = lanes.map((lane) => lane.names.reduce((h,n) => h + sizes.get(n)! + CARD.gapY, -CARD.gapY));
    const height = Math.max(...heights);
    const points = new Map<string, { x: number; y: number }>();
    lanes.forEach((lane, col) => {
      let y = 120 + (height - heights[col]) / 2;
      lane.names.forEach((n) => { points.set(n,{x:80+(lanes.length-1-col)*(CARD.w+CARD.gapX),y}); y += sizes.get(n)! + CARD.gapY; });
    });
    return { points, sizes, stages, edges, lanes, direct: { sources, dependents, mutual }, group:null, seeds:null, width: 160 + lanes.length * CARD.w + (lanes.length - 1) * CARD.gapX, height: 200 + height };
  } else if (stage || group) {
    seeds = new Set((stage || group)!.names);
    visibleEdges = data.edges.filter((e) => seeds!.has(e.p) || seeds!.has(e.c));
    const related = new Set(seeds);
    for (const e of data.edges) {
      if (seeds.has(e.p) && names.has(e.c)) related.add(e.c);
      if (seeds.has(e.c) && names.has(e.p)) related.add(e.p);
    }
    names = related;
  } else if (view.analysis === "flow") {
    seeds = new Set(stages.flatMap((s) => s.names));
  }
  // Every mode uses the same rank direction as the module. Business steps
  // narrow this map rather than constructing a long, mirrored strip.
  const solved = ((m && !view.focus && !(tracing && view.crossModule) ? m.pos : data.union.pos) || []).filter((p) => names.has(p.n));
  const ranks = new Map([...new Set(solved.map((p) => p.x))].sort((a,b)=>a-b).map((x,i)=>[x,i]));
  const source = new Map(solved.map((p)=>[p.n,p])), buckets = new Map<number,string[]>();
  for (const t of data.tables) if (names.has(t.n)) {
    const rank = ranks.get(source.get(t.n)?.x ?? NaN) ?? 0;
    const row = buckets.get(rank) || []; row.push(t.n); buckets.set(rank,row);
  }
  const ordered = [...buckets.keys()].sort((a,b)=>a-b);
  const widths = ordered.map(() => CARD.w);
  const total = widths.reduce((s,w)=>s+w,0)+Math.max(0,ordered.length-1)*CARD.gapX;
  const points = new Map<string,{x:number;y:number}>();
  const sizes = new Map([...names].map((n) => [n,heightFor(n)]));
  let offset=0, height=CARD.h;
  ordered.forEach((rank,col) => {
    const row = buckets.get(rank)!;
    row.sort((a,b)=>(source.get(a)?.y??0)-(source.get(b)?.y??0)||a.localeCompare(b));
    const columns = 1;
    let y=120;
    for(let i=0;i<row.length;i+=columns) {
      const line=row.slice(i,i+columns);
      line.forEach((n,j)=>points.set(n,{x:80+total-offset-CARD.w-j*(CARD.w+90),y}));
      y+=Math.max(...line.map((n)=>sizes.get(n)!))+CARD.gapY;
    }
    height=Math.max(height,y-120-CARD.gapY);
    offset+=widths[col]+CARD.gapX;
  });
  return {points,sizes,stages,edges:visibleEdges.filter((e)=>points.has(e.p)&&points.has(e.c)),lanes:[],direct:null,group:seeds?group:null,seeds,width:160+Math.max(CARD.w,total),height:200+height};
}
