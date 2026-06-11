import fs from 'fs';
const inv = JSON.parse(fs.readFileSync('exports/sap-table-inventory.json','utf8'));

// ---------- palette (per spec) ----------
const palette = {
  MM:'#2f81f7', PP:'#9b5de5', 'PP-PI':'#6d28d9', PM:'#f97316', CS:'#14b8a6',
  SD:'#22c55e', FI:'#ef4444', CO:'#991b1b', QM:'#eab308', IDOC:'#94a3b8',
  BATCH:'#a16207', CLASS:'#0891b2',
  ALE:'#64748b', PIPO:'#7dd3fc', SHARED:'#f2c14e', cross:'#ffd54a'
};

// ---------- modules (Layer 2) ----------
const modules = [
  {code:'MM',name:'Materials Management',he:'ניהול חומרים',kind:'logistics'},
  {code:'SD',name:'Sales & Distribution',he:'מכירות והפצה',kind:'logistics'},
  {code:'PP',name:'Production Planning',he:'תכנון ייצור (דיסקרטי)',kind:'logistics'},
  {code:'PP-PI',name:'Production – Process Industry',he:'ייצור – תעשיית תהליך',kind:'logistics'},
  {code:'PM',name:'Plant Maintenance',he:'תחזוקת מפעל',kind:'logistics'},
  {code:'CS',name:'Customer Service',he:'שירות לקוחות',kind:'logistics'},
  {code:'QM',name:'Quality Management',he:'ניהול איכות',kind:'logistics'},
  {code:'BATCH',name:'Batch Management',he:'ניהול אצוות',kind:'cross'},
  {code:'CLASS',name:'Classification System',he:'מערכת סיווג',kind:'cross'},
  {code:'FI',name:'Financial Accounting',he:'הנהלת חשבונות',kind:'finance'},
  {code:'CO',name:'Controlling',he:'בקרה ועלויות',kind:'finance'},
  {code:'IDOC',name:'IDOC Framework',he:'מסגרת IDOC',kind:'integration'},
];
const integration = [
  {code:'IDOC',name:'IDOC Framework',he:'מסגרת IDOC'},
  {code:'ALE',name:'ALE Distribution',he:'הפצת ALE'},
  {code:'PIPO',name:'PI/PO Interfaces',he:'ממשקי PI/PO'},
];

