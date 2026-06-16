#!/usr/bin/env python3
"""Inject native PPTX entrance animations + slide transitions into a pptxgenjs deck.

Reuses ppt-master's animation XML generators (create_transition_xml, create_sequence_timing_xml) — it
does NOT modify that skill, only imports it. Adds, per slide:
  - a <p:transition> (fade by default; --transition to override)
  - a <p:timing> entrance sequence over the slide's shapes (after-previous, staggered)
This upgrades the deck from transitions-only to real per-object builds, closing the validation gap.

Usage:
    python3 pptx_animate.py <in.pptx> [<out.pptx>] [--transition fade|push|wipe|morph] [--effect fade|wipe|zoom|fly] [--dur 0.3]
"""
import sys, re, zipfile, shutil, argparse, pathlib

PPT_MASTER = pathlib.Path(__file__).resolve().parents[3] / ".agents/skills/ppt-master/scripts"
sys.path.insert(0, str(PPT_MASTER))
from pptx_animations import create_transition_xml, create_sequence_timing_xml  # noqa: E402

CNVPR = re.compile(r'<p:cNvPr id="(\d+)" name="([^"]*)"')

def effect_for(name, idx, base):
    n = name.lower()
    if any(k in n for k in ("title", "subtitle")): return "fade"
    if "chart" in n or "graphicframe" in n: return "wipe"
    if "image" in n or "picture" in n or "img" in n: return "zoom"
    return base

def animate_slide_xml(xml, transition, base_effect, dur):
    # collect shape ids in document order (skip the first group/tree id if present)
    ids = [(int(m.group(1)), m.group(2)) for m in CNVPR.finditer(xml)]
    # pptxgenjs gives each real shape a cNvPr; keep ids >= 2 (1 is the slide/group)
    shapes = [(i, nm) for i, nm in ids if i >= 2]
    if not shapes:
        return xml
    targets = []
    for k, (sid, nm) in enumerate(shapes):
        eff = effect_for(nm, k, base_effect)
        delay = 0 if k == 0 else int(dur * 1000 * 0.6)
        targets.append((sid, delay, eff, dur))
    trans = create_transition_xml(effect=("fade" if transition == "morph" else transition), duration=0.5)
    timing = create_sequence_timing_xml(targets, duration=dur, trigger="after-previous")
    inject = trans + "\n" + timing
    # insert before </p:sld>
    return xml.replace("</p:sld>", inject + "</p:sld>", 1)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("inp"); ap.add_argument("out", nargs="?")
    ap.add_argument("--transition", default="fade"); ap.add_argument("--effect", default="fade")
    ap.add_argument("--dur", type=float, default=0.3)
    a = ap.parse_args()
    src = pathlib.Path(a.inp); dst = pathlib.Path(a.out) if a.out else src
    tmp = src.with_suffix(".anim.tmp.pptx")
    with zipfile.ZipFile(src) as zin, zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zout:
        n = 0
        for item in zin.namelist():
            data = zin.read(item)
            if re.match(r"ppt/slides/slide\d+\.xml$", item):
                xml = data.decode("utf-8")
                xml = animate_slide_xml(xml, a.transition, a.effect, a.dur)
                data = xml.encode("utf-8"); n += 1
            zout.writestr(item, data)
    shutil.move(str(tmp), str(dst))
    print(f"[pptx-animate] {src.name}: animated {n} slides (transition={a.transition}, effect={a.effect}) -> {dst}")

if __name__ == "__main__":
    main()
