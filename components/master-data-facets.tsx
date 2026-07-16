"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, type MotionProps } from "framer-motion";
import {
  Boxes, Target, Clock, UserCog, Database, Terminal, AppWindow, Plug, GitBranch,
  AlertTriangle, Lightbulb, BookOpen, ArrowLeft, ChevronLeft,
  Wrench, MapPin, Users, ListChecks, Network, Package, CalendarClock, Gauge, AlertCircle, ClipboardList, Contact,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { MasterDataFacet } from "@/data/pm-master-data-facets";
import { SectionScrollSpy } from "@/components/section-scrollspy";
import { objectHasPage, tcodeHasPage } from "@/lib/route-exists";

const spyId = (i: number) => `md-grp-${i}`;
// Per-object glyph so each card is scan-distinguishable (reviewer fix).
const OBJ_ICON: Record<string, LucideIcon> = {
  EQUI: Wrench, IFLOT: MapPin, CRHD: Users, PLKO: ListChecks, MAST: Network,
  MARA: Package, MPLA: CalendarClock, IMPTT: Gauge, QMEL: AlertCircle, AUFK: ClipboardList, BUT000: Contact,
};
const readMin = (f: MasterDataFacet) => {
  const words = `${f.whatIs} ${f.why} ${f.whenCreated} ${f.owner} ${f.dependencies} ${f.cbcExample} ${f.commonMistakes.join(" ")}`.split(/\s+/).length;
  return Math.max(1, Math.round(words / 180));
};

function Chips({ items, kind, accent }: { items: string[]; kind: "table" | "tcode" | "plain"; accent: string }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((c) => {
        const ok = kind === "table" ? objectHasPage(c) : kind === "tcode" ? tcodeHasPage(c) : false;
        const href = kind === "table" ? `/object/${encodeURIComponent(c)}/` : kind === "tcode" ? `/tcode/${encodeURIComponent(c.toUpperCase())}/` : "";
        const cls = "tech inline-flex min-h-[26px] items-center rounded-md border px-2 py-1 font-mono text-[12px] font-bold";
        return ok
          ? <Link key={c} href={href} className={`${cls} border-hairline bg-surface text-ink-1 transition hover:border-brand/40 hover:text-brand`} dir="ltr">{c}</Link>
          : <span key={c} title={kind === "plain" ? undefined : "אין עמוד ייעודי לאובייקט זה"} className={`${cls} border-hairline bg-surface-2/50 text-ink-2`} dir="ltr" style={kind === "plain" ? { color: accent, borderColor: accent + "33", background: accent + "0d" } : undefined}>{c}</span>;
      })}
    </div>
  );
}

function Panel({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-hairline bg-surface-2/40 p-3.5">
      <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-ink-3">{icon}{title}</p>
      {children}
    </div>
  );
}

