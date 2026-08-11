import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";
import { citationHref } from "./lib/ai/links.ts";
const cites = JSON.parse(readFileSync("/tmp/cites.json","utf8"));
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const ctx = await b.newContext({ viewport:{width:1400,height:1000} });
await ctx.addInitScript(()=>{localStorage.setItem("neo:onboarded","1");localStorage.setItem("neo:role","consultant");});
console.log("=== DEEP LINK from LIVE citations (production) ===");
for (const c of cites) {
  const href = citationHref(c.bookId, c.chapter, c.section, c.quote);
  const p = await ctx.newPage();
  const res = await p.goto("https://sapbysali.app"+href, { waitUntil:"networkidle", timeout:90000 });
  await p.waitForTimeout(3000);
  const r = await p.evaluate((sec)=>{
    const t=document.getElementById("s-"+sec); const m=document.querySelector("mark");
    const mb=m?.getBoundingClientRect();
    return { http:true, sectionRendered:!!t, marks:document.querySelectorAll("mark").length,
             markInView: mb? mb.top>0&&mb.top<innerHeight:false,
             lang: (document.body.innerText.match(/[֐-׿]/g)||[]).length>200 ? "he":"en" };
  }, c.section);
  console.log(`${c.bookId} ch${c.chapter} §${c.section}: http=${res.status()} section=${r.sectionRendered} marks=${r.marks} inView=${r.markInView} rendered=${r.lang}`);
  await p.close();
}
await b.close();
