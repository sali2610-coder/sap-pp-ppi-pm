"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Lock, Play, ArrowLeft, GraduationCap, Clock } from "lucide-react";
import { PILOT_LESSONS } from "@/data/academy/lessons/pm-maintenance-order";
import { orderedBlocks } from "@/lib/academy/lesson-types";
import { useLessonPct } from "@/lib/academy/gamification";
import { Pill } from "@/components/ui";

const PILOT_SLUG = "pm-maintenance-order";
const LVL: Record<string, "good" | "warn" | "bad"> = { "בסיסי": "good", "בינוני": "warn", "מורכב": "bad" };

export interface PathChapter { title: string; lessons: { title: string; slug?: string; minutes?: number; level?: string }[] }
export interface LearningPath { module: string; title: string; titleEn?: string; color: string; chapters: PathChapter[]; currentChapter: number }

// PM flagship path (real chapter structure; the pilot lesson lives in "ביצוע אחזקה").
export const PM_PATH: LearningPath = {
  module: "PM", title: "אחזקת מפעל", titleEn: "Plant Maintenance", color: "#f97316", currentChapter: 3,
  chapters: [
    { title: "יסודות PM", lessons: [{ title: "מבנה ארגון האחזקה", slug: "pm-org-structure", minutes: 10, level: "בסיסי" }, { title: "מחזור חיי אחזקה", slug: "pm-maintenance-lifecycle", minutes: 10, level: "בסיסי" }] },
    { title: "נתוני אב", lessons: [{ title: "אב חומר וחלקי חילוף", slug: "pm-material", minutes: 12, level: "בסיסי" }, { title: "עץ מוצר אחזקה (BOM)", slug: "pm-bom", minutes: 12, level: "בסיסי" }, { title: "רשימות פעולות (Task Lists)", slug: "pm-task-list", minutes: 12, level: "בינוני" }, { title: "מרכזי עבודה", slug: "pm-work-center", minutes: 10, level: "בינוני" }, { title: "שותף עסקי (Business Partner)", slug: "pm-business-partner", minutes: 10, level: "בינוני" }] },
    { title: "אובייקטים טכניים", lessons: [{ title: "ציוד (Equipment)", slug: "pm-equipment", minutes: 12, level: "בסיסי" }, { title: "מיקומים פונקציונליים", slug: "pm-functional-location", minutes: 12, level: "בסיסי" }] },
    { title: "הודעות אחזקה", lessons: [{ title: "פתיחת הודעה", slug: "pm-notification-create", minutes: 10, level: "בסיסי" }, { title: "עיבוד הודעה לפקודה", slug: "pm-notification-to-order", minutes: 10, level: "בינוני" }] },
    { title: "ביצוע אחזקה", lessons: [{ title: "פקודת אחזקה — Maintenance Order", slug: PILOT_SLUG, minutes: 14, level: "בינוני" }, { title: "אישור עבודות", slug: "pm-confirmation", minutes: 12, level: "בינוני" }, { title: "סגירת פקודה (TECO)", slug: "pm-teco", minutes: 10, level: "בינוני" }, { title: "היתרים (Permits)", slug: "pm-permits", minutes: 8, level: "בינוני" }, { title: "התחשבנות פקודה (Settlement)", slug: "pm-settlement", minutes: 12, level: "מורכב" }] },
    { title: "אחזקה מונעת", lessons: [{ title: "תכניות אחזקה", slug: "pm-maintenance-plan", minutes: 14, level: "בינוני" }, { title: "תזמון ומונים", slug: "pm-scheduling-counters", minutes: 12, level: "בינוני" }, { title: "אחזקת שבר (Breakdown)", slug: "pm-breakdown", minutes: 10, level: "בינוני" }, { title: "כיול (Calibration · PM-QM)", slug: "pm-calibration", minutes: 12, level: "מורכב" }] },
    { title: "ניתוח ו-KPI", lessons: [{ title: "מדדי אחזקה", slug: "pm-kpi", minutes: 12, level: "מורכב" }, { title: "דוחות Fiori", slug: "pm-fiori-reports", minutes: 10, level: "בינוני" }] },
  ],
};

