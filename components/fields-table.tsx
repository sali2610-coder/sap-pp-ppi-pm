"use client";

import type { SAPField } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function KeyBadge({ k }: { k: string }) {
  if (k === "PK") return <Badge className="bg-brand/15 text-brand">PK</Badge>;
  if (k === "FK") return <Badge className="bg-status-in-conversion/15 text-status-in-conversion">FK</Badge>;
  return <span className="text-muted-foreground">—</span>;
}

// Data Dictionary view: desktop table; on mobile collapses to a stack of cards
// (shop-floor friendly).
export function FieldsTable({ fields }: { fields: SAPField[] }) {
  const { t, lang } = useI18n();
  if (!fields.length) {
    return (
      <p className="text-sm text-muted-foreground">
        {lang === "he" ? "אין שדות מתועדים לטבלה זו." : "No documented fields for this table."}
      </p>
    );
  }

  return (
    <>
      {/* desktop */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("field.field")}</TableHead>
              <TableHead>{t("field.desc")}</TableHead>
              <TableHead>{t("field.type")}</TableHead>
              <TableHead>{t("field.len")}</TableHead>
              <TableHead>{t("field.key")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((f, i) => (
              <TableRow key={`${f.tech}-${i}`}>
                <TableCell className="tech font-semibold">{f.tech}</TableCell>
                <TableCell>
                  <div>{lang === "en" ? f.en : f.he}</div>
                  <div className="text-xs text-muted-foreground">{lang === "en" ? f.he : f.en}</div>
                </TableCell>
                <TableCell className="tech text-muted-foreground">{f.dt}</TableCell>
                <TableCell className="tech text-muted-foreground">{f.len}</TableCell>
                <TableCell>
                  <KeyBadge k={f.key} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* mobile: stack of cards */}
      <ul className="space-y-2 md:hidden">
        {fields.map((f, i) => (
          <li key={`${f.tech}-${i}`} className="rounded-md border border-border bg-muted/40 p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="tech font-semibold">{f.tech}</span>
              <KeyBadge k={f.key} />
            </div>
            <div className="mt-1 text-sm">{lang === "en" ? f.en : f.he}</div>
            <div className="text-xs text-muted-foreground">{lang === "en" ? f.he : f.en}</div>
            <div className="mt-1.5 flex gap-3 text-xs text-muted-foreground">
              <span className="tech">{f.dt}</span>
              <span className="tech">len: {f.len}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
