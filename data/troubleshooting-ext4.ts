// Incident Center — Phase 4 additions (IDoc 68 / PI-PO / CPI / RFC connection /
// auth). Demonstrates the enriched schema: techCause, breakpoints, oss, ecc, s4.
// Standard SAP support knowledge. SAP Note refs are search keywords+component
// (NOT fabricated numbers). trust: curated.

import type { Incident } from "@/data/troubleshooting";

export const INCIDENTS_EXT4: Incident[] = [
  {
    slug: "idoc-68-no-further-processing", module: "Cross", he: "IDoc סטטוס 68 — Error, No Further Processing",
    symptom: "IDoc נכנס/יוצא בסטטוס 68 — סומן ידנית/אוטומטית כ'לא יטופל'. לא ירוץ שוב ולא ניתן לעבד ב-BD87 ללא שינוי סטטוס.",
    error: "Status 68 — Error (no further processing)", impact: "DATA INCONSISTENCY",
    techCause: "ה-IDoc הועבר ל-68 דרך תוכנית/סטטוס ידני (RBDMANI2 / WE02 'Set status to 68') או חוק עיבוד שסימן ויתור — לא תקלת מיפוי אלא החלטת עיבוד.",
    rootCauses: ["סומן ידנית 68 ב-WE02/WE05", "ריצת RBDMANIN/RBDMANI2 שסגרה IDocs ישנים", "Process code שמכוון ל-68 בתנאי מסוים", "IDoc כפול שנסגר ביודעין"],
    analyzeTcodes: ["WE02", "WE05", "BD87", "WE19", "SARA"],
    tables: ["EDIDC", "EDIDS", "EDID4"],
    debugEntry: ["WE02 → היסטוריית סטטוס (EDIDS) — מי/מה העביר ל-68", "WE19 לשחזור עיבוד מבוקר"],
    breakpoints: ["FM IDOC_STATUS_WRITE_TO_DATABASE", "RBDMANI2 (mass status change)"],
    exits: ["—"],
    funcs: ["IDOC_STATUS_WRITE_TO_DATABASE", "EDI_DOCUMENT_OPEN_FOR_PROCESS"],
    fix: ["אם נסגר בטעות — WE19 לבנייה מחדש ועיבוד, או שינוי סטטוס ל-64 ו-BD87", "אם כפילות — השאר 68 (תקין)", "תקן את חוק העיבוד/התוכנית שסגרה"],
    prevention: ["הגבל הרשאת שינוי-סטטוס ידני (B_ALE_RECV)", "תזמן RBDMANI2 עם בורר זהיר; תעד מדיניות סטטוס 68"],
    oss: ["IDoc status 68 set manually RBDMANI2 · BC-MID-ALE", "reprocess IDoc status 68 WE19 · BC-MID-ALE"],
    ecc: "ניהול IDoc זהה; WE02/BD87/WE19 קלאסיים.", s4: "זהה ב-S/4; מומלץ ניטור דרך AIF (Application Interface Framework) במקום WE02 גולמי.",
    cbc: "ב-CBC: IDoc אב-חומר נכנס נסגר אוטומטית ל-68 ע\"י ריצת ניקוי לילית; מק\"ט חדש לא נוצר ביעד. שוחזר ב-WE19 ועובד."
  },
  {
    slug: "pi-po-channel-error-not-sent", module: "Cross", he: "ערוץ PI/PO תקוע — הודעה לא נשלחת",
    symptom: "הודעה יצאה מ-SAP (IDoc/proxy) אך לא הגיעה ליעד; ב-PI/PO ה-Message נכשל או תקוע, או Communication Channel ב-Error.",
    error: "Message status: System Error / To Be Delivered (stuck)", impact: "DATA INCONSISTENCY",
    techCause: "ערוץ תקשורת (Adapter) ב-PO לא פעיל/שגוי, או Adapter Engine queue תקוע, או credentials/endpoint של היעד נכשלו.",
    rootCauses: ["Communication Channel לא פעיל/קונפיג שגוי (RWB)", "Adapter Engine queue תקוע", "Endpoint/credentials של היעד נכשלו", "Mapping exception ב-Integration Directory"],
    analyzeTcodes: ["SXMB_MONI", "SMQ2", "SXI_MONITOR"],
    tables: ["SXMSPMAST", "SXMSCLUP"],
    debugEntry: ["SXMB_MONI → סטטוס ה-Message + trace", "PO: Message Monitoring / Channel Monitoring (RWB)", "SMQ2 ל-queue תקוע ב-Integration Engine"],
    breakpoints: ["—  (חקירה ב-PO/Adapter Engine, לא ABAP ב-S/4)"],
    exits: ["—"],
    fix: ["הפעל/תקן את ה-Communication Channel ב-RWB", "שחרר queue תקוע ב-SMQ2/Adapter", "תקן endpoint/credentials של היעד ושלח מחדש"],
    prevention: ["ניטור Channel + Alerting ב-PO/Integration Suite", "מעבר ל-SAP Integration Suite (CPI) — PO ב-maintenance עד 2027/2030"],
    oss: ["PI PO message system error channel · BC-XI-IBC", "Adapter Engine queue stuck · BC-XI-IS"],
    ecc: "תזמור דרך SAP PI/PO on-prem.", s4: "מומלץ SAP Integration Suite (Cloud Integration / CPI); IDoc/SOAP נשמרים אך ניטור עובר ל-Cloud.",
    cbc: "ב-CBC: הודעת מכירות ל-Daymax נתקעה ב-PO — ה-channel היה ב-Error אחרי שינוי endpoint; הופעל מחדש והודעות נשלחו."
  },
  {
    slug: "cpi-iflow-failed", module: "Cross", he: "iFlow ב-Integration Suite (CPI) נכשל",
    symptom: "אינטגרציה דרך SAP Integration Suite נכשלת — ב-Message Monitoring ה-iFlow ב-Failed; היעד לא קיבל.",
    error: "iFlow status: Failed / Retry", impact: "DATA INCONSISTENCY",
    techCause: "שגיאת mapping/groovy ב-iFlow, או credential/connectivity (Cloud Connector) ליעד, או חריגת payload/timeout.",
    rootCauses: ["שגיאת Mapping/Groovy ב-iFlow", "Credential/Security material פג", "Cloud Connector / connectivity ליעד נכשל", "Payload לא תקין / timeout"],
    analyzeTcodes: ["— (Web: CPI Message Monitoring)"],
    tables: ["— (cloud)"],
    debugEntry: ["CPI → Monitor → Message Monitoring → Failed → trace/MPL", "בדוק Security Material + Cloud Connector"],
    breakpoints: ["iFlow trace level = Trace; בדוק שלב ה-mapping/Groovy"],
    exits: ["—"],
    fix: ["תקן mapping/Groovy ופרוס מחדש את ה-iFlow", "חדש credential/security material", "תקן Cloud Connector ובצע Resend"],
    prevention: ["Alerting ב-Integration Suite + ניטור MPL", "בדיקות regression ל-iFlows לפני deploy"],
    oss: ["CPI iFlow failed message monitoring · LOD-HCI-PI", "Cloud Connector connectivity · BC-MID-SCC"],
    ecc: "לא רלוונטי (ענן).", s4: "Integration Suite היא שכבת האינטגרציה המודרנית ל-S/4 Cloud/היברידי.",
    cbc: "ב-CBC: iFlow ששולח אישורי ייצור ל-MES נכשל — security material פג; חודש ובוצע Resend."
  },
  {
    slug: "rfc-connection-sm59-failed", module: "Cross", he: "חיבור RFC נכשל (SM59)",
    symptom: "קריאת RFC/חיבור חיצוני נכשל; SM59 Connection Test מחזיר שגיאה; ממשקים תלויי-RFC לא עובדים.",
    error: "Connection refused / timed out / logon failed", impact: "BLOCKING",
    techCause: "יעד RFC לא מוגדר נכון (host/gateway/SNC), או RFC user נעול/חסר הרשאה, או רשת/Firewall חוסמת.",
    rootCauses: ["Host/Gateway/Instance שגויים ב-SM59", "RFC user נעול/פג/חסר הרשאה (S_RFC)", "SNC/SSL לא תואם", "Firewall/רשת חוסמת פורט"],
    analyzeTcodes: ["SM59", "SM21", "ST22", "SU53", "SMGW"],
    tables: ["RFCDES", "RFCCHECK"],
    debugEntry: ["SM59 → Connection Test + Authorization Test", "SU53 ל-RFC user; SM21 ל-system log"],
    breakpoints: ["—  (תשתית; אם FM ביעד נכשל — ST22 ביעד)"],
    exits: ["—"],
    fix: ["תקן host/gateway/instance ב-SM59", "שחרר/תקן הרשאת RFC user (S_RFC)", "יישר SNC/SSL; פתח פורט ברשת"],
    prevention: ["ניטור SM59 tests מתוזמן + Alerting", "מניעת נעילת service users; תיעוד RFC landscape"],
    oss: ["RFC destination connection test failed SM59 · BC-MID-RFC", "S_RFC authorization · BC-SEC-AUT"],
    ecc: "RFC/SM59 קלאסי.", s4: "זהה; חלק מהאינטגרציות עוברות ל-OData/CPI אך RFC נשמר לתרחישים פנימיים.",
    cbc: "ב-CBC: ממשק לבנק נכשל — RFC user ננעל אחרי שינוי סיסמה; שוחרר ב-SU01 ו-SM59 test עבר."
  },
  {
    slug: "su53-missing-authorization-deep", module: "Cross", he: "חסר הרשאה — אבחון SU53 / STAUTHTRACE",
    symptom: "פעולה נחסמת עם 'אין הרשאה'; SU53 מצביע על אובייקט הרשאה חסר; בתרחיש רב-שלבי SU53 לא מספיק.",
    error: "No authorization for object …", impact: "USER-SPECIFIC",
    techCause: "אובייקט הרשאה/ערך חסר בתפקיד (PFCG), ACTVT שגוי, Org-level חסר, או User Comparison לא בוצע.",
    rootCauses: ["אובייקט הרשאה חסר בתפקיד", "ACTVT שגוי (03 במקום 02)", "Org level (מפעל/חברה) חסר", "User Comparison לא בוצע (אדום ב-PFCG)"],
    analyzeTcodes: ["SU53", "STAUTHTRACE", "SUIM", "PFCG", "SU24"],
    tables: ["AGR_1251", "USOBT_C", "USR04"],
    debugEntry: ["SU53 מיד אחרי הכשל (משתמש מדווח)", "STAUTHTRACE לתרחיש רב-שלבי/RFC", "SU24 ל-proposals של הטרנזקציה"],
    breakpoints: ["AUTHORITY-CHECK בקוד ה-Z הרלוונטי (אם מותאם)"],
    exits: ["—"],
    fix: ["הוסף אובייקט/ערך ב-PFCG ובצע User Comparison", "תקן ACTVT/Org level", "השתמש ב-SU24 ליישור proposals"],
    prevention: ["STAUTHTRACE בבדיקות SIT/UAT", "ביקורת תפקידים תקופתית; הימנעות מ-SAP_ALL בפרודקשן"],
    oss: ["SU53 last authorization check · BC-SEC-AUT", "STAUTHTRACE system trace authorization · BC-SEC-AUT"],
    ecc: "PFCG/SU53/STAUTHTRACE קלאסי.", s4: "זהה; מעבר GUI→Fiori דורש Business Roles + Catalogs/Groups (IAM) בנוסף לאובייקטים הקלאסיים.",
    cbc: "ב-CBC: טכנאי נחסם ב-IW31 — SU53 הצביע על I_SWERK (מפעל) חסר; נוסף בתפקיד הנגזר ובוצע User Comparison."
  },
];
