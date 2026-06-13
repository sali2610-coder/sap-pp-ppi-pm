"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Wrench, FlaskConical, Network, BookOpen, ArrowLeft, Star, Clock,
  Activity, GitBranch, Layers, GraduationCap, Sparkles, TrendingUp, Database, Boxes, Gauge,
} from "lucide-react";
import { ALL_TABLES, PM_DATA, PPPI_DATA } from "@/lib/data";
import { ACADEMY_BOOKS } from "@/data/library/academy";
import { MIGRATION_STATUSES, type MigrationStatus } from "@/lib/types";
import { STATUS_META, statusColor } from "@/lib/status-meta";
import { useStatusMap } from "@/lib/status-store";
import { playClick } from "@/lib/sound";

/* ---- module registry ---- */
const MODULES = [
  { key: "pm", label: "SAP PM", sub: "תחזוקת מפעל", href: "/pm/", accent: "#f97316", Icon: Wrench, data: PM_DATA },
  { key: "ppi", label: "SAP PP-PI", sub: "ייצור תהליכי", href: "/pp-pi/", accent: "#6d28d9", Icon: FlaskConical, data: PPPI_DATA },
  { key: "arch", label: "SAP Architecture", sub: "מפת ארכיטקטורה · ERD", href: "/sap-infrastructure/", accent: "#d62027", Icon: Network, data: null },
  { key: "lib", label: "ספריית SAP", sub: "ספרים · אקדמיה", href: "/library/", accent: "#0891b2", Icon: BookOpen, data: null },
] as const;

function useList(key: string) {
  const [list, setList] = useState<string[]>([]);
  useEffect(() => { try { const r = JSON.parse(localStorage.getItem(key) || "[]"); if (Array.isArray(r)) setList(r); } catch { /* noop */ } }, [key]);
  const toggle = (id: string) => { setList((cur) => { const next = cur.includes(id) ? cur.filter((x) => x !== id) : [id, ...cur]; try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* noop */ } return next; }); };
  const push = (id: string) => { setList((cur) => { const next = [id, ...cur.filter((x) => x !== id)].slice(0, 4); try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* noop */ } return next; }); };
  return { list, toggle, push };
}

function useCount(target: number, instant: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (instant) { setV(target); return; }
    let raf = 0; const t0 = performance.now();
    const step = (t: number) => { const p = Math.min(1, (t - t0) / 1100); setV(Math.round((1 - Math.pow(1 - p, 3)) * target)); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf);
  }, [target, instant]);
  return v;
}

function Kpi({ icon, label, value, suffix }: { icon: React.ReactNode; label: string; value: number; suffix?: string }) {
  const reduce = useReducedMotion();
  const v = useCount(value, !!reduce);
  return (
    <div className="lift card-premium flex min-w-[150px] flex-1 items-center gap-3 p-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">{icon}</span>
      <div className="min-w-0">
        <div className="font-mono text-2xl font-extrabold tabular-nums leading-none text-slate-900">{v.toLocaleString()}{suffix}</div>
        <div className="eyebrow mt-1 text-slate-400">{label}</div>
      </div>
    </div>
  );
}

function SectionTitle({ icon, children, action }: { icon: React.ReactNode; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-baseline justify-between">
      <h2 className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-slate-900">{icon}{children}</h2>
      {action}
    </div>
  );
}

