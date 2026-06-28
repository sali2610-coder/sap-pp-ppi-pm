"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Terminal, ArrowLeft, ArrowRightLeft, Users, Lightbulb, GraduationCap, AlertTriangle, Sparkles, Boxes, GitBranch, Route, FileText, Workflow, Star } from "lucide-react";
import { txIntel, txRecommend, txLeadingInto, txExists } from "@/lib/tx-intel";
import { tcodeIntel } from "@/lib/object-intel";
import { pushRecentTx, useTxFavorite, toggleTxFavorite } from "@/lib/tx-prefs";

const MOD_COLOR: Record<string, string> = {
  PP: "#6d28d9", "PP-PI": "#6d28d9", PM: "#f97316", QM: "#0d9488", MM: "#2563eb",
  SD: "#0891b2", FI: "#16a34a", CO: "#d97706", WM: "#7c3aed", PS: "#be185d",
  Basis: "#475569", ABAP: "#1e293b", LE: "#0891b2", EAM: "#f97316",
};
const mc = (m: string) => MOD_COLOR[m] || MOD_COLOR[(m || "").split(/[ /]/)[0]] || "#64748b";

function CodeChip({ code, accent }: { code: string; accent: string }) {
  const cu = code.toUpperCase();
  const exists = txExists(cu);
  const cls = "tech rounded-lg px-2.5 py-1 text-[12px] font-bold transition";
  return exists
    ? <Link href={`/tcode/${encodeURIComponent(cu)}/`} className={`${cls} text-white hover:brightness-110`} style={{ background: accent }} dir="ltr">{cu}</Link>
    : <span className={`${cls} border border-slate-200 bg-slate-50 text-slate-500`} dir="ltr">{cu}</span>;
}