// ---------- canonical modeled tables (SAP standard) ----------
// fields: [tech,en,he,key]; funcs=BAPIs; cds=S/4 CDS; rel parent/child by table name
const M = (o)=>({real:false, fiori:'', tcodes:'', cds:[], funcs:[], fields:[], rel:[], ...o});
const modeled = [
  // ---- MM ----
  M({t:'EBAN',mod:'MM',en:'Purchase Requisition item',he:'פריט דרישת רכש (PR)',tcodes:'ME51N/ME52N/ME53N',
     fiori:'Manage Purchase Requisitions (F1048)',s4:'נשמר; שדה MATNR מורחב 18→40.',
     funcs:['BAPI_REQUISITION_CREATE','BAPI_PR_CREATE'],cds:['I_PurchaseRequisition','I_PurchaseRequisitionItem'],
     fields:[['BANFN','Requisition no.','מס׳ דרישה','PK'],['BNFPO','Item','פריט','PK'],['MATNR','Material','חומר','FK'],['WERKS','Plant','מפעל','FK'],['MENGE','Quantity','כמות','-']],
     rel:[{role:'parent',table:'EKPO',card:'1:N',desc:'PR → PO item'},{role:'child',table:'MARA',card:'N:1',desc:'item → material'}]}),
  M({t:'EKKO',mod:'MM',en:'Purchasing document header (PO)',he:'כותרת מסמך רכש (PO)',tcodes:'ME21N/ME22N/ME23N',
     fiori:'Manage Purchase Orders (F0842A)',s4:'נשמר; ספק עובר ל-Business Partner.',
     funcs:['BAPI_PO_CREATE1','BAPI_PO_CHANGE','BAPI_PO_GETDETAIL'],cds:['I_PurchaseOrder'],
     fields:[['EBELN','PO number','מס׳ הזמנה','PK'],['BUKRS','Company code','חברה','FK'],['LIFNR','Vendor','ספק','FK'],['BSART','Doc type','סוג מסמך','-'],['WAERS','Currency','מטבע','-']],
     rel:[{role:'parent',table:'EKPO',card:'1:N',desc:'header → items'},{role:'child',table:'LFA1',card:'N:1',desc:'PO → vendor'},{role:'child',table:'T001',card:'N:1',desc:'PO → company code'}]}),
  M({t:'EKPO',mod:'MM',en:'Purchasing document item',he:'פריט מסמך רכש',tcodes:'ME23N',
     fiori:'Manage Purchase Orders (F0842A)',s4:'נשמר.',funcs:['BAPI_PO_GETDETAIL'],cds:['I_PurchaseOrderItem'],
     fields:[['EBELN','PO number','מס׳ הזמנה','PK'],['EBELP','Item','פריט','PK'],['MATNR','Material','חומר','FK'],['WERKS','Plant','מפעל','FK'],['MENGE','Quantity','כמות','-']],
     rel:[{role:'child',table:'EKKO',card:'N:1',desc:'item → header'},{role:'child',table:'MARA',card:'N:1',desc:'item → material'},{role:'parent',table:'EKBE',card:'1:N',desc:'item → PO history'}]}),
  M({t:'EKBE',mod:'MM',en:'PO history (GR/IR)',he:'היסטוריית הזמנה (GR/IR)',tcodes:'ME23N',s4:'נשמר.',cds:['I_PurchaseOrderHistory'],
     fields:[['EBELN','PO','הזמנה','PK'],['EBELP','Item','פריט','PK'],['ZEKKN','Seq','רצף','PK'],['BELNR','Mat doc','מסמך חומר','FK']],
     rel:[{role:'child',table:'EKPO',card:'N:1',desc:'history → PO item'},{role:'child',table:'MATDOC',card:'N:1',desc:'history → material doc'}]}),
  M({t:'MKPF',mod:'MM',en:'Material document header (ECC)',he:'כותרת מסמך חומר (ECC)',tcodes:'MIGO/MB51',
     s4:'הוחלף ב-MATDOC ב-S/4HANA (טבלה מאוחדת header+item).',s4alt:'MATDOC',funcs:['BAPI_GOODSMVT_CREATE'],cds:['I_MaterialDocumentHeader'],
     fields:[['MBLNR','Mat doc','מסמך חומר','PK'],['MJAHR','Year','שנה','PK'],['BLDAT','Doc date','תאריך','-'],['BUDAT','Posting date','תאריך רישום','-']],
     rel:[{role:'parent',table:'MSEG',card:'1:N',desc:'header → items'}]}),
  M({t:'MSEG',mod:'MM',en:'Material document item (ECC)',he:'פריט מסמך חומר (ECC)',tcodes:'MB51',
     s4:'הוחלף ב-MATDOC ב-S/4HANA.',s4alt:'MATDOC',cds:['I_MaterialDocumentItem'],
     fields:[['MBLNR','Mat doc','מסמך חומר','PK'],['MJAHR','Year','שנה','PK'],['ZEILE','Item','פריט','PK'],['MATNR','Material','חומר','FK'],['BWART','Movement type','סוג תנועה','FK'],['MENGE','Quantity','כמות','-']],
     rel:[{role:'child',table:'MKPF',card:'N:1',desc:'item → header'},{role:'child',table:'MARA',card:'N:1',desc:'item → material'}]}),
  M({t:'RBKP',mod:'MM',en:'Invoice document header (MM-LIV)',he:'כותרת חשבונית ספק (LIV)',tcodes:'MIRO/MIR4',s4:'נשמר; רישום ל-ACDOCA.',funcs:['BAPI_INCOMINGINVOICE_CREATE'],cds:['I_SupplierInvoice'],
     fields:[['BELNR','Invoice doc','מסמך חשבונית','PK'],['GJAHR','Year','שנה','PK'],['LIFNR','Vendor','ספק','FK']],
     rel:[{role:'child',table:'EKKO',card:'N:1',desc:'invoice → PO'},{role:'parent',table:'BKPF',card:'1:1',desc:'LIV → FI document'}]}),
  // ---- SD ----
  M({t:'VBAK',mod:'SD',en:'Sales document header',he:'כותרת מסמך מכירה',tcodes:'VA01/VA02/VA03',
     fiori:'Manage Sales Orders (F1873)',s4:'נשמר; VBUK/VBUP בוטלו – הסטטוס בתוך VBAK.',funcs:['BAPI_SALESORDER_CREATEFROMDAT2','BAPI_SALESORDER_CHANGE'],cds:['I_SalesOrder'],
     fields:[['VBELN','Sales doc','מסמך מכירה','PK'],['AUART','Doc type','סוג מסמך','-'],['KUNNR','Sold-to','לקוח','FK'],['VKORG','Sales org','ארגון מכירות','-']],
     rel:[{role:'parent',table:'VBAP',card:'1:N',desc:'header → items'},{role:'child',table:'KNA1',card:'N:1',desc:'order → customer'},{role:'parent',table:'VBFA',card:'1:N',desc:'document flow'}]}),
  M({t:'VBAP',mod:'SD',en:'Sales document item',he:'פריט מסמך מכירה',tcodes:'VA03',s4:'נשמר.',cds:['I_SalesOrderItem'],
     fields:[['VBELN','Sales doc','מסמך','PK'],['POSNR','Item','פריט','PK'],['MATNR','Material','חומר','FK'],['KWMENG','Order qty','כמות','-']],
     rel:[{role:'child',table:'VBAK',card:'N:1',desc:'item → header'},{role:'child',table:'MARA',card:'N:1',desc:'item → material'}]}),
  M({t:'LIKP',mod:'SD',en:'Delivery header',he:'כותרת תעודת משלוח',tcodes:'VL01N/VL02N/VL03N',
     fiori:'Manage Outbound Deliveries',s4:'נשמר.',funcs:['BAPI_OUTB_DELIVERY_CREATE_SLS'],cds:['I_OutboundDelivery'],
     fields:[['VBELN','Delivery','משלוח','PK'],['LFART','Delivery type','סוג','-'],['KUNNR','Ship-to','נמען','FK']],
     rel:[{role:'parent',table:'LIPS',card:'1:N',desc:'header → items'},{role:'child',table:'VBAK',card:'N:1',desc:'delivery → sales order',via:'VBFA'}]}),
  M({t:'LIPS',mod:'SD',en:'Delivery item',he:'פריט תעודת משלוח',tcodes:'VL03N',s4:'נשמר.',cds:['I_OutboundDeliveryItem'],
     fields:[['VBELN','Delivery','משלוח','PK'],['POSNR','Item','פריט','PK'],['MATNR','Material','חומר','FK'],['LFIMG','Delivered qty','כמות','-']],
     rel:[{role:'child',table:'LIKP',card:'N:1',desc:'item → header'}]}),
  M({t:'VBRK',mod:'SD',en:'Billing document header',he:'כותרת חשבונית מכירה',tcodes:'VF01/VF02/VF03',
     fiori:'Create Billing Documents (F0798)',s4:'נשמר; רישום ל-ACDOCA.',funcs:['BAPI_BILLINGDOC_CREATEMULTIPLE'],cds:['I_BillingDocument'],
     fields:[['VBELN','Billing doc','חשבונית','PK'],['FKART','Billing type','סוג','-'],['KUNRG','Payer','משלם','FK'],['NETWR','Net value','ערך נטו','-']],
     rel:[{role:'parent',table:'VBRP',card:'1:N',desc:'header → items'},{role:'parent',table:'BKPF',card:'1:1',desc:'billing → FI document'}]}),
  M({t:'VBRP',mod:'SD',en:'Billing document item',he:'פריט חשבונית מכירה',tcodes:'VF03',s4:'נשמר.',cds:['I_BillingDocumentItem'],
     fields:[['VBELN','Billing','חשבונית','PK'],['POSNR','Item','פריט','PK'],['MATNR','Material','חומר','FK']],
     rel:[{role:'child',table:'VBRK',card:'N:1',desc:'item → header'}]}),
  M({t:'VBFA',mod:'SD',en:'Sales document flow',he:'זרימת מסמכי מכירה',tcodes:'VA03',s4:'נשמר.',cds:['I_SalesDocumentFlow'],
     fields:[['VBELV','Preceding doc','מסמך קודם','PK'],['POSNV','Prec. item','פריט','PK'],['VBELN','Subseq doc','מסמך עוקב','PK']],
     rel:[{role:'child',table:'VBAK',card:'N:1',desc:'flow node'}]}),
  // ---- FI ----
  M({t:'BKPF',mod:'FI',en:'Accounting document header (ECC)',he:'כותרת מסמך הנה״ח (ECC)',tcodes:'FB01/FB03',
     s4:'נשמר ככותרת; שורות עוברות ל-ACDOCA.',funcs:['BAPI_ACC_DOCUMENT_POST'],cds:['I_JournalEntry'],
     fields:[['BUKRS','Company code','חברה','PK'],['BELNR','Document','מסמך','PK'],['GJAHR','Year','שנה','PK'],['BLART','Doc type','סוג','-']],
     rel:[{role:'parent',table:'BSEG',card:'1:N',desc:'header → line items'},{role:'child',table:'T001',card:'N:1',desc:'doc → company code'},{role:'parent',table:'ACDOCA',card:'1:N',desc:'header → universal journal'}]}),
  M({t:'BSEG',mod:'FI',en:'Accounting document line item (ECC)',he:'שורת מסמך הנה״ח (ECC)',tcodes:'FB03',
     s4:'מאוחד ב-ACDOCA (Universal Journal) ב-S/4HANA.',s4alt:'ACDOCA',cds:['I_JournalEntryItem'],
     fields:[['BUKRS','Company code','חברה','PK'],['BELNR','Document','מסמך','PK'],['GJAHR','Year','שנה','PK'],['BUZEI','Line','שורה','PK'],['HKONT','GL account','חשבון','FK'],['DMBTR','Amount','סכום','-']],
     rel:[{role:'child',table:'BKPF',card:'N:1',desc:'line → header'}]}),
  M({t:'ACDOCA',mod:'FI',en:'Universal Journal (S/4)',he:'יומן אוניברסלי (S/4)',tcodes:'—',shared:true,
     s4:'מקור אמת יחיד ב-S/4HANA: מאחד FI (BSEG), CO (COEP), ML, AA. הליבה הפיננסית.',cds:['I_JournalEntryItem','I_GLAccountLineItemRawData'],
     fields:[['RLDNR','Ledger','ספר','PK'],['RBUKRS','Company code','חברה','PK'],['BELNR','Document','מסמך','PK'],['DOCLN','Line','שורה','PK'],['RACCT','Account','חשבון','FK'],['HSL','Amount (local)','סכום','-']],
     rel:[{role:'child',table:'BKPF',card:'N:1',desc:'journal → header'},{role:'child',table:'T001',card:'N:1',desc:'journal → company code'}]}),
  M({t:'SKA1',mod:'FI',en:'G/L account master (chart)',he:'אב חשבון ראשי',tcodes:'FS00',s4:'נשמר.',cds:['I_GLAccountInChartOfAccounts'],
     fields:[['KTOPL','Chart of accts','לוח חשבונות','PK'],['SAKNR','GL account','חשבון','PK']],
     rel:[{role:'parent',table:'ACDOCA',card:'1:N',desc:'account → postings'}]}),
  // ---- CO ----
  M({t:'COEP',mod:'CO',en:'CO line items (by period, ECC)',he:'שורות CO לפי תקופה (ECC)',tcodes:'KSB1',
     s4:'מאוחד ב-ACDOCA ב-S/4HANA.',s4alt:'ACDOCA',cds:['I_CostObjectLineItem'],
     fields:[['KOKRS','Controlling area','אזור בקרה','PK'],['BELNR','Document','מסמך','PK'],['BUZEI','Line','שורה','PK'],['OBJNR','Object no.','מס׳ אובייקט','FK'],['WKGBTR','Amount','סכום','-']],
     rel:[{role:'parent',table:'ACDOCA',card:'1:1',desc:'CO line → universal journal'},{role:'child',table:'COBK',card:'N:1',desc:'line → CO header'}]}),
  M({t:'COBK',mod:'CO',en:'CO document header (ECC)',he:'כותרת מסמך CO (ECC)',tcodes:'KSB1',s4:'מאוחד ב-ACDOCA.',
     fields:[['KOKRS','Controlling area','אזור בקרה','PK'],['BELNR','Document','מסמך','PK']],
     rel:[{role:'parent',table:'COEP',card:'1:N',desc:'header → CO lines'}]}),
  M({t:'CSKS',mod:'CO',en:'Cost center master',he:'אב מרכז עלות',tcodes:'KS01/KS02/KS03',s4:'נשמר.',cds:['I_CostCenter'],
     fields:[['KOKRS','Controlling area','אזור בקרה','PK'],['KOSTL','Cost center','מרכז עלות','PK'],['DATBI','Valid to','בתוקף עד','PK']],
     rel:[{role:'parent',table:'COEP',card:'1:N',desc:'cost center → postings',via:'OBJNR'}]}),
  // ---- QM ----
  M({t:'QALS',mod:'QM',en:'Inspection lot record',he:'רשומת מנת בדיקה',tcodes:'QA01/QA02/QA03/QA32',
     fiori:'Manage Inspection Lots',s4:'נשמר.',funcs:['BAPI_INSPLOT_GETLIST','BAPI_INSPOPER_RECORDRESULTS'],cds:['I_InspectionLot'],
     fields:[['PRUEFLOS','Inspection lot','מנת בדיקה','PK'],['MATNR','Material','חומר','FK'],['WERK','Plant','מפעל','FK'],['CHARG','Batch','אצווה','FK'],['HERKUNFT','Origin','מקור','-']],
     rel:[{role:'child',table:'MARA',card:'N:1',desc:'lot → material'},{role:'parent',table:'QAVE',card:'1:1',desc:'lot → usage decision'},{role:'child',table:'PLKO',card:'N:1',desc:'lot → inspection plan'}]}),
  M({t:'QAVE',mod:'QM',en:'Usage decision (inspection)',he:'החלטת שימוש',tcodes:'QA11/QA12',s4:'נשמר.',cds:['I_InspectionLotUsageDecision'],
     fields:[['PRUEFLOS','Inspection lot','מנת בדיקה','PK'],['VCODE','UD code','קוד החלטה','-'],['VDATUM','UD date','תאריך','-']],
     rel:[{role:'child',table:'QALS',card:'1:1',desc:'UD → inspection lot'}]}),
  // ---- CS ----
  M({t:'VIQMEL',mod:'CS',en:'Service notification (view on QMEL)',he:'הודעת שירות',tcodes:'IW51/IW52/IW53',
     fiori:'Manage Service Orders',s4:'נשמר; משתף QMEL עם PM/QM.',funcs:['BAPI_SERVNOT_CREATE','BAPI_SERVNOT_GET_DETAIL'],cds:['I_ServiceRequest'],
     fields:[['QMNUM','Notification','הודעה','PK'],['QMART','Notif type','סוג','-'],['EQUNR','Equipment','ציוד','FK'],['KUNUM','Customer','לקוח','FK']],
     rel:[{role:'child',table:'QMEL',card:'1:1',desc:'service notif → QMEL'},{role:'child',table:'EQUI',card:'N:1',desc:'notif → equipment'}]}),
  // ---- shared landscape objects (give them table detail) ----
  M({t:'MATDOC',mod:'MM',en:'Material document (unified, S/4)',he:'מסמך חומר מאוחד (S/4)',tcodes:'MIGO/MB51N',shared:true,
     s4:'מאחד MKPF+MSEG ל-S/4HANA. טבלאות צבירת מלאי (MARD/MCHB) מחושבות ממנה.',funcs:['BAPI_GOODSMVT_CREATE'],cds:['I_MaterialDocumentItem'],
     fields:[['MBLNR','Mat doc','מסמך','PK'],['MJAHR','Year','שנה','PK'],['ZEILE','Item','פריט','PK'],['MATNR','Material','חומר','FK'],['BWART','Movement type','סוג תנועה','FK'],['CHARG','Batch','אצווה','FK']],
     rel:[{role:'child',table:'MARA',card:'N:1',desc:'doc → material'}]}),
  M({t:'T001',mod:'FI',en:'Company codes',he:'חברות',tcodes:'OX02',shared:true,s4:'נשמר.',cds:['I_CompanyCode'],
     fields:[['BUKRS','Company code','חברה','PK'],['BUTXT','Name','שם','-'],['WAERS','Currency','מטבע','-']],
     rel:[{role:'parent',table:'ACDOCA',card:'1:N',desc:'company code → postings'}]}),
  M({t:'T001W',mod:'MM',en:'Plants / valuation area',he:'מפעלים / אזור הערכה',tcodes:'OX10',shared:true,s4:'נשמר.',cds:['I_Plant'],
     fields:[['WERKS','Plant','מפעל','PK'],['NAME1','Name','שם','-']],
     rel:[{role:'parent',table:'MARC',card:'1:N',desc:'plant → material/plant'}]}),
  M({t:'CDHDR',mod:'MM',en:'Change document header',he:'כותרת מסמך שינוי',tcodes:'—',shared:true,s4:'נשמר (audit cross-module).',
     fields:[['OBJECTCLAS','Object class','מחלקה','PK'],['OBJECTID','Object id','מזהה','PK'],['CHANGENR','Change no.','מס׳ שינוי','PK']],
     rel:[{role:'parent',table:'CDPOS',card:'1:N',desc:'header → change items'}]}),
  M({t:'CDPOS',mod:'MM',en:'Change document items',he:'פריטי מסמך שינוי',tcodes:'—',shared:true,s4:'נשמר.',
     fields:[['OBJECTCLAS','Object class','מחלקה','PK'],['OBJECTID','Object id','מזהה','PK'],['CHANGENR','Change no.','מס׳ שינוי','PK'],['TABNAME','Table','טבלה','-'],['FNAME','Field','שדה','-']],
     rel:[{role:'child',table:'CDHDR',card:'N:1',desc:'item → header'}]}),
  M({t:'OBJNR',mod:'PP',en:'Status object number (link field)',he:'מספר אובייקט סטטוס (שדה קישור)',tcodes:'—',shared:true,
     s4:'שדה מפתח לקישור JEST/JSTO לאובייקטים (AUFK/AFKO/QMEL/EQUI). עמוד שדרה לניהול סטטוס חוצה-מודולים.',
     fields:[['OBJNR','Object number','מספר אובייקט','PK']],
     rel:[{role:'parent',table:'JEST',card:'1:N',desc:'object → statuses'},{role:'parent',table:'JSTO',card:'1:1',desc:'object → status profile'}]}),
  M({t:'KNA1',mod:'SD',en:'Customer master (general)',he:'אב לקוח (כללי)',tcodes:'XD03/BP',shared:true,
     s4:'אוחד ל-Business Partner (BUT000) ב-S/4HANA – BP חובה.',s4alt:'BUT000',cds:['I_Customer'],
     fields:[['KUNNR','Customer','לקוח','PK'],['NAME1','Name','שם','-'],['LAND1','Country','מדינה','-']],
     rel:[{role:'parent',table:'VBAK',card:'1:N',desc:'customer → sales orders'}]}),
  M({t:'LFA1',mod:'MM',en:'Vendor master (general)',he:'אב ספק (כללי)',tcodes:'XK03/BP',shared:true,
     s4:'אוחד ל-Business Partner (BUT000) ב-S/4HANA.',s4alt:'BUT000',cds:['I_Supplier'],
     fields:[['LIFNR','Vendor','ספק','PK'],['NAME1','Name','שם','-'],['LAND1','Country','מדינה','-']],
     rel:[{role:'parent',table:'EKKO',card:'1:N',desc:'vendor → purchase orders'}]}),

  // ================= V3 ADDITIONS =================
  // ---- Batch Management ----
  M({t:'MCH1',mod:'BATCH',en:'Batch master (client level)',he:'אב אצווה (רמת מנדט)',tcodes:'MSC1N/MSC2N/MSC3N',
     s4:'נשמר; קריטי לתעשיית מזון/משקאות ב-CBC. אצווה ברמת לקוח.',funcs:['BAPI_BATCH_CREATE','BAPI_BATCH_GET_DETAIL','VB_BATCH_GET_DETAIL'],cds:['I_Batch'],
     fields:[['MATNR','Material','חומר','PK'],['CHARG','Batch','אצווה','PK'],['ERSDA','Created on','נוצר בתאריך','-']],
     rel:[{role:'child',table:'MARA',card:'N:1',desc:'batch → material'},{role:'parent',table:'MCHB',card:'1:N',desc:'batch → stock'},{role:'parent',table:'AFPO',card:'N:1',desc:'batch ← production order item'},{role:'child',table:'KSSK',card:'1:1',desc:'batch → classification'}]}),
  M({t:'MCHA',mod:'BATCH',en:'Batch master (plant level)',he:'אב אצווה (רמת מפעל)',tcodes:'MSC2N',s4:'נשמר.',cds:['I_BatchByPlant'],
     fields:[['MATNR','Material','חומר','PK'],['WERKS','Plant','מפעל','PK'],['CHARG','Batch','אצווה','PK']],
     rel:[{role:'child',table:'MCH1',card:'N:1',desc:'plant batch → client batch'},{role:'child',table:'T001W',card:'N:1',desc:'batch → plant'}]}),
  M({t:'MCHB',mod:'BATCH',en:'Batch stock',he:'מלאי אצווה',tcodes:'MMBE',s4:'מחושב on-the-fly מ-MATDOC ב-S/4HANA.',cds:['I_MaterialStock'],
     fields:[['MATNR','Material','חומר','PK'],['WERKS','Plant','מפעל','PK'],['LGORT','Storage loc','אחסון','PK'],['CHARG','Batch','אצווה','PK'],['CLABS','Unrestricted','חופשי','-']],
     rel:[{role:'child',table:'MCH1',card:'N:1',desc:'stock → batch'},{role:'parent',table:'MCHBH',card:'1:N',desc:'stock → history'}]}),
  M({t:'MCHBH',mod:'BATCH',en:'Batch stock history',he:'היסטוריית מלאי אצווה',tcodes:'—',s4:'נשמר.',
     fields:[['MATNR','Material','חומר','PK'],['WERKS','Plant','מפעל','PK'],['CHARG','Batch','אצווה','PK'],['LFGJA','Fiscal year','שנת כספים','PK']],
     rel:[{role:'child',table:'MCHB',card:'N:1',desc:'history → batch stock'}]}),
  // ---- Classification System ----
  M({t:'KLAH',mod:'CLASS',en:'Class header data',he:'כותרת מחלקה (Class)',tcodes:'CL01/CL02/CL03',s4:'נשמר.',cds:['I_ClassForClassification'],
     fields:[['CLINT','Internal class','מחלקה פנימית','PK'],['KLART','Class type','סוג מחלקה','-'],['CLASS','Class','מחלקה','-']],
     rel:[{role:'parent',table:'KSSK',card:'1:N',desc:'class → assignments'},{role:'parent',table:'KSML',card:'1:N',desc:'class → characteristics'}]}),
  M({t:'KSSK',mod:'CLASS',en:'Object ↔ class assignment',he:'שיוך אובייקט למחלקה',tcodes:'CL20N/CL24N',s4:'נשמר; הליבה של סיווג חומרים/אצוות.',cds:['I_ClassAssignment'],
     fields:[['OBJEK','Object key','מפתח אובייקט','PK'],['MAFID','Object type','סוג','PK'],['KLART','Class type','סוג מחלקה','PK'],['CLINT','Class','מחלקה','FK']],
     rel:[{role:'child',table:'KLAH',card:'N:1',desc:'assignment → class'},{role:'child',table:'MARA',card:'N:1',desc:'classification → material master'},{role:'parent',table:'AUSP',card:'1:N',desc:'assignment → values'}]}),
  M({t:'AUSP',mod:'CLASS',en:'Characteristic values',he:'ערכי מאפיין',tcodes:'CL20N',s4:'נשמר.',cds:['I_CharacteristicValue'],
     fields:[['OBJEK','Object','אובייקט','PK'],['ATINN','Characteristic','מאפיין','PK'],['ATWRT','Char value','ערך','-'],['KLART','Class type','סוג','PK']],
     rel:[{role:'child',table:'KSSK',card:'N:1',desc:'value → assignment'},{role:'child',table:'CABN',card:'N:1',desc:'value → characteristic'}]}),
  M({t:'CABN',mod:'CLASS',en:'Characteristic master',he:'אב מאפיין',tcodes:'CT04',s4:'נשמר.',cds:['I_Characteristic'],
     fields:[['ATINN','Char (internal)','מאפיין פנימי','PK'],['ATNAM','Char name','שם מאפיין','-'],['ATFOR','Data type','סוג נתון','-']],
     rel:[{role:'parent',table:'CAWN',card:'1:N',desc:'characteristic → allowed values'},{role:'parent',table:'AUSP',card:'1:N',desc:'characteristic → values'}]}),
  M({t:'CAWN',mod:'CLASS',en:'Characteristic allowed values',he:'ערכים מותרים למאפיין',tcodes:'CT04',s4:'נשמר.',
     fields:[['ATINN','Characteristic','מאפיין','PK'],['ATZHL','Value counter','מונה ערך','PK'],['ATWRT','Value','ערך','-']],
     rel:[{role:'child',table:'CABN',card:'N:1',desc:'allowed value → characteristic'}]}),
  M({t:'KSML',mod:'CLASS',en:'Characteristics of a class',he:'מאפייני מחלקה',tcodes:'CL02',s4:'נשמר.',
     fields:[['CLINT','Class','מחלקה','PK'],['IMERK','Internal char','מאפיין פנימי','PK']],
     rel:[{role:'child',table:'KLAH',card:'N:1',desc:'class chars → class'},{role:'child',table:'CABN',card:'N:1',desc:'→ characteristic'}]}),
  // ---- QM additions ----
  M({t:'QAMV',mod:'QM',en:'Inspection characteristic specs',he:'מפרט מאפייני בדיקה',tcodes:'QA32',s4:'נשמר.',cds:['I_InspectionCharacteristic'],
     fields:[['PRUEFLOS','Inspection lot','מנת בדיקה','PK'],['VORGLFNR','Operation','פעולה','PK'],['MERKNR','Char no.','מס׳ מאפיין','PK']],
     rel:[{role:'child',table:'QALS',card:'N:1',desc:'char specs → inspection lot'}]}),
  M({t:'QPAM',mod:'QM',en:'Inspection catalog / code groups',he:'קטלוג בדיקה / קבוצות קוד',tcodes:'QS41',s4:'נשמר.',
     fields:[['KATALOGART','Catalog type','סוג קטלוג','PK'],['CODEGRUPPE','Code group','קבוצת קוד','PK'],['CODE','Code','קוד','PK']],
     rel:[{role:'parent',table:'QAVE',card:'1:N',desc:'catalog → usage decision codes'}]}),
  // ---- SD additions ----
  M({t:'VBEP',mod:'SD',en:'Sales document schedule lines',he:'שורות לוח זמנים מכירה',tcodes:'VA03',s4:'נשמר.',cds:['I_SalesOrderScheduleLine'],
     fields:[['VBELN','Sales doc','מסמך','PK'],['POSNR','Item','פריט','PK'],['ETENR','Sched line','שורת לו״ז','PK'],['EDATU','Date','תאריך','-'],['WMENG','Order qty','כמות','-']],
     rel:[{role:'child',table:'VBAP',card:'N:1',desc:'schedule line → item'}]}),
  M({t:'KONV',mod:'SD',en:'Conditions (pricing, ECC)',he:'תנאים (תמחור, ECC)',tcodes:'—',s4:'הוחלף ב-PRCD_ELEMENTS ב-S/4HANA.',s4alt:'PRCD_ELEMENTS',
     fields:[['KNUMV','Doc condition','מס׳ תנאי מסמך','PK'],['KPOSN','Item','פריט','PK'],['STUNR','Step','שלב','PK'],['KSCHL','Cond type','סוג תנאי','-'],['KWERT','Value','ערך','-']],
     rel:[{role:'child',table:'VBAP',card:'N:1',desc:'pricing ← sales item'},{role:'child',table:'VBRP',card:'N:1',desc:'pricing ← billing item'}]}),
  M({t:'PRCD_ELEMENTS',mod:'SD',en:'Pricing conditions (S/4)',he:'תנאי תמחור (S/4)',tcodes:'—',s4:'מחליף את KONV ב-S/4HANA.',cds:['I_PricingElement'],
     fields:[['KNUMV','Doc condition','מס׳ תנאי','PK'],['KPOSN','Item','פריט','PK'],['STUNR','Step','שלב','PK'],['KSCHL','Cond type','סוג תנאי','-']],
     rel:[{role:'child',table:'VBAP',card:'N:1',desc:'pricing ← sales item'}]}),
  // ---- MM additions ----
  M({t:'EKET',mod:'MM',en:'PO schedule lines',he:'שורות לוח זמנים הזמנת רכש',tcodes:'ME23N',s4:'נשמר.',cds:['I_PurchaseOrderScheduleLine'],
     fields:[['EBELN','PO','הזמנה','PK'],['EBELP','Item','פריט','PK'],['ETENR','Sched line','שורת לו״ז','PK'],['EINDT','Delivery date','תאריך אספקה','-'],['MENGE','Qty','כמות','-']],
     rel:[{role:'child',table:'EKPO',card:'N:1',desc:'schedule line → PO item'}]}),
  // ---- FI additions (open items) ----
  M({t:'BSID',mod:'FI',en:'Customer open items (ECC)',he:'פריטים פתוחים לקוח (ECC)',tcodes:'FBL5N',s4:'מחושב מ-ACDOCA ב-S/4HANA.',s4alt:'ACDOCA',cds:['I_OperationalAcctgDocItem'],
     fields:[['BUKRS','Company code','חברה','PK'],['KUNNR','Customer','לקוח','PK'],['BELNR','Document','מסמך','PK'],['DMBTR','Amount','סכום','-']],
     rel:[{role:'child',table:'KNA1',card:'N:1',desc:'open item → customer'},{role:'child',table:'ACDOCA',card:'N:1',desc:'→ universal journal'}]}),
  M({t:'BSAD',mod:'FI',en:'Customer cleared items (ECC)',he:'פריטים מסולקים לקוח (ECC)',tcodes:'FBL5N',s4:'מחושב מ-ACDOCA.',s4alt:'ACDOCA',
     fields:[['BUKRS','Company code','חברה','PK'],['KUNNR','Customer','לקוח','PK'],['AUGBL','Clearing doc','מסמך סילוק','-']],
     rel:[{role:'child',table:'KNA1',card:'N:1',desc:'cleared item → customer'}]}),
  M({t:'BSIK',mod:'FI',en:'Vendor open items (ECC)',he:'פריטים פתוחים ספק (ECC)',tcodes:'FBL1N',s4:'מחושב מ-ACDOCA.',s4alt:'ACDOCA',
     fields:[['BUKRS','Company code','חברה','PK'],['LIFNR','Vendor','ספק','PK'],['BELNR','Document','מסמך','PK'],['DMBTR','Amount','סכום','-']],
     rel:[{role:'child',table:'LFA1',card:'N:1',desc:'open item → vendor'},{role:'child',table:'ACDOCA',card:'N:1',desc:'→ universal journal'}]}),
  M({t:'BSAK',mod:'FI',en:'Vendor cleared items (ECC)',he:'פריטים מסולקים ספק (ECC)',tcodes:'FBL1N',s4:'מחושב מ-ACDOCA.',s4alt:'ACDOCA',
     fields:[['BUKRS','Company code','חברה','PK'],['LIFNR','Vendor','ספק','PK'],['AUGBL','Clearing doc','מסמך סילוק','-']],
     rel:[{role:'child',table:'LFA1',card:'N:1',desc:'cleared item → vendor'}]}),
  // ---- IDOC framework tables ----
  M({t:'EDIDC',mod:'IDOC',en:'IDoc control record',he:'רשומת בקרה של IDoc',tcodes:'WE02/WE05',s4:'נשמר; ליבת מסגרת ה-IDoc.',funcs:['IDOC_INBOUND_ASYNCHRONOUS','MASTER_IDOC_DISTRIBUTE'],cds:['I_IDoc'],
     fields:[['DOCNUM','IDoc number','מספר IDoc','PK'],['MESTYP','Message type','סוג הודעה','-'],['IDOCTP','Basic type','סוג בסיס','-'],['STATUS','Status','סטטוס','-']],
     rel:[{role:'parent',table:'EDIDS',card:'1:N',desc:'control → status records'},{role:'parent',table:'EDID4',card:'1:N',desc:'control → data segments'},{role:'child',table:'MARA',card:'N:1',desc:'MATMAS IDoc → material'}]}),
  M({t:'EDIDS',mod:'IDOC',en:'IDoc status records',he:'רשומות סטטוס IDoc',tcodes:'WE02',s4:'נשמר.',
     fields:[['DOCNUM','IDoc number','מספר IDoc','PK'],['LOGDAT','Log date','תאריך','PK'],['STATUS','Status code','קוד סטטוס','-'],['STAMID','Message id','מזהה הודעה','-']],
     rel:[{role:'child',table:'EDIDC',card:'N:1',desc:'status → control'}]}),
  M({t:'EDID4',mod:'IDOC',en:'IDoc data segments',he:'מקטעי נתונים IDoc',tcodes:'WE02',s4:'נשמר.',
     fields:[['DOCNUM','IDoc number','מספר IDoc','PK'],['SEGNUM','Segment no.','מס׳ מקטע','PK'],['SEGNAM','Segment name','שם מקטע','-'],['SDATA','Segment data','נתוני מקטע','-']],
     rel:[{role:'child',table:'EDIDC',card:'N:1',desc:'segment → control'}]}),
];

