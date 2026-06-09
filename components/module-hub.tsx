"use client";

import { useMemo, useState } from "react";
import { Search, LayoutGrid, BookOpen, Wrench } from "lucide-react";
import type { SAPModuleData } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MigrationCockpit } from "@/components/migration-cockpit";
import { TechnicalBlueprint } from "@/components/technical-blueprint";
import { ProgressChart } from "@/components/progress-chart";
import { StatusIO } from "@/components/status-io";
import { ModuleDirectories } from "@/components/module-directories";

type Tab = "cockpit" | "blueprint" | "guides";

function initialQuery() {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("q") ?? "";
}

export function ModuleHub({ module }: { module: SAPModuleData }) {
  const [query, setQuery] = useState(initialQuery);
  const [tab, setTab] = useState<Tab>("cockpit");

  const allTables = useMemo(() => module.topics.flatMap((t) => t.tables), [module.topics]);

  const tabs: { key: Tab; label: string; icon: typeof LayoutGrid }[] = [
    { key: "cockpit", label: "קוקפיט מיגרציה", icon: LayoutGrid },
    { key: "blueprint", label: "Blueprint טכני", icon: BookOpen },
    { key: "guides", label: "מדריכים וכלים", icon: Wrench },
  ];

  return (
    <div className="space-y-6">
      {/* sticky toolbar */}
      <div className="sticky top-0 z-30 -mx-4 border-b border-border bg-background/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-lg sm:border">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="חיפוש בתוך המודול…"
              className="pe-9"
            />
          </div>
          <StatusIO />
        </div>
        <div className="mt-3 flex gap-1 overflow-x-auto">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={cn(
                "flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                tab === key ? "bg-brand text-brand-foreground" : "text-muted-foreground hover:bg-muted",
              )}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {tab === "cockpit" && (
        <div className="space-y-5">
          <div className="rounded-lg border border-border bg-card p-5">
            <ProgressChart tables={allTables} title={`התקדמות מיגרציה — ${module.title}`} />
          </div>
          <MigrationCockpit module={module} query={query} />
        </div>
      )}

      {tab === "blueprint" && <TechnicalBlueprint module={module} query={query} />}

      {tab === "guides" && <ModuleDirectories module={module} />}

      <p className="text-center text-xs text-muted-foreground">
        <Badge className="bg-muted text-muted-foreground">{allTables.length} טבלאות</Badge>{" "}
        <span className="ms-2">סטטוס נשמר מקומית בדפדפן (localStorage)</span>
      </p>
    </div>
  );
}
