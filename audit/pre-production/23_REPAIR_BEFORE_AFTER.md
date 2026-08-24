# 23 · REPAIR PASS — BEFORE / AFTER

Same methodology as the first audit: every number is measured from the **built output** (`out/`)
and from the datasets, not carried over. Where the first audit's figure turned out to be wrong,
the correction is stated rather than quietly replaced.

**No merge. No production deploy. Preview only.**

---

## 0 · Gates

| Gate | Result |
|---|---|
| `tsc --noEmit` | **0 errors** |
| `eslint . --ext .ts,.tsx` | **0 errors** (401 warnings, all pre-existing) |
| `npm run build` | **OK** — 7,800 `index.html` pages, static export |
| M1 `check-route-manifest` | **in sync** |
| M2 `crawl-dead-links` | **0 dead internal links** (7,802 / 7,802) |
| External resource loads in `out/` | **0** (the only absolute URLs are `rel=canonical`) |
| Console errors, 10 new surfaces @1440 | **0** |
| Horizontal overflow, 10 new surfaces @1440 | **0** |

---

## 1 · The twenty metric families

| Family | BEFORE | AFTER | Status |
|---|---:|---:|---|
| **Routes** — total built | 7,678 † | **7,800** | +122 |
| **Routes** — under `/neo/` | 3,048 † | **3,170** | +122 |
| **Objects** — validated total | 186 | 186 | unchanged |
| **Objects** — NEO pages | 105 | **186** | **+81 · CLOSED** |
| **Tables** — distinct in model | 105 | 105 | unchanged |
| **Fields** — documented rows | 512 | 512 | unchanged |
| **Fields** — PK | 145 | **222** | **+77** |
| **Fields** — FK | 101 | **178** | **+77** |
| **Fields** — dual-role `PK/FK` | **0** | **77** | **CLOSED** |
| **Relationships** — ERD edges | 106 | **118** | **+12** |
| **Relationships** — self-referencing, rendered | **0** | **1** | **CLOSED** (IFLOT hierarchy) |
| **PP-PI relationships** — stored statements | 181 | **194** | **+13** (14 rows repaired; one gains no second side because its counterpart is undocumented) |
| **PM relationships** — stored statements | 182 | 182 | unchanged — the PM parser was not touched |
| **Transactions** — registry / NEO pages | 1,817 / 1,817 | 1,817 / 1,817 | unchanged |
| **Books** | 11 | 11 | unchanged |
| **Chapters** | 135 | 135 | unchanged |
| **Subchapters (sections)** | 4,317 | 4,317 | unchanged |
| **Images (figures)** | 3,855 | 3,855 | unchanged |
| **Hebrew sections** | 4,314 | 4,314 | unchanged |
| **English sections** | 4,317 | 4,317 | unchanged |
| **Bilingual pairs** | 4,314 | 4,314 | unchanged |
| **Domains** — dataset / NEO pages | 39 / **0** | 39 / **39** | **CLOSED** |
| **S/4HANA pages** — NEO surfaces | **0** | **2** | **CLOSED** (`/neo/s4hana/`, `/neo/s4-readiness/`) |
| **Migration objects** — NEO surface | 24 / **none** | 24 / **`/neo/migration-cockpit/`** | **CLOSED** |
| **CDS links** — from NEO to legacy | 39 | **0** | **CLOSED** |
| **Fiori links** — from NEO to legacy | 20 | **0** | **CLOSED** |
| **PK/FK mappings** — correct | 0 of 77 | **77 of 77** | **CLOSED** |
| **NEO → legacy links, total** | **562** | **0** | **CLOSED** |
| **Enrichment** — reachable tables | **0 of 94** | **94 of 94** | **CLOSED** |
| **Orphan NEO routes** | 1 | **0** | **CLOSED** |

† The two route totals are the only **derived** numbers in this table — a full build of the
pre-repair tree was not re-run. The delta itself is measured: **+123 pages added** (81 object,
39 domain, 3 S/4 surfaces) **−1 removed** (`/neo/library/`) = **+122**, and the legacy side is
untouched. `crawl-dead-links` reports 7,802 rather than the 7,800 `index.html` files because it
also counts two non-`index.html` entry points. Everything else in the table is read directly
from `out/`.

---

## 2 · Every P0 · P1 · P2, one by one

### P0 — blockers

| # | Finding | BEFORE | AFTER | Status |
|---|---|---|---|---|
| **P0-1** | 81 of 186 object pages missing; 6 on no surface at all | NEO generated `tableNames()` = 105 | one shared registry (`object-names.ts`) = **186**; `LAGP LQUA LTAK LTAP VEKP VEPO` all reachable | **CLOSED** |
| **P0-2** | 39 domains with no NEO route | rail counted 39 and linked to `/neo/erd/` (tables) | `/neo/domain-model/` hub + **39** `/neo/domain/<slug>/`; count and destination now agree | **CLOSED** |
| **P0-3** | Migration Cockpit unreachable | 24 objects, 56 ECC refs, 49 tables — no NEO surface | `/neo/migration-cockpit/`, load sequence **derived** from `dependsOn`, 4 waves | **CLOSED** |
| **P0-4** | S/4HANA + readiness unreachable | 29 objects, 8 arch, 18 topics, 9+13+6 method — no NEO surface | `/neo/s4hana/` + `/neo/s4-readiness/`; readiness now computed at **build time**, not fetched | **CLOSED** |
| **P0-5** | `table-enrichment.ts` 125 KB unreachable | 0 of 94 tables reachable | section 05 "עומק טכני" on every object page; 94/94, sources printed | **CLOSED** |

