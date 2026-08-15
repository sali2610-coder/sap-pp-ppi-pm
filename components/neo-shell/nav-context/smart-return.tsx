"use client";

/* ============================================================================
   PROJECT NEO · SMART RETURN — the controls.
   ----------------------------------------------------------------------------
   <SmartReturn/>  the return itself. A real .nu-link with a real href, so it
                   works on middle-click, on cmd-click and with JavaScript still
                   loading. It reads the origin the previous surface recorded and
                   says its Hebrew name; with no origin it falls back to the
                   page's parent in the navigation. It is never dead and never
                   blank.
   <OriginLink/>   the other half of the deal: a link that records where it is
                   leaving from, at the moment it leaves. Any surface can use it
                   without importing the store.
   ========================================================================== */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import type { OriginInput } from "./types";
import { armReturn, normalisePath, rememberOrigin, returnLabel, useOrigin } from "./origin";
import { parentOf, type ParentRef } from "./fallbacks";
import "./nav-context.css";

export interface SmartReturnProps {
  /** Override the computed parent when a route knows better than the map. */
  fallback?: ParentRef;
  /** Show a short note when the label is a fallback rather than a real memory. */
  hint?: string;
  className?: string;
}

export function SmartReturn({ fallback, hint, className }: SmartReturnProps) {
  const path = usePathname() || "/neo/";
  const origin = useOrigin();
  const parent = fallback ?? parentOf(normalisePath(path));

  // The one invariant: there is ALWAYS a destination and ALWAYS a word.
  const href = origin?.href || parent.href;
  const text = returnLabel(origin, parent.label);

  return (
    <div className={className ? `nxr ${className}` : "nxr"}>
      <Link
        href={href}
        prefetch={false}
        className="nu-link nxr-link"
        // Popping the origin as we leave is what stops back-and-forth: return
        // once and the memory is spent, so the destination shows ITS own origin
        // rather than pointing straight back at the page we just left.
        onClick={() => { if (origin) armReturn(origin); }}
      >
        <ArrowRight size={15} strokeWidth={2} aria-hidden="true" className="nxr-a" />
        <span className="nxr-t">{text}</span>
      </Link>
      {!origin && hint ? <span className="nxr-hint">{hint}</span> : null}
    </div>
  );
}

/* ------------------------------------------------------------------------- */

export interface OriginLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  /** Where we are leaving FROM. `to` defaults to `href`, which is right for a
   *  link that opens exactly one page; pass `to: "/neo/object/*"` to claim a
   *  whole family at once. */
  origin: Omit<OriginInput, "to"> & { to?: string };
  children: React.ReactNode;
}

export function OriginLink({ href, origin, children, onClick, ...rest }: OriginLinkProps) {
  return (
    <Link
      href={href}
      prefetch={false}
      {...rest}
      onClick={(e) => {
        rememberOrigin({ ...origin, to: origin.to ?? href });
        onClick?.(e);
      }}
    >
      {children}
    </Link>
  );
}
