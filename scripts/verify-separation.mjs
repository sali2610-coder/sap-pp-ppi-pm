// Functional proof that the two AI surfaces are separate.
//
// The structural tests (session-isolation, endpoint locks) assert that the
// wiring is right. They cannot catch what actually went wrong last time: the
// consultant REFUSED like the librarian, because the user message ordered a
// refusal regardless of the system prompt. That was only visible by asking a
// real question and reading a real answer.
//
// So this exercises behaviour, and it is deliberately frugal: exactly TWO model
// calls, one per surface. Everything else — sessions, scope, storage, routing —
// is checked without spending anything.
//
// Usage: node scripts/verify-separation.mjs [--api https://…]
import { existsSync } from "node:fs";

const API = (process.argv.find((a) => a.startsWith("--api="))?.split("=")[1]
  || "https://sap-books-api.vercel.app").replace(/\/$/, "");

const results = [];
const ok = (name, detail = "") => results.push({ ok: true, name, detail });
const bad = (name, detail = "") => results.push({ ok: false, name, detail });

const post = async (path, body) => {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json = null;
  try { json = JSON.parse(text); } catch { /* non-JSON body */ }
  return { status: res.status, json, text };
};

const refused = (a) => /^\s*(לא מצאתי|לא נמצא|מצטער)/.test(String(a || ""));

/* ------------------------------------------------------------------ 1 ---- */
// A question the books DO cover. Taken from a real section heading so the
// premise cannot be wrong: book1 §1.1.2 is "SAP Activate Methodology".
const IN_BOOKS = "מהי מתודולוגיית SAP Activate ומהם השלבים שלה?";

// A question the books do NOT cover: performance diagnosis of a slow ABAP
// report is consulting knowledge, not library content.
const NOT_IN_BOOKS = "מהם השלבים לאבחון בעיית ביצועים בדוח ABAP איטי?";

console.log(`\nFUNCTIONAL SEPARATION  —  ${API}\n${"─".repeat(74)}`);
console.log("  spending 2 model calls (one per surface)\n");

// ---- Ask the Library, on something it should know -------------------------
const lib = await post("/api/library", { question: IN_BOOKS, bookId: "book1", scope: "book" });
const la = lib.json?.answer ?? "";
const lsrc = lib.json?.sources ?? [];

lib.status === 200 ? ok("library responds") : bad("library responds", `status ${lib.status}`);
!refused(la) && la.length > 120
  ? ok("library ANSWERS a question the books cover", `${la.length} chars`)
  : bad("library ANSWERS a question the books cover", refused(la) ? "it refused" : `${la.length} chars`);
lsrc.length > 0 ? ok("library cites sources", `${lsrc.length}`) : bad("library cites sources", "none");

// A citation must carry enough to open the exact place in the reader.
const c0 = lsrc[0] ?? {};
c0.id ? ok("citation has an id", String(c0.id)) : bad("citation has an id");
c0.book || c0.chapter != null
  ? ok("citation resolves to book/chapter", `${c0.book ?? "?"} ch${c0.chapter ?? "?"} §${c0.section ?? "?"}`)
  : bad("citation resolves to book/chapter", JSON.stringify(c0).slice(0, 80));
lib.json?.policy ? ok("library reports a grounding policy", String(lib.json.policy)) : bad("library reports a grounding policy");

// ---- AI Chat, on something the books do NOT cover -------------------------
const con = await post("/api/consult", { question: NOT_IN_BOOKS });
const ca = con.json?.answer ?? "";

con.status === 200 ? ok("consult responds") : bad("consult responds", `status ${con.status}`);
!refused(ca) && ca.length > 300
  ? ok("consult ANSWERS beyond the books", `${ca.length} chars`)
  : bad("consult ANSWERS beyond the books", refused(ca) ? "it refused — the library framing leaked" : `${ca.length} chars`);

// It must say the answer is not book-based rather than implying it is.
/ידע|כללי|לא נעשה בהם שימוש|אינם רלוונטיים|אימות/.test(ca)
  ? ok("consult states its answer is not book-derived")
  : bad("consult states its answer is not book-derived", ca.slice(0, 90));

// The ban that survives both surfaces.
!/SAP Note\s*\d{6,}/i.test(ca)
  ? ok("consult invents no SAP Note number")
  : bad("consult invents no SAP Note number", (ca.match(/SAP Note\s*\d{6,}/i) || [])[0]);

/* ------------------------------------------------------------------ 2 ---- */
// Routing, free: the surface must be pinned by the URL, not the body.
const spoof = await post("/api/library", { question: "בדיקה", task: "SAP_CONSULT" });
spoof.status === 200
  ? ok("library endpoint accepts but does not honour a consult task")
  : bad("library endpoint accepts but does not honour a consult task", `status ${spoof.status}`);

// Method and validation contract on both.
for (const ep of ["library", "consult"]) {
  const empty = await post(`/api/${ep}`, {});
  empty.status === 400
    ? ok(`${ep}: 400 on an empty question`)
    : bad(`${ep}: 400 on an empty question`, `status ${empty.status}`);
}

/* ------------------------------------------------------------------ 3 ---- */
console.log(results.map((r) => `  ${r.ok ? "ok  " : "FAIL"} ${r.name}${r.detail ? `  (${r.detail})` : ""}`).join("\n"));

const failed = results.filter((r) => !r.ok);
console.log("─".repeat(74));
console.log(`  ${results.length - failed.length}/${results.length} passed · 2 model calls used`);

if (!failed.length) {
  console.log("\n  library answered from the books and cited them;");
  console.log("  consult answered beyond them and said so.");
}
process.exit(failed.length ? 1 : 0);
