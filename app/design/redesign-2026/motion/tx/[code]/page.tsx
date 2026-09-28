import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { ArrowRight } from "lucide-react";
import { txDetail } from "@/components/neo-shell/data/tx-detail";
import { plexHe, plexLat, plexMono } from "@/app/fonts/plex";
import { LAB_CODES } from "../../codes";
import { ModeToggle } from "../../mode-toggle";
import "../../motion.css";

export const metadata: Metadata = {
  title: "רשומה · מעבדת תנועה · SAP by Sali",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return LAB_CODES.map((code) => ({ code }));
}

export default async function LabRecord({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const t = txDetail(code);
  if (!t) notFound();
  return (
    <div id="ml-root" className={`ml ${plexHe.variable} ${plexLat.variable} ${plexMono.variable}`} data-mode="light" dir="rtl" lang="he">
      <header className="ml-head">
        <Link href="/design/redesign-2026/motion/" className="ml-back">
          <ArrowRight size={16} aria-hidden />
          <span>חזרה לרשימה</span>
        </Link>
        <ModeToggle target="ml-root" />
      </header>
      <article className="md">
        <p className="ml-kicker">טרנזקציה · {t.moduleHe}</p>
        <ViewTransition name={`tx-${t.code}`} share="rec-morph" default="none">
          <h1 className="md-code">
            <bdi>{t.code}</bdi>
          </h1>
        </ViewTransition>
        <ViewTransition enter="md-rise" default="none">
          <div className="md-body">
            <p className="md-he">{t.he}</p>
            {t.purpose ? <p className="md-p">{t.purpose}</p> : <p className="md-p md-missing">לא מתועד במאגר</p>}
            {t.flow.length > 0 && (
              <ol className="md-flow">
                {t.flow.slice(0, 6).map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            )}
          </div>
        </ViewTransition>
      </article>
    </div>
  );
}
