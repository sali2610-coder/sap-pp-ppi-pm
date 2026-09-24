export const meta = {
  name: 'neo-enrich-chain',
  description: 'Run queued Project NEO enrichment batches back to back, one pipeline at a time, recording each outcome',
  phases: [
    { title: 'Chain', detail: 'each batch is a full researcher -> auditor -> writer run of enrich-family.js' },
  ],
}

// args: { accessedAt, functionsCommonHint?, file?, queueMd?, batches: [{ catalog, queue: [{id, he, hint}] }] }
// Batches run strictly one after another, so only one pipeline ever writes an
// overlay at a time. A batch that throws is recorded and the chain moves on:
// its items stay in the queue for a re-run instead of stalling the rest.
const results = []
for (const [i, b] of (args.batches || []).entries()) {
  phase('Chain')
  log(`batch ${i + 1}/${args.batches.length}: ${b.catalog} x${b.queue.length} (${b.queue.map((q) => q.id).join(', ')})`)
  try {
    // functions share one research instruction, carried once in args
    const common = b.catalog === 'functions' && args.functionsCommonHint ? ' ' + args.functionsCommonHint : ''
    const queue = b.queue.map((q) => ({ ...q, hint: (q.hint || '') + common }))
    const r = await workflow({ scriptPath: 'scripts/workflows/enrich-family.js' }, {
      catalog: b.catalog, batch: queue.length, accessedAt: args.accessedAt, queue, file: b.file || args.file, queueMd: b.queueMd || args.queueMd, writerHint: b.writerHint || args.writerHint,
    })
    results.push({ i, catalog: b.catalog, ids: b.queue.map((q) => q.id), written: r?.written ?? 0, queued: r?.queued ?? 0, lost: r?.lost ?? 0 })
    log(`batch ${i + 1} done: written ${r?.written ?? 0}, refused ${r?.queued ?? 0}, lost ${r?.lost ?? 0}`)
  } catch (e) {
    results.push({ i, catalog: b.catalog, ids: b.queue.map((q) => q.id), error: String(e && e.message || e).slice(0, 300) })
    log(`batch ${i + 1} failed: ${String(e && e.message || e).slice(0, 160)}`)
  }
}
return { batches: results.length, written: results.reduce((a, r) => a + (r.written || 0), 0), results }
