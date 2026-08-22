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

/* SECTION HUE — the same idea as modVar, widened past modules.
   ---------------------------------------------------------------------------
   The rail used to receive a tint only when a MODULE was active, so every
   non-module destination in the product rendered neutral grey. Keyed by the
   nav item id from nav-data's seeds(), so a new sidebar entry either gets a
   hue here or falls back to ink — it can never pick one up by accident. */
const SEC_VAR: Record<string, string> = {
  pm: "var(--sec-pm)",
  "pp-pi": "var(--sec-pppi)",
  "domain-model": "var(--sec-erd)",
  tables: "var(--sec-tables)",
  transactions: "var(--sec-transactions)",
  bapi: "var(--sec-bapi)",
  idoc: "var(--sec-idoc)",
  cds: "var(--sec-cds)",
  "fiori-apps": "var(--sec-fiori)",
  enhancements: "var(--sec-enh)",
  library: "var(--sec-library)",
  ai: "var(--sec-ask)",
  knowledge: "var(--sec-knowledge)",
  academy: "var(--sec-academy)",
  incidents: "var(--sec-incidents)",
  certification: "var(--sec-cert)",
  studio: "var(--sec-studio)",
  chat: "var(--sec-neo)",
};

/** Section hue as a CSS var reference, by nav item id. Neutral ink when the id
 *  is unknown — never brand red, which belongs to the product and to NEO AI. */
export const secVar = (id?: string): string => (id && SEC_VAR[id]) || "";
