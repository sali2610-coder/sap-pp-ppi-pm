// ===== PP Digital Textbook — Chapter 13 (Material Requirements Planning) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Source hierarchy preserved; corrupted parent labels from the PDF TOC
// extraction were corrected and coherent sub-headings nested under their
// proper parents. Transformative Hebrew; SAP identifiers verbatim EN.
import type { TextbookChapter } from "./types";

export const CH13: TextbookChapter = {
  n: 13,
  titleHe: "תכנון דרישות חומר (MRP)",
  titleEn: "Material Requirements Planning",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לתכנון דרישות-חומר (MRP) ב-SAP S/4HANA. כל תת-פרק וכל תת-סעיף מהספר המקורי הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. הנושאים: סוגי-MRP, הרצת-MRP (MD01N/MD02/MD03), MRP Live ב-S/4HANA, חישוב-דרישות-נטו, שיטות גודל-אצווה, הצעות-רכש (הזמנות-מתוכננות/דרישות-רכש), תזמון, אזורי-MRP, הערכה (MD04/MD05) וקבוצות-MRP. המטרה: ללמוד את תכנון-הדרישות ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 13.1
    {
      id: "13.1", titleHe: "סקירת תהליך ה-MRP", titleEn: "Process Overview",
      execHe:
        "תכנון דרישות-חומר (MRP) הוא המנוע שממיר ביקוש (הזמנות-לקוח, דרישות-עצמאיות מתוכננות, צריכה היסטורית) לתוכנית-אספקה מאוזנת. הוא עונה על שלוש שאלות-יסוד: מה להזמין/לייצר, כמה, ומתי. תוצריו הם הצעות-רכש — הזמנות-מתוכננות לייצור-פנים ודרישות-רכש לרכש חיצוני.",
      beginnerHe:
        "דמיין מנהל-מחסן ששואל בכל בוקר: 'מה חסר לי, כמה, ולמתי?'. ה-MRP עושה זאת אוטומטית לכל חומר — סוקר מלאי, דרישות ואספקות צפויות, ומציע מה להזמין או לייצר כדי שלא יחסר וגם לא יצטבר עודף. התוצאה היא רשימת-הצעות שהמתכנן מאשר.",
      consultantHe:
        "ה-MRP פועל ברמת-חומר/מפעל (או אזור-MRP), Level-by-level לפי Low-Level Code (טבלת MARC, שדה DISST). לכל חומר הוא מבצע: חישוב-נטו → חישוב גודל-אצווה → קביעת סוג-רכש → תזמון → פיצוץ-BOM ליצירת דרישות-תלויות. ב-S/4HANA הליבה היא MRP Live (MD01N) הרצה על HANA בזיכרון, מקבילית ומהירה משמעותית מ-MD01 הקלאסי. תוצרים נשמרים ב-PLAF (הזמנות-מתוכננות) ו-EBAN (דרישות-רכש).",
      purposeHe:
        "המטרה: להבטיח זמינות-חומרים בכמות ובמועד הנכונים תוך מזעור מלאי. ה-MRP מגשר בין ניהול-הביקוש (פרק 12) לבין הביצוע ברצפת-הייצור והרכש, והוא הצומת המרכזי של שרשרת-האספקה ב-PP.",
      processExampleHe:
        "דרישה-עצמאית מתוכננת ל-1,000 יח' מוצר בשבוע 10. ה-MRP בודק מלאי (200) ואספקות-בדרך (0), מחשב נטו 800, קובע גודל-אצווה, יוצר הזמנה-מתוכננת, מתזמן אותה לאחור מתאריך-הדרישה, ומפצץ את ה-BOM לדרישות-תלויות לתרכיז, סוכר ואריזה — שעבורן נוצרות דרישות-רכש.",
      cbcHe:
        "ב-CBC הרצת-MRP לילית מתרגמת את תחזית-המכירות (PIR) של כל SKU-משקה לתוכנית-מילוי לקווי-הייצור ולדרישות-רכש לתרכיז, סוכר, CO2 ואריזה. ה-MRP מבטיח שחומרי-הגלם יגיעו בזמן לקווי-המילוי בלי ניפוח-מלאי של חומרים בעלי תוקף.",
      navHe: [
        "Production ► Material Requirements Planning ► Planning ► Define Scope of Planning for Total Planning",
        "Logistics ► Production ► MRP ► Planning ► Total Planning ► Online (MD01N)",
        "Production ► MRP ► Evaluations ► Stock/Requirements List (MD04)",
      ],
      tables: ["MDKP", "MDTB", "PLAF", "EBAN", "MARC"],
      tcodes: ["MD01N", "MD01", "MD02", "MD03", "MD04", "MD05"],
      fiori: ["F1422", "F2101", "F0247"],
      configHe: [
        "Scope of Planning: הגדרת קבוצת-מפעלים/אזורי-MRP לתכנון-כולל אחד.",
        "Plant Parameters (OPPQ) ו-MRP Group Parameters (OPPR): פרמטרי-בקרה גלובליים להרצה.",
        "Processing Key (NETCH/NETPL/NEUPL): היקף החישוב בכל הרצה.",
        "הפעלת MRP Live דורשת מערכת S/4HANA; MD01N הוא נקודת-הכניסה.",
      ],
      flow: [
        { he: "ביקוש (PIR/הזמנת-לקוח)", code: "MD61/VA01" },
        { he: "הרצת-MRP", code: "MD01N", note: "Level-by-level" },
        { he: "חישוב-נטו", code: "Net Requirements" },
        { he: "גודל-אצווה + תזמון", code: "Lot Size/Scheduling" },
        { he: "הצעות-רכש", code: "PLAF/EBAN", note: "הזמנה-מתוכננת/דרישת-רכש" },
        { he: "הערכה ואישור", code: "MD04" },
      ],
      masterDataHe: [
        "MARC-DISMM = MRP Type · MARC-DISLS = Lot Size · MARC-DISPO = MRP Controller.",
        "MARC-DISST = Low-Level Code (קובע סדר-עיבוד) · MARC-BESKZ = Procurement Type.",
      ],
      mistakesHe: [
        "הרצת NEUPL (Regenerative) במקום NETCH יום-יומית — עומס מיותר על המערכת.",
        "הזנחת אישור הצעות-ה-MRP ב-MD04 — ההצעות נשארות 'מתוכננות' ולא מומרות.",
        "ציפייה ש-MRP יתקן נתוני-אב שגויים — הוא מבצע 'Garbage in, garbage out'.",
      ],
      troubleshootHe: [
        "MRP לא יצר הצעה ➔ בדוק DISMM≠ND, קיום תצוגת-MRP, ודרישה פתוחה ב-MD04.",
        "הרצה איטית מאוד ➔ NEUPL מיותר; עבור ל-Net Change ו/או MRP Live.",
        "תוצאות לא-עקביות בין הרצות ➔ Low-Level Code שגוי או שינויי-אב באמצע.",
      ],
      bestPracticeHe: [
        "הרץ MRP Live (MD01N) ב-S/4HANA כברירת-מחדל — מקבילי ומהיר.",
        "השתמש ב-Net Change Planning (NETCH) להרצות יום-יום; NEUPL רק בעת-צורך.",
        "הגדר את חלון-MD04 כתחנת-העבודה היום-יומית של המתכנן.",
      ],
      interviewHe: [
        { qHe: "אילו שלוש שאלות עונה MRP?", aHe: "מה לייצר/להזמין, כמה (גודל-אצווה), ומתי (תזמון). אלה תוצאת חישוב-הנטו, קביעת-הכמות והתזמון." },
        { qHe: "מהו Low-Level Code ולמה הוא חשוב?", aHe: "MARC-DISST; הוא קובע את סדר עיבוד החומרים — מהמוצר-הסופי (רמה 0) כלפי מטה — כך שדרישות-תלויות מחושבות לפני שהרמה התחתונה מעובדת." },
        { qHe: "מה מבדיל MRP Live מ-MRP הקלאסי?", aHe: "MRP Live רץ בזיכרון על HANA, מקבילית, בלי materialize של תוצאות-ביניים — מהיר פי-כמה ומתאים להרצות-תכופות." },
      ],
      takeawaysHe: [
        "MRP = מנוע ההמרה מביקוש לתוכנית-אספקה (מה/כמה/מתי).",
        "פועל Level-by-level לפי Low-Level Code; תוצרים PLAF/EBAN.",
        "ב-S/4HANA העדף MRP Live (MD01N).",
        "MD04 הוא חלון-ההערכה והאישור היום-יומי.",
      ],
      relatedHe: [
        { labelHe: "PP · ניהול ביקוש", href: "/library/pp/chapter-12/" },
        { labelHe: "PP · אסטרטגיות-תכנון", href: "/library/pp/chapter-12/#sub-12.2" },
        { labelHe: "אובייקט · PLAF", href: "/library/pp/object/PLAF/" },
      ],
    },
    // ============================================================ 13.2
    {
      id: "13.2", titleHe: "תכנון-ייצור: סוגי MRP", titleEn: "Production Planning",
      execHe:
        "סוג-ה-MRP (MRP Type, שדה MARC-DISMM) הוא הפרמטר הקובע ביותר בתכנון: הוא מחליט אם החומר מתוכנן לפי ביקוש (MRP אמיתי), לפי צריכה (Reorder/Forecast), או כלל לא מתוכנן. כל סוג מפעיל אלגוריתם שונה וקובע אילו שדות-אב הופכים רלוונטיים.",
      beginnerHe:
        "יש שתי גישות-יסוד לתכנן חומר: 'לפי ביקוש' — מסתכלים על מה שבאמת הוזמן/מתוכנן (PD); ו'לפי צריכה' — מסתכלים על היסטוריה ומחדשים מלאי כשהוא יורד (VB/VM). סוג-ה-MRP הוא הבורר בין הגישות, וכל ערך-קוד מפעיל לוגיקה אחרת.",
      consultantHe:
        "ב-Customizing (OMDQ) מגדירים לכל MRP Type: שיטת-התכנון (Deterministic / Reorder-point / Forecast-based), האם Firming אוטומטי, האם משולב Forecast, ואילו שדות-אב חובה. PD = תכנון דטרמיניסטי מלא; VB/VM = נקודת-הזמנה ידנית/אוטומטית; VV = תכנון מבוסס-תחזית; R1/R2 = Time-phased; ND = ללא-תכנון. הבחירה משפיעה ישירות על תוצאת ה-MRP Run ועל MD04.",
      purposeHe:
        "לאפשר אסטרטגיית-תכנון מתאימה לכל סוג-חומר: מוצרי-מפתח עתירי-תנועה לפי ביקוש דטרמיניסטי; פריטי-C זולים לפי נקודת-הזמנה פשוטה. ההתאמה חוסכת מלאי ומאמץ-תכנון.",
      processExampleHe:
        "חומר A (FERT עתיר-ערך) ב-PD: כל דרישה מייצרת מיד הצעת-אספקה. חומר B (בורג זול) ב-VB: ה-MRP מציע חידוש רק כשהמלאי-הזמין יורד מתחת ל-Reorder Point — בלי תלות בדרישות-בודדות.",
      cbcHe:
        "ב-CBC משקאות מוגמרים ותרכיזים = PD (מונעי-ביקוש מהתחזית); חומרי-עזר זולים כמו דבק-תוויות או חומרי-ניקוי = VB/VM (נקודת-הזמנה). כך מנהלי-התכנון מתמקדים בחומרים הקריטיים בלבד.",
      navHe: [
        "Production ► MRP ► Master Data ► Check MRP Types (OMDQ)",
        "Production ► MRP ► Master Data ► Define Special Procurement Types",
      ],
      tables: ["T438A", "MARC", "T438M"],
      tcodes: ["OMDQ", "MM02", "MD04"],
      fiori: ["F1422", "F1602A"],
      configHe: [
        "Check MRP Types (OMDQ): לכל MRP Type — MRP Procedure (D/B/V/R), Forecast Indicator, Firming Type, ו-Reorder/Forecast רלוונטיות.",
        "MRP Procedure קובע את האלגוריתם; Firming Type קובע התנהגות בתוך גבול-הזמן-המתוכנן.",
        "שדות-אב חובה (Reorder Point, Forecast) נגזרים מסוג-ה-MRP שנבחר.",
      ],
      flow: [
        { he: "בחירת MRP Type", code: "DISMM", note: "MM02 / MRP1" },
        { he: "קביעת MRP Procedure", code: "OMDQ" },
        { he: "הרצת-MRP מפעילה אלגוריתם", code: "MD01N" },
        { he: "הצעות לפי הסוג", code: "MD04" },
      ],
      masterDataHe: [
        "MARC-DISMM = MRP Type — הפרמטר המרכזי; משפיע על שדות-חובה נוספים.",
        "תלוי-סוג: Reorder Point (MINBE), Safety Stock (EISBE), Forecast model.",
      ],
      mistakesHe: [
        "בחירת PD לפריטי-C זולים — מנפח את כמות ההצעות לתכנון מיותר.",
        "בחירת VB למוצר מונע-ביקוש — מתעלם מהזמנות-לקוח גדולות וגורם למחסור.",
        "ND בטעות — החומר נעלם מהתכנון בלי אזהרה.",
      ],
      troubleshootHe: [
        "החומר לא מתוכנן כלל ➔ DISMM = ND או חסרה תצוגת-MRP.",
        "הצעות לא תואמות לדרישות ➔ MRP Type מבוסס-צריכה במקום דטרמיניסטי.",
      ],
      bestPracticeHe: [
        "תקנן מספר מצומצם של MRP Types ושייך לפי ניתוח-ABC.",
        "השתמש ב-PD לחומרים מונעי-ביקוש; שמור Reorder לפריטים זולים ויציבים.",
      ],
      interviewHe: [
        { qHe: "באיזה שדה יושב סוג-ה-MRP?", aHe: "MARC-DISMM (תצוגת MRP 1). הוא קובע את שיטת-התכנון לחומר/מפעל." },
        { qHe: "מהו ההבדל בין תכנון מבוסס-ביקוש למבוסס-צריכה?", aHe: "מבוסס-ביקוש (PD) מתכנן לפי דרישות עתידיות ידועות; מבוסס-צריכה (VB/VV) מתכנן לפי היסטוריה ונקודת-הזמנה/תחזית בלי לראות דרישות בודדות." },
      ],
      takeawaysHe: [
        "MRP Type (DISMM) = הבורר המרכזי של אלגוריתם-התכנון.",
        "מבוסס-ביקוש (PD) מול מבוסס-צריכה (VB/VM/VV).",
        "שייך סוגים לפי ABC כדי למקד מאמץ-תכנון.",
      ],
      relatedHe: [
        { labelHe: "PP · אסטרטגיות-תכנון", href: "/library/pp/chapter-12/" },
        { labelHe: "אובייקט · MARC", href: "/library/pp/object/MARC/" },
      ],
      children: [
        {
          id: "13.2.1", titleHe: "סוג MRP — PD (תכנון דטרמיניסטי)", titleEn: "Material Requirements Planning Type PD",
          execHe: "PD הוא סוג-ה-MRP הקלאסי והנפוץ ביותר: תכנון דטרמיניסטי מלא המבוסס על דרישות עתידיות ידועות — הזמנות-לקוח, דרישות-עצמאיות מתוכננות ודרישות-תלויות. הוא מייצר הצעת-אספקה לכל מחסור שמזוהה.",
          beginnerHe: "PD = 'תכנן לפי מה שצריך'. כל דרישה עתידית גלויה ל-MRP, והוא יוצר הצעה בדיוק כדי לכסות אותה, במועד הנכון. זהו ברירת-המחדל למוצרים חשובים.",
          consultantHe: "ב-OMDQ ל-PD מוגדר MRP Procedure = 'D' (MRP). האלגוריתם מבצע חישוב-נטו מלא, פיצוץ-BOM, ויצירת דרישות-תלויות. PD אינו משתמש בנקודת-הזמנה; הוא מסתמך על Net Requirements לאורך ציר-הזמן. ניתן לשלב Safety Stock ו-Planning Time Fence.",
          purposeHe: "לתכנן במדויק חומרים מונעי-ביקוש שבהם חשוב לכסות דרישות ידועות בלי ניחוש — מוצרים-סופיים, מכלולים ורכיבים קריטיים.",
          processExampleHe: "הזמנת-לקוח ל-500 יח' בשבוע 8 + מלאי 100 ➔ PD מחשב נטו 400, יוצר הצעת-אספקה לשבוע 8 ומפצץ ל-BOM לדרישות-רכיבים.",
          cbcHe: "ב-CBC כל המשקאות המוגמרים והתרכיזים מתוכננים ב-PD — הם מונעי-תחזית-מכירות ודורשים תזמון מדויק לקווי-המילוי.",
          navHe: ["Production ► MRP ► Master Data ► Check MRP Types (OMDQ)"],
          tables: ["T438A", "MARC"],
          tcodes: ["OMDQ", "MM02", "MD04"],
          fiori: ["F1422"],
          configHe: ["ב-OMDQ ודא ש-PD מוגדר עם MRP Procedure = D ובלי Reorder/Forecast indicators."],
          mistakesHe: ["שימוש ב-PD לפריטי-C עם דרישות זניחות — נפח-תכנון מיותר."],
          troubleshootHe: ["PD לא מכסה דרישה ➔ בדוק Planning Time Fence או Firming שחוסם יצירת-הצעות חדשות."],
          bestPracticeHe: ["השתמש ב-PD כברירת-מחדל לחומרים מונעי-ביקוש.", "שלב Safety Stock לכיסוי-תנודתיות במקום ניפוח-אצוות."],
          interviewHe: [
            { qHe: "מהו PD?", aHe: "MRP דטרמיניסטי מלא — תכנון לפי דרישות-עתידיות ידועות, בלי נקודת-הזמנה. ה-MRP Procedure הוא D." },
            { qHe: "מתי תבחר PD?", aHe: "לחומרים מונעי-ביקוש: מוצרים-סופיים, מכלולים ורכיבים קריטיים שבהם חשוב לכסות דרישות גלויות במדויק." },
          ],
          takeawaysHe: ["PD = תכנון דטרמיניסטי מלא (Procedure D).", "ברירת-המחדל לחומרים מונעי-ביקוש.", "מחשב נטו ומפצץ BOM."],
        },
        {
          id: "13.2.2", titleHe: "סוג MRP — VB (נקודת-הזמנה ידנית)", titleEn: "Material Requirements Planning Type VB",
          execHe: "VB הוא תכנון לפי נקודת-הזמנה ידנית (Manual Reorder Point): כאשר המלאי-הזמין יורד מתחת לסף שהמתכנן הזין ידנית (MARC-MINBE), ה-MRP יוצר הצעת-חידוש. פשוט, יציב ומתאים לפריטים מבוססי-צריכה.",
          beginnerHe: "VB = 'הזמן כשנגמר'. המתכנן קובע סף-מלאי; כשיורדים מתחתיו, המערכת מציעה לחדש. אין צורך לחזות דרישות — רק לעקוב אחר רמת-המלאי.",
          consultantHe: "ב-OMDQ ל-VB מוגדר MRP Procedure = 'B' (Reorder point) עם Reorder indicator ידני. ה-Reorder Point (MINBE) ו-Safety Stock (EISBE) מוזנים ידנית באב-החומר. ה-MRP בודק מלאי-זמין מול MINBE; אם נמוך — יוצר הצעה בגודל-האצווה המוגדר. אין פיצוץ מבוסס-דרישות-עתידיות.",
          purposeHe: "לתכנן פריטים בעלי-צריכה יציבה וערך נמוך-בינוני בלי מאמץ-חיזוי — בקרת-מלאי פשוטה מבוססת-סף.",
          processExampleHe: "Reorder Point = 100, מלאי-זמין יורד ל-90 ➔ ה-MRP יוצר הצעת-חידוש בגודל-האצווה (למשל 500) להחזרת המלאי מעל הסף.",
          cbcHe: "ב-CBC חומרי-ניקוי, סיכה וחלקי-עזר זולים מנוהלים ב-VB עם Reorder Point ידני — חוסך תכנון פרטני לכל פריט-C.",
          navHe: ["Production ► MRP ► Master Data ► Check MRP Types (OMDQ)"],
          tables: ["T438A", "MARC"],
          tcodes: ["OMDQ", "MM02", "MD04"],
          fiori: ["F1422"],
          configHe: ["ב-OMDQ ל-VB: Procedure = B, Reorder indicator ידני; הזן MINBE ו-EISBE ידנית באב-החומר."],
          mistakesHe: ["Reorder Point לא-מעודכן בעקבות שינוי-צריכה ➔ מחסור או עודף.", "שימוש ב-VB למוצר מונע-ביקוש ➔ התעלמות מהזמנות גדולות."],
          troubleshootHe: ["אין הצעת-חידוש למרות מלאי-נמוך ➔ MINBE לא הוזן או מלאי-זמין עדיין מעל הסף.", "חידוש-יתר ➔ גודל-אצווה גדול מדי מול הצריכה."],
          bestPracticeHe: ["עדכן Reorder Point תקופתית לפי צריכה בפועל.", "השתמש ב-VB רק לפריטים בעלי-צריכה יציבה."],
          interviewHe: [
            { qHe: "מה ההבדל בין VB ל-VM?", aHe: "ב-VB ה-Reorder Point מוזן ידנית; ב-VM הוא מחושב אוטומטית מהתחזית. שניהם תכנון מבוסס נקודת-הזמנה (Procedure B)." },
            { qHe: "כיצד VB מחליט על הזמנה?", aHe: "כשהמלאי-הזמין יורד מתחת ל-MINBE שהוזן ידנית, נוצרת הצעת-חידוש בגודל-האצווה המוגדר." },
          ],
          takeawaysHe: ["VB = נקודת-הזמנה ידנית (Procedure B).", "Reorder Point ו-Safety Stock ידניים.", "מתאים לפריטי-C יציבים."],
        },
        {
          id: "13.2.3", titleHe: "סוג MRP — VM (נקודת-הזמנה אוטומטית)", titleEn: "Material Requirements Planning Type VM",
          execHe: "VM הוא תכנון נקודת-הזמנה אוטומטית: ה-Reorder Point וה-Safety Stock מחושבים אוטומטית מתוצאות-התחזית (Forecast) בכל הרצת-MRP. הוא משלב את פשטות נקודת-ההזמנה עם דינמיות מבוססת-תחזית.",
          beginnerHe: "VM = 'הזמן כשנגמר, אבל תן למחשב לקבוע את הסף'. במקום שהמתכנן יזין Reorder Point ידנית, המערכת מחשבת אותו מהתחזית — והסף מתעדכן מעצמו ככל שהצריכה משתנה.",
          consultantHe: "ב-OMDQ ל-VM: Procedure = B עם Reorder indicator אוטומטי ו-Forecast indicator פעיל. בהרצת-התחזית (MP30/אוטומטית), SAP מחשב MINBE ו-EISBE לפי צריכה-עתידית, זמן-אספקה ורמת-שירות. ה-MRP אז משווה מלאי-זמין מול הסף-המחושב.",
          purposeHe: "לתחזק נקודת-הזמנה מעודכנת אוטומטית לפריטים בעלי-צריכה משתנה, בלי תחזוקה ידנית מתמדת של הסף.",
          processExampleHe: "תחזית-צריכה עולה לקראת עונה ➔ הרצת-תחזית מעלה את ה-Reorder Point אוטומטית ➔ ה-MRP מחדש מוקדם יותר כדי למנוע מחסור עונתי.",
          cbcHe: "ב-CBC חומרי-עזר עם צריכה עונתית (למשל אריזות-קיץ) מנוהלים ב-VM — הסף עולה אוטומטית לפני העונה ויורד אחריה.",
          navHe: ["Production ► MRP ► Master Data ► Check MRP Types (OMDQ)", "Production ► MRP ► Forecast"],
          tables: ["T438A", "MARC", "PROP"],
          tcodes: ["OMDQ", "MP30", "MM02"],
          fiori: ["F1422"],
          configHe: ["ב-OMDQ ל-VM: Procedure = B + Reorder אוטומטי + Forecast indicator; הגדר Forecast model בתצוגת Forecasting."],
          mistakesHe: ["היעדר היסטוריית-צריכה מספקת ➔ תחזית-שגויה ו-Reorder Point לא-אמין.", "מודל-תחזית לא-מתאים לדפוס-הצריכה."],
          troubleshootHe: ["Reorder Point לא מתעדכן ➔ הרצת-תחזית לא רצה או Forecast model חסר.", "סף לא-הגיוני ➔ מודל-תחזית שגוי או נתוני-צריכה חריגים."],
          bestPracticeHe: ["ודא היסטוריית-צריכה נקייה לפני הפעלת VM.", "בחר מודל-תחזית התואם לדפוס (קבוע/מגמתי/עונתי)."],
          interviewHe: [
            { qHe: "כיצד מחושב ה-Reorder Point ב-VM?", aHe: "אוטומטית מהרצת-התחזית — לפי צריכה-עתידית חזויה, זמן-אספקה ורמת-שירות; מתעדכן בכל הרצה." },
          ],
          takeawaysHe: ["VM = נקודת-הזמנה אוטומטית מבוססת-תחזית.", "MINBE/EISBE מחושבים בהרצת-Forecast.", "מתאים לצריכה משתנה/עונתית."],
        },
        {
          id: "13.2.4", titleHe: "סוג MRP — V1 (נקודת-הזמנה + דרישות חיצוניות)", titleEn: "Material Requirements Planning Type V1",
          execHe: "V1 הוא נקודת-הזמנה ידנית המתחשבת גם בדרישות-חיצוניות (Manual reorder point with external requirements). הסף ידני, אך ה-MRP מביא בחשבון גם הזמנות-לקוח/הזמנות-העברה כשהוא בוחן את הצורך לחדש.",
          beginnerHe: "V1 = 'נקודת-הזמנה ידנית, אבל אם יש הזמנה-לקוח גדולה — קח גם אותה בחשבון'. זה גשר בין נקודת-הזמנה פשוטה לתכנון מונע-ביקוש.",
          consultantHe: "ב-OMDQ ל-V1: Procedure = B, Reorder ידני, אך עם דגל 'external requirements in reorder-point planning'. כך הזמנות-לקוח ודרישות-העברה נכללות בחישוב בנוסף לסף, ומונעות מחסור כשמתקבלת דרישה גדולה חד-פעמית.",
          purposeHe: "לשמור על פשטות נקודת-ההזמנה תוך הגנה מפני דרישות-חיצוניות חריגות שעלולות לרוקן מלאי לפני שהסף 'מרגיש' זאת.",
          processExampleHe: "Reorder Point = 100, מלאי 120, אך מתקבלת הזמנת-לקוח ל-200 ➔ V1 מזהה את החריגה הצפויה ויוצר הצעת-חידוש מבעוד-מועד.",
          cbcHe: "ב-CBC פריט-עזר עם הזמנות-העברה בין-מפעלים מנוהל ב-V1 — נקודת-הזמנה רגילה, אך העברה גדולה מתוכננת נלקחת בחשבון.",
          navHe: ["Production ► MRP ► Master Data ► Check MRP Types (OMDQ)"],
          tables: ["T438A", "MARC"],
          tcodes: ["OMDQ", "MM02", "MD04"],
          fiori: ["F1422"],
          configHe: ["ב-OMDQ ל-V1: Procedure = B, Reorder ידני, ודגל הכללת external requirements פעיל."],
          mistakesHe: ["בלבול בין V1 ל-VB — V1 כולל דרישות-חיצוניות, VB לא.", "Reorder Point ידני לא-מעודכן."],
          troubleshootHe: ["הזמנת-לקוח לא משפיעה על החידוש ➔ דגל external requirements לא פעיל ➔ בחר V1 במקום VB."],
          bestPracticeHe: ["השתמש ב-V1 כשיש דרישות-חיצוניות חריגות לצד צריכה-שוטפת יציבה."],
          interviewHe: [{ qHe: "במה V1 שונה מ-VB?", aHe: "שניהם נקודת-הזמנה ידנית, אך V1 כולל גם דרישות-חיצוניות (הזמנות-לקוח/העברה) בחישוב-הצורך, בעוד VB מתעלם מהן." }],
          takeawaysHe: ["V1 = נקודת-הזמנה ידנית + דרישות-חיצוניות.", "מגן מפני דרישות-חריגות חד-פעמיות.", "Procedure B עם דגל external requirements."],
        },
        {
          id: "13.2.5", titleHe: "סוג MRP — V2 (נקודת-הזמנה אוטומטית + דרישות חיצוניות)", titleEn: "Material Requirements Planning Type V2",
          execHe: "V2 משלב נקודת-הזמנה אוטומטית (מבוססת-תחזית) עם התחשבות בדרישות-חיצוניות. הוא הדינמי ביותר ממשפחת נקודת-ההזמנה: הסף מחושב מתחזית, וגם הזמנות-לקוח/העברה נכללות.",
          beginnerHe: "V2 = 'תן למחשב לקבוע את הסף מהתחזית, וגם תזכור הזמנות-לקוח גדולות'. שילוב של VM (אוטומטי) ו-V1 (דרישות-חיצוניות).",
          consultantHe: "ב-OMDQ ל-V2: Procedure = B, Reorder אוטומטי + Forecast indicator + הכללת external requirements. ה-Reorder Point מחושב בהרצת-תחזית, וה-MRP מתחשב גם בדרישות-עצמאיות/הזמנות-לקוח — שילוב מלא של דינמיות והגנה מפני חריגות.",
          purposeHe: "לתת בקרת-מלאי אוטומטית ומגיבה הן לשינויי-צריכה (תחזית) והן לדרישות-חיצוניות חריגות — בלי תחזוקה ידנית.",
          processExampleHe: "תחזית מעלה את ה-Reorder Point ל-150; מתקבלת הזמנה ל-300 ➔ V2 מזהה את שני הגורמים ויוצר הצעת-חידוש מתאימה ובמועד.",
          cbcHe: "ב-CBC פריט-עזר עונתי שגם מועבר בין-מפעלים מנוהל ב-V2 — סף אוטומטי-עונתי בתוספת התחשבות בהעברות מתוכננות.",
          navHe: ["Production ► MRP ► Master Data ► Check MRP Types (OMDQ)", "Production ► MRP ► Forecast"],
          tables: ["T438A", "MARC", "PROP"],
          tcodes: ["OMDQ", "MP30", "MM02"],
          fiori: ["F1422"],
          configHe: ["ב-OMDQ ל-V2: Procedure = B, Reorder אוטומטי, Forecast indicator, ודגל external requirements."],
          mistakesHe: ["הסתמכות על תחזית בלי היסטוריה מספקת.", "בחירת V2 לפריט פשוט שבו VM/VB מספיק — מורכבות מיותרת."],
          troubleshootHe: ["סף לא מתעדכן ➔ הרצת-תחזית לא רצה.", "דרישות-חיצוניות מתעלמות ➔ דגל external requirements כבוי."],
          bestPracticeHe: ["שמור V2 לפריטים שבהם גם הצריכה משתנה וגם יש דרישות-חיצוניות חריגות."],
          interviewHe: [{ qHe: "מה ייחודי ב-V2?", aHe: "הוא היחיד במשפחת נקודת-ההזמנה שמשלב סף-אוטומטי-מבוסס-תחזית עם התחשבות בדרישות-חיצוניות בו-זמנית." }],
          takeawaysHe: ["V2 = נקודת-הזמנה אוטומטית + דרישות-חיצוניות.", "המגיב ביותר ממשפחת ה-Reorder.", "Forecast + external requirements יחד."],
        },
        {
          id: "13.2.6", titleHe: "סוגי MRP — D1 ו-D2 (Time-Phased)", titleEn: "Material Requirements Planning Types D1 and D2",
          execHe: "D1 ו-D2 הם תכנון time-phased (מבוסס-מחזורים): ה-MRP מתוכנן להריץ את החומר במרווחי-זמן קבועים (למשל כל יום-שלישי), בהתאם למחזור-אספקה של הספק. D1 מבוסס נקודת-הזמנה, D2 משלב תחזית.",
          beginnerHe: "D1/D2 = 'תכנן ביום קבוע בשבוע'. אם ספק מספק רק בימי-שני, אין טעם לתכנן בכל יום — מתכננים פעם בשבוע במועד-האספקה. ה-Planning Calendar קובע את המקצב.",
          consultantHe: "Time-phased planning משתמש ב-Planning Calendar (MD25) המוגדר באב-החומר (MARC-MRPPP). ה-MRP מתכנן את החומר רק בתאריכי-התכנון שבלוח. D1 מבוסס נקודת-הזמנה; D2 מוסיף שילוב-תחזית. שימושי כשמחזור-האספקה קבוע ומחזורי.",
          purposeHe: "ליישר את התכנון למחזור-האספקה הקבוע של הספק, ולמנוע הצעות-רכש בתאריכים שבהם ממילא אי-אפשר לקבל סחורה.",
          processExampleHe: "ספק מספק כל יום-שלישי; Planning Calendar מוגדר לימי-שלישי ➔ ה-MRP מקבץ את כל הדרישות לשבוע ומציע הזמנה אחת ליום-שלישי הקרוב.",
          cbcHe: "ב-CBC חומר-גלם מספק עם מסלול-חלוקה שבועי קבוע מנוהל ב-D1/D2 עם Planning Calendar — הזמנות מקובצות למועד-המשלוח השבועי.",
          navHe: ["Production ► MRP ► Master Data ► Maintain Planning Calendar (MD25/MD26)", "Production ► MRP ► Master Data ► Check MRP Types (OMDQ)"],
          tables: ["T438A", "MARC", "T449P"],
          tcodes: ["OMDQ", "MD25", "MD26", "MM02"],
          fiori: ["F1422"],
          configHe: ["צור Planning Calendar (MD25) עם תאריכי-תכנון מחזוריים; שייך אותו לאב-החומר (MARC-MRPPP) בשילוב MRP Type D1/D2."],
          mistakesHe: ["Planning Calendar לא תואם למועדי-האספקה בפועל.", "שימוש ב-D1/D2 לספק עם אספקה גמישה — מאבד גמישות ללא תועלת."],
          troubleshootHe: ["ההזמנות לא מתקבצות למועד הצפוי ➔ Planning Calendar שגוי או לא משויך.", "אין הצעות כלל ➔ אין תאריך-תכנון קרוב בלוח."],
          bestPracticeHe: ["סנכרן את Planning Calendar עם מועדי-המשלוח החוזיים של הספק.", "השתמש ב-time-phased רק כשמחזור-האספקה באמת קבוע."],
          interviewHe: [
            { qHe: "מהו time-phased planning?", aHe: "תכנון במרווחי-זמן קבועים לפי Planning Calendar (MD25), המסונכרן למחזור-האספקה של הספק; סוגי-MRP D1 (Reorder) ו-D2 (+Forecast)." },
            { qHe: "במה D2 שונה מ-D1?", aHe: "שניהם time-phased לפי לוח; D2 משלב גם תחזית-צריכה בקביעת הכמות, בעוד D1 מבוסס נקודת-הזמנה." },
          ],
          takeawaysHe: ["D1/D2 = תכנון time-phased לפי Planning Calendar.", "מסונכרן למחזור-אספקה קבוע של ספק.", "D1 Reorder · D2 +Forecast."],
        },
      ],
    },
    // ============================================================ 13.3
    {
      id: "13.3", titleHe: "MRP ותכנון מבוסס-צריכה", titleEn: "MRP and Consumption-Based Planning",
      execHe:
        "תכנון מבוסס-צריכה (Consumption-Based Planning, CBP) הוא משפחת-שיטות שאינה מסתמכת על דרישות-עתידיות ידועות אלא על צריכה היסטורית: נקודת-הזמנה, תכנון מבוסס-תחזית ותכנון time-phased. הוא מנוגד ל-MRP הדטרמיניסטי (PD) ומתאים לפריטים שבהם חיזוי-פרטני אינו כדאי.",
      beginnerHe:
        "יש שתי דרכים לדעת כמה להזמין: או לחזות בדיוק כל דרישה (MRP דטרמיניסטי), או להסתכל על מה צרכנו בעבר ולשחזר (מבוסס-צריכה). הגישה השנייה פשוטה יותר ומתאימה לחומרים רבים וזולים שלא משתלם לתכנן פרטנית.",
      consultantHe:
        "CBP כולל שלוש תת-שיטות: (1) נקודת-הזמנה (VB/VM/V1/V2) — חידוש כשהמלאי יורד מסף; (2) תכנון מבוסס-תחזית (VV) — דרישות נגזרות מהרצת-Forecast; (3) time-phased (D1/D2) — מחזורי. כולן משתמשות בהיסטוריית-צריכה (טבלת MVER) ובמודל-תחזית. ההבדל מ-PD: אין פיצוץ מבוסס דרישות-עתידיות גלויות.",
      purposeHe:
        "לאפשר תכנון יעיל ופשוט לפריטים בעלי-צריכה יציבה/חוזרת — בעיקר פריטי-B/C — בלי להעמיס על המתכנן חיזוי-פרטני, ובלי לדרוש BOM/דרישות-עתידיות מדויקות.",
      processExampleHe:
        "פריט-עזר עם צריכה היסטורית של ~50 יח'/חודש מנוהל ב-VV: הרצת-תחזית גוזרת דרישה חודשית מתוכננת; ה-MRP יוצר הצעות לכיסויה — בלי שום הזמנת-לקוח גלויה.",
      cbcHe:
        "ב-CBC רוב פריטי-MRO (תחזוקה, ניקוי, חלפים) מנוהלים מבוסס-צריכה — הם נצרכים באופן חוזר אך אינם חלק מ-BOM של מוצר, ולכן אין להם דרישות-עתידיות גלויות.",
      navHe: [
        "Production ► MRP ► Master Data ► Check MRP Types (OMDQ)",
        "Production ► MRP ► Forecast ► Define Forecast Parameters",
      ],
      tables: ["MVER", "PROP", "MARC", "T438A"],
      tcodes: ["OMDQ", "MP30", "MP38", "MD04"],
      fiori: ["F1422"],
      configHe: [
        "הגדר את ה-MRP Type המתאים (VB/VM/VV/D1/D2) ב-OMDQ עם Procedure B/V/R.",
        "להפעלת תחזית: Forecast model + פרמטרים בתצוגת Forecasting (MP30/MP38).",
        "Consumption update (Total/Unplanned) קובע איזו צריכה נצברת ב-MVER.",
      ],
      flow: [
        { he: "צבירת צריכה היסטורית", code: "MVER" },
        { he: "הרצת-תחזית", code: "MP30", note: "מודל-תחזית" },
        { he: "סף/דרישה-מתוכננת", code: "Reorder/Forecast" },
        { he: "הרצת-MRP", code: "MD01N" },
        { he: "הצעות-חידוש", code: "MD04" },
      ],
      masterDataHe: [
        "MVER = צריכה היסטורית (Total/Unplanned) · PROP = פרמטרי/תוצאות-תחזית.",
        "MARC-VRMOD = Forecast model · תצוגת Forecasting באב-החומר.",
      ],
      mistakesHe: [
        "שימוש ב-CBP לחומר מונע-ביקוש עם BOM — מתעלם מדרישות-תלויות גלויות.",
        "Consumption update לא מוגדר ➔ אין נתוני-צריכה לתחזית.",
      ],
      troubleshootHe: [
        "תחזית ריקה/שגויה ➔ אין היסטוריית-צריכה ב-MVER או מודל לא-מתאים.",
        "צריכה לא נצברת ➔ Consumption indicator באב-החומר כבוי.",
      ],
      bestPracticeHe: [
        "שייך CBP לפריטי-B/C בעלי-צריכה יציבה לפי ניתוח-ABC.",
        "ודא נקיון היסטוריית-הצריכה לפני הפעלת תחזית.",
      ],
      interviewHe: [
        { qHe: "מהו ההבדל המהותי בין CBP ל-MRP דטרמיניסטי?", aHe: "CBP מתכנן לפי צריכה היסטורית (סף/תחזית) בלי דרישות-עתידיות גלויות; MRP דטרמיניסטי (PD) מתכנן לפי דרישות ידועות ומפצץ BOM." },
        { qHe: "אילו שלוש תת-שיטות כולל CBP?", aHe: "נקודת-הזמנה, תכנון מבוסס-תחזית, ותכנון time-phased." },
      ],
      takeawaysHe: [
        "CBP = תכנון לפי צריכה היסטורית, לא דרישות-עתידיות.",
        "שלוש תת-שיטות: Reorder · Forecast-based · Time-phased.",
        "מתאים לפריטי-B/C; נשען על MVER ועל מודל-תחזית.",
      ],
      relatedHe: [
        { labelHe: "PP · תכנון-ייצור: סוגי MRP", href: "/library/pp/chapter-13/#sub-13.2" },
        { labelHe: "אובייקט · MVER", href: "/library/pp/object/MVER/" },
      ],
      children: [
        {
          id: "13.3.1", titleHe: "סוג MRP — VV (תכנון מבוסס-תחזית)", titleEn: "Material Requirements Planning Type VV",
          execHe: "VV הוא תכנון מבוסס-תחזית (Forecast-based planning): הדרישות עצמן נגזרות אוטומטית מהרצת-התחזית, ולא מנקודת-הזמנה. ה-MRP מתכנן לכיסוי הדרישות-החזויות לאורך ציר-הזמן.",
          beginnerHe: "VV = 'תכנן לפי מה שצפוי להיצרך'. המערכת מסתכלת על ההיסטוריה, חוזה צריכה עתידית, וה-MRP מייצר הצעות לכסות אותה — בלי סף-הזמנה ובלי הזמנות-לקוח.",
          consultantHe: "ב-OMDQ ל-VV: Procedure = 'V' (Forecast-based). הרצת-התחזית (MP30) יוצרת Forecast requirements לפי-תקופה; ה-MRP מתייחס אליהן כדרישות ומחשב נטו מולן. בניגוד ל-VM (שבו התחזית רק קובעת Reorder Point), כאן התחזית היא הדרישה עצמה.",
          purposeHe: "לתכנן פריטים בעלי-צריכה חוזרת לפי דפוס חזוי לאורך-זמן, כשרוצים פריסת-דרישות תקופתית ולא רק סף-מינימום.",
          processExampleHe: "תחזית: 100 יח'/חודש ➔ הרצת-התחזית יוצרת דרישה של 100 לכל חודש; ה-MRP מחשב נטו מול מלאי ויוצר הצעות לפי גודל-אצווה לכל תקופה.",
          cbcHe: "ב-CBC חומרי-עזר בעלי-צריכה חודשית קבועה (למשל חומרי-מעבדה) מנוהלים ב-VV — דרישה חודשית-חזויה שמתורגמת להצעות-רכש סדירות.",
          navHe: ["Production ► MRP ► Master Data ► Check MRP Types (OMDQ)", "Production ► MRP ► Forecast"],
          tables: ["T438A", "PROP", "MVER"],
          tcodes: ["OMDQ", "MP30", "MM02"],
          fiori: ["F1422"],
          configHe: ["ב-OMDQ ל-VV: Procedure = V; הגדר Forecast model ופרמטרים בתצוגת Forecasting; הרץ MP30."],
          mistakesHe: ["בלבול VV (תחזית=דרישה) עם VM (תחזית=סף).", "מודל-תחזית שגוי ➔ דרישות-חזויות לא-מדויקות."],
          troubleshootHe: ["אין דרישות-תכנון ➔ הרצת-תחזית לא בוצעה או היסטוריה ריקה.", "כמויות שגויות ➔ מודל-תחזית לא תואם לדפוס-הצריכה."],
          bestPracticeHe: ["בחר מודל-תחזית תואם (קבוע/מגמתי/עונתי).", "השווה תחזית מול צריכה-בפועל ועדכן את המודל."],
          interviewHe: [
            { qHe: "מה ההבדל בין VV ל-VM?", aHe: "ב-VV התחזית היא הדרישה עצמה (Procedure V); ב-VM התחזית קובעת רק את ה-Reorder Point (Procedure B)." },
          ],
          takeawaysHe: ["VV = תכנון מבוסס-תחזית (Procedure V).", "התחזית היא הדרישה, לא רק סף.", "פריסת-דרישות תקופתית מהרצת-Forecast."],
        },
        {
          id: "13.3.2", titleHe: "סוגי MRP — R1 ו-R2 (Time-Phased מבוסס-צריכה)", titleEn: "Material Requirements Planning Types R1 and R2",
          execHe: "R1 ו-R2 הם תכנון time-phased מבוסס-צריכה: החומר מתוכנן במרווחים קבועים לפי Planning Calendar, כאשר הדרישות נגזרות מצריכה/תחזית. R1 מבוסס-תחזית; R2 משלב נקודת-הזמנה במקצב מחזורי.",
          beginnerHe: "R1/R2 = 'תכנן ביום קבוע, לפי מה שצפוי להיצרך'. שילוב של מקצב-קבוע (כמו D1/D2) עם תכנון מבוסס-צריכה — מתאים כשגם הצריכה חוזרת וגם האספקה מחזורית.",
          consultantHe: "R1/R2 משתמשים ב-Planning Calendar (MARC-MRPPP) יחד עם Procedure מבוסס-צריכה. R1 = time-phased עם תחזית; R2 = time-phased עם רכיב נקודת-הזמנה. ההבדל מ-D1/D2 הוא בדגש מבוסס-הצריכה/תחזית בקביעת הכמות התקופתית.",
          purposeHe: "לתכנן פריטים בעלי-צריכה-חוזרת שמסופקים במחזור-קבוע — לקבץ דרישות-צריכה למועדי-אספקה מחזוריים ולמזער מספר-הזמנות.",
          processExampleHe: "פריט בצריכה חודשית קבועה, ספק מספק כל תחילת-חודש ➔ R1 מקבץ את דרישת-החודש למועד-האספקה הקבוע ויוצר הזמנה אחת מחזורית.",
          cbcHe: "ב-CBC חומר-עזר בצריכה-חוזרת מספק עם משלוח חודשי-קבוע מנוהל ב-R1/R2 — דרישות חזויות מקובצות למועד-המשלוח החודשי.",
          navHe: ["Production ► MRP ► Master Data ► Maintain Planning Calendar (MD25)", "Production ► MRP ► Master Data ► Check MRP Types (OMDQ)"],
          tables: ["T438A", "MARC", "PROP", "T449P"],
          tcodes: ["OMDQ", "MD25", "MP30"],
          fiori: ["F1422"],
          configHe: ["הגדר Planning Calendar (MD25); שייך לאב-החומר; בחר MRP Type R1/R2 ב-OMDQ עם מקצב מבוסס-צריכה/תחזית."],
          mistakesHe: ["Planning Calendar לא תואם למועדי-אספקה.", "בחירת R1/R2 כשאין באמת מחזוריות-אספקה."],
          troubleshootHe: ["דרישות לא מקובצות נכון ➔ Planning Calendar שגוי.", "כמות מחזורית לא-מדויקת ➔ מודל-תחזית לא-מתאים."],
          bestPracticeHe: ["סנכרן את הלוח עם מועדי-המשלוח.", "השתמש ב-R1/R2 רק כשהצריכה והאספקה שתיהן מחזוריות."],
          interviewHe: [{ qHe: "במה R1/R2 שונים מ-D1/D2?", aHe: "כולם time-phased לפי Planning Calendar; R1/R2 מדגישים תכנון מבוסס-צריכה/תחזית בקביעת הכמות התקופתית, בעוד D1/D2 נטויים יותר לנקודת-הזמנה קלאסית." }],
          takeawaysHe: ["R1/R2 = time-phased מבוסס-צריכה.", "מחזוריות + צריכה-חוזרת.", "מקבץ דרישות למועדי-אספקה קבועים."],
        },
      ],
    },
    // ============================================================ 13.4
    {
      id: "13.4", titleHe: "ניתוח ABC באמצעות MC40 ו-MC41", titleEn: "ABC Analysis Using Transactions MC40 and MC41",
      execHe:
        "ניתוח-ABC מסווג חומרים לפי חשיבותם (A=חשוב/יקר, B=בינוני, C=זול/שולי) כדי למקד מאמץ-תכנון. MC40 מבצע סיווג לפי ערך/צריכה, ו-MC41 מציג את התוצאות. הסיווג מנחה אילו חומרים לתכנן ב-PD ואילו מבוסס-צריכה.",
      beginnerHe:
        "לא כל חומר שווה תשומת-לב זהה. ABC ממיין: מעט חומרי-A מהווים רוב-הערך וצריכים תכנון הדוק; הרבה חומרי-C זולים ומספיק לתכננם פשוט. MC40/MC41 עושים את המיון אוטומטית.",
      consultantHe:
        "MC40 מבצע ABC לפי קריטריון (Total usage value, Consumption quantity וכו') עם אחוזי-סף ל-A/B/C. התוצאה נשמרת ויכולה להזין החלטות MRP Type ו-Lot Size. ב-S/4HANA קיימות גם אפליקציות-אנליטיקה ל-ABC. הניתוח אינו משנה נתוני-אב אוטומטית — הוא כלי-החלטה.",
      purposeHe:
        "להקצות משאבי-תכנון נכון: השקעה מרבית בחומרי-A, אוטומציה לחומרי-C. בסיס לבחירת MRP Type, גודל-אצווה ומלאי-בטחון לכל קטגוריה.",
      processExampleHe:
        "MC40 על 1,000 חומרים: 100 חומרי-A (70% מהערך), 250 B (20%), 650 C (10%) ➔ ה-A מסומנים PD עם בקרה הדוקה; ה-C מועברים ל-VB עם Reorder Point.",
      cbcHe:
        "ב-CBC ABC על מצאי-החומרים מראה שתרכיזים ואריזות-מפתח הם A (תכנון PD הדוק), בעוד חומרי-ניקוי וחלפים זולים הם C (VB אוטומטי) — מיקוד נכון של צוות-התכנון.",
      navHe: [
        "Logistics ► Production ► MRP ► Environment ► ABC Analysis (MC40)",
        "Logistics ► Production ► MRP ► Environment ► ABC Analysis Display (MC41)",
      ],
      tables: ["MARC", "MVER", "MBEW"],
      tcodes: ["MC40", "MC41", "MM02"],
      fiori: ["F1422"],
      configHe: [
        "MC40: בחר קריטריון-ABC (ערך-צריכה כולל/כמות) והגדר אחוזי-סף ל-A/B/C.",
        "התוצאה מנחה החלטות MRP Type/Lot Size — אך אינה מעדכנת אב אוטומטית.",
        "ניתן להריץ MC40 תקופתית לזיהוי שינויי-קטגוריה.",
      ],
      mistakesHe: [
        "סף-ABC לא-מותאם לארגון ➔ סיווג מטעה.",
        "הרצת-ABC חד-פעמית בלי רענון ➔ סיווג מתיישן.",
        "ציפייה ש-MC40 ישנה נתוני-אב — הוא רק כלי-החלטה.",
      ],
      troubleshootHe: [
        "תוצאות-ABC ריקות ➔ אין נתוני-צריכה/ערך לתקופה הנבחרת.",
        "סיווג לא-הגיוני ➔ קריטריון או אחוזי-סף שגויים.",
      ],
      bestPracticeHe: [
        "הרץ ABC תקופתית (רבעוני) ועדכן MRP Type בהתאם.",
        "שלב ABC עם XYZ (יציבות-צריכה) לאסטרטגיה מדויקת יותר.",
      ],
      interviewHe: [
        { qHe: "מה מטרת ניתוח-ABC ב-MRP?", aHe: "למקד מאמץ-תכנון: A=הדוק (PD), C=פשוט (Reorder). MC40 מסווג, MC41 מציג." },
        { qHe: "האם MC40 משנה נתוני-אב?", aHe: "לא — הוא כלי-החלטה בלבד; שינוי MRP Type/Lot Size נעשה ידנית או דרך Mass Maintenance בעקבות הניתוח." },
      ],
      takeawaysHe: [
        "ABC ממקד מאמץ-תכנון לפי חשיבות (A/B/C).",
        "MC40 מסווג · MC41 מציג.",
        "כלי-החלטה — אינו מעדכן אב אוטומטית.",
      ],
      relatedHe: [
        { labelHe: "PP · תכנון-ייצור: סוגי MRP", href: "/library/pp/chapter-13/#sub-13.2" },
      ],
    },
    // ============================================================ 13.5
    {
      id: "13.5", titleHe: "סוג MRP — PD: חישוב-נטו ושיטות גודל-אצווה", titleEn: "MRP Type: PD",
      execHe:
        "ליבת ה-MRP הדטרמיניסטי (PD) היא שני שלבים רצופים: חישוב-דרישות-נטו (Net Requirements) וקביעת גודל-אצווה (Lot Sizing). הראשון קובע 'כמה חסר'; השני קובע 'כמה להזמין בפועל' — לפי שיטה סטטית, תקופתית או אופטימלית.",
      beginnerHe:
        "אחרי ש-MRP יודע מה צריך, הוא עושה שני דברים: (1) מחשב כמה באמת חסר אחרי שמורידים מלאי ואספקות-בדרך (נטו); (2) מחליט כמה לארוז בכל הזמנה — אצווה-קבועה, צבירה-שבועית או חישוב-עלות-אופטימלי.",
      consultantHe:
        "חישוב-נטו: מלאי-זמין + אספקות-קבועות − דרישות − מלאי-בטחון. אם שלילי ➔ נדרש חידוש. גודל-האצווה (MARC-DISLS) מיושם על הכמות-החסרה ומפעיל את אחת מקבוצות-השיטות: סטטית (FX/EX/HB), תקופתית (TB/WB/MB), אופטימלית (WI/SP/DY). ה-Lot Size מוגדר ב-Customizing (OMI4) ומשפיע ישירות על מספר וגודל ההצעות.",
      purposeHe:
        "לאזן בין עלות-הזמנה/הקמה (Setup) לעלות-החזקת-מלאי. גודל-אצווה נכון מצמצם עלות-כוללת; שגוי גורם או לעודף-מלאי או להזמנות-יתר.",
      processExampleHe:
        "דרישה 800, מלאי 200, בטחון 100 ➔ נטו = 800−200+100 = 700. בשיטת Lot-for-Lot (EX) ההצעה = 700; בשיטת Fixed (FX=500) נוצרות שתי הצעות; בשיטת WB (שבועית) כל דרישות-השבוע נצברות להצעה אחת.",
      cbcHe:
        "ב-CBC משקאות מתוכננים PD; גודל-האצווה נגזר מקיבולת-קו-המילוי (אצווה-מינימלית/כפולות). חומרי-אריזה לעיתים בשיטה-תקופתית-שבועית כדי לקבץ משלוחים.",
      navHe: [
        "Production ► MRP ► Master Data ► Check MRP Types (OMDQ)",
        "Production ► MRP ► Planning ► Lot-Size Calculation ► Check Lot-Sizing Procedure (OMI4)",
      ],
      tables: ["T438A", "T449L", "MARC", "MDTB"],
      tcodes: ["OMDQ", "OMI4", "MD04", "MD02"],
      fiori: ["F1422", "F2101"],
      configHe: [
        "Lot-Sizing Procedure (OMI4): מגדיר לכל Lot Size את הקבוצה (סטטי/תקופתי/אופטימלי) ופרמטרים נלווים.",
        "פרמטרי-אצווה באב-החומר: Minimum/Maximum/Fixed lot size, Rounding value/profile.",
        "Net Requirements מחושב אוטומטית; Safety Stock (EISBE) נכלל בחישוב.",
      ],
      flow: [
        { he: "סיכום דרישות ואספקות", code: "MD04" },
        { he: "חישוב-נטו", code: "Stock+Receipts−Req−Safety" },
        { he: "החלת גודל-אצווה", code: "DISLS", note: "OMI4" },
        { he: "עיגול (Rounding)", code: "Rounding value" },
        { he: "הצעת-אספקה", code: "PLAF/EBAN" },
      ],
      masterDataHe: [
        "MARC-DISLS = Lot Size · MARC-BSTMI/BSTMA/BSTFE = Min/Max/Fixed lot.",
        "MARC-EISBE = Safety Stock (נכלל בחישוב-נטו) · MARC-BSTRF = Rounding value.",
      ],
      mistakesHe: [
        "גודל-אצווה תקופתי ארוך מדי ➔ עודף-מלאי וכיסוי-יתר.",
        "Lot-for-Lot לחומר עם Setup יקר ➔ הזמנות-יתר ועלות-הקמה גבוהה.",
        "התעלמות מ-Min/Max lot ➔ הצעות לא-מעשיות לקו-הייצור.",
      ],
      troubleshootHe: [
        "כמות-הצעה גדולה מהצפוי ➔ Fixed/Rounding lot או צבירה-תקופתית.",
        "ריבוי הצעות קטנות ➔ Lot-for-Lot כשעדיף תקופתי.",
        "נטו לא-תואם לציפייה ➔ Safety Stock או אספקות-פתוחות שלא נלקחו בחשבון.",
      ],
      bestPracticeHe: [
        "בחר שיטת-אצווה לפי יחס עלות-הקמה/עלות-החזקה.",
        "השתמש ב-Rounding לכפולות-אריזה/קיבולת-קו.",
        "בדוק את ההשפעה ב-MD04 אחרי כל שינוי-אצווה.",
      ],
      interviewHe: [
        { qHe: "כיצד מחושב Net Requirements?", aHe: "מלאי-זמין + אספקות-קבועות − דרישות − מלאי-בטחון; תוצאה שלילית מפעילה הצעת-חידוש." },
        { qHe: "אילו שלוש קבוצות שיטות-אצווה קיימות?", aHe: "סטטית (Lot-for-lot/Fixed), תקופתית (יומי/שבועי/חודשי), ואופטימלית (Part-period, Least-unit-cost, Groff)." },
      ],
      takeawaysHe: [
        "PD = חישוב-נטו + גודל-אצווה.",
        "נטו = מלאי + אספקות − דרישות − בטחון.",
        "שלוש קבוצות-אצווה: סטטי/תקופתי/אופטימלי (OMI4).",
      ],
      relatedHe: [
        { labelHe: "PP · גבול-זמן-מתוכנן", href: "/library/pp/chapter-13/#sub-13.6" },
        { labelHe: "אובייקט · T449L", href: "/library/pp/object/T449L/" },
      ],
      children: [
        {
          id: "13.5.1", titleHe: "שיטות גודל-אצווה סטטיות", titleEn: "Static Lot Sizing Procedures",
          execHe: "שיטות-אצווה סטטיות קובעות את הכמות לפי כלל-קבוע שאינו תלוי-זמן: Lot-for-Lot (EX) — בדיוק כמה שחסר; Fixed (FX) — כמות-קבועה; Replenish-to-maximum (HB) — מילוי עד מקסימום. פשוטות ושקופות.",
          beginnerHe: "סטטי = 'כלל-אצבע פשוט'. או מזמינים בדיוק כמה שחסר (Lot-for-Lot), או תמיד כמות-קבועה (Fixed), או ממלאים עד תקרה (Maximum).",
          consultantHe: "ב-OMI4: EX = Lot-for-lot (כמות = נטו); FX = Fixed (כמות-קבועה, BSTFE; עודף נשמר); HB = Replenish to maximum stock (עד BSTMA). סטטיות אינן מתחשבות בעלות-החזקה לאורך-זמן — פשוטות אך לא-אופטימליות לתנודתיות.",
          purposeHe: "לתת כלל-אצווה פשוט וצפוי כשאין צורך באופטימיזציה — קווי-ייצור בכמויות-קבועות, או חידוש עד-מקסימום למחסנים.",
          processExampleHe: "נטו 700, Fixed=500 ➔ שתי הצעות (500+500=1000, עודף 300). Lot-for-Lot ➔ הצעה אחת של 700. Maximum (1000) ומלאי 200 ➔ הצעה של 800.",
          cbcHe: "ב-CBC משקה בקיבולת-מינימלית-קבועה של אצוות-מילוי משתמש ב-Fixed/Rounding; מחסן-חומרי-עזר עם Replenish-to-maximum.",
          navHe: ["Production ► MRP ► Planning ► Lot-Size Calculation ► Check Lot-Sizing Procedure (OMI4)"],
          tables: ["T449L", "MARC"],
          tcodes: ["OMI4", "MM02"],
          fiori: ["F1422"],
          configHe: ["ב-OMI4 בחר/הגדר Lot Size מסוג סטטי (EX/FX/HB); הזן Fixed/Maximum lot באב-החומר (BSTFE/BSTMA)."],
          mistakesHe: ["Fixed lot שגוי ➔ עודף קבוע.", "Maximum לא-מעודכן ➔ מילוי-יתר."],
          troubleshootHe: ["עודף-מלאי קבוע ➔ Fixed lot גדול מדי.", "מילוי עד תקרה לא-צפוי ➔ Replenish-to-maximum."],
          bestPracticeHe: ["השתמש ב-Lot-for-Lot כברירת-מחדל פשוטה כשאין Setup משמעותי.", "Fixed/Maximum רק כשיש אילוץ-קיבולת/מחסן ברור."],
          interviewHe: [{ qHe: "מהי שיטת Lot-for-Lot?", aHe: "EX — גודל-האצווה שווה בדיוק לדרישת-הנטו, ללא צבירה; הצעה נפרדת לכל מחסור." }],
          takeawaysHe: ["סטטי = כלל-קבוע לא-תלוי-זמן.", "EX/FX/HB = Lot-for-lot/Fixed/Max.", "פשוט אך לא אופטימלי."],
        },
        {
          id: "13.5.2", titleHe: "שיטות גודל-אצווה תקופתיות", titleEn: "Periodic Lot Sizing Procedures",
          execHe: "שיטות תקופתיות מקבצות את כל הדרישות בתוך תקופה (יום/שבוע/חודש/Planning Calendar) להצעה אחת: TB (יומי), WB (שבועי), MB (חודשי), PB (לפי-לוח). מצמצמות מספר-הזמנות.",
          beginnerHe: "תקופתי = 'אסוף הכל לתקופה והזמן פעם אחת'. במקום הזמנה לכל דרישה, מקבצים את כל דרישות-השבוע (או חודש) להזמנה שבועית/חודשית אחת.",
          consultantHe: "ב-OMI4: TB=daily, WB=weekly, MB=monthly, PB=posting-periods/Planning-calendar. כל הדרישות בתקופה נצברות וההצעה מתוזמנת לתחילת-התקופה. מאזן בין תכיפות-הזמנה למלאי-ממוצע; מתאים כשעלות-הזמנה משמעותית.",
          purposeHe: "לצמצם מספר-הזמנות/הקמות על-ידי קיבוץ-תקופתי, תוך קבלת מלאי-ממוצע גבוה-יותר — איזון עלות-הקמה מול החזקה.",
          processExampleHe: "דרישות יומיות 100/120/80 בשבוע ➔ WB (שבועי) מקבץ ל-300 בהצעה אחת בתחילת-השבוע, במקום שלוש הצעות נפרדות.",
          cbcHe: "ב-CBC חומרי-אריזה מסופקים שבועית; WB מקבץ את כל דרישות-השבוע למשלוח-אחד — פחות תנועות-קבלה ופחות עלות-לוגיסטית.",
          navHe: ["Production ► MRP ► Planning ► Lot-Size Calculation ► Check Lot-Sizing Procedure (OMI4)"],
          tables: ["T449L", "MARC", "T449P"],
          tcodes: ["OMI4", "MD25", "MM02"],
          fiori: ["F1422"],
          configHe: ["ב-OMI4 בחר Lot Size תקופתי (TB/WB/MB/PB); ל-PB שייך Planning Calendar (MD25); קבע scheduling להצעה (התחלה/סוף-תקופה)."],
          mistakesHe: ["תקופה ארוכה מדי ➔ עודף-מלאי בתחילתה.", "PB בלי Planning Calendar תקין."],
          troubleshootHe: ["מלאי-יתר מחזורי ➔ תקופת-אצווה ארוכה.", "הצעות לא מקובצות ➔ Lot Size לא-תקופתי או לוח חסר."],
          bestPracticeHe: ["התאם את התקופה למחזור-האספקה האמיתי.", "השתמש ב-WB/MB כשעלות-הזמנה גבוהה והצריכה יציבה."],
          interviewHe: [{ qHe: "כיצד פועלת שיטה תקופתית?", aHe: "מקבצת את כל הדרישות בתוך התקופה (יום/שבוע/חודש/לוח) להצעה אחת המתוזמנת לתחילת-התקופה — פחות הזמנות, יותר מלאי-ממוצע." }],
          takeawaysHe: ["תקופתי = קיבוץ דרישות לתקופה.", "TB/WB/MB/PB = יומי/שבועי/חודשי/לוח.", "מצמצם הזמנות, מעלה מלאי-ממוצע."],
        },
        {
          id: "13.5.3", titleHe: "שיטות גודל-אצווה אופטימליות", titleEn: "Optimum Lot Sizing Procedures",
          execHe: "שיטות אופטימליות מחשבות גודל-אצווה הממזער עלות-כוללת (הקמה + החזקה) על-פני תקופות: Part-Period Balancing (WI), Least-Unit-Cost (SP), Groff (DY), ו-Dynamic. מתוחכמות מהסטטיות/תקופתיות.",
          beginnerHe: "אופטימלי = 'תן למתמטיקה להחליט'. במקום כלל-קבוע, המערכת מחשבת איזה גודל-אצווה הכי זול בסך-הכל — מאזנת בין עלות-הזמנה לעלות-אחסון.",
          consultantHe: "ב-OMI4: WI = Part-period balancing (משווה עלות-הקמה לעלות-החזקה מצטברת); SP = Least-unit-cost (ממזער עלות-ליחידה); DY = Groff. דורשות פרמטרי-עלות (Setup cost, Storage cost % דרך Lot-Size-dependent settings). רגישות לאיכות-נתוני-העלות.",
          purposeHe: "למזער עלות-מלאי-כוללת לחומרים יקרים עם דרישות-תנודתיות, כשעלות-ההקמה ועלות-ההחזקה משמעותיות וידועות.",
          processExampleHe: "דרישות משתנות לאורך 6 שבועות עם Setup יקר ➔ Part-Period Balancing מקבץ שבועות עד שעלות-ההחזקה-המצטברת משתווה לעלות-ההקמה, ואז פותח אצווה חדשה.",
          cbcHe: "ב-CBC רלוונטי לתרכיז יקר עם דרישות-תנודתיות — אופטימיזציה מאזנת בין עלות-החזקת-מלאי-יקר לבין עלות-הקמת-קו.",
          navHe: ["Production ► MRP ► Planning ► Lot-Size Calculation ► Check Lot-Sizing Procedure (OMI4)"],
          tables: ["T449L", "MARC"],
          tcodes: ["OMI4", "MM02"],
          fiori: ["F1422"],
          configHe: ["ב-OMI4 בחר שיטה אופטימלית (WI/SP/DY); הזן Setup cost ו-Storage cost percentage בהגדרות תלויות-Lot-Size."],
          mistakesHe: ["פרמטרי-עלות שגויים ➔ אופטימיזציה מוטעית.", "שימוש באופטימלי לפריט-C זול — מורכבות מיותרת."],
          troubleshootHe: ["גדלי-אצווה לא-הגיוניים ➔ Setup/Storage cost שגויים.", "תוצאה לא-יציבה ➔ דרישות-תנודתיות קיצוניות."],
          bestPracticeHe: ["שמור שיטות אופטימליות לחומרי-A יקרים בלבד.", "תחזק פרמטרי-עלות מדויקים ועדכניים."],
          interviewHe: [
            { qHe: "מתי כדאי שיטת-אצווה אופטימלית?", aHe: "לחומרים יקרים עם דרישות-תנודתיות, כשעלות-ההקמה והחזקת-המלאי משמעותיות וידועות במדויק." },
            { qHe: "מה עושה Part-Period Balancing?", aHe: "מקבץ דרישות-תקופות עד שעלות-ההחזקה-המצטברת מתקרבת לעלות-ההקמה, ואז פותח אצווה חדשה — איזון עלויות." },
          ],
          takeawaysHe: ["אופטימלי = מזעור עלות-כוללת (הקמה+החזקה).", "WI/SP/DY = Part-period/Least-unit-cost/Groff.", "דורש פרמטרי-עלות מדויקים; לחומרי-A."],
        },
        {
          id: "13.5.4", titleHe: "הגדרת גודל-אצווה (Customizing)", titleEn: "Configuring Lot Size",
          execHe: "הגדרת ה-Lot Size ב-OMI4 קובעת לכל קוד-אצווה את קבוצת-השיטה ופרמטריה: scheduling, התחשבות במלאי-בטחון, טיפול בעודף, ואינטראקציה עם Min/Max/Rounding באב-החומר. זהו השלב המחבר את התאוריה למימוש.",
          beginnerHe: "כאן 'בונים' את כללי-האצווה: לכל קוד שמופיע בשדה Lot Size של אב-החומר מגדירים מה הוא עושה. בלי הגדרה תקינה ה-MRP לא יודע איך לחשב כמויות.",
          consultantHe: "OMI4 (טבלת T449L): לכל Lot Size — Lot-sizing procedure (סטטי/תקופתי/אופטימלי), Scheduling (תחילת/סוף-תקופה), Lot-size indicator, Last-lot-exact, ו-stock-coverage. פרמטרי-אב משלימים: BSTMI/BSTMA/BSTFE (Min/Max/Fixed), BSTRF (Rounding value), Rounding profile. שילובם קובע את הכמות-הסופית.",
          purposeHe: "לתרגם את מדיניות-האצווה הארגונית לקודים-מעשיים שניתן לשייך לחומרים, ולהבטיח אחידות וצפיות בחישוב-הכמויות.",
          processExampleHe: "מגדירים Lot Size 'ZW' = שבועי עם Rounding לכפולות-משטח; משייכים לחומר ב-MARC-DISLS; ה-MRP מקבץ שבועית ומעגל לכפולת-משטח הקרובה.",
          cbcHe: "ב-CBC מגדירים קודי-Lot-Size ייעודיים: 'אצוות-מילוי' עם Rounding לקיבולת-קו, ו'אריזה-שבועית' עם צבירה-תקופתית — אחידות בין כל המשקאות.",
          navHe: ["Production ► MRP ► Planning ► Lot-Size Calculation ► Check Lot-Sizing Procedure (OMI4)"],
          tables: ["T449L", "MARC"],
          tcodes: ["OMI4", "MM02"],
          fiori: ["F1422"],
          configHe: [
            "ב-OMI4 הגדר לכל Lot Size: Procedure, Scheduling indicator, Last-lot-exact, ו-stock-coverage.",
            "השלם באב-החומר: Min/Max/Fixed lot (BSTMI/BSTMA/BSTFE), Rounding value (BSTRF), Rounding profile.",
            "Rounding profile מאפשר עיגול דינמי לכפולות-אריזה לפי כמות.",
          ],
          mistakesHe: ["שיוך Lot Size לא-מוגדר ➔ שגיאת-MRP.", "Rounding לא תואם לכפולות-אריזה ➔ כמויות לא-מעשיות."],
          troubleshootHe: ["כמות לא-מעוגלת כצפוי ➔ Rounding value/profile חסרים או שגויים.", "הצעה לא-נוצרת ➔ Lot Size לא-קיים ב-OMI4."],
          bestPracticeHe: ["תקנן ספרייה קטנה של קודי-Lot-Size לכל הארגון.", "השתמש ב-Rounding profile לכפולות-אריזה משתנות-כמות.", "בדוק תוצאה ב-MD04 אחרי הגדרה."],
          interviewHe: [
            { qHe: "היכן מגדירים את כללי-גודל-האצווה?", aHe: "ב-OMI4 (טבלת T449L) — קבוצת-השיטה ופרמטריה; פרמטרי Min/Max/Fixed/Rounding משלימים באב-החומר." },
            { qHe: "מה תפקיד Rounding profile?", aHe: "מעגל את הכמות לכפולות-אריזה/מטען באופן דינמי לפי טווח-כמות — למשל עד 100 לעגל לעשרות, מעל לעגל למשטחים." },
          ],
          takeawaysHe: ["OMI4 מגדיר כל קוד-Lot-Size ופרמטריו.", "אב-החומר משלים Min/Max/Fixed/Rounding.", "תקנן ספרייה קטנה ובדוק ב-MD04."],
        },
      ],
    },
    // ============================================================ 13.6
    {
      id: "13.6", titleHe: "גבול-הזמן-המתוכנן (Planning Time Fence)", titleEn: "Planning Time Fence",
      execHe:
        "גבול-הזמן-המתוכנן (PTF) הוא חלון-זמן בעתיד-הקרוב שבו ה-MRP אינו רשאי לשנות אוטומטית הצעות קיימות — הן 'מוקפאות' (Firmed). הוא מגן על הטווח-הקרוב מפני תנודות-תכנון ומאפשר ביצוע יציב ברצפה.",
      beginnerHe:
        "PTF = 'אזור-קפוא'. בימים/שבועות הקרובים אי-אפשר להניח ש-MRP ישנה את התוכנית כל לילה — צריך יציבות כדי להזמין חומרים ולתזמן אנשים. בתוך הגבול ההצעות ננעלות; מחוצה לו ה-MRP חופשי לתכנן.",
      consultantHe:
        "ה-PTF נמדד בימי-עבודה (MARC-FXHOR) ומופעל דרך MRP Type עם Firming type (1/2/3/4). בתוך ה-PTF: הזמנות-מתוכננות קיימות מוקפאות; חדשות נוצרות לפי ה-Firming type — למשל בקצה-הגבול (type 1) או בכלל לא. PTF=0 משמעו ללא-הקפאה. שילוב נכון מונע 'נרווסיות-תכנון' (planning nervousness).",
      purposeHe:
        "לייצב את הטווח-הקצר לביצוע: לאפשר רכש-חומרים, תזמון-קיבולת ושיבוץ-כוח-אדם בלי שה-MRP יטרוף את הקלפים בכל הרצה.",
      processExampleHe:
        "PTF = 10 ימים. הזמנה-מתוכננת בעוד 5 ימים נשארת קבועה גם אם דרישה השתנתה; דרישה חדשה בתוך ה-PTF מטופלת לפי ה-Firming type — למשל הצעה חדשה בקצה ה-PTF (יום 10).",
      cbcHe:
        "ב-CBC PTF של מספר-ימים מקפיא את תוכנית-המילוי הקרובה — קווי-הייצור וצוותי-המשמרת יודעים מה מיוצר השבוע, וה-MRP מתכנן רק את העתיד-הרחוק יותר.",
      navHe: [
        "Production ► MRP ► Master Data ► Check MRP Types (OMDQ)",
        "Production ► MRP ► Planning ► Planning Time Fence settings",
      ],
      tables: ["T438A", "MARC", "PLAF"],
      tcodes: ["OMDQ", "MM02", "MD04"],
      fiori: ["F1422", "F2101"],
      configHe: [
        "Firming type ב-OMDQ (1/2/3/4): קובע התנהגות-הקפאה ויצירת-הצעות בתוך ה-PTF.",
        "PTF (MARC-FXHOR): מספר ימי-עבודה; 0 = ללא-הקפאה.",
        "ניתן להקפיא ידנית הצעות (Firming indicator) בנוסף ל-PTF האוטומטי.",
      ],
      flow: [
        { he: "הגדרת Firming type", code: "OMDQ" },
        { he: "קביעת PTF (ימים)", code: "FXHOR" },
        { he: "הרצת-MRP", code: "MD01N" },
        { he: "הצעות בתוך PTF מוקפאות", code: "Firmed" },
        { he: "הצעות מחוץ ל-PTF גמישות", code: "MD04" },
      ],
      masterDataHe: [
        "MARC-FXHOR = Planning Time Fence (ימי-עבודה).",
        "Firming type נגזר מ-MRP Type ב-OMDQ; משולב עם PTF.",
      ],
      mistakesHe: [
        "PTF ארוך מדי ➔ ה-MRP לא מגיב לשינויי-ביקוש אמיתיים בזמן.",
        "PTF = 0 לחומר-מפתח ➔ נרווסיות-תכנון ואי-יציבות-רצפה.",
        "Firming type לא תואם לכוונה ➔ הצעות לא-נוצרות/נוצרות במקום הלא-נכון.",
      ],
      troubleshootHe: [
        "הצעות לא מתעדכנות לפי דרישה חדשה ➔ הן בתוך ה-PTF ומוקפאות.",
        "הצעות חדשות מצטברות בקצה ה-PTF ➔ Firming type 1.",
        "נרווסיות-תכנון ➔ PTF חסר; הגדל FXHOR.",
      ],
      bestPracticeHe: [
        "כייל את ה-PTF לזמן-האספקה/ההקמה הקריטי של החומר.",
        "השתמש ב-PTF לחומרי-מפתח כדי לייצב את הטווח-הקצר.",
        "בחר Firming type המתאים למדיניות יצירת-ההצעות בתוך הגבול.",
      ],
      interviewHe: [
        { qHe: "מהו Planning Time Fence?", aHe: "חלון-זמן (MARC-FXHOR, בימי-עבודה) שבו הצעות-ה-MRP מוקפאות ואינן משתנות אוטומטית — מייצב את הטווח-הקצר." },
        { qHe: "מה קובע ה-Firming type?", aHe: "כיצד מטופלות הצעות בתוך ה-PTF — אילו מוקפאות והיכן נוצרות הצעות-חדשות (למשל בקצה-הגבול או כלל-לא)." },
      ],
      takeawaysHe: [
        "PTF = אזור-קפוא לייצוב הטווח-הקצר.",
        "מוגדר ב-MARC-FXHOR (ימים) + Firming type ב-OMDQ.",
        "מונע נרווסיות-תכנון; כייל לזמן-האספקה.",
      ],
      relatedHe: [
        { labelHe: "PP · סוג MRP — PD", href: "/library/pp/chapter-13/#sub-13.5" },
        { labelHe: "אובייקט · PLAF", href: "/library/pp/object/PLAF/" },
      ],
    },
    // ============================================================ 13.7
    {
      id: "13.7", titleHe: "תכנון נקודת-הזמנה ופחת", titleEn: "Reorder Point Planning",
      execHe:
        "תכנון נקודת-הזמנה (Reorder Point Planning) מחדש מלאי כאשר המלאי-הזמין יורד מתחת לסף שנקבע. תת-פרק זה גם מרכז את סוגי-הפחת (Scrap) — Assembly, Component, ו-Operation/Routing — המגדילים את כמות-התכנון כדי לפצות על אובדן-ייצור.",
      beginnerHe:
        "שני נושאים כאן: (1) נקודת-הזמנה — 'הזמן כשהמלאי יורד מתחת לקו'; (2) פחת — חלק מהחומר 'הולך לאיבוד' בייצור, אז צריך לתכנן יותר מהדרוש כדי לקבל בסוף את הכמות הנכונה.",
      consultantHe:
        "נקודת-הזמנה (Procedure B) משווה מלאי-זמין מול Reorder Point (MARC-MINBE). הפחת מוזן בכמה רמות: Assembly Scrap (MARC-AUSSS) על המוצר כולו; Component Scrap (MARC-KAUSF / BOM-AUSCH) על רכיב; Operation Scrap (Routing) ברמת-פעולה. ה-MRP מגדיל את כמות-הנטו לפי הפחת המצטבר — שילוב לא-מבוקר גורם לכפל-תכנון.",
      purposeHe:
        "נקודת-הזמנה מבטיחה זמינות לפריטים מבוססי-צריכה; הפחת מבטיח שכמות-הייצור-המתוכננת תניב — אחרי אובדן — בדיוק את הכמות-הנדרשת.",
      processExampleHe:
        "דרישה ל-1,000 יח' תקינות + Assembly Scrap 5% ➔ ה-MRP מתכנן 1,053 יח' לייצור כדי שאחרי פחת יישארו ~1,000 תקינות; דרישות-הרכיבים מתואמות בהתאם.",
      cbcHe:
        "ב-CBC חומרי-עזר זולים מנוהלים בנקודת-הזמנה; פחת-רכיב ~1-2% על חומרי-אריזה (בקבוקים/תוויות פגומים) מוזן כ-Component Scrap כדי שהמילוי לא ייעצר בגלל מחסור-אריזה.",
      navHe: [
        "Production ► MRP ► Master Data ► Check MRP Types (OMDQ)",
        "Production ► Basic Data ► Bill of Material ► Item Data (Component Scrap)",
      ],
      tables: ["MARC", "STPO", "PLPO"],
      tcodes: ["OMDQ", "MM02", "MD04", "CS02"],
      fiori: ["F1422", "F1602A"],
      configHe: [
        "Reorder Point (MARC-MINBE): סף-מלאי ידני (VB) או אוטומטי (VM).",
        "Assembly Scrap (MARC-AUSSS): אחוז-פחת על המוצר כולו — מגדיל הזמנה ורכיבים.",
        "Component Scrap (MARC-KAUSF / BOM-AUSCH): פחת ברמת-רכיב בודד.",
        "Operation Scrap (Routing): פחת ברמת-פעולה, משפיע על כמויות במורד-המסלול.",
      ],
      flow: [
        { he: "מלאי-זמין מול Reorder Point", code: "MINBE" },
        { he: "ירידה מתחת לסף", code: "Reorder" },
        { he: "חישוב כמות + פחת", code: "AUSSS/KAUSF" },
        { he: "הצעת-חידוש מוגדלת-פחת", code: "PLAF/EBAN" },
      ],
      masterDataHe: [
        "MARC-MINBE = Reorder Point · MARC-AUSSS = Assembly Scrap %.",
        "MARC-KAUSF = Component Scrap % (ברירת-מחדל) · BOM-AUSCH = פחת-רכיב ספציפי.",
      ],
      mistakesHe: [
        "כפל-פחת: Assembly Scrap + Component Scrap לאותו אובדן.",
        "Reorder Point לא-מעודכן ➔ מחסור/עודף.",
        "פחת-פעולה כפול בכמה פעולות לאותו איבוד.",
      ],
      troubleshootHe: [
        "כמות-ייצור גבוהה מהצפוי ➔ פחת מצטבר (Assembly+Component+Operation).",
        "אין חידוש למרות מלאי-נמוך ➔ Reorder Point לא הוזן.",
        "דרישות-רכיבים מנופחות ➔ Component Scrap כפול או שגוי.",
      ],
      bestPracticeHe: [
        "בחר רמת-פחת אחת לכל סוג-אובדן — הימנע מכפילות.",
        "עדכן Reorder Point ופחת לפי נתוני-ביצוע אמיתיים.",
        "תעד את מקור-הפחת (מכלול/רכיב/פעולה) לבקרה.",
      ],
      interviewHe: [
        { qHe: "מהו ההבדל בין Assembly Scrap ל-Component Scrap?", aHe: "Assembly Scrap (AUSSS) הוא אחוז-פחת על המוצר כולו ומגדיל גם את כמות-הרכיבים; Component Scrap (KAUSF/AUSCH) הוא פחת על רכיב-בודד בלבד." },
        { qHe: "כיצד פועלת נקודת-הזמנה?", aHe: "ה-MRP משווה מלאי-זמין מול Reorder Point (MINBE); כשיורדים מתחת — נוצרת הצעת-חידוש." },
      ],
      takeawaysHe: [
        "נקודת-הזמנה = חידוש כשהמלאי יורד מתחת לסף (MINBE).",
        "פחת בשלוש רמות: Assembly / Component / Operation.",
        "הימנע מכפל-פחת — רמה אחת לכל אובדן.",
      ],
      relatedHe: [
        { labelHe: "PP · עץ-מוצר", href: "/library/pp/chapter-03/#sub-3.2" },
        { labelHe: "PP · סוג MRP — VB", href: "/library/pp/chapter-13/#sub-13.2" },
      ],
      children: [
        {
          id: "13.7.1", titleHe: "פחת-מכלול (Assembly Scrap)", titleEn: "Assembly Scrap",
          execHe: "Assembly Scrap (MARC-AUSSS) הוא אחוז-פחת צפוי על המוצר-המורכב כולו. ה-MRP מגדיל את כמות-הייצור-המתוכננת ואת כל דרישות-הרכיבים כדי שאחרי האובדן תיוותר הכמות-הנדרשת.",
          beginnerHe: "Assembly Scrap = 'חלק מהמוצרים ייצאו פגומים, אז תייצר יותר'. אם 5% נפסלים, צריך לתכנן 105 כדי לקבל 100 — וגם הרכיבים גדלים בהתאם.",
          consultantHe: "מוגדר באב-החומר (תצוגת MRP, AUSSS). משפיע על כמות-הפק\"ע ועל פיצוץ-הרכיבים (דרישות-תלויות גדלות פרופורציונלית). שונה מ-Component Scrap בכך שהוא חל על המכלול ולכן 'מתרגם' לכל הרכיבים, לא לרכיב-בודד.",
          purposeHe: "לפצות על אובדן-ייצור צפוי ברמת-המוצר, כך שתוכנית-האספקה תניב את הכמות-התקינה הנדרשת.",
          processExampleHe: "דרישה 1,000, Assembly Scrap 5% ➔ הזמנה-מתוכננת ל-1,053; כל רכיב ב-BOM מתוכנן גם הוא ל-1,053-שווה-ערך.",
          cbcHe: "ב-CBC משקה עם פסילת-QA צפויה של ~2% מקבל Assembly Scrap 2% — מתכננים מעט-יותר מילוי כדי לעמוד בהזמנות אחרי פסילות.",
          navHe: ["Logistics – General ► Material Master (MRP view, Assembly Scrap)"],
          tables: ["MARC"],
          tcodes: ["MM02", "MD04"],
          fiori: ["F1602A"],
          configHe: ["הזן Assembly Scrap % בתצוגת-MRP של אב-החומר (MARC-AUSSS)."],
          mistakesHe: ["שילוב Assembly + Component Scrap לאותו איבוד ➔ כפל.", "אחוז-פחת לא-מעודכן מול ביצוע-בפועל."],
          troubleshootHe: ["כמות-פק\"ע ורכיבים מנופחים ➔ Assembly Scrap גבוה מדי או כפול."],
          bestPracticeHe: ["השתמש ב-Assembly Scrap כשהאובדן הוא ברמת-המוצר.", "כייל לפי נתוני-פסילה אמיתיים."],
          interviewHe: [{ qHe: "על מה חל Assembly Scrap?", aHe: "על המכלול כולו (MARC-AUSSS) — מגדיל את כמות-הפק\"ע ואת כל דרישות-הרכיבים פרופורציונלית." }],
          takeawaysHe: ["Assembly Scrap = פחת ברמת-המוצר (AUSSS).", "מגדיל פק\"ע + כל הרכיבים.", "אל תכפול עם Component Scrap."],
        },
        {
          id: "13.7.2", titleHe: "פחת-רכיב (Component Scrap)", titleEn: "Component Scrap",
          execHe: "Component Scrap הוא אחוז-פחת על רכיב-בודד (MARC-KAUSF כברירת-מחדל, או BOM-AUSCH לרכיב-ספציפי). ה-MRP מגדיל את דרישת-הרכיב הזה בלבד כדי לפצות על אובדנו בייצור.",
          beginnerHe: "Component Scrap = 'רכיב מסוים מתבזבז יותר'. אם תוויות נקרעות ב-3%, מתכננים 3% יותר תוויות — בלי לגעת בשאר הרכיבים.",
          consultantHe: "ברירת-המחדל יושבת ב-MARC-KAUSF של הרכיב; ערך ספציפי ל-BOM יושב ב-STPO-AUSCH ודורס. חל רק על הרכיב הנדון, בניגוד ל-Assembly Scrap שחל על הכל. שילוב שניהם לאותו אובדן = כפל-פחת.",
          purposeHe: "לפצות על אובדן ספציפי-לרכיב (שבר/קרע/דליפה) בלי לנפח את כל ה-BOM.",
          processExampleHe: "דרישת-רכיב 1,000 תוויות, Component Scrap 3% ➔ דרישת-הרכיב = 1,031; שאר הרכיבים נשארים לפי הדרישה המקורית.",
          cbcHe: "ב-CBC בקבוקים/תוויות/פקקים מקבלים Component Scrap 1-2% — פחת-אריזה אופייני — בלי להגדיל את התרכיז שאינו מתבזבז.",
          navHe: ["Logistics – General ► Material Master (Component Scrap)", "Production ► Basic Data ► BOM ► Item Data (BOM-specific scrap)"],
          tables: ["MARC", "STPO"],
          tcodes: ["MM02", "CS02", "MD04"],
          fiori: ["F1602A", "F1813"],
          configHe: ["הזן Component Scrap % באב-החומר (MARC-KAUSF) או ספציפית בשורת-ה-BOM (STPO-AUSCH) לדריסה."],
          mistakesHe: ["Component + Assembly Scrap לאותו אובדן ➔ כפל.", "ערך-BOM סותר את ערך-האב בלי כוונה."],
          troubleshootHe: ["דרישת-רכיב מנופחת ➔ Component Scrap כפול (אב + BOM) או שגוי."],
          bestPracticeHe: ["העדף פחת-רכיב כשהאובדן ספציפי-לרכיב.", "הגדר ב-BOM כשהפחת תלוי-הקשר; באב כשהוא כללי."],
          interviewHe: [{ qHe: "היכן מגדירים Component Scrap?", aHe: "ברירת-מחדל ב-MARC-KAUSF של הרכיב; ערך-ספציפי ל-BOM ב-STPO-AUSCH שדורס את ברירת-המחדל." }],
          takeawaysHe: ["Component Scrap = פחת ברמת-רכיב-בודד.", "MARC-KAUSF (כללי) או STPO-AUSCH (BOM).", "חל רק על הרכיב, לא על הכל."],
        },
        {
          id: "13.7.3", titleHe: "פחת-פעולה ופחת-רכיב ב-BOM", titleEn: "Operations and Component Scrap in Bill of Materials",
          execHe: "תת-סעיף זה מבחין בין פחת-רכיב המוגדר ישירות בשורת-ה-BOM (STPO-AUSCH) לבין פחת-פעולה (Operation Scrap) המוזן ב-Routing ומשפיע על כמויות במורד-המסלול. שניהם משתלבים בחישוב-הכמויות של ה-MRP.",
          beginnerHe: "אפשר לרשום פחת בשני מקומות: בשורה של רכיב ב-BOM (כמה מהרכיב מתבזבז), ובפעולה ב-Routing (כמה מהמוצר נפסל בשלב-ייצור מסוים). שניהם מגדילים את הכמות-המתוכננת.",
          consultantHe: "Component Scrap ב-BOM (STPO-AUSCH) דורס את ה-KAUSF הכללי לרכיב הספציפי. Operation Scrap (Routing, שדה-פחת בפעולה) מקטין את הכמות הזורמת לפעולות הבאות, ומשפיע על דרישות-הרכיבים המוקצים לאותן פעולות. צריך לתאם בין שני המקומות כדי למנוע כפל.",
          purposeHe: "לאפשר מידול-פחת מדויק לפי המקום שבו הוא מתרחש — ברכיב מסוים או בשלב-ייצור מסוים — לחישוב-כמויות נאמן.",
          processExampleHe: "פעולה 2 בעלת Operation Scrap 4% ➔ הכמות הזורמת אליה ולרכיבים שצרכת בה מוגדלת ב-4%; רכיב עם STPO-AUSCH 2% מוגדל בנוסף ברמת-השורה.",
          cbcHe: "ב-CBC פעולת-מילוי עם פסילה-בשלב מקבלת Operation Scrap; אריזה הנצרכת באותה פעולה מתואמת אוטומטית — מידול נאמן של אובדן-קו.",
          navHe: ["Production ► Basic Data ► BOM ► Item Data (Component Scrap)", "Production ► Basic Data ► Routing (Operation Scrap)"],
          tables: ["STPO", "PLPO", "MARC"],
          tcodes: ["CS02", "CA02", "MD04"],
          fiori: ["F1813"],
          configHe: ["הזן Component Scrap בשורת-ה-BOM (STPO-AUSCH); הזן Operation Scrap בשדה-הפחת של הפעולה ב-Routing (PLPO)."],
          mistakesHe: ["כפל בין Operation Scrap לבין Assembly/Component Scrap.", "פחת-פעולה בכמה פעולות לאותו אובדן."],
          troubleshootHe: ["כמויות במורד-המסלול גדולות מדי ➔ Operation Scrap מצטבר.", "רכיב ספציפי מנופח ➔ STPO-AUSCH + KAUSF יחד."],
          bestPracticeHe: ["מדל את הפחת היכן שהוא קורה (רכיב מול פעולה).", "הימנע מכפילות בין רמות-הפחת השונות."],
          interviewHe: [
            { qHe: "מה ההבדל בין Operation Scrap לפחת-רכיב ב-BOM?", aHe: "Operation Scrap (Routing) חל על המוצר בשלב-פעולה ומשפיע במורד-המסלול; Component Scrap ב-BOM (STPO-AUSCH) חל על רכיב-בודד בלבד." },
          ],
          takeawaysHe: ["פחת-רכיב ב-BOM = STPO-AUSCH (דורס KAUSF).", "Operation Scrap ב-Routing משפיע במורד-המסלול.", "תאם בין הרמות למניעת כפל."],
        },
        {
          id: "13.7.4", titleHe: "פחת ב-Routing (Operation Scrap)", titleEn: "Scrap in Routing",
          execHe: "פחת-ה-Routing הוא ה-Operation Scrap ברמת-הפעולה: אחוז-אובדן צפוי בשלב-ייצור מסוים. הוא מקטין את התפוקה הזורמת לפעולות-המשך ומגדיל את כמויות-הקלט הדרושות, כולל רכיבים המוקצים לפעולה.",
          beginnerHe: "כל שלב-ייצור עלול לאבד חלק מהחומר. פחת-ה-Routing אומר לכל פעולה כמה צפוי להיאבד בה, כדי שהכמות שתיכנס לפעולה תהיה גדולה מספיק כדי שאחרי האובדן יישאר הדרוש.",
          consultantHe: "מוגדר בשדה-הפחת של הפעולה ב-Routing (PLPO). ה-MRP/הפק\"ע מחשבים את כמות-הקלט הנדרשת לכל פעולה אחורה מהתפוקה-הסופית, כשכל פעולה מוסיפה את אחוז-הפחת שלה. רכיבים המוקצים לפעולה גדלים בהתאם. צריך לוודא שלא חופף ל-Assembly/Component Scrap.",
          purposeHe: "למדל אובדן-ייצור תלוי-שלב במדויק — חשוב בתהליכים רב-שלביים שבהם הפחת מצטבר לאורך המסלול.",
          processExampleHe: "מסלול עם פעולות 1→2→3, פחת 2% בכל אחת ➔ כדי לקבל 1,000 בסוף, הקלט לפעולה 1 גדל למכפלת-הפחת המצטברת (~1,062).",
          cbcHe: "ב-CBC קו-מילוי רב-שלבי (שטיפה→מילוי→הגפה→תיוג) — פחת-פעולה בכל שלב מצטבר; ה-MRP מתכנן קלט מספיק כדי שבסוף-הקו תתקבל הכמות הנדרשת.",
          navHe: ["Production ► Basic Data ► Routing ► Operation Data (Operation Scrap)"],
          tables: ["PLPO", "PLKO", "MARC"],
          tcodes: ["CA02", "CA03", "MD04"],
          fiori: ["F1421"],
          configHe: ["הזן Operation Scrap % בשדה-הפחת של הפעולה ב-Routing (PLPO); וודא תיאום עם פחת-מכלול/רכיב."],
          mistakesHe: ["פחת-פעולה כפול לאותו אובדן.", "התעלמות מהצטברות-פחת לאורך מסלול ארוך."],
          troubleshootHe: ["כמויות-קלט מנופחות ➔ Operation Scrap גבוה/מצטבר.", "תפוקה-סופית נמוכה מהצפוי ➔ פחת-פעולה לא הוזן."],
          bestPracticeHe: ["הזן Operation Scrap היכן שהאובדן באמת קורה בשלב.", "ודא שאינו חופף ל-Assembly/Component Scrap."],
          interviewHe: [{ qHe: "כיצד Operation Scrap משפיע על כמויות?", aHe: "הוא מגדיל את כמות-הקלט הנדרשת לפעולה (ולרכיביה), מחושבת אחורה מהתפוקה-הסופית, ופחת מצטבר לאורך המסלול הרב-שלבי." }],
          takeawaysHe: ["פחת-Routing = Operation Scrap ברמת-פעולה (PLPO).", "מצטבר לאורך מסלול רב-שלבי.", "תאם עם פחת-מכלול/רכיב למניעת כפל."],
        },
      ],
    },
    // ============================================================ 13.8
    {
      id: "13.8", titleHe: "סוג MRP — VB ומלאי-בטחון", titleEn: "MRP Type VB",
      execHe:
        "תת-פרק זה מעמיק ב-VB (נקודת-הזמנה ידנית) ובנושא-הליבה המשלים אותו: מלאי-הבטחון (Safety Stock). מלאי-בטחון הוא חיץ מפני אי-ודאות בביקוש ובאספקה, ויש לו צורות שונות — סטטי, דינמי, זמן-בטחון ושיטות-MRP ייעודיות.",
      beginnerHe:
        "VB מזמין כשהמלאי יורד מתחת לקו. אבל מה אם דרישה גדולה מהצפוי או הספק מתעכב? בשביל זה יש מלאי-בטחון — 'רזרבה' שלא נוגעים בה בתכנון רגיל, כדי שלא ייגמר החומר בהפתעה.",
      consultantHe:
        "מלאי-הבטחון יכול להיות: Static (MARC-EISBE, כמות-קבועה), Dynamic (Range-of-coverage profile, תלוי-צריכה), או מומר ל-Safety Time (ימי-חיץ במקום כמות). ב-VB ה-Reorder Point לרוב כולל בתוכו מלאי-בטחון. הגדרת 'Safety Stock Availability' (אחוז-זמינות) קובעת כמה ממלאי-הבטחון זמין ל-MRP רגיל. שיטת-MRP ייעודית למלאי-בטחון משלימה את התמונה.",
      purposeHe:
        "להגן מפני אי-ודאות (תנודות-ביקוש, עיכובי-אספקה, פסילות) ולשמור על רמת-שירות נדרשת בלי לנפח מלאי שלא-לצורך.",
      processExampleHe:
        "VB עם Reorder Point 100 הכולל Safety Stock 40 ➔ בפועל החידוש מופעל כשנותרים 100, והרזרבה של 40 מגנה מפני עיכוב-אספקה או דרישה-חריגה עד שהחידוש מגיע.",
      cbcHe:
        "ב-CBC חומרי-עזר קריטיים-לקו (אך זולים) מקבלים מלאי-בטחון לכיסוי תנודות-אספקה — מילוי-קו לא נעצר בגלל איחור-משלוח של פריט-עזר.",
      navHe: [
        "Production ► MRP ► Master Data ► Check MRP Types (OMDQ)",
        "Production ► MRP ► Planning ► MRP Calculation ► Define Range of Coverage Profile (Dynamic Safety Stock)",
      ],
      tables: ["MARC", "T438A", "T438R"],
      tcodes: ["OMDQ", "MM02", "MD04", "OMIA"],
      fiori: ["F1422", "F1602A"],
      configHe: [
        "Static Safety Stock: MARC-EISBE — כמות-קבועה הנשמרת כרזרבה.",
        "Dynamic Safety Stock: Range-of-coverage profile (OMIA) — חיץ תלוי-צריכה-עתידית.",
        "Safety Time: ימי-חיץ (MARC-SHZET) במקום/בנוסף לכמות.",
        "Safety Stock Availability: אחוז ממלאי-הבטחון הזמין לתכנון-רגיל.",
      ],
      flow: [
        { he: "קביעת סוג מלאי-בטחון", code: "Static/Dynamic/Time" },
        { he: "הזנת ערך", code: "EISBE/Profile/SHZET" },
        { he: "הרצת-MRP מתחשבת בחיץ", code: "MD01N" },
        { he: "הצעות שומרות על הרזרבה", code: "MD04" },
      ],
      masterDataHe: [
        "MARC-EISBE = Static Safety Stock · MARC-SHZET = Safety Time (ימים).",
        "Range-of-coverage profile = Dynamic Safety Stock · Safety Stock Availability %.",
      ],
      mistakesHe: [
        "מלאי-בטחון גבוה מדי ➔ הון-חוזר כלוא ועודף.",
        "אפס מלאי-בטחון לחומר-תנודתי ➔ מחסורים-תכופים.",
        "ערבוב Safety Stock עם Safety Time בלי הבנת-ההשפעה.",
      ],
      troubleshootHe: [
        "מחסורים-תכופים ➔ מלאי-בטחון/זמן-בטחון נמוך מדי לתנודתיות.",
        "מלאי-עודף קבוע ➔ Safety Stock סטטי גבוה.",
        "MRP 'נוגע' במלאי-הבטחון ➔ Safety Stock Availability גבוה מדי.",
      ],
      bestPracticeHe: [
        "כייל מלאי-בטחון לרמת-השירות הנדרשת ולתנודתיות-האמיתית.",
        "השתמש ב-Dynamic Safety Stock לפריטים בעלי-צריכה משתנה.",
        "בחן תקופתית את החיץ מול רמת-שירות בפועל.",
      ],
      interviewHe: [
        { qHe: "מהן צורות מלאי-הבטחון ב-SAP?", aHe: "Static (EISBE, כמות-קבועה), Dynamic (Range-of-coverage profile, תלוי-צריכה), ו-Safety Time (ימי-חיץ, SHZET)." },
        { qHe: "מה תפקיד Safety Stock Availability?", aHe: "קובע איזה אחוז ממלאי-הבטחון נחשב זמין ל-MRP רגיל — כך אפשר 'להשאיל' חלק מהרזרבה לתכנון השוטף." },
      ],
      takeawaysHe: [
        "מלאי-בטחון = חיץ מפני אי-ודאות בביקוש/אספקה.",
        "צורות: Static / Dynamic / Safety Time.",
        "כייל לרמת-שירות; הימנע מעודף או מחסור.",
      ],
      relatedHe: [
        { labelHe: "PP · סוג MRP — VB", href: "/library/pp/chapter-13/#sub-13.2" },
        { labelHe: "אובייקט · MARC", href: "/library/pp/object/MARC/" },
      ],
      children: [
        {
          id: "13.8.1", titleHe: "מלאי-בטחון סטטי", titleEn: "Static Safety Stock",
          execHe: "מלאי-בטחון סטטי (MARC-EISBE) הוא כמות-רזרבה קבועה שאינה משתנה אוטומטית. ה-MRP שומר עליה ואינו מתכנן את צריכתה — היא חיץ מינימלי קבוע מפני אי-ודאות.",
          beginnerHe: "סטטי = 'רזרבה במספר-קבוע'. מזינים כמות (למשל 100 יח'), והיא תמיד נשמרת כקו-תחתון; ה-MRP מזמין כדי לא לרדת מתחתיה.",
          consultantHe: "EISBE הוא ערך-קבוע באב-החומר. ב-PD ה-MRP מוסיף אותו לחישוב-הנטו (מתכנן להישאר מעליו); ב-VB הוא לרוב חלק מה-Reorder Point. אינו מגיב לשינויי-צריכה — פשוט אך לא-אדפטיבי.",
          purposeHe: "לספק חיץ-מינימום קבוע ופשוט לחומרים בעלי-צריכה יציבה, בלי תחזוקה דינמית.",
          processExampleHe: "EISBE=100; דרישה מורידה את המלאי-המתוכנן ל-100 ➔ ה-MRP יוצר הצעה כדי לא לרדת מתחת לרזרבה.",
          cbcHe: "ב-CBC חומר-עזר יציב מקבל מלאי-בטחון סטטי קבוע — פשוט להגדרה ולתחזוקה.",
          navHe: ["Logistics – General ► Material Master (MRP view, Safety Stock)"],
          tables: ["MARC"],
          tcodes: ["MM02", "MD04"],
          fiori: ["F1602A"],
          configHe: ["הזן Static Safety Stock (MARC-EISBE) בתצוגת-MRP של אב-החומר."],
          mistakesHe: ["ערך-קבוע גבוה לחומר-תנודתי ➔ עודף/מחסור לסירוגין.", "אי-עדכון EISBE עם שינוי-צריכה."],
          troubleshootHe: ["מלאי-עודף קבוע ➔ EISBE גבוה.", "מחסור למרות רזרבה ➔ EISBE נמוך מהתנודתיות."],
          bestPracticeHe: ["השתמש בסטטי לצריכה-יציבה.", "עבור ל-Dynamic כשהצריכה משתנה."],
          interviewHe: [{ qHe: "מהו מלאי-בטחון סטטי?", aHe: "כמות-רזרבה קבועה (MARC-EISBE) שה-MRP שומר עליה ואינו מתכנן את צריכתה; אינה מגיבה לשינויי-צריכה." }],
          takeawaysHe: ["סטטי = כמות-רזרבה קבועה (EISBE).", "פשוט, לא-אדפטיבי.", "מתאים לצריכה-יציבה."],
        },
        {
          id: "13.8.2", titleHe: "זמינות מלאי-הבטחון", titleEn: "Safety Stock Availability",
          execHe: "Safety Stock Availability קובע איזה אחוז ממלאי-הבטחון נחשב זמין לתכנון-MRP רגיל. כך אפשר 'להשאיל' חלק מהרזרבה לכיסוי-דרישות במקום לשמור אותה כולה נעולה — איזון בין הגנה לבין הון-כלוא.",
          beginnerHe: "אפשר להגיד ל-MRP: 'מתוך הרזרבה, מותר לך להשתמש ב-X% לכיסוי דרישות לפני שתזמין'. זה מונע הזמנות-יתר ומשחרר חלק מהרזרבה לעבודה.",
          consultantHe: "מוגדר ב-Customizing (Plant/MRP-group). האחוז קובע כמה ממלאי-הבטחון נכלל כ-available בחישוב-הנטו. 0% = הרזרבה נעולה לחלוטין; 100% = כל הרזרבה זמינה (בפועל מבטל את אפקט-הבטחון בחישוב). ערך-ביניים מאפשר גמישות מבוקרת.",
          purposeHe: "לאזן בין הגנת-מלאי לבין יעילות-הון: לא לכלוא את כל הרזרבה אם חלקה יכול לשרת תכנון-שוטף.",
          processExampleHe: "Safety Stock 100, Availability 70% ➔ ה-MRP רואה 70 כזמינים לכיסוי-דרישות לפני יצירת-הצעה; 30 נשמרים כחיץ-קשיח.",
          cbcHe: "ב-CBC לפריטים עם רזרבה גדולה מגדירים Availability חלקי — חלק מהרזרבה משרת תנודות-יום-יום בלי לפתוח הזמנות מיותרות.",
          navHe: ["Production ► MRP ► Planning ► MRP Calculation ► Define Safety Stock Availability"],
          tables: ["T438M", "MARC"],
          tcodes: ["OMDQ", "OPPQ"],
          fiori: ["F1422"],
          configHe: ["הגדר Safety Stock Availability % ברמת-Plant/MRP-Group; קובע כמה מהרזרבה נכלל כ-available בחישוב-הנטו."],
          mistakesHe: ["100% ➔ ביטול בפועל של אפקט-הבטחון.", "0% גורף ➔ הון-כלוא מיותר."],
          troubleshootHe: ["מלאי-בטחון 'נצרך' בתכנון ➔ Availability גבוה מדי.", "הזמנות-יתר ➔ Availability נמוך מדי."],
          bestPracticeHe: ["כייל אחוז-זמינות לפי קריטיות-החומר ורמת-השירות."],
          interviewHe: [{ qHe: "מה עושה Safety Stock Availability?", aHe: "קובע איזה אחוז ממלאי-הבטחון נחשב זמין לתכנון-רגיל — מאזן בין הגנה לבין שחרור-הון." }],
          takeawaysHe: ["Availability = אחוז-רזרבה זמין לתכנון.", "מאזן הגנה מול הון-כלוא.", "מוגדר ברמת-Plant/MRP-Group."],
        },
        {
          id: "13.8.3", titleHe: "מלאי-בטחון דינמי עם פרופיל-טווח-כיסוי", titleEn: "Dynamic Safety Stock with Range of Coverage Profile",
          execHe: "מלאי-בטחון דינמי מחושב כטווח-כיסוי (ימי-צריכה) דרך Range-of-Coverage Profile (OMIA), ולא ככמות-קבועה. הוא גדל ויורד אוטומטית עם הצריכה-העתידית — חיץ אדפטיבי.",
          beginnerHe: "במקום 'תמיד 100 יח'', אומרים 'תמיד מספיק ל-5 ימי-צריכה'. כשהצריכה עולה, הרזרבה גדלה אוטומטית; כשיורדת — קטנה. תמיד פרופורציונלי לקצב-הצריכה.",
          consultantHe: "ה-Range-of-Coverage Profile (טבלת T438R, OMIA) מגדיר ימי-כיסוי מינימום/יעד/מקסימום ותקופת-ממוצע לחישוב הצריכה-היומית. ה-MRP מחשב את הרזרבה כמכפלת ימי-הכיסוי בצריכה-הממוצעת. משויך באב-החומר. אדפטיבי אך תלוי באיכות-נתוני-הצריכה.",
          purposeHe: "לתחזק חיץ פרופורציונלי לקצב-הצריכה לפריטים בעלי-ביקוש משתנה/עונתי — בלי לעדכן ידנית כמות-קבועה.",
          processExampleHe: "פרופיל 5 ימי-כיסוי, צריכה ממוצעת 20/יום ➔ מלאי-בטחון דינמי = 100; צריכה עולה ל-30/יום ➔ הרזרבה עולה אוטומטית ל-150.",
          cbcHe: "ב-CBC חומרי-עזר עונתיים מנוהלים עם פרופיל-טווח-כיסוי — הרזרבה גדלה לפני העונה ומצטמצמת אחריה, בלי התערבות ידנית.",
          navHe: ["Production ► MRP ► Planning ► MRP Calculation ► Define Range of Coverage Profile (Dynamic Safety Stock) (OMIA)"],
          tables: ["T438R", "MARC"],
          tcodes: ["OMIA", "MM02", "MD04"],
          fiori: ["F1422"],
          configHe: ["הגדר Range-of-Coverage Profile (OMIA): ימי-כיסוי מינ'/יעד/מקס' ותקופת-ממוצע-צריכה; שייך לאב-החומר."],
          mistakesHe: ["תקופת-ממוצע לא-מתאימה ➔ רזרבה תנודתית מדי.", "ימי-כיסוי גבוהים ➔ עודף-מלאי בעונת-שיא."],
          troubleshootHe: ["רזרבה לא-יציבה ➔ תקופת-ממוצע קצרה מדי.", "עודף/מחסור עונתי ➔ ימי-כיסוי לא-מכוילים."],
          bestPracticeHe: ["בחר תקופת-ממוצע מספקת להחלקת-תנודות.", "השתמש בדינמי לפריטים עונתיים/משתני-ביקוש."],
          interviewHe: [
            { qHe: "מה מבדיל מלאי-בטחון דינמי מסטטי?", aHe: "דינמי מחושב כימי-כיסוי × צריכה-ממוצעת (Range-of-Coverage Profile) ומשתנה אוטומטית עם הצריכה; סטטי הוא כמות-קבועה." },
          ],
          takeawaysHe: ["דינמי = ימי-כיסוי × צריכה-ממוצעת (OMIA).", "אדפטיבי לקצב-הצריכה.", "מתאים לפריטים עונתיים/משתנים."],
        },
        {
          id: "13.8.4", titleHe: "מלאי-בטחון וזמן-בטחון", titleEn: "Safety Stock and Safety Time",
          execHe: "זמן-בטחון (Safety Time, MARC-SHZET) הוא חיץ של ימי-קדימות: ה-MRP מקדים את האספקות במספר-ימים כדי שהחומר יגיע מוקדם-יותר מהנדרש — חיץ-זמן במקום (או בנוסף ל) חיץ-כמות.",
          beginnerHe: "במקום לשמור עוד יחידות, אפשר לשמור עוד זמן: 'תדאג שהחומר יגיע 3 ימים לפני שצריך אותו'. כך אם הספק מתעכב מעט, עדיין יש מרווח.",
          consultantHe: "Safety Time מוזן ב-MARC-SHZET (ימי-עבודה) עם Safety Time indicator. ה-MRP מתזמן את האספקות מוקדם בכמות-הימים, מה שמייצר חיץ-זמן. מתאים כשאי-הוודאות היא בעיקר במועד (עיכובי-אספקה) ולא בכמות. ניתן לשלב עם Safety Stock כמותי.",
          purposeHe: "להגן מפני אי-ודאות-במועד (עיכובי-אספקה/ייצור) על-ידי הקדמת-אספקות, במקום או בנוסף לחיץ-כמותי.",
          processExampleHe: "Safety Time 3 ימים, דרישה ב-15 בחודש ➔ ה-MRP מתזמן את האספקה ל-12 בחודש, כך שעיכוב של עד 3 ימים עדיין עומד בדרישה.",
          cbcHe: "ב-CBC חומר-גלם מספק לא-יציב-במועדים מקבל Safety Time — האספקות מוקדמות, וקווי-המילוי לא נעצרים בגלל איחור-משלוח.",
          navHe: ["Logistics – General ► Material Master (MRP view, Safety Time / Coverage)"],
          tables: ["MARC"],
          tcodes: ["MM02", "MD04"],
          fiori: ["F1602A"],
          configHe: ["הזן Safety Time (MARC-SHZET) בימי-עבודה והפעל Safety Time indicator; בחר אם חל על כל הדרישות או רק על עצמאיות."],
          mistakesHe: ["Safety Time + Safety Stock גדולים יחד ➔ עודף-מלאי כפול.", "Safety Time לחומר עם אי-ודאות-בכמות (לא-במועד)."],
          troubleshootHe: ["אספקות מוקדמות-מדי ➔ Safety Time גבוה.", "עדיין מחסורי-מועד ➔ Safety Time נמוך מהעיכוב-הטיפוסי."],
          bestPracticeHe: ["השתמש ב-Safety Time כשאי-הוודאות היא במועד; ב-Safety Stock כשהיא בכמות.", "כייל לפי שונות-זמן-האספקה בפועל."],
          interviewHe: [
            { qHe: "מתי עדיף Safety Time על Safety Stock?", aHe: "כשאי-הוודאות היא בעיקר במועד-האספקה (עיכובים) ולא בכמות-הביקוש — Safety Time מקדים אספקות ומספק חיץ-זמן." },
          ],
          takeawaysHe: ["Safety Time = חיץ-זמן (ימי-קדימות, SHZET).", "מגן מפני אי-ודאות-במועד.", "משלים את Safety Stock הכמותי."],
        },
        {
          id: "13.8.5", titleHe: "שיטת מלאי-בטחון של MRP", titleEn: "MRP Safety Stock Method",
          execHe: "שיטת מלאי-הבטחון של MRP (MRP-based Safety Stock) מחשבת מלאי-בטחון סטטיסטי לפי רמת-שירות-יעד, שונות-ביקוש ושונות-זמן-אספקה — חיץ מבוסס-נתונים ולא הערכה ידנית.",
          beginnerHe: "במקום לנחש את גודל-הרזרבה, נותנים למערכת לחשב אותה לפי 'כמה רוצים לא-להיגמר' (רמת-שירות) ולפי כמה הביקוש והאספקה תנודתיים. ככל שיותר תנודתי — יותר רזרבה.",
          consultantHe: "השיטה (MRP-based / statistical safety stock) משתמשת ברמת-שירות (Service level), בשונות-הביקוש ובשונות-זמן-האספקה לחישוב הרזרבה הסטטיסטית, לרוב דרך פרופיל ייעודי ונתוני-היסטוריה. ב-S/4HANA קיימות אפליקציות ופרמטרים לחישוב/אופטימיזציה אוטומטית של מלאי-הבטחון. מדויק יותר מהערכה-ידנית כשהנתונים איכותיים.",
          purposeHe: "לקבוע מלאי-בטחון מבוסס-נתונים העומד ברמת-שירות נדרשת בעלות-מלאי מינימלית — במקום אצבע-ניסיון.",
          processExampleHe: "רמת-שירות-יעד 98%, ביקוש תנודתי ואספקה לא-יציבה ➔ השיטה מחשבת רזרבה גבוהה-יחסית; פריט יציב באותה רמת-שירות מקבל רזרבה נמוכה.",
          cbcHe: "ב-CBC חומרי-מפתח מקבלים מלאי-בטחון מחושב-סטטיסטית לרמת-שירות גבוהה — איזון מיטבי בין סיכון-מחסור-לקו לעלות-החזקה.",
          navHe: ["Production ► MRP ► Planning ► MRP Calculation ► Safety Stock / Service Level settings"],
          tables: ["MARC", "T438R"],
          tcodes: ["OMIA", "MM02"],
          fiori: ["F1422"],
          configHe: ["הגדר פרמטרי-שיטה (Service level, אופק-חישוב) ושייך לחומר; השיטה מחשבת רזרבה מנתוני-ביקוש/אספקה."],
          mistakesHe: ["רמת-שירות גבוהה גורפת ➔ עלות-מלאי מנופחת.", "נתוני-היסטוריה רועשים ➔ חישוב לא-אמין."],
          troubleshootHe: ["רזרבה מחושבת חריגה ➔ שונות-נתונים גבוהה או רמת-שירות לא-ריאלית.", "חישוב לא-רץ ➔ פרמטרים/נתונים חסרים."],
          bestPracticeHe: ["הבחן רמת-שירות לפי קריטיות-החומר (לא אחידה).", "ודא נקיון-נתונים לפני חישוב סטטיסטי."],
          interviewHe: [
            { qHe: "על מה מבוססת שיטת מלאי-הבטחון של MRP?", aHe: "על רמת-שירות-יעד, שונות-ביקוש ושונות-זמן-אספקה — חישוב סטטיסטי במקום הערכה-ידנית." },
          ],
          takeawaysHe: ["שיטת-MRP = מלאי-בטחון סטטיסטי מבוסס-נתונים.", "תלוי רמת-שירות + שונות ביקוש/אספקה.", "מדויק כשהנתונים איכותיים."],
        },
      ],
    },
    // ============================================================ 13.9
    {
      id: "13.9", titleHe: "תכנון נקודת-הזמנה (סיכום ויישום)", titleEn: "Reorder Point Planning",
      execHe:
        "תת-פרק מסכם המאחד את תפיסת נקודת-ההזמנה: מתי לחדש (Reorder Point), כמה (גודל-אצווה), ואיך לשלב מלאי-בטחון. הוא מקשר את כל סוגי-ה-Reorder (VB/VM/V1/V2) לתמונת-יישום מעשית אחת ב-MD04.",
      beginnerHe:
        "כאן 'סוגרים מעגל' על נקודת-הזמנה: שלושה דברים שצריך — קו-מינימום (Reorder Point), רזרבה (Safety Stock), וגודל-הזמנה. כשהמלאי-הזמין יורד מתחת לקו, מזמינים את גודל-האצווה, והרזרבה מגנה בינתיים.",
      consultantHe:
        "המלאי-הזמין (Available stock) = מלאי-פיזי + אספקות-פתוחות. כשהוא יורד מתחת ל-MINBE, נוצרת הצעת-חידוש בגודל-האצווה (DISLS). ה-Reorder Point מורכב לרוב מ-(צריכה במהלך זמן-האספקה) + (מלאי-בטחון). ב-VM/V2 הוא מחושב מתחזית. הערכת-המצב נעשית ב-MD04, והאיזון בין Reorder Point, Lot Size ו-Safety Stock קובע את רמת-השירות מול עלות-המלאי.",
      purposeHe:
        "לספק שיטת-חידוש פשוטה, יציבה וצפויה לפריטים מבוססי-צריכה — עם הגנת-מלאי-בטחון — תוך מזעור מאמץ-תכנון פרטני.",
      processExampleHe:
        "Reorder Point 100 (=60 צריכה-בזמן-אספקה + 40 בטחון), Lot Size קבוע 500. מלאי-זמין יורד ל-95 ➔ הצעת-חידוש ל-500; המלאי מטפס ל-595, והרזרבה של 40 הגנה עד ההגעה.",
      cbcHe:
        "ב-CBC כל פריטי-העזר מבוססי-הצריכה מנוהלים כך: קו-מינימום, רזרבה וגודל-הזמנה קבוע — מנהל-המחסן רואה הכל ב-MD04 ומאשר הצעות-חידוש בלחיצה.",
      navHe: [
        "Production ► MRP ► Master Data ► Check MRP Types (OMDQ)",
        "Production ► MRP ► Evaluations ► Stock/Requirements List (MD04)",
      ],
      tables: ["MARC", "MDKP", "MDTB", "EBAN", "PLAF"],
      tcodes: ["OMDQ", "MM02", "MD04", "MD05"],
      fiori: ["F1422", "F2101", "F0247"],
      configHe: [
        "Reorder Point (MARC-MINBE) ידני (VB/V1) או אוטומטי-מתחזית (VM/V2).",
        "Lot Size (MARC-DISLS) קובע את כמות-החידוש.",
        "Safety Stock (MARC-EISBE) נכלל לרוב בתוך ה-Reorder Point.",
      ],
      flow: [
        { he: "חישוב מלאי-זמין", code: "Stock+Receipts" },
        { he: "השוואה ל-Reorder Point", code: "MINBE" },
        { he: "ירידה מתחת לסף", code: "Reorder" },
        { he: "הצעת-חידוש בגודל-אצווה", code: "DISLS" },
        { he: "הערכה ואישור", code: "MD04/MD05" },
      ],
      masterDataHe: [
        "MARC-MINBE = Reorder Point · MARC-DISLS = Lot Size · MARC-EISBE = Safety Stock.",
        "ב-VM/V2 ה-MINBE מחושב בהרצת-תחזית; ב-VB/V1 הוא ידני.",
      ],
      mistakesHe: [
        "Reorder Point ללא רכיב מלאי-בטחון ➔ מחסור בזמן-אספקה.",
        "גודל-אצווה לא תואם לצריכה ➔ חידוש-יתר/תכוף-מדי.",
        "אי-בחינת ה-MD04 ➔ הצעות-חידוש לא-מאושרות מצטברות.",
      ],
      troubleshootHe: [
        "מחסור חוזר ➔ Reorder Point נמוך מ-(צריכה-בזמן-אספקה + בטחון).",
        "מלאי-עודף ➔ Lot Size או Reorder Point גבוהים מדי.",
        "אין הצעת-חידוש ➔ מלאי-זמין עדיין מעל הסף או MINBE לא הוזן.",
      ],
      bestPracticeHe: [
        "חשב Reorder Point = צריכה-בזמן-אספקה + מלאי-בטחון.",
        "התאם Lot Size לקצב-הצריכה ולכפולות-אריזה.",
        "בחן את ההצעות ב-MD04/MD05 ואשר באופן שוטף.",
      ],
      interviewHe: [
        { qHe: "ממה מורכב Reorder Point טיפוסי?", aHe: "מצריכה-צפויה במהלך זמן-האספקה ועוד מלאי-בטחון; כשהמלאי-הזמין יורד מתחתיו, נוצרת הצעת-חידוש." },
        { qHe: "מהו 'מלאי-זמין' לצורך נקודת-הזמנה?", aHe: "מלאי-פיזי בתוספת אספקות-פתוחות (הזמנות-רכש/הזמנות-מתוכננות) — ה-MRP משווה אותו ל-Reorder Point." },
        { qHe: "היכן מעריכים את תוצאת התכנון?", aHe: "ב-MD04 (Stock/Requirements List — דינמי, עדכני) ו-MD05 (MRP List — תצלום-מצב מההרצה האחרונה)." },
      ],
      takeawaysHe: [
        "נקודת-הזמנה = חידוש כשהמלאי-זמין יורד מתחת ל-MINBE.",
        "Reorder Point = צריכה-בזמן-אספקה + מלאי-בטחון.",
        "אזן Reorder Point/Lot Size/Safety Stock; בחן ב-MD04/MD05.",
      ],
      relatedHe: [
        { labelHe: "PP · סוג MRP — VB", href: "/library/pp/chapter-13/#sub-13.2" },
        { labelHe: "PP · סקירת תהליך ה-MRP", href: "/library/pp/chapter-13/#sub-13.1" },
        { labelHe: "אובייקט · MDKP", href: "/library/pp/object/MDKP/" },
      ],
    },
  ],
};
