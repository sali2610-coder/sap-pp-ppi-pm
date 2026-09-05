export const meta = {
  name: 'neo-enrich-family',
  description: 'Research and enrich one Project NEO catalog family with officially sourced S/4HANA verification records',
  phases: [
    { title: 'Research', detail: 'one researcher per record: official SAP sources only, structured draft' },
    { title: 'Verify', detail: 'one adversarial auditor per draft: refute URLs, claims, statuses, xrefs' },
    { title: 'Write', detail: 'single writer merges survivors into the overlay, runs the gates' },
  ],
}

const REPO = '/Users/salihalif/Desktop/My-Projects/sap-kb3'
const catalog = args.catalog
const accessedAt = args.accessedAt
const queue = (args.queue || []).slice(0, args.batch || 12)
const FILE = { tables: 'tables.ts', transactions: 'transactions.ts', functions: 'functions.ts', idocs: 'idocs.ts', cds: 'cds.ts', fiori: 'fiori.ts', enhancements: 'enhancements.ts', objects: 'objects.ts' }[catalog]

const COMMON = `Repo: ${REPO} (branch design/neo-correction-pass). Catalog: ${catalog}. Overlay file: data/verification/${FILE}. Access date to stamp: ${accessedAt}.
READ FIRST: audit/s4-enrichment/MANIFEST.md (evidence channels + limits), lib/evidence/types.ts (Evidence / VerificationRecord / S4StatusClaim / S4Status tokens), lib/evidence/validate.ts (the 14 rules incl. URL_ALLOWLIST, CERTAINTY_RE, PLACEHOLDER_RE), and 2-3 existing records in data/verification/tables.ts as the house style (Hebrew claims bounded by the snippet, real loio URLs with version, repoRef for repository evidence).
OFFICIAL LOOKUP TOOL: \`node scripts/sap-help-search.mjs "<query>" --size 8 --json\` (help.sap.com search JSON: title, deliverable, product, release, versionId, loio, url, date, snippet). Also WebSearch restricted to help.sap.com / api.sap.com / fioriappslibrary.hana.ondemand.com / fal.cloud.sap for official URLs + titles. help.sap.com topic BODIES, fal.cloud.sap and api.sap.com pages are JS shells - never claim body text you could not see; a claim must be supported by the search record's title/snippet or a document you actually read (PDF via curl -o + Read).
HARD RULES: never invent a table field, parameter, Fiori ID, SAP Note number, release status or successor. Edition on-premise unless the source says otherwise. S/4 status tokens ONLY from the S4Status union. sap_official_verified requires a help.sap.com / api.sap.com / fioriappslibrary / fal URL. When evidence is missing use verification_required and say exactly what is missing. Hebrew professional copy (תחזוקת מפעל, תעשיות תהליכיות, no em dashes). Canonical ids: table:AUFK, tx:IW31, fm:BAPI_X, idoc:msg:MATMAS, idoc:basic:MATMAS05, cds:I_MaintenanceOrder, fiori:F5241, enh:badi:NAME, obj:slug, bp:slug. xrefs must exist in the universe (lib/route-manifest.generated.ts families, data/fiori/apps.ts ids, data/exits.ts names, data/enhancements.ts slugs, OBJECT_REGISTRY, IDOC_BASIC_TYPES, bp slugs) - check before adding.`

const DRAFT = {
  type: 'object', required: ['id', 'record', 'summary', 'gaps'],
  properties: {
    id: { type: 'string' },
    record: { type: 'object', description: 'a complete VerificationRecord object exactly as it should appear in the overlay (id, aliases?, status?, evidence[], xrefs?, notes?, reviewer, lastVerifiedAt). Evidence entries must carry sourceType, sourceTitle, url or repoRef, product, edition, release?, accessedAt, claim (he), verificationLevel.' },
    summary: { type: 'string', description: 'he: what was verified and at which level' },
    gaps: { type: 'array', items: { type: 'string' }, description: 'what could not be verified and why' },
    conflicts: { type: 'array', items: { type: 'string' } },
  },
}
const VERDICT = {
  type: 'object', required: ['id', 'refuted', 'problems', 'downgrades'],
  properties: {
    id: { type: 'string' },
    refuted: { type: 'boolean', description: 'true when the draft must NOT be written as-is (fabricated URL, unsupported claim, wrong status token, invented successor)' },
    problems: { type: 'array', items: { type: 'string' } },
    downgrades: { type: 'array', items: { type: 'string' }, description: 'precise edits that make the draft honest (level downgrade, claim rewrite, xref drop) - the writer applies them' },
    fixedRecord: { type: 'object', description: 'the corrected record when the fix is mechanical; omit when refuted' },
  },
}

