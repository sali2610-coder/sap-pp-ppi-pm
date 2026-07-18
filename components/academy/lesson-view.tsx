"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Copy, Check, ChevronLeft, ExternalLink, Info, PartyPopper, ArrowLeft, ArrowRight,
  Target, HelpCircle, TrendingUp, MapPin, KeyRound, Building2, Workflow, Network,
  Table2, Terminal, LayoutDashboard, Settings, Boxes, Braces, Lock, StickyNote,
  AlertTriangle, Wrench, Award, Lightbulb, Link2, CircleHelp, BookCheck, Clock, ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { orderedBlocks, type Lesson, type LessonBlock, type Trust, type BlockKind } from "@/lib/academy/lesson-types";
import { useLessonProgress } from "@/lib/academy/lesson-progress";
import { recordActivity } from "@/lib/academy/gamification";
import { recordRecent } from "@/lib/academy/recent";
import { Callout, Chip, Pill } from "@/components/ui";

/* ── design language (blueprint) ─────────────────────────────────────────────
   Premium reading experience: flowing document sections (not an accordion),
   SVG icons (no emoji), reader-grade typography, active "on this page" rail.
   Block engine + lesson data are UNCHANGED — only presentation. */

const MODULE_ACCENT: Record<string, string> = { PM: "#f97316", "PP-PI": "#6d28d9", PP: "#6d28d9", QM: "#0891b2", MM: "#d97706", WM: "#7c3aed" };
const accentOf = (m: string) => MODULE_ACCENT[m] || "var(--brand)";

// per-block category colour — instant recognition, restrained (design-principles §1)
const TONE: Record<string, string> = {
  objective: "#0b0c0e", why: "#334155", "business-value": "#334155", "where-used": "#334155", "key-concepts": "#334155",
  "cbc-example": "#1d4ed8", flow: "#1d4ed8", diagram: "#1d4ed8",
  tables: "#475569", tcodes: "#475569", fiori: "#475569", objects: "#475569", odata: "#475569", authorizations: "#475569", spro: "#475569", notes: "#475569",
  "common-mistakes": "#b45309", troubleshooting: "#b45309",
  "best-practices": "#0f766e", tips: "#0f766e",
  related: "#6d28d9", quiz: "#6d28d9", summary: "#d62027",
};
const toneOf = (k: BlockKind) => TONE[k] || "#334155";

// SVG icon per block kind — replaces the emoji set (premium, on-brand)
const ICON: Record<string, LucideIcon> = {
  objective: Target, why: HelpCircle, "business-value": TrendingUp, "where-used": MapPin, "key-concepts": KeyRound,
  "cbc-example": Building2, flow: Workflow, diagram: Network,
  tables: Table2, tcodes: Terminal, fiori: LayoutDashboard, spro: Settings, objects: Boxes, odata: Braces, authorizations: Lock, notes: StickyNote,
  "common-mistakes": AlertTriangle, troubleshooting: Wrench, "best-practices": Award, tips: Lightbulb,
  related: Link2, quiz: CircleHelp, summary: BookCheck,
};
const HE: Record<string, string> = {
  objective: "מטרת השיעור", why: "למה זה חשוב", "business-value": "ערך עסקי", "where-used": "היכן בשימוש", "key-concepts": "מושגי מפתח",
  "cbc-example": "דוגמה מ-CBC", flow: "תהליך", diagram: "תרשים",
  tables: "טבלאות", tcodes: "טרנזקציות", fiori: "אפליקציות Fiori", spro: "קונפיגורציה (SPRO)", objects: "אובייקטים / BAPIs", odata: "OData / API", authorizations: "הרשאות", notes: "הערות",
  "common-mistakes": "טעויות נפוצות", troubleshooting: "פתרון תקלות", "best-practices": "שיטות עבודה מומלצות", tips: "טיפים",
  related: "קישורים קשורים", quiz: "בחן את עצמך", summary: "סיכום",
};

