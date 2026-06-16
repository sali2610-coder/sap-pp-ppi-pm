"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Activity, GitBranch, ArrowLeft, ShieldCheck } from "lucide-react";
import { ALL_TABLES } from "@/data/sapData";
import { useStatusMap } from "@/lib/status-store";
import { STATUS_META, statusColor } from "@/lib/status-meta";
import { MIGRATION_STATUSES, type MigrationStatus } from "@/lib/types";

const WEIGHT: Record<MigrationStatus, number> = { "Not started": 0, "In analysis": 0.25, "In conversion": 0.5, Tested: 0.75, Done: 1 };
const mc = (m?: string) => (m === "PM" ? "#f97316" : m === "QM" ? "#0d9488" : "#6d28d9");

// D7 · Executive Summary — migration readiness at a glance + objects to watch.
// Datadog/Grafana-style command band. SSR-safe (mounted gate → skeleton).
export function ExecutiveSummary() {
  const reduce = useReducedMotion();
  const map = useStatusMap();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { readiness, counts, watch } = useMemo(() => {
    const counts = Object.fromEntries(MIGRATION_STATUSES.map((s) => [s, 0])) as Record<MigrationStatus, number>;
    let acc = 0;
    for (const t of ALL_TABLES) {
      const st = (map[t.id] ?? t.migrationStatus) as MigrationStatus;
      counts[st]++; acc += WEIGHT[st] ?? 0;
    }
    const readiness = ALL_TABLES.length ? Math.round((acc / ALL_TABLES.length) * 100) : 0;
    const watch = [...ALL_TABLES].sort((a, b) => (b.relations?.length || 0) - (a.relations?.length || 0)).slice(0, 5);
    return { readiness, counts, watch };
  }, [map]);

  const total = ALL_TABLES.length;
  const R = 52, C = 2 * Math.PI * R;
  const pct = mounted ? readiness : 0;

  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="surface grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-[var(--elev-2)] lg:grid-cols-[auto_1fr_1.1fr]">
      {/* readiness ring */}
      <div className="flex items-center gap-4">
        <div className="relative grid size-32 shrink-0 place-items-center">
          <svg viewBox="0 0 128 128" className="size-32 -rotate-90">
            <circle cx="64" cy="64" r={R} fill="none" stroke="#eef2f7" strokeWidth="12" />
            <motion.circle cx="64" cy="64" r={R} fill="none" stroke="var(--brand)" strokeWidth="12" strokeLinecap="round"
              strokeDasharray={C} initial={false} animate={{ strokeDashoffset: C - (C * pct) / 100 }} transition={reduce ? { duration: 0 } : { duration: 1, ease: [0.22, 1, 0.36, 1] }} />
          </svg>
          <div className="absolute text-center">
            {mounted ? <span className="block text-3xl font-extrabold tabular-nums text-slate-900">{readiness}%</span> : <span className="skeleton block h-8 w-14 rounded" />}
            <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">מוכנות</span>
          </div>
        </div>
        <div>
          <div className="eyebrow flex items-center gap-1.5 text-brand"><Activity className="size-3.5" />Migration Readiness</div>
          <h2 className="mt-1 text-lg font-extrabold tracking-tight text-slate-900">מצב מיגרציה — מבט מנהלים</h2>
          <p className="mt-0.5 text-xs text-slate-500">{total} טבלאות · PM + PP-PI · ECC6 → S/4HANA</p>
        </div>
      </div>

      {/* status breakdown */}
      <div className="flex flex-col justify-center gap-2 border-slate-100 lg:border-x lg:px-6">
        <div className="flex h-2.5 overflow-hidden rounded-full bg-slate-100">
          {MIGRATION_STATUSES.map((s) => mounted && counts[s] > 0 ? (
            <motion.span key={s} initial={reduce ? false : { width: 0 }} animate={{ width: `${(counts[s] / total) * 100}%` }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: statusColor(s) }} title={`${STATUS_META[s].he}: ${counts[s]}`} />
          ) : null)}
          {!mounted && <span className="skeleton h-full w-full" />}
        </div>
        <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
          {MIGRATION_STATUSES.map((s) => (
            <div key={s} className="flex items-center gap-1.5 text-[11px]">
              <span className="size-2 shrink-0 rounded-full" style={{ background: statusColor(s) }} />
              <span className="font-semibold text-slate-500">{STATUS_META[s].he}</span>
              <span className="ms-auto font-mono font-bold text-slate-700 tabular-nums">{mounted ? counts[s] : "·"}</span>
            </div>
          ))}
        </div>
      </div>

      {/* objects to watch (spotlight on high-impact objects) */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="flex items-center gap-1.5 text-sm font-extrabold tracking-tight text-slate-900"><ShieldCheck className="size-4 text-brand" />אובייקטים לתשומת לב</h3>
          <span className="eyebrow text-slate-400">לפי רדיוס השפעה</span>
        </div>
        <div className="space-y-1.5">
          {watch.map((t, i) => (
            <motion.div key={t.id} initial={reduce ? false : { opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: reduce ? 0 : i * 0.05, duration: 0.4 }}>
              <Link href={`/lineage/?find=${encodeURIComponent(t.tableName)}`} className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition-all hover:-translate-y-px hover:border-brand/30">
                <span className="grid size-7 shrink-0 place-items-center rounded-lg text-[10px] font-extrabold text-white" style={{ background: mc(t.module) }}>{t.module === "PP-PI" ? "PPI" : t.module}</span>
                <span className="tech shrink-0 text-sm font-bold text-slate-900" dir="ltr">{t.tableName}</span>
                <span className="min-w-0 flex-1 truncate text-xs text-slate-500">{t.descriptionHe || t.descriptionEn}</span>
                <span className="shrink-0 rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-bold text-brand tabular-nums"><GitBranch className="me-0.5 inline size-2.5" />{t.relations?.length || 0}</span>
                <ArrowLeft className="size-3.5 shrink-0 text-slate-300 transition-all group-hover:-translate-x-0.5 group-hover:text-brand" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
