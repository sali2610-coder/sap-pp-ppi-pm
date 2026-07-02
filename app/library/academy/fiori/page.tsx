"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, Search, ExternalLink, X, Terminal, Database, Sigma, ShieldCheck, Target, Briefcase, CheckCircle2, GraduationCap, ArrowLeft } from "lucide-react";
import APPS from "@/data/library/fiori-apps.json";
import { SEARCH_DOCS } from "@/data/library/academy-index";
import { FIORI, appObject } from "@/lib/apps-intel";
import { useI18n } from "@/lib/i18n";

interface App { id: string; name: string; type: string }
const ALL = APPS as App[];
const NV = "לא ידוע עדיין"; // never guess — say so
// verified curated Fiori metadata, keyed by App ID (from data/centers/fiori.ts)
const CURATED = Object.fromEntries(FIORI.map((f) => [f.appId, f]));

// which academy nodes reference each Fiori id (cross-link catalog → courses)
const REFS: Record<string, { base: string; ch: number; id: string }[]> = (() => {
  const m: Record<string, { base: string; ch: number; id: string }[]> = {};
  for (const d of SEARCH_DOCS) for (const code of d.codes.split(" ")) {
    if (/^F\d{3,5}/.test(code)) (m[code] = m[code] || []).push({ base: d.base, ch: d.ch, id: d.id });
  }
  return m;
})();

const typeTint: Record<string, string> = {
  Transactional: "bg-brand/10 text-brand", Analytical: "bg-emerald-500/15 text-emerald-700",
  "Fact Sheet": "bg-amber-500/15 text-amber-700", "Web Dynpro": "bg-violet-500/15 text-violet-700",
};
const pad = (n: number) => String(n).padStart(2, "0");

