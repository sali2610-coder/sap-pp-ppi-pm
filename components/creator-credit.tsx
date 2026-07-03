"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Code2 } from "lucide-react";

const RED = "#d62027";

// Creator signature — a full-width bar on the white strip directly under the
// header. Red border, red accents, all the details laid out inline along the
// whole bar (no hover pop-up). Gentle pulsing red glow.
export function CreatorCredit() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
      aria-label="Built by Sali Khalif · Web Coding · Project NEO"
      style={{ borderColor: RED }}
      className={`${reduce ? "" : "credit-red-glow"} flex w-full items-center justify-between gap-3 rounded-full border-2 bg-white px-4 py-1.5 text-[12px] font-bold leading-none`}>
      {/* right group (RTL start) — Project NEO + badge */}
      <span className="flex shrink-0 items-center gap-2">
        <span className="grid size-6 shrink-0 place-items-center rounded-full text-white shadow-sm" style={{ background: RED }}><Code2 className="size-3.5" /></span>
        <span className="whitespace-nowrap">
          <b className="font-extrabold tracking-tight" style={{ color: RED }}>Project NEO</b>
          <span className="hidden text-slate-400 md:inline"> · Architecture &amp; Development</span>
        </span>
      </span>

      {/* center — creator */}
      <span className="hidden shrink-0 whitespace-nowrap text-slate-500 sm:inline">
        Built by <b className="font-extrabold" style={{ color: RED }}>Sali Khalif</b>
        <span className="hidden lg:inline"> · Web Coding</span>
      </span>

      {/* left group (RTL end) — platform + org */}
      <span className="flex shrink-0 items-center gap-2 whitespace-nowrap">
        <span className="hidden text-slate-400 md:inline">SAP Architecture Platform</span>
        <span className="hidden h-3 w-px bg-slate-200 md:inline-block" />
        <b className="font-extrabold" style={{ color: RED }}>CBC&nbsp;Israel</b>
      </span>
    </motion.div>
  );
}
