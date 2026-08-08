"use client";

import { useSyncExternalStore } from "react";
import { Check, ChevronLeft, Circle, GraduationCap, Sparkles, Target, Minimize2, Maximize2, Briefcase } from "lucide-react";

// ── Reusable "interactive course" primitives ───────────────────────────────
// StartHere · LearningLadder (Beginner→Expert + progress) · TopicTabs ·
// TopicIntro · CompletionChecklist · ManagerExpects · FocusToggle.
// Progress persists in localStorage (per course key), SSR-safe.

// ---------- progress store ----------
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
function subscribe(cb: () => void) { listeners.add(cb); window.addEventListener("storage", cb); return () => { listeners.delete(cb); window.removeEventListener("storage", cb); }; }
const cache: Record<string, { raw: string; val: string[] }> = {};
const EMPTY: string[] = [];
function snap(key: string): string[] {
  let raw = "[]"; try { raw = localStorage.getItem(key) || "[]"; } catch { return EMPTY; }
  const c = cache[key]; if (c && c.raw === raw) return c.val;
  let val: string[] = EMPTY; try { const p = JSON.parse(raw); if (Array.isArray(p)) val = p; } catch { /* noop */ }
  cache[key] = { raw, val }; return val;
}
function writeKey(key: string, v: string[]) { try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* noop */ } cache[key] = { raw: JSON.stringify(v), val: v }; emit(); }

export function useCourseProgress(course: string) {
  const key = `neo:course:${course}`;
  const done = useSyncExternalStore(subscribe, () => snap(key), () => EMPTY);
  const isDone = (id: string) => done.includes(id);
  const toggle = (id: string) => { const cur = snap(key); writeKey(key, cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]); };
  return { done, isDone, toggle };
}

// ---------- Start Here ----------
export interface StartCard { id: string; he: string; sub: string; icon: React.ReactNode; color: string }
export function StartHere({ items, onPick }: { items: StartCard[]; onPick: (id: string) => void }) {
  return (
    <section className="rounded-3xl border border-hairline bg-gradient-to-bl from-slate-50 to-white p-5 shadow-sm sm:p-6" dir="rtl">
      <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-3"><Target className="size-4 text-brand" />התחל כאן · Start Here</div>
      <div className="grid-adaptive">
        {items.map((c) => (
          <button key={c.id} onClick={() => onPick(c.id)} className="group flex items-start gap-3 rounded-2xl border-2 border-hairline bg-surface p-4 text-right transition hover:-translate-y-0.5 hover:shadow-lg" style={{ borderColor: c.color + "33" }}>
            <span className="grid size-11 shrink-0 place-items-center rounded-xl text-white shadow-sm transition-transform group-hover:scale-105" style={{ background: `linear-gradient(135deg,${c.color},${c.color}cc)` }}>{c.icon}</span>
            <span className="min-w-0"><span className="block text-[14px] font-extrabold text-ink-1 group-hover:text-brand">{c.he}</span><span className="block text-[12px] leading-snug text-ink-3">{c.sub}</span></span>
          </button>
        ))}
      </div>
    </section>
  );
}

// ---------- Learning Ladder ----------
export interface LadderLevel { id: string; label: string; color: string; topics: { id: string; he: string }[] }
export function LearningLadder({ levels, doneIds, onPick }: { levels: LadderLevel[]; doneIds: string[]; onPick: (id: string) => void }) {
  const total = levels.reduce((n, l) => n + l.topics.length, 0);
  const done = levels.reduce((n, l) => n + l.topics.filter((t) => doneIds.includes(t.id)).length, 0);
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <section className="rounded-3xl border border-hairline bg-surface p-5 shadow-sm sm:p-6" dir="rtl">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-3"><GraduationCap className="size-4 text-brand" />מסלול למידה · Beginner → Expert</div>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-extrabold text-emerald-600">{done}/{total} · {pct}%</span>
      </div>
      <div className="mb-4 h-2 overflow-hidden rounded-full bg-surface-2"><div className="h-full rounded-full bg-gradient-to-l from-emerald-400 to-emerald-500 transition-all" style={{ width: `${pct}%` }} /></div>
      <div className="grid gap-3 lg:grid-cols-4">
        {levels.map((lv, i) => { const ld = lv.topics.filter((t) => doneIds.includes(t.id)).length; return (
          <div key={lv.id} className="rounded-2xl border-2 p-3" style={{ borderColor: lv.color + "44" }}>
            <div className="mb-1.5 flex items-center justify-between"><span className="text-[13px] font-extrabold" style={{ color: lv.color }}>{i + 1}. {lv.label}</span><span className="text-[10px] font-bold text-ink-3">{ld}/{lv.topics.length}</span></div>
            <ul className="space-y-1">{lv.topics.map((t) => { const d = doneIds.includes(t.id); return (
              <li key={t.id}><button onClick={() => onPick(t.id)} className="flex w-full items-center gap-1.5 rounded-lg px-1.5 py-1 text-right text-[12px] font-bold text-ink-2 transition hover:bg-surface-2">
                {d ? <Check className="size-3.5 shrink-0 text-emerald-500" /> : <Circle className="size-3.5 shrink-0 text-ink-3" />}<span className="min-w-0 flex-1 truncate">{t.he}</span></button></li>
            ); })}</ul>
          </div>
        ); })}
      </div>
    </section>
  );
}

