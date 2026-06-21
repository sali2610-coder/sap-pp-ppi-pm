// ===== S&OP with SAP IBP Digital Textbook — Chapter 13 =====
// Dashboards and Analytics.
// Every node is a complete LearningNode with 18 facets of authored Hebrew —
// beginner + consultant friendly. SAP objects verbatim English (Advanced
// Analytics, Advanced Dashboards, chart types, SAP Fiori analytics apps).
// CBC = Coca-Cola bottling S&OP dashboards. SAP IBP is cloud.
import type { TextbookChapter } from "./types";

export const CH13: TextbookChapter = {
  n: 13,
  titleHe: "לוחות-מחוונים ואנליטיקה",
  titleEn: "Dashboards and Analytics",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לאנליטיקה (Analytics) וללוחות-המחוונים (Dashboards) ב-SAP IBP — הממשק שבו תוצאות-התכנון הופכות לתמונה שמנהל יכול לקרוא בשנייה. אם ה-Key Figures הם הנתונים הגולמיים וה-KPIs הם המספרים, הרי שה-Analytics וה-Dashboards הם העין שמסתכלת עליהם: הם מציגים תחזית מול actuals, מלאי מול יעד ו-supply מול demand בגרפים, לוחות וצבעי-התראה. כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך מקצה-לקצה, דוגמת CBC (מפעל-מילוי משקאות של Coca-Cola), ניווט בעצי-היישומים של IBP, אובייקטים/אפליקציות, פרטי הגדרה, תרשים-זרימה לבניית גרף או לוח, טעויות נפוצות, פתרון-תקלות, שיטות-מומלצות, שאלות-ראיון ומסקנות-מפתח. SAP IBP הוא פתרון-ענן (cloud); ה-Advanced Analytics וה-Advanced Dashboards נצרכים דרך ה-Web UI, ומשלימים את ה-Excel add-in. המטרה: ללמוד לבנות, להשתמש ולתחזק גרפים ולוחות-מחוונים שמניעים את מפגשי-הסקירה של ה-S&OP — ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 13.1
    {
      id: "13.1",
      titleHe: "אנליטיקה מתקדמת (Advanced Analytics)",
      titleEn: "Advanced Analytics",
      execHe:
        "Advanced Analytics ב-SAP IBP הוא מנוע-התצוגה הוויזואלי שהופך Key Figures ו-KPIs לגרפים אינטראקטיביים בתוך ה-Web UI. במקום לקרוא טבלאות-מספרים, מקבל-ההחלטות רואה מגמת-תחזית, פער supply-demand או חריגת-מלאי כצורה ויזואלית שמתפרשת מיד. זהו רובד-הראייה של ה-S&OP: בלעדיו הנתונים קיימים אך אינם נצרכים, ועם גרף נכון כל מפגש-סקירה נפתח בתובנה ולא בחיפוש.",
      beginnerHe:
        "Advanced Analytics זה פשוט 'מחולל-הגרפים' של IBP. אתה בוחר אילו Key Figures להציג (למשל תחזית מול מכירות-בפועל), בוחר סוג-גרף (קו, עמודות, עוגה), ו-IBP מצייר אותו אוטומטית מהנתונים. הגרף הוא אינטראקטיבי — אפשר לסנן לפי מוצר או אזור, להתקרב לתקופה, ולגלוש לפרטים. זה ההבדל בין לקרוא מאות שורות-מספרים לבין להבין את התמונה במבט אחד.",
      consultantHe:
        "ב-IBP גרף Advanced Analytics מוגדר מעל Planning Area: בוחרים Key Figures, ממד-זמן (Time Profile) וממדי-תצוגה (Attributes/Planning Levels), ומגדירים פילטרים ו-Drill-down. ה-Aggregation/Disaggregation של ה-Key Figure קובעת אילו ערכים מוצגים בכל גרעיניות. גרף נשמר כאובייקט הניתן לשיתוף ולהטמעה ב-Dashboard. שגיאת-יסוד: בחירת Key Figures בגרעיניות שאינה תואמת ל-Planning Level של הגרף — התוצאה ריקה או מצטברת שגוי. ב-Advanced Analytics אפשר גם לשלב מספר Key Figures בצירים שונים (dual-axis) ולהציג סדרות-זמן (historical + forecast) ברצף.",
      purposeHe:
        "המטרה: לתרגם נתוני-תכנון לתובנה ויזואלית מהירה — לזהות מגמות, פערים וחריגות ללא ניתוח-טבלאות ידני. Advanced Analytics נותן לכל בעל-תפקיד (Demand, Supply, Finance) לראות את אותה תמונה ולדון בעובדות במקום בפרשנויות.",
      processExampleHe:
        "מתכנן-ביקוש פותח גרף-קו של Demand: ציר-זמן 18 חודשים, סדרה אחת actuals וסדרה שנייה statistical forecast. הוא מסנן ל-SKU בודד, מזהה ביקוש-יתר עונתי שהמודל לא תפס, ומוסיף סדרת consensus demand. מאותו גרף הוא גולש (drill-down) לרמת-לקוח לאיתור המקור — הכול בלי לעזוב את ה-Web UI.",
      cbcHe:
        "ב-CBC (מפעל-מילוי Coca-Cola) Advanced Analytics מציג: גרף-קו של תחזית-מכירות מול actuals למשקה לפי שבוע, גרף-עמודות מוערם (stacked bar) של מלאי מוצר-מוגמר לפי מותג ואריזה, וגרף-מפל (waterfall) של פער supply מול demand לעונת-השיא. כל גרף ניתן לפילוח לפי מותג, אריזה ואזור-הפצה לפני מפגש-ה-Demand Review.",
      navHe: [
        "SAP IBP Web UI ► Analytics (Advanced) ► New Chart (בחירת Planning Area + Key Figures)",
        "SAP IBP Web UI ► Analytics ► Chart Settings ► Chart Type / Axes / Filters",
        "SAP IBP Web UI ► Analytics ► Save Chart (שמירה לשיתוף ולהטמעה ב-Dashboard)",
        "SAP IBP for Excel ► Planning View (מקור-נתונים משלים לצריכת אותם Key Figures)",
      ],
      tables: ["Planning Area", "Key Figure", "Time Profile", "Planning Level", "Attribute", "Chart"],
      tcodes: ["Advanced Analytics", "Analytics Stories", "Manage Charts", "Dashboards"],
      fiori: ["Analytics", "Dashboards", "Custom Alerts"],
      configHe: [
        "Chart Definition: בחר Planning Area, Key Figures, Time Profile וממדי-תצוגה (Planning Level/Attributes).",
        "Chart Type: בחר את סוג-הגרף המתאים למסר (קו למגמה, עמודות להשוואה, עוגה לחלוקה, מפל לפער).",
        "Filters & Drill-down: הגדר פילטרים לפי מוצר/אזור/לקוח ואפשר גלישה-לפרטים.",
        "Aggregation: ודא שה-Aggregation Mode של כל Key Figure תואם לגרעיניות-הגרף.",
      ],
      flow: [
        { he: "פתח Advanced Analytics", code: "Analytics", note: "New Chart" },
        { he: "בחר Planning Area + Key Figures", code: "Key Figure" },
        { he: "בחר Time Profile + Planning Level", code: "Time Profile" },
        { he: "בחר Chart Type", code: "Chart Type", note: "קו/עמודות/מפל" },
        { he: "הגדר Filters + Drill-down", code: "Filter" },
        { he: "שמור גרף לשיתוף", code: "Save Chart" },
      ],
      masterDataHe: [
        "Planning Area = מקור כל ה-Key Figures והממדים שהגרף יכול להציג.",
        "Time Profile + Planning Levels קובעים את ציר-הזמן ואת גרעיניות-הפילוח.",
        "Attributes (מוצר/לקוח/אזור) = ממדי-הסינון וה-Drill-down.",
      ],
      mistakesHe: [
        "בחירת Key Figures בגרעיניות שאינה תואמת ל-Planning Level של הגרף — תצוגה ריקה או מצטברת שגוי.",
        "ערבוב יחידות שונות באותו ציר (כמות מול אחוז) ללא dual-axis — גרף מטעה.",
        "יותר מדי סדרות בגרף אחד — 'ספגטי' שאי-אפשר לקרוא.",
        "שמירת גרף ללא פילטר ברירת-מחדל — נטען על כל הנתונים ואיטי.",
      ],
      troubleshootHe: [
        "גרף ריק ➔ Key Figure לא תואם ל-Planning Level / חסר נתון בגרעיניות הנבחרת.",
        "ערכים מצטברים גבוהים מהצפוי ➔ Aggregation Mode שגוי (סכום במקום ממוצע).",
        "הגרף איטי ➔ אין פילטר; נטען על כל הממדים — הוסף פילטר ברירת-מחדל.",
        "סדרת-תחזית לא מופיעה ➔ Key Figure לא נכלל בתצוגה או ריק לתקופה.",
      ],
      bestPracticeHe: [
        "גרף אחד = מסר אחד; אל תנסה לספר הכול בתרשים אחד.",
        "התאם Chart Type למסר (קו=מגמה, עמודות=השוואה, מפל=פער).",
        "הגדר פילטר ברירת-מחדל ממוקד — ביצועים וקריאוּת.",
        "תקנן צבעים: צבע קבוע ל-actuals, ל-forecast ול-target בכל הגרפים.",
      ],
      interviewHe: [
        { qHe: "מהו Advanced Analytics ב-SAP IBP?", aHe: "מנוע-התצוגה הוויזואלי בתוך ה-Web UI שהופך Key Figures ל-KPIs לגרפים אינטראקטיביים מעל Planning Area, עם פילטרים ו-Drill-down." },
        { qHe: "מה קובע אילו ערכים מוצגים בגרף?", aHe: "ה-Planning Level של הגרף יחד עם ה-Aggregation/Disaggregation של כל Key Figure; אי-התאמה גורמת לתצוגה ריקה או מצטברת שגוי." },
        { qHe: "מתי נשתמש בגרף-מפל (waterfall) ב-S&OP?", aHe: "להצגת פער מצטבר — למשל כיצד demand פוגש supply שלב-אחר-שלב, או מאיזה רכיב נובע הפער בין תחזית ל-actuals." },
      ],
      takeawaysHe: [
        "Advanced Analytics = רובד-הראייה של ה-S&OP — הופך נתונים לתובנה.",
        "גרף מוגדר מעל Planning Area עם Key Figures, Time Profile ו-Planning Level.",
        "התאמת גרעיניות וה-Aggregation היא תנאי לתצוגה נכונה.",
        "גרף אחד = מסר אחד; Chart Type נבחר לפי המסר.",
      ],
      children: [
        {
          id: "13.1.1",
          titleHe: "סוגי אנליטיקה וגרפים",
          titleEn: "Types of Analytics and Charts",
          execHe:
            "SAP IBP מציע מגוון סוגי-גרפים (chart types), שכל אחד מתאים לסיפור-נתונים אחר: Line למגמות לאורך-זמן, Bar/Column להשוואות, Stacked Bar להרכב, Pie לחלוקת-חלקים, Waterfall לפער מצטבר, Scatter לקשרים, ו-Combination לשילוב סדרות בצירים שונים. בחירת סוג-הגרף הנכון היא ההחלטה שקובעת אם המסר עובר בשנייה או הולך לאיבוד.",
          beginnerHe:
            "לכל שאלה יש גרף מתאים. רוצה לראות איך משהו משתנה בזמן? גרף-קו (Line). רוצה להשוות מוצרים? עמודות (Bar). רוצה לראות איך 100% מתחלקים? עוגה (Pie) או עמודה-מוערמת (Stacked). רוצה להבין מאיפה נוצר פער? מפל (Waterfall). הטעות הנפוצה היא להשתמש בעוגה לכל דבר — היא טובה רק לחלוקה לכמה חלקים בודדים.",
          consultantHe:
            "ב-IBP כל Chart Type נקשר למבנה-נתונים מתאים: Line/Area דורש ציר-זמן (Time Profile); Bar/Column משווה בין חברי-ממד (Attribute) בנקודת-זמן; Stacked מציג תרומת-שכבות לסכום; Waterfall דורש סדרת-תרומות מסומנת חיובי/שלילי; Combination משלב Key Figures בצירים נפרדים (למשל כמות בעמודות מול אחוז-דיוק בקו). ה-Heatmap/Table-with-color שימושיים ל-Alerts. בחירה שגויה אינה רק אסתטית — היא מעוותת את הפרשנות (למשל Pie לערכים דומים מסתיר הבדלים).",
          purposeHe:
            "להתאים את הצורה-הוויזואלית לסוג-השאלה — מגמה, השוואה, הרכב, פער או קשר — כדי שהמסר ייקרא נכון ומהר.",
          processExampleHe:
            "מתכנן בוחר: למגמת-תחזית 18 חודשים → Line; להשוואת fill rate בין אזורים → Column; להרכב-מלאי לפי קטגוריה → Stacked Bar; לפער demand-supply לעונה → Waterfall; ולקשר בין מחיר-מבצע לביקוש → Scatter.",
          cbcHe:
            "ב-CBC: Line לתחזית-מכירות שבועית של Coke Zero; Column להשוואת OTIF בין מרכזי-הפצה; Stacked Bar למלאי מוצר-מוגמר לפי מותג; Waterfall לפער supply-demand בקיץ; Combination ל-Days of Supply (עמודות) מול forecast accuracy (קו).",
          navHe: [
            "SAP IBP Web UI ► Analytics ► New Chart ► Chart Type (Line / Bar / Column / Stacked / Pie / Waterfall / Scatter / Combination)",
            "SAP IBP Web UI ► Analytics ► Chart Settings ► Axes (בחירת ציר ראשי/משני)",
          ],
          tables: ["Chart Type", "Key Figure", "Time Profile", "Attribute"],
          tcodes: ["Advanced Analytics", "Manage Charts"],
          fiori: ["Analytics", "Dashboards"],
          configHe: [
            "Line/Area: דורש ציר-זמן; למגמות וסדרות historical+forecast.",
            "Bar/Column + Stacked: להשוואת חברי-ממד ולהרכב לסכום.",
            "Pie: רק לחלוקה לכמה חלקים בודדים בעלי הבדל ברור.",
            "Waterfall / Scatter / Combination: לפער-מצטבר, לקשר, ולשילוב Key Figures בצירים שונים.",
          ],
          flow: [
            { he: "הגדר את השאלה", note: "מגמה? השוואה? פער?" },
            { he: "התאם Chart Type לשאלה", code: "Chart Type" },
            { he: "בחר Key Figures + צירים", code: "Axes" },
            { he: "בדוק שהמסר נקרא בשנייה" },
          ],
          mistakesHe: [
            "שימוש ב-Pie לערכים רבים או דומים — מסתיר הבדלים.",
            "Bar להצגת-מגמה במקום Line — מקשה לראות כיוון.",
            "Waterfall בלי סימון חיובי/שלילי — הפער לא קריא.",
          ],
          troubleshootHe: [
            "Line לא מצייר מגמה ➔ אין ציר-זמן (Time Profile) בתצוגה.",
            "Stacked לא מסתכם נכון ➔ Key Figures בגרעיניות לא-תואמת.",
            "Combination מציג סדרה אחת שטוחה ➔ הסדרה לא שויכה לציר-המשני.",
          ],
          bestPracticeHe: [
            "התחל מהשאלה, לא מהגרף — הצורה נגזרת מהמסר.",
            "הגבל Pie ל-2–4 פלחים בלבד.",
            "השתמש ב-Combination להצגת כמות מול אחוז יחד.",
          ],
          interviewHe: [
            { qHe: "מתי Line ומתי Bar?", aHe: "Line למגמה לאורך-זמן (דורש ציר-זמן); Bar/Column להשוואה בין חברי-ממד בנקודת-זמן." },
            { qHe: "מהי חולשת גרף-עוגה (Pie)?", aHe: "הוא קריא רק לכמה פלחים בעלי הבדל ברור; לערכים רבים או דומים הוא מסתיר את ההבדלים." },
          ],
          takeawaysHe: [
            "לכל שאלה גרף מתאים — מגמה=Line, השוואה=Bar, הרכב=Stacked, פער=Waterfall.",
            "Combination משלב Key Figures בצירים שונים (כמות מול אחוז).",
            "Chart Type שגוי מעוות פרשנות, לא רק אסתטיקה.",
          ],
        },
        {
          id: "13.1.2",
          titleHe: "יצירת גרפי אנליטיקה מתקדמת",
          titleEn: "Creating Advanced Analytics Charts",
          execHe:
            "יצירת גרף ב-Advanced Analytics היא תהליך מובנה: בחירת Planning Area, בחירת Key Figures וממדים, בחירת Chart Type, הגדרת פילטרים ושמירה. התוצאה היא אובייקט-גרף שניתן לשתף ולהטמיע ב-Dashboard. שליטה בתהליך זה היא מיומנות-הבסיס של כל משתמש-IBP שרוצה להפיק תובנה בעצמו ולא להמתין לדוח.",
          beginnerHe:
            "כדי לבנות גרף: נכנסים ל-Analytics, לוחצים New Chart, בוחרים את ה-Planning Area (המאגר), מסמנים אילו Key Figures להציג (למשל תחזית ומכירות), בוחרים סוג-גרף, מוסיפים פילטר (למשל מוצר מסוים), ושומרים. זהו — הגרף מצויר אוטומטית ומתעדכן בכל פעם שהנתונים משתנים.",
          consultantHe:
            "בעת היצירה מגדירים: Planning Area, רשימת Key Figures, Time Profile (טווח ופריסה), Planning Level/Attributes לפילוח, Chart Type, שיוך-צירים (primary/secondary), פילטרים (כולל Attribute filters ו-Version), והגדרות-תצוגה (אגדה, צבעים, labels). חשוב לקבע Version/Scenario נכון — גרף שמשווה תחזית ל-actuals חייב למשוך מהשכבה הנעולה. ניתן לשמור את הגרף עם Default Filter כדי לאזן בין שלמות-נתונים לבין ביצועים.",
          purposeHe:
            "לאפשר למשתמש-העסקי לייצר תצוגה ויזואלית בעצמו, מותאמת לשאלה הספציפית, בלי תלות במפתח או בדוח קבוע.",
          processExampleHe:
            "מתכנן בונה גרף 'תחזית מול בפועל לרבעון': New Chart → Planning Area של Demand → Key Figures: Sales Actuals + Consensus Demand → Time Profile רבעוני → Chart Type Column-Combination → פילטר מותג → Version נעול → Save בשם משותף.",
          cbcHe:
            "ב-CBC מתכנן-הביקוש בונה גרף 'Coke 1.5L — actuals מול forecast' לפי שבוע, עם פילטר אזור-מרכז ו-Version של מחזור-S&OP הנוכחי, ושומר אותו ל-Dashboard של ה-Demand Review.",
          navHe: [
            "SAP IBP Web UI ► Analytics ► New Chart",
            "SAP IBP Web UI ► Analytics ► Select Planning Area ► Add Key Figures",
            "SAP IBP Web UI ► Analytics ► Chart Type ► Axes ► Filters ► Version",
            "SAP IBP Web UI ► Analytics ► Save (Default Filter / Sharing)",
          ],
          tables: ["Planning Area", "Key Figure", "Time Profile", "Version", "Attribute", "Filter"],
          tcodes: ["Advanced Analytics", "New Chart", "Manage Charts"],
          fiori: ["Analytics", "Dashboards"],
          configHe: [
            "Planning Area + Key Figures: מקור-הנתונים ורשימת-המדדים לתצוגה.",
            "Time Profile: טווח ופריסה (שבוע/חודש/רבעון).",
            "Chart Type + Axes: סוג-הגרף ושיוך primary/secondary axis.",
            "Filters + Version: פילטרי-ממד ונעילת השכבה הנכונה (snapshot/version).",
          ],
          flow: [
            { he: "New Chart", code: "Analytics" },
            { he: "בחר Planning Area + Key Figures", code: "Key Figure" },
            { he: "הגדר Time Profile + Planning Level", code: "Time Profile" },
            { he: "בחר Chart Type + Axes", code: "Chart Type" },
            { he: "הוסף Filters + Version", code: "Version", note: "שכבה נעולה" },
            { he: "Save + Share", code: "Save" },
          ],
          masterDataHe: [
            "Planning Area = מקור ה-Key Figures.",
            "Version/Snapshot = השכבה ממנה הגרף מושך נתוני-תחזית.",
            "Attributes = ממדי-הפילטר והפילוח.",
          ],
          mistakesHe: [
            "שכחת בחירת Version — הגרף מושך מהשכבה הפעילה במקום מהנעולה.",
            "הוספת Key Figures בלי לבדוק התאמת-גרעיניות — תצוגה ריקה.",
            "שמירה ללא Default Filter — איטיות בטעינה.",
            "אי-שיתוף הגרף — נשאר פרטי ולא נצרך במפגש.",
          ],
          troubleshootHe: [
            "תחזית מול actuals זהים מדי ➔ נמשך מ-Version לא-נעול.",
            "Save נכשל / גרף ריק ➔ Key Figure לא תואם ל-Planning Level.",
            "אחרים לא רואים את הגרף ➔ לא שותף / חסר הרשאה.",
            "טעינה איטית ➔ אין Default Filter; כל הממדים נטענים.",
          ],
          bestPracticeHe: [
            "קבע Version/Snapshot במפורש לפני שמירה.",
            "הגדר Default Filter ממוקד לכל גרף.",
            "תן שם עקבי וברור (מדד-ממד-תקופה) לשיתוף קל.",
            "בדוק את הגרף מול Planning View ב-Excel לאימות-ערכים.",
          ],
          interviewHe: [
            { qHe: "מהם השלבים ליצירת גרף ב-Advanced Analytics?", aHe: "New Chart → בחירת Planning Area → הוספת Key Figures → Time Profile/Planning Level → Chart Type + Axes → Filters/Version → Save/Share." },
            { qHe: "מדוע בחירת Version קריטית בגרף-דיוק?", aHe: "כדי שהתחזית תימשך מהשכבה הנעולה (snapshot) ולא מהפעילה-המתעדכנת, אחרת ההשוואה ל-actuals מטעה." },
          ],
          takeawaysHe: [
            "יצירת גרף = Planning Area → Key Figures → Chart Type → Filters/Version → Save.",
            "Version/Snapshot חייב להיקבע לגרפי-דיוק.",
            "Default Filter ושם עקבי = ביצועים ושיתוף.",
          ],
        },
        {
          id: "13.1.3",
          titleHe: "ניהול גרפי אנליטיקה מתקדמת",
          titleEn: "Managing Advanced Analytics Charts",
          execHe:
            "ניהול גרפים הוא מה שמונע מספריית-האנליטיקה להפוך לבלגן: עריכה, שכפול, שיתוף, ניהול-הרשאות, מחיקת-גרפים-מיושנים והטמעה ב-Dashboards. ספריית-גרפים מתוחזקת היטב מבטיחה שכל משתמש מוצא את התצוגה הנכונה ושכולם רואים את אותה אמת.",
          beginnerHe:
            "אחרי שבונים הרבה גרפים צריך לנהל אותם: לערוך גרף קיים, להעתיק גרף דומה כדי לחסוך עבודה, לשתף עם הצוות, לתת שם ברור, ולמחוק גרפים ישנים שכבר לא צריך. זה כמו לסדר תיקיות — אחרת אי-אפשר למצוא כלום.",
          consultantHe:
            "ב-IBP מנהלים גרפים דרך Manage Charts / ספריית-Analytics: Edit (שינוי Key Figures/Type/Filters), Copy/Duplicate (בסיס לגרף חדש), Sharing & Authorizations (מי רואה/עורך), Versioning של הגדרות, ושיוך ל-Dashboards. חשוב לתחזק מוסכמת-שמות ולהגדיר Owner לכל גרף. גרפים משותפים תלויים בהרשאות-נתונים (data access) — משתמש ללא הרשאה לממד מסוים יראה גרף חלקי. מחיקת-גרף משפיעה על כל Dashboard שמטמיע אותו — בדוק תלויות לפני מחיקה.",
          purposeHe:
            "לשמור ספריית-אנליטיקה נקייה, מאובטחת ועקבית — שכל גרף הוא 'מקור-אמת' אחד, נמצא בקלות ומתוחזק על-ידי בעלים מוגדר.",
          processExampleHe:
            "אדמין מבצע סדר רבעוני: ממזג שני גרפי-מלאי כפולים, מעדכן מוסכמת-שמות, מסיר גרפים שלא נצרכו, מגדיר Owner לכל גרף נותר, ומוודא שכל Dashboard עדיין מצביע לגרף הנכון.",
          cbcHe:
            "ב-CBC צוות-התכנון מתחזק ספריית-גרפים מאורגנת לפי מפגש (Demand/Supply/Operating Review); אדמין-IBP מנהל הרשאות כך שמנהל-אזור רואה רק את אזורו, ומסיר גרפי-עונה ישנים בסוף כל שנה.",
          navHe: [
            "SAP IBP Web UI ► Analytics ► Manage Charts (Edit / Copy / Delete)",
            "SAP IBP Web UI ► Analytics ► Chart ► Sharing & Authorizations",
            "SAP IBP Web UI ► Dashboards ► (בדיקת תלויות-גרף לפני מחיקה)",
          ],
          tables: ["Chart", "Authorization", "Dashboard", "Version"],
          tcodes: ["Manage Charts", "Advanced Analytics", "Dashboards"],
          fiori: ["Analytics", "Dashboards", "Manage Users / Authorizations"],
          configHe: [
            "Edit/Copy: עדכון Key Figures/Type/Filters או שכפול כבסיס לגרף חדש.",
            "Sharing & Authorizations: הגדר מי רואה/עורך; הרשאות-נתונים קובעות מה כל אחד רואה בפועל.",
            "Naming & Ownership: מוסכמת-שמות ובעלים מוגדר לכל גרף.",
            "Dependencies: בדוק אילו Dashboards מטמיעים את הגרף לפני מחיקה.",
          ],
          flow: [
            { he: "אתר גרף בספרייה", code: "Manage Charts" },
            { he: "Edit / Copy לפי הצורך", code: "Edit" },
            { he: "הגדר Sharing + Owner", code: "Sharing" },
            { he: "בדוק תלויות-Dashboard", code: "Dashboard" },
            { he: "מחק מיושנים", code: "Delete" },
          ],
          masterDataHe: [
            "Authorizations = הרשאות-נתונים שקובעות מה כל משתמש רואה בגרף משותף.",
            "Dashboard membership = אילו לוחות מטמיעים את הגרף.",
          ],
          mistakesHe: [
            "מחיקת גרף בלי בדיקת-תלויות — שובר Dashboards שמטמיעים אותו.",
            "כפילות-גרפים ('כמעט-זהים') — בלבול לגבי מקור-האמת.",
            "ללא מוסכמת-שמות — אי-אפשר למצוא את הגרף הנכון.",
            "ללא Owner — גרף 'יתום' שלא מתוחזק.",
          ],
          troubleshootHe: [
            "משתמש רואה גרף חלקי ➔ הרשאת-נתונים חסרה לממד מסוים.",
            "Dashboard נשבר ➔ גרף שהוטמע בו נמחק/שונה.",
            "אי-אפשר לערוך גרף ➔ הרשאת-עריכה חסרה / לא Owner.",
            "ריבוי גרפים דומים ➔ אין מוסכמת-שמות וניהול-ספרייה.",
          ],
          bestPracticeHe: [
            "תחזק מוסכמת-שמות וספרייה מאורגנת לפי מפגש-סקירה.",
            "הגדר Owner לכל גרף; בצע סקירת-ניקיון תקופתית.",
            "בדוק תלויות-Dashboard לפני מחיקה.",
            "נהל הרשאות-נתונים כדי שכל אחד יראה את התחום שלו בלבד.",
          ],
          interviewHe: [
            { qHe: "מה צריך לבדוק לפני מחיקת גרף?", aHe: "אילו Dashboards מטמיעים אותו — מחיקה שוברת כל לוח שמצביע אליו." },
            { qHe: "מדוע שני משתמשים רואים את אותו גרף שונה?", aHe: "בגלל הרשאות-נתונים (data access) — כל אחד רואה רק את הממדים שמותרים לו, כך שהגרף מסונן אוטומטית." },
          ],
          takeawaysHe: [
            "ניהול-גרפים = עריכה, שכפול, שיתוף, הרשאות וניקיון.",
            "מחיקה מצריכה בדיקת-תלויות ב-Dashboards.",
            "מוסכמת-שמות, Owner והרשאות-נתונים שומרים על ספרייה נקייה ומאובטחת.",
          ],
        },
      ],
    },
    // ============================================================ 13.2
    {
      id: "13.2",
      titleHe: "לוחות-מחוונים מתקדמים (Advanced Dashboards)",
      titleEn: "Advanced Dashboards",
      execHe:
        "Advanced Dashboard ב-SAP IBP הוא קנבס שמרכז מספר גרפים, טבלאות ו-KPIs בתצוגה אחת המותאמת למפגש-סקירה או לתפקיד. במקום לפתוח עשרה גרפים בנפרד, מנהל פותח Dashboard אחד ורואה את כל התמונה — דיוק-תחזית, מלאי, fill rate ופער supply-demand — במבט אחד. ה-Dashboard הוא 'חדר-הבקרה' של ה-S&OP: המקום שבו כל מפגש נפתח ומסתיים.",
      beginnerHe:
        "Dashboard זה לוח שמרכז כמה גרפים יחד בעמוד אחד, כמו לוח-מחוונים ברכב שמראה מהירות, דלק וטמפרטורה ביחד. במקום לחפש כל מספר בנפרד, אתה רואה הכול במקום אחד. בונים אותו פעם אחת — בוחרים אילו גרפים להניח ואיפה — ואחר-כך הוא מתעדכן אוטומטית בכל פעם שהנתונים משתנים.",
      consultantHe:
        "ב-IBP Dashboard הוא אובייקט שמרכיב מספר Charts/Tables/KPI-tiles בפריסת-קנבס (layout), עם Global Filters שמשפיעים על כל הרכיבים בו-זמנית (למשל בחירת-אזור משנה את כל הגרפים). ה-Dashboard נשען על הגרפים השמורים מ-Advanced Analytics, ולכן עיצוב-טוב מתחיל מגרפים נקיים. ניתן להגדיר Dashboards לפי תפקיד (Demand Planner / Supply Planner / Executive) ולפי מפגש-סקירה. הרשאות-נתונים חלות גם כאן — כל משתמש רואה את הנתונים המותרים לו. Global Filter + Drill-down הופכים את ה-Dashboard מסטטי לאינטראקטיבי.",
      purposeHe:
        "לרכז את כל המידע הרלוונטי למפגש או לתפקיד בתצוגה אחת ועקבית — לקצר זמן-הכנה, למקד דיון, ולוודא שכולם דנים באותה תמונה מסונכרנת.",
      processExampleHe:
        "מנהל-תפעול פותח את Dashboard ה-Operating Review: בראש — KPI-tiles של forecast accuracy, fill rate, OTIF ו-Days of Supply; מתחת — גרף-קו demand מול supply, גרף-עמודות מלאי לפי קטגוריה, וטבלת-חריגות (Alerts). בחירת-אזור ב-Global Filter מעדכנת מיד את כל הרכיבים.",
      cbcHe:
        "ב-CBC קיים Dashboard לכל מפגש: Demand Review (תחזית מול actuals לפי מותג), Supply Review (קיבולת-מילוי מול תוכנית), ו-Executive S&OP (KPI-tiles ראשיים + פער-תוכנית-כספית). Global Filter של אזור-הפצה מאפשר למנהל-אזור לראות את כל הלוח דרך עיניו בלחיצה אחת.",
      navHe: [
        "SAP IBP Web UI ► Dashboards ► New Dashboard (בחירת Layout)",
        "SAP IBP Web UI ► Dashboards ► Add Charts / Tables / KPI Tiles",
        "SAP IBP Web UI ► Dashboards ► Global Filters / Drill-down",
        "SAP IBP Web UI ► Dashboards ► Save & Share (Role-based)",
      ],
      tables: ["Dashboard", "Chart", "KPI Tile", "Global Filter", "Layout", "Authorization"],
      tcodes: ["Advanced Dashboards", "New Dashboard", "Manage Dashboards"],
      fiori: ["Dashboards", "Analytics", "Custom Alerts"],
      configHe: [
        "Layout: בחר פריסת-קנבס (גריד) ומקם רכיבים (Charts/Tables/KPI Tiles).",
        "Components: הוסף גרפים שמורים מ-Advanced Analytics, טבלאות ו-KPI tiles.",
        "Global Filters: הגדר פילטרים שמשפיעים על כל הרכיבים בו-זמנית.",
        "Sharing & Roles: שתף לפי תפקיד/מפגש; הרשאות-נתונים מסננות אוטומטית.",
      ],
      flow: [
        { he: "New Dashboard + Layout", code: "Dashboards" },
        { he: "הוסף Charts/Tables/KPI Tiles", code: "Chart" },
        { he: "הגדר Global Filters", code: "Global Filter" },
        { he: "סדר פריסה + Drill-down", code: "Layout" },
        { he: "Save & Share לפי תפקיד", code: "Sharing" },
      ],
      masterDataHe: [
        "Charts השמורים מ-Advanced Analytics = אבני-הבניין של ה-Dashboard.",
        "Global Filter (ממד משותף) = שולט בכל הרכיבים יחד.",
        "Authorizations = מסננות את הנתונים לכל משתמש.",
      ],
      mistakesHe: [
        "צפיפות-יתר — יותר מדי רכיבים בלוח אחד; אובדן-מיקוד.",
        "גרפים שאינם חולקים ממד-משותף ל-Global Filter — הסינון לא עקבי.",
        "בניית Dashboard מגרפים 'מלוכלכים' — הבעיה מוכפלת בכל לוח.",
        "התעלמות מתפקיד/מפגש — לוח אחד 'לכולם' שלא משרת אף-אחד.",
      ],
      troubleshootHe: [
        "Global Filter לא משפיע על רכיב ➔ הרכיב לא חולק את הממד המסונן.",
        "רכיב ריק בלוח ➔ הגרף-המקור ריק או הרשאת-נתונים חסרה.",
        "לוח איטי ➔ יותר מדי רכיבים/גרפים-כבדים ללא Default Filter.",
        "משתמשים רואים לוח שונה ➔ הרשאות-נתונים שונות (כצפוי).",
      ],
      bestPracticeHe: [
        "Dashboard לכל מפגש-סקירה ולכל תפקיד — לא לוח אוניברסלי.",
        "התחל מ-KPI-tiles בראש, פרט בגרפים מתחת.",
        "ודא שכל הרכיבים חולקים ממד ל-Global Filter.",
        "בנה על גרפים נקיים ומתוחזקים בלבד.",
      ],
      interviewHe: [
        { qHe: "מהו Advanced Dashboard ב-SAP IBP?", aHe: "קנבס שמרכז מספר Charts/Tables/KPI-tiles בתצוגה אחת, עם Global Filters משותפים, המותאם למפגש-סקירה או לתפקיד." },
        { qHe: "מה תפקיד ה-Global Filter בלוח?", aHe: "פילטר שמשפיע על כל הרכיבים בו-זמנית (למשל בחירת-אזור), והופך לוח סטטי לאינטראקטיבי ועקבי." },
        { qHe: "מדוע Dashboard צריך להיבנות מגרפים נקיים?", aHe: "כי הוא מטמיע גרפים שמורים מ-Advanced Analytics; גרף שגוי או כבד מוכפל ומשפיע על כל לוח שמשתמש בו." },
      ],
      takeawaysHe: [
        "Dashboard = חדר-הבקרה של ה-S&OP — כל התמונה במבט אחד.",
        "מורכב מ-Charts/Tables/KPI-tiles עם Global Filters משותפים.",
        "נבנה לפי מפגש-סקירה ותפקיד, ועל גרפים נקיים בלבד.",
        "הרשאות-נתונים מסננות את הלוח אוטומטית לכל משתמש.",
      ],
      children: [
        {
          id: "13.2.1",
          titleHe: "יצירת לוחות-מחוונים מתקדמים",
          titleEn: "Creating Advanced Dashboards",
          execHe:
            "יצירת Dashboard היא הרכבה של רכיבים על קנבס: בחירת Layout, הוספת גרפים-שמורים, טבלאות ו-KPI-tiles, הגדרת Global Filters ושמירה-ושיתוף. תהליך זה הופך אוסף-גרפים מפוזר לתצוגת-ניהול אחת, ממוקדת ועקבית.",
          beginnerHe:
            "בונים Dashboard כמו לוח-שעם: בוחרים גודל-לוח (Layout), גוררים פנימה גרפים שכבר הכנו, מוסיפים כמה KPI-tiles בראש, מגדירים פילטר-כללי (למשל אזור) שישלוט בכולם, ושומרים. אחר-כך משתפים עם הצוות והלוח מוכן לשימוש חוזר.",
          consultantHe:
            "בעת היצירה: New Dashboard → בחירת Layout (גריד/חלוקת-אזורים) → הוספת Components (Charts מ-Analytics, Tables, KPI-tiles, Custom-Alert-tiles) → מיקום וגודל ברשת → הגדרת Global Filters (ממדים משותפים) → קישור Drill-down → Save עם Sharing/Role. חשוב לוודא שכל הרכיבים חולקים את הממד שעליו פועל ה-Global Filter, אחרת הסינון חלקי. מומלץ לבנות תחילה את הגרפים הנקיים ב-Advanced Analytics ורק אז להרכיב.",
          purposeHe:
            "להפוך גרפים בודדים לתצוגת-ניהול שלמה — שמפגש-סקירה ייפתח מלוח-אחד מוכן, ולא מבנייה-מחדש בכל פעם.",
          processExampleHe:
            "אדמין בונה Operating Review Dashboard: Layout בן 4 אזורים → KPI-tiles (accuracy/fill rate/OTIF/DoS) למעלה → גרף demand-supply ומלאי באמצע → טבלת-Alerts למטה → Global Filter אזור+מותג → Save & Share לקבוצת-התפעול.",
          cbcHe:
            "ב-CBC אדמין-IBP בונה את Dashboard ה-Demand Review של מחזור-S&OP: KPI-tiles של forecast accuracy לפי מותג, גרף actuals-מול-forecast, וטבלת-חריגות, עם Global Filter של אזור-הפצה, ומשתף לצוות-הביקוש.",
          navHe: [
            "SAP IBP Web UI ► Dashboards ► New Dashboard ► Select Layout",
            "SAP IBP Web UI ► Dashboards ► Add Components (Charts / Tables / KPI Tiles)",
            "SAP IBP Web UI ► Dashboards ► Global Filters ► Drill-down",
            "SAP IBP Web UI ► Dashboards ► Save & Share",
          ],
          tables: ["Dashboard", "Layout", "Chart", "KPI Tile", "Global Filter"],
          tcodes: ["New Dashboard", "Advanced Dashboards"],
          fiori: ["Dashboards", "Analytics"],
          configHe: [
            "Layout: בחר פריסה ומספר-אזורים מתאים לכמות-הרכיבים.",
            "Add Components: הוסף Charts שמורים, Tables, KPI-tiles ו-Alert-tiles.",
            "Global Filters: הגדר ממדים משותפים שישלטו בכל הרכיבים.",
            "Save & Share: שתף לפי תפקיד/קבוצה; הרשאות-נתונים מסננות אוטומטית.",
          ],
          flow: [
            { he: "New Dashboard", code: "Dashboards" },
            { he: "בחר Layout", code: "Layout" },
            { he: "הוסף Charts/Tables/KPI Tiles", code: "Chart" },
            { he: "הגדר Global Filters", code: "Global Filter" },
            { he: "Save & Share", code: "Sharing" },
          ],
          masterDataHe: [
            "Charts שמורים = רכיבי-הבניין.",
            "Global Filter (ממד משותף) = שולט בכל הרכיבים.",
            "Role/Group = יעד-השיתוף.",
          ],
          mistakesHe: [
            "הוספת רכיבים שלא חולקים ממד-משותף ל-Global Filter.",
            "Layout צפוף מדי — חוסר-מיקוד.",
            "בנייה מגרפים שטרם נוקו/אומתו.",
            "שמירה ללא שיתוף — הלוח נשאר פרטי.",
          ],
          troubleshootHe: [
            "Global Filter לא משפיע על רכיב ➔ הרכיב לא חולק את הממד.",
            "רכיב ריק ➔ גרף-מקור ריק או הרשאה חסרה.",
            "טעינה איטית ➔ יותר מדי רכיבים-כבדים ללא Default Filter.",
          ],
          bestPracticeHe: [
            "תכנן את הלוח על נייר לפני הבנייה — מה בראש, מה מתחת.",
            "ודא ממד-משותף לכל הרכיבים ל-Global Filter.",
            "בנה על גרפים נקיים בלבד.",
            "התחל מ-KPI-tiles ופרט בגרפים.",
          ],
          interviewHe: [
            { qHe: "מהם השלבים ליצירת Dashboard?", aHe: "New Dashboard → בחירת Layout → הוספת Components (Charts/Tables/KPI Tiles) → Global Filters → Save & Share." },
            { qHe: "מה תנאי-הסף לכך ש-Global Filter ישלוט בכל הרכיבים?", aHe: "שכל הרכיבים יחלקו את הממד שעליו פועל הפילטר; אחרת הסינון יחול חלקית בלבד." },
          ],
          takeawaysHe: [
            "יצירת Dashboard = Layout → Components → Global Filters → Save/Share.",
            "כל הרכיבים חייבים לחלוק ממד ל-Global Filter.",
            "בנה על גרפים נקיים והתחל מ-KPI-tiles.",
          ],
        },
        {
          id: "13.2.2",
          titleHe: "שימוש בלוחות-מחוונים מתקדמים",
          titleEn: "Using Advanced Dashboards",
          execHe:
            "שימוש ב-Dashboard הוא הצריכה היומיומית: פתיחת-הלוח, סינון לפי Global Filter, גלישה-לפרטים (Drill-down), קריאת-Alerts, וייצוא/שיתוף ממצאים. כאן מתממש הערך — כל מפגש-סקירה נפתח מהלוח, והדיון מתנהל סביב המספרים שמוצגים בו.",
          beginnerHe:
            "אחרי שהלוח בנוי, פשוט פותחים אותו ומשתמשים: בוחרים פילטר (למשל אזור), והכול מתעדכן; לוחצים על גרף כדי להתקרב לפרטים; רואים בצבע-אדום איפה חרגנו; ואפשר לייצא תמונה או נתון לדיון. לא צריך לבנות מחדש — רק לצרוך.",
          consultantHe:
            "במהלך-השימוש: Global Filter מצמצם את כל הרכיבים בו-זמנית; Drill-down גולש מממד-על (מותג) לממד-תת (SKU/לקוח); Custom-Alert-tiles מסמנים חריגות מול ספים; ניתן לקבע View/Bookmark של מצב-סינון מסוים. ה-Dashboard נשען על Version פעיל/נבחר — בעת סקירת-תרחישים (scenario) מחליפים Version וכל הלוח מתעדכן. חשוב להבין שהמשתמש רואה רק נתונים שהרשאתו מתירה, כך ש'אותו לוח' שונה בין משתמשים — וזה תקין.",
          purposeHe:
            "לאפשר למקבל-ההחלטות לצרוך תובנה ולפעול — לסנן, לגלוש, לזהות-חריגה ולהחליט — מתוך תצוגה אחת, בלי לבנות דבר.",
          processExampleHe:
            "במפגש Supply Review מנהל פותח את הלוח, מסנן לאזור-בעייתי, רואה Alert-tile אדום של מלאי-נמוך, גולש ל-SKU הבעייתי, מחליף Version ל-What-if של הגדלת-קיבולת, ורואה את ההשפעה על כל הגרפים מיד.",
          cbcHe:
            "ב-CBC במפגש-ה-S&OP מנהל-תפעול פותח את Dashboard ה-Operating Review, מסנן לאזור-מרכז, מזהה Alert של OTIF נמוך לרשת-קמעונאות, גולש למותג ולקו-מילוי, ומשווה Version 'תוכנית' מול 'What-if תוספת-משמרת'.",
          navHe: [
            "SAP IBP Web UI ► Dashboards ► Open Dashboard",
            "SAP IBP Web UI ► Dashboard ► Global Filter / Drill-down",
            "SAP IBP Web UI ► Dashboard ► Version / Scenario switch",
            "SAP IBP Web UI ► Dashboard ► Export / Bookmark",
          ],
          tables: ["Dashboard", "Global Filter", "Version", "Custom Alert", "Bookmark"],
          tcodes: ["Advanced Dashboards", "Custom Alerts"],
          fiori: ["Dashboards", "Analytics", "Custom Alerts"],
          configHe: [
            "Global Filter: סנן את כל הלוח לפי אזור/מותג/לקוח.",
            "Drill-down: גלוש מממד-על לממד-תת בתוך גרף.",
            "Version/Scenario: החלף שכבה לסקירת What-if; הלוח מתעדכן.",
            "Export/Bookmark: ייצא ממצא לדיון או קבע מצב-סינון שמור.",
          ],
          flow: [
            { he: "פתח Dashboard", code: "Dashboards" },
            { he: "סנן ב-Global Filter", code: "Global Filter" },
            { he: "קרא Alerts", code: "Custom Alert", note: "צבעי-חריגה" },
            { he: "Drill-down לפרטים", code: "Drill-down" },
            { he: "החלף Version ל-What-if", code: "Version" },
            { he: "Export / Bookmark", code: "Export" },
          ],
          masterDataHe: [
            "Version/Scenario = השכבה שהלוח מציג; החלפתה מעדכנת הכול.",
            "Custom Alerts = הספים שמניעים את צבעי-החריגה.",
            "Authorizations = קובעות מה כל משתמש רואה בלוח.",
          ],
          mistakesHe: [
            "התעלמות מ-Version פעיל — צריכת-נתון מהשכבה הלא-נכונה.",
            "שימוש-בלוח כתצוגה-בלבד בלי Drill-down — מפספס את שורש-הבעיה.",
            "אי-שימוש ב-Alerts — חריגות עוברות מתחת-לרדאר.",
            "ייצוא-תמונה במקום קישור — הנתון 'קופא' ומתיישן.",
          ],
          troubleshootHe: [
            "מספרים לא תואמים לציפייה ➔ Version/Scenario שגוי נבחר.",
            "Global Filter לא משפיע על חלק מהגרפים ➔ ממד לא-משותף.",
            "Alert לא נדלק ➔ סף (threshold) לא הוגדר או actuals לא נטענו.",
            "Drill-down חסום ➔ הממד-התת לא חלק מ-Planning Level של הגרף.",
          ],
          bestPracticeHe: [
            "פתח כל מפגש-סקירה מהלוח, לא מגרפים בודדים.",
            "ודא Version נכון לפני קריאת-מספרים.",
            "השתמש ב-Drill-down להגעה לשורש-החריגה.",
            "שתף קישור-לוח חי, לא צילום-מסך מיושן.",
          ],
          interviewHe: [
            { qHe: "כיצד סוקרים תרחיש (What-if) בלוח?", aHe: "מחליפים Version/Scenario; כל רכיבי-הלוח מתעדכנים מיד לאותה שכבה, כך שרואים את השפעת-התרחיש בכל הגרפים." },
            { qHe: "מדוע שני מנהלים רואים מספרים שונים באותו לוח?", aHe: "בגלל הרשאות-נתונים — כל אחד רואה רק את האזור/הממד שמותר לו, וזו התנהגות תקינה." },
          ],
          takeawaysHe: [
            "שימוש = פתיחה, Global Filter, Alerts, Drill-down, החלפת-Version וייצוא.",
            "Version קובע את השכבה הנצרכת — ודא אותו תחילה.",
            "Drill-down ו-Alerts הופכים את הלוח לכלי-החלטה, לא תצוגה בלבד.",
          ],
        },
        {
          id: "13.2.3",
          titleHe: "ניהול לוחות-מחוונים מתקדמים",
          titleEn: "Managing Advanced Dashboards",
          execHe:
            "ניהול Dashboards שומר על ספריית-הלוחות מסודרת, מאובטחת ועדכנית: עריכה, שכפול, ניהול-הרשאות-ושיתוף, תחזוקת-רכיבים (כשגרף-מקור משתנה), מוסכמת-שמות, ובעלות. לוח מתוחזק היטב נשאר 'מקור-אמת' אמין למפגשי-הסקירה לאורך-זמן.",
          beginnerHe:
            "אחרי שיש כמה לוחות צריך לטפל בהם: לערוך לוח קיים, להעתיק לוח דומה, לעדכן אותו כשהשתנה גרף שבתוכו, לתת שם ברור, לקבוע מי הבעלים, ולמחוק לוחות ישנים. אחרת הספרייה מתמלאת בלוחות כפולים ולא-מעודכנים.",
          consultantHe:
            "ב-IBP מנהלים דרך Manage Dashboards: Edit (layout/components/filters), Copy (בסיס ללוח חדש לתפקיד/מפגש), Sharing & Authorizations (לפי תפקיד/קבוצה), וניהול-תלויות מול הגרפים-המוטמעים. כאשר גרף-מקור משתנה/נמחק, הלוח מושפע — צריך לתחזק את הקשר. מומלץ מוסכמת-שמות לפי מפגש+תפקיד+גרסה, Owner מוגדר, וסקירת-ניקיון תקופתית. הרשאות-נתונים נאכפות אוטומטית, אך הרשאות-תצוגה/עריכה של הלוח עצמו מנוהלות בשיתוף. בסביבת-ענן (cloud) שדרוגי-IBP עשויים להוסיף יכולות-לוח — כדאי לסקור לוחות אחרי כל release.",
          purposeHe:
            "לשמור ספריית-לוחות נקייה ואמינה — שכל מפגש-סקירה ימצא את הלוח הנכון, מעודכן, מאובטח ובעל-בעלים, לאורך מחזורי-S&OP רבים.",
          processExampleHe:
            "אדמין מבצע תחזוקה רבעונית: מעדכן לוחות שגרף-מקור שלהם השתנה, ממזג לוחות-כפולים, מיישר מוסכמת-שמות, מגדיר Owner לכל לוח, מסיר לוחות-עונה ישנים, ובודק לוחות מול יכולות חדשות שהגיעו ב-release האחרון.",
          cbcHe:
            "ב-CBC צוות-התכנון מתחזק ספריית-לוחות לפי מפגש (Demand/Supply/Operating/Executive); אדמין-IBP מנהל הרשאות לפי תפקיד, מעדכן לוחות אחרי שדרוג-ענן, ומסיר לוחות-עונה ישנים בסוף שנה.",
          navHe: [
            "SAP IBP Web UI ► Dashboards ► Manage Dashboards (Edit / Copy / Delete)",
            "SAP IBP Web UI ► Dashboard ► Sharing & Authorizations",
            "SAP IBP Web UI ► Dashboard ► Components (תחזוקת-קשר לגרפים-מוטמעים)",
          ],
          tables: ["Dashboard", "Chart", "Authorization", "Layout", "Version"],
          tcodes: ["Manage Dashboards", "Advanced Dashboards"],
          fiori: ["Dashboards", "Analytics", "Manage Users / Authorizations"],
          configHe: [
            "Edit/Copy: עדכון Layout/Components/Filters או שכפול ללוח חדש.",
            "Sharing & Authorizations: הגדר תצוגה/עריכה לפי תפקיד/קבוצה.",
            "Component Maintenance: תחזק קשר לגרפים-מוטמעים שהשתנו/נמחקו.",
            "Naming/Ownership/Cleanup: מוסכמת-שמות, Owner וסקירה תקופתית, כולל אחרי release.",
          ],
          flow: [
            { he: "אתר לוח בספרייה", code: "Manage Dashboards" },
            { he: "Edit / Copy", code: "Edit" },
            { he: "תחזק קשר לגרפים-מוטמעים", code: "Chart" },
            { he: "הגדר Sharing + Owner", code: "Sharing" },
            { he: "מחק לוחות-מיושנים", code: "Delete" },
          ],
          masterDataHe: [
            "Embedded Charts = הגרפים שהלוח תלוי בהם.",
            "Authorizations = תצוגה/עריכה והרשאות-נתונים.",
            "Owner = האחראי על עדכניות-הלוח.",
          ],
          mistakesHe: [
            "מחיקת/שינוי גרף-מקור בלי לעדכן את הלוחות שמטמיעים אותו.",
            "לוחות-כפולים כמעט-זהים — בלבול לגבי מקור-האמת.",
            "ללא Owner — לוח 'יתום' שמתיישן.",
            "אי-סקירת-לוחות אחרי שדרוג-ענן — פספוס יכולות/תיקונים.",
          ],
          troubleshootHe: [
            "רכיב-לוח נשבר ➔ הגרף-המוטמע נמחק/שונה.",
            "משתמש רואה לוח חלקי ➔ הרשאת-נתונים חסרה.",
            "אי-אפשר לערוך לוח ➔ הרשאת-עריכה חסרה / לא Owner.",
            "ריבוי לוחות דומים ➔ אין מוסכמת-שמות וניהול-ספרייה.",
          ],
          bestPracticeHe: [
            "תחזק קשר בין לוחות לגרפים — עדכן לוחות כשמשנים גרף.",
            "מוסכמת-שמות לפי מפגש+תפקיד; Owner לכל לוח.",
            "סקירת-ניקיון תקופתית, ובמיוחד אחרי כל release-ענן.",
            "נהל הרשאות לפי תפקיד; הסתמך על הרשאות-נתונים לסינון.",
          ],
          interviewHe: [
            { qHe: "מה קורה כשגרף-מקור של לוח משתנה או נמחק?", aHe: "הלוח שמטמיע אותו מושפע — רכיב עלול להישבר; לכן יש לתחזק את הקשר ולעדכן את הלוחות התלויים." },
            { qHe: "מדוע לסקור לוחות אחרי שדרוג-ענן ב-IBP?", aHe: "כי שדרוגי-IBP עשויים להוסיף יכולות-לוח או לשנות התנהגות; סקירה מבטיחה ניצול-תכונות ועדכניות." },
          ],
          takeawaysHe: [
            "ניהול-לוחות = עריכה, שכפול, שיתוף, תחזוקת-קשר-לגרפים וניקיון.",
            "שינוי גרף-מקור משפיע על הלוחות התלויים בו.",
            "מוסכמת-שמות, Owner, הרשאות וסקירה-אחרי-release שומרים על ספרייה אמינה.",
          ],
        },
      ],
    },
    // ============================================================ 13.3
    {
      id: "13.3",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה הציג את רובד-הראייה של ה-S&OP ב-SAP IBP: Advanced Analytics שהופך Key Figures ו-KPIs לגרפים אינטראקטיביים, ו-Advanced Dashboards שמרכזים גרפים, טבלאות ו-KPI-tiles לחדר-בקרה אחד לכל מפגש-סקירה. ראינו כיצד לבחור Chart Type לפי המסר, ליצור ולנהל גרפים, ולבנות, להשתמש ולתחזק לוחות-מחוונים — הכול בענן, מעל Planning Area אחד, עם הרשאות-נתונים שמסננות לכל משתמש את תחומו.",
      beginnerHe:
        "סיכמנו את שני הכלים שהופכים מספרים לתמונה: Analytics (הגרפים) ו-Dashboards (הלוחות שמרכזים אותם). למדנו אילו גרפים מתאימים לאיזו שאלה, איך בונים גרף ולוח שלב-אחר-שלב, איך משתמשים בהם במפגש (סינון, גלישה, התראות), ואיך שומרים על הספרייה מסודרת. הרעיון המרכזי: גרף אחד = מסר אחד, ולוח אחד = מפגש אחד.",
      consultantHe:
        "מבחינת-מימוש: Advanced Analytics ו-Advanced Dashboards נשענים על Planning Area, Time Profile ו-Planning Levels; הצלחתם תלויה בהתאמת-גרעיניות, ב-Aggregation נכון, ובניהול Version/Snapshot למדדי-דיוק. ה-Dashboard מטמיע גרפים-שמורים, ולכן איכותו נגזרת מאיכות-הגרפים. Global Filters והרשאות-נתונים הם המנגנונים שהופכים לוח לאינטראקטיבי ולמאובטח כאחד. בסביבת-ענן, סקירת-לוחות אחרי כל release וניהול-ספרייה (שמות, בעלות, תלויות, ניקיון) הם מה שמשמרים את ה-Analytics כ'מקור-אמת' לאורך-זמן.",
      purposeHe:
        "לקבע את העיקרון שאנליטיקה ולוחות-מחוונים אינם קישוט אלא מנוע-ההחלטות של ה-S&OP — הממשק שבו נתוני-התכנון הופכים לפעולה-ניהולית מבוססת-עובדות.",
      processExampleHe:
        "מחזור-S&OP מלא נצרך דרך לוחות: Demand Review נפתח מלוח-דיוק-תחזית, Supply Review מלוח-קיבולת-ומלאי, ו-Executive S&OP מלוח-KPI-ראשי ופער-תוכנית — כל אחד בנוי על גרפי-Advanced-Analytics נקיים ומסונן ב-Global Filter.",
      cbcHe:
        "ב-CBC כל מחזור-S&OP מתנהל סביב ארבעה לוחות (Demand/Supply/Operating/Executive), הבנויים על גרפים של תחזית-מול-actuals, מלאי, fill rate ו-OTIF, מסוננים לפי מותג, אריזה ואזור — כך שכל מפגש נפתח מתמונה-אחת מסונכרנת.",
      navHe: [
        "SAP IBP Web UI ► Analytics (Advanced) — גרפים",
        "SAP IBP Web UI ► Dashboards (Advanced) — לוחות",
        "SAP IBP Web UI ► Custom Alerts — צבעי-חריגה",
      ],
      tables: ["Planning Area", "Key Figure", "Chart", "Dashboard", "Global Filter", "Version"],
      tcodes: ["Advanced Analytics", "Advanced Dashboards", "Manage Charts", "Manage Dashboards"],
      fiori: ["Analytics", "Dashboards", "Custom Alerts"],
      configHe: [
        "Analytics: גרף מעל Planning Area עם Key Figures, Time Profile ו-Planning Level.",
        "Dashboard: הרכבת Charts/Tables/KPI-tiles עם Global Filters.",
        "Version/Snapshot: בסיס למדידת-דיוק נכונה.",
        "ניהול-ספרייה: שמות, בעלות, תלויות, הרשאות וניקיון — כולל אחרי release.",
      ],
      mistakesHe: [
        "התייחסות לגרפים/לוחות כקישוט במקום ככלי-החלטה.",
        "בניית לוחות על גרפים שגויים/לא-מתוחזקים.",
        "התעלמות מ-Version/Snapshot — מדדי-דיוק מטעים.",
        "ספריית-אנליטיקה ללא שמות, בעלות וניקיון.",
      ],
      troubleshootHe: [
        "תצוגה ריקה ➔ אי-התאמת Planning Level / Aggregation.",
        "מספרים מטעים ➔ Version/Snapshot שגוי.",
        "Global Filter חלקי ➔ רכיב לא חולק את הממד.",
        "לוח שבור ➔ גרף-מקור שונה/נמחק.",
      ],
      bestPracticeHe: [
        "גרף אחד = מסר אחד; לוח אחד = מפגש אחד.",
        "בנה לוחות על גרפים נקיים ומאומתים בלבד.",
        "נהל Version/Snapshot בקפדנות למדדי-דיוק.",
        "תחזק ספריית-אנליטיקה: שמות, בעלות, תלויות והרשאות-נתונים.",
      ],
      interviewHe: [
        { qHe: "מה היחס בין Advanced Analytics ל-Advanced Dashboards?", aHe: "Analytics מייצר גרפים בודדים מעל Planning Area; Dashboards מרכזים את אותם גרפים-שמורים, טבלאות ו-KPI-tiles לתצוגה אחת עם Global Filters. הלוח תלוי באיכות-הגרפים." },
        { qHe: "מהו עקרון-העל לעיצוב אנליטיקה ולוחות ב-S&OP?", aHe: "גרף אחד = מסר אחד, ולוח אחד = מפגש/תפקיד אחד; הכול בנוי על נתונים בגרעיניות נכונה, מ-Version מתאים, ומסונן בהרשאות-נתונים." },
      ],
      takeawaysHe: [
        "Analytics + Dashboards = מנוע-ההחלטות הוויזואלי של ה-S&OP.",
        "לוח נבנה על גרפים נקיים מעל Planning Area, עם Global Filters.",
        "Version/Snapshot והתאמת-גרעיניות הם תנאי לתצוגה ולמדידה נכונה.",
        "ניהול-ספרייה (שמות/בעלות/תלויות/הרשאות) שומר על מקור-אמת לאורך-זמן.",
      ],
    },
  ],
};
