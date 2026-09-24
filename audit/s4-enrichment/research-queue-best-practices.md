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

Batch 2 written 2026-09-24 (access date stamped 2026-09-24): 3 drafts audited, 1 written
(`quality-in-procurement-process`, module Cross) from the researcher's draft with the
verdict's two text downgrades applied (each replacement matched exactly once): the
'QM - Quality info record | Data Migration' claim now carries the page's prerequisites
('Product, mandatory', 'Supplier, mandatory') that masterData[2] and migration[0] rely on,
and roles[1] attributes each user to its tx-intel record (QA Inspector to QA32/QE51N/QA11,
מהנדס איכות to QA32/QA11, טכנאי מעבדה and בודק איכות to QE51N). 2 refuted
(`procure-to-pay-process`, `physical-inventory-process`). Gate-policy decision (verdict
downgrade 3): the four official URLs no overlay holds ('Quality Management in Procurement',
What's New, version 100, loio 51daf79fe0384e6385d141616fc3585c; 'Goods Receipt When Quality
Management (QM) is Active', loio d363bd534f22b44ce10000000a174cb4; 'Subcriterion', loio
ce77b6535fe6b74ce10000000a174cb4; 'QM - Quality info record', Data Migration, loio
8427c17adbeb4a84a1a0784aa63c586c; the last three 2025.001) stay `sap_official_verified`
under HOUSE-RULES §3 and the task's honesty rule 2 (URL copied verbatim from a search
record), the treatment the calibration and refurbishment records already have. Before
writing, the writer re-ran `scripts/sap-help-search.mjs` for each (url, loio and versionId
came back verbatim) and re-read all four bodies through `scripts/sap-help-body.mjs` (every
quoted phrase present, including 'Product , mandatory Supplier , mandatory', S_QINF,
S_QINF_LTEXT, F2256A, QI02, QI03 and the Complaints/Rejection Level wording).
`scratchpad/check-bp-official.mjs`, which enforces the older overlay-only rule of
BP-PROCESS-BRIEF §2 and is not one of the required gates, moves from 121 urls / 12 not in
an overlay to 127 / 17 (the 1FM URL counts twice: evidence row and process.reference);
adding overlay entries was out of scope, since the writer may not touch
`data/verification/*.ts`. The 'Editing the Inspection Setup' row is byte-identical to
`data/verification/tables.ts` QMAT_INSPECTION_SETUP (checked field by field; accessedAt
DATE4 = 2026-09-15, kept as `DATE_TB_15`). Writer deviations beyond the listed downgrades:
step 9 no longer calls QI06 'רשימה' (the one record that names it, the incident, gives it no
title); tables[1] and notes now say QAVE and QAMR are not in the dictionary either, and
tables[3] and notes say the same of EKKO/EKPO (all four checked unresolvable); the QA32
evidence claim now carries the record's techExample (QMAT) and prodTips (open lots block
stock; without a usage decision the stock stays in QI), which tables[0], antiPatterns[3],
exceptions[2] and controls[2] rely on; `tx:QI02` (resolvable, named in steps 2 and 9,
transactions[0], exceptions[0] and migration[0]) is now an xref there and at record level,
and migration[0] also xrefs `tx:QI03`; the file header reads 'kpis in every record below'.
Every uppercase SAP token of the new record appears in one of its evidence rows. The record
has no `conflicting_sources` row, so nothing was added under conflicts. Coverage
(`report:coverage --catalog best-practices`): total 24 → 25, L2 24 → 25, verified 23 → 24,
conflict 1 → 1. Gates: the validator on the full registered universe prints 0 problems (25
practices); `scratchpad/validate-bp-file.mjs` prints the same 10 bp-slug `dangling-xref`
hits as in batch 1 (calibration-process and refurbishment-process, reduced universe) and
none for the new record; both `tsc` gates clean; `npm test` 212/212.

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
- `bp:procure-to-pay-process` (batch 2, 2026-09-24): refuted at the gate, not written; the
  draft is not in the repository. (1) BLOCKER, ECC/S/4HANA attribution (rule 6) and a gap in
  field 17: step 6 ('הקבלה כותבת מסמך חומר (MKPF/MSEG)'), outputs[2] ('מסמך חומר של הקבלה
  (MKPF/MSEG)') and tables[1] (MKPF and MSEG as 'מסמך החומר של הקבלה', adding that the P2P
  map 'מונה ... גם את MATDOC') name no side, and for S/4HANA they contradict evidence the
  repository already holds: `data/verification/tables.ts` MKPF_SIMPL2025 (line 533, used by
  table:MKPF) cites 'S4TWL - Data Model in Inventory Management' (2025 FPS01 Simplification
  List, item 15.3.1): 'Material document data will be stored in MATDOC only and not anymore
  in MKPF and MSEG'; MSEG_ARCHIVING (line 83) and the table:MSEG row add that compatibility
  with the old tables comes through CDS compatibility views. The only source of the MKPF/MSEG
  wording, the tx-intel MIGO record ('כותבת MKPF/MSEG'), carries no edition. eccToS4 leaves
  out this data-model change, the largest S/4HANA change on the goods-receipt step, and
  names only the MB11 transaction-availability item. (2) Minor, negative search overstated
  in notes: the notes say the 'Procurement of Direct Materials' search returned What's New
  records for the item 'במהדורות 1709 עד 2023' and 'לא עמוד תהליך למהדורת 2025'; a re-run
  (21 hits) shows the item's own records at 1709, 1809, '100', 1909.000 (J45) and 2020.000
  (J45), the 2023.000 hits are other topics ('Enterprise Search Function for Customer Fields
  in Supplier Invoices', 'Purchase Requisition Events'), and a 2025.001 page titled
  'Procurement' (loio 56be0913bd224e218bbd83308039fafb) appears in the results without
  mention. (3) Minor, inherited wording: the MB03 official row keeps 'בדפים שצוטטו ברשומה זו'
  from tx:MB03, but this record cites one MB03 page, so 'this record' points at the wrong
  record. (4) Minor: tables[3] names 'BSIK פריטי ספק פתוחים' without a side, while the cited
  FBL1N record says that in S/4HANA the line items come from ACDOCA through compatibility
  views. Verified by the auditor and reusable on re-draft: all 16 first-round problems are
  closed (ME51N row sourceTitle 'Process Purchase Requisition (MM-PUR)' and accessedAt
  2026-09-24 as in transactions-b.ts:3089; MARA, BUT000, CVI, BAPI_REQUISITION_GETDETAIL,
  the ME21/ME25 prose, F0842A, F1077, 'Stock Transport Order' and 'זמינות במלואן' removed;
  the 'היחידה' claim about MB03 removed; the F0843 identity carried by the copied
  F0843_PGR_TOPIC row; both bp: xrefs added; the P2P incidents linked, one repoRef each);
  every official row except the new one keeps the url, sourceTitle, release and accessedAt
  of its `data/verification` source; the new 'Procurement in SAP S/4HANA' row matches a live
  search record (loio 287eb65334e6b54ce10000000a174cb4, versionId 2025.001) and its body
  (deliverable 40374862, build 1807) contains every quote; every uppercase SAP token appears
  in an evidence claim; book3 sections 5.4, 7.3.1 and 12.2 exist; the claims of the seven
  troubleshooting rows match their entries; validator 0 problems, `tsc` clean, no em dash.
  Re-draft with MKPF/MSEG attributed to ECC and an S/4HANA line that cites 'S4TWL - Data
  Model in Inventory Management' by name (MKPF_SIMPL2025 copied verbatim, MSEG_ARCHIVING for
  the compatibility views), that change added to eccToS4, the search notes corrected to the
  releases listed above plus the 2025.001 'Procurement' page, the MB03 wording re-pointed to
  its own source, and BSIK attributed to ECC with the FBL1N record's ACDOCA note for S/4HANA.
