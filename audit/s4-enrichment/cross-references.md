# Cross-references across the knowledge families (design-audit continuation §11, 2026-09-22)

Measured with `scratchpad/xref-audit.mjs` (read-only) and a resolver replay against the generated
route manifest, at HEAD `a3f74666`. Books are a read-only zone: every
reference below points *at* a book section, none edits one.

## Incidents
| measure | value |
|---|---|
| incident rows | 156 (unique slugs 156) |
| rows carrying `notes` | 125 |
| rows carrying a `tables` list | 156 |
| table references in total | 367 |
| table references that open an object page | 195 |
| table references rendered as inert chips (table outside the dictionary) | 172 |

The brief's expectation (156 incidents, 125 with notes) matches the repository exactly. The
125 rows with notes are the three extension files (41 + 50 + 34); the 26 rows of the original
file and the 5 rows of the fourth extension carry no `notes` field, by construction.

## Bidirectional linking
- Object pages count the incidents that point at them ("N תקלות שמפנות לטבלה הזו"), so the
  table-to-incident direction is derived from the same list, never authored twice.
- Domain pages (39 rows, 32 with a deep-detail record) list their incidents; the deep-detail
  keys are a strict subset of the domain slugs, so there is no orphan detail record.
- Process maps (5 end-to-end maps) reference incident slugs per step: 35 distinct slugs, of
  which **two do not resolve**: `pir-strategy` (no record in any catalog) and
  `qm-ud-stock-block` (a row of `data/sap-notes.ts`, not an incident). The Process Explorer
  renders an unresolved slug as a chip **without** an href (`incidentBySlug(i) ? … : ""`), so
  neither produces a dead link; both are recorded here as content gaps to close by either
  writing the incident or re-pointing the reference to the SAP-notes catalog. No reference was
  deleted and no incident was invented to fill them.

## Search (⌘K palette)
`components/neo-shell/search/command-index.ts` indexes nine families (functions and their
destinations, ownership, modules, fields, book chapters, domain flows, knowledge guides, best
practices, and the command list itself) from six data sources. Best practices are indexed by
record, so the process records added in this pass are searchable without another index.

## NEO AI knowledge index
`lib/ai/tree.ts` loads `data/ai-tree/index.json` (11 books indexed, one per library book) and the
per-book trees on demand. The index is a build artefact (`prebuild` → `scripts/build-ai-tree.mjs`);
its drift after a build is reverted, never committed. The AI answer surfaces cite book sections
with book, chapter and section id, which is the source attribution the brief asks for.

## Library
11 book files, 135 chapters, 4,317 sections, all read-only. The hash check
(`scratchpad/books-hash-check.mjs`) reports 574/574 files identical before and after this pass.

## Dead links
`npm run crawl:deadlinks` runs over the static export in the gate section of the delivery report;
the two unresolved incident slugs above are not links, so they cannot appear in it.
