"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BookOpen, ChevronDown, FileText, Library as LibraryIcon, Layers, ArrowLeft, GraduationCap, Search, X, Clock, CheckCircle2, Star, Languages, BookMarked, LayoutGrid, Sparkles, Compass, Timer, Layers3 } from "lucide-react";
import { LIBRARY, LIBRARY_STATS, type LibBook, type LibChapter } from "@/data/library";
import { ACADEMY_BOOKS, ACADEMY_META, type AcademyBook } from "@/data/library/academy";
import { useI18n } from "@/lib/i18n";
import { playPing } from "@/lib/sound";

/* ---- module identity palette (soft, enterprise) ---- */
const MOD_COLOR: Record<string, string> = {
  PP: "#d62027", PM: "#f97316", "PP-PI": "#6d28d9", QM: "#059669",
  MM: "#d97706", WM: "#7c3aed", IBP: "#0891b2", Fiori: "#db2777", Foundation: "#475569",
};
const mc = (m: string) => MOD_COLOR[m] || "#64748b";
/* UI-only estimate (NOT SAP data): ~12 min per learning unit */
const estHours = (nodes: number) => Math.max(1, Math.round((nodes || 0) * 0.2));

/* ---- deep-reader routes for reference manuals that have full text ---- */
const READER: Record<string, string> = { "config-pm": "/library/book1/", "production-planning": "/library/book2/", "quality-management": "/library/book5/", "sourcing-procurement": "/library/book3/", "pp-ds": "/library/book4/", "warehouse-management": "/library/book6/", "fiori-apps": "/library/book7/", "pm-business-user": "/library/book9/", "ibp-sop": "/library/book10/", "s4-foundation": "/library/book11/" };

/* ====== recently-opened (localStorage, SSR-safe) ====== */
type Recent = { id: string; title: string; module: string; href: string };
function useRecent() {
  const [recent, setRecent] = useState<Recent[]>([]);
  useEffect(() => {
    try { const r = JSON.parse(localStorage.getItem("neo:lib:recent") || "[]"); if (Array.isArray(r)) setRecent(r.slice(0, 6)); } catch { /* noop */ }
  }, []);
  const push = (item: Recent) => {
    try {
      const cur: Recent[] = JSON.parse(localStorage.getItem("neo:lib:recent") || "[]");
      const next = [item, ...cur.filter((x) => x.id !== item.id)].slice(0, 6);
      localStorage.setItem("neo:lib:recent", JSON.stringify(next)); setRecent(next);
    } catch { /* noop */ }
  };
  return { recent, push };
}

