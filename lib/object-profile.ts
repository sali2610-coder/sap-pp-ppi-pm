// Object Intelligence engine — assembles a 12-dimension, consultant-grade
// profile for ANY SAP entity (table / T-Code / BAPI / FM / IDoc / CDS / auth
// object). Strategy: KIND-level TRUE templates (data/kind-intel) + curated
// per-entity specifics (dataset, fnIntel, cds-map, authorizations) +
// graph-derived dependencies/related. Each dimension is flagged verified
// (curated/derived from real data) vs general (true kind-level knowledge).

import { tableByName, kgraph } from "@/lib/knowledge-graph";
import { tcodeIntel, funcIntel, classifyFunc, cleanFunc, funcHref, listTcodes, listFuncs } from "@/lib/object-intel";
import { fnIntel } from "@/data/function-intel";
import { cdsByView } from "@/data/cds-map";
import { authBySlug } from "@/data/authorizations";
import { KIND_INTEL, type ProfileKind } from "@/data/kind-intel";

export interface ProfDim { text: string; verified: boolean }
export interface RelatedLink { name: string; href?: string; he?: string }
export interface ObjProfile {
  name: string;
  kind: ProfileKind;
  kindHe: string;
  module?: string;
  what: ProfDim;
  why: ProfDim;
  who: string;
  when: string;
  lifecycle: string;
  dependencies: string[];
  related: RelatedLink[];
  troubleshooting: string[];
  interview: string[];
  eccS4: ProfDim;
  pmExample: ProfDim;
  ppExample: ProfDim;
  href: string;
}

const GAP = "מידע ספציפי חסר במאגר — נדרש אימות מול SAP (SE11 / SE37 / BAPI Explorer / SU21).";

const slash = (h: string) => (h.endsWith("/") ? h : h + "/");
// Only entities that actually have a generated static page get a link;
// others render as informative (non-link) chips — no broken hrefs.
let _tc: Set<string> | null = null; const tcSet = () => (_tc ??= new Set(listTcodes()));
let _fn: Set<string> | null = null; const fnSet = () => (_fn ??= new Set(listFuncs()));
function tcodeLink(c: string): RelatedLink { const u = c.toUpperCase(); return { name: u, href: tcSet().has(u) ? `/tcode/${encodeURIComponent(u)}/` : undefined }; }
function tableLink(n: string, he?: string): RelatedLink { return { name: n, href: tableByName(n) ? `/object/${encodeURIComponent(n)}/` : undefined, he }; }
function funcLink(n: string): RelatedLink { const c = cleanFunc(n); return { name: c, href: fnSet().has(c) ? slash(funcHref(c)) : undefined }; }
function cdsLink(n: string): RelatedLink { return { name: n, href: cdsByView(n) ? `/cds/${encodeURIComponent(n)}/` : undefined }; }

function dedupeRelated(arr: RelatedLink[]): RelatedLink[] {
  const seen = new Set<string>(); const out: RelatedLink[] = [];
  for (const r of arr) { if (!r.name || seen.has(r.name)) continue; seen.add(r.name); out.push(r); }
  return out.slice(0, 18);
}

export function detectKind(name: string): ProfileKind | null {
  if (tableByName(name)) return "table";
  if (tcodeIntel(name)) return "tcode";
  if (cdsByView(name)) return "cds";
  const c = cleanFunc(name);
  if (funcIntel(c) || fnIntel(c)) { const k = classifyFunc(c); return k === "BAPI" ? "bapi" : k === "IDoc" ? "idoc" : "fm"; }
  return null;
}

