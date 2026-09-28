# Phase 0 · Baseline · 6ba22207

Measured 2026-09-28 on the design worktree before any change. Raw logs: `neo-redesign-evidence/baseline/` (outside the repo).

## Starting state

| item | value |
|---|---|
| `origin/main` | 6ba22207a2bcb11defe47134e34e5b8c89952545 |
| production | GitHub deployment 6718495973 (Production, vercel[bot], success 19:18:47Z), `sapbysali.app` serves it (etag `409f0f79…` on /neo/) |
| design branch | `design/neo-experience-redesign`, created from `origin/main`, did not exist before (local or remote) |
| worktree | `/Users/salihalif/Desktop/My-Projects/neo-redesign`, real `npm ci` |
| user changes left untouched | in `sap-kb3`: modified `.claude/settings.json`; untracked `audit/master-completion/shots-2026-09-24/{desk,phone}-{IB01,VA01}.png`, `audit/ux-2026-09/shots/master/`, `scratchpad/`; old branch `design/neo-correction-pass` at 0a69e6cb |

## Generated inputs the local build needs

Vercel runs `npm run build`, whose `prebuild` writes ignored files the export depends on. The fresh worktree had neither, so the first local export had no chapter text (`check:reader` exit 1, 0% content). Fixed without touching protected data:

- `public/books/` (212 chapter shards, gitignored): copied from `sap-kb3/public/books`, byte-identical to what production serves (212/212 compared today). `scripts/migrate-books.mjs` was NOT run, because it also rewrites `data/books/*.json`.
- `public/tx-search-index.json` (gitignored): `npm run gen:tx-index`, 2,168 entries, sha256 identical to production (`dd18b662…`).

## Gates

| gate | result |
|---|---|
| books before the first change | `ZERO_CONTENT_LOSS 574/574` |
| TypeScript app / tests (non-incremental) | 0 / 0 errors |
| tests | 211/211 |
| evidence and schema tests | 21/21 |
| academy blocks | 460 lessons in sync |
| lint | 0 errors, 409 warnings |
| build | 7,867/7,867 static pages (twice, with the sitemap in between) |
| route manifest | in sync |
| sitemap | 4,521 URLs, all indexable pages, 0 dead entries |
| diagnostics page | present |
| dead links | 7,869 pages, 0 dead |
| reader coverage | 11 books, 4,317 sections, 100% with content, 0 missing routes |
| verify-reader | 108/108 |
| books after build | `ZERO_CONTENT_LOSS 574/574`, no tracked-file drift |

## Astra baseline

The same tree was measured twice today, so it is not re-run here:

- production, `https://sapbysali.app` at 6ba22207, 19:21 to 19:59Z: PASS 114, FAIL 1 (S5-1), NOT_MEASURABLE 25. Copy: `neo-redesign-evidence/before/astra-prod-summary.{json,md}` and `astra-prod-runs/`.
- local export of the identical tree (0a69e6cb), 16:43Z: PASS 115, FAIL 0, NOT_MEASURABLE 25 (`audit/master-completion/astra-reverify/`).

The S5-1 difference is explained in `TRACEABILITY.md` (NEW-1): the check measures `/neo/domain/`, which is not a page; locally it measured nothing and passed falsely.

## Before screenshots

479 PNG of production 6ba22207: 12 layouts × 32 routes (1363 light, dark, reduced motion; 390 and 320 phone; 390 and 320 desktop; 682 at 200% zoom; 834 tablet; 1440; 1920), present-check, open-rows-check, and 18 screens × 4 configurations. `neo-redesign-evidence/before/`.

## Bundle (gzip, per route; `tools/bundle-sizes.mjs`)

| route | HTML | JS (files) | CSS (files) |
|---|---|---|---|
| /neo/ | 90K | 269K (15) | 61K (6) |
| /neo/erd/ | 135K | 292K (16) | 61K (6) |
| /neo/tables/ | 98K | 273K (15) | 61K (6) |
| /neo/tables/AFKO/ | 89K | 271K (15) | 63K (8) |
| /neo/transactions/ | 91K | 732K (18) | 61K (6) |
| /neo/transactions/IP30H/ | 78K | 271K (15) | 63K (8) |
| /neo/best-practices/ | 95K | 271K (15) | 66K (10) |
| /neo/best-practices/order-settlement-process/ | 115K | 271K (15) | 66K (10) |
| /neo/books/ | 126K | 278K (15) | 61K (6) |
| /neo/read/book2/ | 93K | 294K (16) | 60K (6) |
| /neo/academy/pm/pm-bom/ | 84K | 288K (16) | 59K (6) |
| /neo/chat/ | 72K | 872K (24) | 61K (6) |
| /neo/fiori-apps/capacity-scheduling-board/ | 80K | 269K (15) | 63K (8) |
| /neo/bapi/BAPI_ALM_CONF_CREATE/ | 81K | 269K (15) | 63K (8) |

Totals in `_next/static`: JS 40.7 MB raw in 195 files, CSS 721 KB in 23 files, fonts 0 (system fonts).

## Lab vitals (median of 3, cold cache; `tools/vitals.mjs`)

Desktop 1440×900 unthrottled; mobile 390×844, CPU ×4, 150 ms RTT, 1.6 Mbps. Local static server, so mobile numbers are dominated by the simulated network.

| route | desktop LCP | mobile LCP | mobile TBT | mobile CLS | INP proxy |
|---|---|---|---|---|---|
| /neo/ | 96 ms | 4,400 ms | 91 ms | 0.001 | 32 ms |
| /neo/tables/ | 144 ms | 6,244 ms | 41 ms | 0.001 | 48 ms |
| /neo/transactions/IP30H/ | 100 ms | 4,428 ms | 70 ms | 0.001 | 32 ms |
| /neo/erd/ | 88 ms | 4,352 ms | 43 ms | **0.196** | 32 ms |
| /neo/best-practices/order-settlement-process/ | 104 ms | 4,588 ms | 167 ms | 0.001 | 32 ms |
| /neo/read/book2/ | 208 ms | 9,360 ms | 220 ms | 0.001 | 32 ms |
| /neo/academy/pm/pm-bom/ | 84 ms | 4,360 ms | 55 ms | 0.001 | 32 ms |

Finding: the ERD shifts layout on mobile (CLS 0.196, above the 0.1 target). The reader's mobile LCP waits for the chapter JSON.

## System map

See `SYSTEM-MAP.md`: 24 CSS files, 22,791 lines, 591 hex literals, 85 pill radii, 277 shadows, 93 keyframes, 16 purple hues, body text 14px, 89 declarations of 10px text.
