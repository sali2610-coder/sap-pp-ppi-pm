import { CenterHeader } from "@/components/knowledge";
import { CONNECTOR_MAP, USE_LIVE } from "@/lib/sap-connector";
export default function Page() {
  return (
    <div dir="rtl">
      <CenterHeader eyebrow="Phase 7 · Live SAP Connector (Architecture)" title="הכנת מחבר SAP חי" sub="ארכיטקטורה וממשקים בלבד — אין חיבור חי. כשתחובר מערכת SAP (או sc4sap MCP), המחבר read-only יעשיר/יאמת את תוכן NEO ממקור אמת." accent="#0e7490" />
      <div className="mb-4 inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-bold text-amber-800">סטטוס: {USE_LIVE ? "LIVE" : "ארכיטקטורה בלבד · ללא חיבור"}</div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs font-bold text-slate-500"><tr><th className="p-3 text-start">מקור SAP</th><th className="p-3 text-start">אובייקט</th><th className="p-3 text-start">יעד ב-NEO</th><th className="p-3 text-center">סטטוס</th></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {CONNECTOR_MAP.map((r) => (<tr key={r.source}><td className="tech p-3 font-bold text-slate-700" dir="ltr">{r.source}</td><td className="p-3 text-slate-600">{r.sapObject}</td><td className="tech p-3 text-[12px] text-slate-500" dir="ltr">{r.neoTarget}</td><td className="p-3 text-center"><span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">planned</span></td></tr>))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-[13px] leading-relaxed text-slate-500">המחבר מוגדר כ-<span className="tech" dir="ltr">SapConnector</span> interface ב-<span className="tech" dir="ltr">lib/sap-connector.ts</span> עם stub offline. מימוש עתידי דרך RFC / sc4sap MCP (GetTable/SearchObject/GetWhereUsed) / OData — read-only בלבד. הפעלה ע\"י <span className="tech" dir="ltr">USE_LIVE=true</span> + הזרקת adapter. ללא חיבור, NEO נשאר 100% offline.</p>
    </div>
  );
}
