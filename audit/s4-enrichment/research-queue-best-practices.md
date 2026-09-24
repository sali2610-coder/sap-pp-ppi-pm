# Research queue · best-practices catalog (process records, S/4HANA enrichment)

Kept by the single writer for `data/best-practices/catalog-2026-09.ts` (export
`CATALOG_PROCESS_PRACTICES`). One entry per process record refuted at the
adversarial-verification gate, and one entry per official-source conflict that a
written record carries.

Batch 1 written 2026-09-24 (access date stamped 2026-09-24): 3 drafts audited, 2 written
(`calibration-process`, `refurbishment-process`) from the repaired drafts with every
listed downgrade applied (each replacement matched exactly once in the draft text),
1 refuted (`breakdown-maintenance-process`). The file was created in this batch and
registered in `data/best-practices/index.ts`, `test/evidence-schema.test.ts` and
`test/evidence-xref.test.ts` the way `CROSS_PROCESS_PRACTICES_2` is (import + spread
into BPS; like `cross-processes-2.ts` it is not listed in DATA_FILES). Before writing,
the writer re-ran the help.sap.com searches for every official URL of both records (all
found verbatim in a 2025.001 or 2025.000 search record) and re-read the page bodies
quoted by the downgrades (Creation of a Calibration Order, Test Equipment Management,
Calibration Order, Record Inspection Results). Writer deviations beyond the listed
downgrades: the calibration context and notes got the same origin-14 / standard type 14
wording as the fields the verdict named; calibration step 4 now also xrefs `tx:QE51N`
(named by the downgrade text); refurbishment step 9, eccToS4[0] and the record xrefs
now carry `fm:BAPI_ALM_ORDER_MAINTAIN` (named in those lines, printed by the cited
'Enterprise Asset Management Part 4' page); the refurbishment KO88 claim says 'מציין
Order settlement ואינו נוקב בטרנזקציה' instead of 'מציין רק' (house rule: never "only");
the refurbishment MB11 row and notes say 'מקוצר' (condensed) instead of 'מועתק' (copied),
because the claim is a condensed subset of the MB11_SIMPL entry; the refurbishment notes
got the verdict's MB11-conflict wording as well. Coverage (`report:coverage --catalog
best-practices`): total 22 → 24, L2 22 → 24, verified 22 → 23, conflict 0 → 1 (the
calibration record carries two `conflicting_sources` rows). Gates: the validator run on
the full registered universe prints 0 problems; `scratchpad/validate-bp-file.mjs` prints
10 `dangling-xref` hits, all bp slugs registered in `pm-processes-2.ts` /
`cross-processes-2.ts` that its reduced universe (pm.ts, pp-pi.ts, pm-processes.ts)
does not load (the same script prints 53 such hits for `cross-processes-2.ts`); both
`tsc` gates clean; `npm test` 212/212.

## refuted

- `bp:breakdown-maintenance-process` (batch 1, 2026-09-24): refuted at the gate, not
  written. (1) BLOCKER, wrong app name for F1511: step 1, the roles line, the Fiori
  transactions line and evidence row 11 call F1511 'Create Maintenance Request'. The
  overlay `data/verification/fiori.ts#fiori:F1511` settles from two help.sap.com 2025.001
  records and the Fiori library title that F1511 is 'Request Maintenance'; 'Create
  Maintenance Request' is F1511A (`data/fiori/apps.ts#F1511A`). The same overlay marks the
  `apps.ts#F1511` repository claim (role SAP_BR_MAINTENANCE_TECHNICIAN, catalog, OData) as
  verification_required, while the draft's row 11 labels that repoRef repository_verified
  and repeats the role. (2) The technical role names SAP_BR_MAINTENANCE_TECHNICIAN and
  SAP_BR_MAINTENANCE_PLANNER are stated as settled facts, but the overlays for
  fiori:F2023, fiori:F4604, fiori:F5104A and fiori:F1511 say they come from the curated
  record only and must be checked against the Fiori library; notes and gaps are silent.
  (3) CO88 is described as the collective run ('KO88 (בודד) או CO88 (מרוכז)', 'KO88
  התחשבנות בודדת, CO88 מרוכזת') with no cited row saying so: `data/tcode-catalog.ts#CO88`
  (repeated in `data/verification/transactions-auto.ts` tx:CO88) titles it 'Actual
  Settlement: Production/Process Orders', the cited K_ORDER_SETTLEMENT row lists KO88 and
  KO8G, not CO88, and settlement-error only says 'KO88/CO88 מסיימים בשגיאה'. (4) Two cited
  repository records contradict each other on TECO and reservations (step 6 and the
  pm-corrective row: TECO closes open reservations; exceptions line 3 and the teco-blocked
  row: open reservations or movements block TECO); the record states both, one without
  attribution, and does not disclose the conflict. (5) Evidence row 2 (repoRef
  `data/process-guides.ts#pm-corrective`) ends with a sentence about other records ('Confirm
  Jobs' corrected in fiori:F2730 / fiori:F5104A) that the repoRef does not bound. (6) Minor:
  'IW28 רשימת הודעות' has no cited row (the description sits in
  `data/transactions.ts#IW28`, which no evidence row cites). (7) Minor: notes carry a
  pipeline change log of a draft that was never published instead of gap statements.
  Verified by the auditor and reusable on re-draft: process.reference null with the reason
  in notes; BH1 no longer claimed as the process's scope item (only the F5104A scope items
  listed); YA01 / YA02 attributed to the Configuring Phase Control Codes row with the caveat
  that the page does not call YA01 the breakdown order type; F5241 no longer tied to
  SAP_BR_MAINTENANCE_PLANNER; one evidence row per troubleshooting record and per Fiori
  app, each repository claim matching its record; the 8 official rows byte-identical to
  overlay entries in fiori:F4604, fiori:F5104A (x3), fiori:F2730, fm:BAPI_ALM_ORDER_MAINTAIN,
  fm:BAPI_ALM_CONF_CREATE and fm:STATUS_PROFILE_READ; bp:maintenance-order-process and
  bp:confirmation-process exist; 9 steps, 45 xrefs, 36 evidence rows; no em or en dashes
  and no certainty words in the body. Re-draft with F1511 = Request Maintenance and
  F1511A = Create Maintenance Request, the role names marked curated-only (or confirmed
  through `scripts/fal-app.mjs`), CO88 described only as its cited rows describe it, the
  TECO / reservation conflict disclosed, the row-2 sentence moved out of that claim, IW28
  cited through `data/transactions.ts#IW28`, and gap statements in notes.

## conflicts

- `bp:calibration-process`, Manage Inspection Lots: the app page 'Manage Inspection Lots |
  Quality Management' (2025.001, loio ecfae2574096f432e10000000a441470) prints 'App ID:
  F2343'; the What's New page 'Harmonized Document Management' (2025.000, loio
  12330e3d87e74b849f14f9fb943d51bc) prints 'Manage Inspection Lots (App ID: F1243)'.
  Written as `conflicting_sources`. What would settle it: `node scripts/fal-app.mjs F2343`
  and `F1243` at S32OP. A further official record seen in a search snippet, 'Harmonized
  Document Management | Quality Management' (2025.001, loio
  338b1d7a7bb541dab49827afc7697528), lists 'F1685A: Record Inspection Results F2343: Manage
  Inspection Lots F2345: Manage Usage Decisions' and can be added as a supporting row on the
  next audit. None of F2343, F1243, F2345, F1685A or F168A is in `data/fiori/apps.ts`, so
  the record carries no fiori: xref.