// extra cross-module edges that live on EXISTING tables (added post-merge)
const extraEdges = [
  {from:'MATDOC',to:'ACDOCA',desc:'material movement → universal journal'},
  {from:'VBAP',to:'KONV',desc:'sales item → pricing conditions'},
  {from:'AUFK',to:'COEP',desc:'order (PM/PP) → CO postings (settlement)'},
  {from:'VIQMEL',to:'VBAK',desc:'service notification → sales/service order (CS→SD)'},
  {from:'VIQMEL',to:'AFIH',desc:'service notification → maintenance order (CS→PM)'},
  {from:'MCH1',to:'AFPO',desc:'batch ← production order item (Batch→Production Orders)'},
  {from:'QALS',to:'MCH1',desc:'inspection lot → batch (QM→Batch Management)'},
  {from:'KSSK',to:'MARA',desc:'classification → material master'},
  {from:'MCH1',to:'MARA',desc:'batch → material master'},
  {from:'VBRK',to:'BKPF',desc:'SD billing → FI accounting document'},
  {from:'VBAP',to:'PRCD_ELEMENTS',desc:'sales item → pricing conditions (S/4)'},
  {from:'MSEG',to:'ACDOCA',desc:'goods movement → FI/CO posting'},
  {from:'MSEG',to:'COEP',desc:'goods movement → CO posting'},
];

