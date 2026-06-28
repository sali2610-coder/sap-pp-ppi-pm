"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Layers, Boxes, Bug, FileText, GraduationCap, Terminal, FlaskConical, Network, Lightbulb, UserCog, KeyRound, Search } from "lucide-react";
import { AREAS, SEC_CAT, SEC_ARCH, SEC_META, type SecArea } from "@/data/security";
import { StartHere, LearningLadder, TopicTabs, TopicIntro, CompletionChecklist, ManagerExpects, FocusToggle, useCourseProgress, type StartCard, type TopicTab } from "@/components/learn/course-kit";
import { COURSE, ladderLevels, topicCourse } from "@/lib/security-course";

const CAT_ICON: Record<SecArea["cat"], React.ReactNode> = {
  admin: <UserCog className="size-5" />, diag: <Search className="size-5" />, object: <Boxes className="size-5" />,
  roletype: <Layers className="size-5" />, fiori: <KeyRound className="size-5" />,
};
const CAT_LAYER: Record<SecArea["cat"], string> = { admin: "Roles", diag: "Runtime Check", object: "Authorizations", roletype: "Roles", fiori: "Fiori / IAM" };

const TABS: TopicTab[] = [
  { id: "overview", label: "סקירה", icon: <Lightbulb className="size-3.5" /> },
  { id: "visual", label: "ויזואלי", icon: <Layers className="size-3.5" /> },
  { id: "examples", label: "דוגמאות", icon: <FlaskConical className="size-3.5" /> },
  { id: "transactions", label: "טרנזקציות", icon: <Terminal className="size-3.5" /> },
  { id: "debug", label: "Debug", icon: <Bug className="size-3.5" /> },
  { id: "interview", label: "ראיון", icon: <GraduationCap className="size-3.5" /> },
  { id: "cbc", label: "CBC", icon: <ShieldCheck className="size-3.5" /> },
  { id: "related", label: "קשור", icon: <Network className="size-3.5" /> },
];

