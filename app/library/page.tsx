"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BookOpen, FileText, Library as LibraryIcon, ArrowLeft, GraduationCap, Search, X, Clock, CheckCircle2, Star, Languages, BookMarked, LayoutGrid, Sparkles, Compass, Timer, Layers3, PlayCircle } from "lucide-react";
import { LIBRARY, LIBRARY_STATS, type LibBook } from "@/data/library";
import { ACADEMY_BOOKS, ACADEMY_META, type AcademyBook } from "@/data/library/academy";
import { useI18n } from "@/lib/i18n";
import { playPing } from "@/lib/sound";
import { BookCover, moduleColor as mc, type CoverBook } from "@/components/book-cover";
import { readContinuity, writeContinuity, type Continuity } from "@/lib/continuity-store";

/* UI-only estimate (NOT SAP data): ~12 min per learning unit */
const estHours = (nodes: number) => Math.max(1, Math.round((nodes || 0) * 0.2));

/* ---- deep-reader routes for reference manuals that have full text ---- */
const READER: Record<string, string> = { "config-pm": "/library/book1/", "production-planning": "/library/book2/", "quality-management": "/library/book5/", "sourcing-procurement": "/library/book3/", "pp-ds": "/library/book4/", "warehouse-management": "/library/book6/", "fiori-apps": "/library/book7/", "pm-business-user": "/library/book9/", "ibp-sop": "/library/book10/", "s4-foundation": "/library/book11/" };

const asCover = (b: LibBook): CoverBook => ({ title: b.titleHe, titleEn: b.title, module: b.module, publisher: b.publisher, pages: b.pages, chapters: b.chapters.length });

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

