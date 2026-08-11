import { chromium } from "playwright-core";
import { readFileSync, writeFileSync } from "node:fs";
import { citationHref } from "./lib/ai/links.ts";
const BASE="https://sapbysali.app";
const pick=(bk,ch,sec)=>{const j=JSON.parse(readFileSync(`public/books/${bk}/ch${ch}.json`,"utf8"));const s=j[sec];
  const t=s?.en||s?.he||s?.facets?.consultant||s?.facets?.exec||"";
  return (String(t).split(/(?<=\.)\s+|\n/).find(x=>x.trim().length>60)||String(t).slice(0,100)).trim().slice(0,130);};
const CASES=[
 ["Book 1  shallow","book1",1,"1.1"],
 ["Book 1  deep","book1",1,"1.2.1"],
 ["Book 2  deep","book2",4,"4.4.1"],
 ["Book 5  very deep","book5",9,"9.5"],
 ["Book 8  collapsed","book8",3,"3.2"],
 ["Book 8  collapsed deep","book8",3,"3.2.3"],
 ["Book 11 flat","book11",1,"1.1"],
];
const b=await chromium.launch({executablePath:"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"});
const ctx=await b.newContext({viewport:{width:1440,height:1000}});
await ctx.addInitScript(()=>{localStorage.setItem("neo:onboarded","1");localStorage.setItem("neo:role","consultant");});
const rows=[];
for(const [label,bk,ch,sec] of CASES){
  let q=""; try{q=pick(bk,ch,sec);}catch{}
  const href=citationHref(bk,ch,sec,q);
  const p=await ctx.newPage();
  const r=await p.goto(BASE+href,{waitUntil:"networkidle",timeout:120000});
  // wait for the mark rather than a fixed sleep
  let marked=false;
  try{ await p.waitForSelector("mark[data-neo-cited]",{timeout:25000}); marked=true; }catch{}
  await p.waitForTimeout(1200);
  const i=await p.evaluate((id)=>{const el=document.getElementById(id);const m=document.querySelector("mark[data-neo-cited]");
    const rect=m?.getBoundingClientRect();
    return{section:!!el,yellow:!!m,inView:rect?rect.top>-120&&rect.top<innerHeight:false,
      markText:(m?.textContent||"").slice(0,60), bg:m?getComputedStyle(m).backgroundColor:""};},`sec-${sec}`);
  const pass=i.section&&i.yellow&&i.inView;
  rows.push({label,bk,sec,...i,pass,http:r.status()});
  console.log(`${label.padEnd(24)} http=${r.status()} section=${i.section?"P":"F"} yellow=${i.yellow?"P":"F"} inView=${i.inView?"P":"F"} ${pass?"PASS":"FAIL"}  ${i.markText?JSON.stringify(i.markText.slice(0,40)):""}`);
  if(bk==="book8"&&sec==="3.2") await p.screenshot({path:"/tmp/prod-b8.png"});
  await p.close();
}
writeFileSync("/tmp/prodos.json",JSON.stringify(rows,null,1));
console.log("PASS:",rows.filter(r=>r.pass).length,"/",rows.length);
await b.close();
