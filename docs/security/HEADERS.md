# Enterprise Security Hardening — headers & posture

Static export (`output:'export'`) on Vercel. Headers are delivered by **Vercel via
`vercel.json`** (Next `headers()` does not apply to static export). All values are
industry-standard and verified against the live build.

## Headers (applied to `/(.*)`)
| Header | Value | Purpose |
|--------|-------|---------|
| Content-Security-Policy | default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; object-src 'none'; frame-ancestors 'none'; frame-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests; … | XSS / injection / clickjacking; all subresources same-origin |
| Strict-Transport-Security | max-age=63072000; includeSubDomains; preload | Force HTTPS (2y, preload-eligible) |
| X-Frame-Options | DENY | Clickjacking (legacy backstop for frame-ancestors) |
| X-Content-Type-Options | nosniff | MIME-sniff prevention |
| Referrer-Policy | strict-origin-when-cross-origin | No path/query referrer leak to SAP outbound links |
| Permissions-Policy | camera/mic/geo/usb/payment/… = () | Deny powerful features |
| Cross-Origin-Opener-Policy | same-origin | Cross-origin isolation (safe; no cross-origin popups) |
| X-DNS-Prefetch-Control | off | No speculative DNS |
| X-Permitted-Cross-Domain-Policies | none | Block Flash/PDF cross-domain policy |
| Cache-Control | /_next/static immutable 1y; media 1w | Correct caching |

**CSP note:** `'unsafe-inline'` is required for scripts because Next static export emits
inline RSC bootstrap + JSON-LD with no nonce/hook (no server to mint a nonce). `'unsafe-eval'`
is NOT used — verified 0 CSP violations across 9 representative routes. No external origins
are allowlisted (site is 100% same-origin).

## Removed (attack surface / corporate-flag reduction)
- `@vercel/analytics <Analytics/>` — unconditional runtime telemetry (`/_vercel/insights`).
- `components/google-analytics.tsx` — GA4 loader (`googletagmanager.com`). External tracker;
  top CASB/Zscaler/Netskope flag. Removed entirely (honors the 100%-offline hard constraint).
- 5 unused Next-template SVGs (`next/vercel/file/globe/window.svg`).
- `X-Powered-By` fingerprint (`poweredByHeader:false`).

## Added
- `/.well-known/security.txt` (RFC 9116).

## Verification (enforced CSP, real browser)
9/9 routes clean — home, academy home/path/lesson, architecture studio, sap-infrastructure
(PDF/SVG), transactions+search, library, dashboard: **0 CSP violations · 0 console errors ·
0 blocked requests**; search palette opens; offline Academy renders. See scripts/csp-verify.mjs.
