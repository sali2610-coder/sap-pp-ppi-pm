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

## Working mode — autonomous by default

Work to the finish. A request is a request for the finished, verified result, not
for the first step of it.

**Do not stop to ask** when the answer is already available in the repository,
the existing code, the project docs, a screenshot, the tests, or an earlier
instruction in this conversation. Read it and decide. A question whose answer is
in the repo is a question that should not have been asked.

**Do not stop between normal steps.** Plan → implement → typecheck → lint →
build → verify in a browser → screenshot → commit → push → preview deploy is one
continuous task, not seven checkpoints. In particular do not stop after
planning, after writing the code, or after the first green build — a build that
compiles is not a feature that works.

**When something fails, investigate and fix it.** Read the actual error, find the
cause, fix the cause. Retry a different way rather than reporting the first
failure back. If three attempts fail on the same thing, stop and say what you
tried and what you observed.

**Verify before claiming.** "Done" means measured: exit codes, page counts,
console errors, overflow, real screenshots. Never report a check that was not
run, and never describe a live check that did not happen. If something is
unverified, say which part and why.

**Use what is already here.** Existing conventions, existing components,
existing data, existing tooling. Do not rebuild a working tool because a newer
shell exists. Prefer the smallest change that satisfies the requirement.

**Never invent SAP data.** No invented table, field, T-code, BAPI, relation,
count, SAP Note or KBA number. Every number must be derived from the dataset and
traceable to it. Where the dataset is silent, say so in the UI and in the report.
A visible gap is correct; a plausible fabrication is not.

### Stop and ask only for these

1. A destructive, irreversible action.
2. Deploying to production.
3. Merging to `main`.
4. Deleting data that matters — datasets, book content, history.
5. Anything touching secrets or credentials.
6. A genuine product decision that the existing context cannot settle.

Everything else proceeds without confirmation. Preview deployments on a design
or feature branch are normal work and need no approval; production and `main` do.

### Frozen surfaces
The canonical Library reader and its data are not to be modified as a side
effect of other work: `components/book-reader.tsx`, `components/chapter-reader.tsx`,
`components/library/**`, `components/neo/**` (a shared kit the Library imports),
`app/library/**`, `data/books/**`, `data/ai-tree/**`. If a task appears to
require changing one of these, stop and explain rather than doing it.

Note: `npm run build` regenerates `data/ai-tree/*.json` through its `prebuild`
step. That drift is a build artefact — revert it, do not commit it.

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
