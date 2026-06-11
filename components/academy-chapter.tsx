"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown, BookOpen, GraduationCap, Brain, UserCog, Target, Workflow, Factory,
  FolderTree, Database, Boxes, LayoutGrid, Settings2, GitBranch, AlertTriangle, Wrench,
  CheckCircle2, HelpCircle, Sparkles, Link2, ArrowLeft, ArrowRight, Maximize2, Minimize2, Clock,
} from "lucide-react";
import { nodeWordCount, type LearningNode, type TextbookChapter, type FlowStep, type QA, type RelatedLink } from "@/data/library/pp-textbook/types";
import { useI18n } from "@/lib/i18n";

// Generic, book-agnostic academy chapter renderer. Object chips link only when
// an objectHref is provided AND the slug exists in objectSlugs (else plain chip → no 404s).
export interface AcademyNav {
  base: string;                 // e.g. "/library/pm-academy"
  libraryHref?: string;         // breadcrumb root
  bookLabel: string;            // e.g. "PM"
  objectSlugs?: string[];       // valid object-page slugs (optional)
  objectHref?: (code: string) => string; // builder for object pages (optional)
  prev?: { n: number; titleHe: string };
  next?: { n: number; titleHe: string };
}

const pad = (n: number) => String(n).padStart(2, "0");

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
  if (!paths?.length) return null;
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

function Chips({ items, nav }: { items?: string[]; nav: AcademyNav }) {
  if (!items?.length) return <span className="text-xs text-muted-foreground">—</span>;
  const slugs = new Set(nav.objectSlugs ?? []);
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((it) =>
        nav.objectHref && slugs.has(it) ? (
          <Link key={it} href={nav.objectHref(it)} dir="ltr" className="tech rounded bg-muted px-1.5 py-0.5 text-[11px] font-semibold transition-colors hover:bg-brand/15 hover:text-brand">{it}</Link>
        ) : (
          <span key={it} dir="ltr" className="tech rounded bg-muted px-1.5 py-0.5 text-[11px] font-semibold">{it}</span>
        ),
      )}
    </div>
  );
}

function Bullets({ items, tint }: { items?: string[]; tint?: "red" | "green" | "plain" }) {
  if (!items?.length) return <span className="text-xs text-muted-foreground">—</span>;
  const dot = tint === "red" ? "bg-rose-400" : tint === "green" ? "bg-emerald-400" : "bg-brand/40";
  return (
    <ul className="space-y-1.5">
      {items.map((x, i) => (
        <li key={i} className="flex gap-2"><span className={`mt-2 size-1.5 shrink-0 rounded-full ${dot}`} /><span>{x}</span></li>
      ))}
    </ul>
  );
}

function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5 border-t border-border/30 pt-4 first:border-0 first:pt-0 sm:grid-cols-[170px_1fr] sm:gap-4">
      <p className="flex items-center gap-1.5 text-[14px] font-bold uppercase tracking-wide text-brand">{icon}{label}</p>
      <div className="text-[18px] leading-8 text-slate-700">{children}</div>
    </div>
  );
}

function Explain({ icon, label, tint, children }: { icon: React.ReactNode; label: string; tint: string; children: React.ReactNode }) {
  return (
    <div className={`rounded-xl border p-4 ${tint}`}>
      <p className="flex items-center gap-1.5 text-[14px] font-bold">{icon}{label}</p>
      <p className="mt-1 text-[18px] leading-8">{children}</p>
    </div>
  );
}

function Interview({ items, lang }: { items: QA[]; lang: string }) {
  if (!items?.length) return null;
  return (
    <div className="space-y-2">
      {items.map((q, i) => (
        <details key={i} className="group rounded-lg border border-border/60 bg-card/50 p-3">
          <summary className="flex cursor-pointer items-center gap-2 text-[18px] font-semibold marker:content-['']">
            <HelpCircle className="size-4 shrink-0 text-brand" />
            <span className="flex-1">{q.qHe}</span>
            <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-2 border-t border-border/40 pt-2 text-[18px] leading-8 text-slate-700">{q.aHe}</p>
        </details>
      ))}
    </div>
  );
}

