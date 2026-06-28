"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { LayoutDashboard, Search, AppWindow, ArrowRightLeft, ChevronDown } from "lucide-react";
import { FIORI_APPS } from "@/data/centers/fiori";
import { EmptyState } from "@/components/ui/empty-state";

const SEC_TONE = (t?: string) => t || "#7c3aed";
// flat search string per app (title/he/appId/role/catalog/odata/cds/gui/module)
const blob = (a: typeof FIORI_APPS[number]) => `${a.he} ${a.title} ${a.sub} ${a.module || ""} ${a.sections.map((s) => `${s.title} ${"text" in s ? s.text : ""} ${"items" in s && Array.isArray(s.items) ? s.items.join(" ") : ""}`).join(" ")} ${a.eccS4?.fiori || ""} ${a.eccS4?.cds || ""}`.toLowerCase();

export function FioriAppsCenter() {
  const [q, setQ] = useState("");
  const [mod, setMod] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const modules = useMemo(() => [...new Set(FIORI_APPS.map((a) => a.module).filter(Boolean))] as string[], []);
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return FIORI_APPS.filter((a) => (!mod || a.module === mod) && (!s || blob(a).includes(s)));
  }, [q, mod]);

  return (
    <div className="mx-auto max-w-[1200px]" dir="rtl">
      <header className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-l from-slate-900 via-slate-800 to-[#16a34a] p-6 text-white shadow-xl sm:p-8">
        <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-emerald-500/25 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/60"><LayoutDashboard className="size-4" />S/4HANA · Fiori Apps Library</div>
          <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">מרכז אפליקציות Fiori</h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/85">{FIORI_APPS.length} אפליקציות S/4HANA — חיפוש לפי שם, App ID, Business Role, Catalog, OData, CDS, טרנזקציית GUI ומידע הגירה.</p>
        </div>
      </header>

      {/* search + filters */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5"><Search className="size-4 shrink-0 text-slate-400" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חפש אפליקציה · App ID · Role · Catalog · OData · CDS · T-Code" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-300" /></div>
        <button onClick={() => setMod("")} className={`rounded-lg px-2.5 py-1.5 text-[12px] font-bold transition ${!mod ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>הכול</button>
        {modules.map((m) => <button key={m} onClick={() => setMod(mod === m ? "" : m)} className={`rounded-lg px-2.5 py-1.5 text-[12px] font-bold transition ${mod === m ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"}`}>{m}</button>)}
        <span className="ms-auto text-[12px] font-bold text-slate-400">{list.length} אפליקציות</span>
      </div>

      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {list.map((a) => { const isOpen = open === a.slug; return (
          <div key={a.slug} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
            <button onClick={() => setOpen(isOpen ? null : a.slug)} className="flex w-full items-start gap-3 p-4 text-right">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl text-white shadow-sm" style={{ background: "linear-gradient(135deg,#16a34a,#15803d)" }}><AppWindow className="size-5" /></span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5"><span className="text-[14px] font-extrabold text-slate-900">{a.title}</span><span className="rounded px-1.5 py-0.5 text-[9px] font-bold text-emerald-700" style={{ background: "#16a34a14" }}>{a.module}</span></span>
                <span className="block text-[12px] text-slate-500">{a.he} · <span className="font-mono text-slate-400" dir="ltr">{a.sub}</span></span>
              </span>
              <ChevronDown className={`size-4 shrink-0 text-slate-300 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen && (
              <div className="space-y-2.5 border-t border-slate-100 p-4 pt-3">
                {a.sections.map((s, i) => (
                  <div key={i}>
                    <div className="mb-0.5 text-[10px] font-bold uppercase tracking-wide" style={{ color: SEC_TONE(s.tone) }}>{s.title}</div>
                    {"text" in s && s.text && <p className="text-[12.5px] leading-relaxed text-slate-600" dir="auto">{s.text}</p>}
                    {"items" in s && Array.isArray(s.items) && (s.type === "linkchips"
                      ? <div className="flex flex-wrap gap-1.5">{s.items.map((it) => <Link key={it} href={`/tcode/${encodeURIComponent(it)}/`} className="tech rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600 hover:bg-emerald-50 hover:text-emerald-700" dir="ltr">{it}</Link>)}</div>
                      : <ul className="space-y-0.5">{s.items.map((it, j) => <li key={j} className="flex gap-1.5 text-[12px] text-slate-600"><span className="mt-1.5 size-1 shrink-0 rounded-full" style={{ background: SEC_TONE(s.tone) }} />{it}</li>)}</ul>)}
                  </div>
                ))}
                {a.eccS4?.migration && <div className="rounded-xl bg-amber-50/60 p-2.5"><div className="mb-0.5 flex items-center gap-1 text-[10px] font-bold uppercase text-amber-700"><ArrowRightLeft className="size-3" />הגירה ECC↔S/4</div><p className="text-[12px] leading-relaxed text-amber-900">{a.eccS4.migration}</p></div>}
              </div>
            )}
          </div>
        ); })}
      </div>
      {list.length === 0 && <div className="mt-6"><EmptyState title="לא נמצאו אפליקציות" hint="נסה שם אפליקציה, App ID, Business Role, Catalog או טרנזקציית GUI" suggestions={[{ label: "נקה חיפוש", onClick: () => { setQ(""); setMod(""); } }]} /></div>}
      <p className="mt-4 pb-6 text-center text-[11px] text-slate-400">מיפוי טרנזקציה → Fiori מאומת · App ID/Catalog/Role/OData/CDS אמיתיים. <Link href="/fiori/" className="font-bold text-brand">קורס Fiori & UX</Link></p>
    </div>
  );
}
