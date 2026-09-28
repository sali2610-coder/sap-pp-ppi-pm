export const meta = {
  name: 'neo-bp-family',
  description: 'Research, adversarially audit and write end-to-end S/4HANA process records (best-practice catalog) for Project NEO, every SAP name traced to a repository record or an official source',
  phases: [
    { title: 'Research', detail: 'one researcher per process: repository records first, then official SAP sources, structured BestPracticeLike draft' },
    { title: 'Verify', detail: 'one adversarial auditor per draft: every SAP name, URL, xref and claim' },
    { title: 'Repair', detail: 'a refused draft gets one repair round against the auditor problems, then a fresh audit' },
    { title: 'Write', detail: 'single writer per batch appends survivors to the catalog file, registers it once, runs validator, tsc, tests, coverage' },
  ],
}

// args: { accessedAt, file, exportName, writerHint?, batches: [{ queue: [{slug, he, en, module, brief}] }] }
const REPO = '/Users/salihalif/Desktop/My-Projects/sap-kb3'
const accessedAt = args.accessedAt
const FILE = args.file
const EXPORT = args.exportName

const COMMON = `Repo: ${REPO} (branch design/neo-correction-pass). Catalog: best-practices (process records). Target file: ${FILE}, export ${EXPORT}. Date to stamp: ${accessedAt}.
READ FIRST and ONLY: audit/s4-enrichment/HOUSE-RULES.md (evidence shapes, validation rules, honesty rules, the scripted official channels: scripts/sap-help-search.mjs, scripts/sap-help-body.mjs, scripts/fal-app.mjs), then scratchpad/BP-PROCESS-BRIEF.md for the process-record shape and Hebrew style only (the brief addresses the WRITER: its file-writing steps apply to the single writer agent, never to a researcher, auditor or repairer) and the exemplar record maintenance-notification-process in data/best-practices/pm-processes.ts. lib/evidence/types.ts (BestPracticeLike, BpProcessProfile incl. the "interfaces" lines) only if the brief leaves a field unclear.
REPOSITORY LOOKUP: grep data/ (domains.ts, tx-intel / tx-detail, lib/tx-registry, function-intel.ts, bapi-enrichment.*, fiori/apps.ts, cds-map.ts, exits.ts, enhancements.ts, troubleshooting*.ts, consultant-notes.ts, sapData.*.ts, verification/*.ts) and the books (data/books/bookN.json: {id, meta, chapters:[{n,title:{en,he},sections:[{id,title:{en,he}}]}]}; read-only; cite a section id as repoRef "data/books/bookN.json#<section id>").
HONESTY RULES (blockers): (1) every SAP name written (table, T-code, BAPI/FM, Fiori id, CDS view, BAdI/exit, IDoc, business object, SAP Note or KBA number, scope item) must appear in a repository record cited in evidence via repoRef, or in an official search record cited in evidence with its url copied verbatim; (2) sap_official_verified only with a help.sap.com / api.sap.com / fioriappslibrary URL taken from a search record (url, loio, versionId verbatim) or copied verbatim from an existing data/verification/*.ts entry; (3) process.reference = an official help.sap.com process page from the search results, or null with the reason in notes; never invent an SAP Best Practices scope item id: write one only when a cited official record prints it; (4) every xref must resolve in the project universe (kinds: table:, tx:, fm:, fiori:F####, cds:, obj:, enh:exit:, enh:badi:, enh:technique:, bp:, idoc:msg:, idoc:basic:); (5) no certainty language (תמיד, בוודאות, מובטח, לעולם לא); (6) every ECC statement and every S/4HANA statement is attributed to its side and simplification items are cited by NAME; (7) a field the sources do not document is OMITTED, never filled from memory; (8) Hebrew consultant-grade, "תחזוקה" not "אחזקה", SAP codes Latin uppercase, ZERO em dashes, module is one of PM | PP | PP-PI | Cross.
THE 21 FIELDS the mandate wants per process, mapped to the record: 1 purpose -> process.purpose; 2 trigger -> process.trigger; 3 preconditions -> process.preconditions; 4 business roles -> process.roles; 5 master data -> process.masterData; 6 ordered steps -> steps (>= 6, each with the ids it names); 7 ECC transactions and 8 S/4HANA Fiori apps -> process.transactions (one line per step or group, tx: and fiori: ids); 9 tables and 10 CDS -> process.tables (table:, obj:, cds: ids); 11 APIs/BAPIs/IDocs -> process.interfaces (fm:, idoc: ids; released OData APIs by name when an official record prints them); 12 outputs and 15 documents created (accounting/logistics) -> process.outputs; 13 controls -> process.controls; 14 exceptions and common failures -> process.exceptions (link data/troubleshooting incidents where the repository has them); 16 integration points -> process.integrationPoints; 17 ECC -> S/4HANA changes -> process.eccToS4 (+ status when the practice itself is edition-bound); 18 official scope item -> process.reference (only when printed by a cited source); 19 release/edition -> the evidence release fields and notes; 20 official sources -> evidence (>= 5 entries, at least 2 official when they exist); 21 cross-links -> xrefs (>= 10 ids that resolve). Plus summary, context, antiPatterns (>= 3), checks (>= 3), kpis only when a source states them, migration when documented, notes with the honest gaps.`

