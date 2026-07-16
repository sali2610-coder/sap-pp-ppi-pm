"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Terminal, Search, Star, Clock, Flame, AppWindow, Layers, ArrowLeft } from "lucide-react";
import { TX_INTEL } from "@/data/tx-intel";
import { txRegistry, registryStats } from "@/lib/tx-registry";
import { txMostPopular, txPopularity } from "@/lib/tx-intel";
import { useTxFavorites, useRecentTx, toggleTxFavorite } from "@/lib/tx-prefs";
import { EmptyState } from "@/components/ui/empty-state";
import { setActiveEntity } from "@/lib/workspace";

const MOD_COLOR: Record<string, string> = {
  PP: "#6d28d9", "PP-PI": "#6d28d9", PM: "#f97316", QM: "#0d9488", MM: "#2563eb",
  SD: "#0891b2", FI: "#16a34a", CO: "#d97706", WM: "#7c3aed", PS: "#be185d",
  LE: "#0891b2", HR: "#0d9488", BASIS: "#475569", SECURITY: "#dc2626", ABAP: "#1e293b",
};
const mc = (m: string) => MOD_COLOR[m] || MOD_COLOR[(m || "").split(/[ /]/)[0]] || "#64748b";

// Fuzzy, typo-tolerant score of one query token against a haystack (0 = no match).
// prefix > substring(earlier=better) > in-order subsequence (tolerates gaps/typos).
function tokenScore(hay: string, q: string): number {
  const i = hay.indexOf(q);
  if (i === 0) return 100;
  if (i > 0) return 70 - Math.min(i, 30);
  let qi = 0;
  for (let h = 0; h < hay.length && qi < q.length; h++) if (hay[h] === q[qi]) qi++;
  return qi === q.length ? 28 : 0;
}
// Every whitespace token must match somewhere; total score ranks the row.
function fuzzyScore(hay: string, query: string): number {
  const toks = query.split(/\s+/).filter(Boolean);
  let total = 0;
  for (const t of toks) { const s = tokenScore(hay, t); if (s === 0) return 0; total += s; }
  return total;
}

type View = "all" | "fav" | "recent" | "popular";

