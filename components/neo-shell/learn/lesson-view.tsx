"use client";

/* ============================================================================
   PROJECT NEO · /neo/academy/<courseId>/<slug>/ — the lesson, read inside NEO.
   ----------------------------------------------------------------------------
   THIS IS A PRESENTATION, NOT A SECOND ENGINE.

     the blocks        lib/academy/lesson-types.ts — `orderedBlocks()` decides
                       what is shown and in what order. Called here, not copied.
     the content       data/academy/lessons — read on the server
                       (./lesson-data.ts) and handed over verbatim. Not one
                       sentence of a lesson is authored, rewritten or summarised
                       on this surface.
     the progress      lib/academy/store.ts — `useLessonProgress`, `recordBlock`,
                       `setLastLesson`, the SAME `neo:academy:v2` key the live
                       academy writes. A lesson read here is read on /academy/
                       too, and "המשך מהמקום שעצרת" on both surfaces points at
                       the same block.
     the position      lib/academy/model.ts — chapter, position, prev and next.

   WHY IT EXISTS
     The block engine cannot be poured into NEO's book reader: a book chapter is
     prose in a shard, a lesson is 17 typed blocks with a completion rule of its
     own. So the engine keeps its own route — and this route is that engine,
     read WITHOUT leaving Project NEO: the NEO shell around it, <SmartReturn/>
     at the top, .nu-* controls, --mod-* identity, NEO typography.
     app/academy/lesson/<slug>/ is unchanged and still serves every existing
     link, including its own celebrations and its own dashboard.

   COLOUR, per app/neo/learn.css: module identity arrives as a line, an edge, a
   ring or a tint (--m). .nu-status — dot plus word — says exactly two real
   things here: whether a block has been read, and how the lesson's own data
   declares its verification level. Nothing else gets a dot.
   ========================================================================== */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle, ArrowLeft, ArrowRight, Award, Blocks, Boxes, Braces, Building2,
  BookCheck, CircleHelp, Check, Clock, GraduationCap, HelpCircle, Info, KeyRound,
  LayoutDashboard, Lightbulb, Link2, Lock, MapPin, Network, Settings, ShieldCheck,
  StickyNote, Table2, Target, Terminal, TrendingUp, Workflow, Wrench,
  type LucideIcon,
} from "lucide-react";
import { SmartReturn, OriginLink, type OriginArg } from "@/components/neo-shell/nav-context";
import { orderedBlocks, type BlockKind, type LessonBlock } from "@/lib/academy/lesson-types";
import { recordBlock, setLastLesson, useLessonProgress } from "@/lib/academy/store";
import { learnModVar, LEARN_MOD_HE } from "./mod";
import { academyLessonHref } from "./lesson-links";
import type { NeoLessonData, NeoLessonLink } from "./lesson-data";

const nf = new Intl.NumberFormat("he-IL");

/* ------------------------------------------------------------ block naming */

/** The Hebrew name of a block kind, and its icon. Both are NAVIGATION labels for
 *  a block TYPE — they describe the shape of the section, never its content, so
 *  nothing here can invent an SAP fact. BLOCK_META in lib/academy/lesson-types
 *  holds the same names beside an emoji; NEO is emoji-free, so the icon is a
 *  lucide glyph and the word is repeated rather than the emoji stripped. */
const KIND_HE: Record<BlockKind, string> = {
  objective: "מטרת השיעור",
  why: "מדוע זה חשוב",
  "business-value": "ערך עסקי",
  "where-used": "היכן בשימוש",
  "key-concepts": "מושגי מפתח",
  "cbc-example": "דוגמה מ-CBC",
  flow: "התהליך",
  diagram: "תרשים",
  tables: "טבלאות SAP",
  tcodes: "טרנזקציות",
  fiori: "יישומי Fiori",
  spro: "קונפיגורציה · SPRO",
  objects: "BAPI, FM ו-CDS",
  odata: "שירותי OData",
  authorizations: "הרשאות",
  notes: "SAP Notes",
  "common-mistakes": "טעויות נפוצות",
  troubleshooting: "פתרון בעיות",
  "best-practices": "שיטות עבודה מומלצות",
  tips: "טיפים ליישום",
  related: "נושאים קשורים",
  quiz: "שאלות חזרה",
  summary: "סיכום",
};

const KIND_ICON: Record<BlockKind, LucideIcon> = {
  objective: Target, why: HelpCircle, "business-value": TrendingUp, "where-used": MapPin,
  "key-concepts": KeyRound, "cbc-example": Building2, flow: Workflow, diagram: Network,
  tables: Table2, tcodes: Terminal, fiori: LayoutDashboard, spro: Settings, objects: Boxes,
  odata: Braces, authorizations: Lock, notes: StickyNote, "common-mistakes": AlertTriangle,
  troubleshooting: Wrench, "best-practices": Award, tips: Lightbulb, related: Link2,
  quiz: CircleHelp, summary: BookCheck,
};

