"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Settings, AlertTriangle, Zap, Database, Terminal } from "lucide-react";
import {
  ClipboardList, Boxes, Network, ListChecks, Users, GitBranch, Package,
  CheckCircle2, CalendarClock, CheckCheck, FileText, Coins,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SAPConfigArea, SAPConfigNode } from "@/data/pppi-config-tree";
import { SectionScrollSpy } from "@/components/section-scrollspy";
import { SectionReveal } from "@/components/section-reveal";
import { tcodeHasPage } from "@/lib/route-exists";

const AREA_ICON: Record<string, LucideIcon> = {
  ClipboardList, Boxes, Network, ListChecks, Users, GitBranch, Package,
  CheckCircle2, CalendarClock, CheckCheck, FileText, Coins, Settings,
};
const spyId = (id: string) => `cfg-${id}`;

function TcodeChip({ code, accent }: { code: string; accent: string }) {
  const ok = tcodeHasPage(code);
  const cls = "tech inline-flex min-h-[26px] items-center gap-1 rounded-md border px-2 py-1 font-mono text-[12px] font-bold";
  return ok
    ? <Link href={`/tcode/${encodeURIComponent(code.toUpperCase())}/`} className={`${cls} border-hairline bg-surface text-ink-1 transition hover:border-brand/40 hover:text-brand`} dir="ltr"><Terminal className="size-3" aria-hidden />{code}</Link>
    : <span className={cls} dir="ltr" style={{ color: accent, borderColor: accent + "33", background: accent + "0d" }}><Terminal className="size-3" aria-hidden />{code}</span>;
}

function ConfigNodeCard({ n, accent }: { n: SAPConfigNode; accent: string }) {
  return (
    <div className="rounded-xl border border-hairline bg-surface p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h4 className="text-[14px] font-extrabold text-ink-1">{n.he}</h4>
        {n.tcode && <TcodeChip code={n.tcode} accent={accent} />}
      </div>
      {/* IMG path breadcrumb */}
      {n.imgPath.length > 0 && (
        <p className="mt-1.5 flex flex-wrap items-center gap-x-1 gap-y-0.5 font-mono text-[11px] text-ink-1" dir="ltr">
          {n.imgPath.map((seg, i) => (
            <span key={i} className="flex items-center gap-1">{i > 0 && <ChevronLeft className="size-2.5 rotate-180 text-ink-3/50" aria-hidden />}{seg}</span>
          ))}
        </p>
      )}
      <p className="mt-2.5 text-[13px] leading-relaxed text-ink-2">{n.business}</p>

      <div className="mt-3 rounded-lg border border-s-4 border-indigo-200/70 border-s-indigo-400 bg-indigo-50/40 p-3">
        <p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold text-indigo-700"><Zap className="size-3.5 text-indigo-500" aria-hidden />השפעה</p>
        <p className="text-[12.5px] leading-relaxed text-ink-2">{n.impact}</p>
      </div>

      {n.warnings && n.warnings.length > 0 && (
        <div className="mt-2.5 rounded-lg border border-s-4 border-amber-200/70 border-s-amber-400 bg-amber-50/50 p-3">
          <p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold text-amber-700"><AlertTriangle className="size-3.5 text-amber-500" aria-hidden />אזהרה</p>
          {n.warnings.map((w, i) => <p key={i} className="text-[12.5px] leading-relaxed text-ink-2">{w}</p>)}
        </div>
      )}

      {n.mistakes && n.mistakes.length > 0 && (
        <ul className="mt-2.5 space-y-1">
          {n.mistakes.map((m, i) => <li key={i} className="flex gap-2 text-[12.5px] leading-relaxed text-ink-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-400" aria-hidden />{m}</li>)}
        </ul>
      )}

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-hairline pt-2.5">
        {n.tables && n.tables.length > 0
          ? <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] text-ink-2" dir="ltr"><Database className="size-3 text-ink-3" aria-hidden />{n.tables.join(" · ")}</span>
          : <span />}
        <span className="text-[10px] text-ink-2/70">{n.source}</span>
      </div>
    </div>
  );
}

function AreaSection({ area, accent, index }: { area: SAPConfigArea; accent: string; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const Icon = AREA_ICON[area.icon] || Settings;
  const titleId = `cfg-h-${area.id}`;
  return (
    <SectionReveal>
      <section id={spyId(area.id)} aria-labelledby={titleId} className="card-premium relative scroll-mt-24 overflow-hidden">
        <span className="absolute inset-x-0 top-0 h-1" style={{ background: accent }} aria-hidden />
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls={`cfg-panel-${area.id}`} className="group flex w-full items-center gap-3 p-4 text-start">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl" style={{ background: accent + "1f", color: accent }}><Icon className="size-5" aria-hidden /></span>
          <span className="min-w-0 flex-1">
            <span className="eyebrow-2 block" dir="ltr">{area.en}</span>
            <h3 id={titleId} className="text-[15px] font-black text-ink-1">{area.he}</h3>
          </span>
          <span className="shrink-0 font-mono text-[10.5px] font-bold text-ink-2">{area.nodes.length} צמתים</span>
          <ChevronLeft className={`size-4 shrink-0 text-ink-3 transition-transform ${open ? "-rotate-90" : ""}`} aria-hidden />
        </button>
        {open && (
          <div id={`cfg-panel-${area.id}`} className="space-y-3 border-t border-hairline p-4">
            {area.nodes.map((n) => <ConfigNodeCard key={n.id} n={n} accent={accent} />)}
          </div>
        )}
      </section>
    </SectionReveal>
  );
}

// Premium PP-PI Configuration (SPRO) tree — verified IMG nodes with path
// breadcrumb, customizing tcode, business impact + warnings. Reuses the
// scroll-spy + DSv2 card idioms from the master-data facets.
export function ConfigTree({ areas, accent }: { areas: SAPConfigArea[]; accent: string }) {
  const spy = useMemo(() => areas.map((a) => ({ id: spyId(a.id), label: a.he, count: a.nodes.length })), [areas]);
  const jump = (id: string) => { const el = document.getElementById(spyId(id)); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" }); };
  return (
    <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-8" dir="rtl">
      <SectionScrollSpy items={spy} />
      <div className="min-w-0 space-y-5">
        <nav aria-label="ניווט אזורי קונפיגורציה" className="sticky top-0 z-10 -mx-1 flex gap-1.5 overflow-x-auto bg-background/90 px-1 py-2 backdrop-blur lg:hidden">
          {areas.map((a) => <button key={a.id} type="button" onClick={() => jump(a.id)} className="tap flex shrink-0 items-center rounded-lg border border-hairline bg-surface px-2.5 py-1 text-[12px] font-bold text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50">{a.he}</button>)}
        </nav>
        {areas.map((a, i) => <AreaSection key={a.id} area={a} accent={accent} index={i} />)}
      </div>
    </div>
  );
}