export function TransactionWorkspace() {
  const all = useMemo(() => [...txRegistry().values()], []);
  const stats = useMemo(() => registryStats(), []);
  const modules = useMemo(() => Object.keys(stats.byModule).sort((a, b) => stats.byModule[b] - stats.byModule[a]), [stats]);
  const popular = useMemo(() => txMostPopular(40), []);
  const favs = useTxFavorites();
  const recent = useRecentTx();

  const [view, setView] = useState<View>("all");
  const [q, setQ] = useState("");
  const [mod, setMod] = useState<string>("");
  const [flag, setFlag] = useState<"" | "deep" | "fiori">("");
  const reg = txRegistry();

  const list = useMemo(() => {
    let base: string[];
    if (view === "fav") base = favs.filter((c) => reg.has(c));
    else if (view === "recent") base = recent.filter((c) => reg.has(c));
    else if (view === "popular") base = popular;
    else base = all.map((t) => t.code);
    let rows = base.map((c) => reg.get(c)!).filter(Boolean);
    if (mod) rows = rows.filter((t) => t.module === mod);
    if (flag === "deep") rows = rows.filter((t) => t.depth === "deep");
    if (flag === "fiori") rows = rows.filter((t) => { const d = TX_INTEL[t.code]; return d && d.fiori && d.fiori.trim(); });
    const s = q.trim().toLowerCase();
    if (s) {
      // fuzzy, typo-tolerant match over code + Hebrew + English + area + module,
      // ranked by relevance (code hits win). Understands "iw31", partial, en/he names.
      rows = rows
        .map((t) => ({ t, sc: fuzzyScore(`${t.code} ${t.area} ${t.he} ${t.en} ${t.module}`.toLowerCase(), s) }))
        .filter((r) => r.sc > 0)
        .sort((a, b) => b.sc - a.sc || txPopularity(b.t.code) - txPopularity(a.t.code))
        .map((r) => r.t);
    } else if (view === "all") {
      rows = [...rows].sort((a, b) => (b.depth === "deep" ? 1 : 0) - (a.depth === "deep" ? 1 : 0) || txPopularity(b.code) - txPopularity(a.code));
    }
    return rows.slice(0, 300);
  }, [all, view, favs, recent, popular, mod, flag, q, reg]);

  const VIEWS: [View, string, typeof Star][] = [["all", "הכול", Terminal], ["popular", "פופולרי", Flame], ["fav", "מועדפים", Star], ["recent", "נצפו לאחרונה", Clock]];

  return (
    <div dir="rtl">
      <div className="mb-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {[["טרנזקציות במאגר", stats.total], ["מתועדות לעומק", stats.deep], ["מועדפים", favs.length], ["מודולים", modules.length]].map(([l, n]) => (
          <div key={l as string} className="rounded-2xl border border-hairline bg-surface p-3 text-center shadow-sm"><div className="font-mono text-2xl font-extrabold text-ink-1">{n as number}</div><div className="text-[11px] font-bold text-ink-3">{l as string}</div></div>
        ))}
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5">
        {VIEWS.map(([v, l, Ic]) => <button key={v} onClick={() => setView(v)} className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[13px] font-bold transition ${view === v ? "bg-brand text-white shadow-sm" : "bg-surface-2 text-ink-3 hover:bg-hairline"}`}><Ic className="size-3.5" />{l}</button>)}
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <div className="flex min-w-[200px] flex-1 items-center gap-2 rounded-xl border border-hairline bg-surface px-3 py-2">
          <Search className="size-4 shrink-0 text-ink-3" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש חכם — קוד (IW31) · שם עברי/אנגלי · תיאור · חלקי" className="w-full bg-transparent text-sm outline-none placeholder:text-ink-3" />
        </div>
        <button onClick={() => setFlag(flag === "deep" ? "" : "deep")} className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-[12px] font-bold transition ${flag === "deep" ? "bg-brand text-white" : "bg-surface-2 text-ink-3 hover:bg-hairline"}`}><Layers className="size-3.5" />מתועד לעומק</button>
        <button onClick={() => setFlag(flag === "fiori" ? "" : "fiori")} className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-[12px] font-bold transition ${flag === "fiori" ? "bg-blue-600 text-white" : "bg-surface-2 text-ink-3 hover:bg-hairline"}`}><AppWindow className="size-3.5" />Fiori זמין</button>
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        <button onClick={() => setMod("")} className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${!mod ? "bg-slate-900 text-white" : "bg-surface-2 text-ink-3 hover:bg-hairline"}`}>הכול</button>
        {modules.map((m) => { const on = mod === m; const col = mc(m); return <button key={m} onClick={() => setMod(on ? "" : m)} className="rounded-lg px-2.5 py-1 text-[11px] font-bold transition" style={on ? { background: col, color: "#fff" } : { background: col + "14", color: col }}>{m} · {stats.byModule[m]}</button>; })}
      </div>

      {list.length === 0 ? (
        <EmptyState title={view === "fav" ? "אין מועדפים עדיין" : view === "recent" ? "לא נצפו טרנזקציות עדיין" : "אין תוצאות"} hint={view === "fav" ? "סמן כוכב בעמוד טרנזקציה כדי להוסיף למועדפים" : view === "recent" ? "טרנזקציות שתפתח יופיעו כאן" : "נסה קוד, אזור או מודול אחר"} suggestions={view === "all" ? [{ label: "הצג הכול", onClick: () => { setQ(""); setMod(""); setFlag(""); } }] : undefined} />
      ) : (
        <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((t) => { const col = mc(t.module); const isFav = favs.includes(t.code); const deep = t.depth === "deep"; const d = TX_INTEL[t.code]; const pop = txPopularity(t.code); return (
            <div key={t.code} onMouseEnter={() => setActiveEntity(t.code)} className="group relative min-w-0 overflow-hidden rounded-2xl border border-hairline bg-surface p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md">
              <button onClick={() => toggleTxFavorite(t.code)} aria-label="מועדף" className="absolute left-2.5 top-2.5 z-10 rounded-lg p-1 text-ink-3 transition hover:bg-amber-50 hover:text-amber-500"><Star className={`size-4 ${isFav ? "fill-amber-400 text-amber-500" : ""}`} /></button>
              <Link href={t.href} className="block">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl text-white shadow-sm" style={{ background: `linear-gradient(135deg,${col},${col}cc)` }}><Terminal className="size-5" /></span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5"><span className="font-mono text-[15px] font-extrabold text-ink-1" dir="ltr">{t.code}</span><span className="rounded px-1.5 py-0.5 text-[9px] font-bold" style={{ background: col + "1a", color: col }}>{t.module}</span></div>
                    <div className="truncate text-[11px] font-bold text-ink-3">{t.he}</div>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  {deep ? <span className="rounded-md bg-brand/10 px-1.5 py-0.5 text-[10px] font-bold text-brand">מתועד לעומק</span> : <span className="rounded-md bg-surface-2 px-1.5 py-0.5 text-[10px] font-bold text-ink-3">מאומת</span>}
                  {d?.fiori && d.fiori.trim() && <span className="rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-blue-600">Fiori</span>}
                  {pop > 0 && <span className="inline-flex items-center gap-0.5 rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-600"><Flame className="size-2.5" />{pop}</span>}
                  <span className="ms-auto inline-flex items-center gap-0.5 text-[10px] font-bold text-ink-3 transition group-hover:text-brand">פתח<ArrowLeft className="size-3" /></span>
                </div>
              </Link>
            </div>
          ); })}
        </div>
      )}
      {list.length >= 300 && <p className="mt-3 text-center text-[11px] text-ink-3">מוצגות 300 הראשונות — צמצם עם חיפוש/מסננים</p>}
    </div>
  );
}