const TRUST_TONE: Record<Trust, { tone: "good" | "warn" | "neutral"; he: string }> = {
  "verified-docs": { tone: "good", he: "מאומת" },
  "verified-system": { tone: "good", he: "מאומת במערכת" },
  curated: { tone: "neutral", he: "ידע אצור" },
  "needs-review": { tone: "warn", he: "דורש בדיקה" },
};
const LVL_TONE: Record<string, "good" | "warn" | "bad"> = { "בסיסי": "good", "בינוני": "warn", "מורכב": "bad" };

// tiny **bold** renderer (no external md lib)
function md(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((p, i) => (p.startsWith("**") && p.endsWith("**") ? <b key={i} className="font-bold text-ink-1">{p.slice(2, -2)}</b> : <span key={i}>{p}</span>));
}

function CopyBtn({ value }: { value: string }) {
  const [ok, setOk] = useState(false);
  return <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigator.clipboard?.writeText(value).then(() => { setOk(true); setTimeout(() => setOk(false), 1100); }).catch(() => {}); }}
    aria-label="העתק" title={ok ? "הועתק" : "העתק"} className="ms-1.5 inline-grid size-5 place-items-center rounded border border-hairline text-ink-3 hover:text-ink-1">{ok ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}</button>;
}

function CodeChip({ r }: { r: { code: string; label?: string; href?: string } }) {
  const inner = <Chip variant="code" interactive={!!r.href} className="text-[12px]"><span dir="ltr">{r.code}</span>{r.label && <span className="font-normal text-ink-3"> · {r.label}</span>}{r.href && <ExternalLink className="size-3 text-ink-3" />}</Chip>;
  return <span className="inline-flex items-center">{r.href ? <Link href={r.href}>{inner}</Link> : inner}<CopyBtn value={r.code} /></span>;
}

function SourceChip({ b }: { b: LessonBlock }) {
  if (!b.trust) return null;
  const t = TRUST_TONE[b.trust];
  return <Pill tone={t.tone} className="text-[9.5px]" title={[b.source, b.lastReviewed && `נבדק ${b.lastReviewed}`].filter(Boolean).join(" · ")}><ShieldCheck className="size-2.5" />{t.he}</Pill>;
}

