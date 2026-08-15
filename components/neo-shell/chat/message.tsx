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
   frame is a field the engine returned.
   ========================================================================== */

import { useMemo } from "react";
import { AlertTriangle, CircleSlash, RotateCcw, Sparkles } from "lucide-react";
import { AnswerBody } from "@/components/ai/answer-body";
import { ANSWER_ACTIONS, type AnswerAction } from "@/lib/ai/prompts";
import type { AiMode } from "@/lib/ai/modes";
import type { Answer } from "@/lib/ai/types";
import { secs } from "./engine";
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
  passages?: number | null;
  mode: AiMode;
  busy: boolean;
  isLast: boolean;
  onRetry: () => void;
  onAsk: (question: string, task?: string) => void;
  onOpenSource: (a: Answer) => void;
}

export function Message({
  q, a, stopped, firstTokenMs, passages, mode, busy, isLast, onRetry, onAsk, onOpenSource,
}: MessageProps) {
  // AnswerBody numbers the inline chips by this array's order; the source cards
  // below use the same array, so the numbers agree by construction.
  const citations = useMemo(() => a?.citations ?? [], [a]);
  const citeProps = useMemo(
    () => citations.map((c) => ({ id: c.id, href: c.href, title: c.title })),
    [citations],
  );

  return (
    <article className="nxq-turn">
      <div className="nxq-user">
        <p className="nxq-user-bubble">{q}</p>
      </div>

      {stopped ? (
        <div className="nxq-assistant">
          <div className="nxq-note nxq-note-plain" role="status">
            <CircleSlash size={15} strokeWidth={2} aria-hidden="true" />
            <span>עצרת את התשובה. לא התקבלה תשובה מלאה ולא נשמר טקסט חלקי.</span>
          </div>
          <div className="nxq-acts">
            <button type="button" className="nu-btn2" onClick={onRetry} disabled={busy}>
              <RotateCcw size={14} strokeWidth={2} aria-hidden="true" />
              שאל שוב
            </button>
          </div>
        </div>
      ) : null}

      {a?.error ? (
        <div className="nxq-assistant">
          <div className="nxq-note nxq-note-bad" role="alert">
            <AlertTriangle size={15} strokeWidth={2} aria-hidden="true" />
            <span>{a.error}</span>
          </div>
          <div className="nxq-acts">
            <button type="button" className="nu-btn2" onClick={onRetry} disabled={busy}>
              <RotateCcw size={14} strokeWidth={2} aria-hidden="true" />
              נסה שוב
            </button>
          </div>
        </div>
      ) : null}

      {a && !a.error ? (
        <div className="nxq-assistant">
          <div className="nxq-answer">
            <Grounding a={a} mode={mode} />

            {a.policy === "REFUSE" && !a.text ? (
              <p className="nxq-empty">
                המנוע לא החזיר תשובה עבור השאלה הזו. אפשר לנסח מחדש או להרחיב את ההיקף.
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

            {/* The engine reports this itself: the question asked for a picture
                and the answer came back without one. Saying so is the whole
                point of the flag. */}
            {a.diagram?.explicit && !a.diagram.drawn ? (
              <div className="nxq-note nxq-note-warn">
                <AlertTriangle size={15} strokeWidth={2} aria-hidden="true" />
                <span>ביקשת תרשים, והתשובה חזרה בלי תרשים שניתן לצייר.</span>
              </div>
            ) : null}

            <Sources citations={citations} />
          </div>

          <Meta a={a} firstTokenMs={firstTokenMs} passages={passages} />

          {isLast && !busy ? (
            <>
              <div className="nxq-acts" role="group" aria-label="פעולות המשך">
                {ACTIONS.map((act) => {
                  // The one navigating action only exists when there is a real
                  // destination for it — no button that opens nothing.
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
        </div>
      ) : null}
    </article>
  );
}

/**
 * How well the answer is tied to the books.
 *
 * `policy` is the engine's own verdict, not a score computed here. On the
 * consultant surface an answer with no citations is general SAP knowledge and
 * says exactly that, because claiming a source it does not have is the failure
 * mode this whole product is built against.
 */
function Grounding({ a, mode }: { a: Answer; mode: AiMode }) {
  const n = a.citations.length;

  if (a.policy === "REFUSE") {
    return (
      <span className="nu-status nxq-ground" style={{ "--s": "var(--ink-3)" } as React.CSSProperties}>
        לא נמצאה תשובה במקורות
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
 * Timing.
 *
 * `a.ms` is the elapsed time the stream itself reported on its `done` event —
 * a real measurement of the request, not a UI animation. `firstTokenMs` is
 * wall clock measured here between send and the first `delta`. `passages` is
 * the count the `meta` event carried. Nothing is shown that was not measured
 * or received.
 */
function Meta({ a, firstTokenMs, passages }: {
  a: Answer; firstTokenMs?: number | null; passages?: number | null;
}) {
  const bits: string[] = [];
  if (typeof a.ms === "number" && a.ms > 0) bits.push(secs(a.ms));
  if (typeof firstTokenMs === "number" && firstTokenMs > 0) bits.push(`מילה ראשונה ${secs(firstTokenMs)}`);
  if (typeof passages === "number") bits.push(`${passages} קטעים נקראו`);
  if (!bits.length) return null;
  return <p className="nxq-meta">{bits.join(" · ")}</p>;
}
