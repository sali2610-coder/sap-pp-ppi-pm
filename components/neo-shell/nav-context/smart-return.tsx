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
        // The visible label truncates at narrow widths (.nxr-t), so the full
        // sentence is carried as the accessible name and as the tooltip. A
        // control that reads "חזרה ל-PM · פקודות…" to the eye must still read
        // whole to a screen reader.
        aria-label={text}
        title={text}
        // `data-from` is diagnostic, and it is also the honest signal a reviewer
        // needs: "memory" means the previous surface told us where it was,
        // "fallback" means we resolved the route's parent instead.
        data-from={origin ? "memory" : "fallback"}
        // Popping the origin as we leave is what stops back-and-forth: return
        // once and the memory is spent, so the destination shows ITS own origin
        // rather than pointing straight back at the page we just left.
        //
        // A modifier or middle click opens a NEW tab and leaves this one where
        // it is, so spending the memory there would delete an origin the user
        // can still see the page for.
        onClick={(e) => { if (origin && !opensElsewhere(e)) armReturn(origin); }}
      >
        <ArrowRight size={15} strokeWidth={2} aria-hidden="true" className="nxr-a" />
        <span className="nxr-t">{text}</span>
      </Link>
      {!origin && hint ? <span className="nxr-hint">{hint}</span> : null}
    </div>
  );
}

/** True when the browser will handle this click by opening somewhere other than
 *  the current tab — cmd/ctrl/shift/alt click, or the middle button. The origin
 *  store describes THIS tab's history, so those clicks must not write to it. */
function opensElsewhere(e: React.MouseEvent<HTMLAnchorElement>): boolean {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
}

/* ------------------------------------------------------------------------- */

/** Where we are leaving FROM. `to` defaults to the link's own href, which is
 *  right for a link that opens exactly one page; pass `to: "/neo/object/*"` to
 *  claim a whole family at once. */
export type OriginArg = Omit<OriginInput, "to"> & { to?: string };

export interface OriginLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  /** Either the record itself, or a FUNCTION that builds it.
   *
   *  Pass the function form whenever any part of the origin is live — a search
   *  query, a filter, a scroll offset, a graph zoom. An object literal is built
   *  during render, and "where I was" is only true at the moment of leaving; a
   *  scroll offset captured at render is the offset before the user scrolled.
   *  A list of 105 rows also builds 105 origin objects per keystroke that way,
   *  and throws away 104 of them. */
  origin: OriginArg | (() => OriginArg);
  children: React.ReactNode;
}

export function OriginLink({ href, origin, children, onClick, ...rest }: OriginLinkProps) {
  return (
    <Link
      href={href}
      prefetch={false}
      {...rest}
      onClick={(e) => {
        // Same rule as the return control: a cmd-click opens a second tab and
        // leaves this one here, so it must not rewrite this tab's memory.
        if (!opensElsewhere(e)) {
          const o = typeof origin === "function" ? origin() : origin;
          rememberOrigin({ ...o, to: o.to ?? href });
        }
        onClick?.(e);
      }}
    >
      {children}
    </Link>
  );
}
