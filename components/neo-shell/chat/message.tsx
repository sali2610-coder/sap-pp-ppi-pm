"use client";

/* ============================================================================
   PROJECT NEO · CHAT — one turn.
   ----------------------------------------------------------------------------
   The answer is rendered by components/ai/answer-body.tsx, unchanged and
   unforked. That component already owns the things an answer must not lose:
   bidi isolation for SAP identifiers, the 74ch measure, tables, callouts,
   flowchart/ERD/timeline fences, and the numbered inline citation chips that
   resolve against the same citation array the source cards below are built
   from. Reimplementing it here would have produced a second, drifting reader.

   Everything this file adds is a frame around it — and every value in that
   frame is a field the engine returned or a duration this browser measured.

   ONE TURN COMPONENT, TWO SURFACES. The speaker's mark, the name above the
   answer and the grounding wording change with `mode`; the machinery does not.
   That is the right seam: a bug in retry or in citation numbering must not be
   fixable on one screen and still present on the other.
   ========================================================================== */

import { useMemo } from "react";
import { AlertTriangle, CircleSlash, RotateCcw, Sparkles, Timer } from "lucide-react";
import { AnswerBody } from "@/components/ai/answer-body";
import { ANSWER_ACTIONS, type AnswerAction } from "@/lib/ai/prompts";
import type { AiMode } from "@/lib/ai/modes";
import type { Answer, Scope } from "@/lib/ai/types";
import { TurnScope } from "./context-bar";
import { secs } from "./engine";
import { LibrarianMark, NeoMark } from "./marks";
import { Sources } from "./sources";

/**
 * The follow-up actions offered under an answer.
 *
 * Not new prompts: these are entries of lib/ai/prompts.ANSWER_ACTIONS, which
 * carry the backend task profile that actually selects the model and quality
 * floor. Pressing one issues a real request through the same engine; "פתח מקור"
 * is the single navigating action and opens a real citation href.
 */
const ACTION_IDS = ["expand", "example", "ecc", "summary", "diagram", "source"] as const;

const ACTIONS: AnswerAction[] = ACTION_IDS
  .map((id) => ANSWER_ACTIONS.find((a) => a.id === id))
  .filter((a): a is AnswerAction => Boolean(a));

export interface MessageProps {
  q: string;
  a: Answer | null;
  stopped?: boolean;
  firstTokenMs?: number | null;
  /** Wall clock across the whole request, measured in this browser. */
  elapsedMs?: number | null;
  passages?: number | null;
  /** The scope this turn was sent with, from ./store.Turn. */
  askedIn?: Scope;
  /** The scope in force now, so the turn only speaks up when they differ. */
  scope: Scope;
  mode: AiMode;
  /** The name shown above the answer. Whose voice this is. */
  who: string;
  busy: boolean;
  isLast: boolean;
  onRetry: () => void;
  onAsk: (question: string, task?: string) => void;
  onOpenSource: (a: Answer) => void;
}

