"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BookOpen, ChevronDown, FileText, Image as ImageIcon, Layers } from "lucide-react";
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
function FigurePlate({ fig }: { fig: Figure }) {
  return (
    <figure className="mx-auto my-3 max-w-xl rounded-lg border border-border/60 bg-white p-2 shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={fig.file} alt={`SAP figure p.${fig.page}`} loading="lazy" className="mx-auto h-auto w-full rounded" />
      <figcaption className="mt-1 flex items-center justify-between px-1 text-[10px] text-muted-foreground">
        <span dir="ltr">Source p.{fig.page}</span>
        <span dir="rtl">איור · עמ' {fig.page}</span>
      </figcaption>
    </figure>
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

function ChapterBlock({ ch }: { ch: Chapter }) {
  const { lang } = useI18n();
  const [open, setOpen] = useState(ch.n === 1);
  const figs = FIGS[String(ch.n)] ?? [];

  return (
    <section className="glass overflow-hidden rounded-2xl">
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
                <details className="mb-3 rounded-lg border border-border/50 bg-white/60 p-2">
                  <summary className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-brand">
                    <ImageIcon className="size-3.5" />
                    {lang === "he" ? `איורים מקוריים מהספר (${figs.length})` : `Original figures from the book (${figs.length})`}
                  </summary>
                  <div className="mt-2 grid gap-3 sm:grid-cols-2">
                    {figs.map((f, i) => (
                      <FigurePlate key={i} fig={f} />
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
          Book #2 · 1087 pages · PP / PP-PI
        </span>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{DATA.book}</h1>
        <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
          {lang === "he"
            ? "מצג ספר דו-עמודי: עמוד שמאל — אנגלית מקורית עם איורי המדריך; עמוד ימין — תרגום עברי מקצועי, מיושר במקביל."
            : "Dual-page book spread: left page — original English with the manual's figures; right page — professional Hebrew, aligned in parallel."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-lg border border-border bg-card px-2.5 py-1">{translatedChapters}/15 {lang === "he" ? "פרקים מתורגמים" : "chapters translated"}</span>
          <span className="rounded-lg border border-border bg-card px-2.5 py-1">{totalSections} {lang === "he" ? "סעיפים" : "sections"}</span>
          <span className="rounded-lg border border-border bg-card px-2.5 py-1">
            <ImageIcon className="me-1 inline size-3" />
            {totalFigures} {lang === "he" ? "איורים שחולצו" : "figures extracted"}
          </span>
          <span className="rounded-lg border border-border bg-card px-2.5 py-1">
            <FileText className="me-1 inline size-3" />
            {lang === "he" ? "כל 1087 העמודים" : "all 1087 pages"}
          </span>
        </div>
      </section>

      <div className="space-y-4">
        {DATA.chapters.map((ch) => (
          <ChapterBlock key={ch.n} ch={ch} />
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {lang === "he"
          ? "טקסט ואיורים חולצו מקובץ ה-PDF המקורי (poppler/pdfimages). תרגום עברי מקצועי נכתב עבור CBC."
          : "Text & figures extracted from the original PDF (poppler/pdfimages). Hebrew professionally translated for CBC."}
      </p>
    </div>
  );
}
