# Research queue · tables catalog (S/4HANA enrichment)

Kept by the single writer for `data/verification/tables.ts`. One line per id that was
refuted or deferred at the adversarial-verification gate, with the evidence still missing.
Written 2026-09-02 during the tables data commit (13 drafts audited: 12 written + the
upgraded `table:MSEG` worked example; 1 refuted). Updated 2026-09-07 for batch 2 (16 audited:
15 written incl. the `table:MARA` rewrite; 1 refuted, `table:AFVC`). Updated 2026-09-15 for batch 3
(15 audited, 15 written, 0 refuted; `table:AFVC` resolved), and again 2026-09-15 for batch 4
(15 audited, 15 written, 0 refuted; one correction queued for `tx:IP30` in the transactions catalog).
Updated 2026-09-15 for batch 5 (8 audited, 7 written, 1 refuted, `table:COBRA`; one correction queued
for `fm:NOTIF_TASK_READ` in the functions catalog). Updated 2026-09-15 for batch 6 (8 audited, 7 written,
1 refuted, `table:QPGR`; `table:COBRA` resolved; one correction queued for `table:QMAT` in
`data/table-tcodes.json`). Updated 2026-09-15 for batch 7 (8 audited, 8 written, 0 refuted; the production
resource/tool family and the work-center capacity family; four of the eight written `verification_required`).

## refuted / needs new evidence

- `table:MARA` — RESOLVED 2026-09-07 (batch 2): rewritten from the search index (four 2025.001 loios: 8aecfa1e, 977cbd53, 1bc030a8, e10c7322; no composite URL), audited and written as `changed` with `status.source`. Open point kept in the record's notes: the official snippet ties the 40-character number to MATNR_EXTERNAL and calls MATNR the short version; the MATNR CHAR 18 -> CHAR 40 statement is repository-only (`data/s4-impact.ts#MARA`) and needs SE11 or the Simplification Item text. Original refusal kept below for the trail.
  - (2026-09-01 refusal) refuted at audit (2026-09-01), not written. Missing evidence before a rewrite: (1) a correctly-indexed official URL for the extensibility topic — loio `dacf081f31af4c93ab97da957c71feee` is indexed only under deliverable `8308e6d301d54584a33cd04a9861bc52` ("SAP S/4HANA and SAP S/4HANA Cloud Private Edition" key-user extensibility guide), while the draft cited a fabricated composite under the MDG deliverable `6d52de87aa0d4fb6a90924720a5b0549`; re-fetch via `scripts/sap-help-search.mjs` and cite only what the search index returns. (2) Snippet-bounded claims: drop the glosses "is an active table in SAP S/4HANA 2025 FPS01" (duplicate-check page only lists configurable matching fields) and "so MARA remains the source of material master distribution" (MATMAS05 snippet says only "transfer material master general data from MARA tables"). (3) Correct repoRef: the MARA block is `data/table-enrichment.ts` lines 116–128 (129 opens MARC) — use the `#MARA` anchor form. (4) Hebrew claims and notes per `lib/evidence/types.ts`. (5) Honest status token: `changed` (MATNR CHAR 18→40; MARA is deliberately absent from `S4_STABLE` in `data/s4-impact.ts`), with `status.source` attached — not "available".

- `table:AFVC` — RESOLVED 2026-09-15 (batch 3): rewritten and written as `unchanged` / 2025.001 with `status.source` = the JVA extract-structure page. Every batch-2 problem was fixed: the two blueprints are now two separate repository evidence entries with their own repoRefs (`data/sapData.pm.ts#AFVC`, `data/sapData.pppi.ts#AFVC`), the JVA claim is bounded to 'Fields of Origin for the Extract Structure' and no longer presented as the table key, the CDS claim names the page's own technical name `I_ProductionOrderOperation_2` while the xref stays `cds:I_ProductionOrderOperation` (the only id in the universe), and the process-order use is marked repository-only. Original refusal kept below for the trail.
  - (2026-09-07 refusal) refuted at the batch-2 audit, not written. Problems to fix before a rewrite: (1) evidence[6] (blueprint) claims BOTH workbooks carry alt table 'AFVC (זהה)' and the SUM note 'אין המרת טבלה הרסנית'; verified in `data/sapData.pppi.ts` (PP-PI:AFVC, lines ~4786-4879) the record carries only s4Note 'מותאם (תואם).' + migrationStatus, no s4AltTable and no sumNote; only `data/sapData.pm.ts` (~line 2820) has 'AFVC (זהה)' + the SUM note; the same overstatement is repeated in notes, summary and conflicts. (2) evidence[6].repoRef `data/sapData.pm.ts#PM:AFVC` is not house style (`data/sapData.pm.ts#AFVC`, cf. `data/verification/functions.ts:597`) and the claim also leans on `data/sapData.pppi.ts`, which the repoRef does not name. (3) evidence[0] (JVA, loio d6328a53, 2025.001) overreaches the snippet: the snippet lists AFVC_MANDT / AUFPL 'Routing number of operations in the order' / APLZL 'General counter for order' as 'Fields of Origin' of an extract structure, never as the table's KEY fields; the key comes from `data/table-enrichment.ts#AFVC` (repository tier); the same text is duplicated in status.source.claim. (4) evidence[2] (I_ManufacturingOrderOperation, loio afa5a1dc, 2023.latest) adds 'הזמנות ייצור ותהליך' while the snippet says only 'manufacturing order operation data (tables AFVC, AFVV, AFVU)'; the draft's own notes concede process orders are named in no snippet. (5) status.he states the shared use for 'הזמנות ... ותהליך' at official level without marking the process-order part as repository-only (official snippets support maintenance orders via EAMS_AFVC, PS networks via JVA/PS archiving, manufacturing/production orders via the VDM pages). (6) Hebrew grammar: 'שני חוברות' must be 'שתי חוברות'. (7) notes present 'כתובותיהן הוחזרו חי ב-HTTP 200' as proof; a bogus loio on the same deliverable also returns HTTP/2 200, so the search-record re-run (which passed for all four loios) is the actual proof and should be what the notes cite.

## conflicts

- `table:MARC` — internal repository tension: `data/s4-impact.ts` lists MARC in `S4_STABLE` (explicitly stable) while its own MATDOC entry states aggregate stock values are no longer held in MARC/MARD. The official 2025.001 lifecycle page (CDS proxy views assigned to MARC/MARCH/MARD/MARDH) supports the written verdict `changed` (table retained, stock-access mechanism changed) rather than `unchanged`.
- `table:MBEW` — blueprint s4Note (`data/sapData.pppi.ts`, PP-PI:MBEW): 'Material Ledger חובה ב-S/4HANA; הערכה ב-ACDOCA/ACDOCC.' has no verdict token, while official 2025.001 pages show MBEW still read and written (migration source, CDS view source, conditional split-valuation writes). Resolution written: aggregate posting values live in ACDOCA; MBEW stays the valuation master record → `changed`.
- `table:MLGT` — blueprint `descriptionEn` reads "Material number" (`data/sapData.pppi.ts`), contradicting the official SAP Help name "Material Data for Each Storage Type"; blueprint s4Note 'EWM אסטרטגי.' left the verdict undecided. Resolved `unchanged` at table level; warehouse-solution decision (Stock Room Management vs EWM) is solution-level context.
- `table:MDMA` — three items: (1) blueprint `descriptionEn` "Material number" (apparent copy artifact); (2) `data/table-enrichment.ts` maps BERID→T439D as the MRP-area definition while `data/mrp-center.ts` presents MDLV as the MRP-area table — internal repository inconsistency needing resolution; (3) "MRP areas active by default in MRP Live" exists only in repository data (sapData.pppi.ts, mrp-center.ts) — the closest official snippet phrases it as a prerequisite, so the mandatory/default claim stays verification_required.
- `table:T438M` — blueprint labels T438M "MRP type" (סוג MRP) and joins MARC.DISMM = T438M.DISMM; the official VDM page describes T438M as MRP-group-dependent control parameters, and project Tier-2 sources (object-intel, academy lessons) place the MRP type catalog on T438A. Key structure/field list deliberately un-enriched (never-guess note, `data/table-enrichment.ts:1114-1118`); needs a live SE11 check or an official spec. Status written as `verification_required`.
- `table:CSLA` — blueprint record's funcs/progs (BAPI_MATERIAL_SAVEDATA, BAPI_MATERIAL_GET_DETAIL, RMMG2000, MM60) are material-master objects — an apparent copy artifact in the source workbook unrelated to CSLA; do not surface them as CSLA interfaces.

