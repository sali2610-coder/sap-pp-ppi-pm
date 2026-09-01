I have what I need. Below is the implementation plan.

# S/4HANA content-enrichment foundation: EVIDENCE + STATUS + DEPTH

## 0. Findings that shape the design (measured in the repo)

1. **Test loader constraint.** `npm test` = `node --experimental-strip-types --test test/*.test.ts` with no alias loader. Files importing `@/...` by value cannot load in tests; `import type` is erased and is fine. Verified loadable without a loader: `lib/route-manifest.generated.ts` (186 objects / tcodes / 147 bapiFm / 2 idocs / 39 cds), `data/fiori/apps.ts` (20), `data/exits.ts` (29), `data/enhancements.ts` (13), `data/cds-enrichment.ts` (39), `lib/s4-class.ts`. `tsconfig.json` has no `allowImportingTsExtensions`, so app code cannot use `.ts`-suffixed relative value imports either. Consequence: **all rule logic must be pure modules with zero value imports; tests feed them the overlay files (imported with explicit `.ts` paths) plus an id universe built from the alias-free files above.** App-side merging lives in one thin `resolve.ts` that uses `@/` and is exercised by `next build`, not by node:test.
2. **Every detail builder already has one S/4 slot** (`s4:`) and one `sources:` slot; `RefDetail` is shared by 5 directories (`/Users/salihalif/Desktop/My-Projects/sap-kb3/components/neo-shell/reference/types.ts:166`). One optional field on 4 view models covers 8 surfaces.
3. **Rail rule** (`nav-data.ts:101-124`): a seed with `href` owns its route and is excluded from `NEO_HUBS`, so `/neo/best-practices/` collides with nothing and is outside the 7 manifest families (`check-route-manifest.mjs:24-32`).
4. **Existing vocabularies to map (not overwrite):** `lib/s4-class` (0..3/null, blueprint), `lib/s4` (risk/trust), `data/s4-objects` (stays/changed/replaced/removed), `data/lifecycle` (Active/Deprecated/Obsolete + ecc/s4 booleans), `data/ecc-s4` (Unchanged/Changed/Replaced/Deprecated), `tx-detail.ts:91` (superseded/changed/available/unknown), `lib/bapi-registry` VerificationStatus, `lib/fiori/types` Trust, `data/cds-enrichment` verified, `data/verified-objects` VStatus, `EccS4` structured block (exits, transactions, domain-detail, process-guides), `data/migration-cockpit` Trust.
5. **A real conflicting-sources case already exists:** `data/fiori/apps.ts:12` records `F2731` as "Manage Maintenance Orders"; `audit/s4-enrichment/MANIFEST.md` names `F5241` for the same title from the official library. Do not resolve it in the foundation; it is the first `conflicting_sources` record for the Fiori catalog commit.
6. `scripts/check-bapi-consistency.mjs` is the precedent for "verified requires a source" and SAP Note format checks; the new tests generalise it, and it stays untouched.

## 1. Module map and import rules

```
lib/evidence/                     PURE. No value imports at all (type imports only).
  types.ts        evidence + status + canonical-id types, vocab constants
  canonical.ts    id parse/format/alias normalisation, syntax regexes
  s4-status.ts    unified vocabulary + mapping from every legacy vocabulary
  depth.ts        L0..L5 scoring from a DepthInput per catalog
  validate.ts     rule engine used by tests AND by report-coverage
  resolve.ts      APP-SIDE ONLY (uses @/): merges overlays into builders
data/verification/                overlays keyed by canonical id, type-only imports
  tables.ts transactions.ts functions.ts idocs.ts cds.ts fiori.ts enhancements.ts objects.ts
  index.ts        value-merges the 8 files (app side)
data/best-practices/
  index.ts        BestPractice type + registry merge
  pm.ts pp-pi.ts  records
components/neo-shell/evidence/evidence-block.tsx (+ app/neo/evidence.css)
components/neo-shell/best-practices/{bp-data.ts, bp-view.tsx}
app/neo/best-practices/{page.tsx, [slug]/page.tsx}
scripts/report-coverage.mjs
test/{evidence-schema,evidence-xref,s4-status}.test.ts
```

Rule enforced by a test (regex over file text): files under `lib/evidence/` except `resolve.ts`, `data/verification/*.ts` except `index.ts`, and `data/best-practices/*.ts` except `index.ts` contain no `from "@/` value import.

## 2. New files, with exported signatures

### `/Users/salihalif/Desktop/My-Projects/sap-kb3/lib/evidence/types.ts` (~110 lines)

