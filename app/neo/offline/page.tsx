// Project NEO · /neo/offline/ — what the service worker (public/sw.js) shows
// when a page that was never opened on this device is requested with no
// network. Inside the NEO shell, like every page: the pre-NEO /offline/ page
// carried the old chrome and pointed back to the old home, and it redirects
// here now (vercel.json).
import Link from "next/link";
import { Home, RotateCcw, WifiOff } from "lucide-react";

export const metadata = {
  title: "אין חיבור לרשת · Project NEO",
  robots: { index: false, follow: false },
};

export default function NeoOffline() {
  return (
    <div className="nx-nf-main">
      <div className="nx-nf-box">
        <p className="nx-nf-eye"><bdi>SAP by Sali</bdi> · <bdi>Project NEO</bdi></p>
        <p className="nx-nf-code"><WifiOff size={18} strokeWidth={1.75} aria-hidden="true" /></p>
        <h1 className="nx-nf-h1">אין חיבור לרשת</h1>
        <p className="nx-nf-lede">
          העמוד הזה עוד לא נשמר במכשיר. עמודים שכבר נפתחו כאן זמינים גם בלי רשת.
          אפשר לחזור למסך הבית או לנסות שוב כשהחיבור יחזור.
        </p>
        <nav className="nx-nf-go" aria-label="לאן אפשר להמשיך">
          <Link href="/neo/" prefetch={false} className="nu-btn"><Home size={16} strokeWidth={1.75} aria-hidden="true" />למסך הבית</Link>
          {/* Reloads the address that was asked for: the worker serves this page
              in its place, so an empty href is that address. */}
          <a href="" className="nu-btn2"><RotateCcw size={16} strokeWidth={1.75} aria-hidden="true" />ניסיון נוסף</a>
        </nav>
      </div>
    </div>
  );
}
