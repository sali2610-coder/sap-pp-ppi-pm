// SAP Process Explorer (Phase 7) — end-to-end process maps. Each step is
// clickable and exposes T-Codes, tables, programs, Fiori, interfaces,
// troubleshooting (incident slugs) and test notes. Hand-authored.

export interface ProcStep {
  he: string;
  tcodes: string[];
  tables: string[];
  programs?: string[];
  fiori?: string[];
  interfaces?: string[];
  incidents?: string[];   // troubleshooting slugs
  test?: string;
}
export interface ProcessMap {
  slug: string;
  he: string;
  title: string;
  domain: string;
  summary: string;
  steps: ProcStep[];
}

export const PROCESS_MAPS: ProcessMap[] = [
  { slug: "p2p", he: "רכש לתשלום (P2P)", title: "Procure-to-Pay", domain: "MM", summary: "מדרישת רכש דרך הזמנה, קבלה, חשבונית ועד תשלום.",
    steps: [
      { he: "דרישת רכש", tcodes: ["ME51N", "ME53N"], tables: ["EBAN", "EBKN"], fiori: ["Manage Purchase Requisitions"], interfaces: ["BAPI_REQUISITION_*"], incidents: ["subcontracting-components"], test: "PR נוצרת עם ייחוס חשבונאי תקין." },
      { he: "הזמנת רכש", tcodes: ["ME21N", "ME22N", "ME23N"], tables: ["EKKO", "EKPO"], fiori: ["Create Purchase Order"], interfaces: ["ORDERS IDoc", "API_PURCHASEORDER"], incidents: ["pricing-condition-missing"], test: "PO עם תנאי מחיר; שחרור (release strategy)." },
      { he: "קבלת טובין", tcodes: ["MIGO"], tables: ["MATDOC", "MSEG"], fiori: ["Post Goods Movement"], interfaces: ["BAPI_GOODSMVT_CREATE"], incidents: ["goods-movement-stock", "duplicate-goods-receipt", "qm-inspection-lot-block"], test: "GR 101 מעדכן מלאי; QM lot אם פעיל." },
      { he: "חשבונית (LIV)", tcodes: ["MIRO"], tables: ["RBKP", "RSEG"], fiori: ["Verify Supplier Invoice"], interfaces: ["INVOIC IDoc"], incidents: ["update-termination-sm13"], test: "3-way match (PO/GR/Invoice); חסימות MRBR." },
      { he: "תשלום", tcodes: ["F110", "FBL1N"], tables: ["BSIK", "ACDOCA"], fiori: ["Manage Automatic Payments"], interfaces: ["PAYEXT / DMEE"], incidents: ["acdoca-coep-mismatch"], test: "ריצת תשלומים F110; קיזוז פריטים פתוחים." },
    ] },
  { slug: "o2c", he: "הזמנה לגבייה (O2C)", title: "Order-to-Cash", domain: "SD", summary: "מהזמנת לקוח דרך אספקה, חיוב ועד גבייה.",
    steps: [
      { he: "הזמנת לקוח", tcodes: ["VA01", "VA02", "VA03"], tables: ["VBAK", "VBAP"], fiori: ["Manage Sales Orders"], interfaces: ["ORDERS IDoc", "API_SALES_ORDER"], incidents: ["pricing-condition-missing"], test: "הזמנה עם תמחור+ATP; חסימת אשראי." },
      { he: "בדיקת זמינות (ATP)", tcodes: ["CO09"], tables: ["VBBE"], fiori: ["Release for Delivery (aATP)"], incidents: ["aatp-shortage-release"], test: "aATP/BOP; הקצאה." },
      { he: "אספקה + ליקוט + PGI", tcodes: ["VL01N", "VL02N"], tables: ["LIKP", "LIPS"], fiori: ["Create Outbound Deliveries"], interfaces: ["DESADV / SHPMNT IDoc", "WM/EWM"], incidents: ["wm-ewm-stock-mismatch", "batch-determination-fail"], test: "PGI מנפק מלאי; קביעת אצווה FEFO." },
      { he: "חיוב", tcodes: ["VF01", "VF04"], tables: ["VBRK", "VBRP"], fiori: ["Create Billing Documents"], interfaces: ["INVOIC IDoc"], incidents: [], test: "חשבונית → רישום FI (ACDOCA)." },
      { he: "גבייה", tcodes: ["FBL5N", "F-28"], tables: ["BSID", "ACDOCA"], fiori: ["Manage Customer Line Items"], incidents: [], test: "קבלת תשלום; קיזוז." },
    ] },
  { slug: "plan-to-produce", he: "תכנון לייצור (Plan-to-Produce)", title: "Plan-to-Produce", domain: "PP-PI", summary: "מתחזית/MRP דרך פקודה, ביצוע, GR ועד התחשבנות — ייצור תהליכי/בדיד.",
    steps: [
      { he: "ניהול ביקוש (PIR)", tcodes: ["MD61", "MD62"], tables: ["PBIM", "PBED"], fiori: ["Manage PIRs"], incidents: ["pir-strategy"], test: "PIR גרסה 00 מזין MRP." },
      { he: "MRP", tcodes: ["MD01N", "MD04"], tables: ["MDKP", "PLAF"], fiori: ["Monitor Material Coverage"], interfaces: ["—"], incidents: ["mrp-no-planned-orders", "no-production-version"], test: "MRP יוצר הזמנות מתוכננות; גרסת ייצור." },
      { he: "פקודת ייצור/תהליך", tcodes: ["CO01", "COR1"], tables: ["AUFK", "AFKO", "AFPO"], fiori: ["Manage Process/Production Orders"], interfaces: ["API_PROCESSORDER_2", "LOIPRO IDoc"], incidents: ["process-order-no-control-recipe"], test: "המרה+שחרור; מרשם בקרה ל-MES." },
      { he: "ביצוע + אישור", tcodes: ["CO11N", "COR6N", "COGI"], tables: ["AFRU", "RESB", "AFFW"], fiori: ["Confirm Production/Process Order"], interfaces: ["Process messages (MES)"], incidents: ["cogi-stuck", "ru505-backflush-stock", "phase-confirm-sequence"], test: "אישור+Backflush; COGI נקי." },
      { he: "קבלת תוצר (GR)", tcodes: ["MIGO", "MB31"], tables: ["MATDOC", "MCH1"], fiori: ["Post Goods Movement"], incidents: ["char-batch-classification-missing"], test: "GR 101 לאצווה עם תפוגה." },
      { he: "התחשבנות + סטיות", tcodes: ["KKS2", "CO88"], tables: ["COBRB", "ACDOCA", "CKMLPP"], fiori: ["Run Settlement"], incidents: ["settlement-error", "variance-missing"], test: "WIP→Variance→Settlement ל-ACDOCA." },
    ] },
  { slug: "quality-management", he: "ניהול איכות (QM)", title: "Quality Management", domain: "QM", summary: "ממנת בדיקה דרך תוצאות, החלטת שימוש ועד תעודה/חסימה.",
    steps: [
      { he: "יצירת מנת בדיקה", tcodes: ["QA32"], tables: ["QALS"], fiori: ["Manage Inspection Lots"], interfaces: ["—"], incidents: ["qm-no-inspection-lot"], test: "GR/ייצור יוצר lot לפי סוג בדיקה." },
      { he: "רישום תוצאות", tcodes: ["QE11"], tables: ["QAMR", "QASR"], fiori: ["Record Inspection Results"], incidents: ["qm-results-out-of-spec", "qm-inspection-plan-version"], test: "ערכים מול spec; חריגה→דחייה." },
      { he: "החלטת שימוש (UD)", tcodes: ["QA11"], tables: ["QAVE"], fiori: ["Make Usage Decision"], incidents: ["qm-ud-blocked", "qm-ud-stock-block"], test: "UD משחרר/חוסם מלאי." },
      { he: "תעודה/הודעת איכות", tcodes: ["QC20", "QM01"], tables: ["QMEL"], fiori: ["Quality Certificates"], incidents: ["qm-notification-q2", "qm-cert-not-generated"], test: "COA למשלוח; Q-notification לפגם." },
    ] },
  { slug: "maintenance-management", he: "ניהול אחזקה (EAM)", title: "Maintenance Management", domain: "PM", summary: "מהודעה/תכנית דרך פקודה, ביצוע, אישור ועד התחשבנות.",
    steps: [
      { he: "הודעה / תכנית מונעת", tcodes: ["IW21", "IP30"], tables: ["QMEL", "MPLA", "MHIS"], fiori: ["Create Maintenance Request"], incidents: ["plan-no-orders", "downtime-not-recorded"], test: "הודעת תקלה / IP30 יוצר פקודה במועד." },
      { he: "פקודת אחזקה", tcodes: ["IW31", "IW32"], tables: ["AUFK", "AFIH", "AFVC"], fiori: ["Create Maintenance Order"], interfaces: ["API_MAINTENANCEORDER"], incidents: ["order-wont-release", "permit-not-auto-assigned", "equipment-not-in-order"], test: "PM01 עם פעולה+רכיב; היתרים; שחרור." },
      { he: "חלפים (PM-MM)", tcodes: ["IW32", "ME53N", "MIGO"], tables: ["RESB", "EBAN"], fiori: ["Process Purchase Requisitions"], incidents: ["pm-cost-no-activity-type"], test: "רכיב מלאי→GI; לא-מלאי→PR." },
      { he: "ביצוע + אישור", tcodes: ["IW41", "IW42"], tables: ["AFRU"], fiori: ["Confirm Jobs"], incidents: ["confirm-period-closed"], test: "אישור שעות+חומרים; TECO." },
      { he: "התחשבנות", tcodes: ["KO88"], tables: ["COBRB", "ACDOCA"], fiori: ["Run Settlement"], incidents: ["settlement-error", "teco-blocked"], test: "התחשבנות למרכז עלות (ACDOCA)." },
    ] },
];

export const processBySlug = (s: string) => PROCESS_MAPS.find((p) => p.slug === s);
