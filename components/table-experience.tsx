"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Database, KeyRound, Link2, GitBranch, ArrowLeft, ChevronDown, Maximize2, X, Layers } from "lucide-react";
import type { SAPModuleData } from "@/lib/types";
import { Highlight } from "@/components/highlight";
import { EmptyState } from "@/components/ui/empty-state";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ObjectWorkspace } from "@/components/object-workspace";
import { useI18n } from "@/lib/i18n";

const accentFor = (m: string) => (m === "PM" ? "#f97316" : "#6d28d9");

// D7 · Table Experience — Browse → Expand → Deep Dive (progressive disclosure).
// L1 clean executive card (name + business title) → L2 inline summary accordion
// → L3 full Object Workspace in a side drawer. Objects-page design language.
export function TableExperience({ module, query }: { module: SAPModuleData; query: string }) {
  const { pick, lang, topic } = useI18n();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<string | null>(null);   // expanded card (L2)
  const [deep, setDeep] = useState<string | null>(null);   // drawer target (L3)
  const accent = accentFor(module.module);

  const q = query.trim().toLowerCase();
  const rows = useMemo(() => {
    const all = module.topics.flatMap((t) => t.tables);
    if (!q) return all;
    return all.filter((tb) => tb.tableName.toLowerCase().includes(q) || tb.descriptionHe.toLowerCase().includes(q) || tb.descriptionEn.toLowerCase().includes(q) || tb.tcodes.toLowerCase().includes(q) || tb.topicTitle.toLowerCase().includes(q));
  }, [module.topics, q]);

  const container = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.035 } } };
  const item = { hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 14 }, show: { opacity: 1, y: 0, transition: reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 240, damping: 24 } } };

  if (rows.length === 0) return <EmptyState title={lang === "he" ? "אין תוצאות" : "No results"} hint={lang === "he" ? "נסה מונח חיפוש אחר" : "Try another term"} />;

  return (
    <>
      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {rows.map((tb) => {
          const isOpen = open === tb.tableName;
          const pk = tb.fields.filter((f) => f.key === "PK").length;
          const fk = tb.fields.filter((f) => f.key === "FK").length;
          const core = (tb.relations?.length || 0) >= 6;
          const rels = tb.relations || [];
          return (
            <motion.div key={tb.id} variants={item} layout={!reduce}
              className={`spotlight group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition-all ${isOpen ? "border-transparent shadow-[var(--elev-2)] ring-1 sm:col-span-2 xl:col-span-3" : core ? "border-amber-200/70 ring-1 ring-amber-100 hover:-translate-y-1 hover:shadow-[var(--elev-2)]" : "border-slate-200 hover:-translate-y-1 hover:shadow-[var(--elev-2)]"}`}
              style={isOpen ? ({ ["--tw-ring-color"]: accent } as React.CSSProperties) : undefined}
              onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`); e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`); }}>
              <span className="absolute inset-x-0 top-0 h-1" style={{ background: accent }} />

              {/* L1 — clean executive card: click expands; click again deep-dives */}
              <div className="flex items-center gap-3 p-4">
                <button onClick={() => (isOpen ? setDeep(tb.tableName) : setOpen(tb.tableName))} className="flex flex-1 items-center gap-3 text-start">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl text-white shadow-sm transition-transform group-hover:scale-105" style={{ background: accent }}><Database className="size-5" /></span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5">
                      <span className="tech text-base font-extrabold text-slate-900" dir="ltr"><Highlight text={tb.tableName} query={query} /></span>
                      {core && <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-amber-700 ring-1 ring-amber-300/60">★ ליבה</span>}
                    </span>
                    <span className="mt-0.5 block truncate text-sm font-semibold text-slate-500"><Highlight text={pick(tb.descriptionHe, tb.descriptionEn)} query={query} /></span>
                  </span>
                </button>
                <button onClick={() => { if (isOpen) { setOpen(null); } else setOpen(tb.tableName); }} aria-label={isOpen ? "כווץ" : "הרחב"}
                  className="tap grid size-8 shrink-0 place-items-center rounded-lg text-slate-300 transition hover:bg-slate-50 hover:text-slate-500">
                  <ChevronDown className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
              </div>

              {/* L2 — inline summary accordion */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={reduce ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={reduce ? undefined : { height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
                    <div className="space-y-3 border-t border-slate-100 p-4">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Cell label="מטרה עסקית">{pick(tb.descriptionHe, tb.descriptionEn)}{tb.guideHe ? <span className="mt-1 block text-xs leading-relaxed text-slate-400">{tb.guideHe.slice(0, 160)}{tb.guideHe.length > 160 ? "…" : ""}</span> : null}</Cell>
                        <div className="grid grid-cols-3 gap-2">
                          <Metric n={pk} label="PK" icon={<KeyRound className="size-3.5 text-amber-500" />} />
                          <Metric n={fk} label="FK" icon={<Link2 className="size-3.5 text-cyan-500" />} />
                          <Metric n={tb.fields.length} label="שדות" icon={<Layers className="size-3.5 text-slate-400" />} />
                        </div>
                      </div>
                      {rels.length > 0 && (
                        <div>
                          <p className="eyebrow mb-1 flex items-center gap-1 text-slate-400"><GitBranch className="size-3" />קשרים עיקריים · {rels.length}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {rels.slice(0, 8).map((r, i) => (
                              <span key={r.table + i} className="tech inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-bold text-slate-600" dir="ltr">
                                <span className="text-slate-400">{r.role === "parent" ? "→" : "←"}</span>{r.table}{r.card ? <span className="font-mono text-[9px] text-slate-400">{r.card}</span> : null}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {(tb.s4Note || tb.s4AltTable) && (
                        <p className="rounded-lg bg-amber-50 px-2.5 py-1.5 text-[11px] font-medium text-amber-900"><span className="font-extrabold">ECC ↔ S/4: </span>{tb.s4Note || `חלופה: ${tb.s4AltTable}`}{tb.s4AltTable && tb.s4Note ? ` · → ${tb.s4AltTable}` : ""}</p>
                      )}
                      <div className="flex flex-wrap gap-2 pt-0.5">
                        <button onClick={() => setDeep(tb.tableName)} className="lift inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold text-white shadow-lg" style={{ background: accent, boxShadow: `0 8px 18px ${accent}55` }}>
                          <Maximize2 className="size-3.5" />צלילה לעומק — סביבת עבודה
                        </button>
                        <Link href={`/object/${encodeURIComponent(tb.tableName)}/`} className="tap inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-brand/40 hover:text-brand">עמוד מלא<ArrowLeft className="size-3.5" /></Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

      {/* L3 — full Object Workspace in a side drawer */}
      <Dialog open={!!deep} onOpenChange={(o) => !o && setDeep(null)}>
        <DialogContent className="start-auto end-0 top-0 left-auto right-auto h-[100dvh] max-h-[100dvh] w-[min(96vw,960px)] max-w-none translate-x-0 overflow-y-auto rounded-none rounded-s-3xl border-s border-slate-200 bg-slate-50 p-5 shadow-2xl data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:rounded-s-3xl"
          overlayClassName="bg-slate-900/50">
          <VisuallyHidden><DialogTitle>{deep}</DialogTitle></VisuallyHidden>
          <div className="mb-3 flex items-center justify-between">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-500 shadow-sm ring-1 ring-slate-200"><Maximize2 className="size-3.5 text-brand" />צלילה לעומק</span>
            <button onClick={() => setDeep(null)} aria-label="סגור" className="tap grid size-9 place-items-center rounded-xl bg-white text-slate-500 shadow-sm ring-1 ring-slate-200 transition hover:text-brand"><X className="size-4" /></button>
          </div>
          {deep && <ObjectWorkspace name={deep} />}
        </DialogContent>
      </Dialog>
    </>
  );
}

function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><p className="eyebrow mb-1 text-slate-400">{label}</p><div className="text-sm font-medium text-slate-700">{children}</div></div>;
}
function Metric({ n, label, icon }: { n: number; label: string; icon: React.ReactNode }) {
  return <div className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-center"><div className="flex items-center justify-center gap-1 text-lg font-extrabold tabular-nums text-slate-900">{icon}{n}</div><div className="eyebrow text-slate-400">{label}</div></div>;
}
