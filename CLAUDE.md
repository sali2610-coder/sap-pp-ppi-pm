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
- `data/sapData.ts` is **generated** by `node scripts/extract-xlsx.mjs` from the definitive blueprints `docs/SAP_PM_ECC6_to_S4_Migration.xlsx` + `docs/SAP_PPPI_ECC6_to_S4_Migration.xlsx`. Regenerate, never edit by hand. (Legacy `scripts/extract-data.mjs` + `source/*.html` are the older, shallower source — superseded.)
- Counts asserted in the script: PP-PI = 68 tables / 326 fields, PM = 58 tables / 280 fields. Build fails if table counts drift.
- Each table carries full fields (tech/type/len/key), BAPIs/IDocs (incl Zetes/Daymax), S/4 notes + alt table/tcode, Fiori app, SUM note, and ER parent-child `relations` (PLKO→PLPO, EQUI→EQKT). Aux sheets (tcode dir, tools, PP-vs-PP-PI, simplification, config, custom-code) kept verbatim as `SAPSheet`.
- Types: `lib/types.ts` (`SAPModuleData` / `SAPTopic` / `SAPTable` / `SAPField` / `SAPRelation` / `SAPSheet`).

## Status persistence
`lib/status-store.ts` — `localStorage['neo:status']`, SSR-safe via `useSyncExternalStore`. Export/import as JSON in `components/status-io.tsx`.

## Commands
- `npm run dev` — local dev
- `node scripts/extract-data.mjs` — rebuild dataset from source HTML
- `npm run build` — produce `out/` (static)

## SAP HQ — Project Intelligence Entry Point
`/hq` is the **single entry point** for every SAP request in this repo (incidents, learning, architecture, SAP Notes,
migration, PP/PP-PI/PM/interfaces). It is project-local under `.claude/skills/{hq,sherlock,oracle,memory,flagship}/`
and `.claude/commands/hq.md`; runtime data lives in `SAP-HQ/`. Rules for anyone (or any agent) using it:
- HQ is an **orchestrator** — it routes internally to Sherlock (investigate) / Oracle (knowledge) / Memory (history)
  and Expert Packs. **The user never picks an agent manually.**
- **Hebrew by default.**
- **Never guess SAP data.** Use Never-Guess + evidence-based analysis; ask for the exact missing evidence.
- **Separate knowledge from a live check.** Label each conclusion: נבדק בפועל / מבוסס על קובץ / צילום מסך / ידע /
  דורש אימות במערכת SAP. Never claim a live SAP check that did not happen; never invent a SAP Note/KBA number.
- Works **with or without** a local SAP MCP (cloud/phone safe): degrades to project files, docs, pasted evidence,
  screenshots, and web search. This is orchestration only — it does not touch the NEO Cockpit business code.
