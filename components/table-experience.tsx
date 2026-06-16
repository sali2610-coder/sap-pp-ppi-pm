"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Database, KeyRound, Link2, GitBranch, Layers, ArrowLeft, ChevronDown, Terminal, Boxes, Workflow } from "lucide-react";
import type { SAPModuleData, SAPTable, SAPField } from "@/lib/types";
import { StatusSelect } from "@/components/status-select";
import { Highlight } from "@/components/highlight";
import { EmptyState } from "@/components/ui/empty-state";
import { useI18n } from "@/lib/i18n";

const accentFor = (m: string) => (m === "PM" ? "#f97316" : "#6d28d9");
const splitTc = (s: string) => [...new Set((s || "").split(/[^A-Za-z0-9_]+/).map((c) => c.trim()).filter((c) => c.length >= 2))];

// D7 · Table Experience — progressive disclosure for module tables.
// L1 premium card → (click) L2 inline summary → (click) L3 PK/FK field explorer
// → full workspace. Same design language as the Objects pages.
export function TableExperience({ module, query }: { module: SAPModuleData; query: string }) {
  const { pick, lang, topic } = useI18n();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<string | null>(null);   // L2 expanded card
  const [fields, setFields] = useState<string | null>(null); // L3 field explorer
  const accent = accentFor(module.module);

  const q = query.trim().toLowerCase();
  const rows = useMemo(() => {
    const all = module.topics.flatMap((t) => t.tables);
    if (!q) return all;
    return all.filter((tb) => tb.tableName.toLowerCase().includes(q) || tb.descriptionHe.toLowerCase().includes(q) || tb.descriptionEn.toLowerCase().includes(q) || tb.tcodes.toLowerCase().includes(q) || tb.topicTitle.toLowerCase().includes(q));
  }, [module.topics, q]);

  const container = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.04 } } };
  const item = { hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 }, show: { opacity: 1, y: 0, transition: reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 240, damping: 24 } } };

  if (rows.length === 0) return <EmptyState title={lang === "he" ? "אין תוצאות" : "No results"} hint={lang === "he" ? "נסה מונח חיפוש אחר" : "Try another term"} />;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
      {rows.map((tb) => {
        const isOpen = open === tb.tableName;
        const showFields = fields === tb.tableName;
        const pk = tb.fields.filter((f) => f.key === "PK").length;
        const fk = tb.fields.filter((f) => f.key === "FK").length;
        const core = (tb.relations?.length || 0) >= 6; // high blast-radius → core object
        return (
          <motion.div key={tb.id} variants={item} layout={!reduce}
            className={`spotlight group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition-all ${isOpen ? "border-transparent shadow-[var(--elev-2)] ring-1 xl:col-span-2" : core ? "border-amber-200/70 ring-1 ring-amber-100 hover:-translate-y-1 hover:shadow-[var(--elev-2)]" : "border-slate-200 hover:-translate-y-1 hover:shadow-[var(--elev-2)]"}`}
            style={isOpen ? ({ ["--tw-ring-color"]: accent } as React.CSSProperties) : undefined}
            onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`); e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`); }}>
            <span className="absolute inset-x-0 top-0 h-1" style={{ background: accent }} />

            {/* L1 card head — click toggles L2 */}
            <button onClick={() => { setOpen(isOpen ? null : tb.tableName); if (isOpen) setFields(null); }} className="block w-full p-4 text-start">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl text-white shadow-sm" style={{ background: accent }}><Database className="size-5" /></span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="tech text-base font-extrabold text-slate-900" dir="ltr"><Highlight text={tb.tableName} query={query} /></span>
                      {core && <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-amber-700 ring-1 ring-amber-300/60">★ ליבה</span>}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400"><Layers className="size-3" />{topic(tb.topicTitle)}</div>
                  </div>
                </div>
                <ChevronDown className={`size-4 shrink-0 text-slate-300 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-slate-600"><Highlight text={pick(tb.descriptionHe, tb.descriptionEn)} query={query} /></p>
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <Badge icon={<GitBranch className="size-3" />} label={`${tb.relations?.length || 0} קשרים`} tone={accent} />
                <Badge icon={<KeyRound className="size-3" />} label={`${pk} PK · ${fk} FK`} tone="#0891b2" />
                <Badge icon={<Layers className="size-3" />} label={`${tb.fields.length} שדות`} tone="#64748b" />
              </div>
            </button>

            {/* L2 inline summary */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div initial={reduce ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={reduce ? undefined : { height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="space-y-3 border-t border-slate-100 p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="eyebrow text-slate-400">סטטוס מיגרציה</span>
                      <StatusSelect id={tb.id} seed={tb.migrationStatus} />
                    </div>
                    {tb.s4Note && <p className="rounded-lg bg-amber-50 px-2.5 py-1.5 text-[11px] font-medium text-amber-900"><span className="font-bold">S/4: </span><Highlight text={tb.s4Note} query={query} /></p>}
                    {splitTc(tb.tcodes).length > 0 && <Row icon={<Terminal className="size-3" />} label="T-Codes">{splitTc(tb.tcodes).slice(0, 8).map((c) => <Chip key={c} href={`/tcode/${encodeURIComponent(c)}/`}>{c}</Chip>)}</Row>}
                    {(tb.funcs || []).length > 0 && <Row icon={<Boxes className="size-3" />} label="ממשקים">{tb.funcs.slice(0, 4).map((f) => <Chip key={f[0]}>{f[0]}</Chip>)}</Row>}

                    <div className="flex flex-wrap gap-2 pt-1">
                      <button onClick={() => setFields(showFields ? null : tb.tableName)} className="tap inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-brand/40 hover:text-brand">
                        <KeyRound className="size-3.5" />{showFields ? "הסתר שדות" : "סייר שדות (PK/FK)"}
                      </button>
                      <Link href={`/object/${encodeURIComponent(tb.tableName)}/`} className="lift inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold text-white shadow-lg" style={{ background: accent, boxShadow: `0 8px 18px ${accent}55` }}>
                        <Workflow className="size-3.5" />סביבת עבודה מלאה<ArrowLeft className="size-3.5" />
                      </Link>
                    </div>

                    {/* L3 field explorer with PK/FK visualization */}
                    <AnimatePresence initial={false}>
                      {showFields && (
                        <motion.div initial={reduce ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={reduce ? undefined : { height: 0, opacity: 0 }} transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}>
                          <FieldExplorer fields={tb.fields} query={query} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function FieldExplorer({ fields, query }: { fields: SAPField[]; query: string }) {
  const pk = fields.filter((f) => f.key === "PK").length, fk = fields.filter((f) => f.key === "FK").length;
  return (
    <div className="mt-1 overflow-hidden rounded-xl border border-slate-200">
      <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-3 py-2 text-[11px] font-bold">
        <span className="flex items-center gap-1 text-amber-600"><KeyRound className="size-3.5" />{pk} מפתח ראשי</span>
        <span className="flex items-center gap-1 text-cyan-600"><Link2 className="size-3.5" />{fk} מפתח זר</span>
        <span className="ms-auto text-slate-400">{fields.length} שדות</span>
      </div>
      <ul className="max-h-72 divide-y divide-slate-50 overflow-y-auto">
        {fields.map((f, i) => {
          const isPK = f.key === "PK", isFK = f.key === "FK";
          const edge = isPK ? "#f59e0b" : isFK ? "#0891b2" : "transparent";
          return (
            <li key={f.tech + i} className="flex items-center gap-2.5 px-3 py-1.5 text-sm" style={{ boxShadow: `inset 3px 0 0 ${edge}` }}>
              <span className="grid size-5 shrink-0 place-items-center">
                {isPK ? <KeyRound className="size-3.5 text-amber-500" /> : isFK ? <Link2 className="size-3.5 text-cyan-500" /> : <span className="size-1.5 rounded-full bg-slate-300" />}
              </span>
              <span className="tech w-32 shrink-0 font-bold text-slate-800" dir="ltr"><Highlight text={f.tech} query={query} /></span>
              <span className="min-w-0 flex-1 truncate text-xs text-slate-500"><Highlight text={f.he || f.en} query={query} /></span>
              <span className="shrink-0 font-mono text-[10px] font-bold text-slate-400">{f.dt}{f.len ? ` ${f.len}` : ""}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Badge({ icon, label, tone }: { icon: React.ReactNode; label: string; tone: string }) {
  return <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold tabular-nums" style={{ background: tone + "14", color: tone }}>{icon}{label}</span>;
}
function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-1.5"><span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">{icon}{label}</span>{children}</div>;
}
function Chip({ children, href }: { children: React.ReactNode; href?: string }) {
  const cls = "tech rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-bold text-slate-600 transition hover:text-brand";
  return href ? <Link href={href} className={cls} dir="ltr">{children}</Link> : <span className={`${cls} border-dashed`} dir="ltr">{children}</span>;
}
