"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HelpCircle, X, GraduationCap } from "lucide-react";
import { pageHelpFor } from "@/data/onboarding";
import { useRole } from "@/lib/role";

export function PageHelp() {
  const path = usePathname() || "/";
  const help = pageHelpFor(path);
  const role = useRole();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  if (!help) return null;
  const senior = role === "senior" || role === "migration" || role === "qa";

  return (
    <>
      <div className="no-print fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2">
        <button onClick={() => setOpen(true)} className="lift inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-bold text-slate-700 shadow-lg transition hover:border-brand/40 hover:text-brand">
          <HelpCircle className="size-4 text-brand" />מה אני רואה כאן?
        </button>
        <button onClick={() => window.dispatchEvent(new Event("neo:open-guide"))} className="lift inline-flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-2 text-sm font-bold text-brand-foreground shadow-lg transition hover:brightness-110">
          <GraduationCap className="size-4" />מדריך
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-[72] bg-slate-900/40 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.div dir="rtl" className="fixed left-1/2 top-1/2 z-[73] w-[440px] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
              initial={reduce ? false : { opacity: 0, scale: 0.95, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, scale: 0.97 }} transition={{ duration: 0.22 }}>
              <div className="flex items-center justify-between bg-gradient-to-l from-brand-dark to-brand px-4 py-3 text-white">
                <h3 className="flex items-center gap-1.5 text-base font-extrabold"><HelpCircle className="size-4" />מה אני רואה כאן?</h3>
                <button onClick={() => setOpen(false)} className="rounded-lg p-1 text-white/80 hover:bg-white/15"><X className="size-4" /></button>
              </div>
              <div className="max-h-[70vh] space-y-3 overflow-auto p-4 text-[13px] leading-relaxed text-slate-700">
                <Row label="מטרת העמוד">{help.purpose}</Row>
                <Row label="מתי להשתמש">{help.when}</Row>
                <Row label="מה ללחוץ קודם">{help.first}</Row>
                <Row label={senior ? "מה יועץ בכיר בודק" : "על מה מתחיל להתמקד"}>{senior ? help.senior : help.junior}</Row>
                <Row label="טעות נפוצה" tone="#dc2626">{help.mistakes}</Row>
                <div className="rounded-xl border border-brand/20 bg-brand/5 p-3">
                  <p className="mb-1.5 flex items-center gap-1.5 text-xs font-extrabold text-brand">הצעד הבא המומלץ</p>
                  <ol className="space-y-1">
                    {help.next.map((n, i) => <li key={i} className="flex gap-2 text-[12px] text-slate-700"><span className="grid size-4 shrink-0 place-items-center rounded-full bg-brand/15 text-[9px] font-extrabold text-brand">{i + 1}</span>{n}</li>)}
                  </ol>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function Row({ label, children, tone }: { label: string; children: React.ReactNode; tone?: string }) {
  return <div><p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: tone || "#94a3b8" }}>{label}</p><p className="text-slate-700">{children}</p></div>;
}
