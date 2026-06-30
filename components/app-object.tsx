"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal, LayoutGrid, ArrowLeft, ArrowDown, Target, Briefcase, GraduationCap, Wrench, AlertTriangle,
  CheckCircle2, GitBranch, Database, Sigma, Plug, Boxes, ShieldCheck, FlaskConical, Network, GitCompare,
  Sparkles, X, Lightbulb, Route, RefreshCw, ExternalLink, Code2,
} from "lucide-react";
import { SapTip } from "@/components/sap-tip";
import { criticality, type AppObject } from "@/lib/apps-intel";
import { PracticalLayer } from "@/components/app-practical";

const MOD_C: Record<string, string> = { PM: "#f97316", "PP-PI": "#6d28d9", PP: "#6d28d9", QM: "#0d9488", MM: "#2563eb", FI: "#16a34a", CO: "#d97706", SD: "#0891b2", PS: "#be185d" };
const mc = (m: string) => MOD_C[m] || MOD_C[(m || "").split(/[ /-]/)[0]] || "#475569";
const STATUS_C: Record<string, string> = { Active: "#16a34a", Deprecated: "#d97706", Obsolete: "#dc2626" };
const IMPACT_C: Record<string, string> = { None: "#16a34a", Low: "#0891b2", Medium: "#d97706", High: "#dc2626" };

