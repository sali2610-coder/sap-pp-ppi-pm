# SAP Library — Architecture & Implementation Plan

**Status:** DESIGN ONLY — not implemented. Approve before any code.
**Goal:** Transform large SAP books (PDF) into a searchable, offline, Hebrew (RTL) knowledge website,
integrated with Project NEO Cockpit.

---

## 0. Constraints (inherited, non-negotiable)

From `CLAUDE.md` / `AGENTS.md`:

- **100% offline at runtime.** No CDNs, no `next/font/google`, no remote assets. After build, `out/`
  fetches nothing external. Book images must be copied locally into the static output.
- **Static export only** (`output: 'export'`) — no Node runtime in production.
- **Generated data, never hand-edited.** Library content is produced by a pipeline and committed as
  generated artifacts, same discipline as `data/sapData.ts`.
- Stack: Next.js 16 App Router · React 19 · TS · Tailwind v4 (CSS config) · Radix + shadcn-style UI ·
  lucide-react · RTL Hebrew · brand red `#d62027`. Footer credit (Sali Halif) on every page.
- Rendering: `react-markdown` + `remark-gfm` already present → render generated Markdown directly.
- Translation may call Gemini (`@google/generative-ai`) **at build time only** (network allowed during
  build; never at runtime).

**Corollary:** two phases with different network rules —
*Build pipeline* (online OK: OCR, Gemini translation) → *Site* (offline, static).

---

## 1. Top-level layout

```
sap/
  books/                         # (1) INPUT — uploaded source PDFs (gitignored if large)
    <book-slug>.pdf
    books.manifest.json          # registry: slug, title, module, sha256, page count, status

  processing/                    # (2) INTERMEDIATE — pipeline working area (gitignored)
    <book-slug>/
      raw/                       # pdftoppm page images, pdfinfo
      ocr/                       # ocr.txt + per-page text (scanned books)
      text/                      # chunk_*.txt + manifest.json  (extract_text.py output)
      images/                    # extracted figures, page-anchored: p0042-img01.png
      extracted/                 # entities.jsonl, chapters.json, glossary.partial.json
      translated/                # he/chapter-NN.md  (Hebrew, SAP codes verbatim)
      report.json                # per-book pipeline status + counts + warnings

  knowledge/                     # (3) CANONICAL knowledge package (committed, generated)
    specs/ runbooks/ lessons/ patterns/ glossary/ incidents/
    glossary/_global.json        # merged cross-book glossary (source of cross-links)
    index/objects.json           # SAP object -> [occurrences across books/chapters]

  content/library/               # (3b) WEBSITE-READY Markdown (committed, generated)
    <module>/<book-slug>/
      _book.json                 # book meta + chapter TOC + module
      chapter-01.he.md           # frontmatter + Hebrew body + local image refs + cross-links
      chapter-02.he.md
      glossary.he.md
    _index.json                  # full library catalog (modules -> books -> chapters)
    search/index.json            # prebuilt offline search index (MiniSearch)

  app/(or src)/library/          # (4) WEBSITE — Next.js routes (static export)
    layout.tsx                   # RTL shell, brand, footer credit
    page.tsx                     # library home: module grid PM/PP/PP-PI/QM/MM/SD/FI
    [module]/page.tsx            # module landing: book list
    [module]/[book]/page.tsx     # book TOC
    [module]/[book]/[chapter]/page.tsx   # chapter reader (react-markdown)
    glossary/page.tsx            # global bilingual glossary + filter
    search/page.tsx              # offline client search (MiniSearch)

  scripts/library/               # pipeline (build-time, Node + shells reuse skills)
    01-ingest.mjs 02-extract.mjs 03-translate.mjs 04-knowledge.mjs
    05-website.mjs 06-search-index.mjs  build-library.mjs (orchestrator)

  public/library/images/<book-slug>/   # (offline) copied chapter images for static serve
```

`website/` from the brief maps to **`content/library/<module>/`** (generated MD) +
**`app/library/`** (the 7-module routed site). Modules: **PM · PP · PP-PI · QM · MM · SD · FI**.

---

## 2. Data flow (pipeline stages)