export function buildProfile(rawName: string, kindHint?: ProfileKind): ObjProfile | null {
  const name = (rawName || "").trim();
  if (!name) return null;
  const kind = kindHint || detectKind(name);
  if (!kind) return null;
  const tpl = KIND_INTEL[kind];

  // base from kind template (general-but-true)
  const p: ObjProfile = {
    name, kind, kindHe: tpl.kindHe,
    what: { text: tpl.what, verified: false },
    why: { text: tpl.why, verified: false },
    who: tpl.who, when: tpl.when, lifecycle: tpl.lifecycle,
    dependencies: [], related: [],
    troubleshooting: [...tpl.troubleshooting], interview: [...tpl.interview],
    eccS4: { text: tpl.eccS4, verified: false },
    pmExample: { text: "", verified: false }, ppExample: { text: "", verified: false },
    href: "#",
  };

  const pmFrame = (extra: string, v: boolean) => { p.pmExample = { text: `${tpl.pmFrame}${extra ? " — " + extra : ""}.`, verified: v }; };
  const ppFrame = (extra: string, v: boolean) => { p.ppExample = { text: `${tpl.ppFrame}${extra ? " — " + extra : ""}.`, verified: v }; };

  if (kind === "auth") {
    const a = authBySlug(name);
    p.href = `/security/${encodeURIComponent(name)}/`;
    if (a) {
      p.what = { text: `${a.he} (${a.title}) — ${a.purpose}`, verified: true };
      p.why = { text: a.detail, verified: true };
      p.troubleshooting = [...a.failures.map((f) => `${f}`), ...a.troubleshoot];
      p.eccS4 = { text: `ECC: ${a.ecc} · S/4: ${a.s4}`, verified: true };
      p.pmExample = { text: a.pmExample, verified: true };
      p.ppExample = { text: a.ppExample, verified: true };
      p.related = dedupeRelated([tcodeLink("SU53"), tcodeLink("PFCG"), tcodeLink("SUIM")]);
    }
    return p;
  }

  if (kind === "table") {
    const t = tableByName(name)!;
    p.module = t.module;
    p.href = `/object/${encodeURIComponent(name)}/`;
    if (t.guideHe || t.descriptionHe) p.what = { text: t.guideHe || t.descriptionHe, verified: true };
    p.why = { text: `שומרת את נתוני "${t.descriptionHe || t.descriptionEn}" בתחום ${t.topicTitle} (${t.module}).`, verified: true };
    const g = kgraph(name);
    if (g) {
      p.dependencies = g.upstream.map((n) => `${n}${tableByName(n)?.descriptionHe ? " — " + tableByName(n)!.descriptionHe : ""}`);
      p.related = dedupeRelated([
        ...g.downstream.map((n) => tableLink(n, tableByName(n)?.descriptionHe)),
        ...g.upstream.map((n) => tableLink(n, tableByName(n)?.descriptionHe)),
      ]);
    }
    // tcodes + funcs from the table record
    const tcs = (t.tcodes || "").split(/[,;/]/).map((s) => s.trim()).filter(Boolean).slice(0, 8);
    p.related = dedupeRelated([...p.related, ...tcs.map(tcodeLink), ...(t.funcs || []).slice(0, 8).map((f) => funcLink(f[0]))]);
    if (t.s4Note || t.s4AltTable) {
      p.eccS4 = { text: [t.s4Note, t.s4AltTable ? `טבלה/CDS חלופית: ${t.s4AltTable}` : "", t.s4AltTcode ? `טרנזקציה חלופית: ${t.s4AltTcode}` : "", t.fioriApp ? `Fiori: ${t.fioriApp}` : ""].filter(Boolean).join(" · "), verified: true };
    }
    const exFrame = tcs.length ? `דרך ${tcs.slice(0, 3).join(", ")}` : "";
    if (t.module === "PM") { pmFrame(exFrame, true); ppFrame("פחות רלוונטי — טבלת PM (אחזקה)", false); }
    else { ppFrame(exFrame, true); pmFrame("פחות רלוונטי — טבלת PP-PI (ייצור)", false); }
    return p;
  }

  if (kind === "tcode") {
    const ti = tcodeIntel(name)!;
    p.module = ti.modules.join(" · ");
    p.href = `/tcode/${encodeURIComponent(ti.code)}/`;
    p.what = { text: `${tpl.what} מקושרת ל-${ti.tables.length} טבלאות במאגר (${ti.modules.join(", ")}).`, verified: true };
    p.dependencies = ti.tables.slice(0, 8).map((t) => `${t.name}${t.he ? " — " + t.he : ""}`);
    p.related = dedupeRelated(ti.tables.map((t) => tableLink(t.name, t.he)));
    const hasPM = ti.modules.includes("PM"); const hasPP = ti.modules.includes("PP-PI");
    pmFrame(hasPM ? `מריצים ב-${ti.code} בתהליך אחזקה` : "פחות רלוונטי למודול זה", hasPM);
    ppFrame(hasPP ? `מריצים ב-${ti.code} בתהליך ייצור` : "פחות רלוונטי למודול זה", hasPP);
    return p;
  }

  if (kind === "cds") {
    const v = cdsByView(name)!;
    p.module = v.module;
    p.href = `/cds/${encodeURIComponent(name)}/`;
    p.what = { text: `${v.he} — תצוגת CDS רשמית הממפה את הטבלאות הקלאסיות ${v.tables.join(", ")}.`, verified: true };
    p.dependencies = v.tables.map((n) => `${n}${tableByName(n)?.descriptionHe ? " — " + tableByName(n)!.descriptionHe : ""}`);
    p.related = dedupeRelated(v.tables.map((n) => tableLink(n, tableByName(n)?.descriptionHe)));
    p.eccS4 = { text: `${tpl.eccS4} ממפה ב-S/4 את ${v.tables.join(", ")} שהיו בגישה ישירה ב-ECC.`, verified: true };
    if (v.module === "PM") { pmFrame(`חושף את ${v.tables.join(", ")} ל-Fiori`, true); ppFrame("פחות רלוונטי — CDS של PM", false); }
    else { ppFrame(`חושף את ${v.tables.join(", ")} ל-Fiori`, true); pmFrame("פחות רלוונטי — CDS של PP-PI", false); }
    return p;
  }

  // bapi / fm / idoc
  const c = cleanFunc(name);
  p.href = slash(funcHref(c));
  const fi = fnIntel(c);          // rich curated
  const di = funcIntel(c);        // dataset-derived owners
  if (di) p.module = di.modules.join(" · ");
  if (fi) {
    p.module = fi.module;
    p.what = { text: fi.what, verified: true };
    p.why = { text: fi.why, verified: true };
    if (fi.flow) p.lifecycle = `${fi.flow} · ${tpl.lifecycle}`;
    p.eccS4 = { text: `ECC: ${fi.ecc} · S/4: ${fi.s4}`, verified: true };
    if (fi.qa?.deps?.length) p.dependencies = fi.qa.deps;
    if (fi.qa?.failures?.length) p.troubleshooting = [...fi.qa.failures, ...tpl.troubleshooting].slice(0, 7);
    p.related = dedupeRelated([
      ...(fi.related.tcodes || []).map(tcodeLink),
      ...(fi.related.tables || []).map((n) => tableLink(n, tableByName(n)?.descriptionHe)),
      ...(fi.related.cds || []).map(cdsLink),
      ...(fi.related.idocs || []).map(funcLink),
    ]);
    const isPM = fi.module === "PM";
    if (fi.qa?.scenario) {
      if (isPM) { pmFrame(fi.qa.scenario, true); ppFrame("פחות רלוונטי — אובייקט PM", false); }
      else { ppFrame(fi.qa.scenario, true); pmFrame("פחות רלוונטי — אובייקט PP-PI", false); }
    } else { pmFrame("", isPM); ppFrame("", !isPM); }
    return p;
  }
  // dataset-known but uncurated → derive related from owner tables, mark what as gap
  if (di) {
    p.what = { text: `${tpl.what} (${di.he || "ללא תיאור מפורט במאגר"})`, verified: false };
    p.related = dedupeRelated(di.tables.map((t) => tableLink(t.name, t.he)));
    const hasPM = di.modules.includes("PM");
    pmFrame(hasPM ? "" : "פחות רלוונטי למודול זה", false);
    ppFrame(!hasPM ? "" : "פחות רלוונטי למודול זה", false);
    p.eccS4 = { text: GAP, verified: false };
    return p;
  }
  // totally unknown function shape
  p.what = { text: GAP, verified: false };
  pmFrame("", false); ppFrame("", false);
  return p;
}
