"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Terminal, ArrowLeft, ArrowRightLeft, Lightbulb, GraduationCap, Sparkles, Boxes, GitBranch, Route, FileText, Workflow, Star, ChevronDown, AppWindow, Database, ShieldCheck, Cable, Wrench } from "lucide-react";
import { txIntel, txRecommend, txLeadingInto, txExists } from "@/lib/tx-intel";
import { registryTx } from "@/lib/tx-registry";
import { tcodeIntel } from "@/lib/object-intel";
import { ProcessTimeline, type TimelineStep } from "@/components/process-timeline";
import { useTxFavorite, toggleTxFavorite, pushRecentTx } from "@/lib/tx-prefs";

const MOD_COLOR: Record<string, string> = {
  PP: "#6d28d9", "PP-PI": "#6d28d9", PM: "#f97316", QM: "#0d9488", MM: "#2563eb",
  SD: "#0891b2", FI: "#16a34a", CO: "#d97706", WM: "#7c3aed", PS: "#be185d",
  Basis: "#475569", ABAP: "#1e293b", LE: "#0891b2", EAM: "#f97316", HR: "#0d9488", SECURITY: "#dc2626",
};
const mc = (m: string) => MOD_COLOR[m] || MOD_COLOR[(m || "").split(/[ /]/)[0]] || "#64748b";

function Sec({ id, title, icon, children, sub }: { id: string; title: string; icon: React.ReactNode; children: React.ReactNode; sub?: string }) {
  return (
    <section id={id} className="scroll-mt-20 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3"><h2 className="flex items-center gap-2 text-sm font-extrabold text-slate-900">{icon}{title}</h2>{sub && <p className="mt-0.5 text-[11px] font-medium text-slate-400">{sub}</p>}</div>
      {children}
    </section>
  );
}

