"use client";

// Last-resort boundary — catches errors thrown in the root layout itself
// (where app/error.tsx cannot). Must render its own <html>/<body>.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="he" dir="rtl">
      <body style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", margin: 0, minHeight: "100vh", display: "grid", placeItems: "center", background: "#f8fafc", color: "#0f172a" }}>
        <div style={{ textAlign: "center", padding: "2rem", maxWidth: 420 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <span style={{ display: "grid", placeItems: "center", width: 52, height: 52, borderRadius: 14, background: "radial-gradient(130% 130% at 30% 18%, #e23b41, #d62027 46%, #a3171c)", boxShadow: "0 10px 26px -12px rgba(214,32,39,.6)" }}>
              <svg viewBox="0 0 100 100" width="30" height="30" fill="none" aria-hidden>
                <g stroke="#fff" strokeWidth="6" strokeLinecap="round"><line x1="33" y1="37" x2="67" y2="35" /><line x1="33" y1="37" x2="50" y2="68" /><line x1="67" y1="35" x2="50" y2="68" /></g>
                <g fill="#fff"><circle cx="33" cy="37" r="8" /><circle cx="67" cy="35" r="8" /><circle cx="50" cy="68" r="10.5" /></g>
              </svg>
            </span>
            <div style={{ textAlign: "start" }}><div style={{ fontSize: 13, fontWeight: 800, color: "#1e293b" }}>SAP by Sali</div><div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8" }}>Project NEO Cockpit</div></div>
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 800, marginTop: 20 }}>שגיאה בטעינת היישום</h1>
          <p style={{ fontSize: 14, color: "#64748b", marginTop: 6 }}>טען מחדש כדי להמשיך.</p>
          <div style={{ marginTop: 16, display: "flex", gap: 8, justifyContent: "center" }}>
            <button onClick={() => reset()} style={{ background: "#d62027", color: "#fff", border: 0, borderRadius: 12, padding: "10px 18px", fontWeight: 800, fontSize: 14 }}>נסה שוב</button>
            <button onClick={() => { try { window.location.assign("/"); } catch { /* noop */ } }} style={{ background: "#fff", color: "#334155", border: "2px solid #e2e8f0", borderRadius: 12, padding: "10px 18px", fontWeight: 700, fontSize: 14 }}>לדף הבית</button>
          </div>
        </div>
      </body>
    </html>
  );
}
