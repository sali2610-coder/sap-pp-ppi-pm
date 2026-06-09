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

export function MigrationCockpit({ module, query }: { module: SAPModuleData; query: string }) {
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
              <TableHead>טבלה</TableHead>
              <TableHead>תיאור</TableHead>
              <TableHead>זרם / נושא</TableHead>
              <TableHead className="text-start">סטטוס</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((tb) => (
              <TableRow key={tb.id}>
                <TableCell className="tech font-bold text-brand">{tb.tableName}</TableCell>
                <TableCell>{tb.descriptionHe}</TableCell>
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
              <span className="tech font-bold text-brand">{tb.tableName}</span>
              <StatusSelect id={tb.id} seed={tb.migrationStatus} />
            </div>
            <div className="text-sm">{tb.descriptionHe}</div>
            <div className="text-xs text-muted-foreground">{tb.topicTitle}</div>
          </li>
        ))}
      </ul>

      {rows.length === 0 && (
        <p className="p-6 text-center text-sm text-muted-foreground">אין תוצאות.</p>
      )}
    </div>
  );
}
