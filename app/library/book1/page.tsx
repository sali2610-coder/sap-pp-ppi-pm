"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BookOpen, ChevronDown, FileText, Layers } from "lucide-react";
import book1 from "@/data/library/book1-full.json";
import { useI18n } from "@/lib/i18n";
import { playPing } from "@/lib/sound";
import { ChapterDiagram } from "@/components/book1-diagrams";

interface Section { id: string; title: string; en: string; he: string }
interface Chapter { n: number; title: string; pages: number[]; translated?: boolean; sections: Section[] }

const DATA = book1 as { book: string; pages: number; chapters: Chapter[] };

function SectionRow({ s }: { s: Section }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="rounded-xl border border-border/60 bg-card/50">
      <button
        onClick={() => {
          playPing();
          setOpen((v) => !v);
        }}
        className="flex w-full items-center gap-3 p-3 text-start transition-colors hover:bg-muted/50"
      >
        <span className="tech shrink-0 rounded-md bg-brand/10 px-2 py-0.5 text-xs font-bold text-brand">{s.id}</span>
        <span className="min-w-0 flex-1 text-sm font-medium">{s.title}</span>
        <ChevronDown className={`size-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="grid gap-3 p-3 pt-0 sm:grid-cols-2">
              <div dir="ltr" className="flex max-h-[28rem] flex-col rounded-lg border border-border/50 bg-background/60 p-3">
                <p className="mb-1 shrink-0 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Original (SAP manual)</p>
                <p className="overflow-y-auto whitespace-pre-line text-xs leading-relaxed text-muted-foreground">{s.en}</p>
              </div>
              <div dir="rtl" className="flex max-h-[28rem] flex-col rounded-lg border border-brand/20 bg-brand-soft/50 p-3">
                <p className="mb-1 shrink-0 text-[10px] font-bold uppercase tracking-wide text-brand">תרגום מקצועי לעברית</p>
                {s.he ? (
                  <p className="overflow-y-auto whitespace-pre-line text-xs leading-relaxed">{s.he}</p>
                ) : (
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-status-in-analysis" />
                    תרגום בהכנה — האנגלית חולצה במלואה. בקש &quot;תרגם פרק {s.id.split(".")[0]}&quot; להוספה.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function ChapterBlock({ ch }: { ch: Chapter }) {
  const [open, setOpen] = useState(ch.n === 1);
  return (
    <section className="glass overflow-hidden rounded-2xl">
      <button
        onClick={() => {
          playPing();
          setOpen((v) => !v);
        }}
        className="flex w-full items-center gap-3 p-4 text-start"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-brand-foreground shadow-lg shadow-brand/30">
          <Layers className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-bold">
            {ch.n}. {ch.title}
          </span>
          <span className="text-xs text-muted-foreground">
            pp. {ch.pages[0]}–{ch.pages[1]} · {ch.sections.length} sections
          </span>
        </span>
        <span
          className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
            ch.translated ? "bg-status-done/15 text-status-done" : "bg-status-in-analysis/15 text-status-in-analysis"
          }`}
        >
          {ch.translated ? "EN · עברית" : "EN ✓ · עברית בהכנה"}
        </span>
        <ChevronDown className={`size-5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden px-4 pb-4"
          >
            <ChapterDiagram n={ch.n} />
            <div className="space-y-2">
              {ch.sections.map((s) => (
                <SectionRow key={s.id} s={s} />
              ))}
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </section>
  );
}

export default function Book1Page() {
  const { lang } = useI18n();
  const translatedChapters = DATA.chapters.filter((c) => c.translated).length;
  const totalSections = DATA.chapters.reduce((s, c) => s + c.sections.length, 0);
  return (
    <div className="space-y-6">
      <Link href="/library/" className="inline-flex items-center gap-1.5 text-sm text-brand hover:underline">
        <ArrowRight className="size-4 rtl:rotate-180" />
        {lang === "he" ? "חזרה לספרייה" : "Back to library"}
      </Link>

      <section className="space-y-3 text-center animate-float-in">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
          <BookOpen className="size-3.5" />
          Book #1 · 729 pages · PM
        </span>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{DATA.book}</h1>
        <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
          {lang === "he"
            ? "עומק מלא ברמת סעיף: טקסט הקונפיגורציה האנגלי המקורי מתוך המדריך לצד תרגום עברי מקצועי. נבנה פרק-אחר-פרק."
            : "Full section-level depth: original English configuration text from the manual beside a professional Hebrew translation. Built chapter-by-chapter."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-lg border border-border bg-card px-2.5 py-1">
            {translatedChapters}/9 {lang === "he" ? "פרקים מתורגמים" : "chapters translated"}
          </span>
          <span className="rounded-lg border border-border bg-card px-2.5 py-1">
            {totalSections} {lang === "he" ? "סעיפים (אנגלית מלאה)" : "sections (full English)"}
          </span>
          <span className="rounded-lg border border-border bg-card px-2.5 py-1">
            <FileText className="me-1 inline size-3" />
            {lang === "he" ? "1M תווים חולצו · כל 729 העמודים" : "1M chars extracted · all 729 pages"}
          </span>
        </div>
      </section>

      <div className="space-y-4">
        {DATA.chapters.map((ch) => (
          <ChapterBlock key={ch.n} ch={ch} />
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {lang === "he"
          ? "כל 729 העמודים חולצו (מאוחסן מודולרית ב-data/library/book1/). פרקים 2–9 ממתינים לתרגום — נוספים לפי בקשה."
          : "All 729 pages extracted (stored modularly in data/library/book1/). Chapters 2–9 await translation — appended on request."}
      </p>
    </div>
  );
}
