"use client";

import { useI18n } from "@/lib/i18n";

// Mandatory development credit — anchored at the base of every page via layout.
export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="glass mt-6 border-x-0 border-b-0">
      {/* extra bottom room so the credit clears the floating search / settings
          buttons (fixed bottom corners) and stays fully readable */}
      {/* Creator credit now lives in the global header status bar (shell).
          Footer keeps only the platform line + offline status. */}
      <div className="container-app flex flex-col items-center gap-2 pt-5 pb-24 sm:flex-row sm:justify-between sm:gap-4">
        <p className="text-center text-xs text-muted-foreground/80 sm:text-start">
          Built by <b className="font-bold text-brand">Sali Halif</b>
          <span className="mx-1.5 text-muted-foreground/40">·</span>
          Project NEO • SAP Knowledge Platform
        </p>
        <span className="flex shrink-0 items-center gap-2 text-xs font-medium text-muted-foreground">
          <span className="size-1.5 rounded-full bg-status-done" />
          {t("footer.offline")}
        </span>
      </div>
    </footer>
  );
}
