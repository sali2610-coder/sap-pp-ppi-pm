import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const ctx = await b.newContext({ viewport:{width:1400,height:1000} });
await ctx.addInitScript(()=>{localStorage.setItem("neo:onboarded","1");localStorage.setItem("neo:role","consultant");});
const p = await ctx.newPage();

// 1. Library: set a scope + seed a thread.
await p.goto("https://sapbysali.app/library/ask/", { waitUntil:"networkidle", timeout:90000 });
await p.waitForTimeout(1500);
await p.evaluate(() => {
  localStorage.setItem("neo:ai:lib:scope", JSON.stringify({ bookId:"book8", chapter:3, section:"3.2" }));
  localStorage.setItem("neo:ai:lib:threads", JSON.stringify([{ id:"t-lib", title:"שאלה על ספר 8", turns:[{q:"library only"}] }]));
});
await p.reload({ waitUntil:"networkidle" });
await p.waitForTimeout(1500);
const libScope = await p.evaluate(()=>document.querySelector('section[aria-label="שיחה"]')?.textContent.slice(0,60).replace(/\s+/g," "));
console.log("library scope shown :", libScope);

// 2. Go to AI Chat.
await p.goto("https://sapbysali.app/chat/", { waitUntil:"networkidle", timeout:90000 });
await p.waitForTimeout(1800);
const chat = await p.evaluate(()=>({
  scopeText: document.querySelector('section[aria-label="שיחה"]')?.textContent.slice(0,60).replace(/\s+/g," "),
  libKeys: Object.keys(localStorage).filter(k=>k.startsWith("neo:ai:lib")),
  conKeys: Object.keys(localStorage).filter(k=>k.startsWith("neo:ai:con")),
  conScope: localStorage.getItem("neo:ai:con:scope"),
  conThreads: localStorage.getItem("neo:ai:con:threads"),
  bodyHasLibThread: document.body.innerText.includes("שאלה על ספר 8"),
}));
console.log("chat scope shown    :", chat.scopeText);
console.log("consult scope key   :", chat.conScope ?? "(none)");
console.log("consult threads key :", chat.conThreads ? "present" : "(none)");
console.log("library thread visible in chat:", chat.bodyHasLibThread);
console.log("namespaces          : lib=", chat.libKeys.length, " con=", chat.conKeys.length);

// 3. Back to library — its own state restored?
await p.goto("https://sapbysali.app/library/ask/", { waitUntil:"networkidle", timeout:90000 });
await p.waitForTimeout(1800);
const back = await p.evaluate(()=>({
  scope: localStorage.getItem("neo:ai:lib:scope"),
  shown: document.querySelector('section[aria-label="שיחה"]')?.textContent.slice(0,60).replace(/\s+/g," "),
}));
console.log("back in library     :", back.shown);
console.log("library scope key   :", back.scope);
await b.close();
