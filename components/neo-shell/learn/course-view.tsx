"use client";

/* ============================================================================
   PROJECT NEO · /neo/academy/<courseId>/ — one course, chapter by chapter.
   ----------------------------------------------------------------------------
   The directory answers "which course". This answers "what is actually in it,
   and where am I in it".

   THE PROGRESS RULES, STATED
     lesson complete = its recorded block count reaches the block count the
                       lesson itself requires. That is the product's own rule
                       (lib/academy/store.ts); this screen does not invent a
                       second one.
     chapter complete = every lesson in it is complete.
     course progress  = completed lessons / authored lessons.
   A reader with no recorded progress sees the structure and an explicit "no
   progress recorded" line — never a 0% bar, never a fabricated streak.

   THE STORE IS READ ONCE. `useIsDone()` returns a predicate from a single
   subscription, so a 121-lesson course does not open 121 subscriptions to
   answer the same question 121 times.

   LESSONS OPEN THE PAGE THAT ALREADY RENDERS THEM — /academy/lesson/<slug>/,
   generated from the same authored lesson set this model resolves against. A
   lesson with no authored body is drawn as an inert value, and its form says
   so: no pointer, no hover lift, no focus ring.
   ========================================================================== */

import Link from "next/link";
import { ArrowLeft, BookOpen, Blocks, Clock, Info, Layers, Play } from "lucide-react";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { firstIncomplete } from "@/lib/academy/model";
import { useIsDone, useModuleProgress } from "@/lib/academy/store";
import { learnModVar, LEARN_MOD_HE } from "./mod";
import type { AcademyCourseRow } from "./academy-data";

const nf = new Intl.NumberFormat("he-IL");

