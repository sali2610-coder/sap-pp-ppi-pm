"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, GraduationCap, Lightbulb, HelpCircle, Clock4, Database, ArrowRightLeft, Boxes, Terminal, Network, BookOpen, CheckCircle2, GitBranch } from "lucide-react";
import { STORIES } from "@/data/story/pppi-process-order";
import { objectIntel } from "@/lib/data";
import { tableByName } from "@/lib/knowledge-graph";

const MOD_COLOR: Record<string, string> = { PM: "#f97316", "PP-PI": "#6d28d9", PP: "#6d28d9" };

export function StoryMode({ id }: { id: string }) {
  const story = STORIES[id];
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const total = story?.steps.length ?? 0;

  const go = useCallback((d: number) => setI((v) => Math.max(0, Math.min(total - 1, v + d))), [total]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement; if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;
      if (e.key === "ArrowLeft") go(1);           // RTL: left = forward
      else if (e.key === "ArrowRight") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (!story) return <p className="p-8 text-center text-ink-3">סיפור לא נמצא.</p>;
  const s = story.steps[i];
  const accent = story.accent;
  const last = i === total - 1;

  // DERIVED from the live dataset (not invented)
  const intel = s.object ? objectIntel(s.object) : null;
  const tbl = s.object ? tableByName(s.object) : null;
  const parents = tbl ? [...new Set(tbl.relations.filter((r) => r.role === "child").map((r) => r.table))].slice(0, 4) : [];
  const children = tbl ? [...new Set(tbl.relations.filter((r) => r.role === "parent").map((r) => r.table))].slice(0, 4) : [];
  const tcodes = intel?.tcodes?.slice(0, 6) || [];
  const related = intel?.related?.slice(0, 6) || [];

  const QA = ({ icon, label, text, tone }: { icon: React.ReactNode; label: string; text: string; tone?: string }) => (
    <div className={`flex gap-2.5 rounded-xl p-3 ${tone || "bg-surface-2"}`}>
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div><div className="text-[11px] font-extrabold uppercase tracking-wide text-ink-3">{label}</div><p className="text-sm leading-relaxed text-ink-2">{text}</p></div>
    </div>
  );

  return (
    <div className="mx-auto max-w-4xl space-y-4" dir="rtl">
      {/* top bar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Link href={story.learnPath} className="inline-flex items-center gap-1.5 text-sm font-bold text-ink-3 transition hover:text-brand"><ArrowRight className="size-4" />חזרה למסלול הלמידה</Link>
        <span className="text-xs font-bold text-ink-3">שלב {i + 1} מתוך {total}</span>
      </div>

      {/* header */}
      <header className="relative overflow-hidden rounded-3xl border p-5 shadow-sm" style={{ borderColor: accent + "33", background: `linear-gradient(135deg, ${accent}0d, #fff)` }}>
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl text-white shadow-sm" style={{ background: accent }}><GraduationCap className="size-5" /></span>
          <div><h1 className="text-xl font-extrabold text-ink-1">{story.he}</h1><p className="text-xs text-ink-3">{story.sub}</p></div>
        </div>
        {/* phase rail — you are here */}
        <div className="mt-3 flex items-center gap-1 overflow-x-auto pb-1">
          {story.steps.map((st, idx) => (
            <button key={st.id} onClick={() => setI(idx)} title={st.title}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold transition ${idx === i ? "text-white shadow-sm" : idx < i ? "text-ink-3 bg-surface-2" : "text-ink-3 bg-surface-2"}`}
              style={idx === i ? { background: accent } : undefined}>
              <span className={`grid size-4 place-items-center rounded-full text-[9px] ${idx < i ? "bg-emerald-500 text-white" : idx === i ? "bg-surface/25" : "bg-hairline text-ink-3"}`}>{idx < i ? "✓" : st.n}</span>
              <span className="hidden sm:inline">{st.phaseHe}</span>
            </button>
          ))}
        </div>
      </header>

      {/* animated progress bar */}
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
        <motion.span className="block h-full rounded-full" style={{ background: accent }} animate={{ width: `${((i + 1) / total) * 100}%` }} transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 180, damping: 28 }} />
      </div>

      {/* step card — swipeable on touch (RTL: swipe left = next) */}
      <AnimatePresence mode="wait">
        <motion.section key={s.id} initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -8 }} transition={{ duration: 0.22 }}
          drag={reduce ? false : "x"} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.18} onDragEnd={(_e, info) => { if (info.offset.x < -80) go(1); else if (info.offset.x > 80) go(-1); }}
          className="touch-pan-y rounded-3xl border border-hairline bg-surface p-5 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full px-2.5 py-0.5 text-[10px] font-extrabold text-white" style={{ background: accent }}>{s.phaseHe}</span>
            <h2 className="text-lg font-extrabold text-ink-1">{s.title}</h2>
            {s.object && <Link href={`/object/${encodeURIComponent(s.object)}/`} className="tech rounded-md bg-surface-2 px-2 py-0.5 font-mono text-xs font-bold text-ink-2 transition hover:bg-hairline" dir="ltr">{s.object}</Link>}
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <QA icon={<HelpCircle className="size-4 text-blue-500" />} label="מה זה?" text={s.whatHe} />
            <QA icon={<Lightbulb className="size-4 text-amber-500" />} label="למה צריך?" text={s.whyHe} />
            <QA icon={<Clock4 className="size-4 text-ink-3" />} label="מתי משתמשים?" text={s.whenHe} />
            <QA icon={<Database className="size-4 text-emerald-600" />} label="מה נוצר במערכת?" text={s.createdHe} />
          </div>
          {s.s4He && <div className="mt-2"><QA icon={<ArrowRightLeft className="size-4 text-amber-600" />} label="מה משתנה ב-S/4HANA?" text={s.s4He} tone="bg-amber-50" /></div>}

          {/* relationship strip + derived interfaces */}
          {s.object && (parents.length || children.length || tcodes.length || related.length) ? (
            <div className="mt-3 space-y-3 rounded-2xl border border-hairline bg-surface-2/60 p-3">
              {(parents.length || children.length) ? (
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-ink-3"><Network className="size-3.5" />קשרים:</span>
                  {parents.map((p) => <Chip key={"p" + p} label={p} arrow="→" />)}
                  <span className="rounded-md px-2 py-0.5 font-mono text-xs font-extrabold text-white" style={{ background: accent }} dir="ltr">{s.object}</span>
                  {children.map((c) => <Chip key={"c" + c} label={c} arrow="←" />)}
                </div>
              ) : null}
              {tcodes.length ? <Row icon={<Terminal className="size-3.5" />} label="T-Codes" items={tcodes} /> : null}
              {related.length ? <Row icon={<Boxes className="size-3.5" />} label="אובייקטים קשורים" items={related} /> : null}
              <div className="flex flex-wrap gap-2 pt-0.5">
                <Link href={`/sap-infrastructure/?focus=${encodeURIComponent(s.object)}`} className="tap inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-white shadow-sm" style={{ background: accent }}><GitBranch className="size-3.5" />הדגש בגרף</Link>
                <Link href={`/object/${encodeURIComponent(s.object)}/`} className="tap inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-surface px-3 py-1.5 text-xs font-bold text-ink-2 transition hover:border-brand/40 hover:text-brand"><BookOpen className="size-3.5" />כרטיס אובייקט מלא</Link>
              </div>
            </div>
          ) : null}
        </motion.section>
      </AnimatePresence>

      {/* nav footer */}
      <div className="flex items-center justify-between gap-2">
        <button onClick={() => go(-1)} disabled={i === 0} className="tap inline-flex items-center gap-1.5 rounded-xl border border-hairline bg-surface px-4 py-2.5 text-sm font-bold text-ink-2 transition enabled:hover:border-brand/40 enabled:hover:text-brand disabled:opacity-40"><ArrowRight className="size-4" />הקודם</button>
        {last ? (
          <Link href={story.learnPath} className="tap inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700"><CheckCircle2 className="size-4" />סיימת את התהליך</Link>
        ) : (
          <button onClick={() => go(1)} className="tap inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-sm" style={{ background: accent }}>הבא<ArrowLeft className="size-4" /></button>
        )}
      </div>
    </div>
  );
}

function Chip({ label, arrow }: { label: string; arrow: string }) {
  return <span className="inline-flex items-center gap-0.5 rounded-md border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[11px] font-bold text-ink-3" dir="ltr"><span className="text-ink-3">{arrow}</span>{label}</span>;
}
function Row({ icon, label, items }: { icon: React.ReactNode; label: string; items: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-ink-3">{icon}{label}:</span>
      {items.map((x) => <span key={x} className="tech rounded-md border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[11px] font-bold text-ink-2" dir="ltr">{x}</span>)}
    </div>
  );
}
