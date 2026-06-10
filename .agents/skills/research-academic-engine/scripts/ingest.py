#!/usr/bin/env python3
"""Ingest an academic source to Markdown.

PDF/DOCX/PPTX  -> markitdown
.md/.markdown/.txt -> passthrough

Usage:  python3 ingest.py <file>        # Markdown to stdout, char-count note to stderr
Needs:  pip install "markitdown[pptx,docx,pdf]"   (for non-Markdown inputs)
"""
import sys, subprocess, pathlib

def main():
    if len(sys.argv) != 2:
        print("usage: ingest.py <file>", file=sys.stderr); sys.exit(2)
    p = pathlib.Path(sys.argv[1])
    if not p.exists():
        print(f"ERROR: not found: {p}", file=sys.stderr); sys.exit(1)
    ext = p.suffix.lower()
    if ext in (".md", ".markdown", ".txt"):
        text = p.read_text(encoding="utf-8", errors="replace")
    elif ext in (".pdf", ".docx", ".pptx", ".doc", ".html", ".htm"):
        try:
            out = subprocess.run([sys.executable, "-m", "markitdown", str(p)],
                                 capture_output=True, text=True, check=True)
            text = out.stdout
        except FileNotFoundError:
            print("ERROR: markitdown not installed. Run: pip install \"markitdown[pptx,docx,pdf]\"",
                  file=sys.stderr); sys.exit(1)
        except subprocess.CalledProcessError as e:
            print(f"ERROR: markitdown failed: {e.stderr[:300]}", file=sys.stderr); sys.exit(1)
    else:
        print(f"ERROR: unsupported extension {ext} (use pdf/docx/pptx/md/txt)", file=sys.stderr); sys.exit(1)

    n = len(text.strip())
    sys.stdout.write(text)
    note = f"[ingest] {p.name}: {n} chars extracted"
    if ext == ".pdf" and n < 50:
        note += "  ⚠ near-zero text — likely a scanned/image PDF; OCR needed before citing"
    print(note, file=sys.stderr)

if __name__ == "__main__":
    main()
