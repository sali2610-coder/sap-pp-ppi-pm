// Deterministic evidence records for the transaction codes the research chains do not reach:
// the codes no item of either official Simplification List names (tx-queue-rest.json "rest").
// No language model is involved. Every claim is a fixed Hebrew frame around values copied
// verbatim from
//   1. the repository registry (lib/tx-registry: tx-intel, transactions, tcode-directory, tcode-catalog),
//   2. help.sap.com search records whose title or snippet prints the code as a whole token,
//   3. the SAP Fiori Apps Reference Library (public OData): the GUI transaction's own entry for
//      S/4HANA 2025 FPS01 (S32OP) and the apps whose leading transaction code is the code.
// No S/4HANA status is authored: the status the site derives stands, and the notes name the one
// action that decides it (SE93 in the target system, or an official source naming the status).
// Raw responses are saved per code for the audit trail.
//
//   node --experimental-strip-types --no-warnings --loader ./scripts/alias-loader.mjs scripts/qa/gen-tx-evidence.mts \
//        [--pilot IA01,CR01] [--limit N] [--raw <dir>] [--out data/verification/transactions-auto.ts]
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { txRegistry } from "@/lib/tx-registry";
import { TX_INTEL } from "@/data/tx-intel";
import { TRANSACTIONS } from "@/data/transactions";
import { TCODE_DIRECTORY } from "@/data/tcode-directory";
import { TCODE_CATALOG } from "@/data/tcode-catalog";

const args = process.argv.slice(2);
const opt = (n: string) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
const DATE = new Date().toISOString().slice(0, 10);
const RAW = opt("--raw") || "/tmp/tx-evidence-raw";
const OUT = opt("--out") || "data/verification/transactions-auto.ts";
const INDEX_OUT = "audit/master-completion/tx-evidence-index.json";
const pilot = opt("--pilot")?.split(",").map((s) => s.trim().toUpperCase()).filter(Boolean);
const limit = Number(opt("--limit") || 0);
/** --from-raw: rebuild the records from the saved responses in --raw instead of fetching again. */
const FROM_RAW = args.includes("--from-raw");
mkdirSync(RAW, { recursive: true });

/* ------------------------------------------------------------------ the set */
const read = (p: string) => readFileSync(p, "utf8");
const authored = new Set(
  [...(read("data/verification/transactions.ts") + read("data/verification/transactions-b.ts")).matchAll(/^\s{4}id:\s*"tx:([^"]+)"/gm)].map((m) => m[1]),
);
// Every registry code without a researched record (transactions.ts / transactions-b.ts): the codes no
// Simplification List item names, and the named ones the research chains have not reached yet. A
// researched record supersedes the generated one (data/verification/index.ts), so regenerating after
// a chain batch simply drops the codes the chain has written.
// Same syntax as lib/evidence/canonical.ts (tx): a registry name outside it cannot carry a record.
const TX_SYNTAX = /^[A-Z0-9_\/-]{2,20}$/;
const SIMPL = JSON.parse(read("audit/master-completion/simpl-tcode-index.json"));
const allCodes = [...txRegistry().keys()].sort();
const skippedSyntax = allCodes.filter((c) => !TX_SYNTAX.test(c));
let codes = pilot ?? allCodes.filter((c) => !authored.has(c) && TX_SYNTAX.test(c));
if (limit) codes = codes.slice(0, limit);
/** The two official lists, their extracted text (line numbers in simpl-tcode-index.json are 1-based
 *  lines of these files) and their citation data. */
const LISTS: Record<string, { title: string; release: string; url: string; version: string; lines: string[] }> = Object.fromEntries(
  SIMPL.lists.map((l: any) => [l.key, {
    title: String(l.title).replace(/[\u2013\u2014]/g, "-"), release: l.release, url: l.url,
    version: (/document version ([\d.]+)/.exec(l.title || "") || [])[1] || "",
    lines: read(`scratchpad/official/SIMPL_OP${l.key}.pdf.txt`).split("\n"),
  }]),
);
const simplLists = SIMPL.lists
  .map((l: any) => { const v = /document version ([\d.]+)/.exec(l.title || ""); return `${l.release}${v ? ` גרסת מסמך ${v[1]}` : ""}`; }).join(", ");

