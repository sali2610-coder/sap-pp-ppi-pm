"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import { Play, Flame, Target, ArrowLeft, Sparkles, Check, GraduationCap, LayoutDashboard, Trophy, Clock, TrendingUp, History, Library, Zap, type LucideIcon } from "lucide-react";
import { BOOKS, bookStats } from "@/data/library/academy-index";

// SVG badge icons (blueprint: no emoji-as-icon) keyed by gamification badge id
const BADGE_ICON: Record<string, LucideIcon> = { first: Target, blocks10: Library, streak3: Flame, streak7: Zap, lesson: GraduationCap };
import { useRecent } from "@/lib/academy/recent";
import { PILOT_LESSONS } from "@/data/academy/lessons/pm-maintenance-order";
import { orderedBlocks } from "@/lib/academy/lesson-types";
import { useGamification, useLessonPct } from "@/lib/academy/gamification";
import { useContinueCourse, useActiveCourses, resetAll, type CourseCard } from "@/lib/academy/store";
import { accentOf } from "@/lib/academy/theme";
import { allLessons, getLesson } from "@/lib/academy/model";
import { ResetButton } from "@/components/academy/reset-dialog";

/** Relative "time ago" in Hebrew (client-only; store is empty on the server). */
function timeAgo(at?: number): string {
  if (!at) return "";
  const s = Math.max(0, Math.floor((Date.now() - at) / 1000));
  if (s < 60) return "הרגע";
  const m = Math.floor(s / 60); if (m < 60) return `לפני ${m} דק׳`;
  const h = Math.floor(m / 60); if (h < 24) return `לפני ${h} שע׳`;
  const d = Math.floor(h / 24); if (d < 7) return `לפני ${d} ימים`;
  return `לפני ${Math.floor(d / 7)} שב׳`;
}

/** One active-course resume card (§2). Live progress bar, current lesson/chapter, time-ago. */
function CourseResumeCard({ c }: { c: CourseCard }) {
  const accent = accentOf(c.module);
  return (
    <div className="group flex flex-col rounded-2xl border border-hairline bg-surface p-4 transition duration-200 hover:-translate-y-1 hover:border-[#dfe2e7] hover:shadow-[0_22px_44px_-22px_rgba(11,12,14,.22)]">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5"><span className="grid size-7 place-items-center rounded-lg text-[10px] font-extrabold text-white" style={{ background: accent }}>{c.module.slice(0, 2)}</span><span className="text-[13px] font-extrabold">{c.module}</span></span>
        {c.openedAt ? <span className="text-[10.5px] text-ink-3">{timeAgo(c.openedAt)}</span> : null}
      </div>
      <div className="mt-2.5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-ink-3">פרק {c.chapterIndex} · שיעור {c.lessonNum}/{c.chapterSize}</div>
      <div className="text-[14px] font-extrabold leading-tight text-ink-1" dir="auto">{c.lessonTitle}</div>
      <div className="truncate text-[11px] text-ink-3" dir="auto">{c.chapterTitle}</div>
      <div className="mt-3 h-[7px] overflow-hidden rounded-full bg-black/[0.06]">
        <motion.div className="h-full rounded-full" style={{ background: accent }} initial={false} animate={{ width: `${c.pct}%` }} transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }} />
      </div>
      <div className="mt-1 flex justify-between text-[11px] font-bold text-ink-3"><span>{c.pct}% הושלם</span><span>{c.completedLessons}/{c.totalLessons} שיעורים</span></div>
      <Link href={`/academy/lesson/${c.resumeSlug}/`} className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl py-2 text-[12.5px] font-extrabold text-white transition hover:opacity-90" style={{ background: accent }}>המשך <ArrowLeft className="size-4 rtl:rotate-180" /></Link>
    </div>
  );
}

const PILOT_SLUG = "pm-maintenance-order";
// Modules with the new Lesson Reader → the canonical /academy path. Others (MM/WM/
// PP-DS/S&OP/PM-User) keep their reference route until migrated (no premature redirect).
const ACADEMY_PATH: Record<string, string> = { pm: "/academy/path/pm/", pp: "/academy/path/pp-pi/", qm: "/academy/path/qm/", pmu: "/academy/path/pm-user/", mm: "/academy/path/mm/", wm: "/academy/path/wm/", ppds: "/academy/path/pp-ds/", sop: "/academy/path/sop/" };
const trackHref = (id: string, base: string) => ACADEMY_PATH[id] ?? `${base}/`;
const DAYS = ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"];

