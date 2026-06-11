// ===================== NEO SAP Architecture — Control Room =====================
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const stage=d3.select('#stage'), root=d3.select('#zoomRoot'), tip=$('#tip');
const W=()=>$('#main').clientWidth, H=()=>$('#main').clientHeight;
const color=m=>DATA.palette[m]||'#8493a6';
const tableByName=Object.fromEntries(DATA.tables.map(t=>[t.name,t]));
const sharedSet=new Set(DATA.shared.map(s=>s.name));
const modOf=Object.fromEntries(DATA.tables.map(t=>[t.name,t.mod]));

// ---- state ----
const st={view:'landscape', mods:new Set(DATA.modules.map(m=>m.code)),
  crossOnly:false, sharedOnly:false, labels:true, q:''};

// ---- tooltip ----
function showTip(html,e){tip.innerHTML=html;tip.style.visibility='visible';
  const w=320; tip.style.left=Math.min(e.clientX+14, innerWidth-w-10)+'px';
  tip.style.top=Math.max(12,e.clientY-10)+'px';}
function hideTip(){tip.style.visibility='hidden';}

// ---- clock + live count ----
function tick(){const d=new Date();$('#clock').textContent=[d.getHours(),d.getMinutes(),d.getSeconds()].map(x=>String(x).padStart(2,'0')).join(':');}
setInterval(tick,1000);tick();

// ---- KPI counters (count-up) ----
const c=DATA.meta.counts;
const KPIS=[['טבלאות',c.tables],['קשרים',c.edges],['מודולים',c.modules],['אובייקטים משותפים',c.shared],['ממשקים',c.interfaces]];
$('#kpis').innerHTML=KPIS.map(([k,v])=>`<div class="kpi"><b data-to="${v}">0</b><span>${k}</span></div>`).join('');
$$('#kpis .kpi b').forEach(el=>{const to=+el.dataset.to;let n=0;const step=Math.max(1,Math.round(to/28));
  const iv=setInterval(()=>{n+=step;if(n>=to){n=to;clearInterval(iv);}el.textContent=n;},22);});

// ---- rail inset (so rail never occludes fitted content) ----
function railInset(){const r=$('#rail');if(!r)return 0;const cs=getComputedStyle(r);
  if(cs.display==='none'||r.classList.contains('collapsed')) return 0;
  if(window.matchMedia('(max-width:820px)').matches) return 0; // drawer overlays, don't pad
  return r.getBoundingClientRect().width+28;}

// ---- zoom ----
const zoom=d3.zoom().scaleExtent([0.12,7]).on('zoom',e=>{root.attr('transform',e.transform);updateMini(e.transform);});
stage.call(zoom);
function fit(pad=0.9){try{const b=root.node().getBBox();if(!b.width)return;
  const inset=railInset();const w=W()-inset,h=H();   // rail occupies the right (RTL inline-start); usable area is the left band [0,w]
  const s=Math.min(w/b.width,h/b.height)*pad;
  const tx=w/2-s*(b.x+b.width/2),ty=h/2-s*(b.y+b.height/2);
  stage.interrupt();stage.transition().duration(550).call(zoom.transform,d3.zoomIdentity.translate(tx,ty).scale(s));}catch(_){}}
function resetZoom(){stage.transition().duration(450).call(zoom.transform,d3.zoomIdentity);}
$('#fitBtn').onclick=()=>fit(0.9);

// ===================== TABS =====================
const VIEWS=[
  {id:'landscape',he:'נוף מלא',en:'Landscape'},
  {id:'zones',he:'אזורים',en:'Zones'},
  {id:'business',he:'עסקית',en:'Business'},
  {id:'functional',he:'פונקציונלית',en:'Functional'},
  {id:'technical',he:'טכנית',en:'Technical'},
  {id:'database',he:'מסד נתונים',en:'Database'},
  {id:'integration',he:'אינטגרציה',en:'Integration'},
  {id:'s4',he:'S/4HANA',en:'S/4HANA'},
];
$('#tabs').innerHTML=VIEWS.map(v=>`<button data-v="${v.id}" class="${v.id==='landscape'?'on':''}">${v.he}<span class="en">${v.en}</span></button>`).join('');
function setView(v){st.view=v;$$('#tabs button').forEach(x=>x.classList.toggle('on',x.dataset.v===v));render();}
$$('#tabs button').forEach(b=>b.onclick=()=>setView(b.dataset.v));

// ---- zoom presets (Business / Functional / Technical / Enterprise) ----
const PRESETS={business:'business',functional:'functional',technical:'technical',enterprise:'zones'};
$$('#presets button').forEach(b=>b.onclick=()=>{
  $$('#presets button').forEach(x=>x.classList.remove('on'));b.classList.add('on');
  setView(PRESETS[b.dataset.p]);});

// ---- rail toggle / mobile drawer ----
const isMobile=()=>window.matchMedia('(max-width:820px)').matches;
function openRail(){const r=$('#rail');if(isMobile())r.classList.add('open-m');else r.classList.remove('collapsed');}
function closeRail(){const r=$('#rail');if(isMobile())r.classList.remove('open-m');else r.classList.add('collapsed');setTimeout(()=>fit(0.9),320);}
$('#railToggle').onclick=()=>{const r=$('#rail');(isMobile()?r.classList.contains('open-m'):!r.classList.contains('collapsed'))?closeRail():openRail();};
$('#railClose').onclick=closeRail;
// show the toggle on desktop too, so the rail is collapsible (gap fix)
$('#railToggle').style.display='block';

// ---- downloads menu ----
$('#dlBtn').onclick=(e)=>{e.stopPropagation();$('#dlDrop').classList.toggle('open');};
document.addEventListener('click',()=>$('#dlDrop').classList.remove('open'));
$('#dlDrop').onclick=e=>e.stopPropagation();

// ---- reset filters ----
$('#resetBtn').onclick=()=>{
  st.mods=new Set(DATA.modules.map(m=>m.code));
  $$('#modChips .chip').forEach(c=>c.classList.remove('off'));
  st.crossOnly=false;st.sharedOnly=false;st.q='';
  $('#crossOnly').checked=false;$('#sharedOnly').checked=false;$('#q').value='';
  $('#side').classList.remove('open');
  render();
};

// ===================== FILTER RAIL =====================
$('#modChips').innerHTML=DATA.modules.map(m=>`<span class="chip" data-m="${m.code}"><i style="background:${color(m.code)}"></i>${m.code}</span>`).join('');
$$('#modChips .chip').forEach(c=>c.onclick=()=>{const m=c.dataset.m;
  if(st.mods.has(m)){st.mods.delete(m);c.classList.add('off');}else{st.mods.add(m);c.classList.remove('off');}render();});
