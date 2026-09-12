import type { ErdCatalog, ErdTable, ModCode } from "./erd-types";
import type { SpatialView } from "./erd-spatial-model";

export const CARD = { w: 320, h: 342, gapX: 140, gapY: 86 };
export type DiagramView = SpatialView & { analysis?: "map" | "flow" | "impact" | "lineage" | "dep"; step?: number | null };
export const cardFields = (t: ErdTable) => [...t.f].sort((a,b) => Number(/PK/.test(b[3])) - Number(/PK/.test(a[3]))).slice(0,5);

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
  const known = new Set(data.tables.map((t) => t.n)), seen = new Set<string>();
  return (m?.objects || []).map((o,index) => ({index,he:o.he,en:o.en,names:o.t.filter((n) => {
    if (!known.has(n) || !m?.core.includes(n) || seen.has(n)) return false;
    seen.add(n); return true;
  })})).filter((s) => s.names.length);
}
export function diagram(data: ErdCatalog, view: DiagramView) {
  const m = data.modules.find((m) => m.code === view.module);
  let names = new Set(m?.core || data.tables.map((t) => t.n));
  const tracing = view.analysis && ["impact","lineage","dep"].includes(view.analysis);
  if (tracing && view.selected) names = trace(data,view.selected,view.analysis as "impact"|"lineage"|"dep");
  else if (view.focus && view.selected) names = new Set([view.selected,...data.edges.flatMap((e) => e.p === view.selected ? [e.c] : e.c === view.selected ? [e.p] : [])]);
  const stages = stagesFor(data,view.module);
  const stageOf = new Map(stages.flatMap((s,i) => s.names.map((n) => [n,i] as const)));
  const solved = ((m && !view.focus && !tracing ? m.pos : data.union.pos) || []).filter((p) => names.has(p.n));
  const ranks = new Map([...new Set(solved.map((p) => p.x))].sort((a,b)=>a-b).map((x,i)=>[x,i]));
  const source = new Map(solved.map((p)=>[p.n,p])), buckets = new Map<number,string[]>();
  for (const t of data.tables) if (names.has(t.n)) {
    const rank = view.analysis === "flow" ? stageOf.get(t.n) ?? stages.length : ranks.get(source.get(t.n)?.x ?? NaN) ?? 0;
    const row = buckets.get(rank) || []; row.push(t.n); buckets.set(rank,row);
  }
  const ordered = [...buckets.keys()].sort((a,b)=>a-b);
  const widths = ordered.map((rank) => view.analysis === "flow" ? Math.min(2,buckets.get(rank)!.length)*(CARD.w+90)-90 : CARD.w);
  const total = widths.reduce((s,w)=>s+w,0)+Math.max(0,ordered.length-1)*CARD.gapX;
  const points = new Map<string,{x:number;y:number}>(); let offset=0, rows=1;
  ordered.forEach((rank,col) => {
    const row = buckets.get(rank)!;
    row.sort((a,b)=>(source.get(a)?.y??0)-(source.get(b)?.y??0)||a.localeCompare(b));
    const columns = view.analysis === "flow" ? Math.min(2,row.length) : 1;
    rows=Math.max(rows,Math.ceil(row.length/columns));
    row.forEach((n,i)=>points.set(n,{x:80+total-offset-CARD.w-(i%columns)*(CARD.w+90),y:120+Math.floor(i/columns)*(CARD.h+CARD.gapY)}));
    offset+=widths[col]+CARD.gapX;
  });
  return {points,stages,edges:data.edges.filter((e)=>points.has(e.p)&&points.has(e.c)),width:160+Math.max(CARD.w,total),height:200+rows*(CARD.h+CARD.gapY)-CARD.gapY};
}
