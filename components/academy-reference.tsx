"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Boxes, Database, LayoutGrid, BookText, Search, Network } from "lucide-react";
import { bookById, bookReference, crossBookObjects, type IndexEntry } from "@/data/library/academy-index";
import { useI18n } from "@/lib/i18n";

const pad = (n: number) => String(n).padStart(2, "0");

export function AcademyReference({ bookId }: { bookId: string }) {
  const { lang } = useI18n();
  const b = bookById(bookId);
  const ref = bookReference(bookId);
  const [tab, setTab] = useState<"tcodes" | "tables" | "fiori" | "glossary">("tcodes");
  const [q, setQ] = useState("");
  const crossMap = useMemo(() => {
    const m = new Map<string, string[]>();
    for (const c of crossBookObjects()) m.set(c.code, c.books);
    return m;
  }, []);
  if (!b || !ref) return null;

  const chapHref = (ch: number, id: string) => `${b.id === "pp" ? "/library/pp" : b.base}/chapter-${pad(ch)}/#sub-${id}`;
  const tabs = [
    ["tcodes", "T-Codes", <Boxes key="i" className="size-4" />, ref.tcodes.length],
    ["tables", lang === "he" ? "טבלאות" : "Tables", <Database key="i" className="size-4" />, ref.tables.length],
    ["fiori", "Fiori Apps", <LayoutGrid key="i" className="size-4" />, ref.fiori.length],
    ["glossary", lang === "he" ? "מילון" : "Glossary", <BookText key="i" className="size-4" />, ref.glossary.length],
  ] as const;

  const filterEntry = (e: IndexEntry) => !q || e.code.toLowerCase().includes(q.toLowerCase());
  const list = tab === "glossary" ? null : (ref[tab] as IndexEntry[]).filter(filterEntry);

  return (
    <div className="mx-auto max-w-4xl space-y-5 p-4">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/library/academy/" className="text-brand hover:underline">{lang === "he" ? "אקדמיה" : "Academy"}</Link><span>/</span>
        <span>{b.module} · {lang === "he" ? "אינדקסים" : "Indexes"}</span>
      </nav>

      <section dir="rtl" className="glass rounded-2xl p-5 text-center">
        <h1 className="text-xl font-bold">{b.titleHe} — {lang === "he" ? "אינדקס מקצועי" : "Reference Index"}</h1>
        <p dir="ltr" className="text-xs text-muted-foreground">{b.titleEn}</p>
        <div className="mt-3 inline-flex flex-wrap justify-center gap-1.5">
          {tabs.map(([k, label, icon, count]) => (
            <button key={k} onClick={() => setTab(k as any)} className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${tab === k ? "bg-brand text-brand-foreground" : "bg-muted text-muted-foreground hover:bg-brand/10"}`}>
              {icon}{label}<span className="rounded-full bg-black/10 px-1.5 text-[10px]">{count}</span>
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
          <Search className="size-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} dir="ltr" placeholder={lang === "he" ? "סנן..." : "Filter..."} className="w-full bg-transparent text-sm outline-none" />
        </div>
      </section>

      {tab === "glossary" ? (
        <section dir="rtl" className="glass rounded-2xl p-5">
          <div className="grid gap-2 sm:grid-cols-2">
            {ref.glossary.filter((g) => !q || g.term.toLowerCase().includes(q.toLowerCase())).map((g, i) => (
              <div key={i} className="rounded-lg border border-border/60 bg-card/50 p-2.5">
                <div className="flex items-center gap-2">
                  <span dir="ltr" className="tech font-bold text-brand">{g.term}</span>
                  <span className="rounded bg-muted px-1.5 py-0 text-[10px] text-muted-foreground">{g.kind}</span>
                  {crossMap.has(g.term) && <span className="rounded bg-brand/10 px-1.5 py-0 text-[9px] font-bold text-brand">{crossMap.get(g.term)!.join("·")}</span>}
                </div>
                <p className="mt-0.5 text-[13px] text-slate-700">{g.he}</p>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section dir="rtl" className="glass rounded-2xl p-5">
          <div className="space-y-2">
            {list!.map((e) => (
              <div key={e.code} className="rounded-lg border border-border/50 bg-card/40 p-2.5">
                <div className="mb-1 flex items-center gap-2">
                  <span dir="ltr" className="tech rounded bg-brand/10 px-1.5 py-0.5 text-sm font-bold text-brand">{e.code}</span>
                  {crossMap.has(e.code) && <span className="inline-flex items-center gap-1 rounded bg-muted px-1.5 py-0 text-[9px] font-bold text-muted-foreground"><Network className="size-2.5" />{crossMap.get(e.code)!.join("·")}</span>}
                  <span className="text-[11px] text-muted-foreground">{e.refs.length} {lang === "he" ? "הופעות" : "refs"}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {e.refs.slice(0, 12).map((r, i) => (
                    <Link key={i} href={chapHref(r.ch, r.id)} dir="rtl" className="rounded bg-muted/60 px-1.5 py-0.5 text-[11px] text-muted-foreground transition-colors hover:bg-brand/10 hover:text-brand">
                      <span dir="ltr" className="tech font-bold">{r.id}</span> {r.titleHe}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            {!list!.length && <p className="text-center text-sm text-muted-foreground">—</p>}
          </div>
        </section>
      )}
    </div>
  );
}
