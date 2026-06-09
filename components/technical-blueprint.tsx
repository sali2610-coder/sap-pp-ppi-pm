"use client";

import { useMemo, useState } from "react";
import type { SAPModuleData, SAPTable, SAPTopic } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { FieldsTable } from "@/components/fields-table";
import { SqlBlock } from "@/components/sql-block";
import { FioriTransform } from "@/components/fiori-transform";
import { StatusBadge } from "@/components/status-badge";
import { StatusSelect } from "@/components/status-select";
import { Highlight } from "@/components/highlight";
import { useI18n } from "@/lib/i18n";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h4 className="text-xs font-bold uppercase tracking-wide text-brand">{title}</h4>
      {children}
    </div>
  );
}

function TablePanel({ table, topic }: { table: SAPTable; topic: SAPTopic }) {
  const { t } = useI18n();
  return (
    <div className="space-y-5 rounded-xl border border-border/60 bg-background/40 p-4">
      {table.guideHe && (
        <Section title={t("sec.func")}>
          <p className="text-sm leading-relaxed">{table.guideHe}</p>
        </Section>
      )}

      <Section title={t("sec.mapping")}>
        <FioriTransform
          tcodes={table.tcodes}
          s4Note={table.s4Note}
          fioriApp={table.fioriApp}
          s4AltTable={table.s4AltTable}
          s4AltTcode={table.s4AltTcode}
        />
        {table.sumNote && (
          <p className="rounded-lg bg-muted/50 p-2 text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">SUM: </span>
            {table.sumNote}
          </p>
        )}
        {table.helpLbl && (
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold">SAP Help: </span>
            {table.helpLbl}
          </p>
        )}
      </Section>

      <Section title={t("sec.dict")}>
        <FieldsTable fields={table.fields} />
      </Section>

      {table.relations.length > 0 && (
        <Section title={t("sec.relations")}>
          <ul className="space-y-2">
            {table.relations.map((rel, i) => (
              <li
                key={i}
                className="flex flex-wrap items-center gap-2 rounded-xl border border-border/60 bg-background/50 p-2.5 text-sm"
              >
                <span
                  className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                    rel.role === "parent"
                      ? "bg-status-done/15 text-status-done"
                      : "bg-status-in-conversion/15 text-status-in-conversion"
                  }`}
                >
                  {rel.role === "parent" ? t("rel.parent") : t("rel.child")}
                </span>
                <span className="tech font-bold text-brand">{rel.table}</span>
                {rel.card && (
                  <span className="rounded bg-muted px-1.5 text-[11px] text-muted-foreground">{rel.card}</span>
                )}
                {rel.join && <code className="tech text-xs text-muted-foreground">{rel.join}</code>}
                {rel.desc && <span className="w-full text-xs text-muted-foreground">{rel.desc}</span>}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {(table.funcs.length > 0 || table.progs.length > 0 || topic.ops.interfaces.length > 0) && (
        <Section title={t("sec.interface")}>
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
        <Section title={t("sec.sql")}>
          <SqlBlock code={table.sqlJoinSnippet} />
        </Section>
      )}

      <div className="flex items-center gap-3 border-t border-border pt-3">
        <span className="text-xs text-muted-foreground">{t("status.label")}</span>
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
  const { t: tr, pick } = useI18n();
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
        {tr("search.empty")} — &quot;{query}&quot;
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {topics.map((topic) => (
        <details
          key={topic.idx}
          open={Boolean(q) || openTopics.includes(String(topic.idx))}
          className="group glass overflow-hidden rounded-2xl"
          onToggle={(e) => {
            const id = String(topic.idx);
            const isOpen = (e.currentTarget as HTMLDetailsElement).open;
            setOpenTopics((prev) =>
              isOpen ? [...new Set([...prev, id])] : prev.filter((x) => x !== id),
            );
          }}
        >
          <summary className="flex cursor-pointer items-center justify-between gap-3 p-4 font-semibold marker:content-['']">
            <span className="flex items-center gap-2.5">
              <span className="size-2 rounded-full bg-brand" />
              {topic.title}
            </span>
            <Badge className="bg-muted text-muted-foreground">
              {topic.tables.length} {tr("hub.tables")}
            </Badge>
          </summary>
          <div className="border-t border-border px-4 pb-2">
            <Accordion type="multiple" className="w-full">
              {topic.tables.map((table) => (
                <AccordionItem key={table.id} value={table.id}>
                  <AccordionTrigger>
                    <span className="flex flex-1 items-center justify-between gap-3 pe-2">
                      <span className="flex items-center gap-2">
                        <span className="tech font-bold text-brand">
                          <Highlight text={table.tableName} query={query} />
                        </span>
                        <span className="text-muted-foreground">
                          <Highlight text={pick(table.descriptionHe, table.descriptionEn)} query={query} />
                        </span>
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