```
books/*.pdf
  │  01 ingest      → triage (pdf_triage.py): scanned? pages? module guess; register in manifest
  ▼
processing/<slug>/text  (+ ocr/ if scanned via ocr_pdf.sh, heb+eng)
  │  02 extract     → extract_text.py chunks; chapter detection; image extraction; SAP entities
  ▼
processing/<slug>/extracted  (chapters.json, entities.jsonl, glossary.partial.json, images/)
  │  03 translate   → Gemini build-time; prose→Hebrew, SAP codes VERBATIM; per chapter
  ▼
processing/<slug>/translated/he/chapter-NN.md
  │  04 knowledge   → synthesize specs/runbooks/lessons/patterns/incidents (sap-knowledge-builder
  │                   workflow + write_package.py); merge global glossary; build objects.json
  ▼
knowledge/**  +  knowledge/glossary/_global.json  +  knowledge/index/objects.json
  │  05 website     → emit content/library/<module>/<slug>/chapter-NN.he.md with frontmatter,
  │                   local image paths, resolved cross-links; copy images → public/library/images
  ▼
content/library/**  +  public/library/images/**
  │  06 search-index→ MiniSearch over chapters+glossary → content/library/search/index.json
  ▼
next build (output:export) → out/   (fully offline)
```

Reuses existing skills (no duplication):
- `sap-document-intelligence`: `pdf_triage.py`, `ocr_pdf.sh`, `pdf_chunk_extract.py`, taxonomy, Hebrew rules.
- `sap-knowledge-builder`: `extract_text.py`, `write_package.py`, `knowledge_workflow.template.js`.

---

## 3. Key designs

### 3.1 Module classification (PM/PP/PP-PI/QM/MM/SD/FI)
Each book → one primary module + optional secondary tags. Decide by, in order:
1. Manual override in `books.manifest.json` (`module` field).
2. Title heuristic ("Plant Maintenance"→PM, "Production Planning"→PP, "...Process Industries"→PP-PI,
   "Quality Management"→QM, "Materials"→MM, "Sales and Distribution"→SD, "Financial"→FI).
3. Entity-frequency vote from extracted tcodes/tables (e.g. IW3*/EQUI→PM, COR*/AFKO→PP-PI).
Unresolved → `_unsorted`, flagged in report for manual assignment. **No silent misfiling.**

### 3.2 Chapter extraction
- Prefer the PDF outline/bookmarks (pypdf `reader.outline`) → exact chapter ranges.
- Fallback: heading-pattern detection over chunk text ("Chapter N", numbered H1).
- Each chapter = page range → its own translated MD file. Long chapters sub-chunked for translation,
  reassembled in order.

### 3.3 Image preservation (offline-safe)
- Extract figures with `pdfimages`/`pdftoppm` (poppler) → `processing/<slug>/images/pNNNN-imgMM.png`,
  page-anchored. Optional caption capture from nearby text.
- Stage 05 copies referenced images → `public/library/images/<slug>/` and rewrites MD to
  `![caption](/library/images/<slug>/pNNNN-imgMM.png)`. Verified present in `out/` post-build.
- No remote image URLs ever emitted (offline gate, see §5 acceptance).

### 3.4 Hebrew translation
- Build-time Gemini. Translate prose only. **Never translate** tcodes, tables, programs, ABAP objects,
  IDOC/BAPI/FM names, Z-objects, field/domain names, Fiori app IDs — enforced by a protect-list mask
  (tokenize SAP identifiers → placeholders → translate → restore).
- Output `dir="rtl"` Markdown. Cache translations by `sha256(sourceChunk)` in
  `processing/<slug>/translated/.cache/` → idempotent, cheap re-runs.

### 3.5 Glossary + cross-links
- Per book → `glossary.partial.json` (object, type, Hebrew explanation, first occurrence).
- Merge → `knowledge/glossary/_global.json` (dedupe by object; keep best/longest explanation; list
  all books/chapters where seen).
- `knowledge/index/objects.json`: `SAP object → [{book, module, chapter, anchor}]`.
- Stage 05 cross-links: every SAP identifier in chapter MD → link to glossary entry + "appears in"
  back-references. Bidirectional. Renders as in-text links + a per-chapter "Related objects" box.

### 3.6 Offline search
- Build-time `MiniSearch` index (npm dep, bundled — no CDN) over {chapter title, Hebrew body, SAP
  objects, module, book}. Serialized to `content/library/search/index.json`.
