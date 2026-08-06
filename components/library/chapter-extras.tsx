"use client";

/**
 * The one sanctioned escape hatch in the platform reader.
 *
 * Almost everything a book needs is data. But a few chapters carry a bespoke
 * hand-drawn diagram that no schema describes — book1's org hierarchy, its
 * functional-location/equipment model, its work-order flow. Those are drawings,
 * not records, and pretending otherwise would mean inventing a schema for a
 * population of three.
 *
 * The rule this keeps: the ENGINE never learns about a specific book. It asks
 * this registry whether a chapter has an extra and renders whatever comes back.
 * Adding a bespoke visual is a line here, not a branch in the reader.
 */

import type { ReactNode } from "react";
import { ChapterDiagram } from "@/components/book1-diagrams";

const EXTRAS: Record<string, (chapter: number) => ReactNode> = {
  book1: (n) => <ChapterDiagram n={n} />,
};

/** @returns the extra for this chapter, or null when there is none. */
export function chapterExtra(bookId: string, chapter: number): ReactNode {
  const f = EXTRAS[bookId];
  return f ? f(chapter) : null;
}
