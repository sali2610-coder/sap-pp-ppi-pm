"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Terminal, Wrench, GitCompare, AlertTriangle, Settings, Code, ChevronDown,
  AppWindow, BookOpen, ArrowLeft, Sparkles,
} from "lucide-react";
import type { SAPModuleData, SAPSheet } from "@/lib/types";
import { playTick } from "@/lib/sound";

type Kind = "tcodes" | "tools" | "ppvs" | "simplification" | "config" | "custom";

const META: Record<Kind, { icon: typeof Terminal; accent: string; label: string; intro: string }> = {
  tcodes: { icon: Terminal, accent: "#d62027", label: "טרנזקציות ודוחות", intro: "מדריך הטרנזקציות והדוחות המרכזיים של המודול — קוד, תיאור ושימוש. נקודת פתיחה מהירה לכל פעולה תפעולית." },
  tools: { icon: Wrench, accent: "#0891b2", label: "ערכת כלים · Applier & Basis", intro: "כלי המיישם וה-Basis — תצורה, ניטור, ותחזוקה טכנית של המודול." },
  ppvs: { icon: GitCompare, accent: "#6d28d9", label: "PP מול PP-PI", intro: "השוואת ייצור בדיד (PP) מול ייצור תהליכי (PP-PI) — הבדלים פונקציונליים מרכזיים שמשפיעים על העיצוב." },
  simplification: { icon: AlertTriangle, accent: "#d97706", label: "Simplification · SAP Notes", intro: "רשימת ה-Simplification של S/4HANA — שינויים, SAP Notes והשפעת מיגרציה. קריטי לתכנון ה-conversion." },
  config: { icon: Settings, accent: "#475569", label: "Config Guide · SPRO", intro: "נתיבי הקונפיגורציה המרכזיים (SPRO) של המודול — להגדרה ולאימות." },
  custom: { icon: Code, accent: "#2563eb", label: "Custom Code · Exits / BAdIs", intro: "בדיקת קוד מותאם — User Exits, BAdIs ונקודות הרחבה לבחינה לפני מיגרציה." },
};

const isCode = (v: string) => /^[A-Z][A-Z0-9_/.]{1,}$/.test((v || "").trim()) && (v || "").trim().length <= 24;
const colKind = (h: string) => {
  const s = (h || "").toLowerCase();
  if (/fiori/.test(s)) return "fiori";
  if (/s\/?4|simplif|note|פישוט|הערה|השפעה|impact/.test(s)) return "s4";
  if (/code|קוד|t-?code|טרנז|tcode/.test(s)) return "code";
  return "text";
};

/* one data row → an explanation card */
function RowCard({ headers, row, accent }: { headers: string[]; row: string[]; accent: string }) {
  const title = row[0] || "";
  const rest = headers.map((h, i) => ({ h, v: row[i] ?? "", i })).slice(1).filter((f) => f.v);
  return (
    <motion.div layout className="lift group rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_22px_-16px_rgba(15,23,42,.4)]">
      <div className="mb-2.5 flex items-center gap-2">
        <span className="size-2 shrink-0 rounded-full" style={{ background: accent }} />
        {isCode(title)
          ? <span className="tech rounded-lg px-2 py-0.5 text-sm font-extrabold text-white" style={{ background: accent }} dir="ltr">{title}</span>
          : <span className="text-sm font-extrabold text-slate-900">{title}</span>}
      </div>
      <dl className="space-y-2">
        {rest.map(({ h, v }) => {
          const k = colKind(h);
          return (
            <div key={h}>
              <dt className="eyebrow text-slate-400">{h}</dt>
              {k === "fiori" ? (
                <dd className="mt-0.5 inline-flex items-center gap-1.5 rounded-lg bg-fuchsia-50 px-2 py-0.5 text-xs font-bold text-fuchsia-700"><AppWindow className="size-3.5" />{v}</dd>
              ) : k === "s4" ? (
                <dd className="mt-0.5 rounded-lg border-s-2 border-amber-400 bg-amber-50/70 px-2.5 py-1.5 text-xs leading-relaxed text-amber-800">{v}</dd>
              ) : k === "code" || isCode(v) ? (
                <dd className="mt-0.5"><span className="tech rounded bg-slate-100 px-1.5 py-0.5 text-xs font-bold text-slate-700" dir="ltr">{v}</span></dd>
              ) : (
                <dd className="mt-0.5 text-sm leading-relaxed text-slate-600">{v}</dd>
              )}
            </div>
          );
        })}
      </dl>
    </motion.div>
  );
}

