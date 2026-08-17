"use client";

/* ============================================================================
   PROJECT NEO · the object page's return control.
   ----------------------------------------------------------------------------
   The object page is a SERVER component and stays one: it reads the dictionary
   at build time and ships no client bundle of its own. The return, though, has
   to read what THIS session remembers, which only the browser knows.

   So the control is a one-line client island rather than a reason to convert
   the page. Everything else on /neo/object/<NAME>/ still renders on the server.
   ========================================================================== */

import { SmartReturn } from "@/components/neo-shell/nav-context";

export function ObjectReturn() {
  return (
    <SmartReturn
      // An object page is the deep face of a dictionary table, so with no
      // memory of the route in it lands on the table dictionary — the page's
      // real parent — rather than on the NEO home.
      fallback={{ href: "/neo/tables/", label: "טבלאות" }}
      hint="לא נשמר מסלול הגעה בביקור הזה"
    />
  );
}
