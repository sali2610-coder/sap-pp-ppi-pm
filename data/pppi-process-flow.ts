// PP-PI Production Business Process — verified end-to-end flow (12 steps, 3
// phases) from the capability pipeline (doc-intelligence over Production Planning
// with SAP S/4HANA + processes.ts/domain-detail → sap-pp-consultant verified the
// step order + completeness; no invented tables/tcodes; PP-PI process order
// COR1/COR6N, Control-Recipe/PI-Sheet step included).
export interface ProcessStep { id: string; business: string; sapObject: string; code: string; tables: string[]; tcode: string; output: string; nextStep?: string; mistakes: string[] }
export interface ProcessPhase { id: "planning" | "execution" | "settlement"; he: string; en: string; icon: string; steps: ProcessStep[] }

export const PPPI_PROCESS_FLOW: ProcessPhase[] = [
  {
    id: "planning", he: "תכנון", en: "Planning", icon: "ClipboardList",
    steps: [
      { id: "s1", business: "ניהול ביקוש — דרישות עצמאיות מתוכננות (PIR)", sapObject: "Planned Independent Requirement (PIR)", code: "PBIM", tables: ["PBIM", "PBED"], tcode: "MD61", output: "PIR פעיל בגרסה 00 — ביקוש מתוכנן שנצרך מול מכירות בפועל ומזין את MRP.", nextStep: "seq 2 — MRP מפצץ את הביקוש לתכנית היצע (הזמנות מתוכננות + דרישות רכש).", mistakes: ["הזנת PIR בגרסה שאינה 00 → MRP מתעלם מהתחזית.", "אסטרטגיית תכנון ללא Consumption Mode/Periods → כפל ביקוש (תחזית + הזמנת לקוח נספרים פעמיים)."] },
      { id: "s2", business: "תכנון דרישות חומר (MRP / MRP Live)", sapObject: "Planned Order / Purchase Requisition", code: "MDKP", tables: ["MDKP", "PLAF", "MDVM", "EBAN"], tcode: "MD01N", output: "הזמנות מתוכננות (PLAF) לייצור + דרישות רכש לחומרים נרכשים; מצב מלאי/דרישות ב-MD04.", nextStep: "seq 3 — ההזמנה המתוכננת מומרת לפקודת תהליך.", mistakes: ["אין הזמנות מתוכננות — Planning File entry חסר או אופק התכנון קצר מדי.", "לחומר מיוצר אין גרסת ייצור תקפה (MKAL) → MRP Live לא יכול לפצץ/להמיר לפקודה."] },
    ],
  },
  {
    id: "execution", he: "ביצוע", en: "Execution", icon: "Factory",
    steps: [
      { id: "s3", business: "יצירת/המרת פקודת תהליך (Process Order)", sapObject: "Process Order", code: "AUFK", tables: ["AUFK", "AFKO", "AFPO", "RESB"], tcode: "COR1", output: "פקודת תהליך בסטטוס CRTD עם רכיבים, שלבים, משאבים ורזרבציות (RESB); עלות מתוכננת.", nextStep: "seq 4 — שחרור הפקודה (Release) לפני ביצוע.", mistakes: ["יצירה נכשלת — אין גרסת ייצור תקפה (MKAL) בטווח הכמות/התאריך (חובה ב-S/4).", "בחירת גרסת ייצור/BOM שגויה → צריכת רכיבים לא נכונה בפקודה."] },
      { id: "s4", business: "שחרור פקודה + בדיקת זמינות (Release)", sapObject: "Process Order (status REL)", code: "AUFK", tables: ["AUFK", "AFKO", "JEST", "JSTO"], tcode: "COR2", output: "פקודת תהליך משוחררת (REL) עם זמינות מאושרת — מוכנה למרשם בקרה, GI ואישורים.", nextStep: "seq 5 — יצירה ושליחה של מרשם בקרה / גיליון PI ל-MES.", mistakes: ["שחרור נכשל — חוסר זמינות רכיב או חוסר קיבולת (סטטוס לא עובר ל-REL).", "שחרור ללא הגדרת יעד מרשם בקרה (Control Recipe Destination) → לא נוצר מרשם בקרה בשלב הבא."] },
      { id: "s5", business: "מרשם בקרה / גיליון PI (Control Recipe / PI Sheet) — הבידול של PP-PI", sapObject: "Control Recipe / PI Sheet (Process Instructions)", code: "AFKO", tables: ["AFKO", "AFVC", "PLPO"], tcode: "CO53", output: "מרשם בקרה נשלח ל-MES או גיליון PI זמין למפעיל; הודעות תהליך חוזרות עם ערכים בפועל.", nextStep: "seq 6 — הזנת/ניפוק רכיבים לרצפת הייצור (Material Staging / GI).", mistakes: ["מרשם בקרה לא נוצר — יעד מרשם בקרה (Control Recipe Destination) לא מוגדר או השלב חסר PI Characteristics.", "הוראות תהליך חסרות — לא הוגדרו PI Characteristics/self-defined characteristics בשלב המתכון."] },
      { id: "s6", business: "הזנת חומר לייצור (Material Staging / Goods Issue 261)", sapObject: "Material Document (GI 261) / Reservation", code: "MATDOC", tables: ["MATDOC", "RESB", "MSEG"], tcode: "MIGO", output: "מסמך חומר 261 — צריכת רכיבים מהמלאי לפקודה; RESB מסומנת כנצרכה; עלות בפועל נרשמת לפקודה.", nextStep: "seq 7 — ביצוע השלב ואישורו (Confirmation).", mistakes: ["GI נכשל — חוסר מלאי/מלאי חסום או תקופת רישום סגורה.", "ניפוק ידני של רכיב שמוגדר גם כ-Backflush → צריכה כפולה של אותו רכיב."] },
      { id: "s7", business: "אישור פקודת תהליך (Confirmation)", sapObject: "Order Confirmation (AFRU)", code: "AFRU", tables: ["AFRU", "AFVC", "AFFW"], tcode: "COR6N", output: "רשומת אישור (AFRU) עם כמות תוצר/פסולת וזמנים; מפעילה Backflush ו-GR; מעדכנת עלות בפועל וזמינות.", nextStep: "seq 8 — Backflush אוטומטי של הרכיבים (מופעל ע\"י האישור).", mistakes: ["רצף אישור שלבים שגוי (phase confirmation sequence) → שלב מאושר לפני קודמו.", "תקופת רישום סגורה → האישור נכשל או תנועות נלוות נופלות."] },
      { id: "s8", business: "צריכת רכיבים אוטומטית (Backflush 261)", sapObject: "Backflush Goods Movement (261) / Reservation", code: "RESB", tables: ["RESB", "AFFW", "MATDOC"], tcode: "COGI", output: "מסמכי חומר 261 אוטומטיים לצריכת רכיבים; כשלים ב-AFFW לתיקון ב-COGI; מלאי ועלות מתעדכנים.", nextStep: "seq 9 — קבלת התוצר למלאי (Goods Receipt 101).", mistakes: ["תנועות תקועות ב-COGI — חוסר מלאי, אצווה לא נקבעה, או תקופה סגורה.", "רכיב לא נצרך — דגל Backflush חסר באב-חומר/מרכז עבודה."] },
      { id: "s9", business: "קבלת תוצר למלאי (Goods Receipt 101)", sapObject: "Material Document (GR 101) / Batch", code: "MATDOC", tables: ["MATDOC", "MCH1", "MCHA"], tcode: "MIGO", output: "מסמך חומר 101 — תוצר במלאי באצווה חדשה עם תוקף/סיווג; זיכוי עלות לפקודה; עדכון תכנון.", nextStep: "seq 10 — סגירה טכנית של הפקודה (TECO).", mistakes: ["GR ללא אצווה — ניהול אצוות לא פעיל או פרופיל מספור אצווה חסר.", "מאפיין אצווה חובה ריק (למשל תאריך תפוגה) → GR/סיווג נחסם."] },
      { id: "s10", business: "סגירה טכנית של הפקודה (TECO)", sapObject: "Process Order (status TECO)", code: "AUFK", tables: ["AUFK", "AFKO", "JEST"], tcode: "COR2", output: "פקודה בסטטוס TECO — רזרבציות/דרישות קיבולת פתוחות נסגרות; מוכנה לחישוב סטיות והתחשבנות.", nextStep: "seq 11 — חישוב סטיות (Variance) לפני ההתחשבנות.", mistakes: ["TECO בעוד קיימות תנועות פתוחות ב-COGI → שאריות עלות/צריכה לא נרשמו לפני הסגירה.", "TECO מוקדם מדי מונע דיווחי ביצוע נדרשים; זכור ש-TECO הפיך אם צריך להשלים."] },
    ],
  },
  {
    id: "settlement", he: "התחשבנות", en: "Settlement", icon: "Calculator",
    steps: [
      { id: "s11", business: "חישוב סטיות (Variance Calculation)", sapObject: "Variance / WIP (Cost Object)", code: "COSS", tables: ["COSS", "COSP", "KEKO"], tcode: "KKS1", output: "סטיות מסווגות לקטגוריות (ו/או WIP לפקודות פתוחות) — מוכנות להעברה בהתחשבנות.", nextStep: "seq 12 — התחשבנות הפקודה (Settlement) ל-FI/CO.", mistakes: ["אין סטיות — עלות תקן לא משוחררת (CK24) או Target Cost Version לא מוגדר.", "WIP שגוי — Results Analysis Key או סטטוס פקודה שגוי."] },
      { id: "s12", business: "התחשבנות פקודת תהליך (Settlement)", sapObject: "Settlement Document (Process Order)", code: "COBRB", tables: ["COBRB", "ACDOCA", "CKMLPP"], tcode: "CO88", output: "רישום התחשבנות ל-ACDOCA/ML — עלות סופית לתוצר, סטיות ל-CO-PA; הפקודה נסגרת פיננסית (CLSD).", nextStep: "סוף הזרימה — הפקודה מותחשבנת; המחזור חוזר ל-seq 1 עבור ביקוש חדש.", mistakes: ["התחשבנות נכשלת — כלל התחשבנות חסר או תקופת FI/CO סגורה.", "Material Ledger לא פעיל/לא נסגר → עלות בפועל לא זורמת נכון ל-ACDOCA ב-S/4."] },
    ],
  },
];
