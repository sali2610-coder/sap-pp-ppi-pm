const API = "https://sap-books-api.vercel.app/api/library";
const SCOPE = { bookId: "book8", chapter: 3, section: "3.2" };

const ask = async (question, scope) => {
  const r = await fetch(API, { method: "POST", headers: { "content-type": "application/json" },
    body: JSON.stringify({ question, scope }) });
  if (!r.ok) return { err: `HTTP ${r.status}` };
  return r.json();
};

const show = (tag, q, scope, j) => {
  if (j.err) { console.log(`\n[${tag}] ${q}\n  ERROR ${j.err}`); return; }
  const srcs = j.sources || j.citations || [];
  const ans = String(j.answer || "");
  const heChars = (ans.match(/[֐-׿]/g) || []).length;
  console.log(`\n[${tag}] ${q}`);
  console.log(`  answer: ${ans.length} chars | hebrew ${Math.round(heChars/Math.max(1,ans.replace(/\s/g,"").length)*100)}% | policy=${j.policy ?? "-"}`);
  console.log(`  first line: ${ans.split("\n").find(l=>l.trim())?.slice(0,110)}`);
  const inScope = srcs.every(s => !scope.bookId || (s.bookId === scope.bookId
    && (scope.chapter == null || s.chapter === scope.chapter)
    && (!scope.section || String(s.section||"").startsWith(scope.section))));
  console.log(`  sources: ${srcs.length} | all in scope: ${scope.bookId ? inScope : "n/a (whole library)"}`);
  const books = [...new Set(srcs.map(s=>s.bookId))];
  console.log(`  books: ${books.join(", ") || "-"}`);
  for (const s of srcs.slice(0,4))
    console.log(`    · ${s.bookId} ch${s.chapter} §${s.section} page=${s.page ? JSON.stringify(s.page) : "none"} quote=${s.quote ? "yes" : "no"} title=${String(s.sectionTitle||s.title||"").slice(0,40)}`);
};

console.log("=========== TEST A — SCOPED (book8 · ch3 · 3.2) ===========");
for (const q of [
  "מהם מיקומים פונקציונליים ואיך יוצרים אותם?",
  "מה ההבדל בין הזנה בודדת להזנה קבוצתית של מיקומים פונקציונליים?",
  "מהו מיקום פונקציונלי של ייחוס (reference functional location)?",
]) show("SCOPED", q, SCOPE, await ask(q, SCOPE));

console.log("\n=========== TEST B — WHOLE LIBRARY ===========");
for (const q of [
  "מהי אסטרטגיית תחזוקה (Maintenance Strategy)?",
  "מה ההבדל בין Routing ל-Master Recipe?",
  "איך עובד Batch Determination?",
]) show("WHOLE", q, {}, await ask(q, {}));

console.log("\n=========== NEGATIVE — must refuse ===========");
const nq = "מה מחיר המניה של SAP היום ומה תחזית הרווח לרבעון הבא?";
show("NEG", nq, {}, await ask(nq, {}));
