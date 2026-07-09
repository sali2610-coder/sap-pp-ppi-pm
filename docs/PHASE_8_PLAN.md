# Phase 8 — Planning Document (DRAFT — awaiting approval)

**Status:** proposal only. No code has been written. Do not start implementation
until this plan is approved.

## Frozen baseline
- Phase 7 is **frozen & production-ready**. Tags `phase-7-complete` = `v0.7.0` →
  commit `6609a0dd` (the healthy Production release on https://sapbysali.app).
- `main` has since advanced with additive Book 2 (Ch13/Ch14) commits; Phase 7 is
  preserved as an ancestor. Phase 8 branches from the current `main`.

## Standing constraints (unchanged from Phase 7)
- Flagship modules stay **PM, PP, PP-PI** only. Do not add MM/SD/FI/QM/WM/BW.
- **Never invent SAP data.** Derive from verified blueprints/DDIC or show honest
  "Coming Soon". Every data task below must cite a real source.
- 100% offline static export (`output:'export'`), RTL Hebrew, brand red as accent.
- Small commits per logical unit; every change passes the full gate
  (tsc 0 · eslint 0 errors · build · 0 dead links · responsive · a11y) before merge.
- Reuse the shared engine so future modules inherit it.

## Prioritized workstreams

### P1 — Close the PM ↔ PP-PI data-parity gap (highest quality lever)
- **Problem:** PM tables ship without field data-type/length, IDocs, SQL-join
  snippets, config rows — while PP-PI has them. PM pages read thinner than PP-PI.
  The PM source workbook simply lacks those columns.
- **Goal:** make PM feel equal to PP-PI, using only verified sources.
- **Scope:**
  1. Source PM field **type/length** + **IDoc** rows from SAP DDIC / a richer PM
     blueprint; extend `scripts/extract-xlsx.mjs` (`parsePM`) to populate `dt`/`len`
     and IDoc funcs. Regenerate `data/sapData.pm.ts`.
  2. Re-run the count assertions; align CLAUDE.md invariant to the deduped **56/270**
     (or restore the 2 cross-listed tables intentionally).
  3. Once PM has types, the Type/Len columns auto-show again (logic already in place).
- **Acceptance:** PM fields show real types; PM IDoc/config sections non-empty where
  data exists; parity script (PM vs PP-PI missing-field counts) shows no systematic gap.
- **No-invent guardrail:** if a PM field genuinely has no DDIC type, leave blank —
  do not fabricate. Ship what the source proves.
- **Effort:** M–L (data sourcing dominates). **Risk:** M (dataset regen + assertions).

### P1 — Manifest drift guard
- **Problem:** `lib/route-manifest.generated.ts` is regenerated manually
  (`npm run gen:routes`); silent drift would degrade `SmartLink` link resolution.
- **Goal:** make drift impossible to miss.
- **Scope:** a CI check (or a `pretest`/lint step) that regenerates the manifest and
  fails if it differs from the committed file. Same pattern would suit `sapData.ts`.
- **Acceptance:** CI red on stale manifest; green when in sync.
- **Effort:** S. **Risk:** Low.

### P2 — Structural dead-link coverage
- **Problem:** `pageExists` models 8 dynamic families; the rest (`/process/`,
  `/troubleshooting/`, `/domain/`, academies…) fail open. Today the crawl proves 0
  dead links empirically, but new content could introduce one uncaught.
- **Goal:** catch dead links structurally, not just by crawl.
- **Scope:** extend the generator to model every `dynamicParams=false` family; keep
  fail-open only for truly external. Add the crawl as a CI gate on the built `out/`.
- **Acceptance:** CI dead-link crawl runs on every PR; unmodeled-family links validated.
- **Effort:** M. **Risk:** Low–M.

### P2 — Safe consolidation & dead-code cleanup (maintainability)
- **Scope:** extract the ~13 `splitTc`/tcode-tokenizer copies into one
  `lib/tcode.ts` (byte-identical groups first, verify behavior on the different
  ones); dedup `fmt`; clear the remaining ~25 unused-var warnings; rename the two
  `const module` global-shadows. Each behind the full gate.
- **Acceptance:** eslint warnings materially reduced; no behavior change (crawl +
  QA identical).
- **Effort:** M. **Risk:** M (core search/derivation touched — do incrementally).

### P3 — Content/polish backlog
- Filter junk from `/bapi/[name]` params (`isCleanCode`) → drop `/bapi/Control Recipe/`.
- Fill honest gaps where verified data exists: IFLOT/MARA troubleshooting playbooks,
  AFVC/PLPO/CRHD consultant notes, PLKO/MARC interview Q&A — only from real sources.
- Lifecycle precision: give operation/sub-item tables (AFVC/AFVV, QMFE/QMUR/QMSM)
  their own status subset instead of the parent header lifecycle.

### Separate track — Book 2 (Ch8–12) landing
- The `phase-7-production-readiness` branch holds 26 Book 2 commits (Ch8–12) not yet
  in `main` as a focused PR. Land them in their own reviewed PR, independent of the
  Phase 8 flagship work above.

## Suggested sequencing
1. P1 manifest-drift guard + P2 CI dead-link crawl (fast, protective — do first).
2. P1 PM data parity (biggest quality win; longest lead time — start sourcing early).
3. P2 consolidation/cleanup (incremental, between the above).
4. P3 polish + Book 2 PR.

## Explicitly out of scope for Phase 8
- New SAP modules, redesign, invented business data, non-static runtime.

## Approval gate
Implementation starts only after this plan is approved. On approval, each
workstream becomes its own branch + PR with the full validation gate.
