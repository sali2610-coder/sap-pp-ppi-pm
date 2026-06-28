import Link from "next/link";
import { Terminal, ArrowLeft, Boxes, GitBranch, Workflow, AlertTriangle, Info } from "lucide-react";
import { registryTx, txRegistry } from "@/lib/tx-registry";
import { tcodeIntel } from "@/lib/object-intel";
import { INCIDENTS } from "@/data/troubleshooting";
import { EXITS } from "@/data/exits";

const MOD_COLOR: Record<string, string> = {
  PP: "#6d28d9", "PP-PI": "#6d28d9", PM: "#f97316", QM: "#0d9488", MM: "#2563eb",
  SD: "#0891b2", FI: "#16a34a", CO: "#d97706", WM: "#7c3aed", PS: "#be185d",
  LE: "#0891b2", HR: "#0d9488", BASIS: "#475569", SECURITY: "#dc2626", ABAP: "#1e293b",
};
const mc = (m: string) => MOD_COLOR[m] || MOD_COLOR[(m || "").split(/[ /]/)[0]] || "#64748b";

// Light page for verified breadth-tier transactions: shows only KNOWN facts +
// dataset-DERIVED relations. No fabricated facets — clearly marks that deep
// intelligence is not yet authored.
export function TransactionLight({ code }: { code: string }) {
  const r = registryTx(code);
  if (!r) return <div className="py-20 text-center text-sm text-slate-500" dir="rtl">T-Code לא נמצא במאגר.</div>;
  const c = mc(r.module);
  const cu = r.code;
  const intel = tcodeIntel(cu);
  const tables = intel ? intel.tables.map((x) => x.name) : [];
  const incidents = INCIDENTS.filter((i) => (i.analyzeTcodes || []).some((x) => x.toUpperCase() === cu)).slice(0, 8);
  const exits = EXITS.filter((e) => (e.tcodes || []).some((x) => x.toUpperCase() === cu)).slice(0, 8);
  const sameModule = [...txRegistry().values()].filter((t) => t.module === r.module && t.code !== cu).slice(0, 16);

  return (
    <div className="mx-auto max-w-[1000px] space-y-4" dir="rtl">
      <div className="flex items-center gap-1.5 text-xs text-slate-400">
        <Link href="/" className="hover:text-slate-700">בית</Link><ArrowLeft className="size-3" />
        <Link href="/transactions/" className="hover:text-slate-700">מרכז טרנזקציות</Link><ArrowLeft className="size-3" />
        <span className="font-bold text-slate-700" dir="ltr">{cu}</span>
      </div>

      <header className="relative overflow-hidden rounded-3xl p-6 text-white shadow-xl" style={{ background: `linear-gradient(135deg, ${c}, ${c}cc)` }}>
        <div className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70"><Terminal className="size-4" />Transaction · {r.module}</div>
          <h1 className="mt-1 font-mono text-4xl font-extrabold tracking-tight" dir="ltr">{cu}</h1>
          <p className="mt-2 text-sm text-white/90">{r.he}{r.area && r.area !== r.he ? ` · ${r.area}` : ""}</p>
        </div>
      </header>

      <div className="flex items-start gap-2.5 rounded-2xl border border-amber-200 bg-amber-50/60 p-4" dir="rtl">
        <Info className="mt-0.5 size-5 shrink-0 text-amber-600" />
        <p className="text-[13px] leading-relaxed text-amber-900">רשומת ברירת-מחדל מאומתת (breadth). הקוד והכותרת אמיתיים; אינטליגנציה מלאה (תיאור עסקי, יחסים, תקלות) עדיין לא נכתבה לטרנזקציה זו. הנתונים למטה נגזרים מהמאגר בלבד — ללא המצאה.</p>
      </div>

      {tables.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-extrabold text-slate-900"><Boxes className="size-4" style={{ color: c }} />טבלאות מקושרות (נגזר מהמאגר)</h2>
          <div className="flex flex-wrap gap-1.5">{tables.map((n) => <Link key={n} href={`/object/${encodeURIComponent(n)}/`} className="tech rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600 hover:bg-brand/10 hover:text-brand" dir="ltr">{n}</Link>)}</div>
        </section>
      )}

      {(incidents.length > 0 || exits.length > 0) && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-extrabold text-slate-900"><AlertTriangle className="size-4 text-amber-500" />תקלות ו-Exits (נגזר מהמאגר)</h2>
          {incidents.length > 0 && <div className="mb-2 flex flex-wrap gap-1.5">{incidents.map((i) => <Link key={i.slug} href={`/troubleshooting/${i.slug}/`} className="rounded-lg bg-rose-50 px-2.5 py-1 text-[11px] font-bold text-rose-700 ring-1 ring-rose-200 hover:bg-rose-100">{i.he} ←</Link>)}</div>}
          {exits.length > 0 && <div className="flex flex-wrap gap-1.5">{exits.map((e) => <span key={e.name} className="tech rounded-lg border border-violet-200 bg-violet-50 px-2 py-0.5 text-[11px] font-bold text-violet-700" dir="ltr">{e.name}</span>)}</div>}
        </section>
      )}

      {sameModule.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-extrabold text-slate-900"><GitBranch className="size-4" style={{ color: c }} />טרנזקציות נוספות ב-{r.module}</h2>
          <div className="flex flex-wrap gap-1.5">{sameModule.map((t) => <Link key={t.code} href={t.href} className="tech rounded-lg px-2.5 py-1 text-[12px] font-bold transition" style={{ background: mc(t.module) + "14", color: mc(t.module) }} dir="ltr">{t.code}</Link>)}</div>
        </section>
      )}

      <div className="flex flex-wrap gap-2 pb-6">
        <Link href="/transactions/" className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2 text-[12px] font-bold text-white"><Terminal className="size-4" />מרכז טרנזקציות</Link>
        <Link href={`/graph/?node=${encodeURIComponent(cu)}`} className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-[12px] font-bold text-slate-600 hover:bg-slate-200"><GitBranch className="size-4" />גרף</Link>
        <Link href={r.module.startsWith("PM") ? "/pm/" : r.module.startsWith("PP") ? "/pp-pi/" : "/sap-infrastructure/"} className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-[12px] font-bold text-slate-600 hover:bg-slate-200"><Workflow className="size-4" />מודול {r.module}</Link>
      </div>
    </div>
  );
}
