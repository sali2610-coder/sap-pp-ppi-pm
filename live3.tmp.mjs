import { writeFileSync } from "node:fs";
const API = "https://sap-books-api.vercel.app/api/library";
const scopeMode = (s) => s.section ? "section" : s.chapter != null ? "chapter" : s.bookId ? "book" : "library";
const ask = async (question, s={}) => {
  const r = await fetch(API, { method:"POST", headers:{"content-type":"application/json"},
    body: JSON.stringify({ question, bookId:s.bookId??null, chapter:s.chapter??null, section:s.section??null, scope:scopeMode(s) }) });
  return r.ok ? r.json() : { err:`HTTP ${r.status}` };
};
const show=(tag,q,j)=>{
  const src=j.sources||[]; const ans=String(j.answer||"");
  const he=(ans.match(/[֐-׿]/g)||[]).length;
  console.log(`\n[${tag}] ${q}`);
  console.log(`  ${ans.length}ch | he ${Math.round(he/Math.max(1,ans.replace(/\s/g,"").length)*100)}% | policy=${j.policy} | sources=${src.length} | books=${[...new Set(src.map(x=>x.bookId))].join(",")||"-"}`);
  console.log(`  ${ans.split("\n").find(l=>l.trim())?.slice(0,105)}`);
  for (const x of src.slice(0,3))
    console.log(`    · ${x.bookId} ch${x.chapter} §${x.section} page=${x.page?`${x.page.from}-${x.page.to}`:"none"} quote=${x.quote?"Y":"n"}`);
  return {src,ans};
};
console.log("======= TEST B — WHOLE LIBRARY =======");
let multi=0; const keep=[];
for (const q of [
  "מהי אסטרטגיית תחזוקה (Maintenance Strategy)?",
  "מה ההבדל בין Routing ל-Master Recipe?",
  "איך עובד Batch Determination?",
]) { const r=show("WHOLE",q,await ask(q,{}));
     if (new Set(r.src.map(x=>x.bookId)).size>1) multi++;
     const withQuote=r.src.find(x=>x.quote); if(withQuote) keep.push(withQuote); }
console.log(`\n  >>> cross-book answers: ${multi}/3`);

console.log("\n======= NEGATIVE — must refuse =======");
const nq="מה מחיר המניה של SAP היום ומה תחזית הרווח לרבעון הבא?";
const nj=await ask(nq,{}); const nr=show("NEG",nq,nj);
console.log(`  >>> refused: ${nj.policy==="REFUSE" ? "PASS" : "FAIL ("+nj.policy+")"}`);

writeFileSync("/tmp/cites.json", JSON.stringify(keep,null,1));
console.log(`\n  saved ${keep.length} quoted citations for deep-link test`);
