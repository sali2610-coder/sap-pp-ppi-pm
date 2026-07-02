"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, LayoutGrid, BookOpen, Wrench, Network, ArrowLeft, Database, Layers, Terminal, Cable, ArrowRightLeft, Sparkles } from "lucide-react";
import type { SAPModuleData } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { playTick } from "@/lib/sound";
import { TableExperience } from "@/components/table-experience";
import { TechnicalBlueprint } from "@/components/technical-blueprint";
import { ProgressChart } from "@/components/progress-chart";
import { StatusIO } from "@/components/status-io";
import { ModuleDirectories } from "@/components/module-directories";
import { HubZones } from "@/components/hub-zones";
import { RelatedCenters } from "@/components/related-centers";

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

  // hero stats (verified aggregation)
  const heroStats = useMemo(() => {
    const tc = new Set<string>(), fn = new Set<string>(); let s4 = 0;
    for (const t of allTables) {
      (t.tcodes || "").split(/[^A-Za-z0-9_/]+/).forEach((c) => { if (c.length >= 2 && /^[A-Z]/i.test(c)) tc.add(c.toUpperCase()); });
      (t.funcs || []).forEach((f) => fn.add(f[0]));
      if (t.s4Note) s4++;
    }
    return { tables: allTables.length, topics: module.topics.length, tc: tc.size, fn: fn.size, s4 };
  }, [allTables, module.topics.length]);
  const s4Pct = heroStats.tables ? Math.round((heroStats.s4 / heroStats.tables) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* premium executive hero */}
      <header className="relative overflow-hidden rounded-[2rem] p-6 text-white shadow-[0_30px_60px_-24px_rgba(15,23,42,0.5)] ring-1 ring-white/10 sm:p-8" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc 55%, #0f172a)` }}>
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <motion.span className="absolute -right-24 -top-24 size-72 rounded-full bg-white/10 blur-3xl" animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.75, 0.5] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
          <span className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }} className="relative">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/15 text-lg font-extrabold text-white shadow-inner ring-1 ring-white/25 backdrop-blur">{module.module}</span>
                <div className="min-w-0">
                  <h1 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl">{module.title}</h1>
                  <p className="mt-0.5 text-sm font-semibold text-white/85">{t(subtitleKey)}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur"><Sparkles className="size-3.5" />Architecture Blueprint · ECC → S/4HANA</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/25 px-3 py-1 text-xs font-bold text-amber-50 ring-1 ring-amber-300/40"><ArrowRightLeft className="size-3.5" />{heroStats.s4} שינויי S/4</span>
              </div>
            </div>
            {/* glass stat cards */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[[Database, heroStats.tables, "טבלאות"], [Layers, heroStats.topics, "נושאים"], [Terminal, heroStats.tc, "T-Codes"], [Cable, heroStats.fn, "BAPIs/FM"]].map(([Ic, v, l], i) => { const I = Ic as typeof Database; return (
                <motion.div key={l as string} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06 }} className="flex min-w-[84px] flex-col items-center rounded-2xl border border-white/15 bg-white/10 px-3 py-2.5 backdrop-blur-sm">
                  <I className="mb-0.5 size-4 text-white/70" />
                  <span className="font-mono text-2xl font-extrabold tabular-nums leading-none">{v as number}</span>
                  <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-white/70">{l as string}</span>
                </motion.div>
              ); })}
            </div>
          </div>
          {/* S/4 impact coverage bar */}
          <div className="mt-5">
            <div className="mb-1 flex items-center justify-between text-[11px] font-bold text-white/80"><span>עומק ניתוח S/4HANA</span><span>{heroStats.tables - heroStats.s4} ללא שינוי · {heroStats.s4} משתנה ({s4Pct}%)</span></div>
            <div className="h-2 overflow-hidden rounded-full bg-white/15">
              <motion.div initial={{ width: 0 }} animate={{ width: `${s4Pct}%` }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="h-full rounded-full bg-gradient-to-l from-amber-300 to-amber-400" />
            </div>
          </div>
        </motion.div>
      </header>

      {/* Architecture Studio CTA — the living ER map for this module */}
      <Link href="/studio/" className="group mt-3 flex items-center gap-3 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-l from-slate-900 to-slate-800 p-4 text-white shadow-md transition hover:shadow-lg">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl text-white shadow-sm" style={{ background: accent }}><Network className="size-5" /></span>
        <span className="min-w-0 flex-1"><span className="block text-[15px] font-extrabold">SAP Architecture Studio — מפת הקשרים החיה</span><span className="block text-[12px] text-white/70">חקור את כל טבלאות {module.module} כמפה אינטראקטיבית: זום, רחף, לחץ — והדגש מיד את כל מה שמחובר.</span></span>
        <ArrowLeft className="size-5 shrink-0 text-white/60 transition-transform group-hover:-translate-x-1" />
      </Link>

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
        <div className="mt-3 flex gap-1 chip-rail overflow-x-auto rounded-xl bg-muted/50 p-1">
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
          initial={false}
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
              <TableExperience module={module} query={query} />
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

      <RelatedCenters />
    </div>
  );
}
