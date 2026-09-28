/* Project NEO · best practices — PM (תחזוקת מפעל).
   TYPE-ONLY IMPORTS. Loaded by node --test with no loader.
   Every step, anti-pattern and check below is copied or condensed from the
   named repository records (repoRef); nothing asserts a new SAP fact. */
import type { BestPracticeLike } from "@/lib/evidence/types";

const DATE = "2026-09-01";

export const PM_BEST_PRACTICES: BestPracticeLike[] = [
  {
    slug: "bapi-commit-discipline",
    he: "משמעת COMMIT בקריאות BAPI: הודעות ופקודות תחזוקת מפעל",
    en: "BAPI commit discipline for Plant Maintenance notifications and orders",
    module: "PM",
    summary:
      "כל רצף כתיבה דרך BAPI בתחזוקת מפעל מסתיים בבדיקת טבלת RETURN ובקריאה ל-BAPI_TRANSACTION_COMMIT; " +
      "בלעדיה השינויים אינם נשמרים במסד הנתונים.",
    context:
      "לפי רשומות אובייקטי הפונקציה במאגר, BAPI כותב (יצירת הודעה, שמירת הודעה, תחזוקת פקודה) אינו מבצע " +
      "COMMIT WORK בעצמו. הרשומות מתעדות את הרצף CREATE, DATA_ADD, SAVE ולאחריו COMMIT, ואת הכשלים " +
      "הנפוצים כאשר שלב מדולג. לפי ערכי הזמינות ברשומות, העיקרון חל על SAP ERP 6.0 ועל S/4HANA On-Premise כאחד.",
    steps: [
      {
        he: "לקרוא ל-BAPI הכותב, לדוגמה BAPI_ALM_NOTIF_CREATE להודעה או BAPI_ALM_ORDER_MAINTAIN לפקודה, ולשמור את טבלת RETURN שחוזרת.",
        xrefs: ["fm:BAPI_ALM_NOTIF_CREATE", "fm:BAPI_ALM_ORDER_MAINTAIN"],
      },
      {
        he: "לבדוק את RETURN אחרי כל קריאה: שורה עם TYPE בערך E או A פירושה כישלון, ואין להמשיך ברצף.",
      },
      {
        he: "בהודעות תחזוקת מפעל להשלים את הרצף CREATE, DATA_ADD, SAVE: המספר הסופי של ההודעה נוצר רק ב-BAPI_ALM_NOTIF_SAVE.",
        xrefs: ["fm:BAPI_ALM_NOTIF_DATA_ADD", "fm:BAPI_ALM_NOTIF_SAVE"],
      },
      {
        he: "לאחר הצלחה לקרוא ל-BAPI_TRANSACTION_COMMIT; להעביר WAIT='X' כאשר הנתונים נקראים מיד לאחר ה-COMMIT.",
        xrefs: ["fm:BAPI_TRANSACTION_COMMIT"],
      },
      {
        he: "במקרה שגיאה לקרוא ל-BAPI_TRANSACTION_ROLLBACK כדי לבטל את השינויים שנצברו ברצף.",
        xrefs: ["fm:BAPI_TRANSACTION_ROLLBACK"],
      },
      {
        he: "בקריאה מרוחקת (RFC) לשמור על אותו חיבור stateful מ-CREATE ועד COMMIT, כדי שהבאפר יהיה משותף בין הקריאות.",
      },
      {
        he: "לאמת את התוצאה בטבלאות היעד: QMEL להודעה ו-AUFK לפקודה, דרך IW23 או IW33.",
        xrefs: ["table:QMEL", "table:AUFK", "tx:IW23", "tx:IW33"],
      },
    ],
    antiPatterns: [
      "דילוג על BAPI_TRANSACTION_COMMIT: ההודעה או הפקודה אינן נשמרות.",
      "התעלמות מטבלת RETURN והמשך הרצף לאחר שורת E או A.",
      "חיבור RFC שאינו stateful: הבאפר אינו משותף בין CREATE ל-SAVE.",
      "עדכון סטטוס מערכת ישירות במקום BAPI_ALM_NOTIF_CHANGEUSRSTAT.",
    ],
    checks: [
      "בדיקת RETURN ו-COMMIT בכל תרחיש בדיקה של BAPI כותב.",
      "אימות שהמספר הסופי של ההודעה נוצר לאחר SAVE ו-COMMIT.",
      "בדיקה שהרשומה קיימת ב-QMEL או ב-AUFK לאחר הרצף.",
    ],
    xrefs: [
      "fm:BAPI_TRANSACTION_COMMIT", "fm:BAPI_TRANSACTION_ROLLBACK", "fm:BAPI_ALM_NOTIF_CREATE",
      "fm:BAPI_ALM_NOTIF_DATA_ADD", "fm:BAPI_ALM_NOTIF_SAVE", "fm:BAPI_ALM_ORDER_MAINTAIN",
      "table:QMEL", "table:AUFK", "tx:IW21", "tx:IW31",
    ],
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "הערת ה-RETURN המשותפת ברשומות אובייקטי הפונקציה (RET)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "טבלת הודעות BAPIRET2: יש לבדוק TYPE='E' לשגיאה, וחובה לקרוא ל-BAPI_TRANSACTION_COMMIT לאחר הצלחה.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#RET",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת BAPI_TRANSACTION_COMMIT ברישום המועשר",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "ביצוע COMMIT WORK חיצוני לאחר קריאות BAPI: הנתונים נשמרים רק לאחר קריאה זו. יש להעביר WAIT='X' " +
          "כאשר הנתונים נקראים מיד לאחר ה-COMMIT.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_TRANSACTION_COMMIT",
      },
      {
        sourceType: "repository",
        sourceTitle: "הערות ה-QA של משפחת הודעות BUS2038 ברישום המועשר",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "יש לבדוק את טבלת RETURN אחרי כל קריאה; חובה BAPI_ALM_NOTIF_SAVE ואז BAPI_TRANSACTION_COMMIT על " +
          "אותו חיבור RFC (stateful) כדי לשתף את הבאפר, ובמקרה שגיאה BAPI_TRANSACTION_ROLLBACK.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#notif",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת BAPI_ALM_NOTIF_SAVE באינטליגנציית הפונקציות",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "שמירת הודעת האחזקה ושיוך המספר הסופי; חובה אחריה BAPI_TRANSACTION_COMMIT.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#BAPI_ALM_NOTIF_SAVE",
      },
    ],
    lastVerifiedAt: DATE,
    reviewer: "Project NEO foundation pass",
    notes:
      "לא נמצא בספריית הפרויקט פרק המתעד את משמעת ה-COMMIT, ולכן הראיות הן רשומות המאגר בלבד. " +
      "הרשומה ממתינה לסקירת עורך אנושית.",
  },
];
