// Intelligent highlighting — wraps matched query terms in a bright yellow
// chip (bg-yellow-400 / text-black). No external lib; safe regex escaping.

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (!q || !text) return <>{text}</>;
  const terms = q.split(/\s+/).filter(Boolean).map(escapeRe);
  if (!terms.length) return <>{text}</>;
  const splitter = new RegExp(`(${terms.join("|")})`, "gi");
  const matcher = new RegExp(`^(?:${terms.join("|")})$`, "i");
  const parts = text.split(splitter);
  return (
    <>
      {parts.map((part, i) =>
        matcher.test(part) ? (
          <mark key={i} className="rounded-[3px] bg-yellow-400 px-0.5 font-bold text-black">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}
