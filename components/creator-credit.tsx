"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Code2 } from "lucide-react";

// Creator signature — lives in the global header (shell), not the page content.
// Premium, subtle; fades in once, faint glow every 20s. Responsive: full on
// desktop, compact on tablet, name-only on mobile.
export function CreatorCredit() {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(false);

  return (
    <div className="relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <motion.button
        initial={reduce ? false : { opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
        aria-label="נבנה על ידי סאלי חליף · Web Coding"
        style={{ color: "#d62027", borderColor: "#d62027" }}
        className={`${reduce ? "" : "credit-red-glow"} group flex items-center gap-2 rounded-full border-2 bg-white py-1 pe-3 ps-1 text-[12px] font-bold leading-none shadow-sm transition-colors hover:bg-[#d62027]/[0.04]`}>
        <span className="grid size-6 shrink-0 place-items-center rounded-full text-white shadow-sm" style={{ background: "#d62027" }}><Code2 className="size-3.5" /></span>
        <span className="whitespace-nowrap">
          <span className="hidden opacity-70 sm:inline">Built by </span>
          <b className="font-extrabold tracking-tight" style={{ color: "#d62027" }}>Sali Khalif</b>
          <span className="hidden opacity-70 lg:inline"> · Web Coding · Project NEO</span>
        </span>
      </motion.button>

      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: [0.2, 0.7, 0.2, 1] }}
            dir="rtl"
            className="absolute end-0 top-full z-[70] mt-2 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 text-start shadow-2xl">
            <span className="absolute inset-x-0 top-0 h-1" style={{ background: "#D71920" }} />
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg text-white shadow-sm" style={{ background: "#D71920" }}><Code2 className="size-4" /></span>
              <div><div className="text-[13px] font-extrabold text-slate-900">Project NEO</div><div className="text-[10px] font-semibold text-slate-400">Architecture &amp; Development</div></div>
            </div>
            <p className="mt-3 text-[11px] text-slate-500">Designed and developed by</p>
            <p className="text-[15px] font-extrabold tracking-tight text-slate-900">Sali Khalif</p>
            <div className="mt-2.5 flex items-center gap-2 border-t border-slate-100 pt-2.5 text-[11px]">
              <span className="font-bold" style={{ color: "#D71920" }}>CBC Israel</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500">SAP Architecture Platform</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