function FacetCard({ f, accent, index, openInit }: { f: MasterDataFacet; accent: string; index: number; openInit: boolean }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(openInit);
  // Collapse the initially-open card on narrow screens so the 11-object set stays
  // graspable at a glance (reviewer fix) — done post-mount to avoid hydration mismatch.
  useEffect(() => { if (openInit && typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches) setOpen(false); }, [openInit]);
  const rise: MotionProps = reduce ? {} : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.28, ease: "easeOut", delay: Math.min(index * 0.04, 0.24) } };
  const Icon = OBJ_ICON[f.code] || Boxes;
  const titleId = `md-h-${index}`;
  const guideHref = f.guide ? `/domain/${f.guide}/` : objectHasPage(f.code) ? `/object/${encodeURIComponent(f.code)}/` : null;
  const guideLabel = f.guide ? "מדריך מלא" : "עמוד הטבלה";
  return (
    <motion.section {...rise} id={spyId(index)} aria-labelledby={titleId} className="card-premium relative scroll-mt-24 overflow-hidden">
      <span className="absolute inset-x-0 top-0 h-1" style={{ background: accent }} aria-hidden />
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls={`${spyId(index)}-body`} className="group flex w-full items-start gap-3.5 p-5 text-start">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl transition group-hover:scale-[1.03]" style={{ background: accent + "1f", color: accent }}><Icon className="size-6" aria-hidden /></span>
        <span className="min-w-0 flex-1">
          <span className="eyebrow-2 block" dir="ltr">{f.en}</span>
          <h3 id={titleId} className="text-lg font-black text-ink-1">{f.he}</h3>
          <span className="mt-0.5 line-clamp-1 text-[13px] text-ink-3">{f.whatIs}</span>
        </span>
        <span className="flex shrink-0 flex-col items-end gap-1">
          <span className="inline-flex items-center gap-1 rounded-md bg-surface-2 px-1.5 py-0.5 text-[10.5px] font-bold text-ink-2"><Clock className="size-2.5" aria-hidden />{readMin(f)} דק׳</span>
          <ChevronLeft className={`size-4 text-ink-3 transition-transform ${open ? "-rotate-90" : ""}`} aria-hidden />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduce ? undefined : { height: 0, opacity: 0 }}
            animate={reduce ? undefined : { height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            id={`${spyId(index)}-body`}
            className="overflow-hidden"
          >
            <div className="space-y-5 border-t border-hairline p-5">
              <p className="text-[14px] leading-relaxed text-ink-2">{f.whatIs}</p>
              <Panel icon={<Target className="size-3.5" />} title="למה זה קיים"><p className="text-[13px] leading-relaxed text-ink-2">{f.why}</p></Panel>

              <div className="grid gap-4 lg:grid-cols-2">
                <Panel icon={<Clock className="size-3.5" />} title="מתי נוצר"><p className="text-[13px] leading-relaxed text-ink-2">{f.whenCreated}</p></Panel>
                <Panel icon={<UserCog className="size-3.5" />} title="בעלים"><p className="text-[13px] leading-relaxed text-ink-2">{f.owner}</p></Panel>
                <Panel icon={<Database className="size-3.5" />} title="טבלאות מפתח"><Chips items={f.tables} kind="table" accent={accent} /></Panel>
                <Panel icon={<Terminal className="size-3.5" />} title="טרנזקציות"><Chips items={f.tcodes} kind="tcode" accent={accent} /></Panel>
                {f.fiori && f.fiori.length > 0 && <Panel icon={<AppWindow className="size-3.5" />} title="Fiori Apps"><Chips items={f.fiori} kind="plain" accent={accent} /></Panel>}
                {f.bapis && f.bapis.length > 0 && <Panel icon={<Plug className="size-3.5" />} title="BAPIs / FMs"><Chips items={f.bapis} kind="plain" accent={accent} /></Panel>}
              </div>

              <Panel icon={<GitBranch className="size-3.5" />} title="תלויות"><p className="text-[13px] leading-relaxed text-ink-2">{f.dependencies}</p></Panel>

              <div className="rounded-xl border border-s-4 border-amber-200/70 border-s-amber-400 bg-amber-50/50 p-4">
                <p className="mb-2 flex items-center gap-1.5 text-[12px] font-bold text-amber-700"><AlertTriangle className="size-4 text-amber-500" />טעויות נפוצות</p>
                <ul className="space-y-1.5">
                  {f.commonMistakes.map((m, i) => <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-ink-2"><span className="mt-1 size-1.5 shrink-0 rounded-full bg-amber-400" />{m}</li>)}
                </ul>
              </div>

              <div className="rounded-xl border border-s-4 border-emerald-200/60 border-s-emerald-400 bg-emerald-50/40 p-4">
                <p className="mb-1.5 flex items-center gap-1.5 text-[12px] font-bold text-emerald-700"><Lightbulb className="size-4 text-emerald-600" />דוגמה מהארגון (CBC)</p>
                <p className="text-[13px] leading-relaxed text-ink-2">{f.cbcExample}</p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-hairline pt-4">
                {guideHref
                  ? <Link href={guideHref} className="inline-flex items-center gap-1.5 rounded-lg bg-brand/10 px-3 py-1.5 text-[12px] font-bold text-brand transition hover:bg-brand/15"><BookOpen className="size-3.5" aria-hidden />{guideLabel}<ArrowLeft className="size-3.5" aria-hidden /></Link>
                  : <span />}
                <span className="text-[10.5px] text-ink-2/80">{f.source}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

// Premium master-data facet experience (P3 GOAL-1+3). Verified-source content
// (owner/when/mistakes/CBC) rendered as progressive-disclosure cards with a
// sticky scroll-spy of the objects. Reuses SectionScrollSpy + DSv2 idioms.
export function MasterDataFacets({ facets, accent }: { facets: MasterDataFacet[]; accent: string }) {
  const spy = useMemo(() => facets.map((f, i) => ({ id: spyId(i), label: f.he, count: f.tables.length })), [facets]);
  const jump = (i: number) => {
    const el = document.getElementById(spyId(i));
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  };
  return (
    <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-8" dir="rtl">
      <SectionScrollSpy items={spy} />
      <div className="min-w-0 space-y-6">
        {/* mobile object jump index (desktop uses the sticky scroll-spy) */}
        <nav aria-label="ניווט אובייקטים" className="sticky top-0 z-10 -mx-1 flex gap-1.5 overflow-x-auto bg-background/90 px-1 py-2 backdrop-blur lg:hidden">
          {facets.map((f, i) => (
            <button key={f.code} type="button" onClick={() => jump(i)} className="tap shrink-0 rounded-lg border border-hairline bg-surface px-2.5 py-1 text-[12px] font-bold text-ink-2">{f.he}</button>
          ))}
        </nav>
        {facets.map((f, i) => <FacetCard key={f.code} f={f} accent={accent} index={i} openInit={i === 0} />)}
      </div>
    </div>
  );
}
