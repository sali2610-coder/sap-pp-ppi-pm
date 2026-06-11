#!/usr/bin/env python3
"""Assemble produced learning artifacts in a folder into a pack with an index.

Usage:  python3 build_pack.py <out_dir> --title "<Source> — Learning Pack"
Scans <out_dir> for known artifact files and writes <out_dir>/index.md linking each, grouped by the
10 output types. Missing artifacts are listed as "not generated" so gaps are visible.
"""
import sys, argparse, pathlib, re

# filename hint -> (output number, label)
KNOWN = [
    ("chapter_summaries", (1, "Chapter summaries")),
    ("summaries",         (1, "Chapter summaries")),
    ("hebrew",            (2, "Hebrew learning notes")),
    ("beginner",          (3, "Beginner explanation")),
    ("expert",            (4, "Expert explanation")),
    ("flashcards.md",     (5, "Flashcards (printable)")),
    ("flashcards.tsv",    (5, "Flashcards (Anki TSV)")),
    ("quiz.md",           (6, "Knowledge test")),
    ("quiz.gift",         (6, "Knowledge test (GIFT)")),
    ("presentation",      (7, "Presentation outline")),
    ("exercises",         (8, "Practical exercises")),
    ("glossary",          (9, "Glossary")),
    ("runbook",           (10, "Runbook")),
]

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("out_dir"); ap.add_argument("--title", default="Learning Pack")
    a = ap.parse_args()
    out = pathlib.Path(a.out_dir)
    if not out.is_dir():
        print(f"ERROR: not a dir: {out}", file=sys.stderr); sys.exit(1)
    files = sorted(p.name for p in out.iterdir() if p.is_file() and p.name != "index.md")
    found = {}  # num -> list[(label, filename)]
    for f in files:
        low = f.lower()
        for hint, (num, label) in KNOWN:
            if hint in low:
                found.setdefault(num, []).append((label, f)); break
    lines = [f"# {a.title}\n", "_Generated learning pack — artifacts below._\n"]
    labels = {1:"Chapter summaries",2:"Hebrew learning notes",3:"Beginner explanation",
              4:"Expert explanation",5:"Flashcards",6:"Knowledge test",7:"Presentation",
              8:"Practical exercises",9:"Glossary",10:"Runbook"}
    present = 0
    for n in range(1, 11):
        if n in found:
            present += 1
            items = " · ".join(f"[{lbl}]({fn})" for lbl, fn in found[n])
            lines.append(f"{n}. **{labels[n]}** — {items}")
        else:
            lines.append(f"{n}. **{labels[n]}** — _not generated_")
    lines.append(f"\n---\n_{present}/10 output types present._")
    (out / "index.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"[pack] index.md written: {present}/10 output types -> {out/'index.md'}")

if __name__ == "__main__":
    main()
