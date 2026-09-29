"use client";

/* ============================================================================
   PROJECT NEO · THE CATALOGUE FILTERS ON A PHONE — one set of controls, two
   presentations.
   ----------------------------------------------------------------------------
   DESIGN-SPEC §1: on a phone the filters live in a sheet ("מסננים ב-Sheet"),
   and above the list only the ACTIVE filters show. Spread in the page body they
   pushed the first result to 1.09 to 1.22 screens down on /neo/transactions/
   and /neo/tables/ (gate 3, major 16).

   The facet groups render ONCE. On a wide screen .nxd-sheet is a plain block and
   the groups sit inline exactly as before; under 720px (app/neo/data.css,
   "THE FILTER SHEET") the same element is a bottom sheet behind the
   "מסננים (n)" button, a modal dialog while open (lib/use-dialog: focus in,
   Tab cycles, Escape and the scrim close, focus returns to the button).
   ========================================================================== */

import { useEffect, useId } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { useDialog } from "@/lib/use-dialog";

/** The width data.css turns the facets into a sheet at. Keep the two equal. */
const PHONE = "(max-width: 720px)";

const nf = new Intl.NumberFormat("he-IL");

/** The phone's "מסננים (n)" button. Hidden on a wide screen, where the filters
 *  are always on the page. */
export function FacetToggle({ id, open, active, controls, onOpen }: {
  id: string; open: boolean; active: number; controls: string; onOpen: () => void;
}) {
  return (
    <button
      id={id}
      type="button"
      className="nu-btn2 nxd-sheet-btn"
      aria-expanded={open}
      aria-controls={controls}
      aria-haspopup="dialog"
      onClick={onOpen}
    >
      <SlidersHorizontal size={14} strokeWidth={1.75} aria-hidden="true" />
      מסננים{active ? <b> ({nf.format(active)})</b> : null}
    </button>
  );
}

/** The facet groups, inline on a wide screen and a sheet on a phone. `shown`
 *  and `noun` name what the current selection leaves on screen, so the sheet's
 *  closing action says it ("הצגת 56 טבלאות"). */
export function FacetSheet({ id, open, onClose, onClear, dirty, shown, noun, children }: {
  id: string; open: boolean; onClose: () => void; onClear: () => void;
  dirty: boolean; shown: number; noun: string; children: React.ReactNode;
}) {
  const panel = useDialog<HTMLDivElement>(open, onClose);
  const titleId = useId();

  // A phone turned to a width where the filters are inline again: the sheet is
  // no longer a dialog, so its focus trap has to let go.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia(PHONE);
    const onChange = () => { if (!mq.matches) onClose(); };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [open, onClose]);

  return (
    <div className="nxd-sheet" data-open={open ? "1" : undefined}>
      <div className="nxd-sheet-scrim" aria-hidden="true" onClick={onClose} />
      <div
        id={id}
        ref={panel}
        className="nxd-facets nxd-sheet-p"
        role={open ? "dialog" : undefined}
        aria-modal={open ? true : undefined}
        aria-labelledby={open ? titleId : undefined}
        tabIndex={open ? -1 : undefined}
      >
        <div className="nxd-sheet-h">
          <h2 id={titleId}>מסננים</h2>
          <button type="button" className="nu-ghost" onClick={onClose} aria-label="סגירת המסננים">
            <X size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
        {children}
        <div className="nxd-sheet-f">
          {dirty ? <button type="button" className="nu-btn2" onClick={onClear}>ניקוי המסננים</button> : null}
          <button type="button" className="nu-btn" onClick={onClose}>
            הצגת {nf.format(shown)} {noun}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Above the list on a phone: the filters that are on, and nothing else. Each
 *  wears the pressed filter's fill and removes itself; focus then goes back to
 *  the "מסננים" button (`back`), since the chip it was on is gone. */
export function ActiveFilters({ items, back }: { items: { key: string; label: string; off: () => void }[]; back: string }) {
  if (!items.length) return null;
  return (
    <div className="nxd-active" role="group" aria-label="מסננים פעילים">
      {items.map((x) => (
        <button
          key={x.key}
          type="button"
          className="nu-filter"
          data-on="1"
          aria-label={`הסרת המסנן ${x.label}`}
          onClick={() => { x.off(); requestAnimationFrame(() => document.getElementById(back)?.focus()); }}
        >
          {x.label}
          <X size={12} strokeWidth={2} aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
