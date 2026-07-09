"use client";

import { useMemo, useRef, useState } from "react";
import { SmartLink as Link } from "@/components/smart-link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, Terminal, LayoutGrid, Sigma, ArrowLeft, Sparkles, Star } from "lucide-react";
import { searchApps, appObject, criticality, FEATURED, type SearchHit } from "@/lib/apps-intel";

const MOD_C: Record<string, string> = { PM: "#f97316", "PP-PI": "#6d28d9", PP: "#6d28d9", QM: "#0d9488", MM: "#2563eb", FI: "#16a34a", CO: "#d97706", SD: "#0891b2", PS: "#be185d" };
const mc = (m: string) => MOD_C[m] || MOD_C[(m || "").split(/[ /-]/)[0]] || "#64748b";
const KIND_ICON = { tx: Terminal, fiori: LayoutGrid, cds: Sigma };
const KIND_HE = { tx: "טרנזקציה", fiori: "Fiori", cds: "CDS" };
const STATUS_C: Record<string, string> = { Active: "#16a34a", Deprecated: "#d97706", Obsolete: "#dc2626" };

function HitRow({ h }: { h: SearchHit }) {
  const Ic = KIND_ICON[h.kind];
  return (
    <Link href={h.href} className="flex items-center gap-2.5 rounded-xl px-3 py-2 transition hover:bg-slate-50">
      <span className="grid size-7 shrink-0 place-items-center rounded-lg text-white shadow-sm" style={{ background: mc(h.module) }}><Ic className="size-3.5" /></span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5"><span className="tech truncate font-mono text-[14px] font-extrabold text-slate-900" dir="ltr">{h.label}</span>{h.status && <span className="rounded px-1 text-[9px] font-bold text-white" style={{ background: STATUS_C[h.status] }}>{h.status}</span>}</span>
        <span className="block truncate text-[11px] text-slate-400">{h.sub}</span>
      </span>
      <span className="shrink-0 rounded-full bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-500">{KIND_HE[h.kind]}</span>
      <ArrowLeft className="size-3.5 shrink-0 text-slate-300" />
    </Link>
  );
}

export function AppsCenter() {
  const reduce = useReducedMotion();
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const hits = useMemo(() => searchApps(q, 30), [q]);

  const featured = useMemo(() => FEATURED.map((c) => appObject(c)).filter(Boolean).map((o) => o!), []);
  const grid = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.04 } } };
  const item = { hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }, show: { opacity: 1, y: 0, transition: reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 260, damping: 24 } } };

  return (
    <div dir="rtl" className="space-y-7">
      {/* one search */}
      <div className="relative">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 shadow-[var(--elev-1)] focus-within:border-brand/40 focus-within:shadow-[var(--elev-2)]">
          <Search className="size-5 shrink-0 text-brand" />
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} autoFocus dir="ltr"
            placeholder="IW31 · F1511 · Manage Maintenance Orders · Equipment · MARA…"
            className="w-full bg-transparent text-base outline-none placeholder:text-slate-300" />
          {q && <button onClick={() => { setQ(""); inputRef.current?.focus(); }} className="text-[11px] font-bold text-slate-400 hover:text-brand">נקה</button>}
        </div>
        <AnimatePresence>
          {q.trim() && (
            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute inset-x-0 top-full z-30 mt-2 max-h-[60vh] overflow-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl">
              {hits.length ? hits.map((h) => <HitRow key={h.kind + h.code} h={h} />) : <p className="px-3 py-6 text-center text-sm text-slate-400">אין תוצאות ל-"{q}"</p>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!q.trim() && (
        <>
          {/* what you can search */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold text-slate-400">
            <span>חפש לפי:</span>
            {["טרנזקציית ECC", "טרנזקציית S/4", "שם אפליקציית Fiori", "App ID", "טבלה", "תצוגת CDS", "אובייקט עסקי", "תהליך", "מילת מפתח"].map((t) => <span key={t} className="rounded-full bg-slate-100 px-2 py-0.5">{t}</span>)}
          </div>

          {/* featured daily drivers */}
          <section>
            <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400"><Star className="size-4 text-brand" />שולחן העבודה היומי · אובייקטים מרכזיים</div>
            <motion.div variants={grid} initial="hidden" animate="show" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {featured.map((o) => { const crit = criticality(o); const c = mc(o.intel.module); return (
                <motion.div key={o.code} variants={item}>
                  <Link href={`/apps/${encodeURIComponent(o.code)}/`} className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                    <span aria-hidden className="pointer-events-none absolute -left-12 -top-12 size-36 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" style={{ background: c + "2e" }} />
                    <div className="relative flex items-start justify-between">
                      <span className="grid size-12 place-items-center rounded-2xl text-white shadow-md transition-transform duration-300 group-hover:scale-105" style={{ background: `linear-gradient(135deg,${c},${c}cc)` }}><Terminal className="size-6" /></span>
                      <div className="flex flex-col items-end gap-1">
                        <span className="rounded-full px-2 py-0.5 text-[10px] font-extrabold" style={{ background: c + "14", color: c }}>{o.intel.module}</span>
                        <span className="rounded-full px-1.5 py-0.5 text-[9px] font-bold text-white" style={{ background: STATUS_C[o.lc.status] }}>{o.lc.status}</span>
                      </div>
                    </div>
                    <div className="relative mt-3 flex-1">
                      <div className="flex items-center gap-2"><h3 className="tech text-xl font-extrabold tracking-tight text-slate-900" dir="ltr">{o.code}</h3>{o.fiori[0] && <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-50 px-1.5 py-0.5 text-[9px] font-bold text-amber-700"><LayoutGrid className="size-2.5" />Fiori</span>}</div>
                      <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-slate-500">{o.intel.descHe}</p>
                    </div>
                    <span className="relative mt-3 inline-flex items-center gap-1 text-[12px] font-bold transition group-hover:gap-2" style={{ color: c }}>פתח עמוד אובייקט<ArrowLeft className="size-3.5" /></span>
                  </Link>
                </motion.div>
              ); })}
            </motion.div>
          </section>

          {/* integration strip */}
          <section className="rounded-3xl border border-slate-200 bg-gradient-to-bl from-slate-50 to-white p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-extrabold text-slate-700"><Sparkles className="size-4 text-brand" />מחובר לכל הפלטפורמה</div>
            <div className="flex flex-wrap gap-2">
              {[["/studio/", "Architecture Studio"], ["/tables/", "חוקר טבלאות"], ["/cds/", "חוקר CDS"], ["/idoc/", "חוקר IDoc"], ["/transactions/", "מרכז טרנזקציות"], ["/fiori-apps/", "אפליקציות Fiori"], ["/knowledge/", "מרכז הידע"]].map(([href, label]) => (
                <Link key={href} href={href} className="lift inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[12px] font-bold text-slate-600 transition hover:border-brand/30 hover:text-brand">{label}<ArrowLeft className="size-3 text-slate-300" /></Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
