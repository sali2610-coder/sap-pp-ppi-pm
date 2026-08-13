// Module-hue resolver for the client half of the shell.
//
// It lives in its own dependency-free file on purpose. components/neo-shell/
// nav-data.ts also exports one, but that file imports the whole SAP knowledge
// base at module scope — importing it from a client component just for this
// three-line lookup would pull the entire dataset into the browser bundle.
//
// IMPORTANT: this returns a `var(--mod-*)` string, which cannot be used the way
// lib/module-portal's moduleAccent() is used today. The legacy call sites do
// `background: accent + "14"` (8-digit hex alpha); `"var(--mod-pm)" + "14"` is
// invalid CSS and fails silently to transparent. Any NEO surface that needs a
// tint must use color-mix(in srgb, var(--mod-pm) 8%, transparent) instead.
// lib/module-portal.ts is left byte-for-byte untouched — the ~25 files that
// hard-code the old hexes are not part of this change.

const MOD_VAR: Record<string, string> = {
  PM: "var(--mod-pm)",
  "PP-PI": "var(--mod-pppi)",
  PP: "var(--mod-pp)",
  QM: "var(--mod-qm)",
  MM: "var(--mod-mm)",
};

/** Module hue as a CSS var reference. Falls back to neutral ink — never to
 *  brand red, which is an accent and never a module colour. */
export const modVar = (m?: string): string => (m && MOD_VAR[m]) || "var(--ink-3)";

export const MOD_HE: Record<string, string> = {
  PM: "אחזקה",
  "PP-PI": "ייצור תהליכי",
  PP: "ייצור",
};
