"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Terminal, Database, ShieldAlert, Boxes, FileCode2, LayoutGrid } from "lucide-react";
import type { SearchHit } from "@/lib/tcode-search";

const KIND = {
  tcode: { he: "T-Codes", icon: Terminal, color: "#0f766e" },
  table: { he: "טבלאות", icon: Database, color: "#0891b2" },
  error: { he: "שגיאות / תקלות", icon: ShieldAlert, color: "#dc2626" },
  object: { he: "אובייקטים", icon: Boxes, color: "#4338ca" },
  cds: { he: "CDS Views", icon: FileCode2, color: "#16a34a" },
  fiori: { he: "Fiori Apps", icon: LayoutGrid, color: "#7c3aed" },
} as const;
const ORDER: (keyof typeof KIND)[] = ["tcode", "fiori", "table", "cds", "error", "object"];

export function TxSearch({ index }: { index: SearchHit[] }) {
  const [q, setQ] = useState("");
  const groups = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return null;
    const terms = t.split(/\s+/);
    const hits = index.filter((h) => terms.every((tm) => h.terms.includes(tm)));
    const g: Record<string, SearchHit[]> = { tcode: [], table: [], error: [], object: [], cds: [], fiori: [] };
    for (const h of hits) { if (g[h.kind].length < 24) g[h.kind].push(h); }
    return g;
  }, [q, index]);
  const total = groups ? Object.values(groups).reduce((a, b) => a + b.length, 0) : 0;
  return (
    <div dir="rtl">
      <div className="flex items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-brand">
        <Search className="size-5 text-brand" />
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש חכם — T-Code · טבלה · שגיאה · תהליך · אובייקט … (נסה: stock · dump · idoc · backflush · התחשבנות)" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
        {q && <button onClick={() => setQ("")} className="text-xs font-bold text-slate-400">נקה</button>}
      </div>
      {!q && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["stock", "dump", "idoc", "backflush", "התחשבנות", "batch", "MRP", "authorization", "period"].map((s) => (
            <button key={s} onClick={() => setQ(s)} className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-500 hover:border-brand hover:text-brand">{s}</button>
          ))}
        </div>
      )}
      {groups && (
        <div className="mt-4">
          <p className="mb-3 text-xs font-bold text-slate-400">{total} תוצאות</p>
          {total === 0 && <p className="text-sm text-slate-400">לא נמצאו תוצאות.</p>}
          <div className="space-y-4">
            {ORDER.map((k) => groups[k].length > 0 && (
              <section key={k}>
                <h3 className="mb-2 flex items-center gap-2 text-sm font-extrabold text-slate-900">
                  {(() => { const I = KIND[k].icon; return <I className="size-4" style={{ color: KIND[k].color }} />; })()}
                  {KIND[k].he}<span className="text-[11px] font-bold text-slate-300">{groups[k].length}</span>
                </h3>
                <div className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
                  {groups[k].map((h) => (
                    <Link key={h.kind + h.code} href={h.href} className="lift flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                      <span className="min-w-0"><span className="tech text-sm font-extrabold" style={{ color: KIND[k].color }} dir="ltr">{h.label}</span><span className="block truncate text-[11px] text-slate-400">{h.sub}</span></span>
                      <span className="text-brand">→</span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
