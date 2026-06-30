"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, Terminal, LayoutDashboard, Network, Database, Cable, Wrench, FlaskConical, Boxes, ArrowLeft } from "lucide-react";
import { playClick } from "@/lib/sound";

// Command Center — the platform's primary entry. Clear hierarchy: three HERO
// destinations (explore · learn · reference) + a compact secondary row. Real
// counts only. The single shortcut surface on the homepage (no duplicate grids).
interface Tile { href: string; he: string; en: string; sub: string; color: string; Icon: typeof BookOpen; count?: number }

export function QuickAccess({ counts = {} }: { counts?: Record<string, number> }) {
  const reduce = useReducedMotion();
  const heroes: Tile[] = [
    { href: "/apps/", he: "אפליקציות וטרנזקציות", en: "Daily Workspace", sub: "ECC ⇄ S/4 ⇄ Fiori ⇄ תהליך ⇄ טבלאות ⇄ בדיקות — חיפוש אחד", color: "#0f172a", Icon: Boxes, count: counts.apps2 },
    { href: "/studio/", he: "Architecture Studio", en: "Living Graph", sub: "חקור את נוף ה-SAP — גרף קשרים חי, אינטראקטיבי", color: "#d62027", Icon: Network },
    { href: "/library/", he: "ספריית SAP", en: "Learn", sub: "ספרים · אקדמיה · מסלולי למידה", color: "#0891b2", Icon: BookOpen },
  ];
  const more: Tile[] = [
    { href: "/transactions/", he: "מרכז טרנזקציות", en: "ECC Catalog", sub: "", color: "#2563eb", Icon: Terminal, count: counts.transactions },
    { href: "/pm/", he: "SAP PM", en: "תחזוקת מפעל", sub: "", color: "#f97316", Icon: Wrench },
    { href: "/pp-pi/", he: "SAP PP-PI", en: "ייצור תהליכי", sub: "", color: "#6d28d9", Icon: FlaskConical },
    { href: "/tables/", he: "חוקר טבלאות", en: "Table Explorer", sub: "", color: "#7c3aed", Icon: Database, count: counts.tables },
    { href: "/fiori-apps/", he: "Fiori Apps", en: "S/4HANA", sub: "", color: "#16a34a", Icon: LayoutDashboard, count: counts.apps },
  ];

  const grid = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.06 } } };
  const item = { hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 14 }, show: { opacity: 1, y: 0, transition: reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 260, damping: 24 } } };

  return (
    <section dir="rtl">
      <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400"><LayoutDashboard className="size-4 text-brand" />מרכז הפיקוד · התחל כאן</div>

      {/* hero destinations */}
      <motion.div variants={grid} initial="hidden" animate="show" className="grid gap-3 md:grid-cols-3">
        {heroes.map((t) => { const Ic = t.Icon; return (
          <motion.div key={t.href} variants={item}>
            <Link href={t.href} onClick={() => playClick()}
              className="group relative flex h-full min-h-[170px] flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <span aria-hidden className="pointer-events-none absolute -left-14 -top-14 size-44 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" style={{ background: t.color + "2e" }} />
              <span aria-hidden className="absolute inset-x-0 top-0 h-1 origin-right scale-x-0 transition-transform duration-300 group-hover:scale-x-100" style={{ background: t.color }} />
              <div className="relative flex items-start justify-between">
                <span className="grid size-14 place-items-center rounded-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" style={{ background: `linear-gradient(135deg,${t.color},${t.color}cc)`, boxShadow: `0 10px 26px -8px ${t.color}88` }}><Ic className="size-7" /></span>
                <span className="rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide" style={{ background: t.color + "12", color: t.color }}>{t.en}</span>
              </div>
              <div className="relative mt-4">
                <div className="flex items-center gap-2"><h3 className="text-xl font-extrabold tracking-tight text-slate-900">{t.he}</h3>{t.count != null && <span className="font-mono text-[13px] font-bold text-slate-400">{t.count.toLocaleString()}</span>}</div>
                <p className="mt-1 text-[13px] leading-relaxed text-slate-500">{t.sub}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-[12px] font-bold transition-all group-hover:gap-2" style={{ color: t.color }}>פתח<ArrowLeft className="size-3.5" /></span>
              </div>
            </Link>
          </motion.div>
        ); })}
      </motion.div>

      {/* secondary — compact */}
      <motion.div variants={grid} initial="hidden" animate="show" className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
        {more.map((t) => { const Ic = t.Icon; return (
          <motion.div key={t.href} variants={item}>
            <Link href={t.href} onClick={() => playClick()}
              className="lift group flex h-full items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm transition-colors hover:border-brand/30">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl text-white shadow-sm transition-transform duration-300 group-hover:scale-105" style={{ background: t.color }}><Ic className="size-5" /></span>
              <span className="min-w-0">
                <span className="flex items-center gap-1.5"><span className="truncate text-[14px] font-extrabold text-slate-800">{t.he}</span>{t.count != null && <span className="font-mono text-[11px] font-bold text-slate-400">{t.count.toLocaleString()}</span>}</span>
                <span className="block truncate text-[11px] font-medium text-slate-400">{t.en}</span>
              </span>
              <ArrowLeft className="ms-auto size-3.5 shrink-0 text-slate-300 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:text-brand" />
            </Link>
          </motion.div>
        ); })}
      </motion.div>
    </section>
  );
}
