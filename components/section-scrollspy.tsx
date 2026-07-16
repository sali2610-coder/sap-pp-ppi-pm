"use client";

import { useEffect, useState } from "react";

export type SpyItem = { id: string; label: string; count?: number };

// Sticky in-page nav + scroll-spy for content-heavy sections (GOAL-3). Observes
// the group anchors rendered by the section body and highlights the one in view;
// click scrolls to it. Hidden on narrow screens (the content stacks there).
export function SectionScrollSpy({ items }: { items: SpyItem[] }) {
  const [active, setActive] = useState(items[0]?.id || "");

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) { window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: "smooth" }); setActive(id); }
  };

  return (
    <nav aria-label="ניווט בעמוד" className="sticky top-4 hidden max-h-[80vh] flex-col gap-0.5 self-start overflow-y-auto text-[13px] lg:flex">
      <span className="mb-1 px-3 text-[10px] font-bold uppercase tracking-wide text-ink-3">בעמוד זה</span>
      {items.map((it) => {
        const on = active === it.id;
        return (
          <button key={it.id} type="button" onClick={() => go(it.id)} aria-current={on ? "true" : undefined}
            className={`flex items-center justify-between gap-2 rounded-lg border-e-2 px-3 py-1.5 text-start transition ${on ? "border-e-brand bg-surface-2 font-bold text-ink-1" : "border-e-transparent text-ink-3 hover:text-ink-1"}`}>
            <span className="truncate">{it.label}</span>
            {it.count != null && <span className="shrink-0 font-mono text-[10px] text-ink-3">{it.count}</span>}
          </button>
        );
      })}
    </nav>
  );
}
