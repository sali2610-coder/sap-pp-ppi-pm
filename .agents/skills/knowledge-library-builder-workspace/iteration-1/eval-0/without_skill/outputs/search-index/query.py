#!/usr/bin/env python3
"""Offline query tool over the generated search index. Usage: search_query.py <query terms...>"""
import json, sys, math, re
from collections import Counter

OUT = "/Users/salihalif/Desktop/My-Projects/sap/.agents/skills/knowledge-library-builder-workspace/iteration-1/eval-0/without_skill/outputs"

with open(f"{OUT}/search-index/search-index.json", encoding="utf-8") as f:
    idx = json.load(f)

STOP = set("a an the and or of to in for with on is are be by as it that this from".split())

def tokenize(text):
    toks = re.findall(r'[A-Za-z][A-Za-z0-9]+', text)
    return [t.lower() for t in toks if t.lower() not in STOP and len(t) > 1]

def search(query, top=10):
    qtoks = tokenize(query)
    idf = idx["idf"]; postings = idx["postings"]; recs = idx["records"]
    scores = Counter()
    for qt in qtoks:
        if qt in postings:
            w = idf.get(qt, 1.0)
            for rid, tf in postings[qt].items():
                scores[rid] += (1 + math.log(tf)) * w
    ranked = scores.most_common(top)
    results = []
    for rid, sc in ranked:
        r = recs[rid]
        results.append({"score": round(sc, 4), "id": rid, "doc": r["doc"],
                        "module": r["module"], "heading": r["heading"], "snippet": r["snippet"]})
    return results

if __name__ == "__main__":
    q = " ".join(sys.argv[1:]) or "BKPF"
    res = search(q)
    print(json.dumps({"query": q, "hits": len(res), "results": res}, indent=2, ensure_ascii=False))
