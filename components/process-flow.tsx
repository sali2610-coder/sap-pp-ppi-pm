"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ClipboardList, Factory, Calculator, Terminal, Database, ArrowLeft, AlertTriangle, ChevronLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ProcessPhase, ProcessStep } from "@/data/pppi-process-flow";
import { SectionScrollSpy } from "@/components/section-scrollspy";
import { objectHasPage, tcodeHasPage } from "@/lib/route-exists";

const PHASE_ICON: Record<string, LucideIcon> = { ClipboardList, Factory, Calculator };
const spyId = (id: string) => `flow-${id}`;

function Chip({ code, kind, accent }: { code: string; kind: "table" | "tcode"; accent: string }) {
  const ok = kind === "table" ? objectHasPage(code) : tcodeHasPage(code);
  const href = kind === "table" ? `/object/${encodeURIComponent(code)}/` : `/tcode/${encodeURIComponent(code.toUpperCase())}/`;
  const cls = "tech tap inline-flex min-h-[24px] items-center gap-1 rounded-md border px-1.5 py-0.5 font-mono text-[11.5px] font-bold";
  return ok
    ? <Link href={href} className={`${cls} border-hairline bg-surface text-ink-1 transition hover:border-brand/40 hover:text-brand`} dir="ltr">{kind === "tcode" && <Terminal className="size-2.5" aria-hidden />}{code}</Link>
    : <span className={cls} dir="ltr" style={{ color: accent, borderColor: accent + "33", background: accent + "0d" }}>{kind === "tcode" && <Terminal className="size-2.5" aria-hidden />}{code}</span>;
}

function StepCard({ s, n, accent, last }: { s: ProcessStep; n: number; accent: string; last: boolean }) {
  const [open, setOpen] = useState(false);
  const objHref = objectHasPage(s.code) ? `/object/${encodeURIComponent(s.code)}/` : null;
  return (
    <li className="relative ps-9">
      <span className="absolute -start-0 top-1 z-10 grid size-7 place-items-center rounded-full text-[11px] font-black text-white shadow-sm" style={{ background: last ? "#1aa179" : accent }}>{n}</span>
      <div className="card-premium overflow-hidden p-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <span className="eyebrow-2 block text-ink-3">{s.sapObject}</span>
            {objHref
              ? <Link href={objHref} className="text-[14px] font-extrabold text-ink-1 transition hover:text-brand">{s.business}</Link>
              : <h4 className="text-[14px] font-extrabold text-ink-1">{s.business}</h4>}
          </div>
          <Chip code={s.tcode} kind="tcode" accent={accent} />
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-ink-3"><Database className="size-3" aria-hidden />טבלאות</span>
          {s.tables.map((t) => <Chip key={t} code={t} kind="table" accent={accent} />)}
        </div>

        <div className="mt-2.5 flex items-start gap-1.5 rounded-lg bg-surface-2/50 px-2.5 py-1.5">
          <ArrowLeft className="mt-0.5 size-3 shrink-0" style={{ color: accent }} aria-hidden />
          <p className="text-[12.5px] leading-relaxed text-ink-2"><span className="font-bold text-ink-1">פלט:</span> {s.output}</p>
        </div>

        {s.nextStep && <p className="mt-1.5 flex items-start gap-1 text-[11.5px] text-ink-3"><ChevronLeft className="mt-0.5 size-3 shrink-0 rotate-180 text-ink-3/50" aria-hidden /><span className="font-bold">הבא:</span> {s.nextStep}</p>}

        {s.mistakes.length > 0 && (
          <>
            <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="mt-2.5 inline-flex items-center gap-1.5 text-[11.5px] font-bold text-amber-700">
              <AlertTriangle className="size-3.5 text-amber-500" aria-hidden />טעויות נפוצות
              <ChevronLeft className={`size-3.5 transition-transform ${open ? "-rotate-90" : ""}`} aria-hidden />
            </button>
            {open && (
              <ul className="mt-1.5 space-y-1 rounded-lg border border-s-4 border-amber-200/70 border-s-amber-400 bg-amber-50/50 p-3">
                {s.mistakes.map((m, i) => <li key={i} className="flex gap-2 text-[12.5px] leading-relaxed text-ink-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-400" aria-hidden />{m}</li>)}
              </ul>
            )}
          </>
        )}
      </div>
    </li>
  );
}

function PhaseSection({ phase, accent, startSeq, isLastPhase }: { phase: ProcessPhase; accent: string; startSeq: number; isLastPhase: boolean }) {
  const Icon = PHASE_ICON[phase.icon] || Factory;
  const titleId = `flow-h-${phase.id}`;
  return (
    <section id={spyId(phase.id)} aria-labelledby={titleId} className="scroll-mt-24">
      <div className="mb-3 flex items-center gap-3 border-b border-hairline pb-2">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl" style={{ background: accent + "1f", color: accent }}><Icon className="size-5" aria-hidden /></span>
        <div className="min-w-0 flex-1">
          <span className="eyebrow-2 block" dir="ltr">{phase.en}</span>
          <h3 id={titleId} className="text-[15px] font-black text-ink-1">{phase.he}</h3>
        </div>
        <span className="shrink-0 font-mono text-[10.5px] font-bold text-ink-2">{phase.steps.length} שלבים</span>
      </div>
      <ol className="relative space-y-3">
        <span className="absolute inset-y-3 start-[13px] w-0.5 rounded-full" aria-hidden style={{ background: `linear-gradient(${accent}, ${accent}22)` }} />
        {phase.steps.map((s, i) => <StepCard key={s.id} s={s} n={startSeq + i} accent={accent} last={isLastPhase && i === phase.steps.length - 1} />)}
      </ol>
    </section>
  );
}

// Premium PP-PI production business-process flow — verified E2E (Planning →
// Execution → Settlement), each step showing business / SAP-object / tables /
// tcode / output / common-mistakes. Reuses scroll-spy + timeline + DSv2 idioms.
export function ProcessFlow({ phases, accent }: { phases: ProcessPhase[]; accent: string }) {
  const spy = useMemo(() => phases.map((p) => ({ id: spyId(p.id), label: p.he, count: p.steps.length })), [phases]);
  const jump = (id: string) => { const el = document.getElementById(spyId(id)); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" }); };
  const starts = useMemo(() => { let n = 1; return phases.map((p) => { const s = n; n += p.steps.length; return s; }); }, [phases]);
  return (
    <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-8" dir="rtl">
      <SectionScrollSpy items={spy} />
      <div className="min-w-0 space-y-8">
        <nav aria-label="ניווט שלבי תהליך" className="sticky top-0 z-10 -mx-1 flex gap-1.5 overflow-x-auto bg-background/90 px-1 py-2 backdrop-blur lg:hidden">
          {phases.map((p) => <button key={p.id} type="button" onClick={() => jump(p.id)} className="tap flex shrink-0 items-center rounded-lg border border-hairline bg-surface px-2.5 py-1 text-[12px] font-bold text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50">{p.he}</button>)}
        </nav>
        {phases.map((p, i) => <PhaseSection key={p.id} phase={p} accent={accent} startSeq={starts[i]} isLastPhase={i === phases.length - 1} />)}
      </div>
    </div>
  );
}
