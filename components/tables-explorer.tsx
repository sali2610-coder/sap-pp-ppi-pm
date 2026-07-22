"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowLeft, GitBranch, Database, Activity, ShieldAlert } from "lucide-react";
import { SwipeRow } from "@/components/swipe-row";
import { EmptyState } from "@/components/ui/empty-state";
import { Highlight } from "@/components/highlight";
import { pillInk } from "@/lib/pill-ink";

export interface TableRow { name: string; module: string; he: string; s4: string; rel: number; tc: number; cds?: string }

const MOD_COLOR: Record<string, string> = { PM: "#f97316", "PP-PI": "#6d28d9" };
const MODULES = ["ALL", "PM", "PP-PI"] as const;

export function TablesExplorer({ rows }: { rows: TableRow[] }) {
  const [q, setQ] = useState("");
  const [mod, setMod] = useState<(typeof MODULES)[number]>("ALL");
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return rows.filter((r) => (mod === "ALL" || r.module.split(" · ").includes(mod)) && (!t || r.name.toLowerCase().includes(t) || r.he.includes(q)))
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
          <div key={k.l} className="surface flex items-center gap-3 rounded-2xl border border-hairline bg-surface p-4 shadow-[var(--elev-1)]">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl text-white shadow-sm" style={{ background: k.c }}>{k.icon}</span>
            <div><div className="text-2xl font-extrabold tabular-nums text-ink-1">{k.v}</div><div className="text-[11px] font-semibold text-ink-3">{k.l}</div></div>
          </div>
        ))}
      </div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-2xl border border-hairline bg-surface px-4 py-2.5 shadow-sm">
          <Search className="size-4 text-brand" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש טבלה · תיאור…" className="w-full bg-transparent text-sm outline-none placeholder:text-ink-3" />
        </div>
        <div className="flex gap-1.5">{MODULES.map((m) => <button key={m} onClick={() => setMod(m)} className={`rounded-xl px-3 py-2 text-xs font-bold transition ${mod === m ? "text-white shadow-sm" : "bg-surface-2 text-ink-3 hover:bg-hairline"}`} style={mod === m ? { background: m === "ALL" ? "#d62027" : MOD_COLOR[m] } : undefined}>{m === "ALL" ? "הכל" : m}</button>)}</div>
      </div>
      <p className="mb-2 text-xs font-bold text-ink-3">{list.length} טבלאות</p>

      {list.length === 0 ? (
        <EmptyState title="לא נמצאו טבלאות" hint="נסה מונח חיפוש אחר או נקה את סינון המודול" suggestions={[{ label: "נקה חיפוש", onClick: () => setQ("") }, { label: "כל המודולים", onClick: () => setMod("ALL") }]} />
      ) : (
        <>
          {/* mobile: native card list (no horizontal scroll) · swipe a row to favorite */}
          <div className="space-y-2.5 lg:hidden">
            {list.map((r) => (
              <SwipeRow key={r.name} name={r.name}>
              <Link href={`/object/${encodeURIComponent(r.name)}/`} data-peek={r.name} className="tap block rounded-2xl border border-hairline bg-surface p-3.5 shadow-sm transition active:scale-[0.98]">
                <div className="flex items-start justify-between gap-2">
                  <span className="tech text-[15px] font-extrabold text-brand" dir="ltr"><Highlight text={r.name} query={q} /></span>
                  <span className="flex shrink-0 flex-wrap justify-end gap-1">{r.module.split(" · ").map((m) => <span key={m} className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: MOD_COLOR[m] || "#64748b", color: pillInk(MOD_COLOR[m] || "#64748b") }}>{m}</span>)}</span>
                </div>
                {r.he && <p className="mt-1 text-[12.5px] leading-snug text-ink-2"><Highlight text={r.he} query={q} /></p>}
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold ${r.rel >= 6 ? "bg-amber-100 text-amber-700" : "bg-surface-2 text-ink-3"}`}>{r.rel >= 6 && "★"}<GitBranch className="size-3" />{r.rel}</span>
                  {r.cds && <span className="tech rounded-md bg-green-50 px-1.5 py-0.5 text-[10.5px] font-bold text-green-600" dir="ltr">CDS: <Highlight text={r.cds} query={q} /></span>}
                  <ArrowLeft className="ms-auto size-4 text-ink-3" />
                </div>
                {r.s4 && <p className="mt-1.5 text-[11px] leading-snug text-ink-3">{r.s4}</p>}
              </Link>
              </SwipeRow>
            ))}
          </div>

          {/* desktop: full table */}
          <div className="hidden overflow-x-auto rounded-2xl border border-hairline bg-surface shadow-sm lg:block">
            <table className="w-full min-w-[760px] text-sm">
              <thead className="bg-surface-2 text-xs font-bold text-ink-3">
                <tr><th className="p-3 text-start">טבלה</th><th className="p-3 text-start">תיאור</th><th className="p-3 text-center">מודול</th><th className="p-3 text-center">קשרים</th><th className="p-3 text-start">ECC ↔ S/4</th><th className="p-3"></th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {list.map((r) => (
                  <tr key={r.name} className="group hover:bg-surface-2/60">
                    <td className="p-3 align-top"><Link href={`/object/${encodeURIComponent(r.name)}/`} className="tech font-extrabold text-brand hover:underline" dir="ltr"><Highlight text={r.name} query={q} /></Link>{r.cds && <div className="tech text-[10px] font-bold text-green-600" dir="ltr">CDS: <Highlight text={r.cds} query={q} /></div>}</td>
                    <td className="p-3 align-top text-[12px] leading-snug text-ink-2"><Highlight text={r.he} query={q} /></td>
                    <td className="p-3 text-center align-top"><span className="inline-flex flex-wrap justify-center gap-1">{r.module.split(" · ").map((m) => <span key={m} className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: MOD_COLOR[m] || "#64748b", color: pillInk(MOD_COLOR[m] || "#64748b") }}>{m}</span>)}</span></td>
                    <td className="p-3 text-center align-top"><span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold ${r.rel >= 6 ? "bg-amber-100 text-amber-700" : "text-ink-3"}`}>{r.rel >= 6 && "★"}<GitBranch className="size-3" />{r.rel}</span></td>
                    <td className="p-3 align-top text-[11px] leading-snug text-ink-3">{r.s4 || "ללא שינוי מהותי"}</td>
                    <td className="p-3 align-top"><Link href={`/object/${encodeURIComponent(r.name)}/`} className="inline-flex items-center gap-1 text-[11px] font-bold text-brand opacity-0 transition group-hover:opacity-100">מפת קשרים<ArrowLeft className="size-3" /></Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
