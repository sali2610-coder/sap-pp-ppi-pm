"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowLeft, KeyRound, Link2, Terminal, Boxes, FileCode, AppWindow,
  GitBranch, Workflow, BookOpen, Wrench, StickyNote, LayoutGrid, Database, AlertTriangle, MapPin, TrendingUp, Cable,
  Presentation, FileCode2,
} from "lucide-react";
import { objectIntel } from "@/lib/data";
import { classifyFunc, cleanFunc, funcHref } from "@/lib/object-intel";
import { cdsForTable } from "@/data/cds-map";
import { kgraph, tracePath, tableByName } from "@/lib/knowledge-graph";
import { useStatusMap } from "@/lib/status-store";
import { STATUS_META, statusColor } from "@/lib/status-meta";
import type { MigrationStatus } from "@/lib/types";
import { playClick, playTick } from "@/lib/sound";

const MOD_COLOR: Record<string, string> = { PM: "#f97316", "PP-PI": "#6d28d9", PP: "#6d28d9" };
const mc = (m: string) => MOD_COLOR[m] || "#64748b";
const RED = "#d62027";

const TABS = [
  ["overview", "סקירה", LayoutGrid],
  ["relations", "קשרים", GitBranch],
  ["flow", "זרימה עסקית", Workflow],
  ["technical", "טכני", Database],
  ["learning", "למידה", BookOpen],
  ["trouble", "פתרון תקלות", Wrench],
  ["notes", "הערות CBC", StickyNote],
] as const;
type Tab = typeof TABS[number][0];

/* object-specific troubleshooting hints + generic fallback */
const TROUBLE: Record<string, string[]> = {
  IFLOT: ["מבנה מיקום טכני שגוי — בדוק את מבנה ה-Edit Mask ב-SPRO (Functional Location Structure).", "שדה ILOA חסר — נתוני המיקום/חשבונאות מנוהלים בטבלת ILOA המקושרת.", "סטטוס מערכת — בדוק פרופיל סטטוס (BS02) אם פעולות חסומות."],
  EQUI: ["ציוד לא מופיע ב-IE03 — בדוק קטגוריית ציוד והרשאות.", "קישור ציוד↔מיקום טכני דרך ILOA/EQUI; שגיאת install date → IE02.", "שדה EQART (סוג ציוד) מנוהל ב-OIM0."],
  AFKO: ["כותרת פקודת ייצור — שגיאות סטטוס נפוצות נובעות מ-CRTD/REL.", "AFKO↔AFPO↔AFVC: בעיית קישור פריט/פעולה → בדוק MAPL/PLPO.", "Backflush/אישור → בדוק COGI (MF47) לתנועות תקועות."],
  CRHD: ["מרכז עבודה לא נמצא בפקודה — בדוק קישור CRHD↔PLPO ושיוך מרכז עלות.", "קיבולת — בדוק CRCA/KAKO.", "מרכז עבודה חסום → CR02."],
};

function NodeChip({ name, module, exists, onGo }: { name: string; module: string; exists: boolean; onGo: (n: string) => void }) {
  const c = mc(module);
  return exists ? (
    <button onClick={() => onGo(name)} className="tech tap inline-flex items-center gap-1.5 rounded-lg border bg-white px-2.5 py-1 text-xs font-bold transition hover:shadow-sm" style={{ borderColor: c, color: c }} dir="ltr">
      <span className="size-1.5 rounded-full" style={{ background: c }} />{name}
    </button>
  ) : (
    <span className="tech inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-400" dir="ltr">{name}</span>
  );
}

