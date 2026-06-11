# Benchmark — knowledge-library-builder (iteration 1, eval-0)

Prompt: index a folder of 3 SAP module notes (+curated glossary) into catalog, search index, glossary,
cross-references, knowledge graph, and course modules.

| Config | Pass rate | Character |
|--------|-----------|-----------|
| with_skill | 5/5 | one deterministic pipeline; stable documented schema; 0-dangling graph |
| without_skill | 3/5 | rich one-off build (TF-IDF, 19 terms) but ad-hoc schema, determinism unverified |

## Discriminating findings
- **Determinism:** the skill rebuilds byte-identical across hash seeds (a bug found during validation —
  set-iteration order — was fixed by sorting). A library you regenerate as documents change needs this;
  the baseline's bespoke code makes no such guarantee.
- **Stable schema:** the skill always emits the same filenames/shape (`index.json`, `graph.json`,
  `xref.json`, `catalog.json` …) documented in output-spec.md, so downstream tooling can rely on it.
  The baseline invented its own names (`search-index.json`, `knowledge-graph.json`, `cross-references.json`
  placed under `library/`) — fine once, but a moving target across runs/users.
- **Non-discriminating (small clean corpus):** both produced a working cross-doc search (BKPF → all 3),
  a sensible glossary, and an integration-aware graph. A capable model can do this one-off; the skill's
  value is consistency, determinism, and zero reinvention at scale, not raw capability on 3 short docs.