function GuideSection({ kind, sheet, open, onToggle }: { kind: Kind; sheet: SAPSheet; open: boolean; onToggle: () => void }) {
  const m = META[kind];
  const drop = /^(#|מס)/.test(sheet.headers[0] ?? "") ? 1 : 0;
  const headers = sheet.headers.slice(drop);
  const rows = sheet.rows.map((r) => r.slice(drop));
  const [limit, setLimit] = useState(9);
  const shown = rows.slice(0, limit);

  return (
    <section id={`guide-${kind}`} className="scroll-mt-28 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <button onClick={onToggle} className="flex w-full items-center gap-3 p-5 text-start transition hover:bg-slate-50/70">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl text-white shadow-lg" style={{ background: m.accent, boxShadow: `0 8px 20px ${m.accent}55` }}><m.icon className="size-5" /></span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2"><span className="text-lg font-extrabold tracking-tight text-slate-900">{m.label}</span><span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">{rows.length}</span></span>
          <span className="mt-0.5 line-clamp-1 block text-xs text-slate-400">{sheet.title}</span>
        </span>
        <ChevronDown className={`size-5 shrink-0 text-slate-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }} className="overflow-hidden">
            <div className="border-t border-slate-100 p-5">
              {/* intro / what-why */}
              <div className="mb-4 flex items-start gap-2.5 rounded-2xl p-3.5" style={{ background: `${m.accent}0d` }}>
                <Sparkles className="mt-0.5 size-4 shrink-0" style={{ color: m.accent }} />
                <p className="text-sm leading-relaxed text-slate-700">{m.intro}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((r, i) => <RowCard key={i} headers={headers} row={r} accent={m.accent} />)}
              </div>
              {rows.length > limit && (
                <button onClick={() => setLimit((l) => l + 12)} className="tap mx-auto mt-4 flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-brand transition hover:border-brand">
                  הצג עוד ({rows.length - limit}) <ChevronDown className="size-4" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function ModuleDirectories({ module }: { module: SAPModuleData }) {
  const items = useMemo(() => ([
    ["tcodes", module.tcodesDir], ["tools", module.tools], ["ppvs", module.ppvs],
    ["simplification", module.simplification], ["config", module.config], ["custom", module.customCode],
  ] as [Kind, SAPSheet | undefined][]).filter(([, s]) => s && s.rows.length) as [Kind, SAPSheet][], [module]);

  const [open, setOpen] = useState<Set<Kind>>(() => new Set(items[0] ? [items[0][0]] : []));
  const toggle = (k: Kind) => { playTick(); setOpen((s) => { const n = new Set(s); n.has(k) ? n.delete(k) : n.add(k); return n; }); };

  if (!items.length) return <p className="py-8 text-center text-sm text-muted-foreground">אין מדריכים זמינים למודול זה.</p>;

  return (
    <div className="space-y-4">
      {/* knowledge-center header + sticky anchor nav */}
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-bl from-slate-50 to-white p-5">
        <div className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl bg-brand text-white"><BookOpen className="size-5" /></span>
          <div><span className="eyebrow text-slate-400">Knowledge Center</span><h2 className="text-lg font-extrabold tracking-tight text-slate-900">מדריכים וכלים · {module.module}</h2></div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {items.map(([k]) => { const m = META[k]; return (
            <a key={k} href={`#guide-${k}`} onClick={() => setOpen((s) => new Set(s).add(k))} className="tap inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-brand hover:text-brand">
              <m.icon className="size-3.5" style={{ color: m.accent }} />{m.label}<ArrowLeft className="size-3 text-slate-300" />
            </a>); })}
        </div>
      </div>

      {items.map(([k, s]) => <GuideSection key={k} kind={k} sheet={s} open={open.has(k)} onToggle={() => toggle(k)} />)}
    </div>
  );
}
