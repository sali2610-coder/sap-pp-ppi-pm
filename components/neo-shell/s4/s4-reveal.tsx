"use client";

// Opens the collapsed group that holds a linked card. A link to `#<prefix>…`
// (the transformation board, the load-sequence route, a dependency) points at
// a card that may sit inside a closed <details>; not every browser opens the
// group on fragment navigation (Safari does not), so this does, on load and on
// every hash change, then brings the card into view.

import { useEffect } from "react";

export function S4Reveal({ prefix }: { prefix: string }) {
  useEffect(() => {
    const reveal = () => {
      let id: string;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      if (!id.startsWith(prefix)) return;
      const target = document.getElementById(id);
      if (!target) return;
      const group = target.closest("details");
      if (group && !group.open) group.open = true;
      target.scrollIntoView({ block: "start", behavior: "instant" });
    };
    const frame = requestAnimationFrame(reveal);
    window.addEventListener("hashchange", reveal);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("hashchange", reveal); };
  }, [prefix]);
  return null;
}
