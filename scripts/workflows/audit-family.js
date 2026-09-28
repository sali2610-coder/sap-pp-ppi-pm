export const meta = {
  name: 'neo-audit-family',
  description: 'Independent adversarial audit of EXISTING Project NEO verification records (records written without the pipeline auditor), then one writer per batch applies the verdicts',
  phases: [
    { title: 'Audit', detail: 'one independent auditor per existing record: re-run the official searches, refute or confirm every claim' },
    { title: 'Write', detail: 'single writer per batch applies fixedRecord / downgrades, swaps the no-auditor flag for the audit note, runs the gates' },
  ],
}

// args: { catalog, accessedAt, rawDir, flagSentence, batches: [{ queue: [{id, he, hint}] }], commonHint? }
const REPO = '/Users/salihalif/Desktop/My-Projects/sap-kb3'
const catalog = args.catalog
const accessedAt = args.accessedAt
const FILE = { tables: 'tables.ts', transactions: 'transactions.ts', functions: 'functions.ts', idocs: 'idocs.ts', cds: 'cds.ts', fiori: 'fiori.ts', enhancements: 'enhancements.ts', objects: 'objects.ts' }[catalog]

const COMMON = `Repo: ${REPO} (branch design/neo-correction-pass). Catalog: ${catalog}. Overlay file: data/verification/${FILE}. Audit date to stamp: ${accessedAt}.
READ FIRST and ONLY: audit/s4-enrichment/HOUSE-RULES.md (record shapes, validation rules, honesty rules, the scripted official channels: scripts/sap-help-search.mjs, scripts/sap-help-body.mjs, scripts/fal-app.mjs). Open lib/evidence/types.ts or validate.ts only if a rule there is unclear.
HARD RULES: never invent a table field, parameter, Fiori ID, SAP Note number, release status or successor. Claims bounded by the search record title/snippet or a body read with sap-help-body.mjs. A name no official record prints stays verification_required with the searches listed; never assert non-existence. Hebrew professional copy, no em dashes. xrefs only to ids that exist.`

const VERDICT = {
  type: 'object', required: ['id', 'refuted', 'problems', 'downgrades', 'auditNote', 'checked'],
  properties: {
    id: { type: 'string' },
    refuted: { type: 'boolean', description: 'true when the record must NOT stand as written (unsupported claim, wrong status token, invented successor, URL that does not resolve, quote absent from every saved or re-run search record)' },
    problems: { type: 'array', items: { type: 'string' } },
    downgrades: { type: 'array', items: { type: 'string' }, description: 'precise edits that make the record honest (claim rewrite, level downgrade, xref drop, status removal); the writer applies them' },
    upgrades: { type: 'array', items: { type: 'string' }, description: 'official evidence the record lacks and the auditor found (URL copied verbatim from a search record, with the bounded Hebrew claim); the writer adds it' },
    fixedRecord: { type: 'object', description: 'the corrected full VerificationRecord when the fix is mechanical (same id); omit when nothing changes or the fix is not mechanical' },
    auditNote: { type: 'string', description: 'Hebrew, 1-3 sentences: what the independent audit re-checked on the audit date and what it found; goes into the record notes' },
    checked: {
      type: 'object', required: ['existence', 'releasedOrInternal', 'moduleAndPurpose', 'contract', 'commitSemantics', 'successor', 'sources'],
      properties: {
        existence: { type: 'string' }, releasedOrInternal: { type: 'string' }, moduleAndPurpose: { type: 'string' },
        contract: { type: 'string' }, commitSemantics: { type: 'string' }, successor: { type: 'string' }, sources: { type: 'string' },
      },
    },
  },
}

