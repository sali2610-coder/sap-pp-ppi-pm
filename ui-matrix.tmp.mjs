import { chromium } from "playwright-core";
import { writeFileSync } from "node:fs";
const ACTIONS=["סכם","הסבר בפשטות","צור תרשים","השווה ל-S/4HANA","שאלות חזרה","צור צ׳ק ליסט"];
const rows=[];
const b=await chromium.launch({executablePath:"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"});

async function runScope(bookId,chapter,section,label){
  const ctx=await b.newContext({viewport:{width:1440,height:1200}});
  await ctx.addInitScript(([bk,ch,sec])=>{localStorage.setItem("neo:onboarded","1");localStorage.setItem("neo:role","consultant");
    localStorage.setItem("neo:ai:lib:scope",JSON.stringify({bookId:bk,chapter:ch,section:sec||undefined}));},[bookId,chapter,section]);
  const p=await ctx.newPage();
  const payloads=[];
  p.on("request",r=>{if(/library-stream/.test(r.url())){try{payloads.push(JSON.parse(r.postData()||"{}"));}catch{}}});
  await p.goto("http://localhost:3111/library/ask/",{waitUntil:"networkidle",timeout:120000});
  await p.waitForTimeout(2500);
  for(const act of ACTIONS){
    const sel=`section[aria-label="שיחה"] button:text-is("${act}")`;
    // The action bar unmounts while a turn is in flight, so wait for the
    // control to come back rather than guessing a delay.
    try{ await p.waitForSelector(sel,{timeout:180000,state:"attached"}); }
    catch{ rows.push({label,act,result:"FAIL",why:"button never returned"}); continue; }
    const btn=await p.$(sel);
    // Count TURNS, not characters. A diagram answer renders as SVG, so
    // innerText SHRINKS when it arrives — a length-based wait never fires and
    // the run stalls on the one action most likely to succeed.
    const turnsBefore=await p.evaluate(()=>document.querySelectorAll('[data-turn]').length
      || document.querySelectorAll('section[aria-label="שיחה"] .space-y-2\\.5').length);
    const before=await p.evaluate(()=>document.body.innerText);
    await btn.click();
    try{ await p.waitForFunction((n)=>(document.querySelectorAll('[data-turn]').length
      || document.querySelectorAll('section[aria-label="שיחה"] .space-y-2\\.5').length) > n, turnsBefore,{timeout:200000}); }catch{}
    try{ await p.waitForSelector(sel,{timeout:200000,state:"attached"}); }catch{}
    await p.waitForTimeout(1200);
    const after=await p.evaluate(()=>document.body.innerText);
    const added=after.slice(Math.max(0,before.length-40));
    const refused=/לא מצאתי במקורות/.test(added);
    const figs=await p.evaluate(()=>document.querySelectorAll('section[aria-label="שיחה"] figure svg').length);
    const pl=payloads[payloads.length-1]||{};
    rows.push({label,act,
      scopeOk: pl.bookId===bookId && Number(pl.chapter)===chapter && (section? pl.section===section : !pl.section),
      task: pl.task||"-", len: after.length-before.length, refused, figs,
      // A diagram passes on the presence of a rendered SVG, not on prose length.
      result: refused ? "FAIL"
            : (act==="צור תרשים" ? (figs>0?"PASS":"FAIL")
            : (after.length-before.length>200 ? "PASS":"FAIL"))});
    await p.waitForTimeout(800);
  }
  await ctx.close();
}
await runScope("book1",1,"1.2.1","B1 §1.2.1");
await runScope("book1",1,"1.2.2","B1 §1.2.2");
writeFileSync("/tmp/uimatrix.json",JSON.stringify(rows,null,1));
console.log("scope       action            scopeOK task              added  refused result");
for(const r of rows) console.log(`${(r.label||"").padEnd(11)} ${r.act.padEnd(17)} ${String(r.scopeOk).padEnd(7)} ${String(r.task).padEnd(17)} ${String(r.len).padStart(5)} svg=${String(r.figs??"-").padEnd(3)} ${String(r.refused).padEnd(7)} ${r.result}`);
console.log("PASS:",rows.filter(r=>r.result==="PASS").length,"/",rows.length);
await b.close();
