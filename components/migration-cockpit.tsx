"use client";

import { useMemo } from "react";
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
import { useI18n } from "@/lib/i18n";

export function MigrationCockpit({ module, query }: { module: SAPModuleData; query: string }) {
  const { pick, lang } = useI18n();
  const q = query.trim().toLowerCase();
  const rows = useMemo(() => {
    const all = module.topics.flatMap((t) => t.tables);
    if (!q) return all;
    return all.filter(
      (tb) =>
        tb.tableName.toLowerCase().includes(q) ||
        tb.descriptionHe.toLowerCase().includes(q) ||
        tb.descriptionEn.toLowerCase().includes(q) ||
        tb.tcodes.toLowerCase().includes(q),
    );
  }, [module.topics, q]);

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
              <TableRow key={tb.id}>
                <TableCell className="tech font-bold text-brand">
                  <Highlight text={tb.tableName} query={query} />
                </TableCell>
                <TableCell>
                  <Highlight text={pick(tb.descriptionHe, tb.descriptionEn)} query={query} />
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{tb.topicTitle}</TableCell>
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
          <li key={tb.id} className="space-y-2 p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="tech font-bold text-brand">
                <Highlight text={tb.tableName} query={query} />
              </span>
              <StatusSelect id={tb.id} seed={tb.migrationStatus} />
            </div>
            <div className="text-sm">
              <Highlight text={pick(tb.descriptionHe, tb.descriptionEn)} query={query} />
            </div>
            <div className="text-xs text-muted-foreground">{tb.topicTitle}</div>
          </li>
        ))}
      </ul>

      {rows.length === 0 && (
        <p className="p-6 text-center text-sm text-muted-foreground">{lang === "he" ? "אין תוצאות." : "No results."}</p>
      )}
    </div>
  );
}