const results = []
for (const [bi, b] of (args.batches || []).entries()) {
  const queue = b.queue
  log(`batch ${bi + 1}/${args.batches.length}: audit x${queue.length} (${queue.map((q) => q.id).join(', ')})`)
  phase('Audit')
  const verdicts = await pipeline(queue,
    (item) => agent(`${COMMON}\n\nREAD-ONLY ROLE: do not create, modify or delete any file in the repository (scratch files only under /tmp); return your result as the structured output only. You are the INDEPENDENT ADVERSARIAL AUDITOR for the EXISTING record ${item.id} (${item.he || ''}). You did not write it; a main session wrote it on 2026-09-23 without any auditor, and your job is to try to REFUTE it. Default to refuted=true if uncertain. Hint: ${item.hint || ''}${args.commonHint ? ' ' + args.commonHint : ''}
Steps:
(1) Read the record: grep -n 'id: "${item.id}"' data/verification/${FILE} and read the whole object (evidence, xrefs, status if any, notes). Note the DATE constants at the top of the file.
(2) Provenance: the raw search results the writer saved are in ${args.rawDir}/<NAME>-*.json (NAME = the id without the "fm:" prefix; several files per id). Every English fragment quoted in a claim must exist in a title or snippet of one of those records, or of a record you fetch now. Quote-check mechanically (grep the fragment across the files).
(3) Re-run the official searches yourself on ${accessedAt}: the exact name in the SAP_S4HANA_ON-PREMISE scope, in the SAP_ERP scope (--product SAP_ERP), plus 2-4 targeted queries the writer may have missed (the function group, the business object or BAPI page, 'released', 'API', 'BAPI Explorer', the successor OData/CDS/Fiori name). Look specifically for: an official page that prints the name (existence), whether it is a released API or an internal FM, the parameter contract where an official page prints it, commit/rollback semantics (BAPI_TRANSACTION_COMMIT), and a released successor in S/4HANA. Report each under "checked".
(4) Rules: every url resolves (curl -sI) on an allowlisted host; help.sap.com URLs carry a real loio and the versionId/release matches a search record; every claim is bounded by the cited title/snippet (no body-text claims, no 'only', no non-existence); status token in the S4Status union with source+edition+release; replaced/deprecated/not_available only with a successor that exists in the universe; no SAP Note number that no cited source prints; sourceType matches the URL; no certainty language on verification_required; xrefs exist; Hebrew professional.
(5) Verdict: refuted when it must not stand; downgrades for honest edits; upgrades when you found official evidence it lacks (copy url/loio/versionId verbatim from the JSON, bounded Hebrew claim); fixedRecord when the fix is mechanical (full record, same id, keep the existing DATE23 accessedAt on evidence you did not change, new evidence accessedAt "${accessedAt}"). auditNote in Hebrew states what was re-checked and found on ${accessedAt}. Never call the record verified beyond what the sources print.`,
      { label: `audit:${item.id}`, phase: 'Audit', schema: VERDICT, effort: 'high' }),
  )
  const got = verdicts.map((v, i) => ({ item: queue[i], verdict: v })).filter((x) => x.verdict)
  const lost = queue.length - got.length
  log(`batch ${bi + 1}: ${got.filter((x) => !x.verdict.refuted).length} confirmed, ${got.filter((x) => x.verdict.refuted).length} refuted, ${lost} lost`)

  phase('Write')
  let writeReport = null
  if (got.length) {
    writeReport = await agent(`${COMMON}\n\nYou are the single WRITER for this audit batch. Apply these ${got.length} independent-audit verdicts to the EXISTING records in data/verification/${FILE} (they sit after the comment "main-session batch, 2026-09-23"). For each id:
- take verdict.fixedRecord when present (same id; keep DATE constants where the evidence is unchanged), otherwise apply every listed downgrade and upgrade to the existing record by hand; a refuted record with no mechanical fix is downgraded honestly (drop the unsupported claim or evidence row, keep the documented negative search, level verification_required) - never queued, never deleted, never guessed.
- notes: replace the exact flag sentence ${JSON.stringify(args.flagSentence)} with " " + this audit sentence built from verdict.auditNote: "ביקורת אדברסרית עצמאית בוצעה ב-${accessedAt}: " + auditNote + " לא בוצעה בדיקה במערכת SAP חיה." (keep the rest of the notes; no em dashes).
- add const DATE24 = "${accessedAt}" next to the other DATE constants if missing and set lastVerifiedAt: DATE24 on every record you touched; new evidence rows use accessedAt: DATE24.
Then run: ./node_modules/.bin/tsc --noEmit; ./node_modules/.bin/tsc --noEmit -p tsconfig.test.json; npm test; npm run report:coverage -- --catalog ${catalog}; node --experimental-strip-types --no-warnings --loader ./scripts/alias-loader.mjs scripts/qa/conflict-review.mts. Fix any rule violation HONESTLY (downgrade, drop xref, reword), never by weakening a rule or a test. Do not commit, do not touch any other file. Report: per id what changed (confirmed / downgraded / upgraded), coverage before/after, gate results, deviations.
Verdicts:\n${JSON.stringify(got.map((x) => ({ id: x.item.id, verdict: x.verdict })))}`,
      { label: `write:${catalog}:${bi + 1}`, phase: 'Write' })
  } else {
    log('no verdicts came back - nothing written')
  }
  results.push({ batch: bi + 1, ids: queue.map((q) => q.id), confirmed: got.filter((x) => !x.verdict.refuted).map((x) => x.item.id), refuted: got.filter((x) => x.verdict.refuted).map((x) => x.item.id), lost, writeReport })
}
return { catalog, batches: results.length, results }
