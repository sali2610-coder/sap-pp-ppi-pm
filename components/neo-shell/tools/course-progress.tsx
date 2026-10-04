"use client";

/* ============================================================================
   PROJECT NEO · the ALM and delivery courses — the reader's own progress.
   ----------------------------------------------------------------------------
   The course text is server-rendered by course-view.tsx. These leaves add the
   per-reader part only, through the legacy course's own store
   (components/learn/course-kit useCourseProgress, localStorage
   "neo:course:<key>"), so a topic marked complete on the pre-NEO page stays
   complete here. The server render is "nothing completed".
   ========================================================================== */

import { Check, Circle } from "lucide-react";
import { useCourseProgress } from "@/components/learn/course-kit";

/** "x/total · pct%" and a meter, over the topics the ladder lists. */
export function LadderProgress({ course, ids }: { course: string; ids: string[] }) {
  const { done } = useCourseProgress(course);
  const n = ids.filter((id) => done.includes(id)).length;
  const pct = ids.length ? Math.round((n / ids.length) * 100) : 0;
  return (
    <p className="ntl-prog" aria-live="polite">
      <span className="ntl-prog-t"><b dir="ltr">{n}/{ids.length}</b> · <b>{pct}%</b> הושלמו</span>
      <span className="ntl-meter" aria-hidden="true"><span style={{ "--w": `${pct}%` } as React.CSSProperties} /></span>
    </p>
  );
}

/** A level's own count: "done/total". */
export function LevelCount({ course, ids }: { course: string; ids: string[] }) {
  const { done } = useCourseProgress(course);
  return <span className="ntl-prog-t" dir="ltr">{ids.filter((id) => done.includes(id)).length}/{ids.length}</span>;
}

/** A ladder row's mark: done or not yet. */
export function TopicMark({ course, id }: { course: string; id: string }) {
  const { isDone } = useCourseProgress(course);
  return isDone(id)
    ? <Check size={14} strokeWidth={2.25} className="ntl-done-mark" aria-label="הושלם" />
    : <Circle size={13} strokeWidth={2} className="ntl-todo-mark" aria-hidden="true" />;
}

/** The topic's completion toggle. */
export function MarkComplete({ course, id }: { course: string; id: string }) {
  const { isDone, toggle } = useCourseProgress(course);
  const on = isDone(id);
  return (
    <button type="button" className="nu-btn2" aria-pressed={on} onClick={() => toggle(id)}>
      {on ? <><Check size={15} strokeWidth={2.25} aria-hidden="true" />הושלם — סומן במסלול</> : <><Circle size={14} strokeWidth={2} aria-hidden="true" />סמן כהושלם</>}
    </button>
  );
}
