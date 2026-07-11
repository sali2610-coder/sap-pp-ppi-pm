"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Wrench, Factory, ShieldCheck, Compass, ArrowLeft, GraduationCap, CheckCircle2, Workflow, Clock, Flame, Award, Trophy, Target, BookOpen, TrendingUp, Layers, ChevronLeft } from "lucide-react";
import { LEARN_CATEGORIES, LEARN_PATHS } from "@/data/learn/paths";
import { useDoneSet, useAllProgress, pathState, bumpStreak } from "@/lib/learn-store";
import { useCertState, masteryPct } from "@/lib/cert/store";

const ICON = { pm: Wrench, factory: Factory, qa: ShieldCheck, onboard: Compass } as const;
const hoursOf = (s?: string) => { const m = (s || "").match(/(\d+)/); return m ? +m[1] : 0; };

/** SVG progress ring */
function Ring({ pct, color, size = 52, sw = 5, children }: { pct: number; color: string; size?: number; sw?: number; children?: React.ReactNode }) {
  const r = (size - sw) / 2, c = 2 * Math.PI * r;
  return (
    <span className="relative grid shrink-0 place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={sw} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} style={{ transition: "stroke-dashoffset .6s cubic-bezier(.32,.72,0,1)" }} />
      </svg>
      <span className="absolute">{children}</span>
    </span>
  );
}

function PathRow({ id }: { id: string }) {
  const p = LEARN_PATHS[id];
  const done = useDoneSet(id);
  const st = pathState(done, p.steps.map((s) => s.id));
  return (
    <Link href={`/learn/${id}/`} className="group flex items-center gap-3 rounded-2xl border border-hairline bg-surface p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md active:scale-[.99]">
      <Ring pct={st.pct} color={p.accent} size={40} sw={4}>
        {st.complete ? <CheckCircle2 className="size-4" style={{ color: p.accent }} /> : <span className="text-[10px] font-extrabold tabular-nums" style={{ color: p.accent }}>{st.pct}</span>}
      </Ring>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2"><span className="block text-sm font-extrabold text-ink-1">{p.he}</span>
          {p.level && <span className="rounded-full bg-surface-2 px-1.5 py-0.5 text-[9px] font-bold text-ink-3">{p.level}</span>}</span>
        <span className="block truncate text-xs text-ink-3">{p.sub}</span>
        <span className="mt-1 flex items-center gap-3 text-[10px] font-bold text-ink-3">
          <span>{st.doneCount}/{st.total} יחידות</span>
          {p.durationHe && <span className="hidden items-center gap-0.5 sm:flex"><Clock className="size-3" />{p.durationHe}</span>}
        </span>
      </span>
      <ArrowLeft className="size-4 shrink-0 text-ink-3 transition group-hover:text-brand" />
    </Link>
  );
}

