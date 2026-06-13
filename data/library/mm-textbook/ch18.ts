// ===== MM Digital Textbook — Chapter 18 (Conclusion / future-state) =====
// Two deep learning nodes, each a complete 18-facet LearningNode of authored
// Hebrew. Conceptual chapter: config facets are light but all 18 present.
// SAP product/object names kept verbatim in English.
import type { TextbookChapter } from "./types";

export const CH18: TextbookChapter = {
  n: 18,
  titleHe: "סיכום ומבט קדימה",
  titleEn: "Conclusion",
  introHe:
    "פרק הסיום אינו עוד פרק-קונפיגורציה אלא יחידת-לימוד שמחברת את כל מה שנלמד למבט-עתיד. שני תת-הפרקים שלו מעמיקים בכיוון שאליו צועד תחום ה-Sourcing & Procurement ב-SAP S/4HANA: כיצד פתרונות-הרכש עצמם משתנים (AI, Joule, autonomous sourcing, SAP Business Network) וכיצד שרשרת-האספקה של הרכש הופכת מחוברת, חזויה ואוטונומית. כל תת-פרק נכתב כיחידה עצמאית בת 18 מקטעים — שלוש רמות הסבר, מטרה עסקית, דוגמת-תהליך, דוגמת CBC, ניווט, אובייקטים, מפת-דרכים (roadmap), טעויות נפוצות, פתרון-תקלות, שיטות-מומלצות, שאלות-ראיון ומסקנות-מפתח — כדי שניתן יהיה להבין לאן הולך הרכש בלי תלות במקור. ההסברים מתאימים גם למתחיל וגם ליועץ, והדוגמאות נטועות בעולם ה-Coca-Cola bottling.",
  subchapters: [
    // ============================================================ 18.1
    {
      id: "18.1",
      titleHe: "מצב-העתיד של פתרונות הרכש (Future State of Procurement Solutions)",
      titleEn: "Future State of Procurement Solutions",
      execHe:
        "פתרונות הרכש של SAP עוברים מ-ERP טרנזקציוני המבוסס על מסכים ופעולות-ידניות לפלטפורמה מונחית-בינה-מלאכותית. שלושה כוחות מניעים את השינוי: SAP Business AI המוטמע בליבת S/4HANA, ה-copilot החדש Joule שמאפשר אינטראקציה בשפה-טבעית, ומגמת ה-autonomous procurement שבה המערכת מבצעת החלטות-רוטינה לבדה ומשאירה לאדם רק את החריגים. עבור הנהלת-הרכש המשמעות היא מעבר מ'אנשים שמקלידים הזמנות' ל'אנשים שמנהלים יוצאי-דופן ואסטרטגיה', עם זמני-מחזור קצרים יותר, פחות שגיאות, ושקיפות בזמן-אמת.",
      beginnerHe:
        "עד היום למדנו לעבוד ב-SAP דרך מסכים: פותחים ME21N, ממלאים שדות, שומרים. במצב-העתיד הרבה מהעבודה הזו נעלמת או הופכת לשיחה. במקום לחפש איפה נמצא הכפתור, אתה פשוט מבקש מ-Joule (ה-copilot של SAP) 'הראה לי את כל ההזמנות הפתוחות שמאחרות' או 'צור בקשת-רכש לפריט הזה', והמערכת עושה זאת. במקביל, פעולות שחוזרות על עצמן — כמו אישור הזמנה קטנה לספק-קבוע — המערכת לומדת לבצע לבד. זה נקרא autonomous procurement: הרכש שפועל מעצמו ברוטינה, ומערב אדם רק כשמשהו חריג.",
      consultantHe:
        "מבחינה ארכיטקטונית, SAP Business AI אינו מוצר נפרד אלא שכבת-יכולות הפרושה על S/4HANA Cloud: תרחישים מובנים (embedded AI) כמו הצעת חשבון-G/L, חיזוי תאריך-אספקה, וזיהוי-כפילויות בחשבוניות. Joule הוא ה-generative-AI copilot המאוחד החוצה את כל המודולים ומבוסס על grounding בנתוני-הלקוח. שכבת ה-autonomous sourcing מתבססת על מנועי-המלצה שמדרגים ספקים, מנהלים RFQ אוטומטיים ב-SAP Ariba/SAP Business Network, ומפעילים workflows להמרת המלצה לפעולה. היועץ צריך להבין שזו אינה החלפת ה-Customizing אלא הרחבתו: עדיין מגדירים Document Types, Release Strategies ו-Output, אך מעליהם יושבת שכבת-AI שצורכת אותם נתונים. ב-S/4HANA הבסיס לכל זה הוא מודל-הנתונים הנקי (Business Partner, אב-חומר מאוחד, MATDOC) — בלי בסיס-נתונים נקי, ה-AI לומד זבל ומחזיר זבל.",
      purposeHe:
        "המטרה העסקית: לצמצם את עלות-העִסקה (cost per transaction) ברכש, לקצר זמני-מחזור מבקשה-לתשלום, ולשחרר את אנשי-הרכש מעבודה-טרנזקציונית כדי שיתמקדו במשא-ומתן, באסטרטגיית-קטגוריה ובניהול-סיכוני-ספקים. שקיפות בזמן-אמת מאפשרת קבלת-החלטות מהירה, וה-AI מקטין שגיאות-הקלדה ואי-ציות (maverick buying).",
      processExampleHe:
        "תהליך עתידי מקצה-לקצה: עובד מבקש פריט בשפה-טבעית מול Joule. המערכת מזהה ספק-מועדף בחוזה קיים (Outline Agreement), בודקת מלאי ותקציב, ומציעה בקשת-רכש מוכנה. ל-PO בערך נמוך מספק-מאושר — autonomous procurement מאשר וממיר אוטומטית ל-Purchase Order, שמשודר דרך SAP Business Network לספק. הספק מאשר, מספק, וה-Invoice מגיע אלקטרונית; embedded AI מבצע התאמת-שלוש-דרכים (3-way match) ומדגיש רק חריגים. האדם נכנס לתמונה רק כשיש סטייה — מחיר חריג, ספק חדש, או חוסר-תקציב.",
      cbcHe:
        "ב-CBC (Coca-Cola bottling): קניין-האריזה מבקש מ-Joule 'כמה פקקים נזמין החודש לפי תחזית-המכירות?'. SAP Business AI מצליב תחזית-ביקוש עם מלאי וזמני-אספקה ומציע כמות. הזמנות-רוטינה לתרכיז מספק-מאושר בחוזה-מסגרת מאושרות אוטומטית דרך autonomous procurement ומשודרות בערוץ SAP Business Network; הקניין מתערב רק בקפיצת-מחיר-סוכר עונתית או בכניסת ספק-אריזה חדש שדורש אישור-איכות.",
      navHe: [
        "SAP S/4HANA Cloud ► Sourcing and Procurement ► (embedded AI scenarios מופעלים ב-) Manage Your Solution ► Configure Your Solution",
        "Joule ► זמין כ-copilot רוחבי ב-SAP Fiori launchpad (אין SPRO-node — מופעל ברמת-tenant/BTP)",
        "SAP Business AI ► מנוהל דרך SAP AI Core / Generative AI Hub ב-SAP BTP",
      ],
      tables: ["EKKO", "EKPO", "EBAN", "EKAB", "MATDOC", "BUT000"],
      tcodes: ["ME21N", "ME23N", "ME57", "ME2M", "MIRO", "BBP_PD"],
      fiori: ["F0842A", "F1048", "F2228", "F1990"],
      configHe: [
        "הפעלת תרחישי embedded AI (למשל הצעת חשבון, חיזוי-אספקה) דרך SAP S/4HANA Cloud — Self-Service Configuration / scope-items רלוונטיים.",
        "Joule מופעל ברמת-tenant ב-SAP BTP ודורש grounding בנתוני-הלקוח — אין Customizing-node קלאסי, אלא הקצאת-הרשאות ו-business-context.",
        "autonomous sourcing נשען על תשתית קיימת: Document Types, Release Strategies (Release Codes/Groups) ו-Output Management — ה-AI מפעיל אותם, לא מחליף.",
        "חיבור SAP Business Network דורש onboarding של ספקים והגדרת ערוצי-תקשורת (cXML/EDI) — שכבת-האינטגרציה שעליה ה-AI פועל.",
      ],
      flow: [
        { he: "בסיס-נתונים נקי ב-S/4HANA", code: "BUT000/MATDOC", note: "תנאי-סף ל-AI" },
        { he: "embedded AI בתרחישים", code: "SAP Business AI", note: "הצעות/חיזוי/זיהוי-כפילות" },
        { he: "אינטראקציה בשפה-טבעית", code: "Joule", note: "copilot רוחבי" },
        { he: "מנועי-המלצה לספק/מחיר", code: "autonomous sourcing" },
        { he: "אישור-רוטינה אוטומטי", code: "autonomous procurement" },
        { he: "שידור לספק ברשת", code: "SAP Business Network" },
        { he: "אדם מנהל רק חריגים", note: "exception-based working" },
      ],
      masterDataHe: [
        "Business Partner (BUT000) נקי ומאוחד הוא הדלק של ה-AI — ספק כפול = המלצה שגויה.",
        "אב-החומר עם נתוני-רכש מלאים (Info Record, מקור-אספקה) מאפשר ל-autonomous sourcing לבחור מקור.",
        "Outline Agreements (EKAB) וחוזי-מסגרת הם הבסיס שעליו autonomous procurement מאשר רוטינה.",
        "היסטוריית-מסמכים (EKKO/EKPO) משמשת לאימון מנועי-החיזוי — איכות-העבר קובעת איכות-החיזוי.",
      ],
      mistakesHe: [
        "ציפייה ש-AI 'יתקן' נתוני-אב מלוכלכים — להפך, הוא מגביר את הבעיה (garbage in, garbage out).",
        "הפעלת autonomous procurement ללא Release Strategy וגבולות-ערך ברורים — אישורים אוטומטיים מסוכנים.",
        "תפיסת Joule כ'מנוע-חיפוש' בלבד במקום כ-copilot שמבצע פעולות עם grounding.",
        "דילוג על onboarding ל-SAP Business Network — אז ה-AI 'ממליץ' אך אין ערוץ לבצע.",
      ],
      troubleshootHe: [
        "המלצות-ספק שגויות ➔ בדוק כפילויות Business Partner וחוסר Info Records.",
        "Joule לא מבצע פעולה ➔ הרשאות חסרות או grounding/business-context לא הוגדר ב-tenant.",
        "אישור-אוטומטי לא קורה ➔ Release Strategy או גבולות-ערך ל-autonomous procurement לא הופעלו.",
        "חיזוי-אספקה לא-מדויק ➔ היסטוריית-מסמכים דלה/מלוכלכת לאימון המודל.",
      ],
      bestPracticeHe: [
        "נקה והאחד נתוני-אב (Business Partner, אב-חומר) לפני הפעלת AI — זה הצעד הראשון, לא האחרון.",
        "הפעל autonomous procurement בהדרגה: התחל מקטגוריות בערך-נמוך וסיכון-נמוך עם ספקים-מאושרים.",
        "הגדר גבולות-ערך ומדיניות-חריגים ברורים — האדם תמיד שולט בחריג.",
        "מדוד KPIs לפני-ואחרי (cost per PO, cycle time, touchless rate) כדי להוכיח ערך.",
      ],
      interviewHe: [
        { qHe: "מהו Joule וכיצד הוא שונה מחיפוש רגיל ב-Fiori?", aHe: "Joule הוא ה-generative-AI copilot הרוחבי של SAP, מבוסס grounding בנתוני-הלקוח. בניגוד לחיפוש, הוא מבין כוונה בשפה-טבעית, מצליב הקשר עסקי, ומבצע פעולות (כמו יצירת בקשת-רכש), לא רק מציג קישורים." },
        { qHe: "מה ההבדל בין SAP Business AI ל-autonomous procurement?", aHe: "SAP Business AI היא שכבת-היכולות הרחבה (embedded AI: הצעות, חיזוי, זיהוי-כפילות). autonomous procurement הוא יישום ספציפי שבו המערכת מבצעת החלטות-רוטינה לבדה (אישור/המרה) ומשאירה לאדם רק חריגים." },
        { qHe: "למה נתוני-אב נקיים הם תנאי-סף ל-AI ברכש?", aHe: "מנועי-ההמלצה והחיזוי לומדים מהנתונים. ספק כפול, אב-חומר חסר או היסטוריה מלוכלכת מובילים להמלצות שגויות — garbage in, garbage out." },
      ],
      takeawaysHe: [
        "הרכש עובר מ-ERP טרנזקציוני לפלטפורמה מונחית-AI: SAP Business AI, Joule, autonomous procurement.",
        "Joule = copilot בשפה-טבעית שמבצע פעולות; autonomous procurement = ביצוע-רוטינה עצמאי עם ניהול-חריגים בידי אדם.",
        "ה-AI אינו מחליף את ה-Customizing אלא יושב מעליו וצורך את אותם נתונים.",
        "בסיס-נתונים נקי (Business Partner, אב-חומר, היסטוריה) הוא התנאי הקריטי להצלחה.",
      ],
      relatedHe: [
        { labelHe: "MM · בקשת-רכש והזמנת-רכש (13.x)", href: "/library/mm/chapter-13/#sub-13.2" },
        { labelHe: "MM · מצב-העתיד של שרשרת-האספקה (18.2)", href: "/library/mm/chapter-18/#sub-18.2" },
        { labelHe: "אובייקט · Business Partner", href: "/library/mm/object/BP/" },
      ],
    },
    // ============================================================ 18.2
    {
      id: "18.2",
      titleHe: "מצב-העתיד של שרשרת-אספקת-הרכש (Future State of the Procurement Supply Chain)",
      titleEn: "Future State of the Procurement Supply Chain",
      execHe:
        "שרשרת-אספקת-הרכש העתידית היא רשת מחוברת ולא שרשרת-ליניארית. במקום קשרים דו-צדדיים מבודדים בין קונה לספק, ה-SAP Business Network מחבר את כל המשתתפים לרשת-עסקית אחת שבה הזמנות, אישורים, חשבוניות ותחזיות זורמים בזמן-אמת. מעל הרשת יושבות יכולות חיזוי ואוטונומיה: זיהוי-הפרעות מוקדם, איזון-אוטומטי בין מקורות-אספקה, ושקיפות מקצה-לקצה. עבור ההנהלה זו עמידוּת (resilience): היכולת לראות סיכון לפני שהוא הופך למחסור, ולפעול אוטומטית כדי למתן אותו.",
      beginnerHe:
        "עד היום שרשרת-האספקה הייתה כמו שרשרת חוליות: הקונה שולח הזמנה לספק, הספק שולח חזרה אישור, וכל חוליה רואה רק את השכן שלה. בעתיד זה הופך לרשת — כמו רשת-חברתית של עסקים. כולם מחוברים ל-SAP Business Network ורואים את אותו מידע בזמן-אמת: הספק רואה את התחזית שלך, אתה רואה את המלאי שלו, וכשמשהו משתבש (משלוח מתעכב, חומר חסר) כולם יודעים מיד. המערכת אפילו יכולה להציע פתרון לבד — למשל להעביר הזמנה לספק חלופי — לפני שאתה בכלל שם לב לבעיה.",
      consultantHe:
        "מבחינה ארכיטקטונית, ה-SAP Business Network (האיחוד של Ariba Network, Logistics Business Network ו-Asset Intelligence Network) הוא שכבת-collaboration רב-ארגונית מעל S/4HANA. תהליכי-הליבה — Procure-to-Pay, source-to-contract, supply-chain-collaboration — רצים כ-documents מתואמים (cXML/EDI) בין tenants. מעל הרשת, autonomous-capabilities ו-predictive analytics צורכים את ה-network-signals: מנוע מזהה סטייה ב-confirmation, מצליב עם מלאי וביקוש, ומפעיל workflow לאיזון-מקורות. היועץ צריך לחבר זאת לקרקע ה-MM: Source List, Quota Arrangement ו-Outline Agreements הם הכלים הקלאסיים שמנוע-האיזון מפעיל; PO confirmations, ASN (Advanced Shipping Notification) ו-EM (Event Management) הם האותות. בלי משמעת ב-MM (Source List מתוחזק, confirmations מחויבים), ה'רשת החכמה' עיוורת.",
      purposeHe:
        "המטרה: עמידוּת ושקיפות. במקום לגלות מחסור כשהקו עוצר, המערכת מזהה את הסיכון מבעוד-מועד ומאזנת מקורות אוטומטית. שיתוף-תחזיות עם ספקים מקטין מלאי-חיץ מצד-אחד ומחסור מצד-שני, ושקיפות-רשת מקצרת את זמן-התגובה להפרעות.",
      processExampleHe:
        "תהליך עתידי: הקונה משתף תחזית-ביקוש דרך SAP Business Network. הספק מאשר חלקית ומסמן עיכוב על קו-ייצור מסוים. ה-predictive layer מזהה שהעיכוב יגרום למחסור בעוד שבועיים, מצליב עם Quota Arrangement, וממליץ להסיט 30% מההזמנה לספק-חלופי ב-Source List. autonomous-capability יוצר PO חלופי, משדר אותו ברשת, ומעדכן את התכנון — הכל לפני שהמתכנן הגיע למשרד. כשהסחורה יוצאת, ה-ASN מעדכן את ה-Inbound Delivery ו-Event Management עוקב אחר המשלוח עד הקבלה.",
      cbcHe:
        "ב-CBC: ספק-הסוכר משתף דרך SAP Business Network שצפוי עיכוב-קציר עונתי. ה-predictive layer מזהה סיכון-מחסור לקווי-המילוי, ומפעיל Quota Arrangement להסטת חלק מהאספקה לספק-סוכר משני. במקביל, ספק-הפקקים מקבל את תחזית-המכירות של CBC בזמן-אמת ומתאם ייצור — מה שמקטין הן מלאי-פקקים עודף והן סיכון לעצירת-קו לפני פסח/קיץ.",
      navHe: [
        "SAP S/4HANA ► Materials Management ► Purchasing ► Source List ► Define Source List Requirement at Plant Level (OME5 / ME01)",
        "SAP S/4HANA ► Materials Management ► Purchasing ► Quota Arrangement ► Maintain Quota Arrangement (MEQ1)",
        "SAP Business Network ► supplier onboarding + collaboration (ASN, confirmations) — מנוהל ברמת-network, לא SPRO",
      ],
      tables: ["EORD", "EQUK", "EQUP", "EKES", "EKET", "LIKP"],
      tcodes: ["ME01", "MEQ1", "ME2M", "ME38", "VL31N", "ME2A"],
      fiori: ["F2227", "F1990", "F0842A", "F2358"],
      configHe: [
        "Source List (ME01/OME5) — בסיס לבחירת-מקור אוטומטית; מנוע-האיזון בוחר רק מבין מקורות-מאושרים.",
        "Quota Arrangement (MEQ1) — מגדיר חלוקת-אספקה בין מקורות; הכלי שבו autonomous-balancing מסיט נפח.",
        "PO Confirmations (Confirmation Control Keys) ו-ASN — האותות שהרשת מספקת ל-predictive layer.",
        "SAP Business Network — onboarding ספקים והגדרת ערוצי-collaboration; אין Customizing-node קלאסי, אלא תצורת-רשת.",
      ],
      flow: [
        { he: "מ-שרשרת-ליניארית ל-רשת", code: "SAP Business Network", note: "כל המשתתפים מחוברים" },
        { he: "שיתוף-תחזית עם ספק", note: "supply-chain collaboration" },
        { he: "אותות בזמן-אמת", code: "Confirmations/ASN", note: "EKES/EKET" },
        { he: "זיהוי-הפרעה חזוי", note: "predictive analytics" },
        { he: "המלצת-איזון מקורות", code: "Quota Arrangement", note: "EQUK/EQUP" },
        { he: "ביצוע אוטונומי + שידור", code: "autonomous-capability" },
        { he: "שקיפות מקצה-לקצה", note: "resilience" },
      ],
      masterDataHe: [
        "Source List (EORD) — רשימת מקורות-מאושרים; ללא תחזוקה, מנוע-האיזון אין לו מבין מה לבחור.",
        "Quota Arrangement (EQUK/EQUP) — מפתח-החלוקה בין ספקים; הבסיס להסטת-נפח אוטומטית.",
        "PO Confirmations (EKES) ו-Schedule Lines (EKET) — האותות הזורמים מהרשת אל מנועי-החיזוי.",
        "Outline Agreements — מסגרת-המחיר/כמות שבתוכה הרשת והאוטונומיה פועלות.",
      ],
      mistakesHe: [
        "תפיסת SAP Business Network כ'ערוץ-EDI משופר' בלבד, במקום כפלטפורמת-collaboration רב-כיוונית.",
        "הזנחת Source List/Quota Arrangement — אז אין למנוע-האיזון מקורות חלופיים לבחור מהם.",
        "אי-חיוב PO confirmations — הרשת 'עיוורת' כי חסרים אותות בזמן-אמת.",
        "שיתוף-תחזית בלי משמעת-נתונים — תחזית שגויה גורמת לספק לטעות ביחד איתך.",
      ],
      troubleshootHe: [
        "מנוע-איזון לא מציע מקור-חלופי ➔ Source List/Quota Arrangement חסרים או לא-מאושרים.",
        "התראות-הפרעה לא מופיעות ➔ Confirmation Control Keys / ASN לא מוגדרים, אין אותות לרשת.",
        "ספק לא רואה תחזית ➔ onboarding ל-SAP Business Network או הרשאות-collaboration חסרים.",
        "PO חלופי לא נוצר אוטומטית ➔ workflow אוטונומי לא מופעל או חורג מגבולות-מדיניות.",
      ],
      bestPracticeHe: [
        "תחזק Source List ו-Quota Arrangement כנכס-אסטרטגי — הם המנוף של איזון-המקורות האוטונומי.",
        "חייב PO confirmations ו-ASN כדי לתת לרשת אותות אמינים בזמן-אמת.",
        "התחל collaboration עם הספקים הקריטיים (single-source) שבהם הפרעה כואבת ביותר.",
        "שלב מדדי-resilience (lead-time variance, supply-risk score) ב-dashboards הניהוליים.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין שרשרת-אספקה ליניארית לרשת-אספקה?", aHe: "בשרשרת-ליניארית כל חוליה רואה רק את שכנותיה ומידע זורם דו-צדדית באיטיות. ברשת (SAP Business Network) כל המשתתפים מחוברים ורואים מידע משותף בזמן-אמת — תחזיות, מלאי, אישורים — מה שמאפשר תגובה מהירה והסטת-מקורות חכמה." },
        { qHe: "אילו כלי-MM קלאסיים מאפשרים איזון-מקורות אוטונומי?", aHe: "Source List (מקורות-מאושרים), Quota Arrangement (מפתח-חלוקה) ו-Outline Agreements (מסגרת). מנוע-האיזון בוחר רק מבין מקורות שתוחזקו בכלים אלו — בלעדיהם הוא עיוור." },
        { qHe: "מהם ה'אותות' שמזינים את שכבת-החיזוי בשרשרת העתידית?", aHe: "PO Confirmations (EKES), Schedule Lines (EKET), ASN ואירועי Event Management. הם זורמים מ-SAP Business Network ומאפשרים זיהוי-הפרעה לפני שהיא הופכת למחסור." },
      ],
      takeawaysHe: [
        "העתיד הוא רשת-אספקה מחוברת (SAP Business Network), לא שרשרת-חוליות ליניארית.",
        "שיתוף-תחזיות ושקיפות-רשת בזמן-אמת מקטינים גם מלאי-עודף וגם סיכון-מחסור.",
        "predictive + autonomous capabilities מזהים הפרעה ומאזנים מקורות לפני שמתרחש מחסור.",
        "כלי-ה-MM הקלאסיים (Source List, Quota Arrangement, Confirmations) הם הקרקע שעליה הרשת החכמה פועלת.",
      ],
      relatedHe: [
        { labelHe: "MM · מצב-העתיד של פתרונות-הרכש (18.1)", href: "/library/mm/chapter-18/#sub-18.1" },
        { labelHe: "MM · קביעת-מקור ו-Source List (13.x)", href: "/library/mm/chapter-13/#sub-13.3" },
        { labelHe: "אובייקט · EORD", href: "/library/mm/object/EORD/" },
      ],
    },
  ],
};