// PP-PI track — one lesson per source concept (23, no collapse). Full knowledge preserved.
export const PP_PATH: LearningPath = {
  module: "PP-PI", title: "תכנון ייצור", titleEn: "Production Planning (Process)", color: "#6d28d9", currentChapter: 0,
  chapters: [
    { title: "יסודות PP-PI", lessons: [{ title: "מבוא לתעשייה התהליכית", slug: "pp-intro", minutes: 10, level: "בסיסי" }, { title: "מבנה ארגון ייצור", slug: "pp-org-structure", minutes: 10, level: "בסיסי" }] },
    { title: "נתוני אב", lessons: [{ title: "אב חומר בייצור", slug: "pp-material", minutes: 12, level: "בסיסי" }, { title: "עץ מוצר (BOM)", slug: "pp-bom", minutes: 12, level: "בסיסי" }, { title: "מסלול ייצור (Routing)", slug: "pp-routing", minutes: 12, level: "בינוני" }, { title: "מתכון אב (Master Recipe)", slug: "pp-master-recipe", minutes: 12, level: "בינוני" }, { title: "מרכז עבודה", slug: "pp-work-center", minutes: 10, level: "בינוני" }, { title: "משאב (Resource)", slug: "pp-resource", minutes: 10, level: "בינוני" }, { title: "גרסת ייצור", slug: "pp-prod-version", minutes: 10, level: "בינוני" }] },
    { title: "תכנון", lessons: [{ title: "תכנון ביקוש (PIR)", slug: "pp-pir", minutes: 10, level: "בינוני" }, { title: "תכנון ראשי (MPS)", slug: "pp-mps", minutes: 10, level: "בינוני" }, { title: "MRP / MRP Live", slug: "pp-mrp", minutes: 14, level: "בינוני" }, { title: "אסטרטגיות תכנון", slug: "pp-strategies", minutes: 12, level: "מורכב" }, { title: "תכנון קיבולת", slug: "pp-capacity", minutes: 12, level: "מורכב" }] },
    { title: "ביצוע ייצור", lessons: [{ title: "פקודת תהליך", slug: "pp-process-order", minutes: 14, level: "בינוני" }, { title: "מרשם בקרה / PI Sheet", slug: "pp-control-recipe", minutes: 12, level: "מורכב" }, { title: "אישור פקודה", slug: "pp-confirmation", minutes: 12, level: "בינוני" }, { title: "Backflush וצריכת רכיבים", slug: "pp-backflush", minutes: 10, level: "בינוני" }, { title: "ניפוק וקבלת תוצר (GI/GR)", slug: "pp-gi-gr", minutes: 10, level: "בינוני" }] },
    { title: "ניהול אצוות", lessons: [{ title: "ניהול אצוות", slug: "pp-batch", minutes: 12, level: "בינוני" }] },
    { title: "התחשבנות וניתוח", lessons: [{ title: "סגירה טכנית (TECO)", slug: "pp-teco", minutes: 10, level: "בינוני" }, { title: "חישוב סטיות (Variance)", slug: "pp-variance", minutes: 12, level: "מורכב" }, { title: "התחשבנות פקודה", slug: "pp-settlement", minutes: 12, level: "מורכב" }] },
  ],
};

// QM track — one lesson per QM concept (16, no collapse). Full knowledge preserved.
export const QM_PATH: LearningPath = {
  module: "QM", title: "ניהול איכות", titleEn: "Quality Management", color: "#0891b2", currentChapter: 0,
  chapters: [
    { title: "יסודות QM", lessons: [{ title: "מבוא לניהול איכות", slug: "qm-intro", minutes: 10, level: "בסיסי" }, { title: "מבנה ארגון ואב-נתונים QM", slug: "qm-org-structure", minutes: 10, level: "בסיסי" }] },
    { title: "נתוני אב QM", lessons: [{ title: "תצוגת QM באב חומר", slug: "qm-material-view", minutes: 10, level: "בסיסי" }, { title: "מאפייני בדיקה (MIC)", slug: "qm-mic", minutes: 12, level: "בינוני" }, { title: "שיטות בדיקה", slug: "qm-methods", minutes: 8, level: "בינוני" }, { title: "קטלוגים וקודים", slug: "qm-catalogs", minutes: 10, level: "בינוני" }, { title: "תכניות דגימה", slug: "qm-sampling", minutes: 12, level: "מורכב" }, { title: "תכנית בדיקה", slug: "qm-inspection-plan", minutes: 12, level: "בינוני" }] },
    { title: "בדיקת איכות", lessons: [{ title: "לוט בדיקה (Inspection Lot)", slug: "qm-inspection-lot", minutes: 12, level: "בינוני" }, { title: "רישום תוצאות", slug: "qm-results-recording", minutes: 12, level: "בינוני" }, { title: "רישום פגמים", slug: "qm-defects", minutes: 8, level: "בינוני" }, { title: "החלטת שימוש (UD)", slug: "qm-usage-decision", minutes: 10, level: "בינוני" }] },
    { title: "הודעות איכות", lessons: [{ title: "הודעת איכות (Quality Notification)", slug: "qm-notification", minutes: 12, level: "בינוני" }] },
    { title: "QM בתהליכים", lessons: [{ title: "QM ברכש", slug: "qm-procurement", minutes: 12, level: "מורכב" }, { title: "QM בייצור (PP-PI)", slug: "qm-production", minutes: 12, level: "מורכב" }, { title: "תעודות איכות", slug: "qm-certificates", minutes: 10, level: "בינוני" }] },
  ],
};

export function LearningPathView({ path }: { path: LearningPath }) {
  const reduce = useReducedMotion();
  const pilotTotal = useMemo(() => orderedBlocks(PILOT_LESSONS[PILOT_SLUG]).length, []);
  const pilotPct = useLessonPct(PILOT_SLUG, pilotTotal);
  const totalLessons = path.chapters.reduce((s, c) => s + c.lessons.length, 0);
  const pctTrack = Math.round(((path.currentChapter + pilotPct) / path.chapters.length) * 100);

  return (
    <div dir="rtl" className="pb-16">
      <nav className="flex flex-wrap items-center gap-1.5 text-[11.5px] font-semibold text-ink-3">
        <Link href="/academy/" className="text-brand hover:underline">SAP Academy</Link><span>›</span><span>{path.module}</span><span>›</span><span>מסלול</span>
      </nav>

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
