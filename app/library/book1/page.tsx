"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BookOpen, ChevronDown, FileText, Image as ImageIcon, Layers, ZoomIn, Download, X } from "lucide-react";
import book1 from "@/data/library/book1-full.json";
import figuresData from "@/data/library/book1-figures.json";
import { useI18n } from "@/lib/i18n";
import { playPing } from "@/lib/sound";
import { ChapterDiagram } from "@/components/book1-diagrams";
import { BookReader } from "@/components/book-reader";

interface Section { id: string; title: string; en: string; he: string }
interface Chapter { n: number; title: string; pages: number[]; translated?: boolean; sections: Section[] }
interface Figure { page: number; file: string; w: number; h: number }

const DATA = book1 as { book: string; pages: number; chapters: Chapter[] };
const FIGS = figuresData as Record<string, Figure[]>;

// One figure rendered across the spread (book-style), bilingual caption.
// aspectRatio reserves the box so lazy images load + never collapse to 0-height.
function FigurePlate({ fig, onZoom }: { fig: Figure; onZoom: (f: Figure) => void }) {
  return (
    <figure className="group mx-auto my-3 max-w-xl overflow-hidden rounded-xl border border-border/60 bg-white p-2 shadow-sm transition-shadow hover:shadow-md">
      <button onClick={() => onZoom(fig)} className="relative block w-full overflow-hidden rounded-lg" style={{ aspectRatio: `${fig.w} / ${fig.h}` }} aria-label="הגדל איור">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={fig.file} alt={`SAP figure p.${fig.page}`} loading="lazy" width={fig.w} height={fig.h} className="absolute inset-0 size-full object-contain transition-transform duration-500 group-hover:scale-[1.03]" />
        <span className="absolute inset-0 flex items-center justify-center bg-slate-900/0 opacity-0 transition group-hover:bg-slate-900/15 group-hover:opacity-100">
          <span className="grid size-9 place-items-center rounded-full bg-white/90 text-slate-700 shadow-lg"><ZoomIn className="size-4" /></span>
        </span>
      </button>
      <figcaption className="mt-1 flex items-center justify-between px-1 text-[10px] text-muted-foreground">
        <span dir="ltr">Source p.{fig.page}</span>
        <a href={fig.file} download className="flex items-center gap-1 rounded px-1 py-0.5 font-semibold text-brand hover:bg-brand-soft"><Download className="size-3" /> הורד</a>
        <span dir="rtl">איור · עמ' {fig.page}</span>
      </figcaption>
    </figure>
  );
}

// Full-screen image lightbox (zoom / download / close).
function Lightbox({ fig, onClose }: { fig: Figure; onClose: () => void }) {
  useEffect(() => { const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h); }, [onClose]);
  return (
    <div onClick={onClose} className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-3 bg-slate-950/85 p-4 backdrop-blur-sm" style={{ animation: "fadeUp .2s ease both" }}>
      <div className="flex w-full max-w-5xl items-center justify-between text-white">
        <span className="text-xs font-semibold" dir="ltr">SAP figure · page {fig.page}</span>
        <div className="flex items-center gap-2">
          <a href={fig.file} download onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-xs font-bold hover:bg-white/25"><Download className="size-4" /> הורד</a>
          <button onClick={onClose} className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-xs font-bold hover:bg-white/25"><X className="size-4" /> סגור</button>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={fig.file} alt={`SAP figure p.${fig.page}`} onClick={(e) => e.stopPropagation()} className="max-h-[82vh] max-w-full rounded-xl bg-white object-contain shadow-2xl" />
    </div>
  );
}

