"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Image as ImageIcon, Layers, ZoomIn, Download } from "lucide-react";
import { BookReader } from "@/components/book-reader";
import { SectionSpread } from "@/components/section-spread";
import { FigureViewer } from "@/components/figure-viewer";
import book2 from "@/data/library/book2-full.json";
import figuresData from "@/data/library/book2-figures.json";
import { useI18n } from "@/lib/i18n";
import { playPing } from "@/lib/sound";

interface Section { id: string; title: string; en: string; he: string }
interface Chapter { n: number; title: string; pages: number[]; translated?: boolean; sections: Section[] }
interface Figure { page: number; file: string; w: number; h: number }

const DATA = book2 as { book: string; pages: number; chapters: Chapter[] };
const FIGS = figuresData as Record<string, Figure[]>;

// One figure rendered across the spread (book-style), bilingual caption.
function FigurePlate({ fig, onZoom }: { fig: Figure; onZoom: () => void }) {
  return (
    <figure className="group mx-auto my-3 max-w-xl overflow-hidden rounded-xl border border-border/60 bg-surface p-2 shadow-sm transition-shadow hover:shadow-md">
      <button onClick={onZoom} className="relative block w-full overflow-hidden rounded-lg" style={{ aspectRatio: `${fig.w} / ${fig.h}` }} aria-label="הגדל איור">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={fig.file} alt={`SAP figure p.${fig.page}`} loading="lazy" width={fig.w} height={fig.h} className="absolute inset-0 size-full object-contain transition-transform duration-500 group-hover:scale-[1.03]" />
        <span className="absolute inset-0 flex items-center justify-center bg-slate-900/0 opacity-0 transition group-hover:bg-slate-900/15 group-hover:opacity-100">
          <span className="grid size-9 place-items-center rounded-full bg-surface/90 text-ink-2 shadow-lg"><ZoomIn className="size-4" /></span>
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


function ChapterBlock({ ch, onOpen }: { ch: Chapter; onOpen: (figs: Figure[], i: number) => void }) {
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
            {/* the book spread */}
            <div className="paper relative rounded-xl p-4 sm:p-6">
              {/* figure plates band */}
              {figs.length > 0 && (
                <details open className="mb-3 rounded-lg border border-border/50 bg-surface/60 p-2">
                  <summary className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-brand">
                    <ImageIcon className="size-3.5" />
                    {lang === "he" ? `איורים מקוריים מהספר (${figs.length})` : `Original figures from the book (${figs.length})`}
                  </summary>
                  <div className="mt-2 grid gap-3 sm:grid-cols-2">
                    {figs.map((f, i) => (
                      <FigurePlate key={i} fig={f} onZoom={() => onOpen(figs, i)} />
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

export default function Book2Page() {
  const { lang } = useI18n();
  const [viewer, setViewer] = useState<{ figs: Figure[]; index: number } | null>(null);
  const translatedChapters = DATA.chapters.filter((c) => c.translated).length;
  const totalSections = DATA.chapters.reduce((s, c) => s + c.sections.length, 0);
  const totalFigures = Object.values(FIGS).reduce((s, a) => s + a.length, 0);
  return (
    <div className="space-y-6">
      <BookReader
        bookId="book2"
        title={DATA.book}
        subtitle="PP / PP-PI · 1087 pages"
        chapters={DATA.chapters.map((c) => ({ n: c.n, title: c.title }))}
        note={lang === "he"
          ? "מצג ספר דו-עמודי: עמוד שמאל — אנגלית מקורית עם איורי המדריך; עמוד ימין — תרגום עברי מקצועי, מיושר במקביל."
          : "Dual-page book spread: left page — original English with the manual's figures; right page — professional Hebrew, aligned in parallel."}
        stats={[
          { label: lang === "he" ? "פרקים מתורגמים" : "chapters translated", value: `${translatedChapters}/15` },
          { label: lang === "he" ? "סעיפים" : "sections", value: totalSections },
          { label: lang === "he" ? "איורים שחולצו" : "figures extracted", value: totalFigures },
        ]}
      >
        <div className="space-y-4">
          {DATA.chapters.map((ch) => (
            <ChapterBlock key={ch.n} ch={ch} onOpen={(figs, i) => setViewer({ figs, index: i })} />
          ))}
        </div>
      </BookReader>

      {viewer && <FigureViewer figs={viewer.figs} index={viewer.index} onIndex={(i) => setViewer((v) => (v ? { ...v, index: i } : v))} onClose={() => setViewer(null)} />}

      <p className="text-center text-xs text-muted-foreground">
        {lang === "he"
          ? "טקסט ואיורים חולצו מקובץ ה-PDF המקורי (poppler/pdfimages). תרגום עברי מקצועי נכתב עבור הארגון."
          : "Text & figures extracted from the original PDF (poppler/pdfimages). Hebrew professionally translated for the organization."}
      </p>
    </div>
  );
}
