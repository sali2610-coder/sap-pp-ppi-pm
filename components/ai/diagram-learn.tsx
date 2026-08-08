"use client";

/**
 * Learning Mode: a diagram walked as a lesson.
 *
 * Deliberately gated on a click per step. Presentation mode can autoplay because
 * a presenter is talking over it; a lesson cannot, because the point is that the
 * learner sets the pace and commits to each step before seeing the next.
 *
 * Every sentence shown comes from lib/ai/learning.ts, which restates the
 * diagram's own structure. Nothing here narrates what a step MEANS in SAP —
 * there is no per-step source for that, and inventing it would teach something
 * untrue. Concepts link out to the pages that do hold the detail.
 */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, BookOpen, Check, CheckCircle2, GraduationCap, RotateCcw, X,
} from "lucide-react";
import type { Diagram } from "@/lib/ai/diagram";
import { presentationOrder } from "@/lib/ai/present-order";
import { buildLesson, lessonId, loadCompleted, markCompleted, KIND_HE } from "@/lib/ai/learning";
import { knownRoutes } from "@/lib/ai-known-routes";

type Phase = "steps" | "summary" | "quiz" | "done";

export function LearningMode({ diagram, canvas, onClose }: {
  diagram: Diagram;
  canvas: (opts: { focusId: string | null; revealed: Set<string> }) => React.ReactNode;
  onClose: () => void;
}) {
  const lesson = useMemo(
    () => buildLesson(diagram, presentationOrder(diagram).map((s) => s.node)),
    [diagram],
  );
  const id = useMemo(() => lessonId(diagram), [diagram]);
  const routes = useMemo(() => knownRoutes(), []);

  const [i, setI] = useState(0);
  const [phase, setPhase] = useState<Phase>("steps");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [wasDone, setWasDone] = useState(false);

  useEffect(() => { setWasDone(loadCompleted().includes(id)); }, [id]);

  const step = lesson.steps[i];
  // Only steps the learner has actually reached are drawn. The reveal IS the
  // lesson; showing the whole diagram up front gives the answer away.
  const revealed = useMemo(
    () => new Set(lesson.steps.slice(0, i + 1).map((s) => s.node.id)),
    [lesson.steps, i],
  );

  const answered = lesson.quiz.filter((q) => answers[q.id] != null).length;
  const correct = lesson.quiz.filter((q) => answers[q.id] === q.answer).length;

  const finish = () => {
    markCompleted(id);
    setWasDone(true);
    setPhase("done");
  };

  /** Highlights identifiers inside the step text and links the known ones. */
  const withConcepts = (text: string, concepts: string[]) => {
    if (!concepts.length) return text;
    const parts = text.split(new RegExp(`(${concepts.map((c) => c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g"));
    return parts.map((p, k) => {
      if (!concepts.includes(p)) return <span key={k}>{p}</span>;
      const href = routes.href.get(p.toUpperCase());
      const chip = <span className="tech rounded-md bg-brand/10 px-1 py-0.5 text-[0.95em] font-semibold text-brand">{p}</span>;
      return href
        ? <Link key={k} href={href} className="no-underline">{chip}</Link>
        : <span key={k}>{chip}</span>;
    });
  };

  const pct = phase === "steps"
    ? ((i + 1) / (lesson.steps.length + 2)) * 100
    : phase === "summary" ? ((lesson.steps.length + 1) / (lesson.steps.length + 2)) * 100
    : 100;

  return (
    <div role="dialog" aria-modal="true" aria-label="מצב לימוד"
      className="fixed inset-0 z-[90] flex flex-col bg-surface">
      {/* ------------------------------------------------------------ chrome */}
      <header className="flex items-center gap-2 border-b border-hairline px-4 py-2.5">
        <GraduationCap className="size-4 text-brand" aria-hidden />
        <span className="text-[0.8125rem] font-bold text-ink-1">מצב לימוד</span>
        {wasDone && (
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[0.6875rem] font-semibold text-emerald-700">
            <CheckCircle2 className="size-3" /> הושלם בעבר
          </span>
        )}
        <span className="tech ms-auto text-[0.6875rem] text-ink-3">
          {phase === "steps" ? `שלב ${i + 1} מתוך ${lesson.steps.length}` : phase === "quiz" ? `שאלה ${answered}/${lesson.quiz.length}` : ""}
        </span>
        <button onClick={onClose} aria-label="סגור"
          className="rounded-lg p-1.5 text-ink-3 transition hover:bg-surface-2 hover:text-ink-1"><X className="size-4" /></button>
      </header>

      <div className="h-[3px] w-full bg-surface-2" role="progressbar"
        aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full bg-brand transition-[width] duration-300" style={{ width: `${pct}%` }} />
      </div>

      {/* ------------------------------------------------------------- body */}
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center overflow-auto p-4">
          {canvas({ focusId: phase === "steps" ? step?.node.id ?? null : null, revealed })}
        </div>

        <aside className="min-h-0 w-full shrink-0 overflow-y-auto border-t border-hairline p-5 lg:w-[24rem] lg:border-s lg:border-t-0"
          aria-live="polite">
          {phase === "steps" && step && (
            <>
              <div className="mb-1 text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-ink-3">
                {KIND_HE[step.kind]}
              </div>
              <h2 className="mb-3 text-[1.0625rem] font-extrabold leading-snug text-ink-1">{step.node.label}</h2>
              <p className="mb-5 text-[0.9375rem] leading-[1.85] text-ink-2">
                {withConcepts(step.explain, step.concepts)}
              </p>

              <div className="flex items-center gap-2">
                <button onClick={() => setI((n) => Math.max(0, n - 1))} disabled={i === 0}
                  className="rounded-xl border border-hairline px-3 py-2 text-[0.8125rem] font-semibold text-ink-2 transition hover:text-brand disabled:opacity-40">
                  הקודם
                </button>
                <button
                  onClick={() => (i < lesson.steps.length - 1 ? setI(i + 1) : setPhase("summary"))}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-[0.8125rem] font-bold text-white transition hover:bg-brand-dark"
                >
                  {i < lesson.steps.length - 1 ? "המשך" : "לסיכום"}
                  <ArrowLeft className="size-3.5" />
                </button>
              </div>
            </>
          )}

          {phase === "summary" && (
            <>
              <h2 className="mb-3 text-[1.0625rem] font-extrabold text-ink-1">סיכום</h2>
              <p className="mb-4 text-[0.9375rem] leading-[1.85] text-ink-2">{lesson.summary}</p>
              <ol className="mb-5 space-y-1.5">
                {lesson.steps.map((s, k) => (
                  <li key={s.node.id} className="flex gap-2 text-[0.8125rem] text-ink-2">
                    <span className="tech shrink-0 text-ink-3">{k + 1}.</span>
                    <span>{s.node.label}</span>
                  </li>
                ))}
              </ol>
              {lesson.quiz.length > 0 ? (
                <button onClick={() => setPhase("quiz")}
                  className="w-full rounded-xl bg-brand px-4 py-2 text-[0.8125rem] font-bold text-white transition hover:bg-brand-dark">
                  לשאלון קצר ({lesson.quiz.length} שאלות)
                </button>
              ) : (
                <button onClick={finish}
                  className="w-full rounded-xl bg-brand px-4 py-2 text-[0.8125rem] font-bold text-white transition hover:bg-brand-dark">
                  סיים
                </button>
              )}
            </>
          )}

          {phase === "quiz" && (
            <>
              <h2 className="mb-3 text-[1.0625rem] font-extrabold text-ink-1">שאלון</h2>
              <div className="space-y-5">
                {lesson.quiz.map((q) => {
                  const given = answers[q.id];
                  const done = given != null;
                  return (
                    <div key={q.id}>
                      <p className="mb-2 text-[0.875rem] font-semibold leading-relaxed text-ink-1">{q.prompt}</p>
                      <div className="space-y-1.5">
                        {q.choices.map((c, k) => {
                          const isAnswer = k === q.answer;
                          const chosen = given === k;
                          const cls = !done ? "border-hairline text-ink-2 hover:border-brand/40"
                            : isAnswer ? "border-emerald-500/50 bg-emerald-500/5 text-emerald-800"
                            : chosen ? "border-rose-500/50 bg-rose-500/5 text-rose-800"
                            : "border-hairline text-ink-3";
                          return (
                            <button key={k} disabled={done}
                              onClick={() => setAnswers((a) => ({ ...a, [q.id]: k }))}
                              className={`flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-start text-[0.8125rem] transition ${cls}`}
                            >
                              {done && isAnswer && <Check className="size-3.5 shrink-0" />}
                              <span>{c}</span>
                            </button>
                          );
                        })}
                      </div>
                      {done && (
                        // Always explain, including when they were right — the
                        // reason is the lesson, the score is not.
                        <p className="mt-1.5 text-[0.75rem] leading-relaxed text-ink-3">{q.because}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              {answered === lesson.quiz.length && (
                <button onClick={finish}
                  className="mt-5 w-full rounded-xl bg-brand px-4 py-2 text-[0.8125rem] font-bold text-white transition hover:bg-brand-dark">
                  סיים — {correct}/{lesson.quiz.length} נכונות
                </button>
              )}
            </>
          )}

          {phase === "done" && (
            <div className="py-6 text-center">
              <CheckCircle2 className="mx-auto mb-3 size-10 text-emerald-600" aria-hidden />
              <h2 className="mb-1 text-[1.0625rem] font-extrabold text-ink-1">השיעור הושלם</h2>
              {lesson.quiz.length > 0 && (
                <p className="mb-4 text-[0.875rem] text-ink-2">{correct} מתוך {lesson.quiz.length} תשובות נכונות</p>
              )}
              <div className="flex items-center justify-center gap-2">
                <button onClick={() => { setI(0); setAnswers({}); setPhase("steps"); }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-hairline px-3 py-2 text-[0.8125rem] font-semibold text-ink-2 transition hover:text-brand">
                  <RotateCcw className="size-3.5" /> שוב
                </button>
                <button onClick={onClose}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-[0.8125rem] font-bold text-white transition hover:bg-brand-dark">
                  <BookOpen className="size-3.5" /> חזרה לתשובה
                </button>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
