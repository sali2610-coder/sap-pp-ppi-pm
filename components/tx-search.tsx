"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, Terminal, Database, ShieldAlert, Boxes, FileCode2, LayoutGrid } from "lucide-react";
import type { SearchHit } from "@/lib/tcode-search";

const KIND = {
  tcode: { he: "T-Codes", icon: Terminal, color: "#0f766e" },
  table: { he: "טבלאות", icon: Database, color: "#0891b2" },
  error: { he: "שגיאות / תקלות", icon: ShieldAlert, color: "#dc2626" },
  object: { he: "אובייקטים", icon: Boxes, color: "#4338ca" },
  cds: { he: "CDS Views", icon: FileCode2, color: "#16a34a" },
  fiori: { he: "Fiori Apps", icon: LayoutGrid, color: "#7c3aed" },
} as const;
const ORDER: (keyof typeof KIND)[] = ["tcode", "fiori", "table", "cds", "error", "object"];

/**
 * The index is fetched, not passed in.
 *
 * It used to arrive as a prop from the server page. Anything crossing into a
 * client component is serialized into the RSC payload, so all 2,167 entries were
 * inlined into /transactions/ as 639 KB of the page's 1,574 KB — and this panel
 * sits inside a collapsed <details>, so every visitor paid for it whether or not
 * they ever opened it. Measured on production: 181 KB transferred against 17–19
 * KB for every other route, and LCP 6.0 s with a healthy 0.29 s TTFB, i.e. the
 * cost was document size, not the server.
 *
 * It is now a static JSON file built by scripts/gen-tx-search-index.mjs from the
 * same buildSearchIndex() the page used to call, so the result set is unchanged.
 * The fetch is triggered by the first real intent to search — focusing the box
 * or picking a suggestion — rather than on mount, because <details> keeps its
 * contents mounted while closed.
 */
const INDEX_URL = "/tx-search-index.json";

export function TxSearch() {
  const [q, setQ] = useState("");
  const [index, setIndex] = useState<SearchHit[] | null>(null);
  const loading = useRef(false);

  const loadIndex = useCallback(() => {
    if (index || loading.current) return;
    loading.current = true;
    fetch(INDEX_URL)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((data: SearchHit[]) => setIndex(data))
      .catch(() => { loading.current = false; });
  }, [index]);

  const groups = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t || !index) return null;
    const terms = t.split(/\s+/);
    const hits = index.filter((h) => terms.every((tm) => h.terms.includes(tm)));
    const g: Record<string, SearchHit[]> = { tcode: [], table: [], error: [], object: [], cds: [], fiori: [] };
    for (const h of hits) { if (g[h.kind].length < 24) g[h.kind].push(h); }
    return g;
  }, [q, index]);
  const total = groups ? Object.values(groups).reduce((a, b) => a + b.length, 0) : 0;
  return (
    <div dir="rtl">
      <div className="flex items-center gap-2 rounded-2xl border-2 border-hairline bg-surface px-4 py-3 shadow-sm focus-within:border-brand">
        <Search className="size-5 text-brand" />
        <input autoFocus value={q} onFocus={loadIndex} onChange={(e) => { loadIndex(); setQ(e.target.value); }} placeholder="חיפוש חכם — T-Code · טבלה · שגיאה · תהליך · אובייקט … (נסה: stock · dump · idoc · backflush · התחשבנות)" className="w-full bg-transparent text-sm outline-none placeholder:text-ink-3" />
        {q && <button onClick={() => setQ("")} className="text-xs font-bold text-ink-3">נקה</button>}
      </div>
      {!q && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["stock", "dump", "idoc", "backflush", "התחשבנות", "batch", "MRP", "authorization", "period"].map((s) => (
            <button key={s} onClick={() => { loadIndex(); setQ(s); }} className="rounded-lg border border-hairline bg-surface-2 px-2.5 py-1 text-xs font-bold text-ink-3 hover:border-brand hover:text-brand">{s}</button>
          ))}
        </div>
      )}
      {/* Only reachable in the moment between typing and the index arriving.
          Without it a query entered that early would render as silence. */}
      {q && !index && <p className="mt-4 text-sm text-ink-3">טוען אינדקס חיפוש…</p>}
      {groups && (
        <div className="mt-4">
          <p className="mb-3 text-xs font-bold text-ink-3">{total} תוצאות</p>
          {total === 0 && <p className="text-sm text-ink-3">לא נמצאו תוצאות.</p>}
          <div className="space-y-4">
            {ORDER.map((k) => groups[k].length > 0 && (
              <section key={k}>
                <h3 className="mb-2 flex items-center gap-2 text-sm font-extrabold text-ink-1">
                  {(() => { const I = KIND[k].icon; return <I className="size-4" style={{ color: KIND[k].color }} />; })()}
                  {KIND[k].he}<span className="text-[11px] font-bold text-ink-3">{groups[k].length}</span>
                </h3>
                <div className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
                  {groups[k].map((h) => (
                    <Link key={h.kind + h.code} href={h.href} className="lift flex items-center justify-between gap-2 rounded-xl border border-hairline bg-surface px-3 py-2 shadow-sm">
                      <span className="min-w-0"><span className="tech text-sm font-extrabold" style={{ color: KIND[k].color }} dir="ltr">{h.label}</span><span className="block truncate text-[11px] text-ink-3">{h.sub}</span></span>
                      <span className="text-brand">→</span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
