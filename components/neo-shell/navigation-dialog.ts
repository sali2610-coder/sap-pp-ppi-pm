/** Keyboard lifecycle for Astra's mobile navigation, without changing its DOM
 * or using the shared Library/Reader dialog implementation. */
export function bindNavigationDialog(dialog: HTMLElement, onDismiss: () => void) {
  const doc = dialog.ownerDocument;
  const opener = doc.activeElement as HTMLElement | null;
  const openedAt = doc.location.href;
  const candidates = () => [...dialog.querySelectorAll<HTMLElement>(
    'a[href], button, input, select, textarea, [tabindex]',
  )].filter((node) => node.tabIndex >= 0
    && !node.matches(":disabled")
    && !node.closest('[hidden], [inert], [aria-hidden="true"]')
    && node.getClientRects().length > 0
    && doc.defaultView?.getComputedStyle(node).visibility !== "hidden");
  const focusFirst = () => (candidates()[0] || dialog).focus({ preventScroll: true });
  const onKey = (event: KeyboardEvent) => {
    if (event.defaultPrevented) return;
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      onDismiss();
      return;
    }
    if (event.key !== "Tab") return;
    // Recompute after every group toggle: collapsed links must never receive
    // focus, including when the last open group has just been collapsed.
    const nodes = candidates();
    const current = nodes.indexOf(doc.activeElement as HTMLElement);
    if (!nodes.length || current < 0 || (event.shiftKey ? current === 0 : current === nodes.length - 1)) {
      event.preventDefault();
      (event.shiftKey ? nodes.at(-1) || dialog : nodes[0] || dialog).focus({ preventScroll: true });
    }
  };
  const onFocus = (event: FocusEvent) => {
    if (!dialog.contains(event.target as Node | null)) focusFirst();
  };
  doc.addEventListener("keydown", onKey, true);
  doc.addEventListener("focusin", onFocus);
  focusFirst();
  return (restoreFocus = true) => {
    doc.removeEventListener("keydown", onKey, true);
    doc.removeEventListener("focusin", onFocus);
    // A destination page owns focus after navigation, including Back/Forward.
    if (restoreFocus && doc.location.href === openedAt && opener?.isConnected) {
      opener.focus({ preventScroll: true });
    }
  };
}
