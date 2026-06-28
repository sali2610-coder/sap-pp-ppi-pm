"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, ZoomIn, ZoomOut, Maximize2, Crosshair, Network, ArrowLeft, ExternalLink, Target, Briefcase, AlertTriangle, GitBranch, X } from "lucide-react";
import { buildModuleGraph, FLOWS, type StudioGraph } from "@/lib/studio-graph";
import { lookupEntity } from "@/lib/entity-lookup";
import type { Module } from "@/lib/types";

const MOD_COLOR: Record<string, string> = { PM: "#f97316", "PP-PI": "#6d28d9" };

export function ArchitectureStudio() {
  const [module, setModule] = useState<Module>("PM");
  const g: StudioGraph = useMemo(() => buildModuleGraph(module), [module]);
  const [tr, setTr] = useState({ x: 0, y: 0, k: 1 });
  const [sel, setSel] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const accent = MOD_COLOR[module];

  const fit = () => {
    const el = wrapRef.current; if (!el) return;
    const cw = el.clientWidth, ch = el.clientHeight;
    const k = Math.min(cw / (g.width + 60), ch / (g.height + 60), 1.4);
    setTr({ k, x: (cw - g.width * k) / 2, y: (ch - g.height * k) / 2 });
  };
  useEffect(() => { setSel(null); const id = setTimeout(fit, 30); return () => clearTimeout(id); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [module, g]);

  const onWheel = (e: React.WheelEvent) => {
    const el = wrapRef.current; if (!el) return;
    const rect = el.getBoundingClientRect(); const px = e.clientX - rect.left, py = e.clientY - rect.top;
    const nk = Math.min(2.6, Math.max(0.18, tr.k * (1 - e.deltaY * 0.0014)));
    const f = nk / tr.k;
    setTr({ k: nk, x: px - (px - tr.x) * f, y: py - (py - tr.y) * f });
  };
  const onDown = (e: React.PointerEvent) => { if ((e.target as Element).closest("[data-node]")) return; drag.current = { x: e.clientX, y: e.clientY, ox: tr.x, oy: tr.y }; setSel(null); };
  const onMove = (e: React.PointerEvent) => { if (drag.current) setTr((p) => ({ ...p, x: drag.current!.ox + (e.clientX - drag.current!.x), y: drag.current!.oy + (e.clientY - drag.current!.y) })); };
  const zoom = (d: number) => { const el = wrapRef.current; if (!el) return; const cw = el.clientWidth / 2, ch = el.clientHeight / 2; const nk = Math.min(2.6, Math.max(0.18, tr.k * d)); const f = nk / tr.k; setTr({ k: nk, x: cw - (cw - tr.x) * f, y: ch - (ch - tr.y) * f }); };

  const centerOn = (id: string) => {
    const n = g.nodes.find((x) => x.id === id); const el = wrapRef.current; if (!n || !el) return;
    const k = Math.max(tr.k, 0.9);
    setTr({ k, x: el.clientWidth / 2 - n.x * k, y: el.clientHeight / 2 - n.y * k });
    setSel(id);
  };

  const nbr = (id: string | null) => (id ? g.adj.get(id) || new Set<string>() : new Set<string>());
  const active = sel || hover;
  const activeSet = nbr(active);
  const dimNode = (id: string) => (active && id !== active && !activeSet.has(id) ? 0.16 : 1);
  const hits = q.trim().length >= 1 ? g.nodes.filter((n) => `${n.id} ${n.he}`.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 8) : [];

  const tip = active ? lookupEntity(active) : null;
  const selNbrs = active ? [...activeSet] : [];

  return (
    <div className="mx-auto max-w-[1700px]" dir="rtl">
      {/* header */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-400"><Link href="/" className="hover:text-slate-700">בית</Link><ArrowLeft className="size-3" /><span className="font-bold text-slate-700">SAP Architecture Studio</span></div>
        <div className="flex items-center gap-1.5 rounded-xl bg-slate-100 p-1">
          {(["PM", "PP-PI"] as Module[]).map((m) => <button key={m} onClick={() => setModule(m)} className={`rounded-lg px-3 py-1.5 text-[13px] font-extrabold transition ${module === m ? "text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`} style={module === m ? { background: MOD_COLOR[m] } : undefined}>{m}</button>)}
        </div>
      </div>

      <header className="relative mb-3 overflow-hidden rounded-2xl p-5 text-white shadow-lg" style={{ background: `linear-gradient(135deg,${accent},${accent}cc)` }}>
        <div className="pointer-events-none absolute -left-16 -top-16 size-48 rounded-full bg-white/10 blur-3xl" />
        <div className="relative flex flex-wrap items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70"><Network className="size-4" />קוקפיט ארכיטקטורה חי · Living ER Map</div>
            <h1 className="mt-0.5 text-2xl font-extrabold sm:text-3xl">ארכיטקטורת {module} — מפה אינטראקטיבית</h1>
            <p className="mt-1 text-[13px] text-white/85">{g.nodes.length} טבלאות · {g.edges.length} קשרים · גרור להזזה, גלגל לזום, רחף להסבר, לחץ להדגשת הקשרים.</p>
          </div>
        </div>
      </header>

      {/* business-flow timeline */}
      <div className="mb-3 flex flex-wrap items-center gap-1.5 rounded-2xl border border-slate-200 bg-white p-2.5">
        <span className="px-1 text-[11px] font-extrabold text-slate-400">זרימה עסקית:</span>
        {(FLOWS[module] || []).map((s, i, arr) => { const on = sel === s.code; const exists = g.nodes.some((n) => n.id === s.code); return (
          <span key={s.code} className="flex items-center gap-1.5">
            <button disabled={!exists} onClick={() => centerOn(s.code)} className={`rounded-lg px-2.5 py-1 text-[11.5px] font-bold transition ${on ? "text-white" : exists ? "bg-slate-100 text-slate-600 hover:bg-slate-200" : "bg-slate-50 text-slate-300"}`} style={on ? { background: accent } : undefined}>{s.label}<span className="ms-1 font-mono text-[9px] opacity-70" dir="ltr">{s.code}</span></button>
            {i < arr.length - 1 && <ArrowLeft className="size-3.5 shrink-0 text-slate-300" />}
          </span>
        ); })}
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* canvas */}
        <div className="relative">
          {/* search */}
          <div className="absolute right-3 top-3 z-30 w-64 max-w-[70%]">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/95 px-3 py-2 shadow-sm backdrop-blur">
              <Search className="size-4 shrink-0 text-slate-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חפש טבלה…" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-300" dir="ltr" />
            </div>
            {hits.length > 0 && <div className="mt-1 max-h-64 overflow-auto rounded-xl border border-slate-200 bg-white p-1 shadow-2xl">{hits.map((n) => <button key={n.id} onClick={() => { centerOn(n.id); setQ(""); }} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-right hover:bg-slate-50"><span className="tech flex-1 truncate font-mono text-sm font-bold text-slate-800" dir="ltr">{n.id}</span><span className="truncate text-[11px] text-slate-400">{n.he}</span></button>)}</div>}
          </div>
          {/* zoom dock */}
          <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1 rounded-xl border border-slate-200 bg-white/95 p-1 shadow-sm backdrop-blur">
            <button onClick={() => zoom(1.25)} className="grid size-8 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"><ZoomIn className="size-4" /></button>
            <span className="px-1 font-mono text-xs font-bold text-slate-400">{Math.round(tr.k * 100)}%</span>
            <button onClick={() => zoom(0.8)} className="grid size-8 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"><ZoomOut className="size-4" /></button>
            <button onClick={fit} title="התאם" className="grid size-8 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"><Maximize2 className="size-4" /></button>
          </div>

          <div ref={wrapRef} className="relative h-[calc(100vh-15rem)] min-h-[520px] cursor-grab touch-none overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/70 active:cursor-grabbing"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px,#d7deea 1px,transparent 0)", backgroundSize: "26px 26px" }}
            onWheel={onWheel} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={() => (drag.current = null)} onPointerLeave={() => { drag.current = null; setHover(null); }}>
            <div style={{ transform: `translate(${tr.x}px,${tr.y}px) scale(${tr.k})`, transformOrigin: "0 0", width: g.width, height: g.height, position: "absolute" }}>
              {/* edges */}
              <svg width={g.width} height={g.height} className="absolute inset-0 overflow-visible">
                {g.edges.map((e) => {
                  const hot = active != null && (e.from === active || e.to === active);
                  const pts = e.points.length >= 2 ? e.points : (() => { const a = g.nodes.find((n) => n.id === e.from)!, b = g.nodes.find((n) => n.id === e.to)!; return [{ x: a.x, y: a.y }, { x: b.x, y: b.y }]; })();
                  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
                  return <path key={e.id} d={d} fill="none" stroke={hot ? accent : "#cbd5e1"} strokeWidth={hot ? 2.4 : 1.2} strokeOpacity={active && !hot ? 0.18 : hot ? 0.95 : 0.6} className="transition-all duration-300" />;
                })}
              </svg>
              {/* nodes */}
              {g.nodes.map((n) => { const on = n.id === sel; const isHover = n.id === hover; const op = dimNode(n.id); return (
                <button key={n.id} data-node onMouseEnter={() => setHover(n.id)} onMouseLeave={() => setHover(null)} onClick={() => setSel(on ? null : n.id)}
                  className="absolute flex flex-col items-start rounded-xl border-2 bg-white px-2.5 py-1.5 text-right shadow-sm transition-all duration-300 hover:z-10 hover:shadow-lg"
                  style={{ left: n.x - n.w / 2, top: n.y - n.h / 2, width: n.w, height: n.h, opacity: op, borderColor: on || isHover ? accent : "#e2e8f0", boxShadow: on ? `0 0 0 5px ${accent}22` : undefined }}>
                  <span className="tech w-full truncate font-mono text-[12.5px] font-extrabold text-slate-900" dir="ltr">{n.id}</span>
                  <span className="w-full truncate text-[9.5px] text-slate-400">{n.he}</span>
                </button>
              ); })}
            </div>
          </div>
        </div>

        {/* detail / mentor panel */}
        <aside className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          {tip ? (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: accent }}>טבלה</span><span className="tech font-mono text-lg font-extrabold text-slate-900" dir="ltr">{tip.name}</span></div>
                {sel && <button onClick={() => setSel(null)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"><X className="size-4" /></button>}
              </div>
              {tip.he && <p className="text-[13px] font-semibold leading-relaxed text-slate-700">{tip.he}</p>}
              {tip.purpose && <p className="flex gap-1.5 text-[12.5px] leading-relaxed text-slate-600"><Target className="mt-0.5 size-3.5 shrink-0 text-blue-500" />{tip.purpose}</p>}
              {tip.consultantTip && <p className="flex gap-1.5 text-[12.5px] leading-relaxed text-slate-600"><Briefcase className="mt-0.5 size-3.5 shrink-0 text-violet-500" />{tip.consultantTip}</p>}
              {tip.mistake && <p className="flex gap-1.5 text-[12.5px] leading-relaxed text-slate-600"><AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-rose-500" />{tip.mistake}</p>}
              {selNbrs.length > 0 && <div><div className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase text-slate-400"><GitBranch className="size-3" />מחובר ל-{selNbrs.length}</div><div className="flex flex-wrap gap-1">{selNbrs.slice(0, 18).map((n) => <button key={n} onClick={() => centerOn(n)} className="tech rounded-md bg-slate-100 px-1.5 py-0.5 text-[10.5px] font-bold text-slate-600 hover:bg-brand/10 hover:text-brand" dir="ltr">{n}</button>)}</div></div>}
              <Link href={`/object/${encodeURIComponent(tip.name)}/`} className="mt-1 flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-[13px] font-extrabold text-white shadow-sm transition active:scale-95" style={{ background: accent }}><ExternalLink className="size-4" />פתח עמוד מלא (Wiki)</Link>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 py-10 text-center text-slate-400">
              <Crosshair className="size-8 text-slate-300" />
              <p className="text-sm font-bold text-slate-500">רחף או לחץ על טבלה</p>
              <p className="text-[12px] leading-relaxed">בחירת אובייקט תדגיש מיד את כל מה שמחובר אליו ותעמעם את השאר — בדיוק כמו לעקוב אחרי קו בפוסטר, רק חי.</p>
            </div>
          )}
        </aside>
      </div>
      <p className="mt-3 pb-4 text-center text-[11px] text-slate-400">קשרים אמיתיים מתוך מודל הנתונים (ER) — ללא המצאה. <Link href={module === "PM" ? "/pm/" : "/pp-pi/"} className="font-bold text-brand">חזרה למרכז {module}</Link></p>
    </div>
  );
}
