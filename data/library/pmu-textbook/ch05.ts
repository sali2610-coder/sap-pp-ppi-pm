// ===== PM Business User Textbook — Chapter 5 (Preventive Maintenance) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew —
// beginner + consultant friendly, study-without-the-book depth.
// SAP identifiers verbatim EN; הארגון = Example Product bottling preventive maintenance
// for fill lines. Source hierarchy + ids preserved exactly.
import type { TextbookChapter } from "./types";

export const CH5: TextbookChapter = {
  n: 5,
  titleHe: "תחזוקה מונעת",
  titleEn: "Preventive Maintenance",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לתחזוקה מונעת (Preventive Maintenance) ב-SAP PM. תחזוקה מונעת היא המעבר מ'לתקן כשנשבר' (Breakdown) ל'לתחזק לפני שנשבר' (Planned) — היא לב-ליבו של ניהול-נכסים בוגר במפעל. כל תת-פרק מורחב ליחידה עצמאית בת 18 מקטעים: שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת הארגון (תחזוקת קווי-מילוי במפעל-בקבוק מוצר לדוגמה), ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך-תזמון, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. נלמד רשימות-משימות (Task Lists), תוכניות-תחזוקה מבוססות-זמן ומבוססות-ביצוע, תוכניות מרובות-מונים (Multiple Counter) וסבבי-בדיקה (Inspection Rounds) — הכל בלי הספר המקורי.",
  subchapters: [
    // ============================================================ 5.1
    {
      id: "5.1",
      titleHe: "עקרונות יסוד של תחזוקה מונעת",
      titleEn: "Basic Principles of Preventive Maintenance",
      execHe:
        "תחזוקה מונעת היא תחזוקה מתוכננת מראש שמטרתה למנוע תקלות לפני שיקרו, להאריך חיי-נכס ולהבטיח זמינות-ייצור. במקום להגיב לשבר (תחזוקת-שבר), מבצעים אותה לפי לוח-זמנים קבוע (זמן) או לפי שחיקה בפועל (ביצוע). זהו שינוי-תרבות מ'כיבוי-שריפות' לניהול-נכסים פרואקטיבי — שמוריד עלות-תחזוקה כוללת ומונע השבתות-ייצור יקרות.",
      beginnerHe:
        "דמיין את הרכב שלך: אתה מחליף שמן כל 10,000 ק\"מ או כל שנה — לא מחכה שהמנוע ייתקע. זו תחזוקה מונעת. ב-SAP אתה מגדיר 'מה לעשות' (רשימת-משימות) ו'מתי לחזור על זה' (תוכנית-תחזוקה), והמערכת יוצרת אוטומטית את פק\"ע התחזוקה (Maintenance Order) בזמן הנכון. שני מנגנוני-תזמון: לפי זמן (כל 3 חודשים) או לפי ביצוע (כל 1,000,000 בקבוקים).",
      consultantHe:
        "תחזוקה מונעת ב-PM נשענת על שלושה אובייקטי-יסוד הקשורים זה לזה: רשימת-משימות (Task List — PLKO כותרת, PLPO פעולות) המתארת 'מה'; תוכנית-תחזוקה (Maintenance Plan — MPLA כותרת) המתארת 'מתי'; ופריט-תחזוקה (Maintenance Item — MPOS) המקשר את ה'מה' ל'מתי' ולאובייקט-הטכני (Equipment/Functional Location). תזמון (Scheduling) מייצר Maintenance Call Objects (MHIS) שבמועדם הופכים לפק\"ע/הודעה. ההבחנה היסודית: Time-based (יחידת-זמן), Performance-based (מונה — Measuring Point/Counter), ו-Multiple Counter (שילוב OR/AND). שמירת היחס בין Planned ל-Breakdown (יעד טיפוסי >80% מתוכנן) היא KPI-מפתח של ארגון-תחזוקה בוגר.",
      purposeHe:
        "המטרה: למקסם זמינות-ציוד (Availability) ובטיחות תוך מזעור עלות-מחזור-החיים (TCO). תחזוקה מונעת מעבירה את עלות-התחזוקה מבלתי-צפויה (שבר, השבתה, נזק-תוצאתי) לצפויה ומתוכננת (חלון-תחזוקה, חלפים מוזמנים מראש, כוח-אדם מתוכנן).",
      processExampleHe:
        "משאבה קריטית בקו-ייצור: מהנדס-אמינות מגדיר רשימת-משימות (סיכה, בדיקת-רטט, החלפת-אטם) ותוכנית-תחזוקה רבעונית. ב-IP10 מתזמנים את התוכנית; SAP מחשב מועדי-קריאה עתידיים ובכל רבעון יוצר פק\"ע-תחזוקה אוטומטית עם כל הפעולות, החלפים והעלות — לפני שהמשאבה נשחקת.",
      scenarioHe:
        "בארגון קו-מילוי (Filler) הוא הנכס הקריטי ביותר — דקת-השבתה = אלפי בקבוקים שלא מולאו. תחזוקה מונעת על ה-Filler משלבת: סיכה שבועית (זמן), כיול-שסתומים כל 5,000,000 מילויים (ביצוע), והחלפת-מסננים לפי שעות-פעולה. כל זה מנוהל בתוכניות-תחזוקה שמייצרות פק\"ע בחלונות-העצירה המתוכננים (CIP/שטיפה), כך שאין השבתה לא-מתוכננת.",
      navHe: [
        "Plant Maintenance and Customer Service ► Maintenance Plans, Work Centers, Task Lists and PRTs ► Maintenance Plans ► Set Maintenance Plan Categories",
        "Plant Maintenance and Customer Service ► Maintenance and Service Processing ► Maintenance and Service Orders ► Functions and Settings for Order Types ► Define Default Values for Task List Data and Profile Assignments",
      ],
      tables: ["MPLA", "MPOS", "MHIS", "PLKO", "PLPO", "MHIO"],
      tcodes: ["IP10", "IP30", "IW38", "IP24", "OIBS"],
      fiori: ["F2773", "F4439"],
      configHe: [
        "Maintenance Plan Category: מקשר את התוכנית לאובייקט-הקריאה (Call Object) — Order Type / Notification Type / Service Entry.",
        "Number Ranges לתוכניות-תחזוקה, פריטים ורשימות-משימות.",
        "Default values ל-Task List data ו-Planner Group לפי Order Type.",
        "הגדרת Maintenance Strategies (זמן/ביצוע) כתשתית לתוכניות-אסטרטגיה.",
      ],
      flow: [
        { he: "הגדר 'מה' — רשימת-משימות", code: "IA05/IA06", note: "PLKO+PLPO" },
        { he: "הגדר 'מתי' — תוכנית-תחזוקה", code: "IP41/IP42", note: "MPLA+MPOS" },
        { he: "תזמן את התוכנית", code: "IP10", note: "מייצר Call Objects (MHIS)" },
        { he: "במועד — קריאה הופכת לפק\"ע", code: "IW38", note: "Order/Notification" },
        { he: "ביצוע + השלמה (TECO)", code: "IW41", note: "מזין היסטוריה" },
        { he: "השלמה מתזמנת קריאה הבאה", code: "IP10", note: "מחזור סגור" },
      ],
      masterDataHe: [
        "Equipment / Functional Location = האובייקט-הטכני שעליו רצה התחזוקה.",
        "Maintenance Strategy = חבילת מחזורי-תחזוקה (Packages) לשימוש-חוזר בתוכניות-אסטרטגיה.",
        "Measuring Point / Counter = הבסיס לתחזוקה מבוססת-ביצוע.",
      ],
      mistakesHe: [
        "בלבול בין רשימת-משימות (מה) לתוכנית-תחזוקה (מתי) — שני אובייקטים נפרדים שצריכים שרשור.",
        "הגדרת תחזוקה מונעת בלי Maintenance Plan Category תואם ל-Order Type — הקריאה לא יוצרת פק\"ע.",
        "אי-תזמון התוכנית (IP10) אחרי יצירתה — שום קריאה לא נוצרת, התוכנית 'ישנה'.",
        "מדידת הצלחה לפי כמות-פק\"ע במקום לפי יחס Planned/Breakdown וזמינות-נכס.",
      ],
      troubleshootHe: [
        "לא נוצרות פק\"ע מתוכננות ➔ ודא שהתוכנית תוזמנה (IP10) ושה-Category קושר ל-Order Type נכון.",
        "פק\"ע נוצרת בלי פעולות ➔ רשימת-המשימות לא משויכת לפריט-התחזוקה (MPOS).",
        "מועדים לא הגיוניים ➔ Scheduling Parameters (Shift Factor / Tolerance / Cycle) שגויים.",
        "תוכנית מבוססת-ביצוע לא קוראת ➔ אין קריאות-מונה (IK11) או Annual Estimate חסר.",
      ],
      bestPracticeHe: [
        "התחל מ-Criticality Analysis — תעדף תחזוקה מונעת לנכסים הקריטיים לייצור ולבטיחות.",
        "תקנן רשימות-משימות גנריות (General Task Lists) לשימוש-חוזר בין נכסים דומים.",
        "מדוד KPI: יחס Planned/Reactive, MTBF, Schedule Compliance — לא רק 'כמות-עבודה'.",
        "תאם חלונות-תחזוקה עם תכנון-הייצור (PP) למזעור-השבתות.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין תחזוקה מונעת לתחזוקת-שבר?", aHe: "תחזוקת-שבר (Breakdown) מגיבה אחרי שהציוד נכשל; תחזוקה מונעת (Preventive) מתוכננת מראש לפי זמן או ביצוע כדי למנוע את הכשל. מונעת מורידה עלות-מחזור-חיים ומגדילה זמינות." },
        { qHe: "מהם שלושת אובייקטי-היסוד של תחזוקה מונעת ב-PM?", aHe: "רשימת-משימות (Task List — 'מה'), תוכנית-תחזוקה (Maintenance Plan — 'מתי') ופריט-תחזוקה (Maintenance Item) המקשר ביניהם ולאובייקט-הטכני." },
        { qHe: "מהם שני סוגי-התזמון העיקריים?", aHe: "מבוסס-זמן (Time-based) — לפי יחידת-זמן קלנדרית; ומבוסס-ביצוע (Performance-based) — לפי מונה/Measuring Point המודד שחיקה בפועל." },
      ],
      takeawaysHe: [
        "תחזוקה מונעת = תחזוקה מתוכננת מראש שמונעת תקלות במקום להגיב להן.",
        "שלושה אובייקטים: Task List (מה) + Maintenance Plan (מתי) + Maintenance Item (מקשר).",
        "שני צירי-תזמון: זמן (קלנדרי) וביצוע (מונה).",
        "KPI אמיתי: יחס Planned/Breakdown וזמינות-נכס — לא כמות-פק\"ע.",
      ],
      relatedHe: [
        { labelHe: "PM Academy · תחזוקה מונעת מתקדמת", href: "/library/pm-academy/chapter-06/" },
        { labelHe: "אובייקט · MPLA", href: "/library/pm/object/MPLA/" },
        { labelHe: "אובייקט · PLKO", href: "/library/pm/object/PLKO/" },
      ],
    },
    // ============================================================ 5.2
    {
      id: "5.2",
      titleHe: "אובייקטי תחזוקה מונעת",
      titleEn: "Preventive Maintenance Objects",
      execHe:
        "תחזוקה מונעת בנויה ממערכת-אובייקטים מקושרים: רשימת-משימות (Task List) מתארת את העבודה; תוכנית-תחזוקה (Maintenance Plan) קובעת את מחזוריות-הביצוע; פריט-תחזוקה (Maintenance Item) מחבר את העבודה לאובייקט-הטכני; ואסטרטגיה (Strategy) מספקת חבילת-מחזורים לשימוש-חוזר. הבנת היחסים ביניהם היא תנאי להבנת כל הפרק.",
      beginnerHe:
        "חשוב על מתכון מטבח: 'המתכון' = רשימת-המשימות (איך מכינים). 'מתי לבשל' = תוכנית-התחזוקה. 'איזה תנור' = האובייקט-הטכני (Equipment). 'הקישור בין המתכון, התנור והלוח-זמנים' = פריט-התחזוקה. SAP מחבר את כולם כדי ליצור אוטומטית את העבודה בזמן הנכון.",
      consultantHe:
        "מבנה-הנתונים: Task List = PLKO (כותרת) + PLPO (פעולות) + PLMZ (הקצאת-רכיבים/BOM) + PLFH (PRT). Maintenance Plan = MPLA (כותרת + פרמטרי-תזמון). Maintenance Item = MPOS (קישור: Reference Object + Task List + Order/Notification Type + Planner Group + Main Work Center). Strategy = T351 (אסטרטגיה) + T351P (Packages/מחזורים). תוכנית מכילה פריט אחד או יותר (Single-item / Multiple-item Plan); כל פריט מצביע על אובייקט-טכני אחד ורשימת-משימות אחת. תזמון יוצר MHIS (Scheduling history) → MHIO (Call objects).",
      purposeHe:
        "ההפרדה לאובייקטים מאפשרת שימוש-חוזר ותחזוקה יעילה: רשימת-משימות אחת משרתת תוכניות רבות; אסטרטגיה אחת משרתת רשימות-משימות רבות; שינוי במקום אחד מתפשט לכל המשתמשים. זה DRY (Don't Repeat Yourself) של עולם-התחזוקה.",
      processExampleHe:
        "מהנדס יוצר General Task List 'שירות-משאבה-רבעוני', מקצה לה Strategy עם Packages רבעוני/שנתי, ואז יוצר תוכנית-תחזוקה עם פריט המקשר את הרשימה ל-Equipment P-101. אותה רשימה תשמש גם את P-102, P-103 — שינוי-פעולה אחד מעדכן את כולם.",
      scenarioHe:
        "בארגון רשימת-משימות גנרית 'שירות-קו-מילוי' משמשת את כל קווי-המילוי (Filler-1..Filler-6); כל קו מקבל תוכנית-תחזוקה משלו עם פריט המצביע ל-Equipment שלו, אך כולם חולקים את אותה רשימת-משימות ואסטרטגיה — תחזוקה אחידה ויעילה על-פני המפעל.",
      navHe: [
        "Plant Maintenance and Customer Service ► Maintenance Plans, Work Centers, Task Lists and PRTs ► Task Lists ► General Data ► Define Task List Usage Keys",
        "Plant Maintenance and Customer Service ► Maintenance Plans, Work Centers, Task Lists and PRTs ► Maintenance Plans ► Define Maintenance Plan Categories",
      ],
      tables: ["PLKO", "PLPO", "PLMZ", "MPLA", "MPOS", "T351", "T351P"],
      tcodes: ["IA05", "IA06", "IP41", "IP42", "IP10", "IA08"],
      fiori: ["F2773", "F4439"],
      configHe: [
        "Task List Usage (4 = PM/CS) ו-Status (4 = Released) — תנאי לשימוש בתוכנית.",
        "Maintenance Plan Categories — מקשרות Call Object לכל סוג-תוכנית.",
        "Strategy + Packages (T351/T351P) — חבילת-מחזורים לשימוש-חוזר.",
        "Field Selection ו-Profiles לפריט-התחזוקה ולתוכנית.",
      ],
      flow: [
        { he: "Strategy + Packages", code: "Strategy", note: "T351/T351P" },
        { he: "Task List (מה)", code: "IA05/IA06", note: "PLKO+PLPO" },
        { he: "Maintenance Item (קישור)", code: "MPOS", note: "אובייקט+רשימה+Order Type" },
        { he: "Maintenance Plan (מתי)", code: "MPLA", note: "פרמטרי-תזמון" },
        { he: "תזמון", code: "IP10", note: "MHIS→MHIO" },
      ],
      masterDataHe: [
        "Reference Object: Equipment (EQUI) או Functional Location (IFLOT) — המטרה הפיזית.",
        "Main Work Center: צוות-התחזוקה האחראי (CRHD).",
        "Planner Group + Order Type: קובעים זרימת-העבודה והרשאות.",
      ],
      mistakesHe: [
        "יצירת רשימת-משימות פרטנית לכל נכס במקום General Task List משותפת — כפל-תחזוקה.",
        "רשימת-משימות שנשארה בסטטוס לא-Released — לא ניתנת לשיוך לתוכנית.",
        "ערבוב Single-item ל-Multiple-item בלי הבנה — קושי בתחזוקה ובדיווח.",
        "אי-מילוי Reference Object בפריט — אין למי לייצר את הפק\"ע.",
      ],
      troubleshootHe: [
        "לא ניתן לשייך רשימת-משימות לתוכנית ➔ Status≠Released או Usage שגוי.",
        "פק\"ע נפתחת על אובייקט שגוי ➔ Reference Object שגוי ב-MPOS.",
        "פעולות חסרות ➔ הרשימה משויכת אך Group Counter שגוי.",
        "עלות לא מחושבת ➔ אין Work Center / Activity Type בפעולות.",
      ],
      bestPracticeHe: [
        "העדף General Task Lists (IA05) על-פני Equipment/FL-specific לשימוש-חוזר.",
        "שמור היררכיית-אובייקטים נקייה (FL→Equipment) לדיווח-היסטוריה אמין.",
        "תעד את היחס Plan↔Item↔Task List במסמכי-עיצוב לפני בנייה.",
        "השתמש בקבוצות-מתכנן ובמרכזי-עבודה עקביים לבקרת-עומס.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין Maintenance Plan ל-Maintenance Item?", aHe: "Plan (MPLA) מגדיר את מחזוריות-התזמון ('מתי'); Item (MPOS) מקשר את 'מה' (Task List) ל'מי' (אובייקט-טכני). תוכנית יכולה להכיל מספר פריטים (Multiple-item Plan)." },
        { qHe: "מהי General Task List ומדוע היא מועדפת?", aHe: "רשימה (IA05) שאינה קשורה לאובייקט מסוים, ניתנת לשימוש-חוזר על נכסים רבים — מונעת כפילות ומבטיחה תחזוקה אחידה." },
        { qHe: "מהו תפקיד ה-Strategy ביחס לרשימת-המשימות?", aHe: "האסטרטגיה מספקת Packages (מחזורים) שאליהם משייכים פעולות ברשימה; כך אותה פעולה רצה במחזור שונה (רבעוני/שנתי) בלי לשכפל אותה." },
      ],
      takeawaysHe: [
        "ארבעה אובייקטים: Strategy → Task List → Maintenance Item → Maintenance Plan.",
        "המבנה תומך בשימוש-חוזר: רשימה אחת לנכסים רבים.",
        "Maintenance Item מקשר 'מה' + 'מתי' + 'איפה'.",
        "תזמון יוצר MHIS→MHIO שהופכים לפק\"ע/הודעות.",
      ],
      relatedHe: [
        { labelHe: "PM Academy · אובייקטי-תחזוקה", href: "/library/pm-academy/chapter-06/" },
        { labelHe: "אובייקט · MPOS", href: "/library/pm/object/MPOS/" },
      ],
    },
    // ============================================================ 5.3
    {
      id: "5.3",
      titleHe: "רשימות משימות תחזוקה",
      titleEn: "Maintenance Task Lists",
      execHe:
        "רשימת-משימות (Maintenance Task List) היא התיאור המובנה של עבודת-תחזוקה: רצף פעולות, מרכזי-עבודה, זמני-תקן, חלפים (BOM) וכלי-עזר (PRT). היא ה'הוראת-העבודה' הסטנדרטית — נכתבת פעם אחת ומשמשת אינסוף פק\"ע. שלושה סוגים: General (IA05), Equipment (IA01) ו-Functional Location (IA11).",
      beginnerHe:
        "רשימת-משימות היא 'דף-הוראות' לעבודת-תחזוקה: שלב 1 — נתק חשמל; שלב 2 — פרק מכסה; שלב 3 — החלף אטם; וכו'. לכל שלב יש כמה זמן הוא לוקח ומי אחראי. במקום לכתוב את ההוראות מחדש בכל פק\"ע, כותבים פעם אחת ומחברים לתוכנית.",
      consultantHe:
        "מבנה: PLKO (כותרת — Group, Group Counter, Usage, Status, Strategy) + PLPO (פעולות — Operation, Work Center, Control Key, Standard Values) + PLMZ (הקצאת-רכיבי-BOM לפעולות) + PLFH (PRT) + PLAS (קישור-פעולות). שלושת הסוגים: General (קבוצה+מונה, ללא אובייקט), Equipment-specific, ו-FL-specific. ה-Strategy מצורפת ברמת-הכותרת ומאפשרת שיוך Maintenance Packages לפעולות (שדה ברמת-PLPO). Status חייב להיות 4 (Released) לשימוש בתוכנית.",
      purposeHe:
        "לתקנן עבודת-תחזוקה: אחידות-ביצוע, זמני-תקן לתכנון-קיבולת, חלפים מוגדרים-מראש ועלות-תקן. הסטנדרטיזציה היא שמאפשרת תכנון-משאבים, אומדן-עלות ובקרת-איכות חוצי-מפעל.",
      processExampleHe:
        "מהנדס בונה רשימת-משימות 'שירות-מנוע-חשמלי' עם 6 פעולות, מקצה לכל פעולה Work Center וזמן-תקן, מקשר חלפים מ-BOM-הציוד, ומשחרר (Status 4). הרשימה משויכת לתוכנית; כל פק\"ע נוצרת אוטומטית עם כל 6 הפעולות, החלפים והעלות.",
      scenarioHe:
        "בארגון רשימת-משימות 'שירות-Filler' כוללת: ניקוי-CIP, בדיקת-שסתומי-מילוי, כיול-נפח, סיכה והחלפת-O-rings. חלפי-המילוי מקושרים מ-BOM-הקו; זמני-התקן מאפשרים לתכנן את חלון-העצירה כך שהקו יחזור לייצור בזמן.",
      navHe: [
        "Plant Maintenance and Customer Service ► Maintenance Plans, Work Centers, Task Lists and PRTs ► Task Lists ► Control Data ► Define Profiles with Default Values",
        "Plant Maintenance and Customer Service ► Maintenance Plans, Work Centers, Task Lists and PRTs ► Task Lists ► General Data ► Configure Planner Group",
      ],
      tables: ["PLKO", "PLPO", "PLMZ", "PLFH", "PLAS"],
      tcodes: ["IA05", "IA06", "IA01", "IA11", "IA08", "IA09"],
      fiori: ["F2773"],
      configHe: [
        "Task List Profile — ערכי-ברירת-מחדל לפעולות (Work Center, Control Key).",
        "Usage Keys + Status (4=Released).",
        "Control Keys לפעולות (PM01 פנימי, PM02 חיצוני/שירות).",
        "שיוך Strategy ברמת-הכותרת לתמיכה ב-Maintenance Packages.",
      ],
      flow: [
        { he: "צור כותרת + Group", code: "IA05", note: "PLKO" },
        { he: "הזן פעולות + Work Center", code: "IA05", note: "PLPO" },
        { he: "הקצה חלפים (BOM)", code: "IA05", note: "PLMZ" },
        { he: "הקצה PRT", code: "IA05", note: "PLFH" },
        { he: "שחרר (Status 4)", code: "IA08", note: "מוכן לתוכנית" },
      ],
      masterDataHe: [
        "Work Center (CRHD) — לכל פעולה, לתזמון ועלות.",
        "Material BOM (Equipment/FL) — מקור החלפים שמוקצים לפעולות.",
        "PRT — כלים/מסמכים נדרשים לפעולה.",
      ],
      mistakesHe: [
        "השארת רשימה ב-Status≠4 — לא ניתנת לשיוך לתוכנית.",
        "אי-הקצאת Work Center לפעולה — אין תזמון ואין עלות.",
        "כפל-רשימות לנכסים זהים במקום General Task List אחת.",
        "אי-מילוי זמני-תקן — תכנון-קיבולת ואומדן-עלות שגויים.",
      ],
      troubleshootHe: [
        "פק\"ע ללא פעולות ➔ הרשימה לא משויכת או Group Counter שגוי.",
        "חלפים לא נשלפים ➔ הקצאת-BOM (PLMZ) חסרה בפעולה.",
        "עלות-תקן שגויה ➔ זמני-תקן/Activity Type חסרים.",
        "לא ניתן לשחרר ➔ פעולה ללא Work Center או Control Key.",
      ],
      bestPracticeHe: [
        "בנה General Task Lists גנריות ושייך-חוזר.",
        "תקנן Control Keys ו-Work Centers על-פני המפעל.",
        "הקצה חלפים ו-PRT ברשימה — לא ידנית בכל פק\"ע.",
        "נהל גרסאות דרך Group Counter במקום שכפול-Group.",
      ],
      interviewHe: [
        { qHe: "מהם שלושת סוגי רשימות-המשימות ב-PM?", aHe: "General (IA05, ללא אובייקט, לשימוש-חוזר), Equipment Task List (IA01, לציוד מסוים), ו-Functional Location Task List (IA11)." },
        { qHe: "איזה Status נדרש לשימוש ברשימה בתוכנית-תחזוקה?", aHe: "Status 4 (Released). רשימה לא-משוחררת לא ניתנת לשיוך." },
        { qHe: "כיצד מקושרים חלפים לרשימת-משימות?", aHe: "דרך הקצאת רכיבי Material BOM (טבלת PLMZ) לפעולות — כך הם נשלפים אוטומטית לכל פק\"ע." },
      ],
      takeawaysHe: [
        "רשימת-משימות = הוראת-עבודה סטנדרטית רב-פעמית.",
        "מבנה: PLKO כותרת + PLPO פעולות + PLMZ חלפים + PLFH PRT.",
        "שלושה סוגים: General / Equipment / FL.",
        "Status 4 (Released) הוא תנאי-סף לשימוש.",
      ],
      relatedHe: [
        { labelHe: "PM Academy · רשימות-משימות", href: "/library/pm-academy/chapter-06/" },
        { labelHe: "אובייקט · PLPO", href: "/library/pm/object/PLPO/" },
      ],
      children: [
        {
          id: "5.3.1",
          titleHe: "יסודות רשימות משימות תחזוקה",
          titleEn: "Basics of Maintenance Task Lists",
          execHe:
            "היסודות: רשימת-משימות מזוהה ב-Group + Group Counter; מכילה כותרת (PLKO) ופעולות (PLPO); נושאת Usage, Status ולעיתים Strategy. הבנת מבנה-הזיהוי וההיררכיה היא הבסיס לכל עבודה עם רשימות.",
          beginnerHe:
            "כל רשימה מזוהה בשני מספרים: Group (הקבוצה) ו-Group Counter (הגרסה בתוך הקבוצה). למשל Group 'PUMP-SVC' עם Counter 1, 2, 3 — שלוש גרסאות של שירות-משאבה. כל גרסה היא רשימה עצמאית עם פעולות משלה.",
          consultantHe:
            "Group מקבץ רשימות-קרובות; Group Counter מבדיל ביניהן (גרסאות/וריאנטים). PLKO נושאת Usage (4=PM/CS), Status (4=Released), Maintenance Strategy, Planner Group ו-Work Center ראשי. PLPO נושאת פעולות עם Control Key, Standard Values ו-Maintenance Packages (אם יש Strategy). General Task List לא קשורה לאובייקט; Equipment/FL Task List מקושרת דרך טבלאות-קישור.",
          purposeHe:
            "מבנה-הזיהוי (Group/Counter) מאפשר לנהל וריאנטים ולשייך במדויק את הגרסה הנכונה לתוכנית — בלי בלבול בין דומות.",
          processExampleHe:
            "מהנדס מחפש ב-IA09 את Group 'MOTOR-SVC', רואה Counter 1 (סטנדרטי) ו-Counter 2 (מורחב), ומשייך לתוכנית את ה-Counter המתאים לרמת-הקריטיות של הנכס.",
          scenarioHe:
            "בארגון Group 'FILLER-SVC' עם Counter 1 (שירות-קל) ו-Counter 2 (Overhaul); קווים קריטיים מקבלים Counter 2 בתוכנית השנתית.",
          navHe: [
            "Plant Maintenance and Customer Service ► Maintenance Plans, Work Centers, Task Lists and PRTs ► Task Lists ► General Data ► Define Task List Usage Keys",
          ],
          tables: ["PLKO", "PLPO"],
          tcodes: ["IA05", "IA06", "IA09", "IA08"],
          fiori: ["F2773"],
          configHe: [
            "Usage Keys (4 = PM/CS) — קובע היכן הרשימה ניתנת-לשימוש.",
            "Number Range לקבוצות (Group).",
            "Status Profile — מ-1 (Created) ל-4 (Released).",
          ],
          mistakesHe: [
            "ערבוב Group Counters שונים בשיוך לתוכנית — גרסה שגויה רצה.",
            "Usage שגוי — הרשימה לא מופיעה בחיפוש PM.",
          ],
          troubleshootHe: [
            "רשימה לא נמצאת בשיוך ➔ Usage או Status שגויים.",
            "גרסה לא-נכונה בפק\"ע ➔ Group Counter שגוי בפריט.",
          ],
          bestPracticeHe: [
            "השתמש ב-Group Counter לוריאנטים במקום קבוצות-נפרדות.",
            "תעד את משמעות כל Counter לארגון.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין Group ל-Group Counter?", aHe: "Group מקבץ רשימות-קרובות; Group Counter מזהה גרסה/וריאנט בתוך הקבוצה. יחד הם מזהים רשימה ספציפית." },
            { qHe: "מה תפקיד שדה ה-Usage?", aHe: "קובע באילו תחומים (PM/CS) הרשימה ניתנת-לשימוש; ערך 4 = תחזוקה ושירות." },
          ],
          takeawaysHe: [
            "זיהוי = Group + Group Counter.",
            "PLKO כותרת + PLPO פעולות.",
            "Usage 4 + Status 4 הם תנאי-סף.",
          ],
          relatedHe: [{ labelHe: "PM Academy · יסודות-רשימות", href: "/library/pm-academy/chapter-06/" }],
        },
        {
          id: "5.3.2",
          titleHe: "פקודת עבודה ורשימת משימות",
          titleEn: "Order and Task List",
          execHe:
            "כאשר נוצרת פק\"ע (Maintenance Order) מתוכנית-תחזוקה, היא 'יורשת' את פעולות רשימת-המשימות. הקשר הזה הוא שמעביר את הסטנדרט מהתכנון לביצוע: הפק\"ע מקבלת אוטומטית פעולות, חלפים, זמני-תקן ועלות.",
          beginnerHe:
            "פק\"ע היא 'משימת-עבודה אמיתית' עם תאריך ועובד. כשהיא נוצרת מתוכנית, SAP מעתיק אליה את כל השלבים מרשימת-המשימות. אפשר גם לצרף רשימה ידנית לפק\"ע קיימת — וכל הפעולות נכנסות בלחיצה.",
          consultantHe:
            "בהמרה (IP10 → Order) פעולות PLPO מועתקות ל-AFVC (פעולות-פק\"ע), חלפי-PLMZ ל-RESB (Reservations), ו-PRT ל-AFFH. ניתן גם לצרף רשימה ידנית בפק\"ע ב-IW31/IW32 (Operations ► Task List). הקשר הוא בדרך-כלל Copy (snapshot) — שינוי-עתידי ברשימה לא משנה פק\"ע קיימת. עלות-מתוכננת נגזרת מזמני-התקן × תעריפי-Activity (KP26).",
          purposeHe:
            "להעביר את הסטנדרט מהתכנון לביצוע ללא הקלדה-חוזרת: אחידות, מהירות, ודיוק-עלות. הפק\"ע הופכת ל'מופע' של רשימת-המשימות.",
          processExampleHe:
            "תוכנית רבעונית מגיעה למועד; IP10 יוצר פק\"ע PM01 עם 6 פעולות מרשימת-המשימות, 4 חלפים כ-Reservations ועלות-מתוכננת מחושבת. הטכנאי מבצע, מדווח (IW41) וסוגר (TECO).",
          scenarioHe:
            "בארגון פק\"ע-Filler נוצרת אוטומטית מהתוכנית עם כל פעולות-השירות והחלפים; מנהל-המשמרת רואה אותה ב-IW38, משבץ לחלון-CIP, והקו חוזר לייצור בזמן.",
          navHe: [
            "Plant Maintenance and Customer Service ► Maintenance and Service Processing ► Maintenance and Service Orders ► Functions and Settings for Order Types ► Assign Task List Data and Default Values",
          ],
          tables: ["AUFK", "AFKO", "AFVC", "RESB", "PLPO"],
          tcodes: ["IW31", "IW32", "IW38", "IP10", "IW41"],
          fiori: ["F2773", "F4439"],
          configHe: [
            "Default values ל-Order Type — Task List type ו-Planner Group.",
            "Control Keys הקובעים תזמון/עלות/אישור-פעולה.",
            "הגדרת אופן-העתקה (Copy snapshot) של רשימה לפק\"ע.",
          ],
          flow: [
            { he: "תוכנית מגיעה למועד", code: "IP10", note: "Call due" },
            { he: "יצירת פק\"ע", code: "Order", note: "AUFK/AFKO" },
            { he: "העתקת פעולות", code: "AFVC", note: "מ-PLPO" },
            { he: "Reservations לחלפים", code: "RESB", note: "מ-PLMZ" },
            { he: "ביצוע + TECO", code: "IW41", note: "היסטוריה" },
          ],
          masterDataHe: [
            "Order Type (PM01/PM02/PM03) — קובע זרימה ומספור.",
            "Activity Types + KP26 — בסיס לעלות-מתוכננת.",
          ],
          mistakesHe: [
            "ציפייה ששינוי ברשימה יעדכן פק\"ע קיימת — זהו snapshot, לא reference.",
            "צירוף רשימה ב-Status≠4 לפק\"ע ידנית — נכשל.",
            "אי-בדיקת Reservations לפני ביצוע — חלפים חסרים ברצפה.",
          ],
          troubleshootHe: [
            "פק\"ע ללא פעולות ➔ רשימה לא משויכת לפריט או צורפה לא-נכון.",
            "חלפים לא הוזמנו ➔ Reservations לא נוצרו (BOM חסר ברשימה).",
            "עלות-מתוכננת אפס ➔ Activity Type/KP26 חסרים.",
          ],
          bestPracticeHe: [
            "ודא Status 4 לרשימה לפני שיוך/צירוף.",
            "בדוק זמינות-חלפים (Reservations) לפני שחרור-פק\"ע.",
            "השתמש ב-Order Types עקביים לדיווח-עלות.",
          ],
          interviewHe: [
            { qHe: "מה קורה לרשימת-המשימות כשנוצרת פק\"ע?", aHe: "פעולותיה מועתקות לפק\"ע (snapshot): פעולות→AFVC, חלפים→Reservations, PRT→AFFH. שינוי-עתידי ברשימה לא משפיע על פק\"ע קיימת." },
            { qHe: "האם אפשר לצרף רשימה לפק\"ע ידנית?", aHe: "כן — ב-IW31/IW32 דרך Operations ► Task List; כל הפעולות נכנסות בבת-אחת, בתנאי Status 4." },
          ],
          takeawaysHe: [
            "פק\"ע יורשת פעולות+חלפים+PRT מהרשימה.",
            "הקשר הוא snapshot (Copy), לא live reference.",
            "עלות-מתוכננת = זמני-תקן × תעריף-Activity.",
          ],
          relatedHe: [{ labelHe: "PM Academy · פק\"ע ורשימה", href: "/library/pm-academy/chapter-06/" }],
        },
        {
          id: "5.3.3",
          titleHe: "יומן פעולות",
          titleEn: "Action Log",
          execHe:
            "יומן-הפעולות (Action Log) מתעד כל שינוי ברשימת-המשימות: מי, מה, מתי. הוא כלי-ביקורת ומעקב-תצורה (Change Documentation) המאפשר לעקוב אחרי היסטוריית-עריכות ולתחקר 'מי שינה את הזמן/הפעולה'.",
          beginnerHe:
            "כמו 'מעקב-שינויים' במסמך-Word: כל פעם שמישהו עורך את הרשימה, היומן רושם מה השתנה ומי עשה זאת. כך אפשר תמיד לדעת איך הרשימה הגיעה למצבה הנוכחי.",
          consultantHe:
            "ה-Action Log מבוסס Change Documents (CDHDR/CDPOS) של אובייקטי רשימת-המשימות. הוא מציג שינויי-שדה ברמת-PLKO/PLPO (זמני-תקן, Work Center, חלפים). נגיש מתוך עורך-הרשימה (Extras ► Change Documents / Action Log). שימושי לביקורת-איכות ולחקירת-תקלות הנובעות משינוי-רשימה.",
          purposeHe:
            "אחריותיות ומעקב: לדעת מי שינה מה ומתי — קריטי לסביבות-רגולציה ולתחקור שגיאות-תחזוקה.",
          processExampleHe:
            "פק\"ע התחילה להגיע עם זמן-תקן שגוי; המהנדס פותח את ה-Action Log, רואה ששעת-Machine שונתה אתמול ע\"י משתמש מסוים, ומתקן.",
          scenarioHe:
            "בארגון, תחת רגולציית-מזון, כל שינוי ברשימת-שירות-Filler מתועד ב-Action Log לצורך ביקורת-QA והוכחת-תצורה.",
          navHe: [
            "Plant Maintenance and Customer Service ► Maintenance Plans, Work Centers, Task Lists and PRTs ► Task Lists ► Control Data ► Activate Change Documents",
          ],
          tables: ["CDHDR", "CDPOS", "PLKO", "PLPO"],
          tcodes: ["IA06", "IA08", "AUT10"],
          fiori: ["F2773"],
          configHe: [
            "הפעלת Change Documents לאובייקטי רשימת-המשימות.",
            "הרשאות-צפייה ב-Action Log.",
          ],
          mistakesHe: [
            "אי-הפעלת Change Documents — אין יומן לתחקור.",
            "התעלמות מהיומן בעת חקירת-תקלה.",
          ],
          troubleshootHe: [
            "אין רשומות ביומן ➔ Change Documents לא הופעלו.",
            "שינוי-חשוד בזמן/פעולה ➔ פתח Action Log לזיהוי המשתמש והתאריך.",
          ],
          bestPracticeHe: [
            "הפעל Change Documents מתחילת-המימוש.",
            "בדוק את היומן כשלב-קבוע בתחקור-תקלות-רשימה.",
          ],
          interviewHe: [
            { qHe: "מה מתעד ה-Action Log?", aHe: "כל שינוי ברשימת-המשימות — מי, מה ומתי — מבוסס Change Documents (CDHDR/CDPOS). כלי-ביקורת ומעקב-תצורה." },
          ],
          takeawaysHe: [
            "Action Log = יומן-שינויים של הרשימה.",
            "מבוסס Change Documents (CDHDR/CDPOS).",
            "כלי-ביקורת לתחקור 'מי שינה מה'.",
          ],
          relatedHe: [{ labelHe: "PM Academy · יומן-פעולות", href: "/library/pm-academy/chapter-06/" }],
        },
        {
          id: "5.3.4",
          titleHe: "תמחור רשימת משימות",
          titleEn: "Task List Costing",
          execHe:
            "תמחור רשימת-המשימות מחשב את עלות-התחזוקה המתוכננת מתוך הפעולות: זמני-תקן × תעריפי-Activity (עבודה) + עלות-חלפים (BOM) + שירותים-חיצוניים. זה נותן אומדן-עלות לפני-ביצוע ובסיס לתקצוב-תחזוקה.",
          beginnerHe:
            "לפני שמבצעים עבודה, כדאי לדעת כמה היא תעלה. SAP מחשב זאת מתוך הרשימה: כמה שעות-עבודה (לפי הזמנים שהזנת) כפול תעריף-שעה, ועוד מחיר-החלפים. כך מקבלים מחיר-מתוכנן לעבודה.",
          consultantHe:
            "Costing ברמת-רשימה מסתמך על Work Center → Cost Center + Activity Types, ותעריפי KP26. עלות-עבודה = Standard Values (PLPO) × תעריף-Activity. עלות-חומר = רכיבי-PLMZ × מחיר-MBEW. שירות-חיצוני (Control Key PM02) → עלות-PR/PO. ב-IA16/IA17 ניתן להציג-תמחור רשימה. העלות-המתוכננת בפק\"ע נגזרת מאותה לוגיקה ומשמשת להשוואת Planned vs Actual.",
          purposeHe:
            "אומדן-עלות מראש: תקצוב, אישור-עבודה והשוואת מתוכנן-מול-בפועל לבקרת-יעילות-תחזוקה.",
          processExampleHe:
            "רשימת 'Overhaul-מנוע': 8 שעות-עבודה × 200₪ + חלפים 1,500₪ = 3,100₪ עלות-מתוכננת. הפק\"ע נושאת אומדן זה; אחרי-ביצוע משווים לבפועל ב-IW38/דוחות-CO.",
          scenarioHe:
            "בארגון עלות-שירות-Filler המתוכננת (עבודה + O-rings + שסתומים) מתוקצבת מראש; חריגה בפועל מסמנת בעיה (חלפים יקרים/זמן-עודף) לתחקור.",
          navHe: [
            "Controlling ► Cost Center Accounting ► Planning ► Activity Output/Prices ► Define Activity Prices (KP26)",
            "Plant Maintenance and Customer Service ► Maintenance and Service Processing ► Maintenance and Service Orders ► Costing Data for Order Types",
          ],
          tables: ["PLPO", "PLMZ", "CRCO", "MBEW", "AFVC"],
          tcodes: ["IA16", "IA17", "KP26", "OKP1"],
          fiori: ["F2773"],
          configHe: [
            "Costing Variant ל-Order Type (Planned/Actual).",
            "Activity Types + KP26 (תעריפים) למרכזי-העבודה.",
            "Valuation לחלפים (MBEW) לעלות-חומר.",
          ],
          masterDataHe: [
            "Work Center ↔ Cost Center ↔ Activity Type (CRCO).",
            "KP26 — תעריף לכל Activity Type.",
            "MBEW — מחיר-חלפים לעלות-חומר.",
          ],
          mistakesHe: [
            "תעריפי KP26 חסרים — עלות-עבודה מתוכננת אפס.",
            "חלפים ללא מחיר-MBEW — עלות-חומר חסרה.",
            "Costing Variant שגוי ל-Order Type — תמחור לא רץ.",
          ],
          troubleshootHe: [
            "עלות-מתוכננת אפס ➔ KP26/Activity Type חסרים.",
            "עלות-חומר חסרה ➔ הקצאת-BOM או מחיר-MBEW חסרים.",
            "תמחור נכשל ➔ Costing Variant לא מוגדר ל-Order Type.",
          ],
          bestPracticeHe: [
            "תחזק תעריפי KP26 עדכניים בכל שנת-תכנון.",
            "ודא BOM-חלפים מתומחר ברשימה.",
            "השווה Planned vs Actual כשגרת-בקרה.",
          ],
          interviewHe: [
            { qHe: "כיצד מחושבת עלות-עבודה מתוכננת ברשימת-משימות?", aHe: "Standard Values (זמני-תקן ב-PLPO) × תעריף-Activity (KP26) של מרכז-העבודה. נוסף לעלות-חלפים מ-BOM ולשירות-חיצוני." },
            { qHe: "מה תפקיד KP26 בתמחור-תחזוקה?", aHe: "הוא קובע את תעריף ה-Activity Type לכל מרכז-עבודה — הבסיס להמרת שעות-עבודה לעלות-כספית." },
          ],
          takeawaysHe: [
            "עלות = זמני-תקן × תעריף-Activity + חלפים + שירות-חיצוני.",
            "תלוי ב-Work Center↔Cost Center↔Activity Type + KP26.",
            "מאפשר אומדן-מראש והשוואת Planned/Actual.",
          ],
          relatedHe: [{ labelHe: "PM Academy · תמחור-תחזוקה", href: "/library/pm-academy/chapter-06/" }],
        },
        {
          id: "5.3.5",
          titleHe: "שינויים מרובים",
          titleEn: "Mass Changes",
          execHe:
            "שינויים-מרובים (Mass Changes) מאפשרים לעדכן שדות ברשימות-משימות רבות בבת-אחת — למשל החלפת Work Center, עדכון זמני-תקן או שינוי Control Key על-פני מאות פעולות. כלי-יעילות קריטי לתחזוקת-נתוני-אב בקנה-מידה.",
          beginnerHe:
            "אם מרכז-עבודה השתנה והוא מופיע ב-300 רשימות, לא תרצה לערוך כל אחת ידנית. Mass Change מאפשר 'מצא-והחלף' על הרבה רשימות בבת-אחת — שינוי אחד, מאות עדכונים.",
          consultantHe:
            "ב-IA08 וכלי Mass Change (וגם CA85/CA95 להחלפת Work Center / PRT ברשימות) מבצעים החלפה גורפת לפי Selection. שינויים נפוצים: החלפת Work Center (CA85), החלפת רכיב/PRT, עדכון Standard Values. יש לעבוד עם Change Documents פעילים כדי לתעד, ולבצע בסביבת-בדיקה תחילה. ב-S/4HANA חלק מהפעולות נתמכות גם דרך Mass Maintenance ו-Fiori.",
          purposeHe:
            "לתחזק נתוני-אב בקנה-מידה ביעילות ובעקביות: שינוי-ארגוני (מרכז-עבודה, תעריף, נוהל) מתפשט לכל הרשימות בלי טעויות-ידניות.",
          processExampleHe:
            "מרכז-העבודה 'MECH-01' אוחד ל-'MECH-A'; המהנדס מריץ CA85 להחלפת Work Center בכל הרשימות הרלוונטיות — 280 פעולות מתעדכנות בהרצה אחת.",
          scenarioHe:
            "בארגון כשמוקם צוות-תחזוקה חדש לאזור-המילוי, Mass Change מעביר את כל רשימות-ה-Filler ל-Work Center החדש בבת-אחת — בלי לגעת בכל רשימה.",
          navHe: [
            "Logistics ► Plant Maintenance ► Maintenance Planning ► Task Lists ► Extras ► Mass Change",
            "Production ► Master Data ► Routings ► Extras ► Replace Work Center (CA85)",
          ],
          tables: ["PLKO", "PLPO", "PLFH", "CDHDR"],
          tcodes: ["IA08", "CA85", "CA95", "IA05"],
          fiori: ["F2773"],
          configHe: [
            "הפעלת Change Documents לתיעוד שינויים-מרובים.",
            "הרשאות ל-Mass Change / Replace Work Center.",
            "Selection Variants להגדרת היקף-השינוי.",
          ],
          mistakesHe: [
            "הרצת Mass Change בלי Selection מדויק — עדכון רשימות שגויות.",
            "ביצוע ישירות בסביבת-ייצור בלי בדיקה.",
            "Change Documents כבויים — אין מעקב למה ששונה.",
          ],
          troubleshootHe: [
            "שינוי השפיע על רשימות לא-מכוונות ➔ Selection רחב מדי; שחזר מ-Change Documents.",
            "Work Center לא הוחלף ➔ CA85 לא כיסה את ה-Plant/Usage הנכונים.",
          ],
          bestPracticeHe: [
            "בדוק Selection בתצוגה-מקדימה לפני ביצוע.",
            "הרץ בסביבת-בדיקה תחילה.",
            "ודא Change Documents פעילים לתיעוד.",
          ],
          interviewHe: [
            { qHe: "מתי משתמשים ב-Mass Change לרשימות-משימות?", aHe: "כשצריך לעדכן שדה (Work Center, זמן-תקן, Control Key) ברשימות רבות בו-זמנית — למשל CA85 להחלפת Work Center על-פני מאות פעולות." },
            { qHe: "איזו זהירות נדרשת ב-Mass Change?", aHe: "Selection מדויק, בדיקה בסביבת-טסט, ו-Change Documents פעילים לתיעוד ושחזור." },
          ],
          takeawaysHe: [
            "Mass Change = עדכון רשימות רבות בבת-אחת.",
            "CA85/CA95 להחלפת Work Center/PRT.",
            "דורש Selection מדויק, בדיקה ותיעוד.",
          ],
          relatedHe: [{ labelHe: "PM Academy · שינויים-מרובים", href: "/library/pm-academy/chapter-06/" }],
        },
      ],
    },
    // ============================================================ 5.4
    {
      id: "5.4",
      titleHe: "תוכניות תחזוקה מבוססות זמן",
      titleEn: "Time-Based Maintenance Plans",
      execHe:
        "תוכנית-תחזוקה מבוססת-זמן מתזמנת תחזוקה לפי לוח-זמנים קלנדרי קבוע — כל X ימים/שבועות/חודשים — ללא תלות בשימוש-בפועל. זהו הסוג הנפוץ והפשוט ביותר, מתאים לעבודות-תחזוקה התלויות בזמן (סיכה, ביקורת, החלפה-תקופתית).",
      beginnerHe:
        "כמו 'כל 3 חודשים תבדוק את מטף-הכיבוי' — לא חשוב כמה השתמשת, פשוט לפי לוח-השנה. אתה אומר ל-SAP 'כל 90 יום' והוא יוצר אוטומטית את העבודה במועד. שני תת-סוגים: מחזור-יחיד (פשוט, מחזור אחד) ואסטרטגיה (מספר מחזורים — חודשי/רבעוני/שנתי יחד).",
      consultantHe:
        "תוכנית מבוססת-זמן נשענת על Cycle (יחידת-זמן + מרווח) או על Strategy (חבילת Packages זמניים). פרמטרי-תזמון מרכזיים: Cycle/Package, Scheduling Period, Call Horizon (% מהמחזור שבו נוצרת הקריאה מראש), Shift Factors (להזזת-מועדים לפי Completion מוקדם/מאוחר), Tolerances (+/-) ו-Factory Calendar. התזמון (IP10) מחשב Planned Date → Call Date ויוצר Call Object. Completion Confirmation מתזמן את הקריאה-הבאה (Cycle Start חדש).",
      purposeHe:
        "למכן תחזוקה התלויה-בזמן: לוודא שעבודות-תקופתיות מתבצעות במועדן ללא שכחה אנושית, ולספק נראות-קדימה (Call Horizon) לתכנון-משאבים.",
      processExampleHe:
        "ביקורת-בטיחות-מעלית כל 6 חודשים: תוכנית מבוססת-זמן עם Cycle=6M, Call Horizon=80%. ב-IP10 SAP יוצר את הקריאה ~5 חודשים אחרי-הקודמת (80% מהמחזור), מאפשר תכנון, ובמועד נוצרת פק\"ע.",
      scenarioHe:
        "בארגון סיכה-שבועית של Filler: תוכנית מבוססת-זמן Cycle=1W; כל שבוע נוצרת פק\"ע-סיכה קצרה שמשובצת לחלון-CIP. אם השלימו מאוחר, Shift Factor מזיז את המחזור הבא בהתאם.",
      navHe: [
        "Plant Maintenance and Customer Service ► Maintenance Plans, Work Centers, Task Lists and PRTs ► Maintenance Plans ► Set Maintenance Plan Categories",
        "Plant Maintenance and Customer Service ► Maintenance Plans, Work Centers, Task Lists and PRTs ► Maintenance Plans ► Set List Editing for Maintenance Items / Plans",
      ],
      tables: ["MPLA", "MPOS", "MHIS", "MHIO", "T351"],
      tcodes: ["IP41", "IP42", "IP10", "IP24", "IP30"],
      fiori: ["F2773", "F4439"],
      configHe: [
        "Maintenance Plan Category (Single cycle / Strategy plan) מקושר ל-Call Object.",
        "Scheduling Parameters: Call Horizon, Shift Factors, Tolerances.",
        "Factory Calendar לחישוב-מועדים.",
        "Strategy + Packages (T351/T351P) לתוכנית-אסטרטגיה.",
      ],
      flow: [
        { he: "צור תוכנית מבוססת-זמן", code: "IP41/IP42", note: "MPLA" },
        { he: "הגדר Cycle/Strategy", code: "Cycle", note: "יחידת-זמן + מרווח" },
        { he: "תזמן (Start)", code: "IP10", note: "Planned→Call Date" },
        { he: "Call Object → פק\"ע", code: "MHIO", note: "במועד" },
        { he: "השלמה מתזמנת הבא", code: "TECO", note: "Shift Factor" },
      ],
      masterDataHe: [
        "Equipment/FL = אובייקט-היעד.",
        "Task List = העבודה לכל קריאה.",
        "Factory Calendar = בסיס-חישוב-המועדים.",
      ],
      mistakesHe: [
        "Call Horizon=100% — אין נראות-קדימה לתכנון.",
        "Factory Calendar שגוי — מועדים נופלים בחגים/סופ\"ש.",
        "אי-הבנת Shift Factor — מועדים 'נסחפים' אחרי Completion מאוחר.",
        "בחירת Single-cycle כשנדרשת Strategy (מספר מחזורים).",
      ],
      troubleshootHe: [
        "קריאות לא נוצרות ➔ התוכנית לא תוזמנה (IP10 Start) או Call Horizon לא הגיע.",
        "מועדים שגויים ➔ Factory Calendar/Cycle/Shift Factor שגויים.",
        "מחזור-בא לא זז ➔ Scheduling Indicator (Time vs Time-key-date) שגוי.",
      ],
      bestPracticeHe: [
        "קבע Call Horizon סביר (70–90%) לנראות-תכנון.",
        "השתמש ב-Strategy Plan כשיש מחזורים מרובים-מקוננים.",
        "ודא Factory Calendar מתאים למפעל.",
        "נטר תוכניות ב-IP24 (Scheduling Overview).",
      ],
      interviewHe: [
        { qHe: "מהי תוכנית מבוססת-זמן?", aHe: "תוכנית המתזמנת תחזוקה לפי לוח קלנדרי קבוע (כל X זמן) ללא תלות בשימוש-בפועל. הסוג הפשוט והנפוץ ביותר." },
        { qHe: "מה תפקיד ה-Call Horizon?", aHe: "אחוז מהמחזור שבו נוצרת הקריאה מראש (לפני המועד) — מאפשר נראות ותכנון-משאבים. 100% = קריאה רק במועד עצמו." },
        { qHe: "מה עושה Shift Factor?", aHe: "מזיז את מועד-המחזור-הבא בהתאם לסטייה בין מועד-מתוכנן למועד-Completion בפועל (מוקדם/מאוחר)." },
      ],
      takeawaysHe: [
        "מבוסס-זמן = תזמון קלנדרי קבוע, ללא תלות-שימוש.",
        "שני תת-סוגים: מחזור-יחיד ואסטרטגיה.",
        "פרמטרים: Call Horizon, Shift Factor, Tolerance, Factory Calendar.",
        "Completion מתזמן את הקריאה-הבאה.",
      ],
      relatedHe: [
        { labelHe: "PM Academy · תוכניות מבוססות-זמן", href: "/library/pm-academy/chapter-06/" },
        { labelHe: "אובייקט · MHIS", href: "/library/pm/object/MHIS/" },
      ],
      children: [
        {
          id: "5.4.1",
          titleHe: "תוכנית מחזור יחיד מבוססת זמן",
          titleEn: "Time-Based Single-Cycle Plan",
          execHe:
            "תוכנית מחזור-יחיד מבוססת-זמן (Single Cycle) היא הסוג הפשוט ביותר: מחזור-זמן אחד (למשל כל 30 יום) עם רשימת-משימות אחת. נוצרת ב-IP41 ללא צורך באסטרטגיה — אידיאלית לעבודה-תקופתית בודדת.",
          beginnerHe:
            "מחזור-יחיד = 'כל 30 יום, תעשה את העבודה הזו'. מחזור אחד, עבודה אחת. הכי קל להגדיר: IP41, הזן 'כל 30 יום', חבר רשימת-משימות, תזמן — וזהו.",
          consultantHe:
            "ב-IP41 בוחרים Maintenance Plan Category מבוסס-Single-cycle, מזינים Cycle (יחידת-זמן + מרווח, למשל 30 D), Cycle Unit, ומקשרים Task List + Reference Object בפריט. אין Strategy. פרמטרי-תזמון (Call Horizon, Shift Factor, Tolerance) זהים. IP10 מתזמן; כל Completion מאתחל מחזור-חדש מתאריך-ההשלמה (Time) או מתאריך-מתוכנן (Time – key date).",
          purposeHe:
            "פתרון פשוט ומהיר לעבודת-תחזוקה תקופתית-בודדת בלי מורכבות-אסטרטגיה.",
          processExampleHe:
            "החלפת-מסנן כל 30 יום: IP41 עם Cycle=30D, רשימת 'החלפת-מסנן', Reference Object = יחידת-AHU. IP10 מתזמן; כל חודש נוצרת פק\"ע אחת.",
          scenarioHe:
            "בארגון ניקוי-חיישני-Filler כל 30 יום: תוכנית מחזור-יחיד פשוטה שיוצרת פק\"ע-ניקוי חודשית לכל קו-מילוי.",
          navHe: [
            "Logistics ► Plant Maintenance ► Maintenance Planning ► Maintenance Plans ► Create ► Single Cycle Plan (IP41)",
          ],
          tables: ["MPLA", "MPOS", "MHIS"],
          tcodes: ["IP41", "IP10", "IP24"],
          fiori: ["F2773"],
          configHe: [
            "Maintenance Plan Category מסוג Single-cycle.",
            "Cycle Unit (D/W/M) + מרווח.",
            "Scheduling Parameters (Call Horizon/Shift/Tolerance).",
          ],
          flow: [
            { he: "IP41 — תוכנית מחזור-יחיד", code: "IP41", note: "MPLA" },
            { he: "הזן Cycle (30D)", code: "Cycle" },
            { he: "חבר Task List + Object", code: "MPOS" },
            { he: "תזמן", code: "IP10", note: "Start" },
            { he: "פק\"ע חודשית", code: "Order" },
          ],
          masterDataHe: [
            "Reference Object (Equipment/FL).",
            "Task List אחת.",
          ],
          mistakesHe: [
            "בחירת מחזור-יחיד כשנדרשים מחזורים מרובים — צריך Strategy Plan.",
            "Cycle Unit שגוי (יום במקום חודש).",
          ],
          troubleshootHe: [
            "פק\"ע לא נוצרת ➔ לא תוזמן (IP10) או Cycle לא הגיע.",
            "תדירות שגויה ➔ Cycle/Cycle Unit שגויים.",
          ],
          bestPracticeHe: [
            "השתמש במחזור-יחיד לעבודה-תקופתית-בודדת בלבד.",
            "עבור ל-Strategy Plan ברגע שיש מחזורים מרובים.",
          ],
          interviewHe: [
            { qHe: "מתי בוחרים תוכנית מחזור-יחיד?", aHe: "כשיש מחזור-זמן אחד ועבודה אחת — הפתרון הפשוט ביותר, ללא אסטרטגיה. נוצר ב-IP41." },
            { qHe: "מה ההבדל בין Single-cycle ל-Strategy Plan?", aHe: "Single-cycle = מחזור אחד; Strategy Plan = מספר Packages/מחזורים (חודשי+רבעוני+שנתי) באותה תוכנית." },
          ],
          takeawaysHe: [
            "מחזור-יחיד = מחזור אחד, עבודה אחת.",
            "נוצר ב-IP41, ללא Strategy.",
            "הפתרון הפשוט ביותר לתחזוקה-תקופתית.",
          ],
          relatedHe: [{ labelHe: "PM Academy · מחזור-יחיד", href: "/library/pm-academy/chapter-06/" }],
        },
        {
          id: "5.4.2",
          titleHe: "תוכנית אסטרטגיה מבוססת זמן",
          titleEn: "Time-Based Strategy Plan",
          execHe:
            "תוכנית-אסטרטגיה מבוססת-זמן משלבת מספר מחזורי-זמן (Packages) בתוכנית אחת — חודשי, רבעוני, שנתי — כך שבכל מועד מתבצעות רק הפעולות הרלוונטיות לאותו מחזור. זה ה'דפוס-תחזוקה' המתוחכם שחוסך פק\"ע נפרדות.",
          beginnerHe:
            "דמיין תחזוקת-רכב: כל חודש בדיקת-לחץ-אוויר, כל 3 חודשים החלפת-שמן, כל שנה טיפול-גדול. במקום 3 תוכניות נפרדות, אסטרטגיה אחת מנהלת את כולן: SAP יודע שבטיפול-השנתי מבצעים גם את החודשי והרבעוני (Hierarchy).",
          consultantHe:
            "האסטרטגיה (T351) מגדירה Packages — לכל Package מחזור (1M, 3M, 12M), Hierarchy ו-Offset. הפעולות ברשימת-המשימות (PLPO) מסומנות לאילו Packages הן שייכות. בתזמון (IP10), כל מועד 'יורה' את ה-Packages שמגיעים בו (כולל הקטנים-המקוננים לפי Hierarchy). פרמטרים: Package Sequence, Hierarchy (האם מחזור-גדול כולל קטנים), Offset (היסט-התחלה). זה מאחד מחזורים-מרובים בפק\"ע אחת לכל מועד.",
          purposeHe:
            "לנהל דפוס-תחזוקה רב-מחזורי באובייקט יחיד ביעילות — פחות תוכניות, איחוד-עבודות במועד-משותף, פחות השבתות.",
          processExampleHe:
            "תחזוקת-מדחס: Strategy עם Packages 1M (בדיקה), 3M (החלפת-מסנן), 12M (Overhaul). בחודש ה-12 'יורים' כל השלושה יחד בפק\"ע אחת — חוסך 3 עצירות נפרדות.",
          scenarioHe:
            "בארגון אסטרטגיית-Filler: 1W סיכה, 1M כיול-בסיסי, 6M Overhaul. ה-Overhaul החצי-שנתי כולל את הסיכה והכיול — עצירה אחת מקיפה במקום שלוש.",
          navHe: [
            "Plant Maintenance and Customer Service ► Preventive Maintenance ► Maintenance Plans ► Maintenance Strategies ► Set Maintenance Strategies",
            "Logistics ► Plant Maintenance ► Maintenance Planning ► Maintenance Plans ► Create ► Strategy Plan (IP42)",
          ],
          tables: ["T351", "T351P", "MPLA", "MPOS", "PLPO"],
          tcodes: ["IP11", "IP42", "IP10", "IP24"],
          fiori: ["F2773"],
          configHe: [
            "IP11 — הגדרת Strategy + Packages (מחזור, Hierarchy, Offset).",
            "סימון Maintenance Packages לפעולות ברשימת-המשימות.",
            "Scheduling Indicator (Time / Time-key-date).",
          ],
          flow: [
            { he: "הגדר Strategy + Packages", code: "IP11", note: "T351/T351P" },
            { he: "שייך Packages לפעולות", code: "PLPO" },
            { he: "צור תוכנית-אסטרטגיה", code: "IP42", note: "MPLA" },
            { he: "תזמן", code: "IP10", note: "כל Package במועדו" },
            { he: "Package במועד → פק\"ע", code: "Order", note: "פעולות רלוונטיות בלבד" },
          ],
          masterDataHe: [
            "Strategy (T351) + Packages (T351P).",
            "Task List עם פעולות מסומנות-Packages.",
            "Reference Object.",
          ],
          mistakesHe: [
            "אי-סימון פעולות ל-Packages — פעולות לא רצות באף מחזור.",
            "Hierarchy שגוי — מחזור-גדול לא כולל את הקטנים.",
            "ערבוב אסטרטגיות זמן וביצוע באותה תוכנית.",
          ],
          troubleshootHe: [
            "פעולה לא רצה ➔ לא מסומנת לאף Package.",
            "מחזורים לא מתאחדים ➔ Hierarchy/Package Sequence שגוי.",
            "Offset שגוי ➔ מחזור מתחיל מוקדם/מאוחר מהצפוי.",
          ],
          bestPracticeHe: [
            "השתמש ב-Hierarchy לאיחוד-עבודות בעצירה אחת.",
            "תקנן אסטרטגיות (חודשי/רבעוני/שנתי) לשימוש-חוזר.",
            "ודא שכל פעולה משויכת ל-Package אחד לפחות.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין Single-cycle ל-Strategy Plan?", aHe: "Single-cycle = מחזור-זמן אחד; Strategy Plan = מספר Packages (1M/3M/12M) באותה תוכנית, עם Hierarchy שמאחד מחזורים-מקוננים בעצירה אחת." },
            { qHe: "מה תפקיד ה-Hierarchy ב-Package?", aHe: "קובע אם מחזור-גדול (שנתי) כולל אוטומטית את הקטנים (חודשי/רבעוני) באותו מועד — לאיחוד-עבודות." },
            { qHe: "כיצד פעולה ברשימה 'יודעת' לאיזה מחזור היא שייכת?", aHe: "מסמנים לה את ה-Maintenance Packages הרלוונטיים ברמת-הפעולה (PLPO); בתזמון רצות רק הפעולות של ה-Package שהגיע." },
          ],
          takeawaysHe: [
            "Strategy Plan = מספר מחזורים (Packages) בתוכנית אחת.",
            "פעולות מסומנות ל-Packages; Hierarchy מאחד מקוננים.",
            "מאחד עבודות-רבות בפק\"ע אחת לכל מועד.",
          ],
          relatedHe: [
            { labelHe: "PM Academy · תוכניות-אסטרטגיה", href: "/library/pm-academy/chapter-06/" },
            { labelHe: "אובייקט · T351", href: "/library/pm/object/T351/" },
          ],
        },
      ],
    },
    // ============================================================ 5.5
    {
      id: "5.5",
      titleHe: "תוכניות תחזוקה מבוססות ביצוע",
      titleEn: "Performance-Based Maintenance Plans",
      execHe:
        "תוכנית-תחזוקה מבוססת-ביצוע מתזמנת תחזוקה לפי שחיקה-בפועל — קריאות-מונה (Counter): כל 10,000 שע'-פעולה, כל 50,000 ק\"מ, כל 1,000,000 יחידות. במקום לוח-זמנים, התחזוקה מונעת מהשימוש-האמיתי בנכס, מה שמדויק יותר לציוד עם עומס-משתנה.",
      beginnerHe:
        "במקום 'כל שנה', זה 'כל 10,000 שעות-עבודה'. SAP צריך 'מונה' שמודד את השימוש (כמו מד-קילומטר ברכב). אתה רושם תקופתית את קריאת-המונה (IK11), ו-SAP מחשב מתי המונה יגיע לסף-הבא ויוצר את הפק\"ע אז. מתאים לציוד שעובד יותר בעונה מסוימת.",
      consultantHe:
        "מבוסס על Measuring Point/Counter (IK01) המקושר לאובייקט-טכני. קריאות-מונה (IK11/IK7x — IMRG/IMPTT) מזינות צריכה. ה-Annual Estimate (אומדן-צריכה-שנתי) משמש להמרת-זמן→מונה ולחיזוי מועד-הקריאה הבא. פרמטרי-תזמון: Cycle בערכי-מונה, Call Horizon, Shift Factor. התזמון (IP10) משתמש בקריאות-המונה האחרונות + Annual Estimate כדי לחזות מתי ייצבר Cycle-נוסף. ללא קריאות-מונה עדכניות, התחזית מסתמכת על האומדן בלבד.",
      purposeHe:
        "להתאים תחזוקה לשחיקה-בפועל ולא ללוח-שרירותי — חוסך תחזוקת-יתר בציוד פחות-פעיל ומונע תחזוקת-חסר בציוד עמוס. דיוק גבוה יותר לעלות ולאמינות.",
      processExampleHe:
        "מדחס עם תחזוקה כל 4,000 שע'-פעולה: Measuring Point לשעות-פעולה; קריאות-מונה שבועיות; Annual Estimate=8,000 שע'/שנה. SAP חוזה שהסף-הבא ייגבר בעוד ~6 חודשים ויוצר פק\"ע אז.",
      scenarioHe:
        "בארגון כיול-שסתומי-Filler כל 5,000,000 מילויים: Measuring Point סופר-מילויים; קריאה אוטומטית מ-PLC/SCADA (או ידנית IK11). בעונת-שיא (קיץ) הקריאות תכופות יותר — התחזוקה מתאימה לשימוש-האמיתי.",
      navHe: [
        "Plant Maintenance and Customer Service ► Technical Objects ► Measuring Points, Counters, Measurement Documents ► Define Field Selection for Measuring Points",
        "Plant Maintenance and Customer Service ► Maintenance Plans, Work Centers, Task Lists and PRTs ► Maintenance Plans ► Set Maintenance Plan Categories",
      ],
      tables: ["IMPTT", "IMRG", "MPLA", "MPOS", "MHIS"],
      tcodes: ["IK01", "IK11", "IP41", "IP42", "IP10"],
      fiori: ["F2773", "F4439"],
      configHe: [
        "Measuring Point/Counter Category + Field Selection.",
        "Annual Estimate (אומדן-צריכה) בכותרת-המונה.",
        "Maintenance Plan Category (Performance Single/Strategy).",
        "Scheduling Parameters בערכי-מונה.",
      ],
      flow: [
        { he: "צור Measuring Point/Counter", code: "IK01", note: "IMPTT" },
        { he: "צור תוכנית מבוססת-ביצוע", code: "IP41/IP42", note: "Cycle בערכי-מונה" },
        { he: "הזן קריאות-מונה", code: "IK11", note: "IMRG" },
        { he: "תזמן (חיזוי לפי Annual Estimate)", code: "IP10" },
        { he: "סף-מונה → פק\"ע", code: "Order" },
      ],
      masterDataHe: [
        "Measuring Point/Counter (IMPTT) מקושר לאובייקט.",
        "Annual Estimate — בסיס-חיזוי המועד.",
        "Measurement Documents (IMRG) — קריאות בפועל.",
      ],
      mistakesHe: [
        "Annual Estimate שגוי — חיזוי-מועדים רחוק מהמציאות.",
        "אי-הזנת קריאות-מונה — אין נתונים, התזמון 'תקוע' על אומדן.",
        "Counter במקום Measuring Point או להפך — בלבול-קונספט.",
        "בחירת מבוסס-ביצוע לעבודה התלויה-בזמן (סיכה קלנדרית).",
      ],
      troubleshootHe: [
        "פק\"ע לא נוצרת ➔ אין קריאות-מונה או Annual Estimate חסר.",
        "מועד-חיזוי לא הגיוני ➔ Annual Estimate שגוי או קריאות לא-עקביות.",
        "מונה 'קופץ' ➔ קריאה שגויה (Counter overflow/reset לא מטופל).",
      ],
      bestPracticeHe: [
        "תחזק Annual Estimate ריאלי ועדכן לפי-עונה.",
        "הזרם קריאות-מונה אוטומטית מ-SCADA/IoT היכן שאפשר.",
        "השתמש במבוסס-ביצוע לציוד עם עומס-משתנה.",
        "נטר עקביות-קריאות לזיהוי-תקלות-מדידה.",
      ],
      interviewHe: [
        { qHe: "מהי תוכנית מבוססת-ביצוע?", aHe: "תוכנית המתזמנת תחזוקה לפי קריאות-מונה (Counter) — צריכה/שחיקה בפועל (שעות, ק\"מ, יחידות) — במקום לוח קלנדרי." },
        { qHe: "מה תפקיד ה-Annual Estimate?", aHe: "אומדן-הצריכה-השנתי משמש לחזות מתי המונה יגיע לסף-הבא, ולהמיר זמן↔מונה כשחסרות קריאות." },
        { qHe: "מה ההבדל בין Measuring Point ל-Counter?", aHe: "Measuring Point מודד ערך-רגעי (טמפ', לחץ); Counter מודד ערך-מצטבר (שעות, יחידות) — והוא הבסיס לתחזוקה מבוססת-ביצוע." },
      ],
      takeawaysHe: [
        "מבוסס-ביצוע = תזמון לפי מונה (שחיקה-בפועל).",
        "דורש Measuring Point/Counter + קריאות + Annual Estimate.",
        "מדויק לציוד עם עומס-משתנה.",
        "שני תת-סוגים: מחזור-יחיד ואסטרטגיה.",
      ],
      relatedHe: [
        { labelHe: "PM Academy · תוכניות מבוססות-ביצוע", href: "/library/pm-academy/chapter-06/" },
        { labelHe: "אובייקט · IMPTT", href: "/library/pm/object/IMPTT/" },
      ],
      children: [
        {
          id: "5.5.1",
          titleHe: "תוכנית מחזור יחיד מבוססת ביצוע",
          titleEn: "Performance-Based Single-Cycle Plan",
          execHe:
            "תוכנית מחזור-יחיד מבוססת-ביצוע: מחזור-מונה אחד (למשל כל 1,000 שע') עם רשימת-משימות אחת, מקושרת ל-Counter יחיד. הפשוט ביותר מבין מבוססות-הביצוע.",
          beginnerHe:
            "'כל 1,000 שעות-עבודה, תעשה את העבודה הזו'. מונה אחד, מחזור אחד, עבודה אחת. רושמים את שעות-המונה, ו-SAP יודע מתי ה-1,000 הבא יגיע.",
          consultantHe:
            "ב-IP41 בוחרים Category מבוסס-ביצוע (Single-cycle), מקשרים Counter יחיד, ומזינים Cycle בערכי-מונה (1,000 H). אין Strategy. Annual Estimate ב-Counter מאפשר חיזוי-מועד. IP10 מחשב Planned Counter Reading הבא לפי קריאות + Estimate; כשהקריאה-בפועל מתקרבת לסף (Call Horizon), נוצרת קריאה.",
          purposeHe:
            "פתרון פשוט לתחזוקה מבוססת-שחיקה-בודדת — מחזור-מונה יחיד בלי מורכבות-אסטרטגיה.",
          processExampleHe:
            "החלפת-שמן-מדחס כל 1,000 שע': Counter שעות-פעולה, Cycle=1000H, רשימת 'החלפת-שמן'. קריאות שבועיות; SAP יוצר פק\"ע סביב כל 1,000 שע'.",
          scenarioHe:
            "בארגון החלפת-מסנן-מים כל 2,000 שע'-פעולה של יחידת-הטיהור: מחזור-יחיד מבוסס-ביצוע על Counter-השעות.",
          navHe: [
            "Logistics ► Plant Maintenance ► Maintenance Planning ► Maintenance Plans ► Create ► Single Cycle Plan (IP41)",
          ],
          tables: ["MPLA", "MPOS", "IMPTT", "IMRG"],
          tcodes: ["IK01", "IP41", "IK11", "IP10"],
          fiori: ["F2773"],
          configHe: [
            "Category מבוסס-ביצוע (Single-cycle).",
            "קישור Counter יחיד + Annual Estimate.",
            "Cycle בערכי-מונה.",
          ],
          flow: [
            { he: "צור Counter", code: "IK01" },
            { he: "IP41 — מחזור-יחיד מבוסס-ביצוע", code: "IP41" },
            { he: "Cycle 1000H + Task List", code: "Cycle" },
            { he: "הזן קריאות", code: "IK11" },
            { he: "סף → פק\"ע", code: "Order" },
          ],
          masterDataHe: ["Counter יחיד + Annual Estimate.", "Task List אחת."],
          mistakesHe: [
            "אי-קישור Counter — אין בסיס-תזמון.",
            "Annual Estimate חסר — חיזוי נכשל.",
          ],
          troubleshootHe: [
            "פק\"ע לא נוצרת ➔ Counter לא מקושר / אין קריאות / Estimate חסר.",
            "מועד שגוי ➔ Annual Estimate לא ריאלי.",
          ],
          bestPracticeHe: [
            "השתמש למחזור-מונה יחיד בלבד.",
            "תחזק Annual Estimate ריאלי.",
          ],
          interviewHe: [
            { qHe: "מתי בוחרים מחזור-יחיד מבוסס-ביצוע?", aHe: "כשיש מונה יחיד ומחזור-מונה אחד (למשל כל 1,000 שע') ועבודה אחת — בלי אסטרטגיה." },
          ],
          takeawaysHe: [
            "מחזור-מונה יחיד + Counter יחיד.",
            "נוצר ב-IP41 על Counter.",
            "Annual Estimate מחייב לחיזוי.",
          ],
          relatedHe: [{ labelHe: "PM Academy · מחזור-יחיד-ביצוע", href: "/library/pm-academy/chapter-06/" }],
        },
        {
          id: "5.5.2",
          titleHe: "תוכנית אסטרטגיה מבוססת ביצוע",
          titleEn: "Performance-Based Strategy Plan",
          execHe:
            "תוכנית-אסטרטגיה מבוססת-ביצוע משלבת מספר מחזורי-מונה (Packages בערכי-מונה) בתוכנית אחת — כל 1,000 שע' בדיקה, כל 5,000 שע' שירות, כל 20,000 שע' Overhaul — כולם על אותו Counter עם Hierarchy.",
          beginnerHe:
            "כמו אסטרטגיה רגילה, אבל לפי שעות-מונה ולא לפי חודשים: כל 1,000 שע' עבודה קטנה, כל 20,000 שע' טיפול-גדול שכולל את הקטנות. הכל על אותו מד-שעות.",
          consultantHe:
            "האסטרטגיה (T351) עם Unit מסוג Performance מגדירה Packages בערכי-מונה. הפעולות ברשימה מסומנות ל-Packages. IP10 חוזה מתי כל Package-מונה ייגבר (לפי קריאות + Annual Estimate) ו'יורה' את הרלוונטיים יחד (Hierarchy). שילוב חיזוי-מונה עם דפוס-רב-מחזורי — מתוחכם אך עוצמתי לציוד-קריטי.",
          purposeHe:
            "לנהל דפוס-תחזוקה רב-רמתי לפי שחיקה-בפועל — מאחד מחזורי-מונה שונים בעצירה אחת, מותאם לעומס-האמיתי.",
          processExampleHe:
            "טורבינה: Strategy מבוסס-שעות עם 1,000H (בדיקה), 4,000H (שירות), 16,000H (Overhaul). ב-16,000H 'יורים' את כל השלושה יחד לפי Hierarchy — עצירה-מקיפה אחת.",
          scenarioHe:
            "בארגון אסטרטגיית-מונה ל-Filler לפי מילויים: 1M-מילויים ניקוי, 5M-מילויים כיול, 20M-מילויים Overhaul — כולם על Counter-המילויים, מתואמים לעונת-הייצור.",
          navHe: [
            "Plant Maintenance and Customer Service ► Preventive Maintenance ► Maintenance Plans ► Maintenance Strategies ► Set Maintenance Strategies",
            "Logistics ► Plant Maintenance ► Maintenance Planning ► Maintenance Plans ► Create ► Strategy Plan (IP42)",
          ],
          tables: ["T351", "T351P", "MPLA", "IMPTT", "IMRG"],
          tcodes: ["IP11", "IK01", "IP42", "IK11", "IP10"],
          fiori: ["F2773"],
          configHe: [
            "Strategy עם Unit מסוג Performance (IP11).",
            "Packages בערכי-מונה + Hierarchy.",
            "קישור Counter + Annual Estimate.",
          ],
          flow: [
            { he: "Strategy מבוסס-ביצוע", code: "IP11", note: "Packages בערכי-מונה" },
            { he: "שייך Packages לפעולות", code: "PLPO" },
            { he: "תוכנית-אסטרטגיה + Counter", code: "IP42" },
            { he: "תזמן (חיזוי-מונה)", code: "IP10" },
            { he: "Package-מונה → פק\"ע", code: "Order" },
          ],
          masterDataHe: [
            "Strategy (Performance) + Packages.",
            "Counter + Annual Estimate.",
            "Task List עם פעולות מסומנות.",
          ],
          mistakesHe: [
            "ערבוב Unit זמן/ביצוע באסטרטגיה — לא-תקין.",
            "Annual Estimate שגוי — כל החיזוי סוטה.",
            "פעולות לא-מסומנות ל-Packages.",
          ],
          troubleshootHe: [
            "Packages לא נורים ➔ אין קריאות/Estimate או סימון-פעולות חסר.",
            "מחזורים לא מתאחדים ➔ Hierarchy שגוי.",
          ],
          bestPracticeHe: [
            "השתמש לציוד-קריטי עם דפוס-שחיקה-רב-רמתי.",
            "תחזק Annual Estimate ריאלי לחיזוי-מדויק.",
            "ודא Hierarchy מאחד מחזורי-מונה בעצירה אחת.",
          ],
          interviewHe: [
            { qHe: "מה מייחד אסטרטגיה מבוססת-ביצוע מ-מבוססת-זמן?", aHe: "ה-Packages מוגדרים בערכי-מונה (שעות/יחידות) במקום זמן-קלנדרי, וה-IP10 חוזה את מועדיהם לפי קריאות + Annual Estimate." },
            { qHe: "האם אפשר לערבב Packages של זמן וביצוע באותה אסטרטגיה?", aHe: "לא — אסטרטגיה היא או מבוססת-זמן או מבוססת-ביצוע. שילוב מחזורי-זמן-ומונה מושג דרך Multiple Counter Plan." },
          ],
          takeawaysHe: [
            "Strategy מבוססת-ביצוע = מספר מחזורי-מונה + Hierarchy.",
            "חיזוי-מועד לפי קריאות + Annual Estimate.",
            "מתאים לציוד-קריטי עם שחיקה-רב-רמתית.",
          ],
          relatedHe: [{ labelHe: "PM Academy · אסטרטגיה-ביצוע", href: "/library/pm-academy/chapter-06/" }],
        },
      ],
    },
    // ============================================================ 5.6
    {
      id: "5.6",
      titleHe: "תוכניות מרובות מונים",
      titleEn: "Multiple-Counter Plans",
      execHe:
        "תוכנית מרובת-מונים (Multiple Counter Plan) משלבת מספר מחזורים — מזמן וממונים שונים — בקישור-לוגי OR או AND. למשל: 'כל 6 חודשים או כל 10,000 ק\"מ — מה שמגיע ראשון' (OR). זהו הסוג הגמיש ביותר, החיוני לציוד שבו גם זמן וגם שימוש קובעים שחיקה.",
      beginnerHe:
        "תחזוקת-רכב מהמציאות: 'כל שנה או כל 15,000 ק\"מ — מה שיקרה קודם'. זה בדיוק Multiple Counter עם OR. אפשר גם AND ('רק כששניהם הגיעו'). מערבבים זמן ומונים שונים בתוכנית אחת.",
      consultantHe:
        "Multiple Counter Plan מקשר מספר Maintenance Cycles, כל אחד עם יחידה משלו (זמן או מונה שונה) ו-Link (OR/AND). OR = קריאה כשהמחזור-הראשון מגיע (Earliest). AND = קריאה רק כששניהם הגיעו (Latest). שלא כמו Strategy Plan, אין Packages/Hierarchy — כל Cycle עצמאי. נוצר ב-IP43. שימושי כשציר-שחיקה כפול (זמן + שימוש) או מונים-שונים (שעות + יחידות). פרמטרי-תזמון כרגיל; כל Cycle יכול לשאת Annual Estimate נפרד.",
      purposeHe:
        "לכסות מצבי-שחיקה מורכבים שבהם יותר מציר-אחד קובע: למנוע גם תחזוקת-יתר (אם רק זמן) וגם תחזוקת-חסר (אם רק שימוש), דרך OR/AND.",
      processExampleHe:
        "רכב-תפעולי: 'כל 12 חודשים OR כל 20,000 ק\"מ'. נסיעה-מועטה ➔ הזמן מפעיל; נסיעה-רבה ➔ הק\"מ מפעיל. תמיד מה-שמגיע-ראשון — כיסוי מלא.",
      scenarioHe:
        "בארגון מלגזת-מחסן: 'כל 6 חודשים OR כל 1,000 שע'-מנוע'. בשיא-העונה השעות מפעילות מוקדם; בעונה-שקטה הזמן מבטיח טיפול-מינימלי. שני הצירים מכוסים.",
      navHe: [
        "Plant Maintenance and Customer Service ► Maintenance Plans, Work Centers, Task Lists and PRTs ► Maintenance Plans ► Set Maintenance Plan Categories",
        "Plant Maintenance and Customer Service ► Technical Objects ► Measuring Points, Counters ► Define Counter Settings",
      ],
      tables: ["MPLA", "MMPT", "MPOS", "IMPTT", "MHIS"],
      tcodes: ["IP43", "IK01", "IP10", "IP24"],
      fiori: ["F2773", "F4439"],
      configHe: [
        "Maintenance Plan Category מסוג Multiple Counter.",
        "הגדרת Cycles + Link (OR/AND).",
        "Annual Estimate לכל Cycle-מונה.",
        "Cycle Set / Cycle Modification Factor.",
      ],
      flow: [
        { he: "צור תוכנית מרובת-מונים", code: "IP43", note: "MPLA/MMPT" },
        { he: "הוסף Cycles (זמן+מונים)", code: "Cycles" },
        { he: "קבע Link (OR/AND)", code: "Link" },
        { he: "תזמן", code: "IP10", note: "Earliest/Latest" },
        { he: "תנאי מתממש → פק\"ע", code: "Order" },
      ],
      masterDataHe: [
        "מספר Counters/Measuring Points + Annual Estimate לכל אחד.",
        "Task List + Reference Object.",
      ],
      mistakesHe: [
        "בלבול OR מול AND — תדירות שגויה לחלוטין.",
        "אי-תחזוקת Annual Estimate לכל Cycle-מונה.",
        "ניסיון להשתמש ב-Packages/Hierarchy (לא קיימים כאן).",
      ],
      troubleshootHe: [
        "תדירות לא-צפויה ➔ Link (OR/AND) הפוך מהכוונה.",
        "Cycle-מונה לא מפעיל ➔ אין קריאות/Estimate.",
        "פק\"ע מוקדמת/מאוחרת מדי ➔ Tolerance/Cycle שגויים.",
      ],
      bestPracticeHe: [
        "השתמש ב-OR לבטיחות-מקסימלית (מה-שמגיע-ראשון).",
        "תעד את כוונת ה-Link בבירור.",
        "תחזק Annual Estimate לכל ציר-מונה.",
      ],
      interviewHe: [
        { qHe: "מהי תוכנית מרובת-מונים?", aHe: "תוכנית המשלבת מספר מחזורים (זמן + מונים שונים) בקישור OR/AND — למשל 'כל שנה OR כל 15,000 ק\"מ'. הגמישה ביותר." },
        { qHe: "מה ההבדל בין OR ל-AND?", aHe: "OR = קריאה כשהמחזור-הראשון מגיע (Earliest); AND = קריאה רק כששניהם הגיעו (Latest)." },
        { qHe: "במה שונה מ-Strategy Plan?", aHe: "ב-Multiple Counter אין Packages/Hierarchy — כל Cycle עצמאי עם יחידה ו-Link משלו; ב-Strategy יש מחזורים-מקוננים בהיררכיה." },
      ],
      takeawaysHe: [
        "מרובת-מונים = מספר מחזורים (זמן+מונים) עם OR/AND.",
        "OR=מה-שמגיע-ראשון; AND=כששניהם הגיעו.",
        "אין Packages/Hierarchy — Cycles עצמאיים.",
        "נוצרת ב-IP43.",
      ],
      relatedHe: [
        { labelHe: "PM Academy · תוכניות מרובות-מונים", href: "/library/pm-academy/chapter-06/" },
        { labelHe: "אובייקט · MMPT", href: "/library/pm/object/MMPT/" },
      ],
      children: [
        {
          id: "5.6.1",
          titleHe: "תוכנית מרובת מונים בסיסית",
          titleEn: "Basic Multiple-Counter Plan",
          execHe:
            "תוכנית מרובת-מונים בסיסית: שני מחזורים (למשל זמן + מונה) עם Link OR — הפק\"ע נוצרת ברגע שאחד מהם מגיע. הצורה הקלאסית של 'מה-שמגיע-ראשון'.",
          beginnerHe:
            "הגרסה הפשוטה: שני תנאים, OR. 'כל 6 חודשים או כל 1,000 שעות'. מה שמגיע ראשון מפעיל את העבודה. זהו.",
          consultantHe:
            "ב-IP43 מגדירים שני Cycles (אחד זמן, אחד מונה) ו-Link=OR. IP10 מחשב לכל Cycle את מועדו-החזוי (זמן ישירות; מונה לפי Annual Estimate + קריאות) ובוחר את ה-Earliest. אחרי-Completion, שני המחזורים מאופסים מנקודת-ההשלמה. פשוט, אך מכסה את שני הצירים.",
          purposeHe:
            "כיסוי כפול בסיסי (זמן+שימוש) בלי מורכבות — הבטחה שלא יחלוף יותר-מדי זמן ולא ייצבר יותר-מדי שימוש.",
          processExampleHe:
            "מדחס: 'כל 6M OR כל 1,000H'. אם רץ הרבה — ה-1,000H מפעיל בחודש 4; אם רץ מעט — ה-6M מפעיל. תמיד מוקדם-יותר.",
          scenarioHe:
            "בארגון משאבת-CIP: 'כל 6M OR כל 1,500 שע''. שני הצירים מובטחים בלי הגדרת-אסטרטגיה.",
          navHe: [
            "Logistics ► Plant Maintenance ► Maintenance Planning ► Maintenance Plans ► Create ► Multiple Counter Plan (IP43)",
          ],
          tables: ["MPLA", "MMPT", "IMPTT"],
          tcodes: ["IP43", "IK01", "IK11", "IP10"],
          fiori: ["F2773"],
          configHe: [
            "Category מרובת-מונים.",
            "שני Cycles + Link OR.",
            "Annual Estimate ל-Cycle-המונה.",
          ],
          flow: [
            { he: "IP43 — מרובת-מונים", code: "IP43" },
            { he: "Cycle זמן + Cycle מונה", code: "Cycles" },
            { he: "Link = OR", code: "OR" },
            { he: "תזמן (Earliest)", code: "IP10" },
            { he: "ראשון מגיע → פק\"ע", code: "Order" },
          ],
          masterDataHe: ["Counter + Annual Estimate.", "Task List + Object."],
          mistakesHe: [
            "Link=AND בטעות במקום OR — תדירות נמוכה-מדי.",
            "Annual Estimate חסר ל-Cycle-המונה.",
          ],
          troubleshootHe: [
            "תדירות נמוכה-מדי ➔ Link הוגדר AND.",
            "Cycle-מונה לא מפעיל ➔ אין קריאות/Estimate.",
          ],
          bestPracticeHe: [
            "השתמש ב-OR לכיסוי-מקסימלי.",
            "ודא Annual Estimate ריאלי לכל מונה.",
          ],
          interviewHe: [
            { qHe: "מהי תוכנית מרובת-מונים בסיסית?", aHe: "שני מחזורים (זמן+מונה) עם Link OR — פק\"ע נוצרת כשהמוקדם מבין השניים מגיע." },
          ],
          takeawaysHe: [
            "שני Cycles + OR = מה-שמגיע-ראשון.",
            "נוצרת ב-IP43.",
            "כיסוי כפול פשוט (זמן+שימוש).",
          ],
          relatedHe: [{ labelHe: "PM Academy · מרובת-מונים בסיסית", href: "/library/pm-academy/chapter-06/" }],
        },
        {
          id: "5.6.2",
          titleHe: "תוכנית מרובת מונים מורחבת",
          titleEn: "Enhanced Multiple-Counter Plan",
          execHe:
            "תוכנית מרובת-מונים מורחבת: יותר משני מחזורים, שילוב OR ו-AND, ו-Cycle Sets/Modification Factors — לדפוסי-תחזוקה מורכבים שבהם כמה צירים ותנאים-לוגיים פועלים יחד.",
          beginnerHe:
            "הגרסה המתקדמת: לא רק שני תנאים, אלא כמה — ועם תמהיל של OR ו-AND, ואפילו 'מקדם-שינוי' שמכווץ/מותח מחזורים לפי תנאים. למצבים שבהם תחזוקה תלויה בכמה גורמים בו-זמנית.",
          consultantHe:
            "מרחיב את הבסיסי עם: מספר Cycles (שעות + יחידות + זמן), Links מעורבים (OR/AND), Cycle Set ו-Cycle Modification Factor (התאמת-מחזור דינמית, למשל הקצרת-מחזור לציוד-מתבגר). ה-IP10 מעריך את כל ה-Cycles ובוחר לפי הלוגיקה-המשולבת. שימושי לציוד-קריטי עם דפוס-שחיקה מרובה-גורמים; דורש ניתוח-אמינות (RCM) כדי להגדיר נכון.",
          purposeHe:
            "לדגם דפוסי-שחיקה מורכבים-מציאותיים שבהם זמן, שעות ויחידות-ייצור משפיעים יחד — דיוק-תחזוקה מקסימלי לנכסים הקריטיים ביותר.",
          processExampleHe:
            "מנוע-קו: 'כל 4,000 שע' OR כל 2M יחידות' לשירות, 'AND כל שנה' לבדיקת-בטיחות-חובה; Modification Factor מקצר 20% אחרי 5 שנות-ותק. ה-IP10 מאזן את כל הצירים.",
          scenarioHe:
            "בארגון Filler קריטי בשיא-העונה: שילוב 'כל 1M מילויים OR כל 1,000 שע'' לשירות, 'AND כל 6M' לבטיחות, עם Modification Factor שמכווץ מחזורים לקווים-ותיקים — תחזוקה מדויקת לנכס-הליבה.",
          navHe: [
            "Plant Maintenance and Customer Service ► Maintenance Plans, Work Centers, Task Lists and PRTs ► Maintenance Plans ► Define Cycle Sets / Modification Factors",
          ],
          tables: ["MPLA", "MMPT", "MPOS", "IMPTT"],
          tcodes: ["IP43", "IK01", "IP10", "IP24"],
          fiori: ["F2773"],
          configHe: [
            "מספר Cycles עם Links מעורבים (OR/AND).",
            "Cycle Set + Cycle Modification Factor.",
            "Annual Estimate לכל Cycle-מונה.",
          ],
          flow: [
            { he: "IP43 — מרובת-מונים מורחבת", code: "IP43" },
            { he: "כמה Cycles (שעות/יחידות/זמן)", code: "Cycles" },
            { he: "Links מעורבים OR/AND", code: "Link" },
            { he: "Modification Factor", code: "Factor", note: "התאמת-מחזור" },
            { he: "תזמן (לוגיקה-משולבת)", code: "IP10" },
          ],
          masterDataHe: [
            "מספר Counters + Annual Estimate לכל אחד.",
            "Cycle Modification Factor.",
            "Task List + Object.",
          ],
          mistakesHe: [
            "לוגיקת OR/AND מורכבת-מדי בלי תיעוד — קשה לתחזק/לתחקר.",
            "Modification Factor שגוי — מחזורים מתכווצים/נמתחים שלא-לצורך.",
            "הגדרה בלי ניתוח-אמינות (RCM) — דפוס שרירותי.",
          ],
          troubleshootHe: [
            "תדירות לא-צפויה ➔ תמהיל OR/AND שגוי; בדוק כל Cycle בנפרד.",
            "מחזור מתכווץ מדי ➔ Cycle Modification Factor שגוי.",
            "Cycle לא מפעיל ➔ אין קריאות/Estimate למונה הרלוונטי.",
          ],
          bestPracticeHe: [
            "השתמש למורכבות-אמיתית בלבד; אל תסבך כשלא-נדרש.",
            "בסס את הדפוס על ניתוח-אמינות (RCM).",
            "תעד את הלוגיקה (OR/AND/Factor) בבירור.",
          ],
          interviewHe: [
            { qHe: "מה מוסיף Multiple Counter מורחב על הבסיסי?", aHe: "יותר משני Cycles, שילוב OR ו-AND, ו-Cycle Modification Factor להתאמת-מחזור דינמית — לדפוסי-שחיקה מרובי-גורמים." },
            { qHe: "מהו Cycle Modification Factor?", aHe: "מקדם המכווץ/מותח את אורך-המחזורים (למשל הקצרה לציוד-מתבגר) בלי לשנות את ההגדרה-הבסיסית." },
          ],
          takeawaysHe: [
            "מורחב = ריבוי Cycles + OR/AND מעורב + Modification Factor.",
            "לדפוסי-שחיקה מרובי-גורמים מורכבים.",
            "דורש RCM ותיעוד-לוגיקה.",
          ],
          relatedHe: [{ labelHe: "PM Academy · מרובת-מונים מורחבת", href: "/library/pm-academy/chapter-06/" }],
        },
      ],
    },
    // ============================================================ 5.7
    {
      id: "5.7",
      titleHe: "סבבי בדיקה",
      titleEn: "Inspection Rounds",
      execHe:
        "סבב-בדיקה (Inspection Round) הוא תחזוקה מונעת המכסה אובייקטים-טכניים רבים בפק\"ע אחת — סבב-מפקח שעובר על שורת-ציוד (משאבות, ברזים, מנועים) ומבצע בדיקה קצרה בכל אחד. במקום פק\"ע נפרדת לכל נכס, פק\"ע-אחת מקיפה. שתי גישות: Object List (פשוטה) ו-Task List מורחבת.",
      beginnerHe:
        "דמיין שומר-לילה שעובר על 20 דלתות ובודק שכל אחת נעולה — סבב אחד, רשימת-תחנות. ב-PM, במקום 20 פק\"ע ל-20 משאבות, פק\"ע-אחת עם רשימת-כל-המשאבות; המפקח עובר על כולן בסבב. חוסך עומס-פק\"ע אדיר.",
      consultantHe:
        "שתי שיטות: (1) Object List — פק\"ע אחת עם רשימת-אובייקטים (Object List בפק\"ע), פעולה-גנרית, פשוט אך ללא הצמדת-פעולה-לאובייקט; (2) Task List מורחבת — כל פעולה ברשימה מקבלת Reference Object משלה (Object ברמת-פעולה), נראות פרטנית והיסטוריה לכל אובייקט. סבב-בדיקה הוא בעצם Single/Strategy Plan שה-Maintenance Item שלו מצביע למספר אובייקטים. מתאים למפעלים עם הרבה נכסים-קטנים-דומים.",
      purposeHe:
        "להפחית עומס-מנהלי (פחות פק\"ע, פחות תזמון) תוך כיסוי מערך-נכסים גדול בבדיקות-תכופות-קצרות — איזון בין יעילות-תפעולית לכיסוי-מונע.",
      processExampleHe:
        "מפקח עובר שבועית על 15 משאבות-תהליך: פק\"ע-אחת (Inspection Round) עם רשימת-15-המשאבות; המפקח בודק רטט, דליפה ולחץ בכל אחת, ומדווח בפק\"ע-אחת.",
      scenarioHe:
        "בארגון סבב-בדיקה-יומי על קווי-המילוי: פק\"ע-אחת מכסה את כל 6 ה-Fillers + מכונות-ההדבקה + המסועים; המפקח עובר, בודק חזותית-ושמיעתית, ומתעד חריגות שיפכו לפק\"ע-תיקון נפרדת.",
      navHe: [
        "Plant Maintenance and Customer Service ► Maintenance Plans, Work Centers, Task Lists and PRTs ► Task Lists ► Operation Data ► Maintain Object List Settings",
        "Plant Maintenance and Customer Service ► Maintenance and Service Processing ► Maintenance and Service Orders ► Object List / Object Information",
      ],
      tables: ["MPLA", "MPOS", "PLPO", "AFVC", "OBJK"],
      tcodes: ["IA05", "IP42", "IP10", "IW38"],
      fiori: ["F2773", "F4439"],
      configHe: [
        "Object List בפק\"ע — אופן-ניהול רשימת-אובייקטים.",
        "Operation-level Reference Object (לשיטה המורחבת).",
        "Maintenance Item המצביע למספר אובייקטים.",
        "Notification per object (אופציונלי) לתיעוד-חריגות.",
      ],
      flow: [
        { he: "בנה רשימת-משימות-סבב", code: "IA05", note: "פעולות-בדיקה" },
        { he: "קשר מספר אובייקטים", code: "MPOS/Object List" },
        { he: "תוכנית + תזמון", code: "IP42/IP10" },
        { he: "פק\"ע-סבב אחת", code: "IW38" },
        { he: "חריגה → הודעה/פק\"ע נפרדת", code: "Notification" },
      ],
      masterDataHe: [
        "מספר Equipment/FL בסבב.",
        "Task List עם פעולות-בדיקה (לעיתים Reference Object לכל פעולה).",
      ],
      mistakesHe: [
        "סבב-ענק בלי הצמדת-פעולה-לאובייקט — אין היסטוריה פרטנית.",
        "ערבוב נכסים-לא-דומים בסבב — בדיקות לא-רלוונטיות.",
        "אי-הפרדת חריגות לפק\"ע-תיקון — איבוד-מעקב-תקלות.",
      ],
      troubleshootHe: [
        "אין היסטוריה לאובייקט-בודד ➔ שיטת Object List ללא Operation-Reference-Object.",
        "פק\"ע-סבב כבדה-מדי ➔ פצל לסבבים לפי-אזור/סוג.",
        "חריגות נבלעות ➔ הגדר Notification-per-object.",
      ],
      bestPracticeHe: [
        "השתמש בשיטה המורחבת (Reference-Object-per-operation) לנכסים שדורשים היסטוריה.",
        "קבץ נכסים-דומים-וקרובים-גיאוגרפית באותו סבב.",
        "נתב חריגות לפק\"ע-תיקון נפרדת לשמירת-מעקב.",
      ],
      interviewHe: [
        { qHe: "מהו סבב-בדיקה ומה יתרונו?", aHe: "תחזוקה מונעת המכסה אובייקטים רבים בפק\"ע אחת (סבב-מפקח); יתרונו הפחתה דרמטית בעומס-פק\"ע ובתזמון תוך כיסוי-מונע רחב." },
        { qHe: "מהן שתי הגישות לסבב-בדיקה?", aHe: "(1) Object List — פק\"ע עם רשימת-אובייקטים ופעולה-גנרית; (2) Task List מורחבת — Reference Object לכל פעולה, נראות והיסטוריה פרטנית." },
      ],
      takeawaysHe: [
        "סבב-בדיקה = אובייקטים רבים בפק\"ע אחת.",
        "מפחית עומס-פק\"ע ותזמון דרמטית.",
        "שתי גישות: Object List (פשוט) ו-Task List מורחבת (פרטני).",
        "חריגות מנותבות לפק\"ע-תיקון נפרדת.",
      ],
      relatedHe: [
        { labelHe: "PM Academy · סבבי-בדיקה", href: "/library/pm-academy/chapter-06/" },
        { labelHe: "אובייקט · OBJK", href: "/library/pm/object/OBJK/" },
      ],
      children: [
        {
          id: "5.7.1",
          titleHe: "סבבי בדיקה בסיסיים באמצעות רשימת האובייקטים",
          titleEn: "Basic Inspection Rounds Using the Object List",
          execHe:
            "בשיטת ה-Object List, פק\"ע-הסבב נושאת רשימת-אובייקטים (Object List) ופעולה-גנרית אחת המתבצעת על כולם. פשוט ומהיר להגדרה — אך הדיווח הוא ברמת-הפק\"ע, לא לכל אובייקט בנפרד.",
          beginnerHe:
            "הדרך הפשוטה: פק\"ע אחת אומרת 'בדוק את כל המשאבות ברשימה'. המפקח עובר ומדווח 'הכל תקין' בסוף. קל מאוד, אבל אין רישום-נפרד לכל משאבה.",
          consultantHe:
            "ה-Maintenance Item מקושר ל-Object List (מספר Equipment/FL). בתזמון, פק\"ע-אחת נוצרת עם ה-Object List בכותרת (OBJK). הפעולות גנריות (לא צמודות-אובייקט). היתרון: הגדרה-מהירה ועומס-נמוך; החיסרון: אין היסטוריית-תחזוקה פרטנית לאובייקט (ה-Completion נרשם לפק\"ע, לא לכל פריט).",
          purposeHe:
            "כיסוי-סבב מהיר ויעיל לנכסים-רבים-פשוטים שבהם לא נדרשת היסטוריה פרטנית — מקסימום-יעילות, מינימום-הגדרה.",
          processExampleHe:
            "סבב-שבועי על 20 ברזי-בטיחות: פק\"ע-אחת עם Object List של 20 הברזים ופעולה 'בדוק-ופתח-סגור'. המפקח עובר ומדווח בפק\"ע-אחת.",
          scenarioHe:
            "בארגון סבב-יומי-מהיר על 12 חיישני-טמפ' בקווי-המילוי: Object List עם 12 החיישנים ופעולה 'בדיקה-חזותית'; דיווח מרוכז בסוף-המשמרת.",
          navHe: [
            "Plant Maintenance and Customer Service ► Maintenance and Service Processing ► Maintenance and Service Orders ► Object List ► Define Object List Behavior",
          ],
          tables: ["MPOS", "OBJK", "AUFK"],
          tcodes: ["IP42", "IP10", "IW38"],
          fiori: ["F2773"],
          configHe: [
            "התנהגות Object List בפק\"ע.",
            "Maintenance Item עם מספר אובייקטים.",
            "פעולה-גנרית ברשימה.",
          ],
          flow: [
            { he: "Maintenance Item + Object List", code: "MPOS" },
            { he: "תוכנית + תזמון", code: "IP42/IP10" },
            { he: "פק\"ע עם Object List", code: "OBJK" },
            { he: "פעולה-גנרית על כולם", code: "AFVC" },
            { he: "דיווח ברמת-פק\"ע", code: "TECO" },
          ],
          masterDataHe: ["מספר Equipment/FL ב-Object List.", "פעולה-גנרית אחת."],
          mistakesHe: [
            "ציפייה להיסטוריה-פרטנית — לא קיימת בשיטה זו.",
            "Object List ענק שמקשה-ביצוע ודיווח.",
          ],
          troubleshootHe: [
            "אין נתוני-אובייקט-בודד ➔ זו מגבלת-השיטה; עבור לשיטה המורחבת.",
            "פק\"ע עמוסה ➔ פצל Object List לסבבים.",
          ],
          bestPracticeHe: [
            "השתמש לנכסים-פשוטים ללא-דרישת-היסטוריה.",
            "שמור Object List בגודל-נשלט.",
          ],
          interviewHe: [
            { qHe: "מה מאפיין סבב-בדיקה מבוסס-Object-List?", aHe: "פק\"ע-אחת עם רשימת-אובייקטים ופעולה-גנרית; הגדרה-פשוטה אך דיווח ברמת-הפק\"ע בלבד — ללא היסטוריה פרטנית לאובייקט." },
            { qHe: "מה החיסרון העיקרי?", aHe: "אין היסטוריית-תחזוקה נפרדת לכל אובייקט — ה-Completion נרשם לפק\"ע, לא לכל פריט." },
          ],
          takeawaysHe: [
            "Object List = פק\"ע אחת + רשימת-אובייקטים + פעולה-גנרית.",
            "פשוט ויעיל; ללא היסטוריה פרטנית.",
            "לנכסים-רבים-פשוטים.",
          ],
          relatedHe: [{ labelHe: "PM Academy · סבב-Object-List", href: "/library/pm-academy/chapter-06/" }],
        },
        {
          id: "5.7.2",
          titleHe: "סבבי בדיקה מורחבים באמצעות רשימת המשימות",
          titleEn: "Enhanced Inspection Rounds Using the Maintenance Task List",
          execHe:
            "בשיטה המורחבת, כל פעולה ברשימת-המשימות מקבלת Reference Object משלה — כך פק\"ע-הסבב מצמידה בדיקה ספציפית לכל אובייקט, ומספקת נראות והיסטוריית-תחזוקה פרטנית לכל נכס. עומס-נמוך עם דיוק-גבוה.",
          beginnerHe:
            "כמו הסבב הפשוט, אבל חכם יותר: כל שלב ברשימה 'יודע' על איזו משאבה הוא מדבר. כך כל משאבה מקבלת רישום-משלה — מי בדק, מתי, ומה-מצבה — גם שהכל בפק\"ע-אחת.",
          consultantHe:
            "ברשימת-המשימות מקצים לכל פעולה (PLPO) Reference Object נפרד (Object-per-operation). פק\"ע-הסבב נושאת פעולות צמודות-אובייקט; ה-Completion-Confirmation נרשם לכל אובייקט דרך הפעולה, ומזין את ההיסטוריה (Equipment history). משלב את יעילות-הסבב (פק\"ע-אחת) עם פירוט-של-פק\"ע-נפרדת. מתאים לנכסים-קריטיים בסבב הדורשים מעקב-פרטני.",
          purposeHe:
            "לקבל את יתרון-העומס-הנמוך של סבב יחד עם נראות והיסטוריה ברמת-נכס — הטוב-משני-העולמות לסבבי-נכסים-חשובים.",
          processExampleHe:
            "סבב על 10 מנועים-קריטיים: רשימת-משימות שבה כל פעולה צמודה למנוע אחר ('בדוק-רטט-מנוע-1', '...מנוע-2'). פק\"ע-אחת, אך כל מנוע מקבל היסטוריית-בדיקה משלו.",
          scenarioHe:
            "בארגון סבב על 6 ה-Fillers: כל פעולה ברשימה צמודה ל-Filler מסוים ('בדיקת-שסתומי-Filler-1'...); פק\"ע-אחת מנהלת את כל הסבב, אך כל Filler צובר היסטוריית-אמינות נפרדת לניתוח-מגמות.",
          navHe: [
            "Plant Maintenance and Customer Service ► Maintenance Plans, Work Centers, Task Lists and PRTs ► Task Lists ► Operation Data ► Assign Reference Object to Operation",
          ],
          tables: ["PLPO", "AFVC", "OBJK", "ILOA"],
          tcodes: ["IA05", "IA06", "IP42", "IP10", "IW38"],
          fiori: ["F2773"],
          configHe: [
            "Reference Object ברמת-פעולה (Object-per-operation).",
            "רשימת-משימות עם פעולה-לכל-אובייקט.",
            "Completion-per-operation להזנת-היסטוריה.",
          ],
          flow: [
            { he: "רשימת-משימות + Object-per-operation", code: "IA05", note: "PLPO" },
            { he: "תוכנית + תזמון", code: "IP42/IP10" },
            { he: "פק\"ע-סבב צמודת-אובייקט", code: "AFVC" },
            { he: "Completion לכל פעולה/אובייקט", code: "IW41" },
            { he: "היסטוריה פרטנית לכל נכס", code: "OBJK" },
          ],
          masterDataHe: [
            "מספר Equipment/FL, אחד לכל פעולה.",
            "Task List עם Reference Object לכל פעולה.",
          ],
          mistakesHe: [
            "אי-הקצאת Reference Object לפעולות — נסוג לשיטה הבסיסית בלי-משים.",
            "רשימה ענקית עם פעולה-לכל-אובייקט — מסורבלת לתחזוקה.",
          ],
          troubleshootHe: [
            "אין היסטוריה פרטנית למרות-הציפייה ➔ Reference Object לא הוקצה לפעולות.",
            "Completion לא נרשם לאובייקט ➔ דיווח ברמת-פק\"ע במקום ברמת-פעולה.",
          ],
          bestPracticeHe: [
            "השתמש לנכסים-קריטיים בסבב הדורשים מעקב-מגמות.",
            "אזן בין גודל-הסבב לניהוליות-הרשימה.",
            "ודא Completion-per-operation להיסטוריה-מלאה.",
          ],
          interviewHe: [
            { qHe: "במה הסבב המורחב עדיף על מבוסס-Object-List?", aHe: "כל פעולה צמודה ל-Reference Object נפרד, כך שכל אובייקט מקבל היסטוריית-תחזוקה ונראות פרטנית — בעוד עומס-הפק\"ע נשאר נמוך (פק\"ע-אחת)." },
            { qHe: "כיצד מקנים נראות-פרטנית בסבב?", aHe: "מקצים Reference Object לכל פעולה ברשימת-המשימות (Object-per-operation) ומדווחים Completion ברמת-פעולה — כך ההיסטוריה נרשמת לכל נכס." },
          ],
          takeawaysHe: [
            "מורחב = Reference Object לכל פעולה ברשימה.",
            "פק\"ע-אחת + היסטוריה פרטנית לכל נכס.",
            "הטוב-משני-העולמות: יעילות + דיוק.",
          ],
          relatedHe: [{ labelHe: "PM Academy · סבב-Task-List מורחב", href: "/library/pm-academy/chapter-06/" }],
        },
      ],
    },
    // ============================================================ 5.8
    {
      id: "5.8",
      titleHe: "תחזוקה מבוססת מצב",
      titleEn: "Condition-Based Maintenance",
      execHe:
        "תחזוקה מבוססת-מצב (Condition-Based Maintenance — CBM) מפעילה תחזוקה לפי מדידת-מצב-בפועל (רטט, טמפ', לחץ) ולא לפי לוח-זמנים או מונה. כשערך-מדידה חוצה סף-מוגדר, נוצרת אוטומטית הודעה/פק\"ע. זו הגישה המתקדמת ביותר — תחזוקה רק-כשבאמת-צריך, על-בסיס נתוני-חיישנים.",
      beginnerHe:
        "במקום 'כל X זמן' או 'כל Y שעות', זה 'כשהרטט עולה מעל הסף'. חיישנים מודדים את מצב-הציוד בזמן-אמת; כשמשהו חורג (מנוע מתחמם, משאבה רועדת), SAP פותח אוטומטית קריאת-תחזוקה. כך מתקנים בדיוק-לפני-הכשל, לא מוקדם ולא מאוחר.",
      consultantHe:
        "CBM ב-PM ממומשת דרך Measuring Points עם ערכי-סף (Valuation Code / Upper-Lower Limits). קריאות-מדידה (IK11, או אוטומטית מ-IoT/SCADA דרך API/IDoc) נשמרות ב-IMRG. כש-Measurement Document חורג מסף, Measuring-Point-triggered logic (לעיתים דרך תוכנית-תחזוקה מבוססת-מצב או ABAP/Workflow) יוצר Notification/Order. ב-S/4HANA זה מתחבר ל-Asset Intelligence Network / Predictive Maintenance (PdMS). שונה מ-Performance-based: שם הסף הוא צריכה-מצטברת (מונה), כאן הוא ערך-מצב-רגעי החוצה גבול.",
      purposeHe:
        "למזער גם תחזוקת-יתר וגם כשלים-פתאומיים: לתחזק על-בסיס המצב-האמיתי של הנכס. חיסכון-עלות מקסימלי + זמינות-מקסימלית — אך דורש תשתית-חיישנים ונתונים.",
      processExampleHe:
        "משאבה עם חיישן-רטט: Measuring Point לרטט עם סף-עליון 7mm/s. כשקריאה חוצה 7, נוצרת אוטומטית Notification → פק\"ע לבדיקת-מיסבים — לפני-כשל, אך לא בלי-צורך.",
      scenarioHe:
        "בארגון חיישני-רטט-וטמפ' על מנועי-ה-Fillers מזרימים נתונים ל-SAP; חריגת-סף יוצרת קריאת-תחזוקה אוטומטית. כך נמנעת השבתת-קו פתאומית בשיא-העונה — מתערבים רק כשהנתונים מצביעים על שחיקה אמיתית.",
      navHe: [
        "Plant Maintenance and Customer Service ► Technical Objects ► Measuring Points, Counters, Measurement Documents ► Define Valuation Codes for Measurement Documents",
        "Plant Maintenance and Customer Service ► Technical Objects ► Measuring Points, Counters ► Configure Measurement-Document-Triggered Notification/Order",
      ],
      tables: ["IMPTT", "IMRG", "IMRC", "QMEL", "AUFK"],
      tcodes: ["IK01", "IK11", "IK17", "IW21", "IW28"],
      fiori: ["F2929", "F4439"],
      configHe: [
        "Measuring Point עם Upper/Lower Limits ו-Valuation Codes.",
        "טריגר Notification/Order בחריגת-סף.",
        "ממשק-קריאות אוטומטי (IoT/SCADA → IMRG).",
        "חיבור ל-Predictive Maintenance / Asset Intelligence (S/4HANA).",
      ],
      flow: [
        { he: "Measuring Point + ספים", code: "IK01", note: "Upper/Lower Limits" },
        { he: "קריאות-מדידה (חיישן/ידני)", code: "IK11", note: "IMRG" },
        { he: "חריגת-סף", code: "Valuation", note: "Code חורג" },
        { he: "הודעה/פק\"ע אוטומטית", code: "IW21/Order" },
        { he: "תיקון לפני-כשל", code: "IW41" },
      ],
      masterDataHe: [
        "Measuring Point עם ספים (IMPTT).",
        "Measurement Documents מחיישנים (IMRG).",
        "Notification/Order Type לטריגר.",
      ],
      mistakesHe: [
        "ספים שגויים — התראות-שווא או החמצת-כשל.",
        "תשתית-חיישנים חסרה — CBM 'על-הנייר' בלבד.",
        "בלבול CBM עם Performance-based (סף-מצב מול צריכה-מצטברת).",
        "אי-טיפול ב-Sensor drift/calibration — נתונים-לא-אמינים.",
      ],
      troubleshootHe: [
        "התראות-שווא ➔ ספים צרים-מדי או חיישן-לא-מכויל.",
        "כשל בלי-התראה ➔ סף רחב-מדי או קריאות חסרות.",
        "אין טריגר אוטומטי ➔ Measurement-Document-triggered config חסר.",
      ],
      bestPracticeHe: [
        "בסס ספים על נתוני-בייסליין וניתוח-אמינות.",
        "כייל-חיישנים תקופתית (וזה עצמו תחזוקה מונעת).",
        "שלב CBM עם Predictive Analytics לחיזוי-מגמות.",
        "השתמש ב-CBM לנכסים-קריטיים בעלי-תשתית-חיישנים.",
      ],
      interviewHe: [
        { qHe: "מהי תחזוקה מבוססת-מצב?", aHe: "תחזוקה המופעלת ממדידת-מצב-בפועל (רטט/טמפ'/לחץ) החוצה סף-מוגדר — לא מלוח-זמנים ולא ממונה-מצטבר. הגישה המתקדמת ביותר." },
        { qHe: "במה שונה CBM מ-Performance-based?", aHe: "Performance-based מתבסס על צריכה-מצטברת (מונה); CBM על ערך-מצב-רגעי החוצה סף עליון/תחתון. CBM מתקן 'כשהמצב מצביע', לא 'כשנצברה כמות'." },
        { qHe: "מה התנאי המעשי ל-CBM?", aHe: "תשתית-חיישנים שמזרימה קריאות-מדידה ל-SAP (IoT/SCADA), Measuring Points עם ספים, וטריגר-אוטומטי ליצירת Notification/Order." },
      ],
      takeawaysHe: [
        "CBM = תחזוקה לפי מדידת-מצב-בפועל החוצה סף.",
        "דורש Measuring Points עם ספים + תשתית-חיישנים.",
        "שונה מ-Performance: מצב-רגעי מול צריכה-מצטברת.",
        "מתחבר ל-Predictive Maintenance ב-S/4HANA.",
      ],
      relatedHe: [
        { labelHe: "PM Academy · תחזוקה מבוססת-מצב", href: "/library/pm-academy/chapter-06/" },
        { labelHe: "אובייקט · IMRG", href: "/library/pm/object/IMRG/" },
      ],
    },
    // ============================================================ 5.9
    {
      id: "5.9",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה כיסה את מלוא ספקטרום התחזוקה המונעת ב-SAP PM: מהעקרונות (מתוכנן מול שבר), דרך אובייקטי-היסוד (Task List, Maintenance Plan, Maintenance Item, Strategy), אל ארבעת דפוסי-התזמון — מבוסס-זמן, מבוסס-ביצוע, מרובה-מונים ומבוסס-מצב — וכן סבבי-בדיקה. המסר: התאם את דפוס-התזמון לטבע-השחיקה של הנכס, וקשר תמיד 'מה' (Task List) ל'מתי' (Plan) דרך פריט-תחזוקה.",
      beginnerHe:
        "סיכמנו את כל הדרכים לתזמן תחזוקה לפני-שנשבר: לפי לוח-שנה (זמן), לפי שימוש (מונה), לפי שילוב-תנאים (מרובה-מונים), ולפי מצב-החיישנים (מבוסס-מצב). וגם איך לכסות הרבה נכסים בסבב-אחד. הכלל הזהב: רשימת-משימות אומרת 'מה לעשות', תוכנית-תחזוקה אומרת 'מתי', והפריט מחבר ביניהם לציוד.",
      consultantHe:
        "מבט-על-מימוש: בחר Maintenance Plan Category לפי הדפוס; בנה General Task Lists לשימוש-חוזר; הגדר Strategies (T351) למחזורים-מקוננים; קשר Measuring Points/Counters לדפוסי-ביצוע/מצב; תזמן ב-IP10 ונטר ב-IP24. ההבחנות הקריטיות: Single-cycle מול Strategy (מחזור-יחיד מול Packages+Hierarchy); Time מול Performance (קלנדר מול מונה); Multiple Counter (OR/AND, Cycles עצמאיים) מול CBM (סף-מצב). מדוד הצלחה ב-KPI: Planned/Reactive ratio, Schedule Compliance, MTBF וזמינות.",
      purposeHe:
        "לחבר את כל החלקים לתמונת-מימוש אחת: לדעת איזה דפוס לבחור מתי, איך לבנות את האובייקטים לשימוש-חוזר, ואיך למדוד שהתחזוקה-המונעת באמת משפרת זמינות ומורידה עלות.",
      processExampleHe:
        "תרחיש-מימוש מלא לנכס: ניתוח-קריטיות ➔ בחירת-דפוס (זמן/ביצוע/מצב) ➔ General Task List + Strategy ➔ Maintenance Plan + Item המקשר לאובייקט ➔ תזמון IP10 ➔ ניטור IP24 ➔ פק\"ע-אוטומטיות ➔ ביצוע ו-TECO ➔ ניתוח-KPI ➔ כיוונון-מחזורים.",
      scenarioHe:
        "בארגון, מערך-תחזוקה-מונעת לקווי-המילוי: סיכה-שבועית (זמן), כיול-מילויים (ביצוע), בטיחות-שנתית (מרובה-מונים OR), ורטט-מנועים (מבוסס-מצב) — וסבב-יומי על כל הקווים. התוצאה: זמינות-קו גבוהה, פחות-השבתות-פתאומיות בשיא-העונה, ועלות-תחזוקה צפויה ומתוקצבת.",
      navHe: [
        "Plant Maintenance and Customer Service ► Maintenance Plans, Work Centers, Task Lists and PRTs ► Maintenance Plans ► Set Maintenance Plan Categories",
        "Plant Maintenance and Customer Service ► Preventive Maintenance ► Scheduling of Maintenance Plans",
      ],
      tables: ["MPLA", "MPOS", "PLKO", "PLPO", "T351", "IMPTT", "MHIS"],
      tcodes: ["IP41", "IP42", "IP43", "IP10", "IP24", "IA05"],
      fiori: ["F2773", "F4439", "F2929"],
      configHe: [
        "בחירת-Category לפי דפוס-תזמון (Single/Strategy/Multiple/Performance).",
        "Strategies + Packages (T351/T351P) למחזורים-מקוננים.",
        "Measuring Points/Counters לדפוסי-ביצוע/מצב.",
        "Scheduling Parameters (Call Horizon, Shift, Tolerance) + Factory Calendar.",
      ],
      flow: [
        { he: "ניתוח-קריטיות", code: "RCM", note: "תעדוף-נכסים" },
        { he: "בחירת-דפוס", code: "Category", note: "זמן/ביצוע/מצב" },
        { he: "Task List + Plan + Item", code: "IA05/IP4x" },
        { he: "תזמון + ניטור", code: "IP10/IP24" },
        { he: "ביצוע + KPI + כיוונון", code: "TECO", note: "שיפור-מתמיד" },
      ],
      masterDataHe: [
        "Task List (PLKO/PLPO) — 'מה'.",
        "Maintenance Plan (MPLA) — 'מתי'.",
        "Maintenance Item (MPOS) — מקשר 'מה'+'מתי'+'איפה'.",
        "Strategy / Measuring Point — תשתית-דפוסים.",
      ],
      mistakesHe: [
        "בחירת-דפוס לא-תואם-לשחיקה (זמן לציוד עומס-משתנה).",
        "אי-שימוש-חוזר ברשימות — כפל-תחזוקה.",
        "אי-ניטור IP24 — תוכניות 'נרדמות'.",
        "מדידה לפי כמות-עבודה במקום KPI-זמינות.",
      ],
      troubleshootHe: [
        "תחזוקה לא-יעילה ➔ דפוס-תזמון לא-תואם; שקול ביצוע/מצב.",
        "עומס-פק\"ע גבוה ➔ אחד עבודות ב-Strategy או סבבי-בדיקה.",
        "תוכניות לא-קוראות ➔ נטר IP24, בדוק תזמון וקריאות-מונה.",
      ],
      bestPracticeHe: [
        "התאם דפוס-תזמון לטבע-השחיקה של כל נכס.",
        "בנה לשימוש-חוזר (General Task Lists, Strategies).",
        "נטר KPI: Planned/Reactive, Schedule Compliance, MTBF, זמינות.",
        "שפר-מתמיד: כוונן מחזורים לפי היסטוריה ונתונים.",
      ],
      interviewHe: [
        { qHe: "כיצד בוחרים בין דפוסי-התזמון השונים?", aHe: "לפי טבע-השחיקה: זמן לעבודה-קלנדרית; ביצוע לשחיקה-תלוית-שימוש; מרובה-מונים לכפל-צירים (OR/AND); מבוסס-מצב לנכסים עם תשתית-חיישנים שבהם המצב-בפועל קובע." },
        { qHe: "מהו הקשר הקבוע בין שלושת אובייקטי-היסוד?", aHe: "Task List ('מה') מקושרת דרך Maintenance Item ('מקשר') ל-Maintenance Plan ('מתי') ולאובייקט-הטכני ('איפה'). זהו הציר של כל תחזוקה מונעת." },
        { qHe: "באילו KPI מודדים הצלחת-תחזוקה-מונעת?", aHe: "יחס Planned/Reactive, Schedule Compliance, MTBF (זמן-ממוצע-בין-כשלים) וזמינות-נכס — לא כמות-פק\"ע." },
      ],
      takeawaysHe: [
        "ארבעה דפוסי-תזמון: זמן, ביצוע, מרובה-מונים, מבוסס-מצב — בחר לפי-שחיקה.",
        "שלושה אובייקטים-קבועים: Task List + Plan + Item.",
        "בנה לשימוש-חוזר; תזמן ב-IP10; נטר ב-IP24.",
        "מדוד זמינות ויחס-מתוכנן — לא נפח-עבודה.",
      ],
      relatedHe: [
        { labelHe: "PM Academy · סיכום תחזוקה מונעת", href: "/library/pm-academy/chapter-06/" },
        { labelHe: "אובייקט · MPLA", href: "/library/pm/object/MPLA/" },
        { labelHe: "אובייקט · PLKO", href: "/library/pm/object/PLKO/" },
      ],
    },
  ],
};