const LAYERS=[['process','שכבה 1 · תהליכים עסקיים'],['module','שכבה 2 · מודולי SAP'],['document','שכבה 3 · מסמכים עסקיים'],['table','שכבה 4 · טבלאות מסד'],['shared','שכבה 5 · אובייקטים משותפים']];
st.layers=new Set(LAYERS.map(l=>l[0]));
$('#layerToggles').innerHTML=LAYERS.map(l=>`<label class="toggle"><span>${l[1]}</span><input type="checkbox" data-l="${l[0]}" checked></label>`).join('');
$$('#layerToggles input').forEach(i=>i.onchange=()=>{i.checked?st.layers.add(i.dataset.l):st.layers.delete(i.dataset.l);if(st.view==='landscape')render();});
$('#crossOnly').onchange=e=>{st.crossOnly=e.target.checked;render();};
$('#sharedOnly').onchange=e=>{st.sharedOnly=e.target.checked;render();};
$('#showLabels').onchange=e=>{st.labels=e.target.checked;render();};
let qTimer;$('#q').oninput=e=>{clearTimeout(qTimer);st.q=e.target.value.trim().toUpperCase();qTimer=setTimeout(applySearch,120);};
function applySearch(){if(st.view==='database'){renderDatabase();return;}
  root.selectAll('[data-name]').each(function(){const n=this.getAttribute('data-name');
    d3.select(this).classed('dim', st.q && !n.includes(st.q));});}

// bottom legend
$('#botLegend').innerHTML=DATA.modules.map(m=>`<span class="lg"><i style="background:${color(m.code)}"></i>${m.code}</span>`).join('');

// ===================== SIDE PANEL =====================
$('#sideX').onclick=()=>$('#side').classList.remove('open');
function openTable(name){
  const t=tableByName[name]; if(!t){return;}
  const parents=DATA.edges.filter(e=>e.to===name).map(e=>e.from);
  const children=DATA.edges.filter(e=>e.from===name).map(e=>e.to);
  const mod=DATA.modules.find(m=>m.code===t.mod);
  const fieldsRows=(t.fields||[]).map(f=>`<tr><td class="${f[3]==='PK'?'pk':'k'}">${f[0]}</td><td>${f[1]||''}</td><td style="color:#9fb0c2">${f[2]||''}</td><td style="color:${f[3]==='PK'?'var(--accent2)':f[3]==='FK'?'var(--gold)':'#5d7088'}">${f[3]}</td></tr>`).join('');
  const relPills=a=>a.length?[...new Set(a)].map(n=>`<span class="pill rel" data-go="${n}">${n}</span>`).join(''):'<span class="empty">—</span>';
  const list=(a,cls='pill')=>a&&a.length?a.map(x=>`<span class="${cls}">${x}</span>`).join(''):'<span class="empty">אין</span>';
  $('#sideBody').innerHTML=`
   <div class="hd">
     <div class="tname">${t.name}
       <span class="badge mod" style="background:${color(t.mod)}">${t.mod}</span>
       ${sharedSet.has(t.name)?'<span class="badge" style="background:var(--gold)">SHARED</span>':''}
       <span class="tag">${t.real?'בחילוץ':'מודל קנוני'}</span>
     </div>
     <p class="he">${t.he||t.en||''}</p>
     <div style="margin-top:9px;display:flex;gap:14px;font:11px var(--mono);color:var(--mut)">
       <span>קשרים <b style="color:#fff">${t.degree}</b></span>
       <span>אב <b style="color:#fff">${t.inDegree}</b></span>
       <span>צאצא <b style="color:#fff">${t.outDegree}</b></span>
       <span>צפיפות <b style="color:#fff">${t.density}</b></span>
     </div>
   </div>
   <section><h4>תיאור (Module)</h4>
     <div class="kv"><span>מודול</span><b>${t.mod} — ${mod?mod.he:''}</b></div>
     <div class="kv"><span>נושא</span><b>${t.topic||'—'}</b></div>
   </section>
   <section><h4>שדות מפתח · Key Fields</h4>
     ${fieldsRows?`<table class="ftbl">${fieldsRows}</table>`:'<span class="empty">לא תועדו שדות</span>'}</section>
   <section><h4>טבלאות אב · Parent Tables</h4>${relPills(parents)}</section>
   <section><h4>טבלאות צאצא · Child Tables</h4>${relPills(children)}</section>
   <section><h4>טרנזקציות · Transactions</h4>${t.tcodes?`<span class="pill">${t.tcodes}</span>`:'<span class="empty">—</span>'}</section>
   <section><h4>אפליקציות Fiori</h4>${t.fiori?`<span class="pill">${t.fiori}</span>`:'<span class="empty">—</span>'}</section>
   <section><h4>BAPIs / Function Modules</h4>${list((t.funcs||[]).slice(0,8))}</section>
   <section><h4>CDS Views (S/4)</h4>${list(t.cds)}</section>
   <section><h4>ECC ↔ S/4HANA</h4>
     <p class="he" style="margin:0">${t.s4||'אין שינוי מהותי ב-S/4HANA.'}</p>
     ${t.s4alt?`<div style="margin-top:8px"><span class="tag">חלופת S/4</span> <span class="pill">${t.s4alt}</span></div>`:''}
   </section>`;
  $$('#sideBody .pill[data-go]').forEach(p=>p.onclick=()=>openTable(p.dataset.go));
  $('#side').classList.add('open');
}

// ===================== RENDER DISPATCH =====================
const HINTS={
  landscape:'גלילה = זום · גרירה = הזזה · ריחוף = פירוט · לחיצה = פאנל',
  zones:'5 אזורי ארכיטקטורה · לחץ טבלה לפתיחת פאנל',
  business:'5 תהליכי-על מקצה לקצה',
  functional:'מודול ← מסמכים עסקיים',
  technical:'טבלאות + BAPIs לפי מודול',
  database:'רשת ER · לחיצה על צומת = בידוד שכנים · לחיצה בריק = ניקוי',
  integration:'IDOC/ALE/PI-PO ↔ Zetes/Daymax',
  s4:'ECC6 → S/4HANA · שינויי ליבה',
};
function render(){hideTip();stage.interrupt();root.interrupt();root.selectAll('*').remove();stopSim();
  $('#minimap').style.display = st.view==='database'?'block':'none';
  $('#rail').classList.toggle('hide-view', st.view==='s4');  // s4 needs no filters; hide via class (CSS), not inline
  $('#canvasHint').innerHTML = HINTS[st.view]||'';
  ({landscape:renderLandscape,zones:renderZones,business:renderBusiness,functional:renderFunctional,
    technical:renderTechnical,database:renderDatabase,integration:renderIntegration,s4:renderS4}[st.view])();
}
function setStats(nt,ne,nc){$('#stTables').textContent=nt;$('#stEdges').textContent=ne;$('#stCross').textContent=nc;}

