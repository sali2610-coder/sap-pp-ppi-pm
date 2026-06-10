// ===== PM Digital Textbook — Chapter 1 (Academy Template, gold-standard depth) =====
// Every node (parent + nested sub-heading) is a complete LearningNode with 18
// facets of authored Hebrew. Source hierarchy preserved (pm-toc.json key "1");
// x.y.z nested under x.y. Transformative Hebrew (no source prose); SAP
// identifiers verbatim EN. CBC = Coca-Cola bottling Israel plant maintenance.
import type { TextbookChapter } from "./types";

export const CH1: TextbookChapter = {
  n: 1,
  titleHe: "פרויקטי SAP בתחזוקת מפעל",
  titleEn: "SAP Projects in Plant Maintenance",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה על אופן הובלת פרויקט מימוש Plant Maintenance (תחזוקת-מפעל) ב-SAP S/4HANA Asset Management. כל תת-פרק וכל תת-סעיף מהספר המקורי הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, נתוני-אב, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. בשונה מפרקי-הקונפיגורציה הבאים, פרק זה עוסק בשיטת-העבודה (מתודולוגיה, סיכונים, הצלחה, וטיפים) — היסוד שעליו נשען כל מימוש מוצלח. המטרה: ללמוד את הנושא ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 1.1
    {
      id: "1.1", titleHe: "תהליך אפשרי לפרויקט תחזוקת-מפעל עם SAP", titleEn: "A Possible Process for Your Plant Maintenance Project with SAP",
      execHe:
        "פרויקט PM אינו רק קונפיגורציה — הוא מהלך מובנה הנשען על שני עמודי-תווך: אסטרטגיית-מימוש (Implementation Strategy) הקובעת מה ואיפה מממשים, ומתודולוגיה (SAP Activate) הקובעת איך מתקדמים. הבחנה זו היא ההבדל בין פרויקט מבוקר לבין פרויקט שמתפזר. החלטה נכונה כאן קובעת לוחות-זמנים, תקציב והצלחת ה-Go-Live.",
      beginnerHe:
        "דמיין בנייה של בית: קודם מחליטים אילו חדרים בונים ובאיזה סדר (אסטרטגיה), ורק אחר-כך פועלים לפי תוכנית-עבודה שלב-אחר-שלב (מתודולוגיה). ב-PM 'החדרים' הם מבנה-הנכסים, פקודות-עבודה ואחזקה מונעת; 'התוכנית' היא SAP Activate. שני הדברים נפרדים אך משלימים.",
      consultantHe:
        "כיועץ הפרד תמיד בין What/Where (Strategy) לבין How (Methodology). אסטרטגיה גרועה גורמת ל-Scope לא-מנוהל; מתודולוגיה גרועה גורמת לכאוס-ביצוע. ב-S/4HANA Asset Management מומלץ Greenfield/Brownfield decision מוקדם, ולתעד אותו ב-Business Case ובמסמך-ה-Scope. רוב כשלי-PM אינם טכניים אלא נובעים מערבוב שתי הרמות — צוות שמתחיל ב-Customizing לפני שהוגדרו שלבי-המימוש.",
      purposeHe:
        "המטרה: לייצר תוכנית-מימוש הקובעת אילו פונקציות מיושמות, באיזה מפעל, ובאיזו נקודת-זמן — כך שהפרויקט מתקדם בשלבים נשלטים במקום 'הכול בבת-אחת'. זה מקטין סיכון, מפזר עומס ומאפשר הפקת-לקחים בין שלבים.",
      processExampleHe:
        "ארגון תעשייתי מחליט: שלב-פונקציונלי 1 = מבנה-נכסים טכני (Functional Locations + Equipment); שלב 2 = עיבוד פקודות-עבודה; שלב 3 = אחזקה מונעת (Maintenance Plans). מרחבית: פיילוט → מפעל בודד → Rollout. אסטרטגיה משולבת: מימוש מלא במפעל-חלוץ אחד, ואז פריסת עיבוד-הפקודות לכל המפעלים.",
      cbcHe:
        "ב-CBC ישראל הפרויקט נפרס בשלבים: תחילה ממפים את קווי-המילוי וה-Functional Locations של מפעל אחד (פיילוט), מקימים Equipment למילרים/מכסים/מסועים, ורק לאחר ייצוב מרחיבים לאחזקה מונעת ול-Rollout לשאר אתרי-הבקבוק. כך מתקלות-קו לא 'מציפות' פרויקט שעוד לא התייצב.",
      navHe: [
        "SAP Activate Roadmap Viewer (https://go.support.sap.com/roadmapviewer/) — בחירת Roadmap למימוש S/4HANA",
        "SAP Road Map Explorer (https://roadmaps.sap.com/) — חזון מוצר S/4HANA Asset Management",
      ],
      tables: ["IFLOT", "EQUI", "AUFK"],
      tcodes: ["IL01", "IE01", "IW31"],
      fiori: ["F2929", "F4072"],
      configHe: [
        "החלטת-אסטרטגיה: שלבים פונקציונליים (מבנה→פקודות→מונעת→הרחבות) מול שלבים מרחביים (פיילוט→מפעל→Rollout).",
        "בחירת אסטרטגיה: אופקית (כל המפעלים בו-זמנית), אנכית (מפעל-מפעל), או משולבת.",
        "תיעוד ה-Scope וה-Phases במסמך-פרויקט מאושר לפני כל Customizing.",
      ],
      flow: [
        { he: "החלטת Greenfield/Brownfield", note: "מימוש חדש מול המרה" },
        { he: "הגדרת שלבים פונקציונליים", note: "מבנה→פקודות→מונעת" },
        { he: "הגדרת שלבים מרחביים", note: "פיילוט→מפעל→Rollout" },
        { he: "בחירת אסטרטגיה", note: "אופקית/אנכית/משולבת" },
        { he: "בחירת מתודולוגיה", code: "SAP Activate" },
      ],
      masterDataHe: [
        "מבנה-נכסים = הבסיס: Functional Location (IFLOT) + Equipment (EQUI) — נבנים בשלב הפונקציונלי הראשון.",
        "אם קיים מבנה-נכסים במערכת-מורשת, ניתן לדלג על השלב הראשון ולהעבירו ב-LSMW/IBIP.",
      ],
      mistakesHe: [
        "ערבוב What/Where עם How — קפיצה ל-Customizing לפני שהוגדרו שלבי-המימוש.",
        "ניסיון לממש את כל הפונקציות בכל המפעלים בבת-אחת — Scope בלתי-נשלט.",
        "התעלמות מהבחנת פיילוט/Rollout — טעויות-קונפיגורציה מתפשטות לכל המפעלים.",
      ],
      troubleshootHe: [
        "פרויקט 'תקוע' ללא קצה ➔ לרוב Scope לא-מוגדר; חזור והגדר שלבים פונקציונליים ומרחביים.",
        "התנגדות-מפעלים ל-Rollout ➔ העדף אסטרטגיה אנכית עם פיילוט-הוכחה לפני הרחבה.",
        "עומס בלתי-נשלט בקו-מילוי בזמן מימוש ➔ דחה את שלב האחזקה-המונעת עד ייצוב המבנה.",
      ],
      bestPracticeHe: [
        "הגדר תמיד שלבים — אל תממש 'הכול בבת-אחת'; פזר סיכון לאורך-זמן.",
        "בחר מפעל-פיילוט מייצג והוכח ערך לפני Rollout.",
        "תעד את ה-Scope וה-Phases במסמך מאושר; שמור אותו כעוגן מול Scope-Creep.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין Implementation Strategy למתודולוגיה?", aHe: "אסטרטגיה קובעת מה ואיפה מממשים (שלבים פונקציונליים ומרחביים, אופקית/אנכית/משולבת); מתודולוגיה (SAP Activate) קובעת איך מתקדמים שלב-אחר-שלב. שתיהן נפרדות אך משלימות." },
        { qHe: "מהן שלוש אסטרטגיות-המימוש האפשריות?", aHe: "אופקית — עיבוד-פקודות בכל המפעלים בו-זמנית; אנכית — מימוש מלא במפעל אחד ואז Rollout; משולבת — מימוש מלא במפעל-חלוץ ואז פריסת עיבוד-פקודות לכל המפעלים." },
      ],
      takeawaysHe: [
        "פרויקט PM נשען על שני עמודים: אסטרטגיה (מה/איפה) ומתודולוגיה (איך).",
        "שלבים פונקציונליים: מבנה→פקודות→אחזקה מונעת→הרחבות.",
        "שלבים מרחביים: פיילוט→מפעל בודד→Rollout.",
        "הגדר Scope ושלבים לפני שנוגעים ב-Customizing.",
      ],
      relatedHe: [
        { labelHe: "PM · מבנה ארגוני ויחידות-אחזקה (פרק 2)", href: "/library/pm-academy/chapter-02/" },
        { labelHe: "PM · מבנה-נכסים טכני (פרק 4)", href: "/library/pm-academy/chapter-04/" },
      ],
      children: [
        {
          id: "1.1.1", titleHe: "אסטרטגיית מימוש", titleEn: "Implementation Strategy",
          execHe: "אסטרטגיית-המימוש מגדירה את 'מה' ו'איפה' של הפרויקט דרך שני צירים: שלבים פונקציונליים (אילו יכולות-PM) ושלבים מרחביים (באילו מפעלים), ושילובם לאסטרטגיה אופקית/אנכית/משולבת. זו ההחלטה האסטרטגית הראשונה בכל פרויקט PM.",
          beginnerHe: "במקום לממש 'הכול בכל-מקום', מחלקים את הפרויקט: קודם איזו יכולת (מבנה-נכסים? פקודות? אחזקה מונעת?) ואז באיזה מפעל (פיילוט? מפעל אחד? כולם?). השילוב יוצר תוכנית מסודרת ובת-ביצוע.",
          consultantHe: "הציר הפונקציונלי: שלב 1 מבנה-נכסים, שלב 2 פקודות-עבודה, שלב 3 אחזקה מונעת, שלב 4 הרחבות (Refurbishment, Subcontracting, Pool Asset Management, Mobile). הציר המרחבי: פיילוט→מפעל→Rollout. הצלב אותם ל-Roadmap עם תאריכי-יעד לכל מפעל/פונקציה. אם מבני-נכסים קיימים במורשת — דלג על שלב 1 והעבר ב-IBIP/LSMW.",
          purposeHe: "לפזר סיכון ועומס לאורך-זמן ולאפשר הפקת-לקחים בין שלבים, במקום מהפכה חד-פעמית שמסכנת את כל הארגון בבת-אחת.",
          processExampleHe: "תוכנית: רבעון 1 — מבנה-נכסים בפיילוט; רבעון 2 — פקודות-עבודה במפעל-החלוץ; רבעון 3 — אחזקה מונעת; רבעון 4 — Rollout אופקי של עיבוד-הפקודות לשאר המפעלים.",
          cbcHe: "ב-CBC: שלב 1 מקים Functional Locations של מפעל-בקבוק חלוץ; שלב 2 פקודות-תיקון לקווי-המילוי; שלב 3 תוכניות-אחזקה מונעת למילרים; שלב 4 Rollout לאתרים נוספים — כל אתר נכנס רק לאחר התייצבות הקודם.",
          navHe: ["SAP Activate Roadmap Viewer ► בחירת Roadmap לפי היקף-מימוש ושלבים"],
          tables: ["IFLOT", "EQUI"],
          tcodes: ["IL01", "IE01"],
          fiori: ["F2929"],
          configHe: ["מפה את שלבי-המימוש הפונקציונליים והמרחביים ל-Roadmap עם תאריכי-יעד.", "בחר אסטרטגיה (אופקית/אנכית/משולבת) המתאימה למבנה-הארגון וליכולת-הקבלה."],
          mistakesHe: ["דילוג על שלב מבנה-הנכסים כשאין מורשת — אין על מה לבנות פקודות.", "פריסה אופקית מוקדמת מדי בלי פיילוט מוכח."],
          troubleshootHe: ["שלבים חופפים ויוצרים עומס ➔ פצל את ה-Roadmap לתאריכי-יעד נפרדים.", "אין נתוני-מבנה לפקודות ➔ הקדם את שלב מבנה-הנכסים."],
          bestPracticeHe: ["בנה תמיד מבנה-נכסים לפני פקודות ולפני אחזקה מונעת.", "העדף אנכית/משולבת על-פני אופקית גורפת בארגון רב-אתרי."],
          interviewHe: [
            { qHe: "מהם השלבים הפונקציונליים האופייניים?", aHe: "1) מבנה מערכות-טכניות, 2) עיבוד פקודות-עבודה, 3) אחזקה מונעת, 4) הרחבות (כיול, Refurbishment, Subcontracting, Pool Asset Management, Mobile)." },
            { qHe: "מתי ניתן לדלג על שלב מבנה-הנכסים?", aHe: "כאשר ניתן להעביר מבני-נכסים ממערכת-מורשת אלקטרונית באמצעות IBIP/LSMW/Migration Cockpit." },
          ],
          takeawaysHe: ["שני צירים: פונקציונלי (מה) ומרחבי (איפה).", "שלב מבנה-הנכסים הוא היסוד לכל השאר.", "השילוב → אסטרטגיה אופקית/אנכית/משולבת."],
        },
        {
          id: "1.1.2", titleHe: "מתודולוגיית SAP Activate", titleEn: "SAP Activate Methodology",
          execHe: "SAP Activate היא המתודולוגיה הנוכחית של SAP למימוש, שדרוג או מיגרציה ל-S/4HANA — יורשת ASAP, רחבה יותר, וכוללת מפות-דרכים לענן ולמיגרציה. היא מחלקת את הפרויקט לשישה שלבים עם תוצרים, בקרות-איכות (Quality Gates) ו-Accelerators.",
          beginnerHe: "מתודולוגיה היא 'מתכון' לניהול הפרויקט: שישה שלבים ברצף — Discover, Prepare, Explore, Realize, Deploy, Run — שכל אחד מסתיים בתוצרים ובבדיקת-איכות לפני המעבר הלאה.",
          consultantHe: "ששת השלבים: Discover (היכרות + As-Is), Prepare (ארגון, מטרות, תקציב, צוות), Explore (Business Blueprint + Fit-Gap + אב-טיפוס), Realize (Customizing סופי, פיתוחים, בדיקות), Deploy (Cutover + Go-Live), Run (אופטימיזציה מתמשכת). כל מעבר נשמר ב-Quality Gate (QG1–QG5). Accelerators = תבניות ושיטות-עבודה זמינות ב-Roadmap Viewer ו-Solution Manager.",
          purposeHe: "לספק מסגרת-ביצוע מוכחת עם תוצרים, נקודות-בקרה ותבניות — כך שהצוות לא 'ממציא את הגלגל' ולא מדלג על שלבים קריטיים.",
          processExampleHe: "הפרויקט עובר QG1 בסוף Prepare (Scope מאושר), QG2 בסוף Explore (Blueprint + Fit-Gap מאושרים), QG3/QG4 ב-Realize (קונפיגורציה ובדיקות), QG5 ב-Deploy (Go-Live Readiness) — וכל שער חוסם מעבר עד עמידה בקריטריונים.",
          cbcHe: "ב-CBC הפרויקט מנוהל לפי Activate: ב-Explore מגדירים Blueprint לקווי-המילוי ולתוכניות-האחזקה; ב-Realize מבצעים את ה-Customizing ובודקים תרחישי-תקלה אמיתיים; ב-Deploy מבצעים Cutover ועולים לאוויר במפעל-החלוץ.",
          navHe: [
            "SAP Activate Roadmap Viewer ► שישה שלבים + Quality Gates + Accelerators",
            "SAP Road Map Explorer ► חזון מוצר ותכולות עתידיות S/4HANA Asset Management",
          ],
          tables: ["AUFK", "VIQMEL"],
          tcodes: ["IW31", "IW21"],
          fiori: ["F4072"],
          configHe: [
            "Discover: היכרות + As-Is + היתכנות. Prepare: ארגון, מטרות, תקציב, צוות, מפת-תהליכים.",
            "Explore: Business Blueprint + Fit-Gap + אב-טיפוס. Realize: Customizing סופי + פיתוחים + בדיקות.",
            "Deploy: Cutover + Go-Live + תמיכה. Run: אופטימיזציה מתמשכת.",
            "התפלגות מאמץ מקובלת: Discover 5–10%, Prepare 5–10%, Explore 25–40%, Realize 25–40%, Deploy 20–30%, Run מתמשך.",
          ],
          flow: [
            { he: "Discover", note: "As-Is + היכרות" },
            { he: "Prepare", note: "ארגון + תקציב + צוות" },
            { he: "Explore", note: "Blueprint + Fit-Gap" },
            { he: "Realize", note: "Customizing + בדיקות" },
            { he: "Deploy", note: "Cutover + Go-Live" },
            { he: "Run", note: "אופטימיזציה" },
          ],
          mistakesHe: ["דילוג על Explore והתחלת Customizing מוקדם מדי ללא Blueprint.", "התעלמות מ-Quality Gates — מעבר-שלב לפני עמידה בקריטריונים.", "אי-שימוש ב-Accelerators ו'המצאת-הגלגל'."],
          troubleshootHe: ["צוות 'אובד' בשלב לא-נכון ➔ ודא עמידה ב-QG לפני מעבר.", "תוצרים חסרים ➔ עבוד מול רשימת-התוצרים של כל שלב ב-Roadmap Viewer."],
          bestPracticeHe: ["עבוד לפי הרצף ואל תדלג על שלבים.", "נצל Accelerators ותבניות מ-Roadmap Viewer/Solution Manager.", "אכוף Quality Gates כתנאי-מעבר."],
          interviewHe: [
            { qHe: "מהם ששת שלבי SAP Activate?", aHe: "Discover, Prepare, Explore, Realize, Deploy, Run." },
            { qHe: "מהו היורש של ASAP ובמה הוא רחב יותר?", aHe: "SAP Activate — כולל מפות-דרכים לא רק ל-On-Premise אלא גם לענן ולמיגרציה, עם Quality Gates ו-Accelerators." },
            { qHe: "מהם Accelerators?", aHe: "תבניות, צ'ק-ליסטים ושיטות-עבודה מומלצות המקושרות לכל תוצר, זמינות ב-Roadmap Viewer וב-Solution Manager." },
          ],
          takeawaysHe: ["SAP Activate = שישה שלבים יורשי-ASAP.", "Quality Gates חוסמים מעבר ללא עמידה בקריטריונים.", "Accelerators חוסכים 'המצאת-גלגל'.", "מרב-המאמץ ב-Explore+Realize."],
          relatedHe: [{ labelHe: "PM · הקמת Fiori Launchpad (פרק 8)", href: "/library/pm-academy/chapter-08/" }],
        },
      ],
    },
    // ============================================================ 1.2
    {
      id: "1.2", titleHe: "גורמי סיכון והצלחה בפרויקטי SAP: סקר אמפירי", titleEn: "General Risk Factors and Success Factors in SAP Projects: An Empirical Survey",
      execHe:
        "סקר אמפירי (אוניברסיטת וירצבורג-שווינפורט, 148 חברות) זיהה 33 מקורות-סיכון ו-27 גורמי-הצלחה בפרויקטי SAP. הממצאים — שישימים 1:1 ל-S/4HANA — מאפשרים ללמוד מטעויות-אחרים במקום לחזור עליהן. זהו מצפן-ניהול-סיכונים לפרויקט-PM.",
      beginnerHe:
        "במקום לגלות בעצמך אילו דברים משתבשים בפרויקט SAP, חוקרים שאלו 148 חברות מה הצליח ומה נכשל אצלן. התוצאה: רשימה מדורגת של סיכונים שכדאי להימנע מהם וגורמי-הצלחה שכדאי לאמץ.",
      consultantHe:
        "השתמש ב-Risk Radar וב-Success-Ranking ככלי-עבודה: ב-Prepare בנה Risk Register הממפה את 33 הסיכונים לפרויקט שלך, ותכנן צעדי-מיטיגציה. גורם-ההצלחה מס' 1 (תמיכת-הנהלה, 82.2%) אינו 'נחמד-שיהיה' אלא תנאי-סף; ודא Steering Committee פעיל. הסקר נערך על לקוחות SAP ERP אך תקף ל-S/4HANA מאחר שדינמיקת-הפרויקט זהה.",
      purposeHe:
        "להפוך ניהול-סיכונים מאינטואיציה לתהליך מבוסס-נתונים: לזהות מראש את הסיכונים השכיחים, לתעדף את גורמי-ההצלחה הקריטיים, ולכוון אליהם משאבים.",
      processExampleHe:
        "מנהל-פרויקט בונה Risk Register: לכל אחד מ-33 הסיכונים (למשל R01 תיעוד-לקוי, R07 בקשות-שינוי מתמשכות) מוקצים הסתברות, השפעה, צעד-מיטיגציה ואחראי — ונסקר בכל Steering Committee.",
      cbcHe:
        "ב-CBC הסיכון הבולט הוא R20 (עומס-יתר על צוות-האחזקה — טכנאים 'חיים' בכיבוי-שריפות בקו-המילוי ואינם פנויים לפרויקט). המיטיגציה: הקצאת אדם 100% ייעודי + תמיכת-הנהלה לשחרורו ממשימות-יום-יום.",
      navHe: [
        "Roadmap Viewer ► Accelerators ► Risk Register / Risk Assessment templates",
        "Solution Manager ► Project Management ► Risk & Issue tracking",
      ],
      tables: [],
      tcodes: [],
      fiori: [],
      configHe: [
        "בנה Risk Register ל-33 הסיכונים מקובצים: סביבת-פרויקט, מטרות, ניהול, ארגון, צוות, מהלך.",
        "דרג את 27 גורמי-ההצלחה ותכנן פעולות לחמשת-המובילים.",
        "סקור סיכונים והצלחה בכל Quality Gate.",
      ],
      masterDataHe: [
        "אין נתוני-אב ישירים; התוצר הוא Risk Register ו-Success-Plan כמסמכי-פרויקט.",
      ],
      mistakesHe: [
        "התעלמות מהסקר ו'גילוי' הסיכונים בדרך-הקשה במהלך הפרויקט.",
        "התייחסות לתמיכת-הנהלה כפורמליות ולא כתנאי-סף פעיל.",
        "אי-ניהול Risk Register חי — סיכון שזוהה אך לא נוטר.",
      ],
      troubleshootHe: [
        "פרויקט חורג ➔ בדוק מול הסיכונים הבולטים: תיעוד-לקוי, בקשות-שינוי, אי-התאמת-תוכניות.",
        "החלטות נתקעות ➔ לרוב חסר Steering Committee / תמיכת-הנהלה פעילה (גורם-הצלחה 1).",
      ],
      bestPracticeHe: [
        "התחל את הפרויקט בלמידה מסיכוני-אחרים — בנה Risk Register כבר ב-Prepare.",
        "ודא תמיכת-הנהלה בכירה פעילה — גורם-ההצלחה החשוב ביותר.",
        "תעדף את חמשת גורמי-ההצלחה המובילים בהקצאת-משאבים.",
      ],
      interviewHe: [
        { qHe: "מהו גורם-ההצלחה החשוב ביותר בפרויקט SAP לפי הסקר?", aHe: "תמיכת ההנהלה הבכירה (E12) — 82.2% דירגו אותה 'חשוב מאוד'. בלעדיה החלטות נתקעות והפרויקט מאבד תנופה." },
        { qHe: "מדוע ממצאי-הסקר תקפים ל-S/4HANA אף שנערך על SAP ERP?", aHe: "מפני שדינמיקת-הפרויקט וגורמי-ההצלחה/הסיכון (ניהול, צוות, תקשורת, תיעוד) אינם תלויי-גרסה — הם ישימים 1:1." },
      ],
      takeawaysHe: [
        "33 סיכונים ו-27 גורמי-הצלחה — מצפן מבוסס-נתונים.",
        "תמיכת-הנהלה בכירה = גורם-ההצלחה מס' 1.",
        "בנה Risk Register חי כבר ב-Prepare.",
        "למד מטעויות-אחרים במקום לחזור עליהן.",
      ],
      relatedHe: [
        { labelHe: "PM · אפשרויות התאמה למשתמש (פרק 9)", href: "/library/pm-academy/chapter-09/" },
      ],
      children: [
        {
          id: "1.2.1", titleHe: "גורמי סיכון", titleEn: "Risk Factors",
          execHe: "33 מקורות-הסיכון מקובצים לשש קטגוריות: סביבת-הפרויקט, מטרות, ניהול, ארגון, צוות ומהלך. ה-Risk Radar ממחיש את ההסתברות — ככל שהנקודה רחוקה מהמרכז, כן גובר הסיכוי להיתקל בסיכון.",
          beginnerHe: "סיכון = משהו שעלול להשתבש. הסקר אסף 33 כאלה ומיין אותם לשש קבוצות. ה-'מכ\"ם' מראה אילו סיכונים הכי שכיחים, כדי שתשים עליהם עין.",
          consultantHe: "הסיכונים הבולטים: R01 תיעוד-לקוי ו-R07 בקשות-שינוי מתמשכות (סביבה); R14/R15 אי-התאמת-תוכניות לשינויים (ניהול); R20 עומס-צוות ו-R22 ידע-חסר (ארגון/צוות); R28/R30/R31 חוסר-זמן ועיכובים (מהלך). מפה כל סיכון רלוונטי ל-Register עם מיטיגציה.",
          purposeHe: "לזהות מראש את נקודות-הכשל השכיחות ולתכנן מולן צעדי-מנע, במקום להגיב באיחור.",
          processExampleHe: "צוות מזהה את R07 (בקשות-שינוי מתמשכות) כסיכון-מוביל ומגדיר Change-Management Policy עם נוהל-אישור — מיטיגציה ישירה.",
          cbcHe: "ב-CBC R20 (עומס-צוות) הוא הסיכון הראשי: טכנאי-אחזקה עסוקים בכיבוי-תקלות-קו. מיטיגציה: שחרור אדם 100% ייעודי + גיבוי-משמרת.",
          navHe: ["Roadmap Viewer ► Accelerators ► Risk Assessment / Risk Radar template"],
          tables: [],
          tcodes: [],
          fiori: [],
          configHe: ["מיין את הסיכונים לשש קטגוריות ומפה כל אחד ל-Register: הסתברות, השפעה, מיטיגציה, אחראי."],
          mistakesHe: ["התמקדות בסיכונים טכניים בלבד והזנחת סיכוני-ארגון/צוות.", "Risk Register 'מת' שלא מנוטר."],
          troubleshootHe: ["שינויים מתמשכים מערערים את הלו\"ז ➔ R07; הפעל Change-Management Policy.", "צוות לא-פנוי ➔ R20; דרוש שחרור-משאבים מההנהלה."],
          bestPracticeHe: ["נטר את הסיכונים הבולטים בכל ישיבת-היגוי.", "תרגם כל סיכון לצעד-מיטיגציה עם אחראי."],
          interviewHe: [
            { qHe: "לאילו קטגוריות מקובצים הסיכונים?", aHe: "סביבת-פרויקט, מטרות, ניהול-פרויקט, ארגון-פרויקט, צוות-פרויקט, ומהלך-פרויקט." },
            { qHe: "מהו Risk Radar?", aHe: "המחשה גרפית שבה מרחק-הנקודה מהמרכז מייצג את ההסתברות להיתקל בסיכון — ככל שרחוק יותר, סביר יותר." },
          ],
          takeawaysHe: ["33 סיכונים בשש קטגוריות.", "הבולטים: תיעוד-לקוי, בקשות-שינוי, עומס-צוות, חוסר-זמן.", "מפה כל סיכון למיטיגציה."],
        },
        {
          id: "1.2.2", titleHe: "גורמי הצלחה", titleEn: "Success Factors",
          execHe: "27 גורמי-ההצלחה מדורגים לפי חשיבות. חמשת המובילים: תמיכת-הנהלה בכירה (E12, 82.2%), ניהול-פרויקט מיומן (E02), שיתוף-פעולה טוב (E15), נהלים מובנים (E01), וכשירות-טכנית של הצוות (E05).",
          beginnerHe: "הצד החיובי של הסקר: מה גורם לפרויקט להצליח. הגורם מס' 1 בפער גדול הוא תמיכת-ההנהלה — בלעדיה אפילו צוות מצוין מתקשה.",
          consultantHe: "הדירוג חושב במשקלים (חשוב-מאוד=4 … לא-חשוב=1), ולכן אינו תואם בדיוק לאחוז ה'חשוב-מאוד'. מבחינה מעשית: גייס Steering Committee פעיל (E12), מנה PM בעל-סמכות (E02), עבוד מובנה (E01), והדרך את הצוות (E05) לפני שמתחילים בתוכן.",
          purposeHe: "לכוון את משאבי-הפרויקט לגורמים בעלי-ההשפעה-הגדולה-ביותר על ההצלחה, במקום לפזר מאמץ אחיד.",
          processExampleHe: "PM מציג להנהלה את הדירוג, משיג מחויבות-Steering-Committee פעילה (E12), וממנה צוות עם אדם 100% ייעודי וכשירות-טכנית (E05/E25).",
          cbcHe: "ב-CBC E05 (כשירות-טכנית) קריטי: הצוות חייב להכיר את ציוד-קווי-המילוי כדי למפות נכון Functional Locations ו-Equipment; חוסר-ידע מוביל למבנה-נכסים שגוי.",
          navHe: ["Roadmap Viewer ► Accelerators ► Project Charter / Success-Criteria template"],
          tables: [],
          tcodes: [],
          fiori: [],
          configHe: ["דרג את 27 הגורמים לפרויקט שלך והקצה פעולות לחמשת-המובילים; עגן את E12 ב-Steering Committee."],
          mistakesHe: ["הסתפקות ב'אישור-עקרוני' מההנהלה במקום מעורבות-פעילה.", "פיזור-משאבים אחיד במקום מיקוד בגורמים המובילים."],
          troubleshootHe: ["תנופה אובדת ➔ חזק את E12 (מעורבות-הנהלה).", "תוצרים באיכות-נמוכה ➔ בדוק E05 (כשירות-צוות) ו-E01 (נהלים מובנים)."],
          bestPracticeHe: ["עגן תמיכת-הנהלה ב-Steering Committee עם תדרוכים קבועים.", "מנה PM בעל-סמכות-החלטה.", "הדרך את הצוות לפני תחילת-התוכן."],
          interviewHe: [
            { qHe: "מהם חמשת גורמי-ההצלחה המובילים?", aHe: "תמיכת-הנהלה בכירה (E12), ניהול-פרויקט מיומן (E02), שיתוף-פעולה (E15), נהלים מובנים (E01), כשירות-טכנית של הצוות (E05)." },
            { qHe: "מדוע הדירוג אינו תואם בדיוק לאחוז ה'חשוב-מאוד'?", aHe: "כי הדירוג חושב במשקלים (חשוב-מאוד=4, חשוב=3, ניטרלי=2, לא-חשוב=1), המשקללים גם את שאר התשובות." },
          ],
          takeawaysHe: ["27 גורמי-הצלחה מדורגים.", "תמיכת-הנהלה בכירה מובילה בפער.", "מקד משאבים בחמשת-המובילים."],
        },
      ],
    },
    // ============================================================ 1.3
    {
      id: "1.3", titleHe: "טיפים לפרויקט תחזוקת-המפעל שלך", titleEn: "Tips for Your Plant Maintenance Project",
      execHe:
        "אוסף הטיפים המעשיים מסודר לפי רצף-הזמן של SAP Activate — מ-Discover ועד Run — ומשלב את ממצאי-הסקר עם ניסיון-שדה. כל שלב מקבל המלצות קונקרטיות: מה לעשות, מה להימנע, ואילו כלי-SAP לרתום.",
      beginnerHe:
        "אחרי שהבנו את המתודולוגיה ואת הסיכונים, מגיע 'מדריך-המעשה': לכל שלב ב-SAP Activate יש טיפים — איך לבצע As-Is, איך לבנות צוות, איך להעביר נתונים, ומה לבדוק לפני Go-Live.",
      consultantHe:
        "הטיפים הם הצטברות של Lessons-Learned. כיועץ, השתמש בהם כצ'ק-ליסט: As-Is מקיף ב-Discover, Change-Policy וצוות-ייעודי ב-Prepare, Blueprint+אב-טיפוס+Gap-List ב-Explore, בדיקות-רב-שכבתיות ב-Realize, Cutover+הדרכת-קצה ב-Deploy, אופטימיזציה ב-Run. כל סעיף-בן להלן הוא טיפים לשלב מסוים.",
      purposeHe:
        "לתרגם את המתודולוגיה והסקר להמלצות-פעולה קונקרטיות לכל שלב, כך שצוות-הפרויקט יימנע מהמלכודות הנפוצות ויאמץ שיטות-עבודה מוכחות.",
      processExampleHe:
        "צוות עובד עם צ'ק-ליסט הטיפים: ב-Discover עורך As-Is לפי רשימת-שאלות מובנית; ב-Prepare מגדיר Change-Policy; ב-Explore בונה אב-טיפוס; ב-Realize מבצע בדיקות-אינטגרציה; ב-Deploy מריץ Cutover-Plan.",
      cbcHe:
        "ב-CBC הטיפים מתורגמים לקווי-המילוי: As-Is של תהליכי-תקלה קיימים, אב-טיפוס עם Functional Locations מייצגים, ובדיקת-אינטגרציה של זרימת הודעת-תקלה (IW21)→פקודה (IW31)→דיווח (IW41) לפני Go-Live.",
      navHe: [
        "SAP Activate Roadmap ► רצף Discover→Prepare→Explore→Realize→Deploy→Run",
        "Roadmap Viewer ► Accelerators לכל שלב (Checklists, Templates)",
      ],
      tables: ["IFLOT", "EQUI", "AUFK", "VIQMEL"],
      tcodes: ["IW31", "IW21", "IW41", "IBIP", "LSMW"],
      fiori: ["F2929", "F4072"],
      configHe: [
        "עבוד מול צ'ק-ליסט-טיפים לכל שלב; אל תדלג שלבים.",
        "רתום כלי-SAP מתאימים: As-Is question-list (Discover), Change-Policy (Prepare), אב-טיפוס+Gap-List (Explore), בדיקות (Realize), Cutover (Deploy).",
      ],
      masterDataHe: [
        "אב-טיפוס מכיל נתוני-אב מייצגים: Work Centers, מבנה Functional Location, Equipment, Task Lists.",
      ],
      mistakesHe: [
        "התייחסות לטיפים כ'נחמד-לדעת' במקום כצ'ק-ליסט מחייב.",
        "דילוג על As-Is או על אב-טיפוס בלחץ-לוחות-זמנים.",
        "דחיית בדיקות לרגע-האחרון.",
      ],
      troubleshootHe: [
        "Go-Live כושל ➔ לרוב מקורו בדילוג על טיפ-שלב מוקדם (As-Is/אב-טיפוס/בדיקות).",
        "התנגדות-משתמשים ➔ לא יושמו טיפי-שיתוף-המשתמשים מ-Explore.",
      ],
      bestPracticeHe: [
        "הפוך את הטיפים לצ'ק-ליסט-פרויקט מחייב, שלב-אחר-שלב.",
        "ודא תוצר ובקרת-איכות לכל שלב לפני מעבר.",
        "תעד Lessons-Learned תוך-כדי, לא רק ב-Run.",
      ],
      interviewHe: [
        { qHe: "לפי איזה סדר מאורגנים הטיפים?", aHe: "לפי רצף-הזמן של מפת-הדרכים SAP Activate — מ-Discover ועד Run — כך שכל שלב מקבל המלצות-פעולה משלו." },
        { qHe: "מהו ערכם של הטיפים מעבר למתודולוגיה?", aHe: "הם Lessons-Learned מהשטח שמשלימים את המתודולוגיה בהמלצות קונקרטיות — מה לעשות, מה להימנע ואילו כלים לרתום בכל שלב." },
      ],
      takeawaysHe: [
        "הטיפים מסודרים לפי שלבי SAP Activate.",
        "כל שלב = צ'ק-ליסט מעשי משלו.",
        "ערכם: תרגום מתודולוגיה ל-Lessons-Learned ישימים.",
        "אל תדלג שלבים גם בלחץ-זמן.",
      ],
      relatedHe: [
        { labelHe: "PM · מבנה-נכסים טכני (פרק 4)", href: "/library/pm-academy/chapter-04/" },
        { labelHe: "PM · הודעות ופקודות-אחזקה (פרק 5)", href: "/library/pm-academy/chapter-05/" },
      ],
      children: [
        {
          id: "1.3.1", titleHe: "שלב Discover", titleEn: "Discover Phase",
          execHe: "שתי פעילויות-ליבה: היכרות עם S/4HANA Asset Management (ניסיון-ענן, דמו, קורסי-לימוד) וביצוע ניתוח מצב-קיים (As-Is) ובדיקת-היתכנות מקיפה — נקודת-המוצא של כל הפרויקט.",
          beginnerHe: "לפני שנוגעים במערכת, לומדים אותה ('מה זה S/4HANA?') וממפים את המצב-הקיים ('איך אנחנו עובדים היום?'). זה הבסיס לכל החלטה בהמשך.",
          consultantHe: "ה-As-Is אינו פורמליות: עבוד מול רשימת-שאלות מובנית — רקע-מערכת (Release, EhP, פונקציות LOG_EAM, FI/CO/רכש/מלאי פעילים), מבנים-ארגוניים (Controlling Area, Company Code, Plant, Maintenance Plant/Planning Plant), מבנה-נכסים-טכני (סוגי-אובייקטים, BOM לחלפים, Warranties), תהליכי-אחזקה (תקלות, מונעת, כיול), רכש/מחסן ודיווח. שייך כל פונקציה לשלב-הרחבה A/B/C.",
          purposeHe: "להבין במדויק אילו נתוני-אב, תהליכים ודוחות יש למפות, ולבסס תכנון-מועדים, מאמץ, כוח-אדם ועלויות.",
          processExampleHe: "צוות עורך סדנאות-משתמשים, תצפיות וראיונות; ממפה את תהליך-התקלה הקיים; מתעד Quantity-Structure (כמה Equipment, כמה Task Lists); ומשייך פונקציות לשלבי A/B/C.",
          cbcHe: "ב-CBC ה-As-Is ממפה: כמה קווי-מילוי, כמה מילרים/מסועים, איך מדווחות תקלות היום (טלפון/נייר), ואילו דוחות-זמינות נדרשים ל-Go-Live — בסיס למבנה-הנכסים העתידי.",
          navHe: ["SAP Activate ► Discover ► As-Is Analysis + Feasibility Study", "SAP Learning Hub ► S43000/S43100/S43200/S43300/S43400"],
          tables: ["IFLOT", "EQUI", "T370", "T399I"],
          tcodes: ["IH01", "IE03", "IL03"],
          fiori: ["F2929"],
          configHe: ["בדוק פונקציות-עסקיות פעילות (LOG_EAM) ורכיבי-אינטגרציה (FI/CO/MM).", "מפה מבנים-ארגוניים ושיוכיהם (Company Code↔Controlling Area, Plant↔Maintenance Plant).", "שייך פונקציות-PM לשלבי-הרחבה A/B/C."],
          mistakesHe: ["דילוג על As-Is — מימוש 'באוויר' בלי הבנת התהליכים הקיימים.", "אי-תיעוד Quantity-Structure — הערכת-מאמץ שגויה."],
          troubleshootHe: ["הערכות-מאמץ קורסות בהמשך ➔ As-Is חלקי; חזור ומפה Quantity-Structure.", "פונקציות חסרות ב-Blueprint ➔ לא נסקרו ב-As-Is question-list."],
          bestPracticeHe: ["השקע ב-As-Is מלא ונכון — הוא מחזיר את עצמו.", "אסוף מידע ממבצעי-התהליך, SMEs והנהלה.", "שייך פונקציות לשלבי A/B/C כבר כאן."],
          interviewHe: [
            { qHe: "מהן שתי הפעילויות העיקריות ב-Discover?", aHe: "היכרות עם S/4HANA (ניסיון/דמו/קורסים) וניתוח מצב-קיים (As-Is) + בדיקת-היתכנות." },
            { qHe: "מהי מטרת ה-As-Is?", aHe: "למפות נתוני-אב, תהליכים ודוחות קיימים, להגדיר את היקף-הפונקציות ולשייכן לשלבי-הרחבה, ולבסס תכנון-מועדים/מאמץ/עלות." },
          ],
          takeawaysHe: ["Discover = למידה + As-Is.", "As-Is לפי רשימת-שאלות מובנית.", "שייך פונקציות לשלבי A/B/C.", "תעד Quantity-Structure להערכת-מאמץ."],
          relatedHe: [{ labelHe: "PM · מבנה-נכסים טכני (פרק 4)", href: "/library/pm-academy/chapter-04/" }],
        },
        {
          id: "1.3.2", titleHe: "שלב Prepare", titleEn: "Prepare Phase",
          execHe: "כאן מניחים את היסודות: מטרות, לו\"ז ותקציב, Change-Management Policy, הקמת-צוות, תיעוד ('מסמך-המסמכים'), הדרכה, שיווק-פנימי ושיטות-מידול-תהליכים. ככל שטעות מוקדמת יותר — השפעתה גדולה יותר.",
          beginnerHe: "שלב-ההכנה: מגדירים מה רוצים להשיג, מי בצוות, אילו מסמכים יהיו, ואיך מנהלים שינויים. השקעה כאן חוסכת תיקונים יקרים בהמשך.",
          consultantHe: "נקודות-מפתח: (1) Change-Policy — אילו שינויים מותרים ונוהל-אישורם; (2) מטרה כתובה ומפורסמת + הגדרת מה לא-רוצים; (3) צוות לפי 1×100 > 3×50 > 6×30 — לפחות אדם אחד 100% ייעודי, חדר-פרויקט נפרד; (4) 'מסמך-המסמכים' המגדיר כל תוצר (Project Plan, Business Case, As-Is, BPML, Gap-List, WRICEF, Cutover-Plan); (5) שיטות-מידול: VCD/EPC/BPMN/ECD.",
          purposeHe: "לבנות תשתית-פרויקט יציבה — מטרות ברורות, צוות נכון, תיעוד מסודר וניהול-שינויים — לפני שמתחילים בתוכן.",
          processExampleHe: "המנהל מנסח מטרה ('הפחתת זמן-השבתה מ-6.2% ל-2.8%'), מפרסם אותה, מקצה אדם 100% ייעודי, מגדיר Change-Policy, ובונה 'מסמך-מסמכים' עם שמות/אחסון/אחראים.",
          cbcHe: "ב-CBC המטרה: הפחתת Breakdowns בקו-המילוי והגדלת Availability. הצוות כולל טכנאי-אחזקה-בכיר 100% ייעודי + יועץ-PM; התיעוד כולל BPML של תהליך-התקלה ו-WRICEF-List לממשק-Zetes/Daymax.",
          navHe: ["SAP Activate ► Prepare ► Project Charter, Schedule, Budget", "Roadmap Viewer ► Accelerators ► Document templates (BPML, Gap-List, WRICEF)"],
          tables: ["AUFK", "VIQMEL"],
          tcodes: ["IW31", "IW21"],
          fiori: ["F4072"],
          configHe: [
            "Change-Management Policy: אילו שינויים מותרים, סוגיהם, מסמכים נדרשים ונוהל-אישור.",
            "מטרת-מימוש כתובה ומפורסמת + הגדרת 'מה לא-רוצים'.",
            "הקמת-צוות לפי 1×100 > 3×50 > 6×30; אדם 100% ייעודי + חדר-פרויקט.",
            "'מסמך-המסמכים': הגדרת כל תוצר (שם, כלי, אחסון, אחראי).",
            "בחירת שיטת-מידול: VCD (מורכב/כללי), EPC/BPMN (מפורט), ECD (פשוט).",
          ],
          flow: [
            { he: "הגדרת מטרות + פרסום", note: "כתוב ומפורסם" },
            { he: "Change-Management Policy" },
            { he: "הקמת-צוות + חדר-פרויקט", note: "1×100 ייעודי" },
            { he: "'מסמך-המסמכים' + תבניות", note: "BPML/Gap/WRICEF" },
            { he: "הדרכה + שיווק-פנימי", note: "S43000/S43300" },
          ],
          masterDataHe: ["אין נתוני-אב; התוצרים הם מסמכי-פרויקט: Charter, BPML, Gap-List, WRICEF, Cutover-Plan."],
          mistakesHe: ["זלזול בהכנה — 'נתחיל ונסדר תוך-כדי'.", "צוות מפוזר (6×30) במקום אדם ייעודי.", "ללא Change-Policy — Scope-Creep בלתי-נשלט."],
          troubleshootHe: ["שינויים יוצרים כאוס ➔ הפעל Change-Policy עם נוהל-אישור.", "תוצרים אובדים/כפולים ➔ בנה 'מסמך-מסמכים' עם שמות ואחסון.", "צוות לא-זמין ➔ דרוש הקצאת אדם 100% ייעודי."],
          bestPracticeHe: ["הקדש זמן רב להכנה — טעות-מוקדמת עולה ביוקר.", "הקצה לפחות אדם אחד 100% ייעודי וחדר-פרויקט.", "נסח ופרסם מטרה ברורה, כולל מה לא-רוצים."],
          interviewHe: [
            { qHe: "מה משמעות הכלל 1×100 > 3×50 > 6×30?", aHe: "עובד 100% ייעודי לפרויקט פרודוקטיבי יותר מכמה עובדים חלקיים — פחות תקורת-תיאום, ופחות סיכון ש'50% יהפכו ל-0%'." },
            { qHe: "מהו 'מסמך-המסמכים'?", aHe: "מסמך-על המגדיר אילו מסמכים נוצרים, באיזה כלי, בשמות אילו, היכן נשמרים ומי אחראי — מונע אובדן וכפילות-תיעוד." },
            { qHe: "מהן שיטות-מידול-התהליכים המקובלות?", aHe: "VCD לתהליכים מורכבים-כלליים, EPC/BPMN לתהליכים מפורטים, ו-ECD (Transaction/Event Chain) לתהליכים פשוטים." },
          ],
          takeawaysHe: ["טעות מוקדמת = עלות גבוהה; הקדש זמן ל-Prepare.", "אדם 100% ייעודי + חדר-פרויקט.", "Change-Policy + 'מסמך-המסמכים' = שליטה.", "בחר שיטת-מידול מתאימה (VCD/EPC/BPMN/ECD)."],
        },
        {
          id: "1.3.3", titleHe: "שלב Explore", titleEn: "Explore Phase",
          execHe: "בונים Business Blueprint מפורט, אב-טיפוס ו-Gap-List. כאן מבצעים את כל הגדרות-ה-Customizing הקריטיות (לא דוחים ל-Realize), משתפים את המשתמשים, ומעצבים מושג-הרשאות והעברת-נתונים.",
          beginnerHe: "שלב-החקירה: מתכננים לעומק 'איך זה יעבוד', בונים אב-טיפוס לראות-מראש, ומרכזים ב-Gap-List את כל מה שהתקן לא מכסה ודורש פיתוח.",
          consultantHe: "טיפים מרכזיים: (1) שתף משתמשים — Reference Group ומשובים; (2) שמור פשטות — '80% עם 100% קבלה עדיף על 100% עם 20% קבלה'; (3) קטוף Low-Hanging-Fruit מ-As-Is; (4) עצב מושג-הרשאות (PFCG) במקביל; (5) תכנן העברת-נתונים (IBIP/LSMW/Migration-Cockpit); (6) בנה אב-טיפוס עם כל ה-Controlling-Customizing; (7) Gap-List → WRICEF (Customer Exits כמו IWO10004, BAPIs, BAdIs).",
          purposeHe: "להפוך את ה-As-Is לתפיסת-To-Be מפורטת ומאומתת באב-טיפוס, ולזהות מראש את כל הפערים הדורשים פיתוח.",
          processExampleHe: "צוות בונה אב-טיפוס: מבנה Functional Location, Equipment ו-Task Lists מייצגים; מציג ל-Reference Group; מתעד Gap-List (למשל 'אישור-טכני חסום אם נותרו דרישות-רכש פתוחות' → Customer Exit IWO10004).",
          cbcHe: "ב-CBC אב-הטיפוס מדגים את זרימת התקלה בקו-המילוי; Low-Hanging-Fruit = יצירת Maintenance Request ב-Fiori במקום נייר; Gap-List כולל ממשק לדיווח-תקלות מ-Zetes/Daymax (WRICEF-Interface).",
          navHe: ["SAP Activate ► Explore ► Business Blueprint + Fit-Gap + Prototype", "Customizing ► PM ► Prototype configuration (Controlling settings)"],
          tables: ["IFLOT", "EQUI", "MPOS", "MPLA"],
          tcodes: ["IH01", "IE01", "IP01", "PFCG"],
          fiori: ["F2929", "F2178"],
          configHe: [
            "בצע את כל ה-Controlling-Customizing (מבנים-ארגוניים, מבנה-טכני, תהליכים, Fiori, אינטגרציה) — אל תדחה ל-Realize.",
            "מלא נתוני-אב מייצגים: Work Centers, Functional Locations, Equipment, Task Lists.",
            "עצב מושג-הרשאות (אובייקטי-הרשאה, PFCG single/composite roles).",
            "תכנן העברת-נתונים: IBIP (מבנה-קבוע, IBIPEQUI), LSMW (Field-Mapping גמיש), Migration Cockpit (CSV/XML).",
            "בנה Gap-List → WRICEF (Customer Exits/BAPIs/BAdIs).",
          ],
          flow: [
            { he: "Business Blueprint (To-Be)", note: "מבנים+תהליכים" },
            { he: "אב-טיפוס + נתוני-אב מייצגים", code: "IH01/IE01" },
            { he: "שיתוף Reference Group", note: "משוב-משתמשים" },
            { he: "מושג-הרשאות", code: "PFCG" },
            { he: "Gap-List → WRICEF", note: "Exits/BAPIs/BAdIs" },
          ],
          masterDataHe: [
            "אב-טיפוס: Work Centers (IR01), Functional Location structure (IL01), Equipment (IE01), Task Lists (IA05).",
            "תבניות העברת-נתונים: IBIPEQUI לאב-ציוד; מבנה-השדות נצפה ב-SE11.",
          ],
          mistakesHe: ["דחיית Customizing ל-Realize — אב-טיפוס חלקי ולא-משכנע.", "אי-שיתוף משתמשים — דחיית-מערכת ב-Go-Live.", "Over-Engineering על-חשבון קבלת-משתמשים."],
          troubleshootHe: ["משתמשים מתנגדים ➔ לא הוקמה Reference Group / לא נקטפו Low-Hanging-Fruit.", "פערים מתגלים מאוחר ➔ Gap-List לא הושלם ב-Explore.", "מורכבות-יתר ➔ העדף פשטות (80%/100%-קבלה)."],
          bestPracticeHe: ["שמור פשטות — קבלת-משתמש חשובה מכיסוי מלא.", "בנה אב-טיפוס מלא עם Controlling-Customizing.", "קטוף Low-Hanging-Fruit מוקדם לגיוס-תמיכה.", "עצב מושג-הרשאות במקביל לקונספט הטכני."],
          interviewHe: [
            { qHe: "מהו עיקרון ה'80% מול 100%'?", aHe: "עדיף לממש 80% מהמערכת עם 100% קבלת-משתמשים מאשר 100% עם 20% קבלה — כי מערכת לא-מקובלת אינה שימושית." },
            { qHe: "מהם שלושת כלי העברת-הנתונים של SAP?", aHe: "IBIP (Batch-Input ייעודי-PM, מבנה-קבוע כמו IBIPEQUI), LSMW (כללי, Field-Mapping גמיש), ו-Migrate Your Data – Migration Cockpit (Fiori, תבניות CSV/XML)." },
            { qHe: "מהי Gap-List ולמה היא מובילה?", aHe: "רשימת-פערים שהתקן אינו מכסה; היא מובילה ל-WRICEF — Workflows, Reports, Interfaces, Conversions, Enhancements, Forms (Customer Exits/BAPIs/BAdIs)." },
          ],
          takeawaysHe: ["Explore = Blueprint + אב-טיפוס + Gap-List.", "בצע Customizing כבר כאן, לא ב-Realize.", "שתף משתמשים ושמור פשטות.", "Gap-List → WRICEF; תכנן העברת-נתונים (IBIP/LSMW/Migration-Cockpit)."],
          relatedHe: [
            { labelHe: "PM · הקמת Fiori Launchpad (פרק 8)", href: "/library/pm-academy/chapter-08/" },
            { labelHe: "PM · אפשרויות תכנות והרחבה (פרק 9)", href: "/library/pm-academy/chapter-09/" },
          ],
        },
        {
          id: "1.3.4", titleHe: "שלב Realize", titleEn: "Realize Phase",
          execHe: "ממירים את ה-Blueprint למימוש: Customizing סופי (כולל Non-Controlling), טיפול בכל פריטי-ה-Gap-List, הקמת Fiori, פיתוח הרחבות וממשקים, הקמת תפקידים/הרשאות, הזנת נתוני-אב, ובדיקות מקיפות — תנאי-סף ל-Go-Live.",
          beginnerHe: "שלב-המימוש: הופכים את התוכניות למערכת-עובדת — מסיימים את כל ההגדרות, מפתחים מה שצריך, מזינים נתונים, ובודקים הכול לפני העלייה לאוויר.",
          consultantHe: "השלם את ה-Non-Controlling-Customizing (Planner Groups, Purchasing Groups, MRP Controllers, Locations, Plant Sections) שהוזן רק חלקית ב-Explore. בצע שלוש שכבות-בדיקה: Functional (יחידני), Scenario (שרשרת-תהליך), Integration (End-to-End עם נתונים-מהוגרים וממשקים אמיתיים). הוסף UAT. הכן Cutover-Plan.",
          purposeHe: "להפוך את הקונספט למערכת-יצרנית-מאומתת, כך שב-Go-Live אין הפתעות-עיצוב אלא לכל-היותר שאלות-הפעלה.",
          processExampleHe: "צוות משלים Customizing, מפתח Customer Exit IWO10004 (חסימת-אישור עם דרישות-רכש פתוחות), מקים תפקידי-PFCG, מזין Equipment, ומריץ בדיקת-אינטגרציה: הודעה (IW21)→פקודה (IW31)→דיווח (IW41)→Settlement.",
          cbcHe: "ב-CBC בדיקת-האינטגרציה מדמה תקלת-מילר: יצירת הודעה (IW21), המרה לפקודה (IW31), משיכת חלף ממלאי, דיווח-גמר (IW41) ו-Settlement לעלות-מרכז-העלות של הקו — עם הממשק ל-Zetes/Daymax פעיל.",
          navHe: ["SAP Activate ► Realize ► Final Configuration + Build + Test", "Customizing ► PM ► Non-Controlling settings (Planner Groups, MRP Controllers, Locations)"],
          tables: ["AUFK", "VIQMEL", "AFRU", "BANF"],
          tcodes: ["IW31", "IW21", "IW41", "PFCG"],
          fiori: ["F4072", "F2929"],
          configHe: [
            "השלם Non-Controlling-Customizing: Planner Groups, Purchasing Groups, MRP Controllers, Locations, Plant Sections.",
            "טפל בכל פריטי-ה-Gap-List; פתח Customer Exits/BAdIs/BAPIs ותוכניות-הדפסה.",
            "הקם Fiori Launchpad ותפקידי-PFCG (single/composite).",
            "הכן Cutover-Plan ובצע בדיקות: Functional, Scenario, Integration, UAT.",
          ],
          flow: [
            { he: "Customizing סופי (כולל Non-Controlling)" },
            { he: "פתרון Gap-List + פיתוחים", note: "Exits/BAdIs/ממשקים" },
            { he: "הקמת Fiori + הרשאות", code: "PFCG" },
            { he: "הזנת נתוני-אב + Cutover-Plan" },
            { he: "בדיקות: Functional→Scenario→Integration→UAT" },
          ],
          masterDataHe: [
            "הזנת נתוני-אב סופית: Equipment (IE01), Functional Locations (IL01), Task Lists (IA05), Maintenance Plans (IP01).",
            "Non-Controlling tables: Planner Groups, MRP Controllers, Locations, Plant Sections.",
          ],
          mistakesHe: ["דילוג על שכבת בדיקת-אינטגרציה — תקלות מתגלות ב-Production.", "השארת Non-Controlling-Customizing חלקי מ-Explore.", "פיתוח-יתר במקום ניצול-תקן."],
          troubleshootHe: ["תקלות ב-Go-Live ➔ בדיקת-אינטגרציה לא הורצה במלואה.", "שדות-בקרה חסרים ➔ Non-Controlling-Customizing לא הושלם.", "Customer Exit לא נורה ➔ בדוק Enhancement פעיל וקוד מופעל."],
          bestPracticeHe: ["בצע שלוש שכבות-בדיקה + UAT — אל תקצר.", "השלם Non-Controlling-Customizing במלואו.", "הכן Cutover-Plan כבר עם הדרכת-Key-Users."],
          interviewHe: [
            { qHe: "מהן שלוש שכבות-הבדיקה?", aHe: "Functional (יחידני, תוכניות/טרנזקציות), Scenario (שרשרת-תהליך תלוית-זו-בזו), Integration (End-to-End עם נתונים-מהוגרים, ממשקים ותשתית אמיתית)." },
            { qHe: "מה ההבדל בין Controlling ל-Non-Controlling Customizing?", aHe: "Controlling = הגדרות-בקרה קריטיות (סוגי-פקודה/הודעה, מבנים) שנקבעות ב-Explore לאב-טיפוס; Non-Controlling = טבלאות-ערך (Planner Groups, MRP Controllers, Locations) שמושלמות ב-Realize." },
          ],
          takeawaysHe: ["Realize = מימוש מלא + בדיקות.", "השלם Non-Controlling-Customizing.", "שלוש שכבות-בדיקה + UAT לפני Go-Live.", "הכן Cutover-Plan מוקדם."],
          relatedHe: [{ labelHe: "PM · הודעות ופקודות-אחזקה (פרק 5)", href: "/library/pm-academy/chapter-05/" }],
        },
        {
          id: "1.3.5", titleHe: "שלב Deploy", titleEn: "Deploy Phase",
          execHe: "כל הפעילויות סביב ה-Go-Live: הדרכת-משתמשי-קצה (פנימית, סמוך לעלייה), העברת-נתוני-מורשת למערכת-החיה (עם זמן לתיקון), ביצוע Cutover-Plan, Going-Live-Check, עלייה-לאוויר ותמיכה-צמודה.",
          beginnerHe: "שלב-הפריסה: מדריכים את המשתמשים, מעבירים את הנתונים למערכת-האמיתית, מבצעים את תוכנית-המעבר, ועולים לאוויר עם תמיכה זמינה לימים הראשונים.",
          consultantHe: "טיפים: (1) הקצב יום עד שבוע לתיקון/השלמת נתוני-אב — העברה לעולם לא חלקה לגמרי; (2) הדרכת-קצה תיעשה ע\"י עובדי-הארגון (לא קורסי-SAP), סמוך ל-Go-Live עם אובייקטים-אמיתיים; (3) Cutover-Plan = 'חוט-קשור-לאצבע' לפרטים-קטנים (נתונים-ידניים, הגדרות-לא-מועברות, Variants, Batch-Jobs, Number-Ranges); (4) תמיכה On-Site + Hotline בימים הראשונים.",
          purposeHe: "לבצע מעבר-מבוקר לתפעול-חי בלי לשכוח את 'הדברים-הקטנים' שדווקא הם נשכחים במהלך-גדול כמו Go-Live.",
          processExampleHe: "הצוות מריץ Cutover-Plan: יוצר ידנית נתונים-שלא-שווה-להגר, מפעיל Number-Ranges, מריץ Batch-Jobs, ומבצע Going-Live-Check; ביום-העלייה מתחילים לעבד הודעות ופקודות עם תמיכה On-Site.",
          cbcHe: "ב-CBC ה-Cutover כולל: יצירת Equipment אחרון לקווי-המילוי, הפעלת טווחי-מספרים לפקודות, והדרכת-טכנאים-פנימית על יצירת הודעת-תקלה. Hotline פעיל בשבוע-העלייה לתמיכת-משמרות.",
          navHe: ["SAP Activate ► Deploy ► Cutover + Go-Live + Hypercare", "Cutover-Plan ► Manual-Data, Variants, Batch-Jobs, Number-Ranges"],
          tables: ["EQUI", "IFLOT", "AUFK", "VIQMEL"],
          tcodes: ["IBIP", "LSMW", "IW31", "IW21"],
          fiori: ["F2929", "F4072"],
          configHe: [
            "הקצב יום עד שבוע לתיקון/השלמת נתוני-אב לאחר ההעברה.",
            "Cutover-Plan: נתונים-ידניים, הגדרות-לא-מועברות, Selection/Display-Variants, Batch-Jobs, Number-Ranges.",
            "הדרכת-קצה פנימית סמוך ל-Go-Live עם אובייקטים-אמיתיים.",
            "תמיכה On-Site + Hotline + מייל בימים הראשונים.",
          ],
          flow: [
            { he: "הדרכת-משתמשי-קצה", note: "פנימית, סמוך ל-Go-Live" },
            { he: "העברת-נתוני-מורשת", code: "IBIP/LSMW" },
            { he: "Going-Live-Check + Cutover", note: "פרטים-קטנים" },
            { he: "Go-Live", note: "הודעות+פקודות ראשונות" },
            { he: "Hypercare", note: "On-Site + Hotline" },
          ],
          masterDataHe: [
            "העברת נתוני-אב סופית למערכת-החיה: Equipment, Functional Locations, Task Lists, Maintenance Plans.",
            "Cutover-Items ידניים: Number-Ranges, Variants, Batch-Jobs שאינם ניתנים-להובלה.",
          ],
          mistakesHe: ["אי-הקצאת זמן לתיקון-נתונים — הנחה שהעברה תהיה חלקה.", "הדרכת-קצה מוקדמת מדי — נשכחת עד Go-Live.", "Cutover-Plan חסר — 'הדברים-הקטנים' נשכחים."],
          troubleshootHe: ["נתונים שגויים אחרי העברה ➔ הקצב זמן-תיקון; אמת מול מקור.", "משתמשים שכחו הדרכה ➔ קיים אותה סמוך ל-Go-Live.", "פריט נשכח ב-Go-Live ➔ Cutover-Plan לא-מלא; תחזק רשימה ממצה."],
          bestPracticeHe: ["הדרך משתמשי-קצה פנימית, סמוך ל-Go-Live, עם אובייקטים-אמיתיים.", "בנה Cutover-Plan ממצה לפרטים-הקטנים.", "ספק Hypercare On-Site + Hotline בימים הראשונים."],
          interviewHe: [
            { qHe: "מדוע הדרכת-קצה ע\"י עובדי-הארגון ולא קורסי-SAP?", aHe: "קורסי-SAP מתאימים לצוות-הפרויקט; משתמשי-קצה זקוקים להדרכה ממוקדת-ארגון, עם האובייקטים-הטכניים האמיתיים שלהם, סמוך ל-Go-Live." },
            { qHe: "מהו Cutover-Plan ומה הוא כולל?", aHe: "תוכנית-מעבר המרכזת את הפרטים-הקטנים שעלולים להישכח: נתונים-ידניים, הגדרות-לא-מועברות, Variants, Batch-Jobs, Number-Ranges — 'חוט-קשור-לאצבע'." },
          ],
          takeawaysHe: ["Deploy = Cutover + Go-Live + Hypercare.", "הקצב זמן לתיקון-נתונים אחרי העברה.", "הדרכת-קצה פנימית, סמוך ל-Go-Live.", "Cutover-Plan ממצה + תמיכה On-Site."],
          relatedHe: [{ labelHe: "PM · מבנה-נכסים טכני (פרק 4)", href: "/library/pm-academy/chapter-04/" }],
        },
        {
          id: "1.3.6", titleHe: "שלב Run", titleEn: "Run Phase",
          execHe: "השלב המסכם: שיפור-תפעול מתמשך של S/4HANA Asset Management וזיהוי פוטנציאל-אופטימיזציה — תיעוד, הדרכה, מימוש, בדיקות, תפעול-טכני, תהליכים, הרשאות, Fiori, שדרוגים ותחזוקה.",
          beginnerHe: "שלב-התפעול: המערכת חיה, וכעת משפרים אותה ברציפות — מייעלים תהליכים, מעדכנים הדרכות, ומזהים מה אפשר לעשות טוב-יותר בפרויקטים הבאים.",
          consultantHe: "Run אינו 'סוף' אלא מחזור-חיים: הקם תהליך Continuous-Improvement, נטר KPI-אחזקה (זמינות, MTBF/MTTR), ובצע אופטימיזציה של Fiori Launchpads, תפקידי-PFCG ושדרוגי-מערכת. אסוף Lessons-Learned לפרויקט-Rollout הבא.",
          purposeHe: "להפוך את המערכת מ'מותקנת' ל'משתפרת-מתמיד', ולמסד למידה-ארגונית לפרויקטים עתידיים.",
          processExampleHe: "צוות-Run מנטר דוחות-זמינות, מזהה Functional Locations עם תקלות-חוזרות, מתאים תוכניות-אחזקה-מונעת, ומשפר Fiori Launchpad לטכנאים על-בסיס משוב.",
          cbcHe: "ב-CBC צוות-Run מנתח Breakdown-Rate לכל קו-מילוי, מזהה מילרים 'בעייתיים', מקצר מחזורי-אחזקה-מונעת, ומשפר את אפליקציות-ה-Fiori על הטאבלטים של הטכנאים.",
          navHe: ["SAP Activate ► Run ► Continuous Improvement + Optimization", "Roadmap Viewer ► Run-phase accelerators (Operations, Upgrades)"],
          tables: ["EQUI", "IFLOT", "MPLA", "AUFK"],
          tcodes: ["IW38", "IW28", "IP30", "MCI3"],
          fiori: ["F2929", "F4072"],
          configHe: [
            "הקם תהליך Continuous-Improvement עם KPI-אחזקה (Availability, MTBF/MTTR).",
            "בצע אופטימיזציה: תיעוד, הדרכה, בדיקות, תהליכים, הרשאות, Fiori, שדרוגים, תחזוקה.",
            "אסוף Lessons-Learned ל-Rollout הבא.",
          ],
          mistakesHe: ["התייחסות ל-Go-Live כ'סוף' — היעדר תהליך-שיפור.", "אי-איסוף Lessons-Learned ל-Rollout הבא.", "הזנחת אופטימיזציה של Fiori והרשאות."],
          troubleshootHe: ["תקלות-חוזרות באותו ציוד ➔ נתח דוחות (IW28/IW38) והתאם תוכנית-מונעת.", "משתמשים לא-יעילים ➔ אופטימיזציה של Fiori Launchpad לפי משוב."],
          bestPracticeHe: ["הקם Continuous-Improvement עם KPI מדידים.", "נצל Run לאיסוף Lessons-Learned ל-Rollout.", "אופטם Fiori, הרשאות ושדרוגים באופן שוטף."],
          interviewHe: [
            { qHe: "מה עיקר-העיסוק בשלב Run?", aHe: "שיפור-תפעול מתמשך וזיהוי פוטנציאל-אופטימיזציה — תיעוד, הדרכה, בדיקות, תהליכים, הרשאות, Fiori, שדרוגים ותחזוקה." },
            { qHe: "מדוע Run חשוב לפרויקטי-Rollout?", aHe: "הוא ממסד למידה-ארגונית: Lessons-Learned ואופטימיזציות מ-Run משמשים לשיפור הפריסה למפעלים הבאים." },
          ],
          takeawaysHe: ["Run = שיפור מתמשך, לא 'סוף'.", "נטר KPI-אחזקה (זמינות, MTBF/MTTR).", "אסוף Lessons-Learned ל-Rollout.", "אופטם Fiori, הרשאות ושדרוגים."],
          relatedHe: [{ labelHe: "PM · אפשרויות התאמה למשתמש (פרק 9)", href: "/library/pm-academy/chapter-09/" }],
        },
      ],
    },
    // ============================================================ 1.4
    {
      id: "1.4", titleHe: "סיכום", titleEn: "Summary",
      execHe:
        "הפרק הציג את שיטת-העבודה למימוש PM ב-S/4HANA: אסטרטגיית-מימוש (שלבים פונקציונליים ומרחביים, אופקית/אנכית/משולבת), מתודולוגיית SAP Activate (Discover→Run), סקר-סיכונים-והצלחה, וטיפים מעשיים לכל שלב. אלה היסודות שעליהם נשען כל ה-Customizing בפרקים הבאים.",
      beginnerHe:
        "סיכום: למדנו איך מנהלים פרויקט-PM — מחלקים לשלבים, עוקבים אחרי SAP Activate, נמנעים מהסיכונים הנפוצים, ומיישמים טיפים מעשיים. הפרקים הבאים יורדים להגדרות-המערכת עצמן.",
      consultantHe:
        "המסקנות הניהוליות: גייס תמיכת-הנהלה, השג סמכות-החלטה, הגדר מטרות ברורות, בנה אסטרטגיה ומתודולוגיה (Activate), הקדש זמן לתכנון, בצע As-Is, הקם צוות-נכון בלי עומס-יתר, תעד בתבניות-SAP, שתף משתמשי-קצה, שמור פשטות-לשמישות, קטוף Low-Hanging-Fruit, בנה אב-טיפוס, ובדוק והדרך כראוי.",
      purposeHe:
        "לעגן את עקרונות-הניהול לפני הירידה לפרטי-הקונפיגורציה — כך שהמימוש הטכני יתבצע בתוך מסגרת-פרויקט בריאה.",
      processExampleHe:
        "צוות-מנצח: Steering-Committee פעיל, PM בעל-סמכות, מטרה כתובה ('הפחתת השבתה ל-2.8%'), Roadmap לפי Activate, As-Is מלא, אדם 100% ייעודי, אב-טיפוס, בדיקות-רב-שכבתיות והדרכת-קצה צמודה ל-Go-Live.",
      cbcHe:
        "ב-CBC ההצלחה נמדדת ב-Breakdown-Rate יורד ו-Availability עולה בקווי-המילוי — תוצאה ישירה של יישום-נכון של כל עקרונות-הפרק: אסטרטגיה-בשלבים, Activate, ניהול-סיכונים וטיפים.",
      navHe: [
        "SAP Activate ► סקירת-מחזור Discover→Prepare→Explore→Realize→Deploy→Run",
        "Roadmap Viewer ► Lessons-Learned + Next-Phase planning",
      ],
      tables: ["IFLOT", "EQUI", "AUFK", "VIQMEL"],
      tcodes: ["IW31", "IW21", "IH01", "IE01"],
      fiori: ["F2929", "F4072"],
      configHe: [
        "צ'ק-ליסט-מסכם: תמיכת-הנהלה, סמכות-החלטה, מטרות, אסטרטגיה, Activate, תכנון, As-Is, צוות, תיעוד, שיתוף, שמישות, Low-Hanging-Fruit, אב-טיפוס, בדיקות והדרכה.",
        "מעבר לפרק 2: יחידות ארגוניות ומבנה-אחזקה — תחילת ה-Customizing בפועל.",
      ],
      mistakesHe: [
        "התמקדות בטכני (Customizing) תוך הזנחת מסגרת-הפרויקט (ניהול-סיכונים, צוות, תמיכה).",
        "אי-יישום הטיפים כצ'ק-ליסט מסכם לפני Go-Live.",
      ],
      troubleshootHe: [
        "פרויקט נכשל למרות קונפיגורציה תקינה ➔ לרוב חסרו עקרונות-ניהול (תמיכה/מטרות/צוות).",
        "אי-בהירות לגבי הצעדים-הבאים ➔ חזור לצ'ק-ליסט-המסכם ולמחזור-Activate.",
      ],
      bestPracticeHe: [
        "השתמש בצ'ק-ליסט-המסכם כתנאי-מעבר ל-Go-Live.",
        "ודא שמסגרת-הפרויקט (ניהול/סיכונים/צוות) חזקה כמו הקונפיגורציה.",
        "תעד Lessons-Learned לפרק/מפעל הבא.",
      ],
      interviewHe: [
        { qHe: "מהן המסקנות-המרכזיות מפרק זה?", aHe: "גייס תמיכת-הנהלה וסמכות-החלטה, הגדר מטרות ואסטרטגיה, פעל לפי SAP Activate, הקדש זמן לתכנון, בצע As-Is, בנה צוות-נכון, תעד, שתף משתמשים, שמור פשטות, בנה אב-טיפוס, ובדוק והדרך כראוי." },
        { qHe: "מה הקשר בין פרק-זה לפרקי-הקונפיגורציה הבאים?", aHe: "פרק זה מניח את מסגרת-הניהול והמתודולוגיה; הפרקים הבאים (החל מיחידות-ארגוניות בפרק 2) יורדים להגדרות-ה-Customizing בתוך מסגרת זו." },
      ],
      takeawaysHe: [
        "פרויקט-PM מצליח כשמסגרת-הניהול חזקה כמו הקונפיגורציה.",
        "תמיכת-הנהלה, מטרות-ברורות ואסטרטגיה-בשלבים = יסודות.",
        "פעל לפי SAP Activate ויישם את הטיפים כצ'ק-ליסט.",
        "הפרק הבא: יחידות-ארגוניות ומבנה-אחזקה — תחילת ה-Customizing.",
      ],
      relatedHe: [
        { labelHe: "PM · מבנה ארגוני ויחידות-אחזקה (פרק 2)", href: "/library/pm-academy/chapter-02/" },
      ],
    },
  ],
};
