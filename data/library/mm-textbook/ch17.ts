// ===== MM Digital Textbook — Chapter 17 (Academy Template, validated) =====
// Customizing the User Interface — every node is a complete LearningNode with
// 18 facets of authored Hebrew (beginner + consultant friendly). Hierarchy and
// ids preserved from source; SAP identifiers verbatim English. CBC context =
// Coca-Cola bottling procurement users on the SAP Fiori launchpad.
import type { TextbookChapter } from "./types";

export const CH17: TextbookChapter = {
  n: 17,
  titleHe: "התאמת ממשק-המשתמש",
  titleEn: "Customizing the User Interface",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה להתאמת ממשק-המשתמש ב-SAP S/4HANA עבור משתמשי הרכש. כל תת-פרק וכל תת-סעיף הורחב ליחידה עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. הפרק מכסה את האפשרויות SAP Fiori מול SAP GUI, את התקנת ה-SAP Fiori launchpad בשתי תצורות פריסה (embedded ו-central hub), את ה-Fiori Apps Reference Library, ואת ההתאמה האישית דרך edit mode והגדרות-המשתמש. המטרה: לדעת להעמיד ולהתאים launchpad תקין למשתמשי הרכש ב-CBC ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 17.1
    {
      id: "17.1",
      titleHe: "אפשרויות ממשק-המשתמש ב-SAP S/4HANA",
      titleEn: "User Interface Options in SAP S/4HANA",
      execHe:
        "ל-SAP S/4HANA שני ממשקי-משתמש עיקריים: SAP Fiori — חוויית-העל המודרנית, מבוססת-דפדפן, role-based — ו-SAP GUI הקלאסי. הבחירה אינה 'או/או': רוב הארגונים מריצים את שניהם זה לצד זה, כאשר ה-SAP Fiori launchpad הוא נקודת-הכניסה הראשית, ומשם נפתחות גם אפליקציות Fiori מודרניות וגם טרנזקציות GUI קלאסיות. הבנת שתי האפשרויות היא תנאי לתכנון חוויית-משתמש נכונה.",
      beginnerHe:
        "ל-SAP יש שתי 'דרכים להיכנס פנימה'. הראשונה, SAP Fiori, נראית כמו אתר מודרני עם אריחים (tiles) צבעוניים שכל אחד פותח משימה. השנייה, SAP GUI, היא התוכנה הקלאסית של SAP עם מסכים אפורים וקודי-טרנזקציה (כמו ME21N). שתיהן מדברות עם אותו S/4HANA מאחורי הקלעים — רק המראה והדרך שונים. משתמש-רכש יכול לפתוח את אותה הזמנת-רכש דרך אריח Fiori או דרך טרנזקציית GUI.",
      consultantHe:
        "SAP Fiori היא שכבת-UX מבוססת SAPUI5 הרצה בדפדפן, נשענת על OData services ומוגשת דרך ה-SAP Fiori launchpad (FLP). SAP GUI הוא ה-client הקלאסי (עבה/HTML/Java) המריץ Dynpros. ב-S/4HANA כל טרנזקציית GUI יכולה להיעטף כ-GUI tile ב-launchpad, כך ש-FLP הופך ל-single point of entry. ההחלטה הארכיטקטונית המרכזית היא איזו תצורת-פריסה (embedded מול central hub) משרתת את ה-FLP, ואילו תפקידים (Business Roles, PFCG) מקבלים אילו catalogs/groups/spaces.",
      purposeHe:
        "המטרה: לתת לכל תפקיד את הממשק היעיל ביותר למשימותיו — Fiori למשימות תפעוליות יומיומיות ול-analytics, GUI לטרנזקציות-עומק וקונפיגורציה — תוך שמירה על נקודת-כניסה אחת, אבטחה role-based ועקביות חוצת-ארגון.",
      processExampleHe:
        "קניין נכנס בבוקר ל-SAP Fiori launchpad בדפדפן, רואה אריחי 'Manage Purchase Orders', 'Monitor Purchase Order Items' ו-KPI של הזמנות-פתוחות. לעריכת-תנאי-מחיר מורכבת הוא לוחץ אריח שעוטף את טרנזקציית ME31K הקלאסית — וה-GUI נפתח בתוך אותו launchpad, ללא login נוסף.",
      cbcHe:
        "ב-CBC קנייני התרכיז, הסוכר וחומרי-האריזה עובדים יומיומית ב-SAP Fiori launchpad: אריחי ניהול הזמנות-רכש ומעקב-אספקה. צוות ה-master data והקונפיגורציה ממשיך ב-SAP GUI לטרנזקציות-עומק. שני הקהלים מתחברים לאותו S/4HANA.",
      navHe: [
        "SAP Fiori launchpad ► Browser URL: https://<host>/sap/bc/ui2/flp",
        "SAP GUI ► SAP Logon ► בחירת מערכת ► קוד-טרנזקציה (למשל ME21N)",
        "SAP NetWeaver ► UI Technologies ► SAP Fiori ► Overview (SPRO)",
      ],
      tables: ["AGR_USERS", "AGR_DEFINE", "USR01"],
      tcodes: ["/UI2/FLP", "SU01", "PFCG", "SICF"],
      fiori: ["F0842", "F2787"],
      configHe: [
        "SAP Fiori = role-based, מבוססת-דפדפן (SAPUI5/OData), מוגשת דרך SAP Fiori launchpad.",
        "SAP GUI = client קלאסי (Dynpros), נגיש ישירות או עטוף כ-GUI tile ב-launchpad.",
        "ההמלצה: FLP כ-single point of entry; טרנזקציות GUI נחשפות כ-tiles בעת הצורך.",
        "הקצאת-תוכן ל-UI נעשית דרך Business Roles (PFCG) — לא לכל משתמש בנפרד.",
      ],
      flow: [
        { he: "משתמש מתחבר", code: "FLP/SAP Logon", note: "דפדפן או GUI client" },
        { he: "זיהוי תפקיד", code: "PFCG", note: "Business Role" },
        { he: "טעינת תוכן", code: "Catalog/Group", note: "אריחים מותרים" },
        { he: "פתיחת אפליקציה", code: "Fiori/GUI", note: "אותו S/4HANA" },
      ],
      mistakesHe: [
        "הנחה ש-Fiori מחליפה לחלוטין את GUI — בפועל הן חיות זו-לצד-זו.",
        "מתן גישה ל-UI לכל המשתמשים ללא Business Roles — אריחים לא רלוונטיים מציפים את ה-launchpad.",
        "התעלמות מ-GUI tiles — משתמשים נאלצים לצאת מ-FLP לטרנזקציות-עומק.",
      ],
      troubleshootHe: [
        "ה-launchpad ריק ➔ למשתמש אין Business Role עם catalog/group.",
        "טרנזקציית GUI לא נפתחת מ-FLP ➔ ה-GUI tile/target-mapping חסר או SICF service כבוי.",
        "המשתמש רואה אריחים לא-רלוונטיים ➔ catalog רחב מדי משויך לתפקיד.",
      ],
      bestPracticeHe: [
        "תכנן את FLP כנקודת-כניסה אחת לשני העולמות.",
        "הקצה תוכן דרך Business Roles בלבד — מותאם לתפקיד-העבודה.",
        "הצג טרנזקציות GUI נדרשות כ-tiles במקום לשלוח משתמשים ל-SAP Logon.",
      ],
      interviewHe: [
        { qHe: "מהן שתי אפשרויות ה-UI ב-S/4HANA?", aHe: "SAP Fiori (חוויית-העל המודרנית, role-based, מבוססת-דפדפן) ו-SAP GUI הקלאסי. שתיהן ניגשות לאותו S/4HANA ולרוב פועלות במקביל." },
        { qHe: "האם Fiori מחליפה את GUI?", aHe: "לא לחלוטין. רוב טרנזקציות-העומק והקונפיגורציה עדיין ב-GUI; FLP יכול לעטוף אותן כ-GUI tiles ולשמש single point of entry." },
      ],
      takeawaysHe: [
        "שני ממשקים: SAP Fiori (מודרני, role-based) ו-SAP GUI (קלאסי).",
        "שניהם ניגשים לאותו S/4HANA; לרוב רצים במקביל.",
        "SAP Fiori launchpad הוא נקודת-הכניסה המומלצת — גם ל-GUI tiles.",
      ],
      relatedHe: [
        { labelHe: "MM · הגדרת SAP Fiori (17.2)", href: "/library/mm/chapter-17/#sub-17.2" },
        { labelHe: "MM · התאמת SAP Fiori (17.3)", href: "/library/mm/chapter-17/#sub-17.3" },
      ],
      children: [
        {
          id: "17.1.1",
          titleHe: "SAP Fiori",
          titleEn: "SAP Fiori",
          execHe:
            "SAP Fiori היא חוויית-המשתמש המודרנית של SAP — role-based, responsive, מבוססת-דפדפן ובנויה סביב משימות עסקיות ולא סביב טרנזקציות. נקודת-המוצא שלה היא ה-SAP Fiori launchpad: home page של אריחים (tiles) המאורגנים ב-groups/spaces, כל אריח פותח אפליקציה אחת. Fiori היא הכיוון האסטרטגי של SAP לכל ממשקי-המשתמש החדשים.",
          beginnerHe:
            "SAP Fiori היא ה'פנים החדשות' של SAP. במקום לזכור קודים כמו ME21N, המשתמש רואה home page עם אריחים צבעוניים: 'נהל הזמנות-רכש', 'אשר בקשות-רכש'. לוחצים אריח ונפתחת אפליקציה נקייה שעובדת גם במחשב וגם בטאבלט. כל משתמש רואה רק את האריחים שמתאימים לתפקידו.",
          consultantHe:
            "Fiori בנויה על SAPUI5 (JS/HTML5) וצורכת OData services מה-backend. שלושת סוגי-האפליקציות הקלאסיים: Transactional (יצירה/עדכון), Analytical (KPIs מבוססי-CDS/embedded analytics) ו-Fact Sheet (תצוגת-אובייקט עם ניווט). ה-launchpad מוגדר דרך catalogs (אוסף target-mappings + tiles), groups/spaces & pages (ארגון-תצוגה), ומשויך למשתמש דרך PFCG Business Role. עיצוב לפי SAP Fiori Design Guidelines וה-Horizon/Belize themes.",
          purposeHe:
            "לספק חוויית-משתמש ממוקדת-משימה, אחידה ונגישה מכל מכשיר, המפחיתה הדרכה ושגיאות ומבליטה את הפעולות הרלוונטיות לכל תפקיד.",
          processExampleHe:
            "קניין פותח אריח 'Manage Purchase Orders', מסנן לפי ספק, פותח הזמנה, מעדכן כמות ושומר — הכל באפליקציה אחת responsive, ללא קוד-טרנזקציה וללא ניווט בין מסכי-Dynpro.",
          cbcHe:
            "ב-CBC צוות-הרכש מקבל Business Role 'Buyer' עם space/page ובו אריחי ניהול-הזמנות, מעקב-אספקה ו-KPI של הזמנות-באיחור — חוויה אחת לתרכיז, סוכר ואריזה.",
          navHe: [
            "SAP NetWeaver ► UI Technologies ► SAP Fiori ► Overview",
            "SAP Fiori launchpad ► User menu ► App Finder (לגילוי אריחים מותרים)",
          ],
          tables: ["/UI2/PARAMETER", "AGR_DEFINE", "/UI2/IODATA"],
          tcodes: ["/UI2/FLP", "/UI2/FLPD_CONF", "PFCG"],
          fiori: ["F2787", "F0842"],
          configHe: [
            "סוגי-אפליקציות: Transactional, Analytical, Fact Sheet.",
            "Catalog = אוסף tiles + target mappings; Group/Space & Page = ארגון התצוגה.",
            "שיוך למשתמש דרך PFCG Business Role; עיצוב לפי Horizon theme.",
          ],
          mistakesHe: [
            "התייחסות ל-Fiori כ'תֵאם גרפי' בלבד — היא ארכיטקטורת-UX שלמה role-based.",
            "פרסום אריחים ב-catalog ללא target mapping תקין — האריח לא נפתח.",
          ],
          troubleshootHe: [
            "אריח מופיע אך לא נפתח ➔ target mapping/Intent חסר ב-catalog.",
            "אפליקציה אנליטית ריקה ➔ ה-OData/CDS service לא פעיל או חסרות הרשאות-נתונים.",
          ],
          bestPracticeHe: [
            "בנה תוכן סביב Business Roles סטנדרטיים של SAP ושכפל לפי הצורך.",
            "השתמש ב-spaces & pages (המודל המודרני) ולא ב-groups ישנים בלבד.",
          ],
          interviewHe: [
            { qHe: "מהם שלושת סוגי אפליקציות Fiori?", aHe: "Transactional (יצירה/עדכון), Analytical (KPIs מבוססי-CDS) ו-Fact Sheet (תצוגת-אובייקט)." },
            { qHe: "על מה בנויה Fiori טכנית?", aHe: "על SAPUI5 בצד-לקוח ועל OData services מול ה-backend, מוגשת דרך ה-SAP Fiori launchpad." },
          ],
          takeawaysHe: [
            "Fiori = UX מודרני role-based, מבוסס-דפדפן, ממוקד-משימה.",
            "נקודת-המוצא: ה-SAP Fiori launchpad של אריחים.",
            "שלושה סוגים: Transactional, Analytical, Fact Sheet.",
          ],
        },
        {
          id: "17.1.2",
          titleHe: "SAP GUI",
          titleEn: "SAP GUI",
          execHe:
            "SAP GUI הוא ממשק-המשתמש הקלאסי של SAP — client עבה (או HTML/Java) המריץ מסכי-Dynpro וטרנזקציות לפי קוד (ME21N, MM03). הוא נותר חיוני ב-S/4HANA לטרנזקציות-עומק, לקונפיגורציה (SPRO) ולפעולות שאין להן עדיין אפליקציית-Fiori. ב-S/4HANA אפשר לחשוף כל טרנזקציית GUI כ-GUI tile בתוך ה-SAP Fiori launchpad.",
          beginnerHe:
            "SAP GUI הוא ה'SAP הוותיק' — מסכים אפורים שבהם מקלידים קוד-טרנזקציה כדי לפתוח מסך. עדיין משתמשים בו הרבה, במיוחד למשימות מורכבות או להגדרות-מערכת. ב-S/4HANA אפשר 'לתפור' טרנזקציית GUI לתוך אריח ב-Fiori, כך שהמשתמש פותח אותה באותו launchpad.",
          consultantHe:
            "SAP GUI מגיע בשלוש צורות: SAP GUI for Windows, SAP GUI for Java, ו-SAP GUI for HTML (Web GUI דרך ITS/SICF). חשיפת טרנזקציה ב-FLP נעשית דרך target mapping מסוג 'Transaction' ב-catalog, הנשען על שירות ITS ב-SICF ועל אובייקט הטרנזקציה. ב-FLP ניתן לקבץ GUI tiles לצד Fiori tiles באותם spaces/pages לפי תפקיד.",
          purposeHe:
            "לשמר גישה לכל רוחב הפונקציונליות הקלאסית — קונפיגורציה, טרנזקציות-עומק ופעולות ללא אפליקציית-Fiori — מתוך נקודת-כניסה אחת ובאבטחה role-based.",
          processExampleHe:
            "צוות הקונפיגורציה פותח SPRO ב-SAP GUI להגדרת Document Types; קניין שצריך טרנזקציה קלאסית נדירה לוחץ GUI tile ב-launchpad וה-Web GUI נפתח דרך SICF, ללא יציאה מ-FLP.",
          cbcHe:
            "ב-CBC צוות ה-master data וה-config עובד ב-SAP GUI (SPRO, OB52). קנייני-הרכש נשארים ב-Fiori, אך מקבלים מספר GUI tiles בודדים לטרנזקציות-עומק שאין להן עדיין אפליקציה.",
          navHe: [
            "SAP Logon ► בחירת מערכת ► הזנת קוד-טרנזקציה",
            "Transaction SICF ► default_host ► sap ► bc ► gui ► sap ► its ► webgui (להפעלת Web GUI)",
          ],
          tables: ["TSTC", "TSTCT", "TADIR"],
          tcodes: ["SE93", "SICF", "SPRO", "SU01"],
          fiori: [],
          configHe: [
            "צורות: SAP GUI for Windows / for Java / for HTML (Web GUI דרך ITS+SICF).",
            "חשיפה ב-FLP: target mapping 'Transaction' ב-catalog + הפעלת SICF service webgui.",
            "האריח מקבל Semantic Object/Action ומפנה לקוד-הטרנזקציה.",
          ],
          mistakesHe: [
            "שכחת הפעלת SICF service webgui ➔ GUI tiles לא נפתחים.",
            "ניסיון להמיר כל טרנזקציה ל-Fiori מיד — חלקן עדיין נחוצות ב-GUI.",
          ],
          troubleshootHe: [
            "Web GUI מחזיר 'service not found' ➔ ה-SICF node webgui כבוי — הפעל ב-SICF.",
            "GUI tile פותח חלון ריק ➔ target mapping/ITS service שגוי או הרשאת-טרנזקציה חסרה.",
          ],
          bestPracticeHe: [
            "הפעל את שירותי ה-SICF הנדרשים פעם אחת בפריסה הראשונית.",
            "חשוף ב-FLP רק את טרנזקציות-ה-GUI שבאמת נחוצות לתפקיד.",
          ],
          interviewHe: [
            { qHe: "האם SAP GUI עדיין נחוץ ב-S/4HANA?", aHe: "כן — לקונפיגורציה (SPRO), לטרנזקציות-עומק ולפעולות ללא אפליקציית-Fiori. ניתן לחשוף אותו כ-GUI tiles ב-FLP." },
            { qHe: "מה מאפשר Web GUI ב-launchpad?", aHe: "שירות ITS המופעל ב-SICF (webgui) מאפשר להריץ טרנזקציות GUI בדפדפן כחלק מה-FLP." },
          ],
          takeawaysHe: [
            "SAP GUI = הממשק הקלאסי (Dynpros, קודי-טרנזקציה) — עדיין חיוני.",
            "שלוש צורות: Windows / Java / HTML (Web GUI דרך SICF).",
            "ניתן לחשוף טרנזקציות GUI כ-tiles ב-SAP Fiori launchpad.",
          ],
        },
      ],
    },
    // ============================================================ 17.2
    {
      id: "17.2",
      titleHe: "הגדרת SAP Fiori",
      titleEn: "Configuring SAP Fiori",
      execHe:
        "הגדרת SAP Fiori היא הצעד הטכני שהופך launchpad 'ריק' ל-launchpad מאוכלס ומאובטח. שלושת נדבכיה: התקנה והפעלה (UI components, SICF services, OData), בחירת תצורת-פריסה (embedded מול central hub), וזיהוי התוכן הנדרש דרך ה-Fiori Apps Reference Library. רק אחרי שלושה אלה אפשר להקצות catalogs ו-roles למשתמשים.",
      beginnerHe:
        "לפני שמשתמש רואה אריחים, מישהו צריך 'להדליק' את Fiori: להתקין רכיבים, להפעיל שירותים בדפדפן, ולהחליט היכן ה-launchpad יושב — באותה מערכת S/4HANA או על שרת נפרד. לבסוף בודקים בספרייה רשמית של SAP אילו אפליקציות קיימות ומה צריך כדי שכל אחת תעבוד. אחרי זה אפשר לשייך אריחים לתפקידים.",
      consultantHe:
        "ההגדרה כוללת: הפעלת UI software components ו-SAPUI5, הפעלת SICF services הרלוונטיים (/sap/bc/ui2/*, /sap/opu/odata/*), הפעלת OData services ב-/IWFND/MAINT_SERVICE, והקמת ה-FLP. החלטת-המפתח היא topology: embedded (FLP+Gateway באותה מערכת S/4HANA) מול central hub (Gateway/FLP על SAP NetWeaver/SAP Gateway נפרד). זיהוי-התוכן נעשה דרך ה-Fiori Apps Reference Library שמספקת לכל אפליקציה את ה-OData service, ה-Business Role, ה-Technical Catalog וה-UI component הדרושים.",
      purposeHe:
        "המטרה: להעמיד תשתית-Fiori יציבה ומאובטחת, לבחור topology המתאים לנוף-המערכות, ולזהות במדויק את התוכן והתלויות לכל אפליקציה — כך שהקצאת ה-roles תהיה מהירה ונטולת-ניחושים.",
      processExampleHe:
        "צוות Basis מפעיל את ה-UI components, מפעיל SICF services, מפרסם OData ב-/IWFND/MAINT_SERVICE, ובוחר embedded deployment. הצוות הפונקציונלי מחפש 'Manage Purchase Orders' ב-Fiori Apps Reference Library, מקבל את רשימת התלויות, מפעיל אותן, ומשייך את ה-Business Role לקניינים.",
      cbcHe:
        "ב-CBC נבחר embedded deployment (מערכת S/4HANA אחת לבקבוק). Basis מפעיל את שירותי ה-OData של הרכש, והצוות הפונקציונלי שואב מה-Reference Library את כל התלויות לאפליקציות-הרכש לפני העלאתן לקניינים.",
      navHe: [
        "SAP NetWeaver ► UI Technologies ► SAP Fiori ► Initial Setup / Front-End Server settings",
        "Transaction SICF ► Activate services: /sap/bc/ui2/*, /sap/opu/odata/*",
        "Transaction /IWFND/MAINT_SERVICE ► Add Service ► Activate OData",
      ],
      tables: ["/IWFND/I_MED_SRH", "/UI2/SRT_CONFIG", "AGR_DEFINE"],
      tcodes: ["SICF", "/IWFND/MAINT_SERVICE", "/UI2/FLPD_CUST", "/UI2/FLPD_CONF"],
      fiori: ["F2787"],
      configHe: [
        "הפעלת UI software components + SAPUI5 ושירותי SICF (/sap/bc/ui2/*).",
        "פרסום OData services ב-/IWFND/MAINT_SERVICE (System Alias נכון).",
        "בחירת topology: embedded מול central hub.",
        "זיהוי תוכן ותלויות דרך ה-Fiori Apps Reference Library.",
      ],
      flow: [
        { he: "הפעלת רכיבים+SICF", code: "SICF", note: "/sap/bc/ui2/*" },
        { he: "פרסום OData", code: "/IWFND/MAINT_SERVICE", note: "System Alias" },
        { he: "בחירת topology", code: "embedded/central hub" },
        { he: "זיהוי תוכן", code: "Reference Library", note: "תלויות לכל אפליקציה" },
        { he: "הקצאת roles", code: "PFCG", note: "מוכן למשתמשים" },
      ],
      mistakesHe: [
        "דילוג על הפעלת SICF services — האריחים נטענים אך נכשלים בקריאת-נתונים.",
        "בחירת topology שגוי לנוף-המערכות — central hub כשאין צורך, או embedded כשמרובות backends.",
        "פרסום OData עם System Alias שגוי — האפליקציה לא מוצאת את ה-backend.",
      ],
      troubleshootHe: [
        "אריחים ריקים מנתונים ➔ OData service לא פעיל או SICF כבוי.",
        "שגיאת 'System Alias' ➔ ה-routing ב-/IWFND/MAINT_SERVICE מצביע ל-backend לא-נכון.",
        "אפליקציה לא נטענת כלל ➔ UI component חסר או לא הופעל.",
      ],
      bestPracticeHe: [
        "תעד את ה-topology שנבחר ואת רשימת השירותים שהופעלו.",
        "השתמש תמיד ב-Fiori Apps Reference Library לפני הפעלת אפליקציה.",
        "הפעל רק את שירותי-ה-OData הנדרשים — לא הכל גורף.",
      ],
      interviewHe: [
        { qHe: "מהם שלבי הגדרת Fiori המרכזיים?", aHe: "התקנה/הפעלת רכיבים ושירותי SICF, פרסום OData (/IWFND/MAINT_SERVICE), בחירת topology (embedded/central hub), וזיהוי תוכן דרך ה-Reference Library." },
        { qHe: "מה תפקיד /IWFND/MAINT_SERVICE?", aHe: "הוספה והפעלה של OData services ב-Gateway, כולל System Alias שמכוון לאיזה backend האפליקציה פונה." },
      ],
      takeawaysHe: [
        "הגדרת Fiori = הפעלת רכיבים/SICF + OData + topology + זיהוי-תוכן.",
        "OData מופעל ב-/IWFND/MAINT_SERVICE עם System Alias נכון.",
        "ה-Fiori Apps Reference Library מספקת את כל התלויות לכל אפליקציה.",
      ],
      relatedHe: [
        { labelHe: "MM · אפשרויות ממשק (17.1)", href: "/library/mm/chapter-17/#sub-17.1" },
        { labelHe: "MM · התאמת SAP Fiori (17.3)", href: "/library/mm/chapter-17/#sub-17.3" },
      ],
      children: [
        {
          id: "17.2.1",
          titleHe: "התקנת SAP Fiori",
          titleEn: "Installing SAP Fiori",
          execHe:
            "התקנת SAP Fiori פירושה הבאת תשתית ה-launchpad למצב פעיל: הטמעת/הפעלת ה-UI software components ו-SAPUI5, הפעלת ה-SICF services הדרושים, ופרסום ה-OData services ב-/IWFND/MAINT_SERVICE. בלי שלושה אלה אין launchpad פונקציונלי, גם אם ה-roles מוגדרים.",
          beginnerHe:
            "ה'התקנה' היא להדליק את כל הנורות הנכונות. מתקינים רכיבי-תצוגה, מפעילים שירותי-אינטרנט (SICF) שמאפשרים לדפדפן לדבר עם SAP, ומפרסמים שירותי-נתונים (OData) שמזרימים את המידע לאריחים. אחרי זה ה-launchpad באמת עובד.",
          consultantHe:
            "השלבים: (1) ודא רכיבי SAP_UI/SAPUI5 ו-Fiori Front-End Server מתאימים; (2) הפעל SICF nodes תחת /sap/bc/ui2/ (flp, flp_cust), /sap/public/bc/ui2/, ושירותי ה-OData תחת /sap/opu/odata/; (3) ב-/IWFND/MAINT_SERVICE הוסף והפעל את ה-OData service עם ה-System Alias הנכון, ובדוק ICF Node + Call Browser. שגיאות-התקנה נפוצות נובעות מ-SICF כבוי או System Alias חסר.",
          purposeHe:
            "להעמיד את התשתית הטכנית שעליה יישבו כל ה-catalogs, ה-tiles וה-roles — שכבת-הבסיס לכל חוויית-Fiori.",
          processExampleHe:
            "Basis מפעיל ב-SICF את /sap/bc/ui2/flp ואת שירותי ה-OData של הרכש, ואז מוסיף ב-/IWFND/MAINT_SERVICE את שירות 'Manage Purchase Orders', מפעיל ובודק 'Call Browser' — תגובת-metadata תקינה מאשרת התקנה מוצלחת.",
          cbcHe:
            "ב-CBC Basis מפעיל פעם אחת את שירותי-הבסיס של ה-FLP ואת שירותי-ה-OData הספציפיים של אפליקציות-הרכש, ובודק כל אחד דרך 'Call Browser' לפני מסירה לצוות הפונקציונלי.",
          navHe: [
            "Transaction SICF ► default_host ► sap ► bc ► ui2 ► flp / flp_cust ► Activate Service",
            "Transaction SICF ► default_host ► sap ► opu ► odata ► Activate OData nodes",
            "Transaction /IWFND/MAINT_SERVICE ► Add Service ► Get Services ► Add Selected ► Activate",
          ],
          tables: ["ICFSERVLOC", "/IWFND/I_MED_SRH", "/IWFND/C_MGDEAM"],
          tcodes: ["SICF", "/IWFND/MAINT_SERVICE", "/IWFND/ERROR_LOG", "/UI2/FLP"],
          fiori: ["F2787"],
          configHe: [
            "הפעל UI components (SAP_UI/SAPUI5) ו-Fiori Front-End Server מתאימים.",
            "הפעל SICF nodes: /sap/bc/ui2/flp, /sap/bc/ui2/flp_cust, /sap/opu/odata/*.",
            "ב-/IWFND/MAINT_SERVICE: Add Service → System Alias → Activate; בדוק 'Call Browser'.",
          ],
          flow: [
            { he: "ודא רכיבי UI", code: "SAP_UI/SAPUI5" },
            { he: "הפעל SICF", code: "SICF", note: "flp + odata" },
            { he: "פרסם OData", code: "/IWFND/MAINT_SERVICE" },
            { he: "בדוק שירות", code: "Call Browser", note: "metadata תקין" },
          ],
          mistakesHe: [
            "השארת SICF node כבוי ➔ 403/404 לאריח.",
            "הוספת OData ללא System Alias ➔ 'no system alias'.",
            "התעלמות מ-/IWFND/ERROR_LOG בעת תקלה.",
          ],
          troubleshootHe: [
            "האריח מחזיר 403/404 ➔ SICF node לא הופעל — הפעל ב-SICF.",
            "אין נתונים באפליקציה ➔ בדוק /IWFND/ERROR_LOG ו-System Alias.",
            "OData service לא נמצא ➔ לא נוסף/לא הופעל ב-/IWFND/MAINT_SERVICE.",
          ],
          bestPracticeHe: [
            "בדוק כל OData service ב-'Call Browser' מיד אחרי הפעלה.",
            "תעד אילו SICF nodes ו-services הופעלו לכל אפליקציה.",
          ],
          interviewHe: [
            { qHe: "אילו שלושה רכיבים מפעילים בהתקנת Fiori?", aHe: "UI software components (SAPUI5), SICF services (/sap/bc/ui2/*) ו-OData services דרך /IWFND/MAINT_SERVICE." },
            { qHe: "כיצד בודקים ש-OData service תקין?", aHe: "ב-/IWFND/MAINT_SERVICE בוחרים את השירות ולוחצים 'Call Browser'; תגובת-metadata תקינה מאשרת זאת." },
          ],
          takeawaysHe: [
            "התקנה = רכיבי-UI + SICF services + פרסום OData.",
            "SICF מפעיל את /sap/bc/ui2/flp ואת שירותי ה-OData.",
            "אמת כל שירות ב-'Call Browser' לפני מסירה.",
          ],
        },
        {
          id: "17.2.2",
          titleHe: "פריסת embedded ו-central hub עבור SAP Fiori",
          titleEn: "Embedded and Central Hub Deployment for SAP Fiori",
          execHe:
            "ל-SAP Fiori שתי תצורות-פריסה (deployment options): embedded — ה-Fiori Front-End Server (Gateway + FLP) רץ באותה מערכת S/4HANA — ו-central hub — ה-Front-End Server רץ על מערכת SAP NetWeaver/SAP Gateway נפרדת המשרתת מספר backends. הבחירה משפיעה על תחזוקה, אבטחה ויכולת-איחוד של מספר מערכות תחת launchpad אחד.",
          beginnerHe:
            "השאלה היא 'איפה ה-launchpad יושב?'. ב-embedded הוא חי בתוך אותה S/4HANA — פשוט יותר, מתאים למערכת אחת. ב-central hub הוא יושב על שרת נפרד ש'מאחד' כמה מערכות SAP מאחורי launchpad אחד — מתאים לארגון עם הרבה מערכות. שתי הדרכים תקפות; בוחרים לפי הנוף.",
          consultantHe:
            "Embedded: Gateway+FLP מותקנים ב-S/4HANA; קל יותר ל-single-system ול-S/4HANA-only, פחות hops, אך מחבר את גרסת ה-Front-End ל-backend. Central hub: Gateway/FLP על SAP NetWeaver נפרד (Front-End Server), מתחבר לכמה backends דרך RFC + trusted system + System Aliases, מאפשר launchpad אחד לכמה מערכות, decoupling של מחזורי-שדרוג, אך מורכב יותר. ההחלטה מושפעת מ-system landscape, מ-security zones (DMZ) וממדיניות-שדרוג.",
          purposeHe:
            "לבחור topology המאזן בין פשטות-תחזוקה (embedded) לבין איחוד-מערכות וגמישות-שדרוג (central hub), בהתאם למספר ה-backends, לאזורי-האבטחה ולמדיניות-הארגון.",
          processExampleHe:
            "ארגון עם S/4HANA יחיד בוחר embedded — FLP פנימי, פחות תחזוקה. ארגון עם S/4HANA + ECC + BW מקים central hub: launchpad אחד עם System Aliases לכל backend, כך שהמשתמש רואה אריחים מכל המערכות במקום אחד.",
          cbcHe:
            "ב-CBC, עם מערכת S/4HANA מרכזית לבקבוק, נבחר embedded deployment — פשוט, פחות שרתים לתחזק. אילו היו מספר מערכות-לוויין, central hub היה מאחד את אריחי-הרכש מכולן ל-launchpad אחד.",
          navHe: [
            "SAP NetWeaver ► Gateway ► OData Channel ► Configuration ► Connection Settings ► SAP Gateway to SAP System ► Manage SAP System Aliases",
            "Transaction SM59 ► RFC Destination (ל-central hub: trusted RFC ל-backend)",
            "Transaction /IWFND/MAINT_SERVICE ► System Alias (Local ל-embedded / Remote ל-hub)",
          ],
          tables: ["/IWFND/C_MGDEAM", "RFCDES", "/IWFND/V_DFSYAL"],
          tcodes: ["/IWFND/MAINT_SERVICE", "SM59", "/UI2/GW_SYS_ALIAS", "SPRO"],
          fiori: [],
          configHe: [
            "Embedded: Gateway+FLP ב-S/4HANA; System Alias = Local; פחות hops, גרסה צמודה ל-backend.",
            "Central hub: Front-End Server נפרד (SAP NetWeaver); RFC + trusted system (SM59); System Aliases לכל backend.",
            "Manage SAP System Aliases קובע איזה service פונה לאיזו מערכת.",
          ],
          flow: [
            { he: "ספור backends", code: "1 / רבים" },
            { he: "בחר topology", code: "embedded / central hub" },
            { he: "central hub: RFC+trust", code: "SM59" },
            { he: "הגדר System Aliases", code: "/UI2/GW_SYS_ALIAS" },
            { he: "פרסם services", code: "/IWFND/MAINT_SERVICE" },
          ],
          mistakesHe: [
            "central hub ללא trusted RFC ➔ כשלי-אימות מול ה-backend.",
            "embedded כשיש כמה backends ➔ ריבוי launchpads במקום איחוד.",
            "System Alias שגוי (Local במקום Remote) ➔ האפליקציה פונה למערכת הלא-נכונה.",
          ],
          troubleshootHe: [
            "אפליקציה מחזירה נתונים ממערכת שגויה ➔ System Alias mapping שגוי.",
            "central hub: שגיאת-אימות ➔ trusted system/RFC ב-SM59 לא הוגדר.",
            "ב-embedded שדרוג Front-End תקוע ➔ צימוד-גרסה ל-backend — צפוי בתצורה זו.",
          ],
          bestPracticeHe: [
            "embedded ל-S/4HANA-only ולפשטות; central hub לאיחוד מספר backends.",
            "ב-central hub הקפד על trusted RFC ועל מיפוי System Aliases מסודר.",
            "תעד את הבחירה ואת ההשלכות על מדיניות-שדרוג.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין embedded ל-central hub?", aHe: "ב-embedded ה-Front-End Server (Gateway+FLP) רץ באותה S/4HANA; ב-central hub הוא על מערכת נפרדת המשרתת כמה backends דרך RFC ו-System Aliases." },
            { qHe: "מתי תבחר central hub?", aHe: "כשצריך launchpad אחד מעל כמה מערכות (S/4HANA+ECC+BW), decoupling של מחזורי-שדרוג, או הפרדת-אבטחה (DMZ)." },
          ],
          takeawaysHe: [
            "שתי תצורות: embedded (אותה מערכת) ו-central hub (שרת נפרד).",
            "embedded = פשוט, single-system; central hub = איחוד מספר backends.",
            "central hub דורש RFC + trusted system + System Aliases.",
          ],
          relatedHe: [
            { labelHe: "MM · התקנת SAP Fiori (17.2.1)", href: "/library/mm/chapter-17/#sub-17.2.1" },
          ],
        },
        {
          id: "17.2.3",
          titleHe: "ספריית האפליקציות של SAP Fiori",
          titleEn: "SAP Fiori Apps Reference Library",
          execHe:
            "ה-Fiori Apps Reference Library היא הקטלוג הרשמי המקוון של SAP לכל אפליקציות-ה-Fiori. לכל אפליקציה היא מספקת את כל פרטי-המימוש: ה-OData service, ה-UI component (BSP), ה-Business Role וה-Technical/Business Catalog, התלויות וה-implementation steps. היא נקודת-המוצא לכל הפעלת-אפליקציה — מונעת ניחושים וחוסכת שעות-איתור.",
          beginnerHe:
            "ה-Reference Library היא 'הקטלוג של כל אפליקציות-Fiori' באתר של SAP. מחפשים אפליקציה (למשל 'Manage Purchase Orders') ומקבלים דף עם בדיוק מה צריך כדי שהיא תעבוד: איזה שירות-נתונים להפעיל, איזה תפקיד לשייך ואיזה רכיב להתקין. כך לא צריך לנחש.",
          consultantHe:
            "הספרייה (fioriappslibrary.hana.ondemand.com) מאפשרת חיפוש/סינון לפי Line of Business, Product, Role ו-App Type. דף-אפליקציה כולל: App ID, OData services + version, ICF nodes, SAPUI5 application (BSP), Technical Catalog + Business Catalog, Business Role, ו-aggregated configuration עם רשימת-תלויות מדויקת. ניתן לבנות 'Aggregation' של אפליקציות נבחרות ולייצא רשימת-הפעלה אחת ל-Basis. זה הקלט הקנוני ל-/IWFND/MAINT_SERVICE ול-PFCG.",
          purposeHe:
            "לתת לצוות-הפרויקט מקור-אמת יחיד לכל התלויות הטכניות של כל אפליקציה — מה להפעיל, מה לשייך ומה להתקין — ובכך להפוך את ההפעלה לתהליך דטרמיניסטי.",
          processExampleHe:
            "הצוות הפונקציונלי מחפש 'Manage Purchase Orders' בספרייה, פותח את לשונית ה-Implementation Information, מעתיק את ה-OData service ל-/IWFND/MAINT_SERVICE, מפעיל את ה-ICF node, ומשייך את ה-Business Catalog ל-Business Role ב-PFCG.",
          cbcHe:
            "ב-CBC הצוות בונה ב-Reference Library Aggregation של כל אפליקציות-הרכש (הזמנות, בקשות, מעקב-ספקים), מייצא רשימת-תלויות אחת, ומוסר ל-Basis להפעלה מרוכזת — במקום לאתר כל שירות ידנית.",
          navHe: [
            "Browser ► https://fioriappslibrary.hana.ondemand.com ► Search/Filter (LoB: Sourcing and Procurement)",
            "App page ► Implementation Information ► OData Services / ICF / Catalog / Business Role",
            "Aggregation ► הוסף אפליקציות ► Export/Required Components",
          ],
          tables: ["/UI2/I_GET_APP_DESCR", "AGR_DEFINE"],
          tcodes: ["/IWFND/MAINT_SERVICE", "PFCG", "/UI2/FLPD_CUST"],
          fiori: ["F2787"],
          configHe: [
            "חיפוש/סינון לפי LoB, Product, Role, App Type.",
            "דף-אפליקציה: OData service, ICF node, SAPUI5/BSP, Technical+Business Catalog, Business Role, תלויות.",
            "Aggregation מייצרת רשימת-הפעלה מאוחדת לכל אפליקציות-הפרויקט.",
          ],
          mistakesHe: [
            "הפעלת אפליקציה ידנית ללא בדיקת הספרייה ➔ תלות חסרה ושבירה.",
            "התעלמות מגרסת ה-OData service המצוינת ➔ אי-תאימות.",
            "שיוך Business Role שגוי שאינו זה שמצוין בספרייה.",
          ],
          troubleshootHe: [
            "אפליקציה לא עובדת אחרי הפעלה ➔ הצלב מול הספרייה — תלות/service חסר.",
            "אריח לא מופיע לתפקיד ➔ הוקצה Business Catalog שגוי מול הספרייה.",
            "גרסת-service לא תואמת ➔ הופעלה גרסה שונה מזו שבספרייה.",
          ],
          bestPracticeHe: [
            "התחל כל הפעלת-אפליקציה מה-Reference Library — מקור-אמת יחיד.",
            "השתמש ב-Aggregation לייצוא רשימת-תלויות מרוכזת ל-Basis.",
            "ודא התאמת גרסאות OData בין הספרייה למערכת.",
          ],
          interviewHe: [
            { qHe: "מהי ה-Fiori Apps Reference Library?", aHe: "קטלוג מקוון רשמי של SAP לכל אפליקציות-Fiori, המספק לכל אחת את ה-OData service, ה-UI component, ה-Business Role, ה-Catalog והתלויות הדרושות להפעלה." },
            { qHe: "כיצד היא מזרזת מימוש?", aHe: "היא נותנת מקור-אמת יחיד לתלויות; אפשר לבנות Aggregation ולייצא רשימת-הפעלה אחת ל-Basis במקום לאתר כל service ידנית." },
          ],
          takeawaysHe: [
            "הספרייה = קטלוג רשמי של כל אפליקציות-Fiori ותלויותיהן.",
            "לכל אפליקציה: OData, UI component, Business Role, Catalog.",
            "נקודת-המוצא לכל הפעלת-אפליקציה; תומכת ב-Aggregation לייצוא.",
          ],
          relatedHe: [
            { labelHe: "MM · התקנת SAP Fiori (17.2.1)", href: "/library/mm/chapter-17/#sub-17.2.1" },
          ],
        },
      ],
    },
    // ============================================================ 17.3
    {
      id: "17.3",
      titleHe: "התאמה אישית של SAP Fiori",
      titleEn: "Customizing SAP Fiori",
      execHe:
        "אחרי שה-launchpad הוגדר והוקצה, מגיעה שכבת-ההתאמה: עיצוב מראה-התוכן וההתנהגות. לכך שני מסלולים — edit mode, שבו מנהל-תוכן או משתמש-קצה מארגנים אריחים, groups/spaces ו-pages, ו-SAP Fiori User Settings, שבו כל משתמש מכוון העדפות אישיות (theme, שפה, נגישות). הקונפיגורציה המרכזית של ה-FLP נעשית ב-/UI2/FLPD_CUST (Customizing) ו-/UI2/FLPD_CONF (Configuration).",
      beginnerHe:
        "כשה-launchpad כבר עובד, אפשר לסדר אותו 'יפה' ולכוונן אותו לכל משתמש. יש שתי דרכים: edit mode — מצב-עריכה שבו גוררים אריחים, מוסיפים/מסירים ומסדרים בקבוצות — והגדרות-המשתמש, שבהן כל אחד בוחר ערכת-נושא, שפה ועוד. כך כל קניין מקבל launchpad מסודר ונוח לו.",
      consultantHe:
        "ההתאמה מתרחשת בשתי רמות: (1) רמת-מנהל-התוכן ב-/UI2/FLPD_CUST (client-specific customizing) ו-/UI2/FLPD_CONF (cross-client configuration) — הגדרת catalogs, groups, spaces & pages, target mappings ו-tiles; (2) רמת-משתמש-הקצה דרך edit mode ב-launchpad (Personalization) ודרך User Settings. שינויי-משתמש נשמרים כ-personalization ב-/UI2/PARAMETER ובטבלאות-ה-personalization, ואינם פוגעים ב-baseline. ניתן לכבות personalization ברמת-מערכת אם נדרשת אחידות.",
      purposeHe:
        "לאזן בין סטנדרטיזציה (תוכן מנוהל מרכזית לכל תפקיד) לבין העצמת-משתמש (סידור אישי והעדפות) — כך שכל קניין יקבל launchpad יעיל, מסודר ומותאם להעדפותיו.",
      processExampleHe:
        "מנהל-תוכן יוצר ב-/UI2/FLPD_CUST space & page לקניינים עם sections של 'הזמנות' ו-'ספקים'. קניין נכנס ל-edit mode, גורר את האריחים שהוא משתמש בהם הכי הרבה לראש-הדף, מסיר אריח לא-רלוונטי, ומכוון ב-User Settings את ה-theme ל-Horizon ושפה לעברית.",
      cbcHe:
        "ב-CBC מנהל-התוכן בונה page סטנדרטי לקנייני-הרכש; כל קניין מסדר ב-edit mode את אריחי התרכיז/הסוכר/האריזה לפי עבודתו, ובוחר ב-User Settings עברית ו-theme בהיר — אחידות ארגונית עם נגיעה אישית.",
      navHe: [
        "Transaction /UI2/FLPD_CUST ► Catalogs / Groups / Spaces & Pages / Target Mappings (client-specific)",
        "Transaction /UI2/FLPD_CONF ► Configuration (cross-client)",
        "SAP Fiori launchpad ► User menu ► Edit Home Page / Settings",
      ],
      tables: ["/UI2/PAGE", "/UI2/PARAMETER", "AGR_DEFINE"],
      tcodes: ["/UI2/FLPD_CUST", "/UI2/FLPD_CONF", "/UI2/FLP", "/UI2/FLPCM_CUST"],
      fiori: ["F2787", "F0842"],
      configHe: [
        "/UI2/FLPD_CUST = customizing client-specific (catalogs, groups, spaces & pages, tiles, target mappings).",
        "/UI2/FLPD_CONF = configuration cross-client (ברירות-מחדל למערכת).",
        "Personalization של משתמש נשמרת בנפרד מה-baseline; ניתנת לכיבוי ברמת-מערכת.",
      ],
      flow: [
        { he: "תוכן-בסיס", code: "/UI2/FLPD_CUST", note: "spaces & pages" },
        { he: "edit mode", code: "Personalization", note: "סידור אישי" },
        { he: "User Settings", code: "theme/שפה" },
        { he: "launchpad מותאם", code: "/UI2/FLP" },
      ],
      mistakesHe: [
        "עריכת תוכן ב-/UI2/FLPD_CONF (cross-client) במקום ב-/UI2/FLPD_CUST — השפעה גורפת לא-מכוונת.",
        "כיבוי personalization גורף — שולל מהמשתמשים סידור אישי לגיטימי.",
        "ערבוב baseline ב-personalization — שינוי מנהלי 'נמחק' ע\"י סידור-משתמש.",
      ],
      troubleshootHe: [
        "שינוי-תוכן לא מופיע למשתמש ➔ נעשה ב-config הלא-נכון (CONF מול CUST) או client שגוי.",
        "סידור-משתמש לא נשמר ➔ personalization כבוי ברמת-מערכת.",
        "אריח 'חזר' אחרי עדכון ➔ baseline דרס personalization — נדרש reset-personalization.",
      ],
      bestPracticeHe: [
        "נהל תוכן-בסיס ב-/UI2/FLPD_CUST; שמור /UI2/FLPD_CONF לברירות-מחדל גלובליות בלבד.",
        "אפשר personalization למשתמשים, אך שמור baseline נקי ומנוהל.",
        "השתמש ב-spaces & pages (מודל מודרני) על-פני groups ישנים.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין /UI2/FLPD_CUST ל-/UI2/FLPD_CONF?", aHe: "FLPD_CUST = customizing client-specific (catalogs, spaces & pages, tiles); FLPD_CONF = configuration cross-client (ברירות-מחדל למערכת כולה)." },
        { qHe: "אילו שתי רמות-התאמה קיימות?", aHe: "רמת-מנהל-תוכן (FLPD_CUST/CONF) ורמת-משתמש-קצה (edit mode + User Settings); שינויי-משתמש הם personalization נפרד מה-baseline." },
      ],
      takeawaysHe: [
        "התאמה בשתי רמות: מנהל-תוכן (FLPD_CUST/CONF) ומשתמש-קצה (edit mode/Settings).",
        "/UI2/FLPD_CUST = client-specific; /UI2/FLPD_CONF = cross-client.",
        "Personalization של משתמש נפרד מה-baseline המנוהל.",
      ],
      relatedHe: [
        { labelHe: "MM · הגדרת SAP Fiori (17.2)", href: "/library/mm/chapter-17/#sub-17.2" },
        { labelHe: "MM · אפשרויות ממשק (17.1)", href: "/library/mm/chapter-17/#sub-17.1" },
      ],
      children: [
        {
          id: "17.3.1",
          titleHe: "מצב עריכה ב-SAP Fiori",
          titleEn: "SAP Fiori Edit Mode",
          execHe:
            "edit mode הוא מצב-העריכה של ה-launchpad המאפשר לארגן את התוכן ויזואלית: הוספה/הסרה של אריחים, גרירתם בין groups/sections, יצירת/שינוי-סדר של pages, וקיבוץ. הוא קיים ברמת-משתמש-קצה (personalization) וברמת-מנהל-תוכן (עיצוב ה-baseline ב-FLPD_CUST). זהו הכלי המרכזי לעיצוב חוויית ה-launchpad.",
          beginnerHe:
            "edit mode הוא 'מצב-עריכה' של דף-הבית. נכנסים אליו (Edit Home Page), ואז אפשר לגרור אריחים, להוסיף חדשים מ-App Finder, להסיר מיותרים ולסדר בקבוצות. כשמסיימים — שומרים, וה-launchpad נשאר מסודר כך שבחרת.",
          consultantHe:
            "ברמת-משתמש: edit mode מפעיל personalization — שינויים נשמרים פר-משתמש בלי לגעת ב-baseline. ברמת-מנהל-תוכן: ב-/UI2/FLPD_CUST עורכים את ה-spaces & pages/sections וה-tiles שכל תפקיד מקבל. App Finder מציג את כלל ה-tiles המורשים (מתוך ה-catalogs המשויכים) להוספה. ניתן לכבות personalization (read-only home page) לאחידות. במודל ה-spaces & pages העריכה מתבצעת ברמת page/section.",
          purposeHe:
            "לאפשר עיצוב-תוכן גמיש — בידי מנהל ל-baseline ובידי משתמש להעדפותיו — כך שכל launchpad יהיה רלוונטי, מסודר ויעיל לתפקיד ולאדם.",
          processExampleHe:
            "קניין נכנס ל-Edit Home Page, פותח App Finder, מוסיף את אריח 'Monitor Purchase Order Items', גורר אותו לראש section 'הזמנות', מסיר אריח-analytics שאינו בשימוש, ושומר — דף-הבית שלו מותאם אישית.",
          cbcHe:
            "ב-CBC כל קניין משתמש ב-edit mode כדי לקבע בראש-הדף את אריחי-הרכש היומיומיים (הזמנות פתוחות, מעקב-אספקה) ולהסיר אריחים של תחומים שאינם שלו — בלי לפגוע ב-baseline של שאר הצוות.",
          navHe: [
            "SAP Fiori launchpad ► User menu ► Edit Home Page (Personalization)",
            "Edit mode ► App Finder ► הוסף/הסר tiles ► גרור בין sections ► Save",
            "Transaction /UI2/FLPD_CUST ► Pages ► Sections ► Tiles (baseline למנהל-תוכן)",
          ],
          tables: ["/UI2/PERS_FILTER", "/UI2/PAGE", "/UI2/PARAMETER"],
          tcodes: ["/UI2/FLP", "/UI2/FLPD_CUST", "/UI2/FLPCM_CUST"],
          fiori: ["F0842"],
          configHe: [
            "edit mode ברמת-משתמש = personalization (פר-משתמש, נפרד מ-baseline).",
            "edit mode ברמת-מנהל = עריכת spaces & pages/sections ב-/UI2/FLPD_CUST.",
            "App Finder מציג tiles מותרים מה-catalogs המשויכים; ניתן לכבות personalization לאחידות.",
          ],
          mistakesHe: [
            "ציפייה ש-App Finder יציג כל אריח — מציג רק את המורשים לתפקיד.",
            "עריכה כמנהל בלקוח/מצב הלא-נכון ➔ שינוי לא מופיע או גורף מדי.",
            "כיבוי personalization בלי לתקשר — משתמשים 'מאבדים' את היכולת לסדר.",
          ],
          troubleshootHe: [
            "אריח לא נמצא ב-App Finder ➔ ה-catalog שלו לא משויך ל-Business Role.",
            "שינוי edit-mode לא נשמר ➔ personalization כבוי או הרשאת-עריכה חסרה.",
            "המנהל ערך אך משתמשים לא רואים ➔ נערך baseline בלקוח/page שגוי.",
          ],
          bestPracticeHe: [
            "השתמש ב-App Finder לגילוי האריחים המורשים לפני הוספה.",
            "שמור baseline נקי ב-FLPD_CUST; השאר סידור-אישי ל-personalization.",
            "אם נדרשת אחידות מלאה — כבה personalization בכוונה ותקשר זאת.",
          ],
          interviewHe: [
            { qHe: "מה מאפשר edit mode?", aHe: "ארגון ויזואלי של ה-launchpad: הוספה/הסרה של tiles (דרך App Finder), גרירה בין sections, וסידור pages — ברמת-משתמש (personalization) או מנהל-תוכן (baseline)." },
            { qHe: "מהו App Finder?", aHe: "כלי בתוך edit mode המציג את כלל ה-tiles המורשים לתפקיד (מה-catalogs המשויכים) להוספה לדף-הבית." },
          ],
          takeawaysHe: [
            "edit mode = עיצוב ויזואלי של ה-launchpad (tiles/sections/pages).",
            "App Finder מציג רק tiles מורשים לתפקיד.",
            "רמת-משתמש = personalization; רמת-מנהל = baseline ב-FLPD_CUST.",
          ],
          relatedHe: [
            { labelHe: "MM · הגדרות-משתמש (17.3.2)", href: "/library/mm/chapter-17/#sub-17.3.2" },
          ],
        },
        {
          id: "17.3.2",
          titleHe: "הגדרות-משתמש ב-SAP Fiori",
          titleEn: "SAP Fiori User Settings",
          execHe:
            "SAP Fiori User Settings הוא תפריט ההעדפות האישיות של כל משתמש ב-launchpad: ערכת-נושא (theme — Horizon/Belize), שפה, אזור-זמן, נגישות (high-contrast/screen-reader), הודעות, ו-default values לפרמטרים. ההגדרות נשמרות פר-משתמש ומשפיעות רק עליו, ללא נגיעה ב-baseline או ב-personalization של אחרים.",
          beginnerHe:
            "User Settings הוא 'ההגדרות שלי' ב-launchpad. נכנסים מתפריט-המשתמש, ושם בוחרים ערכת-צבעים, שפה, אזור-זמן, ואפשרויות-נגישות. כל מה שמשנים פה משפיע רק על המשתמש עצמו — כמו העדפות אישיות באפליקציה.",
          consultantHe:
            "User Settings נגיש מ-User Actions menu ב-FLP. הוא כולל Appearance (theme/contrast), Language & Region, Notifications, ו-Default Values (פרמטרי-משתמש, מקבילים ל-SU3/SU01 Parameters אך ב-UX מודרני). ערכי ברירת-המחדל למערכת נקבעים מרכזית (default theme ב-/UI2/FLPD_CONF / theme designer), אך המשתמש יכול לעקוף. נגישות וברירות-שפה נמשכות לרוב מ-SU01 כל עוד לא נדרסות.",
          purposeHe:
            "לתת לכל משתמש שליטה על חוויית-העבודה שלו — מראה, שפה ונגישות — בלי להזדקק לתמיכה, ובלי להשפיע על משתמשים אחרים.",
          processExampleHe:
            "קניין פותח User Settings, בוחר theme = Horizon, Language = עברית, ומפעיל high-contrast לנגישות. הוא גם מגדיר default plant כפרמטר-משתמש כך שאפליקציות-הרכש נפתחות מסוננות למפעלו.",
          cbcHe:
            "ב-CBC קנייני-הרכש בוחרים ב-User Settings עברית ו-theme בהיר; חלקם מגדירים default plant של מפעל-המילוי שלהם, כך שאריחי-ההזמנות נפתחים ישר על הנתונים הרלוונטיים להם.",
          navHe: [
            "SAP Fiori launchpad ► User menu (avatar) ► Settings",
            "Settings ► Appearance (Theme) / Language & Region / Notifications / Default Values",
            "Transaction SU3 ► Parameters (ערכי-ברירת-מחדל משלימים למשתמש)",
          ],
          tables: ["USR01", "/UI2/PARAMETER", "/UI2/USER_PARA"],
          tcodes: ["/UI2/FLP", "SU3", "SU01"],
          fiori: ["F0842"],
          configHe: [
            "Appearance: בחירת theme (Horizon/Belize) ו-high-contrast לנגישות.",
            "Language & Region: שפה ואזור-זמן (יורש מ-SU01 אם לא נדרס).",
            "Default Values: פרמטרי-משתמש (כמו plant ברירת-מחדל), מקביל ל-SU3.",
          ],
          mistakesHe: [
            "ציפייה ששינוי-משתמש ישפיע על אחרים — הוא אישי בלבד.",
            "הגדרת default values סותרים שגורמים לאפליקציה להיפתח מסוננת לא-נכון.",
            "התעלמות מאפשרויות-הנגישות עבור משתמשים הזקוקים להן.",
          ],
          troubleshootHe: [
            "theme לא משתנה ➔ ברירת-מחדל למערכת נכפית או נדרש ריענון-cache.",
            "שפה שגויה ➔ SU01 logon language דורס; עדכן User Settings/SU01.",
            "אפליקציה נפתחת מסוננת מוזר ➔ default value בפרמטרי-המשתמש (SU3) שגוי.",
          ],
          bestPracticeHe: [
            "קבע default theme סביר למערכת, אך אפשר למשתמש לעקוף.",
            "הדרך משתמשים על אפשרויות-הנגישות והשפה ב-User Settings.",
            "השתמש ב-default values בזהירות — הם מסננים את האפליקציות.",
          ],
          interviewHe: [
            { qHe: "מה ניתן לכוונן ב-SAP Fiori User Settings?", aHe: "Theme/appearance, שפה ואזור, נגישות (high-contrast), הודעות ו-default values לפרמטרי-משתמש — הכל פר-משתמש בלבד." },
            { qHe: "האם הגדרות-המשתמש משפיעות על אחרים?", aHe: "לא — הן אישיות ונשמרות פר-משתמש, ללא נגיעה ב-baseline או במשתמשים אחרים." },
          ],
          takeawaysHe: [
            "User Settings = העדפות אישיות (theme, שפה, נגישות, default values).",
            "אישי בלבד — אינו משפיע על baseline או על משתמשים אחרים.",
            "Default values מקבילים ל-SU3 ומסננים אפליקציות.",
          ],
          relatedHe: [
            { labelHe: "MM · מצב עריכה (17.3.1)", href: "/library/mm/chapter-17/#sub-17.3.1" },
          ],
        },
      ],
    },
    // ============================================================ 17.4
    {
      id: "17.4",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה הציג את התאמת ממשק-המשתמש ב-S/4HANA: שתי אפשרויות ה-UI (SAP Fiori מול SAP GUI), הגדרת ה-SAP Fiori launchpad (התקנה, תצורת-פריסה embedded/central hub, ו-Fiori Apps Reference Library), וההתאמה האישית (edit mode והגדרות-המשתמש). המסר המרכזי: ה-SAP Fiori launchpad הוא נקודת-כניסה אחת role-based; הקמתו דורשת הפעלת-רכיבים, בחירת-topology וזיהוי-תוכן מדויק; וההתאמה מאזנת בין סטנדרטיזציה מנוהלת להעצמת-משתמש.",
      beginnerHe:
        "סיכמנו את כל מסע ה-UI: יש שתי דרכים להיכנס ל-SAP (Fiori המודרני ו-GUI הקלאסי); כדי שה-launchpad המודרני יעבוד צריך להתקין ולהפעיל שירותים, להחליט איפה הוא יושב, ולבדוק בספרייה הרשמית מה כל אפליקציה צריכה; ולבסוף כל משתמש יכול לסדר אריחים (edit mode) ולבחור העדפות (theme, שפה). התוצאה: launchpad מסודר ומותאם לכל קניין.",
      consultantHe:
        "מבחינה ארכיטקטונית: FLP כ-single point of entry מעל S/4HANA, נשען על SAPUI5+OData; topology נבחר בין embedded (פשטות, single-system) ל-central hub (איחוד backends, decoupling שדרוגים); הפעלה מתבססת על SICF + /IWFND/MAINT_SERVICE + ה-Reference Library כמקור-אמת לתלויות; הקצאה דרך PFCG Business Roles עם catalogs ו-spaces & pages; והתאמה ב-/UI2/FLPD_CUST (client) מול /UI2/FLPD_CONF (cross-client), עם personalization ו-User Settings ברמת-המשתמש. שליטה בשרשרת זו = launchpad יציב, מאובטח ונוח.",
      purposeHe:
        "לאחד את כל חוטי-הפרק לתמונת-פעולה אחת: כיצד מעמידים, מאבטחים ומתאימים launchpad תפעולי — מההחלטה האסטרטגית (Fiori/GUI, topology) ועד לפרט האישי (theme, סידור-אריחים) — עבור קהל-משתמשים אמיתי.",
      processExampleHe:
        "מקצה-לקצה: Basis מפעיל רכיבים+SICF+OData ובוחר embedded; הצוות הפונקציונלי שואב תלויות מה-Reference Library ומשייך Business Roles; מנהל-התוכן בונה spaces & pages ב-/UI2/FLPD_CUST; וכל קניין מסיים ב-edit mode וב-User Settings — launchpad חי, מותאם ומאובטח.",
      cbcHe:
        "ב-CBC התוצאה היא launchpad אחיד לקנייני התרכיז, הסוכר והאריזה: embedded deployment, אפליקציות-רכש מופעלות לפי ה-Reference Library, Business Role 'Buyer' עם space ייעודי, וכל קניין מסדר אריחים ובוחר עברית ו-theme — חוויית-רכש מודרנית, role-based ומותאמת.",
      navHe: [
        "סקירה: SAP NetWeaver ► UI Technologies ► SAP Fiori ► Overview",
        "התאמה: /UI2/FLPD_CUST · /UI2/FLPD_CONF · /UI2/FLP",
        "הקצאה: PFCG ► Business Role ► Catalogs / Spaces & Pages",
      ],
      tables: ["AGR_DEFINE", "/UI2/PAGE", "/IWFND/I_MED_SRH"],
      tcodes: ["/UI2/FLP", "/UI2/FLPD_CUST", "/IWFND/MAINT_SERVICE", "SICF", "PFCG"],
      fiori: ["F2787", "F0842"],
      configHe: [
        "FLP = single point of entry role-based מעל S/4HANA (SAPUI5+OData).",
        "Topology: embedded (פשטות) מול central hub (איחוד backends).",
        "הפעלה: SICF + /IWFND/MAINT_SERVICE + Fiori Apps Reference Library.",
        "התאמה: /UI2/FLPD_CUST (client) ו-/UI2/FLPD_CONF (cross-client) + personalization/User Settings.",
      ],
      flow: [
        { he: "בחר ממשק", code: "Fiori/GUI" },
        { he: "הפעל תשתית", code: "SICF+OData" },
        { he: "בחר topology", code: "embedded/central hub" },
        { he: "זהה תוכן", code: "Reference Library" },
        { he: "הקצה roles", code: "PFCG" },
        { he: "התאם", code: "edit mode/Settings" },
      ],
      mistakesHe: [
        "התייחסות ל-Fiori ו-GUI כתחליפיים במקום משלימים.",
        "בחירת topology ללא ניתוח נוף-המערכות.",
        "הפעלת אפליקציות ללא ה-Reference Library כמקור-תלויות.",
      ],
      troubleshootHe: [
        "launchpad ריק/שבור ➔ חזור על השרשרת: SICF → OData → Reference Library → PFCG.",
        "אריח ללא נתונים ➔ OData/System Alias; אריח חסר ➔ catalog/role.",
        "התאמה לא נשמרת ➔ CUST מול CONF שגוי או personalization כבוי.",
      ],
      bestPracticeHe: [
        "FLP כנקודת-כניסה אחת; הקצאה דרך Business Roles בלבד.",
        "התחל כל הפעלה מה-Fiori Apps Reference Library.",
        "אזן סטנדרטיזציה (FLPD_CUST) עם העצמת-משתמש (personalization/Settings).",
      ],
      interviewHe: [
        { qHe: "מהי שרשרת-ההקמה של launchpad תקין?", aHe: "הפעלת רכיבים+SICF, פרסום OData (/IWFND/MAINT_SERVICE), בחירת topology, זיהוי-תוכן ב-Reference Library, והקצאה דרך PFCG Business Roles — ואז התאמה ב-edit mode/User Settings." },
        { qHe: "מהו עקרון-העל של התאמת ה-UI?", aHe: "FLP כ-single point of entry role-based, עם איזון בין תוכן מנוהל-מרכזית (FLPD_CUST) לבין personalization והעדפות-משתמש." },
      ],
      takeawaysHe: [
        "שתי אפשרויות UI: SAP Fiori (מודרני) ו-SAP GUI (קלאסי), משלימות.",
        "הקמה: SICF + OData + topology (embedded/central hub) + Reference Library + PFCG.",
        "התאמה: /UI2/FLPD_CUST/CONF ברמת-מנהל, edit mode + User Settings ברמת-משתמש.",
        "ה-SAP Fiori launchpad = נקודת-כניסה אחת, role-based, מאובטחת ומותאמת.",
      ],
      relatedHe: [
        { labelHe: "MM · אפשרויות ממשק (17.1)", href: "/library/mm/chapter-17/#sub-17.1" },
        { labelHe: "MM · הגדרת SAP Fiori (17.2)", href: "/library/mm/chapter-17/#sub-17.2" },
        { labelHe: "MM · התאמת SAP Fiori (17.3)", href: "/library/mm/chapter-17/#sub-17.3" },
      ],
    },
  ],
};
