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

/**
 * Single link-resolution layer for the whole app. Renders a real <Link> only
 * when the target static page exists (dynamicParams=false → missing = 404).
 * When the target is provably missing, renders a plain, non-navigating span so
 * the information stays visible but navigation never breaks. Fails open for any
 * unmodeled route family, so valid links are never downgraded.
 */
export function SmartLink({ href, children, className, deadClassName, ...rest }: SmartLinkProps) {
  if (pageExists(href)) return <Link href={href} className={className} {...rest}>{children}</Link>;
  return (
    <span className={deadClassName ?? className} data-deadlink aria-disabled="true" title="עמוד ייעודי בכתיבה">
      {children}
    </span>
  );
}
