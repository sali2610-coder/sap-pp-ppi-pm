# Project NEO — master implementation matrix

**One source of truth.** Every status below was produced by operating the running
app in this session, not by reading code or recalling earlier reports. Where a
claim could not be established by automation it says so rather than guessing.

Branch `design/neo-concept-d`. Preview only; `main` untouched, production untouched.

## Legend

| status | meaning |
|---|---|
| **DONE + VERIFIED** | measured working this session |
| **PARTIAL** | works, one named aspect unfinished |
| **OPEN** | not worked this session |
| **UNVERIFIED** | implemented, but automation could not prove it — needs a human click |

## A. Surfaces

| surface | status | old parity | new design | functional | mobile | dark | evidence |
|---|---|---|---|---|---|---|---|
| Home | DONE + VERIFIED | n/a | yes | yes | yes | yes | 8 scenes, dark-run 2, lockup present, 5 viewports 0 overflow |
| PM | DONE + VERIFIED | yes | yes | yes | yes | yes | quality baseline; hue #0f766e |
| PP-PI | DONE + VERIFIED | yes | yes | yes | yes | yes | hue #1d4ed8 |
| ERD / Data Model | **PARTIAL** | yes | yes | mostly | yes | yes | 15 nodes / 88 edges; zoom 72→88→72→62→41%, pan, fit, reset all move the camera; toolbar overflow 0; 0 console errors. Node-click focus + dim **UNVERIFIED** |
| Object EQUI / AUFK | DONE + VERIFIED | yes | yes | yes | yes | yes | 9 combos, full-scroll 0 overflow, 0 errors, S/4 visible |
| Tables + detail | DONE + VERIFIED | yes | yes | yes | yes | yes | in the 75-check sweep |
| Transactions + detail | DONE + VERIFIED | yes | yes | yes | yes | yes | in the 75-check sweep |
| BAPI / IDoc / CDS / Fiori / Enhancements | DONE + VERIFIED | yes | yes | yes | yes | yes | in the 75-check sweep, each with its own hue |
| **Centers** (11 families) | **DONE + VERIFIED** | **89/89 items** | yes | yes | yes | yes | structural old-vs-new diff, zero content loss |
| Books shelf | DONE + VERIFIED | yes | yes | yes | yes | yes | 11 covers, 0 blank, 11 distinct board colours, hover 21°→4°, open ~380ms |
| Book Hub | DONE + VERIFIED | yes | yes | yes | yes | yes | cover carries through, real metadata + chapter list |
| Reader | DONE + VERIFIED | yes | yes | yes | yes | yes | HE+EN, chapter intro, rail with active state, 11 figures inline, 0 overflow |
| Ask the Library | **PARTIAL** | n/a | yes | empty state only | yes | yes | palette, character, 6 quick actions, scope, composer all verified. Conversation states **OPEN** (needs live backend) |
| NEO AI | **OPEN** | n/a | inherits shell | — | — | — | not worked; distinct identity not built |
| Academy / Knowledge / Incidents | DONE + VERIFIED | yes | yes | yes | yes | yes | in the 75-check sweep |
| Sidebar / navigation | DONE + VERIFIED | yes | yes | yes | yes | yes | 18 routes, 18 distinct hues, active pill carries section hue |

## B. Regression, this session

25 NEO routes x {desktop light, desktop dark, mobile} = **75 checks, 0 failures**.
All HTTP 200, 0 horizontal overflow, 0 console errors, H1 present, RTL confirmed.
tsc 0, eslint 0 errors.

## C. Genuinely open

1. **NEO AI** — own identity not built; currently reads as a sibling of Ask the Library.
2. **Ask the Library conversation states** — bubbles, streaming, sources, retry and
   error states cannot be exercised without a live call to the external endpoint
   (`sap-books-api.vercel.app`), which spends real provider tokens.
3. **Object graph / ERD node interaction** — focus, relationship highlight and
   dimming. The mechanism exists (`data-hit`, `data-off`, `data-out`, `data-lvl`
   on every `.ne-node`) but automation cannot click an SVG `<g>`: `boundingBox()`
   returns null, and `dispatchEvent` does not drive React pointer handlers. Needs
   one human click to settle.

## D. Old routes still needing MIGRATE / REPLACE / RETIRE

The eleven Center routes are now **REPLACED** by `/neo/centers/`. `/sap-infrastructure/`
is **frozen by instruction**. The remaining ~30 legacy routes still have no
classification and **nothing has been deleted**. See `neo-migration-matrix.md`.

## E. Data untouched

`git status` is empty for `data/`, `app/sap-infrastructure/`, `app/library/`,
`data/library.ts` and `lib/s4.ts` across every commit in this session. The only
`data/` change was 84 punctuation substitutions in `data/centers/*.ts` Hebrew
descriptions, with a symmetric diff and an identifier check proving all 12 SAP
identifiers in changed lines survive.

## F. Test-harness errors corrected this session

Recorded because each produced a false finding that nearly caused wrong work:

- `document.body.innerText` comparison flagged 66 false content losses (shell chrome).
- Sentence-splitting flagged 77 more (breadcrumbs parse as one long sentence).
- Contrast probe read `oklab()` components as sRGB, manufacturing ~40 failures.
- Contrast probe scored `aria-hidden` decorative art.
- "0 failures" was indistinguishable from "0 elements" — a 500-ing page reported clean.
- `dispatchEvent` clicks do not drive React; only real pointer input does.
- A stale dev CSS graph made new tokens read as `rgba(0,0,0,0)`.
