# Library parity — working checkpoint

Branch `design/neo-concept-d`. Written so the next session resumes from here and
does **not** repeat the audit.

Status: **audit complete, implementation not started.**

---

## 1. The two registries, and what each actually is

| | old / canonical | new / NEO |
|---|---|---|
| spine + prose | `data/library/book{N}-full.json` | `data/books/{N}.json` (spine) + `public/books/{id}/ch{n}.json` (prose shards) |
| figures | `data/library/book{N}-figures.json` | `public/books/{id}/fig{n}.json` |
| ids | `book1..book11` **and** slug ids in `data/library.ts` | `book1..book11` |
| routes | `app/library/book{N}/` (11, FROZEN) | `app/neo/read/[bookId]/`, `app/neo/books/[bookId]/` |

`app/library/**` and `data/library/**` are the reference and stay **frozen**.

---

## 2. Source-of-truth baseline (measured, not assumed)

`data/library/` holds all 11 books with full prose.

| book | ch | sections | Hebrew body | figures |
|---|---|---|---|---|
| book1 | 9 | 140 | 100% | 521 |
| book2 | 15 | 496 | 100% | 861 |
| book3 | 18 | 374 | 100% | 495 |
| book4 | 11 | 195 | 100% | 486 |
| book5 | 20 | 502 | 100% | 835 |
| book6 | 10 | 88 | 100% | 657 |
| book7 | 12 | 1689 | 100% | 0 |
| book8 | 10 | 271 | n/a — different schema, see §4 | none |
| book9 | 10 | 271 | 100% | none |
| book10 | 11 | 211 | 100% | none |
| book11 | 9 | 77 | 100% | none |

**135 chapters · 4,314 sections · 3,855 figures.**

---

## 3. The 135 vs 134 gap — RESOLVED, fix not yet applied

    book7 · chapter 12 · "Additional Resources"
      present in  data/library/book7-full.json
      missing in  data/books/book7.json

Every other book matches exactly. One chapter, one book. Fix is to carry that
chapter into the NEO spine — do not regenerate book7.

---

## 4. book8 vs book9 — RESOLVED. NOT a duplicate. Do not delete either.

Both describe the same source work and share **271/271 identical section ids**
and identical section titles. They are two different EDITIONS:

**book9 — the translation edition**

    section = { id, title, en, he }

Raw English source plus its Hebrew translation. This is what the bilingual
Reader renders.

**book8 — the consultant edition**

    section = { id, titleHe, titleEn, execHe, beginnerHe, consultantHe,
                purposeHe, processExampleHe, scenarioHe, navHe,
                tables[], tcodes[], fiori[], configHe, flow[],
                mistakesHe, troubleshootHe, bestPracticeHe,
                interviewHe[], takeawaysHe[], relatedHe[], depth }

Three audience levels, real SAP objects (VIQMEL, AUFK, EQUI, IFLOT), real
transactions (IW21, IW31, IL01, IE01), real Fiori ids (F2913, F4072, F2929),
process flows with T-codes, common mistakes, troubleshooting, best practice and
interview Q&A.

**This is the richest content in the library.** An earlier pass nearly
recommended deleting it, on the strength of a `he: 0%` measurement — a field
book8's schema does not have. The measurement was reading the wrong shape.

Correct architecture: **merge at render time, keyed by section id.** book9
supplies the bilingual prose, book8 supplies the consultant layer for the same
section. Do not deduplicate, do not migrate one into the other's schema.

Open question for the owner: should the consultant layer appear for the PM
Business User Guide only (where it exists), or is it a pattern intended for
other books later? That changes whether it is a book or a layer.

---

## 5. Reader pipelines — what is already equal, what is not

Measured live on `/neo/read/book1/`:

- bilingual: **already works** — 22,368 Hebrew chars + 71,160 Latin chars visible together
- inline figures: **already works** — 11 `<figure>` + 11 `<img>` in the flow
- progress: **already works** — reports 2%
- figure caption / source: **MISSING** — `איור N.N` and `Source p.NN` do not render,
  while the old reader shows both plus a download link

Bilingual pairing logic and the figure page-band placement algorithm are
**already near-identical** in both readers (same grid, same spine, same
proportional mapping). There is nothing to "restore" there.

The real divergence is **navigation**: old = inline collapsible chapter tree,
NEO = modal panel.

---

## 6. Remaining work, in order

1. **P0** carry `book7` chapter 12 into the NEO spine
2. figure caption + source + download in the NEO reader (§4 / §7 of the brief)
3. chapter→subchapter navigator: sticky, collapsible, active-state, prev/next
   (§5 / §8) — replaces reliance on the modal
4. book8 consultant layer surfaced somewhere (currently invisible in NEO)
5. the 55 visual checks: 11 books × {shelf, hub, reader open, mid chapter,
   late chapter} — **none done yet**
6. full parity matrix with PASS / PARTIAL / FAIL / VERIFIED NONE per book

## 7. Verify, do not assume

- book7 reports 0 figures and book8–11 have no figures file. Plausible
  (book7 is a quick reference) but **unverified** — check the rendered old
  library before recording VERIFIED NONE.
- `data/library.ts` LIBRARY (10 slug entries) is a third index, separate from
  both spines. It drives `/neo/library/`, nav counts and search.

## 8. Rules that held all session

- `app/library/**`, `app/sap-infrastructure/**`, `public/sap-infrastructure/**`,
  `lib/s4.ts`, `lib/knowledge-graph.ts` and `data/**` are frozen. Diff against
  main is empty and must stay empty.
- No SAP content invented, rewritten or deleted.
- Preview only. main not merged.
