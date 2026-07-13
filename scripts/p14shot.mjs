import http from "node:http"; import { readFile, stat } from "node:fs/promises"; import { extname, join, normalize } from "node:path"; import puppeteer from "puppeteer-core";
const ROOT=new URL("../out/",import.meta.url).pathname; const PORT=Number(process.env.PORT||4350);
const T={".html":"text/html",".js":"text/javascript",".css":"text/css",".json":"application/json",".png":"image/png",".svg":"image/svg+xml",".woff2":"font/woff2"};
async function rf(u){let p=normalize(join(ROOT,decodeURIComponent(u.split("?")[0])));if(!p.startsWith(ROOT))return null;try{const s=await stat(p);if(s.isDirectory())p=join(p,"index.html");}catch{}try{await stat(p);return p;}catch{}return null;}
const srv=http.createServer(async(req,res)=>{const f=await rf(req.url==="/"?"/index.html":req.url);if(!f){res.writeHead(404);res.end();return;}res.writeHead(200,{"content-type":T[extname(f)]||"application/octet-stream"});res.end(await readFile(f));});
await new Promise(r=>srv.listen(PORT,r));
const b=await puppeteer.launch({executablePath:"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",headless:"new",args:["--no-sandbox"]});
const routes=JSON.parse(process.env.ROUTES||'[]'); const tag=process.env.TAG||"x";
for(const [name,path,w,h] of routes){
  const p=await b.newPage(); await p.setViewport({width:w,height:h,isMobile:w<820,hasTouch:w<1024,deviceScaleFactor:1});
  await p.evaluateOnNewDocument(()=>{try{localStorage.setItem("neo:onboarded","1");localStorage.setItem("neo:lib:visited","1");}catch{}});
  try{await p.goto(`http://localhost:${PORT}${path}`,{waitUntil:"networkidle0",timeout:45000});}catch{}
  await new Promise(r=>setTimeout(r,900));
  await p.screenshot({path:`/tmp/${tag}-${name}.png`}); await p.close();
}
await b.close(); srv.close(); console.log("shots:",routes.map(r=>r[0]).join(","));
