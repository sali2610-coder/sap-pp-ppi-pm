"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

// The legal links are 24x24 CSS px targets at least (WCAG 2.5.8; Astra S10-3
// measured them at 71x15): an inline-flex box of 1.5rem, which also keeps a
// link on one line instead of splitting it across two.
const LINK = "inline-flex min-h-6 items-center font-medium text-muted-foreground hover:text-brand hover:underline";

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
          פותח על ידי <b className="font-bold text-brand">סאלי חליף</b>
          <span className="mx-1.5 text-muted-foreground/40">·</span>
          Project NEO
          <span className="mx-1.5 text-muted-foreground/40">·</span>
          <Link href="/privacy/" className={LINK}>מדיניות פרטיות</Link>
          <span className="mx-1.5 text-muted-foreground/40">·</span>
          <Link href="/neo/terms/" className={LINK}>תנאי שימוש</Link>
          <span className="mx-1.5 text-muted-foreground/40">·</span>
          <Link href="/neo/accessibility/" className={LINK}>הצהרת נגישות</Link>
        </p>
        <span className="flex shrink-0 items-center gap-2 text-xs font-medium text-muted-foreground">
          <span className="size-1.5 rounded-full bg-status-done" />
          {t("footer.offline")}
        </span>
      </div>
    </footer>
  );
}
