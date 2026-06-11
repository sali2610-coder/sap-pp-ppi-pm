# SAP Module Notes — Knowledge Library

Built from `sources/` (sap_sd_basics.md, sap_mm_basics.md, sap_fi_basics.md, glossary_terms.json).

## Layout
- `library/catalog.json` — every doc cataloged: title, module, sections, transactions, tables, word count, path.
- `library/cross-references.json` — shared-term cross-links, document-pair overlaps, and SD↔MM↔FI integration flows.
- `search-index/search-index.json` — offline inverted index + TF-IDF over 8 section-level records.
- `search-index/query.py` — query the index: `python3 query.py BKPF`.
- `glossary/glossary.json` — 19 terms (10 seed + 9 auto-extracted), each with category and the docs it appears in.
- `glossary/glossary.md` — human-readable glossary.
- `knowledge-graph/knowledge-graph.json` — 25 nodes / 42 edges: modules, documents, transactions, tables, with `writes`/`posts`/`mentions`/`integrates_with` relations.
- `courses/courses.json` — 3 sequenced course modules (SD → MM → FI) with objectives, prerequisites, and a capstone.

## Search demo
`python3 search-index/query.py BKPF` returns 3 hits — SD Billing, MM Invoice Verification, FI Documents — proving the term is indexed across all three documents.

Generated 2026-06-11.
