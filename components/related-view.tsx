"use client";

import { SmartLink as Link } from "@/components/smart-link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Database, Terminal, Boxes, Network, Workflow, Cable, FileCode2 } from "lucide-react";
import type { TableRef } from "@/lib/object-intel";
import { SapTip } from "@/components/sap-tip";
import { ObjectIntelligence } from "@/components/object-intelligence";
import type { ProfileKind } from "@/data/kind-intel";

const PROFILE_KIND: Partial<Record<string, ProfileKind>> = { "T-Code": "tcode", BAPI: "bapi", FM: "fm", IDoc: "idoc", CDS: "cds" };

const MOD_COLOR: Record<string, string> = { PM: "#f97316", "PP-PI": "#6d28d9", PP: "#6d28d9" };
const mc = (m: string) => MOD_COLOR[m] || "#64748b";
const RED = "#d62027";

const KIND_META: Record<string, { label: string; Icon: typeof Terminal; note: string }> = {
  "T-Code": { label: "Transaction Code", Icon: Terminal, note: "טרנזקציה — מקושר אוטומטית לטבלאות שמפנות אליה" },
  BAPI: { label: "BAPI", Icon: Boxes, note: "ממשק עסקי — סווג אוטומטית מתוך שמות ה-funcs" },
  FM: { label: "Function Module", Icon: Boxes, note: "מודול פונקציה — סווג אוטומטית" },
  IDoc: { label: "IDoc Message Type", Icon: Cable, note: "סוג הודעת IDoc — סווג אוטומטית" },
  Process: { label: "Business Process", Icon: Workflow, note: "תהליך = נושא מודול במאגר" },
  CDS: { label: "S/4HANA CDS View", Icon: FileCode2, note: "תצוגת CDS רשמית ב-S/4HANA — מיפוי מאומת לטבלאות ECC הקלאסיות" },
};

function TableChip({ t }: { t: TableRef }) {
  const c = mc(t.module);
  return (
    <Link href={`/object/${encodeURIComponent(t.name)}`} className="lift tap group flex items-center gap-2 rounded-xl border bg-surface px-3 py-2 shadow-sm" style={{ borderColor: c + "44" }}>
      <span className="size-2 shrink-0 rounded-full" style={{ background: c }} />
      <SapTip name={t.name} linkless><span className="tech text-sm font-bold" style={{ color: c }} dir="ltr">{t.name}</span></SapTip>
      <span className="min-w-0 flex-1 truncate text-xs text-ink-3">{t.he}</span>
      <ArrowLeft className="size-3.5 shrink-0 text-ink-3 transition group-hover:-translate-x-0.5 group-hover:text-ink-2" />
    </Link>
  );
}

export function RelatedView({ kind, code, accent, tables, chips, before, backHref = "/sap-infrastructure/", backLabel = "ארכיטקטורה" }: {
  kind: keyof typeof KIND_META; code: string; accent?: string; tables: TableRef[];
  chips?: { label: string; items: { text: string; href?: string }[]; icon?: "tcode" | "bapi" | "process" }[];
  before?: React.ReactNode;
  backHref?: string; backLabel?: string;
}) {
  const meta = KIND_META[kind];
  const c = accent || RED;
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-1.5 text-xs text-ink-3">
        <Link href="/" className="hover:text-ink-2">בית</Link><ArrowRight className="size-3 rotate-180" />
        <Link href={backHref} className="hover:text-ink-2">{backLabel}</Link><ArrowRight className="size-3 rotate-180" />
        <span className="font-bold text-ink-2">{code}</span>
      </div>

      <header className="relative overflow-hidden rounded-3xl p-6 text-white shadow-xl" style={{ background: `linear-gradient(135deg, ${RED}, #8f1318)` }}>
        <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: c }} />
        <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-surface/10 blur-3xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="eyebrow text-white/70">SAP Consultant Workbench · {meta.label}</span>
            <div className="mt-1 flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-surface/15 backdrop-blur-sm"><meta.Icon className="size-6" /></span>
              <h1 className="font-mono text-3xl font-extrabold tracking-tight" dir="ltr">{code}</h1>
            </div>
            <p className="mt-1.5 max-w-2xl text-sm text-white/85">{meta.note}</p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-surface/10 px-4 py-2.5 text-center backdrop-blur-sm">
            <div className="font-mono text-2xl font-extrabold">{tables.length}</div><div className="eyebrow text-white/70">טבלאות מקושרות</div>
          </div>
        </div>
      </header>

      {PROFILE_KIND[kind] && <ObjectIntelligence name={code} kind={PROFILE_KIND[kind]} />}

      {before}

      <section className="card-premium p-5">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-ink-3"><Database className="size-4" /> טבלאות מקושרות · {tables.length}</h3>
        {tables.length ? (
          <motion.div initial="h" animate="s" variants={{ h: {}, s: { transition: { staggerChildren: 0.03 } } }} className="grid-adaptive-sm">
            {tables.map((t) => <motion.div key={t.name} variants={{ h: { opacity: 0, y: 10 }, s: { opacity: 1, y: 0 } }}><TableChip t={t} /></motion.div>)}
          </motion.div>
        ) : <p className="text-sm italic text-ink-3">אין טבלאות מקושרות במאגר.</p>}
      </section>

      {chips?.map((grp) => grp.items.length > 0 && (
        <section key={grp.label} className="card-premium p-5">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-ink-3">
            {grp.icon === "tcode" ? <Terminal className="size-4" /> : grp.icon === "process" ? <Network className="size-4" /> : <Boxes className="size-4" />} {grp.label} · {grp.items.length}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {grp.items.map((it) => it.href
              ? <Link key={it.text} href={it.href} className="tech tap rounded-lg border border-hairline bg-surface px-2.5 py-1 text-xs font-bold text-ink-2 transition hover:border-brand hover:text-brand" dir="ltr"><SapTip name={it.text} linkless>{it.text}</SapTip></Link>
              : <SapTip key={it.text} name={it.text}><span className="tech rounded-lg bg-surface-2 px-2.5 py-1 text-xs font-bold text-ink-2" dir="ltr">{it.text}</span></SapTip>)}
          </div>
        </section>
      ))}
    </div>
  );
}
