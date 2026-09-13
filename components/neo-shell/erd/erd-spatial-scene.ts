import { SPATIAL_COLORS } from "./erd-spatial-model";
import { CARD, cardFields, diagram, s4Changed, s4FieldChanged, type DiagramView } from "./erd-spatial-diagram";
import { fitSpatial, type SpatialCamera } from "./erd-spatial-viewport";
import { S4_TRUST_HE, ZONE_HE, type ErdCatalog, type ErdTable, type ErdEdgeOut } from "./erd-types";
export interface SpatialScene { update:(view:DiagramView)=>void; zoom:(factor:number)=>void; reset:()=>void; dispose:()=>void }
const NS="http://www.w3.org/2000/svg";
function el<K extends keyof HTMLElementTagNameMap>(tag:K,cls:string,text?:string) { const n=document.createElement(tag);n.className=cls;if(text!==undefined)n.textContent=text;return n; }
function svg<K extends keyof SVGElementTagNameMap>(tag:K,attrs:Record<string,string>) { const n=document.createElementNS(NS,tag);for(const [k,v] of Object.entries(attrs))n.setAttribute(k,v);return n; }

// Browser text, including Hebrew, stays sharp at every zoom. CSS perspective
// gives each card shallow depth without rotating the schematic away from view.
export function createSpatialScene(host:HTMLElement,data:ErdCatalog,initial:DiagramView,onPick:(n:string)=>void,onModule:(n:string)=>void,_onLost:()=>void,onRelation?:(id:string)=>void):SpatialScene {
  let view=initial,picture=diagram(data,view),overview=false,scale=1,tx=0,ty=0,dragged=false;
  let drawn=picture.points,drawnSizes=picture.sizes,animation=0;
  let lastW=host.clientWidth,lastH=host.clientHeight;
  const cameraContext=(v:DiagramView)=>JSON.stringify([v.module,v.group??null,v.analysis??"map",v.step??null,v.focus,v.crossModule??false]);
  let returnCamera:(SpatialCamera & {width:number;height:number;context:string})|null=null;
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
    plane.style.setProperty("--edge-unit", String(1 / scale));
    viewport.classList.toggle("is-flat",view.preset==="top");
    viewport.classList.toggle("is-moving",view.motion);
    viewport.classList.toggle("is-orbiting",view.motion&&view.orbit&&!view.selected);
    note.textContent=overview?"בחר מודול לפתיחת הטבלאות והשדות":`${Math.round(scale*100)}% · גרור להזזה · גלול לזום · בחר טבלה או קשר`;
  }
  function frame(names:string[]=[],all=false) {
    world.classList.add("is-flying");
    const w=Math.max(1,host.clientWidth),h=Math.max(1,host.clientHeight);
    const entries=[...picture.points].filter(([n])=>!names.length||all||names.includes(n));
    let x=0,y=0,bw=picture.width,bh=picture.height;
    if(!overview&&entries.length) {
      x=Math.min(...entries.map(([,p])=>p.x))-24;
      y=Math.min(...entries.map(([,p])=>p.y))-24;
      if(view.focus)y=Math.min(y,24);
      else if((!names.length||all)&&picture.edges.some((e)=>Math.abs(picture.points.get(e.p)!.x-picture.points.get(e.c)!.x)>CARD.w+CARD.gapX+1))y=12;
      // Same-rank connectors bend around the right side of the cards.
      const sideRail=(!names.length||all)&&picture.edges.some((e)=>picture.points.get(e.p)?.x===picture.points.get(e.c)?.x);
      bw=Math.max(...entries.map(([,p])=>p.x+CARD.w))+(sideRail?104:24)-x;
      bh=Math.max(...entries.map(([n,p])=>p.y+picture.sizes.get(n)!))+32-y;
    }
    const camera=fitSpatial({x,y,w:bw,h:bh},w,h);
    scale=camera.scale;tx=camera.x;ty=camera.y;lastW=w;lastH=h;
    paint();
  }
  function highlight(name:string|null) {
    if(overview)return;
    // An analysis keeps its chosen anchor while the pointer moves over results.
    if(view.selected)name=view.selected;
    const traced=!!name&&["impact","lineage","dep"].includes(view.analysis||"");
    const relevant=traced||picture.seeds?new Set(picture.points.keys()):name?new Set([name,...picture.edges.flatMap((e)=>e.p===name?[e.c]:e.c===name?[e.p]:[])]):null;
    for(const [n,card] of cards) {
      const selected=n===view.selected,expanded=selected&&(view.expanded??true);
      card.classList.toggle("is-selected",expanded);card.classList.toggle("is-anchor",selected);
      card.setAttribute("aria-pressed",String(selected));card.setAttribute("aria-expanded",String(expanded));
      card.setAttribute("aria-label",`${selected ? "חזרה לתרשים" : traced ? "ניתוח הקשרים של" : "הצג שדות וקשרים"} ${n} · ${byName.get(n)?.he||byName.get(n)?.en||""}`);
      card.classList.toggle("is-dimmed",!!relevant&&!relevant.has(n));card.classList.toggle("is-related",!!relevant&&relevant.has(n)&&!selected);card.classList.toggle("is-process",!!picture.seeds?.has(n));
    }
    let animated=0;
    for(const e of picture.edges) {
      const g=edgeElements.get(e.i)!;
      const active=traced||!!picture.seeds||!name||e.p===name||e.c===name;
      g.classList.toggle("is-active",active);g.classList.toggle("is-muted",!!relevant&&!active);
      g.classList.toggle("is-animated",active&&animated++<40);
    }
  }
  function makeCard(t:ErdTable) {
    const b=el("button","e3-table-card");b.type="button";b.dir="rtl";b.dataset.table=t.n;b.style.setProperty("--card-color",SPATIAL_COLORS[t.m]);b.setAttribute("aria-label",`הצג שדות וקשרים ${t.n} · ${t.he||t.en}`);
    const header=el("div","e3-card-header"),badge=el("span","e3-card-module",t.m);badge.dir="ltr";header.append(badge,el("span","e3-card-zone",ZONE_HE[t.z]||t.z));
    if(s4Changed(t)&&t.s4v){const s4=el("span","e3-card-s4",t.s4v.t==="verified"?"S/4 Δ":"S/4 · חלקי");s4.dataset.risk=t.s4v.r;s4.title=`${t.s4v.ch} · ${S4_TRUST_HE[t.s4v.t]}`;header.append(s4);}
    const title=el("strong","e3-card-title",t.n);title.dir="ltr";
    const subtitle=el("span","e3-card-subtitle",t.he||t.en);subtitle.title=t.he||t.en;
    const summary=el("div","e3-card-summary"),keys=el("code","",t.pk.length?`PK ${t.pk.slice(0,2).join(" · ")}${t.pk.length>2?` +${t.pk.length-2}`:""}`:"ללא PK מתועד");keys.dir="ltr";summary.append(keys,el("span","",`${t.f.length} שדות ↗`));
    const body=el("div","e3-card-fields");
    cardFields(t).forEach((f)=>{const row=el("div","e3-card-row");row.dataset.field=f[0];row.classList.toggle("is-s4-changed",s4FieldChanged(t,f[0]));if(s4FieldChanged(t,f[0]))row.title="שדה שהשתנה ב־S/4HANA לפי הקטלוג";const code=el("code","",f[0]);code.dir="ltr";const desc=el("span","e3-card-field-description",f[2]||f[1]||"לא תועד");desc.title=desc.textContent||"";const key=el("span",/PK/.test(f[3])?"e3-card-key is-pk":"e3-card-key",f[3]==="-"?"":f[3]);key.dir="ltr";row.append(code,desc,key);body.append(row);});
    if(!t.f.length)body.append(el("p","e3-card-empty","לא תועדו שדות בקטלוג"));
    const foot=el("div","e3-card-foot");foot.append(el("span","",`${Math.min(5,t.f.length)} מוצגים · ${t.f.length} שדות בקטלוג`),el("b","","כל הנתונים בחלון הפרטים"));
    b.append(header,title,subtitle,summary,body,foot);
    b.addEventListener("click",(e)=>{if(!dragged||e.detail===0)onPick(t.n);});
    b.addEventListener("focus",()=>{if(!dragged&&!b.matches(":hover"))frame([t.n]);});
    b.addEventListener("pointerenter",()=>highlight(t.n));b.addEventListener("pointerleave",()=>highlight(view.selected));return b;
  }
  function port(t:ErdTable,e:ErdEdgeOut,parent:boolean) {
    const keys=e.j.map((j)=>parent?j.pk:j.fk).filter(Boolean);
    const i=cardFields(t).findIndex((f)=>keys.includes(f[0])||keys.includes(`${t.n}.${f[0]}`));
    const expanded=Math.max(0,Math.min(1,((drawnSizes.get(t.n)||CARD.h)-CARD.h)/(CARD.openH-CARD.h)));
    return 86+((i>=0?130+i*32:86)-86)*expanded;
  }
  function edgeRoute(e:ErdEdgeOut,index:number) {
    const a=drawn.get(e.p)!,b=drawn.get(e.c)!;
      const right=b.x>a.x,same=a.x===b.x,x1=a.x+(right||same?CARD.w:0),x2=b.x+(right?0:CARD.w),y1=a.y+port(byName.get(e.p)!,e,true),y2=b.y+port(byName.get(e.c)!,e,false);
      const mid=same?x1+38+(index%4)*16:(x1+x2)/2+((index%5)-2)*10;
      let d:string;
      if(e.p===e.c) {
        const rail=x1+50,lower=y1+45;
        d=`M${x1} ${y1} H${rail-12} Q${rail} ${y1} ${rail} ${y1+12} V${lower-12} Q${rail} ${lower} ${rail-12} ${lower} H${x1}`;
      } else if(!same&&Math.abs(a.x-b.x)>CARD.w+CARD.gapX+1){const rail=25+(index%5)*13,sign=right?1:-1,exit=x1+sign*34,enter=x2-sign*34;d=`M${x1} ${y1} H${exit-sign*12} Q${exit} ${y1} ${exit} ${y1-12} V${rail+12} Q${exit} ${rail} ${exit+sign*12} ${rail} H${enter-sign*12} Q${enter} ${rail} ${enter} ${rail+12} V${y2-12} Q${enter} ${y2} ${enter+sign*12} ${y2} H${x2}`;}
      else {const v=y2>=y1?1:-1,h1=mid>x1?1:-1,h2=x2>mid?1:-1,r=Math.min(16,Math.abs(y2-y1)/2,Math.abs(mid-x1),Math.abs(x2-mid));d=`M${x1} ${y1} H${mid-r*h1} Q${mid} ${y1} ${mid} ${y1+r*v} V${y2-r*v} Q${mid} ${y2} ${mid+r*h2} ${y2} H${x2}`;}
    return {d,x1,y1,right,same};
  }
  function positionElements() {
    for(const [n,p] of drawn){const card=cards.get(n);if(card){card.style.left=`${p.x}px`;card.style.top=`${p.y}px`;card.style.height=`${drawnSizes.get(n)}px`;}}
    picture.edges.forEach((e,index)=>{
      const g=edgeElements.get(e.i);if(!g)return;
      const r=edgeRoute(e,index);
      g.querySelectorAll("path").forEach((p)=>p.setAttribute("d",r.d));
      const circle=g.querySelector("circle");circle?.setAttribute("cx",String(r.x1));circle?.setAttribute("cy",String(r.y1));
      const label=g.querySelector("text");if(label){label.setAttribute("x",String(r.x1+(r.right||r.same?18:-18)));label.setAttribute("y",String(r.y1-11));label.setAttribute("text-anchor",r.right||r.same?"start":"end");}
    });
  }
  function makeEdges() {
    const layer=svg("svg",{class:"e3-edge-layer",width:String(picture.width),height:String(picture.height),"aria-label":"קשרים מתועדים בין הטבלאות"}),defs=svg("defs",{});layer.append(defs);
    picture.edges.forEach((e,index)=>{
      const color=SPATIAL_COLORS[byName.get(e.p)!.m],id=`${sceneId}-${index}`;
      const marker=svg("marker",{id,viewBox:"0 0 12 12",refX:"10",refY:"6",markerWidth:"4.5",markerHeight:"4.5",orient:"auto",markerUnits:"strokeWidth"});marker.append(svg("path",{d:"M2 1 L10 6 L2 11",fill:"none",stroke:color,"stroke-width":"2.4","stroke-linecap":"round","stroke-linejoin":"round"}));defs.append(marker);
      const {d,x1,y1,right,same}=edgeRoute(e,index);
      const g=svg("g",{class:"e3-edge",role:"button",tabindex:"0","aria-label":`${e.p} אל ${e.c} · ${e.cd||"עוצמה לא צוינה"} · ${e.ds||"קשר מתועד"}`});g.dataset.edge=e.i;g.dataset.source=e.p;g.dataset.target=e.c;g.style.setProperty("--edge-color",color);
      const title=svg("title",{});title.textContent=`${e.p} → ${e.c}\n${e.ds}\n${e.j.map((j)=>j.j).filter(Boolean).join("\n")}`;
      g.append(title,svg("path",{d,class:"e3-edge-hit"}),svg("path",{d,class:"e3-edge-track","marker-end":`url(#${id})`}),svg("path",{d,class:"e3-edge-pulse"}),svg("circle",{cx:String(x1),cy:String(y1),r:"4",class:"e3-edge-dot",fill:color}));
      if(e.cd){const label=svg("text",{x:String(x1+(right||same?18:-18)),y:String(y1-11),class:"e3-edge-cardinality","text-anchor":right||same?"start":"end"});label.textContent=e.cd;g.append(label);}
      const click=(keyboard=false)=>{if(!dragged||keyboard){if(onRelation)onRelation(e.i);else onPick(e.p);}};
      g.addEventListener("click",()=>click());g.addEventListener("keydown",(event)=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();click(true);}});
      g.addEventListener("pointerenter",()=>{highlight(e.p);g.classList.add("is-active");});g.addEventListener("pointerleave",()=>highlight(view.selected));edgeElements.set(e.i,g);layer.append(g);
    });layer.style.width=`${picture.width}px`;layer.style.height=`${picture.height}px`;plane.append(layer);
  }
  function rebuild() {
    cancelAnimationFrame(animation);
    const previous=new Map(drawn),previousSizes=new Map(drawnSizes),previousCards=new Map(cards);
    plane.replaceChildren();cards.clear();edgeElements.clear();picture=diagram(data,view);overview=!view.module&&!view.selected;
    const animate=view.motion&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&previousCards.size>0&&!overview;
    drawn=new Map([...picture.points].map(([n,p])=>[n,animate?previous.get(n)||p:p]));
    drawnSizes=new Map([...picture.sizes].map(([n,h])=>[n,animate?previousSizes.get(n)||h:h]));
    if(overview){const cols=host.clientWidth<600?1:3,list=el("div","e3-module-gallery");list.style.gridTemplateColumns=`repeat(${cols},340px)`;
      for(const m of data.modules){const card=el("button","e3-module-tile");card.dir="rtl";card.style.setProperty("--card-color",SPATIAL_COLORS[m.code]);card.setAttribute("aria-label",`${m.code} · ${m.he} · פתיחת טבלאות`);const code=el("strong","",m.code);code.dir="ltr";card.append(code,el("h2","",m.he),el("p","",`${m.core.length} טבלאות · ${m.objects.length} אובייקטים`),el("span","","טבלאות, שדות וקשרים ↗"));card.addEventListener("click",(e)=>{if(!dragged||e.detail===0)onModule(m.code);});list.append(card);}
      picture.width=cols*372+60;picture.height=Math.ceil(data.modules.length/cols)*202+60;plane.append(list);
    } else {
      makeEdges();
      for(const lane of picture.lanes){const p=picture.points.get(lane.names[0])!;const label=el("div","e3-lane-label",lane.label);label.dir="rtl";label.style.left=`${p.x}px`;label.style.top="65px";plane.append(label);}
      for(const [n,p] of drawn){const card=previousCards.get(n)||makeCard(byName.get(n)!);card.style.opacity="";card.style.left=`${p.x}px`;card.style.top=`${p.y}px`;cards.set(n,card);plane.append(card);}
    }
    plane.style.width=`${picture.width}px`;plane.style.height=`${picture.height}px`;highlight(view.selected);positionElements();
    for(const g of edgeElements.values())g.style.display=view.links?"":"none";
    if(animate){
      const start=performance.now(),from=new Map(drawn),fromSizes=new Map(drawnSizes);
      const tick=(time:number)=>{
        const progress=Math.max(0,Math.min(1,(time-start)/650)),eased=1-Math.pow(1-progress,3);
        drawn=new Map([...picture.points].map(([n,p])=>{const a=from.get(n)||p;return [n,{x:a.x+(p.x-a.x)*eased,y:a.y+(p.y-a.y)*eased}];}));
        drawnSizes=new Map([...picture.sizes].map(([n,h])=>[n,(fromSizes.get(n)||h)+(h-(fromSizes.get(n)||h))*eased]));
        positionElements();
        for(const [n,card] of cards)if(!previousCards.has(n))card.style.opacity=progress<1?String(eased):"";
        if(progress<1)animation=requestAnimationFrame(tick);else animation=0;
      };
      animation=requestAnimationFrame(tick);
    }
  }
  function update(next:DiagramView) {
    const scopeChanged=next.module!==view.module||next.group!==view.group;
    const picked=next.selected!==view.selected,changed=scopeChanged||next.focus!==view.focus||next.analysis!==view.analysis||picked||next.step!==view.step||next.expanded!==view.expanded||next.crossModule!==view.crossModule;
    if(scopeChanged)returnCamera=null;
    if(picked&&next.selected&&!view.selected&&!scopeChanged)returnCamera={scale,x:tx,y:ty,width:lastW,height:lastH,context:cameraContext(view)};
    const restore=picked&&!next.selected&&returnCamera?.context===cameraContext(next)?returnCamera:null;
    if(picked&&!next.selected)returnCamera=null;
    view=next;if(changed)rebuild();else highlight(view.selected);
    if(!view.motion&&animation){cancelAnimationFrame(animation);animation=0;drawn=picture.points;drawnSizes=picture.sizes;for(const card of cards.values())card.style.opacity="";positionElements();}
    for(const g of edgeElements.values())g.style.display=view.links?"":"none";
    if(restore&&Math.abs(restore.width-host.clientWidth)<2&&Math.abs(restore.height-host.clientHeight)<2){world.classList.add("is-flying");scale=restore.scale;tx=restore.x;ty=restore.y;lastW=host.clientWidth;lastH=host.clientHeight;}
    else if(changed&&view.selected&&(view.expanded??true)&&!view.focus)frame([view.selected]);
    else if(changed)frame();paint();
  }
  const pointers=new Map<number,{x:number;y:number}>();let last={x:0,y:0},origin={x:0,y:0},pinch=0;
  function zoomAt(factor:number,x:number,y:number){world.classList.remove("is-flying");const r=host.getBoundingClientRect(),px=x-r.left,py=y-r.top,next=Math.min(3.5,Math.max(.02,scale/factor));tx=px-(px-tx)*next/scale;ty=py-(py-ty)*next/scale;scale=next;paint();}
  function down(e:PointerEvent){if(e.button!==0)return;world.classList.remove("is-flying");pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});dragged=false;last=origin={x:e.clientX,y:e.clientY};pinch=0;}
  function move(e:PointerEvent){if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===2){const [a,b]=[...pointers.values()],distance=Math.hypot(a.x-b.x,a.y-b.y);if(pinch&&distance)zoomAt(pinch/distance,(a.x+b.x)/2,(a.y+b.y)/2);pinch=distance;dragged=true;return;}if(Math.hypot(e.clientX-origin.x,e.clientY-origin.y)>5){dragged=true;if(!host.hasPointerCapture(e.pointerId))host.setPointerCapture(e.pointerId);tx+=e.clientX-last.x;ty+=e.clientY-last.y;paint();}last={x:e.clientX,y:e.clientY};}
  function up(e:PointerEvent){pointers.delete(e.pointerId);pinch=0;if(host.hasPointerCapture(e.pointerId))host.releasePointerCapture(e.pointerId);const remain=[...pointers.values()][0];if(remain)last=origin=remain;}
  const wheel=(e:WheelEvent)=>{e.preventDefault();zoomAt(Math.exp(Math.max(-100,Math.min(100,e.deltaY))*.002),e.clientX,e.clientY);};
  const key=(e:KeyboardEvent)=>{const offsets:Record<string,[number,number]>={ArrowLeft:[80,0],ArrowRight:[-80,0],ArrowUp:[0,80],ArrowDown:[0,-80]};if(offsets[e.key]){e.preventDefault();world.classList.remove("is-flying");tx+=offsets[e.key][0];ty+=offsets[e.key][1];paint();}};
  host.addEventListener("pointerdown",down);host.addEventListener("pointermove",move);host.addEventListener("pointerup",up);host.addEventListener("pointercancel",up);host.addEventListener("wheel",wheel,{passive:false});host.addEventListener("keydown",key);
  rebuild();frame();
  const observer=new ResizeObserver(()=>{const w=host.clientWidth,h=host.clientHeight;if(Math.abs(w-lastW)<2&&Math.abs(h-lastH)<2)return;if(overview&&(w<600)!==(lastW<600))rebuild();lastW=w;lastH=h;
    if(view.selected&&(view.expanded??true)&&!view.focus)frame([view.selected]);else frame();});observer.observe(host);
  return {update,zoom(factor){const r=host.getBoundingClientRect();zoomAt(factor,r.left+r.width/2,r.top+r.height/2);},reset(){returnCamera=null;frame([],true);},dispose(){cancelAnimationFrame(animation);observer.disconnect();host.removeEventListener("pointerdown",down);host.removeEventListener("pointermove",move);host.removeEventListener("pointerup",up);host.removeEventListener("pointercancel",up);host.removeEventListener("wheel",wheel);host.removeEventListener("keydown",key);viewport.remove();note.remove();}};
}
