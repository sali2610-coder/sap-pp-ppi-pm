"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { pageExists } from "@/lib/route-exists";

type SmartLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  children: ReactNode;
  /** class applied to the non-navigating fallback span (defaults to className) */
  deadClassName?: string;
};

// Object route families whose leaf slug is a real SAP object name. Baking
// data-peek here makes EVERY such link across the app long-press-peekable (the
// global listener in object-peek.tsx handles it) — no per-page wiring needed.
const PEEK_RE = /^\/(?:object|bapi|tcode|cds|idoc|transactions)\/([^/?#]+)\/?(?:[?#].*)?$/;
function peekName(href: string): string | undefined {
  const m = PEEK_RE.exec(href);
  if (!m) return undefined;
  try { return decodeURIComponent(m[1]); } catch { return m[1]; }
}

/**
 * Single link-resolution layer for the whole app. Renders a real <Link> only
 * when the target static page exists (dynamicParams=false → missing = 404).
 * When the target is provably missing, renders a plain, non-navigating span so
 * the information stays visible but navigation never breaks. Fails open for any
 * unmodeled route family, so valid links are never downgraded.
 *
 * MOBILE APP: object links also carry data-peek, so a long-press opens the
 * Quick-Preview sheet in place (tap still navigates). Opt out with peek={false}.
 */
export function SmartLink({ href, children, className, deadClassName, peek = true, ...rest }: SmartLinkProps & { peek?: boolean }) {
  if (pageExists(href)) return <Link href={href} className={className} data-peek={peek ? peekName(href) : undefined} {...rest}>{children}</Link>;
  return (
    <span className={deadClassName ?? className} data-deadlink aria-disabled="true" title="עמוד ייעודי בכתיבה">
      {children}
    </span>
  );
}
