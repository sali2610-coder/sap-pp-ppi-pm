#!/usr/bin/env python3
"""Knowledge Library Builder — one pass over a sources folder -> 5 outputs.

Usage:
    python3 build_library.py <sources_dir> <out_dir> [--title "My Library"]

Discovers .md/.txt/.pdf/.docx/.pptx in <sources_dir> (PDF/DOCX/PPTX via ingest.py/markitdown),
then writes, under <out_dir>:
    library/        catalog.json + catalog.md          (indexed books/PDFs)
    search-index/   index.json + search.py + stats.json (offline inverted-index + query CLI)
    glossary/       glossary.json + glossary.md         (curated terms.json, else auto-candidates)
    knowledge-graph/ graph.json + graph.mmd + graph.dot + xref.json + xref.md (cross-references)
    courses/        courses.json + courses.md           (modules clustered by shared concepts)

Pure stdlib (+ markitdown only for non-Markdown inputs). Deterministic: same input -> same output.
Curated glossary: drop a glossary_terms.json ({"term":"definition", ...}) in <sources_dir>.
"""
import sys, os, re, json, subprocess, pathlib, collections

HERE = pathlib.Path(__file__).resolve().parent
STOP = set("the a an and or of to in for on with is are be this that it as at by from into "
           "your you we our their they them then than can will may has have had not but if so "
           "each per via use used using one two via its his her she he do does done about over".split())
TOKEN = re.compile(r"[A-Za-z][A-Za-z0-9_]{2,}")
ACRONYM = re.compile(r"\b[A-Z][A-Z0-9]{1,}\b")                     # SAP, VA01, IDOC
CODEISH = re.compile(r"\b[A-Z]{2,}[0-9]{1,}[A-Z0-9]*\b|\b[A-Z]{3,}\b")  # VA01, VBAK, BAPI
HEADING = re.compile(r"^(#{1,3})\s+(.*)$", re.M)

def ingest(path: pathlib.Path) -> str:
    if path.suffix.lower() in (".md", ".markdown", ".txt"):
        return path.read_text(encoding="utf-8", errors="replace")
    out = subprocess.run([sys.executable, str(HERE / "ingest.py"), str(path)],
                         capture_output=True, text=True)
    return out.stdout

def slug(s): return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")[:60] or "doc"

def title_of(text, fallback):
    m = re.search(r"^#\s+(.*)$", text, re.M)
    return (m.group(1).strip() if m else fallback)

def sections(text):
    secs = []
    for m in HEADING.finditer(text):
        secs.append({"level": len(m.group(1)), "title": m.group(2).strip()})
    return secs

def tokenize(text):
    return [t.lower() for t in TOKEN.findall(text) if t.lower() not in STOP]

