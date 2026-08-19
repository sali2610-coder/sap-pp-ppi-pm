"use client";

/* ============================================================================
   PROJECT NEO · /neo/academy — the course directory.
   ----------------------------------------------------------------------------
   Eight authored learning courses, organised around what they actually contain:
   chapters, lessons, declared level and declared length. Everything on this
   screen is either a build-time count of real content or a reading of the
   product's own progress store — nothing between the two.

   PROGRESS IS THE READER'S, NOT THE BUILD'S
     The bar under a course is drawn from `neo:academy:v2` — the SAME store the
     live academy reader writes to, read here through the same hooks. A course
     the reader has never opened draws NO bar: an empty progress track is a
     claim ("you are 0% through this") that the product has no reason to make on
     a first visit, and this surface refuses to make it. The "continue" card at
     the top appears only when the store actually holds a session.

   CONTROL LANGUAGE (app/neo/ui.css)
     .nu-filter  narrows the list. Counts are real counts.
     .nu-chip    a value — the module, a level, a measured total. Not clickable.
     .nu-status  dot + word. One use only: whether the reader has finished a
                 course, which is a real state.
     .nu-card    the course, which opens /neo/academy/<id>/.
     .nu-btn     the one action that matters — resume where you stopped.
     .nu-link    the contextual return at the top of the surface.
   ========================================================================== */

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, BookOpen, Blocks, Clock, GraduationCap, Layers, Play, Search, X } from "lucide-react";
import { OriginLink, SmartReturn, rememberOrigin } from "@/components/neo-shell/nav-context";
import { useContinueCourse, useModuleProgress } from "@/lib/academy/store";
import { neoLessonHref } from "./lesson-links";
import { learnModVar } from "./mod";
import type { AcademyCourseRow, AcademyData } from "./academy-data";

const nf = new Intl.NumberFormat("he-IL");

/** Minutes as the courses themselves declare them. Never rounded up into a
 *  bigger, nicer number. */