### batch 2 (2026-09-07) open conflicts, recorded in the written records' notes
- `table:MARA` — official snippet (loio 8aecfa1e, 2025.001) names MATNR as the short version of the material-number field and MATNR_EXTERNAL as the extended number; the MATNR CHAR 18 -> CHAR 40 DDIC statement exists only in `data/s4-impact.ts#MARA`. Whether MATNR itself becomes CHAR 40 or only MATNR_EXTERNAL needs SE11 or the Simplification Item text. Blueprint descriptionEn 'Material number' (copy artifact) vs official 'General Material Data'.
- `table:MAST` — judgement call: kept `unchanged` (both blueprints class 0, S4_STABLE, extension optional per the official page) while sibling `table:MARA` is `changed` for the same MATNR extension. PM blueprint 'BOM usage (4=maintenance)' vs `data/table-enrichment.ts` '7=PM' (official Bill of Material Usage snippet names usages without codes). PP-PI:MAST marks STLNR FK-only and STLAL PK, PM:MAST marks STLNR PK/FK and STLAL no key; needs SE11. `data/cds-enrichment.ts` names I_BillOfMaterialItemAssgmt over MAST; no official VDM topic found.
- `table:AFKO`, `table:AFPO` — blueprints open with 'מותאם' (mapper reads `changed`) while S4_STABLE and s4-objects mark stability; written `unchanged` because no official record names a structural change. AFPO: PP-PI descriptionEn 'Order number' (copy artifact); PM blueprint Fiori 'Find Maintenance Order (F2393)' has no official record and no apps.ts entry; PSAMG meaning ('Order item quantity' in the blueprint vs 'Scrap quantity of item' in loio 10cec353) needs SE11.
- `table:STKO`, `table:STPO` — PP-PI descriptionEn 'BOM category' for both (copy artifact) vs 'BOM header' / 'BOM Item'; PM blueprint marks POSNR as key while table-enrichment (SE11) gives MANDT/STLTY/STLNR/STLKN; IDNRK 18->40 note is repository-only; official Fiori name 'Maintain Bill of Material (F1813)' vs repository label 'Manage Bills of Material' / F1814, neither id in `data/fiori/apps.ts`. Archiving snippet spells 'STOP BOM items'.
- `table:CRHD`, `table:CRTX` — PP-PI descriptionEn 'Object type (A=work center)' / 'Object type' (field name copied as table name); PM reads CR_WORKCENTER_READ, PP-PI reads CR_WORK_CENTER_READ (both exist in the dataset, neither live-checked); PM facet cites KBA 3030584 (S-user, unverified, not recorded); F6175 (Manage Work Centers) is named in an official snippet but absent from `data/fiori/apps.ts`; IR01/IR02/IR03 are named officially only in a Defense Forces & Public Security page, the PM attribution rests on the PM blueprint.
- `table:JEST`, `table:JSTO` — I_ObjectStatus exists only in `data/cds-map.ts` (no official VDM record); table-enrichment writes STSMA -> TJ20/TJ30 while the blueprint joins TJ30 only and TJ20 is not in the dataset; AUFK<->JSTO direction contested between the two blueprints (ERD marks it contested); PP-PI descriptionEn 'Object number' for both (copy artifact); field types come from the PP-PI blueprint only; JSTO stays depth L1 (4 documented fields vs threshold 5).
- `table:PLKO`, `table:PLPO` — PP-PI descriptionEn 'Task list type (2=recipe)' / 'Task list type' (field label copied); PM blueprint describes PLKO as 'כותרת רשימת פעולות (Routing)' although the PM reading is a maintenance task list; PLNTY values E/T are repository-only; I_RoutingOperation / I_Routing have no official help.sap.com record (repository mapping only); Archiving Routings snippet names PI_PLAN in the sentence before the table list while its definition names PP_PLAN; Fiori F2660/F2661/W0021 seen officially but absent from `data/fiori/apps.ts`.
- `table:BUT000` — blueprints open with 'הוחלף' (mapper derived `replaced` with no successor) while BUT000 is the target table of the Business Partner Approach; written `simplified`. PM s4AltTable 'LFA1 (View תאימות)' vs official CVI page and table-enrichment ('KNA1/LFA1 עדיין קיימות ומסונכרנות'): no official source describes KNA1/LFA1 as compatibility views. Repository claim that XD01/XK01 direct creation is blocked is unsupported by any snippet. SAP Note 2265093 body not read (S-user).
- `table:EQUI`, `table:IFLOT` — three-way Fiori id conflict for the technical-objects app: F2079 (blueprint), F2730A (`data/fiori/apps.ts`), F1827 (`data/tx-intel.ts` IE01); none found on the official domains; official snippets name Find Technical Object (F2072) and Display Technical Object (W0028). KBA 2878950 quoted verbatim from an official snippet, not recorded in the kba field (no me.sap.com url / repoRef). I_Equipment / I_FunctionalLocation / API_FUNCTIONALLOCATION are tied to the tables by repository mapping only.

### batch 3 (2026-09-15) open conflicts, recorded in the written records' notes
- `table:MCHA` — TWO repository defects to fix in the dataset, both contradicted by official 2025.001 pages.
  (a) Classification class type for a plant-level batch: `data/workbenches-ext.ts` (lines ~210, 214, 238) and
  `data/tx-intel.ts` (MSC1, MSC1N, MSC2N) attribute class type **023** to MCH1/MCHA batches, while
  'Batch Classification' (MM-IM, 2025.001, loio 7e40bd53e3acb64ce10000000a174cb4) states '022 for batches at plant
  level' vs '023 for batches at material level/client level', and 'Classifying an Item' (LO-MD-BOM, 2025.001, loio
  7806c453f57eb44ce10000000a174cb4) prints '022 - Batch with plant' vs '023 - Batch without plant'. MCHA is the
  plant-level table, so 022 is the correct value; the repository wording needs correcting.
  (b) `data/tx-intel.ts` marks MSC1, MSC2 and MSC3 as 'זמינה ב-S/4HANA', the direct opposite of simplification item
  5.1.8 (2025 FPS1, pp. 104-105) and item 3.3 (2023 FPS3, pp. 127-128), which state they are not available and name
  MSC1N-MSC4N as the successors. All three tx ids resolve in the universe, so three live catalog pages currently
  contradict `table:MCHA`'s recommendedAction.
- `table:MKPF` — the compatibility-view name `NSDM_V_MKPF` in `data/s4-impact.ts#MKPF` appears in no official text
  read: the simplification item names `NSDM_DDL_MKPF` (DDL source of the redirect view) and `NSDM_MIG_MKPF` (reads
  the table without redirection). Needs SE11 or an official page before the repository name is trusted. Successor
  written as `obj:material-document` because `table:MATDOC` is not an id in the universe. Caution kept in the
  record: the MM_MATBEL Technical Data page still carries ECC-era sample figures ('1000 MKPF records, 1700 MSEG
  records'), a documentation leftover, not evidence that the table still stores data.
- `table:COSP`, `table:COSS` — two official tensions, both quoted verbatim and left unreconciled. (1) 2025 Help
  pages (PS validation, Maintenance Management, CO archiving) still call COSP/COSS 'tables' and instruct reading
  from them, while the Simplification List defines them as compatibility views over the universal journal.
  (2) Where the residue lives: the Universal Journal FAQ says statistical postings and target data remain in COEP,
  COSS, COSP; item 6.5.1 says value types other than 04 and 11 are stored in COEP, COSP_BAK, COSS_BAK. COSP is
  written `replaced` with successor `table:ACDOCA`; COSS is written `changed` (the FAQ leaves data in it) and the
  repository claim that COSS itself became a compatibility view is still unverified (an official 'Table COEP' page
  exists, loio 0705d65223141842e10000000a44176d, but no COSS equivalent was found).
- `table:AFIH`, `table:AFFL` — the batch-2 `AFKO`/`AFPO` pattern repeats: the blueprint opens with 'מותאם' (mapper
  reads `changed`) while no official source names a structural change. Both written `unchanged` with the blueprint
  caveat carried into recommendedAction. AFFL adds two of its own: `data/table-enrichment.ts#AFFL` gives the key as
  MANDT/AUFPL/APLZL while `data/sapData.pppi.ts#AFFL` marks APLFL as key and never lists APLZL (needs SE11); and
  AFFL is absent from `S4_STABLE` although AFKO, AFPO, AFVC and AUFK are in it.
- `table:EBAN` — the blueprint's S/4 cell ('מותאם (Business Partner לספקים)') and its CVI SUM note are supported by
  no official page naming EBAN in a customer/vendor-integration context; that aspect stays repository-only. The
  blueprint's Fiori cell is 'Manage Purchase Requisitions (אמת ID)' with no id, and no purchase-requisition app
  exists in `data/fiori/apps.ts`, so no fiori xref was written.
- `table:EQUZ`, `table:ILOA`, `table:MPLA`, `table:MPOS` — the technical-objects Fiori id conflict recorded for
  EQUI/IFLOT persists (blueprint F2079 vs `data/fiori/apps.ts` F2730A). New this batch: official help.sap.com pages
  do name `F5325` ('App Extensibility: Manage Maintenance Plans App (Key User)', 2025.001, loio
  0082dd0f5dd64b8b90cfa87ce1fd3c52) and `F5356` ('Situation Templates in Maintenance Management', loio
  922cb176a6ee4de58f2bbba0db7f4ad2), but neither id exists in `data/fiori/apps.ts`, so neither could be an xref.
  `table:MPLA` also carries an unresolved repository contradiction: the blueprint lists
  BAPI_MAINTENANCEPLAN_CREATE while `data/bapi-enrichment.pm.ts` states that module does not exist and points to
  MPLAN_CREATE / MPLAN_CHANGE — not decided against any official source, so the FM was left out of the xrefs.
  `table:MPOS`: no official snippet says C_MaintenanceItemDEX succeeds the deprecated I_MaintenanceItemData.
- `table:MARM`, `table:MAKT` — the `descriptionEn` 'Material number' copy artifact seen on MLGT/MDMA/MARA repeats
  on both rows (official names: 'Units of Measure for Material', 'Material Descriptions'); the fix belongs to the
  source workbook and `scripts/extract-xlsx.mjs`, not to a hand edit. MARM: the project id
  `cds:I_ProductUnitOfMeasure` is singular while the official VDM topic is `I_ProductUnitsOfMeasure` (already
  adjudicated in `data/verification/cds.ts`); no official page ties that view to MARM, and EAN11 inside MARM is
  repository-only (SAP documents EANs under MEAN). MAKT: MAKTG exists only in the blueprint and the enrichment
  record, and the DDIC lengths of MATNR/MAKTX in MAKT were not verified.
- `table:AFRU` — the PM blueprint has no AFRU row at all (only AFWI and report RIAFRU00), so plant-maintenance
  coverage rests entirely on official documentation; the DDIC field list (LMNGA, XMNGA, ISMNW, STOKZ) stays
  repository-level. The 2025 simplification list could not be reached at the 2023 document's own URL pattern
  (HTTP 403), so the negative check for AFRU was run against the 2023 document only.
- Depth ceiling, measured 2026-09-15: 12 of the 15 new records stay at L1 because
  `components/neo-shell/data/tables-detail.ts` counts only fields carrying BOTH `dt` and `len`, and the workbook
  rows for MKPF, COSP, COSS, AFIH, EBAN, EQUZ, ILOA, MPLA, MPOS, MCHA, MAKT and AFFL leave those cells empty (MCHA,
  MAKT and AFFL are typed but carry only 4 fields, below the threshold of 5). Only AFVC, AFRU and MARM cleared the
  L2 structural gate and therefore reached L5. Raising the other twelve needs SE11 or an official field list, not
  more evidence.

## batch 4 (2026-09-15) — 15 audited, 15 written, 0 refuted

Records written: `table:IMRG`, `table:IMPTT`, `table:OBJK`, `table:MHIS`, `table:MHIO`, `table:IFLOS`,
`table:MCH1`, `table:MEAN`, `table:MVKE`, `table:MLAN`, `table:MAPL`, `table:PLAS`, `table:PLFL`,
`table:PLMZ`, `table:PLZU`. Fourteen carry the token `unchanged`; `table:PLZU` is the one honest
`verification_required` — no official source names that table at all.

### refuted / needs new evidence (batch 4)

- (none refuted this batch)
- **Queued correction, another catalog — `tx:IP30` in `data/verification/transactions.ts`.** The `table:IMRG`
  verdict refutes two statements in that existing record: "לא נמצאה רשומת Simplification Item הנוקבת ב-IP30" and
  "שם התוכנית RISTRA20 ... לא נמצא במקור רשמי". Both are contradicted by the official Simplification List for
  2025 FPS01 (SIMPL_OP2025.pdf, document version 1.36), item 4.1.2 "S4TWL - Scheduling of Maintenance Plan",
  p. 76, application component PM-PRM, Business Impact note 0002270078, which reads "Transaction IP30 is doing
  scheduling for Maintenance Plans. Within this scheduling outdated technology (Batch Input) is used" and
  "Review your background Jobs which you most probably have scheduled periodically for transaction IP30 (Reports
  RISTRA20) and create new background jobs for IP30H (Report RISTRA20H)". Not fixed here as a side effect of the
  tables batch; it needs its own audited rewrite of the transactions record. `IP30H` and `RISTRA20H` are not in
  the id universe.

