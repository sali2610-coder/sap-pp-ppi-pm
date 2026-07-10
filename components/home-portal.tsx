"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Search, ArrowLeft, Wrench, FlaskConical, GitBranch, Table, Terminal, Plug,
  Cable, Sigma, LayoutGrid, Puzzle, Compass, BrainCircuit, Library, AlertTriangle,
} from "lucide-react";
import { playClick } from "@/lib/sound";
import { SiteLogo } from "@/components/site-logo";

export type PortalCounts = {
  tables: number; fields: number; tcodes: number; bapis: number; fms: number;
  idocs: number; cds: number; fiori: number; transactions: number; relations: number;
};
export type ModuleCard = { code: string; label: string; he: string; desc: string; tables: number; fields: number; href: string; tint: string };

const fmt = (n: number) => n.toLocaleString("en-US");

const MOD_ICON: Record<string, typeof Wrench> = { PM: Wrench, "PP-PI": FlaskConical, DM: GitBranch };

function SearchHero({ counts }: { counts: PortalCounts }) {
  const open = () => { playClick(); window.dispatchEvent(new Event("neo:open-palette")); };
  const chips = ["EQUI", "IFLOT", "QMEL", "MARA", "AFKO"];
  return (
    <section dir="rtl" className="pt-2 text-center">
      {/* product identity — full branding in the hero */}
      <div className="mb-5 flex justify-center [&_svg]:logo-glow">
        <SiteLogo tone="dark" />
      </div>
      <span className="eyebrow-2 inline-flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-brand" />SAP Knowledge Platform</span>
      <h1 className="mx-auto mt-3 max-w-3xl text-balance font-display text-[2.15rem] leading-[1.04] text-ink-1 sm:text-[3.4rem]">
        <span className="block">כל הידע של <span className="text-brand">SAP</span></span>
        <span className="block">במקום אחד, נגיש בחיפוש אחד</span>
      </h1>
      {/* elegant red accent line beneath the headline */}
      <span aria-hidden className="accent-rule mx-auto mt-4" />
      <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-3 sm:text-base">
        פורטל תיעוד לארכיטקטורת SAP: טבלאות, טרנזקציות, BAPIs, IDocs, CDS ו-Fiori — עם הקשרים ביניהם. ECC6 → S/4HANA.
      </p>

      {/* the product is search */}
      <button onClick={open} aria-label="חיפוש (⌘K)"
        className="mx-auto mt-7 flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-hairline bg-surface px-4 py-3.5 text-start shadow-[0_1px_2px_rgba(11,12,14,0.05)] transition hover:border-brand/40 hover:shadow-[0_10px_30px_-14px_rgba(11,12,14,0.22)]">
        <Search className="size-5 shrink-0 text-ink-3" />
        <span className="flex-1 text-[15px] text-ink-3">חפש טבלה, T-Code, BAPI, אובייקט או תהליך…</span>
        <kbd className="hidden shrink-0 rounded-md border border-hairline bg-surface-2 px-2 py-1 font-mono text-[11px] font-semibold text-ink-3 sm:inline">⌘K</kbd>
      </button>
      <div className="mx-auto mt-3 flex max-w-2xl flex-wrap items-center justify-center gap-1.5">
        <span className="text-[12px] font-medium text-ink-3">נסה:</span>
        {chips.map((c) => (
          <Link key={c} href={`/object/${encodeURIComponent(c)}/`} onClick={() => playClick()}
            className="tech rounded-lg border border-hairline bg-surface px-2.5 py-1 font-mono text-[12px] font-bold text-ink-2 transition hover:border-brand/40 hover:text-brand" dir="ltr">{c}</Link>
        ))}
      </div>

      {/* quiet, factual reference metadata — not a scoreboard. Each metric is
          bidi-isolated so RTL never scrambles the LTR numbers. */}
      <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[12.5px] font-medium text-ink-3">
        {[
          [counts.tables, "טבלאות"], [counts.fields, "שדות"], [counts.transactions, "טרנזקציות"],
          [counts.bapis + counts.fms, "BAPIs / FMs"], [counts.cds, "CDS"], [counts.fiori, "Fiori"],
        ].map(([n, label], i) => (
          <span key={label as string} className="inline-flex items-center gap-1.5">
            {i > 0 && <span className="text-brand/40">·</span>}
            <b className="font-mono font-bold text-ink-2 [unicode-bidi:isolate]" dir="ltr">{fmt(n as number)}</b>
            <span>{label}</span>
          </span>
        ))}
      </div>
    </section>
  );
}

function Section({ eyebrow, title, sub, children }: { eyebrow: string; title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section dir="rtl" className="space-y-4">
      <div>
        <span className="eyebrow-2">{eyebrow}</span>
        <h2 className="mt-1 font-display text-xl text-ink-1 sm:text-2xl">{title}</h2>
        {sub && <p className="mt-1 text-[14px] text-ink-3">{sub}</p>}
      </div>
      {children}
    </section>
  );
}

