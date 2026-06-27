"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, X, Compass } from "lucide-react";
import { CENTERS } from "@/lib/centers";
import { playClick } from "@/lib/sound";

// Centers Command Hub — mobile bottom-sheet. Premium stacked cards (icon +
// title + one-liner + metrics + "what's inside" + "start here"). Spring
// slide-up, drag-to-dismiss handle, scrim. Replaces the old dropdown on mobile.
export function CentersSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const path = usePathname() || "/";
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 z-[80] bg-slate-950/50 backdrop-blur-sm xl:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div dir="rtl" role="dialog" aria-label="מרכזי ייעוץ"
            className="fixed inset-x-0 bottom-0 z-[81] max-h-[88vh] overflow-y-auto rounded-t-3xl bg-white pb-[max(env(safe-area-inset-bottom),1rem)] shadow-2xl xl:hidden"
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", stiffness: 340, damping: 34 }}
            drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.4 }} onDragEnd={(_, info) => { if (info.offset.y > 120) onClose(); }}>
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur">
              <div className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-slate-200" />
              <div className="flex items-center justify-between px-5 py-3">
                <span className="flex items-center gap-2 text-[13px] font-extrabold text-slate-900"><Compass className="size-4 text-brand" />מרכזי ייעוץ · Command Hub</span>
                <button onClick={onClose} aria-label="סגור" className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"><X className="size-5" /></button>
              </div>
            </div>
            <div className="space-y-2.5 px-4 pt-1">
              {CENTERS.map((c) => { const Ic = c.Icon; const on = path.startsWith(c.href); return (
                <Link key={c.id} href={c.href} onClick={() => { playClick(); onClose(); }}
                  className="block rounded-2xl border-2 bg-white p-3.5 transition active:scale-[0.98]" style={{ borderColor: on ? c.accent : "#e2e8f0" }}>
                  <div className="flex items-start gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl text-white shadow-sm" style={{ background: `linear-gradient(135deg,${c.accent},${c.accent}cc)` }}><Ic className="size-5" /></span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px] font-extrabold text-slate-900">{c.he}</span>
                        {c.isNew && <span className="rounded-full bg-rose-100 px-1.5 py-0.5 text-[9px] font-extrabold uppercase text-rose-600">New</span>}
                        <span className="ms-auto text-[9px] font-bold uppercase tracking-wide text-slate-300">{c.updated}</span>
                      </div>
                      <p className="mt-0.5 text-[12px] leading-relaxed text-slate-500">{c.desc}</p>
                      <div className="mt-1.5 flex items-center gap-3">
                        {c.metrics.map((m) => <div key={m.label} className="leading-none"><span className="font-mono text-sm font-extrabold" style={{ color: c.accent }}>{m.value}</span><span className="mr-1 text-[10px] font-bold text-slate-400">{m.label}</span></div>)}
                      </div>
                      <div className="mt-1.5 flex flex-wrap gap-1">{c.inside.slice(0, 4).map((x) => <span key={x} className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-500" dir="ltr">{x}</span>)}</div>
                    </div>
                  </div>
                </Link>
              ); })}
              <div className="flex flex-wrap gap-2 border-t border-slate-100 px-1 pb-2 pt-3 text-[12px] font-bold text-slate-500">
                <Link href="/knowledge/" onClick={onClose} className="flex items-center gap-1 hover:text-brand">כל המרכזים<ArrowLeft className="size-3.5" /></Link>
                <Link href="/graph/" onClick={onClose} className="flex items-center gap-1 hover:text-brand">גרף ידע<ArrowLeft className="size-3.5" /></Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