// A paired section row — English page (ltr) | Hebrew page (rtl), aligned.
function SectionSpread({ s }: { s: Section }) {
  return (
    <div className="border-t border-border/40 py-4 first:border-t-0">
      <div className="mb-2 flex items-center gap-2 px-1">
        <span className="tech rounded-md bg-brand/10 px-2 py-0.5 text-xs font-bold text-brand">{s.id}</span>
        <span className="text-sm font-semibold">{s.title}</span>
      </div>
      <div className="grid gap-0 sm:grid-cols-[1fr_1px_1fr]">
        {/* English page */}
        <div dir="ltr" className="px-4 text-start">
          <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">English (original)</p>
          <p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-slate-700">{s.en}</p>
        </div>
        {/* spine */}
        <div className="book-spine hidden sm:block" aria-hidden />
        {/* Hebrew page */}
        <div dir="rtl" className="px-4 text-start">
          <p className="text-[11px] font-bold uppercase tracking-wide text-brand">עברית · תרגום מקצועי</p>
          {s.he ? (
            <p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-slate-800">{s.he}</p>
          ) : (
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-status-in-analysis" />
              תרגום בהכנה — בקש &quot;תרגם פרק {s.id.split(".")[0]}&quot;.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ChapterBlock({ ch, onZoom }: { ch: Chapter; onZoom: (f: Figure) => void }) {
  const { lang } = useI18n();
  const [open, setOpen] = useState(ch.n === 1);
  const figs = FIGS[String(ch.n)] ?? [];

  useEffect(() => {
    const openIfHash = () => { if (typeof window !== "undefined" && window.location.hash === `#ch-${ch.n}`) setOpen(true); };
    openIfHash();
    window.addEventListener("hashchange", openIfHash);
    return () => window.removeEventListener("hashchange", openIfHash);
  }, [ch.n]);

  return (
    <section id={`ch-${ch.n}`} data-chapter={ch.n} className="glass scroll-mt-24 overflow-hidden rounded-2xl">
      <button
        onClick={() => {
          playPing();
          setOpen((v) => !v);
        }}
        className="flex w-full items-center gap-3 p-4 text-start"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-brand-foreground shadow-lg shadow-brand/30">
          <Layers className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-bold">
            {ch.n}. {ch.title}
          </span>
          <span className="flex flex-wrap items-center gap-x-3 text-xs text-muted-foreground">
            <span>pp. {ch.pages[0]}–{ch.pages[1]}</span>
            <span>{ch.sections.length} sections</span>
            <span className="flex items-center gap-1">
              <ImageIcon className="size-3" />
              {figs.length} figures
            </span>
          </span>
        </span>
        <span className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${ch.translated ? "bg-status-done/15 text-status-done" : "bg-status-in-analysis/15 text-status-in-analysis"}`}>
          {ch.translated ? "EN · עברית" : "EN ✓ · עברית בהכנה"}
        </span>
        <ChevronDown className={`size-5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden px-3 pb-4"
          >
            <ChapterDiagram n={ch.n} />

            {/* the book spread */}
            <div className="paper relative rounded-xl p-4 sm:p-6">
              {/* figure plates band */}
              {figs.length > 0 && (
                <details open className="mb-3 rounded-lg border border-border/50 bg-white/60 p-2">
                  <summary className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-brand">
                    <ImageIcon className="size-3.5" />
                    {lang === "he" ? `איורים מקוריים מהספר (${figs.length})` : `Original figures from the book (${figs.length})`}
                  </summary>
                  <div className="mt-2 grid gap-3 sm:grid-cols-2">
                    {figs.map((f, i) => (
                      <FigurePlate key={i} fig={f} onZoom={onZoom} />
                    ))}
                  </div>
                </details>
              )}

              {ch.sections.map((s) => (
                <SectionSpread key={s.id} s={s} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default function Book1Page() {
  const { lang } = useI18n();
  const [lb, setLb] = useState<Figure | null>(null);
  const translatedChapters = DATA.chapters.filter((c) => c.translated).length;
  const totalSections = DATA.chapters.reduce((s, c) => s + c.sections.length, 0);
  const totalFigures = Object.values(FIGS).reduce((s, a) => s + a.length, 0);
  return (
    <div className="space-y-6">
      <Link href="/library/" className="inline-flex items-center gap-1.5 text-sm text-brand hover:underline">
        <ArrowRight className="size-4 rtl:rotate-180" />
        {lang === "he" ? "חזרה לספרייה" : "Back to library"}
      </Link>

      <section className="space-y-3 text-center animate-float-in">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
          <BookOpen className="size-3.5" />
          Book #1 · 729 pages · PM
        </span>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{DATA.book}</h1>
        <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
          {lang === "he"
            ? "מצג ספר דו-עמודי: עמוד שמאל — אנגלית מקורית עם איורי המדריך; עמוד ימין — תרגום עברי מקצועי, מיושר במקביל."
            : "Dual-page book spread: left page — original English with the manual's figures; right page — professional Hebrew, aligned in parallel."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-lg border border-border bg-card px-2.5 py-1">{translatedChapters}/9 {lang === "he" ? "פרקים מתורגמים" : "chapters translated"}</span>
          <span className="rounded-lg border border-border bg-card px-2.5 py-1">{totalSections} {lang === "he" ? "סעיפים" : "sections"}</span>
          <span className="rounded-lg border border-border bg-card px-2.5 py-1">
            <ImageIcon className="me-1 inline size-3" />
            {totalFigures} {lang === "he" ? "איורים שחולצו" : "figures extracted"}
          </span>
          <span className="rounded-lg border border-border bg-card px-2.5 py-1">
            <FileText className="me-1 inline size-3" />
            {lang === "he" ? "כל 729 העמודים" : "all 729 pages"}
          </span>
        </div>
      </section>

      <BookReader bookId="book1" title={DATA.book} subtitle="PM · 729 pages" chapters={DATA.chapters.map((c) => ({ n: c.n, title: c.title }))}>
        <div className="space-y-4">
          {DATA.chapters.map((ch) => (
            <ChapterBlock key={ch.n} ch={ch} onZoom={setLb} />
          ))}
        </div>
      </BookReader>

      {lb && <Lightbox fig={lb} onClose={() => setLb(null)} />}

      <p className="text-center text-xs text-muted-foreground">
        {lang === "he"
          ? "טקסט ואיורים חולצו מקובץ ה-PDF המקורי (poppler/pdfimages). תרגום עברי מקצועי נכתב עבור CBC."
          : "Text & figures extracted from the original PDF (poppler/pdfimages). Hebrew professionally translated for CBC."}
      </p>
    </div>
  );
}
