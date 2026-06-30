"use client";

// Last-resort boundary — catches errors thrown in the root layout itself
// (where app/error.tsx cannot). Must render its own <html>/<body>.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="he" dir="rtl">
      <body style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", margin: 0, minHeight: "100vh", display: "grid", placeItems: "center", background: "#f8fafc", color: "#0f172a" }}>
        <div style={{ textAlign: "center", padding: "2rem", maxWidth: 420 }}>
          <div style={{ fontSize: 40 }}>⚠️</div>
          <h1 style={{ fontSize: 20, fontWeight: 800, marginTop: 8 }}>שגיאה בטעינת היישום</h1>
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