/** How the lesson data itself declares its verification. The words and the four
 *  values are the data's own (lib/academy/lesson-types.ts, `Trust`); this maps
 *  them onto --status-*, which is the only place a dot is allowed. */
const TRUST: Record<string, { he: string; s: string }> = {
  "verified-docs": { he: "מאומת מול תיעוד", s: "var(--status-done)" },
  "verified-system": { he: "מאומת במערכת", s: "var(--status-done)" },
  curated: { he: "תוכן ערוך", s: "var(--status-tested)" },
  "needs-review": { he: "נדרש אימות נוסף", s: "var(--status-in-conversion)" },
};

/* --------------------------------------------------------------- inline md */

/** The lesson bodies carry `**bold**` and nothing else. This renders that one
 *  mark and leaves every other character exactly as the data holds it — it is
 *  not a markdown engine and must never become one. */
function marks(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <b key={i}>{part.slice(2, -2)}</b>
      : <span key={i}>{part}</span>,
  );
}

/* ------------------------------------------------------------------- quiz */

function Quiz({ q }: { q: { question: string; options: { text: string; correct?: boolean }[]; explain?: string } }) {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <div className="nxs-quiz">
      <p className="nxs-quiz-q">{q.question}</p>
      <div className="nxs-quiz-o" role="group" aria-label={q.question}>
        {q.options.map((o, i) => (
          <button
            key={i}
            type="button"
            className="nu-card nxs-opt"
            data-state={picked === null ? undefined : o.correct ? "right" : i === picked ? "wrong" : "off"}
            aria-pressed={picked === i}
            onClick={() => setPicked(i)}
          >
            {picked !== null && o.correct ? <Check size={14} strokeWidth={2.25} aria-hidden="true" /> : null}
            {o.text}
          </button>
        ))}
      </div>
      {picked !== null && q.explain ? <p className="nx-muted nxs-quiz-e">{q.explain}</p> : null}
    </div>
  );
}

/* ------------------------------------------------------------- block body */

