// ===== PM Business User Guide — Chapter 9 (gold-standard learning chapter) =====
// New Information Technologies in Plant Maintenance.
// Every node is a complete LearningNode with 18 facets of authored Hebrew —
// beginner + consultant friendly; SAP object names verbatim English.
import type { TextbookChapter } from "./types";

export const CH9: TextbookChapter = {
  n: 9,
  titleHe: "טכנולוגיות מידע חדשות",
  titleEn: "New Information Technologies",
  introHe:
    "פרק זה סוקר את גל-החדשנות הטכנולוגי שמשנה את אופן עבודת אחזקת-המפעל (Plant Maintenance) ב-SAP S/4HANA: ממשק-משתמש חדש (SAP Fiori, SAP 3D Visual Enterprise, Quick Views), אחזקה ניידת (Mobile Maintenance — SAP Work Manager, SAP Asset Manager, RFID), ואחזקה חכמה ומבוססת-נתונים (SAP Intelligent Asset Management — Asset Central Foundation, AIN, ASPM, PdMS, SAP Predictive Engineering Insights). כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים: שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך, דוגמת CBC (מפעל-מילוי משקאות של Coca-Cola), עצי-ניווט באפליקציות, טבלאות/T-Codes/Fiori, פרטי-קונפיגורציה, תרשים-זרימה לתהליכים ניידים וחיזויים, טעויות נפוצות, פתרון-תקלות, שיטות-מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: ללמוד את הטכנולוגיה ללא הספר המקורי, ברמה שמשרתת גם מתחיל וגם יועץ.",
  subchapters: [
    // ============================================================ 9.1
    {
      id: "9.1",
      titleHe: "טכנולוגיות חדשות בממשק-המשתמש",
      titleEn: "New Technologies in the User Interface",
      execHe:
        "ממשק-המשתמש של אחזקת-המפעל עבר מהפכה: מ-SAP GUI הקלאסי (מסכים אפורים, קוד-עסקה, שדות צפופים) למחווית-עבודה מבוססת-תפקיד עם SAP Fiori, להמחשה תלת-ממדית של נכסים עם SAP 3D Visual Enterprise, ולתצוגות-עבודה מהירות (Quick Views) המרכזות מידע לטכנאי. המטרה העסקית: לקצר זמן-הכשרה, להפחית טעויות-הזנה ולהגדיל את אחוז-הזמן שהטכנאי מבלה בעבודת-אחזקה ולא במסכים.",
      beginnerHe:
        "עד היום עבדת ב-SAP דרך מסכים אפורים וקודי-עסקה שצריך לזכור בעל-פה (IW21, IW31...). הממשק החדש דומה יותר לאפליקציה בטלפון: אריחים (Tiles) צבעוניים לפי תפקיד, חיפוש חכם, ותצוגה שמתאימה עצמה למסך. SAP Fiori הוא 'הפנים החדשות' של SAP; SAP 3D Visual Enterprise נותן לראות את הנכס במודל תלת-ממדי במקום רק טקסט; ו-Quick Views מרכזים את כל מה שטכנאי צריך לראות על נכס בלחיצה אחת.",
      consultantHe:
        "ארכיטקטונית, Fiori הוא שכבת-UX מבוססת SAPUI5 (HTML5/JavaScript) הרצה מול OData services שנחשפים מ-S/4HANA דרך SAP Gateway, מאורגנת ב-Fiori Launchpad לפי Business Roles ו-Catalogs/Groups (Spaces & Pages ב-S/4HANA החדש). SAP 3D Visual Enterprise (DVE) מבוסס רכישת-RightHemisphere; הוא ממיר קבצי-CAD לפורמט VDS קל וקושר מודלים תלת-ממדיים ל-Equipment/Functional Location דרך DMS (Document Management System). Quick Views (לעיתים Object Pages / Overview Pages ב-Fiori) מאחדים נתוני-אב, מצב, היסטוריה ומדדים בעמוד-אובייקט אחד. שיקול-מימוש מרכזי: גרסת-Frontend Server, הפעלת SICF services, ו-mapping של Business Roles.",
      purposeHe:
        "להעביר את אנשי-האחזקה מ-'ניווט במערכת' ל-'ביצוע עבודה': פחות מסכים, פחות הקלדה, יותר הקשר ויזואלי. ממשק נכון מקצר Onboarding של טכנאי חדש משבועות לימים ומפחית טעויות-הזנה שמזהמות את היסטוריית-הנכס.",
      processExampleHe:
        "מתכנן-אחזקה נכנס ל-Fiori Launchpad, רואה אריח 'My Open Maintenance Orders' עם מונה, נכנס ל-Object Page של הזמנת-אחזקה, פותח מודל תלת-ממדי של המשאבה דרך SAP 3D Visual Enterprise, מסמן את האטם הפגום ויזואלית, ומ-Quick View של ה-Equipment רואה מיד את היסטוריית-התקלות ורשימת חלקי-החילוף — הכל בלי לעבור בין עשרה מסכי-GUI.",
      cbcHe:
        "ב-CBC (מפעל-מילוי Coca-Cola): מנהל-משמרת פותח Launchpad עם אריחי-תפקיד לקווי-המילוי; טכנאי-קו רואה Quick View של מילֵא (Filler) עם מצב, פק\"ע פתוחות וזמינות-חלפים; ומדריך-הכשרה משתמש במודל תלת-ממדי של ראש-המילוי כדי להראות לעובד-חדש איפה האטם הדולף — במקום צילום-מסך מטושטש.",
      navHe: [
        "SAP Fiori Launchpad ► Spaces & Pages ► Maintenance Management (Business Role: SAP_BR_MAINTENANCE_PLANNER)",
        "SAP GUI ► SPRO ► SAP NetWeaver ► UI Technologies ► SAP Fiori ► Activate Catalogs/Groups",
        "DMS ► Document ► Link 3D Model (VDS) to Equipment / Functional Location",
      ],
      tables: ["EQUI", "IFLOT", "DRAW", "DRAD", "/UI2/*"],
      tcodes: ["/UI2/FLP", "/UI2/FLPD", "SICF", "PFCG", "CV01N"],
      fiori: ["F2949", "F2972", "F1827"],
      configHe: [
        "Fiori Launchpad: הפעלת OData services ב-/IWFND/MAINT_SERVICE, פרסום SICF nodes, והקצאת Business Catalogs ב-PFCG.",
        "Spaces & Pages (S/4HANA): מעבר מ-Groups קלאסיים ל-Spaces מבוססי-תפקיד.",
        "SAP 3D Visual Enterprise: התקנת DVE Author/Generator, המרת CAD ל-VDS, קישור המודל ל-Equipment דרך DMS (DRAW/DRAD).",
        "Quick View / Object Page: הגדרת CDS-based Overview Pages ו-Smart Templates לאובייקטי PM.",
      ],
      mistakesHe: [
        "פרסום אריחים ללא הפעלת ה-OData service המתאים — האריח מציג שגיאת-ניתוב.",
        "מתן Business Role רחב מדי לטכנאי — מציף אותו באריחים לא-רלוונטיים.",
        "קישור מודל תלת-ממדי כבד (CAD גולמי) במקום VDS — טעינה איטית בשטח.",
        "הנחה ש-Fiori מחליף לגמרי את SAP GUI — חלק מהקונפיגורציה עדיין דורש GUI.",
      ],
      troubleshootHe: [
        "אריח מציג 'Service unavailable' ➔ בדוק /IWFND/ERROR_LOG ו-SICF node פעיל.",
        "מודל תלת-ממדי לא נפתח ➔ ודא קישור-DMS תקין ופורמט VDS, לא CAD גולמי.",
        "Launchpad ריק לאחר Login ➔ Business Role/Catalog לא מוקצים ב-PFCG.",
        "ביצועים איטיים ב-Object Page ➔ CDS view לא-אופטימלי / חסר אינדקס.",
      ],
      bestPracticeHe: [
        "התחל מ-Business Roles הסטנדרטיים של SAP והתאם בעדינות במקום לבנות מאפס.",
        "המר תמיד CAD ל-VDS קל לפני קישור — ביצועים בשטח קריטיים.",
        "אמץ Spaces & Pages במקום Groups בפרויקטים חדשים.",
        "מדוד אימוץ (adoption) של אריחים והסר אריחים שאינם בשימוש.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין SAP GUI ל-SAP Fiori?", aHe: "GUI הוא ממשק קלאסי מבוסס-מסכים וקודי-עסקה; SAP Fiori הוא שכבת-UX מבוססת-תפקיד (SAPUI5/OData) עם Launchpad ואריחים, המתאימה את עצמה למכשיר ולתפקיד-המשתמש." },
        { qHe: "כיצד נקשר מודל תלת-ממדי לנכס ב-PM?", aHe: "דרך SAP 3D Visual Enterprise: ממירים CAD לפורמט VDS וקושרים אותו ל-Equipment/Functional Location דרך ה-DMS (Document Management System)." },
        { qHe: "מהו Quick View / Object Page?", aHe: "עמוד-אובייקט המאחד נתוני-אב, מצב, היסטוריה ומדדים של נכס בתצוגה אחת מבוססת-CDS, לחיסכון בניווט בין מסכים." },
      ],
      takeawaysHe: [
        "ה-UI של PM עבר מ-GUI מבוסס-מסכים ל-Fiori מבוסס-תפקיד.",
        "SAP 3D Visual Enterprise מוסיף הקשר ויזואלי תלת-ממדי לנכס.",
        "Quick Views/Object Pages מרכזים מידע לטכנאי בלחיצה אחת.",
        "ממשק טוב = פחות הכשרה, פחות טעויות, יותר זמן-עבודה בשטח.",
      ],
      relatedHe: [
        { labelHe: "PM · אחזקה ניידת (9.2)", href: "/library/pmu/chapter-09/#sub-9.2" },
        { labelHe: "אובייקט · EQUI", href: "/library/pmu/object/EQUI/" },
      ],
      children: [
        {
          id: "9.1.1",
          titleHe: "SAP 3D Visual Enterprise Viewer",
          titleEn: "SAP 3D Visual Enterprise Viewer",
          execHe:
            "SAP 3D Visual Enterprise Viewer מאפשר לאנשי-אחזקה לצפות במודל תלת-ממדי אינטראקטיבי של ציוד ישירות מתוך אובייקט-ה-PM, לסובב, להגדיל, לפרק-להרכיב (exploded view) ולזהות חלקים ויזואלית — במקום להסתמך על שרטוטים דו-ממדיים בלבד.",
          beginnerHe:
            "במקום לקרוא שרטוט-הנדסי מסובך, אתה רואה את המכונה כמודל תלת-ממדי שאפשר לסובב באצבע, לפרק לחלקים ולגעת בכל רכיב כדי לדעת מה שמו ומספר-החלק שלו. זה הופך 'איפה האטם הזה?' לברור מיידית.",
          consultantHe:
            "ה-Viewer מבוסס פורמט VDS (Visual Design Stream) — ייצוג קל של מודל-CAD שנוצר ע\"י DVE Generator. המודל נקשר לאובייקט-PM (Equipment/Functional Location) דרך DMS, ויכול לשאת metadata המקשר חלק-תלת-ממדי ל-Material/Spare Part. הצפייה מוטמעת ב-Fiori (control מסוג Visual Enterprise) או ב-Viewer עצמאי, ותומכת ב-PMI (Product Manufacturing Information), exploded views ו-callouts.",
          purposeHe:
            "לקצר את הזמן לזיהוי-חלק ולהזמנת-חלף נכון, להפחית טעויות-הזמנה, ולשפר הדרכה: עובד חדש מבין מבנה-מכונה ויזואלית מהר בהרבה מאשר משרטוט.",
          processExampleHe:
            "טכנאי מקבל פק\"ע על רעש במסבך; פותח את ה-3D Viewer של המכונה, מבצע exploded view של גל-ההינע, מזהה את המסב הפגום, לוחץ עליו ומקבל את מספר-החומר (Material) ל-Reservation — הכל מבלי לעזוב את הזמנת-האחזקה.",
          cbcHe:
            "ב-CBC: מודל תלת-ממדי של ראש-המילוי הקרוסלי (rotary filler) מאפשר לטכנאי לסמן את ה-fill valve הדולף ולמשוך מיד את חלף-החילוף הנכון מתוך מאות שסתומים זהים-למראה.",
          navHe: [
            "Fiori Object Page (Equipment) ► 3D Visualization tab ► Visual Enterprise Viewer",
            "DMS ► CV03N ► Document (VDS) ► Object Link ► Equipment",
          ],
          tables: ["DRAW", "DRAD", "EQUI", "TDWA"],
          tcodes: ["CV01N", "CV03N", "IE03"],
          fiori: ["F1827"],
          configHe: [
            "התקן DVE Generator והמר קובצי-CAD לפורמט VDS.",
            "הגדר Document Type ב-DMS ל-VDS וקשר Object Link ל-Equipment/Functional Location.",
            "הטמע את Visual Enterprise control ב-Object Page של ה-Equipment.",
          ],
          mistakesHe: [
            "קישור CAD גולמי במקום VDS — טעינה איטית או כשל בשטח.",
            "מודל ללא metadata לחלקים — אי-אפשר לקפוץ מ-3D ל-Material.",
          ],
          troubleshootHe: [
            "המודל לא נטען ➔ פורמט אינו VDS / Object Link ב-DMS שבור.",
            "לחיצה על חלק לא מחזירה Material ➔ חסר mapping של part↔Material.",
          ],
          bestPracticeHe: [
            "שמור מודלים קלים (VDS) ומעודכנים מול שינויי-הנדסה.",
            "קשר חלקים-תלת-ממדיים ל-Material לזרימה ישירה אל Reservation.",
          ],
          interviewHe: [
            { qHe: "מהו פורמט VDS?", aHe: "Visual Design Stream — ייצוג קל ואופטימלי של מודל-CAD ל-SAP 3D Visual Enterprise, מתאים לצפייה מהירה בשטח." },
            { qHe: "כיצד מקשרים 3D ל-Material?", aHe: "באמצעות metadata במודל הממפה כל חלק-תלת-ממדי למספר-Material, כך שלחיצה מובילה ישירות להזמנת-חלף." },
          ],
          takeawaysHe: [
            "VDS = פורמט-3D קל לצפייה בשטח.",
            "הקישור ל-Equipment נעשה דרך DMS.",
            "Exploded view + mapping ל-Material מקצרים הזמנת-חלף.",
          ],
        },
        {
          id: "9.1.2",
          titleHe: "SAP Fiori",
          titleEn: "SAP Fiori",
          execHe:
            "SAP Fiori הוא חוויית-המשתמש הסטנדרטית של S/4HANA: אוסף אפליקציות מבוססות-תפקיד, רספונסיביות ומבוססות-OData, המאורגנות ב-Launchpad. עבור PM הוא מספק אפליקציות למתכנן, למפקח ולטכנאי המחליפות עשרות מסכי-GUI בזרימות-עבודה ממוקדות-משימה.",
          beginnerHe:
            "Fiori הוא 'מסך-הבית' החדש של SAP — דומה לאפליקציות בטלפון. במקום לזכור קוד-עסקה, אתה רואה אריחים: 'הזמנות פתוחות', 'התראות שלי', 'דיווח-זמן'. כל אריח הוא אפליקציה קטנה שעושה משימה אחת בבירור.",
          consultantHe:
            "Fiori בנוי על SAPUI5; אפליקציות נחלקות ל-Transactional, Analytical (מבוסס CDS + Smart Business KPIs) ו-Fact Sheets/Object Pages. ה-Launchpad מנוהל דרך Business Roles → Business Catalogs → Apps, וב-S/4HANA דרך Spaces & Pages. כל אפליקציה נחשפת כ-OData service ודורשת הפעלה ב-Gateway והרשאות PFCG. ה-Fiori Apps Reference Library מספקת לכל אפליקציה App ID, service ו-role.",
          purposeHe:
            "להעמיד את המשתמש במרכז: זרימת-עבודה אחת לכל משימה, חיפוש-Enterprise חוצה-אובייקטים, וניידות אמיתית — אותו ממשק בדסקטופ, בטאבלט ובטלפון.",
          processExampleHe:
            "מתכנן פותח אפליקציית 'Find Maintenance Notifications', מסנן לפי מערכת-משנה, ממיר התראה להזמנה ('Create Maintenance Order'), מתזמן ומשחרר — שרשרת שלמה תוך מספר אפליקציות מקושרות, עם ניווט-הקשרי ביניהן.",
          cbcHe:
            "ב-CBC כל תפקיד מקבל Space ייעודי: 'Line Maintenance Technician' עם אריחי דיווח-זמן ואישור-פק\"ע; 'Reliability Engineer' עם אריחי-אנליטיקה של MTBF ו-Top Bad Actors בקווי-המילוי.",
          navHe: [
            "SAP Fiori Launchpad ► Spaces ► Maintenance Management",
            "Fiori Apps Reference Library ► PM ► App ID ► OData service + Business Role",
            "SPRO ► UI Technologies ► SAP Fiori ► Rapid Activation / Task Lists",
          ],
          tables: ["/UI2/*", "/IWFND/*", "AGR_USERS"],
          tcodes: ["/UI2/FLPD", "/IWFND/MAINT_SERVICE", "PFCG", "STC01"],
          fiori: ["F2949", "F2174", "F1511"],
          configHe: [
            "הפעל OData services ב-/IWFND/MAINT_SERVICE ו-SICF nodes.",
            "הקצה Business Catalogs/Roles ב-PFCG; השתמש ב-Rapid Activation (STC01 task lists).",
            "ארגן ב-Spaces & Pages לפי תפקיד-PM.",
          ],
          mistakesHe: [
            "הקצאת אפליקציה ללא service פעיל ➔ שגיאת-ניתוב.",
            "Catalog רחב מדי לטכנאי ➔ עומס קוגניטיבי.",
            "התעלמות מ-Fiori Apps Reference Library ➔ קונפיגורציה ידנית מיותרת.",
          ],
          troubleshootHe: [
            "אפליקציה לא נפתחת ➔ /IWFND/ERROR_LOG + SICF activation.",
            "אריח לא מופיע ➔ Catalog/Role ב-PFCG חסר.",
            "KPI אנליטי ריק ➔ CDS view / authorization על נתונים.",
          ],
          bestPracticeHe: [
            "השתמש ב-Rapid Activation Task Lists להפעלה המונית.",
            "התבסס על Fiori Apps Reference Library כמקור-אמת.",
            "נהל הרשאות דרך Business Roles, לא הקצאות נקודתיות.",
          ],
          interviewHe: [
            { qHe: "מהם שלושה סוגי אפליקציות Fiori?", aHe: "Transactional (ביצוע פעולות), Analytical (KPIs מבוססי-CDS/Smart Business) ו-Fact Sheet/Object Page (תצוגת-אובייקט)." },
            { qHe: "כיצד מפעילים אפליקציית Fiori?", aHe: "מפעילים את ה-OData service ב-Gateway ו-SICF, מקצים Business Catalog/Role ב-PFCG, ומשייכים ל-Space/Page; פרטים ב-Fiori Apps Reference Library." },
          ],
          takeawaysHe: [
            "Fiori = UX מבוסס-תפקיד וניידות של S/4HANA.",
            "מאורגן ב-Launchpad / Spaces & Pages.",
            "כל אפליקציה = OData service + Role; מקור-אמת = Apps Reference Library.",
          ],
          relatedHe: [
            { labelHe: "PM · SAP Asset Manager (9.2.3)", href: "/library/pmu/chapter-09/#sub-9.2.3" },
          ],
        },
        {
          id: "9.1.3",
          titleHe: "תצוגות מהירות",
          titleEn: "Quick Views",
          execHe:
            "Quick Views הן תצוגות-עבודה מרוכזות המציגות לטכנאי או למתכנן את כל המידע הקריטי על אובייקט-PM (מצב, היסטוריה, חלקים, מדדים) בעמוד אחד — ללא ניווט בין מסכים. הן ממומשות כ-Object Pages / Overview Pages ב-Fiori.",
          beginnerHe:
            "תצוגה-מהירה היא 'כרטיס-מידע' של נכס: בלחיצה אחת אתה רואה אם הוא תקין, מתי תוקן לאחרונה, אילו פק\"ע פתוחות עליו ואילו חלפים זמינים — במקום לפתוח חמישה מסכים.",
          consultantHe:
            "Quick Views ב-Fiori ממומשות כ-Object Pages (Smart Templates / SAP Fiori elements) או Overview Pages מבוססות-CDS עם cards. הן צורכות annotations של CDS views (UI annotations) להגדרת sections, facets ו-KPIs. ב-PM הן מאחדות Equipment/Functional Location master, status (system/user status), measurement docs, order history ו-spare-part availability.",
          purposeHe:
            "לתת החלטה מהירה בשטח: 'האם להתערב עכשיו?' — ע\"י ריכוז המידע הרלוונטי במקום אחד, בלי לאבד זמן בניווט.",
          processExampleHe:
            "מפקח פותח Quick View של משאבה: רואה status 'in operation', מד-רטט עדכני באדום, שתי פק\"ע פתוחות וזמינות-מסב במלאי — ומחליט תוך שניות להקדים את ההזמנה.",
          cbcHe:
            "ב-CBC: Quick View של מילֵא מציג OEE-קו, מספר-עצירות במשמרת, פק\"ע פתוחות וחלפים — מנהל-המשמרת מקבל תמונת-מצב מיידית לפני סבב-הביקורת.",
          navHe: [
            "Fiori ► Object Page (Equipment / Functional Location)",
            "Fiori ► Overview Page (Maintenance) ► Cards",
          ],
          tables: ["EQUI", "IFLOT", "IMRG", "JEST"],
          tcodes: ["IE03", "IL03", "IK13"],
          fiori: ["F2949", "F1827", "F2972"],
          configHe: [
            "הגדר Object Page דרך SAP Fiori elements (Smart Templates) על CDS view עם UI annotations.",
            "הגדר Overview Page cards (KPI/List/Table) למדדי-PM.",
            "קבע facets/sections: master, status, history, spares.",
          ],
          mistakesHe: [
            "Overview Page עמוס בכרטיסים ➔ איבוד המסר.",
            "CDS לא-אופטימלי ➔ טעינה איטית של הכרטיס.",
          ],
          troubleshootHe: [
            "כרטיס ריק ➔ authorization על CDS / נתונים חסרים.",
            "סעיף לא מופיע ➔ UI annotation/facet לא מוגדר.",
          ],
          bestPracticeHe: [
            "הצג מעט מדדים קריטיים במקום הכל.",
            "בנה על CDS סטנדרטיים והרחב ב-annotations.",
          ],
          interviewHe: [
            { qHe: "כיצד ממומשת Quick View ב-Fiori?", aHe: "כ-Object Page (Fiori elements / Smart Template) או Overview Page מבוססת-CDS עם UI annotations המגדירות sections, facets ו-KPI cards." },
          ],
          takeawaysHe: [
            "Quick View = כל מידע-הנכס בעמוד אחד.",
            "ממומשת כ-Object/Overview Page מבוססת-CDS.",
            "מטרתה החלטה מהירה בשטח.",
          ],
        },
      ],
    },
    // ============================================================ 9.2
    {
      id: "9.2",
      titleHe: "אחזקה ניידת",
      titleEn: "Mobile Maintenance",
      execHe:
        "אחזקה ניידת (Mobile Maintenance) מעבירה את עבודת-האחזקה מהמשרד אל השטח: הטכנאי מקבל פק\"ע, מבצע, מדווח-זמן, מתעד-מדידות ומאשר — מהטאבלט או הטלפון, גם ללא קליטה (offline). SAP מציעה שתי דורות-מוצר עיקריים — SAP Work Manager (הדור הקודם, מבוסס SAP Mobile Platform / Agentry) ו-SAP Asset Manager (הדור הנוכחי, ענני, מבוסס SAP BTP) — ומשולבת בזיהוי-נכסים אוטומטי דרך RFID.",
      beginnerHe:
        "במקום שהטכנאי יחזור למשרד כדי להדפיס פק\"ע ולהקליד אחר-כך מה עשה, הוא נושא טאבלט/טלפון: רואה את הרשימה שלו, פותח את הפק\"ע ליד המכונה, מצלם, מדווח שעות וחלקים — והכל מסתנכרן ל-SAP. אם אין רשת, זה נשמר ומסתנכרן כשחוזרת הקליטה. RFID מאפשר 'לקרוא' תג על המכונה כדי לזהות אותה אוטומטית.",
      consultantHe:
        "אדריכלות ניידת ב-PM כוללת שכבת-לקוח (אפליקציה native/hybrid עם מאגר-offline מקומי), שכבת-סנכרון (delta sync) ושכבת-backend (OData/RFC אל S/4HANA). SAP Work Manager רץ על SAP Mobile Platform (SMP) עם מנוע Agentry ו-data tier. SAP Asset Manager הוא יורשו: native (iOS/Android) מבוסס SAP Mobile Development Kit (MDK), עם backend ב-SAP BTP (Mobile Services) וסנכרון OData offline אל S/4HANA Asset Management. שני המוצרים תומכים בזרימת order→operation→confirmation→measurement→goods movement, וב-RFID/NFC לזיהוי-נכס.",
      purposeHe:
        "להגדיל wrench-time (אחוז-הזמן בעבודת-אחזקה בפועל), לבטל הקלדה-כפולה ופערי-תיעוד, ולשפר את איכות היסטוריית-הנכס — כי הדיווח נעשה בנקודת-העבודה ובזמן-אמת.",
      processExampleHe:
        "טכנאי מקבל push לפק\"ע במכשיר, ניגש לקו, סורק תג-RFID של המכונה (זיהוי-Equipment אוטומטי), מבצע, מתעד מדידה (Measurement Document), מדווח 1.5 שעות ומשיכת-חלף, מצרף תמונה ומאשר — והכל מסתנכרן ל-S/4HANA; אם הקו במרתף ללא רשת, הנתונים נשמרים offline ומסתנכרנים כשחוזרת הקליטה.",
      cbcHe:
        "ב-CBC: טכנאי-משמרת בקו-המילוי נושא טאבלט עם SAP Asset Manager; משמרת-לילה במחסן-קירור ללא Wi-Fi עובדת offline; תגי-RFID על מנועים וראשי-מילוי מזהים את ה-Equipment בסריקה, ומונעים דיווח על המכונה הלא-נכונה.",
      navHe: [
        "SAP Asset Manager (mobile app) ► My Work Orders ► Operation ► Confirm",
        "SAP BTP Cockpit ► Mobile Services ► Asset Manager ► OData offline configuration",
        "SAP Work Manager ► Agentry ► Work Order ► Complete",
      ],
      tables: ["AUFK", "AFKO", "AFVC", "AFRU", "IMRG"],
      tcodes: ["IW31", "IW32", "IW41", "IK11", "CO11N"],
      fiori: ["F2949", "F1511"],
      configHe: [
        "SAP Asset Manager: הקמת Mobile Services ב-SAP BTP, הגדרת destination ל-S/4HANA, ו-OData offline (defining requests).",
        "SAP Work Manager: התקנת SAP Mobile Platform + Agentry, פרסום ה-application ו-data tier.",
        "הגדרת זרימת order/confirmation/measurement ו-mapping של RFID/NFC לזיהוי-Equipment.",
      ],
      flow: [
        { he: "קבלת פק\"ע למכשיר", code: "AUFK", note: "push / sync" },
        { he: "זיהוי-נכס בסריקה", code: "RFID/NFC", note: "Equipment auto-ID" },
        { he: "ביצוע + תיעוד", note: "תמונה / מדידה" },
        { he: "דיווח-זמן וחלפים", code: "AFRU", note: "confirmation" },
        { he: "מדידה", code: "IMRG", note: "Measurement Document" },
        { he: "סנכרון ל-S/4HANA", note: "online / offline-delta" },
      ],
      mistakesHe: [
        "מימוש ללא תכנון offline ➔ קריסה באזורים ללא-רשת.",
        "סנכרון מלא במקום delta ➔ עומס-רשת וזמני-המתנה.",
        "התעלמות מ-conflict handling בסנכרון ➔ דריסת-נתונים.",
        "בחירת Work Manager לפרויקט חדש במקום Asset Manager הנתמך.",
      ],
      troubleshootHe: [
        "פק\"ע לא מגיעה למכשיר ➔ OData request/sync filter שגוי או הרשאה.",
        "סנכרון נכשל ➔ destination/connectivity ב-BTP או log ב-Mobile Services.",
        "דיווח-זמן לא נרשם ➔ conflict בסנכרון / status-order חוסם confirmation.",
        "RFID לא מזהה ➔ mapping tag↔Equipment חסר.",
      ],
      bestPracticeHe: [
        "תכנן offline-first; הגדר delta sync וטיפול-בקונפליקטים.",
        "העדף SAP Asset Manager לפרויקטים חדשים (Work Manager בדעיכה).",
        "צמצם את היקף-הנתונים בסנכרון לרלוונטי לטכנאי.",
        "שלב RFID/NFC למניעת דיווח על נכס שגוי.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין SAP Work Manager ל-SAP Asset Manager?", aHe: "SAP Work Manager הוא הדור הקודם המבוסס SAP Mobile Platform/Agentry; SAP Asset Manager הוא היורש הענני מבוסס SAP BTP ו-Mobile Development Kit, עם OData offline אל S/4HANA Asset Management." },
        { qHe: "מדוע offline קריטי באחזקה ניידת?", aHe: "כי עבודת-אחזקה מתבצעת לעיתים במרתפים/מתחמים ללא קליטה; offline-first עם delta sync מבטיח רציפות-עבודה וסנכרון מאוחר ללא אובדן-נתונים." },
        { qHe: "כיצד RFID משתלב באחזקה ניידת?", aHe: "סריקת תג-RFID/NFC על הנכס מזהה את ה-Equipment אוטומטית, מונעת טעות-זיהוי, ופותחת מיד את ההקשר הנכון (פק\"ע, היסטוריה) באפליקציה." },
      ],
      takeawaysHe: [
        "אחזקה ניידת מעבירה את העבודה לשטח ומגדילה wrench-time.",
        "SAP Asset Manager (BTP) הוא היורש של SAP Work Manager (SMP/Agentry).",
        "offline-first + delta sync = רציפות-עבודה ללא רשת.",
        "RFID/NFC מזהה את הנכס אוטומטית ומונע טעויות-דיווח.",
      ],
      relatedHe: [
        { labelHe: "PM · SAP Fiori (9.1.2)", href: "/library/pmu/chapter-09/#sub-9.1.2" },
        { labelHe: "אובייקט · AFRU", href: "/library/pmu/object/AFRU/" },
      ],
      children: [
        {
          id: "9.2.1",
          titleHe: "יסודות אחזקה ניידת",
          titleEn: "Fundamentals of Mobile Maintenance",
          execHe:
            "יסודות האחזקה-הניידת הם המושגים המשותפים לכל פתרון-נייד: עבודה offline/online, סנכרון-דלתא, מאגר-נתונים מקומי, זרימת order→confirmation, וזיהוי-נכס. הבנתם נדרשת לבחירה ולמימוש נכון של כל מוצר-נייד.",
          beginnerHe:
            "לפני שצוללים ל-Work Manager או Asset Manager — כדאי להבין מה משותף: האפליקציה מורידה את העבודה שלך למכשיר, אתה עובד גם בלי אינטרנט, וכשחוזרת רשת רק השינויים (delta) נשלחים ל-SAP. זה מה שמייחד אחזקה ניידת מ-'אתר רגיל'.",
          consultantHe:
            "מושגי-יסוד: client-side data store (SQLite/encrypted), sync engine (delta + conflict resolution), backend exposure (OData/RFC), ו-security (OAuth/SAML דרך Mobile Services). מודל-הנתונים בנייד הוא תת-קבוצה של אובייקטי-PM (Order/Operation/Notification/Equipment/Measurement) המוגדרת ב-offline OData requests. תכנון-נכון של scope וה-delta הוא ההבדל בין פתרון מהיר לכבד.",
          purposeHe:
            "להניח תשתית-הבנה משותפת: לבחור פתרון, להגדיר scope-נתונים, ולתכנן offline — לפני התעמקות במוצר ספציפי.",
          processExampleHe:
            "במימוש: מגדירים אילו אובייקטים יורדים למכשיר (פק\"ע פתוחות שלי + ה-Equipment שלהן), כיצד מתבצע delta sync, וכיצד נפתרים קונפליקטים אם שני טכנאים נגעו באותה פעולה.",
          cbcHe:
            "ב-CBC: ה-scope לטכנאי-קו = פק\"ע פתוחות על קו-המילוי שלו + ה-Equipment של הקו + הוראות-מדידה; לא כל המפעל — לשמירה על מכשיר קל וסנכרון מהיר.",
          navHe: [
            "SAP BTP ► Mobile Services ► Offline OData ► Defining Requests (scope)",
            "Mobile app ► Sync ► Delta",
          ],
          tables: ["AUFK", "AFVC", "EQUI", "QMEL"],
          tcodes: ["IW31", "IW41", "IK11"],
          fiori: ["F2949"],
          configHe: [
            "הגדר offline OData scope (defining requests): אילו אובייקטים יורדים למכשיר.",
            "קבע delta-sync ו-conflict resolution.",
            "הגדר אבטחה (OAuth/SAML) דרך Mobile Services.",
          ],
          mistakesHe: [
            "scope רחב מדי ➔ מכשיר כבד וסנכרון איטי.",
            "התעלמות מ-conflict resolution ➔ אובדן-דיווח.",
          ],
          troubleshootHe: [
            "סנכרון ארוך ➔ scope גדול מדי / לא delta.",
            "נתון נדרס ➔ מדיניות-קונפליקט לא מוגדרת.",
          ],
          bestPracticeHe: [
            "צמצם scope לרלוונטי-לתפקיד.",
            "תכנן offline ו-conflict resolution מההתחלה.",
          ],
          interviewHe: [
            { qHe: "מהו delta sync?", aHe: "סנכרון של השינויים בלבד (delta) מאז הסנכרון הקודם, במקום הורדה/העלאה מלאה — חוסך רשת וזמן." },
            { qHe: "מהו offline OData scope?", aHe: "הגדרת ה-defining requests הקובעת אילו אובייקטים ושדות יורדים למאגר-המקומי במכשיר לעבודה ללא-רשת." },
          ],
          takeawaysHe: [
            "כל פתרון-נייד חולק: offline store, delta sync, OData backend.",
            "תכנון scope ו-conflict resolution הוא קריטי.",
            "מודל-הנתונים הנייד הוא תת-קבוצה של אובייקטי-PM.",
          ],
        },
        {
          id: "9.2.2",
          titleHe: "SAP Work Manager",
          titleEn: "SAP Work Manager",
          execHe:
            "SAP Work Manager הוא פתרון האחזקה-הניידת מהדור-הקודם, מבוסס SAP Mobile Platform ומנוע Agentry. הוא תומך בזרימת-אחזקה מלאה offline אך נמצא בדעיכה לטובת SAP Asset Manager — ולכן רלוונטי בעיקר ללקוחות-קיימים ולהבנת מסלול-ההגירה.",
          beginnerHe:
            "Work Manager הוא ה'אבא' של אפליקציות-האחזקה הניידות של SAP. הוא עובד טוב offline, אבל הוא הדור הישן; פרויקטים חדשים יעדיפו את Asset Manager. כדאי להכיר אותו כי הרבה לקוחות עדיין משתמשים בו.",
          consultantHe:
            "Work Manager רץ על SAP Mobile Platform (SMP) Server עם Agentry runtime: הגדרת-האפליקציה (steplets, screens, transactions, data-tier) נעשית ב-Agentry Editor, וה-backend מתחבר ל-ERP/S4 דרך RFC/Java. הוא תומך offline מלא, אך מודל-ההתאמה (Agentry) שונה מאוד מ-OData/MDK של Asset Manager — מה שמכתיב פרויקט-הגירה ולא שדרוג-פשוט.",
          purposeHe:
            "לאפשר ללקוחות-קיימים להמשיך אחזקה ניידת offline, ולספק בסיס-להבנה לקראת מעבר ל-SAP Asset Manager.",
          processExampleHe:
            "טכנאי ב-Work Manager מסנכרן בתחילת-משמרת, עובד offline כל היום על פק\"ע ומדידות, ומסנכרן בסוף — נתונים זורמים ל-ERP דרך SMP.",
          cbcHe:
            "ב-CBC: אם המפעל מימש Work Manager בעבר, הוא מתוכנן להגר ל-SAP Asset Manager במסגרת מעבר ל-S/4HANA Cloud-ready.",
          navHe: [
            "SAP Work Manager ► Agentry ► Work Order ► Steps",
            "SMP Server ► Agentry application deployment",
          ],
          tables: ["AUFK", "AFKO", "AFRU"],
          tcodes: ["IW32", "IW41"],
          fiori: [],
          configHe: [
            "התקן SAP Mobile Platform + Agentry runtime.",
            "הגדר את האפליקציה ב-Agentry Editor (transactions, data-tier).",
            "חבר backend דרך RFC/Java ל-ERP/S4.",
          ],
          mistakesHe: [
            "בחירת Work Manager לפרויקט-חדש ➔ טכנולוגיה בדעיכה.",
            "הנחה ש-מעבר ל-Asset Manager הוא שדרוג ➔ זהו פרויקט-הגירה.",
          ],
          troubleshootHe: [
            "סנכרון נכשל ➔ SMP server / Agentry data-tier.",
            "שדה לא יורד ➔ הגדרת data-tier ב-Agentry.",
          ],
          bestPracticeHe: [
            "ללקוחות-קיימים: תכנן מסלול-הגירה ל-SAP Asset Manager.",
            "לפרויקטים חדשים: התחל ישירות ב-Asset Manager.",
          ],
          interviewHe: [
            { qHe: "על איזו פלטפורמה רץ SAP Work Manager?", aHe: "על SAP Mobile Platform (SMP) עם מנוע Agentry — בשונה מ-SAP Asset Manager שמבוסס SAP BTP ו-MDK." },
            { qHe: "האם מעבר מ-Work Manager ל-Asset Manager הוא שדרוג?", aHe: "לא — זהו פרויקט-הגירה, כי מודל-הפיתוח שונה (Agentry מול OData/MDK)." },
          ],
          takeawaysHe: [
            "Work Manager = דור-קודם מבוסס SMP/Agentry.",
            "תומך offline מלא אך בדעיכה.",
            "המעבר ל-Asset Manager הוא הגירה, לא שדרוג.",
          ],
        },
        {
          id: "9.2.3",
          titleHe: "SAP Asset Manager",
          titleEn: "SAP Asset Manager",
          execHe:
            "SAP Asset Manager הוא פתרון האחזקה-הניידת הנוכחי של SAP: אפליקציה native (iOS/Android) מבוססת SAP Mobile Development Kit, עם backend ב-SAP BTP ו-OData offline אל S/4HANA Asset Management. הוא הסטנדרט לפרויקטים-חדשים, ותומך באחזקה, מלאי, מדידות וגיאו-מיקום.",
          beginnerHe:
            "Asset Manager הוא אפליקציית-האחזקה המודרנית של SAP לטלפון/טאבלט. נראית כמו אפליקציה רגילה, עובדת offline, ומסתנכרנת לענן (SAP BTP) ומשם ל-S/4HANA. זה מה שתממש בפרויקט חדש.",
          consultantHe:
            "Asset Manager בנוי על SAP Mobile Development Kit (MDK) — שכבת-metadata המאפשרת התאמה ללא קומפילציה — מול SAP Mobile Services ב-BTP. הסנכרון הוא OData offline (defining requests) אל S/4HANA. הוא תומך ב-Work Orders/Operations/Notifications/Measurement Points, mobile inventory, attachments, map/geolocation, ו-RFID/NFC. ההתאמה נעשית דרך MDK metadata + BTP, מה שהופך אותו ל-cloud-native וקל-עדכון לעומת Agentry.",
          purposeHe:
            "לספק אחזקה-ניידת מודרנית, ניתנת-להתאמה וקלת-תחזוקה, המנצלת BTP ו-OData-offline ומשתלבת ב-Intelligent Asset Management.",
          processExampleHe:
            "טכנאי מקבל פק\"ע ב-Asset Manager, מנווט לנכס במפה, סורק RFID, מבצע, מתעד מדידות ותמונות, מושך-חלף מ-mobile inventory, מדווח-זמן ומאשר — offline אם צריך — והכל מסתנכרן דרך BTP ל-S/4HANA.",
          cbcHe:
            "ב-CBC: SAP Asset Manager הוא הסטנדרט לטכנאי-קווי-המילוי; משולב עם RFID לזיהוי-מכונה, geolocation לאיתור נכסים במתחם, ו-mobile inventory לחלפים — תומך עבודה offline במחסני-קירור.",
          navHe: [
            "SAP Asset Manager (app) ► My Work Orders / Map / Inventory",
            "SAP BTP ► Mobile Services ► Asset Manager ► Offline OData",
            "BTP ► destinations ► S/4HANA Asset Management",
          ],
          tables: ["AUFK", "AFVC", "AFRU", "IMRG", "EQUI"],
          tcodes: ["IW31", "IW41", "IK11", "CO11N"],
          fiori: ["F2949"],
          configHe: [
            "הקם Mobile Services ב-SAP BTP והגדר destination ל-S/4HANA.",
            "הגדר offline OData (defining requests) ל-scope-הנתונים.",
            "התאם UI דרך MDK metadata; הפעל RFID/NFC, map ו-mobile inventory.",
          ],
          mistakesHe: [
            "scope-OData רחב ➔ מכשיר כבד.",
            "התעלמות מ-MDK metadata ➔ פיתוח native מיותר.",
            "אי-הגדרת offline ➔ כשל באזורי-ללא-רשת.",
          ],
          troubleshootHe: [
            "פק\"ע לא יורדת ➔ defining request / authorization.",
            "סנכרון נכשל ➔ destination/log ב-Mobile Services.",
            "map ריקה ➔ geolocation על Equipment חסר.",
          ],
          bestPracticeHe: [
            "התאם דרך MDK metadata לפני קוד native.",
            "צמצם offline scope; תכנן conflict resolution.",
            "שלב RFID + geolocation + mobile inventory לחוויה מלאה.",
          ],
          interviewHe: [
            { qHe: "על מה מבוסס SAP Asset Manager?", aHe: "על SAP Mobile Development Kit (MDK) ל-frontend, SAP Mobile Services ב-BTP ל-backend, ו-OData offline אל S/4HANA Asset Management." },
            { qHe: "מהו יתרון MDK?", aHe: "התאמה מבוססת-metadata ללא קומפילציה/פיתוח native, מה שהופך עדכונים והתאמות לזריזים וניתנים-לתחזוקה." },
          ],
          takeawaysHe: [
            "Asset Manager = הסטנדרט הנוכחי, native + BTP + MDK.",
            "OData offline אל S/4HANA Asset Management.",
            "תומך RFID, geolocation, mobile inventory ומדידות.",
          ],
          relatedHe: [
            { labelHe: "PM · RFID (9.2.4)", href: "/library/pmu/chapter-09/#sub-9.2.4" },
            { labelHe: "PM · SAP Intelligent Asset Management (9.3)", href: "/library/pmu/chapter-09/#sub-9.3" },
          ],
        },
        {
          id: "9.2.4",
          titleHe: "RFID",
          titleEn: "RFID",
          execHe:
            "RFID (Radio-Frequency Identification) מאפשר זיהוי-נכס אוטומטי בקריאת תג אלחוטי, ללא קו-ראייה. ב-PM הוא מקשר תג פיזי ל-Equipment, מאיץ זיהוי בשטח, מונע דיווח על נכס-שגוי, ומשמש למעקב-נכסים ולספירת-מלאי-חלפים.",
          beginnerHe:
            "RFID הוא תג קטן על המכונה שאפשר 'לקרוא' עם סורק/טלפון — בלי לכוון מצלמה כמו בברקוד. הסריקה אומרת מיד לאיזה Equipment אתה ניגש, כך שלא תדווח בטעות על מכונה אחרת. בעצם הברקוד החכם והאלחוטי של עולם-הנכסים.",
          consultantHe:
            "תג-RFID נושא מזהה (EPC/UID) הממופה ל-Equipment ב-S/4HANA. הקורא (handheld/fixed/NFC בטלפון) מעביר את ה-UID לאפליקציה (Asset Manager/Work Manager) שמתרגמת ל-Equipment ופותחת הקשר. ארכיטקטונית אפשר לשלב reader-middleware או קריאה ישירה ב-NFC. שיקולים: תדר (LF/HF/UHF), סביבה (מתכת/נוזל מפריעים), ו-mapping/governance של תגים↔נכסים.",
          purposeHe:
            "לבטל זיהוי-ידני שגוי, להאיץ פתיחת-הקשר בשטח, לאפשר מעקב ואינוונטריזציה אוטומטיים — ולשפר את אמינות היסטוריית-הנכס.",
          processExampleHe:
            "טכנאי מקרב טלפון לתג-NFC על משאבה; ה-UID מתורגם ל-Equipment, ו-Asset Manager פותח את פק\"ע הפתוחה והיסטוריה — בלי חיפוש-ידני ובלי סיכון לבלבול בין מכונות זהות.",
          cbcHe:
            "ב-CBC: עשרות מנועים וראשי-מילוי זהים-למראה על אותו קו; תגי-RFID מבטיחים שהטכנאי מדווח על ה-Equipment הנכון, וספירת-מלאי-חלפים במחסן-הקירור נעשית בסריקה מהירה.",
          navHe: [
            "Mobile app ► Scan RFID/NFC ► Equipment context",
            "S/4HANA ► Equipment ► technical identification (tag ↔ Equipment mapping)",
          ],
          tables: ["EQUI", "EQBS", "OBJK"],
          tcodes: ["IE03", "IE02", "IK11"],
          fiori: ["F2949"],
          configHe: [
            "מפה תג-RFID (EPC/UID) ל-Equipment.",
            "בחר תדר (LF/HF/UHF) מתאים לסביבה (מתכת/נוזל).",
            "הגדר באפליקציה תרגום-סריקה ל-Equipment והקשר.",
          ],
          mistakesHe: [
            "תדר לא מתאים לסביבת-מתכת/נוזל ➔ קריאות-כושלות.",
            "אי-תחזוקת mapping תג↔Equipment ➔ זיהוי-שגוי.",
          ],
          troubleshootHe: [
            "תג לא נקרא ➔ תדר/סביבה/קורא לא תואמים.",
            "סריקה מחזירה Equipment שגוי ➔ mapping מיושן.",
          ],
          bestPracticeHe: [
            "בחר UHF/HF לפי הסביבה התעשייתית.",
            "נהל governance של תגים↔נכסים כחלק מנתוני-האב.",
            "שלב RFID עם Asset Manager לזיהוי-הקשר מיידי.",
          ],
          interviewHe: [
            { qHe: "מה היתרון של RFID על ברקוד באחזקה?", aHe: "קריאה אלחוטית ללא קו-ראייה, עמידות-סביבתית טובה יותר, וזיהוי מהיר של נכסים זהים-למראה — מונע דיווח על Equipment שגוי." },
            { qHe: "כיצד RFID מתחבר ל-Equipment ב-SAP?", aHe: "ה-UID/EPC של התג ממופה ל-Equipment; סריקה מתרגמת את ה-UID ל-Equipment ופותחת את ההקשר באפליקציה הניידת." },
          ],
          takeawaysHe: [
            "RFID = זיהוי-נכס אלחוטי וללא קו-ראייה.",
            "התג ממופה ל-Equipment; הסריקה פותחת הקשר.",
            "מונע דיווח-שגוי ומאיץ עבודה בשטח.",
          ],
        },
      ],
    },
    // ============================================================ 9.3
    {
      id: "9.3",
      titleHe: "SAP Intelligent Asset Management",
      titleEn: "SAP Intelligent Asset Management",
      execHe:
        "SAP Intelligent Asset Management (IAM) הוא חבילת-פתרונות ענניים (SAP BTP) ההופכת אחזקה מ-'תיקון תקלות' ל-'ניהול-נכס חכם ומבוסס-נתונים': יסוד-נתונים משותף (Asset Central Foundation), רשת-נכסים שיתופית (SAP Asset Intelligence Network — AIN), אסטרטגיה וביצועים (SAP Asset Strategy and Performance Management — ASPM), אחזקה-חזויית (SAP Predictive Maintenance and Service — PdMS), ותובנות-הנדסיות (SAP Predictive Engineering Insights — PEI). המטרה: להאריך חיי-נכס, להפחית עצירות לא-מתוכננות, ולעבור מ-Reactive ל-Predictive.",
      beginnerHe:
        "Intelligent Asset Management הוא 'המוח החכם' שמעל ה-PM הקלאסי. במקום רק לתקן כשמשהו נשבר, המערכת אוספת נתונים מהמכונות (חיישנים), מנתחת אותם, ומנבאת תקלות לפני שהן קורות. החבילה כוללת כמה מוצרים: בסיס-נתונים משותף, רשת לשיתוף-מידע עם יצרנים, ניהול-אסטרטגיית-אחזקה, ניבוי-תקלות וניתוח-הנדסי. הכל בענן.",
      consultantHe:
        "IAM רץ על SAP BTP ובנוי סביב Asset Central Foundation (ACF) — מודל-נתוני-נכס משותף (Equipment/Model/Location/Indicator) המסונכרן עם S/4HANA Asset Management. מעליו: AIN (collaboration ודיגיטל-טווין בין מפעיל ליצרן), ASPM (RCM/FMEA, maintenance strategy, RAMS, criticality), PdMS (anomaly detection, scoring, ML על indicators/sensor data, יצירת notification/order אוטומטית), ו-PEI (Predictive Engineering Insights — fleet analytics ו-engineering models). האינטגרציה ל-S/4HANA היא דו-כיוונית: master-data sync ויצירת PM objects מתובנות.",
      purposeHe:
        "לחבר נתוני-חיישנים, היסטוריית-אחזקה וידע-הנדסי לכדי החלטות: מתי להתערב, על מה, ובאיזו אסטרטגיה — כדי למקסם זמינות-נכס במינימום-עלות, ולסגור את הלולאה חזרה ל-PM הביצועי ב-S/4HANA.",
      processExampleHe:
        "חיישן-רטט מזין indicator ב-Asset Central Foundation; PdMS מזהה anomaly מול baseline, מחשב health-score יורד, ויוצר אוטומטית Maintenance Notification ב-S/4HANA; ASPM מצליב מול ה-FMEA וממליץ על שינוי-אסטרטגיה; AIN מאפשר לשתף את התקלה עם היצרן לקבלת המלצה.",
      cbcHe:
        "ב-CBC: קווי-המילוי מצוידים בחיישני-רטט וטמפרטורה; IAM אוסף indicators ל-ACF, PdMS חוזה כשל-מסב במילֵא לפני עצירת-קו, ASPM מנהל את אסטרטגיית-האחזקה לכל סוג-קו, ו-AIN משתף נתוני-ביצועים עם יצרן-המכונה.",
      navHe: [
        "SAP BTP ► Intelligent Asset Management ► Asset Central Foundation",
        "IAM ► AIN / ASPM / PdMS / PEI launchpad",
        "S/4HANA ► Asset Management ► IAM integration (master-data sync)",
      ],
      tables: ["EQUI", "IFLOT", "IMPTT", "IMRG"],
      tcodes: ["IE03", "IK01", "IL03"],
      fiori: ["F2949", "F2972"],
      configHe: [
        "הקם Asset Central Foundation ב-BTP וסנכרן master-data מול S/4HANA.",
        "הפעל את הרכיבים הנדרשים: AIN, ASPM, PdMS, PEI.",
        "הגדר indicators/sensor integration ו-write-back של notification/order ל-S/4HANA.",
      ],
      flow: [
        { he: "חיישן מזין Indicator", code: "ACF", note: "sensor → Asset Central" },
        { he: "זיהוי-חריגה", code: "PdMS", note: "anomaly vs baseline" },
        { he: "Health Score", note: "scoring / ML" },
        { he: "המלצת-אסטרטגיה", code: "ASPM", note: "FMEA/RCM" },
        { he: "יצירת Notification/Order", code: "QMEL/AUFK", note: "write-back ל-S/4HANA" },
        { he: "שיתוף עם יצרן", code: "AIN", note: "collaboration" },
      ],
      mistakesHe: [
        "מימוש PdMS ללא master-data נקי ב-ACF ➔ תובנות-שגויות.",
        "ניתוק התובנות מ-S/4HANA ➔ ניבוי בלי פעולה (no write-back).",
        "הפעלת כל הרכיבים בבת-אחת ➔ מורכבות-יתר; עדיף בשלבים.",
      ],
      troubleshootHe: [
        "indicators לא מגיעים ➔ sensor/IoT integration אל ACF.",
        "אין notification אוטומטית ➔ write-back ל-S/4HANA לא מוגדר.",
        "master-data לא תואם ➔ sync בין ACF ל-S/4HANA.",
      ],
      bestPracticeHe: [
        "התחל מ-ACF ו-master-data נקי לפני אנליטיקה.",
        "סגור-לולאה: ודא write-back של תובנות ל-PM ב-S/4HANA.",
        "אמץ בשלבים — לרוב PdMS/ASPM לפני AIN-collaboration מלא.",
      ],
      interviewHe: [
        { qHe: "מהם רכיבי SAP Intelligent Asset Management?", aHe: "Asset Central Foundation (יסוד-נתונים), SAP Asset Intelligence Network (AIN), SAP Asset Strategy and Performance Management (ASPM), SAP Predictive Maintenance and Service (PdMS), ו-SAP Predictive Engineering Insights (PEI)." },
        { qHe: "מה תפקיד Asset Central Foundation?", aHe: "מודל-נתוני-נכס משותף ב-BTP (Equipment/Model/Indicator) המסונכרן עם S/4HANA ומשמש בסיס לכל רכיבי-IAM." },
        { qHe: "כיצד IAM סוגר-לולאה ל-PM?", aHe: "תובנות מ-PdMS/ASPM נכתבות-חזרה ל-S/4HANA כ-Notification/Order, כך שהניבוי הופך לפעולת-אחזקה ביצועית." },
      ],
      takeawaysHe: [
        "IAM = ניהול-נכס חכם ומבוסס-נתונים על SAP BTP.",
        "Asset Central Foundation הוא היסוד המשותף לכל הרכיבים.",
        "המעבר: מ-Reactive ל-Predictive עם סגירת-לולאה ל-S/4HANA.",
        "רכיבים: ACF, AIN, ASPM, PdMS, PEI.",
      ],
      relatedHe: [
        { labelHe: "PM · אחזקה ניידת (9.2)", href: "/library/pmu/chapter-09/#sub-9.2" },
        { labelHe: "אובייקט · IMPTT", href: "/library/pmu/object/IMPTT/" },
      ],
      children: [
        {
          id: "9.3.1",
          titleHe: "Asset Central Foundation",
          titleEn: "Asset Central Foundation",
          execHe:
            "Asset Central Foundation (ACF) הוא יסוד-הנתונים המשותף של SAP Intelligent Asset Management: מודל-נכס אחיד (Equipment, Model, Location, Indicator, Document) ב-SAP BTP, המסונכרן עם S/4HANA. כל רכיבי-IAM (AIN, ASPM, PdMS, PEI) נשענים עליו.",
          beginnerHe:
            "ACF הוא 'מאגר-הנכסים המשותף' שכל יתר המוצרים החכמים מתחברים אליו. הוא מחזיק את הגדרת הנכס (מה זה, איזה דגם, איפה, אילו מדדים) פעם אחת, וכולם משתמשים באותו מקור — כך שאין כפילות וכל המוצרים מדברים על אותו נכס.",
          consultantHe:
            "ACF מגדיר אובייקטים: Model (טיפוס-יצרן), Equipment (מופע פיזי), Functional Location, Indicator/Indicator Group, ו-Documents. הסנכרון מול S/4HANA Asset Management הוא דו-כיווני (master-data replication). Indicators הם הבסיס ל-sensor/IoT data ול-PdMS scoring. ה-ACF הוא ה-system of record ל-IAM ומספק APIs (OData) ל-collaboration וניתוח.",
          purposeHe:
            "לספק מקור-אמת אחד ומשותף לנתוני-נכס בענן, שעליו נבנים collaboration, אסטרטגיה וניבוי — בלי לשכפל נתוני-אב.",
          processExampleHe:
            "Equipment מ-S/4HANA מסונכרן ל-ACF כ-Equipment הקשור ל-Model; מוגדרים עליו Indicators (רטט/טמפ'); PdMS צורך את ה-Indicators, ו-AIN משתף את ה-Model עם היצרן.",
          cbcHe:
            "ב-CBC: כל מילֵא מסונכרן ל-ACF כ-Equipment תחת Model של היצרן, עם Indicators לרטט-מסב וטמפרטורה — בסיס לכל ניתוח-IAM של הקו.",
          navHe: [
            "SAP BTP ► Intelligent Asset Management ► Asset Central Foundation ► Equipment / Models / Indicators",
            "S/4HANA ► IAM integration ► master-data sync",
          ],
          tables: ["EQUI", "IFLOT", "IMPTT"],
          tcodes: ["IE03", "IL03", "IK01"],
          fiori: ["F2949"],
          configHe: [
            "הקם ACF ב-BTP והגדר destinations ל-S/4HANA.",
            "הפעל master-data replication (Equipment/Model/Location).",
            "הגדר Indicators / Indicator Groups לחיישנים.",
          ],
          mistakesHe: [
            "סנכרון נתוני-אב לא-נקיים ➔ זיהום כל רכיבי-IAM.",
            "אי-הגדרת Indicators ➔ אין בסיס ל-PdMS.",
          ],
          troubleshootHe: [
            "Equipment חסר ב-ACF ➔ replication/destination.",
            "Indicator ריק ➔ sensor integration לא מחובר.",
          ],
          bestPracticeHe: [
            "נקה master-data ב-S/4HANA לפני סנכרון.",
            "הגדר Models ו-Indicators אחידים לכלל-הצי.",
          ],
          interviewHe: [
            { qHe: "מה מאחסן Asset Central Foundation?", aHe: "מודל-נכס משותף — Models, Equipment, Functional Locations, Indicators ו-Documents — ב-BTP, מסונכרן עם S/4HANA, כיסוד לכל רכיבי-IAM." },
          ],
          takeawaysHe: [
            "ACF = system of record של IAM ב-BTP.",
            "מסונכרן דו-כיוונית עם S/4HANA.",
            "Indicators הם הבסיס ל-PdMS.",
          ],
        },
        {
          id: "9.3.2",
          titleHe: "SAP Asset Intelligence Network",
          titleEn: "SAP Asset Intelligence Network",
          execHe:
            "SAP Asset Intelligence Network (AIN) הוא רשת-נכסים שיתופית בענן המחברת מפעילים, יצרנים וספקי-שירות סביב 'דיגיטל-טווין' משותף של ציוד: מפרטים, מסמכים, הוראות-אחזקה והיסטוריה משותפים בין הצדדים — מקור-אמת אחד לכל מחזור-חיי-הנכס.",
          beginnerHe:
            "AIN הוא כמו 'רשת-חברתית לנכסים': היצרן מפרסם פעם אחת את כל המידע על דגם-מכונה (מדריכים, חלפים, הוראות-אחזקה), וכל הלקוחות שמשתמשים בו רואים אותו מעודכן. כך אתה לא מחפש PDF ישן במגירה — המידע מגיע מהיצרן עצמו.",
          consultantHe:
            "AIN בנוי על ACF: Model מתוחזק ע\"י היצרן (manufacturer-published content) ומשותף ל-Equipment של המפעילים. הוא מספק collaboration, sharing של documents/instructions/spare parts, ו-equipment digital twin. מאפשר feedback-loop בין מפעיל ליצרן (ביצועים/תקלות), ומשמש בסיס לשיפור-מוצר ולשירות מבוסס-ביצועים.",
          purposeHe:
            "לבטל איי-מידע בין יצרן למפעיל: מפרט וחומר-אחזקה תמיד עדכניים מהמקור, שיתוף-תובנות דו-כיווני, וקיצור זמן-לתיקון בזכות מידע-יצרן זמין.",
          processExampleHe:
            "יצרן-המשאבות מפרסם ב-AIN Model עם הוראות-אחזקה ורשימת-חלפים; המפעיל מקשר את ה-Equipment שלו ל-Model ומקבל את התוכן; כשמתגלה תקלה חוזרת, המפעיל משתף נתונים עם היצרן דרך הרשת.",
          cbcHe:
            "ב-CBC: יצרן-קווי-המילוי מפרסם ב-AIN את מפרטי-הקו וחלפיו; מפעלי-Coca-Cola שונים נהנים מאותו מידע-עדכני, ומשתפים נתוני-אמינות בחזרה לשיפור-המוצר.",
          navHe: [
            "SAP BTP ► IAM ► Asset Intelligence Network ► Models / Equipment / Collaboration",
            "AIN ► Documents / Instructions / Spare Parts sharing",
          ],
          tables: ["EQUI", "DRAW"],
          tcodes: ["IE03"],
          fiori: ["F2949"],
          configHe: [
            "קשר Equipment של המפעיל ל-Model המפורסם ברשת.",
            "הגדר collaboration ושיתוף-תוכן עם היצרן/ספק.",
            "הפעל feedback-loop של נתוני-ביצועים.",
          ],
          mistakesHe: [
            "אי-קישור Equipment ל-Model ➔ אין תוכן-יצרן.",
            "התעלמות מ-feedback-loop ➔ הפסד ערך-שיתוף.",
          ],
          troubleshootHe: [
            "תוכן-יצרן לא מופיע ➔ Equipment לא מקושר ל-Model.",
            "שיתוף לא עובד ➔ הרשאות-collaboration ב-AIN.",
          ],
          bestPracticeHe: [
            "קשר כל Equipment ל-Model הנכון לקבלת תוכן-יצרן.",
            "נצל את ה-feedback-loop לשיפור-אמינות.",
          ],
          interviewHe: [
            { qHe: "מהו ערך-הליבה של AIN?", aHe: "דיגיטל-טווין משותף ומקור-אמת אחד לתוכן-נכס בין יצרן למפעיל — מפרטים, הוראות-אחזקה וחלפים עדכניים, עם feedback-loop דו-כיווני." },
          ],
          takeawaysHe: [
            "AIN = רשת-נכסים שיתופית מבוססת-ACF.",
            "Model מפורסם ע\"י היצרן, משותף למפעילים.",
            "מבטל איי-מידע ומאפשר feedback-loop.",
          ],
        },
        {
          id: "9.3.3",
          titleHe: "SAP Asset Strategy and Performance Management",
          titleEn: "SAP Asset Strategy and Performance Management",
          execHe:
            "SAP Asset Strategy and Performance Management (ASPM) מנהל את אסטרטגיית-האחזקה מבוססת-הסיכון: כלי RCM/FMEA לזיהוי אופני-כשל והשלכותיהם, קביעת-קריטיות, גזירת מדיניות-אחזקה (Maintenance Strategy) ומדידת-ביצועים (RAMS/KPIs) — כדי שכל נכס יקבל את האחזקה הנכונה לרמת-הסיכון שלו.",
          beginnerHe:
            "ASPM עונה על השאלה 'איך הכי נכון לתחזק כל מכונה?'. הוא עוזר לזהות מה יכול להישבר (FMEA), כמה זה קריטי, ואיזו אחזקה הכי משתלמת — מונעת, חזויית או 'רוץ-עד-כשל'. במקום לתחזק הכל אותו דבר, מתאימים את האסטרטגיה לסיכון.",
          consultantHe:
            "ASPM מספק FMEA/RCM worksheets (failure modes, effects, criticality — RPN), criticality assessment, maintenance strategy derivation, ו-performance analytics (RAMS — Reliability/Availability/Maintainability/Safety, MTBF/MTTR). הוא בנוי על ACF ומשתלב עם PdMS (תובנות מזינות אסטרטגיה) ועם S/4HANA (אסטרטגיה מתורגמת ל-maintenance plans/task lists). הוא מהווה את שכבת-ה-decision שמעל הנתונים.",
          purposeHe:
            "להקצות משאבי-אחזקה לפי סיכון וערך: למקד אחזקה-מונעת/חזויית בנכסים-קריטיים ולחסוך בנכסים שוליים — אופטימיזציה של עלות מול זמינות.",
          processExampleHe:
            "צוות-אמינות מבצע FMEA למילֵא, מזהה 'כשל-מסב' כ-RPN גבוה, קובע אסטרטגיה חזויית למסבים ומונעת לאטמים; ASPM גוזר maintenance strategy שמתורגמת ל-task lists ב-S/4HANA ומודד MTBF להמשך-שיפור.",
          cbcHe:
            "ב-CBC: ASPM מנהל אסטרטגיה לכל סוג-קו; מסבים קריטיים = אחזקה-חזויית (PdMS), רכיבים-זולים = run-to-failure; KPIs (MTBF/availability) למילֵאים מנחים את התקציב.",
          navHe: [
            "SAP BTP ► IAM ► Asset Strategy and Performance Management ► FMEA / Strategy / Performance",
            "ASPM ► Criticality / RAMS analytics",
          ],
          tables: ["EQUI", "MPLA", "MHIS"],
          tcodes: ["IP01", "IP10", "IA05"],
          fiori: ["F2972"],
          configHe: [
            "בצע FMEA/RCM וקבע criticality ל-Equipment/Model.",
            "גזור Maintenance Strategy ותרגם ל-task lists/plans ב-S/4HANA.",
            "הגדר RAMS/KPIs (MTBF/MTTR/availability) למדידה.",
          ],
          mistakesHe: [
            "אסטרטגיה אחידה לכל הנכסים ➔ בזבוז/סיכון.",
            "FMEA חד-פעמי שלא מתעדכן ➔ אסטרטגיה מתיישנת.",
          ],
          troubleshootHe: [
            "אסטרטגיה לא מתורגמת ל-task list ➔ integration ל-S/4HANA.",
            "KPIs לא מחושבים ➔ נתוני-היסטוריה/RAMS חסרים.",
          ],
          bestPracticeHe: [
            "התאם אסטרטגיה לקריטיות — לא 'one size fits all'.",
            "סקור FMEA ו-KPIs מחזורית; הזן תובנות-PdMS חזרה לאסטרטגיה.",
          ],
          interviewHe: [
            { qHe: "מה עושה ASPM?", aHe: "מנהל אסטרטגיית-אחזקה מבוססת-סיכון: FMEA/RCM, קריטיות, גזירת maintenance strategy ומדידת-ביצועים (RAMS/MTBF), בתרגום ל-plans/task-lists ב-S/4HANA." },
            { qHe: "כיצד ASPM ו-PdMS מתחברים?", aHe: "תובנות-PdMS (anomalies/health) מזינות את האסטרטגיה ב-ASPM, וההחלטה האסטרטגית מכוונת אילו נכסים יקבלו אחזקה חזויית." },
          ],
          takeawaysHe: [
            "ASPM = שכבת-ההחלטה האסטרטגית של IAM.",
            "FMEA/RCM + criticality + RAMS = אחזקה לפי סיכון.",
            "מתורגם ל-plans/task-lists ב-S/4HANA.",
          ],
        },
        {
          id: "9.3.4",
          titleHe: "SAP Predictive Maintenance and Service",
          titleEn: "SAP Predictive Maintenance and Service",
          execHe:
            "SAP Predictive Maintenance and Service (PdMS) הופך נתוני-חיישנים לתובנות-פעולה: זיהוי-חריגות (anomaly detection), חישוב health-score, ומודלים חזויים על indicators/IoT data — שמהם נוצרות אוטומטית Notification/Order ב-S/4HANA לפני שהכשל קורה. זה הלב ה-Predictive של IAM.",
          beginnerHe:
            "PdMS הוא ה'נביא': הוא קורא את החיישנים (רטט, טמפ', לחץ), לומד מה 'נורמלי', ומתריע כשמשהו מתחיל לסטות — עוד לפני שהמכונה נשברת. במקום לתקן אחרי-תקלה או לפי-לוח-זמנים קבוע, מתערבים בדיוק בזמן הנכון.",
          consultantHe:
            "PdMS בנוי על ACF Indicators: הוא קולט sensor/IoT streams (דרך IoT integration), מריץ anomaly detection (rule-based + ML), scoring ו-alerts, ויוצר write-back ל-S/4HANA (Notification/Order) או ל-AIN. תומך ב-condition-based maintenance, predictive scenarios ו-machine-learning models. ה-loop נסגר: sensor → indicator → anomaly → health → PM action, עם משוב לאסטרטגיה ב-ASPM.",
          purposeHe:
            "לעבור מ-time-based ל-condition/predictive maintenance: להתערב לפי-מצב-אמיתי, להפחית עצירות לא-מתוכננות ועלויות, ולהאריך חיי-נכס.",
          processExampleHe:
            "חיישן-רטט מזין Indicator; PdMS מזהה anomaly מול baseline, ה-health-score צונח, נוצרת אוטומטית Maintenance Notification ב-S/4HANA, מתכנן ממיר להזמנה ומתזמן — הכשל נמנע לפני עצירת-הקו.",
          cbcHe:
            "ב-CBC: PdMS מנטר מסבים ומנועים בקווי-המילוי; חיזוי כשל-מסב במילֵא יוצר התראה ופק\"ע מתוכננת בין-משמרות — נמנעת עצירת-קו בשיא-הייצור.",
          navHe: [
            "SAP BTP ► IAM ► Predictive Maintenance and Service ► Indicators / Anomalies / Alerts",
            "PdMS ► write-back ► S/4HANA Notification/Order",
          ],
          tables: ["IMPTT", "IMRG", "QMEL", "AUFK"],
          tcodes: ["IK01", "IK11", "IW21", "IW31"],
          fiori: ["F2949", "F2972"],
          configHe: [
            "חבר sensor/IoT streams ל-ACF Indicators.",
            "הגדר anomaly detection (rules/ML), thresholds ו-scoring.",
            "הגדר write-back ל-S/4HANA (Notification/Order) ול-ASPM.",
          ],
          flow: [
            { he: "קליטת-חיישן", code: "Indicator", note: "IoT → ACF" },
            { he: "זיהוי-חריגה", note: "anomaly vs baseline" },
            { he: "Health Score", note: "scoring / ML" },
            { he: "התראה", note: "alert" },
            { he: "Notification/Order", code: "QMEL/AUFK", note: "write-back" },
          ],
          mistakesHe: [
            "מודל ללא baseline/היסטוריה מספקת ➔ false positives.",
            "ניבוי בלי write-back ➔ תובנה ללא פעולה.",
            "thresholds לא-מכוילים ➔ הצפת-התראות או החמצה.",
          ],
          troubleshootHe: [
            "אין anomalies ➔ sensor integration / threshold גבוה מדי.",
            "אין Notification ➔ write-back ל-S/4HANA לא מוגדר.",
            "false positives ➔ baseline/מודל דורש כיול.",
          ],
          bestPracticeHe: [
            "התחל מ-condition-based (rules) לפני ML מורכב.",
            "כייל thresholds מול היסטוריה; סגור-לולאה ל-S/4HANA.",
            "הזן ביצועים בחזרה ל-ASPM לעדכון-אסטרטגיה.",
          ],
          interviewHe: [
            { qHe: "מה עושה PdMS?", aHe: "ממיר נתוני-חיישנים לתובנות: anomaly detection, health-scoring ומודלים חזויים על Indicators, ויוצר write-back של Notification/Order ל-S/4HANA לפני הכשל." },
            { qHe: "מהי הלולאה הסוגרת של PdMS?", aHe: "sensor → Indicator (ACF) → anomaly → health-score → Notification/Order ב-S/4HANA, עם משוב-ביצועים חזרה ל-ASPM." },
          ],
          takeawaysHe: [
            "PdMS = הלב ה-Predictive של IAM.",
            "מבוסס ACF Indicators + IoT + anomaly/ML.",
            "סוגר-לולאה ל-S/4HANA כ-Notification/Order.",
          ],
          relatedHe: [
            { labelHe: "PM · ASPM (9.3.3)", href: "/library/pmu/chapter-09/#sub-9.3.3" },
          ],
        },
        {
          id: "9.3.5",
          titleHe: "SAP Predictive Engineering Insights",
          titleEn: "SAP Predictive Engineering Insights",
          execHe:
            "SAP Predictive Engineering Insights (PEI) מוסיף שכבת-הנדסה מתקדמת ל-IAM: שילוב מודלים-הנדסיים (physics-based / simulation / engineering analytics) עם נתוני-תפעול, לחיזוי-ביצועים ו-remaining-useful-life ברמת-מהנדס — מעבר ל-anomaly detection בלבד.",
          beginnerHe:
            "PEI הוא הצעד-המתקדם: לא רק 'משהו חריג', אלא מודל-הנדסי שמבין איך המכונה עובדת פיזיקלית, ומחשב כמה חיים נשארו לרכיב או איך לשפר ביצועים. זה כלי למהנדסי-אמינות, לא רק לטכנאי.",
          consultantHe:
            "PEI משלב engineering models (כולל physics/simulation, לעיתים בשילוב שותפים כמו ANSYS) עם operational/sensor data מ-ACF ו-PdMS, ל-fleet-level analytics, remaining-useful-life (RUL) ו-engineering-grade insights. הוא מאפשר למהנדסים לבנות ולהריץ מודלים מתקדמים מעבר ל-rule/ML הסטנדרטי, ולהזין את התובנות חזרה ל-ASPM/PdMS ול-AIN.",
          purposeHe:
            "להעמיק את הניבוי מ-'חריגה' ל-'הבנה-הנדסית': RUL, אופטימיזציית-ביצועים וניתוח-צי — לתמיכה בהחלטות-הנדסה ושיפור-מוצר.",
          processExampleHe:
            "מהנדס-אמינות מריץ מודל-הנדסי ב-PEI המשלב נתוני-עומס ורטט מ-ACF, מחשב remaining-useful-life למסב, ומזין את התובנה ל-ASPM לעדכון-אסטרטגיה ול-AIN לשיתוף עם היצרן.",
          cbcHe:
            "ב-CBC: PEI מנתח את צי-המילֵאים, מחשב RUL למסבים תחת פרופיל-העומס האמיתי של כל קו, וממליץ על מועד-החלפה אופטימלי — מדויק יותר מ-'חריגה' גרידא.",
          navHe: [
            "SAP BTP ► IAM ► Predictive Engineering Insights ► Engineering Models / RUL",
            "PEI ► fleet analytics ► feedback ל-ASPM/AIN",
          ],
          tables: ["EQUI", "IMPTT"],
          tcodes: ["IE03", "IK01"],
          fiori: ["F2972"],
          configHe: [
            "שלב engineering/physics models עם operational data מ-ACF.",
            "הגדר fleet analytics ו-remaining-useful-life.",
            "הזן תובנות חזרה ל-ASPM/PdMS ול-AIN.",
          ],
          mistakesHe: [
            "מודל-הנדסי ללא נתוני-תפעול אמיתיים ➔ RUL לא-מהימן.",
            "בידוד PEI מ-ASPM/PdMS ➔ תובנות שלא הופכות לפעולה.",
          ],
          troubleshootHe: [
            "RUL לא הגיוני ➔ נתוני-עומס/חיישן חסרים או מודל לא-מכויל.",
            "תובנה לא מגיעה ל-ASPM ➔ integration/feedback חסר.",
          ],
          bestPracticeHe: [
            "הזן למודלים נתוני-תפעול אמיתיים, לא הנחות בלבד.",
            "חבר PEI ל-ASPM/PdMS לסגירת-לולאת-החלטה.",
          ],
          interviewHe: [
            { qHe: "במה PEI שונה מ-PdMS?", aHe: "PdMS מזהה חריגות וחוזה מבוסס rules/ML; PEI מוסיף מודלים-הנדסיים (physics/simulation) המחשבים remaining-useful-life וביצועים ברמת-מהנדס, מעבר ל-anomaly detection." },
          ],
          takeawaysHe: [
            "PEI = שכבת-הנדסה מתקדמת של IAM.",
            "משלב engineering models עם נתוני-תפעול ל-RUL ו-fleet analytics.",
            "מזין תובנות חזרה ל-ASPM/PdMS/AIN.",
          ],
        },
      ],
    },
    // ============================================================ 9.4
    {
      id: "9.4",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק 9 הראה כיצד שלושה גלי-טכנולוגיה משנים את אחזקת-המפעל: ממשק-משתמש חדש (SAP Fiori, SAP 3D Visual Enterprise, Quick Views), אחזקה ניידת (SAP Work Manager → SAP Asset Manager, RFID), ואחזקה-חכמה מבוססת-נתונים (SAP Intelligent Asset Management — Asset Central Foundation, AIN, ASPM, PdMS, PEI). יחד הם מעבירים את ה-PM מ-Reactive ל-Predictive, מהמשרד אל השטח, ומ-טקסט אל הקשר ויזואלי וניתוחי.",
      beginnerHe:
        "סיכום הפרק במשפט: SAP הופך את האחזקה לקלה יותר (Fiori וממשק חדש), ניידת יותר (אפליקציות בשטח + RFID), וחכמה יותר (חיישנים שמנבאים תקלות). מתחיל צריך לזכור את שלוש המשפחות: ממשק, ניידות, ובינה-נכסים — ובכל משפחה את שמות-המוצרים העיקריים.",
      consultantHe:
        "מבחינת-יועץ: ה-UI מבוסס Fiori/SAPUI5/OData; הניידות עברה מ-SAP Mobile Platform/Agentry (Work Manager) ל-SAP BTP/MDK/OData-offline (Asset Manager); וה-IAM בנוי על Asset Central Foundation ב-BTP עם סנכרון דו-כיווני ל-S/4HANA וסגירת-לולאה (PdMS/ASPM/PEI → Notification/Order). מסר-המימוש: master-data נקי ב-ACF, offline-first בנייד, ו-write-back שסוגר את הלולאה — הם ההבדל בין הדגמה לבין ערך-תפעולי.",
      purposeHe:
        "לקשור את שלושת הגלים לתמונה אחת: ממשק טוב מאיץ עבודה, ניידות מעבירה אותה לשטח, ובינת-נכסים הופכת אותה לחזויית — שלושתם משלימים, לא מתחרים.",
      processExampleHe:
        "תרחיש-קצה-לקצה: PdMS חוזה כשל-מסב (IAM) → נוצרת Notification ב-S/4HANA → המתכנן מטפל ב-Fiori → הטכנאי מקבל פק\"ע ב-SAP Asset Manager בשטח, סורק RFID, רואה מודל 3D, מבצע ומאשר offline → ההיסטוריה מזינה חזרה את ASPM/PEI.",
      cbcHe:
        "ב-CBC: קו-מילוי 'חכם' — חיישנים מזינים IAM, PdMS חוזה כשל-מסב, Notification נפתחת, טכנאי מקבל פק\"ע ב-Asset Manager עם מודל-3D ו-RFID, מתקן בין-משמרות, וה-ASPM מעדכן אסטרטגיה — לולאה שלמה שמונעת עצירת-קו.",
      navHe: [
        "Fiori Launchpad ► Maintenance (UI)",
        "SAP Asset Manager (mobile) ► RFID (ניידות)",
        "SAP BTP ► Intelligent Asset Management (בינת-נכסים)",
      ],
      tables: ["EQUI", "IFLOT", "AUFK", "IMPTT", "QMEL"],
      tcodes: ["/UI2/FLP", "IW31", "IK01", "IW21"],
      fiori: ["F2949", "F2972", "F1827"],
      configHe: [
        "UI: הפעל Fiori (services/roles), קשר מודלי-3D דרך DMS.",
        "ניידות: SAP Asset Manager ב-BTP, offline OData, RFID mapping.",
        "IAM: ACF master-data sync + הפעלת AIN/ASPM/PdMS/PEI + write-back.",
      ],
      mistakesHe: [
        "התייחסות לשלושת הגלים כפרויקטים-נפרדים ➔ הפסד הסינרגיה.",
        "ניבוי (IAM) ללא ניידות ➔ תובנה שלא מגיעה לטכנאי בשטח.",
        "ניידות ללא write-back/IAM ➔ דיווח בלי חיזוי.",
      ],
      troubleshootHe: [
        "הלולאה לא נסגרת ➔ אחת החוליות (UI/ניידות/IAM) לא מחוברת ל-S/4HANA.",
        "אימוץ נמוך ➔ Business Roles/scope לא מותאמים לתפקיד.",
      ],
      bestPracticeHe: [
        "תכנן את שלושת הגלים כמערכת אחת עם S/4HANA במרכז.",
        "התחל מ-master-data נקי ו-offline-first; הוסף ניבוי בשלבים.",
        "מדוד אימוץ וערך-תפעולי, לא רק התקנה.",
      ],
      interviewHe: [
        { qHe: "מהם שלושת גלי-הטכנולוגיה בפרק זה?", aHe: "ממשק-משתמש חדש (SAP Fiori / SAP 3D Visual Enterprise / Quick Views), אחזקה ניידת (SAP Work Manager → SAP Asset Manager, RFID), ו-SAP Intelligent Asset Management (ACF, AIN, ASPM, PdMS, PEI)." },
        { qHe: "כיצד שלושת הגלים משתלבים בלולאה אחת?", aHe: "IAM חוזה ויוצר Notification ב-S/4HANA, Fiori מנהל, ו-Asset Manager הנייד מבצע בשטח עם RFID/3D — וההיסטוריה מזינה חזרה את האסטרטגיה והמודלים." },
        { qHe: "מהו מסר-המימוש המרכזי?", aHe: "master-data נקי ב-ACF, offline-first בנייד, ו-write-back שסוגר את הלולאה ל-S/4HANA — אלה ההבדל בין הדגמה לערך-תפעולי." },
      ],
      takeawaysHe: [
        "שלושה גלים: ממשק, ניידות, בינת-נכסים — משלימים.",
        "המגמה: מ-Reactive ל-Predictive, מהמשרד אל השטח.",
        "S/4HANA במרכז; הלולאה נסגרת ב-write-back.",
        "ערך אמיתי = master-data נקי + offline-first + אימוץ.",
      ],
      relatedHe: [
        { labelHe: "PM · טכנולוגיות בממשק (9.1)", href: "/library/pmu/chapter-09/#sub-9.1" },
        { labelHe: "PM · אחזקה ניידת (9.2)", href: "/library/pmu/chapter-09/#sub-9.2" },
        { labelHe: "PM · Intelligent Asset Management (9.3)", href: "/library/pmu/chapter-09/#sub-9.3" },
      ],
    },
  ],
};
