import { SPATIAL_COLORS } from "./erd-spatial-model";
import { CARD, cardFields, diagram, type DiagramView } from "./erd-spatial-diagram";
import { ZONE_HE, type ErdCatalog, type ErdTable, type ErdEdgeOut } from "./erd-types";
export interface SpatialScene { update:(view:DiagramView)=>void; zoom:(factor:number)=>void; reset:()=>void; dispose:()=>void }
const NS="http://www.w3.org/2000/svg";
function el<K extends keyof HTMLElementTagNameMap>(tag:K,cls:string,text?:string) { const n=document.createElement(tag);n.className=cls;if(text!==undefined)n.textContent=text;return n; }
function svg<K extends keyof SVGElementTagNameMap>(tag:K,attrs:Record<string,string>) { const n=document.createElementNS(NS,tag);for(const [k,v] of Object.entries(attrs))n.setAttribute(k,v);return n; }

// Browser text, including Hebrew, stays sharp at every zoom. CSS perspective
// gives each card shallow depth without rotating the schematic away from view.
export function createSpatialScene(host:HTMLElement,data:ErdCatalog,initial:DiagramView,onPick:(n:string)=>void,onModule:(n:string)=>void,_onLost:()=>void,onRelation?:(id:string)=>void):SpatialScene {
  let view=initial,picture=diagram(data,view),overview=false,scale=1,tx=0,ty=0,dragged=false;
  const byName=new Map(data.tables.map((t)=>[t.n,t]));
  const viewport=el("div","e3-diagram");viewport.dataset.renderer="css-3d";
  const world=el("div","e3-world"),plane=el("div","e3-plane"),note=el("p","e3-camera-note");
  const cards=new Map<string,HTMLButtonElement>(),edgeElements=new Map<string,SVGGElement>();
  world.append(plane);viewport.append(world);host.append(viewport,note);
  const sceneId=`erd-${Math.random().toString(36).slice(2)}`;
  function paint() {
    tx=Math.min(host.clientWidth-50,Math.max(50-picture.width*scale,tx));
    ty=Math.min(host.clientHeight-50,Math.max(50-picture.height*scale,ty));
    world.style.transform=`translate(${tx}px,${ty}px) scale(${scale})`;
    viewport.classList.toggle("is-flat",view.preset==="top");
    viewport.classList.toggle("is-moving",view.motion);
    viewport.classList.toggle("is-orbiting",view.motion&&view.orbit&&!view.selected);
    note.textContent=overview?"בחר מודול לפתיחת הטבלאות והשדות":`${Math.round(scale*100)}% · גרור להזזה · גלול לזום · בחר טבלה או קשר`;
  }
  function frame(names:string[]=[],all=false) {
    world.classList.add("is-flying");
    let pts=names.map((n)=>picture.points.get(n)).filter((p):p is {x:number;y:number}=>!!p);
    const w=Math.max(1,host.clientWidth),h=Math.max(1,host.clientHeight);
    if(w<600&&pts.length>1&&!all)pts=pts.slice(0,1);
    let x=0,y=0,bw=picture.width,bh=picture.height;
    if(pts.length) {x=Math.min(...pts.map((p)=>p.x))-24;y=Math.min(...pts.map((p)=>p.y))-24;bw=Math.max(...pts.map((p)=>p.x))-x+CARD.w+24;bh=Math.max(...pts.map((p)=>p.y))-y+CARD.h+24;}
    scale=Math.max(all?.12:w<600?.78:.55,Math.min((w-32)/bw,(h-42)/bh,1.2));
    tx=(w-bw*scale)/2-x*scale;ty=(h-bh*scale)/2-y*scale;
    if(!all&&!pts.length&&w<600){tx=w-picture.width*scale-16;ty=20-90*scale;}
    paint();
  }
  function highlight(name:string|null) {
    if(overview)return;
    const stage=view.analysis==="flow"?picture.stages.find((s)=>s.index===view.step):undefined;
    const traced=name===view.selected&&["impact","lineage","dep"].includes(view.analysis||"");
    const relevant=traced?new Set(picture.points.keys()):stage?new Set(stage.names):name?new Set([name,...picture.edges.flatMap((e)=>e.p===name?[e.c]:e.c===name?[e.p]:[])]):null;
    for(const [n,card] of cards) {card.classList.toggle("is-selected",n===view.selected);card.setAttribute("aria-pressed",String(n===view.selected));card.classList.toggle("is-dimmed",!!relevant&&!relevant.has(n));card.classList.toggle("is-related",!!relevant&&relevant.has(n)&&n!==view.selected);}
    for(const e of picture.edges) {
      const g=edgeElements.get(e.i)!;
      const active=traced||(stage?stage.names.includes(e.p)||stage.names.includes(e.c):name?e.p===name||e.c===name:view.analysis!=="map");
      g.classList.toggle("is-active",active);g.classList.toggle("is-muted",!!relevant&&!active);
    }
  }
  function makeCard(t:ErdTable) {
    const b=el("button","e3-table-card");b.type="button";b.dir="rtl";b.dataset.table=t.n;b.style.setProperty("--card-color",SPATIAL_COLORS[t.m]);b.setAttribute("aria-label",`הצג שדות וקשרים ${t.n} · ${t.he||t.en}`);
    const header=el("div","e3-card-header"),badge=el("span","e3-card-module",t.m);badge.dir="ltr";header.append(badge,el("span","e3-card-zone",ZONE_HE[t.z]||t.z));
    const title=el("strong","e3-card-title",t.n);title.dir="ltr";
    const subtitle=el("span","e3-card-subtitle",t.he||t.en);subtitle.title=t.he||t.en;
    const body=el("div","e3-card-fields");
    cardFields(t).forEach((f)=>{const row=el("div","e3-card-row");row.dataset.field=f[0];const code=el("code","",f[0]);code.dir="ltr";const desc=el("span","e3-card-field-description",f[2]||f[1]||"לא תועד");desc.title=desc.textContent||"";const key=el("span",/PK/.test(f[3])?"e3-card-key is-pk":"e3-card-key",f[3]==="-"?"":f[3]);key.dir="ltr";row.append(code,desc,key);body.append(row);});
    if(!t.f.length)body.append(el("p","e3-card-empty","לא תועדו שדות בקטלוג"));
    const foot=el("div","e3-card-foot");foot.append(el("span","",`${Math.min(5,t.f.length)} מוצגים · ${t.f.length} שדות בקטלוג`),el("b","","פתח פרטים ↗"));
    b.append(header,title,subtitle,body,foot);
    b.addEventListener("click",(e)=>{if(!dragged||e.detail===0)onPick(t.n);});
    b.addEventListener("focus",()=>{if(!dragged&&!b.matches(":hover"))frame([t.n]);});
    b.addEventListener("pointerenter",()=>highlight(t.n));b.addEventListener("pointerleave",()=>highlight(view.selected));return b;
  }
  function port(t:ErdTable,e:ErdEdgeOut,parent:boolean) {
    const keys=e.j.map((j)=>parent?j.pk:j.fk).filter(Boolean);
    const i=cardFields(t).findIndex((f)=>keys.includes(f[0])||keys.includes(`${t.n}.${f[0]}`));
    return i>=0?137+i*32:82;
  }
  function makeEdges() {
    const layer=svg("svg",{class:"e3-edge-layer",width:String(picture.width),height:String(picture.height),"aria-label":"קשרים מתועדים בין הטבלאות"}),defs=svg("defs",{});layer.append(defs);
    picture.edges.forEach((e,index)=>{
      const a=picture.points.get(e.p)!,b=picture.points.get(e.c)!,color=SPATIAL_COLORS[byName.get(e.p)!.m],id=`${sceneId}-${index}`;
      const marker=svg("marker",{id,viewBox:"0 0 12 12",refX:"10",refY:"6",markerWidth:"11",markerHeight:"11",orient:"auto",markerUnits:"userSpaceOnUse"});marker.append(svg("path",{d:"M2 1 L10 6 L2 11",fill:"none",stroke:color,"stroke-width":"2.4","stroke-linecap":"round","stroke-linejoin":"round"}));defs.append(marker);
      const right=b.x>a.x,same=a.x===b.x,x1=a.x+(right||same?CARD.w:0),x2=b.x+(right?0:CARD.w),y1=a.y+port(byName.get(e.p)!,e,true),y2=b.y+port(byName.get(e.c)!,e,false);
      const mid=same?x1+38+(index%4)*16:(x1+x2)/2+((index%5)-2)*10;
      let d:string;
      if(!same&&Math.abs(a.x-b.x)>CARD.w+CARD.gapX+1){const rail=25+(index%5)*13,sign=right?1:-1,exit=x1+sign*34,enter=x2-sign*34;d=`M${x1} ${y1} H${exit-sign*12} Q${exit} ${y1} ${exit} ${y1-12} V${rail+12} Q${exit} ${rail} ${exit+sign*12} ${rail} H${enter-sign*12} Q${enter} ${rail} ${enter} ${rail+12} V${y2-12} Q${enter} ${y2} ${enter+sign*12} ${y2} H${x2}`;}
      else {const v=y2>=y1?1:-1,h1=mid>x1?1:-1,h2=x2>mid?1:-1,r=Math.min(16,Math.abs(y2-y1)/2,Math.abs(mid-x1),Math.abs(x2-mid));d=`M${x1} ${y1} H${mid-r*h1} Q${mid} ${y1} ${mid} ${y1+r*v} V${y2-r*v} Q${mid} ${y2} ${mid+r*h2} ${y2} H${x2}`;}
      const g=svg("g",{class:"e3-edge",role:"button",tabindex:"0","aria-label":`${e.p} אל ${e.c} · ${e.cd||"עוצמה לא צוינה"} · ${e.ds||"קשר מתועד"}`});g.dataset.edge=e.i;g.style.setProperty("--edge-color",color);
      const title=svg("title",{});title.textContent=`${e.p} → ${e.c}\n${e.ds}\n${e.j.map((j)=>j.j).filter(Boolean).join("\n")}`;
      g.append(title,svg("path",{d,class:"e3-edge-hit"}),svg("path",{d,class:"e3-edge-track","marker-end":`url(#${id})`}),svg("path",{d,class:"e3-edge-pulse"}),svg("circle",{cx:String(x1),cy:String(y1),r:"4",fill:color}));
      if(e.cd){const label=svg("text",{x:String(x1+(right||same?18:-18)),y:String(y1-11),class:"e3-edge-cardinality","text-anchor":right||same?"start":"end"});label.textContent=e.cd;g.append(label);}
      const click=(keyboard=false)=>{if(!dragged||keyboard){if(onRelation)onRelation(e.i);else onPick(e.p);}};
      g.addEventListener("click",()=>click());g.addEventListener("keydown",(event)=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();click(true);}});
      g.addEventListener("pointerenter",()=>{highlight(e.p);g.classList.add("is-active");});g.addEventListener("pointerleave",()=>highlight(view.selected));edgeElements.set(e.i,g);layer.append(g);
    });plane.append(layer);
  }
  function rebuild() {
    plane.replaceChildren();cards.clear();edgeElements.clear();picture=diagram(data,view);overview=!view.module&&!view.selected;
    if(overview){const cols=host.clientWidth<600?1:3,list=el("div","e3-module-gallery");list.style.gridTemplateColumns=`repeat(${cols},340px)`;
      for(const m of data.modules){const card=el("button","e3-module-tile");card.dir="rtl";card.style.setProperty("--card-color",SPATIAL_COLORS[m.code]);card.setAttribute("aria-label",`${m.code} · ${m.he} · פתיחת טבלאות`);const code=el("strong","",m.code);code.dir="ltr";card.append(code,el("h2","",m.he),el("p","",`${m.core.length} טבלאות · ${m.objects.length} אובייקטים`),el("span","","טבלאות, שדות וקשרים ↗"));card.addEventListener("click",(e)=>{if(!dragged||e.detail===0)onModule(m.code);});list.append(card);}
      picture.width=cols*372+60;picture.height=Math.ceil(data.modules.length/cols)*202+60;plane.append(list);
    } else {
      makeEdges();
      if(view.analysis==="flow")for(const s of picture.stages){const p=picture.points.get(s.names[0]);if(!p)continue;const label=el("div","e3-lane-label",`${picture.stages.indexOf(s)+1} · ${s.he}`);label.dir="rtl";label.style.left=`${p.x}px`;label.style.top="82px";plane.append(label);}
      for(const [n,p] of picture.points){const card=makeCard(byName.get(n)!);card.style.left=`${p.x}px`;card.style.top=`${p.y}px`;cards.set(n,card);plane.append(card);}
    }
    plane.style.width=`${picture.width}px`;plane.style.height=`${picture.height}px`;highlight(view.selected);
  }
  function update(next:DiagramView) {
    const changed=next.module!==view.module||next.focus!==view.focus||next.analysis!==view.analysis||(next.selected!==view.selected&&(next.focus||["impact","lineage","dep"].includes(next.analysis||"")||!next.module)),picked=next.selected!==view.selected,stepChanged=next.step!==view.step;
    view=next;if(changed)rebuild();else highlight(view.selected);
    for(const g of edgeElements.values())g.style.display=view.links?"":"none";
    const stage=view.analysis==="flow"?picture.stages.find((s)=>s.index===view.step):undefined;
    if(stage&&(changed||stepChanged||(picked&&!view.selected)))frame(stage.names);
    else if(picked&&view.selected&&!view.focus&&["map","flow",undefined].includes(view.analysis))frame([view.selected]);
    else if(changed)frame();paint();
  }
  const pointers=new Map<number,{x:number;y:number}>();let last={x:0,y:0},origin={x:0,y:0},pinch=0;
  function zoomAt(factor:number,x:number,y:number){world.classList.remove("is-flying");const r=host.getBoundingClientRect(),px=x-r.left,py=y-r.top,next=Math.min(1.8,Math.max(.12,scale/factor));tx=px-(px-tx)*next/scale;ty=py-(py-ty)*next/scale;scale=next;paint();}
  function down(e:PointerEvent){if(e.button!==0)return;world.classList.remove("is-flying");pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});dragged=false;last=origin={x:e.clientX,y:e.clientY};pinch=0;}
  function move(e:PointerEvent){if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===2){const [a,b]=[...pointers.values()],distance=Math.hypot(a.x-b.x,a.y-b.y);if(pinch&&distance)zoomAt(pinch/distance,(a.x+b.x)/2,(a.y+b.y)/2);pinch=distance;dragged=true;return;}if(Math.hypot(e.clientX-origin.x,e.clientY-origin.y)>5){dragged=true;if(!host.hasPointerCapture(e.pointerId))host.setPointerCapture(e.pointerId);tx+=e.clientX-last.x;ty+=e.clientY-last.y;paint();}last={x:e.clientX,y:e.clientY};}
  function up(e:PointerEvent){pointers.delete(e.pointerId);pinch=0;if(host.hasPointerCapture(e.pointerId))host.releasePointerCapture(e.pointerId);const remain=[...pointers.values()][0];if(remain)last=origin=remain;}
  const wheel=(e:WheelEvent)=>{e.preventDefault();zoomAt(Math.exp(Math.max(-100,Math.min(100,e.deltaY))*.002),e.clientX,e.clientY);};
  const key=(e:KeyboardEvent)=>{const offsets:Record<string,[number,number]>={ArrowLeft:[80,0],ArrowRight:[-80,0],ArrowUp:[0,80],ArrowDown:[0,-80]};if(offsets[e.key]){e.preventDefault();world.classList.remove("is-flying");tx+=offsets[e.key][0];ty+=offsets[e.key][1];paint();}};
  host.addEventListener("pointerdown",down);host.addEventListener("pointermove",move);host.addEventListener("pointerup",up);host.addEventListener("pointercancel",up);host.addEventListener("wheel",wheel,{passive:false});host.addEventListener("keydown",key);
  rebuild();frame(view.analysis==="flow"?picture.stages.find((s)=>s.index===view.step)?.names:[]);
  let lastW=host.clientWidth,lastH=host.clientHeight;
  const observer=new ResizeObserver(()=>{const w=host.clientWidth,h=host.clientHeight;if(Math.abs(w-lastW)<2&&Math.abs(h-lastH)<2)return;if(overview&&(w<600)!==(lastW<600))rebuild();const dx=w-lastW,dy=h-lastH;lastW=w;lastH=h;
    const s=view.analysis==="flow"?picture.stages.find((s)=>s.index===view.step):undefined;
    if(view.selected&&!view.focus&&["map","flow"].includes(view.analysis||""))frame([view.selected]);else if(s)frame(s.names);else{tx+=dx/2;ty+=dy/2;paint();}});observer.observe(host);
  return {update,zoom(factor){const r=host.getBoundingClientRect();zoomAt(factor,r.left+r.width/2,r.top+r.height/2);},reset(){frame([],true);},dispose(){observer.disconnect();host.removeEventListener("pointerdown",down);host.removeEventListener("pointermove",move);host.removeEventListener("pointerup",up);host.removeEventListener("pointercancel",up);host.removeEventListener("wheel",wheel);host.removeEventListener("keydown",key);viewport.remove();note.remove();}};
}
