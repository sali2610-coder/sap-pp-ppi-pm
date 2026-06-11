# Output Spec — file schemas

All paths relative to `<out_dir>`. JSON is UTF-8, 2-space indent (index.json is compact).

## library/
**catalog.json** — array of documents:
```json
[{"id":"D1-sap-sd","title":"SAP SD Basics","file":"sap_sd.md","sections":["Sales Orders","Delivery"],"words":782}]
```
**catalog.md** — human-readable index (one section per doc with file, word count, sections).

## search-index/
**index.json** — inverted index `term -> {docId: frequency}`:
```json
{"order":{"D1-sap-sd":4},"delivery":{"D1-sap-sd":3,"D2-mm":1}}
```
**stats.json** — `{documents, unique_terms, total_tokens, top_terms:[[term,count],...]}`.
**search.py** — offline query CLI: `python3 search.py "sales order"` → docIds ranked by summed term
frequency. No dependencies.

## glossary/
**glossary.json** — `{term: {"definition": str, "source": "curated"|"auto"}}`.
- `curated` when a `glossary_terms.json` is present in the sources folder (recommended).
- `auto` candidates = acronyms / code-like tokens (`VA01`, `VBAK`, `BAPI`) with a context snippet.
**glossary.md** — alphabetical `**term** — definition`.

## knowledge-graph/
**graph.json** — `{"nodes":[{id,type:"doc"|"term",label}], "edges":[{src,dst,rel,weight?}]}`
- `rel:"mentions"` doc→term; `rel:"co_occurs"` term↔term (weight = # shared docs).
**graph.mmd** — Mermaid `graph LR`; render with the `mermaid-diagrams` skill.
**graph.dot** — Graphviz; render with `dot -Tsvg graph.dot`.
**xref.json** — `{term: [{doc, title, sections, count}]}` (the cross-reference).
**xref.md** — `**term** → Title (×count), …`.

## courses/
**courses.json** — array of modules:
```json
[{"module":"M1","docs":["D1-..","D2-.."],"doc_titles":["..",".."],"key_concepts":["order","delivery"]}]
```
**courses.md** — per module: documents + key concepts. Modules = docs connected by shared glossary terms.

## Determinism
Sorted iteration throughout (terms, nodes, edges by construction order). Same sources → identical bytes.
That property is itself a validation: re-run and `diff` to confirm a clean build.
