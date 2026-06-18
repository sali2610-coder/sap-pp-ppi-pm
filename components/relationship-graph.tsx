"use client";

import { useMemo, useState } from "react";
import { kgraph, tableByName } from "@/lib/knowledge-graph";

const MOD_COLOR: Record<string, string> = { PM: "#f97316", "PP-PI": "#6d28d9", PP: "#6d28d9", QM: "#0d9488" };
const mc = (m: string) => MOD_COLOR[m] || "#64748b";
const RED = "#d62027";

// Centered upstream → OBJECT → downstream relationship map (Object-page graph).
// Reused by the Object workspace and the Data Model explorer for one visual language.
export function RelationshipGraph({ name, onGo }: { name: string; onGo: (n: string) => void }) {
  const g = useMemo(() => kgraph(name), [name]);
  const [exp, setExp] = useState(false);
  if (!g) return <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-400" dir="rtl">אין מפת קשרים זמינה לאובייקט זה.</div>;
  const CAP = 8;
  const up = exp ? g.upstream : g.upstream.slice(0, CAP);
  const down = exp ? g.downstream : g.downstream.slice(0, CAP);
  const upMore = g.upstream.length - up.length, downMore = g.downstream.length - down.length;
  const cardUp = (n: string) => g.edges.find((e) => e.from === n && e.to === g.center.tableName)?.card || "1:N";
  const cardDown = (n: string) => g.edges.find((e) => e.from === g.center.tableName && e.to === n)?.card || "1:N";
  const W = 820, rowH = 64, padY = 48;
  const H = Math.max(up.length, down.length, 1) * rowH + padY * 2;
  const cx = W / 2, cy = H / 2;
  const colX = { up: 140, down: W - 140 };
  const yFor = (i: number, n: number) => padY + (H - padY * 2) * (n === 1 ? 0.5 : i / (n - 1));
  const NW = 168, NH = 50;
  const c = mc(g.center.module);

  const Node = ({ x, y, label, module, exists, center }: { x: number; y: number; label: string; module: string; exists: boolean; center?: boolean }) => {
    const col = center ? RED : mc(module);
    return (
      <g transform={`translate(${x - NW / 2},${y - NH / 2})`} style={{ cursor: exists ? "pointer" : "default" }} onClick={() => exists && onGo(label)}>
        <rect width={NW} height={NH} rx={13} fill="#fff" stroke={col} strokeWidth={center ? 2.5 : 1.6} style={{ filter: center ? `drop-shadow(0 10px 20px ${col}44)` : "drop-shadow(0 6px 14px rgba(15,23,42,.10))" }} />
        <rect width={5} height={NH} rx={2.5} fill={col} />
        <text x={NW / 2 + 5} y={NH / 2 - 3} textAnchor="middle" style={{ font: "800 15px ui-monospace", fill: "#0f172a" }}>{label}</text>
        <text x={NW / 2 + 5} y={NH / 2 + 13} textAnchor="middle" style={{ font: "700 9px sans-serif", letterSpacing: ".06em", fill: col }}>{center ? "CENTER" : module}</text>
      </g>
    );
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-[radial-gradient(circle_at_1px_1px,#e2e8f0_1px,transparent_0)] [background-size:22px_22px] p-2">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ minWidth: 620, maxHeight: 460 }}>
        <text x={colX.up} y={22} textAnchor="middle" style={{ font: "800 10px sans-serif", fill: "#94a3b8", letterSpacing: "2px" }}>UPSTREAM →</text>
        <text x={cx} y={22} textAnchor="middle" style={{ font: "800 10px sans-serif", fill: "#94a3b8", letterSpacing: "2px" }}>OBJECT</text>
        <text x={colX.down} y={22} textAnchor="middle" style={{ font: "800 10px sans-serif", fill: "#94a3b8", letterSpacing: "2px" }}>← DOWNSTREAM</text>
        {up.map((n, i) => { const y = yFor(i, up.length); const x1 = colX.up + NW / 2, x2 = cx - NW / 2, mx = (x1 + x2) / 2; const my = (y + cy) / 2; return (
          <g key={"u" + n}><path d={`M${x1},${y} C${mx},${y} ${mx},${cy} ${x2},${cy}`} fill="none" stroke={c} strokeWidth={1.7} strokeOpacity={0.6} strokeDasharray="6 5"><animate attributeName="stroke-dashoffset" from="0" to="-110" dur="3s" repeatCount="indefinite" /></path>
            <path d={`M${x2 - 8},${cy - 4} L${x2},${cy} L${x2 - 8},${cy + 4}`} fill="none" stroke={c} strokeWidth={1.7} />
            <rect x={mx - 16} y={my - 8} width={32} height={16} rx={5} fill="#fff" stroke={c} strokeOpacity={0.4} /><text x={mx} y={my + 3.5} textAnchor="middle" style={{ font: "800 9px ui-monospace", fill: c }}>{cardUp(n)}</text></g>); })}
        {down.map((n, i) => { const y = yFor(i, down.length); const x1 = cx + NW / 2, x2 = colX.down - NW / 2, mx = (x1 + x2) / 2; const my = (y + cy) / 2; const dc = mc(tableByName(n)?.module || "?"); return (
          <g key={"d" + n}><path d={`M${x1},${cy} C${mx},${cy} ${mx},${y} ${x2},${y}`} fill="none" stroke={dc} strokeWidth={1.7} strokeOpacity={0.6} strokeDasharray="6 5"><animate attributeName="stroke-dashoffset" from="0" to="-110" dur="3s" repeatCount="indefinite" /></path>
            <path d={`M${x2 - 8},${y - 4} L${x2},${y} L${x2 - 8},${y + 4}`} fill="none" stroke={dc} strokeWidth={1.7} />
            <rect x={mx - 16} y={my - 8} width={32} height={16} rx={5} fill="#fff" stroke={dc} strokeOpacity={0.4} /><text x={mx} y={my + 3.5} textAnchor="middle" style={{ font: "800 9px ui-monospace", fill: dc }}>{cardDown(n)}</text></g>); })}
        {up.map((n, i) => <Node key={n} x={colX.up} y={yFor(i, up.length)} label={n} module={tableByName(n)?.module || "?"} exists={!!tableByName(n)} />)}
        {down.map((n, i) => <Node key={n} x={colX.down} y={yFor(i, down.length)} label={n} module={tableByName(n)?.module || "?"} exists={!!tableByName(n)} />)}
        <Node x={cx} y={cy} label={g.center.tableName} module={g.center.module} exists center />
      </svg>
      <div className="flex flex-wrap items-center justify-between gap-2 px-2 pb-1 pt-2">
        <span className="text-[11px] font-semibold text-slate-500">רדיוס השפעה (Blast radius): <span className="font-mono font-bold text-slate-700">{g.upstream.length}</span> מעלה · <span className="font-mono font-bold text-slate-700">{g.downstream.length}</span> מטה</span>
        {(upMore > 0 || downMore > 0 || exp) && (
          <button onClick={() => setExp((v) => !v)} className="tap rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-brand transition hover:border-brand">
            {exp ? "הצג פחות" : `הצג הכל (+${upMore + downMore})`}
          </button>
        )}
      </div>
    </div>
  );
}