### P1 — data and relationship correctness

| Finding | BEFORE | AFTER | Status |
|---|---|---|---|
| `extract-xlsx.mjs` parent/child bug | 14 PP-PI rows produced `parent === child`, dropped | both sides parsed from the JOIN statement; **0** false self-loops; parser now **throws** instead of guessing | **CLOSED** |
| Genuine self-relation invisible | IFLOT hierarchy rendered nowhere | `selfRelsFor()` + a section on the object page | **CLOSED** |
| 77 PK/FK semantic mapping | `=== "PK"` dropped all 83 `PK/FK` fields from both lists | one shared `key-role.ts` predicate, import-free so client and server share it | **CLOSED** |
| CDS links → legacy | 39 | 0 | **CLOSED** |
| Fiori links → legacy | 20 | 0 | **CLOSED** |
| ⌘K transaction / BAPI destinations → legacy | 1,817 + 145 resolved to `/tcode/`, `/bapi/` | all resolved through `ref-links`, the one NEO gate | **CLOSED** |
| Academy lesson cross-links → legacy | **562** links across PM / PP-PI / QM | 0 — translated at NEO's data layer, gated, content files untouched | **CLOSED** |
| `/neo/library/` placeholder (10 books vs the real 11) | built and linked from 9 places | not generated; all 9 links repointed to `/neo/books/` | **CLOSED** |
| Brand purge lost on regeneration | `node scripts/extract-xlsx.mjs` reinstated "CBC" | 9 neutralisation rules **in the generator** + a guard that fails the build on any survivor | **CLOSED** |

### P2 — content loss

| Finding | BEFORE | AFTER | Status |
|---|---|---|---|
| book7 duplicate section mapping | 20 section ids appear in two chapters; the id-keyed `Map` made both read the **same** body | keyed by chapter + id; **20 / 20 now serve distinct bodies** | **CLOSED** |

**Content parity against the original source** (`data/library/book7-full.json`):

| | |
|---|---:|
| Sections in source | 1,689 |
| Present in the migrated shards | **1,689** |
| Missing | **0** |
| Empty body | **0** |
| Duplicate ids | 20 |
| Identical bodies **before** (the defect) | **20** |
| Distinct bodies **after** | **20** |

**Correction to the first audit.** It estimated ~25,300 Hebrew + ~19,770 English characters
inaccessible. Measured properly, the two occurrences of a duplicated Fiori-app section share most
of their text; what was actually unreachable is the **difference** between them:
**+959 Hebrew and +1,750 Latin characters** of unique content, across 20 sections that were each
serving the wrong body. The earlier figure counted whole sections rather than the delta. The
defect and its fix are unchanged; the size estimate was wrong and is corrected here.

Corpus-wide, across all 11 books: only 4 shards changed, all `book7` — `ch1 ch3 ch4 ch7`.
Chapters, sections, figures, Hebrew, English and bilingual counts are all **unchanged**.

### Orphan route

`/neo/domain-model/` — investigated with evidence, per §5 of the brief.

**It was neither standalone nor a duplicate: it was an artefact.** `app/neo/[hub]` generated a
Stage-1 stub for every nav id, *including* ids that carried an `href` override pointing elsewhere.
So the stub existed at `/neo/domain-model/` while the rail's own link went to `/neo/erd/`.

**Verdict: A — connected to a navigation path**, and given the content its nav entry had always
been counting. The `href` field is now the single discriminator (`href` present ⇒ the item owns a
route file ⇒ excluded from `NEO_HUBS`), which removed the orphan and the `/neo/library/`
placeholder in the same change. **Nothing was deleted** — there was no file to delete.

---

## 3 · The one item flagged for you

**MB1A, and 15 sibling codes.** `data/lifecycle.ts` marks 17 transactions as removed in S/4HANA
(`s4: false`); 16 of them have a NEO page, and **all 16** render as available / legacy /
superseded. **Zero agreement.** Three coherent families: `MB*` → MIGO, `ME21/22/23` → `ME2*N`,
`XD01/XK01/FD01/FK01` → BP.

Full evidence, both claims quoted verbatim, routes affected, and what is needed to close it:
**`audit/repair/SOURCE_CONFLICT_MB1A.md`**

No dataset was edited, no winner was chosen, and no banner was added — because any wording for one
presumes an answer. Every other repair in this pass proceeded without it.

---

## 4 · What was deliberately not touched

Bilingual reader · 11 books · chapter structure · images · table data · transaction registry ·
validated ERD relationships · the visual system · the motion system · Books UI · PM and PP-PI
workspaces · NEO AI UI · existing routes · `/sap-infrastructure/`.

Verified rather than assumed: books, chapters, sections, figures, Hebrew, English and bilingual
counts are all identical before and after, and `data/sapData.pm.ts` has **zero** changed lines.
The only prose in the entire repository that changed is the 20 book7 sections that were serving
the wrong body.
