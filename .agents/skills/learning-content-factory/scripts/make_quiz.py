#!/usr/bin/env python3
"""Quiz JSON -> Markdown (questions + answer key) + GIFT (Moodle import).

Usage:  python3 make_quiz.py quiz.json <out_dir>
Input shape: {"title": str, "items": [ ... ]}
  mcq:        {"type":"mcq","question","options":[...],"answer":<idx>,"tag"?,"rationale"?,"source"?}
  truefalse:  {"type":"truefalse","question","answer":true|false,"tag"?,"rationale"?}
  short:      {"type":"short","question","answer":str,"tag"?,"source"?}
Validation (this is the quiz's correctness gate):
  - mcq: >=3 options and answer is a valid index
  - truefalse: answer is bool
  - short: non-empty answer
Exits non-zero on any malformed item.
Outputs: <out_dir>/quiz.md  and  <out_dir>/quiz.gift
"""
import sys, json, pathlib

def validate(items):
    errs = []
    for i, it in enumerate(items):
        t = it.get("type")
        if t == "mcq":
            opts = it.get("options", [])
            if len(opts) < 3: errs.append(f"item {i} (mcq): needs >=3 options, has {len(opts)}")
            a = it.get("answer")
            if not isinstance(a, int) or not (0 <= a < len(opts)):
                errs.append(f"item {i} (mcq): answer index {a} out of range")
        elif t == "truefalse":
            if not isinstance(it.get("answer"), bool): errs.append(f"item {i} (truefalse): answer must be bool")
        elif t == "short":
            if not str(it.get("answer","")).strip(): errs.append(f"item {i} (short): empty answer")
        else:
            errs.append(f"item {i}: unknown type {t!r}")
        if not it.get("question","").strip(): errs.append(f"item {i}: empty question")
    return errs

def to_md(title, items):
    L = [f"# {title}\n"]
    for i, it in enumerate(items, 1):
        tag = f"  _({it['tag']})_" if it.get("tag") else ""
        L.append(f"**{i}. {it['question']}**{tag}\n")
        if it["type"] == "mcq":
            for j, o in enumerate(it["options"]):
                L.append(f"   {chr(65+j)}. {o}")
            L.append("")
        elif it["type"] == "truefalse":
            L.append("   A. True\n   B. False\n")
    L.append("\n---\n\n## Answer Key\n")
    for i, it in enumerate(items, 1):
        if it["type"] == "mcq":
            key = chr(65 + it["answer"])
        elif it["type"] == "truefalse":
            key = "True" if it["answer"] else "False"
        else:
            key = it["answer"]
        rat = f" — {it['rationale']}" if it.get("rationale") else ""
        src = f" [{it['source']}]" if it.get("source") else ""
        L.append(f"{i}. **{key}**{rat}{src}")
    return "\n".join(L) + "\n"

def gift_escape(s):
    return s.replace("=", "\\=").replace("~", "\\~").replace("#", "\\#").replace("{", "\\{").replace("}", "\\}")

def to_gift(items):
    out = []
    for it in items:
        q = gift_escape(it["question"])
        if it["type"] == "mcq":
            lines = [f"::Q::{q} {{"]
            for j, o in enumerate(it["options"]):
                pre = "=" if j == it["answer"] else "~"
                lines.append(f"  {pre}{gift_escape(o)}")
            lines.append("}")
            out.append("\n".join(lines))
        elif it["type"] == "truefalse":
            out.append(f"::Q::{q} {{{'TRUE' if it['answer'] else 'FALSE'}}}")
        elif it["type"] == "short":
            out.append(f"::Q::{q} {{={gift_escape(str(it['answer']))}}}")
    return "\n\n".join(out) + "\n"

def main():
    if len(sys.argv) != 3:
        print("usage: make_quiz.py quiz.json out_dir", file=sys.stderr); sys.exit(2)
    data = json.load(open(sys.argv[1]))
    items = data.get("items", [])
    if not items:
        print("ERROR: no items", file=sys.stderr); sys.exit(1)
    errs = validate(items)
    if errs:
        print("INVALID quiz:\n  " + "\n  ".join(errs), file=sys.stderr); sys.exit(1)
    out = pathlib.Path(sys.argv[2]); out.mkdir(parents=True, exist_ok=True)
    (out / "quiz.md").write_text(to_md(data.get("title","Quiz"), items), encoding="utf-8")
    (out / "quiz.gift").write_text(to_gift(items), encoding="utf-8")
    n_mcq = sum(1 for it in items if it["type"]=="mcq")
    print(f"[quiz] {len(items)} items ({n_mcq} mcq) -> {out/'quiz.md'}  +  {out/'quiz.gift'}")

if __name__ == "__main__":
    main()
