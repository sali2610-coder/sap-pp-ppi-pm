"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { PanelRight, X, Target, Briefcase, AlertTriangle, GitBranch, ExternalLink, Network, Crosshair } from "lucide-react";
import { useActiveEntity, setActiveEntity, useInspectorOpen, setInspectorOpen, entityFromPath } from "@/lib/workspace";
import { lookupEntity, type TipKind } from "@/lib/entity-lookup";

const KIND_C: Record<TipKind, string> = { table: "#0891b2", tcode: "#475569", bapi: "#2563eb", idoc: "#7c3aed", fm: "#0d9488", cds: "#16a34a" };

// Persistent Workspace Inspector — one reusable right panel for every entity
// (table/object · tcode · BAPI/FM/IDoc · CDS · Fiori). Reflects the global
// active context (explicit selection, else derived from the route). Related
// chips switch context in-place (no navigation) — opening related content feels
// like opening another file in the same IDE.
export function WorkspaceInspector() {
  const path = usePathname() || "/";
  const explicit = useActiveEntity();
  const open = useInspectorOpen();
  const name = explicit || entityFromPath(path);
  const tip = useMemo(() => (name ? lookupEntity(name) : null), [name]);

  // a "pin" event (from a chip's inspector action) opens the panel
  useEffect(() => { const onPin = () => setInspectorOpen(true); window.addEventListener("neo:inspect", onPin); return () => window.removeEventListener("neo:inspect", onPin); }, []);
  const accent = tip ? KIND_C[tip.kind] : "#475569";
  const relBase = tip?.relatedKind === "tcode" ? "/tcode/" : "/object/";

  return (
    <>
      {/* toggle — left edge (RTL: opposite the search FAB), shows active context */}
      <button onClick={() => setInspectorOpen(!open)} aria-label="מפקח סביבת עבודה" aria-expanded={open}
        className="no-print group fixed bottom-5 left-5 z-40 hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-3 text-sm font-bold text-slate-600 shadow-xl transition hover:-translate-y-0.5 hover:text-brand xl:flex">
        <PanelRight className="size-5" />
        {tip ? <span className="tech font-mono text-[13px] font-extrabold" style={{ color: accent }} dir="ltr">{tip.name}</span> : <span>מפקח</span>}
        {tip && <span className="size-2 rounded-full" style={{ background: accent }} />}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-slate-950/30 backdrop-blur-sm xl:bg-transparent xl:backdrop-blur-0" onClick={() => setInspectorOpen(false)} />
            <motion.aside dir="rtl" role="complementary" aria-label="מפקח"
              initial={{ x: "-100%", opacity: 0.6 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "-100%", opacity: 0.6 }} transition={{ type: "spring", stiffness: 360, damping: 36 }}
              className="fixed bottom-0 left-0 top-[4.5rem] z-[61] flex w-[360px] max-w-[90vw] flex-col border-e border-slate-200 bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <span className="flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-wide text-slate-400"><PanelRight className="size-4 text-brand" />מפקח · Inspector</span>
                <button onClick={() => setInspectorOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"><X className="size-4" /></button>
              </div>

              <div className="min-h-0 flex-1 overflow-auto p-4">
                {tip ? (
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2"><span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: accent }}>{tip.kindHe}</span><span className="tech font-mono text-lg font-extrabold text-slate-900" dir="ltr">{tip.name}</span>{tip.module && <span className="ms-auto text-[10px] font-bold text-slate-400">{tip.module}</span>}</div>
                    {tip.he && <p className="text-[13px] font-semibold leading-relaxed text-slate-700">{tip.he}</p>}
                    {tip.purpose && <p className="flex gap-1.5 text-[12.5px] leading-relaxed text-slate-600"><Target className="mt-0.5 size-3.5 shrink-0 text-blue-500" />{tip.purpose}</p>}
                    {tip.consultantTip && <p className="flex gap-1.5 text-[12.5px] leading-relaxed text-slate-600"><Briefcase className="mt-0.5 size-3.5 shrink-0 text-violet-500" />{tip.consultantTip}</p>}
                    {tip.mistake && <p className="flex gap-1.5 text-[12.5px] leading-relaxed text-slate-600"><AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-rose-500" />{tip.mistake}</p>}
                    {tip.where && <p className="text-[12px] leading-relaxed text-slate-500"><span className="font-bold text-slate-600">איפה בפרויקט: </span>{tip.where}</p>}
                    {tip.related && tip.related.length > 0 && (
                      <div><div className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase text-slate-400"><GitBranch className="size-3" />קשור — לחץ להחלפת הקשר</div>
                        <div className="flex flex-wrap gap-1">{tip.related.map((r) => <button key={r} onClick={() => setActiveEntity(r)} className="tech rounded-md bg-slate-100 px-1.5 py-0.5 text-[10.5px] font-bold text-slate-600 transition hover:bg-brand/10 hover:text-brand" dir="ltr">{r}</button>)}</div>
                        <div className="mt-1 text-[10px] text-slate-400">ניווט בתוך המפקח — בלי לעזוב את העמוד.</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 py-12 text-center text-slate-400">
                    <Crosshair className="size-8 text-slate-300" />
                    <p className="text-sm font-bold text-slate-500">אין הקשר פעיל</p>
                    <p className="text-[12px] leading-relaxed">בחר אובייקט בכל מקום — טבלה, טרנזקציה, צומת בסטודיו — והוא יופיע כאן. אותו מפקח בכל המרכזים.</p>
                  </div>
                )}
              </div>

              {tip && (
                <div className="flex gap-2 border-t border-slate-100 p-3">
                  <Link href={tip.href} onClick={() => setInspectorOpen(false)} className="flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-[13px] font-extrabold text-white shadow-sm transition active:scale-95" style={{ background: accent }}><ExternalLink className="size-4" />פתח עמוד מלא</Link>
                  {tip.graphHref && <Link href={tip.graphHref} onClick={() => setInspectorOpen(false)} className="flex items-center justify-center gap-1.5 rounded-xl border-2 border-slate-200 px-3 py-2.5 text-[12px] font-bold text-slate-500 transition hover:border-brand/40 hover:text-brand"><Network className="size-4" />גרף</Link>}
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
