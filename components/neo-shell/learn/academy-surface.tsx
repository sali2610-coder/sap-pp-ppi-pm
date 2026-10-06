"use client";

/* ============================================================================
   PROJECT NEO · /neo/academy — the academy, one tab (2026-10).
   ----------------------------------------------------------------------------
   The rail used to carry two academy tabs, the course directory and the source
   folder. They are one tab now, read as one walk: a PATH is a course, a STAGE
   is a chapter, a STEP is a lesson (./journey-state.ts), and the source folder
   is the second view of the same tab (./journey.AcademySwitch), one link away
   from every path. Nothing was removed: every path, count, filter, the lesson
   search and both notes are still here; /neo/academy/materials/ still lists
   every source chapter and topic.

   PROGRESS IS THE READER'S, NOT THE BUILD'S
     Drawn from `neo:academy:v2`, the SAME store the lesson reader writes, read
     through the same hooks. A path the reader has never opened draws NO meter:
     an empty track is a claim ("you are 0% through this") the product has no
     reason to make on a first visit. The journey plate says "עוד לא התחלת"
     until the store holds a session, and the server renders that state.

   COMPOSITION (the catalogs' kit, app/neo/data.css, plus academy-experience.css)
     hero + ledger · the view switch · how the walk works · the journey plate
     (the page's one red action) · the paths · the source folder · the foot.
   ========================================================================== */

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft, BookOpenCheck, CircleCheck, CircleDashed, FolderOpen, GraduationCap, ListChecks,
  Play, Route, Search, Signpost, X,
} from "lucide-react";
import { OriginLink, SmartReturn, rememberOrigin } from "@/components/neo-shell/nav-context";
import { useActiveCourses, useContinueCourse, useIsDone } from "@/lib/academy/store";
import { CatalogFoot, CatalogHero, Ledger, Sig, fmt } from "../data/catalog-kit";
import { neoLessonHref } from "./lesson-links";
import { learnModVar } from "./mod";
import type { AcademyCourseRow, AcademyData } from "./academy-data";
import { LessonResults } from "./lesson-finder";
import { journeyOf } from "./journey-state";
import { AcademySwitch, StageMeter, hoursHe, journeyLine } from "./journey";

export interface MaterialCount { id: string; title: string; module: string; chapters: number; topics: number }

const RED = { "--m": "var(--brand)" } as React.CSSProperties;

/** A path's standing, from the store: finished, on its way (with its meter), or
 *  not started, in words. */
function PathStatus({ c, started, isDone }: { c: AcademyCourseRow; started: boolean; isDone: (s: string) => boolean }) {
  const j = journeyOf(c.chapters, isDone);
  if (j.complete) {
    return <span className="nxa-st" data-state="done"><CircleCheck size={14} strokeWidth={2} aria-hidden="true" />המסלול הושלם</span>;
  }
  if (!started) {
    return <span className="nxa-st" data-state="todo"><CircleDashed size={14} strokeWidth={2} aria-hidden="true" />טרם התחלת</span>;
  }
  return (
    <span className="nxa-path-meter">
      <StageMeter j={j} label={`ההתקדמות במסלול ${c.title}`} compact />
      <span className="nxa-path-line">{journeyLine(j)}</span>
    </span>
  );
}

