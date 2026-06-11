#!/usr/bin/env python3
"""Flashcards JSON -> Anki TSV + printable Markdown.

Usage:  python3 make_flashcards.py cards.json <out_dir>
Input shape: {"deck": str, "cards": [{"q","a","tag"?,"source"?}, ...]}
Validates: each card has non-empty q and a. Exits non-zero on malformed input.
Outputs: <out_dir>/flashcards.tsv  (front<TAB>back<TAB>tags)  and  <out_dir>/flashcards.md
"""
import sys, json, pathlib

def main():
    if len(sys.argv) != 3:
        print("usage: make_flashcards.py cards.json out_dir", file=sys.stderr); sys.exit(2)
    data = json.load(open(sys.argv[1]))
    out = pathlib.Path(sys.argv[2]); out.mkdir(parents=True, exist_ok=True)
    deck = data.get("deck", "Flashcards")
    cards = data.get("cards", [])
    if not cards:
        print("ERROR: no cards", file=sys.stderr); sys.exit(1)
    errs = []
    for i, c in enumerate(cards):
        if not c.get("q","").strip(): errs.append(f"card {i}: empty question")
        if not c.get("a","").strip(): errs.append(f"card {i}: empty answer")
    if errs:
        print("INVALID flashcards:\n  " + "\n  ".join(errs), file=sys.stderr); sys.exit(1)

    tsv = out / "flashcards.tsv"
    with tsv.open("w", encoding="utf-8") as f:
        for c in cards:
            tags = " ".join(t for t in [c.get("tag",""), (c.get("source","").replace(" ","_") if c.get("source") else "")] if t)
            front = c["q"].replace("\t"," ").replace("\n"," ")
            back = c["a"].replace("\t"," ").replace("\n"," ")
            f.write(f"{front}\t{back}\t{tags}\n")

    md = out / "flashcards.md"
    with md.open("w", encoding="utf-8") as f:
        f.write(f"# {deck}\n\n_{len(cards)} cards_\n\n")
        for i, c in enumerate(cards, 1):
            meta = " · ".join(x for x in [c.get("tag"), c.get("source")] if x)
            f.write(f"**Q{i}.** {c['q']}\n\n> {c['a']}\n")
            if meta: f.write(f"\n<sub>{meta}</sub>\n")
            f.write("\n---\n\n")
    print(f"[flashcards] {len(cards)} cards -> {tsv}  +  {md}")

if __name__ == "__main__":
    main()
