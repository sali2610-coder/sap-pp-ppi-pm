"use client";

/**
 * MOBILE APP — Home. NOT the desktop knowledge portal shrunk down; a native
 * "premium SAP assistant" home (mobile + tablet, xl:hidden). Content-first,
 * personalized, ONE primary action (search). Health/Spotify/Notion-home
 * interaction language: greeting, a hero search, continue-where-you-left-off
 * carousel, favorites, quick module cards, a fast reference grid, and suggested
 * next — everything object-based is peekable (long-press) and staggers in.
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Search, ArrowLeft, Wrench, Boxes, Network, Table2, Terminal, Braces, Database, LayoutGrid, Cable, GraduationCap, Compass, Star, Clock, Sparkles } from "lucide-react";
import { useFavorites, getRecentObjects } from "@/lib/prefs";
import type { ModuleCard } from "@/components/home-portal";

type Counts = { tables: number; fields: number; transactions: number; bapis: number; fms: number; idocs: number; cds: number; fiori: number };
const haptic = () => { try { navigator.vibrate?.(7); } catch { /* noop */ } };
const openPalette = () => window.dispatchEvent(new Event("neo:open-palette"));

const MOD_ICON: Record<string, typeof Wrench> = { PM: Wrench, "PP-PI": Boxes, DM: Network };
const REF = [
  { href: "/tables/", Icon: Table2, label: "טבלאות", key: "tables" as const, c: "#16a34a" },
  { href: "/transactions/", Icon: Terminal, label: "טרנזקציות", key: "transactions" as const, c: "#0284c7" },
  { href: "/bapi/", Icon: Braces, label: "BAPIs / FM", key: "bapis" as const, c: "#d62027" },
  { href: "/cds/", Icon: Database, label: "CDS Views", key: "cds" as const, c: "#ca8a04" },
  { href: "/idoc/", Icon: Cable, label: "IDocs", key: "idocs" as const, c: "#7c3aed" },
  { href: "/fiori/", Icon: LayoutGrid, label: "Fiori Apps", key: "fiori" as const, c: "#0891b2" },
];
const SUGGEST = [
  { href: "/learn/", Icon: GraduationCap, title: "אקדמיית למידה", sub: "19 מסלולים · PM / PP-PI / QA" },
  { href: "/story/", Icon: Compass, title: "סיורים מודרכים", sub: "תהליך מקצה לקצה" },
  { href: "/knowledge/", Icon: Sparkles, title: "מרכז ידע", sub: "38 מרכזים · חיפוש-תחילה" },
];

function greet(): string {
  const h = new Date().getHours();
  if (h < 5) return "לילה טוב";
  if (h < 12) return "בוקר טוב";
  if (h < 17) return "צהריים טובים";
  if (h < 21) return "ערב טוב";
  return "לילה טוב";
}

const rise = (i: number, reduce: boolean | null) =>
  reduce ? {} : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { type: "spring" as const, stiffness: 320, damping: 30, delay: i * 0.05 } };

