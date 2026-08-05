// Turns SAP identifiers in AI output into links to EXISTING NEO routes.
// Internal navigation is always preferred; external SAP links are a fallback.
export interface LinkHit { text: string; href: string; kind: string; external?: boolean }

const INTERNAL: [RegExp, (m: string) => string, string][] = [
  [/\bBAPI_[A-Z0-9_]+\b/g, (m) => `/bapi/${encodeURIComponent(m)}`, "BAPI"],
  [/\bI_[A-Z][A-Za-z0-9_]{3,}\b/g, (m) => `/cds/${encodeURIComponent(m)}`, "CDS"],
  [/\b[A-Z]{2,4}\d{1,3}[A-Z]{0,2}\b/g, (m) => `/tcode/${encodeURIComponent(m)}`, "TCODE"],
  [/\b[A-Z]{4,6}\d{0,2}\b/g, (m) => `/tables#${encodeURIComponent(m)}`, "TABLE"],
];
const DENY = new Set(["SAP", "HANA", "ECC", "ERP", "MRP", "BOM", "IDOC", "ABAP", "FIORI",
  "PPPI", "S4HANA", "SOURCES", "NOTE", "HELP", "JSON", "HTML"]);

/** Official SAP destinations. No auth here — the user's own S-User handles login. */
export const EXTERNAL = {
  note: (id: string) => `https://me.sap.com/notes/${id}`,
  help: (q: string) => `https://help.sap.com/docs/search?q=${encodeURIComponent(q)}`,
  community: (q: string) => `https://community.sap.com/t5/forums/searchpage/tab/message?q=${encodeURIComponent(q)}`,
  apiHub: (q: string) => `https://api.sap.com/search?searchterm=${encodeURIComponent(q)}`,
  learning: (q: string) => `https://learning.sap.com/search?q=${encodeURIComponent(q)}`,
  bestPractice: (q: string) => `https://me.sap.com/processnavigator/Search?q=${encodeURIComponent(q)}`,
};

/**
 * `known` is the set of ids NEO actually has pages for. Anything outside it is
 * left as plain text rather than linking to a 404.
 */
export function findLinks(text: string, known?: Set<string>, hrefOf?: Map<string, string>): LinkHit[] {
  const out: LinkHit[] = [];
  const seen = new Set<string>();
  for (const [re, href, kind] of INTERNAL) {
    for (const m of text.match(re) || []) {
      if (DENY.has(m) || seen.has(m)) continue;
      // Without a known-set we would happily link to a route that was never
      // exported. Internal links are emitted only for pages that exist.
      if (known && !known.has(m)) continue;
      seen.add(m);
      // Prefer the route the site actually generated over the pattern guess:
      // the same string can be both a plausible T-Code and a real table.
      out.push({ text: m, href: hrefOf?.get(m) ?? href(m), kind });
    }
  }
  for (const m of text.match(/\bSAP\s*Note\s*\d{6,9}\b/gi) || []) {
    const id = m.replace(/\D/g, "");
    if (seen.has(id)) continue;
    seen.add(id);
    out.push({ text: m, href: EXTERNAL.note(id), kind: "NOTE", external: true });
  }
  return out;
}