export function TransactionPage({ code }: { code: string }) {
  const t = txIntel(code);
  const fav = useTxFavorite(code);
  useEffect(() => { if (t) pushRecentTx(t.code); }, [t]);
  if (!t) return <div className="py-20 text-center text-sm text-slate-500" dir="rtl">T-Code לא נמצא במאגר.</div>;
  const c = mc(t.module);
  const rec = txRecommend(t.code, 6);
  const leadIn = txLeadingInto(t.code).filter((x) => !t.before.includes(x)).slice(0, 4);
  const intel = tcodeIntel(t.code);
  const tables = [...new Set([...(t.tables || []), ...(intel ? intel.tables.map((x) => x.name) : [])])];

  // Business process timeline + learning-path progress: before → THIS → after.
  const stepFor = (cd: string, state: TimelineStep["state"]): TimelineStep => {
    const r = registryTx(cd);
    return { label: r?.he || cd, code: cd, href: txExists(cd) || r ? `/tcode/${encodeURIComponent(cd)}/` : undefined, state };
  };
  const before = [...new Set([...leadIn.reverse(), ...t.before])].slice(-3);
  const after = [...new Set(t.after)].slice(0, 4);
  const timeline: TimelineStep[] = [
    ...before.map((cd) => stepFor(cd, "done")),
    { label: t.area || t.descHe.slice(0, 40), code: t.code, state: "current" },
    ...after.map((cd) => stepFor(cd, "todo")),
  ];

  const NAV: [string, string][] = [["s-about", "מה זה"], ["s-flow", "תהליך"], ["s-rec", "המשך"], ["s-rel", "קשרים"], ["s-notes", "הערות יועץ"], ["s-interview", "ראיון"]];
  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const List = ({ items, color }: { items: string[]; color: string }) => (
    <ul className="space-y-1">{items.map((x, i) => <li key={i} className="flex gap-1.5 text-[13px] leading-relaxed text-slate-700"><span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ background: color }} />{x}</li>)}</ul>
  );
  const Chips = ({ items, color, ltr }: { items: string[]; color: string; ltr?: boolean }) => items.length ? (
    <div className="flex flex-wrap gap-1.5">{items.map((x) => <span key={x} dir={ltr ? "ltr" : undefined} className="rounded-lg border px-2 py-0.5 text-[11px] font-bold" style={{ borderColor: color + "55", background: color + "12", color }}>{x}</span>)}</div>
  ) : <span className="text-[12px] text-slate-300">—</span>;
  const CodeChip = ({ cd }: { cd: string }) => { const ex = txExists(cd) || !!registryTx(cd); const cls = "tech rounded-lg px-2.5 py-1 text-[12px] font-bold transition"; return ex ? <Link href={`/tcode/${encodeURIComponent(cd)}/`} className={`${cls} text-white hover:brightness-110`} style={{ background: c }} dir="ltr">{cd}</Link> : <span className={`${cls} border border-slate-200 bg-slate-50 text-slate-500`} dir="ltr">{cd}</span>; };
  const RelRow = ({ label, items }: { label: string; items: string[] }) => items.length ? (
    <div className="flex flex-wrap items-center gap-2"><span className="min-w-[6.5rem] text-[11px] font-extrabold uppercase tracking-wide text-slate-400">{label}</span><div className="flex flex-wrap gap-1.5">{items.map((x) => <CodeChip key={x} cd={x} />)}</div></div>
  ) : null;

  // Relationship Explorer cards
  const relCards: { label: string; icon: React.ReactNode; items: string[]; color: string; objHref?: boolean; ltr?: boolean }[] = [
    { label: "טבלאות", icon: <Database className="size-3.5" />, items: tables.slice(0, 14), color: "#0891b2", objHref: true, ltr: true },
    { label: "CDS Views", icon: <FileText className="size-3.5" />, items: t.cds || [], color: "#0d9488", ltr: true },
    { label: "BAPIs / FM", icon: <Boxes className="size-3.5" />, items: t.bapis || [], color: "#2563eb", ltr: true },
    { label: "Classes / APIs", icon: <FileText className="size-3.5" />, items: t.classes || [], color: "#7c3aed", ltr: true },
    { label: "BAdIs", icon: <Cable className="size-3.5" />, items: t.badis || [], color: "#be185d", ltr: true },
    { label: "User Exits", icon: <Cable className="size-3.5" />, items: t.userExits || [], color: "#be185d", ltr: true },
    { label: "Enhancement Spots", icon: <Cable className="size-3.5" />, items: t.enhancements || [], color: "#7c3aed", ltr: true },
    { label: "אובייקטי הרשאה", icon: <ShieldCheck className="size-3.5" />, items: t.authObjects || [], color: "#dc2626", ltr: true },
  ].filter((x) => x.items.length);

  return (
    <div className="mx-auto max-w-[1100px] space-y-4" dir="rtl">
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
          <div className="mt-1 flex flex-wrap items-center gap-2.5">
            <h1 className="font-mono text-4xl font-extrabold tracking-tight" dir="ltr">{t.code}</h1>
            <span className="rounded-lg bg-white/20 px-2.5 py-1 text-xs font-bold backdrop-blur-sm">ECC → S/4</span>
            {t.fiori && <span className="inline-flex items-center gap-1 rounded-lg bg-white/20 px-2.5 py-1 text-xs font-bold backdrop-blur-sm"><AppWindow className="size-3.5" />Fiori</span>}
            <button onClick={() => toggleTxFavorite(t.code)} aria-label="מועדף" className={`tap inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold backdrop-blur-sm transition active:scale-90 ${fav ? "bg-amber-400 text-amber-950" : "bg-white/20 text-white hover:bg-white/30"}`}><Star className={`size-3.5 ${fav ? "fill-amber-950" : ""}`} />{fav ? "במועדפים" : "מועדף"}</button>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/90">{t.descHe}</p>
        </div>
      </header>

      {/* in-page nav */}
      <div className="sticky top-[4.25rem] z-20 flex flex-wrap gap-1.5 rounded-2xl border border-slate-200 bg-white/90 p-2 backdrop-blur">
        {NAV.map(([id, lbl]) => <button key={id} onClick={() => jump(id)} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 transition hover:bg-brand/10 hover:text-brand">{lbl}</button>)}
      </div>

      {/* what am I looking at */}
      <Sec id="s-about" title="מה אני רואה?" icon={<Lightbulb className="size-4" style={{ color: c }} />}>
        <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3.5"><p className="text-[14px] leading-relaxed text-slate-800">{t.beginner}</p></div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl bg-emerald-50/60 p-3"><div className="mb-1 text-[11px] font-bold uppercase text-emerald-600">מתי להשתמש</div><p className="text-[12.5px] leading-relaxed text-slate-700">{t.whenUse}</p></div>
          <div className="rounded-xl bg-rose-50/60 p-3"><div className="mb-1 text-[11px] font-bold uppercase text-rose-600">מתי לא</div><p className="text-[12.5px] leading-relaxed text-slate-700">{t.whenNot}</p></div>
        </div>
        <details className="group mt-2 rounded-xl border border-slate-200 bg-slate-50/60 p-3">
          <summary className="flex cursor-pointer items-center gap-1.5 text-[12px] font-bold text-slate-600"><ChevronDown className="size-3.5 transition-transform group-open:rotate-180" />הסבר ליועץ (טכני)</summary>
          <div className="mt-2 space-y-2">
            <p className="text-[13px] leading-relaxed text-slate-600">{t.consultant}</p>
            <p className="text-[12.5px] leading-relaxed text-slate-500"><span className="font-bold text-slate-600">טכני: </span>{t.descTech}</p>
            <p className="text-[12.5px] leading-relaxed text-slate-500"><span className="font-bold text-slate-600">תהליך: </span>{t.process}</p>
            {t.prereq?.length ? <p className="text-[12.5px] text-slate-500"><span className="font-bold text-slate-600">דרישות מקדימות: </span>{t.prereq.join(" · ")}</p> : null}
            <div className="flex flex-wrap gap-1.5 pt-1">{t.users.map((u) => <span key={u} className="rounded-md px-1.5 py-0.5 text-[10.5px] font-bold" style={{ background: c + "14", color: c }}>{u}</span>)}</div>
          </div>
        </details>
      </Sec>

      {/* business process timeline */}
      {timeline.length > 1 && (
        <Sec id="s-flow" title="ציר התהליך העסקי" icon={<Route className="size-4" style={{ color: c }} />} sub="✔ קודם · ▶ אתה כאן · ○ הבא — לחץ שלב למעבר">
          <ProcessTimeline steps={timeline} accent={c} />
        </Sec>
      )}

      {/* recommended next actions */}
      {rec.length > 0 && (
        <Sec id="s-rec" title="המשך מומלץ — רוב היועצים ממשיכים ל" icon={<Sparkles className="size-4 text-amber-500" />}>
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {rec.map((r) => { const ex = txExists(r.code) || !!registryTx(r.code); const inner = (
              <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-3 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-sm">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg text-white" style={{ background: c }}><Terminal className="size-4" /></span>
                <div className="min-w-0"><div className="font-mono text-[13px] font-extrabold text-slate-800" dir="ltr">{r.code}</div><div className="text-[11px] text-slate-500">{r.reason}</div></div>
              </div>
            ); return ex ? <Link key={r.code} href={`/tcode/${encodeURIComponent(r.code)}/`}>{inner}</Link> : <div key={r.code} className="opacity-70">{inner}</div>; })}
          </div>
        </Sec>
      )}

      {/* relationship explorer */}
      <Sec id="s-rel" title="חוקר קשרים" icon={<Boxes className="size-4" style={{ color: c }} />} sub="הכול לחיץ — טבלאות, טרנזקציות ואובייקטים טכניים">
        <div className="space-y-2.5">
          <RelRow label="שלב קודם" items={[...new Set([...t.before, ...leadIn])]} />
          <RelRow label="שלב הבא" items={t.after} />
          <RelRow label="נפוץ יחד" items={t.together} />
          <RelRow label="דומות" items={t.similar} />
          <RelRow label="חלופות" items={t.alternative} />
          <RelRow label="מיושנות" items={t.obsolete} />
        </div>
        {relCards.length > 0 && <div className="mt-4 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
          {relCards.map((card) => (
            <div key={card.label} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
              <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase" style={{ color: card.color }}>{card.icon}{card.label}</div>
              {card.objHref
                ? <div className="flex flex-wrap gap-1.5">{card.items.map((n) => <Link key={n} href={`/object/${encodeURIComponent(n)}/`} className="tech rounded-lg bg-white px-2 py-0.5 text-[11px] font-bold text-slate-600 ring-1 ring-slate-200 hover:text-brand hover:ring-brand/40" dir="ltr">{n}</Link>)}</div>
                : <Chips items={card.items} color={card.color} ltr={card.ltr} />}
            </div>
          ))}
        </div>}
      </Sec>

      {/* consultant notes */}
      <Sec id="s-notes" title="הערות יועץ" icon={<Wrench className="size-4" style={{ color: c }} />} sub="טעויות · שגיאות · Best Practices · OSS">
        <div className="grid gap-3 md:grid-cols-2">
          {t.commonErrors.length > 0 && <div><div className="eyebrow mb-1 text-rose-500">שגיאות נפוצות</div><List items={t.commonErrors} color="#dc2626" /></div>}
          {t.mistakes.length > 0 && <div><div className="eyebrow mb-1 text-amber-600">טעויות נפוצות</div><List items={t.mistakes} color="#d97706" /></div>}
          {t.bestPractices.length > 0 && <div><div className="eyebrow mb-1 text-emerald-600">Best Practices</div><List items={t.bestPractices} color="#16a34a" /></div>}
          {t.certTips && <div><div className="eyebrow mb-1 text-slate-500">טיפ הסמכה</div><p className="text-[13px] leading-relaxed text-slate-600">{t.certTips}</p></div>}
        </div>
        {t.ossKeywords.length > 0 && <div className="mt-3"><div className="eyebrow mb-1 text-amber-600"><FileText className="me-1 inline size-3" />OSS · SAP Notes — מילות חיפוש</div><Chips items={t.ossKeywords} color="#b45309" ltr /></div>}
      </Sec>

      {/* interview */}
      {t.interview.length > 0 && (
        <Sec id="s-interview" title="ראיון · הסמכה · שאלות נפוצות" icon={<GraduationCap className="size-4" style={{ color: c }} />}>
          <List items={t.interview} color={c} />
        </Sec>
      )}

      <div className="flex flex-wrap gap-2 pb-4">
        <Link href="/transactions/" className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2 text-[12px] font-bold text-white"><Terminal className="size-4" />מרכז טרנזקציות</Link>
        <Link href={`/graph/?node=${encodeURIComponent(t.code)}`} className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-[12px] font-bold text-slate-600 hover:bg-slate-200"><GitBranch className="size-4" />גרף</Link>
        <Link href={t.module.startsWith("PM") ? "/pm/" : t.module.startsWith("PP") ? "/pp-pi/" : "/sap-infrastructure/"} className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-[12px] font-bold text-slate-600 hover:bg-slate-200"><Workflow className="size-4" />מודול {t.module}</Link>
        <Link href="/security/" className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-[12px] font-bold text-slate-600 hover:bg-slate-200"><ArrowRightLeft className="size-4" />אבטחה</Link>
      </div>
      <p className="pb-6 text-center text-[11px] text-slate-400">ידע טרנזקציות SAP סטנדרטי · trust: curated — קודים ואובייקטים אמיתיים בלבד.</p>
    </div>
  );
}
