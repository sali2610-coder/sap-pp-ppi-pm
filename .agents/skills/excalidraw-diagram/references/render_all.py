"""Render an .excalidraw file to BOTH PNG and SVG using Playwright + system Chrome.

Companion to render_excalidraw.py (PNG-only). Reuses render_template.html
(Excalidraw exportToSvg). Uses installed Google Chrome (channel="chrome") so no
chromium download is required.

Usage:
    python3 render_all.py <file.excalidraw> [--scale 2]
Outputs <file>.png and <file>.svg next to the input.
"""
from __future__ import annotations
import argparse, json, sys
from pathlib import Path
from render_excalidraw import validate_excalidraw, compute_bounding_box


def render_all(path: Path, scale: int = 2, max_width: int = 2400):
    from playwright.sync_api import sync_playwright
    data = json.loads(path.read_text(encoding="utf-8"))
    errs = validate_excalidraw(data)
    if errs:
        print("INVALID:", "; ".join(errs), file=sys.stderr); sys.exit(1)

    elements = [e for e in data["elements"] if not e.get("isDeleted")]
    min_x, min_y, max_x, max_y = compute_bounding_box(elements)
    pad = 80
    vp_w = min(int(max_x - min_x + pad * 2), max_width)
    vp_h = max(int(max_y - min_y + pad * 2), 600)

    template = Path(__file__).parent / "render_template_local.html"
    png_path = path.with_suffix(".png")
    svg_path = path.with_suffix(".svg")

    with sync_playwright() as p:
        args = ["--no-sandbox"]
        try:
            browser = p.chromium.launch(channel="chrome", headless=True, args=args)
        except Exception:
            browser = p.chromium.launch(headless=True, args=args)  # fallback to bundled
        page = browser.new_page(viewport={"width": vp_w, "height": vp_h}, device_scale_factor=scale)
        page.goto(template.as_uri())
        page.wait_for_function("window.__moduleReady === true", timeout=30000)
        res = page.evaluate(f"window.renderDiagram({json.dumps(data)})")
        if not res or not res.get("success"):
            print("RENDER FAIL:", (res or {}).get("error"), file=sys.stderr); browser.close(); sys.exit(1)
        page.wait_for_function("window.__renderComplete === true", timeout=15000)
        svg_el = page.query_selector("#root svg")
        if svg_el is None:
            print("no svg", file=sys.stderr); browser.close(); sys.exit(1)
        # SVG export = the Excalidraw-produced SVG markup
        svg_markup = page.evaluate("document.querySelector('#root svg').outerHTML")
        if not svg_markup.lstrip().startswith("<?xml"):
            svg_markup = '<?xml version="1.0" encoding="UTF-8"?>\n' + svg_markup
        svg_path.write_text(svg_markup, encoding="utf-8")
        # PNG export = screenshot of the SVG element
        svg_el.screenshot(path=str(png_path))
        browser.close()
    print(f"{png_path}\n{svg_path}")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("input", type=Path)
    ap.add_argument("--scale", "-s", type=int, default=2)
    a = ap.parse_args()
    if not a.input.exists():
        print("not found:", a.input, file=sys.stderr); sys.exit(1)
    render_all(a.input, a.scale)