const DRAFT = {
  type: 'object', required: ['slug', 'record', 'summary', 'gaps'],
  properties: {
    slug: { type: 'string' },
    record: { type: 'object', description: 'a complete BestPracticeLike object exactly as it should appear in the file (slug, he, en, module, summary, context, steps[], antiPatterns[], checks[], xrefs[], evidence[], status?, process{...}, lastVerifiedAt, reviewer, notes). Evidence entries carry sourceType, sourceTitle, url or repoRef, product, edition, release?, accessedAt, claim (he), verificationLevel.' },
    summary: { type: 'string', description: 'he: what was documented and from which sources' },
    gaps: { type: 'array', items: { type: 'string' }, description: 'fields omitted because no source documents them, and why' },
    conflicts: { type: 'array', items: { type: 'string' } },
  },
}
const VERDICT = {
  type: 'object', required: ['slug', 'refuted', 'problems', 'downgrades'],
  properties: {
    slug: { type: 'string' },
    refuted: { type: 'boolean', description: 'true when the draft must NOT be written as-is (an SAP name with no cited record, a URL not from a search record or overlay, a dangling xref, an invented scope item, marketing text, a step the sources do not support)' },
    problems: { type: 'array', items: { type: 'string' } },
    downgrades: { type: 'array', items: { type: 'string' }, description: 'precise edits that make the draft honest; the writer applies them' },
    fixedRecord: { type: 'object', description: 'the corrected record when the fix is mechanical; omit when refuted' },
  },
}