/* ------------------------------------------------------- repository sources */
const reg = txRegistry();
const inIntel = new Set(Object.keys(TX_INTEL).map((k) => k.toUpperCase()));
const inTx = new Set(TRANSACTIONS.map((t) => t.code.toUpperCase()));
const inDir = new Set(TCODE_DIRECTORY.map((t) => t.code.toUpperCase()));
const catEn = new Map(TCODE_CATALOG.filter((t) => t.en).map((t) => [t.code.toUpperCase(), t.en as string]));
const primaryFile = (c: string) =>
  inIntel.has(c) ? "data/tx-intel.ts" : inTx.has(c) ? "data/transactions.ts" : inDir.has(c) ? "data/tcode-directory.ts" : "data/tcode-catalog.ts";

/* ----------------------------------------------------------------- network */
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
async function getJson(url: string): Promise<any> {
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const r = await fetch(url, { headers: { accept: "application/json" } });
      if (r.status === 429 || r.status >= 500) { await sleep(1500 * (attempt + 1)); continue; }
      if (!r.ok) return { __status: r.status };
      return await r.json();
    } catch { await sleep(1500 * (attempt + 1)); }
  }
  return { __status: "failed" };
}
const ENT: Record<string, string> = { nbsp: " ", amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", hellip: "...", ndash: "-", mdash: "-", rsquo: "'", lsquo: "'", rdquo: '"', ldquo: '"', reg: "(R)", trade: "(TM)", copy: "(C)",
  rarr: "→", larr: "←", harr: "↔", bull: "•", middot: "·", times: "×", deg: "°", sect: "§", laquo: "«", raquo: "»",
  auml: "ä", ouml: "ö", uuml: "ü", Auml: "Ä", Ouml: "Ö", Uuml: "Ü", szlig: "ß", eacute: "é", egrave: "è", agrave: "à", ccedil: "ç" };
const clean = (s: unknown) => String(s ?? "")
  .replace(/<[^>]+>/g, "")
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&([a-z]+);/gi, (m, n) => ENT[n] ?? ENT[n.toLowerCase()] ?? m)
  .replace(/\s+/g, " ").replace(/(\.\.\.\s*){2,}/g, "... ").trim();
