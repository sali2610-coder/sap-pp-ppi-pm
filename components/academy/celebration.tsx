"use client";

// Tiered completion celebration (§10): lesson = small toast · chapter = medium card ·
// course = full celebration with confetti, badge, stats + next recommendation.
import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CheckCircle2, Award, Trophy, ArrowLeft, X, Sparkles } from "lucide-react";
import { Confetti } from "./confetti";
import { AnimatedNumber } from "./anim";

export type CelebrationTier = "lesson" | "chapter" | "course";

export interface CelebrationData {
  tier: CelebrationTier;
  title: string;              // lesson/chapter/course title
  accent: string;
  stats?: { label: string; value: number }[];
  nextHref?: string;
  nextLabel?: string;
}

const COPY: Record<CelebrationTier, { head: string; sub: string; Icon: typeof Award }> = {
  lesson: { head: "שיעור הושלם!", sub: "כל הכבוד — עוד צעד קדימה.", Icon: CheckCircle2 },
  chapter: { head: "פרק הושלם!", sub: "סיימת פרק שלם. ההתקדמות נשמרה.", Icon: Award },
  course: { head: "הקורס הושלם!", sub: "השלמת את כל הקורס — הישג אמיתי.", Icon: Trophy },
};

export function Celebration({ data, onClose }: { data: CelebrationData; onClose: () => void }) {
  const reduce = useReducedMotion();
  const { head, sub, Icon } = COPY[data.tier];

  // lesson tier auto-dismisses; chapter/course wait for the user
  useEffect(() => {
    if (data.tier !== "lesson") return;
    const id = setTimeout(onClose, 3600);
    return () => clearTimeout(id);
  }, [data.tier, onClose]);

  if (data.tier === "lesson") {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-x-0 bottom-6 z-[65] mx-auto flex w-fit items-center gap-3 rounded-2xl border border-hairline bg-surface px-4 py-3 shadow-[0_20px_50px_-20px_rgba(11,12,14,.4)]"
          dir="rtl"
          initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          <motion.span className="grid size-9 place-items-center rounded-xl text-white" style={{ background: data.accent }}
            initial={reduce ? false : { scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 320, damping: 15, delay: 0.05 }}>
            <CheckCircle2 className="size-5" />
          </motion.span>
          <div>
            <div className="text-[13px] font-extrabold text-ink-1">{head}</div>
            <div className="text-[11px] text-ink-3">{data.title}</div>
          </div>
          {data.nextHref && <Link href={data.nextHref} onClick={onClose} className="ms-2 inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-[12px] font-extrabold text-white" style={{ background: data.accent }}>{data.nextLabel ?? "הבא"} <ArrowLeft className="size-3.5 rtl:rotate-180" /></Link>}
        </motion.div>
      </AnimatePresence>
    );
  }

  // chapter / course — centered modal
  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-black/40 p-4 backdrop-blur-sm" dir="rtl"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        {data.tier === "course" && <Confetti />}
        <motion.div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-hairline bg-surface p-6 text-center shadow-2xl"
          initial={reduce ? false : { opacity: 0, scale: 0.9, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 240, damping: 22 }} onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} className="absolute end-3 top-3 grid size-8 place-items-center rounded-lg text-ink-3 transition hover:bg-surface-2 hover:text-ink-1" aria-label="סגור"><X className="size-4" /></button>
          <motion.span className="mx-auto grid size-16 place-items-center rounded-2xl text-white shadow-lg"
            style={{ background: `linear-gradient(135deg, ${data.accent}, ${data.accent}bb)` }}
            initial={reduce ? false : { scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}>
            <Icon className="size-8" />
          </motion.span>
          <h2 className="mt-3 text-[20px] font-black tracking-[-0.02em] text-ink-1">{head}</h2>
          <p className="mt-1 text-[13px] text-ink-3">{sub}</p>
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1 text-[11.5px] font-bold text-ink-2"><Sparkles className="size-3.5" style={{ color: data.accent }} />{data.title}</div>

          {data.stats && data.stats.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {data.stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-hairline bg-surface-2/50 p-2.5">
                  <div className="text-[19px] font-black text-ink-1" style={{ color: data.accent }}><AnimatedNumber value={s.value} /></div>
                  <div className="text-[10px] text-ink-3">{s.label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 flex flex-col gap-2">
            {data.nextHref && <Link href={data.nextHref} onClick={onClose} className="inline-flex items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-extrabold text-white transition hover:opacity-90" style={{ background: data.accent }}>{data.nextLabel ?? "המשך ללמוד"} <ArrowLeft className="size-4 rtl:rotate-180" /></Link>}
            <button onClick={onClose} className="rounded-xl border border-hairline py-2 text-[12.5px] font-bold text-ink-2 transition hover:bg-surface-2">סגור</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
