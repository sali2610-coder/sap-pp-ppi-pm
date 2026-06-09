"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown, BookOpen, Target, Settings2, FolderTree, Boxes, Database, LayoutGrid,
  GitBranch, Factory, AlertTriangle, CheckCircle2, ArrowLeft, ListChecks, Wrench, UserCog,
  Maximize2, Minimize2, GraduationCap,
} from "lucide-react";
import { PP_TEXTBOOK, type Subchapter, type SubSection, type FlowStep } from "@/data/library/pp-textbook";
import { slugOf } from "@/lib/pp-object-index";
import { useI18n } from "@/lib/i18n";

/* ---------- shared bits ---------- */

function MiniFlow({ steps }: { steps?: FlowStep[] }) {
  if (!steps?.length) return null;
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-stretch">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div className="min-w-28 flex-1 rounded-xl border border-brand/25 bg-gradient-to-br from-brand-soft/60 to-card px-2.5 py-1.5 text-center shadow-sm">
            <span className="block text-[11px] font-bold leading-tight">{s.he}</span>
            {s.code && <span dir="ltr" className="tech mt-0.5 block text-[9px] font-semibold text-brand">{s.code}</span>}
            {s.note && <span className="mt-0.5 block text-[9px] text-muted-foreground">{s.note}</span>}
          </div>
          {i < steps.length - 1 && <ArrowLeft className="size-3.5 shrink-0 text-brand/60 ltr:rotate-180" />}
        </div>
      ))}
    </div>
  );
}

