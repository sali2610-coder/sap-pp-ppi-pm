"use client";

import { useMemo, useState } from "react";
import { SmartLink as Link } from "@/components/smart-link";
import { Sigma, Database, LayoutGrid, Layers, Search, ArrowLeft, GitBranch } from "lucide-react";
import { SapTip } from "@/components/sap-tip";
import { EmptyState } from "@/components/ui/empty-state";
import { CDS_VIEWS, type CdsView } from "@/data/cds-map";

const ACCENT = "#16a34a"; // CDS green
const MOD_C: Record<string, string> = { PM: "#f97316", "PP-PI": "#6d28d9" };

// CDS Explorer — the S/4HANA Virtual Data Model as a navigable chain:
// classic ECC table → Interface view (I_) → Consumption view (C_) → Fiori app.
// 100% from the curated cds-map (hand-verified released views). Reference/
// diagnostic surface, complementary to the /cds/<view> detail pages.
export function CdsExplorer() {
  const [mod, setMod] = useState<"all" | "PM" | "PP-PI">("all");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return CDS_VIEWS.filter((v) => (mod === "all" || v.module === mod) && (!s || `${v.view} ${v.he} ${v.consumption || ""} ${v.fiori || ""} ${v.tables.join(" ")}`.toLowerCase().includes(s)));
  }, [mod, q]);

  const stats = useMemo(() => ({
    total: CDS_VIEWS.length,
    consumption: CDS_VIEWS.filter((v) => v.consumption).length,
    fiori: CDS_VIEWS.filter((v) => v.fiori).length,
    tables: new Set(CDS_VIEWS.flatMap((v) => v.tables)).size,
  }), []);

  const STATS = [
    { icon: <Sigma className="size-4" />, v: stats.total, l: "תצוגות CDS", c: ACCENT },
    { icon: <Layers className="size-4" />, v: stats.consumption, l: "תצוגות צריכה (C_)", c: "#0891b2" },
    { icon: <LayoutGrid className="size-4" />, v: stats.fiori, l: "מחוברות ל-Fiori", c: "#d97706" },
    { icon: <Database className="size-4" />, v: stats.tables, l: "טבלאות ECC ממופות", c: "#2563eb" },
  ];

  return (
    <div dir="rtl" className="space-y-6">
      {/* stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STATS.map((k) => (
          <div key={k.l} className="flex items-center gap-3 rounded-2xl border border-hairline bg-surface p-4 shadow-[var(--elev-1)]">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl text-white shadow-sm" style={{ background: k.c }}>{k.icon}</span>
            <div><div className="text-2xl font-extrabold tabular-nums text-ink-1">{k.v}</div><div className="text-[11px] font-semibold text-ink-3">{k.l}</div></div>
          </div>
        ))}
      </div>

      {/* VDM layer explainer */}
      <section className="rounded-3xl border border-hairline bg-surface p-5 shadow-[var(--elev-1)] sm:p-6">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-extrabold text-ink-1"><Sigma className="size-5" style={{ color: ACCENT }} />מודל הנתונים הווירטואלי (VDM)</h2>
        <div className="flex flex-wrap items-center gap-2 text-[12.5px] font-bold">
          <span className="rounded-xl border border-hairline bg-surface-2 px-3 py-2 text-ink-2">טבלת ECC קלאסית</span>
          <ArrowLeft className="size-4 text-ink-3" />
          <span className="rounded-xl px-3 py-2 text-white shadow-sm" style={{ background: ACCENT }}>Interface View · I_</span>
          <ArrowLeft className="size-4 text-ink-3" />
          <span className="rounded-xl px-3 py-2 text-white shadow-sm" style={{ background: "#0891b2" }}>Consumption View · C_</span>
          <ArrowLeft className="size-4 text-ink-3" />
          <span className="rounded-xl px-3 py-2 text-white shadow-sm" style={{ background: "#d97706" }}>Fiori App</span>
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-ink-3">ב-S/4HANA הגישה לנתונים עוברת דרך תצוגות CDS במקום קריאה ישירה לטבלה. תצוגת Interface (I_) חושפת את הנתון הגולמי, תצוגת Consumption (C_) מוסיפה היגיון אנליטי, ואפליקציית Fiori צורכת את השרשרת.</p>
      </section>

      {/* controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-2xl border border-hairline bg-surface px-4 py-2.5 shadow-sm">
          <Search className="size-4" style={{ color: ACCENT }} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש תצוגה · טבלה · אפליקציה…" className="w-full bg-transparent text-sm outline-none placeholder:text-ink-3" />
        </div>
        <div className="flex gap-1.5">
          {(["all", "PM", "PP-PI"] as const).map((m) => <button key={m} onClick={() => setMod(m)} className={`tap rounded-xl px-3 py-2 text-xs font-bold transition ${mod === m ? "text-white shadow-sm" : "bg-surface-2 text-ink-3 hover:bg-hairline"}`} style={mod === m ? { background: m === "all" ? ACCENT : MOD_C[m] } : undefined}>{m === "all" ? "הכול" : m}</button>)}
        </div>
      </div>

      <p className="text-xs font-bold text-ink-3">{list.length} תצוגות</p>

      {/* chain cards */}
      {list.length === 0 ? <EmptyState title="לא נמצאו תצוגות" hint="נסה מונח חיפוש אחר או נקה את סינון המודול" suggestions={[{ label: "נקה חיפוש", onClick: () => setQ("") }, { label: "כל המודולים", onClick: () => setMod("all") }]} /> : (
        <div className="grid gap-3 lg:grid-cols-2">
          {list.map((v) => <ChainCard key={v.view} v={v} />)}
        </div>
      )}
    </div>
  );
}

