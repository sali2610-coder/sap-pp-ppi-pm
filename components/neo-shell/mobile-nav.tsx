"use client";

// Mobile is not a rail state — it is a different shell. The rail's nine states
// describe a persistent desktop surface; on a phone the same six groups, the
// same order and the same counts arrive as a bottom sheet above a tab bar.
//
// Visibility is decided by html[data-device], set before first paint by the
// root layout, not by a CSS breakpoint. A desktop OS keeps the rail at any
// window width; a real tablet never gets it. Same policy as the legacy chrome.

import Link from "next/link";
import { Ico } from "./icon";
import { modVar } from "./mod-var";
import type { NavGroup } from "./types";

const nf = new Intl.NumberFormat("he-IL");

export function MobileTabs({
  onNav, onSearch, navOpen, searchOpen,
}: {
  onNav: () => void;
  onSearch: () => void;
  navOpen: boolean;
  searchOpen: boolean;
}) {
  return (
    <nav className="nx-mtabs" data-shell="mobile-only" aria-label="ניווט תחתון">
      <div>
        <Link prefetch={false} href="/neo/" className="nx-mtab" aria-current={!navOpen && !searchOpen ? "page" : undefined}>
          <Ico name="Home" size={18} />
          <span>בית</span>
        </Link>
        <button type="button" className="nx-mtab" aria-current={navOpen ? "page" : undefined} aria-expanded={navOpen} onClick={onNav}>
          <Ico name="LayoutGrid" size={18} />
          <span>ניווט</span>
        </button>
        <button type="button" className="nx-mtab" aria-current={searchOpen ? "page" : undefined} onClick={onSearch}>
          <Ico name="Search" size={18} />
          <span>חיפוש</span>
        </button>
      </div>
    </nav>
  );
}

export function MobileSheet({
  groups, activeId, onClose,
}: {
  groups: NavGroup[];
  activeId: string | null;
  onClose: () => void;
}) {
  return (
    <>
      <div className="nx-scrim" onClick={onClose} aria-hidden="true" />
      <div className="nx-msheet" role="dialog" aria-modal="true" aria-label="ניווט">
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
              <h4>{g.label}</h4>
              {g.items.map((it) => (
                <Link
                  key={it.id}
                  prefetch={false}
                  href={it.href}
                  onClick={onClose}
                  aria-current={activeId === it.id ? "page" : undefined}
                  style={it.mod ? ({ "--m": modVar(it.mod) } as React.CSSProperties) : undefined}
                >
                  <Ico name={it.icon} size={18} />
                  <span>{it.label}</span>
                  <span className="nx-n">{it.count === null ? "—" : nf.format(it.count)}</span>
                </Link>
              ))}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
