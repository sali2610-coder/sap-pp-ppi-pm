"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, ChevronDown, ArrowLeft, Workflow, FlaskConical, Beaker } from "lucide-react";
import { PROCESS_MAPS, type ProcessMap } from "@/data/processes";
import { tcodeHref } from "@/lib/tcode-search";
import { tableByName } from "@/lib/knowledge-graph";
import { incidentBySlug } from "@/data/troubleshooting";
import { Highlight } from "@/components/highlight";

const DC: Record<string, string> = { MM: "#0891b2", SD: "#db2777", "PP-PI": "#6d28d9", QM: "#0d9488", PM: "#f97316" };

const stepHay = (s: ProcessMap["steps"][number]) => `${s.he} ${s.tcodes.join(" ")} ${s.tables.join(" ")} ${(s.fiori || []).join(" ")} ${(s.interfaces || []).join(" ")}`.toLowerCase();

export function ProcessFlowExplorer() {
  const reduce = useReducedMotion();
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<string>(PROCESS_MAPS[0].slug);
  const [open, setOpen] = useState<number | null>(0);

  const s = q.trim().toLowerCase();

  // maps matching the query (by map text OR any step)
  const maps = useMemo(() => {
    if (!s) return PROCESS_MAPS;
    return PROCESS_MAPS.filter((m) => `${m.he} ${m.title} ${m.summary} ${m.domain}`.toLowerCase().includes(s) || m.steps.some((st) => stepHay(st).includes(s)));
  }, [s]);

  const active = useMemo(() => PROCESS_MAPS.find((m) => m.slug === sel) || maps[0] || PROCESS_MAPS[0], [sel, maps]);

  // steps of the active map, filtered when searching
  const steps = useMemo(() => {
    const all = active.steps.map((st, i) => ({ st, i }));
    return s ? all.filter(({ st }) => stepHay(st).includes(s)) : all;
  }, [active, s]);

  const totalMatches = useMemo(() => (s ? maps.reduce((a, m) => a + m.steps.filter((st) => stepHay(st).includes(s)).length, 0) : 0), [maps, s]);

  const tbl = (t: string) => (tableByName(t) ? `/object/${encodeURIComponent(t)}/` : "");
  const inc = (i: string) => (incidentBySlug(i) ? `/resolution/${i}/` : "");

  const container = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.05 } } };
  const item = { hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 14 }, show: { opacity: 1, y: 0, transition: reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 260, damping: 24 } } };

  return (
    <div className="space-y-5" dir="rtl">
      {/* search */}
      <div className="flex items-center gap-3 rounded-2xl border border-hairline bg-surface px-4 py-3 shadow-sm focus-within:border-brand/40">
        <Search className="size-5 shrink-0 text-brand" />
        <input value={q} onChange={(e) => { setQ(e.target.value); setOpen(null); }} placeholder="חפש תהליך, שלב, T-Code או טבלה — MRP, COR1, אצווה, MIGO…"
          className="h-7 w-full bg-transparent text-sm outline-none placeholder:text-ink-3" />
        {q && <motion.span key={totalMatches} initial={reduce ? false : { scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 500, damping: 24 }}
          className="shrink-0 rounded-lg bg-brand/10 px-2.5 py-1 text-xs font-extrabold text-brand">נמצאו {totalMatches} שלבים</motion.span>}
      </div>

      {/* process map selector */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
        {maps.map((m) => { const c = DC[m.domain] || "#64748b"; const on = m.slug === active.slug;
          return (
            <button key={m.slug} onClick={() => { setSel(m.slug); setOpen(0); }}
              className={`lift group relative overflow-hidden rounded-2xl border bg-surface p-3.5 text-start shadow-sm transition-all ${on ? "border-transparent ring-2" : "border-hairline hover:border-hairline"}`}
              style={on ? ({ ["--tw-ring-color"]: c } as React.CSSProperties) : undefined}>
              <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: c }} />
              <span className="grid size-8 place-items-center rounded-lg text-[10px] font-extrabold text-white" style={{ background: c }}>{m.domain.slice(0, 3)}</span>
              <div className="mt-2 text-sm font-extrabold text-ink-1"><Highlight text={m.he} query={q} /></div>
              <div className="text-[11px] font-semibold text-ink-3">{m.title} · {m.steps.length} שלבים</div>
            </button>
          ); })}
        {maps.length === 0 && <p className="col-span-full rounded-xl border border-dashed border-hairline p-6 text-center text-sm text-ink-3">אין תהליך תואם לחיפוש.</p>}
      </div>

      {/* active map flow */}
      {active && (
        <div className="rounded-3xl border border-hairline bg-surface p-5 shadow-[var(--elev-1)]">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl text-white shadow-lg" style={{ background: DC[active.domain] || "#64748b", boxShadow: `0 8px 20px ${(DC[active.domain] || "#64748b")}55` }}>
                {active.domain === "QM" ? <Beaker className="size-5" /> : active.domain.includes("PP") ? <FlaskConical className="size-5" /> : <Workflow className="size-5" />}
              </span>
              <div><h2 className="text-lg font-extrabold tracking-tight text-ink-1">{active.he} · {active.title}</h2><p className="text-xs text-ink-3">{active.summary}</p></div>
            </div>
            <Link href={`/process-explorer/${active.slug}/`} className="lift inline-flex items-center gap-1.5 rounded-xl bg-brand px-3 py-2 text-xs font-bold text-brand-foreground shadow-lg shadow-brand/30">תצוגה מלאה<ArrowLeft className="size-3.5" /></Link>
          </div>

          <motion.ol key={active.slug + s} variants={container} initial="hidden" animate="show" className="relative space-y-2.5 border-r-2 border-hairline pr-5">
            {steps.map(({ st, i }) => { const isOpen = open === i; const c = DC[active.domain] || "#4338ca";
              return (
                <motion.li key={i} variants={item} className="relative">
                  <span className="absolute -right-[27px] top-3.5 grid size-5 place-items-center rounded-full text-[10px] font-extrabold text-white ring-4 ring-white" style={{ background: c }}>{i + 1}</span>
                  <div className={`overflow-hidden rounded-2xl border bg-surface shadow-sm transition-colors ${isOpen ? "border-brand/30" : "border-hairline hover:border-hairline"}`}>
                    <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-2 px-4 py-3 text-start">
                      <h3 className="text-sm font-extrabold text-ink-1"><Highlight text={st.he} query={q} /></h3>
                      <span className="flex items-center gap-2">
                        <span className="hidden gap-1 sm:flex">{st.tcodes.slice(0, 3).map((tc) => <span key={tc} className="tech rounded bg-surface-2 px-1.5 py-0.5 text-[10px] font-bold text-ink-3" dir="ltr"><Highlight text={tc} query={q} /></span>)}</span>
                        <ChevronDown className={`size-4 shrink-0 text-ink-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div initial={reduce ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={reduce ? undefined : { height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
                          <div className="grid gap-2.5 border-t border-hairline px-4 py-3 sm:grid-cols-2">
                            <Field label="T-Codes"><Chips items={st.tcodes} hrefFn={tcodeHref} q={q} tone="#0f766e" /></Field>
                            <Field label="טבלאות"><Chips items={st.tables} hrefFn={tbl} q={q} tone="#0891b2" /></Field>
                            {st.fiori && <Field label="Fiori"><Chips items={st.fiori} q={q} tone="#7c3aed" /></Field>}
                            {st.interfaces && <Field label="ממשקים"><Chips items={st.interfaces} q={q} tone="#0d9488" /></Field>}
                            {st.incidents && st.incidents.length > 0 && <Field label="תקלות"><Chips items={st.incidents} hrefFn={inc} q={q} tone="#dc2626" /></Field>}
                            {st.test && <div className="sm:col-span-2"><p className="rounded-lg bg-fuchsia-50 px-2.5 py-1.5 text-[11px] font-semibold text-fuchsia-800">QA: <Highlight text={st.test} query={q} /></p></div>}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.li>
              ); })}
            {steps.length === 0 && <li className="rounded-xl border border-dashed border-hairline p-5 text-center text-sm text-ink-3">אין שלב תואם בתהליך זה.</li>}
          </motion.ol>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><p className="eyebrow mb-1 text-ink-3">{label}</p>{children}</div>;
}
function Chips({ items, hrefFn, q, tone }: { items?: string[]; hrefFn?: (s: string) => string; q: string; tone: string }) {
  if (!items || !items.length) return null;
  return <div className="flex flex-wrap gap-1.5">{items.map((it) => { const h = hrefFn ? hrefFn(it) : ""; return h
    ? <Link key={it} href={h} className="tech rounded-md border bg-surface-2 px-2 py-0.5 text-[11px] font-bold text-ink-2 transition hover:text-brand" style={{ borderColor: tone + "44" }} dir="ltr"><Highlight text={it} query={q} /></Link>
    : <span key={it} className="tech rounded-md border border-dashed border-hairline bg-surface px-2 py-0.5 text-[11px] font-bold text-ink-3" dir="ltr"><Highlight text={it} query={q} /></span>; })}</div>;
}
