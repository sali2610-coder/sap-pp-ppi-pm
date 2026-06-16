"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { Search, Sparkles, ArrowLeft, X, Compass, CornerDownLeft } from "lucide-react";

// ── D3 UX Flows · Knowledge Explorer ──────────────────────────────────────
// Search-first workflow + guided (scroll-spy) navigation + progressive
// disclosure + premium motion + empty state + contextual hints.
// Pure UX layer: every href unchanged, no SAP logic touched. Offline, RTL.

export type Center = { href: string; he: string; title: string; tag?: string; tagColor?: string; desc?: string; group: string };
export type Group = { slug: string; he: string; en: string; intent: string; accent: string };

const norm = (s: string) => s.toLowerCase().normalize("NFKD");

function Highlight({ text, q }: { text: string; q: string }) {
  if (!q) return <>{text}</>;
  const i = norm(text).indexOf(norm(q));
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded bg-brand/15 px-0.5 text-brand">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

function Card({ c, q, accent }: { c: Center; q: string; accent: string }) {
  return (
    <Link
      href={c.href}
      className="lift group relative block overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm outline-none transition-shadow focus-visible:shadow-[var(--ring-soft)]"
      dir="rtl"
    >
      <span aria-hidden className="absolute inset-y-0 end-0 w-1 origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100" style={{ background: accent }} />
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-base font-extrabold tracking-tight text-slate-900"><Highlight text={c.he} q={q} /></h3>
          <p className="tech text-xs font-bold text-slate-400" dir="ltr"><Highlight text={c.title} q={q} /></p>
        </div>
        {c.tag && <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: c.tagColor || "#64748b" }}>{c.tag}</span>}
      </div>
      {c.desc && (
        <p className="mt-2 text-xs leading-relaxed text-slate-500 transition-all duration-300 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] group-hover:[-webkit-line-clamp:5]">
          {c.desc}
        </p>
      )}
      <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand">
        פתח<ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
      </span>
    </Link>
  );
}