function hoursHe(min: number): string {
  if (min < 60) return `${nf.format(min)} דק׳`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${nf.format(h)} שע׳ ${nf.format(m)} דק׳` : `${nf.format(h)} שע׳`;
}

export function CourseView({ c }: { c: AcademyCourseRow }) {
  const isDone = useIsDone();
  const p = useModuleProgress(c.id);
  const started = p.completedLessons > 0 || p.blocksDone > 0;
  const finished = p.totalLessons > 0 && p.completedLessons >= p.totalLessons;
  const next = firstIncomplete(c.id, isDone);

  return (
    <div
      className="nxv"
      data-surface="course"
      style={{ "--m": learnModVar(c.module) } as React.CSSProperties}
    >
      <SmartReturn fallback={{ href: "/neo/academy/", label: "האקדמיה" }} />

      <header className="nxv-head">
        <span className="nx-modbar" aria-hidden="true" />
        <span className="nx-eyebrow">האקדמיה · {LEARN_MOD_HE[c.module] || c.module}</span>
        <div className="nxv-title">
          <h1 className="nxv-h1">{c.title}</h1>
          {c.titleEn ? <p className="nxv-en">{c.titleEn}</p> : null}
        </div>
        <div className="nxv-meta">
          <span className="nu-chip nxv-mod">
            <i aria-hidden="true" />
            {c.module}
          </span>
          <span className="nu-chip"><Layers size={11} strokeWidth={1.75} />{nf.format(c.totals.chapters)} פרקים</span>
          <span className="nu-chip"><BookOpen size={11} strokeWidth={1.75} />{nf.format(c.totals.lessons)} שיעורים</span>
          <span className="nu-chip"><Blocks size={11} strokeWidth={1.75} />{nf.format(c.totals.blocks)} יחידות תוכן</span>
          <span className="nu-chip"><Clock size={11} strokeWidth={1.75} />{hoursHe(c.totals.minutes)}</span>
          {finished ? (
            <span className="nu-status" style={{ "--s": "var(--status-done)" } as React.CSSProperties}>הקורס הושלם</span>
          ) : null}
        </div>
      </header>

      {/* --------------------------------------------------- WHERE YOU ARE */}
      <section className="nxv-s4" aria-labelledby="co-p">
        <div className="nxv-s4-top">
          <span className="nx-eyebrow">ההתקדמות שלך</span>
          <h2 className="nxv-s4-h" id="co-p">
            {finished
              ? "סיימת את כל השיעורים הכתובים בקורס"
              : started
                ? `${nf.format(p.completedLessons)} מתוך ${nf.format(p.totalLessons)} שיעורים הושלמו`
                : "עוד לא נרשמה התקדמות בקורס הזה במכשיר הזה"}
          </h2>
        </div>

        {started ? (
          <div className="nxl-bar">
            <div className="nxl-bar-h">
              <span>{nf.format(p.blocksDone)} יחידות תוכן נצפו</span>
              <b>{p.pct}%</b>
            </div>
            <div className="nxl-bar-t">
              <span className="nxl-bar-f" style={{ "--p": p.pct / 100 } as React.CSSProperties} />
            </div>
          </div>
        ) : (
          <p className="nx-muted">
            התקדמות נרשמת רק כשקוראים שיעור בפועל, ונשמרת מקומית במכשיר. עד אז אין מה להציג —
            {" "}ולכן לא מוצג סרגל ריק שמתחזה למדידה.
          </p>
        )}

        {next ? (
          <div className="nxl-course-a">
            <Link href={`/academy/lesson/${next.slug}/`} className="nu-btn" prefetch={false}>
              <Play size={14} strokeWidth={2} aria-hidden="true" />
              {started ? "המשך מהשיעור הבא" : "התחל מהשיעור הראשון"} · {next.title}
            </Link>
          </div>
        ) : null}
      </section>

      {/* ------------------------------------------------------- CHAPTERS */}
      <section className="nxv-sec" aria-labelledby="co-ch">
        <div className="nxv-sec-h">
          <span className="nxv-sec-i" aria-hidden="true"><Layers size={16} strokeWidth={1.75} /></span>
          <h2 className="nx-h2" id="co-ch">מבנה הקורס</h2>
          <em className="nxv-sec-n">{nf.format(c.totals.chapters)} פרקים</em>
        </div>

        <div className="nxc-chapters">
          {c.chapters.map((ch) => {
            const authored = ch.lessons.filter((l) => l.hasLesson);
            const doneN = authored.filter((l) => isDone(l.slug)).length;
            const chDone = authored.length > 0 && doneN === authored.length;
            return (
              <div className="nxc-ch" key={ch.index}>
                <div className="nxc-ch-h">
                  <i aria-hidden="true" />
                  <span className="nxc-ch-n">{String(ch.index).padStart(2, "0")}</span>
                  <h3 className="nxc-ch-t">{ch.title}</h3>
                  <div className="nxc-ch-m">
                    <span className="nu-chip">{nf.format(ch.lessons.length)} שיעורים</span>
                    {ch.minutes ? <span className="nu-chip">{hoursHe(ch.minutes)}</span> : null}
                    {doneN > 0 ? (
                      <span
                        className="nu-status"
                        style={{ "--s": chDone ? "var(--status-done)" : "var(--status-in-conversion)" } as React.CSSProperties}
                      >
                        {chDone ? "הפרק הושלם" : `${nf.format(doneN)} / ${nf.format(authored.length)} הושלמו`}
                      </span>
                    ) : null}
                  </div>
                </div>

                <ul className="nxc-lessons">
                  {ch.lessons.map((l) => {
                    const done = l.hasLesson && isDone(l.slug);
                    const inner = (
                      <>
                        <span className="nxc-l-n">{String(l.pos).padStart(2, "0")}</span>
                        <span className="nxc-l-t">{l.title}</span>
                        <span className="nxc-l-s">
                          {l.level ? <span className="nu-chip">{l.level}</span> : null}
                          {l.minutes ? <span className="nu-chip">{nf.format(l.minutes)} דק׳</span> : null}
                          {/* An unauthored lesson says so where its status would be. */}
                          {!l.hasLesson ? <span className="nu-chip">אין מידע מאומת במאגר</span> : null}
                          {done ? (
                            <span className="nu-status" style={{ "--s": "var(--status-done)" } as React.CSSProperties}>
                              הושלם
                            </span>
                          ) : null}
                        </span>
                        {l.href ? (
                          <span className="nxc-l-go" aria-hidden="true"><ArrowLeft size={14} strokeWidth={2} /></span>
                        ) : null}
                      </>
                    );
                    return (
                      <li key={l.slug}>
                        {l.href ? (
                          <Link href={l.href} className="nu-card nxc-l" prefetch={false}>{inner}</Link>
                        ) : (
                          <div className="nu-card nxc-l is-flat">{inner}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <div className="nxv-foot">
        <p className="nxv-src">
          <Info size={13} strokeWidth={1.75} aria-hidden="true" />
          <span>
            מקור המבנה: מסלולי הלמידה הכתובים של האקדמיה (<span className="nx-sap">lib/academy/model.ts</span>).
            {" "}אורך ורמה הם שדות שהמסלול עצמו כותב לכל שיעור.
          </span>
        </p>
        <p>
          שיעור נחשב מושלם כשמספר יחידות התוכן שנצפו בו מגיע למספר שהשיעור דורש — אותה מדידה שהקורא רואה
          {" "}בתוך השיעור עצמו. ההתקדמות נשמרת ב-<span className="nx-sap">neo:academy:v2</span> על המכשיר, ואינה מסונכרנת.
        </p>
      </div>
    </div>
  );
}
