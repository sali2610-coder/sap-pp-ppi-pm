"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ChevronDown, FileText, Library as LibraryIcon } from "lucide-react";
import { LIBRARY, LIBRARY_STATS, type LibBook, type LibChapter } from "@/data/library";
import { useI18n } from "@/lib/i18n";
import { playPing } from "@/lib/sound";

// A single chapter — click to expand the dual-language inner technical text.
function ChapterRow({ c }: { c: LibChapter }) {
  const [open, setOpen] = useState(false);
  const hasBody = Boolean(c.bodyEn || c.bodyHe);
  return (
    <li>
      <button
        onClick={() => {
          if (!hasBody) return;
          playPing();
          setOpen((v) => !v);
        }}
        className={`grid w-full gap-1 px-5 py-3 text-start transition-colors sm:grid-cols-2 sm:gap-4 ${hasBody ? "hover:bg-muted/50" : ""}`}
      >
        <div dir="ltr" className="flex items-start gap-2 text-start">
          <span className="tech mt-0.5 shrink-0 rounded bg-muted px-1.5 text-[11px] font-bold text-muted-foreground">{c.n}</span>
          <span className="text-sm font-medium">{c.en}</span>
          {c.page ? <span className="ms-auto shrink-0 text-[11px] text-muted-foreground">p.{c.page}</span> : null}
        </div>
        <div dir="rtl" className="flex items-start gap-2 text-start">
          <FileText className="mt-0.5 size-3.5 shrink-0 text-brand" />
          <span className="text-sm font-medium">{c.he}</span>
          {hasBody && <ChevronDown className={`ms-auto size-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && hasBody && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="grid gap-3 px-5 pb-4 sm:grid-cols-2 sm:gap-4">
              <div dir="ltr" className="flex max-h-96 flex-col rounded-xl border border-border/50 bg-background/50 p-3 text-start">
                <p className="mb-1 shrink-0 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Original (SAP manual)</p>
                <p className="overflow-y-auto whitespace-pre-line text-xs leading-relaxed text-muted-foreground">{c.bodyEn || "—"}</p>
              </div>
              <div dir="rtl" className="flex max-h-96 flex-col rounded-xl border border-brand/20 bg-brand-soft/50 p-3 text-start">
                <p className="mb-1 shrink-0 text-[10px] font-bold uppercase tracking-wide text-brand">תרגום מקצועי לעברית</p>
                <p className="overflow-y-auto whitespace-pre-line text-xs leading-relaxed">{c.bodyHe || "—"}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

const MODULE_TINT: Record<string, string> = {
  PM: "from-rose-500/15",
  "PP-PI": "from-blue-500/15",
  PP: "from-blue-500/15",
  QM: "from-violet-500/15",
  MM: "from-amber-500/15",
  WM: "from-emerald-500/15",
  IBP: "from-cyan-500/15",
  Fiori: "from-fuchsia-500/15",
  Foundation: "from-slate-500/15",
};

function BookCard({ book }: { book: LibBook }) {
  const { lang, pick } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: open ? 1 : 1.02 }}
      className={`glass overflow-hidden rounded-2xl shadow-xl transition-shadow hover:shadow-2xl`}
    >
      <button
        onClick={() => {
          playPing();
          setOpen((v) => !v);
        }}
        className="relative block w-full p-5 text-start"
      >
        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-bl ${MODULE_TINT[book.module] ?? "from-slate-500/10"} to-transparent opacity-70`} />
        <div className="relative flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-brand-foreground shadow-lg shadow-brand/30 ring-1 ring-white/20">
            <BookOpen className="size-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-brand/10 px-1.5 py-0.5 text-[10px] font-bold text-brand">{book.module}</span>
              <span className="text-[11px] text-muted-foreground">{book.publisher}</span>
              <span className="text-[11px] text-muted-foreground">· {book.pages} pages</span>
            </div>
            <h3 className="mt-1 font-bold leading-tight">{pick(book.titleHe, book.title)}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{lang === "he" ? book.title : book.titleHe}</p>
          </div>
          <ChevronDown className={`size-5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
        </div>

        {/* summary split */}
        <div className="relative mt-3 grid gap-2 sm:grid-cols-2">
          <p dir="ltr" className="rounded-lg border border-border/50 bg-background/40 p-2 text-start text-xs leading-relaxed text-muted-foreground">
            {book.summaryEn}
          </p>
          <p dir="rtl" className="rounded-lg border border-brand/20 bg-brand-soft/50 p-2 text-start text-xs leading-relaxed">
            {book.summaryHe}
          </p>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border/60"
          >
            <ul className="divide-y divide-border/50">
              {book.chapters.map((c) => (
                <ChapterRow key={c.n} c={c} />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function LibraryPage() {
  const { t, lang } = useI18n();
  return (
    <div className="space-y-8">
      <section className="space-y-3 pt-2 text-center animate-float-in">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
          <LibraryIcon className="size-3.5" />
          {lang === "he" ? "ספריית SAP הדיגיטלית" : "SAP Digital Library"}
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {lang === "he" ? "ספריית SAP הדיגיטלית" : "SAP Digital Library"}
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          {lang === "he"
            ? "אינדקס דו-לשוני של 10 מדריכי SAP S/4HANA רשמיים — מבנה הפרקים והקונפיגורציה, אנגלית מקורית לצד תרגום עברי מקצועי ל-CBC."
            : "A bilingual index of 10 official SAP S/4HANA manuals — chapter & configuration structure, original English alongside a professional Hebrew translation for CBC."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-muted-foreground">
          <span className="rounded-lg border border-border bg-card px-2.5 py-1">{LIBRARY_STATS.books} {lang === "he" ? "ספרים" : "books"}</span>
          <span className="rounded-lg border border-border bg-card px-2.5 py-1">{LIBRARY_STATS.pages.toLocaleString()} {lang === "he" ? "עמודים" : "pages"}</span>
          <span className="rounded-lg border border-border bg-card px-2.5 py-1">{LIBRARY_STATS.chapters} {lang === "he" ? "פרקים מתורגמים" : "translated chapters"}</span>
        </div>
      </section>

      <div className="grid gap-5">
        {LIBRARY.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {lang === "he"
          ? "האינדקס חולץ אוטומטית מתוכן העניינים של קובצי ה-PDF המקוריים ב-docs/. תרגום עברי מקצועי נכתב עבור CBC."
          : "Index auto-extracted from the original PDF tables of contents in docs/. Hebrew professionally translated for CBC."}
      </p>
    </div>
  );
}
