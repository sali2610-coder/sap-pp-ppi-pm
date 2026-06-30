import Link from "next/link";
import { Compass, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div dir="rtl" className="grid min-h-[60vh] place-items-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-slate-100 text-slate-400"><Compass className="size-8" /></div>
        <h1 className="mt-4 text-2xl font-extrabold text-slate-900">העמוד לא נמצא</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">ייתכן שהקישור השתנה. נסה את החיפוש או חזור לדף הבית.</p>
        <div className="mt-5 flex justify-center gap-2">
          <Link href="/" className="tap inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-sm font-extrabold text-white shadow-sm active:scale-95"><Home className="size-4" />לדף הבית</Link>
          <Link href="/apps/" className="tap inline-flex items-center gap-1.5 rounded-xl border-2 border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 active:scale-95"><Search className="size-4" />חיפוש אובייקטים</Link>
        </div>
      </div>
    </div>
  );
}
