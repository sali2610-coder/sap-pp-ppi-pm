# Tokens · Project NEO design system 2026

Source of truth at runtime: `app/neo/system.css` (scoped to `.nx-app`, loaded last among the NEO globals). This file explains the values; the CSS holds them. Direction and reasoning: `BAKEOFF.md`.

Contrast is computed, never estimated: `neo-redesign-evidence/tools/palette-check.mjs` (ground, ink, action, link, focus, S/4 states) and `module-check.mjs` (modules), both built on `contrast.mjs` (WCAG 2.x relative luminance). Last run: 0 failures.

"No violet" is a test, not a judgement: `contrast.mjs` `violet()` flags a colour with OKLCH chroma of at least 0.015 whose HSL hue is 235° to 340° at 10% saturation or more, or whose OKLCH hue is 272° to 345°. HSL alone let a periwinkle (#616491, 19.8% HSL saturation) through, hence the second model. New colours are chosen further out still (no OKLCH hue 262° to 350°). `violet-sweep.mjs` runs the test over every hex and rgb() value in `app/neo`, `components/neo-shell`, `lib/evidence`, `app/globals.css` (added after gate 10, M4: its root and section tokens still held the old violet, QM pink, plum and indigo values, now the values of this file) and the boards. Last run (29.09, after gate 10): 282 files, 2 hits, both accepted below.

| hit | why it stays |
|---|---|
| `app/design/redesign-2026/workbench/board.css:145,219` QM `#A3345E` / `#E57BA2` | the bakeoff exhibit as judged (hue 337°, outside the brief's 240° to 330° band, inside the widened test); the system's QM is `#a0233f` (347°) |

## Colour · day (paper) and night (warm charcoal)

| role | token | day | night | worst ratio (day / night) |
|---|---|---|---|---|
| canvas | `--background`, `--g-ground` | #f3f0ea | #171512 | |
| panel | `--surface`, `--g-raised` | #fbf9f5 | #1f1c18 | |
| recessed | `--surface-2`, `--surface-sunken` | #ece7df | #13110e | |
| floating | `--surface-raised` | #fffefb | #29251f | |
| divider | `--hairline`, `--line-1` | #e1dbd1 | #35302a | decorative |
| control boundary | `--line-strong`, `--input` | #867e72 | #7a7266 | 3.26 / 3.21 (need 3) |
| text | `--ink-1` | #1c1915 | #eee8de | 14.23 / 12.50 |
| secondary text | `--ink-2` | #4a443c | #c7bfb3 | 7.82 / 8.36 |
| muted text | `--ink-3` | #655e54 | #a39a8d | 5.20 / 5.49 |
| brand (marks, fills) | `--brand` | #d62027 | #f06a6b | 4.51 / 5.64 as a mark |
| brand as text | `--brand-ink` | #b5202a | #f58a8a | 5.32 / 6.44 |
| text on brand fill | `--brand-foreground` | #ffffff | #1a0b0c | 5.13 / 6.36 |
| link | `--link` | #1d5486 | #8fbbe3 | 6.40 / 7.53 |
| focus ring | `--focus` | #1f5fbf | #7fb2ff | 4.95 / 7.05 (need 3) |
| cited sentence (reader) | `::highlight(neo-cited)`, the `--warning` hue as a tint | rgb(127 84 0 / .18) | rgb(228 185 95 / .26) | body text on it 7.01 / 5.14, bold 12.76 / 7.68 (measured on the reader's paper, `neo-redesign-evidence/final-run-7/cited-contrast.log`) |

Ratios are the minimum over canvas, panel, recessed and floating surfaces.

## S/4HANA status families

Always an icon and a word; colour is the third signal, never the only one. The status pill, the ERD tags and every legend read these same `--s4-*` tokens through `S4_STATUS_DOT` (`lib/evidence/types.ts`), so one family is one colour everywhere. The words come from the content reviewer's dictionary (`reviews/content-review-copy-sap.md`, row 91).

| family | token | day | night | worst ratio |
|---|---|---|---|---|
| נשמר | `--s4-keep` | #1a7045 | #79d39f | 4.95 / 8.44 |
| משתנה, מוגבל | `--s4-change` | #7f5400 | #e4b95f | 5.38 / 8.27 |
| מוחלף | `--s4-replace` | #0d6771 | #6fcfd6 | 5.34 / 8.39 |
| לא אסטרטגי | `--s4-not-strategic` | #8f4a00 | #f2a863 | 5.42 / 7.66 |
| הוסר | `--s4-removed` | #8a3b22 | #eb9a80 | 6.25 / 6.87 |
| חדש ב-S/4HANA | `--s4-new` | #0a638f | #78c6f0 | 5.34 / 8.08 |
| ECC בלבד | `--s4-ecc-only` | #556170 | #aab4c0 | 5.12 / 7.25 |
| נדרש אימות | `--s4-verify` | #5d574f | #b9b0a3 | 5.80 / 7.11 |

"הוסר" is brick, not brand red: a removed table and a selected table must never look alike (September audit, §5).

## Modules

Identity only; every module mark carries its code as text, so colour is never the only signal. Hues the product already used are kept, darkened where needed for 4.5:1 on the recessed surface; the four violet or indigo modules and pink QM were replaced.

| module | day | night | day ratio | change |
|---|---|---|---|---|
| PM | #0d6c64 | #5eead4 | 5.10 | darker, same teal |
| PP-PI | #004cd6 | #7dd3fc | 5.68 | hue 264° to 262°: #1d4ed8 tinted to periwinkle on the warm paper |
| PP | #436c0d | #bef264 | 5.03 | darker, same olive |
| PP/DS | #8a5a12 | #f2c96b | 4.80 | bronze, no longer equal to BATCH |
| MM | #0c6a84 | #67e8f9 | 5.00 | darker, same cyan |
| QM | #a0233f | #f4a5b5 | 6.08 | rose 347°, was pink 336° (night 327° was in the violet band) |
| EWM | #046c4e | #6ee7b7 | 5.23 | darker, same emerald |
| SD | #a93a0b | #fdba74 | 5.18 | darker, same orange |
| BATCH | #8b5606 | #fcd34d | 4.97 | darker, same amber |
| CS | #137035 | #86efac | 5.02 | darker, same green |
| CLASS | #0369a1 | #38bdf8 | 4.82 | kept |
| FI | #103b8c | #93b4f5 | 8.42 | navy, was violet #6d28d9; #1e3a8a drifted like PP-PI |
| CO | #375116 | #96c166 | 7.26 | moss, was fuchsia #86198f; a first bronze sat 0.031 OKLab from BATCH |
| PI/PO | #475569 | #aab6c8 | 6.16 | slate, was indigo #4338ca |
| Fiori | #3b5b7a | #9dbbd8 | 5.76 | cool slate, was violet #5b21b6 |
| S&OP | #155e75 | #8fd3e6 | 5.90 | kept |
| IDoc | #57534e | #d6d3d1 | 6.20 | kept |
| S/4 | #44403c | #d6d3d1 | 8.35 | warm stone |
| HR (ERD only) | #005350 | #0dcbc3 | 7.25 | deep teal, was #0d9488 |
| BW (ERD only) | #684a00 | #daa843 | 6.64 | ochre, was indigo #4f46e5 |

**Tint drift.** A module colour is also mixed into the surfaces at low strength (`color-mix` in sRGB, for rows and marks). Mixed into the warm paper, #1d4ed8 and #1e3a8a land at OKLCH hue 272-276° at 14-36% strength, inside the violet band, although neither passes the violet test alone. `tint-drift.mjs` tests every module at every strength on the four surfaces; `blue-fix.mjs` picked the nearest colour (OKLab) that never drifts, keeps 4.5:1 and sits no closer to another module than the original did. The runtime sweep (`violet-dom.mjs`, 160 route and theme pairs) confirms no painted violet.

CO, HR and BW were chosen by `erd-extra-hues.mjs`: one OKLCH hue per module (so the day and night values are the same module), scored by the smaller of the two themes' minimum OKLab distance to the modules it lives beside, with 4.5:1 and the violet test as hard filters. The ERD reads these same `--mod-*` values (it used to carry the production graph's own palette, with PP violet and FI and CO red); HR and BW are declared in `app/neo/erd.css` because only the ERD shows them. The join between two modules on the ERD is drawn in `--ink-1`: every other edge carries a module colour, so the strongest ink is the one stroke that cannot be read as a module.

Closest pairs that remain on the ERD, all hues the product already used: PP/CS 0.041 and MM/CLASS 0.048 by day, PM/MM 0.056 by night (OKLab). Every mark carries its module code as text.

## Object classes and section tints

| token | day | night | note |
|---|---|---|---|
| `--obj-movement` | #444e05 | #c3d670 | moss, was plum #7a3f6b |
| `--obj-status` | #0b5b5e | #3fe4e9 | deep teal, was periwinkle #5f5f8a |
| `--sec-erd` | `var(--sec-studio)` | same | was violet #5b3fd6: the data model and the studio are one instrument |
| `--sec-bapi` | `var(--mod-pipo)` | same | was violet #7231c9: an interface takes the integration slate |
| `--sec-fiori` | `var(--mod-fiori)` | same | was blue-violet #4a5fd4 |
| `--sec-academy` | `var(--sec-knowledge)` | same | was indigo #4b3fb0: learning shares the knowledge blue, as the centers do |
| `--sec-neo` | `var(--brand-ink)` | same | the brand as text (the rail writes section tints as text) |
| `--sec-tables` `--sec-idoc` `--sec-cds` `--sec-enh` `--sec-knowledge` `--sec-incidents` `--sec-cert` | #975600 #a35005 #0e717c #2a7539 #1969b2 #b83b04 #82620a | unchanged | darkened in OKLCH with the hue kept (`darken.mjs`) from 3.71 to 4.47:1 up to 4.60 to 4.68:1 on the recessed surface |

Book cloths (`books-data.ts` CLOTH, mirrored on the home spines): slot 5 slate violet becomes moss #2c3108, slot 8 plum becomes cordovan #5b3b3b (`cloth-pick.mjs`: white type at 78% opacity still 8.89:1 and 6.74:1, at least 45° of OKLCH hue from both shelf neighbours).

## Type

| token | size | use |
|---|---|---|
| `--t-display` | 2.5rem, line 1.15 | gateway titles, display face |
| `--t-h1` | 1.75rem, line 1.25 | work-screen titles. The ERD and the Studio, canvas instruments, keep one title row at `--t-h2` so the canvas stays in the first screen (`BLOCKERS.md` §5) |
| `--t-h2` | 1.25rem, line 1.35 | section titles |
| `--t-lead` | 1.125rem | lead paragraphs |
| `--t-body` | 1rem, line 1.7 | reading (was 0.875rem) |
| `--t-ui` | 0.9375rem | UI body |
| `--t-sm` | 0.875rem | dense UI, tables |
| `--t-xs` | 0.8125rem | secondary |
| `--t-micro` | 0.75rem | the floor: nothing smaller. After gate 10 (M3) no sheet under `app/neo` or `components/neo-shell` declares a smaller fixed size, the ERD and Studio labels included. Two recorded exceptions (`BLOCKERS.md` §5): the text drawn on the book covers scales with the cover (`books.css`, `clamp`, 5 to 11px; the title is also text at full size in the card, the hub and the reader), and a zoomable canvas renders its labels smaller than declared when zoomed out (the ERD overview opens at a fit: 46% at 1440, where 99 labels render at 5.5 to 7.4px; `final-run-7/g11-probes.json`) |

Families: `--font-sans` IBM Plex Sans Hebrew (Hebrew and Latin instances, 400/500/600), `--font-mono` IBM Plex Mono (every SAP identifier), `--font-display` Frank Ruhl Libre (class `.nx-display`, gateway and reading titles only). All self-hosted, OFL, one module per family (`app/fonts/plex.ts`, `frank.ts`). Tracking on Hebrew headings is 0. Weights 400, 500, 600; a 700 request renders the 600 face.

## Shape, depth, motion

- Radius: `--r-xs` 2px, `--r-sm` and `--r-md` 4px, `--r-lg` 6px, `--r-xl` and `--r-2xl` 8px. `--r-pill` is 4px, so every former pill is a rectangle; a true circle (dot, avatar) states `50%`.
- Depth: `--elev-1` and `--elev-2` are flat (cards sit on a hairline). By day they are `0 0 0 0 transparent`, not `none`: `none` cannot be one item of a shadow list, so `var(--elev-1), var(--focus-ring)` computed to no shadow at all by day and removed the focus ring (Studio nodes, catalogue plates; fixed on the branch). `--elev-3` and `--elev-4` only for menus, the palette and dialogs.
- `--measure`: `31em`, the reading column (60 to 72 Hebrew characters a line), used by the legal pages, the reader's intro, evidence paragraphs and course text.
- Status and section tokens stated in the token layer: `--status-blocked` is the danger family; `--sec-transactions` (#1d5fd0 day, #6da3ff night) and `--sec-studio` (#1f5f8a, #6fb0d8) were referenced by the S/4 and centres views without a definition.
- Faces: Plex Hebrew, Latin and Mono are preloaded with fallback faces sized per weight to Plex over the UI's own text, so the swap does not re-wrap a line (CLS on /neo/transactions/ 0.34 to 0.003). The display face (Frank Ruhl) is not preloaded and swaps in (`display: swap`), over two calibrated fallbacks from the machine's own Times New Roman Bold (Hebrew `size-adjust` 102.78%, Latin 103.68%; `system.css`), so it is fetched only on pages whose title paints it and its arrival does not move a line (gate 9, majors 1 and 2; 31d39b4d). Measured after: CLS 0 on every measured route.
- The reader's own font and size (the Dock's display menu) apply before the first paint on NEO pages: the pre-paint script sets `--nx-type-scale` and a `data-neo-face` attribute on `<html>`, and `dock.css` maps the attribute to the stack on the shell, where the self-hosted font variables resolve (gate 10, M6; `lib/theme-boot.ts`).
- Motion: `--dur-micro` 100ms, `--dur-fast` 160ms, `--dur-base` 240ms, `--dur-panel` 280ms, `--dur-slow` 400ms, `--dur-signature` 900ms (one per screen at most). Curves: `--ease-out`, `--ease-emphasis`, `--ease-accel`, `--ease-spring` (small overshoot, never a bounce). Transform and opacity only; every animation has a reduced-motion final state.

## Scenes

The ground.css "scenes" (a blue S/4 centre, module washes on PM and PP-PI) are neutralised: every scene takes the ordinary ground, and `--scene-accent` (text, links and focus on those surfaces) becomes the module colour where one is in scope and `--brand-ink` otherwise. The home's violet mid-page beat (`#nh-5`, which outranked the neutralisation through its ID) and the PP-PI periwinkle scene were removed rather than overridden. Colour moves into headings, marks and status, as the September audit asked (§7, S/4HANA centre).