- `bp:physical-inventory-process` (batch 2, 2026-09-24): refuted at the gate, not written;
  the draft is not in the repository. (1) BLOCKER, unsourced claim introduced by the repair:
  step 6 ('קריאה מהן מנותבת לתצוגת CDS, וכתיבה אליהן אינה משפיעה'), antiPatterns[4] ('פעולת
  כתיבה כזו אינה משפיעה'), checks[3] ('דרך הניתוב לתצוגת CDS ... וקוד שכותב לטבלאות אלה
  הוסר') and eccToS4[2] ('קריאה מהן מנותבת לתצוגת CDS') say that reads from MKPF/MSEG are
  redirected to a CDS view and that writes to them have no effect, but no evidence row of the
  record prints this. The row copied from the 2025 FPS01 Simplification List (MKPF_SIMPL2025,
  'S4TWL - Data Model in Inventory Management', item 15.3.1) prints only 'do still exist in
  S/4HANA as DDIC definition as well as database object'; the MSEG_ARCHIVING row prints only
  the MATDOC replacement sentence; the table:MSEG repository row speaks only of NSDM_V_MSEG
  and SUM. The 'redirected ... to the assigned CDS view' and 'such write operations are
  without any effect' wording lives only in a second row of `data/verification/tables.ts`
  table:MKPF (2023 FPS03 Simplification List, item 27.5 'S4TWL - Data Model in Inventory
  Management', SIMPL_OP2023.pdf), which the draft does not cite; eccToS4[2] also pins the
  statement to '2025 FPS01, פריט 15.3.1', whose copied text does not contain it. (2) Wrong
  count in the summary: '23 רשומות evidence (14 רשמיות, 7 מהמאגר, 2 מספרים)', while the
  record carries 12 sap_official_verified (6 sap_help + 6 fiori_library), 9
  repository_verified and 2 supported_secondary_source. Verified by the auditor and reusable
  on re-draft: all 12 first-round problems are resolved; 7 steps, as the summary says;
  F0379A labels only 'Manage Physical Inventory Documents'; F3197, F4550 and F5430 each have
  their own fal-app row, re-fetched at S32OP with names, roles, OData services and GUI
  leading/related transactions matching the claims word for word; 'Schedule Physical
  Inventory Document Creation' tied only to `data/books/book3.json#7.4.2`, whose section id
  and title exist; MI20 and MI31 backed by `data/tcode-catalog.ts` lines 986/988 and by FAL
  rows copied word for word from `data/verification/transactions-auto.ts` (tx:MI20,
  tx:MI31); NSDM_V_MKPF removed; cds:I_MaterialDocumentItem backed by `data/cds-map.ts` line
  46 plus the WN2021 row, word for word the entry at `data/verification/cds.ts` line 185;
  MB52 and MMBE split into two rows, each matching `data/tx-intel.ts`; both 'Physical
  Inventory Process' URLs (S/4HANA 2025.001 and SAP_ERP 6.18.latest, loio
  2761bd534f22b44ce10000000a174cb4) come back from `scripts/sap-help-search.mjs` and their
  `scripts/sap-help-body.mjs` text contains every quoted phrase, as does the F0379A body;
  validator (full best-practices universe) 0 problems, 16 xrefs resolved, no em dash, no
  certainty words, no 'אחזקה'. Re-draft with the redirect / no-effect sentence either
  dropped or cited through the 2023 FPS03 item 27.5 row copied verbatim with its own release
  (eccToS4[2] re-pinned to that release), and the summary's evidence count corrected to 12
  official, 9 repository and 2 secondary, or removed.

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
