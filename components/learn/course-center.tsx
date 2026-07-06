"use client";

import { useState } from "react";
import Link from "next/link";
import { Lightbulb, Layers, FlaskConical, Terminal, Bug, GraduationCap, ShieldCheck, Network, FileText, ArrowLeft } from "lucide-react";
import { StartHere, LearningLadder, TopicTabs, TopicIntro, CompletionChecklist, ManagerExpects, FocusToggle, useCourseProgress, type StartCard, type LadderLevel, type TopicTab, type IntroField } from "@/components/learn/course-kit";

// ── Normalized course model — every center adapts its native data into this,
// so all centers share ONE consistent interactive-course experience. Depth is
// preserved: each topic carries its full facet set across the 8 tabs.
export interface CourseVisualLayer { he: string; en?: string; items: string[]; hot: boolean }
export interface CourseTopic {
  id: string; he: string; en: string; color: string;
  intro: IntroField[];
  checklist: string[];
  managerExpects: string;
  interview: string[];
  visual?: { layers?: CourseVisualLayer[]; flow?: string[]; note?: string };
  examples?: { scenario?: string; bullets?: string[] };
  transactions?: { tcodes?: string[]; tables?: string[]; tools?: string[] };
  debug?: { issues?: string[]; steps?: string[]; oss?: string[] };
  scenario?: { text?: string; incidents?: { slug: string; label: string }[] };
  related?: { label: string; href: string }[];
}
export interface CourseConfig {
  courseKey: string;
  he: string; sub: string; eyebrow: string; accent: string;
  startCards: StartCard[];
  ladder: LadderLevel[];
  topics: CourseTopic[];
  defaultTopic: string;
  crossLinks: { label: string; href: string }[];
}

const TABS: TopicTab[] = [
  { id: "overview", label: "סקירה", icon: <Lightbulb className="size-3.5" /> },
  { id: "visual", label: "ויזואלי", icon: <Layers className="size-3.5" /> },
  { id: "examples", label: "דוגמאות", icon: <FlaskConical className="size-3.5" /> },
  { id: "transactions", label: "טרנזקציות", icon: <Terminal className="size-3.5" /> },
  { id: "debug", label: "Debug", icon: <Bug className="size-3.5" /> },
  { id: "interview", label: "ראיון", icon: <GraduationCap className="size-3.5" /> },
  { id: "scenario", label: "הארגון", icon: <ShieldCheck className="size-3.5" /> },
  { id: "related", label: "קשור", icon: <Network className="size-3.5" /> },
];

function Chips({ items, color, hrefBase }: { items: string[]; color: string; hrefBase?: string }) {
  return <div className="flex flex-wrap gap-1.5">{items.map((x) => hrefBase
    ? <Link key={x} href={`${hrefBase}${encodeURIComponent(x)}/`} className="tech rounded-lg px-2 py-0.5 text-[11px] font-bold transition hover:brightness-110" style={{ background: color + "14", color }} dir="ltr">{x}</Link>
    : <span key={x} className="tech rounded-lg border px-2 py-0.5 text-[11px] font-bold" style={{ borderColor: color + "55", background: color + "12", color }} dir="ltr">{x}</span>)}</div>;
}
function ListUl({ items, color }: { items: string[]; color: string }) {
  return <ul className="space-y-1">{items.map((x, i) => <li key={i} className="flex gap-1.5 text-[13px] leading-relaxed text-slate-700"><span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ background: color }} />{x}</li>)}</ul>;
}
const Empty = () => <p className="text-[12px] text-slate-300">— אין תוכן לנושא זה בלשונית זו</p>;

