"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Search, ArrowLeft, Database, Terminal, Boxes, LayoutGrid } from "lucide-react";
import { ALL_TABLES } from "@/data/sapData";
import { kgraph, tableByName } from "@/lib/knowledge-graph";
import { cdsForTable } from "@/data/cds-map";
import { Highlight } from "@/components/highlight";

const RED = "#d62027";
const mc = (m?: string) => (m === "PM" ? "#f97316" : m === "QM" ? "#0d9488" : m === "PP-PI" ? "#6d28d9" : "#475569");
const splitTc = (s: string) => [...new Set((s || "").split(/[^A-Za-z0-9_]+/).map((c) => c.trim()).filter((c) => c.length >= 2 && /^[A-Z][A-Z0-9_]*$/i.test(c)))];

export function LineageExplorer({ initial = "EQUI" }: { initial?: string }) {
  const reduce = useReducedMotion();
  const [sel, setSel] = useState(initial);
  const [q, setQ] = useState("");
  const [active, setActive] = useState<string | null>(null);

  const matches = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return ALL_TABLES.filter((t) => t.tableName.toLowerCase().includes(s) || t.descriptionHe.includes(q) || t.descriptionEn.toLowerCase().includes(s)).slice(0, 8);
  }, [q]);

  const g = useMemo(() => kgraph(sel), [sel]);
  const t = tableByName(sel);
  const producers = useMemo(() => (t ? splitTc(t.tcodes) : []), [t]);
  const bapis = useMemo(() => (t ? [...new Set((t.funcs || []).map((f) => f[0]))] : []), [t]);
  const cds = useMemo(() => (t ? cdsForTable(t.tableName).map((c) => c.view) : []), [t]);

  const CAP = 7;
  const sources = (g?.upstream || []).slice(0, CAP);
  const consumers = (g?.downstream || []).slice(0, CAP);

  // SVG geometry (Source → Object → Consumer)
  const W = 820, rowH = 58, padY = 46;
  const H = Math.max(sources.length, consumers.length, 1) * rowH + padY * 2;
  const cx = W / 2, cy = H / 2;
  const colX = { src: 140, con: W - 140 };
  const yFor = (i: number, n: number) => padY + (H - padY * 2) * (n === 1 ? 0.5 : i / (n - 1));
  const NW = 156, NH = 42;

  const dim = (n: string) => active && active !== n && active !== sel; // when a node is active, fade the rest

  const Node = ({ x, y, label, module, exists, center }: { x: number; y: number; label: string; module: string; exists: boolean; center?: boolean }) => {
    const col = center ? RED : mc(module);
    const faded = !center && active && active !== label;
    return (
      <g transform={`translate(${x - NW / 2},${y - NH / 2})`} style={{ cursor: "pointer", opacity: faded ? 0.3 : 1, transition: "opacity .25s" }}
        onClick={() => setActive((a) => (a === label ? null : center ? null : label))}>
        <rect width={NW} height={NH} rx={11} fill="#fff" stroke={col} strokeWidth={center ? 2.5 : active === label ? 2.5 : 1.4}
          style={{ filter: center ? `drop-shadow(0 8px 18px ${col}40)` : active === label ? `drop-shadow(0 6px 14px ${col}55)` : "drop-shadow(0 4px 10px rgba(15,23,42,.08))" }} />
        <rect width={4} height={NH} rx={2} fill={col} />
        <text x={NW / 2 + 4} y={NH / 2 - 2} textAnchor="middle" style={{ font: "800 13px ui-monospace", fill: "#0f172a" }}>{label}</text>
        <text x={NW / 2 + 4} y={NH / 2 + 11} textAnchor="middle" style={{ font: "700 8px sans-serif", fill: col }}>{center ? "OBJECT" : module}</text>
      </g>
    );
  };

  return (
    <div className="space-y-5" dir="rtl">
      {/* search / object picker */}
      <div className="relative">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-brand/40">
          <Search className="size-5 shrink-0 text-brand" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חפש אובייקט / טבלה לניתוח שושלת נתונים — EQUI, MARA, AUFK…"
            className="h-7 w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
          {q && <span className="shrink-0 rounded-lg bg-brand/10 px-2 py-1 text-xs font-extrabold text-brand">{matches.length} תוצאות</span>}
        </div>
        {matches.length > 0 && (
          <div className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
            {matches.map((m) => (
              <button key={m.tableName} onClick={() => { setSel(m.tableName); setQ(""); setActive(null); }}
                className="flex w-full items-center gap-3 px-3 py-2.5 text-start transition-colors hover:bg-brand/5">
                <span className="tech shrink-0 text-sm font-bold text-brand"><Highlight text={m.tableName} query={q} /></span>
                <span className="min-w-0 flex-1 truncate text-sm text-slate-500"><Highlight text={m.descriptionHe || m.descriptionEn} query={q} /></span>
                <span className="shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold text-white" style={{ background: mc(m.module) }}>{m.module}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {!g || !t ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-400">בחר אובייקט להצגת שושלת הנתונים.</div>
      ) : (
        <>
          {/* summary band */}
          <motion.div initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-gradient-to-l from-slate-50 to-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl text-white shadow-lg" style={{ background: mc(t.module), boxShadow: `0 8px 20px ${mc(t.module)}55` }}><Database className="size-6" /></span>
              <div>
                <div className="flex items-center gap-2"><span className="tech text-xl font-extrabold text-slate-900" dir="ltr">{t.tableName}</span><span className="rounded-md px-1.5 py-0.5 text-[10px] font-bold text-white" style={{ background: mc(t.module) }}>{t.module}</span></div>
                <p className="text-xs text-slate-500">{t.descriptionHe || t.descriptionEn}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Stat n={g.upstream.length} label="מקורות" />
              <Stat n={g.downstream.length} label="צרכנים" />
              <Link href={`/object/${encodeURIComponent(t.tableName)}/`} className="lift inline-flex items-center gap-1.5 self-center rounded-xl bg-brand px-3 py-2 text-xs font-bold text-brand-foreground shadow-lg shadow-brand/30">סביבת עבודה<ArrowLeft className="size-3.5" /></Link>
            </div>
          </motion.div>

          {/* lineage flow */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-[radial-gradient(circle_at_1px_1px,#e2e8f0_1px,transparent_0)] [background-size:20px_20px] p-2">
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ minWidth: 620, maxHeight: 460 }}>
              <text x={colX.src} y={22} textAnchor="middle" style={{ font: "800 10px sans-serif", fill: "#94a3b8", letterSpacing: "1.5px" }}>מקור · SOURCE</text>
              <text x={cx} y={22} textAnchor="middle" style={{ font: "800 10px sans-serif", fill: "#94a3b8", letterSpacing: "1.5px" }}>אובייקט · OBJECT</text>
              <text x={colX.con} y={22} textAnchor="middle" style={{ font: "800 10px sans-serif", fill: "#94a3b8", letterSpacing: "1.5px" }}>צרכן · CONSUMER</text>
              {/* source → object edges */}
              {sources.map((n, i) => { const y = yFor(i, sources.length); const x1 = colX.src + NW / 2, x2 = cx - NW / 2, mx = (x1 + x2) / 2; const on = !active || active === n; const col = mc(tableByName(n)?.module); return (
                <g key={"s" + n} style={{ opacity: on ? 1 : 0.18, transition: "opacity .25s" }}>
                  <path d={`M${x1},${y} C${mx},${y} ${mx},${cy} ${x2},${cy}`} fill="none" stroke={col} strokeWidth={active === n ? 2.6 : 1.6} strokeOpacity={0.7} strokeDasharray="6 5">{!reduce && <animate attributeName="stroke-dashoffset" from="0" to="-110" dur="3s" repeatCount="indefinite" />}</path>
                  <path d={`M${x2 - 8},${cy - 4} L${x2},${cy} L${x2 - 8},${cy + 4}`} fill="none" stroke={col} strokeWidth={1.6} />
                </g>); })}
              {/* object → consumer edges */}
              {consumers.map((n, i) => { const y = yFor(i, consumers.length); const x1 = cx + NW / 2, x2 = colX.con - NW / 2, mx = (x1 + x2) / 2; const on = !active || active === n; const col = mc(tableByName(n)?.module); return (
                <g key={"c" + n} style={{ opacity: on ? 1 : 0.18, transition: "opacity .25s" }}>
                  <path d={`M${x1},${cy} C${mx},${cy} ${mx},${y} ${x2},${y}`} fill="none" stroke={col} strokeWidth={active === n ? 2.6 : 1.6} strokeOpacity={0.7} strokeDasharray="6 5">{!reduce && <animate attributeName="stroke-dashoffset" from="0" to="-110" dur="3s" repeatCount="indefinite" />}</path>
                  <path d={`M${x2 - 8},${y - 4} L${x2},${y} L${x2 - 8},${y + 4}`} fill="none" stroke={col} strokeWidth={1.6} />
                </g>); })}
              {sources.map((n, i) => <Node key={n} x={colX.src} y={yFor(i, sources.length)} label={n} module={tableByName(n)?.module || "?"} exists={!!tableByName(n)} />)}
              {consumers.map((n, i) => <Node key={n} x={colX.con} y={yFor(i, consumers.length)} label={n} module={tableByName(n)?.module || "?"} exists={!!tableByName(n)} />)}
              <Node x={cx} y={cy} label={t.tableName} module={t.module} exists center />
            </svg>
            <div className="flex items-center justify-between gap-2 px-2 pb-1 pt-2">
              <span className="text-[11px] font-semibold text-slate-500">{active ? <>נתיב מסומן: <span className="tech font-bold text-slate-700" dir="ltr">{active}</span> ↔ {t.tableName}</> : "לחץ על צומת כדי לסמן את הנתיב"}</span>
              {active && <button onClick={() => setActive(null)} className="tap rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-brand hover:border-brand">נקה סימון</button>}
            </div>
          </div>

          {/* producers / analytics strips */}
          <div className="grid-adaptive-sm">
            <Strip icon={<Terminal className="size-4" />} title="מתחזק (T-Codes)" items={producers} tone="#0f766e" hrefFn={(c) => `/tcode/${encodeURIComponent(c)}/`} />
            <Strip icon={<Boxes className="size-4" />} title="ממשקים (BAPI/FM)" items={bapis} tone="#6d28d9" />
            <Strip icon={<LayoutGrid className="size-4" />} title="צריכה אנליטית (CDS)" items={cds} tone="#0891b2" hrefFn={(c) => `/cds/${encodeURIComponent(c)}/`} />
          </div>
        </>
      )}
    </div>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return <span className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-center shadow-sm"><span className="block text-xl font-extrabold text-slate-900 tabular-nums">{n}</span><span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</span></span>;
}

function Strip({ icon, title, items, tone, hrefFn }: { icon: React.ReactNode; title: string; items: string[]; tone: string; hrefFn?: (s: string) => string }) {
  return (
    <div className="card-premium p-4">
      <h3 className="mb-2 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wide" style={{ color: tone }}>{icon}{title}<span className="text-slate-300">· {items.length}</span></h3>
      {items.length ? (
        <div className="flex flex-wrap gap-1.5">{items.slice(0, 10).map((it) => hrefFn ? (
          <Link key={it} href={hrefFn(it)} className="tech rounded-md border bg-slate-50 px-2 py-0.5 text-[11px] font-bold text-slate-600 transition hover:text-brand" style={{ borderColor: tone + "44" }} dir="ltr">{it}</Link>
        ) : (
          <span key={it} className="tech rounded-md border border-dashed border-slate-200 bg-white px-2 py-0.5 text-[11px] font-bold text-slate-500" dir="ltr">{it}</span>
        ))}</div>
      ) : <p className="text-[11px] text-slate-400">—</p>}
    </div>
  );
}
