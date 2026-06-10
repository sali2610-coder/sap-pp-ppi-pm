"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, ArrowLeft, Clock, Layers } from "lucide-react";
import { PM_TEXTBOOK, PM_TEXTBOOK_STATS } from "@/data/library/pm-textbook";
import { useI18n } from "@/lib/i18n";

const pad = (n: number) => String(n).padStart(2, "0");

export default function PMAcademyIndex() {
  const { lang } = useI18n();
  const keys = Object.keys(PM_TEXTBOOK).map(Number).sort((a, b) => a - b);
  const totNodes = Object.values(PM_TEXTBOOK_STATS).reduce((s, c) => s + c.totalNodes, 0);
  const totMin = Object.values(PM_TEXTBOOK_STATS).reduce((s, c) => s + c.readMin, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl space-y-5 p-4">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/library/" className="text-brand hover:underline">{lang === "he" ? "ספרייה" : "Library"}</Link><span>/</span>
        <Link href="/library/academy/" className="text-brand hover:underline">{lang === "he" ? "אקדמיה" : "Academy"}</Link><span>/</span>
        <span>PM</span>
      </nav>

      <section dir="rtl" className="glass rounded-2xl p-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
          <GraduationCap className="size-3.5" />{lang === "he" ? "אקדמיית PM — תחזוקת מפעל" : "PM Academy — Plant Maintenance"}
        </span>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">{lang === "he" ? "הגדרת תחזוקת מפעל ב-SAP S/4HANA" : "Configuring Plant Maintenance in SAP S/4HANA"}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{lang === "he" ? "ספר לימוד דיגיטלי — תבנית אקדמיה אחודה (18 מקטעים לצומת)" : "Digital textbook — unified Academy template"}</p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-lg border border-border bg-card px-2.5 py-1">{keys.length} {lang === "he" ? "פרקים" : "chapters"}</span>
          <span className="rounded-lg border border-border bg-card px-2.5 py-1">{totNodes} {lang === "he" ? "יחידות לימוד" : "units"}</span>
          <span className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1"><Clock className="size-3" />~{totMin} {lang === "he" ? "דק'" : "min"}</span>
        </div>
      </section>

      <div className="grid gap-3">
        {keys.map((n) => {
          const ch = PM_TEXTBOOK[String(n)];
          const st = PM_TEXTBOOK_STATS[String(n)];
          return (
            <Link key={n} href={`/library/pm-academy/chapter-${pad(n)}/`} dir="rtl" className="glass group flex items-center justify-between gap-3 rounded-2xl p-4 transition-shadow hover:shadow-lg">
              <span className="flex items-center gap-3">
                <span dir="ltr" className="tech grid size-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-dark text-sm font-bold text-brand-foreground">{n}</span>
                <span>
                  <span className="block text-sm font-bold group-hover:text-brand">{ch.titleHe}</span>
                  <span dir="ltr" className="block text-[11px] text-muted-foreground">{ch.titleEn} · {st.totalNodes} {lang === "he" ? "יחידות" : "units"} · ~{st.readMin} {lang === "he" ? "דק'" : "min"}</span>
                </span>
              </span>
              <ArrowLeft className="size-4 shrink-0 text-brand rtl:rotate-180" />
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