export function MobileHome({ counts, modules }: { counts: Counts; modules: ModuleCard[] }) {
  const reduce = useReducedMotion();
  const favs = useFavorites();
  const [recent, setRecent] = useState<string[]>([]);
  const [hi, setHi] = useState("ברוך הבא");
  useEffect(() => { setRecent(getRecentObjects().slice(0, 10)); setHi(greet()); }, []);

  return (
    <div dir="rtl" className="space-y-7 xl:hidden">
      {/* greeting + hero search — the single primary action */}
      <motion.section {...rise(0, reduce)}>
        <p className="text-[13px] font-bold text-ink-3">{hi},</p>
        <h1 className="mt-0.5 text-[26px] font-black leading-tight text-ink-1">מה נלמד היום ב-SAP?</h1>
        <button onClick={() => { haptic(); openPalette(); }}
          className="tap mt-4 flex w-full items-center gap-3 rounded-2xl border border-hairline bg-surface-2/60 px-4 py-3.5 text-start shadow-sm transition active:scale-[0.99]">
          <Search className="size-5 shrink-0 text-brand" />
          <span className="min-w-0 flex-1 text-[14.5px] font-semibold text-ink-3">חיפוש טבלה · טרנזקציה · BAPI · CDS…</span>
          <kbd className="hidden rounded-md border border-hairline bg-surface px-1.5 py-0.5 text-[11px] font-bold text-ink-3 sm:block">⌘K</kbd>
        </button>
      </motion.section>

      {/* continue — recently opened objects (personalization) */}
      {recent.length > 0 && (
        <motion.section {...rise(1, reduce)}>
          <div className="mb-2 flex items-center gap-1.5 px-0.5 text-[12px] font-extrabold uppercase tracking-wide text-ink-3"><Clock className="size-3.5" />המשך מהיכן שהפסקת</div>
          <div className="chip-rail -mx-1 flex gap-2.5 overflow-x-auto px-1 pb-1">
            {recent.map((n) => (
              <Link key={n} href={`/object/${encodeURIComponent(n)}/`} data-peek={n} onClick={haptic}
                className="tap group flex w-36 shrink-0 flex-col justify-between rounded-2xl border border-hairline bg-surface p-3.5 shadow-sm transition active:scale-[0.97]">
                <span className="grid size-9 place-items-center rounded-xl bg-brand-soft text-brand"><Boxes className="size-4.5" /></span>
                <span className="tech mt-3 truncate font-mono text-[13.5px] font-bold text-ink-1" dir="ltr">{n}</span>
                <span className="mt-0.5 text-[11px] text-ink-3">הקש להמשך · לחיצה ארוכה לתצוגה</span>
              </Link>
            ))}
          </div>
        </motion.section>
      )}

      {/* favorites (personalization) */}
      {favs.length > 0 && (
        <motion.section {...rise(2, reduce)}>
          <div className="mb-2 flex items-center gap-1.5 px-0.5 text-[12px] font-extrabold uppercase tracking-wide text-amber-600"><Star className="size-3.5 fill-amber-400 text-amber-500" />מועדפים</div>
          <div className="flex flex-wrap gap-1.5">
            {favs.slice(0, 12).map((n) => (
              <Link key={n} href={`/object/${encodeURIComponent(n)}/`} data-peek={n} onClick={haptic}
                className="tech tap inline-flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-[12.5px] font-bold text-amber-900 transition active:scale-95" dir="ltr">
                <Star className="size-3 fill-amber-400 text-amber-500" />{n}
              </Link>
            ))}
          </div>
        </motion.section>
      )}

      {/* module portals — rich cards */}
      <motion.section {...rise(3, reduce)}>
        <div className="mb-2 px-0.5 text-[12px] font-extrabold uppercase tracking-wide text-ink-3">מודולים</div>
        <div className="grid gap-2.5 sm:grid-cols-3">
          {modules.map((m) => { const Icon = MOD_ICON[m.code] || Boxes; return (
            <Link key={m.code} href={m.href} onClick={haptic}
              className="tap group relative flex flex-col gap-2 overflow-hidden rounded-2xl border border-hairline bg-surface p-4 shadow-sm transition active:scale-[0.98]">
              <span className="absolute inset-y-0 end-0 w-1.5" style={{ background: m.tint }} />
              <div className="flex items-center gap-2.5">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl text-white" style={{ background: m.tint }}><Icon className="size-5" /></span>
                <div className="min-w-0"><div className="text-[15px] font-extrabold text-ink-1">{m.label}</div><div className="text-[11px] font-semibold text-ink-3">{m.he}</div></div>
              </div>
              <p className="line-clamp-2 text-[12px] leading-relaxed text-ink-2">{m.desc}</p>
              <div className="mt-auto flex items-center gap-2 pt-1 text-[11px] font-bold text-ink-3">
                <span>{m.tables} טבלאות</span><span className="size-1 rounded-full bg-ink-3/40" /><span>{m.fields} שדות</span>
                <ArrowLeft className="ms-auto size-4 text-ink-3 transition group-active:-translate-x-0.5" />
              </div>
            </Link>
          ); })}
        </div>
      </motion.section>

      {/* fast reference grid */}
      <motion.section {...rise(4, reduce)}>
        <div className="mb-2 px-0.5 text-[12px] font-extrabold uppercase tracking-wide text-ink-3">עיון מהיר</div>
        <div className="grid grid-cols-3 gap-2.5">
          {REF.map((r) => (
            <Link key={r.href} href={r.href} onClick={haptic}
              className="tap flex flex-col items-center gap-1.5 rounded-2xl border border-hairline bg-surface p-3 text-center shadow-sm transition active:scale-[0.96]">
              <span className="grid size-10 place-items-center rounded-xl text-white" style={{ background: r.c }}><r.Icon className="size-5" /></span>
              <span className="text-[12px] font-extrabold text-ink-1">{r.label}</span>
              <span className="font-mono text-[11px] font-bold text-ink-3">{counts[r.key].toLocaleString()}</span>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* suggested next */}
      <motion.section {...rise(5, reduce)}>
        <div className="mb-2 px-0.5 text-[12px] font-extrabold uppercase tracking-wide text-ink-3">מומלץ בשבילך</div>
        <div className="flex flex-col gap-2.5">
          {SUGGEST.map((s) => (
            <Link key={s.href} href={s.href} onClick={haptic}
              className="tap flex items-center gap-3 rounded-2xl border border-hairline bg-surface p-3.5 shadow-sm transition active:scale-[0.98]">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand"><s.Icon className="size-5" /></span>
              <span className="min-w-0 flex-1"><span className="block text-[14px] font-extrabold text-ink-1">{s.title}</span><span className="block text-[11.5px] text-ink-3">{s.sub}</span></span>
              <ArrowLeft className="size-4 shrink-0 text-ink-3" />
            </Link>
          ))}
        </div>
      </motion.section>

      <p dir="ltr" className="pt-2 text-center text-[11px] font-semibold text-ink-3">Built by <b className="text-brand">Sali Halif</b></p>
    </div>
  );
}
