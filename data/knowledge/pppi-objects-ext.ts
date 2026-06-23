// PP / PP-PI knowledge — Phase P1 expansion (the 43 production tables that
// lacked curated knowledge). Standard SAP PP/PP-PI knowledge. Derived facts come
// from the live dataset. trust:"curated" / "needs-verification".

import type { ObjectKnowledge } from "@/lib/knowledge";

const K = (role: string, why: string, whenUsed: string, o: Partial<ObjectKnowledge> = {}): ObjectKnowledge =>
  ({ role, why, whenUsed, importance: o.importance || "supporting", step: o.step, s4: o.s4, trust: o.trust || "curated" });

export const PPPI_KNOWLEDGE_EXT: Record<string, ObjectKnowledge> = {
  /* ── material master views ── */
  MAKT: K("טקסטים לתיאור חומר.", "תיאורי החומר הרב-לשוניים שמוצגים בכל מסך/דוח.", "בכל תצוגת חומר (MM03).", { importance: "supporting", s4: "MATNR מורחב ל-40 תווים." }),
  MARD: K("מלאי חומר ברמת אחסון (Storage Location).", "כמויות המלאי הזמין/חסום לכל מחסן — בסיס לזמינות חומר בייצור.", "בבדיקת מלאי (MMBE), הקצאה לפקודה, Backflush.", { importance: "core", step: "מלאי · רמת אחסון", s4: "כמויות מחושבות מ-MATDOC; MARD נשמר אך המלאי דרך NSDM." }),
  MARM: K("יחידות מידה לחומר (Units of Measure).", "המרות בין יחידת בסיס ליחידות חלופיות (אריזה/מכירה) — קריטי לייצור תהליכי.", "בכל המרה כמותית (KG↔ליטר↔משטח).", { importance: "supporting" }),
  MEAN: K("מספרי EAN/ברקוד לחומר.", "מקשרת חומר לברקודים — קריטי לסריקה בקווי מילוי ובמחסן (Zetes).", "בסריקת ברקוד בייצור/מחסן.", { importance: "supporting", s4: "בדוק התאמת ברקוד מול MATNR 40." }),
  MBEW: K("הערכת שווי חומר (Material Valuation).", "מחיר תקן/ממוצע ושיטת הערכה — בסיס לעלות הייצור ולסטיות.", "בחישוב עלות תקן (CK11N), סטיות, רישום ייצור.", { importance: "core", step: "עלות · הערכת שווי", s4: "Material Ledger חובה ב-S/4." }),
  MVKE: K("נתוני מכירה לחומר.", "נתוני המכירה של החומר (ארגון מכירות, קבוצת חומר) — לחומרים נמכרים.", "במוצרים מוגמרים שנמכרים.", { importance: "advanced" }),
  MLAN: K("נתוני מס מכירה לחומר.", "סיווג מס לפי מדינה לחומר.", "בקביעת מס במכירה.", { importance: "advanced" }),
  MLGN: K("נתוני חומר ברמת מספר מחסן (WM).", "נתוני ניהול מחסן (WM/EWM) לחומר.", "בניהול מחסן ממוחשב.", { importance: "advanced" }),
  MLGT: K("נתוני חומר לסוג אחסון (WM).", "הגדרות אחסון לפי סוג אחסון במחסן.", "באסטרטגיות איחסון/ליקוט.", { importance: "advanced" }),
  MDMA: K("נתוני MRP לאזור MRP.", "פרמטרי תכנון לחומר ברמת אזור MRP (לא רק מפעל).", "בתכנון מבוסס אזורי MRP.", { importance: "advanced", s4: "MRP Live תומך באזורי MRP." }),
  QMAT: K("הגדרת בדיקת איכות לחומר.", "מקשרת חומר לסוגי בדיקה (Inspection types) — האם/איך נבדק.", "בהפעלת QM לחומר (תצוגת QM ב-MM02).", { importance: "advanced" }),
  MCHA: K("נתוני אצווה ברמת מפעל.", "נתוני אצווה ספציפיים למפעל (סטטוס, מאפיינים).", "בניהול אצוות בייצור תהליכי (FEFO).", { importance: "supporting", step: "אצווה · מפעל" }),
  T006: K("קונפיגורציה — יחידות מידה (Units).", "הגדרת יחידות המידה הגלובליות והמרותיהן.", "ב-Customizing מרכזי.", { importance: "advanced" }),

  /* ── BOM ── */
  STAS: K("בחירת פריטים בעץ מוצר (BOM item selection).", "מקשרת פריטים (STPO) לכותרת/חלופה הנכונה של עץ המוצר.", "בניהול חלופות BOM.", { importance: "advanced" }),
  STZU: K("ניהול והיסטוריית עץ מוצר (BOM history/admin).", "רשומות ניהול ושינוי של עצי המוצר.", "בניהול שינויים (ECN) לעצי מוצר.", { importance: "advanced" }),
  STPU: K("תת-פריטים בעץ מוצר (Sub-items).", "פירוט מיקומי התקנה של רכיב (Installation points).", "בעצי מוצר עם מיקומי הרכבה.", { importance: "advanced", trust: "needs-verification" }),
  KDST: K("קישור עץ מוצר להזמנת לקוח (Sales-order BOM).", "מקשר BOM ספציפי להזמנת לקוח (Make-to-Order).", "בייצור לפי הזמנה (CtO/MtO).", { importance: "advanced", trust: "needs-verification" }),

  /* ── routing / recipe ── */
  PLAS: K("שיוך פעולות לרשימת פעולות (Operation selection).", "מקשרת פעולות (PLPO) לקבוצת רשימת הפעולות ולרצף הנכון.", "במבנה Routing/Recipe.", { importance: "supporting", step: "רשימת פעולות · שיוך" }),
  PLFL: K("רצפים ברשימת פעולות (Sequences).", "מגדירה רצפים מקבילים/חלופיים של פעולות.", "ב-Routing עם רצפים מורכבים.", { importance: "advanced" }),
  PLMZ: K("הקצאת רכיבי BOM לפעולות (Component allocation).", "מקשרת רכיבי עץ המוצר לפעולה שבה הם נצרכים — בסיס ל-Backflush מדויק.", "בקישור BOM↔Routing.", { importance: "supporting", step: "רכיבים · הקצאה" }),
  PLMK: K("מאפייני בדיקה ברשימת פעולות (Inspection chars).", "מאפייני QM שנבדקים בפעולת ייצור (In-process).", "בבדיקות תהליך בייצור (PP-QM).", { importance: "advanced" }),
  FHMI: K("אמצעי ייצור (PRT) — אב נתונים מבוסס-חומר.", "כלים/תבניות/אמצעי-עזר הנדרשים לפעולה (לא נצרכים).", "בהקצאת PRT לפעולה.", { importance: "advanced" }),
  PLZU: K("ניהול שינויים/שימוש לרשימת פעולות.", "רשומות ניהול ותוקף של רשימות פעולות (ECN).", "בניהול שינויים ל-Routing/Recipe.", { importance: "advanced" }),
  TC60: K("קונפיגורציה — מפתח בקרה (Control key).", "מגדיר התנהגות פעולה (תזמון/אישור/Costing/רכש חיצוני).", "ב-Customizing של רשימות פעולות.", { importance: "advanced", trust: "needs-verification" }),
  TCA01: K("קונפיגורציה — פרופיל רשימת פעולות.", "הגדרות ברירת-מחדל ל-Routing/Recipe.", "ב-Customizing של PP.", { importance: "advanced", trust: "needs-verification" }),

  /* ── work center / capacity / costing ── */
  CRCO: K("הקצאת מרכז עלות למרכז עבודה.", "מקשרת מרכז עבודה למרכז עלות ולסוגי פעילות — בסיס לתמחור הפעולה.", "בהקמת מרכז עבודה (CR01).", { importance: "supporting", step: "מרכז עבודה · עלות" }),
  CRCA: K("הקצאת קיבולת למרכז עבודה.", "מקשרת מרכז עבודה לקטגוריות קיבולת (אדם/מכונה).", "בתכנון קיבולת (CM01).", { importance: "supporting" }),
  KAKO: K("קטגוריית קיבולת — כותרת (Capacity header).", "מגדירה קיבולת זמינה (משמרות, ניצולת) של מרכז עבודה.", "בתכנון ואיזון עומסים.", { importance: "supporting", step: "קיבולת · כותרת" }),
  CRFH: K("אמצעי ייצור (PRT) — מבוסס מרכז עבודה.", "PRT המנוהל כמרכז עבודה (כלי/תבנית).", "בהקצאת PRT לפעולות.", { importance: "advanced" }),
  CRVD_A: K("קשרי ברירת מחדל למרכז עבודה.", "ערכי ברירת מחדל המקושרים למרכז העבודה.", "בהקמת/תחזוקת מרכז עבודה.", { importance: "advanced", trust: "needs-verification" }),
  CSLA: K("סוגי פעילות למרכז עבודה (Activity types).", "מקשר סוגי פעילות CO לתמחור זמן הפעולה.", "בתמחור פעולות ייצור.", { importance: "advanced", trust: "needs-verification" }),
  KAZT: K("מרווחי זמן/משמרות לקיבולת.", "פירוט זמני הזמינות (משמרות, הפסקות) של קטגוריית קיבולת.", "בהגדרת קיבולת מפורטת.", { importance: "advanced" }),

  /* ── order operations ── */
  AFFH: K("הקצאת PRT לפעולת פקודה.", "מקשרת אמצעי ייצור (PRT) לפעולה בפקודת הייצור/תהליך.", "בפקודה הדורשת כלי/תבנית.", { importance: "advanced" }),
  AFFL: K("רצף פעולות בפקודה.", "מגדירה את רצף הפעולות (AFVC) בפקודת הייצור/תהליך.", "בכל פקודת ייצור/תהליך.", { importance: "supporting" }),

  /* ── configuration ── */
  T134: K("קונפיגורציה — סוגי חומר (Material Types).", "מגדירה התנהגות סוג החומר (תצוגות, טווחי מספרים, סוג הערכה).", "ב-Customizing של אב חומר.", { importance: "advanced" }),
  T134T: K("טקסטים לסוג חומר.", "תיאורי סוגי החומר.", "בתצוגת/בחירת סוג חומר.", { importance: "advanced" }),
  T023: K("קונפיגורציה — קבוצות חומר (Material Groups).", "מקבצת חומרים לצרכי רכש/דיווח/אנליטיקה.", "ב-Customizing ובסיווג חומר.", { importance: "advanced" }),
  T023T: K("טקסטים לקבוצת חומר.", "תיאורי קבוצות החומר.", "בתצוגת קבוצת חומר.", { importance: "advanced" }),
  T399X: K("קונפיגורציה — פרמטרי בקרת MRP למפעל.", "הגדרות תכנון ברמת מפעל (אופק, יצירת פקודות, זמינות).", "ב-Customizing של MRP.", { importance: "advanced", s4: "בדוק התאמה ל-MRP Live." }),
  TCK03: K("קונפיגורציה — וריאנט תמחור (Costing variant).", "הגדרות חישוב עלות תקן (אסטרטגיית מחיר, וריאנט).", "ב-Customizing של Product Costing.", { importance: "advanced", trust: "needs-verification" }),
  T438M: K("קונפיגורציה — פרמטרי MRP נוספים.", "הגדרות בקרת תכנון נוספות.", "ב-Customizing של MRP.", { importance: "advanced", trust: "needs-verification" }),
  TCO01: K("קונפיגורציה — סוג פקודת CO.", "הגדרות סוג פקודה לבקרת עלויות.", "ב-Customizing של CO.", { importance: "advanced", trust: "needs-verification" }),
  TC22: K("קונפיגורציה — מפתח בקרה (נוסף).", "טבלת הגדרה הקשורה למפתחות בקרה של פעולות.", "ב-Customizing של רשימות פעולות.", { importance: "advanced", trust: "needs-verification" }),
};
