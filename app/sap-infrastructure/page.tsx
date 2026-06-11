import { FileText, Image as ImageIcon, Shapes, Database, Maximize2 } from "lucide-react";

export const metadata = { title: "תשתית SAP · מפת ארכיטקטורה · Project NEO" };

const BASE = "/sap-infrastructure";

const downloads = [
  { href: `${BASE}/sap-infrastructure-poster-A0.pdf`, label: "פוסטר PDF (A0)", sub: "להדפסה על קיר המשרד", Icon: FileText },
  { href: `${BASE}/sap-infrastructure-poster-A0.png`, label: "פוסטר PNG", sub: "תמונה ברזולוציה גבוהה", Icon: ImageIcon },
  { href: `${BASE}/sap-infrastructure-poster-A0.svg`, label: "פוסטר SVG", sub: "וקטורי — לעריכה/הגדלה", Icon: Shapes },
  { href: `${BASE}/dataset.json`, label: "נתוני מקור JSON", sub: "מקור אמת יחיד", Icon: Database },
];

export default function SapInfrastructurePage() {
  return (
    <div className="space-y-6" dir="rtl">
      {/* header */}
      <header className="rounded-2xl border border-white/10 bg-gradient-to-l from-[#0e1620] to-[#0a0f17] p-6 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white">תשתית SAP — מפת ארכיטקטורה ארגונית</h1>
            <p className="mt-1 text-sm text-slate-400">
              נוף SAP מלא · ECC6 → S/4HANA · מודולים, מסמכים, טבלאות, אובייקטים משותפים ואינטגרציה — מקור אמת יחיד.
            </p>
          </div>
          <a
            href={`${BASE}/map.html`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#d62027] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#d62027]/30 transition hover:brightness-110"
          >
            <Maximize2 className="size-4" />
            פתח מפה במסך מלא
          </a>
        </div>

        {/* download buttons */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {downloads.map(({ href, label, sub, Icon }) => (
            <a
              key={href}
              href={href}
              download
              className="group flex items-center gap-3 rounded-xl border border-white/10 bg-[#0d1722] p-3 transition hover:border-[#f2c14e] hover:bg-[#101c28]"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#16222f] text-[#f2c14e] group-hover:bg-[#1c2a39]">
                <Icon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold text-white">{label}</span>
                <span className="block truncate text-xs text-slate-400">{sub}</span>
              </span>
            </a>
          ))}
        </div>
      </header>

      {/* embedded interactive map */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#070b11] shadow-xl">
        <iframe
          src={`${BASE}/map.html`}
          title="מפת תשתית SAP אינטראקטיבית"
          className="block h-[82vh] min-h-[560px] w-full border-0"
          loading="lazy"
        />
      </div>

      <p className="text-center text-xs text-slate-500">
        טיפ: לחיצה על טבלה פותחת פאנל הסבר · ריחוף מציג קשר · מצב מצגת זמין בכפתור «הצג ארכיטקטורה» · 7 רמות תצוגה +
        תצוגת אזורים. נבנה ע״י <span className="text-[#d62027]">Sali Halif — Web Coding</span>.
      </p>
    </div>
  );
}
