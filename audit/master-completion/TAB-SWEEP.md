# §19 tab sweep · 2026-09-22, corrected and re-run 2026-09-23

Measured against the built export (`out/`, served locally). **Emulation only**
(headless Chrome, phone and desktop user agents); no Safari, no physical device,
no real screen reader.

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

## Correction to the 2026-09-22 version of this file

Two checks this file reported on 2026-09-22 were not run as described.

1. "0 clipped elements on all 32 routes at 320, 390 and 1363". The route list was
   passed through a zsh variable, which zsh does not word-split, so the script got
   one argument, checked one bogus URL, and printed nothing for it. Only the routes
   named one by one in the command were really checked.
2. The dark and 390 axe runs. `set -- $m` in a zsh loop left the environment unset,
   so both ran as light at 1363. (A later batch of axe runs also lost `NEO_BASE`
   and exited 1; those were re-run and the script now has a default.)

Everything below was re-run on 2026-09-23 with scripts that read their route list
themselves (`clip-check.mjs`, `axe-sweep.mjs`, `keyboard-check.mjs` all read it from
`ux-measure.mjs`) and with the environment set explicitly on every run.

The ux, clip and axe rows all come from the final build (7,828 pages, the tree of
`212ef360`). The keyboard sweep ran one build earlier, before two CSS-only list
fixes (S/4 Center list tracks, step text wrapping) that change no focus order.

## Matrix (32 routes each)

`scripts/qa/ux-measure.mjs`, results in `tab-sweep/*.json`:

| row | viewport | user agent | variant |
|---|---|---|---|
| `d1363-light` | 1363 x 936 | desktop | light |
| `d1363-dark` | 1363 x 936 | desktop | dark |
| `d1363-reduced` | 1363 x 936 | desktop | reduced motion |
| `p390-light` | 390 x 844 | phone | light |
| `p390-dark` | 390 x 844 | phone | dark |
| `p320` | 320 x 700 | phone | light |
| `zoom200` | 682 x 468 | desktop | 1363 at 200% |
| `d390-desktop` | 390 x 844 | desktop | a phone-width desktop window |
| `d320-desktop` | 320 x 700 | desktop | 1280 at 400% (WCAG reflow) |

Every row: status 200 on all 32 routes, **0 console errors, 0 page overflow, 0
canvas overflow, 0 faded content**.

The two desktop rows at 390 and 320 are new. On 2026-09-22 narrow widths were
measured only with a phone user agent, which gets the phone shell. A desktop
browser zoomed to 400% keeps the desktop shell, and there the expanded rail left
the content 110 px wide at 390 and 40 px at 320 (see "Reflow" below).

## Clipping

