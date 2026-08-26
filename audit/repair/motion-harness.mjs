import puppeteer from "puppeteer-core";
const CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const B="http://localhost:4173";
const br=await puppeteer.launch({executablePath:CH,headless:"new",args:["--no-sandbox"]});
for (const reduce of [false,true]) {
  const p=await br.newPage(); await p.setViewport({width:1440,height:900});
  await p.emulateMediaFeatures([{name:"prefers-reduced-motion",value:reduce?"reduce":"no-preference"}]);
  await p.goto(B+"/neo/",{waitUntil:"domcontentloaded"});
  await p.evaluate(()=>{localStorage.setItem("neo:onboarded","1");localStorage.setItem("neo:theme","light");});
  let moved=0, timelines=0, fadesOnly=0, longAnim=0;
  for (const u of ["/neo/","/neo/s4hana/","/neo/domain-model/","/neo/object/AUFK/","/neo/books/"]) {
    await p.goto(B+u,{waitUntil:"networkidle0",timeout:90000});
    await new Promise(r=>setTimeout(r,700));
    const m=await p.evaluate(()=>{
      let moved=0,timelines=0,fadesOnly=0,longAnim=0;
      for (const e of document.querySelectorAll("*")) {
        const s=getComputedStyle(e);
        // a transform that actually displaces the element
        if (s.transform && s.transform!=="none" && !/matrix\(1, 0, 0, 1, 0, 0\)/.test(s.transform)) moved++;
        if (s.animationTimeline && s.animationTimeline!=="auto" && s.animationTimeline!=="none") timelines++;
        const n=s.animationName;
        if (n && n!=="none") { if (n==="nm-fade") fadesOnly++;
          const d=parseFloat(s.animationDuration); if (!isNaN(d) && d>0.3) longAnim++; }
      }
      return {moved,timelines,fadesOnly,longAnim};
    });
    moved+=m.moved; timelines+=m.timelines; fadesOnly+=m.fadesOnly; longAnim+=m.longAnim;
  }
  console.log(`reduce=${String(reduce).padEnd(5)}  displacingTransforms=${moved}  scrollTimelines=${timelines}  nm-fade(opacity only)=${fadesOnly}  animations>300ms=${longAnim}`);
  await p.close();
}
await br.close();
