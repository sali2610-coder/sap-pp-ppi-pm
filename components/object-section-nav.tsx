"use client";

/**
 * MOBILE APP — contextual per-object navigation.
 * The spec: "navigation becomes contextual" — on an object detail page the nav
 * should be the object's own facets, not generic app nav. A sticky segmented
 * rail (under the header, xl:hidden) that lists only the sections actually
 * present on THIS object, scroll-spies the active one (shared layoutId ink),
 * and smooth-scrolls to it (header-offset aware). Interaction language: iOS
 * segmented control + Linear's contextual sub-nav.
 */
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const haptic = () => { try { navigator.vibrate?.(6); } catch { /* noop */ } };
export type NavSection = { id: string; label: string };

const HEADER_OFFSET = 104; // sticky app header (h-14) + this rail (~48px)

export function ObjectSectionNav({ sections }: { sections: NavSection[] }) {
  const reduce = useReducedMotion();
  const [present, setPresent] = useState<NavSection[]>([]);
  const [active, setActive] = useState<string>("");
  const railRef = useRef<HTMLDivElement>(null);

  // keep only sections that actually rendered on this object
  useEffect(() => {
    const found = sections.filter((s) => document.getElementById(s.id));
    setPresent(found);
    if (found[0]) setActive((a) => a || found[0].id);
  }, [sections]);

  // scroll-spy — the section nearest the top (below the offset) is active
  useEffect(() => {
    if (!present.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: `-${HEADER_OFFSET}px 0px -55% 0px`, threshold: [0, 1] },
    );
    present.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [present]);

  // keep the active chip in view within the horizontal rail
  useEffect(() => {
    const chip = railRef.current?.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    chip?.scrollIntoView({ inline: "center", block: "nearest", behavior: reduce ? "auto" : "smooth" });
  }, [active, reduce]);

  if (present.length < 2) return null; // nothing to navigate

  const jump = (id: string) => {
    haptic();
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
    setActive(id);
  };

  return (
    <div className="no-print sticky top-14 z-40 -mx-2 mb-2 border-b border-hairline bg-surface/85 backdrop-blur-md xl:hidden">
      <div ref={railRef} className="chip-rail flex gap-1.5 overflow-x-auto px-2 py-2" dir="rtl">
        {present.map((s) => {
          const on = s.id === active;
          return (
            <button key={s.id} data-chip={s.id} onClick={() => jump(s.id)} aria-current={on ? "true" : undefined}
              className={`tap relative shrink-0 rounded-full px-3.5 py-1.5 text-[12.5px] font-bold transition-colors ${on ? "text-white" : "text-ink-2 hover:text-ink-1"}`}>
              {on && <motion.span layoutId="obj-nav-ink" transition={{ type: "spring", stiffness: 460, damping: 34 }} className="absolute inset-0 -z-10 rounded-full bg-brand" />}
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
