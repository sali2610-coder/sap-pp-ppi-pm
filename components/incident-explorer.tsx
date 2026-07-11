"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowLeft, ShieldAlert } from "lucide-react";
import { INCIDENTS, type Incident } from "@/data/troubleshooting";

const MOD_COLOR: Record<string, string> = { PM: "#f97316", PP: "#2563eb", "PP-PI": "#6d28d9", Cross: "#475569" };
const MODULES: (Incident["module"] | "ALL")[] = ["ALL", "PM", "PP", "PP-PI", "Cross"];
const MOD_HE: Record<string, string> = { ALL: "הכל", PM: "אחזקה", PP: "ייצור", "PP-PI": "תהליכי", Cross: "חוצה" };

export function IncidentExplorer() {
  const [q, setQ] = useState("");
  const [mod, setMod] = useState<(typeof MODULES)[number]>("ALL");
  const rows = useMemo(() => {
    const t = q.trim().toLowerCase();
    return INCIDENTS.filter((i) => (mod === "ALL" || i.module === mod) &&
      (!t || i.he.includes(q) || i.symptom.includes(q) || (i.error || "").toLowerCase().includes(t) || i.analyzeTcodes.some((c) => c.toLowerCase().includes(t))));
  }, [q, mod]);
  return (
    <div dir="rtl">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-2xl border border-hairline bg-surface px-4 py-2.5 shadow-sm">
          <Search className="size-4 text-brand" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש תקלה · תסמין · קוד שגיאה · T-Code…" className="w-full bg-transparent text-sm outline-none placeholder:text-ink-3" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {MODULES.map((m) => <button key={m} onClick={() => setMod(m)} className={`rounded-xl px-3 py-2 text-xs font-bold transition ${mod === m ? "text-white shadow-sm" : "bg-surface-2 text-ink-3 hover:bg-hairline"}`} style={mod === m ? { background: m === "ALL" ? "#d62027" : MOD_COLOR[m] } : undefined}>{MOD_HE[m]}</button>)}
        </div>
      </div>
      <p className="mb-2 text-xs font-bold text-ink-3">{rows.length} תקלות</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {rows.map((i) => (
          <Link key={i.slug} href={`/troubleshooting/${i.slug}/`} className="lift group rounded-2xl border border-hairline bg-surface p-4 shadow-sm">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-lg bg-red-50"><ShieldAlert className="size-4 text-red-500" /></span>
              <span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: MOD_COLOR[i.module] }}>{i.module}</span>
              <ArrowLeft className="ms-auto size-3.5 text-ink-3 transition group-hover:-translate-x-1 group-hover:text-brand" />
            </div>
            <h3 className="text-sm font-extrabold tracking-tight text-ink-1">{i.he}</h3>
            <p className="mt-1 line-clamp-2 text-[12px] leading-snug text-ink-3">{i.symptom}</p>
            {i.error && i.error !== "—" && <p className="tech mt-1.5 rounded bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-600" dir="ltr">{i.error}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}
