/* ============================================================================
   PROJECT NEO · what the old library landing said about each book.
   ----------------------------------------------------------------------------
   SERVER ONLY, build time. The pre-NEO landing of every book (/library/bookN/,
   app/library/bookN/page.tsx + components/book-reader.tsx + chapter-reader.tsx)
   showed facts the NEO book page did not: the shelf's Hebrew title and summary
   (data/library.ts), a reading estimate, the translated-chapter count, and per
   chapter its page range, section count, extracted-figure count and
   translation state (data/library/bookN-full.json, bookN-figures.json). They
   are read here from those same files, the same way, so the NEO book page can
   carry them. The provenance sentences are the old pages' own, verbatim.

   The JSON files are read from disk rather than imported: together they are
   about 20 MB, and only a handful of numbers from each reach the page.
   ========================================================================== */

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { LIBRARY } from "@/data/library";
import { identityOf } from "@/lib/book-identity";

export interface LandingChapter {
  n: number;
  /** As the old landing printed it: the English title (Hebrew for book8). */
  title: string;
  titleEn: string | null;
  pages: [number, number] | null;
  sections: number;
  figures: number;
  /** null when the book carries no translation flag. */
  translated: boolean | null;
  intro: string | null;
  /** book8 only: every unit's id with its Hebrew and English title. */
  units: [id: string, he: string, en: string][];
}

export interface BookLanding {
  titleHe: string | null;
  titleEn: string | null;
  summaryHe: string | null;
  /** components/book-reader.tsx: round(pages × 2 / 60), "~2 min/page". */
  readH: number | null;
  translated: [done: number, total: number] | null;
  sections: number;
  figures: number | null;
  /** The provenance line the old landing printed under the book. */
  notes: string[];
  chapters: LandingChapter[];
}

const DIR = path.join(process.cwd(), "data", "library");
const readJson = (file: string): unknown => {
  const f = path.join(DIR, file);
  return existsSync(f) ? JSON.parse(readFileSync(f, "utf8")) : null;
};

/* The old pages' own provenance sentences (app/library/bookN/page.tsx). */
const NOTE_PDFIMAGES = "טקסט ואיורים חולצו מקובץ ה-PDF המקורי (poppler/pdfimages). תרגום עברי מקצועי נכתב עבור הארגון.";
const NOTE_PDFPARSE = "הטקסט חולץ מקובץ ה-PDF המקורי (pdf-parse). תרגום עברי מקצועי נכתב עבור הארגון.";
const NOTE_ACADEMY = "ספר עברי מלא — כל יחידת-לימוד בנויה ב-18 מקטעים מנקודת-מבט של משתמש עסקי המתחזק ציוד בקו-מילוי. מזהי SAP במקור באנגלית.";
const NOTE_ACADEMY_K = "עברית מלאה · 18 מקטעים";
const NOTE_ACADEMY_SRC = "התוכן נכתב במקור בעברית בתבנית 18 המקטעים של NEO Academy (מקור pmu-textbook), מוצג כאן כספר #8 לצד ספרי העיון. מזהי SAP נשמרו באנגלית.";

interface ProseChapter { n: number; title: string; pages?: number[]; translated?: boolean; sections?: unknown[] }
interface UnitSection { id: string; titleHe: string; titleEn: string }
interface UnitChapter { n: number; titleHe: string; titleEn: string; introHe?: string; sections?: UnitSection[] }

const cache = new Map<string, BookLanding>();

export function bookLanding(bookId: string): BookLanding {
  const hit = cache.get(bookId);
  if (hit) return hit;
  const shelfId = identityOf(bookId)?.shelfId ?? null;
  const lib = shelfId ? LIBRARY.find((b) => b.id === shelfId) : undefined;
  const full = readJson(`${bookId}-full.json`) as { chapters?: (ProseChapter & UnitChapter)[] } | null;
  const figs = readJson(`${bookId}-figures.json`) as Record<string, unknown[]> | null;
  const raw = full?.chapters ?? [];
  const units = raw.some((c) => typeof c.titleHe === "string" && Array.isArray(c.sections));

  const chapters: LandingChapter[] = raw.map((c) => {
    const pg = Array.isArray(c.pages) && c.pages.length >= 2 ? [Number(c.pages[0]), Number(c.pages[1])] as [number, number] : null;
    const secs = Array.isArray(c.sections) ? c.sections : [];
    return {
      n: c.n,
      title: units ? c.titleHe : c.title,
      titleEn: units ? c.titleEn : null,
      pages: pg,
      sections: secs.length,
      figures: Array.isArray(figs?.[String(c.n)]) ? figs![String(c.n)].length : 0,
      translated: typeof c.translated === "boolean" ? c.translated : null,
      intro: units ? (c.introHe ?? null) : null,
      units: units ? (secs as UnitSection[]).map((s) => [s.id, s.titleHe, s.titleEn] as [string, string, string]) : [],
    };
  });
  const flagged = chapters.filter((c) => c.translated !== null);
  const out: BookLanding = {
    titleHe: lib?.titleHe ?? null,
    titleEn: lib?.title ?? null,
    summaryHe: lib?.summaryHe ?? null,
    readH: lib?.pages ? Math.max(1, Math.round((lib.pages * 2) / 60)) : null,
    translated: flagged.length ? [flagged.filter((c) => c.translated).length, chapters.length] : null,
    sections: chapters.reduce((s, c) => s + c.sections, 0),
    figures: figs ? Object.values(figs).reduce((s, a) => s + (Array.isArray(a) ? a.length : 0), 0) : null,
    notes: units ? [NOTE_ACADEMY, NOTE_ACADEMY_K, NOTE_ACADEMY_SRC] : figs ? [NOTE_PDFIMAGES] : raw.length ? [NOTE_PDFPARSE] : [],
    chapters,
  };
  cache.set(bookId, out);
  return out;
}
