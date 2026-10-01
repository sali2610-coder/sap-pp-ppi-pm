# מרשם: כתובות ישנות שמגיעות למדור ב־NEO ולא לעמוד משלהן

נוצר מדוח ההפניות של הייצוא, עמוד אחרי עמוד (`neo-redesign-evidence/legacy-links/redirect-report.r3.json`, ש־`scripts/gen-legacy-redirects.mjs` כותב), ומהעמודים הישנים עצמם, שעדיין נבנים ורק מופנים. הכלי: `neo-redesign-evidence/tools/legacy-register.py`. עותק לקריאת מכונה: `legacy-register.csv` לצד הקובץ הזה.

**465 עמודים.** אף אחד מהם אינו גמור: כל אחד מגיע למדור הקרוב ב־NEO ולא לעמוד משלו, והתוכן של העמוד הישן לא מוצג ב־NEO. הנתונים נשארו במאגר, ושום דבר לא נמחק.

איך נקבעות העמודות (כללים, לא שיקול לכל עמוד):

- **נדרש עמוד מדויק:** `כן` כשהעמוד הוא רשומה (אובייקט SAP אחד, הערה, Exit, תהליך או שיעור) ויש בו 300 תווי טקסט משלו או יותר; `לבדיקה` כשזו רשומה עם פחות טקסט, כשזה דף קורס ישן שהקורס ב־NEO אולי מכסה, או כשהעמוד לא נמצא; `החלטת בעלים` לכלים, ללוחות ולדוחות, שאינם רשומות ידע.
- **עדיפות:** P1 למשפחות שיועץ מגיע אליהן מהחיפוש או מקישור בתוכן (קודי הטרנזקציה של הבלופרינט, SAP Notes, Exits, ההשוואה בין ECC ל־S/4, הפתרונות); P2 לתוכן לימוד ותהליכים; P3 לכלים, ללוחות ולעמודי הקונספט הישנים. לפי משפחה:
  - P1: `/ecc-s4/`, `/exits/`, `/sap-notes/`, `/solutions/`, `/tcode/`
  - P2: `/learn/`, `/library/academy/`, `/library/pp/object/`, `/oic/`, `/pm/…`, `/pp-pi/…`, `/process-explorer/`, `/process/`, `/security/`
  - P3: `/guides/`, `/qa-testing/`, `/story/`, `/workbench/`, וכל משפחה שלא נמנתה כאן
- **משפחות של רשומות** (השאר כלים ולוחות, החלטת בעלים): `/ecc-s4/`, `/exits/`, `/guides/`, `/learn/`, `/library/pp/object/`, `/oic/`, `/pm/…`, `/pp-pi/…`, `/process-explorer/`, `/process/`, `/qa-testing/`, `/sap-notes/`, `/security/`, `/solutions/`, `/story/`, `/tcode/`. קוד ב־`/tcode/` שהוא שם מהדורה או מוצר (ECC, S4, S4HANA, SAP) מסומן `לבדיקה`.
- **החלטת הבעלים:** נדרשת בכל שורה: להעביר את התוכן לעמוד NEO מדויק, או לאשר את ההפניה למדור.

סך הכול: נדרש עמוד מדויק `כן` 202, ‏`לבדיקה` 233, ‏`החלטת בעלים` 30. עדיפות P1 110, ‏P2 309, ‏P3 46.

## לפי משפחה

| משפחה | עמודים | נדרש עמוד מדויק: כן / לבדיקה / החלטת בעלים | היעד כיום | עדיפות |
|---|---|---|---|---|
| `/library/pp/object/` | 208 | 1 / 207 / 0 | `/neo/academy/pp-pi/` (208) | P2 |
| `/tcode/` | 32 | 31 / 1 / 0 | `/neo/transactions/` (32) | P1 |
| `/exits/` | 28 | 28 / 0 / 0 | `/neo/enhancements/` (28) | P1 |
| `/sap-notes/` | 22 | 22 / 0 / 0 | `/neo/incidents/` (22) | P1 |
| `/process/` | 19 | 18 / 1 / 0 | `/neo/domain-model/` (19) | P2 |
| `/learn/` | 18 | 10 / 8 / 0 | `/neo/academy/` (12), `/neo/academy/pm/` (5), `/neo/academy/pp-pi/` (1) | P2 |
| `/pm/…` | 15 | 12 / 3 / 0 | `/neo/pm/` (15) | P2 |
| `/pp-pi/…` | 15 | 12 / 3 / 0 | `/neo/pp-pi/` (15) | P2 |
| `/solutions/` | 15 | 15 / 0 / 0 | `/neo/best-practices/` (15) | P1 |
| `/ecc-s4/` | 13 | 12 / 1 / 0 | `/neo/s4-readiness/` (13) | P1 |
| `/oic/` | 13 | 13 / 0 / 0 | `/neo/knowledge/` (13) | P2 |
| `/qa-testing/` | 10 | 10 / 0 / 0 | `/neo/centers/` (10) | P3 |
| `/library/academy/` | 9 | 0 / 9 / 0 | `/neo/fiori-apps/` (1), `/neo/academy/mm/` (1), `/neo/academy/pm/` (1), `/neo/academy/pm-user/` (1), `/neo/academy/pp-pi/` (1), `/neo/academy/pp-ds/` (1), `/neo/academy/qm/` (1), `/neo/academy/sop/` (1), `/neo/academy/wm/` (1) | P2 |
| `/security/` | 7 | 7 / 0 / 0 | `/neo/centers/process-auth/` (7) | P2 |
| `/process-explorer/` | 5 | 5 / 0 / 0 | `/neo/domain-model/` (5) | P2 |
| `/design/` | 4 | 0 / 0 / 4 | `/neo/` (4) | P3 |
| `/guides/` | 4 | 4 / 0 / 0 | `/neo/centers/` (4) | P3 |
| `/workbench/` | 4 | 0 / 0 / 4 | `/neo/centers/debugging/` (1), `/neo/centers/` (3) | P3 |
| `/story/` | 2 | 2 / 0 / 0 | `/neo/domain-model/` (2) | P3 |
| `/academy/` | 1 | 0 / 0 / 1 | `/neo/academy/` (1) | P3 |
| `/alm/` | 1 | 0 / 0 / 1 | `/neo/` (1) | P3 |
| `/connector/` | 1 | 0 / 0 / 1 | `/neo/` (1) | P3 |
| `/delivery/` | 1 | 0 / 0 / 1 | `/neo/centers/toolkit/` (1) | P3 |
| `/evolution/` | 1 | 0 / 0 / 1 | `/neo/` (1) | P3 |
| `/graph/` | 1 | 0 / 0 / 1 | `/neo/erd/` (1) | P3 |
| `/import/` | 1 | 0 / 0 / 1 | `/neo/` (1) | P3 |
| `/knowledge/` | 1 | 0 / 0 / 1 | `/neo/knowledge/` (1) | P3 |
| `/library/mm-quality-report/` | 1 | 0 / 0 / 1 | `/neo/academy/mm/` (1) | P3 |
| `/library/pm-quality-report/` | 1 | 0 / 0 / 1 | `/neo/academy/pm/` (1) | P3 |
| `/library/pmu-quality-report/` | 1 | 0 / 0 / 1 | `/neo/academy/pm-user/` (1) | P3 |
| `/library/pp-quality-report/` | 1 | 0 / 0 / 1 | `/neo/academy/pp-pi/` (1) | P3 |
| `/library/ppds-quality-report/` | 1 | 0 / 0 / 1 | `/neo/academy/pp-ds/` (1) | P3 |
| `/library/qm-quality-report/` | 1 | 0 / 0 / 1 | `/neo/academy/qm/` (1) | P3 |
| `/library/sop-quality-report/` | 1 | 0 / 0 / 1 | `/neo/academy/sop/` (1) | P3 |
| `/library/wm-quality-report/` | 1 | 0 / 0 / 1 | `/neo/academy/wm/` (1) | P3 |
| `/lineage/` | 1 | 0 / 0 / 1 | `/neo/erd/` (1) | P3 |
| `/notes-graph/` | 1 | 0 / 0 / 1 | `/neo/knowledge/` (1) | P3 |
| `/onboarding/` | 1 | 0 / 0 / 1 | `/neo/academy/` (1) | P3 |
| `/quality-audit/` | 1 | 0 / 0 / 1 | `/neo/s4-readiness/` (1) | P3 |
| `/sap-infrastructure/` | 1 | 0 / 0 / 1 | `/neo/` (1) | P3 |
| `/verification/` | 1 | 0 / 0 / 1 | `/neo/s4hana/` (1) | P3 |