/* ===== interactive relationship graph ===== */
function Graph({ name, onGo }: { name: string; onGo: (n: string) => void }) {
  const g = useMemo(() => kgraph(name), [name]);
  const [exp, setExp] = useState(false);
  if (!g) return null;
  const CAP = 8;
  const up = exp ? g.upstream : g.upstream.slice(0, CAP);
  const down = exp ? g.downstream : g.downstream.slice(0, CAP);
  const upMore = g.upstream.length - up.length, downMore = g.downstream.length - down.length;
  const cardUp = (n: string) => g.edges.find((e) => e.from === n && e.to === g.center.tableName)?.card || "1:N";
  const cardDown = (n: string) => g.edges.find((e) => e.from === g.center.tableName && e.to === n)?.card || "1:N";
  const W = 760, rowH = 60, padY = 44;
  const H = Math.max(up.length, down.length, 1) * rowH + padY * 2;
  const cx = W / 2, cy = H / 2;
  const colX = { up: 130, down: W - 130 };
  const yFor = (i: number, n: number) => padY + (H - padY * 2) * (n === 1 ? 0.5 : i / (n - 1));
  const NW = 150, NH = 40;
  const c = mc(g.center.module);

  const Node = ({ x, y, label, module, exists, center }: { x: number; y: number; label: string; module: string; exists: boolean; center?: boolean }) => {
    const col = center ? RED : mc(module);
    return (
      <g transform={`translate(${x - NW / 2},${y - NH / 2})`} style={{ cursor: exists ? "pointer" : "default" }} onClick={() => exists && onGo(label)}>
        <rect width={NW} height={NH} rx={10} fill="#fff" stroke={col} strokeWidth={center ? 2.5 : 1.5} style={{ filter: center ? `drop-shadow(0 8px 16px ${col}40)` : "drop-shadow(0 4px 10px rgba(15,23,42,.08))" }} />
        <rect width={4} height={NH} rx={2} fill={col} />
        <text x={NW / 2 + 4} y={NH / 2 - 2} textAnchor="middle" style={{ font: `800 13px ui-monospace`, fill: "#0f172a" }}>{label}</text>
        <text x={NW / 2 + 4} y={NH / 2 + 11} textAnchor="middle" style={{ font: `700 8px sans-serif`, fill: col }}>{center ? "CENTER" : module}</text>
      </g>
    );
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-[radial-gradient(circle_at_1px_1px,#e2e8f0_1px,transparent_0)] [background-size:20px_20px] p-2">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ minWidth: 560, maxHeight: 420 }}>
        <defs><filter id="og" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
        {/* labels */}
        <text x={colX.up} y={20} textAnchor="middle" style={{ font: "700 10px sans-serif", fill: "#94a3b8", letterSpacing: "1.5px" }}>UPSTREAM ←</text>
        <text x={cx} y={20} textAnchor="middle" style={{ font: "700 10px sans-serif", fill: "#94a3b8", letterSpacing: "1.5px" }}>OBJECT</text>
        <text x={colX.down} y={20} textAnchor="middle" style={{ font: "700 10px sans-serif", fill: "#94a3b8", letterSpacing: "1.5px" }}>→ DOWNSTREAM</text>
        {/* edges */}
        {up.map((n, i) => { const y = yFor(i, up.length); const x1 = colX.up + NW / 2, x2 = cx - NW / 2, mx = (x1 + x2) / 2; const my = (y + cy) / 2; return (
          <g key={"u" + n}><path d={`M${x1},${y} C${mx},${y} ${mx},${cy} ${x2},${cy}`} fill="none" stroke={c} strokeWidth={1.6} strokeOpacity={0.6} strokeDasharray="6 5"><animate attributeName="stroke-dashoffset" from="0" to="-110" dur="3s" repeatCount="indefinite" /></path>
            <path d={`M${x2 - 8},${cy - 4} L${x2},${cy} L${x2 - 8},${cy + 4}`} fill="none" stroke={c} strokeWidth={1.6} />
            <rect x={mx - 15} y={my - 7} width={30} height={14} rx={4} fill="#fff" stroke={c} strokeOpacity={0.4} /><text x={mx} y={my + 3} textAnchor="middle" style={{ font: "700 8px ui-monospace", fill: c }}>{cardUp(n)}</text></g>); })}
        {down.map((n, i) => { const y = yFor(i, down.length); const x1 = cx + NW / 2, x2 = colX.down - NW / 2, mx = (x1 + x2) / 2; const my = (y + cy) / 2; const dc = mc(tableByName(n)?.module || "?"); return (
          <g key={"d" + n}><path d={`M${x1},${cy} C${mx},${cy} ${mx},${y} ${x2},${y}`} fill="none" stroke={dc} strokeWidth={1.6} strokeOpacity={0.6} strokeDasharray="6 5"><animate attributeName="stroke-dashoffset" from="0" to="-110" dur="3s" repeatCount="indefinite" /></path>
            <path d={`M${x2 - 8},${y - 4} L${x2},${y} L${x2 - 8},${y + 4}`} fill="none" stroke={dc} strokeWidth={1.6} />
            <rect x={mx - 15} y={my - 7} width={30} height={14} rx={4} fill="#fff" stroke={dc} strokeOpacity={0.4} /><text x={mx} y={my + 3} textAnchor="middle" style={{ font: "700 8px ui-monospace", fill: dc }}>{cardDown(n)}</text></g>); })}
        {/* nodes */}
        {up.map((n, i) => <Node key={n} x={colX.up} y={yFor(i, up.length)} label={n} module={tableByName(n)?.module || "?"} exists={!!tableByName(n)} />)}
        {down.map((n, i) => <Node key={n} x={colX.down} y={yFor(i, down.length)} label={n} module={tableByName(n)?.module || "?"} exists={!!tableByName(n)} />)}
        <Node x={cx} y={cy} label={g.center.tableName} module={g.center.module} exists center />
      </svg>
      <div className="flex flex-wrap items-center justify-between gap-2 px-2 pb-1 pt-2">
        <span className="text-[11px] font-semibold text-slate-500">רדיוס השפעה (Blast radius): <span className="font-mono font-bold text-slate-700">{g.upstream.length}</span> מעלה · <span className="font-mono font-bold text-slate-700">{g.downstream.length}</span> מטה</span>
        {(upMore > 0 || downMore > 0 || exp) && (
          <button onClick={() => setExp((v) => !v)} className="tap rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-brand transition hover:border-brand">
            {exp ? "הצג פחות" : `הצג הכל (+${upMore + downMore})`}
          </button>
        )}
      </div>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="card-premium p-5">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-slate-500">{icon}{title}</h3>
      {children}
    </div>
  );
}

export function ObjectWorkspace({ name }: { name: string }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [note, setNote] = useState("");
  const intel = useMemo(() => objectIntel(name), [name]);
  const g = useMemo(() => kgraph(name), [name]);
  const t = tableByName(name);

  useEffect(() => { try { setNote(localStorage.getItem(`neo:obj:notes:${name}`) || ""); } catch { /* noop */ } }, [name]);
  useEffect(() => {
    if (!t) return;
    try { const r = JSON.parse(localStorage.getItem("neo:obj:recent") || "[]"); const next = [name, ...r.filter((x: string) => x !== name)].slice(0, 8); localStorage.setItem("neo:obj:recent", JSON.stringify(next)); } catch { /* noop */ }
  }, [name, t]);

  const go = (n: string) => { playClick(); router.push(`/object/${encodeURIComponent(n)}`); };

  if (!t) return (
    <div className="flex flex-col items-center gap-3 py-20 text-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-slate-100 text-slate-400"><Database className="size-7" /></span>
      <p className="text-sm font-bold text-slate-700">האובייקט “{name}” לא נמצא</p>
      <Link href="/sap-infrastructure/" className="text-sm font-bold text-brand hover:underline">חזרה לארכיטקטורה</Link>
    </div>
  );

  const c = mc(t.module);
  const cds = cdsForTable(t.tableName);
  const fields = t.fields;
  const statusMap = useStatusMap();
  const status = (statusMap[t.id] ?? t.migrationStatus) as MigrationStatus;
  const blast = (g?.upstream.length || 0) + (g?.downstream.length || 0);

  // keyboard navigation: 1-7 tabs · ←/→ cycle · p = present
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
      if (/^[1-7]$/.test(e.key)) { const tb = TABS[Number(e.key) - 1]; if (tb) { playTick(); setTab(tb[0]); } }
      else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const i = TABS.findIndex((x) => x[0] === tab); const d = e.key === "ArrowLeft" ? 1 : -1;
        const ni = (i + d + TABS.length) % TABS.length; playTick(); setTab(TABS[ni][0]);
      } else if (e.key.toLowerCase() === "p" && !e.metaKey && !e.ctrlKey) { window.print(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tab]);

  // consultant insights — derived from real data, no fabrication
  const s4Impact = cds.length ? `S/4HANA: נקרא דרך CDS ${cds.map((v) => v.view).join(", ")}` : t.s4AltTable ? `S/4HANA: הוחלף ב-${t.s4AltTable}` : "S/4HANA: נשמר ללא שינוי מהותי";
  const insights: { icon: React.ReactNode; text: string; tone: "red" | "blue" | "amber" | "green" }[] = [
    { icon: <TrendingUp className="size-4" />, text: `רדיוס השפעה: ${blast} אובייקטים (${g?.downstream.length || 0} תלויים מטה) — ${blast >= 8 ? "השפעת מיגרציה גבוהה" : blast >= 3 ? "השפעה בינונית" : "השפעה נמוכה"}`, tone: blast >= 8 ? "red" : blast >= 3 ? "amber" : "green" },
    { icon: <FileCode2 className="size-4" />, text: s4Impact, tone: cds.length ? "blue" : t.s4AltTable ? "amber" : "green" },
    { icon: <Boxes className="size-4" />, text: `${(t.funcs || []).length} ממשקים (BAPI/FM/IDoc) חושפים את האובייקט · ${intel?.tcodes.length || 0} טרנזקציות`, tone: "blue" },
    { icon: <Workflow className="size-4" />, text: `משתייך לתהליך: ${t.topicTitle}`, tone: "red" },
  ];
  const execSummary = `${t.tableName} (${t.descriptionHe || t.descriptionEn}) — אובייקט ${t.module} עם ${fields.length} שדות. ${s4Impact}. רדיוס השפעה ${blast} אובייקטים מקושרים, ${g?.downstream.length || 0} מהם תלויים בו (השפעת מיגרציה ${blast >= 8 ? "גבוהה" : blast >= 3 ? "בינונית" : "נמוכה"}). סטטוס מיגרציה נוכחי: ${STATUS_META[status].he}.`;
  const pk = fields.filter((f) => f.key === "PK" || /pk/i.test(String(f.key)));
  const upPath = tracePath(name, "up"); const downPath = tracePath(name, "down");
  const trouble = TROUBLE[name] || [
    "בדוק Where-Used (SE11 → Where-Used List) לפני שינוי מבנה.",
    "אימות הרשאות (SU53) אם פעולה נחסמת.",
    "בדוק טווחי מספרים ופרופיל סטטוס אם יצירת רשומה נכשלת.",
    "ב-S/4HANA — ודא טבלה/CDS חלופית: " + (t.s4AltTable || t.s4Note || "ללא שינוי מהותי"),
  ];

  return (
    <div className="space-y-5">
      {/* breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-slate-400">
        <Link href="/" className="hover:text-slate-700">בית</Link><ArrowRight className="size-3 rotate-180" />
        <Link href="/sap-infrastructure/" className="hover:text-slate-700">ארכיטקטורה</Link><ArrowRight className="size-3 rotate-180" />
        <span className="font-bold text-slate-700">{t.tableName}</span>
      </div>

      {/* ===== presentation-only executive slide (print) ===== */}
      <div className="print-block slide-print" dir="rtl">
        <div className="mb-6 flex items-center justify-between border-b-4 pb-3" style={{ borderColor: RED }}>
          <div><div className="text-3xl font-extrabold" dir="ltr">{t.tableName}</div><div className="text-sm text-slate-500">{t.descriptionHe || t.descriptionEn} · {t.module}</div></div>
          <div className="text-left"><div className="text-xs font-bold text-slate-400">NEO COCKPIT · CBC</div><div className="text-[10px] text-slate-400">SAP ECC6 → S/4HANA</div></div>
        </div>
        <div className="mb-5 grid grid-cols-4 gap-3">
          {[["שדות", fields.length], ["תלויות מעלה", g?.upstream.length || 0], ["השפעה מטה", g?.downstream.length || 0], ["רדיוס השפעה", blast]].map(([l, n]) => (
            <div key={l as string} className="rounded-xl border border-slate-200 p-3 text-center"><div className="text-2xl font-extrabold" style={{ color: RED }}>{n as number}</div><div className="text-[11px] font-bold text-slate-500">{l as string}</div></div>
          ))}
        </div>
        <p className="mb-4 text-sm leading-relaxed text-slate-700">{execSummary}</p>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div><div className="mb-1 font-bold" style={{ color: RED }}>תלויות מעלה</div>{g?.upstream.join(" · ") || "—"}</div>
          <div><div className="mb-1 font-bold" style={{ color: RED }}>השפעה מטה</div>{g?.downstream.join(" · ") || "—"}</div>
          <div><div className="mb-1 font-bold" style={{ color: RED }}>T-Codes</div>{intel?.tcodes.join(" · ") || "—"}</div>
          <div><div className="mb-1 font-bold" style={{ color: RED }}>CDS / S/4</div>{cds.map((v) => v.view).join(" · ") || t.s4AltTable || "ללא שינוי"}</div>
        </div>
      </div>

      {/* header */}
      <header className="relative overflow-hidden rounded-3xl p-6 text-white shadow-xl" style={{ background: `linear-gradient(135deg, ${RED}, #8f1318)` }}>
        <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: c }} />
        <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-white/10 blur-3xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="eyebrow text-white/70">SAP Consultant Workbench · Object</span>
            <div className="mt-1 flex items-center gap-3">
              <h1 className="font-mono text-4xl font-extrabold tracking-tight" dir="ltr">{t.tableName}</h1>
              <span className="rounded-lg bg-white/20 px-2 py-1 text-xs font-bold backdrop-blur-sm">Table · {t.module}</span>
            </div>
            <p className="mt-1.5 max-w-2xl text-sm text-white/85">{t.descriptionHe || t.descriptionEn}</p>
          </div>
          <div className="flex gap-2">
            {[["שדות", fields.length], ["מעלה", g?.upstream.length || 0], ["מטה", g?.downstream.length || 0]].map(([l, n]) => (
              <div key={l as string} className="rounded-2xl border border-white/15 bg-white/10 px-3.5 py-2 text-center backdrop-blur-sm">
                <div className="font-mono text-xl font-extrabold">{n as number}</div><div className="eyebrow text-white/70">{l as string}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* tabs + presentation export */}
      <div className="no-print sticky top-[4.5rem] z-30 flex items-center gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-white/90 p-1 shadow-sm backdrop-blur">
        {TABS.map(([id, label, Icon], i) => (
          <button key={id} onClick={() => { playTick(); setTab(id); }} title={`${i + 1}`}
            className={`flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-bold transition ${tab === id ? "bg-brand text-white shadow-sm" : "text-slate-500 hover:bg-slate-100"}`}>
            <Icon className="size-4" />{label}
          </button>
        ))}
        <button onClick={() => window.print()} title="ייצוא מצגת / PDF (P)" className="tap ms-auto flex shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-bold text-slate-600 transition hover:border-brand hover:text-brand">
          <Presentation className="size-4" /> מצגת
        </button>
      </div>
      <p className="no-print -mt-3 px-2 text-[11px] text-slate-400">קיצורים: 1-7 לשוניות · ←/→ מעבר · P ייצוא מצגת</p>

      <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="space-y-5">
        {tab === "overview" && (
          <>
            {/* executive summary */}
            <section className="relative overflow-hidden rounded-2xl border p-5" style={{ borderColor: c + "33", background: `linear-gradient(135deg, ${c}0d, #fff)` }}>
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide" style={{ color: c }}><Presentation className="size-4" /> תקציר מנהלים</h3>
                <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: statusColor(status) + "22", color: statusColor(status) }}>{STATUS_META[status].he}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{execSummary}</p>
              <p className="mt-1 text-[10px] text-slate-400">תקציר נגזר אוטומטית מהמאגר · לא תוכן מאומת ידנית</p>
            </section>
            {/* consultant insights */}
            <div className="grid gap-3 sm:grid-cols-2">
              {insights.map((ins, i) => { const tone = { red: "#d62027", blue: "#2563eb", amber: "#d97706", green: "#059669" }[ins.tone]; return (
                <div key={i} className="lift flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl text-white" style={{ background: tone }}>{ins.icon}</span>
                  <p className="text-sm font-medium leading-relaxed text-slate-700">{ins.text}</p>
                </div>); })}
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              <div className="lg:col-span-2"><Section title="גרף קשרים" icon={<GitBranch className="size-4" />}><Graph name={name} onGo={go} /></Section></div>
              <div className="space-y-5">
                <Section title="מהות" icon={<LayoutGrid className="size-4" />}><p className="text-sm leading-relaxed text-slate-600">{t.guideHe || t.descriptionHe || t.descriptionEn}</p></Section>
                <Section title="נמצא ב" icon={<MapPin className="size-4" />}>
                  <div className="flex flex-wrap gap-1.5">{intel?.foundIn.map((f) => <Link key={f.label} href={f.href} className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 hover:bg-slate-200">✓ {f.label}</Link>)}</div>
                </Section>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-4">
              {[["שדות", fields.length, Database], ["קשרים", (g?.upstream.length || 0) + (g?.downstream.length || 0), GitBranch], ["T-Codes", intel?.tcodes.length || 0, Terminal], ["BAPIs", intel?.bapis.length || 0, Boxes]].map(([l, n, I]) => { const Ic = I as typeof Database; return (
                <div key={l as string} className="lift card-premium p-4"><Ic className="size-5 text-slate-300" /><div className="mt-2 font-mono text-2xl font-extrabold text-slate-900">{n as number}</div><div className="eyebrow mt-1 text-slate-400">{l as string}</div></div>); })}
            </div>
          </>
        )}

        {tab === "relations" && (
          <>
            <Section title="גרף קשרים אינטראקטיבי" icon={<GitBranch className="size-4" />}><Graph name={name} onGo={go} /></Section>
            <div className="grid gap-5 sm:grid-cols-2">
              <Section title={`תלויות מעלה · ${g?.upstream.length || 0} (האובייקט תלוי ב)`} icon={<ArrowLeft className="size-4 rotate-45" />}>
                <div className="flex flex-wrap gap-1.5">{g?.upstream.length ? g.upstream.map((n) => <NodeChip key={n} name={n} module={tableByName(n)?.module || "?"} exists={!!tableByName(n)} onGo={go} />) : <span className="text-xs italic text-slate-400">אין תלויות מעלה</span>}</div>
              </Section>
              <Section title={`השפעה מטה · ${g?.downstream.length || 0} (תלויים באובייקט)`} icon={<TrendingUp className="size-4" />}>
                <div className="flex flex-wrap gap-1.5">{g?.downstream.length ? g.downstream.map((n) => <NodeChip key={n} name={n} module={tableByName(n)?.module || "?"} exists={!!tableByName(n)} onGo={go} />) : <span className="text-xs italic text-slate-400">אין השפעה מטה</span>}</div>
              </Section>
            </div>
          </>
        )}

        {tab === "flow" && (
          <Section title="זרימה עסקית · שרשרת תלות" icon={<Workflow className="size-4" />}>
            <div className="space-y-5">
              <div>
                <p className="eyebrow mb-2 text-slate-400">שרשרת מעלה (Master → ...)</p>
                <div className="flex flex-wrap items-center gap-2">{[...upPath].reverse().map((n, i, a) => (<span key={n + i} className="flex items-center gap-2">
                  <NodeChip name={n} module={tableByName(n)?.module || "?"} exists={!!tableByName(n)} onGo={go} />{i < a.length - 1 && <ArrowLeft className="size-4 rotate-180 text-slate-300" />}</span>))}</div>
              </div>
              <div>
                <p className="eyebrow mb-2 text-slate-400">שרשרת מטה (... → Transaction)</p>
                <div className="flex flex-wrap items-center gap-2">{downPath.map((n, i, a) => (<span key={n + i} className="flex items-center gap-2">
                  <NodeChip name={n} module={tableByName(n)?.module || "?"} exists={!!tableByName(n)} onGo={go} />{i < a.length - 1 && <ArrowLeft className="size-4 rotate-180 text-slate-300" />}</span>))}</div>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="eyebrow mb-1 text-slate-400">תהליך / זרם</p>
                <Link href={`/process/${encodeURIComponent(`${t.module}-${t.topicIdx}`)}`} className="text-sm font-bold text-brand hover:underline">{t.topicTitle} ↗</Link>
                {intel && <div className="mt-2 flex flex-wrap gap-1.5">{intel.tcodes.map((tc) => <Link key={tc} href={`/tcode/${encodeURIComponent(tc)}`} className="tech rounded bg-white px-2 py-0.5 text-[11px] font-bold text-slate-600 ring-1 ring-slate-200 transition hover:text-brand hover:ring-brand" dir="ltr">{tc}</Link>)}</div>}
              </div>
            </div>
          </Section>
        )}

        {tab === "technical" && (
          <>
            <Section title={`שדות · ${fields.length} (PK ${pk.length})`} icon={<KeyRound className="size-4" />}>
              <div className="overflow-auto rounded-xl border border-slate-100"><table className="w-full text-right font-mono text-xs" dir="ltr">
                <thead className="bg-slate-50 text-[10px] uppercase text-slate-400"><tr><th className="px-3 py-2">Field</th><th className="px-3 py-2">Type</th><th className="px-3 py-2">Len</th><th className="px-3 py-2">Key</th><th className="px-3 py-2 text-right">תיאור</th></tr></thead>
                <tbody>{fields.slice(0, 40).map((f, i) => <tr key={i} className="border-t border-slate-50">
                  <td className={`px-3 py-1.5 font-bold ${f.key === "PK" ? "text-amber-600" : f.key === "FK" ? "text-blue-600" : "text-slate-700"}`}>{f.tech}</td>
                  <td className="px-3 py-1.5 text-slate-400">{f.dt}</td><td className="px-3 py-1.5 text-slate-400">{f.len}</td>
                  <td className="px-3 py-1.5">{f.key && f.key !== "-" && <span className={`rounded px-1 text-[9px] font-bold ${f.key === "PK" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>{f.key}</span>}</td>
                  <td className="px-3 py-1.5 text-right text-slate-500" dir="rtl">{f.he}</td></tr>)}</tbody>
              </table></div>
            </Section>
            <div className="grid gap-5 sm:grid-cols-2">
              <Section title="טרנזקציות + BAPIs" icon={<Terminal className="size-4" />}>
                <div className="space-y-2.5">
                  <div className="flex flex-wrap gap-1.5">{intel?.tcodes.map((tc) => <Link key={tc} href={`/tcode/${encodeURIComponent(tc)}`} className="tech rounded bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600 transition hover:bg-brand-soft hover:text-brand" dir="ltr">{tc}</Link>) || "—"}</div>
                  <div className="flex flex-wrap gap-1.5">{[...new Set(t.funcs.map(([n]) => cleanFunc(n)))].slice(0, 8).map((n) => { const k = classifyFunc(n); return <Link key={n} href={funcHref(n)} className={`tech rounded px-2 py-0.5 text-xs font-bold transition hover:brightness-95 ${k === "IDoc" ? "bg-violet-50 text-violet-700" : k === "FM" ? "bg-slate-100 text-slate-600" : "bg-blue-50 text-blue-700"}`} dir="ltr">{k === "IDoc" ? <Cable className="me-1 inline size-3" /> : <Boxes className="me-1 inline size-3" />}{n}</Link>; })}</div>
                  {t.progs?.length > 0 && <div className="flex flex-wrap gap-1.5">{t.progs.slice(0, 6).map(([n]) => <span key={n} className="tech rounded bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600" dir="ltr"><FileCode className="me-1 inline size-3" />{n}</span>)}</div>}
                </div>
              </Section>
              <Section title="S/4HANA + Fiori" icon={<AppWindow className="size-4" />}>
                <p className="text-sm text-slate-600">{t.s4Note || "אין שינוי מהותי ב-S/4HANA."}</p>
                {t.s4AltTable && <p className="mt-1 text-xs text-slate-500">חלופה: <span className="tech font-bold text-slate-700">{t.s4AltTable}</span></p>}
                {cds.length > 0 && <div className="mt-2"><p className="eyebrow mb-1 text-slate-400">CDS Views</p><div className="flex flex-wrap gap-1.5">{cds.map((v) => <Link key={v.view} href={`/cds/${encodeURIComponent(v.view)}`} className="tech tap rounded bg-teal-50 px-2 py-0.5 text-xs font-bold text-teal-700 transition hover:brightness-95" dir="ltr"><FileCode className="me-1 inline size-3" />{v.view}</Link>)}</div></div>}
                {t.fioriApp && <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-600"><AppWindow className="size-4 text-brand" />{t.fioriApp}</p>}
                {t.sqlJoinSnippet && <pre className="mt-2 overflow-auto rounded-lg bg-slate-900 p-2.5 text-[11px] leading-relaxed text-slate-100" dir="ltr">{t.sqlJoinSnippet}</pre>}
              </Section>
            </div>
          </>
        )}

        {tab === "learning" && (
          <Section title="למידה קשורה" icon={<BookOpen className="size-4" />}>
            <div className="space-y-3">
              {intel?.books.length ? <div><p className="eyebrow mb-1.5 text-slate-400">ספרים</p><div className="flex flex-wrap gap-2">{intel.books.map((b) => <Link key={b} href="/library/book1/" className="lift inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700"><BookOpen className="size-4 text-brand" />{b}</Link>)}</div></div> : null}
              <div><p className="eyebrow mb-1.5 text-slate-400">מסלול אקדמיה</p>
                <Link href={t.module === "PM" ? "/library/pm-academy/" : "/library/pp/"} className="lift inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold text-white" style={{ background: c }}>
                  <BookOpen className="size-4" /> אקדמיית {t.module} <ArrowLeft className="size-4" /></Link>
              </div>
              <Link href={`/sap-infrastructure/`} className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline"><GitBranch className="size-4" /> חקור באקספלורר הארכיטקטורה</Link>
            </div>
          </Section>
        )}

        {tab === "trouble" && (
          <Section title="פתרון תקלות · Troubleshooting" icon={<AlertTriangle className="size-4 text-amber-500" />}>
            <p className="mb-2 text-[11px] font-semibold text-slate-400">{TROUBLE[name] ? "טיפים ספציפיים לאובייקט" : "טיפים גנריים נגזרים אוטומטית · לא תוכן מאומת"}</p>
            <ul className="space-y-2.5">{trouble.map((tip, i) => (
              <li key={i} className="flex gap-2.5 rounded-xl border border-amber-100 bg-amber-50/50 p-3 text-sm text-slate-700">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-amber-400 text-[11px] font-bold text-white">{i + 1}</span>{tip}</li>))}</ul>
          </Section>
        )}

        {tab === "notes" && (
          <Section title="הערות CBC · נשמר מקומית" icon={<StickyNote className="size-4" />}>
            <textarea value={note} onChange={(e) => { setNote(e.target.value); try { localStorage.setItem(`neo:obj:notes:${name}`, e.target.value); } catch { /* noop */ } }}
              placeholder={`הערות פנימיות של CBC על ${t.tableName} — נשמרות בדפדפן…`}
              className="min-h-[220px] w-full resize-y rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed outline-none focus:border-brand/40 focus:ring-2 focus:ring-brand/15" />
            <p className="mt-2 text-xs text-slate-400">נשמר אוטומטית ב-localStorage · ייצוא/גיבוי דרך מסך הסטטוס.</p>
          </Section>
        )}
      </motion.div>
    </div>
  );
}
