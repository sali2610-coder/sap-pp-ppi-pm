"use client";

import { BookReader } from "@/components/book-reader";
import { ChapterReader } from "@/components/chapter-reader";
import { AskAI } from "@/components/ask-ai";
import book10 from "@/data/library/book10-full.json";
import { useI18n } from "@/lib/i18n";

interface Section { id: string; title: string; en: string; he: string }
interface Chapter { n: number; title: string; pages: number[]; translated?: boolean; sections: Section[] }

const DATA = book10 as { book: string; pages: number; chapters: Chapter[] };



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
          {DATA.chapters.map((ch) => <ChapterReader key={ch.n} ch={ch} />)}
        </div>
      </BookReader>

      <p className="text-center text-xs text-muted-foreground">
        {lang === "he"
          ? "הטקסט חולץ מקובץ ה-PDF המקורי (pdf-parse). תרגום עברי מקצועי נכתב עבור הארגון."
          : "Text extracted from the original PDF (pdf-parse). Hebrew professionally translated for the organization."}
      </p>
      <AskAI variant="inline" bookId="book10" className="mt-6" />
    </div>
  );
}
