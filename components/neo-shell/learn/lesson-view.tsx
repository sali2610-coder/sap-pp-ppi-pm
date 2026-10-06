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

   THE READING RAIL (2026-10)
     The reader watches the lesson being taken in: a ring with the share of
     units seen, the lesson's contents with a mark per unit that turns green
     the moment the unit has been on screen, the unit now on screen, the stage
     around the lesson, and at the end of the units a closing card with the
     one way on. With room the rail is a column beside the lesson; on a narrow
     screen it is a bar that stays at the top while the lesson scrolls under
     it (app/neo/academy-experience.css §9). Only what turns green during THIS
     visit animates; what was seen before is simply green.

   COLOUR, per app/neo/learn.css: module identity arrives as a line, an edge, a
   ring or a tint (--m). .nu-status — dot plus word — says exactly two real
   things here: whether a block has been seen, and how the lesson's own data
   declares its verification level. Seen is green (--nxs-ok), always with its
   glyph and its word. Brand red is the closing card's one way on.
   ========================================================================== */

import { useCallback, useEffect, useEffectEvent, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle, ArrowLeft, ArrowRight, Award, Blocks, Boxes, Braces,
  BookCheck, ChevronDown, CircleCheck, CircleHelp, Check, Clock, GraduationCap, HelpCircle, History, Info, KeyRound,
  LayoutDashboard, Lightbulb, Link2, ListChecks, Lock, MapPin, Network, Settings, ShieldCheck,
  StickyNote, Table2, Target, Terminal, TrendingUp, Workflow, Wrench,
  type LucideIcon,
} from "lucide-react";
import { SmartReturn, OriginLink, type OriginArg } from "@/components/neo-shell/nav-context";
import { orderedBlocks, type BlockKind, type LessonBlock } from "@/lib/academy/lesson-types";
import { getLastBlock, isLessonDone, recordBlock, setLastLesson, useIsDone, useLessonProgress } from "@/lib/academy/store";
import { RecordHead } from "../record-kit";
import { CatalogFoot } from "../data/catalog-kit";
import { learnModVar, LEARN_MOD_HE } from "./mod";
import { SourceFlow } from "./source-flow";
import { CodeCopy } from "./code-copy";
import { StageMeter, hoursHe } from "./journey";
import { journeyOf } from "./journey-state";
import type { NeoLessonData, NeoLessonLink } from "./lesson-data";

const nf = new Intl.NumberFormat("he-IL");
const RED = { "--m": "var(--brand)" } as React.CSSProperties;

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
  "key-concepts": KeyRound, flow: Workflow, diagram: Network,
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
  // neutral, not --status-tested: that token is violet, and NEO draws no violet
  curated: { he: "תוכן ערוך", s: "var(--status-not-started)" },
  "needs-review": { he: "נדרש אימות נוסף", s: "var(--status-in-conversion)" },
};

/** A block's heading: its own title, else the name of its kind. */
const titleOf = (b: LessonBlock) => b.title || KIND_HE[b.kind] || b.kind;

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
                    <CodeCopy code={r.code} />
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
            {b.refs.map((r, i) => <div className="nxa-ref-wrap" key={`${r.code}-${i}`}>
              {r.href ? <Link className="nu-card nxs-ref" href={r.href} prefetch={false}>
                <bdi dir="ltr" className="nxs-ref-c nx-sap">{r.code}</bdi>
                {r.label ? <span className="nxs-ref-l">{r.label}</span> : null}
                <ArrowLeft size={13} strokeWidth={2} aria-hidden="true" />
              </Link> : <span className="nu-chip nxs-ref is-flat">
                <bdi dir="ltr" className="nxs-ref-c nx-sap">{r.code}</bdi>
                {r.label ? <span className="nxs-ref-l">{r.label}</span> : null}
              </span>}
              {b.kind !== "related" ? <CodeCopy code={r.code} /> : null}
            </div>)}
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
 * One block, and the moment it counts as seen.
 *
 * The rule is the product's own and is not re-invented: a block is done when it
 * has genuinely been in the reading band. The observer disconnects on the first
 * hit, so a section counts once and scrolling back over it changes nothing.
 *
 * The observer is made ONCE per mount. `onRead` is a new closure on every
 * render, and an effect keyed on it re-created every observer on every store
 * write: a section still inside the band then counted again, wrote again and
 * rendered again, round and round until the reader scrolled away. The effect
 * event calls the newest handler without being a dependency.
 */
