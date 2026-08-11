const API = "https://sap-books-api.vercel.app/api/library";
// Exactly the payload lib/ai/client.ts builds.
const scopeMode = (s) => s.section ? "section" : s.chapter != null ? "chapter" : s.bookId ? "book" : "library";
const ask = async (question, s) => {
  const r = await fetch(API, { method:"POST", headers:{"content-type":"application/json"},
    body: JSON.stringify({ question, bookId: s.bookId ?? null, chapter: s.chapter ?? null,
                           section: s.section ?? null, scope: scopeMode(s) }) });
  if (!r.ok) return { err:`HTTP ${r.status}` };
  return r.json();
};
const show = (tag,q,s,j) => {
  if (j.err) { console.log(`\n[${tag}] ${q}\n  ERROR ${j.err}`); return null; }
  const src = j.sources || [];
  const ans = String(j.answer||"");
  const he = (ans.match(/[֐-׿]/g)||[]).length;
  const inScope = src.every(x => !s.bookId || (x.bookId===s.bookId
    && (s.chapter==null || Number(x.chapter)===Number(s.chapter))
    && (!s.section || String(x.section||"").startsWith(s.section))));
  console.log(`\n[${tag}] ${q}`);
  console.log(`  ${ans.length}ch | he ${Math.round(he/Math.max(1,ans.replace(/\s/g,"").length)*100)}% | policy=${j.policy} | sources=${src.length} | inScope=${s.bookId?inScope:"n/a"}`);
  console.log(`  ${ans.split("\n").find(l=>l.trim())?.slice(0,105)}`);
  console.log(`  books: ${[...new Set(src.map(x=>x.bookId))].join(", ")||"-"}`);
  for (const x of src.slice(0,4))
    console.log(`    · ${x.bookId} ch${x.chapter} §${x.section} page=${x.page?`${x.page.from}-${x.page.to}`:"none"} quote=${x.quote?"Y":"n"} ${String(x.sectionTitle||"").slice(0,38)}`);
  return { src, ans, inScope };
};
const S = { bookId:"book8", chapter:3, section:"3.2" };
console.log("======= TEST A — SCOPED: book8 · ch3 · §3.2 =======");
let scopedOk = true;
for (const q of [
  "מהם מיקומים פונקציונליים ואיך מבנים אותם?",
  "מה ההבדל בין הזנה בודדת להזנה קבוצתית של מיקומים פונקציונליים?",
  "מהו מיקום פונקציונלי של ייחוס?",
]) { const r = show("SCOPED", q, S, await ask(q,S)); if (r && !r.inScope) scopedOk = false; }
console.log(`\n  >>> SCOPED ISOLATION: ${scopedOk ? "PASS" : "FAIL"}`);
