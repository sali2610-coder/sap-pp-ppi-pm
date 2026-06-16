#!/usr/bin/env python3
"""course-builder-pro — one source -> a full course package (7 outputs).

Usage:
    python3 course_builder.py <source.pdf|.docx|.pptx|.md> <out_dir> [--title "..."]

Orchestrates the validated studio/learning scripts (reused, not reinvented):
  ingest.py · make_flashcards.py · make_quiz.py (learning-content-factory)
  build_library.py (knowledge-library-builder)

Produces, under <out_dir>:
  course.md · presentation_outline.md · quiz.md/.gift · flashcards.tsv/.md ·
  exercises.md · study_guide.md · knowledge_base/ · index.md

Deterministic scaffolds from the source's chapter structure + extracted facts (tcodes/tables/terms).
The agent refines prose; the structure, flashcards, quiz, and knowledge base are generated + validated.
"""
import sys, re, json, subprocess, argparse, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[3]
LCF = ROOT / ".agents/skills/learning-content-factory/scripts"
KLB = ROOT / ".agents/skills/knowledge-library-builder/scripts"
TCODE = re.compile(r"\b[A-Z]{2,}[0-9][0-9A-Z]*\b")        # VA01, COR6N, ME21N
TABLE = re.compile(r"\b[A-Z]{4,5}\b")                       # VBAK, EKKO, AUFK
CHAP = re.compile(r"^##\s+(.*)$", re.M)

def ingest(src):
    if src.suffix.lower() in (".md", ".markdown", ".txt"):
        return src.read_text(encoding="utf-8", errors="replace")
    out = subprocess.run([sys.executable, str(LCF / "ingest.py"), str(src)],
                         capture_output=True, text=True)
    return out.stdout

def chapters(md):
    chs = []
    parts = re.split(r"^##\s+", md, flags=re.M)
    for p in parts[1:]:
        lines = [l for l in p.splitlines() if l.strip()]
        if not lines: continue
        chs.append({"title": lines[0].strip(), "body": " ".join(lines[1:])})
    if not chs:  # no ## headings -> single module from the whole text
        chs = [{"title": "Overview", "body": md.strip()[:1200]}]
    return chs