- `bp:calibration-process`, Record Inspection Results: the app page (2025.001, loio
  d010ce7fa4fc40b48bf4eeccc2002c3a) prints 'App ID: F1685A'; the same What's New page
  (2025.000) prints 'Record Inspection Results (App ID: F168A)'. Written as
  `conflicting_sources`; settle with `node scripts/fal-app.mjs F1685A` and `F168A`, and the
  HDM Quality Management page above. Related repository conflict (already in the fiori
  overlay): `data/library/qm-textbook/ch18.ts:1363` attributes F2731 to Manage Usage
  Decisions, while the official app page prints F2345 (row at verification_required inside
  `fiori:F2731`).
- `bp:refurbishment-process`, MB11 availability: 'Additional Movement Types | Maintenance
  Management' (2025.001, loio d9f8c353b677b44ce10000000a174cb4) names MB11 (goods issue) and
  IW8W (goods receipt) as the standard refurbishment transactions and allows MIGO for
  261/101 only, not for 313/315; Simplification List 2023 FPS1-3 item 27.6 'S4TWL -
  AVAILABILITY OF TRANSACTIONS IN MM-IM' (row MB11_SIMPL of `tx:MB11`) lists MB11 among the
  MB transactions replaced by MIGO or BAPI_GOODSMVT_CREATE, whose menu call raises an error.
  The availability of MB11 itself is disputed between the sources, and the practical impact
  centres on the 313/315 path, where the page points to the refurbishment transactions and
  MIGO is not available. Both rows stay `sap_official_verified`, the same treatment as the
  overlay `tx:MB11` (which records this as a lifecycle conflict). Reusable on re-audit:
  `audit/master-completion/simpl-tcode-index.json` lists MB11 under the same item in the 2025
  FPS01 list (item 15.3.9, `scratchpad/official/SIMPL_OP2025.pdf.txt` lines 84132-84159,
  printed page 1486, same wording plus 'The transaction codes will be deprecated in the near
  future'), so a 2025 FPS01 row would put both sides on the same release. What would settle
  the practical question: a check in the target system of MB11 and IW8W with movement types
  313/315 on a refurbishment order.
