"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LayoutGrid, Search, ExternalLink } from "lucide-react";
import APPS from "@/data/library/fiori-apps.json";
import { SEARCH_DOCS } from "@/data/library/academy-index";
import { useI18n } from "@/lib/i18n";

interface App { id: string; name: string; type: string }
const ALL = APPS as App[];

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
  const types = useMemo(() => [...new Set(ALL.map((a) => a.type))].sort(), []);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return ALL.filter((a) => (!type || a.type === type) && (!term || a.id.toLowerCase().includes(term) || a.name.toLowerCase().includes(term)))
      .slice(0, 400);
  }, [q, type]);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl space-y-5 p-4">
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

      <div className="grid gap-2 sm:grid-cols-2">
        {results.map((a) => {
          const refs = REFS[a.id]?.slice(0, 3) ?? [];
          return (
            <div key={a.id} dir="ltr" className="glass rounded-xl p-3">
              <div className="flex items-center gap-2">
                <span className="tech rounded bg-brand/10 px-1.5 py-0.5 text-xs font-bold text-brand">{a.id}</span>
                <span className={`rounded px-1.5 py-0 text-[9px] font-bold ${typeTint[a.type] ?? "bg-muted"}`}>{a.type}</span>
              </div>
              <p className="mt-1 text-sm font-semibold">{a.name}</p>
              {refs.length > 0 && (
                <div dir="rtl" className="mt-1.5 flex flex-wrap gap-1">
                  {refs.map((r, i) => (
                    <Link key={i} href={`${r.base}/chapter-${pad(r.ch)}/#sub-${r.id}`} className="inline-flex items-center gap-0.5 rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground hover:text-brand">
                      <ExternalLink className="size-2.5" />{r.base.split("/").pop()?.replace("-academy", "").toUpperCase()} {r.id}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
