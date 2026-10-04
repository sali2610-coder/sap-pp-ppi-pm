// Historical site URLs, not additional SAP transaction codes. Keep them out
// of catalog counts and search results, but retain their exported destinations.
export const TX_ROUTE_ALIASES: Readonly<Record<string, string>> = {
  "/UI2/INVALIDATE_GLOBAL_CACHES": "/UI2/INVAL_CACHES",
};

export function canonicalTxCode(raw: string): string {
  const code = raw.trim().toUpperCase();
  return Object.hasOwn(TX_ROUTE_ALIASES, code) ? TX_ROUTE_ALIASES[code] : code;
}
