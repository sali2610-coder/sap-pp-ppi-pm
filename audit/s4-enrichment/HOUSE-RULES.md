# House rules for verification records (the one file a pipeline agent reads first)

Everything a researcher, auditor or writer needs before touching `data/verification/*.ts`
or `data/best-practices/*.ts`. Read this instead of `lib/evidence/types.ts`,
`lib/evidence/validate.ts` and `audit/s4-enrichment/MANIFEST.md`; open those only when a
rule here is unclear. Repo: `/Users/salihalif/Desktop/My-Projects/sap-kb3`, branch
`design/neo-correction-pass`.

## 1. Record shapes (TypeScript, type-only imports)

```ts
interface Evidence {
  sourceType: "sap_help" | "sap_api_hub" | "fiori_library" | "sap_note" | "kba"
            | "simplification_item" | "sap_press_book" | "repository" | "sap_community";
  sourceTitle: string;          // the page or record title, verbatim
  url?: string;                 // official URL copied verbatim from a search record / fal-app output
  sapNote?: string; kba?: string; // only when the cited source prints the number
  product: string;              // "SAP S/4HANA", "SAP ERP", "SAP ECC / SAP S/4HANA", ...
  edition: "on-premise" | "private-cloud" | "public-cloud" | "ecc";
  release?: string;             // the search record's versionId (2025.001, 2023.003, 6.18.latest, 202510.001)
  accessedAt: string;           // a DATE constant of the file (YYYY-MM-DD)
  claim: string;                // Hebrew, bounded by the title/snippet/body you actually read
  verificationLevel: "sap_official_verified" | "repository_verified" | "supported_secondary_source"
                   | "verification_required" | "conflicting_sources" | "legacy_context_only";
  repoRef?: string;             // REQUIRED when sourceType === "repository": "data/function-intel.ts#NAME"
  conflictingEvidence?: Evidence[];
}
interface S4StatusClaim {
  status: "s4_native" | "unchanged" | "changed" | "simplified" | "replaced" | "restricted"
        | "deprecated" | "not_available" | "compatibility_scope" | "fiori_alternative_available"
        | "released_api_available" | "legacy_ecc_only" | "verification_required" | "not_applicable";
  he: string;                   // Hebrew, one or two sentences, what the status means here
  edition: Edition; release: string | null;   // release REQUIRED for any status except verification_required
  source: Evidence | null;      // one of this record's official evidence rows (null only with verification_required)
  recommendedAction: string;    // Hebrew
  successor?: CanonicalId;      // REQUIRED for replaced / deprecated / not_available, must exist in the universe
}
interface VerificationRecord {
  id: CanonicalId; aliases?: string[]; status?: S4StatusClaim; evidence: Evidence[];
  xrefs?: CanonicalId[]; reviewer?: string; lastVerifiedAt?: string; notes?: string;
}
```

Canonical ids: `table:AUFK`, `tx:IW31`, `fm:BAPI_ALM_ORDER_MAINTAIN`, `idoc:msg:MATMAS`,
`idoc:basic:MATMAS05`, `cds:I_MaintenanceOrder`, `fiori:F5241` (shape `^[FW]\d{4}[A-Z]?$`),
`enh:exit:IWO10009`, `enh:badi:WORKORDER_UPDATE`, `enh:technique:enhancement-spot`, `obj:slug`,
`bp:slug`. An xref must resolve: transactions/tables/functions/cds in
`lib/route-manifest.generated.ts`, Fiori ids in `data/fiori/apps.ts`, exits in `data/exits.ts`,
techniques in `data/enhancements.ts`, objects in `OBJECT_REGISTRY` (`data/verification/objects.ts`),
IDoc basic types in `IDOC_BASIC_TYPES`, best practices by slug in `data/best-practices/*.ts`.
`table:MATDOC` and `table:ACDOCA` are NOT in the universe: name them in prose only.

## 2. The validation rules (test/evidence-schema.test.ts fails the build on any hit)

`url-domain` (official levels need a host in the allowlist: help.sap.com, api.sap.com,
fioriappslibrary.hana.ondemand.com, fal.cloud.sap, me.sap.com for notes/KBAs) ·
`no-source` (repository evidence needs `repoRef`; official level needs `url`) ·
`status-no-edition-release` (a status other than verification_required needs edition + release
+ source) · `replacement-no-successor` (replaced/deprecated/not_available need a resolvable
successor) · `dangling-xref` · `bad-id-syntax` · `duplicate-id` · `alias-collision` (an alias may
not equal another record's id) · `sap-note-format` (a note number only where the cited source
prints it) · `certainty-language` (no תמיד / לעולם לא / בוודאות / ללא ספק / מובטח / נתמך במלואו /
באופן רשמי, no always / never / guaranteed / definitely / certainly / fully supported / officially)
· `placeholder` (no TODO / TBD / ??? / בקרוב / placeholder / empty text) · `fiori-no-id-or-url` ·
`fm-released-no-official` (released_api_available needs an official source) ·
`cds-no-release-context`.

Depth (what the page shows): L1 Hebrew only · L2 structure (tables 5 typed fields, transactions 3
authored facts, functions 2, fiori role + catalog + odata + guiTx, objects 2 members, best
practices 3 steps) · L3 authored status with a release · L4 evidence at supported_secondary or
better, every xref resolves, no conflict · L5 an official URL, a release, verified within 365 days,
successor where needed.

## 3. Honesty rules (the reason auditors refuse drafts)