```ts
export type SourceType = "sap_help" | "sap_api_hub" | "fiori_library" | "sap_note" | "kba"
  | "simplification_item" | "sap_press_book" | "repository" | "sap_community";
export type Edition = "on-premise" | "private-cloud" | "public-cloud" | "ecc";
export type VerificationLevel = "sap_official_verified" | "repository_verified"
  | "supported_secondary_source" | "verification_required" | "conflicting_sources" | "legacy_context_only";
export const VERIFICATION_LEVELS: readonly VerificationLevel[];
export const VERIFICATION_HE: Record<VerificationLevel, string>;   // he label
export const VERIFICATION_DOT: Record<VerificationLevel, string>;  // var(--status-*)

export interface Evidence {
  sourceType: SourceType;
  sourceTitle: string;
  url?: string;              // allowlisted domain, or absent
  sapNote?: string;          // 6-7 digits
  kba?: string;
  product: string;           // "SAP S/4HANA", "SAP ERP 6.0", ...
  edition: Edition;
  release?: string;          // "2025.001", "2023 FPS02", "ECC 6.0 EHP8"
  accessedAt: string;        // ISO date
  claim: string;             // he — the exact statement this source supports
  verificationLevel: VerificationLevel;
  reviewer?: string;
  lastVerifiedAt?: string;
  conflictingEvidence?: Evidence[];
  /** repository provenance when sourceType === "repository": "data/s4-impact.ts#MATDOC" */
  repoRef?: string;
}

export type S4Status = "s4_native" | "unchanged" | "changed" | "simplified" | "replaced"
  | "restricted" | "deprecated" | "not_available" | "compatibility_scope"
  | "fiori_alternative_available" | "released_api_available" | "legacy_ecc_only"
  | "verification_required" | "not_applicable";
export const S4_STATUSES: readonly S4Status[];
export const S4_STATUS_HE: Record<S4Status, string>;
export const S4_STATUS_DOT: Record<S4Status, string>;

export interface S4StatusClaim {
  status: S4Status;
  he: string;                       // explanation
  edition: Edition;
  release: string | null;           // null ONLY when derived (see s4-status.ts)
  source: Evidence | null;          // null ONLY when derived
  recommendedAction: string;        // he
  successor?: CanonicalId;          // required when status ∈ {replaced, deprecated, not_available} and verified
  derivedFrom?: DerivedSource;      // set by the mapper, never by an author
}
export type DerivedSource = "blueprint" | "s4-impact" | "s4-objects" | "lifecycle" | "ecc-s4"
  | "tx-intel" | "bapi-registry" | "fiori-apps" | "cds-enrichment" | "eccs4-block" | "verified-objects";

export type CanonicalKind = "table" | "tx" | "fm" | "idoc:msg" | "idoc:basic" | "cds" | "fiori"
  | "enh:badi" | "enh:exit" | "enh:technique" | "obj" | "bp";
export type CanonicalId = `${CanonicalKind}:${string}`;

export interface VerificationRecord {
  id: CanonicalId;
  aliases?: string[];               // raw variants that must resolve to this id
  status?: S4StatusClaim;           // authored claim; absent → mapper derives
  evidence: Evidence[];
  xrefs?: CanonicalId[];            // must resolve (test: no dangling)
  reviewer?: string;
  lastVerifiedAt?: string;
  notes?: string;                   // he, honest caveats
}
/** Registry entries that only exist in overlays (no page): idoc basic types, business objects. */
export interface RegistryEntry { id: CanonicalId; he: string; en?: string; members?: CanonicalId[] }

export interface EvidenceBlockData {          // plain, serialisable, rendered by the UI block
  id: CanonicalId;
  status: { key: S4Status; he: string; dot: string; edition: Edition; release: string | null;
            action: string; derived: boolean; successor: { id: CanonicalId; label: string; href: string | null } | null };
  level: { key: VerificationLevel; he: string; dot: string };
  sources: { title: string; url: string | null; kind: SourceType; release: string | null; accessedAt: string }[];
  lastVerifiedAt: string | null;
  reviewer: string | null;
  conflicts: number;
  needsVerification: boolean;                 // true → render "נדרש אימות נוסף" state
  depth: { level: 0 | 1 | 2 | 3 | 4 | 5; he: string };
}
```

### `/Users/salihalif/Desktop/My-Projects/sap-kb3/lib/evidence/canonical.ts` (~70 lines)

```ts
export const ID_SYNTAX: Record<CanonicalKind, RegExp>;  // table /^[A-Z0-9_\/]{2,30}$/ · tx /^[A-Z0-9_\/]{2,20}$/
// fm /^[A-Z0-9_\/]{3,30}$/ · idoc:msg /^[A-Z0-9_]{3,30}$/ · idoc:basic /^[A-Z0-9_]{3,28}\d{2}$/
// cds /^[A-Z][A-Za-z0-9_]{2,60}$/ · fiori /^[FW]\d{4}[A-Z]?$/ · enh:badi|enh:exit /^[A-Z0-9_\/]{3,40}$/
// enh:technique|obj|bp /^[a-z0-9]+(?:-[a-z0-9]+)*$/
export function parseId(id: string): { kind: CanonicalKind; name: string } | null;
export function makeId(kind: CanonicalKind, raw: string): CanonicalId;   // uppercases code kinds, slugifies slug kinds
export function normalizeAlias(kind: CanonicalKind, raw: string): string; // reuses cleanFunc rule for fm (split on " - ", "(", "/"), uppercase for codes
export function isValidId(id: string): boolean;
```
`normalizeAlias` for `fm` re-implements the two-line `cleanFunc` regex from `lib/object-intel.ts:14` verbatim (cannot import it: that module pulls `@/data/sapData`); the s4-status test asserts equality on the registry's own `aliases[]` samples.

### `/Users/salihalif/Desktop/My-Projects/sap-kb3/lib/evidence/s4-status.ts` (~120 lines)

