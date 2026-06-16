"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Search, ChevronDown, ArrowLeft, Monitor, LayoutGrid, Network, Webhook, Database, Cable,
  GitBranch, Workflow, Puzzle, Printer, GitPullRequest, Server, Activity, ShieldCheck, KeyRound, Plug, Boxes, FileCode,
} from "lucide-react";
import { INFRA_LAYERS, INFRA_GROUPS, type InfraKind, type InfraLayer } from "@/data/infrastructure";
import { lookupTCode } from "@/lib/tcode-index";
import { Highlight } from "@/components/highlight";
import { EmptyState } from "@/components/ui/empty-state";

const ICON: Record<InfraKind, typeof Monitor> = {
  gui: Monitor, fiori: LayoutGrid, gateway: Network, odata: Webhook, cds: FileCode, rfc: Plug,
  bapi: Boxes, idoc: Cable, pipo: GitBranch, cpi: Network, hana: Database, auth: KeyRound,
  roles: ShieldCheck, workflow: Workflow, enh: Puzzle, output: Printer, transport: GitPullRequest,
  landscape: Server, monitor: Activity,
};
const hay = (l: InfraLayer) => `${l.he} ${l.en} ${l.purpose} ${l.eccS4} ${l.tcodes.join(" ")} ${l.objects.join(" ")}`.toLowerCase();

export function InfrastructureExplorer() {
  const reduce = useReducedMotion();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const s = q.trim().toLowerCase();

  const layers = useMemo(() => (s ? INFRA_LAYERS.filter((l) => hay(l).includes(s)) : INFRA_LAYERS), [s]);
  const byGroup = useMemo(() => INFRA_GROUPS.map((g) => ({ g, items: layers.filter((l) => l.group === g.key) })).filter((x) => x.items.length), [layers]);

  const container = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.04 } } };
  const item = { hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 14 }, show: { opacity: 1, y: 0, transition: reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 240, damping: 24 } } };

  return (
    <div className="space-y-6" dir="rtl">
      {/* DEV → QA → PRD landscape strip */}
      <div className="surface flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-gradient-to-l from-slate-50 to-white p-4 shadow-[var(--elev-1)]">
        <span className="me-2 text-[11px] font-extrabold uppercase tracking-wide text-slate-400">נוף מערכות</span>
        {[["DEV", "פיתוח", "#0891b2"], ["QA", "בקרת איכות", "#b45309"], ["PRD", "ייצור", "#16a34a"]].map(([code, he, c], i, a) => (
          <span key={code} className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 shadow-sm" style={{ borderColor: c + "55" }}>
              <span className="grid size-7 place-items-center rounded-lg text-[10px] font-extrabold text-white" style={{ background: c }}>{code}</span>
              <span className="text-xs font-bold text-slate-700">{he}</span>
            </span>
            {i < a.length - 1 && <ArrowLeft className="size-4 text-slate-300" />}
          </span>
        ))}
        <span className="ms-2 text-[11px] font-medium text-slate-400">תעבורות מבוקרות (STMS) לאורך הנוף</span>
      </div>

      {/* search */}
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-brand/40">
        <Search className="size-5 shrink-0 text-brand" />
        <input value={q} onChange={(e) => { setQ(e.target.value); setOpen(null); }} placeholder="חפש שכבת תשתית — Fiori, OData, IDoc, HANA, PFCG, BAdI…"
          className="h-7 w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
        {q && <motion.span key={layers.length} initial={reduce ? false : { scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 500, damping: 24 }}
          className="shrink-0 rounded-lg bg-brand/10 px-2.5 py-1 text-xs font-extrabold text-brand">נמצאו {layers.length} שכבות</motion.span>}
      </div>

      {byGroup.length === 0 && <EmptyState title="לא נמצאה שכבת תשתית" hint="נסה מונח אחר" suggestions={["Fiori", "OData", "IDoc", "HANA"].map((t) => ({ label: t, onClick: () => setQ(t) }))} />}

      {byGroup.map(({ g, items }) => (
        <section key={g.key}>
          <h2 className="mb-3 flex items-center gap-2 text-lg font-extrabold tracking-tight text-slate-900">
            <span className="size-2.5 rounded-full" style={{ background: g.accent }} />{g.he}
            <span className="text-xs font-semibold text-slate-400">· {g.en}</span>
          </h2>
          <motion.div variants={container} initial="hidden" animate="show" className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
            {items.map((l) => { const Icon = ICON[l.id]; const isOpen = open === l.id;
              return (
                <motion.div key={l.id} variants={item} layout={!reduce}
                  className={`group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition-all ${isOpen ? "border-transparent shadow-[var(--elev-2)] ring-1 xl:col-span-2" : "border-slate-200 hover:-translate-y-1 hover:shadow-[var(--elev-2)]"}`}
                  style={isOpen ? ({ ["--tw-ring-color"]: g.accent } as React.CSSProperties) : undefined}>
                  <span className="absolute inset-x-0 top-0 h-1" style={{ background: g.accent }} />
                  <button onClick={() => setOpen(isOpen ? null : l.id)} className="block w-full p-4 text-start">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="grid size-10 shrink-0 place-items-center rounded-xl text-white shadow-sm" style={{ background: g.accent }}><Icon className="size-5" /></span>
                        <div>
                          <div className="text-base font-extrabold text-slate-900"><Highlight text={l.he} query={q} /></div>
                          <div className="tech text-[11px] font-bold text-slate-400" dir="ltr"><Highlight text={l.en} query={q} /></div>
                        </div>
                      </div>
                      <ChevronDown className={`size-4 shrink-0 text-slate-300 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </div>
                    {!isOpen && <p className="mt-2 line-clamp-2 text-sm text-slate-600"><Highlight text={l.purpose} query={q} /></p>}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={reduce ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={reduce ? undefined : { height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
                        <div className="space-y-3 border-t border-slate-100 p-4">
                          <p className="text-sm leading-relaxed text-slate-600"><Highlight text={l.purpose} query={q} /></p>
                          <p className="rounded-lg bg-amber-50 px-2.5 py-1.5 text-[12px] font-medium text-amber-900"><span className="font-bold">ECC → S/4: </span><Highlight text={l.eccS4} query={q} /></p>
                          <Row label="T-Codes / כלים">{l.tcodes.map((c) => { const tc = lookupTCode(c); return tc ? <Link key={c} href={`/tcode/${encodeURIComponent(c)}/`} className="tech rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-bold text-slate-600 transition hover:text-brand" dir="ltr"><Highlight text={c} query={q} /></Link> : <span key={c} className="tech rounded-md border border-dashed border-slate-200 bg-white px-2 py-0.5 text-[11px] font-bold text-slate-500" dir="ltr"><Highlight text={c} query={q} /></span>; })}</Row>
                          <Row label="אובייקטים / artifacts">{l.objects.map((o) => <span key={o} className="tech rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600" dir="ltr"><Highlight text={o} query={q} /></span>)}</Row>
                          <p className="rounded-lg bg-brand/5 px-2.5 py-1.5 text-[12px] text-slate-600"><span className="font-bold text-brand">CBC: </span><Highlight text={l.cbc} query={q} /></p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ); })}
          </motion.div>
        </section>
      ))}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-1.5"><span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</span>{children}</div>;
}
