# Project NEO — pre-production zero-loss migration audit

**Verdict: NO-GO.** Five P0 findings. Details in `22_GO_NO_GO.md`.

Audit only. No application code, data or config was modified. `git status`
shows the untracked `audit/` directory and nothing else.

## The structural fact that shapes everything below

OLD and NEW live in **one repository and read one dataset**. 153 OLD routes
under `app/*`, 36 NEO routes under `app/neo/*`, both importing the same `data/`
and `lib/` modules. Data cannot be lost at the data layer; it can only fail to
be **surfaced**. Every finding here is a surfacing failure, not a deletion.

Method: walk the import graph from all 189 route pages. 354 data/lib modules are
reachable from OLD, 252 from NEO, 248 from both, **106 from OLD only** — the
candidate-loss set that drove the rest of the audit.

## Scope actually measured

| | checked |
|---|---|
| routes mapped | **153 / 153** |
| tables | **105** |
| fields | **517** |
| ER relations | **126** |
| objects | **186** |
| transactions | **1,849** |
| books | **11** |
| chapters | **135** |
| sections | **4,314** (one by one, not sampled) |
| figures | **3,855** inventoried · 835 verified on screen |
| bilingual sections | **4,043** |
| orphan data modules | **32** |

## Fully preserved — proven, not assumed

- **Bilingual content: 4,043 / 4,043 sections still serve both English and
  Hebrew. 0 English lost, 0 English replaced by Hebrew, 0 Hebrew lost.** This was
  the single largest NO-GO risk and it is clear. book8 (`format: "academy"`)
  verified on its own schema: 3,708 facets + 886 ref blocks in, same out.
- Chapters 135/135. Figures 3,855/3,855, all assets on disk, 0 orphans,
  0 duplicates, 0 in a trailing gallery. Sections 4,314 → **4,317** (book7 ch12
  was *recovered* from raw text, a net gain).
- All 105 dictionary tables have a `/neo/tables/[name]` page.
- All 106 dictionary edges render on `/neo/erd` **and** `/neo/studio`.
- The 21.7MB `book*-full.json` / `book*-figures.json` set reads as "OLD only" but
  is the **pipeline source**: `prebuild` converts it into `data/books/**` and
  `public/books/**`. Verified content-identical. **Not a loss** — recorded so it
  is never mistaken for one.
- The 11 legacy "Center" routes are migrated to `/neo/centers/` with an 89-item
  structural parity check, zero content loss.

## P0 — blocking

1. **81 of 186 object pages have no NEO equivalent.** NEO's `generateStaticParams`
   is `tableNames()` only; OLD adds `HR_BW_NAMES` (65) + `verifiedNames()` (16).
   75 survive as ERD nodes without a detail page; **6 appear on no NEO surface at
   all**: `LAGP LQUA LTAK LTAP VEKP VEPO`.
2. **`/domain/[slug]` — 39 domain pages have no NEO route.** `DOMAINS` is used in
   NEO only to print a count on the rail.
3. **`/migration-cockpit` unreachable** — 24 migration objects, 56 ECC tables.
4. **`/s4hana`, `/s4-readiness` unreachable** — `s4-objects` (29), `s4-architecture`
   (8), `s4-transformation` (9+13+6). On an S/4HANA-first platform this is the
   most consequential category.
5. **`data/table-enrichment.ts` (125KB) unreachable** — ABAP, SQL, index,
   performance and debug notes for 94 tables.

## P1 — important

- 14 PP-PI ER relations invisible in **both** builds. `scripts/extract-xlsx.mjs`
  takes the child from column 1 and the parent from the JOIN token; in 14 of 65
  rows column 1 *is* the JOIN token, so parent === child and a self-reference is
  stored. Root cause is the generator, not NEO. OLD at least draws a corrupt
  self-loop; NEO draws nothing.
- 32 transaction codes referenced by object pages have no
  `/neo/transactions/[code]` destination.
- 77 `PK/FK` fields lose their key role on `/neo/object/[name]`: `model.nodes()`
  matches `key === "PK"` strictly, so the combined value lands in neither list.
  `/neo/tables/[name]` uses `includes()` and is correct.
- The ⌘K palette links all 39 CDS views and 20 Fiori apps to **OLD** routes,
  dropping the reader out of the NEO shell even though NEO pages exist.
- `/neo/library/` is a Stage-1 placeholder showing **10 books**, linked from 6
  places — including a Home button that prints **11**.
- 22 orphan data modules carry real SAP content with no NEO surface (sap-notes,
  security, authorizations, learn/paths, workbenches, qa-center, mrp-center,
  ecc-s4, solutions, processes, domain-model, pppi-config-tree, interview Q&A,
  process-data, 2 story flows and more).

## A live source conflict, found while auditing

`data/lifecycle.ts` marks **MB1A as removed in S/4HANA**; NEO renders it as
"available, legacy". Two datasets disagree about a validated SAP fact. This is
not a migration loss — it predates NEO — but it must be resolved by a human with
SAP knowledge, not by a script picking a winner.

## P2 — quality

- **book7: 20 duplicate section ids collapse to one variant.**
  `scripts/migrate-books.mjs` keys its body map by section id alone, so the same
  Fiori app id under two categories overwrites itself. All 20 differ in *both*
  languages in source; **45,070 characters (25,300 EN + 19,770 HE) unreachable.**
- English paragraph breaks stripped corpus-wide, upstream of `-full.json`: `en`
  has 0 newlines in all 11 books, `he` has 29,618. No words lost. Production has
  the same condition — not a NEO regression.
- Column-width control inert in the default bilingual view at 1440px.
- Reading position not shared between `/library/` and `/neo/read/`.
- Personal book notes absent in NEO.
- 5 fields unreachable on any detail page (`AUFK.IDAT2/ERDAT`,
  `QMEL.AUSVN/AUSBS/AUSZT`) — OLD has the same gap.

## Orphans

Exactly one NEO route is unreachable from any link: **`/neo/domain-model/`**
(HTTP 200, zero inbound references).

## Files

`02_ROUTE_PARITY.md` · `04_OBJECT_PARITY.csv` · `05_TABLE_PARITY.csv` ·
`06_FIELD_PARITY.csv` · `07_RELATIONSHIP_PARITY.csv` ·
`08_TRANSACTION_PARITY.csv` · `10_BOOKS_PARITY.csv` · `11_READER_PARITY.md` ·
`15_NAVIGATION_PARITY.md` · `21_MISSING_ITEMS.md` · `22_GO_NO_GO.md` ·
`audit-summary.json`