// ---------- merge real + modeled into one table set ----------
const tables = [];
const realByName = {};
// dedupe real inventory by table name (same table appears across topics)
const byName = {};
for(const t of inv.tables){
  realByName[t.tableName]=t;
  const rels = t.relations.map(r=>({role:r.role,table:r.table,card:r.card,desc:r.desc}));
  if(byName[t.tableName]){ // merge duplicate (same table, different topic) — union relations + richest fields
    const e=byName[t.tableName];
    const seen=new Set(e.rel.map(r=>r.role+'|'+r.table));
    for(const r of rels){const k=r.role+'|'+r.table; if(!seen.has(k)){seen.add(k);e.rel.push(r);}}
    if(t.fields.length> e.fields.length){e.fields=t.fields.map(f=>[f.tech,f.en,f.he,f.key]);e.pk=t.pk;}
    if((t.funcs||[]).length>e.funcs.length) e.funcs=t.funcs;
    continue;
  }
  const row={ name:t.tableName, mod:t.module, real:true, en:t.descriptionEn, he:t.descriptionHe,
    tcodes:t.tcodes||'', fiori:t.fioriApp||'', s4:t.s4Note||'', s4alt:t.s4AltTable||'',
    pk:t.pk, fields:t.fields.map(f=>[f.tech,f.en,f.he,f.key]),
    funcs:t.funcs, cds:[], topic:t.topicTitle, topicIdx:t.topicIdx, rel:rels };
  byName[t.tableName]=row; tables.push(row);
}
for(const m of modeled){
  if(realByName[m.t]) continue; // don't duplicate real ones
  tables.push({name:m.t,mod:m.mod,real:false,en:m.en,he:m.he,tcodes:m.tcodes,fiori:m.fiori,
    s4:m.s4||'',s4alt:m.s4alt||'',pk:m.fields.filter(f=>f[3]==='PK').map(f=>f[0]),
    fields:m.fields,funcs:m.funcs,cds:m.cds,rel:m.rel,topic:m.mod,topicIdx:0,
    degree:0,inDegree:0,outDegree:0,density:0});
}

