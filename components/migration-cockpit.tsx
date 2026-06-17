"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import type { SAPModuleData } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusSelect } from "@/components/status-select";
import { Highlight } from "@/components/highlight";
import { EmptyState } from "@/components/ui/empty-state";
import { Reveal } from "@/components/reveal";
import { Database } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const rowDelay = (i: number) => ({ animationDelay: `${Math.min(i, 12) * 30}ms` });

export function MigrationCockpit({ module, query }: { module: SAPModuleData; query: string }) {
  const { pick, lang, topic } = useI18n();
  const q = query.trim().toLowerCase();
  const rows = useMemo(() => {
    const all = module.topics.flatMap((t) => t.tables);
    if (!q) return all;
    return all.filter(
      (tb) =>
        tb.tableName.toLowerCase().includes(q) ||
        tb.descriptionHe.toLowerCase().includes(q) ||
        tb.descriptionEn.toLowerCase().includes(q) ||
        tb.tcodes.toLowerCase().includes(q) ||
        tb.topicTitle.toLowerCase().includes(q),
    );
  }, [module.topics, q]);

  // Deep-link arrival: when the query matches exactly one table, scroll to it and flash.
  useEffect(() => {
    const exact = rows.find((r) => r.tableName.toLowerCase() === q);
    if (!exact || rows.length > 6) return;
    const id = setTimeout(() => {
      document.querySelectorAll<HTMLElement>(`[data-row="${exact.tableName}"]`).forEach((el) => {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.remove("flash-row"); void el.offsetWidth; el.classList.add("flash-row");
      });
    }, 350);
    return () => clearTimeout(id);
  }, [q, rows]);

  return (
    <Reveal className="surface overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[var(--elev-1)]">
      {/* executive header bar (D4) */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-l from-slate-50 to-white px-4 py-3">
        <h3 className="flex items-center gap-2 text-sm font-extrabold tracking-tight text-slate-900">
          <span className="grid size-7 place-items-center rounded-lg bg-brand/10 text-brand"><Database className="size-4" /></span>
          {lang === "he" ? "מצב מיגרציה — טבלאות" : "Migration status — tables"}
        </h3>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500 tabular-nums">{rows.length} {lang === "he" ? "טבלאות" : "tables"}</span>
      </div>

      {/* desktop table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{lang === "he" ? "טבלה" : "Table"}</TableHead>
              <TableHead>{lang === "he" ? "תיאור" : "Description"}</TableHead>
              <TableHead>{lang === "he" ? "זרם / נושא" : "Stream / Topic"}</TableHead>
              <TableHead className="text-start">{lang === "he" ? "סטטוס" : "Status"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((tb, i) => (
              <TableRow key={tb.id} data-row={tb.tableName} className="row-in transition-colors hover:bg-brand/[0.04]" style={rowDelay(i)}>
                <TableCell className="tech font-bold text-brand">
                  <Link href={`/object/${encodeURIComponent(tb.tableName)}`} className="inline-flex items-center gap-1 hover:underline">
                    <Highlight text={tb.tableName} query={query} />
                  </Link>
                </TableCell>
                <TableCell>
                  <Highlight text={pick(tb.descriptionHe, tb.descriptionEn)} query={query} />
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{topic(tb.topicTitle)}</TableCell>
                <TableCell>
                  <StatusSelect id={tb.id} seed={tb.migrationStatus} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* mobile card stack */}
      <ul className="divide-y divide-border md:hidden">
        {rows.map((tb, i) => (
          <li key={tb.id} data-row={tb.tableName} className="row-in space-y-2 p-3 transition-colors hover:bg-brand/[0.04]" style={rowDelay(i)}>
            <div className="flex items-center justify-between gap-2">
              <Link href={`/object/${encodeURIComponent(tb.tableName)}`} className="tech font-bold text-brand hover:underline">
                <Highlight text={tb.tableName} query={query} />
              </Link>
              <StatusSelect id={tb.id} seed={tb.migrationStatus} />
            </div>
            <div className="text-sm">
              <Highlight text={pick(tb.descriptionHe, tb.descriptionEn)} query={query} />
            </div>
            <div className="text-xs text-muted-foreground">{topic(tb.topicTitle)}</div>
          </li>
        ))}
      </ul>

      {rows.length === 0 && (
        <EmptyState title={lang === "he" ? "אין תוצאות" : "No results"} hint={lang === "he" ? "נסה מונח חיפוש אחר" : "Try a different search term"} />
      )}
    </Reveal>
  );
}
