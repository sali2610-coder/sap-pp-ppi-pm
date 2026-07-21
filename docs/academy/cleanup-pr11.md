# PR-11 · Post-migration dead-code cleanup

Removes orphaned files left after the Academy engine unification + migration
(PR-1→10). Authoritative detection: **knip 6.27** + a custom import-graph
reachability analyzer (`scripts/find-orphans.mjs`) + quote-anchored grep — all three
reconciled on `main`. Cleanup-only: no UI, no behavior, no data change.

## Deleted — Group A (19 files, all superseded / zero live importer)

### Old accordion readers → replaced by the lesson engine (PR-10 redirects)
| file | reason safe |
|------|-------------|
| components/academy-chapter.tsx | rendered `/library/*-academy/[slug]`; those pages now redirect |
| components/pp-chapter-detail.tsx | rendered `/library/pp/[slug]`; now redirects |
| components/pp-flow.tsx | used only by pp-chapter-detail |
| components/pp-textbook-view.tsx | used only by pp-chapter-detail |
| data/library/pp-deep.ts | used only by pp-chapter-detail |

### Old module-hub page → superseded by live module-portal / module-section
| file | reason safe |
|------|-------------|
| components/module-hub.tsx | old hub page; no importer |
| components/hub-zones.tsx · module-directories.tsx · progress-chart.tsx · table-experience.tsx · technical-blueprint.tsx · fields-table.tsx | used only by module-hub (or its dead children) |

### Old data + home fragments → superseded
| file | reason safe |
|------|-------------|
| data/library/academy.ts | superseded by live data/library/academy-index.ts (0 exact importers) |
| components/executive-summary.tsx · lifecycle-block.tsx · quick-access.tsx · centers-mega-menu.tsx · home-hero.tsx | old home/hub UI fragments; no importer |
| components/copy-button.tsx | superseded by inline CopyBtn in lesson-view |

## Held pending explicit approval — Group B (5 files)
Not deleted (possible backward-compat / design-system reserve):
`components/creator-credit.tsx` (brand/credit) · `components/status-io.tsx` (status
export/import feature, currently unwired) · `components/ui/{accordion,select,table}.tsx`
(hand-written shadcn primitives — UI-library reserve).

## Verification
- tsc **0** (final arbiter — would fail on any live import of a deleted file)
- eslint **0 errors** (warnings 352 → 337)
- build clean (4,560 pages) — tree-shaking intact, no missing-module errors
- dead-links **0** · coverage **PASS** · G7 scenario suite **17/17** (no behavior change)
- knip after: only the 5 held Group-B files remain — Group A fully removed, no new orphans

Kept `scripts/find-orphans.mjs` as reusable tooling.