// ---------- edges from all relations (parent->child) ----------
const nameset=new Set(tables.map(t=>t.name));
const eseen=new Set(), edges=[];
for(const t of tables){
  for(const r of (t.rel||[])){
    let from,to;
    if(r.role==='parent'){from=t.name;to=r.table;} else {from=r.table;to=t.name;}
    if(from===to) continue;
    const k=from+'>'+to; if(eseen.has(k))continue; eseen.add(k);
    const modFrom=(tables.find(x=>x.name===from)||{}).mod, modTo=(tables.find(x=>x.name===to)||{}).mod;
    edges.push({from,to,card:r.card||'',cross: modFrom&&modTo&&modFrom!==modTo});
  }
}
// explicit cross-module convergence edges on existing tables
for(const e of extraEdges){
  if(!nameset.has(e.from)||!nameset.has(e.to)) continue;
  const k=e.from+'>'+e.to; if(eseen.has(k))continue; eseen.add(k);
  const modFrom=(tables.find(x=>x.name===e.from)||{}).mod, modTo=(tables.find(x=>x.name===e.to)||{}).mod;
  edges.push({from:e.from,to:e.to,card:'',cross:modFrom&&modTo&&modFrom!==modTo});
}
// recompute degree across merged graph
const deg={},ind={},outd={};
const addv=(o,a,b)=>{(o[a]=o[a]||new Set()).add(b);};
for(const e of edges){addv(deg,e.from,e.to);addv(deg,e.to,e.from);addv(outd,e.from,e.to);addv(ind,e.to,e.from);}
const N=nameset.size;
for(const t of tables){t.degree=(deg[t.name]||new Set()).size;t.inDegree=(ind[t.name]||new Set()).size;t.outDegree=(outd[t.name]||new Set()).size;t.density=+(t.degree/(N-1)).toFixed(4);t.isHub=t.degree>=5;}

