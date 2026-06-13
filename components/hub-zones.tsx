"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { domainsByModule } from "@/data/domains";
import {
  Database, Boxes, Gauge, Bell, ClipboardList, ShieldCheck, History, Wrench, Layers,
  FlaskConical, Cpu, PackageCheck, GitBranch, BarChart3, Settings, ArrowLeft,
} from "lucide-react";
import type { SAPModuleData, SAPTopic } from "@/lib/types";
import { useStatusMap } from "@/lib/status-store";
import { statusColor } from "@/lib/status-meta";
import type { MigrationStatus } from "@/lib/types";
import { playClick } from "@/lib/sound";

type LucideIcon = typeof Database;

/* clean a topic title: strip "N. " prefix + dangling "(" */
const clean = (t: string) => t.replace(/^\s*\d+\.\s*/, "").replace(/\s*\($/, "").trim();

/* pick an icon by keyword in the (Hebrew/English) title */
function iconFor(title: string): LucideIcon {
  const s = title.toLowerCase();
  if (/הודע|notif/.test(s)) return Bell;
  if (/פקוד|order|work/.test(s)) return ClipboardList;
  if (/מונע|preventive|תוכני/.test(s)) return Gauge;
  if (/סטטוס|status/.test(s)) return ShieldCheck;
  if (/היסטור|ארכיון|history/.test(s)) return History;
  if (/ציוד|מאסטר|master|חומר|material/.test(s)) return Database;
  if (/bom|עץ מוצר|עצי מוצר/.test(s)) return GitBranch;
  if (/מתכון|recipe/.test(s)) return FlaskConical;
  if (/משאב|resource|מרכז/.test(s)) return Cpu;
  if (/גרסא|version/.test(s)) return Layers;
  if (/אישור|confirm|מדיד|מונ/.test(s)) return PackageCheck;
  if (/קונפיג|customizing|config/.test(s)) return Settings;
  if (/עלות|co\b|אינטגרצ|mm\b|רכש|מלאי/.test(s)) return BarChart3;
  if (/קטלוג|קוד|profile/.test(s)) return Boxes;
  return Wrench;
}

function zoneStats(topic: SAPTopic, statusMap: Record<string, MigrationStatus>) {
  const counts: Record<MigrationStatus, number> = { "Not started": 0, "In analysis": 0, "In conversion": 0, Tested: 0, Done: 0 };
  topic.tables.forEach((t) => { const s = (statusMap[t.id] ?? t.migrationStatus) as MigrationStatus; counts[s]++; });
  const total = topic.tables.length || 1;
  const adv = counts["In conversion"] + counts.Tested + counts.Done;
  return { counts, total: topic.tables.length, pct: Math.round((adv / total) * 100) };
}

const STATUS_ORDER: MigrationStatus[] = ["Not started", "In analysis", "In conversion", "Tested", "Done"];

function MiniBar({ counts, total }: { counts: Record<MigrationStatus, number>; total: number }) {
  return (
    <div className="flex h-1.5 overflow-hidden rounded-full bg-slate-100">
      {STATUS_ORDER.map((s) => { const w = (counts[s] / (total || 1)) * 100; return w > 0 ? <div key={s} style={{ width: `${w}%`, background: statusColor(s) }} /> : null; })}
    </div>
  );
}

export function HubZones({ module, accent }: { module: SAPModuleData; accent: string }) {
  const reduce = useReducedMotion();
  const router = useRouter();
  const statusMap = useStatusMap();
  const isFlow = module.module !== "PM"; // PP-PI = business flow; PM = zone grid
  const topics = module.topics;

  const title = isFlow ? "מרכז תבונת ייצור · זרימה עסקית" : "מרכז שליטה תחזוקה · אזורים";
  const sub = isFlow ? "Production Intelligence Center" : "Plant Maintenance Command Center";

  const container = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.05 } } };
  const item = { hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 }, show: { opacity: 1, y: 0, transition: reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 240, damping: 24 } } };

  // structural KPIs
  const tables = topics.flatMap((tp) => tp.tables);
  const relations = tables.reduce((a, t) => a + (t.relations?.length || 0), 0);
  const tcodes = new Set(tables.flatMap((t) => (t.tcodes || "").split(/[^A-Za-z0-9_/]+/).filter((x) => x.length >= 2 && /^[A-Z]/i.test(x)))).size;
  const bapis = new Set(tables.flatMap((t) => (t.funcs || []).map((f) => f[0]).filter(Boolean))).size;
  const adv = tables.filter((t) => { const s = statusMap[t.id] ?? t.migrationStatus; return s === "In conversion" || s === "Tested" || s === "Done"; }).length;
  const pct = Math.round((adv / (tables.length || 1)) * 100);
  const KPIS = [["טבלאות", tables.length], ["קשרים", relations], ["T-Codes", tcodes], ["BAPIs", bapis], ["מיגרציה", `${pct}%`]];
  const domains = domainsByModule(module.module as "PM" | "PP-PI");

  return (
    <section className="card-premium p-5">
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <span className="eyebrow text-slate-400">{sub}</span>
          <h3 className="text-lg font-extrabold tracking-tight text-slate-900">{title}</h3>
        </div>
        <span className="text-xs font-medium text-slate-400">{topics.length} אזורים</span>
      </div>

      {/* KPI strip */}
      <div className="mb-4 grid grid-cols-3 gap-2 sm:grid-cols-5">
        {KPIS.map(([l, n]) => (
          <div key={l as string} className="rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-2 text-center">
            <div className="font-mono text-xl font-extrabold text-slate-900">{n as React.ReactNode}</div>
            <div className="eyebrow mt-0.5 text-slate-400">{l as string}</div>
          </div>
        ))}
      </div>

      <motion.div variants={container} initial="hidden" animate="show"
        className={isFlow ? "flex gap-3 overflow-x-auto pb-2" : "grid gap-3 sm:grid-cols-2 lg:grid-cols-3"}>
        {topics.map((tp, i) => {
          const Icon = iconFor(tp.title);
          const st = zoneStats(tp, statusMap);
          const top = tp.tables.slice(0, 3).map((t) => t.tableName);
          return (
            <motion.button key={tp.idx} variants={item} onClick={() => { playClick(); router.push(`/process/${encodeURIComponent(`${module.module}-${tp.idx}`)}`); }}
              className={`lift tap group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 text-start ${isFlow ? "min-w-[230px] shrink-0" : ""}`}
              style={{ boxShadow: "var(--shadow-card)" }}>
              <span className="absolute inset-x-0 top-0 h-1" style={{ background: accent }} />
              <span className="pointer-events-none absolute -left-8 -top-8 size-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-15" style={{ background: accent }} />
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-xl text-white shadow-md" style={{ background: accent }}><Icon className="size-5" /></span>
                {isFlow ? <span className="font-mono text-2xl font-extrabold text-slate-200">{String(i + 1).padStart(2, "0")}</span>
                  : <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">{st.total} טבלאות</span>}
              </div>
              <h4 className="mt-3 line-clamp-2 text-sm font-extrabold leading-tight text-slate-900">{clean(tp.title)}</h4>
              {isFlow && <p className="mt-0.5 text-[11px] font-semibold text-slate-400">{st.total} טבלאות</p>}
              <div className="mt-3">
                <div className="mb-1 flex items-center justify-between text-[10px] font-bold text-slate-400"><span>התקדמות</span><span style={{ color: accent }}>{st.pct}%</span></div>
                <MiniBar counts={st.counts} total={st.total} />
              </div>
              <div className="mt-2.5 flex flex-wrap gap-1">
                {top.map((n) => <span key={n} className="tech rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-500" dir="ltr">{n}</span>)}
              </div>
              <span className="mt-3 flex items-center gap-1 text-[11px] font-bold opacity-0 transition group-hover:opacity-100" style={{ color: accent }}>פתח אזור <ArrowLeft className="size-3" /></span>
              {isFlow && i < topics.length - 1 && <ArrowLeft className="pointer-events-none absolute -left-2.5 top-1/2 z-10 size-5 -translate-y-1/2 text-slate-300" />}
            </motion.button>
          );
        })}
      </motion.div>

      {/* SAP functional domains (authored knowledge) */}
      {domains.length > 0 && (
        <div className="mt-6 border-t border-slate-100 pt-5">
          <div className="mb-3 flex items-baseline justify-between">
            <h4 className="text-sm font-extrabold tracking-tight text-slate-900">תחומים מקצועיים · SAP {module.module} Domains</h4>
            <span className="text-xs font-medium text-slate-400">{domains.length} תחומים</span>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {domains.map((d) => (
              <Link key={d.slug} href={`/domain/${d.slug}`} className="lift tap group flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-sm">
                <span className="min-w-0"><span className="block truncate text-sm font-bold text-slate-900">{d.he}</span><span className="block truncate text-[11px] text-slate-400" dir="ltr">{d.title}</span></span>
                <ArrowLeft className="size-4 shrink-0 text-slate-300 transition group-hover:-translate-x-0.5" style={{ color: accent }} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
