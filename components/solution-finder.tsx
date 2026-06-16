"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowLeft, Lightbulb } from "lucide-react";
import { SOLUTIONS } from "@/data/solutions";

const CX: Record<string, string> = { Low: "#16a34a", Medium: "#d97706", High: "#dc2626" };

export function SolutionFinder() {
  const [q, setQ] = useState("");
  const rows = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return SOLUTIONS;
    const terms = t.split(/\s+/);
    return SOLUTIONS.filter((s) => { const blob = `${s.he} ${s.title} ${s.process} ${s.keywords.join(" ")} ${s.domain} ${s.eccTcodes.join(" ")}`.toLowerCase(); return terms.every((tm) => blob.includes(tm)); });
  }, [q]);
  return (
    <div dir="rtl">
      <div className="flex items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-brand">
        <Search className="size-5 text-brand" />
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="מה צריך לעשות? — חיפוש לפי דרישה עסקית (stock · batch · maintenance · production order · quality · idoc · authorization · workflow)" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {["stock", "inventory", "batch", "maintenance", "production order", "quality", "idoc", "authorization", "workflow", "MRP"].map((s) => (
          <button key={s} onClick={() => setQ(s)} className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-500 hover:border-brand hover:text-brand">{s}</button>
        ))}
      </div>
      <p className="mb-3 mt-4 text-xs font-bold text-slate-400">{rows.length} פתרונות</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((s) => (
          <Link key={s.slug} href={`/solutions/${s.slug}/`} className="lift card-premium group block p-5">
            <div className="flex items-start justify-between gap-2">
              <Lightbulb className="size-5 text-amber-500" />
              <span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: CX[s.complexity] }}>מורכבות {s.complexity}</span>
            </div>
            <h3 className="mt-2 text-base font-extrabold tracking-tight text-slate-900">{s.he}</h3>
            <p className="tech text-xs font-bold text-slate-400" dir="ltr">{s.title}</p>
            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500">{s.process}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand">פתרון מלא<ArrowLeft className="size-3.5 rotate-180 transition-transform group-hover:-translate-x-1" /></span>
          </Link>
        ))}
      </div>
    </div>
  );
}
