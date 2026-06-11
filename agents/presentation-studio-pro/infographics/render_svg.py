#!/usr/bin/env python3
"""Rasterize an SVG template to PNG using system Chrome via Playwright (offline, no chromium download).

Usage:  python3 render_svg.py <in.svg> <out.png> [scale=2]
Used for the SVG-native infographics (funnel, pyramid, kpi-dashboard, comparison-matrix) where Mermaid
doesn't apply. Mermaid templates render via the mermaid-diagrams skill's render.sh instead.
"""
import sys, re, pathlib

def main():
    if len(sys.argv) < 3:
        print("usage: render_svg.py in.svg out.png [scale]", file=sys.stderr); sys.exit(2)
    svg = pathlib.Path(sys.argv[1]); out = pathlib.Path(sys.argv[2])
    scale = int(sys.argv[3]) if len(sys.argv) > 3 else 2
    text = svg.read_text(encoding="utf-8")
    m = re.search(r'viewBox="0 0 ([\d.]+) ([\d.]+)"', text) or re.search(r'width="(\d+)"\s+height="(\d+)"', text)
    w, h = (int(float(m.group(1))), int(float(m.group(2)))) if m else (1280, 720)
    from playwright.sync_api import sync_playwright
    html = f'<!doctype html><meta charset=utf-8><style>*{{margin:0;padding:0}}</style>{text}'
    with sync_playwright() as p:
        try:
            b = p.chromium.launch(channel="chrome", headless=True, args=["--no-sandbox"])
        except Exception:
            b = p.chromium.launch(headless=True, args=["--no-sandbox"])
        pg = b.new_page(viewport={"width": w, "height": h}, device_scale_factor=scale)
        pg.set_content(html, wait_until="networkidle")
        el = pg.query_selector("svg")
        (el.screenshot(path=str(out)) if el else pg.screenshot(path=str(out)))
        b.close()
    print(f"[svg->png] {svg.name} -> {out}")

if __name__ == "__main__":
    main()
