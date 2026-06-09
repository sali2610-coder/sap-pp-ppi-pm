"use client";

import Link from "next/link";
import { ArrowRight, Boxes, FileText, Link2 } from "lucide-react";
import { PP_CHAPTERS } from "@/data/library/pp-knowledge";
import { kindLabel, type PPObject } from "@/lib/pp-object-index";
import { useI18n } from "@/lib/i18n";

const pad = (n: number) => String(n).padStart(2, "0");

export function PPObjectDetail({ obj }: { obj: PPObject }) {
  const { lang } = useI18n();
  const chapters = obj.chapters.map((n) => PP_CHAPTERS.find((c) => c.n === n)).filter(Boolean) as typeof PP_CHAPTERS;

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/library/pp/" className="inline-flex items-center gap-1 text-brand hover:underline">
          <ArrowRight className="size-4 rtl:rotate-180" /> PP
        </Link>
        <span>/</span>
        <span>{lang === "he" ? "אובייקט SAP" : "SAP object"}</span>
      </nav>

      <section className="glass rounded-2xl p-6 text-center">
        <span dir="ltr" className="tech inline-block rounded-lg bg-gradient-to-br from-brand to-brand-dark px-3 py-1 text-lg font-bold text-brand-foreground">
          {obj.code}
        </span>
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          {obj.kinds.map((k) => (
            <span key={k} className="rounded-md bg-brand/10 px-1.5 py-0.5 text-[11px] font-semibold text-brand">{kindLabel(k)}</span>
          ))}
        </div>
        {obj.he && <p dir="rtl" className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-700">{obj.he}</p>}
      </section>

      <section dir="rtl" className="glass rounded-2xl p-5">
        <h2 className="mb-2 flex items-center gap-2 text-sm font-bold text-brand"><FileText className="size-4" />{lang === "he" ? "מופיע בפרקים" : "Appears in chapters"}</h2>
        <div className="space-y-2">
          {chapters.map((c) => (
            <Link key={c.n} href={`/library/pp/chapter-${pad(c.n)}/`} className="flex items-center justify-between rounded-xl border border-border/60 bg-card/50 p-3 text-sm transition-colors hover:border-brand">
              <span><b>{c.n}.</b> {c.he}</span>
              <span className="text-[11px] text-muted-foreground">pp.{c.pages[0]}–{c.pages[1]}</span>
            </Link>
          ))}
        </div>
      </section>

      <section dir="rtl" className="glass rounded-2xl p-5">
        <h2 className="mb-2 flex items-center gap-2 text-sm font-bold text-muted-foreground"><Link2 className="size-4" />{lang === "he" ? "חיפוש חוצה-מודולים" : "Cross-module search"}</h2>
        <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold">
          <Link href={`/pp-pi/?q=${encodeURIComponent(obj.code)}`} className="rounded-lg bg-blue-500/15 px-2 py-1 text-blue-700">PP-PI · {obj.code}</Link>
          <Link href={`/pm/?q=${encodeURIComponent(obj.code)}`} className="rounded-lg bg-rose-500/15 px-2 py-1 text-rose-700">PM · {obj.code}</Link>
        </div>
      </section>

      <Link href="/library/pp/" className="flex items-center justify-center gap-1.5 text-sm text-brand hover:underline">
        <Boxes className="size-4" />{lang === "he" ? "כל אובייקטי ה-PP" : "All PP objects"}
      </Link>
    </div>
  );
}
