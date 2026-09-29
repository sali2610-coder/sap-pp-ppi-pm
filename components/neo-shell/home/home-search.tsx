"use client";

import { Search } from "lucide-react";
import { CmdKey } from "../cmd-key";

/* The home's primary action: the same command surface as the top bar and ⌘K,
   opened through the shell's event (components/neo-shell/search/shell-client.tsx,
   "neo:nx:search"), so the page never imports the shell. A button that looks
   like the field it opens; its accessible name is the question it asks. */
export function HomeSearch() {
  return (
    <button
      type="button"
      className="nh-find"
      onClick={() => window.dispatchEvent(new Event("neo:nx:search"))}
    >
      <span className="nh-find-l">מה צריך למצוא?</span>
      <span className="nh-find-f">
        <Search size={20} strokeWidth={1.75} aria-hidden="true" />
        {/* The words of the field it opens (command-surface.tsx), so the same
            search is described one way (gate 5, finding 16). */}
        <span className="nh-find-ph">טבלה, שדה, טרנזקציה, BAPI או ספר</span>
        <kbd className="nh-find-k" aria-hidden="true"><CmdKey /></kbd>
      </span>
    </button>
  );
}