function Section({ b, done, fresh, onRead }: { b: LessonBlock; done: boolean; fresh: boolean; onRead: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const Icon = KIND_ICON[b.kind] ?? Info;
  const trust = b.trust ? TRUST[b.trust] : undefined;
  const seen = useEffectEvent(onRead);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { io.disconnect(); seen(); } },
      { rootMargin: "-25% 0px -25% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      className="nxs-sec"
      id={`nxs-${b.kind}`}
      ref={ref}
      aria-labelledby={`nxs-h-${b.kind}`}
      data-read={done ? "1" : undefined}
      data-fresh={fresh ? "1" : undefined}
    >
      <header className="nxs-sec-h">
        <span className="nxs-sec-i" aria-hidden="true"><Icon size={16} strokeWidth={1.75} /></span>
        <h2 className="nx-h2 nxs-sec-t" id={`nxs-h-${b.kind}`}>{titleOf(b)}</h2>
        {trust ? (
          <span
            className="nu-status nxs-trust"
            style={{ "--s": trust.s } as React.CSSProperties}
            title={[b.source, b.lastReviewed && `נבדק לאחרונה ${b.lastReviewed}`].filter(Boolean).join(" · ") || undefined}
          >
            {trust.he}
          </span>
        ) : null}
        {/* Whether the block has been on screen: before, a hollow dot and its
            word; after, the green check and its word. Never colour alone. */}
        {done ? (
          <span className="nu-status nu-status--g nxs-read" style={{ "--s": "var(--nxs-ok)" } as React.CSSProperties}>
            <CircleCheck size={14} strokeWidth={2.25} aria-hidden="true" />
            נצפה
          </span>
        ) : (
          <span className="nu-status nxs-unread">טרם נצפה</span>
        )}
      </header>
      <div className="nxs-sec-b"><Body b={b} /></div>
    </section>
  );
}

/* ------------------------------------------------------------- the reading */

/** The share of the lesson's units already on screen, as a ring. Before the
 *  first one it is a dashed frame around the unit count: a first visit gets
 *  no 0% (the store's own rule), it gets the size of what lies ahead. */