def main():
    if len(sys.argv) < 3:
        print("usage: build_library.py <sources_dir> <out_dir> [--title T]", file=sys.stderr); sys.exit(2)
    src = pathlib.Path(sys.argv[1]); out = pathlib.Path(sys.argv[2])
    title = "Knowledge Library"
    if "--title" in sys.argv: title = sys.argv[sys.argv.index("--title") + 1]
    if not src.is_dir(): print(f"ERROR: no sources dir {src}", file=sys.stderr); sys.exit(1)
    for sub in ("library", "search-index", "glossary", "knowledge-graph", "courses"):
        (out / sub).mkdir(parents=True, exist_ok=True)

    exts = {".md", ".markdown", ".txt", ".pdf", ".docx", ".pptx"}
    files = sorted(p for p in src.iterdir() if p.is_file() and p.suffix.lower() in exts
                   and p.name != "glossary_terms.json")
    if not files:
        print(f"ERROR: no source documents in {src}", file=sys.stderr); sys.exit(1)

    # ---- ingest + catalog ----
    docs = []          # {id,title,file,sections,words,text,tokens}
    for i, f in enumerate(files):
        text = ingest(f)
        toks = tokenize(text)
        did = f"D{i+1}-" + slug(f.stem)
        docs.append({"id": did, "title": title_of(text, f.stem), "file": f.name,
                     "sections": sections(text), "words": len(text.split()),
                     "text": text, "tokens": toks})
    catalog = [{"id": d["id"], "title": d["title"], "file": d["file"],
                "sections": [s["title"] for s in d["sections"]], "words": d["words"]} for d in docs]
    (out / "library/catalog.json").write_text(json.dumps(catalog, indent=2), encoding="utf-8")
    cm = [f"# {title} — Catalog\n", f"_{len(docs)} documents indexed._\n"]
    for d in catalog:
        cm.append(f"## {d['title']}  `{d['id']}`")
        cm.append(f"- file: `{d['file']}` · {d['words']} words · {len(d['sections'])} sections")
        if d["sections"]: cm.append("- sections: " + " · ".join(d["sections"]))
        cm.append("")
    (out / "library/catalog.md").write_text("\n".join(cm), encoding="utf-8")

    # ---- search index (inverted) ----
    inv = collections.defaultdict(lambda: collections.defaultdict(int))
    for d in docs:
        for t in d["tokens"]:
            inv[t][d["id"]] += 1
    index = {t: dict(p) for t, p in sorted(inv.items())}
    (out / "search-index/index.json").write_text(json.dumps(index, indent=0), encoding="utf-8")
    stats = {"documents": len(docs), "unique_terms": len(index),
             "total_tokens": sum(len(d["tokens"]) for d in docs),
             "top_terms": collections.Counter(
                 {t: sum(p.values()) for t, p in index.items()}).most_common(15)}
    (out / "search-index/stats.json").write_text(json.dumps(stats, indent=2), encoding="utf-8")
    (out / "search-index/search.py").write_text(SEARCH_CLI, encoding="utf-8")

    # ---- glossary (curated terms.json if present, else auto-candidates) ----
    curated = src / "glossary_terms.json"
    gloss = {}
    if curated.exists():
        defs = json.loads(curated.read_text(encoding="utf-8"))
        for term, d in defs.items():
            gloss[term] = {"definition": d, "source": "curated"}
    else:
        cand = collections.Counter()
        for d in docs:
            for m in set(CODEISH.findall(d["text"])) | set(ACRONYM.findall(d["text"])):
                cand[m] += 1
        for term, _ in cand.most_common(40):
            # context snippet = first sentence containing the term
            snip = ""
            for d in docs:
                mm = re.search(r"[^.\n]*\b" + re.escape(term) + r"\b[^.\n]*", d["text"])
                if mm: snip = mm.group(0).strip()[:160]; break
            gloss[term] = {"definition": snip or f"(auto-extracted term: {term})", "source": "auto"}
    (out / "glossary/glossary.json").write_text(json.dumps(gloss, indent=2), encoding="utf-8")
    gm = [f"# {title} — Glossary\n", f"_{len(gloss)} terms._\n"]
    for term in sorted(gloss):
        gm.append(f"- **{term}** — {gloss[term]['definition']}")
    (out / "glossary/glossary.md").write_text("\n".join(gm) + "\n", encoding="utf-8")

    # ---- cross-reference (term -> docs/sections that mention it) ----
    xref = {}
    for term in gloss:
        hits = []
        pat = re.compile(r"\b" + re.escape(term) + r"\b")
        for d in docs:
            if pat.search(d["text"]):
                secs = [s["title"] for s in d["sections"]
                        if pat.search(s["title"])] or None
                hits.append({"doc": d["id"], "title": d["title"], "sections": secs,
                             "count": len(pat.findall(d["text"]))})
        xref[term] = hits
    (out / "knowledge-graph/xref.json").write_text(json.dumps(xref, indent=2), encoding="utf-8")
    xm = [f"# {title} — Cross-Reference\n"]
    for term in sorted(xref):
        if not xref[term]: continue
        refs = ", ".join(f"{h['title']} (×{h['count']})" for h in xref[term])
        xm.append(f"- **{term}** → {refs}")
    (out / "knowledge-graph/xref.md").write_text("\n".join(xm) + "\n", encoding="utf-8")

    # ---- knowledge graph (docs + terms; edges mention + co-occurrence) ----
    nodes = [{"id": d["id"], "type": "doc", "label": d["title"]} for d in docs]
    nodes += [{"id": "T:" + t, "type": "term", "label": t} for t in gloss]
    edges = []
    term_docs = {t: {h["doc"] for h in xref[t]} for t in gloss}
    for t, ds in term_docs.items():
        for did in sorted(ds):
            edges.append({"src": did, "dst": "T:" + t, "rel": "mentions"})
    terms = list(gloss)
    for a in range(len(terms)):
        for b in range(a + 1, len(terms)):
            co = term_docs[terms[a]] & term_docs[terms[b]]
            if co:
                edges.append({"src": "T:" + terms[a], "dst": "T:" + terms[b],
                              "rel": "co_occurs", "weight": len(co)})
    graph = {"nodes": nodes, "edges": edges}
    (out / "knowledge-graph/graph.json").write_text(json.dumps(graph, indent=2), encoding="utf-8")
    # mermaid
    mm = ["graph LR"]
    nid = {n["id"]: f"n{i}" for i, n in enumerate(nodes)}
    for n in nodes:
        shape = (f'["{n["label"]}"]' if n["type"] == "doc" else f'(("{n["label"]}"))')
        mm.append(f'  {nid[n["id"]]}{shape}')
    for e in edges:
        arrow = "-->" if e["rel"] == "mentions" else "-.-"
        mm.append(f'  {nid[e["src"]]} {arrow} {nid[e["dst"]]}')
    (out / "knowledge-graph/graph.mmd").write_text("\n".join(mm) + "\n", encoding="utf-8")
    # graphviz dot
    dot = ["digraph KL {", '  rankdir=LR; node [style=filled];']
    for n in nodes:
        color = "lightblue" if n["type"] == "doc" else "lightyellow"
        dot.append(f'  "{n["id"]}" [label="{n["label"]}", fillcolor={color}];')
    for e in edges:
        dot.append(f'  "{e["src"]}" -> "{e["dst"]}" [label="{e["rel"]}"];')
    dot.append("}")
    (out / "knowledge-graph/graph.dot").write_text("\n".join(dot) + "\n", encoding="utf-8")

    # ---- courses (cluster docs by shared-term overlap -> modules) ----
    # union-find over docs that share >=1 glossary term
    parent = {d["id"]: d["id"] for d in docs}
    def find(x):
        while parent[x] != x: parent[x] = parent[parent[x]]; x = parent[x]
        return x
    def union(a, b): parent[find(a)] = find(b)
    doc_terms = {d["id"]: {t for t in gloss if re.search(r"\b"+re.escape(t)+r"\b", d["text"])} for d in docs}
    ids = [d["id"] for d in docs]
    for i in range(len(ids)):
        for j in range(i + 1, len(ids)):
            if doc_terms[ids[i]] & doc_terms[ids[j]]:
                union(ids[i], ids[j])
    clusters = collections.defaultdict(list)
    for did in ids: clusters[find(did)].append(did)
    title_by = {d["id"]: d["title"] for d in docs}
    modules = []
    for k, members in enumerate(sorted(clusters.values(), key=lambda m: -len(m)), 1):
        shared = set.intersection(*[doc_terms[m] for m in members]) if len(members) > 1 else (
            doc_terms[members[0]])
        modules.append({"module": f"M{k}", "docs": members,
                        "doc_titles": [title_by[m] for m in members],
                        "key_concepts": sorted(shared)[:8]})
    (out / "courses/courses.json").write_text(json.dumps(modules, indent=2), encoding="utf-8")
    cmd = [f"# {title} — Suggested Courses / Modules\n",
           f"_Docs grouped into {len(modules)} module(s) by shared concepts._\n"]
    for m in modules:
        cmd.append(f"## {m['module']} — {len(m['docs'])} doc(s)")
        cmd.append("- documents: " + ", ".join(m["doc_titles"]))
        if m["key_concepts"]: cmd.append("- key concepts: " + ", ".join(m["key_concepts"]))
        cmd.append("")
    (out / "courses/courses.md").write_text("\n".join(cmd), encoding="utf-8")

    print(json.dumps({"documents": len(docs), "terms": len(gloss),
                      "index_terms": len(index), "graph_nodes": len(nodes),
                      "graph_edges": len(edges), "modules": len(modules),
                      "out": str(out)}, indent=2))

SEARCH_CLI = '''#!/usr/bin/env python3
"""Offline query over index.json (built by build_library.py).
Usage: python3 search.py "term1 term2"   -> ranked docIds by summed term frequency."""
import sys, json, pathlib, re
idx = json.loads((pathlib.Path(__file__).parent / "index.json").read_text())
q = [t.lower() for t in re.findall(r"[A-Za-z][A-Za-z0-9_]{2,}", " ".join(sys.argv[1:]))]
score = {}
for t in q:
    for did, c in idx.get(t, {}).items():
        score[did] = score.get(did, 0) + c
for did, s in sorted(score.items(), key=lambda x: -x[1]):
    print(f"{s:4d}  {did}")
if not score: print("(no matches)")
'''

if __name__ == "__main__":
    main()