// helper: rounded card
function card(g,x,y,w,h,m,title,sub,foot){
  const c=g.append('g').attr('transform',`translate(${x},${y})`).style('cursor','pointer');
  c.append('rect').attr('width',w).attr('height',h).attr('rx',13).attr('fill','#101a25')
    .attr('stroke',color(m)).attr('stroke-width',1.6).attr('filter','url(#softglow)').attr('opacity',.95);
  c.append('rect').attr('width',6).attr('height',h).attr('rx',3).attr('fill',color(m));
  c.append('text').attr('class','card-t').attr('x',16).attr('y',25).text(title);
  if(sub)c.append('text').attr('class','card-s').attr('x',16).attr('y',43).text(sub);
  if(foot)c.append('text').attr('class','card-c').attr('x',16).attr('y',h-12).attr('fill',color(m)).text(foot);
  return c;
}

// ===================== VIEW: LANDSCAPE (5 layers) =====================
function renderLandscape(){
  const w=Math.max(1200,W()), h=1180, pad=80, iw=w-pad*2;
  const showL=k=>st.layers.has(k);
  const yProc=70,yMod=260,yShared=h*0.5,yDoc=h-300,yTab=h-150;

  // layer captions + bands
  const bands=[['process','שכבה 1 — תהליכים עסקיים · BUSINESS PROCESS',yProc-44],
    ['module','שכבה 2 — מודולי SAP',yMod-44],
    ['shared','שכבה 5 — אובייקטים משותפים · SHARED CORE',yShared-150],
    ['document','שכבה 3 — מסמכים עסקיים',yDoc-44],
    ['table','שכבה 4 — טבלאות מסד נתונים',yTab-40]];
  bands.filter(b=>showL(b[0])).forEach(b=>{
    const center=b[0]==='shared';
    root.append('rect').attr('x',pad-34).attr('y',b[2]).attr('width',iw+68)
      .attr('height',center?300:(b[0]==='table'?150:150)).attr('rx',18)
      .attr('fill',center?'rgba(242,193,78,.05)':'rgba(255,255,255,.014)')
      .attr('stroke',center?'rgba(242,193,78,.4)':'var(--line)').attr('stroke-dasharray',center?'0':'5 6');
    root.append('text').attr('class','layer-cap').attr('x',pad-24).attr('y',b[2]+20)
      .attr('fill',center?'var(--gold)':'#5d6f84').text(b[1]);
  });

  // L2 modules positions (for links)
  const mods=DATA.modules.filter(m=>st.mods.has(m.code));
  const mgap=iw/mods.length, modPos={};
  mods.forEach((m,i)=>{modPos[m.code]={x:pad+mgap*i+mgap/2,y:yMod+50};});
  // L5 shared positions (center)
  const shown=DATA.shared, sgap=iw/shown.length, hubPos={};
  shown.forEach((s,i)=>{hubPos[s.name]={x:pad+sgap*i+sgap/2,y:yShared+(i%2?44:-44)};});

  // links shared -> modules
  if(showL('shared')&&showL('module')){
    const links=[];shown.forEach(s=>s.mods.forEach(mc=>{if(modPos[mc])links.push({s:hubPos[s.name],t:modPos[mc],cross:s.span>=5});}));
    root.append('g').selectAll('path').data(links).join('path').attr('class',d=>'link'+(d.cross?' cross':''))
      .attr('stroke-opacity',d=>d.cross?.3:.14).attr('stroke-width',d=>d.cross?1.4:.8)
      .attr('d',d=>{const my=(d.s.y+d.t.y)/2;return `M${d.s.x},${d.s.y} C${d.s.x},${my} ${d.t.x},${my} ${d.t.x},${d.t.y}`;});
  }

  // L1 processes
  if(showL('process')){
    const pr=DATA.processes,pgap=iw/pr.length;
    pr.forEach((p,i)=>{const x=pad+pgap*i+pgap/2,bw=pgap-26;
      const g=root.append('g').attr('transform',`translate(${x-bw/2},${yProc})`).style('cursor','pointer').attr('data-name',p.id);
      g.append('rect').attr('width',bw).attr('height',88).attr('rx',12).attr('fill','#0f1822')
        .attr('stroke',p.color).attr('stroke-width',1.6).attr('filter','url(#softglow)');
      g.append('rect').attr('width',bw).attr('height',5).attr('rx',2.5).attr('fill',p.color);
      g.append('text').attr('class','proc-t').attr('x',bw/2).attr('y',38).attr('text-anchor','middle').text(p.name);
      g.append('text').attr('class','proc-he').attr('x',bw/2).attr('y',60).attr('text-anchor','middle').text(p.he);
      g.append('text').attr('x',bw/2).attr('y',78).attr('text-anchor','middle').attr('font-size',9).attr('fill','#7088a0')
        .attr('font-family','var(--mono)').text(p.mods.join(' · '));
      g.on('mousemove',e=>showTip(`<h5>${p.name}</h5><div class="he">${p.he}</div><div class="r">מודולים: <b>${p.mods.join(', ')}</b></div><div class="r">מסמכים: <b>${p.docs.join(' → ')}</b></div>`,e)).on('mouseout',hideTip);
    });
  }

  // L2 module cards
  if(showL('module')) mods.forEach(m=>{
    const cnt=DATA.tables.filter(t=>t.mod===m.code).length;
    const c=card(root,modPos[m.code].x-78,yMod,156,78,m.code,m.code,m.he,`${cnt} טבלאות`);
    c.attr('data-name',m.code).on('mousemove',e=>showTip(`<h5>${m.code} — ${m.name}</h5><div class="he">${m.he}</div><div class="r">טבלאות: <b>${cnt}</b></div>`,e)).on('mouseout',hideTip);
  });

  // L5 shared hubs (center, emphasized)
  if(showL('shared')){
    const maxd=d3.max(shown,s=>s.degree||0)||1;
    const g=root.append('g').selectAll('g').data(shown).join('g').attr('transform',d=>`translate(${hubPos[d.name].x},${hubPos[d.name].y})`).style('cursor','pointer').attr('data-name',d=>d.name);
    g.append('circle').attr('r',d=>16+Math.sqrt((d.degree||d.span*2))*6).attr('fill','#12100a')
      .attr('stroke','var(--gold)').attr('stroke-width',d=>d.degree>=10?3.5:2).attr('filter','url(#glow)').attr('opacity',.96);
    g.append('text').attr('class','hub-lbl').attr('text-anchor','middle').attr('dy',3).text(d=>d.name);
    g.append('text').attr('class','hub-meta').attr('text-anchor','middle').attr('dy',d=>16+Math.sqrt((d.degree||d.span*2))*6+12)
      .text(d=>d.inDataset?`deg ${d.degree} · ρ ${d.density}`:`span ${d.span}`);
    g.on('mousemove',(e,d)=>showTip(`<h5>${d.name} ★</h5><div class="he">${d.he}</div><div class="r">משרת <b>${d.span}</b> מודולים: ${d.mods.join(', ')}</div><div class="r">קשרים: <b>${d.degree??'landscape'}</b> · צפיפות <b>${d.density??'—'}</b></div>`,e))
      .on('mouseout',hideTip).on('click',(e,d)=>openTable(d.name));
  }

  // L3 documents
  if(showL('document')){
    const docs=DATA.documents.filter(d=>st.mods.has(d.mod)),dgap=iw/Math.max(docs.length,1);
    docs.forEach((d,i)=>{const x=pad+dgap*i+dgap/2;
      const g=root.append('g').attr('transform',`translate(${x-58},${yDoc})`).style('cursor','pointer').attr('data-name',d.id);
      g.append('rect').attr('width',116).attr('height',60).attr('rx',10).attr('fill','#0f1822').attr('stroke',color(d.mod)).attr('stroke-width',1.3).attr('stroke-dasharray','3 3');
      g.append('text').attr('x',58).attr('y',26).attr('text-anchor','middle').attr('font',`700 12px var(--mono)`).attr('fill','#fff').text(d.id.length>14?d.id.slice(0,13)+'…':d.id);
      g.append('text').attr('x',58).attr('y',44).attr('text-anchor','middle').attr('font-size',11).attr('fill','#aebccd').text(d.he);
      g.on('mousemove',e=>showTip(`<h5>${d.id}</h5><div class="he">${d.he}</div><div class="r">מודול: <b>${d.mod}</b></div><div class="r">טבלאות: <b>${d.tables.join(', ')}</b></div>`,e)).on('mouseout',hideTip)
       .on('click',()=>{const t=d.tables.find(x=>tableByName[x]);if(t)openTable(t);});
    });
  }

  // L4 tables — dots clustered per module
  if(showL('table')){
    const byMod={};DATA.tables.forEach(t=>{if(st.mods.has(t.mod))(byMod[t.mod]=byMod[t.mod]||[]).push(t);});
    const cols=mods.length, cw=iw/cols;
    mods.forEach((m,ci)=>{const list=(byMod[m.code]||[]);const cx=pad+cw*ci+12;
      const perRow=Math.max(4,Math.floor((cw-24)/16));
      list.forEach((t,i)=>{const gx=cx+(i%perRow)*16+8,gy=yTab+20+Math.floor(i/perRow)*16;
        root.append('circle').attr('data-name',t.name).attr('cx',gx).attr('cy',gy)
          .attr('r',t.isHub?5:3.4).attr('fill',color(t.mod)).attr('opacity',t.real?.95:.5)
          .attr('stroke',sharedSet.has(t.name)?'var(--gold)':'none').attr('stroke-width',sharedSet.has(t.name)?1.6:0)
          .style('cursor','pointer')
          .on('mousemove',e=>showTip(`<h5>${t.name}</h5><div class="he">${t.he||t.en}</div><div class="r">${t.mod} · deg ${t.degree}</div>`,e)).on('mouseout',hideTip)
          .on('click',()=>openTable(t.name));
      });
    });
  }
  setStats(DATA.tables.filter(t=>st.mods.has(t.mod)).length, DATA.edges.length, DATA.edges.filter(e=>e.cross).length);
  fit(0.9);
}

