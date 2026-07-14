import http from "node:http"; import { readFile, stat } from "node:fs/promises"; import { extname, join, normalize } from "node:path"; import puppeteer from "puppeteer-core";
const ROOT=new URL("../out/",import.meta.url).pathname; const PORT=4360;
const T={".html":"text/html",".js":"text/javascript",".css":"text/css",".json":"application/json",".png":"image/png",".svg":"image/svg+xml",".woff2":"font/woff2"};
async function rf(u){let p=normalize(join(ROOT,decodeURIComponent(u.split("?")[0])));if(!p.startsWith(ROOT))return null;try{const s=await stat(p);if(s.isDirectory())p=join(p,"index.html");}catch{}try{await stat(p);return p;}catch{}return null;}
const srv=http.createServer(async(req,res)=>{const f=await rf(req.url==="/"?"/index.html":req.url);if(!f){res.writeHead(404);res.end();return;}res.writeHead(200,{"content-type":T[extname(f)]||"application/octet-stream"});res.end(await readFile(f));});
await new Promise(r=>srv.listen(PORT,r));
const b=await puppeteer.launch({executablePath:"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",headless:"new",args:["--no-sandbox"]});
const R={};
// desktop
const p=await b.newPage(); await p.setViewport({width:1440,height:1000});
const e=[]; p.on("console",m=>{if(m.type()==="error"&&!/favicon|404/.test(m.text()))e.push(m.text());}); p.on("pageerror",x=>e.push(String(x)));
await p.evaluateOnNewDocument(()=>{try{localStorage.setItem("neo:onboarded","1");}catch{}});
await p.goto(`http://localhost:${PORT}/bapi/`,{waitUntil:"networkidle0"}); await new Promise(r=>setTimeout(r,700));
R.overflow=await p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
R.cards=await p.$$eval('.card-interactive',c=>c.length);
R.bapiFmSections=await p.$$eval('h2',h=>h.map(x=>x.textContent).filter(t=>/BAPIs|Function Modules/.test(t)).length);
await p.screenshot({path:"/tmp/p152b-desk.png"});
// open CHANGEUSRSTAT drawer
await p.evaluate(()=>{const c=[...document.querySelectorAll('.card-interactive')].find(x=>/CHANGEUSRSTAT/.test(x.textContent));c&&c.click();}); await new Promise(r=>setTimeout(r,600));
R.drawer=await p.$('[role="dialog"]')!==null;
R.drawerHasFlow=await p.evaluate(()=>/רצף ביצוע/.test(document.querySelector('[role="dialog"]')?.textContent||''));
R.drawerHasVerif=await p.evaluate(()=>/מאומת בתיעוד/.test(document.querySelector('[role="dialog"]')?.textContent||''));
await p.screenshot({path:"/tmp/p152b-drawer.png"});
R.errors=e.length; await p.close();
// mobile
const p2=await b.newPage(); await p2.setViewport({width:390,height:844,isMobile:true,hasTouch:true});
await p2.evaluateOnNewDocument(()=>{try{localStorage.setItem("neo:onboarded","1");}catch{}});
await p2.goto(`http://localhost:${PORT}/bapi/`,{waitUntil:"networkidle0"}); await new Promise(r=>setTimeout(r,600));
R.mobileOverflow=await p2.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
await p2.screenshot({path:"/tmp/p152b-mob.png"});
await b.close(); srv.close();
console.log(JSON.stringify(R,null,1));
