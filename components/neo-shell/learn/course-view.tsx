"use client";

/* ============================================================================
   PROJECT NEO · /neo/academy/<courseId>/ — one path, stage by stage.
   ----------------------------------------------------------------------------
   The academy reads as one walk (./journey-state.ts): this course is a PATH,
   its chapters are STAGES, its lessons are STEPS. The page says where the
   reader is, what is finished, and what comes next, and every stage ends with
   the way into the next one.

   THE PROGRESS RULES, STATED
     lesson complete = its recorded block count reaches the block count the
                       lesson itself requires (lib/academy/store.ts).
     stage complete  = every lesson in it is complete.
     course progress = completed lessons / authored lessons.
   A reader with no recorded progress sees the stages and an explicit "not yet
   started" line: never a 0% bar, never a fabricated streak.

   THE STORE IS READ ONCE. `useIsDone()` returns one predicate from a single
   subscription, so a 121-lesson course does not open 121 subscriptions.

   SOURCE MATERIAL IS PAIRED EXACTLY OR NOT AT ALL. A lesson links to its
   source topic only when source-data.lessonSource() names it (five of the
   eight paths); the other three point at the whole folder below, never at a
   guessed section.

   Every lesson row is an <OriginLink/>, so the lesson's return control names
   THIS course, with the reader's scroll position and the stages they had open.
   ========================================================================== */

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft, BookOpen, CircleCheck, Clock, FolderOpen, GraduationCap, Info, Layers, ListChecks, Play, Signpost,
} from "lucide-react";
import {
  consumeReturn, OriginLink, SmartReturn, restoreScroll, scrollOffset, useReturnPacket, type OriginArg,
} from "@/components/neo-shell/nav-context";
import { firstIncomplete } from "@/lib/academy/model";
import { useIsDone, useModuleProgress } from "@/lib/academy/store";
import { RecordHead } from "../record-kit";
import { CatalogFoot, Ledger, Sig, fmt } from "../data/catalog-kit";
import { COURSE_SURFACE, learnModVar, LEARN_MOD_HE, type CourseReturn } from "./mod";
import { neoLessonHref } from "./lesson-links";
import type { AcademyCourseRow } from "./academy-data";
import { LessonFinder } from "./lesson-finder";
import { journeyOf } from "./journey-state";
import { StageBadge, StageMeter, hoursHe } from "./journey";

const RED = { "--m": "var(--brand)" } as React.CSSProperties;

export interface LessonSourceLink { title: string; href: string }

