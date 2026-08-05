"use client";
// Read-only scope tracking for the book reader.
//
// The reader already renders [data-chapter] / [data-section] anchors and emits
// "neo:reader:goto". This hook OBSERVES them — it never mutates reader state,
// so book-reader.tsx stays untouched.
import { useCallback, useEffect, useState } from "react";

export type ScopeMode = "section" | "chapter" | "book" | "library" | "free";

export interface BookScope {
  mode: ScopeMode;
  bookId: string;
  chapter?: number;
  section?: string;
  sectionTitle?: string;
  chapterTitle?: string;
}

/** Element nearest the top of the viewport wins — matches the reader's own rail. */
function activeFrom(selector: string): HTMLElement | null {
  const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (!els.length) return null;
  const probe = window.innerHeight * 0.3;
  let best: HTMLElement | null = null;
  for (const el of els) {
    const top = el.getBoundingClientRect().top;
    if (top <= probe) best = el;          // last one above the probe line
  }
  return best ?? els[0];
}

export function useBookScope(bookId: string, initialMode: ScopeMode = "chapter") {
  const [mode, setMode] = useState<ScopeMode>(initialMode);
  const [pos, setPos] = useState<{ chapter?: number; section?: string; sectionTitle?: string; chapterTitle?: string }>({});

  const sync = useCallback(() => {
    const chEl = activeFrom("[data-chapter]");
    const secEl = activeFrom("[data-section]");
    setPos({
      chapter: chEl ? Number(chEl.dataset.chapter) : undefined,
      chapterTitle: chEl?.querySelector("h2,h3")?.textContent?.trim() || undefined,
      section: secEl?.dataset.section || undefined,
      sectionTitle: secEl?.dataset.sectionTitle || undefined,
    });
  }, []);

  useEffect(() => {
    // deferred: avoids a synchronous setState inside the effect body
    const first = requestAnimationFrame(sync);
    const onScroll = () => sync();
    const onGoto = () => setTimeout(sync, 120);   // let the reader expand first
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("neo:reader:goto", onGoto);
    return () => {
      cancelAnimationFrame(first);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("neo:reader:goto", onGoto);
    };
  }, [sync]);

  /** What actually gets sent to the AI for the chosen mode. */
  const scope: BookScope = {
    mode, bookId,
    chapter: mode === "chapter" || mode === "section" ? pos.chapter : undefined,
    section: mode === "section" ? pos.section : undefined,
    sectionTitle: pos.sectionTitle, chapterTitle: pos.chapterTitle,
  };
  return { scope, mode, setMode, position: pos };
}

export function scopeLabel(s: BookScope): string {
  switch (s.mode) {
    case "library": return "כל הספרייה";
    case "book": return "הספר כולו";
    case "chapter": return s.chapter ? `פרק ${s.chapter}` : "הפרק הנוכחי";
    case "section": return s.sectionTitle ? `סעיף ${s.section}` : "הסעיף הנוכחי";
    case "free": return "שאלה חופשית";
  }
}
