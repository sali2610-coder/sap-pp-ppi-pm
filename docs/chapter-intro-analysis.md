# Chapter introductions — analysis, no change made

**Status: NOT FIXED. Awaiting a decision.** Nothing in `data/` was modified for
this. It is documented and preserved exactly as found, per instruction.

---

## What it is

Every chapter in the SAP PRESS sources opens with an introductory passage
before its first numbered section — the author telling you what the chapter
covers. The section extractor starts at the first numbered heading (`9.1`,
`12.1`, …), so that passage has no section id, and everything downstream is
keyed by section id. It is therefore never carried into the active
representation and never reaches the reader.

This is **not** duplication. The text exists exactly once, in
`data/library/book{N}/raw/ch{n}.json`. It is simply not represented in
`data/books/**` or `public/books/**` at all.

## Scale, measured

| | |
|---|---|
| chapters examined | 125 |
| chapters with a real intro that is not carried | **103** |
| books affected | **9** — book1, 2, 3, 4, 5, 6, 7, 9, 10 |
| characters not carried | **190,987** |

Not affected: **book8** (academy schema — its facets carry chapter framing
already) and **book11**.

Measurement excluded page furniture (bare page numbers, `Chapter N` lines) and
the chapter title line itself, so 190,987 is prose, not scan artefacts.

## Examples

| book | ch | chapter | chars | opening words |
|---|---|---|---|---|
| book1 | 1 | SAP Projects in Plant Maintenance | 939 | "This chapter provides a roadmap for your plant maintenance project by …" |
| book1 | 5 | Configuring the Work Order Cycle | 2,897 | "This chapter introduces you to the Customizing functions that will ena…" |
| book1 | 9 | Usability | 1,295 | "Although there are enduring prejudices in terms of usability not being…" |
| book2 | 3 | Discrete Manufacturing Configuration | 2,970 | "Implementing discrete manufacturing, also known as shop floor control…" |
| book3 | — | — | — | same pattern throughout |

## Source format vs migrated format

**Source** — `data/library/book1/raw/ch9.json`

    623
    Chapter 9
    Usability
    Although there are enduring prejudices in terms of usability not being a
    major feature of the SAP system, this chapter shows a variety of
    customer options for how to substantially improve SAP's usability.
    ...
    9.1 Options at the User's Disposal
    Let's start with the easiest options to implement, ...

**Migrated** — `data/books/book1.json` + `public/books/book1/ch9.json`

    chapter 9 "Usability"
      section 9.1  "Options at the User's Disposal"   <- extraction starts here
      section 9.1.1 …

Everything above `9.1` is dropped. Verified: the phrase "enduring prejudices"
appears in the raw source and appears **nowhere** in the active representation.

## Is the information truly lost?

**Lost from the application, yes. Lost from the project, no.** Every character
is still in `data/library/**`, which is frozen and intact. This is a rendering
gap, not data destruction — which is why it is safe to leave until decided.

## Recommended migration rule

Carry the intro as a chapter-level field, not as a fake section:

    chapter = { n, title, intro?: { en, he }, sections: [...] }

- `intro` is populated only when prose exists above the first numbered heading,
  after removing bare page numbers, `Chapter N` lines and the title line.
- It is a NEW optional field, so nothing that reads `sections` changes.
- The reader renders it under the chapter heading, before section 1.

Rejected alternative: inventing a section id such as `9.0`. That would put a
heading in the table of contents that the book does not have, change section
counts on every surface, and alter deep links.

## Risk

| | |
|---|---|
| **Data risk** | Low. Additive field; `data/library/**` untouched; regenerable from raw. |
| **Count risk** | None if `intro` is a chapter field. High if it becomes a section — 103 new section ids would move every section total, progress percentage and parity number in the product. |
| **AI risk** | The retrieval tree is keyed by section id. A chapter-level field is invisible to it unless deliberately indexed — needs its own decision. |
| **Furniture risk** | Real. Intros sit next to page numbers and running headers. The rule must strip them, and stripping is the one place this could silently alter text. Needs a diff review on a sample before it runs across 103 chapters. |
| **Hebrew** | None of these intros has a translation. `intro.he` would be `""` for all 103. |

## Before / after

**Before** — reader opens chapter 9 straight into `9.1`:

    Usability
    9.1 Options at the User's Disposal
    Let's start with the easiest options to implement, ...

**After**:

    Usability
    Although there are enduring prejudices in terms of usability not being a
    major feature of the SAP system, this chapter shows a variety of customer
    options for how to substantially improve SAP's usability.

    9.1 Options at the User's Disposal
    Let's start with the easiest options to implement, ...

---

## Decision needed

1. Carry the intros, as a chapter-level `intro` field? (recommended)
2. Leave as is — 190,987 characters stay out of the reader?
3. Something else — e.g. carry them but keep them out of the AI index?

No book data will be touched until this is answered.
