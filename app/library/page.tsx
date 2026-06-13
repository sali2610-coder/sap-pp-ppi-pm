"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ChevronDown, FileText, Library as LibraryIcon, Layers, ArrowLeft, GraduationCap, Search, X, Clock, CheckCircle2, Star, Languages, BookMarked } from "lucide-react";
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

/* ---- deep-reader routes for reference manuals that have full text ---- */
const READER: Record<string, string> = { "config-pm": "/library/book1/", "production-planning": "/library/book2/" };

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

/* ====== chapter row (reference manual inline index) ====== */
function ChapterRow({ c }: { c: LibChapter }) {
  const [open, setOpen] = useState(false);
  const hasBody = Boolean(c.bodyEn || c.bodyHe);
  return (
    <li>
      <button onClick={() => { if (!hasBody) return; playPing(); setOpen((v) => !v); }}
        className={`grid w-full gap-1 px-5 py-3 text-start transition-colors sm:grid-cols-2 sm:gap-4 ${hasBody ? "hover:bg-slate-50" : ""}`}>
        <div dir="ltr" className="flex items-start gap-2 text-start">
          <span className="tech mt-0.5 shrink-0 rounded bg-slate-100 px-1.5 text-[11px] font-bold text-slate-500">{c.n}</span>
          <span className="text-sm font-medium">{c.en}</span>
          {c.page ? <span className="ms-auto shrink-0 text-[11px] text-slate-400">p.{c.page}</span> : null}
        </div>
        <div dir="rtl" className="flex items-start gap-2 text-start">
          <FileText className="mt-0.5 size-3.5 shrink-0 text-brand" />
          <span className="text-sm font-medium">{c.he}</span>
          {hasBody && <ChevronDown className={`ms-auto size-4 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && hasBody && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="grid gap-3 px-5 pb-4 sm:grid-cols-2 sm:gap-4">
              <div dir="ltr" className="flex max-h-96 flex-col rounded-xl border border-slate-200/70 bg-slate-50/60 p-3 text-start">
                <p className="mb-1 shrink-0 text-[10px] font-bold uppercase tracking-wide text-slate-400">Original (SAP manual)</p>
                <p className="overflow-y-auto whitespace-pre-line text-xs leading-relaxed text-slate-500">{c.bodyEn || "—"}</p>
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
  const t = { slate: "bg-slate-100 text-slate-600", green: "bg-emerald-50 text-emerald-700", amber: "bg-amber-50 text-amber-700", brand: "bg-brand-soft text-brand" }[tone];
  return <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${t}`}>{children}</span>;
}

/* ====== ACADEMY learning-path card (cover style) ====== */
function AcademyCard({ b, onOpen }: { b: AcademyBook; onOpen: (r: Recent) => void }) {
  const c = mc(b.module);
  const pct = b.chaptersTotal ? Math.round((b.chaptersDone / b.chaptersTotal) * 100) : 0;
  const live = b.status === "live" && b.href;
  const inner = (
    <div className="group relative flex h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_-18px_rgba(15,23,42,0.4)] transition-all duration-500 ease-[cubic-bezier(.32,.72,0,1)] hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgba(15,23,42,0.45)]">
      {/* book spine */}
      <div className="relative w-3 shrink-0" style={{ background: `linear-gradient(180deg, ${c}, ${c}99)` }}>
        <span className="absolute inset-y-0 left-0 w-px bg-white/40" />
      </div>
      <span className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20" style={{ background: c }} />
      <div className="relative flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <span className="grid size-11 place-items-center rounded-xl text-white shadow-lg" style={{ background: c, boxShadow: `0 8px 20px ${c}55` }}><GraduationCap className="size-5" /></span>
          <div className="flex flex-col items-end gap-1">
            <span className="rounded-md px-2 py-0.5 text-[10px] font-extrabold text-white" style={{ background: c }}>{b.module}</span>
            {b.status === "live" ? <Chip tone="green"><CheckCircle2 className="size-3" /> פעיל</Chip> : <Chip tone="amber"><Clock className="size-3" /> בתכנון</Chip>}
          </div>
        </div>
        <h3 className="mt-3 text-lg font-extrabold leading-tight tracking-tight text-slate-900">{b.titleHe}</h3>
        <p className="mt-0.5 line-clamp-1 text-xs text-slate-400" dir="ltr">{b.titleEn}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Chip><Languages className="size-3" /> EN · HE</Chip>
          {b.qualityScore != null && <Chip tone="brand"><Star className="size-3" /> איכות {b.qualityScore}</Chip>}
          {b.validated && <Chip tone="green"><CheckCircle2 className="size-3" /> מאומת</Chip>}
        </div>
        {/* progress */}
        <div className="mt-auto pt-4">
          <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-slate-500">
            <span>{b.chaptersDone}/{b.chaptersTotal || "—"} פרקים · {b.nodes} יחידות</span>
            <span style={{ color: c }}>{pct}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${c}, ${c}aa)` }} />
          </div>
          <div className={`mt-3 flex items-center justify-between rounded-xl px-3.5 py-2 text-sm font-bold transition ${live ? "text-white" : "bg-slate-100 text-slate-400"}`} style={live ? { background: c } : undefined}>
            {live ? "פתח מסלול" : "בקרוב"}
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
    <motion.div layout className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_-18px_rgba(15,23,42,0.4)] transition-shadow hover:shadow-[0_24px_50px_-20px_rgba(15,23,42,0.45)]">
      <div className="group relative flex">
        <div className="relative w-3 shrink-0" style={{ background: `linear-gradient(180deg, ${c}, ${c}99)` }}><span className="absolute inset-y-0 left-0 w-px bg-white/40" /></div>
        <div className="relative flex-1 p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl text-white shadow-lg" style={{ background: c, boxShadow: `0 8px 20px ${c}55` }}><BookOpen className="size-5" /></div>
            <div className="flex flex-col items-end gap-1">
              <span className="rounded-md px-2 py-0.5 text-[10px] font-extrabold text-white" style={{ background: c }}>{book.module}</span>
              <span className="text-[10px] text-slate-400">{book.publisher}</span>
            </div>
          </div>
          <h3 className="mt-3 text-base font-extrabold leading-tight tracking-tight text-slate-900">{pick(book.titleHe, book.title)}</h3>
          <p className="mt-0.5 line-clamp-1 text-xs text-slate-400" dir={lang === "he" ? "ltr" : "rtl"}>{lang === "he" ? book.title : book.titleHe}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Chip><Languages className="size-3" /> EN · HE</Chip>
            <Chip><FileText className="size-3" /> {book.pages} עמ׳</Chip>
            <Chip tone="brand"><BookMarked className="size-3" /> {book.chapters.length} פרקים</Chip>
            {reader && <Chip tone="green"><CheckCircle2 className="size-3" /> טקסט מלא</Chip>}
          </div>
          <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-500">{book.summaryHe}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => { playPing(); setOpen((v) => !v); }} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 active:scale-95">
              <Layers className="size-4" /> תוכן הספר {open ? "▲" : "▼"}
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
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden border-t border-slate-100">
            <ul className="max-h-[28rem] divide-y divide-slate-100 overflow-auto">{book.chapters.map((ch) => <ChapterRow key={ch.n} c={ch} />)}</ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ====== animated counter ====== */
function Count({ n }: { n: number }) {
  const [v, setV] = useState(0);
  useEffect(() => { let raf = 0; const t0 = performance.now(); const step = (t: number) => { const p = Math.min(1, (t - t0) / 1100); setV(Math.round((1 - Math.pow(1 - p, 3)) * n)); if (p < 1) raf = requestAnimationFrame(step); }; raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf); }, [n]);
  return <>{v.toLocaleString()}</>;
}

export default function LibraryPage() {
  const { lang } = useI18n();
  const { recent, push } = useRecent();
  const [q, setQ] = useState("");
  const [mod, setMod] = useState<string | null>(null);
  const ac = ACADEMY_META.totals();

  // module filter universe (present across both systems), ordered per request
  const ORDER = ["PM", "PP", "PP-PI", "MM", "QM", "WM", "Fiori", "Foundation"];
  const mods = useMemo(() => {
    const set = new Set<string>([...ACADEMY_BOOKS.map((b) => b.module), ...LIBRARY.map((b) => b.module)]);
    return ORDER.filter((m) => set.has(m)).concat([...set].filter((m) => !ORDER.includes(m)));
  }, []);

  const match = (hay: string[]) => { const s = q.trim().toLowerCase(); return !s || hay.some((h) => (h || "").toLowerCase().includes(s)); };
  const academy = ACADEMY_BOOKS.filter((b) => (!mod || b.module === mod) && match([b.titleHe, b.titleEn, b.module]));
  const reference = LIBRARY.filter((b) => (!mod || b.module === mod) && match([b.title, b.titleHe, b.module, b.publisher]));

  return (
    <div className="space-y-8">
      {/* ===== premium hero ===== */}
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-bl from-[#0e7490] via-[#0891b2] to-[#155e75] p-7 text-white shadow-2xl animate-float-in sm:p-9">
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90">
            <LibraryIcon className="size-3.5" /> SAP Digital Library
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">ספריית SAP הדיגיטלית</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
            מדף ספרים דיגיטלי אחוד — מסלולי למידה אינטראקטיביים ({ac.booksLive} פעילים) לצד {LIBRARY_STATS.books} מדריכי SAP S/4HANA רשמיים. אנגלית מקורית לצד תרגום עברי מקצועי ל-CBC.
          </p>
          <div className="mt-5 grid grid-cols-3 gap-2.5 sm:max-w-xl sm:grid-cols-4">
            {[
              [ACADEMY_BOOKS.length + LIBRARY_STATS.books, "ספרים"],
              [ac.chapters + LIBRARY_STATS.chapters, "פרקים"],
              [ac.nodes, "יחידות לימוד"],
              [LIBRARY_STATS.pages, "עמודים"],
            ].map(([v, l]) => (
              <div key={l} className="flex flex-col items-center rounded-2xl border border-white/15 bg-white/10 px-3 py-3 backdrop-blur-sm">
                <span className="font-mono text-2xl font-extrabold tabular-nums sm:text-3xl"><Count n={v as number} /></span>
                <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/70">{l as string}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== search + module filter ===== */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute inset-y-0 right-3 my-auto size-4 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש ספר · מודול · מו״ל…"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pe-3 ps-10 text-sm shadow-sm outline-none transition focus:border-brand/40 focus:ring-2 focus:ring-brand/15" />
          {q && <button onClick={() => setQ("")} className="absolute inset-y-0 left-3 my-auto"><X className="size-4 text-slate-400" /></button>}
        </div>
        <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
          <button onClick={() => setMod(null)} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition ${!mod ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"}`}>הכל</button>
          {mods.map((m) => { const on = mod === m; const c = mc(m); return (
            <button key={m} onClick={() => setMod(on ? null : m)} className="shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold transition active:scale-95" style={{ borderColor: on ? c : "#e2e8f0", background: on ? c : "#fff", color: on ? "#fff" : "#64748b" }}>{m}</button>); })}
        </div>
      </div>

      {/* ===== recently opened ===== */}
      {recent.length > 0 && (
        <section className="space-y-2.5">
          <h2 className="flex items-center gap-2 text-sm font-extrabold tracking-tight text-slate-900"><Clock className="size-4 text-slate-400" /> נפתחו לאחרונה</h2>
          <div className="flex flex-wrap gap-2">
            {recent.map((r) => (
              <Link key={r.id} href={r.href} className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <span className="size-2.5 rounded-full" style={{ background: mc(r.module) }} />
                <span className="font-semibold text-slate-700">{r.title}</span>
                <ArrowLeft className="size-3.5 text-slate-300 transition group-hover:text-slate-500" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ===== learning paths (Academy) ===== */}
      {academy.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h2 className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-slate-900"><GraduationCap className="size-5 text-brand" /> מסלולי למידה · Academy</h2>
            <Link href="/library/academy/" className="inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline">לוח בקרה <ArrowLeft className="size-3.5" /></Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {academy.map((b) => <AcademyCard key={b.id} b={b} onOpen={push} />)}
          </div>
        </section>
      )}

      {/* ===== reference manuals ===== */}
      {reference.length > 0 && (
        <section className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-slate-900"><BookOpen className="size-5 text-brand" /> ספרי עיון · מדריכי SAP S/4HANA</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {reference.map((b) => <ReferenceCard key={b.id} book={b} onOpen={push} />)}
          </div>
        </section>
      )}

      {academy.length === 0 && reference.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <span className="grid size-14 place-items-center rounded-2xl bg-slate-100 text-slate-400"><Search className="size-7" /></span>
          <p className="text-sm font-bold text-slate-700">לא נמצאו ספרים</p>
          <p className="text-xs text-slate-400">נסה מונח אחר או נקה את הסינון</p>
        </div>
      )}

      <p className="text-center text-xs text-slate-400">
        מסלולי הלמידה נבנו לפי תבנית 18 המקטעים של NEO Academy · מדריכי העיון מאונדקסים מתוכן העניינים של קובצי ה-PDF המקוריים. תרגום עברי מקצועי נכתב עבור CBC.
      </p>
    </div>
  );
}
