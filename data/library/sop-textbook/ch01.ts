// ===== S&OP with SAP IBP — Chapter 1 (gold-standard learning chapter) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Source hierarchy preserved exactly (1.1 → 1.5, x.y.z nested under x.y).
// Transformative Hebrew (beginner + consultant friendly); SAP objects verbatim EN.
// CBC = Coca-Cola bottling S&OP scenario.
import type { TextbookChapter } from "./types";

export const CH1: TextbookChapter = {
  n: 1,
  titleHe: "מבוא לתכנון מכירות ותפעול (S&OP)",
  titleEn: "Introduction to Sales and Operations Planning",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה למבוא של תכנון מכירות ותפעול (Sales and Operations Planning, S&OP) ולפתרון SAP Integrated Business Planning (SAP IBP). כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC (מפעל-מילוי של Coca-Cola), ניווט באפליקציות ובעצי-הניווט של IBP, טבלאות/אובייקטים, מזהי-SAP, פרטי-תצורה, תרשים-תהליך של מחזור ה-S&OP, טעויות נפוצות, פתרון-תקלות, שיטות-מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: להבין מהו S&OP, מדוע הוא נחוץ, ומה מקומו של SAP IBP — ללא הספר המקורי. שים לב: SAP IBP הוא פתרון ענן (cloud); העבודה היומיומית מתבצעת דרך ה-Excel add-in וה-Web UI.",
  subchapters: [
    // ============================================================ 1.1
    {
      id: "1.1",
      titleHe: "מניעים שוקיים (Market Drivers)",
      titleEn: "Market Drivers",
      execHe:
        "המניעים השוקיים הם הכוחות החיצוניים שהפכו את S&OP מ'נחמד-שיהיה' להכרח עסקי. שיבושי שרשרת-אספקה, גלובליזציה ותנודתיות-שוק יצרו סביבה שבה תכנון מבודד לכל מחלקה כבר אינו עובד. הנהלה בכירה זקוקה לתהליך אחד שמיישר ביקוש, היצע וכספים אל מול אי-ודאות גוברת — וזהו בדיוק תפקיד ה-S&OP.",
      beginnerHe:
        "דמיין שאתה מנהל מפעל-משקאות. פעם יכולת להניח שמחר יידמה להיום: אותם לקוחות, אותם ספקים, אותם מחירים. היום העולם משתנה במהירות — ספק נופל, מטבע קופץ, טרנד צרכני מתפוצץ בן-לילה. 'מניעים שוקיים' הם בדיוק השינויים האלה בעולם החיצוני, והם הסיבה שצריך תהליך-תכנון מסודר שמגיב להם מהר.",
      consultantHe:
        "ביישום SAP IBP, המניעים השוקיים הם ה'למה' שמצדיק את ההשקעה בפלטפורמה. כיועץ עליך לתרגם כל מניע לדרישת-תכנון קונקרטית: שיבושים → צורך ב-IBP for Inventory (multi-stage safety stock) ו-IBP for Response; גלובליזציה → planning area רב-מטבעי ורב-יחידות-מידה עם פילוחים גאוגרפיים; תנודתיות → תרחישי what-if ותחזיות סטטיסטיות תכופות ב-IBP for Demand. המניעים מגדירים את היקף ה-planning area ואת מודל-הנתונים (master data types, key figures).",
      purposeHe:
        "המטרה: להבין שה-S&OP אינו תרגיל פנימי אלא תגובה מובנית לסביבה עסקית הפכפכה. זיהוי המניעים השוקיים מצדיק את התהליך, מגדיר את הדרישות מהמערכת, וקובע אילו מודולים של SAP IBP נדרשים.",
      processExampleHe:
        "יצרן גלובלי חווה עלייה פתאומית בעלויות-הובלה ימית. בלי S&OP, הרכש, הייצור והמכירות מגיבים בנפרד ובסתירה. עם תהליך S&OP נתמך-IBP, התרחיש מוזן כ-scenario, המערכת מחשבת מחדש את ההיצע והרווחיות, וההנהלה מקבלת החלטה אחת מיושרת — להעביר ייצור למפעל קרוב יותר ולעדכן את תחזית-המכירות בהתאם.",
      cbcHe:
        "ב-CBC (מפעל-מילוי של Coca-Cola): מחסור עולמי ב-CO2 מאיים על קווי-המילוי. המניע השוקי (שיבוש-אספקה) מתורגם ב-SAP IBP לתרחיש שבו זמינות ה-CO2 מוגבלת; ה-S&OP בוחן מה תהיה ההשפעה על אספקת-המשקאות לרשתות-השיווק לקראת הקיץ, ומחליט על תיעדוף SKU-ים רווחיים.",
      navHe: [
        "SAP IBP Web UI ► Dashboards ► Demand Sensing / Supply Overview (תצוגת מגמות-שוק)",
        "SAP IBP ► Application Jobs ► Statistical Forecasting (זיהוי שינויי-ביקוש)",
        "SAP IBP Excel add-in ► Scenarios ► Create Scenario (הזנת מניע-שוקי כתרחיש)",
      ],
      tables: ["planning area", "master data type", "key figure", "scenario"],
      tcodes: ["SAP IBP", "IBP for Demand", "IBP for Response", "Excel add-in"],
      fiori: ["SAP IBP Web UI", "Dashboards", "Analytics"],
      configHe: [
        "מודל את המניעים השוקיים כ-attributes על master data type (region, channel, customer segment) כדי שניתן יהיה לפלח את התכנון לפי גאוגרפיה וערוץ.",
        "הגדר key figures לרגישות-שוק (Market Sensing, Forecast Error) שיציפו תנודתיות מוקדם.",
        "אפשר scenarios ב-planning area כדי לדמות מניעים שוקיים (שיבוש, ביקוש פתאומי) בלי לפגוע בתוכנית-הבסיס.",
      ],
      flow: [
        { he: "זיהוי מניע שוקי", note: "שיבוש / גלובליזציה / תנודתיות" },
        { he: "הזנה כ-scenario", code: "Excel add-in", note: "Create Scenario" },
        { he: "חישוב-מחדש", code: "SAP IBP", note: "supply + financial impact" },
        { he: "החלטת-הנהלה מיושרת", note: "ב-S&OP review" },
      ],
      masterDataHe: [
        "master data types המייצגים גאוגרפיה, ערוץ ולקוח — הבסיס לפילוח מניעים שוקיים.",
        "key figures של ביקוש, היצע ורווחיות — הבסיס למדידת השפעת המניע.",
      ],
      mistakesHe: [
        "מימוש S&OP כתרגיל-תקצוב פנימי בלבד, בלי לחבר אותו למניעים השוקיים החיצוניים.",
        "מודל-נתונים שטוח ללא attributes גאוגרפיים/ערוציים — לא ניתן לפלח את השפעת המניע.",
        "התעלמות מתנודתיות: שימוש בתחזית-נקודה אחת במקום בתרחישים.",
      ],
      troubleshootHe: [
        "ההנהלה לא רואה השפעת-שוק בדוחות ➔ חסרים key figures של forecast error / market sensing.",
        "אי-אפשר לפלח השפעה לפי אזור ➔ חסר attribute גאוגרפי על master data type.",
        "תרחיש לא משפיע על התוכנית ➔ ה-scenario לא מקושר ל-planning area הנכון.",
      ],
      bestPracticeHe: [
        "התחל כל יוזמת-S&OP במיפוי מפורש של המניעים השוקיים הרלוונטיים לארגון.",
        "בנה את ה-planning area כך שיתמוך בפילוח לפי גאוגרפיה, ערוץ ולקוח מהיום הראשון.",
        "השתמש ב-scenarios כשפה משותפת בין הנהלה לתכנון לדיון במניעים שוקיים.",
      ],
      interviewHe: [
        { qHe: "מהם המניעים השוקיים ל-S&OP?", aHe: "שיבושי שרשרת-אספקה, גלובליזציה ותנודתיות-שוק — כוחות חיצוניים שהופכים תכנון מבודד ללא-מספיק ומחייבים תהליך-יישור אחד." },
        { qHe: "כיצד SAP IBP מתרגם מניע שוקי לתכנון?", aHe: "דרך scenarios ב-planning area, key figures של רגישות-שוק, ו-attributes לפילוח גאוגרפי/ערוצי — כך שניתן לדמות ולמדוד את ההשפעה." },
      ],
      takeawaysHe: [
        "S&OP הוא תגובה מובנית לסביבה עסקית הפכפכה, לא תרגיל פנימי.",
        "שלושת המניעים: שיבושים, גלובליזציה, תנודתיות.",
        "ב-SAP IBP המניעים מתורגמים ל-scenarios, key figures ו-attributes.",
      ],
      children: [
        {
          id: "1.1.1",
          titleHe: "שיבושי שרשרת-אספקה",
          titleEn: "Supply Chain Disruptions",
          execHe:
            "שיבושי שרשרת-אספקה — אסונות-טבע, מגפות, מחסור-חומרים, נפילת-ספקים — הפכו משכיחים. הם חושפים את הסיכון של שרשראות 'רזות' מדי ומחייבים תכנון שמביא בחשבון אי-ודאות-היצע, מלאי-ביטחון רב-שלבי, ומקורות-אספקה חלופיים.",
          beginnerHe:
            "שיבוש הוא כשמשהו בשרשרת נשבר פתאום: ספק נסגר, אונייה תקועה, חומר-גלם אוזל. בלי תכנון, אתה מגלה את הבעיה רק כשהמדף ריק. S&OP נועד לראות את הסיכון מראש ולהכין תוכנית-מגירה.",
          consultantHe:
            "ב-SAP IBP, התמודדות עם שיבושים נשענת על IBP for Inventory (אופטימיזציית multi-stage safety stock המתמחרת אי-ודאות-היצע וביקוש) ועל IBP for Response (תכנון-תגובה מבוסס-עדיפויות בזמן-קרוב). ב-planning area מודלים זמני-אספקה, שונות, ורמות-שירות; ה-scenarios מדמים נפילת-ספק או הארכת lead time.",
          purposeHe:
            "המטרה: להפוך את שרשרת-האספקה לעמידה (resilient) — לזהות נקודות-תורפה, לכמת סיכון, ולתכנן מלאי-ביטחון ומקורות-גיבוי לפני שהשיבוש מתרחש.",
          processExampleHe:
            "ספק-יחיד של רכיב קריטי מודיע על עיכוב של 6 שבועות. ב-IBP מזינים scenario עם lead time מוארך; IBP for Inventory מחשב מחדש את מלאי-הביטחון הנדרש, ו-IBP for Response מתעדף אילו הזמנות-לקוח יסופקו מהמלאי הקיים.",
          cbcHe:
            "ב-CBC: ספק-הפקקים היחיד נפגע משריפה. התרחיש מוזן ל-SAP IBP; IBP for Inventory מציע להעלות מלאי-ביטחון של פקקים, ו-IBP for Response מתעדף מילוי בקבוקי 1.5 ליטר (רווחיים) על-פני אריזות-קטנות עד שובו של הספק.",
          navHe: [
            "SAP IBP ► IBP for Inventory ► Inventory Optimization run",
            "SAP IBP ► IBP for Response ► Order-based Planning ► Constrained Forecast Run",
            "SAP IBP Excel add-in ► Scenarios ► Lead Time / Supply Disruption scenario",
          ],
          tables: ["key figure", "master data type (Location, Source)", "scenario", "lead time"],
          tcodes: ["IBP for Inventory", "IBP for Response", "SAP IBP", "Excel add-in"],
          fiori: ["SAP IBP Web UI", "Inventory Analytics", "Response Planning"],
          configHe: [
            "הגדר key figures לשונות-היצע (Supply Variability) ו-lead time ב-planning area של IBP for Inventory.",
            "מודל מקורות-אספקה חלופיים כ-master data (Source of Supply, Production Source) לתמיכה בגיבוי.",
            "הגדר service level targets לחישוב multi-stage safety stock תחת אי-ודאות.",
          ],
          flow: [
            { he: "זיהוי שיבוש", note: "נפילת-ספק / lead time" },
            { he: "scenario בארכת-אספקה", code: "Excel add-in" },
            { he: "חישוב safety stock", code: "IBP for Inventory" },
            { he: "תיעדוף הזמנות", code: "IBP for Response" },
          ],
          masterDataHe: [
            "Location ו-Source of Supply — מאפשרים מודל של מקורות חלופיים.",
            "key figures של lead time ושונות — הקלט לאופטימיזציית-מלאי.",
          ],
          mistakesHe: [
            "התעלמות משונות-היצע — מלאי-ביטחון מחושב נמוך מדי ונגמר בשיבוש.",
            "מקור-אספקה יחיד במודל בלי גיבוי — אין חלופה כשהספק נופל.",
          ],
          troubleshootHe: [
            "מלאי-ביטחון לא מספיק בשיבוש ➔ key figure של שונות-היצע חסר או נמוך.",
            "IBP for Response לא מתעדף נכון ➔ עדיפויות-ביקוש (demand priorities) לא הוגדרו.",
          ],
          bestPracticeHe: [
            "מודל תמיד לפחות מקור-אספקה חלופי אחד לרכיבים קריטיים.",
            "הרץ IBP for Inventory באופן תקופתי כדי לעדכן מלאי-ביטחון מול שונות מתעדכנת.",
          ],
          interviewHe: [
            { qHe: "איזה מודול IBP מטפל בשיבושי-אספקה לטווח-קצר?", aHe: "IBP for Response — תכנון-תגובה מבוסס-עדיפויות שמתעדף הזמנות תחת אילוצי-היצע." },
            { qHe: "כיצד מתכוננים לשיבוש מראש?", aHe: "באמצעות IBP for Inventory — אופטימיזציית multi-stage safety stock שמתמחרת אי-ודאות-היצע ומבטיחה רמת-שירות." },
          ],
          takeawaysHe: [
            "שיבושים מחייבים עמידוּת: מלאי-ביטחון רב-שלבי ומקורות-גיבוי.",
            "IBP for Inventory מתכונן מראש; IBP for Response מגיב בזמן-קרוב.",
            "scenarios מדמים lead time מוארך ונפילת-ספק.",
          ],
        },
        {
          id: "1.1.2",
          titleHe: "גלובליזציה",
          titleEn: "Globalization",
          execHe:
            "גלובליזציה פירושה שרשראות-אספקה החוצות יבשות, מטבעות, רגולציות ותרבויות. היא מגדילה הזדמנויות אך גם מורכבות: יותר אתרים, יותר ספקים, יותר מטבעות. S&OP גלובלי חייב ליישר תכנון בין אזורים מבלי לאבד את הראייה המקומית.",
          beginnerHe:
            "פעם ייצרת ומכרת באותה מדינה. היום החומרים מגיעים ממדינה אחת, הייצור באחרת, והמכירה בשלישית. גלובליזציה היא הפיזור הזה — והוא מסבך את התכנון כי צריך לתאם בין הרבה מקומות ומטבעות בו-זמנית.",
          consultantHe:
            "ב-SAP IBP, גלובליזציה ממומשת דרך planning area רב-מטבעי ורב-UoM עם היררכיות-master-data של אזור→מדינה→אתר→לקוח. unified planning model אחד מאפשר אגרגציה מלמטה-למעלה (bottom-up) ופירוק מלמעלה-למטה (top-down). יש לתת תשומת-לב לאזורי-זמן, ללוחות-שנה (calendars) ולהמרת-מטבע ב-key figures כספיים.",
          purposeHe:
            "המטרה: לנהל תכנון אחיד וגלובלי תוך שמירה על רזולוציה מקומית — אזור, מדינה, אתר — ולאפשר השוואה ואיחוד בין שווקים שונים במטבע ובמדידה אחידים.",
          processExampleHe:
            "תאגיד עם מפעלים באירופה ובאסיה מתכנן ביקוש גלובלי. ב-IBP, כל אזור מתחזק את התחזית המקומית שלו; ה-planning area מאחד למבט גלובלי במטבע אחיד, וההנהלה מאזנת היצע בין-אזורי.",
          cbcHe:
            "ב-CBC: מפעלי-מילוי במספר מדינות חולקים את אותו ריכוז (concentrate) מ-The Coca-Cola Company. ה-planning area הגלובלי מאחד את תחזיות-המכירות של כל המדינות לתכנון רכש-ריכוז כולל, תוך שמירה על תכנון-מילוי מקומי לכל מפעל.",
          navHe: [
            "SAP IBP Web UI ► Master Data ► Maintain Region / Country / Location hierarchies",
            "SAP IBP ► Planning Area ► Currency Conversion settings",
            "SAP IBP Excel add-in ► Planning View ► Aggregate / Disaggregate by geography",
          ],
          tables: ["master data type (Region, Country, Location, Customer)", "planning area", "currency", "unit of measure"],
          tcodes: ["SAP IBP", "IBP for Demand", "IBP for Supply", "Excel add-in"],
          fiori: ["SAP IBP Web UI", "Master Data Workbook", "Global Planning Dashboard"],
          configHe: [
            "הגדר היררכיות גאוגרפיות (Region → Country → Location) כ-master data types ב-planning area.",
            "הפעל currency conversion והגדר מטבע-תכנון אחיד ל-key figures כספיים גלובליים.",
            "מודל unit-of-measure conversions כדי לאחד מוצרים הנמדדים שונה בין שווקים.",
          ],
          flow: [
            { he: "תחזית מקומית לכל אזור", code: "IBP for Demand" },
            { he: "המרת מטבע ו-UoM", code: "planning area" },
            { he: "אגרגציה למבט גלובלי", note: "bottom-up" },
            { he: "איזון בין-אזורי", note: "ב-S&OP review" },
          ],
          masterDataHe: [
            "היררכיות Region/Country/Location/Customer — עמוד-השדרה של תכנון גלובלי.",
            "טבלאות currency ו-UoM conversion — לאיחוד מטבע ומדידה.",
          ],
          mistakesHe: [
            "ניהול מספר planning areas מבודדים במקום מודל גלובלי אחד — מונע איחוד.",
            "התעלמות מהמרת-מטבע — דוחות כספיים גלובליים שגויים.",
          ],
          troubleshootHe: [
            "ערכים כספיים לא מסתכמים גלובלית ➔ currency conversion לא מוגדר.",
            "כמויות לא ניתנות לאיחוד בין שווקים ➔ חסר UoM conversion.",
          ],
          bestPracticeHe: [
            "השתמש ב-unified planning model אחד עם היררכיות גאוגרפיות, לא בכמה מודלים נפרדים.",
            "קבע מטבע-תכנון גלובלי אחד וודא המרות מעודכנות.",
          ],
          interviewHe: [
            { qHe: "כיצד IBP תומך בתכנון גלובלי?", aHe: "דרך planning area אחד עם היררכיות master-data גאוגרפיות, currency ו-UoM conversion, המאפשר אגרגציה גלובלית ופירוק מקומי." },
            { qHe: "מדוע unified planning model עדיף על כמה מודלים נפרדים?", aHe: "הוא מאפשר ראייה גלובלית מאוחדת ואיזון בין-אזורי, בעוד מודלים מבודדים מונעים השוואה ואיחוד." },
          ],
          takeawaysHe: [
            "גלובליזציה = תכנון חוצה-מדינות, מטבעות ומדידות.",
            "planning area אחד עם היררכיות גאוגרפיות הוא הפתרון.",
            "currency ו-UoM conversion הכרחיים לאיחוד.",
          ],
        },
        {
          id: "1.1.3",
          titleHe: "תנודתיות-שוק",
          titleEn: "Market Volatility",
          execHe:
            "תנודתיות-שוק היא קצב-השינוי המהיר והבלתי-צפוי בביקוש, במחירים ובהעדפות-צרכן. היא הופכת תחזיות-נקודה למסוכנות ומחייבת תכנון מבוסס-תרחישים, חישה-מהירה של ביקוש (demand sensing), ויכולת לתכנן-מחדש בתדירות גבוהה.",
          beginnerHe:
            "תנודתיות פירושה שהביקוש קופץ למעלה ולמטה בלי התראה — מבצע של מתחרה, גל-חום, טרנד ברשת. אם תכננת לפי מספר אחד 'קבוע', תפספס. צריך לתכנן כמה תרחישים ולהגיב מהר.",
          consultantHe:
            "ב-SAP IBP מטפלים בתנודתיות דרך IBP for Demand: תחזיות סטטיסטיות עם מספר אלגוריתמים, demand sensing מבוסס-נתונים-קצרים, וניתוח forecast error. ה-scenarios וה-what-if מאפשרים לבחון תגובות; ריצות-תכנון תכופות (application jobs) שומרות על רעננות. key figures של שונות-ביקוש מזינים את מלאי-הביטחון.",
          purposeHe:
            "המטרה: להפחית את הסיכון מתחזית שגויה — לזהות שינויי-ביקוש מוקדם, להחזיק תרחישים חלופיים, ולתכנן-מחדש מהר כשהשוק זז.",
          processExampleHe:
            "גל-חום מקדים מקפיץ ביקוש למשקאות-קרים. demand sensing ב-IBP for Demand מזהה את הקפיצה מנתוני-מכירות יומיים, מעדכן את התחזית קצרת-הטווח, ומפעיל התראה לתכנון-ההיצע — הכל לפני מחזור ה-S&OP החודשי.",
          cbcHe:
            "ב-CBC: מבצע פתאומי של רשת-קמעונאות מכפיל ביקוש ל-SKU מסוים. IBP for Demand מזהה את החריגה, יוצרים scenario של ביקוש-מוגבר, ובוחנים אם קווי-המילוי יכולים לעמוד בו לפני שמתחייבים לרשת.",
          navHe: [
            "SAP IBP ► IBP for Demand ► Demand Sensing run",
            "SAP IBP ► Application Jobs ► Statistical Forecasting (multiple algorithms)",
            "SAP IBP Excel add-in ► Forecast Error / Scenarios analysis",
          ],
          tables: ["key figure (Statistical Forecast, Forecast Error)", "scenario", "algorithm profile", "time profile"],
          tcodes: ["IBP for Demand", "SAP IBP", "Excel add-in"],
          fiori: ["SAP IBP Web UI", "Demand Planning Analytics", "Forecast Error Dashboard"],
          configHe: [
            "הגדר forecast models עם מספר אלגוריתמים סטטיסטיים והפעל בחירה-אוטומטית (best-fit) ב-IBP for Demand.",
            "הפעל demand sensing על key figures של מכירות-בפועל קצרות-טווח.",
            "תזמן application jobs תכופים לתחזית מחדש בתדירות גבוהה.",
          ],
          flow: [
            { he: "זיהוי שינוי-ביקוש", code: "Demand Sensing" },
            { he: "תחזית סטטיסטית מחדש", code: "IBP for Demand" },
            { he: "scenario / what-if", code: "Excel add-in" },
            { he: "תכנון-מחדש מהיר", note: "אילרט להיצע" },
          ],
          masterDataHe: [
            "key figures של תחזית, מכירות-בפועל ו-forecast error — הבסיס לחישת-ביקוש.",
            "time profile עם רזולוציה יומית/שבועית לתמיכה ב-demand sensing.",
          ],
          mistakesHe: [
            "שימוש בתחזית-נקודה יחידה במקום בתרחישים תחת תנודתיות.",
            "תדירות-תכנון נמוכה מדי — התחזית מתיישנת לפני שמגיבים.",
          ],
          troubleshootHe: [
            "התחזית לא תופסת קפיצות-ביקוש ➔ demand sensing לא פעיל או חסרים נתוני-מכירות יומיים.",
            "forecast error גבוה באופן עקבי ➔ בחירת-אלגוריתם לא מתאימה; הפעל best-fit.",
          ],
          bestPracticeHe: [
            "השתמש ב-best-fit לבחירת האלגוריתם הסטטיסטי הטוב ביותר לכל מוצר.",
            "שלב demand sensing עם מחזור-S&OP חודשי כדי לתפוס שינויים בין-מחזורים.",
          ],
          interviewHe: [
            { qHe: "מהו demand sensing וכיצד הוא עוזר בתנודתיות?", aHe: "טכניקה ב-IBP for Demand המשתמשת בנתוני-מכירות קצרי-טווח כדי לעדכן את התחזית קצרת-הטווח מהר, ולתפוס שינויי-ביקוש בין מחזורי-S&OP." },
            { qHe: "מדוע תחזית-נקודה מסוכנת בשוק תנודתי?", aHe: "כי השוק זז מהר; מספר-יחיד מתעלם מאי-הוודאות. תרחישים ו-what-if נותנים טווח-תגובות מוכן מראש." },
          ],
          takeawaysHe: [
            "תנודתיות הופכת תחזית-נקודה למסוכנת.",
            "IBP for Demand מספק תחזיות-סטטיסטיות, demand sensing ו-forecast error.",
            "תרחישים ותכנון-מחדש תכוף הם המענה.",
          ],
        },
      ],
    },
    // ============================================================ 1.2
    {
      id: "1.2",
      titleHe: "מניעים תהליכיים (Process Drivers)",
      titleEn: "Process Drivers",
      execHe:
        "המניעים התהליכיים הם הסיבות הפנימיות שהפכו את S&OP לתהליך-ניהול מובנה: הצורך בהגדרה אחידה, באופקי-תכנון נכונים ובפירוק התהליך לשלבים חוזרים. בלי תהליך מוגדר, ה-S&OP מתמוטט לסדרת-פגישות לא-יעילות. תהליך טוב יוצר קצב חודשי, אחריות ברורה והחלטות מיושרות.",
      beginnerHe:
        "אם המניעים השוקיים הם 'למה צריך S&OP', המניעים התהליכיים הם 'איך עושים אותו נכון'. צריך הגדרה ברורה מהו S&OP, אילו אופקי-זמן הוא מכסה, ואילו שלבים חוזרים בכל חודש. בלי המבנה הזה, הפגישות הופכות לבזבוז-זמן.",
      consultantHe:
        "ביישום SAP IBP, המניעים התהליכיים מתורגמים לתצורת ה-time profile (planning horizon, buckets), ל-process management (SAP IBP, supply chain — תזמור שלבי-המחזור), ול-task lists/workflows. ה-S&OP הקלאסי הוא חמשת-השלבים: Product Review, Demand Review, Supply Review, Reconciliation, Management Business Review. כל שלב ממופה ל-planning views, jobs ו-collaboration.",
      purposeHe:
        "המטרה: להפוך את ה-S&OP מאוסף-פגישות לתהליך-ניהול חזרתי ומדיד — עם הגדרה, אופק ושלבים ברורים — שמייצר החלטות מיושרות מדי חודש.",
      processExampleHe:
        "ארגון מגדיר מחזור-S&OP חודשי: בשבוע הראשון Demand Review, בשני Supply Review, בשלישי Reconciliation, וברביעי Management Business Review. כל שלב נתמך ב-planning view ייעודי ב-IBP, וה-process management מתזמן את המעברים.",
      cbcHe:
        "ב-CBC: מחזור-S&OP חודשי מיישר את תחזית-המכירות של המשקאות מול קיבולת קווי-המילוי וזמינות-הריכוז. כל שלב במחזור מתורגם ל-planning view ב-SAP IBP, וההנהלה מקבלת תוכנית-מילוי מאושרת אחת לחודש לכל המפעלים.",
      navHe: [
        "SAP IBP Web UI ► Process Management ► Create S&OP Process",
        "SAP IBP ► Planning Area ► Time Profile (horizon + buckets)",
        "SAP IBP ► Application Jobs ► Copy Operator / Snapshot (בין-שלבים)",
      ],
      tables: ["time profile", "planning area", "process (SAP IBP)", "snapshot key figure"],
      tcodes: ["SAP IBP", "IBP for Sales and Operations", "Excel add-in"],
      fiori: ["SAP IBP Web UI", "Process Management", "Collaboration"],
      configHe: [
        "הגדר time profile עם אופק-תכנון (לרוב 18–24 חודשים) ו-buckets (חודשי/שבועי) ב-planning area.",
        "מודל את חמשת-השלבים ב-process management של SAP IBP עם אחראים ותאריכי-יעד.",
        "השתמש ב-snapshots ו-copy operators כדי לשמר את גרסת-התוכנית בכל מעבר-שלב.",
      ],
      flow: [
        { he: "Product Review", note: "סקירת-מוצר וחדשנות" },
        { he: "Demand Review", code: "IBP for Demand" },
        { he: "Supply Review", code: "IBP for Supply" },
        { he: "Reconciliation", note: "איזון ביקוש-היצע-כספים" },
        { he: "Management Business Review", note: "אישור-הנהלה" },
      ],
      masterDataHe: [
        "time profile — מגדיר את אופק-התכנון ואת רזולוציית-הזמן של כל המחזור.",
        "snapshot key figures — שומרים את גרסת-התוכנית בכל שלב לצורך מעקב.",
      ],
      mistakesHe: [
        "ניהול S&OP בלי הגדרת-תהליך פורמלית — פגישות ללא קלט/פלט ברורים.",
        "אופק-תכנון לא מתאים — קצר מדי לראיית-קיבולת או ארוך מדי לדיוק.",
        "אין snapshots בין-שלבים — אי-אפשר לעקוב כיצד התוכנית השתנתה.",
      ],
      troubleshootHe: [
        "השלבים לא זורמים בזמן ➔ process management לא הוגדר עם תאריכי-יעד ואחראים.",
        "אי-אפשר להשוות גרסאות-תוכנית בין-שלבים ➔ חסרים snapshot key figures.",
      ],
      bestPracticeHe: [
        "עגן את ה-S&OP במחזור חודשי קבוע עם חמשת-השלבים והאחראים שלהם.",
        "התאם את אופק-התכנון לטווח-ההחלטות (18–24 חודשים נפוץ).",
        "צלם snapshot בכל מעבר-שלב לשקיפות ולמעקב.",
      ],
      interviewHe: [
        { qHe: "מהם חמשת שלבי ה-S&OP הקלאסי?", aHe: "Product Review, Demand Review, Supply Review, Reconciliation, Management Business Review — מחזור חודשי המיישר ביקוש, היצע וכספים." },
        { qHe: "מה תפקיד ה-time profile ב-IBP בהקשר התהליך?", aHe: "הוא מגדיר את אופק-התכנון ואת ה-buckets (חודשי/שבועי) שעליהם רץ כל מחזור-ה-S&OP." },
      ],
      takeawaysHe: [
        "המניעים התהליכיים הם 'איך' עושים S&OP נכון.",
        "הגדרה, אופק ושלבים חוזרים הם עמודי-התהליך.",
        "ב-IBP: time profile, process management ו-snapshots.",
      ],
      children: [
        {
          id: "1.2.1",
          titleHe: "הגדרת תהליך ה-S&OP",
          titleEn: "S&OP Process Definition",
          execHe:
            "הגדרת ה-S&OP קובעת מהו התהליך: תהליך-ניהול חודשי, חוצה-מחלקות, המיישר תוכנית-ביקוש אחת עם תוכנית-היצע אחת עם תוכנית כספית אחת. ההגדרה הברורה מבדילה S&OP מתקצוב, מ-MRP ומפגישות-מכירות אקראיות.",
          beginnerHe:
            "S&OP הוא 'הפגישה החודשית הגדולה' שבה מכירות, ייצור וכספים מסכמים יחד תוכנית אחת לחודשים הקרובים. ההגדרה אומרת בדיוק מי משתתף, מה מחליטים, ובאיזו תדירות — כדי שכולם ידברו על אותו מספר.",
          consultantHe:
            "ב-SAP IBP ההגדרה ממומשת כ-planning area + time profile + process. ה-planning area מאחד את ה-key figures של ביקוש, היצע וכספים; ה-process מתזמר את השלבים; וה-collaboration מתעד החלטות. כיועץ, ההגדרה היא נקודת-ההתחלה: היקף, משתתפים, קצב ופלט-החלטה.",
          purposeHe:
            "המטרה: ליצור הבנה משותפת מהו S&OP בארגון — היקפו, תדירותו וההחלטות שהוא מייצר — כדי שכל המחלקות יפעלו לפי אותו תהליך.",
          processExampleHe:
            "הארגון מגדיר: S&OP הוא תהליך חודשי בראשות סמנכ\"ל-תפעול, המיישר תחזית-מכירות מול קיבולת-ייצור ומול תקציב, ומפיק תוכנית-אספקה מאושרת אחת. ההגדרה מתועדת ומוטמעת ב-process management של IBP.",
          cbcHe:
            "ב-CBC: ההגדרה קובעת ש-S&OP הוא מחזור חודשי המיישר את ביקוש-המשקאות מול קיבולת-המילוי וזמינות-הריכוז, ומפיק תוכנית-מילוי אחת מאושרת לכל מפעלי-החברה.",
          navHe: [
            "SAP IBP Web UI ► Process Management ► Define Process Template",
            "SAP IBP ► Planning Area ► assign key figures (Demand/Supply/Financial)",
            "SAP IBP ► Collaboration ► Cases & Tasks",
          ],
          tables: ["planning area", "process (SAP IBP)", "time profile", "key figure"],
          tcodes: ["SAP IBP", "IBP for Sales and Operations", "Excel add-in"],
          fiori: ["SAP IBP Web UI", "Process Management", "Collaboration"],
          configHe: [
            "הגדר process template ב-SAP IBP עם שלבים, אחראים, קלט ופלט לכל שלב.",
            "ודא ש-planning area מכיל את כל ה-key figures הנדרשים (ביקוש, היצע, כספים) לתהליך מאוחד.",
          ],
          mistakesHe: [
            "הגדרה לא-פורמלית — כל מחלקה מבינה S&OP אחרת.",
            "ערבוב S&OP עם תקצוב או MRP — בלבול-תפקידים.",
          ],
          troubleshootHe: [
            "משתתפים מגיעים עם מספרים שונים ➔ אין planning area מאוחד או הגדרת-תהליך משותפת.",
          ],
          bestPracticeHe: [
            "תעד הגדרת-S&OP אחת ברורה והפץ אותה לכל המשתתפים.",
            "הבחן מפורשות בין S&OP (טקטי-אסטרטגי) ל-MRP (תפעולי).",
          ],
          interviewHe: [
            { qHe: "כיצד מגדירים S&OP?", aHe: "כתהליך-ניהול חודשי חוצה-מחלקות המיישר תוכנית-ביקוש, תוכנית-היצע ותוכנית כספית אחת — שונה מתקצוב ומ-MRP." },
            { qHe: "מה ההבדל בין S&OP ל-MRP?", aHe: "S&OP הוא טקטי-אסטרטגי (חודשים-שנים, רמת-אגרגציה) ומיישר מחלקות; MRP הוא תפעולי (שבועות, רמת-SKU) ומחשב דרישות-חומר." },
          ],
          takeawaysHe: [
            "הגדרה ברורה היא תנאי להצלחת S&OP.",
            "S&OP = תהליך חודשי, חוצה-מחלקות, מאחד שלוש תוכניות.",
            "ב-IBP: planning area + process + collaboration.",
          ],
        },
        {
          id: "1.2.2",
          titleHe: "אופקי-תכנון",
          titleEn: "Planning Horizons",
          execHe:
            "אופק-התכנון הוא טווח-הזמן שה-S&OP מכסה — לרוב 18 עד 24 חודשים קדימה ברזולוציה חודשית. בחירת-האופק קובעת אילו החלטות אפשר לקבל: אופק קצר מאפשר רק תיקונים, אופק ארוך מאפשר השקעות-קיבולת ופיתוח-מוצר.",
          beginnerHe:
            "אופק-תכנון הוא 'כמה רחוק קדימה אנחנו מסתכלים'. אם מסתכלים רק חודש קדימה, מאוחר מדי לבנות קו-ייצור חדש. S&OP מסתכל הרבה חודשים קדימה כדי שיהיה זמן להחליט על השקעות גדולות.",
          consultantHe:
            "ב-SAP IBP אופק-התכנון מוגדר ב-time profile של ה-planning area: מספר ה-buckets קדימה (ואחורה להיסטוריה), הרזולוציה (חודשי לרוב, שבועי לטווח-קרוב), ולוח-השנה. אופק שונה לכל מודול: IBP for Demand ארוך, IBP for Response קצר. יש להתאים את האופק לטווח-ההחלטות הרלוונטי.",
          purposeHe:
            "המטרה: להבטיח שה-S&OP מסתכל מספיק רחוק קדימה כדי לאפשר את ההחלטות שהוא אמור לקבל — קיבולת, מלאי, פיתוח — בלי לאבד דיוק בטווח-הקרוב.",
          processExampleHe:
            "ארגון בוחר אופק של 24 חודשים: 18 הראשונים ברזולוציה חודשית לתכנון-תפעולי-טקטי, ו-6 האחרונים לתכנון-קיבולת אסטרטגי. ה-time profile ב-IBP מוגדר בהתאם.",
          cbcHe:
            "ב-CBC: אופק של 18 חודשים מאפשר לתכנן את שיא-הקיץ הבא — להזמין ריכוז מראש, לתזמן תחזוקת-קווים מחוץ לעונה, ולהחליט על הוספת-משמרת לפני הביקוש.",
          navHe: [
            "SAP IBP ► Planning Area ► Time Profile ► Define Horizon & Buckets",
            "SAP IBP Excel add-in ► Planning View ► Time Settings",
          ],
          tables: ["time profile", "time bucket", "calendar", "planning area"],
          tcodes: ["SAP IBP", "Excel add-in"],
          fiori: ["SAP IBP Web UI", "Time Profile Configuration"],
          configHe: [
            "הגדר ב-time profile את מספר ה-buckets קדימה (אופק) ואחורה (היסטוריה לתחזית).",
            "קבע רזולוציות: חודשי לאופק-מלא, שבועי לטווח-הקרוב (לתמיכה ב-Response).",
          ],
          mistakesHe: [
            "אופק קצר מדי — אין זמן להחלטות-קיבולת ארוכות-טווח.",
            "אופק ארוך מדי ברזולוציה גסה — אובדן דיוק בטווח-הקרוב.",
          ],
          troubleshootHe: [
            "אי-אפשר לתכנן קיבולת עתידית ➔ אופק ה-time profile קצר מדי.",
            "תחזית סטטיסטית חלשה ➔ חסרים מספיק buckets היסטוריים אחורה.",
          ],
          bestPracticeHe: [
            "התאם אופק (לרוב 18–24 חודשים) לטווח-ההחלטות העסקיות.",
            "השתמש ברזולוציה מעורבת: שבועי בטווח-קרוב, חודשי בטווח-רחוק.",
          ],
          interviewHe: [
            { qHe: "מהו אופק-תכנון טיפוסי ב-S&OP?", aHe: "18 עד 24 חודשים קדימה ברזולוציה חודשית — מספיק ארוך להחלטות-קיבולת, מספיק מפורט לתכנון-תפעולי." },
            { qHe: "היכן מוגדר אופק-התכנון ב-IBP?", aHe: "ב-time profile של ה-planning area — מספר ה-buckets, הרזולוציה ולוח-השנה." },
          ],
          takeawaysHe: [
            "אופק-התכנון קובע אילו החלטות אפשריות.",
            "טיפוסי: 18–24 חודשים, רזולוציה מעורבת.",
            "מוגדר ב-time profile של ה-planning area.",
          ],
        },
        {
          id: "1.2.3",
          titleHe: "פירוק תהליך ה-S&OP",
          titleEn: "S&OP Process Decomposition",
          execHe:
            "פירוק התהליך הוא חלוקת ה-S&OP לשלבים נפרדים, חוזרים וברי-מדידה: Product Review, Demand Review, Supply Review, Reconciliation, Management Business Review. כל שלב בעל קלט, פלט, אחראי ומועד — וביחד הם יוצרים מחזור-ניהול חודשי שלם.",
          beginnerHe:
            "במקום פגישה אחת ענקית ומבולגנת, מפרקים את ה-S&OP לחמש פגישות קטנות ומסודרות — כל אחת עם נושא אחד: קודם המוצרים, אז הביקוש, אז ההיצע, אז משווים, ולבסוף ההנהלה מאשרת. כל שלב 'מעביר את המקל' לבא אחריו.",
          consultantHe:
            "ב-SAP IBP כל שלב ממופה ל-planning view, jobs ו-collaboration ייעודיים: Demand Review → IBP for Demand views + statistical forecast jobs; Supply Review → IBP for Supply/Response heuristic או optimizer; Reconciliation → planning views משולבים עם scenarios; Management Business Review → dashboards. ה-process management מתזמר את הרצף ומתעד החלטות.",
          purposeHe:
            "המטרה: להפוך תהליך מורכב לרצף-שלבים מנוהל — כל שלב ממוקד, מדיד, ובעל אחריות ברורה — כדי שהמחזור יזרום בצורה צפויה ויפיק החלטה מאושרת.",
          processExampleHe:
            "Demand Review מפיק תחזית-ביקוש מוסכמת ➔ זו הקלט ל-Supply Review שבוחן אם ההיצע יכול לעמוד בה ➔ Reconciliation מאזן פערים ובוחן תרחישים ➔ Management Business Review מאשר תוכנית סופית. כל מעבר מתועד ב-snapshot.",
          cbcHe:
            "ב-CBC: Demand Review מסכם תחזית-מכירות-משקאות; Supply Review בודק מול קיבולת-מילוי וריכוז; Reconciliation מאזן (למשל הזזת-מבצע מחוץ-לשיא); Management Business Review מאשר תוכנית-מילוי חודשית.",
          navHe: [
            "SAP IBP Web UI ► Process Management ► Process Steps & Owners",
            "SAP IBP ► Application Jobs (per step: forecast / heuristic / optimizer)",
            "SAP IBP ► Collaboration ► Step Tasks & Decisions",
          ],
          tables: ["process (SAP IBP)", "process step", "snapshot key figure", "planning view"],
          tcodes: ["SAP IBP", "IBP for Demand", "IBP for Supply", "IBP for Response", "Excel add-in"],
          fiori: ["SAP IBP Web UI", "Process Management", "Analytics Dashboards"],
          configHe: [
            "מודל כל אחד מחמשת-השלבים ב-process management עם קלט, פלט, אחראי ותאריך-יעד.",
            "קשר לכל שלב את ה-planning views וה-application jobs הרלוונטיים.",
            "הגדר snapshot key figures לתפיסת גרסת-התוכנית בסוף כל שלב.",
          ],
          flow: [
            { he: "Product Review", note: "מוצרים וחדשנות" },
            { he: "Demand Review", code: "IBP for Demand" },
            { he: "Supply Review", code: "IBP for Supply" },
            { he: "Reconciliation", note: "scenarios + איזון" },
            { he: "Management Business Review", code: "Dashboards" },
          ],
          masterDataHe: [
            "process steps עם אחראים — שלד המחזור.",
            "snapshot key figures — תיעוד הגרסה בסוף כל שלב.",
          ],
          mistakesHe: [
            "דילוג על Reconciliation — פערי ביקוש-היצע מגיעים לא-פתורים להנהלה.",
            "שלבים ללא אחראי או מועד — המחזור נתקע.",
          ],
          troubleshootHe: [
            "ההנהלה מקבלת תוכנית לא-מאוזנת ➔ שלב Reconciliation לא בוצע כראוי.",
            "מעבר-שלב ללא תיעוד-שינוי ➔ חסר snapshot בסוף השלב.",
          ],
          bestPracticeHe: [
            "ודא שלכל שלב יש קלט-פלט ברורים, אחראי ומועד.",
            "אל תדלג על Reconciliation — שם נוצרת התוכנית המיושרת.",
          ],
          interviewHe: [
            { qHe: "מהו פירוק תהליך ה-S&OP?", aHe: "חלוקתו לשלבים חוזרים — Product, Demand, Supply, Reconciliation, Management Business Review — כל אחד עם קלט, פלט, אחראי ומועד." },
            { qHe: "כיצד שלבים ממופים ב-IBP?", aHe: "כל שלב ל-planning views, application jobs (forecast/heuristic/optimizer) ו-collaboration; ה-process management מתזמר אותם." },
          ],
          takeawaysHe: [
            "פירוק = רצף חמשת-השלבים החוזר.",
            "כל שלב: קלט, פלט, אחראי, מועד.",
            "Reconciliation הוא הלב שבו נוצרת התוכנית המיושרת.",
          ],
        },
      ],
    },
    // ============================================================ 1.3
    {
      id: "1.3",
      titleHe: "מניעים טכנולוגיים (Technology Drivers)",
      titleEn: "Technology Drivers",
      execHe:
        "המניעים הטכנולוגיים הם ההתפתחויות שאפשרו S&OP מודרני בקנה-מידה: מחשוב in-memory לתכנון אינטראקטיבי בזמן-אמת, ויזואליזציית-נתונים שהופכת מספרים לתובנות, ושיתוף-פעולה דיגיטלי שמחבר משתתפים מבוזרים. בלי הטכנולוגיה הזו, S&OP נשאר איטי, ידני ומבוסס-גיליונות.",
      beginnerHe:
        "פעם תכנון נעשה בגיליונות-אקסל ענקיים שלקח שעות לעדכן. הטכנולוגיה החדשה — זיכרון-מהיר (in-memory), גרפים ברורים, וכלי-שיתוף — מאפשרת לשנות מספר ולראות את ההשפעה מיד, להבין נתונים במבט-עין, ולעבוד יחד מרחוק. אלה ה'מניעים הטכנולוגיים'.",
      consultantHe:
        "SAP IBP בנוי על SAP HANA (in-memory), המאפשר חישוב-מחדש מיידי של key figures מורכבים על-פני מיליוני שילובים. ה-Excel add-in נותן עריכה אינטראקטיבית; ה-Web UI מספק analytics ו-dashboards; ו-collaboration (Cases, Tasks) מחבר משתתפים. כיועץ, נצל את ה-in-memory לתכנון אינטראקטיבי ולתרחישים בזמן-אמת.",
      purposeHe:
        "המטרה: להבין שהטכנולוגיה היא ה-enabler — בלי in-memory, ויזואליזציה ושיתוף-פעולה, ה-S&OP נשאר תהליך אצווה איטי. SAP IBP נבנה כדי לממש את שלושת אלה.",
      processExampleHe:
        "מתכנן משנה תחזית ב-Excel add-in; בזכות ה-in-memory, מלאי-הביטחון, עלות-ההיצע והרווחיות מחושבים-מחדש תוך שניות; dashboard ב-Web UI מציג את ההשפעה ויזואלית; והמתכנן פותח Case לדיון עם הרכש — הכל בלי המתנה ל-batch לילי.",
      cbcHe:
        "ב-CBC: מתכנן-הביקוש מעלה תחזית-קיץ ב-Excel add-in; IBP מחשב מיד את עומס קווי-המילוי ואת צריכת-הריכוז, מציג גרף-קיבולת ב-Web UI, ופותח Case לתכנון-ההיצע — מחזור-תכנון שלם בזמן-אמת.",
      navHe: [
        "SAP IBP Excel add-in ► Planning View ► Edit & Simulate (in-memory)",
        "SAP IBP Web UI ► Analytics ► Charts & Dashboards",
        "SAP IBP Web UI ► Collaboration ► Cases & Tasks",
      ],
      tables: ["key figure", "calculation (in-memory)", "chart", "case (collaboration)"],
      tcodes: ["SAP IBP", "Excel add-in", "SAP HANA"],
      fiori: ["SAP IBP Web UI", "Analytics", "Dashboards", "Collaboration"],
      configHe: [
        "הגדר calculated key figures שינוצלו את חישוב ה-in-memory לסימולציה מיידית.",
        "בנה charts ו-dashboards ב-Web UI לויזואליזציית key figures מרכזיים.",
        "הפעל collaboration (Cases/Tasks) לשיתוף-פעולה בין משתתפי-המחזור.",
      ],
      flow: [
        { he: "עריכה אינטראקטיבית", code: "Excel add-in", note: "in-memory" },
        { he: "חישוב-מחדש מיידי", code: "SAP HANA" },
        { he: "ויזואליזציה", code: "Web UI", note: "charts" },
        { he: "שיתוף-פעולה", note: "Cases & Tasks" },
      ],
      masterDataHe: [
        "calculated key figures — מנוצלים את ה-in-memory לחישוב בזמן-אמת.",
        "charts ו-dashboards — שכבת-הויזואליזציה מעל ה-key figures.",
      ],
      mistakesHe: [
        "המשך-עבודה בגיליונות-אקסל מנותקים במקום ב-Excel add-in המחובר ל-IBP.",
        "הצפת-נתונים בטבלאות במקום ויזואליזציה — מקשה על קבלת-החלטות.",
      ],
      troubleshootHe: [
        "חישוב-מחדש איטי ➔ key figures לא מנוצלים נכון את ה-in-memory; בדוק הגדרת-calculation.",
        "משתתפים לא מסונכרנים ➔ collaboration (Cases) לא בשימוש.",
      ],
      bestPracticeHe: [
        "נצל את ה-in-memory לתכנון אינטראקטיבי ולתרחישים בזמן-אמת.",
        "העדף dashboards ויזואליים על-פני טבלאות-מספרים בסקירות-הנהלה.",
        "הטמע collaboration כחלק מהמחזור, לא כתוספת.",
      ],
      interviewHe: [
        { qHe: "מהם שלושת המניעים הטכנולוגיים ל-S&OP מודרני?", aHe: "מחשוב in-memory לתכנון אינטראקטיבי, ויזואליזציית-נתונים, ושיתוף-פעולה דיגיטלי." },
        { qHe: "כיצד in-memory משנה את ה-S&OP?", aHe: "הוא מאפשר חישוב-מחדש מיידי של key figures מורכבים, ובכך הופך תכנון מאצווה-לילית לאינטראקטיבי בזמן-אמת." },
      ],
      takeawaysHe: [
        "טכנולוגיה היא ה-enabler של S&OP מודרני.",
        "השלושה: in-memory, ויזואליזציה, שיתוף-פעולה.",
        "SAP IBP בנוי על HANA, Excel add-in, Web UI ו-collaboration.",
      ],
      children: [
        {
          id: "1.3.1",
          titleHe: "תכנון אינטראקטיבי עם מחשוב in-memory",
          titleEn: "Interactive Planning with In-Memory Computing",
          execHe:
            "מחשוב in-memory (SAP HANA) מאחסן את כל נתוני-התכנון בזיכרון ומחשב key figures מורכבים תוך שניות. זה הופך את התכנון מתהליך-אצווה למשחק-אינטראקטיבי: משנים הנחה ורואים את ההשפעה מיד, מה שמאפשר ניתוח-תרחישים מהיר במהלך הפגישה עצמה.",
          beginnerHe:
            "in-memory פירושו שכל הנתונים יושבים ב'זיכרון המהיר' של המחשב, לא בדיסק האיטי. לכן כששנמשנים מספר, התוצאה מתעדכנת מיד — כמו באקסל, אבל על מיליוני שורות. זה מה שמאפשר 'לשחק' עם התכנון בזמן-אמת.",
          consultantHe:
            "ב-SAP IBP, ה-Excel add-in וה-Web UI שולחים בקשות-חישוב ל-HANA, שמריץ aggregation/disaggregation וקלקולציות מורכבות על מיליוני שילובי-master-data בזמן-אמת. נצל זאת ל-simulation mode (שינוי-מקומי לפני שמירה), ל-scenarios, ול-what-if במהלך הסקירה. הימנע מ-key figures כבדים שמאטים גם את ה-in-memory.",
          purposeHe:
            "המטרה: לאפשר קבלת-החלטות בזמן-אמת — לבחון 'מה-אם' תוך כדי הפגישה, ולא להמתין לריצת-batch לילית בין סבבים.",
          processExampleHe:
            "במהלך Demand Review, המתכנן מעלה תחזית ב-15% ב-Excel add-in במצב-סימולציה; ה-in-memory מחשב מיד את צריכת-הקיבולת ואת הרווחיות; המשתתפים רואים את ההשפעה ומחליטים — בלי לצאת מהפגישה.",
          cbcHe:
            "ב-CBC: בפגישת-Demand Review מעלים את תחזית-הקיץ; in-memory מציג מיד שקו-מילוי 2 יעבור 100% עומס, וההחלטה על משמרת-נוספת מתקבלת בו-במקום.",
          navHe: [
            "SAP IBP Excel add-in ► Planning View ► Simulate (Edit before Save)",
            "SAP IBP Web UI ► Analytics ► real-time recalculation",
          ],
          tables: ["calculated key figure", "aggregation/disaggregation", "simulation", "SAP HANA"],
          tcodes: ["SAP IBP", "Excel add-in", "SAP HANA"],
          fiori: ["SAP IBP Web UI", "Planning View", "Analytics"],
          configHe: [
            "הגדר calculated key figures עם aggregation/disaggregation מתאים לחישוב-in-memory מהיר.",
            "אפשר simulation mode כדי שמתכננים יבחנו 'מה-אם' לפני שמירה.",
          ],
          mistakesHe: [
            "key figures מחושבים כבדים מדי — מאטים גם את ה-in-memory.",
            "שמירת-תרחיש ניסיוני לתוכנית-הבסיס במקום שימוש ב-simulation/scenario.",
          ],
          troubleshootHe: [
            "סימולציה איטית ➔ שרשרת-חישוב ארוכה או disaggregation יקר; פשט את ה-key figures.",
            "תרחיש 'דלף' לתוכנית ➔ נעשה edit ישיר במקום scenario נפרד.",
          ],
          bestPracticeHe: [
            "השתמש ב-simulation mode ו-scenarios לכל 'מה-אם', לא בעריכה ישירה.",
            "שמור על שרשראות-חישוב רדודות לביצועים מיטביים.",
          ],
          interviewHe: [
            { qHe: "מה מאפשר תכנון אינטראקטיבי ב-IBP?", aHe: "מחשוב in-memory של SAP HANA, המחשב key figures מורכבים על מיליוני שילובים בזמן-אמת — כך שינוי-הנחה מציג השפעה מיד." },
            { qHe: "מהו simulation mode?", aHe: "מצב ב-Excel add-in שבו משנים ערכים ורואים השפעה לפני שמירה לתוכנית — אידיאלי ל-what-if בפגישה." },
          ],
          takeawaysHe: [
            "in-memory הופך תכנון לאינטראקטיבי בזמן-אמת.",
            "simulation ו-scenarios ל-what-if בטוח.",
            "שמור key figures רדודים לביצועים.",
          ],
        },
        {
          id: "1.3.2",
          titleHe: "ויזואליזציית-נתונים",
          titleEn: "Data Visualization",
          execHe:
            "ויזואליזציית-נתונים הופכת אלפי מספרי-תכנון לגרפים, מפות-חום ולוחות-מחוונים שמובנים במבט-עין. היא מאיצה קבלת-החלטות בסקירות-S&OP: במקום לקרוא טבלאות, ההנהלה רואה מגמות, פערים וחריגות מיד.",
          beginnerHe:
            "קשה להבין 10,000 מספרים בטבלה. גרף אחד טוב מראה את אותו סיפור בשנייה — איפה הביקוש עולה, איפה ההיצע חסר. ויזואליזציה היא הפיכת הנתונים לתמונה שכל אחד מבין.",
          consultantHe:
            "ב-SAP IBP, ה-Web UI מספק analytics עשירים: charts, KPI tiles, dashboards אינטראקטיביים מעל ה-key figures. אפשר לקשר charts ל-planning views ול-scenarios. כיועץ, עצב dashboards ייעודיים לכל שלב/תפקיד — Demand, Supply, Management — והשתמש בויזואליזציה כשפת-הסקירה.",
          purposeHe:
            "המטרה: להאיץ הבנה והחלטה — להציג מגמות, פערים וחריגות ויזואלית כדי שהסקירה תתמקד בהחלטות ולא בפענוח-מספרים.",
          processExampleHe:
            "ב-Management Business Review, dashboard מציג גרף ביקוש-מול-היצע, KPI של רמת-שירות, ומפת-חום של מפעלים בעומס-יתר. ההנהלה מזהה את הצוואר ומחליטה — בלי לעבור טבלאות.",
          cbcHe:
            "ב-CBC: dashboard מציג עומס לכל קו-מילוי כמפת-חום (אדום=עומס-יתר), מגמת מכירות-משקאות, ורמת-מלאי-ריכוז — ההנהלה רואה מיד היכן הסיכון לקראת הקיץ.",
          navHe: [
            "SAP IBP Web UI ► Analytics ► Create Chart / Dashboard",
            "SAP IBP Web UI ► Dashboards ► assign to role / process step",
          ],
          tables: ["chart", "dashboard", "KPI", "key figure"],
          tcodes: ["SAP IBP", "Excel add-in"],
          fiori: ["SAP IBP Web UI", "Analytics", "Dashboards"],
          configHe: [
            "בנה charts (קו/עמודה/מפת-חום) מעל key figures מרכזיים ב-Web UI.",
            "ארגן dashboards לפי תפקיד ושלב-תהליך (Demand/Supply/Management).",
          ],
          mistakesHe: [
            "הצגת-טבלאות צפופות בסקירות במקום גרפים ברורים.",
            "dashboards עמוסים מדי — אובדן המסר המרכזי.",
          ],
          troubleshootHe: [
            "גרף לא מציג נתונים ➔ key figure או פילטר-זמן/master-data שגוי ב-chart.",
            "ההנהלה לא מזהה חריגות ➔ אין KPI/מפת-חום שמדגישה אותן.",
          ],
          bestPracticeHe: [
            "עצב dashboard ייעודי לכל שלב/תפקיד, ממוקד בהחלטות.",
            "הדגש חריגות עם צבע (מפת-חום) ו-KPI tiles.",
          ],
          interviewHe: [
            { qHe: "כיצד IBP תומך בויזואליזציה?", aHe: "דרך ה-Web UI — charts, KPI tiles ו-dashboards אינטראקטיביים מעל ה-key figures, ניתנים לקישור ל-planning views ו-scenarios." },
            { qHe: "מדוע ויזואליזציה חשובה ב-S&OP?", aHe: "היא מאיצה הבנה והחלטה: ההנהלה רואה מגמות וחריגות במבט-עין במקום לפענח טבלאות-מספרים." },
          ],
          takeawaysHe: [
            "ויזואליזציה הופכת מספרים לתובנות.",
            "ב-IBP: charts, KPIs ו-dashboards ב-Web UI.",
            "עצב dashboard ממוקד-החלטה לכל תפקיד.",
          ],
        },
        {
          id: "1.3.3",
          titleHe: "שיתוף-פעולה",
          titleEn: "Collaboration",
          execHe:
            "שיתוף-פעולה הוא היכולת של משתתפים מבוזרים — מכירות, ייצור, רכש, כספים — לעבוד על אותה תוכנית, לתעד החלטות ולהקצות משימות. הוא הופך את ה-S&OP מסדרת-מיילים ל-single source of truth שבו ההקשר וההחלטות נשמרים.",
          beginnerHe:
            "S&OP מערב הרבה אנשים ממחלקות שונות. במקום לשלוח קבצים במייל הלוך-ושוב, כולם עובדים על אותה מערכת, מגיבים, ומחלקים משימות. כך אף אחד לא עובד על גרסה ישנה ושום החלטה לא הולכת לאיבוד.",
          consultantHe:
            "ב-SAP IBP, collaboration ממומש דרך Cases ו-Tasks ב-Web UI, ושילוב עם SAP Jam/Microsoft Teams. אפשר לקשר Case ל-planning view או scenario ספציפי, להקצות משימות עם תאריכי-יעד, ולתעד החלטות. ה-process management מחבר את ה-collaboration לשלבי-המחזור.",
          purposeHe:
            "המטרה: ליצור single source of truth שיתופי — כל המשתתפים על אותה תוכנית, עם תיעוד-החלטות והקצאת-משימות — במקום סנכרון ידני דרך מיילים וקבצים.",
          processExampleHe:
            "מתכנן-ההיצע מזהה פער-קיבולת, פותח Case מקושר ל-planning view, מקצה Task לרכש לבדוק מקור-חלופי, ומתעד את ההחלטה. כל המשתתפים רואים את ההתקדמות בזמן-אמת.",
          cbcHe:
            "ב-CBC: בפער-ריכוז לקראת הקיץ, מתכנן פותח Case ומקצה Task ל-The Coca-Cola Company לבדוק הקדמת-משלוח, ומתעד את ההחלטה — כל המפעלים רואים את הסטטוס.",
          navHe: [
            "SAP IBP Web UI ► Collaboration ► Create Case / Task",
            "SAP IBP ► integration ► SAP Jam / Microsoft Teams",
          ],
          tables: ["case", "task", "collaboration", "planning view link"],
          tcodes: ["SAP IBP", "Excel add-in"],
          fiori: ["SAP IBP Web UI", "Collaboration", "Process Management"],
          configHe: [
            "הפעל Cases ו-Tasks ב-Web UI וקשר אותם ל-planning views/scenarios רלוונטיים.",
            "שלב עם SAP Jam / Microsoft Teams להתראות ולשיח-צוות.",
          ],
          mistakesHe: [
            "ניהול-החלטות במייל/אקסל מנותק — אובדן הקשר ועקבות.",
            "Cases ללא אחראי או מועד — לא מטופלים.",
          ],
          troubleshootHe: [
            "החלטות הולכות לאיבוד ➔ collaboration לא בשימוש; הכל מתועד מחוץ ל-IBP.",
            "משימה לא מטופלת ➔ Task ללא אחראי או תאריך-יעד.",
          ],
          bestPracticeHe: [
            "תעד כל החלטה כ-Case מקושר ל-planning view/scenario.",
            "הקצה לכל Task אחראי ומועד; שלב עם Teams/Jam להתראות.",
          ],
          interviewHe: [
            { qHe: "כיצד IBP תומך בשיתוף-פעולה?", aHe: "דרך Cases ו-Tasks ב-Web UI, מקושרים ל-planning views/scenarios, ושילוב עם SAP Jam/Microsoft Teams — single source of truth לתיעוד-החלטות ומשימות." },
            { qHe: "מדוע שיתוף-פעולה חיוני ל-S&OP?", aHe: "כי S&OP חוצה-מחלקות; collaboration מבטיח שכולם על אותה תוכנית, ושום החלטה או הקשר לא אובדים." },
          ],
          takeawaysHe: [
            "שיתוף-פעולה = single source of truth חוצה-מחלקות.",
            "ב-IBP: Cases, Tasks, ושילוב Jam/Teams.",
            "קשר כל החלטה ל-planning view ותעד אחריות ומועד.",
          ],
        },
      ],
    },
    // ============================================================ 1.4
    {
      id: "1.4",
      titleHe: "SAP Integrated Business Planning",
      titleEn: "SAP Integrated Business Planning",
      execHe:
        "SAP Integrated Business Planning (SAP IBP) הוא פתרון-הענן של SAP לתכנון שרשרת-אספקה משולב, היורש של APO. הוא מאחד ביקוש, היצע, מלאי, תגובה ו-S&OP בפלטפורמה אחת מבוססת-HANA, עם Excel add-in ל-UI מוכר ו-Web UI ל-analytics ושיתוף-פעולה. זהו הכלי שמממש בפועל את שלושת סוגי-המניעים.",
      beginnerHe:
        "SAP IBP הוא התוכנה של SAP לתכנון. במקום הרבה כלים נפרדים, היא מאחדת את כל התכנון — ביקוש, היצע, מלאי — במקום אחד בענן. עובדים בעיקר דרך תוסף לאקסל (מוכר ונוח) ודרך אתר-אינטרנט לגרפים ושיתוף.",
      consultantHe:
        "SAP IBP הוא SaaS על-גבי SAP HANA, עם מודולים (IBP for Demand/Inventory/Supply/Response/Sales and Operations) שחולקים planning area, master data ו-key figures אחידים. ה-Excel add-in הוא ה-UI לתכנון; ה-Web UI ל-analytics, collaboration ו-process management. אינטגרציה ל-S/4HANA/ECC דרך SAP Cloud Integration / CPI-DS. ה-Real-Time Integration (RTI) מאפשר חיבור ל-Response.",
      purposeHe:
        "המטרה: לספק פלטפורמה אחת, משולבת וענן-מבוססת לכל תכנון שרשרת-האספקה — שמממשת את הגישה המשולבת, אלגוריתמים טובים, חוויית-משתמש מוכרת וזריזות, ומחליפה את הכלים הישנים והמבודדים.",
      processExampleHe:
        "ביקוש מתוכנן ב-IBP for Demand → זורם ל-IBP for Supply שמתכנן היצע → IBP for Inventory מאזן מלאי-ביטחון → IBP for Response מגיב לטווח-קצר. הכל על אותו planning area, נראה ב-Excel add-in וב-Web UI, ומשולב עם S/4HANA.",
      cbcHe:
        "ב-CBC: SAP IBP מאחד את תכנון-המשקאות מקצה-לקצה — תחזית-מכירות ב-Demand, תכנון-מילוי ב-Supply, מלאי-ריכוז ב-Inventory, ותגובה לשיא-קיץ ב-Response — בענן אחד, משולב עם ה-S/4HANA של החברה.",
      navHe: [
        "SAP IBP Web UI ► Apps overview (Demand / Supply / Inventory / Response / S&OP)",
        "SAP IBP Excel add-in ► Connect to SAP IBP system",
        "SAP IBP ► Data Integration ► SAP Cloud Integration (CPI-DS) to S/4HANA",
      ],
      tables: ["planning area", "master data type", "key figure", "module (SAP IBP)"],
      tcodes: ["SAP IBP", "IBP for Demand", "IBP for Inventory", "IBP for Supply", "IBP for Response", "IBP for Sales and Operations", "Excel add-in"],
      fiori: ["SAP IBP Web UI", "Application Jobs", "Data Integration", "Process Management"],
      configHe: [
        "הקם planning area יחיד המשותף למודולים הרלוונטיים, עם master data types ו-key figures אחידים.",
        "התקן והגדר את ה-Excel add-in כ-UI התכנון; הגדר connection ל-IBP system.",
        "הגדר אינטגרציה דרך SAP Cloud Integration (CPI-DS) ל-S/4HANA/ECC, ו-RTI ל-Response.",
      ],
      flow: [
        { he: "IBP for Demand", note: "תחזית-ביקוש" },
        { he: "IBP for Supply", note: "תכנון-היצע" },
        { he: "IBP for Inventory", note: "מלאי-ביטחון" },
        { he: "IBP for Response", note: "תגובה קצרת-טווח" },
        { he: "IBP for Sales and Operations", note: "יישור-מחזור" },
      ],
      masterDataHe: [
        "planning area משותף — הליבה שמאחדת את כל המודולים.",
        "master data types ו-key figures אחידים — שפה משותפת בין המודולים.",
      ],
      mistakesHe: [
        "מימוש מודולים על planning areas נפרדים — אובדן האינטגרציה (היתרון המרכזי).",
        "התעלמות מ-Excel add-in והכרחת משתמשים ל-Web UI בלבד — התנגדות-אימוץ.",
        "אינטגרציה ל-S/4HANA לא-מוגדרת — נתונים לא-מסונכרנים.",
      ],
      troubleshootHe: [
        "מודולים לא 'מדברים' זה-עם-זה ➔ הוקמו על planning areas נפרדים במקום משותף.",
        "נתונים מ-S/4HANA לא מגיעים ➔ CPI-DS integration לא מוגדר/נכשל.",
        "ה-Excel add-in לא מתחבר ➔ הגדרת-connection או הרשאות שגויות.",
      ],
      bestPracticeHe: [
        "השתמש ב-planning area משותף לכל המודולים כדי לממש את האינטגרציה.",
        "אמץ את ה-Excel add-in כ-UI התכנון העיקרי לקבלת אימוץ-משתמשים מהיר.",
        "תכנן את אינטגרציית ה-CPI-DS ל-S/4HANA מוקדם במימוש.",
      ],
      interviewHe: [
        { qHe: "מהו SAP IBP ומה הוא מחליף?", aHe: "פתרון-ענן של SAP לתכנון שרשרת-אספקה משולב, מבוסס-HANA, היורש של SAP APO; מאחד Demand, Supply, Inventory, Response ו-S&OP בפלטפורמה אחת." },
        { qHe: "מהם שני ממשקי-המשתמש העיקריים של IBP?", aHe: "ה-Excel add-in לעבודת-תכנון אינטראקטיבית, וה-Web UI ל-analytics, dashboards, collaboration ו-process management." },
      ],
      takeawaysHe: [
        "SAP IBP = פתרון-ענן משולב לתכנון שרשרת-אספקה, יורש APO.",
        "מודולים חולקים planning area, master data ו-key figures.",
        "UI: Excel add-in (תכנון) + Web UI (analytics/collaboration).",
      ],
      children: [
        {
          id: "1.4.1",
          titleHe: "גישה משולבת",
          titleEn: "An Integrated Approach",
          execHe:
            "הגישה המשולבת היא לב-ליבו של IBP: כל המודולים חולקים מודל-נתונים אחד — planning area, master data ו-key figures. ביקוש, היצע, מלאי ותגובה אינם איים נפרדים אלא תצוגות שונות של אותה אמת אחת, מה שמבטל סנכרון-ידני וחוסר-עקביות.",
          beginnerHe:
            "פעם תכנון-ביקוש ותכנון-היצע ישבו בשתי מערכות שונות, וצריך היה 'להעביר' נתונים ביניהן ידנית. הגישה המשולבת אומרת: הכל במערכת אחת, על אותם נתונים — מה שתכנן הביקוש נראה מיד אצל ההיצע.",
          consultantHe:
            "ב-SAP IBP, ה-unified planning model מבוסס על planning area יחיד שמכיל את כל ה-key figures (Demand, Supply, Inventory, Response) על אותם master data types ו-time profile. אין צורך ב-interface בין-מודולרי — הכל calculation אחד ב-HANA. זה ההבדל המהותי מ-APO (מודולים נפרדים: DP/SNP/PPDS).",
          purposeHe:
            "המטרה: לבטל את ה-silos ואת הסנכרון-הידני — תוכנית-ביקוש זורמת מיד לתכנון-היצע ולמלאי, על מקור-נתונים אחד, בעקביות מלאה.",
          processExampleHe:
            "תחזית מעודכנת ב-IBP for Demand נראית מיד ב-key figures של IBP for Supply באותו planning area — בלי interface, בלי העברת-קבצים, בלי השהיה.",
          cbcHe:
            "ב-CBC: עדכון תחזית-משקה ב-Demand נראה מיד בתכנון-המילוי ובמלאי-הריכוז — מתכנן-ההיצע ומתכנן-המלאי עובדים על אותה אמת אחת.",
          navHe: [
            "SAP IBP ► Planning Area ► single area shared across modules",
            "SAP IBP Excel add-in ► same planning view across Demand/Supply key figures",
          ],
          tables: ["planning area", "master data type", "key figure", "unified planning model"],
          tcodes: ["SAP IBP", "IBP for Demand", "IBP for Supply", "Excel add-in"],
          fiori: ["SAP IBP Web UI", "Planning Area Configuration"],
          configHe: [
            "הקם planning area יחיד עם כל ה-key figures של כל המודולים על אותם master data ו-time profile.",
            "הימנע מ-areas נפרדים למודולים שאמורים להשתלב.",
          ],
          mistakesHe: [
            "planning areas נפרדים לכל מודול — חוזר ל-silos של APO.",
            "שכפול master data בין מודולים — חוסר-עקביות.",
          ],
          troubleshootHe: [
            "תחזית לא מגיעה לתכנון-היצע ➔ Demand ו-Supply על areas נפרדים.",
          ],
          bestPracticeHe: [
            "תכנן planning area משותף אחד כבסיס לכל יישום-IBP.",
            "החזק master data ו-time profile אחידים בין כל ה-key figures.",
          ],
          interviewHe: [
            { qHe: "מה הופך את IBP ל'משולב'?", aHe: "unified planning model — כל המודולים חולקים planning area, master data ו-key figures אחד, ללא interfaces בין-מודולריים." },
            { qHe: "מהו ההבדל מ-APO?", aHe: "ב-APO המודולים (DP/SNP/PPDS) נפרדים ודרשו אינטגרציה; ב-IBP הכל מודל-נתונים אחד ב-HANA." },
          ],
          takeawaysHe: [
            "גישה משולבת = planning area ומודל-נתונים אחד לכל המודולים.",
            "מבטלת silos וסנכרון-ידני.",
            "ההבדל המהותי מ-APO.",
          ],
        },
        {
          id: "1.4.2",
          titleHe: "אלגוריתמים טובים יותר",
          titleEn: "Better Algorithms",
          execHe:
            "IBP מביא אלגוריתמים מתקדמים: תחזיות סטטיסטיות מרובות עם best-fit ו-machine learning ב-Demand, אופטימיזציית multi-stage inventory ב-Inventory, ו-heuristic/optimizer ב-Supply/Response. אלה מפיקים תוכניות מדויקות ורווחיות יותר מכללי-אצבע ידניים.",
          beginnerHe:
            "אלגוריתם הוא 'מתכון-חישוב' חכם. IBP יודע לבחור לבד את שיטת-התחזית הטובה ביותר לכל מוצר, לחשב כמה מלאי-ביטחון בדיוק צריך, ולמצוא את תוכנית-ההיצע הזולה ביותר — דברים שקשה לעשות ידנית.",
          consultantHe:
            "ב-IBP for Demand: ספריית-אלגוריתמים (exponential smoothing, ARIMA, gradient boosting) עם best-fit אוטומטי ו-pre/post-processing. ב-IBP for Inventory: multi-echelon optimization שמתמחר אי-ודאות-ביקוש והיצע. ב-IBP for Supply/Response: heuristic מהיר מול optimizer מבוסס-LP/cost. בחר אלגוריתם לפי בשלות-נתונים ומטרה.",
          purposeHe:
            "המטרה: להחליף החלטות-מבוססות-תחושה באלגוריתמים מוכחים — דיוק-תחזית גבוה יותר, מלאי-ביטחון מיטבי, ותוכנית-היצע רווחית יותר.",
          processExampleHe:
            "best-fit ב-IBP for Demand בוחר אוטומטית את האלגוריתם בעל ה-error הנמוך לכל SKU; IBP for Inventory מחשב מלאי-ביטחון multi-stage; IBP for Supply optimizer ממזער עלות תוך עמידה באילוצים.",
          cbcHe:
            "ב-CBC: best-fit בוחר לכל משקה את שיטת-התחזית המתאימה (עונתי לגזוז, יציב למים); optimizer ב-Supply מחליט אילו מפעל ימלא איזה SKU בעלות-מינימום.",
          navHe: [
            "SAP IBP ► IBP for Demand ► Forecast Models ► Best-Fit / ML algorithms",
            "SAP IBP ► IBP for Inventory ► Multi-Stage Optimization run",
            "SAP IBP ► IBP for Supply ► Heuristic / Optimizer run",
          ],
          tables: ["algorithm profile", "forecast model", "optimization profile", "key figure"],
          tcodes: ["IBP for Demand", "IBP for Inventory", "IBP for Supply", "IBP for Response", "SAP IBP"],
          fiori: ["SAP IBP Web UI", "Application Jobs", "Forecast Analytics"],
          configHe: [
            "הגדר forecast models עם מספר אלגוריתמים והפעל best-fit ב-IBP for Demand.",
            "הגדר optimization profile (cost/constraints) ל-IBP for Supply/Response.",
            "כוון service levels ל-multi-stage inventory optimization.",
          ],
          mistakesHe: [
            "שימוש באלגוריתם יחיד לכל המוצרים במקום best-fit.",
            "הרצת optimizer בלי איכות-נתוני-עלות/אילוצים — תוצאה לא-אמינה.",
          ],
          troubleshootHe: [
            "דיוק-תחזית נמוך ➔ best-fit לא פעיל או נתוני-היסטוריה חסרים.",
            "optimizer מפיק תוכנית לא-הגיונית ➔ עלויות/אילוצים שגויים במודל.",
          ],
          bestPracticeHe: [
            "הפעל best-fit ועדכן מודלים תקופתית מול forecast error.",
            "ודא איכות נתוני-עלות ואילוצים לפני הרצת optimizer.",
          ],
          interviewHe: [
            { qHe: "מהו best-fit ב-IBP for Demand?", aHe: "מנגנון הבוחר אוטומטית, לכל מוצר, את האלגוריתם הסטטיסטי בעל שגיאת-התחזית הנמוכה ביותר מתוך ספרייה." },
            { qHe: "מה ההבדל בין heuristic ל-optimizer ב-Supply?", aHe: "heuristic מהיר ומבוסס-כללים; optimizer מבוסס-עלות/LP ומפיק תוכנית מיטבית תחת אילוצים, אך כבד יותר." },
          ],
          takeawaysHe: [
            "IBP מביא אלגוריתמים מתקדמים בכל מודול.",
            "best-fit ו-ML ב-Demand; multi-stage ב-Inventory; heuristic/optimizer ב-Supply.",
            "איכות-נתונים היא תנאי לתוצאה אמינה.",
          ],
        },
        {
          id: "1.4.3",
          titleHe: "חוויית-משתמש",
          titleEn: "User Experience",
          execHe:
            "חוויית-המשתמש של IBP בנויה סביב שני ממשקים משלימים: ה-Excel add-in — סביבה מוכרת שמורידה התנגדות-אימוץ ומאיצה תכנון; וה-Web UI — מודרני, ל-analytics, dashboards, collaboration ו-process management. השילוב נותן גם נוחות וגם עוצמה.",
          beginnerHe:
            "אנשי-תכנון אוהבים אקסל. IBP נותן להם לעבוד בדיוק שם — אבל מחובר למערכת בענן, עם כל הנתונים החיים. למשימות אחרות (גרפים, שיתוף) יש אתר-אינטרנט נוח. כך לא צריך ללמוד כלי חדש לגמרי.",
          consultantHe:
            "ה-Excel add-in מתחבר ל-IBP, טוען planning views עם key figures, מאפשר edit/simulate/scenario ושמירה חזרה — תוך ניצול ה-in-memory. ה-Web UI (SAPUI5/Fiori) מספק analytics, dashboards, alerts, collaboration ו-process/job management. כיועץ, מפה משימות לממשק: תכנון→Excel, ניתוח/שיתוף/ניהול→Web.",
          purposeHe:
            "המטרה: למקסם אימוץ-משתמשים ופרודוקטיביות — ממשק מוכר (Excel) למתכננים, וממשק מודרני (Web) לניתוח ולשיתוף — במקום כלי יחיד שמתפשר על שניהם.",
          processExampleHe:
            "מתכנן עורך תחזית ב-Excel add-in; מנהל בוחן dashboards ופותח Cases ב-Web UI; אדמין מתזמן application jobs ב-Web UI. כל תפקיד בממשק המתאים לו.",
          cbcHe:
            "ב-CBC: מתכנני-הביקוש במפעלים עובדים ב-Excel add-in המוכר; מנהלי-S&OP בוחנים dashboards ופותחים Cases ב-Web UI — אימוץ מהיר בכל הרמות.",
          navHe: [
            "SAP IBP Excel add-in ► Planning View ► Favorites & Templates",
            "SAP IBP Web UI ► Apps ► Analytics / Collaboration / Application Jobs",
          ],
          tables: ["planning view", "template", "favorite", "Web UI app"],
          tcodes: ["SAP IBP", "Excel add-in"],
          fiori: ["SAP IBP Web UI", "Fiori Launchpad", "Analytics", "Collaboration"],
          configHe: [
            "הגדר planning view templates ו-favorites ב-Excel add-in לזרימת-עבודה אחידה.",
            "ארגן את ה-Web UI Launchpad לפי תפקידים (planner/manager/admin).",
          ],
          mistakesHe: [
            "הכרחת מתכננים ל-Web UI בלבד — מגבירה התנגדות.",
            "אי-תחזוקת templates — כל מתכנן בונה view שונה.",
          ],
          troubleshootHe: [
            "אימוץ-משתמשים נמוך ➔ לא ניצלו את ה-Excel add-in המוכר.",
            "Excel add-in איטי/לא-מתחבר ➔ connection/הרשאות או view כבד מדי.",
          ],
          bestPracticeHe: [
            "מפה משימות לממשק: תכנון→Excel add-in, ניתוח/שיתוף/ניהול→Web UI.",
            "ספק templates ו-favorites מוכנים להאצת-אימוץ.",
          ],
          interviewHe: [
            { qHe: "מהם שני ממשקי-המשתמש של IBP ולמה כל אחד?", aHe: "Excel add-in לתכנון אינטראקטיבי (מוכר, מאיץ אימוץ) ו-Web UI ל-analytics, dashboards, collaboration ו-process/job management." },
            { qHe: "מדוע ה-Excel add-in חשוב לאימוץ?", aHe: "כי מתכננים מכירים את Excel; עבודה בסביבה מוכרת מורידה התנגדות ומקצרת הדרכה." },
          ],
          takeawaysHe: [
            "שני ממשקים משלימים: Excel add-in + Web UI.",
            "Excel = תכנון מוכר; Web = analytics/collaboration/ניהול.",
            "מיפוי-נכון מאיץ אימוץ-משתמשים.",
          ],
        },
        {
          id: "1.4.4",
          titleHe: "זריזות רבה יותר",
          titleEn: "More Agility",
          execHe:
            "הזריזות של IBP נובעת מהיותו פתרון-ענן (cloud) עם עדכונים תכופים, חישוב in-memory מיידי, scenarios ו-what-if. ארגון יכול לשנות הנחות ולתכנן-מחדש בדקות, להוסיף יכולות דרך עדכוני-ענן, ולהתאים את התכנון לשינויי-שוק מהר — מבלי שדרוגי-מערכת כבדים.",
          beginnerHe:
            "זריזות פירושה להגיב מהר. כי IBP בענן, SAP משדרגת אותו אוטומטית, ואין צורך בפרויקטי-שדרוג גדולים. וכי הכל in-memory, אפשר 'לשחק' עם תרחישים ולתכנן-מחדש תוך דקות במקום ימים.",
          consultantHe:
            "כ-cloud SaaS, IBP מקבל release רבעוני עם יכולות חדשות בלי upgrade מקומי. ה-in-memory ו-simulation/scenarios מאפשרים תכנון-מחדש מהיר; version management ו-snapshots תומכים בהשוואת-חלופות. כיועץ, נצל זריזות זו ל-rolling planning תכוף ול-rapid scenario response, אך נהל את ה-quarterly releases (regression).",
          purposeHe:
            "המטרה: לאפשר לארגון להגיב לשינויי-שוק במהירות — תכנון-מחדש בדקות, תרחישים מיידיים, ויכולות-ענן מתעדכנות — במקום מחזורי-תכנון איטיים ושדרוגים כבדים.",
          processExampleHe:
            "שינוי-שוק פתאומי: הצוות מריץ scenario חדש, ה-in-memory מחשב מיד, ותוכנית מעודכנת מאושרת באותו יום — ללא המתנה למחזור הבא או לשדרוג.",
          cbcHe:
            "ב-CBC: גל-חום בלתי-צפוי; הצוות מריץ scenario של ביקוש-מוגבר, מתכנן-מחדש את המילוי תוך שעות, ומגיב לרשתות — זריזות שמצילה מכירות-קיץ.",
          navHe: [
            "SAP IBP Excel add-in ► Scenarios ► rapid what-if",
            "SAP IBP ► Version Management ► compare plan versions",
            "SAP IBP Web UI ► What's New (quarterly cloud release)",
          ],
          tables: ["scenario", "version", "snapshot key figure", "cloud release"],
          tcodes: ["SAP IBP", "Excel add-in"],
          fiori: ["SAP IBP Web UI", "Version Management", "Application Jobs"],
          configHe: [
            "הגדר scenarios ו-versions לתמיכה ב-what-if מהיר ובהשוואת-חלופות.",
            "תכנן תהליך-regression לקליטת quarterly cloud releases.",
          ],
          mistakesHe: [
            "אי-ניצול scenarios — חוזרים למחזורי-תכנון איטיים.",
            "התעלמות מ-quarterly releases — הצטברות-שינויים והפתעות.",
          ],
          troubleshootHe: [
            "תכנון-מחדש איטי ➔ לא משתמשים ב-scenarios/simulation.",
            "פיצ'ר השתנה אחרי upgrade ➔ quarterly release לא נבדק ב-regression.",
          ],
          bestPracticeHe: [
            "אמץ rolling planning ו-rapid scenarios לניצול הזריזות.",
            "נהל quarterly cloud releases עם בדיקות-regression מתוכננות.",
          ],
          interviewHe: [
            { qHe: "מאין נובעת הזריזות של IBP?", aHe: "מהיותו cloud SaaS עם releases רבעוניים, מחישוב in-memory מיידי, ומ-scenarios/what-if — תכנון-מחדש מהיר בלי שדרוגים כבדים." },
            { qHe: "כיצד מנהלים את עדכוני-הענן הרבעוניים?", aHe: "בתהליך-regression מתוכנן שבודק שהפונקציונליות הקיימת ממשיכה לעבוד אחרי כל release." },
          ],
          takeawaysHe: [
            "זריזות = תגובה מהירה לשינויי-שוק.",
            "cloud releases + in-memory + scenarios.",
            "נהל quarterly releases עם regression.",
          ],
        },
        {
          id: "1.4.5",
          titleHe: "מודולי SAP IBP",
          titleEn: "SAP IBP Modules",
          execHe:
            "SAP IBP מורכב ממודולים משלימים: IBP for Demand (תחזית), IBP for Inventory (מלאי-ביטחון), IBP for Supply (תכנון-היצע), IBP for Response (תגובה קצרת-טווח), ו-IBP for Sales and Operations (יישור-מחזור). כולם חולקים planning area ומודל-נתונים אחד, ויחד מכסים את כל ספקטרום תכנון שרשרת-האספקה.",
          beginnerHe:
            "IBP בנוי מ'חלקים', כל אחד למשימה: אחד לחזות ביקוש, אחד לחשב מלאי, אחד לתכנן ייצור/אספקה, אחד להגיב מהר, ואחד לחבר הכל למחזור-S&OP. בוחרים את החלקים שצריך — וכולם עובדים יחד על אותם נתונים.",
          consultantHe:
            "IBP for Demand: stat forecast, demand sensing, ML. IBP for Inventory: multi-stage safety stock optimization. IBP for Supply: heuristic/optimizer לתכנון-היצע (rough-cut/finite). IBP for Response: order-based response עם RTI ל-S/4HANA, gating/allocation. IBP for Sales and Operations: מחזור-S&OP, scenarios, process management. רישוי per-module; כולם על אותו planning area.",
          purposeHe:
            "המטרה: לספק ארגז-כלים מודולרי — לבחור את המודולים הנדרשים (Demand, Inventory, Supply, Response, S&OP) לפי בשלות ותהליך — שכולם משתלבים על מודל-נתונים אחד.",
          processExampleHe:
            "ארגון מתחיל ב-IBP for Sales and Operations ו-Demand, מוסיף Inventory ו-Supply בהמשך, ולבסוף Response — כל מודול נשען על ה-planning area הקיים בלי re-implementation.",
          cbcHe:
            "ב-CBC: שלב-א — IBP for Demand ו-Sales and Operations למחזור-מילוי חודשי; שלב-ב — IBP for Inventory לריכוז/אריזה; שלב-ג — IBP for Response לשיא-הקיץ. כולם על אותו planning area.",
          navHe: [
            "SAP IBP Web UI ► Apps ► IBP for Demand / Inventory / Supply / Response / Sales and Operations",
            "SAP IBP ► Planning Area ► assign module-specific key figures",
          ],
          tables: ["planning area", "key figure (per module)", "module (SAP IBP)", "license"],
          tcodes: ["IBP for Demand", "IBP for Inventory", "IBP for Supply", "IBP for Response", "IBP for Sales and Operations", "SAP IBP"],
          fiori: ["SAP IBP Web UI", "Application Jobs", "Analytics"],
          configHe: [
            "בחר את המודולים הנדרשים (per-license) ושייך את ה-key figures שלהם ל-planning area המשותף.",
            "מודל key figures ייחודיים לכל מודול (forecast/safety-stock/supply/response) על אותו master data.",
          ],
          flow: [
            { he: "IBP for Demand", note: "תחזית + sensing" },
            { he: "IBP for Inventory", note: "multi-stage safety stock" },
            { he: "IBP for Supply", note: "heuristic/optimizer" },
            { he: "IBP for Response", note: "order-based + RTI" },
            { he: "IBP for Sales and Operations", note: "מחזור + scenarios" },
          ],
          masterDataHe: [
            "planning area משותף — נושא את ה-key figures של כל המודולים.",
            "key figures ייעודיים לכל מודול על אותם master data types.",
          ],
          mistakesHe: [
            "רכישת מודולים שאינם בשלים לתהליך הארגוני — מדף-מוצר ללא-שימוש.",
            "מימוש כל מודול ב-planning area נפרד — אובדן האינטגרציה.",
          ],
          troubleshootHe: [
            "מודול-חדש לא משתלב ➔ הוקם ב-planning area נפרד; אחד הקודמים אינו משותף.",
            "key figure חסר במודול ➔ לא שויך ל-planning area.",
          ],
          bestPracticeHe: [
            "התחל ממודולים מבשילים (S&OP + Demand) והרחב בהדרגה על אותו planning area.",
            "ודא שכל המודולים חולקים planning area ו-master data.",
          ],
          interviewHe: [
            { qHe: "מהם מודולי SAP IBP?", aHe: "IBP for Demand, IBP for Inventory, IBP for Supply, IBP for Response ו-IBP for Sales and Operations — חולקים planning area אחד." },
            { qHe: "מה ייחודי ב-IBP for Response?", aHe: "תכנון-תגובה מבוסס-הזמנות (order-based) קצר-טווח עם Real-Time Integration ל-S/4HANA, gating ו-allocation." },
          ],
          takeawaysHe: [
            "חמישה מודולים: Demand, Inventory, Supply, Response, Sales and Operations.",
            "כולם חולקים planning area ומודל-נתונים אחד.",
            "מודולרי — בוחרים והרחבים בהדרגה.",
          ],
        },
      ],
    },
    // ============================================================ 1.5
    {
      id: "1.5",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה הציג מדוע S&OP הכרחי וכיצד SAP IBP מממש אותו. שלוש קבוצות-מניעים מצדיקות אותו: שוקיים (שיבושים, גלובליזציה, תנודתיות), תהליכיים (הגדרה, אופק, פירוק לחמישה שלבים), וטכנולוגיים (in-memory, ויזואליזציה, שיתוף-פעולה). SAP IBP נותן את המענה: פתרון-ענן משולב עם אלגוריתמים טובים, חוויית-משתמש כפולה (Excel add-in + Web UI) וזריזות, על-פני חמישה מודולים החולקים planning area אחד.",
      beginnerHe:
        "למדנו שלושה דברים: למה צריך S&OP (העולם תנודתי ומסוכן), איך עושים אותו נכון (תהליך חודשי בחמישה שלבים), ומה הכלי (SAP IBP — תוכנת-ענן שמאחדת את כל התכנון). בפרקים הבאים נצלול לכל מודול ולכל שלב.",
      consultantHe:
        "מבחינת מימוש: התחל במיפוי-מניעים ➔ הגדר planning area ו-time profile ➔ מודל את חמשת שלבי-המחזור ב-process management ➔ בחר מודולים (S&OP + Demand תחילה) ➔ נצל in-memory ל-scenarios ➔ אמץ Excel add-in לאימוץ-משתמשים ➔ נהל quarterly cloud releases. הפרק הזה הוא ה'למה' וה'מה'; הפרקים הבאים הם ה'איך' המפורט לכל מודול.",
      purposeHe:
        "המטרה: לעגן את התמונה-הכוללת לפני הצלילה לפרטים — מדוע S&OP, מהם מניעיו, ומה מקומו של SAP IBP — כך שכל פרק-המשך יתחבר למסגרת אחת.",
      processExampleHe:
        "מבט-על על המסע: מניעים מצדיקים S&OP → S&OP מוגדר כתהליך חודשי בחמישה שלבים → SAP IBP מממש אותו עם מודולים משולבים → הארגון מתכנן, מדמה ומחליט בזמן-אמת ובזריזות.",
      cbcHe:
        "ב-CBC: התמונה-הכוללת — מניעי-שוק (CO2, גל-חום) ותהליך-S&OP חודשי מיושמים ב-SAP IBP על-פני Demand/Inventory/Supply/Response, ומפיקים תוכנית-מילוי מאושרת אחת לכל המפעלים לקראת הקיץ.",
      navHe: [
        "SAP IBP Web UI ► Apps overview (חזרה על כל המודולים)",
        "SAP IBP ► Process Management ► full S&OP cycle",
      ],
      tables: ["planning area", "time profile", "key figure", "process (SAP IBP)"],
      tcodes: ["SAP IBP", "IBP for Demand", "IBP for Inventory", "IBP for Supply", "IBP for Response", "IBP for Sales and Operations", "Excel add-in"],
      fiori: ["SAP IBP Web UI", "Process Management", "Analytics", "Collaboration"],
      configHe: [
        "ודא ש-planning area, time profile ו-process management מוגדרים כבסיס לכל ההמשך.",
        "תעד את מיפוי-המניעים, חמשת-השלבים ובחירת-המודולים כהחלטות-יסוד של היישום.",
      ],
      flow: [
        { he: "מניעים", note: "שוקיים · תהליכיים · טכנולוגיים" },
        { he: "S&OP", note: "מחזור חודשי, חמישה שלבים" },
        { he: "SAP IBP", note: "פתרון-ענן משולב" },
        { he: "מודולים", note: "Demand/Inventory/Supply/Response/S&OP" },
      ],
      masterDataHe: [
        "planning area ו-time profile — היסודות שכל הפרקים הבאים נשענים עליהם.",
        "process (SAP IBP) — שלד המחזור החודשי.",
      ],
      mistakesHe: [
        "צלילה למודול ספציפי בלי להבין את מסגרת-המניעים והתהליך.",
        "התייחסות ל-IBP ככלי-טכני בלבד במקום כממַמש תהליך-עסקי.",
      ],
      troubleshootHe: [
        "יישום מאבד-כיוון ➔ מיפוי-מניעים והגדרת-תהליך לא נעשו בתחילה.",
        "מודולים לא משתלבים ➔ planning area משותף לא הוקם כבסיס.",
      ],
      bestPracticeHe: [
        "התחל כל יישום-IBP מהמסגרת: מניעים ➔ תהליך ➔ מודולים, ורק אז פרטים.",
        "ראה את IBP כממַמש S&OP, לא כפרויקט-IT מבודד.",
      ],
      interviewHe: [
        { qHe: "סכם בקצרה את שלוש קבוצות-המניעים ל-S&OP.", aHe: "שוקיים (שיבושים, גלובליזציה, תנודתיות), תהליכיים (הגדרה, אופק, פירוק לחמישה שלבים) וטכנולוגיים (in-memory, ויזואליזציה, שיתוף-פעולה)." },
        { qHe: "כיצד SAP IBP מממש את ה-S&OP?", aHe: "כפתרון-ענן משולב עם אלגוריתמים טובים, Excel add-in + Web UI וזריזות, על-פני חמישה מודולים החולקים planning area אחד." },
      ],
      takeawaysHe: [
        "שלוש קבוצות-מניעים מצדיקות S&OP: שוקיים, תהליכיים, טכנולוגיים.",
        "S&OP = מחזור חודשי בחמישה שלבים מיישר-מחלקות.",
        "SAP IBP = פתרון-ענן משולב, חמישה מודולים, planning area אחד — ה'איך' של S&OP מודרני.",
      ],
    },
  ],
};
