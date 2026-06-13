"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Wrench, FlaskConical, Network, BookOpen, ArrowLeft, Table2, GitBranch } from "lucide-react";
import { PM_DATA, PPPI_DATA } from "@/lib/data";
import type { SAPModuleData } from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import { playClick } from "@/lib/sound";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 240, damping: 24 } } };

function counts(data: SAPModuleData) {
  const tables = data.topics.flatMap((tp) => tp.tables);
  return { tables: tables.length, topics: data.topics.length };
}

function ModuleCard({ href, data, Icon, keyId, accent }: { href: string; data: SAPModuleData; Icon: typeof Wrench; keyId: "pm" | "ppi"; accent: string }) {
  const { t } = useI18n();
  const c = counts(data);
  return (
    <motion.div variants={item} className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
      <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: accent }} />
      <span className="pointer-events-none absolute -left-10 -top-10 size-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25" style={{ background: accent }} />
      <div className="relative p-6">
        <div className="flex items-start justify-between">
          <div className="flex size-14 items-center justify-center rounded-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" style={{ background: accent, boxShadow: `0 8px 22px ${accent}55` }}>
            <Icon className="size-7" />
          </div>
          <span className="flex size-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition group-hover:text-white" style={{ ["--tw-bg-opacity" as string]: 1 }}>
            <ArrowLeft className="size-4" />
          </span>
        </div>
        <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900">{t(`hub.${keyId}.title`)}</h3>
        <p className="text-sm font-semibold" style={{ color: accent }}>{t(`hub.${keyId}.subtitle`)}</p>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">{t(`hub.${keyId}.desc`)}</p>
        <div className="mt-4 flex gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600"><Table2 className="size-3.5" />{c.tables} טבלאות</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600"><GitBranch className="size-3.5" />{c.topics} נושאים</span>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href={href} onClick={() => playClick()} className="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-bold text-white shadow-sm transition hover:brightness-110 active:scale-95" style={{ background: accent }}>
            פתח מודול
          </Link>
          <Link href="/sap-infrastructure/" onClick={() => playClick()} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 active:scale-95">
            <Network className="size-4" /> ארכיטקטורה
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function ShortcutTile({ href, title, sub, Icon, accent }: { href: string; title: string; sub: string; Icon: typeof Network; accent: string }) {
  return (
    <motion.div variants={item}>
      <Link href={href} onClick={() => playClick()} className="group flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex size-12 items-center justify-center rounded-2xl text-white shadow-lg" style={{ background: accent }}><Icon className="size-6" /></div>
          <ArrowLeft className="size-5 text-slate-300 transition group-hover:text-slate-600" />
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-extrabold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">{sub}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export function HubCards() {
  return (
    <section className="space-y-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-extrabold tracking-tight text-slate-900">גישה מהירה</h2>
        <span className="text-xs font-medium text-slate-400">בחר מודול או כלי</span>
      </div>
      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <ModuleCard href="/pm/" data={PM_DATA} Icon={Wrench} keyId="pm" accent="#f97316" />
        <ModuleCard href="/pp-pi/" data={PPPI_DATA} Icon={FlaskConical} keyId="ppi" accent="#6d28d9" />
        <ShortcutTile href="/sap-infrastructure/" title="SAP Architecture" sub="מפת מודולים · מודל נתונים · ERD" Icon={Network} accent="#d62027" />
        <ShortcutTile href="/library/" title="ספריית SAP" sub="ספרים · אקדמיה · פרקים" Icon={BookOpen} accent="#0891b2" />
      </motion.div>
    </section>
  );
}