/* open a book: record recency + continuity, then route */
function useOpenBook(push: (r: Recent) => void) {
  const router = useRouter();
  return (b: LibBook) => {
    const href = READER[b.id];
    if (!href) return;
    playPing();
    push({ id: b.id, title: b.titleHe, module: b.module, href });
    writeContinuity({ bookId: b.id, title: b.titleHe, module: b.module, href });
    router.push(href);
  };
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

/* ====== adaptive hero — cinematic on first visit, compact editorial after ====== */
function LibraryHero({ stats }: { stats: { v: number; l: string }[] }) {
  const [compact, setCompact] = useState<boolean | null>(null);
  useEffect(() => {
    let seen = false;
    try { seen = localStorage.getItem("neo:lib:visited") === "1"; localStorage.setItem("neo:lib:visited", "1"); } catch { /* noop */ }
    setCompact(seen);
  }, []);
  const isCompact = compact ?? false; // SSR/first paint → cinematic

  if (isCompact) {
    // compact editorial header — maximum space to the books
    return (
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-ink-1 to-[#2a2d33] text-white shadow-md"><LibraryIcon className="size-5 text-brand" /></span>
          <div>
            <h1 className="font-display text-xl tracking-tight text-ink-1 sm:text-2xl">מרכז הידע של <span className="text-brand">SAP</span></h1>
            <p className="hidden text-[11px] font-semibold text-ink-3 sm:block">אקדמיית הכשרה · ספריית עיון טכנית · EN + עברית</p>
          </div>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          {stats.map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-mono text-base font-extrabold tabular-nums text-ink-1">{s.v.toLocaleString()}</div>
              <div className="text-[9.5px] font-semibold uppercase tracking-wider text-ink-3">{s.l}</div>
            </div>
          ))}
        </div>
      </header>
    );
  }

  // cinematic first-visit masthead
  return (
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
        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:max-w-xl sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="flex flex-col items-center rounded-2xl border border-white/12 bg-white/8 px-3 py-3 backdrop-blur-sm">
              <span className="font-mono text-2xl font-extrabold tabular-nums sm:text-3xl"><Count n={s.v} /></span>
              <span className="mt-0.5 text-center text-[10px] font-semibold uppercase tracking-wider text-white/60">{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====== continue-reading — exact-resume hero + recent chips ====== */
function ResumeStrip({ recent }: { recent: Recent[] }) {
  const [cont, setCont] = useState<Continuity | null>(null);
  useEffect(() => { setCont(readContinuity()); }, []);
  const primary = cont || (recent[0] ? { bookId: recent[0].id, title: recent[0].title, module: recent[0].module, href: recent[0].href, updatedAt: 0 } as Continuity : null);
  if (!primary) return null;
  const c = mc(primary.module);
  const rest = recent.filter((r) => r.id !== primary.bookId);
  return (
    <Reveal>
      <section className="relative flex flex-col gap-3 overflow-hidden rounded-3xl border border-hairline bg-surface p-4 shadow-[0_12px_34px_-22px_rgba(15,23,42,0.5)] sm:flex-row sm:items-center sm:gap-5 sm:p-5">
        <span className="pointer-events-none absolute -left-16 -top-16 size-40 rounded-full opacity-[0.1] blur-3xl" style={{ background: c }} />
        <Link href={primary.href} className="group flex min-w-0 flex-1 items-center gap-4">
          <span className="w-14 shrink-0 sm:w-16"><BookCover book={{ title: primary.title, module: primary.module }} size="sm" /></span>
          <span className="min-w-0">
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: c }}><PlayCircle className="size-3.5" /> המשך לקרוא</span>
            <span className="mt-0.5 block truncate text-base font-extrabold tracking-tight text-ink-1">{primary.title}</span>
            <span className="mt-0.5 block text-xs font-semibold text-ink-3">{primary.chapter ? `פרק ${primary.chapter} · ` : ""}חזרה לנקודה שבה הפסקת</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          {rest.length > 0 && (
            <div className="hidden max-w-md flex-wrap gap-1.5 lg:flex">
              {rest.slice(0, 3).map((r) => (
                <Link key={r.id} href={r.href} className="group inline-flex items-center gap-1.5 rounded-xl border border-hairline bg-surface px-2.5 py-1.5 text-xs font-semibold text-ink-2 transition hover:-translate-y-0.5 hover:border-brand/40">
                  <span className="size-2 rounded-full" style={{ background: mc(r.module) }} />
                  <span className="max-w-[9rem] truncate">{r.title}</span>
                </Link>
              ))}
            </div>
          )}
          <Link href={primary.href} className="group inline-flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:brightness-110 active:scale-95" style={{ background: c }}>
            המשך <span className="grid size-6 place-items-center rounded-full bg-white/20 transition group-hover:-translate-x-0.5"><ArrowLeft className="size-3.5" /></span>
          </Link>
        </div>
      </section>
    </Reveal>
  );
}

/* ====== ACADEMY learning-path card ====== */
function AcademyCard({ b, onOpen }: { b: AcademyBook; onOpen: (r: Recent) => void }) {
  const c = mc(b.module);
  const pct = b.chaptersTotal ? Math.round((b.chaptersDone / b.chaptersTotal) * 100) : 0;
  const live = b.status === "live" && b.href;
  const inner = (
    <div className="group relative flex h-full overflow-hidden rounded-2xl border border-hairline bg-surface shadow-[0_10px_30px_-18px_rgba(15,23,42,0.4)] transition-all duration-500 ease-[cubic-bezier(.32,.72,0,1)] hover:-translate-y-2 hover:shadow-[0_28px_56px_-22px_rgba(15,23,42,0.5)]">
      <span className="w-2 shrink-0" style={{ background: `linear-gradient(160deg, ${c}, ${c}bb)` }} />
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

/* ====== FEATURED reference book — editorial cover + panel ====== */
function FeaturedBook({ book, onOpen }: { book: LibBook; onOpen: (b: LibBook) => void }) {
  const c = mc(book.module);
  const reader = READER[book.id];
  return (
    <div className="group relative grid gap-6 overflow-hidden rounded-[1.75rem] border border-hairline bg-surface p-6 shadow-[0_16px_44px_-24px_rgba(15,23,42,0.5)] transition-all duration-500 hover:shadow-[0_32px_64px_-26px_rgba(15,23,42,0.55)] sm:grid-cols-[minmax(150px,210px)_1fr] sm:p-8">
      <span className="pointer-events-none absolute -left-16 -top-16 size-48 rounded-full opacity-[0.12] blur-3xl" style={{ background: c }} />
      <button onClick={() => onOpen(book)} className="relative mx-auto w-40 max-w-full transition-transform duration-500 ease-[cubic-bezier(.32,.72,0,1)] group-hover:-translate-y-1.5 group-hover:rotate-[-1deg] sm:w-full" aria-label={`פתח ${book.titleHe}`}>
        <BookCover book={asCover(book)} size="lg" />
      </button>
      <div className="relative flex flex-col justify-center gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand"><Sparkles className="size-3" /> ספר נבחר</span>
          <span className="rounded-md px-2 py-0.5 text-[10px] font-extrabold text-white" style={{ background: c }}>{book.module}</span>
          <span className="text-[11px] font-semibold text-ink-3">{book.publisher}</span>
        </div>
        <h3 className="max-w-2xl text-2xl font-black leading-tight tracking-tight text-ink-1 sm:text-[1.9rem]">{book.titleHe}</h3>
        <p className="max-w-2xl text-[13.5px] leading-relaxed text-ink-2 sm:text-sm">{book.summaryHe}</p>
        <div className="flex flex-wrap items-center gap-2">
          <Chip><FileText className="size-3" /> {book.pages} עמ׳</Chip>
          <Chip tone="brand"><BookMarked className="size-3" /> {book.chapters.length} פרקים</Chip>
          <Chip><Languages className="size-3" /> EN · HE</Chip>
          {reader && <Chip tone="green"><CheckCircle2 className="size-3" /> טקסט מלא</Chip>}
        </div>
        {reader && (
          <div className="mt-1">
            <button onClick={() => onOpen(book)} className="group/btn inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:brightness-110 active:scale-95" style={{ background: c }}>
              <BookOpen className="size-4" /> פתח את הספר
              <span className="grid size-6 place-items-center rounded-full bg-white/20 transition group-hover/btn:-translate-x-0.5"><ArrowLeft className="size-3.5" /></span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ====== spine → bring the book FORWARD (face-out) before opening ====== */
function BookPeek({ book, onOpen, onClose }: { book: LibBook; onOpen: (b: LibBook) => void; onClose: () => void }) {
  const reduce = useReducedMotion();
  const c = mc(book.module);
  const reader = READER[book.id];
  // overlay a11y — Esc closes + lock background scroll while the peek is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", h); };
  }, [onClose]);
  return (
    <motion.div role="dialog" aria-modal="true" aria-label={book.titleHe} onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}>
      <motion.div onClick={(e) => e.stopPropagation()}
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }} transition={{ duration: 0.26, ease: [0.2, 0, 0, 1] }}
        className="grid w-full max-w-lg gap-5 rounded-3xl border border-hairline bg-surface p-5 shadow-2xl sm:grid-cols-[150px_1fr] sm:p-6">
        <motion.div layoutId={reduce ? undefined : `cover-${book.id}`} className="mx-auto w-32 sm:mx-0 sm:w-full"><BookCover book={asCover(book)} size="lg" /></motion.div>
        <div className="flex min-w-0 flex-col justify-center gap-2.5">
          <div className="flex items-center gap-2">
            <span className="rounded-md px-2 py-0.5 text-[10px] font-extrabold text-white" style={{ background: c }}>{book.module}</span>
            <span className="text-[11px] font-semibold text-ink-3">{book.publisher}</span>
          </div>
          <h3 className="text-xl font-black leading-tight tracking-tight text-ink-1">{book.titleHe}</h3>
          <p className="line-clamp-3 text-[13px] leading-relaxed text-ink-2">{book.summaryHe}</p>
          <div className="flex flex-wrap gap-1.5">
            <Chip><FileText className="size-3" /> {book.pages} עמ׳</Chip>
            <Chip tone="brand"><BookMarked className="size-3" /> {book.chapters.length} פרקים</Chip>
            <Chip><Languages className="size-3" /> EN · HE</Chip>
          </div>
          <div className="mt-1 flex items-center gap-2">
            {reader ? (
              <button onClick={() => onOpen(book)} autoFocus className="group inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:brightness-110 active:scale-95" style={{ background: c }}>
                <BookOpen className="size-4" /> פתח את הספר
                <span className="grid size-6 place-items-center rounded-full bg-white/20 transition group-hover:-translate-x-0.5"><ArrowLeft className="size-3.5" /></span>
              </button>
            ) : <span className="text-sm font-semibold text-ink-3">אין טקסט מלא לספר זה</span>}
            <button onClick={onClose} className="rounded-2xl border border-hairline bg-surface px-4 py-2.5 text-sm font-bold text-ink-2 transition hover:bg-surface-2">חזרה למדף</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ====== every book as a real face-out cover (§1) — one reusable card ====== */
function BookCard({ book, reading, onOpen }: { book: LibBook; reading: boolean; onOpen: () => void }) {
  const reduce = useReducedMotion();
  const c = mc(book.module);
  const hasReader = !!READER[book.id];
  return (
    <button data-book-id={book.id} onClick={onOpen} aria-label={`פתח ${book.titleHe}`} className="group relative flex flex-col text-start">
      <motion.div layoutId={reduce ? undefined : `cover-${book.id}`} whileHover={reduce ? undefined : { y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 26 }} className={`relative ${reading ? "rounded-[10px] ring-2 ring-brand ring-offset-2 ring-offset-surface" : ""}`}>
        <BookCover book={asCover(book)} size="md" />
        {reading && <span className="absolute end-2 top-2 z-10 inline-flex items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-[10px] font-extrabold text-white shadow-md"><BookOpen className="size-3" />בקריאה</span>}
        {!hasReader && <span className="pointer-events-none absolute inset-x-2 bottom-2 rounded-md bg-slate-900/70 px-2 py-1 text-center text-[10px] font-bold text-white backdrop-blur-sm">בקרוב · טקסט מלא</span>}
      </motion.div>
      <span className="mt-2 line-clamp-2 text-[12.5px] font-bold leading-snug text-ink-1 transition group-hover:text-brand">{book.titleHe}</span>
      <span className="mt-1 flex flex-wrap items-center gap-1.5 text-[10.5px] font-semibold text-ink-3">
        <span className="rounded px-1.5 py-0.5 font-bold text-white" style={{ background: c }}>{book.module}</span>
        <span>{book.pages} עמ׳ · {book.chapters.length} פרקים</span>
      </span>
    </button>
  );
}
function BookGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">{children}</div>;
}

export default function LibraryPage() {
  const { recent, push } = useRecent();
  const openBook = useOpenBook(push);
  const [peek, setPeek] = useState<LibBook | null>(null);
  const [q, setQ] = useState("");
  // returning to the library — bring the last-opened book back to view on its shelf
  const flashed = useRef(false);
  useEffect(() => {
    if (flashed.current || !recent[0]) return;
    flashed.current = true;
    const el = document.querySelector<HTMLElement>(`[data-book-id="${recent[0].id}"]`);
    if (el) { el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" }); el.classList.add("neo-flash"); window.setTimeout(() => el.classList.remove("neo-flash"), 1400); }
  }, [recent]);
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

  const publishers = useMemo(() => [...new Set(reference.map((b) => b.publisher))], [reference]);
  const featured = useMemo(() => (!q && !mod ? [...LIBRARY].sort((a, b) => b.pages - a.pages)[0] : null), [q, mod]);
  const totalAcademyHours = useMemo(() => ACADEMY_BOOKS.reduce((s, b) => s + estHours(b.nodes), 0), []);
  const acLive = ACADEMY_BOOKS.filter((b) => b.status === "live");
  const filtering = Boolean(q || mod);

  const heroStats = [
    { v: ACADEMY_BOOKS.length + LIBRARY_STATS.books, l: "ספרים" },
    { v: ac.chapters + LIBRARY_STATS.chapters, l: "פרקים" },
    { v: ac.nodes, l: "יחידות לימוד" },
    { v: LIBRARY_STATS.pages, l: "עמודים" },
  ];

  return (
    <div className="space-y-9">
      <LibraryHero stats={heroStats} />

      {/* ===== search + module filter ===== */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute inset-y-0 right-3 my-auto size-4 text-ink-3" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש ספר · מסלול · מודול · מו״ל…"
            className="w-full rounded-xl border border-hairline bg-surface py-2.5 pe-3 ps-10 text-sm shadow-sm outline-none transition focus:border-brand/40 focus:ring-2 focus:ring-brand/15" />
          {q && <button onClick={() => setQ("")} aria-label="נקה" className="absolute inset-y-0 left-3 my-auto"><X className="size-4 text-ink-3" /></button>}
        </div>
        <div className="chip-rail flex flex-nowrap gap-1.5 overflow-x-auto pb-1">
          <button onClick={() => setMod(null)} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition ${!mod ? "bg-ink-1 text-white" : "border border-hairline bg-surface text-ink-3 hover:bg-surface-2"}`}>הכל</button>
          {mods.map((m) => { const on = mod === m; const c = mc(m); return (
            <button key={m} onClick={() => setMod(on ? null : m)} className="shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold transition active:scale-95" style={{ borderColor: on ? c : "var(--hairline)", background: on ? c : "var(--surface)", color: on ? "#fff" : "var(--ink-3)" }}>{m}</button>); })}
        </div>
      </div>

      {/* ===== continue reading ===== */}
      {!filtering && <ResumeStrip recent={recent} />}

      {/* ============================================================= */}
      {/* WORLD 1 — SAP ACADEMY (structured learning platform)          */}
      {/* ============================================================= */}
      {academy.length > 0 && (
        <Reveal>
          <section className="space-y-5 rounded-[2rem] border border-hairline bg-surface-2/40 p-5 sm:p-7">
            <SectionHead icon={<GraduationCap className="size-5" />} eyebrow="Structured Learning · פלטפורמת הכשרה" title="SAP Academy" tint="#d62027">
              <Link href="/library/academy/search/" className="hidden items-center gap-1 text-xs font-bold text-brand hover:underline sm:inline-flex"><Search className="size-3.5" /> חיפוש מאוחד</Link>
              <Link href="/library/academy/fiori/" className="hidden items-center gap-1 text-xs font-bold text-brand hover:underline sm:inline-flex"><LayoutGrid className="size-3.5" /> אינדקס Fiori</Link>
              <Link href="/library/academy/" className="inline-flex items-center gap-1 rounded-lg bg-brand px-2.5 py-1.5 text-xs font-bold text-white transition hover:brightness-110">לוח בקרה <ArrowLeft className="size-3.5" /></Link>
            </SectionHead>

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
      {/* WORLD 2 — DIGITAL REFERENCE LIBRARY (the bookshelf)           */}
      {/* ============================================================= */}
      {reference.length > 0 && (
        <Reveal>
          <section className="space-y-6">
            <SectionHead icon={<BookOpen className="size-5" />} eyebrow="Enterprise Technical Library · ספריית עיון" title="ספרייה דיגיטלית" tint="#0b0c0e" />

            {featured && <FeaturedBook book={featured} onOpen={openBook} />}

            {!filtering ? (
              <div className="space-y-7">
                {publishers.map((pub) => {
                  const books = reference.filter((b) => b.publisher === pub && b.id !== featured?.id);
                  if (!books.length) return null;
                  return (
                    <div key={pub} className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="h-4 w-1 rounded-full bg-brand" />
                        <h3 className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-ink-2">{pub} Collection</h3>
                        <span className="text-[11px] font-semibold text-ink-3">· {books.length} ספרים</span>
                        <span className="h-px flex-1 bg-hairline" />
                      </div>
                      <BookGrid>
                        {books.map((b) => <BookCard key={b.id} book={b} reading={recent[0]?.id === b.id} onOpen={() => setPeek(b)} />)}
                      </BookGrid>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>
                <p className="mb-2 text-[11px] font-semibold text-ink-3">{reference.length} ספרים תואמים</p>
                <BookGrid>
                  {reference.map((b) => <BookCard key={b.id} book={b} reading={recent[0]?.id === b.id} onOpen={() => setPeek(b)} />)}
                </BookGrid>
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

      {/* spine → forward preview → open */}
      <AnimatePresence>
        {peek && <BookPeek key={peek.id} book={peek} onOpen={openBook} onClose={() => setPeek(null)} />}
      </AnimatePresence>
    </div>
  );
}