### batch 4 (2026-09-15) open conflicts, recorded in the written records' notes

- `table:MHIO` vs `tx:IP10` — NOT a repository defect: two official 2025 FPS01 pages disagree on the MHIO time
  field. The PLM page (loio `f3eec353b677b44ce10000000a174cb4`) names ADDAT, ADTIME and GSTRP; the Maintenance
  Planning page (loio `f1a8ce5314894208e10000000a174cb4`) marks `ADDAT(MHIO), ADUHR(MHIO)`. The existing
  `tx:IP10` record quotes ADUHR faithfully from its own source and must **not** be edited on the strength of this
  record. ADTIME vs ADUHR needs SE11.
- `table:MHIS` vs `table:MPLA` — framing discrepancy inside the same archiving page (loio
  `96a0ce5314894208e10000000a174cb4`): the MPLA record treats MHIO + ONR00 as a separate block, this record folds
  them into the PM_MPLAN list. Both agree MHIS belongs to the maintenance-plan archiving. Three query shapes
  failed to return a single contiguous fragment tying the `PM_MPLAN` archiving-class sentence to the MPLA / MMPT /
  MHIS list, and `http.svc/pagecontent` returns HTTP 500, so the class assignment stays an inference.
- `table:MCH1` — Fiori id conflict carried forward: `data/fiori/apps.ts` records F1576 as "Manage Batches" with
  relatedTables MCH1/MCHA, while two official LO-BM 2025.001 pages (loio `34b021588aee0a02e10000000a44147b`,
  `006de05317e74e5399d82fb88f21810d`) and `data/library/book7-full.json` say **F2462**. F2462 is not in the id
  universe, so MCH1 writes no fiori xref; the conflict also touches the existing `fiori:F1576` xref on
  `table:MCHA`. Belongs to the Fiori research queue.
- `table:OBJK`, `table:IMPTT`, `table:IFLOS` — the technical-objects Fiori id conflict (blueprint F2079 vs
  `data/fiori/apps.ts` F2730A) persists. New official ids seen and **not** writable as xrefs because they are
  absent from `data/fiori/apps.ts`: **F7617** "Manage Material Serial Numbers" (loio
  `03afe500cc8e48ceaae016a216143e52`, cited as evidence on OBJK), **W0030** "Display Measuring Point" (named in
  the PM - Measuring point migration page) and **W0031** "Process Measuring Point" (Fiori Apps Library search
  title).
- `table:IMPTT` — the official PM/CS archiving overview (loio `a0cfba538c95b54ce10000000a174cb4`) lists PM_EQUI,
  PM_IFLOT, PM_OBJLIST, PM_IMRG and PM_QMEL but no archiving object naming IMPTT; archiving of measuring-point
  master records is therefore unverified. The migration page's snippet cites SAP Note 2917243 for measuring-point
  and measurement-document corrections; the note body needs an S-user and is recorded as a snippet quotation only.
- `table:IMRG` — positive negative check added: the official Simplification List for 2025 FPS01 was read as full
  text and contains **zero** occurrences of `IMRG` and `IMPTT`, while other table names extract normally (MKPF 45,
  EQUI 10). Field-level gap unchanged: only MDOCM (as the SE16N selection field, not as a key), RECDV and CNTRR
  are officially named; READG and CDIFF appear only via their indicators READGI / CDIFFI, and POINT only in the
  repository layer.
