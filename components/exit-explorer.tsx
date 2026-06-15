"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowLeft } from "lucide-react";
import { EXITS, exitSlug, type Exit } from "@/data/exits";

const MOD_COLOR: Record<string, string> = { PM: "#f97316", PP: "#2563eb", "PP-PI": "#6d28d9", Cross: "#475569" };
const KIND_COLOR: Record<string, string> = { "User Exit": "#d97706", "Customer Exit": "#d97706", BAdI: "#7c3aed", "Enhancement Spot": "#2563eb", BTE: "#0891b2" };
const MODULES: (Exit["module"] | "ALL")[] = ["ALL", "PM", "PP", "PP-PI", "Cross"];
const MOD_HE: Record<string, string> = { ALL: "הכל", PM: "אחזקה (PM)", PP: "ייצור (PP)", "PP-PI": "תהליכי (PP-PI)", Cross: "חוצה-מודול" };

export function ExitExplorer() {
  const [q, setQ] = useState("");
  const [mod, setMod] = useState<(typeof MODULES)[number]>("ALL");
  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return EXITS.filter((e) => (mod === "ALL" || e.module === mod) &&
      (!term || e.name.toLowerCase().includes(term) || e.he.includes(q) || e.purpose.includes(q) || (e.tcodes || []).some((t) => t.toLowerCase().includes(term))))
      .sort((a, b) => a.module.localeCompare(b.module) || a.name.localeCompare(b.name));
  }, [q, mod]);
  return (
    <div dir="rtl">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
          <Search className="size-4 text-brand" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש Exit/BAdI · מטרה · T-Code…" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {MODULES.map((m) => (
            <button key={m} onClick={() => setMod(m)} className={`rounded-xl px-3 py-2 text-xs font-bold transition ${mod === m ? "text-white shadow-sm" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`} style={mod === m ? { background: m === "ALL" ? "#d62027" : MOD_COLOR[m] } : undefined}>{MOD_HE[m]}</button>
          ))}
        </div>
      </div>
      <p className="mb-2 text-xs font-bold text-slate-400">{rows.length} Exits / BAdIs</p>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[820px] text-sm">
          <thead className="bg-slate-50 text-xs font-bold text-slate-500">
            <tr><th className="p-3 text-start">שם</th><th className="p-3 text-center">סוג</th><th className="p-3 text-start">מטרה</th><th className="p-3 text-start">נקודת הפעלה</th><th className="p-3 text-center">מודול</th><th className="p-3"></th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((e) => (
              <tr key={e.name} className="group hover:bg-slate-50/60">
                <td className="p-3 align-top"><Link href={`/exits/${exitSlug(e.name)}/`} className="tech font-extrabold text-brand hover:underline" dir="ltr">{e.name}</Link></td>
                <td className="p-3 text-center align-top"><span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: KIND_COLOR[e.kind] }}>{e.kind}</span></td>
                <td className="p-3 align-top text-[12px] leading-snug text-slate-600">{e.he}</td>
                <td className="p-3 align-top text-[11px] leading-snug text-slate-500">{e.trigger}</td>
                <td className="p-3 text-center align-top"><span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: MOD_COLOR[e.module] }}>{e.module}</span></td>
                <td className="p-3 align-top"><Link href={`/exits/${exitSlug(e.name)}/`} className="inline-flex items-center gap-1 text-[11px] font-bold text-brand opacity-0 transition group-hover:opacity-100">פתח<ArrowLeft className="size-3" /></Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