function relatedHref(r: RelatedLink, nav: AcademyNav): string | null {
  const slugs = new Set(nav.objectSlugs ?? []);
  const m = r.href.match(/\/library\/[^/]+\/object\/([^/]+)\/?$/);
  if (m) return nav.objectHref && slugs.has(m[1]) ? r.href : null;
  if (/^\/(library\/[\w-]+\/chapter-\d+|pp-pi|pm|library)/.test(r.href)) return r.href;
  return null;
}

const readMin = (n: LearningNode) => Math.max(1, Math.round(nodeWordCount(n) / 180));

function NodeBody({ n, lang, nav }: { n: LearningNode; lang: string; nav: AcademyNav }) {
  return (
    <div dir="rtl" className="space-y-4 border-t border-border/40 p-5">
      <div className="grid gap-2.5 sm:grid-cols-3">
        <Explain icon={<BookOpen className="size-3.5" />} label={lang === "he" ? "הסבר מנהלים" : "Executive"} tint="border-brand/20 bg-brand-soft/40 text-slate-800">{n.execHe}</Explain>
        <Explain icon={<Brain className="size-3.5" />} label={lang === "he" ? "הסבר למתחילים" : "Beginner"} tint="border-sky-300/40 bg-sky-50/60 text-sky-950">{n.beginnerHe}</Explain>
        <Explain icon={<UserCog className="size-3.5" />} label={lang === "he" ? "הסבר ליועצים" : "Consultant"} tint="border-violet-300/40 bg-violet-50/60 text-violet-950">{n.consultantHe}</Explain>
      </div>
      <Row icon={<Target className="size-3.5" />} label={lang === "he" ? "מטרה עסקית" : "Business purpose"}>{n.purposeHe}</Row>
      <Row icon={<Workflow className="size-3.5" />} label={lang === "he" ? "דוגמת תהליך" : "Process example"}>{n.processExampleHe}</Row>
      <Row icon={<Factory className="size-3.5" />} label={lang === "he" ? "דוגמת CBC" : "CBC example"}>
        <div className="rounded-lg border border-brand/20 bg-brand-soft/50 p-2.5 text-slate-800">{n.cbcHe}</div>
      </Row>
      {n.flow && <Row icon={<GitBranch className="size-3.5" />} label={lang === "he" ? "תרשים תהליך" : "Process flow"}><MiniFlow steps={n.flow} /></Row>}
      <Row icon={<FolderTree className="size-3.5" />} label={lang === "he" ? "ניווט / SPRO" : "SAP navigation / SPRO"}><ConfigTree paths={n.navHe} /></Row>
      <Row icon={<Settings2 className="size-3.5" />} label={lang === "he" ? "קונפיגורציה" : "Configuration"}><Bullets items={n.configHe} /></Row>
      <Row icon={<Boxes className="size-3.5" />} label="T-Codes"><Chips items={n.tcodes} nav={nav} /></Row>
      <Row icon={<Database className="size-3.5" />} label="Tables"><Chips items={n.tables} nav={nav} /></Row>
      <Row icon={<LayoutGrid className="size-3.5" />} label="Fiori Apps"><Chips items={n.fiori} nav={nav} /></Row>
      {n.masterDataHe?.length ? <Row icon={<Database className="size-3.5" />} label={lang === "he" ? "נתוני אב" : "Master data"}><Bullets items={n.masterDataHe} /></Row> : null}
      <Row icon={<AlertTriangle className="size-3.5" />} label={lang === "he" ? "טעויות נפוצות" : "Common mistakes"}><Bullets items={n.mistakesHe} tint="red" /></Row>
      <Row icon={<Wrench className="size-3.5" />} label={lang === "he" ? "פתרון תקלות" : "Troubleshooting"}><Bullets items={n.troubleshootHe} /></Row>
      <Row icon={<CheckCircle2 className="size-3.5" />} label={lang === "he" ? "שיטות מומלצות" : "Best practices"}><Bullets items={n.bestPracticeHe} tint="green" /></Row>
      <Row icon={<HelpCircle className="size-3.5" />} label={lang === "he" ? "שאלות ראיון" : "Interview Q&A"}><Interview items={n.interviewHe} lang={lang} /></Row>
      <Row icon={<Sparkles className="size-3.5" />} label={lang === "he" ? "מסקנות מפתח" : "Key takeaways"}>
        <div className="rounded-lg border border-amber-300/40 bg-amber-50/60 p-2.5"><Bullets items={n.takeawaysHe} /></div>
      </Row>
      {n.relatedHe?.length ? (
        <Row icon={<Link2 className="size-3.5" />} label={lang === "he" ? "נושאים קשורים" : "Related"}>
          <div className="flex flex-wrap gap-1.5">
            {n.relatedHe.map((r, i) => {
              const href = relatedHref(r, nav);
              return href ? (
                <Link key={i} href={href} className="rounded-lg bg-brand/10 px-2 py-1 text-[12px] font-semibold text-brand transition-opacity hover:opacity-80">{r.labelHe}</Link>
              ) : (
                <span key={i} className="rounded-lg bg-muted px-2 py-1 text-[12px] font-semibold text-muted-foreground">{r.labelHe}</span>
              );
            })}
          </div>
        </Row>
      ) : null}
      {n.children?.length ? (
        <div className="border-t border-border/30 pt-3">
          <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-brand"><FolderTree className="size-3.5" />{lang === "he" ? "תתי-סעיפים (מבנה הספר)" : "Subsections"}</p>
          <div className="space-y-2">{n.children.map((c) => <NodeCard key={c.id} n={c} lang={lang} nav={nav} nested />)}</div>
        </div>
      ) : null}
    </div>
  );
}

