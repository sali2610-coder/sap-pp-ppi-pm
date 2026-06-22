// ===== S&OP with SAP IBP — Chapter 2 (gold-standard learning chapter) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Topic: the SAP IBP planning model and how to navigate it. Hierarchy and ids
// preserved exactly; SAP objects kept verbatim in English (Planning Area SAPIBP1,
// attribute, master data type, time profile, planning level, key figure, Excel add-in).
import type { TextbookChapter } from "./types";

export const CH2: TextbookChapter = {
  n: 2,
  titleHe: "מודל וניווט ב-SAP IBP",
  titleEn: "SAP IBP Model and Navigation",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה למודל-התכנון של SAP IBP (Integrated Business Planning) ולדרכי-הניווט בו. SAP IBP הוא פתרון-ענן (cloud) לתכנון שרשרת-אספקה ול-S&OP, והמודל שלו בנוי מאבני-בניין שזורות: attributes, master data types, time profiles, planning areas, planning levels, key figures, versions ו-scenarios. כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך מקצה-לקצה, דוגמת CBC (מפעל-מילוי משקאות מבית Coca-Cola), ניווט באפליקציית IBP Configuration ו-Excel add-in, טבלאות/אובייקטים, פרטי-קונפיגורציה, תרשים-בנייה, טעויות נפוצות, פתרון-תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: לבנות ולנווט במודל-IBP ללא הספר המקורי. אובייקטי-SAP נשמרים באנגלית מקור (Planning Area SAPIBP1, attribute, master data type, time profile, planning level, key figure, Excel add-in).",
  subchapters: [
    // ============================================================ 2.1
    {
      id: "2.1",
      titleHe: "ארכיטקטורת SAP IBP",
      titleEn: "SAP IBP Architecture",
      execHe:
        "SAP IBP הוא פתרון תכנון-עסקי-משולב המסופק כשירות-ענן (SaaS) ובנוי על מסד-הנתונים In-Memory של SAP HANA. הארכיטקטורה מאחדת שכבת-נתונים (HANA), שכבת-יישום (IBP services + planning operators), ושתי חזיתות-משתמש מקבילות: Excel add-in לתכננים, ו-Web UI מבוסס SAP Fiori למנהלים ולקונפיגורציה. ההבנה שכל-זה רץ בענן ומתעדכן ברבעונים היא קריטית: אין שרת מקומי, אין ABAP מסורתי, והקונפיגורציה כולה מבוססת-מודל ולא קוד.",
      beginnerHe:
        "דמיין בניין בן שלוש קומות. בקומת-המרתף יושב מסד-הנתונים HANA — שומר את כל הנתונים בזיכרון כדי שחישובים יהיו מהירים מאוד. בקומת-האמצע יושב 'המוח' של IBP — האלגוריתמים שמחשבים תחזית, תכנון-מלאי ותכנון-אספקה. בקומה-העליונה יושבים המשתמשים, ויש להם שתי דלתות-כניסה: דרך Excel (לתכננים שאוהבים גיליונות) ודרך דפדפן-אינטרנט עם מסכי Fiori (למנהלים ולהגדרות). הכול נמצא בענן של SAP — אתה רק מתחבר דרך האינטרנט.",
      consultantHe:
        "הארכיטקטורה כוללת: (1) HANA In-Memory DB המאחסן את ה-planning areas; (2) IBP application services — ה-planning operators (Statistical Forecasting, Supply, S&OP Heuristic/Optimizer, Inventory, Demand-Driven), Application Jobs, ו-Data Integration; (3) שכבת-אינטגרציה — SAP Cloud Integration for data services (CI-DS) או HANA Smart Data Integration (SDI) לטעינת-נתונים מ-ECC/S4/מערכות-חוץ; (4) שכבת-זהויות — SAP Cloud Identity / IAS לאימות (SAML 2.0, SSO); (5) חזיתות — Excel add-in (COM add-in ל-Microsoft Excel) ו-Web UI (Fiori Launchpad). תדירות-העדכון רבעונית (לדוגמה 2402, 2405) ומחייבת regression-testing. אין landscape on-premise; המודל כולו מוגדר באפליקציות-קונפיגורציה (Configuration, Model Configuration) ולא ב-SE80.",
      purposeHe:
        "המטרה: לספק פלטפורמת-תכנון מהירה, אלסטית וזמינה-גלובלית, שבה כל בעלי-העניין (תכנון-ביקוש, אספקה, מלאי, S&OP) עובדים על אותו מודל-נתונים אחד (single source of truth) בזמן-אמת, בלי תחזוקת-תשתית מקומית.",
      processExampleHe:
        "תכננית מתחברת מהבית דרך הדפדפן ל-Fiori Launchpad של IBP, פותחת את ה-Excel add-in, מושכת תצוגת-תכנון, משנה תחזית — והשינוי נכתב מיידית ל-planning area ב-HANA. במקביל, מנהל-תפעול במדינה אחרת רואה את אותו מספר ב-dashboard של Fiori, כי שניהם קוראים מאותו מסד-נתונים בענן.",
      cbcHe:
        "ב-CBC (מפעל-מילוי משקאות): נתוני-המכירות ההיסטוריים נמשכים מ-SAP S/4HANA דרך CI-DS אל ה-planning area בענן; התכננים בכל מדינה עובדים ב-Excel add-in מול אותו מודל; הנהלת-האזור צופה ב-Web UI. שדרוג-רבעוני של IBP נבדק תחילה ב-tenant של בדיקות לפני productive.",
      navHe: [
        "SAP Fiori Launchpad ► Application Jobs ► לניטור משימות-מערכת ו-planning runs",
        "SAP Fiori Launchpad ► Communication Channels / Data Integration ► להגדרת חיבורי CI-DS / SDI",
        "Excel ► SAP IBP ribbon ► Log On ► התחברות ל-tenant של IBP",
      ],
      tables: ["Planning Area", "HANA In-Memory", "CI-DS", "SDI", "IAS"],
      tcodes: ["Web UI", "Excel add-in", "Application Jobs", "Data Integration"],
      fiori: ["Application Jobs", "Manage Application Jobs", "Data Integration"],
      configHe: [
        "Tenant: סביבת-IBP נפרדת ללקוח; לרוב שני tenants — test ו-productive.",
        "Data Integration: בחירה בין CI-DS (מבוסס-ענן) ל-SDI (real-time) לטעינת-נתונים.",
        "Identity Authentication Service (IAS): הגדרת SSO/SAML ומשתמשים.",
        "Quarterly release: כל רבעון גרסה חדשה; נדרש regression-test לפני אימוץ.",
      ],
      flow: [
        { he: "מקור-נתונים (S/4HANA / חיצוני)", code: "CI-DS / SDI", note: "אינטגרציה" },
        { he: "אחסון In-Memory", code: "HANA", note: "planning area" },
        { he: "חישוב", code: "Planning Operators", note: "Forecast/Supply/Inventory" },
        { he: "חזית תכננים", code: "Excel add-in" },
        { he: "חזית מנהלים", code: "Web UI (Fiori)" },
      ],
      mistakesHe: [
        "התייחסות ל-IBP כאל מערכת on-premise — אין שרת/ABAP מקומי לתחזק.",
        "דילוג על regression-testing לפני שדרוג רבעוני — שינויי-גרסה עלולים לשבור תצוגות.",
        "ערבוב tenant של test ו-productive — סיכון לאיבוד-נתונים אמיתיים.",
      ],
      troubleshootHe: [
        "אין-נתונים בתצוגה ➔ בדוק שטעינת CI-DS/SDI הסתיימה בהצלחה ב-Data Integration.",
        "כשל-התחברות ב-Excel add-in ➔ בדוק IAS/SSO, גרסת-add-in תואמת ל-release.",
        "חישוב לא-רץ ➔ בדוק Application Jobs לסטטוס ולשגיאות ה-planning operator.",
      ],
      bestPracticeHe: [
        "החזק tenant-בדיקות נפרד ובצע regression לכל release רבעוני.",
        "תקנן את שיטת-האינטגרציה (CI-DS לבאצ', SDI ל-real-time) לפי צורך-העסקי.",
        "תעד את גרסת-ה-release הנוכחית ואת לוח-השדרוגים מול SAP.",
      ],
      interviewHe: [
        { qHe: "על איזה מסד-נתונים בנוי SAP IBP?", aHe: "על SAP HANA In-Memory — כל ה-planning areas מאוחסנים בזיכרון לחישובים מהירים." },
        { qHe: "אילו שתי חזיתות-משתמש קיימות ב-IBP?", aHe: "Excel add-in לתכננים ו-Web UI מבוסס SAP Fiori למנהלים ולקונפיגורציה." },
        { qHe: "כיצד מגיעים נתונים מ-S/4HANA ל-IBP?", aHe: "דרך שכבת-אינטגרציה — CI-DS (Cloud Integration for data services) לטעינת-באצ' או SDI (Smart Data Integration) ל-real-time." },
      ],
      takeawaysHe: [
        "IBP הוא פתרון-ענן (SaaS) על HANA In-Memory, עם עדכון רבעוני.",
        "שלוש שכבות: נתונים (HANA), יישום (planning operators), חזית (Excel + Web UI).",
        "אין on-premise/ABAP; הכול מבוסס-מודל וקונפיגורציה.",
      ],
      relatedHe: [
        { labelHe: "S&OP · מודל-התכנון (2.2)", href: "/library/sop/chapter-02/#sub-2.2" },
        { labelHe: "S&OP · ניווט במודל (2.3)", href: "/library/sop/chapter-02/#sub-2.3" },
      ],
    },
    // ============================================================ 2.2
    {
      id: "2.2",
      titleHe: "מודל התכנון",
      titleEn: "Planning Model",
      execHe:
        "מודל-התכנון (planning model) הוא לב-ליבו של SAP IBP — מערך אבני-הבניין המגדירות אילו נתונים נשמרים, באיזו רזולוציה, ומה מחשבים מהם. אבני-הבניין הן: attributes (תכונות), master data types (סוגי נתוני-אב), time profiles (פרופילי-זמן), planning area (אזור-התכנון המאחד הכול), planning levels (רמות-תכנון), ו-key figures (מדדים). הבנת המודל = הבנת המוצר כולו, כי כל תצוגה, כל חישוב וכל דוח נגזרים ממנו.",
      beginnerHe:
        "חשוב על המודל כמו על בניית-מסד-נתונים מסודר. קודם מגדירים 'מילים' קטנות — attributes (כמו Product, Location, Customer). אחר-כך מקבצים אותן ל-master data types (טבלאות נתוני-אב). מגדירים ציר-זמן (time profile). מאחדים את הכול ל-planning area אחד. בתוכו קובעים planning levels — רמות-הצבירה (לפי מוצר, לפי לקוח, לפי חודש). ולבסוף key figures — המספרים שמתכננים: תחזית, מלאי, אספקה. כל אבן-בניין נשענת על הקודמת.",
      consultantHe:
        "סדר-הבנייה הנכון: (1) attributes — שדות-היסוד; (2) master data types (simple / compound / reference / external / virtual) — מבני נתוני-האב; (3) time profile — היררכיית-הזמן (לדוגמה Technical Week → Month → Quarter → Year); (4) planning area — המכולה המאחדת attributes + master data + time profile; (5) planning levels — צירופי-attributes + רמת-זמן שעליהם נשמרים/מחושבים key figures; (6) key figures — עם base planning level, aggregation/disaggregation, ו-calculations. SAP מספקת תכני-דוגמה מוכנים — בעיקר ה-planning area SAPIBP1 — שאפשר לשכפל (copy) ולהתאים במקום לבנות מאפס.",
      purposeHe:
        "המטרה: להגדיר מבנה-נתונים גמיש המשרת את כל תהליכי-התכנון (demand, supply, inventory, S&OP) במודל אחד עקבי, כך שמספר אחד מחושב פעם אחת ומשמש את כולם — ללא כפילות וללא אי-התאמות.",
      processExampleHe:
        "יועם בונה מודל-demand: מגדיר attributes (PRDID, LOCID, CUSTID), יוצר master data types לכל אחד, קושר time profile חודשי, מאחד ב-planning area, מגדיר planning level לפי Product-Customer-Month, ועליו key figure בשם CONSENSUSDEMAND. מרגע זה כל תצוגה ב-Excel נשענת על אותו מבנה.",
      cbcHe:
        "ב-CBC המודל כולל attributes: Product (SKU משקה), Location (מפעל/DC), Customer (רשת-קמעונאות), Brand. נתוני-האב נטענים מ-S/4HANA, ציר-הזמן חודשי-שבועי, וה-planning area משוכפל מ-SAPIBP1 ומותאם לעולם-המשקאות.",
      navHe: [
        "Web UI ► Configuration ► Planning Areas ► לצפייה ובנייה של המודל",
        "Web UI ► Configuration ► Attributes / Master Data Types / Time Profiles",
        "Web UI ► Configuration ► Copy Planning Area ► שכפול SAPIBP1 כבסיס",
      ],
      tables: ["Attributes", "Master Data Types", "Time Profiles", "Planning Area", "Planning Levels", "Key Figures"],
      tcodes: ["Web UI", "Configuration", "Model Configuration"],
      fiori: ["Planning Areas", "Attributes", "Master Data Types", "Time Profiles", "Key Figures"],
      configHe: [
        "סדר-בנייה: attributes → master data types → time profile → planning area → planning levels → key figures.",
        "Sample content: שכפל את ה-planning area SAPIBP1 כנקודת-מוצא במקום לבנות מאפס.",
        "Activation: כל שינוי-מודל דורש Activate ל-planning area כדי שייכנס לתוקף.",
        "Consistency check: הרץ בדיקת-עקביות לפני הפעלה כדי לאתר תלויות-חסרות.",
      ],
      flow: [
        { he: "הגדרת תכונות", code: "Attributes", note: "אבני-יסוד" },
        { he: "סוגי נתוני-אב", code: "Master Data Types" },
        { he: "ציר-זמן", code: "Time Profile" },
        { he: "איחוד למודל", code: "Planning Area", note: "SAPIBP1" },
        { he: "רמות-צבירה", code: "Planning Levels" },
        { he: "מדדים", code: "Key Figures" },
        { he: "הפעלה", code: "Activate" },
      ],
      masterDataHe: [
        "Attributes + Master Data Types מגדירים את מבנה נתוני-האב הנטענים.",
        "Time Profile מגדיר את צירוף-תקופות-הזמן שעליו נשמרים key figures.",
      ],
      mistakesHe: [
        "בנייה מאפס במקום שכפול SAPIBP1 — בזבוז-זמן וסיכון-שגיאות.",
        "שינוי-מודל ללא Activate — השינוי לא נכנס לתוקף בתצוגות.",
        "התעלמות מבדיקת-עקביות — תלויות-חסרות מתפוצצות בזמן-ריצה.",
      ],
      troubleshootHe: [
        "key figure לא מוצג ➔ ודא שה-planning area הופעל אחרי השינוי (Activate).",
        "בדיקת-עקביות נכשלת ➔ master data type חסר, attribute לא-משויך, או planning level לא-תקין.",
        "מספרים לא-מתאחדים ➔ aggregation/disaggregation לא-מוגדר ב-key figure.",
      ],
      bestPracticeHe: [
        "התחל תמיד מ-SAPIBP1 והתאם — אל תבנה מאפס אלא בצורך מובהק.",
        "שמור על מוסכמת-שמות אחידה ל-attributes ו-key figures.",
        "הרץ consistency check ו-Activate בכל שינוי, וגבּה לפני שינוי-מבני.",
      ],
      interviewHe: [
        { qHe: "מהן אבני-הבניין של מודל-IBP, בסדר-הבנייה?", aHe: "attributes → master data types → time profile → planning area → planning levels → key figures." },
        { qHe: "מהו SAPIBP1?", aHe: "ה-planning area לדוגמה שמספקת SAP; משכפלים ומתאימים אותו כבסיס למודל-הלקוח." },
        { qHe: "מדוע צריך Activate?", aHe: "כל שינוי-מודל נכנס לתוקף רק לאחר הפעלת ה-planning area; עד אז התצוגות עובדות על המבנה הישן." },
      ],
      takeawaysHe: [
        "המודל = attributes, master data types, time profile, planning area, planning levels, key figures.",
        "סדר-הבנייה היררכי; כל אבן נשענת על הקודמת.",
        "שכפל את SAPIBP1, בדוק-עקביות, והפעל (Activate) בכל שינוי.",
      ],
      relatedHe: [
        { labelHe: "S&OP · ארכיטקטורה (2.1)", href: "/library/sop/chapter-02/#sub-2.1" },
        { labelHe: "S&OP · key figures (2.2.6)", href: "/library/sop/chapter-02/#sub-2.2.6" },
      ],
      children: [
        // ----------------------------------------------------- 2.2.1
        {
          id: "2.2.1",
          titleHe: "תכונות (Attributes)",
          titleEn: "Attributes",
          execHe:
            "Attribute הוא אבן-הבניין הקטנה ביותר במודל — שדה-יסוד המתאר מאפיין עסקי, כמו Product ID, Location ID, Customer ID או Brand. כל master data type, כל planning level וכל key figure מורכבים בסופו-של-דבר מ-attributes. הגדרה נכונה שלהם (שם, סוג-נתון, אורך) היא היסוד שעליו נשען כל המודל.",
          beginnerHe:
            "attribute הוא פשוט 'עמודה' — שם של שדה ומה הוא מכיל. למשל attribute בשם PRDID מכיל מזהה-מוצר, attribute בשם LOCID מכיל מזהה-מיקום. אלה הלבנים הקטנות; מהן בונים את כל השאר.",
          consultantHe:
            "כל attribute מוגדר עם: Attribute ID (שם טכני, EN), Description, Data Type (NVARCHAR / INTEGER / DECIMAL / DATETIME), Length, ולעיתים Reference (לערכים-מותרים). attributes מתחלקים ל-key attributes (מזהים, חלק מ-compound master data) ול-non-key (תיאוריים). ב-SAPIBP1 קיימים attributes מוכנים (PRDID, LOCID, CUSTID, PRDFAMILY) שמומלץ לעשות בהם שימוש-חוזר במקום ליצור כפילים.",
          purposeHe:
            "המטרה: לתקנן את אוצר-המילים של המודל — כל מאפיין-עסקי מוגדר פעם אחת ומשמש בכל מקום, כך שאין שני שדות-שונים לאותו מושג.",
          processExampleHe:
            "יועם יוצר attribute חדש BRANDID (NVARCHAR אורך 20) לתיאור-מותג, ואז משייך אותו ל-master data type של המוצר, כדי לאפשר תכנון-לפי-מותג בהמשך.",
          cbcHe:
            "ב-CBC ה-attributes הם: PRDID (SKU כמו 'Cola-1.5L'), LOCID (מפעל/DC), CUSTID (רשת), BRANDID (Coca-Cola / Fanta / Sprite), PACKTYPE (בקבוק/פחית). כולם באנגלית מקור.",
          navHe: [
            "Web UI ► Configuration ► Attributes ► New ► הגדרת Attribute ID, Data Type, Length",
            "Web UI ► Configuration ► Attributes ► Copy ► שכפול attribute מ-SAPIBP1",
          ],
          tables: ["Attributes", "Master Data Types", "SAPIBP1"],
          tcodes: ["Web UI", "Configuration"],
          fiori: ["Attributes", "Manage Attributes"],
          configHe: [
            "Attribute ID + Description: שם טכני באנגלית + תיאור קריא.",
            "Data Type + Length: NVARCHAR/INTEGER/DECIMAL/DATETIME עם אורך מתאים.",
            "Reference attribute: קישור לערכים-מותרים לבקרת-איכות-נתונים.",
          ],
          mistakesHe: [
            "יצירת attribute כפול לאותו מושג (PRDID מול PRODUCTID) — בלבול ופיצול-נתונים.",
            "אורך-שדה קצר מדי — קטיעת-ערכים בטעינה.",
            "סוג-נתון שגוי (NVARCHAR למספרי) — חישובים נכשלים.",
          ],
          troubleshootHe: [
            "ערכים נקטעים בטעינה ➔ אורך ה-attribute קצר מהנתון במקור.",
            "שגיאת-טיפוס בחישוב ➔ Data Type לא-מתאים (טקסט במקום מספר).",
          ],
          bestPracticeHe: [
            "השתמש-מחדש ב-attributes הקיימים של SAPIBP1 לפני יצירת חדשים.",
            "קבע מוסכמת-שמות אחידה (סיומת ID למזהים).",
            "תאם אורך וסוג-נתון למקור (S/4HANA) למניעת קטיעה.",
          ],
          interviewHe: [
            { qHe: "מהו attribute ב-IBP?", aHe: "שדה-היסוד המתאר מאפיין-עסקי (PRDID, LOCID); אבן-הבניין הקטנה ביותר של המודל." },
            { qHe: "מה ההבדל בין key attribute ל-non-key?", aHe: "key attribute הוא מזהה (חלק מ-compound master data); non-key הוא תיאורי בלבד." },
          ],
          takeawaysHe: [
            "attribute = שדה-יסוד; הלבנה הקטנה של המודל.",
            "מוגדר עם ID, Data Type, Length.",
            "השתמש-מחדש בקיימים מ-SAPIBP1; הימנע מכפילים.",
          ],
          relatedHe: [{ labelHe: "S&OP · master data types (2.2.2)", href: "/library/sop/chapter-02/#sub-2.2.2" }],
        },
        // ----------------------------------------------------- 2.2.2
        {
          id: "2.2.2",
          titleHe: "סוגי נתוני-אב (Master Data Types)",
          titleEn: "Master Data Types",
          execHe:
            "master data type הוא הקבוצה המאגדת attributes למבנה נתוני-אב בעל-משמעות, כמו Product, Location או Customer. הוא קובע אילו attributes מהווים מפתח (key) ואילו תיאוריים, וכיצד נתוני-האב מאוחסנים ומקושרים. ב-IBP חמישה סוגים: simple, compound, reference, external ו-virtual — לכל אחד תפקיד מובחן.",
          beginnerHe:
            "אם attribute הוא עמודה, master data type הוא הטבלה. למשל master data type בשם Product מכיל את העמודות PRDID, BRANDID, PRDFAMILY. הוא מארגן את ה-attributes למבנה שלם שאפשר לטעון אליו ערכים אמיתיים.",
          consultantHe:
            "חמשת הסוגים: (1) simple — טבלה עצמאית עם key attribute אחד (לדוגמה Product); (2) compound — מפתח מורכב מכמה attributes (לדוגמה Customer-Region שבו CUSTID+REGIONID); (3) reference — מצביע על simple/compound קיים לשימוש-חוזר בלי שכפול-נתונים; (4) external — מאוחסן מחוץ ל-IBP ונקרא בזמן-ריצה; (5) virtual — נגזר מ-master data type אחר. בחירת-הסוג משפיעה על אופן הטעינה, הקישור ל-planning levels, ועל ביצועים.",
          purposeHe:
            "המטרה: לארגן את ה-attributes למבני נתוני-אב עקביים שאליהם נטענים הערכים האמיתיים, ושעליהם נבנות רמות-התכנון וה-key figures.",
          processExampleHe:
            "יועם יוצר master data type מסוג simple בשם Product עם key attribute PRDID ועם attributes תיאוריים BRANDID, PRDFAMILY; טוען אליו את רשימת-המוצרים מ-S/4HANA; וכעת אפשר לתכנן לפי מוצר.",
          cbcHe:
            "ב-CBC: master data type מסוג simple בשם Product (PRDID + BRANDID + PACKTYPE), simple בשם Location (LOCID), ו-compound בשם Customer-Product לתכנון-לקוח-מוצר. כולם נטענים מ-S/4HANA דרך CI-DS.",
          navHe: [
            "Web UI ► Configuration ► Master Data Types ► New ► בחירת Type (simple/compound/reference/external/virtual)",
            "Web UI ► Configuration ► Master Data Types ► שיוך attributes כ-key / non-key",
          ],
          tables: ["Master Data Types", "Attributes", "Planning Area"],
          tcodes: ["Web UI", "Configuration", "Manage Master Data"],
          fiori: ["Master Data Types", "Manage Master Data"],
          configHe: [
            "בחירת-סוג: simple / compound / reference / external / virtual לפי הצורך.",
            "Key attributes: סימון ה-attributes המהווים את המפתח הייחודי.",
            "שיוך ל-planning area: כל master data type חייב להיכלל ב-planning area כדי לשמש.",
          ],
          mistakesHe: [
            "בחירת simple במקום compound כשהמפתח מורכב — אובדן-ייחודיות בנתונים.",
            "שכפול-נתונים במקום reference type — תחזוקה כפולה ואי-עקביות.",
            "אי-שיוך master data type ל-planning area — לא ניתן לטעון/לתכנן.",
          ],
          troubleshootHe: [
            "טעינת-נתונים-כפולה / כשל-ייחודיות ➔ key attributes חסרים או סוג שגוי (simple במקום compound).",
            "נתוני-אב לא-זמינים לתכנון ➔ master data type לא-משויך ל-planning area.",
          ],
          bestPracticeHe: [
            "השתמש ב-reference type לשימוש-חוזר במקום שכפול נתוני-אב.",
            "בחר compound רק כשהמפתח באמת מורכב; פשטות עדיפה.",
            "השתמש בתכני SAPIBP1 (Product/Location/Customer) כבסיס.",
          ],
          interviewHe: [
            { qHe: "מהם חמשת סוגי master data type?", aHe: "simple, compound, reference, external, virtual." },
            { qHe: "מתי משתמשים ב-compound?", aHe: "כשהמפתח הייחודי מורכב מכמה attributes (לדוגמה Customer + Region)." },
            { qHe: "מהו reference master data type?", aHe: "מצביע על master data type קיים לשימוש-חוזר ללא שכפול-נתונים." },
          ],
          takeawaysHe: [
            "master data type = הטבלה המאגדת attributes.",
            "חמישה סוגים: simple/compound/reference/external/virtual.",
            "חייב להיות משויך ל-planning area כדי לשמש.",
          ],
          relatedHe: [{ labelHe: "S&OP · attributes (2.2.1)", href: "/library/sop/chapter-02/#sub-2.2.1" }],
        },
        // ----------------------------------------------------- 2.2.3
        {
          id: "2.2.3",
          titleHe: "פרופילי-זמן (Time Profiles)",
          titleEn: "Time Profiles",
          execHe:
            "time profile מגדיר את ציר-הזמן של המודל — את היררכיית-התקופות שעליהן נשמרים ומחושבים ה-key figures, למשל Technical Week → Month → Quarter → Year. הוא קובע את הרזולוציה-הזמנית של כל התכנון, ולכן הוא החלטה-אסטרטגית: שינויו לאחר טעינת-נתונים קשה ויקר.",
          beginnerHe:
            "time profile הוא 'הסרגל-הזמני' של המודל — הוא קובע אם מתכננים לפי שבוע, חודש, רבעון או שנה, וכיצד הם מתקפלים זה לתוך זה. כמו סרגל מדורג: השבועות מתקבצים לחודשים, החודשים לרבעונים, הרבעונים לשנים.",
          consultantHe:
            "ה-time profile בנוי מ-time profile levels (לרוב Level 1 = הגבוה ביותר, Year, עד Level הנמוך = Technical Week/Day). כל planning area מקושר ל-time profile אחד. ה-base planning level של כל key figure מצביע על time profile level מסוים, וה-aggregation מתבצע למעלה לאורך ההיררכיה. שינוי time profile לאחר טעינת-נתונים מצריך תכנון-מחדש ולכן יש לקבוע נכון מההתחלה. SAPIBP1 מספקת time profile מוכן (שבועי-חודשי-רבעוני-שנתי).",
          purposeHe:
            "המטרה: לקבוע את הרזולוציה-הזמנית האחידה של כל התכנון, כך שתחזית, אספקה ומלאי כולם מדברים באותן תקופות-זמן ומתקפלים זה לתוך זה בעקביות.",
          processExampleHe:
            "מודל-demand נשמר ברמת-חודש; ה-time profile מקפל את החודשים לרבעונים ולשנים אוטומטית, כך שמנהל רואה consensus ברמת-רבעון בלי חישוב-ידני.",
          cbcHe:
            "ב-CBC ה-time profile שבועי-חודשי: תכנון-תפעולי שבועי לקווי-המילוי, ו-S&OP חודשי-רבעוני להנהלה. עונתיות-המשקאות (קיץ) ניכרת ברזולוציה החודשית.",
          navHe: [
            "Web UI ► Configuration ► Time Profiles ► New ► הגדרת Levels (Year/Quarter/Month/Week)",
            "Web UI ► Configuration ► Time Profiles ► Generate Time Profile Data ► יצירת תקופות בפועל",
          ],
          tables: ["Time Profiles", "Time Profile Levels", "Planning Area"],
          tcodes: ["Web UI", "Configuration"],
          fiori: ["Time Profiles", "Manage Time Profiles"],
          configHe: [
            "Time Profile Levels: הגדרת ההיררכיה (Year → Quarter → Month → Technical Week).",
            "Time period generation: יצירת התקופות בפועל לטווח-השנים הרצוי.",
            "שיוך ל-planning area: כל planning area מקושר ל-time profile אחד בלבד.",
          ],
          mistakesHe: [
            "בחירת-רזולוציה לא-מתאימה (שבועי כשמספיק חודשי) — נפח-נתונים וביצועים.",
            "אי-יצירת מספיק תקופות עתידיות — תכנון 'נחתך' בעתיד.",
            "ניסיון לשנות time profile אחרי טעינה — תהליך כואב ויקר.",
          ],
          troubleshootHe: [
            "תכנון לא-זמין לתקופות-עתיד ➔ לא נוצרו מספיק time periods (Generate).",
            "אי-התאמה בין שכבות-זמן ➔ הגדרת Levels שגויה בהיררכיה.",
          ],
          bestPracticeHe: [
            "קבע את ה-time profile נכון מההתחלה — שינויו מאוחר יקר.",
            "צור מלאי-תקופות-עתידי מספק (לדוגמה 3 שנים קדימה).",
            "התאם רזולוציה לצורך: שבועי לתפעול, חודשי/רבעוני ל-S&OP.",
          ],
          interviewHe: [
            { qHe: "מה מגדיר time profile?", aHe: "את ציר-הזמן והיררכיית-התקופות (Week→Month→Quarter→Year) שעליהם נשמרים key figures." },
            { qHe: "כמה time profiles מקושרים ל-planning area?", aHe: "אחד בלבד; הוא קובע את הרזולוציה-הזמנית של כל המודל." },
            { qHe: "מדוע קשה לשנות time profile מאוחר?", aHe: "כל הנתונים נשמרו לפיו; שינוי מצריך תכנון-מחדש וטעינה-מחדש." },
          ],
          takeawaysHe: [
            "time profile = ציר-הזמן והיררכיית-התקופות של המודל.",
            "planning area אחד מקושר ל-time profile אחד.",
            "קבע נכון מההתחלה; שינוי מאוחר יקר.",
          ],
          relatedHe: [{ labelHe: "S&OP · planning levels (2.2.5)", href: "/library/sop/chapter-02/#sub-2.2.5" }],
        },
        // ----------------------------------------------------- 2.2.4
        {
          id: "2.2.4",
          titleHe: "אזורי-תכנון (Planning Areas)",
          titleEn: "Planning Areas",
          execHe:
            "planning area הוא המכולה המרכזית של המודל — הוא מאחד את ה-attributes, master data types, time profile, planning levels ו-key figures למודל-תכנון אחד שלם ופעיל. כל פעולה ב-IBP (תצוגה, חישוב, דוח) מתבצעת בהקשר של planning area. ה-planning area לדוגמה SAPIBP1 הוא נקודת-המוצא המומלצת לכל מימוש.",
          beginnerHe:
            "planning area הוא 'הספר השלם' שאוסף את כל הפרקים: התכונות, נתוני-האב, ציר-הזמן, רמות-הצבירה והמדדים. כל מה שמתכננים — קורה בתוך planning area אחד. SAP נותנת ספר-דוגמה מוכן בשם SAPIBP1 שמשכפלים ומתאימים.",
          consultantHe:
            "ה-planning area מאגד את כל אובייקטי-המודל ומחייב Activate כדי להפעיל. הוא נושא הגדרות גלובליות: time profile, base/aggregation behavior, ו-version handling. שכפול SAPIBP1 (Copy Planning Area) מעתיק את כל המבנה כולל key figures מוכנים ל-demand/supply/inventory/S&OP. לאחר שכפול מתאימים: מוסיפים/מסירים attributes, key figures ו-planning levels, ומריצים consistency check לפני Activate.",
          purposeHe:
            "המטרה: לספק single source of truth — מודל אחד שבו כל תהליכי-התכנון חולקים את אותם נתוני-אב, ציר-זמן ו-key figures, כך שמספר מחושב פעם אחת ומשמש את כולם.",
          processExampleHe:
            "צוות-מימוש משכפל את SAPIBP1 ל-planning area חדש ZIBP_CBC, מסיר key figures לא-רלוונטיים, מוסיף BRANDID, מריץ consistency check, ומפעיל (Activate). מאותו רגע התכננים עובדים מולו ב-Excel.",
          cbcHe:
            "ב-CBC ה-planning area ZIBP_CBC משוכפל מ-SAPIBP1, כולל demand, supply ו-inventory; מותאם ל-SKU-משקאות, מפעלים-DC, ורשתות-קמעונאות; ומשמש את כל מדינות-האזור על מודל-אחד.",
          navHe: [
            "Web UI ► Configuration ► Planning Areas ► Copy ► שכפול SAPIBP1",
            "Web UI ► Configuration ► Planning Areas ► Edit ► שיוך master data, time profile, key figures",
            "Web UI ► Configuration ► Planning Areas ► Activate ► הפעלת המודל",
          ],
          tables: ["Planning Area", "SAPIBP1", "Master Data Types", "Time Profiles", "Key Figures"],
          tcodes: ["Web UI", "Configuration", "Copy Planning Area", "Activate"],
          fiori: ["Planning Areas", "Copy Planning Area", "Manage Planning Area"],
          configHe: [
            "Copy Planning Area: שכפול SAPIBP1 כבסיס, כולל key figures ו-planning levels מוכנים.",
            "שיוך אובייקטים: master data types, time profile, planning levels, key figures.",
            "Consistency check + Activate: בדיקה והפעלה לפני שימוש.",
          ],
          flow: [
            { he: "שכפול דוגמה", code: "Copy SAPIBP1" },
            { he: "התאמת אובייקטים", code: "attributes/KF" },
            { he: "בדיקת-עקביות", code: "Consistency Check" },
            { he: "הפעלה", code: "Activate" },
            { he: "מוכן לתכנון", code: "Excel / Web UI" },
          ],
          mistakesHe: [
            "בנייה מאפס במקום שכפול SAPIBP1 — איבוד תכני-דוגמה מוכנים.",
            "הפעלה ללא consistency check — שגיאות בזמן-ריצה.",
            "יצירת planning areas מרובים מיותרים — פיצול נתונים וקושי-תחזוקה.",
          ],
          troubleshootHe: [
            "Activate נכשל ➔ consistency check חושף master data/planning level/KF פגומים.",
            "תצוגה לא-מציגה נתונים ➔ master data לא-נטען ל-planning area או לא-הופעל.",
          ],
          bestPracticeHe: [
            "התחל מ-SAPIBP1; שמור planning area אחד מאוחד ככל-האפשר.",
            "תעד כל התאמה מול תכני-הדוגמה לצורך שדרוגים.",
            "הרץ consistency check לפני כל Activate.",
          ],
          interviewHe: [
            { qHe: "מהו planning area?", aHe: "המכולה המאחדת attributes, master data, time profile, planning levels ו-key figures למודל-תכנון אחד פעיל." },
            { qHe: "מהו SAPIBP1 ולמה משכפלים אותו?", aHe: "ה-planning area לדוגמה של SAP; משכפלים אותו כדי לקבל key figures ו-planning levels מוכנים במקום לבנות מאפס." },
            { qHe: "מתי planning area נכנס לתוקף?", aHe: "רק לאחר Activate שעובר consistency check." },
          ],
          takeawaysHe: [
            "planning area = המודל השלם והפעיל; הקשר לכל פעולה.",
            "שכפל את SAPIBP1 ואל תבנה מאפס.",
            "Consistency check + Activate חובה לפני שימוש.",
          ],
          relatedHe: [
            { labelHe: "S&OP · planning levels (2.2.5)", href: "/library/sop/chapter-02/#sub-2.2.5" },
            { labelHe: "S&OP · key figures (2.2.6)", href: "/library/sop/chapter-02/#sub-2.2.6" },
          ],
        },
        // ----------------------------------------------------- 2.2.5
        {
          id: "2.2.5",
          titleHe: "רמות-תכנון (Planning Levels)",
          titleEn: "Planning Levels",
          execHe:
            "planning level הוא צירוף של attributes ושל time profile level, המגדיר את הרזולוציה שבה נשמר או מחושב key figure — לדוגמה Product-Customer-Month. הוא הגשר בין נתוני-האב לבין המספרים: ה-base planning level קובע את הרמה הבסיסית של אחסון, ורמות-אחרות משמשות לצבירה (aggregation) ולפירוק (disaggregation).",
          beginnerHe:
            "planning level עונה על השאלה 'באיזו רזולוציה?'. למשל: לתכנן תחזית לפי מוצר-לקוח-חודש, או רק לפי מוצר-שנה. כל key figure 'יושב' על planning level שקובע כמה מפורט הוא — וממנו אפשר לעלות (לצבור) או לרדת (לפרק).",
          consultantHe:
            "כל planning level מורכב מ-root attributes (מנתוני-האב) + time profile level. ה-base planning level של key figure הוא הרמה שבה הנתון נשמר פיזית; שאר-הרמות מחושבות מ-aggregation. planning levels משמשים גם ב-calculations (חישוב KF מ-KF אחר ברמה שונה) וב-disaggregation (פירוק תחזית-שנתית לחודשים לפי proportional factor). תכנון נכון של planning levels הוא קריטי לביצועים ולנכונות-הצבירה.",
          purposeHe:
            "המטרה: לאפשר אחסון-נתונים ברמת-פירוט אחת, וצפייה/חישוב במגוון-רמות, בלי לאחסן כל צירוף בנפרד — חיסכון בנפח ועקביות בצבירה.",
          processExampleHe:
            "key figure של תחזית נשמר ב-base planning level של Product-Customer-Month; מנהל פותח תצוגה ברמת-Brand-Quarter — IBP מצבר אוטומטית מהרמה-הבסיסית לרמה-המבוקשת.",
          cbcHe:
            "ב-CBC: base planning level = Product-Location-Customer-Week לתכנון-תפעולי; רמות-צבירה = Brand-Region-Month ל-S&OP. אותו מספר נראה בכל רמה בעקביות.",
          navHe: [
            "Web UI ► Configuration ► Planning Levels ► New ► בחירת attributes + time profile level",
            "Web UI ► Configuration ► Key Figures ► שיוך base planning level",
          ],
          tables: ["Planning Levels", "Attributes", "Time Profiles", "Key Figures"],
          tcodes: ["Web UI", "Configuration"],
          fiori: ["Planning Levels", "Manage Planning Levels"],
          configHe: [
            "Root attributes + time profile level: הגדרת צירוף-הרזולוציה.",
            "Base planning level: הרמה שבה ה-key figure נשמר פיזית.",
            "Aggregation/disaggregation levels: רמות-צפייה וחישוב נגזרות.",
          ],
          mistakesHe: [
            "base planning level מפורט מדי — נפח-נתונים וביצועים גרועים.",
            "base planning level גס מדי — אובדן רזולוציית-תכנון נדרשת.",
            "אי-התאמה בין planning level של KF-מקור ל-KF-יעד בחישוב — תוצאות שגויות.",
          ],
          troubleshootHe: [
            "צבירה לא-נכונה ➔ aggregation rule של ה-key figure שגוי לרמה זו.",
            "ביצועים-איטיים ➔ base planning level מפורט מדי או יותר-מדי root attributes.",
          ],
          bestPracticeHe: [
            "קבע base planning level ברזולוציה המינימלית הדרושה לתכנון.",
            "השתמש-מחדש ב-planning levels קיימים במקום ליצור כפילים.",
            "ודא התאמת-רמות בחישובים בין KF-מקור ל-KF-יעד.",
          ],
          interviewHe: [
            { qHe: "מהו planning level?", aHe: "צירוף attributes + time profile level הקובע את רזולוציית האחסון/החישוב של key figure." },
            { qHe: "מהו base planning level?", aHe: "הרמה שבה ה-key figure נשמר פיזית; שאר-הרמות מחושבות בצבירה." },
            { qHe: "כיצד נצפה מספר ברמה גסה יותר מהאחסון?", aHe: "דרך aggregation — IBP מצבר אוטומטית מה-base planning level לרמה-המבוקשת." },
          ],
          takeawaysHe: [
            "planning level = רזולוציה (attributes + time level).",
            "base planning level = רמת-האחסון הפיזית.",
            "צבירה/פירוק מאפשרים צפייה במגוון-רמות מאחסון-יחיד.",
          ],
          relatedHe: [
            { labelHe: "S&OP · time profiles (2.2.3)", href: "/library/sop/chapter-02/#sub-2.2.3" },
            { labelHe: "S&OP · key figures (2.2.6)", href: "/library/sop/chapter-02/#sub-2.2.6" },
          ],
        },
        // ----------------------------------------------------- 2.2.6
        {
          id: "2.2.6",
          titleHe: "מדדים (Key Figures)",
          titleEn: "Key Figures",
          execHe:
            "key figure הוא 'המספר' שמתכננים — תחזית, מלאי-בטחון, אספקה, consensus demand, capacity. זהו האובייקט המרכזי שהמשתמש רואה ועורך בתצוגות. כל key figure מוגדר עם base planning level, כללי aggregation/disaggregation, ולעיתים calculation (נגזר מ-key figures אחרים). הבנת ה-key figures = הבנת מה המודל בעצם מודד.",
          beginnerHe:
            "key figure הוא פשוט מדד-מספרי: 'כמה צופים למכור', 'כמה מלאי יש', 'כמה לייצר'. אלה התאים שהתכנן ממלא או רואה ב-Excel. כל מדד יודע באיזו רזולוציה הוא נשמר, ואם הוא נגזר ממדדים אחרים בנוסחה.",
          consultantHe:
            "key figure מוגדר עם: base planning level, aggregation mode (SUM/AVG/...), disaggregation basis (proportional/equal/reference KF), ו-editable/stored/calculated. key figures מחושבים נשענים על calculations — ביטויים המתייחסים ל-key figures אחרים, אפשר ברמות-planning שונות. שדות חשובים: stored (נשמר פיזית) מול calculated (מחושב בזמן-ריצה), ו-time-period-weighted disaggregation. ב-SAPIBP1 קיימים key figures מוכנים: CONSENSUSDEMAND, STATISTICALFORECAST, PROJECTEDINVENTORY, ועוד.",
          purposeHe:
            "המטרה: לייצג כל גודל-תכנוני כמדד-יחיד עם התנהגות-צבירה ופירוק עקבית, כך שהמשתמש עורך במספר אחד וכל הרמות מתעדכנות נכון.",
          processExampleHe:
            "key figure בשם CONSENSUSDEMAND נערך ברמת Product-Customer-Month; key figure מחושב TOTALDEMAND = CONSENSUSDEMAND + PROMOTIONUPLIFT מתעדכן אוטומטית; פירוק לשבועות נעשה לפי PROPORTIONALFACTOR.",
          cbcHe:
            "ב-CBC ה-key figures כוללים: STATISTICALFORECAST (תחזית-בסיס), CONSENSUSDEMAND (מוסכם), SAFETYSTOCK, PROJECTEDINVENTORY, SUPPLYPLAN. uplift-קיץ מוזן כ-key figure-תוספת ומחובר לתחזית-הבסיס.",
          navHe: [
            "Web UI ► Configuration ► Key Figures ► New ► base planning level + aggregation",
            "Web UI ► Configuration ► Key Figures ► Calculations ► הגדרת נוסחה מ-KF אחרים",
            "Web UI ► Configuration ► Key Figures ► Disaggregation ► בחירת בסיס-פירוק",
          ],
          tables: ["Key Figures", "Planning Levels", "Calculations", "SAPIBP1"],
          tcodes: ["Web UI", "Configuration"],
          fiori: ["Key Figures", "Manage Key Figures"],
          configHe: [
            "Base planning level: רמת-האחסון של ה-key figure.",
            "Aggregation: SUM/AVG/... לצבירה למעלה בהיררכיה.",
            "Disaggregation: proportional / equal / לפי reference key figure.",
            "Stored vs calculated: נשמר פיזית מול מחושב בזמן-ריצה (calculation).",
          ],
          flow: [
            { he: "הגדרת base planning level", code: "Planning Level" },
            { he: "כללי-צבירה", code: "Aggregation" },
            { he: "בסיס-פירוק", code: "Disaggregation" },
            { he: "נוסחה (אופציונלי)", code: "Calculation" },
            { he: "הפעלה במודל", code: "Activate" },
          ],
          mistakesHe: [
            "disaggregation basis שגוי — פירוק לא-הגיוני לרמות-נמוכות.",
            "key figure מחושב כשצריך stored (או להפך) — ביצועים/עריכות שגויים.",
            "aggregation mode לא-מתאים (SUM למדד-יחס) — סיכומים חסרי-משמעות.",
          ],
          troubleshootHe: [
            "עריכה ברמה-גסה לא-מתפרקת נכון ➔ disaggregation basis שגוי או חסר reference KF.",
            "מספר לא-מתעדכן ➔ key figure מוגדר stored במקום calculated, או calculation שגוי.",
            "סיכום חסר-משמעות ➔ aggregation mode לא-נכון למדד.",
          ],
          bestPracticeHe: [
            "השתמש-מחדש ב-key figures של SAPIBP1 (CONSENSUSDEMAND וכו').",
            "בחר stored מול calculated במודע — calculated חוסך-אחסון אך עולה בזמן-ריצה.",
            "התאם aggregation/disaggregation למשמעות-העסקית של המדד.",
          ],
          interviewHe: [
            { qHe: "מהו key figure?", aHe: "המדד-המספרי שמתכננים (תחזית, מלאי, אספקה); האובייקט המרכזי שהמשתמש עורך." },
            { qHe: "מה ההבדל בין stored ל-calculated key figure?", aHe: "stored נשמר פיזית ב-HANA; calculated מחושב בזמן-ריצה מ-key figures אחרים דרך calculation." },
            { qHe: "מהי disaggregation?", aHe: "פירוק ערך מרמה-גסה לרמות-נמוכות, לפי proportional factor / equal / reference key figure." },
          ],
          takeawaysHe: [
            "key figure = המספר שמתכננים; האובייקט המרכזי בתצוגה.",
            "מוגדר עם base planning level, aggregation, disaggregation.",
            "stored מול calculated — איזון בין אחסון לזמן-ריצה.",
          ],
          relatedHe: [
            { labelHe: "S&OP · planning levels (2.2.5)", href: "/library/sop/chapter-02/#sub-2.2.5" },
            { labelHe: "S&OP · versions ו-scenarios (2.2.7)", href: "/library/sop/chapter-02/#sub-2.2.7" },
          ],
        },
        // ----------------------------------------------------- 2.2.7
        {
          id: "2.2.7",
          titleHe: "גרסאות ותרחישים מוגדרי-משתמש",
          titleEn: "Versions and User-Defined Scenarios",
          execHe:
            "versions ו-scenarios מאפשרים תכנון 'מה-אם' (what-if) בלי לפגוע בתכנית-הבסיס. version היא עותק מלא של נתוני-ה-key figures (לדוגמה Baseline מול Budget); scenario הוא שכבת-סימולציה קלת-משקל מעל גרסה, שבה התכנן מנסה שינויים ומשווה לפני אימוץ. שניהם חיוניים ל-S&OP, שבו דנים בחלופות לפני החלטה.",
          beginnerHe:
            "version היא כמו 'קובץ-שמירה בנפרד' של כל המספרים — אפשר להחזיק 'תכנית-בסיס' ו'תקציב' זה-לצד-זה. scenario הוא 'מצב-ניסוי' זמני מעל גרסה: 'מה יקרה אם המכירות יגדלו ב-10%?' — בודקים בלי לשנות את האמת, ואם אוהבים — מאמצים.",
          consultantHe:
            "version (planning version) היא עותק-נתונים מלא של ה-planning area; ה-base version היא Baseline. כל version מנוהלת בנפרד וניתן להעתיק ביניהן (copy operator). scenario (user-defined scenario) הוא שכבת-delta מעל version, נוצרת על-ידי המשתמש ב-Excel/Web UI, מאפשרת simulation ו-side-by-side comparison, וניתן לאמצה (adopt) חזרה ל-version. scenarios קלים יותר מ-versions ומיועדים לעבודת-תכנן יומיומית; versions לניהול-תכניות מבני (Budget, Forecast).",
          purposeHe:
            "המטרה: לאפשר ניתוח-חלופות והשוואה לפני-החלטה — לב תהליך ה-S&OP — בלי לסכן את תכנית-הבסיס, ולתעד תרחישים שונים זה-מול-זה.",
          processExampleHe:
            "בישיבת-S&OP התכנן יוצר scenario 'High Growth' מעל ה-Baseline, מעלה תחזית ב-10%, משווה side-by-side את ההשפעה על המלאי והאספקה, וכשמתקבלת החלטה — מאמץ (adopt) את ה-scenario ל-version.",
          cbcHe:
            "ב-CBC: version 'Baseline' מול 'Budget' לשנה; לקראת-קיץ התכנן בונה scenario 'Heatwave +15%' לבדיקת-מוכנות קווי-המילוי, ומשווה למלאי-הצפוי לפני אימוץ.",
          navHe: [
            "Web UI ► Configuration ► Planning Areas ► Versions ► הגדרת/העתקת versions",
            "Excel add-in ► Scenarios ► Create Scenario ► יצירת תרחיש מעל version",
            "Excel add-in ► Scenarios ► Compare / Adopt ► השוואה ואימוץ",
          ],
          tables: ["Planning Versions", "User-Defined Scenarios", "Key Figures", "Planning Area"],
          tcodes: ["Web UI", "Excel add-in", "Configuration"],
          fiori: ["Manage Versions", "Scenarios"],
          configHe: [
            "Versions: הגדרת version-Baseline ו-versions נוספות; copy operator להעתקה.",
            "User-defined scenarios: מופעלים ל-planning area; נוצרים ע\"י המשתמש.",
            "Adopt scenario: אימוץ שינויי-scenario חזרה ל-version.",
          ],
          mistakesHe: [
            "בלבול בין version (עותק-מלא) ל-scenario (שכבת-סימולציה) — שימוש שגוי.",
            "ריבוי versions מיותרות — נפח-נתונים וניהול-מסורבל.",
            "שכחת adopt — תרחיש מנותח אך לא נכנס לתכנית.",
          ],
          troubleshootHe: [
            "שינויי-scenario לא-משפיעים על התכנית ➔ לא בוצע adopt ל-version.",
            "scenarios לא-זמינים ב-Excel ➔ לא הופעלו ל-planning area בקונפיגורציה.",
            "נתוני-version ריקים ➔ לא בוצע copy מ-Baseline ל-version החדשה.",
          ],
          bestPracticeHe: [
            "השתמש ב-scenarios לעבודת-תכנן יומיומית, ב-versions למבנה (Budget/Forecast).",
            "שמור מעט versions מבניות; נקה scenarios ישנים.",
            "תעד את ה-scenarios שנדונו ב-S&OP לצורך-מעקב.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין version ל-scenario ב-IBP?", aHe: "version היא עותק-נתונים מלא (Baseline/Budget); scenario הוא שכבת-סימולציה קלה מעל version לעבודת what-if." },
            { qHe: "כיצד מאמצים תרחיש מוצלח?", aHe: "באמצעות adopt — שינויי ה-scenario נכתבים חזרה ל-version." },
            { qHe: "למה scenarios חיוניים ל-S&OP?", aHe: "הם מאפשרים ניתוח-חלופות והשוואה side-by-side לפני-החלטה, מבלי לסכן את תכנית-הבסיס." },
          ],
          takeawaysHe: [
            "version = עותק-נתונים מלא; scenario = שכבת-סימולציה מעל version.",
            "scenarios לעבודת-תכנן; versions למבנה (Budget/Forecast).",
            "adopt מכניס תרחיש מוצלח חזרה לתכנית.",
          ],
          relatedHe: [
            { labelHe: "S&OP · key figures (2.2.6)", href: "/library/sop/chapter-02/#sub-2.2.6" },
            { labelHe: "S&OP · ניווט במודל (2.3)", href: "/library/sop/chapter-02/#sub-2.3" },
          ],
        },
        // ----------------------------------------------------- 2.2.8
        {
          id: "2.2.8",
          titleHe: "תמיכה רב-לשונית לאובייקטי-מידול",
          titleEn: "Multilanguage Support for Modeling Objects",
          execHe:
            "IBP תומך בתרגום של תיאורי אובייקטי-המידול (attributes, key figures, planning levels וכו') למספר שפות, כך שמשתמשים גלובליים רואים את המודל בשפתם בעוד ה-Attribute ID / Key Figure ID הטכני נשאר אנגלי-אחיד. זו דרישה מעשית בארגון רב-לאומי, ומאפשרת אימוץ-משתמשים רחב ללא פגיעה בעקביות-המודל.",
          beginnerHe:
            "השם-הטכני של כל אובייקט נשאר באנגלית (כדי שהמערכת תזהה אותו), אבל ה-תיאור (מה שהמשתמש קורא) אפשר לתרגם — לעברית, לגרמנית, לכל שפה. כך תכנן בישראל רואה תיאור-עברית ותכנן בגרמניה רואה גרמנית, אך שניהם עובדים על אותו key figure.",
          consultantHe:
            "כל modeling object נושא Description הניתן-לתרגום לפי logon language. ה-ID הטכני (Attribute ID, Key Figure ID, Planning Level ID) נשאר קבוע ואנגלי. התרגומים מתוחזקים בקונפיגורציה (Translation) או דרך טעינת-תרגומים. ה-Excel add-in וה-Web UI מציגים את התיאור לפי שפת-ההתחברות. חשוב: שינוי-ID אינו אפשרי בקלות, ולכן רק ה-Description מתורגם.",
          purposeHe:
            "המטרה: לאפשר אימוץ-משתמשים גלובלי — כל משתמש רואה את המודל בשפתו — תוך שמירה על ID-טכני אחיד שאינו תלוי-שפה, למניעת כפילות ובלבול.",
          processExampleHe:
            "המודל מתוחזק עם Key Figure ID = CONSENSUSDEMAND; התיאור מתורגם ל'ביקוש מוסכם' (HE), 'Consensus Demand' (EN), 'Konsensbedarf' (DE). כל משתמש רואה את שפתו, החישוב זהה.",
          cbcHe:
            "ב-CBC הרב-לאומי: תכננים בעברית, ערבית, אנגלית ויוונית רואים תיאורים מתורגמים של אותם key figures (CONSENSUSDEMAND, SAFETYSTOCK), והדיווח-האזורי עקבי כי ה-ID זהה לכולם.",
          navHe: [
            "Web UI ► Configuration ► Attributes / Key Figures ► Translation ► תחזוקת תיאורים בשפות",
            "Excel add-in / Web UI ► Logon Language ► קובע את שפת-התצוגה של התיאורים",
          ],
          tables: ["Attributes", "Key Figures", "Planning Levels", "Translations"],
          tcodes: ["Web UI", "Configuration"],
          fiori: ["Attributes", "Key Figures", "Translation"],
          configHe: [
            "Translatable Description: לכל modeling object תיאור הניתן-לתרגום לפי שפה.",
            "Technical ID: נשאר אנגלי-קבוע ואינו מתורגם.",
            "Logon language: קובע איזה תיאור מוצג ב-Excel add-in / Web UI.",
          ],
          mistakesHe: [
            "ניסיון לקודד-משמעות ב-ID במקום בתיאור — פוגע בעקביות הרב-לשונית.",
            "תרגום חלקי — חלק מהמשתמשים רואים EN וחלק שפה-מקומית, בלבול.",
            "הסתמכות על ה-ID כתיאור-קריא — שובר אימוץ-משתמשים.",
          ],
          troubleshootHe: [
            "משתמש רואה תיאורי-אנגלית במקום שפתו ➔ חסר תרגום לשפת-ההתחברות.",
            "תיאור לא-מתעדכן ➔ תרגום הוזן אך ה-planning area לא הופעל מחדש.",
          ],
          bestPracticeHe: [
            "תרגם תיאורים לכל שפות-המשתמשים הפעילות; אל תשאיר תרגום חלקי.",
            "שמור ID טכני אנגלי-יציב; הימנע משינוי-ID.",
            "תאם מינוח-מתורגם אחיד עם הצוות העסקי המקומי.",
          ],
          interviewHe: [
            { qHe: "מה מתורגם ומה נשאר קבוע באובייקטי-מידול?", aHe: "ה-Description מתורגם לפי שפת-ההתחברות; ה-ID הטכני (Attribute/Key Figure ID) נשאר אנגלי-קבוע." },
            { qHe: "מדוע התמיכה הרב-לשונית חשובה בארגון גלובלי?", aHe: "היא מאפשרת אימוץ-משתמשים בשפתם תוך שמירה על מודל-אחיד וחישוב-זהה לכולם." },
          ],
          takeawaysHe: [
            "תיאורים מתורגמים; ID טכני נשאר אנגלי-קבוע.",
            "התצוגה לפי logon language.",
            "תרגום-מלא מקדם אימוץ-משתמשים גלובלי.",
          ],
          relatedHe: [{ labelHe: "S&OP · key figures (2.2.6)", href: "/library/sop/chapter-02/#sub-2.2.6" }],
        },
      ],
    },
    // ============================================================ 2.3
    {
      id: "2.3",
      titleHe: "ניווט במודל התכנון",
      titleEn: "Navigating the Planning Model",
      execHe:
        "לאחר שהמודל בנוי, המשתמשים מנווטים בו דרך שלוש חזיתות משלימות: ה-Excel add-in לעבודת-תכנון מפורטת, אפליקציות SAP Fiori מבוססות-Web לניטור, ניתוח וקבלת-החלטות, ו-Social Collaboration לתקשורת ולשיתוף-פעולה סביב התכנית. הבחירה בחזית תלויה במשימה ובסוג-המשתמש; כולן קוראות וכותבות לאותו planning area.",
      beginnerHe:
        "אחרי שבנינו את 'הספר' (המודל), צריך לדעת איך 'לקרוא ולכתוב' בו. יש שלוש דרכים: (1) Excel — לתכננים שעובדים מספרים בפירוט; (2) דפדפן עם מסכי Fiori — למנהלים שרוצים גרפים, dashboards וקבלת-החלטות; (3) שיתוף-פעולה חברתי — לדבר על התכנית, לשאול שאלות ולתעד החלטות בתוך המערכת.",
      consultantHe:
        "שלוש החזיתות: (1) Excel add-in (Microsoft Excel + SAP IBP ribbon) — planning views מבוססות-template, עריכה, simulation, scenarios; (2) Web-based Fiori apps — dashboards, charts, analytics, alerts, S&OP process management, application jobs; (3) Social Collaboration (מבוסס SAP Jam או תחליפו) — cases, tasks, discussions המקושרים לאובייקטי-תכנון. כל החזיתות פועלות מול אותו planning area בענן, ומשתמשות באותם versions/scenarios. הבחירה: Excel לעומק-נתונים, Web לויזואליזציה והחלטה, Collaboration לתקשורת.",
      purposeHe:
        "המטרה: להתאים את כלי-הניווט לסוג-המשימה ולמשתמש — תכנן מקבל פירוט ב-Excel, מנהל מקבל תמונה ב-Fiori, וכולם מתקשרים ב-Collaboration — כל זאת מעל מודל-אחד עקבי.",
      processExampleHe:
        "תכנן עורך תחזית ב-Excel; מנהל-מכירות בודק את ה-dashboard ב-Fiori ומזהה חריגה; הוא פותח case ב-Collaboration ומתייג את התכנן; התכנן מגיב, מתקן ב-Excel, וה-case נסגר — הכול מקושר לאותו key figure.",
      cbcHe:
        "ב-CBC: תכנני-המדינות עובדים ב-Excel add-in; מנהלי-האזור צופים ב-Fiori dashboards של S&OP; חריגות-תחזית-קיץ נדונות ב-Social Collaboration עם תיוג בעלי-עניין — מחזור-S&OP חודשי מנוהל מקצה-לקצה.",
      navHe: [
        "Excel ► SAP IBP ribbon ► Planning View ► עבודת-תכנון מפורטת",
        "Web UI ► Fiori Launchpad ► Dashboards / Analytics / S&OP Process",
        "Web UI ► Collaboration ► Cases / Tasks ► תקשורת סביב התכנית",
      ],
      tables: ["Excel add-in", "Fiori apps", "Social Collaboration", "Planning Area"],
      tcodes: ["Excel add-in", "Web UI", "Fiori Launchpad"],
      fiori: ["Dashboards", "Analytics", "S&OP Process Management", "Collaboration"],
      configHe: [
        "Excel add-in: התקנת ה-COM add-in ל-Microsoft Excel והתחברות ל-tenant.",
        "Fiori Launchpad: הקצאת tiles/apps לפי role למשתמשים.",
        "Collaboration: הגדרת case types ו-tasks המקושרים לאובייקטי-תכנון.",
      ],
      flow: [
        { he: "עריכת-נתונים", code: "Excel add-in" },
        { he: "ניתוח והחלטה", code: "Fiori Web UI" },
        { he: "תקשורת", code: "Social Collaboration" },
        { he: "מודל-אחד", code: "Planning Area", note: "מקור-אמת משותף" },
      ],
      mistakesHe: [
        "כפיית-Excel על משימות-ניתוח שמתאימות יותר ל-Fiori (וההפך).",
        "התעלמות מ-Collaboration — החלטות-תכנון לא-מתועדות מחוץ למערכת.",
        "אי-הקצאת roles נכונים ל-Fiori — משתמשים לא רואים את ה-apps הנדרשות.",
      ],
      troubleshootHe: [
        "משתמש לא רואה app ב-Fiori ➔ חסרה הקצאת-role/catalog.",
        "Excel add-in לא-מתחבר ➔ גרסת-add-in/IAS/SSO; ראה 2.3.1.",
        "Collaboration case לא-מקושר ➔ לא הוגדר case type לאובייקט-התכנון.",
      ],
      bestPracticeHe: [
        "התאם כלי למשימה: Excel לעומק, Fiori לויזואליזציה, Collaboration לתקשורת.",
        "נהל roles ב-Fiori Launchpad לפי פרסונת-משתמש.",
        "עגן את ה-S&OP-process בכל שלוש החזיתות.",
      ],
      interviewHe: [
        { qHe: "מהן שלוש חזיתות-הניווט ב-IBP?", aHe: "Excel add-in, אפליקציות Web מבוססות-Fiori, ו-Social Collaboration." },
        { qHe: "מתי עדיף Excel ומתי Fiori?", aHe: "Excel לעבודת-תכנון מפורטת ולעריכת-נתונים; Fiori לניתוח, dashboards וקבלת-החלטות." },
        { qHe: "מה משותף לכל שלוש החזיתות?", aHe: "כולן פועלות מול אותו planning area בענן ומשתמשות באותם versions/scenarios." },
      ],
      takeawaysHe: [
        "שלוש חזיתות: Excel add-in, Fiori Web apps, Social Collaboration.",
        "כל חזית למשימה אחרת; כולן על מודל-אחד.",
        "התאמת-כלי-למשימה מייעלת את תהליך-ה-S&OP.",
      ],
      relatedHe: [
        { labelHe: "S&OP · מודל-התכנון (2.2)", href: "/library/sop/chapter-02/#sub-2.2" },
        { labelHe: "S&OP · Excel UI (2.3.1)", href: "/library/sop/chapter-02/#sub-2.3.1" },
      ],
      children: [
        // ----------------------------------------------------- 2.3.1
        {
          id: "2.3.1",
          titleHe: "ממשק המשתמש ב-Excel",
          titleEn: "Excel User Interface",
          execHe:
            "ה-Excel add-in הוא חזית-העבודה המרכזית של התכננים ב-IBP: תוסף (COM add-in) ל-Microsoft Excel המוסיף סרגל SAP IBP, ודרכו מושכים planning views — תבניות מבוססות-favorite/template — עורכים key figures, מריצים simulation ו-scenarios, ושומרים חזרה ל-planning area בענן. הוא משלב את כוח-Excel המוכר עם נתוני-IBP החיים.",
          beginnerHe:
            "ה-Excel add-in הוא תוסף שמתקינים על Excel הרגיל. אחרי התקנה מופיע סרגל 'SAP IBP'. דרכו מתחברים לענן, מושכים טבלת-תכנון לתוך הגיליון, משנים מספרים כמו ב-Excel רגיל, ולוחצים 'Save' — והשינוי נשמר חזרה במערכת.",
          consultantHe:
            "ה-add-in מבוסס planning view: הגדרת attributes (filter/page/row/column) + key figures + time. תכונות-מפתח: Favorites/Templates, Simulate (חישוב מקומי לפני-שמירה), Scenarios, Master Data maintenance, Charts. נדרשת התקנת ה-add-in בגרסה התואמת ל-release, התחברות דרך IAS/SSO, ו-Excel נתמך. ביצועים תלויים בגודל planning view (מספר combinations × time periods) — מומלץ לסנן.",
          purposeHe:
            "המטרה: לתת לתכננים סביבת-עבודה מוכרת (Excel) עם גישה-חיה למודל — לערוך, לסמלץ ולשמור נתוני-תכנון בלי לעזוב את הגיליון.",
          processExampleHe:
            "תכנן פותח Favorite 'Monthly Demand', מסנן ל-Brand מסוים, רואה CONSENSUSDEMAND לפי-חודש, מעלה ערך, לוחץ Simulate לראות-השפעה, ואז Save — הנתון נכתב ל-planning area.",
          cbcHe:
            "ב-CBC כל תכנן-מדינה מחזיק Favorites ל-SKU-המשקאות שלו; לפני-קיץ הוא מסמלץ uplift ב-Simulate, משווה ב-scenario, ושומר את התחזית-המוסכמת.",
          navHe: [
            "Excel ► SAP IBP ribbon ► Log On ► התחברות ל-tenant",
            "Excel ► SAP IBP ribbon ► Favorites / New View ► פתיחת planning view",
            "Excel ► SAP IBP ribbon ► Simulate / Save ► חישוב מקומי ושמירה לענן",
          ],
          tables: ["Excel add-in", "Planning Views", "Favorites", "Templates"],
          tcodes: ["Excel add-in"],
          fiori: ["Excel add-in", "Planning View"],
          configHe: [
            "התקנת ה-COM add-in בגרסה התואמת ל-release; הגדרת חיבור-tenant.",
            "Favorites/Templates: שמירת תצוגות-תכנון לשימוש-חוזר.",
            "Filter/Page/Row/Column: עיצוב ה-planning view לפי attributes + key figures.",
          ],
          mistakesHe: [
            "גרסת-add-in לא-תואמת ל-release — שגיאות-התחברות/תצוגה.",
            "planning view ענקית ללא-סינון — איטיות וקריסות.",
            "עריכה ושמירה בלי Simulate — שינויים לא-נבדקו.",
          ],
          troubleshootHe: [
            "add-in לא-נטען ב-Excel ➔ התוסף מושבת/גרסה-לא-תואמת; הפעל מחדש והתאם גרסה.",
            "כשל-התחברות ➔ IAS/SSO או הרשאות-tenant.",
            "תצוגה איטית ➔ צמצם combinations ו-time periods בסינון.",
          ],
          bestPracticeHe: [
            "שמור גרסת-add-in תואמת ל-release ועדכן בשדרוגים.",
            "השתמש ב-Favorites/Templates ובסינון הדוק לביצועים.",
            "השתמש ב-Simulate לפני Save לבדיקת-השפעה.",
          ],
          interviewHe: [
            { qHe: "מהו ה-Excel add-in ב-IBP?", aHe: "תוסף COM ל-Microsoft Excel המוסיף סרגל SAP IBP לעבודת-תכנון חיה מול ה-planning area." },
            { qHe: "מהי planning view?", aHe: "תצוגת-תכנון מבוססת filter/page/row/column של attributes + key figures + time, נשמרת כ-Favorite/Template." },
            { qHe: "מה עושה Simulate לפני Save?", aHe: "מחשב מקומית את השפעת-השינוי לפני כתיבתו לענן, לבדיקה." },
          ],
          takeawaysHe: [
            "Excel add-in = חזית-העבודה של התכננים.",
            "planning views מבוססות filter/page/row/column + Favorites.",
            "Simulate לפני Save; סנן לביצועים; התאם גרסה ל-release.",
          ],
          relatedHe: [{ labelHe: "S&OP · versions ו-scenarios (2.2.7)", href: "/library/sop/chapter-02/#sub-2.2.7" }],
        },
        // ----------------------------------------------------- 2.3.2
        {
          id: "2.3.2",
          titleHe: "אפליקציות Web מבוססות SAP Fiori",
          titleEn: "Web-Based SAP Fiori Applications",
          execHe:
            "אפליקציות ה-Web מבוססות SAP Fiori הן חזית-הניהול והניתוח של IBP: dashboards, charts, analytics, alerts, ניהול-תהליך-S&OP, application jobs וקונפיגורציה — הכול בדפדפן, ללא Excel. הן מיועדות למנהלים, למנתחים ולמיישמים, ומספקות תמונה-ויזואלית וקבלת-החלטות מעל אותו planning area.",
          beginnerHe:
            "אלה המסכים שנפתחים בדפדפן (לא ב-Excel). יש בהם גרפים, לוחות-מחוונים (dashboards), התראות, וכפתורים לניהול תהליך-ה-S&OP. מנהל שרוצה 'לראות תמונה' ולא 'לערוך תאים' עובד כאן.",
          consultantHe:
            "ה-Web UI הוא Fiori Launchpad עם apps לפי role: Dashboards (custom charts/KPIs), Analytics (ad-hoc), Alerts/Custom Alerts (חריגות לפי-תנאי), S&OP Operator/Process Management, Application Jobs (תזמון planning runs), ו-Configuration apps (Planning Areas, Attributes, Key Figures...). ה-apps responsive ופועלות מול אותו planning area. הקצאת-apps נעשית דרך business catalogs/roles. זו גם החזית היחידה לקונפיגורציית-המודל.",
          purposeHe:
            "המטרה: לספק ניתוח-ויזואלי, ניטור-חריגות, ניהול-תהליך-S&OP וקונפיגורציה — משימות שאינן עריכת-תאים — בדפדפן, למנהלים ולמיישמים.",
          processExampleHe:
            "מנהל פותח dashboard ב-Fiori, רואה גרף תחזית-מול-אספקה, custom alert מתריע על חוסר-קיבולת בחודש מסוים; הוא לוחץ-דרך ל-analytics, מבין את הסיבה, ומפעיל את שלב ה-S&OP-review.",
          cbcHe:
            "ב-CBC מנהלי-האזור צופים ב-Fiori dashboards של תחזית, מלאי וקיבולת-מילוי; custom alerts מתריעים על חוסר-קיבולת בשיא-הקיץ; ניהול מחזור-ה-S&OP החודשי מתבצע ב-S&OP Process app.",
          navHe: [
            "Web UI ► Fiori Launchpad ► Dashboards ► גרפים ו-KPIs",
            "Web UI ► Fiori Launchpad ► Custom Alerts / Analytics ► חריגות וניתוח",
            "Web UI ► Fiori Launchpad ► S&OP Process Management / Application Jobs",
          ],
          tables: ["Fiori apps", "Dashboards", "Custom Alerts", "Application Jobs"],
          tcodes: ["Web UI", "Fiori Launchpad"],
          fiori: ["Dashboards", "Analytics", "Custom Alerts", "S&OP Process Management", "Application Jobs"],
          configHe: [
            "Roles/Business catalogs: הקצאת apps למשתמשים לפי-תפקיד.",
            "Dashboards: בניית charts/KPIs מעל key figures.",
            "Custom Alerts: הגדרת תנאי-חריגה לניטור.",
            "Application Jobs: תזמון planning runs (forecast/supply/inventory).",
          ],
          mistakesHe: [
            "אי-הקצאת roles — משתמשים לא רואים את ה-apps.",
            "ניסיון עריכת-תאים-מפורטת ב-Web במקום ב-Excel.",
            "התעלמות מ-custom alerts — חריגות לא-מנוטרות.",
          ],
          troubleshootHe: [
            "app חסר ב-Launchpad ➔ role/catalog לא-מוקצה.",
            "dashboard ריק ➔ planning area לא-הופעל או אין-נתונים בתקופה.",
            "alert לא-מופעל ➔ תנאי-חריגה/תזמון לא-הוגדר.",
          ],
          bestPracticeHe: [
            "נהל roles ו-catalogs לפי פרסונת-משתמש.",
            "השתמש ב-custom alerts לניטור-יזום של חריגות.",
            "תזמן planning runs דרך Application Jobs במקום הרצה-ידנית.",
          ],
          interviewHe: [
            { qHe: "למה משמשות אפליקציות ה-Fiori ב-IBP?", aHe: "dashboards, analytics, alerts, ניהול-תהליך-S&OP, application jobs וקונפיגורציית-מודל — בדפדפן." },
            { qHe: "היכן מבוצעת קונפיגורציית-המודל?", aHe: "ב-Web UI/Fiori (Configuration apps); זו החזית היחידה לקונפיגורציה." },
            { qHe: "מהו custom alert?", aHe: "התראה-מבוססת-תנאי המנטרת חריגות ב-key figures ומופיעה ב-Web UI." },
          ],
          takeawaysHe: [
            "Fiori Web apps = ניתוח, ניטור, ניהול-S&OP וקונפיגורציה.",
            "החזית היחידה לקונפיגורציית-המודל.",
            "Custom alerts ו-Application Jobs מייעלים ניטור ותזמון.",
          ],
          relatedHe: [{ labelHe: "S&OP · ארכיטקטורה (2.1)", href: "/library/sop/chapter-02/#sub-2.1" }],
        },
        // ----------------------------------------------------- 2.3.3
        {
          id: "2.3.3",
          titleHe: "שיתוף-פעולה חברתי",
          titleEn: "Social Collaboration",
          execHe:
            "Social Collaboration מאפשר תקשורת מובנית בתוך IBP סביב התכנית: cases, tasks, discussions ו-feeds המקושרים לאובייקטי-תכנון, כך שדיוני-S&OP, החלטות ופעולות-מעקב מתועדים במקום-אחד ולא מתפזרים במיילים. זו השכבה ה'אנושית' של התהליך — היכן שאנשים מתואמים סביב המספרים.",
          beginnerHe:
            "כל תכנון הוא בסוף שיחה בין אנשים. Social Collaboration נותן מקום בתוך המערכת לפתוח 'נושא' (case), להטיל משימות, לתייג אנשים ולנהל דיון — והכול קשור ישירות לתכנית, כך שלא מאבדים הקשר במייל.",
          consultantHe:
            "המנגנון מבוסס שכבת-שיתוף (היסטורית SAP Jam, וכיום תחליפים/אינטגרציות) ומציע: cases (אירוע/החלטה לטיפול), tasks (משימות-מעקב), discussions/feeds, ותיוג-משתמשים — מקושרים לאובייקטי-תכנון (key figure/planning view). ניתן לפתוח case מתוך dashboard/alert, להקצות אחראי ולסגור עם תיעוד. זו תמיכה ב-S&OP process steps והופכת את התהליך ל-auditable ושיתופי.",
          purposeHe:
            "המטרה: לעגן את הדיון וההחלטה בתוך הקשר-התכנון — לתעד 'למה החלטנו כך', להטיל משימות-מעקב, ולמנוע פיזור-תקשורת מחוץ למערכת.",
          processExampleHe:
            "alert מזהה חוסר-קיבולת; מנהל פותח case מתוך ה-dashboard, מתייג את מנהל-הייצור ומטיל task 'בדוק משמרת-נוספת'; הדיון מתועד, המשימה מסומנת-הושלמה, וה-case נסגר עם החלטה — הכול קשור לאותו key figure.",
          cbcHe:
            "ב-CBC חריגת-תחזית-קיץ פותחת case: תכנן-המדינה, מנהל-הייצור ומנהל-האזור דנים, מטילים task להגדלת-קיבולת-מילוי, והחלטת-ה-S&OP מתועדת בתוך IBP לצורך-מעקב ו-audit.",
          navHe: [
            "Web UI ► Collaboration ► Cases ► פתיחת case המקושר לאובייקט-תכנון",
            "Web UI ► Dashboard / Alert ► Create Case ► פתיחת-case מתוך-הקשר",
            "Web UI ► Collaboration ► Tasks / Feed ► משימות, דיון ותיוג",
          ],
          tables: ["Social Collaboration", "Cases", "Tasks", "Planning View"],
          tcodes: ["Web UI", "Collaboration"],
          fiori: ["Collaboration", "Cases", "Tasks"],
          configHe: [
            "Case types: הגדרת סוגי-cases ושיוכם לאובייקטי-תכנון.",
            "Tasks: הגדרת משימות-מעקב והקצאת-אחראים.",
            "אינטגרציית-שיתוף: חיבור שכבת ה-collaboration ל-IBP.",
          ],
          mistakesHe: [
            "ניהול-דיון במייל במקום ב-case — אובדן-הקשר ו-audit.",
            "פתיחת cases ללא אחראי/סגירה — 'נושאים פתוחים' שנשכחים.",
            "אי-קישור case לאובייקט-תכנון — אובדן-הקשר למספר.",
          ],
          troubleshootHe: [
            "case לא-מקושר לתכנית ➔ לא נפתח מתוך-הקשר/לא-הוגדר case type.",
            "משתמש לא-מקבל-התראה ➔ לא תויג או הרשאות-collaboration חסרות.",
          ],
          bestPracticeHe: [
            "פתח cases מתוך-הקשר (dashboard/alert) לשמירת-קישור.",
            "הקצה אחראי ותאריך-יעד לכל task; סגור cases עם החלטה.",
            "השתמש ב-Collaboration כתיעוד-החלטות-S&OP ל-audit.",
          ],
          interviewHe: [
            { qHe: "מה מספק Social Collaboration ב-IBP?", aHe: "cases, tasks, discussions ו-feeds המקושרים לאובייקטי-תכנון לתקשורת ותיעוד-החלטות בתוך המערכת." },
            { qHe: "מדוע לנהל דיון ב-case במקום במייל?", aHe: "כדי לשמור הקשר לתכנית, להטיל משימות-מעקב, ולהפוך את ההחלטות ל-auditable." },
          ],
          takeawaysHe: [
            "Social Collaboration = השכבה-האנושית של ה-S&OP.",
            "cases/tasks/discussions מקושרים לאובייקטי-תכנון.",
            "מתעד החלטות ל-audit ומונע פיזור-תקשורת.",
          ],
          relatedHe: [{ labelHe: "S&OP · Fiori apps (2.3.2)", href: "/library/sop/chapter-02/#sub-2.3.2" }],
        },
      ],
    },
    // ============================================================ 2.4
    {
      id: "2.4",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה הציג את מודל-התכנון של SAP IBP ואת דרכי-הניווט בו. ראינו שהמודל בנוי כהיררכיית אבני-בניין — attributes → master data types → time profiles → planning area → planning levels → key figures — ושמעליו פועלים versions ו-scenarios לתכנון-מה-אם, תמיכה רב-לשונית לאימוץ-גלובלי, ושלוש חזיתות-ניווט (Excel add-in, Fiori Web apps, Social Collaboration). הכול בענן, על HANA, מעל planning area אחד שהוא מקור-האמת.",
      beginnerHe:
        "סיכום בקצרה: בנינו 'ספר' (planning area) מ'לבנים' (attributes), 'טבלאות' (master data types) ו'סרגל-זמן' (time profile); קבענו 'רזולוציות' (planning levels) ו'מספרים' (key figures); הוספנו 'קבצי-שמירה וניסוי' (versions/scenarios) ותרגום-שפות; ולמדנו 'לקרוא ולכתוב' בו דרך Excel, דרך הדפדפן (Fiori) ודרך שיתוף-פעולה. עכשיו יש לך תמונה-שלמה של איך IBP בנוי ואיך עובדים בו.",
      consultantHe:
        "המסר-המקצועי: שלוט בסדר-הבנייה ובתלויות בין אובייקטי-המודל, התחל תמיד מ-SAPIBP1, הרץ consistency check ו-Activate בכל שינוי, וקבע time profile ו-base planning levels נכון מההתחלה כי שינוים מאוחר יקר. הבן את ההבחנה version מול scenario, את הרב-לשוניות (ID טכני מול Description מתורגם), ואת חלוקת-העבודה בין שלוש החזיתות. שליטה במודל ובניווט היא תנאי-סף לכל מימוש IBP מוצלח ולתהליך-S&OP מתפקד.",
      purposeHe:
        "המטרה של פרק-הסיכום: לקשור את אבני-הבניין לתמונה-אחת קוהרנטית, ולחדד את עקרונות-העבודה (שכפול-דוגמה, בדיקת-עקביות, הפעלה, התאמת-כלי-למשימה) שילוו כל מימוש.",
      processExampleHe:
        "מקצה-לקצה: מיישם משכפל SAPIBP1, מתאים attributes/master data/key figures, קובע time profile ו-planning levels, מפעיל, וטוען-נתונים; תכננים עובדים ב-Excel, מנהלים מנטרים ב-Fiori, וחריגות נדונות ב-Collaboration — מחזור-S&OP חי מעל מודל-אחד.",
      cbcHe:
        "ב-CBC: planning area אחד משוכפל מ-SAPIBP1 משרת את כל מדינות-האזור; משקאות-עונתיים מתוכננים ב-Excel, מנוטרים ב-Fiori, ונדונים ב-Collaboration — תהליך-S&OP אזורי אחיד מעל מודל-IBP יחיד בענן.",
      navHe: [
        "Web UI ► Configuration ► לסקירת כל אובייקטי-המודל שנבנו בפרק",
        "Excel add-in + Fiori Launchpad ► לתרגול שלוש חזיתות-הניווט",
      ],
      tables: ["Planning Area", "Attributes", "Master Data Types", "Time Profiles", "Planning Levels", "Key Figures"],
      tcodes: ["Web UI", "Excel add-in", "Configuration"],
      fiori: ["Planning Areas", "Key Figures", "Dashboards", "Collaboration"],
      configHe: [
        "זכור את סדר-הבנייה: attributes → master data types → time profile → planning area → planning levels → key figures.",
        "שכפל SAPIBP1, הרץ consistency check, והפעל (Activate) בכל שינוי.",
        "התאם כלי-ניווט למשימה: Excel/Fiori/Collaboration.",
      ],
      mistakesHe: [
        "התייחסות לאבני-הבניין כבלתי-תלויות — הן היררכיות וקשורות.",
        "דילוג על עקרונות-העבודה (שכפול/בדיקה/הפעלה) במימוש-אמיתי.",
      ],
      troubleshootHe: [
        "אם משהו במודל לא-עובד ➔ חזור על שרשרת-התלויות מ-attribute ועד key figure ובדוק Activate.",
      ],
      bestPracticeHe: [
        "פנימוּ את סדר-הבנייה ואת התלויות לפני מימוש.",
        "אמצו את עקרונות SAPIBP1 + consistency check + Activate כשגרה.",
        "התאימו את החזית למשימה ולמשתמש.",
      ],
      interviewHe: [
        { qHe: "מהו רצף אבני-הבניין של מודל-IBP?", aHe: "attributes → master data types → time profile → planning area → planning levels → key figures." },
        { qHe: "מהם שלושת עקרונות-העבודה המרכזיים במימוש-מודל?", aHe: "שכפול SAPIBP1, הרצת consistency check, והפעלה (Activate) בכל שינוי." },
        { qHe: "כיצד מחלקים את העבודה בין שלוש החזיתות?", aHe: "Excel לעריכה מפורטת, Fiori לניתוח והחלטה, Social Collaboration לתקשורת ותיעוד." },
      ],
      takeawaysHe: [
        "המודל = היררכיית אבני-בניין מעל planning area אחד בענן.",
        "versions/scenarios לתכנון-מה-אם; רב-לשוניות לאימוץ-גלובלי.",
        "שלוש חזיתות-ניווט; כלי לכל-משימה; SAPIBP1 + consistency + Activate.",
      ],
      relatedHe: [
        { labelHe: "S&OP · מודל-התכנון (2.2)", href: "/library/sop/chapter-02/#sub-2.2" },
        { labelHe: "S&OP · ניווט במודל (2.3)", href: "/library/sop/chapter-02/#sub-2.3" },
      ],
    },
  ],
};
