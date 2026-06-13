"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Network, BookOpen, ArrowLeft, Sparkles } from "lucide-react";
import { playClick } from "@/lib/sound";

export type HeroStats = {
  modules: number; tables: number; relations: number; tcodes: number; bapis: number; books: number;
};

function useCount(target: number, ms = 1100, instant = false) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (instant) { setV(target); return; }
    let raf = 0; const t0 = performance.now();
    const step = (t: number) => { const p = Math.min(1, (t - t0) / ms); setV(Math.round((1 - Math.pow(1 - p, 3)) * target)); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf);
  }, [target, ms, instant]);
  return v;
}

function Stat({ label, value }: { label: string; value: number }) {
  const reduce = useReducedMotion();
  const v = useCount(value, 1100, !!reduce);
  return (
    <div className="flex flex-col items-center rounded-2xl border border-white/15 bg-white/10 px-3 py-3 backdrop-blur-sm sm:px-5">
      <span className="font-mono text-2xl font-extrabold tabular-nums text-white sm:text-3xl">{v.toLocaleString()}</span>
      <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/70 sm:text-xs">{label}</span>
    </div>
  );
}

export function HomeHero({ stats }: { stats: HeroStats }) {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-bl from-[#d62027] via-[#b81920] to-[#7c0f13] p-7 text-white shadow-2xl sm:p-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div className="absolute -right-24 -top-24 size-72 rounded-full bg-white/10 blur-3xl"
          animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute -bottom-28 left-10 size-80 rounded-full bg-black/20 blur-3xl"
          animate={reduce ? undefined : { scale: [1, 1.2, 1] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} />
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }} className="relative">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold text-white/90">
          <Sparkles className="size-3.5" /> SAP Enterprise Command Center
        </span>
        <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">Project NEO Cockpit</h1>
        <p className="mt-3 max-w-2xl text-balance text-sm leading-relaxed text-white/85 sm:text-lg">
          מרכז השליטה לארכיטקטורת SAP של CBC — מודולים, תהליכים, טבלאות וקשרים במקום אחד. ECC6 → S/4HANA.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-2.5 sm:grid-cols-6 sm:gap-3">
          <Stat label="מודולים" value={stats.modules} />
          <Stat label="טבלאות" value={stats.tables} />
          <Stat label="קשרים" value={stats.relations} />
          <Stat label="T-Codes" value={stats.tcodes} />
          <Stat label="BAPIs" value={stats.bapis} />
          <Stat label="ספרים" value={stats.books} />
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/sap-infrastructure/" onClick={() => playClick()}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#b81920] shadow-lg transition hover:shadow-xl active:scale-[0.98]">
            <Network className="size-4" /> פתח SAP Architecture
            <span className="grid size-6 place-items-center rounded-full bg-[#b81920]/10 transition group-hover:bg-[#b81920]/20"><ArrowLeft className="size-3.5" /></span>
          </Link>
          <Link href="/library/" onClick={() => playClick()}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20 active:scale-[0.98]">
            <BookOpen className="size-4" /> ספריית SAP
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
