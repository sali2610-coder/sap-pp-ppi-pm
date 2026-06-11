#!/usr/bin/env python3
"""Animation Director — map one animation plan to RevealJS / Frontend / PPTX configs.

Usage:
    python3 mapper.py <plan.json> [--target revealjs|frontend|pptx|all]

Input plan (per slide): {
  "slide": 4, "category": "kpi_build_up",
  "elements": ["title","tile_a","tile_b","tile_c","tile_d"],
  "delivery": "live|recorded|web", "duration_s": 0.4
}
One plan → three target-specific configs, so the same intent renders natively everywhere:
- RevealJS: fragments + transitions + (scroll mode for scroll_driven)
- Frontend Slides: framer-motion-style variants + IntersectionObserver for scroll
- PPTX: native animation steps (effect/trigger/duration) for pptxgenjs / ppt-master pptx_animations.py

Pure stdlib. Deterministic.
"""
import sys, json, argparse

CATS = {"fade","zoom","progressive_reveal","scroll_driven","kpi_build_up",
        "timeline_animation","process_walkthrough","dashboard_animation"}

# category -> (revealjs fragment class, frontend effect, pptx effect)
EFFECT = {
    "fade":               ("fade-in",        "fade",       "fade"),
    "zoom":               ("zoom-in",        "scale",      "zoom"),
    "progressive_reveal": ("fade-in",        "fade",       "appear"),
    "scroll_driven":      ("fade-in",        "scroll-fade","fade"),
    "kpi_build_up":       ("fade-up",        "count-up",   "wipe"),
    "timeline_animation": ("fade-right",     "slide-x",    "wipe"),
    "process_walkthrough":("fade-in",        "step-glow",  "appear"),
    "dashboard_animation":("fade-in",        "stagger",    "fade"),
}

def trigger_for(delivery):
    return "on-click" if delivery == "live" else "after-previous"

def revealjs(plan):
    cat = plan["category"]; els = plan.get("elements", []); dur = plan.get("duration_s", 0.4)
    frag = EFFECT[cat][0]
    out = {"slide_transition": "slide" if cat == "timeline_animation" else "fade",
           "fragments": []}
    if cat == "scroll_driven":
        out["scroll_mode"] = True  # Reveal 5: data-reveal scroll view; reveal-on-scroll
        out["note"] = "use Reveal scroll view; each element gets .fragment revealed as it scrolls into view"
    if cat == "zoom":
        out["auto_animate"] = True
    for i, e in enumerate(els):
        out["fragments"].append({"element": e, "class": f"fragment {frag}",
                                 "data-fragment-index": i,
                                 "data-autoslide": int(dur * 1000) if plan.get("delivery") != "live" else None})
    return out

def frontend(plan):
    cat = plan["category"]; els = plan.get("elements", []); dur = plan.get("duration_s", 0.4)
    eff = EFFECT[cat][1]
    variant = {
        "fade":        {"initial": {"opacity": 0}, "animate": {"opacity": 1}},
        "scale":       {"initial": {"opacity": 0, "scale": 0.92}, "animate": {"opacity": 1, "scale": 1}},
        "slide-x":     {"initial": {"opacity": 0, "x": -24}, "animate": {"opacity": 1, "x": 0}},
        "count-up":    {"initial": {"opacity": 0}, "animate": {"opacity": 1}, "counter": True},
        "step-glow":   {"initial": {"opacity": 0.4}, "animate": {"opacity": 1}, "highlight": True},
        "stagger":     {"initial": {"opacity": 0, "y": 12}, "animate": {"opacity": 1, "y": 0}},
        "scroll-fade": {"initial": {"opacity": 0, "y": 24}, "whileInView": {"opacity": 1, "y": 0}},
    }[eff]
    base = {"effect": eff, "transition": {"duration": dur, "ease": "easeOut"},
            "stagger_children_s": round(dur * 0.5, 2),
            "trigger": "in-view" if cat == "scroll_driven" else "mount-sequence",
            "variant": variant,
            "elements": els}
    if cat == "scroll_driven":
        base["observer"] = "IntersectionObserver(threshold:0.3)"
    if cat == "kpi_build_up":
        base["counter"] = {"from": 0, "to": "<value>", "duration_s": max(0.8, dur)}
    return base

def pptx(plan):
    cat = plan["category"]; els = plan.get("elements", []); dur = plan.get("duration_s", 0.4)
    eff = EFFECT[cat][2]; delivery = plan.get("delivery", "live")
    if cat == "scroll_driven":
        # PPTX has no scroll; degrade to a timed auto-build
        delivery = "recorded"
    steps = []
    trig = trigger_for(delivery)
    for i, e in enumerate(els):
        steps.append({"element": e, "effect": eff,
                      "trigger": "on-click" if (trig == "on-click" and i > 0) else ("on-click" if i == 0 and trig == "on-click" else "after-previous"),
                      "duration_s": dur, "order": i})
    cfg = {"slide_transition": "morph" if cat == "zoom" else ("push" if cat == "timeline_animation" else "fade"),
           "auto_advance_s": (1.5 if delivery != "live" else None),
           "steps": steps,
           "tool": "ppt-master scripts/pptx_animations.py / pptxgenjs slide transition"}
    if cat == "scroll_driven":
        cfg["degraded"] = "no scroll in PPTX → timed progressive build instead"
    return cfg

def map_plan(plan, target):
    if plan["category"] not in CATS:
        raise SystemExit(f"unknown category {plan['category']!r}; allowed: {sorted(CATS)}")
    res = {"slide": plan.get("slide"), "category": plan["category"]}
    if target in ("revealjs", "all"): res["revealjs"] = revealjs(plan)
    if target in ("frontend", "all"): res["frontend"] = frontend(plan)
    if target in ("pptx", "all"): res["pptx"] = pptx(plan)
    return res

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("plan"); ap.add_argument("--target", default="all",
                    choices=["revealjs","frontend","pptx","all"])
    a = ap.parse_args()
    data = json.load(open(a.plan))
    plans = data if isinstance(data, list) else [data]
    print(json.dumps([map_plan(p, a.target) for p in plans], indent=2))

if __name__ == "__main__":
    main()
