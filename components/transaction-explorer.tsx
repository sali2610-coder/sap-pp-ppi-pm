"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowLeft } from "lucide-react";
import { TRANSACTIONS, type Tcode } from "@/data/transactions";

const MOD_COLOR: Record<string, string> = { PM: "#f97316", PP: "#2563eb", "PP-PI": "#6d28d9" };
const MODULES: (Tcode["module"] | "ALL")[] = ["ALL", "PM", "PP", "PP-PI"];
const MOD_HE: Record<string, string> = { ALL: "הכל", PM: "אחזקה (PM)", PP: "ייצור (PP)", "PP-PI": "ייצור תהליכי (PP-PI)" };

function s4Summary(t: Tcode): string {
  const e = t.eccS4;
  if (e.replaced) return "מוחלף: " + e.replaced;
  if (e.deprecated) return "הוסר: " + e.deprecated;
  if (e.changed) return "משתנה: " + e.changed;
  if (e.fiori) return "Fiori: " + e.fiori;
  return e.unchanged || "—";
}

export function TransactionExplorer() {
  const [q, setQ] = useState("");
  const [mod, setMod] = useState<(typeof MODULES)[number]>("ALL");
  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return TRANSACTIONS.filter((t) => (mod === "ALL" || t.module === mod) &&
      (!term || t.code.toLowerCase().includes(term) || t.title.includes(q) || t.purpose.includes(q) || (t.objects || []).some((o) => o.toLowerCase().includes(term))))
      .sort((a, b) => a.module.localeCompare(b.module) || a.code.localeCompare(b.code));
  }, [q, mod]);

  return (
    <div dir="rtl">
      {/* controls */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-2xl border border-hairline bg-surface px-4 py-2.5 shadow-sm">
          <Search className="size-4 text-brand" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש T-Code · מטרה · אובייקט…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-ink-3" />
        </div>
        <div className="flex gap-1.5">
          {MODULES.map((m) => (
            <button key={m} onClick={() => setMod(m)}
              className={`rounded-xl px-3 py-2 text-xs font-bold transition ${mod === m ? "text-white shadow-sm" : "bg-surface-2 text-ink-3 hover:bg-hairline"}`}
              style={mod === m ? { background: m === "ALL" ? "#d62027" : MOD_COLOR[m] } : undefined}>{MOD_HE[m]}</button>
          ))}
        </div>
      </div>

      <p className="mb-2 text-xs font-bold text-ink-3">{rows.length} טרנזקציות</p>

      {/* mobile: native card list — long-press a T-Code to preview */}
      <div className="space-y-2.5 lg:hidden">
        {rows.map((t) => (
          <Link key={t.code} href={`/transactions/${encodeURIComponent(t.code)}/`} data-peek={t.code}
            className="tap block rounded-2xl border border-hairline bg-surface p-3.5 shadow-sm transition active:scale-[0.98]">
            <div className="flex items-start justify-between gap-2">
              <span className="tech text-[15px] font-extrabold text-brand" dir="ltr">{t.code}</span>
              <span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: MOD_COLOR[t.module] }}>{t.module}</span>
            </div>
            <div className="mt-0.5 text-[12px] font-bold text-ink-2">{t.title}</div>
            <p className="mt-1 line-clamp-2 text-[12.5px] leading-snug text-ink-3">{t.purpose}</p>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="rounded-md bg-surface-2 px-1.5 py-0.5 text-[10.5px] font-bold text-ink-3">{t.topic}</span>
              {t.fiori && <span className="rounded-md bg-violet-50 px-1.5 py-0.5 text-[10.5px] font-bold text-violet-600">Fiori</span>}
              <span className="ms-auto inline-flex items-center gap-1 text-[11px] font-bold text-brand">פתח<ArrowLeft className="size-3" /></span>
            </div>
          </Link>
        ))}
        {rows.length === 0 && <p className="py-12 text-center text-[13px] text-ink-3">לא נמצאו טרנזקציות תואמות.</p>}
      </div>

      {/* desktop: quick-reference table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-hairline bg-surface shadow-sm lg:block">
        <table className="w-full min-w-[860px] text-sm">
          <thead className="bg-surface-2 text-xs font-bold text-ink-3">
            <tr>
              <th className="p-3 text-start">T-Code</th>
              <th className="p-3 text-start">מטרה</th>
              <th className="p-3 text-start">מתי</th>
              <th className="p-3 text-center">מודול</th>
              <th className="p-3 text-start">ECC ↔ S/4</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((t) => (
              <tr key={t.code} className="group hover:bg-surface-2/60">
                <td className="p-3 align-top"><Link href={`/transactions/${encodeURIComponent(t.code)}/`} className="tech font-extrabold text-brand hover:underline" dir="ltr">{t.code}</Link><div className="text-[11px] font-semibold text-ink-3">{t.title}</div><div className="text-[10px] font-bold text-ink-3">{t.topic}</div></td>
                <td className="p-3 align-top text-[12px] leading-snug text-ink-2">{t.purpose}</td>
                <td className="p-3 align-top text-[12px] leading-snug text-ink-3">{t.whenToUse}</td>
                <td className="p-3 text-center align-top"><span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: MOD_COLOR[t.module] }}>{t.module}</span></td>
                <td className="p-3 align-top text-[11px] leading-snug text-ink-3">{s4Summary(t)}{t.fiori ? <span className="ms-1 rounded bg-violet-50 px-1.5 py-0.5 font-bold text-violet-600">Fiori</span> : null}</td>
                <td className="p-3 align-top"><Link href={`/transactions/${encodeURIComponent(t.code)}/`} className="inline-flex items-center gap-1 text-[11px] font-bold text-brand opacity-0 transition group-hover:opacity-100">פתח<ArrowLeft className="size-3" /></Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
