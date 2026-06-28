"use client";

import Link from "next/link";
import { BookOpen, Terminal, LayoutDashboard, Network, Database, Cable, ArrowLeft } from "lucide-react";
import { playClick } from "@/lib/sound";

// Quick Access Launchpad — the platform's primary entry, BTP-Launchpad style.
// Premium, visually-equal tiles. Extensible: add a tile to TILES, no layout
// change. Counts are optional (passed from the page; real numbers only).
export interface QATile { href: string; he: string; en: string; sub: string; tag: string; color: string; Icon: typeof BookOpen; count?: number }

export function QuickAccess({ counts = {} }: { counts?: Record<string, number> }) {
  const TILES: QATile[] = [
    { href: "/library/", he: "ספריית SAP", en: "SAP Library", sub: "ספרים · אקדמיה · מסלולי למידה", tag: "Learn", color: "#0891b2", Icon: BookOpen },
    { href: "/transactions/", he: "מרכז טרנזקציות", en: "Transaction Center", sub: "T-Codes · חיפוש לפי קוד/תיאור/מודול/אובייקט", tag: "ECC", color: "#2563eb", Icon: Terminal, count: counts.transactions },
    { href: "/fiori-apps/", he: "מרכז אפליקציות Fiori", en: "Fiori Apps Center", sub: "App ID · Business Role · Catalog · OData · CDS", tag: "S/4HANA", color: "#16a34a", Icon: LayoutDashboard, count: counts.apps },
    { href: "/studio/", he: "Architecture Studio", en: "Architecture Studio", sub: "מפת הקשרים החיה — זום · רחף · הדגש", tag: "Live", color: "#d62027", Icon: Network },
    { href: "/tables/", he: "חוקר טבלאות", en: "Table Explorer", sub: "כל הטבלאות · קשרים · CDS · ECC↔S/4", tag: "Data", color: "#7c3aed", Icon: Database, count: counts.tables },
    { href: "/integration/", he: "מרכז אינטגרציה", en: "Integration Center", sub: "IDoc · ALE · RFC · PI/PO · CPI · OData", tag: "Integration", color: "#6d28d9", Icon: Cable },
  ];
  return (
    <section dir="rtl">
      <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400"><LayoutDashboard className="size-4 text-brand" />Command Center · גישה מהירה</div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {TILES.map((t) => { const Ic = t.Icon; return (
          <Link key={t.href} href={t.href} onClick={() => playClick()}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl">
            <span className="pointer-events-none absolute -left-10 -top-10 size-28 rounded-full opacity-0 blur-2xl transition group-hover:opacity-100" style={{ background: t.color + "33" }} />
            <div className="relative flex items-start justify-between">
              <span className="grid size-12 place-items-center rounded-2xl text-white shadow-md transition-transform group-hover:scale-105" style={{ background: `linear-gradient(135deg,${t.color},${t.color}cc)` }}><Ic className="size-6" /></span>
              <span className="rounded-full px-2 py-0.5 text-[10px] font-extrabold" style={{ background: t.color + "14", color: t.color }}>{t.tag}</span>
            </div>
            <div className="relative mt-3">
              <div className="flex items-center gap-2"><h3 className="text-[17px] font-extrabold text-slate-900">{t.he}</h3>{t.count != null && <span className="font-mono text-[12px] font-bold text-slate-400">{t.count.toLocaleString()}</span>}</div>
              <p className="mt-0.5 text-[12.5px] leading-relaxed text-slate-500">{t.sub}</p>
            </div>
            <span className="relative mt-3 inline-flex items-center gap-1 text-[12px] font-bold transition group-hover:gap-2" style={{ color: t.color }}>פתח<ArrowLeft className="size-3.5" /></span>
          </Link>
        ); })}
      </div>
    </section>
  );
}
