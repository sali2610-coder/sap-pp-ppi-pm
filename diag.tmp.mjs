const API = "https://sap-books-api.vercel.app/api/library";
const q = "מהו מיקום פונקציונלי של ייחוס?";
const variants = [
  ["bookId only",            { bookId: "book8" }],
  ["bookId+chapter",         { bookId: "book8", chapter: 3 }],
  ["bookId+chapter+section", { bookId: "book8", chapter: 3, section: "3.2" }],
  ["book (alt key)",         { book: "book8" }],
];
for (const [label, scope] of variants) {
  const r = await fetch(API, { method:"POST", headers:{"content-type":"application/json"},
    body: JSON.stringify({ question: q, scope }) });
  const j = await r.json();
  const s = j.sources || [];
  console.log(`${label.padEnd(24)} policy=${String(j.policy).padEnd(7)} n=${s.length} books=${[...new Set(s.map(x=>x.bookId))].join(",")||"-"} secs=${s.slice(0,3).map(x=>x.bookId+"/"+x.chapter+"/"+x.section).join(" ")}`);
}