`scripts/qa/clip-check.mjs`: an element that reaches past the canvas edge, is not
inside a horizontal scroller, and is cut off by an `overflow: hidden` ancestor.
Overflow metrics never see this. Visually hidden content (the sr-only pattern) and
`aria-hidden` decoration (the home hero's network layer, the workspace light) are
skipped.

| run | viewport | user agent | routes | routes with clipping |
|---|---|---|---|---|
| `clip-1363-desktop` | 1363 | desktop | 32 | 0 |
| `clip-390-phone` | 390 | phone | 32 | 0 |
| `clip-320-phone` | 320 | phone | 32 | 0 |
| `clip-390-desktop` | 390 | desktop | 32 | 0 |
| `clip-320-desktop` | 320 | desktop | 32 | 0 |

The Architecture Studio canvas is skipped as well, because it is a pan/zoom
viewport. At 320 px its nodes sit past the canvas edge until the reader pans (see
the fit floor under "Reflow"), and the keyboard sweep found no off-screen focus
there.

Causes and fixes. Every case was a grid whose single track was implicit (`auto`
or `1fr`), so it took the min-content width of its widest child:

| surface | fix |
|---|---|
| S/4 plate on BAPI and transaction records (`.nxt-s4`) | `grid-template-columns: minmax(0, 1fr)` |
| evidence block inside it (`.nev`) | same |
| catalog rows up to 1024px (`.nxd-id`, `.nxd-s4`, `.nxd-s4-t`) | the id cell wraps, long tokens break |
| S/4 Center (`.ns4-sec-b`, `.ns4-objs`, `.ns4-rows`) | `minmax(0, 1fr)`, row text breaks long tokens |
| every S/4 Center and Migration Cockpit list (2026-09-23) | one zero-specificity rule: `:where(.ns4) :where(ul, ol) { grid-template-columns: minmax(0, 1fr) }` |

## Reflow on a narrow desktop window (WCAG 1.4.10)

The shell keeps the desktop layout for any desktop OS at any width (`lib/device.ts`:
"the device decides the shell, the width only decides spacing"). That rule stands.
What changed is the rail's default below 40rem: `peek` instead of `expanded`. The
canvas gets the full width, and the rail slides in over it on hover of its edge
strip or when keyboard focus enters it. A mode the user chose is still kept. Found
and fixed on the way:

- The compact rail's active-item indicator sat beside the first group. The item's
  offsetParent in compact mode is its `.nx-group`, and the groups' padding settles
  after the first layout pass. The pill now sums offsets up to its own offsetParent
  and re-syncs through a border-box ResizeObserver (measured: pill top equals item
  top in seven cases).
- The hidden rail was translated off-screen but left in the tab order. It now becomes
  `visibility: hidden` once the slide-out ends.
- The rail's search button had no accessible name in compact mode, because its label
  is `display: none` there. It now carries `aria-label`.
- The Architecture Studio's fit-to-screen shrank 44 px nodes to 15 px at 390. A fit
  no longer takes the smallest node below 24 px, so on a narrow canvas the reader
  pans. At 1363 the fit is unchanged (1.16).

## axe-core

`scripts/qa/axe-sweep.mjs` runs axe-core 4.12.0. It is already in the tree as a
dependency of eslint-plugin-jsx-a11y, so nothing was installed. It uses the WCAG
2.0/2.1/2.2 A and AA tags, and reduced motion, so no element is read mid-reveal.
The 2026-09-22 note that axe was unavailable was wrong.

| run | routes | routes with a violation |
|---|---|---|
| light 1363 | 32 | 1: `/neo/read/book2/` target-size (chapter ticks) |
| dark 1363 | 32 | same one |
| light 390 (desktop UA) | 32 | 0 |
| dark 390 (desktop UA) | 32 | 0 |
| light 320 (desktop UA) | 32 | 0 |

The reader's chapter ticks fall under the WCAG 2.5.8 "equivalent" exception: the
table of contents offers all 15 chapters the ticks point to as 44 px rows (checked
by title match).

Fixed from the axe findings:

- **color-contrast**. Module chips (PM 4.38:1, PP 4.31:1, MM 2.48:1 on their own tint)
  are now the module colour mixed 80% with ink. Chip labels moved from ink-3 to ink-2
  (4.39:1). Home index numbers (opacity .5 at 8.6 px, 2.52:1) now use ink-3 at .8em.
  The Studio mode tab went to brand-dark, with ink on the coral mode chip in dark
  mode (it measured 4.15:1 and 3.05:1). The knowledge tab count badge got a dark
  wash (3.57:1). The reader TOC's current id moved to ink-2 (4.11:1 dark).
- **nested-interactive**. A collapsed chapter's lead was a link inside its `<summary>`;
  it now renders after the `<details>`, aligned by an invisible copy of the chapter
  number. The object lanes graph was `role="img"` over focusable nodes; it is now
  `role="group"`.
- **scrollable-region-focusable**. The S/4 Center's ABAP code is focusable. The
  MARA-style join snippets wrap on phones instead of scrolling.
- **target-size and button-name**. See "Reflow" above.

The project's own `a11y-sample.mjs` reported 0 contrast failures on 2026-09-22
while axe found the cases above. The in-house check misses text that is made faint
through opacity, and small chip text. Use axe as the gate.

## Keyboard

`scripts/qa/keyboard-check.mjs` tabs through 40 stops per route. It flags focus
outside the viewport, focus without a visible change (the focused computed style
compared with the blurred one, since a resting box-shadow is elevation and not a
ring), and traps.

| run | stops | traps | off-screen focus | no visible change |
|---|---|---|---|---|
| 1363 | 1,280 | 0 | 0 | 0 |
| 390 desktop (peek rail) | 1,280 | 0 | 0 | 0 |

## 200% zoom (emulated)

The `zoom200` row above: 682 x 468 CSS px (1363 x 936 at 200%), all zeros. This
emulates the CSS width at 200%; it is not a browser zoom.

## In-house accessibility sample (2026-09-22, kept for the record)

`tab-sweep/a11y.json`, via `scripts/qa/a11y-sample.mjs`, covered 37 routes and
15,055 text nodes. Five targets under 24 px, all covered by a WCAG 2.5.8 exception:
an inline link in a sentence (`/neo/academy/`), and, on the two legacy `/exits/*`
routes, the sr-only skip link and an inline footer link. Obscured focus appears only
on those two legacy routes, which render through the legacy shell (ACC-6).

## Not closed here

- Screen reader: not tested with a real reader. The h1s built from stacked block
  spans (Home, Books) read as one run-on string in `textContent`.
- Safari and physical devices: emulation only (BLOCKERS).
- The Studio canvas is pannable by design; at a 320 px desktop window some nodes sit
  past the canvas edge until the reader pans (see the clip table).
- `/exits/*` legacy shell focus: ACC-6.
- No full WCAG conformance is claimed.
