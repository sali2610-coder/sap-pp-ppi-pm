"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, Sparkles, ArrowLeft, GraduationCap, Compass, PlayCircle } from "lucide-react";
import { ROLES, GLOSSARY, PM_PATH, PPPI_PATH, WORKFLOWS, DEMO_PM, DEMO_PPPI, ROLE_TASKS, type RoleId } from "@/data/onboarding";
import { useRole, setRole, hasOnboarded, markOnboarded } from "@/lib/role";

export function OnboardingDrawer() {
  const reduce = useReducedMotion();
  const role = useRole();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"welcome" | "pm" | "pppi" | "work">("welcome");

  useEffect(() => {
    if (typeof window !== "undefined" && !hasOnboarded()) setOpen(true);
    const h = () => setOpen(true);
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") { markOnboarded(); setOpen(false); } };
    window.addEventListener("neo:open-guide", h);
    window.addEventListener("keydown", onEsc);
    return () => { window.removeEventListener("neo:open-guide", h); window.removeEventListener("keydown", onEsc); };
  }, []);
  const close = () => { markOnboarded(); setOpen(false); };

  const TabBtn = ({ id, label }: { id: typeof tab; label: string }) => (
    <button onClick={() => setTab(id)} className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${tab === id ? "bg-brand text-white shadow-sm" : "text-slate-500 hover:bg-slate-100"}`}>{label}</button>
  );
  const Step = ({ s }: { s: { n: number; title: string; desc: string; href: string } }) => (
    <Link href={s.href} onClick={close} className="lift flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:border-brand/30">
      <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand/10 text-xs font-extrabold text-brand">{s.n}</span>
      <span className="min-w-0 flex-1"><span className="block text-sm font-extrabold text-slate-900">{s.title}</span><span className="block truncate text-[11px] text-slate-500">{s.desc}</span></span>
      <ArrowLeft className="size-3.5 shrink-0 text-slate-300" />
    </Link>
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 z-[70] bg-slate-900/40 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} />
          <motion.aside dir="rtl" role="dialog" aria-modal="true" aria-label="ברוך הבא ל-NEO" className="fixed inset-y-0 start-0 z-[71] flex w-[460px] max-w-[92vw] flex-col bg-white shadow-2xl"
            initial={reduce ? false : { x: "-100%" }} animate={{ x: 0 }} exit={reduce ? undefined : { x: "-100%" }} transition={{ type: "spring", stiffness: 320, damping: 34 }}>
            {/* header */}
            <div className="relative shrink-0 bg-gradient-to-l from-brand-dark via-brand to-brand px-5 py-4 text-white">
              <button onClick={close} aria-label="סגור" className="absolute end-4 top-4 rounded-lg p-1 text-white/80 hover:bg-white/15"><X className="size-5" /></button>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70"><Sparkles className="size-3.5" />Project NEO</div>
              <h2 className="mt-1 text-2xl font-extrabold">ברוך הבא ל-NEO</h2>
              <p className="mt-1 text-sm text-white/85">קוקפיט הידע למיגרציית SAP ECC → S/4HANA של הארגון — תהליכים, אובייקטים, מודל נתונים והשפעת S/4 במקום אחד.</p>
            </div>

            {/* role selector */}
            <div className="shrink-0 border-b border-slate-100 px-5 py-3">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-400">בחר תפקיד — מתאים את ההכוונה</p>
              <div className="flex flex-wrap gap-1.5">
                {ROLES.map((r) => (
                  <button key={r.id} onClick={() => setRole(r.id as RoleId)} title={r.sub} className={`rounded-lg border px-2.5 py-1 text-xs font-bold transition ${role === r.id ? "border-brand bg-brand text-white shadow-sm" : "border-slate-200 text-slate-600 hover:border-brand/40"}`}>{r.he}</button>
                ))}
              </div>
              <p className="mt-1.5 text-[11px] text-slate-500">{ROLES.find((r) => r.id === role)?.sub}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {ROLE_TASKS[role].map((t) => (
                  <Link key={t.he} href={t.href} onClick={close} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-bold text-slate-600 transition hover:border-brand/40 hover:text-brand">
                    {t.he}<ArrowLeft className="size-3 text-slate-300" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex shrink-0 gap-1 border-b border-slate-100 px-5 py-2">
              <TabBtn id="welcome" label="מה זה NEO" /><TabBtn id="pm" label="התחל PM" /><TabBtn id="pppi" label="התחל PP-PI" /><TabBtn id="work" label="לפי משימה" />
            </div>

            <div className="min-h-0 flex-1 overflow-auto p-5">
              {tab === "welcome" && (
                <div className="space-y-3">
                  <Link href="/learn/" onClick={close} className="lift flex items-center gap-3 rounded-2xl bg-gradient-to-l from-brand to-brand-dark p-4 text-white shadow-lg">
                    <GraduationCap className="size-7 shrink-0" />
                    <span className="min-w-0 flex-1"><span className="block text-base font-extrabold">חדש ב-SAP? התחל כאן</span><span className="block text-xs text-white/85">מסלול למידה מודרך — צעד אחרי צעד, מהאובייקט הראשון ועד התהליך המלא.</span></span>
                    <ArrowLeft className="size-5 shrink-0" />
                  </Link>
                  <p className="text-sm font-bold text-slate-700">למי זה מיועד: מיישמי PM/PP-PI, יועצי SAP, צוותי QA ומיגרציה.</p>
                  <div className="space-y-2">
                    {GLOSSARY.map((g) => (
                      <div key={g.term} className="rounded-xl border border-slate-200 bg-white p-3">
                        <div className="text-sm font-extrabold text-slate-900">{g.term}</div>
                        <div className="text-[12px] leading-relaxed text-slate-600">{g.he}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button onClick={() => setTab("pm")} className="lift flex-1 rounded-xl bg-brand px-3 py-2.5 text-sm font-bold text-white shadow-lg">התחל מסלול PM</button>
                    <button onClick={() => setTab("pppi")} className="lift flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-700">התחל מסלול PP-PI</button>
                  </div>
                </div>
              )}
              {tab === "pm" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between"><h3 className="flex items-center gap-1.5 text-sm font-extrabold text-slate-900"><GraduationCap className="size-4 text-brand" />מסלול התחלה · PM</h3>
                    <Link href={DEMO_PM[0].href} onClick={close} className="inline-flex items-center gap-1 rounded-lg bg-amber-400 px-2.5 py-1 text-[11px] font-extrabold text-amber-950"><PlayCircle className="size-3.5" />הראה לי דוגמה</Link></div>
                  {PM_PATH.map((s) => <Step key={s.n} s={s} />)}
                </div>
              )}
              {tab === "pppi" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between"><h3 className="flex items-center gap-1.5 text-sm font-extrabold text-slate-900"><GraduationCap className="size-4 text-brand" />מסלול התחלה · PP-PI</h3>
                    <Link href={DEMO_PPPI[0].href} onClick={close} className="inline-flex items-center gap-1 rounded-lg bg-amber-400 px-2.5 py-1 text-[11px] font-extrabold text-amber-950"><PlayCircle className="size-3.5" />הראה לי דוגמה</Link></div>
                  {PPPI_PATH.map((s) => <Step key={s.n} s={s} />)}
                </div>
              )}
              {tab === "work" && (
                <div className="space-y-2">
                  <h3 className="flex items-center gap-1.5 text-sm font-extrabold text-slate-900"><Compass className="size-4 text-brand" />מה אתה צריך לעשות?</h3>
                  {WORKFLOWS.map((w) => (
                    <Link key={w.he} href={w.href} onClick={close} className="lift flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:border-brand/30">
                      <span className="min-w-0 flex-1"><span className="block text-sm font-extrabold text-slate-900">{w.he}</span><span className="block text-[11px] text-slate-500">{w.sub}</span></span>
                      <ArrowLeft className="size-3.5 shrink-0 text-slate-300" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="shrink-0 border-t border-slate-100 px-5 py-2.5 text-center">
              <button onClick={close} className="text-xs font-bold text-slate-400 hover:text-brand">דלג — אפשר לפתוח שוב דרך ❓ בכל עמוד</button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