// ===================== VIEW: ZONES (5 architecture zones) =====================
function renderZones(){
  const zones=DATA.zones;
  const avail=Math.max(1180, W()-railInset()-40), pad=20;
  const chipW=104, chipH=26, cgap=8, rgap=4;
  const perRow=Math.max(4,Math.floor((avail-32)/(chipW+cgap)));
  let y=20;
  zones.forEach(z=>{
    const list=DATA.tables.filter(t=>t.zone===z.id && st.mods.has(t.mod)).sort((a,b)=>b.degree-a.degree);
    const isShared=z.id==='Shared';
    const rows=Math.max(1,Math.ceil(list.length/perRow));
    const bandH=68+rows*(chipH+rgap)+14;
    // band frame
    root.append('rect').attr('x',pad).attr('y',y).attr('width',avail).attr('height',bandH).attr('rx',16)
      .attr('fill',isShared?'rgba(242,193,78,.05)':'rgba(255,255,255,.015)')
      .attr('stroke',isShared?'var(--gold)':z.color).attr('stroke-width',isShared?2:1.3).attr('filter','url(#softglow)');
    root.append('rect').attr('x',pad).attr('y',y).attr('width',6).attr('height',bandH).attr('fill',z.color).attr('rx',3);
    root.append('text').attr('x',pad+22).attr('y',y+34).attr('font','800 18px var(--font)').attr('fill','#fff').text(z.he);
    root.append('text').attr('x',pad+22).attr('y',y+54).attr('font','600 11px var(--mono)').attr('fill',z.color).text(z.en.toUpperCase());
    root.append('text').attr('x',pad+avail-18).attr('y',y+40).attr('text-anchor','end').attr('font','800 26px var(--mono)').attr('fill',isShared?'var(--gold)':'#cdd9e6').text(list.length);
    // chips
    const gx0=pad+200;
    const cols=Math.max(4,Math.floor((avail-220)/(chipW+cgap)));
    list.forEach((t,i)=>{
      const cx=gx0+(i%cols)*(chipW+cgap), cy=y+18+Math.floor(i/cols)*(chipH+rgap);
      const g=root.append('g').attr('transform',`translate(${cx},${cy})`).style('cursor','pointer').attr('data-name',t.name);
      g.append('rect').attr('width',chipW).attr('height',chipH).attr('rx',6).attr('fill',t.real?'#101a25':'#15171f')
        .attr('stroke',sharedSet.has(t.name)?'var(--gold)':color(t.mod)).attr('stroke-opacity',sharedSet.has(t.name)?1:.6)
        .attr('stroke-width',sharedSet.has(t.name)?1.8:1).attr('stroke-dasharray',t.real?'0':'3 2');
      g.append('rect').attr('width',4).attr('height',chipH).attr('rx',2).attr('fill',color(t.mod));
      g.append('text').attr('x',10).attr('y',17).attr('font','700 11px var(--mono)').attr('fill',sharedSet.has(t.name)?'var(--gold)':'#dbe6f0').text(t.name.length>12?t.name.slice(0,11)+'…':t.name);
      g.on('mousemove',e=>showTip(`<h5>${t.name} ${sharedSet.has(t.name)?'★':''}</h5><div class="he">${t.he||t.en}</div><div class="r">מודול <b style="color:${color(t.mod)}">${t.mod}</b> · אזור <b>${z.he}</b> · deg ${t.degree}</div>`,e)).on('mouseout',hideTip)
       .on('click',()=>openTable(t.name));
    });
    y+=bandH+16;
  });
  setStats(DATA.tables.filter(t=>st.mods.has(t.mod)).length, DATA.edges.length, DATA.edges.filter(e=>e.cross).length);
  fit(0.95);
}

