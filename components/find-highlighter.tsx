"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";

// D6 · Deep-link "jump to match" — when a search result navigates with a
// ?find=<term> (or fires a neo:find event), locate the tightest element on the
// destination page that contains the term, scroll it into view, and flash it
// bright yellow. Element-level only (no text-node surgery) → zero React risk.

const FLASH_CLASS = "find-flash";

function tightestMatch(term: string): HTMLElement | null {
  const root = document.getElementById("main") || document.body;
  const needle = term.toLowerCase();
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
  let best: HTMLElement | null = null;
  let bestLen = Infinity;
  let node = walker.nextNode() as HTMLElement | null;
  while (node) {
    // skip the palette/dialog + non-visible nodes
    if (node.closest("[role=dialog]") || node.offsetParent === null) { node = walker.nextNode() as HTMLElement | null; continue; }
    const txt = (node.textContent || "").toLowerCase();
    if (txt.includes(needle) && txt.length < bestLen) { best = node; bestLen = txt.length; }
    node = walker.nextNode() as HTMLElement | null;
  }
  return best;
}

export function FindHighlighter() {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    let timers: ReturnType<typeof setTimeout>[] = [];

    const run = (term: string) => {
      if (!term || term.trim().length < 2) return;
      const t = term.trim();
      let tries = 0;
      const attempt = () => {
        if (cancelled) return;
        const el = tightestMatch(t);
        if (el) {
          document.querySelectorAll("." + FLASH_CLASS).forEach((n) => n.classList.remove(FLASH_CLASS));
          el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
          el.classList.add(FLASH_CLASS);
          timers.push(setTimeout(() => el.classList.remove(FLASH_CLASS), 2600));
          return;
        }
        if (tries++ < 14) timers.push(setTimeout(attempt, 160)); // wait for content render
      };
      attempt();
    };

    // 1) full page load with ?find=
    const param = new URLSearchParams(window.location.search).get("find");
    if (param) timers.push(setTimeout(() => run(param), 120));

    // 2) client-side navigation fires this after router.push
    const onFind = (e: Event) => run((e as CustomEvent<string>).detail);
    window.addEventListener("neo:find", onFind as EventListener);

    return () => { cancelled = true; timers.forEach(clearTimeout); timers = []; window.removeEventListener("neo:find", onFind as EventListener); };
  }, [pathname, reduce]);

  return null;
}
