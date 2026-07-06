// ===== S&OP with SAP IBP — Chapter 11 (gold-standard learning chapter) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Topic: Building Planning Views in the SAP IBP, add-in for Microsoft Excel,
// plus Planner Workspaces, formatting, charts, Master Data worksheets and VBA.
// Hierarchy + ids preserved exactly. SAP objects verbatim English; IBP cloud.
import type { TextbookChapter } from "./types";

export const CH11: TextbookChapter = {
  n: 11,
  titleHe: "בניית תצוגות-תכנון (Planning Views)",
  titleEn: "Building Planning Views",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לבניית תצוגות-תכנון (planning views) ב-SAP IBP — ענן-התכנון של SAP. ה-planning view היא הממשק היומיומי של המתכנן: גיליון Excel חי, מחובר ל-IBP דרך ה-Excel add-in, שדרכו רואים, עורכים ומפרסמים מספרי-תכנון (Key Figures) חתוכים לפי מאפיינים (Attributes). כל תת-פרק וכל תת-סעיף הורחב ליחידה עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך מקצה-לקצה, דוגמת הארגון (מתכנני חברת-המשקאות מוצר לדוגמה הבונים את תצוגות-התכנון שלהם ב-Excel), ניווט בעצי-התפריט של ה-Excel add-in ושל Planner Workspaces, טבלאות/אובייקטים, פרטי-בנייה, תרשים-תהליך לבניית התצוגה, טעויות נפוצות, פתרון-תקלות, שיטות-מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: לבנות תצוגת-תכנון תקינה מאפס בלי הספר המקורי.",
  subchapters: [
    // ============================================================ 11.1
    {
      id: "11.1",
      titleHe: "תצוגות-תכנון, תבניות ומועדפים עם Excel",
      titleEn: "Planning Views, Templates, and Favorites with Excel",
      execHe:
        "ה-SAP IBP, add-in for Microsoft Excel הוא חזית-העבודה המרכזית של המתכנן. הוא הופך גיליון Excel רגיל ל-planning view חי המחובר ל-IBP בענן: שולפים נתונים, עורכים מספרים, מריצים סימולציות ומפרסמים (Save Data) חזרה ל-IBP. תבניות (templates) ומועדפים (favorites) ממירים תצוגה שבנינו פעם אחת לנכס לשימוש-חוזר — כך כל מתכנן פותח בוקר-בוקר את אותה תצוגה אחידה במקום לבנותה מחדש.",
      beginnerHe:
        "דמיין את Excel שאתה כבר מכיר, אבל עם לשונית חדשה בשם SAP IBP שמחברת אותו לענן. במקום לכתוב מספרים בתאים מנותקים, אתה מגדיר 'מה אני רוצה לראות' — אילו מספרי-תכנון (Key Figures, למשל תחזית-ביקוש) ולפי אילו חיתוכים (Attributes, למשל מוצר, לקוח, חודש). לוחצים, וה-add-in ממלא את הגיליון בנתונים האמיתיים מ-IBP. זוהי ה-planning view. אם שמרת אותה כ-favorite — תפתח אותה שוב בלחיצה.",
      consultantHe:
        "ה-add-in מתקין לשונית SAP IBP ב-Ribbon ומתחבר ל-IBP דרך OData/HTTPS מול ה-Planning Area הפעיל. תצוגה מוגדרת על-ידי: Planning Area, Favorites/Template, רשימת Key Figures, Attributes בשורות/עמודות (rows/columns layout), Time settings (horizon, periodicity, time profile level) ו-Filters. ה-add-in שולח Data Access query ומציג את הנתונים בגריד. עריכה אינה נשמרת עד Save Data (פרסום) — לפני כן זו סימולציה מקומית בלבד. Template = הגדרת-מבנה ללא קישור-משתמש; Favorite = מופע אישי/משותף השמור בענן. הבחנה זו קריטית לממשל: templates מנוהלים מרכזית, favorites הם אישיים.",
      purposeHe:
        "המטרה: לתת למתכנן סביבת-עבודה מוכרת (Excel) עם נתונים חיים מ-IBP, מבלי שילמד כלי חדש. תבניות ומועדפים מבטיחים אחידות (כל המתכננים רואים אותה פריסה), חוסכים זמן-הקמה יומי, ומפחיתים טעויות-עיצוב.",
      processExampleHe:
        "מתכנן-ביקוש פותח Excel ► לשונית SAP IBP ► Log On ► New View ► בוחר Planning Area, את ה-Key Figure ‏Consensus Demand, את ה-Attributes ‏Product ו-Customer בשורות ואת החודשים בעמודות, ומגדיר אופק של 12 חודשים. לוחץ OK; הגריד מתמלא. הוא מתקן מספר-תחזית בתא, מריץ Simulate, ולבסוף Save Data כדי לפרסם ל-IBP. לסיום שומר Save As Favorite בשם \"Monthly Demand Review\".",
      scenarioHe:
        "בארגון כל מתכנן-ביקוש של מוצר לדוגמה פותח את ה-favorite \"הארגון Monthly Demand\" — planning view אחיד עם Consensus Demand לפי SKU ולפי רשת-קמעונאות, חודשי, אופק 18 חודשים. במקום שכל מתכנן יבנה תצוגה משלו, ה-template המרכזי מבטיח שכולם מדווחים על אותו מבנה לישיבת ה-S&OP.",
      navHe: [
        "Excel ► SAP IBP tab ► Log On (התחברות ל-IBP cloud)",
        "Excel ► SAP IBP tab ► New View (פתיחת תצוגת-תכנון חדשה)",
        "Excel ► SAP IBP tab ► Favorites ► Open / Save / Save As (ניהול מועדפים)",
        "Excel ► SAP IBP tab ► Templates ► Manage Templates (ניהול תבניות)",
      ],
      tables: ["Planning Area", "Key Figure", "Attribute", "Time Profile", "Favorite", "Template"],
      tcodes: ["SAP IBP Excel add-in", "Web UI: Planning Areas (configuration)"],
      fiori: ["Manage Favorites", "Manage Templates", "Application Jobs"],
      configHe: [
        "התקנת ה-add-in: SAP IBP, add-in for Microsoft Excel מותקן מ-Download Center; דורש .NET ומחבר OData ל-tenant.",
        "Log On: בחירת ה-tenant URL והזדהות (SSO/Basic); בחירת Planning Area פעיל.",
        "New View: בחירת Key Figures + Attributes + Time + Filters במסך ההגדרה לפני ה-OK.",
        "Save As Favorite מול Save As Template: Favorite = מופע אישי/משותף; Template = שלד-מבנה לשימוש-חוזר.",
      ],
      flow: [
        { he: "התחברות ל-IBP", code: "Log On", note: "בחירת Planning Area" },
        { he: "פתיחת תצוגה חדשה", code: "New View" },
        { he: "בחירת Key Figures + Attributes + Time", code: "Layout" },
        { he: "מילוי הגריד מ-IBP", code: "Refresh" },
        { he: "עריכה + סימולציה", code: "Simulate" },
        { he: "פרסום ל-IBP", code: "Save Data" },
        { he: "שמירה לשימוש-חוזר", code: "Save Favorite/Template" },
      ],
      masterDataHe: [
        "Planning Area = המכל המגדיר אילו Key Figures, Attributes ו-Time Profile זמינים לתצוגה.",
        "Key Figures (למשל Consensus Demand, Sales Forecast) = המספרים הנערכים; חלקם editable, חלקם calculated.",
        "Attributes (Product, Customer, Location) = צירי-החיתוך בשורות/עמודות.",
      ],
      mistakesHe: [
        "עריכה בגריד ושכחת Save Data — השינוי נשאר מקומי ולא מתפרסם ל-IBP.",
        "בניית תצוגה אישית במקום שימוש ב-template המרכזי — אובדן אחידות בין מתכננים.",
        "בלבול בין Favorite (מופע) ל-Template (שלד) — שמירת מופע אישי כתבנית ארגונית.",
        "בחירת אופק-זמן רחב מדי — שליפה איטית וגריד כבד.",
      ],
      troubleshootHe: [
        "הגריד ריק אחרי OK ➔ בדוק Filters רחבים/צרים מדי, Planning Area נכון והרשאות-נתונים.",
        "אין לשונית SAP IBP ב-Excel ➔ ה-add-in מושבת ב-COM Add-ins או לא הותקן.",
        "Save Data נכשל ➔ Key Figure לא-editable, נעילת-תכנון (planning lock) או ניתוק-חיבור.",
        "התצוגה איטית ➔ צמצם Attributes/אופק או הוסף Filters.",
      ],
      bestPracticeHe: [
        "נהל תבניות מרכזית והפץ אותן; אל תאפשר לכל מתכנן לבנות מאפס.",
        "תן שמות עקביים ל-favorites (תהליך + תדירות), למשל \"Monthly Demand Review\".",
        "שמור תצוגות ממוקדות — מעט Key Figures ואופק סביר — לביצועים טובים.",
        "הקפד תמיד על Save Data לפרסום; הסבר למתכננים שעריכה לבדה היא סימולציה.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין Template ל-Favorite ב-IBP Excel?", aHe: "Template הוא שלד-מבנה לשימוש-חוזר המנוהל מרכזית; Favorite הוא מופע שמור (אישי או משותף) של תצוגה ספציפית בענן. שניהם חוסכים בנייה-מחדש, אך ה-template הוא הסטנדרט הארגוני." },
        { qHe: "מתי שינוי בגריד מגיע ל-IBP?", aHe: "רק ב-Save Data (פרסום). עד אז העריכה היא סימולציה מקומית; Simulate מחשב מחדש בלי לפרסם." },
        { qHe: "מהם המרכיבים המגדירים planning view?", aHe: "Planning Area, רשימת Key Figures, Attributes בשורות/עמודות, הגדרות-זמן (אופק/תדירות) ו-Filters." },
      ],
      takeawaysHe: [
        "ה-Excel add-in הופך Excel ל-planning view חי מול IBP cloud.",
        "עריכה היא סימולציה עד Save Data.",
        "Templates = אחידות מרכזית; Favorites = מופעים שמורים.",
      ],
      relatedHe: [
        { labelHe: "S&OP · תצוגות עם Planner Workspaces (11.2)", href: "/library/sop/chapter-11/#sub-11.2" },
        { labelHe: "S&OP · עיצוב תצוגות (11.3)", href: "/library/sop/chapter-11/#sub-11.3" },
      ],
      children: [
        {
          id: "11.1.1",
          titleHe: "יצירת תצוגת-תכנון",
          titleEn: "Planning View Creation",
          execHe:
            "יצירת planning view היא הפעולה היסודית ב-IBP Excel: הגדרת מה לראות (Key Figures), לפי אילו חיתוכים (Attributes), על-פני איזה אופק-זמן ועם אילו מסננים. תוצאת ההגדרה היא גריד-Excel חי המשקף נתוני-IBP בזמן-אמת.",
          beginnerHe:
            "זה כמו לבנות 'דוח לפי דרישה': אתה אומר ל-IBP אילו מספרים מעניינים אותך ולפי מה לחתוך אותם, והוא מצייר טבלה. השורות והעמודות הם המאפיינים (מוצר/לקוח/זמן), והתאים הם מספרי-התכנון.",
          consultantHe:
            "ב-New View נבחר Planning Area, ואז ב-Planning View Configuration מוסיפים Key Figures, גוררים Attributes ל-Rows או Columns, מגדירים Time (horizon, periodicity, time profile level) ומחילים Filters/Attribute selections. ה-add-in מתרגם זאת ל-Data Access query מול ה-Planning Area. סדר ה-Attributes בשורות קובע את היררכיית-הקיבוץ; ערכי-Key-Figure מחושבים מוצגים read-only ואילו Key Figures בסיסיים editable.",
          purposeHe:
            "לאפשר למתכנן להרכיב במדויק את חתך-הנתונים הדרוש לו — ביקוש לפי SKU, או מלאי לפי מחסן — בלי פיתוח ובלי בקשת-דוח מ-IT.",
          processExampleHe:
            "מתכנן בוחר Planning Area ‏SAPIBP1, מוסיף Key Figures ‏Consensus Demand ו-Statistical Forecast, גורר Product ו-Customer ל-Rows, את Month ל-Columns, קובע אופק 12 חודשים קדימה ומסנן ל-Location מסוים. לוחץ OK והגריד מתמלא; כעת יכול לערוך ו-Save Data.",
          scenarioHe:
            "מתכנן-הארגון יוצר תצוגה: Key Figure ‏Consensus Demand, שורות = SKU + רשת-קמעונאות, עמודות = חודשים, אופק 18 חודש, Filter ל-Region \"Israel\". זו תהיה הבסיס ל-favorite היומיומי שלו.",
          navHe: [
            "Excel ► SAP IBP tab ► New View",
            "Planning View Configuration ► Key Figures (Add/Remove)",
            "Planning View Configuration ► Attributes ► Rows / Columns (Drag)",
            "Planning View Configuration ► Time (Horizon / Periodicity)",
            "Planning View Configuration ► Filter",
          ],
          tables: ["Planning Area", "Key Figure", "Attribute", "Time Profile", "Filter"],
          tcodes: ["SAP IBP Excel add-in: New View"],
          fiori: ["Manage Favorites"],
          configHe: [
            "בחירת Planning Area היא הצעד הראשון — היא קובעת את מאגר ה-Key Figures וה-Attributes הזמינים.",
            "Attributes בשורות/עמודות: הסדר קובע קיבוץ והיררכיה בגריד.",
            "Time: אופק (מספר תקופות), periodicity (Daily/Weekly/Monthly) ו-time profile level.",
            "Filter / Attribute selection: צמצום הנתונים לטווח רלוונטי לפני השליפה.",
          ],
          flow: [
            { he: "New View", code: "Planning Area" },
            { he: "הוספת Key Figures", code: "Add KF" },
            { he: "גרירת Attributes לשורות/עמודות", code: "Rows/Cols" },
            { he: "הגדרת זמן ומסננים", code: "Time/Filter" },
            { he: "OK → מילוי הגריד", code: "Refresh" },
          ],
          masterDataHe: [
            "Planning Area קובע מה זמין; Key Figures = המדדים; Attributes = הצירים; Time Profile = רזולוציית-הזמן.",
          ],
          mistakesHe: [
            "ערבוב רזולוציות-זמן לא-תואמות ל-Key Figure ➔ ערכים ריקים או מצטברים שגוי.",
            "יותר מדי Attributes בשורות ➔ גריד ענק ואיטי.",
            "אי-הגדרת Filter ➔ שליפת כל מרחב-התכנון ועומס מיותר.",
          ],
          troubleshootHe: [
            "תאים ריקים ➔ ה-Key Figure אינו מוגדר באותה רמת-זמן/Attribute שנבחרה.",
            "אין אפשרות לערוך תא ➔ זהו Key Figure מחושב (calculated), לא editable.",
            "שליפה איטית ➔ צמצם אופק/Attributes או הוסף Filter.",
          ],
          bestPracticeHe: [
            "התחל ממעט Key Figures ו-Attributes; הרחב לפי-צורך.",
            "הגדר תמיד Filter סביר לפני שליפה ראשונה.",
            "התאם periodicity לרמת-הזמן שבה ה-Key Figure באמת מתוחזק.",
          ],
          interviewHe: [
            { qHe: "מהו הצעד הראשון ביצירת planning view ולמה הוא קריטי?", aHe: "בחירת Planning Area — היא קובעת אילו Key Figures, Attributes ו-Time Profile יהיו זמינים לכל שאר ההגדרה." },
            { qHe: "מה קובע סדר ה-Attributes בשורות?", aHe: "את היררכיית-הקיבוץ והתצוגה בגריד; שינוי-סדר משנה את האופן שבו הנתונים מקובצים." },
          ],
          takeawaysHe: [
            "planning view = Key Figures × Attributes × Time × Filter.",
            "Planning Area נבחר ראשון וקובע את כל הזמין.",
            "Key Figures מחושבים הם read-only; בסיסיים editable.",
          ],
          relatedHe: [
            { labelHe: "S&OP · תבניות ומועדפים (11.1.2)", href: "/library/sop/chapter-11/#sub-11.1.2" },
          ],
        },
        {
          id: "11.1.2",
          titleHe: "תבניות ומועדפים",
          titleEn: "Templates and Favorites",
          execHe:
            "Templates ו-Favorites הם מנגנוני השימוש-החוזר של ה-Excel add-in. הם מאפשרים להגדיר תצוגה פעם אחת ולפתוח אותה שוב ושוב — מועדף לשימוש אישי/משותף, ותבנית כסטנדרט ארגוני שמופץ למתכננים רבים.",
          beginnerHe:
            "אחרי שבנית תצוגה טובה, לא תרצה לבנות אותה מחדש כל בוקר. מועדף (Favorite) שומר אותה בלחיצה כדי לפתוח שוב; תבנית (Template) היא 'שלד מאושר' שכל הצוות פותח כדי לעבוד באותו אופן.",
          consultantHe:
            "Favorites נשמרים ב-tenant ויכולים להיות private או shared; הם נושאים את כל הגדרת-התצוגה (KFs, layout, time, filters). Templates הם הגדרות-מבנה מנוהלות (לרוב על-ידי key user/admin) הזמינות דרך Manage Templates, ומשמשות בסיס לתצוגות חדשות. Favorite יכול לכלול ערכי-Filter קבועים, בעוד Template נוטה להשאיר Filters פתוחים לבחירה. ניהול-גרסאות ושיתוף נעשים דרך ה-Web UI (Manage Favorites/Templates).",
          purposeHe:
            "לחסוך זמן-הקמה יומי, להבטיח אחידות-מבנה בין מתכננים ולנהל מרכזית את התצוגות ה'רשמיות' של תהליך ה-S&OP.",
          processExampleHe:
            "מתכנן בונה תצוגת-סקירה, שומר Save As Favorite \"Weekly S&OP\". key user נוטל אותה, מנקה Filters אישיים ושומר כ-Template \"S&OP Standard Review\", שמפיץ לכל הצוות; כל מתכנן פותח את ה-template וממלא Filters משלו.",
          scenarioHe:
            "בארגון ה-key user מתחזק template אחיד \"הארגון S&OP Demand\" עם פריסת-Key-Figures מוסכמת; כל מתכנן-מדינה פותח אותו, בוחר Region משלו, ושומר favorite אישי — אך המבנה זהה לכולם בישיבת ה-S&OP.",
          navHe: [
            "Excel ► SAP IBP tab ► Favorites ► Save / Save As / Open / Delete",
            "Excel ► SAP IBP tab ► Templates ► New from Template / Manage Templates",
            "Web UI ► Manage Favorites (שיתוף/הרשאות)",
          ],
          tables: ["Favorite", "Template", "Planning View Definition"],
          tcodes: ["SAP IBP Excel add-in: Favorites / Templates"],
          fiori: ["Manage Favorites", "Manage Templates"],
          configHe: [
            "Save As Favorite: שומר את כל הגדרת-התצוגה תחת שם; אפשר private או shared.",
            "Manage Templates: key user יוצר/מעדכן תבניות-מבנה זמינות לכל הצוות.",
            "New from Template: פתיחת תצוגה חדשה על-בסיס שלד-התבנית.",
            "שיתוף-הרשאות: דרך ה-Web UI נקבע מי רשאי לראות favorite/template משותף.",
          ],
          flow: [
            { he: "בניית תצוגה", code: "New View" },
            { he: "שמירה אישית", code: "Save Favorite" },
            { he: "המרה לסטנדרט", code: "Save Template" },
            { he: "הפצה לצוות", code: "Manage Templates" },
            { he: "פתיחה חוזרת", code: "New from Template" },
          ],
          masterDataHe: [
            "Favorite/Template אוגרים את הגדרת-התצוגה (KFs, Attributes, Time, Filters) ולא את הנתונים עצמם — הנתונים נשלפים תמיד מ-IBP בפתיחה.",
          ],
          mistakesHe: [
            "שמירת favorite עם Filter אישי כתבנית ארגונית ➔ כל הצוות יורש מסנן לא-רלוונטי.",
            "ריבוי favorites כפולים בלי מוסכמת-שמות ➔ בלבול ואובדן הסטנדרט.",
            "עריכת template ישירות בלי ניהול-גרסאות ➔ שינוי לא-מבוקר לכל המשתמשים.",
          ],
          troubleshootHe: [
            "Template לא מופיע למתכנן ➔ הרשאות-שיתוף או הקצאה חסרה ב-Manage Templates.",
            "Favorite נפתח ריק ➔ ה-Filters השמורים אינם תואמים נתונים קיימים.",
            "שינוי-template לא משתקף ➔ המתכנן פתח מ-favorite ישן ולא New from Template.",
          ],
          bestPracticeHe: [
            "החזק מספר-מצומצם של templates רשמיים ונהל אותם key user מרכזי.",
            "השאר Filters פתוחים בתבניות; קבע Filters רק ב-favorites אישיים.",
            "אמץ מוסכמת-שמות אחידה (תהליך + תדירות + אזור).",
          ],
          interviewHe: [
            { qHe: "האם favorite שומר את הנתונים?", aHe: "לא. הוא שומר רק את הגדרת-התצוגה; הנתונים נשלפים מחדש מ-IBP בכל פתיחה." },
            { qHe: "מי מנהל templates ומדוע?", aHe: "לרוב key user/admin, כדי לשמור על סטנדרט-מבנה אחיד ומבוקר לכל הצוות בתהליך ה-S&OP." },
          ],
          takeawaysHe: [
            "Favorite = מופע שמור; Template = שלד-סטנדרט מנוהל.",
            "שניהם אוגרים הגדרה, לא נתונים.",
            "השאר Filters פתוחים בתבניות, קבועים במועדפים.",
          ],
          relatedHe: [
            { labelHe: "S&OP · יצירת תצוגה (11.1.1)", href: "/library/sop/chapter-11/#sub-11.1.1" },
          ],
        },
      ],
    },
    // ============================================================ 11.2
    {
      id: "11.2",
      titleHe: "תצוגות-תכנון, התראות-מותאמות וגרפי-אנליטיקה עם Planner Workspaces",
      titleEn: "Planning Views, Custom Alerts, and Analytics Charts with Planner Workspaces",
      execHe:
        "Planner Workspaces הם סביבת-העבודה מבוססת-הדפדפן (Web UI) של IBP, חלופה ומשלימה ל-Excel add-in. במקום גיליון בודד, ה-workspace מאחד באזור-עבודה אחד מספר 'אריחים' (cards): planning view grids, custom alerts וגרפי-אנליטיקה — כך שהמתכנן רואה תמונה-כוללת ופועל ממקום-אחד, בלי Excel.",
      beginnerHe:
        "תאר לעצמך לוח-מחוונים אישי בתוך הדפדפן: בחלק אחד טבלת-תכנון לעריכה, בחלק שני התראות שמסבות את תשומת-לבך לבעיות (\"מלאי מתחת לסף\"), ובחלק שלישי גרף-מגמה. כל אלה יחד הם Planner Workspace — מסך-עבודה אחד שמרכז את כל מה שהמתכנן צריך, בלי לפתוח Excel.",
      consultantHe:
        "Planner Workspaces רצים ב-Web UI ובנויים מ-cards: Planning View card (גריד עריך הדומה ל-Excel grid), Custom Alert card (מבוסס Alert definitions ו-thresholds), ו-Analytics Chart card (מבוסס Analytics charts/Key Figures). ה-workspace שומר layout, filters ו-context משותף בין הכרטיסים — שינוי-Filter ברמת-ה-workspace מתפשט לכל הכרטיסים. Custom alerts מוגדרים ב-Define and Subscribe to Custom Alerts עם תנאי על Key Figures; הם מקושרים לכרטיס ומאפשרים drill לתצוגה. היתרון מול Excel: שיתוף-context, חוויה אינטראקטיבית ואי-תלות בהתקנת-add-in.",
      purposeHe:
        "לאחד תכנון, ניטור-חריגות וניתוח-מגמות במסך-עבודה אחד מבוסס-דפדפן — לקצר את הדרך מ'זיהוי-בעיה' ל'תיקון-בתצוגה', ולאפשר עבודה ללא Excel.",
      processExampleHe:
        "מתכנן פותח Planner Workspace ► רואה Custom Alert card שמדגיש 5 SKUs עם תחזית מתחת לסף ► לוחץ על ההתראה ► מתמקד ב-Planning View card באותם SKUs ► מתקן את התחזית בגריד ► ה-Analytics Chart card מעדכן את גרף-המגמה ► שומר את השינוי. הכל באותו מסך-דפדפן.",
      scenarioHe:
        "בארגון מנהל-תכנון בונה Planner Workspace \"הארגון S&OP Cockpit\": Custom Alert ל-\"Forecast Accuracy < 70%\", Planning View של Consensus Demand לפי SKU, ו-Analytics chart של מגמת-מכירות. בישיבת ה-S&OP כל הצוות מסתכל על אותו workspace משותף.",
      navHe: [
        "Web UI ► Planner Workspaces ► New / Open Workspace",
        "Planner Workspace ► Add Card ► Planning View",
        "Planner Workspace ► Add Card ► Custom Alerts",
        "Planner Workspace ► Add Card ► Analytics Chart",
        "Web UI ► Define and Subscribe to Custom Alerts (הגדרת התראות)",
      ],
      tables: ["Planner Workspace", "Custom Alert", "Analytics Chart", "Key Figure", "Planning Area"],
      tcodes: ["Web UI: Planner Workspaces", "Web UI: Custom Alerts"],
      fiori: ["Planner Workspaces", "Define and Subscribe to Custom Alerts", "Analytics"],
      configHe: [
        "New Workspace: בחירת Planning Area ו-context (Filters) משותף לכל הכרטיסים.",
        "Add Card: הוספת Planning View / Custom Alert / Analytics Chart לאזור-העבודה.",
        "Custom Alert definition: תנאי על Key Figures + thresholds, ב-Define and Subscribe to Custom Alerts.",
        "Shared filter context: שינוי-Filter ברמת-workspace מתפשט לכל הכרטיסים.",
      ],
      flow: [
        { he: "פתיחת Workspace", code: "New Workspace", note: "Planning Area + context" },
        { he: "הוספת Planning View card", code: "Add Card" },
        { he: "הוספת Custom Alert card", code: "Add Card" },
        { he: "הוספת Analytics Chart card", code: "Add Card" },
        { he: "פעולה מתוך התראה ← תצוגה", code: "Drill", note: "תיקון בגריד" },
        { he: "שמירה", code: "Save Data" },
      ],
      masterDataHe: [
        "Custom Alerts מבוססים על Key Figures + thresholds המוגדרים ב-Planning Area.",
        "Analytics Charts מבוססים על Key Figures ועל הגדרות-Analytics; Planning View card משתף את אותו Planning Area.",
      ],
      mistakesHe: [
        "הגדרת thresholds רחבים מדי להתראות ➔ \"רעש\" של התראות שלא רלוונטיות.",
        "שכחת ה-shared context — צפייה בנתונים לא-תואמים בין כרטיסים.",
        "ניסיון להשתמש ב-workspace כתחליף-מלא ל-Excel עבור עריכת-המונית מורכבת.",
      ],
      troubleshootHe: [
        "התראה לא נורית ➔ הגדרת-Alert/threshold שגויה או היעדר-מנוי (subscribe).",
        "כרטיסים מציגים נתונים לא-תואמים ➔ Filters שונים בין הכרטיסים במקום shared context.",
        "Save Data לא נשמר ➔ Key Figure לא-editable או נעילת-תכנון.",
      ],
      bestPracticeHe: [
        "בנה workspace סביב תהליך (S&OP review) ולא סביב נתון בודד.",
        "כוון thresholds כדי שהתראה תסמן רק חריגה אמיתית.",
        "השתמש ב-shared context כדי שכל הכרטיסים יספרו אותו סיפור.",
        "שלב: Excel לעריכה-המונית, Planner Workspaces לניטור-ופעולה אינטראקטיבית.",
      ],
      interviewHe: [
        { qHe: "מהו Planner Workspace וממה הוא מורכב?", aHe: "סביבת-עבודה מבוססת-דפדפן ב-Web UI המורכבת מ-cards: Planning View, Custom Alerts ו-Analytics Charts, עם context/Filters משותף." },
        { qHe: "מה היתרון של Planner Workspaces על Excel add-in?", aHe: "איחוד תכנון, התראות וניתוח במסך-אחד, context משותף, חוויה אינטראקטיבית ואי-תלות בהתקנת add-in." },
        { qHe: "על מה מבוססים Custom Alerts?", aHe: "על תנאי-סף (thresholds) על Key Figures, המוגדרים ב-Define and Subscribe to Custom Alerts ומחוברים לכרטיס ב-workspace." },
      ],
      takeawaysHe: [
        "Planner Workspaces = עבודה מבוססת-דפדפן עם cards.",
        "מאחדים planning view, custom alerts ו-analytics charts.",
        "context משותף מקשר את כל הכרטיסים; Excel נשאר לעריכה-המונית.",
      ],
      relatedHe: [
        { labelHe: "S&OP · תצוגות עם Excel (11.1)", href: "/library/sop/chapter-11/#sub-11.1" },
        { labelHe: "S&OP · שימוש בגרפים (11.4)", href: "/library/sop/chapter-11/#sub-11.4" },
      ],
    },
    // ============================================================ 11.3
    {
      id: "11.3",
      titleHe: "עיצוב תצוגות-תכנון",
      titleEn: "Formatting Planning Views",
      execHe:
        "עיצוב planning view הוא ההבדל בין גריד-נתונים גולמי לבין כלי-עבודה קריא. ב-IBP Excel חלק מהעיצוב הוא Excel רגיל וחלק נשלט על-ידי ה-add-in (Sheet Options) או נשמר עם התצוגה. הבנת חלוקת-האחריות הזו מונעת אובדן-עיצוב בכל Refresh.",
      beginnerHe:
        "אחרי שהנתונים מופיעים, רוצים שהם ייראו טוב וברורים: גבולות, צבעים, רוחב-עמודות, הקפאת-כותרות. חלק מזה עושים כמו ב-Excel רגיל, אבל חלק חייבים לעשות דרך ה-add-in, אחרת זה ייעלם כשנשלוף נתונים מחדש (Refresh).",
      consultantHe:
        "ה-add-in מחזיר את הגריד באזור מנוהל; עיצוב-Excel ידני בתוך אזור-הנתונים עלול להידרס ב-Refresh. לכן ה-add-in מספק Sheet Options ו-Local Members כדי להוסיף עיצוב/חישובים שיישרדו רענון. עיצוב-מבנה (סדר-Attributes, רוחב-עמודות, הקפאה) נשמר עם ה-favorite; עיצוב מותנה (conditional formatting) על ערכי-Key-Figure שימושי לסימון-חריגות. תבנית-עיצוב מרכזית מבטיחה אחידות בין מתכננים.",
      purposeHe:
        "להפוך את התצוגה לקריאה ופעילה — שהמתכנן יזהה מהר חריגות, יבדיל בין עמודות-זמן ובין editable ל-read-only, ושהעיצוב לא יאבד ברענון.",
      processExampleHe:
        "מתכנן מקפיא את שורת-הכותרת והעמודה הראשונה, מרחיב את עמודת-המוצר, מוסיף conditional formatting שמאדים ערכי-תחזית מתחת לסף, ושומר את התצוגה — בפתיחה הבאה ה-favorite משחזר את העיצוב.",
      scenarioHe:
        "בארגון ה-template האחיד כולל עיצוב מוסכם: עמודות-עבר באפור, עמודות-עתיד בלבן, conditional formatting אדום ל-Forecast Accuracy נמוך — כך כל מתכנן-מדינה רואה אותה שפה-חזותית בישיבת ה-S&OP.",
      navHe: [
        "Excel ► SAP IBP tab ► Sheet Options",
        "Excel ► Home ► Conditional Formatting (על אזור-הערכים)",
        "Excel ► View ► Freeze Panes",
        "Excel ► SAP IBP tab ► Save Favorite (שימור-עיצוב)",
      ],
      tables: ["Planning View Definition", "Key Figure", "Attribute"],
      tcodes: ["SAP IBP Excel add-in: Sheet Options"],
      fiori: ["Manage Favorites"],
      configHe: [
        "Sheet Options: הגדרות-תצוגה ברמת-הגיליון הנשלטות על-ידי ה-add-in (השורדות Refresh).",
        "Freeze Panes + רוחב-עמודות: עיצוב-מבנה הנשמר עם ה-favorite.",
        "Conditional Formatting: סימון-חריגות על ערכי-Key-Figure.",
        "אזור-נתונים מנוהל: הימנע מעיצוב ידני שעלול להידרס; השתמש ב-Sheet Options / Local Members.",
      ],
      flow: [
        { he: "מילוי הגריד", code: "Refresh" },
        { he: "הקפאת כותרות + רוחב-עמודות", code: "Freeze Panes" },
        { he: "Sheet Options של ה-add-in", code: "Sheet Options" },
        { he: "Conditional formatting לחריגות", code: "CF" },
        { he: "שמירה לשימור-עיצוב", code: "Save Favorite" },
      ],
      mistakesHe: [
        "עיצוב ידני בתוך אזור-הנתונים ➔ נדרס ב-Refresh.",
        "אי-שמירת התצוגה ➔ עיצוב-מבנה אובד בפתיחה הבאה.",
        "צבעוניות עודפת ➔ פוגעת בקריאוּת במקום לעזור.",
      ],
      troubleshootHe: [
        "העיצוב נעלם אחרי Refresh ➔ הוא הוחל ידנית באזור-הנתונים; העבר ל-Sheet Options.",
        "Conditional formatting לא עובד ➔ הוחל מחוץ לאזור-הערכים או על תאי-Attribute.",
        "כותרות נעלמות בגלילה ➔ Freeze Panes לא הוגדר/לא נשמר.",
      ],
      bestPracticeHe: [
        "השתמש ב-Sheet Options ו-Local Members לעיצוב/חישובים שצריכים לשרוד רענון.",
        "תקנן ערכת-צבעים מרכזית ב-template אחד.",
        "הקפא תמיד שורת-כותרת ועמודות-מפתח.",
      ],
      interviewHe: [
        { qHe: "מדוע עיצוב-Excel ידני נעלם לפעמים ב-IBP?", aHe: "אזור-הנתונים מנוהל על-ידי ה-add-in ונשלף מחדש ב-Refresh; עיצוב ידני בתוכו נדרס. יש להשתמש ב-Sheet Options/Local Members." },
        { qHe: "איזה עיצוב נשמר עם favorite?", aHe: "עיצוב-מבנה כמו סדר-Attributes, רוחב-עמודות, Freeze Panes והגדרות-add-in נשמר עם התצוגה." },
      ],
      takeawaysHe: [
        "חלק מהעיצוב הוא Excel, חלק נשלט על-ידי ה-add-in.",
        "עיצוב ידני באזור-הנתונים נדרס ב-Refresh.",
        "השתמש ב-Sheet Options/Local Members לעיצוב-עמיד.",
      ],
      relatedHe: [
        { labelHe: "S&OP · אפשרויות-גיליון ו-Local Members (11.3.2)", href: "/library/sop/chapter-11/#sub-11.3.2" },
      ],
      children: [
        {
          id: "11.3.1",
          titleHe: "טיפים בסיסיים לפריסה",
          titleEn: "Basic Layout Tips",
          execHe:
            "פריסה-בסיסית טובה מבדילה בין עבר לעתיד, בין editable ל-read-only, ומקפיאה את הכותרות — היא ההפרש בין גריד מבלבל לתצוגה שאפשר לעבוד בה מהר.",
          beginnerHe:
            "כמה כללים פשוטים שהופכים תצוגה לנעימה לעבודה: הקפא את הכותרות, סדר את הזמן משמאל-לימין הגיוני, הרחב עמודות שצריך, וסמן בבירור איפה מותר לערוך.",
          consultantHe:
            "סדר ה-Attributes בשורות קובע קיבוץ; הצב את ה-Attribute הגס ביותר (למשל Product Group) ראשון. עמודות-הזמן צריכות periodicity אחיד. הקפא Header row + עמודות-Attribute. הבחן editable Key Figures מ-calculated באמצעות צבע/רקע (דרך Sheet Options). שמור את הכל ב-favorite כדי שהפריסה תשוחזר.",
          purposeHe:
            "לקצר את זמן-ההתמצאות של המתכנן ולמנוע טעויות-עריכה בעמודה/שורה שגויה.",
          processExampleHe:
            "מתכנן מסדר Product Group ► Product ► Customer בשורות, מקפיא כותרות, מרחיב את עמודת-המוצר, וצובע את ה-Key Figure העריך ברקע-בהיר — ואז Save Favorite.",
          scenarioHe:
            "בארגון הפריסה האחידה: Category ► Brand ► SKU בשורות, חודשים בעמודות, Consensus Demand עריך מודגש — אותו מבנה לכל המתכננים.",
          navHe: [
            "Excel ► View ► Freeze Panes",
            "Excel ► SAP IBP tab ► Planning View Configuration ► Attributes order",
            "Excel ► SAP IBP tab ► Sheet Options (הדגשת-עריכה)",
          ],
          tables: ["Attribute", "Key Figure", "Time Profile"],
          tcodes: ["SAP IBP Excel add-in"],
          fiori: ["Manage Favorites"],
          configHe: [
            "סדר-Attributes מהגס לפרטני בשורות.",
            "Freeze Panes לכותרת ולעמודות-מפתח.",
            "הדגשת editable מול read-only דרך Sheet Options.",
          ],
          flow: [
            { he: "סדר Attributes", code: "Rows" },
            { he: "Freeze Panes", code: "Freeze" },
            { he: "הדגשת editable", code: "Sheet Options" },
            { he: "שמירה", code: "Save Favorite" },
          ],
          mistakesHe: [
            "Attribute פרטני לפני גס ➔ קיבוץ מבלבל.",
            "אי-הקפאת כותרות ➔ אובדן-התמצאות בגלילה.",
            "אין הבחנה חזותית editable/read-only ➔ עריכה במקום שגוי.",
          ],
          troubleshootHe: [
            "קיבוץ-שורות לא-הגיוני ➔ סדר-Attributes שגוי.",
            "עמודות-זמן לא-מיושרות ➔ periodicity לא-אחיד.",
          ],
          bestPracticeHe: [
            "תמיד הקפא Header + עמודות-Attribute.",
            "סדר Attributes מהכללי לפרטי.",
            "סמן בבירור היכן מותר לערוך.",
          ],
          interviewHe: [
            { qHe: "כיצד הסדר של ה-Attributes משפיע על הפריסה?", aHe: "הוא קובע את היררכיית-הקיבוץ; ה-Attribute הראשון מקבץ את שאר השורות תחתיו." },
          ],
          takeawaysHe: [
            "הקפא כותרות ועמודות-מפתח.",
            "סדר Attributes מהגס לפרטני.",
            "הדגש editable מול read-only.",
          ],
        },
        {
          id: "11.3.2",
          titleHe: "אפשרויות-גיליון ו-Local Members",
          titleEn: "Sheet Options and Local Members",
          execHe:
            "Sheet Options הן הגדרות-תצוגה ברמת-הגיליון הנשלטות על-ידי ה-add-in, ו-Local Members הם שורות/עמודות-עזר מקומיות (חישובים/הערות) שמוסיפים לגריד מבלי לשנות נתונים ב-IBP — ושניהם שורדים Refresh.",
          beginnerHe:
            "Sheet Options הם 'הגדרות-התצוגה הרשמיות' של ה-add-in (למשל איך מציגים תאים ריקים). Local Member הוא 'שורה/עמודה משלך' שאתה מוסיף לחישוב או להערה — היא חיה רק בגיליון שלך ולא נשמרת ל-IBP, אבל היא לא נמחקת כשאתה שולף נתונים מחדש.",
          consultantHe:
            "Sheet Options כוללות זום, הצגת-אפסים, התנהגות-Refresh ופורמט-מספרים ברמת-הגיליון. Local Members הם אובייקטים מנוהלי-add-in: ניתן להגדיר Local Member מסוג formula (חישוב על Key Figures/תאים) או הערה; הם נשמרים עם ה-favorite ולא נדרסים ב-Refresh (בניגוד לנוסחת-Excel גולמית באזור-הנתונים). Local Members אינם מתפרסמים ב-Save Data — הם חישוב-תצוגה בלבד. הם המקום הנכון לנוסחאות-עזר, וניתן להזין אותם גם דרך VBA (ראה 11.6.1).",
          purposeHe:
            "להוסיף חישובים, יחסים והערות לתצוגה בצורה עמידה-לרענון, בלי לזהם את נתוני-IBP ובלי שהעבודה תאבד ב-Refresh.",
          processExampleHe:
            "מתכנן מוסיף Local Member מסוג formula שמחשב יחס \"Forecast / Sales History\" כעמודה חדשה ליד הנתונים; ב-Refresh הנתונים מתעדכנים והעמודה-המחושבת נשארת. הוא מכוון Sheet Options להסתיר אפסים. אף אחד מאלה לא נשלח ל-IBP ב-Save Data.",
          scenarioHe:
            "בארגון מתכנן מוסיף Local Member \"Forecast Accuracy %\" כעמודת-עזר לכל SKU, ו-Sheet Options מסתירות אפסים — תצוגה נקייה לישיבת-הביקוש, בלי לגעת בנתוני-IBP.",
          navHe: [
            "Excel ► SAP IBP tab ► Sheet Options",
            "Excel ► SAP IBP tab ► Local Member ► New (Formula / Comment)",
            "Excel ► SAP IBP tab ► Save Favorite",
          ],
          tables: ["Local Member", "Planning View Definition", "Key Figure"],
          tcodes: ["SAP IBP Excel add-in: Sheet Options / Local Members"],
          fiori: ["Manage Favorites"],
          configHe: [
            "Sheet Options: זום, הצגת-אפסים, התנהגות-Refresh, פורמט-מספרים ברמת-הגיליון.",
            "Local Member (Formula): חישוב-עזר על Key Figures/תאים, עמיד-לרענון.",
            "Local Member (Comment): הערות-עבודה הנשמרות עם התצוגה.",
            "Local Members אינם מתפרסמים ב-Save Data — חישוב-תצוגה בלבד.",
          ],
          flow: [
            { he: "כוונון Sheet Options", code: "Sheet Options" },
            { he: "הוספת Local Member", code: "New Local Member", note: "Formula/Comment" },
            { he: "Refresh", code: "Refresh", note: "ה-Local Member שורד" },
            { he: "שמירה", code: "Save Favorite" },
          ],
          masterDataHe: [
            "Local Members הם אובייקטי-תצוגה מקומיים — אינם Key Figures ב-IBP ואינם נשמרים ב-Planning Area.",
          ],
          mistakesHe: [
            "שימוש בנוסחת-Excel גולמית באזור-הנתונים במקום Local Member ➔ נדרסת ב-Refresh.",
            "ציפייה ש-Local Member יתפרסם ל-IBP ➔ הוא חישוב-תצוגה בלבד.",
            "אי-שמירת ה-favorite ➔ ה-Local Members אובדים.",
          ],
          troubleshootHe: [
            "העמודה-המחושבת נעלמת ב-Refresh ➔ זו נוסחת-Excel ולא Local Member.",
            "Local Member מחזיר שגיאה ➔ הפניה ל-Key Figure/תא לא-תקין בנוסחה.",
            "Sheet Option לא נשמרה ➔ לא בוצע Save Favorite.",
          ],
          bestPracticeHe: [
            "כל חישוב-עזר בתצוגה — דרך Local Member, לא נוסחת-Excel גולמית.",
            "כוון Sheet Options פעם-אחת ב-template האחיד.",
            "זכור: Local Members הם תצוגה בלבד; חישוב שצריך להישמר — Key Figure ב-IBP.",
          ],
          interviewHe: [
            { qHe: "מהו Local Member וכיצד הוא שונה מנוסחת-Excel רגילה?", aHe: "Local Member הוא חישוב/הערה מנוהל-add-in הנשמר עם התצוגה ושורד Refresh; נוסחת-Excel גולמית באזור-הנתונים נדרסת ברענון." },
            { qHe: "האם Local Member נשמר ל-IBP ב-Save Data?", aHe: "לא. הוא חישוב-תצוגה מקומי בלבד ואינו מתפרסם ל-Planning Area." },
          ],
          takeawaysHe: [
            "Sheet Options = הגדרות-תצוגה של ה-add-in, עמידות-לרענון.",
            "Local Members = חישובי/הערות-עזר עמידים-לרענון, לא נשמרים ל-IBP.",
            "תמיד העדף Local Member על נוסחת-Excel באזור-הנתונים.",
          ],
          relatedHe: [
            { labelHe: "S&OP · VBA לנוסחאות ב-Local Members (11.6.1)", href: "/library/sop/chapter-11/#sub-11.6.1" },
          ],
        },
        {
          id: "11.3.3",
          titleHe: "גיליון העיצוב של SAP IBP",
          titleEn: "SAP IBP Formatting Sheet",
          execHe:
            "SAP IBP Formatting Sheet הוא גיליון-עזר ייעודי שבו מגדירים כללי-עיצוב מרכזיים (צבעים, גבולות, פורמטים) שה-add-in מחיל אוטומטית על ה-planning view — מנגנון לעיצוב-אחיד ועמיד-לרענון במקום עיצוב ידני חוזר.",
          beginnerHe:
            "במקום לצבוע ולעצב כל פעם מחדש, יש 'גיליון-הוראות-עיצוב': כותבים בו פעם-אחת איך כל חלק צריך להיראות, וה-add-in מחיל זאת על התצוגה אוטומטית — וגם אחרי Refresh.",
          consultantHe:
            "ה-Formatting Sheet הוא worksheet נפרד בחוברת-העבודה שה-add-in מזהה ומשתמש בו ככללי-עיצוב לגריד: עיצוב לכותרות, ל-editable מול read-only Key Figures, לעמודות-עבר מול עתיד וכו'. הוא מאפשר לתקנן עיצוב ברמת-template ולהבטיח שכל פתיחה/רענון משחזרים את אותו מראה. זהו המקום הנכון לעיצוב-מערכתי, לעומת conditional formatting נקודתי או עיצוב ידני נדרס.",
          purposeHe:
            "לתקנן ולשמר עיצוב באופן מרכזי, עמיד-לרענון ואחיד בין כל המתכננים — בלי תחזוקת-עיצוב ידנית חוזרת.",
          processExampleHe:
            "key user מגדיר ב-Formatting Sheet: כותרות כחול-כהה, editable Key Figures רקע-לבן, calculated רקע-אפור, עמודות-עבר אפור-בהיר. כל מתכנן שפותח את ה-template מקבל את העיצוב אוטומטית, וגם אחרי Refresh.",
          scenarioHe:
            "בארגון ה-Formatting Sheet של ה-template הארגוני קובע: עבר=אפור, עתיד=לבן, חריגות=אדום. כך הדוחות לישיבת ה-S&OP נראים זהים בכל מדינה, בלי שמתכנן יעצב ידנית.",
          navHe: [
            "Excel ► SAP IBP tab ► Sheet Options ► Formatting Sheet (הפעלה/הצבעה)",
            "חוברת-העבודה ► גיליון Formatting Sheet ► הגדרת כללי-עיצוב",
            "Excel ► SAP IBP tab ► Save Template (הפצה)",
          ],
          tables: ["Formatting Sheet", "Planning View Definition", "Key Figure"],
          tcodes: ["SAP IBP Excel add-in: Formatting Sheet"],
          fiori: ["Manage Templates"],
          configHe: [
            "הפעלת Formatting Sheet בחוברת והצבעה אליו מתוך Sheet Options.",
            "הגדרת עיצוב לפי תפקיד-תא: כותרת, editable, calculated, עבר/עתיד.",
            "שמירה כ-template כדי שכל מתכנן יירש את העיצוב המרכזי.",
          ],
          flow: [
            { he: "יצירת Formatting Sheet", code: "Sheet Options" },
            { he: "הגדרת כללי-עיצוב", code: "Format Rules" },
            { he: "הצבעת ה-view ל-Formatting Sheet", code: "Link" },
            { he: "שמירה והפצה", code: "Save Template" },
          ],
          mistakesHe: [
            "עיצוב ידני חוזר במקום Formatting Sheet ➔ חוסר-אחידות ועומס-תחזוקה.",
            "שכחת לקשר את ה-view ל-Formatting Sheet ➔ הכללים לא מוחלים.",
            "אי-הפצה כ-template ➔ רק מתכנן-אחד נהנה מהעיצוב.",
          ],
          troubleshootHe: [
            "כללי-העיצוב לא מוחלים ➔ ה-Formatting Sheet לא מופעל/לא מקושר ב-Sheet Options.",
            "עיצוב שונה בין מתכננים ➔ עובדים מ-favorites ישנים ולא מה-template עם ה-Formatting Sheet.",
          ],
          bestPracticeHe: [
            "רכז את כל העיצוב-המערכתי ב-Formatting Sheet אחד ברמת-template.",
            "השתמש ב-Formatting Sheet לעיצוב-מבני; שמור conditional formatting לחריגות נקודתיות.",
            "הפץ דרך template אחד מנוהל מרכזית.",
          ],
          interviewHe: [
            { qHe: "מהו SAP IBP Formatting Sheet ומה היתרון שלו?", aHe: "גיליון-עזר בחוברת המגדיר כללי-עיצוב שה-add-in מחיל אוטומטית על התצוגה — עיצוב אחיד, עמיד-לרענון ומנוהל-מרכזית, בלי עיצוב ידני חוזר." },
            { qHe: "מה ההבדל בין Formatting Sheet ל-conditional formatting?", aHe: "Formatting Sheet הוא עיצוב-מבני-מערכתי (כותרות/editable/עבר-עתיד) לכל התצוגה; conditional formatting הוא סימון-חריגות נקודתי לפי-ערך." },
          ],
          takeawaysHe: [
            "Formatting Sheet = כללי-עיצוב מרכזיים שה-add-in מחיל אוטומטית.",
            "עמיד-לרענון ואחיד בין מתכננים.",
            "הפץ דרך template; שמור CF לחריגות.",
          ],
          relatedHe: [
            { labelHe: "S&OP · עיצוב תצוגות (11.3)", href: "/library/sop/chapter-11/#sub-11.3" },
          ],
        },
      ],
    },
    // ============================================================ 11.4
    {
      id: "11.4",
      titleHe: "שימוש בגרפים",
      titleEn: "Using Charts",
      execHe:
        "גרפים הופכים את מספרי-התכנון לתובנה חזותית. ב-IBP אפשר ליצור גרף ישירות מתוך ה-planning view ב-Excel (Create Chart) או דרך Analytics charts ב-Web UI/Planner Workspaces. הגרף מסביר מגמות, פערים בין תחזית-לבפועל וחריגות — מהר יותר מטבלה.",
      beginnerHe:
        "מספרים בטבלה קשים לקריאה-מהירה; גרף מראה מיד אם התחזית עולה או יורדת, ואיפה יש פער מול המכירות-בפועל. ב-IBP אתה מסמן את הנתונים בגריד ולוחץ 'צור גרף', או מוסיף גרף-אנליטיקה במסך-הדפדפן.",
      consultantHe:
        "ב-Excel: Create Chart בונה גרף מקושר לאזור-הגריד; מאחר שהגריד מתרענן, יש להבטיח שהגרף מצביע על הטווח-הנכון אחרי Refresh (לכן עדיף להישען על Local Members/טווח-יציב). ב-Web UI: Analytics charts מבוססים על Key Figures והגדרת-Chart (סוג, צירים, סדרות) ונכנסים כ-Analytics Chart cards ל-Planner Workspaces. בחירת סוג-הגרף (line למגמות, bar להשוואות, combo לתחזית-מול-בפועל) קריטית למסר.",
      purposeHe:
        "לתרגם נתוני-תכנון לסיפור חזותי — מגמות, עונתיות, פערי-תחזית — כדי לתמוך בהחלטות ובישיבת ה-S&OP.",
      processExampleHe:
        "מתכנן מסמן בגריד את Statistical Forecast ו-Sales History לאורך 12 חודשים, לוחץ Create Chart ובוחר combo (קו לתחזית, עמודות לבפועל); הגרף חושף עונתיות ופער-תחזית. בישיבה הוא מציג Analytics chart מקביל ב-Planner Workspace.",
      scenarioHe:
        "בארגון מציגים בישיבת ה-S&OP גרף-קו של Consensus Demand מול Sales History לפי חודש, ועמודות של Forecast Accuracy לפי SKU — הגרפים הם שפת-ההחלטה של הצוות.",
      navHe: [
        "Excel ► SAP IBP tab ► Create Chart (מתוך הגריד)",
        "Web UI ► Analytics ► Create Chart",
        "Planner Workspace ► Add Card ► Analytics Chart",
      ],
      tables: ["Analytics Chart", "Key Figure", "Planning Area"],
      tcodes: ["SAP IBP Excel add-in: Create Chart", "Web UI: Analytics"],
      fiori: ["Analytics", "Planner Workspaces"],
      configHe: [
        "Create Chart ב-Excel: בחירת טווח-נתונים, סוג-גרף וסדרות; הגרף מקושר לגריד.",
        "Analytics chart ב-Web UI: בחירת Key Figures, סוג-גרף, צירים וסדרות.",
        "Add to Planner Workspace: שילוב הגרף כ-card בסביבת-העבודה.",
        "בחירת סוג: line=מגמות, bar=השוואות, combo=תחזית-מול-בפועל.",
      ],
      flow: [
        { he: "סימון נתונים בגריד / בחירת KFs", code: "Select" },
        { he: "יצירת גרף", code: "Create Chart" },
        { he: "בחירת סוג וסדרות", code: "Chart Type" },
        { he: "הוספה ל-workspace (אופ')", code: "Add Card" },
      ],
      mistakesHe: [
        "גרף-Excel מצביע על טווח-קבוע ➔ אחרי Refresh מציג נתונים שגויים.",
        "סוג-גרף לא-מתאים למסר (pie לסדרת-זמן) ➔ תובנה מעוותת.",
        "יותר מדי סדרות בגרף אחד ➔ עומס ויזואלי.",
      ],
      troubleshootHe: [
        "הגרף לא מתעדכן עם הנתונים ➔ הטווח לא תואם את אזור-הגריד אחרי Refresh.",
        "סדרה חסרה ➔ ה-Key Figure לא נכלל בבחירה/בטווח.",
        "Analytics chart ריק ➔ Filters/Key Figure לא תואמים נתונים קיימים.",
      ],
      bestPracticeHe: [
        "התאם סוג-גרף למסר: line למגמה, bar להשוואה, combo לתחזית-מול-בפועל.",
        "בנה גרפי-Web (Analytics) לשיתוף ב-Planner Workspaces.",
        "הישען על טווח-יציב/Local Members כדי שגרפי-Excel ישרדו Refresh.",
      ],
      interviewHe: [
        { qHe: "מהן שתי הדרכים ליצור גרף ב-IBP?", aHe: "Create Chart מתוך ה-planning view ב-Excel add-in, או Analytics chart ב-Web UI שניתן לשבץ כ-card ב-Planner Workspace." },
        { qHe: "מדוע גרף-Excel עלול להציג נתונים שגויים אחרי Refresh?", aHe: "אם הוא מצביע על טווח-תאים קבוע שאינו תואם את אזור-הגריד המתחדש; עדיף טווח-יציב או Local Members." },
      ],
      takeawaysHe: [
        "גרפים = תובנה-חזותית מהירה מנתוני-תכנון.",
        "Excel: Create Chart; Web UI: Analytics charts ל-Planner Workspaces.",
        "סוג-הגרף נבחר לפי המסר.",
      ],
      relatedHe: [
        { labelHe: "S&OP · Planner Workspaces (11.2)", href: "/library/sop/chapter-11/#sub-11.2" },
      ],
    },
    // ============================================================ 11.5
    {
      id: "11.5",
      titleHe: "גיליונות נתוני-אב (Master Data Worksheets)",
      titleEn: "Master Data Worksheets",
      execHe:
        "נתוני-אב (Master Data) — מוצרים, לקוחות, מיקומים והקשרים ביניהם — הם התשתית שעליה נשענות כל תצוגות-התכנון. ב-IBP מתחזקים אותם בכמה דרכים: Master Data workbook ב-Excel add-in, יצירת planning objects, ואפליקציית ה-Master Data ב-Web UI. נתוני-אב שגויים = תצוגות-תכנון שגויות.",
      beginnerHe:
        "לפני שמתכננים ביקוש למוצר, IBP צריך לדעת שהמוצר בכלל קיים, לאיזה לקוח ולאיזה מיקום הוא שייך. כל אלה הם 'נתוני-אב'. בלי שורה של נתוני-אב למוצר, לא תוכל להזין לו תחזית בתצוגה.",
      consultantHe:
        "Master Data ב-IBP מוגדר ב-Master Data Types (Simple/Compound/Reference) המאכלסים Attributes. תחזוקה: (1) Master Data workbook ב-Excel — שליפה/עריכה/העלאה המונית של רשומות-אב; (2) יצירת planning objects — קומבינציות-Attributes התקפות שמרכיבות את מרחב-התכנון; (3) Master Data app ב-Web UI לעריכה אינטראקטיבית. Key Figure data נשען על קיום planning objects תואמים; חוסר-התאמה בין נתוני-אב לנתוני-Key-Figure הוא מקור-תקלות נפוץ. אינטגרציה גדולה נעשית דרך CI-DS/staging, אך ה-Excel workbook הוא הכלי היומיומי.",
      purposeHe:
        "להבטיח שמרחב-התכנון (אילו צירופי מוצר/לקוח/מיקום קיימים) מוגדר נכון ומלא — בלעדיו אין היכן לאחסן או להזין מספרי-תכנון.",
      processExampleHe:
        "key user פותח Master Data workbook, שולף את Product, מוסיף SKU חדש עם Attributes (Product Group, UoM), מעלה (Save), ואז יוצר planning objects לצירוף SKU×Customer×Location כדי שאפשר יהיה להזין לו תחזית בתצוגה.",
      scenarioHe:
        "בארגון השקת-מוצר חדש מתחילה ב-Master Data: מוסיפים את ה-SKU ל-Product, מקשרים ל-Brand/Category, ויוצרים planning objects לכל רשת-קמעונאות רלוונטית — רק אז המתכנן יכול להזין תחזית בתצוגתו.",
      navHe: [
        "Excel ► SAP IBP tab ► Master Data Workbook ► New",
        "Web UI ► Master Data (Manage Master Data app)",
        "Web UI ► Configuration ► Master Data Types",
      ],
      tables: ["Master Data Type", "Planning Object", "Attribute", "Planning Area"],
      tcodes: ["SAP IBP Excel add-in: Master Data Workbook", "Web UI: Manage Master Data"],
      fiori: ["Manage Master Data", "Application Jobs"],
      configHe: [
        "Master Data Types (Simple/Compound/Reference) ו-Attributes מוגדרים בקונפיגורציה.",
        "Master Data workbook ב-Excel: שליפה/עריכה/העלאה המונית.",
        "Planning objects: צירופי-Attributes תקפים המרכיבים את מרחב-התכנון.",
        "Manage Master Data app: עריכה אינטראקטיבית ב-Web UI.",
      ],
      flow: [
        { he: "הגדרת Master Data Types", code: "Config" },
        { he: "תחזוקת רשומות-אב", code: "MD Workbook", note: "Excel" },
        { he: "יצירת planning objects", code: "Planning Objects" },
        { he: "כעת אפשר להזין Key Figures", code: "Planning View" },
      ],
      masterDataHe: [
        "Master Data Types מאכלסים Attributes; planning objects = צירופי-Attributes התקפים.",
        "נתוני-Key-Figure תלויים בקיום planning objects תואמים.",
      ],
      mistakesHe: [
        "הזנת תחזית בלי planning object תואם ➔ אין היכן לאחסן את הערך.",
        "אי-התאמה בין נתוני-אב לנתוני-Key-Figure ➔ ערכים 'תלויים-באוויר'.",
        "עריכה ידנית נקודתית במקום Master Data workbook לעדכון-המונים.",
      ],
      troubleshootHe: [
        "לא ניתן להזין תחזית ל-SKU ➔ חסר planning object לצירוף הנדרש.",
        "רשומת-אב לא מופיעה בתצוגה ➔ Attribute חסר/לא-תואם ל-Planning Area.",
        "העלאת workbook נכשלה ➔ ערכי-Attribute לא-תקינים או שדות-חובה ריקים.",
      ],
      bestPracticeHe: [
        "תחזק נתוני-אב לפני נתוני-Key-Figure — סדר-הפעולות חשוב.",
        "השתמש ב-Master Data workbook לעדכונים-המונים, ב-app לנקודתיים.",
        "ודא יצירת planning objects לכל צירוף שצריך להיות מתוכנן.",
      ],
      interviewHe: [
        { qHe: "מהו planning object ולמה הוא הכרחי?", aHe: "צירוף-Attributes תקף (למשל Product×Customer×Location) המגדיר נקודה במרחב-התכנון; בלעדיו אין היכן לאחסן או להזין Key Figure data." },
        { qHe: "מהן הדרכים לתחזק נתוני-אב ב-IBP?", aHe: "Master Data workbook ב-Excel add-in (המוני), Manage Master Data app ב-Web UI (אינטראקטיבי), ואינטגרציה דרך CI-DS/staging." },
      ],
      takeawaysHe: [
        "נתוני-אב הם תשתית כל תצוגת-תכנון.",
        "planning objects מגדירים מרחב-תכנון; בלעדיהם אין היכן להזין.",
        "תחזק נתוני-אב לפני נתוני-Key-Figure.",
      ],
      relatedHe: [
        { labelHe: "S&OP · יצירת תצוגה (11.1.1)", href: "/library/sop/chapter-11/#sub-11.1.1" },
      ],
      children: [
        {
          id: "11.5.1",
          titleHe: "חוברות נתוני-אב (Master Data Workbooks)",
          titleEn: "Master Data Workbooks",
          execHe:
            "Master Data workbook הוא תצוגת-Excel ייעודית לנתוני-אב: שולפים רשומות-אב (Product, Customer, Location), עורכים אותן בגריד ומעלים חזרה ל-IBP — הכלי היומיומי לתחזוקת-אב המונית מתוך ה-Excel add-in.",
          beginnerHe:
            "כמו planning view, אבל במקום מספרי-תכנון אתה רואה ועורך את רשומות-האב עצמן — שמות-מוצרים, קודים, שיוכים. נוח כי אפשר לערוך הרבה שורות בבת-אחת ב-Excel ולהעלות.",
          consultantHe:
            "ב-New Master Data Workbook בוחרים Master Data Type ו-Attributes, שולפים את הרשומות לגריד, עורכים/מוסיפים שורות, ולוחצים Save להעלאה (upsert) ל-IBP. ה-add-in מאמת שדות-חובה וערכי-Attribute. שונה מ-planning view: כאן עורכים את הרשומות עצמן, לא Key Figures. לעדכוני-ענק עדיף CI-DS/Data Integration, אך ה-workbook אידאלי לתחזוקה-שוטפת ולהוספות-ידניות.",
          purposeHe:
            "לאפשר ל-key user/מתכנן לתחזק נתוני-אב במהירות-ובהמוניות מתוך Excel המוכר, בלי כלי-אינטגרציה.",
          processExampleHe:
            "key user פותח Master Data Workbook ל-Product, שולף 500 SKUs, מתקן Attribute שגוי ב-30 שורות בבת-אחת, מוסיף 3 SKUs חדשים, ולוחץ Save — ה-add-in מעלה ומאמת.",
          scenarioHe:
            "בארגון לקראת עונת-קיץ מוסיפים עשרות SKUs חדשים דרך Master Data Workbook אחד — שורה לכל מוצר עם Brand/Category/UoM — במקום הזנה אחת-אחת ב-Web UI.",
          navHe: [
            "Excel ► SAP IBP tab ► Master Data ► New Workbook",
            "Master Data Workbook ► Select Master Data Type + Attributes",
            "Master Data Workbook ► Save (Upload)",
          ],
          tables: ["Master Data Type", "Attribute"],
          tcodes: ["SAP IBP Excel add-in: Master Data Workbook"],
          fiori: ["Manage Master Data"],
          configHe: [
            "בחירת Master Data Type ו-Attributes לשליפה.",
            "עריכה המונית בגריד-Excel; הוספת שורות חדשות.",
            "Save = upsert ל-IBP עם אימות שדות-חובה.",
          ],
          flow: [
            { he: "New Master Data Workbook", code: "Select Type" },
            { he: "שליפת רשומות", code: "Refresh" },
            { he: "עריכה/הוספה המונית", code: "Edit" },
            { he: "העלאה", code: "Save" },
          ],
          masterDataHe: [
            "ה-workbook עורך את רשומות-האב עצמן (Attributes), לא Key Figures.",
          ],
          mistakesHe: [
            "השארת שדה-חובה ריק בשורה חדשה ➔ כשל-העלאה.",
            "ערך-Attribute לא-חוקי ➔ דחיית-שורה ב-Save.",
            "שימוש ב-workbook לעדכוני-ענק שמתאימים יותר ל-CI-DS.",
          ],
          troubleshootHe: [
            "Save נכשל ➔ שדות-חובה ריקים או ערכי-Attribute לא-חוקיים — בדוק את הודעות-האימות.",
            "שורה לא נשמרה ➔ מפתח-אב כפול או הפניה ל-Attribute לא-קיים.",
          ],
          bestPracticeHe: [
            "השתמש ב-workbook לתחזוקה-שוטפת והוספות; ל-מיגרציה גדולה — CI-DS.",
            "אמת ערכי-Attribute מול רשימות-ערכים מוסכמות לפני Save.",
            "שלוף רק את ה-Attributes שאתה צריך לערוך — גריד נקי.",
          ],
          interviewHe: [
            { qHe: "במה Master Data Workbook שונה מ-planning view?", aHe: "ה-workbook עורך את רשומות-האב עצמן (Attributes של Product/Customer/Location), בעוד planning view עורך Key Figure data." },
            { qHe: "מתי תעדיף CI-DS על Master Data Workbook?", aHe: "לעדכוני-ענק/מיגרציה מתמשכת ואוטומטית; ה-workbook מתאים לתחזוקה-שוטפת ולהוספות-ידניות." },
          ],
          takeawaysHe: [
            "Master Data Workbook = עריכת-אב המונית ב-Excel.",
            "עורך Attributes, לא Key Figures.",
            "Save = upsert עם אימות; ל-ענק העדף CI-DS.",
          ],
        },
        {
          id: "11.5.2",
          titleHe: "יצירת אובייקטי-תכנון (Planning Object Creation)",
          titleEn: "Planning Object Creation",
          execHe:
            "Planning object הוא צירוף-Attributes תקף (למשל Product×Customer×Location) המגדיר נקודה במרחב-התכנון. יצירתו היא תנאי-הכרחי: רק לצירוף שקיים כ-planning object אפשר להזין ולאחסן Key Figure data.",
          beginnerHe:
            "תחזית תמיד שייכת ל'צירוף' — למשל מוצר X, ללקוח Y, במיקום Z. צירוף כזה הוא planning object. אם הצירוף לא נוצר, אין 'תא' שבו לשמור את התחזית, וה-IBP לא ייתן להזין.",
          consultantHe:
            "planning objects נוצרים מצירופי-Attributes תקפים — דרך Master Data workbook (טבלת-צירופים), דרך ה-Master Data app, או נגזרים אוטומטית מנתוני-מכר היסטוריים בעת אינטגרציה. הם מגדירים את ה-base level של מרחב-התכנון; Key Figures מאוחסנים ברמתם ומצטברים מעלה לפי ההיררכיה. חוסר planning object לצירוף נדרש = ערך 'נופל' או חסום. ניקוי planning objects מיותרים חשוב לביצועים.",
          purposeHe:
            "להגדיר במדויק אילו צירופים ניתנים-לתכנון — לפתוח 'תאי-אחסון' ל-Key Figure data ולמנוע מרחב-תכנון מנופח.",
          processExampleHe:
            "אחרי הוספת SKU חדש, key user יוצר planning objects לצירוף SKU×כל-רשת-קמעונאות×מרכז-הפצה; כעת המתכנן יכול להזין Consensus Demand לכל צירוף בתצוגתו.",
          scenarioHe:
            "בארגון השקת-מוצר: לכל SKU חדש יוצרים planning objects רק לרשתות-הקמעונאות שבהן יימכר — לא לכולן — כדי לשמור על מרחב-תכנון רזה ומהיר.",
          navHe: [
            "Excel ► SAP IBP tab ► Master Data Workbook (צירופי-Attributes)",
            "Web UI ► Manage Master Data ► Create Planning Object",
            "Web UI ► Application Jobs (יצירה/ניקוי המוני)",
          ],
          tables: ["Planning Object", "Attribute", "Master Data Type"],
          tcodes: ["SAP IBP Excel add-in: Master Data Workbook", "Web UI: Manage Master Data"],
          fiori: ["Manage Master Data", "Application Jobs"],
          configHe: [
            "צירופי-Attributes התקפים מרכיבים planning object ברמת-base.",
            "יצירה דרך Master Data workbook / Master Data app / נגזרת מהיסטוריה.",
            "Key Figures מאוחסנים ב-base level ומצטברים מעלה לפי ההיררכיה.",
          ],
          flow: [
            { he: "בחירת צירוף-Attributes", code: "Combination" },
            { he: "יצירת planning object", code: "Create" },
            { he: "פתיחת 'תא-אחסון'", code: "Base Level" },
            { he: "הזנת Key Figure", code: "Planning View" },
          ],
          masterDataHe: [
            "planning object = צירוף-Attributes ברמת-base; הוא 'הכתובת' של כל Key Figure value.",
          ],
          mistakesHe: [
            "אי-יצירת planning object לצירוף נדרש ➔ אי-אפשר להזין תחזית.",
            "יצירת צירופים מיותרים (כל מוצר × כל לקוח) ➔ מרחב-תכנון מנופח ואיטי.",
            "ציפייה שהזנת-ערך תיצור צירוף לבד ➔ לא קורה אוטומטית.",
          ],
          troubleshootHe: [
            "הזנת-תחזית חסומה ➔ חסר planning object לצירוף.",
            "ביצועים איטיים ➔ ריבוי planning objects מיותרים — נקה.",
            "ערך 'נעלם' אחרי Save ➔ הצירוף לא קיים כ-planning object תקף.",
          ],
          bestPracticeHe: [
            "צור planning objects רק לצירופים שבאמת מתוכננים.",
            "נקה צירופים מיותרים תקופתית לשמירת-ביצועים.",
            "נצל יצירה-נגזרת-מהיסטוריה לאתחול מהיר.",
          ],
          interviewHe: [
            { qHe: "מהו planning object ולמה הוא קודם להזנת-נתונים?", aHe: "צירוף-Attributes תקף המגדיר נקודת-base במרחב-התכנון; ללא קיומו אין 'תא' לאחסון Key Figure data ולכן אי-אפשר להזין." },
            { qHe: "מדוע ריבוי planning objects פוגע בביצועים?", aHe: "כל צירוף מנפח את מרחב-התכנון ואת נפח-האחסון/האגרגציה; יש ליצור רק צירופים נדרשים ולנקות מיותרים." },
          ],
          takeawaysHe: [
            "planning object = צירוף-Attributes = 'כתובת' לכל Key Figure.",
            "תנאי-הכרחי להזנת-נתונים.",
            "צור רק נדרשים ונקה מיותרים לביצועים.",
          ],
          relatedHe: [
            { labelHe: "S&OP · גיליונות נתוני-אב (11.5)", href: "/library/sop/chapter-11/#sub-11.5" },
          ],
        },
        {
          id: "11.5.3",
          titleHe: "אפליקציית נתוני-האב (Master Data App)",
          titleEn: "Master Data App",
          execHe:
            "ה-Manage Master Data app ב-Web UI הוא הממשק האינטראקטיבי לתחזוקת נתוני-אב בדפדפן: חיפוש, עריכה, יצירה ומחיקה של רשומות-אב ו-planning objects — חלופה ל-Excel workbook לעבודה נקודתית ולמשתמשים ללא add-in.",
          beginnerHe:
            "אותה תחזוקת-אב, אבל מתוך הדפדפן במקום Excel. נוח לתיקון-מהיר של רשומה בודדת או כשאין לך את ה-add-in מותקן.",
          consultantHe:
            "ה-app מאפשר חיפוש לפי Master Data Type, עריכת-שדות, יצירת-רשומות ו-planning objects, ומחיקה — עם אימות-Attributes כמו ב-workbook. הוא חלק מ-Web UI ולכן זמין בכל דפדפן ללא התקנה. מתאים לעריכה אינטראקטיבית-נקודתית ולבקרה; לעדכוני-המונים עדיין עדיף Master Data workbook או CI-DS. שינויים נכנסים-לתוקף מיד ומשפיעים על תצוגות-התכנון.",
          purposeHe:
            "לספק תחזוקת-אב נגישה מהדפדפן — לתיקונים נקודתיים, לבקרה ולמשתמשים שאינם עובדים ב-Excel.",
          processExampleHe:
            "key user מקבל דיווח על קוד-מוצר שגוי, פותח Manage Master Data app, מחפש את ה-SKU, מתקן את ה-Attribute ושומר — התיקון משתקף מיד בתצוגות-התכנון.",
          scenarioHe:
            "בארגון מנהל-נתונים מתקן מהר שיוך-Brand שגוי ל-SKU דרך ה-Master Data app מהדפדפן, בלי לפתוח Excel — והמתכננים רואים את התיקון מיד.",
          navHe: [
            "Web UI ► Manage Master Data (חיפוש/עריכה/יצירה)",
            "Manage Master Data ► Select Master Data Type",
            "Manage Master Data ► Create / Edit / Delete",
          ],
          tables: ["Master Data Type", "Planning Object", "Attribute"],
          tcodes: ["Web UI: Manage Master Data"],
          fiori: ["Manage Master Data"],
          configHe: [
            "בחירת Master Data Type וחיפוש-רשומות בדפדפן.",
            "עריכה/יצירה/מחיקה אינטראקטיבית עם אימות-Attributes.",
            "שינויים נכנסים-לתוקף מיד ומשפיעים על התצוגות.",
          ],
          flow: [
            { he: "פתיחת Manage Master Data", code: "Web UI" },
            { he: "בחירת Type + חיפוש", code: "Search" },
            { he: "עריכה/יצירה/מחיקה", code: "Edit" },
            { he: "שמירה (תוקף מיידי)", code: "Save" },
          ],
          masterDataHe: [
            "ה-app מתחזק את אותם Master Data Types ו-planning objects כמו ה-workbook, אך אינטראקטיבית בדפדפן.",
          ],
          mistakesHe: [
            "שימוש ב-app לעדכוני-המונים ➔ איטי מול Master Data workbook.",
            "מחיקת רשומת-אב בשימוש ➔ ערכי-Key-Figure תלויים 'נופלים'.",
            "עריכה ללא בקרת-הרשאות ➔ שינוי לא-מבוקר בנתוני-אב.",
          ],
          troubleshootHe: [
            "לא ניתן לשמור ➔ אימות-Attribute נכשל או שדה-חובה ריק.",
            "רשומה לא נמצאת בחיפוש ➔ Master Data Type שגוי או מסנן-חיפוש צר.",
            "מחיקה חסומה ➔ קיימות תלויות (planning objects/Key Figure data).",
          ],
          bestPracticeHe: [
            "השתמש ב-app לתיקונים-נקודתיים; ב-workbook/CI-DS להמונים.",
            "הגבל הרשאות-עריכת-אב ל-key users.",
            "בדוק תלויות לפני מחיקת רשומת-אב.",
          ],
          interviewHe: [
            { qHe: "מתי תעדיף את Manage Master Data app על Master Data workbook?", aHe: "לתיקונים-נקודתיים אינטראקטיביים בדפדפן, ולמשתמשים ללא ה-Excel add-in; ל-המונים עדיף ה-workbook או CI-DS." },
            { qHe: "מה הסיכון במחיקת רשומת-אב?", aHe: "ערכי-Key-Figure ו-planning objects התלויים בה עלולים 'ליפול'; יש לבדוק תלויות לפני מחיקה." },
          ],
          takeawaysHe: [
            "Manage Master Data app = תחזוקת-אב אינטראקטיבית בדפדפן.",
            "מתאים לנקודתי; להמונים — workbook/CI-DS.",
            "שינויים מיידיים; הגבל הרשאות ובדוק תלויות.",
          ],
          relatedHe: [
            { labelHe: "S&OP · חוברות נתוני-אב (11.5.1)", href: "/library/sop/chapter-11/#sub-11.5.1" },
          ],
        },
      ],
    },
    // ============================================================ 11.6
    {
      id: "11.6",
      titleHe: "שימוש ב-Microsoft Visual Basic for Applications",
      titleEn: "Using Microsoft Visual Basic for Applications",
      execHe:
        "VBA (Visual Basic for Applications) הוא שפת-המאקרו של Excel, וניתן לרתום אותה כדי להרחיב את ה-IBP Excel add-in: אוטומציה של נוסחאות ב-Local Members, ו-'hooks' — נקודות-עיגון שבהן הקוד מופעל אוטומטית בעקבות פעולות-add-in (כמו Refresh או Save Data). זה מאפשר התאמות שאינן זמינות בתצורה-סטנדרטית.",
      beginnerHe:
        "VBA הוא 'תכנות-בתוך-Excel' שמאפשר להקליט/לכתוב מאקרו שעושה דברים אוטומטית. ב-IBP אפשר להשתמש בו כדי שדברים יקרו לבד — למשל להוסיף נוסחאות אוטומטית, או להריץ קוד מיד אחרי ששלפת נתונים.",
      consultantHe:
        "ה-add-in חושף ממשק-תכנות ש-VBA יכול לקרוא לו (למשל הפעלת Refresh/Save Data, גישה ל-planning view וקריאה/כתיבה ל-Local Members), וכן 'hooks' — שגרות VBA בעלות-שם-מוסכם שה-add-in מזמן אוטומטית אחרי אירועים (post-Refresh, pre/post-Save). כך אפשר לאוטמט הזנת-Local-Members, ולידציות, או עיצוב לאחר כל רענון. שימוש זה דורש משמעת: קוד-VBA חי בחוברת ועלול להישבר בעדכוני-add-in; יש לתעד, לטפל-בשגיאות, ולהפעיל hooks רק היכן שצריך כדי לא לפגוע בביצועים.",
      purposeHe:
        "להרחיב את ה-add-in מעבר לתצורה-הסטנדרטית: אוטומציה חוזרת, ולידציות-מותאמות והזרקת-לוגיקה בנקודות-אירוע — לחיסכון-זמן ולאחידות.",
      processExampleHe:
        "key user כותב מאקרו-VBA שמופעל אחרי Refresh, מוסיף אוטומטית Local Member \"Forecast Accuracy %\" לכל SKU בגריד ומעצב אותו — כך המתכנן לא צריך להוסיפו ידנית בכל פתיחה.",
      scenarioHe:
        "בארגון ה-key user בונה מאקרו-VBA המחובר ל-hook של post-Refresh: הוא מזריק Local Members של KPIs (Accuracy, Bias) ומחיל את עיצוב-ה-Formatting-Sheet — כל מתכנן מקבל תצוגה אחידה ומחושבת אוטומטית.",
      navHe: [
        "Excel ► Developer ► Visual Basic (עורך-VBA)",
        "Excel ► Developer ► Macros",
        "VBA Editor ► מודול ► קריאה ל-IBP add-in API / הגדרת hooks",
      ],
      tables: ["Local Member", "Planning View Definition", "Macro / VBA Module"],
      tcodes: ["Excel VBA Editor", "SAP IBP Excel add-in API"],
      fiori: [],
      configHe: [
        "הפעלת לשונית Developer ושמירת החוברת כ-.xlsm (תומכת-מאקרו).",
        "כתיבת מאקרו הקורא ל-IBP add-in API (Refresh/Save/Local Members).",
        "הגדרת hooks — שגרות בעלות-שם-מוסכם שה-add-in מזמן אחרי אירועים.",
        "טיפול-בשגיאות ותיעוד — קוד-VBA חי בחוברת.",
      ],
      flow: [
        { he: "הפעלת Developer + .xlsm", code: "Setup" },
        { he: "כתיבת מאקרו", code: "VBA" },
        { he: "קריאה ל-add-in API / hook", code: "API/Hook" },
        { he: "הרצה אוטומטית אחרי אירוע", code: "post-Refresh/Save" },
      ],
      mistakesHe: [
        "שמירה כ-.xlsx ➔ המאקרו אובד.",
        "hooks כבדים בכל Refresh ➔ פגיעה-בביצועים.",
        "קוד ללא טיפול-בשגיאות ➔ קריסת ה-add-in/Excel.",
        "תלות עיוורת ב-API פנימי ➔ שבירה בעדכון-add-in.",
      ],
      troubleshootHe: [
        "המאקרו לא רץ ➔ מאקרו מושבת/חוברת לא-.xlsm או הגדרות-אבטחת-מאקרו.",
        "ה-hook לא מופעל ➔ שם-השגרה אינו תואם את המוסכמה הצפויה של ה-add-in.",
        "ה-add-in קורס אחרי Refresh ➔ שגיאת-VBA ב-hook; הוסף error handling.",
      ],
      bestPracticeHe: [
        "השתמש ב-VBA רק כשהתצורה-הסטנדרטית לא מספיקה.",
        "תעד, גרסֵן וטפל-בשגיאות בכל מאקרו.",
        "הפעל hooks רק היכן שנדרש כדי לשמור על ביצועים.",
        "בדוק תאימות אחרי כל עדכון-add-in.",
      ],
      interviewHe: [
        { qHe: "כיצד VBA מרחיב את ה-IBP Excel add-in?", aHe: "דרך קריאה ל-API של ה-add-in (Refresh/Save/Local Members) ודרך hooks — שגרות שה-add-in מזמן אוטומטית אחרי אירועים — לאוטומציה, ולידציות והזרקת-לוגיקה." },
        { qHe: "מהם הסיכונים בשימוש ב-VBA מול ה-add-in?", aHe: "הקוד חי בחוברת ועלול להישבר בעדכוני-add-in, hooks כבדים פוגעים בביצועים, וקוד ללא error handling עלול להקריס את ה-add-in." },
      ],
      takeawaysHe: [
        "VBA מרחיב את ה-add-in מעבר לתצורה-הסטנדרטית.",
        "שני שימושים: אוטומציה של Local Members, ו-hooks לאירועים.",
        "דורש .xlsm, error handling ובדיקת-תאימות.",
      ],
      relatedHe: [
        { labelHe: "S&OP · Local Members (11.3.2)", href: "/library/sop/chapter-11/#sub-11.3.2" },
      ],
      children: [
        {
          id: "11.6.1",
          titleHe: "VBA לנוסחאות ב-Local Members",
          titleEn: "VBA for Formulas in Local Members",
          execHe:
            "שימוש נפוץ ב-VBA הוא הזרקה-אוטומטית של נוסחאות ל-Local Members: במקום שהמתכנן יוסיף ידנית עמודות-חישוב בכל פתיחה, מאקרו מוסיף ומעדכן אותן אוטומטית — אחידות וחיסכון-זמן.",
          beginnerHe:
            "אם אתה תמיד מוסיף את אותה עמודת-חישוב (למשל אחוז-דיוק) לתצוגה, מאקרו-VBA יכול להוסיף אותה בשבילך אוטומטית בכל פעם — כ-Local Member, כך שהיא גם שורדת Refresh.",
          consultantHe:
            "המאקרו ניגש ל-API של ה-add-in ויוצר/מעדכן Local Members מסוג formula — קובע את ביטוי-הנוסחה (על Key Figures/תאים), המיקום וההיקף (לכל שורה/SKU). מומלץ לחבר זאת ל-hook של post-Refresh (11.6.2) כדי שהנוסחאות יתעדכנו אחרי כל שליפה. כך מקבלים Local Members מחושבים-עקביים בלי תלות בזיכרון-המתכנן. שמור את ההגדרות ב-template וה-.xlsm כדי להפיץ.",
          purposeHe:
            "להבטיח שכל תצוגה תכלול אוטומטית את חישובי-העזר הסטנדרטיים (KPIs/יחסים) — בלי הזנה ידנית חוזרת ובלי שונות בין מתכננים.",
          processExampleHe:
            "מאקרו רץ ומוסיף Local Member עם הנוסחה Forecast/SalesHistory לכל שורה בגריד, ומעצב כאחוז; המתכנן פותח את התצוגה והעמודה כבר שם, מעודכנת.",
          scenarioHe:
            "בארגון מאקרו מוסיף אוטומטית שלושה Local Members — Accuracy, Bias, MAPE — לכל SKU בכל תצוגת-ביקוש, כך שכל מתכנן-מדינה רואה אותם KPIs בלי להגדירם.",
          navHe: [
            "Excel ► Developer ► Visual Basic ► מודול-מאקרו",
            "VBA ► קריאה ל-add-in API ► Create/Update Local Member (Formula)",
            "Excel ► SAP IBP tab ► Save Template (.xlsm)",
          ],
          tables: ["Local Member", "Key Figure", "Macro / VBA Module"],
          tcodes: ["Excel VBA Editor", "SAP IBP Excel add-in API"],
          fiori: [],
          configHe: [
            "מאקרו יוצר/מעדכן Local Member מסוג formula דרך ה-API.",
            "הגדרת ביטוי-הנוסחה, מיקום והיקף (לכל שורה/SKU).",
            "חיבור ל-post-Refresh hook לעדכון-אוטומטי.",
            "שמירה ב-template/.xlsm להפצה.",
          ],
          flow: [
            { he: "כתיבת מאקרו", code: "VBA" },
            { he: "יצירת Local Member (formula)", code: "API" },
            { he: "חיבור ל-post-Refresh", code: "Hook" },
            { he: "הפצה כ-template", code: "Save .xlsm" },
          ],
          masterDataHe: [
            "Local Members שנוצרים הם חישוב-תצוגה בלבד — אינם נשמרים ל-IBP.",
          ],
          mistakesHe: [
            "ביטוי-נוסחה המפנה ל-Key Figure שלא בתצוגה ➔ שגיאה.",
            "אי-חיבור ל-post-Refresh ➔ הנוסחאות לא מתעדכנות אחרי שליפה.",
            "כתיבה לאזור-הנתונים במקום ל-Local Member ➔ נדרס ב-Refresh.",
          ],
          troubleshootHe: [
            "ה-Local Member לא נוצר ➔ קריאת-API שגויה או Key Figure חסר בתצוגה.",
            "הנוסחה מציגה שגיאה ➔ הפניה לא-תקינה בביטוי.",
            "החישוב לא מתעדכן ➔ המאקרו לא חובר ל-hook של Refresh.",
          ],
          bestPracticeHe: [
            "חבר את המאקרו ל-post-Refresh כדי לשמור עקביות.",
            "צור Local Members בלבד — לא נוסחאות באזור-הנתונים.",
            "תעד את ביטויי-הנוסחה ושמור ב-template אחיד.",
          ],
          interviewHe: [
            { qHe: "מדוע להזריק נוסחאות כ-Local Members דרך VBA ולא כנוסחאות-Excel?", aHe: "Local Members שורדים Refresh ונשמרים עם התצוגה, בעוד נוסחאות-Excel באזור-הנתונים נדרסות; VBA מאוטמט את יצירתן לאחידות." },
            { qHe: "לאיזה hook נכון לחבר מאקרו של Local Members?", aHe: "ל-post-Refresh, כדי שהנוסחאות ייווצרו/יתעדכנו אחרי כל שליפת-נתונים." },
          ],
          takeawaysHe: [
            "VBA מאוטמט יצירת Local Members מסוג formula.",
            "חבר ל-post-Refresh לעקביות.",
            "Local Members הם תצוגה בלבד; שמור ב-.xlsm/template.",
          ],
          relatedHe: [
            { labelHe: "S&OP · Local Members (11.3.2)", href: "/library/sop/chapter-11/#sub-11.3.2" },
            { labelHe: "S&OP · VBA Hooks (11.6.2)", href: "/library/sop/chapter-11/#sub-11.6.2" },
          ],
        },
        {
          id: "11.6.2",
          titleHe: "Visual Basic for Applications: Hooks",
          titleEn: "Visual Basic for Applications: Hooks",
          execHe:
            "Hooks הם נקודות-עיגון שבהן ה-IBP add-in מזמן אוטומטית קוד-VBA בעקבות אירועי-add-in — למשל אחרי Refresh או סביב Save Data. הם מאפשרים להזריק לוגיקה (ולידציה, עיצוב, יצירת Local Members) בדיוק בזמן-הנכון, בלי הפעלה ידנית.",
          beginnerHe:
            "Hook הוא 'מלכודת-אירוע': אתה כותב שגרת-VBA בשם מסוים, וה-add-in קורא לה לבד כשמשהו קורה — למשל מיד אחרי שמשכת נתונים. כך הקוד שלך רץ בזמן-הנכון בלי שתלחץ כלום.",
          consultantHe:
            "ה-add-in מגדיר שמות-שגרה מוסכמים (למשל post-Refresh, pre-Save, post-Save) שאם קיימים בחוברת — הם מופעלים אוטומטית באירוע המתאים. ב-pre-Save אפשר לבצע ולידציה ולחסום פרסום שגוי; ב-post-Refresh להזריק Local Members/עיצוב; ב-post-Save לרשום-יומן. חיוני: שמירה-מדויקת על שמות-המוסכמה, error handling שלא יקריס את ה-add-in, ושמירת ה-hooks רזים כדי לא להאט כל אירוע. ה-hooks הם המנגנון הרשמי להרחבת התנהגות-ה-add-in.",
          purposeHe:
            "להזריק לוגיקה-מותאמת בנקודות-אירוע מוגדרות — ולידציות, אוטומציה ועיצוב — באופן אוטומטי ועקבי לכל המתכננים.",
          processExampleHe:
            "key user מגדיר שגרת pre-Save שמוודאת שאין ערכים שליליים בתחזית; אם יש — היא מבטלת את ה-Save ומציגה הודעה. שגרת post-Refresh מזריקה Local Members של KPIs.",
          scenarioHe:
            "בארגון hook של pre-Save חוסם פרסום של תחזית מתחת/מעל ספים-עסקיים, ו-hook של post-Refresh מחיל את עיצוב-ה-Formatting-Sheet ומוסיף Local Members — בקרת-איכות ואחידות אוטומטיות לכל הצוות.",
          navHe: [
            "Excel ► Developer ► Visual Basic ► מודול עם שגרות-hook בשמות-מוסכמה",
            "VBA ► post-Refresh / pre-Save / post-Save",
            "Excel ► שמירה כ-.xlsm והפצה כ-template",
          ],
          tables: ["Macro / VBA Module", "Local Member", "Planning View Definition"],
          tcodes: ["Excel VBA Editor", "SAP IBP Excel add-in hooks"],
          fiori: [],
          configHe: [
            "כתיבת שגרות-VBA בשמות-המוסכמה של ה-add-in (post-Refresh/pre-Save/post-Save).",
            "pre-Save: ולידציה ויכולת-לבטל פרסום שגוי.",
            "post-Refresh: הזרקת Local Members/עיצוב.",
            "error handling חובה כדי לא להקריס את ה-add-in.",
          ],
          flow: [
            { he: "כתיבת שגרת-hook בשם-מוסכמה", code: "VBA" },
            { he: "ה-add-in מזהה את השם", code: "Bind" },
            { he: "אירוע (Refresh/Save)", code: "Event" },
            { he: "הרצה אוטומטית", code: "Hook runs" },
          ],
          mistakesHe: [
            "שם-שגרה שגוי ➔ ה-hook לא נקרא כלל.",
            "hook ללא error handling ➔ קריסת ה-add-in באירוע.",
            "לוגיקה כבדה ב-post-Refresh ➔ כל שליפה איטית.",
            "pre-Save שלא מבטל כראוי ➔ פרסום-שגוי עובר.",
          ],
          troubleshootHe: [
            "ה-hook לא מופעל ➔ שם-השגרה אינו תואם את המוסכמה.",
            "Save עובר למרות ולידציה ➔ שגרת pre-Save לא מחזירה ביטול כנדרש.",
            "Refresh נכשל/קורס ➔ שגיאה לא-מטופלת ב-post-Refresh hook.",
          ],
          bestPracticeHe: [
            "הקפד על שמות-המוסכמה המדויקים של ה-add-in.",
            "עטוף כל hook ב-error handling.",
            "שמור hooks רזים; הוצא לוגיקה כבדה למאקרו ידני.",
            "בדוק את ה-hooks אחרי כל עדכון-add-in.",
          ],
          interviewHe: [
            { qHe: "מהו hook ב-IBP Excel add-in?", aHe: "שגרת-VBA בעלת-שם-מוסכם שה-add-in מזמן אוטומטית באירוע (post-Refresh/pre-Save/post-Save), לצורך הזרקת ולידציה, אוטומציה או עיצוב בזמן-הנכון." },
            { qHe: "כיצד hook יכול לחסום פרסום-נתונים שגוי?", aHe: "שגרת pre-Save מבצעת ולידציה ומחזירה ביטול אם הנתונים פסולים — כך ה-Save Data לא מתבצע." },
          ],
          takeawaysHe: [
            "Hooks = קוד-VBA המופעל אוטומטית באירועי-add-in.",
            "post-Refresh לאוטומציה/עיצוב; pre-Save לולידציה-וחסימה.",
            "שמות-מוסכמה מדויקים + error handling + hooks רזים.",
          ],
          relatedHe: [
            { labelHe: "S&OP · VBA ל-Local Members (11.6.1)", href: "/library/sop/chapter-11/#sub-11.6.1" },
          ],
        },
      ],
    },
    // ============================================================ 11.7
    {
      id: "11.7",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה הקנה את מלאכת בניית תצוגות-התכנון ב-SAP IBP מקצה-לקצה: מ-planning view ב-Excel add-in, דרך Planner Workspaces (תצוגות, custom alerts ו-analytics), עיצוב עמיד-לרענון (Sheet Options, Local Members, Formatting Sheet), גרפים, תחזוקת נתוני-אב (workbook, planning objects, Master Data app), ועד הרחבה ב-VBA (Local Members ו-hooks). יחד אלה מרכיבים את ארגז-הכלים של המתכנן ב-IBP cloud.",
      beginnerHe:
        "סיכמנו את כל מה שמתכנן צריך כדי לעבוד ב-IBP: לבנות תצוגה ב-Excel, לשמור אותה כמועדף/תבנית, לנטר ולנתח ב-Planner Workspaces, לעצב יפה ולשמר את העיצוב, לתחזק את נתוני-האב שמאחורי הכל, ואפילו לאוטמט עם VBA. עכשיו אתה יודע לבנות תצוגת-תכנון תקינה מאפס.",
      consultantHe:
        "מבחינת-יישום: ה-Excel add-in ל-עריכה-המונית ולנוסחאות; Planner Workspaces ל-context-משותף וניטור-אינטראקטיבי; Local Members + Formatting Sheet לעיצוב-וחישוב עמיד-לרענון; Master Data (workbook/planning objects/app) כתשתית-חובה לפני Key Figure data; ו-VBA (API + hooks) להרחבות-מבוקרות. עקרונות-העל: עריכה היא סימולציה עד Save Data; templates לאחידות מרכזית; planning objects הם תנאי לכל הזנה; ו-hooks/Local Members הם הדרך הנכונה להתאמות שישרדו רענון ועדכון.",
      purposeHe:
        "לקבע תמונה-שלמה ומעשית: מתי להשתמש בכל כלי, ובאיזה סדר — נתוני-אב → תצוגה → עיצוב → ניתוח → אוטומציה — כדי לבנות סביבת-תכנון אמינה.",
      processExampleHe:
        "זרימה מלאה: key user מתחזק Master Data ויוצר planning objects ► בונה template עם Formatting Sheet ► מתכנן פותח planning view, עורך ו-Save Data ► מנטר ב-Planner Workspace עם custom alerts ► VBA מזריק Local Members של KPIs אחרי כל Refresh.",
      scenarioHe:
        "בארגון המחזור החודשי: עדכון נתוני-אב לעונה ► template אחיד \"הארגון S&OP Demand\" ► מתכנני-מדינה עורכים תחזית ► Planner Workspace משותף לישיבת ה-S&OP עם alerts ו-charts ► hooks מבצעים ולידציה ומחשבים KPIs אוטומטית.",
      navHe: [
        "Excel ► SAP IBP tab (planning views, favorites, templates)",
        "Web UI ► Planner Workspaces / Analytics / Manage Master Data",
        "Excel ► Developer ► Visual Basic (VBA + hooks)",
      ],
      tables: ["Planning Area", "Key Figure", "Planning Object", "Local Member", "Custom Alert"],
      tcodes: ["SAP IBP Excel add-in", "Web UI: Planner Workspaces"],
      fiori: ["Planner Workspaces", "Manage Master Data", "Analytics"],
      configHe: [
        "סדר-עבודה: נתוני-אב + planning objects → תצוגה → עיצוב → ניתוח → אוטומציה.",
        "Excel לעריכה-המונית; Planner Workspaces לניטור-ופעולה.",
        "Local Members/Formatting Sheet לעיצוב-וחישוב עמיד-לרענון.",
        "VBA (API + hooks) להרחבות-מבוקרות.",
      ],
      flow: [
        { he: "נתוני-אב + planning objects", code: "Master Data" },
        { he: "בניית תצוגה + template", code: "Planning View" },
        { he: "עיצוב עמיד-לרענון", code: "Format" },
        { he: "ניטור וניתוח", code: "Workspaces" },
        { he: "אוטומציה", code: "VBA/Hooks" },
      ],
      mistakesHe: [
        "דילוג על נתוני-אב/planning objects לפני בניית-תצוגה.",
        "שכחת Save Data — סימולציה במקום פרסום.",
        "עיצוב/נוסחאות ידניות באזור-הנתונים שנדרסים ב-Refresh.",
      ],
      troubleshootHe: [
        "אי-אפשר להזין תחזית ➔ חסר planning object (חזור ל-11.5).",
        "עיצוב/חישוב נעלם ב-Refresh ➔ העבר ל-Local Members/Formatting Sheet (11.3).",
        "אוטומציה לא רצה ➔ בדוק שמות-hook ו-.xlsm (11.6).",
      ],
      bestPracticeHe: [
        "התחל תמיד מנתוני-אב, סיים באוטומציה.",
        "תקנן דרך templates ו-Formatting Sheet מרכזיים.",
        "השתמש ב-Local Members/hooks להתאמות עמידות-לרענון.",
        "שלב Excel (עריכה) עם Planner Workspaces (ניטור) לפי-החוזק של כל כלי.",
      ],
      interviewHe: [
        { qHe: "מהו סדר-העבודה הנכון לבניית סביבת-תכנון ב-IBP?", aHe: "נתוני-אב + planning objects → planning view + template → עיצוב עמיד-לרענון → ניתוח/ניטור ב-Planner Workspaces → אוטומציה ב-VBA/hooks." },
        { qHe: "מתי תעדיף Excel add-in ומתי Planner Workspaces?", aHe: "Excel לעריכה-המונית, נוסחאות ו-Local Members; Planner Workspaces ל-context-משותף, custom alerts, analytics וניטור-אינטראקטיבי ללא add-in." },
      ],
      takeawaysHe: [
        "סדר: נתוני-אב → תצוגה → עיצוב → ניתוח → אוטומציה.",
        "עריכה = סימולציה עד Save Data; planning objects = תנאי-הזנה.",
        "Local Members/Formatting Sheet/hooks = התאמות עמידות-לרענון.",
        "Excel ו-Planner Workspaces משלימים זה-את-זה ב-IBP cloud.",
      ],
      relatedHe: [
        { labelHe: "S&OP · תצוגות עם Excel (11.1)", href: "/library/sop/chapter-11/#sub-11.1" },
        { labelHe: "S&OP · Planner Workspaces (11.2)", href: "/library/sop/chapter-11/#sub-11.2" },
        { labelHe: "S&OP · נתוני-אב (11.5)", href: "/library/sop/chapter-11/#sub-11.5" },
      ],
    },
  ],
};
