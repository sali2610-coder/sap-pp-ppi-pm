"use client";

import { useState } from "react";
import Link from "next/link";
import { Wrench, Factory, ShieldCheck, Compass, ArrowLeft, GraduationCap, CheckCircle2, Workflow, Clock } from "lucide-react";
import { LEARN_CATEGORIES, LEARN_PATHS } from "@/data/learn/paths";
import { useDoneSet, pathState } from "@/lib/learn-store";
import { LearnMetrics } from "@/components/learn-metrics";

const ICON = { pm: Wrench, factory: Factory, qa: ShieldCheck, onboard: Compass } as const;

function PathRow({ id }: { id: string }) {
  const p = LEARN_PATHS[id];
  const done = useDoneSet(id);
  const st = pathState(done, p.steps.map((s) => s.id));
  return (
    <Link href={`/learn/${id}/`} className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md active:scale-[.99]">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl text-white shadow-sm" style={{ background: p.accent }}>
        {st.complete ? <CheckCircle2 className="size-5" /> : <GraduationCap className="size-5" />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2"><span className="block text-sm font-extrabold text-slate-900">{p.he}</span>
          {p.level && <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-500">{p.level}</span>}</span>
        <span className="block truncate text-xs text-slate-500">{p.sub}</span>
        <span className="mt-1.5 flex items-center gap-2">
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100"><span className="block h-full rounded-full transition-all" style={{ width: `${st.pct}%`, background: p.accent }} /></span>
          <span className="shrink-0 text-[10px] font-bold tabular-nums text-slate-400">{st.doneCount}/{st.total}</span>
          {p.durationHe && <span className="hidden shrink-0 items-center gap-0.5 text-[10px] font-medium text-slate-400 sm:flex"><Clock className="size-3" />{p.durationHe}</span>}
        </span>
      </span>
      <ArrowLeft className="size-4 shrink-0 text-slate-300 transition group-hover:text-brand" />
    </Link>
  );
}

export function LearnHome() {
  const [open, setOpen] = useState<string | null>("onboarding");
  const totalTracks = LEARN_CATEGORIES.reduce((n, c) => n + c.tracks.length, 0);
  return (
    <div className="mx-auto max-w-3xl space-y-6" dir="rtl">
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-brand-dark via-brand to-brand p-7 text-white shadow-lg">
        <div className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70"><GraduationCap className="size-4" />NEO Academy</div>
          <h1 className="mt-1 text-3xl font-extrabold">אקדמיית יועצי SAP</h1>
          <p className="mt-1.5 max-w-xl text-sm text-white/85">{totalTracks} מסלולי למידה — PM, PP-PI, QA וקליטת יועץ. למד תהליך שלם מקצה לקצה, שלב אחרי שלב, בלי לצאת מהפלטפורמה.</p>
        </div>
      </header>

      <LearnMetrics />

      <div className="space-y-3">
        {LEARN_CATEGORIES.map((cat) => {
          const Icon = ICON[cat.icon];
          const expanded = open === cat.id;
          return (
            <div key={cat.id} className="rounded-3xl border border-slate-200 bg-white p-2 shadow-sm">
              <button onClick={() => setOpen(expanded ? null : cat.id)} className="flex w-full items-center gap-3 rounded-2xl p-3 text-right transition hover:bg-slate-50">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl text-white shadow-sm" style={{ background: cat.accent }}><Icon className="size-6" /></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-extrabold text-slate-900">{cat.he}</span>
                  <span className="block truncate text-sm text-slate-500">{cat.sub}</span>
                </span>
                <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-500">{cat.tracks.length}</span>
                <ArrowLeft className={`size-5 shrink-0 text-slate-300 transition-transform ${expanded ? "-rotate-90" : ""}`} />
              </button>
              {expanded && <div className="space-y-2 px-2 pb-2 pt-1">{cat.tracks.map((id) => <PathRow key={id} id={id} />)}</div>}
            </div>
          );
        })}
      </div>

      <Link href="/story/" className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md active:scale-[.99]">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-slate-900 text-white shadow-sm"><Workflow className="size-5" /></span>
        <span className="min-w-0 flex-1"><span className="block text-sm font-extrabold text-slate-900">סיור מודרך בתהליך · Story Mode</span><span className="block text-xs text-slate-500">תהליך אחזקה ופקודת תהליך — מקצה לקצה</span></span>
        <ArrowLeft className="size-4 shrink-0 text-slate-300 transition group-hover:text-brand" />
      </Link>
    </div>
  );
}