phase('Research')
const results = await pipeline(queue,
  (item) => agent(`${COMMON}\n\nYou are the RESEARCHER for ${item.id} (${item.he || ''}). Hint: ${item.hint || 'verify S/4HANA status, release and official sources'}.
Steps: (1) read what the repository already holds for this record (grep the id / name in data/**, lib/**, components/neo-shell/** builders) and the current derived status the app shows; (2) query the official lookup tool with 3-6 targeted queries (the technical name, its SAP English name, 'What's New', 'Simplification', 'Virtual Data Model' / 'APIs for ...' deliverables) and WebSearch on the official domains; (3) build the VerificationRecord: 1-4 Evidence entries with real URLs (from the JSON records - copy url/loio/versionId verbatim), each claim in Hebrew and bounded by what the title/snippet states; an authored status ONLY when an official record supports it (with source = one of your Evidence entries, edition, release, recommendedAction he, successor only if verified and existing in the universe); otherwise omit status and explain in gaps; xrefs to existing ids only; notes with honest caveats. Return the draft.`,
    { label: `research:${item.id}`, phase: 'Research', schema: DRAFT }),
  (draft, item) => draft ? agent(`${COMMON}\n\nYou are the ADVERSARIAL AUDITOR for ${item.id}. Try to REFUTE this draft. Default to refuted=true if uncertain.
Checks: every url resolves (curl -sI or curl -s | head) and its host is allowlisted; help.sap.com URLs carry a real loio and the versionId/release matches the JSON record (re-run scripts/sap-help-search.mjs to confirm the title exists); every claim is supported by the cited title/snippet (no body-text claims); status token is in the S4Status union; status has source+edition+release; replaced/deprecated/not_available only with a resolvable successor or none stated; no invented SAP Note numbers (a note number must appear in the cited source or a repoRef); sourceType matches the URL; no certainty language on verification_required; Hebrew is professional; xrefs exist in the universe. Produce downgrades (mechanical fixes) or refute.
Draft:\n${JSON.stringify(draft)}`,
    { label: `verify:${item.id}`, phase: 'Verify', schema: VERDICT, effort: 'high' }).then((verdict) => ({ draft, verdict })) : null,
)

const drafts = results.map((r, i) => ({ item: queue[i], draft: r && r.draft, verdict: r && r.verdict })).filter((x) => x.verdict)
const survivors = drafts.filter((x) => !x.verdict.refuted)
const refuted = drafts.filter((x) => x.verdict.refuted)
const missing = queue.length - drafts.length
log(`${survivors.length} survive, ${refuted.length} refuted, ${missing} lost to errors`)

phase('Write')
let writeReport = null
if (survivors.length) {
  const journalPayload = survivors.map((x) => ({ id: x.item.id, draft: x.draft.record, verdict: x.verdict }))
  writeReport = await agent(`${COMMON}\n\nYou are the single WRITER. Merge these ${survivors.length} audited records into data/verification/${FILE}: for each, take verdict.fixedRecord when present, otherwise apply the listed downgrades to the researcher's draft (re-derive from the verdict text; if a draft is not recoverable, queue it instead of guessing). Keep existing records (worked examples) unless a new record supersedes the same id. Append refuted ids with their problems to audit/s4-enrichment/research-queue-${catalog}.md (create if missing; sections: ## refuted, ## conflicts). If this catalog is still under the repository-only foundation guard in test/evidence-schema.test.ts, graduate it the way tables/functions/transactions were (remove from FOUNDATION_RECORDS, add to the graduated repoRef test). Then run: ./node_modules/.bin/tsc --noEmit; ./node_modules/.bin/tsc --noEmit -p tsconfig.test.json; npm test; npm run report:coverage -- --catalog ${catalog}. Fix any rule violation HONESTLY (downgrade, drop xref, reword) - never by weakening a rule. Do not commit. Report: records written, records queued, coverage before/after, deviations.
Audited records:\n${JSON.stringify(journalPayload)}\n\nRefuted (queue them):\n${JSON.stringify(refuted.map((x) => ({ id: x.item.id, problems: x.verdict.problems })))}`,
    { label: `write:${catalog}`, phase: 'Write' })
} else {
  log('nothing survived verification - nothing written')
}
return { catalog, batch: queue.length, written: survivors.length, queued: refuted.length, lost: missing, writeReport }
