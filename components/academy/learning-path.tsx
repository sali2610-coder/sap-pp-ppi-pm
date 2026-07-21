"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Lock, Play, Check, ArrowLeft, GraduationCap, Clock } from "lucide-react";
import { PILOT_LESSONS } from "@/data/academy/lessons/pm-maintenance-order";
import { orderedBlocks } from "@/lib/academy/lesson-types";
import { useLessonPct } from "@/lib/academy/gamification";
import { useModuleProgress, useIsDone, resetPath, resetChapter } from "@/lib/academy/store";
import { moduleIdOf, getModule } from "@/lib/academy/model";
import { Pill, Breadcrumb } from "@/components/ui";
import { ResetButton } from "@/components/academy/reset-dialog";

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

  // Sequential locking by REAL completion (§8): a chapter opens only when every
  // earlier chapter is complete. "current" = first chapter with an incomplete
  // lesson. Never derived from a hardcoded currentChapter.
  const isDone = useIsDone();
  const model = getModule(moduleIdOf(path.module));
  const chapterDone = (n: number) => { const ls = model ? model.lessons.filter((l) => l.chapterIndex === n) : []; return ls.length > 0 && ls.every((l) => isDone(l.slug)); };
  const blockingChapterOf = (ci: number) => { for (let n = 1; n <= ci; n++) if (!chapterDone(n)) return n; return undefined; };
  const stateOf = (ci: number): "available" | "cur" | "upcoming" => {
    if (blockingChapterOf(ci) !== undefined) return "upcoming";
    return chapterDone(ci + 1) ? "available" : "cur";
  };
  // fraction of the timeline spine to fill (completed chapters), animated
  const completedChapters = path.chapters.reduce((n, _c, ci) => (chapterDone(ci + 1) ? n + 1 : n), 0);
  const completedFrac = path.chapters.length ? Math.round((completedChapters / path.chapters.length) * 100) : 0;

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
        <div className="relative mt-3 flex justify-end">
          <ResetButton
            label="אפס קורס"
            title="לאפס את כל ההתקדמות בקורס?"
            scopeText={`הפעולה תאפס את הקורס ${path.title} · ${path.module} בלבד — שאר הקורסים לא ייפגעו.`}
            details={["שיעורים", "בלוקים", "סטטוס בחנים", "התקדמות", "השיעור הנוכחי", "נקודת ההמשך", "הישגים בקורס זה"]}
            count={model?.totalLessons ?? 0}
            confirmLabel="אפס קורס"
            irreversible
            danger
            onConfirm={() => resetPath(moduleIdOf(path.module))}
            className="tap inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-2.5 py-1 text-[11px] font-bold text-white/90 backdrop-blur transition hover:bg-white/25" />
        </div>
      </motion.header>

      {/* vertical roadmap — animated completed→current→locked timeline (§7) */}
      <div className="relative mt-7 ps-1">
        <span className="absolute bottom-4 top-4 w-[3px] rounded-full bg-hairline" style={{ insetInlineStart: "22px" }} aria-hidden />
        {/* accent fill proportional to completed chapters, animated */}
        <motion.span className="absolute top-4 w-[3px] rounded-full" style={{ insetInlineStart: "22px", background: path.color, maxHeight: "calc(100% - 2rem)" }} initial={reduce ? { height: `${completedFrac}%` } : { height: 0 }} animate={{ height: `${completedFrac}%` }} transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }} aria-hidden />
        <div className="flex flex-col gap-4">
          {path.chapters.map((ch, ci) => {
            const state = stateOf(ci);
            const done = state === "available";
            const clr = state === "upcoming" ? "var(--hairline)" : done ? "#16a34a" : path.color;
            return (
              <motion.div key={ch.title} initial={reduce ? false : { opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: Math.min(ci * 0.05, 0.3) }} className="relative ps-14">
                <span className="absolute z-[1] grid size-11 place-items-center rounded-full border-[3px] bg-surface text-[15px] font-extrabold" style={{ insetInlineStart: "0", borderColor: clr, color: state === "upcoming" ? "var(--ink-3)" : done ? "#16a34a" : path.color, boxShadow: state === "cur" ? `0 0 0 5px ${path.color}1a` : "none" }}>
                  {state === "upcoming" ? <Lock className="size-4 opacity-55" />
                    : done ? <motion.span initial={reduce ? false : { scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 320, damping: 16 }}><Check className="size-5" /></motion.span>
                    : ci + 1}
                </span>
                <div className={`rounded-2xl border p-4 ${state === "cur" ? "border-hairline bg-surface shadow-sm" : "border-hairline bg-surface"}`}>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[15px] font-extrabold text-ink-1">{ch.title}</h3>
                    <span className="text-[11px] font-bold text-ink-3">· {ch.lessons.length} שיעורים</span>
                    {(() => { const mins = ch.lessons.reduce((s, l) => s + (l.minutes || 0), 0); return mins ? <span className="hidden text-[11px] font-bold text-ink-3 sm:inline">· ~{mins} דק׳</span> : null; })()}
                    {state === "cur" && <span className="ms-auto rounded-full px-2.5 py-0.5 text-[9.5px] font-extrabold text-white" style={{ background: path.color }}>אתה כאן</span>}
                    {state === "available" && <ResetButton label="התחל פרק מחדש" title="להתחיל את הפרק מחדש?" scopeText={`הפעולה תאפס את פרק ${ci + 1} · ${ch.title} בלבד. שאר הפרקים והקורסים לא ייפגעו.`} details={[`${ch.lessons.length} שיעורים בפרק יחזרו למצב לא-הושלם.`, "בלוקים, בחנים ונקודת ההמשך בפרק יתאפסו.", "תוכן הפרק לא נמחק."]} count={ch.lessons.length} confirmLabel="התחל מחדש" onConfirm={() => resetChapter(moduleIdOf(path.module), ci + 1)} className="ms-auto tap inline-flex items-center gap-1 rounded-lg border border-hairline px-2 py-0.5 text-[10px] font-bold text-ink-3 transition-colors hover:border-brand/40 hover:text-brand" />}
                  </div>
                  {state !== "upcoming" && (
                    <div className="mt-2.5 flex flex-col gap-1.5">
                      {ch.lessons.map((l, li) => l.slug ? (
                        <Link key={li} href={`/academy/lesson/${l.slug}/`} className="group flex items-center gap-2.5 rounded-xl border border-hairline bg-surface-2/40 p-2.5 transition hover:border-brand/40">
                          <span className="grid size-7 place-items-center rounded-lg text-white" style={{ background: isDone(l.slug!) ? "#16a34a" : path.color }}>{isDone(l.slug!) ? <Check className="size-3.5" /> : <Play className="size-3.5" />}</span>
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
                  {state === "upcoming" && (() => { const bn = blockingChapterOf(ci); return <p className="mt-1.5 flex items-center gap-1.5 text-[11.5px] text-ink-3"><Lock className="size-3 shrink-0" aria-hidden />{bn ? `יש להשלים קודם את פרק ${bn} · ${path.chapters[bn - 1].title}` : "ייפתח לאחר השלמת הפרק הקודם"}</p>; })()}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