- `table:MEAN`, `table:MVKE`, `table:MLAN` — the `descriptionEn` 'Material number' copy artifact repeats on all
  three PP-PI rows (official names: 'International Article Numbers (EANs) for Material', 'Sales Data for
  Material', tax classification for MLAN); the fix belongs to the source workbook and `scripts/extract-xlsx.mjs`.
  MEAN: `data/table-enrichment.ts` keys MANDT+MATNR+MEINH+LFNUM (EAN11 outside the key) while the blueprint marks
  MATNR+MEINH+EAN11 as the key — no official source decides it; `data/knowledge/object-intel.ts` names
  MEAN_SINGLE_READ and EAN_GET_INTERNAL, neither in the id universe nor in any official record. MVKE: the
  blueprint s4Note suffix 'לקוחות דרך Business Partner' belongs to the CVI customer-master conversion, not to a
  table with no customer key, and the blueprint's VK11 (pricing condition records) is tied to MVKE by nothing
  official, so it is not an xref. MLAN: the enrichment key adds TATYP, the blueprint lists only MATNR+ALAND —
  undecided.
- `table:MLAN` — the pre-existing base-table contradiction stands: `data/cds-map.ts` maps I_ProductPlantIntlTrd to
  MLAN while `data/cds-enrichment.ts` places it over MARC (one of the two real conflicts flagged in
  `audit/s4-enrichment/baseline-inventories.json`). No official page ties MLAN to that view — nor to
  I_ProductSalesTax, whose VDM record names no base table and is cited for name + Released status only.
- `table:PLZU` — internal repository contradiction to decide: `data/table-titles.json` and
  `data/knowledge/pppi-objects-ext.ts` (line 38) describe PLZU as task-list change management (ECN), while
  `data/knowledge/object-intel.ts` (line 103) describes it as PRT-to-operation assignment. The official archiving
  pages attribute PRT assignment to **PLFH**, so the PRT chapter in object-intel is unsupported. The blueprint's
  C298 is officially 'Deletion of Task List without Archiving' (loio `586237731eda49d0b9d2d6940feac5a0`), not
  change management. PLZU itself is named by no help.sap.com topic in three product scopes; it needs SE11/ADT.
- `table:MAPL`, `table:PLAS`, `table:PLFL`, `table:PLMZ` — three shared workbook defects. (1) `descriptionEn` is
  'Task list type' (the PLNTY field label) on PLAS, PLFL, PLMZ and 'Material number' on MAPL. (2) The PP-PI topic-3
  rows default their funcs column to BAPI_PROCORD_CREATE / BAPI_PROCORD_GET_DETAIL in 8 of 11 rows — process-order
  interfaces, not task-list interfaces; PLAS therefore xrefs CP_DI_OPERATION_READ and BAPI_ROUTING_GETDETAIL
  instead. (3) The blueprint SQL joins PLKO on PLNNR (MAPL: PLNTY+PLNNR) while `data/table-enrichment.ts` joins on
  PLNTY+PLNNR+PLNAL; the written records adopt the full group key and say so. MAPL is absent from the PM blueprint
  although the official PM/CS task-list archiving page names it; PLAS and PLFL are likewise PP-PI-only and are not
  in `S4_STABLE`.
- `table:PLMZ`, `table:PLAS` — `cds:I_RoutingOperationComponent` is a repository-only mapping (`data/cds-map.ts`,
  over PLMZ + PLAS) with no official page under that name; it stays an xref for navigation while the sibling CDS
  record remains `verification_required`. The officially-named views over these tables
  (I_MfgBOOOpBOMItemChangeState, I_MfgBillOfOperationsOperation, I_MfgBillOfOperationsSequence,
  I_MfgBOOMaterialAssignment, I_MfgBOOSubOperationChgSt) are all absent from `lib/route-manifest.generated.ts`.
- `table:PLMZ` — two open caveats: the cited VDM page carries 'One or more elements of this CDS view were
  deprecated with SAP S/4HANA Cloud' (element scope not read), and API_PRODUCTION_ROUTING is marked Deprecated in
  the public-cloud scope (2608.500, What's New 2402.500) while the On-Premise 2025.001 page carries no such mark.
- `table:IFLOS` — the negative simplification finding was run on the 2023 FPS03 white paper only (IFLOS 0, IFLOT 0,
  'alternative label' 0, labeling/labelling 20 in four unrelated S4TWL contexts); the 2025 list was not scanned as
  a full document for this record. Key structure is contested three ways (blueprint TPLNR PK/FK + TPLKZ FK;
  `data/table-enrichment.ts` MANDT+TPLKZ+label; `exports/sap-table-inventory.json` empty pk). The operational
  activation path for alternative labeling (transaction, conversion report, Customizing switch) was not found in
  core documentation.
- Depth ceiling, measured 2026-09-15 after the merge: 10 of the 15 new records stay at **L1** because
  `components/neo-shell/data/tables-detail.ts` counts only fields carrying BOTH `dt` and `len`, and the threshold
  for tables is 5. Measured counts: IMRG 0, IMPTT 0, OBJK 0, MHIS 0, MHIO 0, IFLOS 0 (the PM workbook rows leave
  `dt`/`len` empty on all six), MLAN 3, PLZU 3, MVKE 4, PLFL 4. Only MCH1 (7), PLAS (6), MEAN (5), MAPL (5) and
  PLMZ (5) cleared the L2 structural gate and therefore reached L5. Raising the other ten needs SE11 or an
  official field list, not more evidence.

## batch 5 (2026-09-15) — 8 audited, 7 written, 1 refuted

Records written: `table:QMEL`, `table:QMFE`, `table:QMMA`, `table:QMSM`, `table:COBRB`, `table:EBKN`,
`table:KDST`. All seven carry the token `unchanged` at edition on-premise / release 2025.001 with an
authored `status.source`. Only `table:EBKN` changes what the app shows: its derived claim was `changed`
(from the blueprint cell 'מותאם (חיוב ל-ACDOCA)', no source, no release); the written record replaces it
with a sourced `unchanged`. The other six already derived `unchanged` from the blueprint and now carry
official evidence underneath.

### refuted / needs new evidence (batch 5)

- `table:COBRA` — RESOLVED 2026-09-15 (batch 6): rewritten, audited and written as `unchanged` /
  on-premise / 2025.001 with `status.source` = the CO archiving run-times page. All four batch-5 problems
  were fixed: the UI sentence is now attributed to the loio whose snippet actually carries it and the
  competing `2d32b8ac` wording is recorded in `notes` as a trace, not as evidence; each API entity now
  carries the versionId its own loio returns (`e88bddfa` = 2025.001, `59ae5b7d` = 2023.latest, with
  `c1457e0e` 2025.001 as the Version-2 anchor); the internal-orders information sheet and the Change
  Settlement Rule API page are both in `evidence[]` (six entries, no four-evidence rule); and the FI-AA
  label is quoted with its `(for AuC)` qualifier, scoped to assets under construction, so the blueprint's
  unqualified `descriptionEn` stays repository-only. Original refusal kept below for the trail.
  - (2026-09-15 batch-5 refusal) refuted at the adversarial gate, not written. Four problems to fix before a rewrite:
  1. **Fabricated UI detail.** The draft attributes to 'Settle the Maintenance Order'
     (loio `b1cc9b3e5fbe43a7b01d212586f805c9`) the sentence about the *Create Default Settlement Rule*
     pushbutton "בלשונית Costs". That loio's snippet carries only "Settle the Maintenance Order Use You use
     a settlement rule to define how the costs incurred by the execution of maintenance work are cleared on
     a pro rata basis. … In Customizing for Maintenance and Service Orders, you can define distribution
     rules…". The pushbutton sentence belongs to a different page, 'Analyzing Costs and Settling the Order'
     (loio `2d32b8ac5466449285b667cf8a02e0d5`, 2025.001), and it reads "choose the pushbutton Create Default
     Settlement Rule in the header area of the individual maintenance order" — the **header area**, not a
     Costs tab. The string "בלשונית Costs" appears in no snippet at all. Both the attribution and the
     location must be corrected, or the sentence dropped.
  2. **Release over-claim.** The draft puts both API loios in "APIs for Maintenance Management לגרסת 2025
     FPS01". Only loio `e88bddfad77342cb8f37cd43b484f26f` ('Maintenance Order Settlement Rule (Deprecated)',
     technical name `MaintOrderSettlmtDistRule`) returns versionId 2025.001. Loio
     `59ae5b7d2177445e9b3ac208111d238a` ('Maintenance Order Settlement Rule (Version 2)',
     `MaintOrderSettlmtDistrRule_2`) returns **2023.latest** on every run and must not carry a 2025 FPS01
     label. A Version 2 entity at 2025 is separately supportable from loio
     `c1457e0e539740a29932fbdcf36fea3c` ('Maintenance Order (Version 2)', 2025.001), whose snippet lists it.
  3. **Load-bearing claims with no evidence row.** `status.he` asserts COBRA appears in the 'Relevant
     tables' list of the internal-orders transfer information sheet, and `status.recommendedAction` asserts
     the API entity is marked Deprecated. Neither source is in `evidence[]`, so the rendered source list
     shows nothing behind either claim. The draft justified this as "כדי לא לחרוג מארבע"; there is **no
     four-evidence house rule** — 39 of the then-58 records in `data/verification/tables.ts` carry five or
     more evidence entries (AFVC, AFFL, IFLOS and RESB carry eight). Both sources are official and
     resolvable and belong in `evidence[]`.
  4. **Over-read of the FI-AA table label.** The snippet reads "… ANLE Proof of origin COBRA Settlement rule
     header &hellip; (for AuC) CORB Settlement rules (for AuC)". The elision falls between "Settlement rule
     header" and "(for AuC)", and the next row's pattern is `<TABLE> <description> (for AuC)`, so the full
     label in that FI-AA archiving list is plausibly "Settlement rule header (for AuC)". The draft
     nonetheless concludes "מכאן מאומת השם האנגלי הרשמי של COBRA בתיעוד 2025 - Settlement rule header",
     dropping a qualifier the snippet may carry and using an AuC-scoped archiving list to certify the
     blueprint's general `descriptionEn`. A rewrite needs either an uncut snippet or a non-AuC page.

  Note for the rewrite: `table:COBRB` (written this batch) already carries the two API loios, their
  technical names and the deprecation sentence in its `notes`, correctly scoped as an API-level change that
  no official page ties to the COBRA/COBRB tables themselves.

### batch 5 (2026-09-15) open conflicts, recorded in the written records' notes

- `table:QMEL`, `table:QMFE`, `table:QMMA`, `table:QMSM` — the four notification tables share one
  documentation asymmetry. The 2025 FPS01 archiving pages for PM_QMEL and SM_QMEL print the full table
  list (QMEL header, QMFE items, QMMA activities, QMSM tasks, QMUR causes, QMIH, ILOA, IHPA, PMLP), while
  the 2025 FPS01 page for **QM_QMEL** (loio `130ab753128eb44ce10000000a174cb4`) refuses to list its tables
  and redirects to transaction SARA. The quality-notification side of the family therefore rests on the
  **SAP ERP 6.18** dependencies page (loio `4c0ab753128eb44ce10000000a174cb4`) for QMEL, and is simply not
  asserted for QMFE, QMMA or QMSM. A 2025-scoped source for the QM archiving table list is the missing
  evidence.
- `table:QMEL` — documentation defect observed and deliberately not used: the SAP ERP page 'Service and
  Maintenance Notifications in the DRB (PM/CS)' (loio `0e78bb53707db44ce10000000a174cb4`) writes "You can
  archive service notifications using archiving object PM_QMEL, and maintenance notifications with
  SM_QMEL" — the inverse of what every other page states. Also: `table:QMIH` is named in both archiving
  lists but is absent from the id universe, so it could not be an xref; and the blueprint's Fiori cell
  'Report Malfunction (F2215)' resolves to no entry in `data/fiori/apps.ts` and to no official record.
- `table:QMMA` vs `data/function-intel.ts#NOTIF_TASK_READ` — **queued correction, functions catalog.** The
  repository record describes NOTIF_TASK_READ as "משימות הודעה (Tasks) - QMMA/QMSM", conflating the two
  tables, while the official archiving pages separate QMMA = Activities from QMSM = Tasks. Not fixed here
  as a side effect of the tables batch; it needs its own audited rewrite of the functions record.
- `table:QMMA` — the official service page 'Quality Notification' (loio
  `454808498fc344a8a08b912503d90ac0`, 2025.001) states under Constraints that API_QUALITYNOTIFICATION
  cannot "Read, create and update quality notification activities". That is exactly QMMA content on the
  quality side, so **no official documented interface was found for QMMA in a quality-notification
  context**; the record says so instead of recommending that service. The maintenance-side entity
  `A_MaintNotifItemActivity` is recorded in `data/verification/cds.ts` and was not re-verified this round.
- `table:QMMA`, `table:QMSM` — key structure contested and undecided: the blueprint gives QMMA
  QMNUM+MANUM (no FENUM) while `data/table-enrichment.ts#QMMA` gives MANDT+QMNUM+FENUM+MANUM; the
  blueprint gives QMSM MANUM/MNGRP/MNCOD while `data/table-enrichment.ts#QMSM` gives MSNUM/MGRP/MCOD. No
  official source decides either. Needs SE11 or ADT.
- `table:QMSM` — `I_MaintNotificationTaskData` is Released in the **2023.latest** VDM guide only; a query
  scoped to 2025.001 returned no record for that view, and the VDM snippet never names its base table. The
  record's recommendedAction says so rather than presenting the view as a verified 2025 successor path.
  The view is also absent from `lib/route-manifest.generated.ts`, so it is not an xref.
- `table:QMSM` vs `table:MHIO` precedent — two official 2025 FPS01 pages disagree about which archiving
  object covers which notification type (see the QMEL documentation-defect item above). As with the
  MHIO/IP10 case in batch 4, the existing records that quote their own source faithfully must **not** be
  edited on the strength of this record.
- `table:COBRB` — `data/table-enrichment.ts#COBRB` gives the key as MANDT+OBJNR+BUREG+LFDNR with foreign
  keys KOSTL→CSKS, PS_PSP_PNR→PRPS and SAKNR→SKA1, while the blueprint lists five untyped fields (OBJNR,
  BUREG, KONTY, EMPGE, PROZS) and no LFDNR. Neither list is officially verified. Also: 'Information Sheet
  for the Transfer of Internal Orders' (loio `1c42de531ed3424de10000000a174cb4`, 2025.001) lists AUFK,
  ONR0, JSTO, JEST, COBRA and **COBRD** under 'Relevant tables' and pointedly does not list COBRB; COBRD
  was not investigated. COBRB exists in the PM blueprint only, although `data/pppi-process-flow.ts`
  references it at the process-order settlement step.
- `table:COBRB` — official Fiori id found but **not** writable as an xref: 'Manage Settlement Rules -
  Internal Orders' (CO, 2025.001, loio `a5c0cb745d8e42bfba04c5e2015c571f`) prints "App ID: F5695", but
  F5695 is an internal-orders app, it is absent from `data/fiori/apps.ts`, and no official app id was found
  for **maintenance-order** settlement rules. Belongs to the Fiori research queue.
- `table:EBKN` — the blueprint's S/4 cell 'מותאם (חיוב ל-ACDOCA)' and its SUM note about COSP/COSS becoming
  views are supported by no official page naming EBKN; the closest official statements (Predictive
  Commitments Management, loio `26a70798c3d1444eabf7d09d3622a35d`; Commitments by Cost Center, loio
  `90d3445c84e94bddba8660fda05f93fb` vs the classic `74acf26899d049c1b8db2df37bcb50d7`) never name EBKN.
  That aspect stays repository-only, and the written status supersedes the derived `changed`.
  Positive negative check recorded: EBKN and EKKN occur **zero** times in the full text of the
  Simplification List for 2025 FPS01 (Document Version 1.36) and of the 2023 list.
- `table:EBKN` — the status anchor was deliberately moved off the industry-solution page. The DFPS report
  page (loio `d0c0cc5340487214e10000000a174cb4`, describing `/ISDFPS/FOLLOW_ON_PURDOCS`) stays as evidence
  but `status.source` is the core FI-GL extensibility page (loio `266cb949a0414d1bb30c4a6550d55835`). The
  migration page names the **virtual** table `ART_EBKN` and adds "Note that virtual tables do not exist in
  the database", so it carries no structural claim about EBKN itself.
- `table:KDST` — workbook defect: `descriptionHe`/`descriptionEn` read 'מסמך מכירה' / 'Sales document',
  which is the label of the first key field (VBELN), not the table; the same row also carries the material
  master's funcs and progs (BAPI_MATERIAL_SAVEDATA, BAPI_MATERIAL_GET_DETAIL, RMMG2000, MM60). The row's
  own `guideHe` and `helpLbl` already say Sales Order BOM. The fix belongs to the source workbook and
  `scripts/extract-xlsx.mjs`, not to a hand edit of `data/sapData.ts`. `data/knowledge/object-intel.ts`
  additionally ties KDST to Variant Configuration and CU41/CU42, which no official source confirms.
- `table:KDST` — F4339 is named officially twice, under two different names ('Display Sales Order BOM' on
  the migration page, 'Manage Order Bill of Material' on the feature-comparison page loio `965b2904`), and
  is absent from `data/fiori/apps.ts`; CS61, CS62, CS63 and CSAB are likewise outside the id universe. No
  fiori xref was written.
- Depth ceiling, measured 2026-09-15 after the merge: **all seven** new records stay at **L1**.
  `components/neo-shell/data/tables-detail.ts` counts only fields carrying BOTH `dt` and `len`, and the
  threshold for tables is 5. Measured counts: QMEL 0, QMFE 0, QMMA 0, QMSM 0, COBRB 0, EBKN 0, KDST 4.
  Raising them needs SE11 or an official field list, not more evidence. The tables coverage row is
  therefore unchanged by this batch (105 total, L1 75 / L3 5 / L5 25, verified 105).

## batch 6 (2026-09-15) — 8 audited, 7 written, 1 refuted

Records written: `table:COBRA` (the batch-5 refusal, now resolved), `table:QMUR`, `table:STAS`,
`table:STPU`, `table:STZU`, `table:QPCD`, `table:QMAT`. All seven carry the token `unchanged` at edition
on-premise / release 2025.001 with an authored `status.source`. None of them changes the status the app
shows — all seven already derived `unchanged` from the blueprint — but every one of them now carries
official 2025 FPS01 evidence underneath instead of a derived, source-less claim, and `table:STAS` rises
from depth L3 to L5 (it is the only one of the seven whose blueprint row carries five typed fields).

### refuted / needs new evidence (batch 6)

- `table:QPGR` — refuted at the adversarial gate, not written. Seven problems to fix before a rewrite:
  1. **Refuted negative claim (blocking).** The draft's gap states that no Simplification Item concerning
     QPGR or the catalogs was found *and* that the Simplification Item Catalog "requires an S-user and was
     not checked". The Simplification List channel was in fact available and unchecked: the 2023 list
     (`Simplification List for SAP S/4HANA 2023 initial shipment, Feature Pack Stack 1-3 and SAP S/4HANA
     Cloud Private Edition 2023 initial shipment, Feature Pack Stack 1-3`, cover line
     `Document Version: 1.35– 2025-02-25`, 74,223 extracted lines) carries item **34.4 S4TWL -
     Authorization Objects in QM** (Application Components: QM), whose Business Impact note names SAP Note
     `2505099` "Worklist for transition to SAP S/4HANA authorization objects in quality management" and
     whose replacement table contains the row `Q_CGRP_ACT | Q_CAT_GRP and Q_TCODE | Authorization to edit
     code groups and codes`. That is an official S/4 simplification item touching QPGR's own maintenance
     path. The table-level token `unchanged` survives — the item changes authorization objects, not the
     data model — but the record must not assert the absolute negative, and `recommendedAction` must carry
     the authorization-object conversion action. The **narrow** negative is confirmed and may stay: the
     string `QPGR` occurs **zero** times in that extraction, and the only `code group` hit in the whole
     document is that authorization row.
     Re-measured by the writer on the **current** release before filing, so the rewrite can anchor on
     2025 rather than 2023: `SIMPL_OP2025.txt` (85,712 extracted lines, md5 of the PDF
     `c1ccf8ebcd92d51fdc80e4b4873f3b73`) carries the same item as **9.6.7. S4TWL - Authorization Objects
     in QM**, Application Component: QM, Note Number `0002505099`, with the same replacement row
     (`Q_CGRP_ACT` ... "Authorization to edit code groups and codes", alongside `Q_CSSET_ACT`,
     `Q_MINSPCHR`, `Q_INSPMETH`). The string `QPGR` occurs **zero** times in the 2025 extraction as well,
     so the table-level negative holds in both releases and only the authorization-object claim has to
     change.
  2. **Internal contradiction (blocking).** `notes` state "לכן ב-xrefs נכללות tx:QS41 ו-tx:QS42 בלבד", but
     `xrefs` actually carries five transactions: `tx:QS41`, `tx:QS42`, `tx:IW21`, `tx:IW22`, `tx:QM01`. The
     sentence is false as written, and `tx:IW21`, `tx:IW22` and `tx:QM01` have no basis anywhere in the
     record: the verified blueprint row `data/sapData.pm.ts#PM:QPGR` lists only `QS51; QS61`, and no cited
     official snippet names IW21/IW22/QM01 in connection with QPGR.
  3. **Unsupported xrefs.** `fm:QPK1_CATALOG_READ` and `fm:CATALOG_PROFILE_READ` appear in `xrefs` with no
     justification in evidence, notes, gaps or conflicts. The verified blueprint row records exactly one
     function for QPGR: `QPK1_CODEGROUP_READ` ('קריאת קבוצת קוד'). Both names do resolve in the universe
     (`lib/route-manifest.generated.ts` bapiFm carries CATALOG_PROFILE_READ, QPK1_CATALOG_READ,
     QPK1_CODEGROUP_READ, QPK1_CODE_TEXT_READ, QPK1_INSPCHAR_READ), so this is not a dangling xref and not
     a fabrication — but it is an unsourced addition under Never-Guess.
  4. **Unattributed technical assertion.** `status.recommendedAction` states "פריטי ההודעה (QMFE, QMUR,
     QMMA, QMSM) נשענים על הקודים האלה". Nothing in the record's evidence supports it. It *is* supported by
     the repository (`data/table-enrichment.ts`, QPCD.foreignKeys: `CODE ← QMFE-FECOD / QMUR-URCOD /
     QMMA-MNCOD`), but that line is not carried in the repository evidence claim, so the record asserts
     more than it cites.
  5. **Quote precision, evidence[2].** The record quotes `Supported catalog types for QM are: 1, 2, 5, 8,
     9, D, E Supported catalog types for PM are: 0, 2, 5, A, B, C, D`. The retrieved snippet for loio
     `cf3f01390d8049dc8b0373b0cb743e3a` begins mid-phrase at `… for QM are: 1, 2, 5, 8, 9, D, E Supported
     catalog types for PM are: 0, 2, 5, A, B, C, D …`; the leading words "Supported catalog types" on the
     QM half are reconstructed from the parallel PM half, not seen. The PM half and both type lists are
     exact.
  6. **Quote precision, conflicts[0].** The record attributes the identical string `Transactions: Edit
     Selected Sets (QS51) Display selected set index (QS52)` to BOTH loio
     `21096d9e9fb34042a7d40d8ab4a6d737` ('QM - Selected set') and loio
     `b4ceac118ebf4e6ab4ae1a1703a1aa90` ('Object classification - Selected set (QPAM)'). Verified: the
     first reads `Transactions:` (plural), the second reads `Transaction:` (singular). The substance of
     the conflict is confirmed and stands.
  7. **Self-support gap.** The gap names the CDS view `I_SrvcMgmtCodeCatalog`, but the notes quote only the
     page title 'Catalog of Codes in Service Management' for loio `18d7d3aab44b416682289ca26c5730ff` and
     never the view name. The verifier confirmed it independently ('Catalog of Codes in Service Management
     CDS View Name I_SrvcMgmtCodeCatalog Related Text View I_SrvcMgmtCodeCatalogText'), so this is a
     completeness nit, not a fabrication — but as written the record asserts a technical name it does not
     cite.

  Note for the rewrite: `table:QPCD` (written this batch) already carries the QM_CATALOG migration object,
  the `S_QPGR` / `S_QPCD` staging structures, the catalog-type lists and the QS41/QS42 app names in its
  evidence and notes, and `table:QPCD` xrefs `table:QPGR`, so the two records will read as a pair.

### batch 6 (2026-09-15) open conflicts, recorded in the written records' notes

- `table:COBRA` — key structure contested and undecided: `data/table-enrichment.ts#COBRA` gives
  MANDT + OBJNR with foreign keys 'OBJNR מ-AUFK-OBJNR' and 'OBJNR אל COBRB', while the blueprint lists
  four untyped fields (OBJNR, BUREG, PERBZ, ERLKZ) and marks only OBJNR as key. No official source decides
  it; needs SE11 or ADT. Also: the FI-AA archiving snippet prints the row after COBRA as **`CORB`**, not
  COBRB — recorded verbatim, deliberately not normalised, and explicitly *not* vouched for as a table
  name (CORB is absent from the id universe and was not verified). `ONR0` and `COBRD`, named alongside
  COBRA in the internal-orders information sheet, are outside the id universe, so neither is an xref and
  COBRD was not investigated. `F5695` ('Manage Settlement Rules - Internal Orders') is an internal-orders
  app absent from `data/fiori/apps.ts`, and no official app id was found for maintenance-order settlement
  rules, so no fiori xref was written (same finding as `table:COBRB`, batch 5).
- `table:COBRA` — two official 2025.001 pages in the same deliverable put the *Create Default Settlement
  Rule* pushbutton in two different places: `b1cc9b3e5fbe43a7b01d212586f805c9` writes "on the Costs tab
  page, in the Settlement Rules area", `2d32b8ac5466449285b667cf8a02e0d5` writes "in the header area of the
  individual maintenance order". Most likely two different UIs, but the documentation does not say so. The
  record cites the first and records the second as a trace.
- `table:COBRA` — reproducibility caveat, recorded in the record's notes: the un-elided FI-AA run
  ('… COBRA Settlement rule header (for AuC) CORB Settlement rules (for AuC) …') was obtained by **one of
  four** query phrasings; the other three return the same passage elided exactly between "Settlement rule
  header" and "(for AuC)". Do not re-audit this record on the assumption that any query reproduces it.
- `table:QMUR` — transaction attribution contested: the blueprint records `IW22; IW67`,
  `data/table-tcodes.json` records `IW22, IW23`, and `data/tx-intel.ts` describes IW67 as a task list over
  QMSM and IW69 as an item-and-cause report over QMFE and QMUR. The official documentation supports the
  tx-intel reading (the VDM cause-data record names IW69 and IW23 as the display authorizations; 'Linear
  Data in Reports' places IW68/IW69 as notification-item reports). `tx:IW67` is kept as a blueprint
  navigation anchor only.
- `table:QMUR` — `data/table-titles.json` carries no entry for QMUR **and none for QMEL**; QMFE, QMMA and
  QMSM are present (64 keys in the file). The batch-6 draft originally claimed QMUR was the only one
  missing; the measured fact is corrected in the written record.
- `table:QMUR` — `data/knowledge/object-intel.ts` frames QMUR almost entirely in a QM context (QM01, QM02,
  QM03, CAPA) and attributes `BAPI_QUALNOT_GETDETAIL` / `BAPI_QUALNOT_ADD_DATA` to it; neither name exists
  in the id universe, and no official page names QMUR in a quality-notification context (five targeted QM
  queries returned nothing). The QM sources name only the OData entity `QualityNotificationItemCause` and
  the view `I_QltyNotificationCause`. The QM half of the table's description is therefore repository-only,
  and the written `status.he` says so.
- `table:QMUR` — `data/cds-map.ts` merges QMMA, QMSM and QMUR onto a single view (`I_MaintNotifActivity`)
  while the official documentation describes separate views for activities, tasks and causes. Already
  filed against `cds:I_MaintNotifActivity`; the xref is kept as a repository-level navigation anchor.
  `I_MaintNotificationCauseData` and `I_MaintNotifItemCauseTP_3` are outside the id universe, and no
  snippet ties either to QMUR.
- `table:STAS`, `table:STPU`, `table:STZU` — the same three blueprint defects recur across the BOM family
  and belong to the source workbook + `scripts/extract-xlsx.mjs`, not to a hand edit of `data/sapData.ts`:
  (a) `descriptionEn` carries a field label instead of the table name (STAS 'BOM category' = the STLTY
  label; STPU 'Item node number' = the STLKN label; STZU 'BOM category'); (b) the rows carry the material
  master's funcs and progs (BAPI_MATERIAL_SAVEDATA, BAPI_MATERIAL_GET_DETAIL, RMMG2000, MM60), the same
  artifact already filed for CSLA, KDST, CRHD, CRTX, STKO, STPO, MLGT and MDMA; (c) key structure is
  contested between `data/table-enrichment.ts` and the blueprint — STAS: enrichment MANDT/STLTY/STLNR/
  STLAL/STLKN with no STASZ vs blueprint STLKN as FK and STASZ as PK with no MANDT; STPU: enrichment
  MANDT/STLTY/STLNR/STLKN + subitem counter vs blueprint's three fields STLKN/SUMNR/MENGE; STZU:
  enrichment MANDT/STLTY/STLNR vs blueprint STLTY/STLNR/STLAN/AENNR. No official page reads down to field
  level; all three need SE11 or ADT.
- `table:STPU` — the STPU↔STPO relation row in the blueprint carries, in both directions, the description
  'טקסטים ארוכים לפריט עץ מוצר', which does not describe a subitem table; no official source links STPU to
  long texts. Separately, `data/knowledge/pppi-objects-ext.ts` marks STPU `trust: 'needs-verification'`, a
  marking the official 2025.001 documentation now supports removing — not done here as a side effect.
- `table:STZU` — description layer: the official name is `Time-independent BOM data`, while
  `data/table-titles.json` and `data/knowledge/pppi-objects-ext.ts` present the table as BOM
  *history*/admin. `data/table-enrichment.ts#STZU` sits on both sides at once — its `purposeDeep` reads
  'נתוני קבע של עץ מוצר (BOM - permanent/history data)' and goes on to list 'היסטוריית ניהול שינויים
  (change master), דגלי היסטוריה'. So the repository is internally consistent in attributing both, and the
  gap is against the official layer, which supports only the time-independent reading. Recommendation:
  adopt the official description as primary and demote the history claim to repository level.
- `table:STZU` — the blueprint's ER edge (STZU as a child of STKO through STLNR) and the transactions CC01
  and CC02 are unconfirmed by any official page read this round; the archiving page merely lists both
  tables under the same archiving object, which is not a foreign-key statement.
- `table:STAS` — cross-record observation, deliberately **not** acted on: the existing worked example
  `table:KDST` (batch 5) attributes the column header 'Table/Description' to the 2025.001 rendering of loio
  `0570bd534f22b44ce10000000a174cb4`. The batch-6 STAS audit found that header only in the **SAP ERP
  6.18.latest** rendering of the same loio; the 2025.001 snippets do not print it. The KDST record quotes
  its own retrieval faithfully and, per the MHIO/IP10 and QMSM precedents, is not edited on the strength of
  another record. A future KDST re-audit should narrow that phrase.
- `table:STAS` — source-tier caveat carried in the record: the second official source, 'BOM Tables'
  (SUPPORT_CONTENT/ldm, loio `3363506418`), is Support Content, not release-bound product documentation;
  its `versionId` is 1.0 and it carries no S/4HANA release stamp. Its `edition: on-premise` is the phase
  default from `audit/s4-enrichment/MANIFEST.md`, not a statement of the page. The 2025 FPS01 half of
  `status.he` rests on the archiving page alone, which is where `status.source` points.
- `table:QPCD` — transaction attribution contested and undecided: the blueprint's tcodes column reads
  `QS51; QS61` while its own alternative column reads `QS41/QS51`; `data/tx-intel.ts` describes QS41 as
  catalog/code-group/code maintenance and QS51 as selected-set maintenance; and the official migration page
  prints `App: Edit Code Groups (QS41) Display Code Groups (QS42)`. All of these tx ids are in the xrefs and
  the record does not decide the point. Fixing the blueprint's tcodes column is a separate task.
- `table:QPCD` — the text tables `QPCT` and `QPGT` appear in `data/tx-intel.ts` (QS41's table list) but are
  outside the id universe and were not officially verified, so neither is an xref. No official VDM record
  was found for a CDS view over catalog codes, and `data/fiori/apps.ts` has no catalog/code-group app, so
  the record carries neither a `cds:` nor a `fiori:` xref. Also unresolved at the official layer: the only
  page naming QPCD names it as the **DMS object-link object**, not as a transparent table, so the record's
  `status.he` deliberately separates "the identifier and the catalog functionality are official" from "the
  table itself is repository-level".
- `table:QMAT` vs `data/table-tcodes.json` — **queued correction, tables catalog data.** The catalog
  records `QM01, MM02` for QMAT, but QM01 creates a quality notification and has nothing to do with
  inspection-setup maintenance; the official path is the Quality Management view of the material master
  (MM01/MM02/MM03) and the mass transaction QA08. Not fixed here as a side effect of this batch.
- `table:QMAT` — open contradiction **inside** the official documentation, quoted and left unreconciled:
  'Material inspection setup (deprecated)' (Migration Objects for SAP S/4HANA, versionId 2021.002, loio
  `5f7348366b564e98adf31919c52a10b8`) carries "Caution This migration object is deprecated", while
  'Control Parameter Tasks' at 2025.001 (loio `c96e2251b685400faff99a8d2637d294`) still uses "the migration
  object Material Inspection Setup" as its worked example. The record recommends migrating inspection setup
  as part of the `Product` object and verifying the target release's migration-object list.
- `table:QMAT` — IDoc gap: the only official 2025.001 page that names a message type for ALE distribution
  of the inspection setup is 'Master Data Synchronization' (EWM, loio
  `4259ef399b5f40d2a39b2d0cc39d1d92`), and it names **MATQM**, not MATMAS. MATQM is absent from the id
  universe (`lib/route-manifest.generated.ts` idocs = LOIPRO, MATMAS), so the record carries **no** idoc
  xref; the draft's `idoc:msg:MATMAS` xref was removed rather than kept as context, because no official
  source ties inspection-setup segments to MATMAS.
- `table:QMAT` — repository attribution corrected before writing: the string
  'סוג בדיקה 04 = ייצור, 01 = קבלת סחורה (תלוי הגדרה)' lives in `data/table-enrichment.ts#QMAT`
  (`perfNotes`) only, **not** in `data/consultant-notes.ts#QMAT`. The numbering itself *is* corroborated
  officially — 'EWM-QM Integration Without Inspection Rules' (What's New in SAP S/4HANA 1909, versionId
  1909.000, loio `d43aa8aceaa042988ea35ace50de0335`): "In EWM the inspection types 01 (Goods receipt insp.
  for purchase order), 04 (Goods receipt inspection from production), 08 (Stock transfer inspection) and
  09 (Recurring inspection of batches) are supported" — but that is an EWM-context statement, not a
  statement about field ART of QMAT. The open gap is narrowed accordingly, not closed.
- `table:QMAT`, `table:QMUR` — the cover date of the 2025 FPS01 Simplification List is **not** established.
  The PDF text layer prints two conflicting strings (`Document Version: 1.36– 2026-20-02` and
  `2026-18-02`); Document Version 1.36, 1,514 pages and md5 `c1ccf8ebcd92d51fdc80e4b4873f3b73` are all
  measured and confirmed. No date is asserted in either record.
- Depth ceiling, measured 2026-09-15 after the merge: six of the seven records stay at **L1** and one rises
  to **L5**. `components/neo-shell/data/tables-detail.ts` counts only fields carrying BOTH `dt` and `len`,
  and the threshold for tables is 5. Measured typed-field counts: COBRA 0, QMUR 0, QPCD 0, STPU 3, STZU 4,
  QMAT 4, **STAS 5**. Raising the other six needs SE11 or an official field list, not more evidence. The
  tables coverage row therefore moves only on STAS: L3 5 → 4 and L5 25 → 26 (total 105, L1 75, verified
  105, all measured with `npm run report:coverage -- --catalog tables`).

## batch 7 (2026-09-15) — 8 audited, 8 written, 0 refuted

Records written: `table:CRFH`, `table:FHMI`, `table:AFFH`, `table:AFWI`, `table:CRCA`, `table:KAKO`,
`table:KAZT`, `table:CRVD_A` — the production resource/tool family (CRFH, FHMI, AFFH, AFWI, CRVD_A) plus the
work-center capacity family (CRCA, KAKO, KAZT). Six were merged from the verdict's `fixedRecord`;
`table:AFFH` and `table:CRCA` had no `fixedRecord` and were rebuilt from the draft with every listed
downgrade applied (see below). Four of the eight carry the token **`unchanged`** at edition on-premise with
an authored `status.source` (CRFH and KAKO and CRCA at release 2025.001, AFFH at 2023.latest — the only
releases in which the search index publishes a page naming those tables). The other four carry
**`verification_required`** with `release: null` and `source: null`, on the `table:PLZU` precedent: no
official page names FHMI, AFWI, KAZT or CRVD_A, and for three of them the official documentation attributes
the same content to a *different* technical name (PLFH for task-list PRT assignment, AFWIS for the
postprocessed backflush record, KAZY + KAPA for capacity intervals and shift values).

### refuted / needs new evidence (batch 7)

- None. All eight drafts survived the adversarial gate.

### downgrades applied by the writer where the verdict supplied no fixedRecord (batch 7)

- `table:AFFH` — six writer-applied corrections, each from the verdict's downgrade list: (1) the
  Simplification-List evidence `release` changed from `2025.001` (a search versionId, wrong for a PDF) to
  **`2025 FPS01`**, matching every other citation of `SIMPL_OP2025.pdf` in `data/verification/*.ts`;
  (2) its `sourceTitle` extended with the item + printed-page anchors the house style requires
  (`· item 10.1.59 … p. 903 · item 13.12.3 … p. 1202`); (3) `status.recommendedAction` no longer asserts
  "שיוך ה-PRT נעשה במתכון האב" bare — the assertion now carries its own pointer (`loio
  da7919e9f4874f7bbdd56e8adac25f65`, 2025.001), because none of the four cited evidences says where PRTs
  *are* assigned, only that they cannot be used in the process order; (4) the notes' claim that the
  `descriptionEn` defect is "אותה תקלה בדיוק" as PLZU and FHMI is corrected to "תקלה מאותו סוג" (measured:
  those two read `Task list type`, AFFH reads `Routing number`); (5) the near-match examples for the
  version-filtered AFFH query are corrected from "AFFW / affa" to the two the query actually returns,
  **AFFHD** (Archiving Operative Project Structures, PS-ST-OPR) and **AFFHB** (Executing a Comparison);
  (6) `accessedAt` uses the file's `DATE4` constant instead of a literal, as batches 3-6 do.
- `table:CRCA` — six writer-applied corrections: (1) `status.recommendedAction` no longer says the
  Simplification List puts "CM21, CM22, CM23, CM25, CM29 ו-MF50" in the compatibility scope. The body of
  item 30.35 names CM21/CM22/CM23/CM25 "etc"; the six-transaction list comes from the item's KEYWORDS line;
  and on MF50 the document says the opposite — "The transaction MF50 will continue to be available, but the
  graphical planning table can only be used as part of the SAP S/4HANA compatibility scope". Both facts are
  now stated separately. (2) The same distinction added to `notes`, so notes and recommendedAction stop
  disagreeing about what the document says. (3) `A_WorkCenterAllCapacity_2` / `API_WORK_CENTERS` now carries
  the flag "(עמוד שאינו מצוטט כראיה ברשומה זו)", matching the flag already used for `I_Capacity` in the same
  paragraph. (4) `notes` records the page behind it (`Create Capacity Assignment`, 2025.001, loio
  `027539bbfd124134a6d410030e5128fd`, snippet `Request URL -POST <host>/sap/opu/odata/SAP/API_WORK_CENTERS/
  A_WorkCenterAllCapacity_2`). (5) An xref-justification line added: `table:KAZT` and `tx:CM01` are
  navigation links from the repository layer only, named in no official source cited here; `CRC1`/`CRC3` and
  `IR01` follow the `table:CRHD` formula. (6) The Fiori sentence now carries the one official anchor that
  exists — item 30.35 naming *Manage Work Center Capacity* as a replacement app — while still stating that
  no official source ties **F3289 to table CRCA** and that `data/fiori/apps.ts#F3289` lists only CRHD and
  KAKO.

### batch 7 (2026-09-15) open conflicts, recorded in the written records' notes

- `table:CRFH` / `table:AFFH` — **PP-PI functional restriction, documented and unresolved by the blueprint.**
  Official 2025 FPS01 pages in the Production Planning and Control deliverable state repeatedly that PRTs
  cannot be used in the process order: `f984bf53f106b44ce10000000a174cb4` ("As PRTs cannot be used in process
  orders in Release 4.0, this data does not have any functional significance in PP-PI"),
  `e184bf53f106b44ce10000000a174cb4` (usage value and formula), `de84bf53f106b44ce10000000a174cb4` (release
  for production), and the API page `da7919e9f4874f7bbdd56e8adac25f65` ("production resources/tools for
  process manufacturing are assigned to the master recipe and not to the process order … Any operation you
  would perform on the A_ProcessOrderProdnRsceTools_2 entity will result in empty responses"). The PP-PI
  blueprint nevertheless places CRFH and AFFH in the process-order topic and gives AFFH the transaction
  `COR2`. The records quote the restriction; the blueprint rows are **not** corrected here.
- `table:CRFH`, `table:AFFH` — **transaction-code conflict confined to the blueprint sheet.**
  `data/sapData.pppi.ts` writes `CFC1, CFC2, CFC3` for CRFH and `COR2, CFC2` for AFFH. The official
  migration-object page names `CF02` (change) and `CF03` (display), and the repository's own enrichment
  layer already agrees: `data/table-enrichment.ts#CRFH` writes "אמצעי עזר (CF01/CF02/CF03) = CRFH" and
  `data/knowledge/object-intel.ts` uses CF01/CF02. A dedicated CFC1/CFC2/CFC3 search returns nothing tying
  them to PRT maintenance (the only CFC-pattern hits are CFC9 in the PP/DS CIF context). CF01/CF02/CF03 are
  absent from `lib/route-manifest.generated.ts`, so they are text-only in the records and carry no `tx:`
  xref. Correction belongs in the workbook, not in the verification layer.
- `table:CRFH` — **`FHMI` join unverified.** The blueprint declares FHMI the parent of CRFH with
  `FROM FHMI JOIN CRFH ON FHMI.FHMNR = CRFH.FHMNR`, but the official Product Master page
  (`8915c453f57eb44ce10000000a174cb4`) presents FHMI as a *material type*, not a table. The `table:FHMI`
  xref is kept because the id exists in the dataset and covers the same domain — explicitly **not** as
  confirmation of the join.
- `table:FHMI` — **the central open question: is there a DDIC object named FHMI at all?** Twelve search runs
  across three product scopes (S/4HANA On-Premise 2025 FPS01, SAP ERP 6.0 EHP8, S/4HANA Cloud Public Edition
  2608.500) plus a domain-restricted web search return the string only as a material type / product category.
  Needs SE11 or ADT. A second, internal contradiction is also open:
  `data/knowledge/pppi-objects-ext.ts:37` reads FHMI as *material-based* PRT master data (matching the
  official pages), while `data/knowledge/object-intel.ts:102` reads it as *equipment* PRT and attributes
  `BAPI_PRT_FHM_CREATE` / `_GETDETAIL` / `_CHANGE` and transactions CR01/CR02 to it — none of which any
  official page returned in this round.
- `table:AFWI` — **the table name is absent from every official channel checked.** 49 search records across
  three product scopes carry no token `AFWI`; the nearest match is the *different* technical name **AFWIS**
  ("Postprocessed single postprocessing record") in two PP-REM archiving pages
  (`d0a4b9537cceb44ce10000000a174cb4`, `c96bb6531de6b64ce10000000a174cb4`). The 2025 FPS1 Simplification
  List, read in full, contains AFWI/AFWIS/AFFW/AFRU zero times (MKPF 48, MATDOC 84). Deliberately **not**
  inferred: that the MM-IM item 15.3.1 (MKPF/MSEG → MATDOC) implies a change to AFWI. Two repository
  readings also disagree and are recorded unresolved — `object-intel` calls AFWI the failed-movement /
  reprocessing table while `table-enrichment` calls it the posted-movement bridge; the official VDM view
  `I_FailedGoodsMovementItem` (loio `80069c6f8e11412888f21997e933596a`) attributes failed goods-movement
  items to **AFFW**, not AFWI. The blueprint's English labels for RUECK and RMZHL are also inverted relative
  to its own Hebrew labels.
- `table:KAKO`, `table:KAZT` — **KAZT vs KAZY, the batch's sharpest data-quality finding.** Three
  independent official channels name **KAZY** for available-capacity intervals: the PP_WKC archiving list
  ("Intervals of available capacity (KAZY)"), the VDM page `I_AvailableCapacityInterval`
  (`d4d187afb3cd4edc88c1c1b9fc1316a3`, "interval data (table KAZY)"), and the migration page
  `Work center/Resource` (`d1c46c79ab034062a3ded5bb8ab3e79f`, structure "Interval of Available Capacity
  (S_KAZY)"). Shift values are attributed to **KAPA**. The string KAZT appears in no official page and in no
  Simplification List read. `table:KAZT` is kept as an xref from KAKO and CRCA only because the id exists in
  the dataset; whether KAZT is an alias, a historical name or a dataset error needs SE11. `data/cds-map.ts`
  additionally maps `I_WorkCenterCapacity` to KAKO + KAZT + CRCA, while the official VDM page for that view
  names only `table CRCA` — a project-level mapping, not a verified fact.
- `table:CRCA`, `table:KAKO` — **key-field disagreement inside the repository.** For CRCA,
  `data/sapData.pppi.ts` writes OBJTY/OBJID/**CAPID** (KAPID as FK) while `data/table-enrichment.ts#CRCA`
  writes MANDT/OBJTY/OBJID/**CANUM**; no official source names a single DDIC field of the table. For KAKO,
  the blueprint's four fields (KAPID, KAPAR, AZNOR, NGRAD) omit **NAME** and **WERKS**, which the official
  value-help page `6b1398a0a8304a5c93f14c7d22b155b0` states explicitly as "the semantic key (KAKO-NAME and
  KAKO-WERKS)". Field lists stay at verification level "needs SE11".
- `table:CRVD_A` — **two incompatible repository readings, undecided.** `data/sapData.pppi.ts`,
  `data/table-titles.json` and `data/knowledge/pppi-objects-ext.ts` read CRVD_A as work-center / PI-resource
  default values (OBJTY, OBJID, STEUS; CR02/CR03); `data/knowledge/object-intel.ts` and two QM-book chapters
  read it as a PRT-to-document link alongside CRVD_B (CF01/CF02/CF03). No official page names the table in
  either scope searched. The record states the decisive test — the value of **OBJTY** stored in it ("A" =
  work center/resource, "FH" = PRT) — and recommends a Where-Used before any conversion. The PP_WKC archiving
  table list (CRHD, CRTX, CRCO, T705R, T705X, VERTE, VERFT, HRP1001, CRCA, KAKO, KAKT + archiving classes
  CLASSIFY, CHANGEDOCU, TEXT) does **not** include CRVD_A: an indication against the work-center reading, not
  a decision, because the snippets are truncated.
- `table:CRFH` — **CRVD_A xref rests on one side of that same disagreement.** It is written from the
  `object-intel` (PRT version data) reading plus the id's existence in the dataset; `data/sapData.pppi.ts`
  reads CRVD_A as work-center defaults with CR02/CR03. Recorded in the CRFH notes.
- Fiori id gaps carried, none invented: **F5241** is the id the official Maintenance Management page gives
  *Manage Maintenance Orders*, while `data/fiori/apps.ts` gives that name **F2731** — AFFH keeps F2731 as a
  repository-level xref, exactly as `table:AFVC` decided. **F5381** (Mass Maintenance Of Work Center
  Capacities) and **F3770** (Capacity Planning Table) appear in official snippets but are absent from
  `data/fiori/apps.ts`, so neither is an xref. Conversely the F3951 naming gap is **closed**, not left open:
  the documentation table at the end of Simplification item 9.5.4 prints App "Capacity Planning Board" |
  Fiori-ID "F3951" | SAP Help "Capacity Scheduling Board | SAP Help Portal" — and "Capacity Scheduling Board"
  is exactly the name `data/fiori/apps.ts` carries. No Fiori app for PRTs exists in the dataset, and the
  What's New 2021 record `b943abafa1dc4f7f9c48e6301055ab64` names no F-id, so CRFH carries no `fiori:` xref.
- `descriptionEn` column defect, now seen in five more rows: CRFH ("Object type (F=PRT)"), FHMI and PLZU ("Task list
  type"), AFFH ("Routing number"), CRCA and CRVD_A ("Object type"), KAKO and KAZT ("Capacity ID").
  In every case the first field's label was copied into the table-description column of the workbook. A
  workbook fix, deliberately not patched in the verification layer.
- **Depth ceiling, measured 2026-09-15 after the merge.** Seven of the eight records sit at **L1** and one at
  **L2**: `components/neo-shell/data/tables-detail.ts` counts only fields carrying BOTH `dt` and `len`, and
  the tables threshold is 5. Measured typed-field counts: AFWI 0, AFFH 3, CRVD_A 3, CRFH 4, FHMI 4, CRCA 4,
  KAKO 4, **KAZT 6**. KAZT therefore *moves down*, L3 → L2, and that is the honest consequence of the record:
  it previously reached L3 on a blueprint-derived `unchanged` verdict, and `depthOf` caps an authored
  `verification_required` at L2. Raising any of the eight to L3+ needs SE11 or an official field list, not
  more citations. The tables coverage row after the merge: total 105 unchanged, L1 75 unchanged, L2 0 → 1,
  L3 4 → 3, L5 26 unchanged, verified 105 unchanged, **s4-applicable 103 → 99** (the four new
  `verification_required` statuses leave the s4-applicable set), all measured with
  `npm run report:coverage -- --catalog tables`.