export function Message({
  q, a, stopped, firstTokenMs, elapsedMs, passages, askedIn, scope, mode, who,
  busy, isLast, onRetry, onAsk, onOpenSource,
}: MessageProps) {
  // AnswerBody numbers the inline chips by this array's order; the source cards
  // below use the same array, so the numbers agree by construction.
  const citations = useMemo(() => a?.citations ?? [], [a]);
  const citeProps = useMemo(
    () => citations.map((c) => ({ id: c.id, href: c.href, title: c.title })),
    [citations],
  );

  const failed = Boolean(a?.error);
  const markState = failed || stopped ? "error" : "idle";

  return (
    <article className="nxq-turn">
      <div className="nxq-user">
        <p className="nxq-user-bubble">{q}</p>
        {/* Silent unless the scope has moved on since this turn — see TurnScope. */}
        {mode === "library" ? <TurnScope scope={askedIn} current={scope} /> : null}
      </div>

      <div className="nxq-assistant">
        <div className="nxq-gutter">
          <Speaker mode={mode} state={markState} />
        </div>

        <div className="nxq-said">
          <p className="nxq-who">
            <span className="nxq-who-n">{who}</span>
            <Elapsed a={a} elapsedMs={elapsedMs} />
          </p>

          {stopped ? (
            <>
              <div className="nxq-note nxq-note-plain" role="status">
                <CircleSlash size={15} strokeWidth={2} aria-hidden="true" />
                <span>התשובה נעצרה. לא התקבלה תשובה ולא נשמר טקסט חלקי; שאר השיחה נשמרה. אפשר לשלוח את השאלה שוב.</span>
              </div>
              <div className="nxq-acts">
                <button type="button" className="nu-btn2" onClick={onRetry} disabled={busy}>
                  <RotateCcw size={14} strokeWidth={2} aria-hidden="true" />
                  שליחת השאלה שוב
                </button>
              </div>
            </>
          ) : null}

          {/* The engine's own Hebrew message, verbatim. No status code reaches
              the reader and no substitute answer is offered in its place. */}
          {a?.error ? (
            <>
              <div className="nxq-fail" role="alert">
                <span className="nxq-fail-i" aria-hidden="true">
                  <AlertTriangle size={16} strokeWidth={2} />
                </span>
                <div className="nxq-fail-body">
                  <b className="nxq-fail-t">התשובה לא התקבלה</b>
                  <span className="nxq-fail-m">{a.error}</span>
                  {typeof passages === "number" ? (
                    <span className="nxq-fail-s">
                      אחזור הקטעים הושלם ({passages} קטעים); הכשל אירע בשלב כתיבת התשובה. שאר השיחה לא נפגעה.
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="nxq-acts">
                <button type="button" className="nu-btn" onClick={onRetry} disabled={busy}>
                  <RotateCcw size={14} strokeWidth={2} aria-hidden="true" />
                  ניסיון חוזר
                </button>
              </div>
            </>
          ) : null}

          {a && !a.error ? (
            <>
              <div className="nxq-answer">
                <Grounding a={a} mode={mode} />

                {a.policy === "REFUSE" && !a.text ? (
                  <p className="nxq-empty">
                    לא נמצא מקור מאומת בספרייה לשאלה זו, ולכן לא נכתבה תשובה. שאר השיחה נשמרה. אפשר לנסח את השאלה מחדש או לשאול על נושא ממוקד יותר.
                  </p>
                ) : (
                  <AnswerBody text={a.text} citations={citeProps} />
                )}

                {a.truncated ? (
                  <div className="nxq-note nxq-note-warn">
                    <AlertTriangle size={15} strokeWidth={2} aria-hidden="true" />
                    <span>התשובה נקטעה בגלל מגבלת אורך של המנוע. אפשר לבקש המשך או לצמצם את השאלה.</span>
                  </div>
                ) : null}

                {/* The engine reports this itself: the question asked for a
                    picture and the answer came back without one. Saying so is
                    the whole point of the flag. */}
                {a.diagram?.explicit && !a.diagram.drawn ? (
                  <div className="nxq-note nxq-note-warn">
                    <AlertTriangle size={15} strokeWidth={2} aria-hidden="true" />
                    <span>התבקש תרשים, אך התשובה התקבלה ללא תרשים שניתן להציג. אפשר לבקש שוב בניסוח ממוקד יותר.</span>
                  </div>
                ) : null}

                <Sources citations={citations} />
              </div>

              <Meta firstTokenMs={firstTokenMs} passages={passages} />

              {isLast && !busy ? (
                <>
                  <div className="nxq-acts" role="group" aria-label="פעולות המשך">
                    {ACTIONS.map((act) => {
                      // The one navigating action only exists when there is a
                      // real destination for it. No button that opens nothing.
                      if (act.navigates && !citations.some((c) => c.href)) return null;
                      return (
                        <button
                          key={act.id}
                          type="button"
                          className="nu-ghost nxq-act"
                          onClick={() => (act.navigates ? onOpenSource(a) : onAsk(act.prompt, act.task))}
                        >
                          {act.label}
                        </button>
                      );
                    })}
                    <button type="button" className="nu-ghost nxq-act" onClick={onRetry}>
                      <RotateCcw size={13} strokeWidth={2} aria-hidden="true" />
                      שליחת השאלה שוב
                    </button>
                  </div>

                  {a.followUps.length ? (
                    <div className="nxq-follow">
                      <span className="nxq-follow-t">
                        <Sparkles size={13} strokeWidth={2} aria-hidden="true" />
                        שאלות המשך מוצעות
                      </span>
                      <div className="nxq-follow-row">
                        {a.followUps.map((f) => (
                          <button key={f} type="button" className="nu-btn2 nxq-follow-b" onClick={() => onAsk(f)}>
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/** The speaking side's mark. Two different glyphs, one per surface. */
function Speaker({ mode, state }: { mode: AiMode; state: "idle" | "error" }) {
  return mode === "library"
    ? <LibrarianMark size={30} state={state} className="nxq-avatar" />
    : <NeoMark size={30} state={state} className="nxq-avatar" />;
}

/**
 * The response timer.
 *
 * Wall clock measured in this browser from send to outcome, so it exists for a
 * failure and for a stop as well as for an answer. When the stream also
 * reported its own duration on the `done` event the two are within noise of
 * each other, and the measured one is shown because it is the wait the reader
 * actually experienced.
 */
function Elapsed({ a, elapsedMs }: { a: Answer | null; elapsedMs?: number | null }) {
  const ms = typeof elapsedMs === "number" && elapsedMs > 0
    ? elapsedMs
    : typeof a?.ms === "number" && a.ms > 0 ? a.ms : null;
  if (ms == null) return null;
  return (
    <span className="nxq-elapsed">
      <Timer size={12} strokeWidth={2} aria-hidden="true" />
      {secs(ms)}
    </span>
  );
}

/**
 * How well the answer is tied to the books.
 *
 * `policy` is the engine's own verdict, not a score computed here. On the
 * general surface an answer with no citations is general SAP knowledge and says
 * exactly that, because claiming a source it does not have is the failure mode
 * this whole product is built against.
 */
function Grounding({ a, mode }: { a: Answer; mode: AiMode }) {
  const n = a.citations.length;

  if (a.policy === "REFUSE") {
    return (
      <span className="nu-status nxq-ground" style={{ "--s": "var(--ink-3)" } as React.CSSProperties}>
        לא נמצא מקור מאומת
      </span>
    );
  }
  if (n > 0) {
    return (
      <span
        className="nu-status nxq-ground"
        style={{ "--s": a.policy === "PARTIAL" ? "var(--mod-ppds)" : "var(--brand)" } as React.CSSProperties}
      >
        {a.policy === "PARTIAL" ? "מבוסס חלקית על המקורות" : "מבוסס על המקורות"}
        {" · "}
        {n === 1 ? "מקור אחד" : `${n} מקורות`}
      </span>
    );
  }
  return (
    <span className="nu-status nxq-ground" style={{ "--s": "var(--ink-3)" } as React.CSSProperties}>
      {mode === "consult" ? "ידע כללי · ללא ציטוט ממקור" : "ללא ציטוט ממקור"}
    </span>
  );
}

/**
 * The rest of the measurements.
 *
 * `firstTokenMs` is wall clock measured between send and the first `delta`.
 * `passages` is the count the `meta` event carried. Nothing is shown that was
 * not measured here or received from the stream.
 */
function Meta({ firstTokenMs, passages }: {
  firstTokenMs?: number | null; passages?: number | null;
}) {
  const bits: string[] = [];
  if (typeof firstTokenMs === "number" && firstTokenMs > 0) bits.push(`תחילת התשובה ${secs(firstTokenMs)}`);
  if (typeof passages === "number") bits.push(`${passages} קטעים נקראו`);
  if (!bits.length) return null;
  return <p className="nxq-meta">{bits.join(" · ")}</p>;
}