- `search/page.tsx` loads JSON, runs MiniSearch client-side. Hebrew tokenization: store both Hebrew
  and verbatim SAP tokens; SAP codes are searchable exactly.

### 3.7 Website pages (frontmatter contract)
```yaml
---
title: "<chapter title>"
titleHe: "<כותרת>"
module: "PM"
book: "<book-slug>"
chapter: 7
pages: [120, 138]
objects: ["IW32","AFRU","LOIPRO"]
images: ["/library/images/<slug>/p0123-img01.png"]
source: "<book filename> pp.120-138"
---
```
Routes statically generated via `generateStaticParams` from `content/library/_index.json`.
Reader renders `react-markdown` + `remark-gfm`, RTL, brand, mandatory footer credit.

---

## 4. Implementation plan (phased — do AFTER approval)

| Phase | Deliverable | Key files | Reuses | Exit check |
|------|-------------|-----------|--------|-----------|
| **P0 Scaffold** | dirs, `books.manifest.json` schema, `.gitignore` (books/processing), orchestrator stub | `scripts/library/build-library.mjs` | — | empty pipeline runs, prints plan |
| **P1 Ingest** | triage + manifest registration + module guess | `01-ingest.mjs` | `pdf_triage.py` | one book → manifest row w/ status |
| **P2 Extract** | text chunks + chapters + images + entities | `02-extract.mjs` | `extract_text.py`, poppler | chapters.json + images for 1 book |
| **P3 Translate** | Hebrew chapter MD, protect-list, cache | `03-translate.mjs` | Gemini, SAP rules | SAP codes verbatim in output (assert) |
| **P4 Knowledge** | specs/runbooks/lessons/patterns/incidents + global glossary + objects index | `04-knowledge.mjs` | `knowledge_workflow.template.js`, `write_package.py` | 7 artifact types + `_global.json` |
| **P5 Website MD** | `content/library/**` + image copy to `public/` + cross-links | `05-website.mjs` | objects.json | chapter MD with links + local images |
| **P6 Search** | MiniSearch index | `06-search-index.mjs` | MiniSearch (npm) | query returns chapter hits offline |
| **P7 UI** | `app/library/**` routes, module grid, reader, glossary, search | Next pages | react-markdown | `next build` static; nav works |
| **P8 Offline gate** | post-build verifier: no external URLs/fonts in `out/library` | `scripts/library/verify-offline.mjs` | — | zero remote refs; CI fail on drift |

Milestone slices: **M1** = P0–P3 (one book → Hebrew MD). **M2** = P4–P6 (knowledge + searchable
content). **M3** = P7–P8 (site live, offline-verified). Validate end-to-end on ONE book (PM business
user guide) before batch-processing all of `docs/`.

---

## 5. Risks & acceptance

**Risks**
- Scanned books → slow OCR (linear); mitigate: background + chunk, cache OCR.
- Gemini cost/rate on 1000+ pages; mitigate: chunk + sha256 cache + batch.
- Hebrew RTL + embedded LTR SAP codes rendering; mitigate: bidi-isolated spans, protect-list.
- Image extraction noise (logos, page furniture); mitigate: size/aspect filter + caption heuristic.
- Module misclassification; mitigate: manifest override + `_unsorted` + report flag.
- Static-export route explosion (many chapters); acceptable — all prebuilt, no runtime.

**Acceptance criteria**
1. Each book → chapters, Hebrew MD, preserved images, glossary, cross-links, website pages.
2. Every SAP identifier verbatim through OCR→translate→site.
3. `out/library` has **zero** external fetches (offline gate passes).
4. Search returns correct chapters for Hebrew terms AND exact SAP codes.
5. Footer credit + RTL + brand on every page.
6. Pipeline idempotent & re-runnable; regenerates, never hand-edited.

---

## 6. Open decisions (need answer before P0)

1. **Integrate into existing app** (routes under current Next app, shared nav) **or separate sub-app**?
   Recommend: integrate — one offline `out/`, shared brand/footer/status store.
2. Commit generated `content/library/**` + images, or generate in CI only? (Affects repo size.)
3. Translation engine: Gemini (have key) vs other? Confirm build-time network is acceptable.
4. MM / SD / FI: no source books yet in `docs/` — placeholder modules or hide until populated?
5. Books with restricted/copyright content — confirm allowed to process & store derived Hebrew text.
