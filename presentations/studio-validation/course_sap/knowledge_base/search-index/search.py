#!/usr/bin/env python3
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
