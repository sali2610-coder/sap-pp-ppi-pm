"use client";

import { useI18n } from "@/lib/i18n";

// Mandatory development credit — anchored at the base of every page via layout.
export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="glass mt-6 border-x-0 border-b-0">
      <div className="container-app flex flex-col items-center gap-2 py-5 sm:flex-row sm:justify-between">
        {/* attribution — secondary, softer weight, start-aligned */}
        <p className="text-center text-xs text-muted-foreground/70 sm:text-start">
          נבנה עבור <span className="font-medium text-muted-foreground">Web Coding</span>, סאלי חליף
          <span className="hidden sm:inline"> · Project NEO — CBC Israel</span>
        </p>
        {/* status — end-aligned */}
        <span className="flex shrink-0 items-center gap-2 text-xs font-medium text-muted-foreground">
          <span className="size-1.5 rounded-full bg-status-done" />
          {t("footer.offline")}
        </span>
      </div>
    </footer>
  );
}
