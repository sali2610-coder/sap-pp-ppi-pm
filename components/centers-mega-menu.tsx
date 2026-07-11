"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Boxes, ChevronDown, ArrowLeft, Sparkles, Compass, GitBranch } from "lucide-react";
import { CENTERS } from "@/lib/centers";
import { playClick } from "@/lib/sound";

// Centers Command Hub — full-width mission-control panel under the header.
// Card grid (2 rows) + a live preview dock that tracks the hovered/focused
// center. Hover + click + keyboard all open it; Esc / outside-click / route
// change close it. Desktop only (≥ xl); mobile uses CentersSheet.
export function CentersMegaMenu() {
  const path = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [top, setTop] = useState(64);
  const [preview, setPreview] = useState(CENTERS[0].id);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeCenter = CENTERS.find((c) => path.startsWith(c.href));
  const pv = CENTERS.find((c) => c.id === preview) || CENTERS[0];

  const measure = useCallback((el: HTMLElement | null) => {
    const header = el?.closest("header");
    if (header) setTop(header.getBoundingClientRect().bottom);
  }, []);

  const doOpen = (el: HTMLElement | null) => { if (closeTimer.current) clearTimeout(closeTimer.current); measure(el); setPreview(activeCenter?.id || CENTERS[0].id); setOpen(true); };
  const scheduleClose = () => { if (closeTimer.current) clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setOpen(false), 160); };
  const cancelClose = () => { if (closeTimer.current) clearTimeout(closeTimer.current); };

  // close on route change
  useEffect(() => { setOpen(false); }, [path]);
  // Esc + outside click
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const onDown = (e: MouseEvent) => { if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false); };
    const onScroll = () => measure(wrapRef.current);
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("mousedown", onDown); window.removeEventListener("scroll", onScroll, true); window.removeEventListener("resize", onScroll); };
  }, [open, measure]);

  const triggerActive = !!activeCenter || open;

  return (
    <div ref={wrapRef} className="relative" onMouseEnter={(e) => doOpen(e.currentTarget)} onMouseLeave={scheduleClose}>
      <button
        type="button" aria-haspopup="true" aria-expanded={open}
        onClick={(e) => (open ? setOpen(false) : doOpen(e.currentTarget))}
        onFocus={(e) => measure(e.currentTarget)}
        className={`relative flex shrink-0 items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-1.5 transition-colors 2xl:px-3 ${triggerActive ? "bg-surface text-brand shadow-[0_2px_8px_-2px_rgba(0,0,0,0.25)]" : "text-white/90 hover:bg-surface/15 hover:text-white"}`}>
        <Boxes className="size-3.5" />מרכזים<ChevronDown className={`size-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* scrim — dims the page so the hub reads as a destination */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
              className="fixed inset-x-0 bottom-0 z-40 bg-slate-950/30 backdrop-blur-[2px]" style={{ top }} onMouseEnter={() => setOpen(false)} />
            {/* panel */}
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={cancelClose} onMouseLeave={scheduleClose}
              className="fixed inset-x-0 z-50 border-b border-hairline bg-surface shadow-[0_24px_60px_-20px_rgba(15,23,42,0.35)]"
              style={{ top }} dir="rtl" role="menu" aria-label="מרכזי ייעוץ">
              <div className="mx-auto px-5 py-6 sm:px-8">
                {/* eyebrow */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-ink-3"><Compass className="size-4 text-brand" />מרכזי ייעוץ · Command Hub</div>
                  <span className="hidden items-center gap-1.5 rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-bold text-ink-3 sm:inline-flex">{CENTERS.length} מרכזים · ידע מאומת</span>
                </div>

                <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
                  {/* card grid — 2 rows */}
                  <div className="grid-adaptive">
                    {CENTERS.map((c, i) => {
                      const Ic = c.Icon; const on = c.id === activeCenter?.id; const focused = c.id === preview;
                      return (
                        <motion.div key={c.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 * i, duration: 0.2 }}>
                          <Link href={c.href} role="menuitem" onClick={() => { playClick(); setOpen(false); }}
                            onMouseEnter={() => setPreview(c.id)} onFocus={() => setPreview(c.id)}
                            className={`group block h-full rounded-2xl border-2 bg-surface p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 ${focused ? "shadow-lg" : "shadow-sm"}`}
                            style={{ borderColor: focused || on ? c.accent : "#e2e8f0" }}>
                            <div className="flex items-start gap-3">
                              <span className="grid size-11 shrink-0 place-items-center rounded-xl text-white shadow-sm transition-transform group-hover:scale-105" style={{ background: `linear-gradient(135deg,${c.accent},${c.accent}cc)` }}><Ic className="size-5" /></span>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[14px] font-extrabold text-ink-1">{c.he}</span>
                                  {c.isNew && <span className="rounded-full bg-rose-100 px-1.5 py-0.5 text-[9px] font-extrabold uppercase text-rose-600">New</span>}
                                </div>
                                <div className="font-mono text-[9px] text-ink-3">{c.en}</div>
                              </div>
                              <ArrowLeft className="size-4 shrink-0 text-ink-3 transition-all group-hover:-translate-x-0.5" style={{ color: focused ? c.accent : undefined }} />
                            </div>
                            <p className="mt-2 text-[12px] leading-relaxed text-ink-3">{c.desc}</p>
                            <div className="mt-2.5 flex items-center gap-3">
                              {c.metrics.map((m) => (
                                <div key={m.label} className="leading-none">
                                  <span className="font-mono text-base font-extrabold" style={{ color: c.accent }}>{m.value}</span>
                                  <span className="mr-1 text-[10px] font-bold text-ink-3">{m.label}</span>
                                </div>
                              ))}
                            </div>
                            <div className="mt-2.5 flex flex-wrap items-center gap-1">
                              {c.inside.slice(0, 3).map((x) => <span key={x} className="rounded-md bg-surface-2 px-1.5 py-0.5 text-[10px] font-bold text-ink-3" dir="ltr">{x}</span>)}
                              <span className="ms-auto text-[9px] font-bold uppercase tracking-wide text-ink-3">עודכן · {c.updated}</span>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* preview dock — tracks hovered/focused center */}
                  <aside className="rounded-2xl border border-hairline bg-surface-2/70 p-4" aria-live="polite">
                    <div key={pv.id} style={{ animation: "fadeUp .2s ease both" }}>
                      <div className="flex items-center gap-2.5">
                        <span className="grid size-9 place-items-center rounded-xl text-white" style={{ background: pv.accent }}><pv.Icon className="size-4" /></span>
                        <div><div className="text-[14px] font-extrabold text-ink-1">{pv.he}</div><div className="font-mono text-[9px] text-ink-3">{pv.en}</div></div>
                      </div>
                      <p className="mt-2 text-[12px] leading-relaxed text-ink-2">{pv.desc}</p>

                      <div className="mt-3 text-[10px] font-bold uppercase tracking-wide" style={{ color: pv.accent }}><Sparkles className="me-1 inline size-3" />מה תלמד</div>
                      <div className="mt-1 flex flex-wrap gap-1">{pv.inside.map((x) => <span key={x} className="rounded-md border border-hairline bg-surface px-1.5 py-0.5 text-[10.5px] font-bold text-ink-2" dir="ltr">{x}</span>)}</div>

                      <div className="mt-3 text-[10px] font-bold uppercase tracking-wide text-ink-3"><GitBranch className="me-1 inline size-3" />פופולרי</div>
                      <div className="mt-1 flex flex-wrap gap-1">{pv.popular.map((x) => <span key={x} className="rounded-md bg-surface px-1.5 py-0.5 text-[10.5px] font-semibold text-ink-3 ring-1 ring-hairline">{x}</span>)}</div>

                      <Link href={pv.start.href} onClick={() => { playClick(); setOpen(false); }}
                        className="mt-4 flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-[13px] font-extrabold text-white shadow-sm transition active:scale-95" style={{ background: pv.accent }}>
                        <span><span className="opacity-70">התחל כאן ·</span> {pv.start.label}</span>
                        <ArrowLeft className="size-4" />
                      </Link>
                    </div>
                  </aside>
                </div>

                {/* footer */}
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-hairline pt-4 text-[12px] font-bold text-ink-3">
                  <Link href="/knowledge/" onClick={() => setOpen(false)} className="flex items-center gap-1 transition hover:text-brand">כל המרכזים<ArrowLeft className="size-3.5" /></Link>
                  <Link href="/studio/" onClick={() => setOpen(false)} className="flex items-center gap-1 font-extrabold text-brand transition hover:underline">Architecture Studio<ArrowLeft className="size-3.5" /></Link>
                  <Link href="/graph/" onClick={() => setOpen(false)} className="flex items-center gap-1 transition hover:text-brand">גרף ידע<ArrowLeft className="size-3.5" /></Link>
                  <Link href="/s4hana/" onClick={() => setOpen(false)} className="flex items-center gap-1 transition hover:text-brand">מרכז S/4<ArrowLeft className="size-3.5" /></Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