export function KnowledgeExplorer({ centers, groups }: { centers: Center[]; groups: Group[] }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(groups[0]?.slug ?? "");
  const reduce = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const query = q.trim();
  const results = useMemo(() => {
    if (!query) return null;
    const n = norm(query);
    return centers.filter((c) => norm(c.he).includes(n) || norm(c.title).includes(n) || norm(c.desc ?? "").includes(n) || norm(c.href).includes(n));
  }, [query, centers]);

  // Guided nav: scroll-spy via IntersectionObserver (no scroll listener).
  useEffect(() => {
    if (query) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis?.target) setActive((vis.target as HTMLElement).dataset.slug || active);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.5, 1] },
    );
    Object.values(sectionRefs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  // Keyboard: "/" focuses search, Esc clears.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) { e.preventDefault(); inputRef.current?.focus(); }
      if (e.key === "Escape" && document.activeElement === inputRef.current) setQ("");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.04 } } };
  const item: Variants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } } };

  const suggestions = ["אצווה", "MRP", "Fiori", "תקלה", "ECC", "הרשאות"];

  return (
    <div>
      {/* ── Search-first hero ── */}
      <section dir="rtl" className="surface relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-7">
        <span aria-hidden className="pointer-events-none absolute -top-24 -start-16 size-64 rounded-full opacity-[0.07] blur-3xl" style={{ background: "radial-gradient(circle, #d62027, transparent 70%)" }} />
        <div className="relative">
          <p className="eyebrow mb-1.5 text-brand">מצא מהר · SEARCH-FIRST</p>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-[1.75rem]">מה תרצה לעשות?</h2>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500">הקלד כדי לסנן את כל {centers.length} המרכזים בזמן אמת — לפי שם, נושא או T-Code. או בחר מסע לפי משימה.</p>

          {/* live filter input */}
          <div className="relative mt-5">
            <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 text-slate-400"><Search className="size-5" /></span>
            <input
              ref={inputRef}
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="חפש מרכז, נושא או T-Code…  (הקש / למיקוד)"
              aria-label="חיפוש במרכז הידע"
              className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50/60 ps-12 pe-28 text-sm font-medium text-slate-900 shadow-inner outline-none transition-all placeholder:text-slate-400 focus:border-brand/40 focus:bg-white focus:shadow-[var(--ring-soft)]"
            />
            <div className="absolute inset-y-0 end-0 flex items-center gap-2 pe-3">
              {query && (
                <button onClick={() => { setQ(""); inputRef.current?.focus(); }} aria-label="נקה חיפוש" className="tap grid size-8 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                  <X className="size-4" />
                </button>
              )}
              {query
                ? <span className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-bold text-brand">{results?.length ?? 0} תוצאות</span>
                : <kbd className="hidden items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[10px] font-bold text-slate-400 sm:flex"><CornerDownLeft className="size-3" />פתח</kbd>}
            </div>
          </div>

          {/* contextual hint: suggestion chips (only when idle) */}
          {!query && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="me-1 text-xs font-bold text-slate-400">נסה:</span>
              {suggestions.map((s) => (
                <button key={s} onClick={() => { setQ(s); inputRef.current?.focus(); }} className="tap rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-500 transition-colors hover:border-brand/40 hover:text-brand">{s}</button>
              ))}
              <span className="ms-auto hidden items-center gap-2 text-xs text-slate-400 sm:flex">
                <Link href="/copilot/" className="inline-flex items-center gap-1 font-bold text-slate-500 hover:text-brand"><Sparkles className="size-3.5" />או שאל את הקופיילוט</Link>
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ── Guided nav (scroll-spy) — only while browsing ── */}
      <AnimatePresence initial={false}>
        {!query && (
          <motion.nav
            initial={reduce ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -8 }}
            dir="rtl" aria-label="ניווט מודרך"
            className="sticky top-3 z-20 mt-5 flex items-center gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white/85 p-2 shadow-sm backdrop-blur-md"
          >
            <Compass className="ms-1 size-4 shrink-0 text-slate-400" />
            {groups.map((g) => {
              const on = active === g.slug;
              return (
                <a key={g.slug} href={`#j-${g.slug}`}
                  className="tap relative shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition-colors"
                  style={{ color: on ? "#fff" : "#475569" }}>
                  {on && <motion.span layoutId="navpill" className="absolute inset-0 -z-10 rounded-full" style={{ background: g.accent }} transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  {g.he}
                </a>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── Results (search) OR Journeys (browse) ── */}
      <AnimatePresence mode="wait">
        {query ? (
          results && results.length > 0 ? (
            <motion.div key="results" variants={container} initial="hidden" animate="show" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" dir="rtl">
              {results.map((c) => {
                const g = groups.find((x) => x.slug === c.group);
                return <motion.div key={c.href} variants={item}><Card c={c} q={query} accent={g?.accent ?? "#d62027"} /></motion.div>;
              })}
            </motion.div>
          ) : (
            // ── Empty state ──
            <motion.div key="empty" initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              dir="rtl" className="mt-6 flex flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-slate-200 bg-white/60 p-12 text-center">
              <span className="grid size-14 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-400 shadow-sm"><Search className="size-7" /></span>
              <div>
                <h3 className="text-lg font-extrabold tracking-tight text-slate-900">לא נמצאו מרכזים עבור “{query}”</h3>
                <p className="mt-1 text-sm text-slate-500">נסה מונח רחב יותר, או חפש לפי צורך עסקי / שאל את הקופיילוט.</p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button onClick={() => { setQ(""); inputRef.current?.focus(); }} className="tap rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-700">נקה חיפוש</button>
                <Link href="/solutions/" className="tap rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 hover:border-brand/40 hover:text-brand">חיפוש לפי צורך עסקי</Link>
                <Link href="/copilot/" className="tap inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 hover:border-brand/40 hover:text-brand"><Sparkles className="size-3.5" />שאל את הקופיילוט</Link>
              </div>
            </motion.div>
          )
        ) : (
          <motion.div key="journeys" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 space-y-10">
            {groups.map((g) => {
              const cards = centers.filter((c) => c.group === g.slug);
              return (
                <section key={g.slug} id={`j-${g.slug}`} data-slug={g.slug} ref={(el) => { sectionRefs.current[g.slug] = el; }} className="scroll-mt-20" dir="rtl">
                  <div className="mb-3.5 flex items-baseline gap-3">
                    <span className="inline-block size-2.5 shrink-0 rounded-full" style={{ background: g.accent }} />
                    <h2 className="text-xl font-extrabold tracking-tight text-slate-900">{g.he}</h2>
                    <span className="tech text-xs font-bold text-slate-400" dir="ltr">{g.en}</span>
                    <span className="ms-auto rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-500">{cards.length}</span>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-slate-500">{g.intent}</p>
                  <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {cards.map((c) => <motion.div key={c.href} variants={item}><Card c={c} q="" accent={g.accent} /></motion.div>)}
                  </motion.div>
                </section>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