function NodeCard({ n, lang, nav, nested, isOpen, onToggle }: { n: LearningNode; lang: string; nav: AcademyNav; nested?: boolean; isOpen?: boolean; onToggle?: () => void }) {
  const [localOpen, setLocalOpen] = useState(false);
  const open = isOpen ?? localOpen;
  const toggle = onToggle ?? (() => setLocalOpen((v) => !v));
  return (
    <section id={`sub-${n.id}`} className={nested ? "overflow-hidden rounded-xl border border-border/60 bg-card/50" : "glass scroll-mt-24 overflow-hidden rounded-2xl"}>
      <button onClick={toggle} className={`flex w-full items-center gap-2.5 text-start transition-colors hover:bg-brand/5 ${nested ? "p-2.5" : "p-4"}`}>
        <span dir="ltr" className={`tech shrink-0 rounded-lg font-bold ${nested ? "bg-brand/10 px-1.5 py-0.5 text-[11px] text-brand" : "bg-gradient-to-br from-brand to-brand-dark px-2 py-1 text-xs text-brand-foreground"}`}>{n.id}</span>
        <span className="min-w-0 flex-1">
          <span className={`block font-bold ${nested ? "text-base leading-tight" : "text-lg"}`}>{n.titleHe}</span>
          <span dir="ltr" className={`text-muted-foreground ${nested ? "text-xs" : "text-sm"}`}>{n.titleEn}</span>
        </span>
        <span className="hidden shrink-0 items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground sm:flex"><Clock className="size-3" />{readMin(n)} {lang === "he" ? "דק'" : "min"}</span>
        {n.children?.length ? <span className="hidden shrink-0 rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-semibold text-brand sm:inline">{n.children.length} {lang === "he" ? "תתי-סעיפים" : "subs"}</span> : null}
        <ChevronDown className={`size-5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.24 }} className="overflow-hidden">
            <NodeBody n={n} lang={lang} nav={nav} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function AcademyChapter({ chapter, nav }: { chapter: TextbookChapter; nav: AcademyNav }) {
  const { lang } = useI18n();
  const [open, setOpen] = useState<Set<string>>(() => new Set(chapter.subchapters[0] ? [chapter.subchapters[0].id] : []));
  const ids = chapter.subchapters.map((s) => s.id);
  const toggle = (id: string) => setOpen((p) => { const x = new Set(p); x.has(id) ? x.delete(id) : x.add(id); return x; });
  const totalMin = chapter.subchapters.reduce((s, x) => s + readMin(x) + (x.children?.reduce((a, c) => a + readMin(c), 0) ?? 0), 0);
  const readCount = ids.filter((id) => open.has(id)).length;
  const pct = ids.length ? Math.round((readCount / ids.length) * 100) : 0;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-5xl space-y-5 p-4">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href={nav.libraryHref ?? "/library/"} className="text-brand hover:underline">{lang === "he" ? "ספרייה" : "Library"}</Link><span>/</span>
        <Link href={`${nav.base}/`} className="text-brand hover:underline">{nav.bookLabel}</Link><span>/</span>
        <span>{lang === "he" ? `פרק ${chapter.n}` : `Chapter ${chapter.n}`}</span>
      </nav>

      <section className="glass rounded-2xl p-5 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
          <GraduationCap className="size-3.5" />Chapter {chapter.n} · {chapter.subchapters.length} {lang === "he" ? "תת-פרקים" : "subchapters"} · ~{totalMin} {lang === "he" ? "דק'" : "min"}
        </span>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">{chapter.titleHe}</h1>
        <p dir="ltr" className="text-sm text-muted-foreground">{chapter.titleEn}</p>
      </section>

      <div id="learning" className="space-y-3">
        <section dir="rtl" className="glass rounded-2xl p-5">
          {chapter.introHe && <p className="text-[18px] leading-8 text-slate-700">{chapter.introHe}</p>}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button onClick={() => setOpen(new Set(ids))} className="flex items-center gap-1.5 rounded-lg border border-brand/25 bg-brand-soft/50 px-2.5 py-1 text-[11px] font-semibold text-brand transition-colors hover:bg-brand/10"><Maximize2 className="size-3" />{lang === "he" ? "פתח הכל" : "Expand all"}</button>
            <button onClick={() => setOpen(new Set())} className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1 text-[11px] font-semibold text-muted-foreground transition-colors hover:bg-muted"><Minimize2 className="size-3" />{lang === "he" ? "סגור הכל" : "Collapse all"}</button>
            <div className="ms-auto flex items-center gap-2">
              <span className="text-[11px] font-semibold text-muted-foreground">{readCount}/{ids.length}</span>
              <div className="h-1.5 w-28 overflow-hidden rounded-full bg-muted"><motion.div className="h-full rounded-full bg-gradient-to-r from-brand to-brand-dark" animate={{ width: `${pct}%` }} transition={{ duration: 0.3 }} /></div>
            </div>
          </div>
        </section>
        {chapter.subchapters.map((s) => <NodeCard key={s.id} n={s} lang={lang} nav={nav} isOpen={open.has(s.id)} onToggle={() => toggle(s.id)} />)}
      </div>

      <nav className="flex items-center justify-between gap-2">
        {nav.prev ? (
          <Link href={`${nav.base}/chapter-${pad(nav.prev.n)}/`} className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-card/60 p-3 text-sm hover:border-brand">
            <ArrowRight className="size-4 rtl:rotate-180" /><span dir="rtl" className="truncate"><span className="text-[10px] text-muted-foreground">{lang === "he" ? "הקודם" : "Prev"}</span><br />{nav.prev.n}. {nav.prev.titleHe}</span>
          </Link>
        ) : <span className="flex-1" />}
        {nav.next ? (
          <Link href={`${nav.base}/chapter-${pad(nav.next.n)}/`} className="flex flex-1 items-center justify-end gap-2 rounded-xl border border-border bg-card/60 p-3 text-end text-sm hover:border-brand">
            <span dir="rtl" className="truncate"><span className="text-[10px] text-muted-foreground">{lang === "he" ? "הבא" : "Next"}</span><br />{nav.next.n}. {nav.next.titleHe}</span><ArrowLeft className="size-4 rtl:rotate-180" />
          </Link>
        ) : <span className="flex-1" />}
      </nav>
    </motion.div>
  );
}
