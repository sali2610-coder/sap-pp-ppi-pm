"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X, ShieldCheck, ArrowLeft, LayoutGrid } from "lucide-react";
import { FIORI_APPS } from "@/data/fiori/apps";
import type { FioriApp } from "@/lib/fiori/types";
import RAW_INDEX from "@/data/library/fiori-apps.json";

const INDEX = RAW_INDEX as { id: string; name: string; type: string }[];
const TY: Record<string, string> = { Transactional: "bg-[#eef6ff] text-[#1d4ed8]", Analytical: "bg-[#f5f3ff] text-[#6d28d9]", "Fact Sheet": "bg-[#f0f7f0] text-[#15803d]" };

// searchable blob across ALL fields (name/id/role/catalog/odata/cds/tcode/table/module/type)
const blob = (a: FioriApp) => `${a.id} ${a.name} ${a.he} ${a.module} ${a.type} ${a.role} ${a.catalog} ${a.odata || ""} ${a.cds || ""} ${a.guiTx.join(" ")} ${(a.relatedTables || []).join(" ")} ${a.purpose}`.toLowerCase();

export function FioriAppsCenter() {
  const [q, setQ] = useState("");
  const [mod, setMod] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const s = q.trim().toLowerCase();

  const modules = useMemo(() => [...new Set(FIORI_APPS.map((a) => a.module))], []);
  const full = useMemo(() => FIORI_APPS.filter((a) => (!mod || a.module === mod) && (!type || a.type === type) && (!s || blob(a).includes(s))), [mod, type, s]);
  const dir = useMemo(() => (!s ? INDEX.slice(0, 60) : INDEX.filter((a) => `${a.id} ${a.name} ${a.type}`.toLowerCase().includes(s)).slice(0, 120)), [s]);

  return (
    <div dir="rtl">
      <div className="flex items-center gap-1.5 text-[11.5px] font-semibold text-ink-3"><span className="font-bold text-brand">Fiori Apps</span><span>›</span><span>מרכז ידע</span></div>
      <div className="mt-1.5 text-[11px] font-extrabold uppercase tracking-[0.13em] text-ink-3">מוצר · מרכז ידע Fiori</div>
      <h1 className="mt-1 text-[26px] font-extrabold tracking-tight text-ink-1">Fiori Apps</h1>
      <p className="mt-1 max-w-2xl text-[13.5px] text-ink-3">מרכז הידע לאפליקציות SAP Fiori — עמוד מלא לכל אפליקציה: מטרה עסקית, Business Role, Catalog, OData/CDS, ECC↔S/4, שגיאות נפוצות ודוגמת CBC.</p>

      <label className="mt-4 flex items-center gap-2.5 rounded-2xl border border-hairline bg-surface px-4 py-3 shadow-sm">
        <Search className="size-4 shrink-0 text-ink-3" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חפש: שם · Fiori ID · Role · Catalog · OData · CDS · T-Code · טבלה · מודול…" className="w-full bg-transparent text-[14px] outline-none placeholder:text-ink-3" />
        {q && <button onClick={() => setQ("")} aria-label="נקה"><X className="size-4 text-ink-3" /></button>}
      </label>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Chip on={!mod && !type} onClick={() => { setMod(null); setType(null); }}>הכל</Chip>
        {modules.map((m) => <Chip key={m} on={mod === m} onClick={() => setMod(mod === m ? null : m)}>{m}</Chip>)}
        <span className="mx-0.5 w-px bg-hairline" />
        {["Transactional", "Analytical", "Fact Sheet"].map((tp) => <Chip key={tp} on={type === tp} onClick={() => setType(type === tp ? null : tp)}>{tp}</Chip>)}
      </div>

      <p className="mt-3 text-[12px] text-ink-3"><b className="text-ink-2">{full.length}</b> אפליקציות מלאות{s ? "" : " (פיילוט PM · PP-PI)"} · <b className="text-ink-2">{INDEX.length.toLocaleString()}</b> באינדקס המלא</p>

      {/* rich full-page cards */}
      <div className="mt-3 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {full.map((a) => (
          <Link key={a.slug} href={`/fiori-apps/${a.slug}/`} className="group flex flex-col rounded-2xl border border-hairline bg-surface p-4 transition hover:-translate-y-px hover:border-[#dfe2e7] hover:shadow-[0_12px_28px_-16px_rgba(11,12,14,.16)]">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[11px] font-extrabold text-brand" dir="ltr">{a.id}</span>
              <span className={`rounded-md px-2 py-0.5 text-[9.5px] font-extrabold ${TY[a.type]}`}>{a.type}</span>
              <span className="ms-auto inline-flex items-center gap-1 rounded-full border border-[#cfe6e2] bg-[#f0f6f5] px-2 py-0.5 text-[9px] font-bold text-[#0f766e]"><ShieldCheck className="size-2.5" />{a.trust === "verified-docs" ? "מאומת" : "אצור"}</span>
            </div>
            <h3 className="mt-2.5 text-[15px] font-extrabold text-ink-1">{a.name}</h3>
            <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-ink-3">{a.purpose}</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              <span className="rounded bg-surface-2 px-2 py-0.5 text-[9.5px] font-bold text-ink-2">{a.module}</span>
              <span className="rounded bg-surface-2 px-2 py-0.5 font-mono text-[9.5px] font-bold text-ink-2" dir="ltr">{a.role}</span>
            </div>
            <span className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-xl bg-surface-2 py-2 text-[12px] font-extrabold text-ink-1 transition group-hover:bg-brand group-hover:text-white">פתח עמוד מלא <ArrowLeft className="size-3.5 rtl:rotate-180" /></span>
          </Link>
        ))}
      </div>

      {full.length === 0 && <p className="mt-6 rounded-2xl border border-dashed border-hairline bg-surface-2/40 py-10 text-center text-[13px] font-bold text-ink-2">אין אפליקציה מלאה תואמת — נסה את האינדקס המלא למטה.</p>}

      {/* full directory (1450) — thin metadata, honest */}
      <div className="mt-7 rounded-2xl border border-hairline bg-surface-2/40 p-4">
        <div className="flex items-center gap-2 text-[12px] font-extrabold text-ink-2"><LayoutGrid className="size-4" />אינדקס מלא — {INDEX.length.toLocaleString()} אפליקציות <span className="font-semibold text-ink-3">(מטא-דאטה: Fiori ID · שם · סוג)</span></div>
        <div className="mt-2.5 divide-y divide-hairline">
          {dir.map((a) => (
            <div key={a.id} className="flex items-center gap-3 py-2 text-[12.5px]">
              <span className="rounded bg-surface px-1.5 py-0.5 font-mono text-[10px] font-bold text-brand" dir="ltr">{a.id}</span>
              <span className="min-w-0 flex-1 truncate text-ink-2">{a.name}</span>
              <span className="shrink-0 rounded bg-surface px-2 py-0.5 text-[9.5px] font-bold text-ink-3">{a.type}</span>
            </div>
          ))}
        </div>
        {!s && <p className="mt-2 text-[11px] text-ink-3">מציג 60 ראשונות · חפש כדי לסנן את כל {INDEX.length.toLocaleString()}. עמודים מלאים נוספים מודול-אחר-מודול — ללא המצאת נתונים.</p>}
      </div>
    </div>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button onClick={onClick} className={`rounded-full border px-3 py-1.5 text-[12px] font-bold transition ${on ? "border-ink-1 bg-ink-1 text-white" : "border-hairline bg-surface text-ink-2 hover:bg-surface-2"}`}>{children}</button>;
}
