"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Copy, Check, ChevronDown, ChevronRight, ChevronLeft, ShieldCheck, Info, ExternalLink } from "lucide-react";
import { BLOCK_META, orderedBlocks, type Lesson, type LessonBlock, type Trust, type BlockKind } from "@/lib/academy/lesson-types";

// per-section visual identity (§5): a colour per block category so core / illustrative /
// technical / practice / summary blocks are instantly distinguishable while staying restrained.
const TONE: Record<string, string> = {
  objective: "#0b0c0e", why: "#334155", "business-value": "#334155", "where-used": "#334155", "key-concepts": "#334155",
  "cbc-example": "#1d4ed8", flow: "#1d4ed8", diagram: "#1d4ed8",
  tables: "#475569", tcodes: "#475569", fiori: "#475569", objects: "#475569", odata: "#475569", authorizations: "#475569", spro: "#475569", notes: "#475569",
  "common-mistakes": "#b45309", troubleshooting: "#b45309",
  "best-practices": "#0f766e", tips: "#0f766e",
  related: "#6d28d9", quiz: "#6d28d9",
  summary: "#d62027",
};
const toneOf = (k: BlockKind) => TONE[k] || "#334155";
import { useLessonProgress } from "@/lib/academy/lesson-progress";
import { recordActivity } from "@/lib/academy/gamification";

const TRUST_TONE: Record<Trust, { cls: string; he: string }> = {
  "verified-docs": { cls: "bg-[#f0f6f5] text-[#0f766e] border-[#cfe6e2]", he: "מאומת" },
  "verified-system": { cls: "bg-emerald-50 text-emerald-700 border-emerald-200", he: "מאומת במערכת" },
  curated: { cls: "bg-surface-2 text-ink-2 border-hairline", he: "ידע אצור" },
  "needs-review": { cls: "bg-amber-50 text-amber-700 border-amber-200", he: "דורש בדיקה" },
};
const LVL_TONE: Record<string, string> = { "בסיסי": "bg-[#f0f7f0] text-[#15803d]", "בינוני": "bg-[#fffbeb] text-[#b45309]", "מורכב": "bg-brand-soft text-[#a3171c]" };

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
  const inner = <><span className="tech font-mono font-bold text-ink-1" dir="ltr">{r.code}</span>{r.label && <span className="text-ink-3"> · {r.label}</span>}{r.href && <ExternalLink className="size-3 text-ink-3" />}</>;
  const cls = "inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-surface-2 px-2.5 py-1.5 text-[12px]";
  return <span className="inline-flex items-center">{r.href ? <Link href={r.href} className={`${cls} hover:border-brand/40`}>{inner}</Link> : <span className={cls}>{inner}</span>}<CopyBtn value={r.code} /></span>;
}

