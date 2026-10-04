// Server-only extraction: the browser receives codes and block anchors, never
// the entire lesson corpus just to run a search.
import { ALL_LESSONS } from "@/data/academy/lessons";
import { orderedBlocks } from "@/lib/academy/lesson-types";
export function lessonCodes(slug: string): { code: string; kind: string }[] {
  const lesson = ALL_LESSONS[slug];
  if (!lesson) return [];
  return orderedBlocks(lesson).flatMap((b) => {
    const refs = "refs" in b ? b.refs : "rows" in b ? b.rows : [];
    return refs.map((r) => ({ code: r.code, kind: b.kind }));
  });
}
