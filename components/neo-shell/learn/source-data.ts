// Build-time bridge to the complete academy textbooks. The source objects and
// the existing lesson/progress model are read only; neither is regenerated.
import { BOOKS } from "@/data/library/academy-index";
import type { LearningNode, TextbookChapter } from "@/data/library/pp-textbook/types";
import { ACADEMY } from "@/lib/academy/model";

const SOURCE: Record<string, string> = {
  pm: "pm", "pp-pi": "pp", qm: "qm", "pm-user": "pmu",
  mm: "mm", wm: "wm", "pp-ds": "ppds", sop: "sop",
};
export const sourceBook = (courseId: string) => ACADEMY[courseId] ? BOOKS.find((b) => b.id === SOURCE[courseId]) : undefined;
export const sourceChapters = (courseId: string): TextbookChapter[] =>
  Object.values(sourceBook(courseId)?.data ?? {}).sort((a, b) => a.n - b.n);
export const sourceHref = (courseId: string, chapter: number, node?: string) =>
  `/neo/academy/${encodeURIComponent(courseId)}/source/${chapter}/` + (node ? `#source-${encodeURIComponent(node)}` : "");
export function sourceNodes(nodes: LearningNode[]): LearningNode[] {
  return nodes.flatMap((n) => [n, ...sourceNodes(n.children ?? [])]);
}
export function sourceParams() {
  return Object.keys(SOURCE).flatMap((courseId) => sourceChapters(courseId).map((ch) => ({ courseId, chapter: String(ch.n) })));
}
export function sourceChapter(courseId: string, chapter: string) {
  return sourceChapters(courseId).find((ch) => String(ch.n) === chapter) ?? null;
}
export interface SourceIndexRow { id: string; title: string; href: string; codes: string[] }
export interface SourceIndexChapter { n: number; title: string; href: string; rows: SourceIndexRow[] }
export function sourceIndex(courseId: string): SourceIndexChapter[] {
  return sourceChapters(courseId).map((ch) => ({
    n: ch.n, title: ch.titleHe, href: sourceHref(courseId, ch.n),
    rows: sourceNodes(ch.subchapters).map((n) => ({
      id: n.id, title: n.titleHe, href: sourceHref(courseId, ch.n, n.id),
      codes: [...new Set([...n.tables, ...n.tcodes, ...n.fiori, ...(n.flow ?? []).map((s) => s.code ?? "")].filter(Boolean))],
    })),
  }));
}

/** Only migrated courses have an exact source-node/lesson identity. The three
 * authored short courses must not be paired with a book section by guesswork. */
export function lessonSource(courseId: string, slug: string) {
  if (!["pm-user", "mm", "wm", "pp-ds", "sop"].includes(courseId)) return null;
  const book = sourceBook(courseId);
  if (!book) return null;
  for (const ch of sourceChapters(courseId)) {
    const root = ch.subchapters.find((n) => `${book.id}-${n.id.replace(/\./g, "-")}` === slug);
    if (!root) continue;
    return {
      title: root.titleHe, href: sourceHref(courseId, ch.n, root.id),
      intro: ch.introHe,
      flows: sourceNodes([root]).filter((n) => n.flow?.length).map((n) => ({
        id: n.id, title: n.titleHe, steps: n.flow!,
      })),
    };
  }
  return null;
}

/** Map a related textbook link only when both its chapter and anchor exist. */
export function sourceRelatedHref(href: string): string | null {
  if (!href.startsWith("/")) return /^https?:\/\//.test(href) ? href : null;
  const url = new URL(href, "https://neo.invalid");
  const book = BOOKS.find((b) => url.pathname.startsWith(b.base + "/"));
  const courseId = book && Object.keys(SOURCE).find((id) => SOURCE[id] === book.id);
  const match = /\/chapter-(\d+)\/?$/.exec(url.pathname);
  if (!courseId || !match) return null;
  const ch = sourceChapter(courseId, String(Number(match[1])));
  if (!ch) return null;
  const anchor = decodeURIComponent(url.hash.slice(1)).replace(/^(?:sec-|node-)/, "");
  if (anchor && !sourceNodes(ch.subchapters).some((n) => n.id === anchor)) return null;
  return sourceHref(courseId, ch.n, anchor || undefined);
}
