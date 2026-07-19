"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Lock, Play, ArrowLeft, GraduationCap, Clock } from "lucide-react";
import { PILOT_LESSONS } from "@/data/academy/lessons/pm-maintenance-order";
import { orderedBlocks } from "@/lib/academy/lesson-types";
import { useLessonPct } from "@/lib/academy/gamification";
import { useModuleProgress } from "@/lib/academy/store";
import { moduleIdOf } from "@/lib/academy/model";
import { Pill, Breadcrumb } from "@/components/ui";

import { PILOT_SLUG, PM_PATH, PP_PATH, QM_PATH, type PathChapter, type LearningPath } from "@/lib/academy/paths";

const LVL: Record<string, "good" | "warn" | "bad"> = { "בסיסי": "good", "בינוני": "warn", "מורכב": "bad" };

// PATHS moved to lib/academy/paths.ts (Truth Layer, PR-1). Re-exported here so
// existing importers (lesson-nav, path page) keep working unchanged.
export { PM_PATH, PP_PATH, QM_PATH };
export type { PathChapter, LearningPath };

export function LearningPathView({ path }: { path: LearningPath }) {
  const reduce = useReducedMotion();
  const pilotTotal = useMemo(() => orderedBlocks(PILOT_LESSONS[PILOT_SLUG]).length, []);
  const pilotPct = useLessonPct(PILOT_SLUG, pilotTotal);
  const totalLessons = path.chapters.reduce((s, c) => s + c.lessons.length, 0);
  // Single source of truth (PR-2): completed lessons / total lessons — replaces
  // the old hardcoded (currentChapter + pilotPct)/chapters formula.
  const pctTrack = useModuleProgress(moduleIdOf(path.module)).pct;

  return (
    <div dir="rtl" className="pb-16">
      <Breadcrumb items={[{ label: "SAP Academy", href: "/academy/" }, { label: path.module }, { label: "מסלול" }]} />

      {/* track header */}
      <motion.header {...(reduce ? {} : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } })}
        className="relative mt-3 overflow-hidden rounded-3xl border border-hairline p-6 text-white" style={{ background: `linear-gradient(150deg, ${path.color}, ${path.color}bb)` }}>
        <span className="pointer-events-none absolute -start-10 -top-10 size-40 rounded-full bg-white/15 blur-2xl" />
        <div className="relative flex items-center gap-3"><span className="grid size-12 place-items-center rounded-2xl bg-white/20 text-2xl backdrop-blur"><GraduationCap className="size-6" /></span>
          <div><div className="text-[11px] font-extrabold uppercase tracking-[0.14em] opacity-90">מסלול · {path.module}</div><h1 className="text-[27px] font-extrabold tracking-[-0.02em]">{path.title}</h1></div></div>
        <div className="relative mt-4 flex flex-wrap items-center gap-4 text-[13px] font-semibold">
          <span>{path.chapters.length} פרקים</span><span className="opacity-60">·</span><span>{totalLessons} שיעורים</span><span className="opacity-60">·</span><span>{pctTrack}% הושלם</span>
        </div>
        <div className="relative mt-2.5 h-2 max-w-md overflow-hidden rounded-full bg-white/25"><div className="h-full rounded-full bg-white" style={{ width: `${pctTrack}%` }} /></div>
      </motion.header>

      {/* vertical roadmap */}
      <div className="relative mt-7 ps-1">
        <span className="absolute bottom-4 top-4 w-[3px] rounded-full bg-hairline" style={{ insetInlineStart: "22px" }} aria-hidden />
        <div className="flex flex-col gap-4">
          {path.chapters.map((ch, ci) => {
            const state = ci < path.currentChapter ? "available" : ci === path.currentChapter ? "cur" : "upcoming";
            const clr = state === "upcoming" ? "var(--hairline)" : path.color;
            return (
              <motion.div key={ch.title} initial={reduce ? false : { opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: Math.min(ci * 0.05, 0.3) }} className="relative ps-14">
                <span className="absolute z-[1] grid size-11 place-items-center rounded-full border-[3px] bg-surface text-[15px] font-extrabold" style={{ insetInlineStart: "0", borderColor: clr, color: state === "upcoming" ? "var(--ink-3)" : path.color, boxShadow: state === "cur" ? `0 0 0 5px ${path.color}1a` : "none" }}>
                  {state === "upcoming" ? <Lock className="size-4 opacity-55" /> : ci + 1}
                </span>
                <div className={`rounded-2xl border p-4 ${state === "cur" ? "border-hairline bg-surface shadow-sm" : "border-hairline bg-surface"}`}>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[15px] font-extrabold text-ink-1">{ch.title}</h3>
                    <span className="text-[11px] font-bold text-ink-3">· {ch.lessons.length} שיעורים</span>
                    {(() => { const mins = ch.lessons.reduce((s, l) => s + (l.minutes || 0), 0); return mins ? <span className="hidden text-[11px] font-bold text-ink-3 sm:inline">· ~{mins} דק׳</span> : null; })()}
                    {state === "cur" && <span className="ms-auto rounded-full px-2.5 py-0.5 text-[9.5px] font-extrabold text-white" style={{ background: path.color }}>אתה כאן</span>}
                  </div>
                  {state !== "upcoming" && (
                    <div className="mt-2.5 flex flex-col gap-1.5">
                      {ch.lessons.map((l, li) => l.slug ? (
                        <Link key={li} href={`/academy/lesson/${l.slug}/`} className="group flex items-center gap-2.5 rounded-xl border border-hairline bg-surface-2/40 p-2.5 transition hover:border-brand/40">
                          <span className="grid size-7 place-items-center rounded-lg text-white" style={{ background: path.color }}><Play className="size-3.5" /></span>
                          <span className="min-w-0 flex-1 text-[12.5px] font-bold text-ink-1">{l.title}</span>
                          {l.level && <Pill tone={LVL[l.level] || "neutral"} className="hidden shrink-0 text-[9.5px] sm:inline-flex">{l.level}</Pill>}
                          {l.minutes && <span className="hidden items-center gap-1 text-[10.5px] text-ink-3 sm:inline-flex"><Clock className="size-3" />~{l.minutes} דק׳</span>}
                          {pilotPct > 0 && l.slug === PILOT_SLUG && <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[9.5px] font-bold text-brand">{Math.round(pilotPct * 100)}%</span>}
                          <ArrowLeft className="size-4 shrink-0 text-ink-3 transition group-hover:-translate-x-0.5 group-hover:text-brand rtl:rotate-180" />
                        </Link>
                      ) : (
                        <div key={li} className="flex items-center gap-2.5 rounded-xl border border-dashed border-hairline p-2.5 opacity-70">
                          <span className="grid size-7 place-items-center rounded-lg bg-surface-2 text-ink-3"><Clock className="size-3.5" /></span>
                          <span className="min-w-0 flex-1 text-[12.5px] font-semibold text-ink-3">{l.title}</span>
                          <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[9.5px] font-bold text-ink-3">בקרוב</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {state === "upcoming" && <p className="mt-1.5 text-[11.5px] text-ink-3">ייפתח לאחר השלמת הפרק הנוכחי.</p>}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