function ConfigTree({ paths }: { paths: string[] }) {
  return (
    <div className="space-y-1.5">
      {paths.map((p, i) => {
        const parts = p.split("►").map((s) => s.trim());
        return (
          <div key={i} dir="ltr" className="rounded-lg border border-border/50 bg-muted/30 p-2 text-start">
            {parts.map((node, j) => (
              <div key={j} className="flex items-center text-[11px]" style={{ paddingInlineStart: `${j * 12}px` }}>
                {j > 0 && <span className="me-1 text-muted-foreground/60">└─</span>}
                <span className={j === parts.length - 1 ? "tech font-semibold text-brand" : "text-muted-foreground"}>{node}</span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function Chips({ items, link }: { items: string[]; link?: boolean }) {
  if (!items?.length) return <span className="text-xs text-muted-foreground">—</span>;
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((it) =>
        link ? (
          <Link key={it} href={`/library/pp/object/${slugOf(it)}/`} dir="ltr" className="tech rounded bg-muted px-1.5 py-0.5 text-[11px] font-semibold transition-colors hover:bg-brand/15 hover:text-brand">{it}</Link>
        ) : (
          <span key={it} dir="ltr" className="tech rounded bg-muted px-1.5 py-0.5 text-[11px] font-semibold">{it}</span>
        ),
      )}
    </div>
  );
}

function Bullets({ items }: { items?: string[] }) {
  if (!items?.length) return <span className="text-xs text-muted-foreground">—</span>;
  return (
    <ul className="space-y-1">
      {items.map((x, i) => (
        <li key={i} className="flex gap-1.5"><span className="mt-1.5 size-1 shrink-0 rounded-full bg-brand/40" /><span>{x}</span></li>
      ))}
    </ul>
  );
}

function SectionRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 border-t border-border/30 pt-3 first:border-0 first:pt-0 sm:grid-cols-[150px_1fr] sm:gap-3">
      <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-brand">{icon}{label}</p>
      <div className="text-sm leading-relaxed text-slate-700">{children}</div>
    </div>
  );
}

/* ---------- nested source sub-heading ---------- */

function ChildUnit({ s, lang }: { s: SubSection; lang: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-card/50">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center gap-2 p-2.5 text-start">
        <span dir="ltr" className="tech shrink-0 rounded bg-brand/10 px-1.5 py-0.5 text-[11px] font-bold text-brand">{s.id}</span>
        <span className="min-w-0 flex-1"><span className="block text-[13px] font-semibold leading-tight">{s.titleHe}</span><span dir="ltr" className="text-[10px] text-muted-foreground">{s.titleEn}</span></span>
        <ChevronDown className={`size-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div dir="rtl" className="space-y-3 border-t border-border/40 bg-muted/20 p-3">
              <SectionRow icon={<BookOpen className="size-3.5" />} label={lang === "he" ? "מושג" : "Concept"}>{s.conceptHe}</SectionRow>
              <SectionRow icon={<ListChecks className="size-3.5" />} label={lang === "he" ? "מימוש" : "Implementation"}><Bullets items={s.implementationHe} /></SectionRow>
              <SectionRow icon={<AlertTriangle className="size-3.5" />} label={lang === "he" ? "פתרון תקלות" : "Troubleshooting"}><Bullets items={s.troubleshootHe} /></SectionRow>
              <div className="rounded-lg border border-brand/20 bg-brand-soft/50 p-2.5">
                <p className="flex items-center gap-1.5 text-[11px] font-bold text-brand"><Factory className="size-3.5" />{lang === "he" ? "דוגמת CBC" : "CBC example"}</p>
                <p className="mt-0.5 text-sm leading-relaxed">{s.cbcHe}</p>
              </div>
              <div className="rounded-lg border border-amber-300/40 bg-amber-50/60 p-2.5">
                <p className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700"><UserCog className="size-3.5" />{lang === "he" ? "הערת יועץ" : "Consultant note"}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-amber-900">{s.consultantHe}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- top-level subchapter (12 sections) ---------- */

function Lesson({ s, lang, isOpen, onToggle }: { s: Subchapter; lang: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <section id={`sub-${s.id}`} className="glass scroll-mt-24 overflow-hidden rounded-2xl">
      <button onClick={onToggle} className="flex w-full items-center gap-2.5 p-4 text-start transition-colors hover:bg-brand/5">
        <span dir="ltr" className="tech shrink-0 rounded-lg bg-gradient-to-br from-brand to-brand-dark px-2 py-1 text-xs font-bold text-brand-foreground">{s.id}</span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold">{s.titleHe}</span>
          <span dir="ltr" className="text-[11px] text-muted-foreground">{s.titleEn}</span>
        </span>
        {s.children?.length ? (
          <span className="hidden shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground sm:inline">
            {s.children.length} {lang === "he" ? "תתי-סעיפים" : "subsections"}
          </span>
        ) : null}
        <ChevronDown className={`size-5 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.24 }} className="overflow-hidden">
            <div dir="rtl" className="space-y-3 border-t border-border/40 p-4">
              <SectionRow icon={<BookOpen className="size-3.5" />} label={lang === "he" ? "מושג" : "Concept"}>{s.conceptHe}</SectionRow>
              <SectionRow icon={<Target className="size-3.5" />} label={lang === "he" ? "מטרה עסקית" : "Business purpose"}>{s.purposeHe}</SectionRow>
              {s.flow && <SectionRow icon={<GitBranch className="size-3.5" />} label={lang === "he" ? "תרשים תהליך" : "Process flow"}><MiniFlow steps={s.flow} /></SectionRow>}
              <SectionRow icon={<Settings2 className="size-3.5" />} label={lang === "he" ? "קונפיגורציה" : "Configuration"}><Bullets items={s.configHe} /></SectionRow>
              <SectionRow icon={<FolderTree className="size-3.5" />} label={lang === "he" ? "ניווט SPRO" : "SAP navigation"}><ConfigTree paths={s.navHe} /></SectionRow>
              <SectionRow icon={<Boxes className="size-3.5" />} label="T-Codes"><Chips items={s.tcodes} link /></SectionRow>
              <SectionRow icon={<Database className="size-3.5" />} label="Tables"><Chips items={s.tables} link /></SectionRow>
              <SectionRow icon={<LayoutGrid className="size-3.5" />} label="Fiori Apps"><Chips items={s.fiori} link /></SectionRow>
              <SectionRow icon={<Database className="size-3.5" />} label={lang === "he" ? "נתוני אב" : "Master data"}><Bullets items={s.masterDataHe} /></SectionRow>
              <SectionRow icon={<Factory className="size-3.5" />} label={lang === "he" ? "דוגמת CBC" : "CBC example"}>
                <div className="rounded-lg border border-brand/20 bg-brand-soft/50 p-2.5 text-slate-800">{s.cbcHe}</div>
              </SectionRow>
              <SectionRow icon={<Wrench className="size-3.5" />} label={lang === "he" ? "פתרון תקלות" : "Troubleshooting"}><Bullets items={s.troubleshootHe} /></SectionRow>
              <SectionRow icon={<CheckCircle2 className="size-3.5" />} label={lang === "he" ? "שיטות מומלצות" : "Best practices"}><Bullets items={s.bestPracticeHe} /></SectionRow>

              {s.children?.length ? (
                <div className="border-t border-border/30 pt-3">
                  <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-brand"><FolderTree className="size-3.5" />{lang === "he" ? "תתי-סעיפים (מבנה הספר)" : "Subsections (book structure)"}</p>
                  <div className="space-y-2">
                    {s.children.map((c) => <ChildUnit key={c.id} s={c} lang={lang} />)}
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- chapter accordion (= the interactive TOC) ---------- */

export function PPTextbookLessons({ n }: { n: number }) {
  const { lang } = useI18n();
  const tb = PP_TEXTBOOK[String(n)];
  const [open, setOpenState] = useState<Set<string>>(() => new Set(tb ? [tb.subchapters[0].id] : []));
  if (!tb) return null;

  const ids = tb.subchapters.map((s) => s.id);
  const toggle = (id: string) =>
    setOpenState((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  const expandAll = () => setOpenState(new Set(ids));
  const collapseAll = () => setOpenState(new Set());

  const readCount = ids.filter((id) => open.has(id)).length;
  const pct = Math.round((readCount / ids.length) * 100);

  return (
    <div id="learning" className="scroll-mt-24 space-y-3">
      {/* header: intro + progress + controls */}
      <section dir="rtl" className="glass rounded-2xl p-5">
        <h2 className="mb-1 flex items-center gap-2 text-sm font-bold text-brand"><GraduationCap className="size-4" />{lang === "he" ? "תוכן הפרק — אקורדיון לימודי אינטראקטיבי" : "Chapter contents — interactive learning accordion"}</h2>
        <p className="text-sm leading-relaxed text-slate-700">{tb.introHe}</p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button onClick={expandAll} className="flex items-center gap-1.5 rounded-lg border border-brand/25 bg-brand-soft/50 px-2.5 py-1 text-[11px] font-semibold text-brand transition-colors hover:bg-brand/10">
            <Maximize2 className="size-3" />{lang === "he" ? "פתח הכל" : "Expand all"}
          </button>
          <button onClick={collapseAll} className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1 text-[11px] font-semibold text-muted-foreground transition-colors hover:bg-muted">
            <Minimize2 className="size-3" />{lang === "he" ? "סגור הכל" : "Collapse all"}
          </button>
          <div className="ms-auto flex items-center gap-2">
            <span className="text-[11px] font-semibold text-muted-foreground">{readCount}/{ids.length} {lang === "he" ? "פתוחים" : "open"}</span>
            <div className="h-1.5 w-28 overflow-hidden rounded-full bg-muted">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-brand to-brand-dark" animate={{ width: `${pct}%` }} transition={{ duration: 0.3 }} />
            </div>
          </div>
        </div>
      </section>

      {tb.subchapters.map((s) => (
        <Lesson key={s.id} s={s} lang={lang} isOpen={open.has(s.id)} onToggle={() => toggle(s.id)} />
      ))}
    </div>
  );
}

export function hasTextbook(n: number) {
  return Boolean(PP_TEXTBOOK[String(n)]);
}