export function CommandCenter() {
  const reduce = useReducedMotion();
  const statusMap = useStatusMap();
  const fav = useList("neo:home:fav");
  const recent = useList("neo:home:recent");

  const insights = useMemo(() => {
    const relations = ALL_TABLES.reduce((a, t) => a + (t.relations?.length || 0), 0);
    const fields = ALL_TABLES.reduce((a, t) => a + (t.fields?.length || 0), 0);
    const tcodes = new Set(ALL_TABLES.flatMap((t) => (t.tcodes || "").split(/[^A-Za-z0-9_./]+/).filter((x) => x.length >= 3 && /^[A-Z]/i.test(x)))).size;
    const bapis = new Set(ALL_TABLES.flatMap((t) => (t.funcs || []).map((f) => f[0]).filter(Boolean))).size;
    const s4 = ALL_TABLES.filter((t) => t.s4AltTable || t.s4AltTcode).length;
    const top = [...ALL_TABLES].sort((a, b) => (b.relations?.length || 0) - (a.relations?.length || 0))[0];
    return { tables: ALL_TABLES.length, relations, fields, tcodes, bapis, s4, top };
  }, []);

  // migration activity (live)
  const migration = useMemo(() => {
    const counts: Record<MigrationStatus, number> = { "Not started": 0, "In analysis": 0, "In conversion": 0, Tested: 0, Done: 0 };
    ALL_TABLES.forEach((t) => { const s = (statusMap[t.id] ?? t.migrationStatus) as MigrationStatus; counts[s] = (counts[s] || 0) + 1; });
    const total = ALL_TABLES.length;
    const advanced = counts["In conversion"] + counts.Tested + counts.Done;
    return { counts, total, pct: Math.round((advanced / total) * 100) };
  }, [statusMap]);

  const academyLive = ACADEMY_BOOKS.filter((b) => b.status === "live");
  const academyUnits = ACADEMY_BOOKS.reduce((s, b) => s + b.nodes, 0);

  const KPIS = [
    { icon: <Boxes className="size-5" />, label: "מודולים", value: 12 },
    { icon: <Database className="size-5" />, label: "טבלאות", value: insights.tables },
    { icon: <GitBranch className="size-5" />, label: "קשרים", value: insights.relations },
    { icon: <Activity className="size-5" />, label: "T-Codes", value: insights.tcodes },
    { icon: <Layers className="size-5" />, label: "BAPIs", value: insights.bapis },
    { icon: <GraduationCap className="size-5" />, label: "יחידות לימוד", value: academyUnits },
    { icon: <Gauge className="size-5" />, label: "התקדמות מיגרציה", value: migration.pct, suffix: "%" },
  ];

  const container = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.06 } } };
  const item = { hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 }, show: { opacity: 1, y: 0, transition: reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 240, damping: 24 } } };

  return (
    <div className="space-y-9">
      {/* ===== executive KPI strip ===== */}
      <section>
        <div className="mb-2 flex items-center gap-2">
          <span className="eyebrow text-slate-400">Executive Overview</span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="flex flex-wrap gap-3">
          {KPIS.map((k) => <Kpi key={k.label} {...k} />)}
        </div>
      </section>

      {/* ===== quick actions ===== */}
      <section>
        <SectionTitle icon={<Sparkles className="size-5 text-brand" />}>פעולות מהירות</SectionTitle>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "פתח ארכיטקטורה", sub: "Explorer V2", href: "/sap-infrastructure/", Icon: Network, accent: "#d62027" },
            { label: "קוקפיט PM", sub: "מיגרציה", href: "/pm/", Icon: Wrench, accent: "#f97316" },
            { label: "קוקפיט PP-PI", sub: "מיגרציה", href: "/pp-pi/", Icon: FlaskConical, accent: "#6d28d9" },
            { label: "ספרייה ולמידה", sub: "Academy", href: "/library/", Icon: BookOpen, accent: "#0891b2" },
          ].map((a) => (
            <Link key={a.href} href={a.href} onClick={() => { playClick(); recent.push(a.href); }}
              className="lift tap group card-premium flex items-center gap-3 p-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110" style={{ background: a.accent, boxShadow: `0 8px 20px ${a.accent}55` }}><a.Icon className="size-5" /></span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-slate-900">{a.label}</span>
                <span className="eyebrow text-slate-400">{a.sub}</span>
              </span>
              <ArrowLeft className="size-4 shrink-0 text-slate-300 transition group-hover:-translate-x-0.5 group-hover:text-slate-600" />
            </Link>
          ))}
        </div>
      </section>

      {/* ===== modules (favorites + recent) ===== */}
      <section>
        <SectionTitle icon={<Boxes className="size-5 text-brand" />} action={<span className="text-xs font-medium text-slate-400">★ לסימון מועדף</span>}>מודולים וכלים</SectionTitle>
        <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[...MODULES].sort((a, b) => Number(fav.list.includes(b.key)) - Number(fav.list.includes(a.key))).map((m) => {
            const c = m.data ? { tables: m.data.topics.flatMap((tp) => tp.tables).length, topics: m.data.topics.length } : null;
            const isFav = fav.list.includes(m.key);
            const isRecent = recent.list.includes(m.href);
            return (
              <motion.div key={m.key} variants={item} className="group lift relative overflow-hidden card-premium p-5">
                <span className="absolute inset-x-0 top-0 h-1" style={{ background: m.accent }} />
                <span className="pointer-events-none absolute -left-10 -top-10 size-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20" style={{ background: m.accent }} />
                <div className="flex items-start justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" style={{ background: m.accent, boxShadow: `0 8px 20px ${m.accent}55` }}><m.Icon className="size-6" /></span>
                  <button onClick={() => { playClick(); fav.toggle(m.key); }} aria-label="מועדף" className="rounded-full p-1.5 transition tap hover:bg-slate-100">
                    <Star className={`size-4 ${isFav ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} />
                  </button>
                </div>
                <h3 className="mt-3 text-lg font-extrabold tracking-tight text-slate-900">{m.label}</h3>
                <p className="text-xs font-semibold" style={{ color: m.accent }}>{m.sub}</p>
                {c && <div className="mt-2 flex gap-1.5"><span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">{c.tables} טבלאות</span><span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">{c.topics} נושאים</span></div>}
                {isRecent && <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-slate-400"><Clock className="size-3" /> נפתח לאחרונה</span>}
                <Link href={m.href} onClick={() => { playClick(); recent.push(m.href); }} className="absolute inset-0" aria-label={m.label} />
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ===== two-column: learning progress + migration activity ===== */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* learning */}
        <section className="card-premium p-5">
          <SectionTitle icon={<GraduationCap className="size-5 text-brand" />} action={<Link href="/library/academy/" className="text-xs font-bold text-brand hover:underline">לוח בקרה</Link>}>התקדמות למידה</SectionTitle>
          <div className="space-y-3.5">
            {academyLive.map((b) => { const pct = b.chaptersTotal ? Math.round((b.chaptersDone / b.chaptersTotal) * 100) : 0; const c = b.module === "PM" ? "#f97316" : b.module === "QM" ? "#059669" : "#d62027"; return (
              <Link key={b.id} href={b.href || "#"} className="group block">
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-bold text-slate-700 group-hover:text-slate-900">{b.titleHe}</span>
                  <span className="font-mono text-xs font-bold" style={{ color: c }}>{pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: `linear-gradient(90deg,${c},${c}aa)` }} />
                </div>
                <div className="mt-1 eyebrow text-slate-400">{b.chaptersDone}/{b.chaptersTotal} פרקים · {b.nodes} יחידות{b.qualityScore != null ? ` · איכות ${b.qualityScore}` : ""}</div>
              </Link>
            ); })}
          </div>
        </section>

        {/* migration activity */}
        <section className="card-premium p-5">
          <SectionTitle icon={<TrendingUp className="size-5 text-brand" />} action={<span className="font-mono text-sm font-extrabold text-brand">{migration.pct}%</span>}>פעילות מיגרציה</SectionTitle>
          {/* stacked bar */}
          <div className="flex h-3 overflow-hidden rounded-full">
            {MIGRATION_STATUSES.map((s) => { const n = migration.counts[s]; const w = (n / migration.total) * 100; return w > 0 ? <div key={s} title={`${STATUS_META[s].he}: ${n}`} style={{ width: `${w}%`, background: statusColor(s) }} /> : null; })}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {MIGRATION_STATUSES.map((s) => (
              <div key={s} className="flex items-center gap-2 rounded-lg border border-slate-100 px-2.5 py-1.5">
                <span className="size-2.5 shrink-0 rounded-full" style={{ background: statusColor(s) }} />
                <span className="truncate text-[11px] font-semibold text-slate-500">{STATUS_META[s].he}</span>
                <span className="ms-auto font-mono text-xs font-extrabold text-slate-900">{migration.counts[s]}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ===== architecture insights ===== */}
      <section>
        <SectionTitle icon={<Network className="size-5 text-brand" />} action={<Link href="/sap-infrastructure/" className="inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline">חקור <ArrowLeft className="size-3.5" /></Link>}>תובנות ארכיטקטורה</SectionTitle>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "שדות טכניים", value: insights.fields, Icon: Database },
            { label: "קשרי ישויות", value: insights.relations, Icon: GitBranch },
            { label: "שינויי S/4HANA", value: insights.s4, Icon: TrendingUp },
            { label: "הטבלה המקושרת ביותר", text: insights.top?.tableName, sub: `${insights.top?.relations?.length || 0} קשרים`, Icon: Boxes },
          ].map((c) => (
            <div key={c.label} className="lift card-premium p-4">
              <c.Icon className="size-5 text-slate-300" />
              {"value" in c && c.value != null
                ? <div className="mt-2 font-mono text-2xl font-extrabold text-slate-900">{c.value.toLocaleString()}</div>
                : <div className="mt-2 font-mono text-lg font-extrabold text-slate-900" dir="ltr">{c.text}</div>}
              <div className="eyebrow mt-1 text-slate-400">{c.label}</div>
              {"sub" in c && c.sub && <div className="mt-0.5 text-[11px] text-slate-400">{c.sub}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ===== recommended next actions ===== */}
      <section>
        <SectionTitle icon={<Sparkles className="size-5 text-brand" />}>מומלץ להמשך</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { t: "המשך את ניתוח המיגרציה", d: `${migration.counts["Not started"]} טבלאות טרם נותחו`, href: "/pm/", Icon: Wrench, c: "#f97316" },
            { t: "חקור תלויות באקספלורר", d: "מצב Impact + Lineage חדש", href: "/sap-infrastructure/", Icon: Network, c: "#d62027" },
            { t: "המשך מסלול למידה", d: `${academyLive.length} מסלולים פעילים`, href: "/library/", Icon: GraduationCap, c: "#0891b2" },
          ].map((r) => (
            <Link key={r.t} href={r.href} onClick={() => playClick()} className="lift tap group card-premium flex items-start gap-3 p-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl text-white shadow-md" style={{ background: r.c }}><r.Icon className="size-5" /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-slate-900">{r.t}</span>
                <span className="mt-0.5 block text-xs text-slate-400">{r.d}</span>
              </span>
              <ArrowLeft className="size-4 shrink-0 text-slate-300 transition group-hover:-translate-x-0.5 group-hover:text-slate-600" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