export function TransactionPage({ code }: { code: string }) {
  const t = txIntel(code);
  const fav = useTxFavorite(code);
  useEffect(() => { if (t) pushRecentTx(t.code); }, [t]);
  if (!t) return <div className="py-20 text-center text-sm text-slate-500" dir="rtl">T-Code לא נמצא במאגר.</div>;
  const c = mc(t.module);
  const rec = txRecommend(t.code, 6);
  const leadIn = txLeadingInto(t.code).filter((x) => !t.before.includes(x)).slice(0, 6);
  const intel = tcodeIntel(t.code); // dataset-derived tables (verified)
  const derivedTables = intel ? intel.tables.map((x) => x.name) : [];
  const tables = [...new Set([...(t.tables || []), ...derivedTables])];

  const NAV: [string, string][] = [["s-about", "מה זה"], ["s-roles", "מי ומתי"], ["s-rel", "אובייקטים"], ["s-flow", "טרנזקציות קשורות"], ["s-rec", "המלצות"], ["s-trouble", "תקלות"], ["s-best", "Best Practices"], ["s-interview", "ראיון"]];
  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const Sec = ({ id, title, icon, children }: { id: string; title: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <section id={id} className="scroll-mt-20 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-3 flex items-center gap-2 text-sm font-extrabold text-slate-900">{icon}{title}</h2>
      {children}
    </section>
  );
  const List = ({ items, color }: { items: string[]; color: string }) => (
    <ul className="space-y-1">{items.map((x, i) => <li key={i} className="flex gap-1.5 text-[13px] leading-relaxed text-slate-700"><span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ background: color }} />{x}</li>)}</ul>
  );
  const Chips = ({ items, color, ltr }: { items: string[]; color: string; ltr?: boolean }) => items.length ? (
    <div className="flex flex-wrap gap-1.5">{items.map((x) => <span key={x} dir={ltr ? "ltr" : undefined} className="rounded-lg border px-2 py-0.5 text-[11px] font-bold" style={{ borderColor: color + "55", background: color + "12", color }}>{x}</span>)}</div>
  ) : <span className="text-[12px] text-slate-300">—</span>;
  const RelRow = ({ label, items, color }: { label: string; items: string[]; color: string }) => items.length ? (
    <div className="flex flex-wrap items-center gap-2">
      <span className="min-w-[7rem] text-[11px] font-extrabold uppercase tracking-wide" style={{ color }}>{label}</span>
      <div className="flex flex-wrap gap-1.5">{items.map((x) => <CodeChip key={x} code={x} accent={color} />)}</div>
    </div>
  ) : null;

  return (
    <div className="mx-auto max-w-[1100px] space-y-4" dir="rtl">
      {/* breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-slate-400">
        <Link href="/" className="hover:text-slate-700">בית</Link><ArrowLeft className="size-3" />
        <Link href="/transactions/" className="hover:text-slate-700">מרכז טרנזקציות</Link><ArrowLeft className="size-3" />
        <span className="font-bold text-slate-700" dir="ltr">{t.code}</span>
      </div>

      {/* header */}
      <header className="relative overflow-hidden rounded-3xl p-6 text-white shadow-xl" style={{ background: `linear-gradient(135deg, ${c}, ${c}cc)` }}>
        <div className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70"><Terminal className="size-4" />Transaction · {t.module} · {t.area}</div>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <h1 className="font-mono text-4xl font-extrabold tracking-tight" dir="ltr">{t.code}</h1>
            {t.fiori && <span className="rounded-lg bg-white/20 px-2.5 py-1 text-xs font-bold backdrop-blur-sm">Fiori: {t.fiori}</span>}
            <button onClick={() => toggleTxFavorite(t.code)} aria-label="מועדף" className={`tap inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold backdrop-blur-sm transition active:scale-90 ${fav ? "bg-amber-400 text-amber-950" : "bg-white/20 text-white hover:bg-white/30"}`}><Star className={`size-3.5 ${fav ? "fill-amber-950" : ""}`} />{fav ? "במועדפים" : "מועדף"}</button>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/90">{t.descHe}</p>
        </div>
      </header>

      {/* in-page nav */}
      <div className="sticky top-[4.25rem] z-20 flex flex-wrap gap-1.5 rounded-2xl border border-slate-200 bg-white/90 p-2 backdrop-blur">
        {NAV.map(([id, lbl]) => <button key={id} onClick={() => jump(id)} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 transition hover:bg-brand/10 hover:text-brand">{lbl}</button>)}
      </div>

      {/* about */}
      <Sec id="s-about" title="מה זה ולמה" icon={<Lightbulb className="size-4" style={{ color: c }} />}>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-3"><div className="mb-1 text-[11px] font-bold uppercase text-slate-400">תיאור טכני</div><p className="text-[13px] leading-relaxed text-slate-600">{t.descTech}</p></div>
          <div className="rounded-xl bg-slate-50 p-3"><div className="mb-1 text-[11px] font-bold uppercase text-slate-400">תהליך עסקי</div><p className="text-[13px] leading-relaxed text-slate-600">{t.process}</p></div>
          <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3"><div className="mb-1 text-[11px] font-bold uppercase text-blue-600">למתחיל</div><p className="text-[13px] leading-relaxed text-slate-700">{t.beginner}</p></div>
          <div className="rounded-xl border border-violet-100 bg-violet-50/50 p-3"><div className="mb-1 text-[11px] font-bold uppercase text-violet-600">ליועץ</div><p className="text-[13px] leading-relaxed text-slate-700">{t.consultant}</p></div>
        </div>
      </Sec>

      {/* roles / when */}
      <Sec id="s-roles" title="מי משתמש · מתי כן · מתי לא" icon={<Users className="size-4" style={{ color: c }} />}>
        <div className="grid gap-3 md:grid-cols-3">
          <div><div className="mb-1 text-[11px] font-bold uppercase text-slate-400">משתמשים</div><Chips items={t.users} color={c} /></div>
          <div className="rounded-xl bg-emerald-50/60 p-3"><div className="mb-1 text-[11px] font-bold uppercase text-emerald-600">מתי להשתמש</div><p className="text-[12.5px] leading-relaxed text-slate-700">{t.whenUse}</p></div>
          <div className="rounded-xl bg-rose-50/60 p-3"><div className="mb-1 text-[11px] font-bold uppercase text-rose-600">מתי לא</div><p className="text-[12.5px] leading-relaxed text-slate-700">{t.whenNot}</p></div>
        </div>
        {t.prereq?.length ? <div className="mt-3"><div className="mb-1 text-[11px] font-bold uppercase text-slate-400">דרישות מקדימות</div><List items={t.prereq} color="#64748b" /></div> : null}
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-3"><div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase text-amber-700"><ArrowRightLeft className="size-3.5" />S/4HANA</div><p className="text-[12.5px] leading-relaxed text-amber-900">{t.s4}</p></div>
          {t.certTips && <div className="rounded-xl border border-slate-200 bg-slate-50 p-3"><div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase text-slate-500"><GraduationCap className="size-3.5" />טיפ הסמכה</div><p className="text-[12.5px] leading-relaxed text-slate-700">{t.certTips}</p></div>}
        </div>
      </Sec>

      {/* related objects */}
      <Sec id="s-rel" title="אובייקטים קשורים" icon={<Boxes className="size-4" style={{ color: c }} />}>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {tables.length > 0 && <div><div className="eyebrow mb-1 text-slate-400">טבלאות</div><div className="flex flex-wrap gap-1.5">{tables.slice(0, 12).map((n) => <Link key={n} href={`/object/${encodeURIComponent(n)}/`} className="tech rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600 hover:bg-brand/10 hover:text-brand" dir="ltr">{n}</Link>)}</div></div>}
          {t.cds?.length ? <div><div className="eyebrow mb-1 text-slate-400">CDS Views</div><Chips items={t.cds} color="#0d9488" ltr /></div> : null}
          {t.bapis?.length ? <div><div className="eyebrow mb-1 text-slate-400">BAPIs / FM</div><Chips items={t.bapis} color="#2563eb" ltr /></div> : null}
          {t.classes?.length ? <div><div className="eyebrow mb-1 text-slate-400">Classes / APIs</div><Chips items={t.classes} color="#7c3aed" ltr /></div> : null}
          {t.badis?.length ? <div><div className="eyebrow mb-1 text-slate-400">BAdIs</div><Chips items={t.badis} color="#be185d" ltr /></div> : null}
          {t.userExits?.length ? <div><div className="eyebrow mb-1 text-slate-400">User Exits</div><Chips items={t.userExits} color="#be185d" ltr /></div> : null}
          {t.enhancements?.length ? <div><div className="eyebrow mb-1 text-slate-400">Enhancement Spots</div><Chips items={t.enhancements} color="#7c3aed" ltr /></div> : null}
          {t.authObjects?.length ? <div><div className="eyebrow mb-1 text-slate-400">אובייקטי הרשאה</div><Chips items={t.authObjects} color="#dc2626" ltr /></div> : null}
        </div>
      </Sec>

      {/* relationship navigation */}
      <Sec id="s-flow" title="ניווט טרנזקציות קשורות" icon={<Route className="size-4" style={{ color: c }} />}>
        <div className="space-y-2.5">
          <RelRow label="שלב קודם" items={[...new Set([...t.before, ...leadIn])]} color="#64748b" />
          <RelRow label="שלב הבא" items={t.after} color={c} />
          <RelRow label="נפוץ יחד" items={t.together} color="#0891b2" />
          <RelRow label="דומות" items={t.similar} color="#7c3aed" />
          <RelRow label="חלופות" items={t.alternative} color="#16a34a" />
          <RelRow label="מיושנות" items={t.obsolete} color="#dc2626" />
        </div>
        {(t.before.length === 0 && t.after.length === 0 && t.together.length === 0 && t.similar.length === 0 && t.alternative.length === 0) && <p className="text-[12px] text-slate-400">— אין קשרים מתועדים</p>}
      </Sec>

      {/* recommendation engine */}
      {rec.length > 0 && (
        <Sec id="s-rec" title={`אם פתחת ${t.code} — ייתכן שתצטרך גם`} icon={<Sparkles className="size-4 text-amber-500" />}>
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {rec.map((r) => { const exists = txExists(r.code); const inner = (
              <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-3 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-sm">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg text-white" style={{ background: c }}><Terminal className="size-4" /></span>
                <div className="min-w-0"><div className="font-mono text-[13px] font-extrabold text-slate-800" dir="ltr">{r.code}</div><div className="text-[11px] text-slate-500">{r.reason}</div></div>
              </div>
            ); return exists ? <Link key={r.code} href={`/tcode/${encodeURIComponent(r.code)}/`}>{inner}</Link> : <div key={r.code} className="opacity-70">{inner}</div>; })}
          </div>
        </Sec>
      )}

      {/* troubleshooting */}
      <Sec id="s-trouble" title="תקלות נפוצות · OSS" icon={<AlertTriangle className="size-4 text-amber-500" />}>
        <div className="grid gap-3 md:grid-cols-2">
          {t.commonErrors.length > 0 && <div><div className="eyebrow mb-1 text-rose-500">שגיאות נפוצות</div><List items={t.commonErrors} color="#dc2626" /></div>}
          {t.mistakes.length > 0 && <div><div className="eyebrow mb-1 text-amber-600">טעויות נפוצות</div><List items={t.mistakes} color="#d97706" /></div>}
        </div>
        {t.ossKeywords.length > 0 && <div className="mt-3"><div className="eyebrow mb-1 text-amber-600"><FileText className="me-1 inline size-3" />OSS — מילות חיפוש</div><Chips items={t.ossKeywords} color="#b45309" ltr /></div>}
      </Sec>

      {/* best practices */}
      <Sec id="s-best" title="Best Practices" icon={<Sparkles className="size-4 text-emerald-500" />}>
        {t.bestPractices.length > 0 ? <List items={t.bestPractices} color="#16a34a" /> : <p className="text-[12px] text-slate-400">—</p>}
      </Sec>

      {/* interview */}
      {t.interview.length > 0 && (
        <Sec id="s-interview" title="שאלות ראיון" icon={<GraduationCap className="size-4" style={{ color: c }} />}>
          <List items={t.interview} color={c} />
        </Sec>
      )}

      <div className="flex flex-wrap gap-2 pb-4">
        <Link href="/transactions/" className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2 text-[12px] font-bold text-white"><Terminal className="size-4" />מרכז טרנזקציות</Link>
        <Link href={`/graph/?node=${encodeURIComponent(t.code)}`} className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-[12px] font-bold text-slate-600 hover:bg-slate-200"><GitBranch className="size-4" />גרף</Link>
        {t.module && <Link href={t.module.startsWith("PM") ? "/pm/" : t.module.startsWith("PP") ? "/pp-pi/" : "/sap-infrastructure/"} className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-[12px] font-bold text-slate-600 hover:bg-slate-200"><Workflow className="size-4" />מודול {t.module}</Link>}
      </div>
      <p className="pb-6 text-center text-[11px] text-slate-400">ידע טרנזקציות SAP סטנדרטי · trust: curated — קודים ואובייקטים אמיתיים בלבד.</p>
    </div>
  );
}
