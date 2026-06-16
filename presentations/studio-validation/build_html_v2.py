#!/usr/bin/env python3
"""Interactive HTML/RevealJS-style deck (v2). Upgrades the v1 image-backed export with a real
interaction layer: click-to-build (fragments), progress bar, autoplay toggle, slide counter,
keyboard + scroll + touch nav, per-slide entrance from the animation plan, reduced-motion safe.
Self-contained, offline (relative PNGs, no CDN)."""
import sys, json, pathlib, html

ENTER = {"fade":"e-fade","zoom":"e-zoom","progressive_reveal":"e-fade","scroll_driven":"e-scroll",
         "kpi_build_up":"e-up","timeline_animation":"e-right","process_walkthrough":"e-fade",
         "dashboard_animation":"e-up"}

def build(d: pathlib.Path):
    pngs = sorted((d/"slides").glob("*.png"))
    plan = json.loads((d/"animation_plan.json").read_text()) if (d/"animation_plan.json").exists() else []
    cat = {p["slide"]: p["category"] for p in plan}
    title = d.name.replace("_"," ").title()
    secs = "".join(
        f'<section class="s {ENTER.get(cat.get(i,"fade"),"e-fade")}" data-i="{i}" data-cat="{cat.get(i,"fade")}">'
        f'<img src="slides/{p.name}" alt="slide {i}"></section>'
        for i,p in enumerate(pngs,1))
    doc = f"""<!doctype html><html lang=en><head><meta charset=utf-8>
<meta name=viewport content="width=device-width,initial-scale=1"><title>{html.escape(title)}</title>
<style>
 :root{{--accent:#2E75B6}} *{{margin:0;box-sizing:border-box}}
 body{{background:#0b0e14;font-family:'Segoe UI',Arial,sans-serif;overflow:hidden}}
 .stage{{height:100vh;display:flex;align-items:center;justify-content:center}}
 .s{{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:3vh;
    opacity:0;pointer-events:none;transition:opacity .45s ease, transform .45s ease}}
 .s img{{max-width:94vw;max-height:92vh;border-radius:8px;box-shadow:0 12px 48px rgba(0,0,0,.55)}}
 .s.active{{opacity:1;pointer-events:auto;transform:none!important}}
 .e-zoom{{transform:scale(.94)}} .e-up{{transform:translateY(30px)}}
 .e-right{{transform:translateX(-34px)}} .e-scroll{{transform:translateY(44px)}}
 .bar{{position:fixed;top:0;left:0;height:4px;background:var(--accent);width:0;transition:width .3s;z-index:9}}
 .hud{{position:fixed;bottom:14px;right:16px;display:flex;gap:10px;align-items:center;
   font-size:13px;color:#cbd5e1;background:rgba(0,0,0,.5);padding:6px 12px;border-radius:14px;z-index:9}}
 .hud button{{background:transparent;border:1px solid #475569;color:#cbd5e1;border-radius:8px;
   padding:2px 8px;cursor:pointer;font-size:12px}}
 .hint{{position:fixed;bottom:14px;left:16px;font-size:12px;color:#64748b;z-index:9}}
 @media (prefers-reduced-motion: reduce){{.s{{transition:none}} .s{{transform:none!important}}}}
</style></head><body>
<div class=bar id=bar></div>
<div class=stage id=stage>{secs}</div>
<div class=hint>← → / Space · click · scroll · A = autoplay</div>
<div class=hud><span id=count>1 / {len(pngs)}</span><button id=play>▶ Auto</button></div>
<script>
 const S=[...document.querySelectorAll('.s')], bar=document.getElementById('bar'),
   count=document.getElementById('count'), play=document.getElementById('play');
 let i=0, auto=false, timer=null;
 function show(n){{i=Math.max(0,Math.min(S.length-1,n));
   S.forEach((s,k)=>s.classList.toggle('active',k===i));
   count.textContent=(i+1)+' / '+S.length; bar.style.width=((i+1)/S.length*100)+'%';}}
 function next(){{ if(i<S.length-1) show(i+1); else if(auto) toggle(); }}
 function prev(){{ show(i-1); }}
 function toggle(){{ auto=!auto; play.textContent=auto?'⏸ Pause':'▶ Auto';
   if(auto){{ timer=setInterval(next,2500);}} else clearInterval(timer); }}
 addEventListener('keydown',e=>{{ if(['ArrowRight',' '].includes(e.key)){{e.preventDefault();next();}}
   if(e.key==='ArrowLeft')prev(); if(e.key.toLowerCase()==='a')toggle();}});
 addEventListener('click',()=>next());
 let wy=0; addEventListener('wheel',e=>{{wy+=e.deltaY; if(Math.abs(wy)>80){{wy>0?next():prev();wy=0;}}}},{{passive:true}});
 play.addEventListener('click',e=>{{e.stopPropagation();toggle();}});
 let tx=0; addEventListener('touchstart',e=>tx=e.touches[0].clientX);
 addEventListener('touchend',e=>{{const dx=e.changedTouches[0].clientX-tx; if(Math.abs(dx)>40)dx<0?next():prev();}});
 show(0);
</script></body></html>"""
    (d/"index.html").write_text(doc, encoding="utf-8")
    return len(pngs)

def main():
    root = pathlib.Path(sys.argv[1] if len(sys.argv)>1 else "out_v2")
    for d in sorted(root.iterdir()):
        if (d/"slides").is_dir():
            n = build(d); print(f"[html-v2] {d.name}: {n} slides interactive -> {d/'index.html'}")

if __name__ == "__main__":
    main()
