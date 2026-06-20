"use client";

import { useState } from "react";
import Link from "next/link";
import { Wrench, Factory, ArrowLeft, GraduationCap, CheckCircle2 } from "lucide-react";
import { LEARN_AREAS, LEARN_PATHS } from "@/data/learn/paths";
import { useDoneSet, pathState } from "@/lib/learn-store";

function PathRow({ id }: { id: string }) {
  const p = LEARN_PATHS[id];
  const done = useDoneSet(id);
  const st = pathState(done, p.steps.map((s) => s.id));
  return (
    <Link href={`/learn/${id}/`} className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md active:scale-[.99]">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl text-white shadow-sm" style={{ background: p.accent }}>
        {st.complete ? <CheckCircle2 className="size-5" /> : <GraduationCap className="size-5" />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-extrabold text-slate-900">{p.he}</span>
        <span className="block truncate text-xs text-slate-500">{p.sub}</span>
        <span className="mt-1.5 flex items-center gap-2">
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100"><span className="block h-full rounded-full transition-all" style={{ width: `${st.pct}%`, background: p.accent }} /></span>
          <span className="shrink-0 text-[10px] font-bold tabular-nums text-slate-400">{st.doneCount}/{st.total}</span>
        </span>
      </span>
      <ArrowLeft className="size-4 shrink-0 text-slate-300 transition group-hover:text-brand" />
    </Link>
  );
}

export function LearnHome() {
  const [open, setOpen] = useState<string | null>("manufacturing");
  return (
    <div className="mx-auto max-w-3xl space-y-6" dir="rtl">
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-brand-dark via-brand to-brand p-7 text-white shadow-lg">
        <div className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70"><GraduationCap className="size-4" />NEO Learning</div>
          <h1 className="mt-1 text-3xl font-extrabold">🎯 מה אתה רוצה ללמוד?</h1>
          <p className="mt-1.5 max-w-xl text-sm text-white/85">חדש ב-SAP? בחר תחום, והמערכת תוביל אותך שלב אחרי שלב — מהאובייקט הראשון ועד התהליך המלא.</p>
        </div>
      </header>

      <div className="space-y-3">
        {LEARN_AREAS.map((a) => {
          const Icon = a.icon === "pm" ? Wrench : Factory;
          const single = a.paths.length === 1;
          const expanded = open === a.id;
          return (
            <div key={a.id} className="rounded-3xl border border-slate-200 bg-white p-2 shadow-sm">
              <button
                onClick={() => (single ? null : setOpen(expanded ? null : a.id))}
                className={`flex w-full items-center gap-3 rounded-2xl p-3 text-right transition ${single ? "" : "hover:bg-slate-50"}`}
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl text-white shadow-sm" style={{ background: a.accent }}><Icon className="size-6" /></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-extrabold text-slate-900">{a.he}</span>
                  <span className="block truncate text-sm text-slate-500">{a.sub}</span>
                </span>
                {single
                  ? <Link href={`/learn/${a.paths[0]}/`} className="tap rounded-xl bg-brand px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-brand-dark">התחל</Link>
                  : <ArrowLeft className={`size-5 shrink-0 text-slate-300 transition-transform ${expanded ? "-rotate-90" : ""}`} />}
              </button>
              {!single && expanded && (
                <div className="space-y-2 px-2 pb-2 pt-1">
                  {a.paths.map((pid) => <PathRow key={pid} id={pid} />)}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="text-center text-xs text-slate-400">לא בטוח מה ההבדל בין PP ל-PP-PI? התחל ב-PP Fundamentals — המסלול מתפצל כשצריך.</p>
    </div>
  );
}