function ChainCard({ v }: { v: CdsView }) {
  return (
    <div className="group rounded-2xl border border-hairline bg-surface p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <Link href={`/cds/${encodeURIComponent(v.view)}/`} className="flex items-center gap-2 min-w-0">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg text-white shadow-sm" style={{ background: ACCENT }}><Sigma className="size-4" /></span>
          <span className="min-w-0">
            <span className="tech block truncate font-mono text-[15px] font-extrabold text-ink-1 group-hover:text-brand" dir="ltr">{v.view}</span>
            <span className="block truncate text-[11.5px] font-semibold text-ink-3">{v.he}</span>
          </span>
        </Link>
        <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: MOD_C[v.module] }}>{v.module}</span>
      </div>

      {/* classic tables */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-ink-3"><Database className="size-3" />טבלאות ECC</span>
        {v.tables.map((t) => (
          <SapTip key={t} name={t} bare>
            <Link href={`/object/${encodeURIComponent(t)}/`} className="tech rounded-md bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] font-bold text-ink-2 transition hover:bg-brand/10 hover:text-brand" dir="ltr">{t}</Link>
          </SapTip>
        ))}
      </div>

      {/* consumption + fiori chain */}
      {(v.consumption || v.fiori) && (
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5 border-t border-hairline pt-2.5 text-[11px] font-bold">
          {v.consumption && <><span className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-white" style={{ background: "#0891b2" }}><Layers className="size-3" /><span className="tech font-mono" dir="ltr">{v.consumption}</span></span></>}
          {v.consumption && v.fiori && <ArrowLeft className="size-3 text-ink-3" />}
          {v.fiori && <span className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-white" style={{ background: "#d97706" }}><LayoutGrid className="size-3" />{v.fiori}</span>}
        </div>
      )}

      <Link href={`/cds/${encodeURIComponent(v.view)}/`} className="mt-3 inline-flex items-center gap-1 text-[11.5px] font-bold transition group-hover:gap-2" style={{ color: ACCENT }}><GitBranch className="size-3.5" />מפת קשרים מלאה<ArrowLeft className="size-3" /></Link>
    </div>
  );
}
