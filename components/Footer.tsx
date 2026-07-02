"use client";

import { useI18n } from "@/lib/i18n";

// Mandatory development credit — anchored at the base of every page via layout.
export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="glass mt-6 border-x-0 border-b-0">
      {/* extra bottom room so the credit clears the floating search / settings
          buttons (fixed bottom corners) and stays fully readable */}
      <div className="container-app flex flex-col items-center gap-2 pt-5 pb-24 sm:flex-row sm:justify-between sm:gap-4">
        {/* attribution — mandatory credit */}
        <p className="text-center text-xs leading-relaxed text-muted-foreground sm:text-start">
          נבנה עבור <span className="font-semibold text-foreground/80">Web Coding</span>, <span className="font-semibold text-foreground/80">סאלי חליף</span>
          <span className="text-muted-foreground/70"> · Project NEO — CBC Israel</span>
        </p>
        {/* status */}
        <span className="flex shrink-0 items-center gap-2 text-xs font-medium text-muted-foreground">
          <span className="size-1.5 rounded-full bg-status-done" />
          {t("footer.offline")}
        </span>
      </div>
    </footer>
  );
}
