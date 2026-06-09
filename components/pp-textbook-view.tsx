"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown, BookOpen, Target, Settings2, FolderTree, Boxes, Database, LayoutGrid,
  GitBranch, Factory, AlertTriangle, CheckCircle2, ArrowLeft,
} from "lucide-react";
import { PP_TEXTBOOK, type Subchapter, type FlowStep } from "@/data/library/pp-textbook";
import { slugOf } from "@/lib/pp-object-index";
import { useI18n } from "@/lib/i18n";

function MiniFlow({ steps }: { steps?: FlowStep[] }) {
  if (!steps?.length) return null;
  return (
    <div className="flex flex-wrap items-stretch gap-1.5">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div className="rounded-lg border border-brand/20 bg-brand-soft/40 px-2 py-1 text-center">
            <span className="block text-[11px] font-bold">{s.he}</span>
            {s.code && <span className="tech block text-[9px] text-brand">{s.code}</span>}
          </div>
          {i < steps.length - 1 && <ArrowLeft className="size-3 shrink-0 text-brand ltr:rotate-180" />}
        </div>
      ))}
    </div>
  );
}

function ConfigTree({ paths }: { paths: string[] }) {
  // render IMG paths as a tree (split on ►)
  return (
    <div className="space-y-1.5">
      {paths.map((p, i) => {
        const parts = p.split("►").map((s) => s.trim());
        return (
          <div key={i} dir="ltr" className="rounded-lg border border-border/50 bg-muted/30 p-2 text-start">
            {parts.map((node, j) => (
              <div key={j} className="flex items-center text-[11px]" style={{ paddingInlineStart: `${j * 12}px` }}>
                {j > 0 && <span className="me-1 text-muted-foreground">└─</span>}
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
  if (!items.length) return <span className="text-xs text-muted-foreground">—</span>;
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

function SectionRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5 sm:grid-cols-[140px_1fr] sm:gap-3">
      <p className="flex items-center gap-1.5 text-[11px] font-bold text-brand">{icon}{label}</p>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  if (!items?.length) return <span className="text-xs text-muted-foreground">—</span>;
  return (
    <ul className="space-y-1">
      {items.map((x, i) => (
        <li key={i} className="flex gap-1.5"><span className="mt-1.5 size-1 shrink-0 rounded-full bg-brand/40" /><span>{x}</span></li>
      ))}
    </ul>
  );
}

function Lesson({ s, open }: { s: Subchapter; open: boolean }) {
  const { lang } = useI18n();
  const [isOpen, setOpen] = useState(open);
  return (
    <section id={`sub-${s.id}`} className="glass scroll-mt-24 overflow-hidden rounded-2xl">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center gap-2.5 p-4 text-start">
        <span dir="ltr" className="tech shrink-0 rounded-lg bg-gradient-to-br from-brand to-brand-dark px-2 py-1 text-xs font-bold text-brand-foreground">{s.id}</span>
        <span className="min-w-0 flex-1"><span className="block text-sm font-bold">{s.titleHe}</span><span dir="ltr" className="text-[11px] text-muted-foreground">{s.titleEn}</span></span>
        <ChevronDown className={`size-5 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
            <div dir="rtl" className="space-y-4 border-t border-border/40 p-4">
              <SectionRow icon={<BookOpen className="size-3.5" />} label={lang === "he" ? "מושג" : "Concept"}>{s.conceptHe}</SectionRow>
              <SectionRow icon={<Target className="size-3.5" />} label={lang === "he" ? "מטרה עסקית" : "Business purpose"}>{s.purposeHe}</SectionRow>
              {s.flow && <SectionRow icon={<GitBranch className="size-3.5" />} label={lang === "he" ? "תרשים תהליך" : "Process flow"}><MiniFlow steps={s.flow} /></SectionRow>}
              <SectionRow icon={<Settings2 className="size-3.5" />} label={lang === "he" ? "קונפיגורציה" : "Configuration"}><Bullets items={s.configHe} /></SectionRow>
              <SectionRow icon={<FolderTree className="size-3.5" />} label={lang === "he" ? "ניווט SPRO" : "SAP navigation"}><ConfigTree paths={s.navHe} /></SectionRow>
              <SectionRow icon={<Boxes className="size-3.5" />} label="T-Codes"><Chips items={s.tcodes} link /></SectionRow>
              <SectionRow icon={<Database className="size-3.5" />} label="Tables"><Chips items={s.tables} link /></SectionRow>
              <SectionRow icon={<LayoutGrid className="size-3.5" />} label="Fiori Apps"><Chips items={s.fiori} link /></SectionRow>
              <SectionRow icon={<Database className="size-3.5" />} label={lang === "he" ? "נתוני אב" : "Master data"}><Bullets items={s.masterDataHe} /></SectionRow>
              <SectionRow icon={<AlertTriangle className="size-3.5" />} label={lang === "he" ? "פתרון תקלות" : "Troubleshooting"}><Bullets items={s.troubleshootHe} /></SectionRow>
              <SectionRow icon={<CheckCircle2 className="size-3.5" />} label={lang === "he" ? "שיטות מומלצות" : "Best practices"}><Bullets items={s.bestPracticeHe} /></SectionRow>
              <div className="rounded-lg border border-brand/20 bg-brand-soft/50 p-3">
                <p className="flex items-center gap-1.5 text-[11px] font-bold text-brand"><Factory className="size-3.5" />{lang === "he" ? "דוגמת CBC" : "CBC example"}</p>
                <p className="mt-0.5 text-sm leading-relaxed">{s.cbcHe}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function PPTextbookLessons({ n }: { n: number }) {
  const { lang } = useI18n();
  const tb = PP_TEXTBOOK[String(n)];
  if (!tb) return null;
  return (
    <div id="learning" className="scroll-mt-24 space-y-4">
      <section dir="rtl" className="glass rounded-2xl p-5">
        <h2 className="mb-1 flex items-center gap-2 text-sm font-bold text-brand"><BookOpen className="size-4" />{lang === "he" ? "ספר לימוד דיגיטלי — תת-פרקים" : "Digital textbook — subchapters"}</h2>
        <p className="text-sm leading-relaxed text-slate-700">{tb.introHe}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tb.subchapters.map((s) => (
            <a key={s.id} href={`#sub-${s.id}`} className="rounded-lg bg-muted/60 px-2 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-brand/10 hover:text-brand">
              <span dir="ltr" className="tech font-bold">{s.id}</span> {s.titleHe}
            </a>
          ))}
        </div>
      </section>
      {tb.subchapters.map((s, i) => <Lesson key={s.id} s={s} open={i === 0} />)}
    </div>
  );
}

export function hasTextbook(n: number) {
  return Boolean(PP_TEXTBOOK[String(n)]);
}