// ===================== VIEW: BUSINESS (process pipelines) =====================
function renderBusiness(){
  const w=Math.max(1100,W()),pad=90,iw=w-pad*2;
  const pr=DATA.processes, rowH=150, top=70;
  pr.forEach((p,pi)=>{const y=top+pi*rowH;
    root.append('text').attr('x',pad-34).attr('y',y-8).attr('class','layer-cap').attr('fill',p.color).text(`${p.name} · ${p.he}`);
    // pipeline of documents
    const steps=p.docs, sgap=iw/steps.length;
    steps.forEach((doc,i)=>{const x=pad+sgap*i+sgap/2; const d=DATA.documents.find(z=>z.id===doc)||{id:doc,he:'',mod:p.mods[0],tables:[]};
      if(i<steps.length-1){root.append('path').attr('class','link cross').attr('marker-end','url(#arrow)').attr('stroke-opacity',.6)
        .attr('d',`M${x+62},${y+24} L${pad+sgap*(i+1)+sgap/2-62},${y+24}`);}
      const g=root.append('g').attr('transform',`translate(${x-62},${y})`).style('cursor','pointer').attr('data-name',doc);
      g.append('rect').attr('width',124).attr('height',64).attr('rx',11).attr('fill','#0f1822').attr('stroke',color(d.mod)).attr('stroke-width',1.5).attr('filter','url(#softglow)');
      g.append('rect').attr('width',124).attr('height',4).attr('fill',color(d.mod));
      g.append('text').attr('x',62).attr('y',27).attr('text-anchor','middle').attr('font','700 12px var(--mono)').attr('fill','#fff').text(d.id.length>15?d.id.slice(0,14)+'…':d.id);
      g.append('text').attr('x',62).attr('y',46).attr('text-anchor','middle').attr('font-size',11).attr('fill','#aebccd').text(d.he);
      g.on('mousemove',e=>showTip(`<h5>${d.id}</h5><div class="he">${d.he}</div><div class="r">טבלאות: <b>${(d.tables||[]).join(', ')}</b></div>`,e)).on('mouseout',hideTip)
       .on('click',()=>{const t=(d.tables||[]).find(x=>tableByName[x]);if(t)openTable(t);});
    });
    // module tags at end
    root.append('text').attr('x',pad+iw+10).attr('y',y+28).attr('text-anchor','start').attr('font','700 11px var(--mono)').attr('fill','#7088a0').text(p.mods.join(' · '));
  });
  setStats(DATA.documents.length,DATA.processes.length,DATA.edges.filter(e=>e.cross).length);
  fit(0.92);
}

// ===================== VIEW: FUNCTIONAL (module → documents/tcodes) =====================
function renderFunctional(){
  const mods=DATA.modules.filter(m=>st.mods.has(m.code));
  const w=Math.max(1100,W()),pad=70,cw=Math.min(220,(w-pad*2)/Math.max(mods.length,1)),gap=18;
  mods.forEach((m,i)=>{const x=pad+i*(cw+gap),y=70;
    const docs=DATA.documents.filter(d=>d.mod===m.code);
    const tbls=DATA.tables.filter(t=>t.mod===m.code);
    const colH=120+docs.length*30+90;
    const g=root.append('g').attr('transform',`translate(${x},${y})`);
    g.append('rect').attr('width',cw).attr('height',colH).attr('rx',14).attr('fill','#0d1620').attr('stroke',color(m.code)).attr('stroke-width',1.6).attr('filter','url(#softglow)');
    g.append('rect').attr('width',cw).attr('height',6).attr('fill',color(m.code));
    g.append('text').attr('x',16).attr('y',32).attr('font','800 16px var(--mono)').attr('fill','#fff').text(m.code);
    g.append('text').attr('x',16).attr('y',50).attr('font','600 11px var(--font)').attr('fill','#aebccd').text(m.he);
    g.append('text').attr('x',16).attr('y',74).attr('font','700 10px var(--mono)').attr('fill',color(m.code)).text(`${tbls.length} טבלאות · ${docs.length} מסמכים`);
    g.append('line').attr('x1',14).attr('x2',cw-14).attr('y1',86).attr('y2',86).attr('stroke','var(--line)');
    docs.forEach((d,j)=>{const dy=104+j*30;
      const dg=g.append('g').attr('transform',`translate(14,${dy})`).style('cursor','pointer');
      dg.append('rect').attr('width',cw-28).attr('height',24).attr('rx',6).attr('fill','#13202e').attr('stroke',color(m.code)).attr('stroke-opacity',.4);
      dg.append('text').attr('x',8).attr('y',16).attr('font','600 11px var(--mono)').attr('fill','#dbe6f0').text(`${d.id} · ${d.he}`);
      dg.on('click',()=>{const t=(d.tables||[]).find(x=>tableByName[x]);if(t)openTable(t);})
        .on('mousemove',e=>showTip(`<h5>${d.id}</h5><div class="r">טבלאות: <b>${d.tables.join(', ')}</b></div>`,e)).on('mouseout',hideTip);
    });
  });
  setStats(DATA.tables.filter(t=>st.mods.has(t.mod)).length,DATA.documents.length,0);
  fit(0.92);
}

