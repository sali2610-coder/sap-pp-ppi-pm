"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Wrench, FlaskConical, Network, BookOpen, ArrowLeft, Star, Clock, Search } from "lucide-react";
import { PM_DATA, PPPI_DATA } from "@/lib/data";

/* module registry (used by Favorites) */
const MODULES = [
  { key: "pm", label: "SAP PM", sub: "תחזוקת מפעל", href: "/pm/", accent: "#f97316", Icon: Wrench, data: PM_DATA },
  { key: "ppi", label: "SAP PP-PI", sub: "ייצור תהליכי", href: "/pp-pi/", accent: "#6d28d9", Icon: FlaskConical, data: PPPI_DATA },
  { key: "arch", label: "SAP Architecture", sub: "מפת ארכיטקטורה · ERD", href: "/sap-infrastructure/", accent: "#d62027", Icon: Network, data: null },
  { key: "lib", label: "ספריית SAP", sub: "ספרים · אקדמיה", href: "/library/", accent: "#0891b2", Icon: BookOpen, data: null },
] as const;
const HREF_LABEL: Record<string, string> = { "/pm/": "SAP PM", "/pp-pi/": "SAP PP-PI", "/sap-infrastructure/": "SAP Architecture", "/library/": "ספריית SAP" };

function useList(key: string) {
  const [list, setList] = useState<string[]>([]);
  useEffect(() => { try { const r = JSON.parse(localStorage.getItem(key) || "[]"); if (Array.isArray(r)) setList(r); } catch { /* noop */ } }, [key]);
  const toggle = (id: string) => setList((cur) => { const next = cur.includes(id) ? cur.filter((x) => x !== id) : [id, ...cur]; try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* noop */ } return next; });
  return { list, toggle };
}

function Section({ icon, title, children, action }: { icon: React.ReactNode; title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between">
        <h2 className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-slate-900">{icon}{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function CommandCenter() {
  const reduce = useReducedMotion();
  const fav = useList("neo:home:fav");
  const recentPages = useList("neo:home:recent");
  const [recentObj, setRecentObj] = useState<string[]>([]);
  useEffect(() => { try { const r = JSON.parse(localStorage.getItem("neo:obj:recent") || "[]"); if (Array.isArray(r)) setRecentObj(r.slice(0, 8)); } catch { /* noop */ } }, []);

  const ordered = [...MODULES].sort((a, b) => Number(fav.list.includes(b.key)) - Number(fav.list.includes(a.key)));
  const container = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.06 } } };
  const item = { hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 }, show: { opacity: 1, y: 0, transition: reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 240, damping: 24 } } };
  const hasRecent = recentPages.list.length > 0 || recentObj.length > 0;

  return (
    <div className="space-y-9">
      {/* Search affordance */}
      <button onClick={() => window.dispatchEvent(new Event("neo:open-palette"))}
        className="lift group flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-start shadow-sm transition-colors hover:border-brand/30">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand transition-transform duration-300 group-hover:scale-105"><Search className="size-5" /></span>
        <span className="flex-1 text-sm font-medium text-slate-400">חיפוש טבלה · T-Code · BAPI · אובייקט · תהליך…</span>
        <kbd className="hidden rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[11px] font-semibold text-slate-400 sm:block">⌘K</kbd>
      </button>

      {/* Consultant quick access */}
      <Section icon={<Search className="size-5 text-brand" />} title="גישה מהירה — יועץ SAP">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
          {[
            { href: "/copilot/", he: "Copilot", sub: "שאל את NEO" },
            { href: "/solutions/", he: "מאתר פתרונות", sub: "לפי דרישה עסקית" },
            { href: "/transactions/", he: "טרנזקציות", sub: "253 · חיפוש חכם" },
            { href: "/process-explorer/", he: "תהליכי E2E", sub: "P2P/O2C/QM…" },
            { href: "/troubleshooting/", he: "פתרון תקלות", sub: "151 תקלות" },
            { href: "/oic/", he: "תבונת אובייקטים", sub: "גרף תלויות" },
            { href: "/evolution/", he: "אבולוציה ECC→S/4", sub: "מיגרציה" },
            { href: "/architect/", he: "לוח ארכיטקט", sub: "כיסוי + פערים" },
          ].map((q) => (
            <Link key={q.href} href={q.href} className="lift group relative overflow-hidden rounded-xl border border-slate-200 bg-white px-3.5 py-3 shadow-sm transition-colors hover:border-brand/30">
              <span aria-hidden className="absolute inset-y-0 end-0 w-0.5 origin-top scale-y-0 bg-brand transition-transform duration-300 group-hover:scale-y-100" />
              <div className="flex items-center justify-between gap-1">
                <div className="text-sm font-extrabold text-slate-800">{q.he}</div>
                <ArrowLeft className="size-3.5 shrink-0 text-slate-300 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:text-brand" />
              </div>
              <div className="text-[11px] font-medium text-slate-400">{q.sub}</div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Favorites */}
      <Section icon={<Star className="size-5 text-brand" />} title="מועדפים" action={<span className="text-xs font-medium text-slate-400">★ לסימון</span>}>
        <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {ordered.map((m) => {
            const c = m.data ? { tables: m.data.topics.flatMap((tp) => tp.tables).length, topics: m.data.topics.length } : null;
            const isFav = fav.list.includes(m.key);
            return (
              <motion.div key={m.key} variants={item} className="group lift relative overflow-hidden card-premium p-5">
                <span className="absolute inset-x-0 top-0 h-1" style={{ background: m.accent }} />
                <div className="flex items-start justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" style={{ background: m.accent, boxShadow: `0 8px 20px ${m.accent}55` }}><m.Icon className="size-6" /></span>
                  <button onClick={() => fav.toggle(m.key)} aria-label="מועדף" className="rounded-full p-1.5 transition tap hover:bg-slate-100"><Star className={`size-4 ${isFav ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} /></button>
                </div>
                <h3 className="mt-3 text-lg font-extrabold tracking-tight text-slate-900">{m.label}</h3>
                <p className="text-xs font-semibold" style={{ color: m.accent }}>{m.sub}</p>
                {c && <div className="mt-2 flex gap-1.5"><span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">{c.tables} טבלאות</span><span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">{c.topics} נושאים</span></div>}
                <Link href={m.href} className="absolute inset-0" aria-label={m.label} />
              </motion.div>
            );
          })}
        </motion.div>
      </Section>

      {/* Recent Activity */}
      {hasRecent && (
        <Section icon={<Clock className="size-5 text-brand" />} title="פעילות אחרונה">
          <div className="flex flex-wrap gap-2">
            {recentObj.map((n) => (
              <Link key={"o" + n} href={`/object/${encodeURIComponent(n)}`} className="lift inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm">
                <span className="size-2 rounded-full bg-brand" /><span className="tech font-bold text-slate-700" dir="ltr">{n}</span><ArrowLeft className="size-3.5 text-slate-300" />
              </Link>
            ))}
            {recentPages.list.filter((h) => HREF_LABEL[h]).map((h) => (
              <Link key={"p" + h} href={h} className="lift inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm">
                <span className="size-2 rounded-full bg-slate-300" /><span className="font-bold text-slate-700">{HREF_LABEL[h]}</span><ArrowLeft className="size-3.5 text-slate-300" />
              </Link>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