// ---------- architecture zones (V3) ----------
const ZONES=[
  {id:'Master',he:'נתוני אב',en:'Master Data',color:'#3b82f6'},
  {id:'Transaction',he:'נתוני תנועה',en:'Transaction Data',color:'#a855f7'},
  {id:'Integration',he:'שכבת אינטגרציה',en:'Integration Layer',color:'#94a3b8'},
  {id:'Finance',he:'שכבת פיננסים',en:'Finance Layer',color:'#ef4444'},
  {id:'Shared',he:'אובייקטים משותפים',en:'Shared SAP Objects',color:'#f2c14e'},
];
const sharedNamesSet=new Set(['MARA','AUFK','JEST','JSTO','OBJNR','CRHD','CDHDR','CDPOS','MATDOC','ACDOCA','T001','T001W','KNA1','LFA1']);
const masterNames=new Set(['MARA','MARC','MARD','MBEW','KNA1','LFA1','CRHD','EQUI','EQKT','IFLOT','PLKO','PLPO','MAST','STKO','STPO','CSKS','SKA1','T001','T001W','KLAH','CABN','CAWN','KSML','MCH1','MCHA','MAPL','ABFKO']);
function zoneOf(t){
  if(sharedNamesSet.has(t.name)) return 'Shared';
  if(t.mod==='IDOC') return 'Integration';
  if(t.mod==='FI'||t.mod==='CO') return 'Finance';
  if(masterNames.has(t.name)) return 'Master';
  return 'Transaction';
}
for(const t of tables){ t.zone = zoneOf(t); }