export default function FioriIndex() {
  const { lang } = useI18n();
  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [sel, setSel] = useState<App | null>(null);
  const types = useMemo(() => [...new Set(ALL.map((a) => a.type))].sort(), []);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return ALL.filter((a) => (!type || a.type === type) && (!term || a.id.toLowerCase().includes(term) || a.name.toLowerCase().includes(term)))
      .slice(0, 400);
  }, [q, type]);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/library/academy/" className="text-brand hover:underline">{lang === "he" ? "אקדמיה" : "Academy"}</Link><span>/</span>
        <span>{lang === "he" ? "אינדקס Fiori" : "Fiori index"}</span>
      </nav>

      <section dir="rtl" className="glass rounded-2xl p-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand"><LayoutGrid className="size-3.5" />{lang === "he" ? "אינדקס אפליקציות Fiori" : "SAP Fiori Apps Index"}</span>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">{lang === "he" ? "מדריך מהיר ל-Fiori — אינדקס מחיפוש" : "SAP Fiori Apps — Quick Reference Index"}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{ALL.length} {lang === "he" ? "אפליקציות · מזהה · שם · סוג · קישור לקורסי האקדמיה" : "apps · id · name · type · linked to academy courses"}</p>
        <div className="mt-3 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5">
          <Search className="size-5 text-muted-foreground" />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} dir="ltr" placeholder={lang === "he" ? "חפש F#### או שם אפליקציה..." : "Search F#### or app name..."} className="w-full bg-transparent text-base outline-none" />
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          <button onClick={() => setType("")} className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold ${type === "" ? "bg-brand text-brand-foreground" : "bg-muted text-muted-foreground"}`}>{lang === "he" ? "הכל" : "All"}</button>
          {types.map((t) => (
            <button key={t} onClick={() => setType(t)} className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold ${type === t ? "bg-brand text-brand-foreground" : "bg-muted text-muted-foreground"}`}>{t}</button>
          ))}
        </div>
      </section>

      <p dir="rtl" className="text-center text-xs text-muted-foreground">{results.length}{results.length >= 400 ? "+" : ""} {lang === "he" ? "תוצאות" : "results"}</p>

      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {results.map((a) => {
          const refs = REFS[a.id]?.slice(0, 3) ?? [];
          return (
            <button key={a.id} onClick={() => setSel(a)} dir="ltr" className="tap glass block w-full rounded-xl p-3 text-left transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]">
              <div className="flex items-center gap-2">
                <span className="tech rounded bg-brand/10 px-1.5 py-0.5 text-xs font-bold text-brand">{a.id}</span>
                <span className={`rounded px-1.5 py-0 text-[9px] font-bold ${typeTint[a.type] ?? "bg-muted"}`}>{a.type}</span>
                {CURATED[a.id] && <span className="ms-auto rounded bg-emerald-500/15 px-1.5 py-0 text-[9px] font-bold text-emerald-700">מפורט</span>}
              </div>
              <p className="mt-1 text-sm font-semibold">{a.name}</p>
              {refs.length > 0 && (
                <div dir="rtl" className="mt-1.5 flex flex-wrap gap-1">
                  {refs.map((r, i) => (
                    <span key={i} className="inline-flex items-center gap-0.5 rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                      <ExternalLink className="size-2.5" />{r.base.split("/").pop()?.replace("-academy", "").toUpperCase()} {r.id}
                    </span>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence>{sel && <FioriDetail app={sel} onClose={() => setSel(null)} />}</AnimatePresence>
    </motion.div>
  );
}

function FioriDetail({ app, onClose }: { app: App; onClose: () => void }) {
  const cf = CURATED[app.id];               // verified curated metadata (or undefined)
  const gui = cf?.gui?.[0];
  const obj = gui ? appObject(gui) : null;  // join GUI T-code → tx-intel deep data
  const t = obj?.intel;
  const refs = REFS[app.id]?.slice(0, 4) ?? [];

  const Row = ({ icon, c, label, children }: { icon: React.ReactNode; c: string; label: string; children: React.ReactNode }) => (
    <div className="border-t border-slate-100 px-5 py-3">
      <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide" style={{ color: c }}>{icon}{label}</div>
      <div className="text-[12.5px] leading-relaxed text-slate-600">{children}</div>
    </div>
  );
  const NVspan = <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[11px] font-bold text-amber-600">{NV}</span>;

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm lg:top-[4.25rem]" onClick={onClose} />
      <motion.div dir="rtl" role="dialog" aria-label={`פרטי ${app.id}`}
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", stiffness: 360, damping: 36 }}
        className="fixed inset-x-0 bottom-0 z-[61] flex max-h-[88%] flex-col overflow-hidden rounded-t-[1.75rem] border-t border-slate-200 bg-white shadow-2xl lg:inset-y-auto lg:top-[4.25rem] lg:bottom-0 lg:left-auto lg:right-0 lg:max-h-none lg:w-[460px] lg:max-w-[42vw] lg:rounded-none lg:rounded-s-[1.75rem] lg:border-s lg:border-t-0">
        <div className="mx-auto mt-2 h-1.5 w-11 shrink-0 rounded-full bg-slate-200 lg:hidden" />
        <div className="shrink-0 px-5 py-3.5 text-white" style={{ background: "linear-gradient(135deg,#7c3aed,#5b21b6)" }}>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2"><LayoutGrid className="size-5" /><span className="tech font-mono text-2xl font-extrabold" dir="ltr">{app.id}</span><span className="rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-bold">{app.type}</span></div>
              <p className="mt-1 text-sm font-semibold text-white/90">{app.name}</p>
            </div>
            <button onClick={onClose} aria-label="סגור" className="tap grid size-9 shrink-0 place-items-center rounded-xl bg-white/15 ring-1 ring-white/25 active:scale-90"><X className="size-5" /></button>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-auto">
          <Row icon={<Target className="size-3.5" />} c="#2563eb" label="מה האפליקציה עושה">{t?.beginner || (cf ? `אפליקציית Fiori — ${app.name}.` : NVspan)}</Row>
          <Row icon={<Briefcase className="size-3.5" />} c="#7c3aed" label="תהליך עסקי · מי משתמש">{t ? `${t.process || t.area}${t.users?.length ? ` · ${t.users.join(", ")}` : ""}` : cf ? `מודול ${cf.module}${cf.role ? ` · תפקיד ${cf.role}` : ""}` : NVspan}</Row>
          <Row icon={<CheckCircle2 className="size-3.5" />} c="#16a34a" label="מתי להשתמש">{t?.whenUse || NVspan}</Row>
          <Row icon={<Terminal className="size-3.5" />} c="#475569" label="מקבילה / רקע ב-ECC (GUI)">
            {cf?.gui?.length ? <span className="flex flex-wrap gap-1.5">{cf.gui.map((g) => appObject(g) ? <Link key={g} href={`/apps/${encodeURIComponent(g)}/`} className="tech rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-slate-700 hover:bg-brand/10 hover:text-brand" dir="ltr">{g}</Link> : <span key={g} className="tech rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-slate-600" dir="ltr">{g}</span>)}</span> : NVspan}
          </Row>
          <Row icon={<ShieldCheck className="size-3.5" />} c="#dc2626" label="Business Role · Catalog">{cf ? <span className="space-y-0.5"><span className="block">Role: <span className="tech font-mono text-slate-700" dir="ltr">{cf.role || NV}</span></span><span className="block">Catalog: <span className="tech font-mono text-slate-700" dir="ltr">{cf.catalog || NV}</span></span></span> : NVspan}</Row>
          <Row icon={<Sigma className="size-3.5" />} c="#0891b2" label="OData · CDS · טבלאות">{cf || t ? <span className="space-y-0.5"><span className="block">OData: <span className="tech font-mono text-slate-700" dir="ltr">{cf?.odata || NV}</span></span><span className="block">CDS: <span className="tech font-mono text-slate-700" dir="ltr">{cf?.cds || (t?.cds?.join(", ")) || NV}</span></span>{t?.tables?.length ? <span className="block">טבלאות: <span className="tech font-mono text-slate-700" dir="ltr">{t.tables.slice(0, 6).join(", ")}</span></span> : null}</span> : NVspan}</Row>
          <Row icon={<GraduationCap className="size-3.5" />} c="#d97706" label="מה יועץ זוטר יבדוק קודם">
            <ul className="space-y-1">
              <li>• ודא ש-Business Role מוקצה למשתמש ב-PFCG, וש-Business Catalog משויך ל-Launchpad.</li>
              <li>• ודא ש-OData service פעיל (/IWFND/MAINT_SERVICE) ושה-tile מופיע.</li>
              {gui && appObject(gui) ? <li>• השווה תוצאה מול הטרנזקציה הקלאסית <Link href={`/apps/${encodeURIComponent(gui)}/`} className="tech font-mono font-bold text-brand" dir="ltr">{gui}</Link> ב-GUI.</li> : null}
            </ul>
          </Row>
          {refs.length > 0 && (
            <Row icon={<ExternalLink className="size-3.5" />} c="#0369a1" label="קורסי אקדמיה קשורים">
              <div className="flex flex-wrap gap-1.5">{refs.map((r, i) => <Link key={i} href={`${r.base}/chapter-${pad(r.ch)}/#sub-${r.id}`} className="inline-flex items-center gap-0.5 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600 hover:text-brand">{r.base.split("/").pop()?.replace("-academy", "").toUpperCase()} {r.id}</Link>)}</div>
            </Row>
          )}
          {!cf && <div className="px-5 py-3 text-[11px] leading-relaxed text-slate-400">אפליקציה זו קיימת באינדקס אך טרם תועדה לעומק. הפרטים הטכניים המדויקים — <b>{NV}</b>. למידע מאומת ראה את קורסי האקדמיה או חפש את הטרנזקציה המקבילה במרכז האפליקציות.</div>}
        </div>
        {gui && appObject(gui) && (
          <div className="shrink-0 border-t border-slate-100 p-3">
            <Link href={`/apps/${encodeURIComponent(gui)}/`} onClick={onClose} className="tap flex items-center justify-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-[13px] font-extrabold text-white shadow-sm active:scale-95"><ArrowLeft className="size-4" />עמוד האובייקט המלא · {gui}</Link>
          </div>
        )}
      </motion.div>
    </>
  );
}