function Ring({ pct, total, started }: { pct: number; total: number; started: boolean }) {
  return (
    <span className="nxs-ring" data-started={started ? "1" : undefined} data-full={pct === 100 ? "1" : undefined} aria-hidden="true">
      <svg viewBox="0 0 36 36" focusable="false">
        <circle className="nxs-ring-t" cx="18" cy="18" r="15.5" pathLength={100} />
        <circle className="nxs-ring-f" cx="18" cy="18" r="15.5" pathLength={100} style={{ "--p": started ? pct : 0 } as React.CSSProperties} />
      </svg>
      <span className="nxs-ring-n" dir="ltr">
        {pct === 100 ? <Check size={20} strokeWidth={2.75} /> : started ? <>{pct}<small>%</small></> : nf.format(total)}
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------- view */

function Step({ l, dir, origin }: { l: NeoLessonLink; dir: "prev" | "next"; origin: () => OriginArg }) {
  return (
    <OriginLink className="nu-card nxs-step" href={l.href} data-dir={dir} origin={origin}>
      {dir === "prev" ? <ArrowRight size={16} strokeWidth={2} aria-hidden="true" /> : null}
      <span className="nxs-step-t">
        <span className="nx-eyebrow">
          {l.newChapter ? `${dir === "prev" ? "השלב הקודם" : "השלב הבא"} · ${l.chapterTitle}` : dir === "prev" ? "השיעור הקודם" : "השיעור הבא"}
        </span>
        <b>{l.title}</b>
      </span>
      {dir === "next" ? <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" /> : null}
    </OriginLink>
  );
}

/** Keyed by the lesson: what was just seen and where the reader is belong to
 *  ONE lesson, so stepping to the next lesson starts all of it afresh (and a
 *  block kind every lesson shares, the objective, is not "just seen" there). */
export function NeoLessonView({ d }: { d: NeoLessonData }) {
  return <LessonPage key={d.lesson.slug} d={d} />;
}

function LessonPage({ d }: { d: NeoLessonData }) {
  const { course, place, lesson, prev, next } = d;
  const blocks = useMemo(() => orderedBlocks(lesson), [lesson]);
  const kinds = useMemo(() => blocks.map((b) => b.kind), [blocks]);
  const { doneSet, pct, markDone } = useLessonProgress(lesson.slug, kinds);

  /* The one write that is not a block: "this is the lesson the reader is on".
     It powers "המשך מהמקום שעצרת" on /neo/academy and on /academy alike, because
     both read the same key. */
  useEffect(() => { setLastLesson(course.id, lesson.slug); }, [course.id, lesson.slug]);

  /* Blocks seen during THIS visit. They, and only they, are shown turning
     green: a block seen last week is simply green. */
  const [fresh, setFresh] = useState<ReadonlySet<string>>(() => new Set());
  const read = (kind: string) => {
    if (!doneSet.has(kind)) setFresh((s) => (s.has(kind) ? s : new Set(s).add(kind)));
    markDone(kind);
    recordBlock(lesson.slug, kind);
  };

  /* The block on screen now: the one crossing the upper part of the view. One
     observer for the lesson; it names the block for the rail, it records
     nothing (the sections' own observers do that). */
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = kinds.map((k) => document.getElementById(`nxs-${k}`)).filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      const hit = entries.filter((e) => e.isIntersecting).sort((a, z) => a.boundingClientRect.top - z.boundingClientRect.top)[0];
      if (hit) setActive(hit.target.id.slice(4));
    }, { rootMargin: "-22% 0px -68% 0px" });
    for (const el of els) io.observe(el);
    return () => io.disconnect();
  }, [kinds]);

  /* With room the contents list can be taller than the rail and scrolls on its
     own; the block on screen is kept inside it. Its own scroll only: a
     scrollIntoView would move the lesson as well. */
  const listRef = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const box = listRef.current;
    if (!box || !active || box.scrollHeight <= box.clientHeight) return;
    const item = box.querySelector<HTMLElement>(`[data-k="${active}"]`);
    if (!item) return;
    const b = box.getBoundingClientRect();
    const r = item.getBoundingClientRect();
    if (r.top < b.top) box.scrollTop -= b.top - r.top + 6;
    else if (r.bottom > b.bottom) box.scrollTop += r.bottom - b.bottom + 6;
  }, [active]);

  /* Back into a lesson left half-way: it opens at the block last on screen, as
     the academy's own reader does (components/academy/lesson-view.tsx). Not on
     a first visit, not on a finished lesson, not at the first block, and not
     when the address names a block of its own. The store is read live: at
     hydration the render still holds the server's empty snapshot. Two frames,
     because the App Router puts the canvas back at the top after the first
     (course-view.tsx says the same). */
  const [resumed, setResumed] = useState<string | null>(null);
  useEffect(() => {
    if (window.location.hash) return;
    const kind = getLastBlock(lesson.slug);
    if (!kind || isLessonDone(lesson.slug) || kinds.indexOf(kind as BlockKind) <= 0) return;
    let f2 = 0;
    const f1 = requestAnimationFrame(() => {
      f2 = requestAnimationFrame(() => {
        const el = document.getElementById(`nxs-${kind}`);
        if (!el) return;
        el.scrollIntoView({ block: "start", behavior: "auto" });
        setResumed(kind);
      });
    });
    return () => { cancelAnimationFrame(f1); cancelAnimationFrame(f2); };
  }, [lesson.slug, kinds]);

  /* On a narrow screen the rail's contents open under its bar, and end above
     whatever closes the canvas at the bottom: its own edge, or the dock that
     floats over it (dock.css). Measured, because the shell's top bar, the tab
     bar and the dock differ between the desktop and the phone shell. */
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = moreRef.current;
    if (!open || !el) return;
    const fit = () => {
      const canvas = document.getElementById("main")?.getBoundingClientRect();
      const dock = document.querySelector(".nxk")?.getBoundingClientRect();
      if (!canvas) return;
      const floor = Math.min(canvas.bottom, dock && dock.height > 0 ? dock.top : Infinity);
      el.style.maxBlockSize = `${Math.max(160, Math.floor(floor - el.getBoundingClientRect().top - 12))}px`;
    };
    fit();
    window.addEventListener("resize", fit);
    return () => { window.removeEventListener("resize", fit); el.style.maxBlockSize = ""; };
  }, [open]);

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
  const total = kinds.length;
  const seenCount = doneSet.size;
  const started = seenCount > 0;
  const left = Math.max(0, total - seenCount);
  const firstOpen = blocks.find((b) => !doneSet.has(b.kind));
  const resumedBlock = resumed ? blocks.find((b) => b.kind === resumed) : undefined;
  // the unit on screen; before the first scroll, the one the lesson opens with
  const onScreen = blocks.find((b) => b.kind === active) ?? blocks[0];

  /* THE STAGE (2026-10): where this lesson sits in its stage, and, at the
     end of the stage, the way into the next one. Read from the same store. */
  const isDone = useIsDone();
  const steps = d.stage.lessons.filter((l) => l.hasLesson);
  const stageDone = steps.filter((l) => isDone(l.slug)).length;
  const stageComplete = steps.length > 0 && stageDone === steps.length;
  const openStep = steps.find((l) => !isDone(l.slug) && l.slug !== lesson.slug);
  const endsStage = !next || next.newChapter;
  // The whole path's meter, drawn only where a stage ends.
  const pathJourney = endsStage ? journeyOf(d.path, isDone) : null;
  const after = d.nextStage;

  /* The lesson's completion is the store's rule (its recorded blocks reach the
     blocks it requires), the same rule the course map draws. Finishing it
     during this visit is the one moment that is announced. */
  const complete = isDone(lesson.slug);
  const justFinished = complete && fresh.size > 0;

  const heading = pct === 100
    ? "כל יחידות התוכן בשיעור נצפו"
    : started
      ? `${nf.format(seenCount)} מתוך ${nf.format(total)} יחידות תוכן נצפו`
      : "לא נרשמה צפייה בשיעור במכשיר הזה";

  return (
    <div
      className="nxv nrc nm-scene"
      data-scene="cream"
      data-surface="lesson"
      style={{ "--m": learnModVar(course.module) } as React.CSSProperties}
    >
      {/* With a memory the control names the surface the reader came from — the
          course screen, or the previous lesson's course. Without one it still
          has somewhere true to go: this lesson's own course. */}
      <SmartReturn fallback={{ href: course.href, label: `קורס · ${course.title}` }} />

      <RecordHead
        icon={<GraduationCap size={14} strokeWidth={1.75} aria-hidden="true" />}
        eyebrow={`SAP Academy · ${LEARN_MOD_HE[course.module] || course.module} · שלב ${nf.format(place.chapterIndex)} · ${place.chapterTitle}`}
        title={lesson.title}
        en={lesson.titleEn || undefined}
        meta={
          <>
            <span className="nu-chip nxt-mod"><i aria-hidden="true" />{course.module}</span>
            <span className="nu-chip">{lesson.level}</span>
            <span className="nu-chip"><Clock size={11} strokeWidth={1.75} />{nf.format(lesson.minutes)} דק׳ (אורך מוצהר)</span>
            <span className="nu-chip"><Blocks size={11} strokeWidth={1.75} />{nf.format(total)} יחידות תוכן</span>
            {trust ? (
              <span className="nu-status" style={{ "--s": trust.s } as React.CSSProperties} title={lesson.source}>
                {trust.he}
              </span>
            ) : null}
          </>
        }
      />

      <nav className="nxa-lesson-nav" aria-label="ניווט מהיר בשיעור">
        {prev ? <Link href={prev.href} prefetch={false}>השיעור הקודם</Link> : <span>תחילת הקורס</span>}
        <Link href={course.href} prefetch={false}>כל שיעורי הקורס</Link>
        {next ? <Link href={next.href} prefetch={false}>השיעור הבא</Link> : <span>סיום הקורס</span>}
      </nav>

      <div className="nxs-grid">
        {/* ------------------------------------------------ THE READING RAIL
            First in the document: on a narrow screen it is the bar that stays
            at the top while the lesson scrolls under it; with room it is the
            column beside the lesson. */}
        <aside
          className="nxs-rail"
          aria-label="מעקב הצפייה בשיעור"
          data-open={open ? "1" : undefined}
          onKeyDown={(e) => { if (e.key === "Escape" && open) { setOpen(false); toggleRef.current?.focus(); } }}
        >
          <section className="nxs-meter" aria-labelledby="nxs-p">
            <Ring pct={pct} total={total} started={started} />
            <div className="nxs-meter-id">
              <span className="nx-eyebrow">ההתקדמות בשיעור</span>
              <h2 className="nxs-meter-h" id="nxs-p">{heading}</h2>
              {/* Narrow only: the bar names the unit on screen. With room the
                  contents list beside the lesson marks it instead. */}
              {onScreen ? <span className="nxs-meter-now">במסך: {titleOf(onScreen)}</span> : null}
            </div>
            {total > 0 ? (
              <button
                ref={toggleRef}
                type="button"
                className="nu-btn2 nxs-rail-tg"
                aria-expanded={open}
                aria-controls="nxs-more"
                onClick={() => setOpen((o) => !o)}
              >
                <ListChecks size={15} strokeWidth={1.9} aria-hidden="true" />
                תוכן<span className="nx-sr"> השיעור</span>
                <ChevronDown size={14} strokeWidth={2} aria-hidden="true" className="nxs-rail-tg-c" />
              </button>
            ) : null}
          </section>

          <div className="nxs-more" id="nxs-more" ref={moreRef}>
            {resumedBlock ? (
              <p className="nxs-resumed">
                <History size={13} strokeWidth={1.9} aria-hidden="true" />
                <span>
                  השיעור נפתח ביחידה האחרונה שנצפתה: {titleOf(resumedBlock)}.
                  {" "}<a href={`#nxs-${kinds[0]}`} onClick={() => setOpen(false)}>לתחילת השיעור</a>
                </span>
              </p>
            ) : null}

            {started && firstOpen ? (
              <a className="nu-link nxs-next-open" href={`#nxs-${firstOpen.kind}`} onClick={() => setOpen(false)}>
                היחידה הבאה שטרם נצפתה: {titleOf(firstOpen)}
              </a>
            ) : null}

            {total > 0 ? (
              <nav className="nxs-toc" aria-label="תוכן השיעור">
                <p className="nxs-toc-h">תוכן השיעור · {nf.format(total)} יחידות</p>
                <ol ref={listRef}>
                  {blocks.map((b) => {
                    const seen = doneSet.has(b.kind);
                    return (
                      <li
                        key={b.kind}
                        data-k={b.kind}
                        data-read={seen ? "1" : undefined}
                        data-fresh={fresh.has(b.kind) ? "1" : undefined}
                      >
                        <a
                          href={`#nxs-${b.kind}`}
                          aria-current={active === b.kind ? "location" : undefined}
                          onClick={() => setOpen(false)}
                        >
                          <span className="nxs-mark" aria-hidden="true"><Check size={10} strokeWidth={3.25} /></span>
                          <span className="nxs-toc-t">{titleOf(b)}</span>
                          <span className="nx-sr">{seen ? ", נצפה" : ", טרם נצפה"}</span>
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </nav>
            ) : null}

            {/* Where this lesson sits in its stage: one segment per step, the
                current one ringed, the finished ones filled. Position, not a
                percentage, so it is drawn on a first visit too. */}
            <div className="nxa-lstage">
              <p className="nxa-lstage-t">
                <b>שלב {nf.format(place.chapterIndex)} מתוך {nf.format(place.chapterCount)}</b>
                {" "}· {place.chapterTitle} · שיעור {nf.format(place.posInChapter)} מתוך {nf.format(place.chapterSize)} בשלב
              </p>
              <div
                className="nxa-meter-bar"
                role="progressbar"
                aria-label="השיעורים בשלב"
                aria-valuemin={0}
                aria-valuemax={steps.length}
                aria-valuenow={stageDone}
                aria-valuetext={`${nf.format(stageDone)} מתוך ${nf.format(steps.length)} שיעורים בשלב הושלמו`}
              >
                {d.stage.lessons.map((l) => {
                  const here = l.slug === lesson.slug;
                  const ok = l.hasLesson && isDone(l.slug);
                  return (
                    <span key={l.slug} className="nxa-seg" data-state={here ? "current" : ok ? "done" : "todo"} title={l.title}>
                      <i style={{ "--f": ok ? 1 : 0 } as React.CSSProperties} />
                    </span>
                  );
                })}
              </div>
            </div>

            {!started ? (
              <p className="nx-muted nxs-note">
                יחידת תוכן נספרת כשהיא מוצגת במסך.
                {" "}ההתקדמות נשמרת במכשיר בלבד (<span className="nx-sap">neo:academy:v2</span>).
              </p>
            ) : null}
            {/* Exposure is not understanding (design audit §7): the count above is
                what was shown; understanding is checked elsewhere. */}
            <p className="nx-muted nxs-exposure">
              צפייה אינה הוכחת הבנה. הבנה נבדקת ב<Link href="/neo/certification/" prefetch={false}>תרגול ובדיקת ידע</Link>.
            </p>
          </div>
        </aside>

        {/* ------------------------------------------------------ THE LESSON */}
        <div className="nxs-main">
          {total === 0 ? (
            <p className="nx-muted nxs-none">
              לשיעור זה אין יחידות תוכן במאגר השיעורים.
            </p>
          ) : (
            <>
              <div className="nxs-flow-doc">
                {blocks.map((b) => (
                  <Section key={b.kind} b={b} done={doneSet.has(b.kind)} fresh={fresh.has(b.kind)} onRead={() => read(b.kind)} />
                ))}
              </div>

              {/* THE END OF THE UNITS: what is left, and once nothing is, the
                  lesson's close and the one way on. */}
              <section
                className="nxs-done"
                data-state={complete ? "done" : "open"}
                data-fresh={justFinished ? "1" : undefined}
                aria-labelledby="nxs-done-h"
              >
                {complete ? (
                  <>
                    <span className="nxs-done-mark" aria-hidden="true">
                      <svg viewBox="0 0 24 24" focusable="false"><path d="M5.5 12.5l4.2 4.2L18.5 8" pathLength={1} /></svg>
                    </span>
                    <div className="nxs-done-t">
                      <h2 className="nxs-done-h" id="nxs-done-h">השיעור הושלם</h2>
                      <p>
                        כל {nf.format(total)} יחידות התוכן בשיעור נצפו במכשיר הזה.
                        {" "}הבנה נבדקת ב<Link href="/neo/certification/" prefetch={false}>תרגול ובדיקת ידע</Link>.
                      </p>
                    </div>
                    <div className="nxs-done-act">
                      {next ? (
                        <OriginLink className="nu-btn" style={RED} href={next.href} origin={origin}>
                          {next.newChapter ? "לשלב הבא" : "לשיעור הבא"}: {next.title}
                          <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
                        </OriginLink>
                      ) : (
                        <Link className="nu-btn" style={RED} href={course.href} prefetch={false}>
                          חזרה לקורס · {course.title}
                          <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <span className="nxs-done-mark" aria-hidden="true">{nf.format(left)}</span>
                    <div className="nxs-done-t">
                      <h2 className="nxs-done-h" id="nxs-done-h">
                        {left === 0
                          ? "כל יחידות התוכן בשיעור נצפו"
                          : started
                            ? `נותרו ${nf.format(left)} יחידות תוכן שטרם נצפו`
                            : `${nf.format(total)} יחידות תוכן בשיעור`}
                      </h2>
                      <p>שיעור נחשב מושלם כשכל יחידות התוכן שהוא דורש נצפו. יחידה מסומנת כנצפתה ברגע שהיא מוצגת במסך.</p>
                    </div>
                    {firstOpen ? (
                      <div className="nxs-done-act">
                        <a className="nu-btn2" href={`#nxs-${firstOpen.kind}`}>
                          ליחידה שטרם נצפתה: {titleOf(firstOpen)}
                        </a>
                      </div>
                    ) : null}
                  </>
                )}
              </section>
            </>
          )}

          {d.source ? <section className="nxv-sec nxa-lesson-source" aria-labelledby="nxa-lesson-source-h">
            <h2 className="nx-h2" id="nxa-lesson-source-h">הרחבה מחומר המקור · {d.source.title}</h2>
            {d.source.intro ? <p className="nxs-p" dir="auto">{d.source.intro}</p> : null}
            {d.source.flows.map((f) => <details key={f.id} open><summary>{f.title} · התהליך המלא</summary><SourceFlow steps={f.steps} /></details>)}
            <Link className="nu-link" href={d.source.href} prefetch={false}>לנושא המלא ולכל פרטי המקור</Link>
          </section> : null}

          {/* ----------------------------------------------- THE END OF A STAGE */}
          {endsStage ? (
            <section className="nxa-stage-end" aria-label="סוף השלב">
              {stageComplete ? (
                <p className="nxa-stage-end-h">
                  <span className="nxa-st" data-state="done"><CircleCheck size={15} strokeWidth={2} aria-hidden="true" />השלב הושלם</span>
                  <span>שלב {nf.format(place.chapterIndex)} · {place.chapterTitle}</span>
                </p>
              ) : (
                <p className="nxa-stage-end-h">
                  <span className="nxa-st" data-state="current"><Info size={15} strokeWidth={2} aria-hidden="true" />נותרו {nf.format(steps.length - stageDone)} שיעורים בשלב</span>
                  <span>שלב {nf.format(place.chapterIndex)} · {place.chapterTitle}</span>
                </p>
              )}
              {!stageComplete && openStep ? (
                <OriginLink className="nu-link" href={openStep.href} origin={origin}>
                  לשיעור בשלב שעוד לא הושלם: {openStep.title}
                  <ArrowLeft size={13} strokeWidth={2} className="nu-arw" aria-hidden="true" />
                </OriginLink>
              ) : null}
              {pathJourney ? <StageMeter j={pathJourney} label={`ההתקדמות במסלול ${course.title}`} compact /> : null}
              {/* The way into the next stage, worded as the course map words it:
                  its number and name, its size, and the lesson it starts with. */}
              {after ? (
                <p className="nxa-stage-end-next">
                  <span className="nxa-next-k">השלב הבא</span>
                  <b className="nxa-next-t">שלב {nf.format(after.index)} · {after.title}</b>
                  <span className="nxa-stage-end-m">
                    {nf.format(after.lessons)} שיעורים{after.minutes ? <> · {hoursHe(after.minutes)}</> : null}
                  </span>
                  {after.first ? (
                    <OriginLink className="nu-link" href={after.first.href} origin={origin}>
                      מתחיל ב: {after.first.title}
                      <ArrowLeft size={13} strokeWidth={2} className="nu-arw" aria-hidden="true" />
                    </OriginLink>
                  ) : null}
                </p>
              ) : (
                <p className="nxa-stage-end-next">
                  <span className="nxa-next-k">סוף המסלול</span>
                  <span className="nxa-next-t">
                    זהו השלב האחרון במסלול. הבנה נבדקת ב<Link href="/neo/certification/" prefetch={false}>תרגול ובדיקת ידע</Link>.
                  </span>
                </p>
              )}
            </section>
          ) : null}
        </div>
      </div>

      {/* The lesson finishing during this visit, said once to a screen reader. */}
      <p className="nx-sr" role="status">{justFinished ? "השיעור הושלם: כל יחידות התוכן בשיעור נצפו." : ""}</p>

      {/* --------------------------------------------------------- STEPPING */}
      <nav className="nxs-steps" aria-label="מעבר בין שיעורים">
        {prev ? <Step l={prev} dir="prev" origin={origin} /> : <span className="nxs-step is-none">זהו השיעור הראשון בקורס.</span>}
        <Link className="nu-btn2 nxs-up" href={course.href} prefetch={false}>
          <GraduationCap size={15} strokeWidth={1.75} aria-hidden="true" />
          חזרה לקורס · שיעור {nf.format(place.globalIndex)} מתוך {nf.format(place.globalTotal)}
        </Link>
        {next ? <Step l={next} dir="next" origin={origin} /> : <span className="nxs-step is-none">זהו השיעור האחרון בקורס.</span>}
      </nav>

      <CatalogFoot>
        <ShieldCheck size={13} strokeWidth={1.75} aria-hidden="true" className="nxa-foot-i" />
        מקור: מאגר השיעורים של SAP Academy (<span className="nx-sap">data/academy/lessons</span>).
        {" "}התוכן מוצג כפי שנכתב.
      </CatalogFoot>
    </div>
  );
}
