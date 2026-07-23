# Runbook Index — SAP AI Consultant (Incident → Runbook routing)

<div dir="rtl">

מפת ניתוב: כל סימפטום/tcode נפוץ → ה-Runbook המכסה אותו. ה-Consultant קורא את האינדקס הזה בזמן ריצה כדי לוודא שאף Incident אינו מגיע ל-Dead End. אם אין התאמה — נתב לפי Intent הכללי + `sap-rootcause` + שאלת הבהרה, לעולם לא "אין מידע" ריק.

| סימפטום / tcode / status | Runbook | מודול |
|---|---|---|
| IDoc 51 / 64 / 02 / 29 / 68, IDoc תקוע, WE02/BD87 | `idoc-failed-status.md` | Integration |
| RFC נכשל, SM59, tRFC/qRFC, SM58/SMQ1/SMQ2, IDoc 02 | `rfc-connection-failure.md` | Integration |
| PI/PO, SOAP, Proxy, SXMB_MONI, mapping/channel error | `pipo-integration-failure.md` | Integration |
| MIGO, MIRO, COGI (backflush), תנועת מלאי/חשבונית | `goods-movement-invoice-error.md` | MM/PP/FI |
| Production Order, COHV, CO01/CO02, שחרור/availability | `pp-production-order.md` | PP |
| Process Order, COR6N, Control Recipe, CO53, COGI | `pppi-process-order.md` | PP-PI |
| PM Notification/Order, IW21/IW31/IW32, TECO, settlement | `pm-notification-order.md` | PM |
| זרימת PM מלאה Notification→Order (עסקי, לא תקלה) | `../books/sap-pm/poc/runbooks/notification-to-order.md` | PM |
| "not authorized", SU53, PFCG, S_TCODE/S_RFC/org level | `authorization-missing.md` | Security |
| איטי, TIME_OUT, dump, נעילה, job ארוך, ST22/ST05/SM50 | `performance-slow.md` | Performance |
| "עבד ב-ECC נכשל ב-S/4", simplification, obsolete tcode | `migration-ecc-to-s4.md` | Migration |

## כיסוי ידוע (שקיפות)
- **חזק:** PM · PP · PP-PI · Integration (IDoc/RFC) · Authorization · Migration.
- **בינוני/דק — סביר שיידרש Web ל-SAP Note:** MIRO · COHV · SOAP/Proxy · Performance ספציפי · SD (אין כיסוי ייעודי).
- לכל פער: הרנבוק עצמו מציין זאת ומפנה ל-`sap-notes.ts` → Web → שאלת הבהרה.

</div>