## כל העמודים

| # | הכתובת הישנה | היעד כיום | משפחה | טקסט משלו (תווים) | נדרש עמוד מדויק | עדיפות | החלטת הבעלים |
|---|---|---|---|---|---|---|---|
| 1 | `/ecc-s4/atp/` | `/neo/s4-readiness/` | `/ecc-s4/` | 376 | כן | P1 | נדרשת |
| 2 | `/ecc-s4/batch-management-s4/` | `/neo/s4-readiness/` | `/ecc-s4/` | 282 | לבדיקה | P1 | נדרשת |
| 3 | `/ecc-s4/capacity-planning-s4/` | `/neo/s4-readiness/` | `/ecc-s4/` | 407 | כן | P1 | נדרשת |
| 4 | `/ecc-s4/embedded-analytics/` | `/neo/s4-readiness/` | `/ecc-s4/` | 410 | כן | P1 | נדרשת |
| 5 | `/ecc-s4/ewm/` | `/neo/s4-readiness/` | `/ecc-s4/` | 362 | כן | P1 | נדרשת |
| 6 | `/ecc-s4/fiori/` | `/neo/s4-readiness/` | `/ecc-s4/` | 418 | כן | P1 | נדרשת |
| 7 | `/ecc-s4/foreign-trade/` | `/neo/s4-readiness/` | `/ecc-s4/` | 342 | כן | P1 | נדרשת |
| 8 | `/ecc-s4/material-ledger/` | `/neo/s4-readiness/` | `/ecc-s4/` | 466 | כן | P1 | נדרשת |
| 9 | `/ecc-s4/notifications-s4/` | `/neo/s4-readiness/` | `/ecc-s4/` | 321 | כן | P1 | נדרשת |
| 10 | `/ecc-s4/output-management/` | `/neo/s4-readiness/` | `/ecc-s4/` | 390 | כן | P1 | נדרשת |
| 11 | `/ecc-s4/plant-maintenance-s4/` | `/neo/s4-readiness/` | `/ecc-s4/` | 391 | כן | P1 | נדרשת |
| 12 | `/ecc-s4/pp-ds/` | `/neo/s4-readiness/` | `/ecc-s4/` | 375 | כן | P1 | נדרשת |
| 13 | `/ecc-s4/production-order-s4/` | `/neo/s4-readiness/` | `/ecc-s4/` | 436 | כן | P1 | נדרשת |
| 14 | `/exits/BADI-EAM-TOB/` | `/neo/enhancements/` | `/exits/` | 506 | כן | P1 | נדרשת |
| 15 | `/exits/CMOD-SMOD/` | `/neo/enhancements/` | `/exits/` | 305 | כן | P1 | נדרשת |
| 16 | `/exits/CONFPM01/` | `/neo/enhancements/` | `/exits/` | 534 | כן | P1 | נדרשת |
| 17 | `/exits/CONFPP01/` | `/neo/enhancements/` | `/exits/` | 559 | כן | P1 | נדרשת |
| 18 | `/exits/CONFPP05/` | `/neo/enhancements/` | `/exits/` | 504 | כן | P1 | נדרשת |
| 19 | `/exits/IEQM0001/` | `/neo/enhancements/` | `/exits/` | 537 | כן | P1 | נדרשת |
| 20 | `/exits/IMRC0001/` | `/neo/enhancements/` | `/exits/` | 499 | כן | P1 | נדרשת |
| 21 | `/exits/IPRM0001/` | `/neo/enhancements/` | `/exits/` | 470 | כן | P1 | נדרשת |
| 22 | `/exits/ITOB0001/` | `/neo/enhancements/` | `/exits/` | 511 | כן | P1 | נדרשת |
| 23 | `/exits/IWO10009/` | `/neo/enhancements/` | `/exits/` | 673 | כן | P1 | נדרשת |
| 24 | `/exits/IWO10012/` | `/neo/enhancements/` | `/exits/` | 503 | כן | P1 | נדרשת |
| 25 | `/exits/IWO10018/` | `/neo/enhancements/` | `/exits/` | 666 | כן | P1 | נדרשת |
| 26 | `/exits/M61X0001/` | `/neo/enhancements/` | `/exits/` | 588 | כן | P1 | נדרשת |
| 27 | `/exits/MB-MIGO-BADI/` | `/neo/enhancements/` | `/exits/` | 565 | כן | P1 | נדרשת |
| 28 | `/exits/MBCF0002/` | `/neo/enhancements/` | `/exits/` | 587 | כן | P1 | נדרשת |
| 29 | `/exits/MD-ADD-ELEMENTS/` | `/neo/enhancements/` | `/exits/` | 558 | כן | P1 | נדרשת |
| 30 | `/exits/MD-PLDORD-POST/` | `/neo/enhancements/` | `/exits/` | 532 | כן | P1 | נדרשת |
| 31 | `/exits/NOTIF-EVENT-SAVE/` | `/neo/enhancements/` | `/exits/` | 560 | כן | P1 | נדרשת |
| 32 | `/exits/PCSD0002/` | `/neo/enhancements/` | `/exits/` | 470 | כן | P1 | נדרשת |
| 33 | `/exits/PPCO0001/` | `/neo/enhancements/` | `/exits/` | 597 | כן | P1 | נדרשת |
| 34 | `/exits/PPCO0007/` | `/neo/enhancements/` | `/exits/` | 469 | כן | P1 | נדרשת |
| 35 | `/exits/PPCO0021/` | `/neo/enhancements/` | `/exits/` | 483 | כן | P1 | נדרשת |
| 36 | `/exits/QQMA0001/` | `/neo/enhancements/` | `/exits/` | 548 | כן | P1 | נדרשת |
| 37 | `/exits/QQMA0014/` | `/neo/enhancements/` | `/exits/` | 460 | כן | P1 | נדרשת |
| 38 | `/exits/SAPLV01Z/` | `/neo/enhancements/` | `/exits/` | 569 | כן | P1 | נדרשת |
| 39 | `/exits/WORKORDER-CONFIRM/` | `/neo/enhancements/` | `/exits/` | 579 | כן | P1 | נדרשת |
| 40 | `/exits/WORKORDER-GOODSMVT/` | `/neo/enhancements/` | `/exits/` | 500 | כן | P1 | נדרשת |
| 41 | `/exits/WORKORDER-UPDATE/` | `/neo/enhancements/` | `/exits/` | 683 | כן | P1 | נדרשת |
| 42 | `/sap-notes/authorization-org-level/` | `/neo/incidents/` | `/sap-notes/` | 590 | כן | P1 | נדרשת |
| 43 | `/sap-notes/backflush-cogi-affw/` | `/neo/incidents/` | `/sap-notes/` | 750 | כן | P1 | נדרשת |
| 44 | `/sap-notes/batch-determination-strategy/` | `/neo/incidents/` | `/sap-notes/` | 685 | כן | P1 | נדרשת |
| 45 | `/sap-notes/capacity-leveling/` | `/neo/incidents/` | `/sap-notes/` | 542 | כן | P1 | נדרשת |
| 46 | `/sap-notes/confirmation-period-mmrv/` | `/neo/incidents/` | `/sap-notes/` | 576 | כן | P1 | נדרשת |
| 47 | `/sap-notes/cvi-bp-sync-note/` | `/neo/incidents/` | `/sap-notes/` | 551 | כן | P1 | נדרשת |
| 48 | `/sap-notes/fiori-odata-activation-note/` | `/neo/incidents/` | `/sap-notes/` | 564 | כן | P1 | נדרשת |
| 49 | `/sap-notes/goods-movement-deficit/` | `/neo/incidents/` | `/sap-notes/` | 610 | כן | P1 | נדרשת |
| 50 | `/sap-notes/idoc-51-application-error/` | `/neo/incidents/` | `/sap-notes/` | 636 | כן | P1 | נדרשת |
| 51 | `/sap-notes/matdoc-inventory-s4/` | `/neo/incidents/` | `/sap-notes/` | 649 | כן | P1 | נדרשת |
| 52 | `/sap-notes/material-ledger-actual-costing-s4/` | `/neo/incidents/` | `/sap-notes/` | 671 | כן | P1 | נדרשת |
| 53 | `/sap-notes/matnr-custom-code-note/` | `/neo/incidents/` | `/sap-notes/` | 570 | כן | P1 | נדרשת |
| 54 | `/sap-notes/no-fi-doc-update-termination/` | `/neo/incidents/` | `/sap-notes/` | 656 | כן | P1 | נדרשת |
| 55 | `/sap-notes/order-settlement-rule-period/` | `/neo/incidents/` | `/sap-notes/` | 630 | כן | P1 | נדרשת |
| 56 | `/sap-notes/pm-order-release-permit/` | `/neo/incidents/` | `/sap-notes/` | 647 | כן | P1 | נדרשת |
| 57 | `/sap-notes/production-version-mandatory-s4/` | `/neo/incidents/` | `/sap-notes/` | 711 | כן | P1 | נדרשת |
| 58 | `/sap-notes/qm-inspection-lot-not-created/` | `/neo/incidents/` | `/sap-notes/` | 610 | כן | P1 | נדרשת |
| 59 | `/sap-notes/qm-results-out-of-spec-note/` | `/neo/incidents/` | `/sap-notes/` | 510 | כן | P1 | נדרשת |
| 60 | `/sap-notes/qm-ud-stock-block/` | `/neo/incidents/` | `/sap-notes/` | 582 | כן | P1 | נדרשת |
| 61 | `/sap-notes/queue-eoio-blocked-note/` | `/neo/incidents/` | `/sap-notes/` | 549 | כן | P1 | נדרשת |
| 62 | `/sap-notes/rfc-timeout-note/` | `/neo/incidents/` | `/sap-notes/` | 475 | כן | P1 | נדרשת |
| 63 | `/sap-notes/update-termination-note/` | `/neo/incidents/` | `/sap-notes/` | 600 | כן | P1 | נדרשת |
| 64 | `/solutions/authorization/` | `/neo/best-practices/` | `/solutions/` | 676 | כן | P1 | נדרשת |
| 65 | `/solutions/batch-management/` | `/neo/best-practices/` | `/solutions/` | 833 | כן | P1 | נדרשת |
| 66 | `/solutions/bom/` | `/neo/best-practices/` | `/solutions/` | 728 | כן | P1 | נדרשת |
| 67 | `/solutions/equipment-asset/` | `/neo/best-practices/` | `/solutions/` | 783 | כן | P1 | נדרשת |
| 68 | `/solutions/goods-movement/` | `/neo/best-practices/` | `/solutions/` | 782 | כן | P1 | נדרשת |
| 69 | `/solutions/idoc-integration/` | `/neo/best-practices/` | `/solutions/` | 686 | כן | P1 | נדרשת |
| 70 | `/solutions/label-output/` | `/neo/best-practices/` | `/solutions/` | 713 | כן | P1 | נדרשת |
| 71 | `/solutions/maintenance/` | `/neo/best-practices/` | `/solutions/` | 893 | כן | P1 | נדרשת |
| 72 | `/solutions/mrp/` | `/neo/best-practices/` | `/solutions/` | 751 | כן | P1 | נדרשת |
| 73 | `/solutions/procurement/` | `/neo/best-practices/` | `/solutions/` | 756 | כן | P1 | נדרשת |
| 74 | `/solutions/quality-inspection/` | `/neo/best-practices/` | `/solutions/` | 739 | כן | P1 | נדרשת |
| 75 | `/solutions/sales-order/` | `/neo/best-practices/` | `/solutions/` | 684 | כן | P1 | נדרשת |
| 76 | `/solutions/settlement-costing/` | `/neo/best-practices/` | `/solutions/` | 731 | כן | P1 | נדרשת |
| 77 | `/solutions/stock-overview/` | `/neo/best-practices/` | `/solutions/` | 712 | כן | P1 | נדרשת |
| 78 | `/solutions/workflow/` | `/neo/best-practices/` | `/solutions/` | 644 | כן | P1 | נדרשת |
| 79 | `/tcode/AOBJ/` | `/neo/transactions/` | `/tcode/` | 1549 | כן | P1 | נדרשת |
| 80 | `/tcode/BS02/` | `/neo/transactions/` | `/tcode/` | 1703 | כן | P1 | נדרשת |
| 81 | `/tcode/BS03/` | `/neo/transactions/` | `/tcode/` | 1640 | כן | P1 | נדרשת |
| 82 | `/tcode/BS22/` | `/neo/transactions/` | `/tcode/` | 1711 | כן | P1 | נדרשת |
| 83 | `/tcode/BS23/` | `/neo/transactions/` | `/tcode/` | 1650 | כן | P1 | נדרשת |
| 84 | `/tcode/CC02/` | `/neo/transactions/` | `/tcode/` | 1530 | כן | P1 | נדרשת |
| 85 | `/tcode/CFC1/` | `/neo/transactions/` | `/tcode/` | 1560 | כן | P1 | נדרשת |
| 86 | `/tcode/CFC2/` | `/neo/transactions/` | `/tcode/` | 1623 | כן | P1 | נדרשת |
| 87 | `/tcode/CFC3/` | `/neo/transactions/` | `/tcode/` | 1560 | כן | P1 | נדרשת |
| 88 | `/tcode/CFV1/` | `/neo/transactions/` | `/tcode/` | 1548 | כן | P1 | נדרשת |
| 89 | `/tcode/CFV2/` | `/neo/transactions/` | `/tcode/` | 1548 | כן | P1 | נדרשת |
| 90 | `/tcode/CFV3/` | `/neo/transactions/` | `/tcode/` | 1548 | כן | P1 | נדרשת |
| 91 | `/tcode/DB15/` | `/neo/transactions/` | `/tcode/` | 1549 | כן | P1 | נדרשת |
| 92 | `/tcode/ECC/` | `/neo/transactions/` | `/tcode/` | 1518 | לבדיקה | P1 | נדרשת |
| 93 | `/tcode/IK08/` | `/neo/transactions/` | `/tcode/` | 1542 | כן | P1 | נדרשת |
| 94 | `/tcode/IK21/` | `/neo/transactions/` | `/tcode/` | 1537 | כן | P1 | נדרשת |
| 95 | `/tcode/IK41/` | `/neo/transactions/` | `/tcode/` | 1537 | כן | P1 | נדרשת |
| 96 | `/tcode/IQ01/` | `/neo/transactions/` | `/tcode/` | 1545 | כן | P1 | נדרשת |
| 97 | `/tcode/IQ02/` | `/neo/transactions/` | `/tcode/` | 1545 | כן | P1 | נדרשת |
| 98 | `/tcode/IQ03/` | `/neo/transactions/` | `/tcode/` | 1545 | כן | P1 | נדרשת |
| 99 | `/tcode/IQ08/` | `/neo/transactions/` | `/tcode/` | 1545 | כן | P1 | נדרשת |
| 100 | `/tcode/IQ09/` | `/neo/transactions/` | `/tcode/` | 1545 | כן | P1 | נדרשת |
| 101 | `/tcode/IR02/` | `/neo/transactions/` | `/tcode/` | 1580 | כן | P1 | נדרשת |
| 102 | `/tcode/IR03/` | `/neo/transactions/` | `/tcode/` | 1580 | כן | P1 | נדרשת |
| 103 | `/tcode/KOT2_OPA/` | `/neo/transactions/` | `/tcode/` | 1530 | כן | P1 | נדרשת |
| 104 | `/tcode/OIA1/` | `/neo/transactions/` | `/tcode/` | 1578 | כן | P1 | נדרשת |
| 105 | `/tcode/OIAL/` | `/neo/transactions/` | `/tcode/` | 1515 | כן | P1 | נדרשת |
| 106 | `/tcode/OIM1/` | `/neo/transactions/` | `/tcode/` | 1603 | כן | P1 | נדרשת |
| 107 | `/tcode/OIMR/` | `/neo/transactions/` | `/tcode/` | 1578 | כן | P1 | נדרשת |
| 108 | `/tcode/OIN4/` | `/neo/transactions/` | `/tcode/` | 1544 | כן | P1 | נדרשת |
| 109 | `/tcode/OIOA/` | `/neo/transactions/` | `/tcode/` | 1518 | כן | P1 | נדרשת |
| 110 | `/tcode/SPRO/` | `/neo/transactions/` | `/tcode/` | 1691 | כן | P1 | נדרשת |
| 111 | `/learn/onboarding-org/` | `/neo/academy/` | `/learn/` | 80 | לבדיקה | P2 | נדרשת |
| 112 | `/learn/pm-ecc-s4/` | `/neo/academy/pm/` | `/learn/` | 651 | כן | P2 | נדרשת |
| 113 | `/learn/pm-execution/` | `/neo/academy/pm/` | `/learn/` | 660 | כן | P2 | נדרשת |
| 114 | `/learn/pm-fundamentals/` | `/neo/academy/pm/` | `/learn/` | 524 | כן | P2 | נדרשת |
| 115 | `/learn/pm-planning/` | `/neo/academy/pm/` | `/learn/` | 641 | כן | P2 | נדרשת |
| 116 | `/learn/pm-troubleshooting/` | `/neo/academy/pm/` | `/learn/` | 64 | לבדיקה | P2 | נדרשת |
| 117 | `/learn/pp-ecc-s4/` | `/neo/academy/` | `/learn/` | 503 | כן | P2 | נדרשת |
| 118 | `/learn/pp-execution/` | `/neo/academy/` | `/learn/` | 637 | כן | P2 | נדרשת |
| 119 | `/learn/pp-inventory/` | `/neo/academy/` | `/learn/` | 577 | כן | P2 | נדרשת |
| 120 | `/learn/pp-pi/` | `/neo/academy/pp-pi/` | `/learn/` | 538 | כן | P2 | נדרשת |
| 121 | `/learn/pp-planning/` | `/neo/academy/` | `/learn/` | 481 | כן | P2 | נדרשת |
| 122 | `/learn/pp-troubleshooting/` | `/neo/academy/` | `/learn/` | 69 | לבדיקה | P2 | נדרשת |
| 123 | `/learn/pp/` | `/neo/academy/` | `/learn/` | 538 | כן | P2 | נדרשת |
| 124 | `/learn/qa-defect/` | `/neo/academy/` | `/learn/` | 74 | לבדיקה | P2 | נדרשת |
| 125 | `/learn/qa-fundamentals/` | `/neo/academy/` | `/learn/` | 75 | לבדיקה | P2 | נדרשת |
| 126 | `/learn/qa-integration/` | `/neo/academy/` | `/learn/` | 68 | לבדיקה | P2 | נדרשת |
| 127 | `/learn/qa-sap-testing/` | `/neo/academy/` | `/learn/` | 68 | לבדיקה | P2 | נדרשת |
| 128 | `/learn/qa-uat/` | `/neo/academy/` | `/learn/` | 72 | לבדיקה | P2 | נדרשת |
| 129 | `/library/academy/fiori/` | `/neo/fiori-apps/` | `/library/academy/` | 17780 | לבדיקה | P2 | נדרשת |
| 130 | `/library/academy/reference/mm/` | `/neo/academy/mm/` | `/library/academy/` | 35898 | לבדיקה | P2 | נדרשת |
| 131 | `/library/academy/reference/pm/` | `/neo/academy/pm/` | `/library/academy/` | 19665 | לבדיקה | P2 | נדרשת |
| 132 | `/library/academy/reference/pmu/` | `/neo/academy/pm-user/` | `/library/academy/` | 29026 | לבדיקה | P2 | נדרשת |
| 133 | `/library/academy/reference/pp/` | `/neo/academy/pp-pi/` | `/library/academy/` | 33290 | לבדיקה | P2 | נדרשת |
| 134 | `/library/academy/reference/ppds/` | `/neo/academy/pp-ds/` | `/library/academy/` | 17856 | לבדיקה | P2 | נדרשת |
| 135 | `/library/academy/reference/qm/` | `/neo/academy/qm/` | `/library/academy/` | 38300 | לבדיקה | P2 | נדרשת |
| 136 | `/library/academy/reference/sop/` | `/neo/academy/sop/` | `/library/academy/` | 17207 | לבדיקה | P2 | נדרשת |
| 137 | `/library/academy/reference/wm/` | `/neo/academy/wm/` | `/library/academy/` | 12366 | לבדיקה | P2 | נדרשת |
| 138 | `/library/pp/object/AUSP/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 132 | לבדיקה | P2 | נדרשת |
| 139 | `/library/pp/object/BAPI_PRODORDCONF_CREATE_TT/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 190 | לבדיקה | P2 | נדרשת |
| 140 | `/library/pp/object/BAPI_PRODORD_CREATE/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 169 | לבדיקה | P2 | נדרשת |
| 141 | `/library/pp/object/C2A1/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 128 | לבדיקה | P2 | נדרשת |
| 142 | `/library/pp/object/CA97/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 126 | לבדיקה | P2 | נדרשת |
| 143 | `/library/pp/object/CL6P/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 133 | לבדיקה | P2 | נדרשת |
| 144 | `/library/pp/object/CM22/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 138 | לבדיקה | P2 | נדרשת |
| 145 | `/library/pp/object/CM40/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 138 | לבדיקה | P2 | נדרשת |
| 146 | `/library/pp/object/CM41/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 138 | לבדיקה | P2 | נדרשת |
| 147 | `/library/pp/object/CM52/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 138 | לבדיקה | P2 | נדרשת |
| 148 | `/library/pp/object/CM99/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 138 | לבדיקה | P2 | נדרשת |
| 149 | `/library/pp/object/CMS1/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 138 | לבדיקה | P2 | נדרשת |
| 150 | `/library/pp/object/CMS2/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 138 | לבדיקה | P2 | נדרשת |
| 151 | `/library/pp/object/CMV1/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 138 | לבדיקה | P2 | נדרשת |
| 152 | `/library/pp/object/CMV2/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 138 | לבדיקה | P2 | נדרשת |
| 153 | `/library/pp/object/CMX21/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 131 | לבדיקה | P2 | נדרשת |
| 154 | `/library/pp/object/CO0001/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 139 | לבדיקה | P2 | נדרשת |
| 155 | `/library/pp/object/CO04N/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 129 | לבדיקה | P2 | נדרשת |
| 156 | `/library/pp/object/CO67/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 128 | לבדיקה | P2 | נדרשת |
| 157 | `/library/pp/object/CO82/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 128 | לבדיקה | P2 | נדרשת |
| 158 | `/library/pp/object/COB1/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 183 | לבדיקה | P2 | נדרשת |
| 159 | `/library/pp/object/CORW/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 133 | לבדיקה | P2 | נדרשת |
| 160 | `/library/pp/object/CORY/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 128 | לבדיקה | P2 | נדרשת |
| 161 | `/library/pp/object/C_DDLeadTimeClassification/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 196 | לבדיקה | P2 | נדרשת |
| 162 | `/library/pp/object/C_MRPMaterials/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 158 | לבדיקה | P2 | נדרשת |
| 163 | `/library/pp/object/C_PMRPSimulation/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 176 | לבדיקה | P2 | נדרשת |
| 164 | `/library/pp/object/F0045/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 135 | לבדיקה | P2 | נדרשת |
| 165 | `/library/pp/object/F0247/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 180 | לבדיקה | P2 | נדרשת |
| 166 | `/library/pp/object/F0251/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 132 | לבדיקה | P2 | נדרשת |
| 167 | `/library/pp/object/F0289/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 132 | לבדיקה | P2 | נדרשת |
| 168 | `/library/pp/object/F1422/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 180 | לבדיקה | P2 | נדרשת |
| 169 | `/library/pp/object/F1576/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 139 | לבדיקה | P2 | נדרשת |
| 170 | `/library/pp/object/F1611/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 142 | לבדיקה | P2 | נדרשת |
| 171 | `/library/pp/object/F1842/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 134 | לבדיקה | P2 | נדרשת |
| 172 | `/library/pp/object/F1990/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 131 | לבדיקה | P2 | נדרשת |
| 173 | `/library/pp/object/F2101/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 185 | לבדיקה | P2 | נדרשת |
| 174 | `/library/pp/object/F2336/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 218 | לבדיקה | P2 | נדרשת |
| 175 | `/library/pp/object/F2392/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 184 | לבדיקה | P2 | נדרשת |
| 176 | `/library/pp/object/F2401/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 121 | לבדיקה | P2 | נדרשת |
| 177 | `/library/pp/object/F2768/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 134 | לבדיקה | P2 | נדרשת |
| 178 | `/library/pp/object/F2769/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 134 | לבדיקה | P2 | נדרשת |
| 179 | `/library/pp/object/F2810/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 179 | לבדיקה | P2 | נדרשת |
| 180 | `/library/pp/object/F3261/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 189 | לבדיקה | P2 | נדרשת |
| 181 | `/library/pp/object/F3272/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 132 | לבדיקה | P2 | נדרשת |
| 182 | `/library/pp/object/F3364/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 179 | לבדיקה | P2 | נדרשת |
| 183 | `/library/pp/object/F4090/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 144 | לבדיקה | P2 | נדרשת |
| 184 | `/library/pp/object/F4147/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 144 | לבדיקה | P2 | נדרשת |
| 185 | `/library/pp/object/F4148/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 144 | לבדיקה | P2 | נדרשת |
| 186 | `/library/pp/object/INOB/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 132 | לבדיקה | P2 | נדרשת |
| 187 | `/library/pp/object/KLAH/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 132 | לבדיקה | P2 | נדרשת |
| 188 | `/library/pp/object/MB57/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 133 | לבדיקה | P2 | נדרשת |
| 189 | `/library/pp/object/MC21/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 129 | לבדיקה | P2 | נדרשת |
| 190 | `/library/pp/object/MC22/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 129 | לבדיקה | P2 | נדרשת |
| 191 | `/library/pp/object/MC24/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 129 | לבדיקה | P2 | נדרשת |
| 192 | `/library/pp/object/MC30/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 129 | לבדיקה | P2 | נדרשת |
| 193 | `/library/pp/object/MC35/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 129 | לבדיקה | P2 | נדרשת |
| 194 | `/library/pp/object/MC40/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 126 | לבדיקה | P2 | נדרשת |
| 195 | `/library/pp/object/MC41/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 126 | לבדיקה | P2 | נדרשת |
| 196 | `/library/pp/object/MC61/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 129 | לבדיקה | P2 | נדרשת |
| 197 | `/library/pp/object/MC64/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 129 | לבדיקה | P2 | נדרשת |
| 198 | `/library/pp/object/MC67/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 129 | לבדיקה | P2 | נדרשת |
| 199 | `/library/pp/object/MC76/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 129 | לבדיקה | P2 | נדרשת |
| 200 | `/library/pp/object/MC78/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 129 | לבדיקה | P2 | נדרשת |
| 201 | `/library/pp/object/MC7F/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 129 | לבדיקה | P2 | נדרשת |
| 202 | `/library/pp/object/MC8A/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 129 | לבדיקה | P2 | נדרשת |
| 203 | `/library/pp/object/MC8B/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 129 | לבדיקה | P2 | נדרשת |
| 204 | `/library/pp/object/MC8D/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 129 | לבדיקה | P2 | נדרשת |
| 205 | `/library/pp/object/MC8E/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 129 | לבדיקה | P2 | נדרשת |
| 206 | `/library/pp/object/MC8F/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 129 | לבדיקה | P2 | נדרשת |
| 207 | `/library/pp/object/MC8G/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 129 | לבדיקה | P2 | נדרשת |
| 208 | `/library/pp/object/MC8I/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 129 | לבדיקה | P2 | נדרשת |
| 209 | `/library/pp/object/MC8K/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 129 | לבדיקה | P2 | נדרשת |
| 210 | `/library/pp/object/MC8P/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 129 | לבדיקה | P2 | נדרשת |
| 211 | `/library/pp/object/MC8Q/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 129 | לבדיקה | P2 | נדרשת |
| 212 | `/library/pp/object/MC8T/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 129 | לבדיקה | P2 | נדרשת |
| 213 | `/library/pp/object/MC8V/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 129 | לבדיקה | P2 | נדרשת |
| 214 | `/library/pp/object/MC8W/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 129 | לבדיקה | P2 | נדרשת |
| 215 | `/library/pp/object/MC96/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 129 | לבדיקה | P2 | נדרשת |
| 216 | `/library/pp/object/MC9A/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 129 | לבדיקה | P2 | נדרשת |
| 217 | `/library/pp/object/MC9B/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 129 | לבדיקה | P2 | נדרשת |
| 218 | `/library/pp/object/MC9C/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 129 | לבדיקה | P2 | נדרשת |
| 219 | `/library/pp/object/MCHB/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 132 | לבדיקה | P2 | נדרשת |
| 220 | `/library/pp/object/MD09/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 126 | לבדיקה | P2 | נדרשת |
| 221 | `/library/pp/object/MD4C/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 126 | לבדיקה | P2 | נדרשת |
| 222 | `/library/pp/object/MD70/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 138 | לבדיקה | P2 | נדרשת |
| 223 | `/library/pp/object/MD79/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 136 | לבדיקה | P2 | נדרשת |
| 224 | `/library/pp/object/MDKP/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 125 | לבדיקה | P2 | נדרשת |
| 225 | `/library/pp/object/MDTB/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 125 | לבדיקה | P2 | נדרשת |
| 226 | `/library/pp/object/MF4R/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 126 | לבדיקה | P2 | נדרשת |
| 227 | `/library/pp/object/MF70/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 126 | לבדיקה | P2 | נדרשת |
| 228 | `/library/pp/object/MM10/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 133 | לבדיקה | P2 | נדרשת |
| 229 | `/library/pp/object/O09C/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 128 | לבדיקה | P2 | נדרשת |
| 230 | `/library/pp/object/O25C/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 128 | לבדיקה | P2 | נדרשת |
| 231 | `/library/pp/object/OMrp/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 125 | לבדיקה | P2 | נדרשת |
| 232 | `/library/pp/object/OP19/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 128 | לבדיקה | P2 | נדרשת |
| 233 | `/library/pp/object/OP30/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 128 | לבדיקה | P2 | נדרשת |
| 234 | `/library/pp/object/OP40/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 128 | לבדיקה | P2 | נדרשת |
| 235 | `/library/pp/object/OP43/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 138 | לבדיקה | P2 | נדרשת |
| 236 | `/library/pp/object/OP45/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 128 | לבדיקה | P2 | נדרשת |
| 237 | `/library/pp/object/OP46/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 128 | לבדיקה | P2 | נדרשת |
| 238 | `/library/pp/object/OP51/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 128 | לבדיקה | P2 | נדרשת |
| 239 | `/library/pp/object/OP54/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 128 | לבדיקה | P2 | נדרשת |
| 240 | `/library/pp/object/OP55/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 126 | לבדיקה | P2 | נדרשת |
| 241 | `/library/pp/object/OP67/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 128 | לבדיקה | P2 | נדרשת |
| 242 | `/library/pp/object/OP7B/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 128 | לבדיקה | P2 | נדרשת |
| 243 | `/library/pp/object/OPA2/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 138 | לבדיקה | P2 | נדרשת |
| 244 | `/library/pp/object/OPA3/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 138 | לבדיקה | P2 | נדרשת |
| 245 | `/library/pp/object/OPA4/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 138 | לבדיקה | P2 | נדרשת |
| 246 | `/library/pp/object/OPA5/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 138 | לבדיקה | P2 | נדרשת |
| 247 | `/library/pp/object/OPA6/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 138 | לבדיקה | P2 | נדרשת |
| 248 | `/library/pp/object/OPD0/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 138 | לבדיקה | P2 | נדרשת |
| 249 | `/library/pp/object/OPD1/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 138 | לבדיקה | P2 | נדרשת |
| 250 | `/library/pp/object/OPD2/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 138 | לבדיקה | P2 | נדרשת |
| 251 | `/library/pp/object/OPD3/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 138 | לבדיקה | P2 | נדרשת |
| 252 | `/library/pp/object/OPJ8/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 126 | לבדיקה | P2 | נדרשת |
| 253 | `/library/pp/object/OPJ9/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 125 | לבדיקה | P2 | נדרשת |
| 254 | `/library/pp/object/OPJH/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 128 | לבדיקה | P2 | נדרשת |
| 255 | `/library/pp/object/OPK0/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 178 | לבדיקה | P2 | נדרשת |
| 256 | `/library/pp/object/OPK1/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 133 | לבדיקה | P2 | נדרשת |
| 257 | `/library/pp/object/OPK5/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 171 | לבדיקה | P2 | נדרשת |
| 258 | `/library/pp/object/OPK8/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 128 | לבדיקה | P2 | נדרשת |
| 259 | `/library/pp/object/OPN1/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 128 | לבדיקה | P2 | נדרשת |
| 260 | `/library/pp/object/OPPQ/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 126 | לבדיקה | P2 | נדרשת |
| 261 | `/library/pp/object/OPPR/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 126 | לבדיקה | P2 | נדרשת |
| 262 | `/library/pp/object/OPU4/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 128 | לבדיקה | P2 | נדרשת |
| 263 | `/library/pp/object/OPU5/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 257 | לבדיקה | P2 | נדרשת |
| 264 | `/library/pp/object/OSP2/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 124 | לבדיקה | P2 | נדרשת |
| 265 | `/library/pp/object/OSPT/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 124 | לבדיקה | P2 | נדרשת |
| 266 | `/library/pp/object/OX09/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 125 | לבדיקה | P2 | נדרשת |
| 267 | `/library/pp/object/OX10/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 125 | לבדיקה | P2 | נדרשת |
| 268 | `/library/pp/object/PBED/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 181 | לבדיקה | P2 | נדרשת |
| 269 | `/library/pp/object/PBIM/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 181 | לבדיקה | P2 | נדרשת |
| 270 | `/library/pp/object/PK01/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 145 | לבדיקה | P2 | נדרשת |
| 271 | `/library/pp/object/PK05/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 115 | לבדיקה | P2 | נדרשת |
| 272 | `/library/pp/object/PK11/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 115 | לבדיקה | P2 | נדרשת |
| 273 | `/library/pp/object/PK13N/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 118 | לבדיקה | P2 | נדרשת |
| 274 | `/library/pp/object/PKBC/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 115 | לבדיקה | P2 | נדרשת |
| 275 | `/library/pp/object/PKHD/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 114 | לבדיקה | P2 | נדרשת |
| 276 | `/library/pp/object/PKPS/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 114 | לבדיקה | P2 | נדרשת |
| 277 | `/library/pp/object/PLAF/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 125 | לבדיקה | P2 | נדרשת |
| 278 | `/library/pp/object/PP04/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 181 | לבדיקה | P2 | נדרשת |
| 279 | `/library/pp/object/PP10/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 530 | כן | P2 | נדרשת |
| 280 | `/library/pp/object/PP20/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 173 | לבדיקה | P2 | נדרשת |
| 281 | `/library/pp/object/PPT1/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 138 | לבדיקה | P2 | נדרשת |
| 282 | `/library/pp/object/PROP/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 128 | לבדיקה | P2 | נדרשת |
| 283 | `/library/pp/object/RCOCB002/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 186 | לבדיקה | P2 | נדרשת |
| 284 | `/library/pp/object/RCOCB004/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 186 | לבדיקה | P2 | נדרשת |
| 285 | `/library/pp/object/RCOCB006/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 186 | לבדיקה | P2 | נדרשת |
| 286 | `/library/pp/object/RMCPSOPP/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 142 | לבדיקה | P2 | נדרשת |
| 287 | `/library/pp/object/RMMDDIBE/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 139 | לבדיקה | P2 | נדרשת |
| 288 | `/library/pp/object/RMMRP000/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 139 | לבדיקה | P2 | נדרשת |
| 289 | `/library/pp/object/RMPE_DATA_/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 157 | לבדיקה | P2 | נדרשת |
| 290 | `/library/pp/object/SAP001/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 145 | לבדיקה | P2 | נדרשת |
| 291 | `/library/pp/object/SAP002/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 145 | לבדיקה | P2 | נדרשת |
| 292 | `/library/pp/object/SAP003/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 145 | לבדיקה | P2 | נדרשת |
| 293 | `/library/pp/object/SAP004/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 145 | לבדיקה | P2 | נדרשת |
| 294 | `/library/pp/object/SAP005/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 188 | לבדיקה | P2 | נדרשת |
| 295 | `/library/pp/object/SAP006/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 133 | לבדיקה | P2 | נדרשת |
| 296 | `/library/pp/object/SAP007/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 133 | לבדיקה | P2 | נדרשת |
| 297 | `/library/pp/object/SAP101/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 140 | לבדיקה | P2 | נדרשת |
| 298 | `/library/pp/object/SAPAPO/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 188 | לבדיקה | P2 | נדרשת |
| 299 | `/library/pp/object/SAPB020/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 148 | לבדיקה | P2 | נדרשת |
| 300 | `/library/pp/object/SAPLM61C_001/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 151 | לבדיקה | P2 | נדרשת |
| 301 | `/library/pp/object/SAPLNOIZ/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 146 | לבדיקה | P2 | נדרשת |
| 302 | `/library/pp/object/SAPPHIRE/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 151 | לבדיקה | P2 | נדרשת |
| 303 | `/library/pp/object/SAPR01/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 133 | לבדיקה | P2 | נדרשת |
| 304 | `/library/pp/object/SAPR02/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 133 | לבדיקה | P2 | נדרשת |
| 305 | `/library/pp/object/SAPREM/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 145 | לבדיקה | P2 | נדרשת |
| 306 | `/library/pp/object/SAPSFC010/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 154 | לבדיקה | P2 | נדרשת |
| 307 | `/library/pp/object/SAPSFCA010/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 157 | לבדיקה | P2 | נדרשת |
| 308 | `/library/pp/object/SAPSFCG011/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 157 | לבדיקה | P2 | נדרשת |
| 309 | `/library/pp/object/SAPSFCG013/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 157 | לבדיקה | P2 | נדרשת |
| 310 | `/library/pp/object/SAPSFCT001/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 157 | לבדיקה | P2 | נדרשת |
| 311 | `/library/pp/object/SAPSFCZ002/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 157 | לבדיקה | P2 | נדרשת |
| 312 | `/library/pp/object/SAPX912/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 148 | לבדיקה | P2 | נדרשת |
| 313 | `/library/pp/object/SAP_01/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 135 | לבדיקה | P2 | נדרשת |
| 314 | `/library/pp/object/SAP_02/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 135 | לבדיקה | P2 | נדרשת |
| 315 | `/library/pp/object/SAP_03/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 135 | לבדיקה | P2 | נדרשת |
| 316 | `/library/pp/object/SAP_08/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 135 | לבדיקה | P2 | נדרשת |
| 317 | `/library/pp/object/SAP_09/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 135 | לבדיקה | P2 | נדרשת |
| 318 | `/library/pp/object/SAP_11/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 135 | לבדיקה | P2 | נדרשת |
| 319 | `/library/pp/object/SAP_APO/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 148 | לבדיקה | P2 | נדרשת |
| 320 | `/library/pp/object/SAP_BR_BOM_ENGINEER/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 184 | לבדיקה | P2 | נדרשת |
| 321 | `/library/pp/object/SAP_BR_PRODN_ENG_DISC_CAM/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 202 | לבדיקה | P2 | נדרשת |
| 322 | `/library/pp/object/SAP_BR_PRODN_ENG_DISC_EME/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 202 | לבדיקה | P2 | נדרשת |
| 323 | `/library/pp/object/SAP_BR_PRODN_OPTR_DISC_EPO/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 205 | לבדיקה | P2 | נדרשת |
| 324 | `/library/pp/object/SAP_BR_PRODN_PROC_SPCLST_CAM/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 211 | לבדיקה | P2 | נדרשת |
| 325 | `/library/pp/object/SAP_BR_PRODN_PROC_SPCLST_EPO/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 211 | לבדיקה | P2 | נדרשת |
| 326 | `/library/pp/object/SAP_BR_PRODN_SUPERVISOR_DISC/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 211 | לבדיקה | P2 | נדרשת |
| 327 | `/library/pp/object/SAP_BR_PRODN_SUPRVSR_DIS/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 199 | לבדיקה | P2 | נדרשת |
| 328 | `/library/pp/object/SAP_BR_QUALITY_ENGINEER_EPO/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 208 | לבדיקה | P2 | נדרשת |
| 329 | `/library/pp/object/SAP_DS_01/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 154 | לבדיקה | P2 | נדרשת |
| 330 | `/library/pp/object/SAP_DS_02/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 154 | לבדיקה | P2 | נדרשת |
| 331 | `/library/pp/object/SAP_DS_03/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 154 | לבדיקה | P2 | נדרשת |
| 332 | `/library/pp/object/SAP_DS_04/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 154 | לבדיקה | P2 | נדרשת |
| 333 | `/library/pp/object/SAP_NEW_/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 141 | לבדיקה | P2 | נדרשת |
| 334 | `/library/pp/object/SAP_NEW_CONTROL_RECIPE/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 183 | לבדיקה | P2 | נדרשת |
| 335 | `/library/pp/object/SAP_NEW_CONTROL_RECIPES/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 186 | לבדיקה | P2 | נדרשת |
| 336 | `/library/pp/object/SAP_PP_002/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 157 | לבדיקה | P2 | נדרשת |
| 337 | `/library/pp/object/SAP_PP_003/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 157 | לבדיקה | P2 | נדרשת |
| 338 | `/library/pp/object/SAP_PP_004/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 157 | לבדיקה | P2 | נדרשת |
| 339 | `/library/pp/object/SAP_PP_005/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 157 | לבדיקה | P2 | נדרשת |
| 340 | `/library/pp/object/SAP_PP_007/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 157 | לבדיקה | P2 | נדרשת |
| 341 | `/library/pp/object/SAP_PP_013/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 157 | לבדיקה | P2 | נדרשת |
| 342 | `/library/pp/object/SAP_PP_C001/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 160 | לבדיקה | P2 | נדרשת |
| 343 | `/library/pp/object/T001L/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 127 | לבדיקה | P2 | נדרשת |
| 344 | `/library/pp/object/T001W/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 127 | לבדיקה | P2 | נדרשת |
| 345 | `/library/pp/object/T399D/` | `/neo/academy/pp-pi/` | `/library/pp/object/` | 133 | לבדיקה | P2 | נדרשת |
| 346 | `/oic/batch/` | `/neo/knowledge/` | `/oic/` | 1442 | כן | P2 | נדרשת |
| 347 | `/oic/bom/` | `/neo/knowledge/` | `/oic/` | 1261 | כן | P2 | נדרשת |
| 348 | `/oic/confirmation/` | `/neo/knowledge/` | `/oic/` | 1686 | כן | P2 | נדרשת |
| 349 | `/oic/inspection-lot/` | `/neo/knowledge/` | `/oic/` | 1429 | כן | P2 | נדרשת |
| 350 | `/oic/maintenance-order/` | `/neo/knowledge/` | `/oic/` | 2593 | כן | P2 | נדרשת |
| 351 | `/oic/maintenance-plan/` | `/neo/knowledge/` | `/oic/` | 1136 | כן | P2 | נדרשת |
| 352 | `/oic/master-recipe/` | `/neo/knowledge/` | `/oic/` | 1627 | כן | P2 | נדרשת |
| 353 | `/oic/material/` | `/neo/knowledge/` | `/oic/` | 1445 | כן | P2 | נדרשת |
| 354 | `/oic/measuring-point/` | `/neo/knowledge/` | `/oic/` | 1156 | כן | P2 | נדרשת |
| 355 | `/oic/notification/` | `/neo/knowledge/` | `/oic/` | 1351 | כן | P2 | נדרשת |
| 356 | `/oic/production-version/` | `/neo/knowledge/` | `/oic/` | 1276 | כן | P2 | נדרשת |
| 357 | `/oic/reservation/` | `/neo/knowledge/` | `/oic/` | 2001 | כן | P2 | נדרשת |
| 358 | `/oic/routing/` | `/neo/knowledge/` | `/oic/` | 1536 | כן | P2 | נדרשת |
| 359 | `/pm/bapis/` | `/neo/pm/` | `/pm/…` | 234 | לבדיקה | P2 | נדרשת |
| 360 | `/pm/best-practices/` | `/neo/pm/` | `/pm/…` | 1184 | כן | P2 | נדרשת |
| 361 | `/pm/business-process/` | `/neo/pm/` | `/pm/…` | 327 | כן | P2 | נדרשת |
| 362 | `/pm/cds/` | `/neo/pm/` | `/pm/…` | 770 | כן | P2 | נדרשת |
| 363 | `/pm/configuration/` | `/neo/pm/` | `/pm/…` | 3484 | כן | P2 | נדרשת |
| 364 | `/pm/ecc-s4/` | `/neo/pm/` | `/pm/…` | 1792 | כן | P2 | נדרשת |
| 365 | `/pm/enhancements/` | `/neo/pm/` | `/pm/…` | 1682 | כן | P2 | נדרשת |
| 366 | `/pm/fiori/` | `/neo/pm/` | `/pm/…` | 1014 | כן | P2 | נדרשת |
| 367 | `/pm/integration/` | `/neo/pm/` | `/pm/…` | 228 | לבדיקה | P2 | נדרשת |
| 368 | `/pm/master-data/` | `/neo/pm/` | `/pm/…` | 3885 | כן | P2 | נדרשת |
| 369 | `/pm/related/` | `/neo/pm/` | `/pm/…` | 159 | לבדיקה | P2 | נדרשת |
| 370 | `/pm/relationships/` | `/neo/pm/` | `/pm/…` | 4811 | כן | P2 | נדרשת |
| 371 | `/pm/tables/` | `/neo/pm/` | `/pm/…` | 2610 | כן | P2 | נדרשת |
| 372 | `/pm/transactions/` | `/neo/pm/` | `/pm/…` | 595 | כן | P2 | נדרשת |
| 373 | `/pm/troubleshooting/` | `/neo/pm/` | `/pm/…` | 2929 | כן | P2 | נדרשת |
| 374 | `/pp-pi/bapis/` | `/neo/pp-pi/` | `/pp-pi/…` | 237 | לבדיקה | P2 | נדרשת |
| 375 | `/pp-pi/best-practices/` | `/neo/pp-pi/` | `/pp-pi/…` | 968 | כן | P2 | נדרשת |
| 376 | `/pp-pi/business-process/` | `/neo/pp-pi/` | `/pp-pi/…` | 3366 | כן | P2 | נדרשת |
| 377 | `/pp-pi/cds/` | `/neo/pp-pi/` | `/pp-pi/…` | 928 | כן | P2 | נדרשת |
| 378 | `/pp-pi/configuration/` | `/neo/pp-pi/` | `/pp-pi/…` | 4845 | כן | P2 | נדרשת |
| 379 | `/pp-pi/ecc-s4/` | `/neo/pp-pi/` | `/pp-pi/…` | 1510 | כן | P2 | נדרשת |
| 380 | `/pp-pi/enhancements/` | `/neo/pp-pi/` | `/pp-pi/…` | 1569 | כן | P2 | נדרשת |
| 381 | `/pp-pi/fiori/` | `/neo/pp-pi/` | `/pp-pi/…` | 587 | כן | P2 | נדרשת |
| 382 | `/pp-pi/integration/` | `/neo/pp-pi/` | `/pp-pi/…` | 233 | לבדיקה | P2 | נדרשת |
| 383 | `/pp-pi/master-data/` | `/neo/pp-pi/` | `/pp-pi/…` | 5275 | כן | P2 | נדרשת |
| 384 | `/pp-pi/related/` | `/neo/pp-pi/` | `/pp-pi/…` | 170 | לבדיקה | P2 | נדרשת |
| 385 | `/pp-pi/relationships/` | `/neo/pp-pi/` | `/pp-pi/…` | 4907 | כן | P2 | נדרשת |
| 386 | `/pp-pi/tables/` | `/neo/pp-pi/` | `/pp-pi/…` | 2532 | כן | P2 | נדרשת |
| 387 | `/pp-pi/transactions/` | `/neo/pp-pi/` | `/pp-pi/…` | 461 | כן | P2 | נדרשת |
| 388 | `/pp-pi/troubleshooting/` | `/neo/pp-pi/` | `/pp-pi/…` | 5419 | כן | P2 | נדרשת |
| 389 | `/process-explorer/maintenance-management/` | `/neo/domain-model/` | `/process-explorer/` | 860 | כן | P2 | נדרשת |
| 390 | `/process-explorer/o2c/` | `/neo/domain-model/` | `/process-explorer/` | 781 | כן | P2 | נדרשת |
| 391 | `/process-explorer/p2p/` | `/neo/domain-model/` | `/process-explorer/` | 956 | כן | P2 | נדרשת |
| 392 | `/process-explorer/plan-to-produce/` | `/neo/domain-model/` | `/process-explorer/` | 1076 | כן | P2 | נדרשת |
| 393 | `/process-explorer/quality-management/` | `/neo/domain-model/` | `/process-explorer/` | 644 | כן | P2 | נדרשת |
| 394 | `/process/PM-1/` | `/neo/domain-model/` | `/process/` | 608 | כן | P2 | נדרשת |
| 395 | `/process/PM-10/` | `/neo/domain-model/` | `/process/` | 319 | כן | P2 | נדרשת |
| 396 | `/process/PM-11/` | `/neo/domain-model/` | `/process/` | 526 | כן | P2 | נדרשת |
| 397 | `/process/PM-12/` | `/neo/domain-model/` | `/process/` | 396 | כן | P2 | נדרשת |
| 398 | `/process/PM-2/` | `/neo/domain-model/` | `/process/` | 463 | כן | P2 | נדרשת |
| 399 | `/process/PM-3/` | `/neo/domain-model/` | `/process/` | 454 | כן | P2 | נדרשת |
| 400 | `/process/PM-4/` | `/neo/domain-model/` | `/process/` | 381 | כן | P2 | נדרשת |
| 401 | `/process/PM-5/` | `/neo/domain-model/` | `/process/` | 321 | כן | P2 | נדרשת |
| 402 | `/process/PM-6/` | `/neo/domain-model/` | `/process/` | 564 | כן | P2 | נדרשת |
| 403 | `/process/PM-7/` | `/neo/domain-model/` | `/process/` | 575 | כן | P2 | נדרשת |
| 404 | `/process/PM-8/` | `/neo/domain-model/` | `/process/` | 418 | כן | P2 | נדרשת |
| 405 | `/process/PM-9/` | `/neo/domain-model/` | `/process/` | 576 | כן | P2 | נדרשת |
| 406 | `/process/PP-PI-1/` | `/neo/domain-model/` | `/process/` | 850 | כן | P2 | נדרשת |
| 407 | `/process/PP-PI-2/` | `/neo/domain-model/` | `/process/` | 519 | כן | P2 | נדרשת |
| 408 | `/process/PP-PI-3/` | `/neo/domain-model/` | `/process/` | 681 | כן | P2 | נדרשת |
| 409 | `/process/PP-PI-4/` | `/neo/domain-model/` | `/process/` | 203 | לבדיקה | P2 | נדרשת |
| 410 | `/process/PP-PI-5/` | `/neo/domain-model/` | `/process/` | 581 | כן | P2 | נדרשת |
| 411 | `/process/PP-PI-6/` | `/neo/domain-model/` | `/process/` | 622 | כן | P2 | נדרשת |
| 412 | `/process/PP-PI-7/` | `/neo/domain-model/` | `/process/` | 727 | כן | P2 | נדרשת |
| 413 | `/security/actvt/` | `/neo/centers/process-auth/` | `/security/` | 1421 | כן | P2 | נדרשת |
| 414 | `/security/auth-object/` | `/neo/centers/process-auth/` | `/security/` | 1547 | כן | P2 | נדרשת |
| 415 | `/security/derived-role/` | `/neo/centers/process-auth/` | `/security/` | 1453 | כן | P2 | נדרשת |
| 416 | `/security/org-levels/` | `/neo/centers/process-auth/` | `/security/` | 1487 | כן | P2 | נדרשת |
| 417 | `/security/profile/` | `/neo/centers/process-auth/` | `/security/` | 1431 | כן | P2 | נדרשת |
| 418 | `/security/s-tabu-dis/` | `/neo/centers/process-auth/` | `/security/` | 1496 | כן | P2 | נדרשת |
| 419 | `/security/s-tcode/` | `/neo/centers/process-auth/` | `/security/` | 1615 | כן | P2 | נדרשת |
| 420 | `/academy/dashboard/` | `/neo/academy/` | `/academy/` | 2898 | החלטת בעלים | P3 | נדרשת |
| 421 | `/alm/` | `/neo/` | `/alm/` | 1901 | החלטת בעלים | P3 | נדרשת |
| 422 | `/connector/` | `/neo/` | `/connector/` | 862 | החלטת בעלים | P3 | נדרשת |
| 423 | `/delivery/` | `/neo/centers/toolkit/` | `/delivery/` | 1967 | החלטת בעלים | P3 | נדרשת |
| 424 | `/design/concept-d-spec/` | `/neo/` | `/design/` | 7754 | החלטת בעלים | P3 | נדרשת |
| 425 | `/design/concept-d/` | `/neo/` | `/design/` | 0 | החלטת בעלים | P3 | נדרשת |
| 426 | `/design/matrix/` | `/neo/` | `/design/` | 6628 | החלטת בעלים | P3 | נדרשת |
| 427 | `/design/system/` | `/neo/` | `/design/` | 3001 | החלטת בעלים | P3 | נדרשת |
| 428 | `/evolution/` | `/neo/` | `/evolution/` | 2376 | החלטת בעלים | P3 | נדרשת |
| 429 | `/graph/` | `/neo/erd/` | `/graph/` | 20 | החלטת בעלים | P3 | נדרשת |
| 430 | `/guides/pm-calibration-process/` | `/neo/centers/` | `/guides/` | 1375 | כן | P3 | נדרשת |
| 431 | `/guides/pp-mrp-to-order/` | `/neo/centers/` | `/guides/` | 1310 | כן | P3 | נדרשת |
| 432 | `/guides/pppi-batch-traceability/` | `/neo/centers/` | `/guides/` | 1649 | כן | P3 | נדרשת |
| 433 | `/guides/pppi-mts-process-order/` | `/neo/centers/` | `/guides/` | 1867 | כן | P3 | נדרשת |
| 434 | `/import/` | `/neo/` | `/import/` | 1739 | החלטת בעלים | P3 | נדרשת |
| 435 | `/knowledge/coverage/` | `/neo/knowledge/` | `/knowledge/` | 1609 | החלטת בעלים | P3 | נדרשת |
| 436 | `/library/mm-quality-report/` | `/neo/academy/mm/` | `/library/mm-quality-report/` | 640 | החלטת בעלים | P3 | נדרשת |
| 437 | `/library/pm-quality-report/` | `/neo/academy/pm/` | `/library/pm-quality-report/` | 748 | החלטת בעלים | P3 | נדרשת |
| 438 | `/library/pmu-quality-report/` | `/neo/academy/pm-user/` | `/library/pmu-quality-report/` | 636 | החלטת בעלים | P3 | נדרשת |
| 439 | `/library/pp-quality-report/` | `/neo/academy/pp-pi/` | `/library/pp-quality-report/` | 15218 | החלטת בעלים | P3 | נדרשת |
| 440 | `/library/ppds-quality-report/` | `/neo/academy/pp-ds/` | `/library/ppds-quality-report/` | 649 | החלטת בעלים | P3 | נדרשת |
| 441 | `/library/qm-quality-report/` | `/neo/academy/qm/` | `/library/qm-quality-report/` | 641 | החלטת בעלים | P3 | נדרשת |
| 442 | `/library/sop-quality-report/` | `/neo/academy/sop/` | `/library/sop-quality-report/` | 639 | החלטת בעלים | P3 | נדרשת |
| 443 | `/library/wm-quality-report/` | `/neo/academy/wm/` | `/library/wm-quality-report/` | 624 | החלטת בעלים | P3 | נדרשת |
| 444 | `/lineage/` | `/neo/erd/` | `/lineage/` | 384 | החלטת בעלים | P3 | נדרשת |
| 445 | `/notes-graph/` | `/neo/knowledge/` | `/notes-graph/` | 5075 | החלטת בעלים | P3 | נדרשת |
| 446 | `/onboarding/` | `/neo/academy/` | `/onboarding/` | 985 | החלטת בעלים | P3 | נדרשת |
| 447 | `/qa-testing/batch-validation/` | `/neo/centers/` | `/qa-testing/` | 458 | כן | P3 | נדרשת |
| 448 | `/qa-testing/confirmation-backflush/` | `/neo/centers/` | `/qa-testing/` | 405 | כן | P3 | נדרשת |
| 449 | `/qa-testing/integration-mes/` | `/neo/centers/` | `/qa-testing/` | 377 | כן | P3 | נדרשת |
| 450 | `/qa-testing/integration-pm-mm/` | `/neo/centers/` | `/qa-testing/` | 378 | כן | P3 | נדרשת |
| 451 | `/qa-testing/master-data-validation/` | `/neo/centers/` | `/qa-testing/` | 495 | כן | P3 | נדרשת |
| 452 | `/qa-testing/mrp-validation/` | `/neo/centers/` | `/qa-testing/` | 465 | כן | P3 | נדרשת |
| 453 | `/qa-testing/notification-validation/` | `/neo/centers/` | `/qa-testing/` | 382 | כן | P3 | נדרשת |
| 454 | `/qa-testing/pm-order-lifecycle/` | `/neo/centers/` | `/qa-testing/` | 477 | כן | P3 | נדרשת |
| 455 | `/qa-testing/pppi-process-order-lifecycle/` | `/neo/centers/` | `/qa-testing/` | 486 | כן | P3 | נדרשת |
| 456 | `/qa-testing/settlement-validation/` | `/neo/centers/` | `/qa-testing/` | 394 | כן | P3 | נדרשת |
| 457 | `/quality-audit/` | `/neo/s4-readiness/` | `/quality-audit/` | 804 | החלטת בעלים | P3 | נדרשת |
| 458 | `/sap-infrastructure/` | `/neo/` | `/sap-infrastructure/` | 30 | החלטת בעלים | P3 | נדרשת |
| 459 | `/story/pm-maintenance/` | `/neo/domain-model/` | `/story/` | 346 | כן | P3 | נדרשת |
| 460 | `/story/pppi-process-order/` | `/neo/domain-model/` | `/story/` | 328 | כן | P3 | נדרשת |
| 461 | `/verification/` | `/neo/s4hana/` | `/verification/` | 3488 | החלטת בעלים | P3 | נדרשת |
| 462 | `/workbench/debugging/` | `/neo/centers/debugging/` | `/workbench/` | 4302 | החלטת בעלים | P3 | נדרשת |
| 463 | `/workbench/pm-advanced/` | `/neo/centers/` | `/workbench/` | 9107 | החלטת בעלים | P3 | נדרשת |
| 464 | `/workbench/pp-pi-advanced/` | `/neo/centers/` | `/workbench/` | 8510 | החלטת בעלים | P3 | נדרשת |
| 465 | `/workbench/qm/` | `/neo/centers/` | `/workbench/` | 8463 | החלטת בעלים | P3 | נדרשת |
