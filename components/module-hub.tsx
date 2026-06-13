"use client";

import { useEffect, useMemo, useState } from "react";
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
import { HubZones } from "@/components/hub-zones";

type Tab = "cockpit" | "blueprint" | "guides";

export function ModuleHub({ module }: { module: SAPModuleData }) {
  const { t } = useI18n();
  // start empty so server + client first render match (avoids hydration mismatch → blank subtree);
  // read ?q= deep-link only after mount.
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Tab>("cockpit");
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setQuery(q);
  }, []);

  const allTables = useMemo(() => module.topics.flatMap((tp) => tp.tables), [module.topics]);

  const tabs: { key: Tab; label: string; icon: typeof LayoutGrid }[] = [
    { key: "cockpit", label: t("tab.cockpit"), icon: LayoutGrid },
    { key: "blueprint", label: t("tab.blueprint"), icon: BookOpen },
    { key: "guides", label: t("tab.guides"), icon: Wrench },
  ];

  const subtitleKey = module.module === "PM" ? "hub.pm.subtitle" : "hub.ppi.subtitle";

  const accent = module.module === "PM" ? "#f97316" : "#6d28d9";

  return (
    <div className="space-y-6">
      <header className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-md">
        <span className="absolute inset-y-0 end-0 w-1.5" style={{ background: accent }} />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-2xl text-lg font-extrabold text-white shadow-lg" style={{ background: accent, boxShadow: `0 8px 22px ${accent}55` }}>{module.module}</span>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{module.title}</h1>
              <p className="mt-0.5 text-sm font-medium" style={{ color: accent }}>{t(subtitleKey)}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-center"><span className="block text-xl font-extrabold text-slate-900">{allTables.length}</span><span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">טבלאות</span></span>
            <span className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-center"><span className="block text-xl font-extrabold text-slate-900">{module.topics.length}</span><span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">נושאים</span></span>
          </div>
        </div>
      </header>

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
              <HubZones module={module} accent={accent} />
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
