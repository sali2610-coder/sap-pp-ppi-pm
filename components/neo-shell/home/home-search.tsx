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
        <span className="nh-find-ph">קוד טבלה או טרנזקציה, שם שדה, או מושג בעברית</span>
        <kbd className="nh-find-k" aria-hidden="true"><CmdKey /></kbd>
      </span>
    </button>
  );
}
