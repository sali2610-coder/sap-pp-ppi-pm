#!/usr/bin/env python3
"""Format a reference list in APA 7 / IEEE / Harvard from structured records.

Usage:  python3 cite.py refs.json --style apa7|ieee|harvard
Record fields (omit unknowns): see references/citations.md §Reference record.
Output: formatted list to stdout (Markdown). APA/Harvard alphabetical; IEEE numbered in input order.
Never fabricates fields — missing data is simply omitted, and a stderr note flags it.
"""
import sys, json, argparse

def _authors_apa(a):  # [["Last","F. M."], ...] -> "Last, F. M., & Last2, G."
    names = [f"{l}, {f}" for l, f in a]
    if not names: return ""
    if len(names) == 1: return names[0]
    return ", ".join(names[:-1]) + ", & " + names[-1]

def _authors_harvard(a):
    names = [f"{l}, {f}" for l, f in a]
    if not names: return ""
    if len(names) == 1: return names[0]
    return ", ".join(names[:-1]) + " and " + names[-1]

def _authors_ieee(a):  # "F. M. Last and G. Last2"
    names = [f"{f} {l}" for l, f in a]
    if not names: return ""
    if len(names) == 1: return names[0]
    return ", ".join(names[:-1]) + " and " + names[-1]

def _join(parts, sep=" "):
    return sep.join(p for p in parts if p)

def apa7(r):
    a = _authors_apa(r.get("authors", []))
    yr = f"({r['year']})." if r.get("year") else "(n.d.)."
    t = r.get("title", "")
    typ = r.get("type", "article")
    if typ == "article":
        cont = f"*{r.get('container','')}*"
        vi = f"*{r['volume']}*" + (f"({r['issue']})" if r.get("issue") else "") if r.get("volume") else ""
        pg = r.get("pages", "")
        src = _join([_join([cont, vi], ", ").strip(", "), pg], ", ").rstrip(", ")
        tail = f"{t}. {src}." if src else f"{t}."
        doi = f" https://doi.org/{r['doi']}" if r.get("doi") else (f" {r['url']}" if r.get("url") else "")
        return f"{a} {yr} {tail}{doi}".strip()
    if typ == "book":
        ed = f" ({r['edition']} ed.)" if r.get("edition") else ""
        return f"{a} {yr} *{t}*{ed}. {r.get('publisher','')}.".strip()
    if typ == "chapter":
        eds = r.get("editors", "")
        return f"{a} {yr} {t}. In {eds} (Ed.), *{r.get('container','')}* (pp. {r.get('pages','')}). {r.get('publisher','')}.".strip()
    # report / web
    url = f" {r['url']}" if r.get("url") else ""
    return f"{a} {yr} *{t}*. {r.get('publisher','')}.{url}".strip()

def harvard(r):
    a = _authors_harvard(r.get("authors", []))
    yr = f"({r['year']})" if r.get("year") else "(n.d.)"
    t = r.get("title", "")
    typ = r.get("type", "article")
    if typ == "article":
        cont = f"*{r.get('container','')}*"
        vi = f"{r['volume']}" + (f"({r['issue']})" if r.get("issue") else "") if r.get("volume") else ""
        pg = f"pp. {r['pages']}" if r.get("pages") else ""
        return _join([f"{a} {yr} '{t}',", _join([cont, vi], ", ").strip(", ") + ",", pg]).rstrip(", ") + "."
    if typ == "book":
        return f"{a} {yr} *{t}*. {r.get('publisher','')}.".strip()
    url = f" Available at: {r['url']}" if r.get("url") else ""
    acc = f" (Accessed: {r['accessed']})." if r.get("accessed") else ""
    return f"{a} {yr} *{t}*.{url}{acc}".strip()

def ieee(r, n):
    a = _authors_ieee(r.get("authors", []))
    t = r.get("title", "")
    typ = r.get("type", "article")
    if typ == "article":
        cont = f"*{r.get('container','')}*"
        vol = f"vol. {r['volume']}" if r.get("volume") else ""
        no = f"no. {r['issue']}" if r.get("issue") else ""
        pg = f"pp. {r['pages']}" if r.get("pages") else ""
        yr = str(r["year"]) if r.get("year") else ""
        doi = f"doi: {r['doi']}" if r.get("doi") else ""
        body = _join([f'"{t},"', _join([cont, vol, no, pg, yr, doi], ", ").strip(", ")], " ").rstrip(", ") + "."
        return f"[{n}] {a}, {body}".strip()
    if typ == "book":
        ed = f", {r['edition']} ed." if r.get("edition") else ""
        return f"[{n}] {a}, *{t}*{ed}. {r.get('publisher','')}, {r.get('year','')}.".strip()
    url = f" [Online]. Available: {r['url']}" if r.get("url") else ""
    return f"[{n}] {a}, \"{t},\" {r.get('year','')}.{url}".strip()

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("refs"); ap.add_argument("--style", required=True, choices=["apa7","ieee","harvard"])
    args = ap.parse_args()
    recs = json.load(open(args.refs))
    # integrity flag
    for r in recs:
        miss = [k for k in ("authors","year","title") if not r.get(k)]
        if miss: print(f"[cite] note: '{r.get('title','?')}' missing {miss}", file=sys.stderr)
    if args.style == "ieee":
        lines = [ieee(r, i+1) for i, r in enumerate(recs)]
    else:
        fmt = apa7 if args.style == "apa7" else harvard
        recs_sorted = sorted(recs, key=lambda r: (r.get("authors") or [["",""]])[0][0].lower())
        lines = [fmt(r) for r in recs_sorted]
    print(f"## References ({args.style.upper()})\n")
    for ln in lines:
        print(ln + "\n")

if __name__ == "__main__":
    main()