async function helpSearch(q: string, product: string, size: number) {
  const p = new URLSearchParams({ area: "content", q, language: "en-US", state: "PRODUCTION", transtype: "standard", product, format: "json", from: "0", size: String(size) });
  const body = await getJson(`https://help.sap.com/http.svc/elasticsearch?${p}`);
  const results = body?.data?.results || [];
  return {
    ok: !body.__status, total: results.length,
    records: results.map((r: any) => ({
      title: clean(r.title), deliverable: clean(r.deliverableTitle), product: r.product, version: r.version, versionId: r.versionId,
      loio: r.loio, url: `https://help.sap.com${r.url}`, date: r.date, snippet: clean(r.snippet),
    })),
  };
}
const FAL = "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/services/SingleApp.xsodata";
const VIEWER = "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html";
const odq = (s: string) => encodeURIComponent(s.replace(/'/g, "''"));
async function falLeading(code: string) {
  const sel = "fioriId,AppName,UITechnology,AppType,isPublished,LeadingTransactionCodes";
  const d = await getJson(`${FAL}/FuzzySearch?$filter=${encodeURIComponent(`releaseId eq 'S32OP' and LeadingTransactionCodes eq '${code.replace(/'/g, "''")}'`)}&$select=${sel}&$format=json`);
  return { ok: !d.__status, apps: (d?.d?.results || []).map(({ __metadata, ...r }: any) => r) };
}
async function falGuiEntry(code: string) {
  const d = await getJson(`${FAL}/DetailsParameters(inpfioriId='${odq(code)}',inpreleaseId='S32OP',inpLanguage='EN')/Results?$select=fioriId,AppName,UITechnology,ApplicationType,isPublished,NumberofSuccessors,ReleaseName&$format=json`);
  const row = (d?.d?.results || [])[0];
  if (!row) return { ok: !d.__status, entry: null, successors: [] as any[] };
  const { __metadata, ...entry } = row;
  let successors: any[] = [];
  if (Number(entry.NumberofSuccessors) > 0) {
    const k = `inpfioriId='${odq(code)}',inpreleaseId='S32OP',inpLanguage='EN',fioriId='${odq(code)}',releaseId='S32OP'`;
    const s = await getJson(`${FAL}/Details(${k})/Successors?$format=json`);
    successors = (s?.d?.results || []).map(({ __metadata, ...r }: any) => r);
  }
  return { ok: !d.__status, entry, successors };
}

/* ------------------------------------------------------------ text helpers */
const RISKY = /\b(TODO|TBD|FIXME|lorem|xxx|placeholder|always|never|guaranteed|definitely|certainly|fully supported|officially)\b|\?\?\?/i;
const dash = (s: string) => s.replace(/[–—]/g, "-");
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
function tokenRe(code: string) { return new RegExp(`(^|[^A-Z0-9_/])${esc(code)}(?![A-Z0-9_])`); }
function fragmentAround(text: string, code: string): string | null {
  const m = tokenRe(code).exec(text);
  if (!m) return null;
  const at = m.index + m[1].length;
  let a = Math.max(0, at - 90), b = Math.min(text.length, at + code.length + 90);
  while (a > 0 && text[a - 1] !== " ") a--;
  while (b < text.length && text[b] !== " ") b++;
  return `${a > 0 ? "... " : ""}${text.slice(a, b).trim()}${b < text.length ? " ..." : ""}`.replace(/(\.\.\.\s*){2,}/g, "... ").trim();
}
/** A pure-letter code (SCOT, SARA) can collide with a word or acronym: accept it only when the
 *  text around it names a transaction. Codes with a digit, slash or underscore are specific. */
function specificEnough(code: string, text: string): boolean {
  if (!/^[A-Z]+$/.test(code)) return true;
  const m = tokenRe(code).exec(text);
  if (!m) return false;
  const around = text.slice(Math.max(0, m.index - 80), m.index + code.length + 80);
  return /(transaction|t-code|tcode|transaktion)/i.test(around);
}

/* -------------------------------------------------------------- per code */
type Ev = Record<string, unknown>;
async function build(code: string) {
  const r = reg.get(code);
  if (!r) return null;
  const rawFile = path.join(RAW, `${code.replace(/\//g, "_")}.json`);
  let s4, erp, lead, gui;
  if (FROM_RAW && existsSync(rawFile)) {
    ({ s4, erp, lead, gui } = JSON.parse(readFileSync(rawFile, "utf8")));
    for (const res of [s4, erp]) for (const x of res.records) { x.title = clean(x.title); x.deliverable = clean(x.deliverable); x.snippet = clean(x.snippet); }
  } else {
    [s4, erp, lead, gui] = await Promise.all([
      helpSearch(code, "SAP_S4HANA_ON-PREMISE", 20), helpSearch(code, "SAP_ERP", 10), falLeading(code), falGuiEntry(code),
    ]);
    writeFileSync(rawFile, JSON.stringify({ code, fetched: DATE, s4, erp, lead, gui }, null, 1));
  }

  const evidence: Ev[] = [];
  const file = primaryFile(code);
  const he = dash(r.he || r.area || "");
  evidence.push({
    sourceType: "repository", sourceTitle: `רשומת המאגר: ${file.replace("data/", "")}#${code}`,
    product: "SAP ECC / SAP S/4HANA", edition: "on-premise", accessedAt: "DATE",
    claim: `רשומת המאגר מתארת את ${code} כ'${he}', מודול ${r.module}${r.area && dash(r.area) !== he ? `, תחום '${dash(r.area)}'` : ""}.`,
    verificationLevel: "repository_verified", repoRef: `${file}#${code}`,
  });
  const en = catEn.get(code);
  if (en && file !== "data/tcode-catalog.ts") {
    evidence.push({
      sourceType: "repository", sourceTitle: `רשומת המאגר: tcode-catalog.ts#${code}`,
      product: "SAP ECC / SAP S/4HANA", edition: "on-premise", accessedAt: "DATE",
      claim: `קטלוג הטרנזקציות של המאגר נותן ל-${code} את הכותרת האנגלית '${dash(en)}'.`,
      verificationLevel: "repository_verified", repoRef: `data/tcode-catalog.ts#${code}`,
    });
  }

  const pick = (res: typeof s4, max: number) => {
    const seen = new Set<string>(); const out: any[] = [];
    const sorted = [...res.records].sort((a, b) => String(b.versionId).localeCompare(String(a.versionId)));
    for (const x of sorted) {
      if (out.length >= max || seen.has(x.loio)) continue;
      const inTitle = tokenRe(code).test(x.title) && specificEnough(code, x.title + " " + x.snippet);
      const frag = inTitle ? null : fragmentAround(x.snippet, code);
      if (!inTitle && !(frag && specificEnough(code, x.snippet))) continue;
      const quote = dash(inTitle ? x.title : (frag as string));
      if (RISKY.test(quote) || RISKY.test(x.title)) continue;
      seen.add(x.loio); out.push({ ...x, inTitle, quote });
    }
    return out;
  };
  const s4hits = pick(s4, 2), erphits = pick(erp, 1);
  for (const [hits, product, edition] of [[s4hits, "SAP S/4HANA", "on-premise"], [erphits, "SAP ERP", "ecc"]] as const) {
    for (const x of hits) {
      evidence.push({
        sourceType: "sap_help", sourceTitle: dash(`${x.title} | ${x.deliverable}`), url: x.url, product: x.product || product, edition, release: x.versionId, accessedAt: "DATE",
        claim: `רשומת החיפוש הרשמית (${dash(x.deliverable)}, ${x.version}, versionId ${x.versionId}, loio ${x.loio}) נוקבת בקוד ${code} ${x.inTitle ? "בכותרתה" : "בסניפט"}: '${x.quote}'.`,
        verificationLevel: "sap_official_verified",
      });
    }
  }

  const g = gui.entry;
  if (g) {
    const succ = gui.successors.map((s: any) => `${s.successor} '${dash(clean(s.successorName))}'`).join(", ");
    evidence.push({
      sourceType: "fiori_library", sourceTitle: `Fiori Apps Library · App ${code} '${dash(clean(g.AppName))}' (${g.UITechnology}), release S32OP (${g.ReleaseName})`,
      url: `${VIEWER}#/detail/Apps('${code}')/S32OP`, product: "SAP S/4HANA", edition: "on-premise", release: "2025.001", accessedAt: "DATE",
      claim: `ספריית האפליקציות הרשמית של Fiori רושמת את ${code} כאפליקציה '${dash(clean(g.AppName))}' מסוג ${g.UITechnology} (${g.ApplicationType}) במהדורת ${g.ReleaseName} (S32OP), בסטטוס '${g.isPublished}'${succ ? `; הספרייה רושמת לה יורשת: ${succ}` : ""}.`,
      verificationLevel: "sap_official_verified",
    });
  }
  const leading = lead.apps.filter((a: any) => a.fioriId !== code).slice(0, 3);
  for (const a of leading) {
    evidence.push({
      sourceType: "fiori_library", sourceTitle: `Fiori Apps Library · App ${a.fioriId} '${dash(clean(a.AppName))}' (${a.UITechnology}), release S32OP`,
      url: `${VIEWER}#/detail/Apps('${a.fioriId}')/S32OP`, product: "SAP S/4HANA", edition: "on-premise", release: "2025.001", accessedAt: "DATE",
      claim: `ספריית האפליקציות הרשמית של Fiori רושמת במהדורת S/4HANA 2025 FPS01 (S32OP) את האפליקציה ${a.fioriId} '${dash(clean(a.AppName))}' (${a.UITechnology}, '${a.isPublished}') עם קוד הטרנזקציה המוביל ${code}.`,
      verificationLevel: "sap_official_verified",
    });
  }

  // The Simplification List items that name the code, one row per item (2025 first), each quoting
  // the exact line of the item text that prints the code. Context only: what the item rules for
  // this code is left to a researcher.
  const named: { key: string; item: string; title: string; lines: number[] }[] =
    Object.entries(SIMPL.codes[code] || {}).flatMap(([key, items]: [string, any]) => (items as any[]).map((it) => ({ key, ...it })))
      .sort((a, b) => b.key.localeCompare(a.key));
  for (const it of named.slice(0, 3)) {
    const L = LISTS[it.key];
    const hit = (it.lines || []).map((n: number) => L.lines[n - 1] || "").find((ln: string) => tokenRe(code).test(ln));
    if (!hit) continue;
    const quote = dash(hit.replace(/\s+/g, " ").trim()).slice(0, 240);
    if (RISKY.test(quote)) continue;
    evidence.push({
      sourceType: "simplification_item", sourceTitle: `${L.title} · item ${it.item} ${dash(it.title)}`,
      url: L.url, product: "SAP S/4HANA", edition: "on-premise", release: L.release, accessedAt: "DATE",
      claim: `פריט ${it.item} '${dash(it.title)}' ברשימת הפישוט הרשמית (${L.release}, גרסת מסמך ${L.version}) נוקב בקוד ${code} בשורה: '${quote}'. הפריט מובא כאן כהקשר בלבד: מה הוא קובע לגבי הקוד (הוחלף, הוסר, השתנה או רק מוזכר) טרם נקרא במחקר.`,
      verificationLevel: "sap_official_verified",
    });
  }
  const namedNote = named.length
    ? `הקוד נזכר ב-${named.length} פריטים של רשימות הפישוט הרשמיות (${named.map((n) => `${LISTS[n.key].release} ${n.item}`).join(", ")}); מה שהפריטים קובעים לגבי הקוד טרם נקרא במחקר, ולכן לא נכתבה הכרעת מעמד. רשומה מחקרית תחליף רשומה זו כששרשרת המחקר תגיע לקוד (audit/master-completion/tx-chain-args*.json).`
    : `אף פריט ברשימות הפישוט הרשמיות (${simplLists}) אינו נוקב בקוד (סריקה מלאה של הטקסט, scripts/qa/simpl-tcode-index.mjs); זה ממצא שלילי מתועד ולא הכרעה.`;

  const notes = [
    `רשומה שנוצרה באופן דטרמיניסטי (scripts/qa/gen-tx-evidence.mts, ${DATE}) ללא מודל שפה: כל טענה מועתקת מרשומת המאגר, מרשומות החיפוש של help.sap.com או מספריית האפליקציות של Fiori, ולא נכתבה הכרעת מעמד.`,
    `חיפושים: '${code}' בסקופ SAP_S4HANA_ON-PREMISE (${s4.total} רשומות, ${s4hits.length} מצוטטות), '${code}' בסקופ SAP_ERP (${erp.total} רשומות, ${erphits.length} מצוטטות); ספריית Fiori במהדורה S32OP: ${g ? "הטרנזקציה רשומה בה כאפליקציה" : "הטרנזקציה אינה רשומה בה כאפליקציה במהדורה זו"}, ${lead.apps.filter((a: any) => a.fioriId !== code).length} אפליקציות עם קוד מוביל ${code}.`,
    namedNote,
    `מעמד S/4HANA לא נקבע ממקור רשמי: הפעולה שסוגרת היא SE93 במערכת היעד (קיום הקוד, התוכנית והמסך), או מקור רשמי הנוקב במעמד. לא בוצעה בדיקה במערכת SAP חיה.`,
  ].join(" ");
  // Every row of a generated record is context: it shows where the code appears and never
  // decides the record's level or depth (lib/evidence/types.ts, Evidence.context).
  for (const e of evidence) e.context = true;
  const official = evidence.filter((e) => e.verificationLevel === "sap_official_verified").length;
  return { code, record: { id: `tx:${code}`, evidence, lastVerifiedAt: "DATE", notes }, official, s4hits: s4hits.length, erphits: erphits.length, gui: !!g, leading: leading.length, named: named.length };
}

/* ------------------------------------------------------------------ driver */
const results: any[] = [];
const queue = [...codes];
async function worker() {
  while (queue.length) {
    const c = queue.shift()!;
    try { const r = await build(c); if (r) results.push(r); } catch (e) { console.error(`${c}: ${(e as Error).message}`); }
    if (results.length % 50 === 0) process.stdout.write(`  ${results.length}/${codes.length}\n`);
  }
}
await Promise.all(Array.from({ length: 4 }, worker));
results.sort((a, b) => a.code.localeCompare(b.code));

if (pilot) {
  for (const r of results) console.log(`${r.code}: official ${r.official} (s4 ${r.s4hits}, erp ${r.erphits}, gui ${r.gui ? "yes" : "no"}, leading ${r.leading})`);
  console.log(JSON.stringify(results[0]?.record, null, 1).slice(0, 3000));
  process.exit(0);
}

/* ------------------------------------------------------------- serialise */
const lit = (v: unknown, ind: string): string => {
  if (v === "DATE") return "DATE";
  if (typeof v === "boolean") return String(v);
  if (typeof v === "string") return JSON.stringify(v);
  if (Array.isArray(v)) return `[\n${v.map((x) => `${ind}  ${lit(x, ind + "  ")},`).join("\n")}\n${ind}]`;
  if (v && typeof v === "object") return `{\n${Object.entries(v).map(([k, x]) => `${ind}  ${k}: ${lit(x, ind + "  ")},`).join("\n")}\n${ind}}`;
  return String(v);
};
const header = `/* Project NEO · S/4HANA verification overlay · transactions, generated shard.
   ----------------------------------------------------------------------------
   GENERATED by scripts/qa/gen-tx-evidence.mts on ${DATE}. Do not hand-edit: regenerate.
   One record per transaction code no research chain has written yet: the codes no item of
   either official Simplification List names, and the named codes the chains have not reached
   (for those, the item line that prints the code is quoted as context).
   No language model wrote these records: every claim is a fixed Hebrew frame around values
   copied verbatim from the repository registry, help.sap.com search records that print the
   code, and the SAP Fiori Apps Reference Library (release S32OP = S/4HANA 2025 FPS01).
   No S/4HANA status is authored here; each record's notes name the action that decides it.
   A research chain that writes a code supersedes it (the generator skips authored codes). */
import type { VerificationRecord } from "@/lib/evidence/types";

const DATE = "${DATE}";
/** Types each record at its own boundary: one 1,400-element literal array makes TypeScript
 *  infer a union too large to represent (TS2590). */
const R = (r: VerificationRecord): VerificationRecord => r;

export const TX_VERIFICATION_AUTO: VerificationRecord[] = [
${results.map((r) => `  R(${lit(r.record, "  ")}),`).join("\n")}
];
`;
writeFileSync(OUT, header);
writeFileSync(INDEX_OUT, JSON.stringify({
  generatedAt: DATE, codes: results.length,
  withOfficial: results.filter((r) => r.official > 0).length,
  withGuiEntry: results.filter((r) => r.gui).length,
  withLeadingApps: results.filter((r) => r.leading > 0).length,
  withHelpHit: results.filter((r) => r.s4hits + r.erphits > 0).length,
  namedBySimplificationList: results.filter((r) => r.named > 0).length,
  skippedIdSyntax: skippedSyntax,
  rows: results.map((r) => ({ code: r.code, official: r.official, s4: r.s4hits, erp: r.erphits, gui: r.gui, leading: r.leading })),
}, null, 1));
console.log(`${results.length} records -> ${OUT}; with an official row ${results.filter((r) => r.official > 0).length}; GUI entry in S32OP ${results.filter((r) => r.gui).length}; leading apps ${results.filter((r) => r.leading > 0).length}; help hits ${results.filter((r) => r.s4hits + r.erphits > 0).length}; raw -> ${RAW}`);
