"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { PanelRight, X, Target, Briefcase, AlertTriangle, GitBranch, ExternalLink, Network, Crosshair } from "lucide-react";
import { useActiveEntity, setActiveEntity, useInspectorOpen, setInspectorOpen, entityFromPath } from "@/lib/workspace";
// NOTE: `entity-lookup` is imported LAZILY below, never at module scope.
// It transitively pulls the entire knowledge base (sapData PM+PP-PI, tx-intel,
// transactions, tcode catalog/directory, consultant notes, verified objects,
// CDS map). Because this panel is mounted by AppShell on EVERY page, a static
// import put ~21 MB of JavaScript on the critical path of every single visit.
// Type-only import is safe — types are erased at build time.
import type { TipKind } from "@/lib/entity-lookup";

const KIND_C: Record<TipKind, string> = { table: "#0891b2", tcode: "#475569", bapi: "#2563eb", idoc: "#7c3aed", fm: "#0d9488", cds: "#16a34a" };
const W_KEY = "neo:inspector:w";
const MINW = 300, MAXW = 560;

// Persistent Workspace Inspector — one reusable panel for every entity
// (table/object · tcode · BAPI/FM/IDoc · CDS · Fiori). Reflects the global
// active context. Desktop (≥xl): docked + resizable, PUSHES content (no modal
// feel) — VS Code / SAP BAS style. Smaller: slide-over sheet. Related chips
// switch context in-place (no navigation).
export function WorkspaceInspector() {
  const path = usePathname() || "/";
  const explicit = useActiveEntity();
  const open = useInspectorOpen();
  const [wide, setWide] = useState(false);
  const [width, setWidth] = useState(360);
  const resizing = useRef(false);
  const name = explicit || entityFromPath(path);

  // The knowledge base is fetched on first intent (panel opened), not at startup.
  // Measured on production before this change: the homepage pulled 21.3 MB of JS
  // — 16.3 MB of it in two chunks the CDN refused to compress — purely because
  // this always-mounted panel needed a synchronous lookup.
  const [lookup, setLookup] = useState<{ lookupEntity: (n: string) => ReturnType<typeof import("@/lib/entity-lookup").lookupEntity> } | null>(null);
  useEffect(() => {
    if (!open || lookup) return;
    let alive = true;
    import("@/lib/entity-lookup").then((m) => { if (alive) setLookup({ lookupEntity: m.lookupEntity }); }).catch(() => { /* keep the panel usable without the tip */ });
    return () => { alive = false; };
  }, [open, lookup]);

  const tip = useMemo(() => (name && lookup ? lookup.lookupEntity(name) : null), [name, lookup]);

  useEffect(() => { try { const w = parseInt(localStorage.getItem(W_KEY) || "360", 10); if (w >= MINW && w <= MAXW) setWidth(w); } catch { /* noop */ } }, []);
  useEffect(() => { const mq = window.matchMedia("(min-width: 1280px)"); const on = () => setWide(mq.matches); on(); mq.addEventListener("change", on); return () => mq.removeEventListener("change", on); }, []);
  useEffect(() => { const onPin = () => setInspectorOpen(true); window.addEventListener("neo:inspect", onPin); return () => window.removeEventListener("neo:inspect", onPin); }, []);
  // Escape closes the slide-over sheet (mobile/tablet); docked desktop panel stays.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && open && !wide) setInspectorOpen(false); };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, [open, wide]);

  // docked mode pushes the main content (sets a CSS var + body flag)
  useEffect(() => {
    const docked = open && wide;
    document.body.dataset.inspector = docked ? "1" : "0";
    document.documentElement.style.setProperty("--inspector-w", `${width}px`);
    return () => { document.body.dataset.inspector = "0"; };
  }, [open, wide, width]);

  // resize (physical-right edge of the left-docked panel)
  useEffect(() => {
    const move = (e: PointerEvent) => { if (!resizing.current) return; const w = Math.min(MAXW, Math.max(MINW, e.clientX)); setWidth(w); };
    const up = () => { if (resizing.current) { resizing.current = false; try { localStorage.setItem(W_KEY, String(width)); } catch { /* noop */ } document.body.style.userSelect = ""; } };
    window.addEventListener("pointermove", move); window.addEventListener("pointerup", up);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
  }, [width]);

  const accent = tip ? KIND_C[tip.kind] : "#475569";

  return (
    <>
      {/* Toggle appears ONLY when a context exists — never an empty Inspector.
         Stacked ABOVE the accessibility gear (bottom-5) so the two don't collide. */}
      {tip && !open && (
        <button onClick={() => setInspectorOpen(true)} aria-label="פתח מפקח סביבת עבודה" aria-expanded={open}
          className="no-print group fixed bottom-[5.5rem] left-5 z-40 hidden items-center gap-2 rounded-full border border-hairline bg-surface px-3.5 py-3 text-sm font-bold text-ink-2 shadow-xl transition hover:-translate-y-0.5 hover:text-brand xl:flex">
          <PanelRight className="size-5" />
          <span className="tech font-mono text-[13px] font-extrabold" style={{ color: accent }} dir="ltr">{tip.name}</span>
          <span className="size-2 rounded-full" style={{ background: accent }} />
        </button>
      )}

      <AnimatePresence>
        {open && (
          <>
            {!wide && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-slate-950/35 backdrop-blur-sm" onClick={() => setInspectorOpen(false)} />}
            <motion.aside dir="rtl" role="complementary" aria-label="מפקח"
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", stiffness: 380, damping: 38 }}
              className="fixed bottom-0 left-0 top-[4.25rem] z-[61] flex flex-col border-e border-hairline bg-surface shadow-2xl xl:shadow-[8px_0_24px_-12px_rgba(15,23,42,0.18)]"
              style={{ width: wide ? width : undefined }}>
              <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
                <span className="flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-wide text-ink-3"><PanelRight className="size-4 text-brand" />מפקח · Inspector</span>
                <button onClick={() => setInspectorOpen(false)} className="rounded-lg p-1 text-ink-3 hover:bg-surface-2"><X className="size-4" /></button>
              </div>

              <div className="min-h-0 flex-1 overflow-auto p-4">
                {tip ? (
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2"><span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: accent }}>{tip.kindHe}</span><span className="tech font-mono text-lg font-extrabold text-ink-1" dir="ltr">{tip.name}</span>{tip.module && <span className="ms-auto text-[10px] font-bold text-ink-3">{tip.module}</span>}</div>
                    {tip.he && <p className="text-[13px] font-semibold leading-relaxed text-ink-2">{tip.he}</p>}
                    {tip.purpose && <p className="flex gap-1.5 text-[12.5px] leading-relaxed text-ink-2"><Target className="mt-0.5 size-3.5 shrink-0 text-blue-500" />{tip.purpose}</p>}
                    {tip.consultantTip && <p className="flex gap-1.5 text-[12.5px] leading-relaxed text-ink-2"><Briefcase className="mt-0.5 size-3.5 shrink-0 text-violet-500" />{tip.consultantTip}</p>}
                    {tip.mistake && <p className="flex gap-1.5 text-[12.5px] leading-relaxed text-ink-2"><AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-rose-500" />{tip.mistake}</p>}
                    {tip.where && <p className="text-[12px] leading-relaxed text-ink-3"><span className="font-bold text-ink-2">איפה בפרויקט: </span>{tip.where}</p>}
                    {tip.related && tip.related.length > 0 && (
                      <div><div className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase text-ink-3"><GitBranch className="size-3" />קשור — לחץ להחלפת הקשר</div>
                        <div className="flex flex-wrap gap-1">{tip.related.map((r) => <button key={r} onClick={() => setActiveEntity(r)} className="tech rounded-md bg-surface-2 px-1.5 py-0.5 text-[10.5px] font-bold text-ink-2 transition hover:bg-brand/10 hover:text-brand" dir="ltr">{r}</button>)}</div>
                        <div className="mt-1 text-[10px] text-ink-3">ניווט בתוך המפקח — בלי לעזוב את העמוד.</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 py-12 text-center text-ink-3">
                    <Crosshair className="size-8 text-ink-3" />
                    <p className="text-sm font-bold text-ink-3">אין הקשר פעיל</p>
                    <p className="text-[12px] leading-relaxed">בחר אובייקט בכל מקום — טבלה, טרנזקציה, צומת בסטודיו — והוא יופיע כאן. אותו מפקח בכל המרכזים.</p>
                  </div>
                )}
              </div>

              {tip && (
                <div className="flex gap-2 border-t border-hairline p-3">
                  <Link href={tip.href} onClick={() => !wide && setInspectorOpen(false)} className="flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-[13px] font-extrabold text-white shadow-sm transition active:scale-95" style={{ background: accent }}><ExternalLink className="size-4" />פתח עמוד מלא</Link>
                  {tip.graphHref && <Link href={tip.graphHref} onClick={() => !wide && setInspectorOpen(false)} className="flex items-center justify-center gap-1.5 rounded-xl border-2 border-hairline px-3 py-2.5 text-[12px] font-bold text-ink-3 transition hover:border-brand/40 hover:text-brand"><Network className="size-4" />גרף</Link>}
                </div>
              )}

              {/* resize handle (docked desktop) */}
              {wide && <div onPointerDown={(e) => { resizing.current = true; document.body.style.userSelect = "none"; e.preventDefault(); }} className="absolute inset-y-0 right-0 z-10 w-1.5 cursor-col-resize bg-transparent transition hover:bg-brand/30" aria-hidden />}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