export function LearnHome() {
  const [open, setOpen] = useState<string | null>("onboarding");
  const prog = useAllProgress();
  const cert = useCertState();
  const [streak, setStreak] = useState(0);
  useEffect(() => { setStreak(bumpStreak()); }, []);

  const agg = useMemo(() => {
    const cats = LEARN_CATEGORIES.map((cat) => {
      let done = 0, total = 0, hours = 0; const levels: string[] = [];
      cat.tracks.forEach((id) => {
        const p = LEARN_PATHS[id]; if (!p) return;
        const ids = p.steps.map((s) => s.id); const dn = new Set(prog[id] || []);
        done += ids.filter((x) => dn.has(x)).length; total += ids.length; hours += hoursOf(p.durationHe);
        if (p.level) levels.push(p.level);
      });
      const pct = total ? Math.round((done / total) * 100) : 0;
      const lvl = levels.sort((a, b) => levels.filter((x) => x === b).length - levels.filter((x) => x === a).length)[0] || "מעורב";
      return { cat, done, total, pct, hours, lvl, tracks: cat.tracks.length };
    });
    const done = cats.reduce((n, c) => n + c.done, 0), total = cats.reduce((n, c) => n + c.total, 0);
    const overall = total ? Math.round((done / total) * 100) : 0;
    return { cats, done, total, overall };
  }, [prog]);

  const certs = Object.values(cert.mods).filter((m) => m.passed).length;
  const score = Math.max(0, ...Object.values(cert.mods).map((m) => m.best), ...Object.values(cert.mods).map((m) => masteryPct(m)));
  const tier = agg.overall >= 85 ? "ארכיטקט פתרון" : agg.overall >= 60 ? "יועץ בכיר" : agg.overall >= 30 ? "יועץ פונקציונלי" : "יועץ זוטר · PP / PM";

  const STAT = (icon: React.ReactNode, label: string, value: React.ReactNode, c: string) => (
    <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-surface/10 px-4 py-3 backdrop-blur-sm">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl" style={{ background: c }}>{icon}</span>
      <div className="min-w-0"><div className="text-[10px] font-bold uppercase tracking-wide text-white/60">{label}</div><div className="text-xl font-extrabold tabular-nums leading-tight">{value}</div></div>
    </div>
  );

  return (
    <div className="mx-auto space-y-7" dir="rtl">
      {/* hero dashboard */}
      <header className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-l from-brand-dark via-brand to-[#a8161c] p-6 text-white shadow-xl sm:p-8">
        <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-surface/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 size-56 rounded-full bg-black/10 blur-3xl" />
        <div className="relative">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/70"><GraduationCap className="size-4" />NEO Academy</div>
              <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">שלום 👋 ברוך הבא לאקדמיה</h1>
              <p className="mt-1 flex items-center gap-2 text-sm text-white/85"><Award className="size-4" />הרמה שלך: <span className="rounded-full bg-surface/15 px-2.5 py-0.5 font-extrabold ring-1 ring-white/25">{tier}</span></p>
            </div>
            <Ring pct={agg.overall} color="#fff" size={92} sw={7}>
              <span className="text-center"><span className="block text-2xl font-extrabold tabular-nums">{agg.overall}%</span><span className="block text-[9px] font-bold uppercase tracking-wide text-white/70">התקדמות</span></span>
            </Ring>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
            {STAT(<TrendingUp className="size-5" />, "התקדמות כוללת", `${agg.overall}%`, "#0ea5e9")}
            {STAT(<Flame className="size-5" />, "רצף למידה", `${streak || 1} ימים`, "#ea580c")}
            {STAT(<CheckCircle2 className="size-5" />, "יחידות שהושלמו", agg.done, "#16a34a")}
            {STAT(<Trophy className="size-5" />, "תעודות", certs, "#d97706")}
            {STAT(<Target className="size-5" />, "ציון הסמכה", score || "—", "#7c3aed")}
          </div>
        </div>
      </header>

      {/* premium path cards */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-extrabold text-ink-1"><Layers className="size-5 text-brand" />מסלולי למידה</h2>
          <span className="text-sm font-bold text-ink-3">{agg.cats.reduce((n, c) => n + c.tracks, 0)} מסלולים · {agg.total} יחידות</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {agg.cats.map(({ cat, pct, total, hours, lvl, tracks, done }) => {
            const Icon = ICON[cat.icon]; const active = open === cat.id;
            const onboard = cat.id === "onboarding";
            const inner = (<>
                <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: cat.accent }} />
                <span className="pointer-events-none absolute -left-10 -top-10 size-28 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20" style={{ background: cat.accent }} />
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl text-white shadow-sm" style={{ background: cat.accent }}><Icon className="size-7" /></span>
                  <Ring pct={pct} color={cat.accent} size={56} sw={5}>
                    <span className="text-sm font-extrabold tabular-nums" style={{ color: cat.accent }}>{pct}%</span>
                  </Ring>
                </div>
                <div className="mt-3 flex items-center gap-2 text-lg font-extrabold text-ink-1">{cat.he}{onboard && <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-bold text-brand">התחל כאן</span>}</div>
                <div className="text-[13px] leading-snug text-ink-3">{cat.sub}</div>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-bold text-ink-3">
                  <span className="flex items-center gap-1"><BookOpen className="size-3.5" />{tracks} מסלולים</span>
                  <span className="flex items-center gap-1"><Layers className="size-3.5" />{done}/{total} יחידות</span>
                  {hours > 0 && <span className="flex items-center gap-1"><Clock className="size-3.5" />~{hours} שעות</span>}
                  <span className="rounded-full px-2 py-0.5 text-white" style={{ background: cat.accent }}>{lvl}</span>
                </div>
                <span className="mt-3 flex items-center gap-1 text-[12px] font-bold text-ink-3 transition group-hover:text-brand">{onboard ? "פתח את מסע הקליטה" : active ? "הסתר מסלולים" : "הצג מסלולים"}<ChevronLeft className={`size-4 transition-transform ${active && !onboard ? "-rotate-90" : ""}`} /></span>
            </>);
            const cardCls = `group relative overflow-hidden rounded-3xl border bg-surface p-5 text-right shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${active && !onboard ? "border-transparent ring-2" : "border-hairline"}`;
            if (onboard) return <Link key={cat.id} href="/onboarding/" className={cardCls}>{inner}</Link>;
            return (
              <button key={cat.id} onClick={() => setOpen(active ? null : cat.id)}
                className={cardCls}
                style={active ? ({ ["--tw-ring-color"]: cat.accent } as React.CSSProperties) : undefined}>
                <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: cat.accent }} />
                <span className="pointer-events-none absolute -left-10 -top-10 size-28 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20" style={{ background: cat.accent }} />
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl text-white shadow-sm" style={{ background: cat.accent }}><Icon className="size-7" /></span>
                  <Ring pct={pct} color={cat.accent} size={56} sw={5}>
                    <span className="text-sm font-extrabold tabular-nums" style={{ color: cat.accent }}>{pct}%</span>
                  </Ring>
                </div>
                <div className="mt-3 text-lg font-extrabold text-ink-1">{cat.he}</div>
                <div className="text-[13px] leading-snug text-ink-3">{cat.sub}</div>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-bold text-ink-3">
                  <span className="flex items-center gap-1"><BookOpen className="size-3.5" />{tracks} מסלולים</span>
                  <span className="flex items-center gap-1"><Layers className="size-3.5" />{done}/{total} יחידות</span>
                  {hours > 0 && <span className="flex items-center gap-1"><Clock className="size-3.5" />~{hours} שעות</span>}
                  <span className="rounded-full px-2 py-0.5 text-white" style={{ background: cat.accent }}>{lvl}</span>
                </div>
                <span className="mt-3 flex items-center gap-1 text-[12px] font-bold text-ink-3 transition group-hover:text-brand">{active ? "הסתר מסלולים" : "הצג מסלולים"}<ChevronLeft className={`size-4 transition-transform ${active ? "-rotate-90" : ""}`} /></span>
              </button>
            );
          })}
        </div>

        {/* expanded tracks of selected category */}
        {open && (() => { const c = LEARN_CATEGORIES.find((x) => x.id === open); if (!c) return null; return (
          <div className="mt-4 rounded-3xl border border-hairline bg-surface-2/60 p-4" style={{ animation: "fadeUp .25s ease both" }}>
            <div className="mb-3 flex items-center gap-2 text-sm font-extrabold text-ink-2"><span className="size-2.5 rounded-full" style={{ background: c.accent }} />{c.he} · מסלולים</div>
            <div className="grid gap-2.5 lg:grid-cols-2 xl:grid-cols-3">{c.tracks.map((id) => <PathRow key={id} id={id} />)}</div>
          </div>
        ); })()}
      </section>

      {/* certification center */}
      <Link href="/certification/" className="group relative flex flex-wrap items-center gap-4 overflow-hidden rounded-3xl border border-hairline bg-gradient-to-l from-slate-900 to-slate-800 p-5 text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
        <span className="pointer-events-none absolute -left-10 -top-10 size-32 rounded-full bg-brand/30 blur-3xl" />
        <span className="relative grid size-12 shrink-0 place-items-center rounded-2xl bg-brand text-white shadow-sm"><Award className="size-6" /></span>
        <span className="relative min-w-0 flex-1">
          <span className="block font-extrabold">🎓 מרכז ההסמכה · NEO Certification</span>
          <span className="block text-sm text-white/75">מבחני ידע טכני אקראיים (PM · PP-PI · PP) · ציון מעבר 80 · תג יועץ מוסמך</span>
        </span>
        <span className="relative flex shrink-0 items-center gap-4 text-center">
          <span><span className="block text-xl font-extrabold tabular-nums">{certs}</span><span className="text-[10px] font-bold uppercase tracking-wide text-white/60">תעודות</span></span>
          <span><span className="block text-xl font-extrabold tabular-nums">{score || "—"}</span><span className="text-[10px] font-bold uppercase tracking-wide text-white/60">ציון</span></span>
          <ArrowLeft className="size-5 text-white/50 transition group-hover:text-white" />
        </span>
      </Link>

      {/* story mode */}
      <Link href="/story/" className="group flex items-center gap-4 rounded-3xl border border-hairline bg-surface p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm"><Workflow className="size-6" /></span>
        <span className="min-w-0 flex-1"><span className="block font-extrabold text-ink-1">סיור מודרך בתהליך · Story Mode</span><span className="block text-sm text-ink-3">תהליך אחזקה ופקודת תהליך — מקצה לקצה, בהקשר עסקי מלא</span></span>
        <ArrowLeft className="size-5 shrink-0 text-ink-3 transition group-hover:text-brand" />
      </Link>
    </div>
  );
}
