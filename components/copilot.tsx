"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft, ShieldCheck } from "lucide-react";
import type { SearchHit } from "@/lib/tcode-search";

export interface LcLite { status: string; alt?: string; fiori?: string; impact: string; migration: string }
export interface SolLite { slug: string; he: string; title: string; keywords: string[] }

const KIND_HE: Record<string, string> = { tcode: "T-Code", table: "טבלה", error: "תקלה", object: "אובייקט", cds: "CDS", fiori: "Fiori" };

export function Copilot({ index, lifecycle, solutions, codes }: { index: SearchHit[]; lifecycle: Record<string, LcLite>; solutions: SolLite[]; codes: string[] }) {
  const [q, setQ] = useState("");
  const codeSet = useMemo(() => new Set(codes), [codes]);
  const ans = useMemo(() => {
    const raw = q.trim();
    if (!raw) return null;
    const t = raw.toLowerCase();
    const terms = t.split(/\s+/).filter((x) => x.length > 1);
    // detect a T-Code token (e.g. MB1B)
    const tok = raw.toUpperCase().match(/\b[A-Z][A-Z0-9_]{1,7}\b/g) || [];
    const tcode = tok.find((x) => codeSet.has(x));
    const lc = tcode ? lifecycle[tcode] : undefined;
    // matched repo hits
    const hits = index.filter((h) => terms.some((tm) => h.terms.includes(tm)))
      .sort((a, b) => terms.filter((tm) => b.terms.includes(tm)).length - terms.filter((tm) => a.terms.includes(tm)).length)
      .slice(0, 18);
    const sols = solutions.filter((s) => { const blob = `${s.he} ${s.title} ${s.keywords.join(" ")}`.toLowerCase(); return terms.some((tm) => blob.includes(tm)); }).slice(0, 4);
    return { tcode, lc, hits, sols, none: !lc && hits.length === 0 && sols.length === 0 };
  }, [q, index, lifecycle, solutions, codeSet]);

  return (
    <div dir="rtl">
      <div className="flex items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-brand">
        <Sparkles className="size-5 text-brand" />
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder='שאל את NEO — "How do I replace MB1B in S/4?" · "tables for inspection lot" · "production confirmation"' className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
      </div>
      <div className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-emerald-600"><ShieldCheck className="size-3.5" />התשובה מבוססת על מאגר NEO בלבד — לא על זיכרון AI כללי.</div>
      {!q && <div className="mt-3 flex flex-wrap gap-1.5">{["replace MB1B", "stock transfer", "inspection lot tables", "production confirmation", "backflush COGI"].map((s) => <button key={s} onClick={() => setQ(s)} className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-500 hover:border-brand hover:text-brand">{s}</button>)}</div>}

      {ans && (
        <div className="mt-5 space-y-4">
          {ans.lc && ans.tcode && (
            <section className="rounded-2xl border-2 border-brand/30 bg-white p-5 shadow-sm">
              <h3 className="mb-2 text-sm font-extrabold text-slate-900">תשובה · <span className="tech" dir="ltr">{ans.tcode}</span></h3>
              <p className="text-sm leading-relaxed text-slate-700">סטטוס: <b style={{ color: ans.lc.status === "Obsolete" ? "#dc2626" : ans.lc.status === "Deprecated" ? "#d97706" : "#16a34a" }}>{ans.lc.status}</b>{ans.lc.alt && <> · חלופה מומלצת: <b className="tech" dir="ltr">{ans.lc.alt}</b></>}{ans.lc.fiori && <> · Fiori: {ans.lc.fiori}</>} · השפעת מיגרציה: {ans.lc.impact}.</p>
              <p className="mt-1.5 text-[13px] text-slate-500">{ans.lc.migration}</p>
              <Link href={`/tcode-dir/${ans.tcode.replace(/[^A-Za-z0-9]+/g, "-")}/`} className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-brand">פרטים מלאים<ArrowLeft className="size-3" /></Link>
            </section>
          )}
          {ans.sols.length > 0 && (
            <section><h3 className="mb-2 text-sm font-extrabold text-slate-900">פתרונות עסקיים</h3><div className="flex flex-wrap gap-1.5">{ans.sols.map((s) => <Link key={s.slug} href={`/solutions/${s.slug}/`} className="rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 hover:bg-amber-100">{s.he}</Link>)}</div></section>
          )}
          {ans.hits.length > 0 && (
            <section>
              <h3 className="mb-2 text-sm font-extrabold text-slate-900">מקורות מהמאגר ({ans.hits.length})</h3>
              <div className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
                {ans.hits.map((h) => <Link key={h.kind + h.code} href={h.href} className="lift flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm"><span className="min-w-0"><span className="tech font-bold text-slate-800" dir="ltr">{h.label}</span><span className="block truncate text-[10px] text-slate-400">{KIND_HE[h.kind]} · {h.sub}</span></span><span className="text-brand">→</span></Link>)}
              </div>
            </section>
          )}
          {ans.none && <p className="text-sm text-slate-400">לא נמצא במאגר NEO. נסה מונח אחר (T-Code, טבלה, תהליך) — אינני עונה מזיכרון כללי.</p>}
        </div>
      )}
    </div>
  );
}
