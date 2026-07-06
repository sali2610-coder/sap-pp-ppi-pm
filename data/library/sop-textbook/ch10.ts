// ===== S&OP Digital Textbook — Chapter 10 (gold-standard learning chapter) =====
// Configuring SAP IBP for Sales and Operations. Every node is a complete
// LearningNode with 18 facets of authored Hebrew (beginner + consultant).
// Config-heavy: rich IBP Configuration app navigation trees. Hierarchy/ids
// preserved exactly; הארגון = Example Product bottling IBP planning-area configuration.
import type { TextbookChapter } from "./types";

export const CH10: TextbookChapter = {
  n: 10,
  titleHe: "הגדרת SAP IBP ל-S&OP",
  titleEn: "Configuring SAP IBP for Sales and Operations",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה להגדרת SAP IBP (Integrated Business Planning) עבור תהליך S&OP. SAP IBP הוא פתרון ענן (cloud) לתכנון שרשרת-אספקה, וכל תהליך תכנון בו נשען על אבני-בניין מודולריות: Planning Area, Time Profile, Attribute, Master Data Type, Planning Level, Key Figure ו-Planning Operator. כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך מקצה-לקצה, דוגמת הארגון (מפעל-בקבוק של מוצר לדוגמה), עצי-ניווט באפליקציית IBP Configuration, תרשימי-זרימה, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: לדעת להגדיר Planning Area שלם ל-S&OP — כולל key figures, aggregation/disaggregation ו-Copy Operator — ללא צורך בחומר נוסף.",
  subchapters: [
    // ============================================================ 10.1
    {
      id: "10.1", titleHe: "אזורי תכנון ופרופילי זמן", titleEn: "Planning Areas and Time Profiles",
      execHe:
        "ה-Planning Area הוא מבנה-העל של כל תהליך תכנון ב-IBP: הוא אוסף בתוכו את כל אבני-הבניין — Time Profile, Attributes, Master Data Types, Planning Levels ו-Key Figures — לכדי מודל-נתונים אחד שעליו רצים כל החישובים והדוחות. ה-Time Profile מגדיר את ציר-הזמן (יום/שבוע/חודש/רבעון/שנה) שעליו נשמרים ומצטברים הנתונים. שני אלה הם התשתית שבלעדיה אין S&OP ב-IBP.",
      beginnerHe:
        "חשוב על Planning Area כמו 'בסיס-נתונים מוכן-לתכנון' — קופסה אחת גדולה שמכילה את כל מה שצריך כדי לתכנן: אילו ממדים (מוצר, לקוח, מפעל), אילו מדדים (ביקוש, מלאי, ייצור), ובאיזה לוח-זמנים. ה-Time Profile הוא 'הלוח-שנה' של התכנון: הוא אומר אם מתכננים לפי חודשים, שבועות או רבעונים, וכיצד הם מתקפלים זה לתוך זה (שבועות ← חודשים ← שנים).",
      consultantHe:
        "ב-IBP מודל-הנתונים מוגדר באפליקציית Web UI בשם Configuration (לשעבר 'Manage Planning Areas' ב-Excel/Fiori). SAP מספקת Sample Planning Areas (SAP4, SAPIBP1) כתבניות. ה-Planning Area מקשר Time Profile יחיד, אוסף Planning Levels (כל אחד = צירוף Attributes), ו-Key Figures המוקצים ל-base ו-stored levels. ה-Time Profile בנוי מ-Time Profile Levels (Technical Day/Week/Month/Quarter/Year) עם Period IDs ייחודיים; שינוי Time Profile לאחר טעינת-נתונים הוא יקר ביותר. לאחר כל שינוי מבני יש לבצע Activation של ה-Planning Area.",
      purposeHe:
        "לספק לארגון מבנה-נתונים אחד, עקבי ומאוחד, שעליו רצים תרחישי S&OP — מ-Demand Review ועד Supply Review ו-Executive Review. ה-Time Profile מבטיח שכל המדדים מדברים באותה 'שפת-זמן', כך שאפשר להשוות ביקוש לאספקה לאותה תקופה בדיוק.",
      processExampleHe:
        "צוות תכנון מקים תהליך S&OP חודשי: בונים Time Profile עם רמות Month ← Quarter ← Year, יוצרים Planning Area חדש מבוסס SAPIBP1, מקצים לו את ה-Time Profile, ולאחר Activation טוענים נתוני-אב ונתוני-מפתח. מאותו רגע כל החישובים (ביקוש, אספקה, מלאי) מתבצעים על אותו ציר-זמן חודשי.",
      scenarioHe:
        "בארגון מוקם Planning Area בשם MFG_SNOP עבור תכנון מכירות-ותפעול של משקאות. ה-Time Profile נבנה עם Month ← Quarter ← Year, כי תכנון-המשקאות מתנהל חודשית מול עונתיות-קיץ. רמת-Week נוספת כדי לתמוך בפירוק (disaggregation) של תכנית-הייצור לשבועות-מילוי בקווי-המילוי.",
      navHe: [
        "IBP Web UI ► Configuration ► Time Profiles ► New (הגדר Time Profile Levels: Month/Quarter/Year)",
        "IBP Web UI ► Configuration ► Planning Areas ► Copy from Sample (SAPIBP1) ► assign Time Profile",
        "IBP Web UI ► Configuration ► Planning Areas ► <Planning Area> ► Activate",
      ],
      tables: ["Planning Area (metadata)", "Time Profile", "Time Profile Level"],
      tcodes: ["IBP Web UI: Configuration", "Manage Planning Area Versions", "Application Jobs"],
      fiori: ["Configuration", "Planning Area Activation", "Time Profiles"],
      configHe: [
        "Time Profile: הגדר Time Profile Levels מהגס-לדק (Year ← Quarter ← Month [← Week ← Day]); כל רמה מקבלת Period ID ייחודי ו-Time Profile Level number.",
        "Planning Area: צור חדש או Copy מ-Sample (SAP4/SAPIBP1); הקצה Time Profile יחיד; הגדר Storage Time Profile Level (הרמה הדקה ביותר שבה נשמרים נתונים).",
        "Activation: לאחר כל שינוי מבני בצע Activate; פעולה זו בונה את מבני-הנתונים בפועל ב-HANA.",
        "Planning Area Version: ניהול גרסאות-עבודה מול הגרסה הפעילה, לבדיקת שינויים לפני Activation.",
      ],
      flow: [
        { he: "בניית Time Profile", code: "Month/Quarter/Year", note: "ציר-זמן" },
        { he: "יצירת Planning Area", code: "Copy SAPIBP1" },
        { he: "הקצאת Time Profile", code: "assign", note: "Storage level" },
        { he: "Activation", code: "Activate", note: "בונה מבנים ב-HANA" },
        { he: "טעינת נתונים", code: "Data Integration", note: "מוכן ל-S&OP" },
      ],
      masterDataHe: [
        "Time Profile = ציר-הזמן הגלובלי; Planning Area = מיכל המודל.",
        "Storage Time Profile Level = הרמה שבה נשמרים נתוני-המפתח פיזית (לרוב Month/Week).",
      ],
      mistakesHe: [
        "בחירת Storage Time Profile Level גס מדי (Quarter) — אובדן יכולת-פירוק לתקופות דקות.",
        "שינוי Time Profile לאחר טעינת-נתונים — דורש טעינה-מחדש ועלול לאבד נתונים.",
        "בנייה מאפס במקום Copy מ-Sample Planning Area — בזבוז-זמן ושגיאות-מבנה.",
        "שכחת Activation לאחר שינוי — השינוי 'יושב' בגרסת-עבודה ולא נכנס לתוקף.",
      ],
      troubleshootHe: [
        "נתונים לא נטענים ➔ ה-Planning Area לא Activated, או Storage Time Profile Level לא תואם את הנתונים.",
        "חישובים על ציר-זמן שגוי ➔ Time Profile Levels לא מסודרים נכון או חסרה רמת-Week.",
        "Activation נכשל ➔ Planning Level/Key Figure לא-עקבי; בדוק את לוג ה-Activation.",
        "אי-אפשר לשנות Time Profile ➔ קיימים נתונים; נדרש ניקוי או Planning Area חדש.",
      ],
      bestPracticeHe: [
        "התחל תמיד מ-Copy של Sample Planning Area (SAPIBP1) וקצץ את מה שלא צריך.",
        "הגדר Time Profile עם רמה דקה מספיק (Week) גם אם מתכננים חודשית — קל לצבור, קשה לפרק.",
        "נהל שינויים בגרסת-עבודה (Planning Area Version) ובדוק לפני Activation בסביבת-ייצור.",
        "תעד את משמעות כל Time Profile Level והקשר העסקי שלו.",
      ],
      interviewHe: [
        { qHe: "מהו Planning Area ב-IBP?", aHe: "מבנה-העל המאגד Time Profile, Attributes, Master Data Types, Planning Levels ו-Key Figures לכדי מודל-נתונים אחד שעליו רצים כל החישובים והדוחות." },
        { qHe: "מהו Storage Time Profile Level ומדוע הוא חשוב?", aHe: "הרמה הדקה ביותר שבה נתוני-המפתח נשמרים פיזית. הוא קובע את גבול-הפירוק: אפשר לצבור (aggregate) מעלה אך לא לפרק מתחת לרמה זו." },
        { qHe: "מדוע Activation נדרש?", aHe: "כל שינוי מבני יושב תחילה בגרסת-עבודה; Activation בונה בפועל את מבני-הנתונים ב-HANA ומכניס את השינוי לתוקף." },
      ],
      takeawaysHe: [
        "Planning Area = מיכל-המודל; Time Profile = ציר-הזמן.",
        "Storage Time Profile Level קובע את גבול-הפירוק.",
        "תמיד Copy מ-Sample ותמיד Activate אחרי שינוי מבני.",
      ],
      relatedHe: [
        { labelHe: "S&OP · רמות תכנון (10.3)", href: "/library/sop/chapter-10/#sub-10.3" },
        { labelHe: "S&OP · מדדי-מפתח (10.4)", href: "/library/sop/chapter-10/#sub-10.4" },
      ],
      children: [
        {
          id: "10.1.1", titleHe: "אזורי תכנון", titleEn: "Planning Areas",
          execHe: "ה-Planning Area הוא אובייקט-העל של מודל-התכנון. הוא מקשר Time Profile יחיד, אוסף Planning Levels ו-Key Figures, ומגדיר את גבולות התהליך. כל S&OP חי בתוך Planning Area אחד.",
          beginnerHe: "Planning Area הוא 'הפרויקט' שבתוכו מתכננים. הכל — ממדים, מדדים, לוח-זמנים — חי בתוכו. SAP מספקת תבניות מוכנות (Sample Planning Areas) שמהן מעתיקים ומתאימים.",
          consultantHe: "ב-Configuration מגדירים Planning Area עם מזהה (עד 8 תווים), Time Profile, ו-Attributes גלובליים. Sample Planning Areas: SAP4 (כללי), SAPIBP1 (מודל מאוחד ל-Demand/Inventory/S&OP/Supply), SAP6, SAP7. ה-Planning Area תומך ב-Versions ו-Scenarios לתכנון-תרחישים. Activation בונה את הטבלאות ב-HANA.",
          purposeHe: "לתחום ולאחד תהליך-תכנון שלם תחת מבנה-נתונים אחד עקבי, כך שכל המדדים והרמות מסונכרנים.",
          processExampleHe: "צוות מעתיק את SAPIBP1 ל-Planning Area חדש Z_SNOP, מסיר Key Figures לא-רלוונטיים, מוסיף Attribute עסקי, ומפעיל Activate. כעת אפשר לטעון נתונים ולהריץ דוחות.",
          scenarioHe: "בארגון ה-Planning Area הוא MFG_SNOP, מבוסס SAPIBP1, ומכיל את כל ממדי-המשקאות (Product, Brand, Plant, Customer) וכל מדדי ה-S&OP (Demand, Production, Inventory).",
          navHe: ["IBP Web UI ► Configuration ► Planning Areas ► New / Copy from Sample (SAPIBP1)", "IBP Web UI ► Configuration ► Planning Areas ► <PA> ► Activate"],
          tables: ["Planning Area (metadata)", "Sample PA: SAPIBP1"],
          tcodes: ["IBP Web UI: Configuration", "Manage Planning Area Versions"],
          fiori: ["Configuration", "Planning Area Activation"],
          configHe: ["צור Planning Area (Copy מ-SAPIBP1), הקצה Time Profile, הגדר Attributes ו-Planning Levels, ובצע Activation.", "נהל Versions/Scenarios לתכנון-תרחישים בתוך אותו Planning Area."],
          mistakesHe: ["בנייה מאפס במקום Copy מ-Sample.", "ערבוב תהליכים שונים (Demand+Supply+Inventory) ב-Planning Area אחד ללא תכנון נכון של Levels."],
          troubleshootHe: ["Activation נכשל ➔ אי-עקביות ב-Planning Level/Key Figure; קרא את לוג ה-Activation.", "נתונים לא נטענים ➔ ה-PA לא Activated."],
          bestPracticeHe: ["העדף SAPIBP1 כבסיס — הוא מודל מאוחד ומכוסה היטב.", "שמור Planning Area יחיד ומאוחד ל-S&OP כדי להשוות ביקוש לאספקה באותו מבנה."],
          interviewHe: [
            { qHe: "מהי SAPIBP1?", aHe: "Sample Planning Area מאוחד של SAP המכסה Demand, Inventory, S&OP ו-Supply — הבסיס המומלץ להעתקה ולהתאמה." },
            { qHe: "האם אפשר לשנות Time Profile של Planning Area פעיל?", aHe: "טכנית כן, אך זו פעולה יקרה הדורשת טעינה-מחדש; מומלץ מאוד לקבע את ה-Time Profile מראש." },
          ],
          takeawaysHe: ["Planning Area = אובייקט-העל של המודל.", "Copy מ-SAPIBP1.", "Activate לאחר כל שינוי."],
          relatedHe: [{ labelHe: "S&OP · פרופיל זמן (10.1.2)", href: "/library/sop/chapter-10/#sub-10.1.2" }],
        },
        {
          id: "10.1.2", titleHe: "פרופיל זמן", titleEn: "Time Profile",
          execHe: "ה-Time Profile מגדיר את ציר-הזמן של מודל-התכנון — אילו רמות-זמן קיימות (Day/Week/Month/Quarter/Year), כיצד הן מתקפלות זו לתוך זו, ובאיזו רמה נשמרים הנתונים. הוא ה'לוח-שנה' שכל המדדים מדברים בו.",
          beginnerHe: "ה-Time Profile הוא 'איך מחלקים את הזמן': לפי ימים, שבועות, חודשים, רבעונים או שנים. הוא גם קובע איך תקופה קטנה מתקפלת לתוך גדולה — 4–5 שבועות בחודש, 3 חודשים ברבעון.",
          consultantHe: "Time Profile בנוי מ-Time Profile Levels ממוספרים. כל רמה מחזיקה Period IDs (TSTART/TEND). הרמה הגבוהה ביותר היא הגסה (Year). ה-Storage level הוא הדק ביותר שבו נשמרים נתונים. תבניות-זמן (Patterns) קובעות חלוקת-שבועות. שינוי לאחר טעינה דורש re-init של נתוני-הזמן. ה-Time Profile משותף לכל מי שמשתמש בו, אך Planning Area מקשר רק אחד.",
          purposeHe: "להבטיח 'שפת-זמן' אחידה לכל המדדים, כך שביקוש ואספקה לאותה תקופה ניתנים להשוואה, וכך שצבירה ופירוק לאורך-זמן עובדים נכון.",
          processExampleHe: "בונים Time Profile עם Level 1=Year, 2=Quarter, 3=Month, 4=Week. מגדירים Storage ב-Week. נתוני-ביקוש שבועיים מצטברים אוטומטית לחודשים ולרבעונים בדוחות.",
          scenarioHe: "בארגון ה-Time Profile הוא Year ← Quarter ← Month ← Week. תכנון-המכירות מתנהל חודשית, אך הפירוק לשבועות מאפשר תרגום תכנית-ייצור לתוכנית-מילוי שבועית בקווים.",
          navHe: ["IBP Web UI ► Configuration ► Time Profiles ► New ► define Levels (Year/Quarter/Month/Week)", "IBP Web UI ► Configuration ► Time Profiles ► Generate Periods (TSTART/TEND)"],
          tables: ["Time Profile", "Time Profile Level", "Period (TSTART/TEND)"],
          tcodes: ["IBP Web UI: Configuration", "Application Jobs (Generate Time Periods)"],
          fiori: ["Time Profiles", "Configuration"],
          configHe: ["הגדר Time Profile Levels ממוספרים מהגס לדק; קבע את ה-Storage level.", "הרץ Generate Periods ליצירת ה-Period IDs בפועל (TSTART/TEND) לטווח-השנים הנדרש.", "קבע תבנית-שבועות (4-4-5 או לפי-יומן) להתקפלות שבוע←חודש."],
          mistakesHe: ["Storage level גס מדי ➔ אי-יכולת לפרק לשבועות.", "אי-הרצת Generate Periods ➔ אין תקופות לטעון אליהן נתונים.", "שינוי Time Profile לאחר טעינה ➔ אובדן/חוסר-עקביות נתוני-זמן."],
          troubleshootHe: ["נתונים נופלים לתקופה שגויה ➔ TSTART/TEND או תבנית-שבועות שגויים.", "אין תקופות עתידיות לתכנון ➔ הרץ Generate Periods לטווח רחב יותר."],
          bestPracticeHe: ["הגדר רמה דקה (Week) גם בתכנון חודשי — קל לצבור מעלה.", "צור תקופות לטווח של 3–5 שנים קדימה.", "קבע Time Profile מוקדם ואל תשנה לאחר טעינה."],
          interviewHe: [
            { qHe: "מהם Time Profile Levels?", aHe: "הרמות הממוספרות של ציר-הזמן (Year/Quarter/Month/Week/Day) המגדירות את היררכיית-הזמן ואת אופן-התקפלות התקופות." },
            { qHe: "מהו תפקיד Generate Periods?", aHe: "יצירת ה-Period IDs בפועל (TSTART/TEND) לכל רמה ולטווח-השנים — בלעדיהם אין תקופות לאחסן בהן נתונים." },
          ],
          takeawaysHe: ["Time Profile = ציר-הזמן ההיררכי.", "Storage level קובע את גבול-הפירוק לאורך-זמן.", "הרץ Generate Periods קדימה ואל תשנה לאחר טעינה."],
          relatedHe: [{ labelHe: "S&OP · אזורי תכנון (10.1.1)", href: "/library/sop/chapter-10/#sub-10.1.1" }],
        },
      ],
    },
    // ============================================================ 10.2
    {
      id: "10.2", titleHe: "מאפיינים וסוגי נתוני-אב", titleEn: "Attributes and Master Data Types",
      execHe:
        "Attributes ו-Master Data Types הם אבני-הבניין של הממד (Dimension) ב-IBP. Attribute הוא שדה-נתון יחיד (כמו Product ID, Customer ID, Region); Master Data Type הוא אוסף של Attributes המתאר ישות-עסקית שלמה (Product, Location, Customer). יחד הם מגדירים 'על מה מתכננים' — את כל הצירים שלפיהם נשמרים ומצטברים נתוני-המפתח.",
      beginnerHe:
        "Attribute הוא 'עמודה' — פיסת-מידע יחידה כמו מספר-מוצר או שם-לקוח. Master Data Type הוא 'טבלה' שמקבצת כמה Attributes שמתארים יחד דבר אחד — למשל Product מכיל Product ID, Product Description, Brand, Subcategory. אלה הממדים שלפיהם מתכננים: מוצר, מיקום, לקוח.",
      consultantHe:
        "ב-Configuration מגדירים Attributes (Name, Data Type: NUMC/CHAR/DATS/DEC, אורך) ו-Master Data Types. סוגי Master Data Type: Simple (רשימת-ערכים עצמאית, כמו Product), Compound (תלוי במפתח-אב, כמו Customer-Product), Reference (מצביע על Simple), ו-External (נשען על מקור חיצוני). כל Master Data Type נושא Key Attributes (המפתח-הראשי) ו-Attributes רגילים. ה-Master Data Types מספקים את ה-Attributes שמהם נבנים Planning Levels.",
      purposeHe:
        "להגדיר את 'גיאומטריית-התכנון' — אילו ממדים קיימים, מה המפתח של כל ישות, ואילו תכונות מתארות אותה. ללא Attributes ו-Master Data Types תקינים אין Planning Levels, ואין על מה לאחסן key figures.",
      processExampleHe:
        "מגדירים Attribute PRDID (CHAR 18) ו-PRDDESC, יוצרים Master Data Type Simple בשם 'Product' עם PRDID כ-Key Attribute, וטוענים את רשימת-המוצרים. אותו דבר ל-Location ו-Customer. כעת אפשר לבנות Planning Level בצירוף Product × Location × Month.",
      scenarioHe:
        "בארגון מגדירים Master Data Types: Product (PRDID, Brand, Pack-Size, Flavor), Location (Plant, DC), Customer (Sold-To, Channel). Attribute עסקי ייחודי: Brand (Coke / Sprite / Fanta) המאפשר צבירת-ביקוש לפי מותג ב-Demand Review.",
      navHe: [
        "IBP Web UI ► Configuration ► Attributes ► New (Name, Data Type, Length)",
        "IBP Web UI ► Configuration ► Master Data Types ► New ► choose type (Simple/Compound/Reference/External)",
        "IBP Web UI ► Configuration ► Master Data Types ► assign Key Attributes + Attributes",
      ],
      tables: ["Attribute (metadata)", "Master Data Type", "Master Data (instances)"],
      tcodes: ["IBP Web UI: Configuration", "Data Integration (Master Data load)"],
      fiori: ["Configuration", "Manage Master Data"],
      configHe: [
        "Attributes: הגדר Name, Data Type (NUMC/CHAR/DATS/DEC), Length; שמות באנגלית, ייחודיים בתוך ה-Planning Area.",
        "Master Data Type: בחר סוג (Simple/Compound/Reference/External), הקצה Key Attributes ו-Attributes.",
        "Compound MDT: הגדר Referenced Master Data Types (תלות במפתח-אב) — למשל Customer-Product.",
        "טען Master Data דרך Data Integration / Manage Master Data לאחר Activation.",
      ],
      flow: [
        { he: "הגדרת Attributes", code: "PRDID/Brand", note: "שדות-נתון" },
        { he: "יצירת Master Data Type", code: "Product/Location/Customer" },
        { he: "הקצאת Key Attributes", code: "Key", note: "מפתח-ראשי" },
        { he: "Activation", code: "Activate" },
        { he: "טעינת Master Data", code: "load", note: "מוכן ל-Planning Levels" },
      ],
      masterDataHe: [
        "Attribute = שדה יחיד; Master Data Type = ישות (אוסף Attributes + Key).",
        "Key Attributes קובעים את ייחודיות-הרשומה ב-Master Data Type.",
      ],
      mistakesHe: [
        "Data Type/Length שגוי ל-Attribute ➔ קיטום-נתונים בטעינה.",
        "בחירת Simple במקום Compound כשנדרשת תלות-מפתח ➔ צירופים שגויים.",
        "Key Attributes שגויים ➔ כפילויות או רשומות חסרות.",
        "הוספת Attribute לאחר טעינה בלי טעינה-מחדש של Master Data.",
      ],
      troubleshootHe: [
        "צירופי-תכנון חסרים ➔ Master Data לא נטען או Key Attributes שגויים.",
        "ערכים מקוטעים ➔ Length של ה-Attribute קצר מדי.",
        "שגיאת-טעינת Master Data ➔ Compound MDT דורש שהמפתח-האב כבר קיים.",
      ],
      bestPracticeHe: [
        "תכנן את ה-Attributes וה-Master Data Types לפני יצירת Planning Levels — הם הבסיס.",
        "השתמש בשמות-Attribute עקביים בין Master Data Types (PRDID זהה בכל מקום).",
        "טען מאסטר-דאטה לפני נתוני-מפתח — צירופים חסרים מובילים לאובדן-נתונים.",
        "השתמש ב-Compound MDT רק כשקיימת תלות-מפתח אמיתית.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין Attribute ל-Master Data Type?", aHe: "Attribute = שדה-נתון יחיד (למשל Product ID); Master Data Type = ישות-עסקית שלמה המקבצת כמה Attributes עם Key (למשל Product)." },
        { qHe: "מהם סוגי Master Data Types?", aHe: "Simple (רשימה עצמאית), Compound (תלוי במפתח-אב), Reference (מצביע על Simple), ו-External (מקור חיצוני)." },
      ],
      takeawaysHe: [
        "Attribute = שדה; Master Data Type = ישות עם Key.",
        "הם מספקים את ה-Attributes שמהם נבנים Planning Levels.",
        "טען מאסטר-דאטה לפני נתוני-מפתח.",
      ],
      relatedHe: [
        { labelHe: "S&OP · רמות תכנון (10.3)", href: "/library/sop/chapter-10/#sub-10.3" },
      ],
      children: [
        {
          id: "10.2.1", titleHe: "מאפיינים", titleEn: "Attributes",
          execHe: "Attribute הוא יחידת-הנתון האטומית ב-IBP — שדה יחיד עם שם, סוג-נתון ואורך. כל ממד, כל Master Data Type וכל Planning Level נבנים מ-Attributes. הם אבני-הבניין הקטנות ביותר של המודל.",
          beginnerHe: "Attribute הוא 'עמודה': פריט-מידע יחיד כמו מספר-מוצר, אזור-מכירה או תאריך. הכל ב-IBP מורכב מ-Attributes — כמו שטבלה מורכבת מעמודות.",
          consultantHe: "ב-Configuration מגדירים Attribute עם Technical Name (אנגלית, ייחודי), Data Type (NUMC/CHAR/DATS/DEC/TIMS) ו-Length/Decimals. Attributes נצרכים ב-Master Data Types (כ-Key או רגיל) וב-Planning Levels. שינוי Data Type/Length לאחר שימוש מצריך זהירות — ייתכן re-load. Attributes מסוג Calculated אפשריים דרך נוסחה.",
          purposeHe: "לספק את הלבנים שמהן בונים ממדים, ישויות ורמות-תכנון — עם טיפוס ואורך נכונים כדי שהנתונים יישמרו בלי קיטום.",
          processExampleHe: "מגדירים PRDID (CHAR 18), Brand (CHAR 10), UNITPRICE (DEC 15,2). אלה ישמשו ב-Master Data Type 'Product' וב-Planning Levels וב-Key Figures.",
          scenarioHe: "בארגון מגדירים Attributes: PRDID, Brand (Coke/Sprite/Fanta), PackSize (Can/Bottle/Multipack), Channel (Retail/HoReCa). Brand מאפשר צבירה לפי-מותג.",
          navHe: ["IBP Web UI ► Configuration ► Attributes ► New (Technical Name, Data Type, Length)"],
          tables: ["Attribute (metadata)"],
          tcodes: ["IBP Web UI: Configuration"],
          fiori: ["Configuration"],
          configHe: ["הגדר Technical Name, Data Type (NUMC/CHAR/DATS/DEC), Length/Decimals.", "שמור על שמות עקביים בין Master Data Types (PRDID זהה בכל מקום)."],
          mistakesHe: ["Length קצר מדי ➔ קיטום.", "Data Type שגוי (CHAR למספר שעליו מחשבים) ➔ בעיות-חישוב.", "שמות לא-עקביים בין MDTs ➔ קושי בקישור."],
          troubleshootHe: ["ערכים מקוטעים ➔ הגדל Length.", "אי-אפשר לשייך Attribute ל-Planning Level ➔ סוג-נתון לא-תואם."],
          bestPracticeHe: ["תכנן את מילון-ה-Attributes מראש.", "השתמש ב-NUMC/DEC נכון לפי שימוש (מפתח מול ערך-מספרי)."],
          interviewHe: [{ qHe: "מהו Attribute ב-IBP?", aHe: "שדה-נתון אטומי יחיד (שם, סוג-נתון, אורך) שממנו נבנים Master Data Types ו-Planning Levels." }],
          takeawaysHe: ["Attribute = הלבנה הקטנה ביותר של המודל.", "סוג-נתון ואורך נכונים מונעים קיטום.", "שמות עקביים מקלים על קישור."],
        },
        {
          id: "10.2.2", titleHe: "סוגי נתוני-אב", titleEn: "Master Data Types",
          execHe: "Master Data Type מגדיר ישות-עסקית — אוסף Attributes עם Key Attributes — ומאחסן את רשימת-המופעים שלה (כל המוצרים, כל הלקוחות). הוא מספק את הממדים שלפיהם מתכננים ושעליהם נצברים נתוני-המפתח.",
          beginnerHe: "Master Data Type הוא 'טבלת-יסוד' כמו רשימת-מוצרים או רשימת-לקוחות. הוא מקבץ Attributes שמתארים דבר אחד, ומחזיק את כל הרשומות בפועל. אלה הממדים: מוצר, מיקום, לקוח.",
          consultantHe: "סוגים: Simple (רשימה עצמאית עם Key משלה), Compound (Key תלוי במפתח של Master Data Type אחר — Referenced MDTs), Reference (מצביע על Simple ללא נתונים משלו), External (נשען על מקור חיצוני/Virtual). כל אחד נושא Key Attributes ו-Attributes רגילים. נטענים דרך Data Integration / Manage Master Data לאחר Activation. Compound חיוני לישויות תלויות (Customer-Product, Source-of-Supply).",
          purposeHe: "להגדיר את הישויות שלפיהן מתכננים ואת המפתח שלהן, ולספק את ה-Attributes ל-Planning Levels.",
          processExampleHe: "יוצרים Simple MDT 'Location' (Key: LOCID), טוענים 50 מיקומים. יוצרים Compound MDT 'Customer-Location' התלוי ב-Customer וב-Location, ומגדיר אילו לקוחות משויכים לאילו מיקומים.",
          scenarioHe: "בארגון: Simple MDTs ל-Product, Plant, Customer; Compound MDT ל-Product-Plant (אילו משקאות מיוצרים בכל מפעל) ול-Customer-Product (מטריצת-שירות).",
          navHe: ["IBP Web UI ► Configuration ► Master Data Types ► New ► type (Simple/Compound/Reference/External)", "IBP Web UI ► Configuration ► Master Data Types ► assign Key Attributes + Referenced MDTs"],
          tables: ["Master Data Type", "Master Data (instances)"],
          tcodes: ["IBP Web UI: Configuration", "Data Integration"],
          fiori: ["Configuration", "Manage Master Data"],
          configHe: ["בחר סוג; הקצה Key Attributes ו-Attributes רגילים.", "ל-Compound: הגדר Referenced Master Data Types.", "טען Master Data לאחר Activation (Data Integration / Manage Master Data)."],
          mistakesHe: ["Simple במקום Compound כשנדרשת תלות-מפתח ➔ צירופים שגויים.", "Key Attributes שגויים ➔ כפילויות.", "אי-טעינת מאסטר-דאטה ➔ אובדן נתוני-מפתח בטעינה."],
          troubleshootHe: ["טעינת Compound נכשלת ➔ המפתח-האב חסר.", "צירופי-תכנון חסרים ➔ Master Data חלקי.", "Reference MDT ריק ➔ ה-Simple שאליו הוא מצביע לא נטען."],
          bestPracticeHe: ["השתמש ב-Compound רק בתלות-מפתח אמיתית.", "טען מאסטר-דאטה לפני נתוני-מפתח.", "שמור Key מינימלי וייחודי."],
          interviewHe: [
            { qHe: "מתי משתמשים ב-Compound Master Data Type?", aHe: "כשהמפתח של הישות תלוי במפתח של ישות אחרת — למשל Customer-Product, שבה צירוף לקוח+מוצר הוא המפתח." },
            { qHe: "מה ההבדל בין Reference ל-Simple?", aHe: "Simple מחזיק נתונים משלו; Reference רק מצביע על Simple קיים בלי לאחסן נתונים נפרדים." },
          ],
          takeawaysHe: ["Master Data Type = ישות עם Key.", "Simple/Compound/Reference/External לפי תלות-מפתח.", "טען מאסטר-דאטה לפני נתוני-מפתח."],
        },
      ],
    },
    // ============================================================ 10.3
    {
      id: "10.3", titleHe: "רמות תכנון", titleEn: "Planning Levels",
      execHe:
        "Planning Level הוא צירוף של Attributes (ולרוב גם Time Profile Level) המגדיר את גרעיניות-הנתונים — את הרמה שבה key figure נשמר או מחושב. הוא ה'רזולוציה' של התכנון: Product × Location × Customer × Month היא רמה אחת; Brand × Region × Quarter היא רמה אחרת. כל key figure מעוגן לרמת-בסיס (base level) ויכול להיצבר/להתפרק לרמות אחרות.",
      beginnerHe:
        "Planning Level הוא 'באיזה דיוק מסתכלים על הנתונים'. אם משלבים מוצר + מיקום + חודש — זו רמה מפורטת. אם רק מותג + רבעון — זו רמה מסכמת. ה-key figures 'יושבים' על רמה מסוימת, ואפשר לראות אותם מצטברים (פחות פירוט) או מתפרקים (יותר פירוט).",
      consultantHe:
        "ב-Configuration מגדירים Planning Level עם רשימת Attributes (מ-Master Data Types) ו-Root Time Profile Level. ה-base Planning Level של key figure הוא הרמה שבה הוא מחושב/מאוחסן; aggregated levels נגזרים בצבירה. Planning Levels חייבים להיות עקביים עם ה-Attributes הקיימים. רמת-האחסון (stored) מול רמת-חישוב (calculated) משפיעה על ביצועים. ה-Planning Level הוא הצומת המחבר בין Master Data ל-Key Figures.",
      purposeHe:
        "להגדיר את הרזולוציה שבה כל מדד חי, ולאפשר צבירה ופירוק עקביים בין רמות — כך שמנהל רואה סיכום-מותג בעוד מתכנן רואה פירוט-מוצר, מאותם נתונים.",
      processExampleHe:
        "key figure 'Demand' מוגדר ב-base level Product × Customer × Location × Week. בדוח Executive Review הוא נצבר אוטומטית ל-Brand × Region × Quarter. אותם נתונים, רזולוציות שונות, בלי כפילות.",
      scenarioHe:
        "בארגון מגדירים Planning Levels: PRODUCT_LOC_CUST_WK (בסיס לביקוש), BRAND_REGION_MO (סקירת-מנהלים), ו-PLANT_PROD_WK (תכנון-ייצור). תכנית-המכירות ברמת-מותג מתפרקת לרמת-מוצר לצורך תכנון-מילוי.",
      navHe: [
        "IBP Web UI ► Configuration ► Planning Levels ► New ► select Attributes",
        "IBP Web UI ► Configuration ► Planning Levels ► set Root Time Profile Level",
        "IBP Web UI ► Configuration ► Key Figures ► assign Base Planning Level",
      ],
      tables: ["Planning Level (metadata)", "Attribute", "Time Profile Level"],
      tcodes: ["IBP Web UI: Configuration"],
      fiori: ["Configuration"],
      configHe: [
        "צור Planning Level ובחר Attributes (מ-Master Data Types פעילים).",
        "קבע Root Time Profile Level (הרמה הדקה ביותר שאליה הרמה קשורה — Week/Month).",
        "סמן אם הרמה היא Storage (נתונים נשמרים) או נגזרת (calculated/aggregated).",
        "בעת הגדרת Key Figure, הקצה את ה-Base Planning Level שלו.",
      ],
      flow: [
        { he: "בחירת Attributes", code: "Product×Loc×Cust", note: "ממדים" },
        { he: "Root Time Profile Level", code: "Week/Month" },
        { he: "הגדרת Planning Level", code: "PL" },
        { he: "הקצאה ל-Key Figure", code: "Base level" },
        { he: "צבירה/פירוק", code: "aggregate/disaggregate" },
      ],
      masterDataHe: [
        "Planning Level = צירוף Attributes + Root Time Profile Level.",
        "Base Planning Level של key figure = רמת-החישוב/אחסון שלו.",
      ],
      mistakesHe: [
        "Base level דק/גס מדי ל-key figure ➔ פירוק/צבירה לא-נכונים או בעיות-ביצועים.",
        "Planning Level עם Attributes לא-עקביים ➔ Activation נכשל.",
        "ערבוב Root Time Profile Levels בין מדדים שאמורים להשתלב.",
        "יצירת רמות מיותרות ➔ מודל מסורבל ואיטי.",
      ],
      troubleshootHe: [
        "key figure לא מצטבר נכון ➔ Base Planning Level שגוי או Aggregation לא-מתאים.",
        "Activation נכשל ➔ Planning Level מפנה ל-Attribute לא-קיים.",
        "ביצועים איטיים ➔ יותר מדי Storage levels או רמת-בסיס דקה מדי.",
      ],
      bestPracticeHe: [
        "הגדר מינימום Planning Levels הנדרשים — כל רמה מוסיפה עומס.",
        "קבע Base level ברזולוציה הדקה הנדרשת לתכנון, וצבור מעלה לדוחות.",
        "שמור עקביות בין Root Time Profile Levels של מדדים שמשתלבים בחישוב.",
        "תעד את התפקיד העסקי של כל Planning Level.",
      ],
      interviewHe: [
        { qHe: "מהו Planning Level?", aHe: "צירוף של Attributes ו-Root Time Profile Level המגדיר את הרזולוציה שבה key figure נשמר או מחושב." },
        { qHe: "מהו Base Planning Level של key figure?", aHe: "הרמה שבה ה-key figure מחושב/מאוחסן בפועל; ממנה הוא נצבר מעלה ומתפרק מטה." },
        { qHe: "כיצד מנהל ומתכנן רואים נתונים שונים מאותו מקור?", aHe: "ה-key figure מאוחסן ב-base level דק; צבירה אוטומטית מציגה רמת-מותג למנהל ורמת-מוצר למתכנן." },
      ],
      takeawaysHe: [
        "Planning Level = רזולוציית-הנתונים (Attributes + זמן).",
        "Base level של key figure קובע צבירה ופירוק.",
        "פחות רמות = מודל מהיר וברור יותר.",
      ],
      relatedHe: [
        { labelHe: "S&OP · מדדי-מפתח (10.4)", href: "/library/sop/chapter-10/#sub-10.4" },
        { labelHe: "S&OP · מאפיינים ונתוני-אב (10.2)", href: "/library/sop/chapter-10/#sub-10.2" },
      ],
    },
    // ============================================================ 10.4
    {
      id: "10.4", titleHe: "מדדי-מפתח", titleEn: "Key Figures",
      execHe:
        "Key Figures הם המספרים שמתכננים בפועל ב-IBP — Demand, Production, Inventory, Capacity, Revenue. כל key figure מעוגן ל-Base Planning Level, נושא כללי aggregation ו-disaggregation, וייתכן שהוא מחושב מ-key figures אחרים. הם הלב של מודל-התכנון: כל מה שרואים בדוחות, בחישובים וב-S&OP הם key figures.",
      beginnerHe:
        "Key Figure הוא 'מדד' — מספר שמתכננים או עוקבים אחריו: כמה ביקוש, כמה לייצר, כמה מלאי. כל key figure יודע באיזו רמה הוא חי (מוצר? מותג?), איך הוא מסתכם כשעולים ברמה (חיבור? ממוצע?), ואיך הוא מתפרק כשיורדים ברמה.",
      consultantHe:
        "ב-Configuration כל key figure מקבל: Base Planning Level, Aggregation Mode (SUM/AVG/MIN/MAX/LAST/...), Disaggregation Mode ו-Disaggregation Basis (Key Figure), Editable/Stored/Calculated, ו-Calculations (נוסחאות). Stored = נשמר ב-base level; Calculated = מחושב on-the-fly. Helper/Auxiliary key figures משמשים בנוסחאות. ב-S&OP מודל SAPIBP1 מספק עשרות key figures מוכנים (DEMAND, ACTUALSQTY, PRODUCTION, PROJECTEDINVENTORY). Calculations משתמשות בשפת-IBP עם פונקציות ו-@-references לרמות.",
      purposeHe:
        "לייצג את כל הגדלים הנמדדים והמתוכננים, ולחבר ביניהם בנוסחאות (Projected Inventory = Opening + Production − Demand). הם מתרגמים את מודל-הנתונים לתובנות-תכנון.",
      processExampleHe:
        "key figure CONSENSUSDEMAND נערך ב-Demand Review; PRODUCTION מתוכנן ב-Supply Review; key figure מחושב PROJECTEDINVENTORY = previous inventory + PRODUCTION − CONSENSUSDEMAND מציג את תחזית-המלאי לאורך-האופק.",
      scenarioHe:
        "בארגון key figures: CONSENSUSDEMAND (ביקוש-מוסכם למשקה), PRODUCTIONQTY (כמות-מילוי מתוכננת), PROJECTEDSTOCK (מלאי-חזוי), CAPACITYUSAGE (ניצול-קווים). PROJECTEDSTOCK מחושב מהביקוש, הייצור והמלאי-הפותח.",
      navHe: [
        "IBP Web UI ► Configuration ► Key Figures ► New ► Base Planning Level",
        "IBP Web UI ► Configuration ► Key Figures ► Aggregation / Disaggregation",
        "IBP Web UI ► Configuration ► Key Figures ► Calculations (formula editor)",
      ],
      tables: ["Key Figure (metadata)", "Planning Level", "Key Figure data (HANA)"],
      tcodes: ["IBP Web UI: Configuration", "Application Jobs (Calculation)"],
      fiori: ["Configuration", "IBP for Excel (planning view)"],
      configHe: [
        "הגדר Base Planning Level לכל key figure.",
        "קבע Aggregation Mode (SUM/AVG/MIN/MAX/LAST) ו-Disaggregation (Mode + Basis Key Figure).",
        "סמן Stored vs Calculated; Editable אם נערך ידנית בתצוגת-התכנון.",
        "כתוב Calculations בעורך-הנוסחאות לכל key figure מחושב.",
      ],
      flow: [
        { he: "Base Planning Level", code: "PL" },
        { he: "Aggregation", code: "SUM/AVG" },
        { he: "Disaggregation", code: "Basis KF" },
        { he: "Stored/Calculated", code: "type" },
        { he: "Calculation", code: "formula", note: "מוכן לתכנון" },
      ],
      masterDataHe: [
        "כל key figure = Base Level + Aggregation + Disaggregation (+ Calculation).",
        "Disaggregation Basis = key figure המשמש כמשקל-פירוק.",
      ],
      mistakesHe: [
        "Aggregation Mode שגוי (SUM למלאי שאמור להיות LAST) ➔ סיכומים שגויים.",
        "Disaggregation Basis ריק/אפס ➔ הפירוק נכשל או מתחלק שווה בטעות.",
        "Calculated במקום Stored לערך-נערך-ידנית ➔ אי-אפשר לערוך.",
        "נוסחה התלויה ב-key figure ברמה לא-תואמת ➔ שגיאת-חישוב.",
      ],
      troubleshootHe: [
        "סיכום שגוי בעלייה ברמה ➔ Aggregation Mode לא-נכון.",
        "עריכה ברמה-גסה לא יורדת לרמה-דקה ➔ Disaggregation Basis לא מוגדר.",
        "key figure מחושב מציג ריק ➔ נוסחה שגויה או key figure-קלט ריק.",
        "אי-אפשר לערוך key figure ➔ הוגדר Calculated/לא-Editable.",
      ],
      bestPracticeHe: [
        "הגדר Aggregation/Disaggregation במכוון לכל key figure — ברירת-מחדל אינה תמיד נכונה.",
        "השתמש ב-Stored לערכים-נערכים וב-Calculated לנגזרים.",
        "הסתמך על key figures מוכנים מ-SAPIBP1 כשאפשר.",
        "תעד נוסחאות-Calculation והרמות שהן מניחות.",
      ],
      interviewHe: [
        { qHe: "מהו key figure ב-IBP?", aHe: "מדד מספרי המעוגן ל-Base Planning Level, עם כללי aggregation/disaggregation, שיכול להיות מאוחסן, נערך או מחושב." },
        { qHe: "מה ההבדל בין Stored ל-Calculated key figure?", aHe: "Stored נשמר פיזית ב-base level וניתן לעריכה; Calculated מחושב on-the-fly מנוסחה ואינו נערך ישירות." },
      ],
      takeawaysHe: [
        "Key Figures = המספרים של התכנון.",
        "כל אחד נושא Base Level + Aggregation + Disaggregation.",
        "Stored לעריכה, Calculated לנגזרים.",
      ],
      relatedHe: [
        { labelHe: "S&OP · רמות תכנון (10.3)", href: "/library/sop/chapter-10/#sub-10.3" },
        { labelHe: "S&OP · אופרטורי תכנון (10.5)", href: "/library/sop/chapter-10/#sub-10.5" },
      ],
      children: [
        {
          id: "10.4.1", titleHe: "מהם מדדי-מפתח?", titleEn: "What Are Key Figures?",
          execHe: "key figure הוא היחידה הנמדדת של התכנון — מספר שחי על Planning Level וזמן, ומייצג גודל עסקי כמו ביקוש, ייצור או מלאי. כל S&OP מסתכם בעריכה ובניתוח של key figures.",
          beginnerHe: "key figure הוא 'מדד': מספר שעוקבים אחריו או מתכננים — כמה למכור, כמה לייצר, כמה מלאי. הוא תמיד קשור לרמה (מוצר/מותג) ולתקופה (חודש/שבוע).",
          consultantHe: "key figure = (value, Planning Level coordinate, time bucket). הוא נושא תכונות-מטא: Base Level, Aggregation, Disaggregation, Editable/Stored/Calculated, Unit/Currency. ב-Excel/Web UI הוא העמודה שמתכננים עליה. מבחינים בין key figures בסיסיים (input) למחושבים (output).",
          purposeHe: "לתת שם, רמה ומשמעות לכל גודל שמתכננים, כדי שאפשר יהיה לערוך, לצבור, לפרק ולחשב אותו עקבית.",
          processExampleHe: "המתכנן פותח planning view ב-Excel; העמודות הן key figures (Demand, Production, Inventory) והשורות הן צירופי Planning Level. הוא עורך Demand וה-Inventory המחושב מתעדכן.",
          scenarioHe: "בארגון המתכנן רואה key figures: ביקוש-משקה, מילוי-מתוכנן ומלאי-חזוי, ברמת מוצר×מפעל×שבוע.",
          navHe: ["IBP Web UI ► Configuration ► Key Figures (overview)", "IBP for Excel ► Planning View (key figures as columns)"],
          tables: ["Key Figure (metadata)", "Key Figure data (HANA)"],
          tcodes: ["IBP Web UI: Configuration", "IBP for Excel"],
          fiori: ["Configuration", "IBP for Excel"],
          configHe: ["כל key figure מוגדר ב-Configuration עם Base Level, Aggregation, Disaggregation וסוג (Stored/Calculated)."],
          mistakesHe: ["בלבול בין key figure בסיסי (נערך) למחושב (נגזר).", "אי-הגדרת Unit/Currency ➔ ערבוב יחידות."],
          troubleshootHe: ["key figure לא מופיע בתצוגה ➔ לא מוקצה ל-Planning View/Filter, או לא Stored ברמה."],
          bestPracticeHe: ["שמות-key-figure ברורים ועקביים.", "הבחן באופן מפורש בין input ל-output."],
          interviewHe: [{ qHe: "ממה מורכב key figure?", aHe: "ערך + קואורדינטת Planning Level + תקופת-זמן, יחד עם תכונות-מטא (Base Level, Aggregation, Disaggregation, סוג)." }],
          takeawaysHe: ["key figure = (ערך, רמה, זמן).", "תמיד קשור ל-Planning Level ולתקופה.", "input מול output."],
        },
        {
          id: "10.4.2", titleHe: "יצירת מדדי-מפתח", titleEn: "Creating Key Figures",
          execHe: "יצירת key figure כוללת הקצאת Base Planning Level, בחירת Aggregation/Disaggregation, קביעת סוג (Stored/Calculated/Editable) והגדרת יחידה. זהו הצעד שהופך ממד-נתונים למדד-תכנון פעיל.",
          beginnerHe: "כדי ליצור מדד חדש בוחרים: באיזו רמה הוא חי, איך הוא מסתכם, איך הוא מתפרק, ואם עורכים אותו ידנית או שהוא מחושב. אז הוא זמין בתצוגת-התכנון.",
          consultantHe: "ב-Configuration ► Key Figures ► New: שם, Base Planning Level, Aggregation Mode, Disaggregation Mode+Basis, Stored/Calculated/Editable, Unit of Measure/Currency Conversion. לאחר מכן Activation. אפשר לבסס על key figure קיים. Helper key figures מסומנים כ-auxiliary. עריכה ב-planning view דורשת Editable+Stored.",
          purposeHe: "להוסיף למודל מדד חדש עם כל ההתנהגויות הנכונות, כך שיתנהג נכון בצבירה, בפירוק ובחישוב.",
          processExampleHe: "יוצרים key figure 'SAFETYSTOCK': Base = Product×Location×Week, Aggregation = SUM, Disaggregation Basis = DEMAND, Stored+Editable. Activate. כעת מתכננים אותו ב-Excel.",
          scenarioHe: "בארגון יוצרים key figure PROMODEMAND (ביקוש-מבצע): Base = Product×Customer×Week, SUM, Disaggregation לפי DEMAND, Editable — לתכנון השפעת-מבצעי-קיץ.",
          navHe: ["IBP Web UI ► Configuration ► Key Figures ► New ► Base Planning Level + Aggregation + Disaggregation", "IBP Web UI ► Configuration ► Activate"],
          tables: ["Key Figure (metadata)"],
          tcodes: ["IBP Web UI: Configuration"],
          fiori: ["Configuration"],
          configHe: ["הגדר Name, Base Planning Level, Aggregation, Disaggregation (Mode+Basis), Stored/Calculated/Editable, Unit/Currency.", "Activate לאחר היצירה."],
          mistakesHe: ["Base Level שגוי ➔ צבירה/פירוק לא-נכונים.", "שכחת Disaggregation Basis ל-key figure שנערך ברמה-גסה.", "Calculated למדד שאמור להיערך."],
          troubleshootHe: ["אי-אפשר לערוך ➔ לא Editable/Stored.", "פירוק לא עובד ➔ חסר Disaggregation Basis.", "key figure לא נשמר ➔ לא Activated."],
          bestPracticeHe: ["העתק מ-key figure דומה כדי לרשת הגדרות.", "הגדר Disaggregation Basis תמיד למדד נערך-ברמה-גסה.", "Activate ובדוק בתצוגת-תכנון."],
          interviewHe: [{ qHe: "מהם הצעדים ליצירת key figure?", aHe: "הקצאת Base Planning Level, בחירת Aggregation, הגדרת Disaggregation (Mode+Basis), קביעת סוג (Stored/Calculated/Editable), יחידה, ו-Activation." }],
          takeawaysHe: ["יצירה = Base Level + Aggregation + Disaggregation + סוג.", "Editable+Stored לעריכה.", "Activate בסוף."],
        },
        {
          id: "10.4.3", titleHe: "סוגי מדדי-מפתח", titleEn: "Key Figure Types",
          execHe: "key figures מתחלקים לפי סוג: Stored (נשמר ב-base level, נערך), Calculated (מחושב on-the-fly מנוסחה), Helper/Auxiliary (עזר לנוסחאות), ו-key figures מיוחדים (Time-Period-Shift, Lag-based, Attribute-as-Key-Figure). הסוג קובע אם המדד נערך, נשמר או נגזר.",
          beginnerHe: "יש מדדים ש'מקלידים' (Stored), מדדים ש'מחושבים אוטומטית' (Calculated), ומדדי-עזר ששירותם רק לנוסחאות. הסוג קובע מה אפשר לעשות עם המדד.",
          consultantHe: "Stored key figures נשמרים ב-HANA ברמת-הבסיס וניתנים לעריכה. Calculated מחושבים מ-Calculation בזמן-ריצה (לא תופסים אחסון). Auxiliary/Helper מסומנים ככאלה ומשמשים רק בנוסחאות. סוגים מיוחדים: Time Profile attribute KF, Lag (לתחזית-מול-בפועל), Last-Period-of-Period (LPoP), Attribute Transformation. ב-S&OP נפוצים גם key figures מבוססי-Snapshot.",
          purposeHe: "לבחור את ההתנהגות הנכונה לכל מדד — נערך, נגזר או עזר — לאיזון בין גמישות, ביצועים ואחסון.",
          processExampleHe: "DEMAND = Stored (נערך). PROJECTEDINVENTORY = Calculated (נגזר). HELP_AVGDEMAND = Auxiliary (ממוצע-ביקוש לשימוש פנימי בנוסחת safety stock).",
          scenarioHe: "בארגון: CONSENSUSDEMAND = Stored; PROJECTEDSTOCK = Calculated; HELP_SEASONINDEX = Auxiliary (מקדם-עונתיות-קיץ לשימוש בנוסחאות-פירוק).",
          navHe: ["IBP Web UI ► Configuration ► Key Figures ► Type (Stored/Calculated/Auxiliary)", "IBP Web UI ► Configuration ► Key Figures ► special (Lag/Snapshot/LPoP)"],
          tables: ["Key Figure (metadata)"],
          tcodes: ["IBP Web UI: Configuration"],
          fiori: ["Configuration"],
          configHe: ["קבע סוג: Stored (נשמר/נערך), Calculated (נוסחה), Auxiliary (עזר).", "לסוגים מיוחדים: הגדר Lag / Snapshot / Last-Period-of-Period לפי הצורך."],
          mistakesHe: ["Calculated למדד-נערך ➔ אי-אפשר לערוך.", "Stored למדד-נגזר ➔ אחסון מיותר ונתונים מיושנים.", "Auxiliary שנשכח גלוי למשתמש ➔ בלבול."],
          troubleshootHe: ["אי-אפשר לערוך ➔ הסוג Calculated/Auxiliary.", "ערכים מיושנים ➔ מדד-נגזר הוגדר Stored במקום Calculated."],
          bestPracticeHe: ["Stored רק לקלט אמיתי; Calculated לכל נגזר.", "סמן key figures-עזר כ-Auxiliary והסתר מהמשתמש.", "השתמש בסוגים מיוחדים (Lag/Snapshot) לניתוחי-דיוק."],
          interviewHe: [
            { qHe: "מה ההבדל בין Stored, Calculated ו-Auxiliary?", aHe: "Stored נשמר/נערך; Calculated נגזר מנוסחה בזמן-ריצה; Auxiliary הוא מדד-עזר פנימי לנוסחאות בלבד." },
            { qHe: "מהו Snapshot key figure?", aHe: "key figure ששומר תמונת-מצב של מדד אחר בנקודת-זמן (למשל גרסת-תחזית קודמת) להשוואה ולמדידת-דיוק." },
          ],
          takeawaysHe: ["סוג = Stored / Calculated / Auxiliary (+ מיוחדים).", "הסוג קובע עריכה/אחסון/נגזרות.", "Stored לקלט, Calculated לנגזר."],
        },
        {
          id: "10.4.4", titleHe: "צבירת מדדי-מפתח", titleEn: "Key Figure Aggregations",
          execHe: "Aggregation קובע כיצד ערכי key figure מתקבצים כשעולים ברמה — לאורך Attributes (מוצר←מותג) ולאורך-זמן (שבוע←חודש). מצבים נפוצים: SUM, AVG, MIN, MAX, LAST. בחירה שגויה מובילה לסיכומים חסרי-משמעות (סכימת מלאי לאורך-זמן).",
          beginnerHe: "כשעולים מרמה-מפורטת לרמה-מסכמת, צריך לדעת איך לחבר את המספרים: לחבר (כמויות), לממצע (אחוזים), או לקחת את האחרון (מלאי בסוף-תקופה). זה ה-Aggregation.",
          consultantHe: "Aggregation מוגדר לכל key figure בנפרד עבור Attribute aggregation ו-Time aggregation. מצבים: SUM, AVG, MIN, MAX, LAST, FIRST, COUNT, NONE. מדדי-זרימה (Demand/Production) = SUM; מדדי-מלאי (Inventory) = LAST בזמן ו-SUM ב-Attributes; אחוזים/מחירים = AVG (לרוב ממוצע-משוקלל דרך calculation). Aggregation שגוי הוא תקלת-S&OP קלאסית. ניתן להגדיר Aggregation שונה לזמן מול Attributes.",
          purposeHe: "להבטיח שסיכומי-רמה משמעותיים — שכמויות מסתכמות, שמלאי-סוף-תקופה לא 'מתחבר', ושאחוזים ממוצעים נכון.",
          processExampleHe: "DEMAND ברמת-מוצר נצבר ב-SUM למותג ולרבעון. INVENTORY נצבר ב-SUM בין מיקומים אך ב-LAST לאורך-זמן (מלאי-סוף-חודש, לא סכום-שבועות).",
          scenarioHe: "בארגון: PRODUCTIONQTY ו-CONSENSUSDEMAND = SUM (זרימה); PROJECTEDSTOCK = LAST בזמן (מלאי-סוף-תקופה) ו-SUM בין-מפעלים; FILLRATE% = AVG משוקלל.",
          navHe: ["IBP Web UI ► Configuration ► Key Figures ► Aggregation ► Attribute / Time Aggregation Mode"],
          tables: ["Key Figure (metadata)"],
          tcodes: ["IBP Web UI: Configuration"],
          fiori: ["Configuration"],
          configHe: ["קבע Aggregation Mode ל-Attributes ול-Time בנפרד: SUM/AVG/MIN/MAX/LAST/FIRST.", "מדדי-זרימה=SUM; מדדי-מלאי=LAST בזמן; אחוזים=AVG/calculation."],
          mistakesHe: ["SUM למלאי לאורך-זמן ➔ סכום חסר-משמעות.", "SUM לאחוזים ➔ אחוז מעל 100%.", "AVG לכמויות ➔ סיכום שגוי כלפי-מטה."],
          troubleshootHe: ["מלאי 'מתנפח' ברמת-רבעון ➔ Time Aggregation הוא SUM במקום LAST.", "אחוז שגוי בסיכום ➔ נדרש ממוצע-משוקלל דרך calculation."],
          bestPracticeHe: ["SUM לזרימות, LAST למלאים, AVG/calculation לאחוזים ומחירים.", "הגדר Time ו-Attribute aggregation בנפרד ובמכוון.", "בדוק סיכומי-רמה מול חישוב-ידני."],
          interviewHe: [
            { qHe: "כיצד מצברים מדד-מלאי לאורך-זמן?", aHe: "ב-LAST (מלאי-סוף-תקופה) ולא ב-SUM, כדי לא לחבר יתרות בין שבועות." },
            { qHe: "כיצד מטפלים באחוזים בצבירה?", aHe: "לרוב כממוצע-משוקלל דרך calculation, לא ב-SUM, כדי שלא יחרוג מ-100%." },
          ],
          takeawaysHe: ["Aggregation = איך מסכמים בעלייה ברמה.", "זרימה=SUM, מלאי=LAST, אחוז=AVG.", "הגדר זמן ו-Attributes בנפרד."],
        },
        {
          id: "10.4.5", titleHe: "פירוק (Disaggregation)", titleEn: "Disaggregation",
          execHe: "Disaggregation הוא ההפך מצבירה: כשעורכים key figure ברמה-גסה (מותג/רבעון), הערך יורד אוטומטית לרמה-הדקה (מוצר/שבוע) לפי משקל — לרוב Disaggregation Basis (key figure אחר) או חלוקה-שווה. זהו המנגנון המאפשר תכנון top-down.",
          beginnerHe: "אם מנהל מזין 'מותג X = 10,000 יח' ברבעון', SAP צריך לדעת איך לחלק את זה בין המוצרים והשבועות. הפירוק משתמש במשקל (למשל הביקוש-ההיסטורי) כדי לחלק נכון.",
          consultantHe: "Disaggregation Mode: Equally (שווה), By Reference Key Figure (Disaggregation Basis), By Attribute Weight. ה-Basis key figure מספק את פרופיל-החלוקה (למשל DEMAND ההיסטורי). אם ה-Basis אפס/ריק — הפירוק נכשל או נופל לחלוקה-שווה. בעריכה top-down ב-planning view, IBP מפרק בזמן-אמת. Disaggregation שגוי הוא תקלה נפוצה — תמיד הגדר Basis למדד שנערך ברמה-גסה.",
          purposeHe: "לאפשר תכנון top-down — עריכה ברמת-סיכום עם פירוק-חכם לרמת-הביצוע — בלי שהמתכנן יזין כל תא בנפרד.",
          processExampleHe: "מנהל-ביקוש מזין יעד-מותג רבעוני; IBP מפרק לפי פרופיל ה-DEMAND ההיסטורי לכל מוצר ולכל שבוע, ושומר ב-base level. שינוי ביעד מתחלק-מחדש אוטומטית.",
          scenarioHe: "בארגון תכנית-מכירות ברמת-מותג רבעונית מתפרקת לרמת-מוצר×שבוע לפי פרופיל-עונתיות-קיץ (Disaggregation Basis = ביקוש-אשתקד), כך שיולי מקבל יותר מנובמבר.",
          navHe: ["IBP Web UI ► Configuration ► Key Figures ► Disaggregation ► Mode + Disaggregation Basis Key Figure"],
          tables: ["Key Figure (metadata)"],
          tcodes: ["IBP Web UI: Configuration", "IBP for Excel (top-down edit)"],
          fiori: ["Configuration", "IBP for Excel"],
          configHe: ["קבע Disaggregation Mode: Equally / By Reference Key Figure / By Attribute Weight.", "הקצה Disaggregation Basis Key Figure (פרופיל-המשקל) למדדים שנערכים ברמה-גסה."],
          mistakesHe: ["Disaggregation Basis ריק/אפס ➔ הפירוק נופל לחלוקה-שווה או נכשל.", "חלוקה-שווה כשנדרש משקל-עונתי ➔ פירוק לא-ריאלי.", "עריכה ברמה-גסה בלי Basis מוגדר."],
          troubleshootHe: ["עריכה top-down לא יורדת לרמה-דקה ➔ Disaggregation Mode/Basis לא מוגדר.", "הפירוק מתחלק שווה במקום לפי-משקל ➔ ה-Basis key figure ריק.", "ערכים שליליים אחרי פירוק ➔ Basis עם ערכים שליליים."],
          bestPracticeHe: ["הגדר Disaggregation Basis תמיד למדד-נערך-ברמה-גסה.", "השתמש בפרופיל-ביקוש היסטורי כ-Basis לפירוק עונתי.", "ודא שה-Basis אינו אפס/ריק לפני תכנון top-down."],
          interviewHe: [
            { qHe: "מהו Disaggregation Basis?", aHe: "key figure המשמש כפרופיל-משקל לפירוק ערך מרמה-גסה לרמה-דקה (למשל ביקוש-היסטורי לפירוק יעד-מותג למוצרים)." },
            { qHe: "מה קורה אם ה-Disaggregation Basis ריק?", aHe: "הפירוק נכשל או נופל לחלוקה-שווה (Equally), מה שעלול לתת תוצאות לא-ריאליות." },
          ],
          takeawaysHe: ["Disaggregation = פירוק top-down מרמה-גסה לדקה.", "Disaggregation Basis = פרופיל-המשקל.", "Basis ריק = פירוק שגוי."],
        },
        {
          id: "10.4.6", titleHe: "חישובי מדדי-מפתח", titleEn: "Key Figure Calculations",
          execHe: "Calculations הן נוסחאות המגדירות key figures מחושבים מתוך key figures אחרים (PROJECTEDINVENTORY = previous + PRODUCTION − DEMAND). הן כתובות בשפת-IBP עם פונקציות, references לרמות ולתקופות, ותנאים. הן הופכות נתונים-גולמיים לתובנות-תכנון.",
          beginnerHe: "Calculation היא 'נוסחה' שמחשבת מדד אחד מתוך אחרים — בדיוק כמו נוסחה ב-Excel. למשל: מלאי-חזוי = מלאי-קודם + ייצור − ביקוש. SAP מחשבת זאת אוטומטית בכל תא.",
          consultantHe: "ב-Configuration ► Calculations כותבים נוסחה לכל key figure מחושב בשפת-IBP. אלמנטים: arithmetic, פונקציות (IF, ROUND, MAX), aggregation-references (@), time-shift (לחישוב על תקופה-קודמת), ו-cross-level references. ה-Calculation Level חשוב — הנוסחה רצה ברמה מסוימת. סדר-החישוב נקבע מהתלויות. נוסחאות מורכבות משתמשות ב-Helper/Auxiliary key figures. שגיאות-רמה (mismatched Planning Levels) הן מקור-תקלות נפוץ.",
          purposeHe: "לקשר key figures בלוגיקה-עסקית — מאזני-מלאי, ניצול-קיבולת, תחזית-מול-בפועל — בלי הזנה-ידנית של הנגזרות.",
          processExampleHe: "PROJECTEDINVENTORY מוגדר: prevperiod(PROJECTEDINVENTORY) + PRODUCTION − CONSENSUSDEMAND. בכל תקופה הנוסחה גוללת את יתרת-המלאי קדימה לאורך-האופק.",
          scenarioHe: "בארגון: PROJECTEDSTOCK = prevperiod(PROJECTEDSTOCK) + PRODUCTIONQTY − CONSENSUSDEMAND; CAPACITYUSAGE% = PRODUCTIONQTY / LINECAPACITY. כך רואים מתי מפעל יחרוג מקיבולת-קווי-המילוי בקיץ.",
          navHe: ["IBP Web UI ► Configuration ► Calculations ► select Key Figure ► formula editor", "IBP Web UI ► Configuration ► Calculations ► set Calculation Level"],
          tables: ["Key Figure (metadata)", "Calculation (formula)"],
          tcodes: ["IBP Web UI: Configuration", "Application Jobs"],
          fiori: ["Configuration"],
          configHe: ["כתוב נוסחה לכל key figure מחושב (arithmetic, IF, MAX, ROUND).", "השתמש ב-time-shift (prevperiod) לחישובי-מאזן מתגלגלים.", "ודא Calculation Level תואם את רמות ה-key figures בנוסחה."],
          mistakesHe: ["נוסחה התלויה ב-key figures ברמות לא-תואמות ➔ שגיאת-חישוב.", "חלוקה באפס (קיבולת=0) ➔ ערך ריק/שגיאה.", "מעגל-תלות בין key figures מחושבים."],
          troubleshootHe: ["key figure מחושב ריק ➔ קלט ריק או רמות לא-תואמות.", "מלאי-מתגלגל לא נכון ➔ prevperiod/time-shift שגוי.", "שגיאת-Activation ➔ נוסחה מפנה ל-key figure/רמה לא-קיימים."],
          bestPracticeHe: ["שמור נוסחאות פשוטות; פרק מורכבות ל-Auxiliary key figures.", "טפל בחלוקה-באפס עם IF.", "תעד את ההנחה-הרמתית של כל נוסחה.", "השתמש בנוסחאות-המוכנות מ-SAPIBP1 כבסיס."],
          interviewHe: [
            { qHe: "מהי Calculation ב-IBP?", aHe: "נוסחה המגדירה key figure מחושב מתוך key figures אחרים, בשפת-IBP, עם arithmetic, פונקציות, time-shift ו-references לרמות." },
            { qHe: "כיצד מחשבים מלאי-חזוי מתגלגל?", aHe: "באמצעות time-shift: PROJECTEDINVENTORY = prevperiod(PROJECTEDINVENTORY) + PRODUCTION − DEMAND, כך שהיתרה נגללת קדימה." },
          ],
          takeawaysHe: ["Calculations = נוסחאות ה-key figures.", "time-shift (prevperiod) למאזנים מתגלגלים.", "התאם רמות ופרק מורכבות ל-Auxiliary."],
          relatedHe: [{ labelHe: "S&OP · צבירה ופירוק (10.4.4–10.4.5)", href: "/library/sop/chapter-10/#sub-10.4.4" }],
        },
      ],
    },
    // ============================================================ 10.5
    {
      id: "10.5", titleHe: "אופרטורי תכנון", titleEn: "Planning Operators",
      execHe:
        "Planning Operators הם פעולות-מערכת המבצעות משימות על נתוני-התכנון: העתקה (Copy Operator), פירוק/צבירה, מחיקה, snapshot וניהול-מחזור-חיים של נתונים. הם מורצים כ-Application Jobs (אד-הוק או מתוזמן) ומניעים את תהליך-ה-S&OP — למשל העתקת 'תחזית' ל'בסיס-תכנון' בתחילת מחזור.",
      beginnerHe:
        "Planning Operator הוא 'פעולה אוטומטית' שמפעילים על הנתונים — להעתיק מדד אחד לאחר, לאפס נתונים ישנים, או לשמור תמונת-מצב. במקום לעשות זאת ידנית, מגדירים אופרטור ומריצים אותו (פעם אחת או לפי לוח-זמנים).",
      consultantHe:
        "ב-Configuration ► Operators מגדירים Planning Operators ומריצים אותם דרך Application Jobs. סוגים נפוצים: Copy Operator (העתקת key figure←key figure עם פילטרים ו-offset-זמן), Disaggregation/Aggregation, Snapshot, ו-Data Lifecycle (Purge/Archive/Time-shift). כל אופרטור נושא פרופיל (source/target key figures, Planning Level, time-range, version/scenario). מתזמנים דרך Application Jobs עם Recurrence. אופרטורים הם הבסיס לאוטומציה של מחזור-ה-S&OP החודשי.",
      purposeHe:
        "לאוטמט את הפעולות החוזרות של מחזור-התכנון — אתחול-בסיס, העתקת-גרסאות, ניקוי-נתונים — בעקביות ובלי טעויות-אנוש.",
      processExampleHe:
        "בתחילת מחזור-S&OP חודשי רץ Copy Operator שמעתיק את STATISTICALFORECAST ל-DEMANDPLANNING כנקודת-מוצא; אז המתכננים עורכים. בסוף-המחזור רץ Snapshot ששומר את הגרסה-המאושרת.",
      scenarioHe:
        "בארגון מתוזמן Copy Operator חודשי שמעתיק את תחזית-המכירות הסטטיסטית לתכנית-הביקוש, ו-Copy נוסף שמעתיק את התכנית-המאושרת לתכנית-הייצור — בסיס לתכנון-קווי-המילוי.",
      navHe: [
        "IBP Web UI ► Configuration ► Operators ► New ► Copy / Disaggregation / Snapshot",
        "IBP Web UI ► Application Jobs ► Schedule ► select Operator + Recurrence",
        "IBP Web UI ► Configuration ► Operators ► define source/target Key Figures + filters",
      ],
      tables: ["Operator (metadata)", "Application Job", "Key Figure data"],
      tcodes: ["IBP Web UI: Configuration", "Application Jobs", "Manage Application Jobs"],
      fiori: ["Configuration", "Application Jobs"],
      configHe: [
        "הגדר Operator (Copy/Disaggregation/Snapshot/Data Lifecycle) עם source/target key figures.",
        "קבע Planning Level, פילטרים (Attributes/Version/Scenario) וטווח-זמן/offset.",
        "הרץ אד-הוק או תזמן דרך Application Jobs עם Recurrence (חודשי/שבועי).",
        "עקוב אחר ביצוע ולוגים ב-Manage Application Jobs.",
      ],
      flow: [
        { he: "הגדרת Operator", code: "Copy/Snapshot" },
        { he: "source←target", code: "KF←KF", note: "+filters" },
        { he: "Planning Level + time", code: "scope" },
        { he: "Application Job", code: "run/schedule" },
        { he: "מעקב + לוג", code: "Manage Jobs" },
      ],
      masterDataHe: [
        "Operator = פרופיל-פעולה (source/target KF, level, filters, time).",
        "Application Job = הרצה (אד-הוק/מתוזמן) של אופרטור.",
      ],
      mistakesHe: [
        "Copy עם פילטר רחב מדי ➔ דריסת-נתונים לא-מכוונת.",
        "Operator ללא Version/Scenario filter ➔ עדכון הגרסה הלא-נכונה.",
        "תזמון חופף לטעינת-נתונים ➔ תוצאות לא-עקביות.",
        "אי-מעקב אחר לוג-הריצה ➔ כשלים שקטים.",
      ],
      troubleshootHe: [
        "ה-Copy לא העתיק ➔ פילטר/טווח-זמן לא תואם נתונים, או source ריק.",
        "נתונים נדרסו ➔ פילטר רחב מדי או target שגוי.",
        "ה-Job נכשל ➔ בדוק לוג ב-Manage Application Jobs (רמות לא-תואמות, הרשאות).",
      ],
      bestPracticeHe: [
        "צמצם פילטרים תמיד ל-scope המכוון (Version/Scenario/Attributes).",
        "תזמן אופרטורים בחלונות-זמן שאינם מתנגשים עם טעינות.",
        "בדוק כל אופרטור-חדש אד-הוק לפני תזמון.",
        "עקוב אחר לוגים ב-Manage Application Jobs לאחר כל ריצה.",
      ],
      interviewHe: [
        { qHe: "מהו Planning Operator?", aHe: "פעולת-מערכת (Copy/Disaggregation/Snapshot/Lifecycle) המורצת כ-Application Job ומבצעת משימה אוטומטית על נתוני-התכנון." },
        { qHe: "כיצד מתזמנים אופרטור?", aHe: "דרך Application Jobs עם Recurrence (חודשי/שבועי), עם מעקב ב-Manage Application Jobs." },
      ],
      takeawaysHe: [
        "Operators מאוטמטים פעולות-תכנון חוזרות.",
        "Copy/Snapshot/Lifecycle מורצים כ-Application Jobs.",
        "צמצם פילטרים ועקוב אחר לוגים.",
      ],
      relatedHe: [
        { labelHe: "S&OP · מדדי-מפתח (10.4)", href: "/library/sop/chapter-10/#sub-10.4" },
      ],
      children: [
        {
          id: "10.5.1", titleHe: "יצירת Copy Operator", titleEn: "Creating a Copy Operator",
          execHe: "Copy Operator מעתיק ערכים מ-key figure מקור ל-key figure יעד, עם פילטרים, scope ו-offset-זמן אופציונלי. זהו האופרטור הנפוץ ביותר ב-S&OP — לאתחול-בסיס, גיבוי-גרסאות והעברה בין שלבי-המחזור.",
          beginnerHe: "Copy Operator הוא 'העתק-הדבק אוטומטי' בין שני מדדים: למשל להעתיק את התחזית הסטטיסטית לתוך תכנית-הביקוש כדי שיהיה ממה להתחיל. מגדירים מקור, יעד, ומה להעתיק.",
          consultantHe: "ב-Configuration ► Operators ► Copy: בוחרים Source Key Figure ו-Target Key Figure (חייבים להיות תואמי-רמה או עם המרה), Planning Level, פילטרים (Attributes/Version/Scenario), Time Range ו-Time Offset (להעתקה מתקופה-לתקופה). אפשר Add/Overwrite. מריצים אד-הוק או מתזמנים. שגיאה נפוצה: target ברמה לא-תואמת או פילטר חסר שמוביל לדריסה.",
          purposeHe: "להעביר נתונים בין שלבי-מחזור או גרסאות אוטומטית — אתחול, גיבוי, השוואת-תרחישים — בלי הזנה-ידנית.",
          processExampleHe: "Copy Operator: Source=STATISTICALFORECAST, Target=DEMANDPLANNINGQTY, Level=Product×Customer×Week, Mode=Overwrite. רץ בתחילת-מחזור ומאתחל את תכנית-הביקוש מהתחזית הסטטיסטית.",
          scenarioHe: "בארגון Copy Operator מעתיק CONSENSUSDEMAND (מאושר) ל-PRODUCTIONDEMAND כדי להתניע את תכנון-הייצור על קווי-המילוי, מסונן ל-Version 'Active'.",
          navHe: ["IBP Web UI ► Configuration ► Operators ► New ► Copy Operator", "IBP Web UI ► Operators ► Copy ► Source/Target Key Figure + filters + Time Offset", "IBP Web UI ► Application Jobs ► run/schedule the Copy Operator"],
          tables: ["Operator (Copy)", "Application Job"],
          tcodes: ["IBP Web UI: Configuration", "Application Jobs"],
          fiori: ["Configuration", "Application Jobs"],
          configHe: ["בחר Source ו-Target Key Figure (תואמי-רמה).", "קבע Planning Level, פילטרים (Version/Scenario/Attributes), Time Range/Offset, ו-Add/Overwrite.", "הרץ אד-הוק לבדיקה ואז תזמן ב-Application Jobs."],
          mistakesHe: ["Target ברמה לא-תואמת ➔ כשל-העתקה.", "פילטר חסר ➔ דריסת-נתונים רחבה מדי.", "Time Offset שגוי ➔ העתקה לתקופה הלא-נכונה."],
          troubleshootHe: ["לא הועתק כלום ➔ source ריק או פילטר/טווח לא-תואם.", "נדרסו נתונים ➔ Overwrite עם פילטר רחב.", "כשל-Job ➔ רמות source/target לא-תואמות."],
          bestPracticeHe: ["בדוק אד-הוק על scope קטן לפני תזמון.", "השתמש ב-Version/Scenario filter תמיד.", "בחר Add מול Overwrite במכוון."],
          interviewHe: [
            { qHe: "מה עושה Copy Operator?", aHe: "מעתיק ערכים מ-key figure מקור ל-key figure יעד, עם פילטרים, scope ו-offset-זמן — לאתחול-בסיס או העברה בין שלבי-מחזור." },
            { qHe: "מהו Time Offset ב-Copy?", aHe: "היסט-תקופה המאפשר העתקה מתקופה אחת לאחרת (למשל מ-actuals של חודש-קודם לבסיס-החודש-הנוכחי)." },
          ],
          takeawaysHe: ["Copy Operator = העתקה אוטומטית בין key figures.", "פילטרים + Time Offset + Add/Overwrite.", "בדוק אד-הוק לפני תזמון."],
          relatedHe: [{ labelHe: "S&OP · ניהול מחזור-חיי-נתונים (10.5.2)", href: "/library/sop/chapter-10/#sub-10.5.2" }],
        },
        {
          id: "10.5.2", titleHe: "ניהול מחזור-חיי נתונים", titleEn: "Data Lifecycle Management",
          execHe: "Data Lifecycle Management הוא אוסף אופרטורים לניהול נתוני-תכנון לאורך-זמן: מחיקה/ניקוי (Purge) של נתונים מיושנים, Time-shift (גלילת-אופק), Archiving, ו-Snapshots. הוא שומר על המערכת רזה, מהירה ועקבית לאורך מחזורי-S&OP חוזרים.",
          beginnerHe: "עם הזמן מצטברים נתונים ישנים שמאטים את המערכת. ניהול-מחזור-חיים הוא 'תחזוקת-נתונים אוטומטית' — מנקה ישן, מגלגל את אופק-התכנון קדימה, ושומר תמונות-מצב היסטוריות.",
          consultantHe: "אופרטורים: Purge/Delete Key Figure Data (לפי פילטר/טווח), Time-shift (העברת נתונים בין תקופות בתחילת מחזור), Snapshot (שמירת גרסה לניתוח-דיוק/Lag), ו-housekeeping של Versions/Scenarios ישנים. מתוזמנים כ-Application Jobs. ב-S&OP חודשי נפוץ time-shift חודשי שמגלגל את האופק. ניקוי-נתונים משפר ביצועי-HANA ועלות-אחסון. יש להיזהר ממחיקה לא-הפיכה — תמיד עם פילטר מדויק וגיבוי.",
          purposeHe: "לשמור על מודל רזה ומהיר, לגלגל את אופק-התכנון אוטומטית, ולשמר היסטוריה למדידת-דיוק — לאורך מחזורי-תכנון חוזרים.",
          processExampleHe: "בתחילת כל חודש רץ Time-shift המגלגל את אופק-התכנון חודש קדימה; Purge מוחק נתוני-תכנון בני 24 חודשים-ויותר; Snapshot שומר את גרסת-התחזית למדידת-Forecast-Accuracy.",
          scenarioHe: "בארגון time-shift חודשי מגלגל את אופק-תכנון-המשקאות; Snapshot שומר את תחזית-הקיץ למדידת-דיוק מול-בפועל בסוף-העונה; Purge מנקה תרחישי-תכנון ישנים.",
          navHe: ["IBP Web UI ► Configuration ► Operators ► New ► Purge / Time-shift / Snapshot", "IBP Web UI ► Application Jobs ► schedule lifecycle operators (Recurrence)", "IBP Web UI ► Manage Application Jobs ► monitor lifecycle runs"],
          tables: ["Operator (Lifecycle)", "Application Job", "Snapshot Key Figure"],
          tcodes: ["IBP Web UI: Configuration", "Application Jobs", "Manage Application Jobs"],
          fiori: ["Configuration", "Application Jobs"],
          configHe: ["הגדר אופרטורי Purge/Time-shift/Snapshot עם פילטר וטווח מדויקים.", "תזמן כ-Application Jobs עם Recurrence (חודשי) בחלון שאינו מתנגש עם טעינות.", "שמור Snapshots למדידת Forecast Accuracy/Lag."],
          mistakesHe: ["Purge עם פילטר רחב מדי ➔ מחיקת-נתונים נדרשים (לא-הפיך).", "אי-גלילת-אופק ➔ אופק-תכנון מתכווץ עם הזמן.", "תזמון lifecycle בזמן-טעינה ➔ אי-עקביות."],
          troubleshootHe: ["נתונים נמחקו בטעות ➔ פילטר-Purge רחב; שחזר מגיבוי/Snapshot.", "אופק לא מתגלגל ➔ Time-shift לא מתוזמן.", "Snapshot חסר ➔ ה-Job לא רץ; בדוק Manage Application Jobs."],
          bestPracticeHe: ["Purge תמיד עם פילטר מדויק וגיבוי/Snapshot קודם.", "תזמן time-shift חודשי לגלילת-אופק.", "שמור Snapshots קבועים למדידת-דיוק.", "תזמן lifecycle בחלונות שקטים ועקוב אחר לוגים."],
          interviewHe: [
            { qHe: "מהו Data Lifecycle Management ב-IBP?", aHe: "אוסף אופרטורים (Purge, Time-shift, Snapshot, Archiving) לניהול נתוני-תכנון לאורך-זמן — ניקוי-ישן, גלילת-אופק ושימור-היסטוריה." },
            { qHe: "מדוע משתמשים ב-Time-shift?", aHe: "כדי לגלגל את אופק-התכנון קדימה בתחילת כל מחזור, כך שהאופק נשמר קבוע ולא מתכווץ עם הזמן." },
          ],
          takeawaysHe: ["Lifecycle = ניקוי, גלילת-אופק ו-Snapshots.", "Time-shift מגלגל את האופק; Snapshot שומר היסטוריה.", "Purge תמיד עם פילטר מדויק וגיבוי."],
          relatedHe: [{ labelHe: "S&OP · יצירת Copy Operator (10.5.1)", href: "/library/sop/chapter-10/#sub-10.5.1" }],
        },
      ],
    },
    // ============================================================ 10.6
    {
      id: "10.6", titleHe: "דוח היסטוריה", titleEn: "History Report",
      execHe:
        "ה-History Report ב-IBP מתעד את שינויי-הקונפיגורציה ב-Planning Area — מה שונה, מתי ועל-ידי מי. הוא כלי-הביקורת והשחזור של מודל-התכנון: מאפשר לעקוב אחר Activations, שינויי key figures/levels, ולחקור 'מה השתנה' כשמשהו נשבר.",
      beginnerHe:
        "ה-History Report הוא 'יומן-שינויים' של ההגדרות. כל פעם שמישהו משנה את המודל — מוסיף key figure, משנה רמה, מפעיל Activation — זה נרשם. כשמשהו מפסיק לעבוד, מסתכלים ביומן כדי לראות מה השתנה ומתי.",
      consultantHe:
        "ה-History/Change Report נגיש דרך Configuration ודרך Application Logs. הוא מתעד שינויי-מטא (key figures, Planning Levels, Calculations, Time Profile, Operators), חותמת-זמן ומשתמש, ותוצאות-Activation. בשילוב Planning Area Versions אפשר להשוות גרסת-עבודה לפעילה. כלי קריטי ל-change management, audit ו-root-cause. לוגים נוספים: Application Jobs logs לפעולות-אופרטורים, ו-Data Integration logs לטעינות.",
      purposeHe:
        "לספק שקיפות, ביקורת ויכולת-שחזור על שינויי-המודל — לתמוך ב-change management ובאיתור-שורש כשתוצאות-תכנון משתנות במפתיע.",
      processExampleHe:
        "תחזית-מלאי 'נשברה' פתאום; הצוות פותח את ה-History Report, רואה ש-Aggregation של key figure שונה ל-SUM אתמול על-ידי משתמש מסוים, ומשחזר ל-LAST.",
      scenarioHe:
        "בארגון לאחר ש-PROJECTEDSTOCK הציג מספרים חריגים, ה-History Report חשף ששונה ה-Disaggregation Basis של CONSENSUSDEMAND; השינוי בוטל והמספרים חזרו לקדמותם.",
      navHe: [
        "IBP Web UI ► Configuration ► <Planning Area> ► History / Change Log",
        "IBP Web UI ► Application Logs ► filter by object / user / date",
        "IBP Web UI ► Configuration ► Planning Area Versions ► compare working vs active",
      ],
      tables: ["Change Log (metadata)", "Application Log", "Planning Area Version"],
      tcodes: ["IBP Web UI: Configuration", "Application Logs", "Manage Application Jobs"],
      fiori: ["Configuration", "Application Logs"],
      configHe: [
        "פתח את ה-History/Change Log של ה-Planning Area לצפייה בשינויי-מטא עם חותמת-זמן ומשתמש.",
        "השתמש ב-Application Logs לסינון לפי אובייקט/משתמש/תאריך.",
        "השווה Planning Area Versions (working מול active) לאיתור הפרשי-הגדרה.",
      ],
      flow: [
        { he: "אירוע-תקלה", code: "תוצאה חריגה" },
        { he: "פתיחת History Report", code: "Change Log" },
        { he: "סינון לפי אובייקט/משתמש/תאריך", code: "filter" },
        { he: "זיהוי השינוי", code: "root cause" },
        { he: "שחזור/תיקון", code: "revert" },
      ],
      masterDataHe: [
        "Change Log = יומן שינויי-קונפיגורציה (מה/מתי/מי).",
        "Application Logs = לוגי-ביצוע לאופרטורים ולטעינות.",
      ],
      mistakesHe: [
        "התעלמות מה-History Report בעת תקלה ➔ בזבוז-זמן באיתור-שורש.",
        "שינויי-קונפיגורציה ישירות ב-Production בלי תיעוד/אישור.",
        "אי-שימוש ב-Planning Area Versions להשוואה.",
      ],
      troubleshootHe: [
        "תוצאות-תכנון השתנו במפתיע ➔ בדוק History Report לשינוי-מטא אחרון.",
        "אופרטור נתן תוצאה לא-צפויה ➔ בדוק Application Logs של ה-Job.",
        "אי-בהירות מי שינה ➔ סנן Change Log לפי משתמש/תאריך.",
      ],
      bestPracticeHe: [
        "בדוק את ה-History Report ראשון בכל חקירת-תקלה.",
        "נהל שינויי-קונפיגורציה דרך Versions ותהליך-אישור.",
        "תעד שינויים מהותיים גם מחוץ למערכת (change record).",
      ],
      interviewHe: [
        { qHe: "למה משמש ה-History Report ב-IBP?", aHe: "לתיעוד שינויי-קונפיגורציה (מה/מתי/מי) ב-Planning Area — לביקורת, change management ואיתור-שורש כשתוצאות משתנות." },
        { qHe: "כיצד מאתרים מה שבר תוצאת-תכנון?", aHe: "פותחים את ה-History/Change Log, מסננים לפי תאריך/אובייקט, ומזהים את שינוי-המטא האחרון (למשל Aggregation/Disaggregation שהשתנה)." },
      ],
      takeawaysHe: [
        "History Report = יומן-שינויי-הקונפיגורציה.",
        "כלי-המפתח לביקורת ולאיתור-שורש.",
        "בדוק אותו ראשון בכל תקלה.",
      ],
      relatedHe: [
        { labelHe: "S&OP · אזורי תכנון (10.1.1)", href: "/library/sop/chapter-10/#sub-10.1.1" },
        { labelHe: "S&OP · אופרטורי תכנון (10.5)", href: "/library/sop/chapter-10/#sub-10.5" },
      ],
    },
    // ============================================================ 10.7
    {
      id: "10.7", titleHe: "קונפיגורציה מתקדמת", titleEn: "Advanced Configuration",
      execHe:
        "קונפיגורציה מתקדמת ב-IBP כוללת יכולות מעבר לבסיס: Versions ו-Scenarios לתכנון-תרחישים, Attribute Transformation (קישור Planning Levels שונים), Local Members, External/Virtual Master Data Types, Calculated Attributes ו-Helper key figures מורכבים. אלה מאפשרים מודלים גמישים יותר — אך מוסיפים מורכבות ועלות-תחזוקה.",
      beginnerHe:
        "אחרי שמבינים את הבסיס, IBP מציע כלים מתקדמים: 'תרחישים' (Scenarios) להשוואת 'מה-אם', 'גרסאות' (Versions) לשמירת תכניות חלופיות, וקישורים חכמים בין רמות-נתונים שונות. הם נותנים גמישות אך דורשים ידע וזהירות.",
      consultantHe:
        "כלים מתקדמים: Versions (תכניות-מקבילות עם key figures נבחרים), Scenarios (סטיות 'מה-אם' מעל הגרסה-הפעילה), Attribute Transformation (מיפוי בין Planning Levels לחישובים cross-level), Local Members ב-Excel, External/Virtual Master Data Types, Calculated Attributes, ו-Snapshot/Lag key figures. שילובם דורש הבנת-ביצועים: cross-level calculations ו-non-base aggregations יקרים. ב-S&OP נפוצים Scenarios ל-Supply/Demand balancing ו-Versions לתכנית-בסיס מול תרחיש-אופטימי/פסימי.",
      purposeHe:
        "לתמוך בתכנון-תרחישים, השוואת-גרסאות וקישורי-נתונים מורכבים — להעמיק את יכולת-ה-S&OP מעבר לתכנון-בסיסי — תוך ניהול-מודע של מורכבות וביצועים.",
      processExampleHe:
        "ב-Supply Review יוצרים Scenario 'High-Demand' המעלה את הביקוש ב-15%, מריצים בו את חישובי-המלאי-החזוי, ומשווים מול הגרסה-הפעילה — בלי לפגוע בתכנית-הבסיס.",
      scenarioHe:
        "בארגון יוצרים Scenario 'Heatwave' המגדיל ביקוש-קיץ ב-20%, ובוחנים אם קווי-המילוי עומדים בקיבולת; Version 'Budget' שומרת את התכנית-המאושרת מול תרחישי-העבודה.",
      navHe: [
        "IBP Web UI ► Configuration ► Versions ► New (select Key Figures)",
        "IBP for Excel ► Scenarios ► Create Scenario (what-if over active version)",
        "IBP Web UI ► Configuration ► Attribute Transformation / Calculated Attributes",
      ],
      tables: ["Version", "Scenario", "Attribute Transformation", "Master Data Type (External)"],
      tcodes: ["IBP Web UI: Configuration", "IBP for Excel", "Application Jobs"],
      fiori: ["Configuration", "IBP for Excel"],
      configHe: [
        "Versions: צור גרסאות-מקבילות עם key figures נבחרים לתכניות-חלופיות.",
        "Scenarios: צור סטיות 'מה-אם' מעל הגרסה-הפעילה (ב-Excel/Web UI).",
        "Attribute Transformation: מַפֵּה בין Planning Levels לחישובים cross-level.",
        "External/Virtual Master Data Types ו-Calculated Attributes למודלים מתקדמים.",
      ],
      flow: [
        { he: "תכנית-בסיס", code: "Active Version" },
        { he: "יצירת Scenario", code: "what-if" },
        { he: "שינוי הנחות", code: "+15% demand" },
        { he: "חישוב + השוואה", code: "compare" },
        { he: "אימוץ/דחייה", code: "promote/discard" },
      ],
      masterDataHe: [
        "Version = תכנית-מקבילה עם key figures נבחרים.",
        "Scenario = סטיית 'מה-אם' מעל הגרסה-הפעילה.",
      ],
      mistakesHe: [
        "ריבוי Scenarios/Versions ללא ניקוי ➔ בלבול ועומס.",
        "cross-level calculations כבדים ➔ פגיעה בביצועים.",
        "ערבוב Scenario ב-Production בלי בקרה ➔ נתונים לא-עקביים.",
      ],
      troubleshootHe: [
        "Scenario לא מציג סטייה ➔ ה-key figure לא נכלל ב-Scenario/Version.",
        "ביצועים איטיים ➔ Attribute Transformation/cross-level calc יקר.",
        "תוצאות לא-עקביות בין גרסאות ➔ key figures שונים נכללו בכל גרסה.",
      ],
      bestPracticeHe: [
        "השתמש ב-Scenarios ל'מה-אם' ושמור את התכנית-הפעילה נקייה.",
        "נקה Scenarios/Versions ישנים (Data Lifecycle).",
        "הימנע מ-cross-level calculations מיותרים; שקול Storage levels.",
        "תעד את ההנחות של כל Scenario.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין Version ל-Scenario ב-IBP?", aHe: "Version = תכנית-מקבילה עצמאית עם key figures נבחרים; Scenario = סטיית 'מה-אם' המונחת מעל גרסה קיימת, לבדיקה מהירה בלי לשנות את הבסיס." },
        { qHe: "מהי Attribute Transformation?", aHe: "מנגנון למיפוי בין Planning Levels שונים, המאפשר חישובים cross-level — אך עלול להיות יקר מבחינת-ביצועים." },
      ],
      takeawaysHe: [
        "מתקדם = Versions, Scenarios ו-cross-level.",
        "Scenarios ל'מה-אם'; Versions לתכניות-חלופיות.",
        "גמישות מול מורכבות וביצועים — נהל במודע.",
      ],
      relatedHe: [
        { labelHe: "S&OP · ביצועי-מערכת (10.8)", href: "/library/sop/chapter-10/#sub-10.8" },
        { labelHe: "S&OP · מדדי-מפתח (10.4)", href: "/library/sop/chapter-10/#sub-10.4" },
      ],
    },
    // ============================================================ 10.8
    {
      id: "10.8", titleHe: "המלצות לביצועי-מערכת", titleEn: "System Performance Recommendations",
      execHe:
        "ביצועי IBP נשענים על מודל-נתונים רזה ועל הגדרות-חישוב חכמות. ההמלצות: מינימום Planning Levels ו-Storage levels, רמת-בסיס לא-דקה-מדי, צמצום cross-level calculations, ניקוי-נתונים שוטף (Data Lifecycle), ותזמון-אופרטורים בחלונות שקטים. מודל מתוכנן-נכון מגיב בשניות; מודל מנופח מגיב בדקות.",
      beginnerHe:
        "כדי ש-IBP יהיה מהיר, שומרים את המודל 'רזה': לא יותר מדי רמות, לא יותר מדי נתונים-שמורים, ולא חישובים כבדים מיותרים. מנקים נתונים ישנים ומריצים פעולות-כבדות בלילה. מודל פשוט = מערכת מהירה.",
      consultantHe:
        "מנופי-ביצועים: (1) מינימום Planning Levels ו-Stored key figures — כל אחד צורך זיכרון/חישוב; (2) Base level ברזולוציה הנדרשת בלבד (לא דק-מדי); (3) צמצום Calculated key figures cross-level ו-non-base aggregations; (4) Data Lifecycle (Purge/Time-shift) להקטנת-נפח; (5) תזמון Application Jobs כבדים בחלונות-לילה; (6) Filters ב-planning views להגבלת-scope; (7) הימנעות מנוסחאות-מורכבות-מדי — פירוק ל-Auxiliary. ניטור דרך Application Logs ו-performance traces. HANA in-memory מהיר, אך מודל-מנופח עדיין יכשל.",
      purposeHe:
        "להבטיח חוויית-תכנון מהירה ויציבה גם בנפחי-נתונים גדולים, ולשמור על עלויות-מערכת ועל זמני-תגובה סבירים לאורך מחזורי-S&OP.",
      processExampleHe:
        "צוות מגלה ש-planning view נטען ב-90 שניות; הם מצמצמים Stored key figures לא-בשימוש, מעלים את ה-base level מ-Day ל-Week, ומוסיפים Filters — זמן-הטעינה יורד ל-8 שניות.",
      scenarioHe:
        "בארגון המודל הואט בעונת-הקיץ; הצוות הריץ Purge לתרחישים-ישנים, העלה את רמת-הבסיס של key figures שוליים מ-Day ל-Week, וצמצם cross-level calculations — וזמני-התגובה השתפרו משמעותית.",
      navHe: [
        "IBP Web UI ► Configuration ► Key Figures ► review Stored vs Calculated + Base Level",
        "IBP Web UI ► Application Jobs ► schedule heavy operators in off-peak windows",
        "IBP Web UI ► Application Logs / Performance traces ► monitor run times",
      ],
      tables: ["Planning Level", "Key Figure (metadata)", "Application Log"],
      tcodes: ["IBP Web UI: Configuration", "Application Jobs", "Application Logs"],
      fiori: ["Configuration", "Application Jobs", "Application Logs"],
      configHe: [
        "צמצם Planning Levels ו-Stored key figures לנדרש בלבד.",
        "קבע Base level ברזולוציה הנדרשת (לא דק-מדי, למשל Week לא Day).",
        "צמצם cross-level calculations ו-non-base aggregations; פרק נוסחאות ל-Auxiliary.",
        "הרץ Data Lifecycle (Purge/Time-shift) ותזמן Jobs כבדים בלילה.",
      ],
      flow: [
        { he: "מדידת-ביצועים", code: "trace/log" },
        { he: "צמצום levels/KF", code: "lean model" },
        { he: "Base level אופטימלי", code: "Week>Day" },
        { he: "ניקוי-נתונים", code: "Purge/Time-shift" },
        { he: "תזמון off-peak", code: "night jobs" },
      ],
      masterDataHe: [
        "כל Stored key figure ו-Planning Level צורך זיכרון/חישוב.",
        "Base level דק מדי = נפח-נתונים מתפוצץ.",
      ],
      mistakesHe: [
        "Base level ב-Day כשמספיק Week ➔ נפח עצום וביצועים איטיים.",
        "Stored key figures רבים שאינם בשימוש.",
        "cross-level calculations כבדים בכל תצוגה.",
        "תזמון Jobs כבדים בשעות-עומס.",
      ],
      troubleshootHe: [
        "planning view איטי ➔ יותר מדי key figures/levels או Base level דק; הוסף Filters.",
        "Application Job ארוך ➔ scope רחב מדי או חישוב כבד; צמצם והרץ off-peak.",
        "צריכת-זיכרון גבוהה ➔ נפח-נתונים גדול; הרץ Purge/Time-shift.",
      ],
      bestPracticeHe: [
        "שמור מודל רזה — מינימום levels ו-Stored key figures.",
        "Base level ברזולוציה הנדרשת בלבד.",
        "נקה נתונים שוטף ותזמן Jobs כבדים בלילה.",
        "השתמש ב-Filters בתצוגות ונטר זמני-תגובה דרך Logs.",
      ],
      interviewHe: [
        { qHe: "מהם המנופים העיקריים לשיפור-ביצועי IBP?", aHe: "מודל רזה (מעט levels/Stored KF), Base level לא-דק-מדי, צמצום cross-level calculations, ניקוי-נתונים (Data Lifecycle), תזמון-Jobs off-peak ו-Filters בתצוגות." },
        { qHe: "מדוע Base level דק-מדי פוגע בביצועים?", aHe: "כל ירידה ברזולוציה מכפילה את נפח-הנתונים והחישוב; Day מול Week יכול להגדיל פי-7 את הנפח." },
      ],
      takeawaysHe: [
        "ביצועים = מודל רזה + Base level חכם.",
        "צמצם cross-level calc ונקה נתונים שוטף.",
        "תזמן Jobs כבדים off-peak ונטר דרך Logs.",
      ],
      relatedHe: [
        { labelHe: "S&OP · קונפיגורציה מתקדמת (10.7)", href: "/library/sop/chapter-10/#sub-10.7" },
        { labelHe: "S&OP · רמות תכנון (10.3)", href: "/library/sop/chapter-10/#sub-10.3" },
      ],
    },
    // ============================================================ 10.9
    {
      id: "10.9", titleHe: "סיכום", titleEn: "Summary",
      execHe:
        "פרק זה הראה כיצד להגדיר SAP IBP מקצה-לקצה ל-S&OP: מ-Planning Area ו-Time Profile, דרך Attributes, Master Data Types, Planning Levels ו-Key Figures (כולל aggregation, disaggregation ו-calculations), ועד Planning Operators (Copy ו-Data Lifecycle), History Report, קונפיגורציה מתקדמת והמלצות-ביצועים. יחד הם המודל השלם שעליו רץ תהליך-ה-S&OP בענן.",
      beginnerHe:
        "סיכמנו את אבני-הבניין של IBP: 'איפה' מתכננים (Planning Area), 'מתי' (Time Profile), 'על מה' (Attributes ו-Master Data Types), 'באיזה דיוק' (Planning Levels), 'מה מודדים' (Key Figures), 'איך מסכמים ומפרקים' (aggregation/disaggregation), 'איך מאוטמטים' (Operators), ו'איך שומרים מהיר ועקבי' (ביצועים והיסטוריה).",
      consultantHe:
        "סדר-הבנייה המומלץ: Time Profile ← Attributes ← Master Data Types ← Planning Levels ← Key Figures (Base level, aggregation, disaggregation, calculations) ← Activation ← Master Data load ← Key Figure data load ← Operators (Copy/Lifecycle) ← Versions/Scenarios. בכל שלב: Activate לאחר שינוי, בדוק ב-History Report, ושמור מודל רזה לביצועים. הארגון ממחיש את כל השרשרת על Planning Area של משקאות.",
      purposeHe:
        "לקשור את כל אבני-הבניין לתמונה אחת — כך שהלומד יוכל לתכנן, לבנות ולתחזק Planning Area שלם ל-S&OP, ולחבר אותו לתהליכי Demand/Supply/Executive Review.",
      processExampleHe:
        "מימוש S&OP מלא: בונים Time Profile חודשי, מגדירים ממדי-מוצר/מיקום/לקוח, יוצרים Planning Levels ו-key figures לביקוש/ייצור/מלאי עם aggregation/disaggregation נכונים, מגדירים Copy Operator לאתחול-מחזור ו-Lifecycle לגלילת-אופק, ומפעילים — תהליך-S&OP חודשי פועל מקצה-לקצה.",
      scenarioHe:
        "בארגון התוצאה היא Planning Area MFG_SNOP פעיל: ביקוש-משקאות מתוכנן ברמת-מותג ומתפרק למוצר×שבוע, מועתק לתכנית-ייצור על קווי-המילוי, עם מלאי-חזוי מחושב, גלילת-אופק חודשית ותרחישי-קיץ — מודל-S&OP מלא בענן.",
      navHe: [
        "IBP Web UI ► Configuration ► (Time Profile ← Attributes ← MDT ← Planning Levels ← Key Figures ← Operators)",
        "IBP Web UI ► Configuration ► Activate (after each structural change)",
        "IBP Web UI ► Application Jobs / Application Logs (run + monitor)",
      ],
      tables: ["Planning Area", "Time Profile", "Master Data Type", "Planning Level", "Key Figure", "Operator"],
      tcodes: ["IBP Web UI: Configuration", "Application Jobs", "Manage Application Jobs"],
      fiori: ["Configuration", "Application Jobs", "IBP for Excel"],
      configHe: [
        "סדר-בנייה: Time Profile ← Attributes ← Master Data Types ← Planning Levels ← Key Figures ← Operators.",
        "Activate לאחר כל שינוי מבני; טען Master Data לפני Key Figure data.",
        "הגדר Aggregation/Disaggregation/Calculations במכוון לכל key figure.",
        "אוטמט מחזור דרך Copy + Lifecycle Operators; נטר דרך Logs ו-History Report.",
      ],
      flow: [
        { he: "Time Profile + Attributes", code: "foundation" },
        { he: "Master Data Types + Levels", code: "dimensions" },
        { he: "Key Figures + Calculations", code: "measures" },
        { he: "Operators", code: "automation" },
        { he: "Activate + Run", code: "live S&OP" },
      ],
      masterDataHe: [
        "המודל = Planning Area (Time Profile + MDTs + Levels + Key Figures + Operators).",
        "Activation מחבר הגדרה למבני-HANA פעילים.",
      ],
      mistakesHe: [
        "דילוג על סדר-הבנייה ➔ תלויות חסרות ו-Activation נכשל.",
        "שכחת Activation או טעינת-Master-Data לפני נתוני-מפתח.",
        "Aggregation/Disaggregation לא-מכוונים ➔ מספרים שגויים.",
        "מודל מנופח ➔ ביצועים גרועים.",
      ],
      troubleshootHe: [
        "Activation נכשל ➔ תלות חסרה בסדר-הבנייה; בדוק לוג.",
        "תוצאות שגויות ➔ aggregation/disaggregation או calculation; בדוק History Report.",
        "מערכת איטית ➔ צמצם levels/KF והרץ Lifecycle.",
      ],
      bestPracticeHe: [
        "עקוב אחר סדר-הבנייה ו-Activate בכל שלב.",
        "Copy מ-Sample Planning Area (SAPIBP1) כבסיס.",
        "הגדר aggregation/disaggregation במכוון ושמור מודל רזה.",
        "אוטמט מחזור דרך Operators ונטר דרך History/Application Logs.",
      ],
      interviewHe: [
        { qHe: "מהו סדר-הבנייה הנכון של Planning Area ל-S&OP?", aHe: "Time Profile ← Attributes ← Master Data Types ← Planning Levels ← Key Figures (עם aggregation/disaggregation/calculations) ← Activation ← Master Data load ← Key Figure data ← Operators ← Versions/Scenarios." },
        { qHe: "מהן שלוש שגיאות-המימוש הנפוצות ביותר?", aHe: "(1) דילוג על סדר-הבנייה/Activation; (2) טעינת נתוני-מפתח לפני Master Data; (3) aggregation/disaggregation לא-מכוונים." },
      ],
      takeawaysHe: [
        "Planning Area מאחד Time Profile, MDTs, Levels, Key Figures ו-Operators.",
        "עקוב אחר סדר-הבנייה, Activate, וטען Master Data לפני נתוני-מפתח.",
        "Aggregation/Disaggregation מכוונים + מודל רזה = S&OP מדויק ומהיר.",
      ],
      relatedHe: [
        { labelHe: "S&OP · אזורי תכנון ופרופילי זמן (10.1)", href: "/library/sop/chapter-10/#sub-10.1" },
        { labelHe: "S&OP · מדדי-מפתח (10.4)", href: "/library/sop/chapter-10/#sub-10.4" },
        { labelHe: "S&OP · אופרטורי תכנון (10.5)", href: "/library/sop/chapter-10/#sub-10.5" },
      ],
    },
  ],
};
