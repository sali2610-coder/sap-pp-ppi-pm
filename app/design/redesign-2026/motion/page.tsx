import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import { homeData } from "@/components/neo-shell/home/home-data";
import { txDetail } from "@/components/neo-shell/data/tx-detail";
import { plexHe, plexLat, plexMono } from "@/app/fonts/plex";
import { LAB_CODES } from "./codes";
import { FlowMap, type LabChain } from "./flow-map";
import { ModeToggle } from "./mode-toggle";
import "./motion.css";

export const metadata: Metadata = {
  title: "מעבדת תנועה · כיוון עיצוב · SAP by Sali",
  robots: { index: false, follow: false },
};

export default function MotionLab() {
  const d = homeData();
  const chains: LabChain[] = d.flows.map((f) => ({
    key: f.key,
    he: f.he,
    code: d.modules.find((m) => m.key === f.key)?.code ?? f.key,
    steps: f.steps.map((s) => ({ code: s.code, label: s.label, exists: s.exists, link: s.link ? { card: s.link.card, via: s.link.via ?? null } : null })),
  }));
  const rows = LAB_CODES.map((c) => ({ c, d: txDetail(c) })).filter((r) => r.d);

  return (
    <div id="ml-root" className={`ml ${plexHe.variable} ${plexLat.variable} ${plexMono.variable}`} data-mode="light" dir="rtl" lang="he">
      <header className="ml-head">
        <div>
          <p className="ml-kicker">כיוון עיצוב 2026 · מעבדת תנועה</p>
          <h1 className="ml-h1">שני רגעי חתימה, על נתונים אמיתיים</h1>
          <p className="ml-lede">כל תנועה כאן מסבירה קשר: סדר תהליך, או אותו אובייקט שעובר מרשימה לרשומה. עם הפחתת תנועה במערכת ההפעלה, המצב הסופי מוצג מיד.</p>
        </div>
        <ModeToggle target="ml-root" />
      </header>

      <section className="ml-sec" aria-labelledby="ml-flow">
        <h2 id="ml-flow" className="ml-h2">1. מפת התהליך נבנית לפי סדר התהליך</h2>
        <p className="ml-cap">שתי שרשראות התהליך של המילון, טבלה אחרי טבלה. קו רציף הוא קשר שהמילון מתעד ישירות; קו מקווקו עובר דרך טבלת ביניים; טבלה שאינה במילון מסומנת ריקה.</p>
        <FlowMap chains={chains} />
      </section>

      <section className="ml-sec" aria-labelledby="ml-list">
        <h2 id="ml-list" className="ml-h2">2. מרשימה לרשומה</h2>
        <p className="ml-cap">בחרו טרנזקציה: הקוד עובר ממקומו ברשימה לכותרת הרשומה, כך שהעין לא צריכה לחפש מחדש. חזרה אחורה מחזירה אותו.</p>
        <ul className="ml-list">
          {rows.map(({ c, d: t }) => (
            <li key={c}>
              <Link href={`/design/redesign-2026/motion/tx/${c}/`} className="ml-row">
                <ViewTransition name={`tx-${c}`} share="rec-morph" default="none">
                  <bdi className="ml-code">{c}</bdi>
                </ViewTransition>
                <span className="ml-he">{t!.he}</span>
                <span className="ml-mod">{t!.moduleHe}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