def facts(chs):
    """extract (term, tcode, table, sentence) facts for cards/quiz."""
    out = []
    for c in chs:
        for sent in re.split(r"(?<=[.])\s+", c["body"]):
            tcs = TCODE.findall(sent); tbs = [t for t in TABLE.findall(sent) if t not in tcs]
            if tcs:
                out.append({"chapter": c["title"], "sentence": sent.strip(),
                            "tcode": tcs[0], "table": tbs[0] if tbs else None})
    return out

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("source"); ap.add_argument("out_dir"); ap.add_argument("--title", default="Course")
    a = ap.parse_args()
    src = pathlib.Path(a.source); out = pathlib.Path(a.out_dir); out.mkdir(parents=True, exist_ok=True)
    md = ingest(src); chs = chapters(md); fx = facts(chs)
    (out / "_source.md").write_text(md, encoding="utf-8")

    # 1) COURSE
    cm = [f"# {a.title} — Course\n", f"_{len(chs)} modules from the source._\n"]
    for i, c in enumerate(chs, 1):
        cm += [f"## Module {i}: {c['title']}",
               f"- **Objective:** understand {c['title'].lower()} and apply it.",
               f"- **Summary:** {c['body'][:200]}{'…' if len(c['body'])>200 else ''}",
               f"- **You will be able to:** name the key steps/objects and complete the Module {i} exercise.\n"]
    (out / "course.md").write_text("\n".join(cm), encoding="utf-8")

    # 2) PRESENTATION OUTLINE (hand to presentation-studio-pro)
    pm = [f"# {a.title} — Presentation Outline (action titles)\n",
          f"Slide 1 — {a.title}: what you'll learn — title"]
    for i, c in enumerate(chs, 1):
        pm.append(f"Slide {i+1} — {c['title']} — key point + exhibit")
    pm.append(f"Slide {len(chs)+2} — Recap: the through-line — conclusions")
    pm.append("\n→ Hand to the presentation-architect + Builder to produce PPTX/PDF/HTML.")
    (out / "presentation_outline.md").write_text("\n".join(pm), encoding="utf-8")

    # 3) FLASHCARDS (from facts)
    cards = []
    for f in fx[:30]:
        if f["table"]:
            cards.append({"q": f"Which transaction is associated with: \"{f['sentence'][:80]}\"?",
                          "a": f"{f['tcode']} (table {f['table']}).", "tag": "remember", "source": f["chapter"]})
        else:
            cards.append({"q": f"Which transaction: \"{f['sentence'][:80]}\"?",
                          "a": f"{f['tcode']}.", "tag": "remember", "source": f["chapter"]})
    if not cards:
        cards = [{"q": f"What is the focus of '{c['title']}'?", "a": c["body"][:100], "tag": "understand", "source": c["title"]} for c in chs]
    json.dump({"deck": a.title, "cards": cards[:20]}, open(out / "cards.json", "w"), indent=2)
    subprocess.run([sys.executable, str(LCF / "make_flashcards.py"), str(out / "cards.json"), str(out)], check=True)

    # 4) QUIZ (MCQ per fact/chapter)
    items = []
    pool = list({f["tcode"] for f in fx}) or ["VA01", "VL01N", "VF01", "ME21N"]
    for f in fx[:8]:
        distract = [x for x in pool if x != f["tcode"]][:3]
        while len(distract) < 3: distract.append("N/A")
        opts = [f["tcode"]] + distract
        items.append({"type": "mcq", "tag": "remember",
                      "question": f"Which transaction fits: \"{f['sentence'][:90]}\"?",
                      "options": opts, "answer": 0,
                      "rationale": f"{f['tcode']} per the source.", "source": f["chapter"]})
    for c in chs[:3]:
        items.append({"type": "short", "tag": "understand",
                      "question": f"In one line, what does '{c['title']}' cover?",
                      "answer": c["body"][:120], "source": c["title"]})
    json.dump({"title": f"{a.title} quiz", "items": items}, open(out / "quiz.json", "w"), indent=2)
    subprocess.run([sys.executable, str(LCF / "make_quiz.py"), str(out / "quiz.json"), str(out)], check=True)

    # 5) EXERCISES
    em = [f"# {a.title} — Practical Exercises\n"]
    for i, c in enumerate(chs, 1):
        tc = next((f["tcode"] for f in fx if f["chapter"] == c["title"]), None)
        em += [f"## Exercise {i} — {c['title']}",
               f"- **Goal:** apply {c['title'].lower()} end to end.",
               f"- **Steps:** {('use '+tc+' in the sandbox') if tc else 'follow the module steps'} → record the result.",
               f"- **Expected result:** a document/output you can verify.",
               f"- **Solution:** {(tc+' produces the expected document; verify in the table.') if tc else 'matches the module summary.'}\n"]
    (out / "exercises.md").write_text("\n".join(em), encoding="utf-8")

    # 6) STUDY GUIDE
    sm = [f"# {a.title} — Study Guide\n"]
    for i, c in enumerate(chs, 1):
        codes = sorted({f["tcode"] for f in fx if f["chapter"] == c["title"]})
        sm += [f"## {c['title']}",
               f"- **Must-know:** {c['body'][:160]}",
               f"- **Key codes:** {', '.join(codes) if codes else '—'}",
               f"- **Self-test:** Can you explain {c['title'].lower()} and name its steps?\n"]
    sm.append("### You should be able to…\n" + "\n".join(f"- {c['title']}" for c in chs))
    (out / "study_guide.md").write_text("\n".join(sm), encoding="utf-8")

    # 7) KNOWLEDGE BASE (knowledge-library-builder over the source)
    kb_src = out / "kb_sources"; kb_src.mkdir(exist_ok=True)
    (kb_src / src.name).write_text(md, encoding="utf-8") if src.suffix.lower() in (".md",".txt") else (kb_src / (src.stem + ".md")).write_text(md, encoding="utf-8")
    subprocess.run([sys.executable, str(KLB / "build_library.py"), str(kb_src), str(out / "knowledge_base"), "--title", a.title], check=True)

    # INDEX
    idx = [f"# {a.title} — Course Package\n", "_7 outputs generated from one source._\n",
           "1. **Course** — [course.md](course.md)",
           "2. **Presentation** — [presentation_outline.md](presentation_outline.md) (→ studio build)",
           "3. **Quiz** — [quiz.md](quiz.md) · [quiz.gift](quiz.gift)",
           "4. **Flashcards** — [flashcards.tsv](flashcards.tsv) · [flashcards.md](flashcards.md)",
           "5. **Exercises** — [exercises.md](exercises.md)",
           "6. **Study Guide** — [study_guide.md](study_guide.md)",
           "7. **Knowledge Base** — [knowledge_base/](knowledge_base/) (catalog · search · glossary · graph)"]
    (out / "index.md").write_text("\n".join(idx) + "\n", encoding="utf-8")
    print(json.dumps({"modules": len(chs), "facts": len(fx), "cards": len(cards[:20]),
                      "quiz_items": len(items), "out": str(out)}, indent=2))

if __name__ == "__main__":
    main()