1. Every SAP name (table, field, T-code, BAPI/FM, Fiori id, CDS view, BAdI/exit, IDoc, business
   object, SAP Note or KBA number, scope item) is either printed by a cited official record or
   present in a repository record cited with `repoRef`. Nothing from memory.
2. A claim is bounded by what you read: a search record's title and snippet, a page body you
   fetched through the content service, a PDF you read. Never "only", never "does not exist",
   never body text from a page that rendered as a JavaScript shell.
3. A name no official record prints stays `verification_required` with the searches listed
   (query, scope, hit count). Absence from a search is a documented negative, never a verdict.
4. Official sources disagree: keep both rows, mark `conflicting_sources`, say what would settle it.
5. ECC statements and S/4HANA statements are attributed to their side; simplification items are
   cited by NAME (e.g. 'S4TWL - Scheduling of Maintenance Plan'), never by a bare number.
6. Edition is on-premise unless the source says otherwise; Public Cloud sources are marked as such.
7. Hebrew: consultant-grade, concise, RTL; SAP codes Latin and UPPERCASE inside Hebrew; "תחזוקה"
   (not "אחזקה"); ZERO em dashes ("—"): use a comma, colon or semicolon; no marketing words.
8. History is kept: a re-pointed record keeps its old finding in notes ("Old → New").

## 4. Official channels (all scripted, no login)

- `node scripts/sap-help-search.mjs "<query>" --size 12 --json` → help.sap.com search records
  `{title, deliverable, product, release, versionId, loio, url, date, snippet}`; add
  `--product SAP_ERP` for the ECC scope, `--product SAP_S4HANA_CLOUD` for Public Cloud. Copy
  `url`, `loio`, `versionId` verbatim; `release` = `versionId`.
- Page body of a search hit: `node scripts/sap-help-body.mjs "<the record's url>"` (two portal
  services: `deliverableMetadata` gives the numeric deliverable id, `pagecontent` returns the
  topic HTML; the script prints plain text, `--out dir/` saves it). Only after the body was read
  may a claim quote it, and the auditor re-fetches it.
- `node scripts/fal-app.mjs <APPID> [--release S32OP|S27OP] [--out dir]` → Fiori Apps Library:
  name, type/UI technology, roles (SAP_BR_*, R-id), business and technical catalogs, semantic
  object/action, OData services or V4 service groups, backend/UI software components, releases,
  predecessor/successor apps, RIN note numbers, the app documentation link; `--tcode IW31` lists
  the apps that lead with a transaction code. Cite the printed deep link
  `https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F5241')/S32OP`
  with `sourceType: "fiori_library"`. S32OP = S/4HANA 2025 FPS01 (latest on-premise), S31OP =
  2025, S30OP = 2023 FPS03, S27OP = 2023, S24OP = 2022. Empty result = not in that release.
- Simplification Lists (text already extracted): `scratchpad/official/` (2025 FPS01 doc 1.36,
  2023 FPS03 doc 1.35); which items name a code: `audit/master-completion/simpl-tcode-index.json`.
- WebSearch only on help.sap.com, api.sap.com, fioriappslibrary.hana.ondemand.com; api.sap.com
  and fal.cloud.sap render as JavaScript shells (no body claims).
- Repository records: `data/function-intel.ts`, `data/bapi-enrichment.*.ts`, `lib/tx-registry`
  and `components/neo-shell/data/tx-detail.ts`, `data/domains.ts`, `data/fiori/apps.ts`,
  `data/cds-map.ts`, `data/exits.ts`, `data/enhancements.ts`, `data/troubleshooting*.ts`,
  `data/consultant-notes.ts`, `data/sapData.*.ts`, the books `data/books/bookN.json` (read-only;
  cite `data/books/bookN.json#<section id>` as `sap_press_book` / `supported_secondary_source`).

## 5. Exemplar (shape only, values from real sources)

```ts
{
  id: "tx:IP30H",
  evidence: [
    { sourceType: "simplification_item", sourceTitle: "S4TWL - Scheduling of Maintenance Plan (SAP S/4HANA 2025 FPS01 Simplification List, item 4.1.2)",
      url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/...", product: "SAP S/4HANA", edition: "on-premise",
      release: "2025.001", accessedAt: DATE24, verificationLevel: "sap_official_verified",
      claim: "הפריט קובע ש-IP30H הוא הדוח המחליף לתזמון תכניות תחזוקה; הציטוט: '...'" },
    { sourceType: "repository", sourceTitle: "רשומת המאגר: tx-detail.ts#IP30H", product: "SAP ECC / SAP S/4HANA",
      edition: "on-premise", accessedAt: DATE24, verificationLevel: "repository_verified",
      repoRef: "components/neo-shell/data/tx-detail.ts#IP30H", claim: "..." },
  ],
  status: { status: "s4_native", he: "...", edition: "on-premise", release: "2025.001", source: /* evidence[0] */,
            recommendedAction: "..." },
  xrefs: ["tx:IP30", "table:MPLA", "fiori:F2774"],
  lastVerifiedAt: DATE24,
  notes: "מה נבדק, אילו חיפושים רצו, מה נותר לאימות במערכת חיה. לא בוצעה בדיקה במערכת SAP חיה.",
}
```

Writers: one file per pipeline (`data/verification/<family>.ts` or the shard named in the args);
DATE constants live at the top of each file; append records before the final `];`; run
`./node_modules/.bin/tsc --noEmit`, `./node_modules/.bin/tsc --noEmit -p tsconfig.test.json`,
`npm test`, `npm run report:coverage -- --catalog <family>`; never commit; never weaken a rule or
a test; if a gate fails inside a file you do not own, wait 60 s and re-run (up to 3 times).
