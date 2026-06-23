"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ShieldCheck, Layers, Search, UserCog, KeyRound, Boxes, AlertTriangle, Bug, Lightbulb, FileText, ArrowLeft, Wrench, GraduationCap, Workflow, Fingerprint, ListChecks } from "lucide-react";
import { AREAS, SEC_CAT, SEC_ARCH, TROUBLE_FLOW, ROLE_DESIGN, FIORI_MODEL, SEC_ERRORS, SEC_INTERVIEW, SEC_META } from "@/data/security";

const SECTIONS = [
  { id: "arch", he: "ארכיטקטורת אבטחה", icon: Layers },
  { id: "explorer", he: "חוקר תחומים", icon: Search },
  { id: "flow", he: "זרימת אבחון", icon: Workflow },
  { id: "roledesign", he: "עיצוב תפקידים", icon: UserCog },
  { id: "fiori", he: "מודל Fiori", icon: KeyRound },
  { id: "errors", he: "שגיאות נפוצות", icon: AlertTriangle },
  { id: "interview", he: "שאלות ראיון", icon: GraduationCap },
] as const;

export function SecurityCenter() {
  const [active, setActive] = useState("arch");
  const [sel, setSel] = useState<string>("pfcg");
  const [qOpen, setQOpen] = useState<number | null>(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const secRef = useRef<Record<string, HTMLElement | null>>({});
  useEffect(() => {
    const root = scrollRef.current; if (!root) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive((e.target as HTMLElement).id); }), { root, rootMargin: "-15% 0px -75% 0px" });
    SECTIONS.forEach((s) => { const el = secRef.current[s.id]; if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  const go = (id: string) => secRef.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  const a = AREAS.find((x) => x.id === sel) || AREAS[0];
  const pick = (id: string) => { setSel(id); go("explorer"); };
  const cats = (["admin", "diag", "object", "roletype", "fiori"] as const).map((cat) => ({ ...SEC_CAT[cat], items: AREAS.filter((x) => x.cat === cat) }));

  const Card = ({ id, title, icon, sub, accent, children: ch }: { id: string; title: string; icon: React.ReactNode; sub?: string; accent?: string; children: React.ReactNode }) => (
    <section id={id} ref={(el) => { secRef.current[id] = el; }} className="scroll-mt-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-2.5"><span className="grid size-9 shrink-0 place-items-center rounded-xl text-white shadow-sm" style={{ background: accent || "#0f172a" }}>{icon}</span><div><h2 className="text-lg font-extrabold text-slate-900">{title}</h2>{sub && <p className="text-xs font-medium text-slate-400">{sub}</p>}</div></div>
      {ch}
    </section>
  );
  const List = ({ title, items, c, icon }: { title: string; items: string[]; c: string; icon?: React.ReactNode }) => (
    <div><div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide" style={{ color: c }}>{icon}{title}</div><ul className="space-y-1">{items.map((x, i) => <li key={i} className="flex gap-1.5 text-[12px] leading-relaxed text-slate-600"><span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ background: c }} />{x}</li>)}</ul></div>
  );
  const Chips = ({ items, c }: { items: string[]; c?: string }) => (
    <div className="flex flex-wrap gap-1.5">{items.map((t) => <span key={t} className="tech rounded-lg border px-2.5 py-1 text-[11px] font-bold" style={{ borderColor: (c || "#cbd5e1") + "66", background: (c || "#f1f5f9") + "14", color: c || "#475569" }} dir="ltr">{t}</span>)}</div>
  );

  return (
    <div className="mx-auto max-w-[1700px]" dir="rtl">
      <header className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-l from-slate-900 via-slate-800 to-[#0f766e] p-6 text-white shadow-xl sm:p-8">
        <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-teal-500/25 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/60"><ShieldCheck className="size-4" />SAP Security · Authorizations · IAM</div>
          <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">{SEC_META.he}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/85">{SEC_META.sub}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-[12px] font-bold text-white/80">{cats.map((g) => <span key={g.c} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5"><span className="size-2 rounded-full" style={{ background: g.c }} />{g.he} · {g.items.length}</span>)}</div>
        </div>
      </header>

      <div className="mt-4 grid gap-5 lg:grid-cols-[200px_minmax(0,1fr)]">
        <aside className="hidden lg:block"><nav className="sticky top-4 space-y-1">
          {SECTIONS.map((s) => { const Ic = s.icon; const on = active === s.id; return <button key={s.id} onClick={() => go(s.id)} className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm font-bold transition ${on ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200" : "text-slate-500 hover:bg-white/70 hover:text-slate-900"}`}><Ic className="size-4 shrink-0" style={on ? { color: "#0d9488" } : undefined} />{s.he}</button>; })}
          <div className="!mt-3 space-y-1 border-t border-slate-200 pt-3">{[["מרכז תקלות", "/incidents/"], ["אינטגרציה", "/integration/"], ["מסירה", "/delivery/"], ["Migration", "/migration-cockpit/"], ["מרכז S/4", "/s4hana/"]].map(([l, h]) => <Link key={h} href={h} className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-[13px] font-bold text-slate-500 transition hover:text-brand"><ArrowLeft className="size-3.5" />{l}</Link>)}</div>
        </nav></aside>

        <div ref={scrollRef} className="min-w-0 max-h-[calc(100vh-2rem)] space-y-5 overflow-y-auto lg:pe-1">
          {/* 1. Architecture overview */}
          <Card id="arch" title="ארכיטקטורת אבטחה — שכבות" icon={<Layers className="size-4" />} sub="מאימות עד שכבת Fiori — כיצד נבנית הרשאה בפועל" accent="#0d9488">
            <div className="grid gap-2.5 md:grid-cols-2 xl:grid-cols-3">{SEC_ARCH.map((l, i) => (
              <div key={l.layer} className="rounded-2xl border-2 p-3" style={{ borderColor: l.c + "55" }}>
                <div className="mb-1.5 flex items-center gap-2"><span className="grid size-6 place-items-center rounded-lg text-[11px] font-extrabold text-white" style={{ background: l.c }}>{i + 1}</span><div><span className="text-[13px] font-extrabold text-slate-800">{l.he}</span> <span className="font-mono text-[9px] text-slate-400">{l.layer}</span></div></div>
                <ul className="space-y-1">{l.items.map((it, j) => <li key={j} className="flex gap-1.5 text-[12px] text-slate-600"><span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ background: l.c }} />{it}</li>)}</ul>
              </div>
            ))}</div>
            <p className="mt-3 text-[11px] text-slate-400">בדיקת זמן-ריצה: AUTHORITY-CHECK משווה את הערכים הנדרשים מול ה-User Buffer (פרופילים שמשויכים בפועל).</p>
          </Card>

          {/* 2. Explorer — areas by category + detail */}
          <Card id="explorer" title="חוקר תחומים" icon={<Search className="size-4" />} sub="מה זה · מתי · טרנזקציות · טבלאות · תקלות · Debug · ECC↔S/4 · Fiori · טיפים · CBC" accent={a.color}>
            <div className="mb-4 space-y-2.5">
              {cats.map((g) => (
                <div key={g.c}>
                  <div className="mb-1 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wide" style={{ color: g.c }}><span className="size-2 rounded-full" style={{ background: g.c }} />{g.he}</div>
                  <div className="flex flex-wrap gap-1.5">{g.items.map((ar) => { const on = ar.id === sel; return (
                    <button key={ar.id} onClick={() => pick(ar.id)} className={`rounded-xl border-2 px-2.5 py-1 text-[12px] font-bold transition ${on ? "text-white" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`} style={on ? { background: ar.color, borderColor: ar.color } : undefined}>{ar.he}</button>
                  ); })}</div>
                </div>
              ))}
            </div>

            <div key={a.id} className="overflow-hidden rounded-2xl border border-slate-200" style={{ animation: "fadeUp .2s ease both" }}>
              <div className="px-5 py-3 text-white" style={{ background: `linear-gradient(135deg,${a.color},${a.color}cc)` }}>
                <div className="text-lg font-extrabold">{a.he} · <span className="font-mono text-sm opacity-80">{a.en}</span></div>
              </div>
              <div className="space-y-4 p-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div><div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide" style={{ color: a.color }}><Fingerprint className="size-3.5" />מה זה</div><p className="text-[13px] leading-relaxed text-slate-600">{a.what}</p></div>
                  <div><div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide" style={{ color: a.color }}><ListChecks className="size-3.5" />מתי משתמשים</div><p className="text-[13px] leading-relaxed text-slate-600">{a.when}</p></div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div><div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide" style={{ color: a.color }}><Wrench className="size-3.5" />טרנזקציות</div><Chips items={a.tcodes} c={a.color} /></div>
                  <div><div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide" style={{ color: a.color }}><Boxes className="size-3.5" />טבלאות</div><Chips items={a.tables} c="#64748b" /></div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <List title="תקלות נפוצות" items={a.troubleshooting} c="#dc2626" icon={<AlertTriangle className="size-3.5" />} />
                  <List title="נתיב Debug" items={a.debug} c="#7c3aed" icon={<Bug className="size-3.5" />} />
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-xl bg-slate-50 p-3"><div className="mb-1 text-[11px] font-bold uppercase text-slate-500">ECC</div><p className="text-[12px] leading-relaxed text-slate-600">{a.ecc}</p></div>
                  <div className="rounded-xl bg-blue-50 p-3"><div className="mb-1 text-[11px] font-bold uppercase text-blue-600">S/4HANA</div><p className="text-[12px] leading-relaxed text-blue-900">{a.s4}</p></div>
                  <div className="rounded-xl bg-amber-50 p-3"><div className="mb-1 text-[11px] font-bold uppercase text-amber-600">Fiori</div><p className="text-[12px] leading-relaxed text-amber-900">{a.fiori}</p></div>
                </div>
                <List title="טיפים לקונסולטנט" items={a.tips} c="#0d9488" icon={<Lightbulb className="size-3.5" />} />
                <div><div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-amber-600"><FileText className="size-3.5" />SAP Notes — מילות חיפוש + רכיב</div>
                  <div className="flex flex-wrap gap-1.5">{a.notes.map((n) => <span key={n} className="rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700" dir="ltr">{n}</span>)}</div>
                </div>
                <div className="grid gap-3 lg:grid-cols-2">
                  {a.incidents.length > 0 && <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-3"><div className="mb-1.5 text-[11px] font-bold uppercase text-rose-600">תקלות מתועדות</div><div className="flex flex-wrap gap-1.5">{a.incidents.map((inc) => <Link key={inc.slug} href={`/troubleshooting/${inc.slug}/`} className="rounded-lg bg-white px-2.5 py-1 text-[11.5px] font-bold text-rose-700 ring-1 ring-rose-200 transition hover:bg-rose-100">{inc.label} ←</Link>)}</div></div>}
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3"><div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase text-emerald-600"><Lightbulb className="size-3.5" />דוגמה — CBC</div><p className="text-[12px] leading-relaxed text-emerald-900">{a.cbc}</p></div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 border-t border-slate-100 px-5 py-3">{a.links.map((l) => l.href.includes("/security/#") ? <button key={l.label} onClick={() => pick(l.href.split("#")[1])} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:bg-slate-200">{l.label}</button> : <Link key={l.label} href={l.href} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:bg-slate-200">{l.label}</Link>)}</div>
            </div>
          </Card>

          {/* 3. Troubleshooting flow */}
          <Card id="flow" title="זרימת אבחון הרשאות" icon={<Workflow className="size-4" />} sub="רצף סטנדרטי מכשל ועד אימות" accent="#dc2626">
            <div className="flex flex-wrap items-stretch gap-1.5">{TROUBLE_FLOW.map((s, i, arr) => (
              <span key={s.step} className="flex items-center gap-1.5">
                <div className="flex min-w-[9.5rem] max-w-[12rem] flex-col rounded-xl border-2 border-slate-200 bg-white p-2.5">
                  <span className="text-[12px] font-extrabold text-slate-800">{s.step}</span>
                  <span className="my-0.5 inline-block w-fit rounded bg-slate-900 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white" dir="ltr">{s.t}</span>
                  <span className="text-[11px] leading-tight text-slate-500">{s.do}</span>
                </div>
                {i < arr.length - 1 && <ArrowLeft className="size-4 shrink-0 text-slate-300" />}
              </span>
            ))}</div>
          </Card>

          {/* 4. Role design workspace */}
          <Card id="roledesign" title="סדנת עיצוב תפקידים" icon={<UserCog className="size-4" />} sub="עקרונות עיצוב — Single / Composite / Derived / SU24 / least-privilege" accent="#2563eb">
            <div className="grid gap-2.5 sm:grid-cols-2">{ROLE_DESIGN.map((r) => (
              <div key={r.he} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3"><div className="text-[13px] font-extrabold text-slate-800">{r.he}</div><p className="text-[12px] leading-relaxed text-slate-500">{r.sub}</p></div>
            ))}</div>
            <div className="mt-3 flex flex-wrap gap-1.5 border-t border-slate-100 pt-3">{[["Single", "single"], ["Composite", "composite"], ["Derived", "derived"], ["PFCG", "pfcg"]].map(([l, id]) => <button key={id} onClick={() => pick(id)} className="rounded-lg bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700 hover:bg-blue-100">{l}</button>)}</div>
          </Card>

          {/* 5. Fiori authorization model */}
          <Card id="fiori" title="מודל הרשאות Fiori / IAM" icon={<KeyRound className="size-4" />} sub="שרשרת ההרשאה מ-OData ועד המשתמש" accent="#d97706">
            <div className="flex flex-wrap items-stretch gap-1.5">{FIORI_MODEL.map((f, i, arr) => (
              <span key={f.he} className="flex items-center gap-1.5">
                <div className="flex min-w-[10rem] max-w-[13rem] flex-col rounded-xl px-3 py-2 text-white shadow-sm" style={{ background: `linear-gradient(135deg,${f.c},${f.c}cc)` }}>
                  <span className="text-[12.5px] font-extrabold leading-tight">{f.he}</span>
                  <span className="text-[11px] leading-tight text-white/85">{f.sub}</span>
                </div>
                {i < arr.length - 1 && <ArrowLeft className="size-4 shrink-0 text-slate-300" />}
              </span>
            ))}</div>
            <div className="mt-3 flex flex-wrap gap-1.5 border-t border-slate-100 pt-3">{[["Catalogs / Groups", "catalogs"], ["Spaces & Pages", "spaces"], ["OData", "/integration/#odata"]].map(([l, id]) => id.startsWith("/") ? <Link key={l} href={id} className="rounded-lg bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700 hover:bg-amber-100">{l}</Link> : <button key={l} onClick={() => pick(id)} className="rounded-lg bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700 hover:bg-amber-100">{l}</button>)}</div>
          </Card>

          {/* 6. Common errors center */}
          <Card id="errors" title="מרכז שגיאות נפוצות" icon={<AlertTriangle className="size-4" />} sub="שגיאה · גורם · תיקון" accent="#e11d48">
            <div className="overflow-hidden rounded-xl border border-slate-200"><table className="w-full text-right text-[12.5px]"><thead className="bg-slate-50 text-[11px] font-bold uppercase text-slate-400"><tr><th className="px-3 py-2">שגיאה</th><th className="px-3 py-2">גורם</th><th className="px-3 py-2">תיקון</th></tr></thead>
              <tbody>{SEC_ERRORS.map((e) => <tr key={e.err} className="border-t border-slate-100 align-top"><td className="px-3 py-2 font-bold text-slate-800" dir="auto">{e.err}</td><td className="px-3 py-2 text-slate-500">{e.cause}</td><td className="px-3 py-2 text-slate-500">{e.fix}</td></tr>)}</tbody></table></div>
          </Card>

          {/* 7. Interview questions */}
          <Card id="interview" title="שאלות ראיון — קונסולטנט אבטחה" icon={<GraduationCap className="size-4" />} sub="לחץ שאלה לחשיפת התשובה" accent="#7c3aed">
            <div className="space-y-2">{SEC_INTERVIEW.map((qa, i) => { const open = qOpen === i; return (
              <div key={i} className="overflow-hidden rounded-xl border border-slate-200">
                <button onClick={() => setQOpen(open ? null : i)} className="flex w-full items-center justify-between gap-2 px-4 py-2.5 text-right text-[13px] font-bold text-slate-800 hover:bg-slate-50">
                  <span>{qa.q}</span><span className="shrink-0 font-mono text-slate-400">{open ? "−" : "+"}</span>
                </button>
                {open && <p className="border-t border-slate-100 bg-slate-50/60 px-4 py-2.5 text-[12.5px] leading-relaxed text-slate-600">{qa.a}</p>}
              </div>
            ); })}</div>
            <p className="mt-3 text-[11px] text-slate-400">מבוסס ידע אבטחה סטנדרטי של SAP — PFCG/SU24, SU53/STAUTHTRACE, אובייקטי הרשאה, מודל Fiori/IAM. trust: curated — לא המצאה.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
