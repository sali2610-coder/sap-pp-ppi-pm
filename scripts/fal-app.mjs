#!/usr/bin/env node
// SAP Fiori Apps Reference Library, public read-only OData (no auth, no cookie):
// one app on one release, assembled from the Details entity, its sub-collections
// and the flat FuzzySearch row (the only place the GUI transaction codes live).
//
//   node scripts/fal-app.mjs F5241                 # latest on-premise release (S32OP)
//   node scripts/fal-app.mjs F5241 --release S27OP # S/4HANA 2023
//   node scripts/fal-app.mjs F5241 --json          # full JSON to stdout
//   node scripts/fal-app.mjs F5241 --out dir/      # writes dir/F5241-S32OP.json
//   node scripts/fal-app.mjs --tcode IW31          # apps whose leading/related tcodes name IW31
//
// Release ids (from the service's Releases set): S27OP 2023, S28OP 2023 FPS01,
// S29OP 2023 FPS02, S30OP 2023 FPS03, S31OP 2025, S32OP 2025 FPS01; S24OP 2022,
// S21OP 2021, S18OP 2020, S15OP 1909; *PCE = Private Cloud twins.
// Provenance for a record: cite the deep link and copy the field values verbatim.
// An empty Results array means "the app is not in that release", never "does not exist".
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const B = "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/services/SingleApp.xsodata";
const VIEWER = "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html";
const NAVS = ["SplitBusinessRole", "SplitBusinessCatalog", "SplitBusinessGroup", "SplitTechnicalCatalogs", "SplitAdditionalIntents",
  "RequiredODataServices", "ODataServices", "RequiredODataServiceGroups", "ProductVersions", "All_Rel", "PredecessorDetails",
  "Successors", "Notes", "ICFNodes", "WebDynproICFNodes", "Related_Apps", "ScopeItems"];
const DETAIL_FIELDS = ["fioriId", "releaseId", "ReleaseName", "releaseGroupId", "releaseGroupText", "AppName", "EnglishTitle", "Description",
  "ApplicationType", "UITechnology", "FormFactors", "Database", "ApplicationComponent", "ApplicationComponentText", "RoleName",
  "BusinessRoleOAMName", "TechnicalCatalogName", "TechnicalCatalogDescription", "BSPName", "SAPUI5ComponentId", "WDAAppAndConfigName",
  "ProductVersionOfficialNameBackend", "RetrofittedSWCBackend", "PrimaryPVOfficialName", "RetrofittedSWCUI", "SPStackBE",
  "CrossProductStackStatus", "isPublished", "AppDocumentationLink", "ExtensibilityDocumentationLink", "ConfigurationDocumentationLink",
  "NumberofPredecessors", "NumberofSuccessors", "NumberofOdataServices", "NumberofOdataServiceGroups"];
const FUZZY_FIELDS = ["fioriId", "releaseId", "AppName", "AppType", "UITechnology", "LeadingTransactionCodes", "TransactionCodes",
  "FitAnalysisTransactionCodes", "SemanticObject", "SemanticAction", "PrimaryODataServiceName", "PrimaryODataServiceVersion",
  "AdditionalODataServices", "ODataV4GroupServiceName", "BusinessRoleName", "RoleID", "BusinessCatalogName", "BusinessCatalogDescription",
  "TechnicalCatalogName", "BackendSoftwareComponentVersions", "FrontendSoftwareComponent", "isPublished", "InnovationStatus", "DeliveryModel"];

const args = process.argv.slice(2);
const flag = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
const has = (n) => args.includes(n);
const release = flag("--release") || "S32OP";
const outDir = flag("--out");
const asJson = has("--json");
const tcode = flag("--tcode");
const appId = args.find((a) => !a.startsWith("--") && a !== release && a !== outDir && a !== tcode);

async function get(url) {
  const r = await fetch(url, { headers: { Accept: "application/json" } });
  const text = await r.text();
  if (!r.ok) throw new Error(`${r.status} ${url}\n${text.slice(0, 300)}`);
  return JSON.parse(text).d;
}
const q = (s) => encodeURIComponent(s);
const strip = (o, keys) => Object.fromEntries(keys.filter((k) => o && o[k] !== undefined && o[k] !== null && o[k] !== "").map((k) => [k, o[k]]));
const rows = (d) => (d && d.results ? d.results : Array.isArray(d) ? d : d ? [d] : []).map((r) => { const { __metadata, ...rest } = r; return rest; });

async function fetchApp(id, rel) {
  const key = `inpfioriId='${q(id)}',inpreleaseId='${rel}',inpLanguage='EN',fioriId='${q(id)}',releaseId='${rel}'`;
  const details = rows(await get(`${B}/DetailsParameters(inpfioriId='${q(id)}',inpreleaseId='${rel}',inpLanguage='EN')/Results?$format=json`));
  const out = { app: id, release: rel, fetchedAt: new Date().toISOString().slice(0, 10), source: `${B}/Details(${key})`,
    deepLink: `${VIEWER}#/detail/Apps('${id}')/${rel}`, found: details.length > 0, details: details[0] ? strip(details[0], DETAIL_FIELDS) : null };
  if (!out.found) return out;
  for (const nav of NAVS) {
    try { out[nav] = rows(await get(`${B}/Details(${key})/${nav}?$format=json`)); } catch (e) { out[nav] = { error: String(e.message).split("\n")[0] }; }
  }
  const fz = rows(await get(`${B}/FuzzySearch?$filter=fioriId eq '${q(id)}' and releaseId eq '${rel}'&$select=${FUZZY_FIELDS.join(",")}&$format=json`));
  out.fuzzy = fz[0] ? strip(fz[0], FUZZY_FIELDS) : null;
  return out;
}

