"use client";

// Learning Activity widget (§6) — Today (lessons/blocks/quiz/minutes) + streak + per-course
// completion. All figures are live from the single store (reactive, no reload).
import { motion } from "framer-motion";
import { CheckCircle2, Layers, HelpCircle, Clock, Flame, TrendingUp } from "lucide-react";
import { useTodayStats, useGamification, useActiveCourses } from "@/lib/academy/store";
import { accentOf } from "@/lib/academy/theme";
import { AnimatedNumber } from "./anim";

export function AcademyActivityWidget() {
  const today = useTodayStats();
  const g = useGamification();
  const courses = useActiveCourses();
  const stats = [
    { icon: CheckCircle2, label: "שיעורים", value: today.lessons },
    { icon: Layers, label: "בלוקים", value: today.blocks },
    { icon: HelpCircle, label: "בחנים", value: today.quizzes },
    { icon: Clock, label: "דקות", value: today.minutes },
  ];
  return (
    <section dir="rtl" className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
      {/* Today + streak */}
      <div className="rounded-3xl border border-hairline bg-surface p-5">
        <div className="mb-3.5 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-[14px] font-extrabold text-ink-1"><TrendingUp className="size-4 text-brand" />פעילות למידה · היום</h3>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff7ed] px-2.5 py-1 text-[11px] font-extrabold text-[#f97316]"><Flame className="size-3.5" />רצף {g.streak} {g.streak === 1 ? "יום" : "ימים"}</span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-hairline bg-surface-2/50 p-3 text-center transition hover:-translate-y-0.5 hover:shadow-sm">
              <s.icon className="mx-auto size-4 text-ink-3" aria-hidden />
              <div className="mt-1 text-[22px] font-black tracking-[-0.02em] text-ink-1"><AnimatedNumber value={s.value} /></div>
              <div className="text-[10.5px] text-ink-3">{s.label}</div>
            </div>
          ))}
        </div>
        {g.longestStreak >= 3 && <p className="mt-3 text-[11px] text-ink-3">שיא הרצף שלך: <b className="text-ink-2">{g.longestStreak} ימים</b> · יעד שבועי {g.weeklyDone}/{g.weeklyTarget}</p>}
      </div>

      {/* Completion per active course */}
      <div className="rounded-3xl border border-hairline bg-surface p-5">
        <h3 className="mb-3.5 text-[14px] font-extrabold text-ink-1">התקדמות בקורסים</h3>
        {courses.length === 0 ? (
          <p className="text-[12.5px] text-ink-3">אין קורסים פעילים עדיין — התחל שיעור וההתקדמות תופיע כאן.</p>
        ) : (
          <div className="flex flex-col gap-2.5">
            {courses.slice(0, 6).map((c) => {
              const a = accentOf(c.module);
              return (
                <div key={c.moduleId} className="flex items-center gap-3">
                  <span className="w-12 shrink-0 truncate text-[11px] font-extrabold" style={{ color: a }}>{c.module}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/[0.06]">
                    <motion.div className="h-full rounded-full" style={{ background: a }} initial={{ width: 0 }} animate={{ width: `${c.pct}%` }} transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }} />
                  </div>
                  <span className="w-9 shrink-0 text-end text-[11.5px] font-bold text-ink-2">{c.pct}%</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