// ---------- shared objects (Layer 5) ----------
const sharedNames=['MARA','AUFK','JEST','JSTO','OBJNR','CRHD','CDHDR','CDPOS','MATDOC','ACDOCA','T001','T001W','KNA1','LFA1'];
const sharedMeta={
 MARA:{he:'אב חומר (כללי)',mods:['MM','SD','PP','PP-PI','PM','QM','CS','BATCH','CLASS']},
 AUFK:{he:'אב הזמנה (PP/PM/CS/CO)',mods:['PP','PP-PI','PM','CS','CO']},
 JEST:{he:'סטטוס אובייקט (בודד)',mods:['PP','PP-PI','PM','CS','QM','SD']},
 JSTO:{he:'מידע אובייקט סטטוס',mods:['PP','PP-PI','PM','CS','QM','SD']},
 OBJNR:{he:'מספר אובייקט סטטוס (שדה קישור)',mods:['PP','PP-PI','PM','CS','QM','CO']},
 CRHD:{he:'כותרת מרכז עבודה/משאב',mods:['PP','PP-PI','PM','CS']},
 CDHDR:{he:'כותרת מסמך שינוי (audit)',mods:['MM','SD','PP','PM','FI','QM']},
 CDPOS:{he:'פריט מסמך שינוי (audit)',mods:['MM','SD','PP','PM','FI','QM']},
 MATDOC:{he:'מסמך חומר מאוחד (S/4)',mods:['MM','PP','PP-PI','QM']},
 ACDOCA:{he:'יומן אוניברסלי (S/4)',mods:['FI','CO']},
 T001:{he:'חברות (Company codes)',mods:['FI','CO','MM','SD']},
 T001W:{he:'מפעלים / אזור הערכה',mods:['MM','PP','PP-PI','PM','QM','SD']},
 KNA1:{he:'אב לקוח (כללי)',mods:['SD','FI','CS']},
 LFA1:{he:'אב ספק (כללי)',mods:['MM','FI']},
};
const shared = sharedNames.map(n=>{
  const t=tables.find(x=>x.name===n);
  const meta=sharedMeta[n];
  return {name:n,he:meta.he,mods:meta.mods,span:meta.mods.length,inDataset:!!t&&t.real,
    degree:t?t.degree:null,inDegree:t?t.inDegree:null,outDegree:t?t.outDegree:null,density:t?t.density:null};
});