function hoursHe(min: number): string {
  if (min < 60) return `${nf.format(min)} דק׳`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${nf.format(h)} שע׳ ${nf.format(m)} דק׳` : `${nf.format(h)} שע׳`;
}

function CourseCard({ c, onOpen }: { c: AcademyCourseRow; onOpen: (id: string) => void }) {
  // Read per course, inside its own component: a hook cannot live in a loop.
  const p = useModuleProgress(c.id);
  const started = p.completedLessons > 0 || p.blocksDone > 0;
  const done = p.totalLessons > 0 && p.completedLessons >= p.totalLessons;

  return (
    <li style={{ "--m": learnModVar(c.module), display: "grid" } as React.CSSProperties}>
      <Link href={c.href} className="nu-card nxl-course" prefetch={false} onClick={() => onOpen(c.id)}>
        <span className="nxl-course-h">
          <span className="nxl-course-k">
            <span className="nu-chip nxl-mod">
              <i aria-hidden="true" />
              {c.module}
            </span>
            {done ? (
              <span className="nu-status" style={{ "--s": "var(--status-done)" } as React.CSSProperties}>
                הושלם
              </span>
            ) : null}
          </span>
          <h2 className="nxl-course-t">{c.title}</h2>
          {c.titleEn ? <span className="nxl-course-en">{c.titleEn}</span> : null}
        </span>

        <span className="nxl-course-n">
          <span className="nxl-num"><b>{nf.format(c.totals.chapters)}</b><span>פרקים</span></span>
          <span className="nxl-num"><b>{nf.format(c.totals.lessons)}</b><span>שיעורים</span></span>
          <span className="nxl-num"><b>{nf.format(c.totals.blocks)}</b><span>יחידות תוכן</span></span>
          <span className="nxl-num"><b data-text="1">{hoursHe(c.totals.minutes)}</b><span>אורך מוצהר</span></span>
        </span>

        <span className="nxl-meta">
          {c.levels.map((l) => (
            <span key={l.he} className="nu-chip">{l.he} · {nf.format(l.n)}</span>
          ))}
        </span>

        {started ? (
          <span className="nxl-bar">
            <span className="nxl-bar-h">
              <span>התקדמות שלך</span>
              <b>{nf.format(p.completedLessons)} / {nf.format(p.totalLessons)} · {p.pct}%</b>
            </span>
            <span className="nxl-bar-t">
              <span className="nxl-bar-f" style={{ "--p": p.pct / 100 } as React.CSSProperties} />
            </span>
          </span>
        ) : (
          <span className="nxl-course-idle">
            עדיין לא נפתח במכשיר הזה: אין התקדמות להציג, ולא מוצג סרגל ריק במקומה.
          </span>
        )}

        {/* The whole card is the link, so this is a signpost and not a second
            control: no button chrome, no nested interactive element. */}
        <span className="nxl-course-a nxl-course-go">
          פתח את הקורס
          <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
        </span>
      </Link>
    </li>
  );
}

export function AcademySurface({ data }: { data: AcademyData }) {
  const { courses, levels, totals } = data;
  const cont = useContinueCourse();

  const [q, setQ] = useState("");
  const [level, setLevel] = useState("");

  const list = useMemo(() => {
    let out = courses;
    if (level) out = out.filter((c) => c.levels.some((l) => l.he === level));
    const s = q.trim().toLowerCase();
    if (s) {
      const tokens = s.split(/\s+/).filter(Boolean);
      out = out.filter((c) => tokens.every((t) => c.hay.includes(t)));
    }
    return out;
  }, [courses, level, q]);

  const dirty = !!q || !!level;
  const reset = () => { setQ(""); setLevel(""); };

  // Every course card records where it is leaving from, so the course screen's
  // return control says "האקדמיה · <the filter you had on>" rather than just
  // pointing at the namespace root.
  const onOpen = (id: string) => {
    const parts = [level, q.trim() ? `חיפוש «${q.trim()}»` : ""].filter(Boolean);
    rememberOrigin({
      to: `/neo/academy/${id}/`,
      href: "/neo/academy/",
      label: "האקדמיה",
      detail: parts.join(" · "),
    });
  };

  return (
    <div className="nxl" data-surface="academy">
      <SmartReturn fallback={{ href: "/neo/", label: "מסך הבית" }} />

      <header className="nxl-head">
        <span className="nx-eyebrow">ידע ולמידה</span>
        <h1 className="nx-h1">האקדמיה</h1>
        <p className="nx-lede">
          {nf.format(totals.courses)} קורסים כתובים, {nf.format(totals.chapters)} פרקים ו-{nf.format(totals.lessons)} שיעורים.
          {" "}כל מספר כאן נספר מתוך התוכן עצמו; ההתקדמות שמוצגת היא ההתקדמות שנרשמה במכשיר הזה בלבד.
        </p>
      </header>

      {/* Appears only when the store actually holds a session. No session, no
          card — and no invented "welcome back". */}
      {cont ? (
        <section
          className="nx-card nxl-course"
          aria-label="המשך מהמקום שעצרת"
          style={{ "--m": learnModVar(cont.module) } as React.CSSProperties}
        >
          <div className="nxl-course-h">
            <span className="nx-eyebrow">המשך מהמקום שעצרת</span>
            <h2 className="nxl-course-t">{cont.lessonTitle}</h2>
            <span className="nxl-course-en">
              {cont.chapterTitle} · שיעור {nf.format(cont.lessonNum)} מתוך {nf.format(cont.chapterSize)} בפרק
            </span>
          </div>
          <div className="nxl-bar">
            <div className="nxl-bar-h">
              <span>{cont.module}</span>
              <b>{nf.format(cont.completedLessons)} / {nf.format(cont.totalLessons)} · {cont.pct}%</b>
            </div>
            <div className="nxl-bar-t">
              <span className="nxl-bar-f" style={{ "--p": cont.pct / 100 } as React.CSSProperties} />
            </div>
          </div>
          <div className="nxl-course-a">
            {/* The resume opens the lesson INSIDE NEO. Its return control has to
                say something true even though the reader never passed through
                the course screen, so the origin names the academy itself. */}
            <OriginLink
              href={neoLessonHref(cont.moduleId, cont.resumeSlug)}
              className="nu-btn"
              origin={() => ({ href: "/neo/academy/", label: "האקדמיה" })}
            >
              <Play size={14} strokeWidth={2} aria-hidden="true" />
              המשך את השיעור
            </OriginLink>
            <Link href={`/neo/academy/${cont.moduleId}/`} className="nu-btn2" prefetch={false}>
              כל הקורס
              <ArrowLeft size={14} strokeWidth={2} className="nu-arw" aria-hidden="true" />
            </Link>
          </div>
        </section>
      ) : null}

      <section className="nx-card nxl-stats" aria-label="מספרי האקדמיה">
        {[
          { v: nf.format(totals.courses), l: "קורסים", t: false, i: <GraduationCap size={14} strokeWidth={1.75} /> },
          { v: nf.format(totals.chapters), l: "פרקים", t: false, i: <Layers size={14} strokeWidth={1.75} /> },
          { v: nf.format(totals.lessons), l: "שיעורים כתובים", t: false, i: <BookOpen size={14} strokeWidth={1.75} /> },
          { v: nf.format(totals.blocks), l: "יחידות תוכן", t: false, i: <Blocks size={14} strokeWidth={1.75} /> },
          { v: hoursHe(totals.minutes), l: "אורך מוצהר", t: true, i: <Clock size={14} strokeWidth={1.75} /> },
          { v: nf.format(totals.levels), l: "רמות", t: false, i: <Layers size={14} strokeWidth={1.75} /> },
        ].map((s) => (
          <div key={s.l} className="nxl-stat">
            <span className="nxl-stat-i" aria-hidden="true">{s.i}</span>
            {/* A value with Hebrew words in it opts out of the numeric face,
                which is LTR and would print the units in reverse. */}
            <b data-text={s.t ? "1" : undefined}>{s.v}</b>
            <span>{s.l}</span>
          </div>
        ))}
      </section>

      <div className="nxl-tools">
        <div className="nxl-field">
          <Search size={15} strokeWidth={1.75} aria-hidden="true" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="שם קורס · שם פרק · שם שיעור"
            aria-label="חיפוש בקורסים"
          />
          {q ? (
            <button type="button" className="nu-ghost nxl-clear" onClick={() => setQ("")} aria-label="נקה חיפוש">
              <X size={13} strokeWidth={2} />
            </button>
          ) : null}
        </div>
      </div>

      <div className="nxl-facets">
        <div className="nxl-facet" role="group" aria-label="סינון לפי רמה">
          <span className="nxl-facet-l">רמה</span>
          {levels.map((l) => (
            <button
              key={l.id}
              type="button"
              className="nu-filter"
              aria-pressed={level === l.id}
              onClick={() => setLevel(level === l.id ? "" : l.id)}
            >
              {l.he}<b>{nf.format(l.n)}</b>
            </button>
          ))}
        </div>
      </div>

      <p className="nxl-count" aria-live="polite">
        <b>{nf.format(list.length)}</b> קורסים
        {!dirty ? <> מתוך {nf.format(totals.courses)}</> : null}
        {dirty ? <> · <button type="button" className="nu-ghost" onClick={reset}>נקה סינון</button></> : null}
      </p>

      {list.length === 0 ? (
        <div className="nx-card nxl-none">
          <p><b>אין קורס שעונה על הסינון</b></p>
          <p className="nx-muted">
            החיפוש עובר על שמות הקורסים, הפרקים והשיעורים בלבד: הוא אינו מחפש בתוך גוף השיעור.
          </p>
          <div className="nxl-none-a">
            <button type="button" className="nu-btn" onClick={reset}>נקה את הסינון</button>
          </div>
        </div>
      ) : (
        <ul className="nxl-courses">
          {list.map((c) => <CourseCard key={c.id} c={c} onOpen={onOpen} />)}
        </ul>
      )}

      <div className="nxl-foot">
        <p>
          «אורך מוצהר» ו«רמה» הם השדות שהקורס עצמו כותב לכל שיעור, לא הערכה שנעשתה כאן.
          {" "}«יחידות תוכן» היא ספירת הבלוקים שהשיעור דורש להשלמה: אותה ספירה שלפיה נקבע ששיעור הושלם.
        </p>
        <p>
          התקדמות נשמרת מקומית במכשיר (<span className="nx-sap">neo:academy:v2</span>) ואינה מסונכרנת לשום שרת.
        </p>
      </div>
    </div>
  );
}