// ===================== VIEW: TECHNICAL (tables + BAPIs by module) =====================
function renderTechnical(){
  const mods=DATA.modules.filter(m=>st.mods.has(m.code));
  const w=Math.max(1100,W()),pad=70,colW=Math.min(260,(w-pad*2)/Math.max(mods.length,1)),gap=16;
  mods.forEach((m,i)=>{const x=pad+i*(colW+gap),y=60;
    const tbls=DATA.tables.filter(t=>t.mod===m.code).sort((a,b)=>b.degree-a.degree).slice(0,14);
    const colH=70+tbls.length*30;
    const g=root.append('g').attr('transform',`translate(${x},${y})`);
    g.append('rect').attr('width',colW).attr('height',colH).attr('rx',13).attr('fill','#0d1620').attr('stroke',color(m.code)).attr('stroke-width',1.4);
    g.append('rect').attr('width',colW).attr('height',5).attr('fill',color(m.code));
    g.append('text').attr('x',14).attr('y',30).attr('font','800 15px var(--mono)').attr('fill','#fff').text(m.code);
    tbls.forEach((t,j)=>{const ty=52+j*30;
      const tg=g.append('g').attr('transform',`translate(12,${ty})`).style('cursor','pointer').attr('data-name',t.name);
      tg.append('rect').attr('width',colW-24).attr('height',25).attr('rx',6).attr('fill',t.real?'#13202e':'#161a22').attr('stroke',sharedSet.has(t.name)?'var(--gold)':'var(--line)').attr('stroke-dasharray',t.real?'0':'3 3');
      tg.append('text').attr('x',8).attr('y',17).attr('font','700 11px var(--mono)').attr('fill',sharedSet.has(t.name)?'var(--gold)':'#dbe6f0').text(t.name);
      tg.append('text').attr('x',colW-32).attr('y',17).attr('text-anchor','end').attr('font','600 9px var(--mono)').attr('fill','#6f8198').text(`${(t.funcs||[]).length} BAPI · d${t.degree}`);
      tg.on('click',()=>openTable(t.name))
        .on('mousemove',e=>showTip(`<h5>${t.name}</h5><div class="r">BAPIs: <b>${(t.funcs||[]).slice(0,3).join(', ')||'—'}</b></div><div class="r">CDS: <b>${(t.cds||[]).join(', ')||'—'}</b></div>`,e)).on('mouseout',hideTip);
    });
  });
  setStats(DATA.tables.filter(t=>st.mods.has(t.mod)).length, DATA.tables.reduce((a,t)=>a+(t.funcs||[]).length,0),0);
  fit(0.9);
}

// ===================== VIEW: DATABASE (force network) — centerpiece =====================
let sim=null, miniNodes=[];
function stopSim(){if(sim){sim.stop();sim=null;}d3.select('#mini').selectAll('*').remove();}
function renderDatabase(){
  const w=W(),h=H();
  let nodes=DATA.tables.filter(t=>st.mods.has(t.mod));
  if(st.sharedOnly) nodes=nodes.filter(t=>sharedSet.has(t.name)||t.degree>=5);
  if(st.q) nodes=nodes; // keep all, dim non-matches
  const idset=new Set(nodes.map(n=>n.name));
  let links=DATA.edges.filter(e=>idset.has(e.from)&&idset.has(e.to))
    .map(e=>({source:e.from,target:e.to,cross:e.cross,card:e.card}));
  if(st.crossOnly) links=links.filter(e=>e.cross);
  nodes=nodes.map(n=>({...n}));

  const link=root.append('g').selectAll('line').data(links).join('line')
    .attr('class',d=>'link'+(d.cross?' cross':'')).attr('marker-end','url(#arrow)')
    .attr('stroke',d=>d.cross?'var(--gold)':'#33485d').attr('stroke-opacity',d=>d.cross?.6:.4)
    .attr('stroke-width',d=>d.cross?1.4:1).attr('filter',d=>d.cross?'url(#glow)':null);

  const g=root.append('g').selectAll('g').data(nodes).join('g').style('cursor','pointer')
    .call(d3.drag().on('start',(e,d)=>{if(!e.active)sim.alphaTarget(.3).restart();d.fx=d.x;d.fy=d.y;})
      .on('drag',(e,d)=>{d.fx=e.x;d.fy=e.y;}).on('end',(e,d)=>{if(!e.active)sim.alphaTarget(0);d.fx=null;d.fy=null;}));
  g.append('circle').attr('r',d=>5+Math.sqrt(d.degree)*2.4).attr('fill',d=>color(d.mod)).attr('opacity',d=>d.real?.93:.55)
    .attr('stroke',d=>sharedSet.has(d.name)?'var(--gold)':'#070b11').attr('stroke-width',d=>sharedSet.has(d.name)?2.6:1)
    .attr('filter',d=>sharedSet.has(d.name)?'url(#glow)':null).attr('stroke-dasharray',d=>d.real?'0':'2 2');
  g.append('text').attr('class','node-lbl').attr('dy',d=>-(7+Math.sqrt(d.degree)*2.4)).attr('text-anchor','middle')
    .style('display',st.labels?null:'none').text(d=>(d.degree>=4||sharedSet.has(d.name))?d.name:'');
  g.on('mousemove',(e,d)=>showTip(`<h5>${d.name} ${sharedSet.has(d.name)?'★':''}</h5><div class="he">${d.he||d.en}</div>
      <div class="r">מודול <b style="color:${color(d.mod)}">${d.mod}</b> · ${d.real?'בחילוץ':'מודל'}</div>
      <div class="r">קשרים <b>${d.degree}</b> · אב <b>${d.inDegree}</b> · צאצא <b>${d.outDegree}</b> · ρ <b>${d.density}</b></div>`,e))
    .on('mouseout',hideTip)
    .on('click',(e,d)=>{e.stopPropagation();openTable(d.name);
      const sN=l=>(l.source&&l.source.name)||l.source, tN=l=>(l.target&&l.target.name)||l.target;
      const nb=new Set([d.name]);links.forEach(l=>{const s=sN(l),t=tN(l);if(s===d.name)nb.add(t);if(t===d.name)nb.add(s);});
      g.attr('opacity',n=>nb.has(n.name)?1:.1);link.attr('stroke-opacity',l=>{const s=sN(l),t=tN(l);return(s===d.name||t===d.name)?.9:.04;});});
  stage.on('click',()=>{g.attr('opacity',1);link.attr('stroke-opacity',l=>l.cross?.6:.4);});
  if(st.q) g.attr('opacity',n=>n.name.includes(st.q)?1:.12);

  sim=d3.forceSimulation(nodes)
    .force('link',d3.forceLink(links).id(d=>d.name).distance(d=>d.cross?120:62).strength(.55))
    .force('charge',d3.forceManyBody().strength(-220))
    .force('center',d3.forceCenter(w/2,h/2))
    .force('collide',d3.forceCollide().radius(d=>12+Math.sqrt(d.degree)*2.4))
    .force('x',d3.forceX(w/2).strength(d=>sharedSet.has(d.name)?.18:.02))
    .force('y',d3.forceY(h/2).strength(d=>sharedSet.has(d.name)?.18:.02))
    .on('tick',()=>{link.attr('x1',d=>d.source.x).attr('y1',d=>d.source.y).attr('x2',d=>d.target.x).attr('y2',d=>d.target.y);
      g.attr('transform',d=>`translate(${d.x},${d.y})`);});
  // pre-settle the simulation so the graph is laid out before we fit the view
  sim.stop();
  const pre=Math.min(300, 80+nodes.length);
  for(let i=0;i<pre;i++) sim.tick();
  link.attr('x1',d=>d.source.x).attr('y1',d=>d.source.y).attr('x2',d=>d.target.x).attr('y2',d=>d.target.y);
  g.attr('transform',d=>`translate(${d.x},${d.y})`);
  sim.alpha(0.25).restart();
  miniNodes=nodes;
  sim.on('end',()=>{if(st.view==='database')drawMini();});
  setStats(nodes.length,links.length,links.filter(l=>l.cross).length);
  fit(0.82); setTimeout(()=>{if(st.view!=='database')return;fit(0.82);drawMini();}, 900);
}
// minimap
function drawMini(){const mini=d3.select('#mini');mini.selectAll('*').remove();if(!miniNodes.length)return;
  const xs=miniNodes.map(n=>n.x),ys=miniNodes.map(n=>n.y);
  const x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys);
  const mw=210,mh=140,s=Math.min(mw/((x1-x0)||1),mh/((y1-y0)||1))*0.85;
  const ox=(mw-(x1-x0)*s)/2-x0*s, oy=(mh-(y1-y0)*s)/2-y0*s;
  mini.attr('data-s',s).attr('data-ox',ox).attr('data-oy',oy);
  mini.append('g').selectAll('circle').data(miniNodes).join('circle')
    .attr('cx',d=>d.x*s+ox).attr('cy',d=>d.y*s+oy).attr('r',d=>sharedSet.has(d.name)?2.4:1.4).attr('fill',d=>color(d.mod));
  mini.append('rect').attr('class','vp').attr('id','vpRect');
  updateMini(d3.zoomTransform(stage.node()));
  mini.on('click',(e)=>{const[mx,my]=d3.pointer(e);const wx=(mx-ox)/s,wy=(my-oy)/s;
    const t=d3.zoomTransform(stage.node());stage.transition().duration(300).call(zoom.translateTo,wx,wy);});
}
function updateMini(t){const mini=d3.select('#mini');const vp=mini.select('#vpRect');if(vp.empty())return;
  const s=+mini.attr('data-s'),ox=+mini.attr('data-ox'),oy=+mini.attr('data-oy');const w=W(),h=H();
  const wx0=(-t.x)/t.k,wy0=(-t.y)/t.k,ww=w/t.k,wh=h/t.k;
  vp.attr('x',wx0*s+ox).attr('y',wy0*s+oy).attr('width',ww*s).attr('height',wh*s);}