// ---------- Topic Tabs ----------
export interface TopicTab { id: string; label: string; icon: React.ReactNode }
export function TopicTabs({ tabs, active, onChange }: { tabs: TopicTab[]; active: string; onChange: (id: string) => void }) {
  return (
    <div className="flex snap-x gap-1 overflow-x-auto rounded-2xl border border-hairline bg-surface/90 p-1 shadow-sm backdrop-blur [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" dir="rtl">
      {tabs.map((t) => (
        <button key={t.id} onClick={() => onChange(t.id)} className={`flex min-h-[40px] shrink-0 snap-start items-center gap-1.5 rounded-xl px-3 py-1.5 text-[13px] font-bold transition active:scale-95 ${active === t.id ? "bg-brand text-brand-foreground shadow-sm" : "text-ink-3 hover:bg-surface-2"}`}>{t.icon}{t.label}</button>
      ))}
    </div>
  );
}

// ---------- Topic Intro ----------
export interface IntroField { label: string; text: string; color: string }
export function TopicIntro({ fields }: { fields: IntroField[] }) {
  return (
    <div className="grid gap-2.5 sm:grid-cols-2" dir="rtl">
      {fields.map((f) => f.text ? (
        <div key={f.label} className="rounded-xl border border-hairline p-3" style={{ background: f.color + "08" }}>
          <div className="mb-1 text-[11px] font-bold uppercase tracking-wide" style={{ color: f.color }}>{f.label}</div>
          <p className="text-[13px] leading-relaxed text-ink-2">{f.text}</p>
        </div>
      ) : null)}
    </div>
  );
}

// ---------- Completion Checklist ----------
export function CompletionChecklist({ course, topicId, items }: { course: string; topicId: string; items: string[] }) {
  const { isDone, toggle } = useCourseProgress(course);
  const allDone = isDone(topicId);
  return (
    <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/40 p-4" dir="rtl">
      <div className="mb-2 flex items-center gap-1.5 text-[12px] font-extrabold text-emerald-700"><Sparkles className="size-4" />אחרי שתסיים את הנושא הזה תדע…</div>
      <ul className="space-y-1.5">{items.map((x, i) => <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-ink-2"><Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />{x}</li>)}</ul>
      <button onClick={() => toggle(topicId)} className={`mt-3 inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-[12px] font-extrabold transition active:scale-95 ${allDone ? "bg-emerald-500 text-white" : "bg-surface text-emerald-700 ring-1 ring-emerald-300 hover:bg-emerald-50"}`}>
        {allDone ? <><Check className="size-4" />הושלם — סומן במסלול</> : <><Circle className="size-4" />סמן כהושלם</>}
      </button>
    </div>
  );
}

// ---------- Manager Expects + Interview ----------
export function ManagerExpects({ text, interview }: { text: string; interview?: string[] }) {
  return (
    <div className="space-y-3" dir="rtl">
      <div className="rounded-2xl border border-hairline bg-slate-900 p-4 text-white">
        <div className="mb-1.5 flex items-center gap-1.5 text-[12px] font-extrabold text-amber-300"><Briefcase className="size-4" />מה המנהל מצפה שתדע</div>
        <p className="text-[13px] leading-relaxed text-white/85">{text}</p>
      </div>
      {interview && interview.length > 0 && (
        <div className="rounded-2xl border border-hairline bg-surface p-4">
          <div className="mb-1.5 flex items-center gap-1.5 text-[12px] font-extrabold text-ink-2"><GraduationCap className="size-4" />שאלות ראיון טיפוסיות</div>
          <ul className="space-y-1.5">{interview.map((q, i) => <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-ink-2"><ChevronLeft className="mt-0.5 size-4 shrink-0 text-brand" />{q}</li>)}</ul>
        </div>
      )}
    </div>
  );
}

// ---------- Focus toggle ----------
export function FocusToggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[12px] font-bold transition active:scale-95 ${on ? "bg-brand text-brand-foreground" : "bg-surface text-ink-2 ring-1 ring-hairline hover:bg-surface-2"}`}>
      {on ? <><Maximize2 className="size-3.5" />צא ממצב מיקוד</> : <><Minimize2 className="size-3.5" />מצב מיקוד</>}
    </button>
  );
}
