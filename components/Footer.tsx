"use client";

import { useI18n } from "@/lib/i18n";

// Mandatory development credit — anchored at the base of every page via layout.
export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="glass mt-6 border-x-0 border-b-0">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-6 text-center sm:flex-row sm:justify-between sm:text-start">
        <p className="text-sm text-muted-foreground">
          הערת פיתוח: האתר נבנה עבור המפתח ב-
          <span className="font-semibold text-foreground">Web Coding</span>, סאלי חליף.
          <span className="text-muted-foreground/70"> (Project NEO - CBC Israel)</span>
        </p>
        <span className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-status-done" />
          {t("footer.offline")}
        </span>
      </div>
    </footer>
  );
}
