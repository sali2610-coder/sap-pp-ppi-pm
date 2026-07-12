"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Layers } from "lucide-react";
import { BookReader } from "@/components/book-reader";
import { SectionSpread } from "@/components/section-spread";
import book10 from "@/data/library/book10-full.json";
import { useI18n } from "@/lib/i18n";
import { playPing } from "@/lib/sound";

interface Section { id: string; title: string; en: string; he: string }
interface Chapter { n: number; title: string; pages: number[]; translated?: boolean; sections: Section[] }

const DATA = book10 as { book: string; pages: number; chapters: Chapter[] };


function ChapterBlock({ ch }: { ch: Chapter }) {
  const [open, setOpen] = useState(ch.n === 1);
  useEffect(() => {
    const openIfHash = () => { if (typeof window !== "undefined" && window.location.hash === `#ch-${ch.n}`) setOpen(true); };
    openIfHash();
    window.addEventListener("hashchange", openIfHash);
    return () => window.removeEventListener("hashchange", openIfHash);
  }, [ch.n]);

  return (
    <section id={`ch-${ch.n}`} data-chapter={ch.n} className="glass scroll-mt-24 overflow-hidden rounded-2xl">
      <button onClick={() => { playPing(); setOpen((v) => !v); }} className="flex w-full items-center gap-3 p-4 text-start">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-brand-foreground shadow-lg shadow-brand/30">
          <Layers className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-bold">{ch.n}. {ch.title}</span>
          <span className="flex flex-wrap items-center gap-x-3 text-xs text-muted-foreground">
            <span>pp. {ch.pages[0]}–{ch.pages[1]}</span>
            <span>{ch.sections.length} sections</span>
          </span>
        </span>
        <span className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${ch.translated ? "bg-status-done/15 text-status-done" : "bg-status-in-analysis/15 text-status-in-analysis"}`}>
          {ch.translated ? "EN · עברית" : "EN ✓ · עברית בהכנה"}
        </span>
        <ChevronDown className={`size-5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden px-3 pb-4">
            <div className="paper relative rounded-xl p-4 sm:p-6">
              {ch.sections.map((s) => <SectionSpread key={s.id} s={s} />)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default function Book9Page() {
  const { lang } = useI18n();
  const translatedChapters = DATA.chapters.filter((c) => c.translated).length;
  const totalSections = DATA.chapters.reduce((s, c) => s + c.sections.length, 0);
  return (
    <div className="space-y-6">
      <BookReader
        bookId="book10"
        title={DATA.book}
        subtitle="IBP · 923 pages"
        chapters={DATA.chapters.map((c) => ({ n: c.n, title: c.title }))}
        note={lang === "he"
          ? "מצג ספר דו-עמודי: עמוד שמאל — אנגלית מקורית מתוך ה-PDF; עמוד ימין — תרגום עברי מקצועי, מיושר במקביל. מזהי SAP נשמרו באנגלית."
          : "Dual-page spread: left — original English from the PDF; right — professional Hebrew, aligned in parallel. SAP identifiers verbatim EN."}
        stats={[
          { label: lang === "he" ? "פרקים מתורגמים" : "chapters translated", value: `${translatedChapters}/${DATA.chapters.length}` },
          { label: lang === "he" ? "סעיפים" : "sections", value: totalSections },
        ]}
      >
        <div className="space-y-4">
          {DATA.chapters.map((ch) => <ChapterBlock key={ch.n} ch={ch} />)}
        </div>
      </BookReader>

      <p className="text-center text-xs text-muted-foreground">
        {lang === "he"
          ? "הטקסט חולץ מקובץ ה-PDF המקורי (pdf-parse). תרגום עברי מקצועי נכתב עבור הארגון."
          : "Text extracted from the original PDF (pdf-parse). Hebrew professionally translated for the organization."}
      </p>
    </div>
  );
}
