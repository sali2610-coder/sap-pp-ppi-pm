# Project NEO Cockpit — Release Notes

**Release candidate:** v1.0.0-rc1
**Scope:** Premium design overhaul (waves D1–D7) of the offline SAP ECC→S/4HANA migration cockpit for CBC Israel.
**Constraints honored throughout:** 100% offline (no CDNs/remote fonts/assets), static export (`out/`), RTL Hebrew, CBC brand red `#d62027`, Segoe UI system stack, footer credit. SAP logic and the generated dataset (`data/sapData.ts`) untouched — visual/UX only.

---

## Highlights

### Design system (D1)
- Elevation tokens (`--elev-1..4`), 1.20 type scale, motion tokens (`--ease-out-expo`, spring, durations), `.surface` / `.lift` / `.tap` / `.card-premium` / `.eyebrow` utilities, soft focus ring. Codified in `docs/neo-design-system-v1.md`.

### Information architecture & UX (D2–D3)
- Knowledge Center reorganized around user tasks (8 journey groups), search-first.
- `KnowledgeExplorer` — live filter, scroll-spy nav, `/` focus, staggered reveals, suggestion chips, empty states.

### UI redesign + motion (D4–D5)
- Premium navigation (shared-element active pill), hero, command-center cards.
- Motion layer: scroll reveal, skeleton loaders, cursor spotlight, animated count badges, page transitions — all reduced-motion safe.

### Search experience (D6)
- ⌘K command palette as primary entry point: recent searches, suggestions, jump-to pages, **omnipresent floating search button** on every page.
- **Enterprise search intelligence** (`lib/search-intel.ts`): synonym/alias expansion onto real dataset tokens (Process Order→COR, Batch→MCH, Material Master→MARA, IDoc→MATMAS…), trailing-number strip, light fuzzy.
- **Bright-yellow highlight everywhere** — tables, fields, T-Codes, BAPIs, CDS, relationships, process steps.
- Match counts ("נמצאו N תוצאות") + **jump-to-match** (`?find=`, auto-scroll, `.find-flash`).

### Executive Wow Layer (D7)
- **Home executive band** — migration readiness ring (live status), status breakdown, "objects to watch" spotlight.
- **Table Experience** (PM/PP-PI) — progressive disclosure: premium card → inline summary → PK/FK field explorer → full Object Workspace drawer. Browse → Expand → Deep Dive.
- **Dedicated Lineage page** (`/lineage/`) — Source → Object → Consumer, click-to-highlight path.
- **Business Flow rebuilt** (`/process-explorer/`) — live search, animated map selector, staggered timeline, progressive drill-down.
- Premium empty states, CORE (★ ליבה) spotlight on high-blast-radius objects, Impact executive summary band, deeper section headers.

---

## Data integrity fixes (pre-D7 audit)
- **SAP Infrastructure module cards** now count ERD participation (matches the drill-down) — PP card corrected from 3 → 20 tables.
- **Home "modules" stat** corrected 12 → 2 (PM, PP-PI are the only table-backed modules).
- No data hand-edited — display logic only. Counting rules documented in `docs/pre-d7-audit.md`.

## Verified counts (authoritative, from blueprints)
- **PM:** 58 tables · 12 topics · 280 fields.
- **PP-PI:** 68 tables · 7 topics · 326 fields.
- Total 126 distinct tables (clean partition, no cross-module duplication).

## Final quality bar
- **All 12 major pages ≥ 91/100** (avg ≈ 94.3) — see `docs/d7-readiness-qa.md`.
- Build clean · 0 console errors · 0 page errors · 0 external requests (offline intact) · responsive 1440/390 · reduced-motion safe.

## New routes
- `/lineage/` — Data Lineage (first-class page).

## Documentation
`docs/`: `neo-design-system-v1.md`, `d2`–`d7` wave docs, `pre-d7-audit.md`, `d7-readiness-qa.md`, `RELEASE_NOTES.md`, `HANDOVER.md`, `screenshots/`.
