"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, LayoutGrid, BookOpen, Wrench } from "lucide-react";
import type { SAPModuleData } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { playTick } from "@/lib/sound";
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
  const { t } = useI18n();
  const [query, setQuery] = useState(initialQuery);
  const [tab, setTab] = useState<Tab>("cockpit");

  const allTables = useMemo(() => module.topics.flatMap((tp) => tp.tables), [module.topics]);

  const tabs: { key: Tab; label: string; icon: typeof LayoutGrid }[] = [
    { key: "cockpit", label: t("tab.cockpit"), icon: LayoutGrid },
    { key: "blueprint", label: t("tab.blueprint"), icon: BookOpen },
    { key: "guides", label: t("tab.guides"), icon: Wrench },
  ];

  const subtitleKey = module.module === "PM" ? "hub.pm.subtitle" : "hub.ppi.subtitle";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{module.title}</h1>
        <p className="text-sm text-muted-foreground">{t(subtitleKey)}</p>
      </div>

      {/* sticky toolbar */}
      <div className="glass sticky top-[4.5rem] z-30 -mx-2 rounded-2xl px-4 py-3 sm:mx-0">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("hub.searchInModule")}
              className="pe-9"
            />
          </div>
          <StatusIO />
        </div>
        <div className="mt-3 flex gap-1 overflow-x-auto rounded-xl bg-muted/50 p-1">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => {
                playTick();
                setTab(key);
              }}
              className={cn(
                "relative flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                tab === key ? "text-brand-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab === key && (
                <motion.span
                  layoutId="hub-tab"
                  className="absolute inset-0 rounded-lg bg-gradient-to-br from-brand to-brand-dark shadow-sm shadow-brand/30"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon className="relative size-4" />
              <span className="relative">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {tab === "cockpit" && (
            <div className="space-y-5">
              <div className="glass rounded-2xl p-5">
                <ProgressChart tables={allTables} title={`${t("hub.progress")} — ${module.title}`} />
              </div>
              <MigrationCockpit module={module} query={query} />
            </div>
          )}

          {tab === "blueprint" && <TechnicalBlueprint module={module} query={query} />}

          {tab === "guides" && <ModuleDirectories module={module} />}
        </motion.div>
      </AnimatePresence>

      <p className="text-center text-xs text-muted-foreground">
        <Badge className="bg-muted text-muted-foreground">
          {allTables.length} {t("hub.tables")}
        </Badge>{" "}
        <span className="ms-2">{t("hub.savedLocal")}</span>
      </p>
    </div>
  );
}
