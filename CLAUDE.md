@AGENTS.md

# Project NEO Cockpit — CBC Israel

Offline SAP ECC→S/4HANA migration cockpit + technical data dictionary for PM and PP-PI.
Lead dev: Sali Halif (Web Coding). Footer credit is mandatory on every page.

## Stack
Next.js 16 (App Router, `output: 'export'`) · React 19 · TypeScript · Tailwind v4 (config-in-CSS, `app/globals.css`) · Radix primitives + hand-written shadcn-style `components/ui/*` · lucide-react. RTL (`dir="rtl"`, Hebrew). Brand red `#d62027`.

## Hard constraints
- **100% offline** — no CDNs, no `next/font/google`, no remote assets. Font = system `'Segoe UI'` stack. After build, no external resource fetches in `out/` (help.sap.com links inside the dataset are content, not loads).
- Static export only — output is `out/`, served by any static server, no Node runtime.

## Data (do not hand-edit)
- `data/sapData.ts` is **generated** by `node scripts/extract-data.mjs` from `source/index_pppi_standalone.html` + `source/index_pm_standalone.html`. Regenerate, never edit by hand.
- Counts asserted in the script: PP-PI = 68 tables, PM = 58 tables. Build fails if they drift.
- Types: `lib/types.ts` (`SAPModuleData` / `SAPTopic` / `SAPTable` / `SAPField`).

## Status persistence
`lib/status-store.ts` — `localStorage['neo:status']`, SSR-safe via `useSyncExternalStore`. Export/import as JSON in `components/status-io.tsx`.

## Commands
- `npm run dev` — local dev
- `node scripts/extract-data.mjs` — rebuild dataset from source HTML
- `npm run build` — produce `out/` (static)
