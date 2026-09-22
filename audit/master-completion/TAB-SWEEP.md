# §19 tab sweep · 2026-09-22

Measured against the built export (`out/`, served locally). **Emulation only**
(headless Chrome with a phone user agent); no Safari or physical device.

## Tab → route

| # | tab | route measured |
|---|---|---|
| 1 | Home | `/neo/` |
| 2 | PM | `/neo/pm/` |
| 3 | PP | no separate NEO tab: the rail has PM and PP-PI (the two blueprints); PP content lives in `/neo/pp-pi/`, PP best practices and the ERD |
| 4 | PP-PI | `/neo/pp-pi/` |
| 5 | Domains | `/neo/domain-model/`, `/neo/domain/pm-functional-locations/` |
| 6 | S/4HANA Center | `/neo/s4hana/` |
| 7 | Readiness | `/neo/s4-readiness/` |
| 8 | Migration Cockpit | `/neo/migration-cockpit/` |
| 9 | Tables | `/neo/tables/`, `/neo/tables/AFKO/`, `/neo/object/MARA/` |
| 10 | Transactions | `/neo/transactions/` |
| 11 | BAPI/FM | `/neo/bapi/`, `/neo/bapi/BAPI_ALM_CONF_CREATE/` |
| 12 | IDoc | `/neo/idoc/` |
| 13 | CDS | `/neo/cds/` |
| 14 | Fiori | `/neo/fiori-apps/` |
| 15 | Enhancements | `/neo/enhancements/` |
| 16 | ERD | `/neo/erd/` |
| 17 | Architecture Studio | `/neo/studio/` |
| 18 | Best Practices | `/neo/best-practices/`, one record |
| 19 | Knowledge | `/neo/knowledge/`, `/neo/centers/` |
| 20 | Incidents | `/neo/incidents/` (added to `ux-measure.mjs` this pass), `/neo/incidents/cogi-stuck/` |
| 21 | Academy | `/neo/academy/`, `/neo/certification/` |
| 22 | Books/Reader | `/neo/books/`, `/neo/read/book2/` |
| 23 | AI Library Chat | `/neo/ai/` (controlled states only; live AI is blocked, see BLOCKERS) |
| 24 | General AI Chat | `/neo/chat/` (same) |
| 25 | Search/Command Palette | a dock overlay on every route, not a page; covered by the earlier `dock-check.mjs` round |
| 26 | Settings/Appearance | the dock's theme switch; exercised here through the dark matrix (`neo:theme`) |

## Matrix (32 routes each)

`tab-sweep/*.json`: 1363 light, 1363 dark, 1363 reduced motion, 390 phone light,
390 phone dark, 320 phone. Every run: status 200 on all 32, **0 console errors,
0 page overflow, 0 canvas overflow, 0 faded content**.

## Clipping (a stricter check than overflow)

Overflow was already 0, but an element can still be cut off inside a box with
`overflow: hidden`. A per-element check (element past the canvas edge, whose
nearest non-scrolling ancestor clips it) found real clipping at 320px, and some
at 390px, on four surfaces. The cause was the same in each: a grid whose single
track was implicit `auto` or `1fr`, which takes the min-content width of its
widest child.

| surface | fix |
|---|---|
| S/4 plate on BAPI/transaction records (`.nxt-s4`) | `grid-template-columns: minmax(0, 1fr)` |
| evidence block inside it (`.nev`) | same |
| catalog rows ≤1024px (`.nxd-id`, `.nxd-s4`, `.nxd-s4-t`) | id cell wraps (flex-wrap), long tokens break |
| S/4 Center (`.ns4-sec-b`, `.ns4-objs`, `.ns4-rows`) | `minmax(0, 1fr)`, row text breaks long tokens |

After the fix: 0 clipped elements on all 32 routes at 320, 390 and 1363. The one
remaining hit, a `<th>` on table records at phone width, is the deliberately
visually hidden header of the stacked field table (each cell carries its own
label), so it is not a defect.

## Not closed here

- The h1s built from stacked block spans (Home, Books) read as one run-on string
  in `textContent`. Visually they are separate lines. Screen-reader output has
  not been checked on a real reader.
- Safari and physical devices: no access (BLOCKERS).

## 200% zoom (emulated)

`tab-sweep/zoom200.json`: a desktop viewport of 682 x 468 CSS px (1363 x 936 at
200%). 32 routes: 0 console errors, 0 page overflow, 0 canvas overflow, 0
faded content. This is emulation of the CSS width at 200%, not a browser zoom.

## Accessibility sample after the fixes

`tab-sweep/a11y.json`, via `scripts/qa/a11y-sample.mjs`: 37 routes (the 32 above
plus the round-6 extras), 15,055 text nodes checked, **0 contrast failures**.
Five targets under 24px, all covered by a WCAG 2.5.8 exception:

| route | target | why it is exempt |
|---|---|---|
| `/neo/academy/` | "תרגול ובדיקת ידע" (89 x 16) | inline link inside a sentence of body text |
| `/exits/CMOD-SMOD/`, `/exits/Implicit-Enhancement/` | skip link (1 x 1) | `sr-only` until focused, then full size |
| same two | "מדיניות פרטיות" (71 x 15) | inline footer text link |

Obscured focus appears on the same two `/exits/*` compatibility routes only (theme
button and rail toggle, 4 each), as in the round-6 baseline. Both routes render
through the legacy app shell, not the NEO shell, so this belongs to ACC-6 (two
shells) and is left there. No NEO route has obscured focus.

No axe-core run: it is not installed in the repository and the mandate forbids
installing untrusted packages, so these are the project's own checks, not an
axe audit. No full WCAG conformance is claimed.