function SourceChip({ b }: { b: LessonBlock }) {
  if (!b.trust) return null;
  const t = TRUST_TONE[b.trust];
  return <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9.5px] font-bold ${t.cls}`} title={[b.source, b.lastReviewed && `נבדק ${b.lastReviewed}`].filter(Boolean).join(" · ")}><ShieldCheck className="size-2.5" />{t.he}</span>;
}

function BlockBody({ b }: { b: LessonBlock }) {
  switch (b.kind) {
    case "objective":
      return <p className="text-[15px] font-medium leading-relaxed text-ink-1">{md(b.md)}</p>;
    case "why": case "business-value": case "where-used": case "cbc-example": case "spro": case "troubleshooting": case "notes":
      return <p className="text-[13.5px] leading-relaxed text-ink-2">{md(b.md)}</p>;
    case "summary":
      return <div className="rounded-xl border border-hairline bg-gradient-to-bl from-surface to-surface-2/50 p-3.5 text-[13.5px] leading-relaxed text-ink-2">{md(b.md)}</div>;
    case "key-concepts": case "authorizations":
      return <ul className="flex flex-col gap-2">{b.items.map((it, i) => <li key={i} className="flex items-start gap-2 text-[13.5px] text-ink-2"><span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-brand" />{md(it)}</li>)}</ul>;
    case "common-mistakes":
      return <div className="flex items-start gap-2.5 rounded-xl border border-[#f5e2bf] bg-[#fff8ec] p-3 text-[12.5px] text-[#92400e]"><span>⚠️</span><ul className="flex flex-col gap-1.5">{b.items.map((it, i) => <li key={i}>{md(it)}</li>)}</ul></div>;
    case "best-practices": case "tips":
      return <div className="flex items-start gap-2.5 rounded-xl border border-[#cfe6e2] bg-[#f0f6f5] p-3 text-[12.5px] text-[#0f5e57]"><span>{BLOCK_META[b.kind].emoji}</span><ul className="flex flex-col gap-1.5">{b.items.map((it, i) => <li key={i}>{md(it)}</li>)}</ul></div>;
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

function QuizCard({ q }: { q: { question: string; options: { text: string; correct?: boolean }[]; explain?: string } }) {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <div className="rounded-xl border border-hairline p-3.5">
      <p className="text-[13.5px] font-bold text-ink-1">{q.question}</p>
      <div className="mt-2.5 flex flex-col gap-1.5">
        {q.options.map((o, i) => {
          const show = picked !== null;
          const cls = show ? (o.correct ? "border-emerald-300 bg-[#f0f7f0] text-[#15803d] font-bold" : i === picked ? "border-brand/40 bg-brand-soft text-brand" : "border-hairline text-ink-3") : "border-hairline text-ink-2 hover:border-brand/30";
          return <button key={i} onClick={() => setPicked(i)} className={`rounded-lg border px-3 py-2 text-start text-[12.5px] transition ${cls}`}>{o.text}{show && o.correct && " ✓"}</button>;
        })}
      </div>
      {picked !== null && q.explain && <p className="mt-2 text-[11.5px] text-ink-3">{q.explain}</p>}
    </div>
  );
}

function Block({ b, onView, index }: { b: LessonBlock; onView: () => void; index: number }) {
  const [open, setOpen] = useState(true);
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const meta = BLOCK_META[b.kind];
  const tone = toneOf(b.kind);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { onView(); io.disconnect(); } }, { rootMargin: "-30% 0px -30% 0px" });
    io.observe(el); return () => io.disconnect();
  }, [onView]);
  return (
    <motion.section ref={ref} id={`b-${b.kind}`}
      initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1], delay: Math.min(index * 0.03, 0.3) }}
      className="relative mb-3.5 scroll-mt-4 overflow-hidden rounded-2xl border border-hairline bg-surface">
      <span className="absolute inset-y-0 start-0 w-1" style={{ background: tone }} aria-hidden />
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center gap-3 p-3.5 ps-4 text-start" aria-expanded={open}>
        <span className="grid size-9 shrink-0 place-items-center rounded-xl text-[18px]" style={{ background: `${tone}14`, color: tone }}>{meta.emoji}</span>
        <span className="flex-1 text-[15px] font-extrabold text-ink-1">{b.title || meta.he}</span>
        {meta.technical && <SourceChip b={b} />}
        {open ? <ChevronDown className="size-4 text-ink-3" /> : <ChevronRight className="size-4 text-ink-3" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="body" initial={reduce ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }} className="overflow-hidden">
            <div className="px-4 pb-4 ps-4">{b.kind === "objective" ? <div className="rounded-xl bg-surface-2/50 p-3.5"><BlockBody b={b} /></div> : <BlockBody b={b} />}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

export function LessonView({ lesson }: { lesson: Lesson }) {
  const reduce = useReducedMotion();
  const blocks = useMemo(() => orderedBlocks(lesson), [lesson]);
  const kinds = useMemo(() => blocks.map((b) => b.kind), [blocks]);
  const { doneSet, pct, markDone } = useLessonProgress(lesson.slug, kinds);

  return (
    <div dir="rtl">
      <nav className="flex flex-wrap items-center gap-1.5 text-[11.5px] font-semibold text-ink-3">
        <Link href="/academy/" className="text-brand hover:underline">SAP Academy</Link><span>›</span>
        <span>{lesson.module}</span><span>›</span><span>{lesson.course}</span><span>›</span><span>שיעור {lesson.index}</span>
      </nav>

      {/* mobile sticky progress (§13) */}
      <div className="sticky top-14 z-20 -mx-3 mt-2 flex items-center gap-3 border-b border-hairline bg-surface/90 px-3 py-2 backdrop-blur-md lg:hidden">
        <div className="min-w-0 flex-1"><div className="truncate text-[12px] font-extrabold text-ink-1">{lesson.title}</div><div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-2"><div className="h-full rounded-full bg-[#f97316] transition-all duration-500" style={{ width: `${pct}%` }} /></div></div>
        <span className="shrink-0 font-mono text-[13px] font-extrabold text-[#f97316]">{pct}%</span>
      </div>

      <div className="mt-4 grid items-start gap-7 lg:grid-cols-[1fr_240px]">
        <div>
          <header className="relative overflow-hidden rounded-3xl border border-hairline bg-gradient-to-bl from-surface to-[#fff7ed] p-5 sm:p-6">
            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-[#f97316] to-[#c2410c]" />
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-[#fff7ed] px-2 py-1 text-[10.5px] font-extrabold text-[#f97316]">{lesson.module}</span>
              <span className={`rounded-full px-2.5 py-1 text-[10.5px] font-bold ${LVL_TONE[lesson.level]}`}>{lesson.level}</span>
              <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[10.5px] font-bold text-ink-2">⏱ ~{lesson.minutes} דק׳</span>
              <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10.5px] font-bold ${TRUST_TONE[lesson.trust].cls}`} title={[lesson.source, lesson.lastReviewed && `נבדק ${lesson.lastReviewed}`].filter(Boolean).join(" · ")}><ShieldCheck className="size-3" />{TRUST_TONE[lesson.trust].he}</span>
            </div>
            <h1 className="mt-2.5 text-[26px] font-extrabold leading-tight tracking-[-0.02em] text-ink-1">{lesson.title}</h1>
            {lesson.titleEn && <p className="mt-0.5 text-sm text-ink-3" dir="ltr">{lesson.titleEn}</p>}
            <p className="mt-1.5 text-[12.5px] font-semibold text-ink-3">{lesson.course} · שיעור {lesson.index}</p>
          </header>

          <div className="mt-5">{blocks.map((b, i) => <Block key={b.kind} b={b} index={i} onView={() => { markDone(b.kind); recordActivity(); }} />)}</div>

          {/* completion celebration (§14 delight) */}
          <AnimatePresence>
            {pct === 100 && (
              <motion.div initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-[#cfe6e2] bg-gradient-to-bl from-[#f0f6f5] to-surface p-4">
                <span className="text-3xl">🎉</span>
                <div className="min-w-0 flex-1"><div className="text-[15px] font-extrabold text-ink-1">כל הכבוד! השלמת את השיעור</div><div className="text-[12px] text-ink-3">סימנת את כל {kinds.length} הבלוקים.</div></div>
                {lesson.next ? <Link href={`/academy/lesson/${lesson.next}/`} className="rounded-xl bg-brand px-4 py-2 text-[12.5px] font-extrabold text-white transition hover:bg-brand-dark">השיעור הבא →</Link> : <Link href="/academy/path/pm/" className="rounded-xl bg-ink-1 px-4 py-2 text-[12.5px] font-extrabold text-white">חזרה למסלול</Link>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* right rail */}
        <aside className="lg:sticky lg:top-4">
          <div className="mb-3 rounded-2xl border border-hairline bg-surface p-3.5">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-extrabold text-[#f97316]">{pct}%</div>
              <div><div className="text-[11px] text-ink-3">התקדמות שיעור</div><div className="text-[11px] text-ink-3">{doneSet.size} מתוך {kinds.length} בלוקים</div></div>
            </div>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-surface-2"><div className="h-full rounded-full bg-[#f97316] transition-all duration-500" style={{ width: `${pct}%` }} /></div>
          </div>
          <div className="mb-3 hidden rounded-2xl border border-hairline bg-surface p-3.5 lg:block">
            <div className="mb-1.5 text-[10px] font-extrabold uppercase tracking-wide text-ink-3">בלוקים בשיעור</div>
            <nav className="flex flex-col gap-0.5">
              {blocks.map((b) => { const done = doneSet.has(b.kind); return (
                <a key={b.kind} href={`#b-${b.kind}`} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11.5px] font-semibold text-ink-2 hover:bg-surface-2">
                  <span className={`size-1.5 rounded-full ${done ? "bg-emerald-500" : "bg-hairline"}`} />{BLOCK_META[b.kind].emoji} {b.title || BLOCK_META[b.kind].he}
                </a>
              ); })}
            </nav>
          </div>
          <div className="flex gap-2">
            {lesson.prev && <Link href={`/academy/lesson/${lesson.prev}/`} className="flex-1 rounded-xl border border-hairline py-2 text-center text-[11.5px] font-bold text-ink-2 hover:border-brand/40">← הקודם</Link>}
            {lesson.next && <Link href={`/academy/lesson/${lesson.next}/`} className="flex-1 rounded-xl bg-brand py-2 text-center text-[11.5px] font-bold text-white hover:bg-brand-dark">הבא →</Link>}
          </div>
        </aside>
      </div>
    </div>
  );
}
