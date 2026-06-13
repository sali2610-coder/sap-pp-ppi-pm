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
import { useI18n } from "@/lib/i18n";

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
    <div className="glass overflow-hidden rounded-2xl">
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
            {rows.map((tb) => (
              <TableRow key={tb.id} data-row={tb.tableName}>
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
        {rows.map((tb) => (
          <li key={tb.id} data-row={tb.tableName} className="space-y-2 p-3">
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
    </div>
  );
}