async function byTcode(code, rel) {
  const sel = "fioriId,AppName,UITechnology,AppType,LeadingTransactionCodes,TransactionCodes,SemanticObject,SemanticAction,isPublished";
  const lead = rows(await get(`${B}/FuzzySearch?$filter=releaseId eq '${rel}' and LeadingTransactionCodes eq '${q(code)}'&$select=${sel}&$format=json`));
  const guiApp = rows(await get(`${B}/DetailsParameters(inpfioriId='${q(code)}',inpreleaseId='${rel}',inpLanguage='EN')/Results?$select=fioriId,AppName,UITechnology,ApplicationType,isPublished,NumberofSuccessors&$format=json`));
  return { tcode: code, release: rel, fetchedAt: new Date().toISOString().slice(0, 10), leadingApps: lead, guiAppEntry: guiApp[0] || null,
    note: "TransactionCodes (the related list) is only searchable per app: run fal-app.mjs <APPID> and read fuzzy.TransactionCodes." };
}

const summary = (o) => {
  if (!o.found) return `${o.app} @ ${o.release}: not in this release (empty Results) - ${o.deepLink}`;
  const d = o.details, f = o.fuzzy || {};
  const roles = (o.SplitBusinessRole || []).map((r) => `${r.BusinessRoleName} (${r.RoleID}, ${r.RoleName})`).join("; ");
  const cats = (o.SplitBusinessCatalog || []).map((c) => `${c.BusinessCatalogName} "${c.BusinessCatalog}"`).join("; ");
  const od = [...(o.RequiredODataServices || []).map((s) => `${s.TechnicalName} ${s.Version || ""} (${s.SoftwareComponentName || ""})`),
    ...(o.RequiredODataServiceGroups || []).map((g) => `V4 group ${g.serviceGroupName} (${g.SoftwareComponentVersion || ""})`)].join("; ");
  const rel = (o.All_Rel || []).map((r) => `${r.allReleases}=${r.ExternalReleaseName}`).join(", ");
  const pred = (o.PredecessorDetails || []).map((p) => `${p.predecessor} ${p.predecessorName}`).filter((v, i, a) => a.indexOf(v) === i).join("; ");
  const succ = (o.Successors || []).map((s) => `${s.successor} ${s.successorName}`).join("; ");
  const notes = (o.Notes || []).map((n) => `${n.NoteNumber} (${n.type}, ${n.ApplicableSystem})`).join("; ");
  return [
    `${o.app} @ ${o.release} (${d.ReleaseName}): ${d.AppName} | ${d.ApplicationType} / ${d.UITechnology} | ${d.isPublished} | component ${d.ApplicationComponent} (${d.ApplicationComponentText})`,
    `  roles: ${roles || "-"}`, `  business catalogs: ${cats || "-"}`, `  technical catalog: ${d.TechnicalCatalogName || "-"}`,
    `  intent: ${f.SemanticObject || "-"}-${f.SemanticAction || "-"}`, `  OData: ${od || "-"}`,
    `  GUI transactions: leading ${f.LeadingTransactionCodes || "-"}; related ${f.TransactionCodes || "-"}`,
    `  backend: ${d.RetrofittedSWCBackend || "-"} / ${d.ProductVersionOfficialNameBackend || "-"}; UI: ${d.RetrofittedSWCUI || "-"}`,
    `  releases: ${rel || "-"}`, `  predecessors: ${pred || "-"}; successors: ${succ || "-"}`, `  RIN notes: ${notes || "-"}`,
    `  docs: ${d.AppDocumentationLink || "-"}`, `  cite: ${o.deepLink}`,
  ].join("\n");
};

try {
  if (tcode) {
    const o = await byTcode(tcode, release);
    if (outDir) { mkdirSync(outDir, { recursive: true }); writeFileSync(path.join(outDir, `tcode-${tcode}-${release}.json`), JSON.stringify(o, null, 1)); }
    console.log(asJson ? JSON.stringify(o, null, 1) : `${tcode} @ ${release}: leading app(s): ${o.leadingApps.map((a) => `${a.fioriId} ${a.AppName} [${a.UITechnology}]`).join("; ") || "none"}; GUI app entry: ${o.guiAppEntry ? `${o.guiAppEntry.fioriId} ${o.guiAppEntry.AppName} (${o.guiAppEntry.UITechnology}, successors ${o.guiAppEntry.NumberofSuccessors})` : "none"}`);
  } else {
    if (!appId) { console.error("usage: fal-app.mjs <APPID> [--release S32OP] [--json] [--out dir] | --tcode IW31"); process.exit(2); }
    const o = await fetchApp(appId, release);
    if (outDir) { mkdirSync(outDir, { recursive: true }); writeFileSync(path.join(outDir, `${appId}-${release}.json`), JSON.stringify(o, null, 1)); }
    console.log(asJson ? JSON.stringify(o, null, 1) : summary(o));
  }
} catch (e) { console.error("fal-app:", e.message); process.exit(1); }
