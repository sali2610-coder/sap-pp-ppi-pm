# Research queue · objects catalog (S/4HANA enrichment)

Kept by the single writer for `data/verification/objects.ts` (export `OBJECT_VERIFICATION`;
the `OBJECT_REGISTRY` groupings live in the same file). One line per id that was refuted or
deferred at the adversarial-verification gate, and one entry per repository-vs-official
discrepancy that a written record surfaced in a file this pipeline does not own.

Batch 1 written 2026-09-24 (access date stamped 2026-09-24, const `DATE24`): 4 drafts audited,
4 written, 0 refuted. `obj:material-document`, `obj:maintenance-notification`,
`obj:maintenance-order` and `obj:process-order` superseded their seed records; each was written
from its auditor's `fixedRecord`, and a round-trip check (module import, deep-equal against the
audited JSON) confirmed every field. Writer changes, nothing else: `status.source` is the
hoisted evidence const (house style) instead of the pointer string or copy in the verdict (for
`obj:process-order` the verdict's copy of the F4587 row carried the claim 'ראו evidence[2]'; the
record now points at the row itself); dates use the file's constants (`DATE`, `SEED_DATE`,
`DATE24`); the `reviewer: "sali2610@gmail.com"` field of the process-order draft was dropped
(no overlay record in `data/verification/**` carries one, and no human sign-off happened).
Registry members were not changed. No new SAP lookups were run by the writer. The catalog left
the repository-only foundation guard in `test/evidence-schema.test.ts` in the same change: it
was the last catalog under that guard, so the guard was removed and `OBJECT_VERIFICATION` joined
the graduated repoRef test. Coverage (`npm run report:coverage -- --catalog objects`): before 16
records, L2 16, verified 16, S/4-applicable 0; after 16 records, L2 12 / L5 4, verified 16,
S/4-applicable 4 (the four records above, all `sap_official_verified`). Gates: `tsc --noEmit`,
`tsc --noEmit -p tsconfig.test.json` and `npm test` (211/211) green.

## refuted

- (none in this batch: all 4 audited drafts survived verification and were written from their auditors' `fixedRecord`.)

## conflicts

- `obj:process-order`: `data/bapi-enrichment.pppi.ts` (the BAPI_PROCORD_* rows) still carries `bor: "BUS2116"` for the process order. The official Reference Objects page (Production Planning and Control, 2025.001, loio `62d3b65334e6b54ce10000000a174cb4`) lists BUS0001 Process Order, BUS2016 Process Order Confirmation and BUS2116 Production Order Confirmation. The fix belongs to that file's owner. In this file, the registry members `fiori:F3577` and `fiori:F3364` were left unchanged: the Fiori Apps Library returned an empty result for both at S32OP / S27OP / S24OP / S30OP (a documented negative), and at S31OP F3577 is 'Yard Logistics - Yard Task Execution'. The library prints F4587 (Manage Process Orders) and F5323 (Manage Process Order Operations), both in the catalog and in the record's xrefs. Whether F3577 becomes an alias of F4587 is a product decision (see `fiori:F3577`).
- `obj:maintenance-order`: registry members `fiori:F2731` and `fiori:F2730` returned an empty library result at S24OP, S27OP, S30OP, S31OP and S32OP (documented negative); the record xrefs F5241 instead and the members were left unchanged. BUS2007 appears in the `bor` field of the three BAPI_ALM_ORDER_* rows in `data/bapi-enrichment.pm.ts` and is still unverified against an official record (SWO1 / BAPI Explorer).
- `obj:maintenance-notification`: `data/fiori/apps.ts` titles F1511 'Create Maintenance Request'; the library (S32OP) prints 'Request Maintenance' for F1511 and names F1511A 'Create Maintenance Request' as its successor. The fix belongs to the Fiori catalog. (The F1511 OData name drift is already queued in `research-queue-cds.md`.) **Resolved 2026-09-24** (`812d5b66`, `258c628f`): apps.ts, the Fiori center, lifecycle and the best practice now name F1511 'Request Maintenance' and F1511A 'Create Maintenance Request'.
- `obj:material-document`: `data/s4-impact.ts#MATDOC` cites SAP Note 1976487; the official item 'S4TWL - DATA MODEL IN INVENTORY MANAGEMENT (MM-IM)' (Simplification List 2025 FPS01, item 15.3.1) prints 2206980 as its related note. 1976487 stays a repository reference and has not been checked against me.sap.com. The registry member and xref `cds:I_MaterialDocumentItem` has a released successor, I_MaterialDocumentItem_2, on the official VDM page (loio `14305f6e8cb842bbb1647ffd5a30ca31`), but that successor is not in the id universe (already queued in `research-queue-cds.md`). No official record located for the material document's BOR id.
