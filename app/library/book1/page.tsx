"use client";

import { useState } from "react";
import book1 from "@/data/library/book1-full.json";
import figuresData from "@/data/library/book1-figures.json";
import { useI18n } from "@/lib/i18n";
import { ChapterDiagram } from "@/components/book1-diagrams";
import { BookReader } from "@/components/book-reader";
import { ChapterReader } from "@/components/chapter-reader";
import { FigureViewer } from "@/components/figure-viewer";
import { AskAI } from "@/components/ask-ai";

interface Section { id: string; title: string; en: string; he: string }
interface Chapter { n: number; title: string; pages: number[]; translated?: boolean; sections: Section[] }
interface Figure { page: number; file: string; w: number; h: number }

const DATA = book1 as { book: string; pages: number; chapters: Chapter[] };
const FIGS = figuresData as Record<string, Figure[]>;

// One figure rendered across the spread (book-style), bilingual caption.
// aspectRatio reserves the box so lazy images load + never collapse to 0-height.



export default function Book1Page() {
  const { lang } = useI18n();
  const [viewer, setViewer] = useState<{ figs: Figure[]; index: number } | null>(null);
  const translatedChapters = DATA.chapters.filter((c) => c.translated).length;
  const totalSections = DATA.chapters.reduce((s, c) => s + c.sections.length, 0);
  const totalFigures = Object.values(FIGS).reduce((s, a) => s + a.length, 0);
  return (
    <div className="space-y-6">
      <BookReader
        bookId="book1"
        title={DATA.book}
        subtitle="PM · 729 pages"
        chapters={DATA.chapters.map((c) => ({ n: c.n, title: c.title }))}
        note={lang === "he"
          ? "מצג ספר דו-עמודי: עמוד שמאל — אנגלית מקורית עם איורי המדריך; עמוד ימין — תרגום עברי מקצועי, מיושר במקביל."
          : "Dual-page book spread: left page — original English with the manual's figures; right page — professional Hebrew, aligned in parallel."}
        stats={[
          { label: lang === "he" ? "פרקים מתורגמים" : "chapters translated", value: `${translatedChapters}/9` },
          { label: lang === "he" ? "סעיפים" : "sections", value: totalSections },
          { label: lang === "he" ? "איורים שחולצו" : "figures extracted", value: totalFigures },
        ]}
      >
        <div className="space-y-4">
          {DATA.chapters.map((ch) => (
            <ChapterReader key={ch.n} ch={ch} figures={FIGS[String(ch.n)] ?? []} onOpenFigure={(figs, i) => setViewer({ figs, index: i })} diagram={<ChapterDiagram n={ch.n} />} />
          ))}
        </div>
      </BookReader>

      <FigureViewer open={!!viewer} figs={viewer?.figs ?? []} index={viewer?.index ?? 0} onIndex={(i) => setViewer((v) => (v ? { ...v, index: i } : v))} onClose={() => setViewer(null)} />

      <p className="text-center text-xs text-muted-foreground">
        {lang === "he"
          ? "טקסט ואיורים חולצו מקובץ ה-PDF המקורי (poppler/pdfimages). תרגום עברי מקצועי נכתב עבור הארגון."
          : "Text & figures extracted from the original PDF (poppler/pdfimages). Hebrew professionally translated for the organization."}
      </p>
      <AskAI variant="inline" bookId="book1" className="mt-6" />
    </div>
  );
}
