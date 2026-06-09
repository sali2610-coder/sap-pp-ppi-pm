"use client";

import { useI18n } from "@/lib/i18n";

export function HomeHero({ tableCount }: { tableCount: number }) {
  const { t } = useI18n();
  return (
    <section className="space-y-4 pt-6 text-center animate-float-in">
      <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
        <span className="size-1.5 rounded-full bg-brand" />
        {t("hero.badge")}
      </span>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Project NEO Cockpit</h1>
      <p className="mx-auto max-w-2xl text-balance text-muted-foreground sm:text-lg">{t("hero.tagline")}</p>
      <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-muted-foreground">
        <span className="rounded-lg border border-border bg-card px-2.5 py-1">
          {tableCount} {t("hero.stat.tables")}
        </span>
        <span className="rounded-lg border border-border bg-card px-2.5 py-1">{t("hero.stat.modules")}</span>
        <span className="rounded-lg border border-border bg-card px-2.5 py-1">{t("hero.stat.search")}</span>
      </div>
    </section>
  );
}