function Ring({ pct, size = 64, stroke = 6, color }: { pct: number; size?: number; stroke?: number; color: string }) {
  pct = Math.max(0, Math.min(1, pct));
  const r = (size - stroke) / 2, c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90"><circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#eee" strokeWidth={stroke} /><circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={c} strokeDashoffset={c * (1 - pct)} strokeLinecap="round" /></svg>
      <span className="absolute inset-0 grid place-items-center text-[13px] font-extrabold" style={{ fontSize: size < 50 ? 10 : 14 }}>{Math.round(pct * 100)}%</span>
    </div>
  );
}

function MiniTrack({ t, meta }: { t: typeof BOOKS[number]; meta: string }) {
  const href = trackHref(t.id, t.base);
  return (
    <Link href={href} className="group flex items-center gap-3 rounded-xl border border-hairline bg-surface p-3 transition hover:border-brand/30">
      <span className={`grid size-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${t.tint} text-[10px] font-extrabold text-white`}>{t.module.slice(0, 2)}</span>
      <span className="min-w-0 flex-1"><span className="block truncate text-[13px] font-bold text-ink-1">{t.titleHe}</span><span className="text-[10.5px] text-ink-3">{meta}</span></span>
      <ArrowLeft className="size-4 shrink-0 text-ink-3 transition group-hover:-translate-x-0.5 group-hover:text-brand rtl:rotate-180" />
    </Link>
  );
}

