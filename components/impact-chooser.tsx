"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Gauge, Search, ArrowLeft } from "lucide-react";
import { ALL_TABLES } from "@/lib/data";

const MOD_COLOR: Record<string, string> = { PM: "#f97316", "PP-PI": "#6d28d9", PP: "#6d28d9" };
const CORE = ["AUFK", "AFKO", "QMEL", "EQUI", "IFLOT", "MARA", "AFRU", "JEST", "MCH1", "RESB"];

export function ImpactChooser() {
  const [q, setQ] = useState("");
  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    const list = ALL_TABLES.map((t) => ({ name: t.tableName, module: t.module, he: t.descriptionHe || t.descriptionEn }));
    if (!s) return list.filter((r) => CORE.includes(r.name));
    return list.filter((r) => r.name.toLowerCase().includes(s) || r.he.toLowerCase().includes(s)).slice(0, 40);
  }, [q]);

  return (
    <div className="mx-auto max-w-3xl space-y-5" dir="rtl">
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-slate-900 to-slate-800 p-7 text-white shadow-lg">
        <div className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60"><Gauge className="size-4" />Impact & Dependency Center</div>
          <h1 className="mt-1 text-3xl font-extrabold">ניתוח השפעה ותלויות</h1>
          <p className="mt-1.5 max-w-xl text-sm text-white/75">בחר אובייקט לניתוח השפעה ומיגרציה מלא — תלויות, T-Codes, BAPIs, CDS, חלופת S/4, ציון השפעה ותקלות קשורות. הכול במקום אחד, בלי לפתוח SAP.</p>
        </div>
      </header>

      <div className="relative">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חפש טבלה (AUFK, QMEL, MARA…) או תיאור" className="w-full rounded-2xl border border-slate-200 bg-white py-3 pe-4 ps-10 text-sm font-medium shadow-sm outline-none focus:border-brand/40" />
        <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-slate-300" />
      </div>

      {!q && <p className="text-xs font-bold text-slate-400">אובייקטי ליבה לניתוח מהיר:</p>}
      <div className="grid gap-2 sm:grid-cols-2">
        {rows.map((r) => {
          const c = MOD_COLOR[r.module] || "#64748b";
          return (
            <Link key={r.name} href={`/impact/${encodeURIComponent(r.name)}/`} className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md active:scale-[.99]">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl font-mono text-[11px] font-extrabold text-white" style={{ background: c }} dir="ltr">{r.module === "PP-PI" ? "PP" : r.module}</span>
              <span className="min-w-0 flex-1"><span className="tech block font-mono text-sm font-extrabold text-slate-900" dir="ltr">{r.name}</span><span className="block truncate text-xs text-slate-500">{r.he}</span></span>
              <ArrowLeft className="size-4 shrink-0 text-slate-300 transition group-hover:text-brand" />
            </Link>
          );
        })}
        {rows.length === 0 && <p className="col-span-full py-6 text-center text-sm text-slate-400">לא נמצאו תוצאות.</p>}
      </div>
    </div>
  );
}