function Section({ id, icon, title, sub, accent, children }: { id: string; icon: React.ReactNode; title: string; sub?: string; accent: string; children: React.ReactNode }) {
  return (
    <motion.section id={id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-5 shadow-[var(--elev-1)] sm:p-6">
      <div className="mb-4 flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl text-white shadow-sm" style={{ background: accent }}>{icon}</span>
        <div><h2 className="text-lg font-extrabold tracking-tight text-slate-900">{title}</h2>{sub && <p className="text-[11.5px] text-slate-400">{sub}</p>}</div>
      </div>
      {children}
    </motion.section>
  );
}

// object chip → routes to the right explorer; hover = SapTip mentor
function Chip({ name, kind }: { name: string; kind: "table" | "cds" | "bapi" | "tcode" | "raw" }) {
  const href = kind === "table" ? `/object/${encodeURIComponent(name)}/` : kind === "cds" ? `/cds/${encodeURIComponent(name)}/` : kind === "bapi" ? `/bapi/${encodeURIComponent(name)}/` : kind === "tcode" ? `/apps/${encodeURIComponent(name)}/` : "";
  const cls = "tech rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-slate-600 transition hover:bg-brand/10 hover:text-brand";
  if (!href) return <span className={cls} dir="ltr">{name}</span>;
  const inner = <Link href={href} className={cls} dir="ltr">{name}</Link>;
  return kind === "raw" ? inner : <SapTip name={name} bare>{inner}</SapTip>;
}

function ChipRow({ icon, label, items, kind, color }: { icon: React.ReactNode; label: string; items?: string[]; kind: "table" | "cds" | "bapi" | "tcode" | "raw"; color: string }) {
  if (!items || !items.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase" style={{ color }}>{icon}{label}</span>
      {items.map((x) => <Chip key={x} name={x} kind={kind} />)}
    </div>
  );
}

const PERSONAS = [
  { id: "beginner", he: "למתחיל", icon: GraduationCap, c: "#16a34a", field: "beginner" as const },
  { id: "qa", he: "ל-QA", icon: FlaskConical, c: "#be185d", field: "qa" as const },
  { id: "consultant", he: "ליועץ פונקציונלי", icon: Briefcase, c: "#7c3aed", field: "consultant" as const },
  { id: "tech", he: "ליועץ טכני", icon: Code2, c: "#2563eb", field: "descTech" as const },
  { id: "biz", he: "עם דוגמה עסקית", icon: Lightbulb, c: "#d97706", field: "biz" as const },
];

export function AppObjectPage({ o }: { o: AppObject }) {
  const t = o.intel;
  const c = mc(t.module);
  const crit = criticality(o);
  const [persona, setPersona] = useState("consultant");
  const [compare, setCompare] = useState(false);
  const fiori = o.fiori[0];

  const personaText = (() => {
    switch (persona) {
      case "beginner": return t.beginner;
      case "qa": return [...(t.bestPractices || []), ...(t.commonErrors || []).map((e) => `ודא טיפול בתרחיש: ${e}`)].join(" · ") || t.consultant;
      case "tech": return t.descTech;
      case "biz": return t.process ? `דוגמה מהתהליך: ${t.process}` : t.whenUse;
      default: return t.consultant;
    }
  })();

  const flow = (t.process || "").split(/[→>]/).map((s) => s.trim()).filter(Boolean);
  const NAV = [
    { label: "לפני", items: t.before, c: "#64748b" },
    { label: "אחרי", items: t.after, c: "#16a34a" },
    { label: "דומה", items: t.similar, c: "#0891b2" },
    { label: "יחד עם", items: t.together, c: "#7c3aed" },
    { label: "חלופה", items: t.alternative, c: "#d97706" },
    { label: "הוחלף ע\"י", items: t.obsolete, c: "#dc2626" },
  ].filter((n) => n.items && n.items.length);

  // section anchors present (for sticky nav)
  const anchors = [
    ["identity", "זהות"], (fiori || t.fiori) && ["successor", "יורש"], ["purpose", "מטרה"], flow.length && ["flow", "תהליך"],
    NAV.length && ["nav", "ניווט"],
    ["screens", "מסכים"], flow.length && ["flowprev", "זרימה"], ["paths", "נתיבים"], ["wheremap", "איפה אני"], ["tips", "טיפים"],
    (t.tables || t.cds || t.bapis || t.classes) && ["tech", "טכני"], fiori && ["fiori", "Fiori"],
    t.authObjects?.length && ["auth", "הרשאות"], ["testing", "בדיקות"], t.commonErrors?.length && ["errors", "שגיאות"],
    ["migration", "מיגרציה"], NAV.length && ["related", "קשרים"], fiori && ["compare", "השוואה"], ["ai", "עוזר"],
  ].filter(Boolean) as [string, string][];

  return (
    <div dir="rtl" className="mx-auto max-w-[1500px] space-y-4 pb-10">
      {/* breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/apps/" className="hover:text-brand">מרכז אפליקציות וטרנזקציות</Link><ArrowLeft className="size-3" />
        <span className="font-bold text-slate-700">{o.code}</span>
      </div>

      {/* ── SECTION 1 · Identity hero ── */}
      <section id="identity" className="relative overflow-hidden rounded-[2rem] p-6 text-white shadow-[0_30px_60px_-24px_rgba(15,23,42,0.5)] sm:p-8" style={{ background: `linear-gradient(135deg, ${c}, ${c}cc 60%, #0f172a)` }}>
        <div className="pointer-events-none absolute -left-16 -top-16 size-64 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-bold backdrop-blur">{t.module} · {t.area}</span>
            <span className="rounded-full px-2.5 py-1 text-[11px] font-bold text-white" style={{ background: STATUS_C[o.lc.status] }}>{o.lc.status}</span>
            <span className="rounded-full px-2.5 py-1 text-[11px] font-bold" style={{ background: crit.level === "high" ? "#dc2626" : crit.level === "medium" ? "#d97706" : "rgba(255,255,255,0.2)" }}>{crit.he}</span>
          </div>
          <h1 className="tech mt-3 text-5xl font-extrabold tracking-tight sm:text-6xl" dir="ltr">{o.code}</h1>
          <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-white/90">{t.descHe}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-[12px] font-bold">
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 px-3 py-1.5 backdrop-blur"><Terminal className="size-3.5" />SAP GUI {o.lc.ecc ? "· ECC" : ""} {o.lc.s4 ? "· S/4" : ""}</span>
            {fiori && <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 px-3 py-1.5 backdrop-blur"><LayoutGrid className="size-3.5" />Fiori: {fiori.app}</span>}
          </div>
        </div>
      </section>

      {/* sticky section nav */}
      <div className="chip-rail sticky top-[4.25rem] z-20 -mx-1 overflow-x-auto rounded-2xl border border-slate-200 bg-white/90 px-2 py-1.5 shadow-sm backdrop-blur">
        <div className="flex gap-1">
          {anchors.map(([id, he]) => <a key={id} href={`#${id}`} className="shrink-0 rounded-lg px-2.5 py-1 text-[11.5px] font-bold text-slate-500 transition hover:bg-slate-100 hover:text-brand">{he}</a>)}
        </div>
      </div>

      {/* ── SECTION 2 · Successor ── */}
      {(fiori || t.fiori) && (
        <Section id="successor" icon={<Route className="size-5" />} title="היורש המומלץ" sub="מסלול האבולוציה של האובייקט" accent={c}>
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-center"><div className="text-[10px] font-bold text-slate-400">ECC GUI</div><div className="tech text-lg font-extrabold text-slate-800" dir="ltr">{o.code}</div></div>
            <ArrowLeft className="size-5 text-slate-300" />
            <div className="rounded-2xl border-2 px-4 py-3 text-center" style={{ borderColor: STATUS_C[o.lc.status] + "55", background: STATUS_C[o.lc.status] + "0c" }}><div className="text-[10px] font-bold text-slate-400">S/4HANA</div><div className="text-[13px] font-extrabold" style={{ color: STATUS_C[o.lc.status] }}>{o.lc.s4 ? (o.lc.alt || o.code) : "הוסר"}</div></div>
            {(fiori || t.fiori) && <><ArrowLeft className="size-5 text-slate-300" /><div className="rounded-2xl border-2 border-amber-200 bg-amber-50 px-4 py-3 text-center"><div className="text-[10px] font-bold text-amber-600">Fiori</div><div className="text-[13px] font-extrabold text-amber-700">{fiori?.app || t.fiori}</div>{fiori?.appId && <div className="tech text-[10px] font-bold text-amber-500" dir="ltr">{fiori.appId}</div>}</div></>}
          </div>
          {o.fiori.length > 1 && <div className="mt-3 flex flex-wrap gap-1.5"><span className="text-[10px] font-bold uppercase text-slate-400">אפליקציות נוספות:</span>{o.fiori.slice(1).map((f) => <span key={f.appId} className="rounded-md bg-amber-50 px-1.5 py-0.5 text-[11px] font-bold text-amber-700">{f.app} ({f.appId})</span>)}</div>}
        </Section>
      )}

      {/* ── SECTION 3 · Business Purpose ── */}
      <Section id="purpose" icon={<Target className="size-5" />} title="מטרה עסקית" accent={c}>
        <div className="grid gap-3 md:grid-cols-2">
          {t.beginner && <Info icon={<GraduationCap className="size-4" />} c="#16a34a" label="מה זה עושה (פשוט)" text={t.beginner} />}
          {t.consultant && <Info icon={<Briefcase className="size-4" />} c="#7c3aed" label="מבט יועץ" text={t.consultant} />}
          {t.whenUse && <Info icon={<CheckCircle2 className="size-4" />} c="#0891b2" label="מתי להשתמש" text={t.whenUse} />}
          {t.whenNot && <Info icon={<X className="size-4" />} c="#dc2626" label="מתי לא" text={t.whenNot} />}
        </div>
      </Section>

      {/* ── SECTION 4 · Business Flow ── */}
      {flow.length > 0 && (
        <Section id="flow" icon={<Network className="size-5" />} title="תהליך עסקי" sub="היכן האובייקט חי בתהליך" accent={c}>
          <div className="flex flex-wrap items-center gap-2">
            {flow.map((step, i) => { const hot = step.toUpperCase().includes(o.code); return (
              <div key={i} className="flex items-center gap-2">
                <span className={`rounded-xl border-2 px-3 py-2 text-[12px] font-bold ${hot ? "text-white shadow-sm" : "border-slate-200 bg-slate-50 text-slate-600"}`} style={hot ? { background: c, borderColor: c } : undefined}>{step}</span>
                {i < flow.length - 1 && <ArrowLeft className="size-4 shrink-0 text-slate-300" />}
              </div>
            ); })}
          </div>
        </Section>
      )}

      {/* ── SECTION 5 · Navigation ── */}
      {NAV.length > 0 && (
        <Section id="nav" icon={<GitBranch className="size-5" />} title="ניווט — לאן ממשיכים" sub="לחיץ — נע בין אובייקטים" accent={c}>
          <div className="space-y-2">{NAV.map((n) => <ChipRow key={n.label} icon={<ArrowDown className="size-3" />} label={n.label} items={n.items} kind="tcode" color={n.c} />)}</div>
        </Section>
      )}

      {/* ── Practical learning layer (screens · flow · paths · where-am-I · tips) ── */}
      <PracticalLayer o={o} accent={c} />

      {/* ── SECTION 6 · Technical ── */}
      {(t.tables?.length || o.cdsViews.length || t.bapis?.length || t.classes?.length || t.badis?.length || t.userExits?.length || t.enhancements?.length) ? (
        <Section id="tech" icon={<Database className="size-5" />} title="מידע טכני" sub="מאומת — קישור לחוקרים" accent={c}>
          <div className="space-y-2.5">
            <ChipRow icon={<Database className="size-3" />} label="טבלאות" items={t.tables} kind="table" color="#0891b2" />
            {o.cdsViews.length > 0 && <ChipRow icon={<Sigma className="size-3" />} label="CDS" items={o.cdsViews.map((v) => v.view)} kind="cds" color="#16a34a" />}
            <ChipRow icon={<Plug className="size-3" />} label="BAPIs / FMs" items={t.bapis} kind="bapi" color="#2563eb" />
            <ChipRow icon={<Boxes className="size-3" />} label="Classes" items={t.classes} kind="raw" color="#475569" />
            <ChipRow icon={<Wrench className="size-3" />} label="BAdIs" items={t.badis} kind="raw" color="#7c3aed" />
            <ChipRow icon={<Wrench className="size-3" />} label="User Exits" items={t.userExits} kind="raw" color="#7c3aed" />
            <ChipRow icon={<Wrench className="size-3" />} label="Enhancements" items={t.enhancements} kind="raw" color="#7c3aed" />
          </div>
        </Section>
      ) : null}

      {/* ── SECTION 7 · Fiori ── */}
      {fiori && (
        <Section id="fiori" icon={<LayoutGrid className="size-5" />} title="Fiori" sub={fiori.app} accent="#d97706">
          <div className="grid gap-2.5 sm:grid-cols-2">
            {[["App ID", fiori.appId], ["App Name", fiori.app], ["Business Role", fiori.role], ["Business Catalog", fiori.catalog], ["OData Service", fiori.odata], ["CDS Source", fiori.cds], ["Backend (GUI)", fiori.gui.join(" / ")]].filter(([, v]) => v).map(([k, v]) => (
              <div key={k} className="rounded-xl border border-slate-200 bg-slate-50/60 p-3"><div className="text-[10px] font-bold uppercase text-slate-400">{k}</div><div className="tech mt-0.5 break-words text-[13px] font-bold text-slate-800" dir="ltr">{v}</div></div>
            ))}
          </div>
        </Section>
      )}

      {/* ── SECTION 8 · Authorizations ── */}
      {t.authObjects?.length ? (
        <Section id="auth" icon={<ShieldCheck className="size-5" />} title="הרשאות" sub="אובייקטי הרשאה + תקלות נפוצות" accent="#dc2626">
          <ChipRow icon={<ShieldCheck className="size-3" />} label="Auth Objects" items={t.authObjects} kind="raw" color="#dc2626" />
          <p className="mt-3 flex gap-1.5 text-[12px] leading-relaxed text-slate-500"><AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-amber-500" />כשל הרשאה אופייני: בדוק SU53 מיד אחרי השגיאה, ואז STAUTHTRACE לאיתור האובייקט החסר. ודא הקצאת תפקיד (PFCG){fiori ? ` + Business Catalog ${fiori.catalog || ""} ל-Fiori` : ""}.</p>
        </Section>
      ) : null}

      {/* ── SECTION 10 · Testing (QA) ── */}
      <Section id="testing" icon={<FlaskConical className="size-5" />} title="בדיקות (QA)" sub="תרחישים מתוך המטא-דאטה המאומת" accent="#be185d">
        <div className="grid gap-3 md:grid-cols-2">
          {t.whenUse && <QA icon={<CheckCircle2 className="size-4" />} c="#16a34a" label="תרחיש חיובי" items={[t.whenUse]} />}
          {t.commonErrors?.length ? <QA icon={<AlertTriangle className="size-4" />} c="#dc2626" label="תרחישים שליליים / גבול" items={t.commonErrors} /> : null}
          {t.authObjects?.length ? <QA icon={<ShieldCheck className="size-4" />} c="#7c3aed" label="בדיקת הרשאות" items={[`ודא גישה דרך ${t.authObjects.join(", ")} + תפקיד PFCG`]} /> : null}
          {(fiori || t.before?.length) ? <QA icon={<RefreshCw className="size-4" />} c="#0891b2" label="רגרסיה / אינטגרציה" items={[fiori ? `השווה תוצאת ${o.code} (GUI) מול ${fiori.app} (Fiori)` : "", t.before?.length ? `ודא רצף תקין: ${t.before.join("→")}→${o.code}` : ""].filter(Boolean)} /> : null}
          {t.bestPractices?.length ? <QA icon={<CheckCircle2 className="size-4" />} c="#0d9488" label="מה תמיד לוודא" items={t.bestPractices} /> : null}
        </div>
      </Section>

      {/* ── SECTION 11 · Common Errors ── */}
      {t.commonErrors?.length ? (
        <Section id="errors" icon={<AlertTriangle className="size-5" />} title="שגיאות נפוצות" sub="תסמין · גורם · OSS" accent="#dc2626">
          <div className="space-y-1.5">
            {t.commonErrors.map((e) => <div key={e} className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 text-[12.5px] text-slate-700"><AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-rose-500" />{e}</div>)}
          </div>
          {t.mistakes?.length ? <div className="mt-3"><div className="mb-1 text-[10px] font-bold uppercase text-slate-400">טעויות נפוצות</div><div className="flex flex-wrap gap-1.5">{t.mistakes.map((m) => <span key={m} className="rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-700">{m}</span>)}</div></div> : null}
          {t.ossKeywords?.length ? <div className="mt-3 flex flex-wrap items-center gap-1.5"><span className="text-[10px] font-bold uppercase text-slate-400">חיפוש OSS:</span>{t.ossKeywords.map((k) => <span key={k} className="tech rounded bg-slate-100 px-1.5 py-0.5 text-[10.5px] font-bold text-slate-500" dir="ltr">{k}</span>)}</div> : null}
        </Section>
      ) : null}

      {/* ── SECTION 12 · Migration ── */}
      <Section id="migration" icon={<RefreshCw className="size-5" />} title="מיגרציה ECC → S/4HANA" accent="#2563eb">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full px-3 py-1.5 text-[12px] font-bold text-white" style={{ background: STATUS_C[o.lc.status] }}>{o.lc.status}</span>
          <span className="rounded-full px-3 py-1.5 text-[12px] font-bold text-white" style={{ background: IMPACT_C[o.lc.impact] }}>השפעה: {o.lc.impact}</span>
          {o.lc.alt && <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[12px] font-bold text-slate-600">חלופה: {o.lc.alt}</span>}
        </div>
        {o.lc.simplification && <p className="mt-3 flex gap-1.5 text-[12.5px] text-slate-600"><Sparkles className="mt-0.5 size-3.5 shrink-0 text-violet-500" />{o.lc.simplification}</p>}
        <p className="mt-2 flex gap-1.5 text-[12.5px] leading-relaxed text-slate-600"><Route className="mt-0.5 size-3.5 shrink-0 text-blue-500" />{o.lc.migration}</p>
        {t.s4 && <p className="mt-2 text-[12.5px] leading-relaxed text-slate-500">{t.s4}</p>}
      </Section>

      {/* ── SECTION 13 · Related ── */}
      {NAV.length > 0 && (
        <Section id="related" icon={<Network className="size-5" />} title="אובייקטים קשורים" sub="המשך לחקור" accent={c}>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[...new Set([...(t.after || []), ...(t.together || []), ...(t.similar || [])])].slice(0, 12).map((code) => (
              <Link key={code} href={`/apps/${encodeURIComponent(code)}/`} className="group flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-md">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg text-white" style={{ background: c }}><Terminal className="size-4" /></span>
                <span className="tech flex-1 truncate font-mono text-[13px] font-extrabold text-slate-800 group-hover:text-brand" dir="ltr">{code}</span>
                <ArrowLeft className="size-3.5 shrink-0 text-slate-300 transition group-hover:text-brand" />
              </Link>
            ))}
          </div>
          <Link href={`/studio/`} className="mt-3 inline-flex items-center gap-1 text-[12px] font-bold text-brand">ראה במפת הקשרים החיה (Architecture Studio)<ArrowLeft className="size-3.5" /></Link>
        </Section>
      )}

      {/* ── SECTION 14 · Compare ── */}
      {fiori && (
        <Section id="compare" icon={<GitCompare className="size-5" />} title="השוואה — ECC מול Fiori" sub={`${o.code} מול ${fiori.app}`} accent="#0f172a">
          <button onClick={() => setCompare((v) => !v)} className="tap mb-3 inline-flex items-center gap-1.5 rounded-xl border-2 px-3 py-2 text-[12px] font-bold transition" style={{ borderColor: c, color: c }}><GitCompare className="size-4" />{compare ? "סגור השוואה" : "פתח השוואה"}</button>
          <AnimatePresence>{compare && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
              <div className="grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 text-[12px] sm:grid-cols-[140px_1fr_1fr]">
                {[
                  ["ממשק", "SAP GUI (Dynpro)", "SAPUI5 / Fiori"],
                  ["טכנולוגיה", "ABAP Dynpro · screens", `OData (${fiori.odata || "—"}) · CDS (${fiori.cds || "—"})`],
                  ["טבלאות", (t.tables || []).slice(0, 6).join(", ") || "—", (t.tables || []).slice(0, 6).join(", ") || "—"],
                  ["הרשאות", (t.authObjects || []).join(", ") || "—", `Business Role: ${fiori.role || "—"} · Catalog: ${fiori.catalog || "—"}`],
                  ["ניווט", "תפריט SAP / קוד טרנזקציה", "Launchpad · Tile · Semantic Object"],
                  ["Backend", o.code, fiori.gui.join(" / ")],
                  ["יתרון", "עומק פונקציונלי, מהיר למומחה", "UX מודרני, מובייל, role-based"],
                  ["מיגרציה", o.lc.migration.slice(0, 60), `החלפה ל-${fiori.app}; ודא Catalog/Role ב-PFCG`],
                ].map((row, i) => (
                  <div key={i} className="contents">
                    <div className="bg-slate-50 p-2.5 font-bold text-slate-500">{row[0]}</div>
                    <div className="bg-white p-2.5 text-slate-700">{row[1]}</div>
                    <div className="bg-amber-50/40 p-2.5 text-slate-700">{row[2]}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}</AnimatePresence>
        </Section>
      )}

      {/* ── SECTION 15 · AI Assistant ── */}
      <Section id="ai" icon={<Sparkles className="size-5" />} title="עוזר חכם" sub="הסבר מותאם — ממאגר הידע המאומת בלבד, ללא הזיות" accent="#0f172a">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {PERSONAS.map((p) => { const Ic = p.icon; const on = persona === p.id; return (
            <button key={p.id} onClick={() => setPersona(p.id)} className={`tap inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[12px] font-bold transition ${on ? "text-white shadow-sm" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`} style={on ? { background: p.c } : undefined}><Ic className="size-3.5" />{p.he}</button>
          ); })}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={persona} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 text-[13px] leading-relaxed text-slate-700">
            {personaText || "אין מידע ייעודי לפרסונה זו."}
          </motion.div>
        </AnimatePresence>
        <p className="mt-2 flex items-center gap-1 text-[10.5px] text-slate-400"><CheckCircle2 className="size-3 text-green-500" />כל התשובות נגזרות ישירות מהמטא-דאטה של {o.code} — לא מזיכרון AI כללי.</p>
      </Section>

      <div className="flex flex-wrap gap-2 pt-2">
        <Link href={`/tcode/${encodeURIComponent(o.code)}/`} className="inline-flex items-center gap-1.5 rounded-xl border-2 border-slate-200 px-4 py-2.5 text-[13px] font-bold text-slate-600 transition hover:border-brand/40 hover:text-brand"><ExternalLink className="size-4" />עמוד הטרנזקציה הקלאסי</Link>
        <Link href="/apps/" className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-[13px] font-extrabold text-white shadow-sm" style={{ background: c }}><ArrowLeft className="size-4" />חזרה למרכז</Link>
      </div>
    </div>
  );
}

function Info({ icon, c, label, text }: { icon: React.ReactNode; c: string; label: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4">
      <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide" style={{ color: c }}>{icon}{label}</div>
      <p className="text-[12.5px] leading-relaxed text-slate-600">{text}</p>
    </div>
  );
}

function QA({ icon, c, label, items }: { icon: React.ReactNode; c: string; label: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide" style={{ color: c }}>{icon}{label}</div>
      <ul className="space-y-1">{items.map((x, i) => <li key={i} className="flex gap-1.5 text-[12px] leading-relaxed text-slate-600"><span className="mt-1.5 size-1 shrink-0 rounded-full" style={{ background: c }} />{x}</li>)}</ul>
    </div>
  );
}
