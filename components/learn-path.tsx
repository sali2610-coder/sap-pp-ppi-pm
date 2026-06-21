"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, GraduationCap, MapPin, BookOpen, Workflow, RotateCcw, CheckCircle2 } from "lucide-react";
import { LEARN_PATHS } from "@/data/learn/paths";
import { IMPORTANCE_HE, IMPORTANCE_COLOR } from "@/lib/knowledge";
import { useDoneSet, markDone, resetPath, pathState } from "@/lib/learn-store";

export function LearnPathView({ module }: { module: string }) {
  const p = LEARN_PATHS[module];
  const done = useDoneSet(module);
  if (!p) return <p className="p-8 text-center text-slate-500">מסלול לא נמצא.</p>;
  const ids = p.steps.map((s) => s.id);
  const st = pathState(done, ids);
  const accent = p.accent;
  // Story Mode routes (Phase D). Only link to processes that actually exist.
  const STORY: Record<string, string> = { pm: "/story/pm-maintenance/", "pp-pi": "/story/pppi-process-order/" };
  const storyHref = STORY[module] || null;

  return (
    <div className="mx-auto max-w-3xl space-y-5" dir="rtl">
      <Link href="/learn/" className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 transition hover:text-brand"><ArrowRight className="size-4" />כל המסלולים</Link>

      {/* header + progress */}
      <header className="relative overflow-hidden rounded-3xl border p-6 shadow-sm" style={{ borderColor: accent + "33", background: `linear-gradient(135deg, ${accent}0d, #fff)` }}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl text-white shadow-sm" style={{ background: accent }}><GraduationCap className="size-6" /></span>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">{p.he}</h1>
              <p className="text-sm text-slate-500">{p.sub}</p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold tabular-nums" style={{ color: accent }}>{st.pct}%</div>
            <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{st.doneCount}/{st.total} הושלמו</div>
          </div>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"><span className="block h-full rounded-full transition-all duration-500" style={{ width: `${st.pct}%`, background: accent }} /></div>
        {p.note && <p className="mt-2 rounded-lg bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800">{p.note}</p>}
        <div className="mt-3 flex flex-wrap gap-2">
          {!st.complete && <a href={`#${ids[st.current]}`} className="tap inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-bold text-white shadow-sm" style={{ background: accent }}><MapPin className="size-4" />המשך — שלב {st.current + 1}</a>}
          {storyHref && <Link href={storyHref} className="tap inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-bold text-slate-600 transition hover:border-brand/40 hover:text-brand"><Workflow className="size-4" />סיור מודרך בתהליך</Link>}
          {st.doneCount > 0 && <button onClick={() => resetPath(module)} className="tap inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold text-slate-400 transition hover:text-brand"><RotateCcw className="size-3.5" />אפס</button>}
        </div>
      </header>

      {st.complete && (
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <CheckCircle2 className="size-6 text-emerald-600" />
          <p className="text-sm font-bold text-emerald-800">סיימת את המסלול! אתה מבין את שלד ה-{p.id.toUpperCase()} מקצה לקצה. {storyHref ? "נסה את הסיור המודרך לראות הכל בפעולה." : ""}</p>
        </div>
      )}

      {/* stepper */}
      <ol className="space-y-2.5">
        {p.steps.map((s, i) => {
          const isDone = done.has(s.id);
          const isHere = i === st.current && !st.complete;
          const ic = IMPORTANCE_COLOR[s.importance];
          return (
            <li key={s.id} id={s.id} className={`relative rounded-2xl border bg-white p-4 shadow-sm transition ${isHere ? "ring-2" : "border-slate-200"}`} style={isHere ? ({ ["--tw-ring-color"]: accent, borderColor: "transparent" } as React.CSSProperties) : undefined}>
              <div className="flex items-start gap-3">
                <button onClick={() => markDone(module, s.id, !isDone)} aria-pressed={isDone} title={isDone ? "בטל סימון" : "סמן כהושלם"}
                  className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border-2 text-sm font-extrabold transition active:scale-90 ${isDone ? "text-white" : "text-slate-400"}`}
                  style={{ background: isDone ? accent : "#fff", borderColor: isDone ? accent : "#cbd5e1" }}>
                  {isDone ? <Check className="size-4" /> : s.n}
                </button>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-extrabold text-slate-900">{s.titleHe}</span>
                    {s.object && <span className="tech rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-slate-600" dir="ltr">{s.object}</span>}
                    {isHere && <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-extrabold text-white" style={{ background: accent }}><MapPin className="size-3" />אתה כאן</span>}
                    <span className="ms-auto rounded-full px-2 py-0.5 text-[9px] font-bold" style={{ background: ic + "1a", color: ic }}>{IMPORTANCE_HE[s.importance]}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.whyHe}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {s.object
                      ? <Link href={`/object/${encodeURIComponent(s.object)}/`} className="tap inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-brand/40 hover:text-brand"><BookOpen className="size-3.5" />למד אובייקט זה<ArrowLeft className="size-3.5" /></Link>
                      : <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-400">שלב מושגי — אין טבלה בודדת</span>}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
