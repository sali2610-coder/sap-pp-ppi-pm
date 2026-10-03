// The routes of the Editorial Technology language (DESIGN-SPEC-EDITORIAL.md):
// piloted on five routes, rolled out to every /neo route (docs/rollout-2026-10).
// A plain module, with no "use client", so the /neo layout's pre-paint script
// and the shell read the same list (a client module hands a server component
// a reference, not the value; lib/theme-boot.ts).
export const PILOT_ROUTES = /^\/neo(\/|$)/;

/** The family a route belongs to. Each family has one wayfinding hue
 *  (editorial.css, FAMILIES): the page's head band, its section marks, its
 *  numbers and the rail's current row. Information types keep their colour
 *  wherever they appear: transactions ochre, interfaces moss, tables petrol. */
export function famOf(path: string): string {
  const seg = path.split("/");
  const top = seg[2] || "";
  switch (top) {
    case "": return "home";
    case "pm": return "pm";
    case "pp-pi": return "pppi";
    case "domain": return (seg[3] || "").startsWith("pm-") ? "pm" : (seg[3] || "").startsWith("pppi-") ? "pppi" : "modules";
    case "domain-model": return "modules";
    case "tables": case "erd": case "object": return "data";
    case "transactions": return "tx";
    case "bapi": case "idoc": case "enhancements": return "iface";
    case "s4hana": case "s4-readiness": case "migration-cockpit": case "cds": case "fiori-apps": return "s4";
    case "books": case "read": case "ai": return "lib";
    case "knowledge": case "best-practices": case "academy": case "certification": case "centers": return "learn";
    case "incidents": return "incident";
    default: return "ink";
  }
}