export function SecurityCenter() {
  const [focus, setFocus] = useState(false);
  const [sel, setSel] = useState("su01");
  const [tab, setTab] = useState("overview");
  const { done } = useCourseProgress(COURSE);
  const a = AREAS.find((x) => x.id === sel) || AREAS[0];
  const course = topicCourse(a);
  const c = a.color;

  const cats = (["admin", "diag", "object", "roletype", "fiori"] as const).map((cat) => ({ cat, ...SEC_CAT[cat], items: AREAS.filter((x) => x.cat === cat) }));
  const startCards: StartCard[] = cats.map((g) => ({ id: g.items[0]?.id || "su01", he: g.he, sub: `${g.items.length} נושאים · התחל מ-${g.items[0]?.he || ""}`, icon: CAT_ICON[g.cat], color: g.c }));

  const pick = (id: string) => { setSel(id); setTab("overview"); if (typeof document !== "undefined") document.getElementById("topic-workspace")?.scrollIntoView({ behavior: "smooth", block: "start" }); };

  const Chips = ({ items, color, hrefBase }: { items: string[]; color: string; hrefBase?: string }) => (
    <div className="flex flex-wrap gap-1.5">{items.map((x) => hrefBase
      ? <Link key={x} href={`${hrefBase}${encodeURIComponent(x)}/`} className="tech rounded-lg px-2 py-0.5 text-[11px] font-bold transition hover:brightness-110" style={{ background: color + "14", color }} dir="ltr">{x}</Link>
      : <span key={x} className="tech rounded-lg border px-2 py-0.5 text-[11px] font-bold" style={{ borderColor: color + "55", background: color + "12", color }} dir="ltr">{x}</span>)}</div>
  );
  const List = ({ items, color }: { items: string[]; color: string }) => <ul className="space-y-1">{items.map((x, i) => <li key={i} className="flex gap-1.5 text-[13px] leading-relaxed text-slate-700"><span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ background: color }} />{x}</li>)}</ul>;

  const workspace = (
    <div id="topic-workspace" className="space-y-3 scroll-mt-4">
      {/* topic selector */}
      <div className="flex flex-wrap gap-1.5">
        {AREAS.map((x) => { const on = x.id === sel; const d = done.includes(x.id); return (
          <button key={x.id} onClick={() => pick(x.id)} className={`flex items-center gap-1 rounded-xl border-2 px-2.5 py-1 text-[12px] font-bold transition ${on ? "text-white" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`} style={on ? { background: x.color, borderColor: x.color } : undefined}>{d && <span className="size-1.5 rounded-full bg-emerald-400" />}{x.he}</button>
        ); })}
      </div>

      {/* topic header */}
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <div className="flex items-center justify-between px-5 py-3 text-white" style={{ background: `linear-gradient(135deg,${c},${c}cc)` }}>
          <div><div className="text-lg font-extrabold">{a.he} · <span className="font-mono text-sm opacity-80">{a.en}</span></div></div>
          {focus && <FocusToggle on={focus} onToggle={() => setFocus(false)} />}
        </div>
        <div className="p-4">
          <TopicTabs tabs={TABS} active={tab} onChange={setTab} />
          <div key={a.id + tab} className="mt-4" style={{ animation: "fadeUp .2s ease both" }}>
            {tab === "overview" && <div className="space-y-3">
              <TopicIntro fields={course.intro} />
              <CompletionChecklist course={COURSE} topicId={a.id} items={course.checklist} />
            </div>}

            {tab === "visual" && <div className="space-y-3">
              <div className="text-[12px] font-bold text-slate-500">מיקום {a.he} בארכיטקטורת האבטחה:</div>
              <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">{SEC_ARCH.map((l) => { const hot = l.layer === CAT_LAYER[a.cat]; return (
                <div key={l.layer} className="rounded-xl border-2 p-3 transition" style={{ borderColor: hot ? c : "#e2e8f0", background: hot ? c + "0d" : "#fff", opacity: hot ? 1 : 0.55 }}>
                  <div className="text-[12px] font-extrabold" style={{ color: hot ? c : "#64748b" }}>{l.he} <span className="font-mono text-[9px] opacity-70">{l.layer}</span></div>
                  <ul className="mt-1 space-y-0.5">{l.items.map((it, i) => <li key={i} className="text-[11px] text-slate-500">• {it}</li>)}</ul>
                </div>
              ); })}</div>
              {a.tcodes.length > 0 && <div><div className="eyebrow mb-1 text-slate-400">כלים בתחום</div><Chips items={a.tcodes} color={c} hrefBase="/tcode/" /></div>}
            </div>}

            {tab === "examples" && <div className="space-y-2">
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3"><div className="mb-1 text-[11px] font-bold uppercase text-slate-400">תרחיש טיפוסי</div><p className="text-[13px] leading-relaxed text-slate-700">{a.when}</p></div>
              {a.tips.length > 0 && <div><div className="eyebrow mb-1 text-emerald-600">איך עושים נכון</div><List items={a.tips} color="#16a34a" /></div>}
            </div>}

            {tab === "transactions" && <div className="space-y-3">
              {a.tcodes.length > 0 && <div><div className="eyebrow mb-1 text-slate-400">טרנזקציות</div><Chips items={a.tcodes} color={c} hrefBase="/tcode/" /></div>}
              {a.tables.length > 0 && <div><div className="eyebrow mb-1 text-slate-400">טבלאות</div><Chips items={a.tables.map((t) => t.split(" ")[0])} color="#64748b" hrefBase="/object/" /></div>}
            </div>}

            {tab === "debug" && <div className="space-y-3">
              <div><div className="eyebrow mb-1 text-rose-500">תקלות נפוצות</div><List items={a.troubleshooting} color="#dc2626" /></div>
              <div><div className="eyebrow mb-1 text-violet-500">נתיב Debug</div><List items={a.debug} color="#7c3aed" /></div>
              {a.notes.length > 0 && <div><div className="eyebrow mb-1 text-amber-600"><FileText className="me-1 inline size-3" />OSS · SAP Notes</div><Chips items={a.notes} color="#b45309" /></div>}
            </div>}

            {tab === "interview" && <ManagerExpects text={course.managerExpects} interview={course.interview} />}

            {tab === "cbc" && <div className="space-y-2">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3"><div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase text-emerald-600"><ShieldCheck className="size-3.5" />דוגמת ייצור — CBC</div><p className="text-[12.5px] leading-relaxed text-emerald-900">{a.cbc}</p></div>
              {a.incidents.length > 0 && <div><div className="eyebrow mb-1 text-rose-500">תקלות מתועדות</div><div className="flex flex-wrap gap-1.5">{a.incidents.map((inc) => <Link key={inc.slug} href={`/troubleshooting/${inc.slug}/`} className="rounded-lg bg-rose-50 px-2.5 py-1 text-[11px] font-bold text-rose-700 ring-1 ring-rose-200 hover:bg-rose-100">{inc.label} ←</Link>)}</div></div>}
            </div>}

            {tab === "related" && <div className="space-y-3">
              <div className="flex flex-wrap gap-1.5">{a.links.map((l) => l.href.includes("/security/#") ? <span key={l.label} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500">{l.label}</span> : <Link key={l.label} href={l.href} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:bg-slate-200">{l.label}</Link>)}</div>
              <div className="flex flex-wrap gap-1.5 border-t border-slate-100 pt-2">{[["מרכז תקלות", "/incidents/"], ["אינטגרציה", "/integration/"], ["ALM", "/alm/"], ["Fiori", "/fiori/"], ["מרכז S/4", "/s4hana/"]].map(([l, h]) => <Link key={h} href={h} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:bg-slate-200">{l}</Link>)}</div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-[1200px] space-y-4" dir="rtl">
      {!focus && (
        <header className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-l from-slate-900 via-slate-800 to-[#0f766e] p-6 text-white shadow-xl sm:p-8">
          <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-teal-500/25 blur-3xl" />
          <div className="relative">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/60"><ShieldCheck className="size-4" />קורס אינטראקטיבי · Security & IAM</div>
              <FocusToggle on={focus} onToggle={() => setFocus(true)} />
            </div>
            <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">{SEC_META.he}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/85">למד אבטחת SAP כמסלול — מ-SU01/PFCG ועד Fiori/IAM. כל נושא: מה זה · למה · מתי · מה היועץ עושה · ECC↔S/4 · טעויות · ראיון · checklist.</p>
          </div>
        </header>
      )}

      {!focus && <StartHere items={startCards} onPick={pick} />}
      {!focus && <LearningLadder levels={ladderLevels()} doneIds={done} onPick={pick} />}

      {workspace}

      {!focus && <p className="pb-4 text-center text-[11px] text-slate-400">קורס מבוסס ידע אבטחה סטנדרטי של SAP · trust: curated. ההתקדמות נשמרת מקומית.<Link href="/knowledge/" className="ms-1 font-bold text-brand">כל המרכזים</Link></p>}
    </div>
  );
}