// ===================== VIEW: INTEGRATION =====================
function renderIntegration(){
  const w=Math.max(1000,W()),h=820,cx=w/2,cy=h/2;
  // center hub: IDOC/ALE/PIPO
  root.append('circle').attr('cx',cx).attr('cy',cy).attr('r',92).attr('fill','#10151c').attr('stroke','var(--IDOC)').attr('stroke-width',2).attr('filter','url(#glow)');
  root.append('text').attr('x',cx).attr('y',cy-14).attr('text-anchor','middle').attr('font','800 18px var(--mono)').attr('fill','#fff').text('IDOC / ALE');
  root.append('text').attr('x',cx).attr('y',cy+8).attr('text-anchor','middle').attr('font','700 13px var(--mono)').attr('fill','var(--IDOC)').text('PI / PO');
  root.append('text').attr('x',cx).attr('y',cy+30).attr('text-anchor','middle').attr('font','600 11px var(--font)').attr('fill','#aebccd').text('שכבת אינטגרציה');
  const flows=DATA.integrationFlows, n=flows.length;
  flows.forEach((f,i)=>{const ang=(i/n)*Math.PI*2-Math.PI/2;const r=300;const x=cx+Math.cos(ang)*r,y=cy+Math.sin(ang)*r;
    const isExt=/Zetes|Daymax|External/i.test(f.from+f.to);
    root.append('path').attr('class','link cross').attr('marker-end','url(#arrow)').attr('stroke-opacity',.6).attr('stroke-width',1.5)
      .attr('d',`M${cx+Math.cos(ang)*94},${cy+Math.sin(ang)*94} L${x-Math.cos(ang)*70},${y-Math.sin(ang)*70}`);
    const g=root.append('g').attr('transform',`translate(${x-70},${y-32})`).style('cursor','pointer').attr('data-name',f.table);
    g.append('rect').attr('width',140).attr('height',64).attr('rx',11).attr('fill','#0f1822').attr('stroke',isExt?'var(--gold)':'var(--IDOC)').attr('stroke-width',1.5).attr('filter','url(#softglow)');
    g.append('text').attr('x',70).attr('y',23).attr('text-anchor','middle').attr('font','800 12px var(--mono)').attr('fill',isExt?'var(--gold)':'#fff').text(f.idoc);
    g.append('text').attr('x',70).attr('y',41).attr('text-anchor','middle').attr('font-size',10.5).attr('fill','#aebccd').text(f.he.length>20?f.he.slice(0,19)+'…':f.he);
    g.append('text').attr('x',70).attr('y',56).attr('text-anchor','middle').attr('font','600 9px var(--mono)').attr('fill','#7088a0').text(`${f.from} → ${f.to}`);
    g.on('mousemove',e=>showTip(`<h5>${f.idoc}</h5><div class="he">${f.he}</div><div class="r">${f.from} → ${f.to}</div><div class="r">טבלה: <b>${f.table}</b></div>`,e)).on('mouseout',hideTip)
     .on('click',()=>{if(tableByName[f.table])openTable(f.table);});
  });
  setStats(flows.length,flows.length,flows.length);
  fit(0.85);
}

