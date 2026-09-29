"use client";

import { useEffect, useRef } from "react";

/**
 * The focus contract a modal owes its users.
 *
 * `aria-modal="true"` tells assistive tech the rest of the page is inaccessible.
 * Asserting that without enforcing it is worse than omitting it: a screen reader
 * suppresses the background in its virtual buffer while keyboard focus is still
 * out there walking it.
 *
 * This moves focus in, cycles it inside, restores it to whatever opened the
 * dialog, and locks background scrolling. Escape and backdrop clicks stay the
 * caller's business.
 *
 * Extracted from the pattern already proven in components/figure-viewer.tsx,
 * which also lacked the restore half.
 */
export function useDialog<T extends HTMLElement>(open: boolean, onClose: () => void) {
  const ref = useRef<T>(null);
  const restoreTo = useRef<HTMLElement | null>(null);
  // Callers pass inline arrows. Keyed on them, the effect re-ran on every
  // parent render: focus was yanked back to the dialog box and the "opener"
  // became whatever sat inside it.
  const close = useRef(onClose);
  useEffect(() => { close.current = onClose; });

  useEffect(() => {
    if (!open) return;

    restoreTo.current = document.activeElement as HTMLElement | null;
    // Wait a frame: the dialog's children may not be mounted on the same tick.
    const raf = requestAnimationFrame(() => ref.current?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.stopPropagation(); close.current(); return; }
      if (e.key !== "Tab") return;
      const nodes = ref.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!nodes || !nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      // The box itself holds focus right after opening; Shift+Tab from there
      // left the modal (gate 8, m9).
      const at = document.activeElement;
      if (e.shiftKey && (at === first || at === ref.current)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && at === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey, true);

    // Background must not scroll under an open sheet.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey, true);
      document.body.style.overflow = prev;
      // Return focus to the trigger. Without this the next Tab restarts from
      // the top of the document, which reads as the page having reset.
      restoreTo.current?.focus?.();
    };
  }, [open]);

  return ref;
}
