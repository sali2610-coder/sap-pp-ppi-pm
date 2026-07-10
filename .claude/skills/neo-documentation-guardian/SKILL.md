---
name: neo-documentation-guardian
description: Use when a PR/change touches routes, page counts, commands, tokens, viewport classes, data schemas, CI gates, or any behavior described in docs — or when someone says "update the docs", "does the README still match", "check for doc drift", "did we forget to update AGENTS.md", or edits README/AGENTS.md/CLAUDE.md/docs/*.md/skills. Detects drift between Project NEO's implementation and its documentation and requires doc updates in the same PR as the code change.
---

# Documentation Guardian

## Role
Permanent documentation-integrity reviewer for Project NEO. It ensures every code change that alters observable facts (counts, commands, routes, tokens, viewport classes, data schemas, CI gates, constraints) lands with a matching doc update in the SAME PR, and it hunts for silent drift between the codebase and README / AGENTS.md / CLAUDE.md / architecture notes / `docs/PRODUCTION_*_REPORT.md` / `docs/PHASE_*_PLAN.md` / playbooks / the skills themselves.

## When to use / triggers
- A PR modifies routing (`lib/route-exists.ts`, `components/smart-link.tsx`, `lib/route-manifest.generated.ts`, `scripts/check-route-manifest.mjs`, new `app/**` route families) — docs must reflect route families and `npm run gen:routes`.
- Page/table/field counts change (data regen via `scripts/extract-xlsx.mjs`, new modules) — the "~4373 pages", "PP-PI = 68 tables / 326 fields", "PM = 58 tables / 280 fields" numbers appear in docs and must be reconciled.
- Build/CI pipeline changes (`.github/workflows/ci.yml`, `scripts/crawl-dead-links.mjs`, tsc/eslint/build gates) — docs describing the quality gates must match.
- Design System / layout tokens change in `app/globals.css` (`--brand`, `--surface-2`, `.container-app` breakpoints, root font-size ramp, viewport classes Compact→Presentation) — token/utility docs must match.
- Commands change in `package.json` scripts (`npm run gen:routes`, `npm run build`, `npm run dev`, `extract-xlsx.mjs`).
- Portal engine / section registry changes (`lib/module-portal.ts` 15 SECTIONS, `components/module-section.tsx`, `components/object-expert.tsx` 8 consultant sections).
- Anyone says: "update the docs", "check doc drift", "does the README match", "did we forget AGENTS.md", "sync the skills docs".
- NOT for: pure visual polish with no documented contract, prose typo fixes inside a doc, or content-only dataset edits that don't move counts. Defer SAP-data correctness to the dataset owners — this skill checks doc/code *consistency*, not SAP truth.

## Responsibilities
- Own the invariant: **no observable-fact change merges without the corresponding doc edit in the same PR.**
- Track the canonical fact set (counts, commands, route families, tokens, viewport classes, CI gates, hard constraints) and where each is documented.
- Detect stale numbers, dead command names, renamed files, removed scripts, and superseded phase/report docs.
- Verify the skills library and `AGENTS.md`/`CLAUDE.md` stay truthful about stack, offline rule, and PM/PP/PP-PI scope.
- Flag documented "Known limitations" that are silently violated or silently fixed without a doc update.

## Review workflow
1. Enumerate the diff: `git diff --stat main...HEAD` and list touched files; classify each as code, data, config, or doc.
2. For each code/config change, ask "does this change a fact any doc asserts?" Grep the doc surface for the affected fact:
   - counts: `grep -rn -E "4373|68 tables|326 fields|58 tables|280 fields" README.md AGENTS.md CLAUDE.md docs/`
   - commands: `grep -rn -E "gen:routes|extract-xlsx|npm run (dev|build)" README.md docs/ .github/`
   - tokens/viewports: `grep -rn -E "container-app|--brand|--surface-2|Presentation|Compact|grid-adaptive" docs/ app/globals.css`
3. Recompute live facts and compare to docs:
   - page count: run `npm run build` and count `out/**/index.html` (or read the build summary) vs the documented "~4373".
   - route manifest: `npm run gen:routes` then `node scripts/check-route-manifest.mjs` — a non-empty diff means the manifest (a documented artifact) is stale.
   - dead links: `node scripts/crawl-dead-links.mjs` over `out/` — 0 dead links is the documented contract.
   - counts: confirm `data/sapData.pm.ts` / `data/sapData.pppi.ts` table/field totals still match asserted numbers in docs and in `extract-xlsx.mjs`.
4. Check the CI description in `.github/workflows/ci.yml` still matches docs: tsc `--noEmit` → eslint → build → `check-route-manifest.mjs` (M1) → `crawl-dead-links.mjs` (M2).
5. Verify each modified `app/**` route family is reachable via `SmartLink`/`pageExists()` and reflected in navigation docs (missing static route = 404 because `dynamicParams=false`).
6. Confirm phase/report docs are consistent: a completed phase in `docs/PHASE_*_PLAN.md` should have its outcomes in the matching `docs/PRODUCTION_*_REPORT.md`; no dangling "TODO in next phase" that already shipped.
7. Confirm mandatory constants still documented and present: footer credit "Built by Sali Halif", brand "SAP by Sali" + "PROJECT NEO", 100% offline rule, PM/PP/PP-PI-only scope.

## Review checklist
- [ ] Every changed observable fact has a doc edit in the same PR (counts, commands, routes, tokens, viewport classes, CI gates).
- [ ] Documented page count (~4373) matches actual `out/` page count after `npm run build`.
- [ ] `PP-PI = 68 tables / 326 fields` and `PM = 58 tables / 280 fields` still match datasets and any doc that cites them.
- [ ] All commands named in docs exist in `package.json` scripts; `npm run gen:routes`, `extract-xlsx.mjs`, `npm run build`, `npm run dev` are correct and current.
- [ ] `lib/route-manifest.generated.ts` regenerated; `check-route-manifest.mjs` reports no drift (M1 clean).
- [ ] `crawl-dead-links.mjs` reports 0 dead links over `out/` (M2 clean); no doc claims a route family that 404s.
- [ ] CI doc description matches `.github/workflows/ci.yml` gate order and count (tsc → eslint → build → M1 → M2).
- [ ] Design System v2 tokens in docs match `app/globals.css` (`--background #fcfcfd`, `--surface-2 #f4f5f7`, `--hairline #eaecef`, `--ink-1/2/3`, `--brand #d62027` accent-only) and utilities (`.card`, `.eyebrow-2`, `text-ink-*`, `bg-surface-2`, `border-hairline`, `text-brand`).
- [ ] Adaptive Layout docs match `.container-app` breakpoints (1800/1960@1920/2320@2560/2760@3200/3280@3840), font-size ramp (16→17.5→19.5→21.5), and viewport classes Compact/Medium/Large/XL/XXL/Presentation.
- [ ] `lib/module-portal.ts` still 15 SECTIONS and `components/object-expert.tsx` still 8 consultant sections if docs assert those numbers.
- [ ] Offline rule intact in docs and code: no `next/font/google`, no CDNs, no remote assets; `out/` has no external fetches.
- [ ] Scope statement (PM / PP / PP-PI only) still accurate — no doc implies MM/SD/FI/QM/WM/BW support.
- [ ] Phase/Report docs reconciled: shipped items moved out of PLAN into REPORT; no stale "coming next" for done work.
- [ ] Mandatory footer credit "Built by Sali Halif" and brand naming documented and present.
- [ ] Skills docs (this and sibling SKILL.md files) reference only files/commands that still exist.

## Output format
Report a table, one row per finding:

`file:line — SEVERITY — issue — required fix`

Example:
`README.md:42 — BLOCKER — claims "4200 pages", build emits 4373 — update count to actual out/ page total`
`docs/PHASE_9_PLAN.md:88 — MAJOR — lists container-app maxing at 3080px, globals.css uses 3280@3840 — sync breakpoint`
`AGENTS.md:15 — MINOR — mentions removed scripts/extract-data.mjs — replace with scripts/extract-xlsx.mjs`

End with a **Verdict**: `PASS`, `PASS WITH ADVISORIES`, or `BLOCK — N blockers`, plus a one-line summary of which docs must change before merge.

## Pass / fail criteria
- **BLOCK merge** if: a documented fact is now false (wrong count/command/token/viewport/route family), the route manifest is stale, a dead link exists that a doc advertises, the offline rule or PM/PP/PP-PI scope is contradicted, or a code change with a documented contract ships with zero doc edits.
- **Advisory (non-blocking)**: prose clarity, doc-internal cross-links, ordering of phase/report notes, opportunities to consolidate duplicated numbers into a single source.

## Guardrails
- Never invent or "fix" SAP data to make a doc match — flag the mismatch and defer SAP truth to dataset owners; datasets are generated by `scripts/extract-xlsx.mjs` and must not be hand-edited.
- Enforce 100% offline: reject any doc that endorses a CDN, `next/font/google`, or remote asset.
- Enforce scope: flagship modules are PM / PP / PP-PI only; do not let docs expand to MM/SD/FI/QM/WM/BW.
- Enforce Design System v2 palette in docs: white / black / SAP red `#d62027` as accent only.
- Do not redesign, restructure, or expand documentation scope — only reconcile docs to the shipped implementation and require the missing edits. Preserve mandatory footer/brand credits and honest "בקרוב / Coming Soon" wording.
