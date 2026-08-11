import { chromium } from "playwright-core";
const b=await chromium.launch({executablePath:"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"});
const ctx=await b.newContext({viewport:{width:1440,height:1100}});
await ctx.addInitScript(()=>{localStorage.setItem("neo:onboarded","1");localStorage.setItem("neo:role","consultant");
  localStorage.setItem("neo:ai:lib:scope",JSON.stringify({bookId:"book1",chapter:1,section:"1.2.1"}));});
const p=await ctx.newPage();
p.on("request",r=>{ if(/library-stream|\/api\/library/.test(r.url())){
  console.log("REQ ->", r.url().split("/api/")[1]);
  console.log("PAYLOAD:", r.postData()?.slice(0,300));
}});
await p.goto("http://localhost:3111/library/ask/",{waitUntil:"networkidle",timeout:120000});
await p.waitForTimeout(3000);
const scopeShown = await p.evaluate(()=>document.querySelector('section[aria-label="שיחה"]')?.textContent.slice(0,70).replace(/\s+/g," "));
console.log("SCOPE SHOWN IN UI:", scopeShown);
const all = await p.$$eval('section[aria-label="שיחה"] button', b=>b.map(x=>x.textContent.trim()).filter(t=>t.includes("סכם")));
console.log("buttons containing 'סכם':", JSON.stringify(all));
const btn = await p.$('section[aria-label="שיחה"] button:text-is("סכם")');
console.log("exact quick-action button present:", !!btn);
if(btn){ await btn.click(); await p.waitForTimeout(30000);
  const txt = await p.evaluate(()=>document.body.innerText);
  const refused = /לא מצאתי במקורות/.test(txt);
  console.log("RESULT refused:", refused, "| page len:", txt.length);
}
await b.close();
