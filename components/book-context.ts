"use client";

// Loads Book #2 extracted text (runtime fetch, not bundled) and builds a
// chapter-scoped grounding context for Gemini, prefixed with page refs so the
// model can cite "Chapter N, pp X-Y".

export interface BookChapter {
  n: number;
  title: string;
  pages: [number, number];
  chars: number;
  text: string;
}
export interface BookText {
  book: string;
  pages: number;
  chapters: BookChapter[];
}

let cache: BookText | null = null;

export async function loadBook2(): Promise<BookText> {
  if (cache) return cache;
  const res = await fetch("/assets/library/book2/text.json");
  if (!res.ok) throw new Error("Failed to load Book 2 text");
  cache = (await res.json()) as BookText;
  return cache;
}

// scope: "all" or a chapter number. Returns context string with page markers.
export function buildContext(book: BookText, scope: "all" | number): string {
  const chapters = scope === "all" ? book.chapters : book.chapters.filter((c) => c.n === scope);
  return chapters
    .map(
      (c) =>
        `[Chapter ${c.n}: ${c.title} | pp ${c.pages[0]}-${c.pages[1]}]\n${c.text}`,
    )
    .join("\n\n");
}