const results = []
for (const [bi, b] of (args.batches || []).entries()) {
  const queue = b.queue
  log(`batch ${bi + 1}/${args.batches.length}: processes x${queue.length} (${queue.map((q) => q.slug).join(', ')})`)
  phase('Research')
  // An item may carry the draft (and verdict) of an interrupted or earlier run: those stages are skipped.
  const pairs = await pipeline(queue,
    (item) => item.draft ? Promise.resolve(item.draft) : agent(`${COMMON}\n\nREAD-ONLY ROLE: do not create, modify or delete any file in the repository (scratch files only under /tmp); return your result as the structured output only. You are the RESEARCHER for the process record "${item.slug}" (${item.he} / ${item.en}, module ${item.module}). Brief: ${item.brief}
Steps: (1) repository first: collect every record that documents this process (domains, tx registry entries with their he/en, tx-intel, function-intel, bapi enrichment, fiori apps, cds map, troubleshooting incidents, consultant notes, existing best practices and verification overlays, and the relevant book chapters); note the exact repoRef of each; (2) official sources: 4-8 targeted queries on the official lookup tool (the process name, its S/4HANA Fiori apps, its business objects, "What's New", the simplification item names the repository already cites, "scope item" only to confirm what a record prints); (3) build the full BestPracticeLike record following the brief and the 21-field mapping; steps in order (>= 6), every step carrying the ids it names; process.* lines each with the ids they name; evidence >= 5 (repository rows with repoRef; official rows with url/loio/versionId verbatim from the JSON; book rows as sap_press_book / supported_secondary_source with the section id); xrefs >= 10 and only ids that resolve (check with grep in lib/route-manifest.generated.ts, data/fiori/apps.ts, data/exits.ts, data/enhancements.ts, data/verification/objects.ts OBJECT_REGISTRY, data/best-practices/*.ts slugs); lastVerifiedAt "${accessedAt}", reviewer "Project NEO research pipeline (researcher + adversarial auditor), ${accessedAt}"; (4) gaps: every field you omitted and why. Return the draft.`,
      { label: `research:${item.slug}`, phase: 'Research', schema: DRAFT, effort: 'high' }),
    (draft, item) => draft ? (item.verdict ? Promise.resolve({ draft, verdict: item.verdict }) : agent(`${COMMON}\n\nREAD-ONLY ROLE: do not create, modify or delete any file in the repository (scratch files only under /tmp); return your result as the structured output only. You are the ADVERSARIAL AUDITOR for the process record "${item.slug}". Try to REFUTE this draft. Default to refuted=true if uncertain.
Checks: every SAP name in every field appears in a cited repository record (open the repoRef and confirm) or in a cited official search record (re-run the lookup tool and confirm the title/snippet prints it); every url is on an allowlisted host and resolves (curl -sI), and its loio/versionId matches a search record; every claim is bounded by the title/snippet or the record it cites (no body-text claims, no marketing); no scope item, SAP Note or KBA number without a cited record printing it; every xref resolves (grep the universe files); steps are supported by the sources and in a defensible order; the ECC and S/4HANA sides are attributed; no certainty language; Hebrew professional, no em dashes, "תחזוקה"; module is PM | PP | PP-PI | Cross; process.reference is official or null; a field with no source is omitted rather than filled. Produce downgrades (mechanical fixes) or refute.
Draft:\n${JSON.stringify(draft)}`,
      { label: `verify:${item.slug}`, phase: 'Verify', schema: VERDICT, effort: 'high' }).then((verdict) => ({ draft, verdict }))) : null,
    // a refused draft gets a repair and a fresh audit; args.repairRounds (default 1) allows further rounds while the audit still refuses.
    async (r0, item) => {
      const once = (r) => agent(`${COMMON}\n\nREAD-ONLY ROLE: do not create, modify or delete any file in the repository (scratch files only under /tmp); return your result as the structured output only. You are the REPAIRER for the process record "${item.slug}". An adversarial auditor REFUSED the draft below. Produce a corrected draft that resolves EVERY problem listed: cite an evidence row (repoRef opened and confirmed, or an official search record with url/loio/versionId verbatim) for every SAP name you keep, and DROP any name, field, scope item, role or claim you cannot source; omit unsupported fields (kpis, roles, reference) instead of filling them; process.reference is an official help.sap.com process page from a search record, or null. Do not add new unsourced material. Keep what the auditor confirmed.\nAuditor problems:\n${JSON.stringify(r.verdict.problems)}\nAuditor downgrades:\n${JSON.stringify(r.verdict.downgrades || [])}\nRefused draft:\n${JSON.stringify(r.draft)}`,
        { label: `repair:${item.slug}`, phase: 'Repair', schema: DRAFT, effort: 'high' })
        .then((fixed) => fixed ? agent(`${COMMON}\n\nREAD-ONLY ROLE: do not create, modify or delete any file in the repository (scratch files only under /tmp); return your result as the structured output only. You are the ADVERSARIAL AUDITOR for the REPAIRED process record "${item.slug}". The first draft was refused for the problems listed; check that each is resolved and that the repair introduced nothing unsourced. Default to refuted=true if uncertain. Apply the same checks as a first audit (every SAP name cited, URLs from search records and resolving, xrefs resolve, no invented scope item or role, claims bounded, Hebrew style).\nFirst-round problems:\n${JSON.stringify(r.verdict.problems)}\nRepaired draft:\n${JSON.stringify(fixed)}`,
          { label: `reverify:${item.slug}`, phase: 'Repair', schema: VERDICT, effort: 'high' }).then((v2) => ({ draft: fixed, verdict: v2, firstVerdict: r.verdict })) : r)
      let r = r0
      for (let round = 0; round < (args.repairRounds || 1); round++) {
        if (!r || !r.verdict || !r.verdict.refuted) return r
        r = await once(r)
      }
      return r
    },
  )
  const drafts = pairs.map((r, i) => ({ item: queue[i], draft: r && r.draft, verdict: r && r.verdict })).filter((x) => x.verdict)
  const survivors = drafts.filter((x) => !x.verdict.refuted)
  const refused = drafts.filter((x) => x.verdict.refuted)
  const lost = queue.length - drafts.length
  log(`batch ${bi + 1}: ${survivors.length} survive, ${refused.length} refuted, ${lost} lost`)

  phase('Write')
  let writeReport = null
  if (survivors.length) {
    writeReport = await agent(`${COMMON}\n\nYou are the single WRITER for this batch. The researcher and the adversarial auditor already verified every value: do NOT repeat their lookups (no new sap-help-search / sap-help-body / fal-app runs, no Simplification List reading) unless a gate fails on a specific value or the verdict marks that value as unverified. Write what the audit approved, run the gates, report. A writer that re-researches costs the chain its throughput. Append these ${survivors.length} audited process records to ${FILE} (export ${EXPORT}): take verdict.fixedRecord when present, otherwise apply the listed downgrades to the researcher's draft; if a draft is not recoverable, queue it instead of guessing.
If ${FILE} does not exist yet, create it in the house style (header comment, "import type { BestPracticeLike } from \\"@/lib/evidence/types\\";" as the ONLY import, const DATE = "${accessedAt}", export const ${EXPORT}: BestPracticeLike[] = [...]), spread it into BEST_PRACTICES in data/best-practices/index.ts, and register it in test/evidence-schema.test.ts and test/evidence-xref.test.ts exactly the way CROSS_PROCESS_PRACTICES_2 (data/best-practices/cross-processes-2.ts) is registered. Do not touch any other file. Other pipelines edit data/verification/*.ts concurrently: if tsc or a test fails inside a file you do not own, wait 60 seconds and re-run (up to 3 times) instead of editing it.
${args.writerHint ? args.writerHint + '\n' : ''}Then run: node --experimental-strip-types --no-warnings scratchpad/validate-bp-file.mjs ${FILE} ${EXPORT}; ./node_modules/.bin/tsc --noEmit; ./node_modules/.bin/tsc --noEmit -p tsconfig.test.json; npm test; npm run report:coverage -- --catalog best-practices. Fix any rule violation HONESTLY (drop the unsupported name, omit the field, downgrade the level), never by weakening a rule or a test. Append refuted slugs with their problems to audit/s4-enrichment/research-queue-best-practices.md (create if missing; sections: ## refuted, ## conflicts). Do not commit. Report: records written, records queued, validator and gate results, coverage before/after, deviations.
Audited records:\n${JSON.stringify(survivors.map((x) => ({ slug: x.item.slug, draft: x.draft.record, verdict: x.verdict })))}\n\nRefuted (queue them):\n${JSON.stringify(refused.map((x) => ({ slug: x.item.slug, problems: x.verdict.problems })))}`,
      { label: `write:best-practices:${bi + 1}`, phase: 'Write' })
  } else {
    log('nothing survived verification - nothing written')
  }
  results.push({ batch: bi + 1, written: survivors.map((x) => x.item.slug), refused: refused.map((x) => ({ slug: x.item.slug, problems: x.verdict.problems })), lost, writeReport })
}
return { batches: results.length, written: results.reduce((a, r) => a + r.written.length, 0), results }