function Body({ b }: { b: LessonBlock }) {
  switch (b.kind) {
    case "objective":
      return <p className="nxs-p nxs-p--lead">{marks(b.md)}</p>;
    case "why":
    case "business-value":
    case "where-used":
    case "cbc-example":
    case "spro":
    case "troubleshooting":
    case "notes":
    case "summary":
      return <p className="nxs-p">{marks(b.md)}</p>;
    case "diagram":
      return (
        <figure className="nxs-fig">
          <p className="nxs-p">{marks(b.md)}</p>
          {b.caption ? <figcaption className="nx-muted">{b.caption}</figcaption> : null}
        </figure>
      );
    case "key-concepts":
    case "authorizations":
      return <ul className="nxs-l">{b.items.map((it, i) => <li key={i}>{marks(it)}</li>)}</ul>;
    case "common-mistakes":
    case "best-practices":
    case "tips":
      return (
        <ul className="nxs-l nxs-l--note" data-tone={b.kind === "common-mistakes" ? "warn" : "good"}>
          {b.items.map((it, i) => <li key={i}>{marks(it)}</li>)}
        </ul>
      );
    case "flow":
      return (
        <ol className="nxs-flow">
          {b.steps.map((s, i) => (
            <li key={i} data-on={i === b.activeIndex ? "1" : undefined}>
              <span className="nxs-flow-n nx-sap">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
      );
    case "tables":
      return (
        <div className="nxs-tbl-w">
          <table className="nxs-tbl">
            <thead>
              <tr><th scope="col">טבלת SAP</th><th scope="col">תיאור</th></tr>
            </thead>
            <tbody>
              {b.rows.map((r) => (
                <tr key={r.code}>
                  <td>
                    {r.href
                      ? <Link className="nu-link nx-sap" href={r.href} prefetch={false}>{r.code}</Link>
                      : <span className="nx-sap">{r.code}</span>}
                  </td>
                  <td>{r.he}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "tcodes":
    case "fiori":
    case "objects":
    case "odata":
    case "related":
      return (
        <>
          <div className="nxs-refs">
            {b.refs.map((r) =>
              r.href ? (
                <Link key={r.code} className="nu-card nxs-ref" href={r.href} prefetch={false}>
                  <span className="nxs-ref-c nx-sap">{r.code}</span>
                  {r.label ? <span className="nxs-ref-l">{r.label}</span> : null}
                  <ArrowLeft size={13} strokeWidth={2} aria-hidden="true" />
                </Link>
              ) : (
                <span key={r.code} className="nu-chip nxs-ref is-flat">
                  <span className="nxs-ref-c nx-sap">{r.code}</span>
                  {r.label ? <span className="nxs-ref-l">{r.label}</span> : null}
                </span>
              ),
            )}
          </div>
          {b.note ? <p className="nx-muted nxs-note">{b.note}</p> : null}
        </>
      );
    case "quiz":
      return <div className="nxs-quizzes">{b.items.map((q, i) => <Quiz key={i} q={q} />)}</div>;
    default:
      return null;
  }
}

/* ---------------------------------------------------------------- section */

/**
 * One block, and the moment it counts as read.
 *
 * The rule is the product's own and is not re-invented: a block is done when it
 * has genuinely been in the reading band. The observer disconnects on the first
 * hit, so a section counts once and scrolling back over it changes nothing.
 */
function Section({ b, done, onRead }: { b: LessonBlock; done: boolean; onRead: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const Icon = KIND_ICON[b.kind] ?? Info;
  const trust = b.trust ? TRUST[b.trust] : undefined;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { io.disconnect(); onRead(); } },
      { rootMargin: "-25% 0px -25% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [onRead]);

  return (
    <section className="nxs-sec" id={`nxs-${b.kind}`} ref={ref} aria-labelledby={`nxs-h-${b.kind}`}>
      <header className="nxs-sec-h">
        <span className="nxs-sec-i" aria-hidden="true"><Icon size={16} strokeWidth={1.75} /></span>
        <h2 className="nx-h2 nxs-sec-t" id={`nxs-h-${b.kind}`}>{b.title || KIND_HE[b.kind] || b.kind}</h2>
        {trust ? (
          <span
            className="nu-status nxs-trust"
            style={{ "--s": trust.s } as React.CSSProperties}
            title={[b.source, b.lastReviewed && `נבדק לאחרונה ${b.lastReviewed}`].filter(Boolean).join(" · ") || undefined}
          >
            {trust.he}
          </span>
        ) : null}
        {done ? (
          <span className="nu-status nxs-read" style={{ "--s": "var(--status-done)" } as React.CSSProperties}>
            נקרא
          </span>
        ) : null}
      </header>
      <div className="nxs-sec-b"><Body b={b} /></div>
    </section>
  );
}

/* ------------------------------------------------------------------- view */

function Step({ l, dir, origin }: { l: NeoLessonLink; dir: "prev" | "next"; origin: () => OriginArg }) {
  return (
    <OriginLink className="nu-card nxs-step" href={l.href} data-dir={dir} origin={origin}>
      {dir === "prev" ? <ArrowRight size={16} strokeWidth={2} aria-hidden="true" /> : null}
      <span className="nxs-step-t">
        <span className="nx-eyebrow">
          {l.newChapter ? `${dir === "prev" ? "הפרק הקודם" : "הפרק הבא"} · ${l.chapterTitle}` : dir === "prev" ? "השיעור הקודם" : "השיעור הבא"}
        </span>
        <b>{l.title}</b>
      </span>
      {dir === "next" ? <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" /> : null}
    </OriginLink>
  );
}

export function NeoLessonView({ d }: { d: NeoLessonData }) {
  const { course, place, lesson, prev, next } = d;
  const blocks = useMemo(() => orderedBlocks(lesson), [lesson]);
  const kinds = useMemo(() => blocks.map((b) => b.kind), [blocks]);
  const { doneSet, pct, markDone } = useLessonProgress(lesson.slug, kinds);

  /* The one write that is not a block: "this is the lesson the reader is on".
     It powers "המשך מהמקום שעצרת" on /neo/academy and on /academy alike, because
     both read the same key. */
  useEffect(() => { setLastLesson(course.id, lesson.slug); }, [course.id, lesson.slug]);

  const read = useCallback((kind: string) => { markDone(kind); recordBlock(lesson.slug, kind); }, [markDone, lesson.slug]);

  /* Where a neighbouring lesson is being opened FROM. The chain of lessons is a
     chain of pages, so each one hands the next the COURSE as the way back —
     otherwise the fourth lesson in a row has nothing true to return to.

     Deliberately WITHOUT a `state`. This page knows its own scroll offset and
     nothing about the course's, so attaching one would send the course screen
     to a position that belongs to a lesson. The course is re-entered at its own
     top, which is honest; only the course itself, which really was scrolled,
     hands its viewport out (see course-view.tsx). */
  const origin = useCallback(
    (): OriginArg => ({ href: course.href, label: "קורס", detail: course.title }),
    [course.href, course.title],
  );

  const trust = TRUST[lesson.trust];
  const started = doneSet.size > 0;

  return (
    <div
      className="nxv nxs"
      data-surface="lesson"
      style={{ "--m": learnModVar(course.module) } as React.CSSProperties}
    >
      {/* With a memory the control names the surface the reader came from — the
          course screen, or the previous lesson's course. Without one it still
          has somewhere true to go: this lesson's own course. */}
      <SmartReturn fallback={{ href: course.href, label: `קורס · ${course.title}` }} />

      <header className="nxv-head">
        <span className="nx-modbar" aria-hidden="true" />
        <span className="nx-eyebrow">
          SAP Academy · {LEARN_MOD_HE[course.module] || course.module}
          {" · "}
          פרק {nf.format(place.chapterIndex)} · {place.chapterTitle}
        </span>
        <div className="nxv-title">
          <h1 className="nxv-h1">{lesson.title}</h1>
          {lesson.titleEn ? <p className="nxv-en">{lesson.titleEn}</p> : null}
        </div>
        <div className="nxv-meta">
          <span className="nu-chip nxv-mod"><i aria-hidden="true" />{course.module}</span>
          <span className="nu-chip">{lesson.level}</span>
          <span className="nu-chip"><Clock size={11} strokeWidth={1.75} />{nf.format(lesson.minutes)} דק׳ (אורך מוצהר)</span>
          <span className="nu-chip"><Blocks size={11} strokeWidth={1.75} />{nf.format(kinds.length)} יחידות תוכן</span>
          {trust ? (
            <span className="nu-status" style={{ "--s": trust.s } as React.CSSProperties} title={lesson.source}>
              {trust.he}
            </span>
          ) : null}
        </div>
      </header>

      {/* ------------------------------------------------- WHERE YOU ARE */}
      <section className="nxv-s4" aria-labelledby="nxs-p">
        <div className="nxv-s4-top">
          <span className="nx-eyebrow">ההתקדמות בשיעור</span>
          <h2 className="nxv-s4-h" id="nxs-p">
            {pct === 100
              ? "כל יחידות התוכן בשיעור נקראו"
              : started
                ? `${nf.format(doneSet.size)} מתוך ${nf.format(kinds.length)} יחידות תוכן נקראו`
                : "לא נרשמה קריאה של השיעור במכשיר הזה"}
          </h2>
        </div>
        {started ? (
          <div className="nxl-bar">
            <div className="nxl-bar-h">
              <span>שיעור {nf.format(place.posInChapter)} מתוך {nf.format(place.chapterSize)} בפרק</span>
              <b>{pct}%</b>
            </div>
            <div className="nxl-bar-t">
              <span className="nxl-bar-f" style={{ "--p": pct / 100 } as React.CSSProperties} />
            </div>
          </div>
        ) : (
          <p className="nx-muted">
            יחידת תוכן נספרת כשהיא מוצגת במסך.
            {" "}ההתקדמות נשמרת במכשיר בלבד (<span className="nx-sap">neo:academy:v2</span>).
          </p>
        )}
      </section>

      {/* ------------------------------------------------------- THE LESSON */}
      {blocks.length === 0 ? (
        <p className="nx-muted nxs-none">
          לשיעור זה אין יחידות תוכן במאגר השיעורים.
        </p>
      ) : (
        <div className="nxs-flow-doc">
          {blocks.map((b) => (
            <Section key={b.kind} b={b} done={doneSet.has(b.kind)} onRead={() => read(b.kind)} />
          ))}
        </div>
      )}

      {/* --------------------------------------------------------- STEPPING */}
      <nav className="nxs-steps" aria-label="מעבר בין שיעורים">
        {prev ? <Step l={prev} dir="prev" origin={origin} /> : <span className="nxs-step is-none">זהו השיעור הראשון בקורס.</span>}
        <Link className="nu-btn2 nxs-up" href={course.href} prefetch={false}>
          <GraduationCap size={15} strokeWidth={1.75} aria-hidden="true" />
          חזרה לקורס · שיעור {nf.format(place.globalIndex)} מתוך {nf.format(place.globalTotal)}
        </Link>
        {next ? <Step l={next} dir="next" origin={origin} /> : <span className="nxs-step is-none">זהו השיעור האחרון בקורס.</span>}
      </nav>

      <div className="nxv-foot">
        <p className="nxv-src">
          <ShieldCheck size={13} strokeWidth={1.75} aria-hidden="true" />
          <span>
            מקור: מאגר השיעורים של SAP Academy (<span className="nx-sap">data/academy/lessons</span>).
            {" "}התוכן מוצג כפי שנכתב.
          </span>
        </p>
        <p>
          <Info size={13} strokeWidth={1.75} aria-hidden="true" />
          {" "}אותו שיעור זמין גם במסך הלמידה הקודם,{" "}
          <Link className="nu-link" href={academyLessonHref(lesson.slug)} prefetch={false}>
            <span className="nx-sap">{academyLessonHref(lesson.slug)}</span>
          </Link>
          , וההתקדמות משותפת לשני המסכים.
        </p>
      </div>
    </div>
  );
}