// ---------- business documents (Layer 3) ----------
const documents=[
 {id:'PR',he:'דרישת רכש',mod:'MM',tables:['EBAN']},
 {id:'PO',he:'הזמנת רכש',mod:'MM',tables:['EKKO','EKPO']},
 {id:'GR',he:'קבלת טובין',mod:'MM',tables:['MKPF','MSEG','MATDOC']},
 {id:'GI',he:'הוצאת טובין',mod:'MM',tables:['MKPF','MSEG','MATDOC']},
 {id:'Production Order',he:'הזמנת ייצור',mod:'PP',tables:['AFKO','AFPO']},
 {id:'Process Order',he:'הזמנת תהליך',mod:'PP-PI',tables:['AFKO','AFPO']},
 {id:'Maintenance Order',he:'הזמנת תחזוקה',mod:'PM',tables:['AUFK','AFIH']},
 {id:'Service Order',he:'הזמנת שירות',mod:'CS',tables:['AUFK','AFIH']},
 {id:'Notification',he:'הודעה',mod:'PM',tables:['QMEL','QMFE']},
 {id:'Sales Order',he:'הזמנת מכירה',mod:'SD',tables:['VBAK','VBAP']},
 {id:'Delivery',he:'תעודת משלוח',mod:'SD',tables:['LIKP','LIPS']},
 {id:'Invoice',he:'חשבונית',mod:'SD',tables:['VBRK','VBRP','RBKP']},
 {id:'Accounting Document',he:'מסמך הנהלת חשבונות',mod:'FI',tables:['BKPF','BSEG','ACDOCA']},
];

// ---------- processes (Layer 1) ----------
const processes=[
 {id:'P2P',name:'Procure to Pay',he:'רכש עד תשלום',mods:['MM','FI','CO'],docs:['PR','PO','GR','Invoice','Accounting Document'],color:'#2f81f7'},
 {id:'Plan2Produce',name:'Plan to Produce',he:'תכנון עד ייצור',mods:['PP','PP-PI','MM','QM'],docs:['Production Order','Process Order','GI','GR'],color:'#9b5de5'},
 {id:'M2O',name:'Maintain to Operate',he:'תחזוקה עד תפעול',mods:['PM','MM','CO'],docs:['Notification','Maintenance Order','GI'],color:'#f97316'},
 {id:'S2C',name:'Service to Cash',he:'שירות עד גבייה',mods:['CS','SD','FI'],docs:['Notification','Service Order','Invoice','Accounting Document'],color:'#14b8a6'},
 {id:'O2C',name:'Order to Cash',he:'הזמנה עד גבייה',mods:['SD','FI','CO'],docs:['Sales Order','Delivery','Invoice','Accounting Document'],color:'#22c55e'},
];

// ---------- integration (Zetes/Daymax — sap-israel-knowledge) ----------
const integrationFlows=[
 {idoc:'MATMAS',he:'הפצת אב חומר',from:'MM',to:'Zetes/Daymax',table:'MARA'},
 {idoc:'LOIPRO',he:'הורדת הזמנת ייצור ל-MES',from:'PP-PI',to:'Daymax',table:'AFKO'},
 {idoc:'WMMBXY',he:'תנועת מלאי מ-Zetes WMS',from:'Zetes',to:'MM',table:'MSEG'},
 {idoc:'ORDERS',he:'הזמנת מכירה נכנסת (EDI)',from:'External',to:'SD',table:'VBAK'},
 {idoc:'DESADV',he:'הודעת משלוח (ASN)',from:'SD',to:'Zetes',table:'LIKP'},
 {idoc:'CONF32 / CORUAFW',he:'דיווח ייצור מ-MES',from:'Daymax',to:'PP-PI',table:'AFRU'},
];

// ---------- S/4 deltas (Layer / S4 view) ----------
const s4deltas=[
 {ecc:'MKPF + MSEG',s4:'MATDOC',he:'מסמכי חומר אוחדו לטבלה אחת (header+item).'},
 {ecc:'BSEG + COEP + FAGLFLEXA',s4:'ACDOCA',he:'יומן אוניברסלי – מקור אמת פיננסי יחיד.'},
 {ecc:'KNA1 / LFA1',s4:'BUT000 (Business Partner)',he:'לקוח+ספק אוחדו ל-BP חובה.'},
 {ecc:'VBUK / VBUP',s4:'(בוטל)',he:'שדות סטטוס מכירה הועברו ל-VBAK/VBAP.'},
 {ecc:'MATNR CHAR(18)',s4:'MATNR CHAR(40)',he:'מספר חומר הורחב – קריטי לממשקי Zetes/ברקודים.'},
 {ecc:'MARD / MCHB (aggregates)',s4:'חישוב On-the-fly מ-MATDOC',he:'טבלאות צבירת מלאי בוטלו.'},
];

const zoneCounts={}; tables.forEach(t=>zoneCounts[t.zone]=(zoneCounts[t.zone]||0)+1);
const out = {
  meta:{project:'NEO Cockpit — CBC Israel',title:'SAP Landscape Control Room',version:'v3',
    generated:'2026-06-11',credit:'Sali Halif — Web Coding',
    source:'data/sapData.ts (real PM+PP-PI) + canonical SAP model (MM/SD/FI/CO/QM/CS/BATCH/CLASS/IDOC)',
    counts:{tables:tables.length, real:tables.filter(t=>t.real).length, modeled:tables.filter(t=>!t.real).length,
      edges:edges.length, crossEdges:edges.filter(e=>e.cross).length, modules:modules.length,
      documents:documents.length, processes:processes.length, shared:shared.length,
      interfaces:integrationFlows.length, zones:ZONES.length}},
  palette, zones:ZONES, zoneCounts, processes, modules, integration, documents, tables, shared, edges, integrationFlows, s4deltas
};
fs.writeFileSync('exports/sap-infrastructure-data.json',JSON.stringify(out,null,2));
fs.writeFileSync('exports/sap-architecture-data.json',JSON.stringify(out,null,2)); // back-compat alias
const byMod={}; tables.forEach(t=>byMod[t.mod]=(byMod[t.mod]||0)+1);
console.log('WROTE sap-infrastructure-data.json (v3 — one source of truth)');
console.log('tables',tables.length,'(real',out.meta.counts.real,'modeled',out.meta.counts.modeled,')');
console.log('edges',edges.length,'cross',out.meta.counts.crossEdges,'interfaces',out.meta.counts.interfaces);
console.log('by module:',JSON.stringify(byMod));
console.log('by zone:',JSON.stringify(zoneCounts));
console.log('hubs:',tables.filter(t=>t.isHub).sort((a,b)=>b.degree-a.degree).slice(0,12).map(t=>t.name+'('+t.degree+')').join(' '));
