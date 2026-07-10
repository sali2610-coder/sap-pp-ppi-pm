"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, ZoomIn, ZoomOut, Scan, Network, Boxes, Flame, Trophy, AlertTriangle } from "lucide-react";
import { buildGraph, neighbors, degree, graphStats, KIND_META, type GraphIndex, type GNode, type RawTable } from "@/lib/knowledge-graph-global";
import { knowledgeFor } from "@/lib/knowledge";
import { s4For } from "@/lib/s4";
import { INCIDENTS } from "@/data/troubleshooting";
import { interviewFor } from "@/data/knowledge/interview";

export function GlobalGraph() {
  const sp = useSearchParams();
  const [tables, setTables] = useState<RawTable[] | null>(null);
  const [palette, setPalette] = useState<Record<string, string>>({});
  const [center, setCenter] = useState<string>("T:MATDOC");
  const [tr, setTr] = useState({ x: 0, y: 0, k: 1 });
  const [q, setQ] = useState("");
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);

  useEffect(() => { fetch("/sap-infrastructure/dataset.json").then((r) => r.json()).then((d) => { setTables(d.tables || []); setPalette(d.palette || {}); }).catch(() => setTables([])); }, []);
  const g = useMemo<GraphIndex | null>(() => (tables ? buildGraph(tables) : null), [tables]);
  const stats = useMemo(() => (g ? graphStats(g) : null), [g]);
  useEffect(() => { const n = sp.get("node"); if (n && g && g.nodes.has(`T:${n}`)) setCenter(`T:${n}`); }, [sp, g]);

  const colorFor = (n: GNode) => (n.kind === "table" || n.kind === "module" ? palette[n.module || ""] || "#64748b" : KIND_META[n.kind].c);
  const searchHits = useMemo(() => { if (!g || q.trim().length < 1) return [] as GNode[]; const s = q.toLowerCase(); return [...g.nodes.values()].filter((n) => n.label.toLowerCase().includes(s) || (n.he || "").includes(q)).slice(0, 12); }, [g, q]);

  if (!g || !stats) return <div className="flex h-[60vh] items-center justify-center text-slate-400" dir="rtl">בונה את גרף הידע הגלובלי…</div>;
  const cNode = g.nodes.get(center);
  const nbrs = cNode ? neighbors(g, center) : [];
  const shown = nbrs.slice(0, 24);
  const CX = 600, CY = 380, R = 250;
  const pos = (i: number, n: number) => { const a = (i / Math.max(n, 1)) * 2 * Math.PI - Math.PI / 2; return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) }; };

  const onWheel = (e: React.WheelEvent) => { e.preventDefault(); setTr((p) => ({ ...p, k: Math.min(2.4, Math.max(0.4, p.k * (e.deltaY < 0 ? 1.1 : 0.9))) })); };
  const onDown = (e: React.PointerEvent) => { if ((e.target as Element).closest("[data-node]")) return; drag.current = { x: e.clientX, y: e.clientY, ox: tr.x, oy: tr.y }; };
  const onMove = (e: React.PointerEvent) => { if (drag.current) setTr((p) => ({ ...p, x: drag.current!.ox + (e.clientX - drag.current!.x), y: drag.current!.oy + (e.clientY - drag.current!.y) })); };
  const recenter = (id: string) => { setCenter(id); setTr({ x: 0, y: 0, k: 1 }); };

  const NodeChip = ({ n, x, y, big }: { n: GNode; x: number; y: number; big?: boolean }) => {
    const c = colorFor(n); const km = KIND_META[n.kind];
    return (
      <button data-node onClick={() => recenter(n.id)} className="absolute -translate-x-1/2 -translate-y-1/2 transition active:scale-95" style={{ left: x, top: y }}>
        <span className={`flex flex-col items-center gap-0.5 rounded-2xl border-2 bg-white px-3 shadow-md transition hover:shadow-lg ${big ? "py-2.5" : "py-1.5"}`} style={{ borderColor: c, boxShadow: big ? `0 0 0 6px ${c}1a` : undefined }}>
          <span className="tech font-mono font-extrabold text-slate-900" style={{ fontSize: big ? 16 : 12 }} dir="ltr">{n.label.length > 22 ? n.label.slice(0, 20) + "…" : n.label}</span>
          <span className="rounded-full px-1.5 text-[8px] font-bold text-white" style={{ background: c }}>{n.kind === "table" || n.kind === "module" ? n.module : km.he}</span>
        </span>
      </button>
    );
  };

  return (
    <div className="mx-auto" dir="rtl">
      <header className="relative mb-3 overflow-hidden rounded-2xl bg-gradient-to-l from-slate-900 to-slate-800 px-5 py-3 text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60"><Network className="size-4" />Global Knowledge Graph</div>
            <h1 className="text-xl font-extrabold">גרף הידע הגלובלי · {stats.total} צמתים · {stats.edges} קשרים</h1></div>
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-white/50" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חפש כל אובייקט — MATDOC · I_Product · MM01 · BAPI…" className="w-full rounded-xl border border-white/20 bg-white/10 py-2 pe-3 ps-9 text-sm text-white placeholder:text-white/50 outline-none focus:bg-white/20" />
            {searchHits.length > 0 && <div className="absolute z-50 mt-1 max-h-72 w-full overflow-auto rounded-xl border border-slate-200 bg-white p-1 text-slate-800 shadow-2xl">{searchHits.map((n) => <button key={n.id} onClick={() => { recenter(n.id); setQ(""); }} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-right hover:bg-slate-50"><span className="size-2 rounded-full" style={{ background: colorFor(n) }} /><span className="tech flex-1 truncate font-mono text-sm font-bold" dir="ltr">{n.label}</span><span className="rounded bg-slate-100 px-1.5 text-[9px] font-bold text-slate-500">{KIND_META[n.kind].he}</span></button>)}</div>}
          </div>
        </div>
      </header>

      <div className="grid gap-3 lg:grid-cols-[1fr_320px]">
        {/* graph stage */}
        <div className="relative h-[calc(100vh-12rem)] min-h-[520px] overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/60" style={{ backgroundImage: "radial-gradient(circle at 1px 1px,#d7deea 1px,transparent 0)", backgroundSize: "28px 28px", touchAction: "none" }} onWheel={onWheel} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={() => (drag.current = null)}>
          <div className="absolute inset-0" style={{ transform: `translate(${tr.x}px,${tr.y}px) scale(${tr.k})`, transformOrigin: "center" }}>
            <svg className="absolute" width="1200" height="760" style={{ left: "calc(50% - 600px)", top: "calc(50% - 380px)" }}>
              {shown.map((nb, i) => { const p = pos(i, shown.length); return <g key={nb.node.id}><line x1={CX} y1={CY} x2={p.x} y2={p.y} stroke="#cbd5e1" strokeWidth={1.4} /><text x={(CX + p.x) / 2} y={(CY + p.y) / 2 - 3} textAnchor="middle" fontSize={9} fill="#94a3b8" fontWeight={700}>{nb.label.length > 16 ? nb.label.slice(0, 14) + "…" : nb.label}</text></g>; })}
            </svg>
            <div className="absolute" style={{ left: "calc(50% - 600px)", top: "calc(50% - 380px)", width: 1200, height: 760 }}>
              {cNode && <NodeChip n={cNode} x={CX} y={CY} big />}
              {shown.map((nb, i) => { const p = pos(i, shown.length); return <NodeChip key={nb.node.id} n={nb.node} x={p.x} y={p.y} />; })}
            </div>
          </div>
          {nbrs.length > 24 && <div className="absolute bottom-3 start-3 rounded-lg bg-white/90 px-2.5 py-1 text-[11px] font-bold text-slate-500 shadow-sm">מוצג 24 מתוך {nbrs.length} שכנים · התמקד בצומת לראות עוד</div>}
          {/* zoom dock */}
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-2xl border border-white/60 bg-white/90 p-1.5 shadow-xl backdrop-blur-md">
            {[[<ZoomOut key="o" className="size-4" />, () => setTr((p) => ({ ...p, k: Math.max(0.4, p.k / 1.2) }))], [<Scan key="f" className="size-4" />, () => setTr({ x: 0, y: 0, k: 1 })], [<ZoomIn key="i" className="size-4" />, () => setTr((p) => ({ ...p, k: Math.min(2.4, p.k * 1.2) }))]].map((b, i) => <button key={i} onClick={b[1] as () => void} className="grid size-9 place-items-center rounded-xl text-slate-600 transition hover:bg-slate-100">{b[0] as React.ReactNode}</button>)}
            <span className="px-2 font-mono text-xs font-bold text-slate-400">{Math.round(tr.k * 100)}%</span>
          </div>
        </div>

        {/* side: object card + executive */}
        <div className="space-y-3">
          {cNode && (() => {
            const isTable = cNode.kind === "table"; const nm = cNode.label;
            const k = isTable ? knowledgeFor(nm) : undefined;
            const s4 = isTable && cNode.t ? s4For(nm, cNode.t.s4) : null;
            const inc = isTable ? INCIDENTS.filter((x) => x.tables.includes(nm)).slice(0, 3) : [];
            const iq = isTable ? interviewFor(nm)[0] : undefined;
            return (
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm" key={cNode.id}>
                <div className="px-4 py-3 text-white" style={{ background: `linear-gradient(135deg,${colorFor(cNode)},${colorFor(cNode)}cc)` }}>
                  <div className="flex items-center gap-2"><span className="tech font-mono text-xl font-extrabold" dir="ltr">{nm}</span><span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold ring-1 ring-white/25">{cNode.kind === "table" ? cNode.module : KIND_META[cNode.kind].he}</span></div>
                  {cNode.he && cNode.he !== nm && <p className="text-sm text-white/85">{cNode.he}</p>}
                  <p className="mt-0.5 text-[11px] text-white/70">{degree(g, center)} קשרים</p>
                </div>
                <div className="max-h-[52vh] space-y-2.5 overflow-y-auto p-4 text-[12px]">
                  {k && <div><div className="text-[10px] font-bold uppercase text-slate-400">מהות / מטרה</div><p className="text-slate-700">{k.role} {k.why}</p>{k.whenUsed && <p className="mt-0.5 text-slate-500">מתי: {k.whenUsed}</p>}</div>}
                  {s4 && (s4.impact || s4.impacted) && <div className="rounded-lg bg-amber-50 px-2.5 py-1.5"><div className="text-[10px] font-bold uppercase text-amber-700">ECC ↔ S/4</div><p className="text-amber-900">{k?.s4 || s4.impact?.changed || "—"}</p></div>}
                  {inc.length > 0 && <div><div className="text-[10px] font-bold uppercase text-slate-400">תקלות קשורות</div>{inc.map((x) => <Link key={x.slug} href={`/troubleshooting/${x.slug}/`} className="block truncate rounded px-1 py-0.5 text-slate-600 hover:bg-slate-50">• {x.he}</Link>)}</div>}
                  {iq && <div><div className="text-[10px] font-bold uppercase text-slate-400">שאלת ראיון</div><p className="text-slate-700">{iq.q}</p></div>}
                  {/* expand neighbors by kind */}
                  <div><div className="mb-1 text-[10px] font-bold uppercase text-slate-400">שכנים ({nbrs.length})</div><div className="flex flex-wrap gap-1">{[...new Set(nbrs.map((x) => x.node.kind))].map((kd) => <span key={kd} className="rounded-md px-1.5 py-0.5 text-[10px] font-bold text-white" style={{ background: KIND_META[kd].c }}>{KIND_META[kd].he} {nbrs.filter((x) => x.node.kind === kd).length}</span>)}</div></div>
                  <div className="flex flex-wrap gap-1.5 border-t border-slate-100 pt-2">
                    {isTable && <Link href={`/object/${encodeURIComponent(nm)}/`} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:bg-slate-200">דף אובייקט</Link>}
                    {isTable && <Link href={`/impact/${encodeURIComponent(nm)}/`} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:bg-slate-200">השפעה</Link>}
                    {cNode.kind === "tcode" && <Link href={`/tcode/${encodeURIComponent(nm)}/`} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:bg-slate-200">טרנזקציה</Link>}
                    
                  </div>
                </div>
              </div>
            );
          })()}

          {/* executive layer */}
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="space-y-3 text-[12px]">
              {[["הכי מקושרים", Trophy, "#d97706", stats.topConnected], ["הכי בשימוש", Flame, "#0ea5e9", stats.mostUsed], ["הגירה קריטית", Boxes, "#16a34a", stats.critMig], ["סיכון גבוה", AlertTriangle, "#dc2626", stats.highRisk]].map(([label, Icon, c, ids]) => (
                <div key={label as string}>
                  <div className="mb-1 flex items-center gap-1.5 text-[11px] font-extrabold text-slate-700">{(() => { const I = Icon as React.ElementType; return <I className="size-3.5" style={{ color: c as string }} />; })()}{label as string}</div>
                  <div className="flex flex-wrap gap-1">{(ids as string[]).slice(0, 6).map((id) => { const n = g.nodes.get(id); if (!n) return null; return <button key={id} onClick={() => recenter(id)} className="tech rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[11px] font-bold text-slate-700 transition hover:border-brand/50 hover:text-brand">{n.label}</button>; })}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
