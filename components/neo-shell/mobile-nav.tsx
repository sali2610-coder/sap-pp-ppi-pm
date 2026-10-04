"use client";

// Mobile is not a rail state — it is a different shell. The rail's nine states
// describe a persistent desktop surface; on a phone the same six groups, the
// same order and the same counts arrive as a bottom sheet above a tab bar.
//
// Visibility is decided by html[data-device], set before first paint by the
// root layout, not by a CSS breakpoint. A desktop OS keeps the rail at any
// window width; a real tablet never gets it. Same policy as the legacy chrome.

import Link from "next/link";
import { useEffect, useRef, type Ref } from "react";
import { Ico } from "./icon";
import { modVar } from "./mod-var";
import { bindNavigationDialog } from "./navigation-dialog";
import type { NavGroup } from "./types";

const nf = new Intl.NumberFormat("he-IL");

export function MobileTabs({
  onNav, onSearch, navOpen, searchOpen, isHome, navRef,
}: {
  onNav: () => void;
  onSearch: () => void;
  navOpen: boolean;
  searchOpen: boolean;
  isHome: boolean;
  navRef: Ref<HTMLButtonElement>;
}) {
  return (
    <nav className="nx-mtabs" data-shell="mobile-only" aria-label="ניווט תחתון">
      <div>
        <Link prefetch={false} href="/neo/" className="nx-mtab" aria-current={isHome ? "page" : undefined}>
          <Ico name="Home" size={18} />
          <span>בית</span>
        </Link>
        <button ref={navRef} type="button" className="nx-mtab" aria-current={navOpen ? "true" : undefined} aria-pressed={navOpen} aria-expanded={navOpen} aria-controls={navOpen ? "nx-mobile-navigation" : undefined} aria-haspopup="dialog" onClick={onNav}>
          <Ico name="LayoutGrid" size={18} />
          <span>ניווט</span>
        </button>
        <button type="button" className="nx-mtab" aria-current={searchOpen ? "true" : undefined} aria-pressed={searchOpen} onClick={onSearch}>
          <Ico name="Search" size={18} />
          <span>חיפוש</span>
        </button>
      </div>
    </nav>
  );
}

export function MobileSheet({
  groups, activeId, open, onToggle, onClose,
}: {
  groups: NavGroup[];
  activeId: string | null;
  open: Record<string, boolean>;
  onToggle: (id: string) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef(true);
  useEffect(() => {
    if (!dialogRef.current) return;
    restoreFocus.current = true;
    const release = bindNavigationDialog(dialogRef.current, onClose);
    return () => release(restoreFocus.current);
  }, [onClose]);

  return (
    <>
      <div className="nx-scrim" onClick={onClose} aria-hidden="true" />
      <div ref={dialogRef} id="nx-mobile-navigation" tabIndex={-1} className="nx-msheet" role="dialog" aria-modal="true" aria-label="ניווט">
        <div className="nx-msheet-h">
          <Ico name="LayoutGrid" size={16} />
          <span>ניווט</span>
          <button type="button" className="nx-iconbtn" style={{ marginInlineStart: "auto" }} aria-label="סגירת הניווט" onClick={onClose}>
            <Ico name="X" size={16} />
          </button>
        </div>
        <div className="nx-msheet-b">
          {groups.map((g) => (
            <section key={g.id} className="nx-msheet-g">
              <h4><button type="button" aria-expanded={open[g.id] !== false} aria-controls={`nx-mobile-grp-${g.id}`} onClick={() => onToggle(g.id)}>{g.label}</button></h4>
              <div id={`nx-mobile-grp-${g.id}`} hidden={open[g.id] === false}>
              {g.items.map((it) => (
                <Link
                  key={it.id}
                  prefetch={false}
                  href={it.href}
                  onNavigate={() => {
                    restoreFocus.current = new URL(it.href, window.location.href).href === window.location.href;
                    onClose();
                  }}
                  aria-current={activeId === it.id ? "page" : undefined}
                  style={it.mod ? ({ "--m": modVar(it.mod) } as React.CSSProperties) : undefined}
                >
                  <Ico name={it.icon} size={18} />
                  <span>{it.label}</span>
                  <span className="nx-n">{it.count === null ? "—" : nf.format(it.count)}</span>
                </Link>
              ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
