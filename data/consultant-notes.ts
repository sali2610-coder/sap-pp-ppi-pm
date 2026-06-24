// Consultant Intelligence Layer — the senior-consultant overlay per object:
// common mistakes, debugging approach, functional/technical notes, integration
// touchpoints. Standard SAP consultant knowledge (PM/PP/PP-PI/MM/QM/SD/FI/CO).
// Aggregated at render time with knowledgeFor / INCIDENTS / interview / CDS /
// BAPI. trust:"curated"; uncertain → "needs-verification". No hallucinations.

export type Trust = "curated" | "needs-verification";
export interface ConsultantNote {
  mistakes?: string[];      // common real-world mistakes
  debug?: string[];         // debugging entry approach
  fnNotes?: string[];       // functional consultant notes
  techNotes?: string[];     // technical/ABAP consultant notes
  integration?: string[];   // integration touchpoints
  trust?: Trust;
}
const C = (o: ConsultantNote): ConsultantNote => ({ trust: "curated", ...o });

export const CONSULTANT_NOTES: Record<string, ConsultantNote> = {
  /* ── PM ── */
  IFLOT: C({ mistakes: ["מבנה (Edit Mask) לא תוכנן מראש → מזהים לא עקביים", "ערבוב מבנה מבוסס-מיקום ומבוסס-ציוד ללא מדיניות"], debug: ["IL03 לבדוק היררכיה+ILOA יורש", "EXIT ITOB0001"], fnNotes: ["מיקום = מקום קבוע; ציוד = פריט נייד שמותקן בו", "ILOA מרכז חיוב/מרכז עלות — יורש לציוד"], integration: ["מרכז עלות (CO) דרך ILOA", "מדידות (IMRG) על המיקום"] }),
  EQUI: C({ mistakes: ["סוג ציוד/פרופיל מספר סידורי לא מוגדר", "התקנה במיקום לא תקף / תאריך לפני יצירה"], debug: ["IE03 → היסטוריה (EQUZ)", "BAPI_EQUI_GETDETAIL"], fnNotes: ["EQUZ שומר היסטוריית התקנה; ILOA יורש מהמיקום"], integration: ["IDoc EQUIPMENT_CREATE לממשקים", "מד\"ד (IMRG) לאחזקה מבוססת-מצב"] }),
  QMEL: C({ mistakes: ["סגירת הודעה עם משימות פתוחות (QMSM)", "סוג הודעה שגוי → זרימה לא נכונה"], debug: ["IW22 → Tasks", "EXIT QQMA0001"], fnNotes: ["הודעה מתעדת; צו מבצע ונושא עלות", "קטלוגי נזק/גורם (QPCD/QPGR) מזינים ניתוח"], integration: ["הודעה→צו אוטומטי דרך סוג הודעה", "QM-PM קטלוגים משותפים"] }),
  AUFK: C({ mistakes: ["כלל התחשבנות (COBRB) חסר → KO88 נכשל", "סטטוס משתמש חוסם שחרור/TECO"], debug: ["IW33 → סטטוס; SU53 להרשאה", "EXIT IWO10009 לבדיקות שחרור"], fnNotes: ["AUFK=אב; AFIH=כותרת PM; AFKO=לוגיסטי"], integration: ["התחשבנות→CO (KO88/ACDOCA)", "שמורות (RESB)→MM"] }),
  AFRU: C({ mistakes: ["Backflush נכשל→COGI (מלאי/אצווה/תקופה)", "אישור בתאריך בתקופה סגורה"], debug: ["COGI לתנועות תקועות", "EXIT CONFPM01/CONFPP05"], fnNotes: ["אישור רושם זמן+חומר+סטטוס על הצו"], integration: ["Backflush→MM-IM (MATDOC)", "זמן→CO (פעילויות)"] }),
  JEST: C({ mistakes: ["בלבול סטטוס מערכת (TJ02) מול משתמש (TJ30)", "שינוי סטטוס ידני שעוקף תהליך"], debug: ["BS22/BS23 לפרופיל; JEST+STAT", "EXIT לסטטוס"], fnNotes: ["JEST=סטטוסים פעילים; JSTO=פרופיל"], integration: ["סטטוס חוסם פעולות חוצות-מודול (שחרור/חשבונאות)"] }),
  MPLA: C({ mistakes: ["אופק קריאה/תזמון לא מוגדר → אין פקודות", "Planning lead time מתעלם מ-Scheduling"], debug: ["IP10 לתזמון; MHIS להיסטוריה", "IP30 לריצה המונית"] , fnNotes: ["תוכנית→פריט (MPOS)→קריאות (MHIO)"], integration: ["יוצר הודעות/פקודות PM אוטומטית"] }),

  /* ── PP / PP-PI ── */
  MARA: C({ mistakes: ["MATNR מורחב 18→40 שובר ממשקים/ברקודים", "סוג חומר שגוי → תצוגות/הערכה חסרים"], debug: ["MM03 לתצוגות; CONVERSION_EXIT_MATN1", "EXIT MGA00001"], fnNotes: ["טבלת ליבה; MARC=מפעל, MBEW=שווי, MCH1=אצווה"], integration: ["MATMAS IDoc ל-Zetes/Daymax", "ל-PP/MM/SD/QM/PM"] }),
  MARC: C({ mistakes: ["חומר לא מורחב לתצוגת MRP/מפעל → MRP לא מתכנן", "MRP Type ND במקום PD"], debug: ["MD04 לאלמנטי תכנון; MM03 תצוגת MRP", "MD21 ל-Planning File"], fnNotes: ["נתוני תכנון/ייצור ברמת מפעל"], integration: ["MRP Live (PPH)→הזמנות מתוכננות (PLAF)"] }),
  MAST: C({ mistakes: ["BOM לא משויך למפעל/שימוש נכון", "חלופה (Alternative) שגויה"], debug: ["CS03/CS12 לעץ; STAS לבחירה"], fnNotes: ["MAST מקשר חומר→עץ (STKO/STPO)"], integration: ["נצרך בפקודה דרך גרסת ייצור (MKAL)"] }),
  PLKO: C({ mistakes: ["מתכון/Routing ללא תוקף חופף לתאריך", "מפתח בקרה (Control Key) שגוי לפעולה"], debug: ["C203/CA03; C223 לגרסת ייצור"], fnNotes: ["PP-PI=מתכון (C201-203); PP=Routing (CA01-03)"], integration: ["PLMZ מקשר רכיבי BOM לפעולות (Backflush)"] }),
  MKAL: C({ mistakes: ["אין גרסת ייצור תקפה → MRP Live/פקודה נכשלים", "טווח כמות/תוקף לא חופף"], debug: ["C223 לבדיקת גרסאות+תוקף", "ודא BOM+מתכון תקפים"], fnNotes: ["חובה ב-S/4 לתכנון ולפקודות ייצור"], integration: ["מחבר חומר↔BOM↔Routing/Recipe", "קריטי ל-MRP Live" ], trust: "curated" }),
  AFKO: C({ mistakes: ["צריכת רכיבים תקועה ב-COGI", "אישור בתקופה סגורה (MMRV)"], debug: ["COR3 לפקודה; COGI; CO13 לביטול", "EXIT CONFPP05; BAdI WORKORDER_GOODSMVT"], fnNotes: ["כותרת פקודת תהליך; AFPO פריט; AFVC פעולות"], integration: ["Backflush→MM-IM; התחשבנות→CO; אצווה→Batch Mgmt"] }),
  RESB: C({ mistakes: ["שמורה ללא מלאי → פקודה לא משתחררת/Backflush נכשל", "Movement type שגוי"], debug: ["MD04; CO24 לחוסרים", "MMBE לזמינות"], fnNotes: ["רכיבים שהפקודה דורשת (תלות PP-MM)"], integration: ["GI 261→MATDOC; בדיקת זמינות (ATP)"] }),
  MCH1: C({ mistakes: ["מאפיין SLED/FEFO לא מולא → קביעת אצווה נכשלת", "אצווה חסומה/פגה נבחרת"], debug: ["MSC3N; CU70 לאסטרטגיית מיון", "BAdI VB_BD_BATCH_DETERMINATION"], fnNotes: ["אצווה חוצה-מפעל; MCHA=מפעל; MCHB=מלאי"], integration: ["Batch Determination ב-COR1/MIGO", "Classification (CLASS) למאפיינים"] }),
  AFFW: C({ mistakes: ["מצטברות תנועות Backflush שנכשלו ב-COGI/AFFW", "מתעלמים מ-COGI → אי-דיוק מלאי"], debug: ["COGI → 'Display incorrect goods movements'", "MF47 לעיבוד מחדש"], fnNotes: ["AFFW=טבלת תנועות שגויות מ-Backflush"], integration: ["מקור: אישור ייצור; יעד: MATDOC לאחר תיקון"] }),

  /* ── MM ── */
  MSEG: C({ mistakes: ["קוד Z קורא/כותב ישירות → נשבר ב-S/4 (MATDOC)", "תנועה בתקופה סגורה"], debug: ["MB51/MIGO; MMRV לתקופה", "BAdI MB_MIGO_BADI"], fnNotes: ["הוחלף ב-MATDOC; קריאה דרך compat view"], integration: ["כל תנועת מלאי→FI (חשבונאות); ל-PP/PM"], trust: "curated" }),
  EBAN: C({ mistakes: ["ייחוס חשבונאי (EBKN) חסר/שגוי", "מקור אספקה לא נקבע → לא הופך ל-PO"], debug: ["ME53N; ME57 להמרה ל-PO", "EXIT MEREQ001"], fnNotes: ["דרישת רכש מ-MRP/ידני/צו אחזקה"], integration: ["→PO (MM); MRP; חומר לא-מלאי בצו PM"] }),
  MBEW: C({ mistakes: ["מחיר תקן לא שוחרר → סטיות לא מחושבות", "שיטת הערכה (V/S) לא תואמת תהליך"], debug: ["CK11N/CK24 לעלות תקן; MR21", "KKS2 לסטיות"], fnNotes: ["Material Ledger חובה ב-S/4"], integration: ["עלות תקן→חישוב ייצור; →CO-PC; →ACDOCA"] }),

  /* ── QM ── */
  QMFE: C({ mistakes: ["קוד נזק/גורם לא מקוטלג (QPGR ריק)", "פריט הודעה ללא קוד → ניתוח חסר"], debug: ["IW22 → פריטים; CL30N לקטלוג"], fnNotes: ["פריטי הודעה = נזק/גורם מקוטלגים"], integration: ["QM-PM קטלוגים; ניתוח תקלות"] }),
  QMAT: C({ mistakes: ["סוג בדיקה לא מופעל לחומר → אין Lot", "תצוגת QM חסרה ב-MM02"], debug: ["QA32 ל-Lots; MM03 תצוגת QM"], fnNotes: ["מקשר חומר↔סוגי בדיקה (Inspection types)"], integration: ["GR מפעיל Inspection Lot; →Batch"] }),

  /* ── SD ── */
  VBAK: C({ mistakes: ["סטטוס פתוח/סגור הוטמע (VBUK בוטל ב-S/4)", "Schedule line/ATP לא מתואם"], debug: ["VA03; VBUK/VBUP בוטלו → סטטוס ב-VBAK/VBAP"], fnNotes: ["S/4: סטטוס הוטמע; aATP מחליף ATP קלאסי"], integration: ["→משלוח (LIKP)→חשבונית (VBRK)→FI", "ATP מול מלאי"], trust: "needs-verification" }),

  /* ── FI / CO ── */
  BSEG: C({ mistakes: ["קוד Z קורא BSIS/BSAK (בוטלו) במקום ACDOCA", "Reconciliation ידני מיושן"], debug: ["FB03; FAGLL03 ל-G/L", "ACDOCA לדיווח"], fnNotes: ["BSEG נשמר למסמך; דיווח מ-ACDOCA"], integration: ["Universal Journal מאחד FI+CO"], trust: "curated" }),
  COBRA: C({ mistakes: ["כלל התחשבנות חסר → KO88/CO88 נכשל", "יעד התחשבנות לא תקף"], debug: ["KO02/IW32 לכלל; KO88 → log", "OB52 לתקופות"], fnNotes: ["COBRA=כותרת; COBRB=חלוקה ליעדים"], integration: ["התחשבנות פקודה→מרכז עלות/נכס/CO-PA→ACDOCA"] }),

  /* ── HR / HCM ── */
  PA0000: C({ mistakes: ["סוג אירוע (MASSN) שגוי → סטטוס תעסוקתי לא נכון", "פערי תאריכים ברצף האירועים (gaps) שוברים היסטוריה"], debug: ["PA20 → infotype 0000 timeline", "RPUAUD00 לביקורת שינויים"], fnNotes: ["0000 מתעד שינויי מצב; STAT2 קובע סטטוס תעסוקתי", "Action חייב להיות עקבי עם 0001"], integration: ["מניע Org Assignment (0001) ושכר", "ב-EC = Event/Event Reason"] }),
  PA0001: C({ mistakes: ["מרכז עלות/יחידה ארגונית לא מעודכן → דיווח+הרשאות שגויים", "Structural authorization מבוססת 0001 לא תואמת מבנה OM"], debug: ["PA20; PPOSE למבנה OM", "RHINTE* לסנכרון PA↔OM"], fnNotes: ["מקשר עובד למבנה הארגוני; מזין כמעט כל דוח HR", "אינטגרציית PA-OM קריטית"], integration: ["מרכז עלות→CO", "מבנה→הרשאות מבניות (P_ORGIN/P_ORGINCON)"] }),
  PA0008: C({ mistakes: ["סוג שכר (Wage Type) לא מותר ל-0008 → Payroll נכשל", "שינוי שכר ללא אירוע (0000) מתאים"], debug: ["PA30 → Basic Pay; PC00_M99_* לסימולציה", "T511/T512W לתצורת סוג שכר"], fnNotes: ["בסיס השכר הקבוע; Pay Scale + Wage Types", "Indirect valuation מ-T510"], integration: ["קלט מרכזי ל-Payroll (PCL2)", "ב-EC = Compensation Information"] }),
  HRP1001: C({ mistakes: ["קשר חד-כיווני (חסר inverse A/B) → היררכיה שבורה", "Evaluation path שגוי בדוחות OM"], debug: ["PPOSE; PP01 לקשרים", "RHSTRU00 / Evaluation paths"], fnNotes: ["A/B relationships מניעים היררכיה", "O-S-P שרשרת השיוך"], integration: ["מבנה→הרשאות מבניות", "מזין PA0001 (RHINTE30)"] }),
  PCL2: C({ mistakes: ["קריאת אשכול ישירות בקוד Z → שביר (פורמט אשכול)", "מחיקת תוצאות שכר ללא בקרה"], debug: ["PC00 לתוצאות; RPCLSTRR להצגת cluster"], fnNotes: ["אשכול RT/results לא נקרא כטבלה רגילה", "השתמש ב-Payroll APIs/macros"], integration: ["מקור: Payroll/Time Eval", "יעד: תלושים, העברות בנק, FI posting"] }),

  /* ── BW / Analytics ── */
  ADSO: C({ mistakes: ["סוג ADSO שגוי (Standard/Staging/DataMart) → activation לא צפוי", "מפתח לא מתוכנן → כפילויות/overwrite שגוי"], debug: ["RSA1 → ADSO → manage → requests", "RSPCM לניטור טעינות"], fnNotes: ["אובייקט אחסון אחיד ב-BW/4HANA", "inbound→active table via activation"], integration: ["נטען ע\"י DTP מ-Transformation", "נצרך ע\"י CompositeProvider/Query"] }),
  RSTRAN: C({ mistakes: ["Routine ללא error handling → DTP נכשל על רשומה בודדת", "מיפוי שדה חסר → ערכים ריקים ביעד"], debug: ["RSA1 → transformation → debug", "DTP temp storage לבדיקת רשומות"], fnNotes: ["start/end/field routines + rule types", "expert routine לתרחישים מורכבים"], integration: ["מקור→יעד דרך DTP", "delta נשמר ב-ODP"] }),
  RSPCCHAIN: C({ mistakes: ["תלות (predecessor) חסרה → טעינה לא עקבית", "אין error branch → השרשרת תקועה בלי התראה"], debug: ["RSPC → log view; RSPCM monitor", "בדוק job ב-SM37"], fnNotes: ["מתזמן load/activate/index/cleanup", "AND/OR/error connectors"], integration: ["מריץ DTPs; מנוטר ב-ALM Job Monitoring"] }),
  CDS_AnalyticalView: C({ mistakes: ["@Analytics.dataCategory שגוי → לא מזוהה כ-cube/dimension", "ביצועים: חוסר aggregation על הבסיס"], debug: ["RSRT לבדיקת query על CDS", "ST05/SQL trace לביצועים"], fnNotes: ["VDM: interface→consumption(@Analytics)", "real-time על S/4 ללא העתקה ל-BW"], integration: ["נצרך ע\"י SAC/Fiori analytical/AfO", "DCL להרשאות"] }),
  RSECVAL: C({ mistakes: ["Analysis authorization חסרה → 'no authorization' בדוח", "ערך * רחב מדי → דליפת נתונים"], debug: ["RSECADMIN → trace + check user", "RSUDO להרצה בשם משתמש"], fnNotes: ["מגביל נתונים לפי characteristic value", "InfoObject חייב auth-relevant"], integration: ["מקביל ל-DCL ב-S/4 Embedded", "נבדק בזמן ריצת Query"] }),
};
