"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, GraduationCap, ArrowLeft } from "lucide-react";
import { SEARCH_DOCS, BOOKS } from "@/data/library/academy-index";
import { useI18n } from "@/lib/i18n";

const pad = (n: number) => String(n).padStart(2, "0");
const moduleTint: Record<string, string> = {
  PP: "bg-brand/10 text-brand", PM: "bg-rose-500/15 text-rose-700", QM: "bg-emerald-500/15 text-emerald-700",
};

export default function AcademySearch() {
  const { lang } = useI18n();
  const [q, setQ] = useState("");
  const [mod, setMod] = useState<string>("");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (term.length < 2) return [];
    const words = term.split(/\s+/);
    return SEARCH_DOCS
      .filter((d) => !mod || d.module === mod)
      .map((d) => {
        const hay = `${d.titleHe} ${d.titleEn} ${d.codes} ${d.snippet}`.toLowerCase();
        let score = 0;
        for (const w of words) {
          if (!hay.includes(w)) return { d, score: -1 };
          if (d.codes.toLowerCase().includes(w)) score += 3;
          if (d.titleHe.toLowerCase().includes(w) || d.titleEn.toLowerCase().includes(w)) score += 2;
          score += 1;
        }
        return { d, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 60);
  }, [q, mod]);

  const href = (d: typeof SEARCH_DOCS[number]) => `${d.base}/chapter-${pad(d.ch)}/#sub-${d.id}`;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl space-y-5 p-4">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/library/academy/" className="text-brand hover:underline">{lang === "he" ? "אקדמיה" : "Academy"}</Link><span>/</span>
        <span>{lang === "he" ? "חיפוש מאוחד" : "Unified search"}</span>
      </nav>

      <section dir="rtl" className="glass rounded-2xl p-5 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand"><GraduationCap className="size-3.5" />{lang === "he" ? "חיפוש בכל ספרי האקדמיה" : "Search across all academy books"}</span>
        <h1 className="mt-2 text-xl font-bold">{lang === "he" ? "חיפוש SAP מאוחד" : "Unified SAP Search"}</h1>
        <p className="text-xs text-muted-foreground">{SEARCH_DOCS.length} {lang === "he" ? "יחידות לימוד · נושאים · T-Codes · טבלאות · Fiori" : "units · topics · T-Codes · tables · Fiori"}</p>
        <div className="mt-3 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5">
          <Search className="size-5 text-muted-foreground" />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder={lang === "he" ? "חפש נושא, T-Code, טבלה, אפליקציה..." : "Search topic, T-Code, table, app..."} className="w-full bg-transparent text-base outline-none" />
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          <button onClick={() => setMod("")} className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold ${mod === "" ? "bg-brand text-brand-foreground" : "bg-muted text-muted-foreground"}`}>{lang === "he" ? "הכל" : "All"}</button>
          {BOOKS.map((b) => (
            <button key={b.id} onClick={() => setMod(b.module)} className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold ${mod === b.module ? "bg-brand text-brand-foreground" : "bg-muted text-muted-foreground"}`}>{b.module}</button>
          ))}
        </div>
      </section>

      {q.trim().length >= 2 && (
        <p dir="rtl" className="text-center text-xs text-muted-foreground">{results.length} {lang === "he" ? "תוצאות" : "results"}</p>
      )}

      <div className="space-y-2">
        {results.map(({ d }, i) => (
          <Link key={i} href={href(d)} dir="rtl" className="glass group flex items-center gap-3 rounded-xl p-3 transition-shadow hover:shadow-md">
            <span className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold ${moduleTint[d.module] ?? "bg-muted"}`}>{d.module}</span>
            <span dir="ltr" className="tech shrink-0 rounded bg-muted px-1.5 py-0.5 text-[11px] font-bold text-muted-foreground">{d.id}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold group-hover:text-brand">{d.titleHe}</span>
              {d.codes && <span dir="ltr" className="tech block truncate text-[10px] text-muted-foreground">{d.codes}</span>}
            </span>
            <ArrowLeft className="size-4 shrink-0 text-brand rtl:rotate-180" />
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
