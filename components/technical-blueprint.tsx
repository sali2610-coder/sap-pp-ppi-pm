"use client";

import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import type { SAPModuleData, SAPTable, SAPTopic } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { FieldsTable } from "@/components/fields-table";
import { CopyButton } from "@/components/copy-button";
import { StatusBadge } from "@/components/status-badge";
import { StatusSelect } from "@/components/status-select";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h4 className="text-xs font-bold uppercase tracking-wide text-brand">{title}</h4>
      {children}
    </div>
  );
}

function TablePanel({ table, topic }: { table: SAPTable; topic: SAPTopic }) {
  return (
    <div className="space-y-5 rounded-md bg-muted/30 p-4">
      {table.guideHe && (
        <Section title="הסבר פונקציונלי">
          <p className="text-sm leading-relaxed">{table.guideHe}</p>
        </Section>
      )}

      <Section title="Mapping · ECC → Fiori / S/4HANA">
        <dl className="grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs text-muted-foreground">טרנזקציות (T-Codes)</dt>
            <dd className="tech">{table.tcodes || "—"}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">הערת S/4HANA</dt>
            <dd>{table.s4Note || "—"}</dd>
          </div>
        </dl>
        {table.helpUrl && (
          <a
            href={table.helpUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs text-status-in-conversion hover:underline"
          >
            <ExternalLink className="size-3" />
            {table.helpLbl || "SAP Help"}
          </a>
        )}
      </Section>

      <Section title="Data Dictionary">
        <FieldsTable fields={table.fields} />
      </Section>

      {(table.funcs.length > 0 || table.progs.length > 0 || topic.ops.interfaces.length > 0) && (
        <Section title="Interface Layer · BAPIs / IDoc / Programs">
          <div className="grid gap-3 sm:grid-cols-2">
            {table.funcs.length > 0 && (
              <ul className="space-y-1 text-sm">
                {table.funcs.map(([name, he], i) => (
                  <li key={i} className="flex flex-col">
                    <span className="tech font-semibold">{name}</span>
                    <span className="text-xs text-muted-foreground">{he}</span>
                  </li>
                ))}
              </ul>
            )}
            {table.progs.length > 0 && (
              <ul className="space-y-1 text-sm">
                {table.progs.map(([name, he], i) => (
                  <li key={i} className="flex flex-col">
                    <span className="tech font-semibold">{name}</span>
                    <span className="text-xs text-muted-foreground">{he}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Section>
      )}

      {table.sqlJoinSnippet && (
        <Section title="Developer SQL Snippet (JOIN)">
          <div className="relative">
            <pre className="overflow-x-auto rounded-md border border-border bg-[#1e1e1e] p-3 text-xs text-[#d4d4d4]">
              {table.sqlJoinSnippet}
            </pre>
            <div className="mt-2">
              <CopyButton text={table.sqlJoinSnippet} label="העתק SQL" />
            </div>
          </div>
        </Section>
      )}

      <div className="flex items-center gap-3 border-t border-border pt-3">
        <span className="text-xs text-muted-foreground">סטטוס מיגרציה:</span>
        <StatusSelect id={table.id} seed={table.migrationStatus} />
      </div>
    </div>
  );
}

export function TechnicalBlueprint({
  module,
  query,
}: {
  module: SAPModuleData;
  query: string;
}) {
  const [openTopics, setOpenTopics] = useState<string[]>([]);
  const q = query.trim().toLowerCase();

  const topics = useMemo(() => {
    if (!q) return module.topics;
    return module.topics
      .map((t) => ({
        ...t,
        tables: t.tables.filter(
          (tb) =>
            tb.tableName.toLowerCase().includes(q) ||
            tb.descriptionHe.toLowerCase().includes(q) ||
            tb.descriptionEn.toLowerCase().includes(q) ||
            tb.tcodes.toLowerCase().includes(q) ||
            tb.fields.some((f) => f.tech.toLowerCase().includes(q)),
        ),
      }))
      .filter((t) => t.tables.length > 0);
  }, [module.topics, q]);

  if (q && topics.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        לא נמצאו טבלאות התואמות ל-&quot;{query}&quot;.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {topics.map((topic) => (
        <details
          key={topic.idx}
          open={Boolean(q) || openTopics.includes(String(topic.idx))}
          className="group rounded-lg border border-border bg-card"
          onToggle={(e) => {
            const id = String(topic.idx);
            const isOpen = (e.currentTarget as HTMLDetailsElement).open;
            setOpenTopics((prev) =>
              isOpen ? [...new Set([...prev, id])] : prev.filter((x) => x !== id),
            );
          }}
        >
          <summary className="flex cursor-pointer items-center justify-between gap-3 p-4 font-semibold marker:content-['']">
            <span>{topic.title}</span>
            <Badge className="bg-muted text-muted-foreground">{topic.tables.length} טבלאות</Badge>
          </summary>
          <div className="border-t border-border px-4 pb-2">
            <Accordion type="multiple" className="w-full">
              {topic.tables.map((table) => (
                <AccordionItem key={table.id} value={table.id}>
                  <AccordionTrigger>
                    <span className="flex flex-1 items-center justify-between gap-3 pe-2">
                      <span className="flex items-center gap-2">
                        <span className="tech font-bold text-brand">{table.tableName}</span>
                        <span className="text-muted-foreground">{table.descriptionHe}</span>
                      </span>
                      <StatusBadge id={table.id} seed={table.migrationStatus} />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <TablePanel table={table} topic={topic} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </details>
      ))}
    </div>
  );
}
