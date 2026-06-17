#!/usr/bin/env python3
"""Build a self-contained HTML deck per output folder: slide PNGs + an animation layer.
Offline (relative png refs, no CDN). Animations applied per animation_plan.json (fade/zoom/scroll).
Keyboard (←/→) + scroll navigation; reduced-motion respected.
"""
import sys, json, pathlib, html

CATS_CSS = {  # category -> entrance animation class
    "fade": "anim-fade", "zoom": "anim-zoom", "progressive_reveal": "anim-fade",
    "scroll_driven": "anim-scroll", "kpi_build_up": "anim-up", "timeline_animation": "anim-right",
    "process_walkthrough": "anim-fade", "dashboard_animation": "anim-up",
}

def build(deck_dir: pathlib.Path):
    slides = sorted((deck_dir / "slides").glob("*.png"))
    plan = []
    pf = deck_dir / "animation_plan.json"
    if pf.exists(): plan = json.loads(pf.read_text())
    cat_by_slide = {p.get("slide"): p.get("category", "fade") for p in plan}
    title = deck_dir.name.replace("_", " ").title()
    secs = []
    for i, s in enumerate(slides, 1):
        cls = CATS_CSS.get(cat_by_slide.get(i, "fade"), "anim-fade")
        rel = f"slides/{s.name}"
        secs.append(f'<section class="slide {cls}" data-i="{i}"><img src="{html.escape(rel)}" alt="slide {i}"/></section>')
    doc = f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{html.escape(title)}</title>
<style>
  :root{{--bg:#0b0e14}}
  *{{margin:0;box-sizing:border-box}}
  body{{background:var(--bg);font-family:'Segoe UI',Arial,sans-serif;color:#e2e8f0}}
  .deck{{scroll-snap-type:y mandatory;height:100vh;overflow-y:scroll}}
  .slide{{scroll-snap-align:start;height:100vh;display:flex;align-items:center;justify-content:center;padding:2vh}}
  .slide img{{max-width:96vw;max-height:96vh;box-shadow:0 10px 40px rgba(0,0,0,.5);border-radius:6px}}
  /* entrance animations (applied when .in) */
  .slide{{opacity:0;transition:opacity .5s ease, transform .5s ease}}
  .anim-fade{{}} .anim-zoom{{transform:scale(.94)}} .anim-up{{transform:translateY(28px)}}
  .anim-right{{transform:translateX(-32px)}} .anim-scroll{{transform:translateY(40px)}}
  .slide.in{{opacity:1;transform:none}}
  .hud{{position:fixed;bottom:14px;right:18px;font-size:12px;color:#94a3b8;background:rgba(0,0,0,.4);padding:4px 10px;border-radius:12px}}
  @media (prefers-reduced-motion: reduce){{.slide{{transition:none;opacity:1;transform:none}}}}
</style></head><body>
<div class="deck" id="deck">
{chr(10).join(secs)}
</div>
<div class="hud" id="hud">1 / {len(slides)}</div>
<script>
  const slides=[...document.querySelectorAll('.slide')], hud=document.getElementById('hud'), deck=document.getElementById('deck');
  // reveal on scroll into view (scroll-driven animation)
  const io=new IntersectionObserver((es)=>es.forEach(e=>{{if(e.isIntersecting){{e.target.classList.add('in');
     hud.textContent=(+e.target.dataset.i)+' / '+slides.length;}}}}),{{threshold:.4}});
  slides.forEach(s=>io.observe(s));
  // keyboard nav
  let cur=0; function go(n){{cur=Math.max(0,Math.min(slides.length-1,n));slides[cur].scrollIntoView({{behavior:'smooth'}});}}
  addEventListener('keydown',e=>{{if(e.key==='ArrowRight'||e.key===' ')go(cur+1);if(e.key==='ArrowLeft')go(cur-1);}});
  slides[0].classList.add('in');
</script></body></html>"""
    out = deck_dir / "index.html"
    out.write_text(doc, encoding="utf-8")
    return out, len(slides)

def main():
    root = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "out")
    for d in sorted(root.iterdir()):
        if (d / "slides").is_dir():
            out, n = build(d)
            print(f"[html] {d.name}: {n} slides -> {out}")

if __name__ == "__main__":
    main()
