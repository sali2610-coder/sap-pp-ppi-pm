"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowLeft, GitBranch, Database, Activity, ShieldAlert } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Highlight } from "@/components/highlight";

export interface TableRow { name: string; module: string; he: string; s4: string; rel: number; tc: number; cds?: string }

const MOD_COLOR: Record<string, string> = { PM: "#f97316", "PP-PI": "#6d28d9" };
const MODULES = ["ALL", "PM", "PP-PI"] as const;

export function TablesExplorer({ rows }: { rows: TableRow[] }) {
  const [q, setQ] = useState("");
  const [mod, setMod] = useState<(typeof MODULES)[number]>("ALL");
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return rows.filter((r) => (mod === "ALL" || r.module === mod) && (!t || r.name.toLowerCase().includes(t) || r.he.includes(q)))
      .sort((a, b) => a.module.localeCompare(b.module) || a.name.localeCompare(b.name));
  }, [q, mod, rows]);
  const stats = useMemo(() => {
    const high = list.filter((r) => r.rel >= 6).length;
    const avg = list.length ? (list.reduce((a, r) => a + r.rel, 0) / list.length) : 0;
    return { total: list.length, high, avg: avg.toFixed(1) };
  }, [list]);

  return (
    <div dir="rtl">
      {/* executive summary band */}
      <div className="mb-4 grid grid-cols-3 gap-3">
        {[
          { icon: <Database className="size-4" />, v: stats.total, l: "טבלאות בהיקף", c: "#0891b2" },
          { icon: <ShieldAlert className="size-4" />, v: stats.high, l: "השפעה גבוהה (≥6)", c: "#d62027" },
          { icon: <Activity className="size-4" />, v: stats.avg, l: "ממוצע קשרים", c: "#6d28d9" },
        ].map((k) => (
          <div key={k.l} className="surface flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-[var(--elev-1)]">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl text-white shadow-sm" style={{ background: k.c }}>{k.icon}</span>
            <div><div className="text-2xl font-extrabold tabular-nums text-slate-900">{k.v}</div><div className="text-[11px] font-semibold text-slate-400">{k.l}</div></div>
          </div>
        ))}
      </div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
          <Search className="size-4 text-brand" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש טבלה · תיאור…" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
        </div>
        <div className="flex gap-1.5">{MODULES.map((m) => <button key={m} onClick={() => setMod(m)} className={`rounded-xl px-3 py-2 text-xs font-bold transition ${mod === m ? "text-white shadow-sm" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`} style={mod === m ? { background: m === "ALL" ? "#d62027" : MOD_COLOR[m] } : undefined}>{m === "ALL" ? "הכל" : m}</button>)}</div>
      </div>
      <p className="mb-2 text-xs font-bold text-slate-400">{list.length} טבלאות</p>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-slate-50 text-xs font-bold text-slate-500">
            <tr><th className="p-3 text-start">טבלה</th><th className="p-3 text-start">תיאור</th><th className="p-3 text-center">מודול</th><th className="p-3 text-center">קשרים</th><th className="p-3 text-start">ECC ↔ S/4</th><th className="p-3"></th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {list.map((r) => (
              <tr key={r.name} className="group hover:bg-slate-50/60">
                <td className="p-3 align-top"><Link href={`/object/${encodeURIComponent(r.name)}/`} className="tech font-extrabold text-brand hover:underline" dir="ltr"><Highlight text={r.name} query={q} /></Link>{r.cds && <div className="tech text-[10px] font-bold text-green-600" dir="ltr">CDS: <Highlight text={r.cds} query={q} /></div>}</td>
                <td className="p-3 align-top text-[12px] leading-snug text-slate-600"><Highlight text={r.he} query={q} /></td>
                <td className="p-3 text-center align-top"><span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: MOD_COLOR[r.module] || "#64748b" }}>{r.module}</span></td>
                <td className="p-3 text-center align-top"><span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold ${r.rel >= 6 ? "bg-amber-100 text-amber-700" : "text-slate-500"}`}>{r.rel >= 6 && "★"}<GitBranch className="size-3" />{r.rel}</span></td>
                <td className="p-3 align-top text-[11px] leading-snug text-slate-500">{r.s4 || "ללא שינוי מהותי"}</td>
                <td className="p-3 align-top"><Link href={`/object/${encodeURIComponent(r.name)}/`} className="inline-flex items-center gap-1 text-[11px] font-bold text-brand opacity-0 transition group-hover:opacity-100">מפת קשרים<ArrowLeft className="size-3" /></Link></td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && <EmptyState title="לא נמצאו טבלאות" hint="נסה מונח חיפוש אחר או נקה את סינון המודול" suggestions={[{ label: "נקה חיפוש", onClick: () => setQ("") }, { label: "כל המודולים", onClick: () => setMod("ALL") }]} />}
      </div>
    </div>
  );
}
