# Project NEO Cockpit — Handover Document

Offline SAP ECC→S/4HANA migration cockpit + technical data dictionary (PM, PP-PI) for CBC Israel.
Lead dev: Sali Halif (Web Coding).

---

## 1. Stack
- **Next.js 16** (App Router, `output: 'export'`, `trailingSlash`) → static `out/`, no Node runtime.
- **React 19** · **TypeScript** · **Tailwind v4** (config-in-CSS: `app/globals.css` `@theme inline` / `:root` tokens).
- **framer-motion** (motion), **lucide-react** (icons). RTL Hebrew (`dir="rtl"`). Brand red `#d62027`, Segoe UI stack.
- **100% offline** — no CDNs, no `next/font/google`, no remote assets. (help.sap.com links inside the dataset are content, not loads.)

## 2. Commands
```
npm run dev      # local dev
npm run build    # static export → out/
node scripts/extract-xlsx.mjs   # regenerate data/sapData.ts from the two blueprint .xlsx
```
Serve `out/` with any static server (e.g. `python3 -m http.server` inside `out/`).

## 3. Data (do NOT hand-edit)
- `data/sapData.ts` is **generated** by `scripts/extract-xlsx.mjs` from `docs/SAP_PM_ECC6_to_S4_Migration.xlsx` + `docs/SAP_PPPI_ECC6_to_S4_Migration.xlsx`.
- Build asserts counts: **PP-PI 68 tables / 326 fields**, **PM 58 / 280**. Build fails on drift.
- Types in `lib/types.ts`. Status persistence: `lib/status-store.ts` (`localStorage['neo:status']`, SSR-safe `useSyncExternalStore`).

## 4. Key components (design layer)
| Area | File |
|---|---|
| App shell, nav, search FAB, find-highlighter mount | `components/app-shell.tsx` |
| Command palette (⌘K) | `components/command-palette.tsx` |
| Search intelligence (synonyms/fuzzy) | `lib/search-intel.ts` |
| Yellow highlight | `components/highlight.tsx` |
| Deep-link jump-to-match | `components/find-highlighter.tsx` |
| Home executive band | `components/executive-summary.tsx` |
| Module hub (PM/PP-PI) | `components/module-hub.tsx` |
| **Table Experience** (progressive disclosure) | `components/table-experience.tsx` |
| Object Workspace (deep dive) | `components/object-workspace.tsx` |
| Data Lineage | `components/lineage-explorer.tsx` + `app/lineage/page.tsx` |
| Business Flow | `components/process-flow-explorer.tsx` |
| Impact analyzer | `components/tables-explorer.tsx` |
| Knowledge graph (lineage/relations source) | `lib/knowledge-graph.ts` |
| SAP Infrastructure (ERD/Data Model) | `app/sap-infrastructure/page.tsx` + `meta.ts` |

## 5. Conventions to preserve
- **Offline first** — never add a remote font/CDN/asset. Verify post-build: 0 external requests.
- **RTL + bilingual** — UI strings via `lib/i18n.tsx` (`t` / `pick`).
- **Reduced-motion** — all animation gated (`useReducedMotion` or global `prefers-reduced-motion`).
- **GPU-only animation** — transform/opacity; no width/height/top/left.
- **Design tokens** — use `--elev-*`, motion eases, `.surface/.lift/.tap/.card-premium`; don't hardcode shadows.
- **Highlight** — any new search/filter surface should wrap matched text in `<Highlight text query>`.
- **Counting rule** — module "table count" on summary cards must equal what the drill-down shows (participation, not owned-only). See `docs/pre-d7-audit.md`.

## 6. How progressive disclosure works (Table Experience)
1. **L1** premium card (name + business title + badges).
2. Click → **L2** inline accordion (purpose, PK/FK summary, relationships, key-field count, ECC↔S/4).
3. Click again / "צלילה לעומק" → **L3** full Object Workspace in a side **Drawer** (`highlight` prop carries the search term).

## 7. Docs map
`docs/neo-design-system-v1.md` (tokens) · `d2`–`d7` wave docs · `pre-d7-audit.md` (data validation) · `d7-readiness-qa.md` (12-page scorecard) · `RELEASE_NOTES.md` · `screenshots/` (+ `INDEX.md`).

---

## 8. Known limitations
1. **Light fuzzy only** — `within()` is Levenshtein ≤1, used as fallback. Heavy typos won't match; substring + synonyms carry the common queries. (`lib/search-intel.ts`)
2. **Jump-flash on styled headers** — `.find-flash` highlights the tightest element; over a red H1 the yellow pulse is subtler than on body rows. In-result highlight is the primary cue.
3. **Cockpit section header occlusion** — the Table Experience header bar can sit under the sticky module toolbar on scroll (cosmetic; `scroll-mt` mitigates partially).
4. **Process-map domains include modules without datasets** — Business Flow shows MM/SD/QM maps (cross-functional) though only PM/PP-PI have table catalogs; intentional, labeled.
5. **`out/` size ~352 MB** — many statically-generated object/tcode/troubleshooting routes. Fine for static hosting; consider on-demand if host has limits.
6. **Status data is local-only** — migration status lives in `localStorage` (per browser); no shared backend. Readiness ring shows 0% until a user sets statuses. Export/import JSON via `components/status-io.tsx`.
7. **Lineage = relational lineage** — derived from ERD relations + tcodes/CDS, not runtime data-flow lineage.

## 9. Future enhancements (backlog)
1. **Guides tab** — wire yellow Highlight into directory filtering (only sub-90 D6 gap).
2. **Object Workspace tab content** — add staggered motion on tab switch (currently fade-only).
3. **Extend Table Experience** to the Impact / OIC lists for a uniform Browse→Expand→Deep-Dive everywhere.
4. **Stronger jump-flash** on headers (wrap matched sub-string token instead of element flash) — needs safe text-node wrapping.
5. **Shared status backend / SAP connector** — architecture stub exists (`/connector`); live data would auto-populate readiness + counts.
6. **Per-zone migration sparklines** on the module hubs.
7. **Lineage depth >1 hop** (multi-level upstream/downstream traversal with collapse).
8. **Bundle/route trimming** for `out/` if deploy size matters.
9. **Real fuzzy engine** (e.g. trigram index) if natural-language search demand grows.