// ===================== VIEW: S/4HANA =====================
function renderS4(){
  const w=Math.max(1000,W()),pad=80,iw=w-pad*2,top=80,rowH=104;
  root.append('text').attr('x',pad-20).attr('y',40).attr('font','800 18px var(--font)').attr('fill','#fff').text('מעבר ECC6 → S/4HANA · שינויי ליבה');
  root.append('text').attr('x',pad-20).attr('y',62).attr('font','600 12px var(--font)').attr('fill','#8493a6').text('Simplification Items · ACDOCA & MATDOC convergence · Business Partner');
  DATA.s4deltas.forEach((d,i)=>{const y=top+30+i*rowH;
    // ECC box
    const eg=root.append('g').attr('transform',`translate(${pad},${y})`);
    eg.append('rect').attr('width',iw*0.34).attr('height',74).attr('rx',11).attr('fill','#1a1012').attr('stroke','#5b2326').attr('stroke-width',1.4);
    eg.append('text').attr('x',16).attr('y',26).attr('font','700 11px var(--mono)').attr('fill','#ff7a7a').text('ECC6');
    eg.append('text').attr('x',16).attr('y',50).attr('font','800 15px var(--mono)').attr('fill','#fff').text(d.ecc);
    // arrow
    root.append('path').attr('class','link cross').attr('marker-end','url(#arrow)').attr('stroke-width',2).attr('stroke-opacity',.8)
      .attr('d',`M${pad+iw*0.34+8},${y+37} L${pad+iw*0.62-8},${y+37}`);
    root.append('text').attr('x',pad+iw*0.48).attr('y',y+28).attr('text-anchor','middle').attr('font','700 10px var(--mono)').attr('fill','var(--gold)').text('S/4');
    // S4 box
    const sg=root.append('g').attr('transform',`translate(${pad+iw*0.62},${y})`).style('cursor','pointer');
    sg.append('rect').attr('width',iw*0.38).attr('height',74).attr('rx',11).attr('fill','#101a14').attr('stroke','#1e5b33').attr('stroke-width',1.4).attr('filter','url(#softglow)');
    sg.append('text').attr('x',16).attr('y',26).attr('font','700 11px var(--mono)').attr('fill','#5be08a').text('S/4HANA');
    sg.append('text').attr('x',16).attr('y',50).attr('font','800 15px var(--mono)').attr('fill','#fff').text(d.s4);
    sg.append('text').attr('x',16).attr('y',68).attr('font','600 10px var(--font)').attr('fill','#9fb0c2').text(d.he.length>52?d.he.slice(0,51)+'…':d.he);
    const tgt=d.s4.split(' ')[0];sg.on('click',()=>{if(tableByName[tgt])openTable(tgt);})
      .on('mousemove',e=>showTip(`<div class="he">${d.he}</div>`,e)).on('mouseout',hideTip);
  });
  setStats(DATA.tables.filter(t=>t.s4&&/S\/4|ACDOCA|MATDOC|הורחב|אוחד/.test(t.s4)).length, DATA.s4deltas.length, 0);
  fit(0.92);
}

// ===================== PRESENTATION MODE =====================
const PSTEPS=[
  {v:'landscape',step:'01 / 06',h:'נוף ה-SAP המלא',p:'חמש שכבות: תהליכים עסקיים, מודולים, מסמכים, טבלאות מסד, ובמרכז — אובייקטי הליבה המשותפים שמחברים את כל המערכת.'},
  {v:'business',step:'02 / 06',h:'תהליכים עסקיים מקצה לקצה',p:'חמישה תהליכי-על: רכש-עד-תשלום, תכנון-עד-ייצור, תחזוקה-עד-תפעול, שירות-עד-גבייה, והזמנה-עד-גבייה — כל אחד חוצה מספר מודולים.'},
  {v:'functional',step:'03 / 06',h:'מבט פונקציונלי',p:'כל מודול SAP והמסמכים העסקיים שבאחריותו — מ-PR/PO ב-MM ועד הזמנת מכירה וחשבונית ב-SD.'},
  {v:'database',step:'04 / 06',h:'רשת הטבלאות',p:'134 טבלאות, 140 קשרים. MARA ו-AUFK הם הצמתים המרכזיים. קשרים חוצי-מודול מודגשים בזהב — שם נמצא הסיכון בהמרה.'},
  {v:'integration',step:'05 / 06',h:'שכבת אינטגרציה',p:'IDOC / ALE / PI-PO מחברים את SAP ל-Zetes WMS ול-Daymax MES. MATMAS, LOIPRO ו-WMMBXY הם הממשקים הקריטיים ב-CBC.'},
  {v:'s4',step:'06 / 06',h:'מעבר ל-S/4HANA',p:'MATDOC מאחד את תנועות המלאי, ACDOCA הוא היומן האוניברסלי, ולקוח+ספק הופכים ל-Business Partner. אלה שינויי הליבה.'},
];
let pIdx=0,pTimer=null,pPlaying=true;
function openPresent(){$('#present').classList.add('on');pIdx=0;pPlaying=true;$('#pplay').textContent='⏸ השהה';playStep();}
function closePresent(){$('#present').classList.remove('on');clearTimeout(pTimer);}
function playStep(){const s=PSTEPS[pIdx];
  // render the live view behind the transparent overlay (no cloning)
  st.view=s.v;$$('#tabs button').forEach(b=>b.classList.toggle('on',b.dataset.v===s.v));render();
  $('#pcap').innerHTML=`<div class="step">${s.step}</div><h2>${s.h}</h2><p>${s.p}</p>`;
  $('#pbar').style.width=((pIdx+1)/PSTEPS.length*100)+'%';
  clearTimeout(pTimer);if(pPlaying)pTimer=setTimeout(()=>{pIdx=(pIdx+1)%PSTEPS.length;playStep();},6500);
}
$('#presentBtn').onclick=openPresent;$('#pclose').onclick=closePresent;
$('#pnext').onclick=()=>{pIdx=(pIdx+1)%PSTEPS.length;playStep();};
$('#pprev').onclick=()=>{pIdx=(pIdx-1+PSTEPS.length)%PSTEPS.length;playStep();};
$('#pplay').onclick=()=>{pPlaying=!pPlaying;$('#pplay').textContent=pPlaying?'⏸ השהה':'▶ נגן';if(pPlaying)playStep();else clearTimeout(pTimer);};
addEventListener('keydown',e=>{if(e.key==='Escape')closePresent();if($('#present').classList.contains('on')){if(e.key==='ArrowLeft')$('#pnext').click();if(e.key==='ArrowRight')$('#pprev').click();}});

addEventListener('resize',()=>{if(st.view!=='database')render();});
render();
