"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BrainCircuit, X, CornerDownLeft, Sparkles, ArrowLeft } from "lucide-react";
import { mentorAnswer, mentorSuggestions, type Trust } from "@/lib/mentor";

const RECENT_KEY = "neo:mentor:recent";
const TRUST_LABEL: Record<Trust, string> = { dataset: "מבוסס מאגר", curated: "ידע SAP", mixed: "מאגר + ידע SAP", none: "" };
const TRUST_COLOR: Record<Trust, string> = { dataset: "#2563eb", curated: "#059669", mixed: "#7c3aed", none: "#94a3b8" };

export function Mentor() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    try { const r = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"); if (Array.isArray(r)) setRecent(r.slice(0, 6)); } catch { /* noop */ }
    const h = () => setOpen(true);
    window.addEventListener("neo:open-mentor", h);
    const key = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") { e.preventDefault(); setOpen((v) => !v); } };
    window.addEventListener("keydown", key);
    return () => { window.removeEventListener("neo:open-mentor", h); window.removeEventListener("keydown", key); };
  }, []);

  const ans = useMemo(() => mentorAnswer(q), [q]);
  const remember = (text: string) => {
    const next = [text, ...recent.filter((r) => r !== text)].slice(0, 6);
    setRecent(next);
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)); } catch { /* noop */ }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} aria-label="שאל מנטור SAP" title="שאל מנטור · ⌘J"
        className="no-print group fixed bottom-20 end-5 z-40 flex items-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-sm font-bold text-white shadow-xl shadow-slate-900/30 transition-transform hover:scale-105 active:scale-95">
        <BrainCircuit className="size-5" /><span className="hidden sm:inline">שאל מנטור</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-[70] bg-slate-900/40 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.aside dir="rtl" className="fixed inset-y-0 end-0 z-[71] flex w-[460px] max-w-[94vw] flex-col bg-white shadow-2xl"
              initial={reduce ? false : { x: "100%" }} animate={{ x: 0 }} exit={reduce ? undefined : { x: "100%" }} transition={{ type: "spring", stiffness: 320, damping: 34 }}>
              <div className="relative shrink-0 bg-gradient-to-l from-slate-900 to-slate-800 px-5 py-4 text-white">
                <button onClick={() => setOpen(false)} className="absolute start-4 top-4 rounded-lg p-1 text-white/80 hover:bg-white/15"><X className="size-5" /></button>
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60"><BrainCircuit className="size-3.5" />SAP Mentor</div>
                <h2 className="mt-1 text-xl font-extrabold">שאל את המנטור</h2>
                <p className="mt-0.5 text-xs text-white/70">תשובות מבוססות מאגר וידע SAP בלבד — ללא המצאות.</p>
              </div>

              <div className="shrink-0 border-b border-slate-100 p-3">
                <div className="relative">
                  <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && q.trim()) remember(q.trim()); }}
                    placeholder="למה AUFK קשורה ל-AFKO? · מה זה JEST?" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pe-3 ps-9 text-sm font-medium outline-none focus:border-brand/40 focus:bg-white" />
                  <CornerDownLeft className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-slate-300" />
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-auto p-4">
                {!q.trim() ? (
                  <div className="space-y-4">
                    {recent.length > 0 && (
                      <div><div className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">שאלות אחרונות</div>
                        <div className="flex flex-wrap gap-1.5">{recent.map((r) => <button key={r} onClick={() => setQ(r)} className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:border-brand/40 hover:text-brand">{r}</button>)}</div></div>
                    )}
                    <div><div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400"><Sparkles className="size-3.5" />נסה לשאול</div>
                      <div className="flex flex-col gap-1.5">{mentorSuggestions().map((s) => <button key={s} onClick={() => { setQ(s); remember(s); }} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-right text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-px hover:border-brand/40 hover:text-brand">{s}</button>)}</div></div>
                  </div>
                ) : ans ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base font-extrabold text-slate-900">{ans.title}</h3>
                      {ans.trust !== "none" && <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: TRUST_COLOR[ans.trust] }}>{TRUST_LABEL[ans.trust]}</span>}
                    </div>
                    {ans.blocks.map((b, i) => (
                      <div key={i} className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                        {b.label && <div className="mb-1 text-[11px] font-bold uppercase tracking-wide text-slate-400">{b.label}</div>}
                        {b.text && <p className="text-sm leading-relaxed text-slate-700">{b.text}</p>}
                        {b.chips && b.chips.length > 0 && <div className="mt-1 flex flex-wrap gap-1.5">{b.chips.map((c, j) => c.href
                          ? <Link key={j} href={c.href} onClick={() => setOpen(false)} className="tech rounded-md border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[11px] font-bold text-brand transition hover:border-brand/40" dir="ltr">{c.label}</Link>
                          : <span key={j} className="tech rounded-md border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[11px] font-bold text-slate-600" dir="ltr">{c.label}</span>)}</div>}
                      </div>
                    ))}
                    {ans.actions.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">{ans.actions.map((a, i) => a.href === "#palette"
                        ? <button key={i} onClick={() => { setOpen(false); window.dispatchEvent(new Event("neo:open-palette")); }} className="tap inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-brand/40 hover:text-brand">{a.label}</button>
                        : <Link key={i} href={a.href} onClick={() => setOpen(false)} className={`tap inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition ${i === 0 ? "bg-brand text-white shadow-sm hover:bg-brand-dark" : "border border-slate-200 bg-white text-slate-600 hover:border-brand/40 hover:text-brand"}`}>{a.label}<ArrowLeft className="size-3.5" /></Link>)}</div>
                    )}
                  </div>
                ) : null}
              </div>
              <div className="shrink-0 border-t border-slate-100 px-4 py-2 text-center text-[10px] text-slate-400">תשובות נבנות ממאגר הקשרים, שכבת הידע ושכבת ה-S/4 · ⌘J לפתיחה</div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