function ModulePortals({ modules }: { modules: ModuleCard[] }) {
  const soon = ["MM", "SD", "FI", "QM", "WM"];
  return (
    <Section eyebrow="פורטלי מודולים · Module Portals" title="עיין לפי מודול SAP" sub="כל מודול הוא פורטל תיעוד עצמאי — ארכיטקטורה, תהליך, נתוני אב, טבלאות, ממשקים ותקלות.">
      <div className="grid-adaptive">
        {modules.map((m) => {
          const Ic = MOD_ICON[m.code] || GitBranch;
          return (
            <Link key={m.code} href={m.href} onClick={() => playClick()} className="card-interactive group flex flex-col gap-3 p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl" style={{ background: m.tint + "14", color: m.tint }}><Ic className="size-6" /></span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2"><span className="text-[15px] font-extrabold text-ink-1">{m.label}</span><span className="tech rounded-md bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] font-bold text-ink-3">{m.code}</span></div>
                  <div className="truncate text-[12.5px] text-ink-3">{m.he}</div>
                </div>
              </div>
              <p className="text-[13px] leading-relaxed text-ink-2">{m.desc}</p>
              <div className="mt-auto flex items-center justify-between border-t border-hairline pt-3">
                <span className="text-[12px] font-medium text-ink-3">{fmt(m.tables)} טבלאות · {fmt(m.fields)} שדות</span>
                <span className="flex items-center gap-1 text-[12.5px] font-bold text-brand opacity-0 transition group-hover:opacity-100">פתח פורטל<ArrowLeft className="size-3.5" /></span>
              </div>
            </Link>
          );
        })}
        {soon.map((c) => (
          <div key={c} className="flex items-center gap-3 rounded-2xl border border-dashed border-hairline bg-surface-2/40 p-5 text-ink-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface-2 font-mono text-[12px] font-bold">{c}</span>
            <div><div className="text-[14px] font-bold text-ink-2">{c}</div><div className="text-[12px]">פורטל בקרוב</div></div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ReferenceGrid({ counts }: { counts: PortalCounts }) {
  const items = [
    { href: "/tables/", icon: Table, label: "טבלאות", n: counts.tables, en: "Tables" },
    { href: "/transactions/", icon: Terminal, label: "טרנזקציות", n: counts.transactions, en: "T-Codes" },
    { href: "/bapi/", icon: Plug, label: "BAPIs / FMs", n: counts.bapis + counts.fms, en: "Function modules" },
    { href: "/idoc/", icon: Cable, label: "IDocs", n: counts.idocs, en: "Interfaces" },
    { href: "/cds/", icon: Sigma, label: "CDS Views", n: counts.cds, en: "S/4HANA views" },
    { href: "/fiori-apps/", icon: LayoutGrid, label: "Fiori Apps", n: counts.fiori, en: "Fiori" },
    { href: "/enhancements/", icon: Puzzle, label: "Enhancements", n: 0, en: "Exits & BAdIs" },
  ];
  return (
    <Section eyebrow="עיון · Reference" title="דפדף לפי סוג אובייקט">
      <div className="grid-adaptive-sm">
        {items.map((it) => { const Ic = it.icon; return (
          <Link key={it.href} href={it.href} onClick={() => playClick()} className="card-interactive group flex items-center gap-3 p-3.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface-2 text-ink-2 transition group-hover:bg-brand/10 group-hover:text-brand"><Ic className="size-[18px]" /></span>
            <div className="min-w-0">
              <div className="truncate text-[13.5px] font-bold text-ink-1">{it.label}</div>
              <div className="text-[11.5px] text-ink-3">{it.n > 0 ? `${fmt(it.n)} · ${it.en}` : it.en}</div>
            </div>
          </Link>
        ); })}
      </div>
    </Section>
  );
}

function ExploreGrid() {
  const items = [
    { href: "/studio/", icon: Compass, title: "Architecture Studio", desc: "גרף חי של טבלאות, תהליכים והקשרים — עם מצב מצגת ו-Live Demo.", tint: "#d62027" },
    { href: "/knowledge/", icon: BrainCircuit, title: "מרכז ידע", desc: "חיפוש-תחילה: מושגים, שיפורים, ECC↔S/4 ותרחישים חוצי-מודול.", tint: "#2563eb" },
    { href: "/library/", icon: Library, title: "ספריית SAP", desc: "מדריכי S/4HANA ומסלולי למידה אינטראקטיביים בעברית.", tint: "#16a34a" },
    { href: "/incidents/", icon: AlertTriangle, title: "תקלות ופתרונות", desc: "ספריית תקלות SAP עם שורש, טרנזקציות ותרחישי בדיקה.", tint: "#c77a0a" },
  ];
  return (
    <Section eyebrow="כלים · Explore" title="כלים ומרכזי ידע">
      <div className="grid-adaptive">
        {items.map((it) => { const Ic = it.icon; return (
          <Link key={it.href} href={it.href} onClick={() => playClick()} className="card-interactive group flex items-start gap-3.5 p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl" style={{ background: it.tint + "12", color: it.tint }}><Ic className="size-6" /></span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-[15px] font-extrabold text-ink-1">{it.title}<ArrowLeft className="size-4 text-ink-3 transition group-hover:-translate-x-0.5 group-hover:text-brand" /></div>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-2">{it.desc}</p>
            </div>
          </Link>
        ); })}
      </div>
    </Section>
  );
}

export function HomePortal({ counts, modules }: { counts: PortalCounts; modules: ModuleCard[] }) {
  const reduce = useReducedMotion();
  const stagger = (i: number) => (reduce ? {} : { initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-40px" }, transition: { duration: 0.4, delay: i * 0.05, ease: [0.2, 0.7, 0.2, 1] as const } });
  return (
    <div className="space-y-12 sm:space-y-16">
      <motion.div {...(reduce ? {} : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } })}><SearchHero counts={counts} /></motion.div>
      <motion.div {...stagger(0)}><ModulePortals modules={modules} /></motion.div>
      <motion.div {...stagger(1)}><ReferenceGrid counts={counts} /></motion.div>
      <motion.div {...stagger(2)}><ExploreGrid /></motion.div>
    </div>
  );
}
