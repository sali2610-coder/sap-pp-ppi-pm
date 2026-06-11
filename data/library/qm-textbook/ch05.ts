// ===== QM Digital Textbook — Chapter 5 (gold-standard learning chapter) =====
// Integrating QM with Production Planning (PP / PP-PI).
// Every node (subchapter + nested source sub-heading) is a complete
// LearningNode with 18 facets of authored Hebrew — enough to study the topic
// without the original book. Source hierarchy preserved (ids + order, nested).
// Transformative Hebrew; SAP identifiers verbatim EN. CBC = Coca-Cola bottling
// in-process QM on filling lines (inspection type 03 during the production order).
import type { TextbookChapter } from "./types";

export const CH5: TextbookChapter = {
  n: 5,
  titleHe: "שילוב עם תכנון ייצור (PP)",
  titleEn: "Integrating with Production Planning",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה על שילוב מודול ניהול-האיכות (QM) עם תכנון-הייצור (PP / PP-PI). הליבה היא בקרת-איכות תוך-תהליכית (In-Process) — סוג-בדיקה 03 הנוצר אוטומטית עם פתיחת/שחרור פק\"ע, מאפשר רישום-תוצאות (Results Recording) ואישור-איכות במהלך הייצור עצמו. כל תת-פרק וכל תת-סעיף מהספר המקורי הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC על קווי-המילוי, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי-קונפיגורציה, תרשים-תהליך, טעויות-נפוצות, פתרון-תקלות, שיטות-מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: ללמוד את הנושא ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 5.1
    {
      id: "5.1", titleHe: "יסודות הקונפיגורציה", titleEn: "Configuration Basics",
      execHe:
        "כדי שבדיקת-איכות תיווצר אוטומטית בתוך פק\"ע (Production/Process Order), צריך לחבר ארבעה רכיבי-קונפיגורציה: צירוף סוג-חומר↔רשימת-משימות, פרמטרי-מפעל תלויי-סוג-הזמנה, פרמטרי-דיווח (Confirmation), ומפתח-בקרה (Control Key). ביחד הם קובעים האם פעולה כוללת בדיקה, איזה סוג-בדיקה נוצר, וכיצד הדיווח ברצפה (CO11N) מקושר לרישום-התוצאות. שגיאה כאן = הפק\"ע נפתחת בלי מנת-בדיקה (Inspection Lot) ובקרת-האיכות 'נעלמת' מהתהליך.",
      beginnerHe:
        "תאר מפעל שבו כל הזמנת-ייצור צריכה לעבור בדיקות-איכות. כדי ש-SAP 'ידע' לפתוח בדיקה לבד, צריך להגדיר לו ארבעה כללים: (1) אילו סוגי-מוצר ואילו מסלולי-ייצור הולכים יחד, (2) הגדרות-מפעל לכל סוג-הזמנה, (3) איך נרשם הדיווח על ביצוע-העבודה, (4) דגל ברמת-הפעולה שאומר 'כאן עושים בדיקה'. אחרי שמגדירים את הארבעה — הבדיקה צצה לבד עם פתיחת ההזמנה.",
      consultantHe:
        "הקישור נשען על: צירוף Material Type↔Task List Type (OPLB) הקובע אילו רשימות-משימות מותרות לחומר; Order-Type-Dependent Plant Parameters (OPL8) שמכילים בין היתר את הגדרות-בקרת-האיכות לסוג-ההזמנה; פרמטרי-Confirmation (OPK4) השולטים בהתנהגות-הדיווח ובהפעלת רישום-תוצאות ב-CO11N; ומפתח-בקרה (OP00 / רמת-פעולה) הנושא את האינדיקטור 'QM in Routing'. ה-Inspection Type 03 (In-Process) משויך דרך נתוני-הבדיקה באב-החומר (MM01 › Quality Management) ונוצר כ-Inspection Lot (טבלת QALS) ברגע השחרור. ה-Routing/Master Recipe נושא את מאפייני-הבדיקה (PLMK) המתקבלים מתוכנית-בדיקה או ממאפיינים-כלליים (QPMK).",
      purposeHe:
        "המטרה: לשלב את בקרת-האיכות בזרימת-הייצור באופן אוטומטי ועקבי, בלי תהליך-בדיקה ידני-מנותק. זה מבטיח שכל מנה מיוצרת נבדקת לפי תקן, שהתוצאות נרשמות ליד הדיווח על הייצור, ושאישור-האיכות (Usage Decision) חוסם/משחרר מלאי לפי התוצאה.",
      processExampleHe:
        "מתכנן ממיר הזמנה-מתוכננת לפק\"ע. בשחרור (Release) המערכת בודקת את נתוני-הבדיקה באב-החומר, מזהה Inspection Type 03 פעיל, ויוצרת Inspection Lot מסוג 03 הקשור ל-AUFNR. מאפייני-הבדיקה (PLMK) מועתקים מהתוכנית. ברצפה העובד מדווח פעולה ב-CO11N ורושם תוצאות; בסיום נקבע Usage Decision שמשחרר את הכמות למלאי-חופשי.",
      cbcHe:
        "ב-CBC על קו-מילוי: עם שחרור פק\"ע למשקה נוצרת אוטומטית מנת-בדיקה 03. בודק-קו רושם ב-CO11N/QA32 ערכי Brix, CO2, pH ונפח-מילוי בכל פעולה. כשל בערך קריטי חוסם את ה-Usage Decision ומונע שחרור-אצווה — מנגנון שמבטיח שלא תצא לשוק אצווה מחוץ-לתקן.",
      navHe: [
        "Production ► Shop Floor Control ► Master Data ► Order ► Define Order-Type-Dependent Plant Parameters (OPL8)",
        "Production ► Shop Floor Control ► Operations ► Confirmation ► Define Confirmation Parameters (OPK4)",
        "Quality Management ► Quality Inspection ► Inspection Lot Creation ► Inspection for Goods Movements / Production Orders",
      ],
      tables: ["QALS", "QMAT", "PLMK", "AFKO", "TQ30", "T399X"],
      tcodes: ["OPL8", "OPK4", "OPLB", "OP00", "CO01", "QA32"],
      fiori: ["F2200", "F3069", "F0978"],
      configHe: [
        "Material Type ↔ Task List combination (OPLB): קובע אילו סוגי רשימות-משימות מותרים לכל סוג-חומר — תנאי-סף לקיום Routing/Master Recipe לחומר.",
        "Order-Type-Dependent Plant Parameters (OPL8): פרמטרי-מפעל לכל סוג-הזמנה, כולל הגדרות-בקרת-איכות והתנהגות-שחרור.",
        "Confirmation Parameters (OPK4): התנהגות-הדיווח ב-CO11N, כולל הפעלת רישום-תוצאות-QM בעת דיווח.",
        "Control Key (OP00): אינדיקטור 'QM in Routing/Recipe' ברמת-פעולה — מסמן אילו פעולות נושאות בדיקה.",
      ],
      flow: [
        { he: "צירוף סוג-חומר↔רשימת-משימות", code: "OPLB", note: "תנאי-סף ל-Routing" },
        { he: "פרמטרי-מפעל לסוג-הזמנה", code: "OPL8", note: "הגדרות QM" },
        { he: "פרמטרי-דיווח", code: "OPK4", note: "רישום-תוצאות ב-CO11N" },
        { he: "מפתח-בקרה לפעולה", code: "Control Key", note: "QM in Routing" },
        { he: "שחרור פק\"ע ➔ Inspection Lot 03", code: "QALS" },
      ],
      masterDataHe: [
        "QMAT = נתוני-בדיקה באב-החומר לכל Inspection Type (מקושר MARC).",
        "QALS = כותרת מנת-הבדיקה; AFKO = כותרת הזמנת-ייצור; הקישור דרך AUFNR.",
        "PLMK = מאפייני-בדיקה ברשימת-המשימות / מתכון-האב.",
      ],
      mistakesHe: [
        "הגדרת סוג-הזמנה ללא פרמטרי-מפעל (OPL8) למפעל ➔ הפק\"ע אינה נפתחת או נפתחת בלי בקרת-איכות.",
        "שכחת אינדיקטור 'QM in Routing' במפתח-הבקרה ➔ אין מאפייני-בדיקה לפעולה.",
        "Inspection Type 03 לא פעיל באב-החומר ➔ אין Inspection Lot בשחרור.",
        "פרמטרי-Confirmation לא מאפשרים רישום-תוצאות ➔ ה-CO11N מדווח ייצור אך לא איכות.",
      ],
      troubleshootHe: [
        "פק\"ע שוחררה אך לא נוצרה מנת-בדיקה ➔ בדוק Inspection Type 03 באב-החומר ופרמטרי-מפעל (OPL8).",
        "אין מאפייני-בדיקה בפעולה ➔ Control Key ללא 'QM in Routing' או רשימת-משימות ללא PLMK.",
        "CO11N לא מציע רישום-תוצאות ➔ OPK4 ללא הפעלת רישום-תוצאות-QM.",
        "רשימת-משימות לא נמצאת לחומר ➔ צירוף סוג-חומר↔רשימת-משימות חסר (OPLB).",
      ],
      bestPracticeHe: [
        "הגדר את ארבעת רכיבי-הקונפיגורציה כחבילה אחת לכל סוג-הזמנה/מפעל לפני בדיקות-קבלה.",
        "תקנן Inspection Type 03 לכל המוצרים-המיוצרים — עקביות מקטינה שגיאות.",
        "תעד את צירופי סוג-חומר↔רשימת-משימות; הם נשכחים בהרחבה למפעלים חדשים.",
        "בדוק את שרשרת השחרור מקצה-לקצה ב-Sandbox: המרה ➔ שחרור ➔ Inspection Lot ➔ CO11N ➔ Usage Decision.",
      ],
      interviewHe: [
        { qHe: "אילו ארבעה רכיבי-קונפיגורציה נדרשים לבדיקה תוך-תהליכית אוטומטית?", aHe: "צירוף סוג-חומר↔רשימת-משימות (OPLB), פרמטרי-מפעל תלויי-סוג-הזמנה (OPL8), פרמטרי-Confirmation (OPK4), ומפתח-בקרה עם 'QM in Routing'." },
        { qHe: "מתי נוצרת מנת-בדיקה 03?", aHe: "ברגע שחרור הפק\"ע, אם Inspection Type 03 פעיל בנתוני-הבדיקה באב-החומר." },
        { qHe: "מה מקשר את ה-Inspection Lot להזמנה?", aHe: "שדה AUFNR — QALS מצביעה על AFKO; כך התוצאות והדיווח מתלכדים." },
      ],
      takeawaysHe: [
        "ארבעה רכיבים מחברים QM ל-PP: צירוף-חומר/רשימה, פרמטרי-מפעל, פרמטרי-דיווח, מפתח-בקרה.",
        "Inspection Type 03 = בקרה תוך-תהליכית; נוצר בשחרור-הפק\"ע.",
        "QALS↔AFKO דרך AUFNR; PLMK נושאת מאפייני-בדיקה.",
        "בדוק את שרשרת-השחרור מקצה-לקצה לפני Go-Live.",
      ],
      relatedHe: [
        { labelHe: "PP · הגדרת ייצור בדיד (פרק 3)", href: "/library/pp/chapter-03/" },
        { labelHe: "אובייקט · QALS", href: "/library/pp/object/QALS/" },
      ],
      children: [
        {
          id: "5.1.1", titleHe: "צירוף סוג-חומר / רשימת-משימות", titleEn: "Material Type / Task List Combination",
          execHe: "הגדרה הקובעת אילו סוגי רשימות-משימות (Routing, Master Recipe, Rate Routing) מותרים לכל Material Type. זהו תנאי-הסף שמאפשר ליצור מסלול-ייצור לחומר — ובלעדיו אין נשא ל-PLMK ולכן אין בדיקה תוך-תהליכית.",
          beginnerHe: "לא לכל סוג-מוצר מותר להחזיק כל סוג מסלול-ייצור. הכלל אומר, למשל, ש-FERT (מוגמר) יכול להחזיק Routing או Master Recipe, אבל ROH (חומר-גלם) לא. בלי ההרשאה הזו אי-אפשר ליצור את המסלול שעליו 'תולים' את הבדיקות.",
          consultantHe: "ב-OPLB משייכים Material Type ל-Task List Type המותר (N=Routing, 2=Master Recipe, R=Rate Routing). הקישור נבדק ביצירת רשימת-המשימות (CA01/C201). בלי צירוף תקין מתקבלת שגיאה, ואז אין PLPO/PLMK לחומר — כלומר אין פעולות ואין מאפייני-בדיקה לבקרה תוך-תהליכית.",
          purposeHe: "להבטיח היגיון-נתונים: רק חומרים מיוצרים מקבלים מסלול-ייצור, ורק מסוגי-המסלול ההגיוניים לענף (בדיד מול תהליכי).",
          processExampleHe: "ניסיון ליצור Master Recipe (C201) למשקה FERT עובד רק אם צירוף FERT↔Recipe מותר; אחרת המערכת חוסמת ולא ניתן להגדיר פעולות-בדיקה.",
          cbcHe: "ב-CBC: FERT/HALB של משקאות מורשים ל-Master Recipe (תעשייה תהליכית); כך ניתן לבנות מתכון-אב עם פעולות-מילוי הנושאות בדיקות 03.",
          navHe: ["Production ► Basic Data ► Routing / Master Recipe ► Control Data ► Define Material Type / Task List Combinations (OPLB)"],
          tables: ["T415T", "MARA", "PLKO"],
          tcodes: ["OPLB", "CA01", "C201"],
          fiori: ["F1421"],
          configHe: ["ב-OPLB שייך לכל Material Type את סוגי רשימות-המשימות המותרים (Routing / Rate Routing / Master Recipe)."],
          mistakesHe: ["אי-הגדרת הצירוף למפעל/חומר חדש ➔ לא ניתן ליצור Routing/Recipe.", "התרת סוג-מסלול לא-מתאים לענף ➔ בלבול בין בדיד לתהליכי."],
          troubleshootHe: ["'Task list type not allowed for material type' ➔ הוסף את הצירוף ב-OPLB.", "אין פעולות/PLMK לחומר ➔ ככל הנראה לא נוצרה רשימת-משימות עקב צירוף חסר."],
          bestPracticeHe: ["הגדר צירופים סטנדרטיים מוקדם במימוש.", "התאם את סוג-המסלול לענף — Master Recipe לתהליכי, Routing לבדיד."],
          interviewHe: [
            { qHe: "מה קובע צירוף סוג-חומר↔רשימת-משימות?", aHe: "אילו סוגי רשימות-משימות מותרים לכל Material Type — תנאי-סף ליצירת המסלול הנושא את הבדיקות." },
            { qHe: "מדוע למשקה משתמשים ב-Master Recipe ולא ב-Routing?", aHe: "כי משקאות הם ייצור תהליכי (PP-PI); ה-Master Recipe תומך בשלבים, מרכיבים ופעולות-בדיקה תהליכיות." },
          ],
          takeawaysHe: ["הצירוף = הרשאה ליצירת מסלול-ייצור לחומר.", "תנאי-סף לקיום PLMK ובדיקה תוך-תהליכית.", "Master Recipe לתהליכי, Routing לבדיד."],
          relatedHe: [{ labelHe: "אובייקט · PLKO", href: "/library/pp/object/PLKO/" }],
        },
        {
          id: "5.1.2", titleHe: "פרמטרי-מפעל תלויי-סוג-הזמנה", titleEn: "Order Type-Dependent Plant Parameters",
          execHe: "הגדרות-מפעל המוגדרות לכל צירוף סוג-הזמנה×מפעל, ובהן בין היתר התנהגות-השחרור, ניהול-הסטטוס וחלק מהגדרות-בקרת-האיכות. הן תנאי-סף לפתיחת פק\"ע ולהפעלת מנגנוני ה-QM שמתלווים לשחרור.",
          beginnerHe: "כל סוג-הזמנה (למשל הזמנת-ייצור רגילה) צריך 'דף-הגדרות' לכל מפעל. אם הדף הזה חסר, המערכת בכלל לא יודעת איך לפתוח את ההזמנה במפעל — וגם לא איך לקשר אליה בקרת-איכות.",
          consultantHe: "ב-OPL8 מגדירים לכל Order Type×Plant: Number Ranges, Costing/Scheduling/Availability check, ויישום בקרת-האיכות. ערכים אלה משפיעים על יצירת Inspection Lot בעת השחרור. חסר רשומת-OPL8 = הודעת-שגיאה ביצירת/שחרור הפק\"ע, ולכן גם אין מנת-בדיקה 03.",
          purposeHe: "להתאים את התנהגות-הפק\"ע (כולל ה-QM) לכל סוג-הזמנה ולכל מפעל בנפרד — גמישות-קונפיגורציה לפי תהליך עסקי.",
          processExampleHe: "בשחרור פק\"ע מסוג PI01 במפעל 1000, פרמטרי-OPL8 קובעים שהשחרור מפעיל בדיקת-זמינות ויוצר Inspection Lot; באותה הזמנה במפעל אחר ייתכן שההתנהגות שונה.",
          cbcHe: "ב-CBC כל מפעל-בקבוק מקבל רשומת-OPL8 לסוג-הזמנת-המילוי, כך שהשחרור על הקו פותח אוטומטית בדיקה 03 בהתאם לתקני-המפעל המקומי.",
          navHe: ["Production ► Shop Floor Control ► Master Data ► Order ► Define Order-Type-Dependent Plant Parameters (OPL8)", "Production Planning for Process Industries ► Process Order ► Master Data ► Order ► Define Order-Type-Dependent Parameters (COR4)"],
          tables: ["T399X", "T001W", "AUFK"],
          tcodes: ["OPL8", "COR4", "CO01"],
          fiori: ["F2200"],
          configHe: ["ב-OPL8 (ייצור בדיד) / COR4 (תהליכי) הגדר לכל Order Type×Plant: Number Ranges, Cost/Scheduling/Availability, והגדרות בקרת-איכות הרלוונטיות לשחרור."],
          mistakesHe: ["חוסר רשומת-OPL8 למפעל חדש ➔ לא ניתן ליצור/לשחרר פק\"ע.", "פרמטרי-זמינות/עלות שגויים ➔ שחרור נחסם ולכן אין Inspection Lot."],
          troubleshootHe: ["'No order-type-dependent parameters maintained' ➔ צור רשומה ב-OPL8/COR4.", "פק\"ע לא נפתחת במפעל מסוים ➔ פרמטרי-מפעל חסרים לאותו Order Type."],
          bestPracticeHe: ["שכפל רשומת-OPL8 קיימת בהרחבה למפעל חדש כדי לא לשכוח שדות.", "תאם את פרמטרי-השחרור עם תהליך-יצירת ה-Inspection Lot של ה-QM."],
          interviewHe: [
            { qHe: "מה תפקיד פרמטרי-מפעל תלויי-סוג-הזמנה?", aHe: "להגדיר לכל Order Type×Plant את התנהגות הפק\"ע — Number Ranges, בדיקות, ושחרור — תנאי-סף לפתיחתה וליצירת מנת-בדיקה." },
            { qHe: "מה ההבדל בין OPL8 ל-COR4?", aHe: "OPL8 לייצור בדיד (Production Order), COR4 לייצור תהליכי (Process Order); אותו רעיון, מודולים שונים." },
          ],
          takeawaysHe: ["רשומת-מפעל לכל Order Type היא תנאי-סף לפק\"ע.", "OPL8 = בדיד, COR4 = תהליכי.", "הגדרות-השחרור משפיעות על יצירת מנת-הבדיקה."],
        },
        {
          id: "5.1.3", titleHe: "פרמטרי-דיווח (Confirmation)", titleEn: "Confirmation Parameters",
          execHe: "פרמטרי ה-Confirmation שולטים כיצד מתבצע דיווח-הביצוע ברצפה (CO11N): אילו שדות מוצגים, אם מתבצע Backflush, אם נוצרת תנועת-טובין, והאם תוך כדי הדיווח נפתח גם רישום-תוצאות-QM. הם הגשר התפעולי בין דיווח-הייצור לבקרת-האיכות.",
          beginnerHe: "כשעובד מסיים פעולה הוא 'מדווח' עליה. פרמטרי ה-Confirmation קובעים מה קורה ברגע הדיווח — כמה אוטומציה, אילו שדות, והאם המערכת תבקש ממנו גם לרשום תוצאות-בדיקה. כך הדיווח על העבודה והדיווח על האיכות מתבצעים יחד.",
          consultantHe: "ב-OPK4 מגדירים את התנהגות ה-Confirmation לכל סוג-הזמנה/מפעל: Confirmation type, בדיקות (תאריך/כמות/חריגות), טיפול בשגיאות (Termination/Log), ו-Goods movement. כשמופעל קישור ל-QM, דיווח הפעולה ב-CO11N פותח את מסך רישום-התוצאות עבור מאפייני-הבדיקה (PLMK) של אותה פעולה. ב-PP-PI הדיווח לרוב דרך COR6N/Process Messages.",
          purposeHe: "לאחד את דיווח-הייצור עם רישום-התוצאות, כך שבודק-הקו מזין נתוני-איכות באותו הקשר שבו הוא מדווח על ביצוע-הפעולה — פחות חיכוך, יותר עקביות.",
          processExampleHe: "עובד מדווח פעולת-מילוי ב-CO11N. בזכות פרמטרי-OPK4, נפתח מיד מסך רישום-תוצאות עבור Brix ו-CO2 של אותה פעולה; הערכים נשמרים תחת ה-Inspection Lot 03.",
          cbcHe: "ב-CBC הקונפיגורציה מקשרת CO11N לרישום-תוצאות-QM: בכל דיווח-פעולה על הקו הבודק נדרש להזין נפח-מילוי ולחץ-CO2, וכך אין דיווח-ייצור 'עיוור' בלי נתוני-איכות.",
          navHe: ["Production ► Shop Floor Control ► Operations ► Confirmation ► Define Confirmation Parameters (OPK4)", "Production Planning for Process Industries ► Process Order ► Operations ► Confirmation ► Define Confirmation Parameters"],
          tables: ["AFRU", "T399X", "QALS"],
          tcodes: ["OPK4", "CO11N", "COR6N"],
          fiori: ["F3069", "F0978"],
          configHe: ["ב-OPK4 הגדר לכל Order Type×Plant: Confirmation type, בדיקות (Date/Quantity/Underdelivery/Overdelivery), טיפול-בשגיאות, Goods movement, וקישור לרישום-תוצאות-QM."],
          mistakesHe: ["אי-הפעלת קישור רישום-תוצאות ➔ CO11N מדווח ייצור בלי איכות.", "Termination על כל חריגה ➔ עצירת-דיווח מתסכלת לבודקי-הקו.", "Backflush מופעל בלי כיסוי-מלאי ➔ שגיאות COGI חוזרות."],
          troubleshootHe: ["מסך רישום-תוצאות לא נפתח ב-CO11N ➔ OPK4 ללא קישור-QM, או הפעולה ללא 'QM in Routing'.", "דיווח נכשל על חריגת-כמות ➔ פרמטרי-בדיקה ב-OPK4 מוגדרים כ-Termination."],
          bestPracticeHe: ["הפעל קישור רישום-תוצאות בפעולות-המפתח בלבד כדי לא להעמיס.", "העדף Log על Termination לחריגות-זניחות ברצפה.", "תאם Backflush עם ניהול-המלאי כדי למנוע COGI."],
          interviewHe: [
            { qHe: "מה שולטים פרמטרי ה-Confirmation?", aHe: "התנהגות הדיווח ב-CO11N — שדות, בדיקות, Backflush, תנועות-טובין, וקישור לרישום-תוצאות-QM." },
            { qHe: "כיצד הדיווח מתחבר לבקרת-האיכות?", aHe: "כשמופעל קישור-QM ב-OPK4, דיווח הפעולה פותח רישום-תוצאות עבור מאפייני-הבדיקה (PLMK) תחת ה-Inspection Lot." },
          ],
          takeawaysHe: ["OPK4 = התנהגות הדיווח ב-CO11N.", "ניתן לקשר דיווח-ייצור לרישום-תוצאות-QM.", "AFRU מאחסנת את הדיווחים; QALS את הבדיקה."],
          relatedHe: [{ labelHe: "אובייקט · AFRU", href: "/library/pp/object/AFRU/" }],
        },
        {
          id: "5.1.4", titleHe: "מפתח-בקרה (Control Key)", titleEn: "Control Key",
          execHe: "מפתח-הבקרה מוגדר ברמת-הפעולה ב-Routing/Master Recipe וקובע אילו פונקציות הפעולה מבצעת: תזמון, חישוב-קיבולת, דיווח, רכש-חיצוני — וקריטית לפרק זה: אינדיקטור 'QM in Routing' המסמן שהפעולה נושאת מאפייני-בדיקה תוך-תהליכיים.",
          beginnerHe: "כל פעולה ב-מסלול-הייצור מקבלת 'מפתח' שמסביר ל-SAP מה לעשות איתה. בין השאר המפתח אומר 'הפעולה הזו כוללת בדיקת-איכות'. בלי הדגל הזה הפעולה תתבצע — אבל בלי שום בדיקה.",
          consultantHe: "ב-OP00 מגדירים Control Keys עם אינדיקטורים: Scheduling, Capacity, Confirmation (חובה/אופציונלי/לא), Costing, External processing, Print, ו-'QM in Routing/Recipe'. הדגל ה-QM הוא התנאי שמאפשר לשייך מאפייני-בדיקה (PLMK) לפעולה. בעת שחרור, מאפיינים אלה הופכים לפריטי-בדיקה תחת ה-Inspection Lot 03. ערכי-תקן: PP01 דיווח-חובה, PP02 דיווח-אוטומטי, וכו'.",
          purposeHe: "לשלוט במדויק אילו פעולות נכללות בתזמון, בקיבולת, בעלות, בדיווח — ובאילו פעולות מתבצעת בדיקת-איכות תוך-תהליכית.",
          processExampleHe: "פעולת-מילוי נושאת Control Key עם 'QM in Routing'. בעת השחרור, מאפייני-הבדיקה (Brix, CO2) המוגדרים לפעולה הופכים לפריטי-בדיקה ב-QALS, ובודק-הקו רושם עליהם תוצאות ב-CO11N/QA32.",
          cbcHe: "ב-CBC פעולות-המילוי וה-Capping נושאות Control Key עם דגל-QM, ולכן כל אחת מהן יוצרת פריטי-בדיקה (נפח, אטימות-פקק); פעולות-לוגיסטיקה (העברה למחסן) נושאות Control Key ללא QM.",
          navHe: ["Production ► Basic Data ► Routing ► Operation Data ► Define Control Key (OP00)", "Production Planning for Process Industries ► Master Recipe ► Operation/Phase ► Define Control Key"],
          tables: ["PLPO", "PLMK", "T430"],
          tcodes: ["OP00", "CA02", "C202"],
          fiori: ["F1421"],
          configHe: ["ב-OP00 הגדר Control Key עם אינדיקטורים: Scheduling, Capacity, Confirmation (1/2/3), Costing, External processing, Print, ו-'QM in Routing/Recipe'."],
          mistakesHe: ["Control Key ללא 'QM in Routing' לפעולת-בדיקה ➔ אין מאפייני-בדיקה תחת ה-Inspection Lot.", "Confirmation שגוי (חובה במקום אופציונלי) ➔ הזמנה לא נסגרת בלי דיווח."],
          troubleshootHe: ["מאפייני-בדיקה לא מופיעים בפעולה ➔ Control Key ללא דגל-QM.", "פעולה לא מתוזמנת/לא בעלות ➔ אינדיקטורי Scheduling/Costing כבויים במפתח."],
          bestPracticeHe: ["תקנן ערכת Control Keys קטנה וברורה (עם/בלי QM, עם/בלי דיווח).", "שמור דגל-QM רק לפעולות שבהן באמת מתבצעת בדיקה.", "תעד את משמעות כל מפתח לצוות-הרצפה."],
          interviewHe: [
            { qHe: "מה קובע מפתח-הבקרה?", aHe: "אילו פונקציות פעולה מבצעת — תזמון, קיבולת, דיווח, עלות, רכש-חיצוני, ו-'QM in Routing' שמפעיל בדיקה תוך-תהליכית." },
            { qHe: "מה תפקיד אינדיקטור 'QM in Routing'?", aHe: "הוא מאפשר לשייך מאפייני-בדיקה (PLMK) לפעולה; בשחרור הם הופכים לפריטי-בדיקה ב-Inspection Lot 03." },
          ],
          takeawaysHe: ["Control Key = הגדרות-תפקוד ברמת-פעולה.", "דגל 'QM in Routing' מפעיל בדיקה תוך-תהליכית.", "מוגדר ב-OP00; שמור ערכים מעטים וברורים."],
          relatedHe: [{ labelHe: "אובייקט · PLPO", href: "/library/pp/object/PLPO/" }],
        },
      ],
    },
    // ============================================================ 5.2
    {
      id: "5.2", titleHe: "נתוני-אב", titleEn: "Master Data",
      execHe:
        "השילוב בין QM ל-PP נשען על נתוני-אב משותפים: אב-החומר (נתוני-בדיקה לכל Inspection Type), רשימת-המשימות / מתכון-האב (נושאי-PLMK), ותוכניות-הבדיקה. ב-PP-PI מתכון-האב (Master Recipe) הוא הנשא המרכזי לפעולות-הבדיקה. הבנה של 'מי מחזיק מה' היא המפתח לאינטגרציה תקינה.",
      beginnerHe:
        "כדי שבדיקה תרוץ בתוך הייצור צריך שכמה רשומות-אב 'ידברו': אב-החומר אומר 'לחומר הזה יש בדיקה 03'; רשימת-המשימות/המתכון אומרת 'בפעולה הזו בודקים את X ו-Y'; ותוכנית-הבדיקה מגדירה את המאפיינים עצמם. כשכולן מסונכרנות, הבדיקה צצה אוטומטית עם פתיחת ההזמנה.",
      consultantHe:
        "אב-החומר (MM01 › QM view) מאחסן נתוני-בדיקה ב-QMAT (לכל Inspection Type, למשל 03/04) — האם פעיל, אם נדרשת Usage Decision, פרמטרי דגימה. רשימת-המשימות/מתכון-האב (PLKO/PLPO) נושאים פעולות עם מאפייני-בדיקה (PLMK), המקושרים ל-Master Inspection Characteristics (QPMK) ולשיטות (QPMT). בעת שחרור, המנגנון יוצר Inspection Lot (QALS) ומעתיק את ה-PLMK לפריטי-בדיקה. תיאום בין השכבות מונע 'מנה ללא מאפיינים' או 'מאפיינים ללא בדיקה'.",
      purposeHe:
        "להבטיח שנתוני-האב מספקים שרשרת-מידע שלמה: מהחומר (יש בדיקה?) דרך הפעולה (מה בודקים?) ועד למאפיין (איך מודדים ומה הסף?). זה הבסיס לאוטומציה אמינה של בקרת-האיכות בייצור.",
      processExampleHe:
        "מהנדס-איכות מגדיר Master Inspection Characteristics (QS21) ל-Brix ו-CO2, משייך אותם לפעולות במתכון-האב (C202), ומפעיל Inspection Type 03 באב-החומר (MM02). מעתה כל פק\"ע למוצר זה תיצור בדיקה עם מאפיינים אלה.",
      cbcHe:
        "ב-CBC נתוני-האב לקו-מילוי: אב-החומר של המשקה עם Inspection Type 03 פעיל; מתכון-האב עם פעולות-מילוי הנושאות מאפייני Brix/CO2/pH/נפח; ותוכנית-דגימה המגדירה כמה בקבוקים לדגום לשעה.",
      navHe: [
        "Quality Management ► Quality Planning ► Inspection Planning ► General ► Define Identifier for Inspection Types",
        "Quality Management ► Quality Planning ► Basic Data ► Inspection Characteristic / Inspection Method",
        "Logistics ► Materials Management ► Material Master ► Maintain (MM01) ► Quality Management view",
      ],
      tables: ["QMAT", "QPMK", "QPMT", "PLMK", "PLKO", "PLPO", "QALS"],
      tcodes: ["MM01", "MM02", "QS21", "QS31", "QP01", "C201", "QA32"],
      fiori: ["F2200", "F1421"],
      configHe: [
        "Inspection Type (TQ30): הגדרת 03 (In-Process) ו-04 (Goods Receipt from Production) והקצאתם לחומר דרך ה-QM view.",
        "Master Inspection Characteristics (QS21): מאפיינים כלליים לשימוש-חוזר בתוכניות/מתכונים.",
        "Inspection Methods (QS31): שיטות-מדידה משויכות למאפיינים.",
        "Sampling Procedure (QDP1): קביעת-גודל-מדגם למאפייני-הבדיקה.",
      ],
      flow: [
        { he: "מאפיין-בדיקה כללי", code: "QS21", note: "QPMK" },
        { he: "שיטת-בדיקה", code: "QS31", note: "QPMT" },
        { he: "שיוך לפעולה במתכון", code: "C202", note: "PLMK" },
        { he: "הפעלת Inspection Type 03", code: "MM02", note: "QMAT" },
        { he: "שחרור פק\"ע ➔ פריטי-בדיקה", code: "QALS" },
      ],
      masterDataHe: [
        "QMAT = נתוני-בדיקה באב-החומר לכל Inspection Type.",
        "QPMK/QPMT = מאפיינים ושיטות-אב; PLMK = מאפיינים ברשימת-המשימות/מתכון.",
        "PLKO/PLPO = כותרת ופעולות רשימת-המשימות / מתכון-האב.",
      ],
      mistakesHe: [
        "הגדרת מאפיינים בפעולה בלי הפעלת Inspection Type באב-החומר ➔ אין בדיקה.",
        "Inspection Type פעיל בלי מאפיינים בפעולה ➔ מנה ריקה ללא פריטי-בדיקה.",
        "שינוי מאפיין-אב בלי החלת-שינוי בתוכניות הקיימות ➔ חוסר-עקביות.",
      ],
      troubleshootHe: [
        "מנת-בדיקה נוצרת בלי מאפיינים ➔ הפעולות במתכון ללא PLMK או Control Key ללא QM.",
        "בדיקה לא נוצרת כלל ➔ Inspection Type 03 לא פעיל ב-QMAT.",
        "מאפיין לא מתעדכן ➔ השינוי לא הוחל על התוכנית/מתכון הקיימים.",
      ],
      bestPracticeHe: [
        "השתמש ב-Master Inspection Characteristics (QS21) לשימוש-חוזר במקום מאפיינים חד-פעמיים.",
        "סנכרן את הפעלת Inspection Type עם קיום מאפיינים בפעולה — תמיד יחד.",
        "נהל שינויי-מאפיינים בתהליך מבוקר עם החלה על כל התוכניות הרלוונטיות.",
      ],
      interviewHe: [
        { qHe: "אילו שכבות נתוני-אב נדרשות לבדיקה תוך-תהליכית?", aHe: "אב-החומר (Inspection Type פעיל ב-QMAT), רשימת-המשימות/מתכון-האב (פעולות עם PLMK), ומאפייני/שיטות-אב (QPMK/QPMT)." },
        { qHe: "מהו ההבדל בין QPMK ל-PLMK?", aHe: "QPMK = מאפיין-אב כללי לשימוש-חוזר; PLMK = מאפיין כפי שהוא משויך בפועל לפעולה ברשימת-משימות/מתכון." },
      ],
      takeawaysHe: [
        "האינטגרציה נשענת על שרשרת: חומר ➔ פעולה ➔ מאפיין.",
        "QMAT באב-החומר מפעיל את הבדיקה; PLMK בפעולה מגדיר מה בודקים.",
        "Master Inspection Characteristics (QS21) לשימוש-חוזר.",
      ],
      relatedHe: [
        { labelHe: "אובייקט · QMAT", href: "/library/pp/object/QMAT/" },
        { labelHe: "אובייקט · PLMK", href: "/library/pp/object/PLMK/" },
      ],
      children: [
        {
          id: "5.2.1", titleHe: "נתוני-אב של PP ושל QM", titleEn: "PP and QM Master Data",
          execHe: "סקירת חלוקת-העבודה בין נתוני-אב של PP (אב-חומר, BOM, מרכז-עבודה, רשימת-משימות) לבין נתוני-אב של QM (מאפייני-בדיקה, שיטות, תוכניות-בדיקה, קוד-קבוצות). השילוב מתרחש כאשר רשומות ה-QM 'נתלות' על רשומות ה-PP — בעיקר דרך מאפייני-בדיקה בפעולות.",
          beginnerHe: "ב-PP יש את 'איך מייצרים' (מסלול, רכיבים, מכונות). ב-QM יש את 'איך בודקים' (מה מודדים, באיזו שיטה, מה הסף). הקסם קורה כשמחברים: כל פעולת-ייצור יכולה לשאת רשימת-מאפיינים-לבדיקה מתוך נתוני-ה-QM.",
          consultantHe: "נתוני-אב PP: MARA/MARC, STKO/STPO (BOM), CRHD (Work Center), PLKO/PLPO (Routing). נתוני-אב QM: QPMK (מאפיין), QPMT (שיטה), QPAC (קוד-קבוצה), Plan (QP01) / מאפיינים בפעולות (PLMK). השילוב: ב-S/4HANA לרוב משלבים את מאפייני-הבדיקה ישירות ב-Routing/Master Recipe (QM in Routing) במקום תוכנית-בדיקה נפרדת — חוסך תחזוקה-כפולה ומסנכרן את הבדיקה עם הייצור.",
          purposeHe: "לתחזק מקור-אמת אחד לכל היבט: PP אחראי לזרימת-הייצור, QM למאפייני-הבדיקה, והשילוב מבטיח שהבדיקה תמיד תואמת את הפעולה הנכונה.",
          processExampleHe: "מהנדס-QM יוצר QPMK ל-pH; מתכנן-PP משייך אותו כ-PLMK לפעולת-המילוי במתכון. כך אותו מאפיין-אב משמש בעקביות בכל המתכונים.",
          cbcHe: "ב-CBC: PP מתחזק את מתכון-המשקה וקווי-המילוי; QM מתחזק את מאפייני Brix/CO2/pH ושיטות-המדידה; השילוב משייך אותם לפעולות-המילוי כך שהבדיקה רצה בתוך הפק\"ע.",
          navHe: ["Quality Management ► Quality Planning ► Basic Data ► Inspection Characteristic (QS21)", "Production ► Basic Data ► Routing ► QM in Routing"],
          tables: ["QPMK", "QPMT", "QPAC", "PLMK", "PLPO", "MARC"],
          tcodes: ["QS21", "QS31", "QS41", "CA02", "C202"],
          fiori: ["F1421"],
          configHe: ["הגדר Master Inspection Characteristics (QS21), Methods (QS31) ו-Code Groups (QS41); שייך אותם כ-PLMK לפעולות ב-Routing/Master Recipe (QM in Routing)."],
          mistakesHe: ["שכפול מאפיינים חד-פעמיים במקום שימוש ב-QPMK ➔ תחזוקה-כפולה.", "ניתוק בין מאפייני-QM לפעולות-PP ➔ בדיקות לא רצות."],
          troubleshootHe: ["מאפיין לא זמין במתכון ➔ לא הוגדר כ-QPMK או לא שויך כ-PLMK.", "שינוי-שיטה לא משתקף ➔ ה-QPMT לא הוחל על המאפיינים המשויכים."],
          bestPracticeHe: ["העדף QM-in-Routing על תוכנית-בדיקה נפרדת ב-S/4HANA.", "השתמש במאפייני/שיטות-אב לשימוש-חוזר.", "הגדר בעלות ברורה: QM למאפיינים, PP לזרימה."],
          interviewHe: [
            { qHe: "כיצד משולבים נתוני-QM בנתוני-PP ב-S/4HANA?", aHe: "לרוב דרך QM-in-Routing — מאפייני-בדיקה (PLMK) משובצים ישירות בפעולות ה-Routing/Master Recipe במקום תוכנית-בדיקה נפרדת." },
            { qHe: "מה היתרון בשימוש ב-Master Inspection Characteristics?", aHe: "שימוש-חוזר ועקביות — שינוי במקור-אחד מתפשט לכל הפעולות המשתמשות בו." },
          ],
          takeawaysHe: ["PP = זרימת-ייצור; QM = מאפייני-בדיקה.", "השילוב דרך PLMK בפעולות (QM-in-Routing).", "מאפייני-אב לשימוש-חוזר ועקביות."],
          relatedHe: [{ labelHe: "אובייקט · QPMK", href: "/library/pp/object/QPMK/" }],
        },
        {
          id: "5.2.2", titleHe: "נתוני-QM במתכון-האב", titleEn: "QM Data in Master Recipe",
          execHe: "במתכון-האב (Master Recipe) של PP-PI ניתן לשבץ מאפייני-בדיקה ברמת-הפעולה/השלב (Phase), כך שבקרת-האיכות הופכת לחלק אינטגרלי מהמתכון התהליכי. זהו המנגנון המרכזי של QM תוך-תהליכי בתעשייה התהליכית.",
          beginnerHe: "במתכון של מוצר תהליכי (כמו משקה) יש שלבים: ערבוב, מילוי, סגירה. לכל שלב אפשר לצרף 'מה לבדוק'. כך הבדיקה לא מנותקת — היא יושבת בדיוק בשלב שבו צריך למדוד.",
          consultantHe: "ב-C201/C202 מוסיפים מאפייני-בדיקה (PLMK) לפעולות/שלבים של מתכון-האב; הם מקושרים ל-QPMK/QPMT ולתוכניות-דגימה. ה-Control Key של הפעולה חייב לשאת 'QM in Recipe'. בעת שחרור פק\"ע-תהליכית (COR1), נוצר Inspection Lot 03 (QALS) ומאפייני המתכון הופכים לפריטי-בדיקה. הדיווח ב-COR6N/CO11N עם רישום-תוצאות ב-QA32 משלים את המעגל.",
          purposeHe: "לאחד את ההגדרה התהליכית והבקרה האיכותית בנשא-אב אחד — פחות סנכרון בין מסמכים, התאמה מדויקת בין שלב-ייצור לבדיקה.",
          processExampleHe: "מתכון-משקה: שלב-ערבוב נושא מאפיין Brix; שלב-מילוי נושא נפח ו-CO2. בשחרור פק\"ע נוצרים פריטי-בדיקה בדיוק בשלבים אלה; הבודק רושם תוצאות תוך כדי דיווח-הפעולה.",
          cbcHe: "ב-CBC מתכון-המשקה משבץ Brix בשלב-העירוב, ו-CO2 + נפח-מילוי + אטימות-פקק בשלב-המילוי/הסגירה; כל שחרור-פק\"ע מייצר בדיקה 03 התואמת בדיוק את שלבי-הקו.",
          navHe: ["Production Planning for Process Industries ► Master Recipe ► Create / Change Master Recipe (C201 / C202)", "PP-PI ► Master Recipe ► Operation/Phase ► Inspection Characteristics (QM in Recipe)"],
          tables: ["PLKO", "PLPO", "PLMK", "PLFH", "QALS"],
          tcodes: ["C201", "C202", "C203", "COR1", "QA32"],
          fiori: ["F1421", "F2200"],
          configHe: ["במתכון-האב (C201/C202) הוסף מאפייני-בדיקה (PLMK) לפעולות/שלבים; ודא Control Key עם 'QM in Recipe'; שייך תוכנית-דגימה ומאפייני-אב (QPMK)."],
          mistakesHe: ["שיבוץ מאפיין בשלב הלא-נכון ➔ בדיקה בנקודת-תהליך שגויה.", "Control Key ללא 'QM in Recipe' ➔ המאפיינים לא הופכים לפריטי-בדיקה.", "אי-שיוך תוכנית-דגימה ➔ גודל-מדגם לא מחושב."],
          troubleshootHe: ["פריטי-בדיקה לא נוצרים מהמתכון ➔ Control Key ללא QM או PLMK חסר בפעולה.", "בדיקה בשלב לא-נכון ➔ המאפיין שובץ בפעולה/Phase שגויה.", "אין רישום-תוצאות ב-QA32 ➔ ה-Inspection Lot לא נוצר עקב Inspection Type לא-פעיל."],
          bestPracticeHe: ["שבץ כל מאפיין בשלב המדויק שבו הוא נמדד.", "השתמש ב-QM-in-Recipe במקום תוכנית-בדיקה נפרדת לסנכרון-מלא.", "הרץ Consistency Check אחרי שינוי-מתכון."],
          interviewHe: [
            { qHe: "כיצד משלבים בקרת-איכות במתכון-האב?", aHe: "מוסיפים מאפייני-בדיקה (PLMK) לפעולות/שלבים ומסמנים 'QM in Recipe' ב-Control Key; בשחרור הם הופכים לפריטי-בדיקה תחת Inspection Lot 03." },
            { qHe: "מה תפקיד ה-Phase במתכון מבחינת QM?", aHe: "ה-Phase היא יחידת-העבודה הביצועית; שיבוץ מאפיין בשלב הנכון ממקם את הבדיקה בנקודת-התהליך המדויקת שבה היא נדרשת." },
          ],
          takeawaysHe: ["מתכון-האב הוא הנשא של QM תוך-תהליכי ב-PP-PI.", "PLMK בשלבים + Control Key 'QM in Recipe' = פריטי-בדיקה בשחרור.", "QA32 לרישום-תוצאות; QALS לכותרת-הבדיקה."],
          relatedHe: [{ labelHe: "אובייקט · PLMK", href: "/library/pp/object/PLMK/" }],
        },
      ],
    },
    // ============================================================ 5.3
    {
      id: "5.3", titleHe: "תהליכים עסקיים בתכנון-ייצור", titleEn: "Business Processes in Production Planning",
      execHe:
        "פרק זה מציג כיצד בקרת-האיכות התוך-תהליכית (Inspection Type 03) משתלבת בשלושת אופני-הייצור: ייצור-תהליכי (Process, PP-PI), ייצור-בדיד (Discrete) וייצור-חוזר (Repetitive). בכל אחד נשמרת אותה ליבה — בדיקה הנוצרת עם הפק\"ע/הרשומה ורישום-תוצאות ליד הדיווח — אך נקודת-ההפעלה והדיווח שונות.",
      beginnerHe:
        "יש כמה דרכים לייצר מוצר: לפי מתכון תהליכי (משקאות, כימיה), לפי הזמנה-בדידה (מכונות, מכלולים), או בקצב-חוזר (קו רץ ברצף). בקרת-האיכות חייבת להשתלב בכל אחת. הרעיון זהה — בדיקה אוטומטית עם הייצור — אבל ה'איפה' וה'איך' משתנים בין השיטות.",
      consultantHe:
        "Process/Discrete: Inspection Lot 03 נוצר בשחרור פק\"ע (COR1/CO01) וקשור ל-AFKO דרך AUFNR; הדיווח ב-COR6N/CO11N. Repetitive: אין הזמנה בדידה — הבדיקה מתקשרת ל-Run Schedule / Product Cost Collector, ולעיתים מופעלת בקבלת-מוצר (Inspection Type 04) או דרך נקודות-דיווח. בכל המקרים QALS היא הכותרת ו-Usage Decision (QA11) חוסם/משחרר מלאי. ההבדל המהותי: ב-Repetitive ה-Backflush המסיבי מחייב תכנון-בדיקה לפי מדגם/תדירות ולא לכל הזמנה.",
      purposeHe:
        "להתאים את מנגנון-הבדיקה לאופי-הייצור, כך שבקרת-האיכות נשארת אוטומטית ועקבית בין אם מייצרים אצווה תהליכית, מכלול בדיד, או זרם-ייצור חוזר.",
      processExampleHe:
        "ייצור-תהליכי: שחרור פק\"ע-משקה ➔ בדיקה 03 ➔ דיווח ב-COR6N עם תוצאות ➔ Usage Decision משחרר אצווה. ייצור-חוזר: דיווח-Backflush על קו רץ ➔ בדיקת-מדגם תקופתית ➔ Usage Decision לכמות-תקופה.",
      cbcHe:
        "ב-CBC קו-מילוי במהירות-גבוהה הוא מקרה-גבול בין Process ל-Repetitive: הבדיקה 03 מופעלת עם הפק\"ע התהליכית, אך הדגימה היא תקופתית (כל X בקבוקים/שעה) — מה שמשקף את אופי הזרם-החוזר של הקו.",
      navHe: [
        "Production Planning for Process Industries ► Process Order ► Process Management",
        "Production ► Shop Floor Control ► Operations ► Confirmation",
        "Production ► Repetitive Manufacturing ► Control Data",
      ],
      tables: ["QALS", "AFKO", "AFRU", "QAMR", "QAVE"],
      tcodes: ["COR1", "CO01", "MFBF", "CO11N", "QA32", "QA11"],
      fiori: ["F2200", "F3069", "F0978"],
      configHe: [
        "Process/Discrete: Inspection Type 03 פעיל; שחרור-פק\"ע יוצר Inspection Lot.",
        "Repetitive: הגדרת בקרת-איכות לקו/חומר; דגימה לפי תדירות/מדגם, לרוב Inspection Type 04 בקבלה.",
        "Usage Decision (QA11): קוד-החלטה החוסם/משחרר מלאי; קוד-קבוצות לקבלה/דחייה.",
      ],
      flow: [
        { he: "שחרור פק\"ע / רישום-קצב", code: "COR1/MFBF", note: "יצירת בדיקה" },
        { he: "Inspection Lot 03", code: "QALS" },
        { he: "דיווח + רישום-תוצאות", code: "CO11N/QA32", note: "QAMR" },
        { he: "Usage Decision", code: "QA11", note: "QAVE" },
        { he: "שחרור/חסימת מלאי", code: "Stock posting" },
      ],
      masterDataHe: [
        "QALS = כותרת-בדיקה; QAMR = תוצאות-מדידה; QAVE = החלטת-שימוש.",
        "AFKO/AFRU = כותרת ודיווחי-הזמנה; הקישור דרך AUFNR.",
      ],
      mistakesHe: [
        "החלת מנגנון בדיד על Repetitive ➔ ניסיון-בדיקה לכל יחידה במקום לפי מדגם.",
        "אי-קישור בקרת-איכות לקו ב-Repetitive ➔ אין בדיקה כלל.",
        "שכחת Usage Decision ➔ מלאי 'תקוע' בסטטוס-מוגבל.",
      ],
      troubleshootHe: [
        "אין בדיקה ב-Repetitive ➔ בקרת-איכות לא הוגדרה לחומר/קו או Inspection Type לא פעיל.",
        "מלאי לא משתחרר ➔ Usage Decision לא נקבע (QA11).",
        "בדיקה לכל יחידה במקום מדגם ➔ תוכנית-דגימה לא מוגדרת.",
      ],
      bestPracticeHe: [
        "התאם את שיטת-ההפעלה לאופי-הייצור (פק\"ע מול קצב-חוזר).",
        "ב-Repetitive תכנן דגימה לפי תדירות/כמות ולא לכל יחידה.",
        "אכוף Usage Decision כתנאי לשחרור-מלאי, במיוחד במזון.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בהפעלת בדיקה בין Discrete ל-Repetitive?", aHe: "ב-Discrete/Process הבדיקה נוצרת בשחרור-פק\"ע; ב-Repetitive אין פק\"ע בדידה — הבדיקה לפי מדגם/תדירות, לעיתים בקבלה (Inspection Type 04)." },
        { qHe: "מה תפקיד ה-Usage Decision בכל אופני-הייצור?", aHe: "לקבוע קבלה/דחייה ולחסום/לשחרר מלאי — נקודת-הסיום של הבדיקה (QA11, טבלת QAVE)." },
      ],
      takeawaysHe: [
        "אותה ליבה (בדיקה 03 + רישום-תוצאות + Usage Decision) בכל אופני-הייצור.",
        "נקודת-ההפעלה משתנה: שחרור-פק\"ע מול קצב-חוזר.",
        "QALS/QAMR/QAVE הן שלוש שכבות הבדיקה.",
      ],
      relatedHe: [
        { labelHe: "PP · הגדרת ייצור בדיד (פרק 3)", href: "/library/pp/chapter-03/" },
        { labelHe: "אובייקט · QAVE", href: "/library/pp/object/QAVE/" },
      ],
      children: [
        {
          id: "5.3.1", titleHe: "ייצור תהליכי ובדיד", titleEn: "Process & Discrete Manufacturing",
          execHe: "בייצור-תהליכי (Process Order, PP-PI) ובייצור-בדיד (Production Order) מנגנון בקרת-האיכות זהה במהותו: Inspection Lot 03 נוצר בשחרור-ההזמנה, מאפייני המתכון/מסלול הופכים לפריטי-בדיקה, והדיווח ברצפה (COR6N/CO11N) מלווה ברישום-תוצאות.",
          beginnerHe: "בין אם מייצרים משקה (תהליכי) או מכלול (בדיד), הסיפור זהה: פותחים הזמנה, משחררים אותה, ואז נפתחת בדיקה אוטומטית. העובד מדווח על הביצוע ורושם את התוצאות, ובסוף מישהו מאשר אם המנה תקינה.",
          consultantHe: "Process: COR1 ליצירה, COR6N/CO11N לדיווח, Process Messages אפשריות. Discrete: CO01 ליצירה, CO11N/CO15 לדיווח. בשני המקרים, בעת Release נוצר Inspection Lot 03 ב-QALS הקשור ל-AFKO דרך AUFNR; ה-PLMK מהמתכון/מסלול מועתק ל-QAPP (פריטי-בדיקה). תוצאות ב-QAMR; Usage Decision ב-QA11 (QAVE) חוסם/משחרר. ההבדל הוא בעיקר מודולרי (PP-PI מול PP) ולא מהותי לבקרה.",
          purposeHe: "להבטיח בקרת-איכות תוך-תהליכית עקבית בשני אופני-הייצור הנפוצים, עם נקודת-בדיקה אחת ברורה: שחרור-ההזמנה.",
          processExampleHe: "Discrete: שחרור פק\"ע למכלול ➔ בדיקה 03 על פעולת-הרכבה ➔ CO11N עם רישום-מימדים ➔ Usage Decision. Process: שחרור פק\"ע-משקה ➔ בדיקה 03 על שלב-מילוי ➔ COR6N עם Brix/CO2 ➔ Usage Decision.",
          cbcHe: "ב-CBC הייצור-התהליכי שולט: שחרור פק\"ע-מילוי פותח בדיקה 03; הבודק רושם ב-CO11N/QA32 ערכי Brix, CO2, pH ונפח; כשל קריטי חוסם את ה-Usage Decision ומונע שחרור-אצווה לשוק.",
          navHe: ["Production Planning for Process Industries ► Process Order ► Create / Release (COR1)", "Production ► Shop Floor Control ► Order ► Create / Release (CO01)", "Quality Management ► Quality Inspection ► Results Recording (QA32)"],
          tables: ["QALS", "QAPP", "QAMR", "AFKO", "AFRU"],
          tcodes: ["COR1", "CO01", "COR6N", "CO11N", "QA32", "QA11"],
          fiori: ["F2200", "F3069"],
          configHe: ["ודא Inspection Type 03 פעיל באב-החומר; שחרור-הזמנה (COR1/CO01) מפעיל יצירת Inspection Lot; קשר רישום-תוצאות לדיווח דרך OPK4."],
          flow: [
            { he: "יצירה + שחרור הזמנה", code: "COR1/CO01", note: "Release" },
            { he: "יצירת Inspection Lot 03", code: "QALS", note: "AUFNR" },
            { he: "דיווח-פעולה", code: "COR6N/CO11N", note: "AFRU" },
            { he: "רישום-תוצאות", code: "QA32", note: "QAMR" },
            { he: "Usage Decision", code: "QA11", note: "שחרור-מלאי" },
          ],
          masterDataHe: ["QALS = כותרת-בדיקה; QAPP = פריטי-בדיקה; QAMR = ערכי-מדידה.", "AFKO/AFRU = כותרת ודיווחי-הזמנה; קישור דרך AUFNR."],
          mistakesHe: ["שחרור בלי Inspection Type 03 פעיל ➔ אין בדיקה.", "דיווח-ייצור בלי רישום-תוצאות ➔ פערי-איכות לא מתועדים.", "שכחת Usage Decision ➔ מלאי בסטטוס-מוגבל."],
          troubleshootHe: ["אין Inspection Lot אחרי שחרור ➔ QMAT ללא 03 או פרמטרי-מפעל חסרים.", "אין פריטי-בדיקה ➔ Control Key ללא QM או PLMK חסר.", "מלאי לא משתחרר ➔ Usage Decision לא נקבע (QA11)."],
          bestPracticeHe: ["אכוף רישום-תוצאות לפני סגירת-הזמנה.", "השתמש ב-Usage Decision כשער-מלאי, במיוחד למזון.", "תקנן את שרשרת שחרור➔בדיקה➔דיווח➔החלטה בין כל המוצרים."],
          interviewHe: [
            { qHe: "מתי נוצר Inspection Lot 03 בייצור תהליכי/בדיד?", aHe: "בעת שחרור (Release) ההזמנה (COR1/CO01), אם Inspection Type 03 פעיל באב-החומר." },
            { qHe: "היכן נרשמות התוצאות והיכן מתקבלת ההחלטה?", aHe: "תוצאות ב-QA32/CO11N (טבלת QAMR); Usage Decision ב-QA11 (טבלת QAVE) שחוסם/משחרר מלאי." },
          ],
          takeawaysHe: ["מנגנון זהה ל-Process ול-Discrete: בדיקה 03 בשחרור.", "COR6N/CO11N לדיווח; QA32 לתוצאות; QA11 להחלטה.", "QALS↔AFKO דרך AUFNR."],
          relatedHe: [{ labelHe: "אובייקט · QALS", href: "/library/pp/object/QALS/" }],
        },
        {
          id: "5.3.2", titleHe: "ייצור חוזר (Repetitive)", titleEn: "Repetitive Manufacturing",
          execHe: "בייצור-חוזר אין הזמנה בדידה — הייצור רץ ברצף על קו, והדיווח הוא Backflush מסיבי (MFBF). בקרת-האיכות מותאמת: הבדיקה מתקשרת לקו/חומר ומופעלת לפי מדגם או תדירות (לעיתים Inspection Type 04 בקבלת-מוצר), ולא לכל יחידה.",
          beginnerHe: "בייצור-חוזר הקו פשוט רץ ומייצר ברצף, בלי 'הזמנה' נפרדת לכל אצווה. כדי לבדוק איכות לא בודקים כל יחידה — דוגמים כל כמה זמן או כל כמות. כך שומרים על הקצב הגבוה ובכל זאת מבטיחים איכות.",
          consultantHe: "Repetitive משתמש ב-Product Cost Collector ו-Run Schedule במקום פק\"ע. הדיווח: MFBF (Backflush) ➔ AFRU + תנועות-טובין. הבדיקה התוך-תהליכית מתוכננת לפי מדגם/תדירות; לעיתים נוצר Inspection Lot 04 בקבלת-המוצר מהקו. QALS היא הכותרת; Usage Decision (QA11) חוסם/משחרר את כמות-התקופה. תכנון-דגימה (QDP1) קריטי כדי לא 'לבדוק' כל יחידה בזרם.",
          purposeHe: "להתאים בקרת-איכות לזרם-ייצור מהיר וחוזר, שבו בדיקה-לכל-יחידה אינה מעשית — תוך שמירה על שער-מלאי איכותי.",
          processExampleHe: "קו רץ מייצר ברצף; דיווח-Backflush ב-MFBF רושם כמות-מיוצרת. כל שעה נדגמים N פריטים, נרשמות תוצאות, ו-Usage Decision נקבע לכמות-השעה.",
          cbcHe: "ב-CBC קו-מילוי במהירות-גבוהה: בדיקת-מדגם של בקבוקים כל פרק-זמן (Brix, CO2, נפח, אטימות); Usage Decision לכמות-התקופה; כשל ➔ חסימה והחזקת-אצווה (Quality hold) עד בירור.",
          navHe: ["Production ► Repetitive Manufacturing ► Control Data ► Define Production Versions / REM Profile", "Logistics ► Repetitive Manufacturing ► Backflush (MFBF)", "Quality Management ► Quality Inspection ► Results Recording (QA32)"],
          tables: ["QALS", "QAMR", "AFRU", "PVBE", "QAVE"],
          tcodes: ["MFBF", "MF50", "QA32", "QA11", "QGA1"],
          fiori: ["F0978", "F2200"],
          configHe: ["הגדר REM Profile ו-Production Version לקו; קשר בקרת-איכות לחומר/קו עם תוכנית-דגימה (QDP1); הפעל Inspection Type מתאים (03 תוך-תהליכי או 04 בקבלה)."],
          flow: [
            { he: "ייצור רציף על הקו", code: "Run Schedule" },
            { he: "Backflush", code: "MFBF", note: "AFRU + תנועת-טובין" },
            { he: "דגימה תקופתית", code: "QDP1", note: "מדגם/תדירות" },
            { he: "רישום-תוצאות", code: "QA32", note: "QAMR" },
            { he: "Usage Decision לכמות-תקופה", code: "QA11" },
          ],
          masterDataHe: ["PVBE = Production Version ל-REM; QALS/QAMR/QAVE = שכבות-הבדיקה.", "AFRU = דיווחי-Backflush; הקישור לחומר/קו ולא להזמנה בדידה."],
          mistakesHe: ["ניסיון-בדיקה לכל יחידה בזרם ➔ פוגע בקצב; חסרה תוכנית-דגימה.", "אי-קישור בקרת-איכות לקו ➔ אין בדיקה ב-Repetitive.", "Usage Decision לא נקבע ➔ כמות-תקופה תקועה במלאי-מוגבל."],
          troubleshootHe: ["אין Inspection Lot ב-Repetitive ➔ בקרת-איכות לא הוגדרה לחומר/קו או Inspection Type לא פעיל.", "Backflush נכשל ➔ COGI/חוסר-מלאי-רכיב; אינו קשור ישירות ל-QM.", "מלאי לא משתחרר ➔ חסר Usage Decision (QA11)."],
          bestPracticeHe: ["תכנן דגימה לפי תדירות/כמות באמצעות Sampling Procedure (QDP1).", "השתמש ב-Inspection Type 04 בקבלה כאשר בדיקה-תוך-תהליך אינה מעשית.", "אכוף Usage Decision כשער-מלאי לכמות-התקופה."],
          interviewHe: [
            { qHe: "מדוע בקרת-איכות ב-Repetitive שונה מ-Discrete?", aHe: "אין הזמנה בדידה והדיווח הוא Backflush מסיבי; לכן הבדיקה לפי מדגם/תדירות (ולעיתים בקבלה, 04) ולא לכל יחידה." },
            { qHe: "כיצד דוגמים בלי לפגוע בקצב-הקו?", aHe: "באמצעות Sampling Procedure (QDP1) הקובע גודל-מדגם לפי תדירות/כמות, במקום בדיקה-לכל-יחידה." },
          ],
          takeawaysHe: ["Repetitive = ייצור רציף ללא פק\"ע בדידה; דיווח Backflush (MFBF).", "בדיקה לפי מדגם/תדירות, לעיתים Inspection Type 04 בקבלה.", "Usage Decision לכמות-תקופה הוא שער-המלאי."],
          relatedHe: [{ labelHe: "אובייקט · AFRU", href: "/library/pp/object/AFRU/" }],
        },
      ],
    },
    // ============================================================ 5.4
    {
      id: "5.4", titleHe: "סיכום", titleEn: "Summary",
      execHe:
        "השילוב בין QM ל-PP/PP-PI הופך את בקרת-האיכות מתהליך-נפרד למרכיב-אינטגרלי של הייצור. ארבעה רכיבי-קונפיגורציה (צירוף-חומר/רשימה, פרמטרי-מפעל, פרמטרי-דיווח, מפתח-בקרה) מאפשרים יצירת Inspection Lot 03 בשחרור-ההזמנה; נתוני-אב מסונכרנים (QMAT, PLMK, QPMK) מספקים את מאפייני-הבדיקה; ובשלושת אופני-הייצור נשמרת אותה ליבה — בדיקה, רישום-תוצאות, Usage Decision.",
      beginnerHe:
        "מה למדנו: כדי שאיכות תיבדק בתוך הייצור, מגדירים ארבעה כללי-קונפיגורציה, מסנכרנים את נתוני-האב כך שהחומר 'יודע' שיש לו בדיקה והפעולה 'יודעת' מה לבדוק, ואז — בכל סוג-ייצור — נפתחת בדיקה אוטומטית, רושמים תוצאות, ומחליטים אם המנה תקינה. ב-CBC זה מה ששומר שלא תצא לשוק אצווה מחוץ-לתקן.",
      consultantHe:
        "סיכום-יועץ: התרשים המנטלי הוא QMAT (חומר) ➔ PLMK (פעולה) ➔ QALS (מנה) ➔ QAMR (תוצאות) ➔ QAVE (החלטה). מפתחות-ההפעלה: Inspection Type 03 באב-החומר, 'QM in Routing/Recipe' ב-Control Key, פרמטרי-מפעל (OPL8/COR4), ופרמטרי-Confirmation (OPK4). נקודות-כשל נפוצות: Type 03 לא פעיל, Control Key ללא QM, פרמטרי-מפעל חסרים, או היעדר Usage Decision שמשאיר מלאי תקוע. ב-Repetitive זכור את הבדל-הדגימה ואת אפשרות ה-04 בקבלה.",
      purposeHe:
        "לגבש תמונה אינטגרטיבית: לא ללמוד כל רכיב לבד, אלא להבין כיצד הקונפיגורציה, נתוני-האב והתהליך מתחברים לשרשרת-בקרה אחת מקצה-לקצה.",
      processExampleHe:
        "מקצה-לקצה: המרת הזמנה-מתוכננת ➔ שחרור פק\"ע ➔ יצירת Inspection Lot 03 ➔ דיווח ב-CO11N/COR6N עם רישום-תוצאות ➔ Usage Decision ב-QA11 ➔ שחרור/חסימת מלאי. כל חוליה נשענת על קונפיגורציה ונתוני-אב מהפרק.",
      cbcHe:
        "ב-CBC: כל אצווה של משקה עוברת את אותה שרשרת — שחרור-פק\"ע על הקו, בדיקה 03 עם דגימה תקופתית, רישום Brix/CO2/pH/נפח, ו-Usage Decision שמהווה את שער-השחרור-לשוק. שגיאת-קונפיגורציה באחת החוליות = אצווה ללא בקרה.",
      navHe: [
        "Quality Management ► Quality Inspection ► Inspection Lot Processing",
        "Production / PP-PI ► Order ► Confirmation",
        "Quality Management ► Quality Inspection ► Usage Decision",
      ],
      tables: ["QMAT", "PLMK", "QALS", "QAMR", "QAVE", "AFKO"],
      tcodes: ["CO01", "COR1", "CO11N", "QA32", "QA11"],
      fiori: ["F2200", "F3069", "F0978"],
      configHe: [
        "ארבעת רכיבי-ההפעלה: OPLB (צירוף-חומר/רשימה), OPL8/COR4 (פרמטרי-מפעל), OPK4 (פרמטרי-דיווח), OP00 (מפתח-בקרה עם QM).",
        "הפעלת Inspection Type 03/04 באב-החומר (MM01/MM02).",
        "סנכרון מאפיינים: QS21 (QPMK) ➔ PLMK בפעולות ➔ פריטי-בדיקה בשחרור.",
      ],
      flow: [
        { he: "קונפיגורציה (4 רכיבים)", code: "OPLB/OPL8/OPK4/OP00" },
        { he: "נתוני-אב מסונכרנים", code: "QMAT/PLMK", note: "QPMK" },
        { he: "שחרור-הזמנה ➔ בדיקה", code: "QALS", note: "Type 03" },
        { he: "דיווח + תוצאות", code: "CO11N/QA32", note: "QAMR" },
        { he: "Usage Decision", code: "QA11", note: "QAVE" },
      ],
      masterDataHe: [
        "QMAT ➔ PLMK ➔ QALS ➔ QAMR ➔ QAVE: שרשרת-הבקרה המלאה.",
        "AFKO↔QALS דרך AUFNR מחבר ייצור לבדיקה.",
      ],
      mistakesHe: [
        "התייחסות לרכיבי-הקונפיגורציה כבודדים במקום כחבילה — כשל באחד שובר את כל השרשרת.",
        "הזנחת Usage Decision — מלאי-תקין נשאר חסום.",
        "אי-התאמת שיטת-הבדיקה לאופי-הייצור (בדיד מול חוזר).",
      ],
      troubleshootHe: [
        "אין בדיקה ➔ עקוב לאחור: QMAT(03) ➔ Control Key(QM) ➔ פרמטרי-מפעל ➔ רשימת-משימות.",
        "מלאי תקוע ➔ Usage Decision חסר (QA11).",
        "תוצאות לא נרשמות ➔ OPK4 ללא קישור-QM או פעולה ללא PLMK.",
      ],
      bestPracticeHe: [
        "תרגל את שרשרת-הבקרה מקצה-לקצה ב-Sandbox לפני Go-Live.",
        "תעד נקודות-כשל ובדוק כל חוליה בנפרד בעת תקלה.",
        "אכוף Usage Decision כשער-מלאי קשיח, במיוחד בתעשיית-המזון/CBC.",
      ],
      interviewHe: [
        { qHe: "תאר את שרשרת-הבקרה מקצה-לקצה בשילוב QM-PP.", aHe: "QMAT (חומר) ➔ PLMK (פעולה) ➔ QALS (מנה בשחרור) ➔ QAMR (תוצאות בדיווח) ➔ QAVE (Usage Decision) שחוסם/משחרר מלאי." },
        { qHe: "מהם ארבעת רכיבי-הקונפיגורציה המאפשרים בדיקה תוך-תהליכית?", aHe: "צירוף-חומר/רשימה (OPLB), פרמטרי-מפעל (OPL8/COR4), פרמטרי-דיווח (OPK4), ומפתח-בקרה עם 'QM in Routing' (OP00)." },
        { qHe: "כיצד נדבק QM לכל אופני-הייצור?", aHe: "אותה ליבה — בדיקה 03, רישום-תוצאות, Usage Decision; ב-Discrete/Process בשחרור-פק\"ע, וב-Repetitive לפי מדגם/תדירות (לעיתים 04 בקבלה)." },
      ],
      takeawaysHe: [
        "QM-PP = שרשרת אחת: קונפיגורציה ➔ נתוני-אב ➔ בדיקה ➔ תוצאות ➔ החלטה.",
        "ארבעה רכיבי-קונפיגורציה + Inspection Type 03 הם מנגנון-ההפעלה.",
        "QMAT➔PLMK➔QALS➔QAMR➔QAVE הוא התרשים-המנטלי לזכור.",
        "Usage Decision הוא שער-המלאי; בלעדיו מלאי-תקין נשאר חסום.",
      ],
      relatedHe: [
        { labelHe: "PP · הגדרת ייצור בדיד (פרק 3)", href: "/library/pp/chapter-03/" },
        { labelHe: "אובייקט · QALS", href: "/library/pp/object/QALS/" },
        { labelHe: "אובייקט · QMAT", href: "/library/pp/object/QMAT/" },
      ],
    },
  ],
};
