/* ============================================================================
   PROJECT NEO · THE ACADEMY JOURNEY — the pieces every academy screen shares.
   ----------------------------------------------------------------------------
     StageBadge     a stage's state as a glyph followed by its word, never a
                    colour alone (journey-state.ts decides the state)
     StageMeter     one segment per stage, each filled by its own done lessons,
                    with the sentence that says the same thing in words; drawn
                    only where the caller knows the path has started, because a
                    first visit gets no 0% bar (the store's own rule)
     AcademySwitch  the one tab's two views: the learning path and the source
                    folder, side by side under the hero
   Presentational only: no hooks, no store access.
   ========================================================================== */

import Link from "next/link";
import { Circle, CircleCheck, CircleDashed, CircleDot, CircleDotDashed, FolderOpen, Route } from "lucide-react";
import type { Journey, StageState } from "./journey-state";

const nf = new Intl.NumberFormat("he-IL");

/** Minutes as the paths declare them, never rounded up into a nicer number. */
export function hoursHe(min: number): string {
  if (min < 60) return `${nf.format(min)} דק׳`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${nf.format(h)} שע׳ ${nf.format(m)} דק׳` : `${nf.format(h)} שע׳`;
}

const WORD: Record<StageState, string> = {
  done: "הושלם",
  current: "השלב הנוכחי",
  partial: "בתהליך",
  next: "השלב הבא",
  todo: "טרם התחלת",
  empty: "טרם נכתב",
};
const GLYPH = { done: CircleCheck, current: CircleDot, partial: CircleDotDashed, next: Circle, todo: CircleDashed, empty: CircleDashed };

/** On a path not yet started the first stage is where it begins, not "current". */
export const stageWord = (state: StageState, started: boolean) =>
  !started && state === "current" ? "נקודת ההתחלה" : WORD[state];

export function StageBadge({ state, started }: { state: StageState; started: boolean }) {
  const G = GLYPH[state];
  return (
    <span className="nxa-st" data-state={!started && state === "current" ? "start" : state}>
      <G size={14} strokeWidth={2} aria-hidden="true" />
      {stageWord(state, started)}
    </span>
  );
}

/** "שלב 3 מתוך 7 · 12 מתוך 40 שיעורים", or the path's completion. */
export function journeyLine(j: Journey): string {
  // A path with no written lesson says so, never "שלב 0 מתוך N".
  if (!j.totalLessons) return "טרם נכתבו שיעורים במסלול";
  if (j.complete) return `כל ${nf.format(j.stages.length)} השלבים הושלמו · ${nf.format(j.totalLessons)} שיעורים`;
  return `שלב ${nf.format(j.current)} מתוך ${nf.format(j.stages.length)} · ${nf.format(j.doneLessons)} מתוך ${nf.format(j.totalLessons)} שיעורים`;
}

export function StageMeter({ j, label, compact }: { j: Journey; label: string; compact?: boolean }) {
  const line = journeyLine(j);
  return (
    <div className="nxa-meter" data-compact={compact ? "1" : undefined}>
      <div
        className="nxa-meter-bar"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={j.totalLessons}
        aria-valuenow={j.doneLessons}
        aria-valuetext={line}
      >
        {j.stages.map((s) => (
          <span key={s.index} className="nxa-seg" data-state={s.state} title={`שלב ${s.index} · ${s.title}`}>
            <i style={{ "--f": s.total ? s.done / s.total : 0 } as React.CSSProperties} />
          </span>
        ))}
      </div>
      {compact ? null : <p className="nxa-meter-t">{line}</p>}
    </div>
  );
}

/** The one academy tab's two views. Real links: each view is its own page, so
 *  it can be bookmarked, and the rail lights the same tab on both. */
export function AcademySwitch({ at }: { at: "paths" | "materials" }) {
  return (
    <nav className="nxa-switch" aria-label="תצוגות האקדמיה">
      <Link href="/neo/academy/" prefetch={false} aria-current={at === "paths" ? "page" : undefined}>
        <Route size={16} strokeWidth={1.9} aria-hidden="true" />
        <span><b>מסלול הלמידה</b><small>מסלולים, שלבים ושיעורים</small></span>
      </Link>
      <Link href="/neo/academy/materials/" prefetch={false} aria-current={at === "materials" ? "page" : undefined}>
        <FolderOpen size={16} strokeWidth={1.9} aria-hidden="true" />
        <span><b>תיקיית החומרים</b><small>כל פרקי המקור והנושאים</small></span>
      </Link>
    </nav>
  );
}
