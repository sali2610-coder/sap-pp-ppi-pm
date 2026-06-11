---
name: knowledge-library-builder
description: >
  Build a searchable knowledge library from a folder of books, PDFs, course material, or notes.
  Indexes every document, builds a search catalog and an offline search index, extracts a glossary,
  cross-references concepts across documents, assembles a knowledge graph, and groups documents into
  course modules. Use this skill whenever the user has multiple sources and wants them organized,
  searchable, or connected — "index these books / PDFs", "build a search catalog", "make a glossary
  across all my docs", "cross-reference these manuals", "build a knowledge graph from my library",
  "turn this folder of readings into a course", or "I have a pile of documents, help me find my way
  around them". Triggers for SAP books, university course material, and technical manuals alike, even
  when the user names only one piece (e.g. just "a glossary" or just "a search index") — run the
  pipeline and emit what they asked for.
license: MIT
---

# Knowledge Library Builder

Turn a heap of documents into a navigable library. The point is **connection at the corpus level**:
not one summary, but a catalog, a working search index, a shared glossary, cross-references showing
where each concept lives, a graph of how documents and concepts relate, and a suggested course
structure. Everything is derived mechanically from the sources, so it stays faithful and reproducible.

## One command does the whole pipeline

Most of this work is deterministic indexing — better done by a script than re-derived each time. Run:

```bash
python3 scripts/build_library.py <sources_dir> <out_dir> --title "My Library"
```

It discovers `.md/.txt/.pdf/.docx/.pptx` (PDF/DOCX/PPTX via `ingest.py`/markitdown), then writes the
five outputs below and prints a JSON summary (doc count, term count, graph size, modules). Read
[references/output-spec.md](references/output-spec.md) for the exact schema of every file.

## The five outputs

| Folder | Files | What it is |
|--------|-------|------------|
| `library/` | `catalog.json` · `catalog.md` | Every document indexed: id, title, file, sections, word count. |
| `search-index/` | `index.json` · `search.py` · `stats.json` | Offline inverted index + a query CLI: `python3 search.py "term"` ranks docs. |
| `glossary/` | `glossary.json` · `glossary.md` | Terms with definitions. Curated if you supply `glossary_terms.json`; else auto-extracted candidates. |
| `knowledge-graph/` | `graph.json` · `graph.mmd` · `graph.dot` · `xref.json` · `xref.md` | Nodes = docs + concepts; edges = mentions + co-occurrence. Plus the cross-reference. |
| `courses/` | `courses.json` · `courses.md` | Documents clustered into modules by shared concepts, with each module's key concepts. |

## Two ways to run it

1. **Just run the script** — for a quick, faithful, mechanical build. This is the default and is
   enough for "index these and give me a search index / catalog / graph".
2. **Script then curate** — run the script, then improve the parts that benefit from judgment:
   - **Glossary:** auto-extraction finds *candidate* terms (acronyms, codes like `VA01`, capitalized
     terms). For a real glossary, write proper definitions into a `glossary_terms.json`
     (`{"term": "definition", ...}`) in the sources folder and re-run — the script will use yours and
     the cross-reference + graph will key off those exact terms. This is the single highest-leverage
     curation step, because the glossary drives the xref and the graph.
   - **Courses:** the script clusters by shared concepts; reorder modules into a sensible learning
     sequence and add a one-line rationale per module if the user wants a real syllabus.

Curate only what the user asked to be good. A "search index" request needs no glossary polish; a
"glossary across my books" request does.

## How it works (so you can explain or adjust it)

- **Indexing**: each doc gets a stable id (`D1-<slug>`), its `# H1` becomes the title, `##/###`
  headings become sections. Tokens are lowercased alphanumerics minus stopwords.
- **Search index**: an inverted index `term -> {docId: frequency}`; `search.py` sums frequencies across
  query terms to rank docs. Fully offline, no dependencies.
- **Glossary → xref → graph** are chained: the glossary's terms are what the cross-reference looks for
  and what becomes the concept nodes in the graph. Garbage terms → noisy graph, which is why curating
  the glossary matters most.
- **Graph**: doc→term `mentions` edges and term↔term `co_occurs` edges (weighted by shared docs).
  Render `graph.mmd` with the `mermaid-diagrams` skill or `graph.dot` with Graphviz if a picture helps.
- **Courses**: union-find over docs sharing ≥1 glossary term → connected modules; key concepts are the
  terms common to a module.

## Validation checklist

```
□ Every source document appears in library/catalog.json (count matches files in)
□ search-index/index.json non-empty; `python3 search-index/search.py "<a real term>"` returns the right doc
□ glossary terms are real (curated) or sensible candidates (auto); no empty definitions
□ knowledge-graph/graph.json: every edge's src/dst is a real node id; mentions edges match the xref
□ xref: each listed term actually occurs in the named documents
□ courses: every document lands in exactly one module
□ Re-running on the same sources reproduces identical outputs (deterministic)
```

See [references/output-spec.md](references/output-spec.md) for file schemas and a worked sample.