export function CourseCenter({ config }: { config: CourseConfig }) {
  const [focus, setFocus] = useState(false);
  const [sel, setSel] = useState(config.defaultTopic);
  const [tab, setTab] = useState("overview");
  const { done } = useCourseProgress(config.courseKey);
  const a = config.topics.find((t) => t.id === sel) || config.topics[0];
  const c = a.color;
  const pick = (id: string) => { setSel(id); setTab("overview"); if (typeof document !== "undefined") document.getElementById("topic-workspace")?.scrollIntoView({ behavior: "smooth", block: "start" }); };

  const workspace = (
    <div id="topic-workspace" className="scroll-mt-4 space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {config.topics.map((x) => { const on = x.id === sel; const d = done.includes(x.id); return (
          <button key={x.id} onClick={() => pick(x.id)} className={`flex items-center gap-1 rounded-xl border-2 px-2.5 py-1 text-[12px] font-bold transition ${on ? "text-white" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`} style={on ? { background: x.color, borderColor: x.color } : undefined}>{d && <span className="size-1.5 rounded-full bg-emerald-400" />}{x.he}</button>
        ); })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <div className="flex items-center justify-between px-5 py-3 text-white" style={{ background: `linear-gradient(135deg,${c},${c}cc)` }}>
          <div className="text-lg font-extrabold">{a.he} · <span className="font-mono text-sm opacity-80">{a.en}</span></div>
          {focus && <FocusToggle on={focus} onToggle={() => setFocus(false)} />}
        </div>
        <div className="p-4">
          <TopicTabs tabs={TABS} active={tab} onChange={setTab} />
          <div key={a.id + tab} className="mt-4" style={{ animation: "fadeUp .2s ease both" }}>
            {tab === "overview" && <div className="space-y-3"><TopicIntro fields={a.intro} /><CompletionChecklist course={config.courseKey} topicId={a.id} items={a.checklist} /></div>}

            {tab === "visual" && <div className="space-y-3">
              {a.visual?.layers?.length ? <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">{a.visual.layers.map((l, i) => (
                <div key={i} className="rounded-xl border-2 p-3 transition" style={{ borderColor: l.hot ? c : "#e2e8f0", background: l.hot ? c + "0d" : "#fff", opacity: l.hot ? 1 : 0.55 }}>
                  <div className="text-[12px] font-extrabold" style={{ color: l.hot ? c : "#64748b" }}>{l.he}{l.en && <span className="font-mono text-[9px] opacity-70"> {l.en}</span>}</div>
                  <ul className="mt-1 space-y-0.5">{l.items.map((it, j) => <li key={j} className="text-[11px] text-slate-500">• {it}</li>)}</ul>
                </div>
              ))}</div> : null}
              {a.visual?.flow?.length ? <div className="flex flex-wrap items-center gap-1.5">{a.visual.flow.map((s, i, arr) => <span key={i} className="flex items-center gap-1.5"><span className="rounded-lg px-2.5 py-1.5 text-[11.5px] font-bold text-white shadow-sm" style={{ background: `linear-gradient(135deg,${c},${c}cc)` }}>{s}</span>{i < arr.length - 1 && <ArrowLeft className="size-4 shrink-0" style={{ color: c }} />}</span>)}</div> : null}
              {a.visual?.note && <p className="text-[12px] text-slate-500">{a.visual.note}</p>}
              {!a.visual?.layers?.length && !a.visual?.flow?.length && !a.visual?.note && <Empty />}
            </div>}

            {tab === "examples" && <div className="space-y-2">
              {a.examples?.scenario && <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3"><div className="mb-1 text-[11px] font-bold uppercase text-slate-400">תרחיש טיפוסי</div><p className="text-[13px] leading-relaxed text-slate-700">{a.examples.scenario}</p></div>}
              {a.examples?.bullets?.length ? <div><div className="eyebrow mb-1 text-emerald-600">איך עושים נכון</div><ListUl items={a.examples.bullets} color="#16a34a" /></div> : null}
              {!a.examples?.scenario && !a.examples?.bullets?.length && <Empty />}
            </div>}

            {tab === "transactions" && <div className="space-y-3">
              {a.transactions?.tcodes?.length ? <div><div className="eyebrow mb-1 text-slate-400">טרנזקציות</div><Chips items={a.transactions.tcodes} color={c} hrefBase="/tcode/" /></div> : null}
              {a.transactions?.tables?.length ? <div><div className="eyebrow mb-1 text-slate-400">טבלאות</div><Chips items={a.transactions.tables} color="#64748b" hrefBase="/object/" /></div> : null}
              {a.transactions?.tools?.length ? <div><div className="eyebrow mb-1 text-slate-400">כלים</div><Chips items={a.transactions.tools} color="#0891b2" /></div> : null}
              {!a.transactions?.tcodes?.length && !a.transactions?.tables?.length && !a.transactions?.tools?.length && <Empty />}
            </div>}

            {tab === "debug" && <div className="space-y-3">
              {a.debug?.issues?.length ? <div><div className="eyebrow mb-1 text-rose-500">תקלות נפוצות</div><ListUl items={a.debug.issues} color="#dc2626" /></div> : null}
              {a.debug?.steps?.length ? <div><div className="eyebrow mb-1 text-violet-500">נתיב Debug</div><ListUl items={a.debug.steps} color="#7c3aed" /></div> : null}
              {a.debug?.oss?.length ? <div><div className="eyebrow mb-1 text-amber-600"><FileText className="me-1 inline size-3" />OSS · SAP Notes</div><Chips items={a.debug.oss} color="#b45309" /></div> : null}
              {!a.debug?.issues?.length && !a.debug?.steps?.length && !a.debug?.oss?.length && <Empty />}
            </div>}

            {tab === "interview" && <ManagerExpects text={a.managerExpects} interview={a.interview} />}

            {tab === "scenario" && <div className="space-y-2">
              {a.scenario?.text && <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3"><div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase text-emerald-600"><ShieldCheck className="size-3.5" />דוגמת ייצור — הארגון</div><p className="text-[12.5px] leading-relaxed text-emerald-900">{a.scenario.text}</p></div>}
              {a.scenario?.incidents?.length ? <div><div className="eyebrow mb-1 text-rose-500">תקלות מתועדות</div><div className="flex flex-wrap gap-1.5">{a.scenario.incidents.map((inc) => <Link key={inc.slug} href={`/troubleshooting/${inc.slug}/`} className="rounded-lg bg-rose-50 px-2.5 py-1 text-[11px] font-bold text-rose-700 ring-1 ring-rose-200 hover:bg-rose-100">{inc.label} ←</Link>)}</div></div> : null}
              {!a.scenario?.text && !a.scenario?.incidents?.length && <Empty />}
            </div>}

            {tab === "related" && <div className="space-y-3">
              {a.related?.length ? <div className="flex flex-wrap gap-1.5">{a.related.map((l) => l.href.startsWith("#") ? <span key={l.label} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500">{l.label}</span> : <Link key={l.label} href={l.href} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:bg-slate-200">{l.label}</Link>)}</div> : null}
              <div className="flex flex-wrap gap-1.5 border-t border-slate-100 pt-2">{config.crossLinks.map((l) => <Link key={l.href} href={l.href} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:bg-slate-200">{l.label}</Link>)}</div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );

  const ladderLevels: LadderLevel[] = config.ladder;

  return (
    <div className="mx-auto max-w-[1200px] space-y-4" dir="rtl">
      {!focus && (
        <header className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-l from-slate-900 via-slate-800 p-6 text-white shadow-xl sm:p-8" style={{ ["--tw-gradient-to" as string]: config.accent }}>
          <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full blur-3xl" style={{ background: config.accent + "40" }} />
          <div className="relative">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/60"><GraduationCap className="size-4" />{config.eyebrow}</div>
              <FocusToggle on={focus} onToggle={() => setFocus(true)} />
            </div>
            <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">{config.he}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/85">{config.sub}</p>
          </div>
        </header>
      )}

      {!focus && <StartHere items={config.startCards} onPick={pick} />}
      {!focus && <LearningLadder levels={ladderLevels} doneIds={done} onPick={pick} />}

      {workspace}

      {!focus && <p className="pb-4 text-center text-[11px] text-slate-400">קורס אינטראקטיבי · ידע SAP סטנדרטי · trust: curated. ההתקדמות נשמרת מקומית.<Link href="/knowledge/" className="ms-1 font-bold text-brand">כל המרכזים</Link></p>}
    </div>
  );
}