export function AcademyHome() {
  const reduce = useReducedMotion();
  const g = useGamification();
  const pilotTotal = useMemo(() => orderedBlocks(PILOT_LESSONS[PILOT_SLUG]).length, []);
  const pilotPct = useLessonPct(PILOT_SLUG, pilotTotal);

  // Continue Learning — course-level target (§1): last-opened course → last-active →
  // highest-recent-activity → default. Never a hardcoded module.
  const cc = useContinueCourse();
  const contLesson = cc ? getLesson(cc.resumeSlug) : undefined;
  const tAccent = accentOf(cc?.module ?? "PM");
  const tPct = useLessonPct(cc?.resumeSlug ?? "", contLesson?.requiredBlocks ?? 0);
  const tStarted = (cc?.pct ?? 0) > 0 || tPct > 0;
  const activeCourses = useActiveCourses();
  // §P0.3 — first-time vs returning: never greet a brand-new user with "welcome back".
  const returning = g.blocksDone > 0 || activeCourses.length > 0;

  const tracks = BOOKS;
  const recent = useRecent();
  const updated = useMemo(() => [...BOOKS].sort((a, b) => (b.lastUpdated || "").localeCompare(a.lastUpdated || "")).slice(0, 4), []);
  const popular = useMemo(() => [...BOOKS].sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, 4), []);
  // Was framer `initial={{ opacity: 0 }}` (+ whileInView for the sections).
  // The static export serialised those as inline opacity:0, so the Academy
  // hero and every section below it shipped invisible until framer-motion
  // hydrated. Same durations and easing, now CSS, so paint never waits on JS.
  const RISE = "neo-rise";
  const riseStyle = { "--neo-y": "14px", "--neo-dur": "0.5s" } as React.CSSProperties;
  const heroStyle = { "--neo-y": "12px", "--neo-dur": "0.5s" } as React.CSSProperties;

  return (
    <div dir="rtl" className="pb-16">
      {/* HERO */}
      <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink-3">SAP Academy</div>
      <div className={`${RISE} mt-1.5 grid items-stretch gap-4 lg:grid-cols-[1fr_300px]`} style={heroStyle}>
        <div>
          <h1 className="text-[27px] font-extrabold tracking-[-0.02em]">{returning ? "ברוך שובך" : "ברוך הבא ל-SAP Academy"}</h1>
          {returning
            ? <p className="mt-1 inline-flex flex-wrap items-center gap-1 text-[14px] text-ink-3">{g.streak > 0 ? <><Flame className="size-4 text-[#f97316]" />רצף של <b className="text-[#f97316]">{g.streak} ימים</b> · </> : null}עוד <b className="text-[#f97316]">{Math.max(0, g.weeklyTarget - g.weeklyDone)} ימי למידה</b> ליעד השבועי.</p>
            : <p className="mt-1 max-w-xl text-[14px] text-ink-3">מסלולי לימוד מובנים ל-SAP — בחר קורס, התקדם פרק אחר פרק, וההתקדמות תישמר אוטומטית.</p>}

          {/* continue learning — course-level target from the store (§1) */}
          {cc && (
          <div className="relative mt-4 flex flex-col gap-4 overflow-hidden rounded-3xl border border-hairline bg-surface p-5 sm:flex-row sm:items-center">
            <span className="absolute inset-y-0 end-0 w-1.5" style={{ background: tAccent }} />
            <span className="grid h-[120px] w-24 shrink-0 flex-col place-items-start justify-end rounded-2xl p-3 text-white shadow-[0_14px_30px_-12px_rgba(0,0,0,.3)]" style={{ background: `linear-gradient(135deg, ${tAccent}, ${tAccent}cc)` }}>
              <span className="mt-auto"><span className="block text-[10px] font-bold opacity-85">{cc.module} · פרק {cc.chapterIndex}</span><span className="block text-[13px] font-extrabold leading-tight" dir="auto">{cc.chapterTitle}</span></span>
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.1em]" style={{ color: tAccent }}><Play className="size-3.5" />{tStarted ? "המשך מהמקום שהפסקת" : "השיעור הבא שלך"}{cc.openedAt ? <span className="font-bold normal-case tracking-normal text-ink-3">· {timeAgo(cc.openedAt)}</span> : null}</div>
              <h2 className="mt-1.5 text-[19px] font-extrabold tracking-[-0.01em]" dir="auto">{cc.lessonTitle}</h2>
              <p className="text-[12.5px] text-ink-3">פרק {cc.chapterIndex} · שיעור {cc.lessonNum} מתוך {cc.chapterSize}</p>
              {tStarted && (<><div className="mt-3 h-[7px] max-w-[340px] overflow-hidden rounded-full bg-black/[0.06]"><motion.div className="h-full rounded-full" style={{ background: tAccent }} initial={false} animate={{ width: `${Math.round(tPct * 100)}%` }} transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }} /></div><div className="mt-1 flex max-w-[340px] justify-between text-[11px] font-bold text-ink-3"><span>{Math.round(tPct * 100)}% בשיעור</span><span>{cc.pct}% בקורס</span></div></>)}
              <Link href={`/academy/lesson/${cc.resumeSlug}/`} className="mt-3.5 inline-flex items-center gap-2 rounded-xl bg-ink-1 px-5 py-2.5 text-[13.5px] font-extrabold text-white transition hover:bg-black">{tStarted ? "המשך ללמוד" : "התחל ללמוד"} <ArrowLeft className="size-4 rtl:rotate-180" /></Link>
            </div>
          </div>
          )}
        </div>

        {/* streak + goal */}
        <div className="flex flex-row gap-4 lg:flex-col">
          <div className="flex-1 rounded-3xl border border-hairline bg-gradient-to-br from-[#1c1d21] to-[#0b0c0e] p-4 text-white">
            <div className="flex items-center gap-2.5"><Flame className={`size-6 ${g.streak > 0 ? "text-[#f97316]" : "text-white/40"}`} /><div><div className="text-[24px] font-black tracking-[-0.02em]">{g.streak} {g.streak === 1 ? "יום" : "ימים"}</div><div className="text-[11px] text-white/60">{g.streak > 0 ? `רצף למידה · שיא ${g.longestStreak}` : "התחל רצף היום"}</div></div></div>
            <div className="mt-3 flex justify-between">{DAYS.map((d, i) => (<div key={i} className="w-[30px] text-center"><div className={`mx-auto mb-1 grid size-[26px] place-items-center rounded-full text-[12px] ${g.activeDays7[i] ? "bg-[#f97316] text-white" : "bg-white/8 text-white/40"}`}>{g.activeDays7[i] ? <Check className="size-3.5" /> : ""}</div><div className="text-[9.5px] text-white/50">{d}</div></div>))}</div>
          </div>
          <div className="flex flex-1 items-center gap-3.5 rounded-3xl border border-hairline bg-surface p-4">
            <Ring pct={g.weeklyTarget ? g.weeklyDone / g.weeklyTarget : 0} color="#f97316" />
            <div><div className="flex items-center gap-1.5 text-[13px] font-extrabold"><Target className="size-3.5 text-[#f97316]" />יעד שבועי</div><div className="text-[11px] text-ink-3">{g.weeklyDone} מתוך {g.weeklyTarget} ימי למידה</div>{g.blocksDone > 0 && <div className="text-[11px] text-ink-3">{g.blocksDone} בלוקים הושלמו</div>}</div>
          </div>
        </div>
      </div>

      {/* CONTINUE WHERE YOU LEFT OFF (§2) — one card per active course */}
      {activeCourses.length > 0 ? (
        <div className={`${RISE} mt-8`} style={riseStyle}>
          <div className="mb-3.5 flex items-baseline justify-between">
            <h2 className="text-[19px] font-extrabold tracking-[-0.01em]">המשך מהמקום שעצרת</h2>
            <span className="text-[12px] text-ink-3">{activeCourses.length} {activeCourses.length === 1 ? "קורס פעיל" : "קורסים פעילים"}</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activeCourses.map((c) => <CourseResumeCard key={c.moduleId} c={c} />)}
          </div>
        </div>
      ) : (
        /* EMPTY STATE (§11) — no active course → recommended */
        <div className={`${RISE} mt-8 rounded-3xl border border-dashed border-hairline bg-surface-2/40 p-8 text-center`} style={riseStyle}>
          <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand"><GraduationCap className="size-6" /></span>
          <h2 className="mt-3 text-[16px] font-extrabold text-ink-1">עדיין לא התחלת ללמוד</h2>
          <p className="mx-auto mt-1 max-w-sm text-[13px] text-ink-3">בחר קורס והתחל — ההתקדמות שלך תישמר אוטומטית ותופיע כאן כדי שתמשיך בדיוק מהמקום שעצרת.</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <Link href="/academy/dashboard/" className="inline-flex items-center gap-2 rounded-xl bg-ink-1 px-5 py-2.5 text-[13px] font-extrabold text-white transition hover:bg-black">בחר קורס מתוך המסלולים <ArrowLeft className="size-4 rtl:rotate-180" /></Link>
          </div>
        </div>
      )}

      {/* The per-course timeline / "אתה כאן" now lives ONLY on /academy/path/[module]
          and inside the active-course resume cards above — never as a hardcoded PM
          roadmap on the landing page. A learner with no active session sees no timeline. */}

      {/* COURSE CARDS */}
      <div className={`${RISE} mt-8`} style={riseStyle}>
        <div className="mb-3.5 flex items-baseline justify-between"><h2 className="text-[19px] font-extrabold tracking-[-0.01em]">מסלולי הלמידה</h2></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tracks.map((t) => { const st = bookStats(t.id); const href = trackHref(t.id, t.base); const pct = t.id === "pm" ? pilotPct : 0; return (
            <Link key={t.id} href={href} className="group flex flex-col overflow-hidden rounded-2xl border border-hairline bg-surface transition duration-200 hover:-translate-y-1 hover:border-[#dfe2e7] hover:shadow-[0_22px_44px_-22px_rgba(11,12,14,.22)]">
              <div className={`relative flex h-28 items-end bg-gradient-to-br ${t.tint} p-3.5 text-white`}>
                <span className="absolute inset-x-3.5 top-3 flex items-center justify-between"><span className="text-[10px] font-extrabold uppercase tracking-[0.1em] opacity-90">{t.module}</span>{pct > 0 && <span className="rounded-full bg-white/25 px-2 py-0.5 text-[9.5px] font-bold backdrop-blur">בתהליך</span>}</span>
                <span className="flex flex-col leading-tight"><span className="text-[15px] font-extrabold">{t.titleHe}</span><span className="tech mt-0.5 text-[10.5px] font-semibold text-white/75" dir="ltr">{t.titleEn}</span></span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                {/* what you get, at a glance: scope (chapters/units) + time budget — so a
                    student can judge the commitment before starting. */}
                <div className="flex flex-wrap gap-1.5"><span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[10px] font-bold text-ink-2">{st.chapters} פרקים</span><span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[10px] font-bold text-ink-2">{st.nodes} יחידות</span><span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[10px] font-bold text-ink-2">~{Math.round(st.readMin / 60)} ש׳ לימוד</span></div>
                <div className="mt-auto flex items-center gap-3 pt-3.5"><Ring pct={pct} size={38} stroke={4} color={t.id === "pm" ? "#f97316" : "#94a3b8"} /><span className="flex-1 rounded-xl bg-surface-2 py-2 text-center text-[12.5px] font-extrabold text-ink-1 transition group-hover:bg-ink-1 group-hover:text-white">{pct > 0 ? "המשך" : "התחל"}</span></div>
              </div>
            </Link>
          ); })}
        </div>
      </div>

      {/* ACHIEVEMENTS */}
      <div className={`${RISE} mt-8`} style={riseStyle}>
        <div className="mb-3.5 flex items-baseline justify-between"><h2 className="flex items-center gap-2 text-[19px] font-extrabold tracking-[-0.01em]"><Trophy className="size-5 text-[#d97706]" />הישגים</h2></div>
        <div className="flex flex-wrap gap-4">
          {g.badges.map((b) => { const Ic = BADGE_ICON[b.id] || Target; return (
            <div key={b.id} className={`w-24 text-center ${b.earned ? "" : "opacity-60"}`}>
              <div className={`mx-auto mb-2 grid size-16 place-items-center rounded-full border-2 ${b.earned ? "border-[#fcd34d] bg-gradient-to-br from-[#fef3c7] to-[#fde68a] text-[#b45309]" : "border-hairline bg-surface-2 text-ink-3"}`}><Ic className="size-7" /></div>
              <div className="text-[11px] font-extrabold">{b.label}</div>
              <div className="text-[9.5px] text-ink-3">{b.earned ? b.hint : "נעול"}</div>
            </div>
          ); })}
        </div>
        {g.blocksDone === 0 && <p className="mt-3 text-[12px] text-ink-3">התחל את השיעור הראשון כדי לפתוח תגים ולבנות רצף למידה.</p>}
      </div>

      {/* RECENTLY VIEWED (§4) — real history */}
      {recent.length > 0 && (
        <div className={`${RISE} mt-8`} style={riseStyle}>
          <div className="mb-3.5 flex items-baseline gap-2"><h2 className="flex items-center gap-2 text-[19px] font-extrabold tracking-[-0.01em]"><History className="size-5 text-ink-3" />נצפו לאחרונה</h2></div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {recent.map((r) => (
              <Link key={r.id} href={r.href} className="flex w-[220px] shrink-0 items-center gap-3 rounded-2xl border border-hairline bg-surface p-3 transition hover:border-brand/30 hover:shadow-sm">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-surface-2 text-ink-3">{r.kind === "lesson" ? <Play className="size-4" /> : <GraduationCap className="size-4" />}</span>
                <span className="min-w-0 flex-1"><span className="block truncate text-[12.5px] font-extrabold text-ink-1">{r.title}</span><span className="text-[10.5px] text-ink-3">{r.module} · {r.kind === "lesson" ? "שיעור" : "מסלול"}</span></span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* RECENTLY UPDATED + POPULAR (§4) — real academy-index data */}
      <div className={`${RISE} mt-8 grid gap-6 lg:grid-cols-2`} style={riseStyle}>
        <div>
          <div className="mb-3 flex items-baseline gap-2"><h2 className="flex items-center gap-2 text-[16px] font-extrabold"><Clock className="size-4 text-ink-3" />עודכן לאחרונה</h2></div>
          <div className="flex flex-col gap-2">{updated.map((t) => <MiniTrack key={t.id} t={t} meta={`עודכן ${t.lastUpdated}`} />)}</div>
        </div>
        <div>
          <div className="mb-3 flex items-baseline gap-2"><h2 className="flex items-center gap-2 text-[16px] font-extrabold"><TrendingUp className="size-4 text-[#0f766e]" />פופולרי באקדמיה</h2></div>
          <div className="flex flex-col gap-2">{popular.map((t) => <MiniTrack key={t.id} t={t} meta={`ציון איכות ${t.score}`} />)}</div>
        </div>
      </div>

      {/* AI assistant (design affordance) */}
      <Link href="/chat/" className="fixed bottom-6 start-6 z-30 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-[13.5px] font-extrabold text-white shadow-[0_14px_34px_-12px_rgba(214,32,39,.6)] transition hover:bg-brand-dark"><Sparkles className="size-4" /> עוזר הלמידה</Link>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-5">
        <Link href="/academy/dashboard/" className="inline-flex items-center gap-1.5 text-[12px] font-bold text-ink-3 hover:text-brand"><LayoutDashboard className="size-3.5" /> לוח בקרה מלא · דוחות איכות</Link>
        <ResetButton danger label="אפס את כל SAP Academy" title="איפוס כל התקדמות ה-Academy" scopeText="כל המסלולים והשיעורים (PM · PP-PI · QM)" count={allLessons().length} onConfirm={resetAll} />
      </div>
    </div>
  );
}
