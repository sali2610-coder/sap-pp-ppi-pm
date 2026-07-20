"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import { Play, Flame, Target, ArrowLeft, Sparkles, Lock, Check, GraduationCap, LayoutDashboard, Trophy, Clock, TrendingUp, History, Library, Zap, type LucideIcon } from "lucide-react";
import { BOOKS, bookStats } from "@/data/library/academy-index";

// SVG badge icons (blueprint: no emoji-as-icon) keyed by gamification badge id
const BADGE_ICON: Record<string, LucideIcon> = { first: Target, blocks10: Library, streak3: Flame, streak7: Zap, lesson: GraduationCap };
import { useRecent } from "@/lib/academy/recent";
import { PILOT_LESSONS } from "@/data/academy/lessons/pm-maintenance-order";
import { orderedBlocks } from "@/lib/academy/lesson-types";
import { useGamification, useLessonPct } from "@/lib/academy/gamification";
import { useContinueTarget, resetAll } from "@/lib/academy/store";
import { accentOf } from "@/lib/academy/theme";
import { allLessons } from "@/lib/academy/model";
import { ResetButton } from "@/components/academy/reset-dialog";

const PILOT_SLUG = "pm-maintenance-order";
// Modules with the new Lesson Reader → the canonical /academy path. Others (MM/WM/
// PP-DS/S&OP/PM-User) keep their reference route until migrated (no premature redirect).
const ACADEMY_PATH: Record<string, string> = { pm: "/academy/path/pm/", pp: "/academy/path/pp-pi/", qm: "/academy/path/qm/", pmu: "/academy/path/pm-user/" };
const trackHref = (id: string, base: string) => ACADEMY_PATH[id] ?? `${base}/`;
const DAYS = ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"];
// real PM track chapters (module academy structure); the pilot lesson sits in "ביצוע אחזקה"
const PM_TRACK = ["יסודות PM", "אובייקטים טכניים", "הודעות אחזקה", "ביצוע אחזקה", "אחזקה מונעת", "ניתוח ו-KPI"];
const PILOT_CHAPTER = 3; // 0-based index of "ביצוע אחזקה"

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

  // Continue Learning — algorithmic target from the single store (§7), not hardcoded.
  const target = useContinueTarget();
  const tAccent = accentOf(target?.module ?? "PM");
  const tPct = useLessonPct(target?.slug ?? "", target?.requiredBlocks ?? 0);
  const tStarted = tPct > 0;

  const tracks = BOOKS;
  const recent = useRecent();
  const updated = useMemo(() => [...BOOKS].sort((a, b) => (b.lastUpdated || "").localeCompare(a.lastUpdated || "")).slice(0, 4), []);
  const popular = useMemo(() => [...BOOKS].sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, 4), []);
  const rise: MotionProps = reduce ? {} : { initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-40px" }, transition: { duration: 0.5, ease: [0.2, 0.7, 0.2, 1] } };
  const heroAnim: MotionProps = reduce ? {} : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };

  return (
    <div dir="rtl" className="pb-16">
      {/* HERO */}
      <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink-3">SAP Academy</div>
      <motion.div {...heroAnim} className="mt-1.5 grid items-stretch gap-4 lg:grid-cols-[1fr_300px]">
        <div>
          <h1 className="text-[27px] font-extrabold tracking-[-0.02em]">ברוך שובך</h1>
          <p className="mt-1 inline-flex flex-wrap items-center gap-1 text-[14px] text-ink-3">{g.streak > 0 ? <><Flame className="size-4 text-[#f97316]" />רצף של <b className="text-[#f97316]">{g.streak} ימים</b> · </> : null}עוד <b className="text-[#f97316]">{Math.max(0, g.weeklyTarget - g.weeklyDone)} ימי למידה</b> ליעד השבועי.</p>

          {/* continue learning — real target from the store (§7) */}
          {target && (
          <div className="relative mt-4 flex flex-col gap-4 overflow-hidden rounded-3xl border border-hairline bg-surface p-5 sm:flex-row sm:items-center">
            <span className="absolute inset-y-0 end-0 w-1.5" style={{ background: tAccent }} />
            <span className="grid h-[120px] w-24 shrink-0 flex-col place-items-start justify-end rounded-2xl p-3 text-white shadow-[0_14px_30px_-12px_rgba(0,0,0,.3)]" style={{ background: `linear-gradient(135deg, ${tAccent}, ${tAccent}cc)` }}>
              <span className="mt-auto"><span className="block text-[10px] font-bold opacity-85">{target.module} · פרק {target.chapterIndex}</span><span className="block text-[13px] font-extrabold leading-tight" dir="auto">{target.chapterTitle}</span></span>
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.1em]" style={{ color: tAccent }}><Play className="size-3.5" />{tStarted ? "המשך מהמקום שהפסקת" : "השיעור הבא שלך"}</div>
              <h3 className="mt-1.5 text-[19px] font-extrabold tracking-[-0.01em]" dir="auto">{target.title}</h3>
              <p className="text-[12.5px] text-ink-3">פרק {target.chapterIndex} · שיעור {target.posInChapter} מתוך {target.chapterSize}</p>
              {tStarted && (<><div className="mt-3 h-[7px] max-w-[340px] overflow-hidden rounded-full bg-black/[0.06]"><div className="h-full rounded-full" style={{ width: `${Math.round(tPct * 100)}%`, background: tAccent }} /></div><div className="mt-1 flex max-w-[340px] justify-between text-[11px] font-bold text-ink-3"><span>{Math.round(tPct * 100)}% הושלם</span><span>{Math.round(tPct * (target.requiredBlocks || 0))}/{target.requiredBlocks} בלוקים</span></div></>)}
              <Link href={`/academy/lesson/${target.slug}/`} className="mt-3.5 inline-flex items-center gap-2 rounded-xl bg-ink-1 px-5 py-2.5 text-[13.5px] font-extrabold text-white transition hover:bg-black">{tStarted ? "המשך ללמוד" : "התחל ללמוד"} <ArrowLeft className="size-4 rtl:rotate-180" /></Link>
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
      </motion.div>

      {/* ROADMAP */}
      <motion.div {...rise} className="mt-8">
        <div className="mb-3.5 flex items-baseline justify-between"><h2 className="text-[19px] font-extrabold tracking-[-0.01em]">המסלול שלך</h2><Link href="/academy/path/pm/" className="text-[12px] font-bold text-brand">צפה במסלול המלא →</Link></div>
        <div className="rounded-3xl border border-hairline bg-surface p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-2.5"><span className="grid size-9 place-items-center rounded-xl bg-[#f97316] text-white"><GraduationCap className="size-5" /></span><div><h3 className="text-[16px] font-extrabold">אחזקת מפעל · PM</h3><div className="text-[12px] text-ink-3">{PM_TRACK.length} פרקים · {bookStats("pm").nodes} יחידות</div></div></div>
          <div className="chip-rail flex items-start overflow-x-auto pb-1.5">
            {PM_TRACK.map((ch, i) => {
              const state = i < PILOT_CHAPTER ? "todo" : i === PILOT_CHAPTER ? "cur" : "upcoming";
              const clr = state === "cur" ? "#f97316" : "var(--hairline)";
              return (
                <div key={ch} className="relative w-[130px] shrink-0 text-center sm:w-[150px]">
                  {i > 0 && <span className="absolute top-[22px] h-[3px] w-full" style={{ insetInlineStart: "-50%", background: i <= PILOT_CHAPTER ? "#f97316" : "var(--hairline)" }} />}
                  <div className="relative z-[1] mx-auto mb-2.5 grid size-[46px] place-items-center rounded-full border-[3px] bg-surface text-[16px] font-extrabold" style={{ borderColor: clr, color: state === "cur" ? "#f97316" : "var(--ink-3)", boxShadow: state === "cur" ? "0 0 0 5px #fff7ed" : "none" }}>
                    {state === "todo" ? i + 1 : state === "cur" ? i + 1 : <Lock className="size-4 opacity-55" />}
                  </div>
                  <div className="text-[12px] font-extrabold text-ink-2">{ch}</div>
                  {state === "cur" && <span className="mt-1.5 inline-block rounded-full bg-[#f97316] px-2 py-0.5 text-[9.5px] font-extrabold text-white">אתה כאן</span>}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* COURSE CARDS */}
      <motion.div {...rise} className="mt-8">
        <div className="mb-3.5 flex items-baseline justify-between"><h2 className="text-[19px] font-extrabold tracking-[-0.01em]">מסלולי הלמידה</h2></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tracks.map((t) => { const st = bookStats(t.id); const href = trackHref(t.id, t.base); const pct = t.id === "pm" ? pilotPct : 0; return (
            <Link key={t.id} href={href} className="group flex flex-col overflow-hidden rounded-2xl border border-hairline bg-surface transition duration-200 hover:-translate-y-1 hover:border-[#dfe2e7] hover:shadow-[0_22px_44px_-22px_rgba(11,12,14,.22)]">
              <div className={`relative flex h-28 items-end bg-gradient-to-br ${t.tint} p-3.5 text-white`}>
                <span className="absolute inset-x-3.5 top-3 flex items-center justify-between"><span className="text-[10px] font-extrabold uppercase tracking-[0.1em] opacity-90">{t.module}</span>{pct > 0 && <span className="rounded-full bg-white/25 px-2 py-0.5 text-[9.5px] font-bold backdrop-blur">בתהליך</span>}</span>
                <span className="text-[15px] font-extrabold leading-tight">{t.titleHe}</span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="flex flex-wrap gap-1.5"><span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[10px] font-bold text-ink-2">{st.chapters} פרקים</span><span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[10px] font-bold text-ink-2">{st.nodes} יחידות</span><span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[10px] font-bold text-ink-2">~{Math.round(st.readMin / 60)} ש׳</span></div>
                <div className="mt-auto flex items-center gap-3 pt-3.5"><Ring pct={pct} size={38} stroke={4} color={t.id === "pm" ? "#f97316" : "#94a3b8"} /><span className="flex-1 rounded-xl bg-surface-2 py-2 text-center text-[12.5px] font-extrabold text-ink-1 transition group-hover:bg-ink-1 group-hover:text-white">{pct > 0 ? "המשך" : "התחל"}</span></div>
              </div>
            </Link>
          ); })}
        </div>
      </motion.div>

      {/* ACHIEVEMENTS */}
      <motion.div {...rise} className="mt-8">
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
      </motion.div>

      {/* RECENTLY VIEWED (§4) — real history */}
      {recent.length > 0 && (
        <motion.div {...rise} className="mt-8">
          <div className="mb-3.5 flex items-baseline gap-2"><h2 className="flex items-center gap-2 text-[19px] font-extrabold tracking-[-0.01em]"><History className="size-5 text-ink-3" />נצפו לאחרונה</h2></div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {recent.map((r) => (
              <Link key={r.id} href={r.href} className="flex w-[220px] shrink-0 items-center gap-3 rounded-2xl border border-hairline bg-surface p-3 transition hover:border-brand/30 hover:shadow-sm">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-surface-2 text-ink-3">{r.kind === "lesson" ? <Play className="size-4" /> : <GraduationCap className="size-4" />}</span>
                <span className="min-w-0 flex-1"><span className="block truncate text-[12.5px] font-extrabold text-ink-1">{r.title}</span><span className="text-[10.5px] text-ink-3">{r.module} · {r.kind === "lesson" ? "שיעור" : "מסלול"}</span></span>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* RECENTLY UPDATED + POPULAR (§4) — real academy-index data */}
      <motion.div {...rise} className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <div className="mb-3 flex items-baseline gap-2"><h2 className="flex items-center gap-2 text-[16px] font-extrabold"><Clock className="size-4 text-ink-3" />עודכן לאחרונה</h2></div>
          <div className="flex flex-col gap-2">{updated.map((t) => <MiniTrack key={t.id} t={t} meta={`עודכן ${t.lastUpdated}`} />)}</div>
        </div>
        <div>
          <div className="mb-3 flex items-baseline gap-2"><h2 className="flex items-center gap-2 text-[16px] font-extrabold"><TrendingUp className="size-4 text-[#0f766e]" />פופולרי באקדמיה</h2></div>
          <div className="flex flex-col gap-2">{popular.map((t) => <MiniTrack key={t.id} t={t} meta={`ציון איכות ${t.score}`} />)}</div>
        </div>
      </motion.div>

      {/* AI assistant (design affordance) */}
      <Link href="/chat/" className="fixed bottom-6 start-6 z-30 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-[13.5px] font-extrabold text-white shadow-[0_14px_34px_-12px_rgba(214,32,39,.6)] transition hover:bg-brand-dark"><Sparkles className="size-4" /> עוזר הלמידה</Link>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-5">
        <Link href="/academy/dashboard/" className="inline-flex items-center gap-1.5 text-[12px] font-bold text-ink-3 hover:text-brand"><LayoutDashboard className="size-3.5" /> לוח בקרה מלא · דוחות איכות</Link>
        <ResetButton danger label="אפס את כל SAP Academy" title="איפוס כל התקדמות ה-Academy" scopeText="כל המסלולים והשיעורים (PM · PP-PI · QM)" count={allLessons().length} onConfirm={resetAll} />
      </div>
    </div>
  );
}