export function AcademySurface({ data, materials }: { data: AcademyData; materials: MaterialCount[] }) {
  const { courses, levels, totals } = data;
  const cont = useContinueCourse();
  const active = useActiveCourses();
  const isDone = useIsDone();

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

  // Every path records where it is leaving from, so the course screen's return
  // control says "SAP Academy · <the filter you had on>".
  const onOpen = (id: string) => {
    const parts = [level, q.trim() ? `חיפוש «${q.trim()}»` : ""].filter(Boolean);
    rememberOrigin({ to: `/neo/academy/${id}/`, href: "/neo/academy/", label: "SAP Academy", detail: parts.join(" · ") });
  };

  const byId = useMemo(() => new Map(courses.map((c) => [c.id, c])), [courses]);
  const started = new Set(active.map((a) => a.moduleId));
  const contCourse = cont ? byId.get(cont.moduleId) ?? null : null;
  const contJourney = contCourse ? journeyOf(contCourse.chapters, isDone) : null;
  const others = active.filter((a) => a.moduleId !== cont?.moduleId && byId.has(a.moduleId));
  const mat = materials.reduce((a, m) => ({ chapters: a.chapters + m.chapters, topics: a.topics + m.topics }), { chapters: 0, topics: 0 });
  // Paths finished on this device. With no path in progress the plate says
  // that, not "not started", and offers the first path that is not done.
  const done = courses.filter((c) => journeyOf(c.chapters, isDone).complete);
  const doneIds = new Set(done.map((c) => c.id));
  const first = courses.find((c) => !doneIds.has(c.id)) ?? courses[0];
  const doneList = done.filter((c) => c.id !== cont?.moduleId);

  return (
    <div className="nxd nxa nm-scene" data-scene="cream" data-surface="academy">
      <SmartReturn fallback={{ href: "/neo/", label: "מסך הבית" }} />

      <CatalogHero
        icon={<GraduationCap size={14} strokeWidth={1.75} aria-hidden="true" />}
        eyebrow="SAP Academy · מסלולי למידה וחומרים"
        title="מסלול הלמידה שלך"
        lede={
          <>
            {fmt(totals.courses)} מסלולי לימוד, כל אחד שלב אחר שלב, וחומר המקור המלא של כל מסלול פתוח לצידו.
            {" "}אורך מוצהר כולל: {hoursHe(totals.minutes)}. ההתקדמות המוצגת היא זו שנרשמה במכשיר הזה.
          </>
        }
      >
        <Ledger
          label="האקדמיה במספרים. כל מספר מוביל לחלק שלו"
          items={[
            { v: totals.courses, l: "מסלולים", href: "#paths" },
            { v: totals.chapters, l: "שלבים", href: "#paths" },
            { v: totals.lessons, l: "שיעורים", href: "#paths" },
            { v: totals.blocks, l: "יחידות תוכן", href: "#paths" },
            { v: totals.levels, l: "רמות", href: "#paths" },
            { v: mat.chapters, l: "פרקי מקור", href: "#materials" },
            { v: mat.topics, l: "נושאים בחומר המקור", href: "#materials" },
          ]}
        />
      </CatalogHero>

      <AcademySwitch at="paths" />

      {/* ------------------------------------------------------- THE WALK */}
      <Sig
        id="how"
        icon={<Signpost size={15} strokeWidth={1.75} />}
        title="איך עוברים מסלול"
        lede={
          <>
            מה תלמד: מודלי הנתונים של PM ו-PP-PI, הטרנזקציות והתהליכים העסקיים, והמעבר מ-ECC ל-S/4HANA, מסלול אחר מסלול ושיעור אחר שיעור.
          </>
        }
      >
        <ol className="nxa-how">
          <li>
            <span className="nxa-how-i" aria-hidden="true"><Route size={17} strokeWidth={1.75} /></span>
            <b>בוחרים מסלול</b>
            <span>{fmt(totals.courses)} מסלולים, אחד לכל תחום. כל מסלול בנוי משלבים, וכל שלב משיעורים.</span>
          </li>
          <li>
            <span className="nxa-how-i" aria-hidden="true"><ListChecks size={17} strokeWidth={1.75} /></span>
            <b>עוברים שלב אחר שלב</b>
            <span>שיעור מושלם כשכל יחידות התוכן שהוא דורש נקראו. שלב מושלם כשכל שיעוריו הושלמו, והמד מראה באיזה שלב אתה.</span>
          </li>
          <li>
            <span className="nxa-how-i" aria-hidden="true"><FolderOpen size={17} strokeWidth={1.75} /></span>
            <b>מעמיקים בחומר המקור</b>
            <span>לכל מסלול תיקייה מלאה: פרקי המקור, התהליכים והקודים. קריאה בה אינה משנה את ההתקדמות במסלול.</span>
          </li>
          <li>
            <span className="nxa-how-i" aria-hidden="true"><BookOpenCheck size={17} strokeWidth={1.75} /></span>
            <b>בודקים את עצמך</b>
            <span>צפייה בשיעור נרשמת כחשיפה; הבנה נבדקת ב<Link href="/neo/certification/" prefetch={false}>תרגול ובדיקת ידע</Link>.</span>
          </li>
        </ol>
      </Sig>

      {/* ------------------------------------------------ THE JOURNEY PLATE
          The page's one red action. On a first visit (and in the server
          render) it says so and offers the first path; with a session it is
          the path in progress, its meter and the lesson to resume. */}
      <section
        className="nxa-plate nm-rise nm-once"
        aria-labelledby="ac-plate-h"
        style={{ "--m": learnModVar(contCourse?.module) } as React.CSSProperties}
      >
        {cont && contCourse && contJourney ? (
          <>
            <div className="nxa-plate-id">
              <p className="nxa-plate-k">המסלול שלך · <bdi dir="ltr">{contCourse.module}</bdi></p>
              <h2 className="nxa-plate-h" id="ac-plate-h">{contCourse.title}</h2>
              <p className="nxa-plate-at">
                השלב: {fmt(cont.chapterIndex)} · {cont.chapterTitle}
                {" "}· שיעור {fmt(cont.lessonNum)} מתוך {fmt(cont.chapterSize)} בשלב
              </p>
            </div>
            <StageMeter j={contJourney} label={`ההתקדמות במסלול ${contCourse.title}`} />
            <div className="nxa-plate-act">
              <OriginLink
                href={neoLessonHref(cont.moduleId, cont.resumeSlug)}
                className="nu-btn"
                style={RED}
                origin={() => ({ href: "/neo/academy/", label: "SAP Academy" })}
              >
                <Play size={14} strokeWidth={2} aria-hidden="true" />
                המשך: {cont.lessonTitle}
              </OriginLink>
              <Link href={`/neo/academy/${cont.moduleId}/`} className="nu-btn2" prefetch={false} onClick={() => onOpen(cont.moduleId)}>
                כל שלבי המסלול
                <ArrowLeft size={14} strokeWidth={2} className="nu-arw" aria-hidden="true" />
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="nxa-plate-id">
              <p className="nxa-plate-k">המסלול שלך</p>
              {done.length ? (
                <>
                  <h2 className="nxa-plate-h" id="ac-plate-h">
                    {done.length === 1 ? `סיימת את המסלול ${done[0].title}` : `סיימת ${fmt(done.length)} מסלולים`}
                  </h2>
                  <p className="nxa-plate-at">
                    כל השלבים {done.length === 1 ? "בו" : "בהם"} הושלמו במכשיר הזה. אפשר לחזור לכל שלב, או להתחיל מסלול נוסף.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="nxa-plate-h" id="ac-plate-h">עוד לא התחלת מסלול</h2>
                  <p className="nxa-plate-at">
                    בוחרים מסלול ומתחילים מהשלב הראשון. מאותו רגע המד כאן מראה באיזה שלב אתה, מה הושלם ומה הבא.
                  </p>
                </>
              )}
            </div>
            {first ? (
              <div className="nxa-plate-act">
                <Link className="nu-btn" style={RED} href={first.href} prefetch={false} onClick={() => onOpen(first.id)}>
                  <Play size={14} strokeWidth={2} aria-hidden="true" />
                  להתחיל: {first.title}
                </Link>
                <a className="nu-btn2" href="#paths">בחירת מסלול אחר</a>
              </div>
            ) : null}
          </>
        )}

        {doneList.length ? (
          <ul className="nxa-plate-others" aria-label="מסלולים שהושלמו">
            {doneList.map((c) => {
              const j = journeyOf(c.chapters, isDone);
              return (
                <li key={c.id} style={{ "--m": learnModVar(c.module) } as React.CSSProperties}>
                  <Link href={c.href} prefetch={false} className="nxa-other" onClick={() => onOpen(c.id)}>
                    <b>{c.title}</b>
                    <StageMeter j={j} label={`ההתקדמות במסלול ${c.title}`} compact />
                    <span>{journeyLine(j)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : null}

        {others.length ? (
          <ul className="nxa-plate-others" aria-label="מסלולים נוספים בתהליך">
            {others.map((a) => {
              const c = byId.get(a.moduleId)!;
              const j = journeyOf(c.chapters, isDone);
              return (
                <li key={a.moduleId} style={{ "--m": learnModVar(c.module) } as React.CSSProperties}>
                  <Link href={c.href} prefetch={false} className="nxa-other" onClick={() => onOpen(c.id)}>
                    <b>{c.title}</b>
                    <StageMeter j={j} label={`ההתקדמות במסלול ${c.title}`} compact />
                    <span>{journeyLine(j)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : null}
      </section>

      {/* -------------------------------------------------------- THE PATHS */}
      <Sig
        id="paths"
        icon={<Route size={15} strokeWidth={1.75} />}
        title="המסלולים"
        count={`${fmt(totals.courses)} מסלולים`}
        lede="כל מסלול נפתח למפת השלבים שלו: מה הושלם, איפה אתה ומה הבא."
      >
        <div className="nxd-tools">
          <div className="nxd-field">
            <Search size={15} strokeWidth={1.75} aria-hidden="true" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="שם קורס · שם שיעור · קוד SAP"
              aria-label="חיפוש בקורסים"
            />
            {q ? (
              <button type="button" className="nu-ghost nxd-clear" onClick={() => setQ("")} aria-label="ניקוי החיפוש">
                <X size={13} strokeWidth={2} />
              </button>
            ) : null}
          </div>
          <div className="nxd-facet" role="group" aria-label="סינון לפי רמה">
            <span className="nxd-facet-l">רמה</span>
            {levels.map((l) => (
              <button
                key={l.id}
                type="button"
                className="nu-filter"
                aria-pressed={level === l.id}
                onClick={() => setLevel(level === l.id ? "" : l.id)}
              >
                {l.he}<b>{fmt(l.n)}</b>
              </button>
            ))}
          </div>
        </div>

        <p className="nxa-count" aria-live="polite">
          <b>{fmt(list.length)}</b> קורסים
          {!dirty ? <> מתוך {fmt(totals.courses)}</> : null}
          {dirty ? <> · <button type="button" className="nu-ghost" onClick={reset}>ניקוי הסינון</button></> : null}
        </p>

        <LessonResults lessons={list.flatMap((c) => c.chapters.flatMap((ch) => ch.lessons)).filter((l) => !level || l.level === level)} query={q} />

        {list.length === 0 ? (
          <div className="nxa-none">
            <p><b>לא נמצאו תוצאות התואמות לסינון שנבחר</b></p>
            <p className="nx-muted">אפשר לחפש לפי שמות הקורסים, הפרקים והשיעורים או לפי הקודים המופיעים בהם.</p>
            <button type="button" className="nu-btn2" onClick={reset}>ניקוי הסינון</button>
          </div>
        ) : (
          <ul className="nxa-paths">
            {list.map((c) => (
              <li key={c.id} style={{ "--m": learnModVar(c.module) } as React.CSSProperties}>
                <Link href={c.href} className="nxa-path" prefetch={false} onClick={() => onOpen(c.id)}>
                  <span className="nxa-path-h">
                    <span className="nxa-mod"><bdi dir="ltr">{c.module}</bdi></span>
                    <b className="nxa-path-t">{c.title}</b>
                    {c.titleEn ? <bdi dir="ltr" className="nxa-path-en">{c.titleEn}</bdi> : null}
                  </span>
                  <span className="nxa-path-n">
                    {fmt(c.totals.chapters)} שלבים · {fmt(c.totals.lessons)} שיעורים · {fmt(c.totals.blocks)} יחידות תוכן · {hoursHe(c.totals.minutes)}
                  </span>
                  <span className="nxa-path-lv">
                    {c.levels.map((l) => <span key={l.he} className="nu-chip">{l.he} · {fmt(l.n)}</span>)}
                  </span>
                  <PathStatus c={c} started={started.has(c.id)} isDone={isDone} />
                  <span className="nxa-path-go">
                    פתיחת המסלול
                    <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Sig>

      {/* ------------------------------------------------- THE SOURCE FOLDER */}
      <Sig
        id="materials"
        icon={<FolderOpen size={15} strokeWidth={1.75} />}
        title="חומר המקור · תיקיית האקדמיה"
        count={`${fmt(mat.chapters)} פרקים · ${fmt(mat.topics)} נושאים`}
        lede="לכל מסלול תיקיית חומר מלאה. התיקייה נפתחת בתוך המסלול, לצד השלבים."
      >
        <ul className="nxa-mats">
          {materials.map((m) => (
            <li key={m.id} style={{ "--m": learnModVar(m.module) } as React.CSSProperties}>
              <Link href={`/neo/academy/${m.id}/#co-materials`} prefetch={false} className="nxa-mat">
                <FolderOpen size={18} strokeWidth={1.75} aria-hidden="true" />
                <span>
                  <b>{m.title}</b>
                  <small>{fmt(m.chapters)} פרקי מקור · {fmt(m.topics)} נושאים</small>
                </span>
                <span className="nxa-mod"><bdi dir="ltr">{m.module}</bdi></span>
              </Link>
            </li>
          ))}
        </ul>
        <Link className="nu-link nxa-mats-all" href="/neo/academy/materials/" prefetch={false}>
          לכל התיקיות ולחיפוש בכל החומר
          <ArrowLeft size={14} strokeWidth={2} className="nu-arw" aria-hidden="true" />
        </Link>
      </Sig>

      <CatalogFoot
        notes={[
          <>«אורך מוצהר» ו«רמה» הם השדות שהקורס מגדיר לכל שיעור. «יחידות תוכן» הוא מספר יחידות התוכן שהשיעור דורש להשלמה.</>,
        ]}
      >
        ההתקדמות נשמרת במכשיר בלבד (<span className="nx-sap">neo:academy:v2</span>) ואינה מסונכרנת.
      </CatalogFoot>
    </div>
  );
}