function QuizCard({ q }: { q: { question: string; options: { text: string; correct?: boolean }[]; explain?: string } }) {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <div className="rounded-xl border border-hairline p-3.5">
      <p className="text-[13.5px] font-bold text-ink-1">{q.question}</p>
      <div className="mt-2.5 flex flex-col gap-1.5">
        {q.options.map((o, i) => {
          const show = picked !== null;
          const cls = show ? (o.correct ? "border-emerald-300 bg-[#f0f7f0] text-[#15803d] font-bold" : i === picked ? "border-brand/40 bg-brand-soft text-brand" : "border-hairline text-ink-3") : "border-hairline text-ink-2 hover:border-brand/30";
          return <button key={i} onClick={() => setPicked(i)} className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-start text-[12.5px] transition ${cls}`}>{show && o.correct && <Check className="size-3.5 shrink-0" />}{o.text}</button>;
        })}
      </div>
      {picked !== null && q.explain && <p className="mt-2 text-[11.5px] text-ink-3">{q.explain}</p>}
    </div>
  );
}

function BlockBody({ b }: { b: LessonBlock }) {
  switch (b.kind) {
    case "objective":
      return <p className="max-w-[68ch] text-[15px] font-medium leading-[1.75] text-ink-1">{md(b.md)}</p>;
    case "why": case "business-value": case "where-used": case "cbc-example": case "spro": case "troubleshooting": case "notes": case "summary":
      return <p className="max-w-[68ch] text-[14px] leading-[1.8] text-ink-2">{md(b.md)}</p>;
    case "key-concepts": case "authorizations":
      return <ul className="flex max-w-[68ch] flex-col gap-2.5">{b.items.map((it, i) => <li key={i} className="flex items-start gap-2.5 text-[14px] leading-[1.7] text-ink-2"><span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-brand" />{md(it)}</li>)}</ul>;
    case "common-mistakes":
      return <Callout tone="warning" className="max-w-[70ch]"><ul className="flex flex-col gap-1.5">{b.items.map((it, i) => <li key={i}>{md(it)}</li>)}</ul></Callout>;
    case "best-practices": case "tips":
      return <Callout tone="success" icon={b.kind === "tips" ? Lightbulb : Award} className="max-w-[70ch]"><ul className="flex flex-col gap-1.5">{b.items.map((it, i) => <li key={i}>{md(it)}</li>)}</ul></Callout>;
    case "flow":
      return <div className="flex flex-wrap items-center gap-2">{b.steps.map((s, i) => <span key={i} className="flex items-center gap-2">{i > 0 && <ChevronLeft className="size-3.5 text-ink-3" />}<span className={`rounded-lg border px-3 py-1.5 text-[12px] font-bold ${i === b.activeIndex ? "border-brand bg-brand text-white" : "border-hairline bg-surface-2 text-ink-2"}`}>{s}</span></span>)}</div>;
    case "diagram":
      return <div className="grid h-36 place-items-center rounded-xl border border-dashed border-hairline bg-gradient-to-br from-surface-2/40 to-surface-2/70 text-center text-[12px] font-semibold text-ink-3">◱ {b.caption}</div>;
    case "tables":
      return <div className="overflow-hidden rounded-xl border border-hairline"><table className="w-full border-collapse text-[12.5px]"><thead><tr className="bg-surface-2"><th className="px-3 py-2 text-start text-[10px] font-extrabold uppercase text-ink-3">טבלה</th><th className="px-3 py-2 text-start text-[10px] font-extrabold uppercase text-ink-3">תיאור</th></tr></thead><tbody>{b.rows.map((r) => <tr key={r.code} className="border-t border-hairline"><td className="px-3 py-2">{r.href ? <Link href={r.href} className="tech font-mono font-bold text-ink-1 hover:text-brand" dir="ltr">{r.code}</Link> : <span className="tech font-mono font-bold text-ink-1" dir="ltr">{r.code}</span>}<CopyBtn value={r.code} /></td><td className="px-3 py-2 text-ink-2">{r.he}</td></tr>)}</tbody></table></div>;
    case "tcodes": case "fiori": case "objects": case "odata": case "related":
      return <div><div className="flex flex-wrap gap-2">{b.refs.map((r) => <CodeChip key={r.code} r={r} />)}</div>{b.note && <p className="mt-2 text-[11.5px] text-ink-3"><Info className="me-1 inline size-3" />{b.note}</p>}</div>;
    case "quiz":
      return <div className="flex flex-col gap-3">{b.items.map((q, i) => <QuizCard key={i} q={q} />)}</div>;
    default:
      return null;
  }
}

/** Flowing document section — open by default (no accordion), premium header. */
function Section({ b, onView }: { b: LessonBlock; onView: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const tone = toneOf(b.kind);
  const Icon = ICON[b.kind] || Info;
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { onView(); io.disconnect(); } }, { rootMargin: "-25% 0px -25% 0px" });
    io.observe(el); return () => io.disconnect();
  }, [onView]);
  return (
    <section ref={ref} id={`b-${b.kind}`} className="scroll-mt-24">
      <header className="mb-3 flex items-center gap-2.5">
        <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-lg [&_svg]:size-[18px]" style={{ background: `${tone}14`, color: tone }}><Icon /></span>
        <h2 className="flex-1 text-[15.5px] font-extrabold tracking-tight text-ink-1" dir="auto">{b.title || HE[b.kind] || b.kind}</h2>
        <SourceChip b={b} />
      </header>
      <div className="ps-[42px]"><BlockBody b={b} /></div>
    </section>
  );
}

export function LessonView({ lesson }: { lesson: Lesson }) {
  const reduce = useReducedMotion();
  const accent = accentOf(lesson.module);
  const blocks = useMemo(() => orderedBlocks(lesson), [lesson]);
  const kinds = useMemo(() => blocks.map((b) => b.kind), [blocks]);
  const { doneSet, pct, markDone } = useLessonProgress(lesson.slug, kinds);
  const [active, setActive] = useState<BlockKind | null>(null);

  useEffect(() => { recordRecent({ id: `lesson:${lesson.slug}`, title: lesson.title, module: lesson.module, href: `/academy/lesson/${lesson.slug}/`, kind: "lesson" }); }, [lesson]);

  // "On this page" scroll-spy — track the section nearest the top (Stripe/Cursor docs feel)
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, z) => a.boundingClientRect.top - z.boundingClientRect.top);
      if (vis[0]) setActive(vis[0].target.id.replace("b-", "") as BlockKind);
    }, { rootMargin: "-15% 0px -70% 0px" });
    blocks.forEach((b) => { const el = document.getElementById(`b-${b.kind}`); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [blocks]);

  return (
    <div dir="rtl">
      <nav aria-label="נתיב" className="flex flex-wrap items-center gap-1.5 text-[11.5px] font-semibold text-ink-3">
        <Link href="/academy/" className="text-brand hover:underline">SAP Academy</Link><span>›</span>
        <span>{lesson.module}</span><span>›</span><span>{lesson.course}</span><span>›</span><span>שיעור {lesson.index}</span>
      </nav>

      {/* mobile sticky progress */}
      <div className="sticky top-14 z-20 -mx-3 mt-2 flex items-center gap-3 border-b border-hairline bg-surface/90 px-3 py-2 backdrop-blur-md lg:hidden">
        <div className="min-w-0 flex-1"><div className="truncate text-[12px] font-extrabold text-ink-1">{lesson.title}</div><div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-2"><div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: accent }} /></div></div>
        <span className="shrink-0 font-mono text-[13px] font-extrabold" style={{ color: accent }}>{pct}%</span>
      </div>

      <div className="mt-4 grid items-start gap-8 lg:grid-cols-[1fr_248px]">
        <article className="min-w-0">
          {/* hero */}
          <header className="relative overflow-hidden rounded-3xl border border-hairline bg-surface p-6 sm:p-7">
            <span className="absolute inset-x-0 top-0 h-1" style={{ background: accent }} />
            <span aria-hidden className="pointer-events-none absolute -start-16 -top-16 size-48 rounded-full blur-3xl" style={{ background: `color-mix(in srgb, ${accent} 14%, transparent)` }} />
            <div className="relative flex flex-wrap items-center gap-1.5">
              <Pill className="font-extrabold" style={{ background: `color-mix(in srgb, ${accent} 12%, transparent)`, color: accent, borderColor: `color-mix(in srgb, ${accent} 25%, transparent)` }}>{lesson.module}</Pill>
              <Pill tone={LVL_TONE[lesson.level] || "neutral"}>{lesson.level}</Pill>
              <Pill><Clock className="size-3" /> ~{lesson.minutes} דק׳</Pill>
              <Pill tone={TRUST_TONE[lesson.trust].tone} title={[lesson.source, lesson.lastReviewed && `נבדק ${lesson.lastReviewed}`].filter(Boolean).join(" · ")}><ShieldCheck className="size-3" />{TRUST_TONE[lesson.trust].he}</Pill>
            </div>
            <h1 className="relative mt-3 text-[27px] font-extrabold leading-[1.12] tracking-[-0.02em] text-ink-1 sm:text-[30px]" dir="auto">{lesson.title}</h1>
            {lesson.titleEn && <p className="relative mt-1 text-sm text-ink-3" dir="ltr">{lesson.titleEn}</p>}
            <p className="relative mt-2 text-[12.5px] font-semibold text-ink-3">{lesson.course} · שיעור {lesson.index}</p>
          </header>

          {/* flowing document */}
          <div className="mt-7 flex flex-col gap-8">
            {blocks.map((b) => <Section key={b.kind} b={b} onView={() => { markDone(b.kind); recordActivity(); }} />)}
          </div>

          {/* completion */}
          <AnimatePresence>
            {pct === 100 && (
              <motion.div initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-[#cfe6e2] bg-gradient-to-bl from-[#f0f6f5] to-surface p-4">
                <span aria-hidden className="grid size-11 place-items-center rounded-2xl bg-[#0f766e]/12 text-[#0f766e]"><PartyPopper className="size-6" /></span>
                <div className="min-w-0 flex-1"><div className="text-[15px] font-extrabold text-ink-1">כל הכבוד! השלמת את השיעור</div><div className="text-[12px] text-ink-3">קראת את כל {kinds.length} החלקים.</div></div>
                {lesson.next ? <Link href={`/academy/lesson/${lesson.next}/`} className="tap inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-[12.5px] font-extrabold text-white transition hover:bg-brand-dark">השיעור הבא <ArrowLeft className="size-4" /></Link> : <Link href={`/academy/path/${lesson.module.toLowerCase()}/`} className="tap rounded-xl bg-ink-1 px-4 py-2 text-[12.5px] font-extrabold text-white">חזרה למסלול</Link>}
              </motion.div>
            )}
          </AnimatePresence>
        </article>

        {/* right rail — progress + "on this page" */}
        <aside className="hidden lg:sticky lg:top-4 lg:block">
          <div className="mb-3 rounded-2xl border border-hairline bg-surface p-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-extrabold tabular-nums" style={{ color: accent }}>{pct}%</div>
              <div><div className="text-[11px] font-semibold text-ink-2">התקדמות שיעור</div><div className="text-[11px] text-ink-3">{doneSet.size} מתוך {kinds.length} חלקים</div></div>
            </div>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-surface-2"><div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: accent }} /></div>
          </div>
          <nav aria-label="בעמוד זה" className="mb-3 rounded-2xl border border-hairline bg-surface p-2.5">
            <div className="mb-1.5 px-1.5 text-[10px] font-extrabold uppercase tracking-wide text-ink-3">בעמוד זה</div>
            <div className="flex flex-col">
              {blocks.map((b) => {
                const done = doneSet.has(b.kind); const isActive = active === b.kind; const tone = toneOf(b.kind); const Icon = ICON[b.kind] || Info;
                return (
                  <a key={b.kind} href={`#b-${b.kind}`} aria-current={isActive ? "location" : undefined}
                    className={`group flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11.5px] font-semibold transition-colors ${isActive ? "bg-surface-2 text-ink-1" : "text-ink-2 hover:bg-surface-2/60"}`}>
                    <span className="relative flex size-4 shrink-0 items-center justify-center">
                      {done ? <Check className="size-3.5 text-emerald-500" /> : <Icon className="size-3.5" style={{ color: isActive ? tone : undefined }} />}
                    </span>
                    <span className="truncate" dir="auto">{b.title || HE[b.kind] || b.kind}</span>
                  </a>
                );
              })}
            </div>
          </nav>
          <div className="flex gap-2">
            {lesson.prev && <Link href={`/academy/lesson/${lesson.prev}/`} className="tap flex flex-1 items-center justify-center gap-1 rounded-xl border border-hairline py-2 text-[11.5px] font-bold text-ink-2 hover:border-brand/40"><ArrowRight className="size-3.5" /> הקודם</Link>}
            {lesson.next && <Link href={`/academy/lesson/${lesson.next}/`} className="tap flex flex-1 items-center justify-center gap-1 rounded-xl py-2 text-[11.5px] font-bold text-white hover:opacity-90" style={{ background: accent }}>הבא <ArrowLeft className="size-3.5" /></Link>}
          </div>
        </aside>
      </div>
    </div>
  );
}