export function CourseView({ c, source, sources = {}, materials }: {
  c: AcademyCourseRow;
  source?: ReactNode;
  /** slug -> its exact source topic, where source-data pairs one */
  sources?: Record<string, LessonSourceLink>;
  materials?: { chapters: number; topics: number };
}) {
  const expanded = useRef(new Set<number>());
  const isDone = useIsDone();
  const p = useModuleProgress(c.id);
  const started = p.completedLessons > 0 || p.blocksDone > 0;
  const finished = p.totalLessons > 0 && p.completedLessons >= p.totalLessons;
  const next = firstIncomplete(c.id, isDone);
  const j = useMemo(() => journeyOf(c.chapters, isDone), [c.chapters, isDone]);
  const cur = c.chapters.find((ch) => ch.index === j.current);
  const curStage = j.stages.find((s) => s.index === j.current);

  /* Coming back from a lesson. Non-null exactly once, and only for a packet
     this course left: a course is a long page and returning to the top of it
     after four lessons would be its own small punishment. */
  const packet = useReturnPacket(COURSE_SURFACE);
  const [restored, setRestored] = useState<typeof packet>(null);
  if (packet && packet.at !== restored?.at) setRestored(packet);
  useEffect(() => { if (packet) consumeReturn(COURSE_SURFACE); }, [packet]);
  // Keep a local snapshot after the one-shot packet is consumed. Otherwise
  // consuming it closes restored stages and cancels the pending scroll.
  const mine = restored?.state.id === c.id ? restored.state as CourseReturn : null;
  /* TWO FRAMES, NOT ONE. `restoreScroll` waits a frame of its own; this waits
     the frame before it, because the App Router resets the canvas to 0 as PART
     of the navigation and does so after the first one. */
  useEffect(() => {
    if (!mine || typeof mine.y !== "number" || mine.y <= 0) return;
    let cancel = () => {};
    const id = requestAnimationFrame(() => { cancel = restoreScroll(mine.y); });
    return () => { cancelAnimationFrame(id); cancel(); };
  }, [mine]);

  /* Where a lesson is being opened FROM. Built at the click: the scroll offset
     is the one part of "where I was" that is only true at that instant. */
  const leaving = (): OriginArg => ({
    href: c.href,
    label: "קורס",
    detail: c.title,
    surface: COURSE_SURFACE,
    state: { id: c.id, y: scrollOffset(), chapters: [...expanded.current].map(String) } satisfies CourseReturn,
  });

  const firstLesson = (index: number) => c.chapters.find((ch) => ch.index === index)?.lessons.find((l) => l.hasLesson);

  return (
    <div
      className="nxv nrc nxa-course nm-scene"
      data-scene="cream"
      data-surface="course"
      style={{ "--m": learnModVar(c.module) } as React.CSSProperties}
    >
      <SmartReturn fallback={{ href: "/neo/academy/", label: "SAP Academy" }} />

      <RecordHead
        icon={<GraduationCap size={14} strokeWidth={1.75} aria-hidden="true" />}
        eyebrow={`SAP Academy · ${LEARN_MOD_HE[c.module] || c.module}`}
        title={c.title}
        en={c.titleEn || undefined}
        meta={
          <>
            <span className="nu-chip nxt-mod"><i aria-hidden="true" />{c.module}</span>
            <span className="nu-chip"><Layers size={11} strokeWidth={1.75} aria-hidden="true" />{fmt(c.totals.chapters)} שלבים</span>
            <span className="nu-chip"><BookOpen size={11} strokeWidth={1.75} aria-hidden="true" />{fmt(c.totals.lessons)} שיעורים</span>
            <span className="nu-chip"><Clock size={11} strokeWidth={1.75} aria-hidden="true" />{hoursHe(c.totals.minutes)}</span>
          </>
        }
        verdict={finished ? (
          <span className="nxa-st" data-state="done"><CircleCheck size={14} strokeWidth={2} aria-hidden="true" />הקורס הושלם</span>
        ) : undefined}
      >
        <Ledger
          label="המסלול במספרים. כל מספר מוביל לחלק שלו בעמוד"
          items={[
            { v: c.totals.chapters, l: "שלבים", href: "#co-ch" },
            { v: c.totals.lessons, l: "שיעורים", href: "#co-ch" },
            { v: c.totals.blocks, l: "יחידות תוכן", href: "#co-ch" },
            ...(materials ? [
              { v: materials.chapters, l: "פרקי מקור", href: "#co-materials" },
              { v: materials.topics, l: "נושאים בחומר המקור", href: "#co-materials" },
            ] : []),
          ]}
        />
      </RecordHead>

      {/* ---------------------------------------------- WHERE YOU ARE
          The page's one red action: the next lesson to read. */}
      <section className="nxa-plate nm-rise nm-once" aria-labelledby="co-p">
        <div className="nxa-plate-id">
          <p className="nxa-plate-k">התקדמות</p>
          <h2 className="nxa-plate-h" id="co-p">
            {finished
              ? "כל השיעורים בקורס הושלמו"
              : started
                ? `${fmt(p.completedLessons)} מתוך ${fmt(p.totalLessons)} שיעורים הושלמו`
                : "עדיין לא התחלת את הקורס"}
          </h2>
          <p className="nxa-plate-at">
            {finished
              ? `כל ${fmt(j.stages.length)} השלבים הושלמו.`
              : started && cur && curStage
                ? <>השלב הנוכחי: שלב {fmt(cur.index)} · {cur.title} · {fmt(curStage.done)} מתוך {fmt(curStage.total)} שיעורים בשלב</>
                : "ההתקדמות נרשמת בעת קריאת שיעור ונשמרת במכשיר בלבד."}
          </p>
          {started ? <p className="nxa-plate-blocks">{fmt(p.blocksDone)} יחידות תוכן נקראו · {p.pct}%</p> : null}
        </div>
        {started ? <StageMeter j={j} label={`ההתקדמות במסלול ${c.title}`} /> : null}
        {next ? (
          <div className="nxa-plate-act">
            {finished ? (
              <OriginLink href={neoLessonHref(c.id, next.slug)} className="nu-btn2" origin={leaving}>
                חזרה לשלב הראשון · {next.title}
              </OriginLink>
            ) : (
              <OriginLink href={neoLessonHref(c.id, next.slug)} className="nu-btn" style={RED} origin={leaving}>
                <Play size={14} strokeWidth={2} aria-hidden="true" />
                {started ? "המשך לשיעור הבא" : "התחלה מהשיעור הראשון"} · {next.title}
              </OriginLink>
            )}
            <a className="nu-btn2" href="#co-materials">
              <FolderOpen size={14} strokeWidth={1.75} aria-hidden="true" />
              חומר הלימוד המלא
            </a>
          </div>
        ) : null}
      </section>

      {/* ------------------------------------------------------- THE STAGES */}
      <Sig
        id="co-ch"
        icon={<Signpost size={15} strokeWidth={1.75} />}
        title="מפת השלבים"
        count={`${fmt(c.totals.chapters)} שלבים`}
        lede="כל שלב נפתח לשיעורים שלו, לפי הסדר. שלב מושלם כשכל שיעוריו הושלמו, ובסופו הדרך לשלב הבא."
      >
        <LessonFinder lessons={c.chapters.flatMap((ch) => ch.lessons)} />

        <ol className="nxa-stages">
          {c.chapters.map((ch) => {
            const st = j.stages.find((s) => s.index === ch.index)!;
            const nextStage = c.chapters.find((x) => x.index === ch.index + 1);
            const nextFirst = nextStage ? firstLesson(nextStage.index) : undefined;
            const open = mine?.chapters ? mine.chapters.includes(String(ch.index)) : ch.index === (j.current || c.chapters[0]?.index);
            return (
              <li key={ch.index} className="nxa-stage-li" data-state={st.state}>
                <details
                  className="nxa-stage"
                  open={open}
                  onToggle={(e) => { if (e.currentTarget.open) expanded.current.add(ch.index); else expanded.current.delete(ch.index); }}
                >
                  <summary className="nxa-stage-h" aria-current={st.state === "current" && started ? "step" : undefined}>
                    <span className="nxa-stage-n" aria-hidden="true">{String(ch.index).padStart(2, "0")}</span>
                    <span className="nxa-stage-t">
                      <b>{ch.title}</b>
                      <span className="nxa-stage-m">
                        {fmt(ch.lessons.length)} שיעורים{ch.minutes ? <> · {hoursHe(ch.minutes)}</> : null}
                        {started && st.done > 0 && st.state !== "done" ? <> · {fmt(st.done)} מתוך {fmt(st.total)} הושלמו</> : null}
                      </span>
                    </span>
                    <StageBadge state={st.state} started={started} />
                  </summary>

                  <ol className="nxa-steps">
                    {ch.lessons.map((l) => {
                      const done = l.hasLesson && isDone(l.slug);
                      const isNext = !finished && next?.slug === l.slug;
                      const src = sources[l.slug];
                      const inner = (
                        <>
                          <span className="nxa-step-n" aria-hidden="true">{String(l.pos).padStart(2, "0")}</span>
                          <span className="nxa-step-t">{l.title}</span>
                          <span className="nxa-step-s">
                            {l.level ? <span className="nu-chip">{l.level}</span> : null}
                            {l.minutes ? <span className="nu-chip">{fmt(l.minutes)} דק׳</span> : null}
                            {!l.hasLesson ? <span className="nu-chip">השיעור טרם נכתב</span> : null}
                            {done ? (
                              <span className="nxa-st" data-state="done"><CircleCheck size={14} strokeWidth={2} aria-hidden="true" />הושלם</span>
                            ) : isNext ? (
                              <span className="nxa-st" data-state="current"><Play size={13} strokeWidth={2} aria-hidden="true" />{started ? "השיעור הבא" : "מתחילים כאן"}</span>
                            ) : null}
                          </span>
                          {l.hasLesson ? <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" className="nxa-step-go" /> : null}
                        </>
                      );
                      return (
                        <li key={l.slug} className="nxa-step-li" data-next={isNext ? "1" : undefined}>
                          {l.hasLesson ? (
                            <OriginLink href={neoLessonHref(c.id, l.slug)} className="nxa-step" origin={leaving}>
                              {inner}
                            </OriginLink>
                          ) : (
                            <div className="nxa-step is-flat">{inner}</div>
                          )}
                          {src ? (
                            <OriginLink href={src.href} className="nxa-step-src" origin={leaving} title={src.title}>
                              <FolderOpen size={13} strokeWidth={1.75} aria-hidden="true" />
                              מקור
                              <span className="nx-sr"> · {src.title}</span>
                            </OriginLink>
                          ) : null}
                        </li>
                      );
                    })}
                  </ol>

                  {/* The way out of the stage, into the next one. */}
                  <p className="nxa-next">
                    {nextStage ? (
                      <>
                        <span className="nxa-next-k">השלב הבא</span>
                        <span className="nxa-next-t">שלב {fmt(nextStage.index)} · {nextStage.title}</span>
                        {nextFirst ? (
                          <OriginLink href={neoLessonHref(c.id, nextFirst.slug)} className="nu-link" origin={leaving}>
                            מתחיל ב: {nextFirst.title}
                            <ArrowLeft size={13} strokeWidth={2} className="nu-arw" aria-hidden="true" />
                          </OriginLink>
                        ) : null}
                      </>
                    ) : (
                      <>
                        <span className="nxa-next-k">סוף המסלול</span>
                        <span className="nxa-next-t">זהו השלב האחרון במסלול. הבנה נבדקת ב<Link href="/neo/certification/" prefetch={false}>תרגול ובדיקת ידע</Link>.</span>
                      </>
                    )}
                  </p>
                </details>
              </li>
            );
          })}
        </ol>
      </Sig>

      {/* ------------------------------------------------- THE SOURCE FOLDER */}
      <section className="nxa-src-wrap" id="co-materials" aria-label="חומר הלימוד המלא">
        <div className="nxa-src-body">{source}</div>
        <p className="nxa-src-all">
          <Link className="nu-link" href="/neo/academy/materials/" prefetch={false}>
            כל תיקיות האקדמיה
            <ArrowLeft size={13} strokeWidth={2} className="nu-arw" aria-hidden="true" />
          </Link>
        </p>
      </section>

      <CatalogFoot
        notes={[
          <>
            <Info size={13} strokeWidth={1.75} aria-hidden="true" className="nxa-foot-i" />
            מקור המבנה: מסלולי הלמידה של SAP Academy (<span className="nx-sap">lib/academy/model.ts</span>).
            {" "}אורך ורמה הם שדות שהמסלול מגדיר לכל שיעור.
          </>,
        ]}
      >
        <ListChecks size={13} strokeWidth={1.75} aria-hidden="true" className="nxa-foot-i" />
        שיעור נחשב מושלם כשכל יחידות התוכן שהוא דורש נקראו.
        {" "}ההתקדמות נשמרת במכשיר בלבד (<span className="nx-sap">neo:academy:v2</span>) ואינה מסונכרנת.
      </CatalogFoot>
    </div>
  );
}
