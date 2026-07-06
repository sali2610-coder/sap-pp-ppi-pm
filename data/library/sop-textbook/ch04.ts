// ===== S&OP with SAP IBP — Chapter 4 (gold-standard learning chapter) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Source hierarchy preserved exactly; SAP/IBP identifiers verbatim English.
import type { TextbookChapter } from "./types";

export const CH4: TextbookChapter = {
  n: 4,
  titleHe: "תכנון אספקה לא-מוגבל",
  titleEn: "Unconstrained Supply Planning",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לתכנון אספקה לא-מוגבל ב-SAP IBP for Sales and Operations באמצעות ה-S&OP heuristic. כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך מקצה-לקצה, דוגמת הארגון (חברת-בקבוק של Example Product), ניווט באפליקציות-הענן של IBP, מפתחות-נתונים (key figures), פרטי-תצורה, תרשים-זרימה של התפשטות הביקוש וההיצע, טעויות נפוצות, פתרון-תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. ה-S&OP heuristic הוא מנוע פשוט, שקוף וניתן-להסבר: הוא מתפשט מהביקוש כלפי מטה ברשת-האספקה (network) ומחשב היצע נדרש בכל צומת בלי להתחשב במגבלות-קיבולת — ומכאן השם 'unconstrained' (אספקה אינסופית / infinite). המטרה: ללמוד את הנושא לעומק ולהיות מסוגל להגדיר, להריץ ולתחזק את ה-heuristic ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 4.1
    {
      id: "4.1",
      titleHe: "מבט-על על תכנון לא-מוגבל",
      titleEn: "Unconstrained Planning at a Glance",
      execHe:
        "תכנון אספקה לא-מוגבל (unconstrained / infinite planning) עונה על השאלה 'כמה צריך לייצר, להעביר ולרכוש כדי לכסות את הביקוש המוסכם' — בהנחה שאין מגבלות-קיבולת. ה-S&OP heuristic ב-SAP IBP לוקח את הביקוש המוסכם (consensus demand) ומתפשט איתו כלפי מטה לאורך כל שכבות רשת-האספקה: לקוחות ← מרכזי-הפצה ← מפעלים ← ספקים. התוצאה היא תוכנית-אספקה שקופה וניתנת-להסבר, המשמשת בסיס ל-S&OP החודשי ולשיחה הניהולית על פערים.",
      beginnerHe:
        "דמיין שאתה יודע כמה בקבוקי-משקה הלקוחות ירצו בחודש הבא, ואתה רוצה לדעת כמה לייצר בכל מפעל וכמה חומר-גלם להזמין. 'לא-מוגבל' אומר: בוא נניח לרגע שיש אינסוף קיבולת, ונחשב מה צריך כדי לכסות את כל הביקוש. זה נותן תמונה נקייה של 'מה הביקוש דורש מאיתנו', לפני שמתחילים לדבר על מגבלות. ה-heuristic הוא מנוע-חישוב פשוט: מתחיל בביקוש ומפזר אותו אחורה דרך הרשת עד חומרי-הגלם.",
      consultantHe:
        "ה-S&OP heuristic הוא אלגוריתם דטרמיניסטי, single-pass, הרץ על מודל-התכנון של IBP (planning area, time-series). בניגוד ל-optimizer הוא אינו פותר בעיית-אופטימיזציה ואינו מתחשב במגבלות (capacity, lead-time enforcement) — הוא מחשב requirements לא-מוגבלים top-down לאורך ה-supply network. הוא שקוף לחלוטין: כל key figure-תוצאה ניתן להסבר ממקורותיו. הוא מהיר, מתאים ל-rapid what-if ול-volume-level S&OP. הקלט המרכזי הוא ה-consensus demand; הפלט הוא Dependent/Total Demand, Production/Transport/External Receipts ו-Projected Inventory בכל location-product. רץ כ-application job ('Run S&OP Operator') או דרך ה-Excel/Web UI.",
      purposeHe:
        "המטרה העסקית: לספק במהירות תוכנית-אספקה ברורה שעונה 'מה הביקוש דורש מהרשת' — בלי לסבך אותה במגבלות. זה הבסיס לדיון-הפערים ב-S&OP: קודם רואים את הדרישה הלא-מוגבלת, ואז משווים אותה לקיבולת בפועל (דרך RCCP או optimizer) כדי לזהות צווארי-בקבוק. בלי שלב לא-מוגבל קשה להפריד בין 'מה אנחנו צריכים' ל'מה אנחנו יכולים'.",
      processExampleHe:
        "מנהל ה-S&OP מאשר את ה-consensus demand ל-12 החודשים הבאים, ומריץ את ה-S&OP heuristic; המנוע מתפשט מהביקוש לכל לקוח, דרך מרכזי-ההפצה, אל המפעלים ואל הספקים, ומחשב כמה לייצר/להעביר/לרכוש בכל צומת. התוצאה: Projected Inventory ו-Total Receipts בכל location-product. כעת אפשר לבדוק היכן הדרישה הלא-מוגבלת חורגת מהקיבולת — ולהעביר את הפער לדיון הניהולי.",
      scenarioHe:
        "בארגון: הביקוש המוסכם לכל SKU של משקה (לפי לקוח/רשת-קמעונאות) מתפשט אחורה דרך מרכזי-ההפצה האזוריים אל מפעלי-המילוי, ומשם אל דרישות תרכיז, סוכר, CO2 ובקבוקים. ה-heuristic מראה כמה כל מפעל 'צריך' לייצר בלי מגבלות — בסיס מצוין לזהות אילו קווי-מילוי ייכנסו לעומס-יתר עוד לפני שלב ה-RCCP.",
      navHe: [
        "SAP IBP Web UI ► Application Jobs ► Schedule IBP Jobs ► Job Type: S&OP Operator (Run)",
        "SAP IBP for Sales and Operations ► Supply Planning Heuristic (S&OP heuristic)",
        "IBP Excel Add-In ► Advanced ► Run Operator ► S&OP Heuristic",
      ],
      tables: ["Planning Area", "Consensus Demand", "Total Demand", "Projected Inventory"],
      tcodes: ["Run S&OP Operator", "Application Jobs", "Manage Planning Area"],
      fiori: ["Schedule IBP Jobs", "Application Jobs", "Planning Areas"],
      configHe: [
        "Planning Area: בסיס-הנתונים של ה-heuristic — מכיל את כל ה-key figures, ה-time profile וה-attributes של רשת-האספקה.",
        "S&OP heuristic מופעל כ-Operator על ה-planning area; אין צורך בפתרון-אופטימיזציה.",
        "טווח-התכנון (planning horizon) נגזר מה-time profile; ה-heuristic לא-מוגבל מתעלם ממגבלות-קיבולת כברירת-מחדל.",
        "Key figure calculations (rules) ב-planning area קובעים כיצד הביקוש וההיצע נצברים ומתפשטים.",
      ],
      flow: [
        { he: "Consensus Demand (קלט)", code: "S&OP heuristic", note: "ביקוש מוסכם לכל location-product" },
        { he: "התפשטות ביקוש top-down", code: "Demand Propagation", note: "לקוחות←DC←מפעלים←ספקים" },
        { he: "חישוב היצע נדרש", code: "Supply Propagation", note: "Production/Transport/External Receipts" },
        { he: "Projected Inventory", code: "Inventory Balance", note: "מלאי-חזוי בכל צומת" },
        { he: "פלט ל-S&OP", code: "Gap Review", note: "בסיס לדיון-פערים" },
      ],
      masterDataHe: [
        "Master data types: Product, Location, Customer, Resource, Source of Supply — מגדירים את רשת-האספקה.",
        "Sourcing rules (production/transport/external) קובעים את מסלולי-ההתפשטות.",
        "Key figures: Consensus Demand, Dependent Demand, Total Demand, Production/Transport/External Receipts, Projected Inventory.",
      ],
      mistakesHe: [
        "ערבוב בין 'unconstrained' ל'constrained' — ה-heuristic לא-מוגבל אינו מכבד קיבולת; אל תצפה ממנו ל-feasible plan.",
        "הרצת heuristic בלי consensus demand תקף — הפלט יהיה ריק או חלקי.",
        "ציפייה ש-RCCP יוצר תוכנית-קיבולת מוגבלת — RCCP רק מודד עומס, לא מגביל.",
        "שכחה שהמנוע single-pass — אין איטרציות; הסדר נקבע ע\"י ה-sourcing.",
      ],
      troubleshootHe: [
        "אין Total Receipts בפלט ➔ בדוק שקיימים sourcing rules תקפים לכל location-product.",
        "Projected Inventory לא-הגיוני ➔ בדוק initial inventory ו-key figure calculations.",
        "ה-job נכשל ➔ בדוק Application Jobs log ו-planning area consistency.",
        "ביקוש לא מתפשט אחורה ➔ חסרה supply network שלמה (gaps בין שכבות).",
      ],
      bestPracticeHe: [
        "הרץ קודם heuristic לא-מוגבל לקבלת תמונה נקייה, ורק אז optimizer/RCCP לבחינת היתכנות.",
        "ודא רשת-אספקה שלמה ועקבית לפני ההרצה (אין צמתים יתומים).",
        "השתמש ב-heuristic ל-what-if מהיר ברמת-נפח; שמור optimizer לפתרון-פערים.",
        "תעד את משמעות כל key figure-תוצאה לצוות ה-S&OP.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין S&OP heuristic ל-optimizer ב-IBP?", aHe: "ה-heuristic הוא מנוע דטרמיניסטי single-pass המתפשט מהביקוש top-down ומחשב היצע לא-מוגבל בלי לכבד קיבולת; ה-optimizer פותר בעיית-אופטימיזציה תחת מגבלות ונותן תוכנית feasible. ה-heuristic שקוף ומהיר; ה-optimizer מורכב יותר אך מכבד constraints." },
        { qHe: "למה קוראים לזה 'unconstrained'?", aHe: "המנוע מניח קיבולת אינסופית (infinite) ומחשב את כל ההיצע שהביקוש דורש בלי להגביל אותו במגבלות-משאבים. כך מקבלים תמונה נקייה של דרישת-הביקוש." },
      ],
      takeawaysHe: [
        "S&OP heuristic = מנוע דטרמיניסטי, שקוף, single-pass, לא-מוגבל.",
        "מתפשט מ-consensus demand top-down דרך רשת-האספקה.",
        "פלט: Total Demand, Receipts ו-Projected Inventory בכל צומת.",
        "בסיס לדיון-פערים: 'מה צריך' לפני 'מה אפשר'.",
      ],
      relatedHe: [
        { labelHe: "S&OP · ה-heuristic (4.2)", href: "/library/sop/chapter-04/#sub-4.2" },
        { labelHe: "S&OP · RCCP (4.7)", href: "/library/sop/chapter-04/#sub-4.7" },
      ],
    },
    // ============================================================ 4.2
    {
      id: "4.2",
      titleHe: "ה-S&OP Heuristic",
      titleEn: "The S&OP Heuristic",
      execHe:
        "ה-S&OP heuristic הוא מנוע-החישוב המרכזי של תכנון-האספקה הלא-מוגבל ב-IBP. הוא מבצע מעבר אחד (single-pass) על רשת-האספקה: ממיר את הביקוש המוסכם לדרישות-תלויות בכל צומת, ומחשב את ההיצע הנדרש (ייצור, הובלה, רכש) כדי לכסותן — בלי מגבלות. שקיפותו ומהירותו הופכות אותו לכלי-הבחירה לתכנון-נפח חודשי ולסימולציות מהירות.",
      beginnerHe:
        "Heuristic = 'כלל-אצבע' חישובי. במקום לפתור משוואה ענקית, המנוע פשוט הולך שלב-אחר-שלב: 'יש ביקוש כאן ➔ אז צריך לקבל אספקה משם ➔ אז צריך לייצר/להעביר/לרכוש'. הוא עושה זאת פעם אחת, מלמעלה למטה, ומסכם הכל. פשוט להבין ומהיר להריץ.",
      consultantHe:
        "המנוע פועל בשני שלבים מושגיים: (1) Demand propagation — צבירת ה-consensus demand לכל location-product, חישוב net demand אחרי forecast consumption, ופיזורו אחורה דרך customer/location/production sourcing ל-dependent demand; (2) Supply propagation — חישוב Production/Transport/External Receipts, components, ו-Projected Inventory. ה-heuristic מכבד sourcing rules, quota arrangements, lot sizes ו-validity dates, אך לא מכבד resource capacity (זה תפקיד ה-RCCP/optimizer). פרמטרים מרכזיים (processing mode, heuristic type, planning level) נקבעים בהגדרת ה-operator.",
      purposeHe:
        "לספק מנוע-אספקה מהיר ושקוף שכל מתכנן יכול להריץ ולהסביר. המטרה: לקבל תוכנית-אספקה לא-מוגבלת תוך דקות, לתמוך ב-what-if, ולהוות בסיס ל-RCCP ולדיון הניהולי.",
      processExampleHe:
        "מתכנן מריץ את ה-heuristic לאחר עדכון-תחזית. תוך דקות מתקבלים Total Demand, Total Receipts ו-Projected Inventory לכל SKU/מיקום. הוא בודק היכן המלאי-החזוי שלילי (חוסר) או חורג מהקיבולת, ומעביר ל-RCCP לבדיקת-עומס.",
      scenarioHe:
        "בארגון ה-heuristic רץ אחרי כל סבב-תחזית: ממיר ביקוש-משקאות לדרישות-ייצור בכל מפעל ולדרישות תרכיז/סוכר/CO2 מהספקים, תוך שניות — ומאפשר לצוות ה-S&OP לראות מיד היכן צפוי חוסר.",
      navHe: [
        "SAP IBP Web UI ► Application Jobs ► S&OP Operator ► Supply Heuristic",
        "IBP Excel Add-In ► Advanced ► Run ► S&OP Heuristic Operator",
        "Configuration ► Operators ► Define S&OP Operator (Profile)",
      ],
      tables: ["Operator Profile", "Consensus Demand", "Dependent Demand", "Total Receipts"],
      tcodes: ["Run S&OP Operator", "Define Operator", "Application Jobs"],
      fiori: ["Schedule IBP Jobs", "Operators", "Application Logs"],
      configHe: [
        "Operator Profile: מגדיר את סוג ה-heuristic, processing mode, planning level וטווח-הזמן.",
        "Sourcing rules, quota arrangements ו-lot sizes הם הקלט שמכוון את ההתפשטות.",
        "Key figure calculations ב-planning area מבצעים את הצבירה והפיזור בפועל.",
        "ניתן לתזמן את ה-operator כ-application job חוזר.",
      ],
      flow: [
        { he: "Consensus Demand", code: "Aggregate", note: "צבירה לכל location-product" },
        { he: "Demand Propagation", code: "Sourcing", note: "פיזור אחורה ל-dependent demand" },
        { he: "Supply Propagation", code: "Receipts", note: "Production/Transport/External" },
        { he: "Projected Inventory", code: "Balance", note: "מלאי-חזוי" },
      ],
      masterDataHe: [
        "Sourcing rules (production/transport/external) מנתבים את ההתפשטות.",
        "Lot sizes ו-quota arrangements מעצבים את כמויות-ההיצע.",
        "Validity dates קובעים אילו מקורות פעילים בכל תקופה.",
      ],
      mistakesHe: [
        "ציפייה לתוכנית feasible — ה-heuristic לא-מוגבל; קיבולת מטופלת ב-RCCP/optimizer.",
        "אי-הבנת processing mode (delta מול full) ➔ תוצאות חלקיות לא-צפויות.",
        "הזנחת validity dates ➔ מקורות-אספקה לא-נכונים נבחרים.",
        "התעלמות מ-application log אחרי הרצה כושלת.",
      ],
      troubleshootHe: [
        "תוצאות חסרות ➔ processing mode/planning level שגוי או sourcing חסר.",
        "המנוע איטי ➔ planning level נמוך מדי (פירוט יתר) או scope גדול.",
        "כמויות שגויות ➔ lot sizes / quota arrangements לא-תקינים.",
        "שגיאות ➔ עיין ב-Application Logs לאיתור הצומת הבעייתי.",
      ],
      bestPracticeHe: [
        "הגדר Operator Profile ייעודי ל-S&OP לא-מוגבל ושמור אותו עקבי.",
        "הרץ ברמת-נפח (planning level מתאים) למהירות מרבית.",
        "בדוק תמיד application log אחרי הרצה.",
        "שמור על רשת-אספקה ו-sourcing נקיים — הם מכוונים את כל ההתפשטות.",
      ],
      interviewHe: [
        { qHe: "מהם שני השלבים של ה-S&OP heuristic?", aHe: "Demand propagation (צבירת ופיזור הביקוש אחורה ל-dependent demand) ו-supply propagation (חישוב Production/Transport/External Receipts ו-Projected Inventory)." },
        { qHe: "מה מכוון את התפשטות הביקוש ב-heuristic?", aHe: "Sourcing rules, quota arrangements, lot sizes ו-validity dates — הם קובעים לאן ובאיזו כמות הביקוש מתפזר אחורה." },
      ],
      takeawaysHe: [
        "Heuristic = כלל-אצבע חישובי single-pass.",
        "שני שלבים: demand propagation ואז supply propagation.",
        "מכבד sourcing/lot size/validity — לא מכבד קיבולת.",
        "מהיר ושקוף; כלי-בחירה ל-S&OP נפחי.",
      ],
      relatedHe: [
        { labelHe: "S&OP · התפשטות ביקוש (4.5)", href: "/library/sop/chapter-04/#sub-4.5" },
        { labelHe: "S&OP · פרמטרים של ה-heuristic (4.8)", href: "/library/sop/chapter-04/#sub-4.8" },
      ],
    },
    // ============================================================ 4.3
    {
      id: "4.3",
      titleHe: "תכנון רשת-האספקה",
      titleEn: "Supply Network Design",
      execHe:
        "רשת-האספקה (supply network) היא המודל שעליו ה-heuristic רץ: אילו מוצרים מיוצרים/מאוחסנים היכן, מי הלקוחות, ואילו מסלולי-אספקה (sourcing) מחברים ביניהם. עיצוב נכון של הרשת הוא תנאי-סף — אם הרשת חסרה צומת או מסלול, הביקוש לא יתפשט נכון וההיצע יהיה שגוי.",
      beginnerHe:
        "לפני שאפשר לחשב כמה לייצר, צריך לצייר את 'המפה': מאיפה מגיע כל מוצר, לאן הוא נע, ומי קונה אותו. המפה הזו = רשת-האספקה. היא בנויה ממוצרים, מיקומים ולקוחות, ומקווי-החיבור ביניהם (sourcing rules).",
      consultantHe:
        "רשת-האספקה ב-IBP נבנית מ-master data: Product, Location, Customer, ומ-sourcing (production source, transportation lane/source, external receipt source). כל קשת ברשת היא source of supply עם ratio/quota, validity ו-lead time. ה-heuristic עובר על הרשת לפי ה-sourcing; שלמות ועקביות הרשת (network accuracy) הם קריטיים — gaps גורמים ל-unsourced demand. Check mode מאמת את שלמות הרשת לפני/בזמן ההרצה.",
      purposeHe:
        "לתת ל-heuristic מסלול ברור להתפשטות: לכל location-product צריך מקור-אספקה, ולכל ביקוש-לקוח צריך מיקום שמשרת אותו. ללא רשת שלמה אין תכנון-אספקה תקף.",
      processExampleHe:
        "מגדירים: מוצר משקה ב-DC אזורי המקבל בהובלה ממפעל-מילוי, המייצר מתרכיז הנרכש מספק. כל קשת = sourcing rule. כשמריצים heuristic, הביקוש ב-DC מתפשט דרך ההובלה למפעל ומשם לרכש.",
      scenarioHe:
        "בארגון הרשת: לקוחות/רשתות-קמעונאות ← מרכזי-הפצה אזוריים ← מפעלי-מילוי ← ספקי-תרכיז/סוכר. כל קו = sourcing. אם DC חדש לא חובר ב-transportation lane למפעל, הביקוש שלו יישאר unsourced.",
      navHe: [
        "SAP IBP Web UI ► Master Data ► Manage Master Data (Product, Location, Customer)",
        "SAP IBP ► Master Data ► Sourcing (Production Source, Transportation Lane, External Source)",
        "Configuration ► Master Data Types ► Supply Network",
      ],
      tables: ["Product", "Location", "Customer", "Source of Supply", "Transportation Lane"],
      tcodes: ["Manage Master Data", "Sourcing Rules", "Network Check"],
      fiori: ["Manage Master Data", "Supply Chain Network", "Master Data Workbook"],
      configHe: [
        "Master data types: Product, Location, Customer מוגדרים ב-configuration ומאוכלסים בנתונים.",
        "Sourcing: Production Source, Transportation Source/Lane, External Receipt Source — מגדירים את הקשתות.",
        "Check mode מאמת שלמות-רשת (network accuracy) לפני/בזמן ההרצה.",
        "Subnetworks מאפשרים לפלח את הרשת ל-scopes נפרדים לתכנון.",
      ],
      flow: [
        { he: "מוצרים/מיקומים/לקוחות", code: "Master Data", note: "צמתי הרשת" },
        { he: "Sourcing rules", code: "Sources", note: "קשתות החיבור" },
        { he: "Network check", code: "Check Mode", note: "אימות שלמות" },
        { he: "רשת מוכנה ל-heuristic", code: "Run", note: "התפשטות תקפה" },
      ],
      masterDataHe: [
        "Product, Location, Customer = צמתי הרשת.",
        "Source of Supply (production/transport/external) = קשתות עם ratio, validity, lead time.",
        "Subnetwork attributes לפילוח scope-התכנון.",
      ],
      mistakesHe: [
        "צמתים-יתומים (location-product בלי source) ➔ unsourced demand.",
        "Transportation lane חסר בין DC למפעל ➔ ביקוש לא מתפשט.",
        "Validity dates לא-חופפים בין קשתות ➔ פערים בזמן.",
        "התעלמות מ-check mode ➔ שגיאות-רשת מתגלות מאוחר.",
      ],
      troubleshootHe: [
        "Unsourced demand ➔ הוסף sourcing rule ל-location-product החסר.",
        "ביקוש 'תקוע' בצומת ➔ חסר transportation/production source הלאה.",
        "פערי-זמן ➔ validity dates של הקשתות לא-רציפים.",
        "שגיאות network check ➔ תקן את הצמתים/קשתות שדווחו.",
      ],
      bestPracticeHe: [
        "הרץ network check לפני כל סבב-תכנון משמעותי.",
        "ודא שכל location-product נושא לפחות source אחד תקף.",
        "השתמש ב-subnetworks לפילוח רשת גדולה לתכנון ממוקד.",
        "תחזק validity dates רציפים בין קשתות.",
      ],
      interviewHe: [
        { qHe: "ממה בנויה רשת-אספקה ב-IBP?", aHe: "מצמתים (Product, Location, Customer) ומקשתות (sourcing rules: production/transport/external sources) — כל קשת נושאת ratio, validity ו-lead time." },
        { qHe: "מהי unsourced demand?", aHe: "ביקוש על location-product שאין לו מקור-אספקה מוגדר; ה-heuristic לא יכול לפתור אותו, ולכן הוא נשאר לא-מכוסה — סימן לפער ברשת." },
      ],
      takeawaysHe: [
        "רשת-האספקה היא המפה שה-heuristic רץ עליה.",
        "צמתים = מוצרים/מיקומים/לקוחות; קשתות = sourcing.",
        "שלמות-רשת (network accuracy) היא תנאי-סף.",
        "Check mode ו-subnetworks תומכים בעקביות ובפילוח.",
      ],
      relatedHe: [
        { labelHe: "S&OP · כללי sourcing (4.3.2)", href: "/library/sop/chapter-04/#sub-4.3.2" },
        { labelHe: "S&OP · התפשטות ביקוש (4.5)", href: "/library/sop/chapter-04/#sub-4.5" },
      ],
      children: [
        {
          id: "4.3.1",
          titleHe: "מוצרים, מיקומים ולקוחות",
          titleEn: "Products, Locations, and Customers",
          execHe:
            "שלושת אבני-היסוד של רשת-האספקה: Product (מה מתוכנן), Location (היכן — מפעל/DC/ספק/לקוח) ו-Customer (מי קונה). השילוב location-product הוא יחידת-התכנון הבסיסית של ה-heuristic.",
          beginnerHe:
            "כל תכנון צריך לדעת שלושה דברים: מה (מוצר), איפה (מיקום) ומי (לקוח). ב-IBP אלה שלושה סוגי master data נפרדים המתחברים יחד ליצירת 'מי צריך מה ואיפה'.",
          consultantHe:
            "Product, Location ו-Customer הם master data types ב-planning area. ה-heuristic עובד ברמת location-product (ולעיתים customer-product לביקוש). Location נושא type (plant/DC/supplier/customer location). Customer מחובר ל-location דרך customer sourcing. ה-attributes (region, product family) משמשים לצבירה ולפילוח. נכונות ושלמות נתוני-האב קובעות את איכות-התכנון.",
          purposeHe:
            "להגדיר את ישויות-היסוד שעליהן מתבצע כל חישוב: יחידת-התכנון location-product, ומקור-הביקוש customer-product.",
          processExampleHe:
            "מוצר 'Drink 1.5L' מוגדר ב-Location 'DC-North'; Customer 'Retail-A' קונה אותו. ה-heuristic מתכנן את location-product 'Bev1.5L@DC-North' כדי לכסות את ביקוש Retail-A.",
          scenarioHe:
            "בארגון: Product = SKU של משקה; Location = מפעל-מילוי/DC; Customer = רשת-קמעונאות. כל שילוב location-product (משקה@DC) הוא יחידת-תכנון של ה-heuristic.",
          navHe: [
            "SAP IBP Web UI ► Master Data ► Manage Master Data ► Product",
            "SAP IBP Web UI ► Master Data ► Manage Master Data ► Location",
            "SAP IBP Web UI ► Master Data ► Manage Master Data ► Customer",
          ],
          tables: ["Product", "Location", "Customer", "Location Product"],
          tcodes: ["Manage Master Data", "Master Data Workbook"],
          fiori: ["Manage Master Data", "Master Data Workbook"],
          configHe: [
            "הגדר Product/Location/Customer כ-master data types עם ה-attributes הנדרשים (region, family, type).",
            "Location type קובע אם זה plant/DC/supplier/customer.",
            "יחידת-התכנון location-product נגזרת מהשילוב.",
          ],
          mistakesHe: [
            "Location בלי type נכון ➔ sourcing שגוי.",
            "Product ללא attributes לצבירה ➔ קושי באגרגציה.",
            "Customer לא מחובר ל-location ➔ ביקוש לא מתפשט.",
          ],
          troubleshootHe: [
            "location-product לא מתוכנן ➔ בדוק שקיים השילוב ושיש לו source.",
            "ביקוש-לקוח לא מגיע למיקום ➔ customer sourcing חסר.",
          ],
          bestPracticeHe: [
            "תחזק attributes עקביים (region/family) לצבירה נקייה.",
            "ודא location type מדויק לכל מיקום.",
            "נקה location-products לא-פעילים.",
          ],
          interviewHe: [
            { qHe: "מהי יחידת-התכנון הבסיסית של ה-heuristic?", aHe: "Location-product — השילוב של מוצר ומיקום; כל חישובי-ההיצע מתבצעים ברמה זו." },
          ],
          takeawaysHe: [
            "Product/Location/Customer = אבני-היסוד.",
            "Location-product = יחידת-התכנון.",
            "Attributes מאפשרים צבירה ופילוח.",
          ],
        },
        {
          id: "4.3.2",
          titleHe: "כללי sourcing",
          titleEn: "Sourcing Rules",
          execHe:
            "Sourcing rules מגדירים מאיפה כל location-product מקבל אספקה: ייצור עצמי (production source), הובלה ממיקום אחר (transportation source/lane), או רכש חיצוני (external receipt source). הם הקשתות שלאורכן ה-heuristic מתפשט אחורה.",
          beginnerHe:
            "לכל מוצר בכל מיקום צריך לענות 'מאיפה הוא מגיע?'. שלוש תשובות אפשריות: מייצרים אותו כאן, מעבירים אותו ממקום אחר, או קונים אותו מספק. כלל ה-sourcing הוא התשובה הזו.",
          consultantHe:
            "שלושה סוגי sourcing: Production Source (תפוקה + components + resource), Transportation Source/Lane (ship-from location עם lead time), External Receipt Source (רכש מספק). כל source נושא validity, ratio/quota ו-lead time. כשקיימים מספר sources לאותו location-product, quota arrangement מחלק את הביקוש. ה-heuristic בוחר sources תקפים-בזמן ומפזר לפי ה-quota.",
          purposeHe:
            "להגדיר את מסלולי-ההתפשטות של הביקוש אחורה ברשת — בלעדיהם הביקוש 'נתקע' ונשאר unsourced.",
          processExampleHe:
            "מוצר ב-DC עם transportation source ממפעל; המפעל עם production source (מתרכיז); התרכיז עם external source מספק. הביקוש מתפשט: DC→מפעל→ספק.",
          scenarioHe:
            "בארגון: DC מקבל ב-transportation source ממפעל-מילוי; מפעל-מילוי מייצר ב-production source (תרכיז+סוכר+CO2); תרכיז ב-external source מספק-תרכיז.",
          navHe: [
            "SAP IBP ► Master Data ► Sourcing ► Production Source of Supply",
            "SAP IBP ► Master Data ► Sourcing ► Transportation Source / Lane",
            "SAP IBP ► Master Data ► Sourcing ► External Receipt Source",
          ],
          tables: ["Production Source", "Transportation Lane", "External Source", "Quota Arrangement"],
          tcodes: ["Manage Master Data", "Sourcing"],
          fiori: ["Manage Master Data", "Sourcing Workbook"],
          configHe: [
            "Production Source: תפוקת-מוצר + components + resource.",
            "Transportation Source/Lane: ship-from location + lead time + ratio.",
            "External Receipt Source: ספק + lead time.",
            "Quota Arrangement: חלוקת ביקוש בין מספר sources.",
          ],
          mistakesHe: [
            "Source בלי validity מתאים ➔ לא נבחר בתקופה.",
            "מספר sources ללא quota ➔ חלוקה לא-צפויה.",
            "ratio שלא מסתכם ל-100% ➔ ביקוש חלקי.",
          ],
          troubleshootHe: [
            "Unsourced demand ➔ הוסף/תקן source ל-location-product.",
            "חלוקה שגויה בין sources ➔ בדוק quota arrangement.",
            "source לא פעיל ➔ validity dates.",
          ],
          bestPracticeHe: [
            "ודא לכל location-product לפחות source תקף אחד.",
            "השתמש ב-quota arrangements מפורשים כשיש מספר מקורות.",
            "תחזק validity רציף.",
          ],
          interviewHe: [
            { qHe: "מהם שלושת סוגי ה-sourcing ב-IBP?", aHe: "Production source (ייצור עצמי), Transportation source/lane (הובלה ממיקום אחר), ו-External receipt source (רכש מספק)." },
            { qHe: "מה עושה quota arrangement?", aHe: "מחלק את הביקוש בין מספר sources של אותו location-product לפי יחסים מוגדרים." },
          ],
          takeawaysHe: [
            "Sourcing = הקשתות של הרשת.",
            "שלושה סוגים: production/transport/external.",
            "Quota arrangement מחלק בין מקורות מרובים.",
          ],
          relatedHe: [
            { labelHe: "S&OP · sourcing לקוח (4.5.3)", href: "/library/sop/chapter-04/#sub-4.5.3" },
            { labelHe: "S&OP · sourcing מיקום (4.5.5)", href: "/library/sop/chapter-04/#sub-4.5.5" },
          ],
        },
        {
          id: "4.3.3",
          titleHe: "דיוק רשת-האספקה ו-Check Mode",
          titleEn: "Supply Network Accuracy and Check Mode",
          execHe:
            "Network accuracy = מידת שלמותה ועקביותה של רשת-האספקה. Check mode הוא מנגנון אימות המריץ את ה-heuristic במצב-בדיקה כדי לזהות gaps (צמתים-יתומים, sources חסרים, validity לא-רציף) לפני הרצת-תכנון אמיתית.",
          beginnerHe:
            "לפני שמריצים תכנון 'אמיתי', כדאי לבדוק שהמפה שלמה — שאין מוצר בלי מקור-אספקה ושאין חורים בקווי-החיבור. Check mode עושה בדיוק את זה: הרצת-ניסיון המדווחת על בעיות.",
          consultantHe:
            "Check mode מריץ את לוגיקת-ה-heuristic אך מתמקד באיתור inconsistencies: location-products בלי source, sourcing עם validity gaps, components חסרים, או circular references. ה-application log מפרט את הצמתים הבעייתיים. הרצה ב-check mode לפני production run מונעת תוצאות שגויות ו-unsourced demand. דיוק-רשת גבוה = תוצאות-heuristic אמינות.",
          purposeHe:
            "לוודא שהרשת מוכנה לתכנון — לזהות ולתקן פערים לפני שהם פוגעים בתוצאות.",
          processExampleHe:
            "לפני סבב-S&OP חודשי מריצים check mode; הלוג מדווח על 3 location-products בלי source. המתכנן מוסיף sourcing, מריץ שוב — נקי — ואז מריץ תכנון אמיתי.",
          scenarioHe:
            "בארגון לאחר הוספת DC חדש, check mode מגלה שאין transportation lane אליו ממפעל; מתקנים לפני ההרצה הרשמית.",
          navHe: [
            "SAP IBP Web UI ► Application Jobs ► S&OP Operator ► Check Mode",
            "SAP IBP ► Supply Planning ► Network Consistency Check",
          ],
          tables: ["Application Log", "Source of Supply", "Location Product"],
          tcodes: ["Run S&OP Operator (Check)", "Network Check"],
          fiori: ["Application Logs", "Schedule IBP Jobs"],
          configHe: [
            "הפעל check mode בהגדרת ה-operator לפני production run.",
            "הלוג מדווח inconsistencies: missing sources, validity gaps, circular refs.",
            "תקן את הצמתים שדווחו ואז הרץ שוב.",
          ],
          mistakesHe: [
            "דילוג על check mode ➔ שגיאות מתגלות בתוצאות במקום מראש.",
            "התעלמות מאזהרות בלוג ➔ unsourced demand.",
          ],
          troubleshootHe: [
            "לוג מדווח missing source ➔ הוסף sourcing.",
            "circular reference ➔ תקן מסלול-sourcing מעגלי.",
            "validity gap ➔ תקן תאריכי-תוקף של הקשתות.",
          ],
          bestPracticeHe: [
            "הרץ check mode כחלק קבוע מתהליך-התכנון.",
            "אל תתעלם מאזהרות-לוג.",
            "שמור רשת נקייה כדי לקצר זמני-בדיקה.",
          ],
          interviewHe: [
            { qHe: "מה מטרת ה-check mode?", aHe: "להריץ את ה-heuristic במצב-אימות המזהה inconsistencies ברשת (sources חסרים, validity gaps, circular refs) לפני production run, כדי למנוע תוצאות שגויות." },
          ],
          takeawaysHe: [
            "Network accuracy = שלמות ועקביות הרשת.",
            "Check mode מזהה פערים מראש.",
            "תקן לפי הלוג לפני תכנון אמיתי.",
          ],
        },
        {
          id: "4.3.4",
          titleHe: "תת-רשתות",
          titleEn: "Subnetworks",
          execHe:
            "Subnetwork = פלח של רשת-האספקה שניתן לתכנן בנפרד (לפי אזור, מותג, או קבוצת-מפעלים). חלוקה ל-subnetworks מאיצה הרצות, מאפשרת תכנון מבוזר, ומבודדת בעיות לתחום מצומצם.",
          beginnerHe:
            "כשהרשת ענקית, לא תמיד צריך לתכנן הכל ביחד. אפשר לחתוך אותה לחלקים — למשל 'אזור צפון' בנפרד מ'אזור דרום' — ולתכנן כל חלק לעצמו. כל חלק כזה הוא subnetwork.",
          consultantHe:
            "Subnetworks מוגדרים דרך attributes/filters על master data (region, brand, plant group) ומשמשים כ-scope להרצת ה-heuristic. הם מקצרים runtime, מאפשרים ownership מבוזר (כל מתכנן-אזור מריץ את שלו), ומבודדים תקלות. יש לוודא שצמתים-משותפים (למשל ספק המשרת מספר אזורים) מטופלים נכון כדי למנוע double counting או חיתוך-תלות.",
          purposeHe:
            "לאפשר תכנון ממוקד ומהיר של חלקי-רשת, ולחלק אחריות בין מתכננים.",
          processExampleHe:
            "מתכנן-אזור-צפון מריץ heuristic רק על subnetwork הצפון (DCs ומפעלים צפוניים); מתכנן-דרום על שלו. כל אחד מהיר ועצמאי.",
          scenarioHe:
            "בארגון כל אזור-בקבוק (צפון/מרכז/דרום) הוא subnetwork; כל מתכנן-אזורי מריץ heuristic על המפעלים וה-DCs שלו, עם ספקי-תרכיז משותפים מטופלים בזהירות.",
          navHe: [
            "SAP IBP ► Application Jobs ► S&OP Operator ► Planning Filter / Scope",
            "SAP IBP ► Master Data ► Attributes for Network Segmentation",
          ],
          tables: ["Planning Filter", "Master Data Attributes", "Subnetwork"],
          tcodes: ["Run S&OP Operator (Filter)", "Manage Planning Filters"],
          fiori: ["Schedule IBP Jobs", "Planning Filters"],
          configHe: [
            "הגדר subnetwork דרך filters/attributes (region/brand/plant group).",
            "הרץ את ה-operator עם ה-planning filter המתאים.",
            "טפל בצמתים-משותפים כדי למנוע double counting.",
          ],
          mistakesHe: [
            "חיתוך subnetwork המנתק תלות (ספק משותף) ➔ ביקוש חסר.",
            "double counting של צומת-משותף בין subnetworks.",
            "filters לא-עקביים ➔ scope חלקי.",
          ],
          troubleshootHe: [
            "ביקוש חסר אחרי פילוח ➔ צומת-תלות נחתך מה-subnetwork.",
            "כפילות-דרישה ➔ צומת משותף נספר פעמיים.",
          ],
          bestPracticeHe: [
            "הגדר subnetworks לפי גבולות-בעלות טבעיים.",
            "מפה צמתים-משותפים והחלט כיצד לטפל בהם.",
            "ודא ש-union ה-subnetworks מכסה את כל הרשת.",
          ],
          interviewHe: [
            { qHe: "מתי משתמשים ב-subnetworks?", aHe: "כשרשת-האספקה גדולה ורוצים תכנון מהיר/מבוזר — מפלחים אותה לפי אזור/מותג/קבוצת-מפעלים ומריצים את ה-heuristic על כל פלח בנפרד." },
          ],
          takeawaysHe: [
            "Subnetwork = פלח-רשת לתכנון נפרד.",
            "מאיץ הרצות ומאפשר בעלות מבוזרת.",
            "שים לב לצמתים-משותפים בין פלחים.",
          ],
        },
      ],
    },
    // ============================================================ 4.4
    {
      id: "4.4",
      titleHe: "צריכת תחזית",
      titleEn: "Forecast Consumption",
      execHe:
        "Forecast consumption (צריכת-תחזית) מבטיח שלא נספור כפול את הביקוש: כשמגיעה הזמנת-לקוח בפועל, היא 'צורכת' חלק מהתחזית במקום להתווסף לה. ה-heuristic מתכנן אספקה כנגד net demand = תחזית פתוחה + הזמנות, ולא כנגד סכום מנופח של שניהם.",
      beginnerHe:
        "צפינו שלקוח יקנה 100 יחידות, ועכשיו הוא הזמין 30 בפועל. בלי consumption היינו מתכננים 130 (תחזית + הזמנה) — אבל באמת צריך רק 100. Consumption אומר: ה-30 שכבר הוזמנו 'אוכלים' מתוך ה-100 שחזינו, ונשארות 70 תחזית פתוחה. סך-הביקוש = 30 הזמנות + 70 תחזית = 100.",
      consultantHe:
        "Forecast consumption מחושב ברמת location/customer-product לאורך ה-time buckets. ה-actual demand (sales orders / firmed demand) מנכה מ-open forecast לפי שיטת-צריכה (backward/forward/combined) ו-consumption profile (מספר buckets לאחור/קדימה). התוצאה Net Demand נכנסת ל-heuristic. ללא consumption מתקבל double counting; עם consumption מוגזם הזמנות 'בולעות' תחזית רחוקה מדי. מוגדר דרך forecast consumption profile וה-key figures המתאימים ב-planning area.",
      purposeHe:
        "למנוע ספירה-כפולה של ביקוש ולחשב net demand ריאלי שכנגדו מתכננים אספקה — לא יותר ולא פחות.",
      processExampleHe:
        "תחזית 100 לחודש; מגיעות הזמנות 60. Backward consumption מנכה 60 מהתחזית ➔ open forecast 40. Net demand = 60 הזמנות + 40 תחזית = 100. ה-heuristic מתכנן 100, לא 160.",
      scenarioHe:
        "בארגון לקראת סוף-החודש הזמנות-רשתות בפועל צורכות את התחזית שנותרה; ה-heuristic מתכנן ייצור-משקאות כנגד net demand ולא כנגד תחזית+הזמנות מנופחות — מונע עודף-ייצור.",
      navHe: [
        "SAP IBP ► Demand Planning ► Forecast Consumption ► Consumption Profile",
        "SAP IBP ► Configuration ► Key Figures ► Net Demand / Open Forecast",
      ],
      tables: ["Open Forecast", "Actual Demand", "Net Demand", "Consumption Profile"],
      tcodes: ["Manage Forecast Consumption", "Run S&OP Operator"],
      fiori: ["Forecast Consumption", "Manage Planning Area"],
      configHe: [
        "Forecast Consumption Profile: שיטה (backward/forward/combined) ומספר buckets לכל כיוון.",
        "Key figures: Open Forecast, Actual/Firmed Demand, Net Demand.",
        "החישוב רץ לפני התפשטות-הביקוש ב-heuristic.",
      ],
      flow: [
        { he: "Forecast (תחזית)", code: "Open Forecast" },
        { he: "Actual/Sales Orders", code: "Consumption", note: "הזמנות צורכות תחזית" },
        { he: "Net Demand", code: "= Orders + Open Forecast" },
        { he: "כניסה ל-heuristic", code: "Demand Propagation" },
      ],
      masterDataHe: [
        "Consumption profile (method + buckets) משויך ל-location/customer-product.",
        "Key figures: Open Forecast, Actual Demand, Net Demand.",
      ],
      mistakesHe: [
        "ללא consumption ➔ double counting (תחזית + הזמנות).",
        "חלון-consumption רחב מדי ➔ הזמנות בולעות תחזית רחוקה.",
        "כיוון-צריכה שגוי (forward במקום backward) ➔ net demand מעוות.",
      ],
      troubleshootHe: [
        "ביקוש מנופח ➔ consumption לא פעיל או profile שגוי.",
        "תחזית 'נעלמת' מוקדם מדי ➔ חלון-consumption רחב מדי.",
        "Net demand לא תואם ➔ key figure calculation שגוי.",
      ],
      bestPracticeHe: [
        "הגדר consumption profile מתאים לדפוס-ההזמנות.",
        "התחל בחלון צר והרחב לפי הצורך.",
        "ודא ש-net demand הוא הקלט ל-heuristic, לא ה-forecast הגולמי.",
      ],
      interviewHe: [
        { qHe: "מה מטרת forecast consumption?", aHe: "למנוע double counting: הזמנות-לקוח בפועל צורכות חלק מהתחזית במקום להתווסף לה, כך ש-net demand = הזמנות + תחזית-פתוחה." },
        { qHe: "מהן שיטות הצריכה?", aHe: "Backward (הזמנות צורכות תחזית מתקופות קודמות), Forward (מתקופות הבאות), ו-Combined." },
      ],
      takeawaysHe: [
        "Consumption מונע ספירה-כפולה.",
        "Net Demand = הזמנות + תחזית-פתוחה.",
        "Profile קובע שיטה ומספר buckets.",
      ],
      relatedHe: [
        { labelHe: "S&OP · חישוב net demand (4.5.4)", href: "/library/sop/chapter-04/#sub-4.5.4" },
      ],
      children: [
        {
          id: "4.4.1",
          titleHe: "שיטות צריכת-תחזית",
          titleEn: "Forecast Consumption Methods",
          execHe:
            "שלוש שיטות-צריכה קובעות כיצד הזמנות צורכות תחזית: Backward (מתקופות קודמות), Forward (מתקופות הבאות) ו-Combined (קודם אחורה ואז קדימה, או להפך). הבחירה משפיעה ישירות על net demand בכל bucket.",
          beginnerHe:
            "כשהזמנה צריכה 'לאכול' תחזית — מאיזו תקופה? Backward: מהעבר הקרוב; Forward: מהעתיד הקרוב; Combined: משילוב. הבחירה תלויה בשאלה אם הזמנות מגיעות בדרך-כלל לפני או אחרי שחזינו.",
          consultantHe:
            "Backward consumption מנכה הזמנות מ-open forecast ב-buckets קודמים עד מספר ה-backward periods; Forward עושה זאת קדימה; Combined מגדיר סדר (backward-then-forward נפוץ). הפרמטרים: number of backward/forward periods ב-consumption profile. שיטה שגויה משאירה תחזית לא-נצרכת (double counting חלקי) או צורכת תחזית רחוקה מדי.",
          purposeHe:
            "להתאים את לוגיקת-הצריכה לדפוס-ההזמנות בפועל, כדי לקבל net demand מדויק לכל תקופה.",
          processExampleHe:
            "הזמנה בשבוע 3 גדולה מהתחזית שלו; Backward עם 2 periods מנכה את העודף מתחזית שבועות 2 ו-1. Combined היה ממשיך קדימה לשבוע 4 אילו עדיין נותר עודף.",
          scenarioHe:
            "בארגון הזמנות-רשת מגיעות לרוב מעט לאחר התחזית השבועית; backward consumption מתאים — ההזמנות צורכות את תחזית-השבוע שחלף.",
          navHe: [
            "SAP IBP ► Demand ► Forecast Consumption ► Consumption Method",
            "SAP IBP ► Configuration ► Consumption Profile ► Backward/Forward Periods",
          ],
          tables: ["Consumption Profile", "Open Forecast", "Net Demand"],
          tcodes: ["Manage Forecast Consumption"],
          fiori: ["Forecast Consumption"],
          configHe: [
            "בחר method: Backward / Forward / Combined.",
            "הגדר number of backward periods ו-forward periods.",
            "Combined קובע סדר-עדיפות (לרוב backward-then-forward).",
          ],
          mistakesHe: [
            "Forward כשהזמנות מקדימות את התחזית ➔ עודף לא-נצרך.",
            "חלון קצר מדי ➔ תחזית לא-נצרכת.",
            "Combined ללא סדר-עדיפות ברור.",
          ],
          troubleshootHe: [
            "עודף-ביקוש ➔ method/periods שגוי.",
            "תחזית-פתוחה גבוהה מהצפוי ➔ חלון-צריכה צר מדי.",
          ],
          bestPracticeHe: [
            "התאם method לתזמון-ההזמנות מול התחזית.",
            "כייל את מספר ה-periods על נתוני-עבר.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין backward ל-forward consumption?", aHe: "Backward מנכה הזמנות מתחזית של תקופות קודמות; Forward מתקופות הבאות. Combined משלב את שניהם בסדר מוגדר." },
          ],
          takeawaysHe: [
            "שלוש שיטות: backward/forward/combined.",
            "Periods קובעים את חלון-הצריכה.",
            "התאם לדפוס-ההזמנות בפועל.",
          ],
        },
        {
          id: "4.4.2",
          titleHe: "פרופיל צריכת-תחזית",
          titleEn: "Forecast Consumption Profile",
          execHe:
            "Forecast consumption profile הוא אובייקט-התצורה האורז את כל פרמטרי-הצריכה — שיטה, מספר backward/forward periods, ו-key figures מעורבים — ומשייך אותם ל-location/customer-products הרלוונטיים. הוא ה'מתג' שמפעיל את לוגיקת-הצריכה.",
          beginnerHe:
            "הפרופיל הוא 'חבילת-הגדרות' לצריכה: באיזו שיטה, כמה תקופות, ועל אילו מוצרים. במקום להגדיר כל פעם מחדש, מגדירים פרופיל ומשייכים אותו.",
          consultantHe:
            "ה-profile מקשר את method+periods ל-input key figures (Open Forecast, Actual Demand) ול-output (Net Demand), ומשויך לפי attributes (product/location/customer). ה-heuristic קורא את ה-profile לפני demand propagation. profile עקבי מבטיח consumption אחיד; ריבוי profiles ללא משמעת מקשה תחזוקה.",
          purposeHe:
            "לרכז ולתקנן את הגדרת-הצריכה, ולשייך אותה למוצרים/מיקומים נכונים בלי כפילות.",
          processExampleHe:
            "Profile 'STD-BACK-2' (backward, 2 periods) משויך לכל מוצרי-המשקה; ה-heuristic מחיל אותו אוטומטית בכל הרצה.",
          scenarioHe:
            "בארגון profile אחיד backward-2 לכל SKU של משקה; מוצרים עונתיים מקבלים profile עם חלון רחב יותר.",
          navHe: [
            "SAP IBP ► Configuration ► Forecast Consumption Profile",
            "SAP IBP ► Demand ► Assign Consumption Profile to Products",
          ],
          tables: ["Consumption Profile", "Profile Assignment", "Net Demand"],
          tcodes: ["Manage Consumption Profile"],
          fiori: ["Forecast Consumption", "Manage Planning Area"],
          configHe: [
            "הגדר profile: method, backward/forward periods, input/output key figures.",
            "שייך profile ל-products/locations/customers לפי attributes.",
            "ה-heuristic קורא את ה-profile לפני התפשטות-הביקוש.",
          ],
          mistakesHe: [
            "ריבוי profiles לא-מתועדים ➔ קושי-תחזוקה.",
            "profile לא-משויך ➔ ברירת-מחדל לא-רצויה או היעדר-צריכה.",
            "key figures שגויים ב-profile ➔ net demand שגוי.",
          ],
          troubleshootHe: [
            "מוצר ללא consumption ➔ profile לא משויך אליו.",
            "net demand שגוי ➔ key figures שגויים ב-profile.",
          ],
          bestPracticeHe: [
            "תקנן מעט profiles ותעד את משמעותם.",
            "שייך לפי attributes ולא פרטנית, ככל האפשר.",
          ],
          interviewHe: [
            { qHe: "מה מכיל forecast consumption profile?", aHe: "שיטה (backward/forward/combined), מספר periods לכל כיוון, ה-key figures המעורבים (Open Forecast, Actual, Net Demand), והשיוך ל-products/locations." },
          ],
          takeawaysHe: [
            "Profile = חבילת-הגדרות הצריכה.",
            "מקשר method+periods+key figures+שיוך.",
            "תקנן ותעד למניעת בלגן.",
          ],
        },
      ],
    },
    // ============================================================ 4.5
    {
      id: "4.5",
      titleHe: "התפשטות הביקוש",
      titleEn: "Propagating Demand",
      execHe:
        "התפשטות-הביקוש (demand propagation) היא השלב הראשון של ה-heuristic: לקיחת הביקוש המוסכם ופיזורו אחורה ברשת-האספקה — מהלקוח, דרך מרכזי-ההפצה, אל המפעלים והספקים — תוך הפיכתו ל-dependent demand בכל צומת. כל שכבה 'מבקשת' מהשכבה שמספקת לה, עד שמגיעים לחומרי-הגלם.",
      beginnerHe:
        "כשלקוח רוצה משקה, ה-DC צריך לקבל אותו מהמפעל, והמפעל צריך תרכיז מהספק. התפשטות-הביקוש היא בדיוק השרשרת הזו: הביקוש 'יורד' שלב-אחר-שלב אחורה, וכל צומת מתרגם 'כמה אני צריך' ל'כמה אני מבקש ממי שלפניי'.",
      consultantHe:
        "ה-heuristic מבצע demand propagation בסדר: (1) צבירת consensus demand ל-net demand אחרי forecast consumption; (2) customer sourcing — איזה location משרת את הלקוח; (3) location sourcing — transportation מאיזה location-source; (4) production sourcing — פיצוץ ה-production source ל-components (dependent demand) תוך התחשבות ב-lot sizes. כל שלב יוצר dependent demand בצומת-המקור, שהופך ל-net demand שלו וממשיך אחורה. הכל לא-מוגבל ו-single-pass.",
      purposeHe:
        "להמיר ביקוש-לקוח לדרישות קונקרטיות בכל צומת ברשת — בסיס לחישוב ההיצע הנדרש (receipts) בשלב הבא.",
      processExampleHe:
        "ביקוש 1,000 משקה ב-DC ➔ customer sourcing מצמיד ל-DC ➔ location sourcing יוצר transport demand מהמפעל ➔ production sourcing מפצץ ל-dependent demand: תרכיז, סוכר, בקבוקים — כל אחד dependent demand בצומת שלו.",
      scenarioHe:
        "בארגון ביקוש-משקה אצל רשת-קמעונאות מתפשט: customer→DC→transport→מפעל→production→דרישות-תרכיז/סוכר/CO2/בקבוקים מהספקים. כל קישור הוא sourcing rule.",
      navHe: [
        "SAP IBP ► Supply Planning ► S&OP Heuristic ► Demand Propagation",
        "SAP IBP ► Master Data ► Sourcing (Customer/Location/Production)",
      ],
      tables: ["Consensus Demand", "Net Demand", "Dependent Demand", "Total Demand"],
      tcodes: ["Run S&OP Operator", "Sourcing"],
      fiori: ["Schedule IBP Jobs", "Sourcing Workbook"],
      configHe: [
        "Demand propagation מונע ע\"י sourcing rules (customer→location→production).",
        "Lot sizes ו-quota arrangements מעצבים את הכמויות המתפשטות.",
        "Key figures: Consensus/Net/Dependent/Total Demand.",
      ],
      flow: [
        { he: "Consensus → Net Demand", code: "Consumption" },
        { he: "Customer Sourcing", code: "Customer→Location" },
        { he: "Location Sourcing", code: "Transport Demand" },
        { he: "Production Sourcing", code: "Component Dependent Demand" },
        { he: "Total Demand בכל צומת", code: "Aggregate" },
      ],
      masterDataHe: [
        "Customer/Location/Production sourcing rules.",
        "Lot sizes ו-quota arrangements.",
        "Key figures לשרשרת-הביקוש.",
      ],
      mistakesHe: [
        "sourcing חסר בשכבה כלשהי ➔ ביקוש 'נתקע'.",
        "התעלמות מ-lot sizes ➔ כמויות לא-ריאליות.",
        "quota שגוי ➔ חלוקת-ביקוש מעוותת.",
      ],
      troubleshootHe: [
        "dependent demand חסר ➔ production source/components לא מוגדרים.",
        "ביקוש לא מגיע למפעל ➔ location/transport sourcing חסר.",
        "כמות שגויה ➔ lot size / quota.",
      ],
      bestPracticeHe: [
        "ודא שרשרת-sourcing שלמה מהלקוח עד חומרי-הגלם.",
        "בדוק dependent demand בצמתי-מפתח אחרי הרצה.",
        "השתמש ב-lot sizes ריאליים.",
      ],
      interviewHe: [
        { qHe: "מהו סדר ההתפשטות של הביקוש ב-heuristic?", aHe: "Net demand (אחרי consumption) ➔ customer sourcing ➔ location sourcing (transport) ➔ production sourcing (פיצוץ ל-component dependent demand)." },
        { qHe: "מהו dependent demand?", aHe: "הביקוש הנגזר בצומת-מקור כתוצאה מפיצוץ-הביקוש של הצומת שאחריו — למשל דרישת-תרכיז הנגזרת מביקוש-משקה." },
      ],
      takeawaysHe: [
        "Demand propagation מפזר ביקוש אחורה ברשת.",
        "סדר: customer→location→production.",
        "כל שכבה יוצרת dependent demand לשכבה שמספקת לה.",
      ],
      relatedHe: [
        { labelHe: "S&OP · התפשטות היצע (4.6)", href: "/library/sop/chapter-04/#sub-4.6" },
      ],
      children: [
        {
          id: "4.5.1",
          titleHe: "רשת-אספקה לדוגמה",
          titleEn: "Sample Supply Network",
          execHe:
            "רשת-דוגמה ממחישה את כל שלבי-ההתפשטות: לקוח ← DC ← מפעל ← ספק, עם sourcing בכל קשת. היא המודל הרץ שעליו נדגים את התפשטות-הביקוש וההיצע בשאר הסעיפים.",
          beginnerHe:
            "כדי להבין איך הכל עובד, נשתמש בדוגמה קבועה: לקוח שקונה מ-DC, DC שמקבל ממפעל, מפעל שמייצר מחומר של ספק. נחזור אליה שוב ושוב.",
          consultantHe:
            "הרשת לדוגמה: Customer C → DC (location product P@DC) ← transportation source מ-Plant → production source (P מ-components R1,R2) ← external source מ-Supplier. כל קשת נושאת validity, ratio, lead time ו-lot size. דרכה נדגים net demand, customer/location/production sourcing ו-receipts.",
          purposeHe:
            "לספק מודל-עבודה אחיד להדגמת לוגיקת-ה-heuristic לאורך הפרק.",
          processExampleHe:
            "ביקוש 500 של P אצל Customer C ➔ DC ➔ transport מ-Plant ➔ production של P ➔ dependent demand של R1,R2 מהספק. נעקוב אחרי המספרים בכל שלב.",
          scenarioHe:
            "בארגון הרשת-לדוגמה: רשת-קמעונאות → DC-מרכז → מפעל-מילוי → ספק-תרכיז; משקה אחד, רכיב-תרכיז אחד — להמחשה.",
          navHe: [
            "SAP IBP ► Master Data ► Supply Network (Sample)",
            "SAP IBP ► Analytics ► Network Visualization",
          ],
          tables: ["Location Product", "Source of Supply", "Customer"],
          tcodes: ["Manage Master Data", "Run S&OP Operator"],
          fiori: ["Supply Chain Network", "Manage Master Data"],
          configHe: [
            "הגדר customer, DC, plant, supplier ו-sources ביניהם.",
            "כל קשת: validity, ratio, lead time, lot size.",
            "השתמש ברשת זו להדגמת כל שלבי-ה-heuristic.",
          ],
          mistakesHe: [
            "רשת-דוגמה לא-שלמה ➔ הדגמה חלקית.",
            "validity לא-עקבי בין קשתות.",
          ],
          troubleshootHe: [
            "ביקוש לא מתפשט בדוגמה ➔ קשת חסרה.",
          ],
          bestPracticeHe: [
            "שמור רשת-דוגמה מינימלית אך שלמה ללימוד.",
            "תעד את הערכים בכל קשת.",
          ],
          interviewHe: [
            { qHe: "מהם רכיבי רשת-האספקה לדוגמה?", aHe: "Customer → DC → Plant → Supplier, עם customer/transportation/production/external sources המחברים את הקשתות." },
          ],
          takeawaysHe: [
            "רשת-דוגמה = מודל-עבודה אחיד.",
            "לקוח←DC←מפעל←ספק.",
            "כל קשת = source עם validity/ratio/lead/lot.",
          ],
        },
        {
          id: "4.5.2",
          titleHe: "ביקוש מוסכם",
          titleEn: "Consensus Demand",
          execHe:
            "Consensus demand הוא הביקוש המאושר היחיד (one-number) שיוצא מתהליך-ה-demand-review ונכנס לתכנון-האספקה. הוא נקודת-ההתחלה של ה-heuristic — כל ההתפשטות מתחילה ממנו.",
          beginnerHe:
            "אחרי שכל המחלקות (מכירות, שיווק, כספים) הסכימו על תחזית אחת — זה ה-consensus demand. זה המספר שעליו מתכננים אספקה. אין 'גרסאות מתחרות'; יש מספר אחד מוסכם.",
          consultantHe:
            "Consensus demand הוא key figure ב-planning area, תוצר תהליך-ה-demand-review (statistical forecast + overrides + collaboration). הוא הקלט ל-forecast consumption ול-demand propagation. ברמת-פירוט מתאימה (customer/location-product, time bucket). איכותו קובעת ישירות את איכות תוכנית-האספקה — garbage in, garbage out.",
          purposeHe:
            "לספק קלט-ביקוש יחיד, מאושר ומוסכם, שכל הארגון פועל לפיו — בסיס one-number לתכנון.",
          processExampleHe:
            "אחרי demand review מאושר consensus demand 1,000 ל-SKU/לקוח. ה-heuristic לוקח אותו, מחיל consumption, ומתפשט אחורה.",
          scenarioHe:
            "בארגון ה-consensus demand לכל משקה/רשת מאושר בישיבת-demand החודשית ומוזן ל-heuristic לתכנון-מילוי.",
          navHe: [
            "SAP IBP ► Demand Review ► Consensus Demand",
            "SAP IBP ► Planning View ► Consensus Demand Key Figure",
          ],
          tables: ["Consensus Demand", "Statistical Forecast", "Demand Plan"],
          tcodes: ["Manage Demand Plan", "Run S&OP Operator"],
          fiori: ["Demand Planning", "Planning View"],
          configHe: [
            "Consensus Demand = key figure ב-planning area, פלט demand review.",
            "ברמת customer/location-product + time bucket.",
            "קלט ל-forecast consumption ו-demand propagation.",
          ],
          mistakesHe: [
            "הזנת תחזית-סטטיסטית גולמית במקום consensus ➔ תכנון על מספר לא-מאושר.",
            "פירוט שגוי ➔ התפשטות לא-נכונה.",
          ],
          troubleshootHe: [
            "heuristic ללא פלט ➔ consensus demand ריק.",
            "ביקוש לא-צפוי ➔ בדוק את ה-demand plan המאושר.",
          ],
          bestPracticeHe: [
            "ודא consensus demand מאושר לפני הרצת-אספקה.",
            "שמור one-number — מקור-אמת יחיד.",
          ],
          interviewHe: [
            { qHe: "מהו consensus demand?", aHe: "הביקוש המאושר היחיד (one-number) היוצא מתהליך-ה-demand-review ומשמש קלט-הפתיחה לתכנון-האספקה ב-heuristic." },
          ],
          takeawaysHe: [
            "Consensus demand = ביקוש מאושר יחיד.",
            "נקודת-הפתיחה של ה-heuristic.",
            "איכותו = איכות התוכנית.",
          ],
        },
        {
          id: "4.5.3",
          titleHe: "sourcing לקוח",
          titleEn: "Customer Sourcing",
          execHe:
            "Customer sourcing קובע איזה location (DC/מפעל) משרת כל customer-product. הוא הצעד הראשון בהתפשטות: ממיר ביקוש-לקוח לביקוש על location ספציפי, שממנו נמשיך אחורה.",
          beginnerHe:
            "כשלקוח רוצה מוצר — מאיזה מחסן/DC נשלח לו? Customer sourcing הוא התשובה: הוא מצמיד כל לקוח למיקום שמספק לו, כך שהביקוש 'יודע' לאן ללכת.",
          consultantHe:
            "Customer sourcing מקשר customer-product ל-ship-from location דרך sourcing rule עם ratio/quota ו-validity. כשלקוח מקבל ממספר locations, ה-quota מחלק את הביקוש. התוצאה: ביקוש על location-product, שהופך ל-net demand של ה-DC וממשיך ל-location sourcing. ללא customer sourcing הביקוש נשאר ברמת-לקוח ולא מתפשט.",
          purposeHe:
            "להמיר ביקוש-לקוח לביקוש-מיקום — הגשר בין עולם-הביקוש לעולם-האספקה.",
          processExampleHe:
            "Customer C זקוק ל-500; customer sourcing מצמיד ל-DC-North (quota 100%) ➔ ביקוש 500 על P@DC-North. אם פוצל 70/30 בין שני DCs — 350/150.",
          scenarioHe:
            "בארגון רשת-קמעונאות ארצית מקבלת מ-DC האזורי הקרוב; customer sourcing מצמיד כל חנות/אזור-לקוח ל-DC המשרת, עם quota בין DCs בגבול-אזורים.",
          navHe: [
            "SAP IBP ► Master Data ► Sourcing ► Customer Sourcing",
            "SAP IBP ► Sourcing ► Quota Arrangement (Customer)",
          ],
          tables: ["Customer Sourcing", "Quota Arrangement", "Net Demand"],
          tcodes: ["Manage Master Data", "Sourcing"],
          fiori: ["Sourcing Workbook", "Manage Master Data"],
          configHe: [
            "Customer sourcing rule: customer-product → ship-from location + ratio + validity.",
            "Quota arrangement לחלוקה בין מספר locations.",
            "פלט: ביקוש על location-product.",
          ],
          mistakesHe: [
            "customer sourcing חסר ➔ ביקוש לא מתפשט מהלקוח.",
            "quota שלא מסתכם 100% ➔ ביקוש חלקי.",
            "validity לא-תקף ➔ הלקוח לא מקבל מקור.",
          ],
          troubleshootHe: [
            "ביקוש-לקוח לא מגיע ל-DC ➔ customer sourcing חסר/לא-תקף.",
            "חלוקה שגויה בין DCs ➔ quota.",
          ],
          bestPracticeHe: [
            "ודא לכל customer-product מקור-מיקום תקף.",
            "השתמש ב-quota מפורש בגבולות-אזורים.",
          ],
          interviewHe: [
            { qHe: "מה תפקיד customer sourcing?", aHe: "להצמיד כל customer-product ל-location המשרת אותו, וכך להמיר ביקוש-לקוח לביקוש על location-product שממשיך בהתפשטות." },
          ],
          takeawaysHe: [
            "Customer sourcing מצמיד לקוח↔מיקום.",
            "הגשר מביקוש-לקוח לביקוש-מיקום.",
            "Quota מחלק בין מספר locations.",
          ],
        },
        {
          id: "4.5.4",
          titleHe: "חישוב ביקוש-נטו",
          titleEn: "Net Demand Calculation",
          execHe:
            "Net demand calculation מגדיר את הביקוש בפועל שכנגדו מתכננים אספקה בכל צומת: ביקוש (אחרי consumption) פחות מלאי-זמין/receipts-קיימים, בתוספת safety stock. זהו המספר שה-heuristic מנסה לכסות בכל bucket.",
          beginnerHe:
            "לא כל הביקוש דורש אספקה חדשה — חלקו מכוסה במלאי שכבר יש. Net demand = מה שצריך פחות מה שכבר יש (פלוס מלאי-ביטחון). זה מה שבאמת צריך 'להשיג'.",
          consultantHe:
            "בכל time bucket: Net Demand = (Total/Net Demand אחרי consumption) − (opening inventory + existing receipts) + target safety stock. אם התוצאה חיובית — נדרש receipt; אם שלילית — עודף-מלאי. החישוב רץ bucket-by-bucket עם carryforward של ה-projected inventory. הוא קובע את גודל ה-receipts בשלב supply propagation.",
          purposeHe:
            "לחשב כמה אספקה חדשה באמת נדרשת בכל תקופה, בהתחשב במלאי-קיים וב-safety stock — לא לייצר/להזמין מה שכבר יש.",
          processExampleHe:
            "ביקוש 1,000, מלאי-פתיחה 300, safety stock 100 ➔ net demand = 1,000 − 300 + 100 = 800 receipts נדרשים. ה-projected inventory בסוף = safety stock 100.",
          scenarioHe:
            "בארגון מפעל עם מלאי-מוגמר פתיחה מנכה אותו מהביקוש; ה-heuristic מתכנן מילוי רק על ההפרש מעל ה-safety stock — מונע ייצור-עודף.",
          navHe: [
            "SAP IBP ► Supply Planning ► Net Demand Calculation",
            "SAP IBP ► Key Figures ► Projected Inventory / Safety Stock",
          ],
          tables: ["Net Demand", "Projected Inventory", "Safety Stock", "Total Receipts"],
          tcodes: ["Run S&OP Operator", "Manage Planning Area"],
          fiori: ["Planning View", "Schedule IBP Jobs"],
          configHe: [
            "Net Demand = Demand − (opening inventory + receipts) + safety stock, per bucket.",
            "Carryforward של projected inventory בין buckets.",
            "Key figures: Projected Inventory, Safety Stock, Total Receipts.",
          ],
          mistakesHe: [
            "התעלמות ממלאי-פתיחה ➔ over-planning.",
            "safety stock לא מוגדר ➔ מלאי-חזוי נמוך מדי.",
            "carryforward שגוי ➔ projected inventory מעוות.",
          ],
          troubleshootHe: [
            "receipts גבוהים מהצפוי ➔ מלאי-פתיחה/safety stock לא נלקח בחשבון.",
            "מלאי-חזוי שלילי ➔ net demand לא כוסה (חוסר).",
          ],
          bestPracticeHe: [
            "ודא מלאי-פתיחה ו-safety stock מעודכנים.",
            "בדוק projected inventory carryforward אחרי הרצה.",
          ],
          interviewHe: [
            { qHe: "כיצד מחושב net demand?", aHe: "Net Demand = ביקוש (אחרי consumption) פחות מלאי-זמין ו-receipts קיימים, בתוספת safety stock — לכל bucket, עם carryforward של projected inventory." },
          ],
          takeawaysHe: [
            "Net demand = מה שצריך פחות מה שיש + safety stock.",
            "מחושב bucket-by-bucket עם carryforward.",
            "קובע את גודל ה-receipts.",
          ],
          relatedHe: [
            { labelHe: "S&OP · carryforward מלאי שלילי (4.8.5)", href: "/library/sop/chapter-04/#sub-4.8.5" },
          ],
        },
        {
          id: "4.5.5",
          titleHe: "sourcing מיקום",
          titleEn: "Location Sourcing",
          execHe:
            "Location sourcing קובע מאיזה location-source (מפעל/DC אחר) מקבל ה-DC את המוצר בהובלה. הוא יוצר transport demand על ה-source location וממשיך את ההתפשטות מה-DC אל המפעל.",
          beginnerHe:
            "ה-DC צריך לקבל את המוצר ממישהו — בדרך-כלל ממפעל או ממחסן-מרכזי. Location sourcing אומר מאיפה, ויוצר 'בקשת-הובלה' מאותו מקום.",
          consultantHe:
            "Location sourcing משתמש ב-transportation source/lane: ל-location-product היעד מוגדר ship-from location עם lead time, ratio ו-validity. ה-heuristic יוצר transport demand על ה-source (שהופך ל-net demand שלו) ו-transport receipt על היעד (אחרי lead time offset). מספר sources ➔ quota. כך הביקוש נע מ-DC למפעל.",
          purposeHe:
            "להמשיך את הביקוש מה-DC אל המיקום-המספק דרך הובלה, תוך התחשבות ב-lead time.",
          processExampleHe:
            "net demand 800 ב-DC ➔ location sourcing (transport מ-Plant, lead 3 ימים) ➔ transport demand 800 על Plant; transport receipt ב-DC מוסט ב-lead time.",
          scenarioHe:
            "בארגון DC-מרכז מקבל בהובלה ממפעל-המילוי; location sourcing יוצר transport demand על המפעל, עם lead time של ההובלה האזורית.",
          navHe: [
            "SAP IBP ► Master Data ► Sourcing ► Transportation Source / Lane",
            "SAP IBP ► Sourcing ► Quota Arrangement (Location)",
          ],
          tables: ["Transportation Lane", "Transport Demand", "Transport Receipt"],
          tcodes: ["Manage Master Data", "Run S&OP Operator"],
          fiori: ["Sourcing Workbook", "Manage Master Data"],
          configHe: [
            "Transportation source/lane: target ← ship-from location + lead time + ratio + validity.",
            "Quota arrangement לחלוקה בין מספר source locations.",
            "פלט: transport demand על המקור, transport receipt ביעד.",
          ],
          mistakesHe: [
            "transportation lane חסר ➔ DC ללא מקור.",
            "lead time שגוי ➔ תזמון-receipt שגוי.",
            "quota שגוי בין מקורות.",
          ],
          troubleshootHe: [
            "DC ללא transport receipt ➔ location sourcing חסר/לא-תקף.",
            "receipt מוקדם/מאוחר מדי ➔ lead time.",
          ],
          bestPracticeHe: [
            "תחזק lead times ריאליים ל-lanes.",
            "השתמש ב-quota מפורש בריבוי-מקורות.",
          ],
          interviewHe: [
            { qHe: "מה יוצר location sourcing?", aHe: "Transport demand על ה-source location ו-transport receipt על היעד (מוסט ב-lead time), דרך transportation source/lane." },
          ],
          takeawaysHe: [
            "Location sourcing = הובלה בין מיקומים.",
            "יוצר transport demand במקור, receipt ביעד.",
            "lead time מסיט את ה-receipt בזמן.",
          ],
        },
        {
          id: "4.5.6",
          titleHe: "sourcing ייצור",
          titleEn: "Production Sourcing",
          execHe:
            "Production sourcing מפצץ את ה-production source של המוצר: ממיר את הביקוש על המוצר-המיוצר ל-dependent demand של ה-components (רכיבים) ול-resource consumption. זהו הצעד שמגיע עד חומרי-הגלם.",
          beginnerHe:
            "כשמפעל צריך לייצר מוצר, הוא צריך רכיבים. Production sourcing הוא 'המתכון': הוא לוקח את כמות-המוצר ומחשב כמה מכל רכיב צריך — וכך הביקוש ממשיך אל הספקים.",
          consultantHe:
            "Production source מגדיר output product, components (עם כמויות/ratios) ו-resource usage. ה-heuristic מפצץ: לכל component נוצר dependent demand (= production qty × component ratio), שהופך ל-net demand של ה-component וממשיך ל-sourcing שלו (external/transport). resource usage נרשם ל-RCCP. lot sizes מעצבים את כמות-הייצור לפני הפיצוץ.",
          purposeHe:
            "להמיר ביקוש-ייצור לדרישות-רכיבים (dependent demand) ולצריכת-משאבים — החיבור בין המוצר לחומרי-הגלם ולקיבולת.",
          processExampleHe:
            "production demand 800 משקה; production source: 1 משקה = 0.01 תרכיז + 1 בקבוק ➔ dependent demand 8 תרכיז + 800 בקבוקים; resource usage נרשם ל-RCCP.",
          scenarioHe:
            "בארגון production source של משקה: תרכיז+סוכר+CO2+בקבוק+פקק; ה-heuristic מפצץ ביקוש-מילוי ל-dependent demand של כל רכיב, ורושם שעות-קו ל-RCCP.",
          navHe: [
            "SAP IBP ► Master Data ► Sourcing ► Production Source of Supply",
            "SAP IBP ► Production Source ► Components & Resources",
          ],
          tables: ["Production Source", "Dependent Demand", "Resource Usage", "Components"],
          tcodes: ["Manage Master Data", "Run S&OP Operator"],
          fiori: ["Sourcing Workbook", "Manage Master Data"],
          configHe: [
            "Production source: output product + components (ratios) + resource usage.",
            "פיצוץ: dependent demand לכל component + resource consumption.",
            "Lot sizes מעצבים production qty לפני הפיצוץ.",
          ],
          mistakesHe: [
            "components חסרים ב-source ➔ dependent demand לא נוצר.",
            "ratios שגויים ➔ דרישות-רכיב שגויות.",
            "resource usage חסר ➔ RCCP ריק.",
          ],
          troubleshootHe: [
            "אין dependent demand ➔ production source/components חסרים.",
            "דרישת-רכיב שגויה ➔ component ratio.",
            "RCCP ללא עומס ➔ resource usage לא מוגדר.",
          ],
          bestPracticeHe: [
            "ודא production source שלם (components + resources).",
            "תחזק ratios מדויקים.",
            "כלול resource usage לכל פעולה הצורכת קיבולת.",
          ],
          interviewHe: [
            { qHe: "מה יוצר production sourcing?", aHe: "Dependent demand לכל component (= production qty × ratio) ו-resource consumption ל-RCCP, ע\"י פיצוץ ה-production source." },
          ],
          takeawaysHe: [
            "Production sourcing = פיצוץ ה'מתכון'.",
            "יוצר dependent demand לרכיבים + resource usage.",
            "החיבור עד חומרי-הגלם והקיבולת.",
          ],
          relatedHe: [
            { labelHe: "S&OP · רכיב-ייצור (4.6.2)", href: "/library/sop/chapter-04/#sub-4.6.2" },
            { labelHe: "S&OP · RCCP (4.7)", href: "/library/sop/chapter-04/#sub-4.7" },
          ],
        },
        {
          id: "4.5.7",
          titleHe: "גדלי אצווה",
          titleEn: "Lot Sizes",
          execHe:
            "Lot sizes (גדלי-אצווה) מעצבים את כמות-ההיצע בכל צומת: lot-for-lot (בדיוק כפי שנדרש), minimum/maximum lot, rounding value, או periods of supply. הם הופכים net demand 'גולמי' לכמויות-receipt ריאליות.",
          beginnerHe:
            "לא תמיד מייצרים/מזמינים בדיוק כמה שצריך — לפעמים יש מינימום-הזמנה, או מייצרים בכפולות. Lot size הוא הכלל שמעגל את הכמות: למשל 'מינימום 1,000' או 'בכפולות של 100'.",
          consultantHe:
            "ה-heuristic מחיל lot-sizing על ה-net demand: Lot-for-Lot (LFL), Fixed lot, Minimum/Maximum lot, Rounding value, ו-Periods of supply (צבירת ביקוש לכמה buckets). הכמות-המעוגלת היא ה-receipt, וההפרש מצטבר ל-projected inventory. lot sizes משפיעים על dependent demand במורד-הזרם ועל עומס-RCCP. מוגדרים ב-source/location-product.",
          purposeHe:
            "להפוך דרישה-נטו תאורטית לכמויות-אספקה מעשיות התואמות מגבלות-ייצור/רכש (מינימום, כפולות, אצווה-כלכלית).",
          processExampleHe:
            "net demand 850; minimum lot 1,000, rounding 100 ➔ receipt 1,000; 150 העודף ל-projected inventory. periods-of-supply=2 היה צובר ביקוש של חודשיים ל-receipt אחד.",
          scenarioHe:
            "בארגון קו-מילוי עובד באצוות-מינימום (batch run); lot size minimum מבטיח שלא יתוכננו ריצות זעירות לא-כלכליות; rounding לכפולות-מארז.",
          navHe: [
            "SAP IBP ► Master Data ► Location Product ► Lot Size Settings",
            "SAP IBP ► Sourcing ► Lot Size (Min/Max/Rounding/POS)",
          ],
          tables: ["Lot Size", "Net Demand", "Total Receipts", "Projected Inventory"],
          tcodes: ["Manage Master Data", "Run S&OP Operator"],
          fiori: ["Manage Master Data", "Planning View"],
          configHe: [
            "Lot-sizing procedures: LFL, Fixed, Min/Max lot, Rounding value, Periods of supply.",
            "מוגדר ברמת source/location-product.",
            "הכמות-המעוגלת = receipt; ההפרש ל-projected inventory.",
          ],
          mistakesHe: [
            "minimum lot גבוה מדי ➔ עודף-מלאי כרוני.",
            "rounding לא מתואם למארז ➔ כמויות לא-מעשיות.",
            "periods-of-supply ארוך מדי ➔ batching מוגזם.",
          ],
          troubleshootHe: [
            "receipt גדול מהדרישה ➔ minimum/rounding lot.",
            "עודף-מלאי מתמשך ➔ lot size לא-מתאים.",
            "ריבוי receipts קטנים ➔ אין minimum lot.",
          ],
          bestPracticeHe: [
            "התאם lot size למגבלות-ייצור/רכש בפועל.",
            "אזן בין batching לעודף-מלאי.",
            "תאם rounding ליחידות-מארז.",
          ],
          interviewHe: [
            { qHe: "מהן שיטות lot-sizing עיקריות ב-heuristic?", aHe: "Lot-for-Lot, Fixed lot, Minimum/Maximum lot, Rounding value, ו-Periods of supply (צבירת ביקוש לכמה buckets)." },
            { qHe: "כיצד lot size משפיע על projected inventory?", aHe: "כשהכמות-המעוגלת גדולה מה-net demand, ההפרש מצטבר כ-projected inventory לתקופות הבאות." },
          ],
          takeawaysHe: [
            "Lot size הופך net demand לכמויות-receipt מעשיות.",
            "LFL/Fixed/Min/Max/Rounding/POS.",
            "עודף מעבר לדרישה ➔ projected inventory.",
          ],
        },
      ],
    },
    // ============================================================ 4.6
    {
      id: "4.6",
      titleHe: "התפשטות ההיצע",
      titleEn: "Propagating Supply",
      execHe:
        "התפשטות-ההיצע (supply propagation) היא השלב השני של ה-heuristic: לאחר שהביקוש פוזר אחורה, המנוע מחשב את ה-receipts (קבלות) בכל צומת — external, production ו-transport — את ה-component requirements, ואת ה-projected inventory. כך 'נסגר' המעגל מהביקוש להיצע בפועל.",
      beginnerHe:
        "אחרי שידענו 'מי צריך מה' (ביקוש), עכשיו נחשב 'מה מגיע מאיפה' (היצע): כמה ייוצר, כמה יועבר, כמה יירכש, וכמה מלאי יישאר. זה הצד השני של אותו מטבע.",
      consultantHe:
        "Supply propagation מחשב לכל location-product את ה-Total Receipts (sum of external/production/transport receipts) הנדרש לכסות net demand, אחרי lot-sizing ו-validity. ה-production receipts מפצצים ל-component dependent demand; transport receipts מסיטים demand ל-source location ב-lead time; external receipts פותרים מול ספק. ה-projected inventory מתעדכן bucket-by-bucket. ה-heuristic לא-מוגבל — receipts אינם מוגבלים בקיבולת; constrained demand (4.6.5) מסמן מה היה אפשרי. min/adjusted key figures (4.6.6) מאפשרים override.",
      purposeHe:
        "להמיר את הדרישה לכל צומת לקבלות-אספקה קונקרטיות ולמלאי-חזוי — התוצר המוחשי של ה-heuristic.",
      processExampleHe:
        "net demand 800 ב-DC ➔ transport receipt 800 (מ-Plant, lead-shifted); ב-Plant production receipt 800 ➔ component dependent demand ➔ external receipt מהספק. projected inventory מתעדכן בכל צומת.",
      scenarioHe:
        "בארגון: production receipts במפעל-המילוי, transport receipts ב-DCs, external receipts לתרכיז מהספק; projected inventory של משקאות וחומרי-גלם מחושב לכל שבוע.",
      navHe: [
        "SAP IBP ► Supply Planning ► S&OP Heuristic ► Supply Propagation",
        "SAP IBP ► Key Figures ► Total Receipts / Projected Inventory",
      ],
      tables: ["Total Receipts", "Production Receipt", "Transport Receipt", "External Receipt", "Projected Inventory"],
      tcodes: ["Run S&OP Operator", "Manage Planning Area"],
      fiori: ["Planning View", "Schedule IBP Jobs"],
      configHe: [
        "Receipts מחושבים מ-net demand אחרי lot-sizing.",
        "Production receipts ➔ component dependent demand; transport receipts ➔ lead-shifted.",
        "Projected inventory מתעדכן bucket-by-bucket.",
      ],
      flow: [
        { he: "Net Demand", code: "per node" },
        { he: "External/Production/Transport Receipts", code: "Total Receipts" },
        { he: "Production → Components", code: "Dependent Demand" },
        { he: "Transport → Source", code: "Lead Shift" },
        { he: "Projected Inventory", code: "Balance" },
      ],
      masterDataHe: [
        "Sources (external/production/transport) + lead times + lot sizes.",
        "Key figures: Total/External/Production/Transport Receipts, Projected Inventory.",
      ],
      mistakesHe: [
        "ערבוב unconstrained receipts עם constrained demand — הם key figures שונים.",
        "התעלמות מ-lead-shift של transport receipts.",
        "min/adjusted key figures לא מוגדרים כשנדרש override.",
      ],
      troubleshootHe: [
        "אין receipts ➔ net demand אפס או source חסר.",
        "receipts בעיתוי שגוי ➔ lead time.",
        "projected inventory שגוי ➔ carryforward/safety stock.",
      ],
      bestPracticeHe: [
        "בדוק Total Receipts מול net demand בצמתי-מפתח.",
        "ודא lead-shift נכון ל-transport.",
        "השתמש ב-min/adjusted key figures ל-override מבוקר.",
      ],
      interviewHe: [
        { qHe: "מהם שלושת סוגי ה-receipts?", aHe: "External receipt (רכש מספק), Production receipt (ייצור עצמי, מפצץ ל-components), ו-Transport receipt (הובלה ממקור, מוסט ב-lead time). סכומם = Total Receipts." },
      ],
      takeawaysHe: [
        "Supply propagation מחשב receipts ו-projected inventory.",
        "Production מפצץ ל-components; transport מסיט ב-lead time.",
        "ה-receipts לא-מוגבלים בקיבולת.",
      ],
      relatedHe: [
        { labelHe: "S&OP · RCCP (4.7)", href: "/library/sop/chapter-04/#sub-4.7" },
      ],
      children: [
        {
          id: "4.6.1",
          titleHe: "קבלות חיצוניות",
          titleEn: "External Receipts",
          execHe:
            "External receipts הם אספקה הנכנסת מרכש חיצוני (ספק) ולא מייצור פנימי. ה-heuristic יוצר אותם כשה-sourcing הוא external source, ומסיט אותם ב-procurement lead time.",
          beginnerHe:
            "כשקונים מספק במקום לייצר בעצמנו — האספקה שמגיעה היא external receipt. זה כיסוי-הביקוש דרך רכש.",
          consultantHe:
            "External receipt נוצר מ-external receipt source: כמות = net demand אחרי lot-sizing, מוסטת אחורה ב-lead time כדי שתגיע בזמן. אין לו component explosion (בניגוד ל-production). הוא מהווה total receipt עבור location-products הנרכשים (חומרי-גלם, מוצרים קנויים). validity של ה-source קובע מתי הוא פעיל.",
          purposeHe:
            "לכסות ביקוש על פריטים-נרכשים דרך אספקת-ספק, ולחבר את הרשת לחומרי-הגלם החיצוניים.",
          processExampleHe:
            "dependent demand 8 תרכיז בשבוע 5; external source עם lead 2 שבועות ➔ external receipt 8 בשבוע 5, עם הזמנה שיוצאת בשבוע 3.",
          scenarioHe:
            "בארגון תרכיז, סוכר ו-CO2 נכנסים כ-external receipts מספקים; ה-heuristic מתזמן אותם לפי ה-procurement lead time של כל ספק.",
          navHe: [
            "SAP IBP ► Master Data ► Sourcing ► External Receipt Source",
            "SAP IBP ► Key Figures ► External Receipt",
          ],
          tables: ["External Source", "External Receipt", "Total Receipts"],
          tcodes: ["Manage Master Data", "Run S&OP Operator"],
          fiori: ["Sourcing Workbook", "Planning View"],
          configHe: [
            "External receipt source: ספק + lead time + validity.",
            "אין component explosion.",
            "מוסט אחורה ב-lead time.",
          ],
          mistakesHe: [
            "external source חסר ➔ פריט-נרכש ללא receipt.",
            "lead time שגוי ➔ עיתוי-רכש שגוי.",
          ],
          troubleshootHe: [
            "חומר-גלם ללא receipt ➔ external source חסר/לא-תקף.",
            "עיתוי שגוי ➔ lead time.",
          ],
          bestPracticeHe: [
            "תחזק procurement lead times מדויקים.",
            "ודא external source לכל פריט-נרכש.",
          ],
          interviewHe: [
            { qHe: "מה מבדיל external receipt מ-production receipt?", aHe: "External מגיע מרכש (ספק) ואין לו component explosion; production מיוצר פנימית ומפצץ ל-component dependent demand." },
          ],
          takeawaysHe: [
            "External receipt = אספקה מרכש.",
            "מוסט ב-procurement lead time.",
            "ללא component explosion.",
          ],
        },
        {
          id: "4.6.2",
          titleHe: "רכיב-ייצור",
          titleEn: "Production Component",
          execHe:
            "Production component הוא רכיב ה-BOM/production-source הנצרך בייצור. ה-heuristic ממיר את כמות-הייצור ל-dependent demand של כל רכיב, וכך הביקוש ממשיך לזרום אל הספקים ואל חומרי-הגלם.",
          beginnerHe:
            "כל מוצר-מיוצר בנוי מרכיבים. Production component הוא אחד הרכיבים האלה. כשמייצרים X יחידות מוצר, צריך כמות מתאימה מכל רכיב — וזה מה ש-heuristic מחשב.",
          consultantHe:
            "ב-production source כל component נושא ratio (component qty per output). dependent demand = production receipt qty × ratio, ב-bucket התואם (לעיתים עם lead/offset). ה-dependent demand הופך ל-net demand של ה-component, הממשיך ל-external/transport sourcing שלו. רכיבי-פאנטום מעבירים דרישה ישירות הלאה. דיוק ה-ratios קריטי לדרישות-רכש.",
          purposeHe:
            "לחבר את כמות-הייצור לדרישות-הרכיבים — הגשר בין המוצר לחומרי-הגלם.",
          processExampleHe:
            "production receipt 800 משקה; component 'בקבוק' ratio 1 ➔ dependent demand 800 בקבוקים; component 'תרכיז' ratio 0.01 ➔ 8 תרכיז.",
          scenarioHe:
            "בארגון רכיבי-הייצור של משקה: תרכיז (ratio קטן), סוכר, CO2, בקבוק, פקק, תווית; כל אחד מקבל dependent demand יחסי לכמות-המילוי.",
          navHe: [
            "SAP IBP ► Master Data ► Production Source ► Components",
            "SAP IBP ► Key Figures ► Dependent Demand",
          ],
          tables: ["Production Source", "Components", "Dependent Demand"],
          tcodes: ["Manage Master Data", "Run S&OP Operator"],
          fiori: ["Sourcing Workbook", "Planning View"],
          configHe: [
            "כל component נושא ratio (qty per output).",
            "Dependent demand = production qty × ratio.",
            "ממשיך ל-sourcing של ה-component.",
          ],
          mistakesHe: [
            "ratio שגוי ➔ דרישת-רכיב שגויה.",
            "component חסר ➔ חוסר-רכיב לא-מתוכנן.",
            "התעלמות מ-offset/lead של רכיב.",
          ],
          troubleshootHe: [
            "רכיב ללא dependent demand ➔ לא מוגדר ב-source.",
            "כמות-רכיב שגויה ➔ ratio.",
          ],
          bestPracticeHe: [
            "תחזק ratios מדויקים ועקביים עם ה-BOM.",
            "כלול את כל הרכיבים הקריטיים.",
          ],
          interviewHe: [
            { qHe: "כיצד מחושב dependent demand של רכיב?", aHe: "Dependent demand = production receipt qty × component ratio, ב-bucket התואם; הוא הופך ל-net demand של הרכיב וממשיך ב-sourcing שלו." },
          ],
          takeawaysHe: [
            "Production component = רכיב נצרך בייצור.",
            "Dependent demand = qty × ratio.",
            "מחבר מוצר↔חומרי-גלם.",
          ],
          relatedHe: [
            { labelHe: "S&OP · sourcing ייצור (4.5.6)", href: "/library/sop/chapter-04/#sub-4.5.6" },
          ],
        },
        {
          id: "4.6.3",
          titleHe: "קבלות ייצור",
          titleEn: "Production Receipts",
          execHe:
            "Production receipts הם הכמות שה-heuristic מתכנן לייצר במפעל כדי לכסות net demand. הם מפצצים ל-component dependent demand וצורכים resources (ל-RCCP). זהו ה-receipt המייצג ייצור-פנימי.",
          beginnerHe:
            "כמה לייצר במפעל — זה ה-production receipt. הוא גם 'מושך' אחריו את כל הרכיבים הדרושים לייצור.",
          consultantHe:
            "Production receipt = net demand של המוצר-המיוצר אחרי lot-sizing, ב-bucket התואם (עם production lead time/offset). הוא מפעיל component explosion (dependent demand) ו-resource consumption (RCCP). לא-מוגבל: ה-heuristic מתכנן כמה שצריך בלי לבדוק קיבולת. ה-validity של ה-production source קובע פעילות.",
          purposeHe:
            "לתכנן את כמות-הייצור הנדרשת, ולהניע ממנה את דרישות-הרכיבים ועומס-המשאבים.",
          processExampleHe:
            "net demand 800 משקה במפעל ➔ production receipt 800 (lead 1 שבוע) ➔ component dependent demand + resource hours ל-RCCP.",
          scenarioHe:
            "בארגון production receipt = תוכנית-המילוי לכל קו; ממנו נגזרות דרישות-תרכיז/אריזה ושעות-קו ל-RCCP.",
          navHe: [
            "SAP IBP ► Supply Planning ► Production Receipt",
            "SAP IBP ► Key Figures ► Production Receipt / Resource Usage",
          ],
          tables: ["Production Receipt", "Dependent Demand", "Resource Usage"],
          tcodes: ["Run S&OP Operator", "Manage Planning Area"],
          fiori: ["Planning View", "Schedule IBP Jobs"],
          configHe: [
            "Production receipt = net demand אחרי lot-sizing + lead offset.",
            "מפעיל component explosion + resource consumption.",
            "לא-מוגבל בקיבולת.",
          ],
          mistakesHe: [
            "ציפייה ש-production receipt מוגבל-קיבולת ➔ אינו; RCCP מודד עומס.",
            "lead time שגוי ➔ עיתוי-ייצור שגוי.",
          ],
          troubleshootHe: [
            "אין production receipt ➔ net demand אפס או production source חסר.",
            "עיתוי שגוי ➔ production lead time.",
          ],
          bestPracticeHe: [
            "בדוק production receipts מול קיבולת ב-RCCP.",
            "תחזק production lead times.",
          ],
          interviewHe: [
            { qHe: "מה מפעיל production receipt?", aHe: "Component explosion (dependent demand לרכיבים) ו-resource consumption (עומס ל-RCCP); הוא מייצג את כמות-הייצור המתוכננת, לא-מוגבלת בקיבולת." },
          ],
          takeawaysHe: [
            "Production receipt = כמות-ייצור מתוכננת.",
            "מפצץ ל-components + צורך resources.",
            "לא-מוגבל; RCCP מודד את העומס.",
          ],
        },
        {
          id: "4.6.4",
          titleHe: "קבלות הובלה",
          titleEn: "Transport Receipts",
          execHe:
            "Transport receipts הם אספקה הנכנסת ליעד דרך הובלה ממקור-מיקום אחר. ה-heuristic יוצר transport receipt ביעד ו-transport demand במקור, עם הסטת lead time.",
          beginnerHe:
            "כשמוצר מגיע ל-DC בהובלה ממפעל — זה transport receipt. במקביל נוצרת 'בקשה' מהמפעל (transport demand). זה החיבור בין שני מיקומים.",
          consultantHe:
            "Transport receipt = net demand של היעד אחרי lot-sizing, ב-bucket שבו צריך אותו; ה-transport demand במקור מוסט אחורה ב-transportation lead time (כדי שתספיק להגיע). ratio/quota מחלקים בין מקורות. ה-transport demand הופך ל-net demand של ה-source location, הממשיך ל-production/external sourcing שלו.",
          purposeHe:
            "להזרים מלאי בין מיקומים ברשת — לכסות ביקוש ב-DC ממקור-ייצור/מחסן, תוך עמידה בזמני-הובלה.",
          processExampleHe:
            "net demand 800 ב-DC בשבוע 5; lane מ-Plant עם lead 1 שבוע ➔ transport receipt 800 ב-DC שבוע 5; transport demand 800 ב-Plant שבוע 4.",
          scenarioHe:
            "בארגון משקאות עוברים ממפעל-מילוי ל-DCs אזוריים כ-transport receipts; ה-transport demand במפעל מצטרף ל-production demand שלו.",
          navHe: [
            "SAP IBP ► Master Data ► Sourcing ► Transportation Lane",
            "SAP IBP ► Key Figures ► Transport Receipt / Transport Demand",
          ],
          tables: ["Transportation Lane", "Transport Receipt", "Transport Demand"],
          tcodes: ["Manage Master Data", "Run S&OP Operator"],
          fiori: ["Sourcing Workbook", "Planning View"],
          configHe: [
            "Transport receipt ביעד; transport demand במקור (lead-shifted).",
            "ratio/quota לחלוקה בין מקורות.",
            "transport demand הופך ל-net demand של המקור.",
          ],
          mistakesHe: [
            "lead time שגוי ➔ receipt מאחר/מקדים.",
            "lane חסר ➔ יעד ללא receipt.",
            "quota שגוי בין מקורות.",
          ],
          troubleshootHe: [
            "יעד ללא transport receipt ➔ lane חסר/לא-תקף.",
            "עיתוי שגוי ➔ transportation lead time.",
          ],
          bestPracticeHe: [
            "תחזק transportation lead times ריאליים.",
            "ודא lanes לכל זוג מקור↔יעד נדרש.",
          ],
          interviewHe: [
            { qHe: "מה הקשר בין transport receipt ל-transport demand?", aHe: "Transport receipt נוצר ביעד; transport demand נוצר במקור ומוסט אחורה ב-transportation lead time, והופך ל-net demand של ה-source location." },
          ],
          takeawaysHe: [
            "Transport receipt = אספקה בהובלה ליעד.",
            "transport demand במקור, lead-shifted.",
            "מזרים מלאי בין מיקומים.",
          ],
          relatedHe: [
            { labelHe: "S&OP · sourcing מיקום (4.5.5)", href: "/library/sop/chapter-04/#sub-4.5.5" },
          ],
        },
        {
          id: "4.6.5",
          titleHe: "ביקוש-מוגבל",
          titleEn: "Constrained Demand",
          execHe:
            "Constrained demand הוא key figure המסמן כמה מהביקוש היה אפשרי לספק בהינתן מגבלות — לעומת ה-receipts הלא-מוגבלים של ה-heuristic. הוא מאפשר להשוות 'מה רצינו' מול 'מה ניתן', גם כשמריצים heuristic לא-מוגבל.",
          beginnerHe:
            "ה-heuristic מתעלם ממגבלות, אבל לפעמים רוצים לראות גם 'מה באמת אפשרי'. Constrained demand הוא המספר הזה — כמה מהביקוש ניתן לספק תחת מגבלות — לצורך השוואה.",
          consultantHe:
            "Constrained demand מתקבל בדרך-כלל מ-optimizer או מחישוב-מגבלה ייעודי, ומאוחסן כ-key figure נפרד מ-Total Receipts הלא-מוגבל. ב-heuristic לא-מוגבל הוא משמש כ-reference להשוואה (gap = unconstrained − constrained). הוא קריטי לדיון-ה-S&OP: היכן הקיבולת חוסמת את הביקוש. אין לבלבל בינו לבין ה-receipts של ה-heuristic.",
          purposeHe:
            "להציג את הפער בין הביקוש הלא-מוגבל למה שאפשרי תחת מגבלות — בסיס להחלטות-קיבולת ולתעדוף.",
          processExampleHe:
            "unconstrained production receipt 800; constrained demand (מ-optimizer/RCCP) 650 ➔ gap 150 שהקיבולת לא מאפשרת — נושא לדיון ניהולי.",
          scenarioHe:
            "בארגון כשקו-מילוי מגיע למלוא-הקיבולת, constrained demand מראה כמה משקה ניתן באמת למלא; הפער מול הביקוש הלא-מוגבל מוצג להנהלה.",
          navHe: [
            "SAP IBP ► Supply Planning ► Constrained Demand (Key Figure)",
            "SAP IBP ► Analytics ► Unconstrained vs Constrained",
          ],
          tables: ["Constrained Demand", "Total Receipts", "Capacity Usage"],
          tcodes: ["Run Optimizer", "Run S&OP Operator", "Manage Planning Area"],
          fiori: ["Planning View", "Analytics"],
          configHe: [
            "Constrained demand = key figure נפרד מ-Total Receipts.",
            "ממוחשב ע\"י optimizer/constraint logic.",
            "משמש reference להשוואה ול-gap analysis.",
          ],
          mistakesHe: [
            "בלבול בין constrained demand ל-unconstrained receipts.",
            "הסקת היתכנות מ-heuristic לא-מוגבל בלבד.",
          ],
          troubleshootHe: [
            "constrained demand ריק ➔ optimizer/constraint logic לא רץ.",
            "gap לא-הגיוני ➔ key figures שונים מושווים.",
          ],
          bestPracticeHe: [
            "הצג unconstrained מול constrained זה-לצד-זה ל-S&OP.",
            "השתמש ב-gap לתעדוף-קיבולת.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין constrained demand ל-receipts של ה-heuristic?", aHe: "Receipts של ה-heuristic לא-מוגבלים (מתעלמים מקיבולת); constrained demand מסמן כמה ניתן לספק תחת מגבלות — הפער ביניהם הוא נושא-הדיון ב-S&OP." },
          ],
          takeawaysHe: [
            "Constrained demand = מה שאפשרי תחת מגבלות.",
            "key figure נפרד מה-receipts הלא-מוגבלים.",
            "הפער = בסיס לדיון-קיבולת.",
          ],
          relatedHe: [
            { labelHe: "S&OP · קבלות מאוזנות (4.8.6)", href: "/library/sop/chapter-04/#sub-4.8.6" },
          ],
        },
        {
          id: "4.6.6",
          titleHe: "מפתחות מינימום ומותאמים",
          titleEn: "Minimum and Adjusted Key Figures",
          execHe:
            "Minimum ו-adjusted key figures מאפשרים למתכנן לכפות ערכי-מינימום (למשl minimum receipt/inventory) או לבצע override ידני שה-heuristic מכבד. הם מספקים שליטה-ידנית מבוקרת מעל הלוגיקה האוטומטית.",
          beginnerHe:
            "לפעמים המתכנן יודע משהו שהמערכת לא — למשל 'תמיד תייצר לפחות X' או 'הנה כמות שאני כופה'. Minimum/adjusted key figures הם השדות שבהם רושמים את ההתערבות הזו, וה-heuristic מכבד אותם.",
          consultantHe:
            "Minimum key figures (Min Receipt, Min Inventory) מגדירים רצפה שה-heuristic לא יורד מתחתיה; Adjusted key figures מאפשרים override ישיר של receipt/production שה-heuristic מקבל כקלט-קבוע (firmed). הם משולבים בלוגיקת-ה-net-demand: ה-receipt בפועל = max(calculated, minimum) או = adjusted אם הוזן. שימושי ל-firming, mins חוזיים, ו-manual planning.",
          purposeHe:
            "לאפשר התערבות-מתכנן מבוקרת — כפיית מינימומים או override — בלי לעקוף את כל ה-heuristic.",
          processExampleHe:
            "minimum receipt 1,000 לחודש; גם אם net demand 600, ה-heuristic מתכנן 1,000. adjusted production 500 בשבוע מסוים ➔ ה-heuristic מקבע 500 ומחשב סביבו.",
          scenarioHe:
            "בארגון minimum production מבטיח ריצת-קו מינימלית כלכלית; adjusted receipt משמש לקיבוע כמות-מילוי שהוסכמה ידנית בישיבת-supply.",
          navHe: [
            "SAP IBP ► Key Figures ► Min Receipt / Adjusted Receipt",
            "SAP IBP ► Planning View ► Manual Override",
          ],
          tables: ["Min Receipt", "Adjusted Receipt", "Min Inventory", "Total Receipts"],
          tcodes: ["Manage Planning Area", "Run S&OP Operator"],
          fiori: ["Planning View", "Manage Planning Area"],
          configHe: [
            "Minimum key figures (Min Receipt/Inventory) = רצפה ל-heuristic.",
            "Adjusted key figures = override/firmed הנכבד ע\"י ה-heuristic.",
            "Receipt בפועל = max(calculated, min) או = adjusted.",
          ],
          mistakesHe: [
            "minimum גבוה מדי ➔ עודף-מלאי כפוי.",
            "adjusted נשכח-בתוקף ➔ override מיושן ממשיך לקבע.",
            "override ללא תיעוד ➔ תוצאות לא-מוסברות.",
          ],
          troubleshootHe: [
            "receipt גבוה מהדרישה ➔ minimum key figure פעיל.",
            "כמות 'תקועה' ➔ adjusted/firmed key figure.",
          ],
          bestPracticeHe: [
            "השתמש ב-override במשורה ותעד אותו.",
            "נקה adjusted key figures מיושנים.",
            "העדף minimums חוזיים על override ידני חוזר.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין minimum ל-adjusted key figure?", aHe: "Minimum מגדיר רצפה שה-heuristic לא יורד מתחתיה (receipt = max(calc, min)); adjusted הוא override/firmed שה-heuristic מקבל כערך-קבוע ומחשב סביבו." },
          ],
          takeawaysHe: [
            "Min/adjusted = שליטה-ידנית מבוקרת.",
            "Minimum = רצפה; adjusted = override קבוע.",
            "תעד ונקה override-ים מיושנים.",
          ],
        },
      ],
    },
    // ============================================================ 4.7
    {
      id: "4.7",
      titleHe: "תכנון קיבולת גס (RCCP)",
      titleEn: "Rough-Cut Capacity Planning",
      execHe:
        "Rough-Cut Capacity Planning (RCCP) משווה את העומס שה-heuristic הלא-מוגבל מייצר על המשאבים לקיבולת-הזמינה שלהם — ומסמן עומס-יתר (overload). ה-RCCP אינו מגביל את התוכנית; הוא מודד עומס וחושף צווארי-בקבוק לדיון-ה-S&OP.",
      beginnerHe:
        "ה-heuristic הניח אינסוף קיבולת. RCCP בא ואומר: 'רגע, בואו נבדוק כמה זה באמת עומס על הקווים והמחסנים מול מה שיש'. הוא לא מתקן את התוכנית — רק מראה איפה היא לא-ריאלית.",
      consultantHe:
        "RCCP מחשב resource load (capacity usage) מתוך production/handling/storage receipts × rate-per-unit, ומשווה ל-available capacity של ה-resources. התוצאה: capacity utilization ו-overload key figures לכל resource/bucket. ב-IBP זהו שלב-מדידה אחרי ה-heuristic; אין capacity leveling אוטומטי (זה תפקיד optimizer/constrained). RCCP מכסה production resources, handling resources ו-storage resources. הוא הבסיס להחלטות: overtime, sourcing-shift, או חיתוך-ביקוש.",
      purposeHe:
        "לחשוף היכן התוכנית הלא-מוגבלת חורגת מהקיבולת — כדי שההנהלה תחליט כיצד לגשר (תוספת-קיבולת או תעדוף-ביקוש).",
      processExampleHe:
        "production receipts של חודש מתורגמים ל-1,200 שעות-קו; הקו זמין 1,000 שעות ➔ overload 200 (120% utilization) — דגל-אדום לדיון-S&OP.",
      scenarioHe:
        "בארגון RCCP מתרגם תוכנית-מילוי לשעות-קו ולנפח-אחסון; כשקו-מילוי מגיע ל-115% utilization בעונת-שיא, הפער מוצג להנהלה להחלטה (משמרת-נוספת/העברה למפעל אחר).",
      navHe: [
        "SAP IBP ► Supply Planning ► Rough-Cut Capacity Planning",
        "SAP IBP ► Analytics ► Capacity Utilization / Overload",
      ],
      tables: ["Resource", "Capacity Usage", "Available Capacity", "Capacity Utilization"],
      tcodes: ["Run S&OP Operator", "Manage Master Data (Resource)"],
      fiori: ["Capacity Analytics", "Planning View"],
      configHe: [
        "Resources (production/handling/storage) + available capacity + rate-per-unit.",
        "Capacity usage = receipts × rate; utilization = usage / available.",
        "RCCP מודד עומס — אינו מבצע leveling אוטומטי.",
      ],
      flow: [
        { he: "Production/Handling/Storage Receipts", code: "from heuristic" },
        { he: "× rate-per-unit", code: "Capacity Usage" },
        { he: "÷ available capacity", code: "Utilization" },
        { he: "Overload flag", code: "Gap to S&OP" },
      ],
      masterDataHe: [
        "Resource master data (type, available capacity, calendar).",
        "Rate/usage per unit ב-production source.",
        "Key figures: Capacity Usage, Available Capacity, Utilization, Overload.",
      ],
      mistakesHe: [
        "ציפייה ש-RCCP מגביל את התוכנית — הוא רק מודד.",
        "available capacity לא מעודכן ➔ utilization מטעה.",
        "rate-per-unit חסר ➔ אין עומס מחושב.",
      ],
      troubleshootHe: [
        "utilization אפס ➔ rate/resource usage לא מוגדר.",
        "overload לא-הגיוני ➔ available capacity שגוי.",
        "resource לא מופיע ➔ לא משויך ל-production source.",
      ],
      bestPracticeHe: [
        "תחזק available capacity ו-rates מעודכנים.",
        "הצג RCCP לצד התוכנית הלא-מוגבלת ב-S&OP.",
        "השתמש ב-overload לתעדוף ולהחלטות-קיבולת.",
      ],
      interviewHe: [
        { qHe: "האם RCCP מגביל את התוכנית?", aHe: "לא. RCCP מודד עומס מול קיבולת ומסמן overload, אך אינו מבצע leveling — התוכנית נשארת לא-מוגבלת; ההחלטה כיצד לגשר היא ניהולית (או דרך optimizer)." },
        { qHe: "אילו סוגי resources מכסה RCCP?", aHe: "Production resources (קווים/מכונות), handling resources (ניטול), ו-storage resources (אחסון)." },
      ],
      takeawaysHe: [
        "RCCP מודד עומס מול קיבולת — לא מגביל.",
        "Usage = receipts × rate; utilization = usage/available.",
        "חושף צווארי-בקבוק לדיון-S&OP.",
      ],
      relatedHe: [
        { labelHe: "S&OP · ביקוש-מוגבל (4.6.5)", href: "/library/sop/chapter-04/#sub-4.6.5" },
      ],
      children: [
        {
          id: "4.7.1",
          titleHe: "משאבי ייצור",
          titleEn: "Production Resources",
          execHe:
            "Production resources מייצגים קווים/מכונות הצורכים זמן לכל יחידה-מיוצרת. RCCP מתרגם production receipts לעומס עליהם ומשווה לקיבולת-הזמינה.",
          beginnerHe:
            "קו-הייצור הוא resource. כל יחידה שמייצרים 'תופסת' לו זמן. RCCP בודק אם סך-הזמן הנדרש נכנס בזמן-הזמין של הקו.",
          consultantHe:
            "Production resource נושא available capacity (לפי calendar/shifts) ומחובר ל-production source עם rate (time per unit / units per hour). capacity usage = production receipt × rate. RCCP מסכם usage לכל bucket ומחשב utilization. overload מצביע על צורך במשמרות/קיבולת נוספת או shift ב-sourcing.",
          purposeHe:
            "למדוד עומס-ייצור מול קיבולת-קווים, ולחשוף היכן הייצור הלא-מוגבל בלתי-אפשרי.",
          processExampleHe:
            "production receipt 10,000 יח'; rate 0.1 שעה/יח' ➔ 1,000 שעות; קו זמין 900 ➔ overload 100 שעות.",
          scenarioHe:
            "בארגון כל קו-מילוי = production resource עם קצב-מילוי (bottles/hour); RCCP מסכם את שעות-המילוי הנדרשות מול זמינות-הקו לכל שבוע.",
          navHe: [
            "SAP IBP ► Master Data ► Resource (Production)",
            "SAP IBP ► Production Source ► Resource Rate",
          ],
          tables: ["Resource", "Capacity Usage", "Production Source"],
          tcodes: ["Manage Master Data", "Run S&OP Operator"],
          fiori: ["Capacity Analytics", "Manage Master Data"],
          configHe: [
            "Production resource: available capacity (calendar/shifts).",
            "Rate (time/unit) ב-production source.",
            "Usage = production receipt × rate.",
          ],
          mistakesHe: [
            "rate שגוי ➔ עומס מעוות.",
            "calendar/shifts לא מעודכן ➔ available capacity שגוי.",
            "resource לא מחובר ל-source ➔ אין עומס.",
          ],
          troubleshootHe: [
            "אין עומס-ייצור ➔ resource/rate לא מוגדר.",
            "utilization מטעה ➔ calendar/available capacity.",
          ],
          bestPracticeHe: [
            "תחזק rates מדויקים לכל קו.",
            "עדכן calendars/shifts לקיבולת ריאלית.",
          ],
          interviewHe: [
            { qHe: "כיצד מחושב עומס על production resource?", aHe: "Capacity usage = production receipt × rate (time per unit); RCCP משווה אותו ל-available capacity של הקו לכל bucket." },
          ],
          takeawaysHe: [
            "Production resource = קו/מכונה.",
            "Usage = receipt × rate.",
            "RCCP משווה לזמינות-הקו.",
          ],
        },
        {
          id: "4.7.2",
          titleHe: "משאבי ניטול ואחסון",
          titleEn: "Handling and Storage Resources",
          execHe:
            "Handling resources מודדים קיבולת-ניטול (קבלה/שילוח/ליקוט) ו-storage resources מודדים קיבולת-אחסון (נפח/מקומות-מדף). RCCP מתרגם receipts ו-inventory לעומס עליהם — לא רק קווי-ייצור.",
          beginnerHe:
            "לא רק לייצר צריך קיבולת — גם להזיז סחורה (ניטול) ולאחסן אותה (מחסן). RCCP בודק גם את אלה: האם המחסן יחזיק את המלאי, והאם יש מספיק כוח-ניטול.",
          consultantHe:
            "Handling resource: usage = throughput (receipts/issues) × handling rate; משווה ל-handling capacity. Storage resource: usage = projected inventory × volume/footprint per unit; משווה ל-storage capacity. שניהם מסומנים overload כשחורגים. קריטי בעונות-שיא: לעיתים האחסון, לא הייצור, הוא צוואר-הבקבוק.",
          purposeHe:
            "לחשוף מגבלות-לוגיסטיקה (ניטול/אחסון) שלא נראות בקיבולת-ייצור בלבד.",
          processExampleHe:
            "projected inventory 5,000 פלטות; מחסן מחזיק 4,000 ➔ storage overload 1,000 — צריך אחסון חיצוני או הקטנת-מלאי.",
          scenarioHe:
            "בארגון בעונת-שיא נפח-המשקאות המאוחסן חורג מקיבולת-המחסן; RCCP על storage resource חושף זאת לפני שהמלאי 'נתקע' ללא מקום.",
          navHe: [
            "SAP IBP ► Master Data ► Resource (Handling / Storage)",
            "SAP IBP ► Analytics ► Storage / Handling Utilization",
          ],
          tables: ["Resource", "Storage Capacity", "Handling Capacity", "Projected Inventory"],
          tcodes: ["Manage Master Data", "Run S&OP Operator"],
          fiori: ["Capacity Analytics", "Manage Master Data"],
          configHe: [
            "Handling resource: throughput × handling rate vs handling capacity.",
            "Storage resource: inventory × volume per unit vs storage capacity.",
            "overload מסומן בחריגה.",
          ],
          mistakesHe: [
            "התעלמות מ-storage ➔ מלאי-עודף ללא מקום.",
            "volume per unit שגוי ➔ עומס-אחסון מעוות.",
            "handling rate חסר ➔ אין עומס-ניטול.",
          ],
          troubleshootHe: [
            "storage overload לא-צפוי ➔ volume per unit/capacity.",
            "אין עומס-ניטול ➔ handling rate/resource לא מוגדר.",
          ],
          bestPracticeHe: [
            "כלול storage/handling ב-RCCP, לא רק ייצור.",
            "תחזק volume per unit ו-handling rates.",
            "בדוק את צוואר-הבקבוק הלוגיסטי בעונות-שיא.",
          ],
          interviewHe: [
            { qHe: "מדוע לכלול storage/handling resources ב-RCCP?", aHe: "כי לעיתים צוואר-הבקבוק אינו הייצור אלא קיבולת-האחסון או הניטול; storage overload (מלאי מעבר לקיבולת-מחסן) יכול לחסום את התוכנית גם כשהקווים פנויים." },
          ],
          takeawaysHe: [
            "RCCP מכסה גם ניטול ואחסון.",
            "Storage usage = inventory × volume/unit.",
            "אחסון יכול להיות צוואר-הבקבוק.",
          ],
        },
        {
          id: "4.7.3",
          titleHe: "מפתחות קיבולת",
          titleEn: "Capacity Key Figures",
          execHe:
            "Capacity key figures מתעדים את תוצאות-ה-RCCP: Capacity Usage, Available Capacity, Capacity Utilization (%) ו-Overload. הם הבסיס ל-analytics ולדשבורד-ה-S&OP על מגבלות.",
          beginnerHe:
            "כדי לראות את תמונת-הקיבולת צריך מספרים: כמה עומס (usage), כמה זמין (available), אחוז-ניצול ו-עומס-יתר. אלה ה-capacity key figures.",
          consultantHe:
            "Capacity Usage (receipts × rate), Available Capacity (resource calendar), Utilization (usage/available), Overload (max(0, usage−available)). הם key figures ב-planning area ברמת resource/bucket, ומשמשים ב-analytics, alerts ו-dashboards. ניתן להגדיר alerts על utilization מעל סף. הם הגשר בין ה-heuristic ל-S&OP review.",
          purposeHe:
            "לכמת ולהציג את מצב-הקיבולת — בסיס ל-alerts, ל-analytics ולשיחה-הניהולית על פערים.",
          processExampleHe:
            "Utilization 118% על קו ➔ alert; הדשבורד מציג usage מול available; overload key figure מזין את רשימת-הפערים לדיון.",
          scenarioHe:
            "בארגון דשבורד-ה-S&OP מציג utilization לכל קו-מילוי ומחסן; alert נדלק כשעובר 100%, ומפנה את צוות-ה-supply לפעולה.",
          navHe: [
            "SAP IBP ► Configuration ► Key Figures (Capacity)",
            "SAP IBP ► Analytics / Alerts ► Capacity Utilization",
          ],
          tables: ["Capacity Usage", "Available Capacity", "Capacity Utilization", "Overload"],
          tcodes: ["Manage Planning Area", "Manage Alerts"],
          fiori: ["Capacity Analytics", "Custom Alerts", "Dashboards"],
          configHe: [
            "Key figures: Usage, Available, Utilization, Overload (resource/bucket).",
            "Utilization = usage/available; Overload = max(0, usage−available).",
            "Alerts על utilization מעל סף.",
          ],
          mistakesHe: [
            "אין alerts ➔ overload מתגלה מאוחר.",
            "utilization מחושב על available שגוי.",
            "key figures לא מוצגים ב-dashboard ➔ אין נראות.",
          ],
          troubleshootHe: [
            "utilization שגוי ➔ usage/available key figure.",
            "alert לא נדלק ➔ סף/הגדרה.",
          ],
          bestPracticeHe: [
            "הגדר alerts על utilization מעל סף.",
            "הצג capacity key figures בדשבורד-ה-S&OP.",
            "עקוב אחרי overload לאורך-זמן (trend).",
          ],
          interviewHe: [
            { qHe: "מהם capacity key figures עיקריים ב-RCCP?", aHe: "Capacity Usage, Available Capacity, Capacity Utilization (%) ו-Overload — לכל resource/bucket; הם מזינים analytics, alerts ו-dashboards." },
          ],
          takeawaysHe: [
            "Capacity key figures = usage/available/utilization/overload.",
            "בסיס ל-alerts ול-dashboards.",
            "הגשר בין RCCP ל-S&OP review.",
          ],
        },
      ],
    },
    // ============================================================ 4.8
    {
      id: "4.8",
      titleHe: "פרמטרים של ה-Heuristic",
      titleEn: "Parameters of the Heuristic",
      execHe:
        "פרמטרי-ה-heuristic נקבעים בהגדרת ה-operator ושולטים בהתנהגותו: processing mode, heuristic type, planning level, quota check, carryforward של מלאי-שלילי, balanced receipts, אתחול lead-time horizon, חישוב expected supply, ושימוש ב-validity dates. כיול נכון שלהם קובע את נכונות ומהירות התוצאה.",
      beginnerHe:
        "ל-heuristic יש 'כפתורי-הגדרה' שקובעים איך הוא רץ — האם מאפס או מעדכן (mode), באיזו רמת-פירוט (level), איך הוא מטפל בחוסרים ובמלאי-שלילי, ועוד. הפרק הזה עובר על הכפתורים האלה אחד-אחד.",
      consultantHe:
        "ה-operator profile של ה-S&OP heuristic נושא פרמטרים: Processing Mode (full/delta), Heuristic Type (variant), Planning Level (רמת-צבירה), Quota Check, Carryforward Negative Projected Inventory, Balanced Receipts, Initialize Lead Time Horizon, Compute Expected Supply, ו-Use of Validity Dates. כל פרמטר משפיע על דיוק, runtime או התנהגות-קצה. הבנתם חיונית לדיבוג תוצאות לא-צפויות ולכיול-ביצועים.",
      purposeHe:
        "לכוונן את ה-heuristic להתנהגות הרצויה — דיוק, מהירות וטיפול-קצה — ולאפשר דיבוג תוצאות.",
      processExampleHe:
        "יועץ מגדיר operator: processing mode=full, planning level=product-location-month, quota check פעיל, carryforward של מלאי-שלילי כבוי; מריץ ובודק שהתוצאות תואמות-ציפייה.",
      scenarioHe:
        "בארגון ה-operator ל-S&OP חודשי מוגדר ברמת product-location-month עם validity dates פעילים (קווים עונתיים) ו-balanced receipts לחלוקה חלקה בין מפעלים.",
      navHe: [
        "SAP IBP ► Configuration ► Operators ► S&OP Heuristic Profile",
        "SAP IBP ► Application Jobs ► Operator Parameters",
      ],
      tables: ["Operator Profile", "Operator Parameters", "Planning Level"],
      tcodes: ["Define Operator", "Run S&OP Operator"],
      fiori: ["Operators", "Schedule IBP Jobs"],
      configHe: [
        "Operator profile מרכז את כל הפרמטרים.",
        "כל פרמטר משפיע על דיוק/runtime/התנהגות-קצה.",
        "כיול נכון = תוצאות צפויות וביצועים טובים.",
      ],
      flow: [
        { he: "Operator Profile", code: "Parameters" },
        { he: "Processing Mode + Level", code: "Scope" },
        { he: "Edge handling", code: "Carryforward/Balanced" },
        { he: "Run", code: "Results" },
      ],
      masterDataHe: [
        "Quota arrangements (ל-quota check).",
        "Validity dates של sources.",
        "Lead times (ל-lead-time horizon).",
      ],
      mistakesHe: [
        "פרמטרים default ללא הבנה ➔ תוצאות לא-צפויות.",
        "planning level מפורט מדי ➔ runtime ארוך.",
        "התעלמות מ-validity dates כשהרשת עונתית.",
      ],
      troubleshootHe: [
        "תוצאות לא-צפויות ➔ סקור פרמטר-אחר-פרמטר.",
        "runtime ארוך ➔ planning level/processing mode.",
        "מקורות שגויים ➔ use of validity dates.",
      ],
      bestPracticeHe: [
        "תעד את כל הפרמטרים של ה-operator.",
        "שנה פרמטר אחד בכל פעם בעת דיבוג.",
        "התאם planning level לאיזון דיוק↔מהירות.",
      ],
      interviewHe: [
        { qHe: "היכן נקבעים פרמטרי-ה-heuristic?", aHe: "ב-operator profile של ה-S&OP heuristic (Configuration ► Operators); הם כוללים processing mode, heuristic type, planning level, quota check, carryforward, balanced receipts ועוד." },
      ],
      takeawaysHe: [
        "הפרמטרים שולטים בדיוק, מהירות וטיפול-קצה.",
        "נקבעים ב-operator profile.",
        "כיול נכון = תוצאות צפויות.",
      ],
      children: [
        {
          id: "4.8.1",
          titleHe: "מצב עיבוד",
          titleEn: "Processing Mode",
          execHe:
            "Processing mode קובע אם ה-heuristic רץ במעבר-מלא (full) — מחשב הכל מאפס — או דלתא (delta) — מעדכן רק את מה שהשתנה. Full נכון ומלא; delta מהיר לעדכונים אינקרמנטליים.",
          beginnerHe:
            "Full = 'חשב הכל מההתחלה'. Delta = 'עדכן רק את מה שהשתנה מאז הפעם הקודמת'. Full בטוח יותר; delta מהיר יותר.",
          consultantHe:
            "Full processing מחשב מחדש את כל ה-scope — תוצאה עקבית ומלאה, אך runtime גבוה. Delta/incremental מעבד רק changed objects (אחרי שינוי-ביקוש/master data) — מהיר אך תלוי במנגנון-ה-change-tracking. ל-S&OP חודשי לרוב full; ל-rapid what-if ייתכן delta. mismatch בין mode לציפייה = תוצאות חלקיות.",
          purposeHe:
            "לאזן בין שלמות-החישוב (full) למהירות-עדכון (delta) לפי הצורך.",
          processExampleHe:
            "סבב-S&OP חודשי ➔ full (חישוב מלא). תיקון-ביקוש נקודתי לפני ישיבה ➔ delta (עדכון מהיר של המושפעים).",
          scenarioHe:
            "בארגון הרצת-הבסיס החודשית היא full; עדכוני-ביקוש אד-הוק בין הישיבות רצים delta למהירות.",
          navHe: [
            "SAP IBP ► Operators ► S&OP Heuristic ► Processing Mode",
          ],
          tables: ["Operator Profile", "Change Log"],
          tcodes: ["Define Operator", "Run S&OP Operator"],
          fiori: ["Operators", "Schedule IBP Jobs"],
          configHe: [
            "Processing mode: Full (כל ה-scope) או Delta (רק שינויים).",
            "Full = עקבי ומלא; Delta = מהיר.",
          ],
          mistakesHe: [
            "Delta כשנדרש full ➔ תוצאות חלקיות.",
            "Full על scope ענק ➔ runtime מיותר.",
          ],
          troubleshootHe: [
            "תוצאות חלקיות ➔ delta החמיץ שינוי; הרץ full.",
            "runtime ארוך ➔ שקול delta לעדכונים.",
          ],
          bestPracticeHe: [
            "Full לסבב-בסיס; delta ל-what-if מהיר.",
            "הרץ full תקופתית לאיפוס-עקביות.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין full ל-delta processing?", aHe: "Full מחשב את כל ה-scope מאפס (עקבי, איטי); Delta מעדכן רק objects שהשתנו (מהיר, תלוי change-tracking)." },
          ],
          takeawaysHe: [
            "Full = הכל מאפס; Delta = רק שינויים.",
            "Full עקבי; delta מהיר.",
            "Full לסבב-בסיס, delta ל-what-if.",
          ],
        },
        {
          id: "4.8.2",
          titleHe: "סוג ה-heuristic",
          titleEn: "Heuristic Type",
          execHe:
            "Heuristic type בוחר את הווריאנט של ה-S&OP heuristic — למשל ה-heuristic התקני, או וריאנטים מיוחדים כמו shelf-life infinite. הבחירה קובעת אילו לוגיקות-קצה מופעלות.",
          beginnerHe:
            "יש כמה 'גרסאות' של ה-heuristic. הגרסה התקנית מתאימה לרוב, אבל יש גרסאות מיוחדות — למשל לתכנון לפי חיי-מדף. Heuristic type בוחר איזו גרסה רצה.",
          consultantHe:
            "Heuristic type קובע את האלגוריתם: standard S&OP supply heuristic, shelf-life planning infinite heuristic, או shelf-life distribution heuristic (4.9). כל type מפעיל לוגיקה ייעודית (למשל אכיפת shelf-life). הבחירה ב-operator profile חייבת להתאים למטרת-התכנון; type שגוי ➔ לוגיקה לא-רלוונטית או חסרה.",
          purposeHe:
            "להתאים את אלגוריתם-ה-heuristic למקרה-השימוש (תכנון-רגיל מול shelf-life מול distribution).",
          processExampleHe:
            "מוצר-מדף-קצר ➔ בחירת shelf-life infinite heuristic במקום standard, כדי שהתכנון יתחשב בתוקף.",
          scenarioHe:
            "בארגון משקאות עם תוקף מתוכננים ב-shelf-life heuristic; משקאות יציבים — ב-standard heuristic.",
          navHe: [
            "SAP IBP ► Operators ► S&OP Heuristic ► Heuristic Type",
          ],
          tables: ["Operator Profile"],
          tcodes: ["Define Operator", "Run S&OP Operator"],
          fiori: ["Operators", "Schedule IBP Jobs"],
          configHe: [
            "Heuristic type: standard / shelf-life infinite / shelf-life distribution.",
            "כל type מפעיל לוגיקה ייעודית.",
          ],
          mistakesHe: [
            "type שגוי ➔ לוגיקת-shelf-life לא מופעלת.",
            "standard למוצר-מדף-קצר ➔ תוקף לא נשמר.",
          ],
          troubleshootHe: [
            "shelf-life לא נאכף ➔ נבחר standard במקום shelf-life type.",
          ],
          bestPracticeHe: [
            "בחר type לפי מאפייני-המוצר (תוקף).",
            "תעד אילו מוצרים דורשים shelf-life type.",
          ],
          interviewHe: [
            { qHe: "מתי בוחרים shelf-life heuristic type?", aHe: "כשהמוצר מוגבל-תוקף וצריך שהתכנון יתחשב ב-shelf-life; ה-standard heuristic מתעלם מתוקף." },
          ],
          takeawaysHe: [
            "Heuristic type = וריאנט האלגוריתם.",
            "standard / shelf-life infinite / distribution.",
            "התאם למאפייני-המוצר.",
          ],
          relatedHe: [
            { labelHe: "S&OP · תכנון חיי-מדף (4.9)", href: "/library/sop/chapter-04/#sub-4.9" },
          ],
        },
        {
          id: "4.8.3",
          titleHe: "רמת התכנון של ה-heuristic",
          titleEn: "Planning Level of the Heuristic",
          execHe:
            "Planning level קובע את רמת-הצבירה שבה ה-heuristic מחשב (למשל product-location-month מול product-location-week). רמה גבוהה = מהיר ופחות-מפורט; רמה נמוכה = מדויק אך איטי.",
          beginnerHe:
            "באיזו 'רזולוציה' מתכננים? לפי חודש או שבוע? לפי מוצר-מיקום או גם לפי לקוח? זו רמת-התכנון. גסה יותר = מהר; עדינה יותר = מדויק אך כבד.",
          consultantHe:
            "Planning level הוא צירוף-attributes (product, location, customer) × time granularity שעליו ה-heuristic מצבר ומחשב. הוא משפיע ישירות על runtime ועל דיוק. ל-S&OP נפחי מתאים level גבוה (product-location-month); תכנון-פירוט דורש level נמוך. חוסר-התאמה בין level לנתוני-הקלט ➔ צבירה/פיזור לא-רצויים.",
          purposeHe:
            "לאזן דיוק מול ביצועים ולהתאים את רמת-התכנון למטרת-ה-S&OP (נפח מול פירוט).",
          processExampleHe:
            "S&OP נפחי רץ ב-product-location-month — מהיר; כשנדרש פירוט שבועי לתכנון-אספקה קצר-טווח, מורידים ל-week.",
          scenarioHe:
            "בארגון ה-S&OP החודשי רץ ב-product-location-month; תכנון-מילוי קצר-טווח באזור עומס יורד לרמה שבועית.",
          navHe: [
            "SAP IBP ► Operators ► S&OP Heuristic ► Planning Level",
          ],
          tables: ["Planning Level", "Operator Profile", "Time Profile"],
          tcodes: ["Define Operator", "Manage Planning Area"],
          fiori: ["Operators", "Planning Areas"],
          configHe: [
            "Planning level = attributes × time granularity.",
            "גבוה = מהיר/גס; נמוך = מדויק/איטי.",
            "התאם למטרת-התכנון.",
          ],
          mistakesHe: [
            "level נמוך מדי ➔ runtime ארוך מיותר.",
            "level גבוה מדי ➔ אובדן-פירוט נדרש.",
            "אי-התאמה ל-time profile.",
          ],
          troubleshootHe: [
            "runtime ארוך ➔ העלה את planning level.",
            "חוסר-פירוט ➔ הורד את planning level.",
          ],
          bestPracticeHe: [
            "התחל ב-level גבוה ל-S&OP נפחי.",
            "הורד פירוט רק היכן שנדרש.",
          ],
          interviewHe: [
            { qHe: "כיצד planning level משפיע על ה-heuristic?", aHe: "הוא קובע את רמת-הצבירה (attributes × time) שבה המנוע מחשב; רמה גבוהה מהירה וגסה, רמה נמוכה מדויקת אך איטית." },
          ],
          takeawaysHe: [
            "Planning level = רזולוציית-החישוב.",
            "גבוה=מהיר/גס; נמוך=מדויק/איטי.",
            "התאם לנפח מול פירוט.",
          ],
        },
        {
          id: "4.8.4",
          titleHe: "פרמטרי בדיקת-quota",
          titleEn: "Quota Check Parameters",
          execHe:
            "Quota check parameters שולטים כיצד ה-heuristic מאמת ומחיל quota arrangements בחלוקת-ביקוש בין מספר מקורות — האם לאכוף בדיוק, לעגל, או לטפל בשאריות. הם מבטיחים חלוקה תקינה.",
          beginnerHe:
            "כשיש כמה ספקים/מפעלים לאותו מוצר, ה-quota מחלק ביניהם (למשל 60/40). פרמטרי quota check קובעים עד כמה לאכוף את החלוקה הזו ומה לעשות עם שאריות-עיגול.",
          consultantHe:
            "Quota check מאמת ש-ratios מסתכמים ל-100% ומחיל אותם על net demand, עם פרמטרים ל-rounding ולטיפול-בשארית (residual). הוא יכול לאכוף quota קשיח או לאפשר גמישות כשמקור לא-תקף. שילוב עם lot-sizing משפיע על הכמות-בפועל לכל מקור. הגדרה שגויה ➔ חלוקה לא-מאוזנת או ביקוש לא-מוקצה.",
          purposeHe:
            "להבטיח שחלוקת-הביקוש בין מקורות תהיה תקינה, מאוזנת ומלאה (ללא ביקוש-יתום).",
          processExampleHe:
            "net demand 1,000, quota 60/40 ➔ 600/400; אם מקור-A לא-תקף בתקופה, quota check מנתב את כל ה-1,000 ל-B (לפי הגדרת-גמישות).",
          scenarioHe:
            "בארגון משקה המסופק משני מפעלים בחלוקת-quota; quota check מבטיח חלוקה נכונה, ומנתב ל-מפעל הזמין כשהשני בתחזוקה.",
          navHe: [
            "SAP IBP ► Operators ► S&OP Heuristic ► Quota Check",
            "SAP IBP ► Sourcing ► Quota Arrangement",
          ],
          tables: ["Quota Arrangement", "Operator Profile", "Net Demand"],
          tcodes: ["Define Operator", "Manage Master Data"],
          fiori: ["Operators", "Sourcing Workbook"],
          configHe: [
            "Quota check: אכיפת ratios + rounding + residual handling.",
            "אכיפה קשיחה מול גמישות כשמקור לא-תקף.",
            "משולב עם lot-sizing.",
          ],
          mistakesHe: [
            "ratios שלא מסתכמים 100% ➔ ביקוש לא-מוקצה.",
            "rounding לא מטופל ➔ שאריות.",
            "אכיפה קשיחה כשמקור לא-זמין ➔ ביקוש תקוע.",
          ],
          troubleshootHe: [
            "חלוקה לא-מאוזנת ➔ quota ratios/check.",
            "ביקוש-יתום ➔ ratios או source לא-תקף.",
          ],
          bestPracticeHe: [
            "ודא ratios מסתכמים 100%.",
            "הגדר residual/rounding מפורש.",
            "אפשר גמישות-quota כשמקור עלול להיות לא-זמין.",
          ],
          interviewHe: [
            { qHe: "מה עושים quota check parameters?", aHe: "מאמתים ומחילים את ה-quota arrangements בחלוקת-ביקוש בין מקורות — אכיפת ratios, rounding וטיפול-בשארית — כדי להבטיח חלוקה תקינה ומלאה." },
          ],
          takeawaysHe: [
            "Quota check מאמת חלוקה בין מקורות.",
            "כולל rounding ו-residual.",
            "מונע ביקוש-יתום.",
          ],
          relatedHe: [
            { labelHe: "S&OP · כללי sourcing (4.3.2)", href: "/library/sop/chapter-04/#sub-4.3.2" },
          ],
        },
        {
          id: "4.8.5",
          titleHe: "העברת מלאי-חזוי שלילי קדימה",
          titleEn: "Carryforward Negative Projected Inventory",
          execHe:
            "פרמטר זה קובע אם מלאי-חזוי שלילי (חוסר שלא כוסה) מועבר קדימה ל-bucket הבא (carryforward) או 'מתאפס' בכל תקופה. Carryforward משקף חוסר מצטבר; איפוס מתייחס לכל תקופה בנפרד.",
          beginnerHe:
            "אם בחודש מסוים חסר מלאי (מספר שלילי), האם החוסר 'נגרר' לחודש הבא או מתחילים נקי? הפרמטר הזה קובע. Carryforward = החוסר נגרר; אחרת — כל חודש לעצמו.",
          consultantHe:
            "כש-carryforward פעיל, projected inventory שלילי בסוף bucket נכנס כ-opening לבא ➔ הצורך מצטבר ומשתקף כחוסר מתמשך עד שמכוסה. כשכבוי, כל bucket מחושב עצמאית והשלילי 'נשכח' ➔ עלול להסתיר חוסר אמיתי. ל-S&OP לרוב carryforward פעיל לראות חוסר אמיתי-מצטבר; כיבוי שימושי כשרוצים תמונה per-bucket בלבד.",
          purposeHe:
            "לקבוע אם חוסרים נצברים לאורך-זמן (תמונת-מציאות) או מטופלים נקודתית — משפיע על נראות-החוסר.",
          processExampleHe:
            "חוסר 100 בחודש 1; carryforward פעיל ➔ חודש 2 פותח ב-(−100), והצורך מצטבר. כבוי ➔ חודש 2 פותח ב-0 והחוסר 'נעלם'.",
          scenarioHe:
            "בארגון carryforward פעיל מראה חוסר-משקה מצטבר על-פני שבועות-שיא, כך שצוות-ה-supply רואה את גודל-הפער האמיתי ולא תמונה-מקוטעת.",
          navHe: [
            "SAP IBP ► Operators ► S&OP Heuristic ► Carryforward Negative Projected Inventory",
          ],
          tables: ["Projected Inventory", "Operator Profile", "Net Demand"],
          tcodes: ["Define Operator", "Run S&OP Operator"],
          fiori: ["Operators", "Planning View"],
          configHe: [
            "Carryforward פעיל: שלילי נכנס כ-opening לבא (חוסר מצטבר).",
            "כבוי: כל bucket עצמאי (שלילי 'נשכח').",
          ],
          mistakesHe: [
            "כיבוי כשרוצים חוסר-מצטבר ➔ חוסר אמיתי מוסתר.",
            "אי-הבנת ההשפעה על projected inventory.",
          ],
          troubleshootHe: [
            "חוסר 'נעלם' בין תקופות ➔ carryforward כבוי.",
            "חוסר מצטבר מוגזם ➔ ודא שזה אכן מצטבר אמיתי.",
          ],
          bestPracticeHe: [
            "הפעל carryforward לראיית חוסר אמיתי-מצטבר ב-S&OP.",
            "תעד את בחירת-הפרמטר לצוות.",
          ],
          interviewHe: [
            { qHe: "מה עושה carryforward של projected inventory שלילי?", aHe: "מעביר חוסר (מלאי-חזוי שלילי) ל-opening של ה-bucket הבא, כך שהחוסר מצטבר ומשתקף עד שיכוסה; כיבוי מאפס כל תקופה ועלול להסתיר חוסר." },
          ],
          takeawaysHe: [
            "Carryforward = חוסר נגרר קדימה.",
            "פעיל ➔ חוסר מצטבר ונראה.",
            "כבוי ➔ per-bucket, עלול להסתיר.",
          ],
          relatedHe: [
            { labelHe: "S&OP · חישוב net demand (4.5.4)", href: "/library/sop/chapter-04/#sub-4.5.4" },
          ],
        },
        {
          id: "4.8.6",
          titleHe: "קבלות מאוזנות",
          titleEn: "Balanced Receipts",
          execHe:
            "Balanced receipts גורם ל-heuristic לפזר את ה-receipts באופן חלק יותר על-פני התקופות/המקורות במקום לרכז אותם — מפחית 'קפיצות' חדות בייצור ובמלאי, ויוצר תוכנית מאוזנת יותר.",
          beginnerHe:
            "במקום לייצר הכל בבת-אחת ואז כלום, balanced receipts 'מורח' את הייצור בצורה אחידה יותר. זה יוצר תוכנית חלקה במקום קפיצות.",
          consultantHe:
            "Balanced receipts משנה את לוגיקת-ה-lot-sizing/timing כך שה-receipts מתפזרים על-פני buckets (smoothing) או בין מקורות באופן מאוזן, במקום front-loading. זה מפחית תנודתיות-ייצור ו-peaks במלאי/קיבולת, על-חשבון התאמה מדויקת לכל bucket. שימושי כשרוצים level production. עלול להעלות מעט מלאי-ביניים.",
          purposeHe:
            "ליצור תוכנית-ייצור/אספקה חלקה ומאוזנת, להפחית תנודתיות ועומסי-שיא.",
          processExampleHe:
            "ביקוש מרוכז בשבוע 4; balanced receipts מפזר חלק מהייצור לשבועות 1–3 ➔ עומס-קו אחיד במקום spike בשבוע 4.",
          scenarioHe:
            "בארגון balanced receipts מאזן מילוי-משקאות על-פני השבוע במקום ריצות-ענק, מפחית עומסי-שיא על הקווים ועל המחסן.",
          navHe: [
            "SAP IBP ► Operators ► S&OP Heuristic ► Balanced Receipts",
          ],
          tables: ["Total Receipts", "Operator Profile", "Capacity Usage"],
          tcodes: ["Define Operator", "Run S&OP Operator"],
          fiori: ["Operators", "Planning View"],
          configHe: [
            "Balanced receipts: smoothing של receipts על buckets/מקורות.",
            "מפחית peaks; עלול להעלות מלאי-ביניים.",
          ],
          mistakesHe: [
            "הפעלה כשנדרשת התאמה-מדויקת-לתקופה ➔ מלאי-ביניים עודף.",
            "ציפייה ל-leveling קיבולתי מלא — זה smoothing, לא optimization.",
          ],
          troubleshootHe: [
            "מלאי-ביניים גבוה ➔ balanced receipts פעיל.",
            "עומס עדיין מרוכז ➔ ודא שהפרמטר פעיל.",
          ],
          bestPracticeHe: [
            "השתמש כשרוצים level production והפחתת-peaks.",
            "אזן מול עליית-מלאי-ביניים.",
          ],
          interviewHe: [
            { qHe: "מה עושה balanced receipts?", aHe: "מפזר את ה-receipts בצורה חלקה על-פני תקופות/מקורות (smoothing) במקום לרכזם, להפחתת תנודתיות-ייצור ועומסי-שיא — על-חשבון מעט מלאי-ביניים." },
          ],
          takeawaysHe: [
            "Balanced receipts = smoothing של אספקה.",
            "מפחית peaks ותנודתיות.",
            "עלול להעלות מלאי-ביניים.",
          ],
          relatedHe: [
            { labelHe: "S&OP · ביקוש-מוגבל (4.6.5)", href: "/library/sop/chapter-04/#sub-4.6.5" },
          ],
        },
        {
          id: "4.8.7",
          titleHe: "אתחול אופק זמן-אספקה",
          titleEn: "Initialize Lead Time Horizon",
          execHe:
            "פרמטר זה קובע כיצד ה-heuristic מטפל בתקופת-ה-lead-time הראשונית: בתוך אופק-האספקה (lead time horizon) לרוב כבר אי-אפשר ליצור receipts חדשים, ולכן הביקוש בו מטופל בנפרד (firmed/קיים בלבד).",
          beginnerHe:
            "אם זמן-האספקה הוא שבועיים, אי-אפשר 'לייצר אתמול' כדי לכסות ביקוש מהיום. אופק-ה-lead-time הוא התקופה הקרובה שבה כבר מאוחר מדי לתכנן חדש; הפרמטר קובע איך מתייחסים אליה.",
          consultantHe:
            "Initialize lead time horizon מסמן את התקופה מ-today עד ה-lead time כ-frozen/firmed: ה-heuristic לא ייצר בה receipts חדשים (כי לא ריאלי), ויסתמך על receipts קיימים/firmed בלבד. ביקוש שאינו מכוסה בתוך האופק מסומן כחוסר. בלי אתחול נכון, ה-heuristic עלול לתכנן receipts לא-ריאליים בעבר-הקרוב.",
          purposeHe:
            "למנוע תכנון לא-ריאלי בטווח-הקצר שמתחת ל-lead time, ולשקף נכון מה ניתן ומה לא בתוך האופק.",
          processExampleHe:
            "lead time 2 שבועות; ביקוש בשבוע הקרוב לא ניתן לכסות ב-receipt חדש ➔ מסומן חוסר, וה-heuristic מתכנן רק מהשבוע השלישי ואילך.",
          scenarioHe:
            "בארגון עם lead time של תרכיז 3 שבועות, ה-heuristic לא מתכנן רכש-תרכיז חדש לתוך 3 השבועות הקרובים; חוסר בטווח זה מסומן ומועבר לטיפול-חירום.",
          navHe: [
            "SAP IBP ► Operators ► S&OP Heuristic ► Initialize Lead Time Horizon",
          ],
          tables: ["Operator Profile", "Lead Time", "Total Receipts"],
          tcodes: ["Define Operator", "Run S&OP Operator"],
          fiori: ["Operators", "Planning View"],
          configHe: [
            "מסמן את אופק-ה-lead-time כ-frozen (אין receipts חדשים).",
            "מסתמך על receipts קיימים/firmed בתוך האופק.",
            "ביקוש לא-מכוסה באופק ➔ חוסר.",
          ],
          mistakesHe: [
            "אי-אתחול ➔ receipts לא-ריאליים בטווח-קצר.",
            "אופק שגוי ➔ frozen ארוך/קצר מדי.",
          ],
          troubleshootHe: [
            "receipts לא-ריאליים בעבר-קרוב ➔ הפעל אתחול lead-time horizon.",
            "חוסר לא-צפוי בטווח-קצר ➔ אופק frozen תקין?",
          ],
          bestPracticeHe: [
            "הפעל אתחול כדי לשמור ריאליות בטווח-הקצר.",
            "התאם את אורך-האופק ל-lead times בפועל.",
          ],
          interviewHe: [
            { qHe: "מדוע מאתחלים lead time horizon?", aHe: "כדי שה-heuristic לא יתכנן receipts חדשים בתוך תקופת-ה-lead-time (שבה כבר מאוחר לייצר/לרכוש), אלא יסמן ביקוש לא-מכוסה כחוסר — שמירה על ריאליות בטווח-הקצר." },
          ],
          takeawaysHe: [
            "אופק-lead-time = טווח שבו מאוחר לתכנן חדש.",
            "אתחול ➔ frozen, ללא receipts חדשים.",
            "מונע תכנון לא-ריאלי בטווח-קצר.",
          ],
        },
        {
          id: "4.8.8",
          titleHe: "חישוב היצע-צפוי",
          titleEn: "Compute Expected Supply",
          execHe:
            "Compute expected supply גורם ל-heuristic לחשב key figure של ההיצע-הצפוי בפועל בהינתן lead times ומגבלות-עיתוי — לעומת ה-receipts ה'אידיאליים'. הוא משקף מתי האספקה באמת תגיע.",
          beginnerHe:
            "ה-receipt אומר 'כמה' אבל לא תמיד 'מתי בדיוק יגיע בפועל'. Expected supply מחשב את ההיצע הצפוי בהתחשב בזמני-אספקה — תמונה ריאלית יותר של מה יהיה זמין בכל תקופה.",
          consultantHe:
            "Compute expected supply מייצר key figure המשקלל receipts מול lead-time offsets ומגבלות-עיתוי, להצגת supply-אפקטיבי-בזמן. הוא שימושי להשוואה מול ביקוש ולחישוב projected inventory ריאלי. דורש key figures ו-lead time master data תקינים. כיבוי ➔ עובדים מול receipts גולמיים בלבד.",
          purposeHe:
            "לספק תמונת-היצע ריאלית-בזמן (מתי יגיע) ולא רק כמותית — לחישוב מלאי והשוואה מדויקים.",
          processExampleHe:
            "receipt 800 מתוכנן לשבוע 5, lead 1 שבוע ➔ expected supply 800 זמין שבוע 5; אם source מתעכב, ה-expected supply משקף את העיכוב.",
          scenarioHe:
            "בארגון expected supply מראה מתי תרכיז שנרכש יהיה זמין בפועל למילוי, בהתחשב ב-lead time הספק — בסיס לחישוב מלאי-משקה ריאלי.",
          navHe: [
            "SAP IBP ► Operators ► S&OP Heuristic ► Compute Expected Supply",
          ],
          tables: ["Expected Supply", "Total Receipts", "Lead Time", "Projected Inventory"],
          tcodes: ["Define Operator", "Run S&OP Operator"],
          fiori: ["Operators", "Planning View"],
          configHe: [
            "מחשב key figure של expected supply (receipts × lead-time/timing).",
            "משמש להשוואה ולחישוב projected inventory ריאלי.",
            "דורש lead time master data תקין.",
          ],
          mistakesHe: [
            "כיבוי כשרוצים תמונת-עיתוי ריאלית ➔ מלאי לא-מדויק.",
            "lead times שגויים ➔ expected supply מטעה.",
          ],
          troubleshootHe: [
            "מלאי-חזוי לא תואם-אספקה ➔ expected supply לא מחושב.",
            "עיתוי שגוי ➔ lead time master data.",
          ],
          bestPracticeHe: [
            "הפעל כשעיתוי-האספקה חשוב לחישוב-מלאי.",
            "ודא lead times מדויקים.",
          ],
          interviewHe: [
            { qHe: "מה מוסיף compute expected supply?", aHe: "Key figure של ההיצע-הצפוי-בזמן (receipts בהתחשב ב-lead times/עיתוי), המאפשר חישוב projected inventory והשוואה-לביקוש ריאליים יותר מאשר receipts גולמיים." },
          ],
          takeawaysHe: [
            "Expected supply = היצע ריאלי-בזמן.",
            "משקלל receipts מול lead times.",
            "לחישוב מלאי והשוואה מדויקים.",
          ],
        },
        {
          id: "4.8.9",
          titleHe: "שימוש בתאריכי-תוקף",
          titleEn: "Use of Validity Dates",
          execHe:
            "פרמטר זה קובע אם ה-heuristic מכבד את ה-validity dates של sources, quotas ו-master data — כך שרק מקורות תקפים-בזמן נבחרים בכל bucket. חיוני לרשתות עונתיות או משתנות.",
          beginnerHe:
            "לכל מקור-אספקה יש 'מתי הוא תקף' (תאריכי-תוקף). הפרמטר הזה אומר ל-heuristic לכבד אותם — לא להשתמש במקור לפני שהתחיל או אחרי שהסתיים.",
          consultantHe:
            "Use of validity dates מורה ל-heuristic לסנן sources/quotas/lanes לפי ה-valid-from/valid-to בכל time bucket. כך מעבר-ספקים, קווים עונתיים או phase-in/phase-out מטופלים נכון. כיבוי ➔ ה-heuristic עלול לבחור מקור לא-תקף-בזמן. קריטי כשהרשת משתנה לאורך-האופק (validity-dependent sourcing).",
          purposeHe:
            "להבטיח שבכל תקופה נבחרים רק מקורות-אספקה תקפים — תמיכה ב-phase-in/out, עונתיות ומעברי-ספקים.",
          processExampleHe:
            "ספק A תקף עד סוף-Q2, ספק B מ-Q3; עם validity dates ה-heuristic בוחר A ב-Q1–Q2 ו-B מ-Q3 — מעבר חלק.",
          scenarioHe:
            "בארגון קו-מילוי עונתי תקף רק בקיץ; validity dates מבטיחים שה-heuristic מתכנן עליו רק בחודשי-הקיץ, ועובר למפעל אחר בשאר השנה.",
          navHe: [
            "SAP IBP ► Operators ► S&OP Heuristic ► Use of Validity Dates",
            "SAP IBP ► Sourcing ► Valid-From / Valid-To",
          ],
          tables: ["Source of Supply", "Validity", "Quota Arrangement"],
          tcodes: ["Define Operator", "Manage Master Data"],
          fiori: ["Operators", "Sourcing Workbook"],
          configHe: [
            "מסנן sources/quotas/lanes לפי valid-from/valid-to בכל bucket.",
            "תומך phase-in/out, עונתיות, מעברי-ספקים.",
            "כיבוי ➔ עלול לבחור מקור לא-תקף.",
          ],
          mistakesHe: [
            "כיבוי ברשת עונתית ➔ מקור לא-תקף נבחר.",
            "validity dates לא-עקביים ➔ פערים/חפיפות.",
          ],
          troubleshootHe: [
            "מקור שגוי-בזמן נבחר ➔ הפעל use of validity dates.",
            "פער-אספקה במעבר-ספקים ➔ validity לא-רציף.",
          ],
          bestPracticeHe: [
            "הפעל תמיד ברשתות עונתיות/משתנות.",
            "תחזק validity רציף וללא-חפיפה במעברים.",
          ],
          interviewHe: [
            { qHe: "מתי קריטי להפעיל use of validity dates?", aHe: "כשהרשת משתנה לאורך-האופק — phase-in/out של מוצרים, קווים עונתיים, או מעברי-ספקים — כדי שבכל תקופה ייבחרו רק מקורות תקפים-בזמן." },
          ],
          takeawaysHe: [
            "Validity dates ➔ רק מקורות תקפים-בזמן.",
            "תומך עונתיות ומעברי-ספקים.",
            "חיוני ברשתות משתנות.",
          ],
          relatedHe: [
            { labelHe: "S&OP · כללי sourcing (4.3.2)", href: "/library/sop/chapter-04/#sub-4.3.2" },
          ],
        },
      ],
    },
    // ============================================================ 4.9
    {
      id: "4.9",
      titleHe: "תכנון חיי-מדף",
      titleEn: "Shelf-Life Planning",
      execHe:
        "תכנון חיי-מדף (shelf-life planning) מרחיב את ה-heuristic כדי להתחשב בתוקף-המוצר: לוודא שמלאי שמיוצר/מועבר יישאר תקף עד שייצרך, ולמנוע תכנון שמוביל לפג-תוקף. קריטי למזון, משקאות ותרופות.",
      beginnerHe:
        "למשקה יש תאריך-תפוגה. אין טעם לייצר היום מלאי שיפוג לפני שיימכר. Shelf-life planning דואג שהתכנון יתחשב בתוקף — שלא נייצר מוקדם מדי ולא נשלח מלאי שלא יספיק להגיע בתוקף.",
      consultantHe:
        "Shelf-life planning מוסיף ל-heuristic מודעות ל-shelf-life attributes: total shelf life, minimum remaining shelf life (לקבלה/מכירה), ו-required remaining shelf life ביעד. שני וריאנטים: shelf-life infinite heuristic (תכנון לא-מוגבל מודע-תוקף) ו-shelf-life distribution heuristic (חלוקה מודעת-תוקף ברשת). ה-heuristic מתאם production/transport timing כך שהמלאי מגיע עם מספיק תוקף-שיורי. דורש shelf-life master data וב-heuristic type מתאים.",
      purposeHe:
        "למנוע פג-תוקף ו-write-offs, ולהבטיח שהמלאי מגיע ליעד עם תוקף-שיורי מספק למכירה.",
      processExampleHe:
        "מוצר עם 90 ימי-תוקף; היעד דורש 60 ימי-תוקף-שיורי בקבלה ➔ ה-heuristic מתזמן ייצור/הובלה כך שלא יישלח מלאי בן יותר מ-30 יום.",
      scenarioHe:
        "בארגון משקאות עם תוקף מוגבל: shelf-life planning מבטיח שמילוי והפצה מתוזמנים כך שהמשקה מגיע לרשת-הקמעונאות עם מספיק ימי-מדף, ומונע החזרות/השמדה.",
      navHe: [
        "SAP IBP ► Operators ► S&OP Heuristic ► Heuristic Type (Shelf-Life)",
        "SAP IBP ► Master Data ► Shelf-Life Attributes",
      ],
      tables: ["Shelf Life", "Min Remaining Shelf Life", "Required Remaining Shelf Life"],
      tcodes: ["Define Operator", "Run S&OP Operator", "Manage Master Data"],
      fiori: ["Operators", "Manage Master Data"],
      configHe: [
        "Shelf-life master data: total / min remaining / required remaining shelf life.",
        "Heuristic type: shelf-life infinite או distribution.",
        "ה-heuristic מתאם timing לתוקף-שיורי מספק.",
      ],
      flow: [
        { he: "Shelf-life attributes", code: "Master Data" },
        { he: "Shelf-life heuristic", code: "Type" },
        { he: "Timing מודע-תוקף", code: "Receipts" },
        { he: "מלאי תקף ביעד", code: "No expiry" },
      ],
      masterDataHe: [
        "Total shelf life, minimum remaining, required remaining shelf life.",
        "Heuristic type מתאים (shelf-life).",
      ],
      mistakesHe: [
        "standard heuristic למוצר-תוקף ➔ פג-תוקף לא-מתוכנן.",
        "shelf-life master data חסר ➔ הלוגיקה לא פועלת.",
        "required remaining גבוה מדי ➔ חוסר מלאכותי.",
      ],
      troubleshootHe: [
        "מלאי פג-תוקף בתוכנית ➔ shelf-life type/attributes חסרים.",
        "חוסר לא-צפוי ➔ required remaining shelf life גבוה מדי.",
      ],
      bestPracticeHe: [
        "תחזק shelf-life attributes מדויקים.",
        "בחר shelf-life heuristic type למוצרי-תוקף.",
        "כייל required remaining מול דרישות-לקוח אמיתיות.",
      ],
      interviewHe: [
        { qHe: "מה מוסיף shelf-life planning ל-heuristic?", aHe: "מודעות-תוקף: ה-heuristic מתאם timing של ייצור/הובלה כך שהמלאי מגיע ליעד עם מספיק תוקף-שיורי (required remaining shelf life), ומונע פג-תוקף." },
        { qHe: "מהם שני הווריאנטים?", aHe: "Shelf-life infinite heuristic (תכנון לא-מוגבל מודע-תוקף) ו-shelf-life distribution heuristic (חלוקה מודעת-תוקף ברשת)." },
      ],
      takeawaysHe: [
        "Shelf-life planning = תכנון מודע-תוקף.",
        "מונע פג-תוקף ו-write-offs.",
        "שני וריאנטים: infinite ו-distribution.",
      ],
      relatedHe: [
        { labelHe: "S&OP · סוג ה-heuristic (4.8.2)", href: "/library/sop/chapter-04/#sub-4.8.2" },
      ],
      children: [
        {
          id: "4.9.1",
          titleHe: "Shelf-Life Planning Infinite Heuristic",
          titleEn: "Shelf-Life Planning Infinite Heuristic",
          execHe:
            "ה-shelf-life infinite heuristic הוא וריאנט לא-מוגבל של ה-heuristic המתחשב בתוקף: הוא מתכנן receipts ללא מגבלות-קיבולת אך כן עם אילוצי-תוקף, כך שכל מלאי מתוכנן יישאר תקף עד צריכתו.",
          beginnerHe:
            "כמו ה-heuristic הרגיל (אינסוף קיבולת), אבל עם 'שמירה על תוקף': הוא לא יתכנן לייצר מלאי שיפוג לפני שיימכר.",
          consultantHe:
            "ה-infinite shelf-life heuristic משלב את לוגיקת-ה-unconstrained הרגילה עם בדיקות-תוקף: receipts מתוזמנים כך שהתוקף-השיורי בקבלה/מכירה עומד ב-required remaining shelf life. כשמלאי לא יספיק להישאר תקף, הוא לא ייחשב ככיסוי וייווצר receipt חדש או חוסר. נשאר לא-מוגבל בקיבולת — תפקיד ה-RCCP נשמר.",
          purposeHe:
            "לקבל תוכנית-אספקה לא-מוגבלת אך תקפת-תוקף — תמונה נקייה של 'מה צריך' שמכבדת חיי-מדף.",
          processExampleHe:
            "ביקוש בחודש 6; מוצר 90 ימי-תוקף; ה-heuristic לא יתכנן ייצור בחודש 1 לכיסוי חודש 6 (יפוג), אלא קרוב יותר לצריכה.",
          scenarioHe:
            "בארגון ה-infinite shelf-life heuristic מתכנן מילוי-משקאות קרוב-לצריכה ככל-האפשר, לא-מוגבל בקיבולת, אך תמיד בתוך חלון-התוקף.",
          navHe: [
            "SAP IBP ► Operators ► Shelf-Life Infinite Heuristic",
          ],
          tables: ["Shelf Life", "Total Receipts", "Operator Profile"],
          tcodes: ["Define Operator", "Run S&OP Operator"],
          fiori: ["Operators", "Planning View"],
          configHe: [
            "Heuristic type = shelf-life infinite.",
            "Receipts תקפי-תוקף, לא-מוגבלים בקיבולת.",
            "מלאי שיפוג אינו נחשב ככיסוי.",
          ],
          mistakesHe: [
            "ערבוב עם ה-distribution variant ➔ לוגיקה שונה.",
            "required remaining גבוה מדי ➔ ייצור מאוחר/חוסר.",
          ],
          troubleshootHe: [
            "ייצור מוקדם-מדי שפג ➔ ודא shelf-life attributes.",
            "חוסר ➔ required remaining shelf life גבוה מדי.",
          ],
          bestPracticeHe: [
            "השתמש למוצרי-תוקף הדורשים תכנון לא-מוגבל.",
            "כייל required remaining ריאלי.",
          ],
          interviewHe: [
            { qHe: "במה ה-infinite shelf-life heuristic שונה מה-standard?", aHe: "הוא מוסיף אילוצי-תוקף: receipts מתוזמנים כך שיישארו תקפים עד הצריכה, ומלאי שיפוג אינו נחשב ככיסוי — אך נשאר לא-מוגבל בקיבולת." },
          ],
          takeawaysHe: [
            "Infinite shelf-life = לא-מוגבל אך תקף-תוקף.",
            "receipts קרובים-לצריכה.",
            "מלאי שיפוג ≠ כיסוי.",
          ],
        },
        {
          id: "4.9.2",
          titleHe: "Shelf-Life Distribution Planning Heuristic",
          titleEn: "Shelf-Life Distribution Planning Heuristic",
          execHe:
            "ה-shelf-life distribution heuristic מתמקד בהפצה מודעת-תוקף: כיצד לחלק ולהזיז מלאי-קיים בעל תוקפים שונים ברשת כך שכל יעד יקבל מלאי עם מספיק תוקף-שיורי, וימנע פג-תוקף בהפצה.",
          beginnerHe:
            "יש לנו מלאי במחסנים שונים עם תאריכי-תפוגה שונים. ה-distribution heuristic מחליט מה לשלוח לאן — קודם מה שפג מוקדם (FEFO), ולמקום שיצרוך אותו בזמן — כדי שכלום לא יתקלקל.",
          consultantHe:
            "ה-distribution heuristic מבצע allocation של supply-קיים ברחבי-הרשת לפי תוקף: מקצה batches/aggregated shelf-life buckets ל-locations לפי FEFO ו-required remaining shelf life ביעד, בהתחשב ב-transport lead time (שצורך תוקף). המטרה: מינימום פג-תוקף ועמידה בדרישות-תוקף-לקוח. בניגוד ל-infinite (שמייצר receipts חדשים), כאן הדגש על חלוקת-קיים. דורש shelf-life ו-distribution master data.",
          purposeHe:
            "למקסם ניצול-מלאי-תקף בהפצה ולמזער write-offs, תוך עמידה בדרישות-תוקף בכל יעד.",
          processExampleHe:
            "שני DCs צריכים מלאי; מלאי-מקור עם 40 ו-70 ימי-תוקף ➔ ה-heuristic שולח את ה-40-ימים ליעד הקרוב (lead קצר, צריכה מהירה) ואת ה-70 לרחוק.",
          scenarioHe:
            "בארגון distribution heuristic מחלק מלאי-משקאות בין DCs לפי תוקף: אצוות קרובות-לתפוגה ל-DCs בעלי-מחזור-מהיר, רחוקות-תפוגה ל-DCs מרוחקים — מזעור השמדה.",
          navHe: [
            "SAP IBP ► Operators ► Shelf-Life Distribution Heuristic",
          ],
          tables: ["Shelf Life", "Transport Receipt", "Distribution", "Operator Profile"],
          tcodes: ["Define Operator", "Run S&OP Operator"],
          fiori: ["Operators", "Planning View"],
          configHe: [
            "Heuristic type = shelf-life distribution.",
            "Allocation לפי FEFO + required remaining shelf life + transport lead time.",
            "דגש על חלוקת-מלאי-קיים, לא יצירת-receipts.",
          ],
          mistakesHe: [
            "התעלמות מ-transport lead time ➔ מלאי מגיע פג.",
            "ערבוב עם infinite variant ➔ לוגיקה שונה.",
            "required remaining לא מוגדר ביעד.",
          ],
          troubleshootHe: [
            "מלאי מגיע ליעד פג-תוקף ➔ lead time צורך יותר תוקף מהזמין.",
            "write-offs גבוהים ➔ allocation לא-FEFO.",
          ],
          bestPracticeHe: [
            "החל FEFO והתחשב ב-lead-time-תוקף.",
            "הגדר required remaining shelf life לכל יעד.",
            "השתמש לחלוקת-מלאי-קיים מודעת-תוקף.",
          ],
          interviewHe: [
            { qHe: "במה shelf-life distribution שונה מ-infinite?", aHe: "Infinite מייצר receipts חדשים תחת אילוצי-תוקף; distribution מתמקד בהקצאת מלאי-קיים ברשת לפי FEFO ו-required remaining shelf life, בהתחשב ב-transport lead time הצורך תוקף." },
          ],
          takeawaysHe: [
            "Distribution = חלוקת-מלאי-קיים מודעת-תוקף.",
            "FEFO + required remaining + lead time.",
            "ממזער write-offs בהפצה.",
          ],
        },
      ],
    },
    // ============================================================ 4.10
    {
      id: "4.10",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה הציג את תכנון-האספקה הלא-מוגבל ב-SAP IBP באמצעות ה-S&OP heuristic: מנוע דטרמיניסטי, שקוף, single-pass שמתפשט מהביקוש המוסכם top-down ברשת-האספקה ומחשב היצע נדרש בכל צומת בלי מגבלות-קיבולת. ראינו את רשת-האספקה, forecast consumption, התפשטות ביקוש והיצע, RCCP, פרמטרי-ה-heuristic ותכנון חיי-מדף.",
      beginnerHe:
        "סיכמנו את כל מסע-הביקוש-וההיצע: מהביקוש המוסכם, דרך המפה (רשת-האספקה), הימנעות מספירה-כפולה (consumption), פיזור הביקוש אחורה, חישוב מה לייצר/להעביר/לרכוש, בדיקת-עומס (RCCP), כפתורי-ההגדרה, ושמירה-על-תוקף. עכשיו אתה מבין איך ה-heuristic עובד מקצה-לקצה.",
      consultantHe:
        "לסיכום: ה-S&OP heuristic = demand propagation (consensus→net→customer/location/production sourcing→dependent demand) ואז supply propagation (external/production/transport receipts→projected inventory). הוא לא-מוגבל; RCCP מודד עומס מבלי להגביל; constrained demand ו-min/adjusted key figures מאפשרים השוואה ו-override. פרמטרי-ה-operator (mode, type, level, quota check, carryforward, balanced receipts, lead-time horizon, expected supply, validity) מכווננים התנהגות. shelf-life variants מוסיפים מודעות-תוקף. זהו הבסיס לדיון-הפערים ב-S&OP לפני מעבר ל-optimizer/constrained.",
      purposeHe:
        "לקבע את התמונה-הכוללת: ה-heuristic הלא-מוגבל הוא הצעד הראשון ב-S&OP — 'מה הביקוש דורש' — לפני בחינת-היתכנות ואופטימיזציה.",
      processExampleHe:
        "מקצה-לקצה: consensus demand ➔ consumption ➔ demand propagation ➔ supply propagation ➔ projected inventory ➔ RCCP ➔ זיהוי-פערים ➔ דיון-S&OP ➔ (בהמשך) optimizer/constrained.",
      scenarioHe:
        "בארגון הזרימה החודשית: ביקוש-משקאות מוסכם ➔ heuristic לא-מוגבל ➔ תוכנית-מילוי ודרישות-תרכיז ➔ RCCP על קווים/מחסנים ➔ פערי-קיבולת להנהלה ➔ החלטות (משמרות/sourcing/תעדוף).",
      navHe: [
        "SAP IBP ► Sales and Operations ► S&OP Heuristic (סקירה כוללת)",
        "SAP IBP ► Application Jobs ► Run S&OP Operator",
      ],
      tables: ["Consensus Demand", "Total Demand", "Total Receipts", "Projected Inventory", "Capacity Utilization"],
      tcodes: ["Run S&OP Operator", "Define Operator", "Run Optimizer"],
      fiori: ["Schedule IBP Jobs", "Operators", "Analytics"],
      configHe: [
        "הזרימה: consensus → consumption → demand propagation → supply propagation → projected inventory → RCCP.",
        "פרמטרי-operator מכווננים את ההתנהגות.",
        "Shelf-life variants למוצרי-תוקף.",
      ],
      flow: [
        { he: "Consensus Demand", code: "Input" },
        { he: "Forecast Consumption", code: "Net Demand" },
        { he: "Demand Propagation", code: "Dependent Demand" },
        { he: "Supply Propagation", code: "Receipts" },
        { he: "RCCP", code: "Load vs Capacity" },
        { he: "S&OP Gap Review", code: "Decisions" },
      ],
      masterDataHe: [
        "כל אובייקטי-הרשת, sourcing, lot sizes, resources, shelf-life ו-key figures שנדונו בפרק.",
      ],
      mistakesHe: [
        "ראיית ה-heuristic הלא-מוגבל כתוכנית-סופית-feasible.",
        "דילוג על RCCP ➔ פספוס צווארי-בקבוק.",
        "פרמטרי-operator לא-מכווננים.",
      ],
      troubleshootHe: [
        "תוצאות לא-צפויות ➔ עבור על הזרימה שלב-אחר-שלב (network→consumption→propagation→params).",
        "פערים לא-מוסברים ➔ השווה unconstrained מול constrained.",
      ],
      bestPracticeHe: [
        "הרץ unconstrained heuristic + RCCP כל סבב-S&OP.",
        "השתמש בפלט לדיון-פערים מובנה.",
        "עבור ל-optimizer/constrained לפתרון-היתכנות.",
      ],
      interviewHe: [
        { qHe: "סכם את זרימת-ה-S&OP heuristic מקצה-לקצה.", aHe: "Consensus demand ➔ forecast consumption (net demand) ➔ demand propagation (customer/location/production sourcing → dependent demand) ➔ supply propagation (external/production/transport receipts → projected inventory) ➔ RCCP (עומס מול קיבולת) ➔ דיון-פערים ב-S&OP." },
        { qHe: "מתי עוברים מ-heuristic ל-optimizer?", aHe: "כשרוצים תוכנית feasible המכבדת מגבלות-קיבולת ומבצעת trade-offs/optimization — ה-heuristic נותן את התמונה הלא-מוגבלת 'מה צריך', וה-optimizer את 'מה אפשרי ואופטימלי'." },
      ],
      takeawaysHe: [
        "ה-heuristic = demand propagation + supply propagation, לא-מוגבל.",
        "RCCP מודד עומס; constrained/override מאפשרים השוואה ושליטה.",
        "פרמטרי-operator מכווננים התנהגות; shelf-life variants למוצרי-תוקף.",
        "הבסיס לדיון-פערים ב-S&OP לפני optimizer.",
      ],
      relatedHe: [
        { labelHe: "S&OP · מבט-על (4.1)", href: "/library/sop/chapter-04/#sub-4.1" },
        { labelHe: "S&OP · ה-heuristic (4.2)", href: "/library/sop/chapter-04/#sub-4.2" },
      ],
    },
  ],
};
