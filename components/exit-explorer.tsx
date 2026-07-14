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
        <div className="flex flex-1 items-center gap-2 rounded-2xl border border-hairline bg-surface px-4 py-2.5 shadow-sm">
          <Search className="size-4 text-brand" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש Exit/BAdI · מטרה · T-Code…" className="w-full bg-transparent text-sm outline-none placeholder:text-ink-3" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {MODULES.map((m) => (
            <button key={m} onClick={() => setMod(m)} className={`rounded-xl px-3 py-2 text-xs font-bold transition ${mod === m ? "text-white shadow-sm" : "bg-surface-2 text-ink-3 hover:bg-hairline"}`} style={mod === m ? { background: m === "ALL" ? "#d62027" : MOD_COLOR[m] } : undefined}>{MOD_HE[m]}</button>
          ))}
        </div>
      </div>
      <p className="mb-2 text-xs font-bold text-ink-3">{rows.length} Exits / BAdIs</p>

      {/* mobile: native card list */}
      <div className="space-y-2.5 lg:hidden">
        {rows.map((e) => (
          <Link key={e.name} href={`/exits/${exitSlug(e.name)}/`}
            className="tap block rounded-2xl border border-hairline bg-surface p-3.5 shadow-sm transition active:scale-[0.98]">
            <div className="flex items-start justify-between gap-2">
              <span className="tech text-[14px] font-extrabold text-brand" dir="ltr">{e.name}</span>
              <span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: MOD_COLOR[e.module] }}>{e.module}</span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              <span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: KIND_COLOR[e.kind] }}>{e.kind}</span>
            </div>
            <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-snug text-ink-2">{e.he}</p>
            {e.trigger && <p className="mt-1 text-[11px] leading-snug text-ink-3">נקודת הפעלה: {e.trigger}</p>}
            <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-brand">פתח<ArrowLeft className="size-3" /></span>
          </Link>
        ))}
        {rows.length === 0 && <p className="py-12 text-center text-[13px] text-ink-3">לא נמצאו Exits/BAdIs תואמים.</p>}
      </div>

      {/* desktop: table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-hairline bg-surface shadow-sm lg:block">
        <table className="w-full min-w-[820px] text-sm">
          <thead className="bg-surface-2 text-xs font-bold text-ink-3">
            <tr><th className="p-3 text-start">שם</th><th className="p-3 text-center">סוג</th><th className="p-3 text-start">מטרה</th><th className="p-3 text-start">נקודת הפעלה</th><th className="p-3 text-center">מודול</th><th className="p-3"></th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((e) => (
              <tr key={e.name} className="group hover:bg-surface-2/60">
                <td className="p-3 align-top"><Link href={`/exits/${exitSlug(e.name)}/`} className="tech font-extrabold text-brand hover:underline" dir="ltr">{e.name}</Link></td>
                <td className="p-3 text-center align-top"><span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: KIND_COLOR[e.kind] }}>{e.kind}</span></td>
                <td className="p-3 align-top text-[12px] leading-snug text-ink-2">{e.he}</td>
                <td className="p-3 align-top text-[11px] leading-snug text-ink-3">{e.trigger}</td>
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
