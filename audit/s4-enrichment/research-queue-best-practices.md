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

Batch 3 written 2026-09-24 (access date stamped 2026-09-24): 3 drafts audited, 3 written
(`order-to-cash-process`, `period-end-closing-process`, `logistics-to-finance-postings-process`,
all module Cross), none refuted, so nothing was added under refuted. No verdict carried a
fixedRecord: the writer applied the listed downgrades to the researcher drafts (the drafts'
on-disk copies were checked field by field against the audited drafts; each replacement
matched exactly once, modulo the RLM marks the drafts carry before Latin tokens). Rows
added by the downgrades: order-to-cash +1 (`data/s4-objects.ts#MKPF`); period-end +11 (the
2025 FPS01 item 6.1.4 'S4TWL - Data Model Changes in FIN'; the Fiori library rows of KKAO,
KKAS, KKS1, KKS2, KO88, CO88 and KOB1 copied from `data/verification/transactions-auto.ts`
without the generated record's `context` flag, each with '(אומת ברשומת tx:X)';
`data/troubleshooting-ext2.ts#order-teco-wip`; `data/tcode-catalog.ts#KKAX`;
`data/domain-detail.ts#pppi-variance`); logistics +2 (`data/sapData.pm.ts#PM:MSEG`,
`data/troubleshooting-ext2.ts#acdoca-coep-mismatch`). Before writing, the writer re-ran the
help.sap.com searches for all 32 help.sap.com URLs of the three records (all found verbatim:
30 by title, the ERP 'The Document Concept' 6.17.latest record through the draft's own SAP_ERP
query, 'Universal Journal: FAQ' under the FI-GL deliverable through the 'Universal Journal'
query), re-read the bodies the downgrades rely on (Universal Journal: FAQ; Production Cost
Posting in Financial Accounting; Period-End Closing - Maintenance Orders, version 100; the
Product Cost by Order scenario page; Transaction Codes in Cost Object Controlling; Settlement in
Product Cost by Order or Period), re-ran `scripts/fal-app.mjs` at S32OP for F3893, F0869A,
F0867A, F0798, F1345, F0711, F2005, F4568, F4857, F4597, F3683, F1077 and F3664, and re-read
every cited repository record against its claim. Writer deviations beyond the listed
downgrades: (1) `data/tcode-catalog.ts` changed after the research (commit 48e7d9ac,
2026-09-24 20:57, titles corrected from the Fiori library): KKAS now reads 'Calculate Work in
Process - Product Cost Collectors' and KKAX 'Calculate Work In Process - Order - Single', so the
new catalog row carries the current titles and the period-end notes keep the old catalog
conflict as history (Old → New) instead of an open conflict; (2) period-end roles[1]: the
verdict's pairing of each catalog with a role is not printed by the library (the F3683 record
lists roles and catalogs as separate lists), so both catalogs are named with their titles, the
line says the library assigns no catalog to a role, and the F3683 claim now says so and carries
'EAM - Work Order Management'; (3) the new 6.1.4 row places the quoted sentences on printed
page 160 of the extracted text (the item starts on p. 159; 'Page | 159' is that page's footer),
not on p. 159; (4) the whole pppi-variance part of the period-end domains row (master data and
migration, both in `data/domain-detail.ts#pppi-variance`) moved to the new domain-detail row,
which also carries the eccS4 text 'QA: סטיות + CO-PA + ACDOCA' that migration[3] relies on;
(5) period-end antiPatterns[2] no longer says 'אחרי התמחור' (no source): it follows the scenario
page (routing changed, then WIP calculated; scrap cannot be calculated); (6) the period-end
settlement claim now carries 'default rule PP2 (Production Material Periodic Settlement)' (body
re-read), which masterData[0] names; (7) period-end outputs[4] links tx:CO88 instead of tx:KOB3,
per the verdict's instruction not to present KOB3 as the settlement-line report; (8) period-end
trigger[1] lost its first attribution prefix, which the verdict's replacement repeated; (9)
logistics: the 15.3.1 claim now carries the hybrid-table sentence ('will still be used to store
the material master data attributes', 'the on-the-fly aggregation of actual stock quantities')
that tables[1] relies on; step 10 is split into two sentences; eccToS4[5] keeps 'הדיווח עובר
ל-ACDOCA' attributed to the repository records, since the FAQ does not say it; checks[4] uses one
attribution clause; the notes list the FAQ body among the bodies read; (10) order-to-cash: notes
'הרשומות מתאימות' (plural after the verdict's list); the `data/processes.ts#o2c` claim now quotes
the map's test verbatim ('חשבונית → רישום FI (ACDOCA)' for 'חשבונית ← רישום FI'); the verdict's
'gaps text' and 'conflicts entry' are not fields of the draft record, so their corrected wording
went into the conflicts entries below; (11) the file header's 'kpis in every record below' now
names the exception (order-to-cash-process, kpis from the official Order-to-Cash Performance
page), and two date constants were added for copied rows (`DATE_TB_02`, tables.ts DATE2, MBEW
migration object; `DATE_FM_14`, functions.ts DATE14, API_MATERIAL_DOCUMENT). Coverage
(`report:coverage --catalog best-practices`): total 25 → 28, L2 25 → 28, verified 24 → 27,
conflict 1 → 1. Gates: the validator on the full registered universe prints 0 problems (28
practices); `scratchpad/validate-bp-file.mjs` prints 53 `dangling-xref` hits, all bp slugs
registered in `cross-processes.ts`, `cross-processes-2.ts`, `pm-processes-2.ts`,
`pp-processes.ts` and `pppi-processes.ts` that its reduced universe does not load (10 from the
earlier batches, 43 from the new records), and no other rule; both `tsc` gates clean; `npm test`
211/211 (one test fewer than batch 2 because commit e936351a removed the objects foundation
guard).

Batch 4 written 2026-09-24 (access date stamped 2026-09-24): 4 drafts audited, 4 written
(`project-system-process`, `ewm-warehouse-process` and `embedded-analytics-process`, module Cross;
`ibp-ppds-integration-process`, module PP), none refuted, so nothing was added under refuted. No
verdict carried a fixedRecord: the writer applied every listed downgrade to the researcher drafts,
loaded from the workflow journal (research results of wf_d9aa0357-e61, whose step, evidence and xref
counts match the auditors' counts: 11/33/44, 9/46/40, 10/43/27 and 10/41/60); each replacement matched
exactly once, with RLM marks ignored when locating the text. Both optional downgrades were taken: the
project-system 6.1.4 row is now byte-identical to the first `table:COSP` row of
`data/verification/tables.ts` (DATE4 = 2026-09-15, kept as `DATE_TB_15`) plus '(אומת ברשומת
table:COSP)', and the EWM reference stays on the Warehouse Request page, with a note that it is the
definition page shared by inbound and outbound processing. Rows added by the downgrades:
project-system +5 (the CJ40 / CJ8G row and the incidents row each split in two;
`data/function-intel.ts#K_ORDER_SETTLEMENT`, `data/function-intel.ts#K_SETTLEMENT_RULE_READ`,
`data/tcode-catalog.ts#IW31`); ewm +2 (Fiori library F4150; What's New 2022 'Direct Transfer
Migration Approach for EWM in SAP S/4HANA'); embedded-analytics +2 (the incidents row and the
transformation row each split in two); ibp +1 (`data/books/book4.json#11.1`). Before writing, the
writer re-ran `scripts/fal-app.mjs F4150 --release S32OP` (both roles, both catalogs and the leading
/SCWM/MON, as the new row states), re-ran the search 'Direct Transfer Migration Approach for EWM in
SAP S/4HANA' (url, loio c6ee329bf90545f6ae838b0100f2bbf2 and versionId 2022.000 came back verbatim),
re-read through `scripts/sap-help-body.mjs` the bodies of that page, of P3 (loio
9a862211cdd44d6ea5beedecbaee7204: 'CO01 or COR1', 'Release the manufacturing order', 'CO02 or COR2'),
of the LO page 'Production Planning and Detailed Scheduling (PP/DS)' (loio
e01f0742705a4b97bfca4157949873fc: 'with certain restrictions'), of 'Production Planning Integration
Based on Key Figures' (IBP 2608: 'in a regularly scheduled planning run') and of 'Staging Table
Migration Approach for EWM in SAP S/4HANA', read items 10.1.50, 9.5.1, 15.5.2, 9.2.1 and 4.1.13 in
`scratchpad/official/SIMPL_OP2025.pdf.txt`, re-read every repository record behind a new row
(function-intel K_ORDER_SETTLEMENT and K_SETTLEMENT_RULE_READ, tcode-catalog IW31, IW32, KO8G and
CO88, tx-intel CJ40, troubleshooting settlement-error, maint-order-budget and acdoca-coep-mismatch,
s4-transformation LESSONS) and confirmed book4 sections 11.1 to 11.3 and every other cited book
section. Every official row that ends in '(אומת ברשומת X)' was compared with its overlay row: the
url, title, release and accessedAt match, and the claim is the overlay claim (F0539: with a longer
tag naming the F0286A row of the same record) or its verbatim leading part (for /SCWM/TO_CONF the
quoted snippet is closed where it was cut). Writer deviations beyond the listed downgrades: (1) project-system summary: the replaced
span is one phrase longer than the verdict's, so 'לפי כלל ההתחשבנות' is not repeated; (2) the new
CJ40 row also carries the record's process line (CJ20N, CJ40, CJ30, actuals, CJI3), which the
verdict's context text relies on, and its s4Delta sentence on the COSP / COSS compatibility views
(eccToS4[3]); (3) the 'S4TWL - Project Reporting' row now also quotes 'These Fiori apps are hence
deprecated as of SAP S/4HANA 2023', the sentence behind the verdict's eccToS4[2] wording; (4) the
notes' new parenthetical is merged with the release list; (5) ewm: the Direct Transfer row quotes
the page body, because the search snippet breaks off before 'approach'; the WM item row now quotes
'which comes with limited usage rights', which antiPatterns[4] relies on; the notes record the
writer's reads; (6) embedded-analytics: steps[9] also names MCI7 (its xref) and renders the item's
'should be used rather than transaction COOIS' as 'מומלץ להשתמש ... במקום COOIS';
preconditions[1] keeps SAP_BR_EMPLOYEE as the general prerequisite in an added sentence;
exceptions[5] got the steps[8] softening in its own wording; (7) ibp: the LO body was re-read, so
that row (which is also the status source) quotes the full sentence and the notes say so; the
notes' '(טיוטת חוקר)' label is dropped; the 9.5.1 row quotes the item's prerequisite ('Target
release is SAP S/4HANA 1809. Source release is SAP S/4HANA 1610 or SAP S/4HANA 1709') instead of
'1809 ומעלה'; the key-figures row quotes 'in a regularly scheduled planning run', which steps[4]
now says; the tx-intel MD61 and domains rows now print MD63 (the MD61 record's `similar` list and
the domains records' `tcodes`), because steps[2] and transactions[1] name MD63 and no claim printed
it; migration[0] says 'במקרה זה' instead of repeating 'אם הם ממומשים'; (8) file: the header's kpis
sentence also names embedded-analytics-process (kpis from the repository's domain records) and
the two authored statuses; three date constants were added (`DATE_TB_01`, `DATE_TX_07`,
`DATE_FI_23`) and the comments of `DATE_TX_21`, `DATE_TX_02`, `DATE_TB_15` and `DATE_FM_14` list the
rows they now also date; the two status sources are shared consts (`EA_STATUS_SOURCE`,
`PPDS_STATUS_SOURCE`, typed `BestPracticeLike["evidence"][number]`, so the type import stays the only
import), each the same object as its evidence row. Documented negatives left in notes on purpose:
the zero-hit query 'BAPI_BUS2054_CREATE_MULTI' (project-system) and the 'Best Practice - Demand
Planning (7JF)' hit that belongs to SCM-APO-SPP and is not recorded as a scope item (ibp).
Coverage (`report:coverage --catalog best-practices`): total 28 → 32, L2 28 → 30, L5 0 → 2, verified
27 → 31, conflict 1 → 1, s4-appl 0 → 2, edition 0 → 1 (the IBP record's public-cloud sources).
Gates: the validator on the full registered universe prints 0 problems (32 practices);
`scratchpad/validate-bp-file.mjs` prints 80 `dangling-xref` hits, all bp slugs registered in files
its reduced universe does not load (53 from the earlier batches; 27 from the new records:
confirmation-process, goods-movement-process, maintenance-order-process,
material-staging-and-reservation, mrp-process, order-settlement-process, plan-to-produce-discrete,
production-order-process, sales-demand-to-production), and no other rule; both `tsc` gates clean;
`npm test` 211/211.

Batch 5 written 2026-09-24 (access date stamped 2026-09-24): 3 re-drafted records audited, 3 written
(`breakdown-maintenance-process`, module PM; `procure-to-pay-process` and
`physical-inventory-process`, module Cross), none refuted, so nothing was added under refuted; the
three refusals below are closed by these re-drafts. No verdict carried a fixedRecord, and the
breakdown verdict listed no downgrade (its one minor note, the token RETURN in steps[10], needs no
change). The drafts were loaded from the researchers' last on-disk JSON copies after checking them
against the audited drafts: step, anti-pattern, check, xref and evidence counts and the line count
of every profile field are equal (11/6/5/48/62, 10/7/7/44/45, 7/6/5/21/34), and 127 sampled passages
of the audited drafts, among them every string a downgrade replaces, occur verbatim. procure-to-pay:
all 8 listed downgrades applied, each replacement matched exactly once: exceptions[7] and the
incident row now carry the record's 'verify SE91' caveat on M8147; interfaces[3] says the system
tries to post EDI invoices automatically and errors go to manual processing; the MB03 row is the
verbatim tx:MB03 claim with the em dash replaced by a semicolon and the '(אומת ברשומת tx:MB03; ...)'
tag; the tautology 'PO שלא שוחרר ממתין לשחרור' is gone from steps[4] and exceptions[1] ('שחרור PO
ב-ME29N נכשל:'); checks[5] says the function-intel QA scenario was written for goods issue 261 and
is applied to a receipt; the context's book-3 sentence is bounded by the section titles (chapters 5,
6, 7 and 12). physical-inventory: all 12 listed downgrades applied: IKPF/ISEG no longer assigned to
header and items (context, tables[1]); MIBC is the ABC analysis and MICN the batch input for cycle
counting per 'Cycle Counting (MM-IM)' (steps[1], trigger[1], transactions[1]), and the MI01
repository row quotes the record's own wording ('חלופות: MICN/MI31 ל-batch creation, cycle counting
(MIBC)'); the MAN_PHYSICAL_INVENTORY_MONITOR template is attached to 'Physical Inventory Document
Overview', with a note that no source read ties that name to F0379A; checks[1] and exceptions[2]
state the tolerance rule as a restriction on the user when a document or its items exceed the user
group's tolerance; roles[1] lost 'בלבד'. Rows added by the downgrades: physical-inventory +2, both
copied from `data/verification/transactions-auto.ts` without the generated record's `context` flag
and with '(אומת ברשומת tx:X)': 'Cycle Counting (MM-IM) | Materials Management (MM)' (2025.001, loio
3207b753128eb44ce10000000a174cb4, tx:MIBC) and the Fiori library row of MI07 'Post Physical
Inventory Document' (S32OP, tx:MI07), which now backs the MI07 title named in notes; evidence 34 →
36 (23 official: 16 sap_help and 7 fiori_library; 10 repository; 3 books). The writer ran no new
search, page-body or fal-app call (no verdict marks a value unverified); it re-read the repository
wording the downgrades quote (the tx-intel MI01 alternatives; the incident's error text, which pairs
M8147 with 'PRD not possible verify SE91') and compared every official row with the overlays: each
copied row keeps the url, title, release and accessedAt of its overlay entry, and the 22 URLs no
overlay holds are search-record URLs whose bodies the researchers read and the auditors re-fetched
(breakdown 8, counting the reference and one conflicting row; procure-to-pay 4 and
physical-inventory 10, each counting the reference), so `scratchpad/check-bp-official.mjs` (the
older overlay-only rule, not a required gate) moves from 312 urls / 120 not in an overlay to 381 /
142. Writer deviations beyond the listed downgrades: (1) procure-to-pay exceptions[1]: the verdict
says 'keep the three errors', but the draft line lists two (release code outside the authorization,
no strategy for the PO); both are kept, and the ME29N record's third error ('PO כבר משוחרר') was not
added; (2) the MB03 claim follows the verdict's text, without the RLM mark the overlay carries
before 'MB03'; (3) file: the header's kpis sentence also names breakdown-maintenance-process
(MTTR/MTBF from `data/domains.ts#pm-breakdown`), and the comments of `DATE_TX_02`, `DATE_TB_15`,
`DATE_FM_14`, `DATE_TB_01`, `DATE_TX_07` and `DATE_FI_23` list the rows they now also date; no
constant was added, and the ten earlier records are byte-identical. Every uppercase SAP token of the
new records appears in one of their evidence rows, except RETURN (a BAPI parameter, accepted by the
auditor), the composites QMEL/QMIH and BH1/BH2/BJ2 (each part printed) and EWM (a product name,
linked through bp:ewm-warehouse-process). Coverage (`report:coverage --catalog best-practices`):
total 32 → 35, L2 30 → 33, L5 2 → 2, verified 31 → 33, conflict 1 → 2 (the breakdown record carries
two `conflicting_sources` rows), s4-appl 2 → 2, edition 1 → 1. Gates: the validator on the full
registered universe prints 0 problems (35 practices); `scratchpad/validate-bp-file.mjs` prints 95
`dangling-xref` hits, all bp slugs registered in files its reduced universe does not load (80 from
the earlier batches; 15 from the new records: confirmation-process, maintenance-order-process,
order-settlement-process, preventive-maintenance-process, goods-movement-process,
procure-to-pay-for-maintenance), and no other rule; both `tsc` gates clean; `npm test` 211/211.

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
  cited through `data/transactions.ts#IW28`, and gap statements in notes. Closed in batch 5
  (2026-09-24): re-drafted, re-audited without refusal, and written.
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
  Closed in batch 5 (2026-09-24): re-drafted, re-audited without refusal, and written.
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
  official, 9 repository and 2 secondary, or removed. Closed in batch 5 (2026-09-24):
  re-drafted, re-audited without refusal, and written.

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
- `bp:order-to-cash-process`, repository against Simplification List (disclosed in notes, no
  `conflicting_sources` row): `data/tx-intel.ts` lists VBUK and VBUP in the tables of VA01,
  VA03, VA05, VA25, VL01N, VL02N and VL06O, and the index tables VAPMA (VA05) and VAKPA (VA25);
  'S4TWL - SD Simplified Data Models' (2025 FPS01 Simplification List, item 11.1.9) says VBUK
  and VBUP were eliminated (status fields moved to VBAK/VBAP, LIKP/LIPS and VBRK) and the index
  tables VAKPA, VAPMA, VLKPA, VLPMA, VRKPA and VRPMA were eliminated. The tx-intel lists fit the
  ECC side only. What would settle it: an edition split of those `tables` fields in
  `data/tx-intel.ts` (not a best-practices file, not edited here).
- `bp:period-end-closing-process`, official against official (disclosed in notes; not marked
  `conflicting_sources` at the gate, the auditor accepted the notes disclosure): 'Transaction
  Codes in Cost Object Controlling' (2025.001, loio ebc64252eaa43507e10000000a441470; body
  re-read 2026-09-24) prints 'KKA0' both for 'Change cutoff period' and for 'WIP calculation -
  collective processing', while the Fiori library (row copied from `tx:KKAO`) and the
  repository give KKAO 'Calculate Work in Process - Collective'. The same page lists KKS5 for
  collective variance calculation and not KKS1 (the page says the list is not necessarily
  complete); the library calls KKS1 'Run Variance Calculation - Orders - By Lot'. What would
  settle it: SE93 in the target system for KKA0, KKAO, KKS1 and KKS5. A re-audit may mark the
  transaction-list row `conflicting_sources` against the KKAO library row. Closed on
  2026-09-24 (history kept in the record's notes): `data/tcode-catalog.ts` titled KKAX 'WIP
  Calculation for Product Cost Collector' and KKAS 'WIP Calculation: Collective Processing
  (Sales Order)' against the official list and the library; commit 48e7d9ac corrected both
  titles from the library.
- `bp:logistics-to-finance-postings-process`, repository against repository, settled by an
  official page: `data/s4-impact.ts#BSEG` says BSEG 'עדיין קיים' and `data/verified-objects.ts`
  (BSEG) says 'BSEG כ-Compatibility'. The body of 'Universal Journal: FAQ' (2025.001, loio
  8b8e5695c4dc4749a706f9fa2f6bda92, read through `scripts/sap-help-body.mjs` 2026-09-24) says
  'the former G/L-only table BSEG still exists as it is needed to store the source documents
  that serve as the basis for journal entries into table ACDOCA' and that BKPF 'remains
  unchanged'. This supports s4-impact and contradicts the verified-objects wording, which needs
  a correction in `data/verified-objects.ts` (not a best-practices file, not edited here). Open
  gap in the same record: the Simplification List item prints the DDL sources NSDM_DDL_MKPF /
  NSDM_DDL_MSEG and `data/s4-impact.ts` names the views NSDM_V_MKPF / NSDM_V_MSEG; the link
  between the two names was not verified.
- `bp:project-system-process`, repository against Simplification List (disclosed in notes, no
  `conflicting_sources` row): `data/tx-intel.ts#CJ20N` lists CJ01, CJ02, CJ06, CN21 and CN22 as
  obsolete, while 'S4TWL - Simplification of maintenance transactions' (2025 FPS01 Simplification
  List, item 10.1.60) says these maintenance transactions are part of the compatibility scope and,
  enhanced with SAP S/4HANA 2020 FPS2 (field extensibility), part of the perpetual scope. The record
  follows the item. In the same repository record the process line reads 'תקצוב (CJ40)/תכנון',
  while the CJ40 record and the catalog make CJ40 planning and CJ30 budgeting; the record uses CJ40
  for planning and CJ30 for budgeting. BAPI_BUS2054_CREATE and BAPI_BUS2001_GET_STATUS, listed in
  the same record, were not found in an official search and stay for verification in SE37. What
  would settle it: SE93 for the five codes in the target system, and an edition split of the
  `obsolete` list in `data/tx-intel.ts` (not a best-practices file, not edited here).
- `bp:ewm-warehouse-process`, repository against Simplification List (disclosed in eccToS4[5] and
  in the tcode-catalog row, no `conflicting_sources` row): `data/ecc-s4.ts#ewm` and
  `data/lifecycle.ts#LT03` (and the s4Delta of tx-intel LT01 and LT12) describe the whole of classic
  WM as compatibility scope, while 'S4TWL - Warehouse Management (WM)' (2025 FPS01, item 15.5.2)
  says Stock Room Management reuses major parts of LE-WM and can be used beyond 2025, and that
  WM-TRM, WM-LSR, WM-VAS, WM-YM, WM-CD, WM-TFM-CP and WM-DWM are the compatibility-scope parts,
  'which comes with limited usage rights' (SAP note 2269324). Second item: `data/tcode-catalog.ts`
  titles /SCWM/ADGI 'Adjust Goods Issue (EWM)', while the Fiori library (S32OP, row copied from
  `tx:/SCWM/ADGI`) calls it 'Post Goods Issue - Unplanned'; the record uses the library title. What
  would settle it: corrected texts in those repository records and a corrected catalog title (not
  best-practices files, not edited here).
- `bp:embedded-analytics-process`, repository against Simplification List (disclosed in notes, no
  `conflicting_sources` row): the s4Delta of `data/tx-intel.ts#MCI7` and `#MCI8` says PMIS/LIS is
  compatibility scope, while 'S4TWL - LIS in EAM' (2025 FPS01, item 4.1.13) does not use that term
  for PMIS; the term appears in 'S4TWL - Logistic Information System in PP' (item 9.2.1) for the
  shop floor information system (ID 452 of the matrix). The record attributes each statement to
  its source. Related: `data/fiori/apps.ts#F3289` keeps type 'Transactional' while the library
  prints 'Transactional, Analytical' (the apps.ts entry records the gap itself). What would settle
  it: the compatibility matrix attached to SAP Note 2269324, then a correction of the tx-intel
  s4Delta (not a best-practices file, not edited here).
- `bp:breakdown-maintenance-process`, TECO and reservations, repository against official (written as
  `conflicting_sources` on the `data/troubleshooting.ts#teco-blocked` row): teco-blocked lists open
  confirmations and 'רזרבציות/תנועות פתוחות' as TECO blockers and `data/tx-intel.ts#IW32` names open
  confirmations and PRs, while `data/process-guides.ts#pm-corrective` says TECO closes open
  reservations. The ECC page 'Technical Completion of an Order' (SAP ERP 6.0 EHP8, 6.18.latest, loio
  bac9b65334e6b54ce10000000a174cb4, body read) says the existing reservations are cleared, the
  purchase requisitions are flagged for deletion and confirmations can still be entered after TECO
  unless a user status forbids them; the S/4HANA 2025 FPS01 page 'Maintenance Order System Statuses'
  (loio fffdec9b483b4f7f8347e797a6641acd, body read) does not mention reservations. What would
  settle it: a TECO test in the target S/4HANA system on an order with an open reservation, an open
  purchase requisition and an unconfirmed operation, then a correction of the repository records
  (not best-practices files, not edited here).
- `bp:breakdown-maintenance-process`, collective settlement run, repository against repository
  (written as `conflicting_sources` on the `data/domains.ts#pm-settlement` row): pm-settlement says
  settlement runs 'ב-KO88 (בודד) או CO88 (מרוכז)', while `data/tcode-catalog.ts#CO88` ('Actual
  Settlement: Production/Process Orders') and `data/tx-intel.ts#CO88` describe CO88 for production
  and process orders, and `data/tx-intel.ts#KO88` and `data/function-intel.ts#K_ORDER_SETTLEMENT`
  name KO8G for the collective run. No official page read names a settlement transaction for
  maintenance orders ('Settle the Maintenance Order' describes the Web UI). What would settle it: an
  official page that names the collective settlement transaction for maintenance orders, or a test
  of KO8G and CO88 on PM orders in the target system; then a correction of
  `data/domains.ts#pm-settlement` (not a best-practices file, not edited here).
- `bp:breakdown-maintenance-process`, default order type for repair work, repository against
  repository (disclosed in exceptions[6] and notes, no `conflicting_sources` row):
  `data/domains.ts#pm-maintenance-orders` and `data/process-guides.ts#pm-corrective` give PM01 to
  repair, while `data/best-practices/pm-processes-2.ts#maintenance-order-process` lists PM02 as the
  breakdown type. The official 'Maintenance Order Types' page (2025.001) describes order types by
  business process, not by key. What would settle it: the order-type Customizing of the target
  system; the record leaves the key to the project.
- `bp:procure-to-pay-process`, the identity of F0843, repository against official (disclosed in
  notes, settled in the overlay `fiori:F0843`, no `conflicting_sources` row): `data/fiori/apps.ts`
  pairs F0843 with 'Post Goods Movement', `data/tx-intel.ts#MIGO` pairs 'Post Goods Receipt for
  Purchasing Document' with F0843A, and the P2P map (`data/processes.ts#p2p`) names 'Post Goods
  Movement' for the goods-receipt step, while the official page (2025.001, loio
  9ddf815494758c4ce10000000a4450e5) prints 'Post Goods Receipt for Purchasing Document App ID:
  F0843'. The record follows the official page and names F0843A in prose only. What would settle it:
  `node scripts/fal-app.mjs F0843` and `F0843A` at S32OP, then corrections in `data/fiori/apps.ts`,
  `data/tx-intel.ts` and `data/processes.ts` (not best-practices files, not edited here).
- `bp:physical-inventory-process`, the titles of MI20 and MI07, official against official (disclosed
  in notes, no `conflicting_sources` row): the activity table of 'Physical Inventory (MM-IM)' (SAP
  ERP 6.0 EHP8 6.18.latest and S/4HANA 2025.001, loio 4407b753128eb44ce10000000a174cb4, bodies read)
  calls MI20 'Print List of Differences' and MI07 'Process List of Differences'; the Fiori Apps
  Library at S32OP lists MI20 as 'Process Physical Inventory Count Results' and MI07 as 'Post
  Physical Inventory Document' (rows copied from `tx:MI20` and `tx:MI07`). `data/tcode-catalog.ts`
  adopted the library title for MI20 (commit 48e7d9ac: Old 'Print List of Differences' → New
  'Process Physical Inventory Count Results') and keeps 'Process List of Differences' for MI07. What
  would settle it: the transaction texts of MI20 and MI07 in SE93 of the target system.
