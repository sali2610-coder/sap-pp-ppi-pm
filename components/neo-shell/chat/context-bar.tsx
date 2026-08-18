"use client";

/* ============================================================================
   PROJECT NEO · CHAT — the answer's context, stated out loud.
   ----------------------------------------------------------------------------
   THE PROBLEM THIS SOLVES. The scope sheet existed and the composer carried a
   one-line label, but neither is in the conversation: a reader scrolling an
   answer had no standing statement of WHICH BOOK, WHICH CHAPTER and WHICH
   SUBCHAPTER it was drawn from. Scope decides what retrieval may read, so it is
   not a setting — it is a premise of every answer on screen, and it belongs
   where the answers are.

   WHAT IS ON IT, AND WHERE EACH VALUE COMES FROM
     the ladder   ספר → פרק → סעיף, each with its authored title, resolved by
                  ./scope-context from data/ai-tree — the same records the scope
                  sheet lists and the backend retrieves from. A title that has
                  not loaded yet is shown as its id, never as a guessed name.
     the breadth  lib/ai/tree.scopeBreadth — the project's own existing measure
                  of how much of the corpus is readable. Not recomputed here.
     the change   opens the same sheet the composer opens. One control, one
                  destination, two places it can be reached from.

   THE CONSULTANT SURFACE IS NOT GIVEN A FAKE LADDER. It does not retrieve from
   the books at all, so it states that in one line instead of rendering an empty
   breadcrumb that implies a book could be chosen.
   ========================================================================== */

import { BookOpen, ChevronLeft, Layers, Sparkles } from "lucide-react";
import { scopeBreadth } from "@/lib/ai/tree";
import type { AiMode } from "@/lib/ai/modes";
import type { Scope } from "@/lib/ai/types";
import { useScopeContext } from "./scope-context";

export function ContextBar({ scope, mode, onOpenScope }: {
  scope: Scope;
  mode: AiMode;
  /** Undefined on the consultant surface, which reads from no book. */
  onOpenScope?: () => void;
}) {
  const ctx = useScopeContext(scope);

  // The consultant endpoint takes no scope. Saying so is the honest form of
  // this bar; drawing a book ladder there would imply a control that does not
  // exist and a grounding that never happens.
  if (mode === "consult") {
    return (
      <div className="nxq-ctx" data-kind="consult">
        <span className="nxq-ctx-i" aria-hidden="true">
          <Sparkles size={14} strokeWidth={2} />
        </span>
        <p className="nxq-ctx-line">
          <b>ידע כללי על SAP</b>
          <span>המשטח הזה אינו קורא מהספרים ואינו מצטט מהם.</span>
        </p>
      </div>
    );
  }

  const breadth = scopeBreadth(scope);

  return (
    <div className="nxq-ctx" data-kind={ctx.whole ? "wide" : "scoped"}>
      <span className="nxq-ctx-i" aria-hidden="true">
        {ctx.whole ? <Layers size={14} strokeWidth={2} /> : <BookOpen size={14} strokeWidth={2} />}
      </span>

      <div className="nxq-ctx-main">
        <span className="nxq-ctx-l">התשובה תיענה מתוך</span>

        {ctx.whole ? (
          <p className="nxq-ctx-line">
            <b>כל הספרייה</b>
            <span>לא נבחרו ספר, פרק או סעיף.</span>
          </p>
        ) : (
          <ol className="nxq-ctx-lad" aria-label="ההיקף הנוכחי">
            {ctx.levels.map((lv, i) => (
              <li key={`${lv.kind}-${lv.id}`} className="nxq-ctx-lv">
                {i > 0 ? (
                  <ChevronLeft size={13} strokeWidth={2.2} aria-hidden="true" className="nxq-ctx-sep" />
                ) : null}
                <span className="nxq-ctx-k">{lv.kind}</span>
                {/* The title when it is known, the address when it is not. The
                    address is real either way, so nothing here is a placeholder
                    standing in for content that does not exist.

                    dir="auto" is load-bearing, not decoration. The books are
                    English, the shell is RTL, and an LTR string in an RTL box
                    is reordered so its FIRST character sits at the visual left
                    — which is where an RTL `text-overflow: ellipsis` clips.
                    "Configuring Plant Maintenance in SAP S/4HANA" truncated to
                    "…nt Maintenance in SAP S/4HANA": the part naming the book
                    was the part thrown away. dir="auto" gives the element the
                    direction of its own content (and, per the HTML UA sheet,
                    `unicode-bidi: isolate`), so the clip lands at the string's
                    real end in either script. */}
                <b className="nxq-ctx-v" dir="auto" title={lv.title ?? undefined}>
                  {lv.title ?? <span className="nxq-sap">{lv.id}</span>}
                </b>
                {lv.title && lv.kind !== "ספר" ? (
                  <span className="nxq-ctx-id nxq-sap">{lv.id}</span>
                ) : null}
              </li>
            ))}
          </ol>
        )}
      </div>

      <span className="nxq-ctx-b" data-w={breadth.pct >= 100 ? "wide" : breadth.pct >= 60 ? "mid" : "tight"}>
        {breadth.label}
      </span>

      {onOpenScope ? (
        <button type="button" className="nu-btn2 nxq-ctx-x" onClick={onOpenScope}>
          {ctx.whole ? "בחר ספר או פרק" : "שנה היקף"}
        </button>
      ) : null}
    </div>
  );
}

/**
 * The scope a single turn was asked in, shown on that turn.
 *
 * Scope can change mid-conversation, and when it does the earlier answers were
 * still drawn from the earlier scope. Re-reading the thread under the CURRENT
 * bar would attribute every answer to the latest selection, which is exactly
 * the misunderstanding this whole surface exists to prevent. So each turn
 * carries the scope it was actually sent with (see ./store.Turn) and says so
 * whenever that differs from the scope now in force.
 */
export function TurnScope({ scope, current }: { scope?: Scope; current: Scope }) {
  const ctx = useScopeContext(scope ?? {});

  // Nothing to disambiguate while the conversation has not moved.
  const same =
    (scope?.bookId ?? "") === (current.bookId ?? "") &&
    (scope?.chapter ?? null) === (current.chapter ?? null) &&
    (scope?.section ?? "") === (current.section ?? "");
  if (!scope || same) return null;

  const words = ctx.whole
    ? "כל הספרייה"
    : ctx.levels.map((lv) => lv.title ?? lv.id).join(" · ");

  return (
    <p className="nxq-turn-scope">
      <Layers size={12} strokeWidth={2} aria-hidden="true" />
      נשאל בהיקף: <b>{words}</b>
    </p>
  );
}
