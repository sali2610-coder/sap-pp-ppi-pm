"use client";

/* ============================================================================
   PROJECT NEO · /neo/onboarding/ — the per-reader state of the journey.
   ----------------------------------------------------------------------------
   The steps' text is server-rendered by onboarding-view.tsx; these leaves add
   only what belongs to one reader: which steps are done (lib/onboard-store,
   localStorage "neo:onboard:journey", the same key the pre-NEO journey wrote,
   so progress carries over), the lock order, the exam step completing itself
   once a certification exam was sat (lib/cert/store), and the achievements.
   The server render is the empty journey: step 1 current, the rest locked.
   ========================================================================== */

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { Check, Lock, RotateCcw } from "lucide-react";
import { markStage, resetJourney, useJourney } from "@/lib/onboard-store";
import { masteryPct, useCertState } from "@/lib/cert/store";
import { getRecentObjects } from "@/lib/prefs";

export interface JStage { id: string; n: number; title: string; action: string; href?: string; mins: number; final?: boolean }

const noop = () => () => {};
const recentCount = () => getRecentObjects().length;
const mentorAsked = () => {
  try { const r = JSON.parse(localStorage.getItem("neo:mentor:recent") || "[]"); return Array.isArray(r) && r.length > 0; } catch { return false; }
};

function useModel(stages: JStage[]) {
  const done = useJourney();
  const cert = useCertState();
  const recent = useSyncExternalStore(noop, recentCount, () => 0);
  const asked = useSyncExternalStore(noop, mentorAsked, () => false);
  const doneSet = new Set(done);
  const total = stages.length;
  const doneCount = stages.filter((s) => doneSet.has(s.id)).length;
  const firstOpen = stages.findIndex((s) => !doneSet.has(s.id));
  const complete = doneCount === total;
  const mods = Object.values(cert.mods);
  const certAttempts = mods.some((m) => m.attempts > 0);
  const certPassed = mods.some((m) => m.passed);
  const ach: Record<string, boolean> = {
    login: true,
    model: doneSet.has("model") || recent > 0,
    process: doneSet.has("process"),
    mentor: doneSet.has("mentor") || asked,
    quiz: doneSet.has("exam") || certAttempts,
    cert: complete || certPassed,
  };
  return {
    done, doneSet, total, doneCount, complete, certAttempts, ach,
    pct: Math.round((doneCount / total) * 100),
    current: firstOpen === -1 ? total - 1 : firstOpen,
    unlocked: (i: number) => i === 0 || stages.slice(0, i).every((s) => doneSet.has(s.id)),
    remainMins: stages.filter((s) => !doneSet.has(s.id)).reduce((n, s) => n + s.mins, 0),
    score: Math.max(0, ...mods.map((m) => m.best), ...mods.map((m) => masteryPct(m))),
    earned: Object.values(ach).filter(Boolean).length,
  };
}

/** The hero line: tier, step, share, time left, counters, reset. */
export function JourneySummary({ stages, achN }: { stages: JStage[]; achN: number }) {
  const m = useModel(stages);
  const examDone = m.doneSet.has("exam");
  // The exam step completes itself once the reader actually sat an exam.
  useEffect(() => {
    if (m.certAttempts && !examDone) markStage("exam");
  }, [m.certAttempts, examDone]);
  const tier = m.complete ? "יועץ SAP מוסמך" : m.pct >= 60 ? "יועץ בהכשרה" : "יועץ זוטר · בתחילת הדרך";
  const hours = Math.round((m.remainMins / 60) * 10) / 10 || 0;
  return (
    <div className="ntl-journey" aria-live="polite">
      <p className="ntl-prog">
        <span className="ntl-state" data-st={m.complete ? "ok" : "mid"}>{tier}</span>
        <span className="ntl-prog-t">שלב <b>{Math.min(m.current + 1, m.total)}</b> מתוך <b>{m.total}</b> · <b>{m.pct}%</b></span>
        <span className="ntl-prog-t">~{hours} שעות נותרו</span>
      </p>
      <span className="ntl-meter" aria-hidden="true"><span style={{ "--w": `${m.pct}%` } as React.CSSProperties} /></span>
      <dl className="ntl-stats ntl-stats--sm" aria-label="התקדמות במסע">
        <div className="ntl-stat"><dt>שלבים</dt><dd><b dir="ltr">{m.doneCount}/{m.total}</b></dd></div>
        <div className="ntl-stat"><dt>הישגים</dt><dd><b dir="ltr">{m.earned}/{achN}</b></dd></div>
        <div className="ntl-stat"><dt>ציון</dt><dd><b>{m.score || "—"}</b></dd></div>
      </dl>
      {m.complete ? (
        <section className="nct-sec ntl-cert" aria-labelledby="ntl-cert-h">
          <p className="ntl-note" dir="ltr" lang="en">NEO Certified</p>
          <h2 id="ntl-cert-h" className="nct-sec-h"><i aria-hidden="true" />תג יועץ SAP מוסמך</h2>
          <p className="nct-p">השלמת את מסע הקליטה · ציון הסמכה: <b>{m.score || "—"}</b> · {m.earned}/{achN} הישגים</p>
          <Link href="/neo/academy/tracks/pm-fundamentals/" prefetch={false} className="nu-link">המסלול המומלץ הבא</Link>
        </section>
      ) : null}
      {m.doneCount > 0 ? (
        <button type="button" className="nu-ghost" onClick={resetJourney}>
          <RotateCcw size={14} strokeWidth={2} aria-hidden="true" />אפס מסע
        </button>
      ) : null}
    </div>
  );
}

/** One step's state word and its action. */
export function StepControl({ stages, i }: { stages: JStage[]; i: number }) {
  const m = useModel(stages);
  const s = stages[i];
  const isDone = m.doneSet.has(s.id);
  const isCur = i === m.current && !m.complete;
  const lock = !m.unlocked(i) && !isDone;
  const word = isDone ? "הושלם" : isCur ? "השלב הנוכחי" : lock ? "נעול" : "זמין";
  return (
    <div className="ntl-step-ctl">
      <span className="ntl-state" data-st={isDone ? "ok" : isCur ? "mid" : "lo"}>
        {isDone ? <Check size={14} strokeWidth={2.25} aria-hidden="true" /> : lock ? <Lock size={13} strokeWidth={2} aria-hidden="true" /> : null}
        {word}
      </span>
      {lock ? (
        <span className="ntl-prog-t">השלם שלבים קודמים</span>
      ) : s.href ? (
        <Link href={s.href} prefetch={false} className="nu-btn2" onClick={() => markStage(s.id)}>{s.action}</Link>
      ) : (
        <button type="button" className="nu-btn2" onClick={() => markStage(s.id)} aria-pressed={isDone}>
          {isDone ? "סומן" : s.action}
        </button>
      )}
    </div>
  );
}

/** One achievement: earned, or locked until its condition is met. */
export function AchievementMark({ stages, id }: { stages: JStage[]; id: string }) {
  const m = useModel(stages);
  const on = !!m.ach[id];
  return <span className="ntl-state" data-st={on ? "ok" : "lo"}>{on ? "הושג" : "נעול"}</span>;
}