/* ====== premium book spine — reads as the edge of a physical technical book ====== */
function Spine({ c, w = "w-7" }: { c: string; w?: string }) {
  return (
    <div className={`relative ${w} shrink-0 overflow-hidden`} style={{ background: `linear-gradient(155deg, ${c}, ${c}cc 45%, ${c}90)` }}>
      {/* top gloss */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white/25 to-transparent" />
      {/* binding rule on the outer edge */}
      <span className="absolute inset-y-0 left-0 w-px bg-white/50" />
      <span className="absolute inset-y-2 left-[3px] w-px bg-white/20" />
      {/* page-edge hint where the spine meets the body */}
      <span className="absolute inset-y-0 right-0 flex flex-col justify-center gap-[3px] pe-px opacity-60">
        <span className="h-10 w-px bg-white/40" /><span className="h-10 w-px bg-white/25" /><span className="h-10 w-px bg-white/40" />
      </span>
    </div>
  );
}

/* ====== chapter row (reference manual inline index) ====== */
function ChapterRow({ c }: { c: LibChapter }) {
  const [open, setOpen] = useState(false);
  const hasBody = Boolean(c.bodyEn || c.bodyHe);
  return (
    <li>
      <button onClick={() => { if (!hasBody) return; playPing(); setOpen((v) => !v); }}
        className={`grid w-full gap-1 px-5 py-3 text-start transition-colors sm:grid-cols-2 sm:gap-4 ${hasBody ? "hover:bg-surface-2" : ""}`}>
        <div dir="ltr" className="flex items-start gap-2 text-start">
          <span className="tech mt-0.5 shrink-0 rounded bg-surface-2 px-1.5 text-[11px] font-bold text-ink-3">{c.n}</span>
          <span className="text-sm font-medium">{c.en}</span>
          {c.page ? <span className="ms-auto shrink-0 text-[11px] text-ink-3">p.{c.page}</span> : null}
        </div>
        <div dir="rtl" className="flex items-start gap-2 text-start">
          <FileText className="mt-0.5 size-3.5 shrink-0 text-brand" />
          <span className="text-sm font-medium">{c.he}</span>
          {hasBody && <ChevronDown className={`ms-auto size-4 shrink-0 text-ink-3 transition-transform ${open ? "rotate-180" : ""}`} />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && hasBody && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="grid gap-3 px-5 pb-4 sm:grid-cols-2 sm:gap-4">
              <div dir="ltr" className="flex max-h-96 flex-col rounded-xl border border-hairline bg-surface-2/60 p-3 text-start">
                <p className="mb-1 shrink-0 text-[10px] font-bold uppercase tracking-wide text-ink-3">Original (SAP manual)</p>
                <p className="overflow-y-auto whitespace-pre-line text-xs leading-relaxed text-ink-3">{c.bodyEn || "—"}</p>
              </div>
              <div dir="rtl" className="flex max-h-96 flex-col rounded-xl border border-brand/20 bg-brand-soft/50 p-3 text-start">
                <p className="mb-1 shrink-0 text-[10px] font-bold uppercase tracking-wide text-brand">תרגום מקצועי לעברית</p>
                <p className="overflow-y-auto whitespace-pre-line text-xs leading-relaxed">{c.bodyHe || "—"}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/* ====== language / quality / status chips ====== */
function Chip({ children, tone = "slate" }: { children: React.ReactNode; tone?: "slate" | "green" | "amber" | "brand" }) {
  const t = { slate: "bg-surface-2 text-ink-2", green: "bg-emerald-50 text-emerald-700", amber: "bg-amber-50 text-amber-700", brand: "bg-brand-soft text-brand" }[tone];
  return <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${t}`}>{children}</span>;
}

function SectionHead({ icon, eyebrow, title, tint, children }: { icon: React.ReactNode; eyebrow: string; title: string; tint: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-2xl text-white shadow-lg" style={{ background: tint, boxShadow: `0 10px 24px ${tint}44` }}>{icon}</span>
        <div>
          <div className="text-[10.5px] font-bold uppercase tracking-[0.22em]" style={{ color: tint }}>{eyebrow}</div>
          <h2 className="font-display text-xl text-ink-1 sm:text-2xl">{title}</h2>
        </div>
      </div>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  );
}

/* ====== ACADEMY learning-path card ====== */
function AcademyCard({ b, onOpen }: { b: AcademyBook; onOpen: (r: Recent) => void }) {
  const c = mc(b.module);
  const pct = b.chaptersTotal ? Math.round((b.chaptersDone / b.chaptersTotal) * 100) : 0;
  const live = b.status === "live" && b.href;
  const inner = (
    <div className="group relative flex h-full overflow-hidden rounded-2xl border border-hairline bg-surface shadow-[0_10px_30px_-18px_rgba(15,23,42,0.4)] transition-all duration-500 ease-[cubic-bezier(.32,.72,0,1)] hover:-translate-y-2 hover:shadow-[0_28px_56px_-22px_rgba(15,23,42,0.5)]">
      <Spine c={c} />
      <span className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20" style={{ background: c }} />
      <div className="relative flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <span className="grid size-11 place-items-center rounded-xl text-white shadow-lg" style={{ background: c, boxShadow: `0 8px 20px ${c}55` }}><GraduationCap className="size-5" /></span>
          <div className="flex flex-col items-end gap-1">
            <span className="rounded-md px-2 py-0.5 text-[10px] font-extrabold text-white" style={{ background: c }}>{b.module}</span>
            {b.status === "live" ? <Chip tone="green"><CheckCircle2 className="size-3" /> פעיל</Chip> : <Chip tone="amber"><Clock className="size-3" /> בתכנון</Chip>}
          </div>
        </div>
        <h3 className="mt-3 text-lg font-extrabold leading-tight tracking-tight text-ink-1">{b.titleHe}</h3>
        <p className="mt-0.5 line-clamp-1 text-xs text-ink-3" dir="ltr">{b.titleEn}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Chip><Layers3 className="size-3" /> {b.chaptersTotal || "—"} פרקים</Chip>
          <Chip><Timer className="size-3" /> ≈ {estHours(b.nodes)} ש׳</Chip>
          {b.qualityScore != null && <Chip tone="brand"><Star className="size-3" /> {b.qualityScore}</Chip>}
        </div>
        <div className="mt-auto pt-4">
          <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-ink-3">
            <span>{b.chaptersDone}/{b.chaptersTotal || "—"} פרקים · {b.nodes} יחידות</span>
            <span style={{ color: c }}>{pct}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${c}, ${c}aa)` }} />
          </div>
          <div className={`mt-3 flex items-center justify-between rounded-xl px-3.5 py-2 text-sm font-bold transition ${live ? "text-white" : "bg-surface-2 text-ink-3"}`} style={live ? { background: c } : undefined}>
            {live ? (pct > 0 ? "המשך מסלול" : "התחל מסלול") : "בקרוב"}
            {live && <span className="grid size-6 place-items-center rounded-full bg-white/20 transition group-hover:translate-x-0.5"><ArrowLeft className="size-3.5" /></span>}
          </div>
        </div>
      </div>
    </div>
  );
  return live ? <Link href={b.href!} onClick={() => { playPing(); onOpen({ id: "ac-" + b.id, title: b.titleHe, module: b.module, href: b.href! }); }} className="block h-full">{inner}</Link> : <div className="h-full cursor-not-allowed opacity-80">{inner}</div>;
}

/* ====== REFERENCE manual card (cover style + inline index) ====== */
function ReferenceCard({ book, onOpen }: { book: LibBook; onOpen: (r: Recent) => void }) {
  const { lang, pick } = useI18n();
  const [open, setOpen] = useState(false);
  const c = mc(book.module);
  const reader = READER[book.id];
  return (
    <motion.div layout className="overflow-hidden rounded-2xl border border-hairline bg-surface shadow-[0_10px_30px_-18px_rgba(15,23,42,0.4)] transition-all duration-500 ease-[cubic-bezier(.32,.72,0,1)] hover:-translate-y-2 hover:shadow-[0_28px_56px_-22px_rgba(15,23,42,0.5)]">
      <div className="group relative flex">
        <Spine c={c} />
        <div className="relative flex-1 p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl text-white shadow-lg" style={{ background: c, boxShadow: `0 8px 20px ${c}55` }}><BookOpen className="size-5" /></div>
            <div className="flex flex-col items-end gap-1">
              <span className="rounded-md px-2 py-0.5 text-[10px] font-extrabold text-white" style={{ background: c }}>{book.module}</span>
              <span className="text-[10px] text-ink-3">{book.publisher}</span>
            </div>
          </div>
          <h3 className="mt-3 text-base font-extrabold leading-tight tracking-tight text-ink-1">{pick(book.titleHe, book.title)}</h3>
          <p className="mt-0.5 line-clamp-1 text-xs text-ink-3" dir={lang === "he" ? "ltr" : "rtl"}>{lang === "he" ? book.title : book.titleHe}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Chip><Languages className="size-3" /> EN · HE</Chip>
            <Chip><FileText className="size-3" /> {book.pages} עמ׳</Chip>
            <Chip tone="brand"><BookMarked className="size-3" /> {book.chapters.length} פרקים</Chip>
            {reader && <Chip tone="green"><CheckCircle2 className="size-3" /> טקסט מלא</Chip>}
          </div>
          <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-ink-3">{book.summaryHe}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => { playPing(); setOpen((v) => !v); }} className="inline-flex items-center gap-1.5 rounded-xl border border-hairline px-3.5 py-2 text-sm font-bold text-ink-2 transition hover:border-brand/40 hover:bg-surface-2 active:scale-95">
              <Layers className="size-4" /> תוכן הספר <ChevronDown className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {reader && (
              <Link href={reader} onClick={() => { playPing(); onOpen({ id: book.id, title: pick(book.titleHe, book.title), module: book.module, href: reader }); }}
                className="group/btn inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-bold text-white shadow-sm transition hover:brightness-110 active:scale-95" style={{ background: c }}>
                קרא ספר
                <span className="grid size-6 place-items-center rounded-full bg-white/20 transition group-hover/btn:translate-x-0.5"><ArrowLeft className="size-3.5" /></span>
              </Link>
            )}
          </div>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden border-t border-hairline">
            <ul className="max-h-[28rem] divide-y divide-hairline overflow-auto">{book.chapters.map((ch) => <ChapterRow key={ch.n} c={ch} />)}</ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ====== FEATURED reference book — large editorial publication card ====== */
function FeaturedBook({ book, onOpen }: { book: LibBook; onOpen: (r: Recent) => void }) {
  const { pick } = useI18n();
  const c = mc(book.module);
  const reader = READER[book.id];
  return (
    <div className="group relative flex overflow-hidden rounded-[1.75rem] border border-hairline bg-surface shadow-[0_16px_44px_-24px_rgba(15,23,42,0.5)] transition-all duration-500 hover:shadow-[0_32px_64px_-26px_rgba(15,23,42,0.55)]">
      <Spine c={c} w="w-14" />
      <span className="pointer-events-none absolute -left-16 -top-16 size-48 rounded-full opacity-15 blur-3xl" style={{ background: c }} />
      <div className="relative flex flex-1 flex-col gap-3 p-6 sm:p-8">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand"><Sparkles className="size-3" /> ספר נבחר</span>
          <span className="rounded-md px-2 py-0.5 text-[10px] font-extrabold text-white" style={{ background: c }}>{book.module}</span>
          <span className="text-[11px] font-semibold text-ink-3">{book.publisher}</span>
        </div>
        <h3 className="max-w-3xl text-2xl font-black leading-tight tracking-tight text-ink-1 sm:text-[1.9rem]">{pick(book.titleHe, book.title)}</h3>
        <p className="max-w-2xl text-[13.5px] leading-relaxed text-ink-2 sm:text-sm">{book.summaryHe}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <Chip><FileText className="size-3" /> {book.pages} עמ׳</Chip>
          <Chip tone="brand"><BookMarked className="size-3" /> {book.chapters.length} פרקים</Chip>
          <Chip><Languages className="size-3" /> EN · HE</Chip>
          {reader && <Chip tone="green"><CheckCircle2 className="size-3" /> טקסט מלא</Chip>}
        </div>
        {reader && (
          <div className="mt-2">
            <Link href={reader} onClick={() => { playPing(); onOpen({ id: book.id, title: pick(book.titleHe, book.title), module: book.module, href: reader }); }}
              className="group/btn inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:brightness-110 active:scale-95" style={{ background: c }}>
              <BookOpen className="size-4" /> פתח את הספר
              <span className="grid size-6 place-items-center rounded-full bg-white/20 transition group-hover/btn:translate-x-0.5"><ArrowLeft className="size-3.5" /></span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

/* ====== animated counter ====== */
function Count({ n }: { n: number }) {
  const [v, setV] = useState(0);
  useEffect(() => { let raf = 0; const t0 = performance.now(); const step = (t: number) => { const p = Math.min(1, (t - t0) / 1100); setV(Math.round((1 - Math.pow(1 - p, 3)) * n)); if (p < 1) raf = requestAnimationFrame(step); }; raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf); }, [n]);
  return <>{v.toLocaleString()}</>;
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return <motion.div initial={reduce ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay, ease: [0.2, 0.7, 0.2, 1] }}>{children}</motion.div>;
}

export default function LibraryPage() {
  const { recent, push } = useRecent();
  const [q, setQ] = useState("");
  const [mod, setMod] = useState<string | null>(null);
  const ac = ACADEMY_META.totals();

  const ORDER = ["PM", "PP", "PP-PI", "MM", "QM", "WM", "Fiori", "Foundation"];
  const mods = useMemo(() => {
    const set = new Set<string>([...ACADEMY_BOOKS.map((b) => b.module), ...LIBRARY.map((b) => b.module)]);
    return ORDER.filter((m) => set.has(m)).concat([...set].filter((m) => !ORDER.includes(m)));
  }, []);

  const match = (hay: string[]) => { const s = q.trim().toLowerCase(); return !s || hay.some((h) => (h || "").toLowerCase().includes(s)); };
  const academy = ACADEMY_BOOKS.filter((b) => (!mod || b.module === mod) && match([b.titleHe, b.titleEn, b.module]));
  const reference = LIBRARY.filter((b) => (!mod || b.module === mod) && match([b.title, b.titleHe, b.module, b.publisher]));

  // reference collections by publisher (real data)
  const publishers = useMemo(() => [...new Set(reference.map((b) => b.publisher))], [reference]);
  const featured = useMemo(() => (!q && !mod ? [...LIBRARY].sort((a, b) => b.pages - a.pages)[0] : null), [q, mod]);
  const totalAcademyHours = useMemo(() => ACADEMY_BOOKS.reduce((s, b) => s + estHours(b.nodes), 0), []);
  const acLive = ACADEMY_BOOKS.filter((b) => b.status === "live");
  const filtering = Boolean(q || mod);

  return (
    <div className="space-y-10">
      {/* ===== library masthead ===== */}
      <section className="relative overflow-hidden rounded-[2rem] border border-hairline bg-gradient-to-bl from-ink-1 via-[#15171b] to-[#0b0c0e] p-7 text-white shadow-2xl animate-float-in sm:p-9">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
        <span className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-brand/25 blur-3xl" />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90">
            <LibraryIcon className="size-3.5 text-brand" /> SAP Knowledge Center
          </span>
          <h1 className="mt-3 font-display text-3xl tracking-tight sm:text-[3.25rem]">מרכז הידע של <span className="text-brand">SAP</span></h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
            שני עולמות תחת קורת גג אחת — <b className="text-white">אקדמיית הכשרה מובנית</b> ו<b className="text-white">ספריית עיון טכנית</b>. אנגלית מקורית לצד תרגום עברי מקצועי לארגון.
          </p>
          <div className="mt-5 grid grid-cols-3 gap-2.5 sm:max-w-xl sm:grid-cols-4">
            {[
              [ACADEMY_BOOKS.length + LIBRARY_STATS.books, "ספרים"],
              [ac.chapters + LIBRARY_STATS.chapters, "פרקים"],
              [ac.nodes, "יחידות לימוד"],
              [LIBRARY_STATS.pages, "עמודים"],
            ].map(([v, l]) => (
              <div key={l as string} className="flex flex-col items-center rounded-2xl border border-white/12 bg-white/8 px-3 py-3 backdrop-blur-sm">
                <span className="font-mono text-2xl font-extrabold tabular-nums sm:text-3xl"><Count n={v as number} /></span>
                <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/60">{l as string}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== search + module filter ===== */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute inset-y-0 right-3 my-auto size-4 text-ink-3" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש ספר · מסלול · מודול · מו״ל…"
            className="w-full rounded-xl border border-hairline bg-surface py-2.5 pe-3 ps-10 text-sm shadow-sm outline-none transition focus:border-brand/40 focus:ring-2 focus:ring-brand/15" />
          {q && <button onClick={() => setQ("")} aria-label="נקה" className="absolute inset-y-0 left-3 my-auto"><X className="size-4 text-ink-3" /></button>}
        </div>
        <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
          <button onClick={() => setMod(null)} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition ${!mod ? "bg-ink-1 text-white" : "border border-hairline bg-surface text-ink-3 hover:bg-surface-2"}`}>הכל</button>
          {mods.map((m) => { const on = mod === m; const c = mc(m); return (
            <button key={m} onClick={() => setMod(on ? null : m)} className="shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold transition active:scale-95" style={{ borderColor: on ? c : "var(--hairline)", background: on ? c : "var(--surface)", color: on ? "#fff" : "var(--ink-3)" }}>{m}</button>); })}
        </div>
      </div>

      {/* ===== continue / recently opened ===== */}
      {recent.length > 0 && !filtering && (
        <Reveal>
          <section className="space-y-2.5">
            <h2 className="flex items-center gap-2 text-sm font-extrabold tracking-tight text-ink-1"><Clock className="size-4 text-brand" /> המשך מהיכן שהפסקת</h2>
            <div className="flex flex-wrap gap-2">
              {recent.map((r) => (
                <Link key={r.id} href={r.href} className="group inline-flex items-center gap-2 rounded-xl border border-hairline bg-surface px-3 py-2 text-sm shadow-sm transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md">
                  <span className="size-2.5 rounded-full" style={{ background: mc(r.module) }} />
                  <span className="font-semibold text-ink-2">{r.title}</span>
                  <ArrowLeft className="size-3.5 text-ink-3 transition group-hover:translate-x-0.5 group-hover:text-brand" />
                </Link>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {/* ============================================================= */}
      {/* WORLD 1 — 🎓 SAP ACADEMY (structured learning platform)        */}
      {/* ============================================================= */}
      {academy.length > 0 && (
        <Reveal>
          <section className="space-y-5 rounded-[2rem] border border-hairline bg-surface-2/40 p-5 sm:p-7">
            <SectionHead icon={<GraduationCap className="size-5" />} eyebrow="Structured Learning · פלטפורמת הכשרה" title="SAP Academy" tint="#d62027">
              <Link href="/library/academy/search/" className="hidden items-center gap-1 text-xs font-bold text-brand hover:underline sm:inline-flex"><Search className="size-3.5" /> חיפוש מאוחד</Link>
              <Link href="/library/academy/fiori/" className="hidden items-center gap-1 text-xs font-bold text-brand hover:underline sm:inline-flex"><LayoutGrid className="size-3.5" /> אינדקס Fiori</Link>
              <Link href="/library/academy/" className="inline-flex items-center gap-1 rounded-lg bg-brand px-2.5 py-1.5 text-xs font-bold text-white transition hover:brightness-110">לוח בקרה <ArrowLeft className="size-3.5" /></Link>
            </SectionHead>

            {/* learning dashboard strip */}
            {!filtering && (
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {[
                  { icon: <Compass className="size-4" />, v: acLive.length, l: "מסלולים פעילים" },
                  { icon: <Layers3 className="size-4" />, v: ac.chapters, l: "פרקים" },
                  { icon: <BookMarked className="size-4" />, v: ac.nodes, l: "יחידות לימוד" },
                  { icon: <Timer className="size-4" />, v: totalAcademyHours, l: "שעות לימוד (הערכה)" },
                ].map((s) => (
                  <div key={s.l} className="flex items-center gap-3 rounded-2xl border border-hairline bg-surface p-3.5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">{s.icon}</span>
                    <div className="min-w-0"><div className="font-mono text-lg font-extrabold text-ink-1"><Count n={s.v} /></div><div className="truncate text-[11px] font-semibold text-ink-3">{s.l}</div></div>
                  </div>
                ))}
              </div>
            )}

            <div className="grid-adaptive">
              {academy.map((b) => <AcademyCard key={b.id} b={b} onOpen={push} />)}
            </div>
          </section>
        </Reveal>
      )}

      {/* ============================================================= */}
      {/* WORLD 2 — 📚 DIGITAL REFERENCE LIBRARY (technical books)       */}
      {/* ============================================================= */}
      {reference.length > 0 && (
        <Reveal>
          <section className="space-y-6">
            <SectionHead icon={<BookOpen className="size-5" />} eyebrow="Enterprise Technical Library · ספריית עיון" title="ספרייה דיגיטלית" tint="#0b0c0e" />

            {/* featured book */}
            {featured && <FeaturedBook book={featured} onOpen={push} />}

            {/* collections by publisher */}
            {!filtering ? (
              <div className="space-y-8">
                {publishers.map((pub) => {
                  const books = reference.filter((b) => b.publisher === pub && b.id !== featured?.id);
                  if (!books.length) return null;
                  return (
                    <div key={pub} className="space-y-3">
                      <div className="flex items-center gap-2.5">
                        <span className="h-4 w-1 rounded-full bg-brand" />
                        <h3 className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-ink-2">{pub} Collection</h3>
                        <span className="text-[11px] font-semibold text-ink-3">· {books.length} ספרים</span>
                        <span className="h-px flex-1 bg-hairline" />
                      </div>
                      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {books.map((b) => <ReferenceCard key={b.id} book={b} onOpen={push} />)}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {reference.map((b) => <ReferenceCard key={b.id} book={b} onOpen={push} />)}
              </div>
            )}
          </section>
        </Reveal>
      )}

      {/* empty state */}
      {academy.length === 0 && reference.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <span className="grid size-16 place-items-center rounded-3xl bg-surface-2 text-ink-3"><Search className="size-8" /></span>
          <p className="text-base font-bold text-ink-1">לא נמצאו ספרים או מסלולים</p>
          <p className="text-xs text-ink-3">נסה מונח אחר או נקה את הסינון</p>
          {(q || mod) && <button onClick={() => { setQ(""); setMod(null); }} className="mt-1 rounded-xl bg-brand px-4 py-2 text-sm font-bold text-white transition hover:brightness-110">נקה חיפוש</button>}
        </div>
      )}

      <p className="text-center text-xs text-ink-3">
        מסלולי הלמידה נבנו לפי תבנית 18 המקטעים של NEO Academy · מדריכי העיון מאונדקסים מתוכן העניינים של קובצי ה-PDF המקוריים. תרגום עברי מקצועי נכתב עבור הארגון.
      </p>
    </div>
  );
}