```ts
export function fromBlueprintClass(k: 0|1|2|3|null): S4StatusClaim;                     // lib/s4-class
export function fromS4Trust(trust: "verified"|"partial"|"needs"): VerificationLevel;     // lib/s4
export function fromS4Object(status: "stays"|"changed"|"replaced"|"removed", release?: string): S4StatusClaim;
export function fromLifecycle(l: { status: "Active"|"Deprecated"|"Obsolete"; ecc: boolean; s4: boolean; alt?: string; fiori?: string }): S4StatusClaim;
export function fromChangeStatus(s: "Unchanged"|"Changed"|"Replaced"|"Deprecated"): S4StatusClaim; // data/ecc-s4
export function fromTxDisposition(d: "superseded"|"changed"|"available"|"unknown", trust: "verified"|"partial"|"needs"): S4StatusClaim;
export function fromFuncRegistry(o: { verificationStatus: string; s4OnPremSupport: string; cloudSupport: string; stability: string; releasedStatus?: string; verificationSource?: string }): { status: S4StatusClaim; level: VerificationLevel };
export function fromFioriTrust(t: "verified-docs"|"curated"|"needs-review", hasUrl: boolean): VerificationLevel;
export function fromCdsEnrichment(e?: { verified?: string; sources?: string[] }): { status: S4StatusClaim; level: VerificationLevel };
export function fromEccS4Block(b: { unchanged?: string; changed?: string; replaced?: string; deprecated?: string; fiori?: string; cds?: string }): S4StatusClaim;
export function fromVStatus(s: "verified"|"needs-review"|"cross-module"|"s4-only"|"ecc-only"): S4StatusClaim;
export function pickStatus(authored: S4StatusClaim | undefined, derived: S4StatusClaim): S4StatusClaim; // authored wins; derived keeps derivedFrom
export function levelOf(evidence: Evidence[]): VerificationLevel; // best level present; conflicts → conflicting_sources; none → verification_required
```
Every derived claim sets `edition: "on-premise"` (the MANIFEST's declared primary context), `release: null`, `source: null`, `derivedFrom`, and an explanation string that names its origin ("לפי עמודת S/4HANA בתיעוד המקור"). Derived claims never set `successor` from prose; only structured successors are carried (`lifecycle.alt`, tx `supersededBy` — passed in by the builder as an already-resolved id).

**Mapping table (legacy → unified; edition/release only from the overlay or a structured `release` field):**

| Source vocabulary | Value | Unified `S4Status` | `verificationLevel` |
|---|---|---|---|
| lib/s4-class (blueprint `s4Note`) | 0 ללא שינוי | `unchanged` | repository_verified |
| | 1 מותאם | `changed` | repository_verified |
| | 2 הוחלף | `replaced` (successor only if `s4AltTable`/overlay) | repository_verified |
| | 3 הוסר | `not_available` | repository_verified |
| | null (לא הוכרע במקור) | `verification_required` | verification_required |
| lib/s4 trust | verified / partial / needs | (no status; level only) | repository_verified / repository_verified(derived) / verification_required |
| data/s4-objects | stays / changed / replaced / removed | `unchanged` / `changed` / `replaced` / `not_available`; `release` copied when present ("S/4 1511") | trust curated → repository_verified; needs-verification → verification_required |
| data/lifecycle | Active, ecc&s4 | `unchanged` | repository_verified |
| | Active, !ecc & s4 | `s4_native` | repository_verified |
| | Deprecated | `deprecated` (successor = `tx:<alt>` if resolvable) | repository_verified |
| | Obsolete, s4=false | `not_available` (successor = `tx:<alt>`) | repository_verified |
| data/ecc-s4 | Unchanged/Changed/Replaced/Deprecated | `unchanged`/`changed`/`replaced`/`deprecated` | repository_verified |
| tx-detail disposition | superseded / changed / available / unknown | `replaced` / `changed` / `unchanged` / `verification_required` | by trust |
| bapi-registry | verified-docs & s4OnPrem yes | `unchanged` | repository_verified (source string, no URL) |
| | verified-system | `unchanged` | repository_verified |
| | version-dependent | `changed` | repository_verified |
| | internal-unsupported | `restricted` | repository_verified |
| | deprecated | `deprecated` | repository_verified |
| | invalid-name | `not_applicable` | repository_verified |
| | requires-verification | `verification_required` | verification_required |
| | s4OnPremSupport = no | `not_available` | as above |
| | overlay `released_api_available` | only from overlay with `sap_api_hub` evidence | sap_official_verified |
| fiori trust | verified-docs (+url) / curated / needs-review | record status `s4_native` | sap_official_verified / supported_secondary_source (book) or repository_verified / verification_required |
| cds-enrichment | verified (templated sources) / needs-verification / none | `s4_native` | repository_verified (never official: sources are not URLs) / verification_required / verification_required |
| EccS4 block (exits, transactions, domain-detail, guides) | has `deprecated` / has `replaced` / has `changed` / only `unchanged` / empty | `deprecated` / `replaced` / `changed` / `unchanged` / `verification_required`; `fiori` key → adds `fiori_alternative_available` as secondary flag | repository_verified; `inferred: true` → verification_required |
| verified-objects VStatus | s4-only / ecc-only / verified / needs-review / cross-module | `s4_native` / `legacy_ecc_only` / `unchanged` / `verification_required` / `unchanged` | repository_verified / verification_required |
| migration-cockpit trust | curated / needs-verification | (level only) | repository_verified / verification_required |

`compatibility_scope`, `simplified`, `released_api_available` are **overlay-only** values (they require an official source naming the Simplification Item / Compatibility Pack / released API). The mapper never emits them.

### `/Users/salihalif/Desktop/My-Projects/sap-kb3/lib/evidence/depth.ts` (~70 lines)

```ts
export type DepthLevel = 0|1|2|3|4|5;
export type Catalog = "tables"|"transactions"|"functions"|"idocs"|"cds"|"fiori"|"enhancements"|"objects"|"best-practices";
export interface DepthInput {
  hasHe: boolean; hasEn: boolean;
  structural: number;      // fields / relations / params / guiTx / tables — per catalog meaning
  structuralMin: number;   // threshold per catalog
  status: S4StatusClaim | null; level: VerificationLevel;
  evidence: number; officialWithUrl: number; xrefsResolved: number; xrefsTotal: number;
  lastVerifiedAt: string | null; successorOk: boolean;
}
export const DEPTH_HE: Record<DepthLevel, string>;
export function depthOf(i: DepthInput, today?: string): DepthLevel;
export function depthInputFor(catalog: Catalog, facts: Partial<DepthInput>): DepthInput; // fills structuralMin per catalog
```

Criteria (cumulative; a level requires all lower levels):

| Level | Rule | Per-catalog `structural` / `structuralMin` |
|---|---|---|
| L0 | identity only | — |
| L1 | Hebrew description present | — |
| L2 | `structural >= structuralMin` | tables: fields with dt+len, min 5 · transactions: authored facts (purpose, process, tables, bapis) min 3 · functions: tables+transactions min 2 or intel params · idocs: intel record present · cds: tables mapped + enrichment (viewType, keyField) min 2 · fiori: role+catalog+odata+guiTx min 3 · enhancements: trigger+object+tcodes min 3 · objects: members min 2 · bp: steps min 3 |
| L3 | `status !== null && status.status !== "verification_required"` and (`status.release` or `derivedFrom`) | same for all |
| L4 | `evidence >= 1` at level ≥ supported_secondary_source, `xrefsResolved === xrefsTotal`, no `conflicting_sources` | |
| L5 | `officialWithUrl >= 1`, `status.release` non-null, `lastVerifiedAt` ≤ 365 days, `successorOk` (true unless status ∈ {replaced, deprecated, not_available}) | |

### `/Users/salihalif/Desktop/My-Projects/sap-kb3/lib/evidence/validate.ts` (~130 lines)

```ts
export interface Universe { ids: Set<string>; aliases: Map<string, CanonicalId> }
export interface Problem { rule: RuleId; id: string; detail: string }
export type RuleId = "no-source"|"status-no-edition-release"|"replacement-no-successor"|"fiori-no-id-or-url"
  |"cds-no-release-context"|"fm-released-no-official"|"dangling-xref"|"duplicate-id"|"bad-id-syntax"
  |"placeholder"|"certainty-language"|"url-domain"|"sap-note-format"|"alias-collision";
export const URL_ALLOWLIST: readonly string[];        // help.sap.com api.sap.com fioriappslibrary.hana.ondemand.com fal.cloud.sap me.sap.com support.sap.com launchpad.support.sap.com
export const TIER3_DOMAINS: readonly string[];        // community.sap.com — allowed only when level ≠ sap_official_verified
export const CERTAINTY_RE: readonly RegExp[];         // /\b(always|never|guaranteed|definitely|certainly|fully supported|officially)\b/i, /(תמיד|לעולם לא|בוודאות|ללא ספק|מובטח|נתמך במלואו|באופן רשמי)/
export const PLACEHOLDER_RE: RegExp;                  // /\b(TODO|TBD|FIXME|lorem|xxx)\b|\?\?\?|בקרוב|למלא|placeholder|^\s*$/i
export function buildUniverse(parts: { manifest: {objects:readonly string[]; tcodes:readonly string[]; bapiFm:readonly string[]; idocs:readonly string[]; cds:readonly string[]}; fioriIds: string[]; exitNames: {name:string; kind:string}[]; techniqueSlugs: string[]; registry: RegistryEntry[]; bpSlugs: string[] }): Universe;
export function validateRecords(records: VerificationRecord[], u: Universe): Problem[];
export function validateBestPractices(bps: BestPracticeLike[], u: Universe): Problem[];
export function coverageOf(catalog: Catalog, rows: { id: CanonicalId; depth: DepthLevel; level: VerificationLevel; status: S4Status; edition: Edition }[]): CoverageRow;
export interface CoverageRow { catalog: Catalog; total: number; depth: Record<DepthLevel, number>; verified: number; verificationRequired: number; conflicting: number; legacyOnly: number; s4Applicable: number; editionSpecific: number }
```

### `/Users/salihalif/Desktop/My-Projects/sap-kb3/lib/evidence/resolve.ts` (~90 lines, app-side, `@/` allowed)

```ts
import { OVERLAYS, REGISTRY } from "@/data/verification";          // merged Record<CanonicalId, VerificationRecord>
export function overlayFor(id: CanonicalId): VerificationRecord | undefined;   // exact id, then alias map
export function evidenceBlock(id: CanonicalId, derived: S4StatusClaim, facts: Partial<DepthInput>, catalog: Catalog): EvidenceBlockData;
export function successorHref(id: CanonicalId): string | null;   // via ref-links: objectHref/txHref/bapiHref/idocHref/cdsHref/fioriHref/enhHref; bp → /neo/best-practices/<slug>/
export function bestPracticesFor(id: CanonicalId): { slug: string; he: string; href: string }[]; // reverse index over BEST_PRACTICES[].xrefs
```
`successorHref` is the only place a link is emitted; it resolves against the same gated helpers in `components/neo-shell/reference/ref-links.ts:83-102`, so the dead-link crawler cannot see an href without a page.

### `/Users/salihalif/Desktop/My-Projects/sap-kb3/data/verification/*.ts`

Each catalog file: `export const TABLE_VERIFICATION: VerificationRecord[] = [];` (type-only import from `@/lib/evidence/types`). `objects.ts` and `idocs.ts` additionally export `RegistryEntry[]` (`OBJECT_REGISTRY`, `IDOC_BASIC_TYPES`). Foundation ships **empty arrays plus one worked example per file that is repository-verified only** (e.g. `table:MATDOC` citing `data/s4-impact.ts#MATDOC` as `repository` evidence with `repoRef`) so the UI, tests and coverage script exercise real rows without asserting any new SAP fact. `index.ts`: `export const OVERLAYS: Record<CanonicalId, VerificationRecord>` (throws at module load on duplicate id — the same guard the test runs, so `next build` fails loudly too) and `export const REGISTRY: RegistryEntry[]`.

### `/Users/salihalif/Desktop/My-Projects/sap-kb3/data/best-practices/index.ts` (+ `pm.ts`, `pp-pi.ts`)

```ts
export interface BestPractice {
  slug: string; he: string; en: string; module: "PM"|"PP-PI"|"Cross";
  summary: string; context: string;          // he
  steps: { he: string; xrefs?: CanonicalId[] }[];
  antiPatterns?: string[]; checks?: string[];
  xrefs: CanonicalId[];                       // objects this practice concerns (must resolve)
  evidence: Evidence[];                       // same rules as overlays
  status?: S4StatusClaim;                     // when the practice itself is edition-bound
  lastVerifiedAt: string; reviewer: string;
}
export const BEST_PRACTICES: BestPractice[]; export const bpSlugs = () => BEST_PRACTICES.map(b => b.slug);
export const bpBySlug = (s: string) => BEST_PRACTICES.find(b => b.slug === s);
```
Seed: two records derivable from repository data only (BAPI COMMIT discipline from `data/function-intel.ts` RET note; MATDOC read-through-compat from `data/s4-impact.ts`), each with `repository` evidence + `supported_secondary_source` where a book chapter in `data/books/**` is cited by id (books are read, not modified).

### UI

`/Users/salihalif/Desktop/My-Projects/sap-kb3/components/neo-shell/evidence/evidence-block.tsx` (~80 lines, server component, no client JS) — `export function EvidenceBlock({ e }: { e: EvidenceBlockData })`. Renders: status pill (`.nu-status` with `--s` = dot) + `edition · release` chips (`.nu-chip`), recommended action line, successor as `.nu-link` when `href` else `.nu-chip.is-sap`, verification-level pill, sources list (title, external `<a>` only when `url`; `rel="noopener noreferrer"`), `lastVerifiedAt` + reviewer, `conflicts > 0` line, depth chip "עומק L3", and the `needsVerification` state that prints the existing phrase "נדרש אימות נוסף" plus "לא קיים תיעוד מאומת במאגר" when `sources` is empty. `app/neo/evidence.css` (~40 lines) imported by the component; only layout, all colours through `--status-*`/`--m` tokens per the form rule in `app/neo/ui.css:16-22`.

Best-practices surface: `components/neo-shell/best-practices/bp-data.ts` (`bpList(): BpRow[]`, `bpDetail(slug): BpDetail | null`, resolving every xref via `ref-links` + `successorHref`, returning `href: string | null`), `bp-view.tsx` (server; `BpList` and `BpDetail` in one file reusing `.nxt-head/.nxt-sec/.nxt-grid/.nu-card` from `app/neo/reference.css`, `SectionNav` from `components/neo-shell/workspace/section-nav.tsx:108`, `SmartReturn`, `EvidenceBlock`), pages `app/neo/best-practices/page.tsx` and `[slug]/page.tsx` copied from the knowledge pattern (`app/neo/knowledge/[slug]/page.tsx`: `dynamicParams = false`, `generateStaticParams` from `bpSlugs()`, `robots: { index: false }`).

### `/Users/salihalif/Desktop/My-Projects/sap-kb3/scripts/report-coverage.mjs` (~90 lines)

Run as `node --experimental-strip-types --no-warnings --loader ./scripts/alias-loader.mjs scripts/report-coverage.mjs [--json] [--catalog tables]` (same invocation as `gen:tx-index`). Imports the real catalog builders (`registry()`, `registryCodes()`, `tableNames()`, `CDS_VIEWS`, `FIORI_APPS`, `EXITS`+`ENHANCEMENTS`, `idocMessageTypes()`, `OBJECT_REGISTRY`, `BEST_PRACTICES`), computes per record the same `derived → pickStatus → depthOf` the builders use (through `resolve.evidenceBlock`), then prints:

```
catalog          total   L0   L1   L2   L3   L4   L5  verified  verif.req  conflict  legacy  s4-appl  edition
tables             105    0   11   68   26    0    0        94         11         0       0       94        0
transactions       539  ...
functions          147  ...
idocs                2  ...
cds                 39  ...
fiori               20  ...
enhancements        42  ...   (13 techniques + 29 named exits/BAdIs)
objects              0
best-practices       2
TOTAL              ...
exit 0; `--json` prints CoverageRow[]; `--min-depth <catalog>=<L>` optional gate (exit 1) for later phases.
```
Column definitions: verified = level ∈ {sap_official_verified, repository_verified, supported_secondary_source}; legacy = status `legacy_ecc_only`; s4-appl = status ∉ {not_applicable, legacy_ecc_only, verification_required}; edition = any evidence or status with edition ∈ {private-cloud, public-cloud} (i.e. beyond the default on-premise context).

## 3. Existing files touched (file:line, one-line change each)

Builders (add `evidence` to the view model and compute it next to `s4`):
- `components/neo-shell/data/tables-detail.ts:192` add `evidence: EvidenceBlockData;` · `:438` add `evidence: evidenceBlock(\`table:${name}\`, fromBlueprintClass(s4ClassOf({ s4Note: rows.map(r => r.s4Note).find(Boolean) || "" })), { hasHe: !!node.he, structural: fields.filter(f => f.dt && f.len).length, xrefsTotal: 0, xrefsResolved: 0 }, "tables"),` (import `s4ClassOf` from `@/lib/s4-class`, `fromBlueprintClass` + `evidenceBlock` from `@/lib/evidence`).
- `components/neo-shell/object/object-data.ts:153` and `:359` — identical one-liners (same `table:` id; the object page is the same physical table).
- `components/neo-shell/data/tx-detail.ts:148` add `evidence: EvidenceBlockData;` · `:410` add `evidence: evidenceBlock(\`tx:${code}\`, fromTxDisposition(s4.disposition, s4.trust), { hasHe: !!reg.he, structural: [purpose, process, tables.length, detail.bapis.length].filter(Boolean).length }, "transactions"),` (successor passed as `s4.supersededBy[0]` → `tx:` id when present).
- `components/neo-shell/reference/types.ts:166` add `evidence?: EvidenceBlockData;` (type-only import from `@/lib/evidence/types` keeps the file structural, like its existing header demands).
- `components/neo-shell/reference/bapi-data.ts:499` add `evidence: evidenceBlock(\`fm:${o.id}\`, fromFuncRegistry(o).status, {...}, "functions"),`
- `components/neo-shell/reference/cds-data.ts:290` add `evidence: evidenceBlock(\`cds:${v.view}\`, fromCdsEnrichment(e).status, {...}, "cds"),`
- `components/neo-shell/reference/fiori-data.ts:299` add `evidence: evidenceBlock(\`fiori:${a.id}\`, { ...S4_NATIVE_DERIVED("fiori-apps") }, {...}, "fiori"),`
- `components/neo-shell/reference/enh-data.ts:266` add `evidence: evidenceBlock(\`enh:technique:${e.slug}\`, fromEccS4Block({ changed: e.s4, unchanged: e.ecc }), {...}, "enhancements"),`
- `components/neo-shell/reference/idoc-data.ts:341` add `evidence: evidenceBlock(\`idoc:msg:${r.name}\`, derivedFromIntel, {...}, "idocs"),`

Views (single insertion point each, inside the existing S/4 block):
- `components/neo-shell/reference/ref-detail-view.tsx:255` after the `d.s4.warn` line: `{d.evidence ? <EvidenceBlock e={d.evidence} /> : null}` — covers bapi, cds, idoc, fiori-apps, enhancements at once.
- `components/neo-shell/data/tables-detail-view.tsx:340` after the closing `</div>` of `.nxb-stand`: `<EvidenceBlock e={t.evidence} />`.
- `components/neo-shell/data/tx-detail-view.tsx:244` before `</section>` at 245: `<EvidenceBlock e={t.evidence} />`.
- `components/neo-shell/object/object-view.tsx:633` after the closing `</div>` of `.no-stand`: `<EvidenceBlock e={v.evidence} />`.

Navigation and search:
- `components/neo-shell/nav-data.ts:209` (knowledge group) add `{ id: "best-practices", href: "/neo/best-practices/", label: "שיטות עבודה מומלצות", icon: "ClipboardCheck", count: BEST_PRACTICES.length, countLabel: "שיטות" },` · `:310` add `case "best-practices": return BEST_PRACTICES.slice(0, 5).map((b) => b.he);`. Because `href` is set the id never enters `NEO_HUBS`; counts of the other rail items are untouched (overlays add no records to any existing catalog; a `VerificationRecord` whose id is not in the universe fails the dangling test, so a record cannot appear only in the overlay).
- `components/neo-shell/nav-context/fallbacks.ts:63` add `["/neo/best-practices/", { href: "/neo/best-practices/", label: "שיטות עבודה מומלצות" }],`.
- `components/neo-shell/search/types.ts:25` add `| "bp"` to `CmdKind`; `:31` add `"bp"` to `CmdExtraRecord.k`.
- `components/neo-shell/search/build.ts:34` add `{ k: "bp", he: "שיטת עבודה", icon: "ClipboardCheck" },` · `:60` add `bp: "doc",`.
- `components/neo-shell/search/command-index.ts:234` `recs: [...chapters(), ...flows(), ...guides(), ...bestPractices()]` plus a 10-line `bestPractices()` mirroring `guides()` (`command-index.ts:203-212`), href `/neo/best-practices/<slug>/`.
- `scripts/gen-tx-search-index.mjs` and `lib/tcode-search.ts`: **not touched.** They feed the legacy `/transactions/` surface whose `SearchHit.kind` union and renderer are legacy; the NEO command surface is the one that gains the family. Counts cannot duplicate because the rail's `ShellData.search` (`nav-data.ts:385-413`) is not extended and `commandIndex()` carries only what `ShellData` lacks (`search/types.ts:77`).
- `package.json` add `"report:coverage"`, and extend nothing else: the three new tests match `test/*.test.ts`. Optionally `"check:evidence": "node --experimental-strip-types --test test/evidence-*.test.ts test/s4-status.test.ts"`.
- `lib/route-manifest.generated.ts`, `scripts/gen-route-manifest.mts`, `scripts/check-route-manifest.mjs`: untouched; `/neo/best-practices/` is not one of the seven families, and `crawl:deadlinks` still validates every href it emits.

## 4. Tests (node:test, `test/*.test.ts`, explicit `.ts` relative imports)

`test/s4-status.test.ts`
- every legacy value of every vocabulary maps (table-driven over the 12 mapper functions; a missing branch throws).
- blueprint verdict round-trip: for `k ∈ {0,1,2,3,null}`, `fromBlueprintClass(k).derivedFrom === "blueprint"` and the label set of `S4_HE`/`S4_UNDECIDED_HE` from `lib/s4-class.ts` is still exactly {ללא שינוי, מותאם, הוחלף, הוסר, לא הוכרע במקור} (guards the promise that the validated vocabulary is untouched).
- derived claims never carry a `successor` or a non-null `release`; `pickStatus` prefers the authored claim and preserves `derivedFrom` when falling back.
- `depthOf` is monotonic: removing any input never raises the level; an L5 fixture drops to L4 when `lastVerifiedAt` is older than 365 days.
- `normalizeAlias("fm", ...)` equals the `cleanFunc` rule on the aliases present in `data/bapi-enrichment.sweep.ts` sample names.

`test/evidence-schema.test.ts` (loads the 8 overlay files and `data/best-practices/{pm,pp-pi}.ts` with `.ts` paths; runs `validateRecords`/`validateBestPractices`; asserts `problems` is empty per rule, printing the first 8 offenders)
1. `no-source`: `evidence.length === 0` unless `level === verification_required` and `status` is absent or `verification_required`.
2. `status-no-edition-release`: an authored `status` (no `derivedFrom`) must have `edition` and non-empty `release` unless `status ∈ {not_applicable, verification_required}`.
3. `replacement-no-successor`: `status ∈ {replaced, deprecated, not_available}` with `source !== null` requires `successor` that resolves.
4. `fiori-no-id-or-url`: every `fiori:` record's id matches `/^[FW]\d{4}[A-Z]?$/` and carries ≥1 evidence with `sourceType ∈ {fiori_library, sap_help}` and a `url`, else its level must be `verification_required`.
5. `cds-no-release-context`: every `cds:` record with status ≠ `verification_required` has `status.release` and `edition`.
6. `fm-released-no-official`: `status.status === released_api_available` or authored `unchanged` with claim text matching /released|משוחרר/ requires evidence with `sourceType ∈ {sap_api_hub, sap_help}` and `url`, level `sap_official_verified`.
7. `bad-id-syntax`: `isValidId(id)` for record ids, xrefs, successors, `RegistryEntry.members`.
8. `placeholder`: `PLACEHOLDER_RE` over `claim`, `status.he`, `recommendedAction`, `notes`, best-practice `summary/steps`.
9. `certainty-language`: `CERTAINTY_RE` over `claim`, `status.he`, `notes` for records at `verification_required` or `conflicting_sources`.
10. `url-domain`: every `url` host ∈ `URL_ALLOWLIST`; `TIER3_DOMAINS` only when level ≠ `sap_official_verified`; `sap_official_verified` requires a url on help.sap.com / api.sap.com / fioriappslibrary / fal.cloud.sap.
11. `sap-note-format`: `sapNote`/`kba` match `/^\d{6,7}$/` (same rule as `check-bapi-consistency.mjs:23`) and carry either a `me.sap.com/notes` url or a `repoRef`.
12. loader-free guard: the listed source files contain no `from "@/` value import; and `data/verification/index.ts` imports exactly the files the test loads (regex on its text).

`test/evidence-xref.test.ts` (universe from `lib/route-manifest.generated.ts` + `data/fiori/apps.ts` + `data/exits.ts` + `data/enhancements.ts` + `OBJECT_REGISTRY` + `IDOC_BASIC_TYPES` + `bpSlugs`)
13. `dangling-xref`: every `xrefs[]`, `successor`, `members[]`, best-practice `xrefs` and step xrefs resolve by id or alias.
14. `duplicate-id`: no id appears twice across the 8 overlay files, the registry entries and best-practice slugs; `alias-collision`: no alias maps to two ids and no alias equals another record's id.
15. a `RegistryEntry` (`obj:`, `idoc:basic:`) must have ≥1 resolving member.

## 5. Commit sequence (branch `design/neo-correction-pass`, preview only; revert `data/ai-tree/*.json` drift after each build)

1. `feat(evidence): foundation types, canonical ids, unified S/4HANA status map, depth scoring` — `lib/evidence/{types,canonical,s4-status,depth,validate}.ts`, `test/s4-status.test.ts`. Gates: `npm test`, `npm run typecheck:test`, `npx tsc --noEmit`.
2. `feat(evidence): verification overlays, best-practice registry, schema/xref tests, coverage report` — `data/verification/*`, `data/best-practices/*`, `lib/evidence/resolve.ts`, `test/evidence-*.test.ts`, `scripts/report-coverage.mjs`, `package.json`. Gates: tests + `npm run report:coverage` (baseline numbers recorded in the commit body).
3. `feat(neo/evidence): shared evidence block on table, object, transaction and the five reference records` — component + css + 9 builder/type touches + 4 view touches. Gates: `npm run build` ×2 (already double in `build`), `check:routes` (no drift expected), `crawl:deadlinks`, `check:sitemap`, browser screenshots of `/neo/tables/AUFK/`, `/neo/transactions/IW31/`, `/neo/bapi/BAPI_ALM_ORDER_MAINTAIN/`, `/neo/cds/I_MaintenanceOrder/`, `/neo/fiori-apps/manage-maintenance-orders/`.
4. `feat(neo/best-practices): data-driven section, rail entry, command-surface family` — pages, views, nav-data, fallbacks, search kind. Gates: build, `crawl:deadlinks`, `check:routes` (`best-practices` outside FAMILIES), screenshots of list + detail, mobile rail.
5..12. `data(verification/<catalog>): <n> records, <edition>/<release>` one commit per catalog in this order: tables (blueprint-first, mapped statuses + official Simplification-Item sources), transactions, functions (48 requires-verification first), fiori (open with the F2731/F5241 `conflicting_sources` record), cds (downgrade templated "verified" to repository_verified with real Help URLs where found), enhancements, idocs (+ basic types registry), objects (`obj:` registry), then `data(best-practices/pm)`, `data(best-practices/pp-pi)`. Each commit body pastes the `report:coverage` delta.

## 6. Risks and mitigations

- **Build-time cost.** `evidenceBlock` is one Map lookup plus a pure depth computation per page; the overlay index is built once per module load. ~2,500 detail pages → negligible against the existing double `next build`. `report:coverage` re-runs the same builders (`registry()`, tx registry, ERD model) — seconds, not minutes; keep it out of `prebuild`.
- **Export size.** One block ≈ 0.8–1.5 KB HTML per page (~3 MB across `out/`). Cap visible sources at 6 (`…ועוד n`), never inline `conflictingEvidence` bodies (count only). `EvidenceBlockData` lives in server view models, so nothing crosses the client boundary except the `bp` command-surface records (~100 bytes each).
- **Frozen surfaces.** Nothing under `components/neo/**`, `components/library/**`, `app/library/**`, `data/books/**`, `data/ai-tree/**` is touched; book evidence cites book ids from `data/library.ts` read-only. `prebuild` regenerates `data/ai-tree/*.json` — revert, do not commit.
- **Route manifest / hub collision.** `best-practices` seed carries `href` → excluded from `NEO_HUBS`; static segment wins over `[hub]`. Not a manifest family → `gen:routes` unnecessary; if a future phase wants `SmartLink` to resolve `bp:` ids client-side, add a `bestPractices` family to both `gen-route-manifest.mts` and `check-route-manifest.mjs` in the same commit.
- **Dead links.** Every href in the block and the best-practice views is resolved through `ref-links` gates or `successorHref`; unresolved ids render as `.nu-chip.is-sap` values. External SAP URLs are content, not loads (CLAUDE.md), and the crawler ignores non-`/` hrefs.
- **Vocabulary drift.** The unified status is additive: `lib/s4-class`, `lib/s4`, `TdS4`, `TxS4`, `RefS4` keep rendering exactly as today; the block sits beside them. The pill text for `repository_verified` reads "מאומת מול נתוני הפרויקט" so it never contradicts the existing "רשומה מאומתת" pill on CDS records while making the tier visible.
- **Typecheck of tests.** `tsconfig.test.json` includes `lib/**`; `lib/evidence/resolve.ts` uses `@/` (resolved by `paths`) and must avoid DOM types (types: node only).
- **Line budget.** Core (types, canonical, s4-status, depth, validate, resolve, overlays skeleton, block, three tests, coverage script) ≈ 650–700 lines; the best-practices section adds ≈ 200. If the ~800 cap is hard, defer the command-surface kind (rail entry alone already reaches the pages) and fold `bp-list` into a 30-line server map inside `page.tsx`.
- **Honesty traps to watch during per-catalog commits.** `data/cds-enrichment.ts` "verified" with templated sources must not become `sap_official_verified`; `data/fiori/apps.ts` `source: "SAP Fiori Apps Library (curated)"` is a title, not a URL; `lifecycle.ts` says uncertain items "default to Active" — map Active only when the record is explicitly present, never from the `DEFAULT` fallback.

### Critical Files for Implementation
- /Users/salihalif/Desktop/My-Projects/sap-kb3/lib/evidence/s4-status.ts (new; the one mapping from every legacy vocabulary to the unified status)
- /Users/salihalif/Desktop/My-Projects/sap-kb3/lib/evidence/validate.ts (new; rule engine shared by the tests and scripts/report-coverage.mjs)
- /Users/salihalif/Desktop/My-Projects/sap-kb3/components/neo-shell/reference/types.ts (RefDetail gains `evidence?`, covering five directories through ref-detail-view.tsx:255)
- /Users/salihalif/Desktop/My-Projects/sap-kb3/components/neo-shell/data/tables-detail.ts (builder pattern the object and transaction builders mirror; lines 192/438)
- /Users/salihalif/Desktop/My-Projects/sap-kb3/components/neo-shell/nav-data.ts (rail seed with `href` → new section without touching NEO_HUBS or the route manifest)