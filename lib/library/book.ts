/**
 * Reading side of the Library Platform.
 *
 * The spine (data/books/<id>.json) is small and imported at build time: ids,
 * titles, chapter structure. Prose is NOT in there — it lives in per-chapter
 * shards under /books/<id>/ch<n>.json and is fetched when a chapter is opened.
 * That split is why the reader route ships kilobytes instead of the 3.9 MB the
 * current book7 page inlines.
 */

export type BookStructure = "narrative" | "catalogue" | "reference";
export type BodyFormat = "prose" | "academy";

/** A translated paragraph. Ten of the eleven books. */
export interface ProseBody {
  format: "prose";
  en?: string;
  he?: string;
  /** Preview text. For a catalogue entry this may be the only content there is. */
  snippet?: string;
}

/**
 * book8's shape: named Hebrew facets plus structured references. Kept as a
 * distinct type rather than flattened into prose, because a facet has a heading
 * and an order that a reader must respect — flattening loses both.
 */
export interface AcademyBody {
  format: "academy";
  snippet?: string;
  /**
   * A facet is prose OR a list. Nine of book8's fourteen are arrays — steps,
   * common mistakes, interview questions — and flattening them to a string
   * would lose the item boundaries that make them readable.
   */
  facets?: Record<string, string | string[]>;
  refs?: { tables?: unknown; tcodes?: unknown; fiori?: unknown; flow?: unknown };
  depth?: number;
}

export type SectionBody = ProseBody | AcademyBody;

export interface BookSection {
  id: string;
  title: { en: string; he?: string };
  page?: number;
}

export interface BookChapter {
  n: number;
  title: { en: string; he?: string };
  startPage?: number;
  sections: BookSection[];
}

export interface BookMeta {
  title: { en: string; he?: string };
  module: string;
  kind: string;
  structure: BookStructure;
  publisher?: string;
  pages?: number;
}

export interface Book {
  id: string;
  schemaVersion: number;
  meta: BookMeta;
  chapters: BookChapter[];
}

/**
 * Facet display order and Hebrew headings. The source object has no inherent
 * order, so rendering Object.entries() would let a JSON reshuffle change the
 * reading order of a lesson. This list is the order.
 */
export const FACET_ORDER: { key: string; he: string }[] = [
  { key: "exec", he: "תקציר מנהלים" },
  { key: "purpose", he: "מטרה" },
  { key: "beginner", he: "למתחילים" },
  { key: "consultant", he: "זווית היועץ" },
  { key: "processExample", he: "דוגמת תהליך" },
  { key: "scenario", he: "תרחיש" },
  { key: "nav", he: "ניווט במערכת" },
  { key: "config", he: "קונפיגורציה" },
  { key: "masterData", he: "השפעת נתוני-אב" },
  { key: "mistakes", he: "טעויות נפוצות" },
  { key: "troubleshoot", he: "טיפול בתקלות" },
  { key: "bestPractice", he: "שיטות עבודה מומלצות" },
  { key: "interview", he: "שאלות ראיון" },
  { key: "takeaways", he: "נקודות למזכר" },
  { key: "related", he: "נושאים קשורים" },
  { key: "summary", he: "סיכום" },
  { key: "why", he: "למה זה חשוב" },
];

/** The heading a section shows: Hebrew when the book has one, else English. */
export const sectionTitle = (s: BookSection) => s.title.he?.trim() || s.title.en;
export const chapterTitle = (c: BookChapter) => c.title.he?.trim() || c.title.en || `פרק ${c.n}`;

/** Prose in the reader's language, falling back to whatever exists. */
export function proseText(b: ProseBody): string {
  return (b.he?.trim() || b.en?.trim() || "");
}

const cache = new Map<string, Record<string, SectionBody>>();

/**
 * Fetches one chapter's prose. Cached per book+chapter, so paging back and
 * forth costs one request each way at most.
 *
 * @returns an empty record when the chapter has no shard. That is a legitimate
 *          state — a chapter may be headings only — and is deliberately not an
 *          error, because a reader that throws on missing prose would take the
 *          whole page down over an absent optional file.
 */
export async function loadChapterBodies(
  bookId: string,
  chapter: number,
  signal?: AbortSignal,
): Promise<Record<string, SectionBody>> {
  const key = `${bookId}#${chapter}`;
  const hit = cache.get(key);
  if (hit) return hit;

  try {
    const res = await fetch(`/books/${bookId}/ch${chapter}.json`, { signal });
    if (!res.ok) { cache.set(key, {}); return {}; }
    const data = (await res.json()) as Record<string, SectionBody>;
    const safe = data && typeof data === "object" ? data : {};
    cache.set(key, safe);
    return safe;
  } catch {
    // Aborted or offline. Do NOT cache — a retry should be able to succeed.
    return {};
  }
}
